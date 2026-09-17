import type { MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

// First-party tournament research pass completed 2026-09-05. Optional Event
// properties stay absent unless a current official source supports a stable value.
export const majorEventSchemaEnrichmentBatch17: MajorEventSchemaEnrichment[] = [
  {
    slug: "uil-volleyball-state-tournament",
    sources: [
      { label: "UIL Volleyball State Tournament official page", url: "https://www.uiltexas.org/volleyball/state" },
      { label: "UIL volleyball postseason information", url: "https://www.uiltexas.org/volleyball/manual/volleyball-post-season-information" },
    ],
    verifiedAt: "2026-09-05",
  },
  {
    slug: "uil-cross-country-state-championships",
    sources: [{ label: "UIL Cross Country State Championships official page", url: "https://www.uiltexas.org/cross-country/state" }],
    verifiedAt: "2026-09-05",
  },
  {
    slug: "uil-wrestling-state-championships",
    sources: [
      { label: "UIL Wrestling State Tournament official page", url: "https://www.uiltexas.org/wrestling/state" },
      { label: "UIL wrestling postseason information", url: "https://www.uiltexas.org/wrestling/manual/wrestling-manual-post-season-information" },
    ],
    verifiedAt: "2026-09-05",
  },
  {
    slug: "uil-spirit-state-championships",
    sources: [
      { label: "UIL Spirit State Championships official page", url: "https://www.uiltexas.org/spirit/spirit-state-championships" },
      { label: "UIL Spirit State Championships schedule", url: "https://www.uiltexas.org/spirit/spirit-state-championships/schedule" },
    ],
    verifiedAt: "2026-09-05",
  },
];
