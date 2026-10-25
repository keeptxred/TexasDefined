/**
 * Read-only production smoke for the six approved fishing shirts.
 * No seller API writes, shopping-cart actions, checkout calls or fulfillment.
 *
 * Run: node scripts/production/verify-fishing-shirts-release.mjs
 * Optional: TEXASDEFINED_ORIGIN=https://... node ...
 */
import assert from 'node:assert/strict';

const origin = (process.env.TEXASDEFINED_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const ids = [
  '6add2977878131e6ba0c3b39',
  '6add29fdafea5e4b0809386a',
  '6add29cfafea5e4b0809383b',
  '6add29d86437b9edf205a8bb',
  '6add29de2f0d45364d02c4a6',
  '6add29e5c8a72b0cae01896a',
];
const results = [];

async function get(path, { expectJSON = false } = {}) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const url = new URL(path, origin);
      const response = await fetch(url, {
        headers: { accept: expectJSON ? 'application/json' : 'text/html', 'user-agent': 'TexasDefined-FishingShirts-QA/1.0' },
        redirect: 'follow',
        signal: AbortSignal.timeout(20000),
      });
      const text = await response.text();
      if (response.status >= 500 && attempt < 3) {
        lastError = new Error(`${url.pathname}: HTTP ${response.status}`);
        await new Promise(resolve => setTimeout(resolve, attempt * 1000));
        continue;
      }
      return { response, text, url: response.url };
    } catch (error) {
      lastError = error;
      if (attempt < 3) await new Promise(resolve => setTimeout(resolve, attempt * 1000));
    }
  }
  throw lastError;
}

async function verify(name, fn) {
  try {
    const value = await fn();
    results.push({ name, result: 'PASS', ...value });
    console.log(`PASS ${name} ${JSON.stringify(value)}`);
  } catch (error) {
    results.push({ name, result: 'FAIL', message: String(error) });
    console.error(`FAIL ${name}: ${String(error)}`);
    process.exitCode = 1;
  }
}

await verify('Live collection JSON contains exactly six approved fishing products', async () => {
  const { response, text } = await get('/api/public/store-products?site=texasdefined&collection=fishing-shirts&limit=24', { expectJSON: true });
  assert.equal(response.status, 200, `Collection API HTTP ${response.status}; body excerpt: ${text.slice(0,150)}`);
  const payload = JSON.parse(text);
  assert.equal(payload.ok, true, `Collection API not okay: ${text.slice(0,220)}`);
  const products = payload.products || [];
  const actual = products.map(p => p.id);
  assert.equal(products.length, 6, `Expected six collection products, got ${products.length}; IDs: ${actual}`);
  for (const id of ids) assert.ok(actual.includes(id), `Missing approved shirt ${id}`);
  for (const p of products) {
    assert.equal(Number(p.price), 28, `Incorrect price for ${p.id}`);
    assert.ok(/^https:\/\/images\.printify\.com\//.test(p.imageUrl || ''), `Missing Printify mockup for ${p.id}`);
    assert.equal(p.collections?.includes('fishing-shirts'), true, `Wrong collections for ${p.id}`);
    assert.ok(Array.isArray(p.variants) && p.variants.length === 16, `Expected 16 variants for ${p.id}`);
  }
  return { status: response.status, products: actual };
});

await verify('Collection SSR: title, six product links and non-empty products', async () => {
  const { response, text } = await get('/shop/fishing-shirts');
  assert.equal(response.status, 200, `Collection returned HTTP ${response.status}; body excerpt ${text.slice(0,200)}`);
  assert.match(text, /Texas Fishing Shirts/i);
  assert.match(text, /shop\/product\/6add2977878131e6ba0c3b39/i);
  for (const id of ids) assert.ok(text.includes(id), `Collection HTML missing ${id}`);
  assert.doesNotMatch(text, /That collection is not active/);
  return { status: response.status, containsAllSix: true, length: text.length };
});

await verify('Product detail SSR: first and last fishing shirts', async () => {
  for (const id of [ids[0], ids.at(-1)]) {
    const { response, text } = await get(`/shop/product/${id}`);
    assert.equal(response.status, 200, `Product ${id} HTTP ${response.status}`);
    assert.ok(text.includes(id), `Missing ID in HTML for ${id}`);
    assert.match(text, /Fishing Shirts/i);
  }
  return { checked: 2, status: 200 };
});

await verify('Fishing hub and Lake Conroe have crawlable collection links', async () => {
  for (const path of ['/fishing', '/fishing/lakes/lake-conroe', '/fishing/species/largemouth-bass']) {
    const { response, text } = await get(path);
    assert.equal(response.status, 200, `${path} HTTP ${response.status}`);
    assert.ok(text.includes('href="/shop/fishing-shirts"'), `${path} lacks static collection anchor`);
  }
  return { routes: ['/fishing', '/fishing/lakes/lake-conroe', '/fishing/species/largemouth-bass'] };
});

console.log('\nFishing Shirts production verification:', JSON.stringify({
  origin, checks: results, passed: results.filter(r => r.result === 'PASS').length,
  failed: results.filter(r => r.result === 'FAIL').length,
  noPurchasesMade: true, noEtsyWritesMade: true,
}, null, 2));
