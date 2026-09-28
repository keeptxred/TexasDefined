import type { PublishedFishingTechniqueSlug } from "./technique-routing";

export type FishingTechniqueAuthorityContent = {
  selectionTitle: string;
  selectionIntro: string;
  selectionGuide: Array<{ label: string; depth: string; bestFor: string }>;
  speciesTitle?: string;
  speciesIntro?: string;
  speciesGuide: Array<{ label: string; guidance: string }>;
  diagram?: {
    eyebrow?: string;
    title: string;
    intro: string;
    rigs: Array<{ name: string; pieces: string[]; note: string }>;
  };
  regulationNotes?: {
    title: string;
    intro: string;
    bullets: string[];
    sourceUrl: string;
    sourceLabel: string;
  };
  faq: Array<{ question: string; answer: string }>;
};

const texasFishingRulesUrl = "https://tpwd.texas.gov/regulations/outdoor-annual/fishing/general-rules-regulations/general-fishing-regulations";

export const fishingTechniqueAuthorityContent: Record<PublishedFishingTechniqueSlug, FishingTechniqueAuthorityContent> = {
  "soft-plastics": {
    selectionTitle: "Choose the Soft-Plastic Rig for the Job",
    selectionIntro: "Match the rig to cover, depth and how long you need the bait to remain in the strike zone.",
    selectionGuide: [
      { label: "Texas rig", depth: "Shallow–deep", bestFor: "Vegetation, brush, timber, docks and other snag-prone cover" },
      { label: "Weightless stick bait", depth: "Shallow", bestFor: "Dock shade, calm pockets, shallow cover and pressured fish" },
      { label: "Carolina rig", depth: "Mid-depth–deep", bestFor: "Points, flats, roadbeds and broad bottom structure" },
      { label: "Drop shot", depth: "Mid-depth–deep", bestFor: "Clear water, vertical targets, suspended fish and finesse situations" },
    ],
    speciesTitle: "Match the Plastic to the Fish and Cover",
    speciesIntro: "Soft plastics span several Texas black-bass fisheries, but the cover and presentation should drive the rig.",
    speciesGuide: [
      { label: "Largemouth bass", guidance: "Use weedless rigs around grass, wood, docks and brush; move to finesse or offshore rigs when fish leave shallow cover." },
      { label: "Smallmouth bass", guidance: "Prioritize rock, points and clearer water with compact bottom or finesse presentations." },
      { label: "Guadalupe bass", guidance: "In river-oriented habitat, favor compact presentations that can be controlled around current, rock and woody cover." },
    ],
    faq: [
      { question: "What is the most versatile soft-plastic rig in Texas?", answer: "A Texas rig is the broad all-purpose starting point because it can be fished from shallow cover to deeper structure and can be made relatively snag resistant." },
      { question: "How heavy should the sinker be?", answer: "Use the lightest weight that still gives reliable control in the depth, wind and cover you are fishing. More weight is not automatically better." },
      { question: "When should I switch to a finesse rig?", answer: "Finesse presentations become useful when fish are pressured, inactive, holding in clear water or positioned where a slower, more precise bait is easier to keep in the strike zone." },
    ],
  },
  "crankbaits": {
    selectionTitle: "Crankbait Types by Depth and Cover",
    selectionIntro: "Running depth is the first decision. Choose a lure that reaches the target zone before fine-tuning color, profile and retrieve speed.",
    selectionGuide: [
      { label: "Squarebill", depth: "Shallow", bestFor: "Wood, riprap, docks and other deflection targets" },
      { label: "Medium diver", depth: "Mid-depth", bestFor: "Points, grass edges and creek-channel transitions" },
      { label: "Deep diver", depth: "Deep", bestFor: "Ledges, humps, roadbeds and offshore structure" },
      { label: "Lipless crankbait", depth: "Variable", bestFor: "Flats, sparse grass and covering open water" },
    ],
    speciesTitle: "Where Crankbaits Fit Best",
    speciesGuide: [
      { label: "Largemouth bass", guidance: "Match running depth to shoreline cover, vegetation edges, points and offshore structure." },
      { label: "Smallmouth bass", guidance: "Rock, bluffs and hard-bottom transitions are high-value crankbait situations where repeated bottom contact can matter." },
      { label: "White bass", guidance: "Small crankbaits can fit schooling or river-run situations when baitfish-sized moving presentations match the forage." },
    ],
    faq: [
      { question: "How do I choose crankbait depth?", answer: "Start with the depth of the cover or structure you need to reach. A crankbait is most useful when it can contact or narrowly clear the target zone for a meaningful portion of the retrieve." },
      { question: "Why does line size matter with crankbaits?", answer: "Line diameter changes resistance and can affect how deeply a diving lure runs, so the same crankbait may not reach the same depth on every setup." },
      { question: "When should I use a lipless crankbait?", answer: "Lipless crankbaits are useful for covering flats, fishing over or through sparse vegetation and reaching variable depths by changing retrieve speed and sink time." },
    ],
  },
  "spinnerbaits": {
    selectionTitle: "Choose a Spinnerbait for Water and Cover",
    selectionIntro: "Blade shape, overall weight and retrieve speed change lift, vibration and flash. Pick the combination that stays in the target zone.",
    selectionGuide: [
      { label: "Colorado-heavy blade", depth: "Shallow–mid", bestFor: "Stained water, slower retrieves and situations where stronger vibration helps" },
      { label: "Willow-heavy blade", depth: "Shallow–mid", bestFor: "Covering water, baitfish profiles and faster retrieves" },
      { label: "Tandem blades", depth: "Shallow–mid", bestFor: "General-purpose balance of flash, vibration and lift" },
      { label: "Heavier slow-roll setup", depth: "Mid-depth–deep", bestFor: "Deeper cover, ledges and keeping the bait down during a controlled retrieve" },
    ],
    speciesTitle: "Best Fits for Spinnerbaits",
    speciesGuide: [
      { label: "Largemouth bass", guidance: "Use the lure as a cover-oriented search bait around wood, grass, docks, riprap and wind-blown banks." },
      { label: "Smallmouth bass", guidance: "On waters where they are present, spinnerbaits can cover wind-exposed rocky structure and points when fish are willing to chase." },
      { label: "Guadalupe bass", guidance: "Compact spinnerbaits can be easier to control in current and around river cover where larger profiles become cumbersome." },
    ],
    diagram: {
      eyebrow: "Retrieve at a glance",
      title: "Spinnerbait Control at a Glance",
      intro: "The same lure can occupy different parts of the water column by changing weight, blade lift and retrieve speed.",
      rigs: [
        { name: "Shallow cover", pieces: ["cast past target", "start blades", "deflect near cover"], note: "Keep the bait close enough to wood, grass or docks to create a reaction opportunity." },
        { name: "Slow roll", pieces: ["heavier bait", "controlled sink", "slow retrieve near bottom"], note: "Use enough weight to maintain depth without letting the lure simply drag or foul." },
      ],
    },
    faq: [
      { question: "When are spinnerbaits strongest?", answer: "They are especially useful around wind, low light, stained water and shallow cover when fish are willing to chase a moving bait." },
      { question: "Should a spinnerbait hit cover?", answer: "Controlled contact and deflection can be useful. The goal is not to snag repeatedly, but avoiding every piece of cover can keep the lure away from the highest-value strike zones." },
      { question: "How do blade styles change the presentation?", answer: "Broader blades generally create more lift and vibration, while narrower blades tend to create less lift and can be easier to retrieve faster or deeper." },
    ],
  },
  "topwater": {
    selectionTitle: "Choose the Surface Presentation",
    selectionIntro: "Topwater styles solve different problems. Match the lure to cover, wave action, forage and how much movement you want in one spot.",
    selectionGuide: [
      { label: "Walking bait", depth: "Surface", bestFor: "Open water, points, schooling fish and covering broad areas" },
      { label: "Popper", depth: "Surface", bestFor: "Targets, pauses, calm pockets and keeping a bait near one piece of cover" },
      { label: "Buzzbait / plopper style", depth: "Surface", bestFor: "Covering water around shallow cover and active fish" },
      { label: "Frog", depth: "Surface / vegetation", bestFor: "Mats, emergent vegetation and snag-prone shallow cover" },
    ],
    speciesTitle: "Topwater by Target",
    speciesGuide: [
      { label: "Largemouth bass", guidance: "Focus on low-light shallows, vegetation edges, isolated cover and feeding lanes." },
      { label: "White, striped and hybrid bass", guidance: "Surface-feeding schools can make topwater effective in open water, but move deeper when the fish stop feeding upward." },
      { label: "Smallmouth bass", guidance: "Rocky points and clear-water structure can produce surface opportunities when fish are active and willing to rise." },
    ],
    diagram: {
      eyebrow: "Cadence at a glance",
      title: "Topwater Cadence at a Glance",
      intro: "Topwater is not one retrieve. Use the lure style to decide whether the bait should travel continuously or spend more time beside one target.",
      rigs: [
        { name: "Walking bait", pieces: ["cast beyond target", "slack-line taps", "side-to-side walk", "brief pause"], note: "Use a repeatable rhythm, then change speed or pause length before changing lures." },
        { name: "Popper", pieces: ["cast to target", "pop", "pause", "repeat"], note: "Longer pauses keep the lure beside isolated cover instead of racing it away." },
        { name: "Buzzbait / plopper", pieces: ["cast", "start retrieve", "keep on surface", "deflect past cover"], note: "A steadier retrieve is useful for covering water and finding active fish." },
        { name: "Frog", pieces: ["land on / beside cover", "walk or pull", "pause in openings", "feel weight before hookset"], note: "Pause in high-value openings and avoid reacting only to the splash." },
      ],
    },
    faq: [
      { question: "Why do I miss topwater strikes?", answer: "Setting the hook at the splash is a common cause. Wait until you feel the fish's weight before making a controlled hookset." },
      { question: "Is topwater only for early morning?", answer: "No. Low light is a common window, but cloud cover, wind, schooling activity and warm-water feeding can extend surface opportunities beyond dawn." },
      { question: "What should I change first when fish follow but do not strike?", answer: "Change cadence and pause length before abandoning the presentation. Speed and rhythm often matter as much as switching lure styles." },
    ],
  },
  "trolling": {
    selectionTitle: "Choose a Trolling Approach",
    selectionIntro: "Depth control is the central problem. Speed, lure design, line length and any added weight must work together.",
    selectionGuide: [
      { label: "Diving lure", depth: "Shallow–deep by lure", bestFor: "Following contour lines, points, channel edges and suspended fish" },
      { label: "Weighted line / sinker-assisted", depth: "Mid-depth–deep", bestFor: "Holding a bait below its natural running depth" },
      { label: "Umbrella / multi-bait presentation", depth: "Variable", bestFor: "Open-water baitfish imitation where legal and practical" },
      { label: "Slow natural-bait troll", depth: "Variable", bestFor: "Open-water fish that are following forage but not responding to fast artificials" },
    ],
    speciesTitle: "Trolling by Fishery",
    speciesGuide: [
      { label: "Striped and hybrid bass", guidance: "Use electronics and bait location to set the target depth rather than trolling an arbitrary contour." },
      { label: "White bass", guidance: "Smaller profiles and repeatable passes can work around schooling fish and channel-oriented movement." },
      { label: "Black bass", guidance: "Where source-backed for a lake, contour trolling can cover points, creek channels and offshore structure efficiently." },
    ],
    diagram: {
      eyebrow: "Trolling at a glance",
      title: "Build a Repeatable Trolling Pass",
      intro: "A productive pass is a measured combination of boat path, speed and lure depth—not simply driving while a lure trails behind.",
      rigs: [
        { name: "Contour pass", pieces: ["mark target depth", "set speed", "set line length", "follow contour", "repeat productive line"], note: "Repeatability lets you test one variable at a time." },
        { name: "Suspended-fish pass", pieces: ["find bait/fish", "set lure depth", "cross school", "turn deliberately"], note: "Inside and outside lines change speed and depth during turns." },
      ],
    },
    regulationNotes: {
      title: "Check Legal Devices and Water-Specific Rules",
      intro: "Trolling itself is common, but rod, line, hook, species and water-body rules can vary.",
      bullets: [
        "Check the current Texas Outdoor Annual before fishing, especially when using multiple rods, hooks or multi-bait systems.",
        "Special limits and border-water rules can apply on individual reservoirs.",
        "Do not treat a technique page as a substitute for current species, license or water-body regulations.",
      ],
      sourceUrl: texasFishingRulesUrl,
      sourceLabel: "Texas Parks & Wildlife — current fishing regulations",
    },
    faq: [
      { question: "How do I know how deep a trolled lure is running?", answer: "Use the lure's known diving behavior as a starting point, then control speed, line length, line diameter and added weight consistently. Electronics help confirm where fish are relative to the presentation." },
      { question: "Why repeat the same trolling pass?", answer: "Repeating a productive line helps separate a real depth or structure pattern from a one-off encounter." },
      { question: "What changes during a turn?", answer: "The outside line speeds up while the inside line slows down, which can change both lure action and running depth." },
    ],
  },
  "vertical-jigging": {
    selectionTitle: "Choose the Vertical Presentation",
    selectionIntro: "The best lure is the one that can stay under the boat, reach the fish and remain controllable in the existing depth, wind and current.",
    selectionGuide: [
      { label: "Slab / jigging spoon", depth: "Mid-depth–deep", bestFor: "Schooling white, striped and hybrid bass or fish tight to bottom structure" },
      { label: "Compact jig", depth: "Shallow–deep", bestFor: "Precise presentations around cover, bridge structure and smaller forage" },
      { label: "Blade / vibration lure", depth: "Mid-depth–deep", bestFor: "Active fish where vibration can help trigger strikes" },
      { label: "Natural-bait vertical presentation", depth: "Variable", bestFor: "Holding legal bait at a known depth over fish or structure" },
    ],
    speciesTitle: "Depth Matters More Than the Bottom",
    speciesGuide: [
      { label: "White, striped and hybrid bass", guidance: "Stop the lure at the depth of the school. Dropping beneath suspended fish is one of the easiest ways to miss them." },
      { label: "Crappie", guidance: "Keep compact jigs just above fish around brush, timber and bridge structure when the technique is source-backed for that water." },
      { label: "Black bass", guidance: "Vertical presentations can work on deep structure or suspended fish when casting would spend too much time outside the target zone." },
    ],
    diagram: {
      eyebrow: "Depth control at a glance",
      title: "Vertical Jigging Positioning",
      intro: "The lure should stay close to the fish's actual depth while remaining nearly under the boat.",
      rigs: [
        { name: "Suspended school", pieces: ["locate fish", "drop to fish depth", "short lift", "controlled fall"], note: "Do not automatically drop to bottom when fish are suspended." },
        { name: "Bottom structure", pieces: ["find structure", "stop just above bottom", "lift", "follow fall"], note: "Maintain enough line control to detect bites on the drop." },
      ],
    },
    faq: [
      { question: "How heavy should a vertical jig be?", answer: "Use enough weight to stay controlled and nearly vertical in the current depth, wind and current without making the presentation unnecessarily heavy." },
      { question: "Should I always jig on the bottom?", answer: "No. Many open-water fish suspend. Match the lure depth to the fish, not automatically to the lake bottom." },
      { question: "Why are bites easy to miss on the fall?", answer: "Fish often strike as the lure drops, so excessive slack can hide the bite. A controlled fall keeps the lure natural while preserving contact." },
    ],
  },
  "jigs-and-minnows": {
    selectionTitle: "Choose the Crappie Presentation",
    selectionIntro: "Depth and cover determine whether a jig, live minnow or combination is easiest to keep in the strike zone.",
    selectionGuide: [
      { label: "Single jig", depth: "Shallow–deep", bestFor: "Casting, swimming or vertical control around brush, timber and bridge structure" },
      { label: "Live minnow", depth: "Shallow–deep", bestFor: "Slow presentations when fish are holding at a repeatable depth" },
      { label: "Jig tipped with legal bait", depth: "Variable", bestFor: "Adding natural scent or profile where legal and useful" },
      { label: "Slip-float presentation", depth: "Shallow–mid", bestFor: "Holding a jig or minnow over cover at a controlled depth from boat or bank" },
    ],
    speciesTitle: "Primarily a Crappie System",
    speciesGuide: [
      { label: "Crappie", guidance: "The core job is precise depth control around brush, timber, bridge columns, shade and seasonal shallow cover." },
      { label: "White bass", guidance: "Small jigs can overlap with schooling and spring-run white-bass tactics, but use the lake-specific technique relationships on this page as the verified guide." },
      { label: "Other panfish", guidance: "Small jigs or minnows can catch other species, but TexasDefined only lists a lake application when the source-backed relationship is present in the fishing dataset." },
    ],
    diagram: {
      eyebrow: "Crappie depth at a glance",
      title: "Keep the Bait Above the Fish",
      intro: "Crappie commonly feed upward. Exact depth control is often more important than aggressive lure movement.",
      rigs: [
        { name: "Vertical jig", pieces: ["line", "jig", "hold above fish", "small lift / pause"], note: "Use depth references or electronics to repeat the productive level." },
        { name: "Slip float", pieces: ["main line", "slip float", "stop", "weight if needed", "jig or minnow"], note: "Set the stop so the bait suspends over rather than inside snag-prone cover." },
      ],
    },
    regulationNotes: {
      title: "Use Legal Bait and Check Current Limits",
      intro: "Live-minnow use adds bait collection, possession and transport rules to the normal crappie regulations.",
      bullets: [
        "Use only bait that is legal for the water body and method you are fishing.",
        "Check current transport and invasive-species rules before moving live bait between waters.",
        "Verify current crappie bag, length and water-specific regulations before keeping fish.",
      ],
      sourceUrl: texasFishingRulesUrl,
      sourceLabel: "Texas Parks & Wildlife — current fishing regulations",
    },
    faq: [
      { question: "Should a crappie jig be below the fish?", answer: "Usually no. When depth is known, start at or slightly above the fish because crappie often feed upward." },
      { question: "When is a slip float useful?", answer: "A slip float is useful when you need to suspend a jig or minnow at a repeatable depth over brush, timber or other cover without constantly managing a vertical line." },
      { question: "Jig or minnow: which should I start with?", answer: "Both are established crappie tools. Start with the presentation you can control best at the fish's depth, then compare response rather than assuming one is always superior." },
    ],
  },
  "live-bait": {
    selectionTitle: "Choose a Live-Bait Presentation",
    selectionIntro: "Keep legal bait healthy, then choose a rig that controls depth without overpowering natural movement.",
    selectionGuide: [
      { label: "Free-line", depth: "Shallow / surface-oriented", bestFor: "Minimal weight when current, wind and depth allow natural movement" },
      { label: "Slip-sinker bottom rig", depth: "Bottom", bestFor: "Channel edges, points and bottom-oriented fish" },
      { label: "Suspended rig", depth: "Variable", bestFor: "Holding bait at the depth of open-water striped, hybrid or other suspended fish" },
      { label: "Float-controlled rig", depth: "Shallow–mid", bestFor: "Keeping bait above cover or at a repeatable depth" },
    ],
    speciesTitle: "Live Bait Is Not One Technique",
    speciesIntro: "Hook size, bait size and depth control should change with the target fish and local forage.",
    speciesGuide: [
      { label: "Striped and hybrid bass", guidance: "Keep lively legal forage at the depth of the school and replace weak bait before it becomes an unnatural presentation." },
      { label: "Crappie", guidance: "Small live minnows can be held just above brush, timber or bridge structure at a repeatable depth." },
      { label: "Flathead catfish", guidance: "Live bait is often the stronger natural-bait starting point for flatheads; use tackle and bait that are legal for the specific water." },
      { label: "Blue and channel catfish", guidance: "Live bait can work, but cut or other natural baits may be more practical depending on species, forage and the source-backed lake pattern." },
    ],
    diagram: {
      eyebrow: "Rigging at a glance",
      title: "Live-Bait Rigging at a Glance",
      intro: "The rig should control depth while allowing the bait to move naturally and remain healthy.",
      rigs: [
        { name: "Suspended", pieces: ["main line", "weight as needed", "leader", "hook + live bait"], note: "Place the bait at the fish's depth rather than simply on bottom." },
        { name: "Bottom", pieces: ["main line", "sliding sinker", "swivel", "leader", "hook + live bait"], note: "Use enough weight to hold position without unnecessarily restricting the bait." },
      ],
    },
    regulationNotes: {
      title: "Texas Live-Bait Rules Come First",
      intro: "Bait species, collection methods and transport rules can change what is legal even when the fishing technique itself is familiar.",
      bullets: [
        "Do not use a Texas game fish, or any part of one, as bait.",
        "Use only bait species and collection methods allowed under current Texas and water-specific rules.",
        "Check live-bait transport and invasive-species restrictions before moving bait from one water body to another.",
        "Some counties, rivers and reservoirs have additional bait restrictions, so the statewide rule is not the only check.",
      ],
      sourceUrl: texasFishingRulesUrl,
      sourceLabel: "Texas Parks & Wildlife — current fishing regulations",
    },
    faq: [
      { question: "Can I use any small fish as live bait in Texas?", answer: "No. Bait species, collection methods and transport are regulated, and game fish or parts of game fish cannot be used as bait. Check the current Outdoor Annual and water-specific rules before collecting or using bait." },
      { question: "Why does bait health matter?", answer: "The main advantage of live bait is natural movement. Weak, oxygen-stressed or temperature-stressed bait loses that advantage and may not stay in the target zone effectively." },
      { question: "How much weight should I use?", answer: "Use enough weight to control depth and position in the existing wind or current while preserving as much natural bait movement as practical." },
    ],
  },
  "cut-bait": {
    selectionTitle: "Choose the Cut-Bait Piece for the Job",
    selectionIntro: "Only start with a fish that is legal to use as bait. Then match the cut, hook placement and overall bait size to the target fish, current and presentation.",
    selectionGuide: [
      { label: "Small chunk", depth: "Bottom / suspended", bestFor: "Channel catfish, lighter current and situations where a compact bait is easier to hold in place" },
      { label: "Steak / cross-section", depth: "Bottom", bestFor: "Blue catfish and heavier presentations where skin helps the bait stay on the hook" },
      { label: "Head section", depth: "Bottom", bestFor: "Larger catfish when the source bait is legal and the hook remains exposed" },
      { label: "Fillet strip", depth: "Bottom / drift", bestFor: "Current or drift presentations where a thinner bait can move while still releasing scent" },
    ],
    speciesTitle: "Blue, Channel and Flathead Catfish Are Different",
    speciesIntro: "Do not collapse every catfish into one bait rule. Their feeding behavior and the most practical natural-bait presentation differ.",
    speciesGuide: [
      { label: "Blue catfish", guidance: "Fresh cut bait is a core starting point on many Texas reservoirs. Focus on forage, channels, flats, current seams and seasonal travel routes rather than soaking bait in featureless water." },
      { label: "Channel catfish", guidance: "Smaller cut pieces can be practical around channels, points, flats and current. Match tackle to the fishery rather than automatically using trophy-catfish gear." },
      { label: "Flathead catfish", guidance: "Flatheads are commonly associated with live-bait presentations and structure. Cut bait can catch them, but do not treat the blue-catfish playbook as interchangeable with flathead fishing." },
    ],
    diagram: {
      eyebrow: "Rigging at a glance",
      title: "Three Useful Cut-Bait Rig Layouts",
      intro: "These simplified layouts show component order, not exact leader lengths or sinker sizes. Adjust weight and tackle to depth, current, cover and target fish.",
      rigs: [
        { name: "Slip-sinker bottom rig", pieces: ["main line", "sliding sinker", "swivel", "leader", "circle hook + cut bait"], note: "A strong general-purpose layout for bottom-oriented catfish." },
        { name: "Three-way current rig", pieces: ["main line", "three-way swivel", "sinker dropper", "leader", "hook + cut bait"], note: "Separates the sinker and bait when current control matters." },
        { name: "Suspended / drift rig", pieces: ["main line", "weight", "leader", "optional lift", "hook + cut bait"], note: "Keeps the bait moving or slightly off bottom when drifting or fishing over soft debris." },
      ],
    },
    regulationNotes: {
      title: "What Cut Bait Is Legal in Texas?",
      intro: "Legality starts with the source fish, not with how it is cut. Check the current Outdoor Annual before keeping or cutting any fish for bait.",
      bullets: [
        "Do not use a Texas game fish, or any part of a game fish, as bait.",
        "Use only legally obtained bait species. Nongame-fish rules, collection devices and possession rules still apply.",
        "Bait transport restrictions are important when moving fish or bait between water bodies.",
        "Some counties and waters have additional bait restrictions; verify the specific water before fishing.",
      ],
      sourceUrl: texasFishingRulesUrl,
      sourceLabel: "Texas Parks & Wildlife — current fishing regulations",
    },
    faq: [
      { question: "What is the best cut bait for Texas catfish?", answer: "Start with fresh, legally obtained local forage or other lawful nongame bait that matches what catfish are feeding on. The best choice varies by reservoir, river and current forage, so legality and local food base come before a universal bait name." },
      { question: "Can I cut up a game fish and use it as bait in Texas?", answer: "No. Texas prohibits using a game fish or any part of a game fish as bait. Always verify the current Outdoor Annual because bait and water-specific rules can change." },
      { question: "Is fresh cut bait better than frozen?", answer: "Fresh bait is the preferred baseline because it preserves scent, oils and texture well, but properly handled frozen bait can still be useful. Replace pieces that become washed out, mushy or no longer stay securely on the hook." },
      { question: "Where should the hook go in cut bait?", answer: "Pass the hook through firm skin or tissue while keeping the hook point and gap exposed. Clear scales away from the point so the bait does not block penetration." },
      { question: "How long should I leave cut bait in one spot?", answer: "There is no statewide timer. If a high-percentage channel edge, flat, current seam or travel route shows no activity, reposition rather than assuming a longer soak will create fish that are not there." },
    ],
  },
};
