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
      { title: "Be downtown well before 9 a.m.", body: "Houston's 77th parade starts at 9 a.m. on Thursday, November 26, 2026. Allow time to walk from your parking or transit stop before 9; plan the return trip as well, since a convenient arrival spot may be within the closed street grid after the parade begins." },
      { title: "Do not rely on the outdated closure attachment", body: "The city's 2026 parade landing page still links to a street-closure PDF explicitly headed 2025 as of November 21, 2026. That attachment is not a verified 2026 traffic plan. Confirm current-year restrictions with the Mayor's Office of Special Events at 832-393-0868 before choosing a garage, drop-off point or accessible approach. Do not assume the prior year's reopening times apply." },
      { title: "Decide between free viewing and reserved seating", body: "Downtown public route viewing and reserved parade seating are separate options. The city's 2026 parade page provides an official reserved-seat purchase link. Use that link to check availability before leaving home; no seat inventory or price is guaranteed here. If watching from the public route, choose a landmark outside the parade path as your group's meeting point." },
      { title: "What is confirmed for the 2026 lineup", body: "The city names Lizzo as grand marshal and lists RaeLynn, Micah Tyler, Christina Wells and Amanda Solis among featured performers. Its published lineup also includes Alief Elsik and Morton Ranch high-school marching bands. Check the official performer roster for changes; appearance order and exact arrival times at individual intersections are not confirmed here." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-harris", label: "Explore Harris County", description: "Plan more of the Houston holiday visit." }, { href: "/events", label: "Texas events calendar", description: "Compare other Texas holiday events." }],
    sources: [{ label: "City of Houston Thanksgiving Day Parade", url: "https://www.houstontx.gov/thanksgivingparade/index.html" }, { label: "Houston Thanksgiving Parade official volunteer and participation logistics", url: "https://www.houstontx.gov/thanksgivingparade/volunteer.html" }, { label: "City of Houston 2026 grand marshal", url: "https://houstontx.gov/thanksgivingparade/grand-marshal" }, { label: "City of Houston 2026 performers", url: "https://houstontx.gov/thanksgivingparade/2026performers" }, { label: "City-linked closure attachment (2025 only; not current-year guidance)", url: "https://www.houstontx.gov/sites/default/files/migrated/thanksgivingparade/TDP-Street-Closures-2025.pdf" }],
  },
  {
    slug: "charro-days-fiesta",
    whyItMatters: "Brownsville business leaders conceived Charro Days in 1937 and held the first fiesta in February 1938. It celebrates Mexican heritage across the Rio Grande and takes its name from the traditional Mexican horseman. The 2027 organizer program separates street parades, dances and the carnival rather than using one festival gate.",
    planningSections: [
      { title: "Build the trip around the exact 2027 parade time", body: "The official Charro Days timetable lists the Children's Parade Thursday, February 25 at 2:30 p.m., Noche Mexicana at 6 p.m.; the Illuminated Parade Friday, February 26 at 7 p.m.; and Saturday, February 27 Color Guard at 12:30 p.m. followed by the Grand International Parade at 1 p.m. All parades follow Elizabeth Street. Different venues and entry arrangements apply to the separate dances." },
      { title: "The February 25–March 7 carnival extends beyond parade days", body: "20th Century Rides Carnival is scheduled February 25–March 7, 2027 at the TSC ITEC Center, formerly Amigoland Mall. Baile del Sol opens at noon February 20 at the Charro Days headquarters, 455 E. Elizabeth Street. The February 25 Noche Mexicana includes dinner at TSC Jacob Brown Auditorium; the February 27 Costume Ball is scheduled there at 8 p.m. Check separately for admission and any schedule changes. Do not treat them as one continuous free festival." },
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
