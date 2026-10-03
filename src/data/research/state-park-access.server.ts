import { fetchExploreDestinations } from '@/data/explore-remote';
import { loadCountyProfile } from '@/data/county-profile';
import { COUNTY_PROPERTY_RECORDS } from '@/data/property/county-property-data';
import type { StateParkAccessDataset, StateParkAccessRow } from './state-park-access';

const CENSUS_COUNTY_SOURCE = 'https://tigerweb.geo.census.gov/arcgis/rest/services/Census2020/State_County/MapServer/1';
const TPWD_STATE_PARKS_SOURCE = 'https://tpwd.texas.gov/state-parks/parks-map';

function usableCoordinate(value: number | undefined) {
  return value != null && Number.isFinite(value) && value !== 0;
}

function isTpwdStatePark(destination: Awaited<ReturnType<typeof fetchExploreDestinations>>[number]) {
  const authority = destination.managingAuthority?.toLowerCase() ?? '';
  return /\bstate park\b/i.test(destination.name)
    && !/state historic site/i.test(destination.name)
    && authority.includes('texas parks')
    && usableCoordinate(destination.coordinates.lat)
    && usableCoordinate(destination.coordinates.lng);
}

function radians(value: number) {
  return value * (Math.PI / 180);
}

function haversineMiles(lat1: number, lon1: number, lat2: number, lon2: number) {
  const earthRadiusMiles = 3958.7613;
  const dLat = radians(lat2 - lat1);
  const dLon = radians(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos(radians(lat1)) * Math.cos(radians(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * earthRadiusMiles * Math.asin(Math.min(1, Math.sqrt(a)));
}

export async function loadStateParkAccessServer(): Promise<StateParkAccessDataset> {
  const destinations = await fetchExploreDestinations({ category: 'state-parks', limit: 5000 });
  const parks = destinations.filter(isTpwdStatePark);
  if (!parks.length) {
    return {
      available: false,
      rows: [],
      parkCount: 0,
      countyCount: 0,
      countiesWithin25Miles: 0,
      countiesWithin50Miles: 0,
      populationInCountiesWithin50Miles: null,
      populationWithUsableReferencePoint: null,
      lastVerified: null,
      sourceUrls: [CENSUS_COUNTY_SOURCE, TPWD_STATE_PARKS_SOURCE],
    };
  }

  const countyProfiles = await Promise.all(COUNTY_PROPERTY_RECORDS.map(async (county) => ({
    county,
    profile: await loadCountyProfile(county.slug, county.name),
  })));

  const rows: StateParkAccessRow[] = countyProfiles.flatMap(({ county, profile }) => {
    if (!usableCoordinate(profile.latitude) || !usableCoordinate(profile.longitude)) return [];
    const ranked = parks
      .map((park) => ({
        park,
        distanceMiles: haversineMiles(profile.latitude!, profile.longitude!, park.coordinates.lat, park.coordinates.lng),
      }))
      .sort((a, b) => a.distanceMiles - b.distanceMiles || a.park.name.localeCompare(b.park.name));
    const nearest = ranked[0];
    if (!nearest) return [];
    return [{
      countyName: county.name,
      countySlug: county.slug,
      fips: county.fips ?? '',
      population2020: profile.population2020 ?? null,
      referenceLatitude: profile.latitude!,
      referenceLongitude: profile.longitude!,
      nearestParkName: nearest.park.name,
      nearestParkSlug: nearest.park.slug,
      parkCounty: nearest.park.county ?? null,
      distanceMiles: nearest.distanceMiles,
      parkSourceUrl: nearest.park.officialUrl ?? null,
    }];
  }).sort((a, b) => b.distanceMiles - a.distanceMiles || a.countyName.localeCompare(b.countyName));

  const rowsWithPopulation = rows.filter((row) => row.population2020 != null);
  const populationWithUsableReferencePoint = rowsWithPopulation.reduce((sum, row) => sum + (row.population2020 ?? 0), 0);
  const populationInCountiesWithin50Miles = rowsWithPopulation
    .filter((row) => row.distanceMiles <= 50)
    .reduce((sum, row) => sum + (row.population2020 ?? 0), 0);
  const lastVerified = parks.map((park) => park.sourceCheckedAt).filter((value): value is string => Boolean(value)).sort().at(-1) ?? null;

  return {
    available: rows.length >= 250 && parks.length >= 40,
    rows,
    parkCount: parks.length,
    countyCount: rows.length,
    countiesWithin25Miles: rows.filter((row) => row.distanceMiles <= 25).length,
    countiesWithin50Miles: rows.filter((row) => row.distanceMiles <= 50).length,
    populationInCountiesWithin50Miles,
    populationWithUsableReferencePoint,
    lastVerified,
    sourceUrls: [CENSUS_COUNTY_SOURCE, TPWD_STATE_PARKS_SOURCE],
  };
}
