import type { CoastalEditorialDetail } from "./coastal-beach-editorial";

/** Second set of source-specific coastal guides, reviewed October 17, 2026.
 * Distinguish date-bound fees, camping and closures from live availability.
 */
export const COASTAL_BEACH_EDITORIAL_EXTRA: Readonly<Record<string, CoastalEditorialDetail>> = {
  "port-aransas-beach": {
    "headline": "Port Aransas Beach has designated drive-on sand, marked pedestrian zones and separate camping limits",
    "arrival": "Port Aransas public beach reaches along the town's Gulf-facing sand. Access roads lead to numbered mile markers; the southern part connects toward Mustang Island and Corpus Christi. Bollards separate permitted vehicle lanes from the recreational area, so the correct entrance depends on whether you plan to park, walk or camp.",
    "rules": "The visitor bureau lists a $12 calendar-year beach-parking sticker for vehicles parked in covered marker zones, with limited free areas near the south jetty/Horace Caldwell Pier and markers 52–58. Beach driving is capped at 15 mph; pets must be leashed, glass and dune driving are prohibited. Published city-beach camping limits are three nights within any three-week period, but county I.B. Magee has different camping arrangements.",
    "visitorDecision": "Choose Port Aransas city beach when you want vehicle-on-sand access under the city's permit system. For RV hookups, look at the managed I.B. Magee campground instead of assuming the free sand camping rules include utilities or reservations. Confirm today's surf flags and any high-water restrictions.",
    "sourceUrl": "https://www.portaransas.org/beach/beach-rules/",
    "extraUrl": "https://www.portaransas.org/beach/beach-rules/parking-permits/"
  },
  "ib-magee-beach-park": {
    "headline": "I.B. Magee is a county-owned Port Aransas jetty beach and developed RV park, not the city beach",
    "arrival": "Nueces County lists I.B. Magee Beach Park at 321 North on the Beach, beside the Gulf and Port Aransas jetties, with Horace Caldwell Pier as a landmark. The 167-acre county park has beach frontage, developed recreational vehicle facilities and fishing-related access.",
    "rules": "The county lists 64 RV sites with water, sewer, electricity and Wi-Fi; reservations and their separate fee schedule are managed by the county park. Camping and pier use cannot be inferred from the City of Port Aransas beach-parking sticker. The local visitor bureau explicitly separates City beach rules from I.B. Magee county beach park rules.",
    "visitorDecision": "Choose this park for the north-end beach and possible developed RV lodging beside Port Aransas fishing access. Choose the wider city beach for its separate municipal rules and drivable shore. Verify beach parking, campsite capacity and any pier operating changes directly with Nueces County.",
    "sourceUrl": "https://www.nuecesco.com/Home/Components/FacilityDirectory/FacilityDirectory/284/",
    "extraUrl": "https://www.nuecesbeachparks.com/i-b-magee-beach-park"
  },
  "boca-chica-beach": {
    "headline": "Boca Chica Beach access can be temporarily blocked along Highway 4 for spaceflight-related activity",
    "arrival": "Boca Chica Beach lies at the eastern end of State Highway 4 in southern Cameron County. This is remote Gulf-facing sand rather than a conventional resort beach with staffed amenities; road closure checkpoints can prevent reaching the shoreline at all.",
    "rules": "Cameron County publishes specific closure orders for Boca Chica Beach and State Highway 4 in connection with spaceflight activity. Individual orders apply to the dates and hours named in each notice, not indefinitely. County notices direct visitors to alternative Cameron County South Padre Island beach access sites during a closure.",
    "visitorDecision": "Treat Boca Chica as a conditional-access nature and beach destination, not a guaranteed swim stop or a permanently closed site. Before driving Highway 4, consult the county's closure page and confirm today's route and beach status; the county also provides a text update service.",
    "sourceUrl": "https://www.cameroncountytx.gov/spacex/",
    "extraUrl": "https://www.cameroncountytx.gov/order-closing-boca-chica-beach-and-state-hwy-4-july-31-2025-from-7-a-m-to-7-p-m/"
  },
  "lighthouse-beach-port-lavaca": {
    "headline": "Port Lavaca Lighthouse Beach combines shallow bay recreation, a splash pad and a wetland boardwalk",
    "arrival": "The City of Port Lavaca lists Lighthouse Beach facilities at 700 Lighthouse Beach Road. Visitors can distinguish the sheltered Matagorda Bay shoreline from the municipal splash pad, restrooms, cabanas and fishing pier; the beach is not an open-Gulf surf destination.",
    "rules": "The city lists three playgrounds, a splash pad, volleyball, barbecue pits, drinking water and restrooms among its beach-area amenities. The separate Lighthouse Beach RV Park and rentable facilities may have their own reservations and charges, so an amenity listing is not evidence of a free campsite or permanently open splash pad.",
    "visitorDecision": "Choose Lighthouse Beach for bay-side family amenities and nearby birding; check current city splash-pad status before promising children an operational water-play feature. The city also promotes the Formosa Wetlands Walkway and bird tower for a non-swimming addition.",
    "sourceUrl": "https://www.portlavaca.gov/Facilities/Facility/Details/Lighthouse-Beach-Splash-Pad-1",
    "extraUrl": "https://www.portlavaca.gov/266/Visitors"
  },
  "mustang-island-state-park": {
    "headline": "Mustang Island State Park has separately managed primitive beach camping and electric campsites behind dunes",
    "arrival": "TPWD places Mustang Island State Park at 9394 State Highway 361 between Port Aransas and North Padre Island. More than five miles of park coastline provide beach access, while the water-and-electric campground sits behind dunes some distance from the surf.",
    "rules": "The park lists 48 electric sites and 50 drive-up primitive beach sites; these are different inventory types with different fees and amenities. Swimming is at visitors' own risk without lifeguards. TPWD posted an October 4, 2026 notice closing beach camping because of extremely high tides; this warning should not be rewritten as a closure of the entire park or all daytime beach access.",
    "visitorDecision": "Choose Mustang Island State Park for state-park coastal habitat, unbuilt beachfront and permitted beach camping only when the campground is confirmed open. Check park alerts, day-use capacity and primitive-site status, not merely a generic Corpus Christi beach permit.",
    "sourceUrl": "https://tpwd.texas.gov/state-parks/mustang-island/alert",
    "extraUrl": "https://tpwd.texas.gov/state-parks/mustang-island/fees-facilities/campsites"
  },
  "matagorda-bay-nature-park": {
    "headline": "LCRA's Matagorda Bay Nature Park is an operated river-mouth beach and wetland destination",
    "arrival": "LCRA operates Matagorda Bay Nature Park at 6420 FM 2031 in Matagorda, beside the Colorado River's mouth at the Gulf. Beachcombing, fishing, marsh birding and kayaking share the broader developed park; its boat ramp is not a substitute swimming area.",
    "rules": "LCRA currently publishes a general $5 adult day entrance, with children's and passholder categories, plus separate bungalows, RV sites and kayak rental rates. It identifies swimming areas, restrooms and showers. The operator warns that nearby beach restoration is underway and may cause occasional disturbance through early 2027, and that Matagorda County has a burn ban.",
    "visitorDecision": "Choose the LCRA park for a managed coastal day or booked overnight stay, not necessarily the same experience as driving onto nearby Matagorda public beach. Confirm restoration work, swimming-area designation, burn restrictions and reservations directly with LCRA.",
    "sourceUrl": "https://lcraparks.com/parks/matagorda-bay-nature-park",
    "extraUrl": "https://www.lcra.org/contact-us/frequently-asked-questions/"
  }
};
