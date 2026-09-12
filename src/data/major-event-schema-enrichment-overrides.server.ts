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
      url: "https://texasdefined.com/images/events/chappell-hill-bluebonnet-festival.webp",
      alt: "AI-generated Texas Bluebonnet Festival scene with Texas flags, bluebonnets, vendor tents, visitors and a Ferris wheel",
      sourceUrl: "https://texasdefined.com/images/events/chappell-hill-bluebonnet-festival.webp",
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
    verifiedAt: "2026-09-12",
  },
];
