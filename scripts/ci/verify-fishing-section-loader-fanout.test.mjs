import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = readFileSync('src/routes/fishing.lakes.$slug.$section.tsx', 'utf8');
const monitor = readFileSync('scripts/ci/verify-worker-memory-sensitive-production.mjs', 'utf8');
const count = (text) => source.split(text).length - 1;

test('camping/fish/access routes skip unrelated guide, report, business, or placement inventories', () => {
  assert.equal(source.includes('fishingBusinessesQuery'), false, 'section loader should not load unused business inventory');
  assert.equal(count('params.section === "reports" ? context.queryClient.ensureQueryData(fishingReportsQuery'), 1);
  assert.equal(count('params.section === "guides" ? context.queryClient.ensureQueryData(fishingGuidesQuery'), 1);
  assert.equal(count('params.section === "guides" ? context.queryClient.ensureQueryData(fishingPlacementsQuery'), 1);
  const conroe = source.slice(source.indexOf('if (params.slug === LAKE_CONROE_SLUG)'), source.indexOf('const { fishingGuidesQuery, fishingLakeQuery, fishingPlacementsQuery, fishingReportsQuery }'));
  assert.ok(conroe.includes('params.section === "camping"'), 'camping takes light source-backed static SSR path');
  assert.ok(conroe.includes('await getLakeConroeCampingPageData()'), 'camping avoids loading optional live lake-level parser');
  assert.ok(conroe.includes('await getLakeConroePageData()'), 'other sections preserve canonical live-data handler');
  assert.ok(conroe.includes('if (params.section === "reports" || params.section === "guides")'), 'repository import must be optional');
  assert.ok(conroe.includes('fishingLakeQuery(params.slug)'), 'report/guide tabs still require canonical fishing lake');
  assert.ok(conroe.includes('fishingReportsQuery({ lakeId: lake.id, limit: 20 }, lake)'), 'official report hydration remains source-backed');
  assert.ok(conroe.includes('fishingGuidesQuery({ lakeId: lake.id, limit: 50 })'), 'verified guide inventory remains gated');
  assert.ok(!conroe.includes('fishingPlacementsQuery'), 'Conroe editorial sections do not request unrelated placements');
  assert.ok(source.includes('businesses: [], placements, pageData'));
});

test('showcase inventory branch references only declared fishing model types', () => {
  assert.ok(source.includes('import type { FishingGuide, FishingPlacement, FishingReport } from "@/data/fishing/types";'),
    'reports, guides, and placement inventory must all resolve their declared models');
  assert.ok(source.includes('let placements: FishingPlacement[] = []'),
    'optional inventory uses the explicit placement type');
});

test('nested fishing routes skip heavyweight parent overview loaders and pass through children', () => {
  const hub = readFileSync('src/routes/fishing.tsx','utf8');
  const directory = readFileSync('src/routes/fishing.lakes.tsx','utf8');
  const overview = readFileSync('src/routes/fishing.lakes.$slug.tsx','utf8');
  for (const [name, file, routePath, returnMarker] of [
    ['fishing hub', hub, '"/fishing"', 'return { nested: true as const }'],
    ['lake directory', directory, '"/fishing/lakes"', 'return { nested: true as const }'],
    ['lake overview', overview, 'overviewPath', 'return { kind: "nested" as const }'],
  ]) {
    const index = file.indexOf(returnMarker);
    const firstQuery = file.indexOf('await import("@/data/fishing/queries")');
    assert.ok(index > 0 && index < firstQuery, name + ': child pass-through must precede repository import');
    assert.ok(file.includes('location.pathname !== ' + routePath), name + ': explicit own-path comparison missing');
    assert.ok(file.includes('<Outlet />'), name + ': must render matching child section instead of redundant overview');
  }
  assert.ok(hub.includes('if (loaderData && "nested" in loaderData) return { meta: [] }'));
  assert.ok(directory.includes('if (loaderData && "nested" in loaderData) return { meta: [] }'));
  assert.ok(overview.includes('if (loaderData.kind === "nested") return { meta: [] }'));
  assert.ok(overview.includes('const overviewPath = canonicalFishingPath("lake", params.slug)'));
  assert.ok(hub.includes('<FishingHub lakes={lakes} species={species} lakeSpecies={lakeSpecies} resourceAvailability={resourceAvailability} />'));
  assert.ok(directory.includes('<FishingLakesDirectory rows={rows} latestReview={latestReview} />'));
  assert.ok(overview.includes('<ShowcaseLakeGuide reports={data.reports} guides={data.guides} businesses={data.businesses} placements={data.placements} pageData={data.pageData} />'));
});

