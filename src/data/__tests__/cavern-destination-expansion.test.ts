import { describe, expect, it } from "vitest";

import { cavernExpansionDestinations } from "../cavern-destination-expansion";
import { auditDestination } from "../destination-audit";
import { applyAllCuratedDestinations } from "../destination-curation-all";

const EXPECTED_SLUGS = ["wonder-world-cave", "gorman-cave", "westcave-preserve"] as const;

describe("public cavern destination expansion", () => {
  it("keeps every checked-in cavern expansion record index-ready", () => {
    expect(cavernExpansionDestinations.map((item) => item.slug).sort()).toEqual([...EXPECTED_SLUGS].sort());

    for (const destination of cavernExpansionDestinations) {
      const audit = auditDestination(destination);
      expect(audit.readyForIndexing, `${destination.slug}: ${audit.issues.map((issue) => issue.code).join(", ")}`).toBe(true);
      expect(destination.category).toBe("caverns");
      expect(destination.officialUrl).toMatch(/^https:\/\//);
      expect(destination.sourceCheckedAt).toBe("2026-09-09");
    }
  });

  it("adds missing cavern records to the production curation catalog", () => {
    const catalog = applyAllCuratedDestinations([]);
    for (const slug of EXPECTED_SLUGS) {
      expect(catalog.some((destination) => destination.slug === slug)).toBe(true);
    }
  });

  it("does not duplicate a cavern supplied by the remote catalog", () => {
    const remoteWonder = { ...cavernExpansionDestinations[0], summary: "Remote Wonder World record with enough unique destination copy to remain identifiable in this test." };
    const catalog = applyAllCuratedDestinations([remoteWonder]);
    expect(catalog.filter((destination) => destination.slug === "wonder-world-cave")).toHaveLength(1);
    expect(catalog.find((destination) => destination.slug === "wonder-world-cave")?.summary).toBe(remoteWonder.summary);
  });
});
