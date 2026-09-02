import type { EventSchemaEntity, EventSchemaOffer, MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

const usdOffer = (name: string, price: number, url: string): EventSchemaOffer => ({ name, price, priceCurrency: "USD", url });
const organization = (name: string, url: string): EventSchemaEntity => ({ type: "Organization", name, url });
const group = (name: string, url?: string): EventSchemaEntity => ({ type: "PerformingGroup", name, ...(url ? { url } : {}) });
const person = (name: string, url?: string): EventSchemaEntity => ({ type: "Person", name, ...(url ? { url } : {}) });

// Official-source review of supplemental major-event leaves. Properties tied to a prior-year
// price or lineup are intentionally omitted from recurrence-derived future occurrences.
export const majorEventSchemaEnrichmentBatch3: MajorEventSchemaEnrichment[] = [
  {
    slug: "dobie-dichos",
    organizer: organization("Dobie Dichos, Inc.", "https://www.dobiedichos.com/"),
    offers: [
      usdOffer("Adult program and meal", 30, "https://www.dobiedichos.com/tickets-schedule"),
      usdOffer("Child 12 and under program and meal", 10, "https://www.dobiedichos.com/tickets-schedule"),
      usdOffer("Adult program only", 20, "https://www.dobiedichos.com/tickets-schedule"),
      usdOffer("Child 12 and under program only", 5, "https://www.dobiedichos.com/tickets-schedule"),
    ],
    sources: [
      { label: "Dobie Dichos official 2026 tickets and schedule", url: "https://www.dobiedichos.com/tickets-schedule" },
      { label: "Dobie Dichos official site", url: "https://www.dobiedichos.com/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "dallas-holiday-parade",
    organizer: organization("HTEDance and Spirit Group", "https://dallasholidayparade.com/"),
    sources: [
      { label: "Dallas Holiday Parade official history and current production information", url: "https://dallasholidayparade.com/" },
      { label: "Dallas Holiday Parade official visitor guidance", url: "https://dallasholidayparade.com/things-to-know" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "schulenburg-festival",
    organizer: organization("Schulenburg Festival Association, Inc.", "https://www.schulenburgfestival.org/"),
    sources: [
      { label: "Schulenburg Festival official site and association identity", url: "https://www.schulenburgfestival.org/" },
      { label: "Schulenburg Festival official ticket information", url: "https://www.schulenburgfestival.org/tickets" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "westfest",
    organizer: organization("Westfest Inc.", "https://westfest.com/"),
    sources: [
      { label: "Westfest official site", url: "https://westfest.com/" },
      { label: "Westfest official contact identifying Westfest Inc.", url: "https://westfest.com/contact" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "luling-watermelon-thump",
    organizer: organization("Luling Watermelon Thump Association", "https://www.watermelonthump.com/"),
    sources: [
      { label: "Luling Watermelon Thump official site", url: "https://www.watermelonthump.com/" },
      { label: "Official parade form identifying the Luling Watermelon Thump Association", url: "https://www.watermelonthump.com/parade-form" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "national-polka-festival",
    organizer: organization("National Polka Festival", "https://www.nationalpolkafestival.com/"),
    sources: [
      { label: "National Polka Festival official site", url: "https://www.nationalpolkafestival.com/" },
      { label: "National Polka Festival official ticket information", url: "https://www.nationalpolkafestival.com/purchasetickets" },
      { label: "National Polka Festival official band page", url: "https://www.nationalpolkafestival.com/polkabands" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "gillespie-county-fair",
    organizer: organization("Gillespie County Fair & Festivals Association, Inc.", "https://gillespiefair.com/"),
    sources: [
      { label: "Gillespie County Fair & Festivals Association official site", url: "https://gillespiefair.com/" },
      { label: "Gillespie County Fair official fair page", url: "https://gillespiefair.com/gillespie-county-fair" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "north-texas-fair-rodeo",
    organizer: organization("North Texas State Fair Association, Inc.", "https://ntfair.com/"),
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
      { label: "North Texas Fair & Rodeo official 2026 entertainment announcement", url: "https://ntfair.com/north-texas-fair-rodeo-announces-2026-entertainment-lineup/" },
      { label: "North Texas Fair & Rodeo official site", url: "https://ntfair.com/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "austin-chronicle-hot-sauce-festival",
    organizer: organization("The Austin Chronicle", "https://www.austinchronicle.com/"),
    offers: [
      usdOffer("Presale admission", 20, "https://www.austinchronicle.com/hot-sauce/"),
      usdOffer("Door admission", 25, "https://www.austinchronicle.com/hot-sauce/"),
    ],
    performers: [
      person("Lauren Lakis"),
      group("Latin Dukes"),
      group("Libby and the Loveless"),
      person("DJ Mahealani"),
    ],
    sources: [
      { label: "Austin Chronicle Hot Sauce Festival official 2026 page", url: "https://www.austinchronicle.com/hot-sauce/" },
      { label: "Austin Chronicle 2026 festival competition and ticket update", url: "https://www.austinchronicle.com/food/food-events/meet-your-2026-hot-sauce-competition-entrants/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "sandhills-stock-show-rodeo",
    organizer: organization("SandHills Stock Show & Rodeo", "https://sandhillsstockshow.com/"),
    sources: [
      { label: "SandHills Stock Show & Rodeo official site", url: "https://sandhillsstockshow.com/" },
      { label: "Ector County Coliseum event calendar", url: "https://www.axs.com/venues/100925/ector-county-coliseum-odessa-tickets" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "sweetwater-rattlesnake-roundup",
    organizer: organization("Sweetwater Jaycees", "http://www.rattlesnakeroundup.net/"),
    sources: [
      { label: "Sweetwater Jaycees Rattlesnake Roundup official site", url: "http://www.rattlesnakeroundup.net/" },
      { label: "City of Sweetwater visitor guide", url: "https://www.sweetwatertx.gov/159/Visit-Sweetwater" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "granbury-founders-day-jubilee",
    organizer: organization("Historic Granbury Merchants Association", "https://granburysquare.com/"),
    sources: [
      { label: "Historic Granbury Merchants Association annual festivals page", url: "https://granburysquare.com/annual-festivals-events/" },
      { label: "Historic Granbury Merchants Association Founder's Day event record", url: "https://granburysquare.com/event/granbury-founders-day-jubilee-and-cook-off-4/2025-03-14/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "galveston-juneteenth-celebrations",
    sources: [
      { label: "Visit Galveston official Juneteenth celebrations guide", url: "https://www.visitgalveston.com/events/annual-events/juneteenth/" },
      { label: "Visit Galveston official annual-events calendar", url: "https://www.visitgalveston.com/events/annual-events/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "larry-joe-taylor-texas-music-festival",
    organizer: organization("LJT Texas Music Festival", "https://ljtfest.com/"),
    sources: [
      { label: "LJT Fest official 2027 event site", url: "https://ljtfest.com/" },
      { label: "LJT Fest official lineup page", url: "https://ljtfest.com/lineup" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "san-antonio-marathon",
    organizer: organization("San Antonio Sports", "https://sanantoniosports.org/"),
    sources: [
      { label: "San Antonio Marathon official 2026 site identifying San Antonio Sports", url: "https://sanantoniomarathon.com/" },
      { label: "San Antonio Marathon official FAQ", url: "https://sanantoniomarathon.com/faqs/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "rockport-art-festival",
    organizer: organization("Rockport Center for the Arts", "https://www.rockportartcenter.com/"),
    performers: [person("Joe McDermott", "https://www.joemcdermottmusic.com")],
    sources: [
      { label: "Rockport Center for the Arts official 2026 Art Festival page", url: "https://www.rockportartcenter.com/artfest" },
      { label: "Rockport Center for the Arts 2026 festival announcement", url: "https://www.rockportartcenter.com/news-press-releases/58thannualartfest" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "viva-el-paso",
    sources: [
      { label: "Viva! El Paso official site", url: "https://vivaelpaso.org/" },
      { label: "Viva! El Paso official audition notice identifying EPIC Arts, El Paso Community Foundation and El Paso Live as presenters", url: "https://vivaelpaso.org/auditions" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "texas-shakespeare-festival",
    organizer: organization("Texas Shakespeare Festival", "https://www.texasshakespeare.com/"),
    sources: [
      { label: "Texas Shakespeare Festival official site", url: "https://www.texasshakespeare.com/" },
      { label: "Texas Shakespeare Festival official about page", url: "https://www.texasshakespeare.com/about" },
      { label: "Texas Shakespeare Festival current season", url: "https://www.texasshakespeare.com/2027-season" },
    ],
    verifiedAt: "2026-09-01",
  },
];
