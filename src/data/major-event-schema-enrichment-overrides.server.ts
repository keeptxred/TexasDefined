import type { MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

export const majorEventSchemaEnrichmentOverrides: MajorEventSchemaEnrichment[] = [
  {
    slug: "heritage-syrup-festival",
    organizer: {
      type: "Organization",
      name: "City of Henderson, Texas",
      url: "https://www.hendersontx.us/",
    },
    // Licensed photograph of the exact festival's museum venue—not a claim
    // that the image depicts the concluded 37th annual festival in 2026.
    // Past occurrence schema stays WebPage, not Event, via lifecycle policy.
    image: {
      url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Henderson_July_2017_09_%28Depot_Museum%29.jpg?width=1600",
      alt: "Rusk County Depot Museum building in Henderson, the Heritage Syrup Festival's traditional syrup-making venue, photographed in 2017, not at the 2026 festival",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Henderson_July_2017_09_(Depot_Museum).jpg",
      sourceType: "wikimedia",
      licenseName: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      rightsNote: "Michael Barera, July 22, 2017; Wikimedia Commons, CC BY-SA 4.0. Exact historic depot museum event venue, photographed nine years before the 37th annual 2026 edition. Resized for delivery; not a photograph of festival attendees or the syrup-making demonstration.",
      exactLocation: true,
      approvedForCommercialUse: true,
    },
    sources: [
      { label: "City of Henderson — 2026 Heritage Syrup Festival venue and schedule", url: "https://www.hendersontx.us/14/Heritage-Syrup-Festival" },
      { label: "Rusk County Depot Museum — 37th annual festival and museum grounds", url: "https://www.ruskcountyhistory.org/syrup-festival" },
      { label: "Wikimedia Commons — source photograph, photographer and license", url: "https://commons.wikimedia.org/wiki/File:Henderson_July_2017_09_(Depot_Museum).jpg" },
    ],
    verifiedAt: "2026-11-22",
  },
  {
    slug: "chappell-hill-bluebonnet-festival",
    organizer: {
      type: "Organization",
      name: "Chappell Hill Historical Society",
      url: "https://chappellhillhistoricalsociety.com/",
    },
    image: {
      url: "https://texasdefined.com/images/events/chappell-hill-bluebonnet-festival-20260914.webp",
      alt: "AI-generated Texas Bluebonnet Festival scene with Texas flags, bluebonnets, vendor tents, visitors and a Ferris wheel",
      sourceUrl: "https://texasdefined.com/images/events/chappell-hill-bluebonnet-festival-20260914.webp",
      sourceType: "ai-generated",
      rightsNote: "TexasDefined-generated photorealistic editorial image approved for site use.",
      exactLocation: false,
      approvedForCommercialUse: true,
      aiGenerated: true,
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
