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
  { slug: 'school-district-tax-rates', updated: '2026-07-30' },
  { slug: 'homestead-exemption-history', updated: '2026-07-30' },
  { slug: 'texas-population-and-migration-2025', updated: '2026-08-27' },
  { slug: 'texas-population-and-migration-2024', updated: '2026-08-27' },
  { slug: 'where-new-texans-came-from-2024', updated: '2026-08-26' },
  { slug: 'texas-homeowners-premium-history', updated: '2026-08-26' },
  { slug: 'texas-metro-payrolls-june-2026', updated: '2026-08-26' },
  { slug: 'texas-traffic-monitoring-coverage', updated: '2026-08-26' },
] as const;

const loadTexasDatasetsServer = createServerFn({ method: "GET" }).handler(async () => {
  const { TEXAS_DATASETS } = await import("./texas-data-center.server");
  return TEXAS_DATASETS;
});

const loadTexasDatasetServer = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { getTexasDataset } = await import("./texas-data-center.server");
    return getTexasDataset(data.slug) ?? null;
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
