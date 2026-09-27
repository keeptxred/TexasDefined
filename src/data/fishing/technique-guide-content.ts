export type FishingTechniqueGuideContent = {
  plainEnglish: string;
  whenToUse: string[];
  whereToFish: string[];
  howToFish: string[];
  setup: string[];
  seasonalGuide: Array<{ season: string; guidance: string }>;
  commonMistakes: string[];
  selectionGuide?: Array<{ label: string; bestFor: string; depth?: string }>;
};

export const fishingTechniqueGuideContent: Record<string, FishingTechniqueGuideContent> = {
  "crankbaits": {
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
    selectionGuide: [
      { label: "Squarebill", bestFor: "Shallow wood, rock, docks and deflection fishing", depth: "Shallow" },
      { label: "Shallow diver", bestFor: "Banks, riprap and shallow points", depth: "Shallow" },
      { label: "Medium diver", bestFor: "Points, grass edges and channel transitions", depth: "Mid-depth" },
      { label: "Deep diver", bestFor: "Ledges, humps, roadbeds and offshore structure", depth: "Deep" },
      { label: "Lipless crankbait", bestFor: "Flats, grass and covering open water", depth: "Variable" }
    ]
  },
  "soft-plastics": {
    plainEnglish: "Soft plastics are adaptable presentations that can be rigged weedless, weighted, weightless, on a jig head or on specialized rigs to fish from the surface to deep structure.",
    whenToUse: ["When fish are holding tightly to cover.", "When a slower presentation is needed.", "When you need one lure family that can work shallow or deep.", "When pressured fish are refusing faster moving baits."],
    whereToFish: ["Vegetation edges and holes.", "Docks, brush and timber.", "Points, creek channels and offshore structure.", "Shallow spawning cover and transition banks."],
    howToFish: ["Match the rig to the cover before choosing color.", "Keep enough bottom or cover contact to understand what the lure is doing.", "Use pauses and controlled falls rather than constant rod movement.", "Re-rig immediately when the bait tears or no longer runs straight."],
    setup: ["Use line and hook strength appropriate to the cover.", "Choose weight by depth, wind and fall rate rather than habit.", "A medium to medium-heavy rod covers many common Texas bass applications.", "Keep hooks sharp and check knots after abrasive cover."],
    seasonalGuide: [{season:"Spring",guidance:"Weightless and lightly weighted plastics excel around shallow spawning cover."},{season:"Summer",guidance:"Move toward deeper edges, docks, shade and offshore structure as fish reposition."},{season:"Fall",guidance:"Use faster-moving plastics when fish chase, then slow down around isolated cover."},{season:"Winter",guidance:"Subtle movement and slower presentations can keep the bait in the strike zone longer."}],
    commonMistakes:["Using too much weight in shallow water.","Working the bait constantly instead of allowing natural pauses.","Failing to adjust hook style to the cover.","Fishing damaged plastics that twist or slide down the hook."]
  },
  "spinnerbaits": {
    plainEnglish: "Spinnerbaits combine flash, vibration and a single-hook profile that can move efficiently through shallow cover, vegetation and stained water.",
    whenToUse:["Windy banks and low-light periods.","Stained water where vibration helps fish locate the bait.","Around shallow wood, grass and docks.","When baitfish are active and bass are willing to chase."],
    whereToFish:["Wind-blown shorelines.","Standing timber and laydowns.","Grass edges and flooded vegetation.","Riprap, docks and shallow points."],
    howToFish:["Keep the bait close to cover rather than retrieving through empty water.","Vary retrieve speed until the blades run at the depth fish are using.","Let the lure fall beside isolated cover before starting the retrieve.","Use occasional contact with grass or wood to create direction changes."],
    setup:["Medium-heavy casting tackle is common for cover-oriented fishing.","Match blade size to desired lift, vibration and retrieve speed.","Use heavier line around wood and dense vegetation.","Check the wire arm after hard strikes or snags."],
    seasonalGuide:[{season:"Spring",guidance:"Excellent around warming shallow cover and windy spawning-area transitions."},{season:"Summer",guidance:"Early, late and windy periods can keep the bite shallow; deeper slow-rolling can extend the technique."},{season:"Fall",guidance:"Follow shad into creeks and across wind-blown flats."},{season:"Winter",guidance:"Slower retrieves and compact profiles can work when fish remain near shallow cover."}],
    commonMistakes:["Retrieving too high above the cover.","Choosing blade combinations without considering water clarity.","Avoiding contact with cover completely.","Failing to retune a bent wire frame."]
  },
  "topwater": {
    plainEnglish: "Topwater fishing keeps the lure on or near the surface and is most effective when fish are willing to feed upward.",
    whenToUse:["Low light, cloud cover and schooling activity.","Warm-water periods when fish are shallow.","Around vegetation, points and flooded cover.","When baitfish are visibly being chased near the surface."],
    whereToFish:["Grass edges and open pockets.","Points, seawalls and riprap.","Shallow flats and creek mouths.","Around schooling fish in open water."],
    howToFish:["Start with a deliberate cadence, then change speed before changing lures.","Pause beside isolated cover where a fish has time to track the bait.","For walking baits, keep slack in the line so the lure can turn side to side.","Delay the hookset until you feel weight rather than reacting only to the splash."],
    setup:["A rod with some tip flex helps cast and work surface lures.","Monofilament or braid can help keep the line near the surface depending on cover.","Use stronger tackle around heavy vegetation.","Inspect trebles because topwater fish often swipe rather than fully engulf the bait."],
    seasonalGuide:[{season:"Spring",guidance:"Becomes stronger as water warms and fish move shallow."},{season:"Summer",guidance:"Early morning, evening and overcast periods often extend surface activity."},{season:"Fall",guidance:"Schooling baitfish can create excellent open-water topwater opportunities."},{season:"Winter",guidance:"Usually more situational; warm spells and active shallow fish can still create windows."}],
    commonMistakes:["Setting the hook at the splash instead of after feeling the fish.","Working every lure at the same cadence.","Ignoring baitfish size.","Using surface presentations when fish are clearly feeding deeper."]
  },
  "trolling": {
    plainEnglish: "Trolling presents one or more baits behind a moving boat so anglers can cover open water, maintain depth and intercept roaming fish.",
    whenToUse:["When striped, hybrid or other open-water fish are scattered.","When fish are following creek channels, river channels or bait schools.","When covering large reservoirs efficiently matters.","When depth control is more important than repeated casting."],
    whereToFish:["Channel edges and bends.","Open-water flats near bait.","Main-lake points and humps.","Areas where sonar shows suspended fish or bait."],
    howToFish:["Use speed, lure choice and line length together to control depth.","Make turns deliberately because inside and outside lines change speed and depth.","Mark productive passes and repeat the same contour rather than wandering randomly.","Keep lures clear of debris because one fouled bait can waste an entire pass."],
    setup:["Rod holders and a consistent spread improve repeatability.","Match tackle to the species and lure resistance.","Use depth-capable electronics or contour information where available.","Follow all current Texas regulations governing rods, lines and species-specific limits."],
    seasonalGuide:[{season:"Spring",guidance:"Follow open-water fish as they transition between river influence and the main lake."},{season:"Summer",guidance:"Especially useful for suspended fish holding over deep water."},{season:"Fall",guidance:"Track bait concentrations and temperature-driven movement."},{season:"Winter",guidance:"Slower speeds and precise depth control can become more important."}],
    commonMistakes:["Trolling without a target depth.","Making productive passes once instead of repeating them.","Ignoring speed changes during turns.","Failing to monitor for fouled lures."]
  },
  "vertical-jigging": {
    plainEnglish: "Vertical jigging works a spoon, slab, jig or similar lure directly beneath the boat over fish, structure or bait.",
    whenToUse:["When sonar shows fish concentrated below the boat.","When fish are deep or suspended.","When schooling fish stop chasing horizontally.","When wind or current makes casting inefficient."],
    whereToFish:["Creek and river channels.","Bridge structure and deep timber openings.","Main-lake humps and points.","Directly over suspended schools."],
    howToFish:["Drop to the fish rather than automatically to the bottom.","Use short controlled lifts before trying exaggerated strokes.","Watch the lure on sonar when possible and adjust to the fish's depth.","Keep tension during the fall because many strikes come as the lure drops."],
    setup:["Use line with low stretch for depth sensitivity.","Choose lure weight heavy enough to stay vertical in wind or current.","A shorter responsive rod can improve control near the boat.","Use a leader appropriate to water clarity and target species."],
    seasonalGuide:[{season:"Spring",guidance:"Useful when fish stage deeper before or after shallow movements."},{season:"Summer",guidance:"A strong option for deep schools and offshore structure."},{season:"Fall",guidance:"Effective around concentrated bait and schooling fish."},{season:"Winter",guidance:"Often one of the most precise ways to target tightly grouped deep fish."}],
    commonMistakes:["Jigging below the fish.","Using too light a lure to stay vertical.","Overworking the lure.","Ignoring strikes that occur on the fall."]
  },
  "jigs-and-minnows": {
    plainEnglish: "Jigs and minnows are core crappie presentations because both can be fished precisely around brush, timber, bridges and seasonal spawning cover.",
    whenToUse:["When crappie are relating tightly to cover.","When fish are suspended at a repeatable depth.","During spring movements toward spawning areas.","When a slow controlled presentation is more effective than searching quickly."],
    whereToFish:["Brush piles and standing timber.","Bridge columns and shade lines.","Creek-channel edges.","Shallow spawning cover in season."],
    howToFish:["Keep the bait just above crappie whenever their depth is known.","Move quietly around shallow or pressured fish.","Hold or swim jigs with small movements before trying aggressive action.","When using live minnows, keep them lively and rigged so they can move naturally."],
    setup:["Light or medium-light tackle improves bite detection.","Use enough weight to maintain depth control without overpowering the presentation.","Longer rods can help place baits accurately around cover.","Use electronics or depth references to repeat the productive zone."],
    seasonalGuide:[{season:"Spring",guidance:"Move progressively shallower as fish approach spawning cover."},{season:"Summer",guidance:"Deeper brush, timber and bridge structure become more important."},{season:"Fall",guidance:"Cooling water can regroup fish around channels and cover."},{season:"Winter",guidance:"Deep structure and concentrated schools reward precise vertical presentations."}],
    commonMistakes:["Fishing beneath suspended crappie.","Moving the bait too aggressively.","Failing to repeat the exact productive depth.","Making excessive noise around shallow cover."]
  },
  "live-bait": {
    plainEnglish: "Live bait uses natural prey such as shad or minnows to present scent, movement and profile with minimal artificial action.",
    whenToUse:["When fish are keying tightly on natural forage.","For striped, hybrid, crappie or catfish applications where live bait is established locally.","When fish are suspended and a bait can be held at their depth.","When artificial lures are being ignored."],
    whereToFish:["Around bait schools.","Channel edges and points.","Brush, timber and bridge structure.","Open water where target fish are suspended."],
    howToFish:["Match bait size to the forage and target species.","Keep bait lively and replace weak bait promptly.","Control depth deliberately rather than letting the bait wander out of the strike zone.","Use only legal bait species and collection methods for the specific water body."],
    setup:["Use hooks sized to the bait rather than only the target fish.","Aeration and temperature control are essential for keeping bait healthy.","Use enough weight to control depth while preserving natural movement.","Check current Texas bait and water-body rules before collecting, transporting or using live bait."],
    seasonalGuide:[{season:"Spring",guidance:"Can be highly effective around migrations and spawning-related movements."},{season:"Summer",guidance:"Depth control becomes especially important for open-water fish."},{season:"Fall",guidance:"Follow bait concentrations as fish feed heavily before winter."},{season:"Winter",guidance:"Slower presentations can keep natural forage near less-active fish."}],
    commonMistakes:["Using weak or stressed bait.","Ignoring legal bait restrictions.","Fishing at the wrong depth.","Using hooks or weights that overpower the bait."]
  },
  "cut-bait": {
    plainEnglish: "Cut bait uses pieces of fresh fish to release scent and oils, making it a common catfish presentation in reservoirs, rivers, channels and flats.",
    whenToUse:["For blue and channel catfish where fresh natural forage is part of the food base.","When scent dispersion can help fish locate the bait.","When fishing channel edges, flats or current seams.","When targeting fish that are roaming rather than locked to one piece of cover."],
    whereToFish:["River and creek channels.","Channel bends and drop-offs.","Wind-blown flats and points.","Current seams, tributary mouths and other travel routes."],
    howToFish:["Use fresh bait when possible and cut pieces to match target size.","Place baits where scent can move through fish travel lanes.","Reposition when a spot produces no activity instead of soaking one location indefinitely.","Keep the hook point exposed and free of scales."],
    setup:["Use tackle heavy enough for the fish and cover present.","Match sinker style and weight to current and depth.","Use circle hooks correctly when required or preferred, avoiding aggressive hooksets.","Carry a landing plan for large catfish before the bite occurs."],
    seasonalGuide:[{season:"Spring",guidance:"Tributary influence, warming flats and moving water can become important."},{season:"Summer",guidance:"Night fishing and deeper channel structure can be productive."},{season:"Fall",guidance:"Cooling water and bait movement can concentrate feeding fish."},{season:"Winter",guidance:"Deep channels and large blue catfish become important on many Texas reservoirs."}],
    commonMistakes:["Using old or washed-out bait.","Burying the hook point in scales or tough skin.","Fishing one dead area too long.","Using insufficient tackle around heavy fish or strong current."]
  }
};
