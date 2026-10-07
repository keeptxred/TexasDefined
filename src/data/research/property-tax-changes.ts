import { createServerFn } from '@tanstack/react-start';

export type PropertyTaxChangeRow = {
  key: string;
  type: 'county' | 'city' | 'school-district';
  name: string;
  slug: string;
  countySlugs: string[];
  previousYear: number;
  currentYear: number;
  previousRate: number;
  currentRate: number;
  changePoints: number;
  changePercent: number;
  sourceUrl: string;
};

export type PropertyTaxChangeDataset = {
  available: boolean;
  previousYear: number;
  currentYear: number;
  generatedAt: string | null;
  sourceName: string;
  sourceUrl: string;
  rows: PropertyTaxChangeRow[];
  omitted: number;
};

const loadPropertyTaxChangesFn = createServerFn({ method: 'GET' }).handler(async () => {
  const { loadPropertyTaxChangesServer } = await import('./property-tax-changes.server');
  return loadPropertyTaxChangesServer();
});

export function loadPropertyTaxChanges(): Promise<PropertyTaxChangeDataset> {
  return loadPropertyTaxChangesFn();
}
