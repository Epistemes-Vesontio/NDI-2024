<?php

namespace App\Controller\Public;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ClickerController extends AbstractController
{
    #[Route('/clicker', name: 'app_clicker')]
    public function index(): Response
    {

        return $this->render('public/clicker.html.twig');
    }
}
