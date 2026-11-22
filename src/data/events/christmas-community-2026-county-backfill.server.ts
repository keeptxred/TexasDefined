import type { TexasEventRecord } from "./texas-event-record";

/**
 * 2026 source-confirmed county holiday additions. Never infer 2027 dates.
 * Each event has a dated current-edition first-party organizer or city/tourism URL.
 * Existing events remain untouched; counties without evidence remain research gaps.
 */
export const verifiedCountyChristmasEvents2026: ReadonlyArray<Pick<TexasEventRecord,
  "slug" | "title" | "summary" | "city" | "countySlug" | "countyName" |
  "region" | "startDate" | "endDate" | "venueName" | "officialEventUrl" | "sourceName"
> & { sourceVerifiedAt: string }> = [
  {
    "slug": "andrews-holly-jolly-weekend-2026",
    "title": "Andrews Holly Jolly Weekend & Christmas Parade",
    "city": "Andrews",
    "countySlug": "andrews",
    "countyName": "Andrews County",
    "region": "panhandle",
    "startDate": "2026-12-04",
    "endDate": "2026-12-06",
    "venueName": "Downtown Andrews and ACE Arena",
    "officialEventUrl": "https://www.andrewstx.com/holly-jolly-weekend/",
    "sourceName": "Andrews Chamber of Commerce",
    "summary": "The Andrews Chamber confirms Holly Jolly Weekend December 4–6, 2026. Friday brings the lighted Christmas parade; Saturday includes a free 10 a.m.–noon Breakfast with Santa and the Sugar Plum Marketplace at ACE Arena from 10 a.m.–5 p.m.; Sunday shopping runs noon–5 p.m. The weekend is advertised free to attend, but separately ticketed home tours may require admission. Verify individual event times with the Chamber.",
    "sourceVerifiedAt": "2026-11-22"
  },
  {
    "slug": "bandera-shoppers-jubilee-christmas-2026",
    "title": "Bandera Shoppers Jubilee, Christmas Market & Night Parade",
    "city": "Bandera",
    "countySlug": "bandera",
    "countyName": "Bandera County",
    "region": "hill-country",
    "startDate": "2026-12-11",
    "endDate": "2026-12-12",
    "venueName": "Bandera County Courthouse & historic downtown",
    "officialEventUrl": "https://www.banderacowboycapital.com/events/2026/shoppers-jubilee-weekend-in-bandera",
    "sourceName": "Bandera Business Association / Bandera County tourism",
    "summary": "The official Bandera County tourism calendar confirms Shoppers Jubilee December 11–12, 2026. Downtown scavenger hunt starts at noon Friday; Saturday's Christmas Market runs 11 a.m.–7 p.m. at the courthouse, 500 Main Street, and the lighted night parade begins at 6:30 p.m. in downtown Bandera. Vendor registration fees do not imply spectator admission charges.",
    "sourceVerifiedAt": "2026-11-22"
  },
  {
    "slug": "sealy-fantasy-of-lights-40th-2026",
    "title": "40th Annual Fantasy of Lights · Sealy",
    "city": "Sealy",
    "countySlug": "austin",
    "countyName": "Austin County",
    "region": "prairies-lakes",
    "startDate": "2026-12-05",
    "venueName": "Levine Park, 410 Main Street, Sealy",
    "officialEventUrl": "https://business.sealychamber.com/discover-sealy-austin-events/Details/40th-annual-fantasy-of-lights-1745713?sourceTypeId=Website",
    "sourceName": "Discover Sealy / Sealy Chamber of Commerce",
    "summary": "Discover Sealy's official Chamber listing confirms the 40th Annual Fantasy of Lights on Saturday, December 5, 2026 at Levine Park in Sealy. It marks four decades of the local holiday tradition, with family activities and seasonal downtown celebrations. The organizer describes a weekend of festivities, but the listing does not give an exact second day; this record covers December 5 only.",
    "sourceVerifiedAt": "2026-11-22"
  },
  {
    "slug": "gainesville-92nd-christmas-parade-2026",
    "title": "92nd Annual Gainesville Lighted Christmas Parade",
    "city": "Gainesville",
    "countySlug": "cooke",
    "countyName": "Cooke County",
    "region": "prairies-lakes",
    "startDate": "2026-12-03",
    "venueName": "Historic downtown Gainesville",
    "officialEventUrl": "https://gainesvillecofc.com/christmas-parade/",
    "sourceName": "Gainesville Area Chamber of Commerce",
    "summary": "Gainesville Chamber confirms its 92nd Annual Lighted Christmas Parade on Thursday, December 3, 2026 in downtown Gainesville, with the year's 'Welcome to the Big Top' theme. The parade is a community procession of businesses, schools, churches and civic organizations; the Chamber charges entry fees for participants, not necessarily spectators. Consult the Chamber for route, closures and visitor parking.",
    "sourceVerifiedAt": "2026-11-22"
  },
  {
    "slug": "pittsburg-storybook-christmas-2026",
    "title": "Pittsburg A Storybook Christmas Market & Parade",
    "city": "Pittsburg",
    "countySlug": "camp",
    "countyName": "Camp County",
    "region": "piney-woods",
    "startDate": "2026-12-05",
    "venueName": "Downtown Pittsburg, Texas",
    "officialEventUrl": "https://visit.pittsburgtx.gov/guides/pittsburgs-festivals",
    "sourceName": "City of Pittsburg Tourism / Pittsburg–Camp County Chamber",
    "summary": "The City of Pittsburg tourism office confirms A Storybook Christmas on Saturday, December 5, 2026, with a downtown Christmas market from 8 a.m.–1 p.m., holiday shopping, Santa, food, festive entertainment and a Christmas parade. The city describes a free children's event, but does not establish that every market purchase or activity is free. This is separate from the November 19 city tree lighting at Pilgrim's Plaza.",
    "sourceVerifiedAt": "2026-11-22"
  }
];
