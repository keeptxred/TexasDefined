import { createFileRoute } from '@tanstack/react-router';
import type { TexasTaxingUnitType } from '@/data/property/texas-tax-rates.generated';

const HEADERS = {
  'cache-control': 'public, max-age=3600, stale-while-revalidate=86400',
  'access-control-allow-origin': '*',
  'x-robots-tag': 'noindex, follow',
};

export const Route = createFileRoute('/api/property-tax-rates')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const {
            getCountyTaxRateSummaryServer,
            getLatestTaxRateYearServer,
            getTaxRateDatasetCountServer,
            getTaxingUnitRateHistoryServer,
            searchTaxingUnitsServer,
            taxRateMetadata,
          } = await import('@/data/property/texas-tax-rates.server');

          const latestYear = await getLatestTaxRateYearServer();
          const url = new URL(request.url);
          const requestedYear = Number(url.searchParams.get('year') ?? latestYear);
          const year = Number.isInteger(requestedYear) && requestedYear >= 2021 && requestedYear <= latestYear ? requestedYear : latestYear;
          const county = url.searchParams.get('county')?.trim().toLowerCase() ?? '';
          const query = url.searchParams.get('q')?.trim() ?? '';
          const unit = url.searchParams.get('unit')?.trim().toLowerCase() ?? '';
          const type = (url.searchParams.get('type')?.trim() || undefined) as TexasTaxingUnitType | undefined;

          if (unit) {
            const history = await getTaxingUnitRateHistoryServer(unit, type);
            if (!history.length) return Response.json({ error: 'Taxing unit not found' }, { status: 404, headers: HEADERS });
            return Response.json({ ready: true, metadata: taxRateMetadata(latestYear), unit: history.at(-1), history }, { headers: HEADERS });
          }

          if (county) {
            const { summary, generatedAt } = await getCountyTaxRateSummaryServer(county, year);
            const count = summary.county.length + summary.cities.length + summary.schoolDistricts.length + summary.specialDistricts.length;
            return Response.json({ ready: true, metadata: taxRateMetadata(latestYear, generatedAt, count), summary }, { headers: HEADERS });
          }

          if (query) {
            const { records, generatedAt } = await searchTaxingUnitsServer(query, year, 100);
            return Response.json({ ready: true, metadata: taxRateMetadata(latestYear, generatedAt, records.length), results: records }, { headers: HEADERS });
          }

          const count = await getTaxRateDatasetCountServer();
          return Response.json({
            ready: true,
            metadata: taxRateMetadata(latestYear, null, count),
            help: {
              county: '/api/property-tax-rates?county=harris',
              search: '/api/property-tax-rates?q=katy',
              history: '/api/property-tax-rates?unit=katy-isd&type=school-district',
            },
          }, { headers: HEADERS });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Property-tax rate lookup failed.';
          return Response.json({ ready: false, message }, { status: 503, headers: { ...HEADERS, 'cache-control': 'no-store' } });
        }
      },
    },
  },
});
