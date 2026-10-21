import { majorEventIndexRecords, type MajorEventIndexRecord } from "./major-event-index";
import { verifiedTournamentBySlug } from "./tournaments/verified-profiles";
import { verifiedTournamentBatch3BySlug } from "./tournaments/verified-profiles-batch3";
import { verifiedTournamentBatch4BySlug } from "./tournaments/verified-profiles-batch4";
import { verifiedTournamentBatch5BySlug } from "./tournaments/verified-profiles-batch5";
import { verifiedTournamentBatch6BySlug } from "./tournaments/verified-profiles-batch6";
import { verifiedTournamentBatch7BySlug } from "./tournaments/verified-profiles-batch7";

export interface MajorEventSource { label: string; url: string; }
export interface MajorEventPlanningSection { title: string; body: string; }
export interface MajorEventRelatedLink { href: string; label: string; description: string; }
interface MajorEventAuthorityDetails {
  slug: string;
  whyItMatters: string;
  planningSections: MajorEventPlanningSection[];
  // Optional, individually sourced visitor essentials and search metadata.
  quickFacts?: Array<{ label: string; value: string }>;
  seoTitle?: string;
  seoDescription?: string;
  relatedLinks: MajorEventRelatedLink[];
  sources: MajorEventSource[];
}
export type MajorEventAuthorityRecord = MajorEventIndexRecord & Omit<MajorEventAuthorityDetails, "slug">;

