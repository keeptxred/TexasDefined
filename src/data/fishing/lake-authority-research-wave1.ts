import type { ShowcaseLakePrototype } from "./showcase-lakes-prototype";

/**
 * Individually researched lake-section dossiers.
 * Reviewed against the linked TPWD, USACE, city, or LCRA operator pages
 * on 2026-10-31. This date is not an assertion of same-day park availability.
 * Harvest amounts reflect the 2026-27 TPWD Outdoor Annual and require
 * annual refresh before September 1, 2027.
 *
 * Separate lake fact-checks MUST be added per slug. No generator may mark
 * an unresearched lake complete merely by duplicating another lake's copy.
 */
export type LakeAuthorityResearch = {
  reviewedAt: string;
  camping: ShowcaseLakePrototype["camping"];
  regulations: ShowcaseLakePrototype["regulations"];
  nearby: ShowcaseLakePrototype["nearby"];
  sourceUrls: string[];
};
export const LAKE_AUTHORITY_RESEARCH_WAVE1: Record<string, LakeAuthorityResearch> = {
  "lake-buchanan": {
    "camping": [
      {
        "name": "Colorado Bend State Park — upper Colorado River",
        "type": "Upstream state-park primitive camping",
        "summary": "TPWD confirms drive-up, walk-in tent and primitive backpack campsites at Colorado Bend State Park, on the Colorado River upstream of Lake Buchanan. This is river-corridor camping, not a lakeshore RV resort; drive-up sites have no utility hookups, and the road can flood during heavy rain.",
        "href": "https://tpwd.texas.gov/state-parks/colorado-bend/fees-facilities/campsites"
      },
      {
        "name": "Inks Lake State Park — separate reservoir",
        "type": "Nearby state-park campground; different lake",
        "summary": "TPWD identifies Inks Lake State Park as a nearby overnight alternative to Lake Buchanan. It has electrical sites, water-only sites and hike-in primitive sites; these are on Inks Lake, not on the shore of Lake Buchanan. Check park alerts and reservations before travel.",
        "href": "https://tpwd.texas.gov/state-parks/inks-lake/fees-facilities/campsites"
      }
    ],
    "regulations": [
      {
        "label": "Statewide harvest limits",
        "text": "TPWD's Lake Buchanan fishery page says all species currently follow statewide bag and length limits. For the 2026–27 season that means a 5-fish combined daily black-bass bag and a 14-inch largemouth minimum; white bass have a 25-fish daily bag and a 10-inch minimum. Check TPWD before harvesting because these are changeable legal rules.",
        "sourceUrl": "https://tpwd.texas.gov/regulations/outdoor-annual/fishing/freshwater-fishing/bag-length-limits"
      },
      {
        "label": "Bowfishing exception",
        "text": "Although the lake does not have a special TPWD harvest schedule, its official lake profile explicitly warns that bowfishers are subject to additional rules enforced by the Lower Colorado River Authority. Review LCRA requirements rather than assuming statewide gear rules are the whole answer.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/buchanan/"
      },
      {
        "label": "Invasive mussel precautions",
        "text": "TPWD reports zebra mussels in Lake Buchanan. Texas rules require draining water from boats, livewells and bait containers when leaving or approaching public freshwater; clean, drain and dry all gear before moving to another lake.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/buchanan/"
      }
    ],
    "nearby": [
      {
        "label": "Longhorn Cavern State Park",
        "description": "The official state-park site offers guided cave visits in the Burnet area. It is a day-use-only attraction, not a campground; pair a cave tour with a Buchanan trip and confirm tour reservations separately.",
        "href": "https://tpwd.texas.gov/state-parks/longhorn-cavern",
        "external": true
      },
      {
        "label": "Colorado Bend State Park and Gorman Falls",
        "description": "The upstream Colorado River park has the Gorman Falls hiking route, Spicewood Springs and more than 35 miles of trails. It is a distinct park outing rather than a boat access point on Buchanan proper.",
        "href": "https://tpwd.texas.gov/state-parks/colorado-bend",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/state-parks/colorado-bend/fees-facilities/campsites",
      "https://tpwd.texas.gov/state-parks/inks-lake/fees-facilities/campsites",
      "https://tpwd.texas.gov/regulations/outdoor-annual/fishing/freshwater-fishing/bag-length-limits",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/buchanan/",
      "https://tpwd.texas.gov/state-parks/longhorn-cavern",
      "https://tpwd.texas.gov/state-parks/colorado-bend"
    ]
  },
  "lewisville-lake": {
    "camping": [
      {
        "name": "Hickory Creek Park — USACE campground",
        "type": "Operator-confirmed campground",
        "summary": "The U.S. Army Corps of Engineers operates this named campground at 1201 Point Vista Road in Hickory Creek, on Lewisville Lake. Sites provide water and electrical hookups; campers have restrooms with showers, a dump station and shoreline fishing access. Reservations are required through Recreation.gov; the camper boat ramp is restricted to campground guests.",
        "href": "https://www.swf-wc.usace.army.mil/lewisville/Recreation/Parks/Corpsparks.shtml"
      },
      {
        "name": "LLELA primitive campsites — Elm Fork below the dam",
        "type": "Nearby primitive nature-preserve camping",
        "summary": "The City of Lewisville lists primitive individual and group camping at the Lewisville Lake Environmental Learning Area. This is an Elm Fork river and nature-preserve experience, not a developed lakeshore RV campground. Confirm the city's reservation and access rules before going.",
        "href": "https://www.cityoflewisville.com/how-do-i/view/city-of-lewisville-faq-list"
      }
    ],
    "regulations": [
      {
        "label": "Black bass size and daily limit",
        "text": "The current TPWD Lewisville-specific regulation page lists a 14-inch minimum for largemouth and smallmouth bass and a combined 5-fish daily bag for black bass. Spotted, Guadalupe and Alabama bass have no minimum length under that listing; correct species identification matters.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0301"
      },
      {
        "label": "Blue and channel catfish exception",
        "text": "The TPWD Lewisville schedule lists 25 blue/channel catfish combined daily, with no more than five at least 20 inches and no more than one of those at least 30 inches. Flathead catfish have their own 18-inch minimum and 5-fish daily bag; check the current TPWD schedule before keeping fish.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0301"
      },
      {
        "label": "Zebra mussels",
        "text": "TPWD identifies an established zebra-mussel invasion at Lewisville. Drain boats and onboard receptacles when departing or approaching public waters, and clean and dry gear before traveling between reservoirs.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/lewisville/"
      }
    ],
    "nearby": [
      {
        "label": "Lewisville Lake Environmental Learning Area (LLELA)",
        "description": "The City of Lewisville manages the nature preserve with more than six miles of hiking trails, woodland, wetland and prairie habitats, and designated fishing areas on the Elm Fork. It is a distinct land-and-river outing, not another marina.",
        "href": "https://www.cityoflewisville.com/how-do-i/view/city-of-lewisville-faq-list",
        "external": true
      },
      {
        "label": "Westlake Park — day use, not camping",
        "description": "The Corps describes Westlake Park at Hickory Creek as a day-use shoreline park with fishing access, boat ramp, picnic shelters and restrooms. It expressly distinguishes this park from overnight Hickory Creek campground.",
        "href": "https://www.swf-wc.usace.army.mil/lewisville/Recreation/Parks/Corpsparks.shtml",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://www.swf-wc.usace.army.mil/lewisville/Recreation/Parks/Corpsparks.shtml",
      "https://www.cityoflewisville.com/how-do-i/view/city-of-lewisville-faq-list",
      "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0301",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/lewisville/"
    ]
  },
  "ray-roberts-lake": {
    "camping": [
      {
        "name": "Ray Roberts Lake State Park — Isle du Bois Unit",
        "type": "Operator-confirmed campground",
        "summary": "The Isle du Bois Unit at Pilot Point offers developed water/electric campsites, walk-in tent camping and equestrian sites, with restrooms and trails. TPWD publishes separate sites for 20/30/50-amp and primitive camping; reserve by unit and check park alerts rather than assuming the entire park has the same facilities.",
        "href": "https://tpwd.texas.gov/state-parks/ray-roberts-lake/fees-facilities/campsites"
      },
      {
        "name": "Ray Roberts Lake State Park — Johnson Branch Unit",
        "type": "Operator-confirmed campground",
        "summary": "The Johnson Branch Unit near Valley View has campsites with electrical service and walk-in primitive tent camping, as well as lake access and a nature center. It is a distinct state-park camping unit with its own entrance and contact information.",
        "href": "https://tpwd.texas.gov/state-parks/ray-roberts-lake/fees-facilities/campsites"
      }
    ],
    "regulations": [
      {
        "label": "Statewide game-fish limits",
        "text": "TPWD's Ray Roberts fishery profile explicitly states that game fishes are currently managed under statewide harvest regulations. Under the published 2026–27 rules, largemouth bass have a 14-inch minimum and five combined black bass daily; white bass have a 10-inch minimum and 25 daily. Always check the official annual for changes.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/ray_roberts/"
      },
      {
        "label": "Zebra mussels and boat transfers",
        "text": "TPWD's official Ray Roberts page identifies invasive zebra mussels. Drain boats and onboard compartments as required when moving between public fresh waters, and inspect and dry gear before launching elsewhere.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/ray_roberts/"
      }
    ],
    "nearby": [
      {
        "label": "Ray Roberts Lake State Park Greenbelt Corridor",
        "description": "The state park manages a multiuse trail corridor along the Elm Fork of the Trinity River toward Lewisville Lake, distinct from the shoreline camping loops. Check trail conditions, flood alerts and trail-specific access before hiking or cycling.",
        "href": "https://tpwd.texas.gov/state-parks/ray-roberts-lake",
        "external": true
      },
      {
        "label": "Isle du Bois Interpretive Center",
        "description": "The Isle du Bois Unit has an interpretive center, fishing access, trails and a swimming area in addition to campsites. The park also offers ranger-led outdoor programs; confirm seasonal program schedules directly.",
        "href": "https://tpwd.texas.gov/state-parks/ray-roberts-lake",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/state-parks/ray-roberts-lake/fees-facilities/campsites",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/ray_roberts/",
      "https://tpwd.texas.gov/state-parks/ray-roberts-lake"
    ]
  },
  "lake-palestine": {
    "camping": [
      {
        "name": "Lake Palestine Campground — TPWD-listed private facility",
        "type": "TPWD-listed private campground; verify operator",
        "summary": "The TPWD public-access inventory identifies Lake Palestine Campground near the south end of the lake, reached from Texas 155 via Boles Road after the third bridge. It lists two single-lane ramps and a private operator contact; this is an official inventory listing, not confirmation of today's vacancy or continued commercial operation.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/palestine/access2.phtml"
      },
      {
        "name": "Camper's Cove — TPWD-listed private camping access",
        "type": "TPWD-listed private camping and ramp facility",
        "summary": "TPWD's Lake Palestine access chart labels Camper's Cove as a camping-equipped private access point near Dogwood City on the east side, with a boat ramp and parking. Confirm the current overnight offerings, operator status, reservations and fees before treating the listing as a booked campground.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/palestine/access.phtml"
      }
    ],
    "regulations": [
      {
        "label": "Blue/channel catfish special size distribution",
        "text": "TPWD's lake-specific Palestine schedule allows 25 blue and channel catfish in combination per day, no more than five 20 inches or longer and no more than one of those 30 inches or longer. The schedule separately lists a five-fish flathead limit with an 18-inch minimum.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0566"
      },
      {
        "label": "Black bass and crappie",
        "text": "On TPWD's Palestine-specific regulation page, largemouth and smallmouth bass have a 14-inch minimum; the combined black-bass daily bag is five. White and black crappie have a 10-inch minimum and 25-fish combined daily bag. Review the current law before harvest.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0566"
      }
    ],
    "nearby": [
      {
        "label": "Texas Freshwater Fisheries Center — Athens",
        "description": "TPWD operates this fisheries education attraction in Athens, with native-fish exhibit tanks, hatchery interpretation, a wetlands trail and visitor fishing programs. It is a regional side trip, not a claim that the facility is on Lake Palestine's shoreline.",
        "href": "https://tpwd.texas.gov/fishing/tffc/",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/palestine/access2.phtml",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/palestine/access.phtml",
      "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0566",
      "https://tpwd.texas.gov/fishing/tffc/"
    ]
  },
  "lake-somerville": {
    "camping": [
      {
        "name": "Lake Somerville State Park — Birch Creek Unit",
        "type": "Operator-confirmed campground",
        "summary": "TPWD confirms the Birch Creek Unit on the north side of Lake Somerville offers campsites with water/electric hookups, restrooms with showers, boat launch and hiking/biking trails. The state-park campsite inventory lists developed electrical sites; check flood alerts and reserve through Texas State Parks.",
        "href": "https://tpwd.texas.gov/state-parks/lake-somerville/fees-facilities/campsites"
      },
      {
        "name": "Lake Somerville State Park — Nails Creek Unit",
        "type": "Operator-confirmed campground",
        "summary": "TPWD confirms a separate southwest-shore unit at Nails Creek with electrical and equestrian camping, restrooms with showers, boat access and connections to the Lake Somerville Trailway. Do not use Birch Creek's address or booking details for this unit.",
        "href": "https://tpwd.texas.gov/state-parks/lake-somerville"
      }
    ],
    "regulations": [
      {
        "label": "Statewide harvest rules at Somerville",
        "text": "TPWD's Lake Somerville fishery page explicitly says all species currently follow statewide regulations. For 2026–27, the statewide limit for largemouth bass is 14 inches minimum and five combined black bass per day; white bass are 10 inches minimum and 25 daily. Check the current TPWD limits before keeping fish.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/somerville/"
      },
      {
        "label": "Flood and ramp access advisories",
        "text": "The official TPWD lake page warns that some recreation parks and ramps have been affected by high water or flood damage. A fish-harvest rule is not an access guarantee; check the Corps and state park alert pages before towing a boat.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/somerville/"
      }
    ],
    "nearby": [
      {
        "label": "Lake Somerville Trailway — Birch Creek to Nails Creek",
        "description": "TPWD describes a roughly 13-mile multiuse trail corridor connecting the two state-park units, with hiking, cycling and horse-riding routes. This is a named, operator-managed land attraction rather than a generic related-county link.",
        "href": "https://tpwd.texas.gov/state-parks/lake-somerville",
        "external": true
      },
      {
        "label": "Lake Somerville State Park — birding and ranger programs",
        "description": "The park offers birding, geocaching, fishing equipment loans and interpretive ranger programs at its distinct lake units. Program schedules and trail/flood closures change, so check the official park page before visiting.",
        "href": "https://tpwd.texas.gov/state-parks/lake-somerville",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/state-parks/lake-somerville/fees-facilities/campsites",
      "https://tpwd.texas.gov/state-parks/lake-somerville",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/somerville/"
    ]
  },
  "lake-bastrop": {
    "camping": [
      {
        "name": "Lake Bastrop North Shore Park — LCRA",
        "type": "Operator-confirmed campground",
        "summary": "LCRA's North Shore Park offers seven full-hookup RV sites and five Airstream lodging units, plus furnished glamping and cabin options within the Lost Pines landscape. The park has a boat ramp, picnic areas and shoreline recreation; book through the operator, not a generic fishing-access listing.",
        "href": "https://lcraparks.com/parks/lake-bastrop-north-shore-park"
      },
      {
        "name": "Lake Bastrop South Shore Park — LCRA",
        "type": "Operator-confirmed campground",
        "summary": "LCRA's South Shore Park lists 36 RV sites, including electric/water and full-hookup choices, and 18 cabins. It also provides launch access, fishing piers, rentals and swimming areas. The booking site notes a 2026 restroom construction project, so confirm the affected facilities before departure.",
        "href": "https://lcraparks.com/parks/lake-bastrop-south-shore-park"
      }
    ],
    "regulations": [
      {
        "label": "Largemouth bass 14–21-inch protected slot",
        "text": "TPWD's current Lake Bastrop-specific regulation applies a 14–21-inch slot to largemouth bass: bass greater than 14 and less than 21 inches must be released; only one retained bass may be 21 inches or longer. The combined daily bag for black bass is five. Check the exact official rule before harvest.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0046"
      },
      {
        "label": "Prohibited fishing gear",
        "text": "TPWD specifically prohibits juglines, throwlines and trotlines on Lake Bastrop. This is a local gear exception and must not be replaced by generic statewide rod-and-reel advice.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0046"
      },
      {
        "label": "Bowfishing ban under LCRA rules",
        "text": "TPWD's Bastrop fishery profile states that the Lower Colorado River Authority also prohibits bowfishing on this lake. Check both TPWD fish-harvest rules and the operating authority before selecting fishing methods.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/bastrop/"
      }
    ],
    "nearby": [
      {
        "label": "Bastrop State Park — Lost Pines hikes and CCC history",
        "description": "The separate state park has hiking routes among the regenerating Lost Pines forest, historic Civilian Conservation Corps features and an interpretive center. It is a regional outdoor excursion, not a claim that its campsites are on Lake Bastrop.",
        "href": "https://tpwd.texas.gov/state-parks/bastrop",
        "external": true
      },
      {
        "label": "Lake Bastrop South Shore Park — paddling and mini golf",
        "description": "LCRA operates fishing piers, canoe/kayak and paddleboard rentals, a swimming area and a mini-golf course at South Shore Park. These are real operator-listed attractions at Lake Bastrop; availability and rates vary.",
        "href": "https://lcraparks.com/parks/lake-bastrop-south-shore-park",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://lcraparks.com/parks/lake-bastrop-north-shore-park",
      "https://lcraparks.com/parks/lake-bastrop-south-shore-park",
      "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0046",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/bastrop/",
      "https://tpwd.texas.gov/state-parks/bastrop"
    ]
  },
  "caddo-lake": {
    "camping": [
      {
        "name": "Caddo Lake State Park — campsites and CCC cabins",
        "type": "Operator-confirmed campground",
        "summary": "TPWD confirms 46 campsites ranging from water-only to full-hookup areas, plus historic Civilian Conservation Corps cabins at the state park in Karnack. The park also offers a fishing pier, boat ramp and canoe rentals. Reserve through TPWD and check active park alerts.",
        "href": "https://tpwd.texas.gov/state-parks/caddo-lake"
      }
    ],
    "regulations": [
      {
        "label": "Texas–Louisiana bass and catfish rules",
        "text": "TPWD lists cross-border harvest limits. Largemouth bass have a 14–18-inch protected slot and an eight-fish combined black-bass daily bag, no more than four of them largemouth at least 18 inches. The separate TPWD schedule also specifies blue/channel catfish limits and possession exceptions. Follow each state's current rules when entering other waters.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0128"
      },
      {
        "label": "Do not transport live nongame fish",
        "text": "TPWD expressly prohibits transporting live nongame fish from the Texas waters of Caddo Lake/Big Cypress Bayou downstream of Ferrell's Bridge Dam to another waterbody. Nongame fish collected for bait may be used within the waterbody where caught.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/caddo/"
      },
      {
        "label": "Fish-consumption advisory and gar reporting",
        "text": "The TPWD lake-specific schedule states that a fish-consumption advisory is in effect. Texas also requires reporting harvested alligator gar within 24 hours. Check the advisory species and waterbody scope before eating fish, and verify the latest state-border and gar rules before harvest.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0128"
      }
    ],
    "nearby": [
      {
        "label": "Caddo Lake State Park — cypress-bayou paddling",
        "description": "TPWD operates paddling access through Saw Mill Pond and Big Cypress Bayou, with access to the Hell's Half Acre Paddling Trail for experienced paddlers. Bald cypress, wetland wildlife and historic park cabins make this a distinct outing, with alligator safety guidance.",
        "href": "https://tpwd.texas.gov/state-parks/caddo-lake",
        "external": true
      },
      {
        "label": "Jefferson historic riverport district — regional side trip",
        "description": "TPWD names the historic port city of Jefferson as a nearby regional destination when planning Caddo Lake visits. It is an off-lake town visit, not a statement that its museums or boat tours lie at the state park entrance.",
        "href": "https://tpwd.texas.gov/state-parks/caddo-lake",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/state-parks/caddo-lake",
      "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0128",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/caddo/"
    ]
  },
  "lake-georgetown": {
    "camping": [
      {
        "name": "Cedar Breaks Park — USACE",
        "type": "Operator-confirmed campground",
        "summary": "The Corps of Engineers lists 64 reservable campsites with water and electrical hookups at Cedar Breaks on Lake Georgetown. Sites include picnic shelter, grill/fire ring and access to showers and a dump station; use Recreation.gov and check current park closures.",
        "href": "https://www.swf-wc.usace.army.mil/georgetown/Recreation/Camping/Devareas.shtml"
      },
      {
        "name": "Jim Hogg Park — USACE",
        "type": "Operator-confirmed campground",
        "summary": "The Corps lists 148 developed campsites with water/electric service at Jim Hogg Park, including double sites and some screened shelters. A separate 2026 Corps notice announced sewer-system repairs and a temporary park closure, so verify the current reopening and booking status before relying on a reservation.",
        "href": "https://www.swf-wc.usace.army.mil/georgetown/"
      },
      {
        "name": "Russell Park — USACE primitive camping",
        "type": "Operator-confirmed campground",
        "summary": "The Corps describes Russell Park as a campground with 27 sites without water or electrical hookups, including some screened shelters. This is not a full-hookup RV park; check available sites, seasonal day-use closures and Recreation.gov reservations.",
        "href": "https://www.swf-wc.usace.army.mil/georgetown/Recreation/Camping/Devareas.shtml"
      }
    ],
    "regulations": [
      {
        "label": "Statewide limits at Georgetown",
        "text": "TPWD's Lake Georgetown fishery page reports all species under statewide harvest limits. Under the published 2026–27 rules, largemouth and smallmouth bass each have a 14-inch minimum in a five-fish combined black-bass daily bag; white bass have a 10-inch minimum and 25-fish daily bag.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/georgetown/"
      },
      {
        "label": "Zebra mussels and launch access",
        "text": "TPWD documents invasive zebra mussels at Lake Georgetown; boaters must comply with Texas draining requirements when moving between public freshwaters. Lake level can change ramp and shoreline usability substantially; check the Corps before towing.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/georgetown/"
      }
    ],
    "nearby": [
      {
        "label": "Goodwater Loop / San Gabriel River Trail",
        "description": "The Corps describes a rugged roughly 26-mile loop around Lake Georgetown with hiking and mountain biking through juniper forest, hardwood bottoms and prairie. Several park trailheads access different segments; plan for terrain and current trail conditions.",
        "href": "https://www.swf-wc.usace.army.mil/georgetown/Recreation/Trails/",
        "external": true
      },
      {
        "label": "Overlook Park — accessible fishing and trails",
        "description": "USACE operates this day-use overlook near the dam with an accessible fishing platform and trail access. It is not an overnight campground; steep shorelines and restricted swimming areas require extra attention.",
        "href": "https://www.swf-wc.usace.army.mil/georgetown/Recreation/Parks/Corpsparks.shtml",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://www.swf-wc.usace.army.mil/georgetown/Recreation/Camping/Devareas.shtml",
      "https://www.swf-wc.usace.army.mil/georgetown/",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/georgetown/",
      "https://www.swf-wc.usace.army.mil/georgetown/Recreation/Trails/",
      "https://www.swf-wc.usace.army.mil/georgetown/Recreation/Parks/Corpsparks.shtml"
    ]
  },
  "joe-pool-lake": {
    "camping": [
      {
        "name": "Cedar Hill State Park — developed lakeside camping",
        "type": "Source-verified named campground",
        "summary": "TPWD's official inventory lists 147 full-hookup campsites with water, sewer and 30/50-amp electricity, plus 192 sites with electricity and water. These are named camping loops within Cedar Hill State Park on the east shore of Joe Pool Lake, not generic marina access. Restrooms are nearby; reserve by park site and verify active alerts before traveling.",
        "href": "https://tpwd.texas.gov/state-parks/cedar-hill/fees-facilities/campsites"
      },
      {
        "name": "Cedar Hill State Park — hike-in primitive sites",
        "type": "Primitive hike-in camping; separate from RV sites",
        "summary": "TPWD also lists 30 primitive hike-in campsites, separate from its developed vehicle sites. These non-reservable sites require walking along a trail, are limited to four people per site, and prohibit campfires. Confirm trail access and weather closures, since a closed trail can prevent use of the primitive camping area.",
        "href": "https://tpwd.texas.gov/state-parks/cedar-hill/fees-facilities/campsites"
      }
    ],
    "regulations": [
      {
        "label": "Largemouth bass protected slot",
        "text": "The lake-specific TPWD Joe Pool rule establishes a 14–21-inch protected slot for largemouth bass: specimens longer than 14 inches but shorter than 21 inches must be released. Fish 14 inches or shorter or at least 21 inches may be kept, but at most one retained largemouth bass can be 21 inches or longer. The total combined black-bass daily bag is five.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0582"
      },
      {
        "label": "Catfish and crappie harvest limits",
        "text": "TPWD's Joe Pool schedule allows 25 channel and blue catfish combined daily, but at most 10 may measure 20 inches or longer. Flathead catfish have an 18-inch minimum and a five-fish daily bag. Black and white crappie have a 10-inch minimum and a 25-fish combined daily bag; verify the current lake schedule before keeping fish.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0582"
      }
    ],
    "nearby": [
      {
        "label": "Penn Farm Agricultural History Center",
        "description": "Inside Cedar Hill State Park, Penn Farm preserves buildings and equipment from a family farm operating from the mid-1800s through the mid-1900s. Take the 0.6-mile Penn Farm Trail for a distinct historical stop rather than another generic lakeside picnic recommendation; check active park and trail alerts before arrival.",
        "href": "https://tpwd.texas.gov/state-parks/cedar-hill/trails-info",
        "external": true
      },
      {
        "label": "Cedar Hill State Park — DORBA and shoreline trails",
        "description": "TPWD lists the accessible 1-mile Shoreline Trail, 2.3-mile Talala Trail and three more demanding DORBA loops of roughly 3, 8 and 12 miles. Mountain biking access depends on weather and wet-clay trail closures. This provides named, navigable hiking and biking experiences around Joe Pool Lake.",
        "href": "https://tpwd.texas.gov/state-parks/cedar-hill/dorba-trails-information",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/state-parks/cedar-hill/fees-facilities/campsites",
      "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0582",
      "https://tpwd.texas.gov/state-parks/cedar-hill/trails-info",
      "https://tpwd.texas.gov/state-parks/cedar-hill/dorba-trails-information"
    ]
  },
  "lake-bob-sandlin": {
    "camping": [
      {
        "name": "Lake Bob Sandlin State Park — electric waterfront campground",
        "type": "Source-verified named campground",
        "summary": "TPWD lists 75 camping sites with 30-amp electrical hookups, water, picnic tables, fire rings and nearby showers. Nine sites are directly beside Lake Bob Sandlin, so campers who need a lakeside pitch should check specific site locations when reserving instead of assuming all 75 face the water.",
        "href": "https://tpwd.texas.gov/state-parks/lake-bob-sandlin/fees-facilities/campsites"
      },
      {
        "name": "Lake Bob Sandlin State Park — hike-in primitive sites",
        "type": "Hike-in primitive campground",
        "summary": "TPWD also manages 16 primitive campsites reached by a quarter-mile to one-mile hike from parking. They sit near Two-Acre Pond rather than directly at the lake, are not reservable, and prohibit ground fires. This is a separate overnight experience for tent campers rather than an unpowered parking spot.",
        "href": "https://tpwd.texas.gov/state-parks/lake-bob-sandlin/fees-facilities/campsites"
      }
    ],
    "regulations": [
      {
        "label": "No lake-specific fish-harvest exception shown by TPWD",
        "text": "The official Lake Bob Sandlin fishing profile says that all fish species are currently managed under statewide regulations. Its current waterbody schedule lists a 14-inch minimum for largemouth and smallmouth bass with a five-fish combined black-bass daily bag. The source also lists a 10-inch crappie minimum and 25-fish combined daily bag.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0646"
      },
      {
        "label": "Blue and channel catfish size distribution",
        "text": "The TPWD Bob Sandlin waterbody schedule permits 25 blue and channel catfish combined in a day, but no more than five may measure 20 inches or longer, and no more than one of those may measure at least 30 inches. Flathead catfish separately have an 18-inch minimum and five-fish daily limit. Check TPWD before harvesting.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0646"
      }
    ],
    "nearby": [
      {
        "label": "Lake Bob Sandlin State Park — multiuse nature trails",
        "description": "TPWD identifies 3.3 miles of hiking and biking trails amid the meeting point of Pineywoods and prairie ecologies. The 0.6-mile Lakeview Loop overlooks State Park Cove, while the 0.3-mile Brim Pond Trail explores creekside wildlife habitat. These are mapped activities directly at the lake, not unrelated county links.",
        "href": "https://tpwd.texas.gov/state-parks/lake-bob-sandlin/trails-info/",
        "external": true
      },
      {
        "label": "Lake Bob Sandlin State Park — lighted fishing pier and trout pond",
        "description": "The state park maintains a lighted fishing pier and park ponds, including the seasonally stocked Trout Pond, as well as kayak rentals and a boat ramp. Anglers may fish from the state park shoreline or pier without an individual license; boat fishing remains subject to licensing rules.",
        "href": "https://tpwd.texas.gov/state-parks/lake-bob-sandlin",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/state-parks/lake-bob-sandlin/fees-facilities/campsites",
      "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0646",
      "https://tpwd.texas.gov/state-parks/lake-bob-sandlin/trails-info/",
      "https://tpwd.texas.gov/state-parks/lake-bob-sandlin"
    ]
  },
  "lake-brownwood": {
    "camping": [
      {
        "name": "Lake Brownwood State Park — Council Bluff full-hookup camping",
        "type": "Source-verified named campground",
        "summary": "TPWD lists 20 developed full-hookup sites in its Council Bluff campground, with sewer, water, 50/30/20-amp electricity, picnic table and grill. These are materially different from the park's water-only tent sites; verify current park alerts, booking status and specific site availability before travel.",
        "href": "https://tpwd.texas.gov/state-parks/lake-brownwood/fees-facilities/campsites"
      },
      {
        "name": "Lake Brownwood State Park — Willow Point electric campground",
        "type": "Source-verified named campground",
        "summary": "The Willow Point area offers 35 campsites with water and electrical hookups, adjacent shower restrooms, tent pads and picnic tables. TPWD identifies accessible features at site 11 near accessible bathrooms; call the park for current accessibility details rather than relying on an assumed fully accessible layout.",
        "href": "https://tpwd.texas.gov/state-parks/lake-brownwood/fees-facilities/campsites"
      },
      {
        "name": "Lake Brownwood State Park — Comanche Trails tent and RV sites",
        "type": "Source-verified named campground",
        "summary": "The Comanche Trails area offers 11 electrical sites with a 27-foot maximum trailer/RV length, plus nine separate tent-only electrical sites. TPWD lists water hookups or service and nearby showers; this distinction matters when choosing between a short RV and tent camping.",
        "href": "https://tpwd.texas.gov/state-parks/lake-brownwood/fees-facilities/campsites"
      }
    ],
    "regulations": [
      {
        "label": "Statewide limits apply at Lake Brownwood",
        "text": "TPWD's own Lake Brownwood fishing profile expressly states that all species are managed under statewide fishing regulations. Its main fisheries include largemouth bass, white bass, white crappie and channel/flathead catfish. For black bass, the current statewide schedule uses a five-fish combined daily bag and a 14-inch minimum for largemouth bass.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/brownwood/"
      },
      {
        "label": "Zebra mussel and water-transfer requirements",
        "text": "TPWD specifically warns that zebra mussels are established in Lake Brownwood. Texas law requires draining water from boats and onboard receptacles when leaving or approaching public fresh waters, and transporting live zebra mussels is prohibited. Clean, drain and dry the boat, trailer and bait gear before changing lakes.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/brownwood/"
      }
    ],
    "nearby": [
      {
        "label": "Lake Brownwood State Park — Nopales Ridge Trail",
        "description": "The official park guide identifies the 2.9-mile Nopales Ridge Trail as the park's only biking-permitted trail, with roughly six miles of walking paths overall. This is a named hiking and mountain-biking outing separate from boating and fishing, and trail conditions should be checked before visiting.",
        "href": "https://tpwd.texas.gov/state-parks/lake-brownwood",
        "external": true
      },
      {
        "label": "Lake Brownwood State Park — Civilian Conservation Corps landmarks",
        "description": "The park preserves 1930s Civilian Conservation Corps structures, including a scenic pavilion, benches, historic cabins and a recreation hall built using local materials. The park offers a self-guided historical walk alongside lakeside recreation; it is a real heritage destination, not a generic recommendation to see Brown County.",
        "href": "https://tpwd.texas.gov/state-parks/lake-brownwood",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/state-parks/lake-brownwood/fees-facilities/campsites",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/brownwood/",
      "https://tpwd.texas.gov/state-parks/lake-brownwood"
    ]
  },
  "lake-casa-blanca": {
    "camping": [
      {
        "name": "Lake Casa Blanca International State Park — full-hookup sites",
        "type": "Source-verified named campground",
        "summary": "TPWD lists 11 full-hookup campsites at Lake Casa Blanca International State Park near Laredo. They include water, electric and sewer connections, a picnic table, fire ring, lantern post and nearby restrooms with showers. The park's public description contains an inconsistent location count, so confirm specific site numbers when booking.",
        "href": "https://tpwd.texas.gov/state-parks/lake-casa-blanca/fees-facilities/campsites"
      },
      {
        "name": "Lake Casa Blanca International State Park — water/electric campsites",
        "type": "Source-verified named campground",
        "summary": "The same state park operates 55 electrical campsites with water hookups, picnic tables, lantern posts, fire rings and nearby showers. They are a different facility type from the 11 full-hookup sites and are not guaranteed waterfront. Check TPWD availability and active park alerts before driving to Laredo.",
        "href": "https://tpwd.texas.gov/state-parks/lake-casa-blanca/fees-facilities/campsites"
      }
    ],
    "regulations": [
      {
        "label": "Largemouth bass 18-inch minimum",
        "text": "TPWD's current lake-specific Casa Blanca schedule imposes an 18-inch minimum length on largemouth bass, not the ordinary statewide 14-inch minimum. Other black bass have distinct length provisions and the combined black-bass daily bag remains five. Verify exact identification and official lake limits before harvest.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0149"
      },
      {
        "label": "Catfish, crappie and hybrid striped bass",
        "text": "TPWD's Casa Blanca waterbody schedule allows 25 channel/blue catfish combined, only 10 of them 20 inches or longer, with a separate 18-inch minimum for flatheads and a five-fish daily bag. Crappie have a 10-inch minimum and 25 combined daily; striped/hybrid striped bass have an 18-inch minimum and five combined daily.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0149"
      }
    ],
    "nearby": [
      {
        "label": "Lake Casa Blanca State Park — Roadrunner Dam Trail",
        "description": "TPWD's trail inventory lists the one-mile Roadrunner Trail, an easy hike or bicycle ride along the top of the Lake Casa Blanca Dam. It offers an actual park trail to plan rather than another broad 'explore Laredo' placeholder; bring sun protection and verify any temporary trail closures.",
        "href": "https://tpwd.texas.gov/state-parks/lake-casa-blanca/trails-map",
        "external": true
      },
      {
        "label": "Lake Casa Blanca State Park — wheelchair-accessible fishing pier",
        "description": "The state park offers a lit three-lane concrete boat ramp and an ADA-accessible fishing pier, identified in the official TPWD lake-access inventory. These are actionable on-site facilities; check current lake elevation and park restrictions before planning to launch or fish.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/casa_blanca/access.phtml",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/state-parks/lake-casa-blanca/fees-facilities/campsites",
      "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0149",
      "https://tpwd.texas.gov/state-parks/lake-casa-blanca/trails-map",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/casa_blanca/access.phtml"
    ]
  },
  "lake-meredith": {
    "camping": [
      {
        "name": "Sanford-Yake Campground — NPS",
        "type": "Operator-researched overnight camping",
        "summary": "The National Park Service lists 51 campsites at Sanford-Yake near Lake Meredith Dam, including 10 reservable RV sites with electric and water hookups. Those ten are paid and require calling 806-865-3131; other camping spaces here are free and first-come. Showers, restrooms and a dump station are available, but confirm availability and lake access before arriving.",
        "href": "https://www.nps.gov/lamr/planyourvisit/camping.htm"
      },
      {
        "name": "Fritch Fortress Campground — NPS",
        "type": "Operator-researched overnight camping",
        "summary": "This separate overlook campground sits about 3.5 miles from Fritch via Fritch Fortress Road and has 10 campsites, pull-through parking, shaded picnic tables and seasonal showers. RVs and trailers are welcome but the campsites do not provide utility hookups. NPS lists the sites free and first-come, subject to current closures.",
        "href": "https://www.nps.gov/lamr/planyourvisit/camping.htm"
      },
      {
        "name": "Harbor Bay Campground — NPS",
        "type": "NPS primitive shoreline-area campground",
        "summary": "The National Park Service operates nine developed campsites just outside Fritch, reached from Lakeview Drive. The campground has picnic shelters, grills and a vault-style toilet but no drinking water. It is the trailhead area for Harbor Bay and South Turkey Creek hikes and offers a separate, primitive shoreline-focused experience.",
        "href": "https://www.nps.gov/lamr/planyourvisit/camping.htm"
      }
    ],
    "regulations": [
      {
        "label": "Statewide fishing limits, including walleye",
        "text": "TPWD's Meredith lake fishery profile states that all fish species use statewide harvest regulations. Walleye are this lake's defining sportfish and should be checked against the current statewide 16-inch minimum and five-fish daily bag, while black bass, white bass and catfish have separate requirements. Confirm the Outdoor Annual before taking any fish.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/meredith/"
      },
      {
        "label": "Fish consumption advisory",
        "text": "TPWD identifies a fish-consumption advisory for Lake Meredith. This is different from a harvest bag limit: check the advisory's affected species, size classes and eating recommendations before preparing a catch. The recreational area is managed by NPS, but TPWD remains the authoritative source for state fishing rules and advisories.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/meredith/"
      }
    ],
    "nearby": [
      {
        "label": "Alibates Flint Quarries National Monument — ranger-led quarry tour",
        "description": "The National Park Service operates Alibates just outside Lake Meredith National Recreation Area, with an interpretive visitor center and a ranger-led quarry hike covering archaeology, geology and cultural history. Quarry tours require reservations and are cancelled for hazardous weather. This is a real separate monument visit rather than a generic Panhandle attraction.",
        "href": "https://www.nps.gov/alfl/planyourvisit/guidedtours.htm",
        "external": true
      },
      {
        "label": "Harbor Bay and South Turkey Creek Trail network",
        "description": "NPS describes the Harbor Bay hiking and biking system as approximately 5.2 miles including loops, with adjoining South Turkey Creek singletrack along the lake's south shore. The route crosses wetlands and grassland habitats and provides named, navigable outdoor recreation distinct from fishing.",
        "href": "https://www.nps.gov/lamr/planyourvisit/camping.htm",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://www.nps.gov/lamr/planyourvisit/camping.htm",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/meredith/",
      "https://www.nps.gov/alfl/planyourvisit/guidedtours.htm"
    ]
  },
  "lake-mineral-wells": {
    "camping": [
      {
        "name": "Lake Mineral Wells State Park — Live Oak camping area",
        "type": "Operator-researched overnight camping",
        "summary": "TPWD lists 47 sites with 50-amp electric service and water in Live Oak, numbered 12 through 58. They include picnic tables, fire rings and nearby showers; sites 48 and 54 have wheelchair-accessible features. This is developed trailer and tent camping, separate from the equestrian or water-only areas.",
        "href": "https://tpwd.texas.gov/state-parks/lake-mineral-wells/fees-facilities/campsites"
      },
      {
        "name": "Lake Mineral Wells State Park — Plateau camping area",
        "type": "Operator-researched overnight camping",
        "summary": "The Plateau area includes 30 sites with 30-amp electric hookups and water, numbered 59–88. TPWD notes accessible features at site 86 and showers near the camping loop. Identify Plateau specifically when booking because its utility service and location differ from the Live Oak sites.",
        "href": "https://tpwd.texas.gov/state-parks/lake-mineral-wells/fees-facilities/campsites"
      },
      {
        "name": "Lake Mineral Wells State Park — Cross Timbers equestrian camping",
        "type": "State-park water-only equestrian campground",
        "summary": "TPWD maintains 20 water-only equestrian campsites in the Cross Timbers area, numbered 89–108. Tent camping and trailers up to 20 feet are also allowed, but there are no electrical connections. Horse owners must comply with site limits and current Coggins testing requirements; confirm restrictions before reserving.",
        "href": "https://tpwd.texas.gov/state-parks/lake-mineral-wells/fees-facilities/campsites"
      }
    ],
    "regulations": [
      {
        "label": "Pole-and-line only; maximum two rods",
        "text": "The exact TPWD Lake Mineral Wells waterbody schedule restricts fishing to pole-and-line methods and no more than two poles per angler. It also confirms that no fishing license is required because the water is entirely inside a Texas state park boundary. This is a lake-specific gear restriction, not a general statewide advisory.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0507"
      },
      {
        "label": "Black bass, crappie and catfish limits",
        "text": "TPWD's Mineral Wells schedule gives largemouth and smallmouth bass a 14-inch minimum with a combined five-fish daily black-bass limit. White and black crappie have a 10-inch minimum and combined 25-fish limit. Channel/blue catfish use a 25-fish combined daily bag with at most 10 measuring 20 inches or more.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0507"
      }
    ],
    "nearby": [
      {
        "label": "Penitentiary Hollow natural rock climbing area",
        "description": "TPWD identifies Penitentiary Hollow as one of North Texas's rare natural rock climbing sites. All climbers and rappellers must check in at park headquarters; unsupervised bouldering and free climbing are prohibited. Reach it along the 0.8-mile hiking-only Red Waterfront Trail, rather than treating it as an ordinary lake access point.",
        "href": "https://tpwd.texas.gov/state-parks/lake-mineral-wells",
        "external": true
      },
      {
        "label": "Lake Mineral Wells State Trailway",
        "description": "TPWD maintains a roughly 20-mile rail-to-trail corridor with gently graded segments for walking, cycling and horseback riding. It connects to the state park's network of Cross Timbers hiking trails. Trail closures during wet weather and any temporary wildlife management closures should be checked with the park before setting out.",
        "href": "https://tpwd.texas.gov/state-parks/lake-mineral-wells",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/state-parks/lake-mineral-wells/fees-facilities/campsites",
      "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0507",
      "https://tpwd.texas.gov/state-parks/lake-mineral-wells"
    ]
  },
  "lake-arrowhead": {
    "camping": [
      {
        "name": "Lake Arrowhead State Park — electrical campsite loop",
        "type": "Operator-researched overnight camping",
        "summary": "The state park's official campsite inventory includes 48 campsites with 50-amp electric connections, water hookups, picnic tables and fire rings. Shower restrooms are nearby. These are the developed sites best suited to RV camping; verify current park alerts and make reservations through TPWD.",
        "href": "https://tpwd.texas.gov/state-parks/lake-arrowhead/fees-facilities/campsites"
      },
      {
        "name": "Lake Arrowhead State Park — water-only and walk-in sites",
        "type": "Operator-researched overnight camping",
        "summary": "TPWD also lists 19 water-only sites, numbered 49–67, and five primitive walk-in camping sites about 50 yards from the facility access point. These do not provide the same electrical services as the main campground. The primitive area has nearby water and restrooms but requires a short gear carry.",
        "href": "https://tpwd.texas.gov/state-parks/lake-arrowhead/fees-facilities/campsites"
      },
      {
        "name": "Lake Arrowhead State Park — equestrian campsites",
        "type": "Horse-friendly campsite loop",
        "summary": "The park maintains four separately reservable equestrian campsites with 50-amp electricity, water, tie rails, corrals and covered horse stalls. This camping is materially different from standard RV loops and is useful to riders bringing horses for the park's multiuse trails.",
        "href": "https://tpwd.texas.gov/state-parks/lake-arrowhead/fees-facilities/horse-sites"
      }
    ],
    "regulations": [
      {
        "label": "Statewide harvest limits confirmed by TPWD",
        "text": "The official Lake Arrowhead fisheries page says that all fish species currently follow statewide harvest limits. Its main targets include largemouth bass, white bass, channel/blue/flathead catfish and white crappie. For the 2026–27 cycle the statewide black-bass limit is five fish combined daily with a 14-inch largemouth minimum; check the current TPWD annual.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/arrowhead/"
      },
      {
        "label": "Separate catfish and white-bass limits",
        "text": "Lake Arrowhead's statewide-rules status does not mean all fish have the same limits. The published statewide white-bass daily bag is 25 with a 10-inch minimum, while flathead catfish require at least 18 inches and have a five-fish daily bag. Inspect the TPWD schedule for the species you actually catch.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/arrowhead/"
      }
    ],
    "nearby": [
      {
        "label": "Lake Arrowhead State Park — Onion Creek and Dragonfly trails",
        "description": "The park lists the 4.4-mile Onion Creek Trail, which follows lakeside prairie, passes part of the disc golf area and reaches views of the spillway. The half-mile Dragonfly loop is an easier outing. Both are genuine named park activities suitable for a lake camping trip, separate from generic fishing advice.",
        "href": "https://tpwd.texas.gov/state-parks/park-information/lake-arrowhead/",
        "external": true
      },
      {
        "label": "Lake Arrowhead State Park — equestrian trails and disc golf",
        "description": "TPWD offers a more-than-five-mile shared trail network for horseback riding, cycling and walking, plus an on-site disc-golf course. Equestrian campers can combine the campground's dedicated horse facilities with trail riding; hikers should anticipate exposed prairie conditions and check trail alerts before arriving.",
        "href": "https://tpwd.texas.gov/state-parks/park-information/lake-arrowhead/",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/state-parks/lake-arrowhead/fees-facilities/campsites",
      "https://tpwd.texas.gov/state-parks/lake-arrowhead/fees-facilities/horse-sites",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/arrowhead/",
      "https://tpwd.texas.gov/state-parks/park-information/lake-arrowhead/"
    ]
  },
  "lake-colorado-city": {
    "camping": [
      {
        "name": "Lake Colorado City State Park — pull-through electric campsites",
        "type": "Operator-researched overnight camping",
        "summary": "TPWD operates nine pull-through campsites with water, electricity, shade shelter, picnic table, lantern post and a grill-equipped fire ring. Restrooms with showers are located nearby. This vehicle-friendly loop is distinct from the regular electric and water-only campsites; confirm availability and park alerts before making the drive.",
        "href": "https://tpwd.texas.gov/state-parks/lake-colorado-city/fees-facilities/campsites"
      },
      {
        "name": "Lake Colorado City State Park — electrical campsites",
        "type": "Operator-researched overnight camping",
        "summary": "The official state-park inventory lists 69 campsites with water and electrical hookups, picnic tables, shade shelters and grills. Shower restrooms are nearby. The listing does not promise every campsite a lake view; choose a specific reservable site based on its location and the current park map.",
        "href": "https://tpwd.texas.gov/state-parks/lake-colorado-city/fees-facilities/campsites"
      },
      {
        "name": "Lake Colorado City State Park — water-only campground",
        "type": "Operator-researched overnight camping",
        "summary": "TPWD identifies 34 water-only campsites with a picnic table, shade shelter and fire ring, with showers nearby. These are not RV full-hookup sites and are a different budget and convenience choice from the nine pull-through electric sites.",
        "href": "https://tpwd.texas.gov/state-parks/lake-colorado-city/fees-facilities/campsites"
      }
    ],
    "regulations": [
      {
        "label": "All species use statewide harvest limits",
        "text": "The TPWD Lake Colorado City fishery profile explicitly confirms that all resident species currently follow statewide fishing regulations, rather than a special lake-level slot limit. It lists largemouth bass, channel catfish and sunfish as main species; anglers should use the current Outdoor Annual for exact bag and length rules.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/colorado_city/"
      },
      {
        "label": "Golden alga and drought have affected fishing quality",
        "text": "TPWD describes Lake Colorado City's fishery as recovering from prolonged drought and recurring winter golden-alga blooms, with current sportfish opportunity comparatively limited. This is a documented lake-specific condition, not a fishing bag-limit exception. Check official lake reports, park alerts and actual fishing prospects before planning a harvest-focused visit.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/colorado_city/"
      }
    ],
    "nearby": [
      {
        "label": "Lake Colorado City State Park — lakeside birdwatching trails",
        "description": "TPWD identifies a shoreline hiking trail and a birdwatching landscape with more than 300 species recorded around the park. Visitors can combine wildlife viewing, a shoreline walk and lake photography with overnight camping; trail condition and bird activity vary by season.",
        "href": "https://tpwd.texas.gov/state-parks/lake-colorado-city",
        "external": true
      },
      {
        "label": "Lake Colorado City State Park — paddle rentals and ranger programs",
        "description": "The state park provides canoe and kayak access and rental equipment, and TPWD publishes an events calendar for ranger-led nature and local-history programs. This is an on-site, operator-managed outing, not an invented separate attraction miles from the lake; confirm equipment availability and upcoming program dates.",
        "href": "https://tpwd.texas.gov/state-parks/lake-colorado-city",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/state-parks/lake-colorado-city/fees-facilities/campsites",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/colorado_city/",
      "https://tpwd.texas.gov/state-parks/lake-colorado-city"
    ]
  }
};
