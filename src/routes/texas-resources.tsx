import { createFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const description = 'A simple starting point for the questions that come with moving, buying, owning a home and finding your way around the state.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}/texas-resources`;

type ResourceGroup = { title: string; links: ReadonlyArray<readonly [string, string]> };

const groups: ReadonlyArray<ResourceGroup> = [
  {
    title: 'Moving and settling in',
    links: [
      ['Moving Here', '/moving-to-texas'],
      ['Your first-month checklist', '/moving-to-texas-checklist'],
      ['Register your vehicle', '/find-my-dmv'],
      ['Find your school district', '/find-my-school-district'],
    ],
  },
  {
    title: 'Money and homeownership',
    links: [
      ['Money Made Clearer', '/decide/financial-tools'],
      ['Understand property taxes', '/learn/property-taxes'],
      ['File a homestead exemption', '/do/homestead-exemption'],
      ['Protest your appraisal', '/do/property-tax-protest'],
      ['First-time homebuyer help', '/texas-first-time-homebuyer-programs'],
      ['How sales tax works', '/texas-sales-tax-explained'],
    ],
  },
  {
    title: 'Finding your place',
    links: [
      ['Explore', '/explore'],
      ['Find your county', '/browse/counties'],
      ['Find a city', '/browse/cities'],
      ['Living Here', '/texas-living'],
    ],
  },
  {
    title: 'Stories and everyday Texas',
    links: [
      ['The Texas Game', '/sports'],
      ['Then & Now', '/texas-history'],
      ['Home & Garden', '/home-garden'],
      ['Homes and Land', '/real-estate'],
      ['About Texas Defined', '/about'],
    ],
  },
];

const guideLinks = groups.flatMap((group) => group.links);
const itemListElement = guideLinks.map(([name, path], index) => ({
  '@type': 'ListItem',
  position: index + 1,
  item: { '@type': 'WebPage', name, url: `${siteUrl}${path}` },
}));

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${pageUrl}#page`,
      url: pageUrl,
      name: 'Start Here',
      description,
      isPartOf: { '@id': `${siteUrl}/#website` },
      mainEntity: { '@id': `${pageUrl}#resources` },
      breadcrumb: { '@id': `${pageUrl}#breadcrumbs` },
    },
    {
      '@type': 'ItemList',
      '@id': `${pageUrl}#resources`,
      name: 'Practical guides for living here',
      numberOfItems: itemListElement.length,
      itemListElement,
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumbs`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Start Here', item: pageUrl },
      ],
    },
  ],
};

export const Route = createFileRoute('/texas-resources')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: '/texas-resources',
      title: 'Start Here',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, '/texas-resources')],
    scripts: [{ type: 'application/ld+json', children: JSON.stringify(structuredData) }],
  }),
  component: Page,
});

function Page() {
  return (
    <main>
      <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Front page</Link>
          <span aria-hidden="true" className="mx-2">/</span>
          <span className="text-foreground">Start Here</span>
        </nav>

        <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div>
            <p className="eyebrow text-primary">The Texas Guidebook</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Good answers for everyday Texas life</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{description}</p>
          </div>
          <p className="border-l border-border pl-6 text-sm leading-6 text-muted-foreground">
            Start with the question in front of you. These guides connect practical explanations with the official offices and records that matter when details need verification.
          </p>
        </header>

        <div className="divide-y divide-border">
          {groups.map((group, groupIndex) => (
            <section key={group.title} className="grid gap-7 py-10 lg:grid-cols-[15rem_1fr]">
              <div>
                <p className="eyebrow text-primary">Section {String(groupIndex + 1).padStart(2, '0')}</p>
                <h2 className="mt-2 font-display text-3xl leading-tight">{group.title}</h2>
              </div>
              <div className="grid sm:grid-cols-2">
                {group.links.map(([label, to]) => (
                  <Link key={to} to={to} className="group border-t border-border py-4 sm:px-5">
                    <span className="font-display text-xl group-hover:text-primary">{label}</span>
                    <span className="ml-2 text-sm text-muted-foreground">→</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="border-t border-border pt-6 text-sm leading-6 text-muted-foreground">
          Looking for a place rather than a practical guide? <Link to="/explore" className="font-semibold text-foreground underline decoration-primary/50 underline-offset-4">Open the Texas travel guide.</Link>
        </footer>
      </Container>
    </main>
  );
}
