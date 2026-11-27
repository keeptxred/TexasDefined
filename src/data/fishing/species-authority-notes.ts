/** Species-specific practical guidance. Source examples are not new lake-species ratings or current catch reports. */
export const FISH_AUTHORITY_EDITORIAL_UPDATED_AT = "2026-11-27";
export const FISH_AUTHORITY_SOURCES = {
  "blackBass": {
    "url": "https://tpwd.texas.gov/regulations/outdoor-annual/fishing/freshwater-fishing/bass-identification",
    "label": "Bass comparison and identification",
    "witness": "Spotted Bass"
  },
  "smallmouth": {
    "url": "https://tpwd.texas.gov/huntwild/wild/species/smb/",
    "label": "Smallmouth bass species account",
    "witness": "Smallmouth Bass"
  },
  "spotted": {
    "url": "https://tpwd.texas.gov/huntwild/wild/species/spb/",
    "label": "Spotted bass species account",
    "witness": "Spotted Bass"
  },
  "alabama": {
    "url": "https://tpwd.texas.gov/publications/pwdpubs/lake_survey/pwd_rp_t3200_1233/",
    "label": "Alan Henry fisheries survey",
    "witness": "Alabama Bass"
  },
  "llano": {
    "url": "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/south_llano.phtml",
    "label": "South Llano River access",
    "witness": "Guadalupe Bass"
  },
  "conservation": {
    "url": "https://tpwd.texas.gov/fishboat/fish/management/guadalupe-bass/",
    "label": "Guadalupe bass restoration initiative",
    "witness": "Guadalupe Bass"
  },
  "fork": {
    "url": "https://tpwd.texas.gov/fishboat/fish/action/waterecords.php?WB_code=0433",
    "label": "Lake Fork historical fish records",
    "witness": "Bowfin"
  },
  "rayburn": {
    "url": "https://tpwd.texas.gov/fishboat/fish/action/waterecords.php?WB_code=0640",
    "label": "Sam Rayburn historical fish records",
    "witness": "Bowfin"
  },
  "ladybird": {
    "url": "https://tpwd.texas.gov/boating/paddling-trails/hill-country/lady-bird-lake/",
    "label": "Lady Bird Lake paddling and angling guide",
    "witness": "redbreast"
  },
  "houston": {
    "url": "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/houston/",
    "label": "Lake Houston fishery",
    "witness": "Blue catfish"
  },
  "crappie": {
    "url": "https://tpwd.texas.gov/huntwild/wild/species/crappie/",
    "label": "Black crappie species account",
    "witness": "Black Crappie"
  },
  "whitebass": {
    "url": "https://tpwd.texas.gov/publications/pwdpubs/pwd_br_t3200_0022e/biology.phtml",
    "label": "Central Texas white bass biology",
    "witness": "White Bass"
  },
  "hybrid": {
    "url": "https://tpwd.texas.gov/fishboat/fish/management/hatcheries/fw_production.phtml",
    "label": "Texas freshwater fish production",
    "witness": "hybrid striped bass"
  },
  "stripers": {
    "url": "https://tpwd.texas.gov/huntwild/wild/species/str/",
    "label": "Striped bass species account",
    "witness": "Striped Bass"
  },
  "limits": {
    "url": "https://tpwd.texas.gov/regulations/outdoor-annual/fishing/freshwater-fishing/bag-length-limits",
    "label": "Current freshwater bag and length limits",
    "witness": "Sunfish"
  },
  "freshwater": {
    "url": "https://tpwd.texas.gov/landwater/water/aquaticspecies/inland.phtml",
    "label": "Texas freshwater species index",
    "witness": "Crappie"
  },
  "trout": {
    "url": "https://tpwd.texas.gov/fishboat/fish/management/stocking/trout_stocking.phtml",
    "label": "Current rainbow trout stocking schedule",
    "witness": "Trout Stocking Schedule"
  },
  "neighborhood": {
    "url": "https://tpwd.texas.gov/fishboat/fish/programs/neighborhood-fishin/stocking.phtml",
    "label": "Neighborhood Fishin' stocking locations",
    "witness": "Rainbow trout"
  },
  "records": {
    "url": "https://tpwd.texas.gov/fishboat/fish/action/staterecords.php?age_group=all&browse=Submit&env=FW&list=4",
    "label": "Texas historical freshwater records",
    "witness": "Warmouth"
  },
  "flyrecords": {
    "url": "https://tpwd.texas.gov/fishboat/fish/action/staterecords.php?age_group=all&browse=Go&env=FW&list=3",
    "label": "Texas historical fly-fishing records",
    "witness": "Longear"
  },
  "cichlid": {
    "url": "https://tpwd.texas.gov/huntwild/wild/species/cichlid/",
    "label": "Rio Grande cichlid species account",
    "witness": "Rio Grande Cichlid"
  },
  "advisories": {
    "url": "https://tpwd.texas.gov/regulations/outdoor-annual/fishing/general-rules-regulations/fish-consumption-bans-and-advisories",
    "label": "Fish consumption bans and advisories",
    "witness": "advisories"
  }
} as const;
export interface FishAuthorityNote { title: string; description: string; guidance: string; source: keyof typeof FISH_AUTHORITY_SOURCES; extraSources?: readonly (keyof typeof FISH_AUTHORITY_SOURCES)[]; related: readonly string[]; lakes: readonly string[]; }
export const FISH_AUTHORITY_NOTES: Record<string,FishAuthorityNote> = {
  "largemouth-bass": {
    "title": "Largemouth Bass in Texas: Lakes, Tackle & Identification",
    "description": "Identify largemouth bass by jaw extension and markings, then choose a Texas lake or river and a presentation suited to its cover.",
    "guidance": "For a first trip, separate cover fishing from river fishing. Around flooded timber or vegetation, work the edges before moving deeper; in moving water, focus on current breaks rather than assuming a reservoir pattern will transfer. TPWD identifies the South Llano as an opportunity for both largemouth and Guadalupe bass, so compare the fish before applying harvest rules.",
    "source": "llano",
    "related": [
      "guadalupe-bass",
      "spotted-bass",
      "smallmouth-bass"
    ],
    "lakes": [],
    "extraSources": [
      "blackBass"
    ]
  },
  "smallmouth-bass": {
    "title": "Smallmouth Bass in Texas: Rocky Water & Identification",
    "description": "Learn how to recognize smallmouth bass, choose rocky or flowing habitat and distinguish it from Texas' other black bass.",
    "guidance": "TPWD reports that smallmouth have been stocked in Texas, including Edwards Plateau streams. Rocky points, shoals and current edges offer a useful starting pattern; start with a small crawfish-style or minnow presentation and adjust to depth. Do not assume every Hill Country bass is a smallmouth: Guadalupe bass and hybrids complicate identification.",
    "source": "smallmouth",
    "related": [
      "guadalupe-bass",
      "largemouth-bass",
      "spotted-bass"
    ],
    "lakes": [],
    "extraSources": [
      "blackBass"
    ]
  },
  "guadalupe-bass": {
    "title": "Guadalupe Bass: Texas State Fish & Hill Country Fishing",
    "description": "Find the Texas state fish in flowing Hill Country waters; compare black bass markings and explore documented river access.",
    "guidance": "The South Llano River public-access reach is specifically identified by TPWD for Guadalupe bass. In clear flowing water, cast across a riffle seam or behind a rock, letting a small lure drift naturally. The restoration initiative is a better starting point for selecting an access reach than assuming an entire reservoir supports this fish. Check current access and local limits.",
    "source": "llano",
    "related": [
      "smallmouth-bass",
      "largemouth-bass",
      "spotted-bass"
    ],
    "lakes": [],
    "extraSources": [
      "conservation"
    ]
  },
  "spotted-bass": {
    "title": "Spotted Bass in Texas: Identification & Fishing Habitat",
    "description": "Distinguish spotted bass from largemouth, Guadalupe and Alabama bass; learn which habitat and source records to check.",
    "guidance": "Do not count Alan Henry Reservoir's Alabama bass stocking as proof of spotted bass (Micropterus punctulatus). The two are separately recognized; TPWD's Alan Henry survey explains the historical management terminology. For spotted bass, verify the actual species in waterbody records and compare several identification traits rather than relying on a single spot or jaw measurement.",
    "source": "alabama",
    "related": [
      "largemouth-bass",
      "guadalupe-bass",
      "smallmouth-bass"
    ],
    "lakes": [],
    "extraSources": [
      "spotted",
      "blackBass"
    ]
  },
  "crappie": {
    "title": "Texas Crappie Fishing: Black vs. White Crappie",
    "description": "Compare black and white crappie and choose a depth, presentation and Texas fishing destination.",
    "guidance": "Crappie is a group rather than one species. Start with brush piles or other fish-holding structure, then vary depth with a small jig or minnow until fish respond. Count dorsal spines and compare body markings if you need to distinguish white from black crappie; do not use a combined fishery listing as proof of either individual species.",
    "source": "crappie",
    "related": [
      "black-crappie",
      "white-crappie"
    ],
    "lakes": []
  },
  "black-crappie": {
    "title": "Black Crappie in Texas: Identification & Brush Fishing",
    "description": "Recognize black crappie and choose small jigs, cover and depth using its biology and Texas fishery evidence.",
    "guidance": "TPWD describes black crappie as native to parts of central Texas and widely introduced. A first approach is to fish vertically beside brush, changing depth before changing lure color. Compare irregular dark markings and dorsal spines with white crappie. Clearer water can be a useful clue, but water clarity alone cannot identify an individual fish.",
    "source": "crappie",
    "related": [
      "white-crappie",
      "crappie"
    ],
    "lakes": []
  },
  "white-crappie": {
    "title": "White Crappie in Texas: Identification & Fishing Depth",
    "description": "Compare white and black crappie markings, locate fish near structure and check current Texas rules.",
    "guidance": "White crappie often show vertical bars rather than scattered dark flecks. When fishing cover, try a small jig or minnow at the upper edge first, then lower it in measured steps. Compare dorsal spines before calling a pale fish white crappie. TPWD's freshwater species index and combined crappie rules are useful cross-checks.",
    "source": "freshwater",
    "related": [
      "black-crappie",
      "crappie"
    ],
    "lakes": [],
    "extraSources": [
      "limits"
    ]
  },
  "catfish": {
    "title": "Texas Catfish Fishing: Blue, Channel & Flathead",
    "description": "Choose between blue, channel and flathead catfish by habitat, bait and identification; check Texas harvest rules.",
    "guidance": "Catfish is a practical fishing group, not one biological species. At Lake Houston, TPWD describes blue catfish as a dominant sportfish along river channels. For a new water, compare the species accounts before picking bait and location: channel cats are a different target from large predatory flatheads. Confirm the specific fish and waterbody rules before keeping it.",
    "source": "houston",
    "related": [
      "blue-catfish",
      "channel-catfish",
      "flathead-catfish"
    ],
    "lakes": [
      "lake-houston"
    ]
  },
  "blue-catfish": {
    "title": "Blue Catfish in Texas: River Channels & Fishing Tactics",
    "description": "Identify blue catfish, choose channel habitat and plan a trip around documented Texas fisheries.",
    "guidance": "Lake Houston provides a documented example: TPWD points anglers toward the channels of both San Jacinto River forks. Start by locating a channel edge rather than casting randomly into a flat. Use a legal bait and a rig appropriate to current and depth; a deeply forked tail alone is not enough to distinguish blue from channel catfish.",
    "source": "houston",
    "related": [
      "channel-catfish",
      "flathead-catfish",
      "catfish"
    ],
    "lakes": [
      "lake-houston"
    ]
  },
  "channel-catfish": {
    "title": "Channel Catfish in Texas: Bank Fishing & Identification",
    "description": "Recognize channel catfish and choose practical bank or river fishing spots with verified Texas examples.",
    "guidance": "TPWD identifies channel catfish at its South Llano River access reach. For shore fishing, begin along the transition from shallows into deeper water, keeping your bait on or near the bottom and checking for current or snags. Compare the anal fin and body markings with blue catfish rather than relying on color alone.",
    "source": "llano",
    "related": [
      "blue-catfish",
      "flathead-catfish",
      "catfish"
    ],
    "lakes": []
  },
  "flathead-catfish": {
    "title": "Flathead Catfish in Texas: Cover, Bait & Identification",
    "description": "Identify flathead catfish, select sheltered river or reservoir cover and check legal bait and harvest rules.",
    "guidance": "A flathead's broad flattened head and less deeply forked tail help separate it from blue and channel catfish. Focus on the edges of submerged wood or protected holes rather than treating every catfish fishery as equivalent. A large fish needs body support during handling; confirm legal bait and local rules before targeting it.",
    "source": "freshwater",
    "related": [
      "blue-catfish",
      "channel-catfish",
      "catfish"
    ],
    "lakes": []
  },
  "white-bass": {
    "title": "White Bass in Texas: Spring Runs & Identification",
    "description": "Plan a white bass trip around seasonal movement; compare it with striped and hybrid striped bass.",
    "guidance": "TPWD's Central Texas white bass biology guide explains the relationship between white, striped and hybrid striped bass. Look for moving schools and tributary access when fish are migrating; outside the run, search for schooling fish rather than assuming they remain in a creek. Examine tongue tooth patches together with other traits before using a species-specific limit.",
    "source": "whitebass",
    "related": [
      "striped-bass",
      "hybrid-striped-bass",
      "freshwater-drum"
    ],
    "lakes": [],
    "extraSources": [
      "blackBass"
    ]
  },
  "striped-bass": {
    "title": "Striped Bass in Texas: Open-Water Fishing & Identification",
    "description": "Learn how to identify striped bass and approach open-water schools without confusing white or hybrid bass.",
    "guidance": "Use the TPWD species account to distinguish striped bass from its relatives. In a reservoir, a useful starting decision is to locate baitfish and the depth of feeding activity before selecting a lure or legal bait; a shoreline pattern will not necessarily work when schools move offshore. Compare multiple marks and tooth patches before keeping fish.",
    "source": "stripers",
    "related": [
      "white-bass",
      "hybrid-striped-bass"
    ],
    "lakes": []
  },
  "hybrid-striped-bass": {
    "title": "Hybrid Striped Bass in Texas: Wipers & Identification",
    "description": "Understand the white bass and striped bass cross, distinguish hybrids and plan open-water fishing.",
    "guidance": "TPWD hatcheries produce a cross between a male white bass and female striped bass. A hybrid is not simply a striped bass with a broken stripe. Compare several characteristics using the official identification guidance; locate schools around baitfish and vary retrieval depth instead of assuming every surface disturbance is a hybrid.",
    "source": "hybrid",
    "related": [
      "striped-bass",
      "white-bass"
    ],
    "lakes": []
  },
  "alligator-gar": {
    "title": "Alligator Gar in Texas: Identification & Responsible Fishing",
    "description": "Recognize the broad-snouted alligator gar, compare spotted gar and check waterbody-specific harvest restrictions.",
    "guidance": "Alligator gar differ from spotted gar in their broad snout. Identification matters before retention: TPWD's freshwater rules include alligator gar reporting requirements and waterbody-specific provisions. If targeting a large fish, plan handling before casting, use suitable equipment and avoid unnecessary air exposure. Check the current rules for the exact stretch of river.",
    "source": "limits",
    "related": [
      "spotted-gar",
      "bowfin"
    ],
    "lakes": [],
    "extraSources": [
      "freshwater"
    ]
  },
  "freshwater-drum": {
    "title": "Freshwater Drum in Texas: Identification & Documented Waters",
    "description": "Recognize freshwater drum and explore documented catches in Texas reservoirs; distinguish it from white bass.",
    "guidance": "TPWD's Lake Fork and Sam Rayburn record tables document freshwater drum catches; a historical record establishes occurrence at the recorded date, not current abundance. Start around bottom contours where a small jig or natural bait can be presented near the substrate. Compare its body shape and markings with white bass rather than identifying fish by a silvery color.",
    "source": "fork",
    "related": [
      "white-bass",
      "striped-bass"
    ],
    "lakes": [
      "lake-fork",
      "sam-rayburn-reservoir"
    ],
    "extraSources": [
      "rayburn"
    ]
  },
  "sunfish": {
    "title": "Texas Sunfish Guide: Bluegill, Redear & Other Species",
    "description": "Identify common Texas sunfish, choose light tackle and compare documented fishing opportunities.",
    "guidance": "Lady Bird Lake is an especially useful example because TPWD identifies redear and redbreast sunfish and recommends light tackle. Fish a small bait near cover first; try closer to the bottom when specifically looking for redear. Sunfish is a group name, so inspect the gill flap, mouth and markings before assigning a species.",
    "source": "ladybird",
    "related": [
      "bluegill",
      "redear-sunfish",
      "green-sunfish",
      "warmouth",
      "longear-sunfish",
      "redbreast-sunfish",
      "rio-grande-cichlid"
    ],
    "lakes": []
  },
  "bluegill": {
    "title": "Bluegill in Texas: Identification & Light-Tackle Fishing",
    "description": "Identify bluegill by mouth and gill flap and fish small presentations near shallow cover.",
    "guidance": "TPWD’s Alan Henry 2018–2021 fisheries survey identifies bluegill among the reservoir’s principal forage fish. This is biological survey evidence, not a current catch forecast or a recommendation to travel there specifically for bluegill. Compare bluegill with redear by the mouth, ear flap and body shape. Start with a small bait suspended under a float near cover; if fish follow without taking, reduce the presentation or change depth. A general sunfish listing does not establish a specific bluegill fishery.",
    "source": "alabama",
    "related": [
      "redear-sunfish",
      "green-sunfish",
      "longear-sunfish",
      "sunfish"
    ],
    "lakes": [
      "alan-henry-reservoir"
    ]
  },
  "rainbow-trout": {
    "title": "Rainbow Trout in Texas: Winter Stocking & Fishing",
    "description": "Find TPWD's seasonal stocking schedule, distinguish stocked trout waters and plan a cold-season trip.",
    "guidance": "TPWD's 2026–2027 schedule includes Possum Kingdom Tailrace and Neighborhood Fishin' ponds; stocking dates are plans, not evidence of fish being present on the day you arrive. Match a small presentation to the current and available depth; check the latest schedule, public access and site-specific restrictions before traveling. The tailrace differs from the reservoir itself.",
    "source": "trout",
    "related": [],
    "lakes": [],
    "extraSources": [
      "neighborhood"
    ]
  },
  "bowfin": {
    "title": "Bowfin in Texas: Identification & East Texas Backwaters",
    "description": "Identify native bowfin versus snakeheads and gar; explore documented Texas fish records.",
    "guidance": "Lake Fork and Sam Rayburn have documented historical bowfin catches in TPWD records. Search shallow vegetated edges and protected backwaters rather than the middle of open water; approach quietly and use a manageable bait or lure around woody cover. Its long dorsal fin and rounded tail help distinguish it from gar, while its ability to breathe air explains occasional surfacing. Common carp also uses slow water, but its feeding behavior is different from this predator.",
    "source": "fork",
    "related": [
      "spotted-gar",
      "alligator-gar",
      "common-carp"
    ],
    "lakes": [
      "lake-fork",
      "sam-rayburn-reservoir"
    ],
    "extraSources": [
      "rayburn"
    ]
  },
  "common-carp": {
    "title": "Common Carp in Texas: Identification & Bank Fishing",
    "description": "Recognize common carp and explore documented Texas carp waters, including Austin's Lady Bird Lake.",
    "guidance": "TPWD's Lady Bird Lake paddling guide specifically describes large common carp. For a bank approach, look for safe legal access near feeding shallows, present a small bottom bait and watch for line movement rather than repeatedly casting over fish. Barbels near the mouth distinguish common carp from superficially similar fish; do not transfer this identification to grass carp or other carp species. Unlike bowfin, which is a native predator, common carp is an introduced bottom feeder; the two require very different fishing approaches.",
    "source": "ladybird",
    "related": [
      "bowfin"
    ],
    "lakes": []
  },
  "spotted-gar": {
    "title": "Spotted Gar in Texas: Identification & Backwater Fishing",
    "description": "Distinguish spotted gar from alligator gar and find documented historical Texas catch locations.",
    "guidance": "TPWD records document spotted gar catches at Lake Fork and Sam Rayburn. Observe shallow edges and slow vegetated water before choosing a presentation; a surface sighting is not proof of the fish's exact species. Spotted fins and a narrower snout distinguish it from alligator gar, but verify current rules before handling or retaining any gar.",
    "source": "rayburn",
    "related": [
      "alligator-gar",
      "bowfin"
    ],
    "lakes": [
      "lake-fork",
      "sam-rayburn-reservoir"
    ],
    "extraSources": [
      "fork"
    ]
  },
  "redear-sunfish": {
    "title": "Redear Sunfish in Texas: Shellcracker Identification",
    "description": "Identify redear sunfish by its gill flap and find documented Texas light-tackle opportunities.",
    "guidance": "Lady Bird Lake is a documented redear opportunity in TPWD's paddling guide. Because redear feed near the bottom, try a small natural bait close to substrate and vary depth rather than assuming it will respond to a shallow bluegill pattern. Use the red or orange edge of the ear flap with mouth and body shape to separate it from other sunfish.",
    "source": "ladybird",
    "related": [
      "bluegill",
      "longear-sunfish",
      "redbreast-sunfish",
      "sunfish"
    ],
    "lakes": []
  },
  "green-sunfish": {
    "title": "Green Sunfish in Texas: Identification & Small-Water Fishing",
    "description": "Recognize green sunfish by its large mouth and cheek markings and distinguish warmouth and bluegill.",
    "guidance": "TPWD's historical fly-fishing records include a green sunfish from Somerville. This confirms a documented catch, not today's population or a ranked destination. Green sunfish can use small shallow habitats; try a small lure along rock, wood or a bank edge. Compare the large mouth and face markings with warmouth, then check local rules before retention.",
    "source": "flyrecords",
    "related": [
      "warmouth",
      "bluegill",
      "rio-grande-cichlid",
      "sunfish"
    ],
    "lakes": [
      "lake-somerville"
    ]
  },
  "warmouth": {
    "title": "Warmouth in Texas: Identification & Shallow Cover",
    "description": "Recognize warmouth by its eye streaks and broad mouth; compare it with green sunfish and bluegill.",
    "guidance": "TPWD's historical fly-fishing records include a warmouth from the Comal River. Look for sheltered pockets with vegetation or wood, and work a small presentation slowly alongside cover. Unlike a bluegill, warmouth have a large mouth and conspicuous streaks radiating from the eye; compare with green sunfish before deciding which fish you caught.",
    "source": "flyrecords",
    "related": [
      "green-sunfish",
      "bluegill",
      "sunfish"
    ],
    "lakes": []
  },
  "longear-sunfish": {
    "title": "Longear Sunfish in Texas: Creek Fish Identification",
    "description": "Distinguish longear sunfish from redbreast and redear sunfish and learn a stream fishing approach.",
    "guidance": "A historical Texas fly-fishing record documents longear sunfish in the Brazos River. This is evidence of a past catch, not a recommendation for the entire river. Try a small presentation along a calm seam beside moving water, and compare the elongated ear flap and its edging with redbreast sunfish. Color can vary substantially between individuals.",
    "source": "flyrecords",
    "related": [
      "redbreast-sunfish",
      "redear-sunfish",
      "bluegill",
      "sunfish"
    ],
    "lakes": []
  },
  "redbreast-sunfish": {
    "title": "Redbreast Sunfish in Texas: Stream & Lake Fishing",
    "description": "Identify redbreast sunfish by its long ear flap and explore documented light-tackle waters.",
    "guidance": "TPWD identifies large redbreast sunfish in Lady Bird Lake and suggests light spinning or fly tackle. In flowing water, present a small bait near a current break; on the lake, try protected cover from a legal access point. A long narrow gill flap helps distinguish redbreast from redear and longear, but do not use breast color by itself.",
    "source": "ladybird",
    "related": [
      "longear-sunfish",
      "redear-sunfish",
      "sunfish"
    ],
    "lakes": []
  },
  "rio-grande-cichlid": {
    "title": "Rio Grande Cichlid in Texas: Native Range & Identification",
    "description": "Distinguish the Texas cichlid from sunfish and learn why warm, stable waters matter.",
    "guidance": "TPWD describes the Rio Grande cichlid as sensitive to cold and notes favorable spring-fed or heated waters. Focus on observation in warm, sheltered habitat rather than assuming every Texas lake contains the fish. Its turquoise spotting can resemble markings on sunfish, but it belongs to a different family. Compare body and fin shape before identification, and never move live fish between waters.",
    "source": "cichlid",
    "related": [
      "green-sunfish",
      "sunfish"
    ],
    "lakes": []
  }
};
