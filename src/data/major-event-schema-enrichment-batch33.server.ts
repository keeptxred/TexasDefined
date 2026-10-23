import type { MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

// Official-organizer holiday source review, October 23, 2026. Published
// hours, dates and location are supported in the matching event guides.
// Ticket offers, artist fields and illustrative images are intentionally
// omitted until a dated operator offer or reusable exact-location image
// has been independently verified. Do not invent winter imagery or prices.
export const majorEventSchemaEnrichmentBatch33: MajorEventSchemaEnrichment[] = [
  {
    slug: "gaylord-texan-ice",
    organizer: { type: "Organization", name: "Gaylord Texan Resort & Convention Center", url: "https://www.marriott.com/en-us/hotels/dalgt-gaylord-texan-resort-and-convention-center/overview/" },
    sources: [
      { label: "Gaylord Texan official seasonal ICE! resort guide", url: "https://www.marriott.com/en-us/hotels/dalgt-gaylord-texan-resort-and-convention-center/overview/" },
      { label: "Gaylord Hotels holiday theme announcement", url: "https://www.gaylordhotels.com/the-immersive-christmas-experience-ice-expands-to-eight-resorts-with-new-themes-including-harry-potter-home-alone-and-disney-tim-burton-s-the-nightmare-before-christmas" },
    ],
    verifiedAt: "2026-10-23",
  },
  {
    slug: "grand-prairie-prairie-lights",
    organizer: { type: "Organization", name: "City of Grand Prairie", url: "https://www.gptx.org/Community-Calendar/Prairie-Lights-2026" },
    sources: [
      { label: "Grand Prairie city official Prairie Lights 2026 event", url: "https://www.gptx.org/Community-Calendar/Prairie-Lights-2026" },
    ],
    verifiedAt: "2026-10-23",
  },
  {
    slug: "moody-gardens-holiday-in-the-gardens",
    organizer: { type: "Organization", name: "Moody Gardens", url: "https://www.moodygardens.com/holiday-season" },
    sources: [
      { label: "Moody Gardens official Holiday in the Gardens season", url: "https://www.moodygardens.com/holiday-season" },
      { label: "Moody Gardens holiday season FAQ", url: "https://www.moodygardens.com/holiday-season/faq" },
    ],
    verifiedAt: "2026-10-23",
  },
  {
    slug: "grapevine-north-pole-express",
    organizer: { type: "Organization", name: "Grapevine Convention & Visitors Bureau", url: "https://www.grapevinetexasusa.com/christmas-capital-of-texas/north-pole-express/dates-times/" },
    sources: [
      { label: "Grapevine official 2026 North Pole Express dates and boarding station", url: "https://www.grapevinetexasusa.com/christmas-capital-of-texas/north-pole-express/dates-times/" },
      { label: "Grapevine Christmas Capital of Texas train ticketing", url: "https://www.grapevinetexasusa.com/christmas-capital-of-texas/north-pole-express/" },
    ],
    verifiedAt: "2026-10-23",
  },
  {
    slug: "dallas-zoo-lights",
    organizer: { type: "Organization", name: "Dallas Zoo", url: "https://www.dallaszoo.com/event/lights/" },
    sources: [
      { label: "Dallas Zoo official 2026 Zoo Lights nightly schedule", url: "https://www.dallaszoo.com/event/lights/" },
      { label: "Dallas Zoo visit rules and parking", url: "https://www.dallaszoo.com/plan-your-visit/general-information/" },
    ],
    verifiedAt: "2026-10-23",
  },
];
