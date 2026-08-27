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
      { title: "Check which days are open to spectators", body: "Tournament week includes practice and pro-am activity as well as competitive rounds. Ticket availability and public access vary by day, so use the current official schedule before choosing travel dates." },
      { title: "Plan transportation before arriving at TPC San Antonio", body: "The tournament publishes parking and shuttle guidance for spectators. Review current instructions before driving to the course because access patterns can differ from normal resort traffic." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-bexar", label: "Explore Bexar County", description: "Build a broader San Antonio visit around tournament week." }, { href: "/events", label: "Texas events calendar", description: "Compare other spring sports and festival dates." }],
    sources: [{ label: "Valero Texas Open official fact sheet", url: "https://valerotexasopen.com/facts/" }, { label: "Valero Texas Open official site", url: "https://valerotexasopen.com/" }],
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
