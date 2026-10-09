import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import { statewideMuseumExpansionWave69Destinations } from "./museum-expansion-statewide-wave69";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-10-09";

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
    summary: "Visit the Ysleta del Sur Pueblo Cultural Center Museum in El Paso: Tigua history, exhibits, actual museum photos, verified visiting hours, program guidance and the nearby Ysleta Mission.",
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
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Tigua_Cultural_Center.jpg?width=1600",
      alt: "Authentic photograph of the Tigua Cultural Center at Ysleta del Sur Pueblo in El Paso, Texas",
      width: 1600,
      height: 1200,
      credit: "Sue Barnum · 2020 · CC BY-SA 4.0 · Wikimedia Commons",
    },
    bestSeason: "Year-round for the indoor museum; fall through spring is especially comfortable for combining the Cultural Center with the El Paso Mission Trail and other Lower Valley heritage stops.",
    entryNote: "Museum-specific official sources list Wednesday–Sunday, 10 a.m.–4 p.m.; other Cultural Center and gift-shop pages list different schedules. Call (915) 859-7700 to confirm museum access, admission, tours and public programming. School/group tours require advance coordination.",
    highlights: [
      "Tigua history and living cultural interpretation",
      "Artifacts, pottery, photographs and video spanning more than three centuries",
      "Interactive museum exhibits and educational programs",
      "Ysleta del Sur Pueblo cultural demonstrations and visiting artists",
    ],
    body: [
      "The Ysleta del Sur Pueblo Cultural Center Museum is a tribal museum operated by Ysleta del Sur Pueblo, the Tigua community whose history in the El Paso region reaches back more than three centuries. The Pueblo describes the museum as a place to educate visitors about its history, culture and the adversity its citizens have overcome, using exhibits with interactive elements alongside artifacts, photographs, pottery and video. That first-person institutional voice makes the Cultural Center an important complement to broader borderlands and mission-history interpretation elsewhere in El Paso.",
      "The museum is part of a larger living cultural center rather than an isolated display hall. Depending on the current program calendar, visitors may encounter social dances, visiting artists, lectures, demonstrations and other cultural programming in addition to the self-guided museum. The Pueblo also supports group and school tours, giving the site an educational role that connects historical collections with contemporary Tigua cultural practice.",
      "This destination should not be confused with Ysleta Mission. The mission is a separate historic church on South Zaragoza Road, while the current tribal museum is at 305 Yaya Lane inside the Ysleta del Sur Pueblo Cultural Center. Keeping those identities separate gives visitors a clearer El Paso heritage itinerary: the mission remains part of the mission trail, while the Pueblo-operated museum interprets Tigua history and culture.",
    ],
    authorityGuide: {
      whyItMatters: "A community-led museum operated by the only federally recognized Pueblo in Texas, offering a first-person account of the Tigua people's history and their living culture, sovereign government and preservation work.",
      assessment: {
        recommendedVisit: "Allow about 45–90 minutes for a self-guided museum visit (editorial estimate), with extra time for a confirmed public program.",
        physicalEffort: "Low",
        weatherExposure: "Mostly indoors",
        planningLevel: "Moderate",
        familyFit: "The Pueblo offers school and group visits; request current facilities and tour arrangements directly.",
        firstTimeValue: "A high-value first stop for understanding Tigua history before exploring Ysleta Mission and El Paso's Mission Trail.",
      },
      itineraries: [
        { label: "Museum essentials", duration: "45–90 min estimated", steps: ["Visit the history exhibits", "Study the objects and photographs", "Visit the gift shop if open"] },
        { label: "School or group", duration: "By advance arrangement", steps: ["Contact staff to organize a guided visit", "Confirm supervision and access needs", "Ask about current public interpretation"] },
        { label: "Pueblo and mission", duration: "Half-day estimated", steps: ["Explore the Cultural Center Museum", "Check church access at Ysleta Mission", "Continue to Socorro Mission if time permits"] },
      ],
      sources: [
        { label: "Ysleta del Sur Pueblo museum", url: "https://www.ysletadelsurpueblo.org/tourism-hospitality/cultural-center/museum", scope: "Official museum hours, exhibits, programs and group tours." },
        { label: "Ysleta del Sur Pueblo history", url: "https://www.ysletadelsurpueblo.org/about-us", scope: "Pueblo voice on community origins and living heritage." },
        { label: "Pueblo cultural preservation department", url: "https://www.ysletadelsurpueblo.org/tribal-services/department-of-cultural-preservation", scope: "Tribal program mission, community restrictions and interpretation." },
        { label: "Texas Historical Commission museum listing", url: "https://atlas.thc.texas.gov/details/4200001263", scope: "Current museum contact information and hours, updated September 27, 2026." },
        { label: "Handbook of Texas museum history", url: "https://www.tshaonline.org/handbook/entries/ysleta-del-sur-pueblo-museum", scope: "Historic 1975 opening and 1992 fire." },
        { label: "National Park Service Ysleta Mission", url: "https://www.nps.gov/places/ysleta-mission.htm", scope: "History of the separate active mission church." },
      ],
    },
    officialUrl: "https://www.ysletadelsurpueblo.org/tourism-hospitality/cultural-center/museum",
    managingAuthority: "Ysleta del Sur Pueblo",
    address: "305 Yaya Ln, El Paso, TX 79907",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  ...statewideMuseumExpansionWave69Destinations,
];
