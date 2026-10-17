/**
 * Verified inland *beach* inventory. Swimming being allowed at a lake does NOT
 * establish a named/designated swimming beach. Only enter locations whose
 * managing agency explicitly documents a beach or swimming cove.
 *
 * These are documented starting entries, NOT a claim to cover every inland
 * beach in Texas. Review closure alerts with each managing agency before travel.
 */
export type InlandBeachRecord = {
  slug: string;
  name: string;
  county: string;
  lake: string;
  nearestTown: string;
  managingAgency: string;
  officialUrl: string;
  evidence: string;
  experience: string;
  arrival: string;
  safety: string;
  nearby: string;
  checkedAt: string;
};

const checkedAt = "2026-10-17";

export const inlandSwimmingBeaches: readonly InlandBeachRecord[] = [
  {
    slug: "cedar-hill-state-park-swimming-beach",
    name: "Cedar Hill State Park Swimming Beach",
    county: "Dallas",
    lake: "Joe Pool Lake",
    nearestTown: "Cedar Hill",
    managingAgency: "Texas Parks and Wildlife Department",
    officialUrl: "https://tpwd.texas.gov/state-parks/cedar-hill",
    evidence: "TPWD explicitly identifies a gravel swimming beach with picnic tables, grills, a playground and nearby restrooms.",
    experience: "A developed gravel beach on Joe Pool Lake offers a straightforward swimming outing near Dallas rather than open-Gulf surf. This is a managed state-park beach, not a free public shoreline at an arbitrary point on the reservoir.",
    arrival: "Enter Cedar Hill State Park and follow the park's current signs to its designated swimming beach. Day-use entrance rules and park capacity apply; review the TPWD park alert and reservation information before making the trip.",
    safety: "Check for current lake-related closures and posted swimming boundaries. No lifeguards are provided at Texas state parks, so adults must closely supervise children and consider wind, lake level and water clarity.",
    nearby: "Pair the lake day with other Cedar Hill trails or park interpretation, without treating boat ramps or fishing access as additional approved swimming beaches.",
    checkedAt,
  },
  {
    slug: "ray-roberts-lake-state-park-swim-beaches",
    name: "Ray Roberts Lake State Park Swimming Beaches",
    county: "Denton / Cooke",
    lake: "Ray Roberts Lake",
    nearestTown: "Pilot Point / Valley View",
    managingAgency: "Texas Parks and Wildlife Department",
    officialUrl: "https://tpwd.texas.gov/state-parks/ray-roberts-lake",
    evidence: "TPWD says visitors may swim at beach areas and identifies Isle du Bois and Johnson Branch as developed recreation units; accessible paths to the swimming beach are specifically documented at Isle du Bois.",
    experience: "Ray Roberts is an inland beach trip with more than one developed state-park unit. Isle du Bois has a documented swimming-beach approach, and the park directs visitors to its beach areas for swimming. Do not confuse its nine park units with nine separate swim beaches.",
    arrival: "Choose the intended unit first: Isle du Bois near Pilot Point or Johnson Branch near Valley View. Use the official park map to locate the current swimming area; TPWD recommends advance day-use reservations when capacity is tight.",
    safety: "There are no lifeguards. Confirm the beach area's current availability and observe lake-depth and swimming-zone signage. Trail or access closures elsewhere in this park do not necessarily describe the beach itself.",
    nearby: "The park has trails, nature interpretation, fishing and paddling; connect an overnight stay to Pilot Point, Denton or nearby North Texas attractions only after checking driving distances.",
    checkedAt,
  },
  {
    slug: "eisenhower-state-park-swimming-cove",
    name: "Eisenhower State Park Sandy Swimming Cove",
    county: "Grayson",
    lake: "Lake Texoma",
    nearestTown: "Denison",
    managingAgency: "Texas Parks and Wildlife Department",
    officialUrl: "https://tpwd.texas.gov/state-parks/eisenhower",
    evidence: "TPWD calls out a sandy swimming cove at Eisenhower State Park on Lake Texoma.",
    experience: "This is a sheltered, sandy inland cove beneath the rocky shores and bluffs of Lake Texoma. Its setting differs from open reservoir boat launches and is why the designated swimming cove deserves its own entry.",
    arrival: "Use the state park entrance outside Denison and consult the current visitor map to find the sandy swimming cove. Day-use admission, park capacity and any active site alerts are controlled by TPWD.",
    safety: "Stay within authorized areas; shallow coves can still have changing depths or submerged hazards. There is no state-park lifeguard service, and storm or flood conditions can change access.",
    nearby: "The larger Eisenhower State Park visit can include trails, fossil interest, fishing and Lake Texoma overlooks.",
    checkedAt,
  },
  {
    slug: "lake-mineral-wells-state-park-swim-beach",
    name: "Lake Mineral Wells State Park Swim Beach",
    county: "Parker",
    lake: "Lake Mineral Wells",
    nearestTown: "Mineral Wells",
    managingAgency: "Texas Parks and Wildlife Department",
    officialUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/mineral_wells/access.phtml",
    evidence: "TPWD's official public-access guide lists a swim beach, showers, camping and boat/canoe rentals inside Lake Mineral Wells State Park.",
    experience: "This is a managed state-park lake beach with visitor amenities, not an unmanaged shore pull-off. The park offers a lake day alongside camping and trail activities near Mineral Wells.",
    arrival: "Access the beach through Lake Mineral Wells State Park east of Mineral Wells off U.S. 180. Entrance fees apply; consult the current state-park page because wildlife-management and other closures can interrupt access.",
    safety: "Use the signed swimming area and do not interpret boat ramps as swimming access. State parks do not provide lifeguards; water and weather conditions require a same-day check.",
    nearby: "Pair a beach visit with the state park trails and Mineral Wells-area history rather than promising access to every portion of the lake.",
    checkedAt,
  },
  {
    slug: "tyler-state-park-swimming-beach",
    name: "Tyler State Park Swimming Beach",
    county: "Smith",
    lake: "Tyler State Park Lake",
    nearestTown: "Tyler",
    managingAgency: "Texas Parks and Wildlife Department",
    officialUrl: "https://tpwd.texas.gov/state-parks/tyler",
    evidence: "TPWD identifies a sandy beach by its 64-acre spring-fed park lake, and says visitors can swim there.",
    experience: "A smaller spring-fed lake surrounded by East Texas pines creates a very different beach day from the coast or a large reservoir. The sandy beach is inside a state park with trails and lakeside picnic opportunities.",
    arrival: "Enter Tyler State Park and follow its posted signs to the lake and swimming beach. Check day-use availability, swimming-area status and park notices before leaving; some facilities operate seasonally.",
    safety: "The lake is not staffed by lifeguards, and even calm-looking freshwater can have drop-offs. Observe the designated area and supervise children closely.",
    nearby: "The beach can anchor a Tyler-area family day with woodland trails, wildlife viewing or camping, but boat-rental availability should be confirmed separately.",
    checkedAt,
  },
  {
    slug: "atlanta-state-park-swim-beach",
    name: "Atlanta State Park Swim Beach",
    county: "Cass",
    lake: "Wright Patman Lake",
    nearestTown: "Atlanta",
    managingAgency: "Texas Parks and Wildlife Department",
    officialUrl: "https://tpwd.texas.gov/state-parks/atlanta/trails-info/",
    evidence: "TPWD's trail guide says Bobo's Ferry Trail reaches the swim beach parking area; TPWD also documents a designated sandy swimming beach.",
    experience: "In Northeast Texas, Atlanta State Park has a designated lake beach amid pine and hardwood forest. It should be presented as a managed beach within the park, not confused with every public boat ramp on Wright Patman Lake.",
    arrival: "Reach the state park near Atlanta, then use the park map and signed swim-beach parking area. Confirm TPWD alerts, entry rules and the beach's operating status before arrival.",
    safety: "The designated beach is the appropriate starting point; do not enter the lake at boating facilities without explicit authorization. No lifeguards are on duty at Texas state parks.",
    nearby: "Hikes, camping, birding and Wright Patman Lake scenery make this a fuller Northeast Texas weekend stop.",
    checkedAt,
  },
  {
    slug: "cedron-creek-park-swimming-beach",
    name: "Cedron Creek Park Swimming Beach",
    county: "Bosque",
    lake: "Lake Whitney",
    nearestTown: "Whitney",
    managingAgency: "U.S. Army Corps of Engineers",
    officialUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/whitney/access2.phtml",
    evidence: "TPWD's public-access listing specifically names a swimming beach at Cedron Creek Park and identifies the U.S. Army Corps of Engineers as operator.",
    experience: "Cedron Creek is a seasonal U.S. Army Corps of Engineers park beach on Lake Whitney. This is a more precise swimming destination than the general Lake Whitney shoreline or the nearby state park.",
    arrival: "TPWD places the park near FM 1713 off FM 933. Its access listing describes an April–September operating season and a fee, but visitors must confirm current dates, flood closures and admission directly with the managing agency.",
    safety: "Lake Whitney access areas can close after high water or flood damage. Treat a published historic operating season as a planning cue, not a guarantee that swimming is presently permitted.",
    nearby: "Explore other Lake Whitney sites for fishing, camping and views, but keep their boat ramps separate from the confirmed Cedron Creek swim beach.",
    checkedAt,
  },
  {
    slug: "lake-brownwood-state-park-swim-beach",
    name: "Lake Brownwood State Park Swimming Beach",
    county: "Brown",
    lake: "Lake Brownwood",
    nearestTown: "Brownwood",
    managingAgency: "Texas Parks and Wildlife Department",
    officialUrl: "https://tpwd.texas.gov/state-parks/lake-brownwood/fees-facilities/group-facilities/",
    evidence: "TPWD identifies a park swimming area with an adjacent bathhouse; its state-park publication describes a designated swimming beach.",
    experience: "This Central Texas reservoir beach is attached to a park known for Civilian Conservation Corps-era buildings, cabins and camping. The swim area is a specific managed part of the lake, not general permission to enter water anywhere.",
    arrival: "Travel to Lake Brownwood State Park and follow the current visitor map to the designated swimming area. Day-use charges and park alerts apply, and lake levels may affect conditions.",
    safety: "There is no lifeguard. Follow marked swimming boundaries, assess current water conditions, and verify whether the beach and bathhouse are operating before planning around them.",
    nearby: "Historic park architecture, the recreation hall and camping provide options for a longer Brown County stay.",
    checkedAt,
  },
];

export const inlandBeachBySlug = (slug: string) => inlandSwimmingBeaches.find((beach) => beach.slug === slug);
