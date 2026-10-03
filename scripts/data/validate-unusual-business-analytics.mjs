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
const authorityData = read("src/data/unusual-business-authority.ts");
const authorityPanel = read("src/components/authority/UnusualBusinessAuthorityPanel.tsx");
const citationPanel = read("src/components/authority/CitationTrustPanel.tsx");
const articleBody = read("src/components/editorial/ArticleBody.tsx");
const destinationAuthority = read("src/components/editorial/DestinationAuthorityGuide.tsx");
const whirlyball = read("src/data/whirlyball-hurst-destination.ts");

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
  '"/article/mum-queen-spring-texas-homecoming-mums": "mum-queen-spring-texas-homecoming-mums"',
  '"/destination/whirlyball-hurst": "whirlyball-hurst"',
  "unusualBusinessAnalyticsAttributes",
  "unusualBusinessPageResource",
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
  "'resource_opened'",
  "'internal_link_shown'",
  "'internal_link_clicked'",
  "recordInternalLinkExposure(entityId, 'impression')",
  "recordInternalLinkExposure(entityId, 'click')",
  "a[data-entity-id], a[data-commercial-partner]",
  "recordUnusualBusinessPageView",
  "unusualBusinessPageResource(pathname)",
  "entityKind: UNUSUAL_BUSINESS_ANALYTICS_KIND",
]);

requireAll("aggregate experiment report", report, [
  'const DATASET = "texas_defined_outcomes"',
  "blob1 IN ('resource_opened', 'internal_link_shown', 'internal_link_clicked')",
  "blob7 = 'unusual-business-experiment'",
  "startsWith(blob2, 'unusual-business:')",
  "CLOUDFLARE_ACCOUNT_ID",
  "CLOUDFLARE_API_TOKEN",
  "Aggregate experiment page views plus internal-link impressions and clicks only",
]);

requireAll("protected report workflow", workflow, [
  "workflow_dispatch:",
  "schedule:",
  "authorize:",
  "environment: texasdefined-publication",
  "report:",
  "needs: authorize",
  "CLOUDFLARE_ACCOUNT_ID:",
  "CLOUDFLARE_API_TOKEN:",
  "REPORT_WINDOW_DAYS:",
  "node scripts/analytics/report-unusual-business-experiment.mjs",
]);

const reportJob = workflow.split("\n  report:")[1] ?? "";
if (reportJob.includes("environment: texasdefined-publication")) {
  errors.push("protected report workflow: analytics query job must use repository Cloudflare credentials after the environment authorization gate");
}

const authoritySlugs = [
  "unusual-texas-businesses-services",
  "bluebonnet-animal-preservation-athens",
  "phenix-knives-bellville",
  "horses-on-the-beach-corpus-christi",
  "mum-queen-spring-texas-homecoming-mums",
  "whirlyball-hurst",
];
for (const slug of authoritySlugs) {
  if (!authorityData.includes(`"${slug}": {`)) errors.push(`authority profiles: missing ${slug}`);
}

requireAll("authority profile contract", authorityData, [
  'title: string;',
  'canonicalPath: string;',
  'quickFacts: readonly UnusualBusinessQuickFact[];',
  'sources: readonly UnusualBusinessAuthoritySource[];',
  'methodology: string;',
  'lastVerified: string;',
  'freshness: string;',
  'const VERIFIED = "October 3, 2026";',
  'Bellville Chamber of Commerce — Phenix Knives',
  'Visit Corpus Christi — beach activities',
  'Library of Congress — Carol M. Highsmith archive',
  'Houston Chronicle — The Mum Queen',
  'HEB Chamber of Commerce — WhirlyBall/LaserWhirld',
]);

requireAll("visible authority panel", authorityPanel, [
  'Quick reference',
  'At a glance',
  'Freshness:',
  'recommendedCitation',
  'stableUrl',
  'reviewedBy="Texas Defined Editorial Desk"',
  '<CitationTrustPanel',
]);

requireAll("shared citation panel", citationPanel, [
  'Sources and verification',
  'Methodology',
  'Last verified',
  'Reviewed by',
  'Stable URL',
  'Recommended citation',
]);

requireAll("article authority rendering", articleBody, [
  'import { UnusualBusinessAuthorityPanel } from "@/components/authority/UnusualBusinessAuthorityPanel";',
  'const articleSlug = pathname.startsWith("/article/")',
  '<UnusualBusinessAuthorityPanel slug={articleSlug} />',
]);

requireAll("destination authority rendering", destinationAuthority, [
  'import { UnusualBusinessAuthorityPanel } from "@/components/authority/UnusualBusinessAuthorityPanel";',
  '<UnusualBusinessAuthorityPanel slug={destination.slug} />',
]);

requireAll("WhirlyBall authority source contract", whirlyball, [
  'sourceCheckedAt: SOURCE_CHECKED_AT',
  'authorityGuide:',
  'WhirlyBall Texas — locations',
  'WhirlyBall Texas — how WhirlyBall works',
  'WhirlyBall Texas — LaserWhirld',
]);

if (errors.length) {
  console.error("Unusual-business authority/analytics validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Unusual-business authority/analytics validation passed: promoted pages retain placement-aware first-party measurement plus visible quick facts, sources, methodology, last-verified date, stable URL, editorial reviewer and recommended citation.");
