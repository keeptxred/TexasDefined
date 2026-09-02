import type { Destination } from "./types";

const sourceCheckedAt = "2026-09-02";

export const smallTownWave7Destinations: Destination[] = [
  {
    id: "small-town-blanco", brandId: "texasdefined", slug: "blanco", name: "Blanco",
    summary: "Blanco is a compact Hill Country river town centered on an 1880s limestone courthouse square, with Blanco State Park inside the city, local museums, craft traditions and an easy position between Austin and San Antonio.",
    category: "small-towns", region: "hill-country", nearestTown: "Blanco", county: "Blanco",
    coordinates: { lat: 30.0974, lng: -98.4214 },
    hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Blanco%20County%20Courthouse%20(Old),%20Blanco,%20Texas%20(8690726883).jpg?width=1600", alt: "Old Blanco County Courthouse on the town square in Blanco, Texas", width: 5184, height: 3456, credit: "Nicolas Henderson · CC BY 2.0 · Wikimedia Commons" },
    bestSeason: "Spring and fall for courthouse-square walking and Hill Country drives; warm months for river recreation when current water conditions allow",
    entryNote: "Blanco River conditions can change with drought and heavy rain. Check Blanco State Park conditions, reservations and swimming status before building a trip around the river, and verify event schedules around the courthouse square.",
    highlights: ["Old Blanco County Courthouse", "Blanco State Park", "Blanco River", "historic square", "Hill Country craft", "walkable downtown"],
    body: [
      "Blanco's defining advantage is how closely its civic center and river landscape sit together. The Old Blanco County Courthouse, completed in the 1880s and used only briefly as the county courthouse before the seat moved to Johnson City, anchors a square that still functions as the town's social and visitor center.",
      "The Blanco River runs along the southern edge of town through Blanco State Park, making this one of the easier Texas small towns in which a visitor can combine downtown history, food and shops with swimming, fishing, paddling or a shaded riverside break without a long transfer between stops.",
      "A first visit works best as a two-part day: orient around the courthouse square and local history first, then reserve a separate river block based on current park conditions. Festival weekends and summer recreation can change parking and demand, while drought can materially alter the water experience."
    ],
    officialUrl: "https://www.visitblancotexas.com/", sourceCheckedAt,
    directions: "Blanco sits on US 281 in the Texas Hill Country roughly between Austin and San Antonio. The courthouse square and Blanco State Park are the two primary visitor anchors.",
    accessibilityNotes: "The square is relatively compact, but historic-building entrances and river access vary. Check Blanco State Park for current accessible facilities and water-access conditions before travel.",
    areaGuide: {
      intro: "Use the courthouse square for history, food and orientation, then give the Blanco River its own block rather than squeezing park time between downtown stops.",
      nearbyAttractions: [{ name: "Old Blanco County Courthouse", description: "The restored limestone courthouse is Blanco's visual center and a useful starting point for the town's civic history." }, { name: "Blanco State Park", description: "A compact in-town state park focused on the Blanco River, with recreation dependent on current water and weather conditions." }],
      foodAndDrink: [{ name: "Courthouse square and US 281 corridor", description: "The main concentration of local cafes, restaurants and visitor services." }],
      lodging: [{ name: "Central Blanco", description: "Best for walking the square and reaching the river quickly." }],
      neighborhoods: [{ name: "Historic courthouse square", description: "Blanco's walkable civic, shopping and event core." }],
      familyStops: [{ name: "Blanco State Park", description: "A strong family outdoor stop when current river conditions are suitable." }],
      sideTrips: [{ name: "Hill Country region", description: "Connect Blanco with nearby river towns, scenic drives and historic communities.", href: "/explore/region/hill-country" }, { name: "Texas Trip Planner", description: "Build a Hill Country route around Blanco.", href: "/explore/trip-planner?destination=blanco" }]
    },
    authorityGuide: {
      whyItMatters: "Blanco combines a preserved courthouse-square townscape with direct in-town river recreation, giving travelers a unusually efficient history-and-outdoors Hill Country stop.",
      assessment: { recommendedVisit: "One full day; one night for a slower river-and-downtown weekend.", physicalEffort: "Low to moderate", weatherExposure: "Mixed indoor/outdoor", planningLevel: "Moderate in swimming season", familyFit: "Very strong when river conditions are checked in advance.", firstTimeValue: "High for travelers seeking a compact Hill Country town with genuine outdoor access." },
      itineraries: [{ label: "Half day", duration: "4-5 hours", steps: ["Walk the courthouse square", "Visit a local history or craft stop", "Spend a short block along the Blanco River"] }, { label: "Full day", duration: "8-10 hours", steps: ["Begin downtown", "Have lunch around the square", "Use the afternoon for Blanco State Park", "Return downtown for an easy evening"] }, { label: "Overnight", duration: "1 night", steps: ["Give downtown and the river separate half-day blocks", "Add a local museum or craft stop", "Continue deeper into the Hill Country"] }],
      sources: [{ label: "Visit Blanco Texas", url: "https://www.visitblancotexas.com/", scope: "Official visitor information, courthouse, river and destination planning" }, { label: "City of Blanco attractions", url: "https://www.cityofblancotx.gov/1248/Attractions", scope: "Current city attractions and park context" }]
    }, featured: true
  },
  {
    id: "small-town-comfort", brandId: "texasdefined", slug: "comfort", name: "Comfort",
    summary: "Comfort is a highly preserved German-Texan Hill Country community where more than a century of limestone architecture, walkable High Street, freethinker history, local shops and Guadalupe River country create a relaxed heritage weekend.",
    category: "small-towns", region: "hill-country", nearestTown: "Comfort", county: "Kendall",
    coordinates: { lat: 29.9675, lng: -98.9050 },
    hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Comfort%20historic%20district%202009.jpg?width=1600", alt: "Historic limestone buildings along High Street in Comfort, Texas", width: 3264, height: 2448, credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons" },
    bestSeason: "Fall through spring for walking the historic district; spring for Hill Country scenery and comfortable outdoor time",
    entryNote: "Comfort is small and walkable, but businesses and historic properties keep independent hours. Confirm specific tours, museums and event schedules, and plan carefully for hot-weather outdoor activity along the Guadalupe River or nearby trails.",
    highlights: ["Comfort Historic District", "High Street", "German-Texan heritage", "freethinker history", "limestone architecture", "Guadalupe River country"],
    body: [
      "Comfort is one of the Hill Country's strongest places to see German-Texan settlement history in a still-lived-in townscape. Settled by German freethinkers in the 1850s, the community retained a dense collection of nineteenth- and early twentieth-century structures rather than replacing its center with a modern commercial strip.",
      "High Street and the surrounding historic district form the practical visitor core. Independent shops, food, lodging and galleries occupy old limestone buildings, making architectural history part of the everyday walking experience instead of something confined to a museum campus.",
      "The town rewards a slower visit more than a checklist. Park once, walk the district, add one focused history stop, then use the wider Guadalupe River and Hill Country landscape for the outdoor half of the itinerary. Weekends and special events can bring more traffic than the town's scale suggests."
    ],
    officialUrl: "https://www.visitcomforttx.com/", sourceCheckedAt,
    directions: "Comfort is in Kendall County just off I-10 at Highway 27, northwest of San Antonio and close to Boerne, Kerrville and Fredericksburg. High Street is the primary walkable visitor core.",
    accessibilityNotes: "Historic sidewalks and older buildings vary in grade and entrance design. Confirm individual lodging, shop, museum and outdoor-site accommodations before travel.",
    areaGuide: {
      intro: "Treat High Street as a walkable base and build outward to the Guadalupe River landscape, wineries or other Hill Country stops only after giving the historic district time to work on foot.",
      nearbyAttractions: [{ name: "Comfort Historic District", description: "A large concentration of nineteenth- and early twentieth-century buildings that preserves the town's German-Texan settlement pattern." }, { name: "High Street", description: "The practical center for architecture, independent shops, galleries, food and local history." }],
      foodAndDrink: [{ name: "High Street and central Comfort", description: "Walkable local dining, cafes and tasting rooms occupy the historic core." }],
      lodging: [{ name: "Historic Comfort", description: "Staying in or near the historic district supports a park-once weekend and easy evening walking." }],
      neighborhoods: [{ name: "High Street historic core", description: "The main concentration of preserved limestone architecture and visitor businesses." }],
      familyStops: [{ name: "Historic-district walking tour", description: "A flexible, low-pressure way to make architecture and settlement history visible without a long museum block." }],
      sideTrips: [{ name: "Boerne", description: "Pair Comfort with another Kendall County Hill Country town.", href: "/destination/boerne" }, { name: "Hill Country region", description: "Extend the itinerary through nearby river, heritage and scenic-drive destinations.", href: "/explore/region/hill-country" }]
    },
    authorityGuide: {
      whyItMatters: "Comfort preserves an unusually intact German-Texan townscape and a distinctive freethinker-settlement story, making architecture and cultural history the center of the visit rather than decorative background.",
      assessment: { recommendedVisit: "One full day; one night for a relaxed walking-and-food weekend.", physicalEffort: "Low", weatherExposure: "Mostly outdoor walking with indoor stops", planningLevel: "Low to moderate", familyFit: "Good for families who enjoy history, architecture and a slower town-centered itinerary.", firstTimeValue: "Very high for historic-district travelers and strong as part of a western Hill Country loop." },
      itineraries: [{ label: "Half day", duration: "4-5 hours", steps: ["Walk High Street", "Use a historic-building guide", "Stop for local food or shopping"] }, { label: "Full day", duration: "8-10 hours", steps: ["Explore the historic district in the morning", "Break for lunch", "Add a focused history or outdoor stop", "Return for an easy evening"] }, { label: "Overnight", duration: "1 night", steps: ["Give Comfort a slow first day", "Use the next morning for the Guadalupe River landscape or nearby Hill Country", "Continue to Boerne, Kerrville or Fredericksburg"] }],
      sources: [{ label: "Visit Comfort TX", url: "https://www.visitcomforttx.com/", scope: "Official destination marketing organization visitor planning" }, { label: "Visit Comfort — Explore", url: "https://www.visitcomforttx.com/explore-comfort-texas", scope: "Current history, outdoors and visitor attractions" }]
    }, featured: true
  },
  {
    id: "small-town-hico", brandId: "texasdefined", slug: "hico", name: "Hico",
    summary: "Hico is a North-Central Texas small town with a restored historic commercial core, vintage wall murals, destination dining, live music and a 43-acre city park along the Bosque River with paved trails and family recreation.",
    category: "small-towns", region: "prairies-lakes", nearestTown: "Hico", county: "Hamilton",
    coordinates: { lat: 31.9829, lng: -98.0337 },
    hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/HicoTX-1.jpg?width=1600", alt: "Historic downtown storefronts in Hico, Texas", width: 1200, height: 800, credit: "David R. Tribble (Loadmaster) · CC BY-SA 3.0 · Wikimedia Commons" },
    bestSeason: "Fall through spring for downtown walking and Bosque River trails; summer works best with early outdoor time and indoor dining or shopping breaks",
    entryNote: "Event and live-music schedules change frequently, and individual attractions keep independent hours. Check current Hico events and operating times before travel, especially if a particular performance or activity is central to the trip.",
    highlights: ["historic downtown", "vintage murals", "Bosque River", "Hico City Park", "destination dining", "live music"],
    body: [
      "Hico's modern visitor identity is built around a compact historic downtown rather than a single marquee attraction. Restored commercial buildings, old advertising murals, shops and restaurants make the center easy to explore on foot and give a first-time visitor a strong sense of place within a few blocks.",
      "The Bosque River adds the outdoor counterpoint. Hico City Park stretches along both sides of the river with paved hike-and-bike trail mileage, playgrounds, sports facilities, picnic areas, RV spaces and a splash pad, making the town practical for families as well as food-and-shopping road trippers.",
      "A useful visit gives downtown and the river separate blocks. Browse the historic core and murals when businesses are open, then use the park for walking or family downtime. Current live-music and event calendars can turn an ordinary overnight into a stronger weekend, but they should be verified rather than assumed."
    ],
    officialUrl: "https://visithicotexas.com/", sourceCheckedAt,
    directions: "Hico is in Hamilton County at US 281 and Texas Highway 6, southwest of the Dallas-Fort Worth area. Historic downtown and Hico City Park along the Bosque River are the main visitor anchors.",
    accessibilityNotes: "Downtown storefronts and older buildings vary. Hico City Park includes paved trail segments and public facilities, but confirm current accessible parking and specific attraction access before travel.",
    areaGuide: {
      intro: "Use downtown for the town's food, murals and architecture, then shift deliberately to the Bosque River park rather than treating Hico as only a shopping stop.",
      nearbyAttractions: [{ name: "Historic downtown Hico", description: "Restored storefronts, murals, shops, restaurants and visitor landmarks form the compact commercial core." }, { name: "Hico City Park", description: "A 43-acre Bosque River park with paved trails, playgrounds, recreation fields, pavilions and RV facilities." }],
      foodAndDrink: [{ name: "Historic downtown", description: "Hico's strongest food and coffee options are integrated into the walkable downtown experience." }],
      lodging: [{ name: "Central Hico", description: "Useful for combining dinner or live music with a morning river walk." }],
      neighborhoods: [{ name: "Downtown commercial district", description: "The principal zone for historic architecture, murals, shopping and dining." }],
      familyStops: [{ name: "Hico City Park", description: "Trails, playgrounds, open space and seasonal splash-pad use make the riverfront an easy family break." }],
      sideTrips: [{ name: "Prairies & Lakes region", description: "Connect Hico with courthouse towns, state parks and road-trip stops across North-Central Texas.", href: "/explore/region/prairies-lakes" }, { name: "Texas Trip Planner", description: "Build a small-town and riverfront route around Hico.", href: "/explore/trip-planner?destination=hico" }]
    },
    authorityGuide: {
      whyItMatters: "Hico demonstrates how a small historic commercial center can support a complete modern visit through food, music, murals and a substantial public riverfront park rather than relying on nostalgia alone.",
      assessment: { recommendedVisit: "Half to full day; one night for live music or a slower food-and-river itinerary.", physicalEffort: "Low", weatherExposure: "Mixed indoor/outdoor", planningLevel: "Low to moderate", familyFit: "Strong because downtown can be balanced with riverfront trails and play areas.", firstTimeValue: "High for road trippers seeking a polished but still compact Texas small-town stop." },
      itineraries: [{ label: "Half day", duration: "4-5 hours", steps: ["Walk downtown and photograph the murals", "Stop for a local meal or coffee", "Take a Bosque River park walk"] }, { label: "Full day", duration: "8-10 hours", steps: ["Explore shops and architecture", "Have a destination lunch", "Use the afternoon at Hico City Park", "Check current evening music or events"] }, { label: "Overnight", duration: "1 night", steps: ["Give downtown an unhurried afternoon and evening", "Use the next morning for the river trail", "Continue through the Prairies & Lakes region"] }],
      sources: [{ label: "Visit Hico Texas", url: "https://visithicotexas.com/", scope: "Official visitor information, dining, lodging and events" }, { label: "Visit Hico — Explore", url: "https://visithicotexas.com/explore/", scope: "Current downtown, mural and Hico City Park information" }]
    }, featured: true
  },
  {
    id: "small-town-port-isabel", brandId: "texasdefined", slug: "port-isabel", name: "Port Isabel",
    summary: "Port Isabel is a Lower Laguna Madre coastal town anchored by the historic 1852 lighthouse, a walkable town square, maritime museums, fishing access and the Queen Isabella Causeway connection to South Padre Island.",
    category: "small-towns", region: "south-texas", nearestTown: "Port Isabel", county: "Cameron",
    coordinates: { lat: 26.0734, lng: -97.2086 },
    hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Port%20Isabel,%20Texas%20Lighthouse.jpg?width=1600", alt: "Historic Port Isabel Lighthouse overlooking the Lower Laguna Madre in Port Isabel, Texas", width: 4608, height: 3456, credit: "Billy D. Wagner · CC BY-SA 4.0 · Wikimedia Commons" },
    bestSeason: "Fall through spring for mild coastal touring; summer for fishing and beach-region trips with heat, storms and lighthouse weather closures considered",
    entryNote: "The lighthouse operates weather permitting, and wet or high-wind conditions can close portions of the climb. Confirm current Texas Historical Commission hours and access before arrival; fishing, boating and coastal plans should also account for marine weather.",
    highlights: ["Port Isabel Lighthouse", "Lower Laguna Madre", "historic museums", "fishing", "town square", "Queen Isabella Causeway"],
    body: [
      "Port Isabel is more than the mainland gateway to South Padre Island. Its lighthouse and historic square create a distinct town center tied to nineteenth-century Gulf navigation, military history, shipwrecks and the long maritime economy of the Lower Laguna Madre.",
      "The 1852 lighthouse is the clearest visual anchor and remains open for public climbs when weather permits. Nearby museum interpretation expands the story into local settlement and Gulf shipwreck history, while the bayfront setting makes fishing, boating, dolphin watching and nature observation part of the same visit.",
      "A first trip should give Port Isabel its own half or full day instead of treating it only as a causeway crossing. Start with the lighthouse and museums, then add waterfront food or fishing. Coastal weather is operationally important here: wind, rain and storms can change lighthouse access and water plans quickly."
    ],
    officialUrl: "https://www.portisabel-texas.com/", sourceCheckedAt,
    directions: "Port Isabel is in Cameron County on the Lower Laguna Madre at the western end of the Queen Isabella Causeway, about 2.6 miles from South Padre Island. The lighthouse square is the best visitor orientation point.",
    accessibilityNotes: "The lighthouse climb includes stairs and ladders and has specific age and safety rules; it is not an accessible experience for every visitor. The Keeper's Cottage visitor center and other museums offer alternatives. Confirm current accommodations directly with the site.",
    areaGuide: {
      intro: "Start at the lighthouse square to understand Port Isabel as a historic coastal town, then choose a maritime museum, fishing block or bay activity based on weather and interests.",
      nearbyAttractions: [{ name: "Port Isabel Lighthouse State Historic Site", description: "The 1852 lighthouse, Keeper's Cottage and public climb are the town's central historic attraction, weather permitting." }, { name: "Lower Laguna Madre", description: "The shallow bay supports fishing, boating, wildlife viewing and much of Port Isabel's coastal identity." }],
      foodAndDrink: [{ name: "Lighthouse square and waterfront", description: "Seafood, Tex-Mex and local dining are concentrated near the historic center and bayfront corridors." }],
      lodging: [{ name: "Port Isabel", description: "Useful for a quieter mainland base with quick access to fishing and the lighthouse." }],
      neighborhoods: [{ name: "Lighthouse and town-square district", description: "The most walkable cluster of history, museums, visitor services, shops and food." }],
      familyStops: [{ name: "Keeper's Cottage and museums", description: "Good alternatives or companions to the lighthouse climb for families and visitors with mobility limitations." }],
      sideTrips: [{ name: "South Texas region", description: "Connect Port Isabel with Rio Grande Valley history, wildlife and Gulf destinations.", href: "/explore/region/south-texas" }, { name: "Texas Trip Planner", description: "Build a Lower Laguna Madre coastal itinerary around Port Isabel.", href: "/explore/trip-planner?destination=port-isabel" }]
    },
    authorityGuide: {
      whyItMatters: "Port Isabel combines one of Texas's most visitor-accessible historic lighthouses with a living Lower Laguna Madre fishing community, giving the South Texas coast a strong history-and-maritime town node separate from the beach resort across the causeway.",
      assessment: { recommendedVisit: "One full day; one or two nights for fishing, museums and a broader Laguna Madre itinerary.", physicalEffort: "Low around town; high for the lighthouse climb", weatherExposure: "Coastal and weather-sensitive", planningLevel: "Moderate", familyFit: "Strong when the lighthouse's stair and age restrictions are considered in advance.", firstTimeValue: "Very high for Lower Rio Grande Valley and Gulf Coast travelers who want history as well as water access." },
      itineraries: [{ label: "Half day", duration: "4-5 hours", steps: ["Visit the lighthouse square", "Tour the Keeper's Cottage or a museum", "Walk the waterfront and eat locally"] }, { label: "Full day", duration: "8-10 hours", steps: ["Climb the lighthouse if weather permits", "Use midday for museums and lunch", "Add fishing, a boat trip or waterfront nature time"] }, { label: "Overnight", duration: "1-2 nights", steps: ["Give Port Isabel history a dedicated block", "Use a second block for Lower Laguna Madre recreation", "Add South Padre or another South Texas destination without reducing Port Isabel to a drive-through"] }],
      sources: [{ label: "Visit Port Isabel", url: "https://www.portisabel-texas.com/", scope: "City-sponsored visitor planning, downtown, food, fishing and museums" }, { label: "Texas Historical Commission — Port Isabel Lighthouse", url: "https://thc.texas.gov/historic-sites/port-isabel-lighthouse", scope: "Current lighthouse history, hours, admission and weather-dependent access" }, { label: "Port Isabel Chamber", url: "https://www.portisabelchamber.com/visit/", scope: "Current visitor, lodging and Lower Laguna Madre planning" }]
    }, featured: true
  }
];