import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const fail = (message) => {
  console.error(`Gateway index-readiness validation failed: ${message}`);
  process.exitCode = 1;
};

const readinessPath = "src/data/fixtures/texas-gateway-index-readiness.ts";
const stubsPath = "src/data/fixtures/texas-gateway-index-ready-stubs.ts";
const loaderPath = "src/data/fixtures/lazy-texas-gateway.ts";
const corePath = "src/data/fixtures/lazy-texas-core-articles.ts";
const articleRoutePath = "src/routes/article.$slug.tsx";
const sitemapPath = "src/routes/sitemap[.]xml.ts";
const editorialReviewPath = "scripts/data/texas-gateway-editorial-review.json";
const editorialPromotionsPath = "scripts/data/texas-gateway-editorial-promotions.json";

const readiness = read(readinessPath);
const stubs = read(stubsPath);
const loader = read(loaderPath);
const core = read(corePath);
const articleRoute = read(articleRoutePath);
const sitemap = read(sitemapPath);

if (!readiness.includes("TEXAS_GATEWAY_INDEX_READY_SLUGS")) fail("missing explicit index-ready allowlist");
if (!readiness.includes('article.id.startsWith("gateway-")')) fail("gateway identity must remain explicit and scoped to gateway-* article IDs");
if (!readiness.includes("shouldNoindexTexasGatewayArticle")) fail("missing staged-page noindex helper");
if (!readiness.includes("if (!isTexasGatewayIndexReadyArticle(article)) return false")) fail("strict readiness must preserve the explicit gateway allowlist as its first boundary");

if (!loader.includes("function loadAllTexasGatewayArticles()")) fail("direct QA loader must retain access to the full gateway set");
if (!/loadTexasGatewayArticle[\s\S]*loadAllTexasGatewayArticles\(\)/.test(loader)) fail("direct gateway lookup must resolve from the full staged+ready set");
if (!loader.includes("return articles.filter(isTexasGatewayIndexReadyArticle);")) fail("gateway loader must retain the index-ready filtering helper for guarded consumers");

if (!articleRoute.includes('shouldNoindexTexasGatewayArticle(article) ? "noindex, follow, max-image-preview:large" : undefined')) {
  fail("article metadata must noindex staged gateway drafts while preserving followed links");
}
if (!sitemap.includes("isArticleIndexReady(article)")) fail("sitemap must defensively apply strict readiness, which includes staged gateway quarantine");

const gatewayFixtureDir = path.join(root, "src/data/fixtures");
const nonArticleGatewayFiles = new Set([
  "texas-gateway-index-readiness.ts",
  "texas-gateway-index-ready-stubs.ts",
]);
const gatewayFiles = fs.readdirSync(gatewayFixtureDir)
  .filter((name) => /^texas-gateway-.*\.ts$/.test(name) && !nonArticleGatewayFiles.has(name));
