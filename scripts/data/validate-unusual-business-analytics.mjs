import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const helper = read("src/lib/unusual-business-analytics.ts");
const article = read("src/routes/article.$slug.tsx");
const explore = read("src/routes/explore.$category.lazy.tsx");
const intents = read("src/components/editorial/ExploreIntentPaths.tsx");
const unique = read("src/routes/things-unique-to-texas.lazy.tsx");
const analytics = read("src/platform/analytics.ts");
const report = read("scripts/analytics/report-unusual-business-experiment.mjs");
const workflow = read(".github/workflows/report-unusual-business-experiment.yml");

const errors = [];
const requireAll = (label, source, needles) => {
  for (const needle of needles) if (!source.includes(needle)) errors.push(`${label}: missing ${needle}`);
};

requireAll("unusual business analytics targets", helper, [
  'UNUSUAL_BUSINESS_ANALYTICS_KIND = "unusual-business-experiment"',
  '"/article/unusual-texas-businesses-services": "hub"',
  '"/article/bluebonnet-animal-preservation-athens": "bluebonnet-animal-preservation-athens"',
  '"/article/phenix-knives-bellville": "phenix-knives-bellville"',
  '"/article/horses-on-the-beach-corpus-christi": "horses-on-the-beach-corpus-christi"',
  '"/destination/whirlyball-hurst": "whirlyball-hurst"',
  "unusualBusinessAnalyticsAttributes",
  '"data-entity-id"',
  '"data-entity-kind"',
]);

requireAll("article related-reading instrumentation", article, [
  'import { unusualBusinessAnalyticsAttributes } from "@/lib/unusual-business-analytics";',
  'unusualBusinessAnalyticsAttributes(item.href, `article-related:${article.slug}`)',
]);

requireAll("Explore category instrumentation", explore, [
  'unusualBusinessAnalyticsAttributes("/article/unusual-texas-businesses-services", `explore-${match.slug}:hub`)',
  'unusualBusinessAnalyticsAttributes(unusualBusinessSpotlight.href, `explore-${match.slug}:spotlight`)',
]);

requireAll("Explore landing instrumentation", intents, [
  'unusualBusinessAnalyticsAttributes(item.to, "explore-intent")',
]);

requireAll("Things Unique instrumentation", unique, [
  'unusualBusinessAnalyticsAttributes(to, "things-unique:pillar")',
  'unusualBusinessAnalyticsAttributes(to, "things-unique:related")',
]);

requireAll("shared analytics contract", analytics, [
  "'internal_link_shown'",
  "'internal_link_clicked'",
  "recordInternalLinkExposure(entityId, 'impression')",
  "recordInternalLinkExposure(entityId, 'click')",
  "a[data-entity-id], a[data-commercial-partner]",
]);

requireAll("aggregate experiment report", report, [
  'const DATASET = "texas_defined_outcomes"',
  "blob1 IN ('internal_link_shown', 'internal_link_clicked')",
  "blob7 = 'unusual-business-experiment'",
  "startsWith(blob2, 'unusual-business:')",
  "CLOUDFLARE_ACCOUNT_ID",
  "CLOUDFLARE_API_TOKEN",
  "Aggregate internal-link impressions and clicks only",
]);

requireAll("protected report workflow", workflow, [
  "workflow_dispatch:",
  "schedule:",
  "environment: texasdefined-publication",
  "CLOUDFLARE_ACCOUNT_ID:",
  "CLOUDFLARE_API_TOKEN:",
  "REPORT_WINDOW_DAYS:",
  "node scripts/analytics/report-unusual-business-experiment.mjs",
]);

if (errors.length) {
  console.error("Unusual-business analytics validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Unusual-business analytics validation passed: the statewide hub and promoted business guides retain placement-aware first-party impression/click attribution through the existing internal-link analytics pipeline.");
