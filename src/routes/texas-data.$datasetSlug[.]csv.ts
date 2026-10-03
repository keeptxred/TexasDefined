import { createFileRoute } from '@tanstack/react-router';
import type {} from '@tanstack/react-start';

export const Route = createFileRoute('/texas-data/$datasetSlug.csv')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { loadTexasReferenceDataset } = await import('@/data/texas-reference-datasets.server');
        const dataset = await loadTexasReferenceDataset(params.datasetSlug, { full: true });
        if (!dataset) {
          return new Response('TexasDefined dataset not found', {
            status: 404,
            headers: { 'content-type': 'text/plain; charset=utf-8', 'x-robots-tag': 'noindex, follow' },
          });
        }

        const keys = dataset.columns.map((column) => column.key);
        const extraKeys = dataset.rows.reduce<string[]>((current, row) => {
          for (const key of Object.keys(row)) if (!keys.includes(key) && !current.includes(key)) current.push(key);
          return current;
        }, []);
        const header = [...keys, ...extraKeys];
        const rows = dataset.rows.map((row) => header.map((key) => row[key] ?? ''));
        const csv = [header, ...rows].map((row) => row.map(csvCell).join(',')).join('\n');

        return new Response(`${csv}\n`, {
          headers: {
            'content-type': 'text/csv; charset=utf-8',
            'content-disposition': `attachment; filename="${dataset.csvFilename}"`,
            'cache-control': 'public, max-age=3600, stale-while-revalidate=86400',
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
