import { chromium } from 'playwright';

const origin = String(process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const targets = [
  { path: '/dogs', label: 'dogs hub', kind: 'hub', h1: 'Big personalities. Bigger attitudes. Dogs, Texas style.' },
  { path: '/dogs/labrador-retriever', label: 'Labrador Retriever', kind: 'breed', h1Includes: 'Labrador Retriever:' },
  { path: '/dogs/golden-retriever', label: 'Golden Retriever', kind: 'breed', h1Includes: 'Golden Retriever:' },
  { path: '/dogs/dachshund', label: 'Dachshund', kind: 'breed', h1Includes: 'Dachshund:' },
  { path: '/dogs/german-shepherd', label: 'German Shepherd', kind: 'breed', h1Includes: 'German Shepherd:' },
];

const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
];

const failures = [];
const browser = await chromium.launch({ headless: true });

function fail(message) {
  failures.push(message);
  console.error(message);
}

for (const viewport of viewports) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    userAgent: `TexasDefined-Dogs-Browser-Smoke/1.0 (${viewport.name})`,
  });

  for (const target of targets) {
    const page = await context.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    const criticalRequestFailures = [];

    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('pageerror', (error) => pageErrors.push(error.message));
    page.on('requestfailed', (request) => {
      if (['document', 'script', 'stylesheet'].includes(request.resourceType())) {
        criticalRequestFailures.push(`${request.resourceType()}: ${request.url()} :: ${request.failure()?.errorText || 'failed'}`);
      }
    });

    const url = `${origin}${target.path}?verify=dogs-browser-${Date.now()}`;
    console.log(`[${viewport.name}] checking ${target.label}: ${url}`);

    try {
      const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 });
      if (!response || response.status() !== 200) {
        fail(`[${viewport.name}] ${target.label} returned ${response?.status() ?? 'no response'}`);
        await page.close();
        continue;
      }

      await page.locator('h1').first().waitFor({ state: 'visible', timeout: 20_000 });
      await page.waitForTimeout(1_000);

      const h1Text = (await page.locator('h1').first().innerText()).trim();
      if (target.h1 && h1Text !== target.h1) {
        fail(`[${viewport.name}] ${target.label} h1 mismatch: ${JSON.stringify(h1Text)}`);
      }
      if (target.h1Includes && !h1Text.includes(target.h1Includes)) {
        fail(`[${viewport.name}] ${target.label} h1 missing ${JSON.stringify(target.h1Includes)}: ${JSON.stringify(h1Text)}`);
      }

      const metrics = await page.evaluate(() => {
        const root = document.documentElement;
        const body = document.body;
        const visibleText = body.innerText.replace(/\s+/g, ' ').trim();
        const h1 = document.querySelector('h1');
        const h1Rect = h1?.getBoundingClientRect();
        const overflow = [];
        for (const element of document.querySelectorAll('body *')) {
          const style = getComputedStyle(element);
          if (style.display === 'none' || style.visibility === 'hidden') continue;
          const rect = element.getBoundingClientRect();
          if (rect.width <= 0 || rect.height <= 0) continue;
          if (rect.right > window.innerWidth + 3 || rect.left < -3) {
            overflow.push({
              tag: element.tagName,
              className: typeof element.className === 'string' ? element.className.slice(0, 140) : '',
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              width: Math.round(rect.width),
            });
            if (overflow.length >= 8) break;
          }
        }
        return {
          viewportWidth: window.innerWidth,
          scrollWidth: Math.max(root.scrollWidth, body.scrollWidth),
          bodyHeight: Math.max(root.scrollHeight, body.scrollHeight),
          visibleTextLength: visibleText.length,
          h1Visible: Boolean(h1Rect && h1Rect.width > 0 && h1Rect.height > 0),
          overflow,
        };
      });

      if (!metrics.h1Visible) fail(`[${viewport.name}] ${target.label} h1 is not visibly rendered`);
      if (metrics.visibleTextLength < 600) fail(`[${viewport.name}] ${target.label} rendered too little visible text: ${metrics.visibleTextLength}`);
      if (metrics.bodyHeight < viewport.height * 0.75) fail(`[${viewport.name}] ${target.label} body is suspiciously short: ${metrics.bodyHeight}px`);
      if (metrics.scrollWidth > metrics.viewportWidth + 3) {
        fail(`[${viewport.name}] ${target.label} horizontally overflows: scrollWidth=${metrics.scrollWidth} viewport=${metrics.viewportWidth} offenders=${JSON.stringify(metrics.overflow)}`);
      }

      const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]');
      if (await breadcrumb.count() === 0 || !(await breadcrumb.first().isVisible())) {
        fail(`[${viewport.name}] ${target.label} breadcrumb is missing or hidden`);
      }

      if (target.kind === 'hub') {
        const hrefs = await page.locator('a[href^="/dogs/"]').evaluateAll((anchors) =>
          [...new Set(anchors.map((anchor) => anchor.getAttribute('href')).filter(Boolean))],
        );
        const breedHrefs = hrefs.filter((href) => /^\/dogs\/[a-z0-9-]+$/.test(href));
        if (breedHrefs.length < 12) {
          fail(`[${viewport.name}] dogs hub exposes only ${breedHrefs.length} unique breed links`);
        }
      } else {
        const backLinks = page.locator('a[href="/dogs"]');
        if (await backLinks.count() === 0) fail(`[${viewport.name}] ${target.label} is missing a link back to /dogs`);
        const relatedHrefs = await page.locator('a[href^="/dogs/"]').evaluateAll((anchors) =>
          [...new Set(anchors.map((anchor) => anchor.getAttribute('href')).filter(Boolean))],
        );
        if (relatedHrefs.length < 4) fail(`[${viewport.name}] ${target.label} exposes fewer than four related breed links`);
      }

      if (consoleErrors.length) fail(`[${viewport.name}] ${target.label} console errors: ${JSON.stringify(consoleErrors)}`);
      if (pageErrors.length) fail(`[${viewport.name}] ${target.label} page errors: ${JSON.stringify(pageErrors)}`);
      if (criticalRequestFailures.length) fail(`[${viewport.name}] ${target.label} critical request failures: ${JSON.stringify(criticalRequestFailures)}`);
    } catch (error) {
      fail(`[${viewport.name}] ${target.label} browser verification threw: ${error instanceof Error ? error.stack || error.message : String(error)}`);
    } finally {
      await page.close();
    }
  }

  await context.close();
}

await browser.close();

if (failures.length) {
  console.error(`Texas Dogs browser production smoke failed with ${failures.length} issue(s).`);
  process.exit(1);
}

console.log('Texas Dogs browser production smoke passed on desktop and mobile: hub and four representative breed pages rendered visible content with breadcrumbs and discovery links, no horizontal overflow, no page/console errors, and no critical document/script/stylesheet request failures.');
