import type { Destination, DestinationAreaGuide } from "./types";

/**
 * Coastal Bend and lower Rio Grande heritage authority.
 * Canonical destination additions and context-sensitive enrichment only: do not
 * create a second page for existing museums/parks. Facts reviewed 2026-10-12.
 * Operator-only information (hours, fees, closures) must be checked at visit time.
 */
const reviewed = "2026-10-12";
const THC_LA_SALLE = "https://thc.texas.gov/learn/archeological-spotlight/la-salle-archeology-projects";
const TPWD_GOOSE = "https://tpwd.texas.gov/state-parks/goose-island";
const TPWD_TREE = "https://tpwd.texas.gov/state-parks/goose-island/nature";

export const coastalHeritageAuthorityDestinations: Destination[] = [
  {
    id: "coastal-heritage-la-salle-odyssey",
    brandId: "texasdefined",
    slug: "la-salle-odyssey-texas-coast",
    name: "La Salle Odyssey: Seven Texas Coastal Museums",
    summary: "A museum-by-museum coastal history trail following La Salle's 1684–1687 expedition, the wreck and excavation of La Belle, Fort St. Louis, and the Gulf Coast collections that tell different parts of the story.",
    category: "road-trips",
    region: "gulf-coast",
    county: "Aransas",
    nearestTown: "Rockport",
    coordinates: { lat: 28.02642, lng: -97.04874 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Texas_Maritime_Museum_Rockport_Texas_2024.jpg?width=1600",
      alt: "Texas Maritime Museum in Rockport, one of the seven historical La Salle Odyssey museum stops",
      width: 1600, height: 1067,
      credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons (Texas Maritime Museum Rockport Texas 2024)"
    },
    bestSeason: "Year-round indoor museum touring; fall through spring is more comfortable for moving between coastal towns.",
    entryNote: "The seven-museum list is a historical Texas Historical Commission itinerary, not a guarantee that all seven still maintain identical displays, hours or admission. Check each operator for current exhibits and opening before building a multi-day trip.",
    highlights: ["Seven coastal museum stops in six counties", "La Belle's 1686 wreck in Matagorda Bay", "Fort St. Louis and the Spanish presidio that followed", "Shipwreck archeology and conservation", "Bullock Museum's preserved La Belle hull in Austin"],
    body: [
      "La Salle's Louisiana-bound expedition left France in 1684, missed the Mississippi River and established Fort St. Louis near Matagorda Bay. The small vessel La Belle sank in 1686, leaving material evidence later recovered by Texas Historical Commission archeologists. La Salle died in 1687; the French colony did not survive. These events should be understood through French imperial ambition, existing Indigenous homelands, Spanish responses and the experiences of the expedition's participants—not as a simple story of a 'lost' ship.",
      "The Texas Historical Commission's La Salle Odyssey brochure named seven partner museums in six Texas coastal counties. In a practical west-to-east journey, begin with Corpus Christi Museum of Science and History (Corpus Christi), Texas Maritime Museum (Rockport), Calhoun County Museum (Port Lavaca), Texana Museum (Edna), Museum of the Coastal Bend (Victoria), Matagorda County Museum (Bay City), and City by the Sea Museum (Palacios), operated by the Palacios Area Historical Association and named differently in older THC itineraries. Group sites by geography rather than assuming the brochure's numbered order is a driving route.",
      "Corpus Christi Museum of Science and History interprets the La Belle shipwreck and the earlier 1554 Spanish shipwrecks, giving visitors the archeological method as well as the objects. Texas Maritime Museum situates navigation, shipboard life, shipbuilding, fishing and maritime commerce within the coast's larger human history. Compare the collections rather than expecting every stop to display the same artifacts.",
      "Calhoun County Museum links Port Lavaca's local heritage to colonial-period Bay systems; Texana Museum connects Jackson County and the French expedition; Museum of the Coastal Bend emphasizes field archaeology, Fort St. Louis and regional Indigenous history; Matagorda County Museum adds the bay-area setting; and City by the Sea Museum in Palacios interprets local coastal history and the La Belle excavation. Its operator says the half-scale seaworthy reproduction La Petite Belle is currently displayed behind the Palacios Educational Pavilion, so contact the museum before making the replica the purpose of a trip. Older THC itineraries may use the former museum name.",
      "Austin is a significant additional stop, not an eighth of the original seven: the Bullock Texas State History Museum holds the conserved remains of La Belle's hull. A visitor who wants to see the ship itself should plan that separate trip rather than expecting to find the original hull in Rockport or Corpus Christi.",
      "For one coastal day, concentrate on Corpus Christi and Rockport; for two days, extend into Port Lavaca, Victoria and Edna; for a full trail, add Bay City and Palacios. These are suggested thematic groupings, not promises of specific driving times or all-sites-open schedules.",
      "Research questions to pursue at each museum: which objects were recovered from the ship versus Fort St. Louis, what preservation techniques were needed for waterlogged material, what accounts survive from Indigenous peoples and French survivors, and how did French, Spanish and later communities interpret the expedition differently?",
      "Before you go, confirm current gallery access, exhibit content, ADA accommodations and any school-program closures at individual museums. THC's brochure is an authoritative historic roster, but some addresses and display arrangements in older brochures may be stale."
    ],
    managingAuthority: "Texas Historical Commission (historical route); individual museums operate their sites",
    officialUrl: THC_LA_SALLE,
    sourceCheckedAt: reviewed,
    accessibilityNotes: "Accessibility and sensory access differ among seven separate operators. Do not infer a single trail-wide accessibility guarantee; check each museum's current visit page.",
    authorityGuide: {
      whyItMatters: "The objects make early Texas coastal history visible through archaeology rather than folklore, and the trail connects seven distinct museum interpretations across six counties.",
      assessment: {
        recommendedVisit: "At least two days for several museums; a complete seven-stop visit generally requires a multi-day itinerary and individual opening checks.",
        physicalEffort: "Low to moderate", weatherExposure: "Mixed indoor/outdoor", planningLevel: "High",
        familyFit: "Best for families interested in ships, discovery and objects; school-age children often benefit from choosing two museums instead of rushing the entire route.",
        firstTimeValue: "Begin with a museum that interprets the shipwreck, then a second that places the evidence in a wider coastal story."
      },
      itineraries: [
        { label: "Coastal Bend introduction", duration: "One day", steps: ["Corpus Christi Museum of Science and History for the shipwreck context", "Texas Maritime Museum in Rockport for Gulf history and La Belle's broader world"] },
        { label: "Four-county museum journey", duration: "Two days", steps: ["Corpus Christi and Rockport museums", "Calhoun County Museum in Port Lavaca", "Museum of the Coastal Bend in Victoria and Texana Museum in Edna, checking days and hours"] },
        { label: "Complete historic museum trail", duration: "Multi-day", steps: ["Visit the seven historically participating coastal museums where exhibits remain available", "Add Bay City and Palacios after confirming current institutions and displays", "Plan a separate Austin visit to the Bullock Museum for the conserved ship's hull"] }
      ],
      sources: [
        { label: "Texas Historical Commission — La Salle archaeology", url: THC_LA_SALLE, scope: "Expedition, excavations, seven-museum project and La Belle hull" },
        { label: "Texas Historical Commission — original La Salle Odyssey brochure", url: "https://www.thc.texas.gov/public/upload/publications/Odyssey.pdf", scope: "Historical seven-museum roster; operations may have changed" },
        { label: "Texas Historical Commission — 50 years of marine archaeology", url: "https://thc.texas.gov/blog/50-years-marine-archeology", scope: "Excavation and conservation context" },
        { label: "City by the Sea Museum — current Palacios exhibits", url: "https://citybytheseamuseum.org/permanent-exhibits", scope: "Current museum name, the La Belle displays and where the La Petite Belle model is shown" }
      ]
    },
    visitorFaqs: [
      { question: "How many museums are in the La Salle Odyssey?", answer: "Seven coastal museums were part of the Texas Historical Commission's original project, located across six counties. This is a historical roster, not a statement that each museum still presents the same exhibit.", sourceUrl: THC_LA_SALLE },
      { question: "Where can I see the actual La Belle hull?", answer: "At the Bullock Texas State History Museum in Austin, separate from the original seven coastal stops.", sourceUrl: THC_LA_SALLE },
      { question: "Can I see all seven museums in a single day?", answer: "No practical single-day itinerary should promise that; the stops are spread across several coastal counties and have independent hours.", sourceUrl: "https://www.thc.texas.gov/public/upload/publications/Odyssey.pdf" },
      { question: "What is the difference between La Belle and Fort St. Louis?", answer: "La Belle was a ship that sank in Matagorda Bay; Fort St. Louis was a French settlement on the Texas coast. Archaeologists investigated both sites.", sourceUrl: THC_LA_SALLE }
    ],
    featured: true
  },
  {
    id: "coastal-heritage-goose-island-big-tree",
    brandId: "texasdefined",
    slug: "goose-island-big-tree",
    name: "The Big Tree at Goose Island State Park",
    summary: "See one of the largest coastal live oaks in Texas near Rockport: official measurements, why its exact age is unknown, how to find the separate Big Tree area, and what else to visit nearby.",
    category: "outdoors",
    region: "gulf-coast",
    county: "Aransas",
    nearestTown: "Rockport",
    coordinates: { lat: 28.1523, lng: -96.9767 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Big_Tree_Texas_2024.jpg?width=1600",
      alt: "The Big Tree, a massive protected coastal live oak with a sprawling canopy at Goose Island State Park",
      width: 4500, height: 3000,
      credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons · Big Tree Texas 2024.jpg (22 April 2024)"
    },
    bestSeason: "Fall through spring for comfortable temperatures and coastal birding; cooler mornings make a shorter outdoor stop more pleasant.",
    entryNote: "The Big Tree is in a separate mainland area associated with Goose Island State Park, not beside the island's fishing pier. Respect barriers and park notices. Contact TPWD for current access and any fees.",
    highlights: ["Coastal live oak (Quercus virginiana)", "35 ft 1.75 in trunk circumference in TPWD's nature inventory", "89-ft crown spread and 44-ft recorded height", "Centuries-old tree with unknown exact age", "Nearby winter whooping-crane habitat"],
    body: [
      "The Big Tree is a living monument shaped by coastal wind, shallow soils and centuries of change. It is a coastal live oak (Quercus virginiana) on the Lamar Peninsula. Texas Parks and Wildlife lists a trunk circumference of 35 feet 1.75 inches, an 89-foot crown spread and a height of 44 feet. The unusually broad trunk and crown make the tree exceptional even without an exact birthday.",
      "The precise age has never been established. Older stories and some historic publicity estimate more than a thousand years, but TPWD's current nature page calls it centuries old and explicitly says the exact age is unknown. Visitors should treat pirate, hanging-tree and similar local legends as folklore unless a primary record supports them.",
      "The tree was recognized as a champion coastal live oak in the 1960s and was later surpassed in statewide rankings. Some TPWD pages give 1966 and others 1969 for a particular champion designation. Do not choose one date as settled without checking the underlying champion-tree records.",
      "This is not a conventional long hiking destination. Allow a short dedicated stop for viewing and photography, and do not step inside protective fencing, climb branches, attach items to the bark or disturb roots. The tree survives because the area is managed as a protected landscape.",
      "The Big Tree's wider setting matters: coastal prairie, live oak/red bay woodland, estuarine marsh and the winter habitat of the endangered whooping crane are part of the same Lamar Peninsula story. If you are combining visits, use Goose Island's pier and shoreline to interpret oyster reefs, fishing and coastal birds, not to look for a swimming beach.",
      "Accessible parking is mentioned in TPWD program information for the Big Tree site, but TPWD has also noted that some nearby ground is flat road without a sidewalk. Confirm the exact accessible path and current surface before planning a mobility-dependent visit."
    ],
    managingAuthority: "Texas Parks and Wildlife Department",
    officialUrl: TPWD_TREE,
    sourceCheckedAt: reviewed,
    accessibilityNotes: "TPWD reports accessible parking at the Big Tree area for ranger activities, but reports no continuous sidewalk along some program routes. Contact the park to confirm access surface and mobility needs.",
    visitorFaqs: [
      { question: "Is the Big Tree really 1,000 years old?", answer: "Its exact age is unknown. Although old estimates exceed 1,000 years, the current TPWD nature page calls it centuries old.", sourceUrl: TPWD_TREE },
      { question: "Is the Big Tree next to Goose Island's fishing pier?", answer: "No. It is in the park's separate Big Tree area; use the official map rather than expecting to find it by the pier.", sourceUrl: "https://tpwd.texas.gov/publications/pwdpubs/media/park_maps/pwd_mp_p4502_064d.pdf" },
      { question: "How wide is the Big Tree?", answer: "TPWD records a trunk circumference of 35 feet 1.75 inches and an average trunk diameter of about 11 feet 2 inches.", sourceUrl: TPWD_TREE },
      { question: "Can I climb the Big Tree?", answer: "No. View it from designated public areas and respect the protective barriers.", sourceUrl: TPWD_GOOSE }
    ],
    featured: true
  },
  {
    id: "coastal-heritage-south-padre-island",
    brandId: "texasdefined",
    slug: "south-padre-island",
    name: "South Padre Island",
    summary: "An independent South Padre Island planning guide: choosing city versus county beaches, access and parking, Laguna Madre ecology, nearby Port Isabel heritage and beach-season tradeoffs.",
    category: "beaches-coast",
    region: "south-texas",
    county: "Cameron",
    nearestTown: "South Padre Island",
    coordinates: { lat: 26.11184, lng: -97.16813 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/South_Padre_Island_beach_panorama.jpg?width=1600",
      alt: "Panorama of the Gulf-facing beach at South Padre Island, Cameron County, Texas",
      width: 7328, height: 3274,
      credit: "Spheroidite · CC BY-SA 4.0 · Wikimedia Commons · South Padre Island beach panorama"
    },
    bestSeason: "Spring and fall for comfortable beach weather; summer for swimming and family vacations with heat, sun and rip-current precautions; winter for birding and quieter beaches.",
    entryNote: "South Padre Island is the developed resort town at Padre Island's southern end. Beach access, parking, vehicle rules and facilities vary among city and county locations. Never treat Padre Island National Seashore near Corpus Christi as the same destination.",
    highlights: ["Gulf beaches and designated public access", "Laguna Madre birding and paddling", "South Padre Island Birding and Nature Center", "Isla Blanca and county beach areas", "Port Isabel Lighthouse and mainland heritage"],
    body: [
      "South Padre Island is a compact barrier-island resort community facing the Gulf of Mexico on the east and Laguna Madre on the west, connected to Port Isabel by the Queen Isabella Causeway. The developed town and nearby Cameron County parks are only the southern portion of a much longer barrier-island system. 'South Padre Island' should not be confused with Padre Island National Seashore farther north near Corpus Christi.",
      "Choose your beach access before arriving, especially if parking, step-free entry, restrooms or showers matter. The city and county manage different facilities, and amenities can differ dramatically between neighboring access points. Visitors should check official access listings, weather and surf alerts rather than assume every access has accessible parking or an improved ramp.",
      "For a first visit, compare walkable town beach access with a county park such as Isla Blanca before choosing lodging. On busy weekends, a hotel within walking distance of the intended beach access can be more useful than a cheaper stay that requires repeated parking trips. Use designated public routes and obey dune-protection rules.",
      "For nature beyond the sand, go to the lagoon-facing South Padre Island Birding and Nature Center, where boardwalks interpret wetlands and migratory birds. Sea Turtle, Inc. focuses on rescue, rehabilitation and public education. These managed attractions have separate admission and programming; check their own visitor pages.",
      "The island works well as a paired history-and-coast trip with mainland Port Isabel. The historic lighthouse explains navigation through Brazos Santiago, while the Port Isabel Historical Museum helps interpret fishing, trade and the borderlands. Add Palo Alto Battlefield and Palmito Ranch only when your interests and driving plan support a longer Valley history route.",
      "The natural hazards are real: Gulf surf, rip currents, thunderstorms, heat, stingrays, jellyfish and seasonal water-quality advisories can change a trip. Follow posted flag warnings, lifeguard instructions where available and current local advisories; never use a generic 'safe swimming' claim for every beach.",
      "For accessibility, select specific access points and confirm ramp surface, beach-mat deployment, accessible parking and beach-chair availability with the managing agency. A wheelchair icon in an old visitor listing is not proof that a sand route is usable on a particular day.",
      "Three realistic outings: a simple beach morning and lagoon sunset; a birding-focused visit with the nature center and nearby wetland stops; or a Port Isabel history morning followed by an afternoon at a designated public beach."
    ],
    managingAuthority: "City of South Padre Island and Cameron County (different public access areas)",
    officialUrl: "https://www.myspi.org/",
    sourceCheckedAt: reviewed,
    accessibilityNotes: "Individual city and county beach entries have different accessible paths, toilets and parking. Check each operator before leaving, especially for beach wheelchairs, sand mats, or step-free beach access.",
    visitorFaqs: [
      { question: "Is South Padre Island the same as Padre Island National Seashore?", answer: "No. South Padre Island is the developed city in Cameron County. Padre Island National Seashore lies much farther north, approached from the Corpus Christi area.", sourceUrl: "https://www.nps.gov/pais/index.htm" },
      { question: "Do all South Padre Island beach accesses have parking and restrooms?", answer: "No. Amenities vary by individual city and county access; confirm your intended entry before traveling.", sourceUrl: "https://www.myspi.org/" },
      { question: "What else can I do besides go to the beach?", answer: "Birding on Laguna Madre, visiting nature and sea turtle education centers, fishing, paddling, and exploring Port Isabel's lighthouse and museums are strong alternatives.", sourceUrl: "https://www.myspi.org/" },
      { question: "Can I drive on South Padre Island beaches?", answer: "Vehicle access rules differ among city beaches and county areas. Check the specific access and management rules; do not assume the town's walking beaches allow driving.", sourceUrl: "https://www.myspi.org/" }
    ],
    featured: true
  }
];

