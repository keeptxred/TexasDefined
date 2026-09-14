import type { Destination } from "../types";

export const RV_PARK_CURATED_PUBLIC_WAVE12_COUNT = 5;
export const RV_PARK_CURATED_PUBLIC_WAVE12_SLUGS = [
  "padre-balli-park-rv-area",
  "andy-bowie-county-park-rv-area",
  "adolph-thomae-jr-county-park-rv-loop",
  "kaufer-hubert-memorial-park-rv-area",
  "stella-mare-rv-resort",
] as const;

type CuratedUpdate = Pick<Destination,
  "summary" | "bestSeason" | "entryNote" | "highlights" | "body" | "officialUrl" |
  "sourceCheckedAt" | "address" | "managingAuthority" | "coordinates"
>;

const WAVE12: Record<(typeof RV_PARK_CURATED_PUBLIC_WAVE12_SLUGS)[number], CuratedUpdate> = {
  "padre-balli-park-rv-area": {
    summary: "Padre Balli Park on North Padre Island is a Nueces County beachfront campground with 30-amp water-and-electric RV sites plus premium 20/30/50-amp sites with on-site sewer and direct access to the Gulf coast.",
    bestSeason: "Fall through spring usually brings milder Gulf Coast temperatures, while summer is hotter and busier. Tropical weather, surf and wind can affect access in any warm-season stay, so recheck county notices before travel.",
    entryNote: "Nueces County separates 30-amp water-and-electric sites from premium 20/30/50-amp sites with on-site sewer. Reserve the correct site class for the rig and confirm current arrival instructions before towing onto North Padre Island.",
    highlights: [
      "30-amp water-and-electric RV campsites",
      "Premium 20/30/50-amp sites with on-site sewer",
      "Beachfront North Padre Island location",
      "County shower facilities and campground services",
    ],
    body: [
      "Padre Balli Park is a Nueces County Coastal Parks campground on North Padre Island in Corpus Christi. The county currently lists a 30-amp camping section with electricity, water, dump access and shower facilities, and it specifically warns that 50-amp units are not allowed in that section. A separate premium campground provides 20/30/50-amp electrical service, on-site sewer and shower access, so the reserved site class matters before an RV reaches the island.",
      "The campground is part of a larger county beach park on the Gulf of Mexico. That lets travelers build a stay around beach time, fishing and coastal recreation without moving the rig to a separate overnight property. Salt air, surf, wind and tropical weather are part of the operating environment, and conditions can change faster than at an inland campground.",
      "The park office is at 15820 Park Road 22 in Corpus Christi, and Nueces County publishes current campground rules, rates and reservation contacts on the Padre Balli page. Check the booked electrical class, pad fit, current beach conditions and any weather-related notices shortly before arrival. Texas Defined's current hero is explicitly representative editorial imagery, so this source-complete profile remains noindex until a final governed location image clears the image gate.",
    ],
    officialUrl: "https://www.nuecesbeachparks.com/padre-balli-park",
    sourceCheckedAt: "2026-09-14",
    address: "15820 Park Road 22, Corpus Christi, TX 78418",
    managingAuthority: "Nueces County Coastal Parks",
    coordinates: { lat: 27.5877, lng: -97.22009 },
  },
  "andy-bowie-county-park-rv-area": {
    summary: "Andy Bowie Park is a Cameron County beach park and reservable RV camping area on the north side of South Padre Island, with direct Gulf access and recently renovated public park facilities.",
    bestSeason: "Fall through spring generally offers milder South Padre Island weather, while summer brings greater heat and beach traffic. Gulf storms, high surf and wind can affect coastal access, so check current county notices before travel.",
    entryNote: "Cameron County manages Andy Bowie RV reservations through its county parks system. Confirm the reserved site, rig length, current gate and office hours, and any beach or weather restrictions before towing to South Padre Island.",
    highlights: [
      "County-managed RV reservations",
      "Direct South Padre Island Gulf beach access",
      "Renovated restrooms, bathhouse and park office",
      "Picnic pavilions, rinse facilities and ranger presence",
    ],
    body: [
      "Andy Bowie Park is Cameron County Beach Access No. 2 on the north side of South Padre Island. The county's current park page identifies an RV park and links directly to the county reservation system, while 2026 reservation notices specifically included Andy Bowie in the county's seasonal RV booking program. This is a public beach campground rather than a private resort, so travelers should use the county reservation record as the controlling source for the exact site assigned to their rig.",
      "Cameron County completed a major improvement project at Andy Bowie in June 2026. The county says the work added elevated plaza pavilions and picnic tables, renovated the restrooms, bathhouse, concession buildings and park office, strengthened the ranger-station area, improved landscaping and added pedestrian beach-access improvements with rinse stations. Those upgrades make the park useful for a beach-focused stay without claiming private-resort amenities that the county does not advertise.",
      "The current county address is 7300 Park Road 100 North in South Padre Island, and the park page publishes seasonal office hours and the RV reservation link. Confirm the current gate schedule, reserved site, RV length and any coastal operating notices shortly before arrival. Texas Defined's current hero remains explicitly representative AI editorial imagery, so the profile stays noindex until final governed location imagery is available.",
    ],
    officialUrl: "https://www.cameroncountytx.gov/parks-coastal-parks/parks-andy-bowie/",
    sourceCheckedAt: "2026-09-14",
    address: "7300 Park Road 100 N, South Padre Island, TX 78597",
    managingAuthority: "Cameron County Parks and Recreation",
    coordinates: { lat: 26.14242, lng: -97.17008 },
  },
  "adolph-thomae-jr-county-park-rv-loop": {
    summary: "Adolph Thomae Jr. County Park is a Cameron County RV and tent campground on the Arroyo Colorado near Rio Hondo, pairing overnight camping with public boat access, fishing and Lower Laguna Madre wildlife habitat.",
    bestSeason: "Fall through spring is generally the most comfortable period for Rio Grande Valley camping, fishing and birding. Summer can be very hot, and coastal storms or high water can affect conditions along the Arroyo Colorado.",
    entryNote: "Cameron County includes Adolph Thomae Jr. in its RV reservation system and periodically updates release dates and availability. Check the current county reservation notice and confirm the site, rig length and arrival procedure before travel.",
    highlights: [
      "County-managed RV camping reservations",
      "Arroyo Colorado shoreline setting",
      "Public boat-ramp and fishing access",
      "Wildlife habitat near Laguna Atascosa National Wildlife Refuge",
    ],
    body: [
      "Adolph Thomae Jr. County Park is a Cameron County campground on the Arroyo Colorado near Rio Hondo. Current county RV notices include the park in the reservation system and instruct travelers to select the park, date range, RV type and rig length before choosing an available site. That makes the reservation record—not an assumed generic campground layout—the right source for the exact space and stay details.",
      "The park is also a coastal-access and nature destination. Texas General Land Office project records describe RV site rentals, tent camping, restrooms, picnic areas, nature trails, a lighted fishing pier, public boat access and an observation tower, while later shoreline-protection work identifies the park as a primary public access point to the Arroyo Colorado serving fishing, eco-tourism and campers visiting the nearby Laguna Atascosa area. Those public-source records support treating the campground as more than an overnight parking lot.",
      "Cameron County currently lists the park at 37844 Marshall Huts in Rio Hondo and publishes reservation updates when seasonal booking windows change. Review the newest county notice, assigned site and arrival procedure before towing down the final park road. The current Texas Defined hero is explicitly representative AI editorial imagery, so the destination remains noindex until the final-image gate is satisfied.",
    ],
    officialUrl: "https://www.cameroncountytx.gov/parks-home/",
    sourceCheckedAt: "2026-09-14",
    address: "37844 Marshall Huts, Rio Hondo, TX 78583",
    managingAuthority: "Cameron County Parks and Recreation",
    coordinates: { lat: 26.34764, lng: -97.40036 },
  },
  "kaufer-hubert-memorial-park-rv-area": {
    summary: "Kaufer-Hubert Memorial Park near Riviera is a public coastal campground on the Baffin Bay system where TPWD confirms developed camping and RV/trailer hookups alongside birding and wetland access.",
    bestSeason: "Fall through spring generally brings the most comfortable South Texas camping and birding weather. Summer heat can be intense, and coastal wind or tropical weather should be checked before a Baffin Bay trip.",
    entryNote: "TPWD confirms developed camping and RV/trailer hookups but does not publish a site-by-site utility inventory on its wildlife-trail page. Confirm current campsite availability, hookup details and arrival rules with the local park operator before towing in.",
    highlights: [
      "Developed public camping",
      "RV and trailer hookups confirmed by TPWD",
      "Baffin Bay-area wetland and shorebird habitat",
      "Public coastal recreation near Riviera",
    ],
    body: [
      "Kaufer-Hubert Memorial Park is a public coastal park near Riviera in Kleberg County. Texas Parks and Wildlife's Great Texas Wildlife Trail lists the site as open daily with developed camping and specifically states that RV and trailer hookups are available. The TPWD source does not provide a current site-by-site electrical or sewer inventory, so travelers should confirm the exact campsite services locally instead of relying on inferred hookup details.",
      "The park sits in the Baffin Bay coastal environment around Arana and Vattmann creeks. TPWD highlights wetlands, mudflats, ponds and brush habitat that can support herons, egrets, shorebirds, waterfowl and South Texas species such as Green Jay and Olive Sparrow. That makes the campground useful for fishing, birding and coastal nature trips as well as for overnight RV stays.",
      "Current state environmental records place the county-operated park area at 1066 East FM 628 near Riviera, while TPWD publishes the park coordinates as 27.3188, -97.6861. Because the wildlife-trail page is not a reservation engine, verify current camping availability and hookup assignments before arrival. Texas Defined's current hero is explicitly representative AI editorial imagery, so this profile remains noindex until final governed location imagery clears the image gate.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/wildlife/wildlife-trails/ctc/kingsville-loop",
    sourceCheckedAt: "2026-09-14",
    address: "1066 E FM 628, Riviera, TX 78379",
    managingAuthority: "Kleberg County",
    coordinates: { lat: 27.3188, lng: -97.6861 },
  },
  "stella-mare-rv-resort": {
    summary: "Stella Mare RV Resort on Galveston Island offers full-hookup RV sites with 70- to 90-foot concrete pads, 20/30/50-amp power, Wi-Fi and resort amenities near the Gulf beach.",
    bestSeason: "Fall through spring usually offers milder Galveston weather for outdoor time. Summer is hotter and busier, and tropical-weather conditions should always be checked before an island stay.",
    entryNote: "Stella Mare lists full-hookup back-in and pull-through options with varying site layouts. Confirm the booked site, rig age/condition policy, arrival window and current operating rules directly with the resort before travel.",
    highlights: [
      "Full-hookup RV sites",
      "70- to 90-foot concrete pads on selected site classes",
      "20/30/50-amp electrical service",
      "Pool, splash pad, Wi-Fi, laundry and beach access",
    ],
    body: [
      "Stella Mare RV Resort is a private Galveston Island campground at 3418 Stella Mare Lane. The operator's current RV-site page lists full hookups, 20/30/50-amp electrical service, high-speed Wi-Fi and multiple back-in and pull-through site classes. Premium sites are advertised with concrete pads roughly 70 to 90 feet long, giving travelers a published starting point for matching a larger rig to the correct reservation category.",
      "The resort is designed for longer on-property recreation rather than only overnight parking. Current operator materials list an outdoor pool, splash pad, observation deck, laundry, restrooms, hot showers, two dog parks and beach access, along with daily and seasonal RV stays. Amenity availability can change with maintenance or weather, so travelers should verify any must-have feature for their dates.",
      "Stella Mare currently publishes RV check-in at 1 p.m. and checkout at 11 a.m., and its policies require RVs to be self-contained and in good condition, with older rigs subject to management approval. Confirm those policies and the assigned site before arrival. Texas Defined's current hero is explicitly representative AI editorial imagery, so this source-complete profile remains noindex until the final governed image gate is cleared.",
    ],
    officialUrl: "https://stellamarervresort.com/rv-sites/",
    sourceCheckedAt: "2026-09-14",
    address: "3418 Stella Mare Lane, Galveston, TX 77554",
    managingAuthority: "Stella Mare RV Resort",
    coordinates: { lat: 29.24083, lng: -94.88173 },
  },
};

export function applyRvParkCuratedPublicWave12(destination: Destination): Destination {
  const update = WAVE12[destination.slug as keyof typeof WAVE12];
  return update ? { ...destination, ...update } : destination;
}

export function applyRvParkCuratedPublicWave12List(destinations: readonly Destination[]): Destination[] {
  return destinations.map(applyRvParkCuratedPublicWave12);
}
