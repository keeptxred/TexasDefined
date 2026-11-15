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
      { title: "Decide between free viewing and reserved seating", body: "The City of Houston confirms its 77th H-E-B Thanksgiving Day Parade on November 26, 2026 at 9 a.m. Downtown public route viewing and reserved parade seating are separate options. The city's official event page links to a route map, Grand Marshal and performer details, and reserved-seat purchasing; use those current links rather than an unofficial resale listing." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-harris", label: "Explore Harris County", description: "Plan more of the Houston holiday visit." }, { href: "/events", label: "Texas events calendar", description: "Compare other Texas holiday events." }],
    sources: [{ label: "City of Houston Thanksgiving Day Parade", url: "https://www.houstontx.gov/thanksgivingparade/index.html" }, { label: "Houston Thanksgiving Parade official volunteer and participation logistics", url: "https://www.houstontx.gov/thanksgivingparade/volunteer.html" }],
  },
  {
    slug: "charro-days-fiesta",
    whyItMatters: "Charro Days is a long-running Brownsville celebration of the region's Mexican heritage, built around downtown parades, dances, music and related community events rather than a single festival gate.",
    planningSections: [
      { title: "Build the trip around the exact 2027 parade time", body: "The official Charro Days timetable lists the Children's Parade Thursday, February 25 at 2:30 p.m., Noche Mexicana at 6 p.m.; the Illuminated Parade Friday, February 26 at 7 p.m.; and Saturday, February 27 Color Guard at 12:30 p.m. followed by the Grand International Parade at 1 p.m. All parades follow Elizabeth Street. Different venues and entry arrangements apply to the separate dances." },
      { title: "The February 25–March 7 carnival extends beyond parade days", body: "20th Century Rides Carnival is scheduled February 25–March 7, 2027 at the TSC ITEC Center, formerly Amigoland Mall. A February 20 Baile del Sol precedes the core parade days; the February 27 Costume Ball is a separately organized evening event at the TSC Jacob Brown Auditorium. Do not treat them as one continuous free festival." },
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
