import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || '/tmp/texasdefined-shop-qa/node_modules/playwright-core');
const origin = 'https://texasdefined.com';
const backend = 'https://keeptxred.com';
const productId = '6a7638ef507e58bbda08edf2';
const results = [];
const artifactDir = 'artifacts/shop-checkout-browser';
await mkdir(artifactDir, { recursive: true });

// The Checkout destination and payment are deliberately mocked. The test NEVER
// creates a live Stripe session, submits card data, or requests Printify fulfillment.
const mockCheckoutURL = 'https://checkout.stripe.com/c/pay/cs_test_texasdefined_browser_qa';
const mockSessionId = 'cs_test_texasdefined_browser_qa';
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROME_BIN ? { executablePath: process.env.CHROME_BIN } : {}),
  args: ['--no-sandbox'],
});

async function verifyBackendPreflight() {
  const context = await browser.newContext();
  try {
    const headers = {
      'origin': origin,
      'access-control-request-method': 'POST',
      'access-control-request-headers': 'content-type',
    };
    const preflight = await context.request.fetch(backend + '/api/public/texasdefined-checkout', {
      method: 'OPTIONS', headers, timeout: 30000,
    });
    assert.equal(preflight.status(), 204, 'Checkout CORS preflight must respond 204');
    assert.equal(preflight.headers()['access-control-allow-origin'], origin,
      'Checkout must allow Texas Defined production origin');
    assert.match(preflight.headers()['access-control-allow-methods'] || '', /POST/);
    const invalidSession = await context.request.fetch(
      backend + '/api/public/texasdefined-checkout?session_id=not-a-stripe-session',
      { method: 'GET', headers: { origin }, timeout: 30000 }
    );
    assert.equal(invalidSession.status(), 400, 'Invalid session should be rejected without Stripe request');
    return { preflight: preflight.status(), invalidSession: invalidSession.status() };
  } finally {
    await context.close();
  }
}

async function verifyViewport(name, viewport, invalidDestination = false) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const row = { name, viewport, checks: {}, pageErrors: [], observed: {} };
  results.push(row);
  let checkoutPayload;
  let intercepted = 0;
  page.on('pageerror', e => row.pageErrors.push(e.message));
  await context.route('**/api/analytics**', route =>
    route.fulfill({ status: 202, contentType: 'application/json', body: '{"accepted":1}' }));
  await context.route('**/api/public/texasdefined-checkout', async route => {
    if (route.request().method() === 'OPTIONS') {
      return route.fulfill({
        status: 204,
        headers: {
          'access-control-allow-origin': origin,
          'access-control-allow-methods': 'GET, POST, OPTIONS',
          'access-control-allow-headers': 'content-type',
        },
      });
    }
    intercepted += 1;
    checkoutPayload = route.request().postDataJSON();
    return route.fulfill({
      status: 200,
      headers: { 'access-control-allow-origin': origin, 'content-type': 'application/json' },
      body: JSON.stringify({
        ok: true, sessionId: mockSessionId,
        url: invalidDestination ? 'https://example.com/not-stripe' : mockCheckoutURL,
      }),
    });
  });
  await context.route('https://checkout.stripe.com/**', route => route.fulfill({
    status: 200, contentType: 'text/html',
    body: '<!doctype html><html><title>QA Stripe landing</title><body><h1>QA Stripe landing reached; no payment attempted</h1></body></html>',
  }));
  try {
    const response = await page.goto(origin + '/shop/product/' + productId, {
      waitUntil: 'domcontentloaded', timeout: 60000,
    });
    assert.equal(response?.status(), 200, 'Product page must return HTTP 200');
    row.checks.productHTTP = true;

    await page.getByRole('button', { name: /^add to bag$/i }).waitFor({
      state: 'visible', timeout: 25000,
    });
    await page.waitForFunction(
      () => document.documentElement.dataset.tdRootHydrated === '1',
      null, { timeout: 30000 }
    );
    await page.getByRole('button', { name: /^add to bag$/i }).click();
    await page.getByRole('link', { name: /view bag/i }).waitFor({
      state: 'visible', timeout: 15000,
    });
    row.checks.productToCart = true;
    row.observed.productImage = await page.locator('main img').first().evaluate(img => ({
      loaded: img.complete && img.naturalWidth > 0,
      srcHost: new URL(img.currentSrc || img.src).hostname,
    })).catch(() => ({ loaded: false, srcHost: '' }));
    await page.getByRole('link', { name: /view bag/i }).click();
    await page.getByRole('heading', { name: 'Your bag' }).waitFor({
      state: 'visible', timeout: 15000,
    });
    row.checks.cartDisplayed = true;
    assert.equal(await page.getByText('Standard U.S. shipping', { exact: true }).count(), 1);
    assert.match(await page.locator('aside').innerText(), /\$6\.99/);
    row.checks.shippingVisible = true;
    row.observed.cartSummary = (await page.locator('aside').innerText()).slice(0, 500);
    await page.screenshot({ path: artifactDir + '/' + name + '-cart.png', fullPage: false });
    await page.getByRole('button', { name: /secure checkout/i }).click();
    if (invalidDestination) {
      await page.getByRole('alert').getByText(/Unexpected checkout destination/).waitFor({
        state: 'visible', timeout: 15000,
      });
      row.checks.invalidDestinationRejected = true;
    } else {
      await page.waitForURL('https://checkout.stripe.com/**', { timeout: 15000 });
      assert.equal(await page.locator('h1').textContent(),
        'QA Stripe landing reached; no payment attempted');
      row.checks.stripeRedirect = true;
    }
    assert.equal(intercepted, 1, 'Exactly one checkout submission must occur');
    assert.equal(checkoutPayload.items?.[0]?.productId, productId);
    assert.equal(checkoutPayload.items?.[0]?.quantity, 1);
    assert.equal(typeof checkoutPayload.items?.[0]?.variantId, 'number');
    assert.match(checkoutPayload.attemptId, /^[0-9a-f]{8}-[0-9a-f-]{27,}$/i);
    row.checks.payloadCorrelated = true;
    row.observed.requestItems = checkoutPayload.items.length;
    row.observed.checkoutDestination = invalidDestination ? 'rejected' : 'mocked Stripe landing';
    assert.equal(row.pageErrors.length, 0, 'Browser JavaScript errors: ' + row.pageErrors.join(' | '));
    return row;
  } catch (error) {
    row.error = String(error);
    throw error;
  } finally {
    await context.close();
  }
}

try {
  const preflight = await verifyBackendPreflight();
  console.log('Production checkout CORS checks:', JSON.stringify(preflight));
  await verifyViewport('mobile', { width: 390, height: 844 });
  await verifyViewport('desktop', { width: 1440, height: 900 });
  await verifyViewport('reject-unsafe-destination', { width: 390, height: 844 }, true);
} catch (error) {
  console.error('Production checkout browser smoke failed:', error);
  process.exitCode = 1;
} finally {
  await browser.close();
  await writeFile(artifactDir + '/results.json', JSON.stringify({
    checkoutMocked: true,
    liveStripeChargeMade: false,
    liveStripeSessionCreated: false,
    printifyFulfillmentTriggered: false,
    results,
  }, null, 2));
}
if (!process.exitCode) console.log('Checkout browser smoke PASSED: real product/cart UI, production CORS, safe redirect; no payment attempted.');
