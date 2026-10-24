#!/usr/bin/env node
/** Read-only, bounded production browser QA for exactly one McAllen page,
 * two viewports. No sitewide scan, publishing or outbound affiliate clicks.
 */
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";

const ORIGIN = "https://texasdefined.com";
const PATH = "/explore/near/mcallen/day-trips";
const DIR = "artifacts/mcallen-day-trips-visual";
const VIEWPORTS = [
  { name: "desktop", width: 1365, height: 900, isMobile: false },
  { name: "mobile", width: 390, height: 844, isMobile: true },
];
const OPERATORS = [
  { name: "Quinta Mazatlán", slug: "quinta-mazatlan", href: "https://www.quintamazatlan.com/visit-explore/park-hours-admission" },
  { name: "Sabal Palm Sanctuary & Historic Rabb Plantation", slug: "sabal-palm-sanctuary", href: "https://www.sabalpalmsanctuary.org/" },
];
if (process.argv.includes("--self-test")) {
  assert.equal(VIEWPORTS.length, 2);
  assert.equal(new Set(VIEWPORTS.map(v => v.name)).size, VIEWPORTS.length);
  assert.equal(PATH, "/explore/near/mcallen/day-trips");
  assert.equal(OPERATORS.length, 2);
  assert.ok(["img.leaflet-tile-loaded", "canvas.maplibregl-canvas"].every(s => s.length > 10));
  assert.ok(OPERATORS.every(o => /^https:\/\/www\./.test(o.href) && o.slug));
  console.log("McAllen bounded visual QA scenario self-test passed.");
  process.exit(0);
}

