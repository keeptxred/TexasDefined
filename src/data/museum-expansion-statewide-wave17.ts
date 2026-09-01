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
 * Seventeenth statewide museum wave. This group closes three additional
 * High Plains and Panhandle county-history gaps with current institutions.
 */
export const statewideMuseumExpansionWave17Destinations: Destination[] = [
  {
    id: "museum-statewide-wave17-heritage-hall-memphis",
    brandId: "texasdefined",
    slug: "heritage-hall-museum-memphis",
    name: "Heritage Hall Museum",
    summary: "Heritage Hall Museum in Memphis preserves Hall County and eastern Panhandle history through community collections, local artifacts and the stories of the people who built the county's ranching, farming and town life.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Memphis",
    county: "Hall County",
    coordinates: { lat: 34.725117, lng: -100.5372 },
    hero: museumPlaceholder("Heritage Hall Museum"),
    bestSeason: "Summer for the museum's published seasonal hours; spring and fall are also good for a Hall County road-trip stop if access is confirmed in advance.",
    entryNote: "The City of Memphis announced summer 2026 museum hours Wednesday-Friday from 1-5 p.m. and every third Saturday. Because this is a locally staffed museum with seasonal access, verify current hours before making a special trip.",
    highlights: ["Hall County community history", "Memphis and eastern Panhandle heritage", "Local pioneer collections", "Seasonal small-town museum stop"],
    body: [
      "Heritage Hall Museum gives Memphis and Hall County a dedicated place to preserve the everyday history that can disappear when a rural community lacks a permanent collecting institution. Its value is the local scale: family, civic, ranching, farming and town stories are interpreted together rather than separated into isolated themes.",
      "The museum remains an active visitor destination. The City of Memphis published 2026 summer access information, confirming current operation while also showing why travelers should treat its schedule as seasonal rather than assume big-city museum hours.",
      "For TexasDefined, Heritage Hall becomes the canonical Hall County museum destination and a useful link between Memphis, county history, High Plains road trips and nearby Panhandle heritage sites without manufacturing a generic duplicate under an older county-museum label."
    ],
    officialUrl: "https://www.cityofmemphistx.com/",
    managingAuthority: "Heritage Hall Museum / City of Memphis",
    address: "101 S 6th St, Memphis, TX 79245",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave17-saints-roost",
    brandId: "texasdefined",
    slug: "saints-roost-museum-clarendon",
    name: "Saints' Roost Museum",
    summary: "Saints' Roost Museum in Clarendon occupies the 1910 Adair Hospital and interprets Donley County and Texas Panhandle pioneer history, including the JA Ranch, Charles and Cornelia Adair, the Red River War, military history and community life.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Clarendon",
    county: "Donley County",
    coordinates: { lat: 34.92695, lng: -100.885983 },
    hero: museumPlaceholder("Saints' Roost Museum"),
    bestSeason: "Year-round indoor history stop; spring and fall are especially comfortable for combining Clarendon with Goodnight and other eastern Panhandle heritage sites.",
    entryNote: "The museum's current site publishes Tuesday-Saturday hours from 10 a.m.-5 p.m., with a midday closure from 12:30-1:30 p.m. Check the official site for holiday or event changes before traveling.",
    highlights: ["1910 Adair Hospital", "JA Ranch and Adair family history", "Red River War interpretation", "Panhandle pioneer and military exhibits"],
    body: [
      "Saints' Roost Museum is unusually well matched to its setting. The museum occupies the former Adair Hospital, tying the building itself to the ranching families and institutions that shaped Clarendon and Donley County in the early twentieth century.",
      "Inside, the story reaches across the wider Panhandle. Exhibits address Cornelia and John Adair, Charles Goodnight and the JA Ranch, while Red River War, military, domestic and country-store material place ranch history beside the broader experience of settlement and community building.",
      "For TexasDefined, Saints' Roost provides a current canonical Donley County museum page that can connect Clarendon, the Goodnight-Adair ranching story, Red River War history and Panhandle road trips instead of preserving a vague legacy 'Donley County Museum' entry."
    ],
    officialUrl: "https://www.saintsroostmuseum.com/",
    managingAuthority: "Saints' Roost Museum",
    address: "610 Harrington St, Clarendon, TX 79226",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave17-hale-county-farm-ranch",
    brandId: "texasdefined",
    slug: "hale-county-farm-ranch-museum-hale-center",
    name: "Hale County Farm and Ranch Museum",
    summary: "Hale County Farm and Ranch Museum near Hale Center preserves High Plains agricultural and railroad history through a restored Santa Fe depot, an early farmhouse, antique tractors, farm machinery and collections tied to rural Hale County life.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Hale Center",
    county: "Hale County",
    coordinates: { lat: 34.07341, lng: -101.93379 },
    hero: museumPlaceholder("Hale County Farm and Ranch Museum"),
    bestSeason: "Spring through fall for the multi-building grounds and agricultural equipment; verify access before a dedicated visit because hours can be event- or volunteer-dependent.",
    entryNote: "Texas Time Travel currently lists the museum at 1434 IH 27, and recent local reporting documents public museum events. Confirm current opening arrangements before traveling because regular hours are not as consistently published as at larger institutions.",
    highlights: ["Restored 1911 Santa Fe depot", "1907 farmhouse", "Antique tractors and farm equipment", "Hale County railroad and agricultural history"],
    body: [
      "Hale County Farm and Ranch Museum tells the High Plains story through buildings and machines that belonged to the landscape it interprets. A restored Santa Fe depot anchors the railroad narrative, while an early farmhouse and agricultural equipment shift the focus to family farms and ranch operations.",
      "The collection's tractors, machinery and smaller artifacts make the museum a practical companion to the region's broader cotton, grain, cattle and transportation history. Instead of treating agriculture as an abstract industry, the site shows the tools and places through which Hale County developed.",
      "For TexasDefined, this destination closes a clear Hale County museum gap and can cross-link Hale Center, Plainview-area travel, agricultural heritage, railroad history and High Plains road trips while retaining cautious visitor guidance for a volunteer-supported institution."
    ],
    officialUrl: "https://texastimetravel.com/directory/hale-county-farm-and-ranch-museum/",
    managingAuthority: "Hale County Farm and Ranch Museum",
    address: "1434 IH 27, Hale Center, TX 79041",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
