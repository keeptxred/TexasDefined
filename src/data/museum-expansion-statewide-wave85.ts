import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-10-04";

function museumPlaceholder(name: string): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

export const statewideMuseumExpansionWave85Destinations: Destination[] = [
  {
    id: "museum-statewide-wave85-my-story-museum-crystal-city",
    brandId: "texasdefined",
    slug: "my-story-museum-crystal-city",
    name: "My Story Museum",
    summary: "My Story Museum is Crystal City's first permanent local-history museum, preserving Zavala County stories through exhibits on the 1969 student walkouts and Chicano movement, the Crystal City Family Internment Camp, and local military veterans.",
    category: "historic-sites",
    region: "south-texas",
    geography: { primaryRegionId: "south-texas", subregionIds: ["south-texas-brush-country", "winter-garden"], countySlugs: ["zavala"], travelRegionIds: ["south-texas"] },
    nearestTown: "Crystal City",
    county: "Zavala County",
    coordinates: { lat: 28.6777, lng: -99.8266 },
    hero: museumPlaceholder("My Story Museum"),
    bestSeason: "Year-round for the indoor galleries; fall through spring is the most comfortable season for pairing the museum with Crystal City's outdoor historical markers and the former family internment camp interpretive trail.",
    entryNote: "The museum's official visitor page currently lists Monday through Saturday hours from 10 a.m. to 4 p.m., free admission, and an address of 224 E. Zavala Street. Small museums can change hours for holidays, programs or staffing, so verify the official page before making a dedicated trip.",
    highlights: ["1969 Crystal City student walkouts and Chicano movement", "Crystal City Family Internment Camp and its WWII confinement history", "Zavala County veterans and community memory", "Community-centered permanent museum in downtown Crystal City"],
    body: [
      "My Story Museum is important because it puts several nationally significant chapters of South Texas history in the same local frame. Crystal City is widely known for spinach and Winter Garden agriculture, but the community also became a major site of Mexican American school activism and electoral organizing and, decades earlier, hosted the federal government's largest World War II family internment facility. The museum's permanent exhibits make those stories accessible through a community institution rather than leaving visitors to assemble the history from scattered markers and archives.",
      "One exhibit focuses on the 1969 student walkouts and the wider Chicano movement in Zavala County. The walkout grew from long-running disputes over discrimination, representation and school policy. Texas State Historical Association accounts place the successful student boycott inside the larger Crystal City Revolts and the political organizing that helped produce the Raza Unida Party in 1970. For visitors, that means the museum is not simply documenting a school protest; it is interpreting a turning point in the political history of Mexican Americans in Texas.",
      "A second major exhibit interprets the Crystal City Family Internment Camp. The Texas Historical Commission documents the camp as the only Immigration and Naturalization Service confinement camp created specifically to hold families together. From 1942 until 1948 it held thousands of people of Japanese, German and Italian nationality or ancestry, including people brought to the United States from Latin America. The former camp site still has a historical marker and eight-panel interpretive trail, so the museum and the physical site work best as companion stops rather than substitutes for one another.",
      "The museum also preserves the experiences of Zavala County veterans. That local layer matters because it keeps the institution from becoming a two-topic exhibit hall. Military service, agricultural life, school activism, migration and wartime confinement all affected families in the same county, and a community museum can show those histories in relation to one another.",
      "The Crystal City Pilgrimage Committee identifies My Story Museum as the city's first permanent history museum. Its Phase II expansion of the internment-camp exhibit opened during the 2025 Crystal City Pilgrimage, demonstrating that the museum is an active and evolving institution rather than an archival name for a closed local museum. TexasDefined therefore treats My Story Museum as the canonical current museum destination for this topic instead of creating a separate page around older or ambiguous 'Zavala County Museum' wording.",
    ],
    officialUrl: "https://www.crystalcitypilgrimage.org/my-story-museum",
    managingAuthority: "Crystal City Pilgrimage Committee",
    address: "224 E Zavala St, Crystal City, TX 78839",
    sourceCheckedAt: SOURCE_CHECKED_AT,
    accessibilityNotes: "The official museum page does not currently publish detailed accessibility guidance. Contact the museum at (830) 448-5067 before visiting if step-free access, seating, restroom access or other accommodations are essential to the trip.",
    areaGuide: {
      intro: "Use the museum as the indoor anchor for a Crystal City history day, then connect the exhibits to the county guide and the surviving places where the stories happened.",
      nearbyAttractions: [
        { name: "Zavala County guide", description: "Put the museum inside the broader story of Crystal City, Winter Garden agriculture, the Nueces country, Mexican American political organizing and county history.", proximity: "Crystal City and countywide", href: "/county/zavala" },
        { name: "Crystal City Family Internment Camp interpretive trail", description: "Visit the former confinement-site landscape, historical marker and interpretive panels after seeing the museum's internment exhibit.", proximity: "Crystal City" },
        { name: "Downtown Crystal City", description: "Add the courthouse area, community landmarks and the civic core that shaped local political and agricultural history.", proximity: "Around the museum", href: "/county/zavala" },
      ],
      foodAndDrink: [{ name: "Central Crystal City", description: "Use the downtown and U.S. 83 corridors for local food stops before or after the museum; the county guide provides context for the surrounding town.", proximity: "In town", href: "/county/zavala" }],
      lodging: [{ name: "Crystal City and the Winter Garden", description: "Crystal City is the most direct base for the museum and internment-camp site; Carrizo Springs and Uvalde can work for longer regional trips.", proximity: "In town and region", href: "/county/zavala" }],
      neighborhoods: [{ name: "Downtown Crystal City", description: "The compact civic center is the best place to connect the museum with the county's government, school, agricultural and political history.", proximity: "Museum district", href: "/county/zavala" }],
      familyStops: [{ name: "My Story Museum", description: "The museum is free and compact, but some internment and civil-rights material can prompt difficult questions; families may want to preview those topics for younger children.", proximity: "On site" }],
      sideTrips: [
        { name: "Uvalde County", description: "Continue north on U.S. 83 to connect the Winter Garden with the Nueces and Leona country around Uvalde.", proximity: "North of Zavala County", href: "/county/uvalde" },
        { name: "Dimmit County", description: "Continue south toward Carrizo Springs for another major piece of Winter Garden agricultural and South Texas history.", proximity: "South of Crystal City", href: "/county/dimmit" },
      ],
    },
    authorityGuide: {
      whyItMatters: "My Story Museum is the strongest current public-history anchor for Crystal City because it connects three subjects rarely interpreted together in one place: Mexican American student and political activism, federal wartime family internment, and local veterans. Those stories make Crystal City significant far beyond its agricultural identity.",
      assessment: { recommendedVisit: "Allow about 60 to 90 minutes for the museum, then reserve another hour or more for the former internment-camp interpretive trail and downtown Crystal City context.", physicalEffort: "Low", weatherExposure: "Mostly indoors at the museum; moderate sun and heat exposure if you add the outdoor internment-site panels.", planningLevel: "Low to moderate", familyFit: "Good for older children and teens studying Texas, U.S. history, civil rights or World War II; adults should be prepared to discuss confinement, discrimination and protest with younger visitors.", firstTimeValue: "High for travelers who want to understand why Crystal City matters in Texas civil-rights, Chicano political and WWII internment history." },
      itineraries: [
        { label: "Museum only", duration: "60–90 minutes", steps: ["Start with the student-walkout and Chicano-movement material", "Continue through the Crystal City Family Internment Camp exhibit", "Finish with Zavala County veterans and community-history displays"] },
        { label: "Crystal City history", duration: "2–3 hours", steps: ["Tour My Story Museum", "Use the Zavala County guide for downtown and political context", "Visit the former family internment camp marker and interpretive trail"] },
        { label: "Winter Garden history day", duration: "Half day", steps: ["Begin at My Story Museum", "Explore downtown Crystal City and local landmarks", "Drive part of the Winter Garden corridor using the Zavala County guide", "Continue toward Carrizo Springs or Uvalde if time allows"] },
      ],
      sources: [
        { label: "My Story Museum — Crystal City Pilgrimage Committee", url: "https://www.crystalcitypilgrimage.org/my-story-museum", scope: "Current museum identity, exhibits, address, hours, admission, contact information and 2025 exhibit expansion." },
        { label: "Texas Historical Commission — Texas in World War II", url: "https://thc.texas.gov/learn/military-history/texas-world-war-ii", scope: "Official history of the Crystal City Family Internment Camp, population, administration, closure and surviving interpretive trail." },
        { label: "Texas Historical Commission — Crystal City Family Internment Camp marker", url: "https://atlas.thc.texas.gov/Details/5507013720/print", scope: "Official marker record for the former camp, its scale, purpose, location and historical significance." },
        { label: "National Park Service — Crystal City Internment Camp", url: "https://npgallery.nps.gov/AssetDetail/b36c13a0-5f5f-4fb7-b90f-3549d1e73768", scope: "National Register documentation confirming the historic district and federally recognized significance of the former camp site." },
        { label: "Handbook of Texas — Crystal City Revolts", url: "https://www.tshaonline.org/handbook/entries/crystal-city-revolts", scope: "Historical context for the 1969 student boycott, school demands and the political movement that followed." },
        { label: "Handbook of Texas — Raza Unida Party", url: "https://www.tshaonline.org/handbook/entries/raza-unida-party", scope: "Crystal City's role in the 1970 founding and early electoral success of the Raza Unida Party." },
      ],
    },
  },
];