type LocalLink = { name: string; slug?: string; href?: string; description: string };
const localLinks: Record<string, LocalLink[]> = {
  "la-salle-odyssey-texas-coast": [
    {name: "Texas Maritime Museum", slug: "texas-maritime-museum-rockport", description: "Rockport's maritime interpretation"},
    {name: "Corpus Christi Museum of Science and History", slug: "corpus-christi-museum-science-history", description: "Shipwreck artifacts and science"},
    {name: "Museum of the Coastal Bend", href: "https://www.museumofthecoastalbend.org/", description: "Archaeology and Fort St. Louis"},
    {name: "Matagorda County Museum", href: "https://matagordacounty-museum.org/", description: "Bay-area historical collections"},
    {name: "Calhoun County Museum", href: "https://calhouncountymuseum.org/", description: "Port Lavaca coastal history"},
    {name: "Texana Museum and Library", slug: "texana-museum-and-library", description: "Jackson County connections"}
  ],
  "goose-island-big-tree": [
    {name: "Goose Island State Park", slug: "goose-island-state-park", description: "Pier, camping and coastal habitats"},
    {name: "Fulton Mansion", slug: "fulton-mansion", description: "Coastal historical estate"},
    {name: "Texas Maritime Museum", slug: "texas-maritime-museum-rockport", description: "Regional maritime heritage"}
  ],
  "south-padre-island": [
    {name: "South Padre Island Beaches", slug: "south-padre-island-beaches", description: "Select a practical beach access"},
    {name: "Port Isabel Lighthouse", slug: "port-isabel-lighthouse", description: "Brazos Santiago navigation history"},
    {name: "Port Isabel Historical Museum", slug: "port-isabel-historical-museum", description: "Mainland fishing and border history"},
    {name: "Palo Alto Battlefield", slug: "palo-alto-battlefield-national-historical-park", description: "The 1846 borderlands battlefield"}
  ],
  "goose-island-state-park": [
    {name: "The Big Tree", slug: "goose-island-big-tree", description: "See TPWD's landmark coastal live oak"},
    {name: "Fulton Mansion", slug: "fulton-mansion", description: "Coastal ranching household history"},
    {name: "Texas Maritime Museum", slug: "texas-maritime-museum-rockport", description: "Working-waterfront history"}
  ],
  "texas-maritime-museum-rockport": [
    {name: "La Salle Odyssey", slug: "la-salle-odyssey-texas-coast", description: "See the seven-museum historical trail"},
    {name: "The Big Tree", slug: "goose-island-big-tree", description: "Natural heritage north of Rockport"},
    {name: "Fulton Mansion", slug: "fulton-mansion", description: "Another interpretation of coastal history"}
  ],
  "corpus-christi-museum-science-history": [
    {name: "La Salle Odyssey", slug: "la-salle-odyssey-texas-coast", description: "Follow the connected shipwreck collections"},
    {name: "USS Lexington", slug: "uss-lexington-museum-corpus-christi", description: "Compare maritime museums"}
  ],
  "port-aransas": [
    {name: "Corpus Christi Museum of Science and History", slug: "corpus-christi-museum-science-history", description: "Coastal archaeology and La Belle"},
    {name: "La Salle Odyssey", slug: "la-salle-odyssey-texas-coast", description: "A multi-day Gulf history route"},
    {name: "Goose Island State Park", slug: "goose-island-state-park", description: "Bay ecology and camping"}
  ],
  "fulton-mansion": [
    {name: "Texas Maritime Museum", slug: "texas-maritime-museum-rockport", description: "Maritime economy behind the era"},
    {name: "Goose Island Big Tree", slug: "goose-island-big-tree", description: "Natural heritage of the peninsula"}
  ],
  "rockport": [
    {name: "Texas Maritime Museum", slug: "texas-maritime-museum-rockport", description: "Inside the town's maritime story"},
    {name: "Goose Island Big Tree", slug: "goose-island-big-tree", description: "Nearby protected living landmark"},
    {name: "La Salle Odyssey", slug: "la-salle-odyssey-texas-coast", description: "Coastal museum itinerary"}
  ],
  "south-padre-island-beaches": [
    {name: "South Padre Island", slug: "south-padre-island", description: "Full island trip planning"},
    {name: "Port Isabel Lighthouse", slug: "port-isabel-lighthouse", description: "Mainland historical stop"}
  ],
  "port-isabel-lighthouse": [
    {name: "South Padre Island", slug: "south-padre-island", description: "Plan the beaches and lagoon"},
    {name: "Port Isabel Historical Museum", slug: "port-isabel-historical-museum", description: "Local history next to the lighthouse"}
  ],
  "port-isabel-historical-museum": [
    {name: "South Padre Island", slug: "south-padre-island", description: "Nearby barrier-island trip planning"},
    {name: "Port Isabel Lighthouse", slug: "port-isabel-lighthouse", description: "Historic navigational context"}
  ],
  "palmito-ranch-battlefield": [
    {name: "Palo Alto Battlefield", slug: "palo-alto-battlefield-national-historical-park", description: "Contrast 1846 and 1865 conflicts"},
    {name: "South Padre Island", slug: "south-padre-island", description: "Broader Valley trip base"}
  ],
  "palo-alto-battlefield-national-historical-park": [
    {name: "Palmito Ranch", slug: "palmito-ranch-battlefield", description: "Civil War landscape"},
    {name: "South Padre Island", slug: "south-padre-island", description: "Nearby coast and visitor base"}
  ],
  "historic-brownsville-museum": [
    {name: "Palo Alto Battlefield", slug: "palo-alto-battlefield-national-historical-park", description: "Earlier borderland military history"},
    {name: "Palmito Ranch", slug: "palmito-ranch-battlefield", description: "The Civil War's final land battle"}
  ],
  "iwo-jima-museum-monument": [
    {name: "Palo Alto Battlefield", slug: "palo-alto-battlefield-national-historical-park", description: "Compare military remembrance across eras"},
    {name: "South Padre Island", slug: "south-padre-island", description: "Pair military history with the wider Valley"}
  ],
  "texas-state-aquarium": [
    {name: "Corpus Christi Museum of Science and History", slug: "corpus-christi-museum-science-history", description: "Cultural and natural history of the coast"},
    {name: "La Salle Odyssey", slug: "la-salle-odyssey-texas-coast", description: "The coast's archaeological history"}
  ],
  "uss-lexington-museum-corpus-christi": [
    {name: "Corpus Christi Museum of Science and History", slug: "corpus-christi-museum-science-history", description: "Compare centuries of maritime heritage"},
    {name: "Texas State Aquarium", slug: "texas-state-aquarium", description: "Marine ecology across North Beach"}
  ],
  "museum-of-the-coastal-bend": [
    {name: "La Salle Odyssey", slug: "la-salle-odyssey-texas-coast", description: "Follow Fort St. Louis across coastal museums"}
  ],
  "matagorda-county-museum": [
    {name: "La Salle Odyssey", slug: "la-salle-odyssey-texas-coast", description: "Historical seven-museum route"}
  ],
  "calhoun-county-museum": [
    {name: "La Salle Odyssey", slug: "la-salle-odyssey-texas-coast", description: "Historical seven-museum route"}
  ],
  "texana-museum-and-library": [
    {name: "La Salle Odyssey", slug: "la-salle-odyssey-texas-coast", description: "French coastal settlement archaeology"}
  ]
};

