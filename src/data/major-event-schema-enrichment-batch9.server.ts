import type { EventSchemaEntity, EventSchemaOffer, MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

const usdOffer = (name: string, price: number, url: string): EventSchemaOffer => ({
  name,
  price,
  priceCurrency: "USD",
  url,
});

const organization = (name: string, url: string): EventSchemaEntity => ({ type: "Organization", name, url });

// Supplemental dedicated Event leaves, official-source research wave 7.
// Dynamic race pricing, not-yet-announced lineups, and rights-unclear promotional imagery remain omitted.
export const majorEventSchemaEnrichmentBatch9: MajorEventSchemaEnrichment[] = [
  {
    slug: "chevron-houston-marathon",
    organizer: organization("Houston Marathon Committee", "https://www.chevronhoustonmarathon.com/about-hmc/houston-marathon-committee/"),
    sources: [
      { label: "Houston Marathon Committee official organization page", url: "https://www.chevronhoustonmarathon.com/about-hmc/houston-marathon-committee/" },
      { label: "Chevron Houston Marathon official 2027 registration", url: "https://www.chevronhoustonmarathon.com/participants/registration/" },
      { label: "Chevron Houston Marathon official race-weekend schedule", url: "https://www.chevronhoustonmarathon.com/race-weekend/schedule/" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "spurs-austin-international-half",
    organizer: organization("High Five Events", "https://downhilltodowntown.com/"),
    sources: [
      { label: "Spurs Austin International Half official 2027 site", url: "https://downhilltodowntown.com/" },
      { label: "Spurs Austin International Half official 2027 registration announcement", url: "https://downhilltodowntown.com/spurs-austin-international-half-launches-2027-registration-with-weeklong-community-celebration/" },
      { label: "Spurs Austin International Half official High Five Events background", url: "https://downhilltodowntown.com/austin-international-half-joins-forces-with-austin-marathon-for-run-austin-launch-week/" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "atx-open",
    offers: [
      usdOffer("Opening Round package — starting price", 229, "https://atxopen.com/ticket-packages/"),
      usdOffer("Championship Weekend package — starting price", 238, "https://atxopen.com/ticket-packages/"),
      usdOffer("Duration Reserved package — starting price", 553, "https://atxopen.com/ticket-packages/"),
    ],
    sources: [
      { label: "ATX Open official 2027 event information", url: "https://atxopen.com/event-info/" },
      { label: "ATX Open official 2027 ticket packages", url: "https://atxopen.com/ticket-packages/" },
      { label: "ATX Open official 2027 single-session tickets", url: "https://atxopen.com/daily-tickets/" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "austin-e-prix",
    organizer: organization("Formula E", "https://www.fiaformulae.com/"),
    sources: [
      { label: "Formula E and FIA official 2026-27 calendar announcement", url: "https://www.fiaformulae.com/en/news/1074657/formula-e-and-fia-unveil-record-breaking-21-race-2026-27-calendar-for-gen4-era" },
      { label: "Formula E official Season 13 calendar", url: "https://www.fiaformulae.com/en/news/1074658/season-13-calendar-where-will-formula-e-be-racing-in-2026-27" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "nascar-at-cota",
    organizer: organization("NASCAR at COTA", "https://www.nascaratcota.com/"),
    sources: [
      { label: "NASCAR at COTA official 2027 weekend announcement", url: "https://www.nascaratcota.com/news/nascar-returns-circuit-americas-for-seventh-consecutive-year-march.html" },
      { label: "NASCAR at COTA official 2027 ticket site", url: "https://www.nascaratcota.com/" },
      { label: "NASCAR at COTA official DuraMAX Texas Grand Prix page", url: "https://www.nascaratcota.com/events/duramax-texas-grand-prix/" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "texas-motor-speedway-nascar-weekend",
    organizer: organization("Texas Motor Speedway", "https://www.texasmotorspeedway.com/"),
    sources: [
      { label: "Texas Motor Speedway official 2027 NASCAR tripleheader announcement", url: "https://www.texasmotorspeedway.com/media/news/texas-motor-speedway-host-nascar-tripleheader-weekend-april-may.html" },
      { label: "Texas Motor Speedway official site", url: "https://www.texasmotorspeedway.com/" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "autumn-at-the-arboretum",
    organizer: organization("Dallas Arboretum and Botanical Garden", "https://www.dallasarboretum.org/"),
    offers: [
      usdOffer("Adult admission Monday-Thursday", 21.95, "https://www.dallasarboretum.org/visitor-information/hours-and-admission/"),
      usdOffer("Adult admission Friday-Sunday", 25.95, "https://www.dallasarboretum.org/visitor-information/hours-and-admission/"),
      usdOffer("Child admission Monday-Thursday", 17.95, "https://www.dallasarboretum.org/visitor-information/hours-and-admission/"),
      usdOffer("Child admission Friday-Sunday", 21.95, "https://www.dallasarboretum.org/visitor-information/hours-and-admission/"),
    ],
    sources: [
      { label: "Dallas Arboretum official Autumn at the Arboretum page", url: "https://www.dallasarboretum.org/autumn-at-the-arboretum/" },
      { label: "Dallas Arboretum official hours and admission", url: "https://www.dallasarboretum.org/visitor-information/hours-and-admission/" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "austin-powwow",
    organizer: organization("Native American Cultural Center", "https://austinpowwow.net/"),
    offers: [usdOffer("Child under 12 admission", 0, "https://austinpowwow.net/")],
    sources: [
      { label: "Austin Powwow official 2026 event page", url: "https://austinpowwow.net/" },
      { label: "Austin Powwow official organizer background", url: "https://austinpowwow.net/about-austin-powwow/" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "ford-holiday-river-parade",
    organizer: organization("Visit San Antonio", "https://www.thesanantonioriverwalk.com/"),
    sources: [
      { label: "San Antonio River Walk official Ford Holiday River Parade page", url: "https://www.thesanantonioriverwalk.com/events/ford-holiday-river-parade/" },
      { label: "San Antonio River Walk official events calendar", url: "https://www.thesanantonioriverwalk.com/events/" },
      { label: "San Antonio River Walk official event participation page", url: "https://www.thesanantonioriverwalk.com/get-involved/" },
    ],
    verifiedAt: "2026-09-02",
  },
  {
    slug: "houston-ballet-nutcracker-market",
    organizer: organization("Houston Ballet Foundation", "https://www.houstonballet.org/"),
    offers: [
      usdOffer("Early Bird admission", 60, "https://www.houstonballet.org/support-us/special-events/nutcracker-market/tickets-events/nutcracker-market-tickets/early-bird-admission/"),
    ],
    sources: [
      { label: "Houston Ballet Nutcracker Market official 2026 page", url: "https://www.houstonballet.org/nutcrackermarket" },
      { label: "Houston Ballet Nutcracker Market official event background", url: "https://www.houstonballet.org/support-us/special-events/nutcracker-market/about/nutcracker-market/" },
      { label: "Houston Ballet Nutcracker Market official Early Bird admission", url: "https://www.houstonballet.org/support-us/special-events/nutcracker-market/tickets-events/nutcracker-market-tickets/early-bird-admission/" },
    ],
    verifiedAt: "2026-09-02",
  },
];
