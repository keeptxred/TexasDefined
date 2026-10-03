import { createFileRoute } from '@tanstack/react-router';
import type {} from '@tanstack/react-start';

export const Route = createFileRoute('/texas-data/high-school-football-programs.csv')({
  server: {
    handlers: {
      GET: async () => {
        const { getAllUilFootballProgramIndexEntries } = await import('@/data/high-school-football/football-program-index.server');
        const programs = getAllUilFootballProgramIndexEntries();
        const header = ['school_name', 'classification', 'division', 'district', 'football_type', 'uil_enrollment', 'texasdefined_profile'];
        const rows = programs.map((program) => [
          program.schoolName,
          program.classification,
          program.division ? `Division ${program.division === 1 ? 'I' : 'II'}` : '',
          program.district,
          program.footballType,
          program.uilEnrollment || '',
          `https://texasdefined.com${program.profilePath}`,
        ]);
        const csv = [header, ...rows].map((row) => row.map(csvCell).join(',')).join('\n');

        return new Response(`${csv}\n`, {
          headers: {
            'content-type': 'text/csv; charset=utf-8',
            'content-disposition': 'attachment; filename="texas-uil-football-programs-2026-2028.csv"',
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
