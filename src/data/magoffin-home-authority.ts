import type { Destination, DestinationAreaGuide, DestinationAuthorityGuide } from "./types";

// Magoffin Home's current operator notice supersedes older standard-tour inventory.
// Keep the visit status, original street addresses and editorial itinerary together,
// so single-destination fallback and the full Explore catalog cannot diverge.
// Verified against THC's live visitor/home/history pages on October 19, 2026.
const OFFICIAL = "https://thc.texas.gov/historic-sites/magoffin-home";
const HISTORY = "https://thc.texas.gov/state-historic-sites/magoffin-home/magoffin-home-history";
const VISITING = "https://thc.texas.gov/state-historic-sites/magoffin-home/plan-your-visit-magoffin-home";
const JOSE_SIERRA = "https://thc.texas.gov/blog/stories-el-pasos-magoffin-family-jose-sierra";
const WALKING_TOUR = "https://thc.texas.gov/sites/default/files/2025-01/Magoffin_walking_tour_new.pdf";

const authorityGuide: DestinationAuthorityGuide = {
  whyItMatters: "One of El Paso's surviving nineteenth-century adobe homes connects the Santa Fe–Chihuahua trade, Mexican-American civic leadership, the arrival of the railroads and more than a century of family life. The story includes domestic workers and the descendants who maintained the household, not just its prominent owners.",
  assessment: {
    recommendedVisit: "Allow roughly 30–60 minutes for the open visitor center and available interpretation, subject to the day's programming; this is an editorial planning estimate, not a published tour duration. The house itself is closed through 2027. A separate self-guided Magoffin Historic District walk takes about one hour.",
    physicalEffort: "Low",
    weatherExposure: "Mixed indoor/outdoor",
    planningLevel: "Moderate",
    familyFit: "The visitor center and an at-home virtual tour are better choices during restoration than promising children access to historic rooms. Confirm any family program or special hard-hat event with the operator.",
    firstTimeValue: "Begin at 1117 Magoffin Avenue, across from the historic home at 1120 Magoffin Avenue. Learn why an adobe residence became a center of El Paso trade, politics and hospitality; do not attempt to enter closed restoration areas.",
  },
  itineraries: [
    {
      label: "Visitor center and home exterior",
      duration: "About 30–60 minutes",
      steps: [
        "Check THC's current closure notice and visitor-center schedule before traveling. Enter through the visitor center at 1117 Magoffin Avenue, not the closed house.",
        "Ask staff what restoration exhibits, presentations and special programs are actually offered that day; standard interior tours should not be assumed.",
        "View the adobe residence from permitted public areas and compare the 1870s architecture with the later neighborhood around it.",
      ],
    },
    {
      label: "Walk the historic district",
      duration: "About one hour of walking",
      steps: [
        "Download THC's Magoffin Historic District self-guided walking tour before starting; it covers Magoffin, Myrtle, San Antonio and adjoining downtown streets.",
        "Look for the change from orchard-era adobe homes to railroad-era neighborhoods and commercial buildings; respect homes and private property.",
        "Finish with a separately open downtown El Paso attraction rather than assuming that the restoration site provides a one-hour interior tour.",
      ],
    },
    {
      label: "Explore the house remotely",
      duration: "At-home or an El Paso history day",
      steps: [
        "Open the interactive virtual interior tour linked on THC's Magoffin Home landing page while the historic rooms are closed.",
        "Read THC's Magoffin family history, including Octavia's charitable work, James Wiley Magoffin's cross-border trade and the role of domestic staff such as José Sierra.",
        "For an in-person extension, visit separately operating downtown El Paso cultural attractions and confirm their own hours and ticket rules.",
      ],
    },
  ],
  sources: [
    { label: "Texas Historical Commission — current closure, visitor center, hours and fees", url: OFFICIAL, scope: "Controlling October 2026 closure announcement: historic home closed through 2027, visitor center open; street address, hours, phone, posted standard admission rates, virtual tour and current program links." },
    { label: "Texas Historical Commission — Magoffin Home history", url: HISTORY, scope: "James Wiley, Joseph and Octavia Magoffin, the Glasgow descendants, 1877 occupancy, house additions, furnishings, National Register listing and 2007 transfer." },
    { label: "Texas Historical Commission — visitor and accessibility information", url: VISITING, scope: "Historical tour descriptions, group requests, visitor-center restrooms and stated wheelchair accessibility. Standard house-tour times on this page are superseded by the current closure notice." },
    { label: "Texas Historical Commission — Magoffin Historic District walking tour", url: WALKING_TOUR, scope: "Approximately one-hour self-guided street walk beginning at the historic home; an independent alternative to the closed interior." },
    { label: "Texas Historical Commission — José Sierra and domestic labor", url: JOSE_SIERRA, scope: "Research about a longtime household worker; context beyond the owners' political and commercial achievements." },
  ],
};

