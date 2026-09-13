import type { LandscapeGuide } from "./texas-landscapes";
import { texasLandscapeGuides } from "./texas-landscapes";

export type LandscapeGuideSource = {
  label: string;
  href: string;
};

export type EnrichedLandscapeGuide = LandscapeGuide & {
  sourceLinks: LandscapeGuideSource[];
};

type LandscapeGuideEnhancement = {
  sections: LandscapeGuide["sections"];
  sourceLinks: LandscapeGuideSource[];
};

const TPWD_ECOREGIONS = "https://tpwd.texas.gov/education/hunter-education/online-course/wildlife-conservation/texas-ecoregions";
const TPWD_TRANS_PECOS = "https://tpwd.texas.gov/landwater/land/habitats/trans_pecos/";
const TPWD_EDWARDS = "https://tpwd.texas.gov/landwater/land/habitats/cross_timbers/ecoregions/edwards_plateau.phtml";
const TPWD_HIGH_PLAINS = "https://tpwd.texas.gov/wildlife/wildlife-diversity/wildscapes/wildscapes-plant-guidance-by-ecoregion/high-plains/";
const TPWD_GULF_COAST = "https://tpwd.texas.gov/education/resources/texas-junior-naturalists/regions/gulf-coast";
const TWDB_EDWARDS = "https://www.twdb.texas.gov/groundwater/aquifer/majors/edwards-bfz.asp";
const NPS_CHIHUAHUAN = "https://www.nps.gov/subjects/geology/geodiversity-atlas-chihuahuan-desert-network-index.htm";
const NPS_BIG_BEND = "https://www.nps.gov/articles/nps-geodiversity-atlas-big-bend-national-park-texas.htm";
const NPS_BIG_THICKET = "https://www.nps.gov/bith/learn/the-big-thicket.htm";

