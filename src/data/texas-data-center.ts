import { createServerFn } from "@tanstack/react-start";

export type TexasDataset = {
  slug: string;
  title: string;
  description: string;
  category: string;
  year: number;
  updated: string;
  sourceName: string;
  sourceUrl: string;
  methodology: string;
  rows: Array<{ label: string; value: number; note?: string }>;
  unit: 'percent' | 'dollars' | 'count';
};

// Sitemap-safe metadata only. The full source-backed registry lives server-side.
export const TEXAS_DATASETS = [
  { slug: 'county-property-tax-rates', updated: '2026-07-30' },
  { slug: 'school-district-tax-rates', updated: '2026-10-14' },
  { slug: 'homestead-exemption-history', updated: '2026-07-30' },
  { slug: 'texas-population-and-migration-2025', updated: '2026-08-27' },
  { slug: 'texas-population-and-migration-2024', updated: '2026-08-27' },
  { slug: 'where-new-texans-came-from-2024', updated: '2026-08-26' },
  { slug: 'texas-homeowners-premium-history', updated: '2026-10-20' },
  { slug: 'texas-metro-payrolls-june-2026', updated: '2026-08-26' },
  { slug: 'texas-metro-payrolls-august-2026', updated: '2026-10-20' },
  { slug: 'texas-traffic-monitoring-coverage', updated: '2026-08-26' },
  { slug: 'texas-metro-payrolls-latest', updated: '2026-09-30' },
] as const;

const loadTexasDatasetsServer = createServerFn({ method: "GET" }).handler(async () => {
  const { TEXAS_DATASETS, getCurrentCountyPropertyTaxExamples } = await import("./texas-data-center.server");
  // Only a complete source-finalized county comparison can replace the
  // explicitly archived fallback. The monthly importer owns freshness.
  let officialCountyExamples = null;
  try { officialCountyExamples = await getCurrentCountyPropertyTaxExamples(); }
  catch (error) { console.error('County tax rates unavailable', error); }
  return officialCountyExamples
    ? TEXAS_DATASETS.map(dataset => dataset.slug === 'county-property-tax-rates' ? officialCountyExamples : dataset)
    : TEXAS_DATASETS;
});

const loadTexasDatasetServer = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { getTexasDataset, getCurrentCountyPropertyTaxExamples } = await import("./texas-data-center.server");
    const archived = getTexasDataset(data.slug) ?? null;
    if (data.slug !== 'county-property-tax-rates') return archived;
    try { return await getCurrentCountyPropertyTaxExamples() ?? archived; }
    catch (error) {
      console.error('County tax rates unavailable', error);
      return archived;
    }
  });

export function getTexasDatasets(): Promise<TexasDataset[]> {
  return loadTexasDatasetsServer();
}

export function getTexasDataset(slug: string): Promise<TexasDataset | null> {
  return loadTexasDatasetServer({ data: { slug } });
}

export const formatDatasetValue = (value: number, unit: TexasDataset['unit']) => unit === 'dollars'
  ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
  : unit === 'percent' ? `${value.toFixed(4)}%` : new Intl.NumberFormat('en-US').format(value);
