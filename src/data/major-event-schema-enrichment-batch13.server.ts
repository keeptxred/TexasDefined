import type { MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

// First-party tournament research pass completed 2026-09-04. Optional Event
// properties remain omitted unless the current official source supports a stable value.
export const majorEventSchemaEnrichmentBatch13: MajorEventSchemaEnrichment[] = [
  {
    slug: "charles-schwab-challenge",
    sources: [{ label: "Charles Schwab Challenge official site", url: "https://www.charlesschwabchallenge.com/" }],
    verifiedAt: "2026-09-04",
  },
  {
    slug: "the-cj-cup-byron-nelson",
    sources: [{ label: "THE CJ CUP Byron Nelson official site", url: "https://thecjcupbyronnelson.org/tickets/general-admission/" }],
    verifiedAt: "2026-09-04",
  },
  {
    slug: "texas-childrens-houston-open",
    sources: [{ label: "Texas Children’s Houston Open official site", url: "https://www.tchouopen.com/" }],
    verifiedAt: "2026-09-04",
  },
  {
    slug: "chevron-championship",
    sources: [{ label: "The Chevron Championship official site", url: "https://www.thechevronchampionship.com/tournament/schedule-of-events/" }],
    verifiedAt: "2026-09-04",
  },
  {
    slug: "the-cotton-bowl-classic",
    sources: [{ label: "Goodyear Cotton Bowl Classic official site", url: "https://www.cottonbowl.com/sports/2019/10/25/about-the-classic.aspx" }],
    verifiedAt: "2026-09-04",
  },
  {
    slug: "the-texas-bowl",
    sources: [{ label: "Kinder’s Texas Bowl official site", url: "https://kinderstexasbowl.com/news-college-football-insider/2026-kinders-texas-bowl-set-for-new-years-eve" }],
    verifiedAt: "2026-09-04",
  },
  {
    slug: "the-sun-bowl",
    sources: [{ label: "Sun Bowl Association official site", url: "https://sunbowl.org/" }],
    verifiedAt: "2026-09-04",
  },
  {
    slug: "the-armed-forces-bowl",
    sources: [{ label: "Lockheed Martin Armed Forces Bowl official site", url: "https://www.armedforcesbowl.com/new-and-media/24th-annual-lockheed-martin-armed-forces-bowl-set-for-wednesday-december-23" }],
    verifiedAt: "2026-09-04",
  },
  {
    slug: "the-first-responder-bowl",
    sources: [{ label: "SERVPRO First Responder Bowl official site", url: "https://www.firstresponderbowl.com/" }],
    verifiedAt: "2026-09-04",
  },
];
