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
    slug: "red-river-rivalry",
    whyItMatters: "The Red River Rivalry is one of the defining annual events on the Texas sports calendar because it brings Texas and Oklahoma into the Cotton Bowl during the State Fair of Texas, concentrating football, fair traffic and downtown Dallas travel into the same day.",
    planningSections: [
      { title: "Treat kickoff as the fixed point", body: "Texas lists the 2026 game for 2:30 p.m. CT on October 10. Work backward from kickoff for stadium entry, the State Fair grounds and the walk to the Cotton Bowl instead of planning arrival around the opening whistle." },
      { title: "Remember that the stadium is inside the fair", body: "A Red River trip is also a State Fair logistics day. Use current ticket and entry instructions, allow for security lines and decide in advance whether you want meaningful fair time before or after the game." },
      { title: "Use transit when practical", body: "Fair Park traffic and parking demand are unusually heavy on rivalry Saturday. Check the current Dallas-area transit and event transportation guidance before committing to a driving plan." },
    ],
    relatedLinks: [
      { href: "/state-fair-of-texas", label: "State Fair of Texas guide", description: "Plan the fair portion of Red River weekend." },
      { href: "/browse/counties#county-dallas", label: "Explore Dallas County", description: "Build a broader Dallas trip around the game." },
      { href: "/events", label: "Texas events calendar", description: "Compare other major Texas sports and fall events." },
    ],
    sources: [
      { label: "Texas Longhorns official Red River Rivalry game page", url: "https://texaslonghorns.com/game-center/22498" },
      { label: "Dallas Sports Commission Red River Rivalry 2026", url: "https://www.dallassports.org/events/red-river-rivalry-2026/" },
    ],
  },
  {
    slug: "formula-1-united-states-grand-prix",
    whyItMatters: "Formula 1's United States Grand Prix turns Circuit of the Americas into one of Texas' largest international sports destinations for a full race weekend, with practice, qualifying, the Grand Prix and major entertainment drawing visitors from well beyond the state.",
    planningSections: [
      { title: "Plan the whole race weekend", body: "Formula 1 lists official track sessions for October 23-25, 2026. Decide whether you are attending only race day or multiple sessions before choosing lodging, transportation and ticket strategy." },
      { title: "Solve transportation before arrival", body: "Circuit of the Americas is southeast of central Austin and race-weekend traffic is substantial. Use the current COTA parking or shuttle plan rather than assuming normal Austin travel times." },
      { title: "Separate race sessions from bonus events", body: "Visit Austin notes an additional Grand Prix View Thursday on October 22. The official Formula 1 race weekend remains October 23-25, so confirm which experiences are included with your ticket before building a four-day itinerary." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-travis", label: "Explore Travis County", description: "Plan more of the Austin-area visit." },
      { href: "/events", label: "Texas events calendar", description: "Compare other major Texas sports and cultural events." },
    ],
    sources: [
      { label: "Formula 1 official 2026 United States Grand Prix schedule", url: "https://www.formula1.com/en/racing/2026/united-states" },
      { label: "Visit Austin Formula 1 2026 guide", url: "https://www.austintexas.org/events/formula-1/" },
    ],
  },
];

const detailBySlug = new Map(expandedDetails.map((detail) => [detail.slug, detail]));
const indexBySlug = new Map(majorEventIndexRecords.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche9Server(slug: string): MajorEventAuthorityRecord | null {
  const event = indexBySlug.get(slug);
  const detail = detailBySlug.get(slug);
  if (!event || !detail) return null;
  const { slug: _slug, ...authorityDetail } = detail;
  return { ...event, ...authorityDetail };
}
