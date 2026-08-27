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
    slug: "dobie-dichos",
    whyItMatters: "Dobie Dichos is an active Live Oak County literary tradition centered on J. Frank Dobie, Texas folklore and storytelling. It is also the correct modern event to surface instead of the discovery inventory's obsolete George West Storyfest listing: Dobie Dichos began as a Storyfest-associated program and continues independently in Oakville.",
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
    whyItMatters: "The Dallas Holiday Parade is a long-running downtown holiday tradition and one of the city's largest one-day outdoor events, making it useful as both a seasonal calendar anchor and a Dallas travel-planning page.",
    planningSections: [
      { title: "Use the first-Saturday rule carefully", body: "The organizer says the parade is always held on the first Saturday in December. In 2026 that falls on December 5. Recheck the official site close to the event because the dedicated 2026 announcement and any operational changes may publish later." },
      { title: "Arrive before the route fills", body: "The organizer's standing visitor guidance says the parade starts at 9 a.m., lasts about two hours and begins at Commerce and Houston streets. Arrive early enough to choose a viewing location before crowds and street closures build." },
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

const detailBySlug = new Map(expandedDetails.map((detail) => [detail.slug, detail]));
const indexBySlug = new Map(majorEventIndexRecords.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche10Server(slug: string): MajorEventAuthorityRecord | null {
  const event = indexBySlug.get(slug);
  const detail = detailBySlug.get(slug);
  if (!event || !detail) return null;
  const { slug: _slug, ...authorityDetail } = detail;
  return { ...event, ...authorityDetail };
}
