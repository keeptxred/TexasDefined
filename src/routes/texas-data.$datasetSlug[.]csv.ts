import { createFileRoute } from '@tanstack/react-router';
import type {} from '@tanstack/react-start';

export const Route = createFileRoute('/texas-data/$datasetSlug.csv')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const match = url.pathname.match(/^\/texas-data\/([^/]+)\.csv$/);
        const slug = match?.[1] ? decodeURIComponent(match[1]) : '';
        const { getTexasDataset } = await import('@/data/texas-data-center.server');
        const dataset = getTexasDataset(slug);

        if (!dataset) {
          return new Response('TexasDefined dataset not found', {
            status: 404,
            headers: {
              'content-type': 'text/plain; charset=utf-8',
              'cache-control': 'no-store',
              'x-robots-tag': 'noindex, follow',
            },
          });
        }

        const header = ['label', 'value', 'unit', 'note', 'coverage_year', 'source_name', 'source_url', 'last_verified'];
        const rows = dataset.rows.map((row) => [
          row.label,
          row.value,
          dataset.unit,
          row.note ?? '',
          dataset.year,
          dataset.sourceName,
          dataset.sourceUrl,
          dataset.updated,
        ]);
        const csv = [header, ...rows].map((row) => row.map(csvCell).join(',')).join('\n');
        const filename = `texasdefined-${dataset.slug}.csv`;

        return new Response(`${csv}\n`, {
          headers: {
            'content-type': 'text/csv; charset=utf-8',
            'content-disposition': `attachment; filename="${filename}"`,
            'cache-control': 'public, max-age=86400, stale-while-revalidate=604800',
            'x-robots-tag': 'noindex, follow',
          },
        });
      },
    },
  },
});

function csvCell(value: string | number) {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}
