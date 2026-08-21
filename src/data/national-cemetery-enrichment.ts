import type { Destination, ImageRef } from "./types";

type NationalCemeteryDetails = {
  address: string;
  hero: ImageRef;
  bestSeason: string;
  entryNote: string;
  directions: string;
};

const nationalCemeteryDetails: Record<string, NationalCemeteryDetails> = {
  "fort-sam-houston-national-cemetery": {
    address: "1520 Harry Wurzbach Road, San Antonio, TX 78209",
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Fort_Sam_Houston_National_Cemetery.jpg?width=1600",
      alt: "Rows of grave markers across Fort Sam Houston National Cemetery in San Antonio",
      width: 1600,
      height: 481,
      credit: "Travis K. Witt · CC BY-SA 4.0 · Wikimedia Commons",
    },
    bestSeason: "Open daily from sunrise to sunset. Spring and fall usually offer the most comfortable weather for walking the grounds.",
    entryNote: "There is no admission fee. The VA visitor kiosk provides gravesite information and maps. Verify current hours, funeral activity and holiday access with the cemetery before visiting.",
    directions: "The cemetery is in northeast San Antonio on Harry Wurzbach Road. The VA advises travelers from San Antonio International Airport to use NE Loop 410, travel east to Harry Wurzbach Road, then continue south about four miles.",
  },
  "houston-national-cemetery": {
    address: "10410 Veterans Memorial Drive, Houston, TX 77038",
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Houston_National_Cemetery.jpg?width=1600",
      alt: "Veterans' grave markers across the green grounds of Houston National Cemetery",
      width: 1600,
      height: 1200,
      credit: "WhisperToMe · CC0 · Wikimedia Commons",
    },
    bestSeason: "Open daily from 6:00 a.m. to 9:00 p.m. Cooler mornings in spring and fall are generally the most comfortable for walking the grounds.",
    entryNote: "There is no admission fee. A VA visitor kiosk provides gravesite information and maps. The cemetery is an active burial site, so visitors should respect funeral processions and verify current access before departure.",
    directions: "Houston National Cemetery is about 15 miles northwest of downtown Houston. From Bush Intercontinental Airport, the VA route uses JFK Boulevard to Beltway 8, then Veterans Memorial Drive and T.C. Jester Boulevard to the cemetery entrance.",
  },
  "dallas-fort-worth-national-cemetery": {
    address: "2000 Mountain Creek Parkway, Dallas, TX 75211",
    hero: {
      src: "https://www.cem.va.gov/CEM/images/cemphotos/916_DallasFtWorth.jpg",
      alt: "Entrance gate at Dallas-Fort Worth National Cemetery in Dallas",
      width: 1200,
      height: 800,
      credit: "U.S. Department of Veterans Affairs · Public domain",
    },
    bestSeason: "Open daily from sunrise to sunset. Spring and fall generally provide the most comfortable temperatures for walking the cemetery's rolling grounds.",
    entryNote: "There is no admission fee. Visitor kiosks provide burial locations and printed maps. The cemetery is active; verify current hours, road access and funeral activity with VA before visiting.",
    directions: "The cemetery is in southwest Dallas between Interstate 20 and Interstate 30, just off Spur 408. VA directions place the entrance on Mountain Creek Parkway.",
  },
};

export function enrichNationalCemeteryDestination(destination: Destination): Destination {
  const details = nationalCemeteryDetails[destination.slug];
  return details
    ? { ...destination, ...details, sourceCheckedAt: "2026-08-21", managingAuthority: "U.S. Department of Veterans Affairs — National Cemetery Administration" }
    : destination;
}