const enhancements: Record<string, LandscapeGuideEnhancement> = {
  "most-beautiful-landscapes-in-texas": {
    sections: [
      {
        heading: "Choose the kind of beauty before choosing the destination",
        body: "Texas Parks and Wildlife divides the state into ten broad natural regions because rainfall, elevation, soils and plant communities change dramatically across Texas. That is the useful way to plan this question. If you want relief and exposed rock, favor the Trans-Pecos, Guadalupe Mountains or Panhandle canyons. If water and shade matter more, move toward the Edwards Plateau, Hill Country rivers or East Texas. If horizon and sky are the point, the High Plains and Rolling Plains can be more rewarding than a famous landmark crowded into a short stop.",
      },
      {
        heading: "Use a protected landscape as the trip anchor",
        body: "The strongest first trip usually starts with a landscape that has public access and enough room to experience the geography rather than merely photograph it from a road. Big Bend combines desert basins, canyons, volcanic terrain and wooded mountains; Big Thicket protects a very different East Texas mosaic of pine forest, hardwoods, wetlands and bayous. State parks, national parks and preserves also make the practical side easier because trails, closures, water access and safety information are published by the managing agency.",
      },
      {
        heading: "Season can change the ranking",
        body: "There is no permanent statewide top ten because Texas landscapes are highly seasonal. Spring can elevate prairie and Hill Country wildflower country; summer pushes many travelers toward shaded rivers, springs and the coast while making exposed desert travel more demanding; fall can improve East Texas forest trips; winter often makes South Texas and the Trans-Pecos easier to explore on foot. Treat the list as a set of landscape types to match to weather, daylight and the experience you want rather than as a fixed beauty contest.",
      },
    ],
    sourceLinks: [
      { label: "Texas Parks & Wildlife — Texas ecoregions", href: TPWD_ECOREGIONS },
      { label: "National Park Service — Big Bend geodiversity atlas", href: NPS_BIG_BEND },
      { label: "National Park Service — What is the Big Thicket?", href: NPS_BIG_THICKET },
    ],
  },
  "where-does-texas-turn-into-desert": {
    sections: [
      {
        heading: "The transition is ecological, not a county-line switch",
        body: "The clearest answer is the Trans-Pecos, but the approach to desert begins before the scenery looks like a postcard from Big Bend. Westward travel crosses progressively drier plains and scrub before Chihuahuan Desert vegetation and basin-and-range topography become dominant. Texas Parks and Wildlife treats the Trans-Pecos as the state's mountain-and-desert region, while the National Park Service describes the Chihuahuan Desert as broad basins separated by fault-block mountains. That combination of aridity, vegetation and landform is more meaningful than a single highway mile marker.",
      },
      {
        heading: "Mountains interrupt the desert",
        body: "Far West Texas is not a flat sheet of desert. The Chisos, Davis, Guadalupe and other ranges rise from desert basins and create sharp changes in temperature, rainfall, vegetation and views over short distances. Higher slopes can support woodland and grassland communities that do not resemble the basin floor below. That is why a traveler can move through creosote and lechuguilla country and then encounter pinyon, juniper or oak at elevation without ever leaving the broader Trans-Pecos landscape.",
      },
      {
        heading: "What to watch for on the drive west",
        body: "The visual clues arrive in layers: grasslands thin, woody desert shrubs become more common, broad basins open between isolated ranges and water becomes less obvious on the surface. Around the Permian Basin the country can already feel arid, but the classic Chihuahuan Desert combination becomes much stronger farther west and south. Use vegetation and relief together; a dry oilfield plain and a true desert basin may share sparse cover, but they do not tell the same ecological or geologic story.",
      },
    ],
    sourceLinks: [
      { label: "Texas Parks & Wildlife — Trans-Pecos habitat", href: TPWD_TRANS_PECOS },
      { label: "National Park Service — Chihuahuan Desert geodiversity", href: NPS_CHIHUAHUAN },
      { label: "National Park Service — Big Bend geodiversity atlas", href: NPS_BIG_BEND },
    ],
  },
  "why-is-the-texas-hill-country-so-hilly": {
    sections: [
      {
        heading: "The eastern plateau edge is the most deeply dissected part",
        body: "The Edwards Plateau is a broad limestone upland, but its eastern and southeastern margins are cut much more deeply than the flatter interior. Texas Parks and Wildlife describes the Hill Country as the eroded eastern portion of the Edwards Plateau. Streams working through uplifted limestone created a dense pattern of valleys, ridges and canyon walls. The result feels mountainous from the road even though the region is fundamentally a dissected plateau rather than a folded mountain chain.",
      },
      {
        heading: "Faulting helped set the stage for steep relief",
        body: "The Balcones Fault Zone marks a major structural break along the plateau margin. Faulting fractured and displaced Cretaceous limestone, while long-term erosion exploited those weaknesses and the regional elevation change. The fault zone does not explain every individual hill, but it helps explain why the eastern edge of the plateau has such a pronounced escarpment-and-valley character and why the terrain changes so quickly toward Austin, San Marcos, New Braunfels and San Antonio.",
      },
      {
        heading: "Karst makes the hills a water story too",
        body: "Limestone dissolves along fractures and bedding planes, creating caves, sink features and highly permeable aquifers. The Texas Water Development Board notes that partially dissolved Edwards limestone transmits groundwater efficiently and feeds major springs including Comal and San Marcos. Those same rock-water relationships help explain the clear streams, spring systems and abrupt limestone valleys that make the Hill Country visually distinct. In other words, the region's hills and its famous water are parts of the same geologic system.",
      },
    ],
    sourceLinks: [
      { label: "Texas Parks & Wildlife — Edwards Plateau ecological region", href: TPWD_EDWARDS },
      { label: "Texas Water Development Board — Edwards (Balcones Fault Zone) Aquifer", href: TWDB_EDWARDS },
      { label: "Texas Parks & Wildlife — Texas ecoregions", href: TPWD_ECOREGIONS },
    ],
  },
  "texas-geography-explained": {
    sections: [
      {
        heading: "Rainfall is one of the biggest statewide gradients",
        body: "Texas Parks and Wildlife describes an enormous east-to-west moisture contrast, from humid East Texas to the deserts of the Trans-Pecos. That rainfall gradient helps explain why dense pine and hardwood forests dominate the east while grassland, shrubland and desert communities become progressively more important to the west. It also changes river behavior, wildfire patterns, agriculture and the amount of permanent surface water a traveler sees from the road.",
      },
      {
        heading: "Elevation rises, but not in one smooth ramp",
        body: "The state climbs westward through plains and plateaus before reaching mountain-and-basin country. The High Plains form a broad elevated tableland separated from the Rolling Plains by the Caprock Escarpment, while the Trans-Pecos contains individual mountain ranges separated by desert basins. Central Texas adds another major break where the Edwards Plateau meets the lower country along the Balcones system. These steps and edges create many of the dramatic landscape transitions people notice on long Texas drives.",
      },
      {
        heading: "Water connects otherwise different regions",
        body: "Major rivers generally move toward the Gulf, cutting across several natural regions on the way. In limestone country, groundwater and springs can be as important as visible rivers; on the coast, bays, estuaries, marshes and barrier islands take over; in the High Plains, playa lakes create seasonal wetland islands in an otherwise dry grassland setting. Reading Texas geography through both surface water and groundwater makes the state's apparent contradictions easier to understand.",
      },
    ],
    sourceLinks: [
      { label: "Texas Parks & Wildlife — Texas ecoregions", href: TPWD_ECOREGIONS },
      { label: "Texas Parks & Wildlife — High Plains", href: TPWD_HIGH_PLAINS },
      { label: "Texas Parks & Wildlife — Gulf Coast region", href: TPWD_GULF_COAST },
    ],
  },
  "best-scenic-drives-for-every-texas-landscape": {
    sections: [
      {
        heading: "A scenic drive works best when the road crosses a landscape boundary",
        body: "The most memorable Texas drives often show change rather than a single unbroken view. Dropping from the High Plains through the Caprock reveals the difference between a level plateau and the dissected country below. Hill Country routes work because roads repeatedly move from limestone ridges into spring-fed valleys. Far West Texas roads alternate between desert basins and mountain walls. Choose routes that expose those transitions instead of simply tracing the shortest line between two attractions.",
      },
      {
        heading: "Public-land anchors make the route easier to verify and plan",
        body: "Pair the drive with a park, preserve or other managed landscape where current access and safety information are published. Big Bend can anchor a desert-and-mountain route, Big Thicket a Piney Woods and wetland route, and state parks can anchor canyon, river, coast or prairie drives. The road is part of the experience, but the managed stop gives you a place to get out, walk the terrain and understand what the windshield view is showing you.",
      },
      {
        heading: "Do not confuse scenic with empty or risk-free",
        body: "Long Texas drives can involve large gaps between fuel, weak mobile service, heat, flash-flood potential, wildlife on the road and private property close to tempting photo pullouts. A route that is beautiful in cool weather may be punishing in midsummer. Check road conditions and park alerts, keep fuel margins conservative in remote country and use legal public turnouts rather than stopping in travel lanes or crossing fences for a photograph.",
      },
    ],
    sourceLinks: [
      { label: "Texas Parks & Wildlife — Texas ecoregions", href: TPWD_ECOREGIONS },
      { label: "National Park Service — Big Bend geodiversity atlas", href: NPS_BIG_BEND },
      { label: "National Park Service — Big Thicket National Preserve", href: NPS_BIG_THICKET },
    ],
  },
  "texas-landscapes-by-region": {
    sections: [
      {
        heading: "Travel regions and natural regions answer different questions",
        body: "A travel region is designed to help people organize trips; an ecoregion describes recurring patterns in landform, climate, soils, plants and wildlife. They overlap but do not line up perfectly. A Central Texas weekend can cross Blackland Prairie, Post Oak Savannah and Edwards Plateau in a few hours, while the broad Panhandle travel region can include High Plains tableland, Caprock breaks and Rolling Plains. TexasDefined therefore uses travel regions for itinerary organization and landscape pages for physical geography.",
      },
      {
        heading: "Use the natural-region map when the scenery changes faster than the city names",
        body: "The ecoregion framework is especially useful on road trips because natural boundaries often become visible before a traveler reaches a new tourism region. Forest can open into savannah, prairie can break into escarpment, and coastal prairie can flatten into marsh and barrier-island systems without a municipal boundary announcing the change. That makes natural regions a better tool for understanding what you are seeing from the road.",
      },
      {
        heading: "The edges are often more interesting than the centers",
        body: "Ecological transition zones can combine species, landforms and cultural patterns from adjoining regions. The Balcones edge mixes plateau limestone, springs and lower prairie country; East Texas transitions from Piney Woods toward Post Oak Savannah; the western plains break abruptly along the Caprock. When planning a landscape-focused trip, do not treat the boundary as a problem to solve. The transition itself is often the reason to drive the route.",
      },
    ],
    sourceLinks: [
      { label: "Texas Parks & Wildlife — Texas ecoregions", href: TPWD_ECOREGIONS },
      { label: "Texas Parks & Wildlife — Edwards Plateau", href: TPWD_EDWARDS },
      { label: "Texas Parks & Wildlife — High Plains", href: TPWD_HIGH_PLAINS },
    ],
  },
  "best-places-to-photograph-texas-landscapes": {
    sections: [
      {
        heading: "Photograph the process, not only the landmark",
        body: "The strongest landscape photographs often show why a place looks the way it does: a limestone river bend framed by cypress, a playa reflecting a High Plains sky, desert vegetation leading toward a fault-block range, or a bayou disappearing into cypress and hardwood forest. Those relationships give the image geographic meaning. Wide scenes establish scale, while closer details of rock, vegetation, water and weather can make a familiar Texas destination feel specific rather than generic.",
      },
      {
        heading: "Light behaves differently across Texas",
        body: "Open desert and prairie exaggerate low-angle light because there is little canopy to soften it, while East Texas forests often benefit from overcast weather, mist or reflected light under the trees. Coastal scenes can change quickly with cloud cover, humidity and wind on the water. In canyon country, direct midday sun can flatten color while early and late light reveal relief through shadow. Plan the time of day around the landscape structure rather than using one photography rule statewide.",
      },
      {
        heading: "Build in a weather and access backup",
        body: "Texas landscape photography is weather-dependent. Wildflower displays vary by rainfall, desert roads can become difficult after storms, coastal wind changes water conditions and summer heat can make exposed trails unsafe during the best-looking light. Use public lands and official access points where possible, check current alerts and keep a second location nearby. The backup often produces better work than forcing a famous viewpoint under poor conditions.",
      },
    ],
    sourceLinks: [
      { label: "National Park Service — Big Bend geodiversity atlas", href: NPS_BIG_BEND },
      { label: "National Park Service — Big Thicket National Preserve", href: NPS_BIG_THICKET },
      { label: "Texas Parks & Wildlife — Gulf Coast region", href: TPWD_GULF_COAST },
    ],
  },
  "what-part-of-texas-looks-like-arizona-colorado-or-the-south": {
    sections: [
      {
        heading: "The Arizona comparison works best in the Chihuahuan Desert",
        body: "Far West Texas shares the basin-and-range visual language associated with the desert Southwest: broad arid valleys, isolated mountain ranges, creosote, yucca, agave and dramatic exposed geology. The comparison is useful as a visual shortcut, but West Texas is specifically Chihuahuan Desert rather than Sonoran Desert. That difference matters because plant communities, elevation patterns and seasonal conditions are not interchangeable with central or southern Arizona.",
      },
      {
        heading: "The Colorado comparison is about relief and elevation, not climate",
        body: "The Guadalupe, Davis and Chisos mountains give Texas its strongest high-country feel, with cooler elevations, wooded slopes in places and long views over lower basins. They are not miniature Rocky Mountains. Texas ranges are generally drier, more isolated and embedded in desert or semi-arid country. Use the comparison to picture vertical relief, not to assume Colorado-style snowpack, alpine vegetation or dense conifer forest.",
      },
      {
        heading: "The Deep South comparison is strongest in the Piney Woods",
        body: "East Texas belongs to the broader southeastern pine-hardwood landscape. Big Thicket protects examples of longleaf and loblolly pine forest, hardwood bottoms, bogs, bayous and cypress wetlands that visually connect Texas with Louisiana and the lower South. The transition westward toward Post Oak Savannah makes this especially useful for travelers who know Texas mainly through prairie, ranch or desert imagery and do not expect the state to contain humid forest country.",
      },
    ],
    sourceLinks: [
      { label: "National Park Service — Chihuahuan Desert geodiversity", href: NPS_CHIHUAHUAN },
      { label: "Texas Parks & Wildlife — Trans-Pecos habitat", href: TPWD_TRANS_PECOS },
      { label: "National Park Service — What is the Big Thicket?", href: NPS_BIG_THICKET },
    ],
  },
};

export const enrichedTexasLandscapeGuides: EnrichedLandscapeGuide[] = texasLandscapeGuides.map((guide) => {
  const enhancement = enhancements[guide.slug];
  if (!enhancement) return { ...guide, sourceLinks: [] };
  return {
    ...guide,
    sections: [...guide.sections, ...enhancement.sections],
    sourceLinks: enhancement.sourceLinks,
  };
});

export function getEnrichedTexasLandscapeGuide(slug: string) {
  return enrichedTexasLandscapeGuides.find((guide) => guide.slug === slug);
}
