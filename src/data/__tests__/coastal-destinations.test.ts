import assert from "node:assert/strict";
import { after, describe, it } from "node:test";
import { createServer } from "vite";

const EXPECTED_COUNT = 52;
const vite = await createServer({
  appType: "custom",
  configFile: false,
  logLevel: "error",
  server: { middlewareMode: true },
});

const ssrRunner = vite.environments.ssr.runner;
assert.ok(ssrRunner, "Vite native SSR environment must expose a module runner for the coastal audit.");
const [destinationModule, researchModule, auditModule, availabilityModule] = await Promise.all([
  ssrRunner.import("/src/data/coastal-destinations.ts"),
  ssrRunner.import("/src/data/coastal-places.ts"),
  ssrRunner.import("/src/data/destination-audit.ts"),
  ssrRunner.import("/src/data/destination-availability.ts"),
]);

const { coastalDestinations, COASTAL_COORDINATES, COASTAL_COORDINATE_SOURCES } = destinationModule;
const { coastalPlaces } = researchModule;
const { auditDestination } = auditModule;
const { isPrimaryTripPlannerDestination } = availabilityModule;

after(async () => {
  await vite.close();
});

describe("Texas beaches and coast destination authority", () => {
  it("promotes every researched coast record into one unique destination", () => {
    assert.equal(coastalPlaces.length, EXPECTED_COUNT);
    assert.equal(coastalDestinations.length, EXPECTED_COUNT);
    assert.equal(new Set(coastalDestinations.map((destination: { slug: string }) => destination.slug)).size, EXPECTED_COUNT);
  });

  it("keeps verified coordinate evidence for every raw coastal record", () => {
    for (const place of coastalPlaces as Array<{ slug: string }>) {
      const coordinates = COASTAL_COORDINATES[place.slug];
      assert.ok(coordinates, place.slug);
      assert.ok(coordinates.lat >= 25 && coordinates.lat <= 37, `${place.slug} latitude ${coordinates.lat}`);
      assert.ok(coordinates.lng >= -107 && coordinates.lng <= -93, `${place.slug} longitude ${coordinates.lng}`);
      assert.match(COASTAL_COORDINATE_SOURCES[place.slug] ?? "", /^https:\/\//, `${place.slug} coordinate source`);
    }
  });

  it("meets the existing destination indexing audit for all 52 researched profiles", () => {
    for (const destination of coastalDestinations) {
      const audit = auditDestination(destination);
      assert.equal(
        audit.readyForIndexing,
        true,
        `${destination.slug}: ${audit.issues.map((issue: { code: string; message: string }) => `${issue.code}: ${issue.message}`).join(" | ")}`,
      );
      assert.ok(destination.body.length >= 3, `${destination.slug} body paragraph count`);
      assert.ok(destination.body.join(" ").length >= 450, `${destination.slug} body depth`);
      assert.ok(destination.hero.credit, `${destination.slug} image credit`);
      assert.match(destination.officialUrl ?? "", /^https:\/\//, `${destination.slug} official source`);
      assert.equal(destination.sourceCheckedAt, "2026-09-06");
    }
  });

  it("uses location-specific rights-cleared imagery instead of a shared generic coast photo", () => {
    const heroSources = coastalDestinations.map((destination: { hero: { src: string } }) => destination.hero.src);
    assert.equal(new Set(heroSources).size, EXPECTED_COUNT);
    for (const destination of coastalDestinations) {
      assert.ok(!destination.hero.src.includes("placeholder"), `${destination.slug} placeholder hero`);
      assert.ok(destination.hero.alt.length >= 20, `${destination.slug} descriptive alt text`);
      assert.match(destination.hero.credit ?? "", /Public domain|CC BY/i, `${destination.slug} rights credit`);
    }
  });

  it("keeps Porretto researched but out of primary Trip Planner/index publication while access is uncertain", () => {
    const porretto = coastalDestinations.find((destination: { slug: string }) => destination.slug === "porretto-beach");
    assert.ok(porretto);
    assert.equal(isPrimaryTripPlannerDestination(porretto), false);
    for (const destination of coastalDestinations.filter((item: { slug: string }) => item.slug !== "porretto-beach")) {
      assert.equal(isPrimaryTripPlannerDestination(destination), true, destination.slug);
    }
  });
});
