#!/usr/bin/env node
/** Focused desktop/mobile real-Chrome QA for the one Tierra Blanca authority guide.
 * No sitewide crawl, no actions on external providers, no artificial performance grades.
 */
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";

const BASE = "https://texasdefined.com";
const PATH = "/explore/tierra-blanca-creek";
const DIR = "artifacts/tierra-blanca-authority-visual";
const SCENARIOS = [
  { name: "desktop", width: 1365, height: 900, isMobile: false },
  { name: "mobile", width: 390, height: 844, isMobile: true },
];
if (process.argv.includes("--self-test")) {
  assert.equal(SCENARIOS.length, 2);
  assert.deepEqual(SCENARIOS.map(x => x.name), ["desktop", "mobile"]);
  assert.ok(SCENARIOS.every(x => x.width >= 320 && x.height >= 700));
  assert.equal(PATH, "/explore/tierra-blanca-creek");
  console.log("PASS bounded Tierra Blanca 2-viewport single-URL Chrome acceptance contract");
  process.exit(0);
}

const require = createRequire(import.meta.url);
const { chromium } = require("/tmp/texasdefined-tierra-blanca-qa/node_modules/playwright-core");
await mkdir(DIR, { recursive: true });
const report = { page: BASE + PATH, checkedAt: new Date().toISOString(), sha: process.env.TARGET_DEPLOY_SHA || "", results: [], failures: [] };
const browser = await chromium.launch({
  executablePath: process.env.CHROME_BIN || "/usr/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
try {
  for (const vp of SCENARIOS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.isMobile, hasTouch: vp.isMobile, deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    const row = { viewport: vp.name, checks: [], pageErrors: [], screenshot: null };
    const check = (name, pass, detail = "") => {
      const outcome = { name, pass: Boolean(pass), detail: String(detail).slice(0, 240) };
      row.checks.push(outcome);
      if (!pass) report.failures.push({ viewport: vp.name, ...outcome });
    };
    page.on("pageerror", error => row.pageErrors.push(error.message.slice(0, 200)));
    try {
      const response = await page.goto(BASE + PATH + "?tierra_visual_qa=" + encodeURIComponent(report.sha.slice(0, 12) || "current"), {
        waitUntil: "domcontentloaded", timeout: 45000,
      });
      check("HTTP success", response?.status() === 200, response?.status());
      await page.locator("h2#tierra-blanca-map").waitFor({ state: "visible", timeout: 20000 });
      // The previously green Chrome run still showed two hotel panels before
      // any creek geography on mobile. Wait for the actual affiliate placement.
      await page.locator('[data-stay-nearby-slot] #expedia-travel-surface').waitFor({ state: "attached", timeout: 15000 });
      await page.evaluate(() => document.fonts?.ready);
      const evidence = await page.evaluate(() => {
        const article = document.querySelector("article");
        const figures = [...(article?.querySelectorAll("figure") || [])];
        const map = document.querySelector('iframe[title*="OpenStreetMap"]');
        return {
          h1: document.querySelector("h1")?.textContent?.trim() || "",
          canonical: document.querySelector('link[rel="canonical"]')?.href || "",
          articleHorizontalOverflow: (article?.scrollWidth || 0) - (article?.clientWidth || 0),
          documentHorizontalOverflow: document.documentElement.scrollWidth - innerWidth,
          mapSrc: map?.getAttribute("src") || "",
          mapTitle: map?.getAttribute("title") || "",
          orientationMap: (() => {
            const svg = article?.querySelector('svg[data-tierra-blanca-orientation-map]');
            const bounds = svg?.getBoundingClientRect();
            return { width: bounds?.width || 0, height: bounds?.height || 0, text: svg?.textContent || "" };
          })(),
          faqCount: article?.querySelectorAll("dt").length || 0,
          imageCount: figures.length,
          imageAlts: figures.map(f => f.querySelector("img")?.getAttribute("alt") || ""),
          hasByline: article?.textContent?.includes("Travel & Outdoors Desk") || false,
          hasSourceNote: article?.textContent?.includes("How this guide was researched") || false,
          hasTrailComparison: !!document.querySelector('section[aria-labelledby="tierra-blanca-visit-decision"] table'),
          headingCount: article?.querySelectorAll("h1").length || 0,
          lazyArticleHydrated: document.documentElement.dataset.tdTierraBlancaHydrated === "1",
          editorialFirst: (() => {
            const hero = article?.querySelector('figure img[src*="palo-duro-canyon-state-park.jpg"]');
            const geography = article?.querySelector('section[aria-labelledby="first-answer"]');
            const citations = article?.querySelector('section[aria-labelledby="sources"]');
            const slot = article?.querySelector('[data-stay-nearby-slot]');
            const hotel = document.querySelector('#expedia-travel-surface');
            const follows = (earlier, later) => Boolean(earlier && later && earlier.compareDocumentPosition(later) & Node.DOCUMENT_POSITION_FOLLOWING);
            return {
              heroBeforeGeography: follows(hero?.closest("figure"), geography),
              geographyBeforeCommercial: follows(geography, slot),
              sourcesBeforeCommercial: follows(citations, slot),
              commercialInsideSlot: Boolean(slot && hotel && slot.contains(hotel)),
              noOtherCommercialBeforeSources: Boolean(citations && ![...article.querySelectorAll('#expedia-travel-surface, #td-stay-affiliate-options')].some(n => !slot?.contains(n))),
              heroLoaded: Boolean(hero && hero.complete && hero.naturalWidth > 500),
              heroFetchPriority: hero?.getAttribute("fetchpriority") || "",
            };
          })(),
        };
      });
      check("descriptive unique title", evidence.h1.includes("Tierra Blanca Creek") && evidence.headingCount === 1);
      check("canonical", evidence.canonical === BASE + PATH, evidence.canonical);
      check("real geographical map", evidence.mapSrc.startsWith("https://www.openstreetmap.org/export/embed.html?bbox=") && evidence.mapTitle.includes("official refuge"));
      check("agency-source orientation works without map tiles", evidence.orientationMap.width >= 260 && evidence.orientationMap.height >= 100 && evidence.orientationMap.text.includes("Buffalo Lake NWR") && evidence.orientationMap.text.includes("Palo Duro Canyon"), JSON.stringify(evidence.orientationMap).slice(0, 220));
      check("seven distinct substantive questions", evidence.faqCount >= 7, evidence.faqCount);
      check("transparent editorial methodology", evidence.hasByline && evidence.hasSourceNote);
      check("trail comparison rendered", evidence.hasTrailComparison);
      check("lazy article hydrated before commercial DOM injection", evidence.lazyArticleHydrated);
      check("editorial-first hero before map and geography", evidence.editorialFirst.heroBeforeGeography && evidence.editorialFirst.heroLoaded && evidence.editorialFirst.heroFetchPriority === "high", JSON.stringify(evidence.editorialFirst));
      check("lodging after editorial sources, not before the creek story", evidence.editorialFirst.geographyBeforeCommercial && evidence.editorialFirst.sourcesBeforeCommercial && evidence.editorialFirst.commercialInsideSlot && evidence.editorialFirst.noOtherCommercialBeforeSources, JSON.stringify(evidence.editorialFirst));
      check("photo alt text and credits", evidence.imageCount >= 3 && evidence.imageAlts.every(a => a.length > 35), JSON.stringify({ figures: evidence.imageCount, alts: evidence.imageAlts }));
      check("article has no horizontal overflow", evidence.articleHorizontalOverflow <= 4, evidence.articleHorizontalOverflow);
      check("viewport has no horizontal overflow", evidence.documentHorizontalOverflow <= 6, evidence.documentHorizontalOverflow);
      for (const urlFragment of ["buffalo-lake-snowscape.jpg", "rio_grande_wild_turkey_pair"]) {
        const photo = page.locator('img[src*="' + urlFragment + '"]');
        check("authentic FWS photo exists: " + urlFragment, await photo.count() === 1);
        if (await photo.count() === 1) {
          await photo.scrollIntoViewIfNeeded();
          const ok = await photo.evaluate(async img => {
            try {
              if (!img.complete) await Promise.race([
                new Promise(resolve => { img.addEventListener("load", resolve, { once: true }); img.addEventListener("error", resolve, { once: true }); }),
                new Promise(resolve => setTimeout(resolve, 12000)),
              ]);
              return img.naturalWidth > 300 && img.naturalHeight > 200;
            } catch { return false; }
          });
          check("FWS photo decoded: " + urlFragment, ok);
        }
      }
      check("no JS exceptions", row.pageErrors.length === 0, row.pageErrors.join("; "));
      row.screenshot = DIR + "/tierra-blanca-" + vp.name + ".png";
      await page.screenshot({ path: row.screenshot, fullPage: true, animations: "disabled", timeout: 30000 });
    } catch (error) {
      check("Chrome scenario completed", false, error?.stack || error);
    } finally {
      report.results.push(row);
      await context.close();
    }
  }
} finally {
  await browser.close();
  await writeFile(DIR + "/report.json", JSON.stringify(report, null, 2));
}
if (report.failures.length) {
  console.error("FAIL Tierra Blanca visual checks: " + JSON.stringify(report.failures));
  process.exit(1);
}
console.log("PASS Tierra Blanca desktop and mobile Chrome with real map, photo decoding, trust signals, trails, layout and screenshot evidence");
