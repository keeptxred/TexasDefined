import { describe, expect, it } from "vitest";
import { legacyExploreDestinations } from "../fixtures/legacy-explore";
import { applyFranklinMountainsVisitorAuthority } from "../franklin-mountains-visitor-authority";
import { applyStateParkHeroAsset, applyStateParkHeroAssets } from "../state-park-heroes";
import { prepareDestinationForDelivery } from "@/lib/editorial-image-delivery";
import { commonsHeroAttribution } from "@/lib/commons-hero-attribution";

const source = legacyExploreDestinations.find((destination) => destination.slug === "franklin-mountains-state-park");
if (!source) throw new Error("Expected Franklin Mountains state park fixture");
const curated = applyFranklinMountainsVisitorAuthority(source);
const src = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Franklin_Mountains_Panorama_2016.jpg?width=1600";

describe("Franklin Mountains independent visitor and image quality", () => {
  it("fixes the admission field without reusing a heat warning", () => {
    expect(curated.entryNote).toContain("$5");
    expect(curated.entryNote).toContain("12 and younger");
    expect(curated.entryNote).toContain("8 a.m.");
    expect(curated.coordinates).toEqual({ lat: 31.910522, lng: -106.518182 });
    expect(curated.address).toContain("2900 Tom Mays Access");
  });

  it("keeps the verified mountain panorama through both park photo reconciliations", () => {
    for (const result of [applyStateParkHeroAsset(curated), applyStateParkHeroAssets([curated])[0]]) {
      expect(result.hero.src).toBe(src);
      expect(result.hero.credit).toContain("Susan Barnum");
      expect(result.hero.credit).toContain("CC BY-SA 4.0");
      expect(result.hero.alt).toContain("Franklin Mountains");
    }
  });

  it("preserves exact Commons original and license attribution after first-party image proxy", () => {
    const delivered = prepareDestinationForDelivery(applyStateParkHeroAsset(curated));
    expect(delivered.hero.src).toBe("/media/remote?url=" + encodeURIComponent(src));
    const rights = commonsHeroAttribution(delivered.hero.src, delivered.hero.credit);
    expect(rights?.sourceUrl).toBe("https://commons.wikimedia.org/wiki/File:Franklin_Mountains_Panorama_2016.jpg");
    expect(rights?.licenseUrl).toBe("https://creativecommons.org/licenses/by-sa/4.0/");
  });

  it("contains factual campsites, independently sourced editorial context and visitor FAQs", () => {
    expect(curated.authorityGuide?.sources.length).toBeGreaterThanOrEqual(5);
    expect(curated.visitorFaqs?.some((item) => item.question.includes("water"))).toBe(true);
    expect(curated.body.some((paragraph) => paragraph.includes("Chihuahuan Desert"))).toBe(true);
    expect(curated.highlights.join(" ")).toContain("North Franklin Peak");
    expect(curated.sourceCheckedAt).toBe("2026-10-19");
  });

  it("does not assign the photograph to an unrelated business spoofing the slug", () => {
    const spoof = { ...curated, category: "rv-parks" as const, officialUrl: "https://example.com/rv" };
    expect(applyStateParkHeroAsset(spoof).hero).toEqual(curated.hero);
    expect(applyStateParkHeroAssets([spoof])[0].hero).toEqual(curated.hero);
  });
});
