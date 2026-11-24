/**
 * Licensed historical portraits for three Cass/Linden-linked Texas Icons.
 * File identity, original photographer, period and Commons license record
 * independently checked on 2026-11-24. These images do NOT depict Linden.
 * Do not invent local childhood photos or use unlicensed web results.
 */
export type CassMusicPortrait = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  credit: string;
  sourcePage: string;
  license: string;
  licenseUrl: string;
};

export const cassMusicPortraits: Readonly<Record<string, CassMusicPortrait>> = {
  "don-henley": {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Don_Henley_%28254840967%29.jpg?width=1000",
    width: 1000,
    height: 691,
    alt: "Don Henley backstage at the Grammy Awards in February 1990",
    caption: "Don Henley backstage at the 1990 Grammy Awards. The photo documents his later national career, not his youth in Linden.",
    credit: "Alan Light",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Don_Henley_(254840967).jpg",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
  },
  "t-bone-walker": {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/T-Bone_Walker_1972.jpg?width=1200",
    width: 3507,
    height: 2339,
    alt: "Blues guitarist T-Bone Walker performing at the American Folk Blues Festival in Hamburg, Germany, March 1972",
    caption: "T-Bone Walker at the American Folk Blues Festival in Hamburg, March 1972. His Cass County birth preceded this European performance by six decades.",
    credit: "Heinrich Klaffs",
    sourcePage: "https://commons.wikimedia.org/wiki/File:T-Bone_Walker_1972.jpg",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
  },
  "scott-joplin": {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Scott_Joplin_portrait_photo_highres.jpg?width=960",
    width: 1908,
    height: 2510,
    alt: "Historic formal portrait of ragtime composer Scott Joplin published in 1907",
    caption: "Scott Joplin in a 1907 portrait originally published in American Musician. This archival portrait does not settle his disputed exact Northeast Texas birthplace.",
    credit: "Unknown photographer · American Musician, 1907",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Scott_Joplin_portrait_photo_highres.jpg",
    license: "U.S. public domain (published 1907)",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
  },
};
