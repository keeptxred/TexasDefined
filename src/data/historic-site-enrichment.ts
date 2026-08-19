import { exploreHeroMap } from "./explore-hero-map";
import type { Destination, DestinationAreaGuide, DestinationAreaItemList } from "./types";

type AreaSeed = {
  intro: string;
  nearby: DestinationAreaItemList;
  food: DestinationAreaItemList;
  lodging: DestinationAreaItemList;
  neighborhoods: DestinationAreaItemList;
  family: DestinationAreaItemList;
  sideTrips: DestinationAreaItemList;
};

const heroAliases: Record<string, string> = {
  "barrington-living-history-farm": "barrington-farm-site",
  "fanthorp-inn": "fanthorp-inn-state-historic-site",
  "kreische-brewery": "monument-hill-kreische-brewery-state-historic-site",
  "monument-hill": "monument-hill-kreische-brewery-state-historic-site",
  "san-jacinto-battleground": "san-jacinto-battleground",
  "washington-on-the-brazos": "washington-on-the-brazos",
};

const areaSeeds: Record<string, AreaSeed> = {
  "washington-on-the-brazos": {
    intro: "Make Washington-on-the-Brazos the anchor of a Washington County history day. Barrington Living History Farm and the Star of the Republic Museum are part of the same independence-era landscape, while Brenham makes the practical dining and overnight base.",
    nearby: [
      { name: "Barrington Living History Farm", description: "Anson Jones's farm adds living-history interpretation of Republic-era work and domestic life.", proximity: "On the same historic complex", href: "/destination/barrington-living-history-farm" },
      { name: "Star of the Republic Museum", description: "The museum supplies the artifact-rich Republic of Texas context for the larger site.", proximity: "On the same historic complex", href: "/destination/star-of-the-republic-museum" },
    ],
    food: [{ name: "Brenham", description: "Use the courthouse-square area for cafes, bakeries and restaurants.", proximity: "About 20 miles" }],
    lodging: [{ name: "Brenham", description: "The most practical overnight base for Washington County history and Bluebonnet-country drives." }],
    neighborhoods: [{ name: "Washington historic landscape", description: "The Brazos River corridor helps explain why delegates gathered here in 1836." }],
    family: [{ name: "Barrington demonstrations", description: "Hands-on living history gives younger visitors a concrete entry into Republic-era daily life.", href: "/destination/barrington-living-history-farm" }],
    sideTrips: [{ name: "San Felipe de Austin", description: "Continue the story at Stephen F. Austin's colonial headquarters.", href: "/destination/san-felipe-de-austin" }],
  },
  "san-jacinto-battleground": {
    intro: "Build a Houston-area history day around the battlefield, monument and museum, then use the surrounding Ship Channel landscape to understand how dramatically this part of Texas changed after 1836.",
    nearby: [
      { name: "San Jacinto Monument and Museum", description: "Start with the monument and museum before walking the battlefield landscape.", proximity: "At the battleground" },
      { name: "Battleship Texas", description: "A separate military-history landmark long associated with the San Jacinto area; verify current visitor access before planning.", href: "/destination/battleship-texas" },
    ],
    food: [{ name: "La Porte", description: "A convenient meal stop near the battleground." }],
    lodging: [{ name: "Bay Area Houston", description: "La Porte, Baytown and Clear Lake provide broad overnight options for a multi-stop trip." }],
    neighborhoods: [{ name: "Houston Ship Channel corridor", description: "Modern industry makes the surviving 1836 battlefield geography especially striking." }],
    family: [{ name: "Museum plus battlefield walk", description: "Pair indoor interpretation with the outdoor landscape so the battle has both narrative and scale." }],
    sideTrips: [{ name: "The Alamo", description: "Connect San Jacinto to the earlier San Antonio campaign on a larger Texas Revolution itinerary.", href: "/destination/the-alamo" }],
  },
  "presidio-la-bahia": {
    intro: "Goliad is best treated as one connected history district. Presidio La Bahía, Fannin Battleground and the mission landscape together explain Spanish Texas, Mexican Texas and the Goliad campaign far better than any one stop alone.",
    nearby: [
      { name: "Fannin Battleground", description: "The Coleto battlefield explains how Fannin's command was surrounded before the events at Goliad.", href: "/destination/fannin-battleground" },
      { name: "Goliad State Park and Historic Site", description: "Mission Espíritu Santo adds the Spanish mission story to the military route.", href: "/destination/goliad-state-park" },
    ],
    food: [{ name: "Downtown Goliad", description: "Use the courthouse square between the mission, presidio and battlefield." }],
    lodging: [{ name: "Goliad", description: "A local overnight makes the three-site history circuit much less rushed." }],
    neighborhoods: [{ name: "Goliad courthouse square", description: "The historic civic center adds the town's later history to the military and mission story." }],
    family: [{ name: "Mission-presidio circuit", description: "Short driving distances make Goliad unusually manageable for a family history day." }],
    sideTrips: [{ name: "Fannin Battleground", description: "Visit the Coleto landscape as the chronological companion to La Bahía.", href: "/destination/fannin-battleground" }],
  },
  "fannin-battleground": {
    intro: "Visit the Coleto battlefield before Presidio La Bahía to follow the Goliad campaign in sequence—from the surrounded Texian column to the surrender and its aftermath.",
    nearby: [{ name: "Presidio La Bahía", description: "The essential companion stop for understanding what followed Fannin's surrender.", href: "/destination/presidio-la-bahia" }],
    food: [{ name: "Downtown Goliad", description: "The courthouse square is the easiest meal stop." }],
    lodging: [{ name: "Goliad", description: "Stay locally if combining battlefield, presidio and mission sites." }],
    neighborhoods: [{ name: "Coleto Creek landscape", description: "The open terrain is central to understanding why Fannin's column was vulnerable." }],
    family: [{ name: "Chronological Goliad route", description: "Battlefield first, presidio second gives younger visitors a clearer narrative." }],
    sideTrips: [{ name: "Presidio La Bahía", description: "Continue the story at the presidio associated with the Goliad campaign.", href: "/destination/presidio-la-bahia" }],
  },
  "casa-navarro": {
    intro: "Casa Navarro belongs in a broader San Antonio history route. Pair José Antonio Navarro's Tejano political story with the Alamo and the missions so the city's past is not reduced to military history alone.",
    nearby: [
      { name: "The Alamo", description: "A downtown military landmark that gains context when paired with Navarro's political story.", href: "/destination/the-alamo" },
      { name: "San Antonio Missions National Historical Park", description: "The mission chain extends the timeline into Spanish colonial and Indigenous history.", href: "/destination/san-antonio-missions-national-historical-park" },
    ],
    food: [{ name: "Market Square and downtown", description: "The easiest nearby concentration of restaurants and cafes." }],
    lodging: [{ name: "Downtown San Antonio", description: "A walkable base for Casa Navarro and the Alamo, with short drives to the missions." }],
    neighborhoods: [{ name: "Historic west side of downtown", description: "The surrounding street pattern helps place Navarro's home within 19th-century San Antonio." }],
    family: [{ name: "Casa Navarro plus the missions", description: "Balance the focused historic-home stop with the larger outdoor mission grounds." }],
    sideTrips: [{ name: "San Antonio Missions", description: "Extend the story backward into Spanish colonial Texas.", href: "/destination/san-antonio-missions-national-historical-park" }],
  },
  "fort-martin-scott": {
    intro: "Use Fort Martin Scott as part of a Fredericksburg history day connecting German settlement, U.S. Army expansion and 20th-century military history.",
    nearby: [{ name: "National Museum of the Pacific War", description: "A nationally significant World War II museum just minutes from the frontier fort.", href: "/destination/national-museum-pacific-war" }],
    food: [{ name: "Main Street Fredericksburg", description: "German-Texas restaurants, bakeries and cafes make the historic core the natural meal stop." }],
    lodging: [{ name: "Fredericksburg", description: "Stay in town for the fort, museum, German heritage and Hill Country side trips." }],
    neighborhoods: [{ name: "Fredericksburg historic core", description: "Historic buildings and the settlement pattern put the fort's 1848 founding in context." }],
    family: [{ name: "Fort grounds", description: "The open-air site provides room to explore before a denser museum visit downtown." }],
    sideTrips: [{ name: "National Museum of the Pacific War", description: "Jump forward a century in military history without leaving Fredericksburg.", href: "/destination/national-museum-pacific-war" }],
  },
  "kreische-brewery": {
    intro: "See Kreische Brewery and Monument Hill together. One landscape combines German immigration and enterprise with Republic-era military memory above the Colorado River.",
    nearby: [{ name: "Monument Hill", description: "The adjacent memorial landscape gives the brewery visit a very different historical frame.", href: "/destination/monument-hill" }],
    food: [{ name: "La Grange", description: "Downtown provides cafes, bakeries and restaurants below the bluff." }],
    lodging: [{ name: "La Grange", description: "A practical overnight base for Fayette County heritage and Painted Churches routes." }],
    neighborhoods: [{ name: "Colorado River bluff", description: "The terrain helps explain both water-powered industry and the memorial's commanding position." }],
    family: [{ name: "Hilltop ruins and overlooks", description: "The combined site mixes tangible ruins, landscape and memorial interpretation." }],
    sideTrips: [{ name: "Painted Churches of Texas", description: "Continue the German and Czech cultural-history theme through the nearby church corridor.", href: "/explore/painted-churches" }],
  },
  "monument-hill": {
    intro: "Monument Hill is strongest when visited with the adjacent Kreische Brewery, connecting military memory to the German immigrant economy that later reshaped Fayette County.",
    nearby: [{ name: "Kreische Brewery", description: "The brewery ruins add immigration, industry and entrepreneurship to the same hilltop visit.", href: "/destination/kreische-brewery" }],
    food: [{ name: "La Grange", description: "The courthouse town below the bluff is the natural meal stop." }],
    lodging: [{ name: "La Grange", description: "A convenient base for Fayette County and Painted Churches drives." }],
    neighborhoods: [{ name: "Colorado River bluff", description: "The overlook makes the commemorative power of the setting immediately visible." }],
    family: [{ name: "Memorial and brewery ruins", description: "Pair the monument with tangible ruins and overlooks to vary the visit." }],
    sideTrips: [{ name: "Kreische Brewery", description: "Walk directly into the immigrant-industry half of the shared landscape.", href: "/destination/kreische-brewery" }],
  },
  "magoffin-home": {
    intro: "Start an El Paso borderlands history day at Magoffin Home, then connect family life, trade and adobe architecture to the mission corridor and later U.S.–Mexico boundary history.",
    nearby: [
      { name: "Chamizal National Memorial", description: "A later chapter in border history centered on diplomacy and boundary change.", href: "/destination/chamizal-national-memorial" },
      { name: "Old Socorro Mission", description: "Extend the route into the Lower Valley's earlier mission history.", href: "/destination/old-socorro-mission" },
    ],
    food: [{ name: "Downtown El Paso", description: "A dense concentration of borderland food traditions close to the historic core." }],
    lodging: [{ name: "Downtown El Paso", description: "A central base for Magoffin Home, museums and the Lower Valley missions." }],
    neighborhoods: [{ name: "Magoffin Historic District", description: "Walk the surrounding streets to understand the home's place in early El Paso growth." }],
    family: [{ name: "Home plus Chamizal", description: "Balance an indoor historic-home visit with Chamizal's open grounds." }],
    sideTrips: [{ name: "Old Socorro Mission", description: "Continue east for an earlier layer of borderlands history.", href: "/destination/old-socorro-mission" }],
  },
  "caddo-mounds-state-historic-site": {
    intro: "Treat Caddo Mounds as a foundational Texas-history stop in its own right. The site places ancestral Caddo history and the Piney Woods landscape before the later Spanish, Mexican and Anglo chapters.",
    nearby: [{ name: "Mission Tejas State Park", description: "A nearby Spanish-mission story best visited after understanding the Caddo landscape on its own terms.", href: "/destination/mission-tejas-state-park" }],
    food: [{ name: "Alto and Nacogdoches corridor", description: "Plan meals before arrival because services are spread out." }],
    lodging: [{ name: "Nacogdoches", description: "The larger overnight base for a multi-stop East Texas history route." }],
    neighborhoods: [{ name: "Caddo homeland", description: "The landscape itself is part of the story; leave time for the outdoor interpretation." }],
    family: [{ name: "Mounds and interpretive grounds", description: "The outdoor site helps younger visitors understand scale and place." }],
    sideTrips: [{ name: "Mission Tejas State Park", description: "Compare Indigenous and Spanish-colonial histories in the same region.", href: "/destination/mission-tejas-state-park" }],
  },
  "first-capitol-of-texas": {
    intro: "West Columbia and nearby Brazoria County sites make a compact route through the first Republic government, Stephen F. Austin's final days, plantation history and the later oil era.",
    nearby: [
      { name: "Stephen F. Austin Memorial", description: "Marks the place associated with the home where Austin died in December 1836.", href: "/destination/stephen-f-austin-memorial" },
      { name: "Varner-Hogg Plantation", description: "Adds slavery, emancipation, agriculture and oil wealth to the county story.", href: "/destination/varner-hogg-plantation" },
    ],
    food: [{ name: "West Columbia", description: "The practical meal stop between the historic sites." }],
    lodging: [{ name: "Brazoria County", description: "Lake Jackson and nearby communities offer the broadest overnight options." }],
    neighborhoods: [{ name: "Old Columbia and the Brazos corridor", description: "The river helps explain why early political and commercial centers developed here." }],
    family: [{ name: "First Capitol plus Varner-Hogg", description: "Combine a compact political-history stop with a larger historic property." }],
    sideTrips: [{ name: "San Felipe de Austin", description: "Trace Austin's colony back to its earlier headquarters.", href: "/destination/san-felipe-de-austin" }],
  },
  "varner-hogg-plantation": {
    intro: "Use Varner-Hogg as the deeper social-history stop in a Brazoria County route, adding labor, slavery, emancipation, agriculture and oil to the nearby Republic-era political story.",
    nearby: [
      { name: "First Capitol of Texas", description: "Connect the plantation landscape to the Republic's first political center.", href: "/destination/first-capitol-of-texas" },
      { name: "Stephen F. Austin Memorial", description: "Add Austin's final chapter to the same West Columbia route.", href: "/destination/stephen-f-austin-memorial" },
    ],
    food: [{ name: "West Columbia", description: "The nearest practical meal stop." }],
    lodging: [{ name: "Lake Jackson and Brazoria County", description: "A convenient base for a two-day county history route." }],
    neighborhoods: [{ name: "Lower Brazos plantation landscape", description: "The river and agricultural land are essential context for the site's economy." }],
    family: [{ name: "Grounds and layered timeline", description: "Use the landscape to connect the site's different eras rather than presenting one frozen moment." }],
    sideTrips: [{ name: "Levi Jordan Plantation", description: "Compare two Brazoria County plantation sites with different archaeological and interpretive strengths.", href: "/destination/levi-jordan-plantation" }],
  },
  "levi-jordan-plantation": {
    intro: "Pair Levi Jordan with Varner-Hogg for a broader Brazoria County route about slavery, emancipation, archaeology, agriculture and community life before and after the Civil War.",
    nearby: [{ name: "Varner-Hogg Plantation", description: "A second major plantation landscape that extends the story into later agriculture and oil wealth.", href: "/destination/varner-hogg-plantation" }],
    food: [{ name: "Brazoria and Lake Jackson", description: "Plan meals around the larger nearby communities." }],
    lodging: [{ name: "Lake Jackson", description: "A practical base for plantation, Republic and Gulf Coast history stops." }],
    neighborhoods: [{ name: "Lower Brazos agricultural landscape", description: "The geography helps explain plantation agriculture and river transportation." }],
    family: [{ name: "Archaeology and community stories", description: "Center the people who lived and worked here rather than treating the site as architecture alone." }],
    sideTrips: [{ name: "Varner-Hogg Plantation", description: "Compare two major plantation histories within the same county.", href: "/destination/varner-hogg-plantation" }],
  },
};

function toAreaGuide(seed: AreaSeed): DestinationAreaGuide {
  return { intro: seed.intro, nearbyAttractions: seed.nearby, foodAndDrink: seed.food, lodging: seed.lodging, neighborhoods: seed.neighborhoods, familyStops: seed.family, sideTrips: seed.sideTrips };
}

function normalizeCounty(destination: Destination): Destination {
  if (destination.category !== "historic-sites" || !destination.county) return destination;
  return { ...destination, county: destination.county.replace(/\s+County$/i, "").trim() };
}

export function enrichHistoricSiteDestination(destination: Destination): Destination {
  if (destination.category !== "historic-sites") return destination;
  const heroKey = heroAliases[destination.slug];
  const hero = heroKey ? exploreHeroMap[heroKey] : undefined;
  const areaSeed = areaSeeds[destination.slug];
  return normalizeCounty({ ...destination, ...(hero ? { hero } : {}), ...(areaSeed ? { areaGuide: toAreaGuide(areaSeed) } : {}) });
}

export function enrichHistoricSiteCatalog(destinations: Destination[]): Destination[] {
  return destinations.map(enrichHistoricSiteDestination);
}
