import type { CoastalEditorialDetail } from "./coastal-beach-editorial";

/** Individually researched bay and South Padre Island beaches. Dates and closure
 * orders are historical evidence, not current open/closed flags. Oct 17, 2026.
 */
export const COASTAL_BEACH_EDITORIAL_SOUTH: Readonly<Record<string, CoastalEditorialDetail>> = {
  "north-beach-corpus-christi": {
    "headline": "Corpus Christi's North Beach is a bayfront pedestrian shoreline by the aquarium and USS Lexington",
    "arrival": "North Beach is across the Harbor Bridge from downtown Corpus Christi, with a waterfront Beach Walk, cabana sites, seafood restaurants, Texas State Aquarium and USS Lexington. The city classifies it as one of only two municipally maintained Corpus Christi Bay beaches.",
    "rules": "The Corpus Christi Parks & Recreation bay-beach rules prohibit vehicles on the sand, barbecues, campfires and inflatables such as moonwalks. Glass containers and overnight abandoned canopies are also prohibited under the rules for all city beaches. Gulf beach vehicle-parking permits do not automatically apply to North Beach.",
    "visitorDecision": "Choose North Beach for a walkable bayfront with nearby museums and waterfront dining, not for drive-on Gulf surf. Compare McGee Beach if you want to stay on the downtown Shoreline Boulevard side of the harbor.",
    "sourceUrl": "https://www.corpuschristitx.gov/department-directory/parks-and-recreation/beaches/bay-beaches/",
    "extraUrl": "https://www.corpuschristitx.gov/department-directory/parks-and-recreation/beaches/beach-rules/"
  },
  "mcgee-beach": {
    "headline": "McGee Beach is Corpus Christi's downtown bay beach, reached on foot from Shoreline Boulevard",
    "arrival": "McGee Beach is on Shoreline Boulevard along Corpus Christi Bay, near McCaughan Park, the marina, downtown hotels, restaurants and city museums. Unlike North Beach across the Harbor Bridge, this is the bayfront beach serving the downtown Shoreline promenade.",
    "rules": "Corpus Christi's official bay-beach restrictions bar vehicle driving on the beach and also prohibit beach barbecues, fires and inflatable bounce structures. Citywide beach rules prohibit glass containers, litter and canopies left overnight. Do not mistake these bayfront rules for Gulf-drive beach permits.",
    "visitorDecision": "Choose McGee Beach for a downtown stroll, bay views, marina restaurants and a pedestrian-friendly beach visit. It is not a surf or drive-on sand destination; beach activity suitability still depends on present water conditions and posted advisories.",
    "sourceUrl": "https://www.corpuschristitx.gov/department-directory/parks-and-recreation/beaches/bay-beaches/",
    "extraUrl": "https://www.corpuschristitx.gov/department-directory/parks-and-recreation/beaches/beach-rules/"
  },
  "south-padre-island-beaches": {
    "headline": "South Padre Island city beaches are pedestrian-only Gulf shorelines with rules unlike county drive-on access",
    "arrival": "The City of South Padre Island's maintained beachfront includes approximately five miles of shore and numerous designated pedestrian beach access paths through dunes. These municipal beach accesses are different from Cameron County's managed Isla Blanca and Andy Bowie beach parks and its northern drive-on access points.",
    "rules": "The city's Shoreline Department states motor vehicles and electric bicycles are prohibited on its municipal beaches. Dune preservation, beach litter, construction activity and changing surf flags matter. Do not apply county E.K. Atwood beach driving rules or the county park entrance system to the city beachfront.",
    "visitorDecision": "Choose municipal South Padre Island beach access for a walk-on Gulf sand day near town lodging and restaurants. For park amenities, RV facilities or a specific county-managed beach access, consult the distinct Isla Blanca, Andy Bowie and E.K. Atwood destination pages.",
    "sourceUrl": "https://www.myspi.org/department/index.php?structureid18=",
    "extraUrl": "https://www.cameroncountytx.gov/cameron-county-re-opens-county-beach-access-areas-3/"
  },
  "isla-blanca-park": {
    "headline": "Isla Blanca is Cameron County's south-tip beach park, not the same as a walk-on city beach access",
    "arrival": "Isla Blanca Park occupies the southern end of South Padre Island near the Brazos Santiago Pass jetties. Cameron County oversees its public beach and park facilities, with concession and beach-rental services managed separately from municipal city beach access corridors.",
    "rules": "Cameron County's October 11, 2026 notice states Isla Blanca and Andy Bowie stayed open during the temporary high-tide closures of county beach accesses 4, 5 and 6. That dated notice does not certify the park is open at this moment; fees, permitted activities and wave flags must be checked with Cameron County Parks.",
    "visitorDecision": "Use Isla Blanca for a county park at the southern end of the island with jetty, concession and beach access interests. Unlike city walk-on access, county park fees and individual facility availability may apply, and high surf may temporarily affect particular facilities.",
    "sourceUrl": "https://www.cameroncountytx.gov/cameron-county-re-opens-county-beach-access-areas-3/",
    "extraUrl": "https://www.cameroncountytx.gov/annual-contracts/"
  },
  "andy-bowie-county-park": {
    "headline": "Andy Bowie is a separate Cameron County beach park with managed RV facilities at South Padre Island",
    "arrival": "Andy Bowie Park is a Cameron County-managed beach and campground toward the northern end of South Padre Island's developed corridor. It has its own access and RV/camping arrangements and should not be confused with Isla Blanca at the island's south end.",
    "rules": "Cameron County confirms Andy Bowie remained open during the October 10–11, 2026 high-tide closure affecting more northerly county beach access points. County concession records identify beach-rental services for Andy Bowie separately from Isla Blanca. Historical RV price sheets are not current quotes; check the operator for actual entry and camping rates.",
    "visitorDecision": "Choose Andy Bowie when the north-island county park setting or campsite services suit the trip. Do not assume that a park remaining open during a previous storm means its surf flags, beach driving or individual facilities are safe and available today.",
    "sourceUrl": "https://www.cameroncountytx.gov/cameron-county-re-opens-county-beach-access-areas-3/",
    "extraUrl": "https://www.cameroncountytx.gov/annual-contracts/"
  },
  "ek-atwood-park": {
    "headline": "E.K. Atwood Park is Cameron County Beach Access 5, where high tides can temporarily close the road",
    "arrival": "E.K. Atwood Pavilion is Cameron County Beach Access No. 5 on the Gulf shore north of the central South Padre Island city beachfront. It is a county-managed beach access area, not a separate resort beach or the gated Isla Blanca or Andy Bowie parks.",
    "rules": "A Cameron County October 10, 2026 order temporarily closed County Accesses 4, 5 and 6 because high tides made them undriveable. The county then expressly reopened those three points at 8:30 a.m. on October 11, 2026. Those dated decisions show why visitors must inspect current orders; do not report the October 10 closure as still active.",
    "visitorDecision": "Choose E.K. Atwood when you specifically want the County Beach Access 5 corridor, but check current dune protection, driving conditions and beach flags. High tides can make the sand impassable even when nearby Isla Blanca or Andy Bowie remains open.",
    "sourceUrl": "https://www.cameroncountytx.gov/cameron-county-re-opens-county-beach-access-areas-3/",
    "extraUrl": "https://www.cameroncountytx.gov/cameron-county-temporarily-closes-county-beach-access-areas-3/"
  }
};
