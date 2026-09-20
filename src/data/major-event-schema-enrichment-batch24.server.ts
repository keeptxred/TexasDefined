import type { MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

export const majorEventSchemaEnrichmentBatch24: MajorEventSchemaEnrichment[] = [
  {
    slug: "blanco-lavender-festival",
    organizer: {
      type: "Organization",
      name: "Blanco Chamber of Commerce",
      url: "https://www.blancolavenderfest.com/",
    },
    sources: [
      {
        label: "Blanco Lavender Festival — official homepage",
        url: "https://www.blancolavenderfest.com/",
      },
      {
        label: "Blanco Lavender Festival — festival information",
        url: "https://www.blancolavenderfest.com/festivalinfo",
      },
    ],
    verifiedAt: "2026-09-20",
  },
];
