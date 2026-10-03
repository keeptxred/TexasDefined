import { createFileRoute, Link } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { Container } from '@/components/layout/Container';
import { TEXASDEFINED_RESEARCH_BRIEFS, TEXASDEFINED_RESEARCH_EXTENSION_DOMAINS } from '@/data/original-research';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/texas-data/research';
const description = 'Original TexasDefined data briefs: reproducible calculations from reputable underlying Texas data, complete tables, downloadable CSV files, methodology and stable citation URLs.';

const standards = [
  ['A clear question', 'Every brief begins with a question that the source data can answer without stretching beyond its coverage.'],
  ['TexasDefined calculation', 'Rankings, comparisons and derived measures are calculated by TexasDefined from the cited underlying records.'],
  ['Complete data', 'The visible result does not stop at a top-10 list when the complete comparable dataset can be published.'],
  ['Reusable output', 'Briefs publish a table, a visual summary and a downloadable CSV whenever the underlying data supports them.'],
  ['Auditable methods', 'Sources, exclusions, formulas, verification dates and important limitations are stated on the page.'],
  ['Stable citation', 'Each brief keeps a permanent canonical URL and a recommended citation so references accumulate over time.'],
] as const;

export const Route = createFileRoute('/texas-data/research')({
  head: () => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'TexasDefined Original Research', description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': ['CollectionPage', 'DataCatalog'],
            '@id': `${pageUrl}#page`,
            url: pageUrl,
            name: 'TexasDefined Original Research',
            description,
            publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
            isPartOf: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#website` },
            dataset: TEXASDEFINED_RESEARCH_BRIEFS.map((brief) => ({
              '@type': 'Dataset',
              '@id': `${absoluteUrl(texasDefinedBrand, brief.path)}#dataset`,
              name: brief.title,
              description: brief.description,
              url: absoluteUrl(texasDefinedBrand, brief.path),
              dateModified: brief.updated,
              spatialCoverage: { '@type': 'State', name: 'Texas' },
              distribution: { '@type': 'DataDownload', encodingFormat: 'text/csv', contentUrl: absoluteUrl(texasDefinedBrand, brief.csvPath) },
            })),
          },
          { '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Front page', item: absoluteUrl(texasDefinedBrand, '/') },
            { '@type': 'ListItem', position: 2, name: 'Texas Data', item: absoluteUrl(texasDefinedBrand, '/texas-data') },
            { '@type': 'ListItem', position: 3, name: 'Original Research', item: pageUrl },
          ] },
        ],
      })],
    };
  },
  component: ResearchPage,
});

function ResearchPage() {
  return <>
    <DepartmentHero current="Original Research" eyebrow="TexasDefined Research" title="Texas questions answered with calculations you can inspect" description={description} tone="surface" />
    <Container className="py-12 sm:py-16">
      <section aria-labelledby="research-briefs-heading">
        <div className="grid gap-8 border-b border-border pb-6 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">Published briefs</p><h2 id="research-briefs-heading" className="mt-2 font-display text-4xl">Original TexasDefined analysis</h2></div><p className="max-w-3xl text-sm leading-7 text-muted-foreground">The public agency or authoritative source supplies the underlying records. TexasDefined supplies the comparison: joining, normalizing, ranking or otherwise calculating a result that is not simply copied from the source page.</p></div>
        <div className="grid lg:grid-cols-3">{TEXASDEFINED_RESEARCH_BRIEFS.map((brief, index) => <article key={brief.slug} className={`border-b border-border py-7 lg:px-6 ${index > 0 ? 'lg:border-l' : ''}`}>
          <p className="eyebrow text-primary">{labelDomain(brief.domain)}</p>
          <h3 className="mt-2 font-display text-3xl leading-tight">{brief.title}</h3>
          <p className="mt-3 text-sm font-semibold leading-6 text-foreground">{brief.question}</p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{brief.description}</p>
          <dl className="mt-5 space-y-3 border-t border-border pt-4 text-xs leading-5 text-muted-foreground"><div><dt className="font-semibold text-foreground">Underlying source</dt><dd>{brief.sourceName}</dd></div><div><dt className="font-semibold text-foreground">Refresh cadence</dt><dd>{brief.updateCadence}</dd></div></dl>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold"><Link to={brief.path} className="text-primary underline underline-offset-4">Open research →</Link><a href={brief.csvPath} className="underline underline-offset-4">Download CSV ↓</a></div>
        </article>)}</div>
      </section>

      <section className="mt-14" aria-labelledby="research-standard-heading">
        <div className="grid gap-8 border-b border-border pb-6 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">Publication standard</p><h2 id="research-standard-heading" className="mt-2 font-display text-4xl">Built to be checked and cited</h2></div><p className="max-w-3xl text-sm leading-7 text-muted-foreground">TexasDefined research pages are reference assets, not opaque listicles. A reader should be able to identify the source, understand the calculation, inspect the complete comparable rows and cite the result without guessing where it came from.</p></div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3">{standards.map(([title, copy]) => <div key={title} className="border-b border-border py-6 sm:px-5"><h3 className="font-display text-2xl">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p></div>)}</div>
      </section>

      <section className="mt-14 border-y border-border py-8" aria-labelledby="research-next-heading"><p className="eyebrow text-primary">Reusable research engine</p><h2 id="research-next-heading" className="mt-2 font-display text-4xl">The same framework extends beyond these first three briefs</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">As the underlying Texas Data collections mature, the same publishing contract can be applied to state parks, rivers, high-school football, wildlife and historic sites. New briefs should reuse maintained datasets rather than create disconnected one-off copies.</p><div className="mt-5 flex flex-wrap gap-2">{TEXASDEFINED_RESEARCH_EXTENSION_DOMAINS.map((domain) => <span key={domain} className="border border-border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide">{labelDomain(domain)}</span>)}</div></section>

      <footer className="flex flex-wrap gap-x-7 gap-y-3 py-7 text-sm font-semibold"><Link to="/texas-data" className="text-primary underline underline-offset-4">Texas Data</Link><Link to="/browse/counties" className="underline underline-offset-4">County directory</Link><Link to="/fishing/lakes" className="underline underline-offset-4">Texas fishing lakes</Link><Link to="/property-tax/counties" className="underline underline-offset-4">Property-tax data</Link></footer>
    </Container>
  </>;
}

function labelDomain(value: string) { return value.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase()); }
