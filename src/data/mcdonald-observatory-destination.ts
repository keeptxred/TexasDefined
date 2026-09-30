import type { Destination } from "./types";

const SOURCE_CHECKED_AT = "2026-09-30";

export const mcdonaldObservatoryDestinations: Destination[] = [
  {
    id: "science-mcdonald-observatory",
    brandId: "texasdefined",
    slug: "mcdonald-observatory",
    name: "McDonald Observatory",
    summary:
      "McDonald Observatory is the University of Texas astronomical research complex in the Davis Mountains near Fort Davis, combining major research telescopes with public daytime tours, exhibits and evening Star Party programs under exceptionally dark West Texas skies.",
    category: "outdoors",
    region: "big-bend",
    geography: {
      primaryRegionId: "west-texas",
      subregionIds: ["trans-pecos"],
      countySlugs: ["jeff-davis"],
      travelRegionIds: ["big-bend"],
      relocationPresentationLabels: ["West Texas & Panhandle"],
    },
    nearestTown: "Fort Davis",
    county: "Jeff Davis",
    coordinates: { lat: 30.6714, lng: -104.0220 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/McDonald_Observatory.jpg?width=1600",
      alt: "McDonald Observatory telescope domes on Mount Locke and Mount Fowlkes in the Davis Mountains of Texas",
      width: 2816,
      height: 1110,
      credit: "Jason Quinn · Public domain · Wikimedia Commons",
    },
    bestSeason:
      "Year-round; clear nights are best for astronomy, while spring and fall usually offer the most comfortable combination of daytime touring and evening temperatures.",
    entryNote:
      "Public programs and operating days change by season, and popular Star Parties and guided tours can sell out. Check the official McDonald Observatory visitor calendar and reserve programs before making the remote drive.",
    highlights: [
      "Evening Star Party programs",
      "Hobby-Eberly Telescope and major research telescopes",
      "Davis Mountains dark-sky setting",
      "Daytime guided tours and visitor-center exhibits",
    ],
    body: [
      "McDonald Observatory sits high in the Davis Mountains, where elevation, dry air and distance from major city light make the site valuable both for professional astronomy and for visitors who want to understand why West Texas has become one of the state's defining dark-sky regions. The complex includes major research telescopes on Mount Locke and Mount Fowlkes as well as the Frank N. Bash Visitors Center, creating a rare place where active science and public interpretation occupy the same mountain landscape.",
      "For visitors, the observatory is more than a scenic overlook. Current public programming includes general admission, daytime telescope tours, solar viewing and the well-known evening Star Party, which combines a constellation orientation with live telescope viewing when weather permits. Some programs use large research facilities while others are designed specifically for public observing, so the best visit begins by choosing and reserving the program that matches your schedule rather than simply driving up the mountain.",
      "The remote setting is part of the experience and part of the planning challenge. Fort Davis is the nearest town, cell service can be limited on the approach, mountain temperatures can drop sharply after sunset and popular programs often sell out during holidays and school breaks. Check the official schedule, weather and reservation status before leaving, allow extra time for the winding Davis Mountains roads, and bring layers even when the lower desert is warm.",
    ],
    managingAuthority: "The University of Texas at Austin — McDonald Observatory",
    officialUrl: "https://mcdonaldobservatory.org/visit/",
    sourceCheckedAt: SOURCE_CHECKED_AT,
    address: "3640 Dark Sky Dr, McDonald Observatory, TX 79734",
    directions:
      "From Fort Davis, follow Texas Highway 118 north into the Davis Mountains and follow signs to the Frank N. Bash Visitors Center. The observatory notes that cell service is limited in the region, so save directions before leaving town.",
    accessibilityNotes:
      "The Visitors Center and public programs have developed visitor facilities, but tours can involve walking at roughly 6,300 feet elevation and outdoor evening programs use stone amphitheater seating. Review the official program details or contact the observatory if your visit depends on a specific accessibility accommodation.",
  },
];
