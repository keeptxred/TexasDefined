import type { Destination } from "./types";

const SOURCE_CHECKED_AT = "2026-09-08";

export const viatorDestinationExpansionWave9: Destination[] = [
  {
    id: "viator-expansion-galveston-seawall",
    brandId: "texasdefined",
    slug: "galveston-seawall",
    name: "Galveston Seawall",
    summary: "The storm-protection wall and Gulf-front corridor built after the catastrophic 1900 hurricane, now both a landmark of American coastal engineering and one of Galveston's defining public beachfront routes.",
    category: "historic-sites",
    region: "gulf-coast",
    nearestTown: "Galveston",
    county: "Galveston County",
    coordinates: { lat: 29.272664, lng: -94.815186 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/GreatSeawallOfGalveston.jpg?width=1600",
      alt: "Historic view of the Galveston Seawall along the Gulf of Mexico",
      width: 6107,
      height: 4720,
      credit: "Herbert A. French / Library of Congress · Wikimedia Commons · Public domain",
    },
    bestSeason: "Fall through spring for comfortable walking and cycling; summer visits are best planned around heat, sun exposure and changing Gulf weather.",
    entryNote: "The seawall is a public coastal corridor, but beach access, paid parking, transit service and storm conditions can change. Check current City of Galveston parking, beach-access and weather information before a time-sensitive visit.",
    highlights: [
      "Post-1900-hurricane coastal engineering",
      "More than 10 miles of seawall after later extensions",
      "1900 Storm Memorial and Gulf views",
      "Walking, cycling, beaches and Seawall Boulevard access",
    ],
    body: [
      "The Galveston Seawall was one of the defining responses to the hurricane of September 1900, the disaster that killed thousands of island residents and devastated the city. Galveston's official history records that engineers began the protective wall after the storm and completed the first section in 1904. The original work was paired with an extraordinary grade-raising project that lifted thousands of buildings and large areas of the city behind the new barrier.",
      "The wall began as a shorter engineered defense and was extended repeatedly as Galveston's coastal protection system grew. City hazard-planning documents describe the present seawall as more than 10 miles long after extensions completed through the twentieth century. The structure was listed in the National Register of Historic Places in 1977 and later recognized as a National Historic Civil Engineering Landmark, reflecting its importance beyond its everyday role along the beachfront.",
      "Today the seawall is both infrastructure and public space. Seawall Boulevard follows the Gulf-facing edge of the city past beaches, memorials, businesses and visitor attractions, making the corridor useful for walking, cycling and connecting coastal stops. Tour products may package Segway, bicycle or sightseeing experiences along this route, but the durable attraction is the seawall itself; current city sources should control parking, beach-access and storm-safety decisions.",
    ],
    managingAuthority: "City of Galveston",
    officialUrl: "https://www.galvestontx.gov/248/City-History",
    directions: "Seawall Boulevard runs along Galveston's Gulf frontage. The 1900 Storm Memorial near 47th Street provides a useful central reference point, while public beach access and parking extend along multiple sections of the corridor.",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
