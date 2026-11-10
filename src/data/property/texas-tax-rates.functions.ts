import { createServerFn } from '@tanstack/react-start';
import type { TexasTaxingUnitType } from '@/data/property/texas-tax-rates.generated';

export const getTaxingUnitRateHistory = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string; type?: TexasTaxingUnitType }) => data)
  .handler(async ({ data }) => {
    const { getTaxingUnitRateHistoryServer, getSchoolDistrictPeerRatesServer } = await import('@/data/property/texas-tax-rates.server');
    const history = await getTaxingUnitRateHistoryServer(data.slug, data.type);
    const latest = history.at(-1);
    const peers = latest?.type === 'school-district' && latest.totalRate != null && !latest.rateUnavailable && latest.countySlugs.length
      ? await getSchoolDistrictPeerRatesServer(latest.countySlugs[0], latest.year, latest.slug, latest.totalRate)
      : [];
    // Assemble immutable district-specific evidence on the server only.
    // Client route receives a small attributed result, not source catalogs.
    const isdEvidence = latest?.type === 'school-district' ? await (async () => {
      const source = await import('@/data/property/isd-authority');
      const tea = await import('@/data/property/tea-isd-components.server');
      return {
        adoption: source.getVerifiedHoodIsdAdoption(latest.slug),
        officialYear: source.hoodIsdEvidence.officialYear,
        sourceUrl: source.hoodIsdEvidence.sourceUrl,
        sourceDocumentsUrl: source.hoodIsdEvidence.sourceDocumentsUrl,
        exemptionSourceUrl: source.hoodIsdEvidence.exemptionSourceUrl,
        historicalComponents: history.map((item) => {
          const hood = source.getVerifiedIsdHistoricalComponents(item.slug, item.year, item.totalRate);
          const verified = hood
            ? { ...hood, sourceAgency: source.hoodIsdEvidence.sourceAgency }
            : tea.getVerifiedTeaIsdHistoricalComponents(item.slug, item.year, item.totalRate, item.officialTaxingUnitIds);
          return { year: item.year, components: verified };
        }).filter((item) => item.components != null),
      };
    })() : null;
    return { history, peers, isdEvidence };
  });

