import { createFileRoute } from '@tanstack/react-router';
import type {} from '@tanstack/react-start';

export const Route = createFileRoute('/texas-data/high-school-football-regions.csv')({
  server: {
    handlers: {
      GET: async () => {
        const { loadFootballRegionResearchServer } = await import('@/data/research/high-school-football-regions.server');
        const data = loadFootballRegionResearchServer();
        if (!data.available) return new Response('Complete UIL football alignment is temporarily unavailable', { status: 503, headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex, follow' } });
        const header = ['school_name', 'classification', 'division', 'district', 'uil_region', 'football_format', 'program_profile_url', 'uil_alignment_source_url'];
        const rows = data.programs.map((row) => [row.schoolName, row.classification, row.division ?? '', row.district, row.region, row.footballType, `https://texasdefined.com${row.profilePath}`, row.sourceUrl]);
        const csv = [header, ...rows].map((row) => row.map(csvCell).join(',')).join('\n');
        return new Response(`${csv}\n`, { headers: { 'content-type': 'text/csv; charset=utf-8', 'content-disposition': 'attachment; filename="texas-high-school-football-uil-regions-2026-28.csv"', 'cache-control': 'public, max-age=86400, stale-while-revalidate=604800', 'x-robots-tag': 'noindex, follow' } });
      },
    },
  },
});

function csvCell(value: string | number) {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}
