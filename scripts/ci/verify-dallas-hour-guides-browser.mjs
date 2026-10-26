#!/usr/bin/env node
/** Bounded read-only Dallas road-time guide browser acceptance: three URLs, two viewports. */
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";

const ORIGIN = "https://texasdefined.com";
const OUTPUT = "artifacts/dallas-hour-guides-browser";
const GUIDES = [
  { path: "/explore/near/dallas/small-towns-1-hour", title: "Small Towns About an Hour or Less From Dallas, Texas", town: "Ennis" },
  { path: "/explore/near/dallas/small-towns-2-hours", title: "Small Towns About 1–2 Hours From Dallas, Texas", town: "Clifton" },
  { path: "/explore/near/dallas/small-towns-3-hours", title: "Small Towns About 2–3 Hours From Dallas, Texas", town: "Salado" },
];
const VIEWPORTS = [
  { name: "desktop", width: 1365, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];
if (process.argv.includes("--self-test")) {
  assert.equal(GUIDES.length, 3);
  assert.equal(VIEWPORTS.length, 2);
  assert.equal(new Set(GUIDES.map(g => g.path)).size, 3);
  assert.ok(GUIDES.every(g => g.path.startsWith("/explore/near/dallas/") && g.town && g.title));
  console.log("Dallas 3-page/2-viewport browser acceptance contract passed.");
  process.exit(0);
}
const require = createRequire(import.meta.url);
const { chromium } = require("/tmp/texasdefined-dallas-qa/node_modules/playwright-core");
await mkdir(OUTPUT, { recursive: true });
const report = { checkedAt: new Date().toISOString(), targetSha: process.env.TARGET_DEPLOY_SHA || "", results: [], failures: [] };
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || "/usr/bin/google-chrome", args: ["--no-sandbox", "--disable-dev-shm-usage"] });
try {
  for (const guide of GUIDES) {
    for (const viewport of VIEWPORTS) {
      const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, isMobile: viewport.name === "mobile", hasTouch: viewport.name === "mobile", deviceScaleFactor: 1 });
      const page = await context.newPage();
      const record = { path: guide.path, viewport: viewport.name, checks: [], errors: [], screenshot: null, workerVersion: null };
      const check = (name, okay, detail = "") => {
        const result = { name, passed: Boolean(okay), detail: String(detail).slice(0, 400) };
        record.checks.push(result);
        if (!result.passed) report.failures.push({ path: guide.path, viewport: viewport.name, ...result });
      };
      page.on("pageerror", e => record.errors.push(String(e.message).slice(0, 200)));
      try {
        const url = ORIGIN + guide.path + "?dallas_qa=" + encodeURIComponent(report.targetSha.slice(0, 12) || "current");
        const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
        record.workerVersion = response?.headers()?.["x-texasdefined-worker-version"] || null;
        check("HTTP 200", response?.status() === 200, response?.status());
        await page.locator("[data-dallas-road-guide]").waitFor({ state: "visible", timeout: 35000 });
        await page.locator('section[aria-labelledby="dallas-small-town-map"]').waitFor({ state: "visible", timeout: 25000 });
        await page.evaluate(() => document.fonts?.ready);
        const data = await page.evaluate(() => {
          const table = document.querySelector("[data-dallas-road-guide] table");
          const scroller = table?.parentElement;
          return {
            title: document.querySelector("h1")?.textContent?.trim() || "",
            canonical: document.querySelector('link[rel="canonical"]')?.href || "",
            viewportWidth: innerWidth,
            documentWidth: document.documentElement.scrollWidth,
            tableRows: table?.querySelectorAll("tbody tr").length || 0,
            tableWidth: scroller?.scrollWidth || 0,
            tableViewport: scroller?.clientWidth || 0,
            tableOverflow: scroller ? getComputedStyle(scroller).overflowX : "",
            disclaimer: document.querySelector("[data-dallas-road-guide]")?.textContent || "",
            tableText: table?.textContent || "",
          };
        });
        check("canonical", data.canonical === ORIGIN + guide.path, data.canonical);
        check("published new road-time title", data.title === guide.title, data.title);
        check("source-based one-way duration explanation", data.disclaimer.includes("published typical one-way road-time estimates"));
        check("not displaying geographic ring heading", !data.title.includes("Farther Small-Town Escapes"));
        check("source-backed table populated", data.tableRows >= 3, data.tableRows);
        check("expected representative town", data.tableText.includes(guide.town), guide.town);
        check("each table row has a duration source and live route", await page.locator("[data-dallas-road-guide] tbody tr").count() === await page.locator('[data-dallas-road-guide] tbody tr a[href^="https://www.travelmath.com/driving-time/"]').count() && await page.locator("[data-dallas-road-guide] tbody tr").count() === await page.locator('[data-dallas-road-guide] tbody tr a[href^="https://www.google.com/maps/dir/"]').count());
        check("no page-level horizontal overflow", data.documentWidth <= data.viewportWidth + 2, data.documentWidth + " / " + data.viewportWidth);
        if (viewport.name === "mobile") check("driving-time table scrolls horizontally, not entire page", data.tableWidth > data.tableViewport && data.tableOverflow === "auto", JSON.stringify({ tableWidth: data.tableWidth, viewport: data.tableViewport, overflow: data.tableOverflow }));
        const buttons = page.getByRole("group", { name: "Choose a Dallas small town on the map" }).locator("button");
        const count = await buttons.count();
        check("interactive map options available", count >= 3, count);
        const sample = [...new Set([0, Math.floor(count / 2), count - 1])].filter(n => n >= 0);
        const locations = new Set();
        for (const n of sample) {
          const btn = buttons.nth(n);
          const name = (await btn.locator("span").first().innerText()).trim();
          await btn.click();
          const state = await page.evaluate(() => {
            const map = document.querySelector('section[aria-labelledby="dallas-small-town-map"]');
            const frame = map?.querySelector("iframe");
            const href = [...(map?.querySelectorAll("a[href]") || [])].find(a => a.textContent.includes("Check current driving route"))?.href;
            return { title: frame?.title, src: frame?.getAttribute("src"), href };
          });
          check("map selection " + n + " sets active town and marker", await btn.getAttribute("aria-pressed") === "true" && state.title === "Interactive location map of " + name + ", Texas" && state.src?.includes("openstreetmap.org/export/embed.html") && state.src?.includes("marker="), JSON.stringify({ name, frameTitle: state.title }));
          const live = state.href ? new URL(state.href) : null;
          const destination = live?.searchParams.get("destination") || "";
          check("map selection " + n + " retains Dallas driving directions", live?.searchParams.get("origin") === "Dallas, TX" && live?.searchParams.get("travelmode") === "driving" && destination === name + ", Texas", state.href);
          locations.add(destination);
        }
        check("tested selections are distinct", locations.size === sample.length, locations.size);
        await buttons.first().click();
        if (guide.path.endsWith("1-hour")) {
          const image = page.locator('img[alt^="Red sandstone Ellis County Courthouse"]');
          await image.scrollIntoViewIfNeeded();
          await image.evaluate(img => img.decode().catch(() => {}));
          const details = await image.evaluate(img => ({ ready: img.complete && img.naturalWidth > 0, src: img.currentSrc || img.src }));
          check("Waxahachie photo loads", details.ready, details.src);
          check("photo uses sized Wikimedia image", details.src.includes("/thumb/") && details.src.includes("/1280px-"), details.src);
          check("photo attribution present", await page.locator('figcaption a[href="https://creativecommons.org/licenses/by/2.0/"]').count() > 0);
        }
        check("no React hydration exception", !record.errors.some(e => /hydration|React error #418|React error #423/i.test(e)), JSON.stringify(record.errors));
        await page.evaluate(() => window.scrollTo(0, 0));
        const name = guide.path.split("/").at(-1) + "-" + viewport.name + ".png";
        const shot = OUTPUT + "/" + name;
        await page.screenshot({ path: shot, fullPage: true, animations: "disabled", timeout: 30000 });
        record.screenshot = shot;
      } catch (err) {
        check("browser scenario completed", false, err?.message || err);
        await page.screenshot({ path: OUTPUT + "/failed-" + guide.path.split("/").at(-1) + "-" + viewport.name + ".png", timeout: 10000 }).catch(() => {});
      } finally {
        report.results.push(record);
        await context.close();
      }
    }
  }
} finally {
  await browser.close();
  await writeFile(OUTPUT + "/qa-report.json", JSON.stringify(report, null, 2));
}
for (const result of report.results) console.log(result.path + " " + result.viewport + ": " + result.checks.filter(c => c.passed).length + "/" + result.checks.length + " checks; screenshot=" + (result.screenshot || "none"));
if (report.failures.length) {
  console.error("FAIL Dallas road-time guide Chrome acceptance: " + JSON.stringify(report.failures));
  process.exitCode = 1;
} else {
  console.log("PASS Dallas three guide desktop/mobile Chrome acceptance; six screenshots and evidence saved.");
}
