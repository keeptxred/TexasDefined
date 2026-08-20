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
        const {
          TEXAS_TAX_RATE_DATASET_META,
          findTaxingUnitHistory,
          getCountyTaxRateSummary,
          latestFinalizedTaxYear,
          searchTaxingUnits,
          taxRateDatasetReady,
        } = await import('@/data/property/texas-tax-rates');

        const url = new URL(request.url);
        const latestYear = latestFinalizedTaxYear();
        const yearParam = Number(url.searchParams.get('year') ?? latestYear);
        const year = Number.isInteger(yearParam) && yearParam >= 2000 && yearParam <= latestYear ? yearParam : latestYear;
        const county = url.searchParams.get('county')?.trim().toLowerCase() ?? '';
        const query = url.searchParams.get('q')?.trim() ?? '';
        const unit = url.searchParams.get('unit')?.trim().toLowerCase() ?? '';
        const type = (url.searchParams.get('type')?.trim() || undefined) as TexasTaxingUnitType | undefined;

        if (!taxRateDatasetReady()) {
          return Response.json({
            ready: false,
            metadata: TEXAS_TAX_RATE_DATASET_META,
            message: 'The official Comptroller rate dataset is awaiting its first successful sync.',
          }, { status: 503, headers: { ...HEADERS, 'cache-control': 'no-store' } });
        }

        if (unit) {
          const history = findTaxingUnitHistory(unit, type);
          if (!history.length) return Response.json({ error: 'Taxing unit not found' }, { status: 404, headers: HEADERS });
          return Response.json({ ready: true, metadata: TEXAS_TAX_RATE_DATASET_META, unit: history.at(-1), history }, { headers: HEADERS });
        }

        if (county) {
          return Response.json({ ready: true, metadata: TEXAS_TAX_RATE_DATASET_META, summary: getCountyTaxRateSummary(county, year) }, { headers: HEADERS });
        }

        if (query) {
          return Response.json({ ready: true, metadata: TEXAS_TAX_RATE_DATASET_META, results: searchTaxingUnits(query, year, 100) }, { headers: HEADERS });
        }

        return Response.json({
          ready: true,
          metadata: TEXAS_TAX_RATE_DATASET_META,
          help: {
            county: '/api/property-tax-rates?county=harris',
            search: '/api/property-tax-rates?q=katy',
            history: '/api/property-tax-rates?unit=katy-independent-school-district',
          },
        }, { headers: HEADERS });
      },
    },
  },
});
