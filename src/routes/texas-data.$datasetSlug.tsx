import { createFileRoute, Link, notFound } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import { formatDatasetValue, getTexasDataset } from '@/data/texas-data-center';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

export const Route = createFileRoute('/texas-data/$datasetSlug')({
  loader: ({ params }) => {
    const dataset = getTexasDataset(params.datasetSlug);
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
      scripts: [
        jsonLd({
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
              keywords: [loaderData.category, 'Texas data', 'TexasDefined'],
              creator: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
              publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
              isIncludedIn: { '@id': `${absoluteUrl(texasDefinedBrand, '/texas-data')}#page` },
              isBasedOn: loaderData.sourceUrl,
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
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: absoluteUrl(texasDefinedBrand, '/'),
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Texas Facts',
                  item: absoluteUrl(texasDefinedBrand, '/texas-data'),
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: loaderData.title,
                  item: pageUrl,
                },
              ],
            },
          ],
        }),
      ],
    };
  },
  notFoundComponent: () => (
    <Container className="py-24">
      <p className="eyebrow text-primary">Texas by the Numbers</p>
      <h1 className="mt-3 font-display text-3xl">We could not find that page</h1>
      <p className="mt-3 text-sm text-muted-foreground"><Link to="/texas-data" className="text-primary underline">See the facts and finders we do have.</Link></p>
    </Container>
  ),
  component: Page,
});

function Page() {
  const dataset = Route.useLoaderData();
  return (
    <Container className="py-16 sm:py-24">
      <main className="mx-auto max-w-5xl">
        <p className="eyebrow text-primary">Texas by the Numbers · {dataset.year}</p>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl">{dataset.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{dataset.description}</p>
        <div className="mt-10 overflow-hidden rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted"><tr><th className="p-4">What we measured</th><th className="p-4">The number</th><th className="hidden p-4 sm:table-cell">Good to know</th></tr></thead>
            <tbody>{dataset.rows.map((row) => <tr key={row.label} className="border-t border-border"><td className="p-4 font-medium">{row.label}</td><td className="p-4">{formatDatasetValue(row.value, dataset.unit)}</td><td className="hidden p-4 text-muted-foreground sm:table-cell">{row.note ?? '—'}</td></tr>)}</tbody>
          </table>
        </div>
        <section className="mt-8 rounded-lg bg-muted p-6 text-sm leading-6 text-muted-foreground"><h2 className="font-display text-xl text-foreground">Where the numbers come from</h2><p className="mt-2">{dataset.methodology}</p><p className="mt-3">Updated {dataset.updated}. Source: <a className="underline" href={dataset.sourceUrl} rel="noreferrer">{dataset.sourceName}</a>.</p></section>
        <div className="mt-8 flex flex-wrap gap-4 text-sm font-medium"><Link to="/texas-data" className="underline">See more Texas facts</Link><Link to="/learn/property-taxes" className="underline">Understand property taxes</Link><Link to="/browse/counties" className="underline">Find your county</Link></div>
      </main>
    </Container>
  );
}
