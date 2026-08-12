import { createFileRoute, Link } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CitationTrustPanel } from '@/components/authority/CitationTrustPanel';
import { Container } from '@/components/layout/Container';
import { TEXAS_CITIES, TEXAS_COUNTIES } from '@/data/texas-places';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/texas-data/city-county-relationships';
const description = 'Browse the current Texas Defined city directory mapped to counties and regions, with direct links to canonical city and county reference pages.';
const countyByName = new Map(TEXAS_COUNTIES.map((county) => [county.name.replace(/ County$/, ''), county] as const));
const relationships = TEXAS_CITIES.map((city) => ({ city, county: countyByName.get(city.county) ?? null }));
const officialCountyDirectory = 'https://www.texas.gov/texas-county-websites.html';

export const Route = createFileRoute('/texas-data/city-county-relationships')({
  head: () => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Texas City-to-County Relationship Dataset', description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Dataset',
            '@id': `${pageUrl}#dataset`,
            name: 'Texas Defined City-to-County Relationships',
            description,
            url: pageUrl,
            creator: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
            distribution: {
              '@type': 'DataDownload',
              encodingFormat: 'text/csv',
              contentUrl: absoluteUrl(texasDefinedBrand, '/texas-data/city-county-relationships.csv'),
            },
            variableMeasured: relationships.map(({ city, county }) => ({
              '@type': 'PropertyValue',
              name: city.name,
              value: city.county,
              description: `${city.name} → ${city.county} County → ${city.region}${county ? '' : ' (county registry match pending)'}`,
            })),
          },
          {
            '@type': 'ItemList',
            '@id': `${pageUrl}#relationships`,
            numberOfItems: relationships.length,
            itemListElement: relationships.map(({ city }, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'City',
                name: city.name,
                url: absoluteUrl(texasDefinedBrand, `/city/${city.slug}`),
                containedInPlace: { '@type': 'AdministrativeArea', name: `${city.county} County` },
              },
            })),
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Front page', item: absoluteUrl(texasDefinedBrand, '/') },
              { '@type': 'ListItem', position: 2, name: 'Texas Data', item: absoluteUrl(texasDefinedBrand, '/texas-data') },
              { '@type': 'ListItem', position: 3, name: 'City-to-county relationships', item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
  component: CityCountyRelationshipsPage,
});

function CityCountyRelationshipsPage() {
  const grouped = [...relationships].sort((a, b) => a.city.name.localeCompare(b.city.name));
  const unmatched = grouped.filter((item) => !item.county);
  return (
    <Container className="pb-20 pt-12 sm:pt-16">
      <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground"><Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span><Link to="/texas-data">Texas Data</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page">City-to-county relationships</span></nav>
      <header className="py-10"><p className="eyebrow text-primary">Relationship dataset</p><h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas city-to-county relationships</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">A machine-readable and human-readable mapping of the cities in the current Texas Defined directory to their county and region. This curated directory is not an exhaustive list of every incorporated municipality or census place in Texas.</p><a href="/texas-data/city-county-relationships.csv" className="mt-5 inline-block border-b border-primary text-sm font-semibold text-primary">Download the CSV →</a></header>

      <div className="overflow-x-auto border-y border-border">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead><tr className="border-b border-border bg-surface text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground"><th className="px-4 py-3">City</th><th className="px-4 py-3">County</th><th className="px-4 py-3">Region</th><th className="px-4 py-3">City reference</th><th className="px-4 py-3">County reference</th></tr></thead>
          <tbody className="divide-y divide-border">{grouped.map(({ city, county }) => <tr key={city.slug}><td className="px-4 py-4 font-display text-lg font-semibold">{city.name}</td><td className="px-4 py-4">{city.county} County</td><td className="px-4 py-4">{city.region}</td><td className="px-4 py-4"><Link to="/$kind/$slug" params={{ kind: 'city', slug: city.slug }} className="font-semibold text-primary hover:underline">City guide →</Link></td><td className="px-4 py-4">{county ? <Link to="/$kind/$slug" params={{ kind: 'county', slug: county.slug }} className="font-semibold text-primary hover:underline">County guide →</Link> : <span className="text-muted-foreground">Registry match pending</span>}</td></tr>)}</tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{grouped.length} current city-directory relationships · {unmatched.length} unmatched county registry relationship{unmatched.length === 1 ? '' : 's'}.</p>

      <CitationTrustPanel
        className="mt-10"
        sources={[{ name: 'State of Texas county website directory', url: officialCountyDirectory, note: 'Official county discovery reference; city-to-county rows come from the maintained Texas Defined city registry.' }]}
        methodology="This dataset exposes the relationships already used by Texas Defined’s city and county navigation. City records are mapped to the 254-county registry by county name, and an unmatched relationship is shown as pending rather than guessed. The curated city registry intentionally covers a useful set of Texas cities and places rather than claiming statewide municipal completeness. The downloadable CSV is generated from the same registries as the visible table."
        lastVerified="Generated from the current Texas Defined city and county registries; legal boundaries and municipal status should be confirmed with official local sources for address-specific decisions."
        title="City-to-county dataset sources and methodology"
      />
    </Container>
  );
}
