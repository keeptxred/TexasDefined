import type { MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

// Texas Onion Fest 2026 organizer reviewed. Past 2026 admission is not a current ticket offer.
export const majorEventSchemaEnrichmentBatch30: MajorEventSchemaEnrichment[] = [
  {
    slug: "texas-onion-fest",
    organizer: { type: "Organization", name: "Weslaco Area Chamber of Commerce", url: "https://www.weslaco.com/texasonionfest/" },
    sources: [
      { label: "Chamber official festival and parking description", url: "https://www.weslaco.com/texasonionfest/" },
      { label: "Chamber-hosted 2026 occurrence", url: "https://www.eventeny.com/events/texas-onion-fest-2026-23602/" },
    ],
    verifiedAt: "2026-10-21",
  },
];
