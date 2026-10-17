import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

// Each date is specific to a source-verified occurrence; never automatically roll
// 2026 details into the next season or sell tickets after the stated date.
const records: MajorEventAuthorityRecord[] = [
  {
    slug: "ranger-old-school-fly-in-airshow", name: "Ranger Old School Fly-In & Airshow",
    city: "Ranger", countySlug: "eastland", countyName: "Eastland County", region: "prairies-lakes", category: "culture",
    startDate: "2027-10-01", endDate: "2027-10-03", venue: "Ranger Airfield (F23)",
    officialUrl: "https://www.rangerairfield.org/airshow", sourceCheckedAt: "2026-10-17",
    whyItMatters: "Ranger's Old School Fly-In & Airshow is an unusually personal Texas aviation heritage weekend at a historic airfield that has welcomed aviators since 1911. Organized by the volunteer Ranger Airfield Foundation, the 2027 show is confirmed for October 1–3. Fly-in pilots and drive-in spectators face different admission and access rules, and the airfield's preservation mission is part of the experience.",
    quickFacts: [
      { label: "Official dates", value: "October 1–3, 2027" },
      { label: "Airfield", value: "Ranger Airfield (F23), Eastland County" },
      { label: "Fly-in pilots/passengers", value: "No attendance fee listed for 2027" },
      { label: "Saturday drive-in guests", value: "Adults $15; ages 17 and under free, per 2027 organizer" },
      { label: "Scheduled aerial displays", value: "Friday 6:30 p.m.; Saturday 1 p.m., subject to change" },
    ],
    planningSections: [
      { title: "Choose drive-in or fly-in admission", body: "The foundation's current 2027 page explicitly distinguishes arriving pilots and passengers, who have no attendance fee, from Saturday drive-in guests, whose posted admission is $15 for adults while minors age 17 and younger are free. This is a historic operating airfield, not a large public airport stadium; verify instructions for your vehicle or aircraft instead of assuming every visitor uses the same gate." },
      { title: "Understand runway closures and aerial windows", body: "The organizer currently schedules a 30-minute Friday evening demonstration at 6:30 p.m., closing the airfield from 6:15 to 7 p.m. Saturday's shorter airshow is posted for 1 p.m., with runway closure from 12:50 to 2 p.m. These periods matter especially to fly-in pilots. Recheck NOTAMs, weather, flight rules and foundation updates immediately before travel." },
      { title: "Do not confuse volunteer and visitor camping", body: "The organizer says airfield RV space is limited to event volunteers. Pilots/passengers have their own meals and gathering arrangements, including Saturday catered barbecue sold separately and requiring an RSVP/payment by the organizer's deadline. Day visitors should not assume an overnight camping entitlement or a seat at the pilots-only dinner." },
      { title: "Experience Ranger's living aviation history", body: "The 1928 hangar, volunteer preservation work, classic aircraft and informal conversations with aircraft owners distinguish this gathering from a jet-team show. Aircraft and biplane rides depend on operator availability, weather and maintenance. Treat any proposed flying activity as separate from admission and confirm age, weight and safety restrictions with the operator." },
      { title: "Plan an Eastland County stop", body: "Ranger's location makes it practical to combine the fly-in with area historic sites and small-town dining. Choose lodging in Ranger or nearby communities based on actual availability and approach routes, not an unsupported claim that the airfield offers full onsite RV or hotel accommodations." },
    ],
    relatedLinks: [
      { href: "/events/air-shows", label: "Texas air shows", description: "Compare other source-confirmed Texas aviation experiences." },
      { href: "/county/eastland", label: "Eastland County", description: "Explore Ranger and surrounding communities." },
      { href: "/event/fall-festival-of-flight-gainesville", label: "Fall Festival of Flight", description: "Compare a different historic-airplane fly-in." },
    ],
    sources: [
      { label: "Ranger Airfield Foundation 2027 weekend and 2027 admission", url: "https://www.rangerairfield.org/airshow" },
      { label: "Ranger Airfield Foundation history and mission", url: "https://www.rangerairfield.org/" },
      { label: "City of Ranger airfield visitor resource", url: "https://www.rangertx.gov/airfield.html" },
    ],
  },
  {
    slug: "fall-festival-of-flight-gainesville", name: "Fall Festival of Flight — Gainesville",
    city: "Gainesville", countySlug: "cooke", countyName: "Cooke County", region: "prairies-lakes", category: "culture",
    startDate: "2027-09-18", venue: "Gainesville Municipal Airport, 2420 Airport Drive",
    officialUrl: "https://texasantiqueairplane.com/flyin.html", sourceCheckedAt: "2026-10-17",
    whyItMatters: "The Texas Antique Airplane Association's Fall Festival of Flight puts antique, classic, warbird, replica and homebuilt aircraft at the center of a friendly regional fly-in in Gainesville. The chapter has explicitly announced its 65th fly-in for September 18, 2027. Visitors should expect aircraft displays, pilot conversations, judging and historic aviation rather than assume a military jet demonstration lineup.",
    quickFacts: [
      { label: "Confirmed next event", value: "September 18, 2027" },
      { label: "Host", value: "Texas Chapter, Antique Airplane Association" },
      { label: "Location", value: "Gainesville Municipal Airport" },
      { label: "Focus", value: "Antiques, classics, warbirds, replicas and homebuilts" },
      { label: "2027 hours and admission", value: "Full current-year schedule and fees not yet confirmed" },
    ],
    planningSections: [
      { title: "2027 date is confirmed, but details are still developing", body: "The chapter's official 65th Fly-In announcement states September 18, 2027. Its detailed public operating schedule available in the city calendar still describes September 18–19, 2026, with separate setup, pancake breakfast and aircraft-judging times. Do not copy those 2026 hours, meal arrangements or admissions into a 2027 ticket offer until the chapter updates them." },
      { title: "Come for the airplanes and the people", body: "This fly-in welcomes antique and classic planes, warbirds, replicas and homebuilts. The event historically includes static displays, judging, fly-bys, vendors, a fly-mart, educational conversations and aircraft owners explaining restoration projects. Specific arriving aircraft and pilots are weather- and maintenance-dependent." },
      { title: "Pilots and drivers need different instructions", body: "Fly-in pilots should consult the current aeronautical information, airport procedures, NOTAMs and event aircraft parking instructions; a planned group fly-by can change operations. Drivers should confirm the public entrance at Gainesville Municipal Airport, 2420 Airport Drive, and avoid interpreting last year's setup times as the public opening hour." },
      { title: "Make the visit safe for children", body: "Expect active aircraft, propellers and moving vehicles on the flightline. Follow barricades and volunteer marshals, maintain distance from taxiing aircraft and use appropriate hearing protection. Vendor, food, accessible parking and weather arrangements should be verified from the organizer's new details." },
      { title: "Stay for North Texas heritage", body: "Gainesville's downtown, Cooke County museums and nearby North Texas stops can support a weekend around the fly-in. Don't book a nonrefundable overnight stay solely because the 2026 event occupied both Friday and Saturday; 2027 is currently confirmed for September 18 specifically." },
    ],
    relatedLinks: [
      { href: "/events/air-shows", label: "Texas air shows", description: "Compare Texas aviation and heritage events." },
      { href: "/county/cooke", label: "Explore Cooke County", description: "Find Gainesville history and visitor stops." },
      { href: "/event/ranger-old-school-fly-in-airshow", label: "Ranger fly-in", description: "Compare two 2027 small-airfield gatherings." },
    ],
    sources: [
      { label: "Texas Antique Airplane Association's announced 2027 fly-in date", url: "https://texasantiqueairplane.com/flyin.html" },
      { label: "City of Gainesville 2026 operating schedule (historical only)", url: "https://gainesville.tx.us/Calendar.aspx?EID=3168&calType=0&day=1&month=9&year=2026" },
      { label: "Texas Antique Airplane Association chapter", url: "https://www.texasantiqueairplane.com/index.html" },
    ],
  },
  {
    slug: "fiesta-of-flight-laughlin", name: "Fiesta of Flight — Laughlin Air Force Base",
    city: "Del Rio", countySlug: "val-verde", countyName: "Val Verde County", region: "big-bend", category: "culture",
    startDate: "2026-03-28", venue: "Laughlin Air Force Base",
    officialUrl: "https://www.laughlin.af.mil/Fiesta-of-Flight-2026/", sourceCheckedAt: "2026-10-17",
    whyItMatters: "Laughlin Air Force Base's Fiesta of Flight blends active-duty flight training with aerobatic displays, military heritage aircraft and STEM experiences for the Del Rio community. The official March 28, 2026 airshow included planned F-35 demonstration flying, Academy parachutists and training aircraft. Those performances were part of a completed event, not an advertised future lineup.",
    quickFacts: [
      { label: "Confirmed last show", value: "March 28, 2026 (completed)" },
      { label: "Airfield", value: "Laughlin Air Force Base, Del Rio" },
      { label: "2026 highlights", value: "F-35A Demo Team, Wings of Blue, T-6/T-38, STEM Expo" },
      { label: "Access", value: "Military-base entry, parking and screening require current organizer guidance" },
      { label: "Next occurrence", value: "Not confirmed by the Air Force" },
    ],
    planningSections: [
      { title: "Verify the next show rather than assuming annual dates", body: "The 47th Flying Training Wing's February 11, 2026 announcement formally set the event for Saturday, March 28, 2026. It listed flying and ground performers subject to change. Consult Laughlin's official public affairs releases before assuming a 2027 event, a particular squadron appearance, general admission policy or a ticket checkout." },
      { title: "Military-base travel is different from a civilian festival", body: "An open house occurs on an active Air Force installation. Guests may face gate screening, parking assignments, shuttle transfers and restricted items. Prior event instructions are historical; the current official parking and entry map controls any subsequent event. Do not direct visitors to a specific base gate using old guidance." },
      { title: "The STEM element is an attraction in its own right", body: "In 2026 the event paired aircraft demonstrations with a STEM Expo, historic and modern static aircraft, family activities and food vendors. The Air Force used the open house to explain its training mission at Laughlin and connect children with aviation and engineering. Check which experiences are accessible to civilians and which need registration when a new program is announced." },
      { title: "Avoid unverified admission and aircraft promises", body: "In the last announced program, the F-35 demonstration team, T-6 and T-38 operations and historic aircraft were all named, but performance availability can change for aircraft maintenance and weather. A generic Ticketmaster resale page is not a valid proof of admission to a military installation; link the organizer directly." },
      { title: "Make it a Del Rio trip", body: "The San Felipe Springs area, local heritage, and Amistad National Recreation Area offer reasons to explore Val Verde County beyond the base. Choose overnight lodging based on the officially announced event date and confirmed access route, not on assumed normal-base visitor entry." },
    ],
    relatedLinks: [
      { href: "/events/air-shows", label: "Texas air shows", description: "Explore verified Texas aviation events." },
      { href: "/county/val-verde", label: "Explore Val Verde County", description: "Plan Del Rio and Amistad attractions." },
      { href: "/event/great-texas-airshow", label: "Great Texas Airshow", description: "Compare a San Antonio-area Air Force event." },
    ],
    sources: [
      { label: "Laughlin AFB official 2026 Fiesta of Flight dates and roster", url: "https://www.laughlin.af.mil/News/News/Display/Article/4404606/laughlin-afb-releases-initial-performer-list-for-2026-fiesta-of-flight/" },
      { label: "Laughlin official Fiesta of Flight event portal", url: "https://www.laughlin.af.mil/Fiesta-of-Flight-2026/" },
    ],
  },
  {
    slug: "thunder-over-east-texas-athens", name: "Thunder Over East Texas Air Show",
    city: "Athens", countySlug: "henderson", countyName: "Henderson County", region: "piney-woods", category: "culture",
    startDate: "2026-07-03", venue: "Athens Municipal Airport",
    officialUrl: "https://athenstx.gov/Calendar.aspx?EID=1370", sourceCheckedAt: "2026-10-17",
    whyItMatters: "Thunder Over East Texas Air Show is an Athens-based military and civilian flying exhibition that supports veterans organizations through the Cedar Creek Veterans Foundation. The City of Athens documented July 3, 2026 as the third annual edition at Athens Municipal Airport, with an afternoon of aircraft displays and evening flights. A new date is not yet verified on the cited city calendar.",
    quickFacts: [
      { label: "Last confirmed date", value: "July 3, 2026 (completed)" },
      { label: "Location", value: "Athens Municipal Airport" },
      { label: "2026 grounds", value: "Gates 3 p.m.; flying scheduled by 6 p.m." },
      { label: "2026 posted admission", value: "Adults $25, kids 4–12 $10, ages 3 and under free" },
      { label: "2026 parking", value: "$5 cash-only (historical; do not reuse)" },
    ],
    planningSections: [
      { title: "Check the year and official schedule", body: "Athens' government event calendar confirms a July 3, 2026 show organized by Cedar Creek Veterans Foundation, with gates at 3 p.m. and the flying display scheduled no later than 6 p.m. That particular event is over. Visitors must verify an organizer or city announcement before treating July 2027 as an active air-show booking." },
      { title: "Understand admission and optional shaded seating", body: "The 2026 city listing gave admission at $25 for adults, $10 for children ages 4–12, and free entry for children age 3 and under. Parking was $5 cash-only, while a $60 reserved seat included shade near concessions and restrooms. Those are precise historical prices, not a live offer. Confirm current admission and refund terms before travel." },
      { title: "Bring allowed comforts, not assumptions", body: "The 2026 host allowed lawn chairs, blankets, small umbrellas and coolers. Those conditions are not universal across Texas air shows: many prohibit outside food or large chairs. Recheck the current Athens event's entry rules and bring hearing protection suitable for loud aviation demonstrations." },
      { title: "Know who benefits from the event", body: "The show raises funds for East Texas veterans programs, making it both an aviation attraction and a charitable community event. Exact flying acts and static displays vary annually; no particular jet or warbird should be promised based solely on an old poster." },
      { title: "Explore Henderson County", body: "Combine the airfield with Athens local attractions or nearby Cedar Creek Lake where appropriate, while keeping the Athens airport exhibition separate from the independent Thunder Over Cedar Creek Lake event. Those shows have different organizers, places and potential dates." },
    ],
    relatedLinks: [
      { href: "/events/air-shows", label: "Texas air shows", description: "Other source-checked aviation events." },
      { href: "/county/henderson", label: "Henderson County", description: "Athens and Cedar Creek Lake visitor guides." },
    ],
    sources: [{ label: "City of Athens official 2026 event record and posted ticket terms", url: "https://athenstx.gov/Calendar.aspx?EID=1370" }],
  },
  {
    slug: "caf-high-sky-wing-airsho", name: "CAF High Sky Wing AIRSHO",
    city: "Midland", countySlug: "midland", countyName: "Midland County", region: "big-bend", category: "culture",
    startDate: "2026-09-12", endDate: "2026-09-13", venue: "Midland International Air & Space Port",
    officialUrl: "https://www.airsho.org/", sourceCheckedAt: "2026-10-17",
    whyItMatters: "The Commemorative Air Force High Sky Wing's AIRSHO is one of Texas' long-running warbird showcases. Its 35th-anniversary edition ran September 12–13, 2026 at Midland International Air & Space Port and combined aviation history with vintage military flying, ground displays, pyrotechnics and civilian aerobatics. A new AIRSHO date must be officially announced before being advertised.",
    quickFacts: [
      { label: "Most recent confirmed edition", value: "September 12–13, 2026 (completed)" },
      { label: "Field", value: "Midland International Air & Space Port" },
      { label: "Organizer", value: "Commemorative Air Force High Sky Wing" },
      { label: "2026 online price", value: "Ages 14+ $10, ages 6–13 $5, ages 5 and under free" },
      { label: "Next date", value: "Not yet verified" },
    ],
    planningSections: [
      { title: "Warbirds are the point of AIRSHO", body: "The High Sky Wing presents aircraft representing multiple decades of military flying history, often with civilian aerobatics and historical demonstrations. In 2026 a Vietnam-era theme included aircraft such as A-1 Skyraiders and an HU-16 Albatross. Aircraft maintenance caused other planned fighters to withdraw; an advertised roster never guarantees a particular airplane will fly." },
      { title: "Treat old ticket prices as archived facts", body: "The City of Midland's 2026 announcement listed online admission at $10 for ages 14 and older, $5 for ages 6–13 and free for children 5 and younger, with higher gate prices and additional paid chalet seating or VIP parking. These prices applied to September 2026. Verify next-year availability and purchases at the host's official website." },
      { title: "Prepare for a noisy airport day", body: "Historic aircraft, jet demonstrations and licensed pyrotechnic displays can be loud and physically intense. Check current policy for children's ear protection, sun exposure, chairs, bags, accessible parking and arrival timing before entering Midland's airport." },
      { title: "Keep organizer updates above marketing claims", body: "The CAF's post-show 2026 report documents which aircraft actually appeared and which cancelled because of maintenance. For future events, distinguish proposed performers from confirmed arrivals, don't assume old transport or fighter assets will return and avoid unsupported military sponsorship claims." },
      { title: "Explore Midland and Odessa", body: "Midland's aviation heritage and the broader Permian Basin can make this a multi-day trip, especially for visitors arriving from Houston or Dallas. Hotel affiliate choices should relate to realistic driving and departure routes rather than suggesting on-field accommodations." },
    ],
    relatedLinks: [
      { href: "/events/air-shows", label: "Texas air shows", description: "Compare verified aviation event years." },
      { href: "/county/midland", label: "Explore Midland County", description: "Find Permian Basin attractions and aviation stops." },
    ],
    sources: [
      { label: "City of Midland 2026 AIRSHO details and ticket categories", url: "https://www.midlandtexas.gov/Calendar.aspx?EID=3935&calType=0&day=29&month=9&year=2026" },
      { label: "CAF account of 35th anniversary AIRSHO 2026", url: "https://www.commemorativeairforce.org/news/airsho-celebrates-35-years" },
      { label: "CAF High Sky Wing AIRSHO organizer", url: "https://www.airsho.org/" },
    ],
  },
  {
    slug: "dallas-warbird-weekend", name: "Dallas Warbird Weekend",
    city: "Dallas", countySlug: "dallas", countyName: "Dallas County", region: "prairies-lakes", category: "culture",
    startDate: "2026-04-11", venue: "Henry B. Tippie National Aviation Education Center, Dallas Executive Airport",
    officialUrl: "https://flynaec.org/warbird-weekend/", sourceCheckedAt: "2026-10-17",
    whyItMatters: "Dallas Warbird Weekend offers close-up access to Commemorative Air Force historic military aircraft, interpretive programming, reenactors and occasional flight experiences at the National Aviation Education Center. The verified 2026 event took place on April 11. It's especially compelling for people interested in the B-29 FIFI, B-24 Diamond Lil and the people who keep rare aircraft flying, but next year's attendance and aircraft roster are not yet confirmed.",
    quickFacts: [
      { label: "2026 edition", value: "April 11 (completed)" },
      { label: "Venue", value: "5657 Mariner Drive, Dallas" },
      { label: "2026 featured aircraft", value: "B-29 FIFI, B-24 Diamond Lil, A-26, R4D and other heritage aircraft" },
      { label: "Rides", value: "Separate operator booking; aircraft and rides subject to change" },
      { label: "Next event", value: "Not yet confirmed" },
    ],
    planningSections: [
      { title: "It's an aviation-history exhibition, not a guaranteed jet show", body: "The CAF's official 2026 listing featured historic aircraft, vehicles, reenactors, food trucks and hands-on activities. The venue is the Henry B. Tippie National Aviation Education Center at Dallas Executive Airport. Interpretive access to aircraft on the ground can be a primary attraction, and a current-year program should control expectations about actual flight demonstrations." },
      { title: "Book rare aircraft rides with the actual flight operator", body: "For April 11, 2026 the AirPower History Tour offered B-29 and B-24 morning rides as well as PT-13 Stearman experiences. Its listed terms offered event admission for a confirmed rider plus one guest, but attendance and ride availability depended on maintenance and weather. These are historical facts, not available reservations for a future date." },
      { title: "Do not assume admission and aircraft tours are the same purchase", body: "The CAF warned that regular event admission might carry additional fees. A general visitor's entry does not guarantee a seat on a bomber flight, a cockpit tour at a certain hour or access during aircraft movement. Read the organizer's current ticket, age, flight waiver and accessibility requirements before choosing a package." },
      { title: "Make a day of the education center", body: "The center offers educational interpretation around military aviation history. Children can benefit from planned ground exhibits and reenactors even if weather limits flying. Keep clear of active flight operations, and consider hearing protection near engines and propellers." },
      { title: "Plan a Dallas aviation itinerary", body: "Pair the event with Dallas-area museums or other attractions instead of driving only for a single vintage aircraft. Choose hotel or rental-car dates around an official newly announced weekend; no 2027 schedule or special affiliate price is implied by the 2026 listing." },
    ],
    relatedLinks: [
      { href: "/events/air-shows", label: "Texas air shows", description: "Find source-backed Texas aviation gatherings." },
      { href: "/county/dallas", label: "Dallas County", description: "Plan museum and historical stops around the airport." },
      { href: "/event/wasp-homecoming-fly-in", label: "WASP Homecoming", description: "Explore another Texas aviation-history gathering." },
    ],
    sources: [
      { label: "CAF official 2026 Dallas Warbird Weekend", url: "https://commemorativeairforce.org/events/663" },
      { label: "CAF 2026 AirPower History Tour Dallas flights", url: "https://commemorativeairforce.org/events/662" },
      { label: "National Aviation Education Center official event page", url: "https://flynaec.org/warbird-weekend/" },
    ],
  },
];

const bySlug = new Map(records.map(event => [event.slug, event]));
export function getExpandedMajorEventAuthorityTranche51Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
