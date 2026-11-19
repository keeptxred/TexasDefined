import { commonsHeroAttribution } from "@/lib/commons-hero-attribution";

/**
 * Google image metadata for the three precisely verified destination hero files.
 * Verify the delivered Commons file identity and the visible credit together:
 * never assign a photograph's copyright or license to an unrelated image.
 * File-level author/licensing independently checked on Wikimedia Commons.
 */

type DestinationHeroForRights = { src: string; credit?: string | null };
const threeHeritageHeroRights: Record<string, {
  fileUrl: string;
  credit: string;
  creator: string;
  license: string;
  copyrightNotice: string;
}> = {
  "texas-state-capitol": {
    fileUrl: "https://commons.wikimedia.org/wiki/File:Texas_State_Capitol_-_Austin,_Texas_-_DSC08253.jpg",
    credit: "Daderot · CC0 1.0 · Wikimedia Commons",
    creator: "Daderot",
    license: "https://creativecommons.org/publicdomain/zero/1.0/",
    copyrightNotice: "Daderot — CC0 1.0 public domain dedication; no copyright reserved",
  },
  "lbj-presidential-library-austin": {
    fileUrl: "https://commons.wikimedia.org/wiki/File:LBJ_Presidential_LIbrary_-_UT_Austin_(54984753236).jpg",
    credit: "ajay_suresh · Wikimedia Commons · CC BY 4.0",
    creator: "ajay_suresh",
    license: "https://creativecommons.org/licenses/by/4.0/",
    copyrightNotice: "© ajay_suresh",
  },
  "mission-san-jose-san-antonio": {
    fileUrl: "https://commons.wikimedia.org/wiki/File:Mission_San_Jose_San_Antonio_01.jpg",
    credit: "Steven B Yount · CC BY-SA 4.0 · Wikimedia Commons",
    creator: "Steven B Yount",
    license: "https://creativecommons.org/licenses/by-sa/4.0/",
    copyrightNotice: "© Steven B Yount",
  },
};
const comparableCommonsFile = (url: string): string =>
  decodeURIComponent(url).replaceAll("_", " ");

export function verifiedHeritageHeroImageRights(slug: string, hero: DestinationHeroForRights) {
  const verified = threeHeritageHeroRights[slug];
  const published = commonsHeroAttribution(hero.src, hero.credit);
  if (!verified || !published || hero.credit !== verified.credit ||
      comparableCommonsFile(published.sourceUrl) !== comparableCommonsFile(verified.fileUrl)) return null;
  return {
    creator: { "@type": "Person" as const, name: verified.creator },
    creditText: verified.credit,
    copyrightNotice: verified.copyrightNotice,
    license: verified.license,
    acquireLicensePage: verified.fileUrl,
  };
}
