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
    slug: "chappell-hill-bluebonnet-festival",
    whyItMatters: "Chappell Hill's Official State of Texas Bluebonnet Festival is a major Washington County spring tradition that combines bluebonnet-season travel with live music, juried arts and crafts, and a historic small-town setting between Houston and Austin.",
    planningSections: [
      { title: "Use the organizer's corrected 2027 dates", body: "The Chappell Hill Historical Society lists the 63rd annual festival for Saturday and Sunday, April 10-11, 2027. That current organizer schedule supersedes older discovery material that showed a three-day April 9-11 range." },
      { title: "Treat the festival and flower drive as separate plans", body: "The festival is centered in historic downtown Chappell Hill, while bluebonnet viewing depends on seasonal bloom conditions around Washington County. Build extra time if wildflower photography or scenic drives are part of the trip." },
      { title: "Expect a busy small-town core", body: "The organizer says the festival draws thousands of visitors. Review current parking, vendor, and traffic information before arrival rather than assuming normal Main Street access." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-washington", label: "Explore Washington County", description: "Add historic and scenic Washington County stops." }, { href: "/events", label: "Texas events calendar", description: "Compare other spring festivals." }],
    sources: [{ label: "Chappell Hill Historical Society Bluebonnet Festival", url: "https://chappellhillhistoricalsociety.com/bluebonnet-festival/" }],
  },
  {
    slug: "burnet-bluebonnet-festival",
    whyItMatters: "Burnet's Bluebonnet Festival of Texas is one of the Hill Country's signature spring weekends, pairing the state-flower season with a downtown arts-and-crafts festival, music, family events and related attractions around Burnet.",
    planningSections: [
      { title: "Plan for April 9-11, 2027", body: "The festival's current official brochure tells visitors to return April 9-11, 2027. Use those published dates when booking lodging or coordinating a Hill Country wildflower trip." },
      { title: "Choose festival activities before arrival", body: "Programming spans Historic Burnet Square and other nearby venues, with arts and crafts, food, music, family activities and special events. Review the current schedule because times and ticket requirements can vary by activity." },
      { title: "Leave room for seasonal conditions", body: "Bluebonnet bloom timing changes with weather. Treat the festival dates as fixed but check current wildflower reports separately if flower viewing is a major reason for the trip." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-burnet", label: "Explore Burnet County", description: "Pair the festival with lakes and Hill Country stops." }, { href: "/events", label: "Texas events calendar", description: "Compare other bluebonnet-season events." }],
    sources: [{ label: "Bluebonnet Festival of Texas", url: "https://bluebonnetfestival.org/" }, { label: "Official 2026 brochure with 2027 return dates", url: "https://bluebonnetfestival.org/wp-content/uploads/2026/04/2026-Bluebonnet-Brochure.pdf" }],
  },
  {
    slug: "main-st-fort-worth-arts-festival",
    whyItMatters: "MAIN ST. Fort Worth Arts Festival turns a large stretch of downtown Fort Worth into a free outdoor arts district with nationally selected artists, live entertainment, food and heavy pedestrian activity across four days.",
    planningSections: [
      { title: "Use the published 2027 operating dates", body: "The official festival site lists April 15-18, 2027, with daily public hours beginning at 10 a.m. and later closing times Thursday through Saturday than on Sunday." },
      { title: "Plan transportation around downtown streets", body: "The event occupies Main Street and multiple downtown blocks. Review current street closures, parking and transit guidance before driving into the festival core." },
      { title: "Admission is free, purchases are not", body: "General festival attendance is free according to the organizer. Art, food, beverages and other purchases are separate, so visitors can structure the day around browsing, performances or collecting." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-tarrant", label: "Explore Tarrant County", description: "Build a broader Fort Worth visit." }, { href: "/events", label: "Texas events calendar", description: "Compare other Texas arts festivals." }],
    sources: [{ label: "MAIN ST. Fort Worth Arts Festival", url: "https://mainstreetartsfest.org/" }, { label: "Official festival schedule and map", url: "https://mainstreetartsfest.org/schedule-map/" }],
  },
  {
    slug: "buc-days",
    whyItMatters: "Buc Days is a multi-weekend Corpus Christi festival built around Rodeo Corpus Christi, carnival attractions, parades, concerts, professional bull riding and waterfront-area activity rather than a single one-day event.",
    planningSections: [
      { title: "Anchor the trip to April 29-May 9, 2027", body: "The official Buc Days site currently publishes April 29 through May 9, 2027 for the overall festival. Individual rodeo, parade, concert and attraction schedules sit within that window." },
      { title: "Pick the event before buying travel", body: "Rodeo Corpus Christi, professional bull riding, parades, carnival attractions and other programming can occur on different dates and at different times. Check the live schedule for the specific event you want to see." },
      { title: "Review parking and venue rules", body: "The organizer publishes maps, parking guidance and venue-specific policies for the festival grounds and Hilliard Center Arena. Confirm those details before arrival, especially for ticketed arena events." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-nueces", label: "Explore Nueces County", description: "Add Corpus Christi and coastal stops." }, { href: "/events", label: "Texas events calendar", description: "Compare other Gulf Coast events." }],
    sources: [{ label: "Buc Days official site", url: "https://bucdays.com/" }, { label: "Buc Days official schedule", url: "https://bucdays.com/schedule/" }],
  },
];

const detailBySlug = new Map(expandedDetails.map((detail) => [detail.slug, detail]));
const indexBySlug = new Map(majorEventIndexRecords.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche6Server(slug: string): MajorEventAuthorityRecord | null {
  const event = indexBySlug.get(slug);
  const detail = detailBySlug.get(slug);
  if (!event || !detail) return null;
  const { slug: _slug, ...authorityDetail } = detail;
  return { ...event, ...authorityDetail };
}
