import { createServerFn } from '@tanstack/react-start';

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

const loadLakeFishDiversityFn = createServerFn({ method: 'GET' }).handler(async () => {
  const { loadLakeFishDiversityServer } = await import('./lake-game-fish-diversity.server');
  return loadLakeFishDiversityServer();
});

export function loadLakeFishDiversity(): Promise<LakeFishDiversityDataset> {
  return loadLakeFishDiversityFn();
}
