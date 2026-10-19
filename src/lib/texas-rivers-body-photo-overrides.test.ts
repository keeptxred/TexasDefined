import { describe, expect, it } from "vitest";
import { TEXAS_RIVERS_BODY_PHOTO_OVERRIDES } from "@/data/texas-rivers-body-photo-overrides";

describe("Texas rivers body photo overrides", () => {
  it("replaces the three legacy AI-generated river scenes with credited Commons photography", () => {
    const legacyPaths = [
      "/images/editorial/texas-guadalupe-river.jpg",
      "/images/editorial/texas-trinity-river.jpg",
      "/images/editorial/moving/san-antonio.jpg",
    ];

    for (const path of legacyPaths) {
      const image = TEXAS_RIVERS_BODY_PHOTO_OVERRIDES[path];
      expect(image).toBeDefined();
      expect(image.src).toContain("commons.wikimedia.org/wiki/Special:Redirect/file/");
      expect(image.credit).toContain("Wikimedia Commons");
      expect(image.credit?.toLowerCase()).not.toContain("ai-generated");
    }
  });

  it("keeps place-specific alternative text for each replacement", () => {
    expect(TEXAS_RIVERS_BODY_PHOTO_OVERRIDES["/images/editorial/texas-guadalupe-river.jpg"].alt).toContain("Guadalupe River");
    expect(TEXAS_RIVERS_BODY_PHOTO_OVERRIDES["/images/editorial/texas-trinity-river.jpg"].alt).toContain("Trinity River");
    expect(TEXAS_RIVERS_BODY_PHOTO_OVERRIDES["/images/editorial/moving/san-antonio.jpg"].alt).toContain("San Antonio River Walk");
  });
});
