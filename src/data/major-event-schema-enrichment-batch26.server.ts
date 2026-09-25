import type { MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

export const majorEventSchemaEnrichmentBatch26: MajorEventSchemaEnrichment[] = [
  {
    slug: "blanco-market-day",
    image: {
      url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Blanco%20County%20Courthouse%20(Old),%20Blanco,%20Texas%20(8690726883).jpg?width=1600",
      alt: "Old Blanco County Courthouse and grounds in Blanco, the exact venue for Blanco Market Day",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Blanco_County_Courthouse_(Old),_Blanco,_Texas_(8690726883).jpg",
      sourceType: "wikimedia",
      licenseName: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
      rightsNote: "Wikimedia Commons photograph by Nicolas Henderson, licensed CC BY 2.0; depicts the Old Blanco County Courthouse and grounds where Blanco Market Day is held.",
      exactLocation: true,
      approvedForCommercialUse: true,
    },
    organizer: {
      type: "Organization",
      name: "Old Blanco County Courthouse Preservation Society",
      url: "https://www.historicblanco.org/",
    },
    sources: [
      { label: "Old Blanco County Courthouse — current Market Day schedule", url: "https://www.historicblanco.org/market-day" },
      { label: "Old Blanco County Courthouse Preservation Society — organization and venue", url: "https://www.historicblanco.org/about" },
      { label: "Old Blanco County Courthouse — physical address and parking", url: "https://www.historicblanco.org/directions" },
    ],
    verifiedAt: "2026-09-24",
  },
];
