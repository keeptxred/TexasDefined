import { describe, expect, it } from "vitest";
import { relatedDestinationHeroSrc } from "../related-destination-hero";

describe("related destination structured-data image", () => {
  it("uses the exact credited park image when a relationship snapshot has a placeholder", () => {
    expect(relatedDestinationHeroSrc(
      "lyndon-b-johnson-national-historical-park",
      "/images/texasdefined-destination-placeholder.svg",
    )).toBe("/images/explore/historic-sites/lyndon-b-johnson-national-historical-park.jpg");
  });

  it("retains a distinct real subject photo instead of overriding curated imagery", () => {
    expect(relatedDestinationHeroSrc("lyndon-b-johnson-national-historical-park", "/images/custom/nps-visit.jpg")).toBe("/images/custom/nps-visit.jpg");
  });

  it("omits image metadata when no verified specific image is known", () => {
    expect(relatedDestinationHeroSrc("not-a-real-destination-slug", "/images/texasdefined-destination-placeholder.svg")).toBeNull();
  });
});
