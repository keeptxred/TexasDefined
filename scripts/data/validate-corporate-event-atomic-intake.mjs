import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

const migration = readFileSync('supabase/migrations/20261024013000_group_event_atomic_intake_guard.sql', 'utf8');
const server = readFileSync('src/data/corporate-events.server.ts', 'utf8');
const planners = readFileSync('src/data/corporate-events.functions.ts', 'utf8');
const partners = readFileSync('src/data/corporate-event-partners.functions.ts', 'utf8');

for (const table of ['texasdefined_group_event_requests', 'texasdefined_group_event_partner_applications']) {
  assert(migration.includes('before insert on public.' + table),
    'Both private intake tables must have an atomic insert guard: ' + table);
  assert(migration.includes('from public.' + table),
    'Both intake limits must read the actual protected table: ' + table);
}
assert(migration.includes('pg_catalog.pg_advisory_xact_lock'), 'Concurrent Worker requests must serialize before window checks');
assert(migration.includes('security invoker') && migration.includes("set search_path = ''"),
  'Trigger must run with caller permissions and an empty lookup path');
assert(migration.includes('revoke all on function public.texasdefined_group_event_intake_guard() from public, anon, authenticated'),
  'Internal function must not become a public RPC endpoint');
assert(migration.includes('grant execute on function public.texasdefined_group_event_intake_guard() to service_role'),
  'Server-only submission must retain execution rights');
assert(migration.includes('hourly_total >= 150 or hourly_for_email >= 3'),
  'Planner guard must cap total and per-email submissions');
assert(migration.includes('hourly_total >= 60 or hourly_for_email >= 2'),
  'Partner guard must cap total and per-email submissions');
// Comments can describe dangerous techniques without implementing them.
// Analyze executable SQL, while retaining explicit negative coverage.
const executableSql = migration.replace(/--[^\n]*/g, '');
const personalIdentifierPattern = /remote_addr|inet_client_addr|cf-connecting-ip|user.agent|fingerprint|ip_address/i;
assert(!personalIdentifierPattern.test(executableSql),
  'Rate protection must not persist identifiable client/device data');
assert(personalIdentifierPattern.test('select inet_client_addr()'),
  'The privacy rule must still detect actual SQL client-address collection');
assert(planners.includes('companyAddress2.trim()') && partners.includes('companyAddress2.trim()'),
  'Honeypot protections must stay fail-quiet');
assert(planners.includes('consentContact') && partners.includes('consentContact'),
  'Explicit contact consent must remain mandatory');
assert(server.includes('texasdefined_group_event_requests') &&
  server.includes('texasdefined_group_event_partner_applications'),
  'Both forms must continue using the server-side private tables');
// Execute the real server-only intake writers with an isolated in-memory
// Supabase mock. Nothing here imports a production client, opens an HTTP
// connection, creates a customer, or touches a database. This complements
// source/SQL contract assertions with success and failure-path behavior.
const compiled = ts.transpileModule(server, {
  fileName: 'src/data/corporate-events.server.ts',
  reportDiagnostics: true,
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
});
assert.equal((compiled.diagnostics ?? []).filter(item =>
  item.category === ts.DiagnosticCategory.Error).length, 0,
  'Server-only intake must transpile for isolated storage behavior tests');

function isolatedIntake({ existing = [], lookupError = null, insertError = null } = {}) {
  const reads = [];
  const writes = [];
  const fakeAdmin = {
    from(table) {
      const query = {
        select(columns) { reads.push({ table, columns }); return this; },
        eq() { return this; },
        gte() { return this; },
        limit() { return Promise.resolve({ data: existing, error: lookupError }); },
        insert(payload) {
          writes.push({ table, payload });
          return Promise.resolve({ error: insertError });
        },
      };
      return query;
    },
  };
  const module = { exports: {} };
  runInNewContext(compiled.outputText, {
    module, exports: module.exports,
    require(id) {
      assert.equal(id, '@/integrations/supabase/client.server',
        'Isolated intake must load no unexpected external code');
      return { supabaseAdmin: fakeAdmin };
    },
  }, { filename: 'corporate-events.server.simulated.cjs', timeout: 1000 });
  return { api: module.exports, reads, writes };
}

const testPlanner = {
  contact_name: 'SYNTHETIC TEST - NOT A CUSTOMER', email: 'planner@example.invalid',
  company: 'SYNTHETIC TEST', phone: null, city: 'Houston', group_size: 20,
  event_category: 'team-building', event_date: null, budget_per_person: null,
  provider_slugs: [], notes: null, consent_contact: true,
  allow_provider_outreach: false, provider_outreach_consented_at: null,
  source_path: '/corporate-events',
};
const testPartner = {
  contact_name: 'SYNTHETIC TEST - NOT A BUSINESS', email: 'venue@example.invalid',
  phone: null, business_name: 'SYNTHETIC TEST', city: 'Houston',
  website: 'https://example.invalid', published_capacity: null,
  proposal: null, proposed_promo_code: null, notes: null, consent_contact: true,
};
const successPlanner = isolatedIntake();
await successPlanner.api.saveGroupEventRequest(testPlanner);
assert.equal(successPlanner.writes.length, 1, 'A successful legitimate form flow requires a real awaited insert');
assert.equal(successPlanner.writes[0].table, 'texasdefined_group_event_requests');
assert.deepEqual(JSON.parse(JSON.stringify(successPlanner.writes[0].payload)), testPlanner,
  'The validated organizer payload must not silently lose accepted fields');
const successPartner = isolatedIntake();
await successPartner.api.saveGroupEventPartnerApplication(testPartner);
assert.equal(successPartner.writes.length, 1);
assert.equal(successPartner.writes[0].table, 'texasdefined_group_event_partner_applications');
assert.deepEqual(JSON.parse(JSON.stringify(successPartner.writes[0].payload)), testPartner);
for (const [saveName, fixture] of [
  ['saveGroupEventRequest', testPlanner],
  ['saveGroupEventPartnerApplication', testPartner],
]) {
  const unavailable = isolatedIntake({ lookupError: { message: 'simulated lookup outage' } });
  await assert.rejects(unavailable.api[saveName](fixture), /verification is unavailable/i,
    'Unavailable de-duplication storage must fail closed');
  assert.equal(unavailable.writes.length, 0, 'Cannot write when duplicate check failed');
  const rejected = isolatedIntake({ insertError: { message: 'simulated insert rejection' } });
  await assert.rejects(rejected.api[saveName](fixture), /could not save|could not save the business/i,
    'Rejected database storage must never be reported as a successful submission');
  assert.equal(rejected.writes.length, 1, 'An attempted rejected insert cannot count as accepted');
}
const duplicatePlanner = isolatedIntake({ existing: [{id:1},{id:2},{id:3}] });
await assert.rejects(duplicatePlanner.api.saveGroupEventRequest(testPlanner), /too many requests/i);
assert.equal(duplicatePlanner.writes.length, 0, 'Planner hourly limit must stop before insertion');
const duplicatePartner = isolatedIntake({ existing: [{id:1},{id:2}] });
await assert.rejects(duplicatePartner.api.saveGroupEventPartnerApplication(testPartner), /too many applications/i);
assert.equal(duplicatePartner.writes.length, 0, 'Partner hourly limit must stop before insertion');

console.log('Corporate event intake atomic rate guard, consent and privacy contract PASS');
console.log('Corporate intake isolated mocked success, duplicate, unavailable lookup and rejected insert behavior PASS (zero production writes).');
