export type FishingTechniqueGuideContent = {
  plainEnglish: string;
  tripChecks: string[];
  whenToUse: string[];
  whereToFish: string[];
  howToFish: string[];
  setup: string[];
  seasonalGuide: Array<{ season: string; guidance: string }>;
  commonMistakes: string[];
  selectionTitle?: string;
  selectionIntro?: string;
  selectionGuide?: Array<{ label: string; bestFor: string; depth?: string }>;
};

export const fishingTechniqueGuideContent: Record<string, FishingTechniqueGuideContent> = {
  "crankbaits": {
    tripChecks: [
      "Check the depth of the point, ledge or shoreline cover you intend to work; select a diving range that actually reaches it.",
      "Review water clarity and wind before choosing a tight wobble, broad wobble or lipless presentation.",
      "Confirm lake level and submerged-hazard conditions so deliberate bottom contact does not become an avoidable snag or boating risk.",
    ],
    plainEnglish: "A crankbait is a hard-bodied moving lure designed to swim, wobble or vibrate through a specific part of the water column. The practical question is not simply whether to throw one, but which style reaches the cover, depth and speed you need without spending the whole retrieve above or below the fish.",
    whenToUse: [
      "When you need to cover water and find active fish rather than soak one spot.",
      "When bass are relating to riprap, points, timber, vegetation edges, channel swings or other repeatable structure.",
      "When baitfish or crawfish are moving and a reaction presentation can imitate that movement.",
      "When wind or stained water makes a moving bait easier for fish to locate."
    ],
    whereToFish: [
      "Squarebills around shallow wood, riprap, docks and other deflection targets.",
      "Medium divers along points, creek-channel edges and the outside edge of vegetation.",
      "Deep divers across ledges, roadbeds, humps and offshore structure when fish are deeper.",
      "Lipless crankbaits over flats, through sparse grass and across broad areas where fish may be roaming."
    ],
    howToFish: [
      "Choose a bait that reaches the target zone, then make the lure contact or narrowly clear the structure you are trying to fish.",
      "Use a steady retrieve as the baseline, then test speed changes, brief pauses and direction changes when fish follow without committing.",
      "Let squarebills deflect off cover instead of steering them through open water whenever the cover allows it.",
      "With lipless crankbaits around vegetation, a pull-and-release or rip-and-fall retrieve can help the lure break free and trigger reaction strikes."
    ],
    setup: [
      "A moderate or moderate-fast rod helps keep treble-hooked fish pinned while still allowing accurate casts.",
      "Line diameter affects running depth: thinner line generally lets a diving crankbait reach deeper than thicker line.",
      "A reel in a moderate retrieve range is easier to control across multiple crankbait styles than an extremely fast reel.",
      "Check treble hooks and split rings frequently because hard contact with rock, wood and fish can dull or damage them."
    ],
    seasonalGuide: [
      { season: "Spring", guidance: "Shallow-to-medium runners and lipless baits can cover warming flats, secondary points and shoreline cover as fish move toward spawning areas." },
      { season: "Summer", guidance: "Deeper-running crankbaits become more useful on points, ledges, creek channels and offshore structure, especially when fish leave the bank." },
      { season: "Fall", guidance: "Follow baitfish movement. Flats, creek arms, riprap and wind-blown banks can all become efficient places to cover water with moving baits." },
      { season: "Winter", guidance: "Slower retrieves, tighter wobble and repeated passes through high-percentage structure can matter more than simply covering maximum water." }
    ],
    commonMistakes: [
      "Choosing a lure by color before choosing the correct running depth.",
      "Fishing the bait through featureless water instead of deliberately contacting cover or structure.",
      "Using one retrieve speed all day even when water temperature, wind and fish activity change.",
      "Ignoring hook condition after repeated contact with rock, timber or shell."
    ],
    selectionTitle: "Crankbait Types by Depth and Cover",
    selectionIntro: "Running depth is the first decision. Pick the lure that can actually reach the zone you are trying to fish; color and finish come after depth, cover and retrieve speed.",
    selectionGuide: [
      { label: "Squarebill", bestFor: "Shallow wood, rock, docks and deflection fishing", depth: "Shallow" },
      { label: "Shallow diver", bestFor: "Banks, riprap and shallow points", depth: "Shallow" },
      { label: "Medium diver", bestFor: "Points, grass edges and channel transitions", depth: "Mid-depth" },
      { label: "Deep diver", bestFor: "Ledges, humps, roadbeds and offshore structure", depth: "Deep" },
      { label: "Lipless crankbait", bestFor: "Flats, grass and covering open water", depth: "Variable" }
    ]
  },
  "soft-plastics": {
    tripChecks: [
      "Identify the cover you will fish—vegetation, docks, timber, rock or offshore structure—before selecting a weedless or finesse rig.",
      "Check wind and depth to determine whether a weightless fall can be controlled or a sinker is needed.",
      "Use the lake's current conditions and access report to choose reachable, legal fishing areas rather than assuming an old seasonal pattern is active.",
    ],
    plainEnglish: "Soft plastics are one of the most adaptable ways to fish Texas bass water because the same bait family can be rigged weedless, weightless, on a jig head or on specialized rigs from inches of water to deep offshore structure. The key is choosing the rig for the cover, depth and mood of the fish before worrying about color.",
    whenToUse: [
      "When bass are holding tightly to vegetation, timber, docks, brush or other cover.",
      "When pressured or inactive fish are refusing faster-moving reaction baits.",
      "When you need precise depth control from a shallow weightless fall to deep bottom contact.",
      "When you want to keep one presentation in a small strike zone instead of covering water quickly."
    ],
    whereToFish: [
      "Hydrilla edges, reeds, flooded grass and openings in submerged vegetation.",
      "Dock shade, pilings, laydowns, brush piles and standing timber.",
      "Rocky points, creek-channel bends, roadbeds, humps and other offshore structure.",
      "Shallow spawning cover in spring and the first deeper transition water nearby."
    ],
    howToFish: [
      "Cast past the target, let the bait fall on a controlled semi-slack line and watch for a twitch, sudden slack or sideways movement before it reaches bottom.",
      "Once the bait settles, use a short hop, slow drag or subtle shake, then pause. Soft plastics often work because they stay in the strike zone longer.",
      "Match sinker weight to depth, wind and the fall rate you want. Use the lightest weight that still gives reliable control and bottom or cover contact.",
      "When a bite feels different, reel down to remove slack, confirm pressure and use a controlled hookset suited to the hook and tackle."
    ],
    setup: [
      "A medium to medium-heavy spinning or casting rod covers many Texas bass applications; move heavier around dense vegetation, timber and thick brush.",
      "Use hook style and size that match the bait body and rig. Offset or extra-wide-gap hooks are common for weedless rigs; exposed hooks fit many finesse presentations.",
      "Choose line for the cover and water clarity. Abrasion resistance matters around rock and timber, while low-visibility leaders can help in clear water.",
      "Check the bait after every fish or snag. A torn plastic that slides down the hook, spins or no longer sits straight should be re-rigged."
    ],
    seasonalGuide: [
      { season: "Spring", guidance: "Work warming pockets, secondary points, protected spawning areas and nearby cover. Weightless stick baits, Texas-rigged creatures and finesse worms are versatile as bass move shallow." },
      { season: "Summer", guidance: "Split the day between shade and depth. Fish docks, vegetation and low-light shallows early, then move toward deeper points, brush, creek-channel edges and offshore structure." },
      { season: "Fall", guidance: "Follow forage into creek arms and transition zones. Faster soft jerkbaits and swimbaits can cover water, while Texas rigs and finesse baits stay useful around isolated cover." },
      { season: "Winter", guidance: "Slow the presentation and stay near stable structure. Shaky heads, drop shots, compact bottom baits and slow Texas rigs keep the lure in the strike zone longer." }
    ],
    commonMistakes: [
      "Fishing too fast and never allowing the bait to pause naturally.",
      "Using more sinker weight than the depth, wind or cover actually requires.",
      "Watching the rod instead of the line during the fall, when many soft-plastic bites occur.",
      "Using the same rig everywhere instead of changing hook, weight and presentation for grass, wood, rock, docks or open water.",
      "Setting the hook on slack line instead of reeling down first.",
      "Continuing to fish a torn or twisted plastic that no longer tracks correctly."
    ],
    selectionTitle: "Choose the Soft-Plastic Rig for the Job",
    selectionIntro: "Start with cover and depth. A weedless Texas rig is the broad all-purpose choice, while weightless, Carolina, drop-shot, shaky-head and Ned presentations solve more specific problems.",
    selectionGuide: [
      { label: "Texas rig", bestFor: "Vegetation, brush, timber, docks and other snag-prone cover", depth: "Shallow–deep" },
      { label: "Weightless stick bait", bestFor: "Dock shade, shallow cover, calm pockets and pressured fish", depth: "Shallow" },
      { label: "Carolina rig", bestFor: "Points, flats, roadbeds and broad bottom structure", depth: "Mid-depth–deep" },
      { label: "Drop shot", bestFor: "Clear water, suspended fish, vertical targets and pressured fish", depth: "Mid-depth–deep" },
      { label: "Shaky head", bestFor: "Rock, points, sparse cover and difficult bottom-oriented bites", depth: "Bottom" },
      { label: "Ned rig", bestFor: "Rock, gravel, open bottom and highly pressured fish", depth: "Shallow–deep" }
    ]
  },
  "spinnerbaits": {
    tripChecks: [
      "Check wind exposure, visibility and shallow cover before picking a blade profile for lift, flash or vibration.",
      "Compare the fish-holding depth with the bait's running depth; a fast retrieve can keep an otherwise suitable lure above the target.",
      "Check grass growth, floating debris and local access so a cover-oriented retrieve remains practical.",
    ],
    plainEnglish: "Spinnerbaits combine flash, vibration and a single-hook profile that can move efficiently through shallow cover, vegetation and stained water.",
    whenToUse:["Windy banks and low-light periods.","Stained water where vibration helps fish locate the bait.","Around shallow wood, grass and docks.","When baitfish are active and bass are willing to chase."],
    whereToFish:["Wind-blown shorelines.","Standing timber and laydowns.","Grass edges and flooded vegetation.","Riprap, docks and shallow points."],
    howToFish:["Keep the bait close to cover rather than retrieving through empty water.","Vary retrieve speed until the blades run at the depth fish are using.","Let the lure fall beside isolated cover before starting the retrieve.","Use occasional contact with grass or wood to create direction changes."],
    setup:["Medium-heavy casting tackle is common for cover-oriented fishing.","Match blade size to desired lift, vibration and retrieve speed.","Use heavier line around wood and dense vegetation.","Check the wire arm after hard strikes or snags."],
    seasonalGuide:[{season:"Spring",guidance:"Excellent around warming shallow cover and windy spawning-area transitions."},{season:"Summer",guidance:"Early, late and windy periods can keep the bite shallow; deeper slow-rolling can extend the technique."},{season:"Fall",guidance:"Follow shad into creeks and across wind-blown flats."},{season:"Winter",guidance:"Slower retrieves and compact profiles can work when fish remain near shallow cover."}],
    commonMistakes:["Retrieving too high above the cover.","Choosing blade combinations without considering water clarity.","Avoiding contact with cover completely.","Failing to retune a bent wire frame."]
  },
  "topwater": {
    tripChecks: [
      "Check surface chop, wind direction and safe access before choosing a popper, walking bait, frog or faster-moving surface lure.",
      "Identify whether the intended area has open water, sparse cover or matted vegetation; each calls for a different surface presentation.",
      "Treat dawn, dusk and seasonal patterns as planning clues, then confirm current fish activity rather than assuming a surface bite.",
    ],
    plainEnglish: "Topwater fishing keeps the lure on or near the surface and is most effective when fish are willing to feed upward.",
    whenToUse:["Low light, cloud cover and schooling activity.","Warm-water periods when fish are shallow.","Around vegetation, points and flooded cover.","When baitfish are visibly being chased near the surface."],
    whereToFish:["Grass edges and open pockets.","Points, seawalls and riprap.","Shallow flats and creek mouths.","Around schooling fish in open water."],
    howToFish:["Start with a deliberate cadence, then change speed before changing lures.","Pause beside isolated cover where a fish has time to track the bait.","For walking baits, keep slack in the line so the lure can turn side to side.","Delay the hookset until you feel weight rather than reacting only to the splash."],
    setup:["A rod with some tip flex helps cast and work surface lures.","Monofilament or braid can help keep the line near the surface depending on cover.","Use stronger tackle around heavy vegetation.","Inspect trebles because topwater fish often swipe rather than fully engulf the bait."],
    seasonalGuide:[{season:"Spring",guidance:"Becomes stronger as water warms and fish move shallow."},{season:"Summer",guidance:"Early morning, evening and overcast periods often extend surface activity."},{season:"Fall",guidance:"Schooling baitfish can create excellent open-water topwater opportunities."},{season:"Winter",guidance:"Usually more situational; warm spells and active shallow fish can still create windows."}],
    commonMistakes:["Setting the hook at the splash instead of after feeling the fish.","Working every lure at the same cadence.","Ignoring baitfish size.","Using surface presentations when fish are clearly feeding deeper."]
  },
  "trolling": {
    tripChecks: [
      "Check the applicable waterbody's trolling and boating rules, marked hazards and current lake level before selecting a route.",
      "Use depth information and observed forage or fish position to set the target zone; avoid choosing a lure solely by its advertised maximum depth.",
      "Account for wind, boat speed and traffic when planning safe, repeatable passes.",
    ],
    plainEnglish: "Trolling presents one or more baits behind a moving boat so anglers can cover open water, maintain depth and intercept roaming fish.",
    whenToUse:["When striped, hybrid or other open-water fish are scattered.","When fish are following creek channels, river channels or bait schools.","When covering large reservoirs efficiently matters.","When depth control is more important than repeated casting."],
    whereToFish:["Channel edges and bends.","Open-water flats near bait.","Main-lake points and humps.","Areas where sonar shows suspended fish or bait."],
    howToFish:["Use speed, lure choice and line length together to control depth.","Make turns deliberately because inside and outside lines change speed and depth.","Mark productive passes and repeat the same contour rather than wandering randomly.","Keep lures clear of debris because one fouled bait can waste an entire pass."],
    setup:["Rod holders and a consistent spread improve repeatability.","Match tackle to the species and lure resistance.","Use depth-capable electronics or contour information where available.","Follow all current Texas regulations governing rods, lines and species-specific limits."],
    seasonalGuide:[{season:"Spring",guidance:"Follow open-water fish as they transition between river influence and the main lake."},{season:"Summer",guidance:"Especially useful for suspended fish holding over deep water."},{season:"Fall",guidance:"Track bait concentrations and temperature-driven movement."},{season:"Winter",guidance:"Slower speeds and precise depth control can become more important."}],
    commonMistakes:["Trolling without a target depth.","Making productive passes once instead of repeating them.","Ignoring speed changes during turns.","Failing to monitor for fouled lures."]
  },
  "vertical-jigging": {
    tripChecks: [
      "Verify current fish or forage depth with available observations or electronics before lowering a jig to a fixed depth.",
      "Check wind and boat control; excessive drift can pull the lure away from fish directly under the boat.",
      "Review underwater timber, bridge restrictions and accessible offshore structure before committing to a precise vertical presentation.",
    ],
    plainEnglish: "Vertical jigging works a spoon, slab, jig or similar artificial lure directly beneath the boat. Unlike live-bait fishing, the angler supplies every pulse and flutter; the key is to keep that lure within the narrow band marked by fish or forage while managing boat drift, line angle and the speed of each fall.",
    whenToUse: [
      "When sonar shows fish concentrated below the boat.",
      "When fish are deep or suspended.",
      "When schooling fish stop chasing horizontally.",
      "When wind or current makes casting inefficient.",
      "When a school appears as a compact sonar return under a stationary boat and a cast would carry a lure well past the target.",
      "When bass chase a falling slab or spoon but ignore a long horizontal retrieve; a controlled drop can repeat the same path through the marked depth.",
      "When steep channel walls or deep bridge openings leave little room to retrieve a moving lure without scraping the structure.",
    ],
    whereToFish: [
      "Creek and river channels.",
      "Bridge structure and deep timber openings.",
      "Main-lake humps and points.",
      "Directly over suspended schools.",
      "The crest and sides of a submerged hump where electronics distinguish fish arches from brush, rock or bottom clutter.",
      "The outside edge of deep channel bends, particularly where a steep contour permits holding the boat over the drop rather than drifting across it.",
      "Open vertical lanes around bridge supports or flooded standing timber, staying clear of restricted zones and avoiding blind drops into branches.",
      "The upper or lower edge of a bait ball, with the lure stopped at the depth of fish marks rather than falling unchecked through the entire water column.",
    ],
    howToFish: [
      "Drop to the fish rather than automatically to the bottom.",
      "Use short controlled lifts before trying exaggerated strokes.",
      "Watch the lure on sonar when possible and adjust to the fish's depth.",
      "Keep tension during the fall because many strikes come as the lure drops.",
      "Identify the bottom return and any suspended marks before opening the bail; use a marked line or depth display so the first descent stops above the fish rather than inside the school.",
      "Make a short lift with the rod tip, then follow the lure down on a semi-taut line. An abrupt slack loop can hide a strike or allow the jig to tumble into nearby timber.",
      "Compare a restrained quiver with a more pronounced lift-and-drop sequence. If the school follows but does not strike, shorten the cadence and add a still pause instead of repeatedly raising the lure higher.",
      "With a spoon or slab, let the lure flutter on the fall, but stop the descent deliberately at the next marked elevation. Repeatedly hitting bottom can foul hooks and waste the best part of the presentation.",
      "If wind pulls the line diagonally away from the transducer cone, reposition the boat or select an appropriate heavier lure instead of pretending the fish and jig are still aligned.",
      "After a strike, note whether it happened on the lift, controlled drop or pause. Repeat that exact movement while the school remains in range rather than randomly changing jig color.",
      "Lift the lure clear of the water before moving the boat to a new sonar mark; a dangling heavy spoon beside a running propeller is an avoidable hazard.",
    ],
    setup: [
      "Use line with low stretch for depth sensitivity.",
      "Choose lure weight heavy enough to stay vertical in wind or current.",
      "A shorter responsive rod can improve control near the boat.",
      "Use a leader appropriate to water clarity and target species.",
      "Choose the slab, spoon or jig weight for a nearly vertical line angle, not simply for maximum casting distance. The useful weight changes with drift, depth and lure profile.",
      "Inspect the lure's attachment eye, split rings and hook sharpness after contact with rock or hard bridge structure; bent hardware spoils action and compromises the hookset.",
      "Manage line twist from repeatedly spinning spoons by checking the leader and replacing twisted or frayed sections before another deep drop.",
      "Set the drag before the first descent, especially when striped or hybrid bass may surge beneath the hull; short-range pressure leaves less margin for a locked drag.",
      "Use the boat's depth reference and a repeatable rod-tip height to compare lifts. A controlled six-inch rise and a high overhead sweep are not interchangeable presentations.",
    ],
    seasonalGuide:[{season:"Spring",guidance:"Useful when fish stage deeper before or after shallow movements."},{season:"Summer",guidance:"A strong option for deep schools and offshore structure."},{season:"Fall",guidance:"Effective around concentrated bait and schooling fish."},{season:"Winter",guidance:"Often one of the most precise ways to target tightly grouped deep fish."}],
    commonMistakes: [
      "Jigging below the fish.",
      "Using too light a lure to stay vertical.",
      "Overworking the lure.",
      "Ignoring strikes that occur on the fall.",
      "Assuming a mark on the fish finder sits at the same horizontal position after the boat drifts; the screen depicts a changing cone of water, not a permanent waypoint.",
      "Sweeping the rod so far that the lure exits the school on every lift, then wondering why the fish quit following.",
      "Letting a heavy slab free-fall into brush and striking the bottom hard enough to bury the hook point in debris.",
      "Changing lures after each missed strike without first reproducing the depth and cadence of the previous successful presentation.",
    ],
  },
  "jigs-and-minnows": {
    tripChecks: [
      "Check the depth of brush, timber, bridge structure or suspended crappie before deciding between a vertical jig and a float-controlled presentation.",
      "If using minnows, verify legal bait species, collection and transport requirements for the specific water.",
      "Use wind and water clarity to choose jig weight and retrieve pace so the bait can stay just above the holding depth.",
    ],
    plainEnglish: "For crappie, a small artificial jig and a living minnow solve different problems. A jig can be pitched, swum or held against a specific edge of a brush pile; a legal minnow beneath a float can stay beside a dock post without constant rod movement. This guide emphasizes crappie size, cover, float setting and jig placement rather than treating every kind of live bait as the same approach.",
    whenToUse: [
      "When crappie are relating tightly to cover.",
      "When fish are suspended at a repeatable depth.",
      "During spring movements toward spawning areas.",
      "When a slow controlled presentation is more effective than searching quickly.",
      "When crappie are tucked under a dock walkway and a compact jig can be skipped or pitched into the shade without dragging a line through the structure.",
      "When brush is tall enough that a slip float can suspend a minnow just over the branches while the angler remains off the cover.",
      "When a spring bank has scattered shallow spawning cover and a lightweight casting jig can probe individual openings without anchoring on top of the fish.",
    ],
    whereToFish: [
      "Brush piles and standing timber.",
      "Bridge columns and shade lines.",
      "Creek-channel edges.",
      "Shallow spawning cover in season.",
      "The shaded edge of a marina slip or dock with legal public access, working separate pilings instead of treating the whole dock as one target.",
      "The top and outer branches of a mapped crappie brush pile, where a vertically lowered jig can be retrieved without crossing the dense center.",
      "Shallow stake beds or submerged reeds during seasonal movement when a fixed float depth prevents bait from settling into vegetation.",
      "The sides of a concrete bridge column, allowing for clearance and posted navigation rules rather than tying to or fishing in an unsafe traffic lane.",
    ],
    howToFish: [
      "Keep the bait just above crappie whenever their depth is known.",
      "Move quietly around shallow or pressured fish.",
      "Hold or swim jigs with small movements before trying aggressive action.",
      "When using live minnows, keep them lively and rigged so they can move naturally.",
      "Use a small jighead with a soft-plastic body sized for the crappie and available cover. Start with a natural, restrained retrieve; the tail's motion can provide enough action without a sharp hook-jarring twitch.",
      "Pitch beyond the brush edge, count the jig down and bring it across the upper limbs. If it hangs, alter cast direction or switch to a float rather than repeatedly ripping through the same branches.",
      "On a slip-float rig, position the stopper so the hook travels just above the crappie's holding level. Recheck the setting when moving from a shallow pocket to deeper dock water.",
      "Place a lively legal minnow through a suitable hook location without piercing its vital organs, then watch the float for sideways movement or an unusual stop, not only a dramatic plunge.",
      "When a float drifts out of the dock shade, reel back and re-present it. Letting it drift into an open boat lane or under an occupied dock is neither effective nor considerate.",
      "For a dock-shooting jig, keep the rod path low and controlled, and use the method only with ample clearance and safe access; it is not a reason to cast toward people or boats.",
      "If a crappie strikes during the count-down, repeat the number of seconds rather than guessing the depth or immediately upsizing the offering.",
    ],
    setup: [
      "Light or medium-light tackle improves bite detection.",
      "Use enough weight to maintain depth control without overpowering the presentation.",
      "Longer rods can help place baits accurately around cover.",
      "Use electronics or depth references to repeat the productive zone.",
      "An ultralight or light spinning rod and manageable line make delicate crappie jigs easier to cast; heavier tackle can overpower tiny hooks and tear thin mouths.",
      "Carry more than one jighead weight so the plastic can glide naturally under a dock or reach deeper brush without requiring an excessively fast retrieve.",
      "Match the slip-float's buoyancy to the sinker and bait so subtle crappie movement remains visible; an oversized float may hide the very bite being watched.",
      "Use a landing net when lifting crappie from a tall dock or steep bank instead of swinging a fish by a small hook over the rail.",
      "Keep a compact hook-removal tool available when fishing minnows; the quicker a deep-hooked fish can be handled properly, the less time it spends out of water.",
    ],
    seasonalGuide:[{season:"Spring",guidance:"Move progressively shallower as fish approach spawning cover."},{season:"Summer",guidance:"Deeper brush, timber and bridge structure become more important."},{season:"Fall",guidance:"Cooling water can regroup fish around channels and cover."},{season:"Winter",guidance:"Deep structure and concentrated schools reward precise vertical presentations."}],
    commonMistakes: [
      "Fishing beneath suspended crappie.",
      "Moving the bait too aggressively.",
      "Failing to repeat the exact productive depth.",
      "Making excessive noise around shallow cover.",
      "Treating the brush pile's bottom depth as the bait depth even when its highest branches are several feet above the lakebed.",
      "Swinging a lightwire jig into a crappie's mouth with a bass-style hookset and enlarging the hook hole.",
      "Letting a slip-float stopper slide along the line unnoticed, causing the minnow to hang inside rather than above the brush.",
      "Choosing a bright jig solely by color before testing a different fall rate, float setting or cast angle around the same crappie cover.",
    ],
  },
  "live-bait": {
    tripChecks: [
      "Choose a legal bait source before packing the boat. When buying live minnows or shad, keep the dated receipt that identifies the seller; personally caught bait has different water-to-water restrictions.",
      "Inspect the bait tank before leaving: functioning aerator, sufficient clean source water, secure lid and a way to avoid heat buildup in the afternoon sun.",
      "Decide whether the fish you want are cruising a bank, holding over brush or suspended above a channel. Pack a float, a freeline option and a depth-controlled setup instead of only one bottom rig.",
    ],
    plainEnglish: "Live bait depends on keeping the bait alive and swimming naturally at the correct depth. A lively minnow hovering above a crappie brush pile calls for a different hook, leader and presentation than shad suspended over open water for stripers. Bait origin and transport rules matter before either rig goes into a lake.",
    whenToUse: [
      "When you can identify a forage school or individual fish on sonar and hold a living bait just above the depth they occupy.",
      "For crappie tucked into standing timber, bridge shade or brush, where a small minnow under a float can be presented repeatedly at one measured depth.",
      "For open-water striped or hybrid bass where legally sourced, healthy shad can be kept in the fish's depth band without dragging a sinker through the school.",
      "When fish inspect but ignore fast artificial presentations and a slower, self-moving offering gives them time to approach.",
      "When a short, controlled drift or stationary presentation makes more sense than searching the entire shoreline with moving lures.",
    ],
    whereToFish: [
      "On the upwind edge of a visible baitfish school, placing the offering through the fish's travel lane rather than the noisy center of the school.",
      "Beside bridge pilings or suspended crappie brush, keeping a minnow above the limbs so the line does not wrap timber.",
      "Along the contour of a creek-channel swing where sonar shows isolated fish above bottom, not merely where a depth map shows the deepest hole.",
      "At points adjoining open basins when fish and forage appear at a consistent midwater depth.",
      "In sheltered pockets where a small float stays readable and a bank angler can maintain a controlled presentation.",
      "Away from swimmers, busy boat ramps and restricted zones when drifting or positioning a vessel over schooling fish.",
    ],
    howToFish: [
      "Choose the bait size for the mouth of the target fish; a small crappie minnow and a larger open-water shad should not be rigged as though they were interchangeable.",
      "Start with the shallowest possible weight that holds the chosen depth. A bait fighting an oversized sinker often twists the leader and loses its free swimming action.",
      "For a float rig, measure the distance from bobber to hook and shorten it until the minnow clears the top of the brush. A dangling bait buried inside branches is both hard to see and hard to retrieve.",
      "For suspended fish, mark the school on sonar and lower a slip-sinker or other controlled presentation to their level; do not automatically drop the bait to the lake bed.",
      "For a freeline presentation in calm, manageable water, watch the direction of travel and let the bait swim without continually tightening the line.",
      "Use the smallest practical hook that can hold the bait and land the intended fish. Check that the point is exposed, the bait can still swim and the hook has not damaged it beyond usefulness.",
      "After an unsuccessful pass, change only one factor: the depth setting, boat position, hook placement or bait size. That makes a second attempt informative rather than random.",
      "Replace lethargic bait. A surface-gasping minnow in a warm unoxygenated bucket is not equivalent to a fresh, active bait from a properly maintained tank.",
      "When moving to another water body, stop and confirm the legal origin, receipt and water-contact status of any leftover bait instead of assuming the contents of the livewell may travel.",
    ],
    setup: [
      "A battery-powered aerator, properly sized bait container and shade can matter more than extra terminal tackle on a warm Texas afternoon.",
      "Check water temperature and oxygen supply throughout the outing; do not cram too many baitfish into a container simply because the lid closes.",
      "Keep a selection of small bait hooks, light leaders, slip floats, bobber stops and removable weights for fine depth adjustments without rebuilding the entire rig.",
      "For crappie, a visible float and a long, flexible rod make it easier to hold a small minnow beside cover without swinging over branches.",
      "For stripers or hybrids, use tackle that can control a stronger fish while keeping the bait and leader aligned with the chosen water column.",
      "Carry a way to measure the bait's actual swimming depth: a float stop, marked line, electronics or a depth reference near the cover.",
      "Use a net or wet hands to reduce handling stress and release unused bait only where the applicable rules allow; never move aquatic organisms into a different water body.",
    ],
    seasonalGuide: [
      { season: "Spring", guidance: "Crappie may move toward shallower cover in stages while open-water forage shifts with warming water. Adjust float depth near brush rather than assuming every spring bite is at the bank." },
      { season: "Summer", guidance: "A shaded, oxygenated bait tank is especially important in hot weather. Suspended stripers and hybrids may be well above a channel bottom even when anglers can see the drop on a map." },
      { season: "Fall", guidance: "Find the actual forage concentration before choosing an anchoring point. A school can shift from the back of a creek to open water while a historically productive dock remains empty." },
      { season: "Winter", guidance: "When fish move less, try a quieter, measured minnow presentation with longer holds near a known depth. Protect the bait from sudden temperature changes and check seasonal access limitations." },
    ],
    commonMistakes: [
      "Keeping minnows in direct sunlight until they gasp at the surface.",
      "Hooking a bait so aggressively that its natural movement is lost before the first cast.",
      "Setting a fixed float far beneath the fish or letting a sinker pull a shad below the suspended school.",
      "Assuming a good sonar mark means fish are actively feeding without testing an alternative depth or approach.",
      "Moving personally caught bait, lake-contact water or fish between reservoirs without checking TPWD restrictions.",
      "Discarding unused bait into a different water body.",
      "Confusing a healthy natural presentation with a guarantee of a bite on a particular day.",
    ],
  },
  "cut-bait": {
    tripChecks: [
      "Confirm the source fish is legal bait under current Texas and water-specific rules before cutting or transporting it.",
      "Plan chilled storage and replace pieces that lose firmness or no longer keep the hook point exposed.",
      "Check flow, wind and channel access before choosing a fixed bottom rig, three-way setup or controlled drift.",
    ],
    plainEnglish: "Cut bait uses pieces of a legally obtained bait fish to release scent and oils for catfish. In Texas, the source fish matters as much as the rig: game fish or any part of a game fish may not be used as bait, and water-specific bait rules can be more restrictive.",
    whenToUse:[
      "For blue catfish where fresh cut forage is an established reservoir or river presentation.",
      "For channel catfish when a compact natural bait can be placed along channels, flats, points or current.",
      "When current or wind can carry scent through a travel lane instead of leaving the bait in stagnant water.",
      "When fish are roaming along channel edges, tributary mouths, wind-blown flats or other forage routes.",
      "When a fresh legal bait source is available and can be kept cold, firm and usable."
    ],
    whereToFish:[
      "Outside river and creek-channel bends where depth and current create travel lanes.",
      "Channel edges, drop-offs and adjacent flats that let catfish move between deep and feeding water.",
      "Wind-blown flats and points where forage can collect.",
      "Current seams, tributary mouths and inflow areas when flow is present.",
      "Edges of timber, rock or other structure that can hold fish without burying the rig in the cover."
    ],
    howToFish:[
      "Confirm the source fish is legal to use as bait on that water before cutting it.",
      "Keep bait cold and fresh, then cut a chunk, steak, head section or strip that matches the hook and target fish.",
      "Pass the hook through firm skin or tissue and clear scales away from the hook point so the point and gap stay exposed.",
      "Choose a slip-sinker, three-way/current or suspended/drift layout based on bottom, current and whether the bait should stay pinned or move.",
      "Place the bait on a defined travel route or forage area, then watch line angle and sinker hold so the rig remains where intended.",
      "Reposition when a high-percentage area shows no activity rather than leaving washed-out bait in one place indefinitely."
    ],
    setup:[
      "Use rod, reel and line strength appropriate to the size of fish, current and cover—not simply the heaviest gear available.",
      "Match sinker style and weight to depth and current; use enough weight to control the bait without making the rig unnecessarily cumbersome.",
      "Match circle-hook size to the bait piece so the hook gap remains open. With a circle hook, reel into steady pressure instead of making an aggressive sweeping hookset.",
      "Use an abrasion-resistant leader where rock, timber, shell or large fish justify it.",
      "Carry a landing net or other safe landing plan before fishing for large catfish.",
      "Keep unused bait chilled and replace pieces that become soft, washed out, torn or unable to stay securely on the hook."
    ],
    seasonalGuide:[
      {season:"Spring",guidance:"Rising temperature, tributary influence and seasonal movement can pull catfish toward inflows, channel edges and adjacent flats. Follow current forage and water movement rather than assuming every shallow area is productive."},
      {season:"Summer",guidance:"Low-light and nighttime periods can improve shallow opportunities, while daylight fish may use deeper channels, ledges or current. Heat also makes bait handling and keeping cut bait cold more important."},
      {season:"Fall",guidance:"Cooling water and forage movement can concentrate feeding fish along creek channels, flats and transition routes. Cover water until bait and fish location become repeatable."},
      {season:"Winter",guidance:"Large blue catfish can become an important target on many reservoirs. Deep channels, channel edges and forage concentrations are more useful starting points than a generic 'deep water' rule."}
    ],
    commonMistakes:[
      "Using a game fish, part of a game fish or another bait source that is not legal for the water being fished.",
      "Using old, warm, mushy or badly washed-out bait when a fresher legal option is available.",
      "Burying the hook point in scales, skin or an oversized bait piece.",
      "Choosing sinker weight without considering current, bottom composition and line angle.",
      "Treating blue, channel and flathead catfish as if they require identical bait and location decisions.",
      "Fishing one unproductive area too long instead of testing another defined travel route or forage zone."
    ]
  }
};
