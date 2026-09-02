import type { EventSchemaEntity, EventSchemaOffer, MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

const usdOffer = (name: string, price: number, url: string): EventSchemaOffer => ({
  name,
  price,
  priceCurrency: "USD",
  url,
});

const organization = (name: string, url: string): EventSchemaEntity => ({ type: "Organization", name, url });

// Supplemental dedicated Event leaves, official-source research wave 4.
// Only values supported by the current authority sources are emitted; unclear organizers,
// changing ticket tiers, future lineups, and rights-unclear imagery stay omitted.
export const majorEventSchemaEnrichmentBatch6: MajorEventSchemaEnrichment[] = [
  {
    slug: "fredericksburg-oktoberfest",
    organizer: organization("Pedernales Creative Arts Alliance", "https://www.oktoberfestinfbg.com/"),
    sources: [
      { label: "Fredericksburg Oktoberfest official site", url: "https://www.oktoberfestinfbg.com/" },
      { label: "Fredericksburg Oktoberfest official festival details", url: "https://www.oktoberfestinfbg.com/fest-details" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "texas-book-festival",
    organizer: organization("Texas Book Festival", "https://texasbookfestival.org/"),
    offers: [usdOffer("Festival admission", 0, "https://texasbookfestival.org/festival/")],
    sources: [
      { label: "Texas Book Festival official 2026 festival page", url: "https://texasbookfestival.org/festival/" },
      { label: "Texas Book Festival official 2026 dates announcement", url: "https://texasbookfestival.org/news/2025/12/announcing-the-2026-festival-dates/" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "houston-art-car-parade",
    organizer: organization("The Orange Show Center for Visionary Art", "https://orangeshow.org/"),
    offers: [usdOffer("Parade admission", 0, "https://www.thehoustonartcarparade.com/")],
    sources: [
      { label: "Houston Art Car Parade official site", url: "https://www.thehoustonartcarparade.com/" },
      { label: "Houston Art Car Parade official history", url: "https://www.thehoustonartcarparade.com/history-of-the-houston-art-car-para" },
      { label: "Houston Art Car Parade official FAQ", url: "https://www.thehoustonartcarparade.com/faq" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "mardi-gras-galveston",
    sources: [
      { label: "Mardi Gras! Galveston official site", url: "https://www.mardigrasgalveston.com/" },
      { label: "Mardi Gras! Galveston official 2027 parade schedule", url: "https://www.mardigrasgalveston.com/parade-schedule/" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "texas-state-forest-festival",
    sources: [
      { label: "Texas State Forest Festival official site", url: "https://www.texasstateforestfestival.com/" },
      { label: "Texas State Forest Festival official FAQ", url: "https://www.texasstateforestfestival.com/faq" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "bayou-city-art-festival-memorial-park",
    organizer: organization("Art Colony Association, Inc.", "https://www.bayoucityartfestival.com/"),
    sources: [
      { label: "Bayou City Art Festival official site", url: "https://www.bayoucityartfestival.com/" },
      { label: "Bayou City Art Festival official festival information", url: "https://www.bayoucityartfestival.com/festival-info" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "western-heritage-classic",
    organizer: organization("Western Heritage Classic", "https://www.westernheritageclassic.com/"),
    sources: [
      { label: "Western Heritage Classic official site", url: "https://www.westernheritageclassic.com/" },
      { label: "Western Heritage Classic official 2027 schedule", url: "https://www.westernheritageclassic.com/p/events/schedule" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "bob-wills-day",
    organizer: organization("Bob Wills Foundation", "https://bobwillsday.com/"),
    sources: [
      { label: "Bob Wills Day official 2027 save-the-date", url: "https://bobwillsday.com/home-2/" },
      { label: "Bob Wills Foundation official annual-tradition page", url: "https://bobwillsday.com/bwd-2/" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "lone-star-cowboy-poetry-gathering-alpine",
    organizer: organization("Lone Star Cowboy Poetry Gathering", "https://lonestarcowboypoetry.com/"),
    sources: [
      { label: "Lone Star Cowboy Poetry Gathering official Alpine 2027 page", url: "https://lonestarcowboypoetry.com/2027/alpine/index.html" },
      { label: "Lone Star Cowboy Poetry Gathering official welcome page", url: "https://lonestarcowboypoetry.com/welcome/index.html" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "lone-star-cowboy-poetry-gathering-bastrop",
    organizer: organization("Lone Star Cowboy Poetry Gathering", "https://lonestarcowboypoetry.com/"),
    sources: [
      { label: "Lone Star Cowboy Poetry Gathering official Bastrop 2027 page", url: "https://lonestarcowboypoetry.com/2027/bastrop/index.html" },
      { label: "Lone Star Cowboy Poetry Gathering official welcome page", url: "https://lonestarcowboypoetry.com/welcome/index.html" },
    ],
    verifiedAt: "2026-09-02",
  },
];
