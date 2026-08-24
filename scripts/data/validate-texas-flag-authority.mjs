import { existsSync, readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const readRouteSurface = (path) => {
  const eagerSource = read(path);
  const lazyPath = path.replace(/\.tsx$/, '.lazy.tsx');
  return existsSync(lazyPath) ? `${eagerSource}\n${read(lazyPath)}` : eagerSource;
};

const files = {
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
requireContains("Primary sitemap", files.sitemap, '"history-of-the-texas-flag": "2026-08-20"');
requireContains("Primary sitemap", files.sitemap, '"texas-flag-etiquette-display-guide": "2026-08-20"');

requireContains("robots.txt", files.robots, "Sitemap: https://texasdefined.com/sitemap.xml");
requireContains("robots.txt", files.robots, "Sitemap: https://texasdefined.com/sitemap-explore.xml");
requireContains("robots.txt", files.robots, "Sitemap: https://texasdefined.com/rss.xml");

requireContains("Flag production smoke", files.smoke, "workflow_run:");
requireContains("Flag production smoke", files.smoke, 'workflows: ["Deploy TexasDefined production"]');
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

requireContains("Production deploy", files.deploy, "node scripts/ci/verify-production-surfaces.mjs");
requireContains("Production deploy", files.deploy, "node scripts/ci/publish-github-status.mjs texasdefined-production");
requireContains("Production deploy", files.deploy, "node scripts/ci/publish-github-status.mjs texasdefined-bundle-budget");
requireContains("Production deploy", files.deploy, 'CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_DEPLOY_API_TOKEN || secrets.CLOUDFLARE_API_TOKEN }}');
requireContains("Production deploy", files.deploy, "CLOUDFLARE_DEPLOY_TOKEN_PRESENT:");
requireContains("Production deploy", files.deploy, "Production deployment will use CLOUDFLARE_DEPLOY_API_TOKEN.");
requireContains("Production verifier", files.productionVerifier, "['flag-history', '/article/history-of-the-texas-flag'");
requireContains("Production verifier", files.productionVerifier, "['flag-etiquette', '/article/texas-flag-etiquette-display-guide'");
requireContains("Production verifier", files.productionVerifier, "['texas-symbols', '/texas-symbols'");
requireContains("Production verifier", files.productionVerifier, "LIVE PRODUCTION failure");
requireContains("Status publisher", files.statusPublisher, "CI telemetry failed");

console.log("Texas flag authority cluster validation passed across eager and lazy Texas History route surfaces.");
