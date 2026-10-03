import { createFileRoute } from '@tanstack/react-router';

const quote = (value: unknown) => `"${String(value ?? '').replace(/"/g, '""')}"`;

export const Route = createFileRoute('/texas-property-tax-rate-history.csv')({
  server: {
    handlers: {
      GET: async () => {
        const { getLatestTaxRateYearServer, getTaxRateCatalogServer, TAX_RATE_SOURCE_NAME, TAX_RATE_SOURCE_PAGE } = await import('@/data/property/texas-tax-rates.server');
        const year = await getLatestTaxRateYearServer();
        const records = await getTaxRateCatalogServer(year);
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
            'content-type': 'text/csv; charset=utf-8',
            'content-disposition': `attachment; filename="texasdefined-property-tax-rates-${year}.csv"`,
            'cache-control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
            'x-robots-tag': 'noindex, follow',
          },
        });
      },
    },
  },
});
