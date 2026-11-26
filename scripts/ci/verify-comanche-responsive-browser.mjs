import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const driverRoot = process.env.COMANCHE_QA_DRIVER_ROOT || "/tmp/texasdefined-comanche-qa/node_modules";
const { chromium } = require(driverRoot + "/playwright-core");
const origin = (process.env.COMANCHE_PUBLIC_ORIGIN || "https://texasdefined.com").replace(/\/$/, "");
const targets = [
  ["/destination/comanche", "Comanche", ["/county/comanche", "/destination/comanche-county-historical-museum"]],
  ["/county/comanche", "Comanche County", ["/destination/comanche", "/destination/comanche-county-historical-museum"]],
  ["/destination/comanche-county-historical-museum", "Comanche County Historical Museum", ["/destination/comanche", "/county/comanche"]],
];
const report = { checkedAt: new Date().toISOString(), results: [], errors: [] };
const out = "artifacts/comanche-browser";
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN, args: ["--no-sandbox"] });
try {
  for (const [path, heading, links] of targets) {
    for (const [label, width, height] of [["mobile",390,844],["desktop",1440,900]]) {
      const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, isMobile: label === "mobile", hasTouch: label === "mobile" });
      const page = await context.newPage();
      const key = path.replace(/^\//,"").replaceAll("/","-") + "-" + label;
      const entry = { path, viewport: label, errors: [] };
      report.results.push(entry);
      page.on("pageerror", e => entry.errors.push(e.message));
      page.on("console", msg => { if (msg.type() === "error" && /hydrat|react error|#418|#423/i.test(msg.text())) entry.errors.push(msg.text()); });
      try {
        const response = await page.goto(origin + path + "?comanche-browser=" + Date.now(), { waitUntil: "domcontentloaded", timeout: 60000 });
        assert.equal(response?.status(), 200, "HTTP status");
        await page.locator("h1").waitFor({ state: "visible" });
        await page.waitForFunction(() => document.documentElement.dataset.tdRootHydrated === "1", null, { timeout: 30000 });
        if (path.startsWith("/destination/")) {
          const hero = page.locator("main img").first();
          await hero.scrollIntoViewIfNeeded();
          await page.waitForFunction(() => document.querySelector("main img")?.complete, null, { timeout: 20000 });
        }
        entry.data = await page.evaluate(() => {
          const main = document.querySelector("main");
          const hero = main?.querySelector("img");
          const nav = performance.getEntriesByType("navigation")[0];
          return {
            heading: [...document.querySelectorAll("h1")].map(x => x.innerText.trim()),
            canonical: document.querySelector('link[rel="canonical"]')?.href,
            title: document.title,
            robots: document.querySelector('meta[name="robots"]')?.content || "",
            description: document.querySelector('meta[name="description"]')?.content || "",
            width: document.documentElement.clientWidth,
            scrollWidth: document.documentElement.scrollWidth,
            links: [...(main?.querySelectorAll("a[href]") || [])].map(a => { try { return new URL(a.href).pathname; } catch { return ""; } }),
            hero: hero ? { alt: hero.alt, src: hero.currentSrc, width: hero.naturalWidth } : null,
            navigationTiming: nav ? { responseStartMs: nav.responseStart, domContentLoadedMs: nav.domContentLoadedEventEnd, durationMs: nav.duration } : null,
          };
        });
        const d = entry.data;
        assert.deepEqual(d.heading, [heading], "one expected H1");
        assert.equal(d.canonical, origin + path, "canonical");
        assert.doesNotMatch(d.robots, /noindex/i);
        assert.ok(d.description && d.title.includes("Comanche"), "SEO title/description");
        assert.ok(d.scrollWidth <= d.width + 1, "horizontal document overflow: " + d.scrollWidth + " vs " + d.width);
        for (const link of links) assert.ok(d.links.includes(link), "missing contextual reciprocal link: " + link);
        if (path.startsWith("/destination/")) assert.ok(d.hero?.width > 0 && d.hero.alt, "hero not loaded or alt absent");
        if (path.endsWith("historical-museum")) {
          assert.match(d.hero.alt, /AI-generated editorial illustration.*not a photograph/i, "illustration must not impersonate museum");
          assert.ok(d.hero.src.includes("comanche-museum-hero.avif"), "generated museum artwork must actually load");
          assert.equal(d.hero.width, 1586, "generated museum image must retain full resolution");
        }
        await page.addScriptTag({ path: driverRoot + "/axe-core/axe.min.js" });
        entry.accessibility = await page.evaluate(async () => {
          const result = await window.axe.run(document.querySelector("main"), { runOnly: { type: "tag", values: ["wcag2a","wcag2aa","wcag21a","wcag21aa"] } });
          return result.violations.map(v => ({ id: v.id, impact: v.impact, targets: v.nodes.map(n => n.target) }));
        });
        assert.deepEqual(entry.accessibility.filter(v => ["serious","critical"].includes(v.impact)), [], "serious or critical automated accessibility issue");
        assert.deepEqual(entry.errors, [], "browser runtime errors");
        entry.passed = true;
      } catch (e) {
        entry.passed = false;
        entry.errors.push(e.message || String(e));
        report.errors.push(key + ": " + (e.message || String(e)));
      } finally {
        await page.screenshot({ path: out + "/" + key + ".png" }).catch(() => {});
        await context.close();
      }
    }
  }
} finally {
  await browser.close();
  await writeFile(out + "/report.json", JSON.stringify(report, null, 2));
}
console.log(JSON.stringify(report.results.map(({path,viewport,passed,errors})=>({path,viewport,passed,errors})),null,2));
assert.deepEqual(report.errors, [], "Comanche production browser regression failed");
