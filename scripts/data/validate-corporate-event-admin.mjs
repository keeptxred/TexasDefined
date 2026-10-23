import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (name) => readFileSync(name, 'utf8');
const server = read('src/data/corporate-events.admin.server.ts');
const functions = read('src/data/corporate-events.admin.functions.ts');
const component = read('src/components/events/CorporateEventOpsPanel.tsx');
const adminPage = read('src/routes/admin.sports-partners.lazy.tsx');
const migration = read('supabase/migrations/20261023172000_group_event_partners.sql');

assert(adminPage.includes('{dashboard ? <CorporateEventOpsPanel accessKey={accessKey} /> : null}'), 'Marketplace operations panel must not render before authorized dashboard unlock');
assert(server.includes("import { assertSportsPartnerAccess }"), 'Use existing server-side admin key verification');
const protectedFunctions = ['loadCorporateEventOperations', 'setCorporateEventLeadStatus', 'setCorporateEventApplicationStatus', 'proposeCorporateEventOffer', 'setCorporateEventOfferStatus'];
for (const name of protectedFunctions) {
  const start = server.indexOf('export async function ' + name);
  assert(start >= 0, name + ' is missing');
  assert(server.slice(start, start + 320).includes('await assertSportsPartnerAccess(accessKey)'), name + ' must authenticate before any database reads or writes');
}
assert(functions.includes("createServerFn({ method: 'POST' })"), 'All inbox methods must use POST');
assert(functions.includes('z.string().uuid()'), 'Mutation IDs must be validated UUIDs');
assert(server.includes("status: 'draft'"), 'Applications cannot directly activate an offer');
assert(server.includes('partner?.status !== \'approved\''), 'Offers cannot be approved for an unverified business');
assert(server.includes("reviewed_at: new Date().toISOString()"), 'Approvals must record review time');
assert(server.includes("redemption.protocol !== 'https:'"), 'Offer links must use HTTPS');
assert(server.includes('redemption.hostname !== issuer.hostname'), 'Offer link must match the business domain');
assert(migration.includes('enable row level security') && migration.includes('revoke all on table public.texasdefined_group_event_offers from anon, authenticated'), 'Offers must remain protected');
assert(component.includes("window.confirm('Approve this verified offer"), 'Approvals must require explicit human confirmation');
assert(!component.includes('localStorage.setItem'), 'Do not persist admin credentials in local storage');
console.log('PASS: corporate event operator access, review, protected data, draft creation and offer approval contract.');
