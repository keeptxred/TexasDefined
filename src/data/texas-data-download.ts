import type { TexasDataset } from './texas-data-center';
import type { SchoolDistrictTaxRateData } from './school-district-tax-rates';

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

/**
 * Statewide school tax-rate export. Blank cells mean unknown/unreported, never
 * zero. Variable-rate districts retain their distinct reported rate options;
 * the export does not collapse them into a fabricated single rate.
 */
export function buildSchoolDistrictTaxRateCsv(data: SchoolDistrictTaxRateData): string {
  const header = [
    'school_district', 'county_slugs', 'year', 'total_rate_per_100',
    'rate_variants_per_100', 'm_and_o_rate_per_100', 'i_and_s_rate_per_100',
    'prior_year', 'prior_total_rate_per_100', 'year_over_year_change_per_100',
    'tax_per_100k_taxable_value_or_options', 'source_status', 'source_url',
    'official_source_page', 'official_workbook_url', 'data_imported_at',
  ];
  const rows = data.rows.slice().sort((a, b) => a.name.localeCompare(b.name))
    .map((row) => {
      const total = row.variableRate ? null : row.rate;
      const change = total != null && row.priorRate != null ? total - row.priorRate : null;
      const amount = row.variableRate
        ? row.rateVariants.map((rate) => rate * 1000).join('; ')
        : total != null ? total * 1000 : null;
      return [
        row.name, row.countySlugs.join('; '), data.year, total,
        row.rateVariants.join('; '), row.maintenanceOperationsRate,
        row.debtServiceRate, data.priorYear, row.priorRate, change, amount,
        row.sourceStatus, row.sourceUrl, data.sourcePage, data.sourceWorkbook,
        data.generatedAt ?? '',
      ];
    });
  return '\uFEFF' + [header, ...rows].map((row) =>
    row.map(escapeTexasCsvCell).join(',')).join('\r\n') + '\r\n';
}
