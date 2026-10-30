import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || "/tmp/texasdefined-wp-qa/node_modules/playwright-core");
const facts = JSON.parse(readFileSync("src/data/hunting/turkey-quarterly-facts.json", "utf8"));
const calendar = JSON.parse(readFileSync("src/data/hunting/turkey-season-calendar.json", "utf8"));
const origin = (process.env.PRODUCTION_ORIGIN || "https://texasdefined.com").replace(/\/$/, "");
const canonical = origin + "/hunting/turkey-hunting";
const proofDir = "artifacts/hunting-hub-responsive/turkey";
const runToken = encodeURIComponent((process.env.GITHUB_SHA || "scheduled") + "-" + (process.env.GITHUB_RUN_ID || Date.now()));
const imageAlts = [
  "Rio Grande wild turkey gobbler",
  "TPWD spring wild turkey hunting zone map",
  "TPWD fall wild turkey hunting zone map",
];
const essentialText = [
  "Official 2026–27 wild turkey season dates",
  "No unbearded hens",
  "Matagorda and Wharton",
  "National Refuge Spring Turkey drawings",
  "Two verified 2027 public turkey draw opportunities",
  "Find walk-in turkey hunting where it is actually legal",
  "Using TPWD turkey harvest numbers responsibly",
  "TPWD draw and survey data machine-checked " + facts.checkedAt,
  "Machine-checked " + facts.checkedAt,
];
const viewports = [
  { name: "desktop-canonical", width: 1440, height: 900, mobile: false, bypass: false },
  { name: "desktop-cache-bypassed", width: 1440, height: 900, mobile: false, bypass: true },
  { name: "mobile-390", width: 390, height: 844, mobile: true, bypass: false },
  { name: "small-mobile-320", width: 320, height: 720, mobile: true, bypass: false },
];
await mkdir(proofDir, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_BIN || "/usr/bin/google-chrome",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const results = [];
try {
  for (const spec of viewports) {
    const context = await browser.newContext({
      viewport: { width: spec.width, height: spec.height },
      deviceScaleFactor: 1,
      isMobile: spec.mobile,
      hasTouch: spec.mobile,
      serviceWorkers: "block",
      extraHTTPHeaders: { "Cache-Control": "no-cache", Pragma: "no-cache" },
    });
    await context.route(/(?:google-analytics|googletagmanager|connect\.facebook\.net|facebook\.com\/tr|\/api\/analytics|\/api\/track)/i, route => route.abort());
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(String(error)));
    const requestUrl = canonical + (spec.bypass ? "?__td_turkey_browser_audit=" + runToken : "");
    try {
      const response = await page.goto(requestUrl, { waitUntil: "domcontentloaded", timeout: 60000 });
      assert.equal(response?.status(), 200, spec.name + " HTTP status");
      assert.equal(new URL(page.url()).pathname, "/hunting/turkey-hunting", "no unexpected redirect");
      await page.locator("main h1").first().waitFor({ state: "visible", timeout: 25000 });
      const snapshot = await page.evaluate(() => {
        const main = document.querySelector("main");
        const meta = (selector) => document.querySelector(selector)?.getAttribute("content") || "";
        const jsonLd = [...document.querySelectorAll('script[type="application/ld+json"]')]
          .flatMap(el => {
            try {
              const obj = JSON.parse(el.textContent || "{}");
              return Array.isArray(obj["@graph"]) ? obj["@graph"] : [obj];
            } catch { return [{ "@type": "InvalidJSONLD" }]; }
          });
        return {
          title: document.title,
          description: meta('meta[name="description"]'),
          h1: [...document.querySelectorAll("main h1")].map(el => el.textContent?.trim()),
          canonicalLinks: [...document.querySelectorAll('link[rel="canonical"]')].map(el => el.href),
          robots: meta('meta[name="robots"]'),
          ogType: meta('meta[property="og:type"]'),
          ogImage: meta('meta[property="og:image"]'),
          ogUrl: meta('meta[property="og:url"]'),
          pageText: main?.innerText || "",
          overflow: document.documentElement.scrollWidth - window.innerWidth,
          mainImages: [...(main?.querySelectorAll("img") || [])].map(img => ({
            src: img.currentSrc || img.src, alt: img.alt, width: img.naturalWidth, complete: img.complete,
          })),
          links: [...(main?.querySelectorAll("a[href]") || [])].map(a => ({
            href: a.href, rel: a.rel, target: a.target,
            sponsored: !!a.dataset.commercialPartner,
          })),
          faqCount: main?.querySelectorAll("details").length || 0,
          schemas: jsonLd.map(item => ({ type: item["@type"], dateModified: item.dateModified, headline: item.headline, url: item.url })),
          headings: [...(main?.querySelectorAll("h2, h3") || [])].map(h => h.textContent?.trim()),
        };
      });
      assert.equal(snapshot.h1.length, 1, spec.name + " exactly one main H1");
      assert.match(snapshot.h1[0], /turkey/i, "correct species headline");
      assert.ok(snapshot.title.length > 25 && /turkey/i.test(snapshot.title), "SEO title");
      assert.ok(snapshot.description.length >= 70, "SEO description");
      assert.deepEqual(snapshot.canonicalLinks, [canonical], "one exact canonical, even when cache-busted");
      assert.doesNotMatch(snapshot.robots, /noindex/i, "indexable turkey page");
      assert.equal(snapshot.ogUrl, canonical, "canonical social URL");
      assert.equal(snapshot.ogType, "article", "turkey page must be marked as article, not website");
      assert.match(snapshot.ogImage, /fws\.gov.*rio_grande_wild_turkey/i, "specific licensed turkey social image");
      assert.ok(snapshot.overflow <= 3, spec.name + " horizontal overflow " + snapshot.overflow + "px");
      assert.ok(snapshot.schemas.some(schema => schema.type === "Article" && schema.dateModified), "dated Article JSON-LD");
      assert.ok(snapshot.schemas.some(schema => schema.type === "FAQPage"), "FAQ structured data");
      assert.ok(snapshot.schemas.some(schema => schema.type === "BreadcrumbList"), "breadcrumb structured data");
      assert.ok(snapshot.faqCount >= 8, "real accessible FAQ disclosure controls");
      assert.ok(snapshot.headings.some(h => h.includes("Official 2026–27 wild turkey season dates")), "season table section");
      for (const marker of essentialText) assert.ok(snapshot.pageText.includes(marker), spec.name + " stale or missing: " + marker);
      for (const row of calendar.rows) assert.ok(snapshot.pageText.includes(row.dates), "official season date missing: " + row.id);

      assert.ok(snapshot.mainImages.length >= 3, "turkey guide needs photo and both official zone maps");
      for (const alt of imageAlts) {
        // CSS selection uses literal alt prefixes so the same checks work on every viewport.
        const locator = page.locator("main img[alt^='" + alt + "']");
        assert.equal(await locator.count(), 1, "expected credited image missing: " + alt);
        await locator.scrollIntoViewIfNeeded({ timeout: 15000 });
        await locator.evaluate(img => img.decode());
        const details = await locator.evaluate(img => ({ complete: img.complete, width: img.naturalWidth, src: img.currentSrc || img.src, alt: img.alt }));
        assert.ok(details.complete && details.width > 0, "image did not decode: " + alt);
        assert.ok(details.src.startsWith("https://"), "turkey image URL must be HTTPS");
      }
      for (const item of snapshot.mainImages) {
        assert.ok(item.alt && item.alt.trim().length >= 12, "descriptive alt text on all article images");
        assert.ok(item.src.startsWith("https://"), "article images must use HTTPS");
      }
      assert.ok(snapshot.links.length >= 14, "authority page must retain source and internal links");
      for (const link of snapshot.links) {
        assert.ok(/^https?:/.test(link.href), "invalid main link scheme: " + link.href);
        if (link.target === "_blank") assert.ok(link.rel.includes("noopener") || link.rel.includes("noreferrer"), "external link safety (noreferrer implies noopener)");
        if (link.sponsored) assert.ok(link.rel.includes("sponsored") && link.rel.includes("nofollow"), "affiliate disclosure rel");
      }
      assert.ok(snapshot.pageText.includes("Affiliate disclosure:"), "visible affiliate disclosure");
      assert.ok(snapshot.links.some(l => l.href.startsWith("https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/turkey")), "official turkey regulation link");
      assert.ok(snapshot.links.some(l => l.href.startsWith("https://tpwd.texas.gov/huntwild/hunt/public/annual_public_hunting/search.phtml")), "official public legal-game finder link");
      if (spec.name === "desktop-canonical") {
        for (const path of ["/hunting", "/hunting/public-hunting", "/hunting/texas-hunting-license", "/hunting/drawn-hunts"]) {
          assert.ok(snapshot.links.some(link => new URL(link.href).pathname === path), "missing internal link " + path);
          const internal = await context.request.get(origin + path + "?__td_turkey_link_check=" + runToken, {
            timeout: 25000, headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
          });
          assert.ok(internal.ok(), "broken linked TexasDefined route " + path + ": HTTP " + internal.status());
        }
      }
      assert.equal(errors.length, 0, "browser runtime errors: " + errors.join(" | "));
      await page.screenshot({ path: proofDir + "/" + spec.name + ".png", fullPage: true, timeout: 45000 });
      results.push({ viewport: spec.name, title: snapshot.title, canonical: snapshot.canonicalLinks[0], imageCount: snapshot.mainImages.length, links: snapshot.links.length, sourceCheck: facts.checkedAt, layoutOverflowPx: snapshot.overflow, schemas: snapshot.schemas.map(s => s.type), errors });
    } catch (error) {
      await page.screenshot({ path: proofDir + "/" + spec.name + "-FAILED.png", fullPage: true, timeout: 12000 }).catch(() => {});
      results.push({ viewport: spec.name, failure: String(error) });
      throw error;
    } finally {
      await context.close();
    }
  }
  assert.equal(results.length, 4, "all four exact-page viewport/cache variants were tested");
  assert.equal(results[0].title, results[1].title, "canonical and cache-bypassed page titles agree");
  console.log("PASS exact turkey page: canonical + cache-bypass, 1440/390/320px Chrome, responsive layout, all dated season markers, indexed SEO, Article/FAQ schema, loaded credited photos/maps, source and internal links.");
} finally {
  await browser.close();
  await writeFile(proofDir + "/evidence.json", JSON.stringify({ route: canonical, sourceDate: facts.checkedAt, commit: process.env.GITHUB_SHA, results }, null, 2));
}
