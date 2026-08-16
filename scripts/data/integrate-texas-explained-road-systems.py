from pathlib import Path


def replace_once(path: str, old: str, new: str) -> None:
    p = Path(path)
    text = p.read_text()
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{path}: expected exactly one anchor, found {count}: {old[:120]!r}")
    p.write_text(text.replace(old, new, 1))

# Remove a nonessential reference to a now-unreliable newsroom URL; keep RM claims on current glossary definitions.
replace_once(
    "src/data/fixtures/texas-explained-road-systems.ts",
    '    p("TxDOT\'s own recent explanation of the system notes that Texas has far more FM routes than RM routes and that there is no simple statewide rule that perfectly explains why one road became FM while another became RM. The labels reflect history and commission actions as much as a clean farm-versus-ranch map."),\n',
    '    p("TxDOT defines both FM and RM roads as designated roadways generally associated with rural areas, but the glossary does not establish a simple farm-versus-ranch land-use test for choosing between them. The labels are highway-system designations created through commission action, not a current zoning description of the countryside."),\n',
)

# Lightweight discovery + lazy body loading.
replace_once(
    "src/data/fixtures/lazy-evergreen.ts",
    'import { texasExplainedReservoirProfileStubs } from "./texas-explained-reservoir-profile-stubs";\n',
    'import { texasExplainedReservoirProfileStubs } from "./texas-explained-reservoir-profile-stubs";\nimport { texasExplainedRoadSystemStubs } from "./texas-explained-road-system-stubs";\n',
)
replace_once(
    "src/data/fixtures/lazy-evergreen.ts",
    "  ...texasExplainedSupportStubs, ...texasExplainedSupportStubs2, ...texasExplainedRiverProfileStubs, ...texasExplainedReservoirProfileStubs,\n",
    "  ...texasExplainedSupportStubs, ...texasExplainedSupportStubs2, ...texasExplainedRiverProfileStubs, ...texasExplainedReservoirProfileStubs, ...texasExplainedRoadSystemStubs,\n",
)
replace_once(
    "src/data/fixtures/lazy-evergreen.ts",
    '''  if (texasExplainedReservoirProfileStubs.some((article) => article.slug === slug)) {\n    const reservoirModule = await import("./texas-explained-reservoir-profiles");\n    const article = reservoirModule.texasExplainedReservoirProfileArticles.find((candidate) => candidate.slug === slug);\n    return article ?? null;\n  }\n\n  return null;''',
    '''  if (texasExplainedReservoirProfileStubs.some((article) => article.slug === slug)) {\n    const reservoirModule = await import("./texas-explained-reservoir-profiles");\n    const article = reservoirModule.texasExplainedReservoirProfileArticles.find((candidate) => candidate.slug === slug);\n    return article ?? null;\n  }\n\n  if (texasExplainedRoadSystemStubs.some((article) => article.slug === slug)) {\n    const roadModule = await import("./texas-explained-road-systems");\n    const article = roadModule.texasExplainedRoadSystemArticles.find((candidate) => candidate.slug === slug);\n    return article ?? null;\n  }\n\n  return null;''',
)

# Parent FM pillar fans out to the five distinct road-system explainers.
replace_once(
    "src/data/fixtures/newest-evergreen.ts",
    '''  "texas-farm-to-market-roads-explained": [\n    { href: "/article/texas-highway-designations-explained", label: "Texas highway designations explained", description: "Decode FM, RM, SH, Loop, Spur, business routes, Park Roads and the rest of the state highway alphabet." },\n    { href: "/article/texas-settlement-patterns-explained", label: "How transportation reshaped Texas settlement", description: "See how rural roads layered onto rivers, county seats, railroads and older settlement corridors." },\n    { href: "/article/texas-railroads-town-growth-explained", label: "How railroads remade the Texas map", description: "See the transportation network that reshaped towns before the highway era." },\n  ],''',
    '''  "texas-farm-to-market-roads-explained": [\n    { href: "/article/texas-highway-designations-explained", label: "Texas highway designations explained", description: "Decode FM, RM, SH, Loop, Spur, business routes, Park Roads and the rest of the state highway alphabet." },\n    { href: "/article/texas-settlement-patterns-explained", label: "How transportation reshaped Texas settlement", description: "See how rural roads layered onto rivers, county seats, railroads and older settlement corridors." },\n    { href: "/article/texas-railroads-town-growth-explained", label: "How railroads remade the Texas map", description: "See the transportation network that reshaped towns before the highway era." },\n    { href: "/article/texas-ranch-to-market-roads-explained", label: "Ranch-to-Market roads explained", description: "Understand what an RM designation actually means and why Ranch Road 1 is a separate exception." },\n    { href: "/article/texas-loops-spurs-explained", label: "Texas Loops and Spurs explained", description: "Read the bypasses and branch connectors that organize traffic around and off the main corridor." },\n    { href: "/article/texas-business-routes-explained", label: "Texas Business Routes explained", description: "See why an older highway alignment often keeps running through the center of town after a bypass opens." },\n    { href: "/article/texas-park-recreational-roads-explained", label: "Park and Recreational Roads explained", description: "Decode the PR and RE systems that connect parks and recreation areas to the state highway network." },\n    { href: "/article/texas-historic-memorial-highways-explained", label: "Historic routes and memorial highways", description: "Separate the numbered highway designation from historic-route signs and honorary highway names." },\n  ],''',
)

