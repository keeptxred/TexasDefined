import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const cityPassData = read('src/data/citypass.ts');
const calloutWrapper = read('src/components/monetization/CityPassCallout.tsx');
const calloutContent = read('src/components/monetization/CityPassCalloutContent.tsx');
const component = [cityPassData, calloutWrapper, calloutContent].join('\n');
const expansion = read('src/data/citypass-destination-expansion.ts');
const preserved = read('src/data/destination-preserved-catalog.ts');
const destinationRuntime = read('src/data/destination-query-runtime.ts');
const exploreSitemap = read('src/routes/sitemap-explore[.]xml.ts');
const guideRoute = read('src/routes/guides.citypass-texas.tsx');
const guidePage = read('src/routes/guides.citypass-texas.lazy.tsx');
const guidesHub = read('src/routes/guides.tsx');
const destinationRoute = read('src/routes/destination.$slug.tsx');
const entityRoute = read('src/routes/$kind.$slug.lazy.tsx');
const sportsQuickAnswers = read('src/components/sports/SportsVenueQuickAnswers.tsx');
const publicRoutes = read('src/lib/public-routes.ts');
const errors = [];

function requireText(source, needle, label) {
  if (!source.includes(needle)) errors.push(`${label} is missing required CityPASS contract text: ${needle}`);
}

for (const [needle, label] of [
  ['https://www.anrdoezrs.net/click-101876465-11436795', 'Affiliate URL'],
  ['sponsored nofollow noopener noreferrer', 'Affiliate rel attributes'],
  ['Affiliate disclosure: TexasDefined may earn a commission', 'Affiliate disclosure'],
  ['/guides/citypass-texas', 'Evergreen guide link'],
  ['export type CityPassMarket = "Dallas" | "Houston" | "San Antonio"', 'Three-market type'],
  ['cityPassMarketForSportsVenueSlug', 'Sports venue market resolver'],
]) requireText(component, needle, label);
requireText(calloutWrapper, 'import("./CityPassCalloutContent")', 'Lazy CityPASS CTA performance split');

const destinationCoverage = [
  ['Dallas', 'perot-museum-of-nature-and-science', '/destination/perot-museum-of-nature-and-science'],
  ['Dallas', 'reunion-tower-dallas', '/destination/reunion-tower-dallas'],
  ['Dallas', 'dallas-zoo', '/destination/dallas-zoo'],
  ['Dallas', 'george-w-bush-presidential-museum-dallas', '/destination/george-w-bush-presidential-museum-dallas'],
  ['Dallas', 'dallas-holocaust-human-rights-museum', '/destination/dallas-holocaust-human-rights-museum'],
  ['Houston', 'space-center-houston', '/destination/space-center-houston'],
  ['Houston', 'houston-zoo', '/destination/houston-zoo'],
  ['Houston', 'downtown-aquarium-houston', '/destination/downtown-aquarium-houston'],
  ['Houston', 'houston-museum-of-natural-science', '/destination/houston-museum-of-natural-science'],
  ['Houston', 'kemah-boardwalk', '/destination/kemah-boardwalk'],
  ['Houston', 'childrens-museum-houston', '/destination/childrens-museum-houston'],
  ['Houston', 'museum-of-fine-arts-houston', '/destination/museum-of-fine-arts-houston'],
  ['San Antonio', 'go-rio-san-antonio-river-cruises', '/destination/go-rio-san-antonio-river-cruises'],
  ['San Antonio', 'san-antonio-zoo', '/destination/san-antonio-zoo'],
  ['San Antonio', 'tower-of-the-americas', '/destination/tower-of-the-americas'],
  ['San Antonio', 'the-alamo', '/destination/the-alamo'],
  ['San Antonio', 'san-antonio-botanical-garden', '/destination/san-antonio-botanical-garden'],
  ['San Antonio', 'witte-museum', '/destination/witte-museum'],
  ['San Antonio', 'the-doseum', '/destination/the-doseum'],
  ['San Antonio', 'san-antonio-museum-of-art', '/destination/san-antonio-museum-of-art'],
];

