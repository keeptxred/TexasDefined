import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const route = fs.readFileSync(path.join(root, 'src/routes/explore.$category.tsx'), 'utf8');
const errors = [];
const slugs = ['major-springs', 'swimming-holes-river-tubing', 'state-parks', 'national-parks', 'historic-sites', 'road-trips', 'food-bbq'];

const htmlWordCount = (html) => (html.replace(/<[^>]+>/g, ' ').match(/[A-Za-z0-9]+(?:['’][A-Za-z0-9]+)*/g) ?? []).length;

for (const slug of slugs) {
  if (!route.includes(`\"${slug}\"`)) errors.push(`Explore route does not register authority category ${slug}.`);
  const assetPath = path.join(root, 'public/content/explore-category-authority', `${slug}.html`);
  if (!fs.existsSync(assetPath)) {
    errors.push(`Second-wave Explore authority asset missing: ${slug}.`);
    continue;
  }

  const html = fs.readFileSync(assetPath, 'utf8');
  const words = htmlWordCount(html);
  const sections = (html.match(/<h3\b/g) ?? []).length;
  const externalLinks = (html.match(/href="https:\/\//g) ?? []).length;
  const internalLinks = (html.match(/href="\//g) ?? []).length;
  const externalHosts = new Set([...html.matchAll(/href="https:\/\/([^/\"]+)/g)].map((match) => match[1].toLowerCase()));

  if (words < 700) errors.push(`${slug} authority asset is too thin (${words} words; minimum 700).`);
  if (sections < 5) errors.push(`${slug} authority asset needs at least five substantive sections (${sections}).`);
  if (externalLinks < 4) errors.push(`${slug} authority asset needs at least four authoritative external links (${externalLinks}).`);
  if (externalHosts.size < 2) errors.push(`${slug} authority asset should use at least two independent authority domains (${externalHosts.size}).`);
  if (internalLinks < 3) errors.push(`${slug} authority asset needs at least three internal discovery links (${internalLinks}).`);
  if (!html.includes('Official sources')) errors.push(`${slug} authority asset is missing the Official sources section.`);
  if (!html.includes('Keep exploring')) errors.push(`${slug} authority asset is missing the Keep exploring section.`);
  if (/<script\b|\son\w+\s*=|javascript:/i.test(html)) errors.push(`${slug} authority asset contains executable or unsafe markup.`);
  if ((html.match(/target="_blank"/g) ?? []).length !== (html.match(/rel="noopener noreferrer"/g) ?? []).length) {
    errors.push(`${slug} authority asset external-link rel protections are incomplete.`);
  }
}

for (const marker of [
  'title: "Texas Springs: Spring-Fed Pools, Rivers & Trip Planning"',
  'title: "Texas Swimming Holes & River Tubing: Access, Flow & Safety Guide"',
  'title: "Texas State Parks: Camping, Hiking, Reservations & Trip Planning"',
  'title: "Texas National Parks & NPS Sites: Complete Trip Planning Guide"',
  'title: "Texas Historic Sites & Museums: Heritage Trip Planning Guide"',
  'title: "Texas Road Trips: Scenic Routes, Small Towns & Itineraries"',
  'title: "Texas Food & BBQ: Barbecue, Regional Foodways & Road Trips"',
]) {
  if (!route.includes(marker)) errors.push(`Second-wave Explore SEO override missing: ${marker}.`);
}

const protectedMarkers = {
  'major-springs': [
    'Texas Water Development Board — Springs Monitoring Program',
    'Texas Water Development Board — Major and Historical Springs of Texas',
    'TCEQ — Clean Rivers Program',
    '/explore/lakes-rivers',
    '/explore/state-parks',
  ],
  'swimming-holes-river-tubing': [
    'Texas Parks &amp; Wildlife — Texas River Guide',
    'Texas Parks &amp; Wildlife — Public Boater Access',
    'Texas Commission on Environmental Quality — Surface Water Quality',
    'National Weather Service — Heat Safety',
    '/explore/major-springs',
    '/explore/lakes-rivers',
    '/explore/trip-planner',
    'Source review: September 13, 2026.',
  ],
  'state-parks': [
    'Texas Parks &amp; Wildlife — Texas State Parks',
    'Texas Parks &amp; Wildlife — State Park Alerts',
    '/explore/rv-parks',
    '/explore/road-trips',
  ],
  'national-parks': [
    'National Park Service — Texas park units',
    'Big Bend National Park — Alerts &amp; Conditions',
    'Guadalupe Mountains National Park — Alerts &amp; Conditions',
    '/explore/historic-sites',
  ],
  'historic-sites': [
    'Texas Historical Commission — Texas State Historic Sites',
    'Texas Historical Commission — Texas Historic Sites Atlas',
    '/explore/museums',
    '/explore/painted-churches',
  ],
  'road-trips': [
    'TxDOT — Official Travel Maps',
    'DriveTexas — Current Highway Conditions',
    '/explore/route-66/texas-road-trip',
    '/explore/trip-planner',
  ],
  'food-bbq': [
    'Texas A&amp;M Meat Science — Texas BBQ',
    'Texas Department of Agriculture — GO TEXAN Directory',
    'Texas DSHS — Retail Food Establishments',
    '/texas-food-history',
  ],
};

for (const [slug, markers] of Object.entries(protectedMarkers)) {
  const html = fs.readFileSync(path.join(root, 'public/content/explore-category-authority', `${slug}.html`), 'utf8');
  for (const marker of markers) if (!html.includes(marker)) errors.push(`${slug} authority asset missing protected marker: ${marker}.`);
}

if (errors.length) {
  console.error('Explore category authority wave 2 validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Explore category authority wave 2 validation passed: ${slugs.length} category hubs have 700+ words, five or more substantive sections, multi-source authority links, internal discovery paths and dedicated SEO metadata.`);
