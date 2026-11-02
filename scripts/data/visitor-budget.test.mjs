import test from "node:test";
import assert from "node:assert/strict";
import { estimateVisitorBudget } from "../../src/data/authority/visitor-budget.ts";

const offers = [
  { id: "a", priceUsd: 30, maxParty: 6 },
  { id: "b", priceUsd: 45, maxParty: 4 },
  { id: "c", priceUsd: 20, maxParty: null },
];
test("multi-operator estimate sums selected source prices once", () => {
  const value = estimateVisitorBudget(offers, ["a", "a", "b"], 2, { lodging: 200, food: 50, transport: 70 });
  assert.equal(value.tastingEstimate, 150);
  assert.equal(value.total, 470);
  assert.equal(value.perGuest, 235);
  assert.deepEqual(value.eligibleOffers.map((offer) => offer.id), ["a", "b"]);
});
test("published group limit excludes unpriceable tastings, never pretends they are free", () => {
  const value = estimateVisitorBudget(offers, ["a", "b", "c"], 5, { lodging: 0, food: 0, transport: 0 });
  assert.deepEqual(value.ineligibleOffers.map((offer) => offer.id), ["b"]);
  assert.equal(value.tastingEstimate, 250);
});
test("unknown capacities remain explicit and invalid allowances never reduce the quote", () => {
  const value = estimateVisitorBudget(offers, ["c"], 0, { lodging: -2, food: Number.NaN, transport: 15 });
  assert.equal(value.total, 35);
  assert.equal(value.perGuest, 35);
});
