import type { Destination } from "./types";

const checked = "2026-10-09";

/**
 * Independently researched Young County Museum of History & Culture.
 * The nearby courthouse photograph is explicitly contextual; it is not
 * presented as a picture of the museum. Obtain an authorized museum
 * exterior photograph before replacing it.
 */
export const youngCountyMuseumAuthorityDestinations: Destination[] = [{
  id: "museum-young-county-history-culture-graham",
  brandId: "texasdefined",
  slug: "young-county-museum-of-history-and-culture",
  name: "Young County Museum of History & Culture",
  summary: "Visit Graham's Young County Museum of History & Culture for frontier-era artifacts, Indigenous history, ranching and oil heritage, a county timeline, historic maps, oral histories and archival research. Includes independently checked visiting details and a nearby heritage itinerary.",
  category: "historic-sites",
  region: "prairies-lakes",
  geography: {
    primaryRegionId: "prairies-lakes",
    countySlugs: ["young"],
    travelRegionIds: ["prairies-lakes"],
    subregionIds: [],
  },
  nearestTown: "Graham",
  county: "Young County",
  // Approximate downtown Graham center, not a surveyed museum entrance.
  coordinates: { lat: 33.1066, lng: -98.5908 },
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Young_County_courthouse_in_Graham%2C_Texas.jpg?width=1600",
    alt: "Young County Courthouse in downtown Graham, near the Young County Museum; photograph shows the courthouse, not the museum",
    width: 1281,
    height: 849,
    credit: "Context photograph (not the museum): Larry D. Moore · Wikimedia Commons · CC BY 4.0",
  },
  bestSeason: "Year-round for indoor history exhibits; spring and fall are especially pleasant for walking the Graham courthouse square and adding Fort Belknap or Olney.",
  entryNote: "Published public hours: Wednesday–Saturday, 10 a.m.–4 p.m.; other days by appointment. Call 940-282-2887 in advance for groups, a guided interpretation, or archive access. The museum does not publish a clear current admission price on its visitor page; confirm directly rather than assuming admission is free.",
  highlights: [
    "Permanent objects and photographs from Indigenous history, frontier settlement, ranching, and the oil era",
    "Illustrated Young County timeline extending from early regional history into the 1960s",
    "County maps, historical fire-insurance maps, and a historic-site touring map",
    "Nearly 200 books and archival documents; research consultation by appointment",
    "Oral-history interviews and biographies published through the museum",
    "Downtown Graham walking context and a Fort Belknap historical side trip",
  ],
  body: [
    "The Young County Museum of History & Culture is an independent Graham museum collecting, conserving and interpreting county history. Its stated emphasis is the nineteenth century through the 1950s, with permanent exhibits that also address earlier Indigenous histories and later developments. The collection extends beyond display cases to maps, research materials, oral histories, photographs and a steadily growing virtual archive.",
    "The museum publicly lists 609 Fourth Street, Graham, Texas 76450 as its operating address. Its About page describes the former Radford Wholesale Grocery and Warehouse building as its collection home and a possible eventual move to the Goodyear Building nearby. That future project should not be confused with the currently advertised visitor address: verify any relocation or temporary closure with staff before traveling.",
    "The central historical question is why this section of the Brazos became a frontier crossroads. Before Young County existed, Caddo, Anadarko, Waco, Tonkawa and other peoples occupied the wider region, while Comanche and Kiowa power shaped nineteenth-century conflict and movement. The federal Brazos Indian Reservation was established in 1854, and the removal of Native communities in 1859 is essential to understanding what came next. The museum's collections can help visitors approach these subjects as human history, not simply as a backdrop to settler narratives.",
    "Fort Belknap, established by the United States Army in 1851 near modern Newcastle, drew military roads, traders, contractors and settlers into the county. Belknap became Young County's first county seat in 1856 and was a stop on the Butterfield Overland Mail route. Following the Civil War and years of conflict, Graham supplanted Belknap as county seat in 1874. Reading these changes alongside the museum's maps explains why roads, water access and political power moved together.",
    "The Warren Wagon Train Raid of May 18, 1871, is one of the region's best-known events. The attack and subsequent prosecution of Kiowa leaders are best understood within the wider struggles over land, reservations, federal policy, settler expansion and Native sovereignty. The museum's archived histories, paired with the Handbook of Texas, provide starting points for studying how accounts of this period have been preserved and interpreted.",
    "Young County cattlemen organized the Stock-Raisers' Association of North-West Texas in Graham in 1877; it evolved into the Texas and Southwestern Cattle Raisers Association. The museum's ranching and cowboy materials connect equipment and personal objects to the work of livestock production, cattle drives, market access, and local civic institutions. Newcastle's coal development and Olney's agriculture tell other sides of the county economy.",
    "Oil discoveries beginning around 1920 transformed Graham and Olney, bringing workers, infrastructure and boom-and-bust cycles to the region. Petroleum history belongs beside ranching, not in a separate story: wells, roads, banks, schools and new populations reshaped the same communities already connected through cattle and railroads.",
    "Researchers can explore the museum's virtual archives, nearly 200 listed books and documents, county-history biographies, recorded oral histories, an illustrated timeline, and its mapping index. The library is not a lending library; the museum invites study appointments. The maps page also cautions that some historic-site locations are private property and should not be entered without permission.",
    "For a satisfying history day, start with the museum's objects and chronological context, then walk the nearby courthouse square, explore the Old Post Office Museum & Art Center for Graham's Depression-era civic art, and visit Fort Belknap near Newcastle if you have time. The museum's historical references are a gateway to original scholarship rather than a replacement for tribal perspectives, primary records or local expertise.",
  ],
  managingAuthority: "Young County Museum of History & Culture (independent 501(c)(3) nonprofit)",
  officialUrl: "https://ycmohc.com/",
  address: "609 Fourth Street, Graham, TX 76450",
  sourceCheckedAt: checked,
  accessibilityNotes: "Published material does not clearly document all accessibility features or accommodations. Call 940-282-2887 about accessible entrances, exhibits, seating, restrooms or group arrangements.",
  authorityGuide: {
    whyItMatters: "A rare single-county introduction connecting Indigenous homelands and the Brazos reservation to Fort Belknap, frontier transportation, cattle associations, early oil development and the personal archives of Graham and Olney.",
    assessment: {
      recommendedVisit: "A 60–90 minute introductory visit, or longer with staff, research interests or a school group; these are editorial planning suggestions rather than official tour durations.",
      physicalEffort: "Low",
      weatherExposure: "Mostly indoors",
      planningLevel: "Moderate",
      familyFit: "Family-friendly historical objects and educational visits; coordinate school learning activities ahead of time.",
      firstTimeValue: "Best starting point for a history-centered Graham and Fort Belknap day.",
    },
    itineraries: [
      { label: "Graham history sampler", duration: "Around 90 minutes", steps: ["Begin at the Young County Museum to orient yourself to the county timeline.", "Compare exhibit maps with the current Graham street plan.", "Walk toward the courthouse square; view the historic architecture from public sidewalks."] },
      { label: "Downtown museum pair", duration: "Half day", steps: ["Start at the Young County Museum; ask about oral histories and local archives.", "Continue to The Old Post at 510 Third Street for the Oil Fields of Graham mural and rotating exhibitions.", "Finish with a downtown Graham walk, allowing for current operating hours."] },
      { label: "The frontier in context", duration: "Full day", steps: ["Study Indigenous history, the Brazos reservation and Butterfield era at the museum.", "Drive to Fort Belknap near Newcastle to connect the landscape with the chronology.", "Return to Graham or continue toward Olney, respecting private-land boundaries and current access rules."] },
    ],
    sources: [
      { label: "Young County Museum — visitor information", url: "https://ycmohc.com/", scope: "Hours, address, telephone, programs and institutional mission" },
      { label: "Young County Museum — permanent exhibits", url: "https://ycmohc.com/exhibitions/", scope: "Permanent collection subjects and exhibit format" },
      { label: "Young County Museum — virtual archives", url: "https://ycmohc.com/archives/", scope: "Research collection, biographies, library access and oral-history leads" },
      { label: "Young County Museum — Brazos River Indian Reservations", url: "https://ycmohc.com/brazos-rez/", scope: "Local-history archive narrative on federal reservation policies and displacement; corroborate with independent Indigenous and historical sources" },
      { label: "Young County Museum — Warren Wagon Train Raid", url: "https://ycmohc.com/warren-wagon-train-massacre/", scope: "Museum account of the 1871 incident and the Fort Richardson aftermath" },
      { label: "Young County Museum — Satanta", url: "https://ycmohc.com/satanta/", scope: "Museum biography of a Kiowa leader; contextual interpretation, not a substitute for Indigenous perspectives" },
      { label: "Young County Museum — maps", url: "https://ycmohc.com/maps/", scope: "Historic maps, site-tour map and private-property warnings" },
      { label: "Young County Museum — institutional background", url: "https://ycmohc.com/about-us/", scope: "Current collection home and proposed future location" },
      { label: "Handbook of Texas — Young County", url: "https://www.tshaonline.org/handbook/entries/young-county", scope: "Independent regional chronology, Indigenous history, ranching and oil" },
      { label: "Handbook of Texas — Fort Belknap", url: "https://www.tshaonline.org/handbook/entries/fort-belknap", scope: "Army post, military roads and Butterfield context" },
      { label: "Texas Time Travel — Young County Museum", url: "https://texastimetravel.com/directory/young-county-museum-of-history-culture/", scope: "Independent museum directory listing" },
      { label: "Wikimedia Commons — Young County Courthouse image", url: "https://commons.wikimedia.org/wiki/File:Young_County_courthouse_in_Graham,_Texas.jpg", scope: "Image identity, author and Creative Commons license" },
    ],
  },
}];
