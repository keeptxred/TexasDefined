import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const scenicRivers = readFileSync(new URL("./explore.scenic-rivers.tsx", import.meta.url), "utf8");
const darkSky = readFileSync(new URL("./explore.texas-dark-sky-stargazing.tsx", import.meta.url), "utf8");
const sharedTrip = readFileSync(new URL("./explore.trip.$token.tsx", import.meta.url), "utf8");
const tripPlannerRoute = readFileSync(new URL("./explore.trip-planner.tsx", import.meta.url), "utf8");
const tripPlannerUi = readFileSync(new URL("./explore.trip-planner.lazy.tsx", import.meta.url), "utf8");
const riversArticle = readFileSync(
  new URL("../data/fixtures/texas-rivers-explained.ts", import.meta.url),
  "utf8",
);
const scenicEnrichment = readFileSync(
  new URL("../data/fixtures/texas-gateway-batch13-scenic-enrichment.ts", import.meta.url),
  "utf8",
);

describe("legacy KeepTXRed Explore compatibility", () => {
  it("sends Scenic Rivers to the Texas Defined rivers authority article", () => {
    expect(scenicRivers).toContain('createFileRoute("/explore/scenic-rivers")');
    expect(scenicRivers).toContain("/article/texas-rivers-explained");
    expect(scenicRivers).toContain("location.searchStr");
    expect(scenicRivers).toContain("statusCode: 301");
    expect(riversArticle).toContain('slug: "texas-rivers-explained"');
  });

  it("sends the retired Dark Sky guide to the Texas Defined stargazing authority article", () => {
    expect(darkSky).toContain('createFileRoute("/explore/texas-dark-sky-stargazing")');
    expect(darkSky).toContain("/article/best-texas-stargazing-weekend-trips");
    expect(darkSky).toContain("location.searchStr");
    expect(darkSky).toContain("statusCode: 301");
    expect(scenicEnrichment).toContain('"best-texas-stargazing-weekend-trips"');
  });

  it("preserves legacy shared-trip payloads through the current planner", () => {
    expect(sharedTrip).toContain('createFileRoute("/explore/trip/$token")');
    expect(sharedTrip).toContain('search.set("trip", params.token)');
    expect(sharedTrip).toContain("/explore/trip-planner?");
    expect(sharedTrip).toContain("statusCode: 301");
    expect(tripPlannerRoute).toContain('trip: typeof value.trip === "string"');
    expect(tripPlannerUi).toContain("decodeTrip(search.trip, destinations)");
  });
});
