import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const categoryRoute = readFileSync(new URL("./explore.$category.tsx", import.meta.url), "utf8");
const sharedTrip = readFileSync(new URL("./explore.trip.$token.tsx", import.meta.url), "utf8");
const riversArticle = readFileSync(
  new URL("../data/fixtures/texas-rivers-explained.ts", import.meta.url),
  "utf8",
);
const stargazingRoute = readFileSync(
  new URL("./texas-stargazing-guide.tsx", import.meta.url),
  "utf8",
);

describe("legacy Explore compatibility", () => {
  it("resolves Scenic Rivers through the governed category route", () => {
    expect(categoryRoute).toContain('"scenic-rivers": "/article/texas-rivers-explained"');
    expect(categoryRoute).toContain("legacyExploreRedirects[params.category]");
    expect(categoryRoute).toContain("statusCode: 301");
    expect(categoryRoute).toContain("location.searchStr");
    expect(riversArticle).toContain('slug: "texas-rivers-explained"');
  });

  it("resolves the retired Dark Sky alias to the canonical stargazing guide", () => {
    expect(categoryRoute).toContain(
      '"texas-dark-sky-stargazing": "/texas-stargazing-guide"',
    );
    expect(stargazingRoute).toContain('const canonicalPath = "/texas-stargazing-guide"');
  });

  it("loads only public legacy shared itineraries through the publishable-key boundary", () => {
    expect(sharedTrip).toContain('/rest/v1/explore_trips?');
    expect(sharedTrip).toContain('share_token: `eq.${token}`');
    expect(sharedTrip).toContain('is_public: "eq.true"');
    expect(sharedTrip).toContain("VITE_TEXASDEFINED_SUPABASE_ANON_KEY");
    expect(sharedTrip).toContain("VITE_SUPABASE_PUBLISHABLE_KEY");
    expect(sharedTrip).not.toContain("SERVICE_ROLE");
  });

  it("keeps preserved shared itineraries read-only and out of the index", () => {
    expect(sharedTrip).toContain('createFileRoute("/explore/trip/$token")');
    expect(sharedTrip).toContain('name: "robots", content: "noindex, follow, max-image-preview:large"');
    expect(sharedTrip).toContain("This shared itinerary is preserved read-only.");
    expect(sharedTrip).not.toContain('search.set("trip", params.token)');
    expect(sharedTrip).not.toContain("insert(");
    expect(sharedTrip).not.toContain("update(");
    expect(sharedTrip).not.toContain("delete(");
  });
});
