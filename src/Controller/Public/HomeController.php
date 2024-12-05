<?php

namespace App\Controller\Public;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class HomeController extends AbstractController {

    #[Route('/', name: 'app_public_home')]
    public function index(): Response {
        return $this->render('public/home.html.twig', [
            'controller_name' => 'PublicHomeController',
        ]);
    }

}
