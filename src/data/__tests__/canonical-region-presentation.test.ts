import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { CANONICAL_PRIMARY_REGION_IDS } from "../canonical-geography.ts";
import { CANONICAL_REGION_PATHS, CANONICAL_REGION_PRESENTATIONS } from "../canonical-region-presentation.ts";
import { TEXAS_PLACE_GEOGRAPHY } from "../geography-knowledge-graph.ts";

const hubRoute = readFileSync(new URL("../../routes/regions.tsx", import.meta.url), "utf8");
const detailRoute = readFileSync(new URL("../../routes/regions.$region.tsx", import.meta.url), "utf8");
const exploreRoute = readFileSync(new URL("../../routes/explore.index.lazy.tsx", import.meta.url), "utf8");
const sitemapRoute = readFileSync(new URL("../../routes/sitemap[.]xml.ts", import.meta.url), "utf8");
const presentationSource = readFileSync(new URL("../canonical-region-presentation.ts", import.meta.url), "utf8");

test("canonical region presentation covers exactly the seven graph regions", () => {
  assert.deepEqual(CANONICAL_REGION_PRESENTATIONS.map((item) => item.id), [...CANONICAL_PRIMARY_REGION_IDS]);
  assert.equal(new Set(CANONICAL_REGION_PRESENTATIONS.map((item) => item.id)).size, 7);
  assert.deepEqual(CANONICAL_REGION_PATHS, CANONICAL_PRIMARY_REGION_IDS.map((id) => `/regions/${id}`));

  for (const item of CANONICAL_REGION_PRESENTATIONS) {
    assert.ok(item.summary.length >= 100, `${item.id} summary is too thin`);
    assert.ok(item.mapContext.length >= 120, `${item.id} map context is too thin`);
    assert.ok(item.identity.length >= 120, `${item.id} identity is too thin`);
    assert.ok(item.travelLens.length >= 100, `${item.id} travel lens is too thin`);
    assert.ok(item.relocationLens.length >= 120, `${item.id} relocation lens is too thin`);
    assert.ok(item.signatures.length >= 4, `${item.id} needs multiple presentation signals`);
    assert.ok(TEXAS_PLACE_GEOGRAPHY.some((place) => place.primaryRegionId === item.id), `${item.id} must resolve populated graph places`);
  }
});

test("canonical landing routes reuse the graph instead of creating a second geography database", () => {
  assert.match(hubRoute, /createFileRoute\("\/regions"\)/);
  assert.match(detailRoute, /createFileRoute\("\/regions\/\$region"\)/);
  assert.match(detailRoute, /withCanonicalDestinationGeography/);
  assert.match(detailRoute, /TEXAS_PLACE_GEOGRAPHY/);
  assert.match(detailRoute, /canonicalPrimaryRegion/);
  assert.match(detailRoute, /canonicalRegionPresentation/);
  assert.match(detailRoute, /region\.travelRegionIds/);
  assert.match(detailRoute, /region\.adjacentRegionIds/);
  assert.doesNotMatch(presentationSource, /export const CANONICAL_PRIMARY_REGIONS\s*=/);
});

test("canonical region discovery is indexable and cross-linked without retiring travel routes", () => {
  assert.match(sitemapRoute, /CANONICAL_REGION_PATHS/);
  assert.match(sitemapRoute, /path: "\/regions"/);
  assert.match(sitemapRoute, /\.\.\.CANONICAL_REGION_PATHS\.map/);
  assert.match(exploreRoute, /to="\/regions"/);
  assert.match(exploreRoute, /Legacy|legacy|travel regions|Travel regions/);
  assert.match(exploreRoute, /to="\/explore\/region\/\$region"/);
  assert.match(detailRoute, /canonicalLink\(texasDefinedBrand, canonicalPath\)/);
  assert.match(detailRoute, /BreadcrumbList/);
  assert.match(detailRoute, /Statewide region navigation/);
});
