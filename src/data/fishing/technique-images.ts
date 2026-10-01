export type FishingTechniqueImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  imageType: "image/avif" | "image/jpeg" | "image/png";
  sourceType: "ai-generated" | "wikimedia";
  creator: string;
  sourceUrl?: string;
  licenseLabel?: string;
  licenseUrl?: string;
  generator?: string;
  generatedAt?: string;
  subjectScope: "representative" | "educational";
};

export type FishingTechniqueImageSet = {
  hero?: FishingTechniqueImage;
  depthGuide?: FishingTechniqueImage;
};

export const DISCOVER_MIN_TECHNIQUE_IMAGE_WIDTH = 1200;
export const SOCIAL_MIN_TECHNIQUE_IMAGE_HEIGHT = 630;

const blockedHeroPattern = /(?:placeholder|photo[-_ ]?unavailable|\.svg(?:\?|$))/i;

export function isFishingTechniqueHeroReady(slug: string) {
  const image = fishingTechniqueImages[slug]?.hero;
  if (!image) return false;
  if (!image.src.trim() || !image.alt.trim() || image.alt.trim().length < 20) return false;
  if (blockedHeroPattern.test(image.src)) return false;
  if (image.width < DISCOVER_MIN_TECHNIQUE_IMAGE_WIDTH || image.height < SOCIAL_MIN_TECHNIQUE_IMAGE_HEIGHT) return false;
  if (image.sourceType === "ai-generated") return Boolean(image.generator?.trim() && image.generatedAt?.trim());
  return Boolean(image.sourceUrl?.startsWith("https://commons.wikimedia.org/") && image.licenseLabel?.trim() && image.licenseUrl?.startsWith("https://"));
}

export const fishingTechniqueImages: Record<string, FishingTechniqueImageSet> = {
  "soft-plastics": {
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Twister%202008%20G01.jpg",
      alt: "Soft-plastic twister-tail fishing lure rigged on a jig head for casting",
      caption: "Soft-plastic twister lure. George Chernilevsky / Wikimedia Commons · public domain.",
      width: 2000,
      height: 1200,
      imageType: "image/jpeg",
      sourceType: "wikimedia",
      creator: "George Chernilevsky",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Twister_2008_G01.jpg",
      licenseLabel: "Public domain",
      licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
      subjectScope: "representative",
    },
  },
  crankbaits: {
    hero: {
      src: "/images/fishing/crankbaits-hero.avif",
      alt: "Largemouth bass approaching a diving crankbait around submerged timber and rock",
      caption: "AI-generated editorial illustration by Texas Defined using OpenAI image generation. Representative crankbait fishing scene; not a photograph of a specific Texas lake or catch.",
      width: 1200,
      height: 675,
      imageType: "image/avif",
      sourceType: "ai-generated",
      creator: "Texas Defined",
      generator: "OpenAI image generation",
      generatedAt: "2026-09-27",
      subjectScope: "representative",
    },
    depthGuide: {
      src: "/images/fishing/crankbait-types-depth-cover.avif",
      alt: "Crankbait depth-and-cover guide showing squarebill, shallow-diving, medium-diving, deep-diving and lipless crankbait zones",
      caption: "AI-generated educational illustration by Texas Defined using OpenAI image generation. Use the depth ranges as a guide; actual running depth varies by lure design, line diameter, cast length and retrieve speed.",
      width: 1200,
      height: 675,
      imageType: "image/avif",
      sourceType: "ai-generated",
      creator: "Texas Defined",
      generator: "OpenAI image generation",
      generatedAt: "2026-09-27",
      subjectScope: "educational",
    },
  },
  spinnerbaits: {
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Spinnerbait.jpg",
      alt: "Spinnerbait fishing lure with wire arm, blades, skirt and single hook",
      caption: "Spinnerbait fishing lure. E tac / Wikimedia Commons · CC0 1.0 public-domain dedication.",
      width: 2627,
      height: 1970,
      imageType: "image/jpeg",
      sourceType: "wikimedia",
      creator: "E tac",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Spinnerbait.jpg",
      licenseLabel: "CC0 1.0",
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
      subjectScope: "representative",
    },
  },
  topwater: {
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Popper%20zum%20Angeln.jpg",
      alt: "Several topwater popper fishing lures arranged together for surface fishing",
      caption: "Topwater popper lures. Kevin Behrendt / Wikimedia Commons · CC BY-SA 4.0.",
      width: 2713,
      height: 1821,
      imageType: "image/jpeg",
      sourceType: "wikimedia",
      creator: "Kevin Behrendt",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Popper_zum_Angeln.jpg",
      licenseLabel: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      subjectScope: "representative",
    },
  },
  trolling: {
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Hauling%20in%20salmon%20caught%20by%20trolling.jpg",
      alt: "Angler hauling in a salmon caught by hook and bait from a trolling boat",
      caption: "Historic trolling photograph from NOAA's Fisheries Collection / Wikimedia Commons · U.S. public domain.",
      width: 3760,
      height: 2908,
      imageType: "image/jpeg",
      sourceType: "wikimedia",
      creator: "NOAA Historical Fisheries Collection",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Hauling_in_salmon_caught_by_trolling.jpg",
      licenseLabel: "Public domain · U.S. NOAA",
      licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
      subjectScope: "representative",
    },
  },
  "vertical-jigging": {
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Unidentified%20bait%20fish%20caught%20by%20jigging%2C%20Bedok%20Jetty%2C%20Singapore%20-%2020101120.jpg",
      alt: "Small bait fish caught by jigging beside a fishing jetty",
      caption: "Fish caught by jigging. Adhir Kirtikar / Wikimedia Commons · CC BY-SA 3.0.",
      width: 2048,
      height: 1536,
      imageType: "image/jpeg",
      sourceType: "wikimedia",
      creator: "Adhir Kirtikar",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Unidentified_bait_fish_caught_by_jigging,_Bedok_Jetty,_Singapore_-_20101120.jpg",
      licenseLabel: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
      subjectScope: "representative",
    },
  },
  "jigs-and-minnows": {
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Jigs1.jpg",
      alt: "Assorted fishing jigs arranged together for jig-and-minnow presentations",
      caption: "Assorted fishing jigs. Roswaldox / Wikimedia Commons · CC BY-SA 3.0.",
      width: 1920,
      height: 1080,
      imageType: "image/jpeg",
      sourceType: "wikimedia",
      creator: "Roswaldox",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Jigs1.jpg",
      licenseLabel: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
      subjectScope: "representative",
    },
  },
  "live-bait": {
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Live%20bait%20%288392236171%29.jpg",
      alt: "Live bait fish held in a bait container before fishing",
      caption: "Live bait. psyberartist / Wikimedia Commons · CC BY 2.0.",
      width: 2400,
      height: 3600,
      imageType: "image/jpeg",
      sourceType: "wikimedia",
      creator: "psyberartist",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Live_bait_(8392236171).jpg",
      licenseLabel: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
      subjectScope: "representative",
    },
  },
  "cut-bait": {
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Preparing%20bait%20for%20salmon%20trolling.jpg",
      alt: "Natural fish bait being prepared by hand before it is rigged for fishing",
      caption: "Preparing natural fish bait. NOAA Central Library Historical Fisheries Collection / Wikimedia Commons · U.S. public domain.",
      width: 2957,
      height: 3721,
      imageType: "image/jpeg",
      sourceType: "wikimedia",
      creator: "NOAA Central Library Historical Fisheries Collection",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Preparing_bait_for_salmon_trolling.jpg",
      licenseLabel: "Public domain · U.S. NOAA",
      licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
      subjectScope: "representative",
    },
  },
};
