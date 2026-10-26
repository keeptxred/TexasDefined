import type { Destination } from "./types";

// Stable fallback for the real historic lodge, rather than assuming the remote
// Explore catalog contains the short canonical slug. The legacy long slug is
// a non-primary imported state-park record; it is not this public guide.
export const indianLodgeAuthorityDestination: Destination = {
  id: "preserved-indian-lodge",
  brandId: "texasdefined",
  slug: "indian-lodge",
  name: "Indian Lodge",
  category: "historic-sites",
  region: "big-bend",
  county: "Jeff Davis",
  nearestTown: "Fort Davis",
  address: "16453 Park Rd. 3, Fort Davis, TX 79734",
  coordinates: { lat: 30.5925, lng: -103.9435 },
  summary: "Indian Lodge is a historic white-adobe Civilian Conservation Corps hotel inside Davis Mountains State Park near Fort Davis. Check its separate overnight-room operations and January 2027 closure alert before planning a stay.",
  hero: {
    src: "/images/state-parks/indian-lodge-state-park-lodge.jpg",
    alt: "Historic white-adobe Indian Lodge building inside Davis Mountains State Park near Fort Davis",
    width: 1600,
    height: 1066,
    credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
  },
  bestSeason: "Spring through fall for scenic mountain drives; verify lodge availability and winter weather before booking",
  entryNote: "This is a historic hotel inside Davis Mountains State Park, not a separately ticketed state park. TPWD has announced Indian Lodge will be closed throughout January 2027. Confirm room availability for other dates directly with TPWD; its statewide lodging directory also carries a renovation-closure note.",
  highlights: [
    "White-adobe 1930s CCC architecture and historic lodge courtyard",
    "Inside Davis Mountains State Park near Skyline Drive and hiking trails",
    "Fort Davis National Historic Site and McDonald Observatory nearby",
    "West Texas mountain scenery, birding and dark skies",
  ],
  body: [
    "Indian Lodge is a historic lodging complex rather than a freestanding state park. Civilian Conservation Corps workers built the striking white-adobe property in the 1930s in the Davis Mountains. Its architecture and setting make it a landmark in their own right, even for travelers researching West Texas history rather than looking for a room.",
    "The lodge sits within Davis Mountains State Park, reached from State Highway 118 via Park Road 3. Its address is 16453 Park Road 3 near Fort Davis. Travelers should distinguish the lodge from the state park's separate visitor facilities and fees. Trails, Skyline Drive, Fort Davis National Historic Site and McDonald Observatory can be combined into a broader mountain itinerary.",
    "Overnight plans need current operator confirmation: the Texas Parks and Wildlife Department has explicitly announced that Indian Lodge will be closed for the entire month of January 2027, and its lodging directory separately carries a renovation-closure notice. Do not assume accommodations, dining or room-booking links are available for a selected date. Review the live official alert and reservation information before making travel arrangements.",
  ],
  managingAuthority: "Texas Parks and Wildlife Department",
  officialUrl: "https://tpwd.texas.gov/state-parks/indian-lodge",
  sourceCheckedAt: "2026-10-21",
  visitorFacts: [
    {
      topic: "access",
      label: "January 2027 closure",
      detail: "TPWD states the entire Indian Lodge will be closed in January 2027. Other dates require direct confirmation with the operator; the TPWD lodging directory also notes renovations.",
      sourceUrl: "https://tpwd.texas.gov/state-parks/indian-lodge/alert",
      checkedAt: "2026-10-21",
    },
    {
      topic: "admission",
      label: "Lodge admission versus overnight rooms",
      detail: "TPWD lists no separate admission fee for Indian Lodge. Guest rooms are priced and reserved separately.",
      sourceUrl: "https://tpwd.texas.gov/state-parks/indian-lodge",
      checkedAt: "2026-10-21",
    },
  ],
};
