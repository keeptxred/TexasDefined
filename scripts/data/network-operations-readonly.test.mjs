import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const sql=readFileSync(new URL('./network-operations-readonly.sql',import.meta.url),'utf8');
test('Network operational inventory uses aggregate read-only SELECT without credentials or mutations',()=>{
 const executable=sql.replace(/--[^\n]*/g,'');
 assert.match(executable,/WITH snapshot AS/);
 assert.match(executable,/SELECT \* FROM snapshot;/);
 assert.doesNotMatch(executable,/\b(?:INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|TRUNCATE|COPY|GRANT|REVOKE|CALL|DO)\b/i);
 assert.doesNotMatch(executable,/(?:auth\.users|service_role_key|password|secret_key)/i);
 assert.match(executable,/owner_revision_revocation_policy_present/);
 assert.match(executable,/paid_listing_entitlement_drift/);
 assert.match(executable,/notification_uncertain_claims/);
 assert.match(executable,/applied_network_security_versions/);
 assert.match(executable,/atomic_storage_trigger_count/);
 assert.match(executable,/featured_draft_objects/);
});