# Expand Texas Explained from 30 to 35 collection articles.
replace_once(
    "src/routes/texas-explained.tsx",
    'const description = "Ten deeply reported Texas Defined guides, plus twenty focused supporting explainers, river profiles and reservoir profiles, connecting the water, roads, towns, landscapes, wildlife, homes, land and migration patterns that make Texas work the way it does.";',
    'const description = "Ten deeply reported Texas Defined guides, plus twenty-five focused supporting explainers and system profiles, connecting the water, roads, towns, landscapes, wildlife, homes, land and migration patterns that make Texas work the way it does.";',
)
replace_once(
    "src/routes/texas-explained.tsx",
    '''const reservoirProfileSlugs = [\n  "lake-buchanan-water-system-guide",\n  "lake-travis-water-system-guide",\n  "lake-whitney-water-system-guide",\n  "possum-kingdom-water-system-guide",\n  "toledo-bend-water-system-guide",\n] as const;\n\nconst collectionSlugs = [...pillarSlugs, ...childSupportSlugs, ...depthSlugs, ...riverProfileSlugs, ...reservoirProfileSlugs] as const;''',
    '''const reservoirProfileSlugs = [\n  "lake-buchanan-water-system-guide",\n  "lake-travis-water-system-guide",\n  "lake-whitney-water-system-guide",\n  "possum-kingdom-water-system-guide",\n  "toledo-bend-water-system-guide",\n] as const;\n\nconst roadSystemSlugs = [\n  "texas-ranch-to-market-roads-explained",\n  "texas-loops-spurs-explained",\n  "texas-business-routes-explained",\n  "texas-park-recreational-roads-explained",\n  "texas-historic-memorial-highways-explained",\n] as const;\n\nconst collectionSlugs = [...pillarSlugs, ...childSupportSlugs, ...depthSlugs, ...riverProfileSlugs, ...reservoirProfileSlugs, ...roadSystemSlugs] as const;''',
)
replace_once(
    "src/routes/texas-explained.tsx",
    "type LoaderData = { articles: Article[]; pillars: Article[]; supportArticles: Article[]; depthArticles: Article[]; riverProfiles: Article[]; reservoirProfiles: Article[] };",
    "type LoaderData = { articles: Article[]; pillars: Article[]; supportArticles: Article[]; depthArticles: Article[]; riverProfiles: Article[]; reservoirProfiles: Article[]; roadSystems: Article[] };",
)
replace_once(
    "src/routes/texas-explained.tsx",
    "      reservoirProfiles: orderedArticles(catalog, reservoirProfileSlugs),\n",
    "      reservoirProfiles: orderedArticles(catalog, reservoirProfileSlugs),\n      roadSystems: orderedArticles(catalog, roadSystemSlugs),\n",
)
replace_once(
    "src/routes/texas-explained.tsx",
    "  const { pillars, supportArticles, depthArticles, riverProfiles, reservoirProfiles } = Route.useLoaderData();",
    "  const { pillars, supportArticles, depthArticles, riverProfiles, reservoirProfiles, roadSystems } = Route.useLoaderData();",
)
replace_once(
    "src/routes/texas-explained.tsx",
    '<aside className="border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground"><p className="font-semibold text-foreground">10 core guides · 20 deeper explainers</p><p className="mt-2">Start with a core guide, then follow supporting explainers, deeper guides, river profiles and reservoir water-system profiles when you want the next layer of detail.</p></aside>',
    '<aside className="border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground"><p className="font-semibold text-foreground">10 core guides · 25 deeper explainers</p><p className="mt-2">Start with a core guide, then follow supporting explainers and focused water- and road-system profiles when you want the next layer of detail.</p></aside>',
)
replace_once(
    "src/routes/texas-explained.tsx",
    '<section id="go-deeper" className="mt-16 scroll-mt-28 border-t border-border pt-10" aria-labelledby="texas-explained-go-deeper"><header className="max-w-3xl"><p className="eyebrow text-primary">Go deeper</p><h2 id="texas-explained-go-deeper" className="mt-2 font-display text-3xl leading-tight sm:text-4xl">Twenty focused explainers behind the core guides</h2><p className="mt-4 text-base leading-7 text-muted-foreground">The first two layers break broad pillars into systems such as basins, aquifers, prairies, downtowns and railroads. River profiles apply that framework to five major waterways, while reservoir profiles show how engineered storage changes those river systems.</p></header><DepthGrid articles={supportArticles} label="Supporting explainers" /><DepthGrid articles={depthArticles} label="Deeper guides" /><DepthGrid articles={riverProfiles} label="Major river profiles" /><DepthGrid articles={reservoirProfiles} label="Reservoir water systems" /></section>',
    '<section id="go-deeper" className="mt-16 scroll-mt-28 border-t border-border pt-10" aria-labelledby="texas-explained-go-deeper"><header className="max-w-3xl"><p className="eyebrow text-primary">Go deeper</p><h2 id="texas-explained-go-deeper" className="mt-2 font-display text-3xl leading-tight sm:text-4xl">Twenty-five focused explainers behind the core guides</h2><p className="mt-4 text-base leading-7 text-muted-foreground">The first two layers break broad pillars into systems such as basins, aquifers, prairies, downtowns and railroads. River and reservoir profiles apply that framework to water, while the road-system layer decodes RM routes, loops, spurs, business routes, park roads and highway names.</p></header><DepthGrid articles={supportArticles} label="Supporting explainers" /><DepthGrid articles={depthArticles} label="Deeper guides" /><DepthGrid articles={riverProfiles} label="Major river profiles" /><DepthGrid articles={reservoirProfiles} label="Reservoir water systems" /><DepthGrid articles={roadSystems} label="Texas road systems" /></section>',
)
replace_once(
    "src/routes/texas-explained.tsx",
    "they are not part of the 30-article core-and-depth collection.",
    "they are not part of the 35-article core-and-depth collection.",
)

