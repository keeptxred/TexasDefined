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
 * Ninth statewide museum coverage wave. This group closes additional East and
 * South Texas gaps while resolving stale county-museum labels to the active
 * institutions visitors can actually reach today.
 */
export const statewideMuseumExpansionWave9Destinations: Destination[] = [
  {
    id: "museum-statewide-wave9-east-texas",
    brandId: "texasdefined",
    slug: "museum-of-east-texas-lufkin",
    name: "Museum of East Texas",
    summary: "Lufkin's Museum of East Texas is a free community art museum in a historic former Episcopal church, presenting rotating exhibitions, East Texas artists, broader American and international work, family programs and one of the region's strongest arts-education calendars.",
    category: "historic-sites",
    region: "piney-woods",
    nearestTown: "Lufkin",
    county: "Angelina County",
    coordinates: { lat: 31.343796, lng: -94.725486 },
    hero: museumPlaceholder("Museum of East Texas"),
    bestSeason: "Year-round indoor museum; fall through spring is especially comfortable for pairing the galleries with downtown Lufkin and other Piney Woods stops.",
    entryNote: "Admission is currently free. The museum lists Tuesday-Friday hours from 10 a.m. to 5 p.m. and Saturday-Sunday from 1 to 5 p.m.; holiday and exhibit-installation schedules can change.",
    highlights: ["Free admission", "Historic 1906 church setting", "Rotating art exhibitions", "Family and arts-education programs"],
    body: [
      "The Museum of East Texas grew from a community effort to transform the fire-damaged shell of St. Cyprian's Episcopal Church into a cultural center. Since opening in 1976, it has become a regional arts institution rather than a narrowly local display space.",
      "Its collection and exhibitions balance East Texas artists with broader American, Latin American and European work, while classes, field trips and family programming make education a central part of the museum's role. The historic church architecture gives the galleries a setting that is itself part of the experience.",
      "The museum adds a useful Lufkin cultural stop that complements forestry, regional history and outdoor Piney Woods attractions without duplicating broader Lufkin or East Texas guides."
    ],
    officialUrl: "https://www.metlufkin.org/visit",
    managingAuthority: "Museum of East Texas",
    address: "503 N 2nd St, Lufkin, TX 75901",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave9-rusk-depot",
    brandId: "texasdefined",
    slug: "rusk-county-depot-museum-history-center-henderson",
    name: "Rusk County Depot Museum & History Center",
    summary: "A restored 1901 depot, historic buildings and a working-life museum in Henderson, home to the syrup-mill demonstrations at the annual Heritage Syrup Festival and an essential stop in Rusk County, the official Syrup Capital of Texas.",
    category: "historic-sites",
    region: "piney-woods",
    nearestTown: "Henderson",
    county: "Rusk County",
    coordinates: { lat: 32.15875, lng: -94.794817 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Henderson_July_2017_09_%28Depot_Museum%29.jpg?width=1600",
      alt: "Historic yellow Rusk County Depot Museum building in Henderson, photographed in July 2017",
      width: 6000,
      height: 4000,
      credit: "Michael Barera · Wikimedia Commons · CC BY-SA 4.0 (2017)",
    },
    bestSeason: "Open year-round on regular museum days. November's Heritage Syrup Festival makes the outdoor syrup mill a special destination, but confirm future festival dates before travel.",
    entryNote: "Free admission; donations appreciated. The museum advertises Monday–Friday 10 a.m.–4 p.m. and Saturday 9 a.m.–1 p.m. Call ahead for holiday closures, school groups and special events.",
    highlights: ["Restored 1901 railroad depot", "Rusk County ribbon-cane syrup mill", "Children's Discovery Center", "Cabins, cotton gin, sawmill and caboose", "37th Heritage Syrup Festival held November 14, 2026"],
    body: [
      "The museum began in 1978 with the restoration of Henderson's historic railroad depot. Built in 1901, the depot originally housed local railroad operations and became a local-history museum; the former freight warehouse was adapted for a children's discovery area. In 1994, the principal collections moved into the former Arnold Library building, and the depot remained an important part of the campus.",
      "A walk across the grounds shows how Rusk County worked before and after oil. The preserved and interpreted structures include a syrup mill, cotton gin, blacksmith shop, country store, sawmill, cabins, doctor's office, oilfield and derrick display, printing shop and Missouri Pacific caboose. These are distinct stops on the property, not one indoor exhibition.",
      "Rusk County's official designation as the Syrup Capital of Texas in 2025 recognizes its ribbon-cane traditions. Cane stalks are squeezed for their juice, which is boiled down into syrup. The museum's equipment and annual demonstrations explain why this hands-on agricultural practice survives in the county's identity.",
      "The Heritage Syrup Festival uses both the depot grounds and historic downtown Henderson. The 37th annual festival was held Saturday, November 14, 2026, from 9 a.m. to 5 p.m.; museum demonstrations were listed separately for 10 a.m.–4 p.m. That 2026 date is historical, not an announcement of a 2027 schedule. The organizers describe an annual second-Saturday-of-November tradition and will publish new-edition details themselves.",
      "For a regular visit, start with the Arnold Building's Rusk County collections, then walk outside to the original depot and selected heritage structures. Families may prefer the Children's Discovery Center first, while railroad enthusiasts may want the depot and caboose before the agricultural exhibits. Not every historic structure or demonstration operates every day; check with the museum about which areas are accessible.",
      "The museum is at 514 N. High Street in Henderson, a separate destination from the downtown courthouse square. Admission is free, with donations welcomed. The museum lists weekday hours of 10 a.m.–4 p.m. and Saturday hours of 9 a.m.–1 p.m.; special-event programs and holiday closures can differ. Confirm directly with the museum by calling 903-657-4303.",
      "For a fuller Rusk County visit, pair the museum with the courthouse square and its historic downtown district, then follow the oil-field history north toward Joinerville, New London and Overton. This sequence shows the transition from agricultural and rail commerce to the boom that changed East Texas in 1930."
    ],
    visitorFacts: [
      { topic: "admission", label: "Museum admission", detail: "Free; voluntary donations are welcomed. Festival admissions and any special paid services must be checked separately.", sourceUrl: "https://www.ruskcountyhistory.org/contact", checkedAt: "2026-11-22" },
      { topic: "hours", label: "Museum hours", detail: "The museum posts Monday–Friday 10 a.m.–4 p.m. and Saturday 9 a.m.–1 p.m. Verify holidays and special-event changes directly.", sourceUrl: "https://www.ruskcountyhistory.org/contact", checkedAt: "2026-11-22" }
    ],
    visitorFaqs: [
      { question: "Where is the Rusk County Depot Museum?", answer: "The museum is at 514 N. High Street, Henderson, Texas 75652, north of the historic downtown courthouse square.", sourceUrl: "https://www.ruskcountyhistory.org/contact" },
      { question: "Is admission to the Depot Museum free?", answer: "Yes. The museum currently lists free admission and welcomes donations.", sourceUrl: "https://www.ruskcountyhistory.org/contact" },
      { question: "Does the museum have a syrup mill?", answer: "Yes. The grounds include a syrup mill, and the annual Heritage Syrup Festival demonstrates traditional cane-syrup production.", sourceUrl: "https://www.ruskcountyhistory.org/our-grounds" },
      { question: "When was the 37th Heritage Syrup Festival?", answer: "It took place November 14, 2026. The date has passed; future festival dates must be checked with the City of Henderson or museum.", sourceUrl: "https://www.hendersontx.us/14/Heritage-Syrup-Festival" }
    ],
    authorityGuide: {
      whyItMatters: "The site connects Rusk County's railroad heritage, ribbon-cane syrup economy and 1930s oil history in one walkable collection of preserved buildings rather than treating them as separate stories.",
      assessment: {
        recommendedVisit: "Allow about 60–120 minutes for exhibits and a walk around the grounds; this is a planning suggestion, not an official timed admission.",
        physicalEffort: "Low to moderate",
        weatherExposure: "Mixed indoor/outdoor",
        planningLevel: "Low",
        familyFit: "Children's discovery exhibits and outdoor historic structures can work well for mixed-age groups; check current access before arrival.",
        firstTimeValue: "Begin with the Arnold Building, then the depot and syrup mill to connect the collection's agricultural and railroad stories."
      },
      itineraries: [
        { label: "Short history stop", duration: "About 45–60 minutes", steps: ["Begin at the main Arnold Building exhibits.", "See the original 1901 depot and caboose.", "Finish at the syrup mill and outdoor heritage structures if accessible."] },
        { label: "Half-day Henderson history", duration: "About 2–3 hours plus travel", steps: ["Tour the museum's indoor and outdoor history displays.", "Explore the downtown Henderson courthouse district.", "Use the official museum and city visitor resources to check current programs."] },
        { label: "Annual festival visit", duration: "Plan a flexible day during a confirmed edition", steps: ["Verify the next year's official date, hours and event-specific access.", "Start at the Depot Museum for syrup-making and folk-craft demonstrations.", "Continue to downtown Heritage Square for vendors, music and food; verify current shuttle and parking arrangements."] }
      ],
      sources: [
        { label: "Museum building history", url: "https://www.ruskcountyhistory.org/depot-history", scope: "1901 depot, 1978 restoration and 1994 collection move" },
        { label: "Museum grounds and buildings", url: "https://www.ruskcountyhistory.org/our-grounds", scope: "Syrup mill, cabins, country store, industrial and rail displays" },
        { label: "Museum contact and visitor hours", url: "https://www.ruskcountyhistory.org/contact", scope: "Address, admission, telephone and posted hours" },
        { label: "City of Henderson festival information", url: "https://www.hendersontx.us/14/Heritage-Syrup-Festival", scope: "2026 festival dates, museum and downtown venues" },
        { label: "Texas State Library official designations", url: "https://www.tsl.texas.gov/ref/abouttx/capitals", scope: "Rusk County's 2025 Syrup Capital designation" },
        { label: "Historic depot photograph license", url: "https://commons.wikimedia.org/wiki/File:Henderson_July_2017_09_(Depot_Museum).jpg", scope: "Michael Barera, July 2017; CC BY-SA 4.0 attribution and original source" }
      ]
    },
    officialUrl: "https://www.ruskcountyhistory.org/",
    managingAuthority: "Rusk County Depot Museum & History Center / Rusk County Historical Commission partners",
    address: "514 N High St, Henderson, TX 75652",
    updatedAt: "2026-11-22",
    sourceCheckedAt: "2026-11-22",
  },
  {
    id: "museum-statewide-wave9-falfurrias-heritage",
    brandId: "texasdefined",
    slug: "heritage-museum-falfurrias",
    name: "The Heritage Museum at Falfurrias",
    summary: "The Heritage Museum at Falfurrias preserves Brooks County frontier, ranching, Texas Ranger and community history through artifacts, maps, personal papers, themed exhibits and a remarkable photographic archive documenting South Texas families and places.",
    category: "historic-sites",
    region: "south-texas",
    nearestTown: "Falfurrias",
    county: "Brooks County",
    coordinates: { lat: 27.2315, lng: -98.1438 },
    hero: museumPlaceholder("The Heritage Museum at Falfurrias"),
    bestSeason: "Fall through spring for the most comfortable South Texas road trip; the museum itself is primarily an indoor stop.",
    entryNote: "Admission is currently free. City information lists Tuesday-Friday hours and limited second- and fourth-Saturday access, but locally operated hours vary across current sources; call ahead before making a special trip.",
    highlights: ["Texas Ranger Room", "Carol Dryden photo-negative archive", "Brooks County ranching history", "Falfurrias pioneer collections"],
    body: [
      "The Heritage Museum gives Falfurrias a locally focused institution whose collections reach beyond pioneer household objects. Ranching, cattle brands, early schools, military service and notable Brooks County residents all appear in displays tied to the development of South Texas.",
      "Its Texas Ranger Room is especially distinctive because Brooks County was named for Ranger captain James A. Brooks and Falfurrias served as a Ranger-area headquarters. The museum also holds the Carol Dryden Collection, roughly 99,000 photographic negatives documenting people and places across Falfurrias and neighboring communities.",
      "The current institution gives visitors a clearer Brooks County museum stop and connects Falfurrias with ranching, South Texas heritage, Texas Ranger history and a broader county trip."
    ],
    officialUrl: "https://www.falfurrias.us/Directory.aspx?did=8",
    managingAuthority: "The Heritage Museum at Falfurrias / City of Falfurrias-supported museum board",
    address: "415 N St Mary's St, Falfurrias, TX 78355",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave9-zapata-county",
    brandId: "texasdefined",
    slug: "zapata-county-museum-history",
    name: "Zapata County Museum of History",
    summary: "Visit Zapata County Museum of History in South Texas for the story of Old Zapata's relocation, Falcon Dam and the Rio Grande borderlands, plus exhibits on energy, wildlife, military service, geology and religious heritage.",
    category: "historic-sites",
    region: "south-texas",
    nearestTown: "Zapata",
    county: "Zapata County",
    coordinates: { lat: 26.90292, lng: -99.2687 },
    hero: {
      src: "/images/zapata-county-museum-history-editorial.svg",
      alt: "Original schematic illustration of Old Zapata, Falcon Reservoir and the modern museum; not a photograph",
      width: 1600,
      height: 900,
      credit: "TexasDefined original editorial illustration, not an actual museum photograph or geographic map",
    },
    bestSeason: "Open year-round for indoor visits; October through April is often more comfortable for pairing the museum with outdoor Zapata County history stops.",
    entryNote: "Public hours Tuesday–Friday, 10 a.m.–4 p.m.; weekends are group tours by advance appointment. Published adult admission $7. Call (956) 765-8983 to confirm holiday hours, admission and tour arrangements.",
    highlights: [
      "Old Zapata relocation and the construction of Falcon Reservoir",
      "Ranching, trade and communities along the Rio Grande",
      "Oil-and-gas geology and regional energy development",
      "Native South Texas plants, mammals and reptiles",
      "Historic military uniforms and religious objects",
      "School programs and museum tours by advance arrangement",
    ],
    body: [
      "The Zapata County Museum of History interprets the county from its natural and Indigenous history through Spanish settlement, modern economic change and the building of Falcon Reservoir. It opened in 2011 in modern Zapata, along U.S. Highway 83, to connect visitors with the history of a community whose physical landscape changed dramatically in the middle of the twentieth century.",
      "Old Zapata's relocation is central to that story. Falcon Dam and the reservoir constructed along the Rio Grande required more than 600 families to relocate. Many buildings from the original townsite were demolished or submerged, while historical artifacts and photographs were preserved to maintain a record of families, institutions and community life.",
      "One museum gallery explains the rise of the area's petroleum industry, from discoveries beginning in 1919 to the workers, settlements and businesses involved in developing South Texas oil fields. Geological interpretation connects the oil-and-gas story to deep-time changes in the region's natural resources.",
      "The museum's natural-history exhibits describe the surrounding dryland ecology, including plants characteristic of the South Texas brush country and preserved specimens of animals. The museum grounds also feature a botanical collection of native flora, helping visitors recognize the habitat outside the building.",
      "Military-history displays bring together local service stories with uniforms, medals and insignia spanning the Spanish Colonial era through recent generations. Religious objects from Old Zapata, including nineteenth-century painted devotional pieces, help explain the region's Catholic and cross-border cultural traditions.",
      "Visitors can explore the regular displays on weekdays; the museum lists docent tours and additional school programming, with group visits requiring advance arrangements. Visit the museum first for context before traveling north to San Ygnacio's historic buildings or around the Falcon Reservoir shoreline.",
    ],
    officialUrl: "https://www.co.zapata.tx.us/page/zapata.county.museum",
    managingAuthority: "Zapata County Museum of History / Zapata County",
    address: "805 N US Hwy 83, Zapata, TX 78076",
    sourceCheckedAt: "2026-10-19",
  },
  {
    id: "museum-statewide-wave9-whitehead",
    brandId: "texasdefined",
    slug: "whitehead-memorial-museum-del-rio",
    name: "Whitehead Memorial Museum",
    summary: "Del Rio's Whitehead Memorial Museum is a multi-building pioneer-village museum preserving Val Verde County history through historic structures, regional artifacts, borderlands culture, irrigation history and community exhibits spread across more than two acres.",
    category: "historic-sites",
    region: "big-bend",
    nearestTown: "Del Rio",
    county: "Val Verde County",
    coordinates: { lat: 29.352174, lng: -100.89815 },
    hero: museumPlaceholder("Whitehead Memorial Museum"),
    bestSeason: "Fall through spring for the most comfortable movement between the museum's outdoor and indoor exhibit spaces.",
    entryNote: "The museum's current programming lists Tuesday-Saturday hours from 10 a.m. to 6 p.m. and Sunday from 1 to 5 p.m. Check the official site for admission and special-event schedule changes.",
    highlights: ["Pioneer-village campus", "Val Verde County artifacts", "Historic San Felipe irrigation canal", "Multiple preserved exhibit buildings"],
    body: [
      "The Whitehead Memorial Museum grew from the donation of the old Perry Mercantile Building in 1962 into a walkable historic campus. Rather than concentrating interpretation in one gallery, it spreads regional history across a collection of structures and exhibit sites.",
      "The museum's subject matter reflects Del Rio's borderlands setting and long economic history, with domestic, ranching, civic and cultural collections alongside the surviving San Felipe irrigation canal system. That variety makes the site more like a compact local-history village than a single-room county museum.",
      "Whitehead offers a clear current Val Verde County museum stop and connects Del Rio with Seminole Canyon-area travel, border history and irrigation heritage without repeating the same local-history material elsewhere."
    ],
    officialUrl: "https://whiteheadmuseum.org/",
    managingAuthority: "Whitehead Memorial Museum",
    address: "1308 S Main St, Del Rio, TX 78840",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave9-briscoe-garner",
    brandId: "texasdefined",
    slug: "briscoe-garner-museum-uvalde",
    name: "Briscoe-Garner Museum",
    summary: "The Briscoe-Garner Museum in Uvalde occupies John Nance Garner's National Historic Landmark home and interprets the lives and political legacies of Vice President Garner and Texas Governor Dolph Briscoe through photographs, documents, artifacts and the historic residence itself.",
    category: "historic-sites",
    region: "hill-country",
    nearestTown: "Uvalde",
    county: "Uvalde County",
    coordinates: { lat: 29.21261, lng: -99.792358 },
    hero: museumPlaceholder("Briscoe-Garner Museum"),
    bestSeason: "Year-round historic-house museum; fall through spring is most comfortable for combining it with downtown Uvalde and Hill Country drives.",
    entryNote: "The Briscoe Center currently lists Wednesday-Saturday hours from 9 a.m. to 3 p.m. Guided tours are by appointment, and university holiday closures apply.",
    highlights: ["John Nance Garner National Historic Landmark home", "Vice-presidential history", "Dolph Briscoe exhibits", "University of Texas Briscoe Center stewardship"],
    body: [
      "The Briscoe-Garner Museum resolves older Uvalde county-museum wording to a current institution with statewide significance. John Nance Garner lived in the 1920 house for decades, and the home later became a museum dedicated to his political career and personal story.",
      "The University of Texas at Austin's Briscoe Center for American History now operates the site and expanded the interpretation to include Governor Dolph Briscoe, another major Uvalde political figure. The historic home, documents and artifacts turn twentieth-century Texas political history into a place-based visitor experience.",
      "The museum creates a natural connection between Uvalde County travel, Texas political history, historic homes and Hill Country heritage."
    ],
    officialUrl: "https://briscoecenter.org/visit/briscoe-garner-museum/",
    managingAuthority: "Dolph Briscoe Center for American History, The University of Texas at Austin",
    address: "333 N Park St, Uvalde, TX 78801",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave9-frio-pioneer-jail",
    brandId: "texasdefined",
    slug: "frio-pioneer-jail-museum-pearsall",
    name: "Frio Pioneer Jail Museum",
    summary: "Pearsall's Frio Pioneer Jail Museum occupies the 1884 Old Frio County Jail, preserving the sheriff's residence, original jail cells, county photographs and artifacts tied to ranching, drought, Prohibition and everyday life in early Frio County.",
    category: "historic-sites",
    region: "south-texas",
    nearestTown: "Pearsall",
    county: "Frio County",
    coordinates: { lat: 28.887778, lng: -99.093056 },
    hero: museumPlaceholder("Frio Pioneer Jail Museum"),
    bestSeason: "Fall through spring for the most comfortable South Texas travel; the historic building itself is the main destination in any season.",
    entryNote: "The locally operated museum has limited public hours and volunteer-dependent access. Call ahead before making a special trip; Texas Time Travel currently lists free admission.",
    highlights: ["1884 Old Frio County Jail", "Original jail cells", "Sheriff's residence exhibits", "Recorded Texas Historic Landmark"],
    body: [
      "The Old Frio County Jail served Pearsall for more than eighty years and remains one of the county's most intact nineteenth-century civic buildings. The museum uses the former sheriff's residence downstairs and the preserved cells upstairs to tell local history in the building where part of that history happened.",
      "Artifacts range from photographs and social ephemera to ranching and drought-era tools, while the jail itself preserves stories of law enforcement and Prohibition. The structure is listed on the National Register of Historic Places and carries Recorded Texas Historic Landmark status.",
      "Frio Pioneer Jail Museum gives Pearsall a clear heritage stop that pairs naturally with South Texas road trips, courthouse history and wider Frio County exploration. Its limited access makes checking current hours especially important."
    ],
    officialUrl: "https://friopioneerjailmuseum.com/",
    managingAuthority: "Frio Pioneer Jail Museum Association",
    address: "E Medina St at S Pecan St, Pearsall, TX 78061",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
