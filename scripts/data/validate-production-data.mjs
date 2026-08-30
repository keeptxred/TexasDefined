import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const readRouteSurface = (file) => {
  const eagerSource = read(file);
  const lazyFile = file.replace(/\.tsx$/, '.lazy.tsx');
  return fs.existsSync(path.join(root, lazyFile)) ? `${eagerSource}\n${read(lazyFile)}` : eagerSource;
};
const requiredFiles = [
  'src/routes/learn.property-taxes.tsx','src/routes/learn.property-tax-payments.tsx','src/routes/decide.property-taxes.tsx','src/routes/learn.appraisal-districts.tsx','src/routes/do.homestead-exemption.tsx','src/routes/do.property-tax-protest.tsx','src/routes/browse.counties.tsx','src/routes/browse.cities.tsx','src/routes/article.$slug.tsx',
  'src/routes/admin.platform-health.tsx','src/routes/sitemap[.]xml.ts','src/routes/sitemap-explore[.]xml.ts','src/routes/events.tsx','src/routes/destination.$slug.tsx','src/routes/api.knowledge-graph.ts','src/routes/api.ai.entities.ts','src/routes/llms[.]txt.ts','src/routes/$kind.$slug.tsx','src/routes/privacy.tsx',
  'src/data/texas-data-sources.ts','src/data/texas-entity-registry.ts','src/data/knowledge-graph/types.ts','src/data/knowledge-graph/seed.ts','src/data/knowledge-graph/index.ts','src/data/knowledge-graph/explore-adapter.ts','src/data/knowledge-graph/relationships.ts','src/data/knowledge-graph/audit.ts',
  'src/components/content/AutoEntityLinks.tsx','src/components/editorial/ArticleBody.tsx','src/components/layout/Footer.tsx','src/platform/internal-linking.ts','src/platform/analytics.ts','src/lib/public-routes.ts','scripts/data/import-authoritative-entities.mjs','.github/workflows/import-entities.yml',
];
for (const file of requiredFiles) if (!fs.existsSync(path.join(root, file))) errors.push(`Required platform file is missing: ${file}`);

const places = read('src/data/texas-places.ts');
const sources = read('src/data/source-governance.ts');
const dataSources = read('src/data/texas-data-sources.ts');
const entityRegistry = read('src/data/texas-entity-registry.ts');
const graphTypes = read('src/data/knowledge-graph/types.ts');
const graphQueries = read('src/data/knowledge-graph/index.ts');
const graphAdapter = read('src/data/knowledge-graph/explore-adapter.ts');
const relationships = read('src/data/knowledge-graph/relationships.ts');
const audit = read('src/data/knowledge-graph/audit.ts');
const entityRoute = readRouteSurface('src/routes/$kind.$slug.tsx');
const articleRoute = read('src/routes/article.$slug.tsx');
const destinationRoute = read('src/routes/destination.$slug.tsx');
const eventsRoute = `${read('src/routes/events.tsx')}\n${read('src/data/major-event-directory.server.ts')}`;
const aboutRoute = read('src/routes/about.tsx');
const privacyRoute = read('src/routes/privacy.tsx');
const footer = read('src/components/layout/Footer.tsx');
const homeRoute = read('src/routes/index.tsx');
const exploreSitemap = read('src/routes/sitemap-explore[.]xml.ts');
const publicRoutes = read('src/lib/public-routes.ts');
const articleBody = read('src/components/editorial/ArticleBody.tsx');
const aiApi = read('src/routes/api.ai.entities.ts');
const graphApi = read('src/routes/api.knowledge-graph.ts');
const linker = read('src/components/content/AutoEntityLinks.tsx');
const internalLinking = read('src/platform/internal-linking.ts');
const importer = read('scripts/data/import-authoritative-entities.mjs');
const packageJson = read('package.json');
const rootRoute = read('src/routes/__root.tsx');
const sitemap = read('src/routes/sitemap[.]xml.ts');

