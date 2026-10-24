import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = (path) => readFileSync(path, 'utf8');
const migration = read('supabase/migrations/20261023212500_corporate_partner_identity_attestation.sql');
const server = read('src/data/corporate-events.admin.server.ts');
const input = read('src/data/corporate-events.admin.functions.ts');
const view = read('src/components/events/CorporateEventOpsPanel.tsx');

assert(migration.includes('identity_verified_at timestamptz'), 'Approval must have server timestamp');
assert(migration.includes('identity_verified_by text'), 'Approval must have reviewer');
assert(migration.includes('identity_verification_note text'), 'Approval requires a private documented evidence field');
assert(migration.includes("status <> 'approved'"), 'DB must reject unverified approved applications');
assert(migration.includes("char_length(trim(coalesce(identity_verification_note,''))) between 20 and 500"), 'DB must require meaningful verification evidence');

assert(server.includes('await assertSportsPartnerAccess(accessKey)'), 'Only protected staff may update application status');
assert(server.includes("if (status === 'approved' && (!verifiedIdentity || verificationNote.trim().length < 20"), 'Approval must validate positive attestation');
assert(server.includes('identity_verified_at: new Date().toISOString()'), 'Client must not control approval timestamp');
assert(server.includes('identity_verification_note: verificationNote.trim()'), 'Reviewer evidence must be persisted');
assert(server.includes("status,identity_verified_at,identity_verification_note"), 'Offer activation must recheck verified applicant');
assert(server.includes('!corporateEventEvidenceTimestampIsValid(application.identity_verified_at)')
  && server.includes('!application.identity_verification_note'), 'No offer proposal from missing, malformed or future-dated applicant attestation');
assert(server.includes('!corporateEventEvidenceTimestampIsValid(partner.identity_verified_at)')
  && server.includes('!partner.identity_verification_note'), 'No approved promotion from missing, malformed or future-dated applicant attestation');
assert(server.includes('corporateEventVerifiedRedemptionUrl(data.redemptionUrl, String(application.website), record.officialUrl)')
  && server.includes('corporateEventVerifiedRedemptionUrl(String(offer.redemption_url), String(partner.website), reviewedVenue.officialUrl)'),
  'Never let staff draft or approve unverified partner domains, even if a staff attestation field exists');

assert(input.includes('verifiedIdentity: z.boolean().default(false)'), 'Approval attestation must default false');
assert(input.includes("verificationNote: z.string().trim().max(500).default('')"), 'Unverified applications must not assume evidence');
assert(view.includes("window.confirm('Have you independently verified"), 'Show explicit confirmation before approving partner');
assert(view.includes('window.prompt('), 'Ask operator for private evidence');
assert(view.includes('verificationNote = evidence.trim()'), 'Do not use a default fake evidence string');
assert(view.includes('Internal business identity verification:'), 'Support staff audit in private inbox');
console.log('Corporate partner identity approval: documented staff review, DB constraint and offer gating PASSED.');
