import assert from "node:assert/strict";
import { test } from "node:test";

import {
  BOUNDARY_CITY_GEOGRAPHY,
  CANONICAL_GEOGRAPHY_VALIDATION_ERRORS,
  CANONICAL_PRIMARY_REGION_IDS,
  CANONICAL_PRIMARY_REGIONS,
  assertCanonicalPrimaryRegionId,
  boundaryCityGeography,
  validateCanonicalGeography,
} from "../canonical-geography.ts";
import { TEXAS_REGION_DEFINITIONS } from "../texas-regions.ts";

const expectedCanonicalPrimaryRegionIds = [
  "north-texas",
  "central-texas",
  "east-texas",
  "south-texas",
  "west-texas",
  "gulf-coast",
  "panhandle",
];

const expectedLegacyExplorePaths = [
  "/explore/region/big-bend",
  "/explore/region/gulf-coast",
  "/explore/region/hill-country",
  "/explore/region/panhandle",
  "/explore/region/piney-woods",
  "/explore/region/prairies-lakes",
  "/explore/region/south-texas",
];

test("canonical geography exposes exactly the seven approved broad primary regions", () => {
  assert.deepEqual([...CANONICAL_PRIMARY_REGION_IDS], expectedCanonicalPrimaryRegionIds);
  assert.deepEqual(CANONICAL_PRIMARY_REGIONS.map((region) => region.id), expectedCanonicalPrimaryRegionIds);
  assert.equal(new Set(CANONICAL_PRIMARY_REGIONS.map((region) => region.id)).size, 7);
});

test("canonical geography registry passes relationship integrity validation", () => {
  assert.deepEqual(validateCanonicalGeography(), []);
  assert.deepEqual(CANONICAL_GEOGRAPHY_VALIDATION_ERRORS, []);
});

test("arbitrary broad region names are rejected", () => {
  assert.doesNotThrow(() => assertCanonicalPrimaryRegionId("central-texas"));
  assert.throws(() => assertCanonicalPrimaryRegionId("texas-triangle"), /Unknown canonical primary region/);
  assert.throws(() => assertCanonicalPrimaryRegionId("hill-country"), /Unknown canonical primary region/);
});

test("legacy public Explore region URLs remain unchanged", () => {
  assert.deepEqual(
    TEXAS_REGION_DEFINITIONS.map((region) => `/explore/region/${region.id}`),
    expectedLegacyExplorePaths,
  );
});

test("Austin is Central Texas primary with Hill Country gateway context", () => {
  const austin = boundaryCityGeography("austin");
  assert.ok(austin);
  assert.equal(austin.primaryRegionId, "central-texas");
  assert.equal(austin.metroId, "austin");
  assert.deepEqual(austin.subregionIds, ["austin-area"]);
  assert.deepEqual(austin.gatewaySubregionIds, ["texas-hill-country"]);
  assert.deepEqual(austin.travelRegionIds, ["hill-country"]);
});

test("San Antonio is South Texas primary with Central Texas adjacency and Hill Country gateway context", () => {
  const sanAntonio = boundaryCityGeography("san-antonio");
  assert.ok(sanAntonio);
  assert.equal(sanAntonio.primaryRegionId, "south-texas");
  assert.equal(sanAntonio.metroId, "san-antonio");
  assert.deepEqual(sanAntonio.subregionIds, ["san-antonio-area"]);
  assert.deepEqual(sanAntonio.gatewaySubregionIds, ["texas-hill-country"]);
  assert.deepEqual(sanAntonio.adjacentRegionIds, ["central-texas"]);
  assert.deepEqual(sanAntonio.relocationPresentationLabels, ["San Antonio & Hill Country"]);
});

test("boundary registry is intentionally explicit and duplicate-free", () => {
  assert.deepEqual(BOUNDARY_CITY_GEOGRAPHY.map((city) => city.citySlug), ["austin", "san-antonio"]);
  assert.equal(new Set(BOUNDARY_CITY_GEOGRAPHY.map((city) => city.citySlug)).size, BOUNDARY_CITY_GEOGRAPHY.length);
});
