import type { Destination } from "./types";

const sourceCheckedAt = "2026-09-02";

export const smallTownWave9Destinations: Destination[] = [
  {
    id: "small-town-castroville", brandId: "texasdefined", slug: "castroville", name: "Castroville",
    summary: "Castroville is a Medina River town west of San Antonio where Alsatian settlement history, preserved nineteenth-century architecture, a large historic district, Landmark Inn and riverfront parks create one of Texas's most distinctive European-heritage small-town visits.",
    category: "small-towns", region: "hill-country", nearestTown: "Castroville", county: "Medina",
    coordinates: { lat: 29.3558, lng: -98.8786 },
    hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Castroville1%20(1%20of%201).jpg?width=1600", alt: "St. Louis Catholic Church in the Castroville Historic District, Texas", width: 1200, height: 800, credit: "Renelibrary · CC BY-SA 4.0 · Wikimedia Commons" },
    bestSeason: "Fall through spring for historic walking and riverfront trails; warm months for park and pool recreation with heat planning",
    entryNote: "Historic homes, churches and museums keep different schedules, so confirm current hours before building a trip around a particular interior tour. Summer walking can be hot, and Medina River conditions can change after heavy rain.",
    highlights: ["Castroville Historic District", "Alsatian heritage", "Landmark Inn", "St. Louis Catholic Church", "Medina River", "historic walking tour"],
    body: [
      "Castroville was founded in 1844 by Henri Castro and settlers from Alsace and other parts of Europe. The resulting limestone and timber-frame architecture gives the town a visual identity unlike most Texas communities, and the historic district preserves dozens of nineteenth- and early twentieth-century structures.",
      "The strongest first visit begins on foot. Landmark Inn, St. Louis Catholic Church, historic homes and the former county courthouse help explain the settlement pattern, while the Medina River and Castroville Regional Park add a natural counterpoint to the architecture.",
      "Castroville works well as a full-day heritage stop from San Antonio, but an overnight stay allows a slower walking tour and more riverfront time. Festival weekends can materially change parking and lodging demand, and individual historic properties should be checked for current access before arrival."
    ],
    officialUrl: "https://visitcastrovilletx.com/", sourceCheckedAt,
    directions: "Castroville is in Medina County about 25 miles west of San Antonio on US 90. The historic district around Fiorella Street and Landmark Inn forms the main visitor core.",
    accessibilityNotes: "Historic buildings and older sidewalks vary in accessibility. Confirm entrances at specific historic properties; city parks offer more flexible outdoor options but trail surfaces and river access may vary.",
    areaGuide: {
      intro: "Start with the historic walking district, then use Landmark Inn and the Medina River to connect Castroville's settlement story with its landscape.",
      nearbyAttractions: [{ name: "Landmark Inn State Historic Site", description: "A major preserved travel, commerce and community site beside the Medina River." }, { name: "Castroville Historic District", description: "A large collection of Alsatian-influenced homes, churches and civic structures best experienced on foot." }],
      foodAndDrink: [{ name: "Historic Castroville", description: "Local restaurants and bakeries fit naturally into the walking-tour core." }],
      lodging: [{ name: "Castroville and Medina River area", description: "Useful for a slower heritage weekend and easy access to downtown and parks." }],
      neighborhoods: [{ name: "Fiorella Street historic core", description: "The most concentrated zone for civic architecture, churches and historic homes." }],
      familyStops: [{ name: "Castroville Regional Park", description: "Trails, green space and recreation provide a flexible break from history-focused stops." }],
      sideTrips: [{ name: "Hill Country region", description: "Connect Castroville with nearby heritage towns and scenic drives west and north of San Antonio.", href: "/explore/region/hill-country" }, { name: "Painted Churches", description: "Extend the cultural-heritage theme through TexasDefined's statewide church collection.", href: "/explore/painted-churches" }]
    },
    authorityGuide: {
      whyItMatters: "Castroville preserves one of Texas's clearest Alsatian settlement landscapes, making immigrant architecture, religion, travel history and the Medina River visible within a compact town.",
      assessment: { recommendedVisit: "One full day; one night for a slower walking-and-river itinerary.", physicalEffort: "Low to moderate", weatherExposure: "Mixed indoor/outdoor", planningLevel: "Moderate", familyFit: "Strong for families who balance historic walking with park time.", firstTimeValue: "Very high for heritage travelers and especially useful as a San Antonio-area day trip." },
      itineraries: [{ label: "Half day", duration: "4-5 hours", steps: ["Begin at Landmark Inn", "Walk the historic district", "Visit St. Louis Church exterior/interior if open", "Finish along the Medina River"] }, { label: "Full day", duration: "8-10 hours", steps: ["Use the morning for the historic walking tour", "Break for lunch", "Add a museum or living-history stop", "Spend the afternoon at the river or regional park"] }, { label: "Overnight", duration: "1 night", steps: ["Give the historic district a full first day", "Use the next morning for riverfront recreation", "Continue into Medina County or the Hill Country"] }],
      sources: [{ label: "Visit Castroville", url: "https://visitcastrovilletx.com/", scope: "Official visitor planning, historic district and attractions" }, { label: "City of Castroville historic walking tour", url: "https://www.castrovilletx.gov/2252/Historic-Walking-Tour", scope: "Current city walking-tour and historic-property information" }]
    }, featured: true
  },
  {
    id: "small-town-la-grange", brandId: "texasdefined", slug: "la-grange", name: "La Grange",
    summary: "La Grange is a Colorado River courthouse town with a walkable historic square, Czech and German heritage, the Texas Quilt Museum, restored Casino Hall and the Monument Hill and Kreische Brewery historic landscape overlooking the river.",
    category: "small-towns", region: "prairies-lakes", nearestTown: "La Grange", county: "Fayette",
    coordinates: { lat: 29.9055, lng: -96.8766 },
    hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Fayette%20County%20courthouse%20-%20La%20Grange%20TX.jpg?width=1600", alt: "Fayette County Courthouse in La Grange, Texas", width: 1024, height: 685, credit: "tap houston · CC BY 2.0 · Wikimedia Commons" },
    bestSeason: "Fall through spring for square walking and Monument Hill trails; spring for green Colorado River scenery and regional heritage events",
    entryNote: "Museums, heritage centers and state historic sites may keep limited days or seasonal hours. Confirm current schedules before travel, particularly for guided tours, historic interiors and special Czech or German cultural events.",
    highlights: ["Fayette County Courthouse", "Monument Hill", "Kreische Brewery", "Texas Czech heritage", "Texas Quilt Museum", "Casino Hall"],
    body: [
      "La Grange's courthouse square gives the town a strong architectural center, but its visitor value extends far beyond the square. Czech and German settlement history, local museums and the Colorado River landscape all contribute to a broader Central Texas heritage story.",
      "South of downtown, Monument Hill and the Kreische Brewery historic sites combine Texas military memory, German immigrant industry and a high overlook above the Colorado River. In town, Casino Hall, the Texas Quilt Museum and Czech-heritage institutions add cultural depth without requiring long drives between stops.",
      "A full day can cover downtown and one major heritage site, but an overnight works better for travelers who want both museums and outdoor history. Event weekends and museum schedules matter, so verify current hours rather than assuming every attraction operates daily."
    ],
    officialUrl: "https://lagrangetx.org/visit-lagrange/", sourceCheckedAt,
    directions: "La Grange is the Fayette County seat on the Colorado River between Austin and Houston. The courthouse square and Casino Hall visitor center form the best downtown orientation point.",
    accessibilityNotes: "Downtown is compact, but older buildings and hillside historic sites vary. Confirm accessible entrances and trail conditions at Monument Hill and individual museums before travel.",
    areaGuide: {
      intro: "Use the courthouse square as the base, then choose either the Czech/German cultural layer or Monument Hill and Kreische Brewery for the deeper half of the visit.",
      nearbyAttractions: [{ name: "Monument Hill & Kreische Brewery State Historic Sites", description: "A combined military-history, immigrant-industry and Colorado River overlook south of downtown." }, { name: "Texas Czech Heritage and Cultural Center", description: "A major regional institution interpreting Czech settlement and cultural traditions in Texas." }],
      foodAndDrink: [{ name: "Courthouse square and central La Grange", description: "Local restaurants and cafes make the historic center a practical meal stop between museums." }],
      lodging: [{ name: "La Grange and Fayette County", description: "A useful base for a heritage loop through nearby German and Czech communities." }],
      neighborhoods: [{ name: "Historic courthouse square", description: "The architectural and commercial heart of La Grange." }],
      familyStops: [{ name: "Casino Hall visitor center", description: "A convenient orientation point and low-effort introduction to local history and current events." }],
      sideTrips: [{ name: "Prairies & Lakes region", description: "Connect La Grange with courthouse towns, cultural sites and Colorado River destinations.", href: "/explore/region/prairies-lakes" }, { name: "Texas Trip Planner", description: "Build a Fayette County history-and-culture itinerary around La Grange.", href: "/explore/trip-planner?destination=la-grange" }]
    },
    authorityGuide: {
      whyItMatters: "La Grange concentrates courthouse architecture, Texas military history and Czech-German immigrant culture in a compact Colorado River setting, making it one of the strongest heritage nodes between Austin and Houston.",
      assessment: { recommendedVisit: "One full day; one night for museums plus Monument Hill and the surrounding heritage corridor.", physicalEffort: "Low to moderate", weatherExposure: "Mixed indoor/outdoor", planningLevel: "Moderate", familyFit: "Strong for families interested in museums, architecture and manageable outdoor history.", firstTimeValue: "High for Central Texas road trips and very high for Czech/German heritage travelers." },
      itineraries: [{ label: "Half day", duration: "4-5 hours", steps: ["Walk the courthouse square", "Visit Casino Hall or one museum", "Finish with a short Colorado River or heritage stop"] }, { label: "Full day", duration: "8-10 hours", steps: ["Start downtown", "Visit the Texas Quilt Museum or Czech center", "Break for lunch", "Use the afternoon at Monument Hill and Kreische Brewery"] }, { label: "Overnight", duration: "1 night", steps: ["Give downtown and museums a full first day", "Use the next morning for Monument Hill or another Fayette County heritage site", "Continue through the Prairies & Lakes region"] }],
      sources: [{ label: "Visit La Grange", url: "https://lagrangetx.org/visit-lagrange/", scope: "La Grange Area Chamber visitor planning, history and attractions" }, { label: "La Grange Visitors Center", url: "https://lagrangetx.org/attractions/", scope: "Current visitor-center, Casino Hall and local attraction information" }]
    }, featured: true
  },
  {
    id: "small-town-cuero", brandId: "texasdefined", slug: "cuero", name: "Cuero",
    summary: "Cuero is a DeWitt County courthouse town with a historic Main Street district, Chisholm Trail and ranching history, Turkeyfest traditions, multiple museums, murals, a large municipal park and access to the Guadalupe River paddling corridor.",
    category: "small-towns", region: "south-texas", nearestTown: "Cuero", county: "DeWitt",
    coordinates: { lat: 29.0939, lng: -97.2892 },
    hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dewitt%20courthouse.jpg?width=1600", alt: "DeWitt County Courthouse in Cuero, Texas", width: 1300, height: 1585, credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons" },
    bestSeason: "Spring for wildflowers and mild outdoor weather; fall for Turkeyfest and downtown events when current dates are confirmed",
    entryNote: "Major events can change traffic and parking, and museum hours vary. Confirm Turkeyfest, Christmas programming, museum schedules and Guadalupe River conditions before building a trip around a specific event or paddling outing.",
    highlights: ["DeWitt County Courthouse", "historic downtown", "Chisholm Trail Heritage Museum", "Turkeyfest", "Guadalupe River", "Cuero Municipal Park"],
    body: [
      "Cuero grew at a South Texas crossroads shaped by cattle, rail and agriculture. Its courthouse, historic commercial district and museum network give the town a strong physical center for understanding the regional ranching and trail economy.",
      "The Chisholm Trail Heritage Museum deepens that story, while Cuero's long association with commercial turkey raising evolved into the well-known Turkeyfest tradition. Murals, historic storefronts and several specialized museums make downtown useful beyond festival weekends.",
      "Outdoor options broaden the trip through Cuero Municipal Park and the Guadalupe River paddling corridor. A first visit works best by pairing one substantial history block with the park or river, while event-focused trips should account for crowds and seasonal schedule changes."
    ],
    officialUrl: "https://cuero.org/", sourceCheckedAt,
    directions: "Cuero is the DeWitt County seat in South Texas, southeast of San Antonio and inland from the Coastal Bend. The courthouse and Main Street district form the main walkable visitor core.",
    accessibilityNotes: "Downtown museums and historic buildings vary in accessibility. Municipal park facilities are generally easier to navigate, while river access and paddling launches should be checked for current conditions and mobility requirements.",
    areaGuide: {
      intro: "Start with courthouse-square and ranching history, then choose either the municipal park or Guadalupe River corridor for the outdoor half of the day.",
      nearbyAttractions: [{ name: "Chisholm Trail Heritage Museum", description: "A major local institution interpreting cattle-trail, cowboy and regional ranching history." }, { name: "Cuero Municipal Park", description: "A large public recreation complex with lake, trails, sports facilities and seasonal community events." }],
      foodAndDrink: [{ name: "Historic downtown Cuero", description: "Local restaurants, shops and the Cuero Pecan House fit naturally into a Main Street itinerary." }],
      lodging: [{ name: "Central Cuero", description: "Useful for event weekends and early access to museums or regional drives." }],
      neighborhoods: [{ name: "Downtown Main Street district", description: "The core cluster for courthouse architecture, museums, murals and local businesses." }],
      familyStops: [{ name: "Cuero Municipal Park", description: "A flexible family stop with trails, open space and seasonal recreation facilities." }],
      sideTrips: [{ name: "South Texas region", description: "Connect Cuero with ranching, river and cultural destinations across inland South Texas.", href: "/explore/region/south-texas" }, { name: "Texas Trip Planner", description: "Build a South Texas history-and-outdoors route around Cuero.", href: "/explore/trip-planner?destination=cuero" }]
    },
    authorityGuide: {
      whyItMatters: "Cuero ties cattle-trail history, courthouse-town architecture, a distinctive agricultural festival tradition and Guadalupe River recreation into a durable South Texas destination node.",
      assessment: { recommendedVisit: "One full day; one night during major events or for a paddling-and-history combination.", physicalEffort: "Low to moderate", weatherExposure: "Mixed indoor/outdoor", planningLevel: "Moderate", familyFit: "Very strong because museums, murals, parks and events can be combined flexibly.", firstTimeValue: "High for South Texas road trippers and especially strong for ranching-history travelers." },
      itineraries: [{ label: "Half day", duration: "4-5 hours", steps: ["Walk downtown and the courthouse area", "Visit the Chisholm Trail Heritage Museum", "Finish with murals or a park stop"] }, { label: "Full day", duration: "8-10 hours", steps: ["Start with downtown museums", "Break for lunch", "Use the afternoon at Cuero Municipal Park or the Guadalupe River corridor", "Check current evening events"] }, { label: "Overnight", duration: "1 night", steps: ["Give the history core a full first day", "Use the next morning for river or park recreation", "Continue through inland South Texas"] }],
      sources: [{ label: "Cuero Chamber of Commerce", url: "https://cuero.org/", scope: "Official local visitor, business and destination information" }, { label: "Cuero attractions", url: "https://cuero.org/attractions/", scope: "Current historic landmarks, museums, outdoor recreation and arts" }, { label: "City of Cuero attractions", url: "https://www.cityofcuero.com/379/Attractions-Museums-Parks", scope: "Current city museums, parks, events and visitor facilities" }]
    }, featured: true
  },
  {
    id: "small-town-fort-davis", brandId: "texasdefined", slug: "fort-davis", name: "Fort Davis",
    summary: "Fort Davis is a high-elevation Jeff Davis County community in the Davis Mountains where a nationally significant frontier military post, Buffalo Soldier history, mountain scenery, dark skies, Davis Mountains State Park and McDonald Observatory create a concentrated Far West Texas base.",
    category: "small-towns", region: "big-bend", nearestTown: "Fort Davis", county: "Jeff Davis",
    coordinates: { lat: 30.5882, lng: -103.8946 },
    hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Fort%20Davis%20National%20Historic%20Site%20P9102741.jpg?width=1600", alt: "Historic buildings and mountain landscape at Fort Davis National Historic Site, Texas", width: 2288, height: 1712, credit: "National Park Service Digital Image Archives · Public domain · Wikimedia Commons" },
    bestSeason: "Spring and fall for hiking and historic-site walking; clear nights year-round for astronomy, with winter cold and summer storms planned for",
    entryNote: "Fort Davis sits at high elevation and weather changes quickly. Confirm National Historic Site, state park and McDonald Observatory schedules before travel; major observatory programs often require reservations, and mountain roads can be affected by storms or winter weather.",
    highlights: ["Fort Davis National Historic Site", "Buffalo Soldier history", "Davis Mountains State Park", "McDonald Observatory", "Davis Mountains Scenic Loop", "dark skies"],
    body: [
      "Fort Davis developed around the U.S. Army post established in 1854 on the San Antonio-El Paso Road. The preserved fort is one of the best surviving frontier military posts in the Southwest and is especially important for interpreting the service of the Black regiments later known as Buffalo Soldiers.",
      "The surrounding Davis Mountains make the town equally important for outdoor and science travel. Davis Mountains State Park, the scenic mountain loop and McDonald Observatory place hiking, geology, wildlife and astronomy within a relatively compact regional circuit.",
      "A first visit deserves at least one full day, and two nights are better because the fort, state park and observatory each merit separate time blocks. Reservations, altitude, night driving and rapidly changing mountain weather are practical planning factors rather than minor details."
    ],
    officialUrl: "https://www.fortdavis.com/", sourceCheckedAt,
    directions: "Fort Davis is the Jeff Davis County seat in Far West Texas in the Davis Mountains, north of Marfa and west of Alpine. TX 17 and TX 118 provide the principal regional connections.",
    accessibilityNotes: "Historic-site paths, mountain trails and observatory facilities vary. The National Park Service and other operators publish site-specific accessibility information; confirm current routes and mobility accommodations before travel.",
    areaGuide: {
      intro: "Treat Fort Davis as a three-part destination: frontier military history, mountain recreation and dark-sky astronomy, with each given its own time block.",
      nearbyAttractions: [{ name: "Fort Davis National Historic Site", description: "A major National Park Service site preserving frontier military architecture and Buffalo Soldier history." }, { name: "Davis Mountains State Park", description: "Mountain trails, scenic overlooks and historic Indian Lodge immediately connect the town to high-country recreation." }],
      foodAndDrink: [{ name: "Central Fort Davis", description: "Local cafes and restaurants serve as practical breaks between the historic site, park and observatory drives." }],
      lodging: [{ name: "Fort Davis and Davis Mountains", description: "The most convenient base for early hiking and late-night astronomy without adding long regional drives." }],
      neighborhoods: [{ name: "Historic Fort Davis core", description: "The town center and National Historic Site corridor anchor the community's frontier-era identity." }],
      familyStops: [{ name: "Fort Davis National Historic Site", description: "A strong multigenerational history stop with preserved buildings, exhibits and open-space interpretation." }],
      sideTrips: [{ name: "Davis Mountains State Park", description: "Add a mountain hiking and scenic-drive block close to town.", href: "/destination/davis-mountains-state-park" }, { name: "Alpine", description: "Connect Fort Davis to the regional service and cultural hub to the southeast.", href: "/destination/alpine" }, { name: "Big Bend region", description: "Extend the itinerary across Far West Texas mountain, desert and border destinations.", href: "/explore/region/big-bend" }]
    },
    authorityGuide: {
      whyItMatters: "Fort Davis is a rare Texas destination where nationally significant military and African American history, high-country public lands and world-class astronomy reinforce one another within the same mountain community.",
      assessment: { recommendedVisit: "Two nights for fort, state park and observatory; longer when linking Marfa, Alpine or Big Bend.", physicalEffort: "Low to moderate", weatherExposure: "Mixed indoor/outdoor", planningLevel: "High", familyFit: "Very strong for families interested in history, hiking and astronomy when schedules are reserved in advance.", firstTimeValue: "Exceptional for Far West Texas travelers because multiple flagship attractions cluster around one small town." },
      itineraries: [{ label: "Half day", duration: "4-5 hours", steps: ["Tour Fort Davis National Historic Site", "Walk central Fort Davis", "Use a short mountain overlook or scenic-drive stop"] }, { label: "Full day", duration: "8-10 hours", steps: ["Begin at the historic fort", "Break for lunch", "Spend the afternoon in Davis Mountains State Park", "Use the evening for a reserved astronomy program if available"] }, { label: "Two nights", duration: "2 nights", steps: ["Give military history and the state park separate blocks", "Reserve one evening for McDonald Observatory", "Add Alpine or Marfa without compressing mountain driving"] }],
      sources: [{ label: "Fort Davis Chamber and Visitor Center", url: "https://www.fortdavis.com/", scope: "Official local visitor planning, attractions and mountain-region context" }, { label: "Fort Davis attractions", url: "https://www.fortdavis.com/Attractions", scope: "Current attractions, trails and neighboring-town planning" }, { label: "National Park Service — Fort Davis", url: "https://www.nps.gov/foda/", scope: "Authoritative military history, visitor access and National Historic Site information" }]
    }, featured: true
  }
];