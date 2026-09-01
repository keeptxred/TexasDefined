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

export const majorEventSchemaEnrichmentBatch1: MajorEventSchemaEnrichment[] = [
  {
    slug: "grapefest",
    organizer: organization("Grapevine Convention & Visitors Bureau", "https://www.grapevinetexasusa.com/"),
    offers: [
      usdOffer("Adult daily admission", 12, "https://www.grapevinetexasusa.com/grapefest/purchase-tickets/"),
      usdOffer("Senior 62+ daily admission", 6, "https://www.grapevinetexasusa.com/grapefest/purchase-tickets/"),
      usdOffer("Child age 6–12 daily admission", 6, "https://www.grapevinetexasusa.com/grapefest/purchase-tickets/"),
      usdOffer("Weekend pass", 25, "https://www.grapevinetexasusa.com/grapefest/purchase-tickets/"),
    ],
    performers: [group("Tojo"), group("80s Mix Tape"), group("Heartbreak Petty"), group("Milagro")],
    sources: [
      { label: "GrapeFest official general information", url: "https://www.grapevinetexasusa.com/grapefest/general-information/" },
      { label: "GrapeFest official ticket sales", url: "https://www.grapevinetexasusa.com/grapefest/purchase-tickets/" },
      { label: "GrapeFest official entertainment lineup", url: "https://www.grapevinetexasusa.com/grapefest/entertainment/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "wurstfest",
    organizer: organization("Wurstfest Association of New Braunfels", "https://wurstfest.com/"),
    offers: [
      usdOffer("Online Friday or Sunday admission", 15, "https://ticketing.roninpos.app/events/wfesttickets"),
      usdOffer("Online Saturday admission", 25, "https://ticketing.roninpos.app/events/wfesttickets"),
    ],
    performers: [
      group("Klaberheads"),
      group("Happy Hour Oktoberfest Band"),
      group("Die Bayrischen Hiatamadln"),
      group("Yodel Blitz"),
      group("Alex Meixner Band"),
    ],
    sources: [
      { label: "Wurstfest official admissions", url: "https://wurstfest.com/festival-admission/" },
      { label: "Wurstfest official entertainment schedule", url: "https://wurstfest.com/entertainment/" },
      { label: "Wurstfest Association contact information", url: "https://wurstfest.com/contact/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "texas-renaissance-festival",
    organizer: organization("Texas Renaissance Festival", "https://www.texrenfest.com/"),
    occurrences: {
      "Weekend 1": { offers: [usdOffer("Weekend 1 — Enjoy the Weekend pass", 35.10, "https://www.texrenfest.com/p/ticket-info/weekend-pass")] },
      "Weekend 2": { offers: [usdOffer("Weekend 2 — Enjoy the Weekend pass", 48.53, "https://www.texrenfest.com/p/ticket-info/weekend-pass")] },
      "Weekend 3": { offers: [usdOffer("Weekend 3 — Enjoy the Weekend pass", 57.82, "https://www.texrenfest.com/p/ticket-info/weekend-pass")] },
      "Weekend 4": { offers: [usdOffer("Weekend 4 — Enjoy the Weekend pass", 57.82, "https://www.texrenfest.com/p/ticket-info/weekend-pass")] },
      "Weekend 5": { offers: [usdOffer("Weekend 5 — Enjoy the Weekend pass", 54.72, "https://www.texrenfest.com/p/ticket-info/weekend-pass")] },
      "Weekend 6": { offers: [usdOffer("Weekend 6 — Enjoy the Weekend pass", 61.95, "https://www.texrenfest.com/p/ticket-info/weekend-pass")] },
      "Weekend 7": { offers: [usdOffer("Weekend 7 — Enjoy the Weekend pass", 57.82, "https://www.texrenfest.com/p/ticket-info/weekend-pass")] },
      "Thanksgiving weekend": { offers: [usdOffer("Thanksgiving weekend — 3-day Enjoy the Weekend pass", 83.63, "https://www.texrenfest.com/p/ticket-info/weekend-pass")] },
    },
    sources: [
      { label: "Texas Renaissance Festival official ticket information", url: "https://www.texrenfest.com/p/ticket-info/general-ticket-info" },
      { label: "Texas Renaissance Festival official weekend passes", url: "https://www.texrenfest.com/p/ticket-info/weekend-pass" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "fort-worth-stock-show-rodeo",
    organizer: organization("Southwestern Exposition and Livestock Show", "https://www.fwssr.com/"),
    sources: [
      { label: "Fort Worth Stock Show & Rodeo official site", url: "https://www.fwssr.com/" },
      { label: "Fort Worth Stock Show & Rodeo official FAQ", url: "https://www.fwssr.com/p/plan-a-visit/faq" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "san-antonio-stock-show-rodeo",
    organizer: organization("San Antonio Livestock Exposition, Inc.", "https://www.sarodeo.com/"),
    performers: [group("Flatland Cavalry"), group("Turnpike Troubadours"), group("BlackHawk"), person("Keith Urban")],
    sources: [
      { label: "San Antonio Stock Show & Rodeo official site", url: "https://www.sarodeo.com/" },
      { label: "San Antonio Stock Show & Rodeo official concert lineup", url: "https://www.sarodeo.com/p/rodeo/concert-lineup" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "sxsw",
    organizer: organization("SXSW, LLC", "https://sxsw.com/"),
    offers: [
      usdOffer("Platinum Badge", 1395, "https://cart.sxsw.com/"),
      usdOffer("Innovation Badge", 895, "https://cart.sxsw.com/"),
      usdOffer("Music Badge", 550, "https://cart.sxsw.com/"),
    ],
    sources: [
      { label: "SXSW official 2027 badge cart", url: "https://cart.sxsw.com/" },
      { label: "SXSW official site", url: "https://sxsw.com/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "houston-livestock-show-rodeo",
    organizer: organization("Houston Livestock Show and Rodeo", "https://www.rodeohouston.com/"),
    sources: [
      { label: "Houston Livestock Show and Rodeo official site", url: "https://www.rodeohouston.com/" },
      { label: "RODEOHOUSTON official ticket information", url: "https://www.rodeohouston.com/tickets/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "fiesta-san-antonio",
    organizer: organization("Fiesta San Antonio Commission", "https://fiestasanantonio.org/"),
    sources: [
      { label: "Fiesta San Antonio Commission official site", url: "https://fiestasanantonio.org/" },
      { label: "Official Fiesta event calendar", url: "https://fiestasanantonio.org/schedule/" },
    ],
    verifiedAt: "2026-09-01",
  },
  {
    slug: "texas-rose-festival",
    organizer: organization("Texas Rose Festival Association", "https://www.texasrosefestival.org/"),
    sources: [{ label: "Texas Rose Festival Association official site", url: "https://www.texasrosefestival.org/" }],
    verifiedAt: "2026-09-01",
  },
];
