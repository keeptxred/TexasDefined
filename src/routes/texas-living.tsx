import { createFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const description = 'A practical starting point for moving, buying a home, understanding local costs and handling the everyday details of life here.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}/texas-living`;
const sections = [
  ['Places worth knowing', '/explore', 'Parks, lakes, small towns and road trips for the weekends you want to remember.'],
  ['Making the move', '/moving-to-texas', 'Compare places, understand the costs and arrive with fewer surprises.'],
  ['Money made clearer', '/decide/financial-tools', 'Straightforward calculators for housing, paychecks, utilities, insurance and household costs.'],
  ['Understanding property taxes', '/learn/property-taxes', 'A plain-English look at appraisals, exemptions, protests, bills and payments.'],
  ['Find your county', '/browse/counties', 'Start with your county and continue to the offices and information that matter.'],
  ['Find a city', '/browse/cities', 'Look up cities across the state and see what we have nearby.'],
  ['Registering your vehicle', '/find-my-dmv', 'The steps new residents need, plus the right local office to contact.'],
  ['Finding your school district', '/find-my-school-district', 'Use the official sources that show which district serves an address.'],
] as const;

const itemListElement = sections.map(([name, path, copy], index) => ({
  '@type': 'ListItem',
  position: index + 1,
  item: { '@type': 'WebPage', name, description: copy, url: `${siteUrl}${path}` },
}));

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${pageUrl}#page`,
      url: pageUrl,
      name: 'Living in Texas',
      description,
      isPartOf: { '@id': `${siteUrl}/#website` },
      mainEntity: { '@id': `${pageUrl}#topics` },
      breadcrumb: { '@id': `${pageUrl}#breadcrumbs` },
    },
    {
      '@type': 'ItemList',
      '@id': `${pageUrl}#topics`,
      name: 'Texas living topics',
      numberOfItems: itemListElement.length,
      itemListElement,
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumbs`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Living in Texas', item: pageUrl },
      ],
    },
  ],
};

export const Route = createFileRoute('/texas-living')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: '/texas-living',
      title: 'Living in Texas',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, '/texas-living')],
    scripts: [{ type: 'application/ld+json', children: JSON.stringify(structuredData) }],
  }),
  component: () => (
    <Container className="py-16 sm:py-24">
      <main className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <ol className="flex items-center gap-2">
            <li><Link to="/" className="hover:text-foreground">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">Living in Texas</li>
          </ol>
        </nav>
        <p className="eyebrow mt-8 text-primary">Living Here</p>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl">The useful side of calling Texas home</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{description}</p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map(([title, to, copy]) => (
            <Link key={to} to={to} className="rounded-lg border border-border p-6 transition hover:-translate-y-0.5 hover:shadow-sm">
              <h2 className="font-display text-2xl">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
              <span className="mt-5 block text-sm font-medium text-primary">Take a closer look →</span>
            </Link>
          ))}
        </div>
      </main>
    </Container>
  ),
});