// Server-only guide copy. The supplied inventory is a discovery seed; official
// organizer/host sources control verified dates stored in major-event-index.ts.
const majorEventAuthorityDetails: MajorEventAuthorityDetails[] = [
  {
    slug: "grapefest",
    whyItMatters: "The 41st GrapeFest is scheduled for September 16–19, 2027 in historic downtown Grapevine, turning the walkable Main Street district into a four-day celebration of Texas and international wine, live entertainment and food. Unlike a general winery tour, tasting sessions can require separately timed purchases in addition to festival admission.",
    quickFacts: [
      { label: "2027 dates", value: "September 16–19, 2027" },
      { label: "Venue", value: "Historic Main Street, Grapevine" },
      { label: "Thursday", value: "Organizer currently advertises free entry" },
      { label: "Saturday admission", value: "Organizer lists adult $12; reconfirm before purchase" },
    ],
    planningSections: [
      { title: "Understand the daily admission pattern", body: "The organizer currently posts complimentary admission Thursday, paid Friday entry after 5 p.m., and paid weekend admission. The 2027 web table contains a contradictory Sunday date that conflicts with its confirmed September 16–19 festival header, so check the final posted hours and any corrections before traveling." },
      { title: "Budget separately for tastings", body: "The People's Choice and other wine experiences are special festival sessions rather than unlimited tastings included with a general gate ticket. Check session start times, ID requirements, availability, designated-driver options and the organizer's current ticket rules." },
      { title: "Use walkable historic downtown as your base", body: "Historic Main Street is the festival footprint, which affects vehicle access and parking. Arrive with a current street map or published shuttle plan; if staying in Grapevine, choose a base that lets your group travel safely after evening tastings." },
      { title: "Plan for families and non-drinkers too", body: "GrapeFest also brings food, performers and downtown atmosphere. Wine tastings are age-restricted, but a family visit may focus on live entertainment or the Main Street environment. Confirm specific children's programming and festival accessibility details before setting your schedule." },
    ],
    relatedLinks: [
      { href: "/event/texas-rose-festival", label: "Texas Rose Festival", description: "Compare another major North and East Texas fall festival weekend." },
      { href: "/event/wurstfest", label: "Wurstfest", description: "Compare another destination-scale Texas fall festival." },{ href: "/events", label: "Texas events calendar", description: "Compare other fall events." }, { href: "/browse/counties#county-tarrant", label: "Explore Tarrant County", description: "Plan more of the North Texas trip." }],
    sources: [{ label: "GrapeFest official general information", url: "https://www.grapevinetexasusa.com/grapefest/general-information/" }],
  },
  {
    slug: "texas-renaissance-festival",
    whyItMatters: "This repeat-weekend destination can shape an entire fall trip, and the themed-weekend structure means the best weekend depends on the visitor.",
    quickFacts: [
      { label: "2026 season", value: "October 10–November 29, weekends plus Thanksgiving Friday" },
      { label: "Festival hours", value: "9 a.m.–8 p.m.; last entry 7 p.m., per 2026 organizer" },
      { label: "Venue", value: "21778 FM 1774, Todd Mission, Texas" },
      { label: "Camping", value: "Separate camping pass; festival admission is not included" },
      { label: "Planning choice", value: "Choose a themed weekend, not merely a date inside the season" },
    ],
    planningSections: [
      { title: "Drive to Todd Mission, not downtown Austin", body: "The Texas Renaissance Festival is held at 21778 FM 1774 in Todd Mission, northwest of Houston. Avoid online lists that incorrectly place it in Austin. Allow for rural approach traffic and follow the organizer's current parking directions rather than a generic city-center route." },
      { title: "Choose the weekend's theme", body: "The 2026 season is open Saturdays and Sundays October 10–November 29, plus Thanksgiving Friday. Each themed weekend has different entertainment, costumes and activities. The range in the calendar does not mean the gates open Monday through Thursday." },
      { title: "Know the entrance cutoff", body: "The 2026 organizer lists 9 a.m. to 8 p.m. festival hours with no entry after 7 p.m. That matters for visitors hoping to arrive after another Houston-area attraction. Confirm any holiday-specific variation and show times before departure." },
      { title: "Separate camping from admission", body: "The Fields of New Market campground has separately sold weekend passes, and an ordinary camping pass does not include admission to the festival. A bundled Stay and Play package is different. Check rules for vehicles, quiet hours and campsite services directly with the operator." },
      { title: "Plan for a long day on foot", body: "The village blends stages, shops, jousting, food and family activities across a large outdoor footprint. Comfortable shoes, water, shade, accessible route information and weather contingencies matter more than checking off every act. Buy admission through official channels and verify costume and prop rules in advance." },
    ],
    relatedLinks: [
      { href: "/event/grapefest", label: "GrapeFest", description: "Compare another major North Texas fall festival." },
      { href: "/event/wurstfest", label: "Wurstfest", description: "Compare another repeat-weekend fall destination." },{ href: "/events", label: "Texas events calendar", description: "See other major fall festivals." }],
    sources: [{ label: "Texas Renaissance Festival official site", url: "https://www.texrenfest.com/" }],
  },
  {
    slug: "texas-rose-festival",
    whyItMatters: "The festival turns Tyler's rose identity into a concentrated travel window that connects horticulture, civic tradition and an East Texas weekend.",
    planningSections: [
      { title: "Build around the program", body: "Use the official schedule to choose the ceremonies, parade activities and public events that matter to your trip." },
      { title: "Leave room for Tyler", body: "Reserve time outside the scheduled program for rose-related attractions and other Smith County stops." },
      { title: "Plan for October demand", body: "Confirm lodging, parking and event-access details early, then check the organizer again close to departure." },
    ],
    relatedLinks: [
      { href: "/event/grapefest", label: "GrapeFest", description: "Compare another major Texas fall festival." },
      { href: "/event/texas-renaissance-festival", label: "Texas Renaissance Festival", description: "Compare another destination-scale fall festival." },{ href: "/events", label: "Texas events calendar", description: "Compare other fall events." }, { href: "/browse/counties#county-smith", label: "Explore Smith County", description: "Plan more of the East Texas trip." }],
    sources: [{ label: "Texas Rose Festival official site", url: "https://www.texasrosefestival.org/" }],
  },
  {
    slug: "wurstfest",
    whyItMatters: "Wurstfest connects a current travel event to the deeper German-Texan story visible across Hill Country towns, dance halls, food traditions and historic communities.",
    quickFacts: [
      { label: "2026 dates", value: "November 6–15, 2026" },
      { label: "City", value: "New Braunfels, Comal County" },
      { label: "Focus", value: "German-Texan music, food and cultural traditions" },
      { label: "Admission", value: "Current-day tickets, discounts and hours vary by date" },
      { label: "Planning", value: "Weekdays and weekends have different crowd conditions" },
    ],
    planningSections: [
      { title: "Pick a day based on the experience", body: "Wurstfest's ten-day run is not a single uniform party: stage schedules, admission terms, food vendor offerings and dance-hall crowds vary between weekdays and weekends. Use the current year's day-by-day lineup before choosing a trip." },
      { title: "Understand what admission does and does not buy", body: "Entry to the festival and purchases from food or beverage vendors are separate considerations. Confirm current advance-admission, group and age policies from Wurstfest; do not rely on an old per-day price or a generic event resale ticket." },
      { title: "Plan for food, dance halls and music", body: "The core visitor experience combines German-influenced Texas dishes, polka and other live music, and indoor/outdoor gathering spaces. Families can enjoy music and heritage activities without trying to attend every evening entertainment block." },
      { title: "Explore New Braunfels beyond the grounds", body: "Historic downtown, the Comal River and German-Texan history sites are natural complements; check seasonal opening hours and the weather if combining the festival with outdoor recreation in November." },
      { title: "Know the arrival and accessibility tradeoffs", body: "The grounds and surrounding streets can be busy on weekends. Consult official parking, shuttle and accessibility information, especially if traveling with a stroller or mobility aid, rather than assuming curbside access close to the entry gate." },
    ],
    relatedLinks: [
      { href: "/event/texas-renaissance-festival", label: "Texas Renaissance Festival", description: "Compare another repeat-weekend Texas fall event." },
      { href: "/event/texas-rose-festival", label: "Texas Rose Festival", description: "Compare another heritage-focused fall festival." },{ href: "/german-czech-texas-towns", label: "German and Czech Texas towns", description: "Connect Wurstfest to the larger heritage story." }, { href: "/browse/counties#county-comal", label: "Explore Comal County", description: "Build a broader Hill Country itinerary." }, { href: "/events", label: "Texas events calendar", description: "Compare other major fall events." }],
    sources: [{ label: "Wurstfest official site", url: "https://wurstfest.com/" }],
  },
  {
    slug: "fort-worth-stock-show-rodeo",
    whyItMatters: "It supports several kinds of visits, from a single arena night to a full day built around the stock-show grounds and Fort Worth attractions.",
    quickFacts: [
      { label: "2027 show dates", value: "January 15–February 6, 2027" },
      { label: "Rodeo venue", value: "Dickies Arena, 1911 Montgomery Street" },
      { label: "Stock-show venue", value: "Will Rogers Memorial Center and associated grounds" },
      { label: "2027 grounds hours", value: "8 a.m.–10:30 p.m. daily, per official FAQ" },
      { label: "Rodeo admission", value: "Rodeo ticket includes same-day showgrounds admission" },
    ],
    planningSections: [
      { title: "Choose a particular kind of rodeo", body: "The 2027 Dickies Arena program ranges from Best of the West Ranch Rodeo and Best of Mexico Celebración to Cowboys of Color, Bulls Night Out, PRORODEO tournament events and championship finals. Choose the format first rather than assuming all arena evenings show the same rodeo competition." },
      { title: "Know what admission covers", body: "The organizer confirms a Dickies Arena rodeo ticket includes same-day admission to the Stock Show grounds. A grounds-only ticket is not a reserved seat for the arena. Other paid experiences and the carnival have their own admission or coupon rules." },
      { title: "Allow time for livestock and trade exhibits", body: "The 2027 grounds are scheduled to operate 8 a.m.–10:30 p.m. each day; show times and trade exhibits differ. Review the livestock and horse-show calendar to avoid arriving on the wrong day for a specific class, sale or judging event." },
      { title: "Navigate two connected but different venues", body: "Dickies Arena and Will Rogers Memorial Center are in the Fort Worth Cultural District. Your rodeo seat and a livestock-building destination can use different entrances and parking approaches. Consult the specific performance's parking and accessible entrance instructions." },
      { title: "Make it a Cultural District day", body: "The Stock Show is near Fort Worth's museums, gardens and local dining. Leave enough time to move between exhibitions and a fixed arena start, especially on busy weekends. The organizer's approved Ticketmaster ticketing channel, not a generic resale listing, controls the actual seats available." },
    ],
    relatedLinks: [
      { href: "/event/san-antonio-stock-show-rodeo", label: "San Antonio Stock Show & Rodeo", description: "Compare another major Texas stock show and rodeo." },{ href: "/browse/counties#county-tarrant", label: "Explore Tarrant County", description: "Plan more of the Fort Worth trip." }, { href: "/events", label: "Texas events calendar", description: "Compare other rodeos and winter events." }],
    sources: [{ label: "Fort Worth Stock Show & Rodeo official site", url: "https://www.fwssr.com/" }, { label: "FWSSR visitor FAQ", url: "https://www.fwssr.com/p/plan-a-visit/frequently-asked-questions" }],
  },
  {
    slug: "san-antonio-stock-show-rodeo",
    whyItMatters: "The event can be the centerpiece of a San Antonio weekend or one major night inside a broader city trip, linking event, county and destination planning.",
    quickFacts: [
      { label: "2027 season", value: "February 11–28, 2027" },
      { label: "Arena setting", value: "Frost Bank Center, San Antonio" },
      { label: "Grounds", value: "Freeman Coliseum and neighboring fairgrounds" },
      { label: "Admission", value: "Check separate concert/rodeo and fairgrounds entitlements" },
      { label: "Schedule", value: "Confirm the specific performance date and livestock show" },
    ],
    planningSections: [
      { title: "Start with the rodeo and concert you want", body: "The winter program includes different arena performances, entertainers and livestock activities across February. Choose your specific arena date first; do not assume a 2026 entertainer or admission promotion returns in 2027." },
      { title: "Distinguish arena seats from the grounds", body: "The Frost Bank Center is the rodeo arena while many exhibits, shops and attractions use the nearby Freeman Coliseum grounds. Ticket packages can differ; review exactly what the official checkout includes for an arena performance versus grounds admission." },
      { title: "Choose the right day for livestock exhibits", body: "Junior and open livestock classes, horse events and agricultural exhibits follow their own schedules. Families interested in a particular animal, school competition or educational showcase need the published daily program, not just the overall February 11–28 event window." },
      { title: "Plan parking and security around your venue", body: "Arena, coliseum and outdoor entry points can have different traffic patterns, accessibility paths, screening and bag rules. Check the organizers' current campus map and ride pickup zones rather than assuming downtown San Antonio parking guidance applies." },
      { title: "Extend the trip thoughtfully", body: "The stock show grounds sit northeast of central San Antonio; the Alamo, River Walk and missions are a separate city itinerary. Build in transport time and avoid pairing too many timed attractions with a fixed evening rodeo." },
    ],
    relatedLinks: [
      { href: "/event/fort-worth-stock-show-rodeo", label: "Fort Worth Stock Show & Rodeo", description: "Compare another major Texas stock show and rodeo." },{ href: "/browse/counties#county-bexar", label: "Explore Bexar County", description: "Build a larger San Antonio visit." }, { href: "/events", label: "Texas events calendar", description: "Compare major Texas rodeos." }],
    sources: [{ label: "San Antonio Stock Show & Rodeo official site", url: "https://www.sarodeo.com/" }, { label: "Visit San Antonio rodeo guide", url: "https://www.visitsanantonio.com/events/arts-culture-events/san-antonio-rodeo/" }],
  },
  {
    slug: "sxsw",
    whyItMatters: "SXSW changes the normal rhythm of central Austin, so visitors need to plan around credentials, distributed venues, transportation and unusually high demand.",
    quickFacts: [
      { label: "2027 conferences and festivals", value: "March 15–21, 2027" },
      { label: "SXSW EDU", value: "March 13–16, 2027 (a separate overlapping program)" },
      { label: "Innovation Conference", value: "March 15–20, 2027" },
      { label: "Film & TV and Music", value: "March 15–21, 2027" },
      { label: "Comedy Festival", value: "March 17–20, 2027" },
    ],
    planningSections: [
      { title: "Choose the right SXSW credential", body: "SXSW is several overlapping programs, not a single all-access concert ticket. Innovation, Film & TV, Music and Comedy have different admission levels and priority rules. Confirm which programming a badge, wristband or individual screening ticket actually admits before paying." },
      { title: "Separate SXSW EDU from SXSW week", body: "The official 2027 schedule puts SXSW EDU on March 13–16 and the Conferences & Festivals on March 15–21. The overlapping March 15–16 days are not evidence that every EDU attendee can enter all other programs without additional credentials." },
      { title: "Build an itinerary by venue and program", body: "Film screenings, panels, music showcases and comedy events use changing downtown Austin locations. Prioritize reservations or access queues where required and leave travel buffers. A downtown convention-center pin is not a reliable location for every performance." },
      { title: "Understand the different program dates", body: "The 2027 Innovation Conference runs March 15–20, the Film & TV and Music programs extend through March 21, and Comedy runs March 17–20. The SXSW-wide March 15–21 window does not guarantee every track is active every day." },
      { title: "Book around peak downtown demand", body: "If multiple programs matter, choose accommodation and transportation with venue clusters and late-night travel in mind. Check official hotel and transportation policies, disability access and age restrictions, and avoid affiliate ticket offers unless the partner is officially authorized." },
    ],
    relatedLinks: [
      { href: "/event/texas-sandfest", label: "Texas SandFest", description: "Compare another destination-scale Texas spring event." },{ href: "/browse/counties#county-travis", label: "Explore Travis County", description: "Connect SXSW with a broader Austin-area visit." }, { href: "/events", label: "Texas events calendar", description: "See other major cultural events." }],
    sources: [{ label: "SXSW official 2027 dates announcement", url: "https://sxsw.com/news/2026/south-by-southwest-2027-dates-announced/" }, { label: "SXSW official site", url: "https://sxsw.com/" }],
  },
  {
    slug: "texas-sandfest",
    whyItMatters: "SandFest is a strong travel event because the venue is also the destination, combining festival access, beach conditions, lodging and island transportation.",
    planningSections: [
      { title: "Plan the island stay first", body: "Decide whether to stay on the island or drive in before choosing arrival time; the festival adds traffic and pedestrian demand." },
      { title: "Check prohibited items", body: "The organizer publishes current guidance on pets, coolers, shade structures, wagons and other items, so check the list while packing." },
      { title: "Give the sculptures time", body: "Leave a broad viewing window, then place beach time, meals and other Port Aransas stops around the festival." },
    ],
    relatedLinks: [
      { href: "/event/sxsw", label: "SXSW", description: "Compare another destination-scale Texas spring event." },{ href: "/browse/counties#county-nueces", label: "Explore Nueces County", description: "Expand the Gulf Coast trip beyond the festival." }, { href: "/events", label: "Texas events calendar", description: "Compare other spring events." }],
    sources: [{ label: "Texas SandFest official site", url: "https://www.texassandfest.org/" }, { label: "Texas SandFest know-before-you-go guide", url: "https://www.texassandfest.org/knowbeforeyougo" }],
  },
];

