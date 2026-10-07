import { loadShowcaseLakesPageDataServer } from '@/data/fishing/showcase-lakes-page-data.server';

export type LakeFishDiversityRow = {
  slug: string;
  name: string;
  region: string;
  counties: string[];
  surfaceAcres: number;
  fishTargets: string[];
  fishTargetCount: number;
  targetsPerThousandAcres: number;
  verifiedAt: string;
  sourceUrl: string;
};

export type LakeFishDiversityDataset = {
  available: boolean;
  rows: LakeFishDiversityRow[];
  lastVerified: string | null;
  sourceName: string;
  sourceUrl: string;
};

export function loadLakeFishDiversityServer(): LakeFishDiversityDataset {
  const lakes = Object.values(loadShowcaseLakesPageDataServer());
  const rows = lakes.flatMap((lake) => {
    const surfaceAcres = Number(lake.overview.surfaceAcres);
    if (!Number.isFinite(surfaceAcres) || surfaceAcres <= 0 || !lake.fish.length) return [];
    const fishTargets = [...new Set(lake.fish.map((fish) => fish.name.trim()).filter(Boolean))];
    const sourceUrl = lake.sources.tpwdLake?.url ?? Object.values(lake.sources)[0]?.url ?? 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/';
    return [{
      slug: lake.slug,
      name: lake.overview.name,
      region: lake.overview.region,
      counties: lake.overview.counties,
      surfaceAcres,
      fishTargets,
      fishTargetCount: fishTargets.length,
      targetsPerThousandAcres: fishTargets.length / (surfaceAcres / 1000),
      verifiedAt: lake.verifiedAt,
      sourceUrl,
    }];
  }).sort((a, b) => b.fishTargetCount - a.fishTargetCount || b.targetsPerThousandAcres - a.targetsPerThousandAcres || a.name.localeCompare(b.name));

  const lastVerified = rows.map((row) => row.verifiedAt).filter(Boolean).sort().at(-1) ?? null;
  return {
    available: rows.length > 0,
    rows,
    lastVerified,
    sourceName: 'Texas Parks & Wildlife Department lake fisheries pages and verified lake-profile sources',
    sourceUrl: 'https://tpwd.texas.gov/fishboat/fish/recreational/lakes/',
  };
}
