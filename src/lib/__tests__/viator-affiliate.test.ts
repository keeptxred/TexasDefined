import assert from "node:assert/strict";
import { test } from "node:test";

import { buildViatorAffiliateUrl } from "../viator-affiliate.ts";

test("approved TexasDefined Viator attribution defaults and campaign are applied", () => {
  const url = new URL(buildViatorAffiliateUrl("https://www.viator.com/Texas/d296", "texasdefined-test"));

  assert.equal(url.hostname, "www.viator.com");
  assert.equal(url.searchParams.get("pid"), "P00318227");
  assert.equal(url.searchParams.get("mcid"), "42383");
  assert.equal(url.searchParams.get("campaign"), "texasdefined-test");
});

test("existing Viator tracking values are preserved without duplication", () => {
  const url = new URL(buildViatorAffiliateUrl("https://www.viator.com/Austin/d5021?pid=existing&mcid=existing-mcid&campaign=existing-campaign", "new-campaign"));

  assert.deepEqual(url.searchParams.getAll("pid"), ["existing"]);
  assert.deepEqual(url.searchParams.getAll("mcid"), ["existing-mcid"]);
  assert.deepEqual(url.searchParams.getAll("campaign"), ["existing-campaign"]);
});

test("untrusted outbound targets fail closed to Viator", () => {
  const url = new URL(buildViatorAffiliateUrl("https://example.com/not-viator", "texasdefined-safe-fallback"));

  assert.equal(url.origin, "https://www.viator.com");
  assert.equal(url.searchParams.get("pid"), "P00318227");
  assert.equal(url.searchParams.get("mcid"), "42383");
});
