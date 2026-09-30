import type { FishingVisualAsset } from "./image-library";

const COMMONS = "https://commons.wikimedia.org/wiki/";
const SPECIAL = "https://commons.wikimedia.org/wiki/Special:Redirect/file/";
const CC_BY_4 = "https://creativecommons.org/licenses/by/4.0/";
const CC_BY_SA_25 = "https://creativecommons.org/licenses/by-sa/2.5/";
const COMMONS_PD = "https://commons.wikimedia.org/wiki/Commons:Public_domain";

function commonsUrl(filename: string) {
  return `${COMMONS}File:${encodeURIComponent(filename).replace(/%2F/g, "/")}`;
}
function commonsSrc(filename: string) {
  return `${SPECIAL}${encodeURIComponent(filename).replace(/%2F/g, "/")}`;
}
function governed(asset: Omit<FishingVisualAsset, "kind" | "verifiedAt" | "actualLocation">): FishingVisualAsset {
  return { ...asset, kind: "lake", verifiedAt: "2026-09-30", actualLocation: true };
}

/**
 * Overrides legacy local lake mappings where provenance was missing or the old
 * state-park hero did not actually depict the named lake. These objects are the
 * production governance layer consumed by FishingPhoto.
 */
export const governedLakePhotoOverrides: Record<string, FishingVisualAsset> = {
  "lake-amistad": governed({
    id: "lake-amistad", subjectSlug: "amistad-reservoir",
    src: "/images/explore/lakes-rivers/amistad-national-recreation-area.jpg",
    alt: "Amistad Reservoir water and canyon landscape at Amistad National Recreation Area",
    width: 1600, height: 1067, sourceName: "Wikimedia Commons / National Park Service",
    sourceUrl: commonsUrl("Amistad National Recreation Area AMIS0600.jpg"),
    creator: "National Park Service Digital Image Archives", licenseName: "Public domain — U.S. National Park Service",
    licenseUrl: COMMONS_PD, rightsStatus: "public-domain", credit: "National Park Service · Public domain",
  }),
  "lake-meredith": governed({
    id: "lake-meredith", subjectSlug: "lake-meredith",
    src: "/images/explore/lakes-rivers/lake-meredith-national-recreation-area.jpg",
    alt: "Lake Meredith National Recreation Area in the Texas Panhandle",
    width: 1600, height: 2979, sourceName: "Wikimedia Commons / National Park Service",
    sourceUrl: commonsUrl("Lake Meredith National Recreation Area, Alibates Flint Quarries National Monument, Texas LOC 2014590113.jpg"),
    creator: "United States National Park Service", licenseName: "Public domain — U.S. federal government work",
    licenseUrl: COMMONS_PD, rightsStatus: "public-domain", credit: "U.S. National Park Service · Public domain",
  }),
  "lake-ray-roberts": governed({
    id: "lake-ray-roberts", subjectSlug: "ray-roberts-lake",
    src: "/images/explore/lakes-rivers/ray-roberts-lake-isle-du-bois-unit.jpg",
    alt: "Aerial view of Ray Roberts Lake and Dam in North Texas",
    width: 1600, height: 1068, sourceName: "Wikimedia Commons / U.S. Army Corps of Engineers",
    sourceUrl: commonsUrl("USACE Ray Roberts Lake and Dam.jpg"),
    creator: "U.S. Army Corps of Engineers", licenseName: "Public domain — U.S. federal government work",
    licenseUrl: COMMONS_PD, rightsStatus: "public-domain", credit: "U.S. Army Corps of Engineers · Public domain",
  }),
  "lake-somerville": governed({
    id: "lake-somerville", subjectSlug: "lake-somerville",
    src: commonsSrc("Lake View from Lake Somerville SP Texas 2023.jpg"),
    alt: "View across Lake Somerville from Lake Somerville State Park",
    width: 5184, height: 2916, sourceName: "Wikimedia Commons",
    sourceUrl: commonsUrl("Lake View from Lake Somerville SP Texas 2023.jpg"),
    creator: "Larry D. Moore", licenseName: "CC BY 4.0", licenseUrl: CC_BY_4,
    rightsStatus: "cc-by", credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
  }),
  "lake-caddo": governed({
    id: "lake-caddo", subjectSlug: "caddo-lake",
    src: commonsSrc("Caddo Lake- Cypress.jpg"),
    alt: "Bald cypress trees growing in Caddo Lake in East Texas",
    width: 2048, height: 1536, sourceName: "Wikimedia Commons",
    sourceUrl: commonsUrl("Caddo Lake- Cypress.jpg"), creator: "Jay Carriker",
    licenseName: "CC BY-SA 2.5", licenseUrl: CC_BY_SA_25, rightsStatus: "cc-by-sa",
    credit: "Jay Carriker · CC BY-SA 2.5 · Wikimedia Commons",
  }),
  "lake-bob-sandlin": governed({
    id: "lake-bob-sandlin", subjectSlug: "lake-bob-sandlin",
    src: commonsSrc("Lake Bob Sandlin.jpg"), alt: "Lake Bob Sandlin in East Texas",
    width: 4032, height: 3024, sourceName: "Wikimedia Commons",
    sourceUrl: commonsUrl("Lake Bob Sandlin.jpg"), creator: "OmgWhizBoyOmg",
    licenseName: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", rightsStatus: "cc-by-sa",
    credit: "OmgWhizBoyOmg · CC BY-SA 4.0 · Wikimedia Commons",
  }),
  "lake-corpus-christi": governed({
    id: "lake-corpus-christi", subjectSlug: "lake-corpus-christi",
    src: commonsSrc("Lake corpus christi view.jpg"), alt: "View across Lake Corpus Christi reservoir",
    width: 5184, height: 2916, sourceName: "Wikimedia Commons",
    sourceUrl: commonsUrl("Lake corpus christi view.jpg"), creator: "Larry D. Moore",
    licenseName: "CC BY 4.0", licenseUrl: CC_BY_4, rightsStatus: "cc-by",
    credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
  }),
  "lake-livingston": governed({
    id: "lake-livingston", subjectSlug: "lake-livingston",
    src: commonsSrc("Lake Livingston State Park Dock.jpg"), alt: "Dock and open water on Lake Livingston",
    width: 5184, height: 2916, sourceName: "Wikimedia Commons",
    sourceUrl: commonsUrl("Lake Livingston State Park Dock.jpg"), creator: "Larry D. Moore",
    licenseName: "CC BY 4.0", licenseUrl: CC_BY_4, rightsStatus: "cc-by",
    credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
  }),
  "lake-tawakoni": governed({
    id: "lake-tawakoni", subjectSlug: "lake-tawakoni",
    src: commonsSrc("Lake Tawakoni State Park Texas 2023.jpg"), alt: "Lake Tawakoni viewed from Lake Tawakoni State Park",
    width: 5184, height: 2916, sourceName: "Wikimedia Commons",
    sourceUrl: commonsUrl("Lake Tawakoni State Park Texas 2023.jpg"), creator: "Larry D. Moore",
    licenseName: "CC BY 4.0", licenseUrl: CC_BY_4, rightsStatus: "cc-by",
    credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
  }),
  "lake-whitney": governed({
    id: "lake-whitney", subjectSlug: "lake-whitney",
    src: commonsSrc("Sunset Lake Whitney Texas 2024.jpg"), alt: "Sunset over Lake Whitney in Central Texas",
    width: 5184, height: 2916, sourceName: "Wikimedia Commons",
    sourceUrl: commonsUrl("Sunset Lake Whitney Texas 2024.jpg"), creator: "Larry D. Moore",
    licenseName: "CC BY 4.0", licenseUrl: CC_BY_4, rightsStatus: "cc-by",
    credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
  }),
};

export function applyLakePhotoGovernance(image: FishingVisualAsset): FishingVisualAsset {
  if (image.kind !== "lake") return image;
  return governedLakePhotoOverrides[image.id] ?? image;
}
