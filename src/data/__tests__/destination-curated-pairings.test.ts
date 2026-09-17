import { describe, expect, it } from "vitest";

import { curatedDestinationPairings } from "../destination-curated-pairings";
import { buildDestinationRelationshipGroups } from "../destination-relationships";
import type { Destination } from "../types";

function destination(slug: string, category: Destination["category"] = "caverns"): Destination {
  return {
    id: `test-${slug}`,
    brandId: "texasdefined",
    slug,
    name: slug.replaceAll("-", " "),
    summary: "A substantive Texas destination summary used only for relationship testing in the destination catalog.",
    category,
    region: "hill-country",
    nearestTown: "Test",
    coordinates: { lat: 30, lng: -98 },
    hero: { src: "/test.jpg", alt: "Test destination image", width: 1, height: 1 },
    bestSeason: "Year-round",
    entryNote: "Check current visitor information.",
    highlights: ["Test"],
    body: ["Test body."],
  };
}

describe("curated cavern destination pairings", () => {
  it("links Gorman Cave and Colorado Bend State Park in both directions", () => {
    const cave = destination("gorman-cave");
    const park = destination("colorado-bend-state-park", "state-parks");
    const catalog = [cave, park];

    expect(curatedDestinationPairings(cave, catalog).map((item) => item.slug)).toContain(park.slug);
    expect(curatedDestinationPairings(park, catalog).map((item) => item.slug)).toContain(cave.slug);
  });

  it("links Westcave to Hamilton Pool and Pedernales Falls when those destinations are live", () => {
    const westcave = destination("westcave-preserve");
    const hamilton = destination("hamilton-pool-preserve", "major-springs");
    const pedernales = destination("pedernales-falls-state-park", "state-parks");

    expect(curatedDestinationPairings(westcave, [westcave, hamilton, pedernales]).map((item) => item.slug)).toEqual([
      "hamilton-pool-preserve",
      "pedernales-falls-state-park",
    ]);
  });

  it("does not manufacture a link when the paired destination is absent from the resolved catalog", () => {
    const cave = destination("longhorn-cavern-state-park");
    expect(curatedDestinationPairings(cave, [cave])).toEqual([]);
  });

  it("places editorially curated links ahead of generic proximity groups and de-duplicates them", () => {
    const cave = destination("natural-bridge-caverns");
    const ranch = destination("natural-bridge-wildlife-ranch", "outdoors");
    const unrelated = destination("unrelated-state-park", "state-parks");
    unrelated.coordinates = { lat: 30.01, lng: -98.01 };

    const groups = buildDestinationRelationshipGroups(cave, [cave, ranch, unrelated]);
    expect(groups[0]?.id).toBe("curated-pairings");
    expect(groups[0]?.destinations.map((item) => item.slug)).toEqual(["natural-bridge-wildlife-ranch"]);
    expect(groups.slice(1).flatMap((group) => group.destinations.map((item) => item.slug))).not.toContain("natural-bridge-wildlife-ranch");
  });
});
