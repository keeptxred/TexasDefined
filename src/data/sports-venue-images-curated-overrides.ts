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
  'xtreme-raceway-park': {
    slug: 'xtreme-raceway-park',
    alt: 'Xtreme Raceway Park drag strip in Ferris, Texas',
    imageUrl: 'https://membertrack.nhradata.com/Images/Tracks/PRIMARY__153.jpg',
    sourcePage: 'https://www.nhradiv4.com/membertrackinfo?trackID=885',
    sourceName: 'NHRA South Central Division',
    author: 'NHRA Member Track Network',
    licenseName: 'Official member-track media; all rights reserved',
    licenseUrl: 'https://www.nhradiv4.com/membertrackinfo?trackID=885',
    width: 400,
    height: 250,
  },
};

export function getCuratedSportsVenuePhotoOverride(slug: string) {
  return curatedSportsVenuePhotoOverrides[slug];
}
