import { createFileRoute, Link } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { CitationTrustPanel } from '@/components/authority/CitationTrustPanel';
import { Container } from '@/components/layout/Container';
import { buildCityCountyRelationships } from '@/data/city-county-relationships';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/texas-data/city-county-relationships';
const description = 'See how cities in the Texas Defined directory relate to Texas counties, including multi-county cities, with links to city guides, county guides and exact-address county lookup.';
const censusBas = 'https://www.census.gov/programs-surveys/bas.html';
const officialCountyDirectory = 'https://www.texas.gov/texas-county-websites.html';

export const Route = createFileRoute('/texas-data/city-county-relationships')({
  loader: async () => {
    const { TEXAS_CITIES, TEXAS_COUNTIES } = await import('@/data/texas-places');
    return { relationships: buildCityCountyRelationships(TEXAS_CITIES, TEXAS_COUNTIES) };
  },
  head: ({ loaderData }) => {
    const relationships = loaderData?.relationships ?? [];
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: 'What County Is a Texas City In? City-to-County Reference',
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Dataset',
            '@id': `${pageUrl}#dataset`,
            name: 'Texas Defined City-to-County Reference',
            description,
            url: pageUrl,
            creator: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` },
            distribution: {
              '@type': 'DataDownload',
              encodingFormat: 'text/csv',
              contentUrl: absoluteUrl(texasDefinedBrand, '/texas-data/city-county-relationships.csv'),
            },
            variableMeasured: relationships.map(({ city, counties }) => ({
              '@type': 'PropertyValue',
              name: city.name,
              value: counties.map(({ name }) => `${name} County`).join(', '),
              description: `${city.name} → ${counties.map(({ name }) => `${name} County`).join(', ')} → ${city.region}`,
            })),
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Front page', item: absoluteUrl(texasDefinedBrand, '/') },
              { '@type': 'ListItem', position: 2, name: 'Texas Data', item: absoluteUrl(texasDefinedBrand, '/texas-data') },
              { '@type': 'ListItem', position: 3, name: 'City-to-county reference', item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
  component: CityCountyRelationshipsPage,
});

function CityCountyRelationshipsPage() {
  const { relationships } = Route.useLoaderData();
  const grouped = [...relationships].sort((a, b) => a.city.name.localeCompare(b.city.name));
  const multiCountyCount = grouped.filter((item) => item.counties.length > 1).length;
  const unmatched = grouped.flatMap((item) => item.counties).filter((item) => !item.county);

  return (
    <Container className="pb-20 pt-12 sm:pt-16">
      <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span><Link to="/texas-data">Texas Data</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page">City-to-county reference</span>
      </nav>

      <header className="py-10">
        <p className="eyebrow text-primary">Texas geography reference</p>
        <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">What county is a Texas city in?</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Use this directory to see the county relationships for cities currently covered by Texas Defined. Some Texas cities cross county lines, so this page lists additional counties where that relationship is known instead of pretending every city belongs to only one county.</p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          <Link to="/find-my-county" className="text-primary hover:underline">Find the county for an exact address →</Link>
          <a href="/texas-data/city-county-relationships.csv" className="text-primary hover:underline">Download the CSV →</a>
        </div>
      </header>

      <section className="mb-8 border border-border bg-surface p-5 sm:p-6" aria-labelledby="address-lookup-heading">
        <h2 id="address-lookup-heading" className="font-display text-2xl font-semibold">Need the county for a specific house or business?</h2>
        <p className="mt-2 max-w-3xl leading-7 text-muted-foreground">City names are not precise enough for tax, school, utility, flood, insurance or jurisdiction questions—especially in multi-county cities. Use the address lookup for the exact county tied to a street address.</p>
        <Link to="/find-my-county" className="mt-4 inline-block font-semibold text-primary hover:underline">Open Find My County →</Link>
      </section>

      <div className="overflow-x-auto border-y border-border">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead><tr className="border-b border-border bg-surface text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground"><th className="px-4 py-3">City</th><th className="px-4 py-3">Primary directory county</th><th className="px-4 py-3">Other counties</th><th className="px-4 py-3">Region</th><th className="px-4 py-3">Guides</th></tr></thead>
          <tbody className="divide-y divide-border">
            {grouped.map(({ city, primaryCounty, counties }) => {
              const additional = counties.slice(1);
              return (
                <tr key={city.slug}>
                  <td className="px-4 py-4 font-display text-lg font-semibold">{city.name}</td>
                  <td className="px-4 py-4">{primaryCounty ? <Link to="/$kind/$slug" params={{ kind: 'county', slug: primaryCounty.slug }} className="font-semibold text-primary hover:underline">{city.county} County</Link> : `${city.county} County`}</td>
                  <td className="px-4 py-4">{additional.length ? additional.map(({ name, county }, index) => <span key={name}>{index ? ', ' : ''}{county ? <Link to="/$kind/$slug" params={{ kind: 'county', slug: county.slug }} className="font-semibold text-primary hover:underline">{name} County</Link> : `${name} County`}</span>) : <span className="text-muted-foreground">—</span>}</td>
                  <td className="px-4 py-4">{city.region}</td>
                  <td className="px-4 py-4"><Link to="/$kind/$slug" params={{ kind: 'city', slug: city.slug }} className="font-semibold text-primary hover:underline">City guide →</Link></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{grouped.length} cities in the current Texas Defined directory · {multiCountyCount} shown with multi-county relationships · {unmatched.length} unmatched county registry relationship{unmatched.length === 1 ? '' : 's'}.</p>
      <p className="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">“Primary directory county” is Texas Defined’s editorial/navigation county, not a claim that the municipality exists only in that county. Municipal boundaries can change through annexation and boundary adjustments; use <Link to="/find-my-county" className="font-semibold text-primary hover:underline">Find My County</Link> for an address-specific answer.</p>

      <CitationTrustPanel
        className="mt-10"
        sources={[
          { name: 'U.S. Census Bureau Boundary and Annexation Survey (BAS)', url: censusBas, note: 'Authoritative municipal-boundary reference used to check cross-county incorporated-place relationships.' },
          { name: 'State of Texas county website directory', url: officialCountyDirectory, note: 'Official Texas county-directory reference used for county navigation and verification.' },
        ]}
        methodology="The Texas Defined city registry retains one primary county for editorial navigation. This reference page supplements that field with known additional counties for cities whose municipal or census-place footprint crosses county boundaries. The visible table and downloadable CSV use the same relationship layer. It is a curated directory of cities covered by Texas Defined, not an exhaustive list of every incorporated place or census-designated place in Texas."
        lastVerified="Municipal boundaries can change. Cross-county relationships should be checked against current U.S. Census Bureau BAS/MAF-TIGER geography for legal-boundary research; exact addresses should use Texas Defined’s Find My County lookup."
        title="City-to-county sources and methodology"
      />
    </Container>
  );
}
