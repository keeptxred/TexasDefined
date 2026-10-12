import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || "/tmp/texasdefined-castle-qa/node_modules/playwright-core");
const origin = (process.env.PRODUCTION_ORIGIN || "https://texasdefined.com").replace(/\/$/, "");
const route = "/article/newmans-castle-bellville-texas";
const url = origin + route;
const out = "artifacts/newmans-castle-browser";
const report = { url, checkedAt: new Date().toISOString(), viewports: [], crossLink: null, errors: [] };
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN, args: ["--no-sandbox"] });

async function snapshot(page) {
  return page.evaluate(() => {
    const article = document.querySelector("article");
    const hero = article?.querySelector("section.relative img");
    const sources = document.getElementById("authority-sources-heading")?.closest("section");
    const entities = [];
    const add = (obj) => {
      if (!obj || typeof obj !== "object") return;
      if (Array.isArray(obj)) return obj.forEach(add);
      if (typeof obj["@type"] === "string") entities.push(obj);
      for (const [key, value] of Object.entries(obj)) if (key !== "@type" && value && typeof value === "object") add(value);
    };
    for (const node of document.querySelectorAll('script[type="application/ld+json"]')) {
      try { add(JSON.parse(node.textContent || "{}")); } catch {}
    }
    const one = (type) => entities.find((entity) => entity["@type"] === type && (type !== "ImageObject" || String(entity["@id"] || "").endsWith("/article/newmans-castle-bellville-texas#primaryimage"))) || {};
    return {
      canonical: document.querySelector('link[rel="canonical"]')?.href || "",
      description: document.querySelector('meta[name="description"]')?.content || "",
      robots: document.querySelector('meta[name="robots"]')?.content || "",
      title: document.title,
      heading: [...(article?.querySelectorAll("h1") || [])].map((el) => el.innerText),
      mainCount: document.querySelectorAll("main").length,
      body: article?.innerText || "",
      sourceLinks: [...(sources?.querySelectorAll("a[href]") || [])].map((el) => el.href),
      credit: [...(article?.querySelectorAll("p") || [])].map((el) => el.innerText).find((s) => s.includes("Image credit:")) || "",
      hero: hero ? { alt: hero.alt, width: hero.naturalWidth, height: hero.naturalHeight, src: hero.currentSrc } : null,
      faq: one("FAQPage"), imageSchema: one("ImageObject"), articleSchema: one("Article"),
      scrollWidth: document.documentElement.scrollWidth, width: window.innerWidth,
    };
  });
}

