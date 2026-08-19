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
const failures = [];

const focusedGuides = [
  '/article/texas-barbecue-styles-explained',
  '/texas-chili-con-carne-history',
  '/texas-chicken-fried-steak-guide',
  '/texas-breakfast-taco-guide',
  '/german-czech-texas-towns',
  '/dr-pepper-texas-history',
];

for (const token of [
  'const canonicalPath = "/texas-food-history"',
  '"@type": "CollectionPage"',
  '"@type": "ItemList"',
  '"@type": "BreadcrumbList"',
  'There is no single Texas cuisine',
  'Separate history from folklore',
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

for (const slug of ['texas-food-trail','texas-chili-con-carne-history','texas-chicken-fried-steak-guide','texas-breakfast-taco-guide','german-czech-texas-towns','dr-pepper-texas-history']) {
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
  'image.src.startsWith("http://") || image.src.startsWith("https://")',
  'sourceHref',
]) {
  if (!evergreenComponent.includes(token)) failures.push(`Food-history image layer missing licensing/URL token: ${token}.`);
}

if (!publicRoutes.includes('"/texas-food-history"')) failures.push('Texas Food History must remain indexable in public route governance.');
if (!rootHub.includes('to="/texas-food-history"')) failures.push('Things That Define Texas hub must visibly link Texas Food History.');
if (!categoryHub.includes('href: "/texas-food-history"')) failures.push('Food & Drink chapter must feature Texas Food History.');
if (!texasLiving.includes("['/texas-food-history', 'Texas Food History'")) failures.push('Texas Life must surface Texas Food History.');
if (!smoke.includes("check_page '/texas-food-history' 'Texas food history'")) failures.push('Production smoke must verify Texas Food History.');
if (!llms.includes('Texas food history: https://texasdefined.com/texas-food-history')) failures.push('llms.txt must expose Texas Food History.');

const citationResource = citationIndex.resources?.find((resource) => resource.url === 'https://texasdefined.com/texas-food-history');
if (!citationResource) failures.push('Citation index must include Texas Food History.');
else {
  if (citationResource.type !== 'culture-reference-hub') failures.push('Texas Food History citation-index type must remain culture-reference-hub.');
  for (const marker of ['historical-context', 'source-notes', 'canonical-cross-links', 'folklore-distinction']) {
    if (!citationResource.trust?.includes(marker)) failures.push(`Texas Food History citation index missing trust marker ${marker}.`);
  }
}

if (failures.length) {
  console.error('Texas Food History validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Texas Food History validation passed: canonical hub, ${focusedGuides.length} focused links, bidirectional parent-child schema, Food & BBQ discovery, Dr Pepper museum handoff, licensed exact-subject heroes with social metadata, sitemap governance, smoke, llms.txt and citation-index coverage intact.`);
