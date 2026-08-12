import { loadCountyProfile } from '@/data/county-profile';
import { TEXAS_COUNTIES } from '@/data/texas-places';

export type TexasCountyComparisonRow = {
  slug: string;
  name: string;
  fipsCode: string;
  countySeat: string | null;
  population2020: number | null;
  landAreaSquareMiles: number | null;
  majorCommunities: string[];
  officialDirectoryUrl: string;
};

let comparisonPromise: Promise<TexasCountyComparisonRow[]> | undefined;

export function loadTexasCountyComparison() {
  comparisonPromise ??= Promise.all(
    TEXAS_COUNTIES.map(async (county) => {
      const profile = await loadCountyProfile(county.slug, county.name);
      return {
        slug: county.slug,
        name: county.name,
        fipsCode: county.code,
        countySeat: profile.countySeat ?? null,
        population2020: profile.population2020 ?? null,
        landAreaSquareMiles: profile.landAreaSquareMiles ?? null,
        majorCommunities: profile.majorCommunities,
        officialDirectoryUrl: county.officialDirectoryUrl,
      } satisfies TexasCountyComparisonRow;
    }),
  );
  return comparisonPromise;
}

export function populationRankedCounties(rows: TexasCountyComparisonRow[], limit = 20) {
  return rows
    .filter((row) => row.population2020 != null)
    .sort((a, b) => (b.population2020 ?? 0) - (a.population2020 ?? 0))
    .slice(0, limit);
}
