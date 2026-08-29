import { majorEventIndexRecords } from "./major-event-index";
import type { MajorEventAuthorityRecord, MajorEventPlanningSection, MajorEventRelatedLink, MajorEventSource } from "./major-event-authority.server";

interface ExpandedDetails {
  slug: string;
  whyItMatters: string;
  planningSections: MajorEventPlanningSection[];
  relatedLinks: MajorEventRelatedLink[];
  sources: MajorEventSource[];
}

const expandedDetails: ExpandedDetails[] = [
  {
    slug: "central-texas-state-fair",
    whyItMatters: "The Central Texas State Fair is one of the first major fall fair weekends on the calendar, combining carnival attractions, concerts, PBR events and family programming in Belton.",
    planningSections: [
      { title: "Choose the headline attraction first", body: "The fair mixes general-admission attractions with separately ticketed PBR and demolition-derby events, so decide which headline program matters before selecting the day." },
      { title: "Use the published fair hours", body: "Thursday and Friday begin in the evening while Saturday and Sunday start earlier. Match arrival time to the operating hours instead of assuming a full-day schedule every day." },
      { title: "Build around Belton", body: "If you are traveling into Bell County, leave enough time for meals and other local stops rather than treating the fairgrounds as the only destination." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-bell", label: "Explore Bell County", description: "Plan more of the Central Texas trip." }, { href: "/events", label: "Texas events calendar", description: "Compare other fall fairs and festivals." }],
    sources: [{ label: "Central Texas State Fair official events calendar", url: "https://www.centraltexasstatefair.com/events" }, { label: "Central Texas State Fair official ticket information", url: "https://www.centraltexasstatefair.com/p/tickets--deals" }],
  },
  {
    slug: "bandera-round-up-cattle-drive",
    whyItMatters: "Bandera's Round-Up centers a real Main Street longhorn cattle drive and parade inside a broader Cowboy Capital heritage weekend, making it a strong Hill Country cultural stop.",
    planningSections: [
      { title: "Be in place before the cattle drive", body: "The official parade is scheduled for 11 a.m. on September 5, so arrive early enough to park and reach Main Street before the procession begins." },
      { title: "Treat the parade as the anchor", body: "The cattle drive itself is compact. Use it as the fixed point for a longer Bandera visit with dining, museums, music or other western-heritage stops." },
      { title: "Check day-of access", body: "Main Street activity can affect traffic and parking. Recheck local event guidance before driving into the center of town." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-bandera", label: "Explore Bandera County", description: "Build a broader Cowboy Capital itinerary." }, { href: "/events", label: "Texas events calendar", description: "Compare other Texas heritage events." }],
    sources: [{ label: "Bandera County Chamber official event listing", url: "https://www.banderachamber.com/2026/09/05/501345/bandera-round-up-longhorn-cattle-drive-parade-2/" }],
  },
  {
    slug: "addison-oktoberfest",
    whyItMatters: "Addison Oktoberfest is a four-day North Texas festival with concentrated German food, music, games and ticketed experiences at Addison Circle Park.",
    planningSections: [
      { title: "Choose the day by hours and atmosphere", body: "Thursday and Friday are evening sessions, Saturday runs from noon to midnight, and Sunday is shorter. Pick the day that fits the kind of visit you want." },
      { title: "Plan parking before arrival", body: "The festival publishes current parking and hotel-package guidance. Review that information before heading to Addison Circle Park during the busiest periods." },
      { title: "Check ticketed add-ons", body: "General festival admission and reserved tables or special packages are not the same product, so confirm what your purchase includes." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-dallas", label: "Explore Dallas County", description: "Add more North Texas stops around the festival." }, { href: "/events", label: "Texas events calendar", description: "Compare other Oktoberfest and fall events." }],
    sources: [{ label: "Addison Oktoberfest official site", url: "https://www.addisonoktoberfest.com/" }, { label: "Addison Oktoberfest plan-your-visit guide", url: "https://www.addisonoktoberfest.com/plan-your-visit" }],
  },
  {
    slug: "fort-bend-county-fair-rodeo",
    whyItMatters: "The Fort Bend County Fair & Rodeo stretches across multiple days of fairgrounds activity, ranch and PRCA rodeo programming, concerts, livestock events and a separate BBQ weekend.",
    planningSections: [
      { title: "Separate BBQ weekend from fair week", body: "The organizer lists BBQ weekend on September 18-19, while the fair and rodeo schedule begins September 24 and runs through October 4. Plan around the portion you actually want to attend." },
      { title: "Choose rodeo nights deliberately", body: "PRCA rodeo performances run October 1-4, while other roping, ranch-rodeo and livestock events occur earlier in the fair. Use the official schedule for the exact competition." },
      { title: "Confirm gate and carnival hours", body: "Opening times change by day. Check the published hours and ticket details before committing to an arrival time." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-fort-bend", label: "Explore Fort Bend County", description: "Plan more stops around Rosenberg and Fort Bend County." }, { href: "/events", label: "Texas events calendar", description: "Compare other Texas fairs and rodeos." }],
    sources: [{ label: "Fort Bend County Fair official hours", url: "https://www.fortbendcountyfair.com/directions.aspx" }, { label: "Fort Bend County Fair official rodeo schedule", url: "https://www.fortbendcountyfair.com/events/rodeo" }, { label: "Fort Bend County Fair official tickets", url: "https://www.fortbendcountyfair.com/p/tickets--deals" }],
  },
  {
    slug: "mckinney-oktoberfest",
    whyItMatters: "McKinney Oktoberfest turns the historic downtown square into a three-day festival, making the event easy to combine with a broader walkable downtown visit.",
    planningSections: [
      { title: "Choose Friday, Saturday or Sunday", body: "The city's calendar lists different hours each day: Friday evening, a long Saturday, and a shorter Sunday. Match the visit to the schedule you want." },
      { title: "Treat downtown as part of the event", body: "Historic Downtown McKinney is both the venue and a destination. Allow time for walking, dining and local shops around festival activities." },
      { title: "Recheck city event guidance", body: "Use the city's current calendar and event information before departure for any changes to hours, street access or festival operations." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-collin", label: "Explore Collin County", description: "Build more of a North Texas weekend." }, { href: "/events", label: "Texas events calendar", description: "Compare other Oktoberfest events." }],
    sources: [{ label: "City of McKinney September 2026 events calendar", url: "https://www.mckinneytexas.org/calendar.aspx?CID=34%2C40%2C44%2C30&month=9&view=list&year=2026" }],
  },
  {
    slug: "fort-worth-oktoberfest",
    whyItMatters: "Fort Worth Oktoberfest is a compact three-day festival in Trinity Park with Bavarian food, beer, live music, competitions, a dachshund race and a 5K tied to a single walkable venue.",
    planningSections: [
      { title: "Pick one day or the full weekend", body: "The festival sells single-day and three-day admission. Choose the ticket structure before arranging the rest of the Fort Worth itinerary." },
      { title: "Plan for Trinity Park access", body: "Review current parking, transportation and entry information before arrival, especially for Friday and Saturday evening crowds." },
      { title: "Use the event schedule", body: "Entertainment, contests and special activities are distributed across the three days. Check the official program so the visit lines up with the activities you care about." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-tarrant", label: "Explore Tarrant County", description: "Add museums, dining and other Fort Worth stops." }, { href: "/events", label: "Texas events calendar", description: "Compare other North Texas fall events." }],
    sources: [{ label: "Fort Worth Oktoberfest official site", url: "https://fortworthoktoberfest.com/" }, { label: "Fort Worth Oktoberfest official tickets", url: "https://fortworthoktoberfest.com/tickets/" }],
  },
];

const detailBySlug = new Map(expandedDetails.map((detail) => [detail.slug, detail]));
const indexBySlug = new Map(majorEventIndexRecords.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche3Server(slug: string): MajorEventAuthorityRecord | null {
  const event = indexBySlug.get(slug);
  const detail = detailBySlug.get(slug);
  if (!event || !detail) return null;
  const { slug: _slug, ...authorityDetail } = detail;
  return { ...event, ...authorityDetail };
}