const newText: Record<string, string[]> = {
  "goose-island-state-park": [
    "Plan Goose Island for fishing, camping, birding and bay ecology—not swimming. TPWD does not recommend swimming because of bulkheads, shells, mud flats and marsh vegetation. The park reports a 1,620-foot pier, a boat ramp and a separate kayak/canoe launch. Texas state-park shore and pier fishing does not require a fishing license; boating and other regulations still apply.",
    "TPWD lists 44 bayfront water/electric campsites, 57 wooded water/electric campsites, 25 walk-in tent sites without electricity and a youth-group camp. These are different site categories, not 57 total campsites. Showers serve electric loops; confirm the individual reservation type, map and current closures rather than assume every campsite has the same services.",
    "The mainland Big Tree area is a separate short outing: its live oak is centuries old but its exact age is unknown. For 2026, check the park's alert page for burn restrictions, campsite construction, water conservation and site-specific closures before departure."
  ],
  "corpus-christi-museum-science-history": [
    "To understand this museum, compare its very different learning paths. The 1554 Spanish shipwreck collections and artifacts from the 1686 French La Belle wreck illuminate two centuries of maritime archaeology; the Corpus Christi History Hall interprets the city; the H-E-B Science Center includes interactive STEM exhibits, a Collaboratory, planetarium and access to an outdoor play area. Check the current exhibit and planetarium schedule rather than assume all experiences run continuously.",
    "This museum is a key stop on the Texas Historical Commission's historical La Salle Odyssey. Its collections should not be confused with the conserved La Belle hull displayed at the Bullock Museum in Austin. Families can choose a shipwreck-focused short visit or a longer hands-on science visit. Verify museum-specific accessibility and school-group availability before arrival."
  ],
  "port-isabel-historical-museum": [
    "The 1899 Champion Building is not simply a container for exhibits: its historic commercial setting and 1906 fish mural are central artifacts. Inside, interpretation links Laguna Madre fishing, international trade, the U.S.–Mexican War and local community history. Pair the museum with the Port Isabel Lighthouse to understand the movement of ships through Brazos Santiago.",
    "Because the museum is small and operates on its own schedule, confirm open galleries, hours, tickets and building accessibility with the Museums of Port Isabel. The historical exhibit collection is not proof that every object described in older city brochures remains on view."
  ],
  "historic-brownsville-museum": [
    "A visit here is partly architectural: the restored Southern Pacific depot interprets Brownsville's rail-era growth, while the Simón Celaya Railroad Gallery adds a historic narrow-gauge locomotive associated with Rio Grande transport. Distinguish the railroad's nineteenth-century story from the later depot building. Pair with Palo Alto Battlefield and the Brownsville historical district for context."
  ],
  "palo-alto-battlefield-national-historical-park": [
    "Palo Alto preserves the site of the May 8, 1846 U.S.–Mexican War battle on open coastal prairie. The National Park Service interprets both sides of the conflict and the unresolved Nueces-versus-Rio-Grande boundary issue. Start at the visitor center for maps and trail updates; weather, exposed paths and interpretive-program schedules matter more here than indoor museum-style amenities.",
    "Resaca de la Palma is a distinct battlefield and landscape; do not combine the two battle locations into a single site. Port Isabel helps explain the Gulf supply route, while Palmito Ranch belongs to the Civil War almost two decades later."
  ],
  "palmito-ranch-battlefield": [
    "Palmito Ranch was the site of the May 1865 fighting often called the final land battle of the Civil War, occurring after Lee's April surrender. Explain the fighting in the setting of the Rio Grande cotton trade, late-war communications and continued military operations—not as though it determined the outcome of the war. Access and interpretation on the landscape differ from a staffed NPS visitor center."
  ],
  "texas-state-aquarium": [
    "A Texas State Aquarium visit is a marine-conservation outing, not a general history museum. Plan around the current exhibit map, wildlife presentations and animal-care education. Confirm which habitats and shows are open on your selected day rather than promising a particular shark, sea turtle or rescued animal will be visible. Pair with the USS Lexington on North Beach for two different interpretations of the Gulf."
  ],
  "iwo-jima-museum-monument": [
    "The Harlingen monument is connected to the iconic Iwo Jima flag-raising image, but a viewer should distinguish the historic 1945 photograph, the subsequent memorial sculpture model and the later memorial installation. Confirm the current museum and monument access arrangements with the operating organization, particularly while expansion or development plans remain in flux."
  ],
  "port-aransas": [
    "For cultural history, Port Aransas connects to the working ship channel and fisheries, while Rockport-Fulton across the bays offers Fulton Mansion, Texas Maritime Museum and the wider La Salle Odyssey trail. Those are regional excursions, not attractions inside the town of Port Aransas. Allow for ferry queues, bridge routes and changed coastal weather when planning cross-bay trips."
  ],
  "fulton-mansion": [
    "The Fulton Mansion is an architectural and social-history visit in Fulton rather than an attraction in Port Aransas. Read its 1870s household technologies alongside the ranching economy and the labor that supported the family's prosperity; confirm current interior access and preservation-related restrictions with the Texas Historical Commission."
  ]
};

function addSideTrips(destination: Destination, links: LocalLink[]): DestinationAreaGuide {
  const existing = destination.areaGuide;
  const sideTrips = links.map((item) => ({
    name: item.name,
    description: item.description,
    href: item.href ?? (item.slug ? "/destination/" + item.slug : undefined)
  }));
  const fallback = [{ name: destination.nearestTown || "Coastal Texas", description: "Explore the surrounding area and its historical setting." }];
  return {
    intro: existing?.intro ?? ("Make this visit part of a specific coastal Texas itinerary rather than a disconnected stop."),
    nearbyAttractions: existing?.nearbyAttractions ?? [sideTrips[0] ?? fallback[0]],
    foodAndDrink: existing?.foodAndDrink ?? [{ name: destination.nearestTown, description: "Choose current independently verified dining options; availability changes by season." }],
    lodging: existing?.lodging ?? [{ name: destination.nearestTown, description: "Stay near the day's main stops; check travel and ferry logistics when relevant." }],
    neighborhoods: existing?.neighborhoods ?? [{ name: destination.nearestTown, description: "Use the destination town as the geographic base for this visit." }],
    familyStops: existing?.familyStops ?? [sideTrips[0] ?? fallback[0]],
    sideTrips: [
      ...(existing?.sideTrips ?? []),
      ...sideTrips.filter((item) => !(existing?.sideTrips ?? []).some((old) => old.href === item.href))
    ] as DestinationAreaGuide["sideTrips"]
  };
}

/** Applied after museum authority and historic-site canonical reconciliation. */
export function enrichCoastalHeritageAuthority(destination: Destination): Destination {
  const links = localLinks[destination.slug];
  const notes = newText[destination.slug];
  if (!links && !notes) return destination;
  const body = [...destination.body];
  for (const note of notes ?? []) if (!body.includes(note)) body.push(note);
  return {
    ...destination,
    body,
    ...(links?.length ? { areaGuide: addSideTrips(destination, links) } : {}),
    ...(notes?.length ? { sourceCheckedAt: reviewed } : {})
  };
}

/** Hydrate the full independent guide or add researched reciprocal side trips only on a destination detail route. */
export function resolveCoastalHeritageAuthority(destination: Destination): Destination {
  const canonical = coastalHeritageAuthorityDestinations.find((entry) => entry.slug === destination.slug);
  return enrichCoastalHeritageAuthority(canonical ?? destination);
}
