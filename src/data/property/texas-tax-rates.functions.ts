import { createServerFn } from '@tanstack/react-start';
import type { TexasTaxingUnitType } from '@/data/property/texas-tax-rates.generated';

export const getTaxingUnitRateHistory = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string; type?: TexasTaxingUnitType }) => data)
  .handler(async ({ data }) => {
    const { getTaxingUnitRateHistoryServer } = await import('@/data/property/texas-tax-rates.server');
    return getTaxingUnitRateHistoryServer(data.slug, data.type);
  });
