/**
 * Verified per-image provenance for specific TexasDefined editorial pages.
 * Originally covering the Fredericksburg–Johnson City corridor, now also museum photos.
 * Only exact Commons files independently matched to the published hero are listed.
 * Additional images must not be assumed to share these rights or source files.
 */
type HeritagePhotoRights = { sourceUrl: string; licenseUrl: string };

const rightsByPath: Record<string, HeritagePhotoRights> = {
  "/destination/museum-of-the-american-railroad-frisco": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Frisco_June_2019_28_(Museum_of_the_American_Railroad).jpg",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
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
  "/destination/lyndon-b-johnson-national-historical-park": {
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Views_at_Lyndon_B._Johnson_National_Historical_Park,_Texas_(5a734466-55b3-4ceb-a58d-c90a5d01536c).jpg",
    licenseUrl: "https://www.nps.gov/lyjo/learn/photosmultimedia/index.htm",
  },
};

export function heritagePhotoRightsForPath(path: string): HeritagePhotoRights | null {
  return rightsByPath[path] ?? null;
}
