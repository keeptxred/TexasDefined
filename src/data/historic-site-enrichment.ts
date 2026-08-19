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
  "acton-state-historic-site": {
    intro: "Treat Acton as a compact Hood County history stop that adds the Crockett family's post-Revolution story to a Granbury day rather than as an isolated cemetery monument.",
    nearby: [{ name: "Granbury historic square", description: "Use the courthouse square to extend the visit into Hood County architecture, settlement and local history." }],
    base: "Granbury", neighborhood: "Acton's cemetery landscape shows how Texas Revolution memory became part of later community identity.", family: "Keep the stop brief and pair the monument with Granbury's more walkable historic core.", sideTrip: { name: "Granbury", description: "Continue into the courthouse-square district for a broader Hood County history day." },
  },
  "bush-family-home": {
    intro: "Use the Bush Family Home as the political-history anchor of a Midland day, then place the family's story inside the petroleum boom and postwar growth that transformed West Texas.",
    nearby: [{ name: "Downtown Midland", description: "The civic core gives useful context for the city where the Bush family lived during a fast-growing postwar period." }],
    base: "Midland", neighborhood: "The residential setting is part of the point: presidential history is presented at ordinary household scale rather than through a monumental museum.", family: "Pair the home with a second Midland stop focused on oil, science or regional history so younger visitors get more variety.", sideTrip: { name: "Odessa and the Permian Basin", description: "Extend the day into the wider oil-boom landscape that shaped this chapter of West Texas history." },
  },
  "confederate-reunion-grounds": {
    intro: "Approach the Reunion Grounds as a site about memory after the Civil War as much as the war itself. The landscape is most useful for understanding how veterans, families and later generations constructed public commemoration.",
    nearby: [{ name: "Mexia", description: "Use Mexia as the practical base and as a reminder that the reunion grounds were tied to a living Central Texas community rather than a remote battlefield." }],
    base: "Mexia", neighborhood: "The Navasota River setting helps explain why the grounds could host large recurring gatherings over decades.", family: "Frame the visit around how communities remember history, comparing monuments, reunion traditions and later interpretation.", sideTrip: { name: "Limestone County", description: "Continue through the county for courthouse, railroad and community-history context." },
  },
  "eisenhower-birthplace": {
    intro: "Make Eisenhower's birthplace the history stop in a Denison-Lake Texoma day. The modest house works best when visitors connect it to Denison's railroad era and then contrast it with the scale of Eisenhower's later military and presidential career.",
    nearby: [{ name: "Downtown Denison", description: "The railroad-era city provides the local context for the Eisenhower family's short Texas chapter." }],
    base: "Denison", neighborhood: "The compact residential setting keeps the focus on family origins rather than presidential grandeur.", family: "Use the small birthplace as a focused first stop, then shift to outdoor time around Lake Texoma.", sideTrip: link("Eisenhower State Park", "eisenhower-state-park", "Add Lake Texoma scenery and outdoor time to a Denison history day."),
  },
  "fanthorp-inn": {
    intro: "Fanthorp Inn is strongest as a transportation-history stop between Anderson and Washington County, showing what travel looked like before railroads reorganized movement across Texas.",
    nearby: [{ name: "Anderson historic core", description: "The county-seat setting adds courthouse and settlement context to the stagecoach-era inn." }],
    base: "Anderson", neighborhood: "The inn's location makes more sense when viewed as part of an early road network linking settlements, government centers and river crossings.", family: "Use rooms, stables and travel stories to compare a stagecoach trip with a modern Texas road trip.", sideTrip: link("Washington-on-the-Brazos", "washington-on-the-brazos", "Continue into the Republic-era political landscape a short regional drive away."),
  },
  "fort-griffin": {
    intro: "Build a frontier-history day around Fort Griffin and Albany, connecting the Army post to cattle trails, buffalo hunting, ranching and the boomtown economy that grew around military expansion.",
    nearby: [{ name: "Albany", description: "The Shackelford County seat is the practical base and adds ranching, courthouse and small-town history." }],
    base: "Albany", neighborhood: "The Clear Fork landscape and open ranch country are essential to understanding why the post existed where it did.", family: "Let the ruins and open ground carry the visit; the site's scale is easier to grasp on foot than from exhibits alone.", sideTrip: link("Fort Richardson", "fort-richardson-state-park-state-historic-site", "Compare two frontier posts that served different stretches of the North Texas military network."),
  },
  "fort-lancaster": {
    intro: "Fort Lancaster is a landscape-first frontier stop. Its isolation above Live Oak Creek makes the San Antonio-El Paso road, military logistics and the difficulty of 19th-century overland travel easier to understand than a city museum can.",
    nearby: [{ name: "Sheffield and western Crockett County", description: "Services are sparse, so treat the surrounding open country as part of the historical experience and plan the drive deliberately." }],
    base: "Ozona and the I-10 corridor", neighborhood: "The remote plateau and canyon terrain explain both the fort's strategic role and the hardships of travel across West Texas.", family: "Use the visible ruins to reconstruct the fort building by building rather than expecting a dense indoor museum.", sideTrip: { name: "Ozona", description: "Use the Crockett County seat for lodging, food and additional regional-history context." },
  },
  "fort-mckavett": {
    intro: "Fort McKavett rewards a dedicated frontier-history drive because so many buildings survive. Pair the post with Menard-area history and let the remote setting explain the distance between Army garrisons and settlements.",
    nearby: [{ name: "Menard", description: "The nearest larger community makes the practical base for fuel, food and another layer of frontier-era settlement history." }],
    base: "Menard", neighborhood: "The open plateau around the fort preserves the sense of distance that defined military life here.", family: "Give younger visitors a simple mission—identify how buildings supported food, medicine, command, housing and horses—to turn the preserved post into a readable system.", sideTrip: { name: "Menard and the San Saba River", description: "Continue into the river corridor for settlement and ranching context." },
  },
  "french-legation": {
    intro: "Use the French Legation to widen an Austin history day beyond the Capitol. The house connects Republic diplomacy, early city growth and domestic architecture within a neighborhood-scale visit.",
    nearby: [link("Texas State Capitol", "texas-state-capitol", "Pair international Republic-era diplomacy with the later seat of Texas state government." )],
    base: "Downtown and East Austin", neighborhood: "The Legation's surviving grounds help reveal how small early Austin was before the modern city grew around it.", family: "Contrast the intimate house and grounds with the much larger Capitol complex to make political history more tangible.", sideTrip: link("Texas State Capitol", "texas-state-capitol", "Continue from Republic-era diplomacy into the state's later political center."),
  },
  "fulton-mansion": {
    intro: "Make Fulton Mansion the architectural anchor of a Rockport-Fulton day, using the house to connect Gulf Coast ranching, shipping, technology and post-Civil War prosperity to the bayfront landscape.",
    nearby: [{ name: "Rockport-Fulton waterfront", description: "The bayfront setting gives the mansion's shipping and coastal-economy story a visible geographic context." }],
    base: "Rockport and Fulton", neighborhood: "Aransas Bay is not just scenery; it helps explain the family's commercial interests and the community that developed around the coast.", family: "Look for the home's 19th-century technology and engineering features so the visit becomes more than a tour of decorative rooms.", sideTrip: { name: "Rockport historic and cultural district", description: "Continue through the coastal community for art, maritime and local-history context." },
  },
  "goodnight-ranch": {
    intro: "Goodnight Ranch belongs in a Panhandle landscape itinerary. Pair Charles and Mary Ann Goodnight's ranch story with the canyon country, cattle economy and conservation history that shaped the region.",
    nearby: [link("Palo Duro Canyon State Park", "palo-duro-canyon-state-park", "The canyon provides the physical landscape behind the ranching and Southern Plains story." )],
    base: "Claude and Amarillo", neighborhood: "Open range and High Plains geography make the ranch's scale, cattle operations and isolation easier to understand.", family: "Use cattle, bison and ranch technology as concrete entry points into the broader regional history.", sideTrip: link("Palo Duro Canyon State Park", "palo-duro-canyon-state-park", "Connect ranch history directly to the Panhandle landscape that sustained it."),
  },
  "iwo-jima-museum-monument": {
    intro: "Use the Iwo Jima Museum and Monument as the military-history stop in a Harlingen and Rio Grande Valley day, linking local Marine training history to one of World War II's most recognized images.",
    nearby: [{ name: "Harlingen", description: "The city provides the practical base and context for the military and aviation history associated with this part of the Valley." }],
    base: "Harlingen", neighborhood: "The Valley setting makes the connection between national wartime memory and South Texas training history especially clear.", family: "Start with the monument's instantly recognizable silhouette, then use the museum to explain the people and campaign behind the image.", sideTrip: { name: "Rio Grande Valley", description: "Continue with regional aviation, borderlands or natural-history stops for a broader South Texas day." },
  },
  "landmark-inn": {
    intro: "Landmark Inn works best as part of a Castroville heritage day. The inn, mill and river setting connect travel and commerce to the town's distinctive Alsatian settlement story.",
    nearby: [{ name: "Castroville historic district", description: "Walk the town's historic core to see how Alsatian heritage extends beyond the inn property." }],
    base: "Castroville", neighborhood: "The Medina River and old road network explain why a lodging, store and mill complex developed here.", family: "If staying overnight, use the historic lodging itself as part of the interpretation; otherwise pair the property with a short downtown walk.", sideTrip: { name: "San Antonio", description: "Connect Castroville's immigrant settlement story with the larger Spanish, Mexican and Tejano history of nearby San Antonio." },
  },
  "lipantitlan": {
    intro: "Treat Lipantitlán as a layered South Texas landscape rather than a conventional fort visit. Its value comes from Indigenous, Mexican and Texas Revolution histories occupying the same place.",
    nearby: [{ name: "Mathis and the Nueces River region", description: "The river corridor helps explain movement, settlement and military activity in this part of South Texas." }],
    base: "Mathis", neighborhood: "The Nueces-country setting is central to the site's Lipan Apache associations and later military use.", family: "Use a map or timeline before arriving because the site is more about landscape and layered history than surviving monumental architecture.", sideTrip: { name: "Corpus Christi region", description: "Continue east for coastal and South Texas history that places Lipantitlán in a wider regional story." },
  },
  "old-socorro-mission": {
    intro: "See Old Socorro Mission as part of the El Paso Mission Trail rather than an isolated church. The Lower Valley route links Pueblo, Spanish, Mexican and borderlands histories across several communities.",
    nearby: [link("Magoffin Home", "magoffin-home", "Connect the mission corridor to a later El Paso family and borderlands story." )],
    base: "El Paso and Socorro", neighborhood: "The Rio Grande valley and long-settled Lower Valley communities are essential context for the mission's history.", family: "Make the mission one stop in a short corridor rather than expecting one building to carry the entire day.", sideTrip: link("Magoffin Home", "magoffin-home", "Move forward in time from mission history to 19th-century El Paso civic and family life."),
  },
  "port-isabel-lighthouse": {
    intro: "Use Port Isabel Lighthouse as the visual anchor of a lower Laguna Madre history day, connecting navigation and coastal trade to the working waterfront and the modern beach corridor.",
    nearby: [{ name: "Port Isabel historic district and waterfront", description: "The town adds maritime, fishing and border-coast context around the lighthouse." }],
    base: "Port Isabel and South Padre Island", neighborhood: "The Laguna Madre and pass geography explain why a navigation landmark mattered here.", family: "Pair the lighthouse with waterfront time so younger visitors can connect the structure to real boats, channels and coastal movement.", sideTrip: { name: "South Padre Island", description: "Cross the causeway for a landscape contrast between historic port and barrier island." },
  },
  "sam-rayburn-house": {
    intro: "Make the Sam Rayburn House the political-history stop in a Bonham-area day. The preserved home gives congressional power a deliberately ordinary North Texas setting.",
    nearby: [{ name: "Bonham", description: "The county-seat community supplies courthouse, civic and local-history context for Rayburn's North Texas identity." }],
    base: "Bonham", neighborhood: "The domestic setting is the site's strength, showing how Rayburn's national career remained connected to a rural Texas home base.", family: "Focus on a few personal objects or rooms that connect private life to public leadership instead of treating the house as a furniture inventory.", sideTrip: { name: "Fannin County", description: "Continue through Bonham and the surrounding county for a broader North Texas civic-history day." },
  },
  "san-felipe-de-austin": {
    intro: "Use San Felipe de Austin as the starting point for a Texas Revolution route. The colonial headquarters explains Stephen F. Austin's colony and political organization before the better-known military events of 1835–1836.",
    nearby: [{ name: "San Felipe and the Brazos River corridor", description: "The river crossing and townsite geography explain why this became an administrative and commercial center." }],
    base: "Sealy and the west Houston corridor", neighborhood: "The Brazos landscape is fundamental to understanding Austin's colony and early travel networks.", family: "Start with the colony and townsite before visiting battlefields so the Revolution has a political and community backstory.", sideTrip: link("Washington-on-the-Brazos", "washington-on-the-brazos", "Continue chronologically from Austin's colony to the 1836 independence convention."),
  },
  "star-of-the-republic-museum": {
    intro: "Treat the Star of the Republic Museum as the artifact-rich indoor half of a Washington-on-the-Brazos visit. It works best when paired with the surrounding convention landscape and Barrington Farm.",
    nearby: [link("Washington-on-the-Brazos", "washington-on-the-brazos", "Walk the broader political landscape where independence delegates met."), link("Barrington Living History Farm", "barrington-living-history-farm", "Add the domestic and agricultural world of the Republic era." )],
    base: "Brenham", neighborhood: "The museum belongs to a larger Brazos River historic landscape rather than a stand-alone gallery visit.", family: "Use museum objects first, then move outside to connect artifacts with buildings, farm work and physical geography.", sideTrip: link("San Felipe de Austin", "san-felipe-de-austin", "Trace the story backward to Austin's colonial headquarters."),
  },
  "starr-family-home": {
    intro: "Use Starr Family Home as the domestic-history anchor of a Marshall day, connecting four generations of one family to East Texas law, politics, wealth and civic life.",
    nearby: [{ name: "Marshall historic district", description: "The courthouse and historic core broaden the visit from one family property to the city's larger civic story." }],
    base: "Marshall", neighborhood: "The surrounding historic city helps place the Starr family's homes within a larger East Texas center of law, commerce and politics.", family: "Compare how different generations used the property and what changed in technology, furnishings and family life over time.", sideTrip: { name: "Marshall", description: "Continue through the historic core for courthouse, railroad and East Texas community history." },
  },
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
