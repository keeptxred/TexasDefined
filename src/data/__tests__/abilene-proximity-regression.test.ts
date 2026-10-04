import assert from "node:assert/strict";
import { test } from "node:test";

import { abileneAreaDestinationFallbacks } from "../abilene-area-destinations.ts";
import { auditDestination } from "../destination-audit.ts";
import { applyDestinationHeroOverride } from "../explore-hero-reconciliation.ts";
import {
  getMetroProximityCollection,
  getMetroProximityMetro,
  selectMetroProximityDestinations,
} from "../metro-proximity.ts";
import { statewideMuseumExpansionWave2Destinations } from "../museum-expansion-statewide-wave2.ts";

const abilene = getMetroProximityMetro("abilene")!;

test("Abilene authority fallbacks clear the destination indexability audit", () => {
  for (const destination of abileneAreaDestinationFallbacks) {
    const result = auditDestination(destination);
    assert.equal(result.readyForIndexing, true, `${destination.slug}: ${result.issues.map((issue) => issue.code).join(", ")}`);
  }
});

test("The Grace Museum graduates from its placeholder hero", () => {
  const grace = statewideMuseumExpansionWave2Destinations.find((destination) => destination.slug === "grace-museum-abilene");
  assert.ok(grace);
  const resolved = applyDestinationHeroOverride(grace);
  assert.notEqual(resolved.hero.src, grace.hero.src);
  assert.equal(auditDestination(resolved).readyForIndexing, true);
});

test("Abilene proximity starts with real Abilene-area anchors instead of 40-plus-mile results", () => {
  const grace = applyDestinationHeroOverride(
    statewideMuseumExpansionWave2Destinations.find((destination) => destination.slug === "grace-museum-abilene")!,
  );
  const catalog = [...abileneAreaDestinationFallbacks, grace];
  const thingsToDo = selectMetroProximityDestinations(catalog, abilene, getMetroProximityCollection("things-to-do")!);
  const historicSites = selectMetroProximityDestinations(catalog, abilene, getMetroProximityCollection("historic-sites")!);
  const stateParks = selectMetroProximityDestinations(catalog, abilene, getMetroProximityCollection("state-parks")!);

  assert.ok(thingsToDo.length >= 5);
  assert.ok(thingsToDo[0].distanceMiles < 2, `closest result was ${thingsToDo[0].distanceMiles.toFixed(1)} miles away`);
  assert.ok(historicSites.some((row) => row.destination.slug === "frontier-texas"));
  assert.ok(historicSites.some((row) => row.destination.slug === "grace-museum-abilene"));
  assert.ok(historicSites.some((row) => row.destination.slug === "buffalo-gap-historic-village"));
  assert.ok(historicSites.some((row) => row.destination.slug === "fort-phantom-hill"));
  assert.equal(stateParks[0]?.destination.slug, "abilene-state-park");
  assert.ok(stateParks[0].distanceMiles < 20);
});
