import type { Destination, DestinationAreaGuide, DestinationAreaItem } from "./types";

const local = (name: string, description: string): DestinationAreaItem => ({ name, description });
const link = (name: string, slug: string, description: string): DestinationAreaItem => ({ name, description, href: `/destination/${slug}` });

const guides: Record<string, DestinationAreaGuide> = {
  "barrington-living-history-farm": {
    intro: "Treat Barrington as the everyday-life half of a Washington-on-the-Brazos visit. The farm makes Republic-era agriculture, work and domestic life tangible beside the political story of independence.",
    nearbyAttractions: [
      link("Washington-on-the-Brazos", "washington-on-the-brazos", "Walk the political landscape associated with the 1836 independence convention."),
      link("Star of the Republic Museum", "star-of-the-republic-museum", "Add artifacts and Republic-era interpretation to the living-history experience."),
    ],
    foodAndDrink: [local("Brenham", "Use Brenham as the practical food base for a Washington County history day.")],
    lodging: [local("Brenham", "The largest nearby overnight base for combining the historic complex with Washington County drives.")],
    neighborhoods: [local("Brazos River historic landscape", "The surrounding river corridor helps explain why settlement, farming and political activity concentrated here.")],
    familyStops: [local("Living-history strategy", "Watch for demonstrations, animals and working-farm details that help younger visitors connect daily life to the Republic story.")],
    sideTrips: [link("San Felipe de Austin", "san-felipe-de-austin", "Continue from Republic-era farm life to Stephen F. Austin's colonial headquarters.")],
  },
  "mission-dolores": {
    intro: "Use Mission Dolores as the Spanish-colonial and Indigenous-history anchor of a San Augustine-area day. The site is most useful when placed inside the wider story of Caddo homelands, missions and the El Camino Real corridor.",
    nearbyAttractions: [local("San Augustine historic core", "Add courthouse, settlement and East Texas community history to the mission visit.")],
    foodAndDrink: [local("San Augustine", "Use the town as the practical meal stop before or after the mission site.")],
    lodging: [local("San Augustine and Nacogdoches corridor", "Choose the larger regional base that best fits a multi-stop East Texas history route.")],
    neighborhoods: [local("El Camino Real corridor", "The road network and Caddo landscape are essential context for understanding why Spanish missions appeared here.")],
    familyStops: [local("Map-first visit", "Start with a simple map of Caddo homelands and Spanish routes so the archaeological landscape has clear geographic meaning.")],
    sideTrips: [link("Caddo Mounds State Historic Site", "caddo-mounds-state-historic-site", "Center the deeper Indigenous history of East Texas before or after the Spanish mission story.")],
  },
  "national-museum-pacific-war": {
    intro: "Make the National Museum of the Pacific War the major indoor anchor of a Fredericksburg history day. Its World War II story contrasts sharply with the town's earlier German-settlement and frontier history.",
    nearbyAttractions: [link("Fort Martin Scott", "fort-martin-scott", "Jump back to the 1840s frontier and the early U.S. Army presence outside Fredericksburg.")],
    foodAndDrink: [local("Main Street Fredericksburg", "Use the historic core for meals and a break during a museum-heavy day.")],
    lodging: [local("Fredericksburg", "Stay in town to combine the museum with frontier, German-Texas and Hill Country stops.")],
    neighborhoods: [local("Fredericksburg historic core", "The town's German heritage makes the museum's connection to local-born Admiral Chester Nimitz especially meaningful.")],
    familyStops: [local("Pace the galleries", "The museum is extensive; split dense exhibit time with outdoor interpretation and a Main Street break.")],
    sideTrips: [link("Fort Martin Scott", "fort-martin-scott", "Compare two very different eras of military history within the same town.")],
  },
  "official-texas-longhorn-herd": {
    intro: "Use the Official State of Texas Longhorn Herd to connect a living animal symbol with the cattle economy, ranching culture and frontier history that made the longhorn central to Texas identity.",
    nearbyAttractions: [link("Fort Griffin State Historic Site", "fort-griffin", "Connect the herd to the frontier fort, cattle-trail and ranching landscape around Albany.")],
    foodAndDrink: [local("Albany", "Use Albany as the practical food and services base for the Fort Griffin area.")],
    lodging: [local("Albany", "An overnight in Shackelford County makes it easier to combine the herd, fort ruins and regional ranch history.")],
    neighborhoods: [local("Clear Fork ranch country", "The open landscape helps explain why longhorn cattle, ranching and frontier posts became intertwined here.")],
    familyStops: [local("Animal-to-history connection", "Use the herd as the visual hook, then connect cattle traits and ranching to the larger Texas cattle-drive story.")],
    sideTrips: [link("Fort Griffin State Historic Site", "fort-griffin", "Pair the living herd with the military and cattle-era ruins nearby.")],
  },
  "palmito-ranch-battlefield": {
    intro: "Treat Palmito Ranch as a landscape-history stop in the lower Rio Grande Valley. Its importance comes from the Civil War story, border geography and the fact that the final major land battle occurred after Lee's surrender in Virginia.",
    nearbyAttractions: [local("Brownsville", "Use Brownsville for the wider Civil War, borderlands and Rio Grande context that the battlefield itself cannot provide alone.")],
    foodAndDrink: [local("Brownsville", "The city is the practical meal and services base before or after the battlefield drive.")],
    lodging: [local("Brownsville", "Stay in the city for a broader lower-valley history itinerary.")],
    neighborhoods: [local("Lower Rio Grande landscape", "Flat terrain, river access and proximity to Mexico are fundamental to understanding military movement here.")],
    familyStops: [local("Timeline strategy", "Explain the unusual date of the battle first so younger visitors understand why this remote landscape matters nationally.")],
    sideTrips: [local("Brownsville historic district", "Continue into the city for borderlands, military and commercial history.")],
  },
  "sabine-pass-battleground": {
    intro: "Use Sabine Pass Battleground to connect Civil War coastal defense with the geography of the Sabine-Neches waterway. The site makes more sense when visitors look at the channel and imagine control of Gulf access as the strategic prize.",
    nearbyAttractions: [local("Sabine Pass and Port Arthur area", "The modern shipping landscape provides a striking contrast with the Civil War-era coastal-defense story.")],
    foodAndDrink: [local("Port Arthur", "Use the larger city as the practical food and services base.")],
    lodging: [local("Port Arthur and Beaumont", "Either city works as an overnight base for a broader southeast Texas history and coast itinerary.")],
    neighborhoods: [local("Sabine-Neches waterway", "The channel and Gulf approach explain why a small fortification could carry outsized strategic importance.")],
    familyStops: [local("Geography-first visit", "Start with the waterway and a map of the Gulf approach before discussing troop numbers and artillery.")],
    sideTrips: [local("Port Arthur", "Continue into the industrial port landscape for a later chapter in the region's maritime history.")],
  },
  "sam-bell-maxey-house": {
    intro: "Use the Sam Bell Maxey House as the domestic-history centerpiece of a Paris, Texas, day. The preserved home connects military service, Reconstruction-era politics and family life to a North Texas community.",
    nearbyAttractions: [local("Downtown Paris", "The courthouse-area street grid and civic core broaden the visit beyond one prominent household.")],
    foodAndDrink: [local("Paris", "Use downtown for the easiest meal and coffee options around the historic visit.")],
    lodging: [local("Paris", "A local overnight works for combining the house with Lamar County history and northeast Texas drives.")],
    neighborhoods: [local("Historic Paris", "The urban setting places the Maxey family's political and social life inside the growth of a regional center.")],
    familyStops: [local("Household-history strategy", "Choose a few objects or rooms that connect national events to ordinary routines rather than treating every furnishing equally.")],
    sideTrips: [local("Lamar County", "Continue through the county for courthouse, railroad and community-history context.")],
  },
  "slaton-harvey-house": {
    intro: "Make the Slaton Harvey House a railroad-history stop on a South Plains day. The Harvey House story links passenger rail, hospitality, food service and the growth of towns along major western routes.",
    nearbyAttractions: [local("Slaton railroad district", "Use the surrounding rail landscape to connect the restored building to the transportation system it served.")],
    foodAndDrink: [local("Slaton and Lubbock", "Slaton works for a local stop; Lubbock offers the broadest dining range for a larger South Plains itinerary.")],
    lodging: [local("Lubbock", "The regional hub is the easiest overnight base for combining Slaton with other South Plains attractions.")],
    neighborhoods: [local("South Plains rail corridor", "Tracks, depots and town form help explain why Harvey Houses became important social and travel infrastructure.")],
    familyStops: [local("Travel-comparison strategy", "Compare the routines of a historic passenger-rail stop with modern highway or airport travel.")],
    sideTrips: [local("Lubbock", "Continue into the regional hub for music, ranching and South Plains history.")],
  },
  "stephen-f-austin-memorial": {
    intro: "Use the Stephen F. Austin Memorial as a short but important link in a Brazoria County Republic route. It works best beside the First Capitol and other lower-Brazos sites rather than as a stand-alone destination.",
    nearbyAttractions: [
      link("First Capitol of Texas", "first-capitol-of-texas", "Connect Austin's final chapter to the Republic's first seat of government."),
      link("Varner-Hogg Plantation", "varner-hogg-plantation", "Add the county's plantation, labor and later oil history to the political route."),
    ],
    foodAndDrink: [local("West Columbia", "Use town as the practical meal base between the nearby historic stops.")],
    lodging: [local("West Columbia and Lake Jackson", "Choose the base that best fits a multi-stop Brazoria County itinerary.")],
    neighborhoods: [local("Lower Brazos corridor", "River geography helps explain why Austin's colony and early Republic centers clustered in this region.")],
    familyStops: [local("Short-stop strategy", "Use the memorial as one chapter in a sequence rather than expecting a full museum experience.")],
    sideTrips: [link("San Felipe de Austin", "san-felipe-de-austin", "Trace Austin's story back to the colonial headquarters associated most closely with his empresario years.")],
  },
  "zaragoza-birthplace": {
    intro: "Use Zaragoza Birthplace to connect Goliad's Spanish and Mexican history to Ignacio Zaragoza, the general whose 1862 victory at Puebla is commemorated by Cinco de Mayo.",
    nearbyAttractions: [
      link("Presidio La Bahía", "presidio-la-bahia", "Add the Spanish-colonial presidio and Texas Revolution story to the same Goliad route."),
      link("Fannin Battleground", "fannin-battleground", "Continue into the 1836 Goliad campaign landscape."),
    ],
    foodAndDrink: [local("Downtown Goliad", "Use the courthouse square for meals between the area's compact history sites.")],
    lodging: [local("Goliad", "A local overnight makes it easy to spread the mission, presidio, birthplace and battlefield across an unhurried visit.")],
    neighborhoods: [local("Goliad borderlands landscape", "The site helps show how Spanish, Mexican and Texian histories overlap in the same small geography.")],
    familyStops: [local("Connect to Cinco de Mayo", "Start with the familiar holiday, then explain Zaragoza's Goliad birth and the Battle of Puebla.")],
    sideTrips: [link("Presidio La Bahía", "presidio-la-bahia", "Continue through Goliad's earlier Spanish-colonial and revolutionary layers.")],
  },
};

export function enrichRemainingHistoricSiteAreaGuide(destination: Destination): Destination {
  if (destination.category !== "historic-sites" || destination.areaGuide) return destination;
  const areaGuide = guides[destination.slug];
  return areaGuide ? { ...destination, areaGuide } : destination;
}
