/**
 * Independent real-Chrome verification for the three previously reviewed
 * attraction guides. Small, source-pinned cohort; no screenshots of people,
 * no synthetic ratings or live booking assertions.
 */
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || "/tmp/texasdefined-wp-qa/node_modules/playwright-core");

const origin = "https://texasdefined.com";
const guides = [
  { slug: "san-antonio-japanese-tea-garden", name: "San Antonio Japanese Tea Garden",
    alt: "Stone paths, ponds and garden landscape at the San Antonio Japanese Tea Garden" },
  { slug: "fort-worth-water-gardens", name: "Fort Worth Water Gardens",
    alt: "Concrete water features and pools at Fort Worth Water Gardens" },
  { slug: "houston-botanic-garden", name: "Houston Botanic Garden",
    alt: "Plantings and paths at Houston Botanic Garden" },
];
const viewports = [
  { label: "desktop", width: 1365, height: 864, mobile: false },
  { label: "mobile", width: 390, height: 844, mobile: true },
  { label: "narrow-mobile", width: 320, height: 740, mobile: true },
];
const artifactDir = "artifacts/three-attraction-browser";
await mkdir(artifactDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_BIN || "/usr/bin/google-chrome",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
try {
  for (const guide of guides) {
    for (const viewport of viewports) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        isMobile: viewport.mobile, hasTouch: viewport.mobile,
        deviceScaleFactor: 1,
      });
      await context.route(/(?:google-analytics|googletagmanager|connect\.facebook\.net|facebook\.com\/tr|\/api\/analytics|\/api\/track)/i,
        (route) => route.abort());
      try {
        const page = await context.newPage();
        const pageErrors = [];
        page.on("pageerror", (error) => pageErrors.push(String(error)));
        const path = "/destination/" + guide.slug;
        const url = origin + path + "?attraction-browser=" + (process.env.GITHUB_SHA || "manual").slice(0, 12);
        const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
        assert.equal(response?.status(), 200, guide.slug + " " + viewport.label + " HTTP status");
        await page.locator("h1").first().waitFor({ state: "visible", timeout: 20000 });
        await page.waitForFunction((alt) => {
          const image = [...document.images].find((candidate) => candidate.alt === alt);
          return Boolean(image && image.complete && image.naturalWidth > 400 && image.naturalHeight > 300);
        }, guide.alt, { timeout: 25000 });
        await page.waitForTimeout(600);
        const facts = await page.evaluate((alt) => {
          const image = [...document.images].find((candidate) => candidate.alt === alt);
          const imageBox = image?.getBoundingClientRect();
          const canonical = document.querySelector('link[rel="canonical"]')?.href ?? "";
          const robot = document.querySelector('meta[name="robots"]')?.content ?? "";
          return {
            title: document.title,
            canonical,
            h1Count: document.querySelectorAll("h1").length,
            h1: document.querySelector("h1")?.textContent?.trim() ?? "",
            h2Count: document.querySelectorAll("h2").length,
            mainCount: document.querySelectorAll("main").length,
            imageLoaded: Boolean(image?.complete && image.naturalWidth > 400 && image.naturalHeight > 300),
            imageAlt: image?.alt ?? "",
            imageDimensions: image ? [image.naturalWidth, image.naturalHeight] : null,
            imageVisible: Boolean(imageBox && imageBox.width > 100 && imageBox.height > 100),
            horizontalOverflow: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
            noindex: /\bnoindex\b/i.test(robot),
            genericAtGlance: [...document.querySelectorAll("h2")].some((h) => h.textContent?.includes("at a glance")),
            editorialMetaLanguage: /Do not promise step-free access|not a license to republish|intentionally avoids a blanket claim/i.test(document.body.innerText),
            photoCredit: (() => {
              const el = document.querySelector("[data-attraction-photo-credit]");
              const box = el?.getBoundingClientRect();
              return {
                visible: Boolean(box && box.height > 0 && box.width > 100),
                clipped: Boolean(el && el.scrollWidth > el.clientWidth + 8),
                links: [...(el?.querySelectorAll("a") || [])].map((a) => a.href),
                text: el?.textContent?.trim() ?? "",
              };
            })(),
            offerVisible: Boolean(document.querySelector("[data-hbg-recycles-offer]")),
            pageText: document.body.innerText,
            officialSources: [...document.querySelectorAll('a[href^="https://"]')].filter((a) =>
              /official|source|visitor/i.test(a.textContent || "")).length,
          };
        }, guide.alt);
        assert.ok(facts.title.includes(guide.name), guide.slug + " " + viewport.label + " title");
        assert.equal(facts.canonical, origin + path, guide.slug + " " + viewport.label + " canonical");
        assert.equal(facts.h1Count, 1, guide.slug + " " + viewport.label + " H1 count");
        assert.equal(facts.h1, guide.name, guide.slug + " " + viewport.label + " H1 identity");
        assert.ok(facts.h2Count >= 3, guide.slug + " " + viewport.label + " original guide sections");
        assert.ok(facts.mainCount >= 1, guide.slug + " " + viewport.label + " main landmark");
        assert.ok(facts.imageLoaded && facts.imageVisible, guide.slug + " " + viewport.label + " hero rendering");
        assert.equal(facts.imageAlt, guide.alt, guide.slug + " image alternative text");
        assert.ok(facts.horizontalOverflow <= 8, guide.slug + " " + viewport.label + " overflow " + facts.horizontalOverflow);
        assert.ok(!facts.noindex, guide.slug + " " + viewport.label + " robots noindex");
        assert.ok(facts.officialSources >= 1, guide.slug + " " + viewport.label + " official references");
        assert.ok(!facts.genericAtGlance, guide.slug + " must lead with location-specific visitor decisions");
        assert.ok(!facts.editorialMetaLanguage, guide.slug + " must not show editorial instructions");
        assert.ok(facts.photoCredit.visible && !facts.photoCredit.clipped, guide.slug + " photo credit legibility at " + viewport.width + "px");
        assert.equal(facts.photoCredit.links.length, 2, guide.slug + " exact photograph source and license link");
        assert.ok(facts.photoCredit.links[0].startsWith("https://commons.wikimedia.org/wiki/File:"), guide.slug + " original Commons attribution");
        assert.ok(facts.photoCredit.links[1].startsWith("https://creativecommons.org/"), guide.slug + " exact reuse license");
        if (guide.slug === "houston-botanic-garden") {
          const now = Date.now();
          const isOfferActive = now >= Date.parse("2026-11-13T06:00:00Z") && now < Date.parse("2026-11-16T06:00:00Z");
          assert.equal(facts.offerVisible, isOfferActive, "Houston Nov. 13–15 offer must expire with its official validity");
          if (isOfferActive) assert.ok(facts.pageText.includes("one plastic bag or bottle") && facts.pageText.includes("per person"), "Houston offer eligibility");
          assert.ok(facts.pageText.includes("New Year's Day"), "Houston official holiday closure");
        }
        assert.deepEqual(pageErrors, [], guide.slug + " " + viewport.label + " client errors");
        await page.screenshot({ path: artifactDir + "/" + guide.slug + "-" + viewport.label + ".png", fullPage: false });
        const expectedGalleryCount = guide.slug === "san-antonio-japanese-tea-garden" ? 1
          : guide.slug === "fort-worth-water-gardens" ? 2 : 0;
        if (expectedGalleryCount) {
          const gallery = page.locator("#destination-photo-archive");
          await gallery.scrollIntoViewIfNeeded();
          await page.waitForFunction((count) => {
            const images = [...document.querySelectorAll("#destination-photo-archive figure img")];
            return images.length >= count && images.every((img) => img.complete && img.naturalWidth >= 500 && img.naturalHeight >= 500);
          }, expectedGalleryCount, { timeout: 30000 });
          const galleryFacts = await gallery.evaluate((section) => ({
            images: [...section.querySelectorAll("figure img")].map((img) => ({
              alt: img.alt, width: img.naturalWidth, height: img.naturalHeight,
            })),
            licenses: [...section.querySelectorAll('figure a[href^="https://creativecommons.org/"]')].map((a) => a.href),
            sources: [...section.querySelectorAll('figure a[href^="https://commons.wikimedia.org/wiki/File:"]')].map((a) => a.href),
          }));
          assert.ok(galleryFacts.images.length >= expectedGalleryCount, "Required exact-site gallery views " + guide.slug);
          assert.equal(galleryFacts.licenses.length, galleryFacts.images.length, "Every gallery photo has a license link " + guide.slug);
          assert.equal(galleryFacts.sources.length, galleryFacts.images.length, "Every gallery photo has an original-source link " + guide.slug);
          assert.ok(galleryFacts.images.every((image) => image.alt && image.width >= 500), "Every gallery photograph is descriptive and loads");
          await page.screenshot({ path: artifactDir + "/" + guide.slug + "-" + viewport.label + "-gallery.png", fullPage: false });
          console.log("PASS attraction authentic Commons gallery", guide.slug, viewport.label, JSON.stringify(galleryFacts));
        }

        console.log("PASS attraction Chrome", guide.slug, viewport.label, JSON.stringify(facts));
      } finally {
        await context.close();
      }
    }
  }
} finally {
  await browser.close();
}
