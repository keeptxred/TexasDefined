import type { MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

export const majorEventSchemaEnrichmentBatch25: MajorEventSchemaEnrichment[] = [
  {
    slug: "blanco-lavender-festival",
    organizer: {
      type: "Organization",
      name: "Blanco Chamber of Commerce",
      url: "https://www.blancochamber.com/",
    },
    sources: [
      { label: "Blanco Lavender Festival — official 2027 dates", url: "https://www.blancolavenderfest.com/" },
      { label: "Blanco Lavender Festival — official organizer and locations", url: "https://www.blancolavenderfest.com/contact" },
      { label: "Blanco Lavender Festival — official farm component", url: "https://www.blancolavenderfest.com/farm" },
    ],
    verifiedAt: "2026-09-24",
  },
];
