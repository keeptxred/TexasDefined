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
  "for (const market of ['Dallas', 'Dallas-Fort Worth', 'Austin', 'San Antonio', 'El Paso', '77002', 'Texas'])",
  "for (const count of [13, 25, 100, 300, 500, 5000, 8000])",
  "await guests.fill('6000')",
  "await guests.fill('6001')",
  "await guests.fill('19')",
  "await guests.fill('550')",
  "await guests.fill('551')",
  "await guests.fill('74')",
  "name: 'Houston Zoo'",
  "name: 'Pelazzio'",
  "entire-Zoo after-hours rental reaches 6,000",
  "NOT a single-room 550-person setup",
  "await guests.fill('8001')",
  "getByText('Choose a whole-number group of 2 to 8,000 guests.')",
  "getAttribute('aria-invalid')",
  "level: 3, name: 'Space Center Houston'",
  "await page.goto(copied",
  "await dateInput.fill(yesterday)",
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
assert(workflow.includes('workflow_run:') && workflow.includes('workflows: [Deploy TexasDefined production]')
  && workflow.includes('types: [completed]'),
  'Real browser acceptance must start from a completed protected production deployment, not a racing source push');
assert(workflow.includes("github.event.workflow_run.conclusion == 'success'"),
  'Never execute live browser acceptance for a cancelled or failed production release');
assert(workflow.includes("PRODUCTION_COMMIT_SHA: ${{ github.event.workflow_run.head_sha || github.sha }}"),
  'Check the exact SHA of the successful production workflow, not a later default-branch HEAD');
assert(workflow.includes("ref: ${{ github.event.workflow_run.head_sha || github.sha }}"),
  'Checkout the exact released source SHA for browser verification');
assert(!workflow.includes('\n  push:\n'), 'A source push must not race protected deployment in live Chrome QA');
assert(workflow.includes('node scripts/ci/wait-for-protected-production.mjs'), 'Never validate ahead of publication');
assert(workflow.includes("node scripts/ci/verify-corporate-events-browser.mjs"), 'Run the actual Chrome browser script after publication');
assert(workflow.includes("playwright-core@1.56.1"), 'Use isolated pinned browser driver');
assert(!workflow.includes("wrangler deploy"), 'Only the existing production workflow may publish');
assert(existing.includes("id=\"proposal\"") && existing.includes("id=\"planning-request\""),
  'Browser checks must target actual current public page sections');
assert(existing.includes("data-corporate-hydrated={clientReady ? 'true' : 'false'}")
  && existing.includes('setClientReady(true);'),
  'Corporate SSR must expose a post-mount client readiness marker without PII');
assert(browser.includes('main#main[data-corporate-hydrated="true"]')
  && browser.includes(".waitFor({ state: 'visible', timeout: 25_000 })"),
  'Real Chrome must confirm hydrated interactions before filling controlled inputs');
console.log('Corporate events read-only Chrome mobile/tablet/desktop acceptance contract PASS');
