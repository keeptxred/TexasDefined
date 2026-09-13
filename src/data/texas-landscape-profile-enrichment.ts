import type { LandscapeRecord } from "./texas-landscapes";
import { texasLandscapes } from "./texas-landscapes";

export type LandscapeAuthoritySource = {
  label: string;
  href: string;
};

export type LandscapeFieldNote = {
  heading: string;
  body: string;
};

export type EnrichedLandscapeRecord = LandscapeRecord & {
  fieldNotes: LandscapeFieldNote[];
  sourceLinks: LandscapeAuthoritySource[];
};

type LandscapeProfileEnhancement = {
  fieldNotes: LandscapeFieldNote[];
  sourceLinks: LandscapeAuthoritySource[];
};

const TPWD_ECOREGIONS = "https://tpwd.texas.gov/education/hunter-education/online-course/wildlife-conservation/texas-ecoregions";
const TPWD_EDWARDS = "https://tpwd.texas.gov/landwater/land/habitats/cross_timbers/ecoregions/edwards_plateau.phtml";
const TPWD_PINEYWOODS = "https://tpwd.texas.gov/wildlife/wildlife-diversity/wildscapes/wildscapes-plant-guidance-by-ecoregion/east-texas-pineywoods/";
const TPWD_GULF_COAST = "https://tpwd.texas.gov/education/resources/texas-junior-naturalists/regions/gulf-coast";
const TPWD_COASTAL_HABITATS = "https://tpwd.texas.gov/fishing/sea-center-texas/flora-fauna-guide/texas-coastal-habitats-overview/";
const TPWD_SOUTH_TEXAS_BRUSH = "https://tpwd.texas.gov/wildlife/wildlife-diversity/wildscapes/wildscapes-plant-guidance-by-ecoregion/south-texas-brush-country/";
const TPWD_SOUTH_TEXAS_PLAINS = "https://tpwd.texas.gov/education/resources/texas-junior-naturalists/regions/south-texas-plains";
const TPWD_BENTSEN_NATURE = "https://tpwd.texas.gov/state-parks/bentsen-rio-grande-valley/nature";
const TPWD_BLACKLAND = "https://tpwd.texas.gov/landwater/land/habitats/cross_timbers/ecoregions/blackland.phtml";
const TPWD_BLACKLAND_PLANTS = "https://tpwd.texas.gov/wildlife/wildlife-diversity/wildscapes/wildscapes-plant-guidance-by-ecoregion/the-blackland-prairies/";
const TPWD_POST_OAK = "https://tpwd.texas.gov/wildlife/wildlife-diversity/wildscapes/wildscapes-plant-guidance-by-ecoregion/post-oak-savannah/";
const TPWD_CROSS_TIMBERS = "https://tpwd.texas.gov/landwater/land/habitats/cross_timbers/ecoregions/cross_timbers.phtml";
const TPWD_ROLLING_PLAINS = "https://tpwd.texas.gov/landwater/land/habitats/cross_timbers/ecoregions/rolling_plains.phtml";
const TPWD_HIGH_PLAINS = "https://tpwd.texas.gov/wildlife/wildlife-diversity/wildscapes/wildscapes-plant-guidance-by-ecoregion/high-plains/";
const TPWD_TRANS_PECOS = "https://tpwd.texas.gov/landwater/land/habitats/trans_pecos/";
const TPWD_PANHANDLE = "https://tpwd.texas.gov/education/resources/texas-junior-naturalists/regions/panhandle-plains";
const TPWD_CAPROCK_NATURE = "https://tpwd.texas.gov/state-parks/caprock-canyons/nature";
const TPWD_CAVING = "https://tpwd.texas.gov/state-parks/parks/things-to-do/caves-at-state-parks";
const TPWD_PRAIRIES_LAKES = "https://tpwd.texas.gov/education/resources/texas-junior-naturalists/regions/prairies-and-lakes";
const TPWD_WETLANDS = "https://tpwd.texas.gov/landwater/water/habitats/wetland/ecology/texas_wetlands.phtml";
const TPWD_GULF_MARSHES = "https://tpwd.texas.gov/wildlife/wildlife-diversity/wildscapes/wildscapes-plant-guidance-by-ecoregion/gulf-coast-prairies-and-marshes/";
const TWDB_EDWARDS = "https://www.twdb.texas.gov/groundwater/aquifer/majors/edwards-bfz.asp";
const TWDB_RIVERS_RESERVOIRS = "https://www.twdb.texas.gov/surfacewater/rivers/";
const TWDB_RIO_GRANDE = "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/riogrande/";
const TWDB_WATER_CONDITIONS = "https://www.twdb.texas.gov/surfacewater/conditions/index.asp";
const NPS_CHIHUAHUAN = "https://www.nps.gov/subjects/geology/geodiversity-atlas-chihuahuan-desert-network-index.htm";
const NPS_BIG_BEND = "https://www.nps.gov/articles/nps-geodiversity-atlas-big-bend-national-park-texas.htm";
const NPS_BIG_THICKET = "https://www.nps.gov/bith/learn/the-big-thicket.htm";
const NPS_GUADALUPE = "https://www.nps.gov/articles/nps-geodiversity-atlas-guadalupe-mountains-national-park-texas.htm";
const BEG_PERMIAN = "https://www.beg.utexas.edu/articles/mapping-the-present-day-2-d-crustal-stress-field-and-seismic-moment-release-for-the-greater-permian-basin-of-texas-as-constrained-by-earthquake-source-mechanisms";
const TXDOT_WILDFLOWERS = "https://www.txdot.gov/about/campaigns-outreach/bluebonnets-wildflowers.html";
const TXDOT_BLUEBONNETS = "https://www.txdot.gov/about/campaigns-outreach/bluebonnets-wildflowers/planting-bluebonnets.html";

