/** Distinct editorial field decisions, not field-test claims or live forecasts. */
export type FieldDecision = { situation: string; start: string; adjust: string; caution: string };
export type FieldGuide = { title: string; intro: string; decisions: FieldDecision[] };
export const fishingTechniqueFieldGuide: Record<string, FieldGuide> = {
  "soft-plastics": {
    title: "Match the soft-plastic rig to cover",
    intro: "Choose hook exposure and fall speed for the actual cover rather than defaulting to one rig.",
    decisions: [
      { situation: "Brush, timber or grass", start: "A Texas-rigged worm or creature bait with protected hook point", adjust: "Use the lightest weight that still reaches the target", caution: "Excess weight can bury the hook in debris" },
      { situation: "Clear or pressured water", start: "A finesse worm on a drop shot, shaky head or wacky rig", adjust: "Lengthen pauses and reduce profile before constantly moving", caution: "Exposed hooks snag easily in dense timber" },
      { situation: "Points and ledges", start: "A bottom-contact plastic crawled through changes in bottom texture", adjust: "Change cast angle and fall rate if strikes come on the descent", caution: "Track depth and submerged hazards" },
    ],
  },
  "crankbaits": {
    title: "Choose crankbait depth by actual contact",
    intro: "Published dive ranges are approximations affected by cast length, line and retrieve.",
    decisions: [
      { situation: "Shallow wood or rock", start: "A buoyant squarebill that deflects off cover", adjust: "Pause briefly after contact, then resume", caution: "Repeated dredging through snags is not productive deflection" },
      { situation: "Mid-depth points", start: "A lure rated to reach the target zone", adjust: "Adjust cast angle and retrieve speed first", caution: "Running-depth labels are not sonar measurements" },
      { situation: "Deep ledges", start: "A deeper diver where water depth and route make it practical", adjust: "Change lure or presentation when line angle prevents contact", caution: "Avoid submerged timber and navigation hazards" },
    ],
  },
  "spinnerbaits": {
    title: "Spinnerbait choices by water visibility",
    intro: "Blade vibration, lure size and retrieve speed work together.",
    decisions: [
      { situation: "Stained, windy water", start: "A vibration-forward blade choice run close to cover", adjust: "Slow down until blades turn consistently", caution: "Too slow can stall blades" },
      { situation: "Vegetation and timber", start: "A single-hook spinnerbait cast past the target", adjust: "Raise the tip at contact and let the lure settle", caution: "Grass fouling can feel like a strike" },
      { situation: "Clear, calm water", start: "A compact, subtle spinnerbait profile", adjust: "Make longer casts with less splashing", caution: "Fish can follow without striking" },
    ],
  },
  "topwater": {
    title: "Surface lures by cover and strike behavior",
    intro: "Use surface chop, vegetation and fish response to decide on cadence.",
    decisions: [
      { situation: "Open water activity", start: "A walking bait with a repeatable cadence", adjust: "Pause after a missed strike", caution: "Set the hook on line pressure rather than the splash" },
      { situation: "Matted vegetation", start: "A weedless frog over openings and edges", adjust: "Pause in holes and maintain control of hooked fish", caution: "Treble hooks snag dense grass" },
      { situation: "Calm pockets", start: "A popper worked at isolated targets", adjust: "Alternate subtle pops and extended pauses", caution: "Continuous loud retrieves may move fish without hookups" },
    ],
  },
  "trolling": {
    title: "Build a controlled trolling pass",
    intro: "Use one-variable-at-a-time speed and depth changes, not speculative catch claims.",
    decisions: [
      { situation: "Channel edges", start: "A contour-following route with a manageable legal spread", adjust: "Change lure depth before adding lines", caution: "Watch restricted zones and submerged hazards" },
      { situation: "Suspended fish", start: "A pass informed by sonar and lure running depth", adjust: "Vary speed or line length separately", caution: "Line length does not guarantee exact depth" },
      { situation: "Wind or heavy traffic", start: "A route prioritizing boat handling and visibility", adjust: "Reduce lines or abandon an unsafe pass", caution: "Do not cross busy ramps or swimmers" },
    ],
  },
  "vertical-jigging": {
    title: "Keep the lure in the fish's depth band",
    intro: "Boat position and line angle usually matter as much as lure color.",
    decisions: [
      { situation: "Fish near bottom", start: "Lower to bottom and lift enough to avoid debris", adjust: "Add weight only when drift requires it", caution: "Hard impacts can wedge the lure in brush" },
      { situation: "Suspended schools", start: "Stop at the fish depth rather than dropping to bottom", adjust: "Try short lifts and controlled pauses", caution: "Fast falls move the lure below the school" },
      { situation: "Wind and drift", start: "Position upwind or upstream of the target", adjust: "Correct boat position instead of fishing a long diagonal", caution: "Respect boating and anchoring restrictions" },
    ],
  },
  "jigs-and-minnows": {
    title: "Present crappie baits at the right depth",
    intro: "Jigs and minnows offer different control near timber, brush and suspended schools.",
    decisions: [
      { situation: "Brush piles", start: "Lower a small jig along the edge", adjust: "Change depth before changing lure color", caution: "Aggressive sweeps can snag timber" },
      { situation: "Shallow cover", start: "A light jig or legal minnow under a float", adjust: "Adjust float depth to clear vegetation", caution: "Check bait transport requirements" },
      { situation: "Deep suspended fish", start: "A measured-depth jig presentation", adjust: "Switch to legally sourced minnows if needed", caution: "Deep release can introduce barotrauma concerns" },
    ],
  },
  "live-bait": {
    title: "Put bait legality before rig choice",
    intro: "A familiar bait may have different legal handling rules between Texas waters.",
    decisions: [
      { situation: "Fish near bottom", start: "A bottom rig that avoids dragging through snags", adjust: "Adjust weight and leader for current", caution: "Verify hook and bait-species restrictions" },
      { situation: "Suspended fish", start: "A float or suspended rig set at observed depth", adjust: "Change depth instead of incessant casting", caution: "Protect bait health" },
      { situation: "More than one lake", start: "Check the origin and legal transport status of bait", adjust: "Use compliant purchased bait or artificial lures", caution: "Collected live bait cannot simply be moved between reservoirs" },
    ],
  },
  "cut-bait": {
    title: "Choose cut-bait rigs by current and depth",
    intro: "Texas prohibits using game fish or any part of a game fish as bait.",
    decisions: [
      { situation: "Current on channel edges", start: "A legal cut-bait piece on a controlled bottom rig", adjust: "Use enough weight to hold without sweeping into cover", caution: "Check line abrasion and snag risks" },
      { situation: "Suspended fish", start: "A suspended presentation at measured depth", adjust: "Change depth before automatically increasing bait size", caution: "Do not obstruct navigation" },
      { situation: "Warm conditions or debris", start: "A simple rig that can be retrieved and refreshed", adjust: "Replace bait when needed", caution: "Dispose of unused bait lawfully" },
    ],
  },
};
