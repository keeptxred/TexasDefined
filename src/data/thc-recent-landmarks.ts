/**
 * Curated index of recent National Register listings reported by the Texas
 * Historical Commission. This is an INDEX, not proof of public access,
 * permission to photograph, individual page readiness, or original research.
 *
 * The official THC listing may be updated retroactively. Corrections should
 * use the federal/THC record as evidence, never guessed dates or status.
 */
export const THC_LISTINGS_URL =
  "https://thc.texas.gov/preserve/designate-historic-properties/national-register-historic-places";
export const THC_ATLAS_URL = "https://atlas.thc.texas.gov/";
export const THC_RESEARCH_REVIEWED_ON = "2026-10-12";
export type ThcLandmarkKind =
  | "building" | "district" | "church" | "cemetery" | "courthouse"
  | "cultural-landscape" | "school" | "bridge" | "memorial" | "stadium";
export type ThcListedLandmark = {
  year: number; month: string; name: string; town: string; county: string;
  kind: ThcLandmarkKind; status: "listed";
};
export type ThcPendingLandmark = {
  name: string; town: string; county: string; stage: "submitted" | "review";
  status: "not-yet-listed";
};

// Do not interpret a district boundary amendment as a new freestanding attraction.
// Cultural/archeological sensitivity also takes priority over public-map discovery.
export const THC_RECENT_LISTED_RAW = `
2026|October|First Methodist Episcopal Church South|Dallas|Dallas|church
2026|September|Style-in-Steel Townhouses|Houston|Harris|building
2026|September|Culver House|Matagorda|Matagorda|building
2026|September|Ferguson Hall|Abilene|Taylor|building
2026|September|Lucinda García and Tomás Tijerina House|Brownsville|Cameron|building
2026|August|Binyon-O'Keefe Storage Company|Fort Worth|Tarrant|building
2026|August|Olivewood Cemetery|Houston|Harris|cemetery
2026|August|Dittlinger Family Residential Historic District|New Braunfels|Comal|district
2026|July|Patricia Welder and Hampton C. Robinson Jr. House|Missouri City|Fort Bend|building
2026|July|Cindy Walker House|Mexia|Limestone|building
2026|June|South Side Historic District|Marathon|Brewster|district
2026|June|Commerce Street Warehouse Historic District|Houston|Harris|district
2026|June|Bailey County Courthouse|Muleshoe|Bailey|courthouse
2026|June|St. Augustine of Hippo Episcopal Church|Galveston|Galveston|church
2026|June|White Rock Bluffs (Traditional Cultural Property)|Dallas|Dallas|cultural-landscape
2026|June|Dallas Downtown Historic District (Hartford Building boundary increase)|Dallas|Dallas|district
2026|June|Sour Lake Historic District|Sour Lake|Hardin|district
2026|May|Otto and Emma Koehler House|San Antonio|Bexar|building
2026|May|Alpine Downtown Historic District|Alpine|Brewster|district
2026|May|Mittel-Kraus Rural Historic District|Fredericksburg area|Gillespie|district
2026|May|Atlanta-Miller Grade School|Atlanta|Cass|school
2026|March|Swift & Co. Packing Plant|Houston|Harris|building
2026|March|Zim's Bottling Works and Tourist Park|Strawn|Palo Pinto|building
2026|March|Cox Springs School|Jonestown|Travis|school
2026|March|Pittsburgh Plate Glass Company|Lubbock|Lubbock|building
2026|March|Castro County Courthouse|Dimmitt|Castro|courthouse
2026|March|Kokernot Field|Alpine|Brewster|stadium
2026|March|Margarett Root Brown College|Houston|Harris|school
2026|March|Inwood Manor|Houston|Harris|building
2026|February|Shary Heights|Mission|Hidalgo|district
2026|February|Sycamore Creek Bridge|Fort Worth|Tarrant|bridge
2026|February|Shield Ranch (boundary increase amendment)|Bee Cave area|Travis and Hays|district
2026|February|Central New Braunfels Historic District|New Braunfels|Comal|district
2026|February|Southern Pacific Passenger Depot|Del Rio|Val Verde|building
2026|January|HEB Grocery Store, Waco Store #1|Waco|McLennan|building
2026|January|Temple to the Brave|Beaumont|Jefferson|memorial
2026|January|Pollard Residential Historic District|Tyler|Smith|district
2026|January|Downtown Bryan Historic District|Bryan|Brazos|district
2026|January|First City National Bank|Houston|Harris|building
2026|January|Gatesville Downtown Historic District|Gatesville|Coryell|district
2026|January|Macedonia School Vocational Building|Linden|Cass|school
2026|January|First Independent Baptist Church|Corsicana|Navarro|church
2026|January|Brenham Normal and Industrial College|Brenham|Washington|school
2025|December|Wesley Chapel Colored Methodist Episcopal Church|Corsicana|Navarro|church
2025|December|Bethel Baptist Church|Tennessee Colony|Anderson|church
2025|December|Lexington Apartments and Motor Inns|Austin|Travis|building
2025|November|Ethiopian Star Lodge #308|Snook area|Burleson|building
2025|October|San Antonio Downtown and River Walk Historic District (boundary increase)|San Antonio|Bexar|district
2025|October|Buick Motor Company|San Antonio|Bexar|building
2025|September|Paris Grocer Co.|Paris|Lamar|building
2025|September|Charles V. Bellinger House and Greater Corinth Baptist Church|San Antonio|Bexar|church
2025|September|Grandview Courts-Siesta Motel|Alpine|Brewster|building
2025|September|Boedeker Ice Cream Company|Dallas|Dallas|building
2025|June|Christensen Castle|Santa Fe|Galveston|building
2025|June|Della Phillips House|Austin|Travis|building
2025|May|Donald Judd Historic District (amendment)|Marfa|Presidio|district
2025|April|Holland Hotel|Alpine|Brewster|building
2025|April|Max J. and Jennie Rosenfield House|Dallas|Dallas|building
2025|April|Palacios Colored School|Palacios|Matagorda|school
2025|March|San Jacinto Warehouse|Houston|Harris|building
2025|March|Armour Laboratory Building|Fort Worth|Tarrant|building
2025|March|William Decker Johnson Hall|Waco|McLennan|building
2025|March|Hotel Limpia|Fort Davis|Jeff Davis|building
2025|February|Wimberley Downtown Square Historic District|Wimberley|Hays|district
2025|February|Bosque River Bridge|Meridian|Bosque|bridge
2025|January|Humble-Exxon Building|Houston|Harris|building
`.trim();

