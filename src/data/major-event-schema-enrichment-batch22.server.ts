import type { MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

export const majorEventSchemaEnrichmentBatch22: MajorEventSchemaEnrichment[] = [
  {
    slug: "texas-wine-jam",
    organizer: {
      type: "Organization",
      name: "Vinovium",
      url: "https://www.txwinejam.com/",
    },
    offers: [
      {
        name: "General Admission",
        url: "https://www.txwinejam.com/jaminfo",
        price: 69,
        priceCurrency: "USD",
      },
      {
        name: "VIP Admission",
        url: "https://www.txwinejam.com/jaminfo",
        price: 99,
        priceCurrency: "USD",
      },
      {
        name: "Designated Driver / Under-21 Pass",
        url: "https://www.txwinejam.com/jaminfo",
        price: 29,
        priceCurrency: "USD",
      },
    ],
    sources: [
      {
        label: "Texas Wine Jam — official ticket and schedule details",
        url: "https://www.txwinejam.com/jaminfo",
      },
      {
        label: "Explore Johnson City — Texas Wine Jam",
        url: "https://explorejctx.com/events/texas-wine-jam/",
      },
    ],
    verifiedAt: "2026-09-19",
  },
  {
    slug: "johnson-city-jazz-fest",
    offers: [
      {
        name: "Free admission",
        url: "https://explorejctx.com/johnson-city-jazz-fest/",
        price: 0,
        priceCurrency: "USD",
      },
    ],
    performers: [
      {
        type: "PerformingGroup",
        name: "Adrian Ruiz Quintet",
      },
      {
        type: "PerformingGroup",
        name: "Jerry Z Trio",
      },
      {
        type: "PerformingGroup",
        name: "Elena Diaz with Daniel Durham Quintet",
      },
    ],
    sources: [
      {
        label: "Explore Johnson City — Johnson City Jazz Fest",
        url: "https://explorejctx.com/johnson-city-jazz-fest/",
      },
    ],
    verifiedAt: "2026-09-19",
  },
];
