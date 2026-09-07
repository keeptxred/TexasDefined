import { DESTINATION_PHOTO_PLACEHOLDER } from '../explore-hero-reconciliation';
import type { Destination, TexasRegion } from '../types';
import { RV_PARK_RAW_BIG_BEND_WEST_TEXAS } from './big-bend-west-texas';
import { RV_PARK_RAW_GULF_COAST } from './gulf-coast';
import { RV_PARK_RAW_HILL_COUNTRY } from './hill-country';
import { RV_PARK_RAW_PANHANDLE_NORTH_TEXAS } from './panhandle-north-texas';
import { RV_PARK_RAW_PINEY_WOODS_EAST_TEXAS } from './piney-woods-east-texas';

const GROUPS = [
  { name: 'Texas Hill Country', region: 'hill-country', parks: RV_PARK_RAW_HILL_COUNTRY },
  { name: 'Gulf Coast', region: 'gulf-coast', parks: RV_PARK_RAW_GULF_COAST },
  { name: 'Piney Woods & East Texas', region: 'piney-woods', parks: RV_PARK_RAW_PINEY_WOODS_EAST_TEXAS },
  { name: 'Panhandle Plains & North Texas', region: 'prairies-lakes', parks: RV_PARK_RAW_PANHANDLE_NORTH_TEXAS },
  { name: 'Big Bend & West Texas', region: 'big-bend', parks: RV_PARK_RAW_BIG_BEND_WEST_TEXAS },
] as const satisfies readonly { name: string; region: TexasRegion; parks: readonly (readonly [string, string, string, string, TexasRegion?])[] }[];

function normalizeCountySlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+county$/i, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const COUNTY_RV_PARKS: readonly Destination[] = GROUPS.flatMap((group) => group.parks.map(([name, town, county, slug, region]) => ({
  id: `rv-park-${slug}`,
  brandId: 'texasdefined',
  slug,
  name,
  category: 'rv-parks',
  region: region ?? group.region,
  nearestTown: town,
  county,
  coordinates: { lat: 0, lng: 0 },
  hero: {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} RV park or campground directory entry`,
    width: 1600,
    height: 1067,
  },
  summary: `${name} is listed near ${town}, ${county} County, in the Texas Defined RV parks and campgrounds directory.`,
  bestSeason: 'Varies by location and weather; verify current operating conditions before travel.',
  entryNote: 'Confirm availability, hookups, rig limits, rates and reservation requirements with the operator before travel.',
  highlights: [`RV camping near ${town}`, `${county} County`, group.name],
  body: [`Use the full Texas Defined RV profile for verified park-specific planning details as they become available.`],
})));

export function loadCountyRvParksSnapshot(countySlug: string): Destination[] {
  const normalized = normalizeCountySlug(countySlug);
  return COUNTY_RV_PARKS
    .filter((park) => Boolean(park.county) && normalizeCountySlug(park.county!) === normalized)
    .sort((left, right) => left.nearestTown.localeCompare(right.nearestTown) || left.name.localeCompare(right.name))
    .slice(0, 12);
}
