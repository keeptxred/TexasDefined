/**
 * Fresh mobile/desktop Chrome acceptance of the actual published fishing planner.
 * Browser contexts are isolated. Unique query nonce, Cache-Control: no-store.
 * Runs on GitHub-hosted Chrome, not against saved search snapshots.
 */
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";

const { chromium } = createRequire(import.meta.url)(
  process.env.PLAYWRIGHT_CORE_PATH || "/tmp/td-planner-fresh-chrome/node_modules/playwright-core",
);
const origin = "https://texasdefined.com";
const outputDir = "artifacts/fishing-planner-fresh-chrome";
await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({
  headless: true, executablePath: process.env.CHROME_BIN || "/usr/bin/google-chrome",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const findings = [];
let broken = false;
for (const { device, viewport, mobile } of [
  { device: "desktop", viewport: { width: 1366, height: 900 }, mobile: false },
  { device: "mobile", viewport: { width: 390, height: 844 }, mobile: true },
]) {
  const context = await browser.newContext({
    viewport, isMobile: mobile, hasTouch: mobile,
    extraHTTPHeaders: { "Cache-Control": "no-cache, no-store", Pragma: "no-cache" },
  });
  await context.route(/google-analytics|googletagmanager|connect\.facebook\.net|facebook\.com\/tr|\/api\/analytics|\/api\/track/i, route => route.abort());
  const page = await context.newPage();
  const errors = [];
  let phase = "initial-navigation";
  page.on("pageerror", e => errors.push({ phase, url: page.url(), message: String(e), stack: e.stack ?? null }));
  const check = (value, message) => assert.ok(value, device + ": " + message);
  const path = "/fishing/plan?independent_fishing_chrome_review=" + randomUUID();
  try {
    const response = await page.goto(origin + path, { waitUntil: "load", timeout: 60000 });
    assert.equal(response?.status(), 200, device + ": unexpected HTTP result");
    const headers = await response.headers();
    check(!/hit|stale|updating/i.test(headers["cf-cache-status"] ?? ""), "non-fresh edge cache");
    check(!headers.age || Number(headers.age) === 0, "positive cached response age");
    const serverDate = Date.parse(headers.date ?? "");
    check(Number.isFinite(serverDate) && Math.abs(Date.now() - serverDate) < 180000, "server Date stale");
    const snapshot = await page.waitForFunction(() => {
      const allJson = [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(node => {
        try { const root = JSON.parse(node.textContent || "{}"); return root["@graph"] || [root]; } catch { return []; }
      });
      const itemList = allJson.find(x => x["@type"] === "ItemList");
      const text = document.body.innerText || "";
      const title = document.title;
      const h1 = [...document.querySelectorAll("h1")].map(x => x.innerText?.trim());
      const canonical = document.querySelector('link[rel="canonical"]')?.href;
      const result = {
        title, h1, canonical,
        itemCount: itemList?.numberOfItems,
        itemLinks: itemList?.itemListElement?.length,
        status: text.match(/Showing 12 of 72 matching lake cards/i)?.[0] ?? "",
        quickLinks: document.querySelectorAll('nav[aria-label="All matching fishing lake guides"] a').length,
        contentWidth: document.documentElement.scrollWidth, viewportWidth: window.innerWidth,
        h2: [...document.querySelectorAll("h2")].map(x => x.textContent?.trim()).slice(0, 6),
      };
      if (h1.length !== 1 || h1[0] !== "Find a Texas Fishing Lake"
        || canonical !== "https://texasdefined.com/fishing/plan"
        || itemList?.numberOfItems !== 72 || itemList.itemListElement.length !== 72
        || !result.status || result.quickLinks !== 72) {
        delete window.__plannerFreshStable;
        return false;
      }
      const sig = JSON.stringify(result);
      if (!window.__plannerFreshStable || window.__plannerFreshStable.sig !== sig) {
        window.__plannerFreshStable = { sig, since: performance.now() };
        return false;
      }
      return performance.now() - window.__plannerFreshStable.since >= 140 ? result : false;
    }, null, { timeout: 26000, polling: "raf" });
    const initial = await snapshot.jsonValue();
    await snapshot.dispose();
    assert.match(initial.title, /Texas Fishing Lake Finder/);
    check(initial.contentWidth <= initial.viewportWidth + 1, "horizontal overflow on list view");
    await page.screenshot({ path: outputDir + "/" + device + "-list.png", fullPage: false });
    const more = page.getByRole("button", { name: /Show 12 more lake cards/ });
    phase = "show-more-cards";
    await more.click({ timeout: 15000 });
    await page.getByText("Showing 24 of 72 matching lake cards").waitFor({ state: "visible", timeout: 10000 });
    phase = "map-navigation";
    await page.getByRole("link", { name: "Map", exact: true }).click();
    await page.waitForURL(/view=map/, { timeout: 12000 });
    const mapReady = await page.waitForFunction(() => {
      const count = document.body.innerText.match(/Map coverage:\s*72 of 72 matching lakes/i)?.[0] || "";
      const picker = document.querySelector("#fishing-map-lake-selector");
      const url = document.querySelector('link[rel="canonical"]')?.href;
      return count && picker?.options.length === 72 && url === "https://texasdefined.com/fishing/plan"
        ? { coverage: count, mappedOptions: picker.options.length, docWidth: document.documentElement.scrollWidth, innerWidth: innerWidth }
        : false;
    }, null, { timeout: 18000, polling: "raf" });
    const mapSnapshot = await mapReady.jsonValue();
    await mapReady.dispose();
    check(mapSnapshot.docWidth <= mapSnapshot.innerWidth + 1, "horizontal overflow on map view");
    const picker = page.locator("#fishing-map-lake-selector");
    const values = await picker.locator("option").evaluateAll(options => options.map(x => x.value));
    check(new Set(values).size === 72, "duplicate / unselectable reservoir options");
    const last = values.at(-1);
    phase = "map-lake-selection";
    await picker.selectOption(last);
    check(await picker.inputValue() === last, "map dropdown is not interactive after hydration");
    await page.screenshot({ path: outputDir + "/" + device + "-map.png", fullPage: false });
    phase = "post-hydration-stability";
    await page.waitForTimeout(850);
    check(errors.length === 0, "JavaScript runtime exceptions: " + JSON.stringify(errors));
    findings.push({ device, status: "PASS", cache: headers["cf-cache-status"] ?? null,
      age: headers.age ?? null, responseDate: headers.date ?? null,
      initial, map: mapSnapshot, interaction: "12→24 lake cards; live map route; 72 dropdown choices; last selected", pageErrors: errors });
  } catch (error) {
    broken = true;
    findings.push({ device, status: "FAIL", error: String(error), pageErrors: errors,
      currentUrl: page.url(), h1s: await page.locator("h1").allTextContents().catch(() => []) });
    await page.screenshot({ path: outputDir + "/" + device + "-failure.png", fullPage: false }).catch(() => {});
  } finally {
    await context.close();
  }
}
await browser.close();
const report = { auditedAt: new Date().toISOString(), method: "Fresh isolated Chrome contexts, one-time URL nonce and no-store headers", findings };
await writeFile(outputDir + "/results.json", JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
if (broken) process.exitCode = 1;
