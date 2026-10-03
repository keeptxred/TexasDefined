import { createFileRoute, Link } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { DepartmentHero } from '@/components/editorial/DepartmentHero';
import { Container } from '@/components/layout/Container';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/texas-data/research';
const description = 'Original TexasDefined data briefs: independently calculated rankings, comparisons and findings built from reputable primary-source data.';

const briefs = [
  {
    title: 'Texas counties gaining population fastest',
    href: '/texas-data/county-growth',
    summary: 'Census Vintage 2025 county estimates ranked by both percentage growth and absolute population gain.',
    source: 'U.S. Census Bureau',
  },
  {
    title: 'Texas property-tax rate changes',
    href: '/texas-data/property-tax-changes',
    summary: 'Year-over-year adopted-rate changes for counties, cities and school districts where comparable statewide records exist.',
    source: 'Texas Comptroller of Public Accounts',
  },
  {
    title: 'Texas lake game-fish diversity',
    href: '/texas-data/lake-game-fish-diversity',
    summary: 'A TexasDefined comparison of documented fishing targets across verified lake profiles, including targets per 1,000 surface acres.',
    source: 'Texas Parks & Wildlife Department and verified lake sources',
  },
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
            '@type': 'CollectionPage',
            '@id': `${pageUrl}#page`,
            url: pageUrl,
            name: 'TexasDefined Original Research',
            description,
            publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
            hasPart: briefs.map((brief) => ({ '@type': 'Dataset', name: brief.title, url: absoluteUrl(texasDefinedBrand, brief.href) })),
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${pageUrl}#breadcrumb`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Front page', item: absoluteUrl(texasDefinedBrand, '/') },
              { '@type': 'ListItem', position: 2, name: 'Texas Data', item: absoluteUrl(texasDefinedBrand, '/texas-data') },
              { '@type': 'ListItem', position: 3, name: 'Original Research', item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
  component: Page,
});

function Page() {
  return <>
    <DepartmentHero current="Original Research" eyebrow="Texas Data" title="TexasDefined Research" description={description} tone="surface" />
    <Container className="py-12 sm:py-16">
      <section className="grid gap-8 border-y border-border py-8 lg:grid-cols-[15rem_1fr]">
        <div><p className="eyebrow text-primary">What makes it original</p><h2 className="mt-2 font-display text-4xl">We calculate the result</h2></div>
        <div className="max-w-4xl space-y-4 text-sm leading-7 text-muted-foreground">
          <p>TexasDefined research starts with reputable underlying data, then performs its own normalization, comparisons, rankings or derived calculations. The source facts remain attributable to the agency that published them; the resulting analysis, tables and graphics are TexasDefined's work.</p>
          <p>Each brief uses a stable URL and includes the calculation method, primary sources, last-verified date, next review target, downloadable data where useful and a recommended citation. Missing values stay missing rather than being silently converted to zero.</p>
        </div>
      </section>

      <section className="py-12" aria-labelledby="research-briefs-heading">
        <div className="border-b border-border pb-4"><p className="eyebrow text-primary">Research briefs</p><h2 id="research-briefs-heading" className="mt-2 font-display text-4xl">Current original analyses</h2></div>
        <div className="grid lg:grid-cols-3">
          {briefs.map((brief, index) => <Link key={brief.href} to={brief.href} className={`group border-b border-border py-7 lg:px-6 ${index > 0 ? 'lg:border-l' : ''}`}>
            <p className="eyebrow text-primary">Original calculation</p>
            <h3 className="mt-2 font-display text-3xl leading-tight group-hover:text-primary">{brief.title}</h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{brief.summary}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">Primary source: {brief.source}</p>
            <span className="mt-5 block text-sm font-semibold">Open the research brief →</span>
          </Link>)}
        </div>
      </section>

      <section className="grid gap-8 border-y border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div><p className="eyebrow text-primary">Publishing standard</p><h2 className="mt-2 font-display text-4xl">Small studies, maintained carefully</h2></div>
        <div className="grid gap-6 sm:grid-cols-2 text-sm leading-7 text-muted-foreground">
          <p><strong className="text-foreground">One question per brief.</strong> A reader should be able to understand the exact question, result and calculation without reading a long feature first.</p>
          <p><strong className="text-foreground">Complete data beats a top-10 list.</strong> Rankings are accompanied by a full table or downloadable dataset whenever the underlying data supports it.</p>
          <p><strong className="text-foreground">Primary sources stay visible.</strong> Government or authoritative source links sit beside the TexasDefined methodology instead of being buried in footnotes.</p>
          <p><strong className="text-foreground">Updates preserve the URL.</strong> New releases refresh the same canonical research page so citations and backlinks continue to point to the maintained source.</p>
        </div>
      </section>
    </Container>
  </>;
}
