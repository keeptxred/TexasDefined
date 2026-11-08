import hood from './hood-cad-isd-adopted.json';

// Local CAD evidence is deliberately display-only. Never mutate statewide
// Comptroller records, calculators, or source-status flags with these figures.
export const hoodIsdEvidence = hood;
export type VerifiedHoodIsdRate = (typeof hood.districts)[keyof typeof hood.districts];

export function getVerifiedHoodIsdAdoption(slug: string): VerifiedHoodIsdRate | null {
  return Object.prototype.hasOwnProperty.call(hood.districts, slug)
    ? hood.districts[slug as keyof typeof hood.districts]
    : null;
}

export function getVerifiedIsdHistoricalComponents(slug: string, year: number, statewideTotal: number | null) {
  // Never backfill a disputed observation or derive components by subtraction.
  // Every candidate must be in the source-qualified allowlist and reconcile
  // against the unchanged Comptroller year-specific adopted total.
  if (statewideTotal == null) return null;
  const entries = hood.historicalComponents as Record<string, Record<string, {
    totalRate: number;
    maintenanceOperationsRate: number;
    debtServiceRate: number;
    sourceUrl: string;
  }>>;
  const entry = entries[slug]?.[String(year)];
  if (!entry) return null;
  if (Math.abs(entry.totalRate - statewideTotal) > 0.000002) return null;
  if (Math.abs(entry.maintenanceOperationsRate + entry.debtServiceRate - entry.totalRate) > 0.000002) return null;
  return entry;
}
