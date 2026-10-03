import { createFileRoute } from '@tanstack/react-router';

const source = 'https://www.census.gov/data/datasets/time-series/demo/popest/2020s-state-total.html';
const rows = [
  ['Numeric population growth', 598297, 391243, -207054, -34.6072268455],
  ['Net domestic migration', 86067, 67299, -18768, -21.8062672104],
  ['Net international migration', 354864, 167475, -187389, -52.8058636548],
  ['Natural increase', 157366, 157711, 345, 0.2192341421],
] as const;

export const Route = createFileRoute('/texas-data/research/texas-population-growth-slowdown.csv')({
  server: { handlers: { GET: () => {
    const header = 'measure,period_2023_24,period_2024_25,absolute_change,percent_change,unit,vintage,source';
    const body = rows.map(([measure, prior, current, change, pct]) => [measure, prior, current, change, pct.toFixed(4), 'people', '2025', source].map(csv).join(',')).join('\n');
    return new Response(`${header}\n${body}\n`, { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="texasdefined-texas-population-growth-slowdown-vintage-2025.csv"', 'Cache-Control': 'public, max-age=3600' } });
  } } },
});
function csv(value: string | number) { const text = String(value); return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text; }
