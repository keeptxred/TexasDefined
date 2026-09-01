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
 * Tenth statewide museum wave. This group deepens South Texas and borderlands
 * authority with current institutions, current visitor sources, and clean
 * county/coordinate records rather than stale county-museum aliases.
 */
export const statewideMuseumExpansionWave10Destinations: Destination[] = [
  {
    id: "museum-statewide-wave10-rio-grande-republic",
    brandId: "texasdefined",
    slug: "republic-of-the-rio-grande-museum-laredo",
    name: "Republic of the Rio Grande Museum",
    summary: "The Republic of the Rio Grande Museum in Laredo's San Agustin Historic District preserves a mid-nineteenth-century home associated with the short-lived Republic of the Rio Grande and interprets domestic life, ranching, border politics and the layered national history of the Rio Grande frontier.",
    category: "historic-sites",
    region: "south-texas",
    nearestTown: "Laredo",
    county: "Webb County",
    coordinates: { lat: 27.50201, lng: -99.50596 },
    hero: museumPlaceholder("Republic of the Rio Grande Museum"),
    bestSeason: "Fall through spring for comfortable walking in the San Agustin Historic District; the museum itself is a compact indoor historic-house experience year-round.",
    entryNote: "Webb County currently lists Tuesday-Saturday hours from 10 a.m. to 4 p.m., $3 admission and free admission on Tuesdays. Confirm holiday or event changes before arrival.",
    highlights: ["Republic of the Rio Grande history", "Mid-nineteenth-century domestic rooms", "Bilingual republic exhibit", "San Agustin Historic District setting"],
    body: [
      "The Republic of the Rio Grande existed only briefly in 1840, but its story captures the political uncertainty that shaped the lower Rio Grande before the modern U.S.-Mexico boundary hardened. The museum gives that episode a physical setting inside one of Laredo's most important historic districts.",
      "Period rooms interpret household and ranching life with furniture, textiles, utensils and archival material, while the front gallery explains the republic itself. That combination keeps the site from functioning only as a political-history marker; visitors see how borderland families lived during the same era.",
      "For TexasDefined, the museum becomes a natural Webb County authority anchor linking Laredo, San Agustin Plaza, El Camino Real de los Tejas, borderlands history and the neighboring Villa Antigua Border Heritage Museum through a coherent walking cluster."
    ],
    officialUrl: "https://webbcountytx.gov/HistoricalCommission/Museum/",
    managingAuthority: "Webb County Heritage Foundation / Webb County",
    address: "1005 Zaragoza St, Laredo, TX 78040",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave10-villa-antigua",
    brandId: "texasdefined",
    slug: "villa-antigua-border-heritage-museum-laredo",
    name: "Villa Antigua Border Heritage Museum",
    summary: "Laredo's Villa Antigua Border Heritage Museum occupies a restored early-twentieth-century Italianate residence and uses changing exhibitions, preservation programs and educational events to interpret the culture, architecture, industry and people of Webb County and the border region.",
    category: "historic-sites",
    region: "south-texas",
    nearestTown: "Laredo",
    county: "Webb County",
    coordinates: { lat: 27.50234, lng: -99.50417 },
    hero: museumPlaceholder("Villa Antigua Border Heritage Museum"),
    bestSeason: "Fall through spring for the best combination of museum time and walking around historic downtown Laredo; indoor galleries operate year-round.",
    entryNote: "The Webb County Heritage Foundation currently lists Tuesday-Saturday hours from 10 a.m. to 4 p.m., $3 admission and free admission on Tuesdays. Changing exhibits can affect what is on view.",
    highlights: ["Restored Gonzalez-Montemayor residence", "Changing border-history exhibitions", "El Camino Real de los Tejas certified site", "San Agustin District preservation story"],
    body: [
      "The Villa Antigua is an adaptive-reuse success story as much as a museum. The once-endangered Gonzalez-Montemayor home survived abandonment and demolition pressure before Webb County and the Heritage Foundation restored it as a public history site.",
      "Its exhibitions change more often than those at a traditional historic house, allowing the museum to explore archaeology, architecture, migration, industry and community memory across Laredo and the surrounding borderlands. Educational seminars and tours keep preservation itself visible as part of the story.",
      "The museum sits only a short walk from the Republic of the Rio Grande Museum, San Agustin Cathedral and plaza. TexasDefined can therefore use the two museum pages together as a strong internal-link cluster rather than flattening distinct buildings and collections into one generic Laredo history page."
    ],
    officialUrl: "https://www.webbheritage.org/Border-Heritage-Museum",
    managingAuthority: "Webb County Heritage Foundation",
    address: "810 Zaragoza St, Laredo, TX 78040",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave10-kenedy-ranch",
    brandId: "texasdefined",
    slug: "kenedy-ranch-museum-south-texas-sarita",
    name: "Kenedy Ranch Museum of South Texas",
    summary: "The Kenedy Ranch Museum of South Texas in Sarita occupies the restored Kenedy Pasture Company headquarters and interprets three generations of the Kenedy family, vaquero culture, ranching, railroads, oil, philanthropy and development across the Wild Horse Desert.",
    category: "historic-sites",
    region: "south-texas",
    nearestTown: "Sarita",
    county: "Kenedy County",
    coordinates: { lat: 27.22201, lng: -97.79136 },
    hero: museumPlaceholder("Kenedy Ranch Museum of South Texas"),
    bestSeason: "Fall through spring for the most comfortable drive through the South Texas ranch country; the museum galleries are an indoor stop in any season.",
    entryNote: "The Kenedy Memorial Foundation's July 23, 2026 notice lists Monday-Friday and Saturday hours from 10 a.m. to 4 p.m. and Sunday from noon to 4 p.m. Group visits can be scheduled with the museum; check holiday closures before traveling.",
    highlights: ["Kenedy Pasture Company headquarters", "Mifflin and Petra Kenedy history", "Vaquero and ranching culture", "Wild Horse Desert development"],
    body: [
      "Mifflin Kenedy became wealthy first through Rio Grande steamboat operations and later through vast South Texas landholdings, ranching and business development. The museum uses the family's own company headquarters to connect those enterprises to the landscape where they unfolded.",
      "Exhibits follow the Kenedy family across three generations and place vaquero culture, fencing, railroads, oil and town development inside the broader transformation of the Wild Horse Desert. The surviving building gives the story a stronger sense of place than a ranching exhibit removed from the ranch's headquarters community.",
      "For TexasDefined, this destination gives tiny Kenedy County a major heritage anchor and creates useful cross-links to Sarita, Kingsville-area ranch history, South Texas road trips and regional conservation without duplicating generic ranch or county pages."
    ],
    officialUrl: "https://kenedy.org/museum/museum-information/",
    managingAuthority: "John G. and Marie Stella Kenedy Memorial Foundation",
    address: "280 E La Parra Ave, Sarita, TX 78385",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave10-south-texas-alice",
    brandId: "texasdefined",
    slug: "south-texas-museum-alice",
    name: "South Texas Museum",
    summary: "The South Texas Museum in Alice occupies the Recorded Texas Historic Landmark McGill Brothers ranching office and preserves Jim Wells County and regional artifacts tied to cattle, railroads, politics, agriculture and everyday life in the South Texas brush country.",
    category: "historic-sites",
    region: "south-texas",
    nearestTown: "Alice",
    county: "Jim Wells County",
    coordinates: { lat: 27.74956, lng: -98.07432 },
    hero: museumPlaceholder("South Texas Museum"),
    bestSeason: "Year-round indoor museum; fall through spring is most comfortable for adding downtown Alice and other South Texas heritage stops.",
    entryNote: "The Texas Historical Commission's museum record, updated in October 2024, lists Monday-Thursday hours from 10 a.m. to 2 p.m. Because the museum has limited weekly hours, confirm access before making a special trip.",
    highlights: ["McGill Brothers ranching office", "Recorded Texas Historic Landmark", "South Texas cattle and railroad artifacts", "Regional political and community history"],
    body: [
      "The South Texas Museum is housed in a building created for prominent ranchers Claude and Frank McGill, whose cattle operations and civic roles helped shape early Jim Wells County. That ranching-office setting makes the architecture part of the museum's regional story.",
      "Collections extend beyond cattle into railroad, political and household history. Longstanding exhibits have included material connected to the region's rail lines and the complicated political history that made Alice nationally known during the twentieth century.",
      "For TexasDefined, the museum adds a source-backed Alice and Jim Wells County destination that complements Tejano music, ranching and South Texas cultural coverage while giving the county page a direct museum cross-link."
    ],
    officialUrl: "https://atlas.thc.texas.gov/Details/4200001232",
    managingAuthority: "South Texas Museum Corporation",
    address: "66 S Wright St, Alice, TX 78332",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave10-brush-country",
    brandId: "texasdefined",
    slug: "brush-country-museum-cotulla",
    name: "Brush Country Museum",
    summary: "Cotulla's Brush Country Museum preserves La Salle County history in a former one-room school and adjoining historic property, with ranch-life photographs, domestic displays, local artifacts and interpretation of the segregated school system and Lyndon B. Johnson's early teaching years nearby.",
    category: "historic-sites",
    region: "south-texas",
    nearestTown: "Cotulla",
    county: "La Salle County",
    coordinates: { lat: 28.43443, lng: -99.23615 },
    hero: museumPlaceholder("Brush Country Museum"),
    bestSeason: "Fall through spring for comfortable South Texas travel and downtown walking; the museum itself provides a mostly indoor heritage stop.",
    entryNote: "The Texas Historical Commission lists Tuesday-Saturday split hours, 10 a.m.-noon and 2-4 p.m. The museum is still appearing in 2026 Cotulla programming and the 2026 Texas State Travel Guide, but locally operated hours can change; call ahead before a special trip.",
    highlights: ["La Salle County ranch-life collections", "Historic one-room school", "LBJ teaching-era context", "Early-twentieth-century domestic exhibits"],
    body: [
      "The Brush Country Museum grew from a one-room schoolhouse donated to the La Salle County Historical Commission and later expanded with another historic property. Its collections focus on photographs, rooms and objects that make the county's ranching and small-town history tangible.",
      "Education is one of the site's most important themes. Interpretation addresses the segregated Hispanic and Anglo school systems and connects the museum to nearby Welhausen School, where a young Lyndon B. Johnson taught and served as principal before his political career.",
      "For TexasDefined, the museum is the current authority destination behind older La Salle County museum labels. It ties Cotulla, courthouse history, ranching, LBJ history and the Winter Garden/Brush Country region together while clearly warning travelers about volunteer-scale operating hours."
    ],
    officialUrl: "https://atlas.thc.texas.gov/Details/4200000642",
    managingAuthority: "La Salle County Historical Commission",
    address: "201 S Stewart St, Cotulla, TX 78014",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
