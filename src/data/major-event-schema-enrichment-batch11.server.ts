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

// Supplemental dedicated Event leaves, official-source research wave 9.
// Only occurrence-matched prices and announced performers are emitted. Rights-unclear promotional imagery remains omitted.
export const majorEventSchemaEnrichmentBatch11: MajorEventSchemaEnrichment[] = [
  {
    slug: "original-round-top-antiques-fair",
    organizer: organization("Original Round Top Antiques Fair", "https://www.roundtoptexasantiques.com/"),
    offers: [
      usdOffer("VIP early shopping", 25, "https://www.roundtoptexasantiques.com/ticket-info"),
      usdOffer("General admission", 10, "https://www.roundtoptexasantiques.com/ticket-info"),
    ],
    sources: [
      { label: "Original Round Top Antiques Fair official Fall Show 2026", url: "https://www.roundtoptexasantiques.com/" },
      { label: "Original Round Top Antiques Fair official 2026 ticket information", url: "https://www.roundtoptexasantiques.com/ticket-info" },
    ],
    verifiedAt: "2026-09-03",
  },
  {
    slug: "fort-worth-food-wine-festival",
    organizer: organization("Fort Worth Food + Wine Foundation", "https://fwfwf.org/"),
    offers: [
      usdOffer("Tacos + Tequila general admission", 75, "https://fwfwf.org/events/"),
      usdOffer("The Main Event general admission", 145, "https://fwfwf.org/events/"),
      usdOffer("Fork + Fire general admission", 105, "https://fwfwf.org/events/"),
      usdOffer("The Big Brunch general admission", 75, "https://fwfwf.org/events/"),
    ],
    sources: [
      { label: "Fort Worth Food + Wine Foundation official festival page", url: "https://fwfwf.org/festival/" },
      { label: "Fort Worth Food + Wine Foundation official 2027 events and ticket prices", url: "https://fwfwf.org/events/" },
      { label: "Fort Worth Food + Wine Foundation official organization information", url: "https://fwfwf.org/contact/" },
    ],
    verifiedAt: "2026-09-03",
  },
  {
    slug: "houston-cinema-arts-festival",
    organizer: organization("Houston Cinema Arts Society", "https://www.cinemahtx.org/"),
    sources: [
      { label: "Houston Cinema Arts Society official 2026 festival page", url: "https://www.cinemahtx.org/hcaf/" },
      { label: "Houston Cinema Arts Society official staff page — festival production", url: "https://www.cinemahtx.org/staff/" },
    ],
    verifiedAt: "2026-09-03",
  },
  {
    slug: "heart-o-texas-fair-rodeo",
    organizer: organization("Heart O' Texas Fair & Rodeo", "https://www.hotfair.com/"),
    sources: [
      { label: "Heart O' Texas Fair & Rodeo official 2026 site", url: "https://www.hotfair.com/" },
      { label: "Heart O' Texas Fair & Rodeo official nonprofit About page", url: "https://www.hotfair.com/about.aspx" },
      { label: "Heart O' Texas Fair & Rodeo official 2026 tickets", url: "https://www.hotfair.com/p/tickets" },
    ],
    verifiedAt: "2026-09-03",
  },
  {
    slug: "east-texas-state-fair",
    organizer: organization("The Park of East Texas, Inc.", "https://www.etstatefair.com/"),
    offers: [
      usdOffer("Adult grounds admission", 12, "https://www.etstatefair.com/p/tickets"),
      usdOffer("Adult grounds admission presale", 10, "https://www.etstatefair.com/p/tickets"),
      usdOffer("Child age 3-12 grounds admission", 6, "https://www.etstatefair.com/p/tickets"),
    ],
    sources: [
      { label: "East Texas State Fair official 2026 tickets", url: "https://www.etstatefair.com/p/tickets" },
      { label: "The Park of East Texas official organization information", url: "https://www.etstatefair.com/p/about-us" },
    ],
    verifiedAt: "2026-09-03",
  },
  {
    slug: "conroe-cajun-catfish-festival",
    organizer: organization("Friends of Conroe", "https://www.friendsofconroe.com/"),
    offers: [
      usdOffer("Single-day early-bird admission", 15, "https://www.friendsofconroe.com/p/catfishfestival/tickets-and-packages"),
      usdOffer("Weekend-pass early-bird admission", 30, "https://www.friendsofconroe.com/p/catfishfestival/tickets-and-packages"),
      usdOffer("Child age 12 and under admission", 0, "https://www.friendsofconroe.com/p/catfishfestival/tickets-and-packages"),
    ],
    sources: [
      { label: "Friends of Conroe official festival producer information", url: "https://www.friendsofconroe.com/" },
      { label: "Conroe Cajun Catfish Festival official 2026 tickets", url: "https://www.friendsofconroe.com/p/catfishfestival/tickets-and-packages" },
    ],
    verifiedAt: "2026-09-03",
  },
  {
    slug: "comal-county-fair-rodeo",
    organizer: organization("Comal County Fair Association", "https://comalcountyfair.org/"),
    offers: [
      usdOffer("Thursday-Friday adult fair admission", 10, "https://comalcountyfair.org/times-and-tickets/"),
      usdOffer("Child age 6-11 fair admission", 5, "https://comalcountyfair.org/times-and-tickets/"),
      usdOffer("Child under age 6 fair admission", 0, "https://comalcountyfair.org/times-and-tickets/"),
    ],
    sources: [
      { label: "Comal County Fair Association official 2026 fair site", url: "https://comalcountyfair.org/" },
      { label: "Comal County Fair & Rodeo official 2026 times and tickets", url: "https://comalcountyfair.org/times-and-tickets/" },
      { label: "Comal County Fair Association official membership page", url: "https://comalcountyfair.org/join-ccfa-association/" },
    ],
    verifiedAt: "2026-09-03",
  },
  {
    slug: "cuero-turkeyfest",
    organizer: organization("Cuero Fair and Turkey Trot Association", "https://www.turkeyfest.org/"),
    sources: [
      { label: "Cuero Turkeyfest official 2026 site", url: "https://www.turkeyfest.org/" },
      { label: "Cuero Turkeyfest official organization history", url: "https://www.turkeyfest.org/our-story" },
      { label: "Cuero Turkeyfest official ticket page", url: "https://www.turkeyfest.org/tickets" },
    ],
    verifiedAt: "2026-09-03",
  },
  {
    slug: "come-and-take-it-celebration",
    organizer: organization("Come and Take It Committee", "https://comeandtakeitcelebration.com/"),
    performers: [
      person("Ace Boone"),
      person("David Farias"),
      group("Jase Martin and the Standing Peppers"),
      group("Mariachi Los Gavilanes"),
      person("Reagan Hicks"),
      person("Paul Wall"),
      group("Shiner Hobo Band"),
    ],
    sources: [
      { label: "Come and Take It Celebration official 2026 events and musical acts", url: "https://comeandtakeitcelebration.com/event/" },
      { label: "Come and Take It Celebration official performer page identifying the organizing committee", url: "https://comeandtakeitcelebration.com/event/reagan-hicks/" },
    ],
    verifiedAt: "2026-09-03",
  },
  {
    slug: "texas-mushroom-festival",
    sources: [
      { label: "Texas Mushroom Festival official 2026 site", url: "https://txmushfest.org/" },
      { label: "Texas Mushroom Festival official organizer contact — Texas Mushroom Festival Board", url: "https://txmushfest.org/faq/where-can-i-contact-the-organizer-with-any-questions/" },
    ],
    verifiedAt: "2026-09-03",
  },
];
