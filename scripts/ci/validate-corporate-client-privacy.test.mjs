import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { test } from 'node:test';
import { corporateClientPrivacyViolations, assertCompiledCorporateClientPrivacy } from './validate-corporate-client-privacy.mjs';

test('allow public venue and planning-field labels, reject private SQL and secrets', () => {
  assert.deepEqual(corporateClientPrivacyViolations('TexasDefined company event: Houston, 45 guests, venue officialUrl, budgetPerPerson, consentContact'), []);
  for (const name of [
    'texasdefined_group_event_requests',
    'texasdefined_group_event_partner_applications',
    'texasdefined_group_event_outcome_events',
    'texasdefined_group_event_offer_click_totals',
    'first_contact_evidence_reference',
    'commercial_agreement_reference',
    'provider_outreach_revocation_note',
    'SUPABASE_SERVICE_ROLE_KEY',
  ]) assert(corporateClientPrivacyViolations(name).length, 'Known private marker escaped scanner: '+name);
  assert.deepEqual(corporateClientPrivacyViolations('activity categories, group size up to 8000; organizer may revoke consent'), []);
});

test('inspect actual nested public JS assets with no network or customer records', async () => {
  const root = await mkdtemp(join(tmpdir(), 'td-corporate-client-isolation-'));
  try {
    await mkdir(join(root,'nested'));
    await writeFile(join(root,'main-a.js'), 'console.log("Public Houston directory");\n');
    await writeFile(join(root,'nested','corporate-b.js'), 'export const guests = 45;\n');
    await writeFile(join(root,'ignored.txt'), 'texasdefined_group_event_requests');
    const pass = await assertCompiledCorporateClientPrivacy(root);
    assert.equal(pass.scannedClientFiles,2);
    await writeFile(join(root,'nested','corporate-b.js'), 'const x = "texasdefined_group_event_partner_outreach";');
    await assert.rejects(() => assertCompiledCorporateClientPrivacy(root), /private-group-ledger-table/);
    await writeFile(join(root,'nested','corporate-b.js'), 'const x = "SUPABASE_SERVICE_ROLE_KEY";');
    await assert.rejects(() => assertCompiledCorporateClientPrivacy(root), /service-role-secret-name/);
  } finally { await rm(root,{recursive:true,force:true}); }
});
