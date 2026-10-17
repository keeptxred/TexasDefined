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
    "county": "caldwell",
    "name": "Lockhart Historic Courthouse Square",
    "category": "History & heritage",
    "description": "Explore the public courthouse-square streetscape and surrounding historic center.",
    "sourceUrl": "https://visitlockharttx.org/"
  },
  {
    "county": "camp",
    "name": "Witness Park and Prayer Tower",
    "category": "Parks & recreation",
    "description": "A distinctive Pittsburg landmark included in the city's visitor itinerary.",
    "sourceUrl": "https://visit.pittsburgtx.gov/guides/one-day-in-pittsburg"
  },
  {
    "county": "camp",
    "name": "Carroll Shelby Statue in Pittsburg",
    "category": "Art & architecture",
    "description": "Public memorial to the automotive designer and racer from Pittsburg.",
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
    "county": "hale",
    "name": "Plainview Downtown Mural Tour",
    "category": "Art & architecture",
    "description": "Public artwork and murals highlighted by the City of Plainview.",
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
    "name": "Plainview Point Monument",
    "category": "History & heritage",
    "description": "An interpretive monument linked to Plainview's archaeological history.",
    "sourceUrl": "https://www.plainviewtx.org/576/Things-to-Do"
  },
  {
    "county": "hale",
    "name": "Runningwater Draw Park Disc Golf Course",
    "category": "Parks & recreation",
    "description": "Municipal disc-golf activity; check conditions and park rules.",
    "sourceUrl": "https://www.plainviewtx.org/576/Things-to-Do"
  },
  {
    "county": "hale",
    "name": "Plainview Aquatics Center",
    "category": "Parks & recreation",
    "description": "Seasonal municipal pool and aquatic recreation.",
    "sourceUrl": "https://www.plainviewtx.org/576/Things-to-Do"
  },
  {
    "county": "kimble",
    "name": "Schreiner Park and Historic River Bridge",
    "category": "Parks & recreation",
    "description": "A public Junction river-area stop with historic bridge context.",
    "sourceUrl": "https://texastimetravel.com/cities/junction/"
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
    "county": "nolan",
    "name": "Newman Park",
    "category": "Parks & recreation",
    "description": "A Sweetwater municipal park listed in local visitor resources.",
    "sourceUrl": "https://www.sweetwatertx.gov/159/Visit-Sweetwater"
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
    "name": "Sweetwater Municipal Auditorium and Gallery",
    "category": "Arts & culture",
    "description": "Civic performance and exhibition venue; check the event schedule.",
    "sourceUrl": "https://www.sweetwatertx.gov/159/Visit-Sweetwater"
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
    "name": "Port Mansfield Nature Trail",
    "category": "Parks & recreation",
    "description": "Coastal birding and native-habitat trail referenced in TPWD's birding trail network.",
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wildlife/wildlife-trails/ltc/sacahuistale-loop/"
  },
  {
    "county": "willacy",
    "name": "Fred Stone County Park",
    "category": "Parks & recreation",
    "description": "Public waterfront park at Port Mansfield with birding and bay views.",
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wildlife/wildlife-trails/ltc/sacahuistale-loop/"
  },
  {
    "county": "cameron",
    "name": "Laguna Madre Nature Trail",
    "category": "Parks & recreation",
    "description": "A South Padre Island birding boardwalk; located in Cameron County, not Willacy.",
    "sourceUrl": "https://tpwd.texas.gov/huntwild/wildlife/wildlife-trails/ltc/south-padre-island-loop"
  }
];

export function countyVisitorPlaces(countySlug: string): CountyVisitorPlace[] {
  const normalized = countySlug.trim().toLowerCase();
  return COUNTY_VISITOR_PLACES
    .filter((place) => place.county === normalized)
    .sort((a,b) => a.name.localeCompare(b.name));
}
