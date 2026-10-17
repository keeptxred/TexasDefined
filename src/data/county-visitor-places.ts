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
    "county": "armstrong",
    "name": "Gem Theatre in Claude",
    "category": "Arts & culture",
    "description": "Restored historic theater associated with the county museum; check dates for performances.",
    "sourceUrl": "https://texastimetravel.com/directory/gem-theatre/"
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
    "county": "bastrop",
    "name": "Bastrop Opera House",
    "category": "Arts & culture",
    "description": "Historic live theater producing plays and musicals in downtown Bastrop; consult upcoming shows.",
    "sourceUrl": "https://www.bastropoperahouse.org/shows/"
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
    "county": "burnet",
    "name": "Balcones Canyonlands National Wildlife Refuge",
    "category": "Parks & recreation",
    "description": "Hill Country refuge with public visitor areas at Doeskin Ranch and Warbler Vista; choose a designated trailhead rather than the refuge's geographic center.",
    "sourceUrl": "https://www.fws.gov/refuge/balcones-canyonlands/visit-us"
  },
  {
    "county": "caldwell",
    "name": "Lockhart Historic Courthouse Square",
    "category": "History & heritage",
    "description": "Explore the public courthouse-square streetscape and surrounding historic center.",
    "sourceUrl": "https://visitlockharttx.org/"
  },
  {
    "county": "cameron",
    "name": "Laguna Madre Nature Trail",
    "category": "Parks & recreation",
    "description": "A South Padre Island birding boardwalk; located in Cameron County, not Willacy.",
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wildlife/wildlife-trails/ltc/south-padre-island-loop"
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
    "county": "gaines",
    "name": "Seminole City Park",
    "category": "Parks & recreation",
    "description": "Municipal recreation and picnic stop in Seminole visitor information.",
    "sourceUrl": "https://seminoletxchamber.org/visit/"
  },
  {
    "county": "garza",
    "name": "Ragtown Gospel Theater",
    "category": "Arts & culture",
    "description": "Post-area theatrical performance venue; check the operator's show schedule.",
    "sourceUrl": "https://ragtown.com/"
  },
  {
    "county": "grayson",
    "name": "Hagerman National Wildlife Refuge",
    "category": "Parks & recreation",
    "description": "Lake Texoma-area birding refuge with wildlife drive, accessible paths and longer nature trails; follow refuge road and seasonal closures.",
    "sourceUrl": "https://www.fws.gov/refuge/hagerman/visit-us"
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
    "county": "harrison",
    "name": "Caddo Lake National Wildlife Refuge",
    "category": "Parks & recreation",
    "description": "Public visitor station and walking trails northeast of Marshall, with wildlife observation on former federal facility grounds near Karnack.",
    "sourceUrl": "https://www.fws.gov/refuge/caddo-lake/visit-us"
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
    "county": "kimble",
    "name": "Schreiner Park and Historic River Bridge",
    "category": "Parks & recreation",
    "description": "A public Junction river-area stop with historic bridge context.",
    "sourceUrl": "https://texastimetravel.com/cities/junction/"
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
    "county": "reagan",
    "name": "Santa Rita No. 1 Discovery Well Roadside Marker",
    "category": "History & heritage",
    "description": "THC interpretive roadside marker on US 67 west of Big Lake for the 1923 Permian Basin discovery well; the original rig is no longer at this site.",
    "sourceUrl": "https://atlas.thc.texas.gov/Details/5383004587"
  },
  {
    "county": "refugio",
    "name": "Aransas National Wildlife Refuge",
    "category": "Parks & recreation",
    "description": "Coastal refuge with public wildlife drive and trails near Austwell, best known for wintering whooping cranes; bird sightings vary by season.",
    "sourceUrl": "https://www.fws.gov/refuge/aransas/visit-us"
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
    "name": "Towle Memorial Park",
    "category": "Parks & recreation",
    "description": "Snyder public park with walking paths and picnic areas.",
    "sourceUrl": "https://www.snydertx.gov/475/Heritage-Village"
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
    "name": "Brown Plaza and Casa de la Cultura",
    "category": "Art & architecture",
    "description": "Historic public plaza and cultural landmark in Del Rio, named in the Texas heritage travel registry.",
    "sourceUrl": "https://texastimetravel.com/blog/city-county-parks/"
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
