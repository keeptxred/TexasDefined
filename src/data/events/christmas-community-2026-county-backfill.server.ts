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
  },
{
  "slug": "paris-14th-christmas-parade-of-lights-2026",
  "title": "Paris 14th Annual Christmas Parade of Lights",
  "city": "Paris",
  "countySlug": "lamar",
  "countyName": "Lamar County",
  "region": "prairies-lakes",
  "startDate": "2026-12-05",
  "venueName": "Downtown Paris, Texas",
  "officialEventUrl": "https://www.paristexas.gov/321/Events",
  "sourceName": "City of Paris Main Street / Paris Downtown Association",
  "summary": "The City of Paris' 2026 Main Street calendar confirms the 14th Annual Downtown Christmas Parade of Lights on Saturday, December 5 at 6 p.m. Paris Downtown Association coordinates parade information. A separate November 21 tree lighting at the J.J. Culbertson fountain has ended; check the current parade route, traffic changes and staging guidance with the association.",
  "sourceVerifiedAt": "2026-11-22"
},
{
  "slug": "corpus-christi-holidays-on-harbor-2026",
  "title": "Holidays on the Harbor · Christmas Tree Lighting & Boat Parade",
  "city": "Corpus Christi",
  "countySlug": "nueces",
  "countyName": "Nueces County",
  "region": "gulf-coast",
  "startDate": "2026-12-05",
  "venueName": "Water's Edge Park, Corpus Christi Marina & downtown seawall",
  "officialEventUrl": "https://www.visitcorpuschristi.com/merrydays/",
  "sourceName": "Visit Corpus Christi",
  "summary": "Visit Corpus Christi confirms Holidays on the Harbor on Saturday, December 5, 2026. Water's Edge Park hosts family festivities and the 66-foot H-E-B holiday tree lighting from 4–8 p.m., with the ceremony at 6 p.m.; the Port of Corpus Christi Illuminated Boat Parade follows along the marina and downtown seawall from 7–9 p.m. Viewers should confirm waterfront viewing restrictions and weather updates.",
  "sourceVerifiedAt": "2026-11-22"
},
{
  "slug": "corpus-la-posada-lighted-boat-parade-2026",
  "title": "La Posada Lighted Boat Parade · North Padre Island",
  "city": "Corpus Christi",
  "countySlug": "nueces",
  "countyName": "Nueces County",
  "region": "gulf-coast",
  "startDate": "2026-12-11",
  "endDate": "2026-12-12",
  "venueName": "North Padre Island canals and Caravel Boat Ramp",
  "officialEventUrl": "https://www.visitcorpuschristi.com/merrydays/",
  "sourceName": "Visit Corpus Christi / La Posada Foundation",
  "summary": "Visit Corpus Christi confirms the La Posada Foundation's two-night holiday boat parade December 11–12, 2026 on North Padre Island. The Friday December 11 boat parade is listed for 7 p.m.; the Saturday December 12 parade is listed for 6 p.m. The route starts at Caravel Boat Ramp and travels island canals. A separate December 4 fundraising kickoff party is not included in these parade dates.",
  "sourceVerifiedAt": "2026-11-22"
},
{
  "slug": "marshall-wonderland-wassail-walk-2026",
  "title": "Marshall Wonderland of Lights · Wassail Walk",
  "city": "Marshall",
  "countySlug": "harrison",
  "countyName": "Harrison County",
  "region": "piney-woods",
  "startDate": "2026-11-28",
  "venueName": "Historic downtown Marshall",
  "officialEventUrl": "https://marshalltexas.com/",
  "sourceName": "Greater Marshall Chamber of Commerce",
  "summary": "The Greater Marshall Chamber of Commerce official event list confirms its Wonderland of Lights Wassail Walk for Saturday, November 28, 2026 from 1–5 p.m. The Chamber also describes a broader Wonderland of Lights festival from November 25 through December 30, but this calendar entry covers only the verified Wassail Walk day and does not assume every attraction operates on every night.",
  "sourceVerifiedAt": "2026-11-22"
}
];
