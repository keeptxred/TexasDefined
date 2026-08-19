import { exploreHeroMap } from "./explore-hero-map";
import type { Destination, DestinationAreaGuide, DestinationAreaItem } from "./types";

const heroAliases: Record<string, string> = {
  "barrington-living-history-farm": "barrington-farm-site",
  "fanthorp-inn": "fanthorp-inn-state-historic-site",
  "kreische-brewery": "monument-hill-kreische-brewery-state-historic-site",
  "monument-hill": "monument-hill-kreische-brewery-state-historic-site",
  "san-jacinto-battleground": "san-jacinto-battleground",
  "washington-on-the-brazos": "washington-on-the-brazos",
};

type AreaSeed = {
  intro: string;
  nearby: [DestinationAreaItem, ...DestinationAreaItem[]];
  base: string;
  neighborhood: string;
  family: string;
  sideTrip: DestinationAreaItem;
};

const link = (name: string, slug: string, description: string): DestinationAreaItem => ({ name, description, href: `/destination/${slug}` });

const areaSeeds: Record<string, AreaSeed> = {
  "washington-on-the-brazos": {
    intro: "Make Washington-on-the-Brazos the anchor of a Washington County history day. The farm and museum on the complex deepen the independence story, while Brenham is the practical dining and overnight base.",
    nearby: [link("Barrington Living History Farm", "barrington-living-history-farm", "Anson Jones's farm adds living-history interpretation of Republic-era work and domestic life."), link("Star of the Republic Museum", "star-of-the-republic-museum", "Artifact-rich context for the Republic of Texas and the 1836 convention landscape.")],
    base: "Brenham", neighborhood: "The Brazos River corridor explains why delegates gathered in this landscape in 1836.", family: "Pair the political history with Barrington's more tangible living-history demonstrations.", sideTrip: link("San Felipe de Austin", "san-felipe-de-austin", "Continue the story at Stephen F. Austin's colonial headquarters."),
  },
  "san-jacinto-battleground": {
    intro: "Build a Houston-area history day around the battlefield, monument and museum, then use the surrounding Ship Channel landscape to see how dramatically this place changed after 1836.",
    nearby: [{ name: "San Jacinto Monument and Museum", description: "Start with the monument and museum before walking the battlefield landscape." }, link("Battleship Texas", "battleship-texas", "A separate military-history landmark historically associated with the San Jacinto area; verify current visitor access.")],
    base: "La Porte and Bay Area Houston", neighborhood: "The modern Ship Channel makes the surviving battlefield geography especially striking.", family: "Combine museum interpretation with an outdoor battlefield walk so the story has both narrative and scale.", sideTrip: link("The Alamo", "the-alamo", "Connect San Jacinto with the earlier San Antonio campaign on a larger Revolution itinerary."),
  },
  "presidio-la-bahia": {
    intro: "Treat Goliad as one connected history district. Presidio La Bahía, Fannin Battleground and the mission landscape together explain Spanish Texas, Mexican Texas and the Goliad campaign.",
    nearby: [link("Fannin Battleground", "fannin-battleground", "The Coleto battlefield explains how Fannin's command was surrounded before the events at Goliad."), link("Goliad State Park and Historic Site", "goliad-state-park", "Mission Espíritu Santo adds the Spanish mission story to the military route.")],
    base: "Downtown Goliad", neighborhood: "The courthouse square adds later civic history to the mission and military landscape.", family: "Short driving distances make the mission-presidio-battlefield circuit unusually manageable.", sideTrip: link("Fannin Battleground", "fannin-battleground", "Visit the Coleto landscape as the chronological companion to La Bahía."),
  },
  "fannin-battleground": {
    intro: "Visit the Coleto battlefield before Presidio La Bahía to follow the Goliad campaign in sequence, from the surrounded Texian column to the surrender and its aftermath.",
    nearby: [link("Presidio La Bahía", "presidio-la-bahia", "The essential companion stop for understanding what followed Fannin's surrender.")],
    base: "Downtown Goliad", neighborhood: "The open Coleto Creek terrain is central to understanding the battle.", family: "A battlefield-first, presidio-second sequence gives younger visitors a clearer narrative.", sideTrip: link("Presidio La Bahía", "presidio-la-bahia", "Continue the Goliad campaign story at the presidio."),
  },
  "casa-navarro": {
    intro: "Pair José Antonio Navarro's Tejano political story with the Alamo and the missions so a San Antonio history day is not reduced to military history alone.",
    nearby: [link("The Alamo", "the-alamo", "The military landmark gains context when paired with Navarro's political story."), link("San Antonio Missions National Historical Park", "san-antonio-missions-national-historical-park", "The mission chain extends the timeline into Spanish colonial and Indigenous history.")],
    base: "Downtown San Antonio and Market Square", neighborhood: "The historic west side of downtown helps place Navarro's home within 19th-century San Antonio.", family: "Balance the focused historic-home stop with the larger outdoor mission grounds.", sideTrip: link("San Antonio Missions", "san-antonio-missions-national-historical-park", "Extend the timeline backward into Spanish colonial Texas."),
  },
  "fort-martin-scott": {
    intro: "Use Fort Martin Scott as part of a Fredericksburg history day connecting German settlement, U.S. Army expansion and 20th-century military history.",
    nearby: [link("National Museum of the Pacific War", "national-museum-pacific-war", "A nationally significant World War II museum minutes from the frontier fort.")],
    base: "Fredericksburg", neighborhood: "The historic core and settlement pattern put the fort's 1848 founding in local context.", family: "The open-air fort grounds provide room to explore before a denser museum visit downtown.", sideTrip: link("National Museum of the Pacific War", "national-museum-pacific-war", "Jump forward a century in military history without leaving Fredericksburg."),
  },
  "kreische-brewery": {
    intro: "See Kreische Brewery and Monument Hill together. One landscape combines German immigration and enterprise with Republic-era military memory above the Colorado River.",
    nearby: [link("Monument Hill", "monument-hill", "The adjacent memorial landscape gives the brewery visit a very different historical frame.")],
    base: "La Grange", neighborhood: "The Colorado River bluff helps explain both the industrial site and the memorial's commanding setting.", family: "The combined site mixes ruins, overlooks and memorial interpretation without extra driving.", sideTrip: { name: "Painted Churches of Texas", description: "Continue the German and Czech cultural-history theme through the nearby church corridor.", href: "/explore/painted-churches" },
  },
  "monument-hill": {
    intro: "Visit Monument Hill with the adjacent Kreische Brewery to connect Republic-era military memory with the German immigrant economy that later reshaped Fayette County.",
    nearby: [link("Kreische Brewery", "kreische-brewery", "The brewery ruins add immigration, industry and entrepreneurship to the same hilltop visit.")],
    base: "La Grange", neighborhood: "The Colorado River overlook makes the commemorative power of the hilltop immediately visible.", family: "Pair the memorial with tangible brewery ruins and overlooks to vary the experience.", sideTrip: link("Kreische Brewery", "kreische-brewery", "Walk directly into the immigrant-industry half of the shared landscape."),
  },
  "magoffin-home": {
    intro: "Start an El Paso borderlands history day at Magoffin Home, then connect family life, trade and adobe architecture to the mission corridor and later U.S.–Mexico boundary history.",
    nearby: [link("Chamizal National Memorial", "chamizal-national-memorial", "A later border-history chapter centered on diplomacy and boundary change."), link("Old Socorro Mission", "old-socorro-mission", "Extend the route into the Lower Valley's earlier mission history.")],
    base: "Downtown El Paso", neighborhood: "The Magoffin Historic District helps place the home within early El Paso growth.", family: "Balance an indoor historic-home visit with the open grounds at Chamizal.", sideTrip: link("Old Socorro Mission", "old-socorro-mission", "Continue east for an earlier layer of borderlands history."),
  },
  "caddo-mounds-state-historic-site": {
    intro: "Treat Caddo Mounds as a foundational Texas-history stop in its own right, placing ancestral Caddo history before the later Spanish, Mexican and Anglo chapters.",
    nearby: [link("Mission Tejas State Park", "mission-tejas-state-park", "A nearby Spanish-mission story best visited after understanding the Caddo landscape on its own terms.")],
    base: "Alto and Nacogdoches", neighborhood: "The Caddo homeland and Piney Woods landscape are part of the interpretation, not merely a backdrop.", family: "The outdoor mounds and grounds help younger visitors understand scale and place.", sideTrip: link("Mission Tejas State Park", "mission-tejas-state-park", "Compare Indigenous and Spanish-colonial histories in the same region."),
  },
  "first-capitol-of-texas": {
    intro: "West Columbia and nearby Brazoria County sites make a compact route through the first Republic government, Stephen F. Austin's final days and plantation history.",
    nearby: [link("Stephen F. Austin Memorial", "stephen-f-austin-memorial", "Add Austin's final chapter to the West Columbia route."), link("Varner-Hogg Plantation", "varner-hogg-plantation", "Adds slavery, emancipation, agriculture and later oil wealth to the county story.")],
    base: "West Columbia and Lake Jackson", neighborhood: "The Brazos corridor helps explain why early political and commercial centers developed here.", family: "Combine the compact political-history stop with a larger historic property and grounds.", sideTrip: link("San Felipe de Austin", "san-felipe-de-austin", "Trace Austin's colony back to its earlier headquarters."),
  },
  "varner-hogg-plantation": {
    intro: "Use Varner-Hogg as the deeper social-history stop in a Brazoria County route, adding labor, slavery, emancipation, agriculture and oil to nearby Republic landmarks.",
    nearby: [link("First Capitol of Texas", "first-capitol-of-texas", "Connect the plantation landscape to the Republic's first political center."), link("Stephen F. Austin Memorial", "stephen-f-austin-memorial", "Add Austin's final chapter to the same West Columbia route.")],
    base: "West Columbia and Lake Jackson", neighborhood: "The Lower Brazos plantation landscape is essential context for the site's economy.", family: "Use the grounds to connect the site's different eras rather than presenting one frozen moment.", sideTrip: link("Levi Jordan Plantation", "levi-jordan-plantation", "Compare two Brazoria County plantation sites with different archaeological and interpretive strengths."),
  },
  "levi-jordan-plantation": {
    intro: "Pair Levi Jordan with Varner-Hogg for a broader Brazoria County route about slavery, emancipation, archaeology, agriculture and community life.",
    nearby: [link("Varner-Hogg Plantation", "varner-hogg-plantation", "A second major plantation landscape extending the story into later agriculture and oil wealth.")],
    base: "Brazoria and Lake Jackson", neighborhood: "The Lower Brazos geography helps explain plantation agriculture and river transportation.", family: "Center the people who lived and worked here and the archaeological evidence they left behind.", sideTrip: link("Varner-Hogg Plantation", "varner-hogg-plantation", "Compare two major plantation histories within the same county."),
  },
};

function areaGuide(seed: AreaSeed): DestinationAreaGuide {
  const local: [DestinationAreaItem] = [{ name: seed.base, description: "Use this nearby community as the practical food and overnight base for the historic-site visit." }];
  return {
    intro: seed.intro,
    nearbyAttractions: seed.nearby,
    foodAndDrink: local,
    lodging: local,
    neighborhoods: [{ name: "Historic landscape", description: seed.neighborhood }],
    familyStops: [{ name: "Family visit strategy", description: seed.family }],
    sideTrips: [seed.sideTrip],
  };
}

export function enrichHistoricSiteDestination(destination: Destination): Destination {
  if (destination.category !== "historic-sites") return destination;
  const heroKey = heroAliases[destination.slug];
  const hero = heroKey ? exploreHeroMap[heroKey] : undefined;
  const areaSeed = areaSeeds[destination.slug];
  const county = destination.county?.replace(/\s+County$/i, "").trim();
  return { ...destination, ...(county ? { county } : {}), ...(hero ? { hero } : {}), ...(areaSeed ? { areaGuide: areaGuide(areaSeed) } : {}) };
}

export function enrichHistoricSiteCatalog(destinations: Destination[]): Destination[] {
  return destinations.map(enrichHistoricSiteDestination);
}
