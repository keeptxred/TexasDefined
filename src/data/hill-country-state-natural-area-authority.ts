import type { Destination } from "./types";

/** TPWD entrance, trail and campground facts checked 2026-10-12; park-specific land, not generic area prose. */
export const hillCountryStateNaturalAreaAuthority: Destination = {
  id: "texasdefined-hill-country-state-natural-area",
  brandId: "texasdefined",
  slug: "hill-country-state-natural-area",
  name: "Hill Country State Natural Area",
  category: "state-parks",
  region: "hill-country",
  nearestTown: "Bandera",
  county: "Bandera",
  coordinates: { lat: 29.628034, lng: -99.181086 },
  address: "10600 Bandera Creek Road, Bandera, TX 78003",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Overlook_View_Hill_Country_SNA_Texas_2023.jpg?width=1600",
    alt: "Scenic Hill Country State Natural Area ridgeline overlook photographed on-site October 2023",
    width: 1600, height: 900,
    credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons · photo October 14, 2023",
  },
  summary: "A rugged backcountry natural area southwest of Bandera with 40 miles of hiking and equestrian routes, primitive creekside and remote camping, and hillside overlooks that require careful trail-and-water planning.",
  bestSeason: "Spring and fall are typically most comfortable for walking, riding and primitive camping; the open Hill Country landscape can be exposed to summer heat.",
  entryNote: "Daily park access, with office hours 8:15 a.m.–4:45 p.m. TPWD currently lists $6 adult day entry and free entry for children 12 and under. Reserve passes ahead; trails close after rain and the October 5 alert reported all trails open with an active burn ban. Recheck alerts before visiting.",
  highlights: [
    "40 miles of multiuse trails on rugged former ranchland",
    "West Verde Creek and Comanche Bluff walk-in campsites with nearby toilets",
    "Butterfly Springs, Hermit's Shack and Wilderness hike-in camps without water",
    "Bandera gateway; access by caliche road after Ranch Road 1077",
    "Official equestrian/trails map and bird checklist",
  ],
  body: [
    "Hill Country State Natural Area is a less-developed counterpart to the region's lake and river parks. Its steep, rocky hills, valleys and brushland preserve a working-ranch landscape west of Bandera while offering miles of horseback, mountain-bike and hiking routes. That rustic character is the point: do not plan a trip here expecting a paved family promenade, a lake swimming beach or the services of a full RV resort. Choose a route to match your experience, weather and ability to carry water.",
    "TPWD lists a network of roughly 40 miles of multiuse trails, and the official trail map is essential because crossings and slopes vary greatly. Seasonal closures matter: rain can make trails unusable, and fire restrictions may alter camping plans. The October 5, 2026 trail bulletin said all trails were open but warned of possible closures following precipitation and showed a burn ban. Download the map before reaching the ranchland; office hours and park-day access are not interchangeable.",
    "There are genuinely different primitive camping experiences. West Verde Creek's three walk-in campsites are up to 50 yards from parking and have water plus a nearby chemical toilet. Comanche Bluff has three walk-in campsites within approximately 25 yards of parking, with water and a nearby vault toilet. Chaquita Falls has four sites with nearby chemical toilets, water and a walk of up to 75 yards. Check exact site descriptions before assuming potable water at every campsite, a shower, or a vehicle-sized pad.",
    "The remote backcountry options require substantially more preparation. Two Butterfly Springs campsites are about 2.87 miles from parking, Hermit's Shack has three sites about 3.25 miles from parking, and Wilderness has five sites about 2.3 miles from parking. TPWD specifically lists no water and no ground fires at these hike-in sites; some are first-come, not advance reservable. Distances matter when carrying overnight gear in hot weather and when day-use routes overlap horseback traffic. Confirm water treatment, weather and the current reservation method.",
    "Reaching the headquarters from Bandera requires traveling south on Highway 173 across the Medina River, then following Ranch Road 1077 for roughly ten miles until the blacktop ends and continuing on a signed caliche road. The official headquarters coordinates are 29.628034, -99.181086, but individual trailheads and campsites are elsewhere. The visitor-information desk lists hours of 8:15 a.m.–4:45 p.m.; arrive early enough to resolve access questions. Nearby Bandera makes an appropriate base for supplies and accommodations, without implying services are provided inside remote camps.",
    "The site's value extends beyond recreation: the regional native habitat, wildlife and unusually extensive equestrian network provide a quieter experience than many developed Hill Country parks. TPWD publishes an interpretive guide and bird checklist in addition to its map resources. Use these documents to identify the landscape and seasonal birds rather than treating each saddleback trail as interchangeable. Livestock- and wildlife-sensitive trail etiquette, heat precautions and Leave No Trace practices protect this natural area for future visitors."
  ],
  officialUrl: "https://tpwd.texas.gov/state-parks/hill-country",
  managingAuthority: "Texas Parks and Wildlife Department",
  sourceCheckedAt: "2026-10-12",
  directions: "From Bandera go south on Highway 173, cross the Medina River, turn right onto Ranch Road 1077, and continue roughly ten miles past the end of pavement onto the signed caliche road to park HQ. Avoid relying on a city-center navigation pin.",
  accessibilityNotes: "Trails are predominantly rustic, rocky and sometimes steep. Verify current accessible parking and restroom facilities directly with TPWD rather than assuming that every campsite or trail is wheelchair-friendly.",
};

export function applyHillCountryStateNaturalAreaAuthority(destination: Destination): Destination {
  if (destination.slug !== hillCountryStateNaturalAreaAuthority.slug) return destination;
  return { ...destination, ...hillCountryStateNaturalAreaAuthority, id: destination.id, featured: destination.featured };
}
