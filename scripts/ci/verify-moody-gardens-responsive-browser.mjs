/**
 * One-page, four-viewport production Chrome audit.
 * Reuses the Playwright Core and Chrome already installed in protected deploy.
 * No new crawler, account access, purchases or browser-side network writes.
 */
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH
  || "/tmp/texasdefined-wp-qa/node_modules/playwright-core");
const canonical = "https://texasdefined.com/destination/moody-gardens";
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_BIN || "/usr/bin/google-chrome",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
try {
  for (const width of [320, 390, 768, 1280]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      isMobile: width <= 390,
      hasTouch: width <= 390,
      deviceScaleFactor: 1,
    });
    await context.route(/(?:google-analytics|googletagmanager|connect\.facebook\.net|facebook\.com\/tr|\/api\/analytics|\/api\/track)/i,
      route => route.abort());
    try {
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", error => errors.push(String(error)));
      const response = await page.goto(canonical + "?moody_responsive=" +
        (process.env.GITHUB_SHA || "check").slice(0, 12) + "-" + width,
        { waitUntil: "domcontentloaded", timeout: 45000 });
      assert.equal(response?.status(), 200, width + "px HTTP");
      await page.getByRole("heading", { name: "How to visit Moody Gardens without wasting time or ticket money" })
        .waitFor({ state: "visible", timeout: 15000 });
      // The SSR title is correct, but hydrated route metadata previously reverted
      // to the generic destination title at 1280px. Check after hydration settles.
      await page.waitForLoadState("load", { timeout: 15000 });
      await page.waitForTimeout(450);
      const facts = await page.evaluate(() => {
        const body = document.body.innerText;
        const links = [...document.querySelectorAll("a[href]")].map(a => a.href);
        const scripts = [...document.querySelectorAll('script[type="application/ld+json"]')];
        const webPages = scripts.flatMap(tag => {
          try {
            const data = JSON.parse(tag.textContent || "{}");
            const graph = Array.isArray(data["@graph"]) ? data["@graph"] : [data];
            return graph.filter(item => item["@type"] === "WebPage");
          } catch { return []; }
        });
        const heading = [...document.querySelectorAll("h2")].find(h => h.textContent?.includes("What to pair with Moody Gardens"));
        return {
          horizontalOverflow: Math.round(document.documentElement.scrollWidth - innerWidth),
          canonical: document.querySelector('link[rel="canonical"]')?.href || "",
          robots: document.querySelector('meta[name="robots"]')?.content || "",
          h1Count: document.querySelectorAll("h1").length,
          title: document.title,
          metaDescription: document.querySelector('meta[name="description"]')?.content || "",
          dateModified: webPages.find(item => item.url === location.origin + location.pathname)?.dateModified || "",
          gallery: document.querySelectorAll("img[src*='commons.wikimedia.org']").length,
          hasGuide: body.includes("Jellyfish Gallery") && body.includes("Flower Garden Banks"),
          hasRainforest: body.includes("Nightfall") && body.includes("giant river otters"),
          hasDiscovery: body.includes("20,000 Leagues Under the Sea") && body.includes("Room to Grow"),
          hasFacts: body.includes("9 to 10 AM is reserved for museum members") && body.includes("Thanksgiving Day"),
          hasSources: links.includes("https://www.galvestoncm.org/exhibits") && links.includes("https://www.moodygardens.com/attractions/discovery-pyramid"),
          hasGalvestonBay: links.includes("https://texasdefined.com/destination/galveston-bay"),
          relatedSectionVisible: Boolean(heading && heading.getBoundingClientRect().width > 0),
        };
      });
      assert.equal(facts.canonical, canonical, width + "px canonical");
      assert.match(facts.title, /Moody Gardens Galveston/, width + "px hydrated title");
      assert.equal(facts.metaDescription, "Plan Moody Gardens in Galveston: Aquarium and Rainforest Pyramids, ticket packages, parking, accessibility, seasonal attractions and practical visitor tips.", width + "px hydrated description");
      assert.equal(facts.h1Count, 1, width + "px H1");
      assert.doesNotMatch(facts.robots, /noindex/i, width + "px indexability");
      assert.equal(facts.dateModified, "2026-11-14", width + "px WebPage dateModified");
      assert.ok(facts.horizontalOverflow <= 8, width + "px horizontal overflow: " + facts.horizontalOverflow);
      for (const key of ["hasGuide", "hasRainforest", "hasDiscovery", "hasFacts", "hasSources", "hasGalvestonBay", "relatedSectionVisible"]) {
        assert.equal(facts[key], true, width + "px missing " + key);
      }
      assert.deepEqual(errors, [], width + "px JavaScript errors");
      console.log("PASS Moody Gardens responsive Chrome", width + "px", JSON.stringify(facts));
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
}
