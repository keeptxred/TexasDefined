import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-10-03";

function museumPlaceholder(name: string): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

/**
 * Eighty-fourth statewide museum wave. This record adds Kingsville's city-run
 * 1904 Train Depot Museum and connects the depot directly to Kleberg County's
 * railroad, ranching and downtown-history discovery cluster.
 */
export const statewideMuseumExpansionWave84Destinations: Destination[] = [
  {
    id: "museum-statewide-wave84-1904-train-depot-museum-kingsville",
    brandId: "texasdefined",
    slug: "1904-train-depot-museum",
    name: "1904 Train Depot Museum",
    summary: "Kingsville's 1904 Train Depot Museum preserves the railroad story that created the city, using the restored St. Louis, Brownsville and Mexico Railway depot, railroad artifacts, photographs, operating telegraph equipment and family stories to explain how rail service transformed South Texas commerce and settlement.",
    category: "historic-sites",
    region: "south-texas",
    geography: {
      primaryRegionId: "south-texas",
      subregionIds: ["coastal-bend", "south-texas-brush-country"],
      countySlugs: ["kleberg"],
      travelRegionIds: ["south-texas"],
    },
    nearestTown: "Kingsville",
    county: "Kleberg County",
    coordinates: { lat: 27.51694, lng: -97.86833 },
    hero: museumPlaceholder("1904 Train Depot Museum"),
    bestSeason: "Year-round for the indoor museum and historic downtown; fall through spring is especially comfortable for adding a walking tour of central Kingsville and other Kleberg County heritage stops.",
    entryNote: "The City of Kingsville's current visitor site lists the museum at 102 E. Kleberg Avenue, open Tuesday through Saturday from 10 a.m. to 4 p.m., with free admission. Hours can change for holidays or special events, so verify the official visitor page before a dedicated trip.",
    highlights: [
      "Restored 1904 St. Louis, Brownsville and Mexico Railway depot",
      "Recorded Texas Historic Landmark in Kingsville's National Register downtown district",
      "Railroad signs, publications, lanterns, tools and dining-car artifacts",
      "Operational telegraph and stories of families who arrived in South Texas by rail",
    ],
    body: [
      "Kingsville exists where it does because of the railroad. The St. Louis, Brownsville and Mexico Railway was chartered in 1903 as part of an ambitious effort to open a dependable rail corridor through South Texas. Henrietta King provided land for the Kingsville townsite and railroad facilities, and the new line reached the community in 1904. The Texas State Historical Association records Kingsville as the railway company's principal place of business, while the Texas Historical Commission identifies the surviving depot as a 1904 St. Louis, Brownsville and Mexico Railway building.",
      "The depot is one of the oldest surviving buildings associated with Kingsville's founding period. The Texas Historical Commission describes it as a one-story Spanish Colonial Revival railroad depot with deep eaves, large wood brackets and red barrel-tile roofing, and lists it as a contributing property in the Kingsville Downtown Historic District. A state historical marker notes that the building served rail traffic through border unrest and both world wars; Missouri Pacific took control of the route in 1925, and regular passenger service ended in 1966.",
      "The building returned to public use as a museum in 2004, during Kingsville's centennial. Current City of Kingsville visitor information describes exhibits that include railroad emblems, dining-car place settings, employee and promotional publications, lanterns, tools, an operating telegraph and family stories tied to settlers who came south by rail. The emphasis is not on a large collection of locomotives. Instead, the depot interprets the transportation system that turned a ranch-country rail stop into a South Texas commercial center.",
      "That makes the museum a useful first stop for understanding Kleberg County. The railroad story connects directly to King Ranch, whose land and leadership shaped the townsite; to downtown Kingsville, which grew around the tracks; and to the county's later development as a ranching, university and naval-aviation center. TexasDefined's Kleberg County guide expands those connections and places the depot inside the wider story of South Texas settlement, agriculture, trade and transportation.",
    ],
    officialUrl: "https://kingsvilletexas.com/1904-train-depot-museum/",
    managingAuthority: "City of Kingsville Tourism Department / Kingsville Visitors Center",
    address: "102 E Kleberg Ave, Kingsville, TX 78363",
    sourceCheckedAt: SOURCE_CHECKED_AT,
    accessibilityNotes: "The City visitor page lists comfortable seating, air conditioning and public restrooms. Contact the Kingsville Tourism Department for current accessibility details or assistance before visiting.",
    areaGuide: {
      intro: "The depot sits in historic downtown Kingsville, making it easy to connect the railroad story with the city's ranching, civic and South Texas history.",
      nearbyAttractions: [
        { name: "Kleberg County guide", description: "Use the county guide to connect the depot with King Ranch, Texas A&M–Kingsville, Naval Air Station Kingsville and the county's coastal and ranching landscapes.", proximity: "Same city and county", href: "/county/kleberg" },
        { name: "King Ranch Museum", description: "A separate downtown museum focused on King Ranch history and the ranching institution that helped shape Kingsville.", proximity: "Downtown Kingsville" },
        { name: "Historic Kingsville walking tour", description: "Continue through the downtown historic district with the city's QR-code walking-tour stops and preserved commercial buildings.", proximity: "Steps from the depot" },
      ],
      foodAndDrink: [
        { name: "Historic downtown Kingsville", description: "Downtown cafes and local businesses make the depot practical to combine with a longer walk through the historic core.", proximity: "Walkable from the depot", href: "/county/kleberg" },
      ],
      lodging: [
        { name: "Kingsville", description: "Staying in Kingsville keeps the depot, downtown, ranch-history stops and Texas A&M–Kingsville within a compact base.", proximity: "In town", href: "/county/kleberg" },
      ],
      neighborhoods: [
        { name: "Historic Downtown Kingsville", description: "The National Register district grew around Kingsville's early railroad and commercial core and contains buildings dating to the city's 1904 founding era.", proximity: "Depot district", href: "/county/kleberg" },
      ],
      familyStops: [
        { name: "1904 Train Depot Museum", description: "The free museum's compact scale, telegraph and railroad artifacts make it an approachable history stop for families.", proximity: "On site" },
      ],
      sideTrips: [
        { name: "Kleberg County and the South Texas coast", description: "Use the county guide to extend the railroad-and-ranch story toward the Laguna Madre and Padre Island landscape.", proximity: "Countywide", href: "/county/kleberg" },
      ],
    },
    authorityGuide: {
      whyItMatters: "The depot is a rare place where Kingsville's founding story can be read in the surviving transportation infrastructure itself. It connects the city's 1904 origin, King Ranch land development, South Texas railroad expansion and the growth of a regional trade center in one visitable building.",
      assessment: {
        recommendedVisit: "Allow about 45 to 75 minutes for the museum, then add time for the historic downtown walking tour.",
        physicalEffort: "Low",
        weatherExposure: "Mostly indoors",
        planningLevel: "Low",
        familyFit: "Strong for families interested in trains, local history or compact indoor stops; the museum is free and the surrounding downtown is easy to combine with the visit.",
        firstTimeValue: "High for visitors who want to understand why Kingsville was founded and how railroad, ranching and trade history fit together.",
      },
      itineraries: [
        { label: "Depot only", duration: "45–60 minutes", steps: ["Tour the restored depot", "Focus on the telegraph, railroad tools and StLB&M material", "Read the historical marker outside"] },
        { label: "Downtown history", duration: "2–3 hours", steps: ["Start at the 1904 Train Depot Museum", "Continue on the Historic Kingsville walking tour", "Add the King Ranch Museum or nearby downtown heritage stops"] },
        { label: "Kleberg County history day", duration: "Half day", steps: ["Begin with the depot's railroad origin story", "Use the Kleberg County guide for broader context", "Continue to King Ranch-related history and Texas A&M–Kingsville"] },
      ],
      sources: [
        { label: "Visit Kingsville — 1904 Train Depot Museum", url: "https://kingsvilletexas.com/1904-train-depot-museum/", scope: "Current city-operated visitor information, exhibits, address, hours, admission and management." },
        { label: "City of Kingsville Tourism & Heritage", url: "https://www.cityofkingsville.com/departments/tourism/", scope: "Current municipal tourism authority and confirmation that the department provides visitor services at the depot." },
        { label: "Texas Historical Commission — Kingsville Railroad Depot", url: "https://atlas.thc.texas.gov/Details/5273002955", scope: "Recorded Texas Historic Landmark history, construction date and railroad-era context." },
        { label: "Texas Historical Commission — Kingsville Downtown Historic District", url: "https://atlas.thc.texas.gov/NR/pdfs/100002845/100002845.pdf", scope: "National Register documentation for the depot's contributing status and architectural description." },
        { label: "Texas State Historical Association — St. Louis, Brownsville and Mexico Railway", url: "https://www.tshaonline.org/handbook/entries/st-louis-brownsville-and-mexico-railway", scope: "Railroad charter, construction history, Kingsville headquarters and South Texas network context." },
      ],
    },
  },
];
