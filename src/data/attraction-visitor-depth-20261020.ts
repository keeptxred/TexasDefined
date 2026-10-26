import type { Destination, DestinationAuthorityGuide } from "./types";

/**
 * October 2026: source-backed visitor decisions that older generic
 * curation did not explain. Preserve established canonical records, licensed
 * hero images and existing Top-25 authority data. Primary source links live
 * alongside the expanded non-Top-25 authority guides.
 */
const EXTRA_CONTEXT: Record<string, string[]> = {
  "natural-bridge-caverns": [
    "Choosing a cavern tour: Discovery and Hidden Wonders are distinct ticketed experiences, not interchangeable entrances to the same walk. Compare the operator's current distance, stair and physical-effort descriptions before deciding whether a two-tour package is practical for your group.",
    "Cave conservation matters as much as photography. Remain with the guide, stay on developed surfaces, avoid touching mineral formations and allow extra time to move safely on humid, potentially slippery stairs. The nearby Wildlife Ranch is a different operator and requires separate admission."
  ],
  "hamilton-pool-preserve": [
    "A Hamilton Pool reservation is for a preserve visit, not an assurance of swimming, waterfall flow or access to the water's edge. Travis County may restrict portions of the trail or swimming because of bacteria, rockfall hazards, water level or habitat protection. Check its official status on the day of your reservation.",
    "Plan for a natural, uneven descent and a climb back out rather than a poolside parking experience. Bring drinking water and footwear appropriate for rocky surfaces. Keep alternative Hill Country stops in reserve if the county restricts the main grotto."
  ],
  "cadillac-ranch": [
    "Cadillac Ranch is an evolving outdoor artwork, not a staffed museum with timed admission. The images a visitor sees on arrival can look entirely different from older photographs because layers of paint continually change the ten vehicles.",
    "A responsible Route 66 stop begins at the designated visitor access, not the Interstate 40 shoulder. Stay out of farm areas beyond the visitor route, carry paint materials and empty cans away, and treat wind, lightning and muddy ground as reasons to shorten the visit."
  ],
  "padre-island-national-seashore": [
    "Plan the beach by vehicle capability. The developed Malaquite area is a different trip from driving remote stretches of beach. South Beach access varies with tides, soft sand and storms, and conditions can change within hours. Ask NPS about current beach-driving conditions before proceeding beyond easy turnaround points.",
    "Marine wildlife comes first: leave marked sea-turtle nests, nesting birds and stranded animals undisturbed, and follow ranger directions during any permitted turtle-release events. Laguna Madre access, Gulf beach use, camping and remote driving require different preparation rather than one universal beach checklist."
  ],
  "space-center-houston": [
    "Separate admission from NASA tour availability. Space Center Houston is the visitor center, while Johnson Space Center is a working federal facility; specific tram itineraries, security restrictions and reserved slots can change. Check the operator's current tour lineup before promising a visitor access to Historic Mission Control or any particular NASA facility.",
    "A strong first visit prioritizes one carefully chosen tram experience, Independence Plaza and the spacecraft galleries. Pairing a full space-center day with major downtown Houston museums often creates unnecessary driving; Clear Lake or Kemah make more realistic nearby additions."
  ],
  "moody-gardens": [
    "Ticket choice should follow the actual attractions operating that date. The Aquarium and Rainforest Pyramids offer different environments, and seasonal activities, theaters, Discovery Museum programming and special exhibitions may be separately ticketed or unavailable. Verify the daily schedule and any renovation notice before purchasing a combination package.",
    "For families with limited time, two pyramids and lunch are usually a more satisfying core than trying to complete every ticketed offering. Moody Gardens sits on the western side of Galveston, so reserve a separate block for the Strand, seawall or beach rather than assuming those stops are walkable from the pyramids."
  ],
  "enchanted-rock-state-natural-area": [
    "There are two distinct ways to hike here: the steep 0.8-mile Summit Trail on exposed granite and longer lower-elevation trails, including a newer backcountry area. TPWD reports nearly 22 miles of trails across the park. Choose your trail and download the current park map before arriving; the summit can close in wet weather even when other trails remain open.",
    "The summit's shallow vernal pools contain sensitive plant and animal life; do not step into pools or disturb vegetation. Pets are not permitted on elevated areas, including Summit Trail. They are restricted to approved lower trails and developed areas; no swimming or bicycles on park trails.",
    "Day-use entry is capacity controlled, especially on weekends and holidays. Reserve passes in advance, confirm trail status and carry water. Walk-in and primitive campsites have different requirements and are not equivalent to RV-accessible camping. The best companion stops are Fredericksburg and Llano rather than assuming services exist at every trailhead."
  ],
  "fossil-rim-wildlife-center": [
    "Fossil Rim's self-drive safari follows roughly 7.2 miles through large wildlife pastures and ordinarily requires at least 90 minutes; animal activity, traffic and feeding opportunities can lengthen the visit. Reservations are recommended and same-day gate admission is not guaranteed.",
    "No pets are permitted on the property, and visitors must not bring their own food for animals. Follow the operator's current feeding, windows and vehicle rules and never promise a giraffe encounter or sightings of every species. The Overlook offers a planned break for the café, shop and educational activities.",
    "Choose a self-drive visit for flexibility or reserve a guided experience for interpretation; the ticket products, age restrictions and availability differ. Conservation breeding and species stewardship are central to Fossil Rim's work, not an incidental supplement to the safari. Morning visits can improve comfort and visibility during hot weather."
  ],
  "texas-state-aquarium": [
    "Build a route around specific habitats rather than a generic 'aquarium day': Dolphin Bay, Tortuga Cay, Stingray Lagoon, Otter Creek and the Gulf/Caribbean collections offer different kinds of observation. Check the current presentation schedule before deciding what to see first; live animal programming can change.",
    "The Center for Wildlife Rescue treats and rehabilitates coastal wildlife but is not always a guest-accessible exhibit. Access and maintenance restrictions can change; do not advertise a wildlife-rescue center tour without current operator confirmation.",
    "The aquarium currently uses cashless transactions; confirm its latest payment policy before visiting. Seasonal splash-area operation, presentation schedules and any encounter add-ons should be confirmed directly. On Corpus Christi's North Beach, the USS Lexington is a strong complementary stop, while a Padre Island beach visit deserves a separate driving and weather block."
  ]
};

