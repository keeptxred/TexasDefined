import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";

const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_CORE_PATH || "/tmp/texasdefined-foliage-qa/node_modules/playwright-core");
const origin = (process.env.PRODUCTION_ORIGIN || "https://texasdefined.com").replace(/\/$/, "");
const output = "artifacts/east-texas-foliage-browser";
const parks = [
  ["Daingerfield", "33.025"],
  ["Caddo Lake", "32.69"],
  ["Lake Bob Sandlin", "33.063"],
  ["Tyler", "32.479"],
  ["Cooper Lake", "33.321"],
  ["Martin Creek Lake", "32.274"],
];
const viewports = [
  { label: "mobile", width: 390, height: 844, isMobile: true },
  { label: "desktop", width: 1440, height: 900, isMobile: false },
];
const findings = [];
const failures = [];
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_BIN || "/usr/bin/google-chrome",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
try {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: viewport.isMobile,
      hasTouch: viewport.isMobile,
      deviceScaleFactor: 1,
    });
    // Avoid creating analytics events or interacting with third-party commerce.
    await context.route(/(google-analytics|googletagmanager|connect\.facebook\.net|facebook\.com\/tr|\/api\/analytics|\/api\/track)/i, route => route.abort());
    const page = await context.newPage();
    try {
      const response = await page.goto(origin + "/article/east-texas-fall-colors?foliage_browser_qa=" + (process.env.GITHUB_SHA || "manual").slice(0,12), { waitUntil: "domcontentloaded", timeout: 45000 });
      if (response?.status() !== 200) throw new Error("HTTP " + response?.status());
      await page.getByRole("heading", { name: "Explore the parks on a map" }).waitFor({ state: "visible", timeout: 20000 });
      const overview = page.locator('section[aria-labelledby="east-texas-all-parks-heading"]');
      await overview.getByRole("heading", { name: "All six parks on one map" }).waitFor({ state: "visible" });
      if (await overview.locator("svg circle").count() !== 6) throw new Error("All-six-park overview must show six map pins");
      if (await overview.locator("svg polyline").count() !== 2) throw new Error("Both suggested itinerary lines must appear");
      const selector = page.getByRole("group", { name: "Choose park to locate on map" });
      // Server-rendered controls remain disabled until React hydration completes.
      // Verify the first real state transition before checking any initially selected park.
      await page.waitForFunction(() => {
        const button = [...document.querySelectorAll("button[aria-pressed]")].find(element => element.textContent?.trim() === "Caddo Lake");
        return Boolean(button && !button.disabled);
      }, null, { timeout: 15000 });
      const selection = [];
      const parkSequence = [...parks.slice(1, 2), ...parks.slice(0, 1), ...parks.slice(2)];
      for (const [parkName, latitude] of parkSequence) {
        const button = selector.getByRole("button", { name: parkName, exact: true });
        await button.click();
        await page.waitForFunction(name => {
          const button = [...document.querySelectorAll("button[aria-pressed]")].find(element => element.textContent?.trim() === name);
          return button?.getAttribute("aria-pressed") === "true";
        }, parkName, { timeout: 8000 });
        if ((await button.getAttribute("aria-pressed")) !== "true") throw new Error("Selection did not update: " + parkName);
        const iframe = page.locator('iframe[title^="Interactive map around"]');
        const src = await iframe.getAttribute("src");
        if (!(src || "").includes("marker=" + latitude)) throw new Error("Map marker did not move: " + parkName + " => " + src);
        selection.push(parkName);
      }
      const routeLinks = [
        ["Open four-stop driving directions", ["Tyler", "Cooper", "Sandlin", "Daingerfield"]],
        ["Open three-stop driving directions", ["Tyler", "Martin", "Caddo"]],
      ];
      for (const [label, names] of routeLinks) {
        const href = await page.getByRole("link", { name: label }).getAttribute("href");
        if (!href?.startsWith("https://www.google.com/maps/dir/?api=1")) throw new Error("Driving link missing: " + label);
        const decoded = decodeURIComponent(href);
        for (const name of names) if (!decoded.includes(name)) throw new Error("Route does not include " + name);
      }
      const gallery = page.locator('section[aria-labelledby="east-texas-foliage-gallery"]');
      await gallery.scrollIntoViewIfNeeded();
      const photos = gallery.locator("figure");
      if (await photos.count() !== 7) throw new Error("Expected seven licensed photos covering all six featured parks");
      for (let i = 0; i < 7; i++) {
        const item = photos.nth(i);
        const photo = item.locator("img");
        await photo.scrollIntoViewIfNeeded();
        await photo.evaluate(async image => {
          if (!image.complete) await new Promise(resolve => {
            image.addEventListener("load", resolve, { once: true });
            image.addEventListener("error", resolve, { once: true });
          });
        });
        const width = await photo.evaluate(image => image.naturalWidth);
        if (width < 100) throw new Error("Gallery photo did not load: " + i);
        if (!await item.getByRole("link", { name: "Wikimedia source" }).count()) throw new Error("Missing image provenance: " + i);
        if (!await item.getByRole("link", { name: "License terms" }).count()) throw new Error("Missing image license: " + i);
      }
      // Validate the live replacement sources as well as their generic image load status.
      // A fallback image may load successfully, but that must not masquerade as the
      // intended park photograph or the dated October foliage example.
      for (const [label, expectedSrc] of [
        ["Martin Creek Lake State Park", "Docks_at_Martin_Creek_Lake_State_Park_2019.jpg"],
        ["Daingerfield State Park — October lake reflection", "Daingerfield_sp_reflection.jpg"],
      ]) {
        const figure = gallery.locator("figure").filter({ has: page.getByText(label, { exact: true }) });
        if (await figure.count() !== 1) throw new Error("Expected exactly one gallery image for " + label);
        const actualSrc = await figure.locator("img").getAttribute("src");
        if (!actualSrc?.includes(expectedSrc)) throw new Error("Unexpected photo source for " + label + ": " + actualSrc);
      }
      for (const label of ["Daingerfield State Park", "Caddo Lake State Park", "Lake Bob Sandlin State Park", "Tyler State Park", "Cooper Lake State Park (South Sulphur Unit)", "Martin Creek Lake State Park"]) {
        if (!await gallery.getByText(label, { exact: true }).count()) throw new Error("Six-park image coverage missing " + label);
      }
      if (!await gallery.getByText("Martin Creek Lake State Park", { exact: true }).count()) throw new Error("Martin Creek lakeshore photograph missing");
      if (!await gallery.getByText("Daingerfield State Park — October lake reflection", { exact: true }).count()) throw new Error("October Daingerfield photograph missing");
      if (await page.getByRole("heading", { name: "More stories to read next" }).count()) throw new Error("Unrelated magazine rail returned");
      const dimensions = await page.evaluate(() => ({ viewport: window.innerWidth, document: document.documentElement.scrollWidth }));
      if (dimensions.document > dimensions.viewport + 8) throw new Error("Horizontal overflow: " + (dimensions.document - dimensions.viewport));
      await page.screenshot({ path: output + "/" + viewport.label + ".png", fullPage: true, animations: "disabled" });
      findings.push({ viewport: viewport.label, parks: selection, photos: 7, routes: 2, overflow: dimensions.document - dimensions.viewport, result: "pass" });
      console.log("PASS " + viewport.label + " foliage map, driving links, licensed gallery and related stories");
    } catch (error) {
      failures.push(viewport.label + ": " + String(error?.message || error));
      console.error("::error title=East Texas foliage browser QA::" + failures.at(-1));
      try { await page.screenshot({ path: output + "/FAIL-" + viewport.label + ".png", fullPage: true, timeout: 15000 }); } catch {}
    } finally {
      await page.close();
      await context.close();
    }
  }

  // Keep the Hill Country hero, historical credit and current TPWD link honest
  // on both real Chrome viewport sizes. This is a non-commerce read-only test.
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: viewport.isMobile,
      hasTouch: viewport.isMobile,
      deviceScaleFactor: 1,
    });
    await context.route(/(google-analytics|googletagmanager|connect\\.facebook\\.net|facebook\\.com\\/tr|\\/api\\/analytics|\\/api\\/track)/i, route => route.abort());
    const page = await context.newPage();
    try {
      const response = await page.goto(origin + "/article/hill-country-fall-colors?foliage_browser_qa=" + (process.env.GITHUB_SHA || "manual").slice(0, 12), { waitUntil: "domcontentloaded", timeout: 45000 });
      if (response?.status() !== 200) throw new Error("Hill Country HTTP " + response?.status());
      await page.getByRole("heading", { level: 1, name: "Where to See Fall Colors in the Texas Hill Country" }).waitFor({ state: "visible", timeout: 20000 });
      const hero = page.locator('img[alt*="autumn maple leaves"]').first();
      await hero.waitFor({ state: "attached", timeout: 15000 });
      await hero.scrollIntoViewIfNeeded();
      await hero.evaluate(image => image.decode().catch(() => {}));
      if (await hero.evaluate(image => image.naturalWidth) < 300) throw new Error("Lost Maples hero did not load");
      const heroSrc = await hero.getAttribute("src");
      if (!heroSrc?.includes("The_Lost_Maples_State_Park_-_Fall_Colors_in_Texas_")) throw new Error("Wrong Hill Country autumn hero: " + heroSrc);
      await page.getByRole("heading", { name: "Lost Maples foliage updates and photo credits" }).waitFor({ state: "visible" });
      const tpwd = await page.getByRole("link", { name: /Official 2026 Lost Maples foliage report/ }).getAttribute("href");
      if (tpwd !== "https://tpwd.texas.gov/state-parks/lost-maples/foliage-reports") throw new Error("Incorrect official 2026 foliage report link");
      const photoLink = await page.getByRole("link", { name: /Hero photo: G. Lamar, November 2012/ }).getAttribute("href");
      if (!photoLink?.includes("29567585500")) throw new Error("Historical photo source link missing");
      const ccLink = await page.getByRole("link", { name: /CC BY 2.0 license/ }).getAttribute("href");
      if (ccLink !== "https://creativecommons.org/licenses/by/2.0/") throw new Error("Historical photo rights link missing");
      if (!await page.getByText("not a verified report of current foliage conditions", { exact: false }).count()) throw new Error("Historical photo caveat missing");
      if (await page.getByRole("heading", { name: "More stories to read next" }).count()) throw new Error("Unrelated magazine rail on Hill Country article");
      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      if (canonical !== "https://texasdefined.com/article/hill-country-fall-colors") throw new Error("Hill Country canonical incorrect: " + canonical);
      const robotsMeta = page.locator('meta[name="robots"]');
      const robots = (await robotsMeta.count()) ? await robotsMeta.first().getAttribute("content") : null;
      if (/noindex/i.test(robots || "")) throw new Error("Hill Country article unexpectedly noindex");
      const dimensions = await page.evaluate(() => ({ viewport: window.innerWidth, document: document.documentElement.scrollWidth }));
      if (dimensions.document > dimensions.viewport + 8) throw new Error("Hill Country horizontal overflow: " + (dimensions.document - dimensions.viewport));
      await page.screenshot({ path: output + "/hill-country-" + viewport.label + ".png", fullPage: true, animations: "disabled" });
      findings.push({ viewport: "hill-country-" + viewport.label, loadedHero: true, historicalCredit: true, officialReport: true, overflow: dimensions.document - dimensions.viewport, result: "pass" });
      console.log("PASS Hill Country " + viewport.label + " historical hero, rights, official foliage link and responsive layout");
    } catch (error) {
      failures.push("hill-country-" + viewport.label + ": " + String(error?.message || error));
      console.error("::error title=Hill Country foliage browser QA::" + failures.at(-1));
      try { await page.screenshot({ path: output + "/FAIL-hill-country-" + viewport.label + ".png", fullPage: true, timeout: 15000 }); } catch {}
    } finally {
      await page.close();
      await context.close();
    }
  }
} finally {
  await browser.close();
}
await writeFile(output + "/results.json", JSON.stringify({ findings, failures, sha: process.env.GITHUB_SHA || null }, null, 2));
if (failures.length) process.exitCode = 1;
