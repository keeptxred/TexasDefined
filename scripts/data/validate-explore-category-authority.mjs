import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const routePath = path.join(root, 'src/routes/explore.$category.tsx');
const route = fs.readFileSync(routePath, 'utf8');
const lazyRoute = fs.readFileSync(path.join(root, 'src/routes/explore.$category.lazy.tsx'), 'utf8');
const categoryPage = fs.readFileSync(path.join(root, 'src/components/editorial/CategoryPage.tsx'), 'utf8');
const topicPaths = fs.readFileSync(path.join(root, 'src/components/editorial/ExploreTopicPaths.tsx'), 'utf8');
const homeNatureGuide = fs.readFileSync(path.join(root, 'src/components/editorial/TexasHomeNatureGuide.tsx'), 'utf8');
const homeNatureSeo = fs.readFileSync(path.join(root, 'src/lib/texas-home-nature-seo.ts'), 'utf8');
const homeNatureServer = fs.readFileSync(path.join(root, 'src/data/texas-home-nature-public.server.ts'), 'utf8');
const naturalWondersRoute = fs.readFileSync(path.join(root, 'src/routes/texas-natural-wonders-bucket-list.tsx'), 'utf8');
const naturalWondersLazy = fs.readFileSync(path.join(root, 'src/routes/texas-natural-wonders-bucket-list.lazy.tsx'), 'utf8');
const naturalWondersAuthority = fs.readFileSync(path.join(root, 'src/components/editorial/TexasNaturalWondersAuthority.tsx'), 'utf8');
const evergreenBatch2 = fs.readFileSync(path.join(root, 'src/data/texas-evergreen-guides-batch2.ts'), 'utf8');
const indexability = fs.readFileSync(path.join(root, 'src/data/explore-category-indexability.ts'), 'utf8');
const retiredHelperPath = path.join(root, 'src/data/explore-category-authority.ts');
const errors = [];
const authoritySlugs = ['outdoors', 'caverns', 'lakes-rivers', 'beaches-coast'];

for (const feature of [
  'const authorityCategorySlugs = new Set(["outdoors", "caverns", "lakes-rivers", "beaches-coast"]);',
  'const authorityPath = authorityCategorySlugs.has(category.slug)',
  '`/content/explore-category-authority/${category.slug}.html`',
  'fetch(import.meta.env.SSR ? `${siteUrl}${authorityPath}` : authorityPath)',
  'return { category, articles, destinations, authorityHtml }',
]) {
  if (!route.includes(feature)) errors.push(`Inline Explore authority loader contract missing: ${feature}.`);
}

for (const feature of [
  'const categorySeoOverrides: Partial<Record<string, { title: string; description: string }>> = {',
  'title: "Texas Outdoors & Wildlife: Parks, Trails, Birding & Wild Places"',
  'description: "Explore Texas outdoors by region, from state parks and hiking trails to wildlife, birding, dark skies, rivers and public lands, with seasonal access and safety guidance."',
  'title: "Texas Lakes & Rivers: Swimming, Paddling, Fishing & Water Trips"',
  'description: "Explore Texas lakes and rivers for swimming, paddling, fishing and camping, with river flows, reservoir conditions, public access, water quality and safety planning."',
  'title: "Texas Beaches & Gulf Coast: Islands, Wildlife, Fishing & Beach Trips"',
  'description: "Explore the Texas Gulf Coast by beaches, barrier islands, bays and marshes, with public access, water quality, rip-current safety, birding, fishing and trip-planning guidance."',
  'const categorySeo = categorySeoOverrides[loaderData.category.slug];',
  'const metaTitle = categorySeo?.title ?? loaderData.category.name;',
  'const metaDescription = categorySeo?.description ?? loaderData.category.description;',
  'name: metaTitle, description: metaDescription',
  'title: metaTitle, description: metaDescription',
]) {
  if (!route.includes(feature)) errors.push(`Explore authority SEO contract missing: ${feature}.`);
}

for (const forbidden of [
  '@/data/explore-category-authority',
  '@tanstack/react-start',
  'createServerFn',
  'createServerOnlyFn',
  'createIsomorphicFn',
  '/api/public/explore-category-authority',
]) {
  if (route.includes(forbidden)) errors.push(`Explore route must remain free of retired authority-loader overhead: ${forbidden}.`);
}
if (fs.existsSync(retiredHelperPath)) errors.push('Retired Explore authority helper module must remain deleted.');

for (const feature of [
  'const { destinations, authorityHtml } = Route.useLoaderData()',
  'authorityHtml={authorityHtml}',
]) {
  if (!lazyRoute.includes(feature)) errors.push(`Explore lazy-route rendering contract missing: ${feature}.`);
}
for (const feature of [
  'authorityHtml?: string | null',
  'belongsToExplore && authorityHtml',
  'dangerouslySetInnerHTML={{ __html: authorityHtml }}',
]) {
  if (!categoryPage.includes(feature)) errors.push(`Explore authority HTML rendering contract missing: ${feature}.`);
}

