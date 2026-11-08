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
    return { history, peers };
  });

