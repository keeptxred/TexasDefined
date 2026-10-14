import { describe, expect, it } from "vitest";
import { heritagePhotoRightsForPath } from "../heritage-photo-license-links";

const requiredPages = [
  "/article/fredericksburg-johnson-city-historic-road-trip",
  "/destination/fredericksburg-art-guild",
  "/destination/luckenbach",
  "/destination/stonewall",
  "/destination/fort-martin-scott",
  "/destination/lyndon-b-johnson-state-park-historic-site",
  "/destination/lyndon-b-johnson-national-historical-park",
] as const;

describe("Fredericksburg–Johnson City photo provenance", () => {
  it("retains exact HTTPS original-image and valid rights-page references for all seven authored corridor heroes", () => {
    for (const path of requiredPages) {
      const rights = heritagePhotoRightsForPath(path);
      expect(rights?.sourceUrl, path).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
      expect(rights?.licenseUrl, path).toMatch(/^https:\/\/(creativecommons\.org\/licenses\/|www\.nps\.gov\/lyjo\/learn\/photosmultimedia\/)/);
    }
  });

  it("keeps the National Park Service public-domain original linked to its NPGallery-derived asset", () => {
    const rights = heritagePhotoRightsForPath("/destination/lyndon-b-johnson-national-historical-park");
    expect(rights?.sourceUrl).toContain("5a734466-55b3-4ceb-a58d-c90a5d01536c");
    expect(rights?.licenseUrl).toBe("https://www.nps.gov/lyjo/learn/photosmultimedia/index.htm");
  });

  it("does not generalize licensing to unrelated destinations", () => {
    expect(heritagePhotoRightsForPath("/destination/a-made-up-fort")).toBeNull();
  });
});
