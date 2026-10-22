import type { MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

// Batch 31: two separately verified official 2026 Polar Express depots.
// CC-licensed exact-location photos predate the 2026 holiday rides.
export const majorEventSchemaEnrichmentBatch31: MajorEventSchemaEnrichment[] = [
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
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/Palestine_August_2017_55_(Texas_State_Railroad_Palestine_Depot).jpg?width=1600",
      alt: "Historic Texas State Railroad Palestine Depot building in 2017 before the Polar Express holiday season",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Palestine_August_2017_55_(Texas_State_Railroad_Palestine_Depot).jpg",
      sourceType: "wikimedia",
      licenseName: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      rightsNote: "Photo: Michael Barera (2017), CC BY-SA 4.0. Exact Palestine Depot; historic daytime photo, not a 2026 train-ride scene; no changes.",
      exactLocation: true,
      approvedForCommercialUse: true
    },
    sources: [
      {
        label: "Texas State Railroad 2026 program",
        url: "https://texasstaterailroad.net/the-polar-express-train-ride/"
      },
      {
        label: "Licensed Palestine Depot image and photographer credit",
        url: "https://commons.wikimedia.org/wiki/File:Palestine_August_2017_55_(Texas_State_Railroad_Palestine_Depot).jpg"
      }
    ],
    verifiedAt: "2026-10-21"
  }
];
