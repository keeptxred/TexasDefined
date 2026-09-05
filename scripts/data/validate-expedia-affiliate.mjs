import fs from 'node:fs';

const errors = [];
const read = (path) => fs.readFileSync(path, 'utf8');

const widget = read('src/components/affiliate/ExpediaStaySearch.tsx');
const explore = read('src/routes/explore.index.lazy.tsx');
const categories = read('src/routes/explore.$category.lazy.tsx');
const destination = read('src/components/editorial/DestinationViatorBooking.tsx');
const counties = read('src/components/sports/CountySportsDestinations.tsx');
const sportsVenues = read('src/components/sports/SportsVenueQuickAnswers.tsx');
const eventGuide = read('src/routes/event.$slug.lazy.tsx');

function requireText(source, needle, label) {
  if (!source.includes(needle)) errors.push(`${label} is missing required Expedia contract text: ${needle}`);
}

for (const [needle, label] of [
  ["const EXPEDIA_WIDGET_SCRIPT = 'https://creator.expediagroup.com/products/widgets/assets/eg-widgets.js'", 'widget script'],
  ["const EXPEDIA_CAMREF = '1110lMy6E'", 'approved camref'],
  ["const EXPEDIA_PUBREF = 'texasdefined-stays'", 'approved pubref'],
  ['data-widget="search"', 'search widget'],
  ['data-program="us-expedia"', 'US Expedia program'],
  ['data-lobs="stays"', 'stays line of business'],
  ['data-network="pz"', 'affiliate network'],
  ['data-camref={EXPEDIA_CAMREF}', 'camref binding'],
  ['data-pubref={EXPEDIA_PUBREF}', 'pubref binding'],
  ['Affiliate disclosure: TexasDefined may earn a commission from qualifying Expedia bookings', 'affiliate disclosure'],
]) requireText(widget, needle, label);

for (const [source, needle, label] of [
  [explore, '<ExpediaStaySearch', 'statewide Explore page'],
  [categories, '<ExpediaStaySearch', 'travel-focused Explore categories'],
  [destination, '<ExpediaStaySearch', 'destination guides'],
  [counties, '<ExpediaStaySearch', 'county guides'],
  [sportsVenues, '<ExpediaStaySearch', 'sports and golf venue guides'],
  [eventGuide, '<ExpediaStaySearch', 'major event guides'],
]) requireText(source, needle, label);

for (const category of ['state-parks', 'lakes-rivers', 'small-towns', 'road-trips', 'historic-sites', 'food-bbq', 'outdoors']) {
  if (!categories.includes(`'${category}'`)) errors.push(`Travel category ${category} is missing from the Expedia stay-placement allowlist.`);
}

if (errors.length) {
  console.error('Expedia affiliate integration validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Expedia affiliate integration validation passed: approved widget tracking is present on statewide Explore, travel categories, destination, county, sports/golf venue and major-event trip-planning surfaces with disclosure.');
