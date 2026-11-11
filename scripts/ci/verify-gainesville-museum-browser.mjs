import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || "/tmp/texasdefined-gainesville-qa/node_modules/playwright-core");
const origin = (process.env.PRODUCTION_ORIGIN || "https://texasdefined.com").replace(/\/$/, "");
const path = "/destination/medal-of-honor-host-city-museum-gainesville";
const output = "artifacts/gainesville-museum-browser";
await mkdir(output, { recursive: true });
const results = [];
const failures = [];
const museumAltA = "The separate Medal of Honor Park in Gainesville";
const museumAltB = "A second June 2017 view of Gainesville Medal of Honor Park";

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_BIN || "/usr/bin/google-chrome",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
try {
  // One browser, two sequential viewports; never fan out a Chrome cohort.
  for (const viewport of [
    { name: "mobile", width: 390, height: 844, mobile: true },
    { name: "desktop", width: 1366, height: 900, mobile: false },
  ]) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: viewport.mobile,
      hasTouch: viewport.mobile,
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    const jsErrors = [];
    page.on("pageerror", e => jsErrors.push(e.message));
    try {
      const address = origin + path + "?gainesville-browser-qa=" + Date.now();
      const response = await page.goto(address, { waitUntil: "domcontentloaded", timeout: 60000 });
      await page.locator("main h1").waitFor({ state: "visible", timeout: 30000 });
      await page.waitForFunction(() => document.documentElement.dataset.tdRootHydrated === "1", null, { timeout: 30000 });
      // Force the two historical gallery assets to load even when lazy-loaded.
      for (const alt of [museumAltA, museumAltB]) {
        const target = page.locator('main img[alt*="' + alt + '"]');
        if (await target.count() === 1) await target.scrollIntoViewIfNeeded({ timeout: 25000 });
      }
      await page.waitForTimeout(1000);
      const data = await page.evaluate(({ a, b }) => {
        const root = document.querySelector("main");
        const images = [...root.querySelectorAll("img")];
        const criticalImages = images.filter(img => img.alt.includes(a) || img.alt.includes(b));
        return {
          title: document.title,
          description: document.querySelector('meta[name="description"]')?.content ?? "",
          canonical: document.querySelector('link[rel="canonical"]')?.href ?? "",
          robots: document.querySelector('meta[name="robots"]')?.content ?? "",
          h1: [...root.querySelectorAll("h1")].map(el => el.textContent.trim()),
          mainCount: document.querySelectorAll("main").length,
          text: root.innerText,
          documentWidth: document.documentElement.scrollWidth,
          viewportWidth: innerWidth,
          links: [...root.querySelectorAll("a[href]")].map(el => ({
            href: el.href,
            label: (el.getAttribute("aria-label") || (el.getAttribute("aria-labelledby") || "").split(/\s+/).map(id => document.getElementById(id)?.textContent || "").join(" ") || el.innerText || el.textContent || [...el.querySelectorAll("img[alt]")].map(img => img.getAttribute("alt")).join(" ") || el.getAttribute("title") || "").trim()
          })),
          imagesWithoutAlt: images.filter(img => !img.hasAttribute("alt")).map(img => img.src),
          criticalImages: criticalImages.map(img => ({
            alt: img.alt, src: img.currentSrc || img.src,
            loaded: img.complete && img.naturalWidth >= 300,
            naturalWidth: img.naturalWidth,
          })),
          jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')]
            .map(el => el.textContent).join("\n"),
        };
      }, { a: museumAltA, b: museumAltB });
      await page.screenshot({
        path: output + "/" + viewport.name + ".png",
        fullPage: true, animations: "disabled", timeout: 45000,
      });
      const checks = [
        [response?.status() === 200, "museum HTTP 200"],
        [data.mainCount === 1 && data.h1.length === 1 && data.h1[0] === "Medal of Honor Host City Museum", "one accurate H1 and main landmark"],
        [data.title.includes("Medal of Honor Host City Museum") && data.title.includes("Gainesville"), "specific SEO title"],
        [data.description.length > 80, "usable meta description"],
        [data.canonical === origin + path, "self canonical"],
        [!/\bnoindex\b/i.test(data.robots), "indexable HTML robots"],
        [data.text.includes("Building 2700"), "official NCTC Building 2700 wayfinding rendered"],
        [data.text.includes("A deeper recipient-history visit"), "original museum-specific itinerary rendered"],
        [data.text.includes("library") && data.text.includes("accessibility"), "older library memorial and museum accessibility not conflated"],
        [data.links.some(item => item.href.includes("NCTC%20Gainesville%20Campus%20Map.pdf")), "official campus map linked"],
        [data.jsonLd.includes('"Museum"') && data.jsonLd.includes('"BreadcrumbList"'), "Museum and breadcrumb structured data"],
        [data.documentWidth <= data.viewportWidth + 12, "no horizontal overflow"],
        [data.imagesWithoutAlt.length === 0, "all main images have alt attributes"],
        [data.links.filter(item => !item.label).length === 0, "all main links have discernible names"],
        [data.criticalImages.length === 2 && data.criticalImages.every(img => img.loaded), "both rights-cleared 2017 Gainesville park gallery images load"],
        [jsErrors.length === 0, "no first-party page runtime errors"],
      ].map(([ok, label]) => ({ ok, label }));
      const result = { viewport: viewport.name, http: response?.status(), checks, jsErrors, data: {
        ...data, text: data.text.slice(0, 9000),
      }};
      results.push(result);
      for (const check of checks) {
        const message = viewport.name + ": " + check.label;
        if (!check.ok) failures.push(message);
        console.log((check.ok ? "PASS " : "FAIL ") + message);
      }
      await writeFile(output + "/" + viewport.name + ".json", JSON.stringify(result, null, 2) + "\n");
    } catch (error) {
      const message = viewport.name + ": " + (error instanceof Error ? error.stack || error.message : String(error));
      failures.push(message);
      console.error("FAIL " + message);
      try { await page.screenshot({ path: output + "/" + viewport.name + "-failure.png", timeout: 15000 }); } catch {}
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
}
const report = { checkedAt: new Date().toISOString(), url: origin + path, checkedViewports: results.length, failures, results };
await writeFile(output + "/report.json", JSON.stringify(report, null, 2) + "\n");
if (failures.length) {
  console.error("Gainesville museum browser acceptance FAILED: " + failures.length + " actual failing checks");
  process.exitCode = 1;
} else {
  assert.equal(results.length, 2);
  console.log("Gainesville museum real-Chrome mobile + desktop acceptance PASSED");
}
