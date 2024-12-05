<?php

namespace App\Controller\Public;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AboutController extends AbstractController
{
    #[Route('/about', name: 'app_about')]
    public function index(): Response
    {
        $users = [
            [
                'lastname' => 'Vandrepol',
                'firstname' => 'Léo',
                'img' => "https://avatars.githubusercontent.com/u/78354641?v=4",
                'buttonName' => "Github",
                'link' => 'https://github.com/vad3l'
            ],
            [
                'lastname' => 'Foucon',
                'firstname' => 'Willfrid',
                'img' => "https://avatars.githubusercontent.com/u/57151468?v=4",
                'buttonName' => "Github",
                'link' => 'https://github.com/UnExtraterrestres'
            ],
            [
                'lastname' => 'Loureau',
                'firstname' => 'Ryan',
                'img' => "https://avatars.githubusercontent.com/u/49369762?v=4",
                'buttonName' => "Github",
                'link' => 'https://github.com/RyanLru'
            ],
            [
                'lastname' => 'Grosdidier',
                'firstname' => 'Alphee',
                'img' => "https://avatars.githubusercontent.com/u/50115690?v=4",
                'buttonName' => "Github",
                'link' => 'https://github.com/thebosslol66'
            ],
            [
                'lastname' => 'Humbert',
                'firstname' => 'Oscar',
                'img' => "https://avatars.githubusercontent.com/u/92729585?v=4",
                'buttonName' => "GitHub",
                'link' => 'https://github.com/0scaramel'
            ],
            [
                'lastname' => 'Vienot',
                'firstname' => 'Davyd',
                'img' => "https://avatars.githubusercontent.com/u/138386951?v=4",
                'buttonName' => "GitHub",
                'link' => 'https://github.com/Amibeur'
            ]
            
        ];

        return $this->render('public/about.html.twig', [
            'users' => $users
        ]);
    }
}

