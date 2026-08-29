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
    slug: "houston-thanksgiving-day-parade",
    whyItMatters: "Houston's Thanksgiving Day Parade is a major downtown holiday tradition with a fixed morning start, large crowds and street closures that make arrival and viewing-location planning important.",
    planningSections: [
      { title: "Be downtown well before 9 a.m.", body: "The City of Houston lists the 2026 parade for 9 a.m. on Thanksgiving morning. Build in time for downtown access, walking and finding a viewing location before the route becomes crowded." },
      { title: "Review the street closures", body: "The city publishes a parade street-closure schedule and route information. Check the current version before choosing parking or a drop-off point." },
      { title: "Decide between free viewing and reserved seating", body: "Most spectators can view from the route, while the city also provides reserved-seat information when sales are available. Confirm the current options before the event." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-harris", label: "Explore Harris County", description: "Plan more of the Houston holiday visit." }, { href: "/events", label: "Texas events calendar", description: "Compare other Texas holiday events." }],
    sources: [{ label: "City of Houston Thanksgiving Day Parade", url: "https://www.houstontx.gov/thanksgivingparade/index.html" }, { label: "Houston Mayor's Office of Special Events", url: "https://preflight.houstontx.gov/specialevents/index.html" }],
  },
  {
    slug: "charro-days-fiesta",
    whyItMatters: "Charro Days is a long-running Brownsville celebration of the region's Mexican heritage, built around downtown parades, dances, music and related community events rather than a single festival gate.",
    planningSections: [
      { title: "Choose the specific Charro Days event", body: "The 2027 schedule includes Noche Mexicana and the Children's Parade on February 25, the Illuminated Parade on February 26, and the Color Guard and Grand International parades on February 27. Pick the anchor event before arranging the rest of the trip." },
      { title: "Expect a broader celebration window", body: "Related programming begins before the core parade dates and the carnival continues beyond them. Use the organizer's current schedule instead of assuming every activity happens February 25-27." },
      { title: "Plan around downtown street access", body: "Major parades use the Elizabeth Street route and can affect central Brownsville traffic. Review current city and organizer guidance before driving into the parade area." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-cameron", label: "Explore Cameron County", description: "Build a broader Rio Grande Valley visit." }, { href: "/events", label: "Texas events calendar", description: "Compare other major Texas cultural events." }],
    sources: [{ label: "Charro Days official site", url: "https://www.charrodaysfiesta.com/" }, { label: "Charro Days official 2027 events schedule", url: "https://www.charrodaysfiesta.com/copy-of-images-1" }],
  },
];

const detailBySlug = new Map(expandedDetails.map((detail) => [detail.slug, detail]));
const indexBySlug = new Map(majorEventIndexRecords.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche5Server(slug: string): MajorEventAuthorityRecord | null {
  const event = indexBySlug.get(slug);
  const detail = detailBySlug.get(slug);
  if (!event || !detail) return null;
  const { slug: _slug, ...authorityDetail } = detail;
  return { ...event, ...authorityDetail };
}
