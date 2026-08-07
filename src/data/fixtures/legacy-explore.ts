import type { CategorySlug, Destination, TexasRegion } from "../types";
import { DESTINATION_FALLBACK_IMAGE } from "../explore-remote";

const BRAND = "texasdefined" as const;

const regionMap: Record<string, TexasRegion> = {
  "East Texas": "piney-woods",
  "Hill Country": "hill-country",
  "Central Texas": "prairies-lakes",
  "North Texas": "prairies-lakes",
  "South Texas": "south-texas",
  "West Texas": "big-bend",
  Panhandle: "panhandle",
  "Gulf Coast": "gulf-coast",
};

const records = `
big-bend-national-park|Big Bend National Park|national_park|Big Bend National Park|Brewster|West Texas|29.2498|-103.2502|Remote desert, mountain, and river country along the Rio Grande.|https://www.nps.gov/bibe/index.htm|hiking,camping,scenic,wildlife,stargazing
guadalupe-mountains-national-park|Guadalupe Mountains National Park|national_park|Salt Flat|Culberson|West Texas|31.923|-104.866|High desert trails and the highest natural point in Texas.|https://www.nps.gov/gumo/index.htm|hiking,camping,scenic,wildlife
padre-island-national-seashore|Padre Island National Seashore|national_seashore|Corpus Christi|Kleberg|Gulf Coast|27.047|-97.376|Protected barrier-island beaches, dunes, wildlife, fishing, and primitive camping.|https://www.nps.gov/pais/index.htm|camping,fishing,birding,swimming,wildlife
san-antonio-missions-national-historical-park|San Antonio Missions National Historical Park|historic_site|San Antonio|Bexar|South Texas|29.361|-98.479|Four Spanish colonial missions connected by trails along the San Antonio River.|https://www.nps.gov/saan/index.htm|history,walking,biking,scenic
enchanted-rock-state-natural-area|Enchanted Rock State Natural Area|park|Fredericksburg|Gillespie|Hill Country|30.506|-98.819|A massive pink granite dome with summit hiking, rock climbing, primitive camping, sweeping Hill Country views, and internationally recognized dark skies.|https://tpwd.texas.gov/state-parks/enchanted-rock|hiking,camping,climbing,scenic,stargazing,birding
garner-state-park|Garner State Park|park|Concan|Uvalde|Hill Country|29.586|-99.743|Frio River swimming, limestone hills, trails, cabins, and camping.|https://tpwd.texas.gov/state-parks/garner|swimming,paddling,hiking,camping,family
palo-duro-canyon-state-park|Palo Duro Canyon State Park|park|Canyon|Randall|Panhandle|34.984|-101.702|The second-largest canyon system in the United States, with scenic drives, hiking and biking trails, horseback riding, camping, cabins, wildlife, and the outdoor TEXAS musical.|https://tpwd.texas.gov/state-parks/palo-duro-canyon|hiking,biking,camping,scenic,wildlife,horseback riding,history
mustang-island-state-park|Mustang Island State Park|beach|Port Aransas|Nueces|Gulf Coast|27.672|-97.176|Five miles of Gulf shoreline with beach camping, swimming, fishing, paddling trails, birding, and coastal wildlife near Port Aransas.|https://tpwd.texas.gov/state-parks/mustang-island|swimming,fishing,paddling,camping,birding,wildlife,beachcombing
dinosaur-valley-state-park|Dinosaur Valley State Park|park|Glen Rose|Somervell|North Texas|32.246|-97.813|World-famous dinosaur tracks in the Paluxy River, with river swimming, hiking, camping, horseback riding, and family exploration.|https://tpwd.texas.gov/state-parks/dinosaur-valley|hiking,camping,swimming,family,wildlife,horseback riding,paddling
caprock-canyons-state-park|Caprock Canyons State Park & Trailway|park|Quitaque|Briscoe|Panhandle|34.411|-101.064|Red-rock canyons, rugged trails, Lake Theo, camping, and close-up views of the official Texas State Bison Herd.|https://tpwd.texas.gov/state-parks/caprock-canyons|hiking,biking,camping,wildlife,scenic,horseback riding,fishing
hamilton-pool-preserve|Hamilton Pool Preserve|spring|Dripping Springs|Travis|Hill Country|30.342|-98.126|A protected Hill Country grotto, waterfall, and spring-fed natural pool.|https://parks.traviscountytx.gov/parks/hamilton-pool-preserve|hiking,scenic,wildlife,family
balmorhea-state-park|Balmorhea State Park|spring|Toyahvale|Reeves|West Texas|30.944|-103.786|A spring-fed desert pool supplied by San Solomon Springs with swimming, camping, and historic CCC structures.|https://tpwd.texas.gov/state-parks/balmorhea|swimming,camping,wildlife,family
brazos-bend-state-park|Brazos Bend State Park|park|Needville|Fort Bend|Gulf Coast|29.371|-95.631|Wetlands, lakes, alligator habitat, wooded trails, camping, birding, and public astronomy programs southwest of Houston.|https://tpwd.texas.gov/state-parks/brazos-bend|hiking,camping,birding,wildlife,stargazing,biking,fishing
colorado-bend-state-park|Colorado Bend State Park|park|Bend|San Saba|Hill Country|31.022|-98.442|Rugged Hill Country wilderness with Gorman Falls, Colorado River access, cave tours, mountain biking, fishing, and primitive camping.|https://tpwd.texas.gov/state-parks/colorado-bend|hiking,camping,fishing,paddling,caving,biking,wildlife
davis-mountains-state-park|Davis Mountains State Park|park|Fort Davis|Jeff Davis|West Texas|30.599|-103.925|High-desert mountain scenery, Skyline Drive overlooks, extensive trails, camping, birding, and the historic Indian Lodge.|https://tpwd.texas.gov/state-parks/davis-mountains|hiking,camping,birding,scenic,wildlife,biking
devils-river-state-natural-area|Devils River State Natural Area|river|Del Rio|Val Verde|West Texas|29.926|-100.983|A remote and exceptionally clear spring-fed river landscape for paddling, fishing, hiking, wildlife viewing, and primitive camping.|https://tpwd.texas.gov/state-parks/devils-river|paddling,fishing,hiking,camping,wildlife,stargazing
fort-davis-national-historic-site|Fort Davis National Historic Site|historic_site|Fort Davis|Jeff Davis|West Texas|30.599|-103.894|A preserved frontier military post beneath the Davis Mountains.|https://www.nps.gov/foda/index.htm|history,walking,family
galveston-island-state-park|Galveston Island State Park|beach|Galveston|Galveston|Gulf Coast|29.198|-94.956|Beach and bay access with camping, paddling, fishing, and birding.|https://tpwd.texas.gov/state-parks/galveston-island|swimming,fishing,paddling,camping,birding
goliad-state-park|Goliad State Park & Historic Site|historic_site|Goliad|Goliad|South Texas|28.656|-97.382|Mission history, riverside camping, paddling, and South Texas heritage.|https://tpwd.texas.gov/state-parks/goliad|history,camping,paddling,fishing,family
government-canyon-state-natural-area|Government Canyon State Natural Area|natural_area|San Antonio|Bexar|South Texas|29.549|-98.765|Hill Country wilderness, dinosaur tracks, and extensive trails near San Antonio.|https://tpwd.texas.gov/state-parks/government-canyon|hiking,biking,camping,wildlife,family
guadalupe-river-state-park|Guadalupe River State Park|river|Spring Branch|Comal|Hill Country|29.854|-98.504|River swimming, paddling, camping, and wooded Hill Country trails.|https://tpwd.texas.gov/state-parks/guadalupe-river|swimming,paddling,hiking,camping,fishing
hueco-tanks-state-park|Hueco Tanks State Park & Historic Site|historic_site|El Paso|El Paso|West Texas|31.917|-106.041|Rock formations, Indigenous pictographs, guided access, climbing, and desert history.|https://tpwd.texas.gov/state-parks/hueco-tanks|history,hiking,climbing,birding,scenic
lockhart-state-park|Lockhart State Park|park|Lockhart|Caldwell|Central Texas|29.852|-97.697|A compact CCC-era park with a nine-hole golf course, seasonal swimming pool, trails, camping, fishing, and creek scenery.|https://tpwd.texas.gov/state-parks/lockhart|golf,swimming,hiking,camping,fishing,history,family
longhorn-cavern-state-park|Longhorn Cavern State Park|cavern|Burnet|Burnet|Hill Country|30.684|-98.35|A historic Hill Country cavern with guided walking and wild-cave tours, CCC architecture, hiking, and scenic overlooks.|https://tpwd.texas.gov/state-parks/longhorn-cavern|caving,guided tours,hiking,history,scenic,family
lost-maples-state-natural-area|Lost Maples State Natural Area|natural_area|Vanderpool|Bandera|Hill Country|29.807|-99.611|Limestone canyons, clear streams, rugged trails, primitive camping, birding, and celebrated fall foliage from isolated bigtooth maples.|https://tpwd.texas.gov/state-parks/lost-maples|hiking,camping,birding,scenic,wildlife,stargazing
lyndon-b-johnson-state-park-historic-site|Lyndon B. Johnson State Park & Historic Site|historic_site|Stonewall|Gillespie|Hill Country|30.235|-98.626|A day-use historic park interpreting President Johnson's Hill Country heritage with living-history facilities, trails, exhibits, and river scenery.|https://tpwd.texas.gov/state-parks/lyndon-b-johnson|history,walking,driving,family,wildlife,scenic
mckinney-falls-state-park|McKinney Falls State Park|waterfall|Austin|Travis|Central Texas|30.183|-97.722|Upper and Lower Falls on Onion Creek, swimming holes, hiking and biking trails, camping, fishing, and Texas history within Austin.|https://tpwd.texas.gov/state-parks/mckinney-falls|hiking,biking,swimming,camping,fishing,history
mission-tejas-state-park|Mission Tejas State Park|historic_site|Grapeland|Houston|East Texas|31.532|-95.232|East Texas history centered on a reconstructed Spanish mission and the Rice Family Log Home, with wooded trails, fishing, and camping.|https://tpwd.texas.gov/state-parks/mission-tejas|history,hiking,camping,fishing,birding,family
monahans-sandhills-state-park|Monahans Sandhills State Park|park|Monahans|Ward|West Texas|31.619|-102.812|Wind-shaped dunes offer sand sliding, hiking, camping, wildlife viewing, horseback riding, and expansive West Texas skies.|https://tpwd.texas.gov/state-parks/monahans-sandhills|sand sliding,camping,hiking,scenic,family,wildlife,horseback riding
mother-neff-state-park|Mother Neff State Park|park|Moody|Coryell|Central Texas|31.325|-97.469|Texas's oldest state park features prairie and woodland trails, a limestone rock tower, CCC history, camping, cabins, and family recreation.|https://tpwd.texas.gov/state-parks/mother-neff|hiking,camping,history,birding,family,wildlife
old-tunnel-state-park|Old Tunnel State Park|natural_area|Fredericksburg|Kendall|Hill Country|30.101|-98.821|A former railroad tunnel that shelters a major Mexican free-tailed bat colony, with seasonal evening bat viewing, birding, and short nature trails.|https://tpwd.texas.gov/state-parks/old-tunnel|wildlife,birding,bat viewing,hiking,scenic,family
palmetto-state-park|Palmetto State Park|park|Gonzales|Gonzales|Central Texas|29.588|-97.585|A lush, tropical-feeling park along the San Marcos River with dwarf palmettos, paddling, fishing, hiking, camping, and CCC history.|https://tpwd.texas.gov/state-parks/palmetto|hiking,paddling,fishing,camping,birding,wildlife,history
pedernales-falls-state-park|Pedernales Falls State Park|waterfall|Johnson City|Blanco|Hill Country|30.308|-98.257|Dramatic limestone falls and pools on the Pedernales River, with hiking, mountain biking, swimming areas, fishing, paddling, wildlife, and camping.|https://tpwd.texas.gov/state-parks/pedernales-falls|hiking,camping,swimming,fishing,wildlife,paddling,biking,scenic
powderhorn-state-park|Powderhorn State Park|natural_area|Port O'Connor|Calhoun|Gulf Coast|28.47|-96.55|A protected coastal landscape of prairie, wetlands, and oak mottes supporting wildlife, birding, conservation, and planned public recreation.|https://tpwd.texas.gov/state-parks/powderhorn|wildlife,birding,conservation,nature study,scenic
resaca-de-la-palma-state-park|Resaca de la Palma State Park|wildlife_refuge|Brownsville|Cameron|South Texas|25.995|-97.582|A World Birding Center site protecting resaca wetlands and subtropical woodland, with exceptional birding, wildlife viewing, walking, biking, and tram access.|https://tpwd.texas.gov/state-parks/resaca-de-la-palma|birding,wildlife,walking,biking,nature study,family
san-angelo-state-park|San Angelo State Park|park|San Angelo|Tom Green|West Texas|31.462|-100.507|A broad West Texas park on O.C. Fisher Reservoir with hiking, mountain biking, horseback riding, camping, fishing, wildlife, and the official Texas State Longhorn Herd.|https://tpwd.texas.gov/state-parks/san-angelo|hiking,biking,horseback riding,camping,fishing,birding,wildlife
sea-rim-state-park|Sea Rim State Park|beach|Sabine Pass|Jefferson|Gulf Coast|29.676|-94.043|Gulf beaches meet coastal marshes at this remote park, with beach camping, paddling trails, fishing, swimming, birding, wildlife, and a marsh boardwalk.|https://tpwd.texas.gov/state-parks/sea-rim|swimming,paddling,fishing,camping,birding,wildlife,beachcombing
seminole-canyon-state-park|Seminole Canyon State Park & Historic Site|historic_site|Comstock|Val Verde|West Texas|29.701|-101.317|Lower Pecos canyon landscapes with hiking, camping, scenic overlooks, and guided access to ancient rock art in Fate Bell Shelter.|https://tpwd.texas.gov/state-parks/seminole-canyon|history,hiking,camping,scenic,birding,guided tours,rock art
sheldon-lake-state-park|Sheldon Lake State Park & Environmental Learning Center|wildlife_refuge|Houston|Harris|Gulf Coast|29.859|-95.165|A restored wetland and prairie park on Houston's northeast side with fishing, wildlife viewing, birding, environmental education, trails, and an observation tower.|https://tpwd.texas.gov/state-parks/sheldon-lake|fishing,birding,wildlife,walking,nature study,family
south-llano-river-state-park|South Llano River State Park|river|Junction|Kimble|Hill Country|30.446|-99.805|A spring-fed Hill Country river park with swimming, paddling, fishing, hiking, birding, wildlife viewing, camping, and dark-sky programs.|https://tpwd.texas.gov/state-parks/south-llano-river|paddling,swimming,hiking,camping,birding,fishing,wildlife,stargazing
stephen-f-austin-state-park|Stephen F. Austin State Park|park|San Felipe|Austin|Gulf Coast|29.807|-96.108|A wooded Brazos River park near the historic San Felipe de Austin site with hiking, biking, camping, birding, golf, and family recreation.|https://tpwd.texas.gov/state-parks/stephen-f-austin|hiking,biking,camping,birding,golf,wildlife,family
village-creek-state-park|Village Creek State Park|river|Lumberton|Hardin|East Texas|30.252|-94.18|A Big Thicket-area park along Village Creek with paddling, swimming, fishing, hiking, birding, cabins, and camping beneath forested wetlands.|https://tpwd.texas.gov/state-parks/village-creek|paddling,swimming,fishing,hiking,camping,birding,wildlife
waco-mammoth-national-monument|Waco Mammoth National Monument|historic_site|Waco|McLennan|Central Texas|31.607|-97.175|An indoor fossil site preserving a nursery herd of Columbian mammoths.|https://www.nps.gov/waco/index.htm|history,family,walking
lyndon-b-johnson-national-historical-park|Lyndon B. Johnson National Historical Park|historic_site|Johnson City|Blanco|Hill Country|30.241|-98.625|Presidential history across Johnson City and the LBJ Ranch.|https://www.nps.gov/lyjo/index.htm|history,driving,walking,family
alibates-flint-quarries-national-monument|Alibates Flint Quarries National Monument|historic_site|Fritch|Potter|Panhandle|35.581|-101.706|Ancient flint quarry landscapes interpreted through guided tours.|https://www.nps.gov/alfl/index.htm|history,hiking,scenic,family
chamizal-national-memorial|Chamizal National Memorial|historic_site|El Paso|El Paso|West Texas|31.768|-106.454|A cultural and historic site interpreting the peaceful settlement of a border dispute.|https://www.nps.gov/cham/index.htm|history,walking,arts,family
the-alamo|The Alamo|historic_site|San Antonio|Bexar|South Texas|29.426|-98.486|A central Texas Revolution landmark and museum in downtown San Antonio.|https://www.thealamo.org/|history,walking,family
texas-state-capitol|Texas State Capitol|historic_site|Austin|Travis|Central Texas|30.275|-97.74|The historic seat of Texas government with public grounds, tours, and exhibits.|https://tspb.texas.gov/plan/tours/tours.html|history,walking,architecture,family
san-jacinto-battleground|San Jacinto Battleground State Historic Site|historic_site|La Porte|Harris|Gulf Coast|29.75|-95.08|The battlefield where Texas secured independence, marked by the San Jacinto Monument.|https://tpwd.texas.gov/state-parks/san-jacinto-battleground|history,walking,family,scenic
battleship-texas|Battleship Texas|historic_site|Galveston|Galveston|Gulf Coast|29.307|-94.793|A preserved early twentieth-century battleship and major Texas naval landmark.|https://battleshiptexas.org/|history,family,walking
washington-on-the-brazos|Washington-on-the-Brazos State Historic Site|historic_site|Washington|Washington|Central Texas|30.325|-96.153|The site where delegates declared Texas independence in 1836.|https://thc.texas.gov/historic-sites/washington-brazos-state-historic-site|history,walking,family
goose-island-state-park|Goose Island State Park|beach|Rockport|Aransas|Gulf Coast|28.135|-96.986|Bayfront camping, fishing, birding, and the celebrated Big Tree.|https://tpwd.texas.gov/state-parks/goose-island|fishing,camping,birding,wildlife,family
copper-breaks-state-park|Copper Breaks State Park|park|Quanah|Hardeman|Panhandle|34.112|-99.751|Rugged red breaks, prairie, Lake Copper Breaks, hiking, fishing, camping, and internationally recognized dark skies.|https://tpwd.texas.gov/state-parks/copper-breaks|hiking,camping,stargazing,wildlife,fishing,paddling,horseback riding
bentsen-rio-grande-valley-state-park|Bentsen-Rio Grande Valley State Park|wildlife_refuge|Mission|Hidalgo|South Texas|26.186|-98.381|A premier Lower Rio Grande Valley birding destination and World Birding Center site.|https://tpwd.texas.gov/state-parks/bentsen-rio-grande-valley|birding,wildlife,walking,biking,family
abilene-state-park|Abilene State Park|park|Tuscola|Taylor|West Texas|32.240731|-99.879139|Shaded Elm Creek recreation with historic CCC structures, trails, camping, fishing, and a seasonal swimming pool.|https://tpwd.texas.gov/state-parks/abilene|hiking,camping,fishing,birding,biking,swimming
albert-bessie-kronkosky-state-natural-area|Albert & Bessie Kronkosky State Natural Area|natural_area|Boerne|Bandera|Hill Country|29.77|-98.82|A protected Hill Country landscape preserving springs, canyons, grasslands, and diverse wildlife while public-use planning continues.|https://tpwd.texas.gov/state-parks/albert-bessie-kronkosky|wildlife,conservation,nature study,scenic
bastrop-state-park|Bastrop State Park|park|Bastrop|Bastrop|Central Texas|30.111|-97.286|Lost Pines scenery, CCC architecture, trails, camping, cabins, and a scenic drive connecting to Buescher State Park.|https://tpwd.texas.gov/state-parks/bastrop|hiking,camping,biking,swimming,golf,wildlife
big-bend-ranch-state-park|Big Bend Ranch State Park|park|Presidio|Presidio|West Texas|29.47|-103.92|Texas's largest state park, with rugged Chihuahuan Desert mountains, Rio Grande access, primitive camping, and remote backcountry trails.|https://tpwd.texas.gov/state-parks/big-bend-ranch|hiking,camping,biking,paddling,horseback riding,scenic,wildlife
big-spring-state-park|Big Spring State Park|park|Big Spring|Howard|West Texas|32.232288|-101.490728|A day-use park atop Scenic Mountain with panoramic views, CCC-built structures, picnicking, playgrounds, and a loop road.|https://tpwd.texas.gov/state-parks/big-spring|scenic,walking,biking,picnicking,history,family
blanco-state-park|Blanco State Park|river|Blanco|Blanco|Hill Country|30.097|-98.421|A compact Hill Country park along the Blanco River with swimming, fishing, paddling, camping, and riverside picnicking.|https://tpwd.texas.gov/state-parks/blanco|swimming,fishing,paddling,camping,picnicking,family
buescher-state-park|Buescher State Park|park|Smithville|Bastrop|Central Texas|30.039|-97.158|A quiet Lost Pines park with a small lake, wooded trails, camping, cabins, fishing, paddling, and a scenic road to Bastrop State Park.|https://tpwd.texas.gov/state-parks/buescher|hiking,biking,camping,fishing,paddling,wildlife,scenic
franklin-mountains-state-park|Franklin Mountains State Park|park|El Paso|El Paso|West Texas|31.91|-106.49|A rugged mountain wilderness within El Paso offering hiking, mountain biking, rock climbing, camping, desert wildlife, and panoramic borderland views.|https://tpwd.texas.gov/state-parks/franklin-mountains|hiking,biking,climbing,camping,scenic,wildlife
kickapoo-cavern-state-park|Kickapoo Cavern State Park|cavern|Brackettville|Kinney|West Texas|29.61|-100.45|A remote park with guided cavern tours, seasonal bat flights, rugged trails, birding, mountain biking, and primitive camping.|https://tpwd.texas.gov/state-parks/kickapoo-cavern|caving,hiking,camping,birding,wildlife,biking,guided tours
barton-springs-pool|Barton Springs Pool|spring|Austin|Travis|Central Texas|30.2638|-97.7713|A three-acre, spring-fed public swimming pool in Zilker Park supplied by the Barton Springs system and known for year-round cool water.|https://www.austintexas.gov/services/visit-barton-springs-pool|swimming,ecology,wildlife
san-marcos-springs-spring-lake|San Marcos Springs at Spring Lake|spring|San Marcos|Hays|Central Texas|29.8937|-97.9304|A large aquifer-driven spring system forming Spring Lake and the headwaters of the San Marcos River, interpreted through public ecological tours and programs.|https://www.meadowscenter.txst.edu/explorespringlake.html|glass-bottom boats,guided snorkeling,paddling,wildlife
jacobs-well-natural-area|Jacob's Well Natural Area|spring|Wimberley|Hays|Hill Country|30.0341|-98.1263|A Hill Country artesian spring and karst natural area at the headwaters of Cypress Creek, protected for water, habitat, and public education.|https://www.hayscountytx.gov/449/Things-to-Do|hiking,guided nature tours,birding,scenic photography
hancock-springs-park|Hancock Springs Park|spring|Lampasas|Lampasas|Hill Country|31.0516|-98.1817|A historic municipal park centered on a free-flowing spring-fed swimming pool and shaded community recreation grounds in Lampasas.|https://lampasas.org/367/Hancock-Springs-Park|swimming,picnicking,family
blue-hole-regional-park|Blue Hole Regional Park|spring|Wimberley|Hays|Hill Country|30.002089|-98.087|A municipal Hill Country park centered on a clear Cypress Creek swimming area shaded by mature bald cypress trees.|https://www.cityofwimberley.com/facilities/facility/details/Blue-Hole-Regional-Park-2|swimming,hiking,biking,picnicking,nature
krause-springs|Krause Springs|spring|Spicewood|Burnet|Hill Country|30.4805|-98.145889|A privately owned Hill Country swimming and camping destination where dozens of natural springs feed landscaped and natural pools above Lake Travis.|https://www.krausesprings.net/|swimming,camping,picnicking,nature photography
`.trim().split("\n");

