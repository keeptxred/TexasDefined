import type { MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

const organizer = { type: "Organization" as const, name: "K. Spoetzl Brewery", url: "https://shiner.com/" };

export const majorEventSchemaEnrichmentBatch21: MajorEventSchemaEnrichment[] = [
  {
    slug: "shiner-oktoberfest-weekends",
    organizer,
    occurrences: {
      "Weekend 1": {
        offers: [{ name: "Free admission", url: "https://shiner.com/event/oktoberfest-weekend-1/", price: 0, priceCurrency: "USD" }],
      },
      "Weekend 2": {
        offers: [{ name: "Free admission", url: "https://shiner.com/event/oktoberfest-weekend-2/", price: 0, priceCurrency: "USD" }],
      },
      "Weekend 3": {
        offers: [{ name: "Free admission", url: "https://shiner.com/event/oktoberfest-weekend-3/", price: 0, priceCurrency: "USD" }],
      },
    },
    sources: [
      { label: "Shiner official Oktoberfest Weekend 1", url: "https://shiner.com/event/oktoberfest-weekend-1/" },
      { label: "Shiner official Oktoberfest Weekend 2", url: "https://shiner.com/event/oktoberfest-weekend-2/" },
      { label: "Shiner official Oktoberfest Weekend 3", url: "https://shiner.com/event/oktoberfest-weekend-3/" },
    ],
    verifiedAt: "2026-09-19",
  },
  {
    slug: "shinerfest",
    organizer,
    offers: [
      { name: "ShinerFest 2026 admission", url: "https://shiner.com/event/shinerfest-2026/", price: 80, priceCurrency: "USD" },
    ],
    sources: [
      { label: "Shiner official ShinerFest 2026 page", url: "https://shiner.com/event/shinerfest-2026/" },
    ],
    verifiedAt: "2026-09-19",
  },
  {
    slug: "shiner-beer-run",
    organizer,
    sources: [
      { label: "Shiner official 15th Annual Beer Run", url: "https://shiner.com/event/15th-annual-beer-run/" },
      { label: "Shiner official events calendar", url: "https://shiner.com/events/" },
    ],
    verifiedAt: "2026-09-19",
  },
];
