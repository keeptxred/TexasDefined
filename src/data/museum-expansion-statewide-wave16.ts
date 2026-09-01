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
 * Sixteenth statewide museum wave. This group closes three additional
 * Panhandle county-history gaps with current institutional identities.
 */
export const statewideMuseumExpansionWave16Destinations: Destination[] = [
  {
    id: "museum-statewide-wave16-roberts-county",
    brandId: "texasdefined",
    slug: "roberts-county-museum-miami",
    name: "Roberts County Museum",
    summary: "Roberts County Museum in Miami occupies the community's historic railroad depot and preserves county history and prehistory, including pioneer material, Native American artifacts and part of the Mead archaeological and paleontological collection.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Miami",
    county: "Roberts County",
    coordinates: { lat: 35.69174, lng: -100.63709 },
    hero: museumPlaceholder("Roberts County Museum"),
    bestSeason: "Year-round local-history stop; spring and fall are comfortable for combining Miami with Canadian, Pampa and eastern Panhandle drives.",
    entryNote: "Roberts County continues to list the museum as a county resource, and the Texas Historical Commission Atlas lists it at 120 E Commercial Street. Current published hours are limited; verify before making a special trip.",
    highlights: ["Historic Miami railroad depot", "Mead archaeological collection", "Roberts County pioneer history", "Regional paleontology and Native American artifacts"],
    body: [
      "Roberts County Museum is housed in a railroad depot whose own history reaches back to the arrival of the Southern Kansas Railway in the late nineteenth century. That setting makes the museum part of Miami's transportation story rather than simply a container for artifacts.",
      "The collection reaches much farther back than the railroad era. Local historical sources and the Texas Historical Commission identify archaeological and paleontological material associated with Judge J. A. Mead's discoveries, alongside pioneer and Native American objects that help explain the county before and after permanent settlement.",
      "For TexasDefined, the museum gives Miami and Roberts County a dedicated authority destination that can cross-link railroad history, archaeology, county content, Panhandle road trips and nearby courthouse or ranching coverage without requiring a generic county-history duplicate."
    ],
    officialUrl: "https://atlas.thc.texas.gov/Details/4200001365",
    managingAuthority: "Roberts County Museum",
    address: "120 E Commercial St, Miami, TX 79059",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave16-stationmasters-house",
    brandId: "texasdefined",
    slug: "stationmasters-house-museum-spearman",
    name: "Stationmaster's House Museum",
    summary: "Stationmaster's House Museum in Spearman preserves Hansford County history across the former Santa Fe stationmaster's cottage, depot and annex, with collections ranging from pioneer life and railroads to military uniforms, local aircraft history and outdoor artifacts.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Spearman",
    county: "Hansford County",
    coordinates: { lat: 36.197283, lng: -101.197333 },
    hero: museumPlaceholder("Stationmaster's House Museum"),
    bestSeason: "Year-round community museum; spring through fall is best for exploring the multi-building grounds and outdoor exhibits.",
    entryNote: "The museum is active in 2026 following renovation work, but visitor access is volunteer-supported and may use scheduled or by-request tours. Confirm current hours or tour arrangements before traveling.",
    highlights: ["Santa Fe stationmaster's house", "Spearman depot and caboose", "Hansford County military collection", "Rue Sanders aircraft and annex exhibits"],
    body: [
      "Stationmaster's House Museum connects Spearman directly to the railroad that helped establish the town. The former stationmaster's cottage anchors a larger complex that includes railroad structures and outdoor exhibits, giving the museum a strong sense of place rather than a purely archival presentation.",
      "Recent community reporting shows the museum active after a substantial renovation period. Student tours in late 2025 and museum committee activity in 2026 document renewed access to the house, caboose and annex, including military uniforms, Rue Sanders' plane and a wider set of Hansford County collections.",
      "For TexasDefined, the museum becomes the canonical Hansford County history destination and can connect railroad development, Spearman, aviation, military history and northern Panhandle road trips while accurately warning visitors that access may depend on current volunteer scheduling."
    ],
    officialUrl: "https://texastimetravel.com/directory/stationmasters-house-museum/",
    managingAuthority: "Stationmaster's House Museum",
    address: "30 S Townsend St, Spearman, TX 79081",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave16-river-valley-pioneer",
    brandId: "texasdefined",
    slug: "river-valley-pioneer-museum-canadian",
    name: "River Valley Pioneer Museum",
    summary: "River Valley Pioneer Museum in Canadian interprets Hemphill County and the eastern Texas Panhandle from Indigenous history and frontier conflict through railroads, ranching, rodeo, farming and the region's oil and natural-gas eras.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Canadian",
    county: "Hemphill County",
    coordinates: { lat: 35.91571, lng: -100.38462 },
    hero: museumPlaceholder("River Valley Pioneer Museum"),
    bestSeason: "Year-round indoor museum; spring and fall pair especially well with Canadian River country and downtown Canadian exploration.",
    entryNote: "The museum's current website publishes Tuesday-Friday daytime hours with seasonal Saturday access. Check the official site before traveling because Saturday and event schedules vary by season.",
    highlights: ["Eastern Panhandle settlement history", "Native American and Red River War context", "Santa Fe railroad and Canadian history", "Ranching, rodeo, oil and gas exhibits"],
    body: [
      "River Valley Pioneer Museum is the current Hemphill County history institution behind older generic county-museum references. Its interpretation starts before permanent Anglo settlement and follows the region through Indigenous history, frontier conflict and the changing Canadian River landscape.",
      "Railroad growth, ranching, farming, rodeo and energy development then explain how Canadian became an important eastern Panhandle community. Permanent collections are supplemented by rotating exhibitions, allowing the museum to serve both as a local archive and an active cultural venue.",
      "For TexasDefined, this page gives Hemphill County one current canonical museum identity that can cross-link Canadian, the Canadian River, Red River War history, railroad travel, ranching and regional road trips instead of preserving a vague or obsolete 'Hemphill County Historical Museum' duplicate."
    ],
    officialUrl: "https://rivervalleymuseum.com/",
    managingAuthority: "River Valley Pioneer Museum",
    address: "118 N 2nd St, Canadian, TX 79014",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