const areaGuide: DestinationAreaGuide = {
  intro: "The house and visitor center are on opposite sides of Magoffin Avenue just east of downtown El Paso. During restoration, build the day around permitted visitor-center interpretation and nearby independently operating museums rather than a closed-house tour.",
  nearbyAttractions: [
    { name: "Hotel Paso del Norte", href: "/destination/hotel-paso-del-norte", proximity: "Downtown El Paso", description: "Contrast this 1912 downtown hotel and its later commercial architecture with the family's nineteenth-century adobe homestead." },
    { name: "El Paso Museum of Art", href: "/destination/el-paso-museum-of-art", proximity: "Downtown El Paso", description: "A separately operating museum near the Plaza Theatre and city center; verify current exhibitions and opening hours." },
    { name: "Chamizal National Memorial", href: "/destination/chamizal-national-memorial", proximity: "A separate El Paso stop", description: "Continue the borderlands story with a different, twentieth-century chapter of U.S.–Mexico diplomacy." },
  ],
  foodAndDrink: [{ name: "Downtown El Paso", href: "/metro-area/el-paso-metro", description: "Use downtown as the practical food base; choose dining hours independently of the historic-site schedule." }],
  lodging: [{ name: "Hotel Paso del Norte", href: "/destination/hotel-paso-del-norte", description: "Central El Paso lodging in a different historic period; independently verify room pricing and availability." }],
  neighborhoods: [{ name: "Magoffin Historic District", description: "THC's self-guided walking route connects the home with early residences and streets changed by railroad-era growth." }],
  familyStops: [{ name: "Visitor center plus virtual tour", description: "Choose the open visitor center and the THC virtual interior tour instead of promising a physical house tour to children." }],
  sideTrips: [{ name: "El Paso and the Mission Trail", href: "/county/el-paso", description: "Explore El Paso County's larger historical network, but check each church, archaeological site and museum independently; Old Socorro Mission's original archaeological site is not open." }],
};

const visitorFaqs: NonNullable<Destination["visitorFaqs"]> = [
  { question: "Can I tour the inside of Magoffin Home in 2026?", answer: "No standard interior house tour should be planned. The Texas Historical Commission says the historic home is closed for restoration through 2027; the visitor center is open. Special restoration events may be offered separately and require checking current listings.", sourceUrl: OFFICIAL },
  { question: "Where do I go for the Magoffin Home visitor center?", answer: "Go to 1117 Magoffin Avenue, El Paso, TX 79901. The historic residence is across the street at 1120 Magoffin Avenue. Call 915-533-5147 if arrival or parking arrangements are unclear.", sourceUrl: OFFICIAL },
  { question: "What are the hours and admission prices?", answer: "As checked October 19, 2026, THC lists the visitor center Tuesday–Saturday, 9 a.m.–4 p.m. Its posted standard ticket prices are $7 adults, $6 eligible discounted adults, $4 ages 6–17 and free for children five and younger. Because the house is closed, contact the operator before assuming these ticket prices apply to a particular visitor-center program.", sourceUrl: OFFICIAL },
  { question: "How long should I allow for Magoffin Home?", answer: "Roughly 30–60 minutes is a reasonable planning allowance for a visitor-center stop if programs are available; it is not an official tour time. THC also publishes an approximately one-hour self-guided walk through the surrounding historic district. The closed house interior is not part of either ordinary visit.", sourceUrl: WALKING_TOUR },
  { question: "Is the site accessible during restoration?", answer: "THC describes Magoffin Home as wheelchair accessible and places restrooms at the visitor center. Those descriptions were written for ordinary tours; confirm current visitor-center access, parking and any special restoration-event restrictions directly with staff.", sourceUrl: VISITING },
  { question: "How can I see the historic rooms while the home is closed?", answer: "Use the interactive virtual tour linked from the official Magoffin Home page. Do not treat archival photographs or the virtual tour as proof of current physical room access.", sourceUrl: OFFICIAL },
];

const gallery: Destination["gallery"] = [
  {
    image: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/%27James_Wiley_Magoffin%27_by_Henry_Cheever_Pratt.JPG?width=960",
      alt: "Nineteenth-century painted portrait of James Wiley Magoffin by Henry Cheever Pratt",
      width: 1932,
      height: 2484,
      credit: "Henry Cheever Pratt portrait · CC0 / public domain · Wikimedia Commons",
    },
    caption: "James Wiley Magoffin, Joseph's father, helped establish Magoffinsville and participated in Southwest borderlands commerce. Archival artwork, not a photograph of the current interior.",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:%27James_Wiley_Magoffin%27_by_Henry_Cheever_Pratt.JPG",
  },
  {
    image: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Unsigned_Portrait_Octavia_Magoffin_ca_1870%27s.jpg?width=960",
      alt: "Unsigned nineteenth-century portrait of Octavia Magoffin, circa 1870s",
      width: 1393,
      height: 1785,
      credit: "Unsigned Octavia Magoffin portrait · public domain in the United States · Wikimedia Commons",
    },
    caption: "Octavia MacGreal Magoffin was a community and charitable leader. This historical portrait was sourced from the Magoffin Home collection; it is not contemporary visitor photography.",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Unsigned_Portrait_Octavia_Magoffin_ca_1870%27s.jpg",
  },
];

