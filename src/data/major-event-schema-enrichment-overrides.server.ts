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
      url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/ChappellHillTexas_(1_of_1).jpg?width=1600",
      alt: "Historic Main Street in Chappell Hill, the downtown setting for the annual Bluebonnet Festival",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:ChappellHillTexas_(1_of_1).jpg",
      sourceType: "wikimedia",
      licenseName: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      rightsNote: "Renelibrary / Wikimedia Commons · CC BY-SA 4.0. Exact Chappell Hill Main Street setting; not represented as festival-day documentary photography.",
      exactLocation: true,
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
