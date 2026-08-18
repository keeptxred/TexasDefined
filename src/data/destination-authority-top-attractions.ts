import type { Destination, DestinationAuthorityGuide, DestinationAuthoritySource, DestinationItinerary } from "./types";
import type { TopTexasAttractionSlug } from "./top-texas-attractions";

type AuthoritySeed = Omit<DestinationAuthorityGuide, "sources"> & { sources?: DestinationAuthoritySource[] };

function itinerary(label: string, duration: string, ...steps: string[]): DestinationItinerary {
  if (!steps.length) throw new Error(`Authority itinerary ${label} needs at least one step.`);
  return { label, duration, steps: steps as [string, ...string[]] };
}

const AUTHORITY: Record<TopTexasAttractionSlug, AuthoritySeed> = {
  "the-alamo": {
    whyItMatters: "The Alamo compresses several foundational Texas stories into one place: Spanish mission life, Indigenous history, Mexican Texas, the 1836 battle and later preservation. Its significance is strongest when read as part of San Antonio's larger mission landscape rather than as a stand-alone battle monument.",
    assessment: { recommendedVisit: "2–3 hours; half a day with the exhibit and nearby downtown history", physicalEffort: "Low", weatherExposure: "Mixed indoor/outdoor", planningLevel: "Moderate", familyFit: "Strong for school-age children when paired with exhibits or living-history interpretation", firstTimeValue: "Essential for a first San Antonio history itinerary" },
    itineraries: [
      itinerary("Quick visit", "90 minutes", "Timed Alamo Church entry", "Long Barrack and grounds", "Walk to Alamo Plaza interpretation"),
      itinerary("Half day", "3–4 hours", "Church and grounds", "Alamo Exhibit and collections", "Walk to the River Walk and La Villita"),
      itinerary("Full history day", "6–8 hours", "Start at the Alamo", "Continue through downtown historic sites", "Drive or bike south to San Antonio Missions National Historical Park"),
    ],
  },
  "san-antonio-river-walk": {
    whyItMatters: "The River Walk is both a visitor icon and a piece of civic infrastructure that ties downtown, Museum Reach, Pearl and the mission corridor to the San Antonio River. Its value is in seeing how one waterway links tourism, public space, history, art and restored habitat.",
    assessment: { recommendedVisit: "2–4 hours downtown; a full day if combining multiple reaches", physicalEffort: "Low to moderate", weatherExposure: "Mostly outdoors", planningLevel: "Low", familyFit: "Very strong, with flexible walking, cruises and nearby family attractions", firstTimeValue: "One of the easiest anchors for a first San Antonio visit" },
    itineraries: [
      itinerary("Classic loop", "2 hours", "Walk the downtown river loop", "Cross several bridge levels", "Finish near La Villita or Alamo Plaza"),
      itinerary("Downtown + Museum Reach", "Half day", "Start downtown", "Walk or ride north through Museum Reach", "Eat or explore at Pearl"),
      itinerary("River spine day", "Full day", "Morning on Mission Reach", "Visit one or more missions", "Return downtown for the River Walk after dark"),
    ],
  },
  "space-center-houston": {
    whyItMatters: "Space Center Houston is the public gateway to Johnson Space Center, connecting visitors to the people, vehicles and facilities behind U.S. human spaceflight. Few Texas attractions link a working federal research complex with artifacts and interpretation at this scale.",
    assessment: { recommendedVisit: "4–6 hours; a full day for multiple tram experiences and major galleries", physicalEffort: "Low to moderate", weatherExposure: "Mixed indoor/outdoor", planningLevel: "High", familyFit: "Excellent for school-age children, science-focused families and multigenerational groups", firstTimeValue: "A flagship Houston attraction and one of Texas's strongest science destinations" },
    itineraries: [
      itinerary("Core visit", "3 hours", "Orientation and main galleries", "Independence Plaza", "One available NASA Tram Tour"),
      itinerary("Full museum day", "5–6 hours", "Start with a reserved tram experience", "Explore Starship and human-spaceflight galleries", "Spend time at Independence Plaza and Rocket Park"),
      itinerary("Space Coast day", "Full day", "Arrive for the earliest practical entry", "Complete major galleries and tram experiences", "Add a Clear Lake or Kemah-area evening stop"),
    ],
  },
  "big-bend-national-park": {
    whyItMatters: "Big Bend protects an enormous Chihuahuan Desert landscape where the Rio Grande, desert basins and Chisos Mountains meet. Its remoteness, geology, biodiversity and dark skies make it one of the clearest places to understand the scale and ecological variety of far West Texas.",
    assessment: { recommendedVisit: "At least 2 full days; 3–4 days is much better for the park's major regions", physicalEffort: "Moderate to high", weatherExposure: "Fully outdoors", planningLevel: "High", familyFit: "Strong for outdoors-oriented families who plan around heat, distance and trail difficulty", firstTimeValue: "Essential for a first serious West Texas road trip" },
    itineraries: [
      itinerary("One-day sampler", "Full day", "Chisos Basin overlooks", "Scenic desert drive", "Sunset at a Rio Grande or desert viewpoint"),
      itinerary("Two-day visit", "2 days", "Day 1 in Chisos Basin", "Day 2 along Ross Maxwell Scenic Drive", "Add Santa Elena Canyon if conditions allow"),
      itinerary("Deep park visit", "3–4 days", "Hike in the Chisos", "Explore the western desert and canyon corridor", "Use a separate day for the Rio Grande Village/eastern side"),
    ],
  },
  "sixth-floor-museum-at-dealey-plaza": {
    whyItMatters: "The museum occupies Dealey Plaza's former Texas School Book Depository and interprets the assassination of President John F. Kennedy within the physical setting where the event unfolded. That combination of primary place, documentary evidence and public memory gives it unusual historical weight.",
    assessment: { recommendedVisit: "2–3 hours, plus time outside in Dealey Plaza", physicalEffort: "Low", weatherExposure: "Mostly indoors", planningLevel: "Moderate", familyFit: "Best for older children, teens and adults because of the subject matter", firstTimeValue: "A major Dallas history stop for visitors interested in twentieth-century U.S. history" },
    itineraries: [
      itinerary("Museum focus", "2 hours", "Complete the permanent museum experience", "Pause at the historic windows/context areas", "Walk outside through Dealey Plaza"),
      itinerary("History half day", "3–4 hours", "Museum galleries", "Dealey Plaza and memorial context", "Walk toward the West End historic district"),
      itinerary("Dallas history day", "Full day", "Begin at Dealey Plaza", "Add the nearby Old Red/history area", "Continue to another downtown cultural district"),
    ],
  },
  "fort-worth-stockyards": {
    whyItMatters: "The Stockyards preserve the commercial and cultural legacy of Fort Worth's livestock economy while keeping Western traditions visible through historic buildings, cattle-related interpretation, rodeo, music and an active visitor district.",
    assessment: { recommendedVisit: "3–5 hours; an evening or full day if adding rodeo, music or dining", physicalEffort: "Low to moderate", weatherExposure: "Mixed indoor/outdoor", planningLevel: "Moderate", familyFit: "Very strong, especially for visitors interested in Western culture", firstTimeValue: "One of the clearest first-stop expressions of Fort Worth's identity" },
    itineraries: [
      itinerary("Stockyards sampler", "2 hours", "Walk Exchange Avenue", "See the historic district and cattle-drive corridor", "Visit one museum, shop or interpretive stop"),
      itinerary("Half day", "4 hours", "Historic district walk", "Time the visit around a scheduled cattle drive", "Add lunch and a Stockyards attraction"),
      itinerary("Western day + night", "Full day", "Explore the district in daylight", "Add museums or family attractions", "Stay for rodeo, live music or dinner"),
    ],
  },
  "texas-state-capitol": {
    whyItMatters: "The Texas State Capitol is both a working seat of government and one of the state's most important civic buildings. Its architecture, grounds, legislative chambers and monuments make it a direct introduction to Texas government and public memory.",
    assessment: { recommendedVisit: "1.5–3 hours", physicalEffort: "Low", weatherExposure: "Mixed indoor/outdoor", planningLevel: "Low", familyFit: "Strong for school-age visitors and anyone studying Texas government", firstTimeValue: "A high-value Austin stop because it combines architecture, history and active government" },
    itineraries: [
      itinerary("Capitol essentials", "90 minutes", "Walk the rotunda and principal public spaces", "See legislative chambers when accessible", "Circle the south grounds"),
      itinerary("Civic half day", "3 hours", "Capitol interior", "Capitol grounds and monuments", "Continue to the Bullock Texas State History Museum"),
      itinerary("Texas history day", "Full day", "Start at the Capitol", "Visit the Bullock Museum", "Finish with another downtown or university-area history stop"),
    ],
  },
  "guadalupe-mountains-national-park": {
    whyItMatters: "Guadalupe Mountains National Park protects the highest point in Texas, extensive Chihuahuan Desert habitat and an exposed fossil reef system that records an ancient marine environment. It is one of the state's strongest geology-and-hiking destinations.",
    assessment: { recommendedVisit: "1–2 full days; longer for major hikes", physicalEffort: "High", weatherExposure: "Fully outdoors", planningLevel: "High", familyFit: "Best for active families comfortable with desert conditions and trail planning", firstTimeValue: "A major West Texas destination for hikers and geology-focused travelers" },
    itineraries: [
      itinerary("Scenic introduction", "Half day", "Visitor-center orientation", "Short McKittrick or Pine Springs-area walk", "Sunset or late-day mountain views"),
      itinerary("Hiking day", "Full day", "Choose one major trail suited to conditions", "Carry ample water and weather layers", "Return before dark unless prepared for backcountry travel"),
      itinerary("Two-park trip", "2 days", "Spend a full day in Guadalupe Mountains", "Use a second day for another park trail or scenic area", "Connect with nearby Carlsbad Caverns on a broader regional itinerary"),
    ],
  },
  "palo-duro-canyon-state-park": {
    whyItMatters: "Palo Duro Canyon reveals a dramatic cut through the Texas Panhandle plains, exposing colorful geology and a landscape tied to Indigenous history, ranching and the region's modern recreation culture. Its road-accessible canyon floor makes large-scale geology unusually approachable.",
    assessment: { recommendedVisit: "4–6 hours; a full day for hiking and evening programming", physicalEffort: "Moderate", weatherExposure: "Fully outdoors", planningLevel: "Moderate", familyFit: "Strong when trail difficulty and heat are matched to the group", firstTimeValue: "The signature natural-landscape stop in the Texas Panhandle" },
    itineraries: [
      itinerary("Canyon sampler", "2–3 hours", "Stop at rim viewpoints", "Drive the canyon road", "Take a short trail near the canyon floor"),
      itinerary("Active half day", "4–5 hours", "Early scenic overlooks", "Complete one moderate trail", "Picnic or stop at a canyon-floor area"),
      itinerary("Full canyon day", "Full day", "Hike early", "Explore scenic road stops during midday", "Stay for sunset or scheduled evening programming"),
    ],
  },
  "padre-island-national-seashore": {
    whyItMatters: "Padre Island National Seashore protects a long undeveloped barrier-island environment on the Gulf of Mexico, including beaches, dunes, hypersaline lagoon habitat and globally important sea-turtle conservation work.",
    assessment: { recommendedVisit: "Half a day to a full day; longer for camping or remote beach travel", physicalEffort: "Moderate", weatherExposure: "Fully outdoors", planningLevel: "High", familyFit: "Strong for beach and wildlife-focused families who prepare for sun, wind and changing coastal conditions", firstTimeValue: "One of Texas's most important undeveloped Gulf Coast experiences" },
    itineraries: [
      itinerary("Beach + visitor center", "3 hours", "Start with current conditions at the visitor center", "Walk the beach and dunes near developed access", "Watch for wildlife and shorebird activity"),
      itinerary("Coastal day", "Full day", "Morning beach walk", "Explore both Gulf and Laguna Madre context", "Stay for late-day light and cooler temperatures"),
      itinerary("Remote-island plan", "Full day or overnight", "Check tides, weather and driving conditions", "Travel only as far down-island as vehicle and conditions safely allow", "Carry recovery, water and communication supplies appropriate to remoteness"),
    ],
  },
  "san-antonio-missions-national-historical-park": {
    whyItMatters: "The park preserves four Spanish colonial missions and a living cultural landscape linked to Indigenous communities, irrigation, agriculture and Catholic parish life. Together with the Alamo, the mission system forms Texas's UNESCO World Heritage property.",
    assessment: { recommendedVisit: "4–6 hours for multiple missions; a full day by bike or with deeper interpretation", physicalEffort: "Low to moderate", weatherExposure: "Mostly outdoors", planningLevel: "Moderate", familyFit: "Strong for families interested in history, architecture and outdoor exploration", firstTimeValue: "Essential context for understanding San Antonio beyond the downtown Alamo story" },
    itineraries: [
      itinerary("Mission San José focus", "2 hours", "Begin at the park visitor center", "Explore Mission San José", "Use exhibits to orient the larger mission system"),
      itinerary("Mission corridor", "Half day", "Visit San José", "Continue to Concepción", "Add San Juan or Espada as time allows"),
      itinerary("Full UNESCO landscape", "Full day", "Start with the Alamo downtown", "Travel the Mission Reach corridor", "Visit all four NPS missions with breaks between sites"),
    ],
  },
  "moody-gardens": {
    whyItMatters: "Moody Gardens combines aquarium, rainforest, science and conservation experiences in one Galveston campus. Its value for a Texas trip is breadth: it gives families a weather-resistant way to explore Gulf, rainforest and science themes alongside a coastal visit.",
    assessment: { recommendedVisit: "4–6 hours; a full day for multiple major attractions", physicalEffort: "Low to moderate", weatherExposure: "Mostly indoors", planningLevel: "Moderate", familyFit: "Excellent for families and multigenerational groups", firstTimeValue: "A strong Galveston anchor when weather or younger travelers favor structured attractions" },
    itineraries: [
      itinerary("Pyramid pair", "3 hours", "Choose two major pyramid attractions", "Allow transition time between exhibits", "Finish with a short waterfront or grounds walk"),
      itinerary("Family half day", "4–5 hours", "Aquarium Pyramid", "Rainforest Pyramid", "Add one rotating or seasonal attraction"),
      itinerary("Galveston day", "Full day", "Morning at Moody Gardens", "Lunch on or near the island's west/central side", "Continue to the seawall, Strand or beach"),
    ],
  },
  "galveston-island-historic-pleasure-pier": {
    whyItMatters: "The Pleasure Pier carries forward Galveston's long tradition as a Gulf Coast amusement destination, putting rides and midway attractions directly over the water on the seawall. It is less a historical museum than a living continuation of the island's recreation identity.",
    assessment: { recommendedVisit: "2–4 hours, especially late afternoon into evening", physicalEffort: "Low to moderate", weatherExposure: "Fully outdoors", planningLevel: "Moderate", familyFit: "Very strong for ride-focused families and teens", firstTimeValue: "A recognizable Galveston entertainment stop that pairs naturally with the seawall" },
    itineraries: [
      itinerary("Pier sampler", "2 hours", "Walk the pier", "Choose priority rides", "Finish with Gulf views from the end of the pier"),
      itinerary("Seawall half day", "4 hours", "Beach or seawall walk", "Pleasure Pier rides", "Dinner nearby after sunset"),
      itinerary("Galveston classic day", "Full day", "Morning in the Strand or at a museum", "Afternoon beach time", "Pleasure Pier from late afternoon into evening"),
    ],
  },
  "dallas-arboretum-and-botanical-garden": {
    whyItMatters: "The Dallas Arboretum pairs formal gardens, seasonal horticulture and White Rock Lake views in a major urban landscape. Its seasonal displays make it one of the state's strongest examples of horticulture as a repeat-visit cultural attraction.",
    assessment: { recommendedVisit: "2–4 hours", physicalEffort: "Low to moderate", weatherExposure: "Mostly outdoors", planningLevel: "Moderate", familyFit: "Very strong, especially with the children's garden and seasonal programming", firstTimeValue: "A high-value Dallas stop for gardens, photography and relaxed outdoor time" },
    itineraries: [
      itinerary("Garden highlights", "2 hours", "Walk the principal display gardens", "Pause at lake-view areas", "Choose one seasonal feature"),
      itinerary("Family half day", "4 hours", "Main garden loop", "Children's garden", "Picnic or café break"),
      itinerary("East Dallas day", "Full day", "Morning at the Arboretum", "Walk or drive around White Rock Lake", "Continue to a nearby East Dallas dining district"),
    ],
  },
  "houston-museum-of-natural-science": {
    whyItMatters: "HMNS is one of Texas's broadest science museums, using major permanent halls, special exhibitions, astronomy and natural-history collections to make complex subjects accessible in a single campus beside Hermann Park.",
    assessment: { recommendedVisit: "3–5 hours; longer with special exhibitions or planetarium", physicalEffort: "Low", weatherExposure: "Mostly indoors", planningLevel: "Moderate", familyFit: "Excellent for school-age children and multigenerational groups", firstTimeValue: "One of Houston's strongest all-weather family and science attractions" },
    itineraries: [
      itinerary("Museum core", "3 hours", "Choose two major permanent halls", "Add one high-priority gallery", "Leave buffer for a special exhibition if ticketed"),
      itinerary("Science half day", "4–5 hours", "Permanent halls", "Planetarium or special exhibition", "Walk into Hermann Park afterward"),
      itinerary("Museum District day", "Full day", "Morning at HMNS", "Lunch in or near Hermann Park", "Continue to the Houston Zoo or another Museum District institution"),
    ],
  },
  "cadillac-ranch": {
    whyItMatters: "Cadillac Ranch transformed a line of buried automobiles beside Route 66 into a durable piece of participatory public art. Its significance comes from the combination of roadside culture, changing graffiti layers and the mythology of Panhandle road travel.",
    assessment: { recommendedVisit: "30–60 minutes", physicalEffort: "Low", weatherExposure: "Fully outdoors", planningLevel: "Low", familyFit: "Good for road-tripping families; the field can be muddy or exposed", firstTimeValue: "A short but iconic Amarillo/Route 66 stop" },
    itineraries: [
      itinerary("Roadside stop", "30 minutes", "Walk from parking to the installation", "View the cars from multiple angles", "Return with all trash and paint materials removed"),
      itinerary("Route 66 hour", "60–90 minutes", "Visit Cadillac Ranch", "Photograph the changing paint layers", "Continue to Amarillo's historic Route 66 district"),
      itinerary("Amarillo day", "Full day", "Cadillac Ranch early or late", "Explore Route 66 and downtown Amarillo", "Add Palo Duro Canyon if the schedule and daylight allow"),
    ],
  },
  "natural-bridge-caverns": {
    whyItMatters: "Natural Bridge Caverns exposes a large Hill Country cave system through developed tours while also interpreting karst geology and groundwater. It is one of the most accessible ways for general visitors to experience Texas's limestone underground landscape.",
    assessment: { recommendedVisit: "3–5 hours depending on tour and surface attractions", physicalEffort: "Moderate", weatherExposure: "Mixed indoor/outdoor", planningLevel: "High", familyFit: "Very strong, though cave stairs and tour length should be matched to the group", firstTimeValue: "A signature San Antonio-area natural attraction" },
    itineraries: [
      itinerary("Cavern essentials", "2 hours", "Arrive before tour time", "Complete one primary cavern tour", "Allow time for surface orientation afterward"),
      itinerary("Half day", "4 hours", "Main cavern tour", "Add one surface attraction", "Take a meal or rest break before leaving"),
      itinerary("North San Antonio day", "Full day", "Natural Bridge Caverns", "Add Natural Bridge Wildlife Ranch", "Return toward San Antonio with an evening stop near the city"),
    ],
  },
  "hamilton-pool-preserve": {
    whyItMatters: "Hamilton Pool is a collapsed limestone grotto and creek system that illustrates Hill Country karst geology, spring-fed habitat and the challenge of managing a fragile natural site under heavy visitor demand.",
    assessment: { recommendedVisit: "2–3 hours", physicalEffort: "Moderate", weatherExposure: "Fully outdoors", planningLevel: "High", familyFit: "Good for families comfortable with an uneven trail and changing swimming conditions", firstTimeValue: "A memorable Hill Country nature stop when reservations and conditions align" },
    itineraries: [
      itinerary("Preserve visit", "2 hours", "Check current reservation and swimming status", "Hike to the pool area", "Take time for the canyon and creek setting, not only swimming"),
      itinerary("Hill Country half day", "3–4 hours", "Hamilton Pool reservation", "Short scenic drive through the Pedernales area", "Stop in Dripping Springs afterward"),
      itinerary("West Austin nature day", "Full day", "Morning at Hamilton Pool", "Lunch in Dripping Springs", "Add another nearby preserve, park or scenic stop"),
    ],
  },
  "bullock-texas-state-history-museum": {
    whyItMatters: "The Bullock Museum gives visitors a statewide narrative across Indigenous history, colonization, revolution, statehood, industry, culture and modern Texas. Its location beside the Capitol makes it especially useful for connecting political institutions with a broader historical story.",
    assessment: { recommendedVisit: "2–4 hours", physicalEffort: "Low", weatherExposure: "Mostly indoors", planningLevel: "Low", familyFit: "Strong for school-age children and history-focused families", firstTimeValue: "One of the best single-building introductions to Texas history" },
    itineraries: [
      itinerary("Museum highlights", "2 hours", "Work through the core Texas history galleries", "Choose one area for deeper reading", "Finish with any current special exhibition"),
      itinerary("History half day", "4 hours", "Bullock Museum", "Walk to the Capitol grounds", "Tour the Capitol interior if open"),
      itinerary("Austin civic day", "Full day", "Start at the Capitol", "Spend midday at the Bullock", "Continue to a university or downtown history/culture stop"),
    ],
  },
  "houston-zoo": {
    whyItMatters: "Houston Zoo combines animal care, conservation education and major immersive habitats inside Hermann Park. Its location within the Museum District makes it unusually easy to pair wildlife-focused learning with science, parks and other cultural institutions.",
    assessment: { recommendedVisit: "3–5 hours", physicalEffort: "Moderate", weatherExposure: "Mostly outdoors", planningLevel: "Moderate", familyFit: "Excellent for families and multigenerational groups", firstTimeValue: "A major Houston family attraction with strong Museum District pairing value" },
    itineraries: [
      itinerary("Zoo highlights", "3 hours", "Arrive early", "Prioritize two or three major habitat areas", "Use shaded/indoor spaces during the warmest period"),
      itinerary("Family half day", "4–5 hours", "Main habitat loop", "Children's or interactive areas", "Break in Hermann Park before leaving"),
      itinerary("Museum District day", "Full day", "Morning at Houston Zoo", "Lunch in Hermann Park", "Afternoon at HMNS or another nearby museum"),
    ],
  },
  "fredericksburg-historic-district": {
    whyItMatters: "Fredericksburg's historic core preserves the street pattern, architecture and cultural imprint of a German-Texan community that became one of the Hill Country's defining towns. The district works best as a living townscape rather than a single monument.",
    assessment: { recommendedVisit: "3–5 hours; overnight for museums, dining and nearby Hill Country stops", physicalEffort: "Low to moderate", weatherExposure: "Mixed indoor/outdoor", planningLevel: "Moderate", familyFit: "Good, with stronger appeal for older children and adults unless paired with outdoor stops", firstTimeValue: "A core Hill Country town for history, food and small-town streetscape" },
    itineraries: [
      itinerary("Main Street walk", "2 hours", "Walk the historic commercial core", "Stop at Marktplatz", "Choose one museum, church or historic building"),
      itinerary("Historic half day", "4 hours", "Main Street and Marktplatz", "Pioneer-era or local-history interpretation", "Lunch or early dinner in the district"),
      itinerary("Fredericksburg overnight", "1–2 days", "Historic district and museums", "Evening dining in town", "Use the next morning for Enchanted Rock, LBJ country or another Hill Country side trip"),
    ],
  },
  "inner-space-cavern": {
    whyItMatters: "Inner Space Cavern gives Central Texas visitors a direct look at the limestone karst beneath the I-35 corridor near Georgetown. Its discovery during highway construction is also a useful reminder that major cave systems can sit underneath rapidly urbanizing landscapes.",
    assessment: { recommendedVisit: "2–3 hours", physicalEffort: "Moderate", weatherExposure: "Mixed indoor/outdoor", planningLevel: "Moderate", familyFit: "Very strong for families who can manage cave walking and stairs", firstTimeValue: "One of the easiest cave experiences to add to an Austin-area trip" },
    itineraries: [
      itinerary("Cave tour", "2 hours", "Arrive ahead of tour time", "Complete the primary cavern route", "Use the surface area for a short break afterward"),
      itinerary("Georgetown half day", "4 hours", "Inner Space Cavern", "Lunch in Georgetown", "Walk the courthouse square or nearby trail"),
      itinerary("North Austin day", "Full day", "Morning cave tour", "Explore Georgetown's historic center", "Add a nearby park or outlet/entertainment stop depending on the group"),
    ],
  },
  "natural-bridge-wildlife-ranch": {
    whyItMatters: "Natural Bridge Wildlife Ranch uses a drive-through format to bring visitors close to large grazing animals and other species on a Hill Country property. Its strongest trip value comes from pairing animal encounters with the neighboring cavern landscape.",
    assessment: { recommendedVisit: "2–3 hours", physicalEffort: "Low", weatherExposure: "Mixed indoor/outdoor", planningLevel: "Moderate", familyFit: "Excellent for families with younger children", firstTimeValue: "A high-impact family stop north of San Antonio, especially when combined with Natural Bridge Caverns" },
    itineraries: [
      itinerary("Drive-through visit", "2 hours", "Review animal-feeding and vehicle rules", "Complete the drive-through route slowly", "Use walkable areas or facilities afterward"),
      itinerary("Natural Bridge half day", "4–5 hours", "Wildlife Ranch", "Meal/rest break", "Add a shorter Natural Bridge Caverns experience if schedules align"),
      itinerary("Family day", "Full day", "Morning wildlife drive", "Natural Bridge Caverns after lunch", "Return to San Antonio before evening traffic if practical"),
    ],
  },
  "lady-bird-johnson-wildflower-center": {
    whyItMatters: "The Wildflower Center connects native Texas plants, conservation research, landscape design and public gardens. It is especially valuable because the displays are not just ornamental—they demonstrate how native ecosystems can shape resilient Texas landscapes.",
    assessment: { recommendedVisit: "2–4 hours", physicalEffort: "Low to moderate", weatherExposure: "Mostly outdoors", planningLevel: "Low", familyFit: "Strong for families who enjoy gardens, nature play and short walks", firstTimeValue: "A distinctive Austin stop for native plants, ecology and seasonal color" },
    itineraries: [
      itinerary("Garden highlights", "2 hours", "Main garden paths", "Observation or overlook areas", "One trail or seasonal display"),
      itinerary("Nature half day", "4 hours", "Gardens", "Family/nature-play areas", "Longer trail or arboretum loop"),
      itinerary("South Austin outdoors day", "Full day", "Morning at the Wildflower Center", "Lunch in South Austin", "Add a nearby greenbelt, park or Hill Country drive"),
    ],
  },
  "gruene-historic-district": {
    whyItMatters: "Gruene preserves a compact nineteenth-century settlement that grew around agriculture and the Guadalupe River, then reinvented itself around music, dining, shopping and historic tourism. Gruene Hall gives the district an unusually strong connection between built heritage and living Texas music culture.",
    assessment: { recommendedVisit: "3–5 hours; evening is especially valuable when adding live music or dinner", physicalEffort: "Low", weatherExposure: "Mixed indoor/outdoor", planningLevel: "Moderate", familyFit: "Strong during the day; evening fit depends on venue and event", firstTimeValue: "One of the Hill Country's best combinations of historic streetscape, river culture and live music" },
    itineraries: [
      itinerary("Historic district walk", "2 hours", "Walk the core historic buildings", "Browse shops and river-facing areas", "See Gruene Hall from inside if access/event conditions allow"),
      itinerary("Afternoon + dinner", "4–5 hours", "Historic district exploration", "Guadalupe River overlook or nearby river activity", "Dinner and early-evening music"),
      itinerary("New Braunfels day", "Full day", "Morning in New Braunfels or on the river", "Afternoon in Gruene", "Stay into the evening for dining or a scheduled performance"),
    ],
  },
};

