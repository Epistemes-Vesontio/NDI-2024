<?php

namespace App\Controller\Private;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class AdminController extends AbstractController {

    public function __construct(
        private readonly EntityManagerInterface $em,
        private readonly UserRepository $userRepository,
        private readonly UserPasswordHasherInterface $passwordHasher,
    ) {}

    #[Route('/admin', name: 'app_admin')]
    #[IsGranted("ROLE_ADMIN")]
    public function index(Request $request): Response {
        $search = $request->query->get('search', '');

        $users = empty($search) 
            ? $this->userRepository->findAll() 
            : $this->userRepository->createQueryBuilder('u')
                ->where('u.username LIKE :search')
                ->setParameter('search', '%' . $search . '%')
                ->getQuery()
                ->getResult();

        return $this->render('private/admin.html.twig', [
            'users' => $users,
        ]);
    }


    #[Route('/admin/user/create', name: 'app_admin_create_user', methods: ["POST"])]
    #[IsGranted("ROLE_ADMIN")]
    public function createUser(Request $request) {
        $username = $request->request->get("username");
        $password = $request->request->get("password");

        $user = new User();
        $user->setUsername($username);
        $user->setPassword($this->passwordHasher->hashPassword($user, $password));
        $user->setRoles(["ROLE_USER"]);

        $this->em->persist($user);
        $this->em->flush();

        return $this->redirectToRoute('app_admin');
    }

    #[Route('/admin/user/{id}/edit-role/{role}', name: 'app_admin_edit_user_role')]
    #[IsGranted("ROLE_ADMIN")]
    public function editUserRole(User $user, string $role): Response {
        match ($role) {
            "default" => $user->setRoles(["ROLE_USER"]),
            "admin" => $user->setRoles(["ROLE_ADMIN"]),
            "seller" => $user->setRoles(["ROLE_SELLER"]),
            default => $user->setRoles(["ROLE_USER"]),
        };

        $this->em->persist($user);
        $this->em->flush();

        return $this->redirectToRoute('app_admin');
    }

    #[Route('/admin/user/{id}/delete', name: 'app_admin_delete_user')]
    #[IsGranted("ROLE_ADMIN")]
    public function deleteUser(User $user): Response {
        $this->em->remove($user);
        $this->em->flush();
        
        return $this->redirectToRoute('app_admin');
    }

}