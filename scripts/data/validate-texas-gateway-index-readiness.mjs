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

const readiness = read(readinessPath);
const stubs = read(stubsPath);
const loader = read(loaderPath);
const core = read(corePath);
const articleRoute = read(articleRoutePath);
const sitemap = read(sitemapPath);

if (!readiness.includes("TEXAS_GATEWAY_INDEX_READY_SLUGS")) fail("missing explicit index-ready allowlist");
if (!readiness.includes('article.id.startsWith("gateway-")')) fail("gateway identity must remain explicit and scoped to gateway-* article IDs");
if (!readiness.includes("shouldNoindexTexasGatewayArticle")) fail("missing staged-page noindex helper");

if (!loader.includes("function loadAllTexasGatewayArticles()")) fail("direct QA loader must retain access to the full gateway set");
if (!/loadTexasGatewayArticle[\s\S]*loadAllTexasGatewayArticles\(\)/.test(loader)) fail("direct gateway lookup must resolve from the full staged+ready set");
if (!loader.includes("return articles.filter(isTexasGatewayIndexReadyArticle);")) fail("gateway loader must retain the index-ready filtering helper for guarded consumers");

if (!articleRoute.includes('shouldNoindexTexasGatewayArticle(article) ? "noindex, follow, max-image-preview:large" : undefined')) {
  fail("article metadata must noindex staged gateway drafts while preserving followed links");
}
if (!sitemap.includes("isTexasGatewayIndexReadyArticle(article)")) fail("sitemap must defensively filter staged gateway drafts");

const gatewayFixtureDir = path.join(root, "src/data/fixtures");
const nonArticleGatewayFiles = new Set([
  "texas-gateway-index-readiness.ts",
  "texas-gateway-index-ready-stubs.ts",
]);
const gatewayFiles = fs.readdirSync(gatewayFixtureDir)
  .filter((name) => /^texas-gateway-.*\.ts$/.test(name) && !nonArticleGatewayFiles.has(name));
const gatewaySource = gatewayFiles.map((name) => read(`src/data/fixtures/${name}`)).join("\n");
const ids = [...gatewaySource.matchAll(/(?:id:\s*|article\(\s*)["'](gateway-[^"']+)["']/g)].map((match) => match[1]);
if (!ids.length) fail("could not identify gateway-* article IDs in gateway fixtures");

const allowlistBody = readiness.match(/TEXAS_GATEWAY_INDEX_READY_SLUGS\s*=\s*new Set<string>\(\[([\s\S]*?)\]\)/)?.[1] ?? "";
const readySlugs = [...allowlistBody.matchAll(/["']([^"']+)["']/g)].map((match) => match[1]);
const readySet = new Set(readySlugs);
const fixtureSlugs = new Set([
  ...gatewaySource.matchAll(/slug:\s*["']([^"']+)["']/g),
  ...gatewaySource.matchAll(/article\(\s*["'][^"']+["']\s*,\s*["']([^"']+)["']/g),
].map((match) => match[1]));
for (const slug of readySlugs) {
  if (!fixtureSlugs.has(slug)) fail(`index-ready allowlist contains unknown gateway slug: ${slug}`);
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
  console.log(`Gateway index-readiness contract passed: ${gatewayFiles.length} article fixture modules, ${ids.length} explicit gateway IDs, ${readySlugs.length} index-ready slug(s), ${stubSlugs.length} public-discovery stub(s).`);
  console.log("Staged gateway drafts remain directly QA-accessible but are excluded from normal discovery, public inbound linking and article indexing.");
}
