import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { getTexasDatasets } from '@/data/texas-data-center';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

export const description = 'Useful Texas facts, original calculations, local finders and practical guidance gathered in one place — whether you are researching a move, comparing costs, planning sports travel or simply getting to know the state better.';
export const sportsComparisonPath = '/sports-venues/compare';
export const sportsComparisonCsvPath = '/sports-venues/compare.csv';
export const researchPath = '/texas-data/research';

export const researchBriefs = [
  ['Texas counties gaining population fastest', '/texas-data/county-growth', '/texas-data/county-growth.csv', 'Census Vintage 2025 county estimates ranked by percentage growth and absolute gain.'],
  ['Texas property-tax rate changes', '/texas-data/property-tax-changes', '/texas-data/property-tax-changes.csv', 'Year-over-year adopted-rate changes for comparable counties, cities and school districts.'],
  ['Texas lake game-fish diversity', '/texas-data/lake-game-fish-diversity', '/texas-data/lake-game-fish-diversity.csv', 'Documented fishing-target diversity across verified TexasDefined lake profiles.'],
  ['How far Texas counties are from a state park', '/texas-data/state-park-access', '/texas-data/state-park-access.csv', 'Straight-line county reference-point distance to the nearest verified TPWD state-park profile.'],
  ['Texas high-school football programs by UIL region', '/texas-data/high-school-football-regions', '/texas-data/high-school-football-regions.csv', 'Complete 2026–28 UIL football program distribution across competitive Regions I–IV.'],
] as const;

export const nextStops = [
  ['Original TexasDefined research', researchPath, 'Read maintained rankings and comparisons that TexasDefined calculates from reputable underlying data.'],
  ['Plan a move to Texas', '/moving-to-texas', 'Use the relocation research center for metro guides, city matching, address-level source checks, moving tasks and cost tools.'],
  ['Texas industries', '/texas-industries', 'Connect statewide economic data with sourced sector guides, regional industry hubs and county pathways.'],
  ['Find your county', '/browse/counties', 'Explore all 254 counties and find trusted local information for each one.'],
  ['County population growth', '/texas-data/county-growth', 'Compare Census Vintage 2025 county population change from the 2020 estimates base to July 1, 2025.'],
  ['Property-tax rate changes', '/texas-data/property-tax-changes', 'Compare matched year-over-year adopted rates across counties, cities and school districts.'],
  ['Lake game-fish diversity', '/texas-data/lake-game-fish-diversity', 'Compare the documented fishing-target mix across verified Texas lake profiles.'],
  ['State-park access by county', '/texas-data/state-park-access', 'Compare county Census reference-point distance to the nearest verified TPWD state-park profile.'],
  ['High-school football by UIL region', '/texas-data/high-school-football-regions', 'Compare all 1,268 programs in the 2026–28 alignment across Regions I–IV and classifications.'],
  ['County housing costs', '/texas-data/county-housing-costs', 'Compare official ACS median home values, gross rent, owner costs and household income across Texas counties.'],
  ['Compare sports venues', sportsComparisonPath, 'Compare 84 verified Texas sports venue guides by location, type, capacity and opening information where available.'],
  ['Find a city', '/browse/cities', 'Get to know major cities, regional centers and communities across the state.'],
  ['City-to-county relationships', '/texas-data/city-county-relationships', 'See the current Texas Defined city directory mapped to counties and regions.'],
  ['Explore Texas', '/explore', 'Find parks, lakes, caverns, road trips and memorable corners of Texas.'],
  ['Property-tax help', '/decide/property-taxes', 'Estimate a property-tax bill and understand the numbers behind it.'],
  ['Money & Property', '/decide/financial-tools', 'Compare household costs, homeownership expenses and moving decisions.'],
  ['Texas resources', '/texas-resources', 'Find official contacts, local information and practical guides.'],
] as const;

export const Route = createFileRoute('/texas-data')({
  loader: async () => ({ datasets: await getTexasDatasets() }),
  head: ({ loaderData }) => {
    const pageUrl = absoluteUrl(texasDefinedBrand, '/texas-data');
    const datasets = loaderData?.datasets ?? [];
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath: '/texas-data', title: 'Texas Facts, Figures & Original Research', description }),
      links: [canonicalLink(texasDefinedBrand, '/texas-data')],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': ['CollectionPage', 'DataCatalog'], '@id': `${pageUrl}#page`, url: pageUrl, name: 'Texas Facts, Figures & Original Research', description,
            publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` }, isPartOf: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#website` },
            dataset: [
              ...datasets.map((dataset) => ({ '@type': 'Dataset', '@id': `${absoluteUrl(texasDefinedBrand, `/texas-data/${dataset.slug}`)}#dataset`, name: dataset.title, description: dataset.description, url: absoluteUrl(texasDefinedBrand, `/texas-data/${dataset.slug}`), dateModified: dataset.updated, temporalCoverage: String(dataset.year) })),
              ...researchBriefs.map(([name, path, csvPath, researchDescription]) => ({
                '@type': 'Dataset',
                '@id': `${absoluteUrl(texasDefinedBrand, path)}#dataset`,
                name,
                description: researchDescription,
                url: absoluteUrl(texasDefinedBrand, path),
                spatialCoverage: { '@type': 'State', name: 'Texas' },
                distribution: { '@type': 'DataDownload', encodingFormat: 'text/csv', contentUrl: absoluteUrl(texasDefinedBrand, csvPath) },
              })),
              {
                '@type': 'Dataset',
                '@id': `${absoluteUrl(texasDefinedBrand, sportsComparisonPath)}#dataset`,
                name: 'Texas Sports Venue Comparison',
                description: 'A maintained comparison of 84 verified Texas sports venue guides by location, venue type, capacity and opening information where available.',
                url: absoluteUrl(texasDefinedBrand, sportsComparisonPath),
                spatialCoverage: { '@type': 'State', name: 'Texas' },
                distribution: {
                  '@type': 'DataDownload',
                  encodingFormat: 'text/csv',
                  contentUrl: absoluteUrl(texasDefinedBrand, sportsComparisonCsvPath),
                },
              },
            ],
          },
          { '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Front page', item: absoluteUrl(texasDefinedBrand, '/') }, { '@type': 'ListItem', position: 2, name: 'Texas Data', item: pageUrl }] },
        ],
      })],
    };
  },
});
