import type { MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

// Reviewed organizer evidence only. Omit offers, photographs and unannounced 2027
// event-date promises rather than invent ticket prices or image licensing.
export const majorEventSchemaEnrichmentBatch27: MajorEventSchemaEnrichment[] = [
  {
    slug: "mardi-gras-port-arthur",
    organizer: { type: "Organization", name: "Mardi Gras Port Arthur", url: "https://visitportarthurtx.com/mardi-gras/about-mardi-gras/" },
    sources: [{ label: "Official organizer or state tourism event reference", url: "https://visitportarthurtx.com/mardi-gras/about-mardi-gras/" }],
    verifiedAt: "2026-10-21",
  },
  {
    slug: "mardi-gras-upriver-jefferson",
    organizer: { type: "Organization", name: "Krewe of Hebe", url: "https://mardigrasupriver.com/events/" },
    sources: [{ label: "Official organizer or state tourism event reference", url: "https://mardigrasupriver.com/events/" }],
    verifiedAt: "2026-10-21",
  },
  {
    slug: "cowboy-mardi-gras-bandera",
    organizer: { type: "Organization", name: "11th Street Cowboy Bar", url: "https://www.banderacowboycapital.com/events/2026/cowboy-mardi-gras" },
    sources: [{ label: "Official organizer or state tourism event reference", url: "https://www.banderacowboycapital.com/events/2026/cowboy-mardi-gras" }],
    verifiedAt: "2026-10-21",
  },
  {
    slug: "crystal-beach-mardi-gras-parade",
    organizer: { type: "Organization", name: "Lighthouse Krewe", url: "https://bolivarpeninsulatexas.com/event/mardi-gras-parade-in-crystal-beach-texas-february-6-2027" },
    sources: [{ label: "Official organizer or state tourism event reference", url: "https://bolivarpeninsulatexas.com/event/mardi-gras-parade-in-crystal-beach-texas-february-6-2027" }],
    verifiedAt: "2026-10-21",
  },
  {
    slug: "kemah-yachty-gras",
    organizer: { type: "Organization", name: "Krewe du Lac", url: "https://krewedulac.net/events" },
    sources: [{ label: "Official organizer or state tourism event reference", url: "https://krewedulac.net/events" }],
    verifiedAt: "2026-10-21",
  },
  {
    slug: "palestine-mardi-gras-parade",
    sources: [{ label: "Official organizer or state tourism event reference", url: "https://www.traveltexas.com/event/mardi-gras-parade/6363/" }],
    verifiedAt: "2026-10-21",
  },
  {
    slug: "beaumont-pardi-gras",
    organizer: { type: "Organization", name: "Southeast Texas Circle of Hope", url: "https://www.southeasttexascircleofhope.com/event-details/beaumont-pardi-gras-2027" },
    sources: [{ label: "Official organizer or state tourism event reference", url: "https://www.southeasttexascircleofhope.com/event-details/beaumont-pardi-gras-2027" }],
    verifiedAt: "2026-10-21",
  },
  {
    slug: "mardi-gras-on-the-sabine-orange",
    organizer: { type: "Organization", name: "City of Orange", url: "https://orangetexas.gov/407/Mardi-Gras-on-the-Sabine" },
    sources: [{ label: "Official organizer or state tourism event reference", url: "https://orangetexas.gov/407/Mardi-Gras-on-the-Sabine" }],
    verifiedAt: "2026-10-21",
  },
  {
    slug: "oak-cliff-mardi-gras-parade",
    organizer: { type: "Organization", name: "Go Oak Cliff", url: "https://gooakcliff.org/mardigras" },
    sources: [{ label: "Official organizer or state tourism event reference", url: "https://gooakcliff.org/mardigras" }],
    verifiedAt: "2026-10-21",
  },
  {
    slug: "mardi-gras-southeast-texas-beaumont",
    organizer: { type: "Organization", name: "Mardi Gras of Southeast Texas", url: "https://mardigrastx.com/" },
    sources: [{ label: "Official organizer or state tourism event reference", url: "https://mardigrastx.com/" }],
    verifiedAt: "2026-10-21",
  },
];
