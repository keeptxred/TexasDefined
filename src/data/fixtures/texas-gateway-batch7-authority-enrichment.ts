import type { ArticleBlock, ArticleInternalLink } from "../types";

interface GatewayBatch7AuthorityEnrichment {
  body: ArticleBlock[];
  sourceName: string;
  sourceUrl: string;
  internalLinks?: ArticleInternalLink[];
  relatedCollections?: string[];
  relatedDestinations?: string[];
}

const hillCountryMistakes: ArticleBlock[] = [
  { type: "heading", text: "The first mistake is treating Hill Country water access as guaranteed" },
  { type: "paragraph", text: "Spring-fed rivers and swimming holes are central to Hill Country travel, but access and water conditions change with drought, flooding, maintenance and park rules. Texas Parks and Wildlife notes that swimming areas can close temporarily because of environmental conditions such as drought or flooding. Check the managing authority for the specific park, river access or natural area before building a trip around swimming." },
  { type: "paragraph", text: "Public access matters too. A clear river visible from a road or bridge is not automatically a legal swimming access point. Use established public parks, state parks, municipal access or other authorized sites. Do not cross fences or assume a roadside pull-off creates a right to enter private land." },
  { type: "heading", text: "Do not drive into water just because the crossing is familiar" },
  { type: "paragraph", text: "Low-water crossings are part of the region's road network, and flash flooding can make a normal route dangerous quickly. National Weather Service guidance is direct: never drive through a flooded roadway because the water can hide a washed-out roadbed and moving water can carry vehicles away. Turn around rather than using vehicle height, local familiarity or another driver's decision as evidence that a crossing is safe." },
  { type: "paragraph", text: "Flood danger can develop downstream from rain that falls elsewhere in a watershed. A clear sky overhead does not guarantee a safe creek crossing. Pay attention to warnings, barricades and changing water levels, especially at night when flood hazards are harder to see. If a route includes known low crossings, identify a higher-ground alternative before storms arrive." },
  { type: "heading", text: "Popular parks and natural areas can reach capacity" },
  { type: "paragraph", text: "Texas State Parks recommends reserving day passes for popular parks, especially on weekends and holidays. Hill Country State Natural Area also warns that it often reaches capacity and recommends advance reservations. A first-time visitor should reserve the anchor park before arranging meals and lodging around it, rather than driving several hours and discovering the gate is full." },
  { type: "paragraph", text: "Current trail status matters as much as the reservation. Trails and backcountry campsites can close for wet conditions, fire restrictions or other operational reasons. Check the park's alerts close to departure and be willing to substitute a town, museum, historic site or shorter public trail when conditions change." },
  { type: "heading", text: "Summer timing is part of the itinerary, not a footnote" },
  { type: "paragraph", text: "Hill Country summer heat can turn an ordinary walk into a strenuous outing. Start hikes and exposed activities early, carry water, use sun protection and move food, museums or indoor stops into the hottest part of the day. A short limestone trail can still have steep, rocky or unshaded sections. Choose the route for the group actually traveling rather than for the photograph at the end." },
  { type: "paragraph", text: "Do not assume water automatically solves heat risk. Swimming sites may require a walk from parking, shade may be limited, and children can become tired before the return hike. Bring drinking water even for a river day and keep an exit plan if weather, crowds or water conditions deteriorate." },
  { type: "heading", text: "Fredericksburg is a major stop, not the whole region" },
  { type: "paragraph", text: "A first trip often concentrates on Fredericksburg, but the Hill Country spans river towns, ranching communities, courthouse squares, state parks, natural areas, dance halls and heritage corridors. Build one geographic loop rather than attempting every famous town in a weekend. Two or three nearby communities with time to walk and eat usually reveal more than a rushed checklist of distant stops." },
  { type: "paragraph", text: "The same principle applies to wineries and distilleries. They are one layer of modern Hill Country tourism, not a substitute for the region's German, Czech, Mexican American, ranching, music, river and natural history. Choose a trip theme that fits the group and add complementary stops rather than treating one industry as the definition of the region." },
  { type: "heading", text: "Build the trip around current conditions and a smaller radius" },
  { type: "paragraph", text: "A reliable first Hill Country weekend has one reserved outdoor anchor, one town or heritage stop, one flexible meal plan and a weather backup. Check water access, park alerts and the forecast close to departure. That structure leaves enough margin for a scenic road, unexpected bakery or courthouse square without forcing unsafe decisions to preserve an overfilled itinerary." },
];

const gulfCoastTrip: ArticleBlock[] = [
  { type: "heading", text: "Beach weather and swimming weather are not the same thing" },
  { type: "paragraph", text: "A sunny Gulf Coast forecast does not guarantee safe surf. National Weather Service and National Hurricane Center guidance emphasizes checking the beach and rip-current forecast before entering the water. Rip currents can occur with breaking waves and can become dangerous even when the beach looks inviting. Use guarded beaches when available, read local flag systems and ask lifeguards about conditions if you are unsure." },
  { type: "paragraph", text: "If swimming is the main purpose of the trip, verify conditions on the day rather than relying on a general seasonal expectation. Texas Parks and Wildlife notes that state-park swimming areas may close because of environmental conditions. Wind, tides, currents, storms, water quality and local operations can all change the experience." },
  { type: "heading", text: "Do not fight a rip current or improvise a rescue" },
  { type: "paragraph", text: "National Hurricane Center guidance says a swimmer caught in a rip current should not try to swim directly against it. Relax, float and follow current safety instructions to escape or signal for help. If another person is in trouble, call for a lifeguard or emergency help and use flotation if trained and appropriate; entering the current without rescue equipment can create a second victim." },
  { type: "paragraph", text: "Families should treat water supervision as continuous. Set up near a lifeguard when possible, keep children within close reach around surf and do not assume an inflatable toy replaces a properly fitted life jacket or swimming ability. The Gulf is an open-water environment, not a pool." },
  { type: "heading", text: "Tropical weather can affect a trip even when the storm center is far away" },
  { type: "paragraph", text: "Distant tropical systems can send swell toward the coast and increase rip-current risk. Coastal flooding, high surf, heavy rain and evacuation orders can also affect areas far from a storm's center. During hurricane season, monitor the National Weather Service, National Hurricane Center and local emergency-management guidance rather than relying on a generic weather app or a hotel cancellation policy." },
  { type: "paragraph", text: "If officials issue evacuation instructions, the itinerary is over. Leave according to local guidance and do not wait for beach conditions to look dangerous. Bridges, ferries, causeways and low coastal roads can become traffic or access bottlenecks long before landfall." },
  { type: "heading", text: "The Texas coast is a chain of different destinations, not one beach" },
  { type: "paragraph", text: "Galveston combines a historic port city with beaches and major attractions. The Coastal Bend around Corpus Christi and Mustang Island mixes urban services, barrier-island recreation and birding. Farther south, South Padre Island and the Lower Laguna Madre have another climate and visitor pattern. Smaller ports and bays can center on fishing, wildlife or working-waterfront history rather than classic beach tourism." },
  { type: "paragraph", text: "Choose one coastal zone per short trip. Driving long distances along the coast can consume the time that should be spent on the water, in a historic district or at a wildlife site. A two-night trip usually benefits from one primary beach or island plus nearby food, history and nature stops instead of trying to connect Galveston, Corpus Christi and South Padre in one sweep." },
  { type: "heading", text: "Heat, sun and salt exposure change practical planning" },
  { type: "paragraph", text: "Beach trips involve prolonged exposure even when a breeze makes the air feel comfortable. Use shade, sun protection and drinking water, and schedule breaks during the strongest sun. Saltwater, blowing sand and humidity can also affect electronics, vehicles and equipment. Rinse or protect gear according to manufacturer guidance rather than discovering corrosion later." },
  { type: "paragraph", text: "Pets need their own heat and water plan, and some beaches or parks have leash, wildlife-protection or access rules. Check the managing authority before bringing a pet into a dune, nesting or protected area. Never leave people or animals in parked vehicles while others explore the beach." },
  { type: "heading", text: "A good coast itinerary has a land-based backup" },
  { type: "paragraph", text: "Wind, surf or storms can cancel the water part of a day without making the whole trip useless. Choose a coastal destination with a second layer: a historic district, aquarium, museum, birding site, seafood district or waterfront walk. That makes it easier to respect unsafe surf or bad weather instead of entering the water simply because the trip was expensive to reach." },
];

export const texasGatewayBatch7AuthorityEnrichment: Record<string, GatewayBatch7AuthorityEnrichment> = {
  "hill-country-mistakes-first-time-visitors-make": {
    body: hillCountryMistakes,
    sourceName: "National Weather Service — Turn Around Don't Drown",
    sourceUrl: "https://www.weather.gov/safety/flood-turn-around-dont-drown",
    internalLinks: [
      { href: "/article/texas-road-trip-stops-worth-the-detour", label: "Texas road-trip stops worth the detour" },
      { href: "/article/texas-bucket-list-by-season", label: "Texas bucket list by season" },
      { href: "/explore/state-parks", label: "Texas state parks" },
    ],
    relatedDestinations: ["enchanted-rock", "guadalupe-river-state-park"],
  },
  "things-to-know-before-texas-gulf-coast-trip": {
    body: gulfCoastTrip,
    sourceName: "National Hurricane Center — Rip Current Safe Swimming",
    sourceUrl: "https://www.nhc.noaa.gov/rip-currents/safe-swimming.html",
    internalLinks: [
      { href: "/explore/beaches-coast", label: "Texas beaches and coast" },
      { href: "/article/texas-hurricane-home-prep-checklist", label: "Texas hurricane preparedness" },
      { href: "/article/texas-birds-you-will-actually-notice", label: "Texas birds you will actually notice" },
    ],
    relatedDestinations: ["galveston", "mustang-island-state-park"],
  },
};