const require = createRequire(import.meta.url);
const { chromium } = require("/tmp/texasdefined-mcallen-qa/node_modules/playwright-core");
await mkdir(DIR, { recursive: true });
const report = {
  checkedAt: new Date().toISOString(),
  targetSha: process.env.TARGET_DEPLOY_SHA || "",
  page: PATH, viewports: VIEWPORTS.map(v => v.name), results: [], failures: [],
};
const browser = await chromium.launch({
  headless: true, executablePath: process.env.CHROME_BIN || "/usr/bin/google-chrome",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
try {
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.isMobile, hasTouch: vp.isMobile, deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    const record = { viewport: vp.name, checks: [], screenshot: null, workerVersion: null, pageErrors: [] };
    const verify = (name, passed, detail = "") => {
      const row = { name, passed: Boolean(passed), detail: String(detail).slice(0, 300) };
      record.checks.push(row);
      if (!passed) report.failures.push({ viewport: vp.name, ...row });
    };
    page.on("pageerror", error => record.pageErrors.push(error.message.slice(0, 180)));
    try {
      const response = await page.goto(ORIGIN + PATH + "?mcallen_visual_acceptance=" + encodeURIComponent(report.targetSha.slice(0, 12) || "current"), {
        waitUntil: "domcontentloaded", timeout: 45000,
      });
      record.workerVersion = response?.headers()?.["x-texasdefined-worker-version"] || null;
      verify("canonical page returns 200", response?.status() === 200, response?.status());
      await page.locator("h2#mcallen-day-trip-guide").waitFor({ state: "visible", timeout: 25000 });
      // The page must hydrate before its first-party commercial scripts mount
      // the optional lodging panel in the explicit slot after the article.
      await page.locator('[data-stay-nearby-slot] #expedia-travel-surface').waitFor({ state: "attached", timeout: 20000 });
      await page.evaluate(() => document.fonts?.ready);
      const data = await page.evaluate(() => {
        const section = document.querySelector('section[aria-labelledby="mcallen-day-trip-guide"]');
        const cards = [...(section?.querySelectorAll("article") || [])];
        const find = name => cards.find(c => c.querySelector("h3")?.textContent.trim() === name);
        const details = name => {
          const card = find(name);
          const rect = card?.getBoundingClientRect();
          return { exists: !!card, text: card?.innerText || "", hrefs: [...(card?.querySelectorAll("a[href]") || [])].map(a => a.getAttribute("href")), x: rect?.x, y: rect?.y, bottom: rect?.bottom };
        };
        return {
          viewportWidth: innerWidth,
          documentWidth: document.documentElement.scrollWidth,
          h1: document.querySelector("h1")?.textContent?.trim() || "",
          canonical: document.querySelector('link[rel="canonical"]')?.href || "",
          cardCount: cards.length,
          firstCuratedHeading: cards[0]?.querySelector("h3")?.textContent.trim() || "",
          stayPanelInsideCuratedCard: cards.some(card => Boolean(card.querySelector('#expedia-travel-surface, #td-stay-affiliate-options, .td-stay-affiliate-options'))),
          stayPanelAfterGuide: Boolean(document.querySelector('[data-stay-nearby-slot] #expedia-travel-surface')) &&
            !section?.contains(document.getElementById("expedia-travel-surface")),
          quinta: details("Quinta Mazatlán"),
          sabal: details("Sabal Palm Sanctuary & Historic Rabb Plantation"),
          bentsen: details("Bentsen-Rio Grande Valley State Park"),
          pumphouse: details("Old Hidalgo Pumphouse Museum"),
          photosBroken: [...document.querySelectorAll("main img")].filter(img =>
            img.complete && !img.naturalWidth && img.getBoundingClientRect().width > 3 &&
            img.getBoundingClientRect().top >= 0 && img.getBoundingClientRect().top < innerHeight
          ).map(img => (img.currentSrc || img.src).slice(0, 120)).slice(0, 8),
        };
      });
      verify("McAllen heading visible", /McAllen/i.test(data.h1), data.h1);
      verify("canonical route correct", data.canonical === ORIGIN + PATH, data.canonical);
      verify("ten curated stops available", data.cardCount >= 10, data.cardCount);
      verify("every curated trip has a map selector", await page.locator('[aria-label="Select a featured McAllen day trip on the map"] button').count() === 10);
      verify("real map iframe available", await page.locator('iframe[title^="Interactive OpenStreetMap location of"]').count() === 1);

      // Exercise every map choice, not just the initial iframe. No outbound navigation.
      const featuredChoices = page.locator('[aria-label="Select a featured McAllen day trip on the map"] button');
      const featuredMap = page.locator('section[aria-labelledby="mcallen-featured-map"]');
      const checkedDestinations = new Set();
      for (let i = 0; i < 10; i++) {
        const choice = featuredChoices.nth(i);
        const name = (await choice.innerText()).trim();
        await choice.click();
        const pressed = await choice.getAttribute("aria-pressed");
        const frame = featuredMap.locator('iframe[title^="Interactive OpenStreetMap location of"]');
        const frameTitle = await frame.getAttribute("title");
        const frameSrc = await frame.getAttribute("src");
        const driveHref = await featuredMap.locator('a[href*="google.com/maps/dir/"]').getAttribute("href");
        const driveUrl = driveHref ? new URL(driveHref) : null;
        const destination = driveUrl?.searchParams.get("destination") || "";
        verify("map selection " + (i + 1) + " changes location", pressed === "true" &&
          frameTitle === "Interactive OpenStreetMap location of " + name &&
          frameSrc?.includes("openstreetmap.org/export/embed.html") &&
          frameSrc.includes("marker="), name);
        verify("map selection " + (i + 1) + " has named McAllen driving route",
          driveUrl?.searchParams.get("origin") === "McAllen, TX" &&
          driveUrl?.searchParams.get("travelmode") === "driving" &&
          destination.length >= 10, destination);
        checkedDestinations.add(destination);
      }
      verify("all ten featured routes have distinct destinations", checkedDestinations.size === 10, checkedDestinations.size);
      // Restore the initial selection so the full-page screenshots are comparable.
      await featuredChoices.first().click();
      await page.locator('#expedia-travel-surface[data-stay-consolidated="true"]').waitFor({ state: "attached", timeout: 15000 });
      verify("one consolidated lodging module", await page.locator('#expedia-travel-surface[data-stay-consolidated="true"]').count() === 1);
      verify("Quinta is the first destination heading", data.firstCuratedHeading === "Quinta Mazatlán", data.firstCuratedHeading);
      verify("lodging offers never interrupt curated destination cards", !data.stayPanelInsideCuratedCard);
      verify("optional lodging stays after curated guide", data.stayPanelAfterGuide);
      for (const operator of OPERATORS) {
        const card = operator.slug === "quinta-mazatlan" ? data.quinta : data.sabal;
        verify(operator.slug + " editorial card visible", card.exists, card.text.slice(0, 100));
        verify(operator.slug + " official visitor link", card.hrefs.includes(operator.href), JSON.stringify(card.hrefs));
        verify(operator.slug + " no invented destination guide", !card.hrefs.some(h => h?.startsWith("/destination/")), JSON.stringify(card.hrefs));
        verify(operator.slug + " helpful access advice", /Before you go:/.test(card.text), card.text.slice(-130));
      }
      verify("existing pumphouse canonical guide retained", data.pumphouse.hrefs.includes("/destination/old-hidalgo-pumphouse-museum"));
      verify("no horizontal page overflow", data.documentWidth <= data.viewportWidth + 2, data.documentWidth + " / " + data.viewportWidth);
      if (vp.name === "desktop") verify("multi-column cards at desktop width", data.quinta.x !== data.bentsen.x && Math.abs(data.quinta.y - data.bentsen.y) < 24, JSON.stringify({ quinta: data.quinta.x, bentsen: data.bentsen.x }));
      if (vp.name === "mobile") verify("cards stack without overlap on mobile", data.bentsen.y >= data.quinta.bottom - 3, JSON.stringify({ quintaBottom: data.quinta.bottom, bentsenTop: data.bentsen.y }));
      verify("no broken above-fold content images", data.photosBroken.length === 0, JSON.stringify(data.photosBroken));
      // A full-page screenshot does NOT automatically trigger native lazy images
      // below the fold. Scroll them into view and await load/error before QA
      // judges image readiness and captures its editorial screenshots.
      const loadedPhotos = await page.evaluate(async () => {
        const images = [...document.querySelectorAll("main img")].slice(0, 70);
        for (const img of images) {
          img.scrollIntoView({ block: "center", inline: "nearest" });
          if (img.complete) continue;
          await new Promise(resolve => {
            const finish = () => { clearTimeout(timeout); resolve(); };
            const timeout = setTimeout(finish, 6000);
            img.addEventListener("load", finish, { once: true });
            img.addEventListener("error", finish, { once: true });
          });
        }
        const featured = [...document.querySelectorAll('section[aria-labelledby="mcallen-day-trip-guide"] article figure img')];
        return {
          total: images.length,
          featuredTotal: featured.length,
          featuredLoaded: featured.filter(img => img.complete && img.naturalWidth > 0).length,
          failedFeatured: featured.filter(img => !img.complete || img.naturalWidth === 0).map(img => (img.currentSrc || img.src).slice(0, 140)),
          visiblyBroken: images.filter(img => img.isConnected && img.getBoundingClientRect().width > 3 && img.complete && img.naturalWidth === 0)
            .map(img => (img.currentSrc || img.src).slice(0, 140)),
        };
      });
      verify("featured photos load after actually scrolling", loadedPhotos.featuredTotal >= 3 &&
        loadedPhotos.featuredTotal === loadedPhotos.featuredLoaded,
        JSON.stringify(loadedPhotos));
      verify("no broken images in scrolled page", loadedPhotos.visiblyBroken.length === 0,
        JSON.stringify(loadedPhotos.visiblyBroken));
      // The final map choice restores the first iframe, which is also lazy.
      // Bring it into the viewport and check a real Leaflet tile renders,
      // rather than accepting an empty iframe element as a functioning map.
      const mapFrame = page.locator('iframe[title^="Interactive OpenStreetMap location of"]');
      await mapFrame.scrollIntoViewIfNeeded({ timeout: 15000 });
      // OSM migrated /export/embed.html from Leaflet to MapLibre in April 2026.
      // A Leaflet-only selector silently rejects a working canvas map.
      // Capture the iframe while it is ACTUALLY in the viewport: Chrome's
      // full-page screenshot can omit cross-origin iframe composites after
      // scrolling away, yielding a misleading empty rectangle.
      const mapRenderer = await page.frameLocator('iframe[title^="Interactive OpenStreetMap location of"]')
        .locator("img.leaflet-tile-loaded, canvas.maplibregl-canvas")
        .first().waitFor({ state: "visible", timeout: 15000 })
        .then(() => true).catch(() => false);
      await page.waitForTimeout(1200);
      const mapScreenshot = await mapFrame.screenshot({
        path: DIR + "/mcallen-embedded-map-" + vp.name + ".png",
        animations: "disabled", timeout: 20000,
      });
      // A truly blank iframe compresses to a few KB; ordinary cartographic
      // details generate a larger raster even at mobile dimensions. Fail closed
      // and preserve the image for human inspection rather than trusting DOM
      // existence alone.
      verify("selected map visually renders after scroll",
        mapRenderer && mapScreenshot.byteLength > 18000,
        "renderer=" + mapRenderer + "; pngBytes=" + mapScreenshot.byteLength);
      await page.evaluate(() => window.scrollTo(0, 0));
      const filename = DIR + "/mcallen-day-trips-" + vp.name + ".png";
      await page.screenshot({ path: filename, fullPage: true, animations: "disabled", timeout: 30000 });
      record.screenshot = filename;
      verify("no React hydration mismatch", record.pageErrors.every(e => !/React error #418|react\.dev\/errors\/(418|423)|hydration mismatch/i.test(e)), JSON.stringify(record.pageErrors));
    } catch (error) {
      verify("browser scenario completed", false, error?.message || error);
      await page.screenshot({ path: DIR + "/mcallen-failed-" + vp.name + ".png", fullPage: false, timeout: 10000 }).catch(() => {});
    } finally {
      report.results.push(record);
      await context.close();
    }
  }
} finally {
  await browser.close();
  await writeFile(DIR + "/qa-report.json", JSON.stringify(report, null, 2));
}
for (const result of report.results) {
  console.log(result.viewport + ": " + result.checks.filter(c => c.passed).length + "/" + result.checks.length + " checks passed; screenshot " + (result.screenshot || "unavailable"));
}
if (report.failures.length) {
  console.error("McAllen focused Chrome QA failures: " + JSON.stringify(report.failures));
  process.exitCode = 1;
} else {
  console.log("PASS McAllen day trips desktop/mobile Chrome QA; screenshots saved.");
}
