import fs from 'node:fs';

const failures = [];
const read = (path) => fs.readFileSync(path, 'utf8');
const requireAll = (label, text, needles) => {
  for (const needle of needles) if (!text.includes(needle)) failures.push(`${label}: missing ${needle}`);
};

const countyGuide = read('src/components/content/CountyGuideSections.tsx');
const countySeries = read('src/data/county-series.ts');
const eastTexasProfiles = read('src/data/county-series-profiles-east-texas.ts');
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
  'import { TEXAS_COUNTIES } from "@/data/texas-places"',
  'const TEXAS_COUNTY_SLUGS = new Set(TEXAS_COUNTIES.map((county) => county.slug))',
  'const countySlug = articleSlug.slice(0, markerIndex)',
  'return TEXAS_COUNTY_SLUGS.has(countySlug) ? countySlug : null',
]);

requireAll('Jasper full canonical county profile loader', eastTexasProfiles, [
  'countySlug: "jasper"',
  'import("@/data/fixtures/jasper-county-jasper-kirbyville-sam-rayburn-piney-woods-texas")',
  'module.jasperCountyJasperKirbyvilleSamRayburnPineyWoodsTexasArticle',
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

requireAll('Jasper county reciprocal Blue Hole registration', supplementalRegistration, [
  'import { blueHoleJasperCountyStoryArticle }',
  'import { registerSupplementalIntentArticle }',
  'registerSupplementalIntentArticle(blueHoleJasperCountyStoryArticle)',
  'href: `/article/${blueHoleJasperCountyStoryArticle.slug}`',
  '"jasper-county-jasper-kirbyville-sam-rayburn-piney-woods-texas"',
  'articleInternalLinks[slug] = existing.some((link) => link.href === blueHoleLink.href)',
  ': [...existing, blueHoleLink]',
]);

if (failures.length) {
  console.error('County editorial discovery validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('County editorial discovery validator passed: canonical county guides surface curated article links, Jasper loads its full canonical county profile while Blue Hole discovery remains first-class through static destination and reciprocal editorial links, legacy county redirects are limited to real Texas county slugs, and the Blue Hole full article is in the primary registry for listing and direct lookup.');