import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");

const files = {
  history: read("src/data/fixtures/texas-flag-history.ts"),
  etiquette: read("src/data/fixtures/texas-flag-etiquette.ts"),
  newest: read("src/data/fixtures/newest-evergreen.ts"),
  thingsLinks: read("src/data/things-unique-to-texas-links.ts"),
  symbols: read("src/routes/texas-symbols.lazy.tsx"),
  historyHub: read("src/routes/texas-history.tsx"),
  articleRoute: read("src/routes/article.$slug.tsx"),
  smoke: read(".github/workflows/flag-history-production-smoke.yml"),
  deploy: read(".github/workflows/deploy-production.yml"),
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

requireContains("Flag production smoke", files.smoke, "workflow_run:");
requireContains("Flag production smoke", files.smoke, 'workflows: ["Deploy TexasDefined production"]');
requireContains("Flag production smoke", files.smoke, "texas-flag-history-page");
requireContains("Flag production smoke", files.smoke, "texas-flag-indexing-signals");

requireContains("Production deploy", files.deploy, "fetch_assert flag-history");
requireContains("Production deploy", files.deploy, "fetch_assert flag-etiquette");
requireContains("Production deploy", files.deploy, "fetch_assert texas-symbols");
requireContains("Production deploy", files.deploy, 'context":"texasdefined-production"');
requireContains("Production deploy", files.deploy, 'context":"texasdefined-bundle-budget"');

console.log("Texas flag authority cluster validation passed.");
