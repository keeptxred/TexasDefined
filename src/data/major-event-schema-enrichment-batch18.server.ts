import type { MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

export const majorEventSchemaEnrichmentBatch18: MajorEventSchemaEnrichment[] = [
  {
    slug: "the-texas-relays",
    organizer: {
      type: "Organization",
      name: "University of Texas Athletics",
      url: "https://texaslonghorns.com/",
    },
    sources: [
      { label: "Texas Athletics future Texas Relays dates", url: "https://texaslonghorns.com/sports/2013/10/25/relays_1025133745" },
      { label: "Texas Athletics future dates announcement", url: "https://texaslonghorns.com/news/2024/10/23/texas-announces-future-texas-relays-dates" },
    ],
    verifiedAt: "2026-09-05",
  },
  {
    slug: "worlds-championship-bar-b-que-contest",
    organizer: {
      type: "Organization",
      name: "Houston Livestock Show and Rodeo",
      url: "https://www.rodeohouston.com/",
    },
    offers: [
      {
        name: "Adult admission (13+)",
        url: "https://www.rodeohouston.com/worlds-championship-bar-b-que/",
        price: 30,
        priceCurrency: "USD",
      },
      {
        name: "Child admission (ages 3–12)",
        url: "https://www.rodeohouston.com/worlds-championship-bar-b-que/",
        price: 10,
        priceCurrency: "USD",
      },
    ],
    sources: [
      { label: "World’s Championship Bar-B-Que official page", url: "https://www.rodeohouston.com/worlds-championship-bar-b-que/" },
      { label: "RODEOHOUSTON 2027 tickets", url: "https://www.rodeohouston.com/tickets/" },
    ],
    verifiedAt: "2026-09-05",
  },
];