const enhancements: Record<string, LandscapeProfileEnhancement> = {
  "hill-country": {
    fieldNotes: [
      { heading: "Read the hills as the dissected edge of a plateau", body: "The Hill Country is not a separate mountain chain. It is the strongly eroded eastern part of the Edwards Plateau, where limestone uplands are cut by streams and valleys. That helps explain why the region can alternate so quickly between high rocky ridges, narrow drainages, open grassland and shaded river corridors." },
      { heading: "The famous clear water begins underground", body: "Limestone fractures and solution channels make groundwater unusually important here. The Edwards aquifer system transmits water through porous and cavernous rock and feeds major springs. On the surface, that relationship appears as spring-fed pools, clear creeks, cypress-lined rivers, caves and sudden changes between dry upland and wet valley habitat." },
    ],
    sourceLinks: [
      { label: "Texas Parks & Wildlife — Edwards Plateau ecological region", href: TPWD_EDWARDS },
      { label: "Texas Water Development Board — Edwards (Balcones Fault Zone) Aquifer", href: TWDB_EDWARDS },
    ],
  },
  "piney-woods": {
    fieldNotes: [
      { heading: "East Texas belongs to a larger southeastern forest", body: "The Piney Woods continue beyond the state line into Louisiana, Arkansas and Oklahoma. Higher rainfall and humidity support pine and pine-hardwood forest rather than the open grassland and shrubland many travelers associate with Texas. Sandy uplands, hardwood bottoms and stream corridors add substantial local variation inside the forest region." },
      { heading: "Big Thicket shows why 'forest' is too simple a label", body: "Big Thicket National Preserve protects a close mixture of pine forest, hardwood bottomland, bayous, wetlands and other communities. That mosaic is the best way to understand the Piney Woods in the field: elevation may change only modestly, but drainage and soils can shift the vegetation dramatically over a short distance." },
    ],
    sourceLinks: [
      { label: "Texas Parks & Wildlife — East Texas Pineywoods", href: TPWD_PINEYWOODS },
      { label: "National Park Service — What is the Big Thicket?", href: NPS_BIG_THICKET },
    ],
  },
  "gulf-coast": {
    fieldNotes: [
      { heading: "The coast is a chain of connected habitats", body: "A beach is only the seaward edge of the Texas coastal system. Barrier islands, dunes, bays, estuaries, tidal flats, salt marshes and coastal prairie sit beside one another and exchange water, sediment and wildlife. Rivers arriving from inland Texas add freshwater and nutrients before those waters reach bays and the Gulf." },
      { heading: "Flat does not mean static", body: "The coastal plain is low and slowly drained, but storms, tides, waves, wind and river sediment continually reshape it. That is why dunes, marsh edges, tidal channels and beach profiles can look different after major weather. Travelers should treat the shoreline as an active landscape rather than a fixed line on a map." },
    ],
    sourceLinks: [
      { label: "Texas Parks & Wildlife — Gulf Coast region", href: TPWD_GULF_COAST },
      { label: "Texas Parks & Wildlife — Texas coastal habitats", href: TPWD_COASTAL_HABITATS },
    ],
  },
  "south-texas-brush-country": {
    fieldNotes: [
      { heading: "Thornscrub is an adaptation to heat and limited moisture", body: "The South Texas Brush Country is characterized by thorny shrubs and small trees mixed with grassland. Mesquite, acacia, prickly pear and other drought-tolerant plants reflect high summer temperatures, strong evaporation and uneven rainfall. Soil depth matters too: deeper soils can support taller brush, while shallow caliche often carries shorter, denser vegetation." },
      { heading: "The brush hides more biodiversity than the road suggests", body: "From a highway, South Texas can appear like continuous low scrub. In reality, arroyos, sandy belts, resacas farther south, ranch ponds and river corridors create habitat differences that support unusually rich wildlife. That variety is why birding and wildlife trips often reward careful stops at managed public sites rather than a simple drive-through." },
    ],
    sourceLinks: [
      { label: "Texas Parks & Wildlife — South Texas Brush Country", href: TPWD_SOUTH_TEXAS_BRUSH },
      { label: "Texas Parks & Wildlife — South Texas Plains", href: TPWD_SOUTH_TEXAS_PLAINS },
    ],
  },
  "rio-grande-valley": {
    fieldNotes: [
      { heading: "The Valley is a river floodplain and delta landscape", body: "The Lower Rio Grande Valley is not a mountain valley. Historic river movement created abandoned channels called resacas, low floodplain surfaces and young alluvial soils. Irrigation and flood-control infrastructure now influence a river system that once shifted more freely across the plain, so remnant natural habitat is often concentrated in protected corridors and scattered fragments." },
      { heading: "Small habitat fragments carry outsized ecological value", body: "Texas Parks and Wildlife notes that much of the original native brush along the lower Rio Grande has been converted to agriculture or urban land, while surviving fragments retain exceptional biodiversity. The combination of subtropical vegetation, river habitat and a major migration corridor makes the region one of the most distinctive wildlife landscapes in the state." },
    ],
    sourceLinks: [
      { label: "Texas Parks & Wildlife — Bentsen-Rio Grande Valley nature", href: TPWD_BENTSEN_NATURE },
      { label: "Texas Water Development Board — Rio Grande River Basin", href: TWDB_RIO_GRANDE },
      { label: "Texas Parks & Wildlife — South Texas Plains", href: TPWD_SOUTH_TEXAS_PLAINS },
    ],
  },
  "edwards-plateau": {
    fieldNotes: [
      { heading: "Think broad limestone upland before thinking Hill Country", body: "The Edwards Plateau extends well beyond the most tourist-heavy Hill Country. Much of it is an elevated limestone surface with rocky soils, grassland and oak-juniper woodland. Along its eastern edge, streams have cut the plateau more deeply, producing the stronger relief commonly associated with Hill Country scenery." },
      { heading: "Karst links the plateau's surface and groundwater", body: "Cretaceous limestone dissolves along fractures, creating caves, sinks and underground conduits. In the faulted eastern zone, the Edwards aquifer stores and moves large quantities of groundwater. Springs and headwater streams reveal that hidden system at the surface and help explain why clear water can emerge from otherwise dry-looking limestone country." },
    ],
    sourceLinks: [
      { label: "Texas Parks & Wildlife — Edwards Plateau ecological region", href: TPWD_EDWARDS },
      { label: "Texas Water Development Board — Edwards (Balcones Fault Zone) Aquifer", href: TWDB_EDWARDS },
    ],
  },
  "blackland-prairie": {
    fieldNotes: [
      { heading: "The dark soil explains both the prairie and its scarcity", body: "Blackland Prairie soils developed over chalks, marls and clays and became highly valued for agriculture. Conversion to farms and cities removed most original tallgrass prairie, so intact remnants now matter far beyond their size. Preserves reveal what the Dallas-to-Central-Texas corridor looked like before intensive cultivation and urban growth." },
      { heading: "A prairie is more than grass", body: "Big bluestem, little bluestem, Indiangrass and other grasses form the structure, but native forbs and wildflowers create much of the seasonal diversity. Trees can occur along drainages and in scattered settings without turning the ecosystem into woodland. The best prairie stops make that grass-forb structure visible rather than presenting a mowed field as a substitute." },
    ],
    sourceLinks: [
      { label: "Texas Parks & Wildlife — Blackland Prairie", href: TPWD_BLACKLAND },
      { label: "Texas Parks & Wildlife — Blackland Prairie native plants", href: TPWD_BLACKLAND_PLANTS },
    ],
  },
  "post-oak-savannah": {
    fieldNotes: [
      { heading: "This is a transition landscape by design", body: "Post Oak Savannah lies between wetter East Texas forest and the prairies farther west. Sandy or loamy uplands support post oak and other woodland patches while openings carry grasses and forbs. That patchwork, rather than an unbroken forest or open prairie, is the feature to look for on backroads and public natural areas." },
      { heading: "Soil and fire help decide where trees win", body: "Woodland density varies with soil, moisture, disturbance and fire history. Suppression of frequent fire and changes in grazing can allow woody cover to expand into former grassland. As a result, modern roadside scenery may look more wooded than historic savannah conditions, which is useful context when comparing a preserve with surrounding ranch or suburban land." },
    ],
    sourceLinks: [
      { label: "Texas Parks & Wildlife — Post Oak Savannah", href: TPWD_POST_OAK },
      { label: "Texas Parks & Wildlife — Texas ecoregions", href: TPWD_ECOREGIONS },
    ],
  },
  "cross-timbers": {
    fieldNotes: [
      { heading: "Bands of oak once interrupted travel across the prairie", body: "The Cross Timbers are narrow woodland belts and associated grasslands stretching through north-central Texas. Sandy soils favor post oak and blackjack oak, creating wooded zones between prairie systems. The alternating timber and openings are the key visual pattern, especially where modern development has not erased the original contrast." },
      { heading: "The region is a useful bridge between wetter and drier Texas", body: "Cross Timbers country sits near major ecological transitions, so vegetation can shift noticeably across relatively short drives. Prairies, oak woodland, river bottoms and rocky or sandy uplands overlap. For travelers, that makes the region more interesting than a single forest label suggests and explains why nearby parks can look surprisingly different from one another." },
    ],
    sourceLinks: [
      { label: "Texas Parks & Wildlife — Cross Timbers ecological region", href: TPWD_CROSS_TIMBERS },
      { label: "Texas Parks & Wildlife — Texas ecoregions", href: TPWD_ECOREGIONS },
    ],
  },
  "rolling-plains": {
    fieldNotes: [
      { heading: "The land drops away from the High Plains", body: "The Rolling Plains occupy lower country east of the Caprock Escarpment. Compared with the level Llano Estacado above, the surface is more dissected by streams, breaks and broad valleys. Red soils and exposed sedimentary rocks become especially visible where erosion has removed grass cover or cut into canyon walls." },
      { heading: "Grassland and shrubland reflect a drier climate", body: "Rainfall is lower than in much of eastern Texas, and native vegetation is dominated by grasses with shrubs and scattered trees depending on soil and drainage. River corridors and reservoirs create local exceptions. The strongest landscape views combine open rolling ground with the escarpments and breaks that announce the transition toward the High Plains." },
    ],
    sourceLinks: [
      { label: "Texas Parks & Wildlife — Rolling Plains ecological region", href: TPWD_ROLLING_PLAINS },
      { label: "Texas Parks & Wildlife — Panhandle Plains", href: TPWD_PANHANDLE },
    ],
  },
  "high-plains-llano-estacado": {
    fieldNotes: [
      { heading: "The flatness is an elevated landform", body: "The Llano Estacado is a broad, high tableland rather than a low plain. Long stretches can appear nearly level because the surface changes slowly, yet the plateau sits well above surrounding country. Its edge becomes obvious at the Caprock Escarpment, where streams descend toward lower plains and cut dramatic canyons into the margin." },
      { heading: "Playa lakes punctuate the open grassland", body: "Shallow depressions known as playas collect seasonal water across the High Plains and provide important wetland habitat in an otherwise dry, intensively farmed landscape. Their temporary nature is part of the system. After rain they can become conspicuous water-and-wildlife features; during dry periods the same depressions may look like ordinary low ground." },
    ],
    sourceLinks: [
      { label: "Texas Parks & Wildlife — High Plains", href: TPWD_HIGH_PLAINS },
      { label: "Texas Parks & Wildlife — Texas ecoregions", href: TPWD_ECOREGIONS },
    ],
  },
  "permian-basin": {
    fieldNotes: [
      { heading: "The name describes a geologic basin system, not one uniform surface landscape", body: "The greater Permian Basin includes the Delaware Basin, Central Basin Platform and Midland Basin. Those subsurface provinces are fundamental to the region's petroleum geology, but travelers see a broad semi-arid surface of plains, draws, low relief and extensive energy infrastructure rather than an obvious bowl-shaped basin." },
      { heading: "Water and relief connect the basin to neighboring landscapes", body: "The Permian Basin overlaps drainage systems that eventually feed major Texas rivers while grading westward toward Trans-Pecos mountain-and-basin country and eastward toward plains. That makes it best understood as both a geologic province and a transition landscape. Reservoirs, draws and river headwaters provide some of the strongest breaks in the otherwise open terrain." },
    ],
    sourceLinks: [
      { label: "Bureau of Economic Geology — Greater Permian Basin provinces", href: BEG_PERMIAN },
      { label: "Texas Water Development Board — River Basins & Reservoirs", href: TWDB_RIVERS_RESERVOIRS },
    ],
  },
  "trans-pecos-far-west-texas": {
    fieldNotes: [
      { heading: "This is Texas's true basin-and-range country", body: "The Trans-Pecos contains desert basins separated by mountain ranges, creating the state's strongest relief and clearest Chihuahuan Desert identity. Elevation changes climate and vegetation quickly: low basins can carry creosote and lechuguilla while higher slopes support grassland, shrubland and woodland communities that feel dramatically cooler and greener." },
      { heading: "Desert does not mean biologically empty", body: "The Chihuahuan Desert supports specialized plant communities shaped by elevation, soils and limited but highly variable moisture. Springs, arroyos and the Rio Grande become disproportionately important wildlife corridors. For travelers, the safest mental model is a mosaic of desert, mountain and riparian habitats rather than one continuous dry plain." },
    ],
    sourceLinks: [
      { label: "Texas Parks & Wildlife — Trans-Pecos habitat", href: TPWD_TRANS_PECOS },
      { label: "National Park Service — Chihuahuan Desert geodiversity", href: NPS_CHIHUAHUAN },
    ],
  },
  "guadalupe-mountains": {
    fieldNotes: [
      { heading: "The mountains expose an ancient reef in the desert", body: "Guadalupe Mountains geology is exceptional because uplift and erosion expose rocks formed from a Permian-age marine reef complex. That history appears today as steep limestone cliffs, canyons, talus slopes and high ridges rising abruptly above Chihuahuan Desert lowlands. The contrast between reef-derived rock and surrounding desert makes the range visually distinctive even within Far West Texas." },
      { heading: "Elevation creates stacked habitats", body: "Climbing from desert foothills into the high country changes temperature, moisture and vegetation. Desert plants dominate lower elevations, while higher slopes and sheltered canyons can support woodland and other cooler-climate communities. A single hike can therefore cross ecological conditions that would be separated by much greater horizontal distance elsewhere in Texas." },
    ],
    sourceLinks: [
      { label: "National Park Service — Guadalupe Mountains geodiversity atlas", href: NPS_GUADALUPE },
      { label: "Texas Parks & Wildlife — Trans-Pecos habitat", href: TPWD_TRANS_PECOS },
    ],
  },
  "texas-panhandle": {
    fieldNotes: [
      { heading: "The Panhandle is more than flat prairie", body: "Much of the Panhandle belongs to the southern Great Plains, but the surface ranges from level High Plains to rough canyon and break country. The Caprock Escarpment marks one of the clearest landscape boundaries: elevated Llano Estacado country lies to the west while lower Rolling Plains spread eastward." },
      { heading: "Canyons reveal the geology hidden under the plains", body: "At Caprock Canyons, streams descending from the Llano Estacado have cut through the escarpment and exposed layers of red, orange and pale sedimentary rock. That erosion explains why spectacular canyon scenery can appear suddenly inside a region known for enormous horizons and level farmland." },
    ],
    sourceLinks: [
      { label: "Texas Parks & Wildlife — Panhandle Plains", href: TPWD_PANHANDLE },
      { label: "Texas Parks & Wildlife — Caprock Canyons nature", href: TPWD_CAPROCK_NATURE },
    ],
  },
  "rivers-and-river-valleys": {
    fieldNotes: [
      { heading: "Texas rivers cross landscapes instead of staying inside them", body: "Texas Water Development Board recognizes 15 major river basins plus eight coastal basins. Individual rivers may begin in dry plains or spring country and then cross prairies, forests and coastal lowlands before reaching the Gulf. That journey explains why one named river can look completely different from its headwaters to its lower valley." },
      { heading: "Rainfall changes basin behavior from west to east", body: "Precipitation varies dramatically across Texas, and TWDB identifies rainfall, evaporation, vegetation, soil, slope, geology and land use among the factors shaping each basin. Western streams can be intermittent or low-yield, while eastern basins generally carry more water. Reservoirs, diversions and groundwater-fed reaches add another layer to what travelers see today." },
    ],
    sourceLinks: [
      { label: "Texas Water Development Board — River Basins & Reservoirs", href: TWDB_RIVERS_RESERVOIRS },
      { label: "Texas Water Development Board — Texas water conditions", href: TWDB_WATER_CONDITIONS },
    ],
  },
  "lakes-and-reservoirs": {
    fieldNotes: [
      { heading: "Most large Texas lakes are engineered reservoirs", body: "Texas has a large network of major reservoirs built for water supply, flood management and other purposes. They occupy river valleys and tributaries, so their shape and scenery reflect the basin they flooded. A wooded East Texas reservoir, a Hill Country impoundment and a West Texas water-supply lake can share the same engineering category while looking completely different on the ground." },
      { heading: "Water level is part of the landscape", body: "Reservoir shorelines move as inflow, releases, evaporation and demand change. Exposed banks, submerged vegetation, boat access and the apparent width of coves can therefore vary substantially through drought and wet periods. Current water data matters for trip planning in a way that it does not for a fixed geological landmark." },
    ],
    sourceLinks: [
      { label: "Texas Water Development Board — River Basins & Reservoirs", href: TWDB_RIVERS_RESERVOIRS },
      { label: "Texas Water Development Board — Texas water conditions", href: TWDB_WATER_CONDITIONS },
    ],
  },
  "canyons": {
    fieldNotes: [
      { heading: "Texas canyons form by very different processes", body: "Panhandle canyons cut into the edge of the High Plains, exposing colorful sedimentary layers as streams descend through the Caprock. Far West Texas canyons are tied to uplifted and faulted mountain-and-basin country, volcanic terrain and the cutting power of the Rio Grande and its tributaries. Similar steep walls can therefore record very different geologic histories." },
      { heading: "Canyon climate can differ from the rim", body: "Relief changes shade, wind, temperature and access to water over short distances. A canyon floor may support denser vegetation than the exposed rim, while narrow drainages can become hazardous during intense rain. The same topography that produces dramatic photographs also makes weather and route planning especially important." },
    ],
    sourceLinks: [
      { label: "Texas Parks & Wildlife — Caprock Canyons nature", href: TPWD_CAPROCK_NATURE },
      { label: "National Park Service — Big Bend geodiversity atlas", href: NPS_BIG_BEND },
    ],
  },
  "caves-and-karst": {
    fieldNotes: [
      { heading: "Karst is a landscape formed by dissolving rock", body: "In limestone country, slightly acidic water enlarges fractures and bedding planes over time, creating caves, sink features and underground drainage. Central Texas and the Edwards Plateau contain some of the state's best-known examples. Surface hills, springs and caves are therefore connected parts of the same water-rock system rather than separate attractions." },
      { heading: "Cave access is a safety and conservation issue", body: "Texas Parks and Wildlife distinguishes caves that can be entered on guided tours from sites that require permits or special planning. Rain can rapidly change underground conditions, and cave formations and habitat are easily damaged. A landscape guide should never imply that the presence of a cave means unrestricted public entry." },
    ],
    sourceLinks: [
      { label: "Texas Parks & Wildlife — Caving in Texas State Parks", href: TPWD_CAVING },
      { label: "Texas Water Development Board — Edwards (Balcones Fault Zone) Aquifer", href: TWDB_EDWARDS },
    ],
  },
  "prairies-and-grasslands": {
    fieldNotes: [
      { heading: "Texas grasslands change with rainfall, soil and fire", body: "There is no single statewide prairie. Tallgrass communities historically occupied wetter eastern and central areas such as the Blackland Prairie, while shorter and mixed grasses become more important toward the drier plains. Soil texture, grazing, fire and woody-plant expansion further change what a grassland looks like today." },
      { heading: "Look for intact structure, not just open space", body: "A native prairie contains layers of grasses and flowering plants adapted to seasonal growth and disturbance. A pasture, crop field or regularly mowed roadside may be open but does not automatically preserve that ecological structure. Public prairie remnants and restoration sites are especially valuable because they make the plant diversity and seasonal change easier to see." },
    ],
    sourceLinks: [
      { label: "Texas Parks & Wildlife — Prairies and Lakes", href: TPWD_PRAIRIES_LAKES },
      { label: "Texas Parks & Wildlife — Blackland Prairie native plants", href: TPWD_BLACKLAND_PLANTS },
    ],
  },
  "deserts": {
    fieldNotes: [
      { heading: "Texas desert is overwhelmingly Chihuahuan", body: "The state's clearest desert landscapes occur in the Trans-Pecos as part of the Chihuahuan Desert. Broad basins, alluvial fans and mountain ranges support creosote, lechuguilla, ocotillo, sotol, yucca, agave and other dry-country plants. It is a high-desert system with major elevation differences rather than an endless field of sand." },
      { heading: "Mountains and springs complicate the desert picture", body: "Mountain slopes can intercept more moisture and support vegetation unlike the basin floor, while springs and the Rio Grande create narrow but critical ribbons of water-dependent habitat. Those exceptions are central to the desert's ecology. Travelers who only photograph the driest flats miss much of what makes West Texas desert country distinctive." },
    ],
    sourceLinks: [
      { label: "National Park Service — Chihuahuan Desert geodiversity", href: NPS_CHIHUAHUAN },
      { label: "Texas Parks & Wildlife — Trans-Pecos habitat", href: TPWD_TRANS_PECOS },
    ],
  },
  "wetlands-and-marshes": {
    fieldNotes: [
      { heading: "Texas wetlands exist far beyond the Gulf Coast", body: "Texas Parks and Wildlife groups state wetlands into forms including deepwater swamps, freshwater marshes, playa lakes, riparian wetlands and saline or brackish marshes. Some hold water year-round; others are seasonal or flood-driven. Hydrology, wetland soils and water-tolerant vegetation are more reliable identifiers than a permanently flooded appearance." },
      { heading: "Coastal marshes connect land and bay", body: "Along the Gulf Coast, salt and brackish marshes tolerate changing salinity and water levels while filtering runoff and providing habitat for fish, shellfish and migratory birds. Inland wetlands serve different roles but share the importance of periodic water. That diversity is why a statewide wetlands trip can range from cypress country to High Plains playas." },
    ],
    sourceLinks: [
      { label: "Texas Parks & Wildlife — Texas wetlands", href: TPWD_WETLANDS },
      { label: "Texas Parks & Wildlife — Gulf Coast Prairies and Marshes", href: TPWD_GULF_MARSHES },
    ],
  },
  "forests": {
    fieldNotes: [
      { heading: "Texas forest is concentrated in the east but not confined there", body: "The Piney Woods contain the state's largest continuous forest region, with pine and pine-hardwood communities extending into neighboring states. Elsewhere, oak-juniper woodland, river-bottom hardwoods, cypress corridors and isolated mountain woodlands create very different forest experiences. Rainfall, elevation, soils and fire history determine where closed canopy can persist." },
      { heading: "Drainage can change the forest faster than latitude", body: "Big Thicket demonstrates how sandy uplands, hardwood bottoms, bayous and wetlands can support different plant communities close together. That lesson applies statewide: a shaded river bottom may look unlike the drier ridge only a short distance away. Forest travel is therefore best planned around both region and local landform." },
    ],
    sourceLinks: [
      { label: "Texas Parks & Wildlife — East Texas Pineywoods", href: TPWD_PINEYWOODS },
      { label: "National Park Service — What is the Big Thicket?", href: NPS_BIG_THICKET },
    ],
  },
  "wildflower-landscapes": {
    fieldNotes: [
      { heading: "A wildflower season is a moving target", body: "Texas roadside blooms respond to species, latitude, soil, moisture and recent weather, so a fixed calendar date cannot guarantee peak color everywhere. TxDOT notes that bluebonnets generally begin earlier in southern Texas and later farther north. Other species overlap and extend the season, making mixed displays more reliable than treating every spring trip as a bluebonnet-only hunt." },
      { heading: "Roadsides are habitat, not parking lots", body: "TxDOT manages native grasses and wildflowers along highway rights of way and delays mowing in many areas to support seed production. Travelers should use legal parking and avoid driving onto or trampling flower stands. The safest photographs are made from designated pullouts, parks and public land where stopping does not damage the plants or create a roadside hazard." },
    ],
    sourceLinks: [
      { label: "Texas Department of Transportation — Wildflower program", href: TXDOT_WILDFLOWERS },
      { label: "Texas Department of Transportation — Planting bluebonnets", href: TXDOT_BLUEBONNETS },
    ],
  },
};

export const enrichedTexasLandscapeProfiles: EnrichedLandscapeRecord[] = texasLandscapes.map((landscape) => {
  const enhancement = enhancements[landscape.slug];
  if (!enhancement) return { ...landscape, fieldNotes: [], sourceLinks: [] };
  return { ...landscape, ...enhancement };
});

export function getEnrichedTexasLandscapeProfile(slug: string) {
  return enrichedTexasLandscapeProfiles.find((landscape) => landscape.slug === slug);
}
