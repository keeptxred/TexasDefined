import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || '/tmp/texasdefined-budget-qa/node_modules/playwright-core');
const origin = (process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const url = origin + '/texas-budget-planner';
const output = 'artifacts/texas-budget-planner-browser';
const evidence = [];
await mkdir(output, { recursive: true });

function verify(condition, description) { assert.ok(condition, description); }
async function incomeIs(page, display) {
  await page.waitForFunction((expected) =>
    document.querySelector('section[aria-labelledby="budget-results-heading"] strong')?.textContent?.trim() === expected,
  display, { timeout: 15_000 });
}
async function fillIncome(page, amount) {
  const field = page.getByRole('spinbutton', { name: 'Paychecks after deductions (monthly)' });
  // SSR markup exists before React hydrates; retry only while calculated figures
  // have not reflected the change, so a no-op early fill cannot appear as success.
  for (let i = 0; i < 4; i++) {
    await field.fill(String(amount));
    await field.press('Tab');
    const updated = await page.waitForFunction(expected => {
      const node = document.querySelector('section[aria-labelledby="budget-results-heading"] strong');
      return node?.textContent?.trim() === expected;
    }, '$' + Number(amount).toLocaleString('en-US'), { timeout: 2_500 }).then(() => true, () => false);
    if (updated) return;
    await page.waitForTimeout(400);
  }
  const diagnostic = await page.evaluate(() => ({
    readyState: document.readyState,
    input: document.querySelector('input[type="number"]')?.value,
    summary: document.querySelector('section[aria-labelledby="budget-results-heading"] strong')?.textContent,
    scriptUrls: [...document.scripts].map(s => s.src).filter(Boolean).slice(-8),
    loadedScripts: performance.getEntriesByType('resource').filter(r => /\.js(?:\?|$)/.test(r.name)).length,
    reactInputProps: Object.keys(document.querySelector('input[type="number"]') || {}).filter(k => k.startsWith('__reactProps
  }));
  throw new Error('Income edit did not update live totals; hydration diagnostics: ' + JSON.stringify(diagnostic));
}
async function check(page, label) {
  const row = { viewport: label, checks: [], failures: [], pageErrors: [], requestFailures: [], httpErrors: [] };
  evidence.push(row);
  page.on('pageerror', error => row.pageErrors.push(error.message));
  page.on('requestfailed', request => row.requestFailures.push({ url: request.url(), error: request.failure()?.errorText }));
  page.on('response', response => { if (response.status() >= 400 && response.url().startsWith(origin)) row.httpErrors.push({ status: response.status(), url: response.url() }); });
  const response = await page.goto(url + '?browser_verify=budget-' + label + '-' + Date.now(), {
    waitUntil: 'domcontentloaded', timeout: 55_000,
  });
  verify(response?.status() === 200, label + ': HTTP ' + response?.status());
  await page.getByRole('heading', { level: 1, name: 'Texas household budget planner', exact: true }).waitFor({ state: 'visible', timeout: 25_000 });
  await page.waitForLoadState('load', { timeout: 25_000 }).catch(() => {});
  await incomeIs(page, '$7,000');
  const resultText = await page.locator('section[aria-labelledby="budget-results-heading"]').innerText();
  verify(resultText.includes('$5,250') && resultText.includes('$700') && resultText.includes('$1,050'),
    label + ': default figures must reconcile');
  row.checks.push('HTTP 200, hydrated planner, default totals 7000/5250/700/1050');

  await fillIncome(page, 8000);
  await page.getByRole('button', { name: /Annual and irregular bills/ }).click();
  const annual = page.getByRole('spinbutton', { name: 'Travel, gifts and seasonal spending (annual)' });
  await annual.fill('1200');
  await annual.press('Tab');
  await page.waitForFunction(() => document.querySelector('section[aria-labelledby="budget-results-heading"]')?.innerText.includes('$1,950'),
    null, { timeout: 12_000 });
  verify(await page.getByText('$100 set aside monthly').count() > 0, label + ': 1200 annual / 12 must reserve 100 monthly');
  row.checks.push('Reactive monthly math including 1200/year => 100/month and 1950 remaining');

  await page.getByRole('button', { name: 'Save on this device' }).click();
  await page.waitForFunction(() => !!localStorage.getItem('texasdefined:budget:v3'), null, { timeout: 10_000 });
  row.checks.push('Explicit local save writes v3 storage');
  await page.reload({ waitUntil: 'domcontentloaded', timeout: 50_000 });
  await incomeIs(page, '$8,000');
  await page.getByRole('button', { name: /Annual and irregular bills/ }).click();
  verify(await page.getByRole('spinbutton', { name: 'Travel, gifts and seasonal spending (annual)' }).inputValue() === '1200',
    label + ': annual bill did not persist after reload');
  verify((await page.locator('section[aria-labelledby="budget-actions-heading"] [role="status"]').innerText()).includes('restored automatically'),
    label + ': automatic restore notification missing');
  row.checks.push('Automatic restoration after page reload');

  await page.getByRole('button', { name: 'Reset example' }).click();
  await incomeIs(page, '$7,000');
  await page.getByRole('button', { name: 'Restore saved' }).click();
  await incomeIs(page, '$8,000');
  row.checks.push('Reset and explicit Restore saved keep previously saved values');

  await page.getByRole('button', { name: 'Save current as A' }).click();
  await fillIncome(page, 9000);
  await page.getByRole('button', { name: 'Save current as B' }).click();
  const comparison = await page.locator('section[aria-labelledby="budget-scenarios-heading"] table').innerText();
  verify(/Scenario A/.test(comparison) && /Scenario B/.test(comparison) &&
    comparison.includes('$8,000') && comparison.includes('$9,000'),
    label + ': A/B comparison did not show saved income states: ' + comparison.slice(0, 300));
  row.checks.push('Scenario A/B comparison updates on actual browser input');

  const downloadPromise = page.waitForEvent('download', { timeout: 20_000 });
  await page.getByRole('button', { name: 'Download CSV' }).click();
  const download = await downloadPromise;
  verify(download.suggestedFilename() === 'texas-household-budget.csv', label + ': incorrect CSV download name');
  const csv = await readFile(await download.path(), 'utf8');
  verify(csv.includes('"Total","Monthly income","","monthly","9000.00"'), label + ': CSV income');
  verify(csv.includes('"Total","Monthly expenses and bill reserves","","monthly","5350.00"'), label + ': CSV monthly expense total');
  verify(csv.includes('"Total","Monthly savings allocations","","monthly","700.00"'), label + ': CSV savings');
  verify(csv.includes('"Total","Remaining after allocations","","monthly","2950.00"'), label + ': CSV remaining');
  verify(csv.includes('"Annual and irregular bills","Travel, gifts and seasonal spending","1200","annual","100.00"'),
    label + ': CSV annual monthly reserve');
  row.checks.push('Real CSV browser download and exact financial totals');

  const copy = page.getByRole('button', { name: 'Copy share link' });
  verify(await copy.isDisabled(), label + ': share link exposed before privacy acknowledgment');
  await page.getByRole('checkbox', { name: /I understand that the copied URL exposes/ }).check();
  verify(await copy.isEnabled(), label + ': approved share link button disabled');
  await copy.click();
  await page.waitForFunction(() => document.querySelector('section[aria-labelledby="budget-actions-heading"] [role="status"]')?.textContent?.includes('Budget share URL copied'),
    null, { timeout: 10_000 });
  const sharedLink = await page.evaluate(() => navigator.clipboard.readText());
  const target = new URL(sharedLink);
  verify(target.origin === origin && target.pathname === '/texas-budget-planner', label + ': wrong share URL origin/path');
  const sharedBudget = JSON.parse(target.searchParams.get('b3') || '{}');
  verify(sharedBudget.pay === 9000 && sharedBudget.annualTravel === 1200,
    label + ': share link did not contain current user input');
  verify(Object.keys(sharedBudget).length >= 25 && !('secretNote' in sharedBudget),
    label + ': budget fields missing or leaking unrelated state');
  row.checks.push('Share consent gate, clipboard content and sanitized URL encoding');

  // The saved local household must not override a different explicitly shared URL.
  await page.goto(sharedLink, { waitUntil: 'domcontentloaded', timeout: 50_000 });
  await incomeIs(page, '$9,000');
  row.checks.push('Explicit share URL takes precedence over previously saved local budget');

  await page.emulateMedia({ media: 'print' });
  const print = await page.evaluate(() => ({
    details: getComputedStyle(document.querySelector('#budget-print-details')).display,
    actions: getComputedStyle(document.querySelector('section[aria-labelledby="budget-actions-heading"]')).display,
    text: document.querySelector('#budget-print-details')?.innerText || '',
  }));
  verify(print.details !== 'none' && print.actions === 'none', label + ': print media visibility invalid');
  verify(print.text.includes('Travel, gifts and seasonal spending (annual reserve)') && print.text.includes('$100'),
    label + ': printed budget missing itemized annual reserve');
  row.checks.push('Print preview shows itemized entries; interactive actions hidden');
  await page.emulateMedia({ media: 'screen' });

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  row.horizontalOverflow = overflow;
  verify(overflow <= 10, label + ': horizontal overflow ' + overflow + 'px');
  verify(!row.pageErrors.length, label + ': runtime page errors: ' + row.pageErrors.join('; '));
  await page.screenshot({ path: output + '/' + label + '-passed.png', fullPage: false, animations: 'disabled' });
  row.checks.push('No horizontal overflow or unhandled browser runtime errors');
  console.log('PASS ' + label + ': ' + row.checks.join('; '));
}

let browser;
try {
  for (const [label, width, height, mobile] of [['desktop', 1366, 900, false], ['mobile', 390, 844, true]]) {
    // Each acceptance viewport uses its own fresh Chrome process. Reusing an
    // incognito context in a single process caused intermittent unhydrated
    // second-context behavior without JS errors or failed requests.
    browser = await chromium.launch({ headless: true,
      executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
      args: ['--no-sandbox', '--disable-dev-shm-usage'] });
    const context = await browser.newContext({
      viewport: { width, height }, isMobile: mobile, hasTouch: mobile,
      deviceScaleFactor: 1, acceptDownloads: true,
      permissions: ['clipboard-read', 'clipboard-write'],
    });
    const page = await context.newPage();
    try { await check(page, label); }
    catch (error) {
      const row = evidence[evidence.length - 1];
      const message = error instanceof Error ? error.stack || error.message : String(error);
      row.failures.push(message);
      process.exitCode = 1;
      console.error('FAIL ' + label + ' Texas budget planner browser test:\n' + message);
      try {
        await page.emulateMedia({ media: 'screen' });
        await page.screenshot({ path: output + '/' + label + '-failed.png', fullPage: false, timeout: 20_000 });
      } catch { /* The JSON report still retains the failure. */ }
    } finally {
      await context.close();
      await browser.close();
      browser = undefined;
    }
  }
} catch (error) {
  process.exitCode = 1;
  evidence.push({ startupFailure: String(error) });
} finally {
  await browser?.close();
  await writeFile(output + '/acceptance.json', JSON.stringify({
    testedAt: new Date().toISOString(), url, gitSha: process.env.GITHUB_SHA || 'local',
    evidence, note: 'Only hypothetical budget data is entered. No user financial information.',
  }, null, 2) + '\n');
}
if (process.exitCode) console.error('Texas budget planner real-browser acceptance failed; see artifact report.');
else console.log('Texas budget planner real-browser acceptance passed on mobile and desktop.');
)),
    reactInputFiber: Object.keys(document.querySelector('input[type="number"]') || {}).filter(k => k.startsWith('__reactFiber
  }));
  throw new Error('Income edit did not update live totals; hydration diagnostics: ' + JSON.stringify(diagnostic));
}
async function check(page, label) {
  const row = { viewport: label, checks: [], failures: [], pageErrors: [], requestFailures: [], httpErrors: [] };
  evidence.push(row);
  page.on('pageerror', error => row.pageErrors.push(error.message));
  page.on('requestfailed', request => row.requestFailures.push({ url: request.url(), error: request.failure()?.errorText }));
  page.on('response', response => { if (response.status() >= 400 && response.url().startsWith(origin)) row.httpErrors.push({ status: response.status(), url: response.url() }); });
  const response = await page.goto(url + '?browser_verify=budget-' + label + '-' + Date.now(), {
    waitUntil: 'domcontentloaded', timeout: 55_000,
  });
  verify(response?.status() === 200, label + ': HTTP ' + response?.status());
  await page.getByRole('heading', { level: 1, name: 'Texas household budget planner', exact: true }).waitFor({ state: 'visible', timeout: 25_000 });
  await page.waitForLoadState('load', { timeout: 25_000 }).catch(() => {});
  await incomeIs(page, '$7,000');
  const resultText = await page.locator('section[aria-labelledby="budget-results-heading"]').innerText();
  verify(resultText.includes('$5,250') && resultText.includes('$700') && resultText.includes('$1,050'),
    label + ': default figures must reconcile');
  row.checks.push('HTTP 200, hydrated planner, default totals 7000/5250/700/1050');

  await fillIncome(page, 8000);
  await page.getByRole('button', { name: /Annual and irregular bills/ }).click();
  const annual = page.getByRole('spinbutton', { name: 'Travel, gifts and seasonal spending (annual)' });
  await annual.fill('1200');
  await annual.press('Tab');
  await page.waitForFunction(() => document.querySelector('section[aria-labelledby="budget-results-heading"]')?.innerText.includes('$1,950'),
    null, { timeout: 12_000 });
  verify(await page.getByText('$100 set aside monthly').count() > 0, label + ': 1200 annual / 12 must reserve 100 monthly');
  row.checks.push('Reactive monthly math including 1200/year => 100/month and 1950 remaining');

  await page.getByRole('button', { name: 'Save on this device' }).click();
  await page.waitForFunction(() => !!localStorage.getItem('texasdefined:budget:v3'), null, { timeout: 10_000 });
  row.checks.push('Explicit local save writes v3 storage');
  await page.reload({ waitUntil: 'domcontentloaded', timeout: 50_000 });
  await incomeIs(page, '$8,000');
  await page.getByRole('button', { name: /Annual and irregular bills/ }).click();
  verify(await page.getByRole('spinbutton', { name: 'Travel, gifts and seasonal spending (annual)' }).inputValue() === '1200',
    label + ': annual bill did not persist after reload');
  verify((await page.locator('section[aria-labelledby="budget-actions-heading"] [role="status"]').innerText()).includes('restored automatically'),
    label + ': automatic restore notification missing');
  row.checks.push('Automatic restoration after page reload');

  await page.getByRole('button', { name: 'Reset example' }).click();
  await incomeIs(page, '$7,000');
  await page.getByRole('button', { name: 'Restore saved' }).click();
  await incomeIs(page, '$8,000');
  row.checks.push('Reset and explicit Restore saved keep previously saved values');

  await page.getByRole('button', { name: 'Save current as A' }).click();
  await fillIncome(page, 9000);
  await page.getByRole('button', { name: 'Save current as B' }).click();
  const comparison = await page.locator('section[aria-labelledby="budget-scenarios-heading"] table').innerText();
  verify(/Scenario A/.test(comparison) && /Scenario B/.test(comparison) &&
    comparison.includes('$8,000') && comparison.includes('$9,000'),
    label + ': A/B comparison did not show saved income states: ' + comparison.slice(0, 300));
  row.checks.push('Scenario A/B comparison updates on actual browser input');

  const downloadPromise = page.waitForEvent('download', { timeout: 20_000 });
  await page.getByRole('button', { name: 'Download CSV' }).click();
  const download = await downloadPromise;
  verify(download.suggestedFilename() === 'texas-household-budget.csv', label + ': incorrect CSV download name');
  const csv = await readFile(await download.path(), 'utf8');
  verify(csv.includes('"Total","Monthly income","","monthly","9000.00"'), label + ': CSV income');
  verify(csv.includes('"Total","Monthly expenses and bill reserves","","monthly","5350.00"'), label + ': CSV monthly expense total');
  verify(csv.includes('"Total","Monthly savings allocations","","monthly","700.00"'), label + ': CSV savings');
  verify(csv.includes('"Total","Remaining after allocations","","monthly","2950.00"'), label + ': CSV remaining');
  verify(csv.includes('"Annual and irregular bills","Travel, gifts and seasonal spending","1200","annual","100.00"'),
    label + ': CSV annual monthly reserve');
  row.checks.push('Real CSV browser download and exact financial totals');

  const copy = page.getByRole('button', { name: 'Copy share link' });
  verify(await copy.isDisabled(), label + ': share link exposed before privacy acknowledgment');
  await page.getByRole('checkbox', { name: /I understand that the copied URL exposes/ }).check();
  verify(await copy.isEnabled(), label + ': approved share link button disabled');
  await copy.click();
  await page.waitForFunction(() => document.querySelector('section[aria-labelledby="budget-actions-heading"] [role="status"]')?.textContent?.includes('Budget share URL copied'),
    null, { timeout: 10_000 });
  const sharedLink = await page.evaluate(() => navigator.clipboard.readText());
  const target = new URL(sharedLink);
  verify(target.origin === origin && target.pathname === '/texas-budget-planner', label + ': wrong share URL origin/path');
  const sharedBudget = JSON.parse(target.searchParams.get('b3') || '{}');
  verify(sharedBudget.pay === 9000 && sharedBudget.annualTravel === 1200,
    label + ': share link did not contain current user input');
  verify(Object.keys(sharedBudget).length >= 25 && !('secretNote' in sharedBudget),
    label + ': budget fields missing or leaking unrelated state');
  row.checks.push('Share consent gate, clipboard content and sanitized URL encoding');

  // The saved local household must not override a different explicitly shared URL.
  await page.goto(sharedLink, { waitUntil: 'domcontentloaded', timeout: 50_000 });
  await incomeIs(page, '$9,000');
  row.checks.push('Explicit share URL takes precedence over previously saved local budget');

  await page.emulateMedia({ media: 'print' });
  const print = await page.evaluate(() => ({
    details: getComputedStyle(document.querySelector('#budget-print-details')).display,
    actions: getComputedStyle(document.querySelector('section[aria-labelledby="budget-actions-heading"]')).display,
    text: document.querySelector('#budget-print-details')?.innerText || '',
  }));
  verify(print.details !== 'none' && print.actions === 'none', label + ': print media visibility invalid');
  verify(print.text.includes('Travel, gifts and seasonal spending (annual reserve)') && print.text.includes('$100'),
    label + ': printed budget missing itemized annual reserve');
  row.checks.push('Print preview shows itemized entries; interactive actions hidden');
  await page.emulateMedia({ media: 'screen' });

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  row.horizontalOverflow = overflow;
  verify(overflow <= 10, label + ': horizontal overflow ' + overflow + 'px');
  verify(!row.pageErrors.length, label + ': runtime page errors: ' + row.pageErrors.join('; '));
  await page.screenshot({ path: output + '/' + label + '-passed.png', fullPage: false, animations: 'disabled' });
  row.checks.push('No horizontal overflow or unhandled browser runtime errors');
  console.log('PASS ' + label + ': ' + row.checks.join('; '));
}

