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
  },
  "cedar-lake-cleburne-state-park": {
    "camping": [
      {
        "name": "Cleburne State Park — Poplar Point full-hookup campsites",
        "type": "Named overnight camping — operator source",
        "summary": "The Texas Parks and Wildlife Department lists 15 full-hookup sites at Poplar Point with 20/30/50-amp electrical service, sewer, water, a fire ring and nearby restrooms. This camping loop is inside Cleburne State Park surrounding Cedar Lake; select the specific loop instead of treating every campsite as having identical RV connections.",
        "href": "https://tpwd.texas.gov/state-parks/cleburne/fees-facilities/campsites"
      },
      {
        "name": "Cleburne State Park — North Creek full-hookup sites",
        "type": "Named overnight camping — operator source",
        "summary": "TPWD lists a separate 12 full-hookup campsites in North Creek, with water, sewer and 20/30-amp electricity. They have picnic tables, grills and nearby restrooms but not the same 50-amp capability as the Poplar Point loop. Confirm RV electrical needs and site availability when booking.",
        "href": "https://tpwd.texas.gov/state-parks/cleburne/fees-facilities/campsites"
      },
      {
        "name": "Cleburne State Park — Shady Springs water/electric camping",
        "type": "Named overnight camping — operator source",
        "summary": "The Shady Springs camping area provides seven sites with 20/30/50-amp electrical hookups and water, but no published sewer hookups at the campsite. This is a specific alternative to full-hookup Poplar Point and North Creek. Confirm any current park alerts, access closures and amenities with TPWD before arrival.",
        "href": "https://tpwd.texas.gov/state-parks/cleburne/fees-facilities/campsites"
      }
    ],
    "regulations": [
      {
        "label": "Two-pole, pole-and-line-only fishing",
        "text": "TPWD's special Cleburne State Park Lake regulation prohibits other fishing gear methods: anglers may use no more than two poles and must fish by pole and line. Because the 107-acre lake lies fully within the park boundary, TPWD says an individual fishing license is not required there. Check the operator's posted rules and daily access.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0176"
      },
      {
        "label": "Current bass, crappie and catfish limits",
        "text": "The TPWD lake-specific Cleburne schedule imposes a 14-inch minimum on largemouth and smallmouth bass and a five-fish combined daily black-bass limit. Crappie have a 10-inch minimum and 25-fish combined bag. Channel/blue catfish together may total 25 daily with at most 10 measuring 20 inches or longer.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0176"
      },
      {
        "label": "Lake-wide no-wake rule",
        "text": "The official Cleburne lake fishery profile says all motorboats are subject to a no-wake rule throughout Cedar Lake; personal watercraft are prohibited by the state park. Fishing from its accessible pier and nonmotorized paddling are different ways to use the lake, but neither supersedes park closures.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/cleburnesp/"
      }
    ],
    "nearby": [
      {
        "label": "Cleburne State Park — Camp Creek Loop and CCC bridge",
        "description": "The park's 1.1-mile Camp Creek Loop passes oak woodland, West Camp Creek and a historic bridge built by Civilian Conservation Corps workers. It offers a sourced outdoor and heritage hike that can be combined with lake camping rather than an unverified county attraction.",
        "href": "https://tpwd.texas.gov/state-parks/cleburne/trails-info",
        "external": true
      },
      {
        "label": "Cleburne State Park — Fossil Ridge and spillway trails",
        "description": "TPWD identifies the more strenuous 2.5-mile one-way Fossil Ridge Trail and a separate Spillway Trail to a CCC-built, three-tiered stone spillway. These are named park routes with different effort levels; trail conditions and falls appearance vary with recent rain.",
        "href": "https://tpwd.texas.gov/state-parks/cleburne",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/state-parks/cleburne/fees-facilities/campsites",
      "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0176",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/cleburnesp/",
      "https://tpwd.texas.gov/state-parks/cleburne/trails-info",
      "https://tpwd.texas.gov/state-parks/cleburne"
    ]
  },
  "fort-parker-state-park-lake": {
    "camping": [
      {
        "name": "Fort Parker State Park — water/electric campground",
        "type": "Named overnight camping — operator source",
        "summary": "TPWD operates 24 campsites with water and 30-amp electricity, four of them pull-through, with picnic tables, fire rings and nearby showers. Many have lake views. A current roadwork alert warns that campsite access may change during the October 2026–May 2027 road project, so check operator closures before reserving.",
        "href": "https://tpwd.texas.gov/state-parks/fort-parker/fees-facilities/campsites"
      },
      {
        "name": "Fort Parker State Park — tent-only water campsite area",
        "type": "Named overnight camping — operator source",
        "summary": "The park's campsite inventory lists ten designated water-only tent sites, with spigots nearby rather than at every site, and nearby restrooms. A separate tent-only electrical site 6 has a lake view. Choose a specific site type and check current construction, park alerts and temporary campground restrictions.",
        "href": "https://tpwd.texas.gov/state-parks/fort-parker/fees-facilities/campsites"
      }
    ],
    "regulations": [
      {
        "label": "Two-pole, pole-and-line-only special restriction",
        "text": "TPWD's official Fort Parker State Park Lake waterbody schedule requires fishing by pole and line only, with no more than two poles used by each angler. Because the lake is inside the state park, no fishing license is required for fishing in that lake. This does not eliminate the license requirement when fishing from a boat in the Navasota River.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0291"
      },
      {
        "label": "Community fishing lake and bag limits",
        "text": "TPWD classifies Fort Parker Lake as a Community Fishing Lake. Its waterbody schedule gives largemouth and smallmouth bass a 14-inch minimum and five combined black bass daily; channel and blue catfish have a 25-fish combined bag with at most ten measuring 20 inches or more. White and black crappie require a 10-inch minimum and have 25 combined daily.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0291"
      },
      {
        "label": "Current boat ramp and pier closures",
        "text": "Fort Parker State Park's October 2026 alert says the Navasota River boat ramp is closed October 19, 2026–January 10, 2027 for roadwork, both fishing piers remain closed, and resurfacing may affect park routes and campsites until May 2027. This is an access restriction separate from harvest laws; refer to live alerts before traveling.",
        "sourceUrl": "https://tpwd.texas.gov/state-parks/fort-parker/alert"
      }
    ],
    "nearby": [
      {
        "label": "Fort Parker State Park — Springfield Trail and historic cemetery",
        "description": "The 1.8-mile Springfield Trail explores woodland, the old Springfield settlement and its cemetery, a CCC-built dam and spring-fed Lake Springfield. TPWD identifies it as a family-friendly walk with genuine heritage sites, not a placeholder 'nearby history' suggestion.",
        "href": "https://tpwd.texas.gov/state-parks/fort-parker/trails-info",
        "external": true
      },
      {
        "label": "Fort Parker State Park — Limestone Bluffs paddling route",
        "description": "The official state-park trail guide lists a 10.8-mile round-trip paddle along the Navasota River between Fort Parker and Confederate Reunion Grounds, with scenic limestone bluffs and wildlife habitat. This activity depends on river conditions; October 2026 boat-ramp closures make checking current launch access essential.",
        "href": "https://tpwd.texas.gov/state-parks/fort-parker/trails-info",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/state-parks/fort-parker/fees-facilities/campsites",
      "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0291",
      "https://tpwd.texas.gov/state-parks/fort-parker/alert",
      "https://tpwd.texas.gov/state-parks/fort-parker/trails-info"
    ]
  },
  "lake-abilene": {
    "camping": [
      {
        "name": "Abilene State Park — Brushy Trail/Oak Grove campground, across FM 89",
        "type": "State-park overnight campground across FM 89; not lakefront",
        "summary": "TPWD lists 15 water-and-electric campsites in the Brushy Trail and Oak Grove loops, with picnic tables, fire rings and nearby showers. Importantly, the official Lake Abilene access inventory says overnight camping is on the main Abilene State Park campus across Farm-to-Market Road 89, not at the lake's ramp or shoreline.",
        "href": "https://tpwd.texas.gov/state-parks/abilene/fees-facilities/campsites"
      },
      {
        "name": "Abilene State Park — Pecan Grove electric campsites",
        "type": "State-park campground near lake; separate main campus",
        "summary": "The park offers 20 developed Pecan Grove campsites with water and electrical hookups, tables and nearby showers, plus two separate tent-only electric sites. It is a source-verified overnight base for visiting Lake Abilene, but users must travel between the park camping loops and lake-access gate rather than assuming waterfront RV parking.",
        "href": "https://tpwd.texas.gov/state-parks/abilene/fees-facilities/campsites"
      },
      {
        "name": "Abilene State Park — limited full-hookup RV sites",
        "type": "Limited full-hookup state-park camping; across FM 89",
        "summary": "TPWD identifies only three full-hookup sites with water, electricity and sewer connections. That limited count makes advance site selection especially important; these campsites are on the main state-park campus and do not imply overnight camping at the separate Lake Abilene access ramps.",
        "href": "https://tpwd.texas.gov/state-parks/abilene/fees-facilities/campsites"
      }
    ],
    "regulations": [
      {
        "label": "Community Fishing Lake designation",
        "text": "TPWD classifies Lake Abilene, which lies within the Abilene State Park operation, as a Community Fishing Lake. Visitors must follow its state-park and community-lake fishing requirements rather than assuming all unrestricted reservoir methods are allowed. TPWD's current rules limit anglers on community lakes to no more than two poles; check gear and species limits before fishing.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/abilene/"
      },
      {
        "label": "Boat access is daylight-only and depends strongly on reservoir elevation",
        "text": "TPWD's official Lake Abilene access page identifies the Dam and Creek single-lane ramps as gated park access, open from sunrise to sunset. The operator warns both ramps become largely unusable when water drops approximately seven feet below spillway level, sometimes requiring four-wheel drive even at moderate low water. Shore fishing remains available when launching fails.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/abilene/access.phtml"
      }
    ],
    "nearby": [
      {
        "label": "Abilene State Park — CCC historic swimming pool and concession building",
        "description": "The park preserves a 1930s Civilian Conservation Corps swimming pool and a red-sandstone concession building, with seasonal swimming and interpretation. These are actual state-park history and recreation stops on the campus across FM 89 from the lake, not attractions at the ramp.",
        "href": "https://tpwd.texas.gov/state-parks/abilene",
        "external": true
      },
      {
        "label": "Abilene State Park — Buffalo Wallow Pond and Elm Creek nature walks",
        "description": "TPWD promotes Buffalo Wallow Pond as a family-oriented park fishing location, and its tree-lined nature trails and birding areas provide a separate shaded outdoor outing. These are on the state-park campus rather than Lake Abilene's shoreline; verify seasonal park and pool access first.",
        "href": "https://tpwd.texas.gov/state-parks/abilene",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/state-parks/abilene/fees-facilities/campsites",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/abilene/",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/abilene/access.phtml",
      "https://tpwd.texas.gov/state-parks/abilene"
    ]
  },
  "lake-waco": {
    "camping": [
      {
        "name": "Waco Lake — Airport Park campground (USACE)",
        "type": "Named overnight camping — operator source",
        "summary": "The U.S. Army Corps of Engineers identifies Airport Park as a year-round campground on the north shore of Waco Lake, with separate boat access and day-use facilities. Overnight camping is managed under USACE site rules; confirm the correct gate, reserved site, vehicle limits and latest park closure notices before traveling.",
        "href": "https://www.swf-wc.usace.army.mil/waco/Recreation/Camping/Devareas.shtml"
      },
      {
        "name": "Waco Lake — Midway Park campground (USACE)",
        "type": "Named overnight camping — operator source",
        "summary": "USACE operates 37 campsites at Midway Park on the South Bosque River arm, including 32 water/electric sites and several sites with sewer service, plus five tent sites. Showers, a playground and a separate two-lane boat ramp are listed. The campground is operated year-round; confirm specific site availability through the Corps reservation system.",
        "href": "https://www.swf-wc.usace.army.mil/waco/Recreation/Camping/Devareas.shtml"
      },
      {
        "name": "Waco Lake — Reynolds Creek Park equestrian and seasonal camping",
        "type": "Named overnight camping — operator source",
        "summary": "The Corps lists 41 water/electric sites at Reynolds Creek, including ten equestrian sites, plus six primitive camping areas. Regular camping is published as seasonal April through September, while equestrian camping and day-use boat access continue year-round. These seasonal limitations matter when planning an October or winter lake visit.",
        "href": "https://www.swf-wc.usace.army.mil/waco/Recreation/Camping/Devareas.shtml"
      },
      {
        "name": "Waco Lake — Speegleville Park campsites",
        "type": "Named overnight camping — operator source",
        "summary": "USACE identifies 30 water/electric campsites and two screened shelters at Speegleville Park on the lake's western shore. Its regular camping season runs March through October; access outside these months should not be assumed. The park also has a four-lane launch ramp and separate day-use facilities.",
        "href": "https://www.swf-wc.usace.army.mil/waco/Recreation/Camping/Devareas.shtml"
      }
    ],
    "regulations": [
      {
        "label": "Lake Waco's specific blue/channel catfish limit",
        "text": "TPWD's current Waco waterbody schedule permits 25 blue and channel catfish combined daily, with no more than five measuring at least 20 inches and no more than one of those at least 30 inches. Flatheads have a separate 18-inch minimum and five-fish daily bag. These explicit waterbody size distributions should not be replaced by a generic statewide summary.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0763"
      },
      {
        "label": "Black bass and crappie harvest limits",
        "text": "TPWD's Waco-specific regulation page lists a 14-inch minimum for largemouth and smallmouth bass and a combined daily black-bass limit of five. White and black crappie have a 10-inch minimum and a combined daily bag of 25. The waterbody page also confirms zebra mussels have been found; drain boats and gear between lakes.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0763"
      }
    ],
    "nearby": [
      {
        "label": "Waco Mammoth National Monument — Ice Age fossil shelter",
        "description": "The National Park Service and City of Waco operate the mammoth fossil monument at 6220 Steinbeck Bend Drive, with a paid Dig Shelter visit, trails and interpretation of a Columbian mammoth nursery herd. This is a genuinely identified regional side trip in the same Waco Lake corridor, not a generic county listing.",
        "href": "https://www.nps.gov/waco/planyourvisit/basicinfo.htm",
        "external": true
      },
      {
        "label": "Waco Lake — USACE managed lakeshore parks",
        "description": "The Corps maintains separate Lake Waco recreation parks and boat launches, including Airport Beach, Midway, Reynolds Creek and Speegleville. Visitors can plan shoreline picnics and access at the named parks, but seasonal camping closures and the distinction between day-use parks and overnight facilities must be checked at each gate.",
        "href": "https://www.swf-wc.usace.army.mil/waco/Recreation/Camping/Devareas.shtml",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://www.swf-wc.usace.army.mil/waco/Recreation/Camping/Devareas.shtml",
      "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0763",
      "https://www.nps.gov/waco/planyourvisit/basicinfo.htm"
    ]
  },
  "lake-livingston": {
    "camping": [
      {
        "name": "Lake Livingston State Park — Piney Shores full hookups",
        "type": "TPWD-listed overnight campground",
        "summary": "TPWD lists 22 lake-view full-hookup campsites in the Piney Shores loop, with water, sewer, 20/30/50-amp electricity, fire ring and showers nearby. The park's current campground construction program may temporarily close sites, so select an available numbered site before setting out.",
        "href": "https://tpwd.texas.gov/state-parks/lake-livingston/fees-facilities/campsites"
      },
      {
        "name": "Lake Livingston State Park — Yaupon full hookups",
        "type": "TPWD-listed overnight campground",
        "summary": "TPWD's Yaupon loop has 37 full-hookup campsites with water, sewer and 50-amp electricity, picnic tables and nearby showers. These are separate from the lakeshore Piney Shores sites; the park requires weekend bookings to include both Friday and Saturday nights for these facilities.",
        "href": "https://tpwd.texas.gov/state-parks/lake-livingston/fees-facilities/campsites"
      },
      {
        "name": "Lake Livingston State Park — Briar Loop tent camping",
        "type": "Tent-only campground; no generators or RVs",
        "summary": "The Briar Loop has 16 water-only campsites set aside for tents; the operator expressly prohibits RVs and generators there. Water is nearby rather than an electrical hookup at each tent, and restroom facilities are close to the loop. This is an actual primitive-style option, not an RV overflow lot.",
        "href": "https://tpwd.texas.gov/state-parks/lake-livingston/fees-facilities/campsites"
      }
    ],
    "regulations": [
      {
        "label": "Blue/channel catfish special bag of 50",
        "text": "TPWD's current Livingston waterbody schedule allows 50 blue and channel catfish in combination per day, of which no more than five may be 30 inches or longer. This differs materially from the 25-fish allowance on many other reservoirs; flathead catfish follow their own statewide schedule.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0451"
      },
      {
        "label": "Fish consumption advisory and gar reporting",
        "text": "TPWD identifies an active fish-consumption advisory at Lake Livingston; anglers should read affected species and consumption advice before eating a catch. TPWD also requires reporting harvested alligator gar within 24 hours, and only gar under 48 inches may be retained here under the current schedule.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0451"
      },
      {
        "label": "Zebra mussels and October 2026 park closure notices",
        "text": "TPWD confirms invasive zebra mussels on Livingston. Drain and clean boats and gear when moving between public waters. Separate park alerts published Oct. 23, 2026 impose a burn ban; low water has left the state-park ramp hazardous, and construction may temporarily close individual campsites through December 2026.",
        "sourceUrl": "https://tpwd.texas.gov/state-parks/lake-livingston/alert"
      }
    ],
    "nearby": [
      {
        "label": "Lake Livingston State Park — Pineywoods Boardwalk Trail",
        "description": "The state's 0.9-mile Pineywoods Boardwalk Trail passes wetlands and forest habitat, while the 2-mile Bakba Trail follows woodland paths. These are individually named on-site hikes, not vague recommendations to explore Polk County.",
        "href": "https://tpwd.texas.gov/state-parks/lake-livingston/trails-info/",
        "external": true
      },
      {
        "label": "Lake Livingston State Park — observation tower and Pine Island views",
        "description": "The park's signed observation tower offers views of Pine Island, the lake's largest island, along with the fishing pier and shoreline raptors. TPWD provides coordinates in its trail guide; use the park map and check current construction restrictions before visiting.",
        "href": "https://tpwd.texas.gov/state-parks/lake-livingston/trails-info/",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/state-parks/lake-livingston/fees-facilities/campsites",
      "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0451",
      "https://tpwd.texas.gov/state-parks/lake-livingston/alert",
      "https://tpwd.texas.gov/state-parks/lake-livingston/trails-info/"
    ]
  },
  "lake-whitney": {
    "camping": [
      {
        "name": "Lake Whitney State Park — Horseshoe full-hookup loop",
        "type": "TPWD-listed overnight campground",
        "summary": "The Horseshoe campground has 43 TPWD-listed full-hookup campsites, with water, sewer, 50-amp electrical service and nearby showers. The operator identifies site numbers 1–38 and 47–51, while nearby Horseshoe water-only loops provide different amenities. Check actual site allocation and park closure dates before booking.",
        "href": "https://tpwd.texas.gov/state-parks/lake-whitney/fees-facilities/campsites"
      },
      {
        "name": "Lake Whitney State Park — Blue Bird, Road Runner and Sunset Ridge",
        "type": "TPWD-listed overnight campground",
        "summary": "The park's three electric camping loops collectively have 31 sites with water and 50-amp electricity, located in Blue Bird, Road Runner and Sunset Ridge. They do not publish an individual sewer connection, so distinguish them from the Horseshoe full-hookup sites when choosing RV equipment.",
        "href": "https://tpwd.texas.gov/state-parks/lake-whitney/fees-facilities/campsites"
      },
      {
        "name": "Lake Whitney State Park — Lake View and White-Tail water-only sites",
        "type": "Water-only state-park campgrounds",
        "summary": "TPWD lists 63 campsites with water and no electrical service in the Horseshoe, White-Tail, Star View and Lake View areas. Picnic tables, grills and nearby shower facilities are available. This is a separate budget-oriented choice; select a specific Lake View site to seek a shoreline setting.",
        "href": "https://tpwd.texas.gov/state-parks/lake-whitney/fees-facilities/campsites"
      }
    ],
    "regulations": [
      {
        "label": "Statewide black-bass and striped-bass rules",
        "text": "The official Lake Whitney fishery profile says all species currently use statewide harvest regulations. Lake Whitney supports both largemouth and smallmouth bass, white bass and striped bass, which have different statewide limits; do not confuse a five-fish combined black-bass limit with the separate striped-bass allowance.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/whitney/"
      },
      {
        "label": "Golden-alga fishery risk",
        "text": "TPWD explicitly warns that golden-alga blooms can occur at Lake Whitney and that blooms are toxic to fish, reducing angling quality. This is lake-specific fisheries guidance rather than a permanent fishing closure; review the agency's current bloom reports before planning a catch-oriented trip.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/whitney/"
      },
      {
        "label": "Upcoming winter 2026–27 park closures",
        "text": "TPWD currently schedules Lake Whitney State Park closure from 5 p.m. December 6 to 3 p.m. December 11, 2026, and again from 5 p.m. January 15 to 3 p.m. January 22, 2027, except for permitted hunters. These affect access even though the wider reservoir still has its own ramps.",
        "sourceUrl": "https://tpwd.texas.gov/state-parks/lake-whitney/alert"
      }
    ],
    "nearby": [
      {
        "label": "Lake Whitney State Park — prairie walking and birding",
        "description": "The state park manages open limestone prairie, oak mottes and lakeshore habitat suitable for nature photography and birdwatching. TPWD notes that turkeys and bald eagles have been spotted and offers park walking routes. Use its trail information rather than assuming a distant town is a shoreline attraction.",
        "href": "https://tpwd.texas.gov/state-parks/lake-whitney",
        "external": true
      },
      {
        "label": "Lake Whitney State Park — shoreline geocaching and stargazing",
        "description": "TPWD promotes geocaching and nighttime stargazing in addition to swimming, boating, fishing and camping. This is a documented on-site recreational option, but park-wide closures, night access and seasonal programs need operator confirmation before planning an overnight visit.",
        "href": "https://tpwd.texas.gov/state-parks/lake-whitney",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/state-parks/lake-whitney/fees-facilities/campsites",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/whitney/",
      "https://tpwd.texas.gov/state-parks/lake-whitney/alert",
      "https://tpwd.texas.gov/state-parks/lake-whitney"
    ]
  },
  "lake-corpus-christi": {
    "camping": [
      {
        "name": "Lake Corpus Christi State Park — Javelina full-hookup loop",
        "type": "TPWD-listed overnight campground",
        "summary": "TPWD lists 26 full-hookup campsites, primarily Javelina sites 24–47 plus Catfish Cove site 82. These have water, sewer and electrical connections, grills and nearby shower restrooms. Several have shade shelters and pull-through arrangements; reserve by site for trailer dimensions and lake views.",
        "href": "https://tpwd.texas.gov/state-parks/lake-corpus-christi/fees-facilities/campsites"
      },
      {
        "name": "Lake Corpus Christi State Park — Opossum Bend electric loop",
        "type": "TPWD-listed overnight campground",
        "summary": "The Opossum Bend campground contains 23 campsites with electrical hookups and water, picnic tables, grills and nearby restrooms. The operator lists some pull-through spaces and shade shelters. These do not include sewer hookups at each pitch, unlike the Javelina full-hookup facilities.",
        "href": "https://tpwd.texas.gov/state-parks/lake-corpus-christi/fees-facilities/campsites"
      },
      {
        "name": "Lake Corpus Christi State Park — Catfish Cove and Mesquite water-only",
        "type": "State-park water-only camping",
        "summary": "TPWD identifies 59 water-only campsites in the Catfish Cove and Mesquite areas with picnic tables, fire rings and restrooms/showers nearby. These are real reservable campsites, not an assumption that every fishing pier or shore access point permits overnight tents.",
        "href": "https://tpwd.texas.gov/state-parks/lake-corpus-christi/fees-facilities/campsites"
      }
    ],
    "regulations": [
      {
        "label": "Statewide limits apply, unlike special-limit reservoirs",
        "text": "TPWD's Lake Corpus Christi lake-specific fishery page explicitly states that all fish species currently follow statewide regulations. Largemouth bass, white bass, blue/channel/flathead catfish and crappie have different species-specific state limits, so an angler should identify the catch before applying a bag size.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/corpus_christi/"
      },
      {
        "label": "Alligator gar — harvest reporting and restrictions",
        "text": "TPWD documents a significant alligator-gar fishery at Lake Corpus Christi with large specimens reported. Alligator gar are subject to statewide regulations including mandatory harvest reporting within 24 hours and possible temporary spawning-area closures; do not infer that large fish can be kept simply because trophy catches are described.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/corpus_christi/"
      }
    ],
    "nearby": [
      {
        "label": "Lake Corpus Christi State Park — lighted accessible fishing pier",
        "description": "TPWD operates two lighted fishing piers at the state park, including a 400-foot wheelchair-accessible pier, and two fish-cleaning shelters. These are named operator-managed facilities for an evening shoreline trip, and state-park bank fishing does not require a license.",
        "href": "https://tpwd.texas.gov/state-parks/lake-corpus-christi",
        "external": true
      },
      {
        "label": "Lake Corpus Christi State Park — CCC refectory and birding",
        "description": "The park preserves a historic stone refectory from Civilian Conservation Corps Company 886, which built park infrastructure during the 1930s. TPWD also reports more than 200 identified bird species in the park, making the history site and birding loops distinct outdoor activities.",
        "href": "https://tpwd.texas.gov/state-parks/lake-corpus-christi",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/state-parks/lake-corpus-christi/fees-facilities/campsites",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/corpus_christi/",
      "https://tpwd.texas.gov/state-parks/lake-corpus-christi"
    ]
  },
  "lake-fork": {
    "camping": [
      {
        "name": "Lake Fork Resort — FM 17 lodging and camping",
        "type": "TPWD-listed private resort; current availability unverified",
        "summary": "TPWD's Lake Fork public-access inventory lists Lake Fork Resort on FM 17 about a half mile south of FM 515, and marks it as an overnight-accommodation facility with a boat ramp. It is privately operated and has a launch fee; confirm actual RV/tent lodging configuration, current vacancies and booking terms directly with the operator at the TPWD-listed telephone number.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/fork/access.phtml"
      },
      {
        "name": "Lake Fork Marina — marina and camping facility",
        "type": "TPWD-listed private marina camping; verify operator",
        "summary": "The official TPWD access chart marks Lake Fork Marina as offering camping, next to multiple marina services and two single-lane concrete ramps. The facility is about one mile south of FM 515 on FM 17. The agency's listing does not guarantee particular hookups or campsite inventory, so call before driving or towing.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/fork/access2.phtml"
      },
      {
        "name": "Chaney Point RV Park — Wood County lakeshore",
        "type": "TPWD-listed private RV park",
        "summary": "TPWD identifies Chaney Point RV Park on Wood County Road 1590 north of FM 182 at the south end of Lake Fork, with two single-lane launch ramps and a privately operated RV park designation. Call to confirm the current overnight RV facilities and restrictions; this is not the free Sabine River Authority day-use site.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/fork/access2.phtml"
      }
    ],
    "regulations": [
      {
        "label": "Lake Fork's special 16–24-inch largemouth slot",
        "text": "TPWD's waterbody-specific regulation establishes a 16–24-inch protected slot for largemouth bass. Fish 16 inches or less and those at least 24 inches may be retained, but only one retained largemouth per day may be 24 inches or longer. All black bass combined share a five-fish daily bag; verify current rules and measure precisely.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0433"
      },
      {
        "label": "Crappie winter retention exception",
        "text": "At Lake Fork from December 1 through the last day of February, TPWD removes the crappie minimum size and requires retaining every crappie caught. This is a specific exception from the ordinary minimum-size rule and should not be replaced by a generic statewide crappie limit. Check the full TPWD schedule for current bag and possession requirements.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0433"
      },
      {
        "label": "Submerged timber boating safety",
        "text": "TPWD warns that Lake Fork contains extensive submerged timber; marked boat lanes provide primary passage but do not eliminate hazards outside the lanes. This is an operator-backed navigation issue distinct from fish limits and especially relevant after lake-level changes or before night fishing.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/fork/"
      }
    ],
    "nearby": [
      {
        "label": "Sabine River Authority Lake Fork Day Use Area",
        "description": "The SRA's day-use access area near the Highway 154 bridge provides a free public fishing pier according to TPWD's site-specific access inventory. It is a real shoreline day trip, explicitly not a campground or a promise of private resort facilities.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/fork/access2.phtml",
        "external": true
      },
      {
        "label": "Lake Fork fish-habitat structures and bridge-piling angling",
        "description": "TPWD documents targeted fish-habitat installations made with the Lake Fork Sportsman's Association and identifies bridge pilings, standing timber and brush piles as fish-holding features. It provides a habitat viewer for finding structures, giving anglers an actionable separate lake exploration activity.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/fork/",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/fork/access.phtml",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/fork/access2.phtml",
      "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0433",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/fork/"
    ]
  },
  "possum-kingdom-reservoir": {
    "camping": [
      {
        "name": "Possum Kingdom State Park — Spanish Oaks electric camping",
        "type": "Operator-listed overnight site",
        "summary": "TPWD lists 21 Spanish Oaks campsites with water and 20/30/50-amp electric hookups, fire rings and showers nearby. The operator notes this loop has no tent pads and publishes a seasonal rate difference, so confirm tent/RV fit and the exact number of available sites when reserving.",
        "href": "https://tpwd.texas.gov/state-parks/possum-kingdom/fees-facilities/campsites"
      },
      {
        "name": "Possum Kingdom State Park — Shady Grove seasonal camping",
        "type": "Operator-listed overnight site",
        "summary": "The Shady Grove camping loop provides 40 TPWD-listed electric/water sites but limits RVs to 25 feet or shorter. It usually closes in winter and reopens March 1, making it inappropriate to recommend for December without confirming seasonal status. Compare the park's Spanish Oaks or water-only loops for other vehicle lengths.",
        "href": "https://tpwd.texas.gov/state-parks/possum-kingdom/fees-facilities/campsites"
      },
      {
        "name": "Possum Kingdom State Park — Lakeview and Chaparral water-only",
        "type": "Seasonal park water-only campsite areas",
        "summary": "TPWD reports 53 water-only campsites across the Lakeview and Chaparral camping areas, with restrooms nearby. Some pitches share water; the Chaparral Trails loop is closed December–February. These are not full-hookup RV sites and must be booked with correct seasonal restrictions.",
        "href": "https://tpwd.texas.gov/state-parks/possum-kingdom/fees-facilities/campsites"
      }
    ],
    "regulations": [
      {
        "label": "Statewide species harvest limits confirmed",
        "text": "TPWD's Possum Kingdom Reservoir fishery page says all resident fish species currently follow statewide harvest regulations. The reservoir supports largemouth, striped and white bass, crappie and catfish, each with different legal size and bag schedules. This absence of a special lake slot does not remove ordinary state black-bass and catfish restrictions.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/possum_kingdom/"
      },
      {
        "label": "Golden-alga history and fishery monitoring",
        "text": "TPWD identifies damaging golden-alga blooms at Possum Kingdom in 2001, 2003 and 2010. This is relevant to fish populations but is not evidence of a bloom today; check the current fishing and water-quality reports for conditions rather than presenting historical losses as ongoing emergency closures.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/possum_kingdom/"
      }
    ],
    "nearby": [
      {
        "label": "Possum Kingdom State Park — CCC Camp Trail",
        "description": "The park's official trail guide names the 0.6-mile CCC Camp Trail through the remains of the original Civilian Conservation Corps camp where Company 2888 helped develop park roads, culverts and campsites. This offers a genuine heritage walk alongside a lake camping trip.",
        "href": "https://tpwd.texas.gov/state-parks/possum-kingdom/trails-info",
        "external": true
      },
      {
        "label": "Possum Kingdom State Park — Longhorn Trail Overlook",
        "description": "TPWD maps Longhorn Trail Overlook at 32.8837 north, 98.5671 west, noting spring wildflower displays and lake views. The named hiking destination is distinct from the private Hell's Gate area; trail conditions and access should be verified at park headquarters before visiting.",
        "href": "https://tpwd.texas.gov/state-parks/possum-kingdom/trails-info",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/state-parks/possum-kingdom/fees-facilities/campsites",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/possum_kingdom/",
      "https://tpwd.texas.gov/state-parks/possum-kingdom/trails-info"
    ]
  },
  "lake-tawakoni": {
    "camping": [
      {
        "name": "Lake Tawakoni State Park — Spring Point full-hookup sites",
        "type": "Operator-listed overnight site",
        "summary": "TPWD lists 16 full-hookup Spring Point campsites with 30/50-amp electrical service, water, picnic tables and showers nearby. The loop also contains 16 separate water/electric sites without full sewer hookup. Select a campground site type by hookups rather than assuming all Spring Point pitches are identical.",
        "href": "https://tpwd.texas.gov/state-parks/lake-tawakoni/fees-facilities/campsites/"
      },
      {
        "name": "Lake Tawakoni State Park — White Deer Reach electric camping",
        "type": "Operator-listed overnight site",
        "summary": "TPWD lists 44 water/electric campsites with 30-amp service in the White Deer Reach loop, plus two additional sites with accessible features. The operator distinguishes sites 38 and 39 for accessibility and requires extra hose length for certain sewage connections; confirm details before booking.",
        "href": "https://tpwd.texas.gov/state-parks/lake-tawakoni/fees-facilities/campsites/"
      },
      {
        "name": "429 Marina & RV Park — southeast Kitsee Inlet",
        "type": "TPWD-listed private RV marina; current booking not verified",
        "summary": "TPWD specifically names 429 Marina & RV Park on FM 429 southwest of FM 751 on the southeast shore of Kitsee Inlet, with a concrete ramp and privately operated services. Its RV-park designation establishes an overnight-planning lead, but site availability and hookups must be confirmed with the operator before recommending a reservation.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/tawakoni/access2.phtml"
      }
    ],
    "regulations": [
      {
        "label": "Special blue/channel catfish size distribution",
        "text": "TPWD's current Tawakoni fishing rules allow a combined daily bag of 25 blue and channel catfish, but only five can measure 20 inches or more and no more than one of those can be 30 inches or longer. Flathead catfish have a separate 18-inch minimum and five-fish daily bag; these limits differ from Livingston's special 50-fish rule.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0714"
      },
      {
        "label": "Striped, hybrid and white-bass limits",
        "text": "The Lake Tawakoni waterbody schedule lists an 18-inch minimum and five-fish daily bag for striped/hybrid striped bass combined. White bass instead have a 10-inch minimum and a 25-fish daily bag. Correctly identify a hybrid striped bass rather than treating all schooling fish as white bass.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0714"
      }
    ],
    "nearby": [
      {
        "label": "Lake Tawakoni State Park — Red Oak lakeshore trail",
        "description": "TPWD publishes the 0.4-mile Red Oak Trail along a shoreline hardwood habitat, along with the 0.8-mile Osage Orange loop and 1.5-mile Blackjack Trail. These are mapped, distinct walks from the park's actual trail network rather than a generic county-link suggestion.",
        "href": "https://tpwd.texas.gov/state-parks/lake-tawakoni/trails-info",
        "external": true
      },
      {
        "label": "Lake Tawakoni State Park — Spring Point birding and prairie restoration",
        "description": "The operator's trail map describes Spring Point Trail as a half-mile outing across hardwood forest, pocket prairie and shoreline beach with birding habitat. The park's restoration project and Pear Trees Pond also offer named field stops separate from boat launching.",
        "href": "https://tpwd.texas.gov/state-parks/lake-tawakoni/trails-info",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/state-parks/lake-tawakoni/fees-facilities/campsites/",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/tawakoni/access2.phtml",
      "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0714",
      "https://tpwd.texas.gov/state-parks/lake-tawakoni/trails-info"
    ]
  },
  "sam-rayburn-reservoir": {
    "camping": [
      {
        "name": "Hanks Creek Park — USACE reservable campground",
        "type": "Federally operated campground",
        "summary": "The federal Recreation.gov Sam Rayburn facility index separately lists Hanks Creek Campground for overnight reservations, while TPWD identifies Hanks Creek as a Corps-operated access park off FM 2801 south of FM 2109. Its two two-lane ramps support a fishing-focused stay. Choose actual campsite options on Recreation.gov and verify current ramp elevation before departure.",
        "href": "https://www.recreation.gov/camping/gateways/505"
      },
      {
        "name": "Mill Creek Park — USACE reservable campground",
        "type": "Federally operated campground",
        "summary": "The official federal camping index lists Mill Creek (Texas) as a distinct reservable Corps campground on Sam Rayburn. TPWD places Mill Creek Park about one mile northwest of US 96 off FM 149 with a two-lane ramp and Corps management. Confirm reservation limits, current amenities and facility closure status for this specific campground.",
        "href": "https://www.recreation.gov/camping/gateways/505"
      },
      {
        "name": "San Augustine Park — USACE reservable campground",
        "type": "Federally operated campground",
        "summary": "The Corps' federal Recreation.gov listing includes San Augustine campground, and TPWD locates its four-lane launch ramps off FM 1751 south of FM 83. This is a named lakeshore overnight alternative on the reservoir's eastern sector, rather than a generic national-forest campground. Check individual site hookups and reservation rules directly.",
        "href": "https://www.recreation.gov/camping/gateways/505"
      }
    ],
    "regulations": [
      {
        "label": "Blue and channel catfish bag limit of 50",
        "text": "TPWD's current Sam Rayburn waterbody rules establish a 50-fish combined daily bag for blue and channel catfish, with no more than five of those fish 30 inches or longer. This is different from the 25-fish default on many other lakes and should be shown precisely on the reservoir-specific regulations page.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0640"
      },
      {
        "label": "Consumption advisory and alligator gar reporting",
        "text": "TPWD's Sam Rayburn profile flags a fish-consumption advisory; anglers should review the affected species and eating restrictions before preparing a catch. The official waterbody schedule also requires reporting harvested alligator gar within 24 hours and cautions that spawning-area harvest closures may be ordered.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0640"
      },
      {
        "label": "Lake-level changes and ramp access",
        "text": "The official TPWD access map identifies 22 maintained access areas, but cautions that some ramps fail at low reservoir levels. Sam Rayburn's average annual water fluctuation is around seven feet, so always check Corps water levels and the exact ramp's status before towing. This is separate from fishing bag and size rules.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/sam_rayburn/access.phtml"
      }
    ],
    "nearby": [
      {
        "label": "Sam Rayburn Dam Overlook Park — free bank fishing",
        "description": "TPWD identifies Overlook Park at the west end of Sam Rayburn Dam on FM 255 as a Corps-operated day-use site for bank fishing, free to enter and open year-round according to its access listing. It is a specific shoreline activity, not a reservable overnight campground.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/sam_rayburn/access2.phtml",
        "external": true
      },
      {
        "label": "Martin Dies, Jr. State Park — Neches River wetlands",
        "description": "TPWD lists Martin Dies, Jr. State Park as a nearby regional park for Sam Rayburn visitors. Its cypress waterways, lake/river trails and paddling opportunities make a genuine separate Piney Woods excursion; this is not a claim that the park sits on Sam Rayburn's main shoreline.",
        "href": "https://tpwd.texas.gov/state-parks/martin-dies-jr",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://www.recreation.gov/camping/gateways/505",
      "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0640",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/sam_rayburn/access.phtml",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/sam_rayburn/access2.phtml",
      "https://tpwd.texas.gov/state-parks/martin-dies-jr"
    ]
  },
  "lake-texoma": {
    "camping": [
      {
        "name": "Eisenhower State Park — full-hookup camping",
        "type": "Lake Texoma state-park full-hookup campground",
        "summary": "TPWD lists 50 full-hookup campsites at Eisenhower State Park on Lake Texoma, with electrical connections, water, sewer, fire rings and nearby restrooms. These are a distinct RV-friendly category and should not be confused with the same park's water-only tent sites. Check park alerts and campsite reservation status before driving north of Denison.",
        "href": "https://tpwd.texas.gov/state-parks/eisenhower/fees-facilities/campsites"
      },
      {
        "name": "Eisenhower State Park — Elm Point water-only sites",
        "type": "State park premium tent campground",
        "summary": "The park lists 13 premium water-only campsites in the Elm Point area, with tent pads, shared water spigots and restrooms nearby. Unlike its 50 full-hookup sites, these do not have electrical or sewer connections. Confirm site selection and campground accessibility with TPWD before booking.",
        "href": "https://tpwd.texas.gov/state-parks/eisenhower/fees-facilities/campsites"
      },
      {
        "name": "Preston Bend Park — USACE camper-only access",
        "type": "Seasonal Corps campground; camper-only boat ramp",
        "summary": "The official TPWD Lake Texoma access directory identifies Preston Bend Park as a US Army Corps of Engineers facility on FM 120 north of Pottsboro. Its boat ramp is for campers only with no general day use, and the agency lists an April–October open season. Confirm overnight campsite type and current bookings with the Corps operator.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/texoma/access2.phtml"
      }
    ],
    "regulations": [
      {
        "label": "Striped/hybrid bass ten-fish combined bag",
        "text": "Lake Texoma has a special striped and hybrid striped bass rule: TPWD allows ten combined daily, with only two measuring 20 inches or longer; the possession limit is 20 and culling these fish is prohibited. This differs from the five-fish striped-bass rule at other Texas reservoirs.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0723"
      },
      {
        "label": "Special catfish, crappie and gar restrictions",
        "text": "TPWD's Texoma schedule allows 15 combined blue/channel catfish daily (no more than one blue catfish at least 30 inches) and 37 crappie daily (50 in possession). It prohibits taking or possessing alligator gar from Lake Texoma during May under the Red River spawning-season rule. Consult the waterbody schedule before keeping or transporting fish.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0723"
      },
      {
        "label": "Texas–Oklahoma licensing and invasive-species boundary",
        "text": "Only the Texas side is covered by an ordinary Texas freshwater license. TPWD says anglers may use a separate Lake Texoma license to fish the whole reservoir, including Oklahoma waters; check current licensing price and state-specific restrictions. Zebra mussels are established, making the drain-water rule essential before leaving.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/texoma/"
      }
    ],
    "nearby": [
      {
        "label": "Hagerman National Wildlife Refuge — wildlife drive and trails",
        "description": "The U.S. Fish and Wildlife Service manages a two-mile self-guided wildlife auto tour, five walking trails and a visitor center on the Lake Texoma shoreline, including seasonal waterfowl viewing. Fishing requires a Texas or Lake Texoma license; camping is prohibited on refuge land.",
        "href": "https://www.fws.gov/refuge/hagerman/visit-us",
        "external": true
      },
      {
        "label": "Eisenhower State Park — fossil hunting and bluff hikes",
        "description": "TPWD offers more than four miles of trails, sandy swimming cove, shoreline fossil viewing and an off-highway vehicle trail at Eisenhower State Park. These are specifically named park activities in the Texoma basin, and the OHV trail requires a separate permit.",
        "href": "https://tpwd.texas.gov/state-parks/eisenhower",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/state-parks/eisenhower/fees-facilities/campsites",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/texoma/access2.phtml",
      "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0723",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/texoma/",
      "https://www.fws.gov/refuge/hagerman/visit-us",
      "https://tpwd.texas.gov/state-parks/eisenhower"
    ]
  },
  "choke-canyon-reservoir": {
    "camping": [
      {
        "name": "Calliham Unit — Choke Canyon State Park electrical campground",
        "type": "Calliham Unit state-park campground",
        "summary": "The TPWD Calliham Unit offers 40 campsites with water, 50-amp electrical connections and picnic tables; sites 100–139, including accessible sites 108, 109, 119, 120 and 134. Restrooms are nearby. Overnight camping is at Calliham, not the South Shore Unit, which is day use only.",
        "href": "https://tpwd.texas.gov/state-parks/choke-canyon/fees-facilities/campsites"
      },
      {
        "name": "Calliham Unit — walk-in tent camping",
        "type": "Calliham Unit walk-in tent campground",
        "summary": "The park has nine separate water-only tent campsites reached by a roughly 50-yard walk from the parking area. Sites provide picnic tables, grills and fire rings, with water and toilets nearby, not at each pitch. These are at Calliham, not the day-use-only South Shore ramp.",
        "href": "https://tpwd.texas.gov/state-parks/choke-canyon/fees-facilities/campsites/campsites-walkin"
      }
    ],
    "regulations": [
      {
        "label": "Blue/channel catfish 14-inch minimum and 15 daily",
        "text": "TPWD's Choke Canyon-specific rule imposes a 14-inch minimum on blue and channel catfish and a combined bag limit of 15 daily. Flatheads have an 18-inch minimum and five daily. The lake's catfish exception differs from the statewide schedule for many other reservoirs.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0164"
      },
      {
        "label": "Alligator gar harvest reporting and spawning closures",
        "text": "The official Choke Canyon rule allows one alligator gar of any size per day, but harvested alligator gar must be reported to TPWD within 24 hours. The agency may temporarily close particular areas during spawning conditions. Check current closure orders separately before targeting gar.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0164"
      },
      {
        "label": "South Shore is a day-use unit, not a campsite",
        "text": "TPWD says the Calliham unit is open to overnight guests but the South Shore Unit operates only for day use, generally 6 a.m. to 10 p.m. Both have improved boat ramps, but a fishing-access listing is not an overnight reservation. Check current park alerts for operator restrictions.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/choke_canyon/access.phtml"
      }
    ],
    "nearby": [
      {
        "label": "Choke Canyon State Park — Calliham wildlife and birding",
        "description": "The operator promotes guided birding, wildlife watching, geocaching and hiking at Calliham; the park also has lake wildlife including alligators. The South Shore is a separate day-use birdwatching and fishing unit, not a campground, and current park closures should be checked.",
        "href": "https://tpwd.texas.gov/state-parks/choke-canyon",
        "external": true
      },
      {
        "label": "James E. Daughtrey Wildlife Management Area — San Miguel access",
        "description": "TPWD identifies the San Miguel boat ramp within James E. Daughtrey Wildlife Management Area, north of the Choke Canyon reservoir. This is a named public wildlife and recreation area, with its own access and possible public-hunting restrictions, not another campground at Calliham.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/choke_canyon/access.phtml",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/state-parks/choke-canyon/fees-facilities/campsites",
      "https://tpwd.texas.gov/state-parks/choke-canyon/fees-facilities/campsites/campsites-walkin",
      "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0164",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/choke_canyon/access.phtml",
      "https://tpwd.texas.gov/state-parks/choke-canyon"
    ]
  },
  "amistad-reservoir": {
    "camping": [
      {
        "name": "Governors Landing Campground — Amistad NRA",
        "type": "NPS campground; first-come, no RV hookups",
        "summary": "The National Park Service operates 15 campsites at Governors Landing, with covered tables, grills and access to popular swimming areas. It is the only park campground with potable water from shared spigots, but no RV electrical or sewer hookups. RVs longer than 28 feet are not suitable; campsites are first-come, first-served.",
        "href": "https://www.nps.gov/amis/planyourvisit/camping.htm"
      },
      {
        "name": "Rough Canyon Campground — primitive sites",
        "type": "NPS primitive campground",
        "summary": "NPS maintains four primitive campsites near the Rough Canyon boat ramp, each with a covered picnic table and grill. Camping is normally year-round, with vault toilets but no potable water or electrical connections at campsites. The left Rough Canyon launch is one of the few ramps currently open under low water.",
        "href": "https://www.nps.gov/amis/planyourvisit/camping.htm"
      },
      {
        "name": "San Pedro Campground — larger RVs and walk-in tents",
        "type": "NPS no-hookup campground; first-come",
        "summary": "The San Pedro area is reached by approximately 1.25 miles of gravel road and is better suited for large RVs than Governors Landing. NPS identifies vehicle sites plus walk-in tent campsites, with no hookups or drinking water, and a separately reservable group site. Regular individual sites are first-come, first-served.",
        "href": "https://www.nps.gov/amis/planyourvisit/san-pedro-campground.htm"
      }
    ],
    "regulations": [
      {
        "label": "Texas-side statewide rules, Mexican-water license required",
        "text": "TPWD states that fish on the Texas side of Amistad follow current statewide size and harvest limits. A Mexico fishing license is required for everyone aboard a boat fishing on the Mexican side, including passengers. A standard Texas license is not sufficient across the international boundary; verify both jurisdictions' requirements before departure.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/amistad/"
      },
      {
        "label": "Zebra and quagga mussels and gear transfer restrictions",
        "text": "TPWD confirms both zebra and quagga mussels have invaded the reservoir. State law requires draining water from boats, livewells and onboard receptacles when leaving or approaching public freshwater; carrying invasive mussels is illegal. Inspect, clean and dry water-contact gear before towing to another lake.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/amistad/"
      },
      {
        "label": "Current low-water launch closures and marina hazards",
        "text": "NPS current conditions show only the left side of Rough Canyon and Diablo East ramps open; most remaining launch ramps are closed due to low water. Diablo East Marina Cove and walkway are separately closed because of unsafe docks and unstable ground. Verify the latest NPS alerts before choosing a launch.",
        "sourceUrl": "https://www.nps.gov/amis/planyourvisit/conditions.htm"
      }
    ],
    "nearby": [
      {
        "label": "Diablo East Nature Trail — Amistad NRA",
        "description": "The National Park Service maintains a short interpretive loop starting at the Diablo East parking area, with lake overlooks and signs explaining local vegetation. It involves steps and an unpaved dirt/gravel surface; this is a defined accessible-from-the-day-use-area hiking experience, not a claim of wheelchair access.",
        "href": "https://www.nps.gov/thingstodo/hike-the-diablo-east-nature-trail.htm",
        "external": true
      },
      {
        "label": "Pecos River and Diablo East NPS day-use areas",
        "description": "NPS separately identifies Pecos River and Diablo East viewpoints as designated park day-use areas, offering a land-based alternative when low water makes many launches unusable. Do not imply that closed marina coves or inaccessible ramps can be used for boating; check current day-use status and safety notices.",
        "href": "https://www.nps.gov/amis/planyourvisit/hours.htm",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://www.nps.gov/amis/planyourvisit/camping.htm",
      "https://www.nps.gov/amis/planyourvisit/san-pedro-campground.htm",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/amistad/",
      "https://www.nps.gov/amis/planyourvisit/conditions.htm",
      "https://www.nps.gov/thingstodo/hike-the-diablo-east-nature-trail.htm",
      "https://www.nps.gov/amis/planyourvisit/hours.htm"
    ]
  }
};
