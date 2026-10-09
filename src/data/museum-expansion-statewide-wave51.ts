import type { Destination } from "./types";

const SOURCE_CHECKED_AT = "2026-10-09";

/**
 * Fifty-first statewide museum wave. This Graham record adds the active Old
 * Post Office Museum & Art Center, now branded as The Old Post, in the city's
 * restored 1936 federal post office. This module owns the canonical record;
 * the older Wave 14 duplicate is retired to a permanent redirect.
 */
export const statewideMuseumExpansionWave51Destinations: Destination[] = [
  {
    id: "museum-statewide-wave51-old-post-graham",
    brandId: "texasdefined",
    slug: "old-post-office-museum-art-center-graham",
    name: "The Old Post",
    summary: "The Old Post in Graham is Young County's historic Old Post Office Museum & Art Center, pairing local history, rotating art exhibitions and educational programming inside the city's preserved 1936 federal post office.",
    category: "historic-sites",
    region: "prairies-lakes",
    nearestTown: "Graham",
    county: "Young County",
    coordinates: { lat: 33.10558, lng: -98.59071 },
    hero: {
      src: "https://upload.wikimedia.org/wikipedia/commons/4/47/United_States_Post_Office_Graham_Wiki_%281_of_1%29.jpg",
      alt: "The Old Post Museum and Art Center in Graham's historic United States Post Office building at 510 Third Street",
      width: 1800,
      height: 1200,
      credit: "Renelibrary · Wikimedia Commons · CC BY-SA 4.0 (photographed 2017)",
    },
    bestSeason: "Year-round for indoor exhibits and programs; fall through spring is especially comfortable for combining downtown Graham with nearby Possum Kingdom Lake and other North Texas heritage stops.",
    entryNote: "The museum currently publishes Tuesday-Saturday hours from 10 a.m. to 4 p.m. and is closed Sundays and Mondays. Check the current exhibition and event calendar before a dedicated trip because gallery installations, programs and holiday schedules can change.",
    highlights: [
      "Restored 1936 Graham federal post office",
      "Alexandre Hogue's 1939 Oil Fields of Graham mural",
      "Rotating art and Young County history exhibitions",
      "Educational programs, workshops and community events",
    ],
    body: [
      "The Old Post is Graham's historic Old Post Office Museum & Art Center, a local institution devoted to Young County history, art and culture. It occupies the city's 1936 federal post office at 510 Third Street, a building listed in the National Register of Historic Places and recognized as a Recorded Texas Historic Landmark. The City of Graham acquired the former postal building in 1994 for museum use, preserving important interior features as the site transitioned into an educational museum and cultural center.",
      "A defining feature of the building is Alexandre Hogue's 1939 mural Oil Fields of Graham, which remains in its original lobby location. The museum also presents rotating art exhibitions, historical displays and educational programming rather than functioning as a static local-history archive. Its current 2026 schedule includes changing exhibitions and community programs, reinforcing the institution's role as an active cultural destination in downtown Graham.",
      "The Old Post currently operates Tuesday through Saturday and maintains an active first-party visitor and events program. Texas Time Travel places the museum in the Lakes Trail Region, which TexasDefined maps to its broader Prairies & Lakes Explore region. Using the current The Old Post identity while retaining the full Old Post Office Museum & Art Center context gives Graham and Young County one clear canonical museum authority destination for search, county discovery and internal linking.",
    ],
    areaGuide: {
      intro: "The Old Post's art and civic history complements the separate Young County Museum of History & Culture in downtown Graham.",
      nearbyAttractions: [
        { name: "Young County Museum of History & Culture", description: "At 609 Fourth Street, the dedicated county-history museum preserves frontier, ranching, oil, map and oral-history collections.", href: "/destination/young-county-museum-of-history-and-culture" },
        { name: "Young County Courthouse and Square", description: "The downtown civic core puts Graham's changing county-seat history into its modern streetscape.", href: "/destination/graham" },
      ],
      foodAndDrink: [{ name: "Downtown Graham", description: "Cafes and local dining choices near the courthouse square." }],
      lodging: [{ name: "Graham", description: "A practical base for a Young County museum and frontier-history day." }],
      neighborhoods: [{ name: "Graham courthouse district", description: "Walk the historic downtown core and compare its civic buildings with The Old Post." }],
      familyStops: [{ name: "Young County Museum of History & Culture", description: "Ask about group and student programs on county history.", href: "/destination/young-county-museum-of-history-and-culture" }],
      sideTrips: [{ name: "Explore Young County", description: "Continue toward Fort Belknap, Newcastle and the upper Brazos country.", href: "/county/young" }],
    },
    officialUrl: "https://www.theoldpost.org/",
    managingAuthority: "Old Post Office Museum & Art Center",
    address: "510 Third Street, Graham, TX 76450",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
