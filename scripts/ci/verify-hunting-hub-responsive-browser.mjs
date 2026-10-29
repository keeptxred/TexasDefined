import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || "/tmp/texasdefined-wp-qa/node_modules/playwright-core");
const origin = (process.env.PRODUCTION_ORIGIN || "https://texasdefined.com").replace(/\/$/, "");
const output = "artifacts/hunting-hub-responsive";
const url = origin + "/hunting";
const results = [];
await mkdir(output, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_BIN || "/usr/bin/google-chrome",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
try {
  for (const spec of [
    { label: "desktop", width: 1440, height: 900, mobile: false },
    { label: "mobile-390", width: 390, height: 844, mobile: true },
    { label: "small-mobile-320", width: 320, height: 720, mobile: true },
  ]) {
    const context = await browser.newContext({
      viewport: { width: spec.width, height: spec.height },
      deviceScaleFactor: 1,
      isMobile: spec.mobile,
      hasTouch: spec.mobile,
    });
    await context.route(/(?:google-analytics|googletagmanager|connect\.facebook\.net|facebook\.com\/tr|\/api\/analytics|\/api\/track)/i, (route) => route.abort());
    const page = await context.newPage();
    const pageErrors = [];
    page.on("pageerror", (error) => pageErrors.push(String(error)));
    const response = await page.goto(url + "?hunting-visual-proof=" + encodeURIComponent(process.env.GITHUB_SHA || "audit"), { waitUntil: "domcontentloaded", timeout: 45000 });
    assert.equal(response?.status(), 200, "hunting visual response");
    await page.locator("#hunting-season-planner").waitFor({ state: "visible", timeout: 20000 });
    await page.locator('img[alt^="White-tailed deer in Texas brush habitat"]').evaluate(async (image) => { try { await image.decode(); } catch {} });
    await page.waitForFunction(() => document.documentElement.dataset.tdRootHydrated === "1", undefined, { timeout: 25000 });

    const select = page.locator("#hunting-species-select");
    assert.equal(await select.locator("option").count(), 19, "all season options uniquely present");
    await select.selectOption("species:Snipe");
    assert.match(await page.locator("#hunting-season-planner h3").innerText(), /^Snipe · /, "Snipe season selected");
    await select.selectOption("species:Woodcock");
    assert.match(await page.locator("#hunting-season-planner h3").innerText(), /^Woodcock · /, "Woodcock selection must not collide with Snipe");
    await select.selectOption("species:Goose");
    assert.match(await page.locator("#hunting-season-planner h3").innerText(), /^Goose · /, "Goose season selected");
    assert.ok(await page.locator("#hunting-season-planner a[href='/hunting/goose-hunting']").count(), "Goose has its own guide");
    // Native select controls must work with keyboard, not just injected selectOption.
    await select.focus();
    assert.equal(await page.evaluate(() => document.activeElement?.id), "hunting-species-select", "keyboard focus reaches species");
    await page.keyboard.press("Home");
    await page.keyboard.press("ArrowDown");
    await page.waitForFunction(() => document.querySelector("#hunting-species-select")?.value === "turkey", undefined, { timeout: 5000 });
    assert.match(await page.locator("#hunting-season-planner h3").innerText(), /^Wild turkey · /, "keyboard selection must update rendered guide");


    const county = page.locator("#hunting-access-county");
    assert.equal(await county.locator("option").count(), 255, "254 counties plus all-county option");
    await county.selectOption("harris");
    assert.ok((await page.locator("#public-hunting-planner").innerText()).includes("Harris County"), "county-specific planning handoff");
    await county.focus();
    assert.equal(await page.evaluate(() => document.activeElement?.id), "hunting-access-county", "county selector keyboard focus");
    await page.keyboard.press("Home");
    await page.waitForFunction(() => document.querySelector("#hunting-access-county")?.value === "", undefined, { timeout: 5000 });
    await page.keyboard.press("Tab");
    assert.equal(await page.evaluate(() => document.activeElement?.id), "hunting-access-game", "county keyboard Tab advances to game without trapping focus");
    await page.keyboard.press("Tab");
    assert.equal(await page.evaluate(() => document.activeElement?.id), "hunting-access-type", "game keyboard Tab advances to access program");

    const facts = await page.evaluate(() => {
      const offer = document.querySelector("section[aria-labelledby='hunting-travel-options']");
      return {
        h1: [...document.querySelectorAll("h1")].map(el => el.textContent?.trim()),
        canonical: document.querySelector('link[rel="canonical"]')?.href,
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        heroLoaded: [...document.images].filter(el => /White-tailed deer in Texas brush habitat/.test(el.alt)).length === 1 && [...document.images].filter(el => /White-tailed deer in Texas brush habitat/.test(el.alt)).every(el => el.complete && el.naturalWidth > 0),
        publicAccess: document.querySelector("#public-hunting-planner")?.textContent?.includes("does not prefilter TPWD") || document.querySelector("#public-hunting-planner")?.textContent?.includes("does not prefilter TPWD's website"),
        links: [...(offer?.querySelectorAll("[data-commercial-partner]") || [])].map(el => ({ partner: el.dataset.commercialPartner, rel: el.rel, url: el.href, placement: el.dataset.commercialPlacement })),
        disclosure: offer?.textContent?.includes("Affiliate disclosure:"),
        noindex: /noindex/i.test(document.querySelector('meta[name="robots"]')?.content || ""),
      };
    });
    assert.deepEqual(facts.h1.length, 1, "single hunting hub H1");
    assert.equal(facts.canonical, url, "canonical hunting URL");
    assert.ok(facts.overflow <= 3, "no horizontal overflow (" + facts.overflow + "px)");
    assert.ok(facts.heroLoaded, "hero loaded with descriptive alt text");
    assert.equal(facts.noindex, false, "hub indexable");
    assert.ok(facts.publicAccess, "public land finder must not pretend TPWD was prefiltered");
    assert.equal(facts.links.length, 2, "two optional disclosed travel affiliates");
    assert.ok(facts.disclosure, "visible affiliate disclosure");
    for (const link of facts.links) {
      assert.ok(link.url.startsWith("https://"), "affiliate HTTPS");
      assert.ok(link.rel.includes("sponsored") && link.rel.includes("nofollow"), "affiliate rel");
      assert.equal(link.placement, "hunting-hub-trip", "route scoped placement");
    }
    assert.equal(pageErrors.length, 0, "no React runtime errors: " + pageErrors.join(" | "));
    await page.screenshot({ path: output + "/" + spec.label + ".png", fullPage: true });
    results.push({ viewport: spec.label, ...facts, errors: pageErrors });
    await context.close();
  }
} finally { await browser.close(); }
await writeFile(output + "/evidence.json", JSON.stringify({ commit: process.env.GITHUB_SHA, results }, null, 2));
console.log("PASS Hunting hub 1440/390/320px Chrome, keyboard selector navigation, SEO, hero, access finder, unique species and affiliate disclosure");
