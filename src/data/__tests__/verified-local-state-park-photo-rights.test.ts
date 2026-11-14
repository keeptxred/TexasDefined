import { describe, expect, it } from "vitest";
import { verifiedLocalParkCredit, verifiedStateParkPhotoCredits } from "../verified-local-state-park-photo-credits";
import { stateParkHeroMap } from "../state-park-hero-map";

const path = "/images/state-parks/world-birding-center-bentsen-rio-grande-valley-state-park.jpg";
describe("Licensed photo provenance is attached to the actual state park asset", () => {
  it("validates the Bentsen river-valley photograph against its original Commons author and license", () => {
    const image = stateParkHeroMap["world-birding-center-bentsen-rio-grande-valley-state-park"];
    expect(image.src).toBe(path);
    const rights=verifiedLocalParkCredit(image);
    expect(rights).not.toBeNull();
    expect(rights?.fileUrl).toContain("Bentsen-Rio_Grande_Valley_State_Park");
    expect(rights?.fileUrl).toContain("15_April_2016");
    expect(rights?.licenseUrl).toBe("https://creativecommons.org/licenses/by-sa/4.0/");
    expect(rights?.credit).toContain("William L. Farr");
    expect(verifiedStateParkPhotoCredits[path]?.author).toBe("William L. Farr");
  });
  it("rejects rights-link attachment when the photograph, photographer or license changes", () => {
    const image = stateParkHeroMap["world-birding-center-bentsen-rio-grande-valley-state-park"];
    expect(verifiedLocalParkCredit({...image,src:"/images/unrelated.jpg"})).toBeNull();
    expect(verifiedLocalParkCredit({...image,credit:"Unverified photographer · CC BY-SA 4.0"})).toBeNull();
    expect(verifiedLocalParkCredit({...image,credit:"William L. Farr · All rights reserved"})).toBeNull();
  });
});
