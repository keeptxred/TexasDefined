import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('/tmp/texasdefined-six-man-qa/node_modules/playwright-core');
const origin = 'https://texasdefined.com';
const checks = [];
const browser = await chromium.launch({
  executablePath: process.env.CHROME_BIN,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
try {
  for (const [label, width, height] of [['desktop', 1366, 900], ['mobile', 390, 844]]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    const pageErrors = [];
    page.on('pageerror', error => pageErrors.push(error.message));
    const response = await page.goto(origin + '/article/texas-six-man-football-rules-explained', { waitUntil: 'domcontentloaded', timeout: 45000 });
    const field = page.locator('svg[aria-labelledby="six-man-field-title six-man-field-description"]').first();
    await field.waitFor({ state: 'visible', timeout: 30000 });
    await page.evaluate(async () => {
      await document.fonts.ready;
      window.scrollTo(0, 0);
      await new Promise(resolve => requestAnimationFrame(resolve));
    });
    const data = await page.evaluate(() => {
      const text = 'Six-man football can look familiar for about three seconds.';
      const lead = [...document.querySelectorAll('article p')].find(el => el.textContent?.startsWith(text));
      const graphic = document.querySelector('svg[aria-labelledby="six-man-field-title six-man-field-description"]');
      const section = document.getElementById('six-man-at-a-glance');
      const wrapper = graphic?.closest('figure');
      const elementRect = el => { if (!el) return null; const rect = el.getBoundingClientRect(); return { x: Math.round(rect.x), y: Math.round(rect.y), width: Math.round(rect.width), height: Math.round(rect.height) }; };
      return {
        title: document.title,
        lead: elementRect(lead),
        firstReference: elementRect(section),
        diagram: elementRect(graphic),
        figure: elementRect(wrapper),
        diagramTitle: graphic?.querySelector('title')?.textContent,
        hasOldPlaceholder: document.body.textContent.includes('80 yards × 40 yards · midfield at the 40'),
        horizontalOverflow: document.documentElement.scrollWidth - window.innerWidth,
        figureScroll: wrapper?.querySelector('[role=region]')?.scrollWidth,
        figureClient: wrapper?.querySelector('[role=region]')?.clientWidth,
        photos: [...document.querySelectorAll('article img')].map(el => ({ alt: el.alt?.slice(0, 100), complete: el.complete, loaded: el.naturalWidth > 0 })),
      };
    });
    await page.locator('svg[aria-labelledby="six-man-field-title six-man-field-description"]').scrollIntoViewIfNeeded();
    const figure = page.locator('figure').filter({ has: field }).first();
    const buffer = await figure.screenshot({ type: 'jpeg', quality: 62, animations: 'disabled', timeout: 25000 });
    console.log('QA_IMAGE_' + label.toUpperCase() + '=' + buffer.toString('base64'));
    console.log('QA_META_' + label.toUpperCase() + '=' + JSON.stringify({ http: response?.status(), ...data, pageErrors }));
    const failures = [];
    if (response?.status() !== 200) failures.push('article HTTP not 200');
    if (!data.lead || !data.firstReference || data.lead.y >= data.firstReference.y) failures.push('intro missing or positioned after reference');
    if (!data.diagramTitle?.includes('drawn to scale')) failures.push('scaled accessible diagram missing');
    if (data.hasOldPlaceholder) failures.push('obsolete field placeholder present');
    if (data.horizontalOverflow > 8) failures.push('document horizontal overflow: ' + data.horizontalOverflow + 'px');
    if (pageErrors.length) failures.push('browser exceptions: ' + pageErrors.join('; '));
    if (data.figure?.width < 270) failures.push('figure too small to be legible');
    checks.push({ label, failures });
    await page.close();
  }
} finally {
  await browser.close();
}
if (checks.some(c => c.failures.length)) {
  console.error('QA_RESULT=' + JSON.stringify(checks));
  process.exitCode = 1;
} else {
  console.log('QA_RESULT=' + JSON.stringify(checks));
  console.log('PASS: Six-man desktop/mobile isolated field visual browser acceptance.');
}
