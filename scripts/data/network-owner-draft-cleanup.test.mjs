import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {wereNetworkUnsubmittedDraftsDeleted} from '../../src/data/network-owner-draft-cleanup.ts';

const one='user-1/account-1/draft-one.png';
const two='user-1/account-1/draft-two.webp';
const three='user-1/account-1/draft-three.jpg';

test('HTTP 200 no-op DELETE of a referenced draft does not count as cleanup',()=>{
 assert.equal(wereNetworkUnsubmittedDraftsDeleted([one],[{name:'draft-one.png'}]),false);
 assert.equal(wereNetworkUnsubmittedDraftsDeleted([one,two],[{name:'draft-two.webp'}]),false);
});
test('completed full and partial cleanup checks match actual listed object basenames',()=>{
 assert.equal(wereNetworkUnsubmittedDraftsDeleted([one,two],[{name:'unrelated.png'}]),true);
 assert.equal(wereNetworkUnsubmittedDraftsDeleted([one,two],[{name:'draft-one.png'}]),false);
 assert.equal(wereNetworkUnsubmittedDraftsDeleted([one,two],[{name:'draft-two.webp'}]),false);
 assert.equal(wereNetworkUnsubmittedDraftsDeleted([one,three],[]),true);
});
test('cleanup never claims certainty when Storage inventory is absent or paths malformed',()=>{
 for(const items of [undefined,null]){
  assert.equal(wereNetworkUnsubmittedDraftsDeleted([one],items),false);
 }
 assert.equal(wereNetworkUnsubmittedDraftsDeleted(['not-a-path'],[]),false);
 assert.equal(wereNetworkUnsubmittedDraftsDeleted(['owner/account/'],[]),false);
 assert.equal(wereNetworkUnsubmittedDraftsDeleted([],[]),true);
});
test('owner dashboard confirms post-DELETE inventory and clears the previous user session data',()=>{
 const page=readFileSync('src/routes/business.dashboard.lazy.tsx','utf8');
 assert.match(page,/await drafts\.remove\(uploadedPaths\)/);
 assert.match(page,/await drafts\.list\(user\.id\+'\/'\+account\.id,\{limit:100\}\)/);
 assert.match(page,/wereNetworkUnsubmittedDraftsDeleted\(uploadedPaths,remainingMedia\)/);
 assert.match(page,/setAccount\(null\);setPublished\(null\);setRevisions\(\[\]\)/);
 assert.match(page,/setDraft\(\{\}\);setNewLogo\(null\);setNewGallery\(\[\]\)/);
 assert.match(page,/let authStateEventReceived=false;/);
 assert.match(page,/if\(alive&&!authStateEventReceived\)setUserId\(data\.user\?\.id\|\|null\)/);
 assert.match(page,/authStateEventReceived=true;/);
 assert.match(page,/setEmail\(''\);setMessage\(''\);/);
});
