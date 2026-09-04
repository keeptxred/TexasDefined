import assert from "node:assert/strict";
import { test } from "node:test";

import { VIATOR_EXPERIENCE_CATEGORIES, VIATOR_TEXAS_MARKETS, getViatorMarket } from "../viator-experiences.ts";

test("Viator Texas catalog covers the major statewide travel markets", () => {
  assert.ok(VIATOR_TEXAS_MARKETS.length >= 20);
  for (const slug of ["austin", "san-antonio", "dallas", "fort-worth", "houston", "galveston", "fredericksburg", "corpus-christi", "south-padre-island", "big-bend-terlingua", "el-paso", "amarillo-palo-duro"]) {
    assert.ok(getViatorMarket(slug), `Missing statewide experience market: ${slug}`);
  }
});

test("market and category identifiers remain unique", () => {
  assert.equal(new Set(VIATOR_TEXAS_MARKETS.map((market) => market.slug)).size, VIATOR_TEXAS_MARKETS.length);
  assert.equal(new Set(VIATOR_EXPERIENCE_CATEGORIES.map((category) => category.id)).size, VIATOR_EXPERIENCE_CATEGORIES.length);
});

test("every market has enough durable planning context to remain useful without a specific Viator product", () => {
  const categoryIds = new Set(VIATOR_EXPERIENCE_CATEGORIES.map((category) => category.id));
  for (const market of VIATOR_TEXAS_MARKETS) {
    assert.ok(market.summary.length >= 80, `${market.slug} summary is too thin`);
    assert.ok(market.searchQuery.length >= 12, `${market.slug} search query is too thin`);
    assert.ok(market.anchorAttractions.length >= 4, `${market.slug} needs at least four experience anchors`);
    assert.ok(market.categories.length >= 4, `${market.slug} needs at least four experience lanes`);
    assert.ok(market.categories.every((category) => categoryIds.has(category)), `${market.slug} contains an unknown experience category`);
    assert.match(market.sourceCheckedAt, /^20\d{2}-\d{2}-\d{2}$/);
  }
});

test("hard-coded destination links are limited to secure Viator URLs", () => {
  for (const market of VIATOR_TEXAS_MARKETS) {
    if (!market.viatorDestinationUrl) continue;
    const url = new URL(market.viatorDestinationUrl);
    assert.equal(url.protocol, "https:");
    assert.equal(url.hostname, "www.viator.com");
  }
});

test("nearby-market relationships resolve to real market pages", () => {
  const slugs = new Set(VIATOR_TEXAS_MARKETS.map((market) => market.slug));
  for (const market of VIATOR_TEXAS_MARKETS) {
    for (const nearby of market.nearbyMarkets ?? []) {
      assert.ok(slugs.has(nearby), `${market.slug} links to missing nearby market ${nearby}`);
      assert.notEqual(nearby, market.slug, `${market.slug} must not link to itself`);
    }
  }
});
