import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-09-01";

function museumPlaceholder(name: string): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

/**
 * Twenty-sixth statewide museum wave. These current North/Central Texas
 * institutions resolve older county-museum shorthand from the statewide audit
 * to the visitor destinations travelers can actually visit today.
 */
export const statewideMuseumExpansionWave26Destinations: Destination[] = [
  {
    id: "museum-statewide-wave26-doss-parker-county",
    brandId: "texasdefined",
    slug: "doss-heritage-culture-center-weatherford",
    name: "Doss Heritage & Culture Center",
    summary: "Weatherford's Doss Heritage & Culture Center is a free Parker County history museum with permanent galleries on Indigenous life, early settlement, cattle drives and local figures including Mary Martin and Larry Hagman, plus rotating exhibitions and historic log cabins.",
    category: "historic-sites",
    region: "prairies-lakes",
    nearestTown: "Weatherford",
    county: "Parker County",
    coordinates: { lat: 32.742327, lng: -97.783219 },
    hero: museumPlaceholder("Doss Heritage & Culture Center"),
    bestSeason: "Year-round indoor museum; fall through spring is especially comfortable for exploring the outdoor historic cabins and combining the visit with downtown Weatherford.",
    entryNote: "Admission is currently free for self-guided visits. The Doss lists Tuesday-Saturday hours from 10 a.m. to 5 p.m., with Thursday extended to 8 p.m.; Sundays and Mondays are closed. Check the current calendar for events or guided-tour arrangements.",
    highlights: ["Parker County and Texas history", "Cattle-drive and Indigenous exhibits", "Mary Martin and Larry Hagman gallery", "Historic log cabins"],
    body: [
      "The Doss Heritage & Culture Center gives Parker County a modern museum built specifically to collect and interpret local history. Its permanent galleries move from Indigenous life and early settlement into pioneer agriculture, cattle drives and the western heritage that still shapes Weatherford's identity.",
      "The museum also reaches into twentieth-century cultural history through its Mary Martin and Larry Hagman collection, while rotating exhibitions keep the galleries from becoming a fixed county chronology. Historic cabins on the grounds add a full-scale architectural layer to the indoor interpretation.",
      "For TexasDefined, the Doss is the current canonical destination behind older Parker County museum shorthand. It can cross-link Weatherford, cattle trails, western heritage, Parker County and family attractions without creating a duplicate page for an obsolete museum name."
    ],
    officialUrl: "https://dosscenter.org/",
    managingAuthority: "James and Dorothy Doss Heritage and Culture Center",
    address: "1400 Texas Dr, Weatherford, TX 76086",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave26-johnson-courthouse",
    brandId: "texasdefined",
    slug: "johnson-county-courthouse-museum-cleburne",
    name: "Johnson County Courthouse Museum",
    summary: "The Johnson County Courthouse Museum occupies the north wing of the restored 1913 courthouse in Cleburne and preserves county history through city-by-city displays, photographs, archival material and collections tied to communities across Johnson County.",
    category: "historic-sites",
    region: "prairies-lakes",
    nearestTown: "Cleburne",
    county: "Johnson County",
    coordinates: { lat: 32.34736, lng: -97.38636 },
    hero: museumPlaceholder("Johnson County Courthouse Museum"),
    bestSeason: "Year-round indoor museum; spring and fall are ideal for combining it with the courthouse square, Cleburne historic sites and Chisholm Trail-area travel.",
    entryNote: "Johnson County currently lists weekday museum hours with a lunch closure, while Visit Cleburne publishes Monday-Thursday 9 a.m.-4 p.m. and Friday 9 a.m.-noon and 1-3 p.m. Verify the county's current schedule before arrival because courthouse access and museum staffing can change.",
    highlights: ["Restored 1913 Johnson County Courthouse", "City-by-city county exhibits", "County photographs and archives", "Downtown Cleburne setting"],
    body: [
      "The Johnson County Courthouse Museum makes county history part of the courthouse experience rather than placing it in a detached facility. The museum occupies the restored courthouse's first-floor north wing, tying its collections directly to the civic building that has anchored downtown Cleburne since 1913.",
      "Displays represent communities across Johnson County rather than focusing only on the county seat. Alvarado, Burleson, Godley, Grandview, Joshua, Keene, Venus and Cleburne all appear within the museum's countywide collecting mission, supported by photographs, documents and local artifacts.",
      "For TexasDefined, this page resolves the inventory's generic Johnson County museum concept to the current courthouse museum. It strengthens Johnson County, Cleburne and courthouse-square authority while creating natural links to Chisholm Trail, railroad and North Texas history content."
    ],
    officialUrl: "https://www.johnsoncountytx.org/departments/museum/historical-commission/projects",
    managingAuthority: "Johnson County Historical Commission",
    address: "2 N Main St, Room 139, Cleburne, TX 76033",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave26-stephenville-house",
    brandId: "texasdefined",
    slug: "stephenville-historical-house-museum",
    name: "Stephenville Historical House Museum",
    summary: "The Stephenville Historical House Museum preserves Erath County and Cross Timbers history across a multi-building campus of nineteenth-century structures, including the John Tarleton Ranch House, Berry Cottage, Center Grove Schoolhouse, log cabins and Chapel on the Bosque.",
    category: "historic-sites",
    region: "prairies-lakes",
    nearestTown: "Stephenville",
    county: "Erath County",
    coordinates: { lat: 32.22502, lng: -98.198775 },
    hero: museumPlaceholder("Stephenville Historical House Museum"),
    bestSeason: "Spring and fall for the most comfortable walk between historic buildings; museum grounds remain open for self-guided visits and photography throughout the year.",
    entryNote: "Admission is currently free. The museum lists Wednesday-Saturday office hours from 10 a.m. to 5 p.m. and Sunday from 1 to 5 p.m.; Monday and Tuesday are closed. The grounds are open daily for self-guided visits, while individual building access can depend on staffing or events.",
    highlights: ["John Tarleton Ranch House", "Berry Cottage", "Center Grove Schoolhouse", "Historic log cabins and Chapel on the Bosque"],
    body: [
      "The Stephenville Historical House Museum is best understood as a preserved campus rather than a single gallery. Historic houses, school and church structures, cabins and outbuildings create a physical landscape for interpreting Erath County and the Cross Timbers region.",
      "Buildings such as the John Tarleton Ranch House and Berry Cottage connect local biography to broader settlement and education history, while period furnishings and exhibits make the complex useful for understanding domestic and community life across multiple eras.",
      "For TexasDefined, this is the current destination that should replace a vague 'Erath County Museum' label. It gives Stephenville and Erath County a canonical heritage anchor that can cross-link Tarleton State University, downtown history, Cross Timbers travel and nearby Dublin-area museum destinations."
    ],
    officialUrl: "https://stephenvillemuseum.com/",
    managingAuthority: "Stephenville Historical House Museum",
    address: "525 E Washington St, Stephenville, TX 76401",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
