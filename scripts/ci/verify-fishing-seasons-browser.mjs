/**
 * Real Chrome acceptance for the canonical fishing-seasons page.
 * Two viewport sizes; no sitewide crawl; no synthetic season predictions.
 * Requires current public origin. Read-only and non-destructive.
 */
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";

const { chromium } = createRequire(import.meta.url)(
  process.env.PLAYWRIGHT_CORE_PATH || "/tmp/texasdefined-fishing-seasons-qa/node_modules/playwright-core",
);
const origin = (process.env.PRODUCTION_ORIGIN || "https://texasdefined.com").replace(/\/$/, "");
const canonical = "https://texasdefined.com/fishing/seasons";
const output = "artifacts/fishing-seasons-browser";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true, executablePath: process.env.CHROME_BIN || "/usr/bin/google-chrome",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const failures = [], results = [];
const cases = [
  { name: "desktop", viewport: { width: 1366, height: 900 }, mobile: false },
  { name: "mobile", viewport: { width: 390, height: 844 }, mobile: true },
];
const months = ["January","February","March","April","May","June",
  "July","August","September","October","November","December"];
function isLoaded() {
  const vp = document.querySelector('meta[name="viewport"]')?.content || "";
  const css = [...document.querySelectorAll('link[rel="stylesheet"]')];
  const sourceLinks = document.querySelectorAll('section#month-checklist a[href^="https://tpwd.texas.gov/"]').length;
  return /width\s*=\s*device-width/i.test(vp)
    && css.length > 0 && css.every(link => Boolean(link.sheet))
    && sourceLinks >= 12
    && document.querySelectorAll('section#choose-month a[href*="month="]').length === 12;
}
for (const c of cases) {
  const context = await browser.newContext({ viewport: c.viewport,
    isMobile: c.mobile, hasTouch: c.mobile, deviceScaleFactor: 1 });
  await context.route(/googletagmanager|google-analytics|facebook\.com\/tr|\/api\/track/i, route => route.abort());
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", e => errors.push(String(e)));
  try {
    const resp = await page.goto(origin + "/fishing/seasons", { waitUntil: "domcontentloaded", timeout: 60000 });
    assert.equal(resp?.status(), 200, c.name + ": canonical page HTTP 200");
    await page.waitForLoadState("load", { timeout: 35000 });
    await page.getByRole("heading", { name: "Texas Lake Fishing Seasons by Month", exact: true })
      .waitFor({ state: "visible", timeout: 30000 });
    await page.waitForFunction(isLoaded, null, { timeout: 30000, polling: 250 });
    const root = await page.evaluate(() => ({
      title: document.title,
      h1: [...document.querySelectorAll("h1")].map(x => x.textContent.trim()),
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      robots: [...document.querySelectorAll('meta[name="robots"]')].map(x => x.content).join(" "),
      width: window.innerWidth, documentWidth: document.documentElement.scrollWidth,
      monthLinks: [...document.querySelectorAll('#choose-month a[href*="month="]')]
        .map(x => x.textContent.trim()),
      sourceLinks: document.querySelectorAll('section#month-checklist a[href^="https://tpwd.texas.gov/"]').length,
      advisories: document.body.textContent.includes("fish-consumption advisories"),
    }));
    assert.equal(root.canonical, canonical, c.name + ": canonical mismatch");
    assert.equal(root.h1.length, 1, c.name + ": duplicate/absent H1");
    assert.doesNotMatch(root.robots, /noindex/i);
    assert.equal(root.monthLinks.length, 12, c.name + ": missing month chooser choices");
    for (const m of months) assert.ok(root.monthLinks.some(x => x.includes(m)), c.name + ": missing " + m);
    assert.ok(root.sourceLinks >= 12, c.name + ": missing official month citations");
    assert.ok(root.documentWidth <= root.width + 8, c.name + ": horizontal page overflow");
    assert.ok(root.advisories, c.name + ": consumption pre-trip warning missing");
    await page.screenshot({ path: output + "/" + c.name + "-landing.png",
      fullPage: false, animations: "disabled" });

    // Exercise a real month-link click and hydration/navigation, not a direct
    // document fetch only. The selected panel must update and remain accessible.
    await page.locator('section#choose-month a[href*="month=apr"]').first().click();
    await page.waitForURL(/\/fishing\/seasons\?month=apr/, { timeout: 30000 });
    await page.getByText("April planning focus", { exact: true })
      .waitFor({ state: "visible", timeout: 30000 });
    assert.ok(await page.getByText("TPWD-documented example:", { exact: false }).count() > 0,
      c.name + ": April TPWD editorial evidence missing after click");
    assert.equal(await page.locator('section#choose-month a[href*="month=apr"]').first().getAttribute("aria-current"),
      "page", c.name + ": active April month not marked");
    await page.waitForFunction(isLoaded, null, { timeout: 25000 });
    const month = await page.evaluate(() => ({
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      width: window.innerWidth, documentWidth: document.documentElement.scrollWidth,
      selected: document.body.textContent.includes("April planning focus"),
      source: document.body.textContent.includes("Lake Meredith"),
    }));
    assert.equal(month.canonical, canonical, c.name + ": filtered page canonical mismatch");
    assert.ok(month.selected && month.source, c.name + ": missing month-specific research");
    assert.ok(month.documentWidth <= month.width + 8, c.name + ": filtered page horizontal overflow");
    assert.deepEqual(errors, [], c.name + ": uncaught browser exceptions");
    await page.screenshot({ path: output + "/" + c.name + "-april.png",
      fullPage: false, animations: "disabled" });
    results.push({ viewport: c.name, root, month, jsErrors: errors });
  } catch (error) {
    failures.push(c.name + ": " + String(error) + " JS errors=" + errors.join("; "));
    try { await page.screenshot({ path: output + "/" + c.name + "-failure.png",
      fullPage: false, animations: "disabled" }); } catch {}
  } finally {
    await context.close();
  }
}
await browser.close();
const report = { createdAt: new Date().toISOString(), origin, canonical,
  scope: "2 Chrome viewports; ordinary page and clicked April filter; 12 official month citations; no SEO/scroll/JS regressions",
  results, failures };
await writeFile(output + "/report.json", JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report));
assert.deepEqual(failures, [], "Fishing seasons desktop/mobile authority acceptance failed");
