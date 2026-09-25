import type { MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

export const majorEventSchemaEnrichmentBatch25: MajorEventSchemaEnrichment[] = [
  {
    slug: "blanco-lavender-festival",
    image: {
      url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Blanco%20County%20Courthouse%20(Old),%20Blanco,%20Texas%20(8690726883).jpg?width=1600",
      alt: "Old Blanco County Courthouse and grounds in Blanco, the primary market location for the Blanco Lavender Festival",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Blanco_County_Courthouse_(Old),_Blanco,_Texas_(8690726883).jpg",
      sourceType: "wikimedia",
      licenseName: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
      rightsNote: "Wikimedia Commons photograph by Nicolas Henderson, licensed CC BY 2.0; depicts the Old Blanco County Courthouse and grounds where the festival's primary Lavender Market is held.",
      exactLocation: true,
      approvedForCommercialUse: true,
    },
    organizer: {
      type: "Organization",
      name: "Blanco Chamber of Commerce",
      url: "https://www.blancochamber.com/",
    },
    sources: [
      { label: "Blanco Lavender Festival — official 2027 dates", url: "https://www.blancolavenderfest.com/" },
      { label: "Blanco Lavender Festival — official organizer and locations", url: "https://www.blancolavenderfest.com/contact" },
      { label: "Blanco Lavender Festival — official farm component", url: "https://www.blancolavenderfest.com/farm" },
    ],
    verifiedAt: "2026-09-24",
  },
];
