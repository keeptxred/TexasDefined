import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

interface MajorEventOccurrenceWindow {
  label?: string;
  startDate: string;
  endDate?: string;
}

type MultiWindowMajorEventAuthorityRecord = MajorEventAuthorityRecord & {
  occurrenceWindows?: MajorEventOccurrenceWindow[];
};

const records: MultiWindowMajorEventAuthorityRecord[] = [
  {
    slug: "chevron-houston-marathon",
    name: "Chevron Houston Marathon",
    city: "Houston",
    countySlug: "harris",
    countyName: "Harris County",
    region: "gulf-coast",
    category: "sport",
    startDate: "2027-01-16",
    endDate: "2027-01-17",
    occurrenceWindows: [
      { label: "We Are Houston 5K", startDate: "2027-01-16", endDate: "2027-01-16" },
      { label: "Marathon & half marathon", startDate: "2027-01-17", endDate: "2027-01-17" },
    ],
    dateNote: "Official 2027 Houston race weekend includes the Saturday January 16 We Are Houston 5K (8 a.m. start) and Sunday January 17 marathon/half marathon starting at Congress & Fannin from 6:35 a.m. by division. The Friday–Saturday expo and packet pickup are at George R. Brown Convention Center; use the detailed organizer schedule for participant deadlines.",
    venue: "Downtown Houston",
    officialUrl: "https://www.chevronhoustonmarathon.com/",
    sourceCheckedAt: "2026-11-07",
    whyItMatters: "The Chevron Houston Marathon weekend is one of Texas' largest winter running events, pairing the Saturday We Are Houston 5K with Sunday's marathon and Aramco Houston Half Marathon through downtown Houston and drawing a major field of runners, volunteers and spectators.",
    planningSections: [
      { title: "Separate Saturday's 5K from Sunday's distance races", body: "The 2027 organizer schedule places the We Are Houston 5K on January 16 with an 8 a.m. start after an earlier wheelchair division. The Chevron Houston Marathon and Aramco Houston Half Marathon are January 17, with wheelchair/handcycle starts at 6:35 a.m. and open/elite divisions beginning about 6:45–6:55 a.m. from Congress & Fannin. Do not merge these into a single generic race-day time." },
      { title: "Use downtown transit and race guidance", body: "The organizer publishes downtown transportation guidance and recommends Houston METRORail for race-day movement. Check the current course, road-closure and spectator information before relying on normal downtown driving patterns." },
      { title: "Build packet pickup into arrival timing", body: "The organizer confirms participant expo and packet pickup at George R. Brown Convention Center January 15 from 10 a.m.–6 p.m. and January 16 from 8:30 a.m.–5 p.m. Marathon and half-marathon runners should review pickup and entry instructions before race weekend rather than expecting Sunday morning packet pickup." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-harris", label: "Explore Harris County", description: "Extend race weekend into Houston and the surrounding county." },
      { href: "/events", label: "Texas events calendar", description: "Compare other major Texas sports and race weekends." },
    ],
    sources: [
      { label: "Chevron Houston Marathon official 2027 race-weekend schedule", url: "https://www.chevronhoustonmarathon.com/schedule/" },
      { label: "Chevron Houston Marathon official registration", url: "https://www.chevronhoustonmarathon.com/participants/registration/" },
      { label: "Chevron Houston Marathon official expo information", url: "https://www.chevronhoustonmarathon.com/race-weekend/expo-packet-pick-up/" },
    ],
  },
  {
    slug: "spurs-austin-international-half",
    name: "Spurs Austin International Half",
    city: "Austin",
    countySlug: "travis",
    countyName: "Travis County",
    region: "hill-country",
    category: "sport",
    startDate: "2027-01-17",
    endDate: "2027-01-17",
    venue: "Austin, Texas",
    officialUrl: "https://downhilltodowntown.com/",
    sourceCheckedAt: "2026-08-29",
    whyItMatters: "The Spurs Austin International Half, formerly the 3M Half Marathon, carries a long-running Austin road-racing tradition into a newly branded 2027 event built around a fast downhill 13.1-mile course and a downtown finish.",
    planningSections: [
      { title: "Race day is Sunday, January 17", body: "The organizer publishes January 17, 2027 as race day with a 7:30 a.m. start. Friday and Saturday are expo and packet-pickup days, so the Event date remains the actual Sunday race rather than the full administrative weekend." },
      { title: "Plan for a point-to-point race day", body: "The event markets a downhill-to-downtown course and publishes shuttle and gear-check timing. Review the current course, start-area and return-shuttle instructions before deciding where to park or stay." },
      { title: "Use the official weekend schedule", body: "Packet pickup is scheduled at the expo Friday and Saturday, followed by the Sunday race and finish festival. Confirm the final schedule before arrival because operational times remain subject to change." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-travis", label: "Explore Travis County", description: "Pair the race with more Austin and Travis County stops." },
      { href: "/events", label: "Texas events calendar", description: "Compare other Texas running and sports events." },
    ],
    sources: [
      { label: "Spurs Austin International Half official site", url: "https://downhilltodowntown.com/" },
      { label: "Spurs Austin International Half official race-weekend schedule", url: "https://downhilltodowntown.com/race-weekend-schedule/" },
    ],
  },
  {
    slug: "atx-open",
    name: "ATX Open",
    city: "Austin",
    countySlug: "travis",
    countyName: "Travis County",
    region: "hill-country",
    category: "sport",
    startDate: "2027-02-20",
    endDate: "2027-02-28",
    venue: "Westwood Country Club",
    officialUrl: "https://atxopen.com/",
    sourceCheckedAt: "2026-08-29",
    whyItMatters: "The ATX Open is Austin's professional WTA Tour tournament and one of the country's limited women-only tour-level tennis events, bringing a full qualifying and main-draw week to Westwood Country Club.",
    planningSections: [
      { title: "Know the qualifying and main-draw split", body: "The organizer publishes qualifying for February 20-21, 2027 and the main draw for February 22-28. That makes the full February 20-28 window valid continuous tournament programming rather than a loose travel envelope." },
      { title: "Plan around Westwood Country Club", body: "The tournament is staged at Westwood Country Club on West 35th Street. The organizer publishes parking requirements, ticket policies and grounds information, so review the current plan-your-visit guidance before attending." },
      { title: "Choose sessions rather than assuming all-day access", body: "The ATX Open sells single-session and multi-session ticket products across qualifying, early rounds, quarterfinals, semifinals and finals. Match orders can change, so use the official schedule and ticket calendar when planning a specific player or round." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-travis", label: "Explore Travis County", description: "Build a broader Austin itinerary around tournament week." },
      { href: "/events", label: "Texas events calendar", description: "Compare other Texas sports and destination events." },
    ],
    sources: [
      { label: "ATX Open official event information", url: "https://atxopen.com/event-info/" },
      { label: "ATX Open official 2027 ticket calendar", url: "https://atxopen.com/daily-tickets/" },
      { label: "ATX Open official visitor information", url: "https://atxopen.com/plan-your-visit/" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche33Server(slug: string): MultiWindowMajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
