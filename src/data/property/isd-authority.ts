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
  // The 2022 Tolar summary contains unreconciled columns; never infer those components.
  if (slug !== 'tolar-isd' || statewideTotal == null) return null;
  const entry = hood.historicalComponents['tolar-isd'][String(year) as keyof typeof hood.historicalComponents['tolar-isd']];
  if (!entry) return null;
  if (Math.abs(entry.totalRate - statewideTotal) > 0.000002) return null;
  if (Math.abs(entry.maintenanceOperationsRate + entry.debtServiceRate - entry.totalRate) > 0.000002) return null;
  return entry;
}
