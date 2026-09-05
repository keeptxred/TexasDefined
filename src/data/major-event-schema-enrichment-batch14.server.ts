import type { EventSchemaEntity, MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

const organization = (name: string, url: string): EventSchemaEntity => ({ type: "Organization", name, url });

// First-party optional-schema research pass completed 2026-09-05. Properties are
// intentionally limited to values supported by current organizer or host sources.
export const majorEventSchemaEnrichmentBatch14: MajorEventSchemaEnrichment[] = [
  {
    slug: "hummerbird-celebration",
    organizer: organization("Rockport-Fulton Chamber of Commerce", "https://www.rockport-fulton.org/"),
    sources: [
      { label: "HummerBird Celebration official page", url: "https://www.rockport-fulton.org/hummerbird-celebration/" },
      { label: "2026 HummerBird Celebration chamber listing", url: "https://members.rockport-fulton.org/events/details/2026-hummerbird-celebration-64768" },
    ],
    verifiedAt: "2026-09-05",
  },
  {
    slug: "washington-county-fair",
    organizer: organization("Washington County Fair Association", "https://www.washingtoncofair.com/"),
    sources: [
      { label: "Washington County Fair official schedule", url: "https://www.washingtoncofair.com/events" },
      { label: "Washington County Fair official rodeo schedule", url: "https://www.washingtoncofair.com/events/rodeo" },
    ],
    verifiedAt: "2026-09-05",
  },
  {
    slug: "kendall-county-fair-rodeo",
    organizer: organization("Kendall County Fair Association, Inc.", "https://kcfa.org/"),
    sources: [
      { label: "Kendall County Fair Association official site", url: "https://kcfa.org/" },
      { label: "Kendall County Fair Association September 2026 calendar", url: "https://kcfa.org/events/month/2026-09/" },
    ],
    verifiedAt: "2026-09-05",
  },
  {
    slug: "galveston-island-shrimp-festival",
    organizer: organization("Yaga’s Entertainment", "https://galvestonislandshrimpfestival.com/"),
    sources: [
      { label: "Galveston Island Shrimp Festival official schedule", url: "https://galvestonislandshrimpfestival.com/schedule/" },
      { label: "Galveston Island Shrimp Festival official FAQ", url: "https://galvestonislandshrimpfestival.com/faqs/" },
    ],
    verifiedAt: "2026-09-05",
  },
  {
    slug: "rockport-fulton-seafair",
    organizer: organization("Rockport-Fulton Chamber of Commerce", "https://www.rockport-fulton.org/"),
    sources: [
      { label: "2026 SeaFair chamber listing", url: "https://members.rockport-fulton.org/events/details/2026-seafair-64771" },
    ],
    verifiedAt: "2026-09-05",
  },
  {
    slug: "rockport-songwriter-festival",
    organizer: organization("Rockport Songwriter Association", "https://rockportsongwriterassociation.com/"),
    sources: [
      { label: "2026 Rockport Songwriter Festival chamber listing", url: "https://members.rockport-fulton.org/events/details/5th-annual-rockport-songwriter-festival-64419" },
    ],
    verifiedAt: "2026-09-05",
  },
];