# Shared collection breadcrumb/schema context.
replace_once(
    "src/routes/article.$slug.tsx",
    '  "toledo-bend-water-system-guide",\n] as const;',
    '  "toledo-bend-water-system-guide",\n  "texas-ranch-to-market-roads-explained",\n  "texas-loops-spurs-explained",\n  "texas-business-routes-explained",\n  "texas-park-recreational-roads-explained",\n  "texas-historic-memorial-highways-explained",\n] as const;',
)

# Expand existing collection-size contracts.
for path in [
    "scripts/data/validate-texas-explained-river-profiles.mjs",
    "scripts/data/validate-texas-explained-reservoir-profiles.mjs",
]:
    replace_once(path, "10 core guides · 20 deeper explainers", "10 core guides · 25 deeper explainers")
    replace_once(path, "Twenty focused explainers behind the core guides", "Twenty-five focused explainers behind the core guides")

replace_once(
    "scripts/data/validate-texas-explained-depth.mjs",
    "  'const reservoirProfileSlugs = [',\n  'const collectionSlugs = [...pillarSlugs, ...childSupportSlugs, ...depthSlugs, ...riverProfileSlugs, ...reservoirProfileSlugs]',",
    "  'const reservoirProfileSlugs = [',\n  'const roadSystemSlugs = [',\n  'const collectionSlugs = [...pillarSlugs, ...childSupportSlugs, ...depthSlugs, ...riverProfileSlugs, ...reservoirProfileSlugs, ...roadSystemSlugs]',",
)
replace_once(
    "scripts/data/validate-texas-explained-depth.mjs",
    "  'reservoirProfiles: orderedArticles(catalog, reservoirProfileSlugs)',",
    "  'reservoirProfiles: orderedArticles(catalog, reservoirProfileSlugs)',\n  'roadSystems: orderedArticles(catalog, roadSystemSlugs)',",
)
replace_once(
    "scripts/data/validate-texas-explained-depth.mjs",
    "  '<DepthGrid articles={reservoirProfiles} label=\"Reservoir water systems\" />',\n  '10 core guides · 20 deeper explainers',\n  'Twenty focused explainers behind the core guides',",
    "  '<DepthGrid articles={reservoirProfiles} label=\"Reservoir water systems\" />',\n  '<DepthGrid articles={roadSystems} label=\"Texas road systems\" />',\n  '10 core guides · 25 deeper explainers',\n  'Twenty-five focused explainers behind the core guides',",
)
replace_once(
    "scripts/data/validate-texas-explained-depth.mjs",
    "Texas Explained 30-article hub discovery contract missing:",
    "Texas Explained 35-article hub discovery contract missing:",
)
replace_once(
    "scripts/data/validate-texas-explained-depth.mjs",
    "while the hub expands to a 30-article collection with five river and five reservoir profiles.",
    "while the hub expands to a 35-article collection with five river, five reservoir and five road-system profiles.",
)

