import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

const records: MajorEventAuthorityRecord[] = [
  {
    slug: "dobie-dichos",
    name: "Dobie Dichos",
    city: "Oakville",
    countySlug: "live-oak",
    countyName: "Live Oak County",
    region: "south-texas",
    category: "culture",
    startDate: "2026-11-06",
    endDate: "2026-11-06",
    dateNote: "The discovery inventory listed George West Storyfest on November 7, 2026. Current event history shows Dobie Dichos is the active literary tradition tied to Storyfest's organizers; the official Dobie Dichos site lists November 6, 2026 in Oakville.",
    venue: "Historic Oakville Jail",
    officialUrl: "https://www.dobiedichos.com/",
    sourceCheckedAt: "2026-08-27",
    whyItMatters: "Dobie Dichos is an active Live Oak County literary tradition centered on J. Frank Dobie, Texas folklore and storytelling. It is the appropriate current event to surface instead of the stale George West Storyfest seed entry.",
    planningSections: [
      { title: "Go to Oakville, not downtown George West", body: "The event is held on the grounds of the Historic Oakville Jail in Oakville, between Three Rivers and George West. Use the organizer's directions and allow extra time for the rural venue." },
      { title: "Build the evening around the program", body: "The 2026 schedule opens the gates at 5 p.m., with the meal and music beginning at 6 p.m. and the storytelling program from 7 to 9 p.m. Choose your ticket type before arrival because meal-and-program and program-only options differ." },
      { title: "Bring what the setting calls for", body: "This is an outdoor campfire-style literary event. Check the current weather and organizer guidance, and bring a lawn chair if the current ticket instructions call for one." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-live-oak", label: "Explore Live Oak County", description: "Connect the event to a broader South Texas visit." },
      { href: "/events", label: "Texas events calendar", description: "Compare other Texas literary, heritage and cultural events." },
    ],
    sources: [
      { label: "Dobie Dichos official site", url: "https://www.dobiedichos.com/" },
      { label: "Dobie Dichos official history", url: "https://www.dobiedichos.com/about" },
      { label: "Dobie Dichos official tickets and schedule", url: "https://www.dobiedichos.com/tickets-schedule" },
    ],
  },
  {
    slug: "dallas-holiday-parade",
    name: "Dallas Holiday Parade",
    city: "Dallas",
    countySlug: "dallas",
    countyName: "Dallas County",
    region: "prairies-lakes",
    category: "seasonal",
    startDate: "2026-12-05",
    endDate: "2026-12-05",
    dateNote: "The organizer says the parade is always held on the first Saturday in December. In 2026, that falls on December 5. Recheck the official site close to the event for the dedicated 2026 announcement and any operational changes.",
    venue: "Downtown Dallas",
    officialUrl: "https://dallasholidayparade.com/",
    sourceCheckedAt: "2026-08-27",
    whyItMatters: "The Dallas Holiday Parade is a long-running downtown holiday tradition and one of the city's largest one-day outdoor events, making it useful as both a seasonal calendar anchor and a Dallas travel-planning page.",
    planningSections: [
      { title: "Use the first-Saturday rule carefully", body: "The organizer's standing guidance places the parade on the first Saturday in December. Recheck the official site close to parade week because year-specific operations can change." },
      { title: "Arrive before the route fills", body: "The organizer says the parade starts at 9 a.m., lasts about two hours and begins at Commerce and Houston streets. Arrive early enough to choose a viewing location before crowds and street closures build." },
      { title: "Prefer transit when it fits", body: "The parade recommends DART for downtown access to avoid parking, traffic and street closures. If driving, review current downtown parking information before parade morning." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-dallas", label: "Explore Dallas County", description: "Build a broader holiday weekend around downtown Dallas." },
      { href: "/events", label: "Texas events calendar", description: "Compare other Texas holiday events." },
    ],
    sources: [
      { label: "Dallas Holiday Parade official site", url: "https://dallasholidayparade.com/" },
      { label: "Dallas Holiday Parade official things to know", url: "https://dallasholidayparade.com/things-to-know" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche10Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
