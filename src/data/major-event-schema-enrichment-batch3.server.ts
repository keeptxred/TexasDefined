import type { EventSchemaEntity, EventSchemaOffer, MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

const usdOffer = (name: string, price: number, url: string): EventSchemaOffer => ({
  name,
  price,
  priceCurrency: "USD",
  url,
});

const organization = (name: string, url: string): EventSchemaEntity => ({ type: "Organization", name, url });
const group = (name: string, url?: string): EventSchemaEntity => ({ type: "PerformingGroup", name, ...(url ? { url } : {}) });
const person = (name: string, url?: string): EventSchemaEntity => ({ type: "Person", name, ...(url ? { url } : {}) });

// Supplemental dedicated Event leaves, reviewed against current official event/organizer sources.
// Year-specific offers and performers are only carried when the dedicated leaf represents that same event year.
// Event imagery remains omitted unless Texas Defined can publish a representative image with clear reuse rights.
export const majorEventSchemaEnrichmentBatch3: MajorEventSchemaEnrichment[] = [
  {
    slug: "dobie-dichos",
    organizer: organization("Dobie Dichos, Inc.", "https://www.dobiedichos.com/"),
    offers: [
      usdOffer("Adult program + meal admission", 30, "https://www.dobiedichos.com/tickets-schedule"),
      usdOffer("Child 12 and under program + meal admission", 10, "https://www.dobiedichos.com/tickets-schedule"),
      usdOffer("Adult program-only advance admission", 20, "https://www.dobiedichos.com/tickets-schedule"),
      usdOffer("Child 12 and under program-only admission", 5, "https://www.dobiedichos.com/tickets-schedule"),
      usdOffer("Adult program-only gate admission", 25, "https://www.dobiedichos.com/tickets-schedule"),
    ],
    sources: [
      { label: "Dobie Dichos official 2026 event page", url: "https://www.dobiedichos.com/" },
      { label: "Dobie Dichos official 2026 tickets and schedule", url: "https://www.dobiedichos.com/tickets-schedule" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "dallas-holiday-parade",
    organizer: organization("HTEDance and Spirit Group", "https://dallasholidayparade.com/"),
    offers: [
      usdOffer("Public parade route admission", 0, "https://dallasholidayparade.com/things-to-know"),
    ],
    sources: [
      { label: "Dallas Holiday Parade official history and current operator", url: "https://dallasholidayparade.com/" },
      { label: "Dallas Holiday Parade official spectator FAQ", url: "https://dallasholidayparade.com/things-to-know" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "schulenburg-festival",
    organizer: organization("Schulenburg Festival Association, Inc.", "https://www.schulenburgfestival.org/"),
    sources: [
      { label: "Schulenburg Festival Association official site", url: "https://www.schulenburgfestival.org/" },
      { label: "Schulenburg Festival official schedule", url: "https://www.schulenburgfestival.org/schedule" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "westfest",
    organizer: organization("Westfest Inc.", "https://westfest.com/"),
    sources: [
      { label: "Westfest official event and nonprofit background", url: "https://westfest.com/about" },
      { label: "Westfest Inc. official contact page", url: "https://westfest.com/contact" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "luling-watermelon-thump",
    organizer: organization("Luling Watermelon Thump Association", "https://www.watermelonthump.com/"),
    sources: [
      { label: "Luling Watermelon Thump official site", url: "https://www.watermelonthump.com/" },
      { label: "Luling Watermelon Thump Association official parade terms", url: "https://www.watermelonthump.com/parade-form" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "national-polka-festival",
    organizer: organization("National Polka Festival", "https://www.nationalpolkafestival.com/"),
    sources: [
      { label: "National Polka Festival official site", url: "https://www.nationalpolkafestival.com/" },
      { label: "National Polka Festival official ticket information", url: "https://www.nationalpolkafestival.com/purchasetickets" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "gillespie-county-fair",
    organizer: organization("Gillespie County Fair & Festivals Association, Inc.", "https://gillespiefair.com/"),
    performers: [
      group("Conjunto Cats"),
      group("Pepe Tovar Y Los Chacales"),
      person("Rick Trevino"),
      group("Bellamy Brothers"),
      person("Tristan Roberson"),
      person("Tracy Byrd"),
    ],
    sources: [
      { label: "Gillespie County Fair official 2026 fair page and entertainment schedule", url: "https://gillespiefair.com/gillespie-county-fair" },
      { label: "Gillespie County Fair & Festivals Association official organization page", url: "https://gillespiefair.com/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "north-texas-fair-rodeo",
    organizer: organization("North Texas State Fair Association, Inc.", "https://ntfair.com/"),
    offers: [
      usdOffer("Monday-Wednesday adult daily admission", 20, "https://ntfair.com/tickets/"),
      usdOffer("Thursday adult daily admission", 30, "https://ntfair.com/tickets/"),
      usdOffer("Friday-Sunday adult daily admission", 25, "https://ntfair.com/tickets/"),
      usdOffer("4-day pass", 80, "https://ntfair.com/tickets/"),
      usdOffer("Season pass", 175, "https://ntfair.com/tickets/"),
      usdOffer("Child age 7-12 daily admission", 5, "https://ntfair.com/tickets/"),
      usdOffer("Child age 6 and under admission", 0, "https://ntfair.com/tickets/"),
    ],
    performers: [
      person("Braxton Keith"),
      person("Chris Cagle"),
      person("Ned LeDoux"),
      group("Jake Hooker & The Outsiders"),
      person("Kody West"),
      person("Tyce Delk"),
      person("William Clark Green"),
      person("Josh Meloy"),
      person("Aaron Watson"),
      group("Diamond Rio"),
      group("Los Pescadores Del Rio Conchos"),
    ],
    sources: [
      { label: "North Texas Fair & Rodeo official 2026 event page", url: "https://ntfair.com/" },
      { label: "North Texas Fair & Rodeo official 2026 ticket pricing", url: "https://ntfair.com/tickets/" },
      { label: "North Texas State Fair Association official 2026 entertainment announcement", url: "https://ntfair.com/north-texas-fair-rodeo-announces-2026-entertainment-lineup/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "austin-chronicle-hot-sauce-festival",
    organizer: organization("The Austin Chronicle", "https://www.austinchronicle.com/"),
    offers: [
      usdOffer("Presale admission", 20, "https://www.austinchronicle.com/hot-sauce/"),
      usdOffer("Door admission", 25, "https://www.austinchronicle.com/hot-sauce/"),
      usdOffer("Child age 6 and under admission", 0, "https://www.austinchronicle.com/hot-sauce/"),
    ],
    performers: [
      person("Lauren Lakis"),
      group("Latin Dukes"),
      group("Libby and the Loveless"),
      person("DJ Mahealani"),
    ],
    sources: [
      { label: "Austin Chronicle Hot Sauce Festival official 2026 event page", url: "https://www.austinchronicle.com/hot-sauce/" },
      { label: "Austin Chronicle official 2026 festival music lineup", url: "https://www.austinchronicle.com/music/lauren-lakis-latin-dukes-libby-and-the-loveless-and-dj-mahealani-bring-sonic-heat-to-hot-sauce-festival/" },
    ],
    verifiedAt: "2026-09-01",
  },
];
