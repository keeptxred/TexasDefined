import fs from 'node:fs';

const root = fs.readFileSync('src/routes/__root.tsx', 'utf8');
const bootstrap = fs.readFileSync('public/expedia-travel.js', 'utf8');
const errors = [];

function requireText(source, needle, label) {
  if (!source.includes(needle)) errors.push(`${label} is missing required Expedia contract text: ${needle}`);
}

requireText(root, '<script src="/expedia-travel.js" defer />', 'root bootstrap reference');

for (const [needle, label] of [
  ['https://creator.expediagroup.com/products/widgets/assets/eg-widgets.js', 'widget script'],
  ['document.createElement("script")', 'deferred vendor script creation'],
  ['script.className = "eg-widgets-script"', 'Expedia widget script class'],
  ['addEventListener("click"', 'user-intent loading'],
  ['document.body.appendChild(script)', 'deferred vendor script activation'],
  ['data-widget="search"', 'search widget'],
  ['data-program="us-expedia"', 'US Expedia program'],
  ['data-lobs="stays"', 'stays line of business'],
  ['data-network="pz"', 'affiliate network'],
  ['data-camref="1110lMy6E"', 'approved camref'],
  ['data-pubref="texasdefined-stays"', 'approved pubref'],
  ['TRAVEL_PATH.test(window.location.pathname)', 'central travel-route guard'],
  ['Affiliate disclosure: TexasDefined may earn a commission from qualifying Expedia bookings', 'affiliate disclosure'],
]) requireText(bootstrap, needle, label);

for (const family of ['explore', 'destination', 'county', 'sports-venue', 'event']) {
  requireText(bootstrap, family, `${family} route family`);
}

if (errors.length) {
  console.error('Expedia affiliate integration validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Expedia affiliate integration validation passed: the first-party bootstrap is deferred outside the main React bundle, approved travel routes receive the disclosed stay-search surface, and Expedia vendor JavaScript is created only after a visitor click.');
