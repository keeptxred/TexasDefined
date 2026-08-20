import type { Destination, DestinationAreaGuide, DestinationAreaItemList } from "./types";

const NPS = "National Park Service";

function items(...rows: Array<[string, string, string, string?]>): DestinationAreaItemList {
  return rows.map(([name, proximity, description, href]) => ({
    name,
    proximity,
    description,
    ...(href ? { href } : {}),
  })) as DestinationAreaItemList;
}

const battleshipTexasAreaGuide: DestinationAreaGuide = {
  intro: "Build a future Battleship Texas visit around Galveston's harbor and historic downtown rather than treating the ship as an isolated museum. Pier 15 sits close to the Strand, working waterfront and maritime attractions, while the Seawall, Pleasure Pier and Moody Gardens broaden the day beyond military history.",
  nearbyAttractions: items(
    ["The Strand Historic District", "Historic downtown / harbor district", "Victorian commercial blocks, shops and museums place the battleship inside the port city that will become its permanent home."],
    ["Pier 21 and the harbor museums", "Nearby waterfront", "Maritime exhibits and harbor activity make the working port a natural extension of a battleship visit."],
    ["Galveston Island Historic Pleasure Pier", "Gulf-front Seawall", "Rides over the Gulf give families a completely different second half of the day.", "/destination/galveston-island-historic-pleasure-pier"],
    ["Moody Gardens", "West side of Galveston", "Aquarium, rainforest and science attractions make an all-weather family pairing.", "/destination/moody-gardens"]
  ),
  foodAndDrink: items(
    ["The Strand and Postoffice Street", "Historic downtown", "Restaurants, cafes and bars make the historic core the easiest dining base around a future Pier 15 visit."],
    ["Harbor waterfront", "Near Pier 15", "Seafood and port views keep the meal connected to Galveston's maritime setting."],
    ["Seawall Boulevard", "South of downtown", "A long concentration of casual seafood, burgers and beach-oriented dining works well after a history-heavy morning."],
    ["East End and downtown neighborhoods", "East of the Strand", "Independent restaurants and neighborhood dining add a quieter alternative to the busiest visitor blocks."]
  ),
  lodging: items(
    ["Historic Downtown / Strand", "Closest practical district", "Best for travelers who want to walk among port architecture, restaurants and museums when the battleship opens."],
    ["Seawall Boulevard", "Gulf side", "The island's largest hotel corridor combines beach access with a short drive back to the harbor."],
    ["East End Historic District", "East of downtown", "Historic inns and neighborhood lodging fit a trip focused on architecture and island history."],
    ["Moody Gardens area", "West side", "Useful for families prioritizing the pyramids and resort amenities alongside a harbor visit."]
  ),
  neighborhoods: items(
    ["Strand / Downtown", "Adjacent historic core", "Nineteenth-century commercial architecture shows the port-city wealth and shipping world that shaped Galveston."],
    ["Harbor / Pier 15", "Future museum setting", "Cruise ships, tugs, terminals and working waterfront activity make the battleship's future berth part of a living port rather than a static memorial landscape."],
    ["East End Historic District", "East of downtown", "Victorian homes and tree-lined streets show another side of the island's pre-1900 built environment."],
    ["Seawall corridor", "Gulf side", "Hotels, beaches and the seawall connect the island's storm history with modern tourism."]
  ),
  familyStops: items(
    ["Galveston Railroad Museum", "Downtown", "Historic locomotives and railcars add another large-scale transportation story for families."],
    ["Ocean Star Offshore Drilling Rig & Museum", "Harbor district", "A real offshore drilling platform turns Gulf energy and marine engineering into a hands-on companion to naval technology."],
    ["Moody Gardens", "West side", "The aquarium and rainforest provide a high-confidence family option regardless of beach weather.", "/destination/moody-gardens"],
    ["Galveston Island Historic Pleasure Pier", "Seawall", "Amusement rides and Gulf views balance a museum-focused itinerary.", "/destination/galveston-island-historic-pleasure-pier"]
  ),
  sideTrips: items(
    ["Battleship Texas: the full history", "TexasDefined guide", "Follow BB-35 from its 1914 commissioning through both World Wars, D-Day, museum preservation and the Galveston restoration.", "/article/battleship-texas-bb-35-history-restoration"],
    ["San Jacinto Battleground", "Houston Ship Channel region", "See the landscape beside which Battleship Texas spent most of its museum life after 1948; the ship itself is no longer there."],
    ["Space Center Houston", "Clear Lake / Houston", "Connect battleship-era engineering with human spaceflight and Mission Control.", "/destination/space-center-houston"],
    ["Galveston Island State Park", "West Galveston Island", "Beach, bay, prairie and wetlands provide a natural-coast contrast to the harbor and museums.", "/destination/galveston-island-state-park"],
    ["Bolivar ferry and peninsula", "East end of Galveston", "A free ferry crossing adds working-channel views and another perspective on the maritime geography around the island."]
  ),
};

