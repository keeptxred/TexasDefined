import { describe, expect, it } from "vitest";
import { commonsHeroAttribution } from "./commons-hero-attribution";

describe("museum Commons hero photograph attribution", () => {
  const bryan = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Galveston_Texas_-_The_Bryan_Museum_-_January_2025_-_1.jpg?width=1600";
  const carthage = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Texas_Country_Music_Hall_of_Fame_and_Tex_Ritter_Museum_IMG_2956.JPG?width=1600";

  it("provides both the exact author file and CC BY 2.0 terms", () => {
    expect(commonsHeroAttribution(bryan, "Alexander Hatley · CC BY 2.0 · Wikimedia Commons")).toEqual({
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Galveston_Texas_-_The_Bryan_Museum_-_January_2025_-_1.jpg",
      licenseCode: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    });
  });

  it("recognizes CC BY-SA and decodes a safe remote proxy URL", () => {
    const proxied = "/media/remote?url=" + encodeURIComponent(carthage);
    expect(commonsHeroAttribution(proxied, "Billy Hathorn · CC BY-SA 3.0 · Wikimedia Commons")).toEqual({
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Texas_Country_Music_Hall_of_Fame_and_Tex_Ritter_Museum_IMG_2956.JPG",
      licenseCode: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    });
  });

  it("never invents a Creative Commons license from a source URL", () => {
    expect(commonsHeroAttribution(bryan, "Carol M. Highsmith · Library of Congress")).toEqual({
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Galveston_Texas_-_The_Bryan_Museum_-_January_2025_-_1.jpg",
      licenseCode: null, licenseUrl: null,
    });
  });

  it("does not credit a completely different image host as Commons", () => {
    expect(commonsHeroAttribution("https://example.com/exterior.jpg", "CC BY 4.0")).toBeNull();
    expect(commonsHeroAttribution("not a valid photo", "CC BY 4.0")).toBeNull();
  });
});