test('showcase non-inventory tabs avoid the expensive statewide fishing repository on cold SSR', () => {
  const start = source.indexOf('if (!isShowcaseLakeSlug(params.slug) || !isShowcaseLakeSection(params.section))');
  const gate = source.indexOf('if (params.section === "reports" || params.section === "guides")', start);
  const repoImport = source.indexOf('const { fishingGuidesQuery, fishingLakeQuery, fishingPlacementsQuery, fishingReportsQuery }', gate);
  assert.ok(start > 0 && gate > start && repoImport > gate, 'showcase section allowlist and source data must come before optional repository import');
  const preGate = source.slice(start, gate);
  assert.ok(preGate.includes('getShowcaseLakePageData({ data: { slug: params.slug } })'), "named lake\'s source-reviewed section must be loaded");
  for (const forbidden of ['fishingLakeQuery(params.slug)', 'fishingPlacementsQuery(', 'fishingReportsQuery(', 'fishingGuidesQuery(']) {
    assert.ok(!preGate.includes(forbidden), 'editorial sections cannot eagerly load ' + forbidden);
  }
  assert.ok(source.includes('return { kind: "showcase" as const, reports, guides, businesses: [], placements, pageData'), 'showcase section SSR return must preserve authoritative editorial content');
});

test('the exact HTTP 500 route is monitored on both uncached Worker origins', () => {
  assert.ok(monitor.includes("'/fishing/lakes/lake-conroe/camping'"));
  assert.ok(monitor.includes('for (const origin of origins)'));
  assert.ok(monitor.includes('for (const path of routes)'));
});

test('Lake Conroe camping cold SSR avoids the optional live-water fetch without dropping its official USFS citations', () => {
  const sources = readFileSync('src/data/fishing/lake-conroe-page-data.functions.ts', 'utf8');
  const route = readFileSync('src/routes/fishing.lakes.$slug.$section.tsx', 'utf8');
  const guide = readFileSync('src/components/fishing/LakeConroeGuide.tsx', 'utf8');
  assert.ok(sources.includes('const { loadLiveLakeLevelResilient } = await import("./live-lake-level-fetch.server")'));
  assert.ok(sources.includes('export const getLakeConroeCampingPageData'));
  assert.ok(sources.includes('...loadLakeConroePageDataServer()'));
  assert.ok(sources.includes('liveLakeLevel: null'));
  assert.ok(route.includes('data.section !== "camping" && <LiveLakeLevelStrip'));
  assert.ok(guide.includes('pageData.camping.map'), 'published camping facilities remain in visitor HTML');
  assert.ok(guide.includes('pageData.sectionResearch.sourceUrls.map'), 'official sources remain in page HTML');
});

