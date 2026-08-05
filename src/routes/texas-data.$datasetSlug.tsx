import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';
import { formatDatasetValue, getTexasDataset } from '@/data/texas-data-center';

export const Route = createFileRoute('/texas-data/$datasetSlug')({
  loader: ({ params }) => {
    const dataset = getTexasDataset(params.datasetSlug);
    if (!dataset) throw notFound();
    return dataset;
  },
  head: ({ loaderData }) => loaderData ? ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: `/texas-data/${loaderData.slug}`,
      title: loaderData.title, description: loaderData.description }),
    links: [canonicalLink(texasDefinedBrand, `/texas-data/${loaderData.slug}`)],
  }) : {},
  component: Page,
});

function Page() {
  const dataset = Route.useLoaderData();
  return <Container className="py-16 sm:py-24"><main className="mx-auto max-w-5xl">
    <p className="eyebrow text-primary">{dataset.category} · {dataset.year}</p>
    <h1 className="mt-3 font-display text-4xl sm:text-6xl">{dataset.title}</h1>
    <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{dataset.description}</p>
    <div className="mt-10 overflow-hidden rounded-lg border border-border">
      <table className="w-full text-left text-sm"><thead className="bg-muted"><tr><th className="p-4">Item</th><th className="p-4">Value</th><th className="hidden p-4 sm:table-cell">Note</th></tr></thead>
      <tbody>{dataset.rows.map((row) => <tr key={row.label} className="border-t border-border"><td className="p-4 font-medium">{row.label}</td><td className="p-4">{formatDatasetValue(row.value, dataset.unit)}</td><td className="hidden p-4 text-muted-foreground sm:table-cell">{row.note ?? '—'}</td></tr>)}</tbody></table>
    </div>
    <section className="mt-8 rounded-lg bg-muted p-6 text-sm leading-6 text-muted-foreground"><h2 className="font-display text-xl text-foreground">Methodology</h2><p className="mt-2">{dataset.methodology}</p><p className="mt-3">Updated {dataset.updated}. Source: <a className="underline" href={dataset.sourceUrl} rel="noreferrer">{dataset.sourceName}</a>.</p></section>
    <div className="mt-8 flex flex-wrap gap-4 text-sm font-medium"><Link to="/texas-data" className="underline">All Texas data</Link><Link to="/learn/property-taxes" className="underline">Property-tax guide</Link><Link to="/browse/counties" className="underline">County directory</Link></div>
  </main></Container>;
}
