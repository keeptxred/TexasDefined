import type { MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

// First-party verification completed 2026-09-05. Optional Event properties are
// omitted when the current organizer source does not publish a stable value yet.
export const majorEventSchemaEnrichmentBatch19: MajorEventSchemaEnrichment[] = [
  {
    slug: "nsca-national-sporting-clays-championship",
    organizer: {
      type: "Organization",
      name: "National Sporting Clays Association",
      url: "https://nsca.nssa-nsca.org/",
    },
    sources: [
      { label: "NSCA 2027 Championship Tour", url: "https://nsca.nssa-nsca.org/nsca-championship-tour/" },
      { label: "National Shooting Complex contact and location", url: "https://nsc.nssa-nsca.org/contact/" },
      { label: "National Shooting Complex official site", url: "https://nsc.nssa-nsca.org/" },
    ],
    verifiedAt: "2026-09-05",
  },
  {
    slug: "texas-state-science-and-engineering-fair",
    sources: [
      { label: "Texas Science & Engineering Fair official site", url: "https://txsef.tamu.edu/" },
      { label: "Texas Science & Engineering Fair regional qualification information", url: "https://txsef.tamu.edu/texas-regional-fairs/" },
    ],
    verifiedAt: "2026-09-05",
  },
];
