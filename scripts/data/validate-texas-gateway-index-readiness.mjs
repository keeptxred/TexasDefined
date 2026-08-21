import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const fail = (message) => {
  console.error(`Gateway index-readiness validation failed: ${message}`);
  process.exitCode = 1;
};

const readinessPath = "src/data/fixtures/texas-gateway-index-readiness.ts";
const loaderPath = "src/data/fixtures/lazy-texas-gateway.ts";
const articleRoutePath = "src/routes/article.$slug.tsx";
const sitemapPath = "src/routes/sitemap[.]xml.ts";
const repositoriesPath = "src/data/fixtures/repositories.ts";

const readiness = read(readinessPath);
const loader = read(loaderPath);
const articleRoute = read(articleRoutePath);
const sitemap = read(sitemapPath);
const repositories = read(repositoriesPath);

if (!readiness.includes("TEXAS_GATEWAY_INDEX_READY_SLUGS")) fail("missing explicit index-ready allowlist");
if (!readiness.includes('article.id.startsWith("gateway-")')) fail("gateway identity must remain explicit and scoped to gateway-* article IDs");
if (!readiness.includes("shouldNoindexTexasGatewayArticle")) fail("missing staged-page noindex helper");

if (!loader.includes("function loadAllTexasGatewayArticles()")) fail("direct QA loader must retain access to the full gateway set");
if (!loader.includes("return articles.filter(isTexasGatewayIndexReadyArticle);")) fail("public gateway discovery must filter through the index-ready allowlist");
if (!/loadTexasGatewayArticle[\s\S]*loadAllTexasGatewayArticles\(\)/.test(loader)) fail("direct gateway lookup must resolve from the full staged+ready set");

if (!articleRoute.includes('shouldNoindexTexasGatewayArticle(article) ? "noindex, follow, max-image-preview:large" : undefined')) {
  fail("article metadata must noindex staged gateway drafts while preserving followed links");
}

if (!sitemap.includes("isTexasGatewayIndexReadyArticle(article)")) fail("sitemap must defensively filter staged gateway drafts");
if (!repositories.includes('import("./lazy-texas-gateway")')) fail("public editorial discovery is no longer wired through the staged gateway loader");
if (!repositories.includes("module.loadTexasGatewayArticles()")) fail("repository discovery must use the filtered public gateway loader");

const gatewayFixtureDir = path.join(root, "src/data/fixtures");
const gatewayFiles = fs.readdirSync(gatewayFixtureDir)
  .filter((name) => /^texas-gateway-(?!index-readiness).*\.ts$/.test(name));
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
  console.log(`Gateway index-readiness contract passed: ${gatewayFiles.length} fixture modules, ${ids.length} explicit gateway IDs, ${readySlugs.length} index-ready slug(s).`);
  console.log("Staged gateway drafts remain directly QA-accessible but are excluded from normal discovery, public inbound linking and article indexing.");
}
