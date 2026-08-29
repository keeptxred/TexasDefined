import { createFileRoute, Link, notFound } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { CitationTrustPanel } from '@/components/authority/CitationTrustPanel';
import { Container } from '@/components/layout/Container';
import { getTexasDataset } from '@/data/texas-data-center';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

export const Route = createFileRoute('/texas-data/$datasetSlug')({
  loader: async ({ params }) => {
    const dataset = await getTexasDataset(params.datasetSlug);
    if (!dataset) throw notFound();
    return dataset;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const canonicalPath = `/texas-data/${loaderData.slug}`;
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: loaderData.title,
        description: loaderData.description,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Dataset',
            '@id': `${pageUrl}#dataset`,
            name: loaderData.title,
            description: loaderData.description,
            url: pageUrl,
            dateModified: loaderData.updated,
            temporalCoverage: String(loaderData.year),
            spatialCoverage: { '@type': 'State', name: 'Texas' },
            keywords: [loaderData.category, 'Texas data', 'TexasDefined'],
            creator: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
            publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
            isIncludedIn: { '@id': `${absoluteUrl(texasDefinedBrand, '/texas-data')}#page` },
            isBasedOn: loaderData.sourceUrl,
            citation: loaderData.sourceUrl,
            measurementTechnique: loaderData.methodology,
            variableMeasured: loaderData.rows.map((row) => ({
              '@type': 'PropertyValue',
              name: row.label,
              value: row.value,
              unitText: loaderData.unit,
              ...(row.note ? { description: row.note } : {}),
            })),
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${pageUrl}#breadcrumb`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Front page', item: absoluteUrl(texasDefinedBrand, '/') },
              { '@type': 'ListItem', position: 2, name: 'Texas Facts', item: absoluteUrl(texasDefinedBrand, '/texas-data') },
              { '@type': 'ListItem', position: 3, name: loaderData.title, item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
  notFoundComponent: () => (
    <Container className="py-24">
      <p className="eyebrow text-primary">The Data Desk</p>
      <h1 className="mt-3 font-display text-4xl">We could not find that data brief</h1>
      <p className="mt-4 text-sm text-muted-foreground"><Link to="/texas-data" className="font-semibold underline underline-offset-4">Return to Texas Facts and Figures.</Link></p>
    </Container>
  ),
  component: Page,
});

function Page() {
  const dataset = Route.useLoaderData();
  const isRelocationDataset = ['Relocation and migration', 'Insurance', 'Jobs', 'Transportation'].includes(dataset.category);
  return (
    <>
      <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
        <article className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Front page</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <Link to="/texas-data" className="hover:text-foreground">The Data Desk</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <span aria-current="page" className="text-foreground">{dataset.title}</span>
          </nav>

          <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
            <div>
              <p className="eyebrow text-primary">The Data Desk · {dataset.year}</p>
              <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{dataset.title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{dataset.description}</p>
            </div>
            <dl className="border-l border-border pl-6 text-sm">
              <div className="border-b border-border py-3"><dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">Source</dt><dd className="mt-1 font-medium">{dataset.sourceName}</dd></div>
              <div className="border-b border-border py-3"><dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">Last verified</dt><dd className="mt-1 font-medium">{formatCheckedDate(dataset.updated)}</dd></div>
              <div className="py-3"><dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">Coverage</dt><dd className="mt-1 font-medium">{dataset.year}</dd></div>
            </dl>
          </header>

          <section className="py-10" aria-labelledby="findings-heading">
            <div className="border-b border-border pb-4">
              <p className="eyebrow text-primary">Key findings</p>
              <h2 id="findings-heading" className="mt-2 font-display text-4xl">What the numbers show</h2>
            </div>
            <div className="divide-y divide-border border-b border-border">
              {dataset.rows.map((row) => (
                <div key={row.label} className="grid gap-2 py-5 sm:grid-cols-[minmax(0,1.2fr)_minmax(10rem,.7fr)_minmax(0,1.5fr)] sm:gap-6">
                  <h3 className="font-display text-xl">{row.label}</h3>
                  <p className="font-display text-2xl font-semibold text-primary">{formatDatasetValue(row.value, dataset.unit)}</p>
                  <p className="text-sm leading-6 text-muted-foreground">{row.note ?? 'No additional note.'}</p>
                </div>
              ))}
            </div>
          </section>

          <CitationTrustPanel
            className="mt-2"
            sources={[{
              name: dataset.sourceName,
              url: dataset.sourceUrl,
              note: `Authoritative source for the ${dataset.year} coverage shown in this brief.`,
            }]}
            methodology={dataset.methodology}
            lastVerified={formatCheckedDate(dataset.updated)}
            title="Sources, methodology and verification"
          />

          <footer className="flex flex-wrap gap-x-7 gap-y-3 py-7 text-sm font-semibold">
            <Link to="/texas-data" className="underline underline-offset-4">More Texas data</Link>
            {isRelocationDataset ? <>
              <Link to="/moving-to-texas" className="text-primary underline underline-offset-4">Moving to Texas research center</Link>
              <Link to="/browse/cities" className="underline underline-offset-4">Compare Texas cities</Link>
              <Link to="/browse/counties" className="underline underline-offset-4">Compare counties</Link>
              <Link to="/texas-cost-of-living-calculator" className="underline underline-offset-4">Cost-of-living calculator</Link>
            </> : <>
              <Link to="/learn/property-taxes" className="underline underline-offset-4">Property-tax guide</Link>
              <Link to="/browse/counties" className="underline underline-offset-4">County directory</Link>
            </>}
          </footer>
        </article>
      </Container>
    </>
  );
}

function formatDatasetValue(value: number, unit: 'percent' | 'dollars' | 'count') {
  return unit === 'dollars'
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
    : unit === 'percent'
      ? `${value.toFixed(4)}%`
      : new Intl.NumberFormat('en-US').format(value);
}

function formatCheckedDate(value: string) {
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
}
