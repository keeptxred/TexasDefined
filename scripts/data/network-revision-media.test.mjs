import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validatedNetworkRevisionMediaPaths} from '../../src/data/network-revision-media.ts';
const owner='44444444-4444-4444-8444-444444444444';
const account='a1111111-1111-4111-8111-111111111111';
const other='55555555-5555-4555-8555-555555555555';
const root=owner+'/'+account+'/';
const logo=root+'new-logo-001.png',gallery=root+'new-gallery-001.webp';
test('review preview accepts own image paths and six-gallery limit',()=>{
 assert.deepEqual(validatedNetworkRevisionMediaPaths({business_name:'Test'},owner,account),[]);
 assert.deepEqual(validatedNetworkRevisionMediaPaths({logo_storage_path:logo,gallery_storage_paths:[gallery]},owner,account),[logo,gallery]);
 const six=Array.from({length:6},(_,i)=>root+'photo-'+i+'.jpg');
 assert.deepEqual(validatedNetworkRevisionMediaPaths({gallery_storage_paths:six},owner,account),six);
});
test('cross-owner and cross-account paths cannot be signed by service role',()=>{
 for(const value of [other+'/'+account+'/steal.png',owner+'/'+other+'/steal.png'])
  assert.equal(validatedNetworkRevisionMediaPaths({logo_storage_path:value},owner,account),null);
});
test('nested arrays bounded before any signed URL calls',()=>{
 assert.equal(validatedNetworkRevisionMediaPaths({gallery_storage_paths:Array.from({length:2000},()=>gallery)},owner,account),null);
 for(const p of [
 {logo_storage_path:logo,gallery_storage_paths:[logo]},
 {gallery_storage_paths:[gallery,gallery]},
 {gallery_storage_paths:'not an array'},
 {gallery_storage_paths:[true]},
 {logo_storage_path:1234},
 ])assert.equal(validatedNetworkRevisionMediaPaths(p,owner,account),null);
});
test('path traversal, nested files, fragments, query tokens and extensions fail closed',()=>{
 for(const file of ['../outside.png','nested/file.jpg','../../secret.png','file.svg','file.png?token=x','file.png#fragment','.hidden.png','file.jpeg','a'.repeat(240)+'.jpg'])
 assert.equal(validatedNetworkRevisionMediaPaths({logo_storage_path:root+file},owner,account),null,file);
 assert.equal(validatedNetworkRevisionMediaPaths(null,owner,account),null);
 assert.equal(validatedNetworkRevisionMediaPaths({logo_storage_path:logo},'invalid',account),null);
});
test('admin review validates untrusted media before service URL minting and approval',()=>{
 const review=readFileSync('src/data/network-review.server.ts','utf8');
 assert.match(review,/validatedNetworkRevisionMediaPaths\(revision\.proposed_profile,revision\.submitted_by,revision\.business_account_id\)/);
 assert.match(review,/mediaValidationError:paths===null/);
 assert.match(review,/validatedNetworkRevisionMediaPaths\(proposed,account\.owner_user_id,account\.id\)/);
 assert.match(review,/if\(validatedMedia===null\)throw Error\('Invalid proposed media reference'\)/);
});
