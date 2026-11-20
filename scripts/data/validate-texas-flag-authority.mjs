import { existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

// A source-string assertion cannot catch a malformed one-off live verification
// script. Parse it on every flag authority and protected predeploy run.
execFileSync(process.execPath, ["--check", "scripts/ci/verify-texas-flag-live.mjs"], { stdio: "inherit" });
execFileSync(process.execPath, ["--test",
  "scripts/editorial/refresh-texas-flag-sources.test.mjs",
  "scripts/ci/audit-texas-flag-vitals.test.mjs",
  "scripts/ci/verify-texas-flag-cdn-cache.test.mjs",
  "scripts/data/texas-flag-edge-cache-policy.test.mjs",
], { stdio: "inherit" });

const read = (path) => readFileSync(path, "utf8");
const readRouteSurface = (path) => {
  const eagerSource = read(path);
  const lazyPath = path.replace(/\.tsx$/, '.lazy.tsx');
  return existsSync(lazyPath) ? `${eagerSource}\n${read(lazyPath)}` : eagerSource;
};

const files = {
  flagHubEager: read("src/routes/texas-flag.tsx"),
  flagHubLazy: read("src/routes/texas-flag.lazy.tsx"),
  priorityPages: read("src/data/priority-search-pages.ts"),
  history: read("src/data/fixtures/texas-flag-history.ts"),
  etiquette: read("src/data/fixtures/texas-flag-etiquette.ts"),
  newest: read("src/data/fixtures/newest-evergreen.ts"),
  thingsLinks: read("src/data/things-unique-to-texas-links.ts"),
  symbols: read("src/routes/texas-symbols.lazy.tsx"),
  historyHub: readRouteSurface("src/routes/texas-history.tsx"),
  articleRoute: read("src/routes/article.$slug.tsx"),
  rootRoute: read("src/routes/__root.tsx"),
  rss: read("src/routes/rss[.]xml.ts"),
  sitemap: read("src/routes/sitemap[.]xml.ts"),
  robots: read("public/robots.txt"),
  smoke: read(".github/workflows/flag-history-production-smoke.yml"),
  webSub: read(".github/workflows/websub-notify.yml"),
  deploy: read(".github/workflows/deploy-production.yml"),
  productionVerifier: read("scripts/ci/verify-production-surfaces.mjs"),
  statusPublisher: read("scripts/ci/publish-github-status.mjs"),
  flagQuarterly: read(".github/workflows/texas-flag-quarterly.yml"),
  flagSourceMonitor: read("scripts/editorial/refresh-texas-flag-sources.mjs"),
  flagVitals: read("scripts/ci/audit-texas-flag-vitals.mjs"),
  prioritySeo: read("src/lib/priority-search-seo.ts"),
  flagSourceState: read("ops/editorial/texas-flag-source-state.json"),
};

function requireContains(label, text, needle) {
  if (!text.includes(needle)) {
    throw new Error(`${label} is missing required authority signal: ${needle}`);
  }
}

function requireNotContains(label, text, needle) {
  if (text.includes(needle)) {
    throw new Error(`${label} contains disallowed value: ${needle}`);
  }
}

function requireCount(label, text, needle, minimum) {
  const count = text.split(needle).length - 1;
  if (count < minimum) {
    throw new Error(`${label} expected at least ${minimum} occurrences of ${needle}, found ${count}`);
  }
}

// The primary hub must carry a verifiable, accessible comparison rather than
// merely sending readers to the two detailed companion articles.
requireContains("Texas flag hub", files.flagHubLazy, "HistoricalFlagComparison");
requireContains("Texas flag hub", files.flagHubLazy, "HistoricalTimeline");
requireContains("Texas flag hub", files.flagHubLazy, "LoneStarProportions");
requireContains("Texas flag hub", files.flagHubLazy, "burnet-flag-description");
requireContains("Texas flag hub", files.flagHubLazy, "lone-star-flag-description");
requireContains("Texas flag hub", files.flagHubLazy, "December 10, 1836");
requireContains("Texas flag hub", files.flagHubLazy, "January 25, 1839");
requireContains("Texas flag hub", files.flagHubLazy, "1879–1933");
requireContains("Texas flag hub", files.flagHubLazy, "2001–present");
requireContains("Texas flag hub", files.flagHubLazy, "not photographs of original flags");
requireContains("Texas flag hub", files.flagHubLazy, "https://www.tshaonline.org/handbook/entries/flags-of-texas");
requireContains("Texas flag hub", files.flagHubLazy, "https://www.tsl.texas.gov/treasures/flagsandmaps/flag-design.html");
requireContains("Texas flag hub", files.flagHubLazy, 'to="/article/history-of-the-texas-flag"');
requireContains("Texas flag hub", files.flagHubLazy, 'to="/article/six-flags-over-texas-meaning"');
requireContains("Texas flag hub data", files.priorityPages, '"texas-flag": {');
requireContains("Texas flag hub data", files.priorityPages, 'updated: "November 19, 2026"');
requireContains("Texas flag hub data", files.priorityPages, "Pantone 281");
requireContains("Texas flag hub data", files.priorityPages, "/article/texas-flag-etiquette-display-guide");
requireContains("Texas flag hub data", files.priorityPages, "/texas-symbols");
requireContains("Texas flag SEO", files.flagHubEager, 'const canonicalPath: "/texas-flag"');
requireContains("Texas flag SEO", files.flagHubEager, 'buildPrioritySearchHead({');
requireContains("Texas flag SEO", files.flagHubEager, 'When was the current Texas flag adopted?');
requireContains("Texas flag SEO", files.flagHubEager, "includeFaqSchema: false");
requireContains("Texas flag SEO", files.prioritySeo, "if (includeFaqSchema && data.faq?.length)");
requireContains("Texas flag live uncached smoke", read("scripts/ci/verify-texas-flag-live.mjs"), 'November 19, 2026/');
requireContains("Texas flag live uncached smoke", read("scripts/ci/verify-texas-flag-live.mjs"), "cf-cache-status");
requireContains("Texas flag live public cache parity", read("scripts/ci/verify-texas-flag-live.mjs"), "ordinary public URL");
requireContains("Texas flag Worker edge policy", read("src/server.ts"), "applyTexasFlagEdgeCachePolicy");
requireContains("Texas flag edge cache policy", read("src/lib/texas-flag-edge-cache-policy.ts"), "Cloudflare-CDN-Cache-Control");
requireContains("Texas flag performance audit", files.flagVitals, "https://texasdefined.com/texas-flag");
requireContains("Texas flag performance audit", files.flagVitals, "url-field-data-unavailable");
requireContains("Texas flag source monitor", files.flagSourceMonitor, "historicalSourceChanged");
requireContains("Texas flag source monitor", files.flagSourceMonitor, "No researched public page text was changed");
requireContains("Texas flag scheduled weekly review", files.flagQuarterly, 'cron: "17 13 * * 1"');
requireContains("Texas flag existing quarterly review", files.flagQuarterly, 'cron: "21 14 15 2,5,8,11 *"');
requireContains("Texas flag scheduled source update PR", files.flagQuarterly, "peter-evans/create-pull-request@v7");
requireContains("Texas flag scheduled field vitals", files.flagQuarterly, "node scripts/ci/audit-texas-flag-vitals.mjs");
requireContains("Texas flag scheduled live uncached SEO", files.flagQuarterly, "node scripts/ci/verify-texas-flag-live.mjs --sources");
requireContains("Texas flag actual successful protected deploy hook", files.flagQuarterly, 'workflows: ["Deploy TexasDefined production"]');
requireContains("Texas flag exact deployed status provenance", files.flagQuarterly, 'STATUS_TARGET_SHA:');
requireContains("Texas flag checkout exact deployed source", files.flagQuarterly, 'ref: ${{ github.event.workflow_run.head_sha }}');
requireContains("Texas flag postdeploy verification", files.flagQuarterly, "node scripts/ci/verify-texas-flag-live.mjs 2>&1");
requireContains("Texas flag source registry", files.flagSourceState, '"schemaVersion": 1');
requireContains("Primary sitemap", files.sitemap, '"/texas-flag": "2026-11-19"');
requireContains("Texas flag history", files.history, 'href: "/texas-flag"');
requireContains("Texas flag etiquette", files.etiquette, 'href: "/texas-flag"');

requireContains("Texas flag history", files.history, 'slug: "history-of-the-texas-flag"');
requireContains("Texas flag history", files.history, 'sourceUrl: "https://www.tsl.texas.gov/treasures/flagsandmaps/flag-design.html"');
requireContains("Texas flag history", files.history, 'href: "/article/texas-flag-etiquette-display-guide"');
requireContains("Texas flag history", files.history, 'label: "Texas flag display & etiquette"');
requireContains("Texas flag history", files.history, 'h("1836: the Burnet flag becomes the first official national standard")');
requireContains("Texas flag history", files.history, 'h("1838–1839: the modern Lone Star design takes shape")');
requireContains("Texas flag history", files.history, 'h("Who designed the Texas flag?")');
requireContains("Texas flag history", files.history, 'h("The strange legal gap from 1879 to 1933")');
requireContains("Texas flag history", files.history, 'h("Can the Texas flag fly at the same height as the U.S. flag?")');
requireContains("Texas flag history", files.history, "Flag_of_the_Republic_of_Texas_");
requireContains("Texas flag history", files.history, "Flag_of_Texas_");
requireCount("Texas flag history", files.history, 'type: "image"', 2);
requireCount("Texas flag history", files.history, "https://upload.wikimedia.org/", 3);
requireNotContains("Texas flag history", files.history, "commons.wikimedia.org/wiki/Special:Redirect");
requireContains("Texas flag history", files.history, "width: 1280");
requireContains("Texas flag history", files.history, 'updatedAt: "2026-11-19"');
requireContains("Texas flag history", files.history, "What the signed 1839 original actually shows");
requireContains("Texas flag history", files.history, "Texas Flag Day is March 2");
requireContains("Texas flag history", files.history, "1974/066-001");
requireContains("Texas flag history", files.history, "https://www.tsl.texas.gov/treasures/flagsandmaps/flags/lone-star-design.html");
requireContains("Flag main authority", files.flagHubLazy, "The signed 1839 flag drawing: a primary-source research guide");
requireContains("Flag main authority", files.flagHubLazy, "https://tcss.legis.texas.gov/resources/GV/htm/GV.662.htm");
requireContains("Flag main authority", files.priorityPages, "/article/republic-of-texas-navy-history");
requireContains("Flag history ImageObject rights", files.articleRoute, 'article.slug === "history-of-the-texas-flag"');
requireContains("Flag history ImageObject rights", files.articleRoute, "Paul B. Joiner");
requireContains("Flag history ImageObject rights", files.articleRoute, "copyrightNotice");

requireContains("Texas flag etiquette", files.etiquette, 'slug: "texas-flag-etiquette-display-guide"');
requireContains("Texas flag etiquette", files.etiquette, 'sourceUrl: "https://www.tsl.texas.gov/ref/abouttx/flagcode.html"');
requireContains("Texas flag etiquette", files.etiquette, 'h("Texas flag and U.S. flag on separate poles")');
requireContains("Texas flag etiquette", files.etiquette, 'h("How to hang the Texas flag vertically")');
requireContains("Texas flag etiquette", files.etiquette, 'h("When should the Texas flag be at half-staff?")');
requireContains("Texas flag etiquette", files.etiquette, 'h("Is Texas the only state that can fly its flag as high as the U.S. flag?")');

requireContains("Evergreen registry", files.newest, 'import { texasFlagHistoryArticle } from "./texas-flag-history"');
requireContains("Evergreen registry", files.newest, 'import { texasFlagEtiquetteArticle } from "./texas-flag-etiquette"');
requireContains("Evergreen registry", files.newest, "texasFlagHistoryArticle");
requireContains("Evergreen registry", files.newest, "texasFlagEtiquetteArticle");

requireContains("Things Unique link map", files.thingsLinks, '225: "/article/history-of-the-texas-flag"');
requireContains("Texas Symbols page", files.symbols, '/article/history-of-the-texas-flag');
requireContains("Texas Symbols page", files.symbols, '/article/texas-flag-etiquette-display-guide');
requireContains("Texas History hub", files.historyHub, 'slug: "history-of-the-texas-flag"');

requireContains("Article route", files.articleRoute, "FAQ_ARTICLE_SLUGS");
requireContains("Article route", files.articleRoute, '"history-of-the-texas-flag"');
requireContains("Article route", files.articleRoute, '"texas-flag-etiquette-display-guide"');
requireContains("Article route", files.articleRoute, "faqEntriesForArticle");
requireContains("Article route", files.articleRoute, '"@type": "FAQPage"');
requireContains("Article route", files.articleRoute, 'citation: article.sourceUrl');
requireContains("Article route", files.articleRoute, "Primary source:");
requireContains("Article route", files.articleRoute, "Image credit:");
requireNotContains("Article route", files.articleRoute, "const movingToTexasFaq");
requireNotContains("Article route", files.articleRoute, "const articleFaqBySlug");

requireContains("Root route", files.rootRoute, 'rel: "alternate"');
requireContains("Root route", files.rootRoute, 'href: "/rss.xml"');
requireContains("Root route", files.rootRoute, 'type: "application/rss+xml"');

requireContains("RSS feed", files.rss, 'createFileRoute("/rss.xml")');
requireContains("RSS feed", files.rss, '<rss version="2.0"');
requireContains("RSS feed", files.rss, 'application/rss+xml; charset=utf-8');
requireContains("RSS feed", files.rss, 'platform.articles.list(scope)');
requireContains("RSS feed", files.rss, '/article/${article.slug}');
requireContains("RSS feed", files.rss, 'https://pubsubhubbub.appspot.com/');
requireContains("RSS feed", files.rss, 'rel="hub"');
requireContains("RSS feed", files.rss, "const RSS_LIMIT = 50;");
requireContains("RSS feed", files.rss, "const PINNED_DISCOVERY_SLUGS = new Set([");
requireContains("RSS feed", files.rss, '"history-of-the-texas-flag"');
requireContains("RSS feed", files.rss, '"texas-flag-etiquette-display-guide"');
requireContains("RSS feed", files.rss, "Math.max(0, RSS_LIMIT - pinnedArticles.length)");

requireContains("Primary sitemap", files.sitemap, '"/texas-history": "2026-08-20"');
requireContains("Primary sitemap", files.sitemap, '"/texas-symbols": "2026-08-20"');
requireContains("Primary sitemap", files.sitemap, '"history-of-the-texas-flag": "2026-11-19"');
requireContains("Primary sitemap", files.sitemap, '"texas-flag-etiquette-display-guide": "2026-08-20"');

requireContains("robots.txt", files.robots, "Sitemap: https://texasdefined.com/sitemap.xml");
requireContains("robots.txt", files.robots, "Sitemap: https://texasdefined.com/sitemap-explore.xml");
requireContains("robots.txt", files.robots, "Sitemap: https://texasdefined.com/rss.xml");

requireContains("Flag production smoke", files.smoke, "workflow_dispatch:");
requireContains("Flag production smoke", files.smoke, "texas-flag-main-page");
requireContains("Flag production smoke", files.smoke, "burnet-flag-title");
requireContains("Flag production smoke", files.smoke, "lone-star-flag-title");
requireContains("Flag production smoke", files.smoke, "2026-11-19");

requireContains("Flag production smoke", files.smoke, "texas-flag-history-page");
requireContains("Flag production smoke", files.smoke, "texas-flag-history-reciprocity");
requireContains("Flag production smoke", files.smoke, "texas-flag-history-schema");
requireContains("Flag production smoke", files.smoke, "texas-flag-history-source");
requireContains("Flag production smoke", files.smoke, "texas-flag-indexing-signals");
requireContains("Flag production smoke", files.smoke, "'/rss.xml'");
requireContains("Flag production smoke", files.smoke, "fresh sitemap dates and RSS discovery verified");
requireContains("Flag production smoke", files.smoke, "html_to_text()");
requireContains("Flag production smoke", files.smoke, "require_text()");
requireContains("Flag production smoke", files.smoke, "require_raw()");
requireContains("Flag production smoke", files.smoke, "history article is missing from RSS");
requireContains("Flag production smoke", files.smoke, "etiquette article is missing from RSS");

requireContains("WebSub notifier", files.webSub, 'workflows: ["Deploy TexasDefined production"]');
requireContains("WebSub notifier", files.webSub, "https://pubsubhubbub.appspot.com/");
requireContains("WebSub notifier", files.webSub, "hub.mode=publish");
requireContains("WebSub notifier", files.webSub, "hub.url=${feed}");
requireContains("WebSub notifier", files.webSub, "texasdefined-websub");

requireContains("Production deploy", files.deploy, "node scripts/ci/verify-changed-production-pages.mjs");
requireContains("Production deploy", files.deploy, "node scripts/ci/publish-github-status.mjs texasdefined-production");
requireContains("Production deploy", files.deploy, "node scripts/ci/publish-github-status.mjs texasdefined-bundle-budget");
requireContains("Production deploy", files.deploy, 'CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_DEPLOY_API_TOKEN }}');
requireContains("Production deploy", files.deploy, "CLOUDFLARE_DEPLOY_TOKEN_PRESENT:");
requireContains("Production deploy", files.deploy, "Production deployment will use CLOUDFLARE_DEPLOY_API_TOKEN.");
requireContains("Production verifier", files.productionVerifier, "['flag-history', '/article/history-of-the-texas-flag'");
requireContains("Production verifier", files.productionVerifier, "['flag-etiquette', '/article/texas-flag-etiquette-display-guide'");
requireContains("Production verifier", files.productionVerifier, "['texas-symbols', '/texas-symbols'");
requireContains("Production verifier", files.productionVerifier, "LIVE PRODUCTION failure");
requireContains("Status publisher", files.statusPublisher, "CI telemetry failed");

console.log("Texas flag authority cluster validation passed across eager and lazy Texas History route surfaces.");
