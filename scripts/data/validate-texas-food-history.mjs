import fs from 'node:fs';

const route = fs.readFileSync('src/routes/texas-food-history.tsx', 'utf8');
const evergreenComponent = fs.readFileSync('src/components/editorial/TexasEvergreenGuide.tsx', 'utf8');
const exploreCategory = fs.readFileSync('src/routes/explore.$category.tsx', 'utf8');
const publicRoutes = fs.readFileSync('src/lib/public-routes.ts', 'utf8');
const rootHub = fs.readFileSync('src/routes/things-unique-to-texas.lazy.tsx', 'utf8');
const categoryHub = fs.readFileSync('src/routes/things-unique-to-texas.$category.lazy.tsx', 'utf8');
const texasLiving = fs.readFileSync('src/routes/texas-living.tsx', 'utf8');
const smoke = fs.readFileSync('.github/workflows/things-unique-to-texas-production-smoke.yml', 'utf8');
const llms = fs.readFileSync('src/routes/llms[.]txt.ts', 'utf8');
const citationIndex = JSON.parse(fs.readFileSync('public/citation-magnets.json', 'utf8'));
const batch5 = fs.readFileSync('src/data/texas-evergreen-guides-batch5.ts', 'utf8');
const failures = [];

const focusedGuides = [
  '/article/texas-barbecue-styles-explained',
  '/texas-chili-con-carne-history',
  '/texas-chicken-fried-steak-guide',
  '/texas-breakfast-taco-guide',
  '/german-czech-texas-towns',
  '/dr-pepper-texas-history',
  '/texas-ranch-water-guide',
  '/san-antonio-puffy-taco-history',
  '/barbacoa-big-red-san-antonio',
];

for (const token of [
  'const canonicalPath = "/texas-food-history"',
  '"@type": "CollectionPage"',
  '"@type": "ItemList"',
  '"@type": "BreadcrumbList"',
  'There is no single Texas cuisine',
  'Separate history from folklore',
  'Start with nine stories',
]) {
  if (!route.includes(token)) failures.push(`Texas Food History route missing contract token: ${token}.`);
}

for (const path of focusedGuides) {
  if (!route.includes(`href: "${path}"`) && !route.includes(`to="${path}"`)) failures.push(`Texas Food History must link focused guide ${path}.`);
}

for (const token of [
  'const foodHistoryGuideSlugs = new Set([',
  'const isFoodHistoryChild = foodHistoryGuideSlugs.has(guide.slug)',
  'name: "Texas Food History", item: `${siteUrl}/texas-food-history`',
  'isPartOf: { "@type": "CollectionPage", "@id": `${siteUrl}/texas-food-history#page`',
  '<Link to="/texas-food-history"',
  'Explore the full Texas Food History collection',
  'const guideDestinationLinks',
  'href: "/destination/dr-pepper-museum"',
  'Explore the Dr Pepper Museum',
  '"@type": "TouristAttraction"',
]) {
  if (!evergreenComponent.includes(token)) failures.push(`Food-history child guides missing parent/travel token: ${token}.`);
}

for (const slug of [
  'texas-food-trail',
  'texas-chili-con-carne-history',
  'texas-chicken-fried-steak-guide',
  'texas-breakfast-taco-guide',
  'german-czech-texas-towns',
  'dr-pepper-texas-history',
  'texas-ranch-water-guide',
  'san-antonio-puffy-taco-history',
  'barbacoa-big-red-san-antonio',
]) {
  if (!evergreenComponent.includes(`"${slug}"`)) failures.push(`Food-history parent cluster missing child slug ${slug}.`);
}

for (const token of [
  'params.category === "food-bbq"',
  'name: "Texas Food History"',
  'url: `${siteUrl}/texas-food-history`',
  'const showFoodHistory = match.slug === "food-bbq"',
  '<Link to="/texas-food-history"',
  'Explore Texas food history',
]) {
  if (!exploreCategory.includes(token)) failures.push(`Explore Food & BBQ discovery missing token: ${token}.`);
}

const imageContracts = [
  ['src/routes/texas-chili-con-carne-history.tsx', 'Pot_of_Chili_Con_Carne.jpg', 'Pot of chili con carne'],
  ['src/routes/texas-chicken-fried-steak-guide.tsx', 'Chicken_fried_steak.jpg', 'Chicken-fried steak'],
  ['src/routes/texas-breakfast-taco-guide.tsx', 'BreakfastTaco.jpg', 'Egg and sausage breakfast taco'],
  ['src/routes/dr-pepper-texas-history.tsx', 'Cupola_Dr_Pepper_Museum_Waco_Texas_2024.jpg', 'Dr Pepper Museum'],
  ['src/routes/texas-ranch-water-guide.tsx', 'Ranch_water.jpg', 'Ranch Water cocktail'],
  ['src/routes/san-antonio-puffy-taco-history.tsx', 'Puffy_taco.jpg', 'Puffy taco served'],
];
for (const [file, imageNeedle, altNeedle] of imageContracts) {
  const source = fs.readFileSync(file, 'utf8');
  if (!source.includes('image: heroImage')) failures.push(`${file} must publish its hero in social metadata.`);
  if (!source.includes(imageNeedle)) failures.push(`${file} missing expected exact-subject hero ${imageNeedle}.`);
  if (!source.includes(altNeedle)) failures.push(`${file} missing expected hero alt text.`);
}
for (const token of [
  'Punkgobliner · CC BY-SA 4.0 · Wikimedia Commons',
  'Mr. Gray · CC0 · Wikimedia Commons',
  'Paxsimius · CC BY-SA 4.0 · Wikimedia Commons',
  'Larry D. Moore · CC BY 4.0 · Wikimedia Commons',
  'BanjoZebra · CC BY 4.0 · Wikimedia Commons',
  'y6y6y6 · CC BY 2.0 · Wikimedia Commons',
  'image.src.startsWith("http://") || image.src.startsWith("https://")',
  'sourceHref',
]) {
  if (!evergreenComponent.includes(token)) failures.push(`Food-history image layer missing licensing/URL token: ${token}.`);
}

