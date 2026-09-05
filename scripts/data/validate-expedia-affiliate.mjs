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
  ["document.createElement('script')", 'deferred script creation'],
  ['onClick={(event) => loadExpediaWidget(event.currentTarget)}', 'user-intent loading'],
  ['document.body.appendChild(script)', 'deferred script activation'],
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
  [categories, '<ExpediaStaySearch', 'Explore category template'],
  [destination, '<ExpediaStaySearch', 'destination guides'],
  [counties, '<ExpediaStaySearch', 'county guides'],
  [sportsVenues, '<ExpediaStaySearch', 'sports and golf venue guides'],
  [eventGuide, '<ExpediaStaySearch', 'major event guides'],
]) requireText(source, needle, label);

if (errors.length) {
  console.error('Expedia affiliate integration validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Expedia affiliate integration validation passed: approved widget tracking is click-loaded on statewide Explore, every Explore category template, destination, county, sports/golf venue and major-event trip-planning surfaces with disclosure.');
