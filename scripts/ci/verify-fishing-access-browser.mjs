/**
 * Real Chrome acceptance for the ordinary public fishing access directory.
 * Exercise a real form submit and both viewport sizes; no sitewide crawl.
 */
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || "/tmp/texasdefined-fishing-access-qa/node_modules/playwright-core");
const origin = (process.env.PRODUCTION_ORIGIN || "https://texasdefined.com").replace(/\/$/, "");
const canonical = "https://texasdefined.com/fishing/access";
const output = "artifacts/fishing-access-browser";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROME_BIN || "/usr/bin/google-chrome",
  headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const results = [], failures = [];
const cases = [
  { name: "desktop", viewport: { width: 1366, height: 900 }, mobile: false },
  { name: "mobile", viewport: { width: 390, height: 844 }, mobile: true },
];
async function listed(page, site, type) {
  const row = page.locator("article").filter({ has: page.getByRole("heading", { name: site, exact: true }) });
  assert.equal(await row.count(), 1, site + " must appear exactly once");
  assert.equal((await row.locator("p.eyebrow").first().innerText()).trim().toLowerCase(), type, site + " type mismatch");
  const source = await row.getByRole("link", { name: /TPWD source and conditions/ }).getAttribute("href");
  assert.match(source ?? "", /^https:\/\/tpwd\.texas\.gov\/fishboat\/fish\/recreational\/lakes\/[a-z_]+\/access(?:2)?\.phtml$/);
}
for (const { name, viewport, mobile } of cases) {
  const context = await browser.newContext({ viewport, isMobile: mobile, hasTouch: mobile });
  await context.route(/googletagmanager|google-analytics|facebook\.com\/tr|\/api\/track/i, route => route.abort());
  const page = await context.newPage();
  const jsErrors = [];
  page.on("pageerror", e => jsErrors.push(String(e)));
  try {
    const resp = await page.goto(origin + "/fishing/access", { waitUntil: "load", timeout: 60000 });
    assert.equal(resp?.status(), 200, "ordinary public directory HTTP status");
    await page.getByRole("heading", { name: "Texas Fishing Access", exact: true }).waitFor({ timeout: 25000 });
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), canonical);
    assert.doesNotMatch((await page.locator('meta[name="robots"]').allTextContents()).join(" "), /noindex/i);
    for (const [site, kind] of [
      ["Arkansas Bend", "boat ramp"],
      ["Bachman Lake public bank-fishing shoreline", "shore"],
      ["Paddle Point Park", "kayak launch"],
      ["Bear Creek Park", "boat ramp"],
    ]) await listed(page, site, kind);
    const before = await page.evaluate(() => ({
      width: document.documentElement.scrollWidth, viewport: window.innerWidth,
      count: document.querySelectorAll("article").length,
    }));
    assert.ok(before.width <= before.viewport + 8, name + ": horizontal page overflow");
    assert.ok(before.count >= 300, name + ": unexpectedly small source-backed access directory");
    await page.screenshot({ path: output + "/" + name + "-directory.png", fullPage: false, animations: "disabled" });

    const tests = [
      { type: "boat-ramp", present: ["Arkansas Bend", "Bear Creek Park"], absent: ["Paddle Point Park", "Bachman Lake public bank-fishing shoreline"] },
      { type: "shore", present: ["Bachman Lake public bank-fishing shoreline"], absent: ["Arkansas Bend", "Bear Creek Park"] },
      { type: "kayak-launch", present: ["Paddle Point Park"], absent: ["Arkansas Bend", "Bachman Lake public bank-fishing shoreline"] },
    ];
    for (const t of tests) {
      const select = page.getByLabel("Access type", { exact: true });
      await select.selectOption(t.type);
      await Promise.all([
        page.waitForURL(new RegExp("kind=" + t.type), { timeout: 30000 }),
        page.getByRole("button", { name: "Apply filters" }).click(),
      ]);
      for (const site of t.present) await listed(page, site, t.type === "boat-ramp" ? "boat ramp" : t.type === "kayak-launch" ? "kayak launch" : "shore");
      for (const site of t.absent) assert.equal(await page.getByRole("heading", { name: site, exact: true }).count(), 0, t.type + " filter leaked " + site);
      assert.ok((await page.evaluate(() => document.documentElement.scrollWidth)) <= viewport.width + 8, name + "/" + t.type + ": overflow");
      await page.getByRole("link", { name: "Clear" }).click();
      await page.waitForURL(origin + "/fishing/access", { timeout: 30000 });
    }
    assert.deepEqual(jsErrors, [], name + ": uncaught JavaScript exceptions");
    results.push({ viewport: name, renderedFacilities: before.count, canonical, browserFilters: true, sourceLinks: true, noOverflow: true, errors: jsErrors });
  } catch (error) {
    failures.push(name + ": " + String(error) + "; errors=" + jsErrors.join(";"));
    try { await page.screenshot({ path: output + "/" + name + "-failure.png", fullPage: false }); } catch {}
  } finally {
    await context.close();
  }
}
await browser.close();
const report = { checkedAt: new Date().toISOString(), origin, canonical, results, failures, conditions: "Ordinary public URL; real desktop/mobile Chrome; source-labeled access rows and three filters" };
await writeFile(output + "/report.json", JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report));
assert.deepEqual(failures, [], "Fishing access real-browser acceptance failed");