const curated: Record<string, Partial<Destination>> = {
  "alibates-flint-quarries-national-monument": {
    summary: "A Texas Panhandle national monument preserving multicolored flint quarries used for at least 13,000 years, explored through a visitor center and reservation-only ranger hikes above Lake Meredith country.",
    nearestTown: "Fritch",
    bestSeason: "April through October for the main ranger-program season; shoulder months can be cooler for outdoor walks",
    entryNote: "Quarry hikes are ranger-led and require reservations. The two-mile route is strenuous, includes substantial climbing and can be canceled for high heat, wind, storms or other hazardous weather.",
    highlights: ["Ancient Alibates flint quarries", "Reservation-only ranger quarry hike", "Visitor center and museum exhibits", "High Plains Indigenous history"],
    body: [
      "Alibates Flint Quarries preserves one of the High Plains' most important stone resources, used by people for tools and trade over thousands of years. The vividly colored flint connects geology directly to human history.",
      "The visitor center, garden and short Mesquite Trail can be explored more casually, but the quarry experience itself is reached on a ranger-guided hike. The route climbs loose-gravel terrain and stairs equivalent to a substantial multi-story ascent.",
      "Reserve the quarry tour before making it the centerpiece of a trip and prepare for Panhandle weather. NPS can cancel tours when heat, wind, lightning, snow or other conditions make the exposed route unsafe.",
    ],
    managingAuthority: NPS,
    officialUrl: "https://www.nps.gov/alfl/",
  },
  "lake-meredith-national-recreation-area": {
    summary: "A large Canadian River reservoir in the Texas Panhandle surrounded by breaks and dry plains, with free access to boating, fishing, swimming, hiking, camping and backcountry roads.",
    nearestTown: "Fritch",
    bestSeason: "Year-round; spring and fall are especially comfortable for hiking while summer favors water recreation",
    entryNote: "The recreation area is spread across many access points and backcountry roads. Check lake level, ramps, weather and road conditions before choosing a destination within the park.",
    highlights: ["Lake Meredith boating and fishing", "Free camping areas", "Spring Canyon swimming area", "Hiking, birding and Panhandle sunsets"],
    body: [
      "Lake Meredith fills a dramatic break in the otherwise broad Panhandle plains, creating the largest body of water for roughly 200 miles around and a major recreation resource for the region.",
      "Boating and fishing are obvious draws, but the national recreation area also contains campgrounds, shoreline trails, birding areas and rougher backcountry roads. Alibates Flint Quarries National Monument is close enough to combine with the lake in the same trip.",
      "There is no single entrance that fits every activity. Pick the launch, campground or trail first, then check NPS conditions because water levels, storms and unpaved roads can change access.",
    ],
    managingAuthority: NPS,
    officialUrl: "https://www.nps.gov/lamr/",
  },
  "the-alamo": {
    summary: "San Antonio's best-known historic landmark preserves the church and grounds of Mission San Antonio de Valero, central to the 1836 Battle of the Alamo and a much longer Spanish colonial and Indigenous history.",
    nearestTown: "San Antonio",
    bestSeason: "Fall through spring for comfortable downtown walking",
    entryNote: "Entry policies, timed experiences and construction around the Alamo district can change. Reserve any required tours or timed experiences through the official Alamo site before arrival.",
    highlights: ["Historic Alamo church", "1836 battle interpretation", "Mission-era history", "Downtown San Antonio location"],
    body: [
      "The Alamo is most famous for the 1836 battle, but the site began more than a century earlier as Mission San Antonio de Valero. A useful visit holds both histories at once rather than reducing the place to one event.",
      "The surviving church and Long Barrack sit within a downtown district that has undergone major redevelopment and interpretation work. Exhibits and guided experiences provide far more context than a quick photograph from the plaza.",
      "Check current ticketing, tour and construction information before arriving. Then connect the Alamo to San Antonio Missions National Historical Park to understand the larger mission landscape along the river.",
    ],
    officialUrl: "https://www.thealamo.org/",
  },
  "texas-state-capitol": {
    summary: "The pink-granite seat of Texas government in downtown Austin, completed in the 1880s with a soaring rotunda, historic legislative chambers, monuments and free public tours.",
    nearestTown: "Austin",
    bestSeason: "Year-round; fall through spring is most comfortable for walking the grounds",
    entryNote: "Security screening and legislative activity can affect access to rooms and tours. Check official Capitol visitor information before arrival.",
    highlights: ["Pink-granite Capitol building", "Rotunda and legislative chambers", "Free guided and self-guided tours", "Historic Capitol grounds"],
    body: [
      "The Texas State Capitol is both an active government building and one of the state's major works of nineteenth-century architecture. Its pink granite, central dome and formal grounds make it recognizable long before visitors understand the politics inside.",
      "Public areas and tours explain the House and Senate chambers, portraits, monuments and architectural history while the building continues to function as the center of state government.",
      "Allow for security screening and check the legislative calendar or visitor-center information. When the Legislature is meeting, the building can be busier and room access may differ from an ordinary day.",
    ],
    officialUrl: "https://tspb.texas.gov/plan/tours/tours.html",
  },
  "battleship-texas": {
    summary: "Commissioned in 1914, USS Texas (BB-35) is the world's only surviving dreadnought-era battleship and a veteran of both World Wars, now undergoing a $75 million restoration and museum overhaul in Galveston for a permanent home at Pier 15.",
    nearestTown: "Galveston",
    bestSeason: "Not currently open for regular tours; plan for the announced 2027 grand-reopening target only after confirming current Foundation updates",
    entryNote: "Battleship Texas is closed for regular visitation during restoration. Do not plan it as an ordinary museum stop until the Battleship Texas Foundation announces reopening; limited specialty opportunities may be announced separately.",
    highlights: [
      "Only surviving dreadnought-era battleship",
      "World War I service with the British Grand Fleet",
      "World War II gunfire support at North Africa, Normandy, Southern France, Iwo Jima and Okinawa",
      "$75 million restoration and museum overhaul in Galveston",
      "Museum ship in Texas since 1948",
      "Future permanent Pier 15 berth",
    ],
    body: [
      "Battleship Texas is one of the country's most important surviving naval vessels because one ship connects the pre-World War I dreadnought era with major campaigns of World War II. Commissioned on March 12, 1914, the New York-class battleship carried ten 14-inch guns and entered service as naval technology was changing rapidly.",
      "During World War I, Texas joined the British Grand Fleet in the North Sea. Between the wars she underwent extensive modernization and became one of the U.S. Navy ships involved in early radar development as the fleet moved toward electronic air search and modern fire control.",
      "World War II gave the ship her best-known combat record. Texas supported Operation Torch in North Africa, the Normandy landings and the campaign around Cherbourg, the invasion of Southern France, then Pacific operations at Iwo Jima and Okinawa. She earned five battle stars for World War II service.",
      "The Navy decommissioned Texas in 1948 and transferred the ship for preservation beside San Jacinto Battleground. The location made the vessel a major Texas memorial, but decades in brackish water produced serious corrosion and structural problems that eventually required a much larger preservation solution.",
      "On August 31, 2022, the ship left San Jacinto and was towed through the Houston Ship Channel to Gulf Copper on Pelican Island in Galveston. The Battleship Texas Foundation describes the current work as a $75 million restoration and museum overhaul. Dry-dock and shipyard work has included extensive hull plating, structural steel, tanks, coatings, decks, superstructure and preservation work needed to stabilize the century-old vessel.",
      "Texas was undocked and returned to the water on March 5, 2024 after the Foundation reported that more than 700 tons of steel had been renewed and hundreds of thousands of labor hours had gone into making the hull substantially watertight. Additional steel, deck, superstructure, preservation and museum work continued after the dry-dock phase.",
      "The Battleship Texas Foundation has secured Pier 15 in Galveston as the ship's permanent museum home and targets a 2027 grand reopening. Until the Foundation announces normal public access, TexasDefined keeps the destination out of ordinary Trip Planner recommendations so visitors are not routed to a closed attraction.",
      "The new Galveston setting will change how visitors experience the ship. Pier 15 places Texas inside a working port and near the Strand, harbor museums, cruise terminals, restaurants and other island attractions, allowing a future visit to become part of a full maritime-history day rather than an isolated stop.",
      "For the complete ship history—from the first battleship named Texas through BB-35's 1914 commissioning, both World Wars, D-Day, museum preservation and the Galveston restoration—use the linked TexasDefined Battleship Texas history guide and verify current access through the Foundation before traveling specifically to board the ship.",
    ],
    managingAuthority: "Battleship Texas Foundation",
    officialUrl: "https://battleshiptexas.org/",
    sourceCheckedAt: "2026-08-19",
    county: "Galveston",
    directions: "The ship remains in the Galveston restoration process and is not an ordinary walk-up attraction. Use the Battleship Texas Foundation's current access instructions rather than navigating to the former San Jacinto berth. The future permanent museum location is Pier 15 in Galveston.",
    accessibilityNotes: "Public-access details for the restored Pier 15 museum are still being finalized. Historic warships contain ladders, narrow passageways and deck transitions, so review the Foundation's current accessibility information once regular tours reopen.",
    areaGuide: battleshipTexasAreaGuide,
  },
  "battleship-texas-state-historic-site": {
    summary: "The historic Battleship Texas is no longer berthed at San Jacinto and is undergoing restoration in Galveston; regular tours are closed while a new permanent Pier 15 museum berth is prepared for a targeted 2027 reopening.",
    nearestTown: "Galveston",
    bestSeason: "Not currently open for regular tours",
    entryNote: "This legacy state-historic-site record should not route visitors to the former San Jacinto berth. Consult the Battleship Texas Foundation for current restoration and specialty-access information.",
    highlights: ["Historic Battleship Texas", "$75 million Galveston restoration and museum overhaul", "Future Pier 15 museum berth", "Former San Jacinto site no longer the ship's location"],
    body: [
      "This record reflects the Battleship Texas' former identity and location as a state historic site beside San Jacinto Battleground. The vessel left that berth in 2022 for major restoration.",
      "As of 2026 the ship is in Galveston and regular tours are closed. A permanent Pier 15 berth has been selected for the future museum, with the Foundation targeting a 2027 grand reopening.",
      "Do not navigate to the former San Jacinto location expecting the ship. Use current Battleship Texas Foundation information for restoration status and future reopening plans.",
    ],
    managingAuthority: "Battleship Texas Foundation",
    officialUrl: "https://battleshiptexas.org/",
    sourceCheckedAt: "2026-08-19",
    county: "Galveston",
  },
};

export function applyCuratedDestinationBatch23(destination: Destination): Destination {
  const o = curated[destination.slug];
  return o ? { ...destination, ...o, hero: o.hero ? { ...destination.hero, ...o.hero } : destination.hero } : destination;
}

export function applyCuratedDestinationsBatch23(destinations: Destination[]): Destination[] {
  return destinations.map(applyCuratedDestinationBatch23);
}
