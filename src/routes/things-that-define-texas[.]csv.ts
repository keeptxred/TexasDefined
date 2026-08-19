import { createFileRoute } from '@tanstack/react-router';

function csvCell(value: string | number | null) {
  const text = value === null ? '' : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

export const Route = createFileRoute('/things-that-define-texas.csv')({
  server: {
    handlers: {
      GET: async () => {
        const { TEXAS_ICON_REFERENCE_ROWS } = await import('@/data/things-unique-to-texas-reference');
        const headers = ['id', 'name', 'description', 'chapter', 'chapter_title', 'deeper_guide', 'canonical_collection', 'methodology'];
        const rows = TEXAS_ICON_REFERENCE_ROWS.map((row) => [
          row.id,
          row.name,
          row.description,
          row.chapter,
          row.chapterTitle,
          row.deeperGuide,
          row.canonicalCollection,
          row.methodology,
        ]);
        const csv = [headers, ...rows].map((row) => row.map(csvCell).join(',')).join('\n');

        return new Response(`${csv}\n`, {
          headers: {
            'content-type': 'text/csv; charset=utf-8',
            'content-disposition': 'attachment; filename="texasdefined-things-that-define-texas.csv"',
            'cache-control': 'public, max-age=3600, stale-while-revalidate=86400',
            'x-robots-tag': 'noindex, follow',
          },
        });
      },
    },
  },
});
