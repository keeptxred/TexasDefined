import { describe, expect, it } from "vitest";
import { listResolvedDestinations } from "../destination-query-runtime";
import { TEXAS_NPS_DIRECTORY, isOfficialTexasNpsDestination } from "../texas-national-park-service-directory";
import { preservedExploreDestinations } from "../destination-preserved-catalog";
import { auditDestination } from "../destination-audit";
import type { Destination } from "../types";

const OFFICIAL_CODES = new Map(TEXAS_NPS_DIRECTORY.map(item => [item.slug, item.npsCode]));

describe("complete Texas National Park Service identity and routed discovery", () => {
  it("maintains exactly 18 distinct NPS Texas official designations", () => {
    expect(TEXAS_NPS_DIRECTORY).toHaveLength(18);
    expect(new Set(TEXAS_NPS_DIRECTORY.map(item => item.slug)).size).toBe(18);
    expect(new Set(TEXAS_NPS_DIRECTORY.map(item => item.npsCode)).size).toBe(18);
  });

  it("recognizes verified NPS unit subpages but not a spoofed host or other site code", () => {
    const base = preservedExploreDestinations.find(item => item.slug === "blackwell-school-national-historic-site");
    expect(base).toBeDefined();
    const candidate: Destination = {...base!, officialUrl: "https://www.nps.gov/blsc/planyourvisit/basicinfo.htm"};
    expect(isOfficialTexasNpsDestination(candidate)).toBe(true);
    expect(isOfficialTexasNpsDestination({...candidate, officialUrl: "https://www.nps.gov.attacker.test/blsc/"})).toBe(false);
    expect(isOfficialTexasNpsDestination({...candidate, officialUrl: "https://www.nps.gov/bibe/"})).toBe(false);
    expect(isOfficialTexasNpsDestination({...candidate, officialUrl: "https://www.nps.gov/blsc-fake/"})).toBe(false);
  });

  it("keeps the two new National Park Service sources eligible for SEO and preserved fallback", () => {
    for (const slug of ["blackwell-school-national-historic-site", "big-thicket-national-preserve"]) {
      const original = preservedExploreDestinations.find(item => item.slug === slug);
      expect(original, slug).toBeDefined();
      expect(auditDestination(original!).readyForIndexing, slug).toBe(true);
      expect(isOfficialTexasNpsDestination(original!), slug).toBe(true);
    }
  });

  it("keeps newly sourced NPS destinations in the public national collection, rather than only 2 true national parks", async () => {
    const destinations = await listResolvedDestinations({category: "national-parks"});
    const slugs = new Set(destinations.map(item => item.slug));
    for (const slug of [
      "big-bend-national-park",
      "guadalupe-mountains-national-park",
      "blackwell-school-national-historic-site",
      "big-thicket-national-preserve",
    ]) {
      expect(slugs.has(slug), slug).toBe(true);
    }
    expect(slugs.size).toBeGreaterThanOrEqual(4);
    for (const d of destinations) {
      expect(OFFICIAL_CODES.has(d.slug), d.slug).toBe(true);
      expect(isOfficialTexasNpsDestination(d), d.slug).toBe(true);
    }
  });
});