let browser;
try {
  browser = await chromium.launch({ headless: true,
    executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  for (const [label, width, height, mobile] of [['desktop', 1366, 900, false], ['mobile', 390, 844, true]]) {
    const context = await browser.newContext({
      viewport: { width, height }, isMobile: mobile, hasTouch: mobile,
      deviceScaleFactor: 1, acceptDownloads: true,
      permissions: ['clipboard-read', 'clipboard-write'],
    });
    const page = await context.newPage();
    try { await check(page, label); }
    catch (error) {
      const row = evidence[evidence.length - 1];
      const message = error instanceof Error ? error.stack || error.message : String(error);
      row.failures.push(message);
      process.exitCode = 1;
      console.error('FAIL ' + label + ' Texas budget planner browser test:\n' + message);
      try {
        await page.emulateMedia({ media: 'screen' });
        await page.screenshot({ path: output + '/' + label + '-failed.png', fullPage: false, timeout: 20_000 });
      } catch { /* The JSON report still retains the failure. */ }
    } finally { await context.close(); }
  }
} catch (error) {
  process.exitCode = 1;
  evidence.push({ startupFailure: String(error) });
} finally {
  await browser?.close();
  await writeFile(output + '/acceptance.json', JSON.stringify({
    testedAt: new Date().toISOString(), url, gitSha: process.env.GITHUB_SHA || 'local',
    evidence, note: 'Only hypothetical budget data is entered. No user financial information.',
  }, null, 2) + '\n');
}
if (process.exitCode) console.error('Texas budget planner real-browser acceptance failed; see artifact report.');
else console.log('Texas budget planner real-browser acceptance passed on mobile and desktop.');
)),
  }));
  throw new Error('Income edit did not update live totals; hydration diagnostics: ' + JSON.stringify(diagnostic));
}
async function check(page, label) {
  const row = { viewport: label, checks: [], failures: [], pageErrors: [], requestFailures: [], httpErrors: [] };
  evidence.push(row);
  page.on('pageerror', error => row.pageErrors.push(error.message));
  page.on('requestfailed', request => row.requestFailures.push({ url: request.url(), error: request.failure()?.errorText }));
  page.on('response', response => { if (response.status() >= 400 && response.url().startsWith(origin)) row.httpErrors.push({ status: response.status(), url: response.url() }); });
  const response = await page.goto(url + '?browser_verify=budget-' + label + '-' + Date.now(), {
    waitUntil: 'domcontentloaded', timeout: 55_000,
  });
  verify(response?.status() === 200, label + ': HTTP ' + response?.status());
  await page.getByRole('heading', { level: 1, name: 'Texas household budget planner', exact: true }).waitFor({ state: 'visible', timeout: 25_000 });
  await page.waitForLoadState('load', { timeout: 25_000 }).catch(() => {});
  await incomeIs(page, '$7,000');
  const resultText = await page.locator('section[aria-labelledby="budget-results-heading"]').innerText();
  verify(resultText.includes('$5,250') && resultText.includes('$700') && resultText.includes('$1,050'),
    label + ': default figures must reconcile');
  row.checks.push('HTTP 200, hydrated planner, default totals 7000/5250/700/1050');

  await fillIncome(page, 8000);
  await page.getByRole('button', { name: /Annual and irregular bills/ }).click();
  const annual = page.getByRole('spinbutton', { name: 'Travel, gifts and seasonal spending (annual)' });
  await annual.fill('1200');
  await annual.press('Tab');
  await page.waitForFunction(() => document.querySelector('section[aria-labelledby="budget-results-heading"]')?.innerText.includes('$1,950'),
    null, { timeout: 12_000 });
  verify(await page.getByText('$100 set aside monthly').count() > 0, label + ': 1200 annual / 12 must reserve 100 monthly');
  row.checks.push('Reactive monthly math including 1200/year => 100/month and 1950 remaining');

  await page.getByRole('button', { name: 'Save on this device' }).click();
  await page.waitForFunction(() => !!localStorage.getItem('texasdefined:budget:v3'), null, { timeout: 10_000 });
  row.checks.push('Explicit local save writes v3 storage');
  await page.reload({ waitUntil: 'domcontentloaded', timeout: 50_000 });
  await incomeIs(page, '$8,000');
  await page.getByRole('button', { name: /Annual and irregular bills/ }).click();
  verify(await page.getByRole('spinbutton', { name: 'Travel, gifts and seasonal spending (annual)' }).inputValue() === '1200',
    label + ': annual bill did not persist after reload');
  verify((await page.locator('section[aria-labelledby="budget-actions-heading"] [role="status"]').innerText()).includes('restored automatically'),
    label + ': automatic restore notification missing');
  row.checks.push('Automatic restoration after page reload');

  await page.getByRole('button', { name: 'Reset example' }).click();
  await incomeIs(page, '$7,000');
  await page.getByRole('button', { name: 'Restore saved' }).click();
  await incomeIs(page, '$8,000');
  row.checks.push('Reset and explicit Restore saved keep previously saved values');

  await page.getByRole('button', { name: 'Save current as A' }).click();
  await fillIncome(page, 9000);
  await page.getByRole('button', { name: 'Save current as B' }).click();
  const comparison = await page.locator('section[aria-labelledby="budget-scenarios-heading"] table').innerText();
  verify(/Scenario A/.test(comparison) && /Scenario B/.test(comparison) &&
    comparison.includes('$8,000') && comparison.includes('$9,000'),
    label + ': A/B comparison did not show saved income states: ' + comparison.slice(0, 300));
  row.checks.push('Scenario A/B comparison updates on actual browser input');

  const downloadPromise = page.waitForEvent('download', { timeout: 20_000 });
  await page.getByRole('button', { name: 'Download CSV' }).click();
  const download = await downloadPromise;
  verify(download.suggestedFilename() === 'texas-household-budget.csv', label + ': incorrect CSV download name');
  const csv = await readFile(await download.path(), 'utf8');
  verify(csv.includes('"Total","Monthly income","","monthly","9000.00"'), label + ': CSV income');
  verify(csv.includes('"Total","Monthly expenses and bill reserves","","monthly","5350.00"'), label + ': CSV monthly expense total');
  verify(csv.includes('"Total","Monthly savings allocations","","monthly","700.00"'), label + ': CSV savings');
  verify(csv.includes('"Total","Remaining after allocations","","monthly","2950.00"'), label + ': CSV remaining');
  verify(csv.includes('"Annual and irregular bills","Travel, gifts and seasonal spending","1200","annual","100.00"'),
    label + ': CSV annual monthly reserve');
  row.checks.push('Real CSV browser download and exact financial totals');

  const copy = page.getByRole('button', { name: 'Copy share link' });
  verify(await copy.isDisabled(), label + ': share link exposed before privacy acknowledgment');
  await page.getByRole('checkbox', { name: /I understand that the copied URL exposes/ }).check();
  verify(await copy.isEnabled(), label + ': approved share link button disabled');
  await copy.click();
  await page.waitForFunction(() => document.querySelector('section[aria-labelledby="budget-actions-heading"] [role="status"]')?.textContent?.includes('Budget share URL copied'),
    null, { timeout: 10_000 });
  const sharedLink = await page.evaluate(() => navigator.clipboard.readText());
  const target = new URL(sharedLink);
  verify(target.origin === origin && target.pathname === '/texas-budget-planner', label + ': wrong share URL origin/path');
  const sharedBudget = JSON.parse(target.searchParams.get('b3') || '{}');
  verify(sharedBudget.pay === 9000 && sharedBudget.annualTravel === 1200,
    label + ': share link did not contain current user input');
  verify(Object.keys(sharedBudget).length >= 25 && !('secretNote' in sharedBudget),
    label + ': budget fields missing or leaking unrelated state');
  row.checks.push('Share consent gate, clipboard content and sanitized URL encoding');

  // The saved local household must not override a different explicitly shared URL.
  await page.goto(sharedLink, { waitUntil: 'domcontentloaded', timeout: 50_000 });
  await incomeIs(page, '$9,000');
  row.checks.push('Explicit share URL takes precedence over previously saved local budget');

  await page.emulateMedia({ media: 'print' });
  const print = await page.evaluate(() => ({
    details: getComputedStyle(document.querySelector('#budget-print-details')).display,
    actions: getComputedStyle(document.querySelector('section[aria-labelledby="budget-actions-heading"]')).display,
    text: document.querySelector('#budget-print-details')?.innerText || '',
  }));
  verify(print.details !== 'none' && print.actions === 'none', label + ': print media visibility invalid');
  verify(print.text.includes('Travel, gifts and seasonal spending (annual reserve)') && print.text.includes('$100'),
    label + ': printed budget missing itemized annual reserve');
  row.checks.push('Print preview shows itemized entries; interactive actions hidden');
  await page.emulateMedia({ media: 'screen' });

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  row.horizontalOverflow = overflow;
  verify(overflow <= 10, label + ': horizontal overflow ' + overflow + 'px');
  verify(!row.pageErrors.length, label + ': runtime page errors: ' + row.pageErrors.join('; '));
  await page.screenshot({ path: output + '/' + label + '-passed.png', fullPage: false, animations: 'disabled' });
  row.checks.push('No horizontal overflow or unhandled browser runtime errors');
  console.log('PASS ' + label + ': ' + row.checks.join('; '));
}