validator = r'''import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const stubs = read('src/data/fixtures/texas-explained-road-system-stubs.ts');
const articles = read('src/data/fixtures/texas-explained-road-systems.ts');
const lazy = read('src/data/fixtures/lazy-evergreen.ts');
const hub = read('src/routes/texas-explained.tsx');
const topology = read('src/data/fixtures/newest-evergreen.ts');
const articleRoute = read('src/routes/article.$slug.tsx');
const errors = [];

const profiles = [
  ['texas-ranch-to-market-roads-explained', 'https://www.txdot.gov/projects/planning/highway-designations/glossary.html'],
  ['texas-loops-spurs-explained', 'https://www.txdot.gov/projects/planning/highway-designations/glossary.html'],
  ['texas-business-routes-explained', 'https://www.txdot.gov/projects/planning/highway-designations/glossary.html'],
  ['texas-park-recreational-roads-explained', 'https://www.txdot.gov/projects/planning/highway-designations/glossary.html'],
  ['texas-historic-memorial-highways-explained', 'https://www.txdot.gov/projects/planning/highway-designations.html'],
];

for (const marker of [
  'const collectionLink = { href: "/texas-explained"',
  'const designationsLink = { href: "/article/texas-highway-designations-explained"',
]) if (!articles.includes(marker)) errors.push(`Shared road-system navigation contract missing: ${marker}`);

for (const [slug, sourceUrl] of profiles) {
  if (!stubs.includes(`"${slug}"`)) errors.push(`Missing road-system stub: ${slug}`);
  if (!articles.includes(`slug: "${slug}"`)) errors.push(`Missing full road-system article: ${slug}`);
  if (!articles.includes(sourceUrl)) errors.push(`Missing current TxDOT source URL: ${slug}`);
  if (!hub.includes(`"${slug}"`)) errors.push(`Texas Explained hub must surface road-system article: ${slug}`);
  if (!topology.includes(`/article/${slug}`)) errors.push(`FM-road pillar must link to road-system article: ${slug}`);
  if (!articleRoute.includes(`"${slug}"`)) errors.push(`Shared article route must recognize road-system article: ${slug}`);
}

for (const marker of [
  'import { texasExplainedRoadSystemStubs }',
  '...texasExplainedRoadSystemStubs',
  'texasExplainedRoadSystemStubs.some((article) => article.slug === slug)',
  'await import("./texas-explained-road-systems")',
  'texasExplainedRoadSystemArticles.find',
]) if (!lazy.includes(marker)) errors.push(`Road-system lazy registration missing: ${marker}`);

for (const marker of [
  'const roadSystemSlugs = [',
  '...roadSystemSlugs',
  'roadSystems: orderedArticles(catalog, roadSystemSlugs)',
  '<DepthGrid articles={roadSystems} label="Texas road systems" />',
  '10 core guides · 25 deeper explainers',
  'Twenty-five focused explainers behind the core guides',
]) if (!hub.includes(marker)) errors.push(`Road-system hub contract missing: ${marker}`);

const paragraphCount = (block) => (block.match(/p\("/g) || []).length;
for (const [slug] of profiles) {
  const start = articles.indexOf(`slug: "${slug}"`);
  const next = start >= 0 ? articles.indexOf('\nexport const ', start + 1) : -1;
  const block = start >= 0 ? articles.slice(start, next > start ? next : articles.length) : '';
  if (paragraphCount(block) < 7) errors.push(`Road-system article too shallow (${paragraphCount(block)} paragraphs): ${slug}`);
  if (!block.includes('designationsLink') || !block.includes('collectionLink')) errors.push(`Road-system article must use designation and collection backlinks: ${slug}`);
}

for (const hero of [
  '/images/editorial/texas-rm-roads.svg',
  '/images/editorial/texas-loops-spurs.svg',
  '/images/editorial/texas-business-routes.svg',
  '/images/editorial/texas-park-recreational-roads.svg',
  '/images/editorial/texas-historic-memorial-routes.svg',
]) if (!stubs.includes(hero) || !articles.includes(hero)) errors.push(`Road-system hero contract missing: ${hero}`);

if (errors.length) {
  console.error('Texas Explained road-system validation failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log('Texas Explained road-system batch passed: five current-TxDOT-backed explainers are lazy-loaded, hub-visible, reciprocal with the FM-road pillar, collection-aware and substantive.');
'''
Path("scripts/data/validate-texas-explained-road-systems.mjs").write_text(validator)
print("Road-system integration patches applied successfully.")
