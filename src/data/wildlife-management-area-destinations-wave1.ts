import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-09-01";

function wmaPlaceholder(name: string): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

function wma(input: Omit<Destination, "id" | "brandId" | "category" | "hero" | "sourceCheckedAt" | "managingAuthority">): Destination {
  return {
    ...input,
    id: `texas-wma-${input.slug}`,
    brandId: "texasdefined",
    category: "outdoors",
    hero: wmaPlaceholder(input.name),
    managingAuthority: "Texas Parks and Wildlife Department",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  };
}

/**
 * First statewide Texas Wildlife Management Area authority wave.
 *
 * TPWD operates WMAs as working wildlife-management and research landscapes,
 * not conventional state parks. These records intentionally retain the shared
 * destination-photo placeholder so the existing destination-readiness audit
 * keeps them staged until subject-specific licensed imagery is attached.
 */
export const wildlifeManagementAreaWave1Destinations: Destination[] = [
  wma({
    slug: "alazan-bayou-wildlife-management-area",
    name: "Alazan Bayou Wildlife Management Area",
    summary: "Alazan Bayou WMA protects 2,063 acres of bottomland hardwood forest, old fields and floodplain habitat along the Angelina River and associated East Texas bayous south of Nacogdoches.",
    region: "piney-woods",
    nearestTown: "Nacogdoches",
    county: "Nacogdoches County",
    coordinates: { lat: 31.53, lng: -94.7 },
    address: "8096 FM 2782, Nacogdoches, TX 75964",
    bestSeason: "Fall through spring for cooler wildlife viewing; winter and early spring can bring flooded bottomland conditions and strong waterfowl use.",
    entryNote: "The area is open year-round, but visitors age 17 and older generally need an Annual Public Hunting or Limited Public Use permit and must follow current TPWD registration and hunt-period rules.",
    highlights: ["Angelina River bottomlands", "Mature hardwood forest", "Waterfowl and woodland wildlife", "Primitive camping"],
    body: [
      "Alazan Bayou WMA was acquired to preserve mature bottomland hardwood habitat associated with the Angelina River, Loco Bayou and Moral Creek. Seasonal flooding is part of the ecosystem rather than an unusual event.",
      "The area supports wintering waterfowl, white-tailed deer, turkey, squirrels and other East Texas wildlife. Public use includes wildlife viewing and primitive camping as well as regulated hunting.",
      "Visitors should bring drinking water, expect mosquitoes and summer heat, and check current TPWD access notices before entering because WMA rules differ from ordinary park access."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=26",
  }),
  wma({
    slug: "black-gap-wildlife-management-area",
    name: "Black Gap Wildlife Management Area",
    summary: "Black Gap WMA spans about 103,000 acres of Chihuahuan Desert mountains and Rio Grande country beside Big Bend National Park, making it one of Texas's largest and most remote wildlife-management landscapes.",
    region: "big-bend",
    nearestTown: "Marathon",
    county: "Brewster County",
    coordinates: { lat: 29.468333, lng: -102.842861 },
    bestSeason: "Late fall through early spring for moderate desert temperatures; summer access requires serious heat preparation.",
    entryNote: "Open year-round except during special-permit hunts, with registration and area-specific restrictions. Some canyons and Rio Grande access have seasonal limits, so check current TPWD rules before making the long drive.",
    highlights: ["103,000-acre Chihuahuan Desert landscape", "Rio Grande frontage", "Desert bighorn and black bear habitat", "Remote wildlife viewing"],
    body: [
      "Black Gap borders Big Bend National Park and shares roughly 25 miles of the Rio Grande with Mexico. The landscape includes desert basins, rugged canyons and mountain systems extending north from the Sierra del Carmen country.",
      "Wildlife can include desert bighorn sheep, black bear, javelina, deer, raptors and seasonal birds. TPWD also uses the property as a research and demonstration landscape for arid-land wildlife management.",
      "This is a remote public land experience rather than a developed park stop. Fuel, water, road conditions, hunt closures and seasonal access restrictions should all be checked before departure."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=2",
  }),
  wma({
    slug: "candy-cain-abshier-wildlife-management-area",
    name: "Candy Cain Abshier Wildlife Management Area",
    summary: "Candy Cain Abshier WMA is a 207-acre Chambers County coastal birding site near Smith Point, known for live-oak migrant fallout habitat, freshwater ponds and a major seasonal hawk watch overlooking Galveston and Trinity bays.",
    region: "gulf-coast",
    nearestTown: "Smith Point",
    county: "Chambers County",
    coordinates: { lat: 29.52, lng: -94.76 },
    bestSeason: "Spring for trans-Gulf migrant fallout and late summer through fall for the annual hawk migration watch.",
    entryNote: "The WMA is open year-round. Conditions are exposed and coastal, so check weather, insects and current TPWD notices before visiting.",
    highlights: ["Smith Point hawk watch", "Trans-Gulf migrant birding", "Coastal live-oak habitat", "Galveston and Trinity Bay overlook"],
    body: [
      "This small WMA is disproportionately important to Texas birding because its oak mottes and coastal prairie sit at a key migration point near Smith Point. Spring migrants may use the site immediately after crossing the Gulf of Mexico.",
      "A hawk-watch tower and bay observation platform anchor the public experience. The annual late-summer and fall raptor count makes the site one of the better-known stops on the Great Texas Coastal Birding Trail.",
      "The current official name honors Catherine 'Candy' Cain Abshier, a former TPWD employee associated with wetland conservation and preservation work."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=36",
  }),
  wma({
    slug: "chaparral-wildlife-management-area",
    name: "Chaparral Wildlife Management Area",
    summary: "Chaparral WMA protects 15,200 acres of South Texas brush country near Cotulla and serves as a major TPWD research, demonstration and public-use landscape for thornscrub wildlife and habitat management.",
    region: "south-texas",
    nearestTown: "Cotulla",
    county: "La Salle and Dimmit counties",
    coordinates: { lat: 28.33, lng: -99.4 },
    address: "64 Chaparral WMA Dr, Cotulla, TX 78014",
    bestSeason: "Spring through early summer for general non-consumptive access; cooler days are best for trails and the driving tour.",
    entryNote: "General non-consumptive public use is normally available April 1-August 31 and is restricted during scheduled special hunts. TPWD notes that the driving tour and nature trails do not require the same permit as some other uses; verify current rules before arrival.",
    highlights: ["South Texas thornscrub", "Wildlife-management research", "Driving tour and nature trails", "Public hunting program"],
    body: [
      "Chaparral WMA is one of the signature research landscapes of South Texas, where TPWD studies wildlife populations, habitat manipulation and land-management practices representative of the region's brush country.",
      "Public use is deliberately seasonal because hunting and management activities take priority during much of fall and winter. During the spring-summer public-use window, the driving tour and trails offer a practical way to experience the landscape.",
      "Because WMA access is governed differently from state parks, visitors should confirm the current calendar, registration expectations and any hunt closures before traveling."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=45",
  }),
  wma({
    slug: "elephant-mountain-wildlife-management-area",
    name: "Elephant Mountain Wildlife Management Area",
    summary: "Elephant Mountain WMA protects 23,147 acres of Trans-Pecos desert and mountain habitat south of Alpine and is especially important to Texas desert bighorn sheep conservation and research.",
    region: "big-bend",
    nearestTown: "Alpine",
    county: "Brewster County",
    coordinates: { lat: 30.02, lng: -103.58 },
    bestSeason: "Late spring through summer for the seasonal driving tour, or fall through spring for cooler general wildlife viewing when access is open.",
    entryNote: "The area is generally open year-round except for special hunts; TPWD currently lists the driving tour as seasonal from May 1 through August 30. Check current closures before leaving Alpine.",
    highlights: ["Desert bighorn sheep conservation", "Trans-Pecos mountain habitat", "Seasonal driving tour", "Large-game research"],
    body: [
      "Elephant Mountain WMA was acquired in 1985 through private donation for conservation and development of desert bighorn sheep and other large game, along with wildlife research and compatible public recreation.",
      "The property lies along SH 118 about 26 miles south of Alpine and gives visitors a direct look at the rugged habitat that supports West Texas mountain wildlife.",
      "Public use is secondary to management and research, so special-hunt closures and seasonal driving-tour dates should be checked before making the trip."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=7",
  }),
  wma({
    slug: "gene-howe-wildlife-management-area",
    name: "Gene Howe Wildlife Management Area",
    summary: "Gene Howe WMA preserves 5,394 acres along the Canadian River north of Canadian, combining sand-sagebrush grasslands with cottonwood and tallgrass bottomlands in the northern Rolling Plains.",
    region: "panhandle",
    nearestTown: "Canadian",
    county: "Hemphill County",
    coordinates: { lat: 35.99, lng: -100.3 },
    bestSeason: "Spring and fall for birding and moderate temperatures; winter can be productive for open-country wildlife.",
    entryNote: "The area is generally open year-round except when the entire WMA closes for special hunts. Check current TPWD notices before traveling.",
    highlights: ["Canadian River habitat", "Sand-sagebrush grassland", "Cottonwood bottomlands", "Wildlife research and public use"],
    body: [
      "Gene Howe WMA combines two distinct Panhandle habitats: sand-sagebrush and midgrass uplands with cottonwood-tallgrass bottomlands along the Canadian River.",
      "TPWD began acquiring the property in 1950-51 using Pittman-Robertson wildlife-restoration funds for management, research and public use.",
      "The area lies about seven miles north of Canadian, making it an accessible wildlife stop for travelers exploring the northeastern Panhandle while still requiring attention to special-hunt closures."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=8",
  }),
  wma({
    slug: "gus-engeling-wildlife-management-area",
    name: "Gus Engeling Wildlife Management Area",
    summary: "Gus Engeling WMA protects 11,095 acres of Post Oak Savannah, bottomland hardwoods, wetlands, springs and rare bog habitat northwest of Palestine and functions as a major wildlife research and demonstration area.",
    region: "prairies-lakes",
    nearestTown: "Tennessee Colony",
    county: "Anderson County",
    coordinates: { lat: 31.87, lng: -95.93 },
    address: "16149 North US Hwy 287, Tennessee Colony, TX 75861",
    bestSeason: "Spring for wetlands and flowering bog habitat; fall through spring for cooler hiking and wildlife viewing outside hunt closures.",
    entryNote: "Daily registration is required, and adult visitors generally need an Annual Public Hunting or Limited Public Use permit. The WMA closes for drawn hunts during parts of fall and winter, so call ahead during hunting season.",
    highlights: ["Post Oak Savannah research landscape", "Pitcher-plant bogs and wetlands", "Nine-stop driving tour", "Hiking, camping and wildlife viewing"],
    body: [
      "Gus Engeling WMA preserves an unusually intact piece of Post Oak Savannah, including mature bottomland forest, springs, marshes, sloughs and sphagnum bog habitat.",
      "The area doubles as an outdoor laboratory where TPWD demonstrates prescribed fire, grazing, brush control and other wildlife-management techniques. A self-guided driving tour explains the management work at multiple stops.",
      "Public access is permit-based and can close for drawn hunts. Visitors should also be prepared for snakes, alligators, insects and limited developed-trail infrastructure."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=10",
  }),
  wma({
    slug: "james-e-daughtrey-wildlife-management-area",
    name: "James E. Daughtrey Wildlife Management Area",
    summary: "James E. Daughtrey WMA is a South Texas wildlife-management area associated with Choke Canyon Reservoir between Three Rivers and Tilden, managed for brush-country habitat, research and regulated public hunting.",
    region: "south-texas",
    nearestTown: "Tilden",
    county: "Live Oak and McMullen counties",
    coordinates: { lat: 28.5, lng: -98.25 },
    address: "198 Wildlife Ranch Rd, Tilden, TX 78072",
    bestSeason: "Spring and early summer during the general public-use window; cooler weather is preferable when access rules permit.",
    entryNote: "General public use is limited and currently allowed only during a spring-summer window, with closures during hunts. Lake access rules and permit requirements are restrictive, so verify current TPWD guidance before visiting.",
    highlights: ["Choke Canyon Reservoir setting", "South Texas brush habitat", "Wildlife-management research", "Regulated public hunting"],
    body: [
      "James E. Daughtrey WMA lies between San Antonio and Corpus Christi in the South Texas brush country and is closely tied to the Choke Canyon Reservoir landscape.",
      "The area is managed as part of TPWD's South Texas ecosystem work and is not a conventional walk-in recreation destination. Access can be permit-only, and lake entry through the WMA is constrained by current rules and water conditions.",
      "Travelers should treat the TPWD page as the final authority for public-use dates, hunt closures, boat-ramp conditions and required permits."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=46",
  }),
  wma({
    slug: "justin-hurst-wildlife-management-area",
    name: "Justin Hurst Wildlife Management Area",
    summary: "Justin Hurst WMA protects Gulf Coast prairie, wetlands and bayou habitat near Jones Creek south of Houston, with year-round nature loops plus additional access scheduled around hunts and management activities.",
    region: "gulf-coast",
    nearestTown: "Jones Creek",
    county: "Brazoria County",
    coordinates: { lat: 28.98, lng: -95.47 },
    bestSeason: "Fall through spring for cooler coastal wildlife viewing and migration; the nature loops provide the most dependable year-round access.",
    entryNote: "Jones Creek and Live Oak nature loops are open year-round, while other portions of the WMA can be limited to special hunts or scheduled tours. Check current access before traveling.",
    highlights: ["Jones Creek and Live Oak nature loops", "Coastal prairie and wetlands", "Bayou wildlife habitat", "Seasonal hunting and scheduled tours"],
    body: [
      "Justin Hurst WMA is a coastal public land complex near Jones Creek where prairie, wetlands, waterways and managed habitat support waterfowl, resident wildlife and seasonal migrants.",
      "The year-round nature loops make it more approachable than many WMAs, but broader access changes around public hunts and scheduled activities.",
      "Because fishing, hunting and wildlife viewing can have different seasonal rules, visitors should use the current TPWD page rather than assuming the whole property is continuously open."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=41",
  }),
  wma({
    slug: "keechi-creek-wildlife-management-area",
    name: "Keechi Creek Wildlife Management Area",
    summary: "Keechi Creek WMA is a Leon County wildlife-management landscape southeast of Dallas with limited public access and a primary role in habitat management, hunting and wildlife research.",
    region: "prairies-lakes",
    nearestTown: "Oakwood",
    county: "Leon County",
    coordinates: { lat: 31.45145, lng: -95.824217 },
    address: "1670 FM 488, Streetman, TX 75859",
    bestSeason: "Fall through spring when access is available and temperatures are moderate.",
    entryNote: "Access is limited. TPWD directs visitors to current Annual Public Hunting Permit and drawn-hunt information, so do not plan this as a conventional open-access park stop.",
    highlights: ["Leon County wildlife habitat", "Limited-access public land", "Public hunting management", "Research and habitat management"],
    body: [
      "Keechi Creek WMA is a working wildlife-management property rather than a developed recreation park. TPWD uses the area for habitat and population management while providing controlled public hunting opportunities.",
      "The WMA lies in Leon County near Oakwood, with access reached by county roads and a long entrance easement. The limited-access designation is important for trip planning.",
      "Visitors should confirm current access before arrival because entry opportunities are tied closely to TPWD hunting and management schedules."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=11",
  }),
  wma({
    slug: "kerr-wildlife-management-area",
    name: "Kerr Wildlife Management Area",
    summary: "Kerr WMA near Hunt is a 6,459-acre Hill Country research and demonstration landscape known for long-running white-tailed deer studies, habitat-management education and a self-guided driving and birding route.",
    region: "hill-country",
    nearestTown: "Hunt",
    county: "Kerr County",
    coordinates: { lat: 30.06, lng: -99.47 },
    address: "2625 FM 1340, Hunt, TX 78024",
    bestSeason: "Fall through spring for comfortable driving, birding and wildlife viewing; spring adds Hill Country wildflowers and nesting birds.",
    entryNote: "Public access is generally year-round except during special hunts. The main educational auto tour operates on weekday daytime hours and may close during hunt periods; verify current TPWD schedules.",
    highlights: ["White-tailed deer research", "Four-mile educational driving tour", "Guadalupe River frontage", "Hill Country habitat-management demonstrations"],
    body: [
      "Kerr WMA is one of Texas's best-known wildlife research properties, with decades of white-tailed deer work at the Donnie E. Harmel research facility and a broader mission of demonstrating Hill Country land-management techniques.",
      "A paved self-guided auto tour and birding route make the research landscape accessible to non-hunting visitors, while additional seminars and field tours are offered periodically.",
      "The WMA is open under management rules rather than park rules, so hunt closures, registration expectations and tour hours should be checked before arrival."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=12",
  }),
  wma({
    slug: "las-palomas-wildlife-management-area",
    name: "Las Palomas Wildlife Management Area",
    summary: "Las Palomas WMA is a Lower Rio Grande Valley system of multiple habitat units across Starr, Hidalgo, Cameron and Willacy counties, protecting brush, resaca and subtropical wildlife habitat near the Mexico border.",
    region: "south-texas",
    nearestTown: "Weslaco",
    county: "Starr, Hidalgo, Cameron and Willacy counties",
    coordinates: { lat: 26.16, lng: -97.99 },
    address: "154-B Lakeview Drive, Weslaco, TX 78596",
    bestSeason: "Fall through spring for Valley birding and cooler daytime hiking; migration seasons can be especially productive.",
    entryNote: "Public-use units are generally open year-round for daytime biking, hiking and wildlife viewing but close during public hunting activities. Adult visitors need the appropriate TPWD public-use permit and must register as directed.",
    highlights: ["Lower Rio Grande Valley habitat units", "Birding and wildlife viewing", "Subtropical brush and resaca habitat", "Day-use hiking and biking"],
    body: [
      "Las Palomas is not one continuous reserve. It is a network of wildlife-management units spread across the Lower Rio Grande Valley, giving TPWD a way to protect and manage habitat in a heavily fragmented region.",
      "Several units are open for public use and can support birding, hiking and biking, but access changes during hunt periods and visitors are expected to register under current TPWD procedures.",
      "Because unit names, closures and access points matter more here than at a single-gate destination, travelers should choose a specific public-use unit before leaving rather than navigating only to the Weslaco office."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=47",
  }),
];
