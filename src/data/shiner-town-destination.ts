import type { Destination } from "./types";

export const shinerTownDestination: Destination = {
  id: "destination-shiner",
  brandId: "texasdefined",
  slug: "shiner",
  name: "Shiner",
  summary: "Shiner is a small Lavaca County town where Czech and German heritage, railroad history, a nationally known brewery, a painted church, local museums and a compact historic core make an unusually strong one-day or overnight Texas road-trip stop.",
  category: "small-towns",
  region: "gulf-coast",
  nearestTown: "Shiner",
  county: "Lavaca",
  coordinates: { lat: 29.4308, lng: -97.1722 },
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/City%20Hall%20Shiner%20Texas%202024.jpg?width=1600",
    alt: "City Hall in Shiner, Texas, in the historic Lavaca County town",
    width: 3556,
    height: 2000,
    credit: "Larry D. Moore · Wikimedia Commons · CC BY 4.0",
  },
  bestSeason: "Fall through spring for comfortable walking and road-trip weather; brewery tours and the town's core attractions operate year-round",
  entryNote: "Shiner itself does not require admission, but individual attractions keep their own schedules. Reserve Spoetzl Brewery tours in advance, confirm church visitor access around worship and parish events, and recheck museum and park information before traveling.",
  highlights: [
    "K. Spoetzl Brewery tours and visitor campus",
    "Saints Cyril and Methodius Catholic Church",
    "Edwin Wolters Memorial Museum",
    "Green-Dickson Municipal Park",
    "Czech and German Texas heritage",
    "Railroad-era town history",
    "Downtown Shiner and historic civic buildings",
    "Lavaca County road-trip base",
  ],
  body: [
    "Shiner is a town whose best-known product never detached from the place that created it. The community developed after the San Antonio and Aransas Pass Railway built through land owned by Henry B. Shiner in 1887. The settlement was first called New Half Moon, then took the Shiner name in 1888 and incorporated in 1890. Czech and German immigrants became especially important to the town's population, churches, social organizations, businesses and cultural identity.",
    "The K. Spoetzl Brewery is the obvious anchor for many visitors, but Shiner works better as a town trip than as a single-stop brewery detour. The brewery traces its operation to 1909 and today includes guided brewery tours, a distillery, barbecue, Rickhouse restaurant, outdoor gathering spaces and a gift shop. Texas Defined keeps a separate destination guide for the brewery so current tour prices, beer releases and reservation details do not overwhelm the town-level page.",
    "Saints Cyril and Methodius Catholic Church adds a different layer of the same immigrant story. The Romanesque church is listed on the National Register of Historic Places and is part of Texas Defined's Painted Churches coverage. Its architecture, stained glass and decorated interior help explain why Shiner's Czech and German heritage is more than branding: it remains visible in institutions that shaped everyday community life.",
    "The Edwin Wolters Memorial Museum gives the town a local-history stop beyond the brewery and church. The City of Shiner describes collections that range from an old-time country store and antique firearms to handwork, musical instruments, farm implements and other objects tied to local life. Green-Dickson Municipal Park, on the northwest edge of town, adds playgrounds, sports courts, fishing, picnic areas, RV camping and larger gathering facilities.",
    "Shiner also makes sense as part of a wider Lavaca County loop. Hallettsville is the county seat, Yoakum links the county to railroad and leather history, Moulton adds another Czech- and German-Texan small-town setting, and rural churches and farm roads connect the towns. Visitors with more time can extend west toward Gonzales or northeast toward Fayette County's painted-church country.",
    "For trip planning, the strongest approach is to choose one or two timed attractions first and build around them. Reserve the brewery tour if that is the priority, verify church access if seeing the interior matters, then use the museum, downtown streets and Green-Dickson Park as flexible additions. That produces a fuller Shiner visit without turning a compact town into an overplanned itinerary."
  ],
  officialUrl: "https://www.shinertexas.gov/",
  sourceCheckedAt: "2026-09-19",
  directions: "Shiner is in western Lavaca County at U.S. 90A and State Highway 95, about 14 miles west of Hallettsville. Use current navigation for your starting point and check any attraction-specific parking or reservation instructions before arrival.",
  accessibilityNotes: "Accessibility varies by attraction. Municipal facilities and the brewery publish their own current visitor guidance; contact a site directly when step-free access, seating, sensory accommodations or other specific needs will affect the visit.",
  areaGuide: {
    intro: "Shiner is compact enough to combine its major stops in one day, but the surrounding Lavaca County countryside rewards a slower overnight or regional road trip.",
    nearbyAttractions: [
      { name: "K. Spoetzl Brewery", description: "Tour the working brewery and see the current visitor campus, distillery, barbecue and Rickhouse.", proximity: "In Shiner", href: "/destination/spoetzl-brewery" },
      { name: "Saints Cyril and Methodius Catholic Church", description: "A major Shiner heritage landmark and part of Texas Defined's Painted Churches coverage.", proximity: "In Shiner", href: "/explore/painted-churches/shiner-saints-cyril-methodius" },
      { name: "Edwin Wolters Memorial Museum", description: "Local-history collections covering household, agricultural and community life in Shiner.", proximity: "In Shiner", href: "https://www.shinertexas.gov/1213/Edwin-Wolters-Memorial-Museum" },
      { name: "Green-Dickson Municipal Park", description: "A large municipal park with sports facilities, playgrounds, fishing, picnic areas and RV camping.", proximity: "Northwest Shiner", href: "https://www.shinertexas.gov/1221/Green-Dickson-Municipal-Park" },
    ],
    foodAndDrink: [
      { name: "Spoetzl Brewery campus", description: "K. Spoetzl BBQ Co., Rickhouse and the brewery's visitor areas make the campus the town's most obvious food-and-drink anchor.", proximity: "East Brewery Street", href: "/destination/spoetzl-brewery" },
    ],
    lodging: [
      { name: "Shiner-area lodging", description: "Small-town lodging inventory can change. Compare current Shiner availability first, then widen the search to Hallettsville, Gonzales or other nearby towns if dates are tight.", proximity: "Shiner and Lavaca County" },
    ],
    neighborhoods: [
      { name: "Central Shiner", description: "The compact town core connects civic buildings, local businesses and the street grid that grew around the railroad-era community.", proximity: "Town center" },
    ],
    familyStops: [
      { name: "Green-Dickson Municipal Park", description: "Playgrounds, open space, sports courts and picnic facilities make this the easiest flexible family stop.", proximity: "Northwest Shiner", href: "https://www.shinertexas.gov/1221/Green-Dickson-Municipal-Park" },
      { name: "Edwin Wolters Memorial Museum", description: "A small local museum whose varied collections can work well as a short multigenerational history stop.", proximity: "In Shiner", href: "https://www.shinertexas.gov/1213/Edwin-Wolters-Memorial-Museum" },
    ],
    sideTrips: [
      { name: "Lavaca County", description: "Use the county guide to connect Shiner with Hallettsville, Yoakum, Moulton, waterways and the wider Czech and German settlement landscape.", proximity: "Same county", href: "/county/lavaca" },
      { name: "Gonzales County", description: "Extend west toward Gonzales for Texas Revolution history and another strong small-town road-trip stop.", proximity: "West of Shiner", href: "/county/gonzales" },
    ],
  },
  featured: true,
};