const detailsBySlug = new Map(majorEventAuthorityDetails.map((event) => [event.slug, event]));
const majorEventAuthorityRecords: MajorEventAuthorityRecord[] = majorEventIndexRecords.flatMap((event) => {
  const details = detailsBySlug.get(event.slug);
  if (!details) return [];
  const { slug: _detailSlug, ...routeDetails } = details;
  return [{ ...event, ...routeDetails }];
});
const bySlug = new Map(majorEventAuthorityRecords.map((event) => [event.slug, event]));

// Static registrations keep first-party-verified tournament leaves visible to the
// major-event authority validator while profile modules remain the source of facts.
const newVerifiedTournamentRegistrations = [
  { slug: "charles-schwab-challenge" },
  { slug: "the-cj-cup-byron-nelson" },
  { slug: "texas-childrens-houston-open" },
  { slug: "chevron-championship" },
  { slug: "the-cotton-bowl-classic" },
  { slug: "the-texas-bowl" },
  { slug: "the-sun-bowl" },
  { slug: "the-armed-forces-bowl" },
  { slug: "the-first-responder-bowl" },
  { slug: "uil-football-state-championships" },
  { slug: "uil-boys-basketball-state-tournament" },
  { slug: "uil-girls-basketball-state-tournament" },
  { slug: "uil-baseball-state-tournament" },
  { slug: "uil-softball-state-tournament" },
  { slug: "uil-soccer-state-championships" },
  { slug: "uil-tennis-state-tournaments" },
  { slug: "us-mens-clay-court-championships" },
  { slug: "uil-volleyball-state-tournament" },
  { slug: "uil-cross-country-state-championships" },
  { slug: "uil-wrestling-state-championships" },
  { slug: "uil-spirit-state-championships" },
  { slug: "the-texas-relays" },
  { slug: "worlds-championship-bar-b-que-contest" },
  { slug: "nsca-national-sporting-clays-championship" },
  { slug: "texas-state-science-and-engineering-fair" },
  { slug: "ironman-texas" },
  { slug: "world-skeet-shooting-championships" },
] as const;

