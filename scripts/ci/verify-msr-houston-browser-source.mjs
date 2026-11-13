import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const browser = readFileSync(new URL('./verify-msr-houston-browser.mjs', import.meta.url), 'utf8');
const workflow = readFileSync(new URL('../../.github/workflows/deploy-production.yml', import.meta.url), 'utf8');
for (const contract of [
  "for (let attempt = 1; attempt <= 2; attempt++)",
  "attempt === 2 || !/TimeoutError/.test(String(error))",
  "page.goto(url, { waitUntil: 'commit', timeout: 45000 })",
  "assert.equal(response?.status(), 200",
  "assert.ok(facts.width <= facts.viewport + 8",
  "rootHydrated",
  "assert.ok(facts.photoAttribution",
  "assert.deepEqual(failures, []",
  "await page.screenshot(",
  "await logisticsLink.click()",
]) assert.ok(browser.includes(contract), 'MSR real-browser strict acceptance/retry missing: ' + contract);
assert.ok(workflow.includes("run: node scripts/ci/verify-msr-houston-browser.mjs"),
  'Strict live desktop/mobile acceptance must remain part of production deployment');
assert.ok(browser.includes("const tests = [") && browser.includes("name: 'desktop'") && browser.includes("name: 'mobile'"),
  'Both actual Chrome viewport classes must still be exercised');
console.log('PASS bounded second attempt only for transient MSR HTTP-commit timeouts; full desktop/mobile live assertions remain strict.');
