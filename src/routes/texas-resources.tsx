import { createFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const description = 'A simple starting point for the questions that come with moving, buying, owning a home and finding your way around the state.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}/texas-resources`;

const groups = [
  {
    title: 'Moving and settling in',
    links: [
      ['Moving to Texas', '/moving-to-texas'],
      ['Moving checklist', '/moving-to-texas-checklist'],
      ['Register your vehicle', '/find-my-dmv'],
      ['Find your school district', '/find-my-school-district'],
    ],
  },
  {
    title: 'Money and homeownership',
    links: [
      ['Money calculators', '/decide/financial-tools'],
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
      ['Living here', '/texas-living'],
    ],
  },
] as const;

const guideLinks = groups.flatMap((group) => group.links) as ReadonlyArray<readonly [string, string]>;
const itemListElement = guideLinks.map(([name, path], index) => ({
  '@type': 'ListItem',
  position: index + 1,
  item: {
    '@type': 'WebPage',
    name,
    url: `${siteUrl}${path}`,
  },
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
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
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
    <Container className="py-16 sm:py-24">
      <main className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <ol className="flex items-center gap-2">
            <li><Link to="/" className="hover:text-foreground">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">Start Here</li>
          </ol>
        </nav>
        <p className="eyebrow mt-8 text-primary">Start Here</p>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl">Good answers for everyday Texas life</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{description}</p>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {groups.map((group) => (
            <section key={group.title} className="rounded-lg border border-border p-6">
              <h2 className="font-display text-2xl">{group.title}</h2>
              <div className="mt-5 space-y-3">
                {group.links.map(([label, to]) => (
                  <Link key={to} to={to} className="block rounded border border-border px-4 py-3 text-sm font-medium hover:border-primary hover:text-primary">
                    {label} →
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </Container>
  );
}
