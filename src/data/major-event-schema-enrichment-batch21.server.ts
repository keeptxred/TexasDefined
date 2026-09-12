import type { MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

// First-party tournament research pass completed 2026-09-05. Optional Event
// properties stay absent unless a current official source supports a stable value.
export const majorEventSchemaEnrichmentBatch21: MajorEventSchemaEnrichment[] = [
  {
    slug: "the-frisco-bowl",
    organizer: { type: "Organization", name: "ESPN Events", url: "https://espnevents.com/" },
    sources: [
      { label: "Frisco Bowl official site", url: "https://thefriscobowl.com/" },
      { label: "ESPN Events 2026-27 bowl schedule", url: "https://espnevents.com/press/event/espn-events-announces-17-game-college-football-bowl-schedule-for-2026-27-season/" },
    ],
    verifiedAt: "2026-09-05",
  },
  {
    slug: "uil-state-marching-band-championships",
    organizer: { type: "Organization", name: "University Interscholastic League", url: "https://www.uiltexas.org/" },
    sources: [
      { label: "UIL State Open Class Marching Band Contest official page", url: "https://www.uiltexas.org/music/marching-band/state" },
    ],
    verifiedAt: "2026-09-05",
  },
];
