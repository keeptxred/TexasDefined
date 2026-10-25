import test from "node:test";
import assert from "node:assert/strict";
import { sortShopVariantsLargestFirst } from "../../src/lib/shop-variant-order.ts";

const newVariant = (id, title, color) => ({ id, title, price: 28, ...(color ? { color } : {}), is_enabled: true });

test("Texas Tackle Club: scrambled live 16 options become 3XL to S, colors A–Z", () => {
  // Real fishing-shirt shape: 1 × 3XL, 3 × 2XL, XL, L, M and S.
  const original = [
    newVariant(1, "2XL / Red"), newVariant(2, "2XL / Black"), newVariant(3, "2XL / White"),
    newVariant(4, "3XL / Red"), newVariant(5, "S / Black"), newVariant(6, "M / White"),
    newVariant(7, "M / Black"), newVariant(8, "L / Black"), newVariant(9, "XL / Black"),
    newVariant(10, "S / White"), newVariant(11, "XL / White"), newVariant(12, "M / Red"),
    newVariant(13, "XL / Red"), newVariant(14, "L / Red"), newVariant(15, "L / White"),
    newVariant(16, "S / Red"),
  ];
  const before = original.map((variant) => variant.id);
  const sorted = sortShopVariantsLargestFirst(original);
  assert.deepEqual(sorted.map((v) => v.title), [
    "3XL / Red",
    "2XL / Black", "2XL / Red", "2XL / White",
    "XL / Black", "XL / Red", "XL / White",
    "L / Black", "L / Red", "L / White",
    "M / Black", "M / Red", "M / White",
    "S / Black", "S / Red", "S / White",
  ]);
  assert.deepEqual(original.map((v) => v.id), before, "sorting must never mutate Printify payload");
  assert.equal(sorted.length, original.length);
  assert.deepEqual(new Set(sorted.map((v) => v.id)), new Set(original.map((v) => v.id)));
  assert.ok(sorted.every((v) => v.price === 28 && v.is_enabled));
});

test("descending apparel synonyms, extended plus sizes and mixed casing", () => {
  const sorted = sortShopVariantsLargestFirst([
    newVariant(1, "XS / Pink"), newVariant(2, "X-Large / Blue"),
    newVariant(3, "XXL / Black"), newVariant(4, "4XL / Blue"),
    newVariant(5, "XXXL / Red"), newVariant(6, "5XL / Blue"),
    newVariant(7, "Small / White"), newVariant(8, "2XS / Pink"),
  ]);
  // 2XS is not a supported alpha size; unknowns must preserve provider order.
  assert.deepEqual(sorted.map((v) => v.id), [1, 2, 3, 4, 5, 6, 7, 8]);
  const recognized = sortShopVariantsLargestFirst([
    newVariant(1, "XS / Pink"), newVariant(2, "X-Large / Blue"),
    newVariant(3, "XXL / Black"), newVariant(4, "4XL / Blue"),
    newVariant(5, "XXXL / Red"), newVariant(6, "5XL / Blue"),
    newVariant(7, "Small / White"),
  ]);
  assert.deepEqual(recognized.map((v) => v.id), [6, 4, 5, 3, 2, 7, 1]);
});

test("size can appear after color; explicit color field is stable tie-break", () => {
  const variants = [newVariant(1, "Black / L"), newVariant(2, "Red / XL"),
    newVariant(3, "Black / XL"), newVariant(4, "White / L")];
  assert.deepEqual(sortShopVariantsLargestFirst(variants).map((v) => v.id), [3, 2, 1, 4]);
});

test("stickers and unusual one-size merchandise keep provider ordering", () => {
  const options = [newVariant(41, "4 inch"), newVariant(42, "2 inch"), newVariant(43, "3 inch")];
  assert.deepEqual(sortShopVariantsLargestFirst(options).map((v) => v.id), [41, 42, 43]);
  assert.deepEqual(sortShopVariantsLargestFirst([]), []);
  assert.deepEqual(sortShopVariantsLargestFirst([newVariant(3, "One Size")]).map((v) => v.id), [3]);
});
