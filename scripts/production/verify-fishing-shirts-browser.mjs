/**
 * Read-only storefront visual QA. No cart interactions, purchases, seller writes
 * or external Cloudflare Browser Rendering API permissions.
 * Playwright runs within GitHub Actions against public TexasDefined pages.
 */
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || '/tmp/td-fishing-qa/node_modules/playwright-core');
const origin = (process.env.TEXASDEFINED_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const dir = 'artifacts/fishing-shirts-browser';
await mkdir(dir, { recursive: true });
const results = [];

const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROME_BIN ? { executablePath: process.env.CHROME_BIN } : {}),
  args: ['--no-sandbox'],
});

const checks = [
  { name: 'lake-conroe-desktop', path: '/fishing/lakes/lake-conroe', viewport: { width: 1440, height: 900 } },
  { name: 'fishing-hub-mobile', path: '/fishing', viewport: { width: 390, height: 844 } },
  { name: 'largemouth-bass-desktop', path: '/fishing/species/largemouth-bass', viewport: { width: 1440, height: 900 } },
];

try {
  for (const row of checks) {
    const context = await browser.newContext({ viewport: row.viewport });
    const page = await context.newPage();
    const entry = { ...row, errors: [], result: 'FAIL' };
    results.push(entry);
    page.on('pageerror', e => entry.errors.push(e.message));
    entry.imageNetwork = [];
    page.on('response', response => {
      if (/images\\.printify\\.com|i\\.etsystatic\\.com/.test(response.url())) entry.imageNetwork.push({ status: response.status(), url: response.url().slice(0, 240) });
    });
    page.on('requestfailed', request => {
      if (/images\\.printify\\.com|i\\.etsystatic\\.com/.test(request.url())) entry.imageNetwork.push({ failed: request.failure()?.errorText, url: request.url().slice(0, 240) });
    });
    try {
      const response = await page.goto(origin + row.path, { waitUntil: 'domcontentloaded', timeout: 60000 });
      assert.equal(response?.status(), 200, `${row.path}: unexpected HTTP ${response?.status()}`);
      const section = page.locator('[aria-label="Texas Defined fishing shirts"]');
      await section.waitFor({ state: 'visible', timeout: 25000 });
      const merchLinks = section.locator('a[href^="/shop/product/"]');
      const count = await merchLinks.count();
      assert.ok(count >= 2, `${row.path}: expected at least two shop product cards, got ${count}`);
      const first = section.locator('img').first();
      await first.scrollIntoViewIfNeeded({ timeout: 15000 });
      await first.waitFor({ state: 'visible', timeout: 15000 });
      // Images intentionally load lazily on mobile; wait for the actual decode,
      // not merely the visible <img> element or the section screenshot.
      await page.waitForFunction(() => {
        const img = document.querySelector('[aria-label="Texas Defined fishing shirts"] img');
        return img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0;
      }, null, { timeout: 20000 });
      const image = await first.evaluate(e => ({ complete: e.complete, naturalWidth: e.naturalWidth, src: e.currentSrc }));
      const screenshot = `${dir}/${row.name}.png`;
      await section.screenshot({ path: screenshot, animations: 'disabled', timeout: 20000 });
      if (!image.complete || image.naturalWidth === 0) {
        const source = await first.getAttribute('src');
        if (source && /^https?:/.test(source)) {
          try {
            const probe = await context.request.get(source, { timeout: 12000 });
            entry.imageProbe = { status: probe.status(), contentType: probe.headers()['content-type'] ?? null, bytes: (await probe.body()).length };
          } catch (error) { entry.imageProbe = { error: String(error) }; }
        }
        console.error('Image network diagnostics:', JSON.stringify({ name: row.name, image, network: entry.imageNetwork, probe: entry.imageProbe }));
      }
      assert.ok(image.complete && image.naturalWidth > 0, `${row.path}: actual product mockup failed to load: ${image.src}`);
      entry.result = 'PASS';
      entry.cards = count;
      entry.productMockupLoaded = true;
      entry.screenshot = screenshot;
      console.log(`PASS ${row.name}: ${count} real product cards, image loaded, screenshot ${screenshot}`);
    } catch (error) {
      entry.error = String(error);
      process.exitCode = 1;
      console.error(`FAIL ${row.name}: ${entry.error}`);
    } finally {
      await context.close();
    }
  }

  // A listing that loads is not enough: verify the actual shopper dropdown on
  // *every* launch shirt, including the one reported by the user. Read-only:
  // selecting an option never places an order or creates a cart item.
  const fishingProductIds = [
    "6add2977878131e6ba0c3b39", "6add29fdafea5e4b0809386a",
    "6add29cfafea5e4b0809383b", "6add29d86437b9edf205a8bb",
    "6add29de2f0d45364d02c4a6", "6add29e5c8a72b0cae01896a",
  ];
  const expectedSizes = [
    "3XL", "2XL", "2XL", "2XL", "XL", "XL", "XL",
    "L", "L", "L", "M", "M", "M", "S", "S", "S",
  ];
  if (process.env.VERIFY_LIVE_SIZE_ORDER === "1") {
  for (const id of fishingProductIds) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    const entry = { name: "size-order-" + id, path: "/shop/product/" + id, result: "FAIL" };
    results.push(entry);
    try {
      const response = await page.goto(origin + entry.path, { waitUntil: 'domcontentloaded', timeout: 60000 });
      assert.equal(response?.status(), 200, id + ": product page must be HTTP 200");
      const selector = page.locator('label:has-text("Choose an option") select').first();
      await selector.waitFor({ state: "visible", timeout: 20000 });
      // Initial server HTML can appear before TanStack/React hydration finishes.
      // Clicking or counting options too early can capture an empty transient
      // select or have React overwrite a selection during hydration.
      await page.waitForFunction(() => document.documentElement.dataset.tdRootHydrated === "1", null, { timeout: 30000 });
      await page.waitForFunction(() => {
        const target = [...document.querySelectorAll("select")].find((node) =>
          node.parentElement?.textContent?.includes("Choose an option"));
        return target?.options.length === 16;
      }, null, { timeout: 20000 });
      const options = await selector.locator("option").evaluateAll((nodes) => nodes.map((option) => ({
        id: option.value,
        name: (option.textContent || "").trim().split(/\s+[—–]\s+\$/)[0],
      })));
      entry.observedOptionCount = options.length;
      entry.observedOptionNames = options.map((option) => option.name);
      assert.equal(options.length, 16, id + ": expected 16 enabled shirt variants; observed " + options.length + ": " + entry.observedOptionNames.join(", "));
      const sizes = options.map((option) => option.name.split("/")[0].trim());
      assert.deepEqual(sizes, expectedSizes, id + ": wrong largest-to-smallest ordering");
      for (const size of [...new Set(sizes)]) {
        const colors = options.filter((option) => option.name.split("/")[0].trim() === size)
          .map((option) => option.name.split("/")[1]?.trim());
        assert.deepEqual(colors, [...colors].sort((a, b) => a.localeCompare(b)), id + ": colors not alphabetically ordered in " + size);
      }
      assert.equal(await selector.inputValue(), options[0].id, id + ": default must be first/largest variant");
      await selector.selectOption(options.at(-1).id);
      // Confirm the controlled React select retains the exact Printify ID.
      await page.waitForTimeout(250);
      assert.equal(await selector.inputValue(), options.at(-1).id, id + ": variant selection lost correct ID");
      entry.result = "PASS";
      entry.variants = options.length;
      entry.first = options[0].name;
      entry.last = options.at(-1).name;
      console.log("PASS " + entry.name + ": all 16 sizes and colors sorted, IDs preserved");
    } catch (error) {
      entry.error = String(error);
      process.exitCode = 1;
      console.error("FAIL " + entry.name + ": " + entry.error);
    } finally {
      await context.close();
    }
  }
  }
} finally {
  await browser.close();
  await writeFile(`${dir}/results.json`, JSON.stringify({ noPurchases: true, noEtsyWrites: true, results }, null, 2));
}
if (results.some(x => x.result !== 'PASS')) process.exitCode = 1;
