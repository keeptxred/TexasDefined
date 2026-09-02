import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-09-02";

function museumPlaceholder(name: string): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

/**
 * Fifty-fourth statewide museum wave. These records reconcile the audit's
 * generic Palo Pinto County museum wording to the active Old Jail Museum
 * Complex and add current Texas Forestry Museum, Sam Rayburn Museum and
 * Fannin County Museum of History records.
 */
export const statewideMuseumExpansionWave54Destinations: Destination[] = [
  {
    id: "museum-statewide-wave54-palo-pinto-old-jail",
    brandId: "texasdefined",
    slug: "old-jail-museum-complex-palo-pinto",
    name: "Old Jail Museum Complex",
    summary: "Palo Pinto's Old Jail Museum Complex centers on the county's 1880 sandstone jail and expands into pioneer cabins, ranching and railroad exhibits, agricultural equipment, Fort Black Springs and a genealogy-oriented welcome center.",
    category: "historic-sites",
    region: "prairies-lakes",
    nearestTown: "Palo Pinto",
    county: "Palo Pinto County",
    coordinates: { lat: 32.76798, lng: -98.29930 },
    hero: museumPlaceholder("Old Jail Museum Complex"),
    bestSeason: "March through early December, when regular public hours operate; spring and fall are especially comfortable for exploring the outdoor buildings and grounds.",
    entryNote: "The complex currently opens Thursday through Saturday from 10 a.m. to 3 p.m., from the first weekend of March through the second weekend of December. Admission is free, and special or group visits can be arranged in advance.",
    highlights: [
      "1880 Palo Pinto County sandstone jail",
      "Pioneer cabins and ranching exhibits",
      "Reconstructed Fort Black Springs",
      "Jean Price Welcome Center and genealogy resources",
    ],
    body: [
      "The Old Jail Museum Complex is the active county-history destination behind older generic Palo Pinto County museum references. Its anchor is the native-sandstone county jail completed in 1880, where the first floor once served county offices and later the jailer's family while prisoners occupied the upper floor. A steel trap door was installed for hangings in the early twentieth century but was never used. The jail was vacated in 1941 and later restored for museum use by the Palo Pinto County Historical Association.",
      "Today the site extends well beyond the jail. The grounds include the Dog Trot Moseley Cabin, Johnson Cabin, Roe-Maddox Cabin, Carriage House, Barrows-Edgin Log Cabin and a reconstructed Fort Black Springs structure. Exhibits inside and outside interpret ranching, farming, medicine, railroads, domestic life, military service and the material culture of generations of Palo Pinto County residents.",
      "The Jean Price Welcome Center adds genealogy and document resources, making the complex useful both to travelers and local-history researchers. Texas Time Travel places Palo Pinto in the Forts Trail Region, while TexasDefined groups this North-Central Texas destination within its broader Prairies & Lakes discovery region. Using the current Old Jail Museum Complex identity gives the county one clear canonical heritage page rather than reviving an obsolete generic museum name.",
    ],
    officialUrl: "https://www.palopintohistory.com/museum.html",
    managingAuthority: "Palo Pinto County Historical Association",
    address: "231 S 5th Ave, Palo Pinto, TX 76484",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave55-texas-forestry-museum",
    brandId: "texasdefined",
    slug: "texas-forestry-museum-lufkin",
    name: "Texas Forestry Museum",
    summary: "Texas Forestry Museum in Lufkin interprets the forests and forest industries of Texas through sawmill, paper-mill, logging-railroad, conservation and family-learning exhibits, with free admission and an outdoor interpretive trail.",
    category: "historic-sites",
    region: "piney-woods",
    nearestTown: "Lufkin",
    county: "Angelina County",
    coordinates: { lat: 31.35044, lng: -94.70444 },
    hero: museumPlaceholder("Texas Forestry Museum"),
    bestSeason: "Year-round for the indoor museum; fall through spring is especially comfortable for combining the galleries with the outdoor logging equipment, trail and other Piney Woods stops.",
    entryNote: "The museum currently publishes Monday-Saturday hours from 10 a.m. to 5 p.m. and closes on major holidays. Admission is free, with donations welcomed. Group history tours should be scheduled in advance, and visitors should confirm holiday hours before a dedicated trip.",
    highlights: [
      "East Texas sawmill and logging-history exhibits",
      "Historic locomotive, caboose and outdoor railroad equipment",
      "Paper-mill interpretation and forestry-industry collections",
      "Children's Wing, nature playscape and accessible paved trail",
    ],
    body: [
      "Texas Forestry Museum tells the story of the forests that shaped East Texas and the industries, communities and transportation networks that grew around them. The museum describes its mission as collecting, preserving, exhibiting and interpreting objects, papers and photographs connected to forests, forestry professions and forest-related industries across Texas, with public education and sound forestry practices central to that work.",
      "Its visitor experience moves between industrial history and the living forest. Sawmill and paper-mill exhibits explain major regional industries, while the outdoor railroad area preserves a locomotive, caboose and related logging equipment. The museum also maintains collections and research resources documenting forestry, logging, mills and the people whose work transformed timber into one of the region's defining economic foundations.",
      "The museum is also built for repeat family visits rather than a single static-gallery stop. Current visitor information highlights a Children's Wing, scavenger hunts, a nature playscape, an accessible paved trail and scheduled educational programs. Free admission and regular six-day public hours make the Texas Forestry Museum a strong standalone TexasDefined authority destination for understanding both the cultural history and continuing stewardship of the Piney Woods.",
    ],
    officialUrl: "https://www.treetexas.com/",
    managingAuthority: "Texas Forestry Museum",
    address: "1905 Atkinson Dr, Lufkin, TX 75904",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave55-sam-rayburn-museum",
    brandId: "texasdefined",
    slug: "sam-rayburn-museum-bonham",
    name: "Sam Rayburn Museum",
    summary: "Sam Rayburn Museum in Bonham preserves the public career and personal legacy of longtime U.S. House Speaker Sam Rayburn through his papers, furnishings, political memorabilia and an exact replica of his Speaker's office.",
    category: "historic-sites",
    region: "prairies-lakes",
    nearestTown: "Bonham",
    county: "Fannin County",
    coordinates: { lat: 33.57829, lng: -96.1877 },
    hero: museumPlaceholder("Sam Rayburn Museum"),
    bestSeason: "Year-round indoor museum; spring and fall are especially comfortable for pairing the museum with Bonham's historic district, nearby heritage sites and other Fannin County stops.",
    entryNote: "The museum currently publishes Monday-Friday hours of 9 a.m.-4:30 p.m. and Saturday hours of 10 a.m.-2 p.m. Admission is free. University holiday closures can affect access, and groups of 10 or more should arrange visits in advance.",
    highlights: [
      "Exact replica of Sam Rayburn's Speaker's office",
      "Photographs, letters, political cartoons and memorabilia",
      "Rayburn's personal library and historic furnishings",
      "1957 Classical Revival museum building",
    ],
    body: [
      "Sam Rayburn Museum documents the life and career of Samuel Taliaferro Rayburn, the Fannin County politician who represented North Texas in Congress from 1913 until his death in 1961 and became the longest-serving Speaker of the U.S. House of Representatives. Rayburn helped establish the museum himself, using funds from a distinguished-service gift to create a permanent home for the records, books and objects associated with his public life.",
      "The museum's best-known feature is an exact replica of Rayburn's Speaker's office, surrounded by photographs, letters, political cartoons, artwork, furniture, memorabilia and books that connect national political history to Bonham. The building was completed in 1957 in a Classical Revival style deliberately recalling federal architecture in Washington, D.C., and it is itself a Recorded Texas Historic Landmark.",
      "Today the museum operates as a division of the Dolph Briscoe Center for American History at The University of Texas at Austin. Its Bonham location remains a free public museum with regular weekday and Saturday hours, on-site parking and accessible public spaces. TexasDefined treats it separately from the nearby Sam Rayburn House State Historic Site so visitors can distinguish Rayburn's political archive and institutional legacy from the preserved home and farm where he lived.",
    ],
    officialUrl: "https://briscoecenter.org/visit/sam-rayburn-museum/",
    managingAuthority: "Dolph Briscoe Center for American History, The University of Texas at Austin",
    address: "800 W Sam Rayburn Dr, Bonham, TX 75418",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave56-fannin-county-museum-of-history",
    brandId: "texasdefined",
    slug: "fannin-county-museum-of-history-bonham",
    name: "Fannin County Museum of History",
    summary: "Fannin County Museum of History in Bonham uses the restored Texas & Pacific Railway depot to trace the county from its pre-Revolution and pioneer years through the railroad era, the early twentieth century and both world wars.",
    category: "historic-sites",
    region: "prairies-lakes",
    nearestTown: "Bonham",
    county: "Fannin County",
    coordinates: { lat: 33.57372, lng: -96.17942 },
    hero: museumPlaceholder("Fannin County Museum of History"),
    bestSeason: "Year-round indoor museum; spring and fall are especially comfortable for combining the depot with Bonham's courthouse square, Sam Rayburn sites and other Fannin County heritage stops.",
    entryNote: "The museum currently publishes Tuesday-Saturday hours from noon to 4 p.m. Admission is $4 for adults, $3 for seniors, free for visitors age 17 and younger, and free for museum members. Confirm current hours before a dedicated trip.",
    highlights: [
      "Restored Texas & Pacific Railway depot",
      "Pioneer and Republic-era Fannin County history",
      "Railroad, Jazz Age and early twentieth-century exhibits",
      "World War I and World War II collections",
    ],
    body: [
      "Fannin County Museum of History gives Bonham a broad county-history counterpart to its Sam Rayburn sites. The museum begins its story before the Texas Revolution and follows Fannin County through the Republic of Texas, pioneer settlement, the Civil War era and the arrival of the railroad, helping visitors see how a North Texas county seat changed as transportation, migration and commerce reshaped the region.",
      "The setting is part of the interpretation. The museum occupies Bonham's restored Texas & Pacific Railway depot, tying its collections directly to the rail network that transformed the city and county around the turn of the twentieth century. Exhibits continue into the Jazz Age and both world wars, using artifacts, photographs and local records to connect national events with the experiences of Fannin County residents.",
      "For a TexasDefined itinerary, the museum works especially well as the local-history anchor for a Bonham day. The Sam Rayburn Museum explains one nationally prominent political life, while the Fannin County Museum of History supplies the larger community context around settlement, railroads, wartime service and everyday county life. Its location just south of the courthouse square also makes it practical to combine with downtown Bonham without treating the museum as an isolated stop.",
    ],
    officialUrl: "https://www.fannincountymuseum.org/",
    managingAuthority: "Fannin County Museum of History",
    address: "1 Main St, Bonham, TX 75418",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
