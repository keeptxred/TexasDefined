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
    intro: "Treat Washington-on-the-Brazos as the anchor for a full Washington County history day rather than a stand-alone monument stop. Barrington Living History Farm and the Star of the Republic Museum are part of the same larger story, while Brenham and Independence extend the route into settlement, education and community history.",
    nearby: [
      { name: "Barrington Living History Farm", description: "Anson Jones's farm and living-history interpretation of Republic-era agriculture and domestic life.", proximity: "On the Washington-on-the-Brazos complex", href: "/destination/barrington-living-history-farm" },
      { name: "Star of the Republic Museum", description: "Artifact-rich interpretation of the Republic of Texas and the independence convention landscape.", proximity: "On the Washington-on-the-Brazos complex", href: "/destination/star-of-the-republic-museum" },
    ],
    food: [{ name: "Brenham", description: "The nearest larger dining base, with courthouse-square restaurants, cafes and bakeries.", proximity: "Roughly 20 miles" }],
    lodging: [{ name: "Brenham lodging", description: "Use Brenham as the practical overnight base for Washington County history stops and Bluebonnet-country drives.", proximity: "Roughly 20 miles" }],
    neighborhoods: [{ name: "Washington historic landscape", description: "The Brazos River corridor and former townsite explain why this became a political meeting point in 1836." }],
    family: [{ name: "Living-history demonstrations", description: "Barrington's hands-on interpretation gives younger visitors a concrete way into Republic-era daily life.", href: "/destination/barrington-living-history-farm" }],
    sideTrips: [{ name: "San Felipe de Austin", description: "Continue the independence story at Stephen F. Austin's colonial headquarters and political center of Mexican Texas.", href: "/destination/san-felipe-de-austin" }],
  },
  "san-jacinto-battleground": {
    intro: "San Jacinto works best as a Houston-area history day built around the battlefield itself, the monument and museum, and the industrial Ship Channel landscape that now surrounds the 1836 site.",
    nearby: [
      { name: "San Jacinto Monument and Museum", description: "The monument and museum provide the clearest overview before or after walking the battlefield landscape.", proximity: "At the battleground" },
      { name: "Battleship Texas", description: "A separate military-history landmark historically associated with the San Jacinto site; verify its current visitor location and access before planning.", href: "/destination/battleship-texas" },
    ],
    food: [{ name: "La Porte", description: "Use La Porte for casual restaurants and a practical meal stop before or after the battleground.", proximity: "Nearby" }],
    lodging: [{ name: "Bay Area Houston", description: "La Porte, Baytown and the Clear Lake area offer the broadest range of overnight options for a multi-stop southeast Houston trip." }],
    neighborhoods: [{ name: "Houston Ship Channel corridor", description: "The modern petrochemical and maritime landscape makes the surviving battlefield geography easier to understand—and harder to imagine as it looked in 1836." }],
    family: [{ name: "Monument observation and museum visit", description: "Combine the visual scale of the monument with the museum's artifacts before walking the battlefield." }],
    sideTrips: [{ name: "The Alamo", description: "For a larger Texas Revolution itinerary, connect San Jacinto to the San Antonio campaign and the events that preceded it.", href: "/destination/the-alamo" }],
  },
  "presidio-la-bahia": {
    intro: "Goliad is one of the rare Texas towns where several major layers of Spanish colonial, Mexican and revolutionary history sit within a short drive of one another. Build the visit around Presidio La Bahía, Fannin Battleground and the mission landscape instead of treating each as an isolated marker.",
    nearby: [
      { name: "Fannin Battleground", description: "The Coleto battlefield explains how James Fannin's command was surrounded before the executions associated with Goliad.", proximity: "Short drive east of Goliad", href: "/destination/fannin-battleground" },
      { name: "Goliad State Park and Historic Site", description: "Mission Espíritu Santo and the San Antonio River add the Spanish colonial mission story to a Goliad itinerary.", proximity: "In Goliad", href: "/destination/goliad-state-park" },
    ],
    food: [{ name: "Downtown Goliad", description: "The courthouse square is the practical meal stop between the presidio, mission and battlefield." }],
    lodging: [{ name: "Goliad", description: "Stay locally to split the mission, presidio and battlefield across two unhurried half-days." }],
    neighborhoods: [{ name: "Goliad courthouse square", description: "The historic town center adds post-Revolution civic history to the military and mission sites." }],
    family: [{ name: "Mission and presidio circuit", description: "Short driving distances make Goliad one of the easier multi-site history days for families." }],
    sideTrips: [{ name: "Fannin Battleground", description: "Follow the campaign in chronological order by visiting the Coleto battlefield with Presidio La Bahía.", href: "/destination/fannin-battleground" }],
  },
  "fannin-battleground": {
    intro: "The battlefield becomes much more meaningful when paired with Goliad. Visit the Coleto landscape first, then continue to Presidio La Bahía to follow the surrender and its aftermath in sequence.",
    nearby: [{ name: "Presidio La Bahía", description: "The essential companion stop for understanding the Goliad campaign after Fannin's surrender.", proximity: "Near Goliad", href: "/destination/presidio-la-bahia" }],
    food: [{ name: "Downtown Goliad", description: "Use the courthouse square for meals between the battlefield and presidio." }],
    lodging: [{ name: "Goliad", description: "A local overnight makes it possible to include the mission, presidio and battlefield without rushing." }],
    neighborhoods: [{ name: "Coleto Creek landscape", description: "The open terrain is central to understanding why Fannin's column was vulnerable and how the battle unfolded." }],
    family: [{ name: "Chronological Goliad route", description: "A simple battlefield-to-presidio sequence gives younger visitors a clearer narrative than visiting the sites out of order." }],
    sideTrips: [{ name: "Presidio La Bahía", description: "Continue the story of Fannin's command at the presidio associated with the Goliad executions.", href: "/destination/presidio-la-bahia" }],
  },
  "casa-navarro": {
    intro: "Casa Navarro belongs in a broader San Antonio history route that includes Tejano political history, the Spanish missions and the Texas Revolution. Its value is precisely that it complicates a military-only version of the city's past.",
    nearby: [
      { name: "The Alamo", description: "Pair the military landmark with Navarro's political and Tejano story for a fuller picture of revolutionary San Antonio.", proximity: "Downtown San Antonio", href: "/destination/the-alamo" },
      { name: "San Antonio Missions National Historical Park", description: "The mission chain reaches further back into Spanish colonial and Indigenous history.", proximity: "South of downtown", href: "/destination/san-antonio-missions-national-historical-park" },
    ],
    food: [{ name: "Market Square and downtown", description: "Downtown and Market Square provide the easiest food stops within walking or short-driving distance." }],
    lodging: [{ name: "Downtown San Antonio", description: "Stay downtown for a walkable Casa Navarro–Alamo core and use a car or rideshare for the mission chain." }],
    neighborhoods: [{ name: "Historic west side of downtown", description: "The surviving street pattern and nearby civic landmarks help place Navarro's home within 19th-century San Antonio." }],
    family: [{ name: "Casa Navarro plus the missions", description: "Use the smaller home site as a focused stop, then give children more outdoor space at the missions." }],
    sideTrips: [{ name: "San Antonio Missions", description: "Extend the timeline backward from the Republic era into Spanish colonial Texas.", href: "/destination/san-antonio-missions-national-historical-park" }],
  },
  "fort-martin-scott": {
    intro: "Fort Martin Scott is easiest to understand as part of a Fredericksburg history day: German settlement, U.S. Army expansion, frontier diplomacy and later military memory all intersect within a few miles.",
    nearby: [{ name: "National Museum of the Pacific War", description: "Fredericksburg's nationally significant World War II museum creates a striking military-history bookend to the 1840s frontier fort.", proximity: "Fredericksburg", href: "/destination/national-museum-pacific-war" }],
    food: [{ name: "Main Street Fredericksburg", description: "German-Texas restaurants, bakeries and cafes make Main Street the natural meal stop." }],
    lodging: [{ name: "Fredericksburg", description: "Use town lodging for an overnight that combines the fort, museum, German-Texas heritage and Hill Country side trips." }],
    neighborhoods: [{ name: "Fredericksburg historic core", description: "The town's German settlement pattern and surviving historic buildings put the fort's 1848 founding in local context." }],
    family: [{ name: "Fort grounds", description: "Open-air interpretation gives families room to explore before moving into the denser museum experience downtown." }],
    sideTrips: [{ name: "National Museum of the Pacific War", description: "Jump forward a century in military history without leaving Fredericksburg.", href: "/destination/national-museum-pacific-war" }],
  },
  "kreische-brewery": {
    intro: "Kreische Brewery and Monument Hill share the same La Grange bluff but tell different stories—German immigration and enterprise on one side, military memory and the Republic-era conflict with Mexico on the other. See them together.",
    nearby: [{ name: "Monument Hill", description: "The adjacent memorial landscape interprets the Dawson and Mier expedition dead and gives the brewery visit a very different historical frame.", proximity: "Same historic-site complex", href: "/destination/monument-hill" }],
    food: [{ name: "La Grange", description: "Downtown La Grange provides cafes, bakeries and restaurants below the bluff." }],
    lodging: [{ name: "La Grange and Fayette County", description: "Use La Grange as an overnight base for German-Texas, painted-church and courthouse-square routes." }],
    neighborhoods: [{ name: "La Grange bluff and Colorado River", description: "The terrain explains both the brewery site's water-powered industry and the commanding position of Monument Hill." }],
    family: [{ name: "Combined hilltop walk", description: "A single outing can cover ruins, overlooks and memorial interpretation without additional driving." }],
    sideTrips: [{ name: "Painted Churches of Texas", description: "Continue the German and Czech cultural-history theme through the nearby painted-church corridor.", href: "/explore/painted-churches" }],
  },
  "monument-hill": {
    intro: "Monument Hill is strongest when visited with the adjacent Kreische Brewery. The shared landscape connects Republic-era military memory with the later German immigrant economy that reshaped Fayette County.",
    nearby: [{ name: "Kreische Brewery", description: "The brewery ruins add immigration, entrepreneurship and industrial history to the same hilltop visit.", proximity: "Same historic-site complex", href: "/destination/kreische-brewery" }],
    food: [{ name: "La Grange", description: "The courthouse town below the bluff is the natural meal and coffee stop." }],
    lodging: [{ name: "La Grange", description: "A practical overnight base for Fayette County heritage drives and painted churches." }],
    neighborhoods: [{ name: "Colorado River bluff", description: "The overlook makes the strategic and commemorative power of this hilltop immediately visible." }],
    family: [{ name: "Brewery ruins and overlook", description: "Pair the memorial with the more tangible brewery ruins to vary the experience for younger visitors." }],
    sideTrips: [{ name: "Kreische Brewery", description: "Walk directly into the immigrant-industry half of the same historic landscape.", href: "/destination/kreische-brewery" }],
  },
  "magoffin-home": {
    intro: "Magoffin Home is a strong starting point for an El Paso borderlands history day because it connects family life, trade, politics and adobe architecture to a much larger Spanish, Mexican and American regional story.",
    nearby: [
      { name: "Chamizal National Memorial", description: "A later chapter in U.S.–Mexico border history focused on diplomacy, boundary change and cultural exchange.", proximity: "El Paso", href: "/destination/chamizal-national-memorial" },
      { name: "Old Socorro Mission", description: "Extend the route into the El Paso valley's mission history and early colonial settlement.", proximity: "Lower Valley", href: "/destination/old-socorro-mission" },
    ],
    food: [{ name: "Downtown El Paso", description: "Downtown and Segundo Barrio provide a dense mix of borderland food traditions close to the historic core." }],
    lodging: [{ name: "Downtown El Paso", description: "Stay centrally for Magoffin Home, downtown architecture, museums and an easy launch toward the Lower Valley missions." }],
    neighborhoods: [{ name: "Magoffin Historic District", description: "Walk the surrounding streets to understand the home's scale and place within early El Paso growth." }],
    family: [{ name: "Home plus Chamizal", description: "Balance an indoor historic-home visit with the open grounds and cultural programming at Chamizal." }],
    sideTrips: [{ name: "Old Socorro Mission", description: "Continue east into the mission corridor for an earlier layer of borderlands history.", href: "/destination/old-socorro-mission" }],
  },
  "caddo-mounds-state-historic-site": {
    intro: "Caddo Mounds should be treated as a foundational Texas-history stop, not a prelude to the state's later Spanish and Anglo periods. Build the day around Indigenous history and the Piney Woods landscape.",
    nearby: [{ name: "Mission Tejas State Park", description: "A nearby Spanish-mission story that can be visited after Caddo Mounds—but works best when the Caddo story is understood on its own terms first.", proximity: "Nearby in East Texas", href: "/destination/mission-tejas-state-park" }],
    food: [{ name: "Alto and Nacogdoches corridor", description: "Plan meals before arriving; services are more spread out than at major urban historic sites." }],
    lodging: [{ name: "Nacogdoches", description: "Use Nacogdoches as a larger overnight base for a multi-stop East Texas history route." }],
    neighborhoods: [{ name: "Neches River basin and Caddo homeland", description: "The landscape itself is part of the story; leave time to understand the site's relationship to the larger Caddo world." }],
    family: [{ name: "Mounds and interpretive grounds", description: "The outdoor site helps younger visitors grasp scale and place in a way artifact cases alone cannot." }],
    sideTrips: [{ name: "Mission Tejas State Park", description: "Compare Indigenous and Spanish-colonial histories in the same East Texas region.", href: "/destination/mission-tejas-state-park" }],
  },
  "first-capitol-of-texas": {
    intro: "West Columbia and the surrounding Brazoria County sites form a compact route through the earliest Republic, Stephen F. Austin's final days, plantation history and the later oil era.",
    nearby: [
      { name: "Stephen F. Austin Memorial", description: "Marks the place associated with the home where Austin died in December 1836.", proximity: "West Columbia", href: "/destination/stephen-f-austin-memorial" },
      { name: "Varner-Hogg Plantation", description: "A layered site interpreting slavery, emancipation, agriculture and later oil wealth.", proximity: "West Columbia area", href: "/destination/varner-hogg-plantation" },
    ],
    food: [{ name: "West Columbia", description: "Use town for a meal between the Republic-era and plantation-history stops." }],
    lodging: [{ name: "Brazoria County", description: "Lake Jackson and the broader Brazoria County area offer the widest lodging range for a two-day history route." }],
    neighborhoods: [{ name: "Old Columbia area", description: "The Brazos River corridor explains why early political and commercial centers developed here." }],
    family: [{ name: "First Capitol plus Varner-Hogg", description: "Mix the compact political-history stop with a larger historic property and grounds." }],
    sideTrips: [{ name: "San Felipe de Austin", description: "Trace the Austin colony story back to its earlier political headquarters.", href: "/destination/san-felipe-de-austin" }],
  },
  "varner-hogg-plantation": {
    intro: "Use Varner-Hogg as the deeper social-history stop in a Brazoria County route. Nearby Republic landmarks tell the political story; Varner-Hogg adds the labor, slavery, emancipation, agriculture and oil histories that shaped everyday life and wealth.",
    nearby: [
      { name: "First Capitol of Texas", description: "Connect the plantation landscape to the Republic's first political center at Columbia.", proximity: "West Columbia", href: "/destination/first-capitol-of-texas" },
      { name: "Stephen F. Austin Memorial", description: "Add Austin's final chapter to the same West Columbia history route.", proximity: "West Columbia", href: "/destination/stephen-f-austin-memorial" },
    ],
    food: [{ name: "West Columbia", description: "The nearest practical meal stop between the historic sites." }],
    lodging: [{ name: "Lake Jackson and Brazoria County", description: "Use the larger Brazoria County lodging base if combining several sites over two days." }],
    neighborhoods: [{ name: "Brazos plantation landscape", description: "The river, agricultural land and transportation routes are essential context for the site's economic history." }],
    family: [{ name: "Grounds and layered timeline", description: "Use the landscape to connect the site's different eras rather than presenting plantation history as a single moment." }],
    sideTrips: [{ name: "Levi Jordan Plantation", description: "Compare two Brazoria County plantation sites with different archaeological and interpretive emphases.", href: "/destination/levi-jordan-plantation" }],
  },
  "levi-jordan-plantation": {
    intro: "Levi Jordan belongs in a broader Brazoria County slavery-and-emancipation route. Pairing it with Varner-Hogg helps visitors compare different plantation landscapes, surviving evidence and interpretive approaches.",
    nearby: [{ name: "Varner-Hogg Plantation", description: "A second major Brazoria County plantation site that extends the story into emancipation, agriculture and oil wealth.", proximity: "Brazoria County", href: "/destination/varner-hogg-plantation" }],
    food: [{ name: "Brazoria and Lake Jackson area", description: "Plan meals around the larger nearby communities; services at the historic site itself are limited." }],
    lodging: [{ name: "Lake Jackson", description: "A practical overnight base for combining plantation, Republic and Gulf Coast history stops." }],
    neighborhoods: [{ name: "Lower Brazos agricultural landscape", description: "The surrounding geography helps explain plantation agriculture, river transportation and settlement patterns." }],
    family: [{ name: "Archaeology and community stories", description: "Focus on the people who lived and worked here and the evidence they left behind, rather than treating the site as architecture alone." }],
    sideTrips: [{ name: "Varner-Hogg Plantation", description: "Compare two major plantation histories within the same county.", href: "/destination/varner-hogg-plantation" }],
  },
};

function toAreaGuide(seed: AreaSeed): DestinationAreaGuide {
  return {
    intro: seed.intro,
    nearbyAttractions: seed.nearby,
    foodAndDrink: seed.food,
    lodging: seed.lodging,
    neighborhoods: seed.neighborhoods,
    familyStops: seed.family,
    sideTrips: seed.sideTrips,
  };
}

export function enrichHistoricSiteDestination(destination: Destination): Destination {
  if (destination.category !== "historic-sites") return destination;
  const heroKey = heroAliases[destination.slug];
  const hero = heroKey ? exploreHeroMap[heroKey] : undefined;
  const areaSeed = areaSeeds[destination.slug];
  return {
    ...destination,
    ...(hero ? { hero } : {}),
    ...(areaSeed ? { areaGuide: toAreaGuide(areaSeed) } : {}),
  };
}

export function enrichHistoricSiteCatalog(destinations: Destination[]): Destination[] {
  return destinations.map(enrichHistoricSiteDestination);
}
