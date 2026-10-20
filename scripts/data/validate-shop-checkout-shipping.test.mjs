import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  shopShippingUsd, STANDARD_SHIPPING_PRICE_USD, FREE_SHIPPING_THRESHOLD_USD,
} from "../../src/lib/shop-shipping.ts";

test("published Merchant rate and cart quote share one policy", () => {
  assert.equal(STANDARD_SHIPPING_PRICE_USD, 6.99);
  assert.equal(FREE_SHIPPING_THRESHOLD_USD, 35.01);
  assert.equal(shopShippingUsd(5.99), 6.99);
  assert.equal(shopShippingUsd(23.99), 6.99);
  assert.equal(shopShippingUsd(35), 6.99);
  assert.equal(shopShippingUsd(35.01), 0);
  assert.equal(shopShippingUsd(52), 0);
  assert.throws(() => shopShippingUsd(Number.NaN));
  const merchant = readFileSync("src/routes/google-merchant-feed[.]xml.ts", "utf8");
  assert.match(merchant, /import \{ STANDARD_SHIPPING_PRICE_USD, FREE_SHIPPING_THRESHOLD_USD \} from "@\/lib\/shop-shipping"/);
  const cart = readFileSync("src/routes/shop.cart.lazy.tsx", "utf8");
  assert.match(cart, /shopShippingUsd\(cart.subtotal\)/);
  assert.match(cart, /Standard U\.S\. shipping/);
  const product = readFileSync("src/components/commerce/ProductDetailPage.tsx", "utf8");
  assert.match(product, /Standard U\.S\. shipping \$6\.99/);
});

test("checkout attempt is correlated with Stripe session and destination is verified", () => {
  const cart = readFileSync("src/routes/shop.cart.lazy.tsx", "utf8");
  for (const required of [
    "crypto.randomUUID()",
    "JSON.stringify({ attemptId, items:",
    "stepId: attemptId",
    "url?: string; sessionId?: string;",
    'checkoutUrl.hostname !== "checkout.stripe.com"',
    "window.location.assign(checkoutUrl.href)",
    'trackTexasDefinedOutcome("shop_checkout_failed"',
  ]) {
    assert.ok(cart.includes(required), `Checkout handoff missing: ${required}`);
  }
});
