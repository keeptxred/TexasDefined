import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

// Synthetic in-process security regression only. Nothing here imports the
// real Supabase client, uses a live admin key, issues HTTP, or writes records.
// The existing HTTP/browser and RLS tests remain separate requirements.
const modules = [
  {
    path: 'src/data/corporate-events.admin.server.ts',
    operations: [
      ['loadCorporateEventOperations'],
      ['setCorporateEventLeadStatus', '00000000-0000-4000-8000-000000000001', 'reviewing'],
      ['setCorporateEventApplicationStatus', '00000000-0000-4000-8000-000000000002', 'reviewing', false, ''],
      ['proposeCorporateEventOffer', { applicationId: '00000000-0000-4000-8000-000000000003' }],
      ['setCorporateEventOfferStatus', '00000000-0000-4000-8000-000000000004', 'paused'],
      ['recordCorporateEventCommercialAgreement',
        '00000000-0000-4000-8000-000000000005', 'SYNTHETIC EXTERNAL REFERENCE', true, false, null],
      ['revokeCorporateEventVenueSharing',
        '00000000-0000-4000-8000-000000000006', true, 'SYNTHETIC VERIFIED INSTRUCTION'],
    ],
  },
  {
    path: 'src/data/corporate-event-quote.server.ts',
    operations: [
      ['prepareCorporateEventPartnerQuote', '00000000-0000-4000-8000-000000000007', 'synthetic-venue'],
    ],
  },
  {
    path: 'src/data/corporate-event-partner-outreach.server.ts',
    operations: [
      ['loadCorporateVenueOutreach'],
      ['recordCorporateVenueOutreach', { venueSlug: 'synthetic-venue', contactKind: 'initial_contact' }],
    ],
  },
  {
    path: 'src/data/corporate-event-outcomes.server.ts',
    operations: [
      ['loadCorporateEventOutcomes'],
      ['recordCorporateEventOutcome', { plannerRequestId: '00000000-0000-4000-8000-000000000008' }],
    ],
  },
];

const invalidKey = 'SYNTHETIC-INVALID-ADMIN-CREDENTIAL-NOT-AN-ACTUAL-KEY';
let protectedCallsChecked = 0;
for (const { path, operations } of modules) {
  const source = readFileSync(path, 'utf8');
  const result = ts.transpileModule(source, {
    fileName: path,
    reportDiagnostics: true,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  });
  const errors = (result.diagnostics ?? []).filter(d => d.category === ts.DiagnosticCategory.Error);
  assert.equal(errors.length, 0, 'Protected server module must transpile for isolation test: ' + path);

  let credentialChecks = 0;
  let databaseCalls = 0;
  const fakeDatabase = {
    from() {
      databaseCalls++;
      throw new Error('Unauthorized operation touched a private database table');
    },
    rpc() {
      databaseCalls++;
      throw new Error('Unauthorized operation invoked a database RPC');
    },
  };
  const dependencies = {
    '@/data/sports-partner-leads.server': {
      async assertSportsPartnerAccess(key) {
        credentialChecks++;
        assert.equal(key, invalidKey, 'Only the synthetic invalid key may be exercised');
        throw new Error('Access denied.');
      },
    },
    '@/integrations/supabase/client.server': { supabaseAdmin: fakeDatabase },
    '@/data/corporate-events': { corporateEventProviders: [] },
    '@/data/corporate-event-dates': {
      corporateEventTexasToday: () => '2026-10-27',
      isValidCorporateEventCalendarDate: () => false,
      isUpcomingCorporateEventDate: () => false,
    },
    '@/data/corporate-event-offer-provenance': {
      corporateEventOfficialDomainMatches: () => false,
      corporateEventVerifiedRedemptionUrl: () => false,
      corporateEventEvidenceTimestampIsValid: () => false,
    },
    '@/data/corporate-event-partner-followups': {
      dueLatestCorporateVenueFollowups: () => [],
    },
  };
  const module = { exports: {} };
  runInNewContext(result.outputText, {
    module,
    exports: module.exports,
    require(specifier) {
      assert(Object.hasOwn(dependencies, specifier),
        'Unexpected dependency loaded in isolated private handler: ' + specifier);
      return dependencies[specifier];
    },
  }, { filename: 'isolated-' + path.replaceAll('/', '-'), timeout: 1000 });

  for (const [name, ...args] of operations) {
    const fn = module.exports[name];
    assert.equal(typeof fn, 'function', 'Private endpoint function missing: ' + name);
    const beforeChecks = credentialChecks;
    const beforeReads = databaseCalls;
    await assert.rejects(() => fn(invalidKey, ...args), /Access denied\./,
      'Private operation must reject an invalid operator key: ' + name);
    assert.equal(credentialChecks, beforeChecks + 1,
      'Function must invoke credential verification before any private work: ' + name);
    assert.equal(databaseCalls, beforeReads,
      'Invalid operator credentials must never access a private table or RPC: ' + name);
    protectedCallsChecked++;
  }
}
assert.equal(protectedCallsChecked, 12,
  'All 12 existing staff-only corporate read/mutation functions must be exercised');
console.log('PASS: 12 protected corporate event runtime functions refuse invalid operator credentials before database access; isolated zero-write test.');
