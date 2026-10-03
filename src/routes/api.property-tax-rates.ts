import { createFileRoute } from '@tanstack/react-router';
import type { TexasTaxingUnitType } from '@/data/property/texas-tax-rates.generated';

const HEADERS = {
  'cache-control': 'public, max-age=3600, stale-while-revalidate=86400',
  'access-control-allow-origin': '*',
  'x-robots-tag': 'noindex, follow',
};
const quote = (value: unknown) => `"${String(value ?? '').replace(/"/g, '""')}"`;

export const Route = createFileRoute('/api/property-tax-rates')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const {
            getCountyTaxRateSummaryServer,
            getLatestTaxRateYearServer,
            getTaxRateCatalogServer,
            getTaxRateDatasetCountServer,
            getTaxingUnitRateHistoryServer,
            searchTaxingUnitsServer,
            taxRateMetadata,
            TAX_RATE_SOURCE_NAME,
            TAX_RATE_SOURCE_PAGE,
          } = await import('@/data/property/texas-tax-rates.server');

          const latestYear = await getLatestTaxRateYearServer();
          const url = new URL(request.url);
          const requestedYear = Number(url.searchParams.get('year') ?? latestYear);
          const year = Number.isInteger(requestedYear) && requestedYear >= 2021 && requestedYear <= latestYear ? requestedYear : latestYear;
          const county = url.searchParams.get('county')?.trim().toLowerCase() ?? '';
          const query = url.searchParams.get('q')?.trim() ?? '';
          const unit = url.searchParams.get('unit')?.trim().toLowerCase() ?? '';
          const type = (url.searchParams.get('type')?.trim() || undefined) as TexasTaxingUnitType | undefined;
          const download = url.searchParams.get('download')?.trim().toLowerCase() ?? '';

          if (download === 'latest-csv') {
            const records = await getTaxRateCatalogServer(latestYear);
            const header = [
              'year', 'taxing_unit_name', 'taxing_unit_type', 'slug', 'county_slugs', 'total_rate_per_100', 'maintenance_operations_rate',
              'debt_service_rate', 'reported_levy', 'source_status', 'variable_rate', 'rate_variants', 'rate_unavailable',
              'official_taxing_unit_ids', 'split_across_cads', 'canonical_url', 'source_name', 'source_url',
            ];
            const rows = records.map((record) => [
              record.year,
              record.name,
              record.type,
              record.slug,
              record.countySlugs.join(' | '),
              record.totalRate ?? '',
              record.maintenanceOperationsRate ?? '',
              record.debtServiceRate ?? '',
              record.levy ?? '',
              record.sourceStatus,
              record.variableRate ? 'yes' : 'no',
              record.rateVariants.join(' | '),
              record.rateUnavailable ? 'yes' : 'no',
              record.officialTaxingUnitIds.join(' | '),
              record.splitAcrossCads ? 'yes' : 'no',
              `https://texasdefined.com/property-tax/taxing-unit/${record.slug}`,
              TAX_RATE_SOURCE_NAME,
              record.sourceUrl || TAX_RATE_SOURCE_PAGE,
            ]);
            const csv = [header, ...rows].map((row) => row.map(quote).join(',')).join('\n');
            return new Response(`${csv}\n`, {
              headers: {
                ...HEADERS,
                'content-type': 'text/csv; charset=utf-8',
                'content-disposition': `attachment; filename="texasdefined-property-tax-rates-${latestYear}.csv"`,
              },
            });
          }

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
              download: '/api/property-tax-rates?download=latest-csv',
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
