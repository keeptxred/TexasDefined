import type { MajorEventSchemaEnrichment } from "./major-event-schema-enrichment.server";

const ccBySa4 = "https://creativecommons.org/licenses/by-sa/4.0/";
const ccBySa2 = "https://creativecommons.org/licenses/by-sa/2.0/";
const ccBy3 = "https://creativecommons.org/licenses/by/3.0/";

export const majorEventSchemaEnrichmentBatch25: MajorEventSchemaEnrichment[] = [
  {
    slug: "day-of-the-dead-river-parade-san-antonio",
    image: {
      url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/San%20Antonio%20River%20Walk%20July%202017%2010%20%28Arneson%20River%20Theater%29.jpg?width=1600",
      alt: "Arneson River Theatre on the San Antonio River Walk, a central viewing location for the Day of the Dead River Parade",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:San_Antonio_River_Walk_July_2017_10_(Arneson_River_Theater).jpg",
      sourceType: "wikimedia",
      licenseName: "CC BY-SA 4.0",
      licenseUrl: ccBySa4,
      rightsNote: "Wikimedia Commons photograph by Michael Barera, licensed CC BY-SA 4.0.",
      exactLocation: true,
      approvedForCommercialUse: true,
    },
    sources: [
      { label: "Wikimedia Commons — Arneson River Theatre", url: "https://commons.wikimedia.org/wiki/File:San_Antonio_River_Walk_July_2017_10_(Arneson_River_Theater).jpg" },
    ],
    verifiedAt: "2026-09-24",
  },
  {
    slug: "alley-theatre-a-christmas-carol",
    image: {
      url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/AlleyHouston.jpg?width=1600",
      alt: "Alley Theatre in downtown Houston, home of the annual Alley Theatre A Christmas Carol production",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:AlleyHouston.jpg",
      sourceType: "wikimedia",
      licenseName: "CC BY-SA 2.0",
      licenseUrl: ccBySa2,
      rightsNote: "Wikimedia Commons photograph by Rick Kimpel, licensed CC BY-SA 2.0 and reviewed from the original Flickr license.",
      exactLocation: true,
      approvedForCommercialUse: true,
    },
    sources: [
      { label: "Wikimedia Commons — Alley Theatre", url: "https://commons.wikimedia.org/wiki/File:AlleyHouston.jpg" },
    ],
    verifiedAt: "2026-09-24",
  },
  {
    slug: "dallas-theater-center-a-christmas-carol",
    image: {
      url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dallas%20Wyly%20Theatre%2003.jpg?width=1600",
      alt: "Dee and Charles Wyly Theatre in Dallas, home of Dallas Theater Center's annual A Christmas Carol production",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Dallas_Wyly_Theatre_03.jpg",
      sourceType: "wikimedia",
      licenseName: "CC BY 3.0",
      licenseUrl: ccBy3,
      rightsNote: "Wikimedia Commons photograph by Andreas Praefcke, licensed CC BY 3.0.",
      exactLocation: true,
      approvedForCommercialUse: true,
    },
    sources: [
      { label: "Wikimedia Commons — Dee and Charles Wyly Theatre", url: "https://commons.wikimedia.org/wiki/File:Dallas_Wyly_Theatre_03.jpg" },
    ],
    verifiedAt: "2026-09-24",
  },
];
