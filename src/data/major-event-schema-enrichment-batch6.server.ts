import type { EventSchemaEntity, EventSchemaOffer, MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

const usdOffer = (name: string, price: number, url: string): EventSchemaOffer => ({
  name,
  price,
  priceCurrency: "USD",
  url,
});

const organization = (name: string, url: string): EventSchemaEntity => ({ type: "Organization", name, url });
const group = (name: string): EventSchemaEntity => ({ type: "PerformingGroup", name });
const person = (name: string): EventSchemaEntity => ({ type: "Person", name });

// Supplemental dedicated Event leaves, official-source research wave 4.
// Recurrence-derived 2027 pages do not inherit prior-year ticket prices or lineups.
// Promotional images remain omitted unless Texas Defined can publish a representative image with clear reuse rights.
export const majorEventSchemaEnrichmentBatch6: MajorEventSchemaEnrichment[] = [
  {
    slug: "fredericksburg-oktoberfest",
    organizer: organization("Pedernales Creative Arts Alliance (PCAA)", "https://www.oktoberfestinfbg.com/about-pcaa"),
    offers: [
      usdOffer("Adult daily admission", 15, "https://www.oktoberfestinfbg.com/product-page/adult-tickets"),
      usdOffer("Adult 2-day pass", 20, "https://www.oktoberfestinfbg.com/category/all-products"),
      usdOffer("Adult 3-day pass", 25, "https://www.oktoberfestinfbg.com/category/all-products"),
      usdOffer("Child age 7-12 daily admission", 1, "https://www.oktoberfestinfbg.com/category/all-products"),
      usdOffer("Child under age 6 admission", 0, "https://www.oktoberfestinfbg.com/fest-facts"),
    ],
    performers: [
      group("Czech & Then Some"),
      group("Seven Dutchmen"),
      group("Czechaholics"),
      group("TubaMeisters"),
      group("Red Ravens"),
      group("Walburg Boys"),
      group("The Oompahs"),
      group("Yodel Blitz"),
      group("Ennis Czech Boys"),
      person("Chris Rybak"),
      group("Jodie Mikula Orchestra"),
      group("Round Top Brass Band"),
    ],
    sources: [
      { label: "Fredericksburg Oktoberfest official 2026 admission and ticket information", url: "https://www.oktoberfestinfbg.com/category/all-products" },
      { label: "Fredericksburg Oktoberfest official 2026 music schedule", url: "https://www.oktoberfestinfbg.com/music-bands" },
      { label: "PCAA official Oktoberfest background", url: "https://www.oktoberfestinfbg.com/about-pcaa" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "texas-book-festival",
    organizer: organization("Texas Book Festival", "https://texasbookfestival.org/"),
    offers: [
      usdOffer("General festival admission", 0, "https://texasbookfestival.org/festival/"),
    ],
    sources: [
      { label: "Texas Book Festival official 2026 festival page", url: "https://texasbookfestival.org/festival/" },
      { label: "Texas Book Festival official 2026 FAQ", url: "https://texasbookfestival.org/2026-faq-for-publishers-and-invited-festival-authors/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "houston-art-car-parade",
    organizer: organization("Orange Show Center for Visionary Art", "https://orangeshow.org/"),
    offers: [
      usdOffer("Public parade viewing", 0, "https://www.thehoustonartcarparade.com/participate"),
    ],
    sources: [
      { label: "Houston Art Car Parade official FAQ", url: "https://www.thehoustonartcarparade.com/faq" },
      { label: "Houston Art Car Parade official participation and spectator page", url: "https://www.thehoustonartcarparade.com/participate" },
      { label: "Houston Art Car Parade official sponsorship page — Orange Show production", url: "https://www.thehoustonartcarparade.com/become-a-sponsor" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "mardi-gras-galveston",
    organizer: organization("Yaga’s Entertainment", "https://www.mardigrasgalveston.com/"),
    occurrences: {
      "Fat Tuesday": {
        offers: [usdOffer("Fat Tuesday public admission", 0, "https://www.mardigrasgalveston.com/faqs/")],
      },
    },
    sources: [
      { label: "Mardi Gras! Galveston official 2027 vendor information — Yaga’s Entertainment", url: "https://www.mardigrasgalveston.com/vendors/" },
      { label: "Mardi Gras! Galveston official admission FAQ", url: "https://www.mardigrasgalveston.com/faqs/" },
      { label: "Mardi Gras! Galveston official 2027 balcony ticket status", url: "https://www.mardigrasgalveston.com/balcony-tickets/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "texas-state-forest-festival",
    organizer: organization("Lufkin/Angelina County Chamber of Commerce", "https://www.lufkintexas.org/"),
    offers: [
      usdOffer("General admission", 8, "https://www.texasstateforestfestival.com/faq"),
      usdOffer("Child age 3 and under admission", 0, "https://www.texasstateforestfestival.com/faq"),
    ],
    sources: [
      { label: "Texas State Forest Festival official 2026 event page", url: "https://www.texasstateforestfestival.com/" },
      { label: "Texas State Forest Festival official 2026 FAQ and admission pricing", url: "https://www.texasstateforestfestival.com/faq" },
      { label: "Texas State Forest Festival official festival information", url: "https://www.texasstateforestfestival.com/festival-info" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "bayou-city-art-festival-memorial-park",
    organizer: organization("Art Colony Association, Inc.", "https://www.bayoucityartfestival.com/about-us"),
    sources: [
      { label: "Bayou City Art Festival official producer information", url: "https://www.bayoucityartfestival.com/about-us" },
      { label: "Bayou City Art Festival Memorial Park official 2026 information", url: "https://www.bayoucityartfestival.com/festival-info" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "western-heritage-classic",
    organizer: organization("Western Heritage Classic", "https://www.westernheritageclassic.com/"),
    sources: [
      { label: "Western Heritage Classic official team and staff page", url: "https://www.westernheritageclassic.com/p/about-/whc-team" },
      { label: "Western Heritage Classic official 2027 ticket information", url: "https://www.westernheritageclassic.com/p/tickets--deals" },
      { label: "Western Heritage Classic official event history", url: "https://www.westernheritageclassic.com/p/about-/history" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "bob-wills-day",
    organizer: organization("Bob Wills Foundation", "https://bobwillsday.com/bwd-2/"),
    sources: [
      { label: "Bob Wills Foundation official event history", url: "https://bobwillsday.com/bwd-2/" },
      { label: "Bob Wills Day official 2027 save-the-date", url: "https://bobwillsday.com/home-2/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "lone-star-cowboy-poetry-gathering-alpine",
    organizer: organization("Lone Star Cowboy Poetry Gathering", "https://lonestarcowboypoetry.com/"),
    sources: [
      { label: "Lone Star Cowboy Poetry Gathering official 2027 Alpine page", url: "https://lonestarcowboypoetry.com/2027/alpine/index.html" },
      { label: "Lone Star Cowboy Poetry Gathering official welcome and event-production page", url: "https://lonestarcowboypoetry.com/welcome/index.html" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "lone-star-cowboy-poetry-gathering-bastrop",
    organizer: organization("Lone Star Cowboy Poetry Gathering", "https://lonestarcowboypoetry.com/"),
    sources: [
      { label: "Lone Star Cowboy Poetry Gathering official 2027 Bastrop page", url: "https://lonestarcowboypoetry.com/2027/bastrop/index.html" },
      { label: "Lone Star Cowboy Poetry Gathering official welcome and event-production page", url: "https://lonestarcowboypoetry.com/welcome/index.html" },
    ],
    verifiedAt: "2026-09-01",
  },
];
