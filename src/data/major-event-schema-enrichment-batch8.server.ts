import type { EventSchemaEntity, EventSchemaOffer, MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

const usdOffer = (name: string, price: number, url: string): EventSchemaOffer => ({
  name,
  price,
  priceCurrency: "USD",
  url,
});

const organization = (name: string, url: string): EventSchemaEntity => ({ type: "Organization", name, url });

// Supplemental dedicated Event leaves, official-source research wave 6.
// These records mark the official-source review even when changing prices, lineups, or
// producer relationships make it safer to omit an optional Google Event property.
export const majorEventSchemaEnrichmentBatch8: MajorEventSchemaEnrichment[] = [
  {
    slug: "texas-tribune-festival",
    organizer: organization("The Texas Tribune", "https://www.texastribune.org/"),
    sources: [
      { label: "Texas Tribune Festival official site", url: "https://festival.texastribune.org/" },
      { label: "The Texas Tribune official 2026 Festival lineup announcement", url: "https://www.texastribune.org/2026/08/18/texas-tribune-festival-2026-lineup/" },
      { label: "Texas Tribune Festival official tickets", url: "https://festival.texastribune.org/tickets" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "san-antonio-beer-festival",
    sources: [
      { label: "San Antonio Beer Festival official site", url: "https://sanantoniobeerfestival.com/" },
      { label: "San Antonio Beer Festival official FAQ", url: "https://sanantoniobeerfestival.com/faqs/" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "rodeo-austin",
    organizer: organization("Rodeo Austin", "https://rodeoaustin.com/"),
    sources: [
      { label: "Rodeo Austin official tickets and 2027 dates", url: "https://rodeoaustin.com/tickets/" },
      { label: "Rodeo Austin official events calendar", url: "https://rodeoaustin.com/events/" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "san-antonio-book-festival",
    organizer: organization("San Antonio Book Festival", "https://sabookfestival.org/"),
    offers: [usdOffer("Festival admission", 0, "https://sabookfestival.org/festival-info/faqs/")],
    sources: [
      { label: "San Antonio Book Festival official FAQ and 2027 date", url: "https://sabookfestival.org/festival-info/faqs/" },
      { label: "San Antonio Book Festival official 2027 submission page", url: "https://sabookfestival.org/festival-info/submit-a-book/" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "pecan-street-festival",
    organizer: organization("Pecan Street Association", "https://pecanstreetfestival.org/"),
    offers: [usdOffer("Festival admission", 0, "https://pecanstreetfestival.org/event-info/")],
    sources: [
      { label: "Pecan Street Festival official site", url: "https://pecanstreetfestival.org/" },
      { label: "Pecan Street Festival official 2026 event information", url: "https://pecanstreetfestival.org/event-info/" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "lone-star-rally",
    sources: [
      { label: "Lone Star Rally official 2026 site", url: "https://lonestarrally.com/" },
      { label: "Lone Star Rally official vendor information", url: "https://lonestarrally.com/vendors/food-application/" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "austin-city-limits-music-festival",
    sources: [
      { label: "Austin City Limits Music Festival official site", url: "https://www.aclfestival.com/" },
      { label: "ACL Fest official 2026 schedule", url: "https://www.aclfestival.com/schedule" },
      { label: "ACL Fest official tickets and weekend dates", url: "https://www.aclfestival.com/tickets" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "austin-marathon",
    sources: [
      { label: "Austin Marathon official 2027 event page", url: "https://youraustinmarathon.com/" },
      { label: "Austin Marathon official 2027 weekend schedule", url: "https://youraustinmarathon.com/schedule/" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "cowtown-marathon",
    sources: [
      { label: "The Cowtown official 2027 races page", url: "https://cowtownmarathon.org/races/" },
      { label: "The Cowtown official full marathon page", url: "https://cowtownmarathon.org/races/full-marathon/" },
      { label: "The Cowtown official 10K page", url: "https://cowtownmarathon.org/races/10k/" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "bmw-dallas-marathon",
    sources: [
      { label: "BMW Dallas Marathon official events page", url: "https://dallasmarathon.com/dallas-marathon-festival/events" },
      { label: "BMW Dallas Marathon official Weekend Series", url: "https://dallasmarathon.com/dallas-marathon-festival/events/weekend-series" },
      { label: "BMW Dallas Marathon official participant information", url: "https://dallasmarathon.com/dallas-marathon-festival/participants" },
    ],
    verifiedAt: "2026-09-02",
  },
];
