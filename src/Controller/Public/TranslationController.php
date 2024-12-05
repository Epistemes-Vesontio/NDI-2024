<?php

namespace App\Controller\Public;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\Translation\TranslatorInterface;

class TranslationController extends AbstractController
{
    #[Route('/translations', name: 'translations')]
    public function getTranslations(Request $request, TranslatorInterface $translator): JsonResponse
    {
        $locale = $request->getLocale();
        $catalogue = $translator->getCatalogue($locale);
        $translations = $catalogue->all('messages');

        return new JsonResponse($translations);
    }
}

