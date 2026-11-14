import { describe, expect, it } from "vitest";
import { TEXAS_RIVERS_BODY_PHOTO_OVERRIDES } from "@/data/texas-rivers-body-photo-overrides";

describe("Texas rivers body photo overrides", () => {
  const legacyPaths = [
    "/images/explore/lakes-rivers/amistad-national-recreation-area.jpg",
    "/images/explore/lakes-rivers/lake-somerville-birch-creek-unit.jpg",
    "/images/explore/lakes-rivers/pedernales-falls-state-park.jpg",
    "/images/editorial/texas-guadalupe-river.jpg",
    "/images/state-parks/garner-state-park.jpg",
    "/images/editorial/moving/san-antonio.jpg",
    "/images/editorial/texas-trinity-river.jpg",
    "/images/explore/lakes-rivers/village-creek-state-park.jpg",
  ];

  it("renders every Texas Rivers body image from credited Commons photography", () => {
    expect(Object.keys(TEXAS_RIVERS_BODY_PHOTO_OVERRIDES)).toHaveLength(legacyPaths.length);
    for (const path of legacyPaths) {
      const image = TEXAS_RIVERS_BODY_PHOTO_OVERRIDES[path];
      expect(image).toBeDefined();
      expect(image.src).toContain("commons.wikimedia.org/wiki/Special:Redirect/file/");
      expect(image.credit).toContain("Wikimedia Commons");
      expect(image.credit?.toLowerCase()).not.toContain("ai-generated");
      expect(image.width).toBeGreaterThanOrEqual(1600);
      expect(image.height).toBeGreaterThan(0);
    }
  });

  it("keeps place-specific alternative text for the river sections", () => {
    expect(TEXAS_RIVERS_BODY_PHOTO_OVERRIDES["/images/explore/lakes-rivers/amistad-national-recreation-area.jpg"].alt).toContain("Rio Grande");
    expect(TEXAS_RIVERS_BODY_PHOTO_OVERRIDES["/images/explore/lakes-rivers/lake-somerville-birch-creek-unit.jpg"].alt).toContain("Brazos River");
    expect(TEXAS_RIVERS_BODY_PHOTO_OVERRIDES["/images/explore/lakes-rivers/pedernales-falls-state-park.jpg"].alt).toContain("Colorado River");
    expect(TEXAS_RIVERS_BODY_PHOTO_OVERRIDES["/images/editorial/texas-guadalupe-river.jpg"].alt).toContain("Guadalupe River");
    expect(TEXAS_RIVERS_BODY_PHOTO_OVERRIDES["/images/state-parks/garner-state-park.jpg"].alt).toContain("Frio River");
    expect(TEXAS_RIVERS_BODY_PHOTO_OVERRIDES["/images/editorial/moving/san-antonio.jpg"].alt).toContain("San Antonio River Walk");
    expect(TEXAS_RIVERS_BODY_PHOTO_OVERRIDES["/images/editorial/texas-trinity-river.jpg"].alt).toContain("Trinity River");
    expect(TEXAS_RIVERS_BODY_PHOTO_OVERRIDES["/images/explore/lakes-rivers/village-creek-state-park.jpg"].alt).toContain("Neches River");
  });
});
