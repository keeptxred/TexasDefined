import type { TexasDataset } from './texas-data-center';

export function escapeTexasCsvCell(value: unknown): string {
  const text = typeof value === 'number'
    ? (Number.isFinite(value) ? String(value) : '')
    : String(value ?? '');
  // Quotes alone do not stop spreadsheet programs from evaluating formulas.
  // Only string cells are neutralized; negative numeric measurements stay numeric.
  const safe = typeof value === 'number' ? text
    : /^[\s]*[=+\-@]/.test(text) ? "'" + text : text;
  return '"' + safe.replaceAll('"', '""') + '"';
}

export function buildTexasDatasetCsv(dataset: TexasDataset): string {
  const header = ['metric','value','unit','year','last_verified','source_name','source_url','note','methodology'];
  const rows = dataset.rows.map(row => [
    row.label, row.value, dataset.unit, dataset.year, dataset.updated,
    dataset.sourceName, dataset.sourceUrl, row.note ?? '', dataset.methodology,
  ] as (string | number)[]);
  return '\uFEFF' + [header, ...rows].map(row => row.map(escapeTexasCsvCell).join(',')).join('\r\n') + '\r\n';
}
