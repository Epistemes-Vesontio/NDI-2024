<?php
namespace App\Service;

use Symfony\Component\Translation\Loader\PoFileLoader;
use Symfony\Component\Translation\MessageCatalogue;

class TranslationMetadataService
{
    private string $translationDir;

    public function __construct(string $translationDir = "")
    {
        $this->translationDir = $translationDir;
    }

    public function getVersion(string $locale): ?string
    {
        $filePath = $this->translationDir . "/messages.$locale.po";

        if (!file_exists($filePath)) {
            return null;
        }

        $metadata = [];
        $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    
        foreach ($lines as $line) {
            if (preg_match('/^"([^"]+): (.+)"$/', $line, $matches)) {
                $metadata[$matches[1]] = $matches[2];
            }
        }
    
        return $metadata["X-Version"] ?: null;
    }
}
