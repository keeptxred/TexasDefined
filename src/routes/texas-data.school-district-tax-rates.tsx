import { createFileRoute, Link } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { CitationTrustPanel } from '@/components/authority/CitationTrustPanel';
import { Container } from '@/components/layout/Container';
import { getSchoolDistrictTaxRateData, type SchoolDistrictTaxRateRow } from '@/data/school-district-tax-rates';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/texas-data/school-district-tax-rates';
const publishedDate = '2026-07-30';
const updatedDate = '2026-10-04';
const publishedLabel = 'July 30, 2026';
const updatedLabel = 'October 4, 2026';
const teaSource = 'https://tea.texas.gov/about-tea/state-funding/additional-finance-resources/school-district-property-values-and-tax-rates';

type SortKey = 'district' | 'rate-high' | 'rate-low' | 'change-up' | 'change-down';

export const Route = createFileRoute('/texas-data/school-district-tax-rates')({
  loader: () => getSchoolDistrictTaxRateData(),
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const title = `Texas School District Property Tax Rates — ${loaderData.year}`;
    const description = `Search Texas school district property-tax rates for ${loaderData.year}, compare ${loaderData.priorYear}, M&O and I&S components where reported, and download the official Comptroller workbook.`;
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    const meta = buildMeta(texasDefinedBrand, {
      title,
      description,
      robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    });
    return {
      meta: [...meta, { property: 'og:url', content: pageUrl }],
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Dataset',
            '@id': `${pageUrl}#dataset`,
            name: title,
            description,
            url: pageUrl,
            datePublished: publishedDate,
            dateModified: updatedDate,
            temporalCoverage: `${loaderData.priorYear}/${loaderData.year}`,
            spatialCoverage: { '@type': 'State', name: 'Texas' },
            creator: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
            publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
            isBasedOn: loaderData.sourceWorkbook,
            citation: loaderData.sourcePage,
            measurementTechnique: 'Texas Comptroller total adopted school-district tax rates, matched by district between the current and prior tax years.',
            variableMeasured: [
              { '@type': 'PropertyValue', name: `${loaderData.year} total adopted tax rate`, unitText: 'dollars per $100 taxable value' },
              { '@type': 'PropertyValue', name: `${loaderData.priorYear} total adopted tax rate`, unitText: 'dollars per $100 taxable value' },
              { '@type': 'PropertyValue', name: 'Maintenance and Operations rate', unitText: 'dollars per $100 taxable value' },
              { '@type': 'PropertyValue', name: 'Interest and Sinking rate', unitText: 'dollars per $100 taxable value' },
            ],
            distribution: [
              { '@type': 'DataDownload', encodingFormat: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', contentUrl: loaderData.sourceWorkbook },
              { '@type': 'DataDownload', encodingFormat: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', contentUrl: loaderData.priorWorkbook },
            ],
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Front page', item: absoluteUrl(texasDefinedBrand, '/') },
              { '@type': 'ListItem', position: 2, name: 'Texas data', item: absoluteUrl(texasDefinedBrand, '/texas-data') },
              { '@type': 'ListItem', position: 3, name: title, item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
  component: SchoolDistrictTaxRatesPage,
});

function SchoolDistrictTaxRatesPage() {
  const data = Route.useLoaderData();
  const [query, setQuery] = useState('');
  const [county, setCounty] = useState('');
  const [sort, setSort] = useState<SortKey>('district');

  const counties = useMemo(() => Array.from(new Set(data.rows.flatMap((row) => row.countySlugs))).sort(), [data.rows]);
  const reported = useMemo(() => data.rows.filter((row) => row.rate != null && !row.variableRate), [data.rows]);
  const stats = useMemo(() => summarize(reported), [reported]);
  const comparisonRows = useMemo(() => data.rows.filter((row) => row.rate != null && row.priorRate != null && !row.variableRate), [data.rows]);
  const biggestIncrease = useMemo(() => [...comparisonRows].sort((a, b) => rateChange(b) - rateChange(a))[0], [comparisonRows]);
  const biggestDecrease = useMemo(() => [...comparisonRows].sort((a, b) => rateChange(a) - rateChange(b))[0], [comparisonRows]);

  const filteredRows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const rows = data.rows.filter((row) => {
      const matchesQuery = !needle || row.name.toLowerCase().includes(needle) || row.countySlugs.some((slug) => countyLabel(slug).toLowerCase().includes(needle));
      const matchesCounty = !county || row.countySlugs.includes(county);
      return matchesQuery && matchesCounty;
    });
    return rows.sort((a, b) => compareRows(a, b, sort));
  }, [county, data.rows, query, sort]);

  const sourceSync = data.generatedAt ? formatDateTime(data.generatedAt) : 'Current production dataset';
  const title = `Texas School District Property Tax Rates — ${data.year}`;

  return (
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <article className="mx-auto max-w-7xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Front page</Link><span aria-hidden="true" className="mx-2">/</span>
          <Link to="/texas-data" className="hover:text-foreground">Texas data</Link><span aria-hidden="true" className="mx-2">/</span>
          <span aria-current="page" className="text-foreground">School district tax rates</span>
        </nav>

        <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
          <div>
            <p className="eyebrow text-primary">Texas data · {data.year}</p>
            <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">{title}</h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground sm:text-xl">Search the statewide Comptroller-backed school-district rate dataset, compare {data.year} with {data.priorYear}, and see what each adopted rate means per $100,000 of taxable value.</p>
            <div className="mt-7 flex flex-wrap gap-3 text-sm font-semibold">
              <a href={data.sourceWorkbook} className="border border-foreground px-4 py-2 hover:bg-foreground hover:text-background">Official {data.year} XLSX</a>
              <button type="button" onClick={() => downloadCsv(data.rows, data.year, data.priorYear)} className="border border-border px-4 py-2 hover:border-foreground">Download TexasDefined CSV</button>
            </div>
          </div>
          <dl className="border-l border-border pl-6 text-sm">
            <MetaRow label="Source" value="Texas Comptroller PTAD" />
            <div className="border-b border-border py-3"><dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">Published</dt><dd className="mt-1 font-medium"><time dateTime={publishedDate}>{publishedLabel}</time></dd></div>
            <div className="border-b border-border py-3"><dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">Updated</dt><dd className="mt-1 font-medium"><time dateTime={updatedDate}>{updatedLabel}</time></dd></div>
            <MetaRow label="Production sync" value={sourceSync} />
            <MetaRow label="District records" value={new Intl.NumberFormat('en-US').format(data.rows.length)} last />
          </dl>
        </header>

        <section className="grid gap-px bg-border border border-border my-10 sm:grid-cols-2 lg:grid-cols-4" aria-label="Statewide summary">
          <Stat label="Median reported rate" value={formatRate(stats.median)} note="Unweighted district median" />
          <Stat label="Simple district average" value={formatRate(stats.mean)} note={`${reported.length.toLocaleString()} unambiguous reported rates`} />
          <Stat label="Lowest reported rate" value={formatRate(stats.low?.rate ?? null)} note={stats.low?.name ?? 'Not available'} />
          <Stat label="Highest reported rate" value={formatRate(stats.high?.rate ?? null)} note={stats.high?.name ?? 'Not available'} />
        </section>

        <section className="grid gap-8 border-y border-border py-9 lg:grid-cols-3">
          <div>
            <p className="eyebrow text-primary">How to read the rate</p>
            <h2 className="mt-2 font-display text-3xl">Dollars per $100 of taxable value</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">A school rate of <strong className="text-foreground">$1.1000</strong> means $1.10 for every $100 of taxable value — or <strong className="text-foreground">$1,100 per $100,000</strong> of taxable value. This is the school-district portion only, before city, county and special-district taxes.</p>
          </div>
          <div>
            <p className="eyebrow text-primary">What M&O and I&S mean</p>
            <h2 className="mt-2 font-display text-3xl">Operations vs. debt</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">M&O</strong> is Maintenance and Operations, which funds day-to-day school operations. <strong className="text-foreground">I&S</strong> is Interest and Sinking, used for voter-approved debt and facilities. Component columns appear when the source-backed record contains them.</p>
          </div>
          <div>
            <p className="eyebrow text-primary">Year-over-year signal</p>
            <h2 className="mt-2 font-display text-3xl">Largest moves in this dataset</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">Largest increase: <strong className="text-foreground">{biggestIncrease?.name ?? '—'}</strong> {formatChange(biggestIncrease ? rateChange(biggestIncrease) : null)}. Largest decrease: <strong className="text-foreground">{biggestDecrease?.name ?? '—'}</strong> {formatChange(biggestDecrease ? rateChange(biggestDecrease) : null)}.</p>
          </div>
        </section>

        <section className="py-10" aria-labelledby="database-heading">
          <div className="flex flex-col gap-5 border-b border-border pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow text-primary">Statewide database</p>
              <h2 id="database-heading" className="mt-2 font-display text-4xl">Find a Texas school district</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">Showing {filteredRows.length.toLocaleString()} of {data.rows.length.toLocaleString()} district records. Districts spanning multiple counties are searchable under every county recorded in the source dataset.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[42rem]">
              <label className="text-xs font-semibold uppercase tracking-[0.12em]">Search
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="District or county" className="mt-2 w-full border border-border bg-background px-3 py-2 text-sm font-normal normal-case tracking-normal outline-none focus:border-foreground" />
              </label>
              <label className="text-xs font-semibold uppercase tracking-[0.12em]">County
                <select value={county} onChange={(event) => setCounty(event.target.value)} className="mt-2 w-full border border-border bg-background px-3 py-2 text-sm font-normal normal-case tracking-normal outline-none focus:border-foreground">
                  <option value="">All counties</option>
                  {counties.map((slug) => <option key={slug} value={slug}>{countyLabel(slug)}</option>)}
                </select>
              </label>
              <label className="text-xs font-semibold uppercase tracking-[0.12em]">Sort
                <select value={sort} onChange={(event) => setSort(event.target.value as SortKey)} className="mt-2 w-full border border-border bg-background px-3 py-2 text-sm font-normal normal-case tracking-normal outline-none focus:border-foreground">
                  <option value="district">District A–Z</option>
                  <option value="rate-high">{data.year} rate: high to low</option>
                  <option value="rate-low">{data.year} rate: low to high</option>
                  <option value="change-up">Largest increases</option>
                  <option value="change-down">Largest decreases</option>
                </select>
              </label>
            </div>
          </div>

          <div className="overflow-x-auto border-b border-border">
            <table className="w-full min-w-[72rem] border-collapse text-left text-sm">
              <thead className="text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="py-3 pr-5">School district</th><th className="px-3 py-3">County / counties</th><th className="px-3 py-3 text-right">{data.year} total</th><th className="px-3 py-3 text-right">M&O</th><th className="px-3 py-3 text-right">I&S</th><th className="px-3 py-3 text-right">{data.priorYear} total</th><th className="px-3 py-3 text-right">Change</th><th className="py-3 pl-3 text-right">Tax / $100K</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => <tr key={row.slug} className="border-b border-border/70 align-top">
                  <td className="py-4 pr-5"><p className="font-semibold text-foreground">{row.name}</p>{row.variableRate ? <p className="mt-1 text-xs text-muted-foreground">Rate varies across reported jurisdictions</p> : null}</td>
                  <td className="px-3 py-4 text-muted-foreground">{row.countySlugs.length ? row.countySlugs.map(countyLabel).join(', ') : '—'}</td>
                  <td className="px-3 py-4 text-right font-semibold">{formatRowRate(row)}</td>
                  <td className="px-3 py-4 text-right">{formatRate(row.maintenanceOperationsRate)}</td>
                  <td className="px-3 py-4 text-right">{formatRate(row.debtServiceRate)}</td>
                  <td className="px-3 py-4 text-right">{formatRate(row.priorRate)}</td>
                  <td className="px-3 py-4 text-right">{formatChange(row.rate != null && row.priorRate != null && !row.variableRate ? rateChange(row) : null)}</td>
                  <td className="py-4 pl-3 text-right">{formatTaxPer100k(row)}</td>
                </tr>)}
              </tbody>
            </table>
          </div>
          {!filteredRows.length ? <p className="py-8 text-sm text-muted-foreground">No school districts match those filters.</p> : null}
        </section>

        <section className="grid gap-8 border-y border-border py-9 lg:grid-cols-[1.3fr_.7fr]">
          <div>
            <p className="eyebrow text-primary">Recommended citation</p>
            <h2 className="mt-2 font-display text-3xl">Cite this reference page</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">TexasDefined editorial staff. “Texas School District Property Tax Rates — {data.year}.” TexasDefined.com. Published {publishedLabel}; updated {updatedLabel}. Source data: Texas Comptroller of Public Accounts, Property Tax Assistance Division.</p>
          </div>
          <div>
            <p className="eyebrow text-primary">Editor & scope</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Edited by the <Link to="/about" className="font-semibold text-foreground underline underline-offset-4">TexasDefined editorial staff</Link>. Rates are adopted taxing-unit rates, not effective household tax rates or parcel-specific bills. Always verify the taxing units and exemptions attached to a specific property.</p>
          </div>
        </section>

        <CitationTrustPanel
          className="mt-10"
          sources={[
            { name: `${data.sourceName} — ${data.year} School District Rates and Levies`, url: data.sourceWorkbook, note: `Official statewide ${data.year} workbook used by the production rate dataset.` },
            { name: `${data.sourceName} — Tax Rates and Levies`, url: data.sourcePage, note: 'Official methodology, reporting notes and annual workbook index.' },
            { name: 'Texas Education Agency — School District Property Values and Tax Rates', url: teaSource, note: 'Official school-finance reference for adopted M&O and I&S tax-rate components.' },
          ]}
          methodology={`TexasDefined reads its production school-district records from the statewide Texas Comptroller Property Tax Assistance Division rate dataset. The ${data.year} rows are matched to ${data.priorYear} by stable district slug for year-over-year comparisons. Summary statistics exclude records with no single reported total rate or a variable total rate. A school district can span multiple counties, and county labels come from the official taxing-unit record. Rates are dollars per $100 of taxable value; levies and parcel-specific exemptions are not inferred here.`}
          lastVerified={updatedLabel}
          title="Sources, methodology and verification"
        />

        <footer className="flex flex-wrap gap-x-7 gap-y-3 py-8 text-sm font-semibold">
          <Link to="/texas-data" className="underline underline-offset-4">More Texas data</Link>
          <Link to="/learn/property-taxes" className="underline underline-offset-4">Texas property-tax guide</Link>
          <Link to="/texas-property-tax-bill-breakdown" className="text-primary underline underline-offset-4">Property-tax bill calculator</Link>
          <Link to="/browse/counties" className="underline underline-offset-4">County directory</Link>
        </footer>
      </article>
    </Container>
  );
}

