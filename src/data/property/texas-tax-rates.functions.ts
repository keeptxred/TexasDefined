import { createServerFn } from '@tanstack/react-start';
import type { TexasTaxingUnitType } from '@/data/property/texas-tax-rates.generated';

export const getTaxingUnitRateHistory = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string; type?: TexasTaxingUnitType }) => data)
  .handler(async ({ data }) => {
    const { getTaxingUnitRateHistoryServer } = await import('@/data/property/texas-tax-rates.server');
    return getTaxingUnitRateHistoryServer(data.slug, data.type);
  });

export const getSchoolDistrictPeerRates = createServerFn({ method: 'GET' })
  .inputValidator((data: { countySlug: string; year: number; slug: string; rate: number }) => data)
  .handler(async ({ data }) => {
    const { getSchoolDistrictPeerRatesServer } = await import('@/data/property/texas-tax-rates.server');
    return getSchoolDistrictPeerRatesServer(data.countySlug, data.year, data.slug, data.rate);
  });
