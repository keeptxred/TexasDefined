import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { HBG_RECYCLES_2026, isHoustonBotanicRecyclingOfferActive } from "./houston-botanic-recycles.ts";
import { applyHashedModuleDocumentCachePolicy } from "./hashed-asset-document-cache-policy.ts";

test("Texas Recycles offer is active only Nov. 13–15, 2026 in Houston local time", () => {
  assert.equal(isHoustonBotanicRecyclingOfferActive(Date.parse("2026-11-13T14:59:59.999Z")), false);
  assert.equal(isHoustonBotanicRecyclingOfferActive(Date.parse(HBG_RECYCLES_2026.startsAt)), true);
  assert.equal(isHoustonBotanicRecyclingOfferActive(Date.parse("2026-11-14T18:00:00Z")), true);
  assert.equal(isHoustonBotanicRecyclingOfferActive(Date.parse("2026-11-15T22:59:59.999Z")), true);
  assert.equal(isHoustonBotanicRecyclingOfferActive(Date.parse("2026-11-15T23:00:00.000Z")), false);
  assert.equal(isHoustonBotanicRecyclingOfferActive(Date.parse("2026-11-16T05:59:59.999Z")), false);
  assert.equal(isHoustonBotanicRecyclingOfferActive(Date.parse(HBG_RECYCLES_2026.expiresAt)), false);
  assert.equal(isHoustonBotanicRecyclingOfferActive(Date.parse("2027-11-14T12:00:00Z")), false);
  assert.equal(isHoustonBotanicRecyclingOfferActive(Number.NaN), false);
});

test("Offer wording is exact, source-linked, and separate from evergreen tickets", () => {
  const route = readFileSync("src/routes/destination.$slug.tsx", "utf8");
  const catalog = readFileSync("src/data/reviewed-attraction-authorities.ts", "utf8");
  assert.match(route, /isHoustonBotanicRecyclingOfferActive\(\)/);
  assert.match(route, /one plastic bag or bottle/);
  assert.match(route, /per person/);
  assert.match(route, /ticket window/);
  assert.match(route, /daytime general admission/);
  assert.match(route, /https:\/\/hbg\.org\/visit\/texas-recycles\//);
  // The opening essay intentionally no longer duplicates prices; check the
  // canonical primary-source visitor fact instead of matching editorial prose.
  const marker = "export const reviewedAttractionDestinations: Destination[] = ";
  const rows = JSON.parse(catalog.split(marker)[1].trim().replace(/;\s*$/, ""));
  const garden = rows.find((item) => item.slug === "houston-botanic-garden");
  assert.ok(garden, "Houston Botanic Garden authority record must remain published");
  const admission = garden.visitorFacts.find((fact) => fact.topic === "admission");
  assert.equal(admission.sourceUrl, "https://hbg.org/visit/");
  assert.match(admission.detail, /adults \$12/);
  assert.match(admission.detail, /ages 3–17 \$8/);
  assert.match(admission.detail, /under 3 free but all ages require a ticket or member reservation/);
  assert.match(catalog, /New Year's Day/);
  assert.match(catalog, /its About page also lists New Year's Day/);
  assert.match(catalog, /published holiday lists differ/);
  assert.match(route, /The Visit page lists Thanksgiving and Christmas closures; the About page also lists New Year's Day/);
  assert.doesNotMatch(catalog, /Both the official Visit page and About page list Thanksgiving Day, Christmas Day and New Year's Day closures/);
  assert.doesNotMatch(route, /according to both current operator pages/);
});

test("Garden canonical HTML is never cached across offer expiration", () => {
  const request = new Request("https://texasdefined.com/destination/houston-botanic-garden");
  const html = new Response("<html>ticket</html>", {
    status: 200,
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, s-maxage=86400" },
  });
  const result = applyHashedModuleDocumentCachePolicy(request, html);
  assert.equal(result.headers.get("cache-control"), "no-store, max-age=0");
  assert.equal(result.headers.get("cloudflare-cdn-cache-control"), "no-store");
  assert.equal(result.headers.get("cdn-cache-control"), "no-store");
});