const newVerifiedTournamentSlugs = new Set(newVerifiedTournamentRegistrations.map(({ slug }) => slug));

const verifiedTournamentRegionByCounty: Record<string, MajorEventIndexRecord["region"]> = {
  tarrant: "prairies-lakes",
  collin: "prairies-lakes",
  harris: "gulf-coast",
  "el-paso": "big-bend",
  dallas: "prairies-lakes",
  bexar: "south-texas",
  travis: "hill-country",
  williamson: "hill-country",
  brazos: "prairies-lakes",
  montgomery: "piney-woods",
};

function getVerifiedTournamentAuthorityServer(slug: string): MajorEventAuthorityRecord | null {
  if (!newVerifiedTournamentSlugs.has(slug as (typeof newVerifiedTournamentRegistrations)[number]["slug"])) return null;
  const profile = verifiedTournamentBySlug(slug)
    ?? verifiedTournamentBatch3BySlug(slug)
    ?? verifiedTournamentBatch4BySlug(slug)
    ?? verifiedTournamentBatch5BySlug(slug)
    ?? verifiedTournamentBatch6BySlug(slug)
    ?? verifiedTournamentBatch7BySlug(slug);
  if (!profile) return null;

  const venue = profile.slug === "the-texas-bowl" ? "NRG Stadium" : profile.venue;
  const planningTitles = [
    "Start with the current organizer page",
    "Confirm the exact day and access plan",
    "Build the wider Texas itinerary",
  ] as const;

  return {
    slug: profile.slug,
    name: profile.name,
    city: profile.city,
    countySlug: profile.countySlug,
    countyName: profile.countyName,
    region: verifiedTournamentRegionByCounty[profile.countySlug] ?? "prairies-lakes",
    category: "eventCategory" in profile ? profile.eventCategory : "category" in profile && profile.category === "rodeo-ranch" ? "rodeo" : "sport",
    startDate: profile.startDate,
    endDate: profile.endDate,
    dateNote: `Texas Defined checked the current first-party event source on ${profile.sourceCheckedAt}. Reconfirm the official schedule before travel.`,
    venue,
    officialUrl: profile.officialUrl,
    sourceCheckedAt: profile.sourceCheckedAt,
    whyItMatters: profile.whyItMatters,
    planningSections: profile.planningNotes.map((body, index) => ({
      title: planningTitles[index] ?? "Plan from the official event source",
      body,
    })),
    relatedLinks: [
      {
        href: profile.categoryPath,
        label: profile.categoryLabel,
        description: "Compare related verified guides and discovery-stage tournament listings.",
      },
      {
        href: `/browse/counties#county-${profile.countySlug}`,
        label: `Explore ${profile.countyName}`,
        description: "Build a wider trip around the host county.",
      },
      {
        href: "/events/tournaments",
        label: "Texas tournaments",
        description: "Return to the statewide tournament directory and all competition categories.",
      },
    ],
    sources: [{ label: profile.officialSourceLabel, url: profile.officialUrl }],
  };
}

export function getMajorEventAuthorityServer(slug: string) {
  return bySlug.get(slug) ?? getVerifiedTournamentAuthorityServer(slug);
}
