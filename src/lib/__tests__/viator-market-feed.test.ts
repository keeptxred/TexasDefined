import assert from "node:assert/strict";
import test from "node:test";
import { VIATOR_LIVE_DESTINATION_IDS, normalizeViatorMarketProducts } from "../viator-market-feed.ts";
import { VERIFIED_VIATOR_TEXAS_DESTINATION_URLS } from "../../data/viator-destination-links.ts";

test("live market API allowlist matches only source-verified destination IDs", () => {
  assert.deepEqual(Object.keys(VIATOR_LIVE_DESTINATION_IDS).sort(), Object.keys(VERIFIED_VIATOR_TEXAS_DESTINATION_URLS).sort());
  for (const [market, url] of Object.entries(VERIFIED_VIATOR_TEXAS_DESTINATION_URLS)) {
    assert.equal(VIATOR_LIVE_DESTINATION_IDS[market], /\/d(\d+)/.exec(url)?.[1], market);
  }
});

test("normalizes supplier previews, preserves correct API affiliate URL and cover photo", () => {
  const products = normalizeViatorMarketProducts({ products: [{
    productCode: "455209P1",
    title: "  A guided walking tour of Texas history  ",
    productUrl: "https://www.viator.com/tours/Waco/A-tour/d50076-455209P1?pid=P00318227&mcid=42383&medium=api&campaign=official",
    images: [
      { isCover: false, variants: [{ url: "https://example.org/other.jpg", width: 1200 }] },
      { isCover: true, variants: [{ url: "https://example.org/cover.jpg", width: 450 }] },
    ],
    pricing: { summary: { fromPrice: 2 } },
  }] });
  assert.equal(products.length, 1);
  assert.equal(products[0].productCode, "455209P1");
  assert.equal(products[0].title, "A guided walking tour of Texas history");
  assert.equal(products[0].imageUrl, "https://example.org/cover.jpg");
  const url = new URL(products[0].url);
  assert.equal(url.searchParams.get("campaign"), "official");
  assert.equal(url.searchParams.get("medium"), "api");
  assert.equal(url.searchParams.get("pid"), "P00318227");
  assert.ok(!("pricing" in products[0]), "unverified date-specific prices must not be shown");
});

test("never modifies Viator's complete official productUrl, and rejects missing tracking", () => {
  const full = "https://www.viator.com/tours/Houston/A-tour/d5186-100P1?mcid=42383&pid=P00318227&medium=api&version=2.0&campaign=texasdefined-api-houston";
  const products = normalizeViatorMarketProducts({ products: [{
    productCode: "100P1",
    title: "Guided Houston walking tour",
    productUrl: full,
  }] });
  assert.equal(products[0].url, full);
  assert.deepEqual(normalizeViatorMarketProducts({ products: [{
    productCode: "200P1",
    title: "Untracked Houston walking tour",
    productUrl: "https://www.viator.com/tours/Houston/A-tour/d5186-200P1",
  }] }), []);
});

test("rejects other affiliate IDs, offsite redirects, commodity transfers, duplicates and invalid products", () => {
  const products = normalizeViatorMarketProducts({ products: [
    { productCode: "WRONG", title: "Something really interesting", productUrl: "https://www.viator.com/a?pid=other" },
    { productCode: "OFFSITE", title: "Something really interesting", productUrl: "https://viator.com.evil.example/tour" },
    { productCode: "RENTAL", title: "Airport transfer services", productUrl: "https://www.viator.com/a?mcid=42383&pid=P00318227&medium=api" },
    { productCode: "SAFE", title: "Verified guided tour of Dallas", productUrl: "https://www.viator.com/a?mcid=42383&pid=P00318227&medium=api" },
    { productCode: "SAFE", title: "Duplicate guided tour of Dallas", productUrl: "https://www.viator.com/b" },
    { productCode: "BAD!", title: "Invalid code product tour title", productUrl: "https://www.viator.com/c" },
  ] });
  assert.deepEqual(products.map((p) => p.productCode), ["SAFE"]);
});

test("caps to four results and fails closed on malformed API responses", () => {
  const records = Array.from({ length: 9 }, (_, i) => ({
    productCode: `TEST${i}`,
    title: `This is a guided tour number ${i}`,
    productUrl: "https://www.viator.com/tours/Texas/Example?mcid=42383&pid=P00318227&medium=api",
  }));
  assert.equal(normalizeViatorMarketProducts({ products: records }).length, 4);
  assert.throws(() => normalizeViatorMarketProducts({ bad: [] }));
});
