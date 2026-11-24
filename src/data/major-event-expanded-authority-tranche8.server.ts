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
    slug: "valero-texas-open",
    whyItMatters: "The Valero Texas Open is a long-running PGA TOUR stop in San Antonio, bringing a full tournament week of professional golf, pro-ams and spectator activity to TPC San Antonio in the Hill Country resort corridor.",
    planningSections: [
      { title: "Use the organizer's full March 29-April 4, 2027 window", body: "The official Valero Texas Open fact sheet lists March 29 through April 4, 2027. That current tournament-week range supersedes the narrower April 1-4 span in the discovery inventory." },
      { title: "The operator names December 11 as the 2027 ticket-sale start", body: "As of the November 24 organizer check, 2027 spectator tickets are advertised to go on sale December 11, 2026, with a dated holiday flash sale running December 11–25. Do not claim that admission is presently on sale or promise a price before checkout opens. The March 29–April 4 tournament week includes pro-ams and other activities with separate admission conditions; some pro-am outings are sponsor products, not ordinary ticketed spectator rounds." },
      { title: "Use the new ticket release, not the retired 2026 spectator guide", body: "The site’s main 2027 event page and fact sheet confirm March 29–April 4, 2027, while linked spectator-guide FAQs still say March 30–April 5, 2026. Those 2026 parking, shuttle and schedule PDFs are not 2027 access instructions. Check the updated official 2027 spectator map, parking lot and gate guidance after publication, and distinguish general admission from pro-am registration and hospitality packages." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-bexar", label: "Explore Bexar County", description: "Build a broader San Antonio visit around tournament week." }, { href: "/events", label: "Texas events calendar", description: "Compare other spring sports and festival dates." }],
    sources: [{ label: "Valero Texas Open official fact sheet", url: "https://valerotexasopen.com/facts/" }, { label: "Valero Texas Open 2027 ticket release and December 11–25 promotion announcement", url: "https://valerotexasopen.com/" },
      { label: "Valero official 2027 pro-am categories and dates", url: "https://valerotexasopen.com/proams/" }],
  },
];

const detailBySlug = new Map(expandedDetails.map((detail) => [detail.slug, detail]));
const indexBySlug = new Map(majorEventIndexRecords.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche8Server(slug: string): MajorEventAuthorityRecord | null {
  const event = indexBySlug.get(slug);
  const detail = detailBySlug.get(slug);
  if (!event || !detail) return null;
  const { slug: _slug, ...authorityDetail } = detail;
  return { ...event, ...authorityDetail };
}
