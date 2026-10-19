import { createFileRoute } from '@tanstack/react-router';
import type {} from '@tanstack/react-start';

import { buildSchoolDistrictTaxRateCsv } from '@/data/texas-data-download';

export const Route = createFileRoute('/texas-data/school-district-tax-rates.csv')({
  server: {
    handlers: {
      GET: async () => {
        try {
          const { getSchoolDistrictTaxRateData } = await import('@/data/school-district-tax-rates');
          const data = await getSchoolDistrictTaxRateData();
          if (!data.rows.length) throw new Error('No verified school-district tax-rate records');
          return new Response(buildSchoolDistrictTaxRateCsv(data), {
            headers: {
              'content-type': 'text/csv; charset=utf-8',
              'content-disposition': `attachment; filename="texas-school-district-tax-rates-${data.year}.csv"`,
              'cache-control': 'public, max-age=300, stale-while-revalidate=900',
              'x-robots-tag': 'noindex, follow',
            },
          });
        } catch {
          // Fail closed rather than publishing an empty or misleading tax-rate file.
          return new Response('School district tax-rate data temporarily unavailable', {
            status: 503,
            headers: {
              'content-type': 'text/plain; charset=utf-8',
              'cache-control': 'no-store',
              'retry-after': '300',
              'x-robots-tag': 'noindex, follow',
            },
          });
        }
      },
    },
  },
});
