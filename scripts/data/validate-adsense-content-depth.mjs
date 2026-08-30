import fs from 'node:fs';

const read = (file) => fs.readFileSync(file, 'utf8');
const errors = [];

const lazyMigrated = read('src/data/fixtures/lazy-migrated-editorial.ts');
const financeDepth3 = read('src/data/fixtures/finance-evergreen-depth-3.ts');
const helocDepth = read('src/data/fixtures/finance-heloc-depth.ts');
const fixtureRepositories = read('src/data/fixtures/repositories.ts');
const queries = read('src/data/queries.ts');

const depth3Slugs = [
  'renting-vs-buying-in-texas',
  'true-cost-of-owning-a-home-in-texas',
  'texas-home-equity-heloc-guide',
  'texas-mortgage-payment-guide',
];

const depth3Set = lazyMigrated.match(/const financeDepth3SlugSet = new Set\(\[([\s\S]*?)\n\]\);/)?.[1] ?? '';
if (!depth3Set) errors.push('Could not parse financeDepth3SlugSet.');

for (const slug of depth3Slugs) {
  if (!depth3Set.includes(`"${slug}"`)) errors.push(`Finance depth-3 override slug missing from financeDepth3SlugSet: ${slug}`);
  if (!financeDepth3.includes(`slug: "${slug}"`)) errors.push(`Finance depth-3 article body missing: ${slug}`);

  const stubMatch = lazyMigrated.match(new RegExp(`slug: "${slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]{0,900}?readingMinutes: (\\d+)`));
  const readingMinutes = stubMatch ? Number(stubMatch[1]) : 0;
  if (readingMinutes < 10) errors.push(`Finance catalog stub must advertise at least 10 minutes after enrichment: ${slug} (${readingMinutes || 'missing'}).`);
}

for (const feature of [
  'const financeDepth3SlugSet = new Set([',
  'await import("./finance-evergreen-depth-3")',
  'financeEvergreenDepth3Articles.find((article) => article.slug === slug)',
]) if (!lazyMigrated.includes(feature)) errors.push(`Finance depth-3 lazy wiring missing: ${feature}`);

for (const marker of [
  'Do not make the result depend on appreciation',
  'Utilities belong in affordability',
  'Build reserves in layers',
  'Homeowners insurance can also sit inside escrow',
  'HOA dues and special districts may sit outside the statement',
]) if (!financeDepth3.includes(marker)) errors.push(`Finance depth-3 substantive marker missing: ${marker}`);

for (const marker of [
  'export const texasHelocRulesArticle',
  'Texas HELOC and Home Equity Loan Rules',
  "Texas's 80% rule is a combined-lien ceiling",
  'Worked example of the Texas 80% home-equity calculation',
  'HELOC draw-period payments can understate later repayment',
  'https://statutes.capitol.texas.gov/Docs/CN/htm/CN.16.htm#50',
  'https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-home-equity-loan-and-a-home-equity-line-of-credit-heloc-en-247/',
]) if (!helocDepth.includes(marker)) errors.push(`HELOC depth authority marker missing: ${marker}`);

for (const feature of [
  'const HELOC_RANKING_DEPTH_SLUG = "texas-home-equity-heloc-guide"',
  'if (slug === HELOC_RANKING_DEPTH_SLUG)',
  'await import("./finance-heloc-depth")',
  'return texasHelocRulesArticle;',
]) if (!lazyMigrated.includes(feature)) errors.push(`HELOC ranking-depth lazy wiring missing: ${feature}`);

const helocOverrideIndex = lazyMigrated.indexOf('if (slug === HELOC_RANKING_DEPTH_SLUG)');
const depth3OverrideIndex = lazyMigrated.indexOf('if (financeDepth3SlugSet.has(slug))');
if (helocOverrideIndex < 0 || depth3OverrideIndex < 0 || helocOverrideIndex > depth3OverrideIndex) {
  errors.push('HELOC ranking-depth override must run before the generic financeDepth3SlugSet fallback.');
}

for (const feature of [
  'const migratedArticle = await loadMigratedEditorialArticle(scope.brandId, slug);',
  'if (migratedArticle) return normalizeArticle(migratedArticle);',
]) if (!fixtureRepositories.includes(feature)) errors.push(`Article repository migrated-detail precedence missing: ${feature}`);

