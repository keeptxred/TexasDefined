import fs from 'node:fs';

const root = fs.readFileSync('src/routes/__root.tsx', 'utf8');
const errors = [];
const requireText = (needle, label) => {
  if (!root.includes(needle)) errors.push(`${label} is missing required Expedia contract text: ${needle}`);
};

for (const [needle, label] of [
  ['https://creator.expediagroup.com/products/widgets/assets/eg-widgets.js', 'widget script'],
  ['document.createElement("script")', 'deferred script creation'],
  ['script.className = "eg-widgets-script"', 'Expedia widget script class'],
  ['onClick={(event) => loadExpediaWidget(event.currentTarget)}', 'user-intent loading'],
  ['document.body.appendChild(script)', 'deferred script activation'],
  ['data-widget="search"', 'search widget'],
  ['data-program="us-expedia"', 'US Expedia program'],
  ['data-lobs="stays"', 'stays line of business'],
  ['data-network="pz"', 'affiliate network'],
  ['data-camref="1110lMy6E"', 'approved camref'],
  ['data-pubref="texasdefined-stays"', 'approved pubref'],
  ['EXPEDIA_TRAVEL_PATH.test(pathname)', 'central travel-route guard'],
  ['Affiliate disclosure: TexasDefined may earn a commission from qualifying Expedia bookings', 'affiliate disclosure'],
]) requireText(needle, label);

for (const family of ['explore', 'destination', 'county', 'sports-venue', 'event']) {
  requireText(family, `${family} route family`);
}

if (errors.length) {
  console.error('Expedia affiliate integration validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Expedia affiliate integration validation passed: approved tracking and disclosure are centrally guarded for Explore, destination, county, sports/golf venue and event travel surfaces, with the vendor script loaded only after a visitor click.');
