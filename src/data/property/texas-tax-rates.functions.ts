import { createServerFn } from '@tanstack/react-start';
import type { TexasTaxingUnitType } from '@/data/property/texas-tax-rates.generated';

export const getTaxingUnitRateHistory = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string; type?: TexasTaxingUnitType }) => data)
  .handler(async ({ data }) => {
    const { getTaxingUnitRateHistoryServer } = await import('@/data/property/texas-tax-rates.server');
    return getTaxingUnitRateHistoryServer(data.slug, data.type);
  });

/** Server-function boundary keeps the Collin County tax snapshot crawlable on
 * first response without importing server-only database code into the client. */
export const getCountyTaxRateSnapshot = createServerFn({ method: 'GET' })
  .inputValidator((data: { countySlug: string }) => data)
  .handler(async ({ data }) => {
    const { getLatestTaxRateYearServer, getCountyTaxRateSummaryServer } = await import('@/data/property/texas-tax-rates.server');
    const year = await getLatestTaxRateYearServer();
    return (await getCountyTaxRateSummaryServer(data.countySlug, year)).summary;
  });
