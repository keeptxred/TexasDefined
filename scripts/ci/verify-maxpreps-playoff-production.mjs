import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const { chromium } = createRequire(import.meta.url)('/tmp/texasdefined-wp-qa/node_modules/playwright-core');
const origin = 'https://texasdefined.com';
const path = '/texas-high-school-football-playoff-brackets';
const output = 'artifacts/maxpreps-playoffs-2026';
const results = [];
const failures = [];
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
const providerScript = 'https://www.maxpreps.com/includes/js/widget/widget.compressed.js';
const expectedD1BracketId = 'ade72ad3-0f62-42ef-a2cb-143bf425942b';
const expectedD2BracketId = '412dffeb-8db4-405a-90d8-d835b3a6ca23';
const expectedMemberId = '8ada50e8-19a3-462f-9a14-ca430a481250';
async function checkViewport(name, viewport) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  const errors = [];
  let providerResponse = null;
  const providerRequests = [];
  const requestErrors = [];
  const browserErrors = [];
  page.on('requestfailed', request => {
    if (/maxpreps\.com/.test(request.url())) requestErrors.push({ url: request.url(), failure: request.failure()?.errorText });
  });
  page.on('pageerror', error => browserErrors.push(String(error).slice(0, 300)));
  page.on('response', response => {
    if (/maxpreps\.com/.test(response.url())) providerRequests.push({ url: response.url(), status: response.status() });
  });
  page.on('response', response => {
    if (response.url().startsWith(providerScript)) providerResponse = response.status();
  });
  const expect = (test, message) => { if (!test) errors.push(message); };
  try {
    const response = await page.goto(origin + path, { waitUntil: 'domcontentloaded', timeout: 55000 });
    expect(response?.status() === 200, 'Route did not return HTTP 200');
    await page.getByRole('heading', { level: 1, name: 'Texas high school football playoff brackets' }).waitFor({ timeout: 20000 });
    // Provider loads asynchronously; bounded 12 seconds, not a polling loop.
    await page.waitForFunction(() => !!document.querySelector('script[src="https://www.maxpreps.com/includes/js/widget/widget.compressed.js"]'), null, { timeout: 12000 });
    await page.waitForTimeout(2500);
    const first = await page.evaluate(() => {
      const el = document.querySelector('[data-official-playoff-bracket="6AD1"]');
      const anchor = el?.querySelector('.maxpreps-widget-link');
      const link = el?.querySelector('a[href*="maxpreps.com/tournament"]');
      return {
        title: el?.querySelector('h3')?.textContent,
        scripts: [...document.scripts].filter(s => s.src.includes('widget.compressed.js')).length,
        href: anchor?.getAttribute('href') || '',
        memberId: anchor?.getAttribute('data-member-id') || '',
        iframeCount: el?.querySelectorAll('iframe').length || 0,
        htmlSnippet: el?.innerHTML.slice(0, 1800) || '',
        hasDirectLink: !!link,
        wholeDocumentWidth: document.documentElement.scrollWidth,
        viewportWidth: innerWidth,
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '',
      };
    });
    expect(first.scripts === 1, 'Provider JS should be loaded exactly once on initial mount');
    expect(first.href.includes(expectedD1BracketId) || first.iframeCount > 0, 'No provider-generated 6A D1 bracket anchor or iframe');
    if (first.memberId) expect(first.memberId === expectedMemberId, 'Unexpected MaxPreps member ID');
    expect(first.canonical === origin + path, 'Canonical URL differs');
    expect(first.hasDirectLink, 'MaxPreps tournament fallback missing');
    expect(first.wholeDocumentWidth <= first.viewportWidth + 5, 'Body has horizontal overflow (widget should scroll inside its region)');
    // Both 6A divisions now have independently generated MaxPreps widget code,
    // with the same provider-issued member ID but distinct bracket identifiers.
    await page.getByRole('button', { name: 'Division II' }).click();
    await page.locator('[data-official-playoff-bracket="6AD2"]').waitFor({ timeout: 12000 });
    await page.waitForTimeout(2200);
    const second = await page.evaluate(() => {
      const el = document.querySelector('[data-official-playoff-bracket="6AD2"]');
      const anchor = el?.querySelector('.maxpreps-widget-link');
      const link = el?.querySelector('a[href*="maxpreps.com/tournament"]');
      return {
        scripts: [...document.scripts].filter(s => s.src.includes('widget.compressed.js')).length,
        href: anchor?.getAttribute('href') || '',
        memberId: anchor?.getAttribute('data-member-id') || '',
        iframeCount: el?.querySelectorAll('iframe').length || 0,
        hasDirectLink: !!link,
        text: el?.textContent?.slice(0, 400) || '',
        scrollWidth: document.documentElement.scrollWidth,
        width: innerWidth,
      };
    });
    expect(second.scripts === 1, '6A D2 provider script should load exactly once');
    expect(second.href.includes(expectedD2BracketId) || second.iframeCount > 0, '6A D2 widget missing or using a different bracket');
    expect(!second.href.includes(expectedD1BracketId), '6A D2 unexpectedly shows D1 bracket');
    if (second.memberId) expect(second.memberId === expectedMemberId, '6A D2 widget member ID changed');
    expect(second.hasDirectLink, '6A D2 MaxPreps fallback missing');
    expect(second.scrollWidth <= second.width + 5, '6A D2 horizontal page overflow');

    // Non-embedded divisions retain source links; switching away must clean
    // up the externally loaded widget, even after MaxPreps modifies its DOM.
    await page.getByRole('button', { name: '5A' }).click();
    await page.locator('[data-official-playoff-bracket="5AD1"]').waitFor({ timeout: 12000 });
    const fallback = await page.evaluate(() => {
      const el = document.querySelector('[data-official-playoff-bracket="5AD1"]');
      return {
        text: el?.textContent || '',
        hasWidgetAnchor: !!el?.querySelector('.maxpreps-widget-link'),
        scripts: [...document.scripts].filter(s => s.src.includes('widget.compressed.js')).length,
      };
    });
    expect(!fallback.hasWidgetAnchor, '5A D1 must not receive unverified widget code');
    expect(fallback.text.includes('View official 5A Division I bracket'), '5A D1 official bracket fallback missing');
    expect(fallback.scripts === 0, 'MaxPreps widget script not cleaned up on fallback division');

    await page.getByRole('button', { name: '6A' }).click();
    await page.locator('[data-official-playoff-bracket="6AD1"]').waitFor({ timeout: 12000 });
    await page.waitForTimeout(1800);
    const after = await page.evaluate(() => ({
      scriptCount: [...document.scripts].filter(s => s.src.includes('widget.compressed.js')).length,
      hasWidget: !!document.querySelector('[data-official-playoff-bracket="6AD1"] .maxpreps-widget-link, [data-official-playoff-bracket="6AD1"] iframe'),
      scrollWidth: document.documentElement.scrollWidth,
      width: innerWidth,
    }));
    expect(after.scriptCount === 1, '6A D1 widget script duplicated or missing after selector changes');
    expect(after.hasWidget, '6A D1 widget failed to remount after returning from another class');
    expect(after.scrollWidth <= after.width + 5, 'Horizontal overflow after switching brackets');
    // A loaded provider script and an iframe node do not prove a visible
    // bracket. Collect the actual child-frame document to diagnose blank
    // panels and third-party challenges without scraping game results.
    await page.waitForTimeout(2500);
    const providerFrames = await Promise.all(page.frames()
      .filter(frame => frame !== page.mainFrame())
      .map(async frame => {
        let documentInfo;
        try {
          documentInfo = await frame.evaluate(() => ({
            title: document.title,
            readyState: document.readyState,
            text: (document.body?.innerText || '').slice(0, 500),
            htmlLength: document.body?.innerHTML.length || 0,
            iframeCount: document.querySelectorAll('iframe').length,
          }));
        } catch (error) {
          documentInfo = { error: String(error).slice(0, 400) };
        }
        return { url: frame.url(), documentInfo };
      }));
    const embeddedFrame = providerFrames.find(frame => /maxpreps\.com/i.test(frame.url));
    expect(!!embeddedFrame, 'Official widget never navigated to a MaxPreps frame');
    expect(!!embeddedFrame?.documentInfo && !('error' in embeddedFrame.documentInfo), 'Cannot inspect provider widget document');
    expect((embeddedFrame?.documentInfo?.htmlLength || 0) > 200, 'MaxPreps widget frame has no HTML content');
    // Nonempty DOM does not guarantee a painted iframe. Capture the iframe
    // itself and the widget's computed visibility, not just its host region.
    const providerFrame = page.frames().find(frame => /maxpreps\.com\/widgets\/tournament\.aspx/i.test(frame.url()));
    const frameVisuals = providerFrame ? await providerFrame.evaluate(() => {
      const body = document.body;
      const main = document.querySelector('h1, h2, main, .bracket, .tournament');
      const style = body ? getComputedStyle(body) : null;
      const mainStyle = main ? getComputedStyle(main) : null;
      return {
        bodyDisplay: style?.display,
        bodyVisibility: style?.visibility,
        bodyOpacity: style?.opacity,
        bodyBackground: style?.backgroundColor,
        mainText: (main?.textContent || '').slice(0, 150),
        mainDisplay: mainStyle?.display,
        mainVisibility: mainStyle?.visibility,
        bodyRect: body?.getBoundingClientRect().toJSON(),
        mainRect: main?.getBoundingClientRect().toJSON(),
        bodyScrollHeight: body?.scrollHeight,
        bodyScrollWidth: body?.scrollWidth,
      };
    }) : null;
    if (providerFrame) {
      try {
        await providerFrame.locator('body').screenshot({
          path: `${output}/maxpreps-provider-frame-${name}.png`,
          timeout: 20000,
        });
      } catch (error) {
        browserErrors.push('provider-frame-screenshot: ' + String(error).slice(0, 300));
      }
    }

    const screenshot = `${output}/maxpreps-playoffs-${name}.png`;
    await page.screenshot({ path: screenshot, fullPage: true, animations: 'disabled', timeout: 30000 });
    results.push({ name, status: errors.length ? 'FAIL' : 'PASS', errors, providerResponse, first: { ...first, htmlSnippet: first.htmlSnippet.slice(0, 700) }, second, fallback, after, providerFrames, frameVisuals, providerRequests: providerRequests.slice(-15), requestErrors, browserErrors, screenshot });
    console.log('MaxPreps playoff widget QA: ' + JSON.stringify(results.at(-1)));
    failures.push(...errors.map(error => `${name}: ${error}`));
  } catch (error) {
    failures.push(`${name}: ${String(error)}`);
    results.push({ name, status: 'ERROR', error: String(error), providerResponse });
    try { await page.screenshot({ path: `${output}/maxpreps-playoffs-${name}-error.png`, fullPage: true, timeout: 10000 }); } catch {}
  } finally {
    await page.close();
  }
}
try {
  await checkViewport('desktop', { width: 1440, height: 900 });
  await checkViewport('mobile', { width: 390, height: 844 });
} finally {
  await browser.close();
}
await writeFile(`${output}/report.json`, JSON.stringify({ url: origin + path, checkedAt: new Date().toISOString(), results, failures }, null, 2));
assert.deepEqual(failures, [], '6A D1 and D2 MaxPreps widget QA failed');
