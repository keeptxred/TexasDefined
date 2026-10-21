import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";

const { chromium } = createRequire(import.meta.url)(
  process.env.PLAYWRIGHT_CORE_PATH || "/tmp/texasdefined-reservoir-qa/node_modules/playwright-core"
);
const origin = (process.env.PRODUCTION_ORIGIN || "https://texasdefined.com").replace(/\/$/, "");
const articlePath = "/article/texas-lakes-reservoirs-explained";
const output = "artifacts/texas-reservoirs-article-browser";
const viewports = [
  { name: "desktop", width: 1440, height: 900, isMobile: false },
  { name: "mobile", width: 390, height: 844, isMobile: true },
];
const bodyImages = [
  "caddo-lake-state-park.jpg",
  "texas-reservoir-on-off-channel.svg",
  "texas-reservoir-conservation-flood-pools.svg",
  "amistad-national-recreation-area.jpg",
];
const internalPaths = [
  "/fishing/lakes",
  "/fishing/lakes/lake-conroe",
  "/fishing/lakes/lake-livingston",
  "/fishing/lakes/sam-rayburn-reservoir",
  "/article/texas-river-basins-guide",
  "/explore/lakes-rivers",
  "/fishing/lakes/lake-stamford",
  "/fishing/lakes/lake-sweetwater",
  "/article/texas-rivers-explained",
  "/article/lake-buchanan-water-system-guide",
  "/article/lake-travis-water-system-guide",
  "/article/lake-whitney-water-system-guide",
  "/article/possum-kingdom-water-system-guide",
  "/article/toledo-bend-water-system-guide",
  "/article/texas-major-springs-clear-water-guide",
  "/article/texas-regions-explained",
];
const sourceUrls = [
  "https://www.twdb.texas.gov/surfacewater/rivers/",
  "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/index.asp",
  "https://waterdatafortexas.org/reservoirs/statewide",
  "https://www.twdb.texas.gov/waterplanning/swp/2027/",
  "https://www.twdb.texas.gov/waterplanning/swp/2027/docs/Existing_Major_Water_Supply_Reservoirs_042026.pdf",
  "https://www.twdb.texas.gov/waterplanning/swp/2027/docs/Recommended_New_Major_Water_Supply_Reservoirs_042026.pdf",
  "https://www.twdb.texas.gov/innovativewater/asr/projects/LCRA/index.asp",
  "https://tpwd.texas.gov/education/resources/aquatic-science/tas/chapters/chapter-9/",
  "https://tpwd.texas.gov/state-parks/caddo-lake/history",
  "https://commons.wikimedia.org/wiki/File:Big_Cypress_Bayou,_Caddo_Lake_State_Park,_Harrison_County,_Texas,_USA_(April_2017).jpg",
  "https://creativecommons.org/licenses/by-sa/4.0/",
  "https://www.tceq.texas.gov/downloads/permitting/water-rights/forms/10214a.pdf",
];
const findings = { viewports: [], internalLinks: [], sourceLinks: [], failures: [], warnings: [] };
const assert = (condition, message) => { if (!condition) throw new Error(message); };
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_BIN || "/usr/bin/google-chrome",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
try {
  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.isMobile,
      hasTouch: vp.isMobile,
      deviceScaleFactor: 1,
    });
    await context.route(/(google-analytics|googletagmanager|connect\.facebook\.net|facebook\.com\/tr|\/api\/analytics|\/api\/track)/i,
      route => route.abort());
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", e => errors.push(e.message));
    try {
      const url = origin + articlePath + "?article_browser_qa=" + (process.env.GITHUB_SHA || "verification").slice(0,12);
      const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
      assert(response?.status() === 200, vp.name + " article HTTP " + response?.status());
      await page.getByRole("heading", { name: "Why Almost All Texas Lakes Are Man-Made", exact: true }).waitFor({
        state: "visible", timeout: 20000,
      });
      const text = await page.locator("body").innerText({ timeout: 12000 });
      for (const phrase of [
        "How many major reservoirs?",
        "188 major water-supply reservoirs",
        "Arbuckle Reservoir",
        "on-channel",
        "off-channel",
        "William L. Farr",
        "CC BY-SA 4.0",
        "Sources and further reading",
      ]) {
        assert(text.includes(phrase), vp.name + " missing current editorial content: " + phrase);
      }
      assert(!text.includes("Texas did not begin with a landscape full of big lakes"), vp.name + " serves superseded content");
      const imageResults = [];
      for (const imageName of ["ray-roberts-lake-isle-du-bois-unit.jpg", ...bodyImages]) {
        const target = page.locator('img[src*="' + imageName + '"]').first();
        assert(await target.count() === 1, vp.name + " missing expected rendered photograph/diagram: " + imageName);
        await target.scrollIntoViewIfNeeded({ timeout: 20000 });
        await target.evaluate(async node => {
          if (node.complete) return;
          await Promise.race([
            new Promise(resolve => {
              node.addEventListener("load", resolve, { once: true });
              node.addEventListener("error", resolve, { once: true });
            }),
            new Promise(resolve => setTimeout(resolve, 12000)),
          ]);
        });
        const metrics = await target.evaluate(node => ({
          width: node.naturalWidth, height: node.naturalHeight, src: node.currentSrc,
          alt: node.getAttribute("alt") || "",
        }));
        assert(metrics.width >= 90 && metrics.height >= 30,
          vp.name + " image unloaded or wrong dimensions: " + imageName + " " + JSON.stringify(metrics));
        assert(metrics.alt.length > 25, vp.name + " image lacks descriptive alt text: " + imageName);
        imageResults.push({ image: imageName, naturalWidth: metrics.width, naturalHeight: metrics.height });
      }
      const doc = await page.evaluate(() => ({
        viewportWidth: window.innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        bodyWidth: document.body.scrollWidth,
      }));
      assert(doc.documentWidth <= doc.viewportWidth + 8 && doc.bodyWidth <= doc.viewportWidth + 8,
        vp.name + " horizontal overflow: " + JSON.stringify(doc));
      for (const path of [
        "/fishing/lakes/lake-conroe",
        "/fishing/lakes/lake-livingston",
        "/article/texas-river-basins-guide",
      ]) assert(await page.locator('a[href="' + path + '"]').count() > 0, vp.name + " missing related link " + path);
      await page.screenshot({ path: output + "/" + vp.name + ".png", fullPage: true, animations: "disabled" });
      findings.viewports.push({ viewport: vp.name, status: "pass", dimensions: doc, images: imageResults, pageErrors: errors });
      console.log("PASS " + vp.name + " article layout, complete image loading, current copy and related links");
    } catch (error) {
      findings.failures.push(vp.name + ": " + (error?.message || error));
      console.error("::error title=Reservoir browser acceptance::" + findings.failures.at(-1));
      await page.screenshot({ path: output + "/FAIL-" + vp.name + ".png", fullPage: true, timeout: 15000 }).catch(() => {});
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
}
async function probe(url, method = "GET") {
  const response = await fetch(url, {
    method, redirect: "follow", cache: "no-store", signal: AbortSignal.timeout(20000),
    headers: { "user-agent": "TexasDefined-Editorial-QA/1.0 (+https://texasdefined.com)", "accept": "text/html,application/pdf,*/*" },
  });
  return { url, status: response.status, finalUrl: response.url };
}
for (let index = 0; index < internalPaths.length; index += 4) {
  const results = await Promise.all(internalPaths.slice(index, index + 4).map(async path => {
    try { return await probe(origin + path); }
    catch (error) { return { url: origin + path, error: String(error?.message || error) }; }
  }));
  for (const r of results) {
    findings.internalLinks.push(r);
    if (r.status !== 200) findings.failures.push("Internal link failed: " + JSON.stringify(r));
  }
}
for (let index = 0; index < sourceUrls.length; index += 4) {
  const results = await Promise.all(sourceUrls.slice(index, index + 4).map(async url => {
    try {
      let r = await probe(url, "HEAD");
      if (r.status === 405 || r.status === 501) r = await probe(url, "GET");
      return r;
    } catch (error) { return { url, error: String(error?.message || error) }; }
  }));
  for (const r of results) {
    findings.sourceLinks.push(r);
    if (!r.status || r.status >= 400) findings.warnings.push("External source response not verified: " + JSON.stringify(r));
  }
}
console.log(JSON.stringify({
  internalLinks: findings.internalLinks.length,
  healthyInternalLinks: findings.internalLinks.filter(x => x.status === 200).length,
  externalSources: findings.sourceLinks.length,
  healthyExternalSources: findings.sourceLinks.filter(x => x.status && x.status < 400).length,
  warnings: findings.warnings,
  failures: findings.failures,
}));
await writeFile(output + "/results.json", JSON.stringify(findings, null, 2));
if (findings.failures.length) process.exitCode = 1;
