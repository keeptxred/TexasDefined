/**
 * Additional, individually sourced county visitor places.
 *
 * These are NOT rankings and DO NOT generate authority pages. Existing county
 * museum, state park, lake and coastal sections already serve those categories.
 * Add only destinations that warrant a county-guide mention, with a specific
 * official municipal, operator, park-agency or recognized heritage-tourism source.
 * An outbound source is not proof of open hours, admission or tour access.
 */
export type CountyVisitorPlace = {
  county: string;
  name: string;
  category: 'Art & architecture' | 'Arts & culture' | 'History & heritage' | 'Parks & recreation';
  description: string;
  sourceUrl: string;
  /** Exact existing Texas Defined guide, when checked and related; never invent a path. */
  relatedGuideHref?: string;
};

export const COUNTY_VISITOR_PLACES: readonly CountyVisitorPlace[] = [
  {
    "county": "anderson",
    "name": "Davey Dogwood Park",
    "category": "Parks & recreation",
    "description": "Woodland trails and seasonal dogwood blooms around Palestine; check spring road and trail conditions.",
    "sourceUrl": "https://texastimetravel.com/cities/palestine/"
  },
  {
    "county": "anderson",
    "name": "Palestine Historic District Walking Tour",
    "category": "History & heritage",
    "description": "Self-guided streets and historic architectural districts in Palestine; maps are available from local visitor information.",
    "sourceUrl": "https://texastimetravel.com/cities/palestine/"
  },
  {
    "county": "anderson",
    "name": "The Texas Theatre in Palestine",
    "category": "Arts & culture",
    "description": "Restored 1930 movie palace now used by Palestine Community Theatre for local live stage performances.",
    "sourceUrl": "https://texastheatrepalestine.com/"
  },
  {
    "county": "andrews",
    "name": "Andrews County Veterans Memorial",
    "category": "History & heritage",
    "description": "Public memorial recognizing military service; a short cultural-history stop.",
    "sourceUrl": "https://texastimetravel.com/regions/pecos-trail/heritage-sites-and-attractions/"
  },
  {
    "county": "angelina",
    "name": "Ellen Trout Zoo",
    "category": "Parks & recreation",
    "description": "Lufkin family zoo with wildlife exhibits and walking paths.",
    "sourceUrl": "https://texastimetravel.com/cities/lufkin/"
  },
  {
    "county": "aransas",
    "name": "Rockport Center for the Arts",
    "category": "Arts & culture",
    "description": "Downtown Rockport nonprofit arts campus with rotating gallery exhibitions and arts programming; gallery admission is free, but event schedules vary.",
    "sourceUrl": "https://www.rockportartcenter.com/contact"
  },
  {
    "county": "archer",
    "name": "Burkett Park",
    "category": "Parks & recreation",
    "description": "Archer City public recreation stop with playgrounds, walking areas, picnic shade and seasonal swimming; consult the official visitor center.",
    "sourceUrl": "https://visitarchercity.com/"
  },
  {
    "county": "archer",
    "name": "Royal Theater in Archer City",
    "category": "Arts & culture",
    "description": "Restored performance theater associated with The Last Picture Show; plan around scheduled concerts or theatrical productions.",
    "sourceUrl": "https://gov.texas.gov/film/trail/the-royal-theater"
  },
  {
    "county": "armstrong",
    "name": "Gem Theatre in Claude",
    "category": "Arts & culture",
    "description": "Restored historic theater associated with the county museum; check dates for performances.",
    "sourceUrl": "https://texastimetravel.com/directory/gem-theatre/"
  },
  {
    "county": "atascosa",
    "name": "Pleasanton Atascosa River Park",
    "category": "Parks & recreation",
    "description": "Municipal riverside park for outdoor time and lawful fishing in the Atascosa River; city rules provide flood-related closure provisions.",
    "sourceUrl": "https://codelibrary.amlegal.com/codes/pleasanton/latest/pleasanton_tx/0-0-0-8093"
  },
  {
    "county": "austin",
    "name": "Sealy Main Street Historic Walking Tour",
    "category": "History & heritage",
    "description": "City-supported self-guided walk past Sealy's historic commercial storefronts and railroad-era buildings; exterior viewing does not guarantee access to private interiors.",
    "sourceUrl": "https://mainstreet.sealyedc.com/historic/"
  },
  {
    "county": "austin",
    "name": "Sealy Public Mural Walk",
    "category": "Art & architecture",
    "description": "Walkable downtown mural route on Sealy's side streets and alleyways; the municipal visitors bureau recommends it as a short independent art stop.",
    "sourceUrl": "https://discoversealy.com/groups-2/"
  },
  {
    "county": "bailey",
    "name": "Muleshoe National Wildlife Refuge",
    "category": "Parks & recreation",
    "description": "Federally managed refuge with sandhill crane viewing, a nature trail, overlooks and primitive camping; the headquarters building itself is closed to public entry.",
    "sourceUrl": "https://www.fws.gov/refuge/muleshoe/visit-us"
  },
  {
    "county": "bailey",
    "name": "Ol’ Pete Mule Memorial Statue",
    "category": "Art & architecture",
    "description": "Muleshoe's public tribute to the working mule and its military role; a brief roadside photo stop.",
    "sourceUrl": "https://texastimetravel.com/cities/muleshoe/"
  },
  {
    "county": "bandera",
    "name": "Bandera City Park",
    "category": "Parks & recreation",
    "description": "Medina River day-use park in downtown Bandera with fishing, picnic areas and swimming access when conditions allow; weekend and holiday entrance fees can apply.",
    "sourceUrl": "https://www.banderatx.gov/park"
  },
  {
    "county": "bastrop",
    "name": "Bastrop Opera House",
    "category": "Arts & culture",
    "description": "Historic live theater producing plays and musicals in downtown Bastrop; consult upcoming shows.",
    "sourceUrl": "https://www.bastropoperahouse.org/shows/"
  },
  {
    "county": "baylor",
    "name": "Seymour Memorial City Park",
    "category": "Parks & recreation",
    "description": "Seymour municipal park with a walking track, disc golf, pavilions and seasonal swimming; family outing near the town center.",
    "sourceUrl": "https://cityofseymour.org/directory/seymour-memorial-city-park/"
  },
  {
    "county": "baylor",
    "name": "Seymour Sound Garden",
    "category": "Art & architecture",
    "description": "Free-to-experience outdoor musical-instrument installation in Seymour, promoted by the city as an inclusive public art stop.",
    "sourceUrl": "https://cityofseymour.org/visit-seymour-texas/"
  },
  {
    "county": "baylor",
    "name": "Seymour Speedway Bike and Skate Park",
    "category": "Parks & recreation",
    "description": "Town bike and skateboard facility with a dirt course and skate area; confirm conditions before riding.",
    "sourceUrl": "https://cityofseymour.org/visit-seymour-texas/"
  },
  {
    "county": "bee",
    "name": "Bees of Bee County Public Art Trail",
    "category": "Art & architecture",
    "description": "A local public-art route celebrating Bee County through downtown installations.",
    "sourceUrl": "https://www.bamtexas.org/visit"
  },
  {
    "county": "bee",
    "name": "Historic Downtown Beeville",
    "category": "History & heritage",
    "description": "Historic streets and locally significant downtown architecture.",
    "sourceUrl": "https://www.experiencebeecounty.org/about-bee-county/"
  },
  {
    "county": "bell",
    "name": "Miller Springs Nature Center",
    "category": "Parks & recreation",
    "description": "Belton–Temple natural area near Lake Belton Dam with hiking, biking, birding and dramatic limestone terrain; day-use trails and rules are city-managed.",
    "sourceUrl": "https://www.beltontexas.gov/departments/parks_and_recreation/miller_springs_nature_center.php"
  },
  {
    "county": "bexar",
    "name": "San Antonio Missions National Historical Park",
    "category": "History & heritage",
    "description": "National Park Service cultural landscape around Missions Concepción, San José, San Juan and Espada; begin at the Mission San José visitor center.",
    "sourceUrl": "https://www.nps.gov/saan/planyourvisit/visitorcenters.htm"
  },
  {
    "county": "blanco",
    "name": "LBJ National Historical Park — Johnson City",
    "category": "History & heritage",
    "description": "National Park Service visitor center, boyhood home and Johnson Settlement in Johnson City; a distinct public visitor unit from the ranch near Stonewall.",
    "sourceUrl": "https://www.nps.gov/lyjo/planyourvisit/index.htm"
  },
  {
    "county": "borden",
    "name": "Old Borden County Jail",
    "category": "History & heritage",
    "description": "The surviving county jail on Gail's courthouse square. View the historic exterior; do not assume interior tours.",
    "sourceUrl": "https://texastimetravel.com/regions/plains-trail/heritage-sites-and-attractions/"
  },
  {
    "county": "bosque",
    "name": "Bosque Arts Center",
    "category": "Arts & culture",
    "description": "Clifton's galleries, theater, exhibitions, and cultural programming.",
    "sourceUrl": "https://visitclifton.org/things-to-do/attractions/bosque-arts-center/"
  },
  {
    "county": "bosque",
    "name": "CLIFTEX Theatre",
    "category": "Arts & culture",
    "description": "Restored historic movie theater in downtown Clifton; check the current program.",
    "sourceUrl": "https://visitclifton.org/things-to-do/attractions/cliftex-theatre/"
  },
  {
    "county": "bosque",
    "name": "Heritage Plaza",
    "category": "Art & architecture",
    "description": "Public bronze sculpture and gathering place in downtown Clifton.",
    "sourceUrl": "https://visitclifton.org/things-to-do/attractions/heritage-plaza/"
  },
  {
    "county": "bosque",
    "name": "Norse Historic District",
    "category": "History & heritage",
    "description": "A heritage landscape associated with Norwegian settlement; respect private properties and church access.",
    "sourceUrl": "https://visitclifton.org/things-to-do/attractions/norse-historic-district/"
  },
  {
    "county": "bowie",
    "name": "Perot Theatre in Texarkana",
    "category": "Arts & culture",
    "description": "Restored 1924 theater in downtown Texarkana with live music and theatrical productions.",
    "sourceUrl": "https://texastimetravel.com/directory/perot-theatre/"
  },
  {
    "county": "bowie",
    "name": "Photographer's Island at State Line Post Office",
    "category": "Art & architecture",
    "description": "Public photo point at the Texas–Arkansas state line near the shared downtown post office and courthouse.",
    "sourceUrl": "https://texastimetravel.com/cities/texarkana/"
  },
  {
    "county": "bowie",
    "name": "Regional Arts Center of Texarkana",
    "category": "Arts & culture",
    "description": "Restored downtown historic federal building hosting art exhibitions and cultural programs.",
    "sourceUrl": "https://texastimetravel.com/cities/texarkana/"
  },
  {
    "county": "brazoria",
    "name": "Brazoria National Wildlife Refuge",
    "category": "Parks & recreation",
    "description": "Federal coastal wetland birding area with the Big Slough wildlife drive and a visitor discovery area; prepare for sun, insects and wetland conditions.",
    "sourceUrl": "https://www.fws.gov/refuge/brazoria/visit-us"
  },
  {
    "county": "brazoria",
    "name": "San Bernard National Wildlife Refuge",
    "category": "Parks & recreation",
    "description": "Public refuge trails and boardwalks near Brazoria, including Bobcat Woods and wetlands observation areas; check seasonal road and trail notices.",
    "sourceUrl": "https://www.fws.gov/refuge/san-bernard/visit-us"
  },
  {
    "county": "brazoria",
    "name": "Sea Center Texas",
    "category": "Parks & recreation",
    "description": "Texas Parks and Wildlife marine aquarium and fish-hatchery visitor center in Lake Jackson.",
    "sourceUrl": "https://texastimetravel.com/directory/sea-center-texas/"
  },
  {
    "county": "brazos",
    "name": "Lake Walk in Bryan",
    "category": "Parks & recreation",
    "description": "Walkable landscaped community district with public gathering spaces, trails and events near Lake Atlas in Bryan.",
    "sourceUrl": "https://lakewalktx.com/visit/"
  },
  {
    "county": "brazos",
    "name": "Texas A&M Bonfire Memorial",
    "category": "History & heritage",
    "description": "Outdoor campus remembrance site for the twelve people killed in the 1999 Bonfire collapse, with interpretive history walk and optional hosted tours.",
    "sourceUrl": "https://www.tamu.edu/campus-community/traditions/remembrance/bonfire-memorial.html"
  },
  {
    "county": "brewster",
    "name": "Big Bend National Park",
    "category": "Parks & recreation",
    "description": "Major Chihuahuan Desert national park with public trailheads, scenic drives and Panther Junction visitor services; check park alerts, camping reservations and heat conditions.",
    "sourceUrl": "https://www.nps.gov/bibe/planyourvisit/hours.htm"
  },
  {
    "county": "brooks",
    "name": "Don Pedro Jaramillo Shrine",
    "category": "History & heritage",
    "description": "A culturally significant roadside shrine identified by the City of Falfurrias.",
    "sourceUrl": "https://www.falfurrias.us/170/Attractions"
  },
  {
    "county": "brooks",
    "name": "Ed Rachal Memorial Golf Course",
    "category": "Parks & recreation",
    "description": "Falfurrias golf course listed by the city; confirm tee times and facilities.",
    "sourceUrl": "https://www.falfurrias.us/170/Attractions"
  },
  {
    "county": "brooks",
    "name": "Veterans & Fallen Heroes Monument",
    "category": "History & heritage",
    "description": "A local memorial listed in Falfurrias visitor information.",
    "sourceUrl": "https://www.falfurrias.us/170/Attractions"
  },
  {
    "county": "brown",
    "name": "36th Division Memorial Park",
    "category": "History & heritage",
    "description": "Brownwood military-history park commemorating Camp Bowie with military equipment displays and historic interpretation.",
    "sourceUrl": "https://texastimetravel.com/cities/brownwood/"
  },
  {
    "county": "brown",
    "name": "Santa Fe Depot and Harvey House",
    "category": "History & heritage",
    "description": "Restored railroad depot and Harvey House visitor stop interpreting Brownwood's rail history.",
    "sourceUrl": "https://texastimetravel.com/cities/brownwood/"
  },
  {
    "county": "burleson",
    "name": "Caldwell Arts Trail",
    "category": "Art & architecture",
    "description": "Public-facing Caldwell art and heritage walking route reflecting the town's Czech heritage and historic commercial center.",
    "sourceUrl": "https://texastimetravel.com/cities/caldwell/"
  },
  {
    "county": "burnet",
    "name": "Balcones Canyonlands National Wildlife Refuge",
    "category": "Parks & recreation",
    "description": "Hill Country refuge with public visitor areas at Doeskin Ranch and Warbler Vista; choose a designated trailhead rather than the refuge's geographic center.",
    "sourceUrl": "https://www.fws.gov/refuge/balcones-canyonlands/visit-us"
  },
  {
    "county": "caldwell",
    "name": "Dr. Eugene Clark Library in Lockhart",
    "category": "History & heritage",
    "description": "Historic 1899 public library in downtown Lockhart, recognized by Texas Historical Commission architectural documentation; normal library hours apply.",
    "sourceUrl": "https://atlas.thc.texas.gov/Details/5055009763"
  },
  {
    "county": "caldwell",
    "name": "Lockhart Historic Courthouse Square",
    "category": "History & heritage",
    "description": "Explore the public courthouse-square streetscape and surrounding historic center.",
    "sourceUrl": "https://visitlockharttx.org/"
  },
  {
    "county": "calhoun",
    "name": "Six Mile Park",
    "category": "Parks & recreation",
    "description": "Small public Lavaca Bay day-use park with boat launches, a lighted fishing pier, shorebird viewing and sand shoreline.",
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wildlife/wildlife-trails/ctc/calhoun-loop/"
  },
  {
    "county": "callahan",
    "name": "Historic Market Street in Baird",
    "category": "History & heritage",
    "description": "Public downtown antique and architecture walk along Market Street near the restored Texas & Pacific rail depot; shop openings vary.",
    "sourceUrl": "https://www.bairdchamber.com/history-of-baird"
  },
  {
    "county": "cameron",
    "name": "Laguna Madre Nature Trail",
    "category": "Parks & recreation",
    "description": "A South Padre Island birding boardwalk; located in Cameron County, not Willacy.",
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wildlife/wildlife-trails/ltc/south-padre-island-loop"
  },
  {
    "county": "cameron",
    "name": "Palo Alto Battlefield National Historical Park",
    "category": "History & heritage",
    "description": "Brownsville-area 1846 battlefield preserved by the National Park Service with public grounds, walking trails and a separate staffed visitor-center schedule.",
    "sourceUrl": "https://www.nps.gov/paal/planyourvisit/basicinfo.htm"
  },
  {
    "county": "camp",
    "name": "Carroll Shelby Statue in Pittsburg",
    "category": "Art & architecture",
    "description": "Public memorial to the automotive designer and racer from Pittsburg.",
    "sourceUrl": "https://visit.pittsburgtx.gov/guides/one-day-in-pittsburg"
  },
  {
    "county": "camp",
    "name": "Efurd Orchards",
    "category": "Parks & recreation",
    "description": "Pittsburg-area orchard with seasonal fruit picking and farm produce; verify harvest dates and seasonal opening.",
    "sourceUrl": "https://visit.pittsburgtx.gov/guides/one-day-in-pittsburg"
  },
  {
    "county": "camp",
    "name": "Witness Park and Prayer Tower",
    "category": "Parks & recreation",
    "description": "A distinctive Pittsburg landmark included in the city's visitor itinerary.",
    "sourceUrl": "https://visit.pittsburgtx.gov/guides/one-day-in-pittsburg"
  },
  {
    "county": "carson",
    "name": "Groom Giant Cross",
    "category": "History & heritage",
    "description": "Prominent tall cross and outdoor roadside religious landmark in Groom along Interstate 40; respect posted public areas and check current site access.",
    "sourceUrl": "https://www.tshaonline.org/handbook/entries/groom-tx"
  },
  {
    "county": "cass",
    "name": "Linden Historic Post Office Mural",
    "category": "Art & architecture",
    "description": "Victor Arnautoff's 1939 New Deal-era cotton-harvest mural in Linden's post office building; see only during permitted lobby hours.",
    "sourceUrl": "https://texastimetravel.com/cities/linden/"
  },
  {
    "county": "cass",
    "name": "Music City Texas Theater in Linden",
    "category": "Arts & culture",
    "description": "Independent nonprofit live-music venue in Linden presenting scheduled country, blues and regional performances; confirm the calendar and ticket availability.",
    "sourceUrl": "https://www.musiccitytexas.org/"
  },
  {
    "county": "castro",
    "name": "Dimmitt Downtown Historical Murals",
    "category": "Art & architecture",
    "description": "A short downtown heritage and public-art walk.",
    "sourceUrl": "https://texastimetravel.com/cities/dimmitt/"
  },
  {
    "county": "castro",
    "name": "Dimmitt Ozark Trail Obelisk",
    "category": "History & heritage",
    "description": "Roadside marker interpreting an early road-travel corridor; view from lawful public access.",
    "sourceUrl": "https://texastimetravel.com/cities/dimmitt/"
  },
  {
    "county": "chambers",
    "name": "Jocelyn Nungaray National Wildlife Refuge",
    "category": "Parks & recreation",
    "description": "Coastal-marsh refuge near Anahuac with Shoveler Pond wildlife drive, butterfly garden, boardwalks and public birdwatching areas; formerly Anahuac NWR.",
    "sourceUrl": "https://www.fws.gov/refuge/jocelyn-nungaray/visit-us"
  },
  {
    "county": "cherokee",
    "name": "Jim Hogg Park in Rusk",
    "category": "Parks & recreation",
    "description": "Public recreation and heritage park in Rusk associated with Texas Governor James Stephen Hogg; check local park amenities.",
    "sourceUrl": "https://redc.rusktx.org/recreation-and-entertainment/"
  },
  {
    "county": "cherokee",
    "name": "Rusk Footbridge Park",
    "category": "Parks & recreation",
    "description": "Rusk public park featuring a historic elevated footbridge spanning One Eye Creek.",
    "sourceUrl": "https://texastimetravel.com/cities/rusk/"
  },
  {
    "county": "childress",
    "name": "Childress ATV Park",
    "category": "Parks & recreation",
    "description": "Off-road riding area with maintained trails; verify fees and riding rules.",
    "sourceUrl": "https://www.cityofchildress.com/culture-recreation"
  },
  {
    "county": "childress",
    "name": "Childress Fair Park",
    "category": "Parks & recreation",
    "description": "Municipal park with playgrounds, disc golf, trails, picnic areas and rodeo facilities.",
    "sourceUrl": "https://www.cityofchildress.com/culture-recreation"
  },
  {
    "county": "childress",
    "name": "Stoney Ridge Golf Course",
    "category": "Parks & recreation",
    "description": "Childress municipal golf course; contact the operator for tee times.",
    "sourceUrl": "https://www.cityofchildress.com/culture-recreation"
  },
  {
    "county": "coleman",
    "name": "Coleman City Park",
    "category": "Parks & recreation",
    "description": "City public park along Hords Creek with trees, picnic areas, birdwatching and seasonal swimming facilities; verify pool season with the city.",
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wildlife/wildlife-trails/hote/brownwood-loop"
  },
  {
    "county": "collin",
    "name": "Historic Downtown McKinney",
    "category": "History & heritage",
    "description": "Walkable historic square with late nineteenth-century architecture, shopping, art and local food; museum interiors have separate visiting rules.",
    "sourceUrl": "https://www.visitmckinney.com/things-to-do/attractions"
  },
  {
    "county": "collin",
    "name": "McKinney Tiny Doors and Public Art Walk",
    "category": "Art & architecture",
    "description": "Self-guided downtown exploration of miniature doors and public-art murals promoted in the official McKinney visitor directory.",
    "sourceUrl": "https://www.visitmckinney.com/things-to-do/attractions"
  },
  {
    "county": "collingsworth",
    "name": "Collingsworth Pioneer Park",
    "category": "Parks & recreation",
    "description": "Park north of Wellington with picnic and camping areas and local historic interpretation.",
    "sourceUrl": "https://texastimetravel.com/cities/wellington/"
  },
  {
    "county": "collingsworth",
    "name": "Wellington Ritz Theatre",
    "category": "Arts & culture",
    "description": "Restored 1929 theater for movies and live music; check the schedule.",
    "sourceUrl": "https://texastimetravel.com/cities/wellington/"
  },
  {
    "county": "colorado",
    "name": "Attwater Prairie Chicken National Wildlife Refuge",
    "category": "Parks & recreation",
    "description": "Native prairie refuge near Eagle Lake with an auto-tour loop and walking trails; prairie-chicken sightings are not guaranteed.",
    "sourceUrl": "https://www.fws.gov/refuge/attwater-prairie-chicken/visit-us"
  },
  {
    "county": "colorado",
    "name": "Columbus Historic District Walking Tour",
    "category": "History & heritage",
    "description": "Public streets with restored nineteenth-century commercial architecture and courthouse-square history.",
    "sourceUrl": "https://texastimetravel.com/cities/columbus/"
  },
  {
    "county": "colorado",
    "name": "Stafford Opera House",
    "category": "Arts & culture",
    "description": "Columbus historic opera house and dinner-theater venue with scheduled performances.",
    "sourceUrl": "https://texastimetravel.com/directory/stafford-opera-house/"
  },
  {
    "county": "comal",
    "name": "Gruene Hall",
    "category": "Arts & culture",
    "description": "Operating 1878 dance hall in Gruene, hosting live Texas music; some performances are ticketed and age policies can vary by event.",
    "sourceUrl": "https://gruenehall.com/",
    "relatedGuideHref": "/gruene-hall-history"
  },
  {
    "county": "comanche",
    "name": "Fleming Oak",
    "category": "History & heritage",
    "description": "Well-known historic oak in central Comanche associated with local frontier history and legend.",
    "sourceUrl": "https://texastimetravel.com/cities/comanche/"
  },
  {
    "county": "comanche",
    "name": "Old Cora Log Courthouse",
    "category": "History & heritage",
    "description": "Texas' historic log courthouse from the former county seat of Cora, moved to Comanche; view the public grounds.",
    "sourceUrl": "https://texastimetravel.com/cities/comanche/"
  },
  {
    "county": "cooke",
    "name": "Frank Buck Zoo",
    "category": "Parks & recreation",
    "description": "Public zoo in Gainesville with giraffe exhibits and family wildlife experiences; the City of Gainesville provides current visitor information.",
    "sourceUrl": "https://www.gainesville.tx.us/1093/About-Us"
  },
  {
    "county": "cottle",
    "name": "Historic Cottle County Jail Visitor Center",
    "category": "History & heritage",
    "description": "Paducah's restored former two-story jail houses visitor information near the courthouse square; confirm availability before arrival.",
    "sourceUrl": "https://texastimetravel.com/cities/paducah/"
  },
  {
    "county": "crane",
    "name": "Hogan-BP Park",
    "category": "Parks & recreation",
    "description": "Crane municipal park identified in the city’s own photo inventory; check city information for park amenities and current access.",
    "sourceUrl": "https://crane.texas.gov/about-crane-tx/media/"
  },
  {
    "county": "crane",
    "name": "Sixth Street Park Pond",
    "category": "Parks & recreation",
    "description": "Small Crane city-park pond and waterfall public landscape; a short local outdoor stop, not a destination requiring a separate guide.",
    "sourceUrl": "https://crane.texas.gov/about-crane-tx/media/"
  },
  {
    "county": "crockett",
    "name": "Crockett County Interpretive Trail",
    "category": "Parks & recreation",
    "description": "Free outdoor native-plant and water-conservation trail beside the Ozona visitor center, with rain-harvest exhibits and bird and butterfly habitat.",
    "sourceUrl": "https://www.ozona.com/interpretivetrail"
  },
  {
    "county": "crockett",
    "name": "Ozona History on the Square Walking Tour",
    "category": "History & heritage",
    "description": "Chamber-produced self-guided town-square walk past the historic courthouse, monuments, early water-well location and public building exteriors.",
    "sourceUrl": "https://www.ozona.com/history-on-the-square-a-downtown-walking-tour"
  },
  {
    "county": "crosby",
    "name": "Ralls Historic Santa Fe Depot",
    "category": "History & heritage",
    "description": "Historic railway depot exterior in Ralls, a stop on Crosby County heritage and cotton-country drives; interior access is not promised.",
    "sourceUrl": "https://visitcrosbycounty.com/explore/"
  },
  {
    "county": "crosby",
    "name": "Silver Falls Park",
    "category": "Parks & recreation",
    "description": "Roadside park overlooking Blanco Canyon east of Crosbyton with scenery and picnic areas.",
    "sourceUrl": "https://visitcrosbycounty.com/stories/silver-falls-guide/"
  },
  {
    "county": "culberson",
    "name": "Guadalupe Mountains National Park — Pine Springs",
    "category": "Parks & recreation",
    "description": "National park mountain hiking and camping based at the Pine Springs visitor hub in Culberson County; trail difficulty, fees and day-use rules vary.",
    "sourceUrl": "https://www.nps.gov/gumo/planyourvisit/basicinfo.htm"
  },
  {
    "county": "dallam",
    "name": "Dallam and Hartley Counties Veterans Memorial Park",
    "category": "History & heritage",
    "description": "Dalhart public memorial park honoring veterans from the surrounding counties; the chamber lists visitor details.",
    "sourceUrl": "https://dalhart.org/lifeisbetterindalharttexas/things-to-do/"
  },
  {
    "county": "dallam",
    "name": "La Rita Performing Arts Theatre",
    "category": "Arts & culture",
    "description": "Historic Art Deco theater in Dalhart hosting scheduled performances and concerts.",
    "sourceUrl": "https://texastimetravel.com/directory/la-rita-performing-arts-theatre/"
  },
  {
    "county": "dallas",
    "name": "Klyde Warren Park",
    "category": "Parks & recreation",
    "description": "Downtown Dallas deck park above Woodall Rodgers Freeway with lawns, free activities, play areas and event programming.",
    "sourceUrl": "https://www.klydewarrenpark.org/klyde-warren-faqs"
  },
  {
    "county": "denton",
    "name": "Clear Creek Natural Heritage Center",
    "category": "Parks & recreation",
    "description": "City-managed native prairie, wetlands and bottomland forest nature area with several trails; stay on marked routes and check recent trail conditions.",
    "sourceUrl": "https://www.cityofdenton.com/222/Clear-Creek"
  },
  {
    "county": "dewitt",
    "name": "Cuero Historic Main Street Architecture Walk",
    "category": "History & heritage",
    "description": "Cuero's public Main Street and heritage streetscape include restored Victorian-era commercial buildings and the county's historic courthouse.",
    "sourceUrl": "https://texastimetravel.com/cities/cuero/"
  },
  {
    "county": "donley",
    "name": "Mulkey Theatre",
    "category": "Arts & culture",
    "description": "Historic Clarendon theater; verify current film and live-performance listings.",
    "sourceUrl": "https://texastimetravel.com/directory/mulkey-theatre/"
  },
  {
    "county": "donley",
    "name": "Restored Donley County Courthouse",
    "category": "History & heritage",
    "description": "Clarendon's striking restored 1891 Romanesque Revival courthouse; the exterior and public courthouse square are the reliable visitor experience.",
    "sourceUrl": "https://thc.texas.gov/preserve/preservation-programs/courthouse-preservation/restored-historic-courthouses/donley-county"
  },
  {
    "county": "eastland",
    "name": "Majestic Theatre of Eastland",
    "category": "Arts & culture",
    "description": "Restored theater screening films and hosting occasional stage performances; verify the current showtime calendar.",
    "sourceUrl": "https://www.majesticeastland.com/movie-schedule/"
  },
  {
    "county": "eastland",
    "name": "Old Rip Park",
    "category": "History & heritage",
    "description": "Public pocket park near the courthouse commemorating the horned-toad legend of Eastland.",
    "sourceUrl": "https://texastimetravel.com/cities/eastland/"
  },
  {
    "county": "ector",
    "name": "Globe Theater in Odessa",
    "category": "Arts & culture",
    "description": "Odessa's replica Elizabethan theater featuring staged productions and cultural events; verify current schedule.",
    "sourceUrl": "https://texastimetravel.com/cities/odessa/"
  },
  {
    "county": "ector",
    "name": "Odessa Jackrabbit Statue",
    "category": "Art & architecture",
    "description": "Public oversized jackrabbit sculpture commemorating Odessa's historic Jackrabbit Rodeo.",
    "sourceUrl": "https://texastimetravel.com/cities/odessa/"
  },
  {
    "county": "ector",
    "name": "The Ector Theatre",
    "category": "Arts & culture",
    "description": "Restored live music and performance venue in downtown Odessa; check the current official calendar.",
    "sourceUrl": "https://theector.com/"
  },
  {
    "county": "el-paso",
    "name": "Chamizal National Memorial",
    "category": "History & heritage",
    "description": "National Park Service memorial and cultural center in El Paso interpreting the U.S.–Mexico boundary settlement, with public exhibits and gated park grounds.",
    "sourceUrl": "https://www.nps.gov/cham/planyourvisit/hours.htm"
  },
  {
    "county": "el-paso",
    "name": "Hotel Paso del Norte",
    "category": "Art & architecture",
    "description": "A historic 1912 Trost-designed hotel in downtown El Paso, notable for its stained-glass dome and 2020 preservation rehabilitation. An operating hotel, not an unrestricted museum.",
    "sourceUrl": "https://atlas.thc.texas.gov/Details?atlasnumber=2079002933",
    "relatedGuideHref": "/destination/hotel-paso-del-norte"
  },
  {
    "county": "ellis",
    "name": "Chautauqua Auditorium in Waxahachie",
    "category": "History & heritage",
    "description": "Distinctive octagonal open-air auditorium in Getzendaner Park, a preserved Chautauqua-era venue.",
    "sourceUrl": "https://texastimetravel.com/cities/waxahachie/"
  },
  {
    "county": "ellis",
    "name": "Waxahachie Victorian Architecture Walking Tour",
    "category": "History & heritage",
    "description": "Self-guided exploration of downtown and the ornate Victorian residential streets known as Gingerbread City.",
    "sourceUrl": "https://texastimetravel.com/cities/waxahachie/"
  },
  {
    "county": "erath",
    "name": "Cowboy Capital Walk of Fame",
    "category": "History & heritage",
    "description": "Downtown Stephenville walking landmark celebrating local rodeo and cowboy heritage.",
    "sourceUrl": "https://texastimetravel.com/cities/stephenville/"
  },
  {
    "county": "fannin",
    "name": "Bonham Trade Days",
    "category": "Arts & culture",
    "description": "Recurring outdoor antiques and vendor market next to Fort Inglish; the city publishes the monthly market schedule.",
    "sourceUrl": "https://www.cityofbonham.org/256/Bonham-Trade-Days"
  },
  {
    "county": "fannin",
    "name": "Bonham Walkabout Tour on the Square",
    "category": "History & heritage",
    "description": "Self-guided history and architecture stop around Bonham's public downtown square.",
    "sourceUrl": "https://texastimetravel.com/cities/bonham/"
  },
  {
    "county": "fannin",
    "name": "Fannin County Barn Quilt Trail",
    "category": "Art & architecture",
    "description": "Countywide driving tour of painted barn-quilt squares; Bonham's visitor center offers maps and locations.",
    "sourceUrl": "https://www.cityofbonham.org/265/Texas-Largest-Barn-Quilt-Trail"
  },
  {
    "county": "fannin",
    "name": "Fort Inglish Village",
    "category": "History & heritage",
    "description": "Bonham reconstructed frontier stockade and village with original pioneer cabins; public seasonal hours are listed by the city.",
    "sourceUrl": "https://www.cityofbonham.org/260/Fort-Inglish-Village"
  },
  {
    "county": "fannin",
    "name": "Powder Creek Park",
    "category": "Parks & recreation",
    "description": "Public walking, nature and local recreation destination in Bonham; confirm park conditions.",
    "sourceUrl": "https://www.cityofbonham.org/101/Visit"
  },
  {
    "county": "fayette",
    "name": "Round Top Festival Institute at Festival Hill",
    "category": "Arts & culture",
    "description": "Round Top concert and performing-arts campus with a historic concert hall, ticketed performances and seasonal educational festivals.",
    "sourceUrl": "https://festivalhill.org/"
  },
  {
    "county": "floyd",
    "name": "Historic Floydada Courthouse Square",
    "category": "History & heritage",
    "description": "Downtown Floydada's public courthouse-square streetscape and county heritage landmarks for a short heritage walking stop.",
    "sourceUrl": "https://texastimetravel.com/cities/floydada/"
  },
  {
    "county": "foard",
    "name": "Foard County Courthouse World War I Memorial Sculptures",
    "category": "Art & architecture",
    "description": "Unusual Army and Navy memorial statues on the Crowell courthouse grounds, including a rare carved-stone Navy figure.",
    "sourceUrl": "https://texastimetravel.com/directory/foard-county-courthouse-tour/"
  },
  {
    "county": "fort-bend",
    "name": "Fort Bend County Epicenter",
    "category": "Arts & culture",
    "description": "Rosenberg arena and events complex hosting performances and community events; consult the event calendar.",
    "sourceUrl": "https://www.fortbendcountytx.gov/your-county/tourism"
  },
  {
    "county": "fort-bend",
    "name": "Smart Financial Centre",
    "category": "Arts & culture",
    "description": "Sugar Land performance venue for touring concerts, comedy and live entertainment; ticketed events.",
    "sourceUrl": "https://www.fortbendcountytx.gov/your-county/tourism"
  },
  {
    "county": "fort-bend",
    "name": "Stafford Centre",
    "category": "Arts & culture",
    "description": "Stafford performance and events venue featuring live shows, conferences and community programming.",
    "sourceUrl": "https://www.fortbendcountytx.gov/your-county/tourism"
  },
  {
    "county": "fort-bend",
    "name": "Sugar Land Space Cowboys Baseball",
    "category": "Arts & culture",
    "description": "Minor-league baseball experience in Sugar Land; consult the current schedule before visiting.",
    "sourceUrl": "https://www.fortbendcountytx.gov/your-county/tourism"
  },
  {
    "county": "franklin",
    "name": "Mount Vernon Historic Downtown Walk",
    "category": "History & heritage",
    "description": "Self-guided public-street walk through Mount Vernon's preserved courthouse square and railroad-era Main Street buildings; private interiors are not included.",
    "sourceUrl": "https://texastimetravel.com/cities/mount-vernon/"
  },
  {
    "county": "gaines",
    "name": "Gaines County Park",
    "category": "Parks & recreation",
    "description": "Seminole-area county recreation grounds with outdoor facilities; check city and county event schedules before visiting.",
    "sourceUrl": "https://seminoletxchamber.org/visit/"
  },
  {
    "county": "gaines",
    "name": "Seminole City Park",
    "category": "Parks & recreation",
    "description": "Municipal recreation and picnic stop in Seminole visitor information.",
    "sourceUrl": "https://seminoletxchamber.org/visit/"
  },
  {
    "county": "gaines",
    "name": "Seminole Splash Pad",
    "category": "Parks & recreation",
    "description": "Municipal family splash-play facility available seasonally; confirm warm-weather operating dates.",
    "sourceUrl": "https://seminoletxchamber.org/visit/"
  },
  {
    "county": "galveston",
    "name": "The Strand Historic District Walk",
    "category": "History & heritage",
    "description": "Walkable historic downtown Galveston district with restored Victorian-era commercial architecture, shops, galleries and heritage interpretation.",
    "sourceUrl": "https://www.visitgalveston.com/things-to-do/history-heritage/"
  },
  {
    "county": "garza",
    "name": "Ragtown Gospel Theater",
    "category": "Arts & culture",
    "description": "Post-area theatrical performance venue; check the operator's show schedule.",
    "sourceUrl": "https://ragtown.com/"
  },
  {
    "county": "gillespie",
    "name": "LBJ Ranch at Stonewall",
    "category": "History & heritage",
    "description": "Lyndon B. Johnson National Historical Park ranch visitor area near Stonewall; obtain the required free driving permit and check current building access.",
    "sourceUrl": "https://www.nps.gov/lyjo/planyourvisit/index.htm"
  },
  {
    "county": "goliad",
    "name": "Historic Downtown Goliad Walking Tour",
    "category": "History & heritage",
    "description": "Official Main Street walking route through Goliad's nineteenth- and early twentieth-century courthouse-square architecture, public streets and mature live oaks.",
    "sourceUrl": "https://www.mainstreetgoliad.com/walking-tour"
  },
  {
    "county": "gonzales",
    "name": "First Shot Monuments Historic District",
    "category": "History & heritage",
    "description": "Public monument area west of Gonzales commemorating the opening fight of the Texas Revolution; follow marked access.",
    "sourceUrl": "https://texastimetravel.com/cities/gonzales/"
  },
  {
    "county": "gonzales",
    "name": "Gonzales Historic Seven Squares Walk",
    "category": "History & heritage",
    "description": "Walk the distinctive sequence of downtown public squares around Gonzales' restored courthouse and historic streets.",
    "sourceUrl": "https://texastimetravel.com/cities/gonzales/"
  },
  {
    "county": "grayson",
    "name": "Hagerman National Wildlife Refuge",
    "category": "Parks & recreation",
    "description": "Lake Texoma-area birding refuge with wildlife drive, accessible paths and longer nature trails; follow refuge road and seasonal closures.",
    "sourceUrl": "https://www.fws.gov/refuge/hagerman/visit-us"
  },
  {
    "county": "gregg",
    "name": "Longview Arboretum and Nature Center",
    "category": "Parks & recreation",
    "description": "Publicly visitable botanical gardens with paths, seasonal blooms, education programs and ticketed garden admission in Longview.",
    "sourceUrl": "https://longviewarboretum.org/visit/"
  },
  {
    "county": "grimes",
    "name": "La Salle Monument in Navasota",
    "category": "Art & architecture",
    "description": "Public bronze statue of French explorer René-Robert Cavelier, Sieur de La Salle, at Washington Avenue and Old McMillican Road.",
    "sourceUrl": "https://texastimetravel.com/cities/navasota/"
  },
  {
    "county": "grimes",
    "name": "Mance Lipscomb Bronze Statue in Navasota",
    "category": "Art & architecture",
    "description": "Public bronze tribute to blues guitarist Mance Lipscomb near Navasota's downtown cultural landmarks.",
    "sourceUrl": "https://texastimetravel.com/cities/navasota/"
  },
  {
    "county": "grimes",
    "name": "Navasota Victorian Downtown Walking Area",
    "category": "History & heritage",
    "description": "Public sidewalks and period commercial facades across Navasota's National Register historic district; an architecture walk rather than a private-property tour.",
    "sourceUrl": "https://texastimetravel.com/cities/navasota/"
  },
  {
    "county": "guadalupe",
    "name": "Max Starcke Park",
    "category": "Parks & recreation",
    "description": "Large Seguin riverside public park with walking and paddling routes, family picnic facilities and recreation; check seasonal water attractions.",
    "sourceUrl": "https://seguintexas.gov/Facilities/Facility/Details/Max-Starcke-Park-7"
  },
  {
    "county": "hale",
    "name": "Plainview Aquatics Center",
    "category": "Parks & recreation",
    "description": "Seasonal municipal pool and aquatic recreation.",
    "sourceUrl": "https://www.plainviewtx.org/576/Things-to-Do"
  },
  {
    "county": "hale",
    "name": "Plainview Downtown Mural Tour",
    "category": "Art & architecture",
    "description": "Public artwork and murals highlighted by the City of Plainview.",
    "sourceUrl": "https://www.plainviewtx.org/576/Things-to-Do"
  },
  {
    "county": "hale",
    "name": "Plainview Point Monument",
    "category": "History & heritage",
    "description": "An interpretive monument linked to Plainview's archaeological history.",
    "sourceUrl": "https://www.plainviewtx.org/576/Things-to-Do"
  },
  {
    "county": "hale",
    "name": "Plainview Walk of Fame",
    "category": "History & heritage",
    "description": "Public tributes to local people and Plainview heritage.",
    "sourceUrl": "https://www.plainviewtx.org/238/Attractions"
  },
  {
    "county": "hale",
    "name": "Runningwater Draw Park Disc Golf Course",
    "category": "Parks & recreation",
    "description": "Municipal disc-golf activity; check conditions and park rules.",
    "sourceUrl": "https://www.plainviewtx.org/576/Things-to-Do"
  },
  {
    "county": "hall",
    "name": "Memphis Historic Brick Streets Walk",
    "category": "History & heritage",
    "description": "Short streetscape tour of Memphis' historic red brick paving and downtown period buildings, with the Hall County courthouse as a public exterior landmark.",
    "sourceUrl": "https://texastimetravel.com/cities/memphis/"
  },
  {
    "county": "hamilton",
    "name": "Circle T Resort and Arena",
    "category": "Arts & culture",
    "description": "Hamilton equestrian and events venue; attend scheduled public events.",
    "sourceUrl": "https://www.hamiltontexas.com/178/Attractions"
  },
  {
    "county": "hamilton",
    "name": "Historic Bullman Bridge",
    "category": "History & heritage",
    "description": "Rare relocated bowstring-iron pedestrian bridge reached from Pecan Creek Park; part of Hamilton’s existing public trail, not a separate paid venue.",
    "sourceUrl": "https://texastimetravel.com/cities/hamilton/"
  },
  {
    "county": "hamilton",
    "name": "Pecan Creek Park",
    "category": "Parks & recreation",
    "description": "Municipal park identified in Hamilton's city visitor-attraction directory.",
    "sourceUrl": "https://www.hamiltontexas.com/178/Attractions"
  },
  {
    "county": "hansford",
    "name": "J. B. Buchanan Windmill Park",
    "category": "History & heritage",
    "description": "Spearman's open-air collection of restored windmills, with a public walking trail.",
    "sourceUrl": "https://texastimetravel.com/cities/spearman/"
  },
  {
    "county": "hardeman",
    "name": "Quanah Parker Monument at Courthouse Square",
    "category": "Art & architecture",
    "description": "Granite tribute to Comanche leader Quanah Parker at the historic Hardeman County Courthouse; public outdoor heritage stop.",
    "sourceUrl": "https://texastimetravel.com/cities/quanah/"
  },
  {
    "county": "hardeman",
    "name": "Quanah Post Office New Deal Mural",
    "category": "Art & architecture",
    "description": "Jerry Bywaters' 1938 mural depicting Quanah-area history inside the post office; view only during regular public lobby access.",
    "sourceUrl": "https://texastimetravel.com/cities/quanah/"
  },
  {
    "county": "hardin",
    "name": "Big Thicket National Preserve Visitor Center",
    "category": "Parks & recreation",
    "description": "National Park Service visitor center and Longleaf Pine Trail on FM 420 near Kountze; the preserve's other units extend across multiple counties.",
    "sourceUrl": "https://www.nps.gov/bith/planyourvisit/visitor-center.htm"
  },
  {
    "county": "harris",
    "name": "Buffalo Bayou Park",
    "category": "Parks & recreation",
    "description": "Houston bayou green space with paved walking and biking trails, gardens and views of downtown; check closures and park-specific restrictions.",
    "sourceUrl": "https://www.buffalobayou.org/visitor-information/"
  },
  {
    "county": "harrison",
    "name": "Caddo Lake National Wildlife Refuge",
    "category": "Parks & recreation",
    "description": "Public visitor station and walking trails northeast of Marshall, with wildlife observation on former federal facility grounds near Karnack.",
    "sourceUrl": "https://www.fws.gov/refuge/caddo-lake/visit-us"
  },
  {
    "county": "haskell",
    "name": "La Briere House at Haskell City Park",
    "category": "History & heritage",
    "description": "Preserved early Haskell residence displaying period-room history in the city park; check whether interior access is available.",
    "sourceUrl": "https://texastimetravel.com/cities/haskell/"
  },
  {
    "county": "hays",
    "name": "Wonder World Cave",
    "category": "Parks & recreation",
    "description": "Guided San Marcos cave tour inside the Balcones Fault zone; tours run through a commercial visitor attraction.",
    "sourceUrl": "https://www.wonderworldpark.com/"
  },
  {
    "county": "hemphill",
    "name": "Canadian Cultural District Walking Tour",
    "category": "History & heritage",
    "description": "Self-guided walk through Canadian's historic Main Street, architectural sites and outdoor art; pick up a chamber visitor map.",
    "sourceUrl": "https://www.canadiantx.com/outdoors"
  },
  {
    "county": "hemphill",
    "name": "Canadian Municipal Golf Course",
    "category": "Parks & recreation",
    "description": "Nine-hole municipal golf course in Canadian; arrange tee times.",
    "sourceUrl": "https://www.canadiantx.com/outdoors"
  },
  {
    "county": "hemphill",
    "name": "Canadian Recreation Complex",
    "category": "Parks & recreation",
    "description": "Municipal rodeo arena and public recreation grounds; check event access.",
    "sourceUrl": "https://www.canadiantx.com/outdoors"
  },
  {
    "county": "hemphill",
    "name": "Canadian River Walking Bridge",
    "category": "Parks & recreation",
    "description": "Restored historic Canadian River bridge on a walk and bike route with river views.",
    "sourceUrl": "https://www.canadiantx.com/outdoors"
  },
  {
    "county": "hemphill",
    "name": "Historic Palace Theatre in Canadian",
    "category": "Arts & culture",
    "description": "Restored 1909 Main Street movie theater screening first-run films and hosting community events; confirm the program before visiting.",
    "sourceUrl": "https://www.canadiantx.com/host-an-event/jonespavillion-sw9cg"
  },
  {
    "county": "hemphill",
    "name": "Lake Marvin Recreation Area",
    "category": "Parks & recreation",
    "description": "Lake and picnic-and-trail landscape in Black Kettle National Grasslands near Canadian; follow current camping and visitor-area conditions.",
    "sourceUrl": "https://www.canadiantx.com/outdoors"
  },
  {
    "county": "hemphill",
    "name": "Sunset Park Sculpture Walk",
    "category": "Art & architecture",
    "description": "Canadian's city park with lit walking paths, public sculptures, gardens and benches.",
    "sourceUrl": "https://www.canadiantx.com/arts"
  },
  {
    "county": "henderson",
    "name": "Texas Freshwater Fisheries Center",
    "category": "Parks & recreation",
    "description": "Texas Parks and Wildlife visitor center in Athens offering fish exhibits, a hatchery, casting ponds and a wetlands trail.",
    "sourceUrl": "https://tpwd.texas.gov/fishing/tffc/"
  },
  {
    "county": "hidalgo",
    "name": "Santa Ana National Wildlife Refuge",
    "category": "Parks & recreation",
    "description": "Rio Grande Valley subtropical wildlife refuge with observation tower, canopy bridge and public birding trails; the Levee Road is currently closed to pedestrians and bicycles.",
    "sourceUrl": "https://www.fws.gov/refuge/santa-ana/visit-us"
  },
  {
    "county": "hill",
    "name": "Hillsboro Historic Downtown Architecture Walk",
    "category": "History & heritage",
    "description": "Walk the public blocks around Hillsboro's restored courthouse to view turn-of-the-century commercial buildings, historic library and brick streets.",
    "sourceUrl": "https://texastimetravel.com/cities/hillsboro/"
  },
  {
    "county": "hockley",
    "name": "Levelland City of Mosaics Self-Guided Walk",
    "category": "Art & architecture",
    "description": "City-produced walking route of downtown public mosaics and murals with visitor tour brochure.",
    "sourceUrl": "https://www.levellandtexas.org/1768/Levelland-City-of-Mosaics-Virtual-Tours-"
  },
  {
    "county": "hood",
    "name": "Granbury City Beach Park",
    "category": "Parks & recreation",
    "description": "Public sandy swimming area on Lake Granbury with picnic pavilions and seasonal recreation rentals.",
    "sourceUrl": "https://www.granbury.org/744/City-Beach-Park"
  },
  {
    "county": "hood",
    "name": "Granbury Opera House",
    "category": "Arts & culture",
    "description": "Restored downtown historic theater presenting musicals, stage plays and concerts in its public performance season.",
    "sourceUrl": "https://granburytheatrecompany.org/2026-season/"
  },
  {
    "county": "hopkins",
    "name": "Heritage Square in Sulphur Springs",
    "category": "History & heritage",
    "description": "Restored courthouse-square public gathering area with dining, specialty shops and notable historic architecture.",
    "sourceUrl": "https://texastimetravel.com/cities/sulphur-springs/"
  },
  {
    "county": "houston",
    "name": "Lightnin’ Hopkins Statue",
    "category": "Art & architecture",
    "description": "Public sculpture honoring the blues musician near Crockett's historic Camp Street.",
    "sourceUrl": "https://texastimetravel.com/cities/crockett/"
  },
  {
    "county": "howard",
    "name": "Big Spring Municipal Auditorium",
    "category": "Arts & culture",
    "description": "Municipal auditorium for cultural and civic events; check current schedules.",
    "sourceUrl": "https://www.visitbigspring.com/152/Community-Landmarks"
  },
  {
    "county": "howard",
    "name": "Big Spring Vietnam Memorial",
    "category": "History & heritage",
    "description": "Public memorial honoring military service, highlighted by Big Spring visitors bureau.",
    "sourceUrl": "https://www.visitbigspring.com/152/Community-Landmarks"
  },
  {
    "county": "howard",
    "name": "Comanche Trail Park",
    "category": "Parks & recreation",
    "description": "Big Spring municipal outdoor recreation park and historic-spring area.",
    "sourceUrl": "https://www.visitbigspring.com/152/Community-Landmarks"
  },
  {
    "county": "hunt",
    "name": "Downtown Greenville Heritage Walking Tour",
    "category": "History & heritage",
    "description": "Historic downtown walking route around Hunt County's civic square, with preserved commercial facades and event venues.",
    "sourceUrl": "https://texastimetravel.com/cities/greenville/"
  },
  {
    "county": "hunt",
    "name": "Greenville Municipal Auditorium",
    "category": "Arts & culture",
    "description": "Art Deco performance venue in Greenville with a current calendar of concerts and stage shows; verify dates and seating with the promoter.",
    "sourceUrl": "https://showtimedtgreenville.com/venue/greenville-municipal-auditorium/"
  },
  {
    "county": "hutchinson",
    "name": "Lake Meredith National Recreation Area",
    "category": "Parks & recreation",
    "description": "National Park Service lake and Canadian River recreation area with public boating and camping access; choose a designated visitor site and check water and road conditions.",
    "sourceUrl": "https://www.nps.gov/lamr/planyourvisit/index.htm"
  },
  {
    "county": "jack",
    "name": "Historic Jacksboro Railroad Depot and Visitor Center",
    "category": "History & heritage",
    "description": "Restored Gulf, Texas and Western Railroad depot now serving as a local tourism and history stop; check staffed visitor-center hours before making a special trip.",
    "sourceUrl": "https://texastimetravel.com/cities/jacksboro/"
  },
  {
    "county": "jasper",
    "name": "Sandy Creek Park in Jasper",
    "category": "Parks & recreation",
    "description": "Jasper municipal creekside park with a paved exercise track, fishing lake, picnic facilities, trails and play areas; larger park-use reservations are managed by the city.",
    "sourceUrl": "https://www.jaspertx.org/page/residents_parks"
  },
  {
    "county": "jeff-davis",
    "name": "Fort Davis National Historic Site",
    "category": "History & heritage",
    "description": "Preserved frontier military post with restored buildings, interpretive exhibits and trails near Fort Davis; check NPS operations and alerts before arriving.",
    "sourceUrl": "https://www.nps.gov/foda/planyourvisit/index.htm"
  },
  {
    "county": "jefferson",
    "name": "Beaumont Botanical Gardens and Warren Loose Conservatory",
    "category": "Parks & recreation",
    "description": "Public botanical-garden and conservatory grounds at Tyrrell Park, with themed plantings, paved walks and seasonal horticultural displays.",
    "sourceUrl": "https://www.beaumonttexas.gov/529/Community-in-Beaumont"
  },
  {
    "county": "jefferson",
    "name": "Cattail Marsh Wetlands Education Center",
    "category": "Parks & recreation",
    "description": "Public wetlands and birdwatching area at Tyrrell Park in Beaumont, with a boardwalk, observation areas and trails; conditions vary after rain.",
    "sourceUrl": "https://www.beaumonttexas.gov/436/Free-Programs-Services"
  },
  {
    "county": "jefferson",
    "name": "Julie Rogers Theatre",
    "category": "Arts & culture",
    "description": "Historic Beaumont performance theater used for staged productions, symphony performances and cultural events; check the event schedule.",
    "sourceUrl": "https://www.beaumonttexas.gov/529/Community-in-Beaumont"
  },
  {
    "county": "kendall",
    "name": "Cascade Caverns Guided Cave Tours",
    "category": "Parks & recreation",
    "description": "Boerne-area guided limestone cavern experience; cave access depends on scheduled tours and operator safety rules.",
    "sourceUrl": "https://www.cascadecaverns.com/"
  },
  {
    "county": "kendall",
    "name": "Cave Without a Name Guided Tours",
    "category": "Parks & recreation",
    "description": "Commercial show cave near Boerne with public guided tours and underground formations; confirm tour tickets and conditions.",
    "sourceUrl": "https://www.cavewithoutaname.com/"
  },
  {
    "county": "kerr",
    "name": "Kerr Arts and Cultural Center",
    "category": "Arts & culture",
    "description": "Downtown Kerrville cultural gallery offering exhibitions and community art programming; check current hours and events.",
    "sourceUrl": "https://texastimetravel.com/regions/hill-country-trail/heritage-sites-and-attractions/?page=3"
  },
  {
    "county": "kerr",
    "name": "Kerrville-Schreiner Park",
    "category": "Parks & recreation",
    "description": "City-operated park with open designated day-use trails and camping areas; the riverfront, beachfront and certain damaged paths remain closed during flood recovery. Check the city notice before traveling.",
    "sourceUrl": "https://www.kerrvilletx.gov/camp"
  },
  {
    "county": "kimble",
    "name": "Schreiner Park and Historic River Bridge",
    "category": "Parks & recreation",
    "description": "A public Junction river-area stop with historic bridge context.",
    "sourceUrl": "https://texastimetravel.com/cities/junction/"
  },
  {
    "county": "kleberg",
    "name": "King Ranch Visitor Center Tours",
    "category": "History & heritage",
    "description": "Operator-led ranch history, nature and agricultural tours depart from the official Kingsville visitor center; the private ranch is not open for unescorted entry.",
    "sourceUrl": "https://king-ranch.com/visit-us/our-tours/"
  },
  {
    "county": "knox",
    "name": "Knox City Downtown Mural Walk",
    "category": "Art & architecture",
    "description": "Painted ranch-brand, cowboy and agricultural murals in Knox City; a short self-guided downtown stop.",
    "sourceUrl": "https://texastimetravel.com/cities/knox-city/"
  },
  {
    "county": "knox",
    "name": "Knox County Veterans Memorial in Benjamin",
    "category": "History & heritage",
    "description": "Public granite veterans monument at the SH 6 and US 82 intersection in Benjamin.",
    "sourceUrl": "https://www.knoxcountytexas.org/page/knox.veterans"
  },
  {
    "county": "la-salle",
    "name": "Cotulla Front Street Historic Commercial District",
    "category": "History & heritage",
    "description": "National Register district of railroad-era commercial buildings along Front Street, with public sidewalks and rehabilitated storefronts.",
    "sourceUrl": "https://texastimetravel.com/directory/front-street-commercial-buildings-tour/"
  },
  {
    "county": "la-salle",
    "name": "Cotulla Tin Man Water Tower",
    "category": "Art & architecture",
    "description": "Distinctive downtown water-tower landmark along Texas Time Travel's public Cotulla town-square walk.",
    "sourceUrl": "https://texastimetravel.com/mobile-tours/mobile-tours-by-topic/town-square-walk-around/browse-walking-tours/town-square-cotulla/"
  },
  {
    "county": "lamar",
    "name": "Culbertson Fountain Plaza",
    "category": "Art & architecture",
    "description": "Decorative fountain and gathering space in historic downtown Paris.",
    "sourceUrl": "https://texastimetravel.com/cities/paris/"
  },
  {
    "county": "lamar",
    "name": "Paris Texas Eiffel Tower",
    "category": "Art & architecture",
    "description": "The city's distinctive Eiffel Tower sculpture with a red cowboy hat, a public photo stop.",
    "sourceUrl": "https://texastimetravel.com/cities/paris/"
  },
  {
    "county": "lamb",
    "name": "Waylon Jennings Memorial and RV Park",
    "category": "History & heritage",
    "description": "Littlefield public memorial dedicated to hometown musician Waylon Jennings, paired with a small local recreation stop.",
    "sourceUrl": "https://littlefieldtexas.net/200/Littlefield-Arts-Heritage-Group"
  },
  {
    "county": "lavaca",
    "name": "Hallettsville Historic Courthouse Square Walk",
    "category": "History & heritage",
    "description": "Public walk around Hallettsville's restored 1897 Romanesque courthouse and surrounding heritage businesses; county-office interiors keep their own schedule.",
    "sourceUrl": "https://texastimetravel.com/cities/hallettsville/"
  },
  {
    "county": "lipscomb",
    "name": "Lipscomb Historic Courthouse Square",
    "category": "History & heritage",
    "description": "Small rural county-seat heritage walk around the 1916 Classical Revival courthouse; public roads and square only.",
    "sourceUrl": "https://texastimetravel.com/cities/lipscomb/"
  },
  {
    "county": "lubbock",
    "name": "Lubbock Lake Landmark",
    "category": "History & heritage",
    "description": "Texas Tech-operated archaeological and natural-history preserve with a visitor interpretive center and marked public trails; the Wildflower Trail is closed for repairs.",
    "sourceUrl": "https://www.depts.ttu.edu/museumttu/LLL/index.html"
  },
  {
    "county": "lubbock",
    "name": "Prairie Dog Town at Mackenzie Park",
    "category": "Parks & recreation",
    "description": "Public viewing area for prairie dogs in Lubbock's Mackenzie Park; enjoy the animals from the designated space without feeding or disturbing wildlife.",
    "sourceUrl": "https://www.visitlubbock.org/blog/iconic-lubbock-picks"
  },
  {
    "county": "marion",
    "name": "Jay Gould's Private Railroad Car Atalanta",
    "category": "History & heritage",
    "description": "Restored 1888 private railroad coach in Jefferson; guided tours depend on operator arrangements, so confirm access before planning a visit.",
    "sourceUrl": "https://texastimetravel.com/cities/jefferson/"
  },
  {
    "county": "marion",
    "name": "Jefferson Historic Downtown Architecture Walk",
    "category": "History & heritage",
    "description": "Walk Jefferson's public downtown blocks to see restored Victorian and commercial buildings dating to its steamboat-trading era.",
    "sourceUrl": "https://texastimetravel.com/cities/jefferson/"
  },
  {
    "county": "marion",
    "name": "Sterne Fountain at Jefferson Carnegie Library",
    "category": "Art & architecture",
    "description": "1912 bronze public fountain outside Jefferson's Carnegie Library, a compact exterior architectural heritage stop.",
    "sourceUrl": "https://texastimetravel.com/cities/jefferson/"
  },
  {
    "county": "mason",
    "name": "Odeon Theater",
    "category": "Arts & culture",
    "description": "Nonprofit-operated Mason movie house and concert theater; see the operator's live performance calendar.",
    "sourceUrl": "https://www.theodeontheater.com/performances"
  },
  {
    "county": "matagorda",
    "name": "Downtown Bay City Courthouse Square",
    "category": "History & heritage",
    "description": "Walkable historic square with shops and architecture around the Matagorda County Courthouse.",
    "sourceUrl": "https://www.tourtexas.com/destinations/bay-city-matagorda-county-attractions"
  },
  {
    "county": "matagorda",
    "name": "LeTulle Park",
    "category": "Parks & recreation",
    "description": "Bay City public park with disc golf, picnic spaces and opportunities for bird and wildlife watching.",
    "sourceUrl": "https://www.tourtexas.com/destinations/bay-city-matagorda-county-attractions"
  },
  {
    "county": "matagorda",
    "name": "Matagorda County Birding Nature Center",
    "category": "Parks & recreation",
    "description": "Trails and gardens along the Colorado River near Bay City, with coastal and migratory birdwatching.",
    "sourceUrl": "https://www.tourtexas.com/destinations/bay-city-matagorda-county-attractions"
  },
  {
    "county": "matagorda",
    "name": "Palacios Golf Course",
    "category": "Parks & recreation",
    "description": "Nine-hole public golf course in Palacios; confirm current operating hours and tee times.",
    "sourceUrl": "https://www.tourtexas.com/destinations/bay-city-matagorda-county-attractions"
  },
  {
    "county": "matagorda",
    "name": "Rio Colorado Golf Course",
    "category": "Parks & recreation",
    "description": "Golf course near Bay City beside the Colorado River; arrange tee times with the course.",
    "sourceUrl": "https://www.tourtexas.com/destinations/bay-city-matagorda-county-attractions"
  },
  {
    "county": "matagorda",
    "name": "Riverside Park at Bay City",
    "category": "Parks & recreation",
    "description": "Colorado River park near Bay City with riverside recreation, trails and camping; confirm site fees and access.",
    "sourceUrl": "https://www.tourtexas.com/attractions/Riverside-Park"
  },
  {
    "county": "mcculloch",
    "name": "Earnest O. Martin Memorial Park Aquatic Complex",
    "category": "Parks & recreation",
    "description": "Brady municipal family park and seasonal pool complex with play features, sport courts and walking paths; swimming is seasonal.",
    "sourceUrl": "https://www.bradytx.us/553/Parks"
  },
  {
    "county": "mcculloch",
    "name": "Richards Park in Brady",
    "category": "Parks & recreation",
    "description": "Shaded municipal Brady Creek park offering picnics, playgrounds, disc golf and reservable campsites; verify camping availability and local park rules.",
    "sourceUrl": "https://www.bradytx.us/553/Parks"
  },
  {
    "county": "mclennan",
    "name": "Cameron Park and River Trails",
    "category": "Parks & recreation",
    "description": "Waco's major riverside park featuring wooded bluffs, overlooks and multiuse walking and mountain biking trails; use designated routes.",
    "sourceUrl": "https://www.waco-texas.com/Departments/Parks-Recreation/Cameron-Park/Cameron-Park-Trail-System-Rules"
  },
  {
    "county": "mclennan",
    "name": "Waco Mammoth National Monument",
    "category": "History & heritage",
    "description": "Protected in-situ Columbian mammoth fossil site with ranger-led access through a covered dig shelter; shelter admission is ticketed.",
    "sourceUrl": "https://www.nps.gov/waco/planyourvisit/index.htm"
  },
  {
    "county": "medina",
    "name": "Castroville Regional Park",
    "category": "Parks & recreation",
    "description": "Public Castroville park with mapped hiking trails and reservable recreational facilities; follow city pool and trail rules.",
    "sourceUrl": "https://castrovilletx.gov/2346/Castroville-Regional-Park"
  },
  {
    "county": "menard",
    "name": "Menard County Art Deco Courthouse",
    "category": "History & heritage",
    "description": "Restored Art Deco courthouse serving Menard's historic downtown; view architecture from public streets and grounds.",
    "sourceUrl": "https://texastimetravel.com/cities/menard/"
  },
  {
    "county": "menard",
    "name": "Menard Historic Ditch Walk",
    "category": "History & heritage",
    "description": "Walk the interpreted irrigation-ditch heritage corridor developed in the town's frontier and Spanish-colonial landscape.",
    "sourceUrl": "https://texastimetravel.com/cities/menard/"
  },
  {
    "county": "midland",
    "name": "Watersong Wild Space at I-20",
    "category": "Parks & recreation",
    "description": "Midland's municipal nature preserve, formerly the I-20 Wildlife Preserve, with wetland boardwalks, bird blinds and accessible trails; use the current Watersong Wild Space name.",
    "sourceUrl": "https://midlandtexas.gov/facilities/facility/details/I20-Wildlife-Preserve-28"
  },
  {
    "county": "mills",
    "name": "Goldthwaite Municipal Golf Course",
    "category": "Parks & recreation",
    "description": "Nine-hole public golf course in Goldthwaite; confirm rates and tee times.",
    "sourceUrl": "https://visitgoldthwaite.com/goldthwaite-municipal-golf-course"
  },
  {
    "county": "mills",
    "name": "Goldthwaite Municipal Park and Swimming Pool",
    "category": "Parks & recreation",
    "description": "Local outdoor and seasonal swimming facilities; verify pool season before traveling.",
    "sourceUrl": "https://visitgoldthwaite.com/attractions"
  },
  {
    "county": "mills",
    "name": "Texas Botanical Gardens",
    "category": "Parks & recreation",
    "description": "A botanical-garden destination named in Goldthwaite visitor resources.",
    "sourceUrl": "https://visitgoldthwaite.com/attractions"
  },
  {
    "county": "montgomery",
    "name": "Crighton Theatre",
    "category": "Arts & culture",
    "description": "Historic live-performance theater in downtown Conroe with plays, music and community productions.",
    "sourceUrl": "https://www.visitconroe.com/things-to-do/arts-and-entertainment/"
  },
  {
    "county": "montgomery",
    "name": "Downtown Conroe Art Bench Walk",
    "category": "Art & architecture",
    "description": "Self-guided downtown look at artist-designed benches and the city's cultural district.",
    "sourceUrl": "https://www.visitconroe.com/things-to-do/top-attractions/"
  },
  {
    "county": "montgomery",
    "name": "Fernland Historical Park",
    "category": "History & heritage",
    "description": "Montgomery heritage park with restored early Texas log homes and period structures.",
    "sourceUrl": "https://www.visitconroe.com/things-to-do/top-attractions/"
  },
  {
    "county": "montgomery",
    "name": "Lone Star Monument and Historical Flag Park",
    "category": "History & heritage",
    "description": "Conroe monument with a Texian soldier sculpture and flags representing Texas history.",
    "sourceUrl": "https://www.visitconroe.com/things-to-do/top-attractions/"
  },
  {
    "county": "montgomery",
    "name": "Madeley Fine Art Gallery",
    "category": "Arts & culture",
    "description": "Conroe Art League gallery hosting local exhibitions, art classes and artist events.",
    "sourceUrl": "https://www.visitconroe.com/listing/madeley-fine-art-gallery/416/"
  },
  {
    "county": "montgomery",
    "name": "Montgomery County Veterans Memorial Park",
    "category": "History & heritage",
    "description": "Public veterans and first-responders memorial complex in Conroe.",
    "sourceUrl": "https://www.visitconroe.com/listing/montgomery-county-veterans-memorial/658/"
  },
  {
    "county": "montgomery",
    "name": "Owen Theatre",
    "category": "Arts & culture",
    "description": "Intimate performing-arts venue in downtown Conroe; check Players Theatre productions and events.",
    "sourceUrl": "https://www.visitconroe.com/things-to-do/arts-and-entertainment/"
  },
  {
    "county": "montgomery",
    "name": "W. Goodrich Jones State Forest",
    "category": "Parks & recreation",
    "description": "Public state-forest trails near Conroe for hiking, birding and observing East Texas pine habitats.",
    "sourceUrl": "https://www.visitconroe.com/things-to-do/outdoors-and-recreation/hiking/"
  },
  {
    "county": "motley",
    "name": "Bob's Oil Well Roadside Landmark",
    "category": "History & heritage",
    "description": "Former 1930s Matador roadside attraction with an oversized derrick and historic filling-station buildings; view from public rights-of-way, not as an open museum.",
    "sourceUrl": "https://www.preservationtexas.org/mep/bobs-oil-well"
  },
  {
    "county": "nacogdoches",
    "name": "Ruby M. Mize Azalea Garden",
    "category": "Parks & recreation",
    "description": "Eleven-acre SFA public garden with azaleas, Japanese maples, camellias and walking paths; visit the whole garden, not each bed as a separate attraction.",
    "sourceUrl": "https://www.sfasu.edu/gardens/explore/azalea-garden"
  },
  {
    "county": "navarro",
    "name": "Corsicana Bronze Statue Walking and Audio Tour",
    "category": "Art & architecture",
    "description": "Self-guided public-art route with bronze sculptures celebrating local figures and recorded historical context, mainly around downtown Corsicana.",
    "sourceUrl": "https://texastimetravel.com/blog/stroll-through-downtown-on-corsicanas-bronze-statue-tour/"
  },
  {
    "county": "navarro",
    "name": "Downtown Corsicana Brick-Street Heritage Walk",
    "category": "History & heritage",
    "description": "Stroll preserved brick streets and late-1800s commercial facades in the historic Corsicana downtown district.",
    "sourceUrl": "https://texastimetravel.com/cities/corsicana/"
  },
  {
    "county": "newton",
    "name": "Wild Azalea Canyons Scenic Area",
    "category": "Parks & recreation",
    "description": "East Texas landscape of longleaf pines, wooded canyons and seasonal azaleas near Newton; check permitted trails and current management notices.",
    "sourceUrl": "https://texastimetravel.com/cities/newton/"
  },
  {
    "county": "nolan",
    "name": "Lake Sweetwater",
    "category": "Parks & recreation",
    "description": "Sweetwater-area lake recreation; check public access, ramps, and conditions.",
    "sourceUrl": "https://www.sweetwatertx.gov/159/Visit-Sweetwater"
  },
  {
    "county": "nolan",
    "name": "Lake Trammell",
    "category": "Parks & recreation",
    "description": "Sweetwater-area reservoir recreation; check current public access and facilities.",
    "sourceUrl": "https://www.sweetwatertx.gov/159/Visit-Sweetwater"
  },
  {
    "county": "nolan",
    "name": "Newman Park",
    "category": "Parks & recreation",
    "description": "A Sweetwater municipal park listed in local visitor resources.",
    "sourceUrl": "https://www.sweetwatertx.gov/159/Visit-Sweetwater"
  },
  {
    "county": "nolan",
    "name": "Sweetwater Municipal Auditorium and Gallery",
    "category": "Arts & culture",
    "description": "Civic performance and exhibition venue; check the event schedule.",
    "sourceUrl": "https://www.sweetwatertx.gov/159/Visit-Sweetwater"
  },
  {
    "county": "nueces",
    "name": "South Texas Botanical Gardens and Nature Center",
    "category": "Parks & recreation",
    "description": "Corpus Christi botanical and nature attraction combining orchid displays, butterfly gardens, birding trails and wetlands habitat; paid admission.",
    "sourceUrl": "https://stxbot.org/explore/"
  },
  {
    "county": "ochiltree",
    "name": "Perryton Main Street Architecture Walk",
    "category": "History & heritage",
    "description": "Public walk past Perryton's early twentieth-century commercial streetscape, the courthouse and railroad-era buildings; venue interiors may not be open.",
    "sourceUrl": "https://texastimetravel.com/cities/perryton/"
  },
  {
    "county": "orange",
    "name": "Shangri La Botanical Gardens and Nature Center",
    "category": "Parks & recreation",
    "description": "Orange garden and nature preserve open to public visitors with paths, education displays and seasonal pontoon tours; verify event and weather closures.",
    "sourceUrl": "https://shangrilagardens.org/visit/"
  },
  {
    "county": "palo-pinto",
    "name": "Clark Gardens Botanical Park",
    "category": "Parks & recreation",
    "description": "Landscaped botanical park near Mineral Wells with garden walks, water features and a labyrinth; check seasonal operating calendar.",
    "sourceUrl": "https://visitmineralwells.org/things-to-do/labyrinths_and_gardens"
  },
  {
    "county": "palo-pinto",
    "name": "Mineral Wells Fossil Park",
    "category": "Parks & recreation",
    "description": "Municipal fossil-collecting park where visitors can search surface exposures for Pennsylvanian fossils; follow posted collection and safety rules.",
    "sourceUrl": "https://www.mineralwellstx.gov/209/Mineral-Wells-Fossil-Park"
  },
  {
    "county": "parker",
    "name": "Chandor Gardens",
    "category": "Parks & recreation",
    "description": "Weatherford gardens mixing formal English landscaping and Chinese architectural elements.",
    "sourceUrl": "https://texastimetravel.com/directory/chandor-gardens/"
  },
  {
    "county": "parker",
    "name": "The Boardwalk at Lake Weatherford",
    "category": "Parks & recreation",
    "description": "Floating boardwalk and birdwatching route along Lake Weatherford with public trailheads.",
    "sourceUrl": "https://www.weatherfordtx.gov/3223/The-Boardwalk-at-Lake-Weatherford"
  },
  {
    "county": "pecos",
    "name": "Comanche Springs Swimming Pool",
    "category": "Parks & recreation",
    "description": "Historic Fort Stockton spring-associated municipal swimming pool; check its current season and pool access before planning a swim.",
    "sourceUrl": "https://texastimetravel.com/cities/fort-stockton/"
  },
  {
    "county": "pecos",
    "name": "Paisano Pete Roadrunner Statue",
    "category": "Art & architecture",
    "description": "Fort Stockton's oversized roadrunner landmark at Main and Dickinson, a publicly viewable roadside photo stop.",
    "sourceUrl": "https://visitfortstockton.com/"
  },
  {
    "county": "potter",
    "name": "Alibates Flint Quarries National Monument",
    "category": "History & heritage",
    "description": "Archaeological and geology destination north of Amarillo with visitor-center exhibits and a strenuous reservation-only ranger-led quarry tour.",
    "sourceUrl": "https://www.nps.gov/alfl/planyourvisit/basicinfo.htm"
  },
  {
    "county": "potter",
    "name": "Amarillo Little Theatre",
    "category": "Arts & culture",
    "description": "Local performing-arts company staging theatrical productions; attend scheduled public performances.",
    "sourceUrl": "https://texastimetravel.com/cities/amarillo/"
  },
  {
    "county": "potter",
    "name": "Amarillo Zoo",
    "category": "Parks & recreation",
    "description": "City zoo at Thompson Park featuring regional and global wildlife exhibits.",
    "sourceUrl": "https://texastimetravel.com/cities/amarillo/"
  },
  {
    "county": "potter",
    "name": "Globe-News Center for the Performing Arts",
    "category": "Arts & culture",
    "description": "Downtown Amarillo performing-arts center for touring concerts and staged events.",
    "sourceUrl": "https://texastimetravel.com/cities/amarillo/"
  },
  {
    "county": "potter",
    "name": "Historic Route 66 Sixth Street District",
    "category": "History & heritage",
    "description": "Amarillo's Route 66 heritage district with walkable historic storefronts and roadside architecture.",
    "sourceUrl": "https://texastimetravel.com/cities/amarillo/"
  },
  {
    "county": "presidio",
    "name": "Marfa Mystery Lights Viewing Area",
    "category": "Parks & recreation",
    "description": "Public roadside viewing area nine miles east of Marfa on US 90; unusual lights are not guaranteed, and visitors should stay in designated parking and viewing space.",
    "sourceUrl": "https://visitmarfa.com/mystery"
  },
  {
    "county": "reagan",
    "name": "Santa Rita No. 1 Discovery Well Roadside Marker",
    "category": "History & heritage",
    "description": "THC interpretive roadside marker on US 67 west of Big Lake for the 1923 Permian Basin discovery well; the original rig is no longer at this site.",
    "sourceUrl": "https://atlas.thc.texas.gov/Details/5383004587"
  },
  {
    "county": "red-river",
    "name": "Clarksville Historic Main Street Walk",
    "category": "History & heritage",
    "description": "Public downtown blocks of a designated Texas Main Street community with courthouse-era architecture and local businesses.",
    "sourceUrl": "https://texastimetravel.com/cities/clarksville/"
  },
  {
    "county": "red-river",
    "name": "Northeast Texas Trail — Clarksville Section",
    "category": "Parks & recreation",
    "description": "Rail-trail corridor linking Clarksville with nearby communities, suitable for walking and cycling where maintained; check segment and crossing conditions.",
    "sourceUrl": "https://texastimetravel.com/blog/historic-road-trip-denison-to-clarksville/"
  },
  {
    "county": "refugio",
    "name": "Aransas National Wildlife Refuge",
    "category": "Parks & recreation",
    "description": "Coastal refuge with public wildlife drive and trails near Austwell, best known for wintering whooping cranes; bird sightings vary by season.",
    "sourceUrl": "https://www.fws.gov/refuge/aransas/visit-us"
  },
  {
    "county": "rockwall",
    "name": "Historic Downtown Rockwall",
    "category": "History & heritage",
    "description": "Walkable Rockwall courthouse-square district with historic buildings, restaurants and shops; a public street-level visit rather than a building tour.",
    "sourceUrl": "https://texastimetravel.com/cities/rockwall/"
  },
  {
    "county": "rockwall",
    "name": "The Harbor at Rockwall",
    "category": "Arts & culture",
    "description": "Lake Ray Hubbard waterfront district with restaurants, public plazas, sunset views and seasonal outdoor concerts.",
    "sourceUrl": "https://topics.rockwall.com/visitrockwall_plan.asp"
  },
  {
    "county": "runnels",
    "name": "Ballinger Carnegie Library",
    "category": "History & heritage",
    "description": "1911 Carnegie library that continues serving readers in its historic building; public architecture stop subject to normal library hours.",
    "sourceUrl": "https://texastimetravel.com/cities/ballinger/"
  },
  {
    "county": "runnels",
    "name": "Charles H. Noyes Monument in Ballinger",
    "category": "Art & architecture",
    "description": "1919 Pompeo Coppini bronze horse-and-rider sculpture on Ballinger's broad historic courthouse-square grounds.",
    "sourceUrl": "https://texastimetravel.com/cities/ballinger/"
  },
  {
    "county": "runnels",
    "name": "Historic Santa Fe Depot in Ballinger",
    "category": "History & heritage",
    "description": "Spanish Revival former passenger railroad depot built in 1911, used for civic functions and local visitor services.",
    "sourceUrl": "https://texastimetravel.com/cities/ballinger/"
  },
  {
    "county": "san-augustine",
    "name": "San Augustine County Courthouse Grounds",
    "category": "History & heritage",
    "description": "Restored 1927 Classical Revival civic building anchoring San Augustine's historic center; public exterior, with county office access subject to hours.",
    "sourceUrl": "https://texastimetravel.com/cities/san-augustine/"
  },
  {
    "county": "san-augustine",
    "name": "San Augustine Historic Homes and Churches Walk",
    "category": "History & heritage",
    "description": "Public street-level tour of early East Texas churches, houses and civic structures; many individual buildings remain private or have limited access.",
    "sourceUrl": "https://texastimetravel.com/cities/san-augustine/"
  },
  {
    "county": "san-patricio",
    "name": "Sunset Lake Park in Portland",
    "category": "Parks & recreation",
    "description": "City-managed bayfront wetlands park in Portland with coastal birding, a hike-and-bike trail, interpretive boardwalks and waterside recreation.",
    "sourceUrl": "https://www.portlandtx.gov/Facilities/Facility/Details/Municipal-Park-11"
  },
  {
    "county": "scurry",
    "name": "Ritz Community Theatre",
    "category": "Arts & culture",
    "description": "Restored Snyder theater for local stage productions; check upcoming performances.",
    "sourceUrl": "https://texastimetravel.com/regions/plains-trail/"
  },
  {
    "county": "scurry",
    "name": "Scurry County Pool and Splash Pad",
    "category": "Parks & recreation",
    "description": "Seasonal public aquatic-play facilities in Snyder; check operating calendar and admission rules.",
    "sourceUrl": "https://snydertx.gov/498/Arts-Leisure"
  },
  {
    "county": "scurry",
    "name": "Towle Memorial Park",
    "category": "Parks & recreation",
    "description": "Snyder public park with walking paths and picnic areas.",
    "sourceUrl": "https://www.snydertx.gov/475/Heritage-Village"
  },
  {
    "county": "shackelford",
    "name": "Albany Historic Main Street Walk",
    "category": "History & heritage",
    "description": "Self-guided public-street walk through courthouse-era buildings in Albany, reflecting frontier and Bankhead Highway history.",
    "sourceUrl": "https://texastimetravel.com/cities/albany/"
  },
  {
    "county": "shackelford",
    "name": "Spudder Park in Albany",
    "category": "Parks & recreation",
    "description": "Small historic community park at US 283 and State Highway 6 with an antique oil-drilling rig and Texas Centennial marker.",
    "sourceUrl": "https://texastimetravel.com/directory/albany-tour/"
  },
  {
    "county": "shelby",
    "name": "Historic Shelby County Courthouse",
    "category": "History & heritage",
    "description": "Restored 1885 courthouse in Center with unusual castle-inspired architecture; public tours are described by Texas Time Travel.",
    "sourceUrl": "https://texastimetravel.com/directory/shelby-county-courthouse/"
  },
  {
    "county": "shelby",
    "name": "Historic Shelby County Jail",
    "category": "History & heritage",
    "description": "Historic former jail building near the Center courthouse square, now used by the chamber of commerce.",
    "sourceUrl": "https://texastimetravel.com/cities/center/"
  },
  {
    "county": "smith",
    "name": "Caldwell Zoo",
    "category": "Parks & recreation",
    "description": "Tyler zoo with animal exhibits and family visitor amenities; confirm current hours and tickets.",
    "sourceUrl": "https://texastimetravel.com/cities/tyler/"
  },
  {
    "county": "smith",
    "name": "Camp Ford Historical Park",
    "category": "History & heritage",
    "description": "Interpretive walking park documenting the Civil War prisoner-of-war camp near Tyler.",
    "sourceUrl": "https://texastimetravel.com/cities/tyler/"
  },
  {
    "county": "smith",
    "name": "Tyler Civic Theater",
    "category": "Arts & culture",
    "description": "Community theater productions in Tyler's Rose Park cultural area; check performance schedule.",
    "sourceUrl": "https://texastimetravel.com/travel-by-theme/?page=38"
  },
  {
    "county": "smith",
    "name": "Tyler Municipal Rose Garden",
    "category": "Parks & recreation",
    "description": "Public rose gardens with seasonal blooms and heritage rose plantings; check festival restrictions.",
    "sourceUrl": "https://texastimetravel.com/directory/tyler-municipal-rose-garden-and-museum/"
  },
  {
    "county": "starr",
    "name": "Roma Bluffs World Birding Center",
    "category": "Parks & recreation",
    "description": "Birding site and overlook in the Roma riverfront area; verify visiting arrangements.",
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wildlife/wildlife-trails/ltc/rio-bravo-loop"
  },
  {
    "county": "starr",
    "name": "Roma Historic District",
    "category": "History & heritage",
    "description": "Rio Grande town historic-district walking area with 19th-century border architecture and views of the international river corridor.",
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wildlife/wildlife-trails/ltc/rio-bravo-loop"
  },
  {
    "county": "sutton",
    "name": "Eaton Hill Nature Center and Preserve",
    "category": "Parks & recreation",
    "description": "Sonora nature preserve with public daylight hiking, wildlife observation and geology interpretation; nature-center building hours are seasonal.",
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wildlife/wildlife-trails/hotw/sonora-loop"
  },
  {
    "county": "sutton",
    "name": "Sonora Courthouse Square Historic Walking Tour",
    "category": "History & heritage",
    "description": "Self-guided downtown Sonora courthouse-square architecture and frontier-history route; look for chamber brochures by the courthouse markers.",
    "sourceUrl": "https://sonoratexas.org/attractions/historic/courthouse/"
  },
  {
    "county": "tarrant",
    "name": "Fort Worth Botanic Garden",
    "category": "Parks & recreation",
    "description": "Ticketed botanical garden with extensive formal and themed plant collections, pathways and seasonal events in Fort Worth.",
    "sourceUrl": "https://fwbg.org/plan-a-visit/admission-and-hours/"
  },
  {
    "county": "tarrant",
    "name": "Fort Worth Water Gardens",
    "category": "Art & architecture",
    "description": "Downtown architectural water garden with multiple pools and plaza walkways; no swimming or wading is permitted, and construction notices may affect access.",
    "sourceUrl": "https://www.fortworthtexas.gov/departments/parks/parks-and-trails/water-gardens"
  },
  {
    "county": "taylor",
    "name": "Abilene Storybook Gardens",
    "category": "Art & architecture",
    "description": "Downtown Abilene collection of public storybook character sculptures and family-friendly garden walks.",
    "sourceUrl": "https://www.abilenevisitors.com/directory/storybook-gardens/"
  },
  {
    "county": "terrell",
    "name": "Cactus Capital of Texas Trail",
    "category": "Parks & recreation",
    "description": "Sanderson-area walking route associated with its cactus and desert heritage.",
    "sourceUrl": "https://sandersontexas.com/explore-sanderson"
  },
  {
    "county": "terry",
    "name": "Terry County Quilt Trail",
    "category": "Art & architecture",
    "description": "A countywide driving route of large quilt-panel artworks reflecting Brownfield and Terry County's cotton-growing heritage.",
    "sourceUrl": "https://texastimetravel.com/directory/terry-county-quilt-trail/"
  },
  {
    "county": "titus",
    "name": "Mount Pleasant Historic Downtown Brick Street Walk",
    "category": "History & heritage",
    "description": "A public streetscape visit around Mount Pleasant's brick-paved Main Street district, restored Dr Pepper wall mural and downtown courthouse.",
    "sourceUrl": "https://texastimetravel.com/cities/mount-pleasant/"
  },
  {
    "county": "tom-green",
    "name": "International Water Lily Collection",
    "category": "Parks & recreation",
    "description": "Free public water-lily collection at Civic League Park in San Angelo, with flowering displays concentrated in the warmer months.",
    "sourceUrl": "https://www.sanangelo.gov/387/International-Water-Lily-Collection"
  },
  {
    "county": "travis",
    "name": "Westcave Outdoor Discovery Center",
    "category": "Parks & recreation",
    "description": "Guided nature-preserve canyon and grotto experience near Austin; access is regulated and advance tour reservation is typically needed.",
    "sourceUrl": "https://www.westcave.org/the-grotto"
  },
  {
    "county": "uvalde",
    "name": "Cook's Slough Sanctuary",
    "category": "Parks & recreation",
    "description": "Uvalde birdwatching and wetland conservation area; follow the local visitor guidance.",
    "sourceUrl": "https://texastimetravel.com/cities/uvalde/"
  },
  {
    "county": "uvalde",
    "name": "Uvalde Grand Opera House",
    "category": "Arts & culture",
    "description": "Restored 1891 opera house in Uvalde with historic architecture and scheduled cultural performances.",
    "sourceUrl": "https://texastimetravel.com/directory/uvalde-grand-opera-house/"
  },
  {
    "county": "val-verde",
    "name": "Amistad National Recreation Area",
    "category": "Parks & recreation",
    "description": "Lake recreation landscape near Del Rio with designated boating, shoreline areas and National Park Service visitor information; permits and conditions vary by activity.",
    "sourceUrl": "https://www.nps.gov/amis/planyourvisit/basicinfo.htm"
  },
  {
    "county": "val-verde",
    "name": "Brown Plaza and Casa de la Cultura",
    "category": "Art & architecture",
    "description": "Historic public plaza and cultural landmark in Del Rio, named in the Texas heritage travel registry.",
    "sourceUrl": "https://texastimetravel.com/blog/city-county-parks/"
  },
  {
    "county": "victoria",
    "name": "Riverside Park in Victoria",
    "category": "Parks & recreation",
    "description": "Large municipal Guadalupe River park with picnic sites, trails and outdoor recreation; review current river conditions and park notices.",
    "sourceUrl": "https://www.victoriatx.org/299/Riverside-Park"
  },
  {
    "county": "washington",
    "name": "Antique Rose Emporium",
    "category": "Parks & recreation",
    "description": "Brenham-area destination for rose gardens and nursery visits; check operator days and seasonal plants.",
    "sourceUrl": "https://texastimetravel.com/cities/brenham/"
  },
  {
    "county": "washington",
    "name": "Flying Horses Antique Carousel",
    "category": "Arts & culture",
    "description": "Historic working carousel in Brenham's Fireman's Park; rides are seasonal and hours are city-published.",
    "sourceUrl": "https://docs.cityofbrenham.org/city_government/departments/parks_and_recreation/flying_horses_carousel.php"
  },
  {
    "county": "washington",
    "name": "Historic Cisterns at Toubin Park",
    "category": "History & heritage",
    "description": "Interpreted rainwater cisterns and local fire-history site in downtown Brenham.",
    "sourceUrl": "https://texastimetravel.com/cities/brenham/"
  },
  {
    "county": "washington",
    "name": "Old Baylor Park at Windmill Hill",
    "category": "History & heritage",
    "description": "Independence-area park preserving columns from early Baylor University buildings; public grounds and heritage context.",
    "sourceUrl": "https://texastimetravel.com/cities/independence/"
  },
  {
    "county": "washington",
    "name": "The Barnhill Center at Historic Simon Theatre",
    "category": "Arts & culture",
    "description": "Restored 1925 theater in downtown Brenham offering public concerts and performances.",
    "sourceUrl": "https://thebarnhillcenter.com/"
  },
  {
    "county": "webb",
    "name": "San Agustín Plaza and Historic District",
    "category": "History & heritage",
    "description": "Public plaza and historic streets at the center of Laredo's 1755 Spanish-colonial town plan, near San Agustín Cathedral.",
    "sourceUrl": "https://visitlaredo.com/arts-culture/"
  },
  {
    "county": "wharton",
    "name": "Plaza Theatre in Wharton",
    "category": "Arts & culture",
    "description": "Wharton's active community theater presents ticketed plays and musicals at its downtown venue; check the operator's current season calendar.",
    "sourceUrl": "https://whartonplazatheatre.org/2026-2027-season/"
  },
  {
    "county": "wheeler",
    "name": "Old Mobeetie Cemetery",
    "category": "History & heritage",
    "description": "Old West cemetery associated with frontier Mobeetie; the local museum identifies historical burials and cemetery context.",
    "sourceUrl": "https://www.mobeetiemuseum.org/"
  },
  {
    "county": "wichita",
    "name": "Lucy Park in Wichita Falls",
    "category": "Parks & recreation",
    "description": "Public riverfront park with trails, woodland, playgrounds and picnic sites along the Wichita River.",
    "sourceUrl": "https://www.wichitafallstx.gov/69/Lucy-Park"
  },
  {
    "county": "wichita",
    "name": "River Bend Nature Center",
    "category": "Parks & recreation",
    "description": "Nature center in Wichita Falls with regional habitat exhibits and environmental education programs.",
    "sourceUrl": "https://riverbendnaturecenter.org/visit-us/"
  },
  {
    "county": "wilbarger",
    "name": "Santa Rosa Rodeo Grounds",
    "category": "Arts & culture",
    "description": "Vernon rodeo venue; attend scheduled events rather than expecting daily access.",
    "sourceUrl": "https://www.rrvmuseum.org/locations-of-interest"
  },
  {
    "county": "willacy",
    "name": "Fred Stone County Park",
    "category": "Parks & recreation",
    "description": "Public waterfront park at Port Mansfield with birding and bay views.",
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wildlife/wildlife-trails/ltc/sacahuistale-loop/"
  },
  {
    "county": "willacy",
    "name": "Port Mansfield Nature Trail",
    "category": "Parks & recreation",
    "description": "Coastal birding and native-habitat trail referenced in TPWD's birding trail network.",
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wildlife/wildlife-trails/ltc/sacahuistale-loop/"
  },
  {
    "county": "williamson",
    "name": "Round Rock Play for All Abilities Park",
    "category": "Parks & recreation",
    "description": "Large inclusive city park designed for children of all abilities, with imaginative and accessible play areas.",
    "sourceUrl": "https://www.roundrocktexas.gov/park/rabb-park/"
  },
  {
    "county": "wise",
    "name": "Wise County Veterans Memorial Park",
    "category": "History & heritage",
    "description": "Memorial landscape in Decatur honoring military service, identified in the Texas heritage-tourism directory.",
    "sourceUrl": "https://texastimetravel.com/blog/public-art/"
  },
  {
    "county": "wood",
    "name": "Governor Jim Hogg City Park",
    "category": "Parks & recreation",
    "description": "Quitman public park with heritage interpretation and family recreation.",
    "sourceUrl": "https://www.quitmantx.org/parks"
  },
  {
    "county": "wood",
    "name": "Mineola Nature Preserve on the Sabine River",
    "category": "Parks & recreation",
    "description": "Public 2,911-acre conservation and recreation landscape with birding, hiking, mountain biking and equestrian trails.",
    "sourceUrl": "https://www.mineola.com/o/naturepreserve"
  }
];

export function countyVisitorPlaces(countySlug: string): CountyVisitorPlace[] {
  const normalized = countySlug.trim().toLowerCase();
  return COUNTY_VISITOR_PLACES
    .filter((place) => place.county === normalized)
    .sort((a,b) => a.name.localeCompare(b.name));
}
