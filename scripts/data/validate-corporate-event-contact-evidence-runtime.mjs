import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

// Exercise the actual protected lead mutation, but never load a real database,
// send a message, use an administrator credential, or create a real lead.
const src = readFileSync('src/data/corporate-events.admin.server.ts', 'utf8');
const output = ts.transpileModule(src, {
  fileName: 'src/data/corporate-events.admin.server.ts',
  reportDiagnostics: true,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
});
assert.equal((output.diagnostics ?? []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
const syntheticKey = 'SYNTHETIC-OPERATOR-KEY-NEVER-CONNECTED';
const hoursAgo = hours => new Date(Date.now() - hours * 3600_000).toISOString();
const evidence = 'SYNTHETIC verified real-contact reference — NOT A CUSTOMER';
const created = hoursAgo(100);
const samples = [
  { title: 'invalid date', prior: 'impossible-date', sourceEvidence: evidence },
  { title: 'future date', prior: new Date(Date.now() + 7200_000).toISOString(), sourceEvidence: evidence },
  { title: 'pre-intake contact', prior: hoursAgo(120), sourceEvidence: evidence },
  { title: 'missing evidence', prior: hoursAgo(80), sourceEvidence: null },
  { title: 'too-short evidence', prior: hoursAgo(80), sourceEvidence: 'not real' },
];

function isolate(record) {
  let accessChecks = 0;
  const writes = [];
  let queries = 0;
  const mockClient = {
    from(table) {
      assert.equal(table, 'texasdefined_group_event_requests');
      queries += 1;
      let patch = null;
      const builder = {
        select() { return this; },
        eq() { return this; },
        is() { return this; },
        update(value) { patch = value; writes.push(value); return this; },
        maybeSingle() {
          return Promise.resolve(patch
            ? { data: { id: record.id, status: patch.status }, error: null }
            : { data: record, error: null });
        },
      };
      return builder;
    },
  };
  const imports = {
    '@/data/sports-partner-leads.server': {
      assertSportsPartnerAccess: async key => {
        accessChecks++;
        assert.equal(key, syntheticKey);
      },
    },
    '@/integrations/supabase/client.server': { supabaseAdmin: mockClient },
    '@/data/corporate-events': { corporateEventProviders: [] },
    '@/data/corporate-event-dates': {
      corporateEventTexasToday: () => '2026-10-27',
      isValidCorporateEventCalendarDate: () => false,
    },
    '@/data/corporate-event-offer-provenance': {
      corporateEventEvidenceTimestampIsValid: () => false,
      corporateEventVerifiedRedemptionUrl: () => false,
    },
  };
  const module = { exports: {} };
  runInNewContext(output.outputText, {
    module, exports: module.exports,
    require(name) {
      assert(Object.hasOwn(imports, name), 'Unexpected protected import: ' + name);
      return imports[name];
    },
  }, { filename: 'isolated-corporate-lead-admin.cjs', timeout: 1000 });
  return { update: module.exports.setCorporateEventLeadStatus, writes,
    get checks() { return accessChecks; }, get queries() { return queries; } };
}
function lead(prior, sourceEvidence = null, created_at = created) {
  return { id: '00000000-0000-4000-8000-000000000001',
    created_at, first_contacted_at: prior,
    first_contact_evidence_reference: sourceEvidence };
}
for (const entry of samples) {
  const test = isolate(lead(entry.prior, entry.sourceEvidence));
  await assert.rejects(() => test.update(syntheticKey, lead().id, 'contacted', ''),
    /previously recorded first contact lacks valid timestamp or evidence/i,
    entry.title + ' cannot be used as real first-contact proof');
  assert.equal(test.checks, 1, entry.title + ': authorization first');
  assert.equal(test.queries, 1, entry.title + ': only private lookup');
  assert.equal(test.writes.length, 0, entry.title + ': no status change');
}
const futureInquiry = isolate(lead(null, null, hoursAgo(-1)));
await assert.rejects(() => futureInquiry.update(syntheticKey, lead().id, 'contacted', evidence),
  /planner creation date is invalid/i);
assert.equal(futureInquiry.writes.length, 0, 'Never stamp contact before a future-dated inquiry');

const newContactNoEvidence = isolate(lead(null));
await assert.rejects(() => newContactNoEvidence.update(syntheticKey, lead().id, 'contacted', ''),
  /real first contact requires an independently verifiable external reference/i);
assert.equal(newContactNoEvidence.writes.length, 0, 'A status click cannot create contact evidence');

const newContactWithEvidence = isolate(lead(null));
const result = await newContactWithEvidence.update(syntheticKey, lead().id, 'contacted', evidence);
assert.equal(result.status, 'contacted');
assert.equal(newContactWithEvidence.writes.length, 1, 'An actual supported contact is stamped once');
assert.equal(newContactWithEvidence.writes[0].first_contact_evidence_reference, evidence);
const actualTime = Date.parse(newContactWithEvidence.writes[0].first_contacted_at);
assert(Number.isFinite(actualTime) && actualTime >= Date.parse(created)
  && actualTime <= Date.now(), 'First-contact time must be generated by server after inquiry');

const validPrior = isolate(lead(hoursAgo(80), evidence));
await validPrior.update(syntheticKey, lead().id, 'contacted', '');
assert.equal(validPrior.writes.length, 1);
assert.equal(Object.hasOwn(validPrior.writes[0], 'first_contacted_at'), false,
  'Existing genuinely evidenced first-contact timestamp must not be restamped');
assert.equal(Object.hasOwn(validPrior.writes[0], 'first_contact_evidence_reference'), false,
  'Existing independent evidence must not be overwritten by a status edit');

// Remediation is still possible: an invalid old contact timestamp must not
// prevent moving a request back into the 'reviewing' queue for human action.
const reviewInvalid = isolate(lead('impossible-date', evidence));
await reviewInvalid.update(syntheticKey, lead().id, 'reviewing', '');
assert.equal(reviewInvalid.writes[0].status, 'reviewing');
assert.equal(Object.hasOwn(reviewInvalid.writes[0], 'first_contacted_at'), false,
  'Review transition must preserve old evidence for a separately audited correction');

console.log('PASS: isolated live handler rejects false first-contact evidence and future/pre-intake dates, stamps real supported contact once, preserves existing proof, permits review; zero production access.');
