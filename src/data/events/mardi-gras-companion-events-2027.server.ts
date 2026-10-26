import type { TexasEventRecord } from "./texas-event-record";

/**
 * 2027 Texas Mardi Gras companion events verified against the named event
 * organizers or locally maintained publisher calendars on 2026-10-25.
 * These are calendar occurrences, NOT new event-authority pages or claims
 * of live ticket inventory. Never infer a right to use organizer photographs.
 *
 * The Crystal Beach publisher shows 5–8 p.m. while a separate community
 * calendar reports 9:30 a.m.–5 p.m.; do not assert a precise start time.
 */
const companionEvents: TexasEventRecord[] = [
  {
    id: "curated-mardi-gras-2027:crystal-beach-chicken-run",
    slug: "crystal-beach-mardi-gras-chicken-run-2027",
    title: "Crystal Beach Chicken Run & Gumbo Cook-off",
    summary: "Motley Krewe and local volunteer-fire-department fundraiser at Swedes Festival Park. January 16 is listed for 2027, but public sources disagree on activity hours; confirm the latest event program before traveling. Different from the February 6 public highway parade.",
    guidePath: "/events/mardi-gras#companion-events",
    startDate: "2027-01-16",
    venueName: "Swedes Festival Park · 1605 Highway 87",
    city: "Crystal Beach",
    countySlug: "galveston",
    countyName: "Galveston County",
    region: "gulf-coast",
    category: "culture",
    officialEventUrl: "https://bolivarpeninsulatexas.com/event/courir-de-mardi-gras",
    status: "scheduled",
    lastVerifiedAt: "2026-10-25",
    lastUpdatedAt: "2026-10-25",
    sourceName: "Bolivar Peninsula event calendar; time conflicts with a secondary local listing",
  },
  {
    id: "curated-mardi-gras-2027:jefferson-queen-mab-ball",
    slug: "jefferson-queen-mab-ball-2027",
    title: "Queen Mab Ball — Mardi Gras Upriver",
    summary: "The Krewe of Hebe's independently ticketed formal Viva Las Vegas gala. Doors are listed for 7:30 p.m., and the ball begins at 8 p.m. on January 23. This is not the February 5–7 public Mardi Gras Upriver festival.",
    guidePath: "/events/mardi-gras#companion-events",
    startDate: "2027-01-23",
    startTime: "8:00 PM",
    venueName: "Jefferson Convention & Visitors Center · 305 East Austin Street",
    city: "Jefferson",
    countySlug: "marion",
    countyName: "Marion County",
    region: "piney-woods",
    category: "culture",
    officialEventUrl: "https://mardigrasupriver.com/queen-mab-ball-2/",
    status: "scheduled",
    lastVerifiedAt: "2026-10-25",
    lastUpdatedAt: "2026-10-25",
    sourceName: "Krewe of Hebe — official Queen Mab Ball 2027 page",
  },
  {
    id: "curated-mardi-gras-2027:beaumont-lagniappe-soiree",
    slug: "beaumont-lagniappe-mardi-gras-soiree-2027",
    title: "Lagniappe Mardi Gras Soirée — Junior League of Beaumont",
    summary: "Separate February 5 fundraising evening at The Event Centre hosted by the Junior League of Beaumont. Its site includes obsolete pricing for a 2024 luncheon; do not treat those figures as tickets for the 2027 Mardi Gras soirée.",
    guidePath: "/events/mardi-gras#companion-events",
    startDate: "2027-02-05",
    startTime: "6:00 PM",
    venueName: "The Event Centre · 700 Crockett Street",
    city: "Beaumont",
    countySlug: "jefferson",
    countyName: "Jefferson County",
    region: "gulf-coast",
    category: "culture",
    officialEventUrl: "https://juniorleaguebeaumont.org/lagniappe-mardi-gras-soiree/",
    status: "scheduled",
    lastVerifiedAt: "2026-10-25",
    lastUpdatedAt: "2026-10-25",
    sourceName: "Junior League of Beaumont — official 2027 Soirée announcement",
  },
  {
    id: "curated-mardi-gras-2027:livingston-gumbo-cookoff",
    slug: "livingston-mardi-gras-gumbo-cookoff-2027",
    title: "Mardi Gras Gumbo Cookoff — Two Creeks Crossing",
    summary: "A February 5–6, 2027 Mardi Gras-themed gumbo cookoff weekend at Two Creeks Crossing Resort near Lake Livingston. Detailed times are pending; the resort's general cookoff policy restricts public day passes, so verify eligibility before traveling.",
    guidePath: "/events/mardi-gras#companion-events",
    startDate: "2027-02-05",
    endDate: "2027-02-06",
    venueName: "Two Creeks Crossing Resort · 1581 Triple Creek Loop",
    city: "Livingston",
    countySlug: "polk",
    countyName: "Polk County",
    region: "piney-woods",
    category: "culture",
    officialEventUrl: "https://twocreekscrossingresort.com/events/mardi-gras-gumbo-cookoff/",
    status: "scheduled",
    lastVerifiedAt: "2026-10-25",
    lastUpdatedAt: "2026-10-25",
    sourceName: "Two Creeks Crossing Resort — official 2027 event schedule",
  },
];

export function getVerifiedMardiGrasCompanionCalendarEvents2027(): TexasEventRecord[] {
  return companionEvents.map((event) => ({ ...event }));
}