const migratedIndex = fixtureRepositories.indexOf('const migratedArticle = await loadMigratedEditorialArticle(scope.brandId, slug);');
const genericFallbackIndex = fixtureRepositories.indexOf('const article = byBrand(await loadEditorialArticles(), scope.brandId).find((a) => a.slug === slug) ?? null;');
if (migratedIndex < 0 || genericFallbackIndex < 0 || migratedIndex > genericFallbackIndex) {
  errors.push('Detailed migrated articles must resolve before the lightweight catalog-stub fallback.');
}

const localLoadMarker = 'const localArticle = await platform.articles.getBySlug(scope, slug);';
const localSourceFastPathMarker = 'if (localArticle.sourceName && localArticle.sourceUrl) return prepareArticleForDelivery(localArticle);';
const remoteSourceLoadMarker = 'const remoteSourceArticle = await fetchPublishedTexasDefinedEvergreenArticle(slug);';
const sourceHydrationMarker = 'sourceName: localArticle.sourceName ?? remoteSourceArticle.sourceName,';
const sourceUrlHydrationMarker = 'sourceUrl: localArticle.sourceUrl ?? remoteSourceArticle.sourceUrl,';
const authorityImportMarker = 'await import("./remote-evergreen-authority-sources")';
const authorityLookupMarker = 'remoteEvergreenAuthoritySources[article.slug] ?? []';
const authorityNameFallbackMarker = 'sourceName: article.sourceName ?? primarySource.label,';
const authorityUrlFallbackMarker = 'sourceUrl: article.sourceUrl ?? primarySource.url,';
const authoritySectionMarker = 'block.text.trim().toLowerCase() === "sources and further reading"';
const authoritySectionAppendMarker = '{ type: "heading", text: "Sources and further reading" }';
const hydratedReturnMarker = 'return prepareArticleDetail(sourceHydratedLocalArticle);';
const remoteFallbackLoadMarker = 'const remoteArticle = await fetchPublishedTexasDefinedEvergreenArticle(slug);';
const remoteFallbackReturnMarker = 'return remoteArticle ? prepareArticleDetail(remoteArticle) : null;';
for (const feature of [
  localLoadMarker,
  localSourceFastPathMarker,
  remoteSourceLoadMarker,
  sourceHydrationMarker,
  sourceUrlHydrationMarker,
  authorityImportMarker,
  authorityLookupMarker,
  authorityNameFallbackMarker,
  authorityUrlFallbackMarker,
  authoritySectionMarker,
  authoritySectionAppendMarker,
  hydratedReturnMarker,
  remoteFallbackLoadMarker,
  remoteFallbackReturnMarker,
]) if (!queries.includes(feature)) errors.push(`Article query local-depth/source precedence missing: ${feature}`);

const localIndex = queries.indexOf(localLoadMarker);
const localSourceFastPathIndex = queries.indexOf(localSourceFastPathMarker);
const remoteSourceLoadIndex = queries.indexOf(remoteSourceLoadMarker);
const hydratedReturnIndex = queries.indexOf(hydratedReturnMarker);
const remoteFallbackIndex = queries.indexOf(remoteFallbackLoadMarker);
const remoteFallbackReturnIndex = queries.indexOf(remoteFallbackReturnMarker);
if (
  localIndex < 0
  || localSourceFastPathIndex < 0
  || remoteSourceLoadIndex < 0
  || hydratedReturnIndex < 0
  || remoteFallbackIndex < 0
  || remoteFallbackReturnIndex < 0
  || localIndex > localSourceFastPathIndex
  || localSourceFastPathIndex > remoteSourceLoadIndex
  || remoteSourceLoadIndex > hydratedReturnIndex
  || hydratedReturnIndex > remoteFallbackIndex
  || remoteFallbackIndex > remoteFallbackReturnIndex
) {
  errors.push('Local enriched editorial detail must resolve first, preserve explicit sources, hydrate missing fields from the published remote row, then fall back to the audited evergreen authority registry before returning an unattributed article.');
}

if (errors.length) {
  console.error('AdSense content-depth validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('AdSense content-depth validation passed: four later finance depth overrides, the Texas HELOC authority override, 10+ minute catalog expectations, migrated-detail precedence, local-first detail-loader precedence, DB-first source hydration, audited evergreen authority fallback, and visible source-section recovery are protected.');
