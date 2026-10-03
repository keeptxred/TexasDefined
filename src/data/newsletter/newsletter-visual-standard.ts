export const INSIDE_TEXASDEFINED_NAME = 'Inside TexasDefined';
export const INSIDE_TEXASDEFINED_TAGLINE = 'Defining everything that is Texas.';

export const NEWSLETTER_VISUAL_STANDARD = {
  hero: {
    ratio: '16:9',
    recommended: '1600×900',
    minimum: '1200×675',
    targetBytes: 500_000,
  },
  feature: {
    ratio: '3:2',
    recommended: '1200×800',
    minimum: '900×600',
    targetBytes: 350_000,
  },
  dataGraphic: {
    ratio: '4:3',
    recommended: '1200×900',
    minimum: '1000×750',
    targetBytes: 400_000,
  },
} as const;

export const NEWSLETTER_VISIBLE_IMAGE_SLOTS = 4;

export type NewsletterImageKind = 'photo' | 'map' | 'chart' | 'graphic' | 'historic';

export type NewsletterVisualCandidate = {
  imageUrl?: string;
  imageAlt?: string;
  imageCredit?: string;
  imageKind?: NewsletterImageKind;
};

export type NewsletterVisualCoverage = {
  imageCount: number;
  visibleImageCount: number;
  visualTarget: number;
  heroHasImage: boolean;
  missingAltText: number;
  warnings: string[];
};

export function inspectNewsletterVisualCoverage(stories: NewsletterVisualCandidate[]): NewsletterVisualCoverage {
  const visibleStories = stories.slice(0, NEWSLETTER_VISIBLE_IMAGE_SLOTS);
  const imageCount = stories.filter((story) => Boolean(story.imageUrl)).length;
  const visibleImageCount = visibleStories.filter((story) => Boolean(story.imageUrl)).length;
  const visualTarget = Math.min(stories.length, NEWSLETTER_VISIBLE_IMAGE_SLOTS);
  const heroHasImage = Boolean(stories[0]?.imageUrl);
  const missingAltText = stories.filter((story) => story.imageUrl && !story.imageAlt?.trim()).length;
  const warnings: string[] = [];

  if (!heroHasImage) warnings.push('Lead story has no hero image. Inside TexasDefined should open with a strong 16:9 visual.');
  if (visibleImageCount < visualTarget) warnings.push(`Only ${visibleImageCount} of the first ${visualTarget} story slots have images.`);
  if (missingAltText) warnings.push(`${missingAltText} newsletter image${missingAltText === 1 ? '' : 's'} need descriptive alt text.`);

  return {
    imageCount,
    visibleImageCount,
    visualTarget,
    heroHasImage,
    missingAltText,
    warnings,
  };
}