for (const [slug, routeFile] of [
  ['texas-ranch-water-guide', 'src/routes/texas-ranch-water-guide.tsx'],
  ['san-antonio-puffy-taco-history', 'src/routes/san-antonio-puffy-taco-history.tsx'],
  ['barbacoa-big-red-san-antonio', 'src/routes/barbacoa-big-red-san-antonio.tsx'],
]) {
  if (!batch5.includes(`slug: "${slug}"`)) failures.push(`Batch 5 data missing ${slug}.`);
  if (!fs.existsSync(routeFile)) failures.push(`Missing Food History child route ${routeFile}.`);
}

for (const token of [
  'austinmonthly.com/ranch-water',
  'washingtonpost.com/food/2021/07/27/ranch-water-recipe',
  'visitsanantonio.com/in-the-news/post/the-ultimate-texas-hill-country-road-trip-includes-tree-houses-tubing-and-tacos',
  'news.utsa.edu/2020/08/everything-you-need-to-know-about-tacos-texas-and-tradition',
  'mesquite-news.com/big-red-and-barbacoa-headline-festival',
  'drpeppermuseum.com/virtual-tour',
  'sanantonioreport.org/barbacoa-big-red-festival-only-in-sa',
]) {
  if (!evergreenComponent.includes(token)) failures.push(`New Food History source-note layer missing source token: ${token}.`);
}

if (!publicRoutes.includes('"/texas-food-history"')) failures.push('Texas Food History must remain indexable in public route governance.');
for (const path of ['/texas-ranch-water-guide','/san-antonio-puffy-taco-history','/barbacoa-big-red-san-antonio']) {
  if (!publicRoutes.includes(`"${path}"`)) failures.push(`${path} must remain indexable in public route governance.`);
  if (!rootHub.includes(`to="${path}"`)) failures.push(`Things That Define Texas hub must surface ${path}.`);
  if (!categoryHub.includes(`href: "${path}"`)) failures.push(`Food & Drink chapter must feature ${path}.`);
  if (!smoke.includes(`check_page '${path}'`)) failures.push(`Production smoke must verify ${path}.`);
  if (!llms.includes(`https://texasdefined.com${path}`)) failures.push(`llms.txt must advertise ${path}.`);
}
if (!texasLiving.includes("['/texas-food-history', 'Texas Food History'")) failures.push('Texas Life must surface Texas Food History.');
for (const path of ['/texas-ranch-water-guide','/san-antonio-puffy-taco-history','/barbacoa-big-red-san-antonio']) {
  if (!texasLiving.includes(`['${path}'`)) failures.push(`Texas Life must surface ${path}.`);
}
if (!llms.includes('Texas food history: https://texasdefined.com/texas-food-history')) failures.push('llms.txt must expose Texas Food History.');

const citationContracts = [
  ['https://texasdefined.com/texas-food-history', 'food-history-collection', ['topical-hub','source-backed-history','folklore-vs-documentation','canonical-cross-links']],
  ['https://texasdefined.com/texas-ranch-water-guide', 'food-drink-history-reference', ['origin-dispute','source-notes']],
  ['https://texasdefined.com/san-antonio-puffy-taco-history', 'food-history-reference', ['San-Antonio-context','source-notes']],
  ['https://texasdefined.com/barbacoa-big-red-san-antonio', 'food-culture-reference', ['chronology-distinction','source-notes']],
];
for (const [url, type, trustMarkers] of citationContracts) {
  const resource = citationIndex.resources?.find((item) => item.url === url);
  if (!resource) {
    failures.push(`Citation index must include ${url}.`);
    continue;
  }
  if (resource.type !== type) failures.push(`${url} citation-index type must remain ${type}.`);
  for (const marker of trustMarkers) if (!resource.trust?.includes(marker)) failures.push(`${url} citation index missing trust marker ${marker}.`);
}

if (failures.length) {
  console.error('Texas Food History validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Texas Food History validation passed: canonical hub, ${focusedGuides.length} focused links, parent-child schema, Food & BBQ discovery, sourced batch-5 guides, Dr Pepper museum handoff, six exact-subject hero/social-image contracts, sitemap governance, smoke, llms.txt and citation-index coverage intact.`);