const htmlWordCount = (html) => (html.replace(/<[^>]+>/g, ' ').match(/[A-Za-z0-9]+(?:['’][A-Za-z0-9]+)*/g) ?? []).length;
for (const slug of authoritySlugs) {
  const assetPath = path.join(root, 'public/content/explore-category-authority', `${slug}.html`);
  if (!fs.existsSync(assetPath)) {
    errors.push(`Static Explore authority asset missing: ${slug}.`);
    continue;
  }
  const html = fs.readFileSync(assetPath, 'utf8');
  const words = htmlWordCount(html);
  const sections = (html.match(/<h3\b/g) ?? []).length;
  const officialLinks = (html.match(/href="https:\/\//g) ?? []).length;
  const internalLinks = (html.match(/href="\//g) ?? []).length;
  if (words < 700) errors.push(`Static Explore authority asset too thin (${words} words; minimum 700): ${slug}.`);
  if (sections < 5) errors.push(`Static Explore authority asset needs at least five substantive sections (${sections}): ${slug}.`);
  if (officialLinks < 4) errors.push(`Static Explore authority asset needs at least four authoritative external links (${officialLinks}): ${slug}.`);
  if (internalLinks < 3) errors.push(`Static Explore authority asset needs at least three internal links (${internalLinks}): ${slug}.`);
  if (/<script\b|\son\w+\s*=|javascript:/i.test(html)) errors.push(`Static Explore authority asset contains executable or unsafe markup: ${slug}.`);
  if ((html.match(/target="_blank"/g) ?? []).length !== (html.match(/rel="noopener noreferrer"/g) ?? []).length) errors.push(`Static Explore authority asset external-link rel protections are incomplete: ${slug}.`);
  if (!html.includes('Official sources') || !html.includes('Keep exploring')) errors.push(`Static Explore authority asset must retain explicit source and internal-discovery sections: ${slug}.`);
}

for (const [slug, requiredMarkers] of Object.entries({
  'lakes-rivers': [
    'Texas Parks &amp; Wildlife — Texas Paddling Trails',
    'Texas Water Development Board — Water Data for Texas',
    'TCEQ — Clean Rivers Program',
    '/fishing',
    '/explore/major-springs',
  ],
  'beaches-coast': [
    'Texas General Land Office — Planning Your Visit',
    'National Weather Service — Rip Current Safety',
    'National Park Service — Padre Island Safety',
    '/texas-birds-guide',
    '/explore/lighthouses',
  ],
})) {
  const html = fs.readFileSync(path.join(root, 'public/content/explore-category-authority', `${slug}.html`), 'utf8');
  for (const marker of requiredMarkers) if (!html.includes(marker)) errors.push(`${slug} authority asset missing protected marker: ${marker}.`);
}

for (const [categoryMarker, requiredTargets] of [
  ['"lakes-rivers": [', ['/explore/outdoors', '/explore/state-parks', '/explore/trip-planner', '/fishing']],
  ['"beaches-coast": [', ['/explore/outdoors', '/explore/state-parks', '/explore/road-trips', '/explore/trip-planner', '/texas-birds-guide']],
  ['outdoors: [', ['/explore/lakes-rivers', '/explore/beaches-coast', '/fishing', '/texas-birds-guide']],
]) {
  const start = topicPaths.indexOf(categoryMarker);
  if (start < 0) {
    errors.push(`Explore topic paths missing protected category marker: ${categoryMarker}.`);
    continue;
  }
  const end = topicPaths.indexOf('\n  ],', start + categoryMarker.length);
  const slice = topicPaths.slice(start, end > start ? end : undefined);
  for (const target of requiredTargets) if (!slice.includes(`to: "${target}"`)) errors.push(`${categoryMarker} must retain reciprocal Explore target ${target}.`);
}

for (const marker of [
  'const isBirdGuide = guide.slug === "texas-birds-guide";',
  'Plan a Texas birding trip',
  'href: "/explore/outdoors"',
  'href: "/explore/beaches-coast"',
  'href: "/explore/state-parks"',
  'href: "/explore/lakes-rivers"',
  'Outdoors &amp; Wildlife',
  'to="/home-garden"',
]) {
  if (!homeNatureGuide.includes(marker)) errors.push(`Texas birds visible authority placement missing marker: ${marker}.`);
}
for (const marker of [
  'const isBirdGuide = guide.slug === "texas-birds-guide";',
  'const articleSection = isBirdGuide ? "Texas Outdoors & Wildlife" : "Texas Home & Nature";',
  'name: "Explore Texas", item: `${siteUrl}/explore`',
  'name: "Outdoors & Wildlife", item: `${siteUrl}/explore/outdoors`',
  'name: "Home & Garden", item: `${siteUrl}/home-garden`',
  'itemListElement: breadcrumbs',
]) {
  if (!homeNatureSeo.includes(marker)) errors.push(`Texas birds structured authority placement missing marker: ${marker}.`);
}
for (const marker of [
  'Texas Parks and Wildlife Department — Great Texas Wildlife Trails',
  'https://tpwd.texas.gov/huntwild/wildlife/wildlife-trails/',
  'Texas Parks and Wildlife Department — Birding in State Parks',
  'https://tpwd.texas.gov/state-parks/parks/things-to-do/birding-in-state-parks',
  'slug === "texas-birds-guide" ? "2026-08-30" : defaultReviewedAt',
]) {
  if (!homeNatureServer.includes(marker)) errors.push(`Texas birds source/review authority missing marker: ${marker}.`);
}

for (const marker of [
  'TexasNaturalWondersAuthority',
  '<TexasEvergreenGuide guide={guide} />',
  '<TexasNaturalWondersAuthority />',
]) {
  if (!naturalWondersLazy.includes(marker)) errors.push(`Texas Natural Wonders lazy authority integration missing marker: ${marker}.`);
}
for (const marker of [
  '"@type": "CollectionPage"',
  '"@type": "ItemList"',
  '"@type": "Place"',
  'const itemListElement = guide.sections.map',
  'numberOfItems: itemListElement.length',
  'Texas Natural Wonders Bucket List: 12 Landscapes',
  'scripts: [{ type: "application/ld+json", children: JSON.stringify(collectionSchema) }]',
]) {
  if (!naturalWondersRoute.includes(marker)) errors.push(`Texas Natural Wonders structured authority missing marker: ${marker}.`);
}
for (const marker of [
  'Source review: August 30, 2026.',
  'https://www.nps.gov/bibe/index.htm',
  'https://www.nps.gov/gumo/index.htm',
  'https://www.nps.gov/pais/index.htm',
  'https://tpwd.texas.gov/state-parks/palo-duro-canyon',
  'https://tpwd.texas.gov/state-parks/caddo-lake',
  'https://tpwd.texas.gov/state-parks/enchanted-rock',
  'https://tpwd.texas.gov/state-parks/balmorhea',
  'https://tpwd.texas.gov/state-parks/caprock-canyons',
  'https://tpwd.texas.gov/state-parks/monahans-sandhills',
  'https://tpwd.texas.gov/state-parks/devils-river',
  'to: "/explore/outdoors"',
  'to: "/explore/state-parks"',
  'to: "/explore/national-parks"',
  'to: "/explore/lakes-rivers"',
  'to: "/explore/beaches-coast"',
  'to: "/explore/major-springs"',
  'to: "/explore/road-trips"',
  'to: "/explore/trip-planner"',
]) {
  if (!naturalWondersAuthority.includes(marker)) errors.push(`Texas Natural Wonders provenance/discovery authority missing marker: ${marker}.`);
}
const naturalWonderSourceCount = (naturalWondersAuthority.match(/href: "https:\/\//g) ?? []).length;
if (naturalWonderSourceCount < 10) errors.push(`Texas Natural Wonders authority needs at least 10 official source links; found ${naturalWonderSourceCount}.`);
for (const heading of [
  'Big Bend National Park',
  'Guadalupe Mountains National Park',
  'Palo Duro Canyon',
  'Caddo Lake',
  'Enchanted Rock',
  'Padre Island National Seashore',
  'Balmorhea and spring-fed West Texas',
  'Caprock Canyons and the Texas State Bison Herd',
  'Monahans Sandhills',
  'Devils River country',
  'Hill Country springs and limestone water',
  'The Rio Grande canyons',
]) {
  if (!evergreenBatch2.includes(`heading: "${heading}"`)) errors.push(`Texas Natural Wonders 12-landscape authority lost protected section: ${heading}.`);
}

const stagedMatch = indexability.match(/STAGED_EXPLORE_CATEGORY_SLUGS\s*=\s*new Set<CategorySlug>\(\[([\s\S]*?)\]\)/);
const stagedBody = stagedMatch?.[1] ?? '';
for (const slug of authoritySlugs) {
  if (new RegExp(`["']${slug}["']`).test(stagedBody)) errors.push(`Remediated Explore category remains staged noindex after authority expansion: ${slug}.`);
}

if (errors.length) {
  console.error('Explore category authority remediation validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('Explore Outdoors, Caverns, Lakes & Rivers, Beaches & Coast, Texas Birds, and the 12-landscape Texas Natural Wonders guide retain substantive official-source authority, reciprocal discovery, safe delivery, structured collection coverage and protected search-intent metadata.');
