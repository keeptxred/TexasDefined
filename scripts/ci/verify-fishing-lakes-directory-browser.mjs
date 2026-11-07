/**
 * Bounded real-Chrome acceptance of the live 72-guide directory.
 * This is not a site-wide crawl or a simulated screenshot. Exercises React
 * hydration, filters, sorting, restriction notices, real comparison handoff,
 * SSR JSON-LD and mobile overflow on the ordinary production URL.
 */
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";

const { chromium } = createRequire(import.meta.url)(
  process.env.PLAYWRIGHT_CORE_PATH || "/tmp/texasdefined-fishing-lakes-qa/node_modules/playwright-core",
);
const origin = (process.env.PRODUCTION_ORIGIN || "https://texasdefined.com").replace(/\/$/, "");
const canonical = "https://texasdefined.com/fishing/lakes";
const output = "artifacts/fishing-lakes-directory-browser";
await mkdir(output, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_BIN || "/usr/bin/google-chrome",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const failures = [];
const results = [];

async function count(page) {
  const raw = await page.locator('p[role="status"][aria-live="polite"]').textContent();
  const match = raw?.match(/Showing\s+(\d+)\s+of\s+(\d+)\s+lake guides/i);
  assert.ok(match, "Visible lake count was not rendered");
  return { shown: Number(match[1]), total: Number(match[2]) };
}

async function awaitFiltered(page, test) {
  await page.waitForFunction(
    ({ expected }) => {
      const status = document.querySelector('p[role="status"][aria-live="polite"]')?.textContent || "";
      const match = status.match(/Showing\s+(\d+)\s+of\s+(\d+)\s+lake guides/i);
      return Boolean(match && match[2] === "72" && ((expected === "some" && +match[1] > 0 && +match[1] < 72)
        || (expected === "all" && +match[1] === 72)
        || (expected === "restricted" && +match[1] === 1)
        || (expected === "exclude" && +match[1] === 71)));
    },
    { expected: test }, { timeout: 16000 },
  );
}

function lakeCard(page, slug) {
  return page.locator('section[aria-labelledby="lake-directory-heading"] article')
    .filter({ has: page.locator('h3 a[href="/fishing/lakes/' + slug + '"]') });
}

for (const { name, viewport, mobile } of [
  { name: "desktop", viewport: { width: 1366, height: 900 }, mobile: false },
  { name: "mobile", viewport: { width: 390, height: 844 }, mobile: true },
]) {
  const context = await browser.newContext({
    viewport, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile,
  });
  await context.route(/google-analytics|googletagmanager|connect\.facebook\.net|facebook\.com\/tr|\/api\/analytics|\/api\/track/i, route => route.abort());
  const page = await context.newPage();
  const pageErrors = [];
  page.on("pageerror", error => pageErrors.push(String(error)));
  try {
    const response = await page.goto(origin + "/fishing/lakes", { waitUntil: "domcontentloaded", timeout: 60000 });
    assert.equal(response?.status(), 200, name + ": directory is not HTTP 200 on ordinary URL");
    await page.getByRole("heading", { name: "Texas fishing lakes", exact: true }).waitFor({ state: "visible", timeout: 25000 });
    await page.getByRole("searchbox", { name: "Lake, county or city" }).waitFor({ state: "visible", timeout: 25000 });
    const initial = await page.evaluate(() => {
      const scripts = [...document.querySelectorAll('script[type="application/ld+json"]')];
      const nodes = scripts.flatMap(script => {
        try {
          const value = JSON.parse(script.textContent || "{}");
          return Array.isArray(value) ? value.flatMap(row => row["@graph"] || [row]) : value["@graph"] || [value];
        } catch { return []; }
      });
      const faq = nodes.find(row => row["@type"] === "FAQPage");
      const itemList = nodes.find(row => row["@type"] === "ItemList" && row.numberOfItems === 72);
      const visible = [...document.querySelectorAll('section[aria-labelledby="lake-answers-heading"] article')]
        .map(article => ({ name: article.querySelector("h3")?.textContent?.trim(), text: article.querySelector("p")?.textContent?.trim() }));
      return {
        title: document.title, h1: [...document.querySelectorAll("h1")].map(row => row.textContent?.trim()),
        canonical: document.querySelector('link[rel="canonical"]')?.href,
        robots: [...document.querySelectorAll('meta[name="robots"]')].map(row => row.content).join(" "),
        itemCount: itemList?.numberOfItems, linkCount: itemList?.itemListElement?.length,
        deprecatedFaqSchemaPresent: Boolean(faq),
        visible, viewport: window.innerWidth, docWidth: document.documentElement.scrollWidth,
      };
    });
    assert.equal(initial.canonical, canonical, name + ": canonical mismatch");
    assert.equal(initial.h1.length, 1, name + ": duplicate H1");
    assert.match(initial.title, /Texas Fishing Lakes/i);
    assert.doesNotMatch(initial.robots, /noindex/i, name + ": valid collection page incorrectly noindexed");
    assert.equal(initial.itemCount, 72, name + ": directory ItemList count incorrect");
    assert.equal(initial.linkCount, 72, name + ": directory ItemList URLs incomplete");
    assert.equal(initial.deprecatedFaqSchemaPresent, false, name + ": deprecated FAQPage rich-result markup must be absent");
    assert.equal(initial.visible.length, 4, name + ": useful visible quick answers were removed");
    assert.ok(initial.visible.every((item) => item.name && item.text), name + ": reader answers incomplete");
    assert.ok(initial.docWidth <= initial.viewport + 8, name + ": document horizontally overflows");
    assert.equal((await count(page)).total, 72);
    // All 72 complete guides stay directly linked in the server-rendered A-Z index,
    // while detailed imagery and card prose render in progressive, accessible batches.
    const directory = page.locator('section[aria-labelledby="lake-directory-heading"]');
    const cards = directory.locator("article");
    const allGuides = page.getByRole("navigation", { name: "All matching fishing lake guides" });
    const jumpLinks = allGuides.locator('a[href^="/fishing/lakes/"]');
    assert.equal(await jumpLinks.count(), 72, name + ": complete lake link index missing entries");
    assert.equal(new Set(await jumpLinks.evaluateAll(links => links.map(a => a.getAttribute("href")))).size, 72,
      name + ": duplicate A-Z lake guide destinations");
    // TanStack Start streams the A–Z jump index before the detailed card grid.
    // In real mobile Chrome the 72 SSR links may already be present while the
    // next HTML chunk is still arriving. Require the exact complete first batch
    // before checking its size; a missing/broken batch still fails after 25s.
    await page.waitForFunction(
      () => document.querySelectorAll('section[aria-labelledby="lake-directory-heading"] article').length === 12,
      null, { timeout: 25000 },
    );
    assert.equal(await cards.count(), 12, name + ": initial detailed card budget should be 12");
    await page.screenshot({ path: output + "/" + name + "-initial.png", fullPage: false, animations: "disabled" });
    for (const expected of [24, 36]) {
      await page.getByRole("button", { name: /Show 12 more lake cards/ }).click();
      await page.waitForFunction(expectedCards =>
        document.querySelectorAll('section[aria-labelledby="lake-directory-heading"] article').length === expectedCards,
        expected, { timeout: 16000 });
      assert.equal(await jumpLinks.count(), 72, name + ": expanding cards lost complete lake link index");
    }
    await page.getByRole("button", { name: "Clear filters" }).click();
    await page.waitForFunction(() =>
      document.querySelectorAll('section[aria-labelledby="lake-directory-heading"] article').length === 12,
      null, { timeout: 16000 });

    // Real input events and SSR hydration; not just markup inspection.
    await page.getByRole("searchbox", { name: "Lake, county or city" }).fill("Lake Conroe");
    await awaitFiltered(page, "some");
    assert.equal(await lakeCard(page, "lake-conroe").count(), 1, name + ": Lake Conroe missing from search");
    const tpwd = lakeCard(page, "lake-conroe").getByRole("link", { name: /TPWD fishery profile/ });
    assert.match(await tpwd.getAttribute("href"), /^https:\/\/tpwd\.texas\.gov\/fishboat\/fish\/recreational\/lakes\/conroe\//, name + ": card missing exact official source");
    assert.match(await lakeCard(page, "lake-conroe").textContent(), /Source-reviewed trip options|Researched seasonal patterns/, name + ": researched trip-fit evidence missing");

    await page.getByRole("button", { name: "Clear filters" }).click();
    await awaitFiltered(page, "all");
    await page.getByLabel("Region", { exact: true }).selectOption("hill-country");
    await awaitFiltered(page, "some");
    assert.ok((await page.locator('section[aria-labelledby="lake-directory-heading"] article').first().textContent()).includes("Hill Country"),
      name + ": region selection has wrong region");
    await page.getByRole("button", { name: "Clear filters" }).click();
    await awaitFiltered(page, "all");

    await page.getByLabel("Documented access type", { exact: true }).selectOption("boat");
    await awaitFiltered(page, "some");
    assert.match(await directory.locator("article").first().textContent(), /boat ramp\(s\)/i, name + ": boat-ramp filter returns unsupported facility");
    await page.getByRole("button", { name: "Clear filters" }).click();
    await awaitFiltered(page, "all");
    await page.getByLabel("Research season", { exact: true }).selectOption("winter");
    const winterStatus = await count(page);
    assert.ok(winterStatus.shown > 0 && winterStatus.shown <= 72, name + ": winter research filter missing seasonal profiles");
    await page.getByRole("button", { name: "Clear filters" }).click();
    await awaitFiltered(page, "all");
    await page.getByLabel("Target species", { exact: true }).selectOption("Alligator gar");
    await awaitFiltered(page, "some");
    for (const text of await page.locator('section[aria-labelledby="lake-directory-heading"] article').allTextContents()) {
      assert.ok(text.includes("Alligator gar"), name + ": species filter included unrelated lake");
    }
    await page.getByRole("button", { name: "Clear filters" }).click();
    await awaitFiltered(page, "all");

    const access = page.getByLabel("Documented access restrictions", { exact: true });
    await access.selectOption("restricted");
    await awaitFiltered(page, "restricted");
    assert.equal(await lakeCard(page, "lake-abilene").count(), 1);
    const restricted = lakeCard(page, "lake-abilene");
    assert.match(await restricted.textContent(), /Official access restriction.*check before travel/);
    assert.equal(await restricted.getByRole("link", { name: "View official park alert" }).getAttribute("href"),
      "https://tpwd.texas.gov/state-parks/abilene/alert/");
    await page.screenshot({ path: output + "/" + name + "-restricted.png", fullPage: false, animations: "disabled" });
    await access.selectOption("exclude-restricted");
    await awaitFiltered(page, "exclude");
    assert.equal(await lakeCard(page, "lake-abilene").count(), 0, name + ": restricted lake not excluded");
    await page.getByRole("button", { name: "Clear filters" }).click();
    await awaitFiltered(page, "all");

    const areas = async () => {
      const values = await page.locator('section[aria-labelledby="lake-directory-heading"] article')
        .first().locator("p").allTextContents();
      const found = values.map(v => v.trim().match(/^([\d,]+) acres$/)).find(Boolean);
      assert.ok(found, name + ": first sorted card has no measured surface area");
      return Number(found[1].replaceAll(",", ""));
    };
    await page.getByLabel("Sort guides", { exact: true }).selectOption("largest");
    const largest = await areas();
    await page.getByLabel("Sort guides", { exact: true }).selectOption("smallest");
    const smallest = await areas();
    assert.ok(largest > smallest && largest > 10000 && smallest < 1000,
      name + ": area sort did not reorder appropriately");

    await page.getByRole("button", { name: "Clear filters" }).click();
    await awaitFiltered(page, "all");
    for (const { slug, query } of [
      { slug: "lake-conroe", query: "Lake Conroe" },
      { slug: "lake-abilene", query: "Lake Abilene" },
      { slug: "sam-rayburn-reservoir", query: "Sam Rayburn Reservoir" },
    ]) {
      // The chosen lake may not be among the first 12 alphabetical cards.
      // A visitor can find and select it via the existing search; prior
      // selections must survive filters and progressive rendering changes.
      await page.getByRole("searchbox", { name: "Lake, county or city" }).fill(query);
      await lakeCard(page, slug).waitFor({ state: "visible", timeout: 16000 });
      assert.equal(await lakeCard(page, slug).count(), 1, name + ": searched comparison lake not visible: " + slug);
      await lakeCard(page, slug).getByRole("checkbox", { name: "Compare this lake" }).check();
    }
    const compare = page.getByRole("link", { name: /Compare 3 selected lakes/ });
    const href = await compare.getAttribute("href");
    assert.equal(href, "/fishing/compare?lake1=lake-conroe&lake2=lake-abilene&lake3=sam-rayburn-reservoir",
      name + ": comparison URL dropped selections");
    await compare.click();
    await page.getByRole("heading", { name: "Compare Texas Fishing Lakes Side by Side" })
      .waitFor({ state: "visible", timeout: 30000 });
    for (const lake of ["Lake Conroe", "Lake Abilene", "Sam Rayburn Reservoir"]) {
      assert.ok((await page.locator("h3").allTextContents()).some(text => text.trim() === lake),
        name + ": compare page dropped " + lake);
    }
    assert.equal(pageErrors.length, 0, name + ": uncaught JS exceptions: " + pageErrors.join("; "));
    // A full-document link can expose the newly parsed headings before its
    // CSS and fonts finish loading. The previous verifier saw a temporary
    // 1833px unstyled document at 1366px, then 1366px after ~100ms; direct
    // loads and settled navigations have no document overflow. Wait for a
    // *correct finished layout*, not an arbitrary delay or a skipped check.
    await page.waitForLoadState("load", { timeout: 30000 });
    await page.waitForFunction(() => {
      const region = document.querySelector('[role="region"][aria-label="Lake comparison table"]');
      const table = region?.querySelector("table");
      return Boolean(region && table &&
        document.documentElement.scrollWidth <= window.innerWidth + 8 &&
        region.getBoundingClientRect().right <= window.innerWidth + 8);
    }, null, { timeout: 15000 });
    const widthAfter = await page.evaluate(() => {
      const region = document.querySelector('[role="region"][aria-label="Lake comparison table"]');
      const table = region?.querySelector("table");
      return { width: document.documentElement.scrollWidth, viewport: window.innerWidth,
        scrollableWidth: region?.scrollWidth, scrollableClient: region?.clientWidth,
        columnHeaders: table?.querySelectorAll('thead th[scope="col"]').length,
        rowHeaders: table?.querySelectorAll('tbody th[scope="row"]').length,
        keyboard: region?.tabIndex === 0 };
    });
    assert.ok(widthAfter.width <= widthAfter.viewport + 8, name + ": settled compare page document overflow");
    assert.equal(widthAfter.columnHeaders, 4, name + ": each selected lake requires a semantic column header");
    assert.equal(widthAfter.rowHeaders, 9, name + ": comparison topics must have semantic row headers");
    assert.equal(widthAfter.keyboard, true, name + ": the comparison scroll region must be keyboard focusable");
    if (mobile) assert.ok(widthAfter.scrollableWidth > widthAfter.scrollableClient,
      name + ": three-lake table must scroll *inside its region* rather than widen the document");
    results.push({ name, canonical: initial.canonical, guides: initial.itemCount, initialCards: 12, progressiveCardsVerified: 36, allGuideLinks: 72, retiredFaqSchemaAbsent: true, visibleQuickAnswers: 4, sourceVerifiedTripFilters: true,
      search: true, region: true, species: true, restriction: true, sorting: { largest, smallest },
      compare: true, noDocumentOverflow: true, errors: pageErrors });
    console.log("PASS fishing-lakes " + name + ": 72 crawlable lake guide links, 12-card progressive rendering, FAQ parity, filters/sort/restrictions, cross-filter comparison and layout");
  } catch (error) {
    failures.push(name + ": " + String(error) + (pageErrors.length ? " JS: " + pageErrors.join("; ") : ""));
    try { await page.screenshot({ path: output + "/" + name + "-failure.png", fullPage: false, timeout: 12000 }); } catch {}
  } finally {
    await context.close();
  }
}
await browser.close();
const report = { checkedAt: new Date().toISOString(), origin, canonical, results, failures,
  constraints: "Two bounded viewport visits; ordinary public URL, not cached search snippets; no external booking links clicked" };
await writeFile(output + "/report.json", JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report));
assert.deepEqual(failures, [], "Live fishing-lakes directory browser acceptance failed");
