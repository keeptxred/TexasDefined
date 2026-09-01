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
 * Twenty-fifth statewide museum wave. These county-history institutions were
 * reconciled against the Wave 24 canonical catalog and current visitor sources
 * before inclusion.
 */
export const statewideMuseumExpansionWave25Destinations: Destination[] = [
  {
    id: "museum-statewide-wave25-llano-county",
    brandId: "texasdefined",
    slug: "llano-county-historical-museum",
    name: "Llano County Historical Museum",
    summary: "The Llano County Historical Museum occupies a historic bank building near the courthouse square and interprets frontier settlement, ranching, mining, military service and the distinctive granite and Llanite geology that shaped the Llano area.",
    category: "historic-sites",
    region: "hill-country",
    nearestTown: "Llano",
    county: "Llano County",
    coordinates: { lat: 30.75472, lng: -98.675656 },
    hero: museumPlaceholder("Llano County Historical Museum"),
    bestSeason: "Year-round indoor museum; spring and fall are especially comfortable for combining it with the Llano River, courthouse square and Highland Lakes drives.",
    entryNote: "Current visitor information lists Wednesday-Saturday hours from 10 a.m. to 4 p.m. at 310 Bessemer Avenue. Confirm holiday schedules and current exhibits before making a dedicated trip.",
    highlights: ["Llano County frontier history", "Llanite and granite Rock Room", "Military-history exhibits", "Historic courthouse-square setting"],
    body: [
      "The Llano County Historical Museum connects local history to the physical landscape that makes this part of the Hill Country distinctive. Settlement, ranching and community collections share space with a Rock Room focused on Llanite and granite, materials that tie the county's human story directly to its geology.",
      "The museum's compact scale makes it a natural companion to a broader Llano itinerary rather than an isolated full-day campus. Visitors can move between the galleries, historic downtown, the courthouse and the river while keeping the county's frontier and twentieth-century history in view.",
      "For TexasDefined, this page gives Llano County a canonical cultural anchor that can cross-link geology, Highland Lakes travel, ranching, downtown Llano and county history through one stable destination authority."
    ],
    officialUrl: "https://www.llanomuseum.com/",
    managingAuthority: "Llano County Historical Society",
    address: "310 Bessemer Ave, Llano, TX 78643",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave25-hamilton-county",
    brandId: "texasdefined",
    slug: "hamilton-county-historical-museum",
    name: "Hamilton County Historical Museum",
    summary: "Hamilton County's museum occupies the former 1938 county jail and uses preserved jail spaces, military collections, household artifacts, photographs and an expanding annex to interpret community life across the county.",
    category: "historic-sites",
    region: "hill-country",
    nearestTown: "Hamilton",
    county: "Hamilton County",
    coordinates: { lat: 31.704911, lng: -98.12448 },
    hero: museumPlaceholder("Hamilton County Historical Museum"),
    bestSeason: "Year-round local-history stop; spring and fall are especially comfortable for adding downtown Hamilton and nearby rural heritage destinations.",
    entryNote: "The City of Hamilton currently lists Tuesday and Saturday hours from 10 a.m. to 1 p.m., with visits also available by appointment. The museum is developing an annex in a neighboring historic building, so confirm current access before arrival.",
    highlights: ["Former 1938 county jail", "Preserved jail spaces", "Military and household collections", "Developing museum annex"],
    body: [
      "The Hamilton County Historical Museum turns a former county jail into a broad community-history institution. The 1938 building served as the county's correctional facility for decades, so preserved jail spaces give the museum an architectural story before visitors even reach the larger artifact collections.",
      "Military memorabilia, textiles, household objects, photographs and community records widen the interpretation beyond law enforcement. An adjacent fire-station collection and developing annex show the institution continuing to expand rather than remaining fixed inside the original jail footprint.",
      "For TexasDefined, the museum creates a county-level history anchor for Hamilton that can link rural Central Texas travel, courthouse and civic history, military service and nearby small-town itineraries without substituting a generic regional museum."
    ],
    officialUrl: "https://www.hamiltontexas.com/183/Hamilton-County-Historical-Museum",
    managingAuthority: "Hamilton County Historical Museum",
    address: "115 W Henry St, Hamilton, TX 76531",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave25-eastland-county",
    brandId: "texasdefined",
    slug: "eastland-county-museum",
    name: "Eastland County Museum",
    summary: "The Eastland County Museum fills the restored former Eastland National Bank building with countywide exhibits on oil, medicine, printing, motorcycles, local communities and the colorful stories that shaped this part of Central West Texas.",
    category: "historic-sites",
    region: "prairies-lakes",
    nearestTown: "Eastland",
    county: "Eastland County",
    coordinates: { lat: 32.40119, lng: -98.81786 },
    hero: museumPlaceholder("Eastland County Museum"),
    bestSeason: "Year-round indoor museum; fall through spring is particularly comfortable for combining it with Eastland's courthouse square and regional road-trip stops.",
    entryNote: "The museum currently opens Thursday-Saturday from 10 a.m. to 2 p.m. and does not charge admission. Confirm volunteer staffing, holiday hours and traveling exhibits before making a special trip.",
    highlights: ["Restored Eastland National Bank building", "County community exhibit rooms", "Medical and printing collections", "Old Rip and regional folklore"],
    body: [
      "The Eastland County Museum occupies a five-story former bank building whose restoration is part of the institution's story. Permanent exhibits on the first floor establish the county narrative, while second-floor community rooms allow smaller places such as Gorman, Cisco, Olden and other Eastland County communities to retain their own identities.",
      "The collection is unusually eclectic. Medical artifacts, a Linotype machine, motorcycles, oil-era material and stories such as Old Rip the horned toad reflect both serious economic history and the local folklore that gives the county its personality.",
      "For TexasDefined, the museum provides a countywide authority destination that can connect Eastland, Cisco, oil-boom history, courthouse lore and nearby heritage sites while keeping those specialized stories discoverable from one canonical county-history page."
    ],
    officialUrl: "https://eastlandcountymuseum.com/",
    managingAuthority: "Eastland County Museum & Historical Society",
    address: "114 S Seaman St, Eastland, TX 76448",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave25-coryell-county",
    brandId: "texasdefined",
    slug: "coryell-museum-historical-center-gatesville",
    name: "Coryell Museum & Historical Center",
    summary: "The Coryell Museum & Historical Center in Gatesville presents roughly fifty exhibits across a large county-history museum, including a nationally known spur collection, western material and the preserved 1854 log jail associated with early Coryell County.",
    category: "historic-sites",
    region: "prairies-lakes",
    nearestTown: "Gatesville",
    county: "Coryell County",
    coordinates: { lat: 31.434952, lng: -97.749385 },
    hero: museumPlaceholder("Coryell Museum & Historical Center"),
    bestSeason: "Year-round indoor museum; spring and fall pair well with downtown Gatesville, Fort Hood-area history and Central Texas road trips.",
    entryNote: "The museum currently lists Wednesday-Saturday hours from 10 a.m. to 4 p.m., with the last group admitted at 3:30 p.m. Admission is free, with donations appreciated. Confirm event-day changes before arrival.",
    highlights: ["Lloyd and Madge Mitchell Spur Collection", "1854 log jail", "About fifty exhibits", "Coryell County research and history"],
    body: [
      "The Coryell Museum & Historical Center is one of the larger county museums in this part of Texas, giving it room to move beyond a single chronological gallery. Western material, community collections, historic room settings and research resources let visitors approach Coryell County from several different directions.",
      "Its best-known specialty is the Lloyd and Madge Mitchell Spur Collection, while the preserved 1854 double-walled log jail provides a tangible link to the county's earliest civic history. Together they give the museum both a nationally interesting specialty collection and a distinctly local architectural artifact.",
      "For TexasDefined, the museum strengthens Gatesville and Coryell County authority while creating useful cross-links to western craftsmanship, Fort Hood-area history, courthouse and jail heritage, and Central Texas travel."
    ],
    officialUrl: "https://coryellmuseum.com/plan-your-visit/",
    managingAuthority: "Coryell Museum & Historical Center",
    address: "718 E Main St, Gatesville, TX 76528",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave25-mills-county",
    brandId: "texasdefined",
    slug: "mills-county-historical-museum-goldthwaite",
    name: "Mills County Historical Museum",
    summary: "The Mills County Historical Museum in downtown Goldthwaite preserves artifacts and records tied to Goldthwaite and the surrounding county, providing a compact local-history stop in the northern Hill Country.",
    category: "historic-sites",
    region: "hill-country",
    nearestTown: "Goldthwaite",
    county: "Mills County",
    coordinates: { lat: 31.45072, lng: -98.5706 },
    hero: museumPlaceholder("Mills County Historical Museum"),
    bestSeason: "Year-round local-history stop; spring and fall are especially comfortable for pairing it with downtown Goldthwaite and surrounding Hill Country drives.",
    entryNote: "Current City of Goldthwaite and Texas Historical Commission listings place the museum at 1119 Fisher Street. Published schedules have historically listed weekday daytime hours; verify the museum's current volunteer hours before making a dedicated trip.",
    highlights: ["Mills County local history", "Downtown Goldthwaite", "Volunteer-preserved collections", "County artifacts and community records"],
    body: [
      "The Mills County Historical Museum serves a straightforward but important role: preserving the objects, photographs and records that explain Goldthwaite and the surrounding rural county at a local scale. Its collection is built largely through community donations and volunteer stewardship.",
      "That county focus gives travelers context for a landscape shaped by ranching, farming, small towns and long-distance road connections. The museum is best treated as part of a Goldthwaite or Mills County itinerary rather than as a stand-alone full-day attraction.",
      "For TexasDefined, the page gives Mills County a canonical cultural destination that can support county history, small-town travel and northern Hill Country discovery while linking visitors to the current local institution instead of a generic heritage mention."
    ],
    officialUrl: "https://txmchm.genealogyvillage.com/",
    managingAuthority: "Mills County Historical Museum",
    address: "1119 Fisher St, Goldthwaite, TX 76844",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
