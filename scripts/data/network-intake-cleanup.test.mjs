import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import {networkIntakeCleanupObjectPaths,networkIntakeCleanupFolderIsEmpty}
 from '../../src/data/network-intake-cleanup.server.ts';

const id='11111111-1111-4111-8111-111111111111';
test('compensating cleanup enumerates only generated application media',()=>{
 assert.deepEqual(networkIntakeCleanupObjectPaths(id,[]),[]);
 assert.deepEqual(networkIntakeCleanupObjectPaths(id,[
  {name:'logo.png'},{name:'gallery-1.webp'},{name:'gallery-4.jpg'}
 ]),[id+'/logo.png',id+'/gallery-1.webp',id+'/gallery-4.jpg']);
});
test('unexpected owner objects, duplicates and malformed identifiers must fail closed',()=>{
 for(const bad of [
  [{name:'../../another-app.jpg'}],
  [{name:'gallery-5.jpg'}],
  [{name:'admin-audit.txt'}],
  [{name:'logo.png'},{name:'logo.png'}],
  [{name:'logo.PNG'}],
  Array.from({length:6},(_,i)=>({name:'gallery-1.png'}))
 ]){
  assert.equal(networkIntakeCleanupObjectPaths(id,bad),null);
 }
 assert.equal(networkIntakeCleanupObjectPaths('not-an-id',[{name:'logo.png'}]),null);
});
test('a missing or unknown read-after-delete inventory is never proof of cleanup',()=>{
 assert.equal(networkIntakeCleanupFolderIsEmpty(undefined),false);
 assert.equal(networkIntakeCleanupFolderIsEmpty(null),false);
 assert.equal(networkIntakeCleanupFolderIsEmpty([{name:'logo.png'}]),false);
 assert.equal(networkIntakeCleanupFolderIsEmpty([]),true);
});
test('real handler verifies authoritative completion before compensating and keeps orphaned rows if unverified',()=>{
 const handler=readFileSync('src/routes/api.public.network-application.ts','utf8');
 assert.match(handler,/select\("intake_complete"\)/);
 assert.match(handler,/current\?\.intake_complete===true/);
 assert.match(handler,/networkIntakeCleanupObjectPaths\(applicationId,existingMedia\)/);
 assert.match(handler,/networkIntakeCleanupFolderIsEmpty\(remainingMedia\)/);
 assert.match(handler,/\.delete\(\{count:"exact"\}\).*\.eq\("intake_complete",false\)/s);
 assert.match(handler,/Manual cleanup may be required before another submission/);
});
