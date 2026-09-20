import type { MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

export const majorEventSchemaEnrichmentBatch23: MajorEventSchemaEnrichment[] = [
  {
    slug: "gears-beers-johnson-city",
    organizer: {
      type: "Organization",
      name: "Gears & Beers",
      url: "https://jctxcarshow.com/",
    },
    performers: [
      {
        type: "PerformingGroup",
        name: "Vinyl Flashback",
      },
    ],
    sources: [
      {
        label: "Gears & Beers — official 2026 show site",
        url: "https://jctxcarshow.com/",
      },
      {
        label: "Explore Johnson City — 5th Annual Gears & Beers",
        url: "https://explorejctx.com/events/5th-annual-gears-beers-car-and-motorcycle-show/",
      },
    ],
    verifiedAt: "2026-09-19",
  },
];
