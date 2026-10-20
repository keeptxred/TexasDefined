import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

// Verified 2026 editions. Never recycle past dates, tickets or hotel packages
// as if they were announced for 2027.
const records: MajorEventAuthorityRecord[] = [
  {
    slug: "rose-city-airfest",
    name: "Rose City Airfest",
    city: "Tyler", countySlug: "smith", countyName: "Smith County", region: "piney-woods", category: "culture",
    startDate: "2026-10-09", endDate: "2026-10-11",
    venue: "Tyler Pounds Regional Airport",
    officialUrl: "https://www.rosecityairfest.com/",
    sourceCheckedAt: "2026-10-17",
    dateNote: "The official 2026 show was October 9–11; public flying-day tickets covered Saturday October 10 or Sunday October 11. The next edition's dates have not been verified by the organizer.",
    whyItMatters: "Rose City Airfest is Tyler's major military and heritage aviation experience, with flying demonstrations, static aircraft, a community fundraiser and a dedicated Friday evening Hangar Party. It supports CampV and East Texas military veterans. The most recent confirmed show ran October 9–11, 2026; details below are about that edition and must not be recycled into an unannounced future schedule.",
    quickFacts: [
      { label: "Last verified dates", value: "October 9–11, 2026 (completed)" },
      { label: "Airfield", value: "Tyler Pounds Regional Airport" },
      { label: "2026 general parking", value: "Offsite at 13974 Highway 64 West with included shuttle" },
      { label: "2026 public flying days", value: "Saturday October 10 and Sunday October 11" },
      { label: "Next organizer dates", value: "Not yet confirmed" },
    ],
    planningSections: [
      { title: "Understand the two different ticket experiences", body: "The 2026 organizer separated the Friday Hangar Party from the weekend public air show. Friday's dinner and performer meet-and-greet required a separate ticket, while Saturday and Sunday each had date-specific public general-admission tickets. A general ticket did not automatically admit a visitor to the Hangar Party. No ticket from 2026 should be promoted for the next edition." },
      { title: "General parking is away from the airport", body: "The official 2026 visitor map located general public parking at 13974 Highway 64 West, Tyler, across from Lifepoint Church, with free shuttles from each parking lot. Accessible parking was on the airport grounds by the Historic Aviation Memorial Museum, approached from Airport Drive, with accessible shuttle service. A future year's traffic pattern must be verified again." },
      { title: "Watch the correct day and refund rules", body: "The 2026 organizers specified that Saturday or Sunday admission was valid only for the selected day. Advance prices rose as ticket inventory changed; day-of gate prices were separate. They described the fundraiser as rain-or-shine with final, generally nonrefundable ticket sales. Always check current-year prices, availability, age categories and cancellation coverage directly with the show." },
      { title: "Prepare for limited shade and accessible seating", body: "General admission included festival grounds and static displays, plus open-air viewing where personal lawn chairs or blankets were welcome. Shaded cover was limited. The FAQ allowed mobility devices and strollers but prohibited coolers and pets other than service animals. Complimentary water was offered during the 2026 show; check what is provided next time." },
      { title: "Go beyond the flightline in Tyler", body: "The Historic Aviation Memorial Museum and Tyler's East Texas gardens, museums and dining give visiting families another reason to spend a night. Choose lodging and travel dates based on a future confirmed show schedule, not on an expired 2026 package or implied immediate proximity to an airport gate." },
    ],
    relatedLinks: [
      { href: "/events/air-shows", label: "Texas air shows", description: "Compare other Texas aviation weekends and show-year status." },
      { href: "/county/smith", label: "Explore Smith County", description: "Plan Tyler museums and nearby destinations." },
      { href: "/event/corsicana-airsho", label: "Corsicana Airsho", description: "Compare a heritage-aircraft-focused North Texas event." },
    ],
    sources: [
      { label: "Rose City Airfest official 2026 dates and roster", url: "https://www.rosecityairfest.com/" },
      { label: "Official 2026 tickets, seating and refund terms", url: "https://www.rosecityairfest.com/tickets/airshow" },
      { label: "Official 2026 parking and shuttle map", url: "https://www.rosecityairfest.com/info/map/" },
      { label: "Official 2026 accessible travel and prohibited items", url: "https://www.rosecityairfest.com/info/faq/" },
    ],
  },
  {
    slug: "corsicana-airsho",
    name: "Corsicana Airsho",
    city: "Corsicana", countySlug: "navarro", countyName: "Navarro County", region: "prairies-lakes", category: "culture",
    startDate: "2026-10-17",
    venue: "David Campbell Field, Corsicana Municipal Airport",
    officialUrl: "https://coyotesquadron.org/airsho",
    sourceCheckedAt: "2026-10-17",
    dateNote: "The Commemorative Air Force Coyote Squadron's published 2026 date is October 17. Confirm same-day status with the organizer; no later edition is announced in the cited source.",
    whyItMatters: "The Corsicana Airsho brings historical trainers, warbirds and visiting performers to an airport that operated as an Army Air Corps training field in World War II. The Commemorative Air Force Coyote Squadron preserves that local aviation legacy with its Fairchild PT-19 and Beechcraft T-34. The verified show date is October 17, 2026; this is not evidence of a confirmed date next year.",
    quickFacts: [
      { label: "2026 date", value: "Saturday, October 17" },
      { label: "2026 admission timing", value: "Gates opened 9 a.m.; flying scheduled noon" },
      { label: "Airport", value: "Corsicana Municipal Airport, 9000 Navarro Road" },
      { label: "2026 restrictions", value: "No outside coolers, tents or pets" },
      { label: "Next show", value: "No later date verified" },
    ],
    planningSections: [
      { title: "Check the show's actual date and status", body: "The CAF national event listing identifies Saturday October 17, 2026 at Corsicana Municipal Airport. Gates were scheduled at 9 a.m., with the show beginning at noon. Weather and flight operations affect the program, and the host controls last-minute notices. Before a future trip, verify a new event announcement rather than projecting an annual weekend." },
      { title: "Where to go and what to bring", body: "The Coyote Squadron's listing gives 9000 Navarro Road, Hangar 11D, at David Campbell Field. It invites visitors to bring lawn chairs and says onsite vendors will sell food and drinks. Its 2026 rules prohibit outside coolers, tents and pets. Check accessible parking, shade and any updated screening rules directly with the squadron." },
      { title: "What to expect from the aircraft", body: "The Coyote Squadron preserves the history of Corsicana's World War II aviation training through its PT-19 Cornell, which reflects primary pilot training, and T-34 Mentor. Appearances of particular demonstration aircraft, pyrotechnic displays or visiting warbirds should be verified from the current official roster and never promised merely because they appeared in older years." },
      { title: "Do not rely on historical price examples", body: "Older Corsicana Airsho entries listed carload or per-person charges, but the official current-year event listing used here does not establish a 2026 admission price. Do not display an old $20-per-car offer as a live price, and avoid a Ticketmaster checkout unless a current exact listing has been independently verified." },
      { title: "Make a Navarro County outing", body: "Visitors can combine the flying day with Corsicana's downtown architecture and aviation-history connections. Families driving from Dallas or Waco should allow extra time for small-airport access and the end-of-show departure rather than assuming quick entry from highway mileage alone." },
    ],
    relatedLinks: [
      { href: "/events/air-shows", label: "Texas air shows", description: "Browse source-checked aviation events." },
      { href: "/county/navarro", label: "Navarro County guide", description: "Explore Corsicana's history and local stops." },
      { href: "/event/rose-city-airfest", label: "Rose City Airfest", description: "Compare a larger East Texas air show." },
    ],
    sources: [
      { label: "CAF national 2026 Corsicana Airsho announcement", url: "https://commemorativeairforce.org/events/865" },
      { label: "CAF Coyote Squadron aircraft, airport and history", url: "https://commemorativeairforce.org/units/26" },
      { label: "Coyote Squadron event hub", url: "https://coyotesquadron.org/airsho" },
    ],
  },
  {
    slug: "addison-kaboom-town-airshow",
    name: "Addison Kaboom Town Airport Air Show",
    city: "Addison", countySlug: "dallas", countyName: "Dallas County", region: "prairies-lakes", category: "culture",
    startDate: "2026-07-03",
    venue: "Addison Airport flyover, viewing throughout Addison and Addison Circle Park",
    officialUrl: "https://visitaddison.com/kaboom-town/",
    sourceCheckedAt: "2026-10-17",
    dateNote: "The town's latest fully documented air-show component was Friday July 3, 2026, with flying around 7:30 p.m. and fireworks at 9:30 p.m. Official 2027 ticket, show and hotel-package terms have not been confirmed.",
    whyItMatters: "Addison's Kaboom Town is a townwide Independence Day event that pairs an airport air show with fireworks, live entertainment and hotel/restaurant watch parties. The aircraft fly from Addison Airport while the ticketed festival uses Addison Circle Park. Unlike an air show with a single required viewing enclosure, many viewers watch from hotel rooftops, patios and other locations, making accommodation choice an unusually important planning decision.",
    quickFacts: [
      { label: "Most recent official air show", value: "Friday, July 3, 2026 (completed)" },
      { label: "2026 air show", value: "Approximately 7:30 p.m." },
      { label: "2026 fireworks", value: "Approximately 9:30 p.m." },
      { label: "Festival ticket gate", value: "Addison Circle Park, 4970 Addison Circle" },
      { label: "2027 date and admission", value: "Not yet confirmed by the Town of Addison" },
    ],
    planningSections: [
      { title: "Choose where to watch before you buy", body: "The 2026 town guide sold admission to Addison Circle Park, not exclusive rights to watch planes from around town. The air show could also be viewed from hotels, restaurants and official watch parties along Belt Line Road and the Dallas North Tollway. Some viewing venues required their own cover charges or reservations, and others were free. Verify current offers individually." },
      { title: "Understand the timing of the two sky shows", body: "The town's 2026 activities page published the Addison Airport air show at about 7:30 p.m. and fireworks at about 9:30 p.m. Aircraft take off from Addison Airport and the fireworks launch from the south end of its runway. Timing and visibility are weather-dependent, and neither time should be recycled into an unannounced 2027 program." },
      { title: "Hotel packages are organizer offers, not our affiliate inventory", body: "The town's 2026 official packages advertised special hotel rates, six general-admission tickets and a commemorative blanket, with many participating hotels reporting sold out. These packages were organizer-controlled, not Texas Defined affiliate deals. For a future edition, compare official packages with independently available refundable rooms and present affiliate hotel links separately with clear disclosure." },
      { title: "Do not conflate park admission with free citywide viewing", body: "In 2026 the town required tickets for entering Addison Circle Park. It charged separate age-category admission, and park tickets were nonrefundable. Spectators could still watch many aerial effects outside the park from permitted public places and participating businesses, but particular watch parties might charge for entry or parking. Verify venue access rules rather than implying every location is free." },
      { title: "Plan around major traffic and ADA access", body: "The 2026 town map listed staged road closures, significant end-of-show delays, DART Silver Line transportation, accessible parking and accommodations procedures for Addison Circle Park. The park's uneven terrain could challenge wheelchairs and strollers. The next event may have different street closures, parking and transit services, so always open the organizer's current transportation map." },
      { title: "Extend the trip in North Dallas", body: "The air show can anchor a North Dallas hotel weekend with restaurants and activities across Addison, Dallas and nearby communities. Prioritize a lodging location with a real viewing opportunity and a workable route before paying a premium; the town's official hotel or watch-party description should determine whether a room has a direct view." },
    ],
    relatedLinks: [
      { href: "/events/air-shows", label: "Texas air shows", description: "Compare aircraft festivals and aviation exhibitions." },
      { href: "/county/dallas", label: "Dallas County", description: "Plan North Dallas travel and other attractions." },
      { href: "/event/rose-city-airfest", label: "Rose City Airfest", description: "Compare an airshow with airport-based admission." },
    ],
    sources: [
      { label: "Visit Addison official Kaboom Town event", url: "https://visitaddison.com/kaboom-town/" },
      { label: "Town's admission, viewing, transportation and accessibility FAQ", url: "https://visitaddison.com/kaboom-town/event-info/" },
      { label: "2026 air-show and fireworks timing", url: "https://visitaddison.com/kaboom-town/activities/" },
      { label: "Organizer hotel package list and availability", url: "https://visitaddison.com/kaboom-town/addison-kaboom-town-hotel-packages/" },
    ],
  },
  {
    slug: "laredo-stars-stripes-airshow",
    name: "WBCA Stars & Stripes Air Show Spectacular",
    city: "Laredo", countySlug: "webb", countyName: "Webb County", region: "south-texas", category: "culture",
    startDate: "2026-02-15",
    venue: "Laredo International Airport",
    officialUrl: "https://wbcalaredo.org/",
    sourceCheckedAt: "2026-10-17",
    dateNote: "The Washington's Birthday Celebration Association's official 2026 vendor program confirms February 15, 2026 at Laredo International Airport. Next-year dates, hours and prices have not been established from an organizer announcement.",
    whyItMatters: "The WBCA Stars & Stripes Air Show Spectacular is an aviation highlight of Laredo's long-running Washington's Birthday Celebration, a community festival built around borderland culture, parades and public events. The organizer's 2026 program documents a February 15 air show at Laredo International Airport; the guide retains that historical fact without treating next February's event as scheduled.",
    quickFacts: [
      { label: "2026 date", value: "February 15 (completed)" },
      { label: "Airfield", value: "Laredo International Airport" },
      { label: "Organizer", value: "Washington's Birthday Celebration Association" },
      { label: "Historical airport entrance", value: "Maher-area airport entry; verify new access directions" },
      { label: "Next-year program", value: "Not confirmed" },
    ],
    planningSections: [
      { title: "Separate confirmed year from familiar festival patterns", body: "The Washington's Birthday Celebration Association's 2026 vendor materials place the air show on February 15 at Laredo International Airport. The event is part of a broader, multi-week civic celebration. Future show dates should come from the association's new published calendar, not from repeating the same February weekend." },
      { title: "Expect aviation in a busy festival month", body: "Laredo's Washington's Birthday Celebration includes parades, family attractions and other gatherings alongside the air show. Organizers may sell individual admissions rather than a single festival-wide pass. Visitors should decide whether they want just aircraft viewing or several WBCA events before choosing tickets and accommodation." },
      { title: "Entry, admission and performer lists can change", body: "Past editions used Laredo International Airport with specific gate and entrance instructions. Previously published performer and admission prices are not proof of current-year availability. Consult the WBCA's official event page for entry address, opening time, weather policy, accessibility, ID rules, prohibited items and any discounts before buying or traveling." },
      { title: "Do not recycle old demonstration-team promises", body: "The air show has featured military aircraft and aerobatic demonstrations in past years, but flight teams operate on their own schedules and can change appearances. Confirm any future Blue Angels, Thunderbirds or other team claims with that year's official roster and the performer team's own schedule." },
      { title: "Build a Webb County visit around the celebration", body: "Visitors coming from San Antonio, the Rio Grande Valley or elsewhere may want to combine the show with Laredo museums, historic districts and WBCA parade events. Check lodging availability and road restrictions at the actual festival date; links to general hotels do not mean an organizer-approved show package." },
    ],
    relatedLinks: [
      { href: "/events/air-shows", label: "Texas air shows", description: "Find verified current dates for other aviation events." },
      { href: "/county/webb", label: "Webb County", description: "Explore Laredo's heritage and visitor options." },
      { href: "/event/amigo-airsho", label: "Amigo Airsho", description: "Compare a different West Texas border-region aviation show." },
    ],
    sources: [
      { label: "WBCA organizer portal", url: "https://wbcalaredo.org/" },
      { label: "WBCA official 2026 vendor/event program naming February 15 airshow", url: "https://wbcalaredo.org/wp-content/uploads/2025/10/2025_2026-Vendor-Application-2.pdf" },
      { label: "WBCA official 2026 festival program and Stars & Stripes feature", url: "https://wbcalaredo.org/wp-content/uploads/2026/02/By-George-2026_Final.pdf" },
    ],
  },
];

const bySlug = new Map(records.map(event => [event.slug, event]));
export function getExpandedMajorEventAuthorityTranche50Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
