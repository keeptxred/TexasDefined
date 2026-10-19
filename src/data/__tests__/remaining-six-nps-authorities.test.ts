import { describe, expect, it } from "vitest";
import { applyRemainingSixNpsAuthorities } from "../remaining-six-nps-authorities";
import { applyAllCuratedDestination } from "../destination-curation-all";
import type { Destination } from "../types";

const sites = {
  "fort-davis-national-historic-site": "foda",
  "lake-meredith-national-recreation-area": "lamr",
  "lyndon-b-johnson-national-historical-park": "lyjo",
  "padre-island-national-seashore": "pais",
  "palo-alto-battlefield-national-historical-park": "paal",
  "san-antonio-missions-national-historical-park": "saan",
} as const;

function fixture(slug: string, officialUrl: string): Destination {
  return {
    id: `test-${slug}`,
    brandId: "texasdefined",
    slug,
    name: slug,
    summary: "Existing short park description",
    category: "historic-sites",
    region: "big-bend",
    nearestTown: "Test",
    county: "Example",
    coordinates: { lat: 30.5, lng: -101.1 },
    hero: { src: "/images/unique-original-park-hero.jpg", alt: "Original actual park-specific licensed photo", width: 1600, height: 900, credit: "Original credited photographer" },
    bestSeason: "Year-round",
    entryNote: "See official park hours",
    highlights: ["Older destination highlight"],
    body: ["Original short overview of the destination"],
    managingAuthority: "National Park Service",
    officialUrl,
    sourceCheckedAt: "2026-10-11",
  };
}

describe("six researched NPS places", () => {
  for (const [slug, code] of Object.entries(sites)) {
    it(`provides original park-specific material, NPS citations, three itineraries and three sourced FAQs for ${slug}`, () => {
      const original = fixture(slug, `https://www.nps.gov/${code}/index.htm`);
      const result = applyRemainingSixNpsAuthorities(original);
      expect(result).not.toBe(original);
      expect(result.summary.length).toBeGreaterThan(90);
      expect(result.body).toHaveLength(5);
      expect(new Set(result.body).size).toBe(5);
      expect(result.body.join(" ").length).toBeGreaterThan(1400);
      expect(result.visitorFaqs?.length).toBeGreaterThanOrEqual(3);
      expect(result.visitorFaqs?.every(item => item.sourceUrl?.startsWith(`https://www.nps.gov/${code}/`))).toBe(true);
      expect(result.authorityGuide?.itineraries).toHaveLength(3);
      for (const itinerary of result.authorityGuide?.itineraries ?? []) {
        expect(itinerary.steps.length).toBeGreaterThanOrEqual(3);
      }
      expect(result.authorityGuide?.sources.length).toBeGreaterThanOrEqual(3);
      expect(result.hero).toEqual(original.hero);
      expect(result.coordinates).toEqual(original.coordinates);
      expect(result.county).toBe(original.county);
      expect(result.sourceCheckedAt).toBe("2026-10-17");
    });
    it(`connects to the canonical destination curation graph: ${slug}`, () => {
      const d = applyAllCuratedDestination(fixture(slug, `https://www.nps.gov/${code}/planyourvisit/index.htm`));
      expect(d.authorityGuide?.sources.length).toBeGreaterThanOrEqual(3);
      expect(d.entryNote.length).toBeGreaterThan(100);
    });
  }

  it("rejects a spoofed national park domain", () => {
    const fake = fixture("palo-alto-battlefield-national-historical-park", "https://www.nps.gov.attacker.example/paal/");
    expect(applyRemainingSixNpsAuthorities(fake)).toBe(fake);
  });
  it("rejects a different NPS unit code", () => {
    const fake = fixture("fort-davis-national-historic-site", "https://www.nps.gov/waco/");
    expect(applyRemainingSixNpsAuthorities(fake)).toBe(fake);
  });
  it("leaves unrelated parks unchanged", () => {
    const fake = fixture("big-bend-national-park", "https://www.nps.gov/bibe/");
    expect(applyRemainingSixNpsAuthorities(fake)).toBe(fake);
  });
});
