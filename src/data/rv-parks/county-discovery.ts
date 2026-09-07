import { RV_PARK_RAW_BIG_BEND_WEST_TEXAS } from './big-bend-west-texas';
import { RV_PARK_RAW_GULF_COAST } from './gulf-coast';
import { RV_PARK_RAW_HILL_COUNTRY } from './hill-country';
import { RV_PARK_RAW_PANHANDLE_NORTH_TEXAS } from './panhandle-north-texas';
import { RV_PARK_RAW_PINEY_WOODS_EAST_TEXAS } from './piney-woods-east-texas';

export type CountyRvParkDiscoveryItem = {
  slug: string;
  name: string;
  nearestTown: string;
  county: string;
};

const RV_PARK_RAW_SEEDS = [
  ...RV_PARK_RAW_HILL_COUNTRY,
  ...RV_PARK_RAW_GULF_COAST,
  ...RV_PARK_RAW_PINEY_WOODS_EAST_TEXAS,
  ...RV_PARK_RAW_PANHANDLE_NORTH_TEXAS,
  ...RV_PARK_RAW_BIG_BEND_WEST_TEXAS,
] as const;

function normalizeCounty(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+county$/i, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function rvParkDiscoveryForCounty(countySlug: string): CountyRvParkDiscoveryItem[] {
  const normalizedCounty = normalizeCounty(countySlug);
  return RV_PARK_RAW_SEEDS
    .filter(([, , county]) => normalizeCounty(county) === normalizedCounty)
    .map(([name, town, county, slug]) => ({ slug, name, nearestTown: town, county }))
    .sort((left, right) => left.nearestTown.localeCompare(right.nearestTown) || left.name.localeCompare(right.name))
    .slice(0, 12);
}
