import { createServerFn } from '@tanstack/react-start';

export type TexasCountyGrowthRow = {
  fips: string;
  countyName: string;
  populationBase2020: number;
  populationEstimate: number;
  populationChange: number;
  populationChangePercent: number;
};

export type TexasCountyGrowthDataset = {
  vintage: number;
  rows: TexasCountyGrowthRow[];
  available: boolean;
  sourceUrl: string;
  sourceFileUrl: string;
  asOf: string;
  verifiedAt: string;
};

// The source CSV is downloaded, reconciled, and compacted by GitHub Actions,
// never by a visitor-facing request. Keep the 254-row JSON in the server chunk.
const loadTexasCountyGrowthServer = createServerFn({ method: 'GET' }).handler(async () => {
  const { default: verified } = await import('@/data/generated/texas-county-growth-current.json');
  return { ...verified, available: verified.rows.length === 254 };
});
export function loadTexasCountyGrowth(): Promise<TexasCountyGrowthDataset> {
  return loadTexasCountyGrowthServer();
}
