<?php

namespace App\Controller\Private;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class HomeController extends AbstractController {

    #[Route('/home', name: 'app_home')]
    #[IsGranted("ROLE_USER")]
    public function index(): Response {
        return $this->render('private/home.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }

}
