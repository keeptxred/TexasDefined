import type { MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

// October 21, 2026 official organizer review: event-specific organizer and
// dates verified in long-form guides. No unlicensed/representative hero images,
// unverified admission offers, or invented performer credits are published.
export const majorEventSchemaEnrichmentBatch31: MajorEventSchemaEnrichment[] = [
  {
    slug: "grapevine-christmas-capital-of-texas",
    organizer: { type: "Organization", name: "Grapevine Convention & Visitors Bureau", url: "https://www.grapevinetexasusa.com/christmas-capital-of-texas/" },
    sources: [{ label: "Grapevine Convention & Visitors Bureau official holiday event", url: "https://www.grapevinetexasusa.com/christmas-capital-of-texas/" }],
    verifiedAt: "2026-10-21",
  },
  {
    slug: "austin-trail-of-lights",
    organizer: { type: "Organization", name: "Trail of Lights Foundation", url: "https://austintrailoflights.org/event-faqs" },
    image: {
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Austin_Trail_of_Lights_Zilker_Park.JPG?width=1600",
      alt: "Austin Trail of Lights display illuminated in Zilker Park, photographed in December 2013, not the 2026 installation",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Austin_Trail_of_Lights_Zilker_Park.JPG",
      sourceType: "wikimedia",
      licenseName: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
      rightsNote: "Photo: Klugheit (2013), CC BY-SA 3.0. Actual Trail of Lights at Zilker Park; historic photo, not 2026. Wikimedia-hosted display size; no editorial alterations.",
      exactLocation: true,
      approvedForCommercialUse: true,
    },
    sources: [{ label: "Trail of Lights Foundation official holiday event", url: "https://austintrailoflights.org/event-faqs" }, { label: "Licensed 2013 Austin Trail of Lights photo and credit", url: "https://commons.wikimedia.org/wiki/File:Austin_Trail_of_Lights_Zilker_Park.JPG" }],
    verifiedAt: "2026-10-21",
  },
  {
    slug: "santas-wonderland-college-station",
    organizer: { type: "Organization", name: "Santa's Wonderland", url: "https://www.santas-wonderland.com/" },
    sources: [{ label: "Santa's Wonderland official holiday event", url: "https://www.santas-wonderland.com/" }],
    verifiedAt: "2026-10-21",
  },
  {
    slug: "houston-zoo-lights",
    organizer: { type: "Organization", name: "Houston Zoo", url: "https://www.houstonzoo.org/events/zoolights/" },
    sources: [{ label: "Houston Zoo official holiday event", url: "https://www.houstonzoo.org/events/zoolights/" }],
    verifiedAt: "2026-10-21",
  },
  {
    slug: "moody-gardens-ice-land",
    organizer: { type: "Organization", name: "Moody Gardens", url: "https://www.moodygardens.com/holiday-season/ice-land" },
    sources: [{ label: "Moody Gardens official holiday event", url: "https://www.moodygardens.com/holiday-season/ice-land" }],
    verifiedAt: "2026-10-21",
  },
  {
    slug: "holiday-at-the-dallas-arboretum",
    organizer: { type: "Organization", name: "Dallas Arboretum and Botanical Garden", url: "https://www.dallasarboretum.org/events-activities/holiday-at-the-arboretum/" },
    sources: [{ label: "Dallas Arboretum and Botanical Garden official holiday event", url: "https://www.dallasarboretum.org/events-activities/holiday-at-the-arboretum/" }],
    verifiedAt: "2026-10-21",
  },
  {
    slug: "galaxy-lights-space-center-houston",
    organizer: { type: "Organization", name: "Space Center Houston", url: "https://spacecenter.org/galaxy-lights/" },
    sources: [{ label: "Space Center Houston official holiday event", url: "https://spacecenter.org/galaxy-lights/" }],
    verifiedAt: "2026-10-21",
  },
  {
    slug: "concho-christmas-tour-of-lights",
    organizer: { type: "Organization", name: "Concho Christmas Celebration", url: "https://www.conchochristmascelebration.com/tour-of-lights" },
    sources: [{ label: "Concho Christmas Celebration official holiday event", url: "https://www.conchochristmascelebration.com/tour-of-lights" }],
    verifiedAt: "2026-10-21",
  },
  {
    slug: "main-street-bethlehem-burnet",
    organizer: { type: "Organization", name: "First Baptist Church Burnet", url: "https://www.fbcburnet.org/main-street-bethlehem" },
    sources: [{ label: "First Baptist Church Burnet official holiday event", url: "https://www.fbcburnet.org/main-street-bethlehem" }],
    verifiedAt: "2026-10-21",
  },
];
