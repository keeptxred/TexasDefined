import type { Destination } from "./types";

/**
 * Hidalgo County's 1909 irrigation pumphouse is a genuine historic-site
 * destination, not an inferred museum from an attraction keyword.
 *
 * Primary: City of Hidalgo visitor page, verified 2026-10-09.
 * Historic context: Texas Historical Commission Atlas and Texas Time Travel.
 * Image: 25or6to4, "Hidalgo Pumphouse, Hidalgo, Texas.JPG",
 * Wikimedia Commons CC BY-SA 3.0. Exact-site photograph, not representative AI.
 */
export const hidalgoPumphouseAuthorityDestinations: Destination[] = [{
  id: "historic-old-hidalgo-pumphouse-museum",
  brandId: "texasdefined",
  slug: "old-hidalgo-pumphouse-museum",
  name: "Old Hidalgo Pumphouse Museum and World Birding Center",
  summary: "Explore a preserved 1909 Rio Grande irrigation pumping station in Hidalgo, where historic machinery explains the agricultural transformation of the Lower Valley and riverside trails add birding, butterfly gardens and a different kind of local history outing.",
  category: "historic-sites",
  region: "south-texas",
  geography: {
    primaryRegionId: "south-texas",
    subregionIds: ["rio-grande-valley"],
    metroId: "rio-grande-valley",
    countySlugs: ["hidalgo"],
    travelRegionIds: ["south-texas"],
  },
  nearestTown: "Hidalgo",
  county: "Hidalgo County",
  // The historic pumphouse, not a route-mile or surveyed entrance coordinate.
  coordinates: { lat: 26.09689, lng: -98.26177 },
  address: "902 S. 2nd Street, Hidalgo, TX 78557",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Hidalgo_Pumphouse%2C_Hidalgo%2C_Texas.JPG?width=960",
    alt: "Historic Hidalgo irrigation pumphouse building beside the Rio Grande, photographed on site in Hidalgo, Texas",
    width: 960,
    height: 1440,
    credit: "25or6to4 · Wikimedia Commons · CC BY-SA 3.0 (2014), exact-site photo",
  },
  bestSeason: "Fall through spring for comfortable trail and birding weather; the industrial-history museum can be a useful year-round stop when guided access is available.",
  entryNote: "The City of Hidalgo lists its visitor desk at 902 S. 2nd Street, telephone 956-843-2286, and posted operating hours Monday–Friday, 8 a.m.–5 p.m. Its website separately advertises guided museum tours and tours on other days; do not infer that every exhibit or interior tour is open seven days. Call to verify actual tour times, the city's posted $3 guided-tour charge, accessibility, trail access and seasonal closures.",
  managingAuthority: "City of Hidalgo",
  officialUrl: "https://cityofhidalgo.net/old-hidalgo-pump-housemuseum-and-world-birding-center",
  sourceCheckedAt: "2026-10-09",
  directions: "From McAllen, follow a current driving route to the City of Hidalgo Pumphouse Museum at 902 South Second Street. Do not use the straight-line distance to estimate driving time; check any border-area road restrictions and museum directions before leaving.",
  accessibilityNotes: "Paths and historic industrial machinery areas may have different access conditions. Ask staff which indoor tour sections and birding trails are currently accessible, including any steps, uneven ground or closures.",
  highlights: [
    "Original irrigation-era pumping machinery and the story of the 1909 installation",
    "Why the Rio Grande's course and canal engineering shaped Valley farming",
    "World Birding Center grounds, butterfly habitat and a trails-focused outdoor visit",
    "A meaningful Hidalgo County history stop a short regional outing from McAllen",
    "A source-checked city visitor desk, museum-tour contact and practical access notes",
  ],
  body: [
    "The Old Hidalgo Pumphouse explains a central but often overlooked chapter of the Rio Grande Valley: how a complicated river, irrigation works and human labor transformed the agricultural landscape. The pump plant dates to 1909 and originally drew river water for fields beyond Hidalgo. Instead of treating irrigation as an abstract economic statistic, the surviving building and machinery make the system visible. The state-sponsored Texas Time Travel heritage program describes the pump station's evolution from steam-era equipment to later power arrangements before an all-electric facility took over in 1983.",
    "The site is more than an industrial photograph stop. Historic pumps, boilers, gates and intake works show how much infrastructure was required to lift and distribute water. Visitors can use interpretive displays and a museum tour to follow the water's path from the Rio Grande into canals and farms. A particularly revealing part of the story is the river itself: after a 1933 flood shifted the channel away from the building, engineers had to reconnect the pump intake by excavating a new channel. This is an unusually tangible place to learn why a border river does not always stay in the same physical course.",
    "Today the city operates the property as both a historic museum and part of the World Birding Center network. The grounds link heritage interpretation with the riverside habitat: the old irrigation channel and planted areas support birds, butterflies and outdoor walking. This pairing is what distinguishes the Hidalgo Pumphouse from an ordinary indoor history museum. Budget time for both the preserved machinery and the outdoor setting rather than treating the stop as a quick photo of the chimney.",
    "Visitor logistics matter because the city publishes different information for the front desk and guided tours. The city presently lists weekday operating hours of 8 a.m. to 5 p.m. while also advertising guided museum tours, special trolley tours and other activities. It would be misleading to turn those separate postings into a blanket promise that every museum space is open all weekend. Telephone 956-843-2286 before setting out to confirm the exact date, tour availability, current fees, trail conditions, photography rules and any group arrangements.",
    "For a focused first visit, plan to arrive during confirmed museum hours, learn the irrigation timeline inside, then take a short outdoor walk if weather and access permit. For a history-and-nature day from McAllen, combine this stop with a separate birding site or the Hidalgo County visitor guide rather than stacking distant beach attractions. Bentsen-Rio Grande Valley State Park and the Museum of South Texas History offer very different interpretations of Valley landscape and history, so choose a second stop based on the experience you want, not simply geographic closeness.",
    "The Old Hidalgo Pumphouse is also an excellent place to ask larger questions: whose labor and land made commercial agriculture possible, how irrigation infrastructure changed local water use, and how river floods affected both farms and wildlife. Texas Historical Commission's museum record identifies the property by name, city, address and operator; the City of Hidalgo is the current source for visitor arrangements. Those primary records make this a more reliable trip-planning anchor than an unsourced list of 'hidden gems.'",
  ],
  authorityGuide: {
    whyItMatters: "A rare place to see the physical machinery of the Rio Grande Valley's irrigation revolution beside the habitat sustained by the same river system.",
    assessment: {
      recommendedVisit: "Allow time for the verified indoor tour plus a separate grounds walk; confirm both are available that day.",
      physicalEffort: "Low to moderate",
      weatherExposure: "Mixed indoor/outdoor",
      planningLevel: "Moderate",
      familyFit: "Strong for curious older children studying machinery, farming, engineering or local nature; supervise around old industrial structures and confirm any tour age restrictions.",
      firstTimeValue: "The historic pumps and the story of the 1933 river-course shift make this more distinctive than a standard birding stop.",
    },
    itineraries: [
      { label: "Museum-first history visit", duration: "About 60–90 minutes, if a tour is available", steps: ["Confirm the city visitor-desk and guided-tour schedule", "See the historic pump equipment and interpretive displays", "Walk an accessible portion of the museum grounds if open"] },
      { label: "History meets habitat", duration: "Half day, depending on conditions", steps: ["Tour the pump building during confirmed public access", "Observe the historic irrigation channel and adjacent planted habitat", "Add time for the World Birding Center grounds and butterfly gardens"] },
      { label: "McAllen-area heritage day", duration: "Full flexible day, with separate access checks", steps: ["Start at the Old Hidalgo Pumphouse during confirmed museum hours", "Have lunch and explore the wider Hidalgo–McAllen area", "Choose a second verified stop, such as the Museum of South Texas History or a designated Valley birding park"] },
    ],
    sources: [
      { label: "City of Hidalgo: current museum, tour and visitor contacts", url: "https://cityofhidalgo.net/old-hidalgo-pump-housemuseum-and-world-birding-center", scope: "Official hours, address, telephone, visitor activities and tour arrangements" },
      { label: "Texas Historical Commission: Pumphouse museum record", url: "https://atlas.thc.texas.gov/Details/4200000667", scope: "Site identification, Hidalgo County, visitor address and historic-museum record" },
      { label: "Texas Time Travel: Hidalgo Pumphouse history", url: "https://texastimetravel.com/directory/hidalgo-pumphouse-heritage-and-discovery-park/", scope: "1909 irrigation plant, machinery, 1933 flood and subsequent museum and birding use" },
      { label: "Wikimedia Commons: exact-site photograph and CC BY-SA 3.0 license", url: "https://commons.wikimedia.org/wiki/File:Hidalgo_Pumphouse,_Hidalgo,_Texas.JPG", scope: "Image author, subject, license and attribution" },
    ],
  },
}];
