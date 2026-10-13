import type { Destination } from "./types";

// Independent visitor planning guides, researched against municipal/TPWD primary sources.
// Editorial copy intentionally distinguishes city facilities from nearby attractions.
const checkedAt = "2026-10-12";

export const additionalTownAuthorityDestinations: Destination[] = [
  {
    id: "small-town-marble-falls",
    brandId: "texasdefined",
    slug: "marble-falls",
    name: "Marble Falls",
    summary: "Marble Falls connects a walkable Burnet County downtown with Lake Marble Falls, Colorado River parks, Highland Lakes boating and a practical base for Inks Lake, Hill Country trails, wineries and scenic drives.",
    category: "small-towns",
    region: "hill-country",
    nearestTown: "Marble Falls",
    county: "Burnet",
    coordinates: { lat: 30.5782, lng: -98.2728 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Lake_Marble_Falls_Texas_2023.jpg?width=1600",
      alt: "Lake Marble Falls and the U.S. 281 bridge viewed from Marble Falls, Texas",
      width: 3708,
      height: 2472,
      credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
    },
    bestSeason: "Fall through spring for comfortable downtown and trail walks; summer is popular for lake recreation but requires heat and storm planning.",
    entryNote: "Downtown is open to explore without an entry ticket. Boat ramps, parks, swim areas and private outfitters have different rules; verify current lake levels, closures, conditions and any reservation requirements. Lake Marble Falls public boat ramps do not provide on-site camping.",
    highlights: ["Historic Main Street", "Lake Marble Falls", "Lakeside Park", "Johnson Park", "Falls Creek Park", "Highland Lakes", "fishing", "boating", "Hill Country scenic drives", "Inks Lake State Park"],
    body: [
      "Marble Falls is on the Colorado River in the Highland Lakes corridor, with an unusually convenient pairing of a town center and publicly accessible waterfront. It is useful to distinguish Lake Marble Falls—the reservoir formed by Max Starcke Dam—from the original falls that gave the community its name. The lake is part of the managed Colorado River system, not an unregulated swimming hole.",
      "Begin downtown, where locally owned stores and dining spots line the historic district and the visitor center can help orient a trip. From Main Street it is easy to build a separate waterfront block around Johnson Park, Lakeside Park and Falls Creek Park. These are different municipal spaces with different facilities, not one continuous beach or campground.",
      "Texas Parks and Wildlife identifies boat ramps at both Johnson and Lakeside parks. Johnson Park has picnic and playground facilities, and Lakeside Park supports boating access. TPWD also warns of invasive zebra mussels in Lake Marble Falls, so boaters should follow the state's clean-drain-dry and draining requirements before moving equipment to another water body.",
      "A lake weekend should not be confused with a state-park camping trip. TPWD states that neither of the two public ramp parks offers camping; arrange a campground or nearby state-park reservation separately. For a dry-land day, combine the shaded town parks, walking and shopping with a visit to the Falls on the Colorado Museum when its current opening schedule works.",
      "The town is a practical gateway to the larger Highland Lakes and granite-country landscape. Inks Lake State Park, Longhorn Cavern State Park and Balcones Canyonlands National Wildlife Refuge belong on the regional map but require their own travel and access plans. Avoid claiming that every surrounding lake, preserve or private winery is inside Marble Falls.",
      "If you only have four hours, park once downtown and choose one waterfront park. On a full day, add a lake outing or an independently verified museum stop. For two nights, keep one day in the town-and-lake cluster and use the other for a scheduled outdoor excursion rather than overloading a series of distant stops."
    ],
    officialUrl: "https://visitmarblefalls.org/",
    sourceCheckedAt: checkedAt,
    directions: "At U.S. 281 and FM 1431 in Burnet County, west of Austin. Downtown and the lakefront parks are separate arrival points; review parking and ramp information for the site you intend to use.",
    accessibilityNotes: "Downtown storefront entrances and older properties vary. Municipal waterfront parks have paved areas and facilities, but individual boat ramps, banks, paths and swimming access are not interchangeable. Confirm specific accessibility needs with the city or venue.",
    areaGuide: {
      intro: "Pick the town-and-waterfront core first, then decide whether to add a separate Highland Lakes outdoor stop.",
      nearbyAttractions: [
        { name: "Lake Marble Falls public boating access", description: "TPWD lists city-operated ramps at Johnson and Lakeside parks, with important invasive-species precautions.", proximity: "In town", href: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/marble_falls/access.phtml" },
        { name: "Lakeside Park", description: "City park with waterfront recreation and a boat ramp; verify individual facilities before arrival.", proximity: "Lakefront", href: "https://marblefallstx.gov/399/Lakeside-Park" },
        { name: "Johnson Park", description: "Pecan-shaded park with picnic, playground and public ramp facilities.", proximity: "Lakefront", href: "https://www.marblefallstx.gov/185/Johnson-Park" },
      ],
      foodAndDrink: [{ name: "Historic downtown", description: "A walkable mix of independent restaurants, cafes and local food businesses; hours vary by weekday." }],
      lodging: [{ name: "Downtown and lakefront stays", description: "Compare proximity to restaurants with access to your planned boat launch; waterfront rentals and hotels are not equivalent." }],
      neighborhoods: [{ name: "Historic Downtown District", description: "Main Street shopping, galleries, town walks and access to the visitor center." }],
      familyStops: [{ name: "Johnson Park", description: "Playground and picnic facilities make a flexible family stop without a paid attraction ticket." }],
      sideTrips: [
        { name: "Inks Lake State Park", description: "State-park camping and outdoor recreation require a separate visit plan.", href: "/destination/inks-lake-state-park" },
        { name: "Burnet County", description: "Connect Marble Falls with Burnet, lake corridors, historic towns and county geography.", href: "/county/burnet" },
        { name: "Fredericksburg", description: "Continue west to a different kind of Hill Country historic-town and wine-country itinerary.", href: "/destination/fredericksburg" },
      ],
    },
    authorityGuide: {
      whyItMatters: "Marble Falls is one of the easiest places in Texas to combine a functioning lakeside town with public reservoir access and a wider Highland Lakes itinerary. Accurate distinctions among city parks, lake ramps, paid attractions and state-park campgrounds save visitors wasted trips.",
      assessment: { recommendedVisit: "Half day for downtown and one park; a full day for lake access; 2 nights for a regional outdoor trip", physicalEffort: "Low to moderate", weatherExposure: "Mixed indoor/outdoor", planningLevel: "Moderate", familyFit: "Good with park-based activities and separate planning for boating or swimming.", firstTimeValue: "High for a flexible Hill Country weekend with both urban amenities and waterfront access." },
      itineraries: [
        { label: "Town and water", duration: "3–4 hours", steps: ["Walk downtown Marble Falls", "Choose Johnson Park or Lakeside Park based on facilities needed", "Allow time for a meal and lakeside views"] },
        { label: "Lake day", duration: "Full day", steps: ["Check lake and TPWD boating notices", "Use the appropriate public launch or prebook a licensed outfitter", "Finish with a relaxed downtown dinner"] },
        { label: "Highland Lakes weekend", duration: "2 nights", steps: ["Spend a day downtown and at the lakefront", "Reserve a separate state-park or outdoor activity", "Use the final morning for a scenic drive before departure"] }
      ],
      sources: [
        { label: "Visit Marble Falls", url: "https://visitmarblefalls.org/", scope: "Official town attractions, Downtown District, visitor center and trip planning" },
        { label: "City of Marble Falls — Lakeside Park", url: "https://marblefallstx.gov/399/Lakeside-Park", scope: "Municipal park access and facilities" },
        { label: "City of Marble Falls — Johnson Park", url: "https://www.marblefallstx.gov/185/Johnson-Park", scope: "Municipal park, ramp and picnic facilities" },
        { label: "Texas Parks and Wildlife — Lake Marble Falls access", url: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/marble_falls/access.phtml", scope: "Boat ramp locations, no-camping distinction and zebra-mussel advisories" }
      ]
    },
    featured: true,
  },
  {
    id: "small-town-port-aransas",
    brandId: "texasdefined",
    slug: "port-aransas",
    name: "Port Aransas",
    summary: "Port Aransas is a Mustang Island Gulf Coast town built around accessible beaches, fishing, shorebird habitat, a busy ship channel, island neighborhoods and routes to Mustang Island State Park and the Coastal Bend.",
    category: "small-towns",
    region: "gulf-coast",
    nearestTown: "Port Aransas",
    county: "Nueces",
    coordinates: { lat: 27.8339, lng: -97.0611 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Port_Aransas%2C_Texas.jpg?width=1600",
      alt: "Aerial view of Port Aransas and the ship channel on the Texas Gulf Coast",
      width: 8064,
      height: 4929,
      credit: "Quintin Soloviev · CC BY 4.0 · Wikimedia Commons",
    },
    bestSeason: "Late fall through spring for milder temperatures, birding and fishing; summer for beach holidays with heat, surf and tropical-weather precautions.",
    entryNote: "City beach parking typically requires an annual permit, with designated free parking stretches. Rules for vehicles, camping, fires and the shoreline change, so use the city beach-permit page before arrival. Ferry waits, rip currents and storms can materially affect the day.",
    highlights: ["Port Aransas Beach", "Mustang Island", "birdwatching", "fishing", "beach camping", "ship channel", "ferry", "beach parking permits", "Leonabelle Turnbull Birding Center", "Mustang Island State Park"],
    body: [
      "Port Aransas occupies the northern end of Mustang Island, where the Gulf beach, Aransas Pass ship channel and surrounding marshes create three different coastal experiences. The town is more than a place to rent a beachfront room: visitors use it for surf access, guided fishing, birding, harbor watching and ferry travel between the island and the mainland.",
      "Start by deciding whether this is a beach day or a harbor-and-nature day. Port Aransas Beach has vehicle access and parking regulations, while the city's birding sites and nearby state-park facilities have separate locations and rules. Swimming conditions depend on surf and rip currents, not simply on sunny weather.",
      "The City of Port Aransas publishes beach parking and camping regulations, including where a beach parking sticker is required and which stretches are free. The city also posts surf-rescue and lifeguard-season information. These regulations are the source of truth; rates, staffed periods and temporary closures should not be treated as permanently fixed.",
      "A first-time traveler can spend the morning on the beach, move inland for lunch and add a fishing-pier or birdwatching outing. For a full island day, set aside additional time for the ship channel and working-waterfront setting, keeping clear of restricted port operations and watching for ferry queues.",
      "Coastal visitors should plan around wildlife and weather. Tidal flooding, wind, thunderstorms, strong currents, and the Atlantic hurricane season can disrupt beach use, ferry travel and charter operations. Birdwatching opportunities change with migration and water conditions; observe wildlife from designated public areas and do not enter dunes or protected habitat.",
      "For a longer stay, pair Port Aransas with Mustang Island State Park and the wider Corpus Christi Coastal Bend. State-park reservations, municipal beach camping and private RV resort stays are three different products with different restrictions. Do not describe the entire barrier island as free camping or assume all driving beaches have the same rules."
    ],
    officialUrl: "https://www.portaransas.org/",
    sourceCheckedAt: checkedAt,
    directions: "Port Aransas is on the northern end of Mustang Island in Nueces County. Approaches include the Port Aransas ferry from the mainland and the road via Corpus Christi and Padre Island; check current TxDOT ferry conditions before traveling.",
    accessibilityNotes: "Beach sand and access ramps vary by location and conditions. Contact the city and chosen accommodations about beach wheelchairs, accessible paths, bathrooms and parking; availability cannot be assumed for every access road.",
    areaGuide: {
      intro: "Keep beach conditions and transportation at the center of the plan, then choose one harbor, birding or fishing activity.",
      nearbyAttractions: [
        { name: "Port Aransas Beach", description: "City-managed Gulf beach with variable surf, seasonal guards and vehicle-parking rules.", proximity: "In town", href: "https://cityofportaransas.org/departments/parks-and-recreation/port-aransas-beach/" },
        { name: "Mustang Island State Park", description: "Nearby state park with separately managed entry, reservations, camping and beach access.", proximity: "South on Mustang Island", href: "/destination/mustang-island-state-park" },
        { name: "Port Aransas ferry", description: "Check current TxDOT conditions and anticipate busy-weekend and holiday queues.", proximity: "North end of town", href: "https://www.txdot.gov/discover/ferry-boat-schedules.html" }
      ],
      foodAndDrink: [{ name: "Harbor and central town", description: "Seafood, casual dining and coffee options are concentrated around the commercial core; check current operations." }],
      lodging: [{ name: "Beach rentals, hotels and RV parks", description: "Separate walk-to-beach access, designated resort amenities and legal beach camping when choosing a place to stay." }],
      neighborhoods: [{ name: "Old Town and waterfront", description: "Town restaurants and harbor life provide an alternative to an all-day beach itinerary." }],
      familyStops: [{ name: "City beach and birding stops", description: "Choose accessible beach entrances and short birding visits around weather and age-appropriate surf conditions." }],
      sideTrips: [
        { name: "Rockport", description: "A different coastal-town experience centered on Aransas Bay, fishing, arts and winter wildlife.", href: "/destination/rockport" },
        { name: "Nueces County", description: "Explore how Mustang Island, Corpus Christi Bay and other Coastal Bend locations fit together.", href: "/county/nueces" },
        { name: "Texas State Aquarium", description: "An indoor/outdoor family counterpoint on the Corpus Christi side of the coast.", href: "/destination/texas-state-aquarium" }
      ],
    },
    authorityGuide: {
      whyItMatters: "Port Aransas combines a working Gulf harbor, recreational beach access, rich birding habitats and a ferry crossing in one compact barrier-island community. The visitor challenge is to distinguish city beach rules from state-park and private-resort access while planning around changing water, wind and ferry conditions.",
      assessment: { recommendedVisit: "Full beach-and-town day; 2–3 nights for fishing, wildlife and a separate state-park outing", physicalEffort: "Low to moderate", weatherExposure: "Mostly outdoors", planningLevel: "Moderate", familyFit: "Strong when rip-current, heat and beach-parking requirements are checked in advance.", firstTimeValue: "Very high for a Texas Gulf beach holiday with flexible coastal recreation." },
      itineraries: [
        { label: "Beach and town", duration: "4–5 hours", steps: ["Confirm beach and parking conditions", "Choose an appropriate public beach access", "Have lunch in town and allow time for the harbor"] },
        { label: "Coastal nature day", duration: "Full day", steps: ["Visit an accessible birding area early", "Reserve a separate fishing or boat experience if desired", "Finish at a beach access with suitable surf and weather"] },
        { label: "Mustang Island weekend", duration: "2–3 nights", steps: ["Spend one day in Port Aransas", "Give Mustang Island State Park or Corpus Christi a separate day", "Check ferry, surf and weather advisories before departure"] }
      ],
      sources: [
        { label: "City of Port Aransas — beaches", url: "https://cityofportaransas.org/departments/parks-and-recreation/port-aransas-beach/", scope: "Public beach operations, rip currents, lifeguard coverage and permits" },
        { label: "City of Port Aransas — beach permits", url: "https://cityofportaransas.org/departments/parks-and-recreation/port-aransas-beach/beach-parking-permit-information/", scope: "City beach vehicle parking, free areas and camping regulations" },
        { label: "Port Aransas Tourism Bureau", url: "https://www.portaransas.org/", scope: "Visitor activities, dining, stays and local planning" },
        { label: "Texas Department of Transportation — ferry", url: "https://www.txdot.gov/discover/ferry-boat-schedules.html", scope: "Ferry schedule and travel planning" }
      ]
    },
    featured: true,
  },
];
