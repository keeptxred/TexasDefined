import test from 'node:test';
import assert from 'node:assert/strict';
import {assertNetworkAdminAccess} from '../../src/data/network-admin-access.server.ts';

const previous=process.env.NETWORK_ADMIN_ACCESS_KEY;
test.after(()=>{
 if(previous===undefined)delete process.env.NETWORK_ADMIN_ACCESS_KEY;
 else process.env.NETWORK_ADMIN_ACCESS_KEY=previous;
});
test('Network administrator access fails closed when not configured',async()=>{
 delete process.env.NETWORK_ADMIN_ACCESS_KEY;
 process.env.SPORTS_PARTNER_ADMIN_KEY='other-system-key-do-not-reuse-0123456789';
 await assert.rejects(assertNetworkAdminAccess('other-system-key-do-not-reuse-0123456789'));
});
test('Network administrator credentials need minimum 32 characters',async()=>{
 process.env.NETWORK_ADMIN_ACCESS_KEY='short-access-key';
 await assert.rejects(assertNetworkAdminAccess('short-access-key'));
});
test('dedicated Network key accepts exact match and denies wrong same-length key',async()=>{
 const key='network-fixture-admin-key-only-not-a-secret-0987654321';
 process.env.NETWORK_ADMIN_ACCESS_KEY=key;
 await assert.doesNotReject(assertNetworkAdminAccess(key));
 await assert.rejects(assertNetworkAdminAccess(key.replace('0987654321','1234567890')));
});
