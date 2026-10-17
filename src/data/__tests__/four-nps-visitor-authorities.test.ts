import { describe, expect, it } from "vitest";

import { applyFourFederalParkAuthorities } from "../four-nps-visitor-authorities";
import { applyAllCuratedDestination } from "../destination-curation-all";
import type { Destination } from "../types";

const SITES = {
  "alibates-flint-quarries-national-monument": "alfl",
  "chamizal-national-memorial": "cham",
  "waco-mammoth-national-monument": "waco",
  "amistad-national-recreation-area": "amis",
} as const;

function fakeDestination(slug: string, officialUrl: string): Destination {
  return {
    id: `test-${slug}`,
    brandId: "texasdefined",
    slug,
    name: slug,
    category: "historic-sites",
    region: "big-bend",
    nearestTown: "Test",
    county: "Test",
    coordinates: { lat: 30, lng: -100 },
    hero: { src: "/existing-site-photo.jpg", alt: "Real site photo already credited", width: 1600, height: 1000, credit: "Existing licensed credit" },
    summary: "Thin source description",
    bestSeason: "Year-round",
    entryNote: "",
    highlights: ["Older feature"],
    body: ["Short prior paragraph"],
    officialUrl,
    sourceCheckedAt: "2026-10-01",
  };
}

describe("Four Texas NPS parks — individually sourced authority", () => {
  for (const [slug, code] of Object.entries(SITES)) {
    it(`adds original park-specific editorial, NPS sources, three itineraries and citations: ${slug}`, () => {
      const original = fakeDestination(slug, `https://www.nps.gov/${code}/index.htm`);
      const result = applyFourFederalParkAuthorities(original);
      expect(result).not.toBe(original);
      expect(result.summary.length).toBeGreaterThan(90);
      expect(result.body).toHaveLength(5);
      expect(new Set(result.body).size).toBe(5);
      expect(result.visitorFaqs?.length).toBeGreaterThanOrEqual(3);
      expect(result.authorityGuide?.itineraries).toHaveLength(3);
      for (const item of result.authorityGuide?.itineraries ?? []) expect(item.steps.length).toBeGreaterThanOrEqual(3);
      expect(result.authorityGuide?.sources.length).toBeGreaterThanOrEqual(3);
      expect(result.visitorFaqs?.every(faq => faq.sourceUrl?.startsWith("https://www.nps.gov/"))).toBe(true);
      expect(result.sourceCheckedAt).toBe("2026-10-17");
      expect(result.hero).toEqual(original.hero);
      expect(result.coordinates).toEqual(original.coordinates);
    });

    it(`runs in the canonical destination curation graph: ${slug}`, () => {
      const result = applyAllCuratedDestination(fakeDestination(slug, `https://www.nps.gov/${code}/planyourvisit/`));
      expect(result.authorityGuide?.itineraries).toHaveLength(3);
      expect(result.entryNote.length).toBeGreaterThan(80);
    });
  }

  it("never treats a spoofed nps.gov host as authoritative", () => {
    const original = fakeDestination("waco-mammoth-national-monument", "https://www.nps.gov.attacker.test/waco/");
    expect(applyFourFederalParkAuthorities(original)).toBe(original);
  });

  it("does not assign a different federal unit's record to a valid Texas destination slug", () => {
    const original = fakeDestination("alibates-flint-quarries-national-monument", "https://www.nps.gov/cham/");
    expect(applyFourFederalParkAuthorities(original)).toBe(original);
  });

  it("does not modify unrelated destinations", () => {
    const original = fakeDestination("big-bend-national-park", "https://www.nps.gov/bibe/");
    expect(applyFourFederalParkAuthorities(original)).toBe(original);
  });
});
