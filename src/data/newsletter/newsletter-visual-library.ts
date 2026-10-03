import type { NewsletterImageKind } from './newsletter-visual-standard';

type CuratedNewsletterVisual = {
  path: string;
  imageUrl: string;
  imageAlt: string;
  imageCredit?: string;
  imageKind: NewsletterImageKind;
};

const curatedNewsletterVisuals: CuratedNewsletterVisual[] = [
  {
    path: '/explore/lakes-rivers',
    imageUrl: '/images/explore/lakes-rivers/amistad-national-recreation-area.jpg',
    imageAlt: 'Amistad National Recreation Area on the Rio Grande in Texas',
    imageCredit: 'National Park Service Digital Image Archives · Public domain · Wikimedia Commons',
    imageKind: 'photo',
  },
  {
    path: '/explore/state-parks',
    imageUrl: '/images/state-parks/enchanted-rock-state-natural-area.jpg',
    imageAlt: 'Enchanted Rock State Natural Area in the Texas Hill Country',
    imageCredit: 'Wing-Chi Poon · CC BY-SA 3.0 · Wikimedia Commons',
    imageKind: 'photo',
  },
  {
    path: '/best-places-to-go-camping-in-texas',
    imageUrl: '/images/state-parks/palo-duro-canyon-state-park.jpg',
    imageAlt: 'Palo Duro Canyon State Park in the Texas Panhandle',
    imageCredit: 'Larry D. Moore · CC BY 4.0 · Wikimedia Commons',
    imageKind: 'photo',
  },
  {
    path: '/explore/national-parks',
    imageUrl: '/images/explore/national-parks/guadalupe-mountains-national-park.jpg',
    imageAlt: 'Guadalupe Mountains National Park in West Texas',
    imageCredit: 'National Park Service Digital Image Archives · Public domain · Wikimedia Commons',
    imageKind: 'photo',
  },
  {
    path: '/explore/major-springs',
    imageUrl: '/images/explore/major-springs/balmorhea-state-park.jpg',
    imageAlt: 'The spring-fed pool at Balmorhea State Park in West Texas',
    imageCredit: 'SHAWN VR · CC BY-SA 4.0 · Wikimedia Commons',
    imageKind: 'photo',
  },
  {
    path: '/explore/road-trips',
    imageUrl: '/images/state-parks/monahans-sandhills-state-park.jpg',
    imageAlt: 'Monahans Sandhills State Park, a West Texas road-trip destination',
    imageCredit: 'Alexander Hatley · CC BY 2.0 · Wikimedia Commons',
    imageKind: 'photo',
  },
  {
    path: '/explore/outdoors',
    imageUrl: '/images/state-parks/brazos-bend-state-park.jpg',
    imageAlt: 'Brazos Bend State Park in Southeast Texas',
    imageCredit: 'Mike Fisher · CC BY 2.0 · Wikimedia Commons',
    imageKind: 'photo',
  },
  {
    path: '/texas-history',
    imageUrl: '/images/explore/historic-sites/battleship-texas.jpg',
    imageAlt: 'Battleship Texas, a preserved Texas historic site',
    imageCredit: 'Daniel Schwen · CC BY-SA 4.0 · Wikimedia Commons',
    imageKind: 'photo',
  },
];

function normalizedPathname(value: string) {
  try {
    const pathname = new URL(value, 'https://texasdefined.com').pathname.replace(/\/+$/, '');
    return pathname || '/';
  } catch {
    return '';
  }
}

export function hydrateNewsletterStoryVisual<T extends {
  url: string;
  imageUrl?: string;
  imageAlt?: string;
  imageCredit?: string;
  imageKind?: NewsletterImageKind;
}>(story: T): T {
  if (story.imageUrl) return story;
  const pathname = normalizedPathname(story.url);
  const visual = curatedNewsletterVisuals.find((candidate) => candidate.path === pathname);
  if (!visual) return story;
  return {
    ...story,
    imageUrl: visual.imageUrl,
    imageAlt: story.imageAlt || visual.imageAlt,
    imageCredit: story.imageCredit || visual.imageCredit,
    imageKind: story.imageKind || visual.imageKind,
  };
}

export const NEWSLETTER_CURATED_VISUAL_PATHS = curatedNewsletterVisuals.map((visual) => visual.path);
