import type { EventSchemaEntity, MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

const organization = (name: string, url: string): EventSchemaEntity => ({ type: "Organization", name, url });

// First-party optional-schema research pass completed 2026-09-05. Properties are
// intentionally limited to values supported by current organizer or host sources.
export const majorEventSchemaEnrichmentBatch15: MajorEventSchemaEnrichment[] = [
  {
    slug: "fredericksburg-food-wine-festival",
    organizer: organization("Fredericksburg Chamber of Commerce Events Foundation Inc.", "https://fbgfoodandwine.com/"),
    sources: [
      { label: "Fredericksburg Food & Wine official site", url: "https://fbgfoodandwine.com/" },
      { label: "Fredericksburg Food & Wine 2026 schedule", url: "https://fbgfoodandwine.com/events/" },
      { label: "Fredericksburg Food & Wine 2026 FAQ", url: "https://fbgfoodandwine.com/faq/" },
    ],
    verifiedAt: "2026-09-05",
  },
  {
    slug: "korean-festival-houston",
    organizer: organization("Korean-American Society of Houston", "https://www.kfesthouston.com/"),
    sources: [
      { label: "Korean Festival Houston official site", url: "https://www.kfesthouston.com/" },
      { label: "Korean Festival Houston 2026 performance schedule", url: "https://www.kfesthouston.com/schedule" },
    ],
    verifiedAt: "2026-09-05",
  },
  {
    slug: "a-christmas-affair",
    organizer: organization("The Junior League of Austin", "https://www.jlaustin.org/"),
    sources: [
      { label: "Junior League of Austin — A Christmas Affair", url: "https://www.jlaustin.org/a-christmas-affair/" },
      { label: "2026 A Christmas Affair tickets and events", url: "https://www.jlaustin.org/a-christmas-affair/2026-a-christmas-affair-tickets-events/" },
    ],
    verifiedAt: "2026-09-05",
  },
];