const GUIDES: Record<string, DestinationAuthorityGuide> = {
  "enchanted-rock-state-natural-area": {
    whyItMatters: "Enchanted Rock connects an ancient granite batholith, fragile vernal-pool habitats, Indigenous cultural history, hiking, climbing and dark-sky conservation. It is an outdoor natural area with limited capacity, not simply a summit photo stop.",
    assessment: { recommendedVisit: "2–4 hours for a summit visit; a full day for lower trails", physicalEffort: "Moderate to high", weatherExposure: "Fully outdoors", planningLevel: "High", familyFit: "Good for prepared families; exposed granite, heat and steep slopes require careful planning", firstTimeValue: "A distinctive Hill Country geological landscape near Fredericksburg and Llano" },
    itineraries: [
      { label: "Summit focus", duration: "2–3 hours", steps: ["Confirm reserved entry and Summit Trail status", "Ascend the exposed granite with water and traction footwear", "Descend before heat and weather become a problem"] },
      { label: "Trail day", duration: "Half day", steps: ["Begin with a trail map at headquarters", "Hike Summit Trail if conditions permit", "Explore an approved lower trail without disturbing vernal pools"] },
      { label: "Hill Country weekend", duration: "2 days", steps: ["Reserve the park visit or campsite", "Give the natural area a morning hiking block", "Explore Fredericksburg or Llano and a scenic road the next day"] }
    ],
    sources: [
      { label: "Texas Parks and Wildlife — official park visitor guide", url: "https://tpwd.texas.gov/state-parks/enchanted-rock", scope: "Day-use entry, closure policies, recreation rules and official park information" },
      { label: "Texas Parks and Wildlife — trails and pet restrictions", url: "https://tpwd.texas.gov/state-parks/enchanted-rock/trails-info", scope: "Summit Trail length, difficulty and restricted habitats and animals" },
      { label: "Texas Parks and Wildlife — camping", url: "https://tpwd.texas.gov/state-parks/enchanted-rock/fees-facilities/campsites", scope: "Walk-in versus primitive campsites and reservation types" }
    ]
  },
  "fossil-rim-wildlife-center": {
    whyItMatters: "Fossil Rim links a large naturalistic wildlife landscape with an active nonprofit conservation, breeding and education mission. Its open pastures create a meaningfully different trip from an urban zoo or petting farm.",
    assessment: { recommendedVisit: "2–4 hours for self-drive and Overlook; more for a booked guided program", physicalEffort: "Low", weatherExposure: "Mixed indoor/outdoor", planningLevel: "High", familyFit: "Strong for wildlife-focused families who follow vehicle and feeding rules", firstTimeValue: "One of the more distinctive conservation-focused visitor experiences in North Central Texas" },
    itineraries: [
      { label: "Self-drive", duration: "2 hours or more", steps: ["Reserve the self-drive admission in advance", "Follow animal welfare and vehicle instructions through the drive", "Stop at the Overlook where operating"] },
      { label: "Conservation half day", duration: "Half day", steps: ["Arrive early in hot weather", "Complete the wildlife route without rushing", "Spend time with conservation exhibits and educational material"] },
      { label: "Glen Rose weekend", duration: "2 days", steps: ["Choose self-drive or a reserved guided experience", "Explore Glen Rose after the safari", "Use a separate day for Dinosaur Valley State Park"] }
    ],
    sources: [
      { label: "Fossil Rim — self-drive admissions and rules", url: "https://fossilrim.org/tickets-selfdrive/", scope: "Route distance, admission availability, no-pets and feeding policies" },
      { label: "Fossil Rim — official conservation organization", url: "https://fossilrim.org/", scope: "Conservation mission, operating programs and current visitor offerings" }
    ]
  },
  "texas-state-aquarium": {
    whyItMatters: "The Texas State Aquarium interprets Gulf and Caribbean ecosystems on the Corpus Christi waterfront and supports coastal wildlife rescue, rehabilitation, education and conservation beyond its public galleries.",
    assessment: { recommendedVisit: "3–5 hours, longer when attending multiple presentations", physicalEffort: "Low to moderate", weatherExposure: "Mostly indoors", planningLevel: "Moderate", familyFit: "Excellent for multigenerational and marine-life-focused visits", firstTimeValue: "A flagship Corpus Christi family stop with direct Gulf Coast educational context" },
    itineraries: [
      { label: "Core galleries", duration: "2–3 hours", steps: ["Check today's animal-presentation schedule", "Tour Caribbean and Gulf habitats", "Choose one presentation before leaving"] },
      { label: "Marine-life day", duration: "4–5 hours", steps: ["Start with the day's schedule and map", "Explore Dolphin Bay, Tortuga Cay and other habitats", "Allow breaks for presentations and seasonal activities"] },
      { label: "North Beach day", duration: "Full day", steps: ["Visit the aquarium during its first operating block", "Take a lunch break on North Beach", "Continue to USS Lexington or waterfront attractions"] }
    ],
    sources: [
      { label: "Texas State Aquarium — plan your visit", url: "https://www.texasstateaquarium.org/plan-your-visit/", scope: "Hours, visitor policies, cashless payments, live schedules and seasonal splash area" },
      { label: "Texas State Aquarium — exhibits", url: "https://www.texasstateaquarium.org/things-to-do/exhibits/", scope: "Galleries, animals and thematic habitats" },
      { label: "Texas State Aquarium — wildlife rescue", url: "https://www.texasstateaquarium.org/wildlife-rescue/", scope: "Coastal rescue, rehabilitation and conservation program" },
      { label: "Texas State Aquarium — rescue facility visitor status", url: "https://www.texasstateaquarium.org/programs/conservation/wildlife-rescue-center/", scope: "Temporary guest-access restrictions at the rescue center" }
    ]
  }
};

export const ATTRACTION_VISITOR_DEPTH_SLUGS = Object.keys(EXTRA_CONTEXT);

/**
 * Adds verified-source editorial context without overwriting the latest
 * status, place metadata, season, reservations, operator advisories or
 * editorial review timestamp applied by other current curators.
 */
export function applyAttractionVisitorDepth(destination: Destination): Destination {
  const paragraphs = EXTRA_CONTEXT[destination.slug];
  if (!paragraphs) return destination;
  const missing = paragraphs.filter((paragraph) => !destination.body.includes(paragraph));
  const guide = GUIDES[destination.slug];
  return {
    ...destination,
    body: missing.length ? [...destination.body, ...missing] : destination.body,
    ...(guide && !destination.authorityGuide ? { authorityGuide: guide } : {}),
  };
}
