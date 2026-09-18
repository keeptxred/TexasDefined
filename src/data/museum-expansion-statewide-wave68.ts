import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import { statewideMuseumExpansionWave69Destinations } from "./museum-expansion-statewide-wave69";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-09-18";

function museumPlaceholder(name: string): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

/**
 * Sixty-eighth statewide museum wave. This record reconciles the audit's
 * legacy "Ysleta Mission Museum" wording to the current Ysleta del Sur Pueblo
 * Cultural Center Museum, which is distinct from the nearby mission church.
 * Wave 69 is chained here so later museum expansion remains conflict-light.
 */
export const statewideMuseumExpansionWave68Destinations: Destination[] = [
  {
    id: "museum-statewide-wave68-ysleta-del-sur-pueblo-cultural-center",
    brandId: "texasdefined",
    slug: "ysleta-del-sur-pueblo-cultural-center-museum-el-paso",
    name: "Ysleta del Sur Pueblo Cultural Center Museum",
    summary: "The Ysleta del Sur Pueblo Cultural Center Museum in El Paso presents the history, culture and living traditions of the Tigua people through artifacts, pottery, photographs, video, interactive exhibits, visiting artists and educational programs operated by the Pueblo.",
    category: "historic-sites",
    region: "big-bend",
    geography: {
      primaryRegionId: "west-texas",
      subregionIds: ["trans-pecos"],
      metroId: "el-paso",
      countySlugs: ["el-paso"],
      travelRegionIds: ["big-bend"],
    },
    nearestTown: "El Paso",
    county: "El Paso County",
    coordinates: { lat: 31.68237, lng: -106.31952 },
    hero: museumPlaceholder("Ysleta del Sur Pueblo Cultural Center Museum"),
    bestSeason: "Year-round for the indoor museum; fall through spring is especially comfortable for combining the Cultural Center with the El Paso Mission Trail and other Lower Valley heritage stops.",
    entryNote: "Ysleta del Sur Pueblo currently lists museum hours Wednesday through Sunday from 10 a.m. to 4 p.m. Cultural demonstrations, social dances, visiting artists and other programs follow separate schedules, so check the Pueblo's current Cultural Center information when planning around a specific event.",
    highlights: [
      "Tigua history and living cultural interpretation",
      "Artifacts, pottery, photographs and video spanning more than three centuries",
      "Interactive museum exhibits and educational programs",
      "Ysleta del Sur Pueblo cultural demonstrations and visiting artists",
    ],
    body: [
      "The Ysleta del Sur Pueblo Cultural Center Museum is a tribal museum operated by Ysleta del Sur Pueblo, the Tigua community whose history in the El Paso region reaches back more than three centuries. The Pueblo describes the museum as a place to educate visitors about its history, culture and the adversity its citizens have overcome, using exhibits with interactive elements alongside artifacts, photographs, pottery and video. That first-person institutional voice makes the Cultural Center an important complement to broader borderlands and mission-history interpretation elsewhere in El Paso.",
      "The museum is part of a larger living cultural center rather than an isolated display hall. Depending on the current program calendar, visitors may encounter social dances, visiting artists, lectures, demonstrations and other cultural programming in addition to the self-guided museum. The Pueblo also supports group and school tours, giving the site an educational role that connects historical collections with contemporary Tigua cultural practice.",
      "For TexasDefined, this destination resolves the audit's older 'Ysleta Mission Museum' wording without conflating two different places. Ysleta Mission is a separate historic church on South Zaragoza Road, while the current tribal museum is at 305 Yaya Lane inside the Ysleta del Sur Pueblo Cultural Center. Keeping those identities separate creates a cleaner El Paso heritage graph: the mission remains part of the established mission-trail authority cluster, while this canonical destination represents the Pueblo-operated museum and cultural interpretation center.",
    ],
    officialUrl: "https://www.ysletadelsurpueblo.org/tourism-hospitality/cultural-center/museum",
    managingAuthority: "Ysleta del Sur Pueblo",
    address: "305 Yaya Ln, El Paso, TX 79907",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  ...statewideMuseumExpansionWave69Destinations,
];
