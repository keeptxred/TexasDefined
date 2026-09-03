import assert from "node:assert/strict";
import { test } from "node:test";

import {
  VERIFIED_VIATOR_TEXAS_DESTINATION_URLS,
  hasVerifiedViatorMarketUrl,
  verifiedViatorMarketUrl,
  viatorTexasUrl,
} from "../viator-destination-links.ts";
import { VIATOR_TEXAS_MARKETS } from "../viator-experiences.ts";

test("statewide Viator fallback is the verified Texas destination page", () => {
  assert.equal(viatorTexasUrl(), "https://www.viator.com/Texas/d296");
});

test("verified destination targets are secure Viator URLs", () => {
  for (const [slug, target] of Object.entries(VERIFIED_VIATOR_TEXAS_DESTINATION_URLS)) {
    const url = new URL(target);
    assert.equal(url.protocol, "https:", `${slug} must use HTTPS`);
    assert.equal(url.hostname, "www.viator.com", `${slug} must stay on Viator`);
    assert.ok(VIATOR_TEXAS_MARKETS.some((market) => market.slug === slug), `${slug} must map to a TexasDefined experience market`);
  }
});

test("unverified market inventory safely falls back to statewide Texas instead of an invented search URL", () => {
  assert.equal(hasVerifiedViatorMarketUrl("big-bend-terlingua"), false);
  assert.equal(verifiedViatorMarketUrl("big-bend-terlingua"), viatorTexasUrl());
});

test("declared verified destination URLs remain usable even before they move into the verified registry", () => {
  const declared = "https://www.viator.com/Austin/d5021";
  assert.equal(hasVerifiedViatorMarketUrl("future-market", declared), true);
  assert.equal(verifiedViatorMarketUrl("future-market", declared), declared);
});
