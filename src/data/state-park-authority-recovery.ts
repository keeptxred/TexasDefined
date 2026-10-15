import type { Destination } from "./types";

/** Fully attributed local records keep these canonical guides available during remote Explore outages.
 * Existing reviewed records can still enrich/replace these through the normal curation pipeline.
 */
export const stateParkAuthorityRecoveryDestinations: Destination[] = [
  {
    id: "authority-state-park-fort-richardson",
    brandId: "texasdefined",
    slug: "fort-richardson-state-park-state-historic-site",
    name: "Fort Richardson State Park & State Historic Site",
    category: "state-parks",
    region: "panhandle",
    nearestTown: "Jacksboro",
    county: "Jack",
    coordinates: { lat: 33.206158, lng: -98.156966 },
    address: "228 State Park Road 61, Jacksboro, TX 76458",
    hero: {
      src: "/images/explore/historic-sites/fort-richardson-state-park-state-historic-site.jpg",
      alt: "Historic stone military building at Fort Richardson State Park in Jacksboro",
      width: 1600, height: 1071,
      credit: "Mark Fisher · CC BY-SA 3.0 · Wikimedia Commons",
    },
    summary: "Walk historic buildings from a nineteenth-century U.S. Army post near Jacksboro, then plan camping, walking and cycling on the connected Lost Creek Reservoir State Trailway.",
    bestSeason: "Spring and fall are the park's busier seasons; mild days are most comfortable for exploring the historic grounds and trailway.",
    entryNote: "TPWD lists the park as open daily and recommends booking entry or campsites ahead. Historic building access, interpretive tours and trail conditions can differ by date.",
    highlights: ["Historic nineteenth-century Army hospital and military post", "Lost Creek Reservoir State Trailway maps and access", "Electric and full-hookup campsites", "Historic interpretation and visitor programs"],
    body: [
      "Fort Richardson is best understood as two connected destinations rather than a single landmark. The old frontier military post preserves buildings associated with the U.S. Army's presence after the Civil War, while the surrounding state park and Lost Creek Reservoir State Trailway serve hikers, cyclists and campers. Look for the original hospital and the relationships between restored structures and the broader post landscape instead of treating the grounds as an isolated monument.",
      "The official trailway and park maps are especially important because activities extend beyond the cluster of historic buildings. TPWD supplies a separate trailway and North Park map, a trails map and a main park map. Before selecting an outing, check entrances and distances on those maps rather than assuming that every trail starts at the historic site. Program access can change, so plan historic-building tours separately from general outdoor time.",
      "For camping, TPWD describes four full-hookup sites in the West Camping Loop and other electric, group and overflow options. The published campsite descriptions identify restroom and shower facilities near developed camping areas, but facilities and parking differ by loop and site type. Consult the exact campsite description for electrical service, vehicle access, picnic equipment and water rather than assuming every reservation includes the same hookups."
    ],
    managingAuthority: "Texas Parks and Wildlife Department",
    officialUrl: "https://tpwd.texas.gov/state-parks/fort-richardson",
    sourceCheckedAt: "2026-10-12",
  },
  {
    id: "authority-state-park-seminole-canyon",
    brandId: "texasdefined",
    slug: "seminole-canyon-state-park-and-historic-site",
    name: "Seminole Canyon State Park & Historic Site",
    category: "state-parks",
    region: "big-bend",
    nearestTown: "Comstock",
    county: "Val Verde",
    coordinates: { lat: 29.700094, lng: -101.312875 },
    address: "434 Park Road 67, Comstock, TX 78837",
    hero: {
      src: "/images/explore/historic-sites/seminole-canyon-state-park.jpg",
      alt: "Lower Pecos limestone canyon landscape at Seminole Canyon State Park and Historic Site",
      width: 1600, height: 1067,
      credit: "Cqui · CC BY-SA 3.0 · Wikimedia Commons",
    },
    summary: "Explore Lower Pecos canyon country west of Comstock, with ancient rock-art context, ranger-led access to cultural sites, desert hiking and striking limestone overlooks.",
    bestSeason: "Winter through early spring is the busy season; cooler weather is better for exposed canyon hiking.",
    entryNote: "TPWD lists the park as open daily, with office hours that differ from general entry. Guided rock-art access and current alerts require separate advance checks.",
    highlights: ["Lower Pecos canyon and Indigenous rock-art heritage", "Fate Bell Shelter guided interpretation", "Official park and trails maps", "Desert hiking and canyon overlooks"],
    body: [
      "Seminole Canyon combines a protected Lower Pecos landscape with important cultural history. The rock-art record is not simply a backdrop for a scenic walk: Indigenous communities created pictographs and used the shelter landscapes long before modern recreation. A responsible visit respects protected cultural sites, avoids touching rock art and follows the park's current rules for guided access to sensitive areas.",
      "The park is nine miles west of Comstock along U.S. Highway 90, just east of the Pecos River Bridge. TPWD lists the headquarters at approximately 29.700094, -101.312875. The agency supplies separate park and trails maps plus an interactive trails map; download them before leaving reliable mobile coverage. Canyon hiking can be exposed to sun and seasonal heat even when short distances look manageable on a screen.",
      "Do not mistake general admission for guaranteed admission to every rock-art location or tour. Check current tour schedules, meeting points, park alerts and access rules before making the drive. TPWD's official visitor page provides operating hours, reservation information and applicable entry fees; the maps and interpretive publications add the context needed to turn a scenic stop into a thoughtful visit."
    ],
    managingAuthority: "Texas Parks and Wildlife Department",
    officialUrl: "https://tpwd.texas.gov/state-parks/seminole-canyon",
    sourceCheckedAt: "2026-10-12",
  },
  {
    id: "authority-state-park-honey-creek",
    brandId: "texasdefined",
    slug: "honey-creek-state-natural-area",
    name: "Honey Creek State Natural Area",
    category: "state-parks",
    region: "hill-country",
    nearestTown: "Spring Branch",
    county: "Comal",
    coordinates: { lat: 29.823188, lng: -98.522480 },
    address: "558 Park Road 31, Spring Branch, TX 78070",
    hero: {
      src: "/images/state-parks/honey-creek-state-natural-area.jpg",
      alt: "Spring-fed Honey Creek in a shaded limestone valley at Honey Creek State Natural Area",
      width: 1600, height: 1200,
      credit: "Steven Polunsky · CC BY 2.0 · Wikimedia Commons",
    },
    summary: "Honey Creek State Natural Area now offers reserved public hiking on oak-savanna trails, including an accessible route, while the spring-fed creek itself remains protected by guided-tour access.",
    bestSeason: "Fall through spring for cooler walking temperatures, with early-day summer visits best for shade-limited grassland trails.",
    entryNote: "New public trails opened August 8, 2026. Reserve a day pass before entering: none are sold on-site. The Park Road 31 trailhead is open 7 a.m.–7 p.m.; guided access to the creek itself remains separate. TPWD lists adult day-use admission at $2 and free entry for children 12 and under; confirm before visiting.",
    highlights: [
      "New public-use trailhead off Park Road 31 opened August 2026",
      "Accessible 0.7-mile Box Turtle Trail through oak savanna",
      "Moderate 1.7-mile Roadrunner Trail and additional mapped paths",
      "Separate guided hikes to spring-fed Honey Creek",
      "Trailhead restroom; no public drinking-water refill station",
    ],
    body: [
      "Honey Creek State Natural Area protects a spring-fed Hill Country stream system, limestone geology and sensitive native habitat adjoining Guadalupe River State Park. TPWD historically restricted visits to guided hikes, but on August 8, 2026 it opened a new independently accessible trailhead on the park's southwestern side. This is an important distinction: a day pass now gives reserved access to designated trails, but it does not authorize unescorted entry to the creek itself. Creek tours remain separately guided from Guadalupe River State Park.",
      "TPWD describes about 3.6 miles of new public trails through oak savanna and the watershed above the creek. The easy, accessible Box Turtle Trail is 0.7 mile; the moderate Roadrunner Trail is 1.7 miles. These trails explore the landscape supplying and protecting the creek rather than taking hikers onto the sensitive creek corridor. The park's official trails map is the proper guide for routes, trail junctions and seasonal access; remain on marked trails to protect vegetation and water quality.",
      "For the new trailhead, use 558 Park Road 31 in Spring Branch, off State Highway 46. TPWD says trail access runs daily from 7 a.m. to 7 p.m., requires a reserved day pass and is entered using instructions supplied with the confirmation. The August 7, 2026 park announcement confirms a restroom at the trailhead but no public water-refill station, so carry all drinking water. Pets are permitted on the public trails but not on guided creek tours. Ask the park about its all-terrain wheelchair program and current site-specific accessibility.",
      "A worthwhile longer visit connects the savanna trail experience with a separately booked weekend interpretive hike to the creek, which TPWD says is about two miles and 2.5 hours. Plan those outings distinctly: the park's trail map and event calendar govern each. The ecosystem's role in Edwards Aquifer groundwater, creek flow and regional biodiversity makes Honey Creek a conservation story as well as a hike. Check alerts for closures, wildfire precautions and changing conditions before travel."
    ],
    managingAuthority: "Texas Parks and Wildlife Department",
    officialUrl: "https://tpwd.texas.gov/state-parks/honey-creek",
    sourceCheckedAt: "2026-10-12",
    accessibilityNotes: "TPWD describes the 0.7-mile Box Turtle Trail as accessible and offers an all-terrain wheelchair by request. Confirm equipment availability and site-specific access directly with park staff.",
    directions: "Use the Park Road 31 trailhead near State Highway 46, rather than assuming the creek tour starts there. Guided creek tours typically depart from the nearby Guadalupe River State Park complex.",
  },
  {
    id: "authority-state-park-lake-arrowhead",
    brandId: "texasdefined",
    slug: "lake-arrowhead-state-park",
    name: "Lake Arrowhead State Park",
    category: "state-parks",
    region: "prairies-lakes",
    nearestTown: "Wichita Falls",
    county: "Clay",
    coordinates: { lat: 33.758578, lng: -98.395201 },
    address: "229 Park Road 63, Wichita Falls, TX 76310",
    hero: {
      src: "/images/state-parks/lake-arrowhead-state-park.jpg",
      alt: "Lake Arrowhead State Park day-use area and North Texas reservoir landscape",
      width: 1600, height: 1067,
      credit: "Nicolas Henderson · CC BY 2.0 · Wikimedia Commons",
    },
    summary: "Plan lake fishing, boating, camping, disc golf and open-prairie trails at Lake Arrowhead State Park south of Wichita Falls, with official reservoir and park-map resources.",
    bestSeason: "Spring and fall favor land-based outings; watch wind, water levels and heat when planning lake activities.",
    entryNote: "TPWD lists daily park operations and recommends booking passes ahead when demand is high. The park has active alerts; check them, water conditions and ramp access before going.",
    highlights: ["Fishing and reservoir recreation on Lake Arrowhead", "Camping and designated recreation areas", "Disc golf and prairie walking", "TPWD park, trails and visitor maps"],
    body: [
      "Lake Arrowhead State Park sits in broad North Texas prairie country south of Wichita Falls. Its principal draw is the reservoir, which creates a different visit from heavily wooded East Texas parks or rugged canyon destinations. Fishing, boating and camping shape many trips, while the park's trails and disc golf offer alternatives when wind or water conditions make an outing on the lake less attractive.",
      "The official directions put the park off FM 1954, south of Wichita Falls. TPWD identifies its headquarters at 33.758578, -98.395201 and publishes both a park map and trails map, plus an interactive trails map. Select the correct recreation area and parking before leaving home; large reservoir parks can have distinct launch, campsite and day-use zones that should not be treated as interchangeable.",
      "A useful lake trip begins with current conditions. Check park alerts, forecasts, water levels and the boat-ramp situation directly with TPWD before trailering a boat. For camping or RV travel, confirm the exact reservable site type, facilities and hookup information instead of inferring those amenities from the fact that camping is offered. Bring an alternative on-land plan if wind or water conditions change."
    ],
    managingAuthority: "Texas Parks and Wildlife Department",
    officialUrl: "https://tpwd.texas.gov/state-parks/lake-arrowhead",
    sourceCheckedAt: "2026-10-12",
  },
];
/** Keep canonical park facts richer than remote thin records while retaining their stable IDs. */
export function applyStateParkAuthorityRecovery(input: Destination): Destination {
  const reviewed = stateParkAuthorityRecoveryDestinations.find((row) => row.slug === input.slug);
  if (!reviewed) return input;
  return { ...input, ...reviewed, id: input.id, featured: input.featured, hero: reviewed.hero };
}