function categoryFor(type: string): CategorySlug {
  if (["national_park", "national_seashore"].includes(type)) return "national-parks";
  if (["spring"].includes(type)) return "major-springs";
  if (["cavern", "cave"].includes(type)) return "caverns";
  if (["beach", "island", "coast"].includes(type)) return "beaches-coast";
  if (["historic_site", "museum", "mission", "battlefield", "monument"].includes(type)) return "historic-sites";
  if (["river", "waterfall"].includes(type)) return "lakes-rivers";
  if (["wildlife_refuge", "natural_area"].includes(type)) return "outdoors";
  return "state-parks";
}

function titleCase(value: string) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export const legacyExploreDestinations: Destination[] = records.map((record) => {
  const [slug, name, type, town, county, regionName, lat, lng, summary, officialUrl, activities] = record.split("|");
  const highlights = activities.split(",").map((item) => item.trim()).filter(Boolean).map(titleCase);
  return {
    id: `legacy-explore-${slug}`,
    brandId: BRAND,
    slug,
    name,
    summary,
    category: categoryFor(type),
    region: regionMap[regionName] ?? "prairies-lakes",
    nearestTown: town,
    coordinates: { lat: Number(lat), lng: Number(lng) },
    hero: { src: DESTINATION_FALLBACK_IMAGE, alt: `${name} in Texas`, width: 1600, height: 1000 },
    bestSeason: "Check current conditions before visiting",
    entryNote: "Confirm current hours, fees, reservations, closures, and access with the official source.",
    highlights,
    body: [summary],
    officialUrl,
    county,
  };
});
