import fs from 'node:fs';

const failures = [];
const read = (path) => fs.readFileSync(path, 'utf8');
const requireAll = (label, text, needles) => {
  for (const needle of needles) if (!text.includes(needle)) failures.push(`${label}: missing ${needle}`);
};

const countyGuide = read('src/components/content/CountyGuideSections.tsx');
const countySeries = read('src/data/county-series.ts');
const countySlugGuard = read('src/data/texas-county-slugs.ts');
const eastTexasProfiles = read('src/data/county-series-profiles-east-texas.ts');
const jasperDiscovery = read('src/data/fixtures/jasper-county-blue-hole-discovery.ts');
const destinationLinks = read('src/data/destination-editorial-links.ts');
const supplementalRegistration = read('src/data/fixtures/supplemental-editorial-registration.ts');
const seasonalIntentRegistry = read('src/data/fixtures/lazy-seasonal-intents.ts');

requireAll('canonical county editorial discovery', countyGuide, [
  "articleInternalLinks[countySeriesArticle.slug]",
  'countySeriesArticle.internalLinks ?? []',
  'mergeEditorialLinks(',
  'countyEditorialLinks.map',
  'Keep exploring {entity.name}',
  'More Texas Defined guides related to ${entity.name}',
]);

requireAll('legacy county redirect scope', countySeries, [
  'import { TEXAS_COUNTY_SLUGS } from "@/data/texas-county-slugs"',
  'const countySlug = articleSlug.slice(0, markerIndex)',
  'return TEXAS_COUNTY_SLUGS.has(countySlug) ? countySlug : null',
]);
requireAll('lightweight county slug guard', countySlugGuard, [
  'export const TEXAS_COUNTY_SLUGS = new Set(COUNTY_NAMES.map(slugify))',
  'Zapata|Zavala',
]);
if (countySeries.includes('@/data/texas-places')) {
  failures.push('legacy county redirect scope: county-series must not pull the full Texas places registry into the eager client graph');
}

requireAll('Jasper inventory-compatible canonical loader', eastTexasProfiles, [
  'countySlug: "jasper"',
  'articleSlug: "jasper-county-jasper-kirbyville-sam-rayburn-piney-woods-texas"',
  'import("@/data/fixtures/jasper-county-blue-hole-discovery")',
  'module.jasperCountyBlueHoleDiscoveryArticle',
]);

requireAll('Jasper deterministic Blue Hole wrapper', jasperDiscovery, [
  'jasperCountyJasperKirbyvilleSamRayburnPineyWoodsTexasArticle as baseArticle',
  'href: "/article/blue-hole-jasper-county-east-texas"',
  'Jasper County\'s Blue Hole quarry lake',
  'export const jasperCountyBlueHoleDiscoveryArticle = {',
  '...baseArticle,',
  'internalLinks: baseArticle.internalLinks?.some((link) => link.href === blueHoleLink.href)',
  ': [...(baseArticle.internalLinks ?? []), blueHoleLink]',
]);

requireAll('Jasper destination Blue Hole discovery', destinationLinks, [
  '"jasper": [',
  'href: "/article/blue-hole-jasper-county-east-texas"',
  'Read the history of Jasper County\'s Blue Hole',
]);

requireAll('Blue Hole primary article registry', seasonalIntentRegistry, [
  'import { blueHoleJasperCountyStoryArticle } from "./blue-hole-jasper-county-story"',
  'blueHoleJasperCountyStoryArticle,',
  'const slugs = new Set(seasonalIntentStubs.map((article) => article.slug))',
  'const localFullArticle = seasonalIntentStubs.find((item) => item.slug === slug && item.body.length > 0)',
  'if (localFullArticle) return localFullArticle',
]);

requireAll('supplemental editorial lookup registry', seasonalIntentRegistry, [
  'const supplementalIntentArticles = new Map<string, Article>()',
  'export function registerSupplementalIntentArticle(article: Article)',
  'slugs.add(article.slug)',
  'supplementalIntentArticles.set(article.slug, article)',
  'const supplementalArticle = supplementalIntentArticles.get(slug)',
  'if (supplementalArticle) return supplementalArticle',
]);

requireAll('supplemental Blue Hole registration', supplementalRegistration, [
  'import { blueHoleJasperCountyStoryArticle }',
  'import { registerSupplementalIntentArticle }',
  'registerSupplementalIntentArticle(blueHoleJasperCountyStoryArticle)',
  'href: `/article/${blueHoleJasperCountyStoryArticle.slug}`',
  '"texas-lakes-reservoirs-explained"',
  '"texas-rivers-explained"',
  'articleInternalLinks[slug] = existing.some((link) => link.href === blueHoleLink.href)',
  ': [...existing, blueHoleLink]',
]);
if (supplementalRegistration.includes('"jasper-county-jasper-kirbyville-sam-rayburn-piney-woods-texas"')) {
  failures.push('Jasper county discovery must be owned by the canonical Jasper wrapper, not supplemental import-order mutation');
}

if (failures.length) {
  console.error('County editorial discovery validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('County editorial discovery validator passed: canonical county guides surface curated article links, Jasper keeps the standard inventory-compatible loader contract while a dedicated wrapper deterministically adds Blue Hole discovery, the destination and statewide water guides retain their reciprocal links, legacy county redirects are limited to real Texas county slugs without importing the full places registry, and the Blue Hole full article is in the primary registry for both listing and direct lookup.');
