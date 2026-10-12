/** Authoritative visitor-planning layer for canonical Texas River articles.
 * Add river-specific research to DETAILS, and register its light metadata in
 * river-authority-registry.ts. Never imply an unnamed public river access,
 * photograph, permitted campground, or current fishing regulation.
 */
import type { Article, ArticleBlock, ArticleInternalLink } from "../types";
import { riverAuthorityBySlug, riverAuthorityRecords } from "../river-authority-registry";
import { texasRiverVisitorStubs } from "./texas-river-visitor-stubs";

type RiverDetail = {
  position: string; fish: string[]; access: string[]; camp: string[];
  paddle: string[]; swim: string; trip: string; culture: string; extra: string;
};
const DETAILS: Record<string, RiverDetail> = {
  "guadalupe": {
    "position": "The Guadalupe rises from Hill Country forks near Kerr County, passes Kerrville and New Braunfels, then continues toward the coastal plain. Canyon Lake divides the upper and lower visitor experiences; the river is not one uniform float.",
    "fish": [
      "Upper Hill Country reaches: look for bass, sunfish and other warm-water fish in suitable publicly accessible water; do not assume a bank is public simply because it is on the river.",
      "Canyon Lake and downstream impounded reaches have different species and regulations from free-flowing stretches. Check the specific waterbody before selecting tackle or keeping fish.",
      "Fishing success changes with discharge, season, temperature and turbidity; check TPWD's lake surveys and current local conditions before advertising a 'best' fishing location."
    ],
    "access": [
      "Guadalupe River State Park is a practical official access and day-use reference upstream of New Braunfels; check the park's current swimming, paddling and campground notices.",
      "The Kerrville/Comfort, Canyon Lake and New Braunfels reaches differ substantially in bank access; use an authorized public put-in or booked outfitter, and identify the take-out before entering the water.",
      "Canyon Lake dam releases can change conditions downstream independently of rain at your launch location."
    ],
    "camp": [
      "Guadalupe River State Park supports state-park camping; reserve through TPWD and check site amenities rather than assuming hookups at every site.",
      "Canyon Lake and New Braunfels offer privately operated RV and cabin options; verify river frontage, launch privileges and flood-related restrictions directly with each property.",
      "The river corridor is not blanket public land: overnight stops on privately owned banks require permission."
    ],
    "paddle": [
      "For a first visit, choose a short managed float in New Braunfels or an authorized state-park paddle rather than committing to an unverified long route.",
      "Plan upstream/downstream shuttles before departure. Low-water dragging and high-water strainers are two different hazards that a generic route distance will not reveal.",
      "Tubing is popular on particular New Braunfels segments but seasonal operating rules and vendor arrangements can change."
    ],
    "swim": "Use designated park swimming areas or other currently authorized entry points only. Even familiar swimming holes develop strong currents, submerged debris and slippery limestone after rain.",
    "trip": "Morning: start with a Guadalupe River State Park or Kerrville-side trail and interpretive stop. Afternoon: visit Canyon Lake's reservoir overlooks or an approved New Braunfels float after checking official flow information. For an overnight, choose a confirmed campground or room rather than improvising riverside camping.",
    "culture": "The river links spring-fed Hill Country ecology, New Braunfels' German-Texan settlement, dam and reservoir history, agriculture and the downstream coastal landscape. Water management is central to understanding why upstream and downstream conditions differ.",
    "extra": "Separate river reaches, Canyon Lake reservoir conditions and regulated dam releases in every recreation recommendation."
  },
  "frio": {
    "position": "The upper Frio winds through Real and Uvalde county canyon country around Leakey, Concan and Garner State Park before continuing into drier South Texas portions of the Nueces watershed. The well-known tourist segment is only part of the complete river.",
    "fish": [
      "Bass and sunfish may be encountered in clear upper-river pools; locate legal access first and check any park-specific regulations.",
      "Shallow summer stretches are not comparable to deeper pools or the lower drainage; water conditions can make a previously fishable reach impractical.",
      "Do not publish unverified stocking reports, trophy claims or exact catch limits; confirm current TPWD rules before fishing."
    ],
    "access": [
      "Garner State Park is the main official gateway to a Frio River visit, with day-use capacity limits and reservations potentially affecting access.",
      "Concan and Leakey outfitters operate on specific stretches. Verify the operator's current launch, take-out, shuttle and cancellation conditions rather than assuming every location is public.",
      "Public road crossings do not automatically provide parking, camping, safe launch access or permission to enter private adjacent land."
    ],
    "camp": [
      "Reserve Garner State Park campsites early for popular weekends and review RV length, electricity and campground restrictions with TPWD.",
      "Cabins, small campgrounds and RV facilities around Concan and Leakey are options; verify river access is included, and watch for seasonal closures.",
      "For a quieter itinerary, plan a weekday, state-park walk and a properly reserved river stay; do not claim unrestricted primitive camping."
    ],
    "paddle": [
      "Short floats in the Concan/Garner corridor depend heavily on water levels and outfitter operating conditions; arrange legal launch and pickup in advance.",
      "In some dry spells, float routes cannot run; after heavy Hill Country rain, dangerous rises can happen quickly.",
      "Avoid setting an unverified float duration in a permanent guide, since flow and crowding can change it substantially."
    ],
    "swim": "The upper Frio's clear appearance does not prove safety. Check swim-area status, recent rainfall, local warnings, slippery rocks and children’s supervision; stay within authorized park or outfitter areas.",
    "trip": "Arrive in daylight, visit Garner State Park's trails and official Frio swimming area after checking conditions, then spend a second day exploring Leakey or a pre-booked Concan float. Include a non-water backup in case levels are unsuitable.",
    "culture": "Frio means 'cold' in Spanish, reflecting its spring-influenced upper reaches. Limestone canyon scenery, cypress-lined banks and the river's role in regional tourism make the upper basin distinct from the lower Nueces system.",
    "extra": "The Frio is a tributary of the Nueces system, not an independent TWDB major-basin river. Do not confuse Frio County with the river's best-known upstream recreation reaches."
  },
  "comal": {
    "position": "The Comal is a short spring-fed river in New Braunfels, flowing from the Comal Springs/Landa Lake area through an urban recreation corridor to its meeting with the Guadalupe River. It is not a long cross-state waterway.",
    "fish": [
      "Urban spring-fed habitat supports fish and protected aquatic life, but aquatic-species protections and designated recreation areas can constrain where and how to fish.",
      "Do not recommend casting within marked swimming or tubing areas, spring habitat or other restricted zones. Verify local ordinances and TPWD rules first.",
      "Avoid assuming a reservoir fishery list applies to the Comal River itself; this is a separate spring-fed river ecosystem."
    ],
    "access": [
      "Start with the City of New Braunfels' official river recreation and parks guidance for public access, seasonal requirements and ordinances.",
      "Landa Park provides nearby spring and headwater context; tubing operators manage some customer transportation, but their pickup points are not universal public access.",
      "A very short river can still have access restrictions, crowded public facilities, submerged hazards and local river-use rules."
    ],
    "camp": [
      "There is no reason to promise a waterfront Comal campsite: compare established New Braunfels, Canyon Lake and Guadalupe corridor campgrounds instead.",
      "Check whether a campground is actually on the Comal rather than the Guadalupe, and verify shuttle distance to the Comal tube route.",
      "For day trippers, lodging in New Braunfels or a nearby booked campground may be more practical than searching for a Comal riverbank camp."
    ],
    "paddle": [
      "Comal visitors commonly plan a short tube outing, not a wilderness canoe expedition. Verify the current tube route, river entrance, pickup and any applicable city restrictions.",
      "Tubing traffic and seasonal rules vary; use the city's notices for equipment, containers, transport, parking and permitted entry.",
      "Do not convert a posted tube route into an unofficial kayak access recommendation."
    ],
    "swim": "Use marked river recreation areas and heed New Braunfels city instructions. Springs do not eliminate hazards from river current, river traffic or constrained exit points.",
    "trip": "Visit the Landa Park area first to understand Comal Springs. Use a city-authorized tubing entry or licensed operator for a daytime float, then explore downtown New Braunfels or nearby Gruene. Reserve evening lodging away from unauthorized riverbank areas.",
    "culture": "The Comal's spring discharge helped make New Braunfels a distinctive settlement and recreation destination. The river is a sensitive aquifer-fed system, so conservation and urban visitor management matter as much as tubing.",
    "extra": "The Comal belongs to the Guadalupe River basin; a separate basin statistic should never be invented for this short tributary."
  },
  "san-marcos": {
    "position": "Spring Lake's artesian springs feed the San Marcos River in Hays County. The river passes San Marcos and continues toward Martindale and the Guadalupe, changing from spring-run urban water to longer downstream paddling reaches.",
    "fish": [
      "Fishing must account for protected spring habitat, state rules and city/park restrictions; not every picturesque bank is an appropriate fishing site.",
      "Outside sensitive protected reaches, anglers should check TPWD rules and current public access before seeking bass, sunfish or catfish in suitable habitat.",
      "Distinguish the San Marcos River itself from nearby lakes, irrigation channels and the Blanco River tributary system."
    ],
    "access": [
      "San Marcos City Park and Rio Vista Park are recognizable civic reference points; use current City of San Marcos rules to determine where entry is actually permitted.",
      "Spring Lake/Meadows Center areas include protected environments with visitor controls; do not treat them as unrestricted floating access.",
      "Downstream from the city, public access is patchier; locate legal launch and take-out facilities before attempting a Martindale-area trip."
    ],
    "camp": [
      "Camping is generally planned at established Hill Country or San Marcos-area campgrounds rather than assumed along the urban riverbank.",
      "Check outfitters or parks for legitimate river access, booking conditions, showers and RV constraints.",
      "Longer paddling outings require confirmed legal overnight stops; land alongside the river may be private."
    ],
    "paddle": [
      "For easy city recreation, verify current entry and take-out rules around City Park and Rio Vista rather than depending on historic tubing advice.",
      "Downstream paddling toward Martindale can involve obstacles, changing currents and long shuttle logistics; use vetted guides or paddling trail descriptions.",
      "Spring-fed flows do not mean the river is immune to rapid rises after watershed rain."
    ],
    "swim": "Sensitive spring ecosystems require extra care: use permitted swimming areas, keep off protected vegetation and obey current rules protecting endangered aquatic species and habitat.",
    "trip": "Begin near Spring Lake with a managed educational visit, then use an authorized city river recreation area. On a second day, consider a guided paddle or explore the historic San Marcos downtown; avoid entering restricted springs.",
    "culture": "The San Marcos Springs and river are important natural, cultural and research resources. Their long human history and rare aquatic habitat explain why recreation and conservation need to be planned together.",
    "extra": "This river is in the Guadalupe basin, not a distinct major basin. Educational visits near Spring Lake may require advance bookings."
  },
  "llano": {
    "position": "The North and South Llano forks meet in Junction, and the Llano River runs east through Mason and Llano country before meeting the Colorado River near the Highland Lakes. Limestone upstream and exposed granite near Llano make its scenery distinctive.",
    "fish": [
      "Warm-water bass, catfish and sunfish may be present in appropriate reaches; fishing conditions change with water level, substrate and pool connectivity.",
      "South Llano River State Park and other authorized public areas are better starting points than improvising access across ranch property.",
      "Check TPWD's specific restrictions, licenses and any special waterbody rules before fishing."
    ],
    "access": [
      "South Llano River State Park near Junction is an official anchor for day use, wildlife viewing and camping; consult TPWD for current river access status.",
      "Road bridges and city parks may provide some public recreation areas, but do not assume parking or launch is legal at an arbitrary crossing.",
      "Gravel bars and shallow crossings can change after floods; use current local and state access information."
    ],
    "camp": [
      "South Llano River State Park provides a managed camping option, subject to reservations, fire restrictions and campsite-specific amenities.",
      "Junction, Mason and Llano offer private camping and lodging alternatives; verify the actual river proximity and any access agreement.",
      "Seasonal wildlife habitat, including roosting areas, may limit some state-park activities; follow posted closures."
    ],
    "paddle": [
      "The South Llano section near Junction offers possible shorter outings when levels permit, while the lower river may demand more scouting and private-property awareness.",
      "Do not promise a continuous canoe route without confirmed put-ins, take-outs and flows; shoals and floods both affect passability.",
      "Plan a road-trip alternative if USGS gauges or park notices indicate unsafe conditions."
    ],
    "swim": "Only use currently designated or authorized swimming spots and check river closures. Slippery stone, hidden channels and flash floods can be dangerous even in scenic shallow-looking water.",
    "trip": "Spend a morning at South Llano River State Park with nature trails and a permitted river stop, then head east through Mason or Llano for historic downtowns and granite-country scenery. Reserve camping before departure if staying overnight.",
    "culture": "The Llano River ties Junction's fork geography to granite exposures, ranch towns and the Colorado watershed. Seasonal flow, distinctive geology and riparian wildlife give the corridor more interest than a generic tubing itinerary.",
    "extra": "Do not confuse the main Llano River, South Llano River, and state-park designations; their names and access rules differ."
  },
  "colorado": {
    "position": "The Texas Colorado is not the Colorado River of the Grand Canyon. It crosses West and Central Texas, supplies the Highland Lakes chain, flows through Austin and downstream communities, and reaches Matagorda Bay.",
    "fish": [
      "Distinguish free-flowing Colorado reaches from Lake Buchanan, Inks Lake, Lake LBJ, Lake Travis, Lake Austin and Lady Bird Lake: they are different fisheries with distinct restrictions.",
      "Bass, catfish and sunfish are relevant to various river and reservoir reaches, but specific creel rules and consumption advisories must be checked by waterbody.",
      "Never substitute a generic 'Colorado River fishing' species claim for a current TPWD reservoir report."
    ],
    "access": [
      "Colorado Bend State Park offers official recreation upstream of the Highland Lakes; observe park-specific cave, river and camping rules.",
      "In Austin, public lakefront and approved paddling facilities are not interchangeable with every private shoreline; confirm launch and motor restrictions.",
      "Lower-river access around Bastrop and farther downstream should be verified against TPWD leased access and current operator information."
    ],
    "camp": [
      "Colorado Bend State Park is an established base for a remote-feeling state-park stay; check site facilities and reservations.",
      "State parks, private RV parks and campgrounds serve several Highland Lakes and Bastrop-area segments. Match the campground to the intended river reach.",
      "Lower Colorado trips require planned launches and overnight permissions, not assumed public bank camping."
    ],
    "paddle": [
      "Visitors can compare calm reservoir paddling around Austin with moving-water experiences on authorized free-flowing sections.",
      "Dams and diversions separate navigable reaches; never publish an uninterrupted route across the Highland Lakes.",
      "Check LCRA and other relevant dam-operation information as well as USGS/NWS conditions before downstream recreation."
    ],
    "swim": "Swimming is not automatically allowed in every reservoir or urban reach. Follow local park advisories, watercraft traffic rules and posted restrictions.",
    "trip": "An Austin-based day can combine a confirmed public paddling launch and nearby land-based attractions. For a nature weekend choose Colorado Bend or Bastrop-area established access, or plan a separate Highland Lakes itinerary rather than treating the entire river as one destination.",
    "culture": "The Texas Colorado links Native and settlement routes, power generation, reservoir construction, urban drinking water, recreation and the agricultural lower river. A visitor guide must distinguish these uses along the river's length.",
    "extra": "Name the Texas river explicitly to prevent confusion with the interstate Colorado of the American Southwest."
  },
  "brazos": {
    "position": "The Brazos brings together broad upper forks and follows a lengthy route through Waco and the Brazos Valley to the Gulf near Freeport. The river's appearance changes from dam-influenced upper reaches to broad, often muddy floodplain water.",
    "fish": [
      "Anglers should distinguish Lake Whitney, Lake Granbury, Lake Somerville and other basin reservoirs from the open river.",
      "Catfish, bass and other species occur across suitable reaches, but harvest and fish-consumption advice may differ by waterbody and county.",
      "Boat launches should be located in current official listings; a map line along a large river is not a launch site."
    ],
    "access": [
      "Public access can be found at particular state parks, reservoir recreation sites, approved paddling trails and leased access points; verify exact locations and operating conditions.",
      "Do not recommend an arbitrary Brazos sandbar or bridge as a public campground or boat ramp.",
      "Lower river conditions differ substantially from Waco-area urban access and upper dam-controlled stretches."
    ],
    "camp": [
      "Lake Whitney and Lake Somerville basin parks and other established campgrounds provide useful trip bases, but visitors must distinguish reservoir camping from camping directly beside the Brazos.",
      "Brazos Bend State Park offers lower-coastal-plain wetland recreation in the greater basin, rather than a claim of direct mainstem tubing.",
      "Check fire, flood, wildlife and reservation advisories from the relevant agency."
    ],
    "paddle": [
      "Short mapped paddling trails and guided trips are safer first choices than committing to unsupported multi-day river mileages.",
      "The Brazos' width, shifting sandbars, flood pulses and releases require up-to-date conditions and an exit plan.",
      "Some stretches have limited or privately controlled riverbank access; confirm the legal start and finish."
    ],
    "swim": "The broad, sediment-rich river can hide currents, debris and drop-offs; swimming must be restricted to designated managed areas where allowed.",
    "trip": "Combine Waco's riverfront heritage stops with a separately confirmed recreational launch or choose an established state-park camping base around one of the Brazos basin lakes. For a second day, follow a historic river crossing or watershed museum rather than inventing an unsupervised mainstem float.",
    "culture": "The Brazos is inseparable from Indigenous histories, migrations, plantations and slavery, agricultural development, bridge building, flooding and major water-supply infrastructure.",
    "extra": "County naming is not river access evidence: Brazos County is part of the larger corridor but does not certify a particular water entry."
  },
  "neches": {
    "position": "The Neches runs south through East Texas woods and floodplains. Tributaries include the Angelina River; the basin connects reservoirs and Big Thicket wetlands before reaching the Beaumont and Sabine Lake region.",
    "fish": [
      "Bass, crappie, catfish and other sport fish are associated with reservoirs in the basin, including Sam Rayburn and B. A. Steinhagen; river reaches have different conditions.",
      "Verify river or reservoir identity before selecting regulations and check for any fish-consumption advisories or protected-area restrictions.",
      "Some backwaters and floodplain habitats are seasonally difficult to reach and may be unsuitable for novice boaters."
    ],
    "access": [
      "Check Big Thicket National Preserve and TPWD guidance for public-access opportunities in the watershed; preserve units and individual river ramps have different rules.",
      "The Neches and Angelina network includes private timberland and wetlands; a watercourse on a map does not establish permission to park or camp.",
      "Lower navigable reaches may share traffic with commercial or motorized activity; verify conditions before launching."
    ],
    "camp": [
      "Village Creek State Park and other protected-area campgrounds provide bases for seeing the wider Neches basin, but Village Creek is a tributary, not the Neches main channel.",
      "For direct river camping, use a specifically permitted facility or verified public site, not informal floodplain banks.",
      "Wet conditions, insects and flood warnings matter more here than a generic Hill Country river packing list."
    ],
    "paddle": [
      "Look for vetted East Texas paddling trails or guide services with mapped start and finish points; expect slower water, woody obstacles and variable levels.",
      "Never conflate a tributary trail on Village Creek with a continuous Neches mainstem itinerary.",
      "Choose shorter managed routes for first-time paddlers and review high-water closures."
    ],
    "swim": "Turbid water, snags, currents and alligator habitat mean swimming should never be assumed safe merely because a bank is accessible.",
    "trip": "Build a Big Thicket or Village Creek State Park day around trails, wildlife interpretation and official water access. Extend the trip toward the Angelina basin or Beaumont-area history only after reviewing travel distances and site hours.",
    "culture": "The Neches watershed reflects East Texas timber, wetland ecology, river transportation and the relationship between water supply, conservation lands and industry.",
    "extra": "A photo from Village Creek is basin context, not proof that it depicts the Neches main channel."
  },
  "sabine": {
    "position": "The Sabine rises in northeast Texas, runs through East Texas reservoirs including Lake Tawakoni and Toledo Bend, forms part of the Texas–Louisiana boundary and reaches Sabine Lake.",
    "fish": [
      "Lake Tawakoni and Toledo Bend are established freshwater fishing destinations but have different species, facilities and rules from the Sabine's river reaches.",
      "For river fishing, consult TPWD, lake managers and current access information; do not advertise public bank access where land may be private.",
      "Downstream brackish water near Sabine Lake requires distinguishing freshwater rules from saltwater licensing and species limits."
    ],
    "access": [
      "Large reservoirs offer mapped formal access facilities; check TPWD and the managing authorities for ramps, fees and restrictions.",
      "River and swamp sections near the Louisiana border may have limited legal shore access and variable high-water conditions.",
      "The lower river and Sabine Lake share wetland, industrial and coastal-water contexts that differ from inland lakes."
    ],
    "camp": [
      "Toledo Bend-area state parks and managed campgrounds can anchor lake-focused trips; verify each site's state jurisdiction, amenities and reservation process.",
      "Avoid describing the entire lower Sabine as an accessible primitive campground. Private lands and conservation closures apply.",
      "For family trips, select an established RV/cabin base near a confirmed public launch rather than a speculative route."
    ],
    "paddle": [
      "Reservoir paddling and backwater trips require different skills than a flowing-river trip; choose a mapped trail or locally guided outing.",
      "Wind across Toledo Bend, submerged timber, swamp navigation and changing levels can be as important as current.",
      "Confirm launch ownership and transportation before committing to a remote cross-border route."
    ],
    "swim": "Do not assume safe swimming in reservoirs, swamps or the brackish river mouth. Use designated water areas and check warnings and wildlife notices.",
    "trip": "Choose either a Lake Tawakoni-area lake weekend, a Toledo Bend fishing and state-park stay, or an Orange-area lower-river heritage excursion. Treat these as separate destinations, not one short drive.",
    "culture": "The Sabine ties East Texas logging, energy, freshwater supply, state-boundary and coastal geography and coastal wetlands together, including extensive two-state water management at Toledo Bend.",
    "extra": "Two-state travel and fishing requirements can differ; never assume a Texas license or property access right settles Louisiana-side requirements."
  },
  "pecos": {
    "position": "The Pecos enters Texas from New Mexico and traverses sparsely populated West Texas toward the Rio Grande/Amistad system. Remote canyon country and limited access make it an entirely different recreation proposition from the Guadalupe or Frio.",
    "fish": [
      "Fishing opportunities depend on the reach, water quality, access and flow. Salinity and intermittent or reduced flows affect parts of the basin.",
      "Near Amistad, reservoir rules and facilities are distinct from remote Pecos River mainstem opportunities; do not claim generic public shore fishing access.",
      "Check TPWD species guidance, special county bait restrictions, consumption advisories and the landowner/public access situation before an outing."
    ],
    "access": [
      "Seminole Canyon State Park and the U.S. 90 Pecos River crossing are appropriate landscape and history reference points, but not automatic river launches.",
      "Much of the lower Pecos corridor is rugged, remote or privately controlled; do not publish speculative ramps, swim holes or cliff access.",
      "Check NPS Amistad National Recreation Area rules for any legal access close to the confluence."
    ],
    "camp": [
      "Base a visit at a bookable West Texas state park, designated Amistad camping area or licensed campground with posted access rules.",
      "Primitive riverbank camping should not be encouraged without confirmed permission, route feasibility and safety equipment.",
      "Summer heat, scarce water, limited cellular coverage and distance between services require conservative trip planning."
    ],
    "paddle": [
      "The Pecos is not an ordinary drop-in tubing river. Any extended river trip calls for specialist local guidance, confirmed legal access and verified current flow.",
      "Canyon sections may combine deep water, difficult exits and extreme remoteness. Never propose a mileage or overnight route without proven logistics.",
      "Carry an independent emergency plan, adequate drinking water and a route shared with someone off the river."
    ],
    "swim": "Do not recommend informal swimming from steep canyon rims or the high bridge; approach water only through legally open managed areas.",
    "trip": "Explore the Pecos River High Bridge landscape from authorized viewpoints, visit Seminole Canyon's managed cultural and nature programs, and stay near Del Rio or Amistad with reserved facilities. A separate specialist river expedition requires its own plan.",
    "culture": "The river's story includes Indigenous rock-art landscapes, older crossings, ranching, rail engineering, irrigation, salinity and modern basin management. Its scenic importance should not be mistaken for easy recreation access.",
    "extra": "Pecos County, Pecos city, the Pecos River and the Trans-Pecos region refer to different geographies; avoid conflation."
  }
};
const BASIN_SOURCES: Record<string, string> = {
  "guadalupe": "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/guadalupe/index.asp",
  "nueces": "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/nueces/index.asp",
  "colorado": "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/colorado/",
  "brazos": "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/brazos/index.asp",
  "neches": "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/neches/index.asp",
  "sabine": "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/sabine/index.asp",
  "riogrande": "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/riogrande/"
};
const COMMON_SOURCES: ArticleInternalLink[] = [
  {
    "href": "https://tpwd.texas.gov/landwater/water/habitats/rivers/access/index.phtml",
    "label": "TPWD public river and leased access",
    "description": "Check currently authorized river launch, parking and fishing access."
  },
  {
    "href": "https://tpwd.texas.gov/landwater/water/habitats/rivers/",
    "label": "TPWD Texas river guide and safety",
    "description": "Find state river access, navigation rules, river safety and current program links."
  },
  {
    "href": "https://tpwd.texas.gov/regulations/outdoor-annual/fishing/general-rules-regulations/general-fishing-regulations",
    "label": "Current Texas fishing license rules",
    "description": "Check license, endorsements and exceptions for the current license year."
  },
  {
    "href": "https://tpwd.texas.gov/regulations/outdoor-annual/fishing/freshwater-fishing/freshwater-fishing-laws-and-exceptions",
    "label": "Freshwater exceptions and advisories",
    "description": "Review waterbody-specific fishing limits, gear rules and consumption advisories."
  },
  {
    "href": "https://dashboard.waterdata.usgs.gov/",
    "label": "USGS real-time streamflow",
    "description": "Use current upstream and downstream gauges, not dated flow estimates."
  },
  {
    "href": "https://www.weather.gov/safety/flood",
    "label": "National Weather Service flood safety",
    "description": "Check warnings and understand the risk of rapidly rising water."
  }
];
/** Verified primary operator pages; supplement general fishing, basin and safety sources. */
const RIVER_OFFICIAL: Record<string, ArticleInternalLink[]> = {
  guadalupe: [
    {href:"https://tpwd.texas.gov/state-parks/guadalupe-river",label:"Guadalupe River State Park",description:"Official access, current alerts and campground reservations."},
    {href:"https://www.newbraunfels.gov/3367/River-Recreation",label:"New Braunfels river operations",description:"City river closures, regulations, parking and recreation guidance."}],
  frio: [
    {href:"https://tpwd.texas.gov/state-parks/garner",label:"Garner State Park official guide",description:"Frio River access, park alerts and amenities."},
    {href:"https://tpwd.texas.gov/state-parks/garner/fees-facilities/campsites/",label:"Garner State Park camping choices",description:"Campsite types, park fees and reservations."}],
  comal: [
    {href:"https://www.newbraunfels.gov/3368/Comal-River",label:"City of New Braunfels: Comal River",description:"Official current river conditions, rules, parking and tube chute information."},
    {href:"https://www.newbraunfels.gov/3367/River-Recreation",label:"New Braunfels river recreation hub",description:"Compare Comal and Guadalupe river closures and rules."}],
  "san-marcos": [
    {href:"https://www.sanmarcostx.gov/Facilities/Facility/Details/City-Park-35",label:"San Marcos City Park authorized river access",description:"Official park amenities and river access at 170 Charles Austin Drive."},
    {href:"https://www.sanmarcostx.gov/889/Park-Rules",label:"City of San Marcos river and park rules",description:"Current city park, container and habitat protections."},
    {href:"https://tpwd.texas.gov/fishboat/fish/recreational/rivers/media/San_Marcos_River_maps.pdf",label:"TPWD San Marcos River access map",description:"Historic mapped access and portage locations; verify current open status."}],
  llano: [
    {href:"https://tpwd.texas.gov/state-parks/south-llano-river",label:"South Llano River State Park",description:"Official day-use, river conditions, alerts and camping information."},
    {href:"https://tpwd.texas.gov/state-parks/south-llano-river/fees-facilities/campsites",label:"South Llano campsite options",description:"Official electric, walk-in and primitive campsite categories."}],
  colorado: [
    {href:"https://tpwd.texas.gov/state-parks/colorado-bend",label:"Colorado Bend State Park",description:"Official upstream park, river and camping access."}],
  brazos: [
    {href:"https://tpwd.texas.gov/state-parks/lake-somerville",label:"Lake Somerville State Park & Trailway",description:"Official reservoir-basin recreation and camping."}],
  neches: [
    {href:"https://tpwd.texas.gov/state-parks/village-creek",label:"Village Creek State Park",description:"Official tributary park activities and camping in the Neches watershed."},
    {href:"https://www.nps.gov/bith/index.htm",label:"Big Thicket National Preserve",description:"Preserve rules, water trails and protected habitats."}],
  sabine: [
    {href:"https://tpwd.texas.gov/state-parks/lake-tawakoni",label:"Lake Tawakoni State Park",description:"Official state-park fishing and camping in the upper basin."}],
  pecos: [
    {href:"https://www.nps.gov/amis/planyourvisit/boating.htm",label:"NPS Amistad boat ramps and Pecos reach",description:"Check Pecos River boat ramp access and use-pass rules; ramp status is changeable."},
    {href:"https://www.nps.gov/amis/planyourvisit/conditions.htm",label:"NPS Amistad current alerts",description:"Check boat-ramp status, closures and changing lake levels."},
    {href:"https://tpwd.texas.gov/state-parks/seminole-canyon",label:"Seminole Canyon State Park",description:"Official visiting, cultural interpretation and campground information."}],
};
/** Exact official visitor starting points, not a claim of current open access. */
const VERIFIED_ACCESS_DESK: Record<string, {places:string[]; source:string; note:string}> = {
  guadalupe: {
    places:["Nichol's Landing (Specht's Crossing), Old Spring Branch Road: official upper-river TPWD paddling put-in; alternate access at FM 311 crossing","Lake Wood Park near Gonzales: TPWD Come and Take It trail put-in downstream of H-5 Dam; this is a long advanced route, not a casual tubing loop"],
    source:"https://tpwd.texas.gov/boating/paddling-trails/hill-country/upper-guadalupe/",
    note:"TPWD's Upper Guadalupe–Nichol's Landing paddling trail describes a 9.9-mile reach; check flows, seasonal parking terms and reach suitability before launching."
  },
  frio: {
    places:["Garner State Park: confirmed TPWD Frio River visitor area and official state-park campsite choices","Concan and Leakey: private outfitter and lodging base areas, NOT generalized public ramps"],
    source:"https://tpwd.texas.gov/state-parks/garner",
    note:"Contact TPWD or the actual outfitter about swimming zones and flows. Historic TPWD Frio river route descriptions are not evidence a private crossing remains open."
  },
  comal: {
    places:["Prince Solms Park, 100 Liebscher, New Braunfels: official city-designated Comal river recreation access","Hinman Island Park: city-listed bring-your-own-tube entry option; do not assume free parking or a return shuttle"],
    source:"https://www.newbraunfels.gov/comalriver",
    note:"City Tube Chute, exits, float equipment rules and seasonal wristbands are subject to city policy. Recheck the official city site before traveling."
  },
  "san-marcos": {
    places:["San Marcos City Park: city-managed recreation area; review posted park and river conditions","San Marcos River Retreat and Scull Rd Bridge Access: sites identified by the TPWD leased-access program; lease and operator terms must be confirmed before arrival"],
    source:"https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/index.phtml",
    note:"Spring Lake is protected habitat and not an unrestricted public launch. Verify lease status because temporary public access contracts can expire."
  },
  llano: {
    places:["Mainstem Llano at Castell Crossing: TPWD-listed leased river access; reconfirm active access and terms","South Llano at County Road 150 and Cupgrass: TPWD-listed leased access; not equivalent to public campground ownership"],
    source:"https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/index.phtml",
    note:"TPWD's published river access maps distinguish Junction, Castell and Kingsland; check each river reach and any recently expired lease."
  },
  colorado: {
    places:["Colorado Bend State Park: managed park destination for river-based recreation; use official entry and alerts","LCRA Highland Lakes operations: reservoir and dam information must inform choices on the Austin and downstream reaches"],
    source:"https://tpwd.texas.gov/state-parks/colorado-bend",
    note:"The Highland Lakes are segmented by dams. Do not present a reservoir-to-reservoir continuous paddling route."
  },
  brazos: {
    places:["Brazos River Nature Center at Gholson: TPWD-listed leased river access downstream of Lake Whitney, with advance-arrival requirements and limited facilities","Brazos River Milam County sites: TPWD-described leased launch/take-out opportunity, subject to contact, gate and site-condition restrictions"],
    source:"https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/brazos_river_nature_center.phtml",
    note:"The TPWD Brazos River Nature Center lease is currently described as running through August 31, 2027; this is a temporary contract, not a perpetual public easement."
  },
  neches: {
    places:["Chandler River Park: TPWD-listed access on the Neches upstream of Lake Palestine","Village Creek State Park: protected watershed recreation on a tributary, not a mainstem Neches boat ramp"],
    source:"https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/index.phtml",
    note:"Check current leased access and park rules; wooded floodplains can make entry impassable after rain."
  },
  sabine: {
    places:["Grand Bluff Boat Ramp near Carthage: TPWD-listed access on the Sabine River","Toledo Bend and Lake Tawakoni: separate reservoir fisheries with facility-specific access; do not infer mainstem access from lake ramps"],
    source:"https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/index.phtml",
    note:"Review TPWD's Sabine River waterbody-specific fishing exceptions before keeping fish, and distinguish Texas from Louisiana regulations."
  },
  pecos: {
    places:["Pecos River ramp within Amistad National Recreation Area: consult NPS boating access and current conditions; its availability can be restricted by water level","Seminole Canyon State Park and the U.S. 90 high bridge: authorized land-based history and scenic stops, NOT casual boat launch locations"],
    source:"https://www.nps.gov/amis/planyourvisit/boating.htm",
    note:"Do not travel expecting the Pecos River ramp to be open; check current NPS ramp closure notices and avoid launching from bridge approaches."
  }
};
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const list = (items: string[]): ArticleBlock => ({ type: "list", items });
const riverLink = (slug: string, label: string): ArticleInternalLink => ({
  href: `/article/${slug}`, label, description: "Independent Texas river recreation, ecology, access and trip-planning guide.",
});
function riverAuthoritySections(slug: string): ArticleBlock[] {
  const river = riverAuthorityBySlug[slug];
  if (!river) throw new Error(`River guide absent from registry: ${slug}`);
  const detail = DETAILS[river.key];
  if (!detail) throw new Error(`River guide missing original visitor research: ${slug}`);
  return [
    h("Plan your visit: which stretch of this river?"),
    p(detail.position),
    ...(river.imageAlt.toLowerCase().includes("representative") || river.imageAlt.toLowerCase().includes("not the") || river.imageAlt.toLowerCase().includes("watershed") ? [
      p(`Photo context: ${river.imageAlt}. This image is regional watershed context, not documentary evidence of the appearance of the named river's main channel.`)
    ] : []),
    p("This guide separates the watershed, the actual free-flowing river, nearby reservoirs, tributaries and official recreation areas. Being near the same named river does not guarantee the same access, swimming conditions, fishing rules or services. Check the specific reach before choosing lodging or a float."),
    h("Fishing: target water, habitat and regulations"),
    list(detail.fish),
    p("Texas fishing requirements and special bag, length and waterbody rules change. For the September 1, 2026–August 31, 2027 license year consult TPWD directly; a river guide is not a substitute for the current regulation booklet. Look up fish-consumption advisories before keeping a catch."),
    h("Legal access, boat ramps and shoreline"),
    list(detail.access),
    h("Named starting points: verify before arrival"),
    list(VERIFIED_ACCESS_DESK[river.key].places),
    p(VERIFIED_ACCESS_DESK[river.key].note),
    p(`Official source for these locations: ${VERIFIED_ACCESS_DESK[river.key].source}. These are agency-listed reference points, not independently confirmed present-day openings; verify access, parking, ownership, closures and cost with the operator.`),
    p("Use the TPWD public river-access directory and the manager of the exact facility. Navigability does not itself grant a right to trespass across private land, park in a road shoulder or camp on any bank. Never rely on a bridge, satellite map or unverified social-media pin as proof of legal access."),
    h("Paddling, kayaking and tubing"),
    list(detail.paddle),
    p("Before setting out, confirm the named put-in, take-out, length, shuttle, water level, hazards, rental policies and current local restrictions. USGS flow readings are provisional and gauge values are location-specific; they are not a guarantee that a particular float is safe."),
    h("Camping, cabins and RV trip bases"),
    list(detail.camp),
    p("Verify reservation requirements, tent/RV site amenities, river distance, pet rules, fire restrictions and flood closures with each campsite's operator. A river-themed campground name does not demonstrate that guests have lawful river entry."),
    h("Swimming and water safety"),
    p(detail.swim),
    p("Flash floods are possible after rain outside your immediate area. Wear a properly fitted life jacket for boating, protect children around currents and check NWS warnings immediately before departure; do not enter flooded or closed water."),
    h("A practical one-day visit and a two-day option"),
    p(detail.trip),
    h("Ecology, local history and why the river matters"),
    p(detail.culture),
    h("Specific cautions for this river"),
    p(detail.extra),
    h("Frequently asked planning questions"),
    list([
      `Where can I get into the ${river.name}? Start with TPWD's leased-access directory, public park facilities, and the applicable local manager; only use currently authorized locations.`,
      `Can I camp beside the ${river.name}? Only in an approved campground or somewhere you have confirmed legal overnight permission; riverbanks are not categorically public campsites.`,
      `Can I fish the ${river.name}? Follow the current Texas license, gear and bag rules, and check waterbody exceptions and consumption advisories; a state-park visit may have different rules.`,
      "How do I check whether floating is safe? Compare multiple USGS gauges with NWS alerts, recent weather, local parks/outfitters and your group's least experienced participant.",
    ]),
    h("Sources, verification and how to cite"),
    p(`Guide updated October 12, 2026. River-basin context: Texas Water Development Board (${BASIN_SOURCES[river.basin]}). Access and recreation: Texas Parks and Wildlife Department river guide and public boater access directory; current fishing limits: TPWD 2026–2027 Outdoor Annual; current gauge data: U.S. Geological Survey National Water Dashboard; flood alerts: National Weather Service. Source links are provided below and may be updated by the responsible agencies. This is independent editorial trip-planning information, not a permit, an official river access designation or a real-time safety clearance.`),
    p(`Suggested citation: TexasDefined.com, "${river.name}: Fishing, Camping and Visitor Guide," updated October 12, 2026. Only publicly reusable images are retained; regional representative imagery is labeled and must not be passed off as a photograph of this river.`),
  ];
}
function riverAuthorityLinks(slug: string): ArticleInternalLink[] {
  const river = riverAuthorityBySlug[slug];
  if (!river) return [];
  const neighbors = riverAuthorityRecords.filter((other) =>
    other.slug !== slug && (other.basin === river.basin || other.counties.some((county) => river.counties.includes(county)))
  ).slice(0, 5).map((other) => riverLink(other.slug, other.name));
  const countyLinks = river.counties.slice(0, 7).map((county) => ({
    href: `/county/${county}`, label: `${county.replace(/(^|-)([a-z])/g, (_match, dash: string, letter: string) => `${dash ? " " : ""}${letter.toUpperCase()}`)} County guide`,
    description: "Explore nearby town, county and tourism context; county associations do not identify public river access."
  }));
  return [
    riverLink("texas-rivers-explained", "Texas river systems compared"),
    ...river.destinations.map((slug) => ({
      href: `/destination/${slug}`,
      label: slug.replace(/(^|-)([a-z])/g, (_match, _dash: string, letter: string) => ` ${letter.toUpperCase()}`).trim(),
      description: "Related existing park, lake or visitor destination in this river corridor or watershed; check its exact location and entry rules.",
    })),
    {href:"/explore/lakes-rivers",label:"Explore Texas lakes and rivers",description:"Statewide water and recreation collections."},
    ...neighbors, ...countyLinks,
    {href:BASIN_SOURCES[river.basin],label:"TWDB official basin profile",description:"Water geography and basin management context."},
    ...COMMON_SOURCES,
    {href:VERIFIED_ACCESS_DESK[river.key].source,label:"Official named access starting points",description:VERIFIED_ACCESS_DESK[river.key].note},
    {href:"https://tpwd.texas.gov/fishboat/fish/recreational/rivers/",label:"TPWD river fishing and downloadable access maps",description:"River-specific fishing maps for San Marcos, Sabine, Llano, Neches, Colorado and other rivers."},
    ...(RIVER_OFFICIAL[river.key] ?? []),
  ];
}
export function strengthenTexasRiverArticle(article: Article): Article {
  if (!riverAuthorityBySlug[article.slug]) return article;
  const existing = article.internalLinks ?? [];
  const additions = riverAuthorityLinks(article.slug).filter((link) => !existing.some((entry) => entry.href === link.href));
  return {
    ...article, updatedAt: "2026-10-12",
    readingMinutes: Math.max(article.readingMinutes, 12),
    internalLinks: [...existing, ...additions],
    body: [...article.body, ...riverAuthoritySections(article.slug)],
    sources: [
      ...(article.sources ?? []),
      {label:"TWDB official basin information",url:BASIN_SOURCES[riverAuthorityBySlug[article.slug].basin]},
      {label:"TPWD current Texas river access guidance",url:"https://tpwd.texas.gov/landwater/water/habitats/rivers/access/index.phtml"},
      {label:"TPWD 2026–2027 freshwater regulation exceptions",url:"https://tpwd.texas.gov/regulations/outdoor-annual/fishing/freshwater-fishing/freshwater-fishing-laws-and-exceptions"},
      {label:"USGS National Water Dashboard",url:"https://dashboard.waterdata.usgs.gov/"},
      ...(RIVER_OFFICIAL[riverAuthorityBySlug[article.slug].key] ?? []).map((source) => ({label:source.label,url:source.href}))
    ],
  };
}
/** New profiles reuse the same quality layer as existing full basin features. */
export const texasRiverNewVisitorArticles: Article[] = texasRiverVisitorStubs.map((stub) => {
 const river = riverAuthorityBySlug[stub.slug];
 return strengthenTexasRiverArticle({...stub, sourceUrl: BASIN_SOURCES[river.basin]});
});
