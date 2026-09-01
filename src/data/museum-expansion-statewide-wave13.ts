import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-08-31";

function museumPlaceholder(name: string): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

/**
 * Thirteenth statewide museum wave. This group reconciles older Rio Grande
 * Valley inventory labels with current operating institutions and verified
 * geospatial records before they enter the canonical destination layer.
 */
export const statewideMuseumExpansionWave13Destinations: Destination[] = [
  {
    id: "museum-statewide-wave13-kelsey-bass",
    brandId: "texasdefined",
    slug: "kelsey-bass-museum-rio-grande-city",
    name: "Kelsey Bass Museum",
    summary: "The Kelsey Bass Museum in historic downtown Rio Grande City preserves Starr County and borderland history through a compact historic-house setting, local collections, rotating community exhibitions and programming connected to the city's wider downtown heritage district.",
    category: "historic-sites",
    region: "south-texas",
    nearestTown: "Rio Grande City",
    county: "Starr County",
    coordinates: { lat: 26.378189, lng: -98.8177489 },
    hero: museumPlaceholder("Kelsey Bass Museum"),
    bestSeason: "Fall through spring for the most comfortable time combining the museum with historic downtown Rio Grande City, Fort Ringgold and other Starr County sites.",
    entryNote: "Rio Grande City Main Street currently lists the museum at 101 S. Washington Street and open Monday through Friday from 9 a.m. to 5 p.m. Some third-party listings show shorter staffed hours, so verify the day's schedule before making a special trip.",
    highlights: ["Historic Kelsey/Bass House", "Starr County local history", "Rotating community exhibits", "Historic downtown Rio Grande City"],
    body: [
      "The Kelsey Bass Museum gives Rio Grande City a dedicated local-history stop inside a historic property rather than separating artifacts from the architecture and streets that shaped the city. Collections and changing displays focus on residents, events and cultural traditions from Starr County and the wider border region.",
      "The museum also functions as a community-programming and event space. That flexible role allows it to host temporary exhibitions and heritage activities while remaining a practical starting point for travelers exploring Rio Grande City's historic downtown and nearby Fort Ringgold.",
      "For TexasDefined, the destination fills the Starr County museum gap in the original audit and creates direct internal links among Rio Grande City, county history, border architecture and South Texas road-trip content. Its canonical page should remain distinct from broader Fort Ringgold and city pages while connecting users to both."
    ],
    officialUrl: "https://www.rgcmainstreet.com/",
    managingAuthority: "Rio Grande City Main Street / City of Rio Grande City",
    address: "101 S Washington St, Rio Grande City, TX 78582",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave13-willacy-county",
    brandId: "texasdefined",
    slug: "willacy-county-historical-museum-raymondville",
    name: "Willacy County Historical Museum",
    summary: "The Willacy County Historical Museum in Raymondville fills a repurposed 1924 school building with regional photographs, ranching artifacts, festival costumes, military uniforms, wildlife collections and community memorabilia documenting the county and South Texas ranch country.",
    category: "historic-sites",
    region: "south-texas",
    nearestTown: "Raymondville",
    county: "Willacy County",
    coordinates: { lat: 26.4785946, lng: -97.7829627 },
    hero: museumPlaceholder("Willacy County Historical Museum"),
    bestSeason: "Year-round museum; fall through spring is especially comfortable for adding Raymondville, ranch-country drives and Laguna Madre-area stops.",
    entryNote: "Current visitor listings place the museum at 427 S. 7th Street and show Tuesday through Saturday daytime access, but community-museum staffing can vary. Call ahead before making a special trip.",
    highlights: ["1924 former Raymondville school", "Mifflin Kenedy ranching artifacts", "Festival and military costume collections", "Thousands of regional photographs"],
    body: [
      "The Willacy County Historical Museum is the active institution behind older references to a Raymondville Historical Museum or Historical Center. Its home in the former Raymondville school gives the museum a large room-to-room format rather than a single-gallery layout.",
      "Collections are unusually eclectic. Ranching material connected to Mifflin Kenedy sits alongside local photographs, military uniforms, festival gowns, murals, wildlife displays and community artifacts, creating a broad portrait of life in and around Willacy County rather than a narrow chronological exhibit.",
      "For TexasDefined, using the current Willacy County identity prevents a stale duplicate URL while strengthening the Raymondville and county pages. The museum also creates natural links to ranching, South Texas history and the broader Rio Grande Valley museum network."
    ],
    officialUrl: "https://texastimetravel.com/directory/willacy-county-historical-museum/",
    managingAuthority: "Willacy County Historical Museum",
    address: "427 S 7th St, Raymondville, TX 78580",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave13-callandret",
    brandId: "texasdefined",
    slug: "callandret-black-history-museum-san-benito",
    name: "Callandret Black History Museum",
    summary: "The Callandret Black History Museum in San Benito preserves the former Joe Callandret School and the stories of Black families in the lower Rio Grande Valley through a recreated classroom, family photographs, oral histories, community records and exhibits on segregation and school integration.",
    category: "historic-sites",
    region: "south-texas",
    nearestTown: "San Benito",
    county: "Cameron County",
    coordinates: { lat: 26.14091, lng: -97.63693 },
    hero: museumPlaceholder("Callandret Black History Museum"),
    bestSeason: "Year-round history destination; fall through spring is best for combining it with San Benito's other cultural sites and outdoor Valley travel.",
    entryNote: "The City of San Benito currently lists Callandret among the city's active nonprofit museums, while Texas Time Travel lists Thursday through Saturday hours from 10 a.m. to 2 p.m. Because the museum is locally operated, confirm current access before traveling.",
    highlights: ["Historic Joe Callandret School", "Lower Rio Grande Valley Black history", "Recreated segregated-era classroom", "Family photographs and oral histories"],
    body: [
      "The museum preserves a chapter of Rio Grande Valley history that can be easy to miss in broader regional narratives. Black families lived in San Benito from the city's early decades, but segregation forced their children into separate and often inadequate school arrangements before the Joe Callandret School opened in the early 1950s.",
      "The preserved school now uses family photographs, school records, oral histories and a recreated classroom to document that community and the transition toward integration. The building itself is central evidence: it was created specifically for Black students and later served other school functions before preservation partners converted it into a museum.",
      "For TexasDefined, Callandret adds a distinct Black-history authority page to a San Benito cluster already covering Freddy Fender and conjunto music. Cross-linking those destinations shows that the city's cultural story includes education, race, music, agriculture and border-community life rather than a single heritage theme."
    ],
    officialUrl: "https://www.callandretmuseum.com/",
    managingAuthority: "San Benito Historical Society",
    address: "305 W Doherty St, San Benito, TX 78586",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