const countyLiteral = places.match(/const COUNTY_NAMES = `([^`]+)`\.split/s)?.[1] ?? '';
const countyCount = countyLiteral ? countyLiteral.split('|').length : 0;
if (countyCount !== 254) errors.push(`Expected 254 Texas counties; found ${countyCount}.`);
if ([...places.matchAll(/\['[^']+','[^']+','[^']+'\]/g)].length < 50) errors.push('Seeded city directory is unexpectedly small.');
if (!sources.includes("id: 'property-tax-payments'")) errors.push('Payments guide is missing from content governance.');
for (const sourceId of ['census-places','census-counties','texasdefined-regions','explore-shared-catalog','usgs-water','tpwd-parks','nps-texas','usfs-texas','official-destination-sites','official-event-sites']) if (!dataSources.includes(`id:'${sourceId}'`)) errors.push(`Knowledge graph source missing: ${sourceId}.`);
for (const field of ['aliases: string[]','coordinates?: GeoPoint','sourceConfidence: SourceConfidence','relationships: EntityRelationship[]']) if (!graphTypes.includes(field)) errors.push(`Knowledge graph field missing: ${field}.`);
for (const api of ['loadTexasKnowledgeGraph','searchCompleteTexasKnowledgeGraph','findCompleteTexasEntity']) if (!graphQueries.includes(api)) errors.push(`Merged graph API missing: ${api}.`);
for (const feature of ['explore_entities',"visibility: 'eq.public'","status: 'in.(published,verified)'"]) if (!graphAdapter.includes(feature)) errors.push(`Explore adapter protection missing: ${feature}.`);
for (const feature of ['rankRelatedEntities','canonicalEntityPath','direct relationship','same county','same region']) if (!relationships.includes(feature)) errors.push(`Relationship engine feature missing: ${feature}.`);
for (const feature of ['auditTexasKnowledgeGraph','missing-official-url','missing-coordinates','missing-relationships','review-overdue','duplicate-alias']) if (!audit.includes(feature)) errors.push(`Graph audit feature missing: ${feature}.`);
for (const feature of ["createFileRoute('/$kind/$slug')",'rankRelatedEntities','application/ld+json','GeoCoordinates','BreadcrumbList',"kind === 'city'", "kind === 'museum'",'href={entity.officialUrl}','www.google.com/maps/search','buildMeta(texasDefinedBrand','canonicalPath']) if (!entityRoute.includes(feature)) errors.push(`Entity page feature missing: ${feature}.`);
for (const feature of ['autoLinkEntityMentions','maxLinks = 8','resolveInternalEntityLinks','match.href']) if (!linker.includes(feature)) errors.push(`Automatic linking feature missing: ${feature}.`);
for (const feature of ['used.has','canonicalEntityPath']) if (!internalLinking.includes(feature)) errors.push(`Internal-link resolver feature missing: ${feature}.`);
for (const feature of ['ArticleBody blocks={article.body} entities={graph}','loadTexasKnowledgeGraph','mentions: mentions.map','absoluteUrl(texasDefinedBrand, article.hero.src)','canonicalEntityPath(entity)']) if (!articleRoute.includes(feature)) errors.push(`Article graph integration missing: ${feature}.`);
for (const feature of ['absoluteUrl(texasDefinedBrand, destination.hero.src)','BreadcrumbList','TouristAttraction']) if (!destinationRoute.includes(feature)) errors.push(`Destination SEO feature missing: ${feature}.`);
for (const feature of ['canonicalPath','ItemList','"@type": "Event"','eventStatus','eventAttendanceMode']) if (!eventsRoute.includes(feature)) errors.push(`Event answer feature missing: ${feature}.`);
for (const feature of ['"@type": "AboutPage"','BreadcrumbList','about: { "@id"','isPartOf: { "@id"']) if (!aboutRoute.includes(feature)) errors.push(`About page SEO feature missing: ${feature}.`);
for (const feature of [
  'const canonicalPath = "/privacy"',
  'canonicalLink(texasDefinedBrand, canonicalPath)',
  'Google AdSense',
  'adssettings.google.com',
  'aboutads.info/choices',
  'third-party vendors, including Google',
  'Google-certified consent management platform',
]) if (!privacyRoute.includes(feature)) errors.push(`AdSense privacy disclosure missing: ${feature}.`);
for (const feature of ['to="/privacy"','Privacy Policy','href="/about#privacy-terms"','Site Terms']) if (!footer.includes(feature)) errors.push(`Footer privacy access missing: ${feature}.`);
for (const feature of ['canonicalPath: "/"']) if (!homeRoute.includes(feature)) errors.push(`Homepage SEO feature missing: ${feature}.`);
const duplicatesGlobalOrganization = homeRoute.includes('"@type": "Organization", "@id": `${siteUrl}/#organization`');
const duplicatesGlobalWebsite = homeRoute.includes('"@type": "WebSite", "@id": `${siteUrl}/#website`');
if (duplicatesGlobalOrganization || duplicatesGlobalWebsite) errors.push('Homepage duplicates the global Organization or WebSite entity graph.');
for (const feature of ['AutoEntityLinks','entities?: TexasEntityRecord[]','linked = new Set']) if (!articleBody.includes(feature)) errors.push(`Article entity-link rendering missing: ${feature}.`);
for (const feature of ["createFileRoute('/api/ai/entities')",'@context','about: toJsonLd','mentions: related','access-control-allow-origin']) if (!aiApi.includes(feature)) errors.push(`AI retrieval feature missing: ${feature}.`);
for (const feature of ["createFileRoute('/api/knowledge-graph')",'Math.min(Math.max(Math.trunc(requestedLimit), 1), 100)','cache-control']) if (!graphApi.includes(feature)) errors.push(`Knowledge graph API feature missing: ${feature}.`);
for (const adapter of ['census','usgs','tpwd','nps','thc','txdot']) if (!importer.includes(`${adapter}: {`)) errors.push(`Official import adapter missing: ${adapter}.`);
if (!importer.includes("process.argv.includes('--write')")) errors.push('Import jobs are not dry-run-first.');
for (const command of ['entities:import','entities:import:write','entities:import:census','entities:import:parks']) if (!packageJson.includes(`\"${command}\"`)) errors.push(`Package command missing: ${command}.`);
if (!rootRoute.includes('installTexasDefinedAnalytics')) errors.push('Privacy-safe analytics is not initialized.');
if (rootRoute.includes('canonicalLink(texasDefinedBrand, "/")')) errors.push('Root route still injects an inherited homepage canonical.');
if (rootRoute.includes('{ property: "og:url", content: siteUrl }')) errors.push('Root route still injects an inherited homepage Open Graph URL.');
for (const feature of ['og:image','twitter:image','defaultSocialImage']) if (!rootRoute.includes(feature)) errors.push(`Default social-preview feature missing: ${feature}.`);
if (!sitemap.includes('loadTexasKnowledgeGraph') || !sitemap.includes('canonicalEntityPath')) errors.push('Knowledge graph entities are missing from sitemap generation.');
for (const feature of ['INDEXABLE_STATIC_PATHS','isIndexablePublicPath']) if (!sitemap.includes(feature)) errors.push(`Central sitemap registry integration missing: ${feature}.`);
for (const feature of ['INDEXABLE_STATIC_PATHS','NON_INDEXABLE_PUBLIC_PATHS','isIndexablePublicPath']) if (!publicRoutes.includes(feature)) errors.push(`Public-route registry feature missing: ${feature}.`);
if (exploreSitemap.includes('`${BASE_URL}/explore/search`')) errors.push('Noindex Explore search is still submitted in the Explore sitemap.');
for (const feature of [
  'const usePreservedFallback = (enrichedFailed && coreFailed) || remoteDestinations.length === 0',
  'const rawDestinations = usePreservedFallback ? preservedExploreDestinations : remoteDestinations',
  'isPrimaryTripPlannerDestination(destination)',
  'auditDestination(destination).readyForIndexing',
]) if (!exploreSitemap.includes(feature)) errors.push(`Explore sitemap resilient quality protection missing: ${feature}.`);
if (!entityRegistry.includes('TEXAS_ENTITY_REGISTRY') || !entityRegistry.includes('sourceConfidence')) errors.push('Production entity registry is incomplete.');

const routeDirectory = path.join(root, 'src/routes');
for (const name of fs.readdirSync(routeDirectory)) {
  if (!name.endsWith('.tsx') || name.startsWith('admin.') || name === '__root.tsx') continue;
  const source = fs.readFileSync(path.join(routeDirectory, name), 'utf8');
  if (source.includes('canonicalLink(') && source.includes('buildMeta(') && !source.includes('canonicalPath')) {
    errors.push(`Route metadata has a canonical link but no canonicalPath for og:url: src/routes/${name}`);
  }
}

if (errors.length) {
  console.error('TexasDefined production-data validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`TexasDefined platform validation passed: ${countyCount} counties and phases 1.1–1.6 protected.`);
