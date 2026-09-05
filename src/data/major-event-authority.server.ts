import { majorEventIndexRecords, type MajorEventIndexRecord } from "./major-event-index";
import { verifiedTournamentBySlug } from "./tournaments/verified-profiles";

export interface MajorEventSource { label: string; url: string; }
export interface MajorEventPlanningSection { title: string; body: string; }
export interface MajorEventRelatedLink { href: string; label: string; description: string; }
interface MajorEventAuthorityDetails {
  slug: string;
  whyItMatters: string;
  planningSections: MajorEventPlanningSection[];
  relatedLinks: MajorEventRelatedLink[];
  sources: MajorEventSource[];
}
export type MajorEventAuthorityRecord = MajorEventIndexRecord & Omit<MajorEventAuthorityDetails, "slug">;

// Server-only guide copy. The supplied inventory is a discovery seed; official
// organizer/host sources control verified dates stored in major-event-index.ts.
const majorEventAuthorityDetails: MajorEventAuthorityDetails[] = [
  {
    slug: "grapefest",
    whyItMatters: "The festival is a strong North Texas fall-travel anchor because it combines a walkable historic downtown with a large scheduled event.",
    planningSections: [
      { title: "Choose the day first", body: "Admission rules and hours vary by day. Decide whether you want Thursday, Friday evening or the heavier weekend crowd before locking in lodging and arrival time." },
      { title: "Treat downtown as the venue", body: "Build in walking time and use the organizer's current parking and transportation instructions before leaving home." },
      { title: "Make it a weekend", body: "Keep the festival as the fixed point, then add Main Street, dining and other Tarrant County stops around the hours you plan to attend." },
    ],
    relatedLinks: [{ href: "/events", label: "Texas events calendar", description: "Compare other fall events." }, { href: "/browse/counties#county-tarrant", label: "Explore Tarrant County", description: "Plan more of the North Texas trip." }],
    sources: [{ label: "GrapeFest official general information", url: "https://www.grapevinetexasusa.com/grapefest/general-information/" }],
  },
  {
    slug: "texas-renaissance-festival",
    whyItMatters: "This repeat-weekend destination can shape an entire fall trip, and the themed-weekend structure means the best weekend depends on the visitor.",
    planningSections: [
      { title: "Pick the theme first", body: "Start with the official themed-weekend calendar instead of assuming every weekend is interchangeable." },
      { title: "Plan for a full outdoor day", body: "Comfortable footwear, weather planning and a realistic arrival window matter across the large festival footprint." },
      { title: "Recheck operating days", body: "The published start and end dates mark the season boundary; the organizer's calendar remains authoritative for individual operating days." },
    ],
    relatedLinks: [{ href: "/events", label: "Texas events calendar", description: "See other major fall festivals." }],
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
    relatedLinks: [{ href: "/events", label: "Texas events calendar", description: "Compare other fall events." }, { href: "/browse/counties#county-smith", label: "Explore Smith County", description: "Plan more of the East Texas trip." }],
    sources: [{ label: "Texas Rose Festival official site", url: "https://www.texasrosefestival.org/" }],
  },
  {
    slug: "wurstfest",
    whyItMatters: "Wurstfest connects a current travel event to the deeper German-Texan story visible across Hill Country towns, dance halls, food traditions and historic communities.",
    planningSections: [
      { title: "Choose weekday or weekend", body: "The ten-day run gives visitors flexibility; choose the day before arranging lodging and other New Braunfels stops." },
      { title: "Use it as a heritage gateway", body: "Leave time for New Braunfels beyond the festival grounds and connect the visit to the region's German-Texan history." },
      { title: "Check the daily schedule", body: "Entertainment, admission details and operating hours vary; use the organizer's current schedule for your exact day." },
    ],
    relatedLinks: [{ href: "/german-czech-texas-towns", label: "German and Czech Texas towns", description: "Connect Wurstfest to the larger heritage story." }, { href: "/browse/counties#county-comal", label: "Explore Comal County", description: "Build a broader Hill Country itinerary." }, { href: "/events", label: "Texas events calendar", description: "Compare other major fall events." }],
    sources: [{ label: "Wurstfest official site", url: "https://wurstfest.com/" }],
  },
  {
    slug: "fort-worth-stock-show-rodeo",
    whyItMatters: "It supports several kinds of visits, from a single arena night to a full day built around the stock-show grounds and Fort Worth attractions.",
    planningSections: [
      { title: "Choose rodeo night or stock-show day", body: "Start with the specific performance, livestock competition or grounds activity you care about because arrival time and ticket needs differ." },
      { title: "Use the cultural district", body: "Pair the event with nearby museums, dining and other Tarrant County stops instead of making a separate cross-city trip." },
      { title: "Recheck final logistics", body: "Grounds hours, rodeo entry and other operational details can change; use the organizer's current visitor information." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-tarrant", label: "Explore Tarrant County", description: "Plan more of the Fort Worth trip." }, { href: "/events", label: "Texas events calendar", description: "Compare other rodeos and winter events." }],
    sources: [{ label: "Fort Worth Stock Show & Rodeo official site", url: "https://www.fwssr.com/" }, { label: "FWSSR visitor FAQ", url: "https://www.fwssr.com/p/plan-a-visit/frequently-asked-questions" }],
  },
  {
    slug: "san-antonio-stock-show-rodeo",
    whyItMatters: "The event can be the centerpiece of a San Antonio weekend or one major night inside a broader city trip, linking event, county and destination planning.",
    planningSections: [
      { title: "Start with the performance", body: "Pick the concert or rodeo performance first, then plan lodging and other San Antonio activities around that fixed time." },
      { title: "Budget time for the grounds", body: "If livestock exhibits, fair attractions or food are part of the plan, arrive early enough to use the grounds before the performance." },
      { title: "Use official day-of information", body: "Recheck parking, entry rules, show times and ticket availability with the organizer before attending." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-bexar", label: "Explore Bexar County", description: "Build a larger San Antonio visit." }, { href: "/events", label: "Texas events calendar", description: "Compare major Texas rodeos." }],
    sources: [{ label: "San Antonio Stock Show & Rodeo official site", url: "https://www.sarodeo.com/" }, { label: "Visit San Antonio rodeo guide", url: "https://www.visitsanantonio.com/events/arts-culture-events/san-antonio-rodeo/" }],
  },
  {
    slug: "sxsw",
    whyItMatters: "SXSW changes the normal rhythm of central Austin, so visitors need to plan around credentials, distributed venues, transportation and unusually high demand.",
    planningSections: [
      { title: "Know which SXSW you are attending", body: "Start with the badge, festival or program that matters to you, then build the day around its official schedule." },
      { title: "Plan for venue changes", body: "Programming is distributed across downtown; walking time, transit and schedule gaps are part of the event experience." },
      { title: "Book around event demand", body: "Lodging location and transportation strategy can matter as much as the session list when several days of programming are involved." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-travis", label: "Explore Travis County", description: "Connect SXSW with a broader Austin-area visit." }, { href: "/events", label: "Texas events calendar", description: "See other major cultural events." }],
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
    relatedLinks: [{ href: "/browse/counties#county-nueces", label: "Explore Nueces County", description: "Expand the Gulf Coast trip beyond the festival." }, { href: "/events", label: "Texas events calendar", description: "Compare other spring events." }],
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

// Static registrations keep these first-party-verified tournament leaves visible to
// the major-event authority validator while the profile module remains the canonical
// source for their verified event facts.
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
] as const;

const newVerifiedTournamentSlugs = new Set(newVerifiedTournamentRegistrations.map(({ slug }) => slug));

const verifiedTournamentRegionByCounty: Record<string, MajorEventIndexRecord["region"]> = {
  tarrant: "prairies-lakes",
  collin: "prairies-lakes",
  harris: "gulf-coast",
  "el-paso": "big-bend",
  dallas: "prairies-lakes",
};

function getVerifiedTournamentAuthorityServer(slug: string): MajorEventAuthorityRecord | null {
  if (!newVerifiedTournamentSlugs.has(slug as (typeof newVerifiedTournamentRegistrations)[number]["slug"])) return null;
  const profile = verifiedTournamentBySlug(slug);
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
    category: profile.category === "rodeo-ranch" ? "rodeo" : "sport",
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
