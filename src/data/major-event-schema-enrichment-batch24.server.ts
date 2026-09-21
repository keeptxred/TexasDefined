import type { MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

export const majorEventSchemaEnrichmentBatch24: MajorEventSchemaEnrichment[] = [
  {
    slug: "blanco-lavender-festival",
    organizer: {
      type: "Organization",
      name: "Blanco Chamber of Commerce",
      url: "https://www.blancochamber.com/",
    },
    sources: [
      {
        label: "Blanco Lavender Festival — official site",
        url: "https://www.blancolavenderfest.com/",
      },
      {
        label: "Blanco Lavender Festival — contact and locations",
        url: "https://www.blancolavenderfest.com/contact",
      },
      {
        label: "Hill Country Lavender — events",
        url: "https://www.hillcountrylavender.com/events",
      },
    ],
    verifiedAt: "2026-09-20",
  },
];
