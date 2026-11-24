import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";

const guides = [
  ["mountain-biking", "mtb-route-progression"],
  ["horseback-riding", "horse-reservation-decisions"],
  ["ohv", "ohv-permit-before-towing"],
  ["paddling", "paddle-launch-selection"],
  ["stargazing", "dark-sky-observing-window"],
];
const widths = [320, 390, 1440];
assert.equal(new Set(guides.map(g => g[0])).size, 5);
assert.equal(widths.length * guides.length, 15);
if (process.argv.includes("--self-test")) {
  console.log("Five-guide browser contract: PASS");
  process.exit(0);
}
const require = createRequire(import.meta.url);
const { chromium } = require("/tmp/texasdefined-outdoor-qa/node_modules/playwright-core");
const browser = await chromium.launch({ executablePath: process.env.CHROME_BIN, headless: true, args: ["--no-sandbox"] });
const output = ".artifacts/outdoor-browser";
fs.mkdirSync(output, { recursive: true });
const results = [];
const errors = [];
try {
  for (const [guide, marker] of guides) {
    for (const width of widths) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
      const page = await context.newPage();
      const path = "/texas-" + guide + "-guide";
      try {
        const response = await page.goto("https://texasdefined.com" + path + "?outdoor_browser=" + encodeURIComponent(process.env.GITHUB_RUN_ID || "manual"), { waitUntil: "domcontentloaded", timeout: 45000 });
        assert.equal(response.status(), 200);
        await page.locator("#" + marker).waitFor({ state: "visible", timeout: 20000 });
        // Wait for the client navigation to hydrate; otherwise SSR-only snapshots
        // can falsely pass mobile parity immediately before a Suspense replacement.
        await page.waitForFunction(() => {
          const toggle = document.querySelector('button[aria-controls="mobile-main-menu"]');
          return toggle instanceof HTMLButtonElement && !toggle.disabled;
        }, null, { timeout: 25000 });
        assert.equal(await page.locator("main h1").count(), 1, "exactly one H1");
        const hero = page.locator("main article figure img").first();
        await hero.scrollIntoViewIfNeeded();
        await hero.evaluate(async img => { await img.decode(); });
        // Decode the supplementary real-place photograph, not only the primary hero.
        const additionalPhoto = page.locator('section[aria-labelledby="extended-trip-planning"] figure img');
        if (guide !== "ohv") {
          assert.equal(await additionalPhoto.count(), 1, "missing supplementary location photo");
          await additionalPhoto.scrollIntoViewIfNeeded();
          await additionalPhoto.evaluate(async img => { await img.decode(); });
          assert.ok(await additionalPhoto.evaluate(img => img.naturalWidth >= 600 && img.naturalHeight >= 300 && img.alt.length > 0), "supplementary photo failed decode or alt");
        }
        const metrics = await page.evaluate(({ width, marker }) => {
          const cards = document.querySelector('[aria-label="Mobile comparison summary"]');
          const region = cards?.nextElementSibling;
          const tidy = s => s.replace(/\s+/g, " ").trim();
          const cardRows = Array.from(cards?.children || []).map(c => Array.from(c.querySelectorAll("h3,dd")).map(e => tidy(e.textContent)));
          const tableRows = Array.from(region?.querySelectorAll("tbody tr") || []).map(r => Array.from(r.cells).map(e => tidy(e.textContent)));
          const isVisible = e => !!e && e.getClientRects().length > 0 && getComputedStyle(e).display !== "none";
          if (width >= 768) region?.focus();
          const hero = document.querySelector("main article figure img");
          const section = document.getElementById(marker)?.closest("section");
          return {
            viewport: document.documentElement.clientWidth,
            documentWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
            canonical: document.querySelector('link[rel="canonical"]')?.href,
            robots: Array.from(document.querySelectorAll('meta[name="robots"]')).map(e => e.content),
            h1Count: document.querySelectorAll("main h1").length,
            cardsVisible: isVisible(cards),
            tableVisible: isVisible(region),
            tableRegion: region?.getAttribute("role"),
            desktopFocusable: region?.tabIndex === 0 && document.activeElement === region,
            cardRows,
            tableRows,
            columnHeaders: region?.querySelectorAll('thead th[scope="col"]').length,
            hero: { src: hero?.currentSrc, width: hero?.naturalWidth, height: hero?.naturalHeight, alt: hero?.alt },
            accessMaps: section?.querySelectorAll('figure svg[role="img"]').length,
            accessPoints: section?.querySelectorAll('figure ol a[href^="https://www.google.com/maps/search/"]').length,
          };
        }, { width, marker });
        assert.ok(metrics.documentWidth <= width + 1, "viewport overflow: " + metrics.documentWidth);
        assert.equal(metrics.canonical, "https://texasdefined.com" + path);
        assert.ok(!metrics.robots.some(value => /noindex/i.test(value)));
        assert.equal(metrics.h1Count, 1);
        assert.equal(metrics.cardsVisible, width < 768);
        assert.equal(metrics.tableVisible, width >= 768);
        assert.equal(metrics.tableRegion, "region");
        assert.ok(metrics.columnHeaders >= 3);
        assert.ok(metrics.cardRows.length >= 5);
        assert.deepEqual(metrics.cardRows, metrics.tableRows, "mobile comparison must retain every desktop fact");
        if (width >= 768) assert.ok(metrics.desktopFocusable);
        assert.ok(metrics.hero.width >= 600 && metrics.hero.height >= 300 && metrics.hero.alt, "hero not decoded or lacks meaningful alt");
        if (guide === "paddling") {
          assert.equal(metrics.accessMaps, 5);
          assert.equal(metrics.accessPoints, 26);
        }
        await page.locator('[aria-label="Mobile comparison summary"]').evaluate(e => (e.getClientRects().length ? e : e.nextElementSibling).scrollIntoView({ block: "start" }));
        const screenshot = output + "/" + guide + "-" + width + ".png";
        await page.screenshot({ path: screenshot });
        assert.ok(fs.statSync(screenshot).size > 1000);
        results.push({ guide, width, screenshot, workerVersion: response.headers()["x-worker-version"] || null, metrics });
      } catch (error) {
        errors.push({ guide, width, message: String(error) });
        await page.screenshot({ path: output + "/" + guide + "-" + width + "-failure.png" }).catch(() => {});
      } finally {
        await context.close();
      }
    }
  }
} finally {
  await browser.close();
  fs.writeFileSync(output + "/report.json", JSON.stringify({ checkedAt: new Date().toISOString(), results, errors }, null, 2));
}
console.log(JSON.stringify({ successes: results.length, errors }));
if (errors.length || results.length !== 15) process.exitCode = 1;
