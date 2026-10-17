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
    "county": "bailey",
    "name": "Ol’ Pete Mule Memorial Statue",
    "category": "Art & architecture",
    "description": "Muleshoe's public tribute to the working mule and its military role; a brief roadside photo stop.",
    "sourceUrl": "https://texastimetravel.com/cities/muleshoe/"
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
    "county": "brooks",
    "name": "Don Pedro Jaramillo Shrine",
    "category": "History & heritage",
    "description": "A culturally significant roadside shrine identified by the City of Falfurrias.",
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
    "county": "houston",
    "name": "Lightnin’ Hopkins Statue",
    "category": "Art & architecture",
    "description": "Public sculpture honoring the blues musician near Crockett's historic Camp Street.",
    "sourceUrl": "https://texastimetravel.com/cities/crockett/"
  },
  {
    "county": "kimble",
    "name": "Schreiner Park and Historic River Bridge",
    "category": "Parks & recreation",
    "description": "A public Junction river-area stop with historic bridge context.",
    "sourceUrl": "https://texastimetravel.com/cities/junction/"
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
    "county": "starr",
    "name": "Roma Bluffs World Birding Center",
    "category": "Parks & recreation",
    "description": "Birding site and overlook in the Roma riverfront area; verify visiting arrangements.",
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wildlife/wildlife-trails/ltc/rio-bravo-loop"
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
  }
];

export function countyVisitorPlaces(countySlug: string): CountyVisitorPlace[] {
  const normalized = countySlug.trim().toLowerCase();
  return COUNTY_VISITOR_PLACES
    .filter((place) => place.county === normalized)
    .sort((a,b) => a.name.localeCompare(b.name));
}