test('dedicated Lake Conroe camping has a tiny metadata route and independently sourced lazy content', () => {
  const dedicated = readFileSync('src/routes/fishing_.lakes.lake-conroe.camping.tsx','utf8');
  const lazy = readFileSync('src/routes/fishing_.lakes.lake-conroe.camping.lazy.tsx','utf8');
  const publication = readFileSync('src/data/fishing/lake-conroe-camping-publication.ts','utf8');
  const research = readFileSync('src/data/fishing/lake-conroe-source-research.ts','utf8');
  const verifier = readFileSync('scripts/ci/verify-fishing-live-publication-parity.mjs','utf8');
  const tree = readFileSync('src/routeTree.gen.ts','utf8');
  assert.ok(tree.includes("from './routes/fishing_.lakes.lake-conroe.camping'"),'detached route registered');
  assert.ok(tree.includes("import('./routes/fishing_.lakes.lake-conroe.camping.lazy')"),'lazy content must not enter main bundle');
  const treeEntry = tree.slice(tree.indexOf('const FishingLakesLakeConroeCampingRoute ='),tree.indexOf('const FishingLakesSlugSectionRoute'));
  assert.ok(treeEntry.includes('getParentRoute: () => rootRouteImport'),'camping must not run heavy /fishing or /fishing/lakes parent loaders');
  assert.ok(!treeEntry.includes('getParentRoute: () => FishingLakesRoute'),'camping route must be root-detached');

  assert.ok(dedicated.includes('createFileRoute("/fishing/lakes/lake-conroe/camping")'));
  assert.ok(lazy.includes('createLazyFileRoute("/fishing/lakes/lake-conroe/camping")'));
  assert.ok(lazy.includes('data-conroe-camping-isolated="true"'));
  assert.ok(lazy.includes('LAKE_CONROE_RESEARCH'));
  assert.ok(lazy.includes('sourceResearch.camping.map'));
  assert.ok(lazy.includes('sourceResearch.sourceUrls.map'));
  assert.ok(lazy.includes('dateModified: reviewedAt'));
  const head = readFileSync('src/data/fishing/lake-conroe-camping-head.ts', 'utf8');
  assert.ok(dedicated.includes('loader: async () =>'), 'SEO head is resolved through the isolated lazy loader');
  assert.ok(dedicated.includes('head: ({ loaderData })'), 'TanStack router emits the resolved SEO head on the server');
  assert.ok(head.includes('buildMeta(texasDefinedBrand') && head.includes('canonicalLink(texasDefinedBrand, canonicalPath)'), 'full branded robots, social metadata and canonical retained in lazy head');
  assert.ok(lazy.includes('"@type": "WebPage"') && lazy.includes('"@type": "BreadcrumbList"'));
  assert.ok(lazy.includes('type="application/ld+json"'),'full JSON-LD stays in server-rendered body while SEO head remains compact');
  assert.ok(verifier.includes('data-conroe-camping-isolated="true"'));
  const imports = [dedicated,lazy].join("\n").split("\n").filter(line => line.trimStart().startsWith("import ")).join("\n");
  for (const forbidden of ['ShowcaseLakeGuide','LakeConroeGuide','fishingLakeQuery','getLakeConroePageData','live-lake-level-fetch.server','lake-authority-research-wave1']) {
    assert.ok(!imports.includes(forbidden), 'camping route cannot import '+forbidden);
  }
  for (const proof of ['Cagle Recreation Area','Stubblefield Lake',"Scott's Ridge",'www.recreation.gov/camping/campgrounds/234004']) {
    assert.ok(research.includes(proof), 'published operator source retained: '+proof);
  }
  const actualReviewedAt = research.match(/"reviewedAt": "(\d{4}-\d{2}-\d{2})"/)?.[1];
  assert.ok(actualReviewedAt,'canonical research date present');
  assert.ok(publication.includes('LAKE_CONROE_CAMPING_REVIEWED_AT = "'+actualReviewedAt+'"'),'metadata date must match real research review');
  for(const link of ['https://www.recreation.gov/camping/campgrounds/234004','https://www.recreation.gov/camping/campgrounds/10158882','https://tpwd.texas.gov/fishboat/fish/recreational/lakes/conroe/access.phtml']) {
    assert.ok(publication.includes(link) && research.includes(link), 'publication source must match researched operator URL: '+link);
  }
});


test('Stamford and Falcon editorial SSR do not await the optional live-level network request', () => {
  const functions = readFileSync('src/data/fishing/showcase-lakes-page-data.functions.ts', 'utf8');
  const strip = readFileSync('src/components/fishing/LiveLakeLevelStrip.tsx', 'utf8');
  assert.ok(functions.includes('data.slug === "lake-stamford" || data.slug === "falcon-international-reservoir"'));
  assert.ok(functions.includes('? null : await loadPageLiveLakeLevel(lake.sources.liveLevel.url)'));
  assert.ok(strip.includes('getLiveLakeLevel({ data: { sourceUrl } })'), 'keep current readings after hydration');
  assert.ok(strip.includes('href={sourceUrl}'), 'official source remains visible even when live data fails');
});
