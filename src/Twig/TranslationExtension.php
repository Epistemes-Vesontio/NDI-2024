<?php
namespace App\Twig;

use App\Service\TranslationMetadataService;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class TranslationExtension extends AbstractExtension
{
    private TranslationMetadataService $translationMetadataService;

    public function __construct(TranslationMetadataService $translationMetadataService)
    {
        $this->translationMetadataService = $translationMetadataService;
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('translation_version', [$this, 'getTranslationVersion']),
        ];
    }

    public function getTranslationVersion(string $locale): ?string
    {
        return $this->translationMetadataService->getVersion($locale);
    }
}
