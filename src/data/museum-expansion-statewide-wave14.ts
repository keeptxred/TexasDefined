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
 * Fourteenth statewide museum wave. This group closes Panhandle, West Texas
 * and north-central county-history gaps from the original museum inventory
 * using current institutional identities and source-checked visitor records.
 */
export const statewideMuseumExpansionWave14Destinations: Destination[] = [
  {
    id: "museum-statewide-wave14-white-deer-land",
    brandId: "texasdefined",
    slug: "white-deer-land-museum-pampa",
    name: "White Deer Land Museum",
    summary: "The White Deer Land Museum in downtown Pampa preserves Gray County and White Deer Land Company history inside the restored 1916 land-company office, with exhibits spanning Panhandle settlement, Native peoples, the Red River War and community life.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Pampa",
    county: "Gray County",
    coordinates: { lat: 35.53504, lng: -100.96098 },
    hero: museumPlaceholder("White Deer Land Museum"),
    bestSeason: "Year-round indoor history stop; fall through spring is especially comfortable for combining Pampa with broader Panhandle drives.",
    entryNote: "The museum currently lists regular Tuesday-through-Saturday access and free admission. Guided tours are available by request; verify current hours before a special trip because community-museum schedules can change.",
    highlights: ["Restored 1916 White Deer Land Company office", "Gray County history", "Red River War interpretation", "Panhandle settlement and community exhibits"],
    body: [
      "The White Deer Land Museum is unusually valuable because its primary building is part of the collection. The restored White Deer Land Company office connects visitors directly to the land business and settlement forces that shaped Pampa and much of the eastern Texas Panhandle.",
      "Exhibits broaden the story beyond town founding. The museum interprets Native peoples, the Red River War, ranching, settlement and changing community life through artifacts, period rooms, photographs and documentary material tied to Gray County.",
      "For TexasDefined, the museum gives Pampa and Gray County a dedicated local-history authority page that can cross-link to Panhandle road trips, Native and frontier history, nearby historic sites and county content without duplicating broader regional articles."
    ],
    officialUrl: "https://whitedeerlandmuseum.org/",
    managingAuthority: "White Deer Land Museum Foundation",
    address: "112 S Cuyler St, Pampa, TX 79065",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave14-hutchinson-county",
    brandId: "texasdefined",
    slug: "hutchinson-county-historical-museum-borger",
    name: "Hutchinson County Historical Museum",
    summary: "Borger's Hutchinson County Historical Museum traces the county from geology and archaeology through Adobe Walls, ranching and the petroleum boom that created modern Borger, with more than sixty long-term exhibits in a historic downtown building.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Borger",
    county: "Hutchinson County",
    coordinates: { lat: 35.67237, lng: -101.38965 },
    hero: museumPlaceholder("Hutchinson County Historical Museum"),
    bestSeason: "Year-round indoor museum; spring and fall pair especially well with Lake Meredith, Alibates and wider Canadian River country travel.",
    entryNote: "The museum currently publishes Tuesday-Friday hours from 9 a.m. to 5 p.m. and Saturday afternoon hours. Check the museum's visitor page before traveling for holiday or special-event changes.",
    highlights: ["Borger oil-boom history", "Adobe Walls interpretation", "Panhandle archaeology and paleontology", "Ranching and outdoor petroleum exhibits"],
    body: [
      "Hutchinson County's story is larger than Borger's famous oil boom, and the museum deliberately starts much earlier. Geology, fossils, archaeology and early Plains history establish the landscape before later galleries move into exploration, ranching and frontier conflict.",
      "The petroleum era remains a major strength. Borger's rapid 1920s growth, oil-field culture and the people who built the boomtown are interpreted alongside the county's longer agricultural and civic history, giving visitors context for why the city looks and functions as it does today.",
      "For TexasDefined, this page anchors Hutchinson County history and naturally connects to Adobe Walls, Lake Meredith, Alibates Flint Quarries, Panhandle road trips and energy-history content while avoiding a thin standalone 'Borger history' duplicate."
    ],
    officialUrl: "https://hutchinsoncountymuseum.org/",
    managingAuthority: "Hutchinson County Historical Museum / Hutchinson County",
    address: "618 N Main St, Borger, TX 79007",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave14-deaf-smith-county",
    brandId: "texasdefined",
    slug: "deaf-smith-county-museum-hereford",
    name: "Deaf Smith County Museum",
    summary: "The Deaf Smith County Museum in Hereford uses room settings, artifacts and outdoor structures to show how Panhandle pioneers lived, worked and played, including ranch and farm life, a Santa Fe caboose, historic jail cells and World War II material.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Hereford",
    county: "Deaf Smith County",
    coordinates: { lat: 34.81868, lng: -102.39928 },
    hero: museumPlaceholder("Deaf Smith County Museum"),
    bestSeason: "Year-round museum; spring and fall are comfortable for pairing Hereford with Panhandle heritage and agricultural-road-trip stops.",
    entryNote: "The museum's current site and Hereford tourism sources list the museum at 400 Sampson Street. Verify current daily hours and holiday closures before making a special trip; group and E.B. Black House tours may require advance arrangements.",
    highlights: ["Pioneer room recreations", "Santa Fe caboose and outdoor exhibits", "Hereford POW-camp material", "E.B. Black Historical House connection"],
    body: [
      "The Deaf Smith County Museum centers everyday life rather than only major events. Recreated domestic, school, church and commercial spaces make the collection useful for understanding how early residents built routines and institutions on the High Plains.",
      "Outdoor artifacts expand that story with transportation, farm equipment, jail cells and a caboose, while indoor displays include regional archaeology and material connected to the World War II prisoner-of-war camp near Hereford. The museum also manages the separate E.B. Black Historical House.",
      "For TexasDefined, the museum provides a strong Hereford and Deaf Smith County authority node that can connect local agricultural history, railroad development, wartime history, county content and Panhandle travel planning from one canonical destination."
    ],
    officialUrl: "https://www.deafsmithcountymuseum.org/",
    managingAuthority: "Deaf Smith County Historical Society",
    address: "400 Sampson St, Hereford, TX 79045",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },

];
