import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {matchingNetworkOwnerEmail} from '../../src/data/network-owner-email.ts';

test('verified application contact accepts case and whitespace differences from confirmed Auth email',()=>{
 assert.equal(matchingNetworkOwnerEmail('Owner@EXAMPLE.invalid','owner@example.invalid'),true);
 assert.equal(matchingNetworkOwnerEmail(' Owner@Example.invalid ',' owner@example.INVALID  '),true);
 assert.equal(matchingNetworkOwnerEmail('billing+TX@EXAMPLE.invalid','BILLING+tx@example.INVALID'),true);
});
test('verified owner equality never treats characters in emails as wildcard patterns',()=>{
 assert.equal(matchingNetworkOwnerEmail('owner_1@example.invalid','ownerZ1@example.invalid'),false);
 assert.equal(matchingNetworkOwnerEmail('owner%1@example.invalid','ownerZ1@example.invalid'),false);
 assert.equal(matchingNetworkOwnerEmail('a@example.invalid','b@example.invalid'),false);
 assert.equal(matchingNetworkOwnerEmail('owner@example.invalid','owner@other.invalid'),false);
 assert.equal(matchingNetworkOwnerEmail('owner@example.invalid','owner@example.invalid.evil.invalid'),false);
});
test('missing or invalid owner-contact values fail closed before any payment portal is created',()=>{
 for(const invalid of [null,undefined,{},42,'','  ',[],true]){
  assert.equal(matchingNetworkOwnerEmail(invalid,'owner@example.invalid'),false);
  assert.equal(matchingNetworkOwnerEmail('owner@example.invalid',invalid),false);
 }
});
test('GET and POST billing authorization both compare contact email after binding and do not use wildcard or exact-case database filters',()=>{
 const route=readFileSync('src/routes/api.public.network-billing.ts','utf8');
 assert.match(route,/\.filter\(item=>matchingNetworkOwnerEmail\(item\.contact_email,auth\.email\)\)/);
 assert.match(route,/!matchingNetworkOwnerEmail\(data\.contact_email,auth\.email\)/);
 assert.doesNotMatch(route,/\.eq\("contact_email",\s*auth\.email\)/);
 assert.doesNotMatch(route,/\.ilike\(/);
 assert.match(route,/\.eq\("owner_user_id",\s*auth\.userId\)/);
 assert.match(route,/\.eq\("access_enabled",\s*true\)/);
});
