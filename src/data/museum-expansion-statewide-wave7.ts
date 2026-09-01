import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-08-31";

function museumPlaceholder(name: string): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

/**
 * Seventh statewide museum coverage wave. Every institution here was checked
 * against current visitor sources and the canonical TexasDefined destination
 * catalog before inclusion.
 */
export const statewideMuseumExpansionWave7Destinations: Destination[] = [
  {
    id: "museum-statewide-wave7-san-augustine-jail",
    brandId: "texasdefined",
    slug: "1919-san-augustine-county-jail-museum",
    name: "1919 San Augustine County Jail Museum",
    summary: "The restored 1919 San Augustine County Jail now operates as a free law-enforcement and local-history museum interpreting county sheriffs, judges, Texas Rangers, game wardens, highway patrol officers and more than a century of San Augustine history.",
    category: "historic-sites",
    region: "piney-woods",
    nearestTown: "San Augustine",
    county: "San Augustine County",
    coordinates: { lat: 31.529996, lng: -94.11094 },
    hero: museumPlaceholder("1919 San Augustine County Jail Museum"),
    bestSeason: "Year-round museum; fall through spring is most comfortable for combining it with the courthouse square, Mission Dolores and other Deep East Texas historic sites.",
    entryNote: "Visit San Augustine currently lists free admission and Monday-Friday hours from 11 a.m. to 3 p.m. Confirm current access before making a special trip because the museum is locally operated.",
    highlights: ["Restored 1919 county jail", "Texas law-enforcement history", "Texana research library", "Russell Lee and John Vachon photography"],
    body: [
      "The 1919 jail served San Augustine County for more than eighty years before law-enforcement operations moved elsewhere in 2000. After a major restoration, the building reopened as a museum rather than disappearing from the courthouse landscape.",
      "Interpretation centers on the county's law-enforcement history while also preserving local records, photographs and timelines connected to San Augustine and Mission Dolores. The surviving cells and historic fabric make the building itself one of the most important artifacts.",
      "For TexasDefined, this is a stronger current authority destination than the raw list's vague San Augustine county-museum label. It cross-links naturally with the county page, courthouse square and Mission Dolores while using the institution visitors can actually find today."
    ],
    officialUrl: "https://visitsanaugustinetx.org/local-attractions/",
    managingAuthority: "San Augustine community preservation partners",
    address: "100 W Columbia St, San Augustine, TX 75972",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave7-rockwall-county",
    brandId: "texasdefined",
    slug: "rockwall-county-historical-foundation-museum",
    name: "Rockwall County Historical Foundation & Museum",
    summary: "Rockwall County's museum park preserves early homes, a tenant cabin, windmill, carriage-house reconstruction, Blackland Prairie habitat and a relocated segment of the mysterious rock formation that gave the county its name.",
    category: "historic-sites",
    region: "prairies-lakes",
    nearestTown: "Rockwall",
    county: "Rockwall County",
    coordinates: { lat: 32.92973, lng: -96.44832 },
    hero: museumPlaceholder("Rockwall County Historical Foundation & Museum"),
    bestSeason: "Spring and fall for comfortable touring among the historic buildings and prairie grounds; interior house tours add year-round value.",
    entryNote: "Admission is currently free. The museum lists Thursday-Saturday hours from 10 a.m. to 3 p.m. and Sunday from 1 to 4 p.m.; the last guided tour is at 2:30 p.m.",
    highlights: ["Manson-LaMoreaux-Hartman House", "Bailey House", "Reconstructed rock-wall segment", "Blackland Prairie restoration"],
    body: [
      "The Rockwall County Historical Foundation operates more than a conventional single-building museum. Its grounds in Harry Myers Park preserve historic houses and small structures that let visitors encounter domestic and agricultural life at full scale.",
      "The site also addresses the geological feature behind Rockwall's name. A relocated section of the rock wall is preserved on museum property, while interpretation distinguishes that accessible segment from buried formations on private land.",
      "The destination gives TexasDefined a county-level heritage anchor in the state's smallest county and connects downtown Rockwall, Blackland Prairie ecology and local settlement history through one canonical visitor page."
    ],
    officialUrl: "https://rockwallcountymuseum.com/visit/",
    managingAuthority: "Rockwall County Historical Foundation",
    address: "901 E Washington St, Rockwall, TX 75087",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave7-ellen-noel",
    brandId: "texasdefined",
    slug: "ellen-noel-art-museum-odessa",
    name: "Ellen Noël Art Museum",
    summary: "Odessa's Ellen Noël Art Museum is a free West Texas art institution with rotating exhibitions, a permanent collection, education programs and a sculpture-and-sensory garden, newly reopened after a major capital enhancement project.",
    category: "historic-sites",
    region: "big-bend",
    nearestTown: "Odessa",
    county: "Ector County",
    coordinates: { lat: 31.88234, lng: -102.32031 },
    hero: museumPlaceholder("Ellen Noël Art Museum"),
    bestSeason: "Year-round indoor destination; fall through spring is most comfortable for combining the museum with other Odessa and Midland cultural stops.",
    entryNote: "Admission is currently free. The museum lists Tuesday-Saturday hours from 10 a.m. to 5 p.m., Thursday until 8 p.m., and Sunday noon to 5 p.m.; it is closed Mondays and holidays.",
    highlights: ["Free admission", "Permanent art collection", "Rotating exhibitions", "Sculpture and sensory garden"],
    body: [
      "The Ellen Noël Art Museum gives the Permian Basin a dedicated visual-arts institution whose programming extends well beyond an oil-and-ranching regional narrative. Exhibitions and educational programs bring both Texas and broader contemporary art into Odessa.",
      "The museum has recently reopened following a multi-year capital enhancement project, making current visitor information especially important. Its renewed galleries and sensory-garden experience are now part of an active institution rather than a construction-era listing.",
      "For TexasDefined, the museum complements Odessa's existing history and presidential-era attractions and creates stronger cross-links between Ector County, Permian Basin culture and the growing West Texas museum network."
    ],
    officialUrl: "https://www.noelartmuseum.org/plan-your-visit",
    managingAuthority: "Ellen Noël Art Museum",
    address: "4909 E University Blvd, Odessa, TX 79762",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave7-midland-army-air-field",
    brandId: "texasdefined",
    slug: "midland-army-air-field-museum",
    name: "Midland Army Air Field Museum",
    summary: "The Commemorative Air Force High Sky Wing's Midland Army Air Field Museum preserves the World War II bombardier-training history of Midland through artifacts, gallery exhibits and a working collection of vintage military aircraft.",
    category: "historic-sites",
    region: "big-bend",
    nearestTown: "Midland",
    county: "Midland County",
    coordinates: { lat: 31.94188, lng: -102.21475 },
    hero: museumPlaceholder("Midland Army Air Field Museum"),
    bestSeason: "Fall through spring for the most comfortable aircraft viewing around the hangar; museum galleries provide an indoor component year-round.",
    entryNote: "The High Sky Wing currently opens the museum Saturdays from 10 a.m. to 3 p.m. with free admission and offers group visits by appointment. Aircraft availability can change with maintenance and operations.",
    highlights: ["World War II bombardier school", "Vintage military aircraft", "West Texans in World War II", "Commemorative Air Force High Sky Wing"],
    body: [
      "Midland Army Air Field was one of the country's major bombardier-training centers during World War II, and the museum keeps that local military history tied to the airport where it happened. Gallery exhibits explain training, equipment and wartime life rather than presenting aircraft without context.",
      "The High Sky Wing's operating aircraft collection adds a living-history dimension. Visitors may encounter aircraft being maintained, flown or repositioned, so the experience can vary in ways a static collection does not.",
      "This destination complements the Petroleum Museum and other Midland authority pages by adding aviation and wartime history to the Permian Basin story, strengthening Midland County cross-linking without duplicating the former national CAF museum that moved away."
    ],
    officialUrl: "https://highskywing.org/?page_id=3699",
    managingAuthority: "Commemorative Air Force High Sky Wing",
    address: "9600 Wright Dr, Midland, TX 79706",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave7-fort-worth-aviation",
    brandId: "texasdefined",
    slug: "fort-worth-aviation-museum",
    name: "Fort Worth Aviation Museum",
    summary: "The Fort Worth Aviation Museum near Meacham International Airport preserves more than three dozen aircraft and North Texas aviation history through hands-on warbirds, interactive exhibits, educational resources and a flight simulator.",
    category: "historic-sites",
    region: "prairies-lakes",
    nearestTown: "Fort Worth",
    county: "Tarrant County",
    coordinates: { lat: 32.80569, lng: -97.35559 },
    hero: museumPlaceholder("Fort Worth Aviation Museum"),
    bestSeason: "Fall through spring for comfortable outdoor aircraft viewing; shorter morning hours during much of the week make advance planning important.",
    entryNote: "The museum currently lists Wednesday-Friday hours from 9 a.m. to 1 p.m., Saturday 9 a.m. to 4 p.m., and Sunday 11 a.m. to 3 p.m. Check current tickets and weather before arrival.",
    highlights: ["More than 36 aircraft", "F-14 Tomcat", "Interactive aviation exhibits", "Flight simulator"],
    body: [
      "Fort Worth's aviation history is unusually deep because aircraft manufacturing, military flying and commercial aviation have all shaped the city. This museum interprets that heritage through a large outdoor aircraft collection and visitor-accessible exhibits rather than treating aviation as a side note to broader military history.",
      "Its collection includes recognizable Cold War and naval aircraft alongside educational material and a simulator. The museum emphasizes physical access and youth education, giving families a different experience from a traditional indoor history gallery.",
      "For TexasDefined, the page creates a canonical Fort Worth aviation destination that can cross-link Meacham Airport, military history, family attractions and Tarrant County authority content without competing with the city's established art and science museums."
    ],
    officialUrl: "https://fortworthaviationmuseum.com/",
    managingAuthority: "OV-10 Bronco Association / Fort Worth Aviation Museum",
    address: "3300 Ross Ave, Fort Worth, TX 76106",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave7-texas-air-stinson",
    brandId: "texasdefined",
    slug: "texas-air-museum-stinson-field-san-antonio",
    name: "Texas Air Museum at Stinson Field",
    summary: "The Texas Air Museum at historic Stinson Field tells San Antonio's role in early civilian and military aviation through aircraft, artifacts and exhibits on the pioneering Stinson family, the golden age of flight and twentieth-century air power.",
    category: "historic-sites",
    region: "south-texas",
    nearestTown: "San Antonio",
    county: "Bexar County",
    coordinates: { lat: 29.33957, lng: -98.47585 },
    hero: museumPlaceholder("Texas Air Museum at Stinson Field"),
    bestSeason: "Fall through spring for comfortable hangar and aircraft viewing; the museum is an all-season complement to other San Antonio history destinations.",
    entryNote: "The museum currently opens Tuesday through Saturday from 9 a.m. to 4 p.m. and closes Sundays, Mondays and specified major holidays. Check holiday changes before traveling.",
    highlights: ["Historic Stinson Field", "Stinson aviation family", "Early and golden-age aviation", "Texas military-air-power history"],
    body: [
      "Stinson Field is one of the most historically significant aviation sites in Texas, and the museum uses that setting to explain the people who helped make San Antonio an early center of American flight. The Stinson family receives particular attention alongside military aviation and technical development.",
      "The collection stretches beyond World War II into the earlier golden age of aviation, which distinguishes it from many military-aircraft museums. Aircraft and artifacts provide physical context for stories that began at the airfield itself.",
      "TexasDefined already has separate San Antonio transportation and military-history destinations. This page adds a focused aviation authority while using county and related-destination links to keep those complementary institutions connected rather than merged into a generic transportation page."
    ],
    officialUrl: "https://www.texasairmuseum.org/contact",
    managingAuthority: "Texas Air Museum — Stinson Chapter",
    address: "1234 99th St, San Antonio, TX 78214",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