for (const [market, slug, href] of destinationCoverage) {
  requireText(component, `"${slug}": "${market}"`, `${market} destination mapping ${slug}`);
  requireText(guidePage, `href: "${href}"`, `Evergreen guide route for ${slug}`);
}

requireText(component, '"att-stadium": "Dallas"', 'AT&T Stadium CityPASS mapping');
requireText(guidePage, 'href: "/sports-venue/att-stadium"', 'AT&T Stadium Tours guide route');
requireText(sportsQuickAnswers, 'cityPassMarketForSportsVenueSlug', 'AT&T Stadium sports template integration');
requireText(sportsQuickAnswers, '<CityPassCallout market={cityPassMarket} />', 'AT&T Stadium contextual callout');

const newlyPublishedSlugs = [
  'kemah-boardwalk',
  'go-rio-san-antonio-river-cruises',
  'tower-of-the-americas',
  'san-antonio-botanical-garden',
  'witte-museum',
  'the-doseum',
  'reunion-tower-dallas',
  'dallas-zoo',
];
for (const slug of newlyPublishedSlugs) requireText(expansion, `"${slug}"`, `New CityPASS destination ${slug}`);
const publishedDestinationRows = (expansion.match(/\bdestination\((?:KEMAH|SAN_ANTONIO|DALLAS),\s*\[/g) || []).length;
if (publishedDestinationRows !== newlyPublishedSlugs.length) {
  errors.push(`New CityPASS destination expansion must contain exactly ${newlyPublishedSlugs.length} registered destination rows; found ${publishedDestinationRows}`);
}
if (preserved.includes('citypass-destination-expansion')) errors.push('CityPASS destination expansion must not be statically imported by the global preserved catalog.');
requireText(destinationRuntime, 'await import("./citypass-destination-expansion")', 'Async CityPASS destination runtime load');
requireText(destinationRuntime, 'await loadPreservedExploreDestinations()', 'Async CityPASS preserved catalog merge');
requireText(exploreSitemap, 'await import("@/data/citypass-destination-expansion")', 'Async CityPASS sitemap load');
requireText(exploreSitemap, 'mergeDestinationSources(preservedExploreDestinations, cityPassDestinationExpansion)', 'CityPASS sitemap preserved merge');

for (const market of ['dallas', 'houston', 'san-antonio']) requireText(component, market === 'san-antonio' ? '"san-antonio": "San Antonio"' : `${market}: "${market[0].toUpperCase()}${market.slice(1)}"`, `City page mapping ${market}`);
requireText(entityRoute, 'cityPassMarketForCitySlug', 'City guide integration');
requireText(entityRoute, '<CityPassCallout market={cityPassMarket} />', 'City guide callout');
requireText(destinationRoute, 'cityPassMarketForDestinationSlug', 'Destination guide integration');
requireText(destinationRoute, '<CityPassCallout market={cityPassMarket} placement="rail" />', 'Destination guide callout');

for (const marker of [
  'Dallas CityPASS®',
  'Houston CityPASS®',
  'San Antonio CityPASS®',
  'all 21 current attraction choices',
]) requireText(guidesHub + guidePage, marker, 'Three-market evergreen coverage');

for (const url of ['https://www.citypass.com/dallas', 'https://www.citypass.com/houston', 'https://www.citypass.com/san-antonio']) requireText(guideRoute + guidePage, url, 'Official CityPASS source');
requireText(publicRoutes, '"/guides/citypass-texas"', 'Public route registry');

if (errors.length) {
  console.error('CityPASS affiliate validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('CityPASS affiliate validation passed: Dallas, Houston and San Antonio are covered; all 21 current Texas CityPASS attractions/tours map to TexasDefined pages; eight previously missing destination guides are published through the async preserved runtime; contextual city, destination and AT&T Stadium placements retain the disclosed CJ affiliate link and lazy CTA split.');
