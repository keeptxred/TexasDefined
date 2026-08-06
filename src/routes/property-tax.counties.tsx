import { createFileRoute, Link } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { Container } from '@/components/layout/Container';
import { TEXAS_COUNTIES } from '@/data/texas-places';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/property-tax/counties';
const description = 'Browse property-tax guidance for all 254 Texas counties, with links to appraisal, exemption, protest, payment and official local resources.';

export const Route = createFileRoute('/property-tax/counties')({
  head: () => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: 'Texas County Property Tax Directory',
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            '@id': `${pageUrl}#page`,
            url: pageUrl,
            name: 'Texas County Property Tax Directory',
            description,
          },
          {
            '@type': 'ItemList',
            '@id': `${pageUrl}#counties`,
            numberOfItems: TEXAS_COUNTIES.length,
            itemListElement: TEXAS_COUNTIES.map((county, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: county.name,
              url: absoluteUrl(texasDefinedBrand, `/property-tax/county/${county.slug}`),
            })),
          },
        ],
      })],
    };
  },
  component: CountyPropertyTaxDirectory,
});

function CountyPropertyTaxDirectory() {
  return (
    <Container className="py-16 sm:py-24">
      <p className="eyebrow text-primary">All 254 counties</p>
      <h1 className="mt-3 max-w-4xl font-display text-4xl leading-tight sm:text-6xl">Texas county property-tax guides</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">Choose a county for a practical checklist covering appraisal records, exemptions, protest deadlines, taxing units, payments and official local starting points.</p>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TEXAS_COUNTIES.map((county) => (
          <li key={county.code}>
            <Link
              to="/property-tax/county/$county"
              params={{ county: county.slug }}
              className="block h-full rounded-md border border-border p-4 transition-colors hover:border-primary/50"
            >
              <span className="text-xs text-muted-foreground">County {county.code}</span>
              <strong className="mt-1 block font-display text-xl">{county.name}</strong>
              <span className="mt-3 block text-sm font-medium text-primary">Open guide →</span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
