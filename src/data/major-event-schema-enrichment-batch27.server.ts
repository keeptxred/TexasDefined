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
    image: {
      url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Everybody%2C%20and%20we%20mean%20everybody%2C%20dresses%20up%20for%20Mardi%20Gras%2C%20Texas%20style%2C%20in%20little%20Bandera%2C%20the%20%22Cowboy%20Capital%20of%20Texas%2C%22%20west%20of%20San%20Antonio%2C%20Texas%20LCCN2014631491.tif?width=1600",
      alt: "Costumed revelers at Bandera's historic Cowboy Mardi Gras in 2014; archival photograph, not the 2027 celebration",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Everybody%2C%20and%20we%20mean%20everybody%2C%20dresses%20up%20for%20Mardi%20Gras%2C%20Texas%20style%2C%20in%20little%20Bandera%2C%20the%20%22Cowboy%20Capital%20of%20Texas%2C%22%20west%20of%20San%20Antonio%2C%20Texas%20LCCN2014631491.tif",
      sourceType: "wikimedia",
      licenseName: "Public domain — Carol M. Highsmith / Library of Congress",
      licenseUrl: "https://www.loc.gov/rr/print/res/482_high.html",
      rightsNote: "Carol M. Highsmith photographed the actual Bandera Cowboy Mardi Gras in 2014 for the Library of Congress Lyda Hill Texas Collection. Her photographs are in the public domain; archival image does not depict the 2027 parade.",
      exactLocation: true,
      approvedForCommercialUse: true,
    },

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
    // Two independently organized parade occurrences: do not assign the boat
    // event's organizer to the street event or vice versa in Event JSON-LD.
    sources: [
      { label: "Yachty Gras — official 28th annual February 6, 2027 boat parade", url: "https://www.yachtygras.com/" },
      { label: "Krewe du Lac — official February 9, 2027 Grand Mardi Gras street parade", url: "https://krewedulac.net/events" },
    ],
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
