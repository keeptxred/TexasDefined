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

// Supplemental dedicated Event leaves, official-source research wave 3.
// Only current occurrence prices and announced participants are emitted. Rights-unclear promotional imagery remains omitted.
export const majorEventSchemaEnrichmentBatch5: MajorEventSchemaEnrichment[] = [
  {
    slug: "comicpalooza",
    organizer: organization("Comicpalooza LLC", "https://www.comicpalooza.com/"),
    sources: [
      { label: "Comicpalooza official 2026 guest roster", url: "https://www.comicpalooza.com/guests/" },
      { label: "Comicpalooza official code of conduct — Comicpalooza LLC management", url: "https://www.comicpalooza.com/general-information/health-and-safety/codeofconduct/" },
      { label: "Comicpalooza official terms and conditions", url: "https://www.comicpalooza.com/policies/terms-and-conditions/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "tejano-conjunto-festival",
    organizer: organization("Guadalupe Cultural Arts Center", "https://guadalupeculturalarts.org/"),
    performers: [
      group("Jessie Perez y Sus Compadres"),
      group("Los Tellez"),
      group("Conjunto Con Todo"),
      group("South Texas Homies"),
      group("Ruben De La Cruz Y Su Conjunto"),
      group("Los Garcia Brothers"),
      group("Santiago Garza y La Naturaleza"),
      group("Elijah Ezequiel Y Los Conjunto Addictos"),
      group("Fruity Villarreal Y Los Mavericks"),
      group("J. Castillo Y Los All Stars"),
      group("Ruben Garza Y Su Conjunto"),
      group("Los Cucuys de Rodney Rodriguez"),
      group("Los Monarcas de Mario y Pete Diaz"),
      group("Da Krazy Pimpz"),
      person("Lazaro Perez"),
      group("Ricky Naranjo Y Los Gamblers"),
      group("DeVozion"),
      group("Los Estrellas De Oro"),
      group("Cindy Ramos Y Su Conjunto"),
    ],
    sources: [
      { label: "Guadalupe Cultural Arts Center — 44th Annual Tejano Conjunto Festival 2026 lineup", url: "https://guadalupeculturalarts.org/tejano-conjunto-festival/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "great-texas-balloon-race",
    organizer: organization("Great Texas Balloon Race", "https://gtbr.net/"),
    offers: [
      usdOffer("Friday night admission", 20, "https://gtbr.net/buy-tickets/"),
      usdOffer("Saturday night admission", 25, "https://gtbr.net/buy-tickets/"),
      usdOffer("Friday + Saturday weekend pass", 40, "https://gtbr.net/buy-tickets/"),
      usdOffer("Child age 12 and under admission", 0, "https://gtbr.net/buy-tickets/"),
    ],
    performers: [group("L.A. Roxx"), person("Wes Jeans"), group("Roses & Weeds"), person("Sunny Sweeney")],
    sources: [
      { label: "Great Texas Balloon Race official 2026 ticket pricing and music lineup", url: "https://gtbr.net/buy-tickets/" },
      { label: "Great Texas Balloon Race official 2026 event site", url: "https://gtbr.net/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "hidalgo-borderfest",
    organizer: organization("City of Hidalgo", "https://www.hidalgoborderfest.com/"),
    offers: [
      usdOffer("Sunday adult one-day admission", 18, "https://tickets.hidalgoborderfest.com/p/tickets"),
    ],
    sources: [
      { label: "Hidalgo BorderFest official About page — staged by the City of Hidalgo", url: "https://www.hidalgoborderfest.com/aboutborderfest" },
      { label: "Hidalgo BorderFest official 2026 ticket portal", url: "https://tickets.hidalgoborderfest.com/p/tickets" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "austin-reggae-festival",
    organizer: organization("Reggae Rise Up", "https://reggaeriseup.com/texas/"),
    offers: [
      usdOffer("GA 3-day ticket", 124, "https://reggaeriseup.com/texas/gatickets/"),
      usdOffer("GA+ 3-day ticket", 139, "https://reggaeriseup.com/texas/gatickets/"),
      usdOffer("GA Friday ticket — current tier", 54, "https://reggaeriseup.com/texas/gatickets/"),
      usdOffer("GA Saturday ticket — current tier", 54, "https://reggaeriseup.com/texas/gatickets/"),
      usdOffer("GA Sunday ticket — current tier", 54, "https://reggaeriseup.com/texas/gatickets/"),
    ],
    performers: [
      person("Stephen Marley"),
      person("Original Koffee"),
      group("Iration"),
      group("Steel Pulse"),
      person("Collie Buddz"),
      group("Tribal Seeds"),
      group("Fortunate Youth"),
      person("HIRIE"),
      person("Protoje"),
      person("Jesse Royal"),
      person("Mike Love"),
      person("Eli-Mac"),
      person("Zion Marley"),
      group("Groundation"),
      person("Irie Souljah"),
      person("Cas Haley"),
      group("Through The Roots"),
      person("Rik Jam"),
      group("Audic Empire"),
    ],
    sources: [
      { label: "Reggae Rise Up official Austin Reggae Festival 2026 information", url: "https://reggaeriseup.com/texas/texas-festival-info/" },
      { label: "Reggae Rise Up official Austin Reggae Festival 2026 GA tickets", url: "https://reggaeriseup.com/texas/gatickets/" },
      { label: "Reggae Rise Up official Austin Reggae Festival 2026 lineup", url: "https://reggaeriseup.com/texas/lineup/" },
      { label: "Reggae Rise Up acquisition announcement for Austin Reggae Festival", url: "https://reggaeriseup.com/texas/austin-reggae-festival-press-release/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "texas-outdoor-musical",
    organizer: organization("Texas Panhandle Heritage Foundation, Inc.", "https://www.texas-show.com/"),
    sources: [
      { label: "TEXAS Outdoor Musical official 2026 group information — produced by Texas Panhandle Heritage Foundation, Inc.", url: "https://www.texas-show.com/p/about/tickets/groups" },
      { label: "Texas Panhandle Heritage Foundation official About page", url: "https://www.texas-show.com/p/support/about-tphf" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "washington-on-the-brazos-texas-independence-day",
    offers: [
      usdOffer("Texas Independence Day Celebration admission", 0, "https://wheretexasbecametexas.org/events/texas-independence-day-celebration-8/"),
    ],
    sources: [
      { label: "Washington-on-the-Brazos official 2026 Texas Independence Day Celebration — free admission", url: "https://wheretexasbecametexas.org/events/texas-independence-day-celebration-8/" },
      { label: "Washington-on-the-Brazos official 2026 special-events calendar", url: "https://wheretexasbecametexas.org/special-events" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "great-american-scrapbook-convention",
    organizer: organization("CK Scrapbook Events, LLC", "https://www.ckscrapbookevents.com/"),
    sources: [
      { label: "CK Scrapbook Events official 2027 calendar — GASC Mesquite", url: "https://www.ckscrapbookevents.com/" },
      { label: "Great American Scrapbook Convention official event section", url: "https://www.ckscrapbookevents.com/Great-American/GASC-Arlington" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "the-very-rary",
    organizer: organization("The Contemporary Austin", "https://thecontemporaryaustin.org/"),
    offers: [
      usdOffer("General admission", 40, "https://thecontemporaryaustin.org/event/the-very-rary-2026/"),
      usdOffer("Member admission", 35, "https://thecontemporaryaustin.org/event/the-very-rary-2026/"),
    ],
    performers: [person("Ms. Monica"), group("Magecraft Sounds"), group("Strummclub")],
    sources: [
      { label: "The Contemporary Austin official The Very ‘Rary 2026 event page", url: "https://thecontemporaryaustin.org/event/the-very-rary-2026/" },
      { label: "The Contemporary Austin official annual The Very ‘Rary page", url: "https://thecontemporaryaustin.org/the-very-rary/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "marfa-lights-festival",
    sources: [
      { label: "Visit Marfa official 39th Annual Marfa Lights Festival listing", url: "https://visitmarfa.com/events/39th-annual-marfa-lights-festival" },
      { label: "Visit Marfa official events calendar", url: "https://visitmarfa.com/events" },
    ],
    verifiedAt: "2026-09-01",
  },
];