export function applyMagoffinHomeAuthority(destination: Destination): Destination {
  if (destination.slug !== "magoffin-home") return destination;
  return {
    ...destination,
    name: "Magoffin Home State Historic Site",
    summary: "Discover El Paso's 1870s adobe home, the Magoffin and Glasgow families and the borderlands history behind it. The historic house is closed through 2027; its visitor center remains open.",
    coordinates: { lat: 31.76279, lng: -106.47706 },
    address: "1117 Magoffin Ave, El Paso, TX 79901 (visitor center); historic house: 1120 Magoffin Ave",
    directions: "Arrive at the visitor center at 1117 Magoffin Avenue. The map pin marks the historic house across the street at 1120. Confirm any construction-related entrance, parking or access changes before traveling.",
    entryNote: "RESTORATION NOTICE: Historic house CLOSED through 2027; visitor center OPEN Tuesday–Saturday, 9 a.m.–4 p.m. (THC, Oct. 19, 2026). No regular interior house tour. Call 915-533-5147 or email magoffin-home@thc.texas.gov for current programs and special tour availability. THC lists standard admission rates, but confirm which, if any, apply during restoration.",
    bestSeason: "Visitor center: year-round during posted hours. For the self-guided historic-district walk, spring and fall usually offer more comfortable temperatures; the house remains closed through 2027.",
    highlights: [
      "Joseph and Octavia Magoffin's adobe home and cross-border family history",
      "Territorial-style architecture and the Magoffin Historic District",
      "Virtual interior tour while the house is closed",
      "Restoration interpretation and visitor-center programs",
    ],
    body: [
      "Magoffin Home is more than a historic-house facade. Its rooms and furnishings preserve the story of a Mexican-American family whose relationships crossed the Rio Grande and shaped El Paso through trade, government and hospitality. The adobe residence stands at 1120 Magoffin Avenue, opposite today's visitor center at 1117 Magoffin Avenue. Because the historic structure is under restoration, visitors should not expect access to its interior through 2027.",
      "The home's building history spans the 1870s rather than a single simple date. Architectural research places an early section around 1875 and the larger main wing around 1877. The Texas Historical Commission records Joseph and Octavia moving into their new adobe house in 1877. The house blends Southwest adobe and Territorial forms with Greek Revival-influenced proportions; it once stood amid orchard and garden land on El Paso's edge.",
      "Joseph's father, James Wiley Magoffin, known as Don Santiago, traded in northern Mexico and along the Santa Fe–Chihuahua route. After the Mexican-American War, he acquired Rio Grande land and developed Magoffinsville, an early settlement tied to the location of Fort Bliss. Joseph later served in El Paso civic government as the growing city became a railroad and trading center. Their family story is inseparable from both Mexican and American histories.",
      "Octavia MacGreal Magoffin was known for social leadership and charitable activity. The household also depended on workers whose experiences deserve attention: Texas Historical Commission research documents longtime servant and coachman José Sierra. Understanding their labor and life complicates the simple story of a wealthy family's furnishings or hospitality.",
      "The original house included six rooms and a large hall, with a separate three-room outbuilding. Later construction connected the spaces and enclosed a courtyard, while the home continued to change as subsequent generations lived there. Descendants in the Glasgow family maintained the house for decades; Octavia 'Tia' Glasgow was among its last family residents. The property was placed on the National Register of Historic Places in 1971, and the Texas Historical Commission assumed ownership in 2007.",
      "Current visiting conditions matter. THC's October 2026 notice says that the house is closed through 2027 for restoration but its visitor center is open Tuesday through Saturday from 9 a.m. to 4 p.m. Begin at 1117 Magoffin Avenue, call 915-533-5147 for programs, and use the interactive virtual tour linked on THC's official page to explore the furnished rooms remotely. The separately published historic-district walking route makes a more reliable in-person extension than a standard interior tour while work continues.",
    ],
    visitorFaqs,
    accessibilityNotes: "The operator describes Magoffin Home as wheelchair accessible and lists restrooms at the visitor center. The historic house is currently closed, so confirm access to the visitor center, any active grounds, parking and special restoration programs by calling 915-533-5147 before arrival.",
    officialUrl: OFFICIAL,
    sourceCheckedAt: "2026-10-19",
    managingAuthority: "Texas Historical Commission",
    areaGuide,
    authorityGuide,
    gallery,
  };
}
