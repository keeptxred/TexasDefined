import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const categoryRoute = readFileSync(new URL("./explore.$category.tsx", import.meta.url), "utf8");
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

describe("legacy Explore compatibility", () => {
  it("resolves Scenic Rivers through the governed category route", () => {
    expect(categoryRoute).toContain('"scenic-rivers": "/article/texas-rivers-explained"');
    expect(categoryRoute).toContain("legacyExploreRedirects[params.category]");
    expect(categoryRoute).toContain('statusCode: 301');
    expect(categoryRoute).toContain('location.searchStr');
    expect(riversArticle).toContain('slug: "texas-rivers-explained"');
  });

  it("resolves the retired Dark Sky alias to the stargazing authority article", () => {
    expect(categoryRoute).toContain(
      '"texas-dark-sky-stargazing": "/article/best-texas-stargazing-weekend-trips"',
    );
    expect(categoryRoute).toContain("legacyExploreRedirects[params.category]");
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
