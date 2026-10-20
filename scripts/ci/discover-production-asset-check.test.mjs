import assert from 'node:assert/strict';
import test from 'node:test';
import { governedDiscoverSlugs, verifyGovernedDiscoverDelivery } from './discover-production-asset-check.mjs';

const bytes = Buffer.alloc(12);
bytes.write('RIFF', 0, 'ascii');
bytes.write('WEBP', 8, 'ascii');
const okay = () => new Response(bytes, { status: 200, headers: { 'content-type': 'image/webp' } });

test('load the real governed set with no duplicates or invalid paths', () => {
  const slugs = governedDiscoverSlugs();
  assert.ok(slugs.length >= 42);
  assert.ok(slugs.includes('collin-county'));
});

test('successful delivery requires an actual WebP payload', async () => {
  const checked = [];
  const result = await verifyGovernedDiscoverDelivery({
    origin: 'https://texasdefined.com',
    slugs: ['collin-county', 'crockett'],
    fetcher: async (url) => { checked.push(url); return okay(); },
    attempts: 1,
  });
  assert.equal(result.passed, 2);
  assert.deepEqual(result.failures, []);
  assert.deepEqual(checked, [
    'https://texasdefined.com/images/discover/collin-county.webp',
    'https://texasdefined.com/images/discover/crockett.webp',
  ]);
});

test('public 404 assets fail rather than trusting build or HTML metadata', async () => {
  const result = await verifyGovernedDiscoverDelivery({
    origin: 'https://texasdefined.com',
    slugs: ['missing'],
    fetcher: async () => new Response('not found', { status: 404 }),
    attempts: 1,
  });
  assert.equal(result.passed, 0);
  assert.equal(result.failures[0].reason, 'HTTP 404');
});

test('HTML error page served as HTTP 200 fails image-delivery verification', async () => {
  const result = await verifyGovernedDiscoverDelivery({
    origin: 'https://texasdefined.com',
    slugs: ['not-webp'],
    fetcher: async () => new Response('<html>error</html>', { headers: { 'content-type': 'text/html' } }),
    attempts: 1,
  });
  assert.match(result.failures[0].reason, /content-type/);
});

test('fail nonempty image type with corrupt payload', async () => {
  const result = await verifyGovernedDiscoverDelivery({
    origin: 'https://texasdefined.com',
    slugs: ['bad-payload'],
    fetcher: async () => new Response('fake', { headers: { 'content-type': 'image/webp' } }),
    attempts: 1,
  });
  assert.match(result.failures[0].reason, /invalid or empty WebP/);
});
