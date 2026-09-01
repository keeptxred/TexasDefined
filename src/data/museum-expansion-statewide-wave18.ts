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
 * Eighteenth statewide museum wave. This group closes two additional
 * southern High Plains county-history gaps with current visitor evidence.
 */
export const statewideMuseumExpansionWave18Destinations: Destination[] = [
  {
    id: "museum-statewide-wave18-floyd-county",
    brandId: "texasdefined",
    slug: "floyd-county-historical-museum-floydada",
    name: "Floyd County Historical Museum",
    summary: "Floyd County Historical Museum in downtown Floydada preserves county and Llano Estacado history, including pioneer collections, genealogy resources and artifacts tied to archaeological evidence of Francisco Vázquez de Coronado's 1541 expedition through nearby Blanco Canyon.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Floydada",
    county: "Floyd County",
    coordinates: { lat: 33.98584, lng: -101.33436 },
    hero: museumPlaceholder("Floyd County Historical Museum"),
    bestSeason: "Year-round indoor history stop; fall pairs especially well with Floydada's Pumpkin Capital events and spring is comfortable for a broader Llano Estacado drive.",
    entryNote: "Recent Floydada reporting lists weekday hours from 1-5 p.m., and Humanities Texas booked a traveling exhibition at the museum in May-June 2026. Confirm current hours before a special trip because local schedules can change.",
    highlights: ["Coronado expedition artifacts", "Floyd County pioneer history", "History and genealogy center", "Downtown Floydada courthouse-square setting"],
    body: [
      "Floyd County Historical Museum is more than a county memorabilia room because one of its strongest stories reaches back four centuries before Floydada itself. Archaeological work in nearby Blanco Canyon produced evidence associated with Francisco Vázquez de Coronado's 1541 expedition, and the museum preserves and interprets material connected with that nationally significant chapter of Plains history.",
      "The museum also serves as a repository for the people and communities that shaped Floyd County after settlement. Pioneer artifacts, photographs and genealogy resources make it a practical research stop as well as a visitor attraction, while its courthouse-square location ties the collection directly to Floydada's civic center.",
      "For TexasDefined, this page becomes the canonical Floyd County museum destination and can connect Coronado and Blanco Canyon, courthouse-square history, genealogy, farming communities and southern High Plains road trips without creating a generic duplicate under a broader county-history label."
    ],
    officialUrl: "https://www.humanitiestexas.org/exhibitions/list/by-title/vaquero-genesis-texas-cowboy",
    managingAuthority: "Floyd County Historical Museum",
    address: "105 E Missouri St, Floydada, TX 79235",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave18-motley-county",
    brandId: "texasdefined",
    slug: "motley-county-historical-museum-matador",
    name: "Motley County Historical Museum",
    summary: "Motley County Historical Museum in Matador occupies the former Traweek Hospital and interprets county history through ranching, Native American heritage, veterans, schools, saddle making, medical history and a detailed diorama of early Matador.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Matador",
    county: "Motley County",
    coordinates: { lat: 34.01304, lng: -100.82358 },
    hero: museumPlaceholder("Motley County Historical Museum"),
    bestSeason: "Year-round local-history stop; spring and fall are especially good for pairing Matador with Caprock and Quanah Parker Trail sites.",
    entryNote: "Texas Time Travel currently lists the museum at 828 Dundee Street with phone access information, while current map listings show limited weekly hours. Call ahead before a dedicated trip because this is a small locally staffed museum.",
    highlights: ["Former Traweek Hospital", "Matador Ranch and county history", "Native American and Quanah Parker context", "Early Matador diorama and saddle-making exhibits"],
    body: [
      "Motley County Historical Museum occupies a building that is itself part of county history: the former Traweek Hospital, built in the late 1920s for Dr. A. E. Traweek. That setting allows medical and community history to sit beside the ranching story for which Matador is best known.",
      "Current Texas Time Travel material describes exhibits spanning veterans, schools, ranching, Native American history, saddle making and early Matador. Older Texas Historical Commission interpretation also documents the museum's collection of photographs connected to Quanah Parker's visits, making it a useful companion to the official Quanah Parker Trail and nearby historic jail.",
      "For TexasDefined, the museum becomes Motley County's canonical local-history destination and can cross-link Matador Ranch history, Quanah Parker, rural medicine, the historic jail and eastern Panhandle road trips while making the museum's limited access expectations clear."
    ],
    officialUrl: "https://texastimetravel.com/directory/motley-county-historical-museum/",
    managingAuthority: "Motley County Historical Museum",
    address: "828 Dundee St, Matador, TX 79244",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
