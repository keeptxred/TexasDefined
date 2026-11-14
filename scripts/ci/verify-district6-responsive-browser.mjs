import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || '/tmp/texasdefined-wp-qa/node_modules/playwright-core');
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
try {
  for (const width of [390, 320]) {
    const context = await browser.newContext({ viewport: { width, height: 844 }, isMobile: true, hasTouch: true });
    await context.route(/(?:google-analytics|googletagmanager|connect\.facebook\.net|facebook\.com\/tr|\/api\/analytics|\/api\/track)/i, route => route.abort());
    try {
      const page = await context.newPage();
      const pageErrors = [];
      page.on('pageerror', error => pageErrors.push(String(error)));
      const url = 'https://texasdefined.com/texas-high-school-football-districts/6a-district-6?district6_mobile=' + (process.env.GITHUB_SHA || 'manual').slice(0, 12);
      const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      assert.equal(response?.status(), 200, width + 'px HTTP status');
      await page.locator('#district-6-2026').waitFor({ state: 'visible', timeout: 15000 });
      const facts = await page.evaluate(() => {
        const guide = document.querySelector('#district-6-2026');
        const sponsor = [...document.querySelectorAll('h2')].find(node => node.textContent?.includes('Reach Texas high-school football families'));
        return {
          title: document.title,
          canonical: document.querySelector('link[rel="canonical"]')?.href,
          h1Count: document.querySelectorAll('h1').length,
          schools: new Set([...document.querySelectorAll('a[href^="/texas-high-school-football-teams/"]')].map(link => link.getAttribute('href'))).size,
          guideVisible: Boolean(guide && guide.getBoundingClientRect().height > 200),
          guideBeforeSponsor: Boolean(guide && sponsor && (guide.compareDocumentPosition(sponsor) & Node.DOCUMENT_POSITION_FOLLOWING)),
          overflow: document.documentElement.scrollWidth - window.innerWidth,
          importedRecords: document.querySelectorAll('[data-football-district-records="source-derived"]').length,
        };
      });
      assert.ok(facts.title.includes('District 6-6A Football: 2026 Teams'), width + 'px title');
      assert.equal(facts.canonical, 'https://texasdefined.com/texas-high-school-football-districts/6a-district-6');
      assert.equal(facts.h1Count, 1, width + 'px H1');
      assert.ok(facts.schools >= 8, width + 'px school links: ' + facts.schools);
      assert.ok(facts.guideVisible, width + 'px invisible guide');
      assert.ok(facts.guideBeforeSponsor, width + 'px sponsor comes before guide');
      assert.ok(facts.overflow <= 8, width + 'px horizontal overflow ' + facts.overflow);
      assert.equal(facts.importedRecords, 0, width + 'px results feed must remain paused');
      assert.deepEqual(pageErrors, [], width + 'px runtime errors');
      console.log('PASS District 6 production Chrome', width + 'px', JSON.stringify(facts));
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
}
