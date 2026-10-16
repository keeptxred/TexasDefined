import assert from "node:assert/strict";
import { test } from "node:test";
import { countyNames, countySlug } from "../metro-county-links.ts";
import { viatorMarketsForPlace } from "../viator-market-match.ts";

test("multi-county refuge descriptions cannot create a fictional county URL", () => {
  const counties = countyNames("Cameron, Hidalgo, Starr and Willacy counties");
  assert.deepEqual(counties, ["Cameron", "Hidalgo", "Starr", "Willacy"]);
  assert.deepEqual(counties.map(countySlug), ["cameron", "hidalgo", "starr", "willacy"]);
  assert.equal(countySlug("Cameron, Hidalgo, Starr and Willacy counties"), null);
  assert.equal(countySlug("fictional"), null);
  assert.equal(countySlug("DeWitt County"), "dewitt");
});
test("the city of Alamo matches the Valley, not San Antonio", () => {
  assert.deepEqual(viatorMarketsForPlace("Alamo").map((m) => m.slug), ["rio-grande-valley"]);
  assert.deepEqual(viatorMarketsForPlace("The Alamo").map((m) => m.slug), ["san-antonio"]);
});
