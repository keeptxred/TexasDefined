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
      if (await photos.count() !== 5) throw new Error("Expected five independently credited photos");
      for (let i = 0; i < 5; i++) {
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
      if (await page.getByRole("heading", { name: "More stories to read next" }).count()) throw new Error("Unrelated magazine rail returned");
      const dimensions = await page.evaluate(() => ({ viewport: window.innerWidth, document: document.documentElement.scrollWidth }));
      if (dimensions.document > dimensions.viewport + 8) throw new Error("Horizontal overflow: " + (dimensions.document - dimensions.viewport));
      await page.screenshot({ path: output + "/" + viewport.label + ".png", fullPage: true, animations: "disabled" });
      findings.push({ viewport: viewport.label, parks: selection, photos: 5, routes: 2, overflow: dimensions.document - dimensions.viewport, result: "pass" });
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
} finally {
  await browser.close();
}
await writeFile(output + "/results.json", JSON.stringify({ findings, failures, sha: process.env.GITHUB_SHA || null }, null, 2));
if (failures.length) process.exitCode = 1;
