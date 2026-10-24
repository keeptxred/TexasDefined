import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const browser = readFileSync('scripts/ci/verify-corporate-events-browser.mjs','utf8');
const workflow = readFileSync('.github/workflows/corporate-events-responsive-production.yml','utf8');
const existing = readFileSync('src/routes/corporate-events.lazy.tsx','utf8');

for (const marker of [
  "name: 'mobile', width: 390", "name: 'tablet', width: 768",
  "name: 'desktop', width: 1365", "getByRole('spinbutton', { name: 'Number of guests' })",
  "getByRole('combobox', { name: 'Maximum budget per person' })",
  "getByRole('button', { name: 'Compare', exact: true })",
  "getByRole('button', { name: 'Copy share link' })",
  "page.emulateMedia({ media: 'print' })",
  "request.evaluate(form => form.checkValidity())",
  "getByRole('button', { name: 'Send planning request to TexasDefined' }).isDisabled()",
  "assert(!/email|phone|contactName|companyAddress2/.test(url.search)",
  "document.documentElement.scrollWidth",
  "noProductionInquiriesSubmitted: true",
]) assert(browser.includes(marker),'Missing real responsive browser acceptance contract: ' + marker);

assert(!browser.includes("form.submit(") && !browser.includes("form.requestSubmit(")
  && !browser.includes("submitGroupEventRequest") && !browser.includes("submitGroupEventPartnerApplication"),
  'The live production browser test must NEVER create fake form inquiries');
assert(browser.includes("request.method() !== 'GET'"), 'Live smoke must flag unexpected non-read-only requests');
assert(browser.includes("await page.screenshot"), 'Real browser evidence must be retained');
assert(workflow.includes("PRODUCTION_COMMIT_SHA: ${{ github.sha }}"), 'Require exact deployed commit SHA');
assert(workflow.includes('node scripts/ci/wait-for-protected-production.mjs'), 'Never validate ahead of publication');
assert(workflow.includes("node scripts/ci/verify-corporate-events-browser.mjs"), 'Run the actual Chrome browser script after publication');
assert(workflow.includes("playwright-core@1.56.1"), 'Use isolated pinned browser driver');
assert(!workflow.includes("wrangler deploy"), 'Only the existing production workflow may publish');
assert(existing.includes("id=\"proposal\"") && existing.includes("id=\"planning-request\""),
  'Browser checks must target actual current public page sections');
console.log('Corporate events read-only Chrome mobile/tablet/desktop acceptance contract PASS');
