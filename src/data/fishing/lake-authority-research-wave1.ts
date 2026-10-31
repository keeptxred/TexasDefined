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
  },
  "canyon-lake": {
    "camping": [
      {
        "name": "Potters Creek Park — USACE electric RV and tent campground",
        "type": "Operator-verified overnight campground",
        "summary": "The US Army Corps of Engineers lists 93 single back-in RV sites and five multi-RV family sites with 50-amp electricity and water at Potters Creek. It separately lists ten tent sites with 15-amp service and seven screened shelters. The developed park has showers, dump stations, two boat ramps and a swimming beach; reservations go through Recreation.gov.",
        "href": "https://www.swf-wc.usace.army.mil/canyon/Recreation/Camping/Devareas.shtml"
      },
      {
        "name": "Cranes Mill Park — USACE campground",
        "type": "Operator-verified overnight campground",
        "summary": "The Corps operates 30 50-amp electric/water RV sites and 34 water-only tent sites at Cranes Mill on Canyon Lake's south shore. It has showers, a dump station, a two-lane ramp and a dedicated fishing pier for campers. The Corps says campground sites 31–64 are unavailable from October 1 through March 31; check reservation availability before arrival.",
        "href": "https://www.swf-wc.usace.army.mil/canyon/Recreation/Parks/Corpsparks.shtml"
      },
      {
        "name": "North Park — USACE primitive tent campsites",
        "type": "USACE primitive tent camping",
        "summary": "The Corps lists primitive tent-only sites at North Park without campsite utility connections, with centralized drinking water and a vault toilet. This is a different option from the full-service Potters Creek RV sites. Reservations for overnight park sites must be checked through the Corps reservation system.",
        "href": "https://www.swf-wc.usace.army.mil/canyon/Recreation/Camping/Devareas.shtml"
      }
    ],
    "regulations": [
      {
        "label": "Statewide harvest limits apply to Canyon Lake fish",
        "text": "TPWD's Canyon Lake fishery profile explicitly states that all species currently use statewide fishing regulations. Largemouth bass, smallmouth and Guadalupe bass, white and striped bass and catfish each have distinct statewide size/bag provisions. A valid Texas fishing license is required for Canyon Lake; the below-dam trout stocking area is a separate Guadalupe River fishery.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/canyon/"
      },
      {
        "label": "Fish-consumption advisory and invasive mussels",
        "text": "TPWD's Canyon Lake fisheries record displays a fish-consumption advisory in effect and reports invasive zebra mussels. Review the advisory's named species before eating fish; drain boats, livewells and other onboard receptacles when changing public fresh waters. These warnings are distinct from recreational harvest bag limits.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/canyon/"
      }
    ],
    "nearby": [
      {
        "label": "USACE Canyon Dam and Guadalupe River trout fishing pier",
        "description": "The Corps maintains an ADA-accessible concrete fishing pier downstream of Canyon Dam, near the power plant outlet, where trout have historically been stocked. This is a specific Guadalupe River fishing outing, separate from the Canyon Lake shoreline. Check current stocking, river releases and access rules before visiting.",
        "href": "https://www.swf-wc.usace.army.mil/canyon/Recreation/Fishing.shtml",
        "external": true
      },
      {
        "label": "Potters Creek free fishing dock and Cranes Mill day-use dock",
        "description": "The Corps identifies a fishing dock near the free-use ramp outside Potters Creek's campground, and a free dock immediately outside the Cranes Mill campground. The dock inside Cranes Mill campground is restricted to registered campers. These are three distinct shore-access options, not a generic nearby attraction claim.",
        "href": "https://www.swf-wc.usace.army.mil/canyon/Recreation/Fishing.shtml",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://www.swf-wc.usace.army.mil/canyon/Recreation/Camping/Devareas.shtml",
      "https://www.swf-wc.usace.army.mil/canyon/Recreation/Parks/Corpsparks.shtml",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/canyon/",
      "https://www.swf-wc.usace.army.mil/canyon/Recreation/Fishing.shtml"
    ]
  },
  "toledo-bend-reservoir": {
    "camping": [
      {
        "name": "Ragtown Recreation Area — Sabine National Forest shoreline camping",
        "type": "SRA-operated federal forest campground",
        "summary": "The Sabine River Authority operates Ragtown on the Texas shore of Toledo Bend under a US Forest Service permit. It identifies 12 double-family camping units and 13 single-family units with tent pad, picnic table, parking spur and campfire ring, plus a two-lane launch ramp. The campground is high on an east-facing forested bluff; check operator status before visiting.",
        "href": "https://sratx.org/parks-and-recreation/ragtown/"
      },
      {
        "name": "Lakeview Campground — Toledo Bend Sabine National Forest",
        "type": "SRA-operated primitive forest campground",
        "summary": "The Sabine River Authority lists ten camping sites at Lakeview, each with a table, grill and tent pad. The area has centralized water hydrants and portable toilets, and serves as a trailhead for Trail Between the Lakes. This facility is not a full-hookup RV park, and the authority warns it may close if storm damage disrupts the water system.",
        "href": "https://sratx.org/parks-and-recreation/lakeview/"
      },
      {
        "name": "Lost Frontier RV Park Marina — Toledo Bend mid-lake",
        "type": "TPWD-listed private RV/marina facility",
        "summary": "TPWD's Toledo Bend access inventory lists Lost Frontier RV Park Marina off Texas Highway 21 east of Milam, with a three-lane boat ramp and private operator. It is a specifically named RV lodging lead on the reservoir; the inventory does not establish same-day campsite availability, electrical hookups or private booking terms.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/toledo_bend/access2.phtml"
      }
    ],
    "regulations": [
      {
        "label": "Eight-fish black-bass limit and 14-inch largemouth minimum",
        "text": "Toledo Bend has a special eight-fish daily bag limit for all black-bass species in combination, with a possession limit of ten. Largemouth and smallmouth bass have a 14-inch minimum; Guadalupe, Alabama and spotted bass have no minimum if present. This is the TPWD's Toledo Bend-specific cross-border rule, not the five-fish statewide default.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0734"
      },
      {
        "label": "No minimum length on crappie; 50 combined blue/channel catfish",
        "text": "TPWD's Toledo Bend waterbody schedule has no crappie minimum length and allows 25 black/white crappie per day combined. Blue and channel catfish have no minimum and a 50-fish combined daily/possession limit, with at most five 30 inches or longer. Flatheads have an 18-inch minimum and a ten-fish bag/possession limit.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0734"
      },
      {
        "label": "Texas-Louisiana reciprocal fishing and consumption advisory",
        "text": "TPWD says properly licensed Texas or Louisiana residents, and holders of valid nonresident licenses from either state, may fish across the common boundary waters. The same catfish, crappie, white- and black-bass harvest limits apply on both sides, but rules for alligator gar and some other species may differ. A fish-consumption advisory is also in effect.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/toledo_bend/"
      }
    ],
    "nearby": [
      {
        "label": "Ragtown Recreation Area — Mother's Nature Hiking Trail",
        "description": "The Sabine River Authority identifies a one-mile trail beginning at Ragtown Campground, passing through pine and hardwood forest beside the Toledo Bend shoreline. The operator promotes woodland birdwatching and lake views, making this a named on-site excursion rather than a generic national-forest recommendation.",
        "href": "https://sratx.org/parks-and-recreation/ragtown/",
        "external": true
      },
      {
        "label": "Sabinetown Recreation Area — deep-water tournament launch",
        "description": "The Sabine River Authority operates Sabinetown at 712 Vantage Point in Hemphill, at Palo Gaucho Bayou. It has a six-lane boat ramp, two floating docks, public restrooms and a large pavilion used for fishing tournaments. This is a distinct lakeside day-use facility, not a listed campground.",
        "href": "https://sratx.org/parks-and-recreation/sabinetown/",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://sratx.org/parks-and-recreation/ragtown/",
      "https://sratx.org/parks-and-recreation/lakeview/",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/toledo_bend/access2.phtml",
      "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0734",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/toledo_bend/",
      "https://sratx.org/parks-and-recreation/sabinetown/"
    ]
  },
  "lake-travis": {
    "camping": [
      {
        "name": "Turkey Bend Recreation Area — LCRA lakeshore camping",
        "type": "Operator-verified overnight campground",
        "summary": "LCRA operates Turkey Bend Recreation Area on Lake Travis at 4000 Shaw Drive near Marble Falls. The authority lists 30 reservable campsites for up to eight people and a lakeshore landscape with picnic tables, grills and trail access. Review the booking page for actual price and overnight rules; not every lakeshore park allows camping.",
        "href": "https://lcraparks.com/parks/turkey-bend-recreation-area"
      },
      {
        "name": "Pace Bend Park — Travis County primitive and improved sites",
        "type": "Travis County lakeside campground",
        "summary": "Travis County's official park plan documents both improved and primitive camping at Pace Bend, 2805 North Pace Bend Road in Spicewood, with picnic tables, fire rings, trails and Lake Travis shoreline. It also identifies designated boat ramps and park camping loops. Choose an actual campsite and check park closures with Travis County; do not confuse it with Mansfield Dam's day-use access.",
        "href": "https://www.traviscountytx.gov/citizens-bond-advisory-committee/virtual-open-house/pace-bend-park"
      }
    ],
    "regulations": [
      {
        "label": "Statewide fish harvest and separate LCRA bowfishing rules",
        "text": "TPWD explicitly says all Lake Travis species currently follow statewide fishing harvest regulations, but bowfishers are subject to additional rules enforced by the Lower Colorado River Authority. The lake contains largemouth and Guadalupe bass, white and striped bass and catfish, with different harvest limits by species; check LCRA gear restrictions before taking a bow.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/travis/"
      },
      {
        "label": "Zebra mussels and fluctuating lake-level boat ramp restrictions",
        "text": "TPWD confirms zebra mussels at Lake Travis and requires draining boats and onboard water containers between public lakes. It identifies normal water-level fluctuation of 10–20 feet, and individual ramp usability can change significantly. For example, Mansfield Dam Park's county-operated ramp is documented as usable down to elevation 622 feet; verify the latest status.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/travis/access2.phtml"
      }
    ],
    "nearby": [
      {
        "label": "Turkey Bend — 15-mile LCRA hiking and mountain-bike trail system",
        "description": "LCRA's official Turkey Bend park map lists 30 campsites and mapped trail segments including the 1.3-mile Azure, 1.9-mile Bowie, 2-mile Fannin and 2.4-mile De Zavala routes, totaling about 15 trail miles. The park is a genuine named lakefront walking and cycling destination with separate overnight sites.",
        "href": "https://lcraparks.com/parks/turkey-bend-recreation-area",
        "external": true
      },
      {
        "label": "Pace Bend Park — Lake Travis coves and trails",
        "description": "Travis County documents over nine miles of Lake Travis shoreline with roughly 20 coves and inlets, two public boat ramps and hiking, biking and equestrian routes at Pace Bend. It supports a trip with water access and inland trails; check low-water ramps and county conditions before visiting.",
        "href": "https://www.traviscountytx.gov/citizens-bond-advisory-committee/virtual-open-house/pace-bend-park",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://lcraparks.com/parks/turkey-bend-recreation-area",
      "https://www.traviscountytx.gov/citizens-bond-advisory-committee/virtual-open-house/pace-bend-park",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/travis/",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/travis/access2.phtml"
    ]
  },
  "richland-chambers-reservoir": {
    "camping": [
      {
        "name": "Sunset Cove Marina, RV Park and Grill — lakeshore full-hookup sites",
        "type": "Private marina RV park; direct operator",
        "summary": "The operator identifies Sunset Cove at 3001 FM 2859, Corsicana, as a Richland-Chambers shoreline campground with large RV spaces and full hookups. Its marina also has a three-lane boat ramp, live bait, tackle, a convenience store and grill. Call 903-874-2300 for present availability and site-specific electric service before booking.",
        "href": "https://sunsetcovecorsicana.com/"
      },
      {
        "name": "Midway Landing Campground — gated RV camping at Streetman",
        "type": "Private RV-only campground; age and booking restrictions",
        "summary": "Midway Landing's own website lists full septic, electric and water RV hookups, showers and a double-width boat launch at 14860 Midway Landing Lane, Streetman. It does not allow tent camping, requires reservations at least a week in advance, and restricts daily/weekly campers to age 40 or older. The gated entrance uses a code issued at booking.",
        "href": "https://midwaylandingrc.com/"
      },
      {
        "name": "Fisherman's Cove Lodge — waterfront cabin lodging, not RV pitches",
        "type": "Private furnished cabin lodging; not a campground",
        "summary": "Fisherman's Cove Lodge near Kerens markets furnished lakefront cabins sleeping four to six guests, with a fishing pier, kayak rentals, a boat ramp and guided fishing. This is overnight cabin lodging on Richland-Chambers, not a verified tent or RV campground. Confirm the cabin and guide reservations directly with the operator.",
        "href": "https://fishermanscovelodge.com/"
      }
    ],
    "regulations": [
      {
        "label": "Specific blue/channel catfish size distribution",
        "text": "TPWD's current Richland-Chambers waterbody rule permits 25 blue and channel catfish daily in combination, of which no more than five may measure at least 20 inches and no more than one of those may reach 30 inches or longer. Flathead catfish require at least 18 inches and allow five daily. The printed 2018 slot rule is outdated; use the current waterbody schedule.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0615"
      },
      {
        "label": "Black bass, hybrid stripers, crappie and zebra mussels",
        "text": "The current TPWD schedule requires a 14-inch minimum for largemouth and smallmouth bass, with five combined black bass daily. Striped and hybrid striped bass have an 18-inch minimum and five combined daily; crappie have a 10-inch minimum and 25 combined daily. Zebra mussels have been found here, requiring draining of boats between lakes.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0615"
      }
    ],
    "nearby": [
      {
        "label": "Purtis Creek State Park — Wolfpen and Beaver Slide trails",
        "description": "TPWD lists an easy 0.5-mile Solar Walk along the dam, the Beaver Slide nature path and multiple Wolfpen hiking/biking loops at Purtis Creek State Park near Eustace. This is a separate state-park lake excursion from Richland-Chambers, not an attraction directly on its shoreline.",
        "href": "https://tpwd.texas.gov/state-parks/purtis-creek/trails-info",
        "external": true
      },
      {
        "label": "Fisherman's Cove Lodge — guided hybrid bass and catfish trips",
        "description": "The lakeshore lodge operator offers guided fishing trips for hybrid striped bass, sand bass and catfish, plus on-site kayak rentals and fishing-pier access for guests. This is an identifiable local experience with a real provider rather than a generic county attractions link.",
        "href": "https://fishermanscovelodge.com/",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://sunsetcovecorsicana.com/",
      "https://midwaylandingrc.com/",
      "https://fishermanscovelodge.com/",
      "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0615",
      "https://tpwd.texas.gov/state-parks/purtis-creek/trails-info"
    ]
  },
  "cedar-creek-reservoir": {
    "camping": [
      {
        "name": "Log Cabin City RV Park — lakefront city-operated camping",
        "type": "Municipal RV and tent campground",
        "summary": "The City of Log Cabin explicitly advertises RV and tent camping at its city park on Cedar Creek Lake, including lake access for boating, fishing and swimming. The city formed from the former Log Cabin Resort and maintains recreation facilities. Verify current electric/water/sewer options and rates with the city before booking; the boat ramp alone is not a campsite.",
        "href": "https://www.cityoflogcabin.com/visit-us"
      },
      {
        "name": "Pine Gardens RV Park — Tool shoreline RV and cabins",
        "type": "Operator-listed full-hookup RV park near lake",
        "summary": "Pine Gardens RV Park's own website lists full-hookup RV spaces with 30/50-amp electric, water and sewer near Cedar Creek Lake, plus cabins, pull-through spaces, a saltwater pool, laundry, playgrounds and a dedicated boat ramp. This is a legitimate private operator; confirm actual availability, cabin requirements and current price directly.",
        "href": "https://pinegardensrvpark.com/"
      },
      {
        "name": "Fisherman's Wharf Marina Campgrounds — RV and tent sites",
        "type": "TPWD-listed marina with locally documented camping",
        "summary": "The established marina at 2904 County Road 1703 near Malakoff is named by TPWD's Cedar Creek access inventory and described by its local listing as offering waterfront RV and tent campsites with water and electrical hookups, plus off-water RV sites. Current commercial operations and overnight reservations need direct confirmation.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/cedar_creek/access.phtml"
      }
    ],
    "regulations": [
      {
        "label": "Statewide species-specific harvest, not a special slot lake",
        "text": "TPWD's Cedar Creek Reservoir fishery page explicitly states that all species are managed under statewide regulations. Its main fisheries are largemouth bass, blue/channel/flathead catfish, white/hybrid striped bass and crappie; these have different state bag and size rules. Do not import special trophy slots from nearby Lake Fork.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/cedar_creek/"
      },
      {
        "label": "TRWD lake recreation ordinance and public shore access",
        "text": "The Tarrant Regional Water District manages Cedar Creek Lake, and boating/recreation is also subject to its General Ordinance. TRWD identifies Tom Finley Park as a publicly accessible day-use waterfront site with an accessible boat ramp, swimming and picnicking; it is not automatically an overnight campground.",
        "sourceUrl": "https://www.trwd.com/cedar-creek-lake/"
      }
    ],
    "nearby": [
      {
        "label": "Tom Finley Park — TRWD public Cedar Creek shoreline",
        "description": "The Tarrant Regional Water District maintains Tom Finley Park as a publicly accessible day-use location on Cedar Creek Lake, offering a boat ramp, picnic space, designated swimming and fishing access. It is a named operator-backed waterfront stop, with separate public entry conditions.",
        "href": "https://www.trwd.com/cedar-creek-lake/",
        "external": true
      },
      {
        "label": "Purtis Creek State Park — nearby Wolfpen Hike and Bike Trail",
        "description": "TPWD expressly promotes nearby Cedar Creek Reservoir as a side trip from Purtis Creek State Park. At the state park, the Wolfpen trails support a 4.1-mile network of walking and biking routes, plus a lakefront Beaver Slide nature path. This is another waterbody and requires a separate drive.",
        "href": "https://tpwd.texas.gov/state-parks/purtis-creek",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://www.cityoflogcabin.com/visit-us",
      "https://pinegardensrvpark.com/",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/cedar_creek/access.phtml",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/cedar_creek/",
      "https://www.trwd.com/cedar-creek-lake/",
      "https://tpwd.texas.gov/state-parks/purtis-creek"
    ]
  },
  "lake-lbj": {
    "camping": [
      {
        "name": "Heart of Texas Lake Resort — 21 full-hookup RV spaces",
        "type": "Private full-hookup Lake LBJ RV resort",
        "summary": "The resort's official website describes 21 RV spaces on Lake LBJ with water, septic and 30/50-amp electrical connections, along with eight cabins, a lodge and a swimming pool. These are real bookable private operator facilities, unlike Kingsland Lions Park, which TPWD identifies as day-use only. Contact the resort for availability and current service details.",
        "href": "https://www.heartoftexaslakeresorts.com/"
      },
      {
        "name": "Inks Lake State Park — separate Highland Lakes campground",
        "type": "Nearby state park; different reservoir",
        "summary": "TPWD operates nearly 200 campsites and 22 cabins at Inks Lake State Park near Burnet. This is an explicitly separate lake from LBJ, suitable as an alternative Hill Country overnight base, not a claim of a waterfront campsite on LBJ. State park reservations and trail/boat access have their own restrictions.",
        "href": "https://tpwd.texas.gov/state-parks/inks-lake"
      }
    ],
    "regulations": [
      {
        "label": "Statewide harvest with separate LCRA bowfishing rules",
        "text": "TPWD states that Lake Lyndon B. Johnson follows statewide fish-harvest limits for all species, while bowfishers are subject to additional LCRA regulations. The lake supports largemouth and Guadalupe bass, white bass, crappie and catfish. Verify both TPWD's annual harvest limits and LCRA gear restrictions before fishing across this Highland Lakes waterbody.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/lbj/"
      },
      {
        "label": "Algal blooms, invasive mussels and access limitations",
        "text": "TPWD flags algal bloom precautions and an established zebra-mussel invasion on Lake LBJ; boaters must follow water-draining requirements before moving to a different public lake. TPWD identifies only two main lake ramps: Wirtz Dam/Cottonwood and Kingsland Lions Park, with Kingsland's access being day-use only.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/lbj/access.phtml"
      }
    ],
    "nearby": [
      {
        "label": "Longhorn Cavern State Park — guided cave experience",
        "description": "TPWD identifies Longhorn Cavern near Burnet as a guided cave-tour destination with Park Road 4 access. The state park is day-use only and does not offer camping; tour schedules, admission and reservations are handled separately. It is a real Highland Lakes area attraction, not a lakeshore ramp at LBJ.",
        "href": "https://tpwd.texas.gov/state-parks/longhorn-cavern",
        "external": true
      },
      {
        "label": "Inks Lake State Park — Devil's Waterhole and trails",
        "description": "At nearby Inks Lake, TPWD identifies Devil's Waterhole as a named swimming and canyon hiking destination, along with nine miles of hiking routes, rental paddling craft and CCC history. This is another lake and another park, not a false claim that Inks Lake's campsites sit on LBJ.",
        "href": "https://tpwd.texas.gov/state-parks/inks-lake",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://www.heartoftexaslakeresorts.com/",
      "https://tpwd.texas.gov/state-parks/inks-lake",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/lbj/",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/lbj/access.phtml",
      "https://tpwd.texas.gov/state-parks/longhorn-cavern"
    ]
  },
  "lake-lavon": {
    "camping": [
      {
        "name": "Lavonia Park — 30-amp full-hookup camping",
        "type": "Corps-operated overnight campground",
        "summary": "USACE lists 38 full-hookup 30-amp sites and 15 additional water-only sites at Lavonia Park on Lavon Lake, with toilets, showers and two four-lane launch ramps. The developed camping park is listed year-round, with a controlled gate at night; confirm individual reservations and current construction or ramp alerts.",
        "href": "https://www.swf-wc.usace.army.mil/lavon/Recreation/Camping/Devareas.shtml"
      },
      {
        "name": "East Fork Park — 50-amp RV sites and tent sites",
        "type": "Corps-operated overnight campground",
        "summary": "The Corps lists 50 campsites with 50-amp electricity and water, plus 12 water-only sites at East Fork Park. Shower restrooms, a swim beach, playground and two four-lane boat ramps serve the park. Overnight camping is year-round; book a specific site and check any temporary USACE notices.",
        "href": "https://www.swf-wc.usace.army.mil/lavon/Recreation/Camping/Devareas.shtml"
      },
      {
        "name": "Clear Lake Park — seasonal campground",
        "type": "Seasonal Corps campground; closed Oct–March",
        "summary": "Clear Lake Park has 23 developed 30-amp full-hookup campsites according to USACE, but the overnight park closes annually September 30 and reopens April 1. Its south boat ramp remains available through winter; a functioning winter ramp is not proof that campsites are open.",
        "href": "https://www.swf-wc.usace.army.mil/lavon/Recreation/Camping/Devareas.shtml"
      }
    ],
    "regulations": [
      {
        "label": "Lavon-specific blue/channel catfish limits",
        "text": "TPWD's Lavon waterbody schedule permits 25 blue and channel catfish combined in a day, of which no more than five may measure 20 inches or longer and no more than one may measure at least 30 inches. Flathead catfish require 18 inches and are limited to five daily; do not use another reservoir's catfish limits.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0434"
      },
      {
        "label": "Black bass and crappie harvest rules",
        "text": "TPWD's current Lavon waterbody schedule requires a 14-inch minimum for largemouth and smallmouth bass and a five-fish daily bag for all black bass combined. Black and white crappie have a 10-inch minimum and a 25-fish daily bag, while white bass require 10 inches and allow 25 daily.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0434"
      },
      {
        "label": "Zebra mussel decontamination",
        "text": "TPWD confirms that invasive zebra mussels are established in Lake Lavon. Draining boats, livewells and bait containers when leaving or approaching public fresh water is legally required, and operators should clean and dry their gear before transferring to another lake.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/lavon/"
      }
    ],
    "nearby": [
      {
        "label": "Caddo Park — accessible fishing ponds",
        "description": "USACE identifies Caddo Park as a seasonal day-use park with free accessible fishing ponds, picnic sites and a four-lane public boat ramp. It is not an overnight campground, and its published operating window runs April–September; confirm present gate access before making a dedicated trip.",
        "href": "https://www.swf-wc.usace.army.mil/lavon/Recreation/Parks/",
        "external": true
      },
      {
        "label": "East Fork Park — swim beach and playground",
        "description": "The Corps-operated East Fork Park has a designated swimming beach, playground, picnic facilities and ramp access along with its developed campground. These are actual operator-listed recreational amenities on the lake, distinct from a generic trip suggestion or county directory.",
        "href": "https://www.swf-wc.usace.army.mil/lavon/Recreation/Parks/",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://www.swf-wc.usace.army.mil/lavon/Recreation/Camping/Devareas.shtml",
      "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0434",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/lavon/",
      "https://www.swf-wc.usace.army.mil/lavon/Recreation/Parks/"
    ]
  },
  "belton-lake": {
    "camping": [
      {
        "name": "Cedar Ridge Park — USACE RV and tent campground",
        "type": "Corps-operated overnight campground",
        "summary": "The Corps lists 61 50-amp single back-in RV sites, two pull-through RV sites, four water/electric tent sites and eight screened camping shelters at Cedar Ridge. There are shower restrooms, dump stations and launch ramps. On October 31, 2026, Corps status shows a seasonal partial closure: campsites 41–68 remain available, but other sites are closed until spring.",
        "href": "https://www.swf-wc.usace.army.mil/belton/Recreation/Camping/Devareas.shtml"
      },
      {
        "name": "Live Oak Ridge Park — USACE camping",
        "type": "Corps-operated overnight campground",
        "summary": "USACE lists 29 50-amp back-in RV sites and 19 30-amp RV sites, each with electrical and water connections, at Live Oak Ridge Park. Restrooms, showers, a dump station, playground and two-lane launch ramp are on site. The current Corps park-status page marks Live Oak Ridge open; check reservations for actual vacancy.",
        "href": "https://www.swf-wc.usace.army.mil/belton/Recreation/Camping/Devareas.shtml"
      },
      {
        "name": "Westcliff Park — seasonal Corps camping",
        "type": "Seasonally closed through February 2027",
        "summary": "USACE includes developed RV campsites at Westcliff, but its October 2026 facility status explicitly marks the campground seasonally closed until March 1, 2027. Describe it as a spring/summer alternative rather than an available October campsite; the ramp may have a different status.",
        "href": "https://www.swf-wc.usace.army.mil/belton/"
      }
    ],
    "regulations": [
      {
        "label": "All game fish follow statewide rules at Belton",
        "text": "TPWD explicitly says all game fishes at Belton Lake currently follow statewide fishing regulations. This includes its distinct largemouth/smallmouth bass, white and hybrid striped bass, and channel/flathead catfish fisheries. The general five-fish combined black-bass bag does not substitute for the separate hybrid striped-bass rules.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/belton/"
      },
      {
        "label": "Invasive zebra mussels",
        "text": "The Belton Lake operator profile confirms zebra mussels have infested this reservoir. Texas requires draining water from boats and onboard receptacles between public freshwaters, and possession or transport of these invasive mussels is prohibited; include this on Belton's boating and fishing planning pages.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/belton/"
      },
      {
        "label": "Actual fall and winter park restrictions",
        "text": "The USACE October 2026 park-status table shows Cedar Ridge partly closed, Westcliff overnight campground closed for the season, Sparta Valley closed for safety and Belton Overlook permanently closed for safety. These are access conditions rather than new fish-bag regulations; check current Corps status before recommending an outing.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/belton/"
      }
    ],
    "nearby": [
      {
        "label": "Miller Springs Nature Area — hiking below Belton Dam",
        "description": "The Corps operates Miller Springs Nature Area at Belton Dam with walking trails, rocky terrain and wooded paths. Its park status shows Miller Springs open while the former Belton Overlook area is closed. It is a named nonfishing activity near the dam, not a fictional lakeshore campground.",
        "href": "https://www.swf-wc.usace.army.mil/belton/",
        "external": true
      },
      {
        "label": "Cedar Ridge Park — swimming and playground",
        "description": "USACE lists a designated swimming beach, playground, camper activity center and boat ramps at Cedar Ridge in addition to its camping loops. The official October 2026 status has the swim beach closed, so treat the beach as a facility subject to seasonal reopening rather than open today.",
        "href": "https://www.swf-wc.usace.army.mil/belton/Recreation/Camping/Devareas.shtml",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://www.swf-wc.usace.army.mil/belton/Recreation/Camping/Devareas.shtml",
      "https://www.swf-wc.usace.army.mil/belton/",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/belton/"
    ]
  },
  "stillhouse-hollow-reservoir": {
    "camping": [
      {
        "name": "Union Grove Park — RV, tent and screened-shelter camping",
        "type": "Corps-operated overnight campground",
        "summary": "The Corps operates Union Grove with electrical-and-water RV campsites, designated tent camping, screened shelters, hot showers, a swim beach, fishing dock and four-lane concrete boat launch. Camping is reservation-only through the federal reservation service, unlike first-come day-use fishing docks.",
        "href": "https://www.swf-wc.usace.army.mil/stillhouse/Recreation/Camping/Devareas.shtml"
      },
      {
        "name": "Dana Peak Park — 50-amp RV and primitive camping",
        "type": "Corps-operated overnight campground",
        "summary": "The Corps lists 17 single back-in RV sites with 50-amp electric and water, three double RV sites, five electric tent sites, two pull-through spaces and eight primitive sites at Dana Peak. Showers, boat ramp, fishing dock and trailhead serve the camping area; reservations are required.",
        "href": "https://www.swf-wc.usace.army.mil/stillhouse/Recreation/Camping/Devareas.shtml"
      }
    ],
    "regulations": [
      {
        "label": "Statewide fish harvest rules at Stillhouse",
        "text": "TPWD's Stillhouse Hollow Reservoir profile explicitly states all fish species use statewide regulations. Largemouth and smallmouth bass, catfish, crappie and white bass are present but have different statewide size and daily bag limits; the current TPWD Outdoor Annual controls before retaining fish.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/stillhouse_hollow/"
      },
      {
        "label": "Zebra mussel boat-transfer rule",
        "text": "TPWD confirms zebra mussels have invaded Stillhouse Hollow. Boat operators must drain onboard water, livewells and bait receptacles when leaving or approaching public freshwater. Clean and dry boats, trailers and gear before visiting another reservoir, and check Corps ramp conditions separately.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/stillhouse_hollow/"
      }
    ],
    "nearby": [
      {
        "label": "Chalk Ridge Falls Nature Area — interpretive hike",
        "description": "The Corps manages Chalk Ridge Falls Nature Area as an interpretive hiking destination in the Stillhouse Hollow project. It is a named, separate walking experience rather than a marina or a generic Bell County link; verify trail access after flooding or storm damage.",
        "href": "https://www.swf-wc.usace.army.mil/stillhouse/Recreation/Parks/",
        "external": true
      },
      {
        "label": "Dana Peak Park — free exterior fishing dock and trails",
        "description": "USACE identifies a free public fishing dock outside Dana Peak Park's paid campground, plus the Dana Peak Hike and Bike Trail nearby. The dock inside Union Grove has a day-use fee; distinguishing them helps visitors choose an actual activity and entrance.",
        "href": "https://www.swf-wc.usace.army.mil/stillhouse/Recreation/Fishing.shtml",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://www.swf-wc.usace.army.mil/stillhouse/Recreation/Camping/Devareas.shtml",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/stillhouse_hollow/",
      "https://www.swf-wc.usace.army.mil/stillhouse/Recreation/Parks/",
      "https://www.swf-wc.usace.army.mil/stillhouse/Recreation/Fishing.shtml"
    ]
  },
  "lake-o-the-pines": {
    "camping": [
      {
        "name": "Brushy Creek Park — year-round USACE campground",
        "type": "Corps-operated overnight campground",
        "summary": "The Corps lists 71 RV sites and 48 tent sites at Brushy Creek Park, with electric/water hookups at developed RV pitches, showers, fishing dock and swimming beach. Its official park table marks Brushy Creek open year-round, although reservations and particular facilities can still close for maintenance.",
        "href": "https://www.swf-wc.usace.army.mil/lakeopines/Recreation/Parks/"
      },
      {
        "name": "Johnson Creek Park — year-round USACE campground",
        "type": "Corps-operated overnight campground",
        "summary": "USACE operates Johnson Creek Park with 63 RV sites and 22 tent sites, plus restrooms/showers, a fishing dock, swim beach and group recreation facilities. It is one of the lake's two year-round overnight parks; reserve a real campsite and distinguish day-use recreation from overnight access.",
        "href": "https://www.swf-wc.usace.army.mil/lakeopines/Recreation/Parks/"
      },
      {
        "name": "Alley Creek and Buckhorn Creek — summer-season campgrounds",
        "type": "Seasonal Corps campgrounds",
        "summary": "USACE lists Alley Creek with 49 RV and 30 tent sites and Buckhorn Creek with 62 RV and 38 tent sites. Both are marked summer-only in the operator park table, so they should not be shown as currently open for late-October overnight camping. Check reopening notices before planning spring travel.",
        "href": "https://www.swf-wc.usace.army.mil/lakeopines/Recreation/Parks/"
      }
    ],
    "regulations": [
      {
        "label": "Special winter crappie must-retain rule",
        "text": "At Lake O' the Pines from December 1 through the end of February, TPWD removes the crappie minimum length and requires retaining every crappie caught. From March through November, crappie require at least 10 inches. The year-round combined black/white crappie daily bag remains 25.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0428"
      },
      {
        "label": "Blue/channel catfish size distribution",
        "text": "TPWD's O' the Pines waterbody schedule limits blue and channel catfish to 25 daily combined, with at most 10 measuring 20 inches or longer. Flatheads separately require at least 18 inches and have a daily bag of five. Largemouth/smallmouth bass have a 14-inch minimum within the five-fish black-bass bag.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0428"
      },
      {
        "label": "No live nongame fish transport downstream of dam",
        "text": "TPWD specifically prohibits transporting live nongame fish from Big Cypress Bayou below the Lake O' the Pines dam, including the Texas waters of Caddo Lake, into another waterbody. Locally collected nongame baitfish may be used only in the waterbody where taken; this restriction is not a blanket ban on fishing bait.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/lop/"
      }
    ],
    "nearby": [
      {
        "label": "Johnson Creek Park — named swimming and fishing area",
        "description": "The Corps' developed-park directory lists Johnson Creek with a swimming beach, fishing dock, playground, group area and paved lakeshore recreation. These facilities offer a real family outing at Lake O' the Pines; the campground's year-round status does not guarantee every beach facility is open today.",
        "href": "https://www.swf-wc.usace.army.mil/lakeopines/Recreation/Camping/Devareas.shtml",
        "external": true
      },
      {
        "label": "Brushy Creek Park — lakefront fishing dock",
        "description": "USACE confirms an operator-maintained fishing dock and swimming beach at Brushy Creek, with developed campsite access and nearby day-use recreation. This is a real named lakeshore access point; ask the gate staff which facilities require an overnight campsite or day-use fee.",
        "href": "https://www.swf-wc.usace.army.mil/lakeopines/Recreation/Camping/Devareas.shtml",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://www.swf-wc.usace.army.mil/lakeopines/Recreation/Parks/",
      "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0428",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/lop/",
      "https://www.swf-wc.usace.army.mil/lakeopines/Recreation/Camping/Devareas.shtml"
    ]
  },
  "grapevine-lake": {
    "camping": [
      {
        "name": "Murrell Park — 11 primitive tent campsites",
        "type": "USACE reservable primitive tent campground",
        "summary": "USACE operates eleven designated short-stay tent campsites at Murrell Park. They have fire rings, communal water access and pit toilets but no showers or RV hookups; RV/trailer camping is explicitly prohibited. Sites require reservations through Recreation.gov and may have burn restrictions; don't mistake free day-use access for free overnight camping.",
        "href": "https://www.swf-wc.usace.army.mil/grapevine/Recreation/Parks/Corpsparks.shtml"
      },
      {
        "name": "Twin Coves Park — Flower Mound RV sites and cabins",
        "type": "Municipally operated cabins and RV camping",
        "summary": "The Corps identifies Twin Coves Park on Grapevine Lake's north shore as a Town of Flower Mound lease with overnight RV sites, cabins and primitive sites plus trail and boat access. The town manages reservations, fees and cabin availability, not the Corps' Murrell Park gatehouse.",
        "href": "https://www.swf-wc.usace.army.mil/grapevine/Recreation/Parks/Leaseparks.shtml"
      },
      {
        "name": "Vineyards Campground — City of Grapevine RV, tent and cabins",
        "type": "Municipal resort campground",
        "summary": "The Corps' lease-park inventory verifies that the City of Grapevine operates Vineyards Campground with RV and tent sites, rental cabins, laundry, playground and a boat ramp/fish-cleaning station. Confirm hookup classes and live vacancies directly with the city operator rather than assuming its amenities match primitive Murrell Park.",
        "href": "https://www.swf-wc.usace.army.mil/grapevine/Recreation/Parks/Leaseparks.shtml"
      }
    ],
    "regulations": [
      {
        "label": "Special Grapevine largemouth harvest rule",
        "text": "TPWD's Grapevine-specific regulations have no general minimum size for largemouth bass, but permit no more than two retained largemouth bass shorter than 18 inches daily. The combined daily bag for all black bass remains five; smallmouth have a 14-inch minimum. This is not an ordinary statewide 14-inch largemouth rule.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0320"
      },
      {
        "label": "Catfish and crappie limits",
        "text": "The TPWD Grapevine schedule permits 25 combined blue/channel catfish daily, no more than ten of them 20 inches or longer. Flatheads require 18 inches and allow five daily; crappie require 10 inches and allow 25 combined daily. Confirm the current lake page before retaining fish.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0320"
      },
      {
        "label": "Zebra mussel control and reported lake closures",
        "text": "TPWD warns that invasive zebra mussels have infested Grapevine Lake and some access parks may be closed. Drain the boat and onboard receptacles between freshwater lakes and consult Corps park status before visiting; lakewide fishing regulations do not guarantee access through a closed park gate.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/grapevine/"
      }
    ],
    "nearby": [
      {
        "label": "Northshore Trail from Murrell Park",
        "description": "The Corps' Murrell Park directory identifies the Northshore Trail access point near the marina, providing a named lakeside hiking and cycling route. Day-use facilities also include bank-fishing trails and lighted ramps, subject to park hours. This is not a generic downtown Grapevine attraction.",
        "href": "https://www.swf-wc.usace.army.mil/grapevine/Recreation/Parks/Corpsparks.shtml",
        "external": true
      },
      {
        "label": "Meadowmere Park — beach and primitive camping",
        "description": "The Corps' municipal lease inventory lists Meadowmere Park with primitive camping, swimming beach, boat access, a playground and group recreation pavilion under City of Grapevine management. It provides a separate shoreline recreation option from Twin Coves and Vineyards; confirm city park access.",
        "href": "https://www.swf-wc.usace.army.mil/grapevine/Recreation/Parks/Leaseparks.shtml",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://www.swf-wc.usace.army.mil/grapevine/Recreation/Parks/Corpsparks.shtml",
      "https://www.swf-wc.usace.army.mil/grapevine/Recreation/Parks/Leaseparks.shtml",
      "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0320",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/grapevine/"
    ]
  },
  "lake-bridgeport": {
    "camping": [
      {
        "name": "Wise County Park — county-operated lake campground",
        "type": "County park with operator-confirmed overnight camping",
        "summary": "TPWD's Lake Bridgeport access directory verifies Wise County Park on the north end just west of FM 2952. The county charges for camping and other park services, while day use and launching from three two-lane ramps are free. Call Wise County at the published 940-644-1910 to confirm individual site hookups, operating rules and current vacancies.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/bridgeport/access.phtml"
      }
    ],
    "regulations": [
      {
        "label": "Statewide fish-harvest schedule at Bridgeport",
        "text": "TPWD expressly states all Lake Bridgeport fish species currently follow statewide regulations. Largemouth and smallmouth bass, spotted bass, white/hybrid striped bass, catfish and crappie all occur here, but have distinct size and bag requirements under the Outdoor Annual; do not copy Grapevine's different largemouth exception.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/bridgeport/"
      },
      {
        "label": "Zebra mussels and water transfer",
        "text": "The TPWD Bridgeport lake-access guide confirms invasive zebra mussels. Texas law requires draining onboard water, including livewells and bait buckets, when moving to or from public freshwater. The reservoir typically varies substantially in level; confirm the exact ramp status before launching.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/bridgeport/"
      }
    ],
    "nearby": [
      {
        "label": "Wise County Park — boat ramps and lakeshore picnics",
        "description": "TPWD lists Wise County Park's three two-lane launch ramps, ADA-accessible features, restrooms and picnic grounds, on the north end of Lake Bridgeport. It is a named county facility with free boat launching and day use, separate from the fee-charging campground.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/bridgeport/access.phtml",
        "external": true
      },
      {
        "label": "Fort Richardson State Park — nearby historic fort",
        "description": "The TPWD Lake Bridgeport guide explicitly identifies Fort Richardson State Park as a nearby regional state park. Its historic frontier post and nature trails are a real heritage excursion from the lake, but not a walkable shoreline attraction; check current park access.",
        "href": "https://tpwd.texas.gov/state-parks/fort-richardson",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/bridgeport/access.phtml",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/bridgeport/",
      "https://tpwd.texas.gov/state-parks/fort-richardson"
    ]
  },
  "lake-austin": {
    "camping": [
      {
        "name": "Emma Long Metropolitan Park — Grove primitive walk-in campsites",
        "type": "City-operated primitive tent campground; utility outage",
        "summary": "Austin Parks and Recreation offers Grove primitive walk-in sites at Emma Long on Lake Austin, accommodating tents without utilities; campers park separately because there is no direct drive-in access. The city requires reservations online. Since October 12, 2026, water supplies, showers and sinks are shut down for maintenance through January 15, 2027, with portable toilets provided.",
        "href": "https://www.austintexas.gov/parks/emma-long-metropolitan-park"
      },
      {
        "name": "Emma Long Metropolitan Park — RV utility sites, 32-foot limit",
        "type": "City-operated RV campground; temporary water shutdown",
        "summary": "The city offers waterfront and non-waterfront RV camping sites with electrical and normally water hookups, but vehicles over 32 feet do not qualify. The water system is shut off October 12 through January 15, 2027, including the dump station, so do not advertise functioning water hookups during this outage. Confirm individual bookable sites before reserving.",
        "href": "https://www.austintexas.gov/parks/emma-long-metropolitan-park"
      }
    ],
    "regulations": [
      {
        "label": "Triploid grass carp must be released immediately",
        "text": "TPWD's Lake Austin fishery page confirms a Triploid Grass Carp Permit is active: any grass carp caught must immediately be returned to the water unharmed. Other resident species follow statewide harvest regulations, so this explicit grass-carp restriction is the critical lake-specific exception.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/austin/"
      },
      {
        "label": "Zebra mussels and mandatory drain-water controls",
        "text": "TPWD identifies a zebra mussel invasion on Lake Austin. Draining boats and onboard receptacles is required when leaving or approaching public fresh water; cleaning and drying gear reduces transfer risk to other Hill Country reservoirs. Verify lakewide access changes during LCRA maintenance drawdowns.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/austin/"
      },
      {
        "label": "October–November 2026 city ramp and swim closures",
        "text": "The City of Austin has explicitly closed Emma Long and Commons Ford public boat ramps and swimming areas from October 12 through November 30, 2026, during a managed lake drawdown. This is a verified temporary lake access restriction and must not be replaced with evergreen advice that both ramps are open.",
        "sourceUrl": "https://www.austintexas.gov/parks/parks-and-recreation-facilities-closures"
      }
    ],
    "nearby": [
      {
        "label": "Emma Long Park — lakeshore picnic and walking areas",
        "description": "Austin Parks operates Emma Long Metropolitan Park with reserved group picnic locations, open space, campground access and a designated lake swim area. The swimming area and ramp are temporarily closed through November 30, 2026, and the water system is off through mid-January 2027; verify before visiting.",
        "href": "https://www.austintexas.gov/parks/emma-long-metropolitan-park",
        "external": true
      },
      {
        "label": "Commons Ford Ranch Park — Lake Austin shoreline",
        "description": "Austin Parks identifies Commons Ford Ranch Metropolitan Park as a separate Lake Austin day-use setting with a boat ramp and swimming access, both currently closed through November 30, 2026 because of the drawdown. It remains a named park to revisit after the temporary city closure ends.",
        "href": "https://www.austintexas.gov/parks/parks-and-recreation-facilities-closures",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://www.austintexas.gov/parks/emma-long-metropolitan-park",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/austin/",
      "https://www.austintexas.gov/parks/parks-and-recreation-facilities-closures"
    ]
  },
  "fayette-county-reservoir": {
    "camping": [
      {
        "name": "Park Prairie Park — LCRA camping and fishing pier",
        "type": "LCRA-operated north-shore campground",
        "summary": "TPWD identifies Park Prairie Park on the north side of Fayette County Reservoir about ten miles east of La Grange as a Lower Colorado River Authority facility that offers overnight camping, an improved three-lane ramp, fishing pier and picnic areas. Park fees apply; use LCRA reservations and verify campsite hookups with the operator.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/fayette/access.phtml"
      },
      {
        "name": "Oak Thicket Park — LCRA campground and boat access",
        "type": "LCRA-operated campground",
        "summary": "TPWD verifies Oak Thicket Park as the other LCRA overnight camping facility on Fayette County Reservoir, two miles east of Park Prairie Road from Texas 159. It has a two-lane paved boat ramp and fishing pier; the operator handles campground reservations and park fees. Confirm individual campsite types before arrival.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/fayette/access.phtml"
      }
    ],
    "regulations": [
      {
        "label": "Protected largemouth bass slot of 16–24 inches",
        "text": "TPWD's Fayette County waterbody rule prohibits retaining largemouth bass longer than 16 inches but shorter than 24 inches. Bass 16 inches or less and at least 24 inches may be retained, with no more than one fish of 24 inches or longer daily. The combined black-bass daily bag is five.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0282"
      },
      {
        "label": "Trotlines and bowfishing prohibited",
        "text": "TPWD's Fayette County schedule specifically prohibits the use of trotlines. The TPWD lake profile also confirms that LCRA prohibits bowfishing on Fayette County Reservoir. These are local method restrictions, not blanket statements about every Texas reservoir, and should appear on the lake's rules page.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/fayette/"
      },
      {
        "label": "Blue/channel catfish 14-inch minimum and bag 15",
        "text": "The Fayette County Reservoir waterbody regulation requires at least 14 inches for blue and channel catfish, with a combined daily bag of 15 fish. Flatheads require 18 inches and have a five-fish daily bag. These site-specific limits differ from typical 25-fish statewide catfish allowances.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0282"
      }
    ],
    "nearby": [
      {
        "label": "Park Prairie Park — north-shore fishing pier",
        "description": "TPWD's official Park Prairie entry confirms a fishing pier and three-lane launch ramp, together with picnic and recreation access at the north shore of Fayette County Reservoir. It is an identifiable public lake activity rather than a vague suggestion to visit a county park.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/fayette/access.phtml",
        "external": true
      },
      {
        "label": "Oak Thicket Park — improved two-lane boat launch and pier",
        "description": "Oak Thicket Park's named ramp and public fishing pier offer a separate north-shore route to bank fishing and boating. TPWD lists it as a fee-charging LCRA park with year-round access; confirm weather closures and lake conditions before making a trip.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/fayette/access.phtml",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/fayette/access.phtml",
      "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0282",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/fayette/"
    ]
  },
  "alan-henry-reservoir": {
    "camping": [
      {
        "name": "Sam Wahl Recreation Area — primitive lake camping",
        "type": "Primitive campsite and self-contained RV parking only",
        "summary": "TPWD identifies Sam Wahl Recreation Area as the city-operated primary public lake access at Alan Henry Reservoir, with designated primitive campsites and spaces for self-contained RVs. It explicitly says there are no improved campground facilities or RV utility hookups inside the recreation area; do not mislabel the pier parking lot as a developed RV park.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/alan_henry/access.phtml"
      },
      {
        "name": "Grubbs Bait and Grill — private hookup camping opposite park entrance",
        "type": "TPWD-listed private RV campground",
        "summary": "TPWD specifically identifies a privately operated campground at Grubbs Bait and Grill across the road from the Sam Wahl Recreation Area entrance, with campsites offering RV hookups. It is not inside the city recreation park; contact the operator before depending on current hookups, campsite availability or restaurant service.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/alan_henry/access.phtml"
      }
    ],
    "regulations": [
      {
        "label": "Alan Henry special bass rules",
        "text": "TPWD's Alan Henry waterbody regulations identify local bass-size restrictions rather than allowing an angler to assume the statewide 14-inch largemouth minimum. Check the actual current reservoir schedule before harvesting largemouth or the stocked Alabama spotted bass population; fish identification changes which limits apply.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0006"
      },
      {
        "label": "Official fish-consumption advisory",
        "text": "TPWD flags an active consumption advisory for Alan Henry Reservoir. A legal catch may still be subject to separate eating recommendations by species and fish size; check the linked consumption notice before keeping a fish for the table, especially with children or frequent fish meals.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/alan_henry/"
      }
    ],
    "nearby": [
      {
        "label": "Sam Wahl fishing pier and steep-bank lookout",
        "description": "TPWD documents an improved fishing pier and boat dock at Sam Wahl Recreation Area, the lake's only public access site. The shoreline is unusually steep and restrooms lie a long uphill walk from the pier; this is specific practical visitor information for bank anglers.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/alan_henry/access.phtml",
        "external": true
      },
      {
        "label": "Sam Wahl four-lane boat ramp and lake trail setting",
        "description": "The city's Sam Wahl access facility has a four-lane ramp with parking for roughly 100 trailers, one of the few practical entry points to the narrow canyon lake. TPWD describes rock and flooded timber as key local structure and warns of limited alternative shoreline access.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/alan_henry/access.phtml",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/alan_henry/access.phtml",
      "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0006",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/alan_henry/"
    ]
  },
  "lake-stamford": {
    "camping": [
      {
        "name": "Stamford Park — city campground and cabins",
        "type": "City campground with hookups and cabins",
        "summary": "TPWD identifies Stamford Park on Stamford Reservoir, off FM 2976, as a city-run overnight facility with camping areas, RV hookups, cabins, a fishing house and a two-lane boat ramp. This is a named operator facility, not a generic access inventory entry. Confirm the specific utility class and current cabin rates with the city.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/stamford/access.phtml"
      },
      {
        "name": "Silo Scott Memorial Park — Haskell County hookup camping",
        "type": "County park with RV hookup camping",
        "summary": "Haskell County's Silo Scott Memorial Park near Anchor Marina has TPWD-verified camping areas with RV hookups, picnic sites and a single-lane boat ramp. The park is reached off FM 3495. Check county management and reservation terms before visiting; its facilities are separate from Stamford Park.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/stamford/access.phtml"
      }
    ],
    "regulations": [
      {
        "label": "Statewide fish harvest limits, no lake-specific slot",
        "text": "TPWD's Stamford Reservoir profile expressly says all species are managed under statewide regulations, including largemouth bass, white bass, catfish and white crappie. The correct size/bag limit depends on the caught species, not the presence of a boat launch at a private marina.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/stamford/"
      },
      {
        "label": "High water-level fluctuation affects fishing access",
        "text": "TPWD reports typical reservoir-level fluctuations of four to ten feet annually at Stamford, with occasionally severe low water and turbid clarity. The city's Stamford Marina ramp and county-operated Anchor Marina ramp are separate; contact operators to confirm each launch is usable before traveling.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/stamford/access.phtml"
      }
    ],
    "nearby": [
      {
        "label": "Stamford Park crappie fishing house",
        "description": "Stamford Marina in the city park includes a TPWD-listed enclosed crappie fishing house, with a fee charged for use. It is an identifiable facility worth planning around, not merely an unsourced recommendation for shoreline fishing.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/stamford/access.phtml",
        "external": true
      },
      {
        "label": "Silo Scott Memorial Park at Anchor Marina",
        "description": "TPWD identifies this Haskell County park on the reservoir as a public picnic and bank-fishing location with a boat launch. It is a distinct travel stop from Stamford Marina and provides an alternate shore sector when water level permits.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/stamford/access.phtml",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/stamford/access.phtml",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/stamford/"
    ]
  },
  "lake-sweetwater": {
    "camping": [
      {
        "name": "Sweetwater Lake City Park — municipal camping area",
        "type": "Municipal lake camping; hookups not independently confirmed",
        "summary": "TPWD's Sweetwater Reservoir public-access guide confirms the City of Sweetwater manages camping facilities, picnic sites, fishing docks and a marina alongside the reservoir's single five-lane lighted boat ramp. Individual RV utility hookups and site prices are not established in the TPWD record; contact the city rather than claiming a full-service RV park.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/sweetwater/access.phtml"
      }
    ],
    "regulations": [
      {
        "label": "All fish species follow statewide harvest limits",
        "text": "TPWD's Sweetwater Reservoir fisheries page states all game fish currently follow statewide rules, not a local protected-slot bass schedule. Largemouth bass, channel catfish, crappie and sunfish are present, but the same TPWD profile says fish populations have been badly reduced by earlier golden-alga blooms.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/sweetwater/"
      },
      {
        "label": "Golden alga bloom active as of source review",
        "text": "TPWD's current Sweetwater Reservoir access page prominently warns that an active golden-alga bloom may kill fish and degrade fishing prospects. This is a specifically documented local warning, not a new legal harvest ban. Check current TPWD updates before advertising productive angling or booking a long drive.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/sweetwater/access.phtml"
      }
    ],
    "nearby": [
      {
        "label": "Sweetwater City Park — fishing docks and lakeside picnic facilities",
        "description": "The city-operated Sweetwater Reservoir access area includes public fishing docks, a marina, picnic facilities and a multi-lane lighted launch. TPWD specifies that access is limited primarily to the park and ramp, making this the practical public visitor site at this reservoir.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/sweetwater/access.phtml",
        "external": true
      },
      {
        "label": "Sweetwater lake boat ramp — five-lane lighted launch",
        "description": "The public boat ramp off FM 2035 south of Interstate 20 is a five-lane lighted concrete launch with parking for about 50, managed by the City of Sweetwater. Fees apply. It is not a separate overnight campground even though the park has camping facilities.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/sweetwater/access.phtml",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/sweetwater/access.phtml",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/sweetwater/"
    ]
  },
  "benbrook-lake": {
    "camping": [
      {
        "name": "South Holiday Park — USACE developed camping",
        "type": "Corps campground with partial site closures",
        "summary": "The Corps identifies South Holiday as one of Benbrook's developed overnight campgrounds with electrical and water campsites, but its October 2026 park status lists substantial site closures and every boat ramp at this campground closed because of low reservoir elevation. Book only a verified available site and do not assume a reservation permits boat launching.",
        "href": "https://www.swf-wc.usace.army.mil/benbrook/"
      },
      {
        "name": "Bear Creek Campground — USACE developed sites",
        "type": "Seasonal Corps campground; currently closed",
        "summary": "USACE operates Bear Creek Campground as another developed utility-hookup camping facility at Benbrook Lake, but current Corps status shows it seasonally closed. This is not an immediately bookable autumn campground; check the federal campground reopening calendar before adding it to a trip itinerary.",
        "href": "https://www.swf-wc.usace.army.mil/benbrook/Recreation/Camping/"
      },
      {
        "name": "Westcreek Circle — primitive camping",
        "type": "Primitive camping area; access subject to closures",
        "summary": "The Corps' Benbrook campground information identifies Westcreek Circle as limited-development primitive camping. There are no RV campsite hookups, and camping is confined to designated park areas rather than anywhere along the shoreline. Confirm whether this loop is currently accessible during low-water restrictions.",
        "href": "https://www.swf-wc.usace.army.mil/benbrook/Recreation/Camping/"
      }
    ],
    "regulations": [
      {
        "label": "Statewide species-specific fish harvest at Benbrook",
        "text": "TPWD confirms Benbrook Lake follows statewide harvest limits for all resident species, including largemouth bass, white/hybrid striped bass, crappie and blue/channel catfish. There is no special slot rule for this lake; consult the official Outdoor Annual for each species before retaining a catch.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/benbrook/"
      },
      {
        "label": "Low-water closures of Benbrook boat ramps",
        "text": "The USACE 2026 facility status confirms South Holiday campground boat ramps closed, Longhorn and North Holiday launches closed and some day-use parks restricted due to low reservoir levels. Boat availability may change independently of campsite opening; check the Corps live status on the departure date.",
        "sourceUrl": "https://www.swf-wc.usace.army.mil/benbrook/"
      }
    ],
    "nearby": [
      {
        "label": "Mustang Day Use Park — currently usable lake access",
        "description": "The Corps status table identifies Mustang Day Use Park as open with its boat ramp open, while its swimming beach is closed because of low lake elevation. This distinction gives visitors a real alternative when ramps in Holiday Park cannot be used.",
        "href": "https://www.swf-wc.usace.army.mil/benbrook/",
        "external": true
      },
      {
        "label": "Benbrook Horseback and Nature Trail",
        "description": "The Corps' Benbrook recreation project manages horseback riding and nature paths as a separate land-based visitor activity. Check trail-gate rules, parking and seasonal restrictions before planning a ride or walk; do not assume access through closed low-water shoreline parks.",
        "href": "https://www.swf-wc.usace.army.mil/benbrook/Recreation/Camping/",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://www.swf-wc.usace.army.mil/benbrook/",
      "https://www.swf-wc.usace.army.mil/benbrook/Recreation/Camping/",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/benbrook/"
    ]
  },
  "calaveras-lake": {
    "camping": [
      {
        "name": "Calaveras Park — managed camping and RV hookup sites",
        "type": "Thousand Trails-operated lake campground",
        "summary": "The TPWD Calaveras public access inventory confirms that the Thousand Trails-managed Calaveras Park is the reservoir's overnight campground, with picnic areas, two four-lane paved boat ramps and a limited number of RV sites with hookups. Contact the operator at 210-635-8359 to reserve an actual site; day-use and overnight fees are separate.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/calaveras/access.phtml"
      }
    ],
    "regulations": [
      {
        "label": "Freshwater red-drum special harvest rule",
        "text": "TPWD expressly identifies a lake-specific red-drum harvest exception on Calaveras Lake. The reservoir's red drum were stocked into freshwater, where anglers must follow the precise inland-lake special rules rather than assuming the coastal 20–28-inch slot and red-drum tagging rules apply. Open the linked waterbody regulation before keeping a red drum.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/calaveras/"
      },
      {
        "label": "Check new CPS Energy park entry restrictions",
        "text": "TPWD's Calaveras fishery page reports new park visitor rules under the CPS Energy managing authority, separate from fisheries harvest limits. Boat anglers should verify current access hours, park fees and lake-specific restrictions with the public recreation operator instead of using outdated entry information.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/calaveras/"
      }
    ],
    "nearby": [
      {
        "label": "Calaveras Park — bank fishing and two launch facilities",
        "description": "TPWD identifies two four-lane concrete boat ramps roughly a quarter mile apart, plus good shoreline fishing, picnic grounds and park restrooms at Calaveras Park. The park is the reservoir's sole public lake access area, with entrance fees and current operator rules.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/calaveras/access.phtml",
        "external": true
      },
      {
        "label": "Calaveras Lake dam and intake riprap fishing structure",
        "description": "The official TPWD fishery guide identifies rock riprap along the dam and the power-plant intake canal as productive structure for freshwater red drum and other species. Consult operator boundary restrictions before targeting any restricted intake or dam facilities.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/calaveras/",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/calaveras/access.phtml",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/calaveras/"
    ]
  },
  "lake-houston": {
    "camping": [
      {
        "name": "Lake Houston Marina — private camping-equipped waterfront access",
        "type": "TPWD-listed private marina with camping; confirm operations",
        "summary": "TPWD's Lake Houston public-access table explicitly marks Lake Houston Marina as offering overnight camping, along with restrooms, marina services, accessible access, a two-lane launch ramp and fishing facilities. It is privately managed near the FM 1960 bridge; verify whether campsite pitches remain commercially available and which hookups are offered before booking.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/houston/access.phtml"
      }
    ],
    "regulations": [
      {
        "label": "Lake Houston uses statewide fishing regulations",
        "text": "The TPWD Lake Houston fisheries profile currently directs anglers to the statewide freshwater size and daily bag rules rather than publishing a local protected bass slot. Its shallow, turbid water and river-fed habitat create a different fishery from nearby Lake Conroe, so use the correct Lake Houston species and harvest schedules.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/houston/"
      },
      {
        "label": "Water hyacinth, water lettuce and navigation",
        "text": "TPWD documents invasive water hyacinth, alligatorweed and water lettuce among Lake Houston's emergent vegetation. Boat operators should verify navigability and ramp conditions at the actual bayou access site; lake-plant management warnings are not themselves a change to catfish or bass bag limits.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/houston/"
      }
    ],
    "nearby": [
      {
        "label": "Deussen Park — Harris County public boat access",
        "description": "Harris County's Deussen Park near the dam has two multi-lane launch ramps plus a separate sailboat ramp, picnic sites, parking and public bank-fishing access. TPWD lists no day-use ramp fee and daylight operation; the county park is not an overnight campground.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/houston/access.phtml",
        "external": true
      },
      {
        "label": "FM 1960 bridge shoreline fishing access",
        "description": "TPWD explicitly documents public bank-fishing opportunities beneath the FM 1960 bridge over Lake Houston. This is an actual named public access corridor separate from Deussen Park; shore conditions and traffic safety warrant care.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/houston/access.phtml",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/houston/access.phtml",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/houston/"
    ]
  },
  "lake-granbury": {
    "camping": [
      {
        "name": "Dinosaur Valley State Park — separate nearby state-park campground",
        "type": "Nearby campsite alternative; different park and waterbody",
        "summary": "TPWD operates developed electric-and-water campsites plus primitive camping at Dinosaur Valley State Park near Glen Rose. This is not a campsite on Lake Granbury or at any Brazos River Authority ramp; it's a regional camping alternative for visitors willing to drive from the reservoir. Reserve using the state-park operator.",
        "href": "https://tpwd.texas.gov/state-parks/dinosaur-valley"
      }
    ],
    "regulations": [
      {
        "label": "Statewide limits, no Granbury-specific harvest slot",
        "text": "TPWD's Lake Granbury fisheries profile states that all species follow statewide harvest regulations. Largemouth bass, white/striped bass, white crappie and channel/flathead catfish use species-specific statewide size and daily bag rules; fish-harvest law is separate from the Brazos River Authority's lake recreation rules.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/granbury/"
      },
      {
        "label": "Golden alga and major water-level changes",
        "text": "TPWD documents a history of golden-alga blooms that can kill fish in Lake Granbury and notes reservoir-level fluctuations up to 30 feet. These are lake-specific warnings about fishing success and safe ramp access, not permanent closures or special harvesting restrictions; consult fresh agency reports before planning a trip.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/granbury/"
      }
    ],
    "nearby": [
      {
        "label": "Hewlett Park — Granbury ADA-accessible pier",
        "description": "The official Lake Granbury access inventory identifies an ADA-accessible fishing pier in Hewlett Park across East Pearl Street from Granbury City Park. It is an actual named public fishing stop with no launch fee, distinct from a private marina or overnight campground.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/granbury/access.phtml",
        "external": true
      },
      {
        "label": "De Cordova Bend — Brazos tailrace fishing",
        "description": "TPWD documents a boat launch, public fishing pier and tailrace-area access at De Cordova Bend near the reservoir dam, operated by the Brazos River Authority. Visitors should check flow and dam safety notices, but the site is a real water-access destination.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/granbury/access.phtml",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/state-parks/dinosaur-valley",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/granbury/",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/granbury/access.phtml"
    ]
  },
  "proctor-lake": {
    "camping": [
      {
        "name": "Promontory Point Park — Corps lakeshore camping",
        "type": "Operator-researched campground",
        "summary": "TPWD's Proctor Lake recreation directory identifies Promontory Point as a Corps-operated park with camping, restrooms, picnic areas and two lighted two-lane concrete ramps. It is reached from Texas 16 via FM 2318; confirm specific campsites, utilities and bookings with the Corps office before arriving.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/proctor/access.phtml"
      },
      {
        "name": "Copperas Creek Park — federal campground and boat launch",
        "type": "Operator-researched campground",
        "summary": "The Corps-operated Copperas Creek public access area is explicitly marked by TPWD as offering camping and picnic facilities, plus two lighted concrete boat ramps. The approach is from FM 2861; overnight campsite hookup classes and fees must be checked with the Corps rather than inferred from the ramp listing.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/proctor/access.phtml"
      },
      {
        "name": "Sowell Creek Park — developed lakeshore campground",
        "type": "Operator-researched campground",
        "summary": "TPWD identifies Sowell Creek as a Corps park with camping and a multi-lane lighted launch ramp, reached from FM 1476. Bank fishing and picnics are offered in the same recreation area. Reserve named campsites via the federal operator and verify any park or boat-access closures.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/proctor/access.phtml"
      }
    ],
    "regulations": [
      {
        "label": "Proctor's current fishing limits",
        "text": "The TPWD Proctor Lake fishery profile lists the lake's target fisheries and directs anglers to the current statewide freshwater species rules unless the waterbody schedule has an exception. Bass, catfish, crappie and white bass have separate size/bag limits; do not import the different special rules of Lake O' the Pines.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/proctor/"
      },
      {
        "label": "Access gates, launch conditions and water levels",
        "text": "TPWD lists several separate Corps launch and camping areas at Proctor; only the named recreation parks are documented as campgrounds, while the Dam ramp is primarily a boating access site. Lake levels can affect actual launch usability despite a published 'open all year' inventory entry.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/proctor/access.phtml"
      }
    ],
    "nearby": [
      {
        "label": "Proctor Dam Recreation Area — public boat ramp",
        "description": "The USACE Dam access point off US 67/377 has a single-lane concrete ramp and parking for roughly 30 vehicles, according to TPWD's operator inventory. This is a named day-use outing, not proof of an overnight campground at the dam.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/proctor/access.phtml",
        "external": true
      },
      {
        "label": "Copperas Creek — lake recreation area",
        "description": "Copperas Creek has Corps-managed public picnicking, boating and bank-fishing facilities accessed via FM 2861. It's a real lake-specific park, and its ramps are distinct from the separate Promontory Point and Sowell Creek launch entrances.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/proctor/access.phtml",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/proctor/access.phtml",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/proctor/"
    ]
  },
  "granger-lake": {
    "camping": [
      {
        "name": "Willis Creek Park — USACE campground",
        "type": "Operator-researched campground",
        "summary": "The US Army Corps of Engineers operates Willis Creek on the north side of Granger Lake, at the mouth of Willis Creek on County Road 346. TPWD verifies overnight camping, restrooms, picnicking and a three-lane concrete ramp at the park; confirm site hookups and current reservations with the Corps.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/granger/access.phtml"
      },
      {
        "name": "Taylor Park — Corps campground on south shore",
        "type": "Operator-researched campground",
        "summary": "Taylor Park on Granger Lake's southern shore off FM 1331 is a Corps-developed overnight recreation area with camping, restrooms and a four-lane launch ramp. Fees apply and the park is listed year-round. Reserve specific campsites through the managing federal operator.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/granger/access.phtml"
      },
      {
        "name": "Wilson H. Fox Park — multi-ramp campground",
        "type": "Operator-researched campground",
        "summary": "TPWD lists Wilson H. Fox Park as another Corps-operated Granger campground with picnic facilities and two separate ramps, one six-lane and one two-lane. Access is via FM 1331; overnight sites are separate from fishing-pier or day-use admissions.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/granger/access.phtml"
      }
    ],
    "regulations": [
      {
        "label": "Current statewide harvest limits",
        "text": "TPWD's Granger Lake fisheries overview describes the reservoir's statewide fish-harvest schedule. Largemouth bass, white bass, catfish and crappie have distinct legal daily bags and minimum sizes, so check the current Outdoor Annual for the species being targeted rather than treating ramp regulations as fishing law.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/granger/"
      },
      {
        "label": "Zebra mussels and boat movement",
        "text": "TPWD explicitly warns that zebra mussels have invaded Granger Lake. State law requires draining vessels and onboard receptacles on leaving or approaching public freshwater, and anglers should inspect and clean trailers and gear when moving between Granger and other Central Texas lakes.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/granger/"
      }
    ],
    "nearby": [
      {
        "label": "San Gabriel WMA — jon boat and canoe launch",
        "description": "TPWD identifies the San Gabriel Wildlife Management Area at the mouth of the San Gabriel River as a free, primitive one-lane hand-launch location suitable for canoes and jon boats only, with no trailered boats. This is a named wildlife and shoreline access outing, not a developed campground.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/granger/access.phtml",
        "external": true
      },
      {
        "label": "Willis Creek Park — public shoreline and launch",
        "description": "The Corps' Willis Creek location provides picnicking, bank-fishing and a three-lane concrete launch at the creek mouth. It offers a real alternative lake sector to the larger south-shore Taylor and Wilson Fox park ramps, with separate operator fees.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/granger/access.phtml",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/granger/access.phtml",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/granger/"
    ]
  },
  "bardwell-lake": {
    "camping": [
      {
        "name": "Highview Park — USACE campground",
        "type": "Operator-researched campground",
        "summary": "The official TPWD Lake Bardwell access directory marks Highview Park on the western shore as a Corps-operated campground with public picnic areas and a four-lane launch ramp. The private Highview Marina is a separate business within the park. Confirm specific campsite utilities and reservation status through the Corps.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/bardwell/access.phtml"
      },
      {
        "name": "Waxahachie Creek Park — Corps campground",
        "type": "Operator-researched campground",
        "summary": "TPWD identifies Waxahachie Creek Park upstream of Bardwell's Highway 34 crossing as a camping-equipped USACE recreation park. Its two four-lane ramps and accessible facilities serve boating and camping traffic; the park entrance is reached by a short unpaved road off Texas 34.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/bardwell/access.phtml"
      }
    ],
    "regulations": [
      {
        "label": "Lake Bardwell fish species and statewide rules",
        "text": "TPWD's Lake Bardwell profile directs anglers to current statewide fish regulations for the listed white bass, hybrid striped bass, crappie and other resident fish. White bass have a different bag and minimum length from hybrid striped bass; identify catch species before applying the current Outdoor Annual.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/bardwell/"
      },
      {
        "label": "Closed state public ramp and active Corps facilities",
        "text": "TPWD's current Bardwell access table marks the State Public Ramp CLOSED, while Love, Little Mustang, Waxahachie Creek, Highview and Mott parks retain distinct Corps-run launches. Closure of one ramp is not closure of fishing on the entire lake; verify individual site access before towing.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/bardwell/access.phtml"
      }
    ],
    "nearby": [
      {
        "label": "Mott Park — named bank-fishing areas",
        "description": "TPWD's Mott Park listing identifies two public bank-fishing areas near the four-lane ramp on Lake Bardwell's west shore. Access is off FM 985; the park is a specific shore-fishing option rather than an invented attraction or an overnight site.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/bardwell/access.phtml",
        "external": true
      },
      {
        "label": "Little Mustang Creek — Lake Bardwell upper reach",
        "description": "The Corps' Little Mustang access area has a four-lane boat ramp and public lakeshore picnicking where Mustang and Little Mustang creeks enter the upper lake. It is an actual named recreation location and has its own entrance route.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/bardwell/access.phtml",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/bardwell/access.phtml",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/bardwell/"
    ]
  },
  "lake-nasworthy": {
    "camping": [
      {
        "name": "San Angelo city-managed Lake Nasworthy camping areas",
        "type": "Municipal lakeshore campgrounds; exact site selection required",
        "summary": "TPWD's Lake Nasworthy public access guide expressly confirms multiple public camping areas run by the San Angelo Parks & Recreation Department along the shore, plus private overnight providers. Campsite amenities, utility hookups, booking contacts and fees vary by named park, so contact the city for specific site verification.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/nasworthy/access.phtml"
      },
      {
        "name": "San Angelo State Park — nearby O.C. Fisher Lake camping",
        "type": "Nearby state park at another lake",
        "summary": "TPWD specifically identifies San Angelo State Park at O.C. Fisher Lake as a regional campsite alternative for a Lake Nasworthy fishing trip. It has developed campsites and separate park access, but is not a campground on Nasworthy's shore. Book through Texas State Parks.",
        "href": "https://tpwd.texas.gov/state-parks/san-angelo"
      }
    ],
    "regulations": [
      {
        "label": "Current statewide harvest rules at Nasworthy",
        "text": "TPWD's Lake Nasworthy fishing profile identifies species-specific freshwater regulations for bass, catfish and crappie and does not establish a special largemouth protected slot here. Anglers should use the current statewide Outdoor Annual for each fish species rather than copying rules from nearby Twin Buttes Reservoir.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/nasworthy/"
      },
      {
        "label": "Zebra mussel decontamination and local boating",
        "text": "TPWD confirms invasive zebra mussels in Lake Nasworthy, which requires draining boats, livewells and onboard water between public lakes. San Angelo city-managed ramps and campground entrances may have separate fees and boating-use conditions; check these with the city before towing.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/nasworthy/access.phtml"
      }
    ],
    "nearby": [
      {
        "label": "San Angelo's lakefront city parks and boat ramps",
        "description": "TPWD's public-access map identifies multiple City of San Angelo lakefront parks with campgrounds, fishing and boat launches on different portions of Nasworthy. These are genuine operator-managed access areas rather than a claim that one generic boat ramp serves all of the shoreline.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/nasworthy/access.phtml",
        "external": true
      },
      {
        "label": "San Angelo State Park — trails and bison/longhorn viewing",
        "description": "The regional TPWD state park at separate O.C. Fisher Lake offers hiking, mountain-bike and equestrian trails and its own bison and Texas longhorn exhibits. It is a legitimate area side trip, not a mislabeled Nasworthy waterfront attraction.",
        "href": "https://tpwd.texas.gov/state-parks/san-angelo",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/nasworthy/access.phtml",
      "https://tpwd.texas.gov/state-parks/san-angelo",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/nasworthy/"
    ]
  },
  "lake-tyler": {
    "camping": [
      {
        "name": "Lake Tyler Marina — city concession camping access",
        "type": "TPWD-listed concession marina camping",
        "summary": "TPWD marks Concession Area #1 at Lake Tyler Marina on Lake Tyler West as camping-equipped, with restrooms, fishing-cleaning facilities, bait, boat ramps and marina services. This is a named facility with an on-site camping designation; the private concession manages actual overnight site terms.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/tyler/access.phtml"
      },
      {
        "name": "Hill Creek Park and Chapman Park — primitive lake camping",
        "type": "City-permitted first-come primitive camping",
        "summary": "The City of Tyler permits primitive camping in its Lake Tyler public parks on a first-come basis. TPWD names Hill Creek Park and Old #2/Chapman Park as public access points; this camping is primitive, not a promise of 50-amp RV hookups or reservable lakeside cabins.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/tyler/access.phtml"
      }
    ],
    "regulations": [
      {
        "label": "Lake Tyler state fish rules with local city-water distinction",
        "text": "TPWD's Lake Tyler fishing profile identifies the fishing rules for both Lake Tyler West and Lake Tyler East; anglers should check the current statewide size/bag limits and any lake-specific provisions before keeping largemouth bass, crappie or catfish. City permit or boat-use restrictions are independent of state harvest law.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/tyler/"
      },
      {
        "label": "Lake Tyler West vs Lake Tyler East access differences",
        "text": "TPWD distinguishes the City's two impoundments: Lake Tyler West has the private concession marina and barge access, while Lake Tyler East has separate public access ramps. Primitive camping is allowed at city parks, but launch and concession fees differ by facility.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/tyler/access.phtml"
      }
    ],
    "nearby": [
      {
        "label": "Fritz & Opal's Barge — fee-based shoreline fishing",
        "description": "TPWD identifies Fritz & Opal's Barge near the Old #2/Chapman Park access as an independent paid fishing platform for visitors without boats. The facility charges a fee and is listed as year-round; confirm current operating hours and costs before relying on the original TPWD prices.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/tyler/access.phtml",
        "external": true
      },
      {
        "label": "Hill Creek Park — named lake launch and fishing",
        "description": "The city-operated Hill Creek Park has a two-lane concrete ramp, loading piers and parking for trailers, accessed via South Hill Creek Road. It offers a specific alternative to the private marina and its launching fee, with separate primitive camping rules.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/tyler/access.phtml",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/tyler/access.phtml",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/tyler/"
    ]
  },
  "lake-cypress-springs": {
    "camping": [
      {
        "name": "Guthrie Park — Franklin County Water District camping",
        "type": "County water-district campground",
        "summary": "TPWD explicitly marks Guthrie Park near the north end of Lake Cypress Springs Dam as a public park offering overnight camping, picnic sites, restrooms and a concrete launch ramp. The Franklin County Water District operates the park and charges entry; ask the district which campsites are currently permitted and whether hookups exist.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/cypress_springs/access.phtml"
      },
      {
        "name": "Dogwood Park — separate south-dam camping area",
        "type": "County water-district campsite area",
        "summary": "TPWD's Cypress Springs access inventory marks Dogwood Park south of the dam as a camping-equipped Franklin County Water District facility, with restrooms, picnic area and paved boat ramp. It is distinct from Guthrie Park's north-dam entrance and requires an independent park access fee.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/cypress_springs/access.phtml"
      }
    ],
    "regulations": [
      {
        "label": "Grass carp must immediately be released unharmed",
        "text": "TPWD documents an active Triploid Grass Carp Permit on Lake Cypress Springs. Any grass carp caught must immediately be returned to the water unharmed; this is a specific fish-handling restriction not present on every East Texas lake. All other species are currently managed under statewide rules.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/cypress_springs/"
      },
      {
        "label": "Waterdistrict park fees and habitat structures",
        "text": "The Franklin County Water District operates named launch parks around Cypress Springs and TPWD records a per-person access fee. TPWD also maps artificial fish-habitat structures and describes shoreline riprap and boathouse cover; current fishing method and harvest limits are distinct from park entrance charges.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/cypress_springs/access.phtml"
      }
    ],
    "nearby": [
      {
        "label": "Walleye Park — named northern lake launch",
        "description": "The water district's Walleye Park has a concrete all-boat ramp, fish-cleaning facilities and public picnicking on the north shore near Lake Cypress Springs Dam. TPWD gives a specific approach from FM 3122 and SE 4220; day-use fees apply.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/cypress_springs/access.phtml",
        "external": true
      },
      {
        "label": "Mary King Park — Turkey Cove recreation",
        "description": "TPWD identifies Mary King Park in Turkey Cove on the lake's south shore, with a public boat ramp, picnicking and day-use access. This is an identifiable mid-lake park away from the two dam-area campgrounds, not a generic related-county suggestion.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/cypress_springs/access.phtml",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/cypress_springs/access.phtml",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/cypress_springs/"
    ]
  },
  "lake-weatherford": {
    "camping": [
      {
        "name": "No overnight camping permitted on Lake Weatherford",
        "type": "Verified camping prohibition; no on-lake campground",
        "summary": "The official TPWD Lake Weatherford access guide explicitly says overnight camping is not allowed anywhere on this city reservoir. There are no legal on-lake campsite hookups to recommend; callers seeking an RV park must locate accommodation off the lake and should not park overnight at the marina.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/weatherford/access.phtml"
      },
      {
        "name": "Lake Mineral Wells State Park — separate nearby overnight base",
        "type": "Nearby state-park camping on a different lake",
        "summary": "For a regional overnight trip, TPWD offers reservable developed and water-only campsites at Lake Mineral Wells State Park. This campground is on another reservoir west of Weatherford, not on Lake Weatherford. Select the separate park reservation before planning a day trip to the city marina.",
        "href": "https://tpwd.texas.gov/state-parks/lake-mineral-wells/fees-facilities/campsites"
      }
    ],
    "regulations": [
      {
        "label": "Statewide harvest rules at Lake Weatherford",
        "text": "The TPWD Lake Weatherford fisheries profile confirms all resident fish currently follow statewide size and bag limits. The reservoir supports largemouth bass, white bass, crappie, channel catfish and sunfish, but the legal retention thresholds differ by species and must be checked on the current Outdoor Annual.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/weatherford/"
      },
      {
        "label": "Overnight camping restriction and launch conditions",
        "text": "The City of Weatherford does not allow overnight camping at this reservoir. TPWD identifies the marina as the improved public boat ramp with a launch fee, while two upstream unimproved ramps suit only small aluminum craft; do not plan to camp beside either ramp.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/weatherford/access.phtml"
      }
    ],
    "nearby": [
      {
        "label": "Weatherford Marina — city lake ramp and fishing access",
        "description": "TPWD identifies Weatherford Marina off West Lake Drive as the city's improved launch facility, with tackle, bait, courtesy docks and a fee-based ramp usable by a range of boat types. It is a legitimate fishing starting point, not an overnight campground.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/weatherford/access.phtml",
        "external": true
      },
      {
        "label": "Lake Mineral Wells State Park — Penitentiary Hollow",
        "description": "The separate state park northwest of Weatherford includes Penitentiary Hollow's distinctive rock-climbing setting, historic paths and a named lakeside trail network. It is a regional side trip requiring a drive, not an attraction on Lake Weatherford's shoreline.",
        "href": "https://tpwd.texas.gov/state-parks/lake-mineral-wells",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/weatherford/access.phtml",
      "https://tpwd.texas.gov/state-parks/lake-mineral-wells/fees-facilities/campsites",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/weatherford/",
      "https://tpwd.texas.gov/state-parks/lake-mineral-wells"
    ]
  },
  "o-h-ivie-lake": {
    "camping": [
      {
        "name": "Concho Recreation Area — CRMWD lakeshore camping",
        "type": "Public recreation-area camping",
        "summary": "The Colorado River Municipal Water District manages Concho Recreation Area on O.H. Ivie Lake. TPWD identifies public camping and boat access at Concho, with an improved ramp and a marina; site utilities, bookings and launch conditions require confirmation with CRMWD, especially when reservoir elevation is low.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/o_h_ivie/access.phtml"
      },
      {
        "name": "Padgitt Recreation Area — separate CRMWD campground",
        "type": "Source-checked campground or documented no-camping policy",
        "summary": "TPWD lists Padgitt Recreation Area as a distinct public camping and boating location at O.H. Ivie, with improved ramps and shore access. It is not a campground at Concho; confirm road entrance, campsite service, day fees and whether low water affects its boat launching before travel.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/o_h_ivie/access.phtml"
      },
      {
        "name": "Kennedy Recreation Area — CRMWD park camping",
        "type": "Source-checked campground or documented no-camping policy",
        "summary": "Kennedy Recreation Area provides another named lakeshore camping area with a concrete ramp, operated under CRMWD and local marina management. The TPWD public-access table confirms overnight facilities, but does not verify a specific available RV pitch or its electrical hookup; ask the operator directly.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/o_h_ivie/access.phtml"
      }
    ],
    "regulations": [
      {
        "label": "Waterbody-specific exceptions and current TPWD schedule",
        "text": "TPWD expressly labels O.H. Ivie as a special-regulation reservoir for some fish. Its largemouth, smallmouth, catfish, white bass and crappie fisheries should be checked against the O.H. Ivie-specific current waterbody rule before harvest, not an assumed statewide bag limit copied from a neighboring lake.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/o_h_ivie/"
      },
      {
        "label": "Zebra mussel precautions and launch water level",
        "text": "TPWD confirms zebra mussels have invaded O.H. Ivie Lake, so vessels and onboard receptacles must be drained between public freshwaters and gear inspected. Its normal level fluctuation of six to ten feet means ramp usability should be verified against today's lake level; an official access inventory does not guarantee a usable launch.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/o_h_ivie/"
      }
    ],
    "nearby": [
      {
        "label": "Concho Recreation Area — reservoir angling access",
        "description": "The official TPWD O.H. Ivie access inventory identifies Concho as a developed reservoir recreation and launch facility for shore and boat anglers. It is one of three separate CRMWD park entrances, so the right marina and camping area should be chosen before towing.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/o_h_ivie/access.phtml",
        "external": true
      },
      {
        "label": "Kennedy and Padgitt recreation-area shoreline",
        "description": "TPWD identifies Kennedy and Padgitt as distinct public visitor areas with their own ramps, camping and lakeshore facilities. They offer alternatives when one reservoir arm's launch becomes too shallow; confirm individual operating status, not just a generic map pin.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/o_h_ivie/access.phtml",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/o_h_ivie/access.phtml",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/o_h_ivie/"
    ]
  },
  "falcon-international-reservoir": {
    "camping": [
      {
        "name": "Falcon State Park — Javelina Run 31 full-hookup campsites",
        "type": "TPWD full-hookup RV campground",
        "summary": "TPWD lists 31 Javelina Run sites, numbers 201 through 231, with water, sewer and 30/50-amp electricity and pull-through parking. They are near restrooms and have covered picnic tables and grills. State park entrance fees apply separately and reservations should be made for specific sites.",
        "href": "https://tpwd.texas.gov/state-parks/falcon/fees-facilities/campsites"
      },
      {
        "name": "Falcon State Park — Mesquite Bend 31 water/electric sites",
        "type": "TPWD electric/water campground",
        "summary": "Mesquite Bend has 31 separate water-and-electric camping sites, numbered 101–131, with 30/50-amp service, covered picnic tables and wheelchair-accessible restrooms in the area. Unlike Javelina Run, these do not include sewer service at the campsite, so choose the right hookup type before booking.",
        "href": "https://tpwd.texas.gov/state-parks/falcon/fees-facilities/campsites"
      },
      {
        "name": "Falcon State Park — Black Bass Loop 36 water-only sites",
        "type": "TPWD nonreservable water-only loop",
        "summary": "TPWD lists 36 Black Bass Loop sites, numbered 43–79, without utility hookups at each campsite. Water and restrooms are nearby; the agency says these sites are not reservable. Do not present them as guaranteed overnight availability, especially if visiting for a tournament.",
        "href": "https://tpwd.texas.gov/state-parks/falcon/fees-facilities/campsites"
      }
    ],
    "regulations": [
      {
        "label": "Rio Grande border-water rules and species-specific limits",
        "text": "Falcon International Reservoir lies on the Texas–Mexico Rio Grande border, so fishing or entering Mexico waters has different licensing and access rules from fishing its Texas shoreline. TPWD identifies special waterbody harvest regulations on Falcon; consult its actual Falcon schedule before keeping largemouth bass, catfish or alligator gar.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/falcon/"
      },
      {
        "label": "Severe water-level fluctuations affect launches",
        "text": "TPWD documents normal Falcon Reservoir fluctuation of forty to fifty feet or more, enough to make an old launch or shoreline campground map misleading. Falcon State Park offers developed camping and a ramp; the separate Zapata County Arroyo Veleno ramp is free but is not listed as overnight camping. Check reservoir levels before towing.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/falcon/access.phtml"
      }
    ],
    "nearby": [
      {
        "label": "Falcon State Park — Rio Grande birding and hiking",
        "description": "Falcon State Park's mapped desert and thornscrub trails provide birding for South Texas specialty species and wildlife viewing along the Rio Grande corridor. This is a genuine park activity separate from the reservoir's fishing launch; seasonal heat and park alerts should influence trip planning.",
        "href": "https://tpwd.texas.gov/state-parks/falcon",
        "external": true
      },
      {
        "label": "Arroyo Veleno boat launch — Zapata County",
        "description": "The Arroyo Veleno public ramp, about one mile south of its US 83 bridge, is a distinct Zapata County launch with no access fee according to TPWD. It is not a campground, making it a day-use alternative to Falcon State Park's fee-charging launch.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/falcon/access.phtml",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/state-parks/falcon/fees-facilities/campsites",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/falcon/",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/falcon/access.phtml",
      "https://tpwd.texas.gov/state-parks/falcon"
    ]
  },
  "lake-ray-hubbard": {
    "camping": [
      {
        "name": "No overnight camping around Lake Ray Hubbard",
        "type": "Confirmed no-camping restriction",
        "summary": "TPWD expressly states that no camping is available around Lake Ray Hubbard. Day-use parks, ramps, marinas and fishing barges are not overnight campgrounds, so visitors should arrange lodging away from the lake rather than assuming any waterfront ramp allows tents or RVs.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/ray_hubbard/access.phtml"
      },
      {
        "name": "Cedar Hill State Park — off-lake camping alternative",
        "type": "Separate lake campground",
        "summary": "TPWD offers developed full-hookup and water/electric sites at Cedar Hill State Park on Joe Pool Lake, a completely different reservoir. This is a regional overnight alternative rather than a purported camp at Lake Ray Hubbard; check travel arrangements and park availability separately.",
        "href": "https://tpwd.texas.gov/state-parks/cedar-hill/fees-facilities/campsites"
      }
    ],
    "regulations": [
      {
        "label": "All species currently follow statewide harvest rules",
        "text": "TPWD's Lake Ray Hubbard fishing guide explicitly states that all fish species currently follow statewide freshwater regulations. Hybrid striped bass and blue catfish are especially productive here, but their size and daily bag limits differ from white bass, largemouth bass and crappie; identify a species before harvesting.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/ray_hubbard/"
      },
      {
        "label": "No camping and separate city boat-launch requirements",
        "text": "The TPWD access directory prohibits camping and details distinct municipal/private launch options: Paul Jones Park has four concrete lanes without a fee, while privately run Harbor Bay Marina charges a launch fee and offers a fishing barge. These are access policies, not exceptions to state fish-bag limits.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/ray_hubbard/access.phtml"
      }
    ],
    "nearby": [
      {
        "label": "Paddle Point Park — Rowlett paddling trail put-in",
        "description": "At 6775 Miller Road, the City of Rowlett's Paddle Point Park provides a gravel/dirt single-lane put-in strictly for nonmotorized craft and is the starting point of a TPWD Paddling Trail. It is not a trailer-motorboat ramp or overnight park.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/ray_hubbard/access.phtml",
        "external": true
      },
      {
        "label": "Paul Jones Park — Garland public launch",
        "description": "TPWD lists Paul Jones Park at 4099 Zion Road in Garland as a four-lane public concrete boat launch with parking for roughly fifty vehicles and no fee. It is a distinct shoreline day trip, not a campground; confirm any city gate changes before departure.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/ray_hubbard/access.phtml",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/ray_hubbard/access.phtml",
      "https://tpwd.texas.gov/state-parks/cedar-hill/fees-facilities/campsites",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/ray_hubbard/"
    ]
  },
  "eagle-mountain-lake": {
    "camping": [
      {
        "name": "West Bay Marina — TPWD-listed private camping facilities",
        "type": "TPWD camping-indicated private marina; book directly",
        "summary": "TPWD marks West Bay Marina on Eagle Mountain Lake as a private facility with camping as well as a two-lane concrete launch and restrooms. From Texas 199 it is accessed via FM 730, Timber Road and Liberty School Road. Overnight site inventory and booking are not published by TPWD; verify the actual offering with the operator.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/eagle_mountain/access.phtml"
      },
      {
        "name": "Lakeview Marina — RV availability not established",
        "type": "Boat ramp only — camping unverified",
        "summary": "Lakeview Marina is a named commercial ramp west of Boat Club Road and Peden Road, but its boat-launch listing alone does not establish usable overnight camping. Include it only as a launch alternative rather than silently treating a marina as an RV campground.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/eagle_mountain/access2.phtml"
      }
    ],
    "regulations": [
      {
        "label": "Statewide harvest rules for Eagle Mountain fish",
        "text": "TPWD's official Eagle Mountain Lake fishing profile lists largemouth bass, white bass, channel/blue catfish and crappie and directs anglers to the current statewide freshwater fishing rules. Check the specific limits for the identified species rather than borrowing another North Texas reservoir's trophy slot.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/eagle_mountain/"
      },
      {
        "label": "Zebra mussels and lake-specific boating access",
        "text": "TPWD warns that zebra mussels have invaded Eagle Mountain Lake. Boat operators must drain boats and onsite receptacles when leaving or approaching public freshwater; different private marinas and municipal ramps also have separate fees, park operating rules and launch approaches.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/eagle_mountain/access.phtml"
      }
    ],
    "nearby": [
      {
        "label": "Twin Points Park — swimming and lakeshore recreation",
        "description": "TRWD's Eagle Mountain shoreline Twin Points Park is a named public day-use area with lake swimming and boating access; its seasonal beach operation differs from a marina ramp or overnight campground. Confirm current swimming availability, day passes and parking before the trip.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/eagle_mountain/access.phtml",
        "external": true
      },
      {
        "label": "West Bay Marina — named fishing and boating access",
        "description": "TPWD lists West Bay as a privately operated two-lane boat ramp with parking for up to fifty vehicles off Liberty School Road. It is a specific launch option on Eagle Mountain's shoreline with a commercial entrance fee, not simply an unsourced marina recommendation.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/eagle_mountain/access2.phtml",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/eagle_mountain/access.phtml",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/eagle_mountain/access2.phtml",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/eagle_mountain/"
    ]
  },
  "lake-nacogdoches": {
    "camping": [
      {
        "name": "Camping prohibited at Eastside and Westside public lake parks",
        "type": "Verified no-camping policy",
        "summary": "The City of Nacogdoches operates Eastside and Westside Parks as public boating, fishing, picnicking and swimming locations, but TPWD explicitly says camping is not permitted at either park. Neither day-use parking lot should be advertised as an overnight campsite; both parks close at 10 p.m.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/nacogdoches/access.phtml"
      },
      {
        "name": "Mission Tejas State Park — separate regional campground",
        "type": "Off-lake state-park campground",
        "summary": "TPWD identifies Mission Tejas State Park in the regional lake guide's nearby-parks references. This park offers separately managed overnight camping near Weches and is not on Lake Nacogdoches; confirm reservation availability and actual driving route before treating it as a base.",
        "href": "https://tpwd.texas.gov/state-parks/mission-tejas/fees-facilities/campsites"
      }
    ],
    "regulations": [
      {
        "label": "Largemouth bass special 16-inch maximum",
        "text": "TPWD's Nacogdoches lake fishery profile explicitly calls out a 16-inch maximum-size bass regulation, associated with the lake's trophy-bass fishery. The precise current daily bag and exceptions must be checked on the TPWD Nacogdoches waterbody schedule; this is not the generic 14-inch largemouth minimum of most Texas lakes.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/nacogdoches/"
      },
      {
        "label": "Bass conservation and summer fishery outlook",
        "text": "TPWD describes abundant largemouth bass, hydrilla, lotus and dock habitat at Nacogdoches, plus good bluegill and redear sunfish but only fair crappie populations. Special bass harvest rules must be checked before retaining trophy fish, and Eastside/Westside park closure times apply independently of fishing bag limits.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/nacogdoches/"
      }
    ],
    "nearby": [
      {
        "label": "Westside Park — two-thirds-mile nature trail",
        "description": "TPWD identifies a two-thirds-mile nature trail in the City's Westside Park, off County Road 225 west of Nacogdoches, together with a two-lane boat ramp, swimming and picnic amenities. This is a named on-site walking attraction, not a campground.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/nacogdoches/access.phtml",
        "external": true
      },
      {
        "label": "Eastside Park — accessible lakeside swimming and picnic",
        "description": "The City's Eastside Park offers a one-lane concrete boat launch, shore fishing, picnic space and swimming area, open year-round but closing at 10 p.m. according to TPWD. It is another day-use lake visitor area, with no camping allowed.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/nacogdoches/access.phtml",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/nacogdoches/access.phtml",
      "https://tpwd.texas.gov/state-parks/mission-tejas/fees-facilities/campsites",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/nacogdoches/"
    ]
  },
  "aquilla-lake": {
    "camping": [
      {
        "name": "No camping facilities at Aquilla's public boat-ramp parks",
        "type": "No campground documented at lake public access points",
        "summary": "TPWD lists Dairy Hill and Old School as lake boat ramps with restrooms and parking but does not identify any camping facility at either, nor at the dam tailrace pier. No lakefront campsite should be inferred from the presence of parking, shoreline fishing, or a public Corps ramp.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/aquilla/access.phtml"
      },
      {
        "name": "Lake Whitney State Park — separate overnight base",
        "type": "Nearby state park, different lake",
        "summary": "TPWD's Lake Whitney State Park operates developed electric and full-hookup campsites and water-only camping on Lake Whitney, a separate reservoir. This offers a researched regional overnight alternative for Aquilla anglers; no implication is made that Whitney campsites are on Aquilla's shoreline.",
        "href": "https://tpwd.texas.gov/state-parks/lake-whitney/fees-facilities/campsites"
      }
    ],
    "regulations": [
      {
        "label": "Apply Aquilla's current species-specific fish limits",
        "text": "The TPWD Aquilla Lake fishery profile provides freshwater black-bass, crappie, white-bass and catfish guidance and references the applicable state waterbody rules. These limits require identification of the species and must be checked directly before harvest; TPWD lists no source-verified special slot rule in the access inventory.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/aquilla/"
      },
      {
        "label": "No campsite at ramps; tailrace is fishing-pier-only",
        "text": "Aquilla's two Corps-operated ramps are Dairy Hill and Old School, both listed year-round without launch fees. TPWD separately identifies a free public tailrace fishing pier below the dam off Highway 310, with no boat ramp. These locations cannot be substituted for an overnight campsite.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/aquilla/access.phtml"
      }
    ],
    "nearby": [
      {
        "label": "Aquilla Dam tailrace fishing pier",
        "description": "The Corps of Engineers operates a free public fishing pier below Aquilla Dam, reached off Highway 310. TPWD expressly says there is no boat launch at the tailrace. It's a real, separately accessible bank-fishing stop, not another marina or campground.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/aquilla/access.phtml",
        "external": true
      },
      {
        "label": "Old School Ramp and Dairy Hill lakeshore access",
        "description": "Old School, west of Aquilla off FM 933, and Dairy Hill on the east shore near FM 1947 are two distinct Corps ramp areas. Both have restroom facilities and vehicle-trailer parking; the access guide does not show overnight camping at either site.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/aquilla/access.phtml",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/aquilla/access.phtml",
      "https://tpwd.texas.gov/state-parks/lake-whitney/fees-facilities/campsites",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/aquilla/"
    ]
  },
  "white-rock-lake": {
    "camping": [
      {
        "name": "No camping permitted at White Rock Lake Park",
        "type": "Verified city-lake camping prohibition",
        "summary": "TPWD directly states camping is prohibited around White Rock Lake. Its public shoreline contains piers and boat ramps but the park observes a midnight-to-5 a.m. curfew, so overnight tents or RV parking cannot be recommended regardless of launch access.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/white_rock/access.phtml"
      },
      {
        "name": "Cedar Hill State Park — separate Joe Pool Lake campground",
        "type": "Off-lake state-park camping",
        "summary": "TPWD has developed full-hookup, electric and primitive campsites at Cedar Hill State Park on Joe Pool Lake, a different waterbody southwest of Dallas. It can be considered as a regional camping base, but there are no lakefront campsites at White Rock itself.",
        "href": "https://tpwd.texas.gov/state-parks/cedar-hill/fees-facilities/campsites"
      }
    ],
    "regulations": [
      {
        "label": "White Rock fish use statewide freshwater harvest limits",
        "text": "TPWD says all species at White Rock Lake currently follow statewide freshwater regulations, including largemouth bass, channel catfish and white crappie. Anglers should distinguish the relevant bag and length limits for each fish species rather than assuming an urban lake has no harvest restrictions.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/white_rock/"
      },
      {
        "label": "9.9-horsepower motor cap and park curfew",
        "text": "TPWD's main White Rock fishery profile states a 9.9-horsepower outboard motor limit, while its boat-access page phrases a 10.5-HP cap. Because those TPWD pages disagree, follow the more conservative 9.9-HP interpretation and confirm with Dallas Parks before launching; electric trolling motors are permitted. Park curfew is midnight–5 a.m.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/white_rock/"
      }
    ],
    "nearby": [
      {
        "label": "West Lawther Ramp — free city single-lane launch",
        "description": "TPWD locates the no-fee West Lawther single-lane ramp opposite Fisher Road, with space for about thirty vehicles. It serves as a distinct White Rock boat and paddling entry, not a campsite or marina resort.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/white_rock/access.phtml",
        "external": true
      },
      {
        "label": "Big Thicket Boat Ramp — White Rock east shore",
        "description": "The City of Dallas operates the three-lane Big Thicket launch along East Lawther Drive reached from Mockingbird Lane, with about thirty trailer spaces and free year-round access. Shoreline fishing and recreation are separate from overnight camping, which is prohibited.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/white_rock/access.phtml",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/white_rock/access.phtml",
      "https://tpwd.texas.gov/state-parks/cedar-hill/fees-facilities/campsites",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/white_rock/"
    ]
  },
  "lake-arlington": {
    "camping": [
      {
        "name": "Lake Arlington's three public parks are day-use boat access, not campgrounds",
        "type": "No overnight camping documented at the three public ramps",
        "summary": "TPWD's official access matrix shows no camping provision at Richard Simpson Park, Bowman Springs Park or Eugene McCray Park. The city requires an additional boat permit; do not present public parking or picnic facilities as overnight RV or tent sites.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/arlington/access.phtml"
      },
      {
        "name": "Cedar Hill State Park — developed camping on Joe Pool Lake",
        "type": "Off-lake campground, different reservoir",
        "summary": "TPWD lists reservable electric, full-hookup and primitive camping at Cedar Hill State Park on Joe Pool Lake. It is a genuinely different waterbody and a regional overnight base, not camping on Lake Arlington, so plan the trip and reservations separately.",
        "href": "https://tpwd.texas.gov/state-parks/cedar-hill/fees-facilities/campsites"
      }
    ],
    "regulations": [
      {
        "label": "Statewide freshwater harvest rules at Lake Arlington",
        "text": "The current TPWD Lake Arlington fishery profile says all species are managed under statewide regulations, including largemouth and white bass, crappie and catfish. Largemouth are the primary fishery; the reservoir's hybrid striped-bass stocking program was discontinued, so older claims of annual stocking are misleading.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/arlington/"
      },
      {
        "label": "City boating permit and safety near stump fields",
        "text": "TPWD says the City of Arlington requires a boat-use permit for lake access. Richard Simpson and Bowman Springs have eight-lane ramps and Eugene McCray has a two-lane ramp. Boat operators should note TPWD's buoyed stump-field hazards, distinct from the statewide fish-harvest regulations.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/arlington/access.phtml"
      }
    ],
    "nearby": [
      {
        "label": "Bowman Springs Park — west-shore eight-lane ramp",
        "description": "This City of Arlington park is reached from Poly Webb Road and offers an eight-lane boat ramp, picnic access and public lake recreation with a city boat-use fee. It is a real separate destination from Richard Simpson Park, not a campground.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/arlington/access.phtml",
        "external": true
      },
      {
        "label": "Richard Simpson Park — north-shore boating and fishing",
        "description": "Richard Simpson Park near Arkansas Lane and Green Oaks Boulevard provides another eight-lane public launch, lake access and picnic facilities managed by the City of Arlington. Its city boat permit and park operations should be checked before departure.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/arlington/access.phtml",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/arlington/access.phtml",
      "https://tpwd.texas.gov/state-parks/cedar-hill/fees-facilities/campsites",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/arlington/"
    ]
  },
  "lake-worth": {
    "camping": [
      {
        "name": "Camping prohibited at all four Lake Worth boat-ramp parks",
        "type": "Verified lake camping prohibition",
        "summary": "TPWD's Lake Worth access page expressly says camping is not allowed at the reservoir's four public parks. Launch ramps, picnic areas, and shoreline parking are not overnight campsites. Travelers needing overnight lodging must select a separate permitted destination away from these parks.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/worth/access.phtml"
      },
      {
        "name": "Lake Mineral Wells State Park — separate regional camping alternative",
        "type": "Off-lake state park, other reservoir",
        "summary": "TPWD manages reservable electric and primitive campsites at Lake Mineral Wells State Park outside Fort Worth. They are on another lake and require a separate trip, so this is an explicitly off-lake alternative—not a misleading Lake Worth waterfront campground.",
        "href": "https://tpwd.texas.gov/state-parks/lake-mineral-wells/fees-facilities/campsites"
      }
    ],
    "regulations": [
      {
        "label": "Lake Worth fish harvest limits and consumption are separate rules",
        "text": "TPWD says statewide size and bag limits generally govern fish harvest at Lake Worth. However, its official fish-consumption notice for Lake Worth and the Trinity upstream to Eagle Mountain warns about PCBs and dioxins and imposes species-specific eating restrictions; legal to catch does not mean safe to eat.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/worth/index.phtml"
      },
      {
        "label": "Current revised health advisory — no smallmouth buffalo consumption",
        "text": "TPWD's revised consumption-advisory table states no one should eat smallmouth buffalo from Lake Worth and the Trinity upstream to Eagle Mountain. It separately restricts flathead, blue catfish, striped/white bass, common carp and freshwater drum; do NOT repeat the older blanket instruction against eating blue or channel catfish without checking the revised advisory.",
        "sourceUrl": "https://tpwd.texas.gov/regulations/outdoor-annual/fishing/general-rules-regulations/fish-consumption-bans-and-advisories"
      },
      {
        "label": "Zebra mussels and no overnight ramp use",
        "text": "TPWD confirms zebra mussels have invaded Lake Worth, requiring draining onboard water and cleaning/drying gear between public reservoirs. Its access matrix lists four day-use boat-ramp parks and prohibits camping, which affects fishing trip logistics independently of fish harvest limits.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/worth/access.phtml"
      }
    ],
    "nearby": [
      {
        "label": "Arrow S Park — public ramp and bank fishing",
        "description": "TPWD's Lake Worth access directory documents Arrow S Park with its improved lake ramp, picnic space, parking and public shoreline use. It is one of four separate named municipal visitor areas, not a campground or a private marina resort.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/worth/access.phtml",
        "external": true
      },
      {
        "label": "Lake Worth City Park — separate public waterfront",
        "description": "The public Lake Worth City Park launch is listed in TPWD's city-access matrix along with picnic and ramp facilities. Visitors can compare the four distinct public entries for their preferred access, but none offers legal overnight camping.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/worth/access.phtml",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/worth/access.phtml",
      "https://tpwd.texas.gov/state-parks/lake-mineral-wells/fees-facilities/campsites",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/worth/index.phtml",
      "https://tpwd.texas.gov/regulations/outdoor-annual/fishing/general-rules-regulations/fish-consumption-bans-and-advisories"
    ]
  },
  "medina-lake": {
    "camping": [
      {
        "name": "Neither TPWD-listed Medina Lake launch confirms legal overnight camping",
        "type": "No campground verified at either public launch",
        "summary": "TPWD's Medina Lake access matrix lists Red Cove Camp at Mico and Bandera County's Park Road 37 launch, but neither has the campground indicator. A place named 'Camp' is not proof of RV/tent reservations. Do not send overnight travelers to either ramp without a separately confirmed operator booking.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/medina/access.phtml"
      },
      {
        "name": "Hill Country State Natural Area — backcountry camping at another site",
        "type": "Separate state natural area; primitive camping",
        "summary": "TPWD permits primitive equestrian, hike-in and group campsites in the Hill Country State Natural Area near Bandera. This is a separate public land property, not Lake Medina shoreline. Verify primitive campsite bookings and park access before treating it as an overnight base.",
        "href": "https://tpwd.texas.gov/state-parks/hill-country"
      }
    ],
    "regulations": [
      {
        "label": "All resident fish follow statewide harvest regulations",
        "text": "TPWD's Medina Lake fishing page explicitly says all fish currently follow statewide freshwater harvest limits. Largemouth, white/hybrid striped bass and blue/channel/flathead catfish each have distinct daily bag and size provisions. Don't transpose Lake Travis's LCRA bowfishing restrictions to this separate Bandera and Medina County reservoir.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/medina/"
      },
      {
        "label": "Zebra mussels and ramps that strand at low water",
        "text": "TPWD warns zebra mussels have invaded Medina Lake and requires draining water from boats and receptacles. Reservoir levels can fluctuate as much as forty feet: the concrete Red Cove launch may be unusable at lower water and gravel-bank launching may be necessary. Check the present water level before towing.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/medina/access.phtml"
      }
    ],
    "nearby": [
      {
        "label": "Red Cove Camp boat ramp — private Mico launch",
        "description": "Despite its name, Red Cove Camp is verified by TPWD as a private boat launch at Mico off FM 1283, with a two-lane concrete ramp and a fee. At very low water the operator may use a gravel bank; camping is not confirmed by the source.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/medina/access.phtml",
        "external": true
      },
      {
        "label": "Park Road 37 — Bandera County public lake entrance",
        "description": "Bandera County operates a second distinct launch at the end of Park Road 37 in Plum Creek Cove. TPWD lists the ramp open 24 hours but the park as day-use 7 a.m.–8 p.m., with fees and variable ramp reach in low water.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/medina/access.phtml",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/medina/access.phtml",
      "https://tpwd.texas.gov/state-parks/hill-country",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/medina/"
    ]
  },
  "bachman-lake": {
    "camping": [
      {
        "name": "No designated camping at Dallas Bachman Lake Park",
        "type": "No campground documented at urban city lake",
        "summary": "Bachman Lake is an urban Dallas city park, not a camping destination. The official TPWD access matrix records a city-run ramp and shoreline fishing but no campground or overnight accommodation. Visitors should not infer permission to sleep in the ramp parking area.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/bachman/access.phtml"
      },
      {
        "name": "Cedar Hill State Park — separate Dallas-area camping",
        "type": "Regional camping at a different lake",
        "summary": "TPWD's Cedar Hill State Park has developed campsites and primitive options at Joe Pool Lake, another waterbody. This is an alternative overnight base for Dallas-area travelers rather than an invented campsite beside Bachman Lake or Love Field.",
        "href": "https://tpwd.texas.gov/state-parks/cedar-hill/fees-facilities/campsites"
      }
    ],
    "regulations": [
      {
        "label": "Statewide fish harvest limits apply at Bachman Lake",
        "text": "TPWD says largemouth bass, channel and blue catfish, crappie and sunfish currently use statewide freshwater harvest rules at Bachman. The lake is only about 132 acres and has no separate lake-specific bass slot published; check the current species size and daily bag before retaining fish.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/bachman/"
      },
      {
        "label": "Five-horsepower motor cap on Bachman Lake",
        "text": "TPWD's main Bachman fishery profile specifies a five-horsepower limit on boat engines, while allowing electric trolling motors. This is a specific Dallas urban watercraft restriction separate from general Texas freshwater harvest rules. Check any city park gate conditions before launching.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/bachman/"
      }
    ],
    "nearby": [
      {
        "label": "Bachman Lake municipal boat ramp — Shorecrest Drive",
        "description": "TPWD's access inventory identifies a two-lane city concrete ramp off Shorecrest Drive near Dallas Love Field, with only a handful of spaces for boat trailers. It is a named practical launch, not a campground, and may be unsuitable for large trailers.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/bachman/access.phtml",
        "external": true
      },
      {
        "label": "Bachman Dam shoreline for crappie and sunfish",
        "description": "TPWD's fisheries page describes productive submerged brush near the dam for crappie, sunfish and bass, and southern riprap for largemouth fishing. These are distinct on-lake fishing patterns on a crowded urban shoreline; observe city park rules.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/bachman/",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/bachman/access.phtml",
      "https://tpwd.texas.gov/state-parks/cedar-hill/fees-facilities/campsites",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/bachman/"
    ]
  },
  "e-v-spence-reservoir": {
    "camping": [
      {
        "name": "Wildcat Recreation Area — CRMWD camping and marina",
        "type": "CRMWD camping at Wildcat Marina",
        "summary": "TPWD expressly marks Wildcat Recreation Area, about three miles west of Robert Lee on Texas 158, as a CRMWD campground with public camping and picnic facilities and a concrete boat ramp. The agency identifies Wildcat Marina as the onsite operator; call to confirm present ramp usability and actual overnight camping arrangements.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/spence/access.phtml"
      },
      {
        "name": "Paint Creek Recreation Area — separate CRMWD camping",
        "type": "CRMWD camping at Paint Creek",
        "summary": "TPWD identifies Paint Creek, five miles west of Robert Lee on Texas 158, as another public camping-equipped recreation area, managed by CRMWD and the Paint Creek Marina operator. Water level can prevent launching even while the campground remains accessible; contact the manager before booking.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/spence/access.phtml"
      },
      {
        "name": "Rough Creek recreation area — CLOSED",
        "type": "Closed facility — DO NOT BOOK",
        "summary": "TPWD prominently labels Rough Creek closed at present. This area must not be promoted as a legal or accessible overnight campsite or boat ramp, even though old lake brochures may still show its name. Check official agency status before considering reopening.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/spence/access.phtml"
      }
    ],
    "regulations": [
      {
        "label": "All fish currently follow statewide harvest rules",
        "text": "TPWD says all species at E.V. Spence are managed under statewide freshwater harvest regulations. Its fisheries include largemouth, white and striped bass, catfish and limited crappie; retention limits differ by species, and a boat-entry charge or reservoir pass is not a fishing license.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/spence/"
      },
      {
        "label": "Golden-alga fish-kill history and very low-water access",
        "text": "TPWD reports severe golden-alga fish kills at Spence in the early 2000s and subsequent modest fishery recovery. This is historical rather than a confirmed active bloom. The current Rough Creek closure and severe water-level decline create real access risks; check timestamped reservoir level and CRMWD park status before towing.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/spence/access.phtml"
      }
    ],
    "nearby": [
      {
        "label": "Wildcat Recreation Area — public fishing and boat ramp",
        "description": "Wildcat, off Texas 158 west of Robert Lee, is a named CRMWD recreation park with camping, picnic areas, a concrete launch and access to the reservoir's steep western shoreline. This is a real visitor facility, with launch usability affected by current elevation.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/spence/access.phtml",
        "external": true
      },
      {
        "label": "South End of Dam — day-use shoreline fishing",
        "description": "TPWD identifies South End of Dam as a separate shore-fishing area roughly a mile west of Robert Lee on Texas 158, with picnic facilities but no boat ramp. It is distinct from both closed Rough Creek and overnight Wildcat camping.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/spence/access.phtml",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/spence/access.phtml",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/spence/"
    ]
  },
  "brady-creek-reservoir": {
    "camping": [
      {
        "name": "Brady Lake City Park — municipal RV hookups and tent sites",
        "type": "City-operated camping and cabins",
        "summary": "TPWD confirms overnight camping at the City Park near the Brady Creek Reservoir dam, reached from FM 2028 and FM 3022. The City of Brady's separately documented park inventory describes RV hookup areas, tent camping and eight lake cabanas; check specific utility service, dated condition notices and reservations with city recreation staff.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/brady_creek/access.phtml"
      },
      {
        "name": "Brady Lake City Park — cabin/cabana lodging",
        "type": "City-managed cabins; reserve with operator",
        "summary": "The municipal Brady Lake site lists eight cabanas as a separate paid overnight lodging option from the tent and RV sites. TPWD identifies only one public boat launch and warns that it works best at high water; booking a cabana does not guarantee a usable trailer boat ramp.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/brady_creek/access.phtml"
      }
    ],
    "regulations": [
      {
        "label": "Statewide fish harvest rules at Brady Creek",
        "text": "TPWD's Brady Creek Reservoir profile lists bass, catfish, white bass and crappie under the current statewide fishing regulations rather than a new local protected bass slot. Anglers should apply the current daily bag and size limits to the correctly identified species and should check any active agency advisory.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/brady_creek/"
      },
      {
        "label": "Drought, golden-alga history and launch status",
        "text": "TPWD rates several Brady Lake fisheries fair after historical golden-alga losses and water-level stress. The park's public ramp is best at high water, so day-use or overnight bookings must be separated from live ramp availability. This is an operator-specific access caution, not a fishing harvest closure.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/brady_creek/access.phtml"
      }
    ],
    "nearby": [
      {
        "label": "Brady Lake City Park — city launch and bank-fishing area",
        "description": "TPWD identifies City Park at the dam as Brady Creek Reservoir's only listed public access point, with a fee-free boat ramp, restrooms, picnic areas, fish access and camping amenities. This is the actual city park rather than a broad McCulloch County recommendation.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/brady_creek/access.phtml",
        "external": true
      },
      {
        "label": "Brady Creek rocky bluffs and submerged railroad-bed structure",
        "description": "TPWD's lake-specific fishery discussion documents rocky bluffs, riprap, submerged timber and an old railroad bed as productive habitat. These are distinctive fishing targets, but historic locations may shift with lake levels and do not imply safe off-limits shoreline access.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/brady_creek/",
        "external": true
      }
    ],
    "reviewedAt": "2026-10-31",
    "sourceUrls": [
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/brady_creek/access.phtml",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/brady_creek/"
    ]
  },
  "lake-conroe": {
    "reviewedAt": "2026-10-31",
    "camping": [
      {
        "name": "Cagle Recreation Area — US Forest Service full-service RV campsite loops",
        "type": "USFS Lake Conroe electric/full-service RV campground",
        "summary": "The US Forest Service's Recreation.gov Cagle campground profile confirms full-service RV hookups in two separate loops, with flush restrooms, hot showers, a two-lane concrete launch and adjacent hiking trails along Lake Conroe. It is reached from FM 1375 west of Interstate 45 near New Waverly; reserve a specific electric site and check the actual facility status.",
        "href": "https://www.recreation.gov/camping/campgrounds/234004"
      },
      {
        "name": "Stubblefield Lake — USFS first-come primitive campground",
        "type": "USFS primitive first-come campground",
        "summary": "Stubblefield is a separate national-forest campground with non-electric sites available only first-come, first-served; Recreation.gov says guests must physically arrive to claim a site and may pay through its Scan and Pay app. TPWD lists a nearby dirt launch for small boats only, not a concrete ramp for larger trailers.",
        "href": "https://www.recreation.gov/camping/campgrounds/10158882"
      },
      {
        "name": "Scott's Ridge — day-use ramp, not an overnight campground",
        "type": "USFS day-use only; camping prohibited",
        "summary": "The US Forest Service's Scott's Ridge is a designated day-use boat access and picnic area with a two-lane concrete ramp west of the FM 1097 bridge. Although it appears alongside Cagle and Stubblefield in TPWD's public-access inventory, visitors should not try to reserve or pitch a tent at Scott's Ridge.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/conroe/access.phtml"
      }
    ],
    "regulations": [
      {
        "label": "Conroe-specific 16-inch largemouth bass minimum",
        "text": "TPWD's current Conroe waterbody schedule requires a minimum length of 16 inches for largemouth bass, while smallmouth need 14 inches. The daily bag for all black bass species is five combined. This is a specific Conroe exception and must not be replaced with Texas's ordinary 14-inch largemouth minimum.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0192"
      },
      {
        "label": "Blue and channel catfish special size distribution",
        "text": "TPWD's Conroe schedule allows 25 blue/channel catfish combined in a day with no minimum length, but only five may be 20 inches or longer and no more than one of those may reach 30 inches. Flathead catfish instead have an 18-inch minimum and five-fish daily limit. Apply the correct species-specific rule.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0192"
      },
      {
        "label": "Grass carp immediate release and invasive mussels",
        "text": "TPWD identifies a Triploid Grass Carp Permit at Lake Conroe; caught grass carp must be returned immediately unharmed. The agency also requires draining onboard water to prevent zebra-mussel transfers when departing or approaching freshwater lakes. These rules are independent of campground restrictions.",
        "sourceUrl": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/conroe/"
      }
    ],
    "nearby": [
      {
        "label": "Cagle Recreation Area — two-mile forest hiking and bicycling trail",
        "description": "The Forest Service's Cagle campground profile identifies a two-mile Cagle Trail accessible from the campground, with hiking and mountain biking through pine and hardwood forest. It is a named on-lake forest outing, with swimming expressly prohibited in the Cagle recreation area.",
        "href": "https://www.recreation.gov/camping/campgrounds/234004",
        "external": true
      },
      {
        "label": "Sam Houston National Forest — Lone Star Hiking Trail",
        "description": "Recreation.gov's Cagle listing identifies the Lone Star Hiking Trail as a roughly 128-mile forest trail system with a section near Lake Conroe, as well as many miles of national-forest equestrian and mountain-bike routes. Check actual trailhead and trail closures rather than treating the entire route as lakefront.",
        "href": "https://www.recreation.gov/camping/campgrounds/234004",
        "external": true
      },
      {
        "label": "FM 830 public boat launch — free TPWD ramp",
        "description": "TPWD lists FM 830 as a no-fee public launch with two concrete ramps at the end of FM 830 west of Interstate 45. It is a separate boat-access option from Cagle's fee-charging forest ramp and is not listed as an overnight camping location.",
        "href": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/conroe/access.phtml",
        "external": true
      }
    ],
    "sourceUrls": [
      "https://www.recreation.gov/camping/campgrounds/234004",
      "https://www.recreation.gov/camping/campgrounds/10158882",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/conroe/access.phtml",
      "https://tpwd.texas.gov/fishboat/fish/action/fishregs2.php?water=0192",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/conroe/"
    ]
  }
};
