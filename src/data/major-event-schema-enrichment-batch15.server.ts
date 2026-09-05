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
  {
    slug: "hot-luck-live-food-music",
    organizer: organization("Hot Luck Live Food & Music", "https://www.hotluckfest.com/"),
    sources: [
      { label: "Hot Luck official site", url: "https://www.hotluckfest.com/" },
      { label: "Hot Luck 2026 Whole Enchilada pass", url: "https://www.hotluckfest.com/whole-enchilada" },
      { label: "Hot Luck about and FAQ", url: "https://www.hotluckfest.com/about" },
    ],
    verifiedAt: "2026-09-05",
  },
  {
    slug: "viva-la-vida-festival-parade",
    organizer: organization("Mexic-Arte Museum", "https://mexic-artemuseum.org/"),
    sources: [
      { label: "Mexic-Arte Museum — 43rd Annual Viva La Vida Festival & Parade", url: "https://mexic-artemuseum.org/event/43rd-annual-viva-la-vida-festival-parade/" },
      { label: "Mexic-Arte Museum Viva La Vida festival page", url: "https://mexic-artemuseum.org/viva-la-vida-fest/" },
    ],
    verifiedAt: "2026-09-05",
  },
  {
    slug: "meca-dia-de-muertos-festival",
    organizer: organization("Multicultural Education and Counseling through the Arts (MECA)", "https://www.meca-houston.org/"),
    sources: [
      { label: "MECA Día de Muertos official page", url: "https://www.meca-houston.org/dia-de-muertos.html" },
    ],
    verifiedAt: "2026-09-05",
  },
  {
    slug: "houston-diwali-festival-of-lights",
    organizer: organization("Houston Diwali", "https://www.houstondiwali.com/"),
    sources: [
      { label: "Houston Diwali official site", url: "https://www.houstondiwali.com/" },
    ],
    verifiedAt: "2026-09-05",
  },
];
