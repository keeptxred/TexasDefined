import { createFileRoute } from '@tanstack/react-router';

import { loadTexasCountyHousingCosts } from '@/data/acs-county-housing-costs';

export const Route = createFileRoute('/texas-data/county-housing-costs.csv')({
  server: {
    handlers: {
      GET: () => {
        const data = loadTexasCountyHousingCosts();
        if (!data.available) {
          return new Response('Official Census county housing/cost snapshot is not ready.\n', {
            status: 503,
            headers: {
              'content-type': 'text/plain; charset=utf-8',
              'cache-control': 'no-store',
              'x-robots-tag': 'noindex, follow',
              'retry-after': '3600',
            },
          });
        }

        const header = ['fips','county','median_home_value','median_gross_rent','median_monthly_owner_costs','median_household_income'];
        const body = [
          header.join(','),
          ...data.rows.map((row) => [
            row.fips,
            csv(row.countyName),
            row.medianHomeValue,
            row.medianGrossRent,
            row.medianMonthlyOwnerCosts,
            row.medianHouseholdIncome,
          ].join(',')),
        ].join('\n');

        return new Response(`${body}\n`, {
          headers: {
            'content-type': 'text/csv; charset=utf-8',
            'content-disposition': 'attachment; filename="texas-county-housing-costs-acs-2024.csv"',
            'cache-control': 'public, max-age=86400, s-maxage=86400',
            'x-robots-tag': 'noindex, follow',
          },
        });
      },
    },
  },
});

function csv(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}
