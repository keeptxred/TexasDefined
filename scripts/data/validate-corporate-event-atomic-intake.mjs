import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

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
console.log('Corporate event intake atomic rate guard, consent and privacy contract PASS');
