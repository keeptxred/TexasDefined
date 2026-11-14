import assert from "node:assert/strict";
import test from "node:test";
import { isGenericLakeTechniqueSummary, selectFeaturedLakeApplications } from "../../src/data/fishing/technique-content-quality.ts";

const row = (name, summary) => ({ lake: { name }, profile: { summary, sources: [{ url: "https://tpwd.texas.gov/" + name }] } });

test("generic statewide boilerplate is recognized; distinctive lake evidence is retained", () => {
  assert.equal(isGenericLakeTechniqueSummary("Spinnerbaits is included in TPWD-backed fishing guidance for Alan Henry Reservoir"), true);
  assert.equal(isGenericLakeTechniqueSummary("Soft plastics is documented in the verified Amistad Reservoir fishery profile"), true);
  assert.equal(isGenericLakeTechniqueSummary("TPWD highlights soft plastics and jigs around flooded saltcedar, vegetation and deep structure"), false);
});

test("when distinctive lake narratives exist, do not pad with alphabetic generic records", () => {
  const rows = [
    row("Alan Henry", "Technique is included in TPWD-backed fishing guidance for Alan Henry"),
    row("Amistad", "Technique is documented in the verified Amistad profile"),
    row("Conroe", "Fish shaded docks with slow presentations in summer"),
    row("Ivie", "Fish submerged trees and saltcedar on points"),
  ];
  const selected = selectFeaturedLakeApplications(rows);
  assert.deepEqual(selected.map((x) => x.lake.name), ["Conroe", "Ivie"]);
  assert.equal(rows.length, 4, "Do not mutate underlying verified relationships");
});

test("all-generic technique still has a maximum of two verified lake links", () => {
  const rows = Array.from({ length: 15 }, (_, i) => row("Lake " + i, "Technique is included in TPWD-backed fishing guidance"));
  assert.equal(selectFeaturedLakeApplications(rows).length, 2);
});

test("cap specific examples at ten, preserving predictable rendering", () => {
  const rows = Array.from({ length: 14 }, (_, i) => row("Lake " + i, "Specific lake fish habitat guidance " + i));
  assert.equal(selectFeaturedLakeApplications(rows).length, 10);
});
