import { loadCountyProfile } from '@/data/county-profile';
import { TEXAS_COUNTIES } from '@/data/texas-places';

export type TexasCountyComparisonRow = {
  slug: string;
  name: string;
  fipsCode: string;
  countySeat: string | null;
  population2020: number | null;
  landAreaSquareMiles: number | null;
  waterAreaSquareMiles: number | null;
  populationDensityPerSquareMile: number | null;
  waterSharePercent: number | null;
  majorCommunities: string[];
  officialDirectoryUrl: string;
};

export type CountyMetricRank = {
  rank: number;
  comparedCount: number;
};

export type TexasCountyStatewideContext = {
  population: CountyMetricRank | null;
  landArea: CountyMetricRank | null;
  density: CountyMetricRank | null;
  waterShare: CountyMetricRank | null;
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
        waterAreaSquareMiles: profile.waterAreaSquareMiles ?? null,
        populationDensityPerSquareMile: profile.populationDensityPerSquareMile ?? null,
        waterSharePercent: profile.waterSharePercent ?? null,
        majorCommunities: profile.majorCommunities,
        officialDirectoryUrl: county.officialDirectoryUrl,
      } satisfies TexasCountyComparisonRow;
    }),
  );
  return comparisonPromise;
}

export function populationRankedCounties(rows: TexasCountyComparisonRow[], limit = 20) {
  return ranked(rows, 'population2020').slice(0, limit);
}

export function densityRankedCounties(rows: TexasCountyComparisonRow[], limit = 20) {
  return ranked(rows, 'populationDensityPerSquareMile').slice(0, limit);
}

export function waterShareRankedCounties(rows: TexasCountyComparisonRow[], limit = 20) {
  return ranked(rows, 'waterSharePercent').slice(0, limit);
}

export function buildCountyStatewideContext(rows: TexasCountyComparisonRow[], slug: string): TexasCountyStatewideContext {
  return {
    population: metricRank(rows, slug, 'population2020'),
    landArea: metricRank(rows, slug, 'landAreaSquareMiles'),
    density: metricRank(rows, slug, 'populationDensityPerSquareMile'),
    waterShare: metricRank(rows, slug, 'waterSharePercent'),
  };
}

function metricRank(
  rows: TexasCountyComparisonRow[],
  slug: string,
  key: 'population2020' | 'landAreaSquareMiles' | 'populationDensityPerSquareMile' | 'waterSharePercent',
): CountyMetricRank | null {
  const ordered = ranked(rows, key);
  const index = ordered.findIndex((row) => row.slug === slug);
  if (index < 0) return null;
  return { rank: index + 1, comparedCount: ordered.length };
}

function ranked(
  rows: TexasCountyComparisonRow[],
  key: 'population2020' | 'landAreaSquareMiles' | 'populationDensityPerSquareMile' | 'waterSharePercent',
) {
  return rows
    .filter((row) => row[key] != null)
    .slice()
    .sort((a, b) => {
      const difference = Number(b[key]) - Number(a[key]);
      return difference || a.name.localeCompare(b.name);
    });
}
