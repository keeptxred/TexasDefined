import type { MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

export const majorEventSchemaEnrichmentBatch24: MajorEventSchemaEnrichment[] = [
  {
    slug: "real-ale-oktoberfest",
    organizer: {
      type: "Organization",
      name: "Real Ale Brewing Company",
      url: "https://realalebrewing.com/",
    },
    offers: [
      {
        name: "Free general admission",
        url: "https://realalebrewing.com/oktoberfest/",
        price: 0,
        priceCurrency: "USD",
      },
    ],
    performers: [
      {
        type: "PerformingGroup",
        name: "Czech Melody Masters",
      },
    ],
    sources: [
      {
        label: "Real Ale Brewing — Oktoberfest 2026",
        url: "https://realalebrewing.com/oktoberfest/",
      },
      {
        label: "Real Ale Brewing — official Oktoberfest event listing",
        url: "https://realalebrewing.com/event/save-the-date-oktoberfest-music-food-games-fun/",
      },
    ],
    verifiedAt: "2026-09-20",
  },
];
