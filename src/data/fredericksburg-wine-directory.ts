export type FredericksburgWineLocationKind =
  | "estate-winery"
  | "winery"
  | "urban-tasting-room"
  | "tasting-room"
  | "wine-shop"
  | "winery-resort";

export type FredericksburgWineArea =
  | "Downtown Fredericksburg"
  | "Highway 290 / east Fredericksburg"
  | "Fredericksburg area"
  | "Stonewall"
  | "Hye"
  | "Johnson City corridor"
  | "North / Ranch Road 965";

export interface FredericksburgWineDirectoryEntry {
  id: string;
  name: string;
  producer?: string;
  area: FredericksburgWineArea;
  kind: FredericksburgWineLocationKind;
  summary: string;
  sourceUrl: string;
  sourceLabel: "Official website" | "Visit Fredericksburg" | "Wine Road 290";
  verifiedAt: string;
}

export const FREDERICKSBURG_WINE_DIRECTORY_VERIFIED_AT = "2026-09-19";

const verifiedAt = FREDERICKSBURG_WINE_DIRECTORY_VERIFIED_AT;

export const FREDERICKSBURG_WINE_DIRECTORY: FredericksburgWineDirectoryEntry[] = [
  { id: "augusta-vin", name: "Augusta Vin", area: "Highway 290 / east Fredericksburg", kind: "estate-winery", summary: "Winery and hospitality property with vineyard views and food service.", sourceUrl: "https://augustavin.com/", sourceLabel: "Official website", verifiedAt },
  { id: "invention-vineyards", name: "Invention Vineyards", area: "Highway 290 / east Fredericksburg", kind: "estate-winery", summary: "Heath Family Brands property with estate vineyards, guided tastings and winery-production experiences.", sourceUrl: "https://heathfamilybrands.com/", sourceLabel: "Official website", verifiedAt },
  { id: "michael-ros-winery", name: "Michael Ros Winery", area: "Fredericksburg area", kind: "estate-winery", summary: "Family-owned boutique winery on a Hill Country estate near Highway 290.", sourceUrl: "https://michaelroswinery.com/", sourceLabel: "Official website", verifiedAt },
  { id: "texas-heritage-vineyard", name: "Texas Heritage Vineyard", area: "Highway 290 / east Fredericksburg", kind: "winery", summary: "Texas-wine tasting property pairing wine with regular singer-songwriter programming.", sourceUrl: "https://www.texasheritagevineyard.com/", sourceLabel: "Official website", verifiedAt },
  { id: "fiesta-winery-arch-ray", name: "Fiesta Winery at Arch Ray", producer: "Fiesta Winery", area: "Highway 290 / east Fredericksburg", kind: "tasting-room", summary: "Arch Ray Resort wine stop with a broad Fiesta Winery tasting portfolio.", sourceUrl: "https://www.fiestawinery.com/", sourceLabel: "Official website", verifiedAt },
  { id: "messina-hof-hill-country", name: "Messina Hof Hill Country", area: "Highway 290 / east Fredericksburg", kind: "winery-resort", summary: "Hill Country tasting room with vineyards and on-site accommodations.", sourceUrl: "https://messinahof.com/", sourceLabel: "Official website", verifiedAt },
  { id: "texas-wine-collective", name: "Texas Wine Collective", area: "Highway 290 / east Fredericksburg", kind: "tasting-room", summary: "Shared tasting destination featuring Brennan Vineyards, Lost Oak Winery and McPherson Cellars.", sourceUrl: "https://www.texaswinecollective.com/", sourceLabel: "Official website", verifiedAt },
  { id: "signor-vineyards", name: "Signor Vineyards", area: "Highway 290 / east Fredericksburg", kind: "estate-winery", summary: "Vineyard and tasting property with landscaped grounds, indoor and outdoor tastings and food options.", sourceUrl: "https://www.signorvineyards.com/", sourceLabel: "Official website", verifiedAt },
  { id: "grape-creek-vineyards", name: "Grape Creek Vineyards", area: "Highway 290 / east Fredericksburg", kind: "estate-winery", summary: "Large vineyard destination with tastings, tours, barrel experiences and on-site dining.", sourceUrl: "https://www.grapecreek.com/", sourceLabel: "Official website", verifiedAt },
  { id: "jenblossom-cellars", name: "Jenblossom Cellars", area: "Highway 290 / east Fredericksburg", kind: "tasting-room", summary: "Seated premium-wine tasting experience hosted at the Grape Creek estate.", sourceUrl: "https://heathfamilybrands.com/", sourceLabel: "Official website", verifiedAt },
  { id: "heath-sparkling-wines", name: "Heath Sparkling Wines", area: "Highway 290 / east Fredericksburg", kind: "tasting-room", summary: "Sparkling-wine tasting experience with paired small bites on the Grape Creek campus.", sourceUrl: "https://www.heathsparkling.com/", sourceLabel: "Official website", verifiedAt },
  { id: "barons-creek-vineyards", name: "Barons Creek Vineyards", area: "Highway 290 / east Fredericksburg", kind: "winery-resort", summary: "Wine property with tastings, group space and villas.", sourceUrl: "https://www.visitfredericksburgtx.com/directory/barons-creek-vineyards/", sourceLabel: "Visit Fredericksburg", verifiedAt },
  { id: "longhorn-cellars", name: "Longhorn Cellars", area: "Fredericksburg area", kind: "winery", summary: "Small-lot Texas Hill Country winery and tasting destination.", sourceUrl: "https://www.visitfredericksburgtx.com/directory/longhorn-cellars/", sourceLabel: "Visit Fredericksburg", verifiedAt },
  { id: "becker-vineyards-estate", name: "Becker Vineyards", producer: "Becker Vineyards", area: "Stonewall", kind: "estate-winery", summary: "Long-running Stonewall-area winery with tastings, tours, events and vineyard grounds.", sourceUrl: "https://www.beckervineyards.com/", sourceLabel: "Official website", verifiedAt },
  { id: "hilmy-cellars", name: "Hilmy Cellars", area: "Highway 290 / east Fredericksburg", kind: "estate-winery", summary: "Winery and vineyard focused on Texas-grown wine and farming.", sourceUrl: "https://hilmywine.com/", sourceLabel: "Official website", verifiedAt },
  { id: "k-estate-vineyards", name: "K Estate Vineyards", area: "Stonewall", kind: "estate-winery", summary: "Estate vineyards, production winery, guided tastings and bistro dining.", sourceUrl: "https://www.visitfredericksburgtx.com/directory/k-estate-vineyards/", sourceLabel: "Visit Fredericksburg", verifiedAt },
  { id: "narrow-path-estate", name: "Narrow Path Winery", producer: "Narrow Path Winery", area: "Fredericksburg area", kind: "estate-winery", summary: "Small-batch wine property using estate fruit alongside selected Texas and California grapes.", sourceUrl: "https://narrowpathwinery.com/", sourceLabel: "Official website", verifiedAt },
  { id: "barelle-vineyards", name: "Barelle Vineyards", area: "Highway 290 / east Fredericksburg", kind: "winery", summary: "Wine destination east of Fredericksburg on the Highway 290 corridor.", sourceUrl: "https://www.visitfredericksburgtx.com/listing/barelle-vineyards/3606/", sourceLabel: "Visit Fredericksburg", verifiedAt },
  { id: "safari-winery", name: "Safari Winery", area: "Highway 290 / east Fredericksburg", kind: "tasting-room", summary: "Highway 290 wine-tasting destination in the Fredericksburg corridor.", sourceUrl: "https://www.visitfredericksburgtx.com/listing/safari-winery/2962/", sourceLabel: "Visit Fredericksburg", verifiedAt },
  { id: "slate-theory-winery", name: "Slate Theory Winery", area: "Highway 290 / east Fredericksburg", kind: "winery", summary: "Wine property known for its distinctive tasting setting along the Fredericksburg corridor.", sourceUrl: "https://www.visitfredericksburgtx.com/listing/slate-theory-winery/3318/", sourceLabel: "Visit Fredericksburg", verifiedAt },
  { id: "mendelbaum-cellars", name: "Mendelbaum Cellars", area: "Highway 290 / east Fredericksburg", kind: "tasting-room", summary: "Highway 290 tasting room featuring wines from Texas and Israel.", sourceUrl: "https://www.visitfredericksburgtx.com/directory/mendelbaum-cellars/", sourceLabel: "Visit Fredericksburg", verifiedAt },
  { id: "the-edge-tasting-room", name: "The Edge Tasting Room", area: "Highway 290 / east Fredericksburg", kind: "tasting-room", summary: "Tasting room at The Resort at Fredericksburg featuring estate-grown High Plains wines.", sourceUrl: "https://www.visitfredericksburgtx.com/directory/the-edge-tasting-room/", sourceLabel: "Visit Fredericksburg", verifiedAt },
  { id: "inwood-estates-winery-bistro", name: "Inwood Estates Winery & Bistro", area: "Highway 290 / east Fredericksburg", kind: "winery", summary: "Winery and bistro pairing wine tasting with food on the Fredericksburg corridor.", sourceUrl: "https://www.visitfredericksburgtx.com/listing/inwood-estates-winery-%26-bistro/1138/", sourceLabel: "Visit Fredericksburg", verifiedAt },
  { id: "airisele-vineyards", name: "Airis'Ele Vineyards", area: "Fredericksburg area", kind: "winery", summary: "Fredericksburg-area winery and tasting destination.", sourceUrl: "https://www.visitfredericksburgtx.com/listing/airisele-vineyards/3403/", sourceLabel: "Visit Fredericksburg", verifiedAt },
  { id: "alexander-vineyards", name: "Alexander Vineyards", area: "Fredericksburg area", kind: "tasting-room", summary: "Wine-focused tasting destination in Fredericksburg wine country.", sourceUrl: "https://www.visitfredericksburgtx.com/listing/alexander-vineyards/2302/", sourceLabel: "Visit Fredericksburg", verifiedAt },
  { id: "kalasi-cellars", name: "Kalasi Cellars", area: "Fredericksburg area", kind: "tasting-room", summary: "Tasting room focused on wines made from Texas High Plains fruit.", sourceUrl: "https://www.visitfredericksburgtx.com/directory/kalasi-cellars/", sourceLabel: "Visit Fredericksburg", verifiedAt },
  { id: "diamond-vineyards", name: "Diamond Vineyards", area: "Fredericksburg area", kind: "estate-winery", summary: "Ranch and vineyard property in the Fredericksburg area.", sourceUrl: "https://www.visitfredericksburgtx.com/listing/diamond-vineyards/2846/", sourceLabel: "Visit Fredericksburg", verifiedAt },
  { id: "fat-ass-ranch-winery", name: "Fat Ass Ranch & Winery", area: "Fredericksburg area", kind: "winery", summary: "Wine-country property with a separate downtown tasting-room presence.", sourceUrl: "https://www.visitfredericksburgtx.com/listing/fat-ass-ranch-%26-winery/1560/", sourceLabel: "Visit Fredericksburg", verifiedAt },
  { id: "land-of-promise-winery", name: "Land of Promise Winery", area: "North / Ranch Road 965", kind: "winery", summary: "Appointment-oriented winery experience north of Main Street on Ranch Road 965.", sourceUrl: "https://www.visitfredericksburgtx.com/directory/land-of-promise-winery/", sourceLabel: "Visit Fredericksburg", verifiedAt },
  { id: "pedernales-cellars", name: "Pedernales Cellars", area: "Stonewall", kind: "estate-winery", summary: "Stonewall-area winery with reservation-oriented tasting experiences.", sourceUrl: "https://www.pedernalescellars.com/", sourceLabel: "Official website", verifiedAt },
  { id: "reddy-wines", name: "Reddy Wines", area: "Stonewall", kind: "estate-winery", summary: "Stonewall tasting room for estate-grown Texas wines.", sourceUrl: "https://www.visitfredericksburgtx.com/directory/reddy-wines/", sourceLabel: "Visit Fredericksburg", verifiedAt },
  { id: "meierstone-vineyards", name: "Meierstone Vineyards", area: "Stonewall", kind: "estate-winery", summary: "Winery on a fifth-generation working farm and ranch using Texas grapes.", sourceUrl: "https://www.visitfredericksburgtx.com/directory/meierstone-vineyards/", sourceLabel: "Visit Fredericksburg", verifiedAt },
  { id: "adega-vinho-winery", name: "Adega Vinho Winery", area: "Stonewall", kind: "winery", summary: "Stonewall winery and tasting/event property on Ranch Road 1623.", sourceUrl: "https://www.visitfredericksburgtx.com/directory/adega-vinho-winery/", sourceLabel: "Visit Fredericksburg", verifiedAt },
  { id: "featherstone-ranch-vineyards", name: "Featherstone Ranch Vineyards", area: "Stonewall", kind: "estate-winery", summary: "Family-owned working ranch and vineyard near Stonewall producing Texas wines.", sourceUrl: "https://www.visitfredericksburgtx.com/directory/featherstone-ranch-vineyards/", sourceLabel: "Visit Fredericksburg", verifiedAt },
  { id: "ab-astris-winery", name: "Ab Astris Winery", area: "Stonewall", kind: "winery", summary: "Stonewall wine property on the eastern Gillespie County corridor.", sourceUrl: "https://www.visitfredericksburgtx.com/listing/ab-astris-winery/2572/", sourceLabel: "Visit Fredericksburg", verifiedAt },
  { id: "hye-meadow-winery", name: "Hye Meadow Winery", area: "Hye", kind: "winery", summary: "Hye-area winery offering tastings, tours and food options on a large Hill Country property.", sourceUrl: "https://www.hyemeadow.com/", sourceLabel: "Official website", verifiedAt },
  { id: "ron-yates-wines", name: "Ron Yates Wines", area: "Hye", kind: "winery", summary: "Family-operated Hye winery making Spanish-, Italian- and Rhône-style wines.", sourceUrl: "https://www.ronyateswines.com/", sourceLabel: "Official website", verifiedAt },
  { id: "william-chris-vineyards", name: "William Chris Vineyards", area: "Hye", kind: "estate-winery", summary: "Major Hye-area wine producer and tasting destination on the eastern Hill Country route.", sourceUrl: "https://www.williamchriswines.com/", sourceLabel: "Official website", verifiedAt },
  { id: "coordinates-hye", name: "Coordinates Vineyards — Hye", producer: "Coordinates Vineyards", area: "Hye", kind: "winery", summary: "Hye-area property associated with the producer's downtown Fredericksburg tasting room.", sourceUrl: "https://www.visitfredericksburgtx.com/listing/coordinates-vineyards/3196/", sourceLabel: "Visit Fredericksburg", verifiedAt },
  { id: "carter-creek-winery-resort", name: "Carter Creek Winery Resort & Spa", area: "Johnson City corridor", kind: "winery-resort", summary: "Winery resort with tastings, dining, lodging, live music and an on-site brewery.", sourceUrl: "https://www.cartercreek.com/", sourceLabel: "Official website", verifiedAt },
  { id: "siboney-cellars", name: "Siboney Cellars", area: "Johnson City corridor", kind: "estate-winery", summary: "Hillside winery overlooking an estate vineyard with Texas wine and culinary programming.", sourceUrl: "https://www.siboneycellars.com/", sourceLabel: "Official website", verifiedAt },
  { id: "texas-hills-vineyard", name: "Texas Hills Vineyard", area: "Johnson City corridor", kind: "winery", summary: "Johnson City winery producing food-friendly wines from Texas-sourced grapes.", sourceUrl: "https://www.texashillsvineyard.com/", sourceLabel: "Official website", verifiedAt },
  { id: "fredericksburg-winery", name: "Fredericksburg Winery", area: "Downtown Fredericksburg", kind: "urban-tasting-room", summary: "Long-running family winery and tasting room on Main Street.", sourceUrl: "https://www.fbgwinery.com/", sourceLabel: "Official website", verifiedAt },
  { id: "texas-wine-cellars", name: "Texas Wine Cellars", area: "Downtown Fredericksburg", kind: "urban-tasting-room", summary: "Main Street tasting room focused on Texas wine with Texas and German beer also available.", sourceUrl: "https://www.visitfredericksburgtx.com/directory/texas-wine-cellars/", sourceLabel: "Visit Fredericksburg", verifiedAt },
  { id: "buli-limestone-wines", name: "Buli Limestone Wines", area: "Downtown Fredericksburg", kind: "urban-tasting-room", summary: "Downtown tasting room built around guided comparisons of Texas and Italian wines.", sourceUrl: "https://www.visitfredericksburgtx.com/directory/buli-limestone-wines/", sourceLabel: "Visit Fredericksburg", verifiedAt },
  { id: "english-newsom-cellars", name: "English Newsom Cellars", area: "Downtown Fredericksburg", kind: "urban-tasting-room", summary: "Downtown tasting room for estate-grown Texas High Plains wines from the Newsom family.", sourceUrl: "https://www.visitfredericksburgtx.com/directory/english-newsom-cellars/", sourceLabel: "Visit Fredericksburg", verifiedAt },
  { id: "sauceda-cellars", name: "Sauceda Cellars", area: "Downtown Fredericksburg", kind: "urban-tasting-room", summary: "Downtown tasting room connecting Texas wine with the Bogel family's West Texas ranch history.", sourceUrl: "https://www.visitfredericksburgtx.com/directory/sauceda-cellars/", sourceLabel: "Visit Fredericksburg", verifiedAt },
  { id: "coordinates-downtown", name: "Coordinates Vineyards — Downtown", producer: "Coordinates Vineyards", area: "Downtown Fredericksburg", kind: "urban-tasting-room", summary: "Downtown tasting room for a producer with a separate Hye-area property.", sourceUrl: "https://www.visitfredericksburgtx.com/listing/coordinates-vineyards/3196/", sourceLabel: "Visit Fredericksburg", verifiedAt },
  { id: "texas-vineyards-beyond", name: "Texas Vineyards & Beyond", area: "Downtown Fredericksburg", kind: "wine-shop", summary: "Downtown wine shop and tasting destination.", sourceUrl: "https://www.visitfredericksburgtx.com/listing/texas-vineyards-%26-beyond/2834/", sourceLabel: "Visit Fredericksburg", verifiedAt },
  { id: "cross-mountain-vineyards", name: "Cross Mountain Vineyards", area: "Downtown Fredericksburg", kind: "urban-tasting-room", summary: "Downtown Fredericksburg wine tasting room.", sourceUrl: "https://www.visitfredericksburgtx.com/listing/cross-mountain-vineyards/3125/", sourceLabel: "Visit Fredericksburg", verifiedAt },
  { id: "pontotoc-vineyard-weingarten", name: "Pontotoc Vineyard Weingarten", area: "Downtown Fredericksburg", kind: "urban-tasting-room", summary: "Fredericksburg wine garden and tasting destination.", sourceUrl: "https://www.visitfredericksburgtx.com/listing/pontotoc-vineyard-weingarten/1758/", sourceLabel: "Visit Fredericksburg", verifiedAt },
  { id: "narrow-path-main", name: "Narrow Path Winery on Main Street", producer: "Narrow Path Winery", area: "Downtown Fredericksburg", kind: "urban-tasting-room", summary: "Intimate Main Street tasting room for Narrow Path Winery.", sourceUrl: "https://narrowpathwinery.com/", sourceLabel: "Official website", verifiedAt },
  { id: "fiesta-winery-main", name: "Fiesta Winery on Main Street", producer: "Fiesta Winery", area: "Downtown Fredericksburg", kind: "urban-tasting-room", summary: "Main Street tasting room for Fiesta Winery.", sourceUrl: "https://www.fiestawinery.com/", sourceLabel: "Official website", verifiedAt },
  { id: "grape-creek-main", name: "Grape Creek on Main", producer: "Grape Creek Vineyards", area: "Downtown Fredericksburg", kind: "urban-tasting-room", summary: "Historic downtown tasting room serving Grape Creek and Heath Sparkling collections.", sourceUrl: "https://www.grapecreek.com/", sourceLabel: "Official website", verifiedAt },
  { id: "becker-main", name: "Becker Vineyards on Main Street", producer: "Becker Vineyards", area: "Downtown Fredericksburg", kind: "urban-tasting-room", summary: "Downtown tasting location for the Stonewall-area producer.", sourceUrl: "https://www.beckervineyards.com/", sourceLabel: "Official website", verifiedAt },
  { id: "six-shooter-cellars", name: "Six Shooter Cellars", area: "Downtown Fredericksburg", kind: "urban-tasting-room", summary: "Downtown wine tasting room offering a multi-winery selection in Fredericksburg.", sourceUrl: "https://www.visitfredericksburgtx.com/directory/six-shooter-cellars/", sourceLabel: "Visit Fredericksburg", verifiedAt },
];

export const FREDERICKSBURG_WINE_DIRECTORY_AREAS: FredericksburgWineArea[] = [
  "Downtown Fredericksburg",
  "Highway 290 / east Fredericksburg",
  "Fredericksburg area",
  "North / Ranch Road 965",
  "Stonewall",
  "Hye",
  "Johnson City corridor",
];

export function fredericksburgWineDirectoryByArea(area: FredericksburgWineArea) {
  return FREDERICKSBURG_WINE_DIRECTORY.filter((entry) => entry.area === area);
}
