import type { MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

// First-party tournament research pass completed 2026-09-05. Optional Event
// properties stay absent unless a current official source supports a stable value.
export const majorEventSchemaEnrichmentBatch20: MajorEventSchemaEnrichment[] = [
  {
    slug: "ironman-texas",
    organizer: { type: "Organization", name: "IRONMAN", url: "https://www.ironman.com/" },
    sources: [
      { label: "Visit The Woodlands official IRONMAN Texas host page", url: "https://www.visitthewoodlands.com/event/memorial-hermann-ironman-texas/2980/" },
      { label: "The Woodlands Township host-venue agreement", url: "https://public.destinyhosted.com/woodldocs/2025/BODREG/20250417_4056/4053_Agenda%20Packet_BOD_Regular%20Meeting_04%2017%202025_reduced%20file%20size.pdf" },
    ],
    verifiedAt: "2026-09-05",
  },
  {
    slug: "world-skeet-shooting-championships",
    organizer: { type: "Organization", name: "National Skeet Shooting Association", url: "https://mynssa.nssa-nsca.org/" },
    sources: [
      { label: "NSSA World Skeet Championships official page", url: "https://mynssa.nssa-nsca.org/find-a-shoot/world-championship/" },
      { label: "NSSA World Skeet first-timer guide", url: "https://mynssa.nssa-nsca.org/first-timers-guide-to-the-world-skeet-championships/" },
    ],
    verifiedAt: "2026-09-05",
  },
];
