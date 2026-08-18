import type { Destination, DestinationAreaGuide, DestinationAreaItemList } from "./types";

type TopAttractionExpansion = {
  summary: string;
  nearestTown: string;
  hero: Destination["hero"];
  bestSeason: string;
  entryNote: string;
  highlights: string[];
  body: string[];
  officialUrl: string;
  sourceCheckedAt: string;
  areaGuide: DestinationAreaGuide;
  managingAuthority?: string;
  reservationUrl?: string;
  county?: string;
  address?: string;
  directions?: string;
  accessibilityNotes?: string;
  featured?: boolean;
};

function items(...rows: Array<[string, string, string, string?]>): DestinationAreaItemList {
  return rows.map(([name, proximity, description, href]) => ({
    name,
    proximity,
    description,
    ...(href ? { href } : {}),
  })) as DestinationAreaItemList;
}

const curated: Record<string, TopAttractionExpansion> = {
  "san-antonio-missions-national-historical-park": {
    summary:
      "Four Spanish colonial mission communities south of downtown San Antonio—Concepción, San José, San Juan and Espada—preserved along the San Antonio River as living parish, architectural and cultural landscapes connected to the city's UNESCO World Heritage story.",
    nearestTown: "San Antonio",
    bestSeason:
      "Fall through spring for comfortable walking and biking; summer visits are best early in the day with shade and water built into the route",
    entryNote:
      "The national historical park is free and no entrance pass is required. The four NPS mission sites are spread along the river corridor, and their churches remain active parishes, so services, ceremonies or preservation work can temporarily affect church access. Allow several hours to see more than one mission.",
    highlights: [
      "Mission San José and the park's main visitor center",
      "Mission Concepción's preserved church and stone architecture",
      "Mission San Juan and the agricultural landscape",
      "Mission Espada, acequia history and southern mission corridor",
      "Mission Reach trails connecting the sites along the San Antonio River",
    ],
    body: [
      "San Antonio Missions National Historical Park is best understood as a connected cultural landscape rather than a single monument. The National Park Service preserves four missions—Concepción, San José, San Juan and Espada—south of downtown, while the Alamo forms the fifth San Antonio mission in the broader UNESCO World Heritage designation. Together they show how Spanish colonial settlement, Indigenous communities, agriculture, religion and water management reshaped the river corridor.",
      "Mission San José is the most useful first stop because it has the park's main visitor center and one of the largest, most complete mission compounds. The stone church, defensive walls, granary and reconstructed rooms make it easier to understand the mission as a community rather than only a church facade. Ranger information here can also help visitors decide how much of the larger corridor fits into the day.",
      "Concepción, San Juan and Espada each add something different. Concepción is known for its remarkably intact church and architectural fabric. San Juan emphasizes agriculture and the mission landscape, while Espada connects visitors with the southern reach of the historic acequia system. Seeing all four reveals how mission communities were spaced along the river rather than clustered in one downtown district.",
      "The San Antonio River is the thread tying the sites together. Mission Reach trails make walking and bicycling a practical alternative to driving portions of the corridor, and the restored river landscape gives the trip an outdoor dimension that the downtown Alamo cannot provide. Heat and distance matter, however, so cyclists and walkers should plan water, turnaround points and daylight conservatively.",
      "These are also active religious sites. The mission churches continue to serve parish communities, which means visitors should treat worship, weddings and other ceremonies differently from museum programming. Quiet behavior inside churches and flexibility around temporary access changes are part of visiting a living heritage landscape rather than a closed historic reconstruction.",
      "For a first San Antonio history itinerary, pair the mission corridor with The Alamo and the River Walk but do not compress all three into a rushed checklist. The Alamo introduces the northern mission and 1836 story, the River Walk shows how the river shaped the city center, and the four southern missions reveal a much deeper colonial and Indigenous history across Bexar County.",
    ],
    managingAuthority: "National Park Service",
    officialUrl: "https://www.nps.gov/saan/planyourvisit/index.htm",
    sourceCheckedAt: "2026-08-17",
    county: "Bexar",
    address: "6701 San Jose Drive, San Antonio, TX 78214",
    directions:
      "Begin at Mission San José if you want ranger orientation, then travel south or north between the other missions by car, bicycle or the Mission Reach trail system. The sites are distributed across south San Antonio rather than one walkable block, so build travel time into the day.",
    accessibilityNotes:
      "The National Park Service publishes separate mobility, hearing, blind/low-vision and sensory accessibility guidance for the mission sites and continues to upgrade facilities. Historic stone surfaces and church thresholds vary, so review the current accessibility information for the specific mission you plan to visit.",
    areaGuide: {
      intro:
        "The missions sit along a long south-San-Antonio corridor rather than in one tourist district. Mission Reach, Southtown and the south side provide the closest additions, while The Alamo and downtown River Walk complete the larger mission-and-river story farther north.",
      nearbyAttractions: items(
        ["The Alamo", "About 5–9 miles north depending on the mission", "The former Mission San Antonio de Valero completes the five-mission World Heritage story and works best as a separate downtown stop.", "/destination/the-alamo"],
        ["San Antonio River Walk / Mission Reach", "Connects the corridor", "The river trail links the southern mission landscape with the broader River Walk system and makes bicycling between sites possible.", "/destination/san-antonio-river-walk"],
        ["Mission Reach Ecosystem Restoration", "Along the missions", "Restored river habitat, trails and bridges add birding and recreation between historic sites."],
        ["Espada Aqueduct", "Near Mission Espada", "Historic irrigation engineering helps explain how mission agriculture depended on the San Antonio River and acequia network."]
      ),
      foodAndDrink: items(
        ["Southtown and South Alamo Street", "North of the mission corridor", "Restaurants, cafes and patios make this the strongest food district between the missions and Downtown."],
        ["South Flores / Lone Star area", "North-central corridor", "Local restaurants and breweries provide an alternative to the busiest downtown dining blocks."],
        ["Brooks area", "South-east of the missions", "A growing concentration of restaurants and services is useful for travelers staying on the south side."],
        ["Downtown and River Walk", "North of the missions", "The widest visitor-oriented selection works well after a history-focused day when the itinerary returns downtown."]
      ),
      lodging: items(
        ["Downtown and River Walk", "About 5–9 miles north", "The broadest hotel base is best for travelers combining the missions with The Alamo and central San Antonio."],
        ["Southtown", "North of the mission corridor", "Boutique and neighborhood lodging can keep visitors closer to Mission Reach while remaining near downtown dining."],
        ["Brooks / south San Antonio", "South-east", "A practical base for travelers prioritizing the mission corridor and avoiding repeated downtown traffic."]
      ),
      neighborhoods: items(
        ["Southtown and King William", "North of the missions", "Historic homes, galleries and restaurants create the most natural neighborhood bridge between the mission corridor and Downtown."],
        ["South Side / Mission San José area", "Immediate corridor", "Longstanding residential communities surround the park and reflect the living cultural landscape beyond the preserved compounds."],
        ["Brooks", "South-east", "Former military land redeveloped into a mixed-use district adds modern south-San-Antonio context."],
        ["Downtown", "North", "The Alamo, River Walk and civic core complete the city's larger river-and-mission geography."]
      ),
      familyStops: items(
        ["Mission San José Visitor Center", "At the main park site", "Ranger orientation, exhibits and Junior Ranger activities help younger visitors understand what they are seeing before touring the compounds."],
        ["Mission Reach bicycle ride", "Along the river", "Families with confident riders can turn the historical sites into an outdoor route rather than a sequence of car stops."],
        ["Yanaguana Garden at Hemisfair", "Near Downtown", "A free play area gives children a high-energy break before or after a mission-heavy day."],
        ["The Alamo", "Downtown", "Living-history interpretation and the exhibit center can reinforce the mission story for families continuing north.", "/destination/the-alamo"]
      ),
      sideTrips: items(
        ["San Antonio River Walk", "Downtown and Mission Reach", "Follow the same river from the southern missions into the city's best-known pedestrian district.", "/destination/san-antonio-river-walk"],
        ["Natural Bridge Caverns", "About 30 miles north", "A Hill Country cave experience adds a completely different half day to a San Antonio weekend."],
        ["Brackenridge Park and Witte Museum", "North-central San Antonio", "Natural history, Texas exhibits and park space provide a useful change from colonial history."],
        ["Gruene and New Braunfels", "About 35 miles north-east", "Historic river towns extend a San Antonio trip into the Hill Country corridor."]
      ),
    },
    featured: true,
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Mission_San_Jose%27_-_San_Antonio,_TX.jpg?width=1600",
      alt: "Stone church facade and grounds at Mission San José in San Antonio",
      width: 1600,
      height: 988,
      credit: "Dgdrby · CC BY-SA 4.0 · Wikimedia Commons",
    },
  },

  "moody-gardens": {
    summary:
      "Galveston's pyramid-shaped education and family-attraction complex, where a large aquarium, indoor rainforest, discovery exhibits, theaters, seasonal water attractions and resort facilities create an all-weather counterpart to the island's beaches and historic districts.",
    nearestTown: "Galveston",
    bestSeason:
      "Year-round; especially useful during hot, cold or rainy beach weather, with spring and fall offering the easiest conditions for combining indoor attractions with the island outdoors",
    entryNote:
      "Moody Gardens sells admission by attraction and through combination packages, and operating schedules vary by season. The Aquarium and Rainforest Pyramids, theaters and seasonal attractions can have different hours, so check the current schedule before choosing a ticket package.",
    highlights: [
      "Aquarium Pyramid with marine habitats",
      "Rainforest Pyramid with tropical plants and wildlife",
      "Discovery and science-focused attractions",
      "3D/4D theaters and rotating educational programming",
      "Seasonal Palm Beach and holiday attractions",
    ],
    body: [
      "Moody Gardens is Galveston's strongest all-weather family attraction because its signature glass pyramids create fully indoor experiences that do not depend on beach conditions. The complex began as an educational project and has grown into a collection of wildlife, science, entertainment and hospitality attractions spread around Offatts Bayou on the west side of the island.",
      "The Aquarium Pyramid is the clearest first priority for marine-life visitors. Large habitats organize animals by ocean region and let families move from Gulf and Caribbean themes to penguins, seals and other marine species without the heat or wind of the shoreline. The Rainforest Pyramid shifts the experience completely, creating a warm tropical environment with free-ranging birds, plants and other wildlife.",
      "Because each major attraction can take substantial time, a good visit is selective rather than automatic. Families interested mainly in animals may spend most of the day between the aquarium and rainforest, while repeat visitors can lean into theaters, discovery programming or seasonal attractions. Ticket bundles make the most sense when the itinerary genuinely has time for the included experiences.",
      "Moody Gardens also changes with the season. Palm Beach and water-focused activities are warm-weather draws, while holiday programming can transform the property in winter. That means the ideal visit depends more on the current calendar than on a fixed list of attractions, and checking the official day's hours before arrival prevents paying for more than the schedule can realistically hold.",
      "Accessibility is unusually well integrated across the property. Moody Gardens reports accessible parking, ramps and restrooms throughout the complex, complimentary wheelchairs and wheelchair access to its major attractions and theaters. Because the Rainforest Pyramid has special service-animal restrictions tied to its wildlife, visitors using service animals should review the current policy before arrival.",
      "Its west-island location makes Moody Gardens easy to combine with Galveston's other sides. The Seawall and Pleasure Pier provide classic Gulf-front activity, the Strand and East End hold the city's strongest historic architecture, and Galveston Island State Park offers a quieter natural coastline farther west. A two-day trip can therefore balance indoor family attractions, beach time and historic Galveston without leaving the island.",
    ],
    managingAuthority: "Moody Gardens, Inc.",
    officialUrl: "https://www.moodygardens.com/visitor-info/hours",
    sourceCheckedAt: "2026-08-17",
    county: "Galveston",
    address: "1 Hope Boulevard, Galveston, TX 77554",
    directions:
      "Moody Gardens is on the west side of Galveston Island near Scholes International Airport and Offatts Bayou. It is easiest to reach by car from Interstate 45 and 61st Street; parking is on site, but special events can increase traffic around the complex.",
    accessibilityNotes:
      "Moody Gardens provides accessible parking and curb ramps, accessible restrooms and building entrances, complimentary wheelchairs and wheelchair-accessible attractions and theaters. Service animals are generally permitted, with a special restriction inside the Rainforest Pyramid; review current accessibility information for specific needs.",
    areaGuide: {
      intro:
        "Moody Gardens anchors Galveston's west side, where family attractions, beaches and resort lodging cluster away from the historic downtown core. The Seawall connects the property with the Pleasure Pier and east-island districts, making it easy to build a two-part island itinerary.",
      nearbyAttractions: items(
        ["Schlitterbahn Galveston Island", "Next to Moody Gardens", "Seasonal water rides make the closest high-energy family pairing during warm-weather operating periods."],
        ["Galveston Island State Park", "About 8 miles west", "Beach and bay habitat, paddling and trails provide a protected natural contrast to the indoor pyramids."],
        ["Galveston Seawall", "About 2 miles south", "The Gulf-front boulevard links beaches, restaurants and island attractions along a long public shoreline."],
        ["Galveston Island Historic Pleasure Pier", "About 5 miles east", "Rides over the Gulf create the island's classic amusement-pier experience.", "/destination/galveston-island-historic-pleasure-pier"]
      ),
      foodAndDrink: items(
        ["Moody Gardens property", "On site", "Restaurants and resort dining are the easiest option when the day is built around multiple pyramid attractions."],
        ["61st Street and Seawall", "About 2–3 miles away", "A broad concentration of seafood, casual restaurants and beach-oriented dining sits between Moody Gardens and the Gulf."],
        ["Historic Downtown / Strand", "About 6 miles east", "Independent restaurants, bars and cafes make the historic core a stronger evening destination."],
        ["West End", "West of the complex", "Casual island dining and neighborhood spots work well with state-park or beach time farther west."]
      ),
      lodging: items(
        ["Moody Gardens Hotel", "On site", "The most convenient base for families prioritizing the pyramids, seasonal attractions and a resort-style stay."],
        ["Seawall Boulevard", "About 2–5 miles south/east", "The island's largest concentration of hotels keeps visitors close to the Gulf, beaches and Pleasure Pier."],
        ["Historic Downtown / Strand", "About 6 miles east", "Boutique and historic lodging works best for travelers who want architecture, restaurants and nightlife after Moody Gardens."],
        ["West End vacation rentals", "West", "A quieter base for larger groups combining Moody Gardens with beaches and the state park."]
      ),
      neighborhoods: items(
        ["West End", "Surrounding area", "Lower-density neighborhoods, vacation rentals and bay access give western Galveston a different pace from the tourist-heavy east end."],
        ["Seawall corridor", "South and east", "Hotels, beach access and visitor attractions form the island's main Gulf-front strip."],
        ["Strand Historic District", "About 6 miles east", "Victorian commercial buildings, shops and museums create Galveston's historic downtown core."],
        ["East End Historic District", "East of Downtown", "Residential Victorian architecture gives the island's historic side a quieter neighborhood dimension."]
      ),
      familyStops: items(
        ["Aquarium Pyramid", "On site", "Marine exhibits make this the strongest single Moody Gardens attraction for most first-time families."],
        ["Galveston Island Historic Pleasure Pier", "About 5 miles east", "Rides, games and Gulf views provide a high-energy evening complement.", "/destination/galveston-island-historic-pleasure-pier"],
        ["Galveston Railroad Museum", "Historic Downtown", "Large locomotives and railroad history provide another substantial indoor family stop."],
        ["Galveston beaches", "Along the Seawall", "A simple beach break balances a day dominated by indoor exhibits and ticketed attractions."]
      ),
      sideTrips: items(
        ["Strand Historic District", "About 6 miles east", "Historic architecture, museums, shops and restaurants turn the trip from a family-attraction visit into a broader Galveston experience."],
        ["Galveston Island State Park", "About 8 miles west", "Paddling, trails and undeveloped beach/bay habitat add a nature-focused half day."],
        ["Bolivar Peninsula", "Ferry from east Galveston", "The free vehicle ferry and quieter peninsula beaches can extend the island trip into a scenic coastal outing."],
        ["Kemah Boardwalk", "About 25 miles north", "A second waterfront entertainment district can fit travelers continuing toward Houston or Space Center Houston."]
      ),
    },
    featured: true,
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Moody_Gardens_Pyramids_Galveston_Texas_2026.jpg?width=1600",
      alt: "The glass pyramids of Moody Gardens beside the water in Galveston",
      width: 1600,
      height: 900,
      credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
    },
  },

  "galveston-island-historic-pleasure-pier": {
    summary:
      "A Gulf-front amusement pier extending over the water from Galveston's Seawall, combining roller-coaster and thrill rides, family rides, midway games, food and broad coastal views in the tradition of the island's historic entertainment piers.",
    nearestTown: "Galveston",
    bestSeason:
      "Spring and fall for the easiest combination of mild weather and outdoor rides; summer brings the fullest beach-season atmosphere but also heat, storms and larger crowds",
    entryNote:
      "A ticket is required even to walk onto the pier. Visitors can choose walk-on admission, all-day ride passes or single-ride tickets, and every ride has its own height and safety requirements. Hours and ride availability can change with weather, maintenance and the weekly calendar, so check current status before arrival.",
    highlights: [
      "Iron Shark roller coaster and thrill rides over the Gulf",
      "Galaxy Wheel and elevated coastal views",
      "Family rides and midway games",
      "Historic amusement-pier setting on the Galveston Seawall",
      "Easy evening pairing with beach time and Seawall dining",
    ],
    body: [
      "Galveston Island Historic Pleasure Pier brings the classic amusement-pier idea back to a stretch of Seawall that has hosted entertainment for generations. The current attraction extends over the Gulf of Mexico, so many rides feel more dramatic than their footprints suggest: the visual drop is not only toward the deck but toward open water on three sides.",
      "The ride mix ranges from family attractions to larger thrill rides, with the Iron Shark coaster, high swings and the Galaxy Wheel creating the most recognizable skyline. Height requirements vary by ride, which makes advance planning useful for families with younger children; a group can otherwise arrive expecting a full-day ride experience only to discover that some members have a much smaller eligible list.",
      "The pier also sells a walk-on ticket for visitors who want the view, food and atmosphere without unlimited rides. That distinction matters because access to the pier itself is ticketed. Travelers building a shorter Galveston evening can therefore treat it as a sunset-and-Seawall stop rather than committing automatically to an all-day ride pass.",
      "Weather is part of the operating reality. Gulf wind, thunderstorms, maintenance and seasonal scheduling can close individual rides or alter hours, and the official calendar changes throughout the year. Checking the day's operating information shortly before arrival is more reliable than assuming a fixed schedule from an older travel guide.",
      "The location is one of the pier's biggest advantages. Beach access and the Seawall are directly outside, restaurants line the surrounding blocks, and the Strand Historic District is only a short drive inland. That makes the Pleasure Pier most useful as one component of a Galveston day rather than an isolated amusement-park trip.",
      "For families spending a weekend on the island, Moody Gardens creates the strongest complementary attraction because it works in nearly any weather and shifts the focus to aquariums, rainforest and science exhibits. A second day can move west to Galveston Island State Park or east into the Strand and East End, giving the trip much more range than rides alone.",
    ],
    managingAuthority: "Galveston Island Historic Pleasure Pier",
    officialUrl: "https://www.pleasurepier.com/visitor-info",
    sourceCheckedAt: "2026-08-17",
    county: "Galveston",
    address: "2501 Seawall Boulevard, Galveston, TX 77550",
    directions:
      "The pier is on Seawall Boulevard at 25th Street. Parking immediately around the attraction is limited and paid options include a nearby lot and Seawall parking; busy summer weekends and events can make walking from a hotel or using rideshare easier.",
    accessibilityNotes:
      "The pier is a modern public attraction, but individual rides have separate boarding, transfer, height and safety rules. Guests who need mobility or ride-specific accommodations should review the current property and ride information or contact guest services before purchasing a ride package.",
    areaGuide: {
      intro:
        "The Pleasure Pier sits in the middle of Galveston's Seawall corridor, so beach time, Gulf-front dining and hotels are immediately available. The island's historic downtown lies only a few minutes inland, while Moody Gardens and the state park expand the trip west.",
      nearbyAttractions: items(
        ["Galveston Seawall and beach", "Outside the pier", "Public Gulf views and beach access make the shoreline the easiest no-extra-driving companion to the amusement pier."],
        ["Moody Gardens", "About 5 miles west", "Aquarium, rainforest and science attractions create the strongest all-weather family pairing.", "/destination/moody-gardens"],
        ["Strand Historic District", "About 2 miles north", "Victorian commercial architecture, museums and shops add Galveston's historic identity beyond the beach."],
        ["Bishop's Palace", "About 2 miles east", "One of the island's most elaborate Victorian houses adds an architecture-focused stop near the East End."]
      ),
      foodAndDrink: items(
        ["Seawall Boulevard", "Steps away", "Seafood, casual Gulf-front restaurants and visitor dining surround the pier."],
        ["Historic Downtown / Strand", "About 2 miles north", "Independent restaurants, bars and cafes offer a more urban evening after the rides."],
        ["East End", "About 2–3 miles east", "Neighborhood restaurants work well with historic-house and architecture stops."],
        ["61st Street / west Seawall", "Farther west", "A large concentration of family-oriented dining lies on the route toward Moody Gardens."]
      ),
      lodging: items(
        ["Central Seawall", "Walkable", "The easiest base for beach access and an evening at the pier without parking twice."],
        ["Historic Downtown / Strand", "About 2 miles north", "Boutique and historic lodging works best for travelers prioritizing museums, architecture and nightlife."],
        ["Moody Gardens / west island", "About 5 miles west", "A family-resort base is practical when Moody Gardens is the other major attraction."],
        ["West End vacation rentals", "Farther west", "Larger rentals suit groups building a beach-focused stay around multiple island attractions."]
      ),
      neighborhoods: items(
        ["Seawall corridor", "Immediate area", "Hotels, beach access and attractions create Galveston's most visitor-oriented Gulf-front district."],
        ["Strand Historic District", "About 2 miles north", "Historic commercial blocks show the port city's nineteenth-century wealth and architecture."],
        ["East End Historic District", "About 2 miles east", "Victorian residential streets provide a quieter architectural counterpart to the Seawall."],
        ["West End", "West of 61st Street", "Lower-density beach neighborhoods and rentals lead toward the state park and quieter stretches of island."]
      ),
      familyStops: items(
        ["Moody Gardens", "About 5 miles west", "Aquarium and rainforest pyramids can anchor the daytime portion of a family itinerary before evening rides.", "/destination/moody-gardens"],
        ["Galveston Railroad Museum", "Historic Downtown", "Full-size rail equipment and indoor exhibits make a useful bad-weather or midday family stop."],
        ["Beach time", "Outside the pier", "A few hours on the Gulf can keep the day from becoming an expensive sequence of ticketed attractions."],
        ["Galveston Island State Park", "About 12 miles west", "Trails, beach and bay habitat offer a quieter family-nature option away from the central Seawall."]
      ),
      sideTrips: items(
        ["Moody Gardens", "About 5 miles west", "Build a full family day by combining the pyramids with evening rides and the Seawall.", "/destination/moody-gardens"],
        ["Galveston Island State Park", "About 12 miles west", "Protected Gulf and bay habitat gives the island trip a natural-coast dimension."],
        ["Bolivar Peninsula", "Ferry from east Galveston", "The ferry ride and quieter beaches create a scenic extension beyond the main island."],
        ["Kemah Boardwalk", "About 25 miles north", "Another waterfront entertainment district fits travelers continuing toward the Houston area."]
      ),
    },
    featured: true,
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Galveston_Island_Pleasure_Pier.jpg?width=1600",
      alt: "Galveston Island Historic Pleasure Pier extending over the Gulf of Mexico",
      width: 1600,
      height: 1067,
      credit: "Sankenbruck · CC BY-SA 3.0 · Wikimedia Commons",
    },
  },

  "dallas-arboretum-and-botanical-garden": {
    summary:
      "A 66-acre botanical garden on the shore of White Rock Lake, known for large seasonal flower displays, formal garden rooms, mature trees, the Rory Meyers Children's Adventure Garden and changing spring and autumn festivals just east of Downtown Dallas.",
    nearestTown: "Dallas",
    bestSeason:
      "Spring for major flower displays and fall for cooler weather and seasonal gardens; summer is best near opening before afternoon heat builds",
    entryNote:
      "The garden is ticketed, and parking can be purchased in advance. Major seasonal events and high-attendance days can sell strongly, so buy admission and parking ahead when visiting during headline spring or autumn displays.",
    highlights: [
      "Sixty-six acres of formal and seasonal gardens",
      "White Rock Lake views and mature landscape",
      "Rory Meyers Children's Adventure Garden",
      "Major spring flower and autumn festival displays",
      "Historic DeGolyer and Camp estate landscapes",
    ],
    body: [
      "The Dallas Arboretum succeeds because it is not one static botanical collection. Its 66 acres are organized into distinct garden rooms, lawns, estate landscapes and seasonal planting areas that change dramatically across the year. A spring visit can be dominated by massed bulbs and flowering trees, while autumn transforms large sections around pumpkins, color displays and cooler-weather programming.",
      "White Rock Lake gives the garden a setting that many urban botanical gardens lack. Views open from lawns and terraces toward the water, while mature trees create shaded transitions between more formal planting areas. That makes the Arboretum valuable even for visitors who are not serious gardeners: the landscape itself is the experience.",
      "Families should plan specifically for the Rory Meyers Children's Adventure Garden rather than assuming young visitors will engage with the same areas as adults. Its science-and-nature activities occupy a substantial part of the property and can easily become the center of a family visit, especially when paired with open lawns and picnic breaks.",
      "The size of the property matters. Comfortable shoes are essential, and visitors with mobility limitations should use the Arboretum's current accessibility resources rather than trying to cover every path. Complimentary wheelchairs are offered first-come, first-served, mobility scooters are available to rent and tram service can help reach central areas, although the historic topography means not every garden surface is equally accessible.",
      "High-attendance seasonal events change the practical experience. Parking and ticketing are easiest when purchased before arrival, and the most popular displays can be crowded even on weekdays. Early entry provides cooler temperatures, cleaner sightlines and more flexibility before tour groups and event traffic build.",
      "East Dallas gives the Arboretum a useful local context. White Rock Lake can extend the outing into cycling or lakeside recreation, while Lakewood and Casa Linda offer nearby food and neighborhood character. Downtown Dallas and the Arts District are close enough for a second half day, but the garden itself deserves several hours rather than being compressed between museums.",
    ],
    managingAuthority: "Dallas Arboretum and Botanical Society",
    officialUrl: "https://www.dallasarboretum.org/visitor-information/",
    sourceCheckedAt: "2026-08-17",
    county: "Dallas",
    address: "8525 Garland Road, Dallas, TX 75218",
    directions:
      "The Arboretum is in East Dallas on Garland Road beside White Rock Lake. Visitor parking is at the main entrance and Children's Adventure Garden entrance; purchasing parking online before a high-attendance visit can simplify entry.",
    accessibilityNotes:
      "Complimentary wheelchairs are available first-come, first-served, mobility scooters can be rented and tram tours provide access to central garden areas with priority for mobility-impaired guests. Because the historic landscape has varied topography, some portions remain less accessible than others.",
    areaGuide: {
      intro:
        "The Arboretum sits on White Rock Lake in East Dallas, where outdoor recreation, established neighborhoods and local dining create a quieter counterpoint to Downtown. Most visitors should keep the immediate day focused on the lake and East Dallas, then use central Dallas as a separate half-day extension.",
      nearbyAttractions: items(
        ["White Rock Lake", "Beside the garden", "Trails, shoreline parks and lake views extend the outdoor day beyond formal gardens without a long drive."],
        ["Bath House Cultural Center", "Across White Rock Lake", "Art and cultural programming in a historic lakeside building add a small local stop to a lake loop."],
        ["Dallas Arts District", "About 6 miles west", "Major museums and performance halls provide the strongest indoor cultural extension."],
        ["The Sixth Floor Museum at Dealey Plaza", "About 7 miles west", "Downtown history can anchor a separate half day after a garden-focused morning.", "/destination/sixth-floor-museum-at-dealey-plaza"]
      ),
      foodAndDrink: items(
        ["Lakewood", "About 2–4 miles west", "Neighborhood restaurants, cafes and bars make Lakewood the strongest nearby dining district."],
        ["Casa Linda", "Just east of White Rock Lake", "Casual restaurants and services offer the most convenient meal option close to the garden."],
        ["Lower Greenville", "About 4 miles west", "A denser restaurant and nightlife strip works well when the day continues into evening."],
        ["Deep Ellum", "About 5 miles west", "Music, bars and restaurants provide a much more urban contrast to the garden."]
      ),
      lodging: items(
        ["Lakewood / East Dallas", "Closest neighborhood base", "Limited but convenient lodging and rentals keep visitors near White Rock Lake and the Arboretum."],
        ["Downtown Dallas", "About 6–7 miles west", "The broadest central hotel base works best for travelers combining the garden with museums and city attractions."],
        ["Uptown", "About 6 miles west", "Restaurants, parks and hotels create a walkable evening base with easy access back to East Dallas."],
        ["SMU / Park Cities", "North-west", "A quieter base is useful for travelers also visiting the George W. Bush Presidential Center."]
      ),
      neighborhoods: items(
        ["Lakewood", "West of White Rock Lake", "Historic homes, restaurants and leafy streets make Lakewood the natural neighborhood companion to the Arboretum."],
        ["Casa Linda", "East of the lake", "A practical residential and shopping district provides food and services close to the garden."],
        ["Lower Greenville", "Farther west", "Restaurants and nightlife shift the trip from gardens into a lively urban neighborhood."],
        ["Deep Ellum", "Near Downtown", "Murals, live music and nightlife offer a strong evening contrast after a quiet outdoor day."]
      ),
      familyStops: items(
        ["Rory Meyers Children's Adventure Garden", "Inside the Arboretum", "Hands-on nature and science experiences make this a destination within the larger garden for families."],
        ["White Rock Lake parks", "Adjacent", "Playgrounds, shoreline paths and picnic areas provide free family time before or after ticketed admission."],
        ["Perot Museum of Nature and Science", "About 7 miles west", "Hands-on science and fossils can anchor a second family half day in central Dallas."],
        ["Klyde Warren Park", "About 6 miles west", "Play areas and open lawns work well with an Arts District visit."]
      ),
      sideTrips: items(
        ["The Sixth Floor Museum at Dealey Plaza", "About 7 miles west", "Pair East Dallas gardens with a separate downtown history visit.", "/destination/sixth-floor-museum-at-dealey-plaza"],
        ["George W. Bush Presidential Center", "About 5 miles north-west", "A presidential museum on the SMU campus adds modern political history."],
        ["Dallas Arts District", "About 6 miles west", "The DMA, Nasher and performance venues make a strong indoor cultural day."],
        ["Bishop Arts District", "About 9 miles south-west", "Independent shops and restaurants offer a neighborhood-focused evening destination."]
      ),
    },
    featured: true,
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dallas_Arboretum_and_Botanical_Gardens.JPG?width=1600",
      alt: "Seasonal garden beds and pathways at the Dallas Arboretum and Botanical Garden",
      width: 1600,
      height: 899,
      credit: "Bibiscal · CC BY-SA 3.0 · Wikimedia Commons",
    },
  },

  "houston-museum-of-natural-science": {
    summary:
      "Houston's flagship natural-science museum in Hermann Park, with four floors of permanent halls covering dinosaurs, gems, energy, ancient cultures and Texas wildlife plus a planetarium, giant-screen theater, butterfly center and rotating special exhibitions.",
    nearestTown: "Houston",
    bestSeason:
      "Year-round; weekday opening hours are the easiest time for a quieter visit, especially during summer heat, school breaks and wet weather",
    entryNote:
      "General admission covers the permanent exhibit halls, but the Cockrell Butterfly Center, Burke Baker Planetarium, giant-screen theater and many special exhibitions use separate tickets or timed shows. Parking in the attached garage cannot be reserved, so arrive early on busy dates.",
    highlights: [
      "Morian Hall of Paleontology and large dinosaur displays",
      "Gem, mineral and energy halls",
      "Burke Baker Planetarium",
      "Cockrell Butterfly Center",
      "Hermann Park location beside the Houston Zoo and Museum District",
    ],
    body: [
      "The Houston Museum of Natural Science is large enough that a first-time visitor should choose priorities rather than try to see every gallery at equal depth. Four floors of permanent exhibits span paleontology, gems, wildlife, chemistry, energy and human cultures, and the museum estimates that even an average visit takes more than a couple of hours before adding any ticketed theaters or special attractions.",
      "The Morian Hall of Paleontology is the natural first stop for many families. Its large fossil displays emphasize predators, prey and evolutionary relationships rather than simply lining skeletons along a wall. From there, the museum's mineral and gem collections, energy exhibits and Texas ecology halls give enough variety to keep adults engaged even when dinosaurs were the original reason for visiting.",
      "The planetarium, Cockrell Butterfly Center and Wortham Giant Screen Theatre function almost like separate attractions. They are not automatically included in one universal museum ticket, and planetarium or theater experiences run on schedules. Checking show times before arrival prevents a common planning mistake: buying general admission first and then discovering that the desired add-on cannot fit into the remaining day.",
      "The Hermann Park location substantially increases the museum's value. Houston Zoo is across the park, METRORail serves the district and the Museum of Fine Arts, Children's Museum Houston and other institutions sit nearby. That density means families can stay in one part of the city for an entire day rather than losing time to Houston traffic between attractions.",
      "Accessibility resources are extensive. HMNS offers manual wheelchairs, accessible parking, elevators throughout the building, sensory backpacks and planning guides, and can arrange certain accommodations such as ASL interpretation with advance notice. Adult changing tables and other detailed supports are also documented on the museum's current accessibility page.",
      "A realistic Houston science itinerary can connect HMNS with Space Center Houston, but those attractions are not close enough to treat as a casual same-neighborhood pairing. Spend one day in Hermann Park and the Museum District, then use a separate half day or full day for NASA in Clear Lake. That structure produces a better trip than attempting to cross the metro area between timed attractions.",
    ],
    managingAuthority: "Houston Museum of Natural Science",
    officialUrl: "https://www.hmns.org/visit/",
    sourceCheckedAt: "2026-08-17",
    county: "Harris",
    address: "5555 Hermann Park Drive, Houston, TX 77030",
    directions:
      "HMNS is in Hermann Park in Houston's Museum District. An attached parking garage is available but spaces cannot be reserved, and the area gets crowded; METRORail and other nearby parking can be good alternatives on busy weekends or special-event days.",
    accessibilityNotes:
      "HMNS provides accessible parking and entrances, elevators throughout the museum, manual wheelchairs on a first-come basis, sensory backpacks and detailed pre-visit resources. ASL interpretation and other accommodations can be requested in advance, and the museum documents adult changing tables and sensory-friendly programming.",
    areaGuide: {
      intro:
        "HMNS sits in one of Houston's densest visitor districts. Hermann Park, the zoo, major museums, the Texas Medical Center and Rice University are all nearby, so the best plan keeps the immediate day in this district and saves Space Center Houston or Downtown for separate blocks.",
      nearbyAttractions: items(
        ["Houston Zoo", "Across Hermann Park", "A major conservation-focused zoo can fill the other half of a family day, though doing both thoroughly may require more than one day."],
        ["Hermann Park", "Outside the museum", "Trails, lawns, gardens and the reflection pool provide free outdoor breaks between museum visits."],
        ["Museum of Fine Arts, Houston", "About a 10-minute walk", "One of the country's major art museums gives adults and older children a completely different museum experience nearby."],
        ["Children's Museum Houston", "About a 15-minute walk", "Hands-on exhibits make the district especially strong for families with younger children."]
      ),
      foodAndDrink: items(
        ["Museum District", "Immediate area", "Museum cafes and nearby casual restaurants are easiest when the day stays centered on Hermann Park."],
        ["Rice Village", "About 2 miles west", "A large walkable restaurant and shopping district offers more dinner choices after museum closing."],
        ["Montrose", "About 1–2 miles north", "Independent restaurants, cafes and bars provide one of Houston's strongest nearby neighborhood food scenes."],
        ["Texas Medical Center", "Just south", "Fast-casual and practical dining options are plentiful around the large medical campus."]
      ),
      lodging: items(
        ["Museum District / Hermann Park", "Closest", "The best base for walking or using rail between HMNS, the zoo and nearby museums."],
        ["Texas Medical Center", "Immediately south", "A large hotel inventory and transit access make this practical for families and visitors prioritizing the museum district."],
        ["Downtown Houston", "About 4 miles north-east", "A broader city-center base works for travelers combining museums with theaters, sports and central attractions."],
        ["Montrose", "North of the district", "Boutique lodging and neighborhood restaurants create a more local base close to the museums."]
      ),
      neighborhoods: items(
        ["Museum District", "Immediate area", "A concentration of museums around Hermann Park makes this Houston's clearest cultural destination district."],
        ["Rice University / Rice Village", "West", "Campus architecture, restaurants and shopping create a walkable extension beyond the museums."],
        ["Montrose", "North", "Historic homes, galleries, restaurants and nightlife give the trip a neighborhood dimension."],
        ["Texas Medical Center", "South", "The scale of the medical complex is a defining part of this section of Houston and affects traffic, transit and lodging."]
      ),
      familyStops: items(
        ["Houston Zoo", "Across Hermann Park", "Animals and outdoor habitats make the most natural family companion to HMNS."],
        ["Children's Museum Houston", "Nearby", "Hands-on play and learning are especially useful for younger children after a more collection-heavy museum visit."],
        ["Hermann Park Railroad and playgrounds", "In the park", "Short rides and open space help break up a long indoor museum day."],
        ["Cockrell Butterfly Center", "At HMNS", "A separate-ticket tropical butterfly environment can be the strongest add-on for families who want a living-nature experience."]
      ),
      sideTrips: items(
        ["Space Center Houston", "About 25 miles south-east", "NASA's visitor center deserves a separate half day or full day because of distance and timed tram experiences.", "/destination/space-center-houston"],
        ["Downtown Houston", "About 4 miles north-east", "Theater, sports, Discovery Green and city-center restaurants create a separate urban block."],
        ["The Menil Collection", "About 2 miles north-west", "Free art museums and a quiet campus in Montrose offer an intimate counterpoint to HMNS."],
        ["Buffalo Bayou Park", "About 3 miles north", "Trails, skyline views and outdoor recreation provide a city-landscape break from museum time."]
      ),
    },
    featured: true,
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Houston_Museum_of_Natural_Science,_entrance_in_2012.JPG?width=1600",
      alt: "Entrance facade of the Houston Museum of Natural Science at Hermann Park",
      width: 1600,
      height: 1200,
      credit: "Another Believer · CC BY-SA 3.0 · Wikimedia Commons",
    },
  },
};

export function applyCuratedTopAttractionsBatch3(destination: Destination): Destination {
  const override = curated[destination.slug];
  return override
    ? {
        ...destination,
        ...override,
        hero: { ...destination.hero, ...override.hero },
      }
    : destination;
}
