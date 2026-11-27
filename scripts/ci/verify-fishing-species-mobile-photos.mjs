/**
 * Narrow, reproducible browser QA for the published freshwater-fish identification
 * rollout. Does not update fish facts, request indexing, or mutate production.
 * Checks actual visitor Chrome layout + real photo decoding, not just img tags.
 */
import { createRequire } from "node:module";
import { mkdir, readFile, writeFile } from "node:fs/promises";
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
const identificationSource = await readFile("src/data/fishing/species-identification.ts", "utf8");
const identificationMarker = "export const fishIdentification: Record<string, FishIdentification> = ";
const fieldGuides = JSON.parse(identificationSource.split(identificationMarker)[1].split(";\n")[0]);
const authoritySource = await readFile("src/data/fishing/species-authority-notes.ts","utf8");
const authorityNotes = JSON.parse(authoritySource.split("export const FISH_AUTHORITY_NOTES: Record<string,FishAuthorityNote> = ")[1].split(";\n")[0]);
const officialSources = JSON.parse(authoritySource.split("export const FISH_AUTHORITY_SOURCES = ")[1].split(" as const;")[0]);
const expectedLookalikeLinks = Object.values(fieldGuides)
  .reduce((count, guide) => count + (guide.compareSlugs ?? []).length, 0);
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
          const heroPhotoPresent = Boolean(document.querySelector("header.bg-ink figure img"));
          const heroCredit = document.querySelector("header.bg-ink figcaption");
          const heroBackground = heroCredit?.closest("header");
          const channels = css => {
            const canvas = document.createElement("canvas");
            canvas.width = 1; canvas.height = 1;
            const ctx = canvas.getContext("2d", { willReadFrequently: true });
            ctx.fillStyle = css;
            ctx.fillRect(0, 0, 1, 1);
            return [...ctx.getImageData(0, 0, 1, 1).data];
          };
          const luminance = values => values.slice(0, 3).map(v => {
            const x = v / 255;
            return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
          }).reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
          const contrast = heroCredit && heroBackground ? (() => {
            const background = channels(getComputedStyle(heroBackground).backgroundColor);
            const foreground = channels(getComputedStyle(heroCredit).color);
            const opacity = foreground[3] / 255;
            const compositedText = foreground.slice(0, 3).map((value, index) =>
              value * opacity + background[index] * (1 - opacity));
            return [luminance(compositedText), luminance(background)];
          })() : [];
          const heroCreditContrast = contrast.length ? (Math.max(...contrast) + 0.05) / (Math.min(...contrast) + 0.05) : 0;
          return {
            heroPhotoPresent, heroCreditContrast,
            title: document.title, description: document.querySelector('meta[name="description"]')?.content || "", canonical: document.querySelector('link[rel="canonical"]')?.href || "", robots: document.querySelector('meta[name="robots"]')?.content || "",
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
        row.heroCreditContrast = content.heroPhotoPresent ? Number(content.heroCreditContrast.toFixed(2)) : null;
        // The specialized largemouth guide has no fish photo in its dark hero.
        // All headers with a fish photo must show its source/license legibly.
        if (content.heroPhotoPresent && row.heroCreditContrast < 4.5)
          row.failures.push("inaccessible_dark_hero_image_credit_contrast_" + row.heroCreditContrast);
        if (content.h1Count !== 1) row.failures.push("visible_H1_count_" + content.h1Count);
        if (!content.hasViewportMeta) row.failures.push("viewport_meta_missing");
        if (content.horizontalOverflow > 12) row.failures.push("horizontal_overflow_" + content.horizontalOverflow);
        if (!content.links.some(l => l.href === ORIGIN + "/fishing/species")) row.failures.push("directory_navigation_missing");
        if (!content.links.some(l => l.href.startsWith("https://tpwd.texas.gov/"))) row.failures.push("TPWD_source_link_missing");
        const authority=authorityNotes[slug];
        if(!authority) row.failures.push("authority_note_missing_in_registry");
        else {
          if(!content.title.includes(authority.title)) row.failures.push("species_specific_title_missing");
          if(content.description!==authority.description) row.failures.push("species_specific_description_missing");
          if(!content.headings.includes("Texas fishing: where to start") || !content.text.includes(authority.guidance)) row.failures.push("practical_guidance_not_rendered");
          for(const key of [authority.source,...(authority.extraSources??[]),"limits","advisories"])
            if(!content.links.some(link=>link.href===officialSources[key].url)) row.failures.push("official_evidence_link_missing_"+key);
          for(const target of authority.related)
            if(!content.links.some(link=>link.href===ORIGIN+"/fishing/species/"+target)) row.failures.push("related_species_link_missing_"+target);
          for(const target of authority.lakes)
            if(!content.links.some(link=>link.href===ORIGIN+"/fishing/lakes/"+target)) row.failures.push("historical_waterbody_link_missing_"+target);
        }
        if(content.canonical!==ORIGIN+path || /noindex/i.test(content.robots)) row.failures.push("canonical_or_indexability");
        if (fish22.has(slug)) {
          const comparisons = fieldGuides[slug]?.compareSlugs ?? [];
          row.lookalikeGuideLinks = comparisons.length;
          for (const compareSlug of comparisons) {
            const href = ORIGIN + "/fishing/species/" + compareSlug;
            if (!content.links.some(link => link.href.split(/[?#]/)[0] === href && link.text.includes("Compare with")))
              row.failures.push("verified_lookalike_link_not_rendered_" + compareSlug);
          }
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
  expectedLookalikeLinks,
  note: "Browser, layout, curated lookalike links and image decode checks; not a human editorial review or Google ranking grade.",
  results,
};
await writeFile(OUT + "/report.json", JSON.stringify(report, null, 2) + "\n");
console.log("FISH_SPECIES_CHROME_SUMMARY " + JSON.stringify({tested: report.tested, failed: report.failed, expected: report.expected}));
if (report.tested !== report.expected || failures.length) process.exitCode = 1;
