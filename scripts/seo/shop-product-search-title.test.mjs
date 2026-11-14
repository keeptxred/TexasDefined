import { test } from "node:test";
import assert from "node:assert/strict";
import { shopProductSearchName } from "../../src/lib/shop-product-search-title.ts";

test("removes storefront keyword lists while retaining the distinctive product", () => {
  assert.equal(shopProductSearchName(
    "Welcome to TX Shirt, Texas Gulf Coast T-Shirt, Roseate Spoonbill Tee, Texas Bird Shirt, Coastal Texas Gift"
  ), "Welcome to TX Shirt");
  assert.equal(shopProductSearchName(
    "Texas Spoonbill Tote Bag, Gulf Coast Bird Gift, Coastal Wildlife Canvas Tote"
  ), "Texas Spoonbill Tote Bag");
  assert.equal(shopProductSearchName(
    "Fright Farm Halloween Tractor Shirt, Skeleton Farmer Tee, Vintage Pumpkin Patch Shirt, Spooky Fall Graphic Tee"
  ), "Fright Farm Halloween Tractor Shirt");
});

test("retains legitimate product names when no keyword list is present", () => {
  assert.equal(shopProductSearchName("Bluebonnet Canvas Tote Bag"), "Bluebonnet Canvas Tote Bag");
  assert.equal(shopProductSearchName("  Big Bend   Sunset  Poster  "), "Big Bend Sunset Poster");
});

test("prevents duplicate brand and permits a safe no-product fallback", () => {
  assert.equal(shopProductSearchName("Texas Lake Shirt | Texas Defined Shop"), "Texas Lake Shirt");
  assert.equal(shopProductSearchName("Lake Shirt — Texas Defined"), "Lake Shirt");
  assert.equal(shopProductSearchName(""), "Texas Shop Product");
  assert.equal(shopProductSearchName(null), "Texas Shop Product");
});

test("keeps a longer unique core for governed truncation instead of blindly cropping it in the helper", () => {
  const core = "Extremely Detailed Texas Gulf Coast Bird and Saltwater Wildlife Illustration Shirt";
  assert.equal(shopProductSearchName(core + ", Coastal Texas Gift"), core);
  assert.ok(core.length > 68);
});
