<?php

namespace App\Controller\Public;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class MeteoController extends AbstractController {

    #[Route('/meteo', name: 'app_meteo')]
    public function index(): Response {
        return $this->render('public/meteo.html.twig');
    }

}
