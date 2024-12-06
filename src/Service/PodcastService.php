<?php

namespace App\Service;

use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\File;

class PodcastService
{
    private $podcastDirectory;
    private $filesystem;

    public function __construct(string $podcastDirectory)
    {
        $this->podcastDirectory = $podcastDirectory;
        $this->filesystem = new Filesystem();
    }

    /**
     * Get all available podcasts
     *
     * @return array List of podcast folders
     */
    public function getPodcasts(): array
    {
        $podcasts = [];
        $directories = glob($this->podcastDirectory . '/*', GLOB_ONLYDIR);

        foreach ($directories as $directory) {
            $podcastName = basename($directory);
            $podcasts[] = $this->getPodcastDetails($podcastName);
        }

        return $podcasts;
    }

    /**
     * Get details for a specific podcast
     *
     * @param string $podcastName Name of the podcast folder
     * @return array Podcast resource details
     */
    public function getPodcastDetails(string $podcastName): array
    {
        $podcastPath = $this->podcastDirectory . '/' . $podcastName;

        return [
            'name' => $podcastName,
            'videos' => $this->findFilesByPattern($podcastPath, '*.mov'),
            'audio' => $this->findFilesByPattern($podcastPath, 'PODCAST-AUDIO-*.m4a'),
            'script' => $this->findFilesByPattern($podcastPath, 'Script - *.pdf')[0] ?? null
        ];
    }

    /**
     * Find files matching a specific pattern in a directory
     *
     * @param string $directory Directory to search
     * @param string $pattern Filename pattern
     * @return array Matched files
     */
    private function findFilesByPattern(string $directory, string $pattern): array
    {
        return glob($directory . '/' . $pattern);
    }

    /**
     * Generates streaming URL for a specific podcast resource
     *
     * @param string $podcastName Name of the podcast
     * @param string $type Type of resource (video, audio, script)
     * @param int $index Optional index for multiple resources
     * @return string|null Streaming URL
     */
    public function getStreamUrl(string $podcastName, string $type, int $index = 0): ?string
    {
        $details = $this->getPodcastDetails($podcastName);

        switch ($type) {
            case 'video':
                return $details['videos'][$index] ?? null;
            case 'audio':
                return $details['audio'][$index] ?? null;
            case 'script':
                return $details['script'];
            default:
                return null;
        }
    }
}