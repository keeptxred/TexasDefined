import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const routePath = path.join(root, 'src/routes/explore.$category.tsx');
const route = fs.readFileSync(routePath, 'utf8');
const lazyRoute = fs.readFileSync(path.join(root, 'src/routes/explore.$category.lazy.tsx'), 'utf8');
const categoryPage = fs.readFileSync(path.join(root, 'src/components/editorial/CategoryPage.tsx'), 'utf8');
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
console.log('Explore Outdoors, Caverns, Lakes & Rivers, and Beaches & Coast retain 700+ words, substantive sections, official sources, internal discovery, safe static markup, inline SSR/client asset delivery, index readiness, and protected search-intent metadata without helper-module bundle cost.');
