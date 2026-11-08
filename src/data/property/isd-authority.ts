import hood from './hood-cad-isd-adopted.json';
import tea from './tea-isd-history.generated.json';

// Local CAD evidence is deliberately display-only. Never mutate statewide
// Comptroller records, calculators, or source-status flags with these figures.
export const hoodIsdEvidence = hood;
export type VerifiedHoodIsdRate = (typeof hood.districts)[keyof typeof hood.districts];

export function getVerifiedHoodIsdAdoption(slug: string): VerifiedHoodIsdRate | null {
  return Object.prototype.hasOwnProperty.call(hood.districts, slug)
    ? hood.districts[slug as keyof typeof hood.districts]
    : null;
}

const teaHistoricalRecords = new Map(tea.records.map((entry) => [`${entry.slug}:${entry.year}`, entry]));
export const teaIsdEvidence = { sourceUrl: tea.sourceUrl, sourceSha256: tea.sourceSha256, coverage: tea.coverage };

function hasMatchingTeaCdn(officialIds: string[], cdn: string) {
  return officialIds.some((id) => {
    const parts = id.match(/^(\d{3})-(\d{3})-02(?:-|$)/);
    return parts != null && parts[1] + parts[2] === cdn;
  });
}

export function getVerifiedIsdHistoricalComponents(
  slug: string, year: number, statewideTotal: number | null, officialIds: string[] = [],
) {
  // Evidence only: no changes to Comptroller source records, state calculators,
  // or the published statewide total. Reject stale source/identity mismatches.
  if (statewideTotal == null || !Number.isFinite(statewideTotal)) return null;
  const entries = hood.historicalComponents as Record<string, Record<string, {
    totalRate: number;
    maintenanceOperationsRate: number;
    debtServiceRate: number;
    sourceUrl: string;
  }>>;
  const local = entries[slug]?.[String(year)];
  if (local
    && Math.abs(local.totalRate - statewideTotal) <= 0.000002
    && Math.abs(local.maintenanceOperationsRate + local.debtServiceRate - local.totalRate) <= 0.000002) {
    // Exact local CAD evidence takes precedence over rounded state-agency data.
    return { ...local, sourceAgency: 'Hood Central Appraisal District', precisionStatus: 'exact' as const };
  }
  const entry = teaHistoricalRecords.get(`${slug}:${year}`);
  if (!entry || !hasMatchingTeaCdn(officialIds, entry.cdn)
    || Math.abs(Number(entry.total) - statewideTotal) > 0.000002) return null;
  const mo = Number(entry.mo);
  const debt = Number(entry.debt);
  const difference = Math.abs(mo + debt - statewideTotal);
  const exact = entry.precision === 'exact';
  if (!Number.isFinite(mo) || !Number.isFinite(debt) || mo < 0 || debt < 0
    || !((exact && difference <= 0.000002)
      || (!exact && entry.precision === 'rounded_source_difference' && difference <= 0.0001))
    || Math.abs(difference - Number(entry.delta)) > 0.000002) return null;
  return {
    totalRate: statewideTotal,
    maintenanceOperationsRate: mo,
    debtServiceRate: debt,
    sourceUrl: tea.sourceUrl,
    sourceAgency: 'Texas Education Agency',
    precisionStatus: exact ? 'exact' as const : 'lower-precision' as const,
    sourceFiscalYear: `${year}-${year + 1}`,
    sourceSha256: tea.sourceSha256,
  };
}