function dedupeSources(sources: DestinationAuthoritySource[]): DestinationAuthoritySource[] {
  const seen = new Set<string>();
  return sources.filter((source) => {
    if (!source.url || seen.has(source.url)) return false;
    seen.add(source.url);
    return true;
  });
}

export function applyTopAttractionAuthority(destination: Destination): Destination {
  const seed = AUTHORITY[destination.slug as TopTexasAttractionSlug];
  if (!seed) return destination;
  const automaticSources: DestinationAuthoritySource[] = [];
  if (destination.officialUrl) automaticSources.push({ label: `${destination.name} official visitor information`, url: destination.officialUrl, scope: "Primary source for current visitor access, operating guidance and attraction information." });
  if (destination.reservationUrl && destination.reservationUrl !== destination.officialUrl) automaticSources.push({ label: `${destination.name} official reservations or tickets`, url: destination.reservationUrl, scope: "Primary source for current reservation or ticket availability where applicable." });
  return { ...destination, authorityGuide: { ...seed, sources: dedupeSources([...automaticSources, ...(seed.sources ?? [])]) } };
}

export function hasCompleteTopAttractionAuthority(destination: Destination): boolean {
  const guide = destination.authorityGuide;
  return Boolean(
    guide
      && guide.whyItMatters.length >= 120
      && guide.assessment.recommendedVisit
      && guide.itineraries.length === 3
      && guide.itineraries.every((item) => item.steps.length >= 3)
      && guide.sources.length >= 1,
  );
}
