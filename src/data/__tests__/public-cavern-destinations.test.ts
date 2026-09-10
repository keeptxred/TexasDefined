import { describe, expect, it } from "vitest";

import {
  getResolvedDestination,
  listResolvedDestinationSearchCatalog,
  listResolvedDestinations,
} from "../destination-query-runtime";

const EXPECTED_PUBLIC_CAVERNS = [
  "natural-bridge-caverns",
  "inner-space-cavern",
  "longhorn-cavern-state-park",
  "caverns-of-sonora",
  "cascade-caverns",
  "cave-without-a-name",
  "wonder-world-cave",
  "kickapoo-cavern-state-park",
  "gorman-cave",
  "devils-sinkhole-state-natural-area",
  "westcave-preserve",
] as const;

describe("public cavern destination resolution", () => {
  it("keeps all 11 current public cavern experiences in the Explore caverns collection", async () => {
    const destinations = await listResolvedDestinations({ category: "caverns" });
    const slugs = new Set(destinations.map((destination) => destination.slug));

    for (const slug of EXPECTED_PUBLIC_CAVERNS) {
      expect(slugs.has(slug), slug).toBe(true);
    }
  });

  it("keeps all 11 public cavern experiences in the resolved global search catalog exactly once", async () => {
    const destinations = await listResolvedDestinationSearchCatalog();

    for (const slug of EXPECTED_PUBLIC_CAVERNS) {
      expect(destinations.filter((destination) => destination.slug === slug), slug).toHaveLength(1);
    }
  });

  it("keeps the four previously missing cavern destinations directly resolvable", async () => {
    for (const slug of [
      "caverns-of-sonora",
      "cascade-caverns",
      "cave-without-a-name",
      "devils-sinkhole-state-natural-area",
    ] as const) {
      const destination = await getResolvedDestination(slug);
      expect(destination?.slug, slug).toBe(slug);
      expect(destination?.category, slug).toBe("caverns");
      expect(destination?.officialUrl, slug).toBeTruthy();
      expect(destination?.hero.credit, slug).toBeTruthy();
    }
  });
});
