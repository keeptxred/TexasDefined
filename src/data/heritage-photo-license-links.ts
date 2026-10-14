/**
 * Verified per-image provenance for the Fredericksburg–Johnson City corridor.
 * Only exact Commons files independently matched to the published hero are listed.
 * Additional images must not be assumed to share these rights or source files.
 */
type HeritagePhotoRights = { sourceUrl: string; licenseUrl: string };

const rightsByPath: Record<string, HeritagePhotoRights> = {
  "/article/fredericksburg-johnson-city-historic-road-trip": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Lyndon_B._Johnson_Ranch_October_2020_28_(Texas_White_House).jpg",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  "/destination/fredericksburg-art-guild": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Fredericksburg_July_2017_5_(Marktplatz).jpg",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  "/destination/luckenbach": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Luckenbach_Dance_Hall_(48523152961).jpg",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
  },
  "/destination/stonewall": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Texas_longhorn.jpg",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  },
  "/destination/fort-martin-scott": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Fort_martin_scott_2008.jpg",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  },
  "/destination/lyndon-b-johnson-state-park-historic-site": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Texas_longhorn.jpg",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  },
};

export function heritagePhotoRightsForPath(path: string): HeritagePhotoRights | null {
  return rightsByPath[path] ?? null;
}
