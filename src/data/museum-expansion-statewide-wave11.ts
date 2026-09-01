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
 * Eleventh statewide museum wave. This group strengthens Lower Rio Grande
 * Valley authority with current institutions and keeps related Brownsville
 * museums as separate canonical destinations while making their shared-ticket
 * and walkable-campus relationships explicit.
 */
export const statewideMuseumExpansionWave11Destinations: Destination[] = [
  {
    id: "museum-statewide-wave11-historic-brownsville",
    brandId: "texasdefined",
    slug: "historic-brownsville-museum",
    name: "Historic Brownsville Museum",
    summary: "The Historic Brownsville Museum occupies the restored 1928 Southern Pacific Railroad Depot and interprets the founding and development of Brownsville through local-history exhibits, a rare 1872 Rio Grande Railroad locomotive and an adjoining education center.",
    category: "historic-sites",
    region: "south-texas",
    nearestTown: "Brownsville",
    county: "Cameron County",
    coordinates: { lat: 25.90749, lng: -97.49919 },
    hero: museumPlaceholder("Historic Brownsville Museum"),
    bestSeason: "Year-round indoor museum; fall through spring is the most comfortable time for combining the depot with a downtown Brownsville walking itinerary.",
    entryNote: "The Brownsville Historical Association currently lists Tuesday-Saturday hours from 10 a.m. to 4 p.m. Admission also includes the Simón Celaya Railroad Gallery and Mary A. Yturria Education Center; confirm holiday and special-event changes before arrival.",
    highlights: ["1928 Southern Pacific Railroad Depot", "1872 Rio Grande Railroad locomotive", "Brownsville founding history", "Simón Celaya Railroad Gallery"],
    body: [
      "The Historic Brownsville Museum gives the city's origin story a transportation setting that is itself historically important. The Spanish Colonial Revival depot is a Recorded Texas Historic Landmark and National Register property, preserving the architecture of the passenger-rail era while the galleries explain Brownsville's establishment and later growth.",
      "Railroad history is one of the destination's strongest differentiators. Admission extends to the Simón Celaya Railroad Gallery, where an 1872 Baldwin narrow-gauge locomotive helps explain the Rio Grande Railroad connection between Brownsville and Point Isabel. The adjoining education center supports rotating cultural programs and exhibits.",
      "For TexasDefined, this destination forms one leg of a Brownsville Historical Association cluster rather than a generic city-history page. It should cross-link the Stillman House and Brownsville Heritage Museum while retaining its own canonical URL because its depot, locomotive and transportation interpretation are distinct."
    ],
    officialUrl: "https://www.brownsvillehistory.org/historic-brownsville-museum-brownsville-historical-association.html",
    managingAuthority: "Brownsville Historical Association",
    address: "641 E Madison St, Brownsville, TX 78520",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave11-stillman-house",
    brandId: "texasdefined",
    slug: "stillman-house-museum-brownsville",
    name: "Stillman House Museum",
    summary: "The Stillman House Museum preserves one of Brownsville's oldest surviving homes, a Greek Revival residence associated with city founder Charles Stillman and the Treviño family, with original architectural features, courtyards and interpretation of nineteenth-century borderland life.",
    category: "historic-sites",
    region: "south-texas",
    nearestTown: "Brownsville",
    county: "Cameron County",
    coordinates: { lat: 25.90123, lng: -97.49622 },
    hero: museumPlaceholder("Stillman House Museum"),
    bestSeason: "Fall through spring for the most pleasant time in the courtyards and historic downtown; the house interior can be visited year-round during museum hours.",
    entryNote: "The Brownsville Historical Association currently lists Tuesday-Saturday hours from 10 a.m. to 4 p.m. Admission is paired with the Brownsville Heritage Museum at the same Washington Street complex; guided tours are available by arrangement.",
    highlights: ["1850 Greek Revival house", "Charles Stillman and Treviño family history", "Original windows, shutters and doors", "Shared Heritage Museum admission"],
    body: [
      "The Stillman House survives from the formative decades of Brownsville, when the Rio Grande border was politically unsettled and commercial families were building a new city. Charles Stillman, widely associated with Brownsville's founding, lived in the house with his wife after it was built by hotelier Henry Miller.",
      "Later ownership by the Treviño family ties the property to Mexican diplomatic and political history as well as Brownsville domestic life. Original windows, shutters, doors and breezy courtyards remain central to the experience, making the house useful for architectural history as well as biography.",
      "TexasDefined should keep the Stillman House separate from the neighboring Heritage Museum even though one admission covers both. The house is a place-based historic resource with its own story, while the Heritage Museum provides a broader chronological interpretation of Brownsville and the surrounding region."
    ],
    officialUrl: "https://www.brownsvillehistory.org/stillman-house-museum-brownsville-historical-association.html",
    managingAuthority: "Brownsville Historical Association",
    address: "1325 E Washington St, Brownsville, TX 78520",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave11-brownsville-heritage",
    brandId: "texasdefined",
    slug: "brownsville-heritage-museum",
    name: "Brownsville Heritage Museum",
    summary: "The Brownsville Heritage Museum uses photographs, maps, costumes, artifacts and interactive displays to trace Brownsville and the surrounding region from exploration and settlement through ranching, transportation, education and the first half of the twentieth century.",
    category: "historic-sites",
    region: "south-texas",
    nearestTown: "Brownsville",
    county: "Cameron County",
    coordinates: { lat: 25.90082, lng: -97.49612 },
    hero: museumPlaceholder("Brownsville Heritage Museum"),
    bestSeason: "Year-round indoor museum; fall through spring makes it easy to combine the galleries with Stillman House and a downtown historic-district walk.",
    entryNote: "The museum currently opens Tuesday-Saturday from 10 a.m. to 4 p.m. Its admission is paired with the Stillman House Museum, and some Brownsville Historical Association sites require appointments, so verify the day's access before a multi-site visit.",
    highlights: ["Brownsville photographic history", "Maps, costumes and community artifacts", "Interactive local-history exhibits", "Shared Stillman House admission"],
    body: [
      "The Brownsville Heritage Museum is the broad chronological counterpart to the association's more site-specific historic properties. Its collections use photographs, maps, clothing and everyday objects to show how streets, schools, transportation, ranching and public life changed as Brownsville developed.",
      "Interactive interpretation adds context for visitors who may know the city mainly through border geography or modern travel. The museum also serves as a program and event space, keeping local history connected to present-day community life rather than limiting the building to static displays.",
      "For TexasDefined, this page should link directly to Stillman House because the two share admission and a Washington Street complex, while also linking the Historic Brownsville Museum depot. Keeping three canonical pages preserves distinct search intent without hiding the fact that visitors can efficiently experience them as one Brownsville museum cluster."
    ],
    officialUrl: "https://www.brownsvillehistory.org/heritage-museum-brownsville-historical-association.html",
    managingAuthority: "Brownsville Historical Association",
    address: "1325 E Washington St, Brownsville, TX 78520",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave11-weslaco",
    brandId: "texasdefined",
    slug: "weslaco-museum",
    name: "The Weslaco Museum",
    summary: "The Weslaco Museum combines Rio Grande Valley local history with rotating regional art, covering geology, Indigenous and Spanish history, immigration, agriculture, segregation, military service and the city's distinctive produce-inspired Weslaco Style Show tradition.",
    category: "historic-sites",
    region: "south-texas",
    nearestTown: "Weslaco",
    county: "Hidalgo County",
    coordinates: { lat: 26.15591, lng: -97.98945 },
    hero: museumPlaceholder("The Weslaco Museum"),
    bestSeason: "Year-round indoor museum; fall through spring is most comfortable for combining it with downtown Weslaco and other Lower Rio Grande Valley attractions.",
    entryNote: "The museum currently lists Tuesday-Saturday hours from 10 a.m. to 4 p.m. Admission is modest, with free entry on the first Saturday of the month; check the museum calendar for rotating art exhibitions and special programs.",
    highlights: ["Weslaco and Rio Grande Valley history", "Agriculture and immigration exhibits", "Weslaco Style Show produce-dress tradition", "Rotating regional art gallery"],
    body: [
      "The Weslaco Museum uses a broad local-history timeline to place the city inside the larger Rio Grande Valley story. Exhibits move from geology and Indigenous history through Spanish colonization, migration, agriculture, economic development, education and military service.",
      "One of the most distinctive local themes is the Weslaco Style Show, remembered for elaborate costumes created from or inspired by Valley produce. That tradition links agriculture, civic promotion and creative culture in a way that is unusually specific to Weslaco.",
      "For TexasDefined, the museum gives Hidalgo County a second kind of cultural anchor alongside the Museum of South Texas History in Edinburg. It provides city-level Weslaco authority while creating regional links to agriculture, immigration, arts and Valley road-trip content."
    ],
    officialUrl: "https://weslacomuseum.org/visit",
    managingAuthority: "The Weslaco Museum",
    address: "500 S Texas Blvd, Weslaco, TX 78596",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave11-mcallen-heritage",
    brandId: "texasdefined",
    slug: "mcallen-heritage-center",
    name: "McAllen Heritage Center",
    summary: "The McAllen Heritage Center occupies the historic La Placita former post office in downtown McAllen and preserves the city's development through photographs, memorabilia, oral-history material, changing exhibits and local-art displays.",
    category: "historic-sites",
    region: "south-texas",
    nearestTown: "McAllen",
    county: "Hidalgo County",
    coordinates: { lat: 26.19938, lng: -98.2328 },
    hero: museumPlaceholder("McAllen Heritage Center"),
    bestSeason: "Year-round indoor museum; fall through spring is especially pleasant for adding a downtown McAllen walking itinerary.",
    entryNote: "Explore McAllen currently identifies the center as a free museum in the historic La Placita building. Public hours and Saturday access have varied over time, so confirm the current calendar or arrange a group tour before making a special trip.",
    highlights: ["Historic La Placita building", "McAllen photographs and memorabilia", "City-development history", "Free admission"],
    body: [
      "The McAllen Heritage Center gives one of the Valley's largest modern cities a dedicated place to interpret how it grew. Photographs, memorabilia and local-history displays trace McAllen from ranching and early settlement through transportation, commerce, banking and twentieth-century urban development.",
      "The building strengthens the story. The Spanish Colonial Revival former post office is a Recorded Texas Historic Landmark and places the museum inside a civic structure that served McAllen during a major period of growth. Local-art and changing exhibits keep the center connected to present community culture.",
      "For TexasDefined, the center fills a city-level Hidalgo County gap without duplicating the broader regional history mission of Edinburg's Museum of South Texas History. It can cross-link downtown McAllen, architecture, local landmarks and Valley cultural itineraries through one canonical page."
    ],
    officialUrl: "https://www.mcallenheritagecenter.com/",
    managingAuthority: "McAllen Heritage Center, Inc.",
    address: "301 S Main St, McAllen, TX 78501",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
