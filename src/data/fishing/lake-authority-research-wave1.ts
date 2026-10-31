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
  }
};