const gatewaySource = gatewayFiles.map((name) => read(`src/data/fixtures/${name}`)).join("\n");
const ids = [...gatewaySource.matchAll(/(?:id:\s*|(?:make|trip|article)\(\s*)["'](gateway-[^"']+)["']/g)].map((match) => match[1]);
if (!ids.length) fail("could not identify gateway-* article IDs in gateway fixtures");

const allowlistBody = readiness.match(/TEXAS_GATEWAY_INDEX_READY_SLUGS\s*=\s*new Set<string>\(\[([\s\S]*?)\]\)/)?.[1] ?? "";
const readySlugs = [...allowlistBody.matchAll(/["']([^"']+)["']/g)].map((match) => match[1]);
const readySet = new Set(readySlugs);
const fixtureSlugs = new Set([
  ...gatewaySource.matchAll(/slug:\s*["']([^"']+)["']/g),
  ...gatewaySource.matchAll(/(?:make|trip|article)\(\s*["'][^"']+["']\s*,\s*["']([^"']+)["']/g),
].map((match) => match[1]));
for (const slug of readySlugs) {
  if (!fixtureSlugs.has(slug)) fail(`index-ready allowlist contains unknown gateway slug: ${slug}`);
}

let editorialReview;
try {
  editorialReview = JSON.parse(read(editorialReviewPath));
} catch (error) {
  fail(`editorial review manifest is missing or invalid JSON: ${error instanceof Error ? error.message : String(error)}`);
  editorialReview = { entries: [], summary: {}, reasonDefinitions: {} };
}
const reviewEntries = Array.isArray(editorialReview.entries) ? editorialReview.entries : [];
const reviewReasons = editorialReview.reasonDefinitions && typeof editorialReview.reasonDefinitions === "object"
  ? editorialReview.reasonDefinitions
  : {};
const allowedReviewStatuses = new Set(["needs-expansion", "remain-staged", "index-ready"]);
const reviewBySlug = new Map();
for (const entry of reviewEntries) {
  if (!entry || typeof entry.slug !== "string" || !entry.slug) {
    fail("editorial review contains an entry without a slug");
    continue;
  }
  if (reviewBySlug.has(entry.slug)) fail(`editorial review contains duplicate slug: ${entry.slug}`);
  reviewBySlug.set(entry.slug, entry);
  if (!fixtureSlugs.has(entry.slug)) fail(`editorial review contains unknown gateway slug: ${entry.slug}`);
  if (!allowedReviewStatuses.has(entry.status)) fail(`editorial review has invalid status for ${entry.slug}: ${entry.status}`);
  if (!Number.isInteger(entry.batch) || entry.batch < 1 || entry.batch > 16) fail(`editorial review has invalid batch for ${entry.slug}`);
  if (typeof entry.reason !== "string" || typeof reviewReasons[entry.reason] !== "string" || !reviewReasons[entry.reason].trim()) {
    fail(`editorial review has missing or unknown reason code for ${entry.slug}: ${entry.reason}`);
  }
  if (entry.status === "index-ready" && !readySet.has(entry.slug)) {
    fail(`editorial review marks a slug index-ready without allowlisting it: ${entry.slug}`);
  }
}
for (const slug of fixtureSlugs) {
  if (!reviewBySlug.has(slug)) fail(`gateway fixture slug is missing from the editorial review: ${slug}`);
}
if (reviewEntries.length !== fixtureSlugs.size) {
  fail(`editorial review/fixture count mismatch: ${reviewEntries.length} reviewed entries, ${fixtureSlugs.size} fixture slugs`);
}

let promotionManifest;
try {
  promotionManifest = JSON.parse(read(editorialPromotionsPath));
} catch (error) {
  fail(`editorial promotion ledger is missing or invalid JSON: ${error instanceof Error ? error.message : String(error)}`);
  promotionManifest = { promotions: [] };
}
const promotionEntries = Array.isArray(promotionManifest.promotions) ? promotionManifest.promotions : [];
const promotionBySlug = new Map();
for (const promotion of promotionEntries) {
  if (!promotion || typeof promotion.slug !== "string" || !promotion.slug) {
    fail("editorial promotion ledger contains an entry without a slug");
    continue;
  }
  if (promotionBySlug.has(promotion.slug)) fail(`editorial promotion ledger contains duplicate slug: ${promotion.slug}`);
  promotionBySlug.set(promotion.slug, promotion);
  if (!reviewBySlug.has(promotion.slug)) fail(`editorial promotion references an unreviewed gateway slug: ${promotion.slug}`);
  if (promotion.status !== "index-ready") fail(`editorial promotion must use index-ready status for ${promotion.slug}`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(promotion.approvedAt ?? ""))) fail(`editorial promotion is missing an ISO approval date for ${promotion.slug}`);
  if (typeof promotion.basis !== "string" || !promotion.basis.trim()) fail(`editorial promotion is missing its approval basis for ${promotion.slug}`);
  if (!readySet.has(promotion.slug)) fail(`editorially promoted gateway slug is not atomically allowlisted: ${promotion.slug}`);
}

const effectiveStatus = (slug) => promotionBySlug.has(slug) ? "index-ready" : reviewBySlug.get(slug)?.status;
for (const slug of readySlugs) {
  if (effectiveStatus(slug) !== "index-ready") fail(`allowlisted gateway slug is not effectively index-ready in editorial governance: ${slug}`);
}

const reviewCounts = reviewEntries.reduce((counts, entry) => {
  if (entry.status === "needs-expansion") counts.needsExpansion += 1;
  if (entry.status === "remain-staged") counts.remainStaged += 1;
  if (entry.status === "index-ready") counts.indexReady += 1;
  return counts;
}, { needsExpansion: 0, remainStaged: 0, indexReady: 0 });
const reviewSummary = editorialReview.summary ?? {};
if (reviewSummary.total !== reviewEntries.length) fail(`editorial review summary total mismatch: ${reviewSummary.total} vs ${reviewEntries.length}`);
for (const key of ["needsExpansion", "remainStaged", "indexReady"]) {
  if (reviewSummary[key] !== reviewCounts[key]) fail(`editorial review summary ${key} mismatch: ${reviewSummary[key]} vs ${reviewCounts[key]}`);
}
if (!Number.isInteger(reviewSummary.expanded) || reviewSummary.expanded < 0 || reviewSummary.expanded > reviewEntries.length) {
  fail(`editorial review summary expanded count is invalid: ${reviewSummary.expanded}`);
}
const effectiveIndexReadyCount = reviewEntries.filter((entry) => effectiveStatus(entry.slug) === "index-ready").length;
if (effectiveIndexReadyCount !== readySlugs.length) {
  fail(`effective editorial/index-ready allowlist mismatch: ${effectiveIndexReadyCount} governed ready vs ${readySlugs.length} allowlisted`);
}

const stubSlugs = [...stubs.matchAll(/\bslug:\s*["']([^"']+)["']/g)].map((match) => match[1]);
const stubSet = new Set(stubSlugs);
if (stubSlugs.length !== stubSet.size) fail("gateway index-ready stub registry contains duplicate slugs");
for (const slug of readySlugs) {
  if (!stubSet.has(slug)) fail(`index-ready gateway slug is missing its lightweight public-discovery stub: ${slug}`);
}
for (const slug of stubSlugs) {
  if (!readySet.has(slug)) fail(`gateway public-discovery stub exists for a staged slug that is not allowlisted: ${slug}`);
  if (!fixtureSlugs.has(slug)) fail(`gateway public-discovery stub references an unknown gateway slug: ${slug}`);
}
if (stubSlugs.length !== readySlugs.length) {
  fail(`gateway allowlist/stub count mismatch: ${readySlugs.length} allowlisted slug(s), ${stubSlugs.length} discovery stub(s)`);
}

const coreImportsPromotionStubs = core.includes('import { texasGatewayIndexReadyStubs } from "./texas-gateway-index-ready-stubs";');
const coreExposesPromotionStubs = core.includes("texasCoreArticleStubs.push(...texasGatewayIndexReadyStubs);");
if (readySlugs.length === 0) {
  if (coreImportsPromotionStubs || coreExposesPromotionStubs) {
    fail("zero index-ready gateway slugs must not wire promotion stubs into the public core article bundle");
  }
} else {
  if (!coreImportsPromotionStubs) {
    fail("core article discovery must import the lightweight gateway promotion stubs when gateway slugs are index-ready");
  }
  if (!coreExposesPromotionStubs) {
    fail("core article discovery must expose promoted gateway stubs to existing list/search repositories");
  }
}

function walk(dir, output = []) {
  if (!fs.existsSync(dir)) return output;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, output);
    else if (/\.(?:ts|tsx)$/.test(entry.name)) output.push(full);
  }
  return output;
}

