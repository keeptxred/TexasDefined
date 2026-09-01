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
 * Twentieth statewide museum wave. This group reconciles three remaining
 * Panhandle county-history identities from the legacy inventory to active institutions.
 */
export const statewideMuseumExpansionWave20Destinations: Destination[] = [
  {
    id: "museum-statewide-wave20-parmer-county",
    brandId: "texasdefined",
    slug: "parmer-county-museum-friona",
    name: "Parmer County Museum",
    summary: "Parmer County Museum in Friona preserves county pioneer history in the city's historic first-church site, with collections spanning Friona, Farwell, Bovina, Lazbuddie and the county's XIT Ranch roots.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Friona",
    county: "Parmer County",
    coordinates: { lat: 34.636527, lng: -102.720777 },
    hero: museumPlaceholder("Parmer County Museum"),
    bestSeason: "Year-round by appointment; spring and fall are comfortable for pairing Friona with XIT Ranch and western Panhandle road-trip stops.",
    entryNote: "The museum's current site lists visits by appointment on Monday and Friday and says admission is free. Call before traveling so a volunteer can confirm access.",
    highlights: ["Historic Friona first-church site", "Parmer County pioneer collections", "XIT Ranch history", "Friona, Farwell, Bovina and Lazbuddie community archives"],
    body: [
      "Parmer County Museum grew from a community preservation effort centered on Friona's first church site. The original 1909 frame church burned in 1921, and the adobe chapel built later that year survives as the historic property now associated with the museum.",
      "The institution interprets more than Friona alone. Its current website builds a county-wide story around Friona, Farwell, Bovina, Lazbuddie and other communities, while the county's creation, XIT Ranch origins, rail development, schools and founding families supply a broader western Panhandle context.",
      "For TexasDefined, this becomes the canonical Parmer County museum page and replaces the older 'Parmer County Pioneer Heritage Museum' shorthand with the institution's current public identity, while preserving the Pioneer Heritage Chapel history as part of the page rather than creating a duplicate destination."
    ],
    officialUrl: "https://www.parmercountymuseum.com/",
    managingAuthority: "Friona Pioneer Heritage Chapel & Museum Inc. / Parmer County Museum",
    address: "218 W 6th St, Friona, TX 79035",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave20-collingsworth-county",
    brandId: "texasdefined",
    slug: "collingsworth-county-museum-art-center-wellington",
    name: "Collingsworth County Museum & Art Center",
    summary: "Collingsworth County Museum & Art Center occupies three historic buildings on Wellington's courthouse square, combining county-history exhibits with the Ellis Art Center's local and regional art collection.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Wellington",
    county: "Collingsworth County",
    coordinates: { lat: 34.85839, lng: -100.21317 },
    hero: museumPlaceholder("Collingsworth County Museum & Art Center"),
    bestSeason: "Year-round indoor stop; spring and fall are especially good for combining Wellington's courthouse square, Ozark Trail history and eastern Panhandle drives.",
    entryNote: "The Collingsworth County Chamber currently lists Tuesday-Friday hours from 10 a.m.-5 p.m. or by appointment, with Monday and holiday closures. Confirm hours before a special trip.",
    highlights: ["Three historic courthouse-square buildings", "Collingsworth County local history", "Ellis Art Center", "Permanent collection of roughly 200 original artworks"],
    body: [
      "Collingsworth County Museum & Art Center is built directly into Wellington's courthouse-square fabric. Its collections occupy three historic buildings east of the courthouse, turning a visit into both a museum stop and an introduction to the town's preserved commercial center.",
      "The local-history component preserves photographs, objects and stories tied to schools, businesses, agriculture, churches and families across Collingsworth County. The Pruden Building adds the Ellis Art Center, where local artists, special exhibitions and a permanent collection broaden the institution beyond a conventional county museum.",
      "For TexasDefined, this page provides the canonical Wellington and Collingsworth County museum destination and links naturally to courthouse history, eastern Panhandle road trips and local arts coverage without splitting the museum and art center into competing pages."
    ],
    officialUrl: "https://www.collingsworthchamber.com/plan-a-visit.html",
    managingAuthority: "Collingsworth County Museum & Art Center",
    address: "824 East Ave, Wellington, TX 79095",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave20-sherman-county-depot",
    brandId: "texasdefined",
    slug: "sherman-county-depot-museum-stratford",
    name: "Sherman County Depot Museum",
    summary: "Sherman County Depot Museum in Stratford preserves local history inside the community's historic Santa Fe depot, connecting county collections with the railroad corridor that shaped this northern Panhandle town.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Stratford",
    county: "Sherman County",
    coordinates: { lat: 36.33438, lng: -102.07147 },
    hero: museumPlaceholder("Sherman County Depot Museum"),
    bestSeason: "Year-round local-history stop; spring through fall is comfortable for pairing Stratford with courthouse, Quanah Parker Trail and Panhandle road-trip sites.",
    entryNote: "Texas Time Travel currently lists the museum at 17 N Main Street. Public schedules are limited and small-museum staffing can vary, so call ahead before planning a dedicated interior visit.",
    highlights: ["Historic Santa Fe depot", "Sherman County local history", "Stratford railroad heritage", "Northern Panhandle community collections"],
    body: [
      "Sherman County Depot Museum uses Stratford's railroad history as both setting and subject. Local-history displays are housed in the former Santa Fe depot, preserving a building type that once anchored travel, freight and communication across the northern Panhandle.",
      "The museum's location near the courthouse and active rail corridor makes it especially useful as part of a compact Stratford heritage stop. Community collections add the county's settlement and everyday-life stories to the physical evidence of the railroad era.",
      "For TexasDefined, this becomes Sherman County's canonical museum destination and preserves the current depot-museum identity from Texas Time Travel rather than creating a generic county museum duplicate. It also gives future Stratford, railroad and Quanah Parker Trail content a stable internal-link target."
    ],
    officialUrl: "https://texastimetravel.com/directory/sherman-county-depot-museum/",
    managingAuthority: "Sherman County Depot Museum / Sherman County Historical Society",
    address: "17 N Main St, Stratford, TX 79084",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
