import bigBend from '@/assets/big-bend.jpg';
import blueHole from '@/assets/blue-hole.jpg';
import bluebonnets from '@/assets/bluebonnets.jpg';
import caddoLake from '@/assets/caddo-lake.jpg';
import enchantedRock from '@/assets/enchanted-rock.jpg';
import highSchoolFootball from '@/assets/high-school-football-hero.jpg';
import paloDuro from '@/assets/palo-duro.jpg';
import roadTrip from '@/assets/road-trip.jpg';
import smallTown from '@/assets/small-town.jpg';
import wildlife from '@/assets/wildlife.jpg';

import type { NewsletterImageKind } from './newsletter-visual-standard';

type CuratedNewsletterVisual = {
  path: string;
  imageUrl: string;
  imageAlt: string;
  imageKind: NewsletterImageKind;
};

const curatedNewsletterVisuals: CuratedNewsletterVisual[] = [
  {
    path: '/explore/lakes-rivers',
    imageUrl: caddoLake,
    imageAlt: 'Cypress trees rising from the water at Caddo Lake in East Texas',
    imageKind: 'photo',
  },
  {
    path: '/explore/state-parks',
    imageUrl: enchantedRock,
    imageAlt: 'The granite dome and surrounding Hill Country landscape at Enchanted Rock',
    imageKind: 'photo',
  },
  {
    path: '/best-places-to-go-camping-in-texas',
    imageUrl: paloDuro,
    imageAlt: 'Layered canyon walls and open country at Palo Duro Canyon',
    imageKind: 'photo',
  },
  {
    path: '/explore/national-parks',
    imageUrl: bigBend,
    imageAlt: 'Desert mountains and wide-open country in Big Bend',
    imageKind: 'photo',
  },
  {
    path: '/explore/major-springs',
    imageUrl: blueHole,
    imageAlt: 'Clear spring-fed water in the Texas Hill Country',
    imageKind: 'photo',
  },
  {
    path: '/explore/road-trips',
    imageUrl: bluebonnets,
    imageAlt: 'Texas bluebonnets beside a scenic spring drive',
    imageKind: 'photo',
  },
  {
    path: '/explore/small-towns',
    imageUrl: smallTown,
    imageAlt: 'A historic Texas small-town streetscape',
    imageKind: 'photo',
  },
  {
    path: '/explore/outdoors',
    imageUrl: wildlife,
    imageAlt: 'White-tailed deer in Texas brush country',
    imageKind: 'photo',
  },
  {
    path: '/sports',
    imageUrl: highSchoolFootball,
    imageAlt: 'Texas high school football under stadium lights',
    imageKind: 'photo',
  },
  {
    path: '/moving-to-texas',
    imageUrl: roadTrip,
    imageAlt: 'A Texas highway stretching toward the horizon',
    imageKind: 'photo',
  },
  {
    path: '/texas-history',
    imageUrl: smallTown,
    imageAlt: 'A historic Texas town representing the places and communities in the state’s story',
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
    imageKind: story.imageKind || visual.imageKind,
  };
}

export const NEWSLETTER_CURATED_VISUAL_PATHS = curatedNewsletterVisuals.map((visual) => visual.path);
