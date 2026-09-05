import type { MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

// First-party tournament research pass completed 2026-09-05. Optional Event
// properties stay absent unless a current official source supports a stable value.
export const majorEventSchemaEnrichmentBatch16: MajorEventSchemaEnrichment[] = [
  {
    slug: "uil-football-state-championships",
    sources: [{ label: "UIL Football State Championships official page", url: "https://www.uiltexas.org/football/state" }],
    verifiedAt: "2026-09-05",
  },
  {
    slug: "uil-boys-basketball-state-tournament",
    sources: [{ label: "UIL Boys Basketball State Championships official page", url: "https://www.uiltexas.org/basketball/state-boys" }],
    verifiedAt: "2026-09-05",
  },
  {
    slug: "uil-girls-basketball-state-tournament",
    sources: [{ label: "UIL Girls Basketball State Championships official page", url: "https://www.uiltexas.org/basketball/state-girls" }],
    verifiedAt: "2026-09-05",
  },
  {
    slug: "uil-baseball-state-tournament",
    sources: [{ label: "UIL Baseball State Championships official page", url: "https://www.uiltexas.org/baseball/state" }],
    verifiedAt: "2026-09-05",
  },
  {
    slug: "uil-softball-state-tournament",
    sources: [{ label: "UIL Softball State Championships official page", url: "https://www.uiltexas.org/softball/state" }],
    verifiedAt: "2026-09-05",
  },
  {
    slug: "uil-soccer-state-championships",
    sources: [{ label: "UIL Soccer State Championships official page", url: "https://www.uiltexas.org/soccer/state" }],
    verifiedAt: "2026-09-05",
  },
  {
    slug: "uil-tennis-state-tournaments",
    sources: [{ label: "UIL Tennis State Tournament official page", url: "https://www.uiltexas.org/tennis/state" }],
    verifiedAt: "2026-09-05",
  },
  {
    slug: "us-mens-clay-court-championships",
    sources: [
      { label: "U.S. Men’s Clay Court Championship official site", url: "https://www.mensclaycourt.com/" },
      { label: "U.S. Men’s Clay Court Championship official FAQ", url: "https://www.mensclaycourt.com/faqs.html" },
    ],
    verifiedAt: "2026-09-05",
  },
];
