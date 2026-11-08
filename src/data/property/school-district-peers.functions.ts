import { createServerFn } from '@tanstack/react-start';

// Route-scoped server function: do not add to shared tax-rate module because
// the global client entry imports it for non-ISD pages.
export const getSchoolDistrictPeerRates = createServerFn({ method: 'GET' })
  .inputValidator((data: { countySlug: string; year: number; slug: string; rate: number }) => data)
  .handler(async ({ data }) => {
    const { getSchoolDistrictPeerRatesServer } = await import('@/data/property/texas-tax-rates.server');
    return getSchoolDistrictPeerRatesServer(data.countySlug, data.year, data.slug, data.rate);
  });
