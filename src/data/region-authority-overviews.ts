import type { TexasRegion } from "./types";

export interface RegionAuthorityOverview { intro:string; bases: [string,string][]; safety:string; links:{href:string;label:string}[]; sources:{label:string;href:string}[] }

/** Source-aware trip-planning context for the seven stable Explore travel-region URLs. */
export const REGION_AUTHORITY_OVERVIEWS: Record<TexasRegion, RegionAuthorityOverview> = {
  "hill-country": {
    "intro": "The Hill Country is a mosaic of Edwards Plateau limestone, rivers, granite country and towns shaped by ranching and multiple migration histories. Boundaries are approximate: some places near Austin and San Antonio are transition zones rather than unambiguously inside the plateau. Use the town, waterway and road as the unit of trip planning, not a rigid county outline.",
    "bases": [
      [
        "Fredericksburg and Stonewall",
        "Historic Main Street, Enchanted Rock, LBJ country and the U.S. 290 tasting corridor."
      ],
      [
        "Wimberley and Blanco",
        "Spring-fed swimming destinations, limestone scenery and small-town stops with reservation-dependent access."
      ],
      [
        "Kerrville, Bandera and Junction",
        "River valleys, ranch roads and western Hill Country landscapes better suited to a quieter overnight."
      ]
    ],
    "safety": "Late fall through spring usually suits longer exposed walks; summer river days require water-level, heat and swimming-access checks. A low-water crossing can become dangerous quickly after rain. Drive only on public roads and never cross flooded pavement.",
    "links": [
      {
        "href": "/article/texas-hill-country-what-makes-it",
        "label": "Why the Hill Country looks this way"
      },
      {
        "href": "/article/scenic-drives-in-texas",
        "label": "Plan a Hill Country scenic drive"
      },
      {
        "href": "/article/texas-wine-country",
        "label": "Texas wine country"
      },
      {
        "href": "/article/texas-german-belt",
        "label": "German-Texan settlement route"
      },
      {
        "href": "/explore/painted-churches",
        "label": "Painted Churches of Texas"
      }
    ],
    "sources": [
      {
        "label": "Texas Parks & Wildlife — Texas ecoregions",
        "href": "https://tpwd.texas.gov/education/hunter-education/online-course/wildlife-conservation/texas-ecoregions"
      },
      {
        "label": "TxDOT — 2026 Texas Travel Guide",
        "href": "https://www.txdot.gov/about/newsroom/stories/get-your-kicks-with-the-2026-texas-travel-guide.html"
      }
    ]
  },
  "piney-woods": {
    "intro": "Piney Woods means East Texas pine forest, hardwood bottomlands, rivers, reservoirs and historic towns. It is not a single continuous public forest. Timberland ownership, wetland access and protected public tracts vary considerably. The best trip combines one community with a park, lake or designated nature site rather than assuming every wooded road is a trailhead.",
    "bases": [
      [
        "Tyler and surrounding lakes",
        "Rose and railroad history, public lakes, gardens and city services for an easy multi-interest base."
      ],
      [
        "Nacogdoches and Lufkin",
        "Old Texas history, forests and designated public recreation sites."
      ],
      [
        "Jefferson, Marshall and northeast lakes",
        "Historic towns, bayou environments and lake-country outings suited to slower travel."
      ]
    ],
    "safety": "Warm humid weather, mosquitoes and thunderstorms make visitor preparation important. Check the park or reservoir's own access and water notices; lake shorelines are not uniformly public. Ask before entering working timberland.",
    "links": [
      {
        "href": "/article/scenic-drives-in-texas",
        "label": "Piney Woods driving routes"
      },
      {
        "href": "/explore/lakes-rivers",
        "label": "Lakes and rivers"
      },
      {
        "href": "/explore/state-parks",
        "label": "Texas state parks"
      },
      {
        "href": "/article/texas-regions-explained",
        "label": "Seven-region geography"
      }
    ],
    "sources": [
      {
        "label": "Texas Parks & Wildlife — Texas ecoregions",
        "href": "https://tpwd.texas.gov/education/hunter-education/online-course/wildlife-conservation/texas-ecoregions"
      },
      {
        "label": "TxDOT — 2026 Texas Travel Guide",
        "href": "https://www.txdot.gov/about/newsroom/stories/get-your-kicks-with-the-2026-texas-travel-guide.html"
      }
    ]
  },
  "gulf-coast": {
    "intro": "The Gulf Coast is a connected system of barrier islands, estuaries, working ports, fishing communities and marshes. Travel is shaped as much by bays, bridges and ferries as by straight-line mileage. Upper Coast, Coastal Bend and Lower Coast trips have different beaches, wildlife opportunities, weather risks and lodging patterns.",
    "bases": [
      [
        "Galveston and the upper coast",
        "Historic waterfronts, coastal ecology, beach access and barrier-island travel."
      ],
      [
        "Rockport and Port Aransas",
        "Coastal Bend birding, working harbors, islands and beach days."
      ],
      [
        "South Padre Island and the lower coast",
        "Lower Laguna Madre waters, birding habitats and a different beach and estuary setting."
      ]
    ],
    "safety": "Hurricane season, tropical storms, coastal flooding, rip currents and ferry queues can alter access. Check the National Weather Service, local beach advisories and transportation operator notices before travel. Shorebird and turtle nesting habitat require extra care.",
    "links": [
      {
        "href": "/article/scenic-drives-in-texas",
        "label": "Gulf Coast scenic routes"
      },
      {
        "href": "/explore/beaches-coast",
        "label": "Beaches and coastal places"
      },
      {
        "href": "/explore/lakes-rivers",
        "label": "Bays, rivers and water destinations"
      },
      {
        "href": "/events",
        "label": "Coastal events"
      }
    ],
    "sources": [
      {
        "label": "Texas Parks & Wildlife — Texas ecoregions",
        "href": "https://tpwd.texas.gov/education/hunter-education/online-course/wildlife-conservation/texas-ecoregions"
      },
      {
        "label": "TxDOT — 2026 Texas Travel Guide",
        "href": "https://www.txdot.gov/about/newsroom/stories/get-your-kicks-with-the-2026-texas-travel-guide.html"
      }
    ]
  },
  "panhandle": {
    "intro": "Panhandle Plains combines the high plateau's immense open horizons with the sudden canyon breaks of the Caprock. Travel near Amarillo may revolve around Route 66 history and Palo Duro Canyon; farther across the region, ranching towns, farmland and weather are part of the experience. Plan around landscape and available services rather than treating a flat-looking map as a short drive.",
    "bases": [
      [
        "Amarillo and Canyon",
        "Palo Duro Canyon, historic Route 66 attractions and a practical overnight base."
      ],
      [
        "Caprock edge and Quitaque area",
        "Canyon rims, grasslands, public parks and rail-history detours."
      ],
      [
        "Smaller Panhandle towns",
        "Working agricultural communities and museums, with longer gaps between services."
      ]
    ],
    "safety": "Wind, extreme weather, lightning, wildfire risk and winter travel conditions matter. Canyon hikes are exposed in summer; choose a park-authorized route and carry more water than the map seems to require. Rural distances and fuel availability warrant advance planning.",
    "links": [
      {
        "href": "/article/scenic-drives-in-texas",
        "label": "Panhandle scenic driving"
      },
      {
        "href": "/explore/state-parks",
        "label": "State parks and canyon country"
      },
      {
        "href": "/explore/road-trips",
        "label": "Road trip guides"
      },
      {
        "href": "/explore/landscapes",
        "label": "High Plains and caprock landscapes"
      }
    ],
    "sources": [
      {
        "label": "Texas Parks & Wildlife — Texas ecoregions",
        "href": "https://tpwd.texas.gov/education/hunter-education/online-course/wildlife-conservation/texas-ecoregions"
      },
      {
        "label": "TxDOT — 2026 Texas Travel Guide",
        "href": "https://www.txdot.gov/about/newsroom/stories/get-your-kicks-with-the-2026-texas-travel-guide.html"
      }
    ]
  },
  "south-texas": {
    "intro": "South Texas Plains extends across brushlands and ranch country toward historic Rio Grande communities and the Gulf-influenced lower valley. Its cultural landscape predates the modern international boundary. A useful guide pairs ecosystems and outdoor access with Tejano history, local food, museums and historic districts—not just a drive-by view of the border.",
    "bases": [
      [
        "San Antonio's southern approaches",
        "Missions, ranching history and connections toward the brush country."
      ],
      [
        "Laredo and the mid-Rio Grande",
        "Border-city history and the older trade and cultural corridors of the river."
      ],
      [
        "McAllen, Mission and Brownsville",
        "Lower Valley birding, heritage and Gulf-connected landscapes."
      ]
    ],
    "safety": "Summer heat, dry-country distances, floodplain conditions and rapidly changing access at wildlife sites require planning. Respect land boundaries: many working ranches are private. Check current admission and visitor rules at each wildlife refuge or historic site.",
    "links": [
      {
        "href": "/article/scenic-drives-in-texas",
        "label": "South Texas routes"
      },
      {
        "href": "/explore/outdoors",
        "label": "Wildlife and outdoors"
      },
      {
        "href": "/explore/historic-sites",
        "label": "Historic places"
      },
      {
        "href": "/article/texas-cultural-regions-explained",
        "label": "Texas cultural regions"
      }
    ],
    "sources": [
      {
        "label": "Texas Parks & Wildlife — Texas ecoregions",
        "href": "https://tpwd.texas.gov/education/hunter-education/online-course/wildlife-conservation/texas-ecoregions"
      },
      {
        "label": "TxDOT — 2026 Texas Travel Guide",
        "href": "https://www.txdot.gov/about/newsroom/stories/get-your-kicks-with-the-2026-texas-travel-guide.html"
      }
    ]
  },
  "big-bend": {
    "intro": "Big Bend Country ties Chihuahuan Desert basins, mountain ranges, the Rio Grande and widely separated small towns into a distinctive far-West-Texas landscape. It is more remote than most Texas travel regions. An effective itinerary distinguishes Big Bend National Park from Big Bend Ranch State Park and the larger Davis Mountains, Marfa, Alpine and Fort Davis area rather than claiming they are quick adjacent stops.",
    "bases": [
      [
        "Terlingua and Study Butte",
        "Western access to Big Bend National Park and desert town services."
      ],
      [
        "Marathon and the park's eastern approaches",
        "A different base for eastern park access and long-distance scenic routes."
      ],
      [
        "Alpine, Fort Davis and Marfa",
        "Town services, art, astronomy and mountains; allow substantial separate driving time to the park."
      ]
    ],
    "safety": "Carry sufficient fuel and water, use offline maps and expect unreliable phone service. Park road surfaces vary: NPS classifies primitive roads separately from paved sightseeing roads, and some require high-clearance four-wheel-drive vehicles. Summer heat can be dangerous; always check park and border-region notices.",
    "links": [
      {
        "href": "/article/scenic-drives-in-texas",
        "label": "Big Bend scenic-driving guide"
      },
      {
        "href": "/explore/national-parks",
        "label": "National parks"
      },
      {
        "href": "/explore/state-parks",
        "label": "Texas state parks"
      },
      {
        "href": "/explore/landscapes",
        "label": "Desert and mountain landscapes"
      }
    ],
    "sources": [
      {
        "label": "NPS — Big Bend scenic drives",
        "href": "https://www.nps.gov/bibe/planyourvisit/scenic_drives.htm"
      },
      {
        "label": "TxDOT — 2026 Texas Travel Guide",
        "href": "https://www.txdot.gov/about/newsroom/stories/get-your-kicks-with-the-2026-texas-travel-guide.html"
      }
    ]
  },
  "prairies-lakes": {
    "intro": "Prairies & Lakes is a practical travel region spanning Blackland Prairie, Cross Timbers, rolling countryside, reservoirs, county seats and major North and Central Texas cities. It is not one uniform prairie ecosystem. A meaningful itinerary selects one lake, historic town or metropolitan attraction cluster instead of trying to connect every named lake across the state.",
    "bases": [
      [
        "Dallas and Fort Worth",
        "Museums, sports, neighborhoods and easy access to regional day trips."
      ],
      [
        "Denton, McKinney and Waxahachie",
        "Courthouse-square and historic-district trips with prairie-country context."
      ],
      [
        "Waco, Granbury and nearby reservoirs",
        "River, lake and heritage itineraries in different parts of the broad region."
      ]
    ],
    "safety": "Reservoir recreation depends on public boat ramps, water conditions and property boundaries. Heat and thunderstorms affect exposed prairie outings. Traffic through major metropolitan corridors can dominate a travel day, so compare distances and opening hours before combining stops.",
    "links": [
      {
        "href": "/article/scenic-drives-in-texas",
        "label": "Prairie and lake-country drives"
      },
      {
        "href": "/explore/lakes-rivers",
        "label": "Find lakes and rivers"
      },
      {
        "href": "/explore/small-towns",
        "label": "Small towns"
      },
      {
        "href": "/explore/historic-sites",
        "label": "Historic places"
      }
    ],
    "sources": [
      {
        "label": "Texas Parks & Wildlife — Texas ecoregions",
        "href": "https://tpwd.texas.gov/education/hunter-education/online-course/wildlife-conservation/texas-ecoregions"
      },
      {
        "label": "TxDOT — 2026 Texas Travel Guide",
        "href": "https://www.txdot.gov/about/newsroom/stories/get-your-kicks-with-the-2026-texas-travel-guide.html"
      }
    ]
  }
};
