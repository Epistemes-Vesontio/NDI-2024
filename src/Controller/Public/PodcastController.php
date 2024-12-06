<?php

namespace App\Controller\Public;

use App\Service\PodcastService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class PodcastController extends AbstractController {

    private $podcastService;

    public function __construct(PodcastService $podcastService)
    {
        $this->podcastService = $podcastService;
    }

    /**
     * List all available podcasts
     */
    #[Route('/podcasts', name: 'podcast_list')]
    public function listPodcasts(): Response
    {
        $podcasts = $this->podcastService->getPodcasts();
        return $this->render('public/listpodcast.html.twig', [
            'podcasts' => $podcasts,
            'controller_name' => 'PodcastController',
        ]);
    }

    /**
     * View a specific podcast details
     */
    #[Route('/podcast/{podcastName}', name: 'podcast_view')]
    public function viewPodcast(string $podcastName): Response
    {
        $podcast = $this->podcastService->getPodcastDetails($podcastName);

        return $this->render('public/viewpodcast.html.twig', [
            'podcast' => $podcast,
            'controller_name' => 'PodcastController',
        ]);
    }

    #[Route('/podcast/{podcastName}/{type}/{index?}', name: 'podcast_stream')]
    public function streamResource(string $podcastName, string $type, ?int $index = 0): Response
    {
        // Validate input types
        $allowedTypes = ['video', 'audio', 'script'];
        if (!in_array($type, $allowedTypes)) {
            throw $this->createNotFoundException('Invalid resource type');
        }

        // Get resource path based on podcast name, type, and index
        $resourcePath = $this->podcastService->getStreamUrl($podcastName, $type, $index != null ? $index : 0);

        if (!$resourcePath) {
            throw $this->createNotFoundException('Resource not found');
        }

        // Determine content type and disposition based on resource type
        $contentTypes = [
            'script' => 'application/pdf',
            'video' => 'video/mp4',
            'audio' => 'audio/mpeg'
        ];

        $dispositions = [
            'script' => 'inline; filename="script.pdf"',
            'video' => 'inline',
            'audio' => 'inline'
        ];

        return new BinaryFileResponse($resourcePath, 200, [
            'Content-Type' => $contentTypes[$type],
            'Content-Disposition' => $dispositions[$type]
        ]);
    }
}
