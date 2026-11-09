import source from './tea-isd-historical-verified.json';

// Exact independent government-source overlay; never rewrites Comptroller rows.
// The original state rate and official taxing-unit identity must still agree at
// page-render time, even if a later statewide import revises either value.
type OfficialComponent = {
  year: number;
  officialDistrictId: string;
  name: string;
  totalRate: number;
  maintenanceOperationsRate: number;
  debtServiceRate: number;
  sourceUrl: string;
};
const districts = source.districts as Record<string, Record<string, OfficialComponent>>;

export function getVerifiedTeaIsdHistoricalComponents(
  slug: string,
  year: number,
  statewideTotal: number | null,
  officialTaxingUnitIds: string[],
) {
  if (statewideTotal == null || !Number.isFinite(statewideTotal) || !Array.isArray(officialTaxingUnitIds)) return null;
  const item = districts[slug]?.[String(year)];
  if (!item || item.year !== year || !item.name || !/^\\d{6}$/.test(item.officialDistrictId)) return null;
  const matches = officialTaxingUnitIds.some((value) =>
    value.replace(/-\\d+$/, '').replace(/-/g, '') === item.officialDistrictId);
  if (!matches || Math.abs(item.totalRate - statewideTotal) > 0.000002) return null;
  if (!Number.isFinite(item.maintenanceOperationsRate) || !Number.isFinite(item.debtServiceRate)
    || Math.abs(item.maintenanceOperationsRate + item.debtServiceRate - item.totalRate) > 0.000002) return null;
  if (item.sourceUrl !== source.sourceUrl || !item.sourceUrl.startsWith('https://tea.texas.gov/')) return null;
  return {
    totalRate: item.totalRate,
    maintenanceOperationsRate: item.maintenanceOperationsRate,
    debtServiceRate: item.debtServiceRate,
    sourceUrl: item.sourceUrl,
    sourceAgency: source.sourceAgency,
  };
}

export const teaIsdVerificationSummary = {
  sourceSha256: source.sourceSha256,
  verifiedOn: source.verifiedOn,
  exactMatches: Object.values(source.stats).reduce((sum, row) => sum + row.exactVerified, 0),
};
