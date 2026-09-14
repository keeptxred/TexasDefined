import type { SportsVenuePhoto } from './sports-venue-images';

const curatedSportsVenuePhotoOverrides: Record<string, SportsVenuePhoto> = {
  'dickies-arena': {
    slug: 'dickies-arena',
    alt: 'AI-generated photorealistic representative exterior depiction of Dickies Arena in Fort Worth, Texas',
    imageUrl: '/images/sports-venues/dickies-arena-ai-generated-2026.webp',
    sourcePage: 'https://texasdefined.com/sports-venue/dickies-arena',
    sourceName: 'Texas Defined generated media',
    author: 'OpenAI image generation',
    licenseName: 'AI-generated image supplied for TexasDefined use',
    licenseUrl: 'https://texasdefined.com/sports-venue/dickies-arena',
    width: 1400,
    height: 788,
  },
};

export function getCuratedSportsVenuePhotoOverride(slug: string) {
  return curatedSportsVenuePhotoOverrides[slug];
}