try {
  for (const [label, width, height] of [["mobile",390,844], ["tablet",768,1024], ["desktop",1440,900]]) {
    const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    const entry = { viewport: label, checks: [], errors: [] };
    report.viewports.push(entry);
    page.on("pageerror", (e) => entry.errors.push(e.message));
    page.on("console", (msg) => { if (msg.type() === "error" && /hydrat|react error|#418|#423/i.test(msg.text())) entry.errors.push(msg.text()); });
    try {
      const response = await page.goto(url + "?qa=newmans-castle-" + label + "-" + Date.now(), { waitUntil: "domcontentloaded", timeout: 60000 });
      assert.equal(response?.status(), 200, label + ": article HTTP status");
      await page.locator("article h1").waitFor({ state: "visible", timeout: 30000 });
      await page.waitForFunction(() => document.documentElement.dataset.tdRootHydrated === "1", null, { timeout: 25000 });
      await page.waitForFunction(() => {
        const img = document.querySelector("article section.relative img");
        return img && img.complete;
      }, null, { timeout: 20000 });
      const inlineFigures = page.locator(".editorial-body figure");
      assert.equal(await inlineFigures.count(), 2, label + ": expected two rights-verified in-story photographs");
      for (let photo = 0; photo < 2; photo += 1) {
        const image = inlineFigures.nth(photo).locator("img");
        await image.scrollIntoViewIfNeeded();
        await page.waitForFunction((index) => {
          const image = document.querySelectorAll(".editorial-body figure img")[index];
          return image && image.complete;
        }, photo, { timeout: 20000 });
      }
      entry.inlinePhotographs = await inlineFigures.evaluateAll((figures) => figures.map((figure) => {
        const image = figure.querySelector("img");
        return {
          src: image?.currentSrc ?? image?.src ?? "",
          alt: image?.alt ?? "",
          width: image?.naturalWidth ?? 0,
          height: image?.naturalHeight ?? 0,
          credit: figure.querySelector("figcaption")?.innerText ?? "",
        };
      }));
      assert.ok(entry.inlinePhotographs.every((photo) => photo.width > 0 && photo.height > 0),
        label + ": castle photographs failed to load: " + JSON.stringify(entry.inlinePhotographs));
      assert.equal(new Set(entry.inlinePhotographs.map((photo) => photo.src)).size, 2, label + ": duplicate photos");
      assert.ok(entry.inlinePhotographs.every((photo) => photo.alt.includes("Newman's Castle") &&
        photo.credit.includes("CC BY 2.0") && photo.credit.includes("flickr.com/photos/57412095")),
        label + ": photo identity or per-image reuse attribution missing");
      const data = await snapshot(page);
      entry.metadata = { h1: data.heading, canonical: data.canonical, hero: data.hero, sourceCount: data.sourceLinks.length, overflow: data.scrollWidth - data.width };
      assert.equal(data.heading.length, 1, label + ": require exactly one H1");
      assert.match(data.heading[0], /Newman's Castle in Bellville/i);
      assert.equal(data.mainCount, 1, label + ": require one main landmark");
      assert.equal(data.canonical, url);
      assert.ok(data.description.length >= 80 && data.title.includes("Newman's Castle"));
      assert.doesNotMatch(data.robots, /noindex/i);
      assert.ok(data.scrollWidth - data.width <= 12, label + ": horizontal overflow");
      assert.ok(data.body.includes("3,400") && data.body.includes("42 feet") && data.body.includes("24 feet"), label + ": dimension evidence missing");
      assert.ok(data.body.includes("alligator") && data.body.includes("unconfirmed"), label + ": unqualified alligator folklore");
      assert.ok(data.body.includes("1041 Old Highway 36") && data.body.includes("check in at the castle"), label + ": current tour guidance absent");
      assert.ok(data.body.includes("Chad Welty") && data.body.includes("Amanda"), label + ": family heritage missing");
      assert.ok(data.hero?.width > 0 && data.hero?.height > 0 && data.hero.alt.includes("Castle"), label + ": hero photograph not loaded");
      assert.ok(data.credit.includes("A Yee") && data.credit.includes("CC BY 2.0"), label + ": visible photo attribution missing");
      assert.ok(data.sourceLinks.length >= 16, label + ": source citations not visible");
      assert.ok(data.sourceLinks.every((link) => link.startsWith("https://")), label + ": invalid source URL");
      assert.ok(data.articleSchema.headline?.includes("Newman's Castle"), label + ": Article schema missing");
      assert.ok(String(data.articleSchema.citation).includes("newmanscastle.com"), label + ": primary-source schema missing");
      assert.ok(data.imageSchema.creditText?.includes("CC BY 2.0"), label + ": specific primary image credit missing: " + JSON.stringify(data.imageSchema));
      assert.ok(data.body.includes("Frequently asked questions"), label + ": visitor FAQ missing");
      assert.deepEqual(entry.errors, [], label + ": browser JS errors");
      entry.checks.push("HTTP 200, hydration, landmarks, SEO, responsive layout and absence of JS errors");
      entry.checks.push("Biography, dimensions, folklore qualifier, visitor guidance, loaded hero and rights");
      entry.checks.push("Visible bibliography, primary source schema, credited photo and visitor FAQs");
      entry.checks.push("Two distinct in-story castle photos fully loaded, with photographer, individual source and CC BY 2.0 rights");
      if (label !== "tablet") {
        await page.addScriptTag({ path: process.env.AXE_CORE_PATH || "/tmp/texasdefined-castle-qa/node_modules/axe-core/axe.min.js" });
        entry.accessibility = await page.evaluate(async () => {
          const audit = await window.axe.run(document.querySelector("article"), { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] } });
          return audit.violations.map((v) => ({ id: v.id, impact: v.impact, targets: v.nodes.map((node) => node.target).slice(0, 8) }));
        });
        assert.deepEqual(entry.accessibility.filter((v) => ["serious","critical"].includes(v.impact)), [], label + ": serious accessibility violations");
      }
      await inlineFigures.first().screenshot({ path: out + "/" + label + "-inline-1.png" });
      await inlineFigures.nth(1).screenshot({ path: out + "/" + label + "-inline-2.png" });
      await page.screenshot({ path: out + "/" + label + "-first-fold.png" });
      await page.locator("#authority-sources-heading").locator("xpath=..").screenshot({ path: out + "/" + label + "-citations.png" });
      entry.passed = true;
    } catch (error) {
      entry.passed = false;
      entry.errors.push(error.message || String(error));
      report.errors.push(label + ": " + (error.message || String(error)));
      await page.screenshot({ path: out + "/" + label + "-failure.png" }).catch(() => {});
    } finally { await context.close(); }
  }
  const page = await browser.newPage();
  try {
    const response = await page.goto(origin + "/article/unusual-texas-businesses-services?qa=castle-hub", { waitUntil: "domcontentloaded", timeout: 60000 });
    const count = await page.locator('article a[href*="/article/newmans-castle-bellville-texas"]').count();
    report.crossLink = { http: response?.status(), links: count };
    assert.ok(response?.status() === 200 && count > 0, "hub must link to Newman's Castle");
  } catch (error) { report.errors.push("hub link: " + (error.message || String(error))); }
  finally { await page.close(); }
} finally {
  await browser.close();
  await writeFile(out + "/report.json", JSON.stringify(report, null, 2));
}
console.log(JSON.stringify({ viewports: report.viewports.map(({ viewport, passed, errors, accessibility }) => ({ viewport, passed, errors, accessibility })), crossLink: report.crossLink, errors: report.errors }, null, 2));
assert.deepEqual(report.errors, [], "Newman's Castle production browser regression failed");
