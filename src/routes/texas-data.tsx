import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { getTexasDatasets } from '@/data/texas-data-center';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

export const description = 'Texas Defined’s maintained data and reference library: sourced Texas datasets, directories, comparison tables and downloadable records built for research, reporting, planning and citation.';
export const sportsComparisonPath = '/sports-venues/compare';
export const sportsComparisonCsvPath = '/sports-venues/compare.csv';

export const referenceCollections = [
  {
    eyebrow: 'Maritime history · lighthouse records',
    title: 'Texas Lighthouse Database — Complete List, Map, Status & Visitor Access',
    description: 'A source-backed lighthouse reference covering location, county, historic era, present status, visitor-access reality, planning context and the supporting record for each mapped light.',
    href: '/explore/lighthouses',
    csvHref: '/texas-lighthouses.csv',
    secondaryHref: '/article/texas-lighthouses-complete-guide',
    secondaryLabel: 'Read the historical guide',
    sourceLabel: 'Texas Historical Commission, U.S. Coast Guard, NOAA and linked source records',
  },
  {
    eyebrow: 'Historic places · statewide verified directory',
    title: 'Texas Painted Churches Directory — Census, Map, Sources & Visitor Access',
    description: 'The canonical Texas Defined Painted Churches collection with verified profiles, a transparent census, methodology, map, designation evidence, reusable CSV/JSON data and a dedicated citation guide.',
    href: '/explore/painted-churches',
    csvHref: '/painted-churches.csv',
    jsonHref: '/painted-churches.json',
    secondaryHref: '/explore/painted-churches/cite',
    secondaryLabel: 'How to cite the collection',
    sourceLabel: 'National Park Service, Texas Historical Commission, parish and archival source trails',
  },
  {
    eyebrow: 'Freshwater fishing · lake × species matrix',
    title: 'Texas Fishing Species & Lake Reference Matrix',
    description: 'A statewide relationship dataset connecting published Texas fishing lakes with documented species, prominence, fishery quality, seasonal patterns, lake characteristics and the source records behind each relationship.',
    href: '/fishing/species',
    csvHref: '/fishing-lake-species.csv',
    secondaryHref: '/fishing/lakes',
    secondaryLabel: 'Browse the lake directory',
    sourceLabel: 'Texas Parks & Wildlife and source records attached to lake, species and fishery relationships',
  },
  {
    eyebrow: 'High-school football · 2026–28 UIL alignment',
    title: 'Texas UIL Football District Reference — Classifications, Teams & Enrollments',
    description: 'All 192 current UIL football districts with classification, division, district number, member programs and the exact enrollment values used for the 2026–28 alignment cycle.',
    href: '/texas-high-school-football-districts',
    csvHref: '/texas-high-school-football-districts.csv',
    secondaryHref: '/texas-high-school-football-teams',
    secondaryLabel: 'Search every football program',
    sourceLabel: 'University Interscholastic League alignment and enrollment source records',
  },
] as const;

export const nextStops = [
  ['Plan a move to Texas', '/moving-to-texas', 'Use the relocation research center for metro guides, city matching, address-level source checks, moving tasks and cost tools.'],
  ['Texas industries', '/texas-industries', 'Connect statewide economic data with sourced sector guides, regional industry hubs and county pathways.'],
  ['Find your county', '/browse/counties', 'Explore all 254 counties and find trusted local information for each one.'],
  ['County population growth', '/texas-data/county-growth', 'Compare Census Vintage 2025 county population change from the 2020 estimates base to July 1, 2025.'],
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
      meta: buildMeta(texasDefinedBrand, { canonicalPath: '/texas-data', title: 'Texas Data & Reference Library', description }),
      links: [canonicalLink(texasDefinedBrand, '/texas-data')],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': ['CollectionPage', 'DataCatalog'], '@id': `${pageUrl}#page`, url: pageUrl, name: 'Texas Data & Reference Library', description,
            publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` }, isPartOf: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#website` },
            dataset: [
              ...datasets.map((dataset) => ({ '@type': 'Dataset', '@id': `${absoluteUrl(texasDefinedBrand, `/texas-data/${dataset.slug}`)}#dataset`, name: dataset.title, description: dataset.description, url: absoluteUrl(texasDefinedBrand, `/texas-data/${dataset.slug}`), dateModified: dataset.updated, temporalCoverage: String(dataset.year) })),
              ...referenceCollections.map((collection) => ({
                '@type': 'Dataset',
                '@id': `${absoluteUrl(texasDefinedBrand, collection.href)}#dataset`,
                name: collection.title,
                description: collection.description,
                url: absoluteUrl(texasDefinedBrand, collection.href),
                spatialCoverage: { '@type': 'State', name: 'Texas' },
                isBasedOn: collection.sourceLabel,
                distribution: [
                  { '@type': 'DataDownload', encodingFormat: 'text/csv', contentUrl: absoluteUrl(texasDefinedBrand, collection.csvHref) },
                  ...('jsonHref' in collection ? [{ '@type': 'DataDownload', encodingFormat: 'application/json', contentUrl: absoluteUrl(texasDefinedBrand, collection.jsonHref) }] : []),
                ],
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