function MetaRow({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return <div className={`${last ? '' : 'border-b border-border'} py-3`}><dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">{label}</dt><dd className="mt-1 font-medium">{value}</dd></div>;
}

function Stat({ label, value, note }: { label: string; value: string; note: string }) {
  return <div className="bg-background p-5"><p className="text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">{label}</p><p className="mt-2 font-display text-3xl font-semibold text-primary">{value}</p><p className="mt-2 text-xs leading-5 text-muted-foreground">{note}</p></div>;
}

function summarize(rows: SchoolDistrictTaxRateRow[]) {
  const sorted = [...rows].filter((row) => row.rate != null).sort((a, b) => (a.rate ?? 0) - (b.rate ?? 0));
  if (!sorted.length) return { median: null, mean: null, low: undefined, high: undefined };
  const values = sorted.map((row) => row.rate as number);
  const middle = Math.floor(values.length / 2);
  const median = values.length % 2 ? values[middle] : (values[middle - 1] + values[middle]) / 2;
  return { median, mean: values.reduce((sum, value) => sum + value, 0) / values.length, low: sorted[0], high: sorted[sorted.length - 1] };
}

function compareRows(a: SchoolDistrictTaxRateRow, b: SchoolDistrictTaxRateRow, sort: SortKey) {
  if (sort === 'rate-high') return nullableNumber(b.rate) - nullableNumber(a.rate) || a.name.localeCompare(b.name);
  if (sort === 'rate-low') return nullableNumber(a.rate, Number.MAX_SAFE_INTEGER) - nullableNumber(b.rate, Number.MAX_SAFE_INTEGER) || a.name.localeCompare(b.name);
  if (sort === 'change-up') return nullableNumber(changeOrNull(b), -Infinity) - nullableNumber(changeOrNull(a), -Infinity) || a.name.localeCompare(b.name);
  if (sort === 'change-down') return nullableNumber(changeOrNull(a), Infinity) - nullableNumber(changeOrNull(b), Infinity) || a.name.localeCompare(b.name);
  return a.name.localeCompare(b.name);
}

function nullableNumber(value: number | null, fallback = -1) { return value == null || !Number.isFinite(value) ? fallback : value; }
function changeOrNull(row: SchoolDistrictTaxRateRow) { return row.rate != null && row.priorRate != null && !row.variableRate ? row.rate - row.priorRate : null; }
function rateChange(row: SchoolDistrictTaxRateRow) { return (row.rate ?? 0) - (row.priorRate ?? 0); }
function formatRate(value: number | null) { return value == null ? '—' : `$${value.toFixed(4)}`; }
function formatChange(value: number | null) { return value == null ? '—' : `${value > 0 ? '+' : ''}${value.toFixed(4)}`; }
function formatRowRate(row: SchoolDistrictTaxRateRow) {
  if (row.variableRate && row.rateVariants.length > 1) {
    const values = [...row.rateVariants].sort((a, b) => a - b);
    return `${formatRate(values[0])}–${formatRate(values[values.length - 1])}`;
  }
  return formatRate(row.rate);
}
function formatTaxPer100k(row: SchoolDistrictTaxRateRow) {
  if (row.variableRate && row.rateVariants.length > 1) {
    const values = [...row.rateVariants].sort((a, b) => a - b);
    return `${formatMoney(values[0] * 1000)}–${formatMoney(values[values.length - 1] * 1000)}`;
  }
  return row.rate == null ? '—' : formatMoney(row.rate * 1000);
}
function formatMoney(value: number) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value); }
function countyLabel(slug: string) { return slug.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase()); }
function formatDateTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}

function downloadCsv(rows: SchoolDistrictTaxRateRow[], year: number, priorYear: number) {
  const cells = (values: Array<string | number | null>) => values.map((value) => `"${String(value ?? '').replaceAll('"', '""')}"`).join(',');
  const lines = [
    cells(['school_district', 'counties', `${year}_total_rate_per_100`, 'm_and_o_rate_per_100', 'i_and_s_rate_per_100', `${priorYear}_total_rate_per_100`, 'year_over_year_change', 'tax_per_100k_taxable_value', 'source_status']),
    ...rows.map((row) => cells([
      row.name,
      row.countySlugs.map(countyLabel).join('; '),
      row.rate,
      row.maintenanceOperationsRate,
      row.debtServiceRate,
      row.priorRate,
      changeOrNull(row),
      row.rate == null || row.variableRate ? null : row.rate * 1000,
      row.sourceStatus,
    ])),
  ];
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' });
  const href = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = href;
  anchor.download = `texas-school-district-tax-rates-${year}.csv`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(href);
}
