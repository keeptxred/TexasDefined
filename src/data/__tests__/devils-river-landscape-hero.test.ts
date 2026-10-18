import { describe, expect, it } from "vitest";
import { legacyExploreDestinations } from "../fixtures/legacy-explore";
import { applyExploreHeroAsset } from "../explore-heroes";
import { applyStateParkHeroAsset, applyStateParkHeroAssets } from "../state-park-heroes";
import { DEVILS_RIVER_LANDSCAPE_IMAGE, verifiedDevilsRiverPhotoRights } from "../verified-devils-river-landscape";

const park = legacyExploreDestinations.find(d => d.slug === "devils-river-state-natural-area");
if (!park) throw Error("Expected canonical Devils River natural area fixture");

describe("Devils River destination photograph identity and license", () => {
  it("never publishes the unrelated millipede as the state natural area's river landscape", () => {
    for (const output of [
      applyStateParkHeroAsset(park),
      applyExploreHeroAsset(park),
      applyStateParkHeroAssets([park])[0],
      applyExploreHeroAsset(applyStateParkHeroAsset(park)),
    ]) {
      expect(output.hero).toEqual(DEVILS_RIVER_LANDSCAPE_IMAGE);
      expect(output.hero.src).not.toContain("174119081");
      expect(output.hero.src).toContain("Dolan_Falls_");
      expect(output.hero.alt.toLowerCase()).toContain("devils river");
      expect(output.hero.width).toBe(800);
      expect(output.hero.height).toBe(415);
    }
  });
  it("provides an independently researched Commons file page and original license for the exact photo", () => {
    const rights = verifiedDevilsRiverPhotoRights(DEVILS_RIVER_LANDSCAPE_IMAGE);
    expect(rights?.sourceUrl).toContain("Dolan_Falls_(174119624)");
    expect(rights?.licenseUrl).toBe("https://creativecommons.org/licenses/by-sa/2.0/");
    expect(rights?.author).toBe("Clinton & Charles Robertson");
    expect(DEVILS_RIVER_LANDSCAPE_IMAGE.alt).toContain("not an advertised public trailhead");
  });
  it("does not claim provenance if image or attribution is replaced", () => {
    expect(verifiedDevilsRiverPhotoRights({ ...DEVILS_RIVER_LANDSCAPE_IMAGE, src:"/images/unrelated.jpg" })).toBeNull();
    expect(verifiedDevilsRiverPhotoRights({ ...DEVILS_RIVER_LANDSCAPE_IMAGE, credit:"Someone else" })).toBeNull();
  });
  it("does not apply a TPWD park photo to an unrelated entity spoofing the park slug", () => {
    const falseSite={...park, officialUrl:"https://example.org/devils-river", category:"rv-parks" as const};
    expect(applyStateParkHeroAsset(falseSite).hero).toEqual(park.hero);
    expect(applyExploreHeroAsset(falseSite).hero).toEqual(park.hero);
  });
});