export const THC_PENDING_RAW = `
Rosewood Elementary|Austin|Travis|submitted
Montopolis Negro School|Austin|Travis|submitted
San Bernard Historic District|Austin|Travis|submitted
Chambersea (relocation proposal)|Anahuac|Chambers|submitted
Little Chapel in the Woods|Denton|Denton|review
USAA Building|San Antonio|Bexar|review
Mary Kay Cosmetics|Dallas|Dallas|review
Evergreen Cemetery|Austin|Travis|review
First Methodist Church|Austin|Travis|review
Rosewood Park|Austin|Travis|review
Thomas Clayborne Frost Jr. House|San Antonio|Bexar|review
St. Stephen Methodist Church|Mesquite|Dallas|review
El Paso Laundry and Cleaners Company|El Paso|El Paso|review
Keystone Dam Archeological Site|El Paso|El Paso|review
Ursuline Academy|Galveston|Galveston|review
Lyons Avenue Historic District|Houston|Harris|review
Mercedes City Hall and Fire Station|Mercedes|Hidalgo|review
Scotus College|Hebbronville|Jim Hogg|review
Irving Elementary School|Cleburne|Johnson|review
Cibolo Preserve Menger Creek Site|Boerne area|Kendall|review
`.trim();

export const thcRecentListedLandmarks: ThcListedLandmark[] =
  THC_RECENT_LISTED_RAW.split("\n").map((line) => {
    const [year, month, name, town, county, kind] = line.trim().split("|");
    return { year: Number(year), month, name, town, county, kind: kind as ThcLandmarkKind, status: "listed" };
  });

export const thcPendingLandmarks: ThcPendingLandmark[] =
  THC_PENDING_RAW.split("\n").map((line) => {
    const [name, town, county, stage] = line.trim().split("|");
    return { name, town, county, stage: stage as ThcPendingLandmark["stage"], status: "not-yet-listed" };
  });

export const thcListingTotals = {
  listed2026: thcRecentListedLandmarks.filter((landmark) => landmark.year === 2026).length,
  listed2025: thcRecentListedLandmarks.filter((landmark) => landmark.year === 2025).length,
  pending: thcPendingLandmarks.length,
} as const;
