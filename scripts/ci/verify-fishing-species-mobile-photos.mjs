/**
 * Narrow, reproducible browser QA for the published freshwater-fish identification
 * rollout. Does not update fish facts, request indexing, or mutate production.
 * Checks actual visitor Chrome layout + real photo decoding, not just img tags.
 */
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
const { chromium } = createRequire(import.meta.url)(
  process.env.PLAYWRIGHT_CORE_PATH || "/tmp/td-fish-species-chrome/node_modules/playwright-core",
);
const ORIGIN = (process.env.PRODUCTION_ORIGIN || "https://texasdefined.com").replace(/\/$/, "");
const OUT = process.env.FISH_SPECIES_BROWSER_OUTPUT || "artifacts/fishing-species-browser";
const slugs = [
  "largemouth-bass", "smallmouth-bass", "guadalupe-bass", "spotted-bass",
  "crappie", "black-crappie", "white-crappie", "catfish",
  "blue-catfish", "channel-catfish", "flathead-catfish",
  "white-bass", "striped-bass", "hybrid-striped-bass",
  "alligator-gar", "freshwater-drum", "sunfish", "bluegill", "rainbow-trout",
  "bowfin", "common-carp", "spotted-gar", "redear-sunfish", "green-sunfish",
  "warmouth", "longear-sunfish", "redbreast-sunfish", "rio-grande-cichlid",
];
const fish22 = new Set([
  "bowfin", "common-carp", "alligator-gar", "spotted-gar",
  "channel-catfish", "blue-catfish", "flathead-catfish", "largemouth-bass",
  "guadalupe-bass", "bluegill", "redear-sunfish", "green-sunfish", "warmouth",
  "longear-sunfish", "redbreast-sunfish", "rio-grande-cichlid", "black-crappie",
  "white-crappie", "striped-bass", "white-bass", "freshwater-drum", "rainbow-trout",
]);
const newFish = new Set([
  "bowfin", "common-carp", "spotted-gar", "redear-sunfish", "green-sunfish",
  "warmouth", "longear-sunfish", "redbreast-sunfish", "rio-grande-cichlid",
]);
const results = [];
await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_BIN || "/usr/bin/google-chrome",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
try {
  for (const width of [390, 320]) {
    const activeSlugs = width === 390 ? slugs : [...newFish];
    const context = await browser.newContext({
      viewport: { width, height: width === 390 ? 844 : 700 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 1,
    });
    await context.route(/googletagmanager|google-analytics|connect\.facebook\.net|facebook\.com\/tr|\/api\/track/i, r => r.abort());
    const page = await context.newPage();
    page.setDefaultTimeout(16000);
    for (const slug of activeSlugs) {
      const path = "/fishing/species/" + slug;
      const row = { path, width, status: null, failures: [], warnings: [], jsErrors: [] };
      const onError = error => row.jsErrors.push(String(error));
      page.on("pageerror", onError);
      try {
        const response = await page.goto(ORIGIN + path, { waitUntil: "domcontentloaded", timeout: 45000 });
        row.status = response?.status() ?? null;
        if (row.status !== 200) throw new Error("HTTP_" + row.status);
        await page.locator("h1").first().waitFor({ state: "visible", timeout: 20000 });
        await page.waitForFunction(() => [...document.querySelectorAll('link[rel="stylesheet"]')].some(l => l.sheet), null, { timeout: 20000 });
        await page.waitForTimeout(1200);
        const content = await page.evaluate(() => {
          const h1 = [...document.querySelectorAll("h1")].filter(el => el.getClientRects().length > 0);
          const text = document.body.innerText;
          const links = [...document.querySelectorAll("a")].map(el => ({ href: el.href, text: el.textContent || "" }));
          const images = [...document.querySelectorAll("img")].map(im => ({
            alt: im.getAttribute("alt") || "",
            currentSrc: im.currentSrc || im.src,
            naturalWidth: im.naturalWidth,
            complete: im.complete,
          }));
          return {
            h1Count: h1.length, h1: h1[0]?.innerText || "",
            horizontalOverflow: document.documentElement.scrollWidth - innerWidth,
            hasViewportMeta: /width\s*=\s*device-width/i.test(document.querySelector('meta[name="viewport"]')?.content || ""),
            headings: [...document.querySelectorAll("h2,h3")].map(el => el.innerText.trim()),
            text, links, images,
            renderedBodyWords: text.trim().split(/\s+/).length,
          };
        });
        row.h1 = content.h1;
        row.words = content.renderedBodyWords;
        row.overflowPx = content.horizontalOverflow;
        if (content.h1Count !== 1) row.failures.push("visible_H1_count_" + content.h1Count);
        if (!content.hasViewportMeta) row.failures.push("viewport_meta_missing");
        if (content.horizontalOverflow > 12) row.failures.push("horizontal_overflow_" + content.horizontalOverflow);
        if (!content.links.some(l => l.href === ORIGIN + "/fishing/species")) row.failures.push("directory_navigation_missing");
        if (!content.links.some(l => l.href.startsWith("https://tpwd.texas.gov/"))) row.failures.push("TPWD_source_link_missing");
        if (fish22.has(slug)) {
          const required = ["How to Identify ", "Look for these markings", "Compare with similar fish", "Size in the field guide", "Texas waters and habitat", "On-the-water approach"];
          for (const phrase of required) if (!content.headings.some(h => h.includes(phrase))) row.failures.push("identification_section_missing_" + phrase.replaceAll(" ", "_"));
          const fishImages = content.images.filter(i => i.alt.toLowerCase().includes(slug.replaceAll("-", " ").split(" ")[0]));
          if (!fishImages.length) row.failures.push("species_image_alt_missing");
          else {
            if (!fishImages.some(i => i.complete && i.naturalWidth > 40)) {
              try {
                await page.waitForFunction(first => [...document.images].some(i => (i.alt || "").toLowerCase().includes(first) && i.complete && i.naturalWidth > 40), slug.replaceAll("-", " ").split(" ")[0], { timeout: 12000 });
              } catch { row.failures.push("species_image_not_decoded"); }
            }
            row.imageSrc = fishImages[0].currentSrc;
            row.imageDecoded = !row.failures.includes("species_image_not_decoded");
          }
        }
        if (newFish.has(slug)) {
          if (!content.headings.some(h => /Diet, Spawning and Natural History/.test(h))) row.failures.push("natural_history_missing");
          if (content.renderedBodyWords < 450) row.failures.push("thin_new_species_content");
        }
        if (row.jsErrors.length) row.failures.push("uncaught_js_error");
        if (width === 390 && newFish.has(slug)) {
          await page.screenshot({ path: OUT + "/" + slug + "-mobile-hero.png", animations: "disabled" });
          const section = page.locator("#field-identification");
          if (await section.count()) {
            await section.scrollIntoViewIfNeeded();
            await page.screenshot({ path: OUT + "/" + slug + "-mobile-identification.png", animations: "disabled" });
          }
        }
      } catch (e) {
        row.failures.push("navigation_or_render_" + String(e).slice(0, 220));
      }
      page.off("pageerror", onError);
      results.push(row);
      console.log(JSON.stringify(row));
    }
    await context.close();
  }
} finally {
  await browser.close();
}
const failures = results.filter(r => r.failures.length);
const report = { generatedAt: new Date().toISOString(), origin: ORIGIN, run: process.env.GITHUB_RUN_ID || null,
  tested: results.length, expected: 37, failed: failures.length, fish22: fish22.size,
  note: "Browser, layout, and image decode checks; not a human editorial review or Google ranking grade.",
  results,
};
await writeFile(OUT + "/report.json", JSON.stringify(report, null, 2) + "\n");
console.log("FISH_SPECIES_CHROME_SUMMARY " + JSON.stringify({tested: report.tested, failed: report.failed, expected: report.expected}));
if (report.tested !== report.expected || failures.length) process.exitCode = 1;
