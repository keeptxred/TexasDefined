import type { MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

export const majorEventSchemaEnrichmentOverrides: MajorEventSchemaEnrichment[] = [
  {
    slug: "chappell-hill-bluebonnet-festival",
    organizer: {
      type: "Organization",
      name: "Chappell Hill Historical Society",
      url: "https://chappellhillhistoricalsociety.com/",
    },
    image: {
      url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ranchland_in_the_Blackland_Prairie_eco-region_of_Texas_with_Texas_bluebonnets_%28Lupinus_texensis%29%2C_Washington_County%2C_Texas%2C_USA_%2830_March_2012%29.jpg?width=1800",
      alt: "Texas bluebonnets blooming across ranchland in Washington County, home of the Chappell Hill Bluebonnet Festival",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Ranchland_in_the_Blackland_Prairie_eco-region_of_Texas_with_Texas_bluebonnets_(Lupinus_texensis),_Washington_County,_Texas,_USA_(30_March_2012).jpg",
      sourceType: "wikimedia",
      licenseName: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      rightsNote: "William L. Farr / Wikimedia Commons; representative Washington County bluebonnet landscape, not an exact festival photograph.",
      exactLocation: false,
      approvedForCommercialUse: true,
      aiGenerated: false,
    },
    sources: [
      {
        label: "Chappell Hill Historical Society — 2027 Bluebonnet Festival",
        url: "https://chappellhillhistoricalsociety.com/bluebonnet-festival/",
      },
      {
        label: "Chappell Hill Historical Society — historic sites",
        url: "https://chappellhillhistoricalsociety.com/historical-sites/",
      },
      {
        label: "Visit Brenham — Wildflower Driving Map",
        url: "https://visitbrenhamtexas.com/things/wildflower-watch/wildflower-driving-map/",
      },
    ],
    verifiedAt: "2026-10-01",
  },
];
