import type { MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

// Batch 31: two separately verified official 2026 Polar Express depots.
// CC-licensed exact-location photos predate the 2026 holiday rides.
export const majorEventSchemaEnrichmentBatch32: MajorEventSchemaEnrichment[] = [
  {
    slug: "polar-express-galveston",
    organizer: {
      type: "Organization",
      name: "Galveston Railroad Museum",
      url: "https://galvestonrrmuseum.org/"
    },
    image: {
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/20190226_55_Galveston_Railroad_Museum.jpg?width=1600",
      alt: "Galveston Railroad Museum rail equipment at the historic site, photographed in 2019 before the holiday event",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:20190226_55_Galveston_Railroad_Museum.jpg",
      sourceType: "wikimedia",
      licenseName: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
      rightsNote: "Photo: David Wilson (2019), CC BY 2.0. Historic venue photo, not a 2026 Polar Express depiction; no changes.",
      exactLocation: true,
      approvedForCommercialUse: true
    },
    sources: [
      {
        label: "Galveston Railroad Museum 2026 event page",
        url: "https://galvestonrrmuseum.org/event/the-polar-express/"
      },
      {
        label: "Licensed venue image and photographer credit",
        url: "https://commons.wikimedia.org/wiki/File:20190226_55_Galveston_Railroad_Museum.jpg"
      }
    ],
    verifiedAt: "2026-10-21"
  },
  {
    slug: "polar-express-palestine",
    organizer: {
      type: "Organization",
      name: "Texas State Railroad",
      url: "https://texasstaterailroad.net/"
    },
    image: {
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Southern_Pine_Lumber_Co._No._28_pulling_the_Polar_Express_at_the_Texas_State_Rail_Road_-_December_2015.jpg?width=1600",
      alt: "Historical 2015 Texas State Railroad Polar Express pulled by a steam locomotive; the 2026 train uses diesel power",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Southern_Pine_Lumber_Co._No._28_pulling_the_Polar_Express_at_the_Texas_State_Rail_Road_-_December_2015.jpg",
      sourceType: "wikimedia",
      licenseName: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
      rightsNote: "Photo: Michael Gras, M.Ed. (December 2015), CC BY 2.0. Historical Polar Express steam-train scene at Texas State Railroad, not the 2026 diesel locomotive; image unaltered.",
      exactLocation: true,
      approvedForCommercialUse: true
    },
    sources: [
      {
        label: "Texas State Railroad current Polar Express booking program",
        url: "https://texasstaterailroad.net/the-polar-express/"
      },
      {
        label: "2015 Polar Express historical photo and Michael Gras credit",
        url: "https://commons.wikimedia.org/wiki/File:Southern_Pine_Lumber_Co._No._28_pulling_the_Polar_Express_at_the_Texas_State_Rail_Road_-_December_2015.jpg"
      }
    ],
    verifiedAt: "2026-10-26"
  }
];
