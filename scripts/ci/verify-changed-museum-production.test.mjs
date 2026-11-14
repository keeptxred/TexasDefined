import test from "node:test";
import assert from "node:assert/strict";
import { isMuseumProductionChange } from "./verify-changed-museum-production.mjs";

test("museum destination/catalog/template/photo sources trigger complete postdeploy acceptance", () => {
  for (const path of [
    "public/museum-verification-manifest.json",
    "src/data/museum-visitor-faqs.ts",
    "src/data/museum-authority-network.ts",
    "src/data/museum-authority-heroes.ts",
    "src/data/museum-expansion-statewide-wave2.ts",
    "src/data/destination-query-runtime.ts",
    "src/routes/destination.$slug.tsx",
    "src/lib/commons-hero-attribution.ts",
    "scripts/ci/verify-museum-production.mjs",
  ]) {
    assert.equal(isMuseumProductionChange([path]), true, path);
  }
});
test("unrelated pages and the editorial-only museum execution ledger do not create unnecessary HTTP crawls", () => {
  for (const path of ["src/data/tax-calculator.ts", "src/routes/football.tsx", "docs/museums/STATEWIDE_IMPLEMENTATION_LEDGER_20261013.json", "src/data/museum-owner-inventory-parser.mjs"]) {
    assert.equal(isMuseumProductionChange([path]), false, path);
  }
});
test("the change plan must contain a real path list", () => {
  assert.throws(() => isMuseumProductionChange(undefined));
  assert.throws(() => isMuseumProductionChange({}));
});