let browser;
try {
  browser = await chromium.launch({ headless: true,
    executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  for (const [label, width, height, mobile] of [['desktop', 1366, 900, false], ['mobile', 390, 844, true]]) {
    const context = await browser.newContext({
      viewport: { width, height }, isMobile: mobile, hasTouch: mobile,
      deviceScaleFactor: 1, acceptDownloads: true,
      permissions: ['clipboard-read', 'clipboard-write'],
    });
    const page = await context.newPage();
    try { await check(page, label); }
    catch (error) {
      const row = evidence[evidence.length - 1];
      const message = error instanceof Error ? error.stack || error.message : String(error);
      row.failures.push(message);
      process.exitCode = 1;
      console.error('FAIL ' + label + ' Texas budget planner browser test:\n' + message);
      try {
        await page.emulateMedia({ media: 'screen' });
        await page.screenshot({ path: output + '/' + label + '-failed.png', fullPage: false, timeout: 20_000 });
      } catch { /* The JSON report still retains the failure. */ }
    } finally { await context.close(); }
  }
} catch (error) {
  process.exitCode = 1;
  evidence.push({ startupFailure: String(error) });
} finally {
  await browser?.close();
  await writeFile(output + '/acceptance.json', JSON.stringify({
    testedAt: new Date().toISOString(), url, gitSha: process.env.GITHUB_SHA || 'local',
    evidence, note: 'Only hypothetical budget data is entered. No user financial information.',
  }, null, 2) + '\n');
}
if (process.exitCode) console.error('Texas budget planner real-browser acceptance failed; see artifact report.');
else console.log('Texas budget planner real-browser acceptance passed on mobile and desktop.');
