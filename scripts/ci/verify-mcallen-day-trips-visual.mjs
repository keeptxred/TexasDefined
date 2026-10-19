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