const publicSourceFiles = [
  ...walk(path.join(root, "src/routes")),
  ...walk(path.join(root, "src/components")),
  ...walk(path.join(root, "src/brand")),
];
const stagedInboundLinks = [];
for (const full of publicSourceFiles) {
  const relative = path.relative(root, full).replaceAll("\\", "/");
  const source = fs.readFileSync(full, "utf8");
  for (const match of source.matchAll(/\/article\/([a-z0-9-]+)/g)) {
    const slug = match[1];
    if (fixtureSlugs.has(slug) && !readySet.has(slug)) stagedInboundLinks.push({ relative, slug });
  }
}
if (stagedInboundLinks.length) {
  fail(`public routes/components link to staged gateway drafts:\n${stagedInboundLinks.map(({ relative, slug }) => `- ${relative} -> /article/${slug}`).join("\n")}`);
}

if (!process.exitCode) {
  console.log(`Gateway index-readiness contract passed: ${gatewayFiles.length} article fixture modules, ${ids.length} explicit gateway IDs, ${fixtureSlugs.size} reviewed gateway slugs, ${reviewCounts.needsExpansion} baseline needing expansion, ${reviewCounts.remainStaged} baseline remaining staged, ${effectiveIndexReadyCount} effectively index-ready slug(s), ${stubSlugs.length} public-discovery stub(s).`);
  console.log("The baseline editorial audit remains immutable; explicit post-remediation promotions are ledgered separately and still require atomic allowlisting, public-discovery stubs, and the production-readiness gate.");
}
