#!/usr/bin/env node
/**
 * TexasDefined Mardi Gras 2027: focused live Chrome acceptance, not a broad crawl.
 * Eleven official-source guide leaves + one statewide hub, at mobile and desktop
 * widths. Preserve image rights / noindex and historical-event accuracy.
 */
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";

const ORIGIN = (process.env.PRODUCTION_ORIGIN || "https://texasdefined.com").replace(/\/$/, "");
const OUTPUT = "artifacts/mardi-gras-visual";
const GUIDES = [
  { slug: "mardi-gras-galveston", text: "Mardi Gras! Galveston", licensed: true, credit: "A Yee", year: "2027" },
  { slug: "mardi-gras-port-arthur", text: "Mardi Gras Port Arthur", licensed: false, year: "2027" },
  { slug: "mardi-gras-upriver-jefferson", text: "Mardi Gras Upriver", licensed: true, credit: "Renelibrary", year: "2027" },
  { slug: "cowboy-mardi-gras-bandera", text: "Cowboy Mardi Gras", licensed: true, credit: "Carol M. Highsmith", year: "2027" },
  { slug: "crystal-beach-mardi-gras-parade", text: "Crystal Beach Mardi Gras Parade", licensed: false, year: "2027" },
  { slug: "kemah-yachty-gras", text: "Yachty Gras", licensed: true, credit: "Tony Webster", year: "2027" },
  { slug: "palestine-mardi-gras-parade", text: "Palestine Mardi Gras Parade", licensed: true, credit: "Renelibrary", year: "2027" },
  { slug: "beaumont-pardi-gras", text: "Beaumont Pardi Gras", licensed: true, credit: "LUSportsFan", year: "2027" },
  { slug: "mardi-gras-on-the-sabine-orange", text: "Mardi Gras on the Sabine", licensed: false, year: "2026", pending: true },
  { slug: "oak-cliff-mardi-gras-parade", text: "Oak Cliff Mardi Gras Parade", licensed: true, credit: "Michael Barera", year: "2027" },
  { slug: "mardi-gras-southeast-texas-beaumont", text: "Mardi Gras of Southeast Texas", licensed: true, credit: "2C2KPhotography", year: "2026", pending: true },
];
// The shared server authority bridge withholds one-off Event markup for
// multi-occurrence event guides or unannounced/expired 2026 festivals.
// These four still require parseable WebPage JSON-LD and MUST NOT assert
// one fabricated single confirmed future Event.
const WEBPAGE_ONLY_SLUGS = new Set([
  "mardi-gras-galveston",
  "kemah-yachty-gras",
  "mardi-gras-southeast-texas-beaumont",
  "mardi-gras-on-the-sabine-orange",
]);
const HUB = "/events/mardi-gras";
const VIEWPORTS = [
  { name: "desktop", width: 1365, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];
const allPaths = [...GUIDES.map(x => "/event/" + x.slug), HUB];

if (process.argv.includes("--self-test")) {
  assert.equal(GUIDES.length, 11, "exactly 11 original major event guides");
  assert.equal(GUIDES.filter(x => x.licensed).length, 8, "exactly eight independently licensed heroes");
  assert.equal(GUIDES.filter(x => !x.licensed).length, 3, "three image/noindex blockers");
  assert.equal(WEBPAGE_ONLY_SLUGS.size, 4, "four multi-window or expired/unannounced guide schemas");
  for (const slug of WEBPAGE_ONLY_SLUGS) assert.ok(GUIDES.some(guide => guide.slug === slug));
  assert.equal(new Set(allPaths).size, 12, "every route unique");
  assert.equal(VIEWPORTS.length, 2);
  for (const guide of GUIDES) {
    assert.ok(guide.slug && guide.text && /202[67]/.test(guide.year));
    if (guide.licensed) assert.ok(guide.credit);
    if (guide.pending) assert.equal(guide.year, "2026", "unannounced 2027 festival must remain historical");
  }
  console.log("Mardi Gras 11+1 / two-viewports / 8 licensed / 3 noindex browser scenario contract passed.");
  process.exit(0);
}

const require = createRequire(import.meta.url);
const { chromium } = require("/tmp/texasdefined-mardi-gras-qa/node_modules/playwright-core");
const report = {
  checkedAt: new Date().toISOString(),
  targetSha: process.env.TARGET_DEPLOY_SHA || "",
  site: ORIGIN,
  scope: "11 original Mardi Gras guides plus the statewide hub, two browser viewports",
  screenshots: [],
  results: [],
  failures: [],
};
await mkdir(OUTPUT, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_BIN || "/usr/bin/google-chrome",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

try {
  for (const path of allPaths) {
    const guide = GUIDES.find(x => path === "/event/" + x.slug);
    for (const viewport of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        isMobile: viewport.name === "mobile",
        hasTouch: viewport.name === "mobile",
        deviceScaleFactor: 1,
      });
      const page = await context.newPage();
      const result = { path, viewport: viewport.name, checks: [], pageErrors: [], httpStatus: null, screenshot: null, imageUrl: null };
      const check = (name, condition, detail = "") => {
        const item = { name, passed: Boolean(condition), detail: String(detail).slice(0, 350) };
        result.checks.push(item);
        if (!item.passed) report.failures.push({ path, viewport: viewport.name, ...item });
      };
      page.on("pageerror", error => result.pageErrors.push(String(error?.message ?? error).slice(0, 240)));
      try {
        const url = ORIGIN + path + "?mardi_gras_qa=" + encodeURIComponent(report.targetSha.slice(0, 12) || "current");
        const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
        result.httpStatus = response?.status() ?? null;
        check("HTTP 200", result.httpStatus === 200, result.httpStatus);
        await page.locator("h1").first().waitFor({ state: "visible", timeout: 25_000 });
        await page.evaluate(() => document.fonts?.ready);
        if (guide?.licensed) {
          const img = page.locator('figure[data-major-event-hero="true"] img[data-major-event-enrichment-image="true"]').first();
          await img.waitFor({ state: "attached", timeout: 20_000 });
          await img.evaluate(el => Promise.race([
            el.decode().catch(() => {}),
            new Promise(resolve => setTimeout(resolve, 20_000)),
          ]));
        }
        // Route-level JSON-LD can arrive after the server-rendered h1. Wait
        // briefly for hydration before classifying a schema as genuinely absent.
        // Never count a breadcrumb as a substitute for Event/CollectionPage.
        await page.waitForFunction(({ hub, expectedSchemaType }) => {
          const required = hub ? ["CollectionPage", "ItemList"] : [expectedSchemaType];
          const json = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
            .map(el => el.textContent || "").join("\n");
          return required.every(type => new RegExp('"@type"\\s*:\\s*"' + type + '"').test(json));
        }, {
          hub: !guide,
          expectedSchemaType: guide && WEBPAGE_ONLY_SLUGS.has(guide.slug) ? "WebPage" : "Event",
        }, { timeout: 8_000 }).catch(() => {});
        const data = await page.evaluate(() => {
          const image = document.querySelector('figure[data-major-event-hero="true"] img[data-major-event-enrichment-image="true"]');
          const caption = document.querySelector('figure[data-major-event-hero="true"] figcaption');
          const ld = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).flatMap(script => {
            try {
              const data = JSON.parse(script.textContent || "{}");
              const nodes = Array.isArray(data) ? data : [data];
              return nodes.flatMap(node => Array.isArray(node?.["@graph"]) ? node["@graph"] : [node]);
            } catch { return []; }
          });
          const marker = type => ld.some(node => [node?.["@type"]].flat().includes(type));
          const pageText = document.body?.innerText || "";
          return {
            h1: document.querySelector("h1")?.innerText?.trim() || "",
            canonical: document.querySelector('link[rel="canonical"]')?.href || "",
            robots: document.querySelector('meta[name="robots"]')?.content || "",
            width: document.documentElement.scrollWidth,
            viewport: window.innerWidth,
            title: document.title || "",
            pageText: pageText.slice(0, 180_000),
            hasEvent: marker("Event"),
            hasWebPage: marker("WebPage"),
            hasCollectionPage: marker("CollectionPage"),
            hasList: marker("ItemList"),
            schemaDiagnostics: {
              scripts: document.querySelectorAll('script[type="application/ld+json"]').length,
              types: ld.map(node => node?.["@type"]).filter(Boolean).slice(0, 24),
              samples: Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
                .map(s => (s.textContent || "").slice(0, 220)).slice(0, 6),
            },
            heroCount: document.querySelectorAll('figure[data-major-event-hero="true"]').length,
            image: image ? {
              src: image.currentSrc || image.src,
              alt: image.alt,
              loaded: image.complete && image.naturalWidth > 0 && image.naturalHeight > 0,
              naturalWidth: image.naturalWidth,
            } : null,
            captionText: caption?.innerText || "",
            captionLinks: caption ? Array.from(caption.querySelectorAll("a[href]")).map(a => a.href) : [],
            affiliateDisclosure: pageText.includes("Affiliate disclosure"),
            guideLinks: Array.from(document.querySelectorAll('a[href^="/event/"]')).map(a => a.getAttribute("href")),
          };
        });
        const bodyText = data.pageText || "";
        delete data.pageText; // Avoid storing up to 180 KB of body text per viewport in artifacts.
        result.imageUrl = data.image?.src || null;
        check("canonical URL", data.canonical === ORIGIN + path, data.canonical);
        check("real viewport and no page-wide overflow", data.viewport === viewport.width && data.width <= data.viewport + 4, data.width + "/" + data.viewport);
        check("human-readable title", data.title.length > 15, data.title.slice(0, 100));
        if (guide) {
          check("correct individual event identity", data.h1.includes(guide.text), data.h1);
          if (WEBPAGE_ONLY_SLUGS.has(guide.slug)) {
            check("evergreen WebPage schema; no fabricated one-off Event", data.hasWebPage && !data.hasEvent, JSON.stringify(data.schemaDiagnostics));
          } else {
            check("single confirmed Event structured data", data.hasEvent, JSON.stringify(data.schemaDiagnostics));
          }
          check("year source context", bodyText.includes(guide.year), data.title);
          check("official source links", await page.getByRole("heading", { name: "Official event links" }).count() > 0);
          check("visit planning", await page.getByRole("heading", { name: "Planning your visit" }).count() > 0);
          if (guide.licensed) {
            check("commercially approved hero visibly rendered", data.heroCount === 1 && Boolean(data.image?.src && data.image.alt), JSON.stringify(data.image));
            check("actual image bytes decoded", Boolean(data.image?.loaded), JSON.stringify(data.image));
            check("photographer credit visibly rendered", data.captionText.includes(guide.credit), data.captionText);
            check("visible source and license links", data.captionLinks.some(u => u.startsWith("https://creativecommons.org/") || u.startsWith("https://www.loc.gov/"))
              && data.captionLinks.some(u => u.startsWith("https://commons.wikimedia.org/wiki/File:")), JSON.stringify(data.captionLinks));
            check("licensed guide not unnecessarily noindexed", !/noindex/i.test(data.robots), data.robots);
          } else {
            check("no unlicensed hero displayed", data.heroCount === 0 && !data.image);
            check("noindex remains until rights approved", /noindex/i.test(data.robots), data.robots);
          }
          if (guide.pending) {
            check("historical year clearly differentiated from pending 2027", bodyText.includes("2026") && bodyText.includes("2027"));
          }
          check("event affiliate disclosure", data.affiliateDisclosure);
        } else {
          check("Mardi Gras statewide hub heading", data.h1.includes("Mardi Gras in Texas"), data.h1);
          check("CollectionPage and ItemList schema", data.hasCollectionPage && data.hasList, JSON.stringify(data.schemaDiagnostics));
          check("hub indexable", !/noindex/i.test(data.robots), data.robots);
          for (const item of GUIDES) {
            check("guide linked in hub: " + item.slug, data.guideLinks.includes("/event/" + item.slug));
          }
        }
        check("no hydration/runtime exception", !result.pageErrors.some(x => /hydration|react error|uncaught|unhandled/i.test(x)), JSON.stringify(result.pageErrors));
        const imagePath = OUTPUT + "/" + (guide ? guide.slug : "statewide-hub") + "-" + viewport.name + ".png";
        await page.screenshot({ path: imagePath, fullPage: true, animations: "disabled", timeout: 35_000 });
        result.screenshot = imagePath;
        report.screenshots.push(imagePath);
      } catch (error) {
        check("Chrome scenario completed", false, error?.message || error);
        const file = OUTPUT + "/failed-" + (guide ? guide.slug : "statewide-hub") + "-" + viewport.name + ".png";
        await page.screenshot({ path: file, fullPage: false, animations: "disabled", timeout: 10_000 }).catch(() => {});
      } finally {
        report.results.push(result);
        await context.close();
      }
    }
  }
} finally {
  await browser.close();
  await writeFile(OUTPUT + "/qa-report.json", JSON.stringify(report, null, 2) + "\n");
}
// Never certify a partial browser run as a complete 12 x 2 release acceptance.
// Screenshot files are disposable after compact report evidence is retained.
if (report.results.length !== 24 || report.screenshots.length !== 24) {
  report.failures.push({
    path: "all",
    viewport: "all",
    name: "complete 12-page x 2-viewport coverage",
    passed: false,
    detail: `results=${report.results.length}; screenshots=${report.screenshots.length}; expected=24 each`,
  });
  await writeFile(OUTPUT + "/qa-report.json", JSON.stringify(report, null, 2) + "\n");
}
console.log("Mardi Gras Chrome acceptance: " + report.results.length + " page/viewport checks; " + report.screenshots.length + " screenshots.");
for (const row of report.results) {
  console.log(row.path + " " + row.viewport + ": " + row.checks.filter(c => c.passed).length + "/" + row.checks.length + " checks");
}
if (report.failures.length) {
  console.error("Mardi Gras live Chrome acceptance FAILED: " + JSON.stringify(report.failures));
  process.exitCode = 1;
} else {
  console.log("Mardi Gras live Chrome acceptance PASS: 11 guides + hub, mobile/desktop, image decode and safeguards.");
}
