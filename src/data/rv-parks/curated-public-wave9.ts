import type { Destination } from "../types";

export const RV_PARK_CURATED_PUBLIC_WAVE9_COUNT = 5;
export const RV_PARK_CURATED_PUBLIC_WAVE9_SLUGS = [
  "lady-bird-johnson-municipal-park",
  "quintana-beach-county-park-rv-sites",
  "ib-magee-beach-park-rv-sites",
  "east-fork-park-rv-area",
  "clear-lake-park-rv-loop",
] as const;

type CuratedUpdate = Pick<Destination,
  "summary" | "bestSeason" | "entryNote" | "highlights" | "body" | "officialUrl" |
  "sourceCheckedAt" | "address" | "managingAuthority" | "coordinates"
>;

const FREDERICKSBURG = "City of Fredericksburg Parks & Recreation";
const BRAZORIA = "Brazoria County Parks Department";
const NUECES = "Nueces County Coastal Parks";
const USACE = "U.S. Army Corps of Engineers";

const WAVE9: Record<(typeof RV_PARK_CURATED_PUBLIC_WAVE9_SLUGS)[number], CuratedUpdate> = {
  "lady-bird-johnson-municipal-park": {
    summary: "Lady Bird Johnson RV Park in Fredericksburg has 90 full-hookup RV sites with 30- and 50-amp electrical service, water, sewer and cable beside the city's 330-acre Lady Bird Johnson Municipal Park.",
    bestSeason: "The RV park operates year-round. Spring and fall are especially useful for Hill Country day trips, while summer travelers should plan around heat and the municipal pool's seasonal schedule; reservations can be made up to 12 months ahead.",
    entryNote: "The City of Fredericksburg moved RV reservations to its Firefly system in January 2026. Confirm the assigned loop and site, current reservation terms and any holiday minimum-stay rules before arrival; check-in is after noon and checkout is by noon.",
    highlights: [
      "90 RV sites with full hookups",
      "30- and 50-amp electrical service",
      "Three miles south of Fredericksburg Main Street",
      "Adjacent fishing, trails, sports facilities and seasonal swimming",
    ],
    body: [
      "Lady Bird Johnson RV Park is the City of Fredericksburg's public campground inside the larger Lady Bird Johnson Municipal Park. The city lists 90 RV sites with 30- and 50-amp electrical hookups, water, sewer and cable television. That makes it a practical full-hookup base for travelers who want municipal-park surroundings while staying close to Fredericksburg rather than relying on a private resort farther from town.",
      "The campground connects directly to the municipal park's recreation network. Live Oak Creek runs through the park and is available for fishing and non-motorized boating, while nearby amenities include nature trails, playgrounds, tennis and pickleball courts, ball fields, picnic facilities and a municipal swimming pool that operates seasonally. The city places the park about three miles south of Main Street, so an RV stay can combine on-property outdoor time with Fredericksburg dining, shopping and Hill Country day trips.",
      "Park Headquarters is at 432 Lady Bird Drive in Fredericksburg. The city transitioned RV reservations to Firefly in January 2026 and says reservations can be made up to 12 months ahead. Site tiers, rates and special-event minimum stays can change, so confirm the current reservation record before towing in. Texas Defined's current hero remains clearly labeled representative editorial imagery rather than documentary campground photography.",
    ],
    officialUrl: "https://www.fbgtx.org/343/Lady-Bird-Johnson-RV-Park",
    sourceCheckedAt: "2026-09-13",
    address: "432 Lady Bird Drive, Fredericksburg, TX 78624",
    managingAuthority: FREDERICKSBURG,
    coordinates: { lat: 30.24118, lng: -98.91051 },
  },
  "quintana-beach-county-park-rv-sites": {
    summary: "Quintana Beach County Park is a 52-acre Brazoria County beachfront park with paved full-service RV camping, showers and direct access to a pedestrian Gulf beach, fishing pier and west jetty.",
    bestSeason: "The park supports overnight camping year-round, but Gulf heat, tropical weather and beach conditions matter most in summer and hurricane season. Check county notices before travel, especially for reservation or storm-related changes.",
    entryNote: "Brazoria County currently directs guests to call the park office for reservations while online reservations are closed. RV campers should confirm the specific site, electrical service, length limits and current park rules before towing to Quintana.",
    highlights: [
      "Paved full-service RV campsites",
      "52-acre county beachfront park",
      "Restrooms and showers for overnight visitors",
      "Pedestrian beach, lighted fishing pier and west-jetty access",
    ],
    body: [
      "Quintana Beach County Park is a public Gulf Coast campground operated by Brazoria County. The county describes the 52-acre park as having paved full-service RV campsites along with cabins, restrooms, showers, covered pavilions, picnic facilities and paved parking. The RV campground is divided into named areas with site-specific electrical and occupancy rules, so travelers should reserve by site rather than assume every pad has the same service.",
      "The appeal extends beyond the campsite. Quintana provides a pedestrian beach, access to the west jetty, a wooden lighted fishing pier, trails and opportunities for birding, fishing, swimming, surfing, beachcombing and shelling. Overnight campers can therefore build a coastal stay around the park itself instead of using the RV site only as a parking base for other beaches.",
      "The park address is 330 5th Street in Quintana, and Brazoria County publishes GPS coordinates of 28.934576, -95.302438. The county's current park page says online reservations are closed and directs guests to call the office, so confirm availability and any temporary operating notices before travel. Texas Defined's hero is explicitly labeled representative editorial imagery rather than an exact-location campground photograph.",
    ],
    officialUrl: "https://www.brazoriacountytx.gov/departments/parks-department/quintana-beach/rv-camping",
    sourceCheckedAt: "2026-09-13",
    address: "330 5th Street, Quintana, TX 77541",
    managingAuthority: BRAZORIA,
    coordinates: { lat: 28.934576, lng: -95.302438 },
  },
  "ib-magee-beach-park-rv-sites": {
    summary: "I.B. Magee Beach Park in Port Aransas is a 167-acre Nueces County Gulf park with 64 RV sites offering 20/30/50-amp electricity, water, sewer and Wi-Fi beside the beach and Horace Caldwell Pier.",
    bestSeason: "The county park is a year-round coastal destination. Cooler fall-through-spring weather can make beach and pier time easier, while summer trips require heat, wind and storm planning; always check current coastal conditions before arrival.",
    entryNote: "Nueces County lists 64 serviced RV sites and a dump station with city-water tank fill. Confirm current site availability, park access, length limits and any coastal-weather restrictions directly with the park before arrival.",
    highlights: [
      "64 RV sites with water and sewer",
      "20/30/50-amp electrical service",
      "167 acres beside the Gulf of Mexico",
      "Horace Caldwell Pier and beach access",
    ],
    body: [
      "I.B. Magee Beach Park is Nueces County's public beachfront campground at the north end of Port Aransas. The county lists 64 RV sites with 20-, 30- and 50-amp electrical service, on-site sewer, water and Wi-Fi. A dump station and city-water tank fill are also available, giving travelers a developed campground setup immediately beside the Gulf rather than an inland RV base.",
      "The 167-acre park sits next to the Gulf and Port Aransas jetty. Horace Caldwell Pier extends 1,240 feet over the water and provides fishing access, while the beach and coastal setting make the campground useful for travelers focused on surf, fishing and shoreline time. Conditions at a barrier-island campground can change quickly with wind, tides and storms, so daily coastal conditions matter as much as the campsite reservation.",
      "Nueces County lists the park at 321 North on the Beach in Port Aransas and publishes the park office phone with its facility record. Confirm the exact RV site, current park rules and weather-related notices before travel, particularly during peak summer and tropical-weather periods. Texas Defined's current image is labeled representative editorial imagery and is not presented as documentary photography of a specific campsite.",
    ],
    officialUrl: "https://www.nuecesco.com/Home/Components/FacilityDirectory/FacilityDirectory/284/",
    sourceCheckedAt: "2026-09-13",
    address: "321 North on the Beach, Port Aransas, TX 78373",
    managingAuthority: NUECES,
    coordinates: { lat: 27.835008, lng: -97.051904 },
  },
  "east-fork-park-rv-area": {
    summary: "East Fork Campground on Lavon Lake near Wylie has 50 campsites with water and electric hookups, 12 tent-only sites, hot showers, a dump station, two boat ramps and access to the Trinity Trail.",
    bestSeason: "East Fork is open year-round. Spring and fall generally offer the easiest temperatures for camping, hiking and lake time; summer travelers should plan for North Texas heat and always check current fire restrictions and lake conditions.",
    entryNote: "Recreation.gov lists 50 water-and-electric campsites and notes that campsite sewer hookups are not provided; a dump station is near the entrance. The gate closes at 10 p.m. and reopens at 10 a.m., so plan arrival accordingly.",
    highlights: [
      "50 water-and-electric campsites",
      "50-amp electrical service at the campground",
      "Dump station, hot showers and two boat ramps",
      "Lavon Lake fishing, boating and adjacent Trinity Trail access",
    ],
    body: [
      "East Fork Campground is a U.S. Army Corps of Engineers recreation area on the southern shore of Lavon Lake. Recreation.gov lists 50 campsites with water and electric hookups plus 12 tent-only sites. Campsites do not have sewer hookups, but a dump station is located near the entrance. The campground also provides hot showers and is identified as the Lavon Lake campground with 50-amp electrical service.",
      "The park supports more than RV camping. Two boat ramps serve Lavon Lake, while fishing and boating are core activities and the Trinity Trail begins adjacent to the campground for hiking and horseback riding. An equestrian loop and group facilities broaden the park's use, so RV travelers should confirm that their reservation is for the standard electric camping loop rather than a tent, equestrian or group site.",
      "Recreation.gov lists East Fork at 1901 Skyview Drive in Wylie. The entrance gate closes at 10 p.m. and reopens at 10 a.m., with no vehicle entry during the closure. Current alerts can include fire restrictions, so review the live facility page before travel. Texas Defined's hero remains clearly labeled representative editorial imagery rather than documentary campground photography.",
    ],
    officialUrl: "https://www.recreation.gov/camping/campgrounds/232583",
    sourceCheckedAt: "2026-09-13",
    address: "1901 Skyview Drive, Wylie, TX 75098-7575",
    managingAuthority: USACE,
    coordinates: { lat: 33.0388889, lng: -96.5102778 },
  },
  "clear-lake-park-rv-loop": {
    summary: "Clear Lake Campground on Lavon Lake near Princeton has 23 campsites with water, sewer and electric hookups, plus hot showers, a boat ramp, fishing dock and shaded shoreline camping northeast of Dallas.",
    bestSeason: "The campground is operated for lake recreation, with spring and fall generally the easiest seasons for outdoor time. Check the live Recreation.gov page before travel for current fire restrictions, gate notices and seasonal operating details.",
    entryNote: "Recreation.gov lists 23 full-hookup campsites and notes that the entrance gate closes at 10 p.m. and reopens at 10 a.m. Confirm the exact site's electrical service, rig-length limit and current availability before towing in.",
    highlights: [
      "23 campsites with water, sewer and electricity",
      "Hot showers and shaded campground setting",
      "Lavon Lake boat ramp and fishing dock",
      "Site-specific RV length and electrical details on Recreation.gov",
    ],
    body: [
      "Clear Lake Campground is a U.S. Army Corps of Engineers campground on Lavon Lake near Princeton. Recreation.gov lists 23 campsites with water, sewer and electric hookups, making it one of the more fully serviced public camping options around the lake. Individual site records carry their own electrical amperage and RV-length limits, so travelers should select the actual pad by rig requirements rather than relying only on the campground-wide description.",
      "The campground is known for a shaded setting along the lake and includes hot showers, a boat ramp and fishing dock. Fishing, boating, hiking and picnicking are the principal recreation options, while the group area has its own shelter and facilities. The campground's quieter, tree-covered character makes it a different Lavon Lake stay from more open shoreline camping areas.",
      "Recreation.gov lists the campground at 8199 County Road 436 in Princeton. The entrance gate closes at 10 p.m. and reopens at 10 a.m., and current alerts can include fire restrictions. Check the live facility and site pages before arrival for the booked site's hookup class, length limit and operating notices. Texas Defined's current hero is explicitly labeled representative editorial imagery rather than exact-location documentary photography.",
    ],
    officialUrl: "https://www.recreation.gov/camping/campgrounds/232552",
    sourceCheckedAt: "2026-09-13",
    address: "8199 County Road 436, Princeton, TX 75407",
    managingAuthority: USACE,
    coordinates: { lat: 33.0552778, lng: -96.4819444 },
  },
};

export function applyRvParkCuratedPublicWave9(destination: Destination): Destination {
  const update = WAVE9[destination.slug as keyof typeof WAVE9];
  return update ? { ...destination, ...update } : destination;
}

export function applyRvParkCuratedPublicWave9List(destinations: readonly Destination[]): Destination[] {
  return destinations.map(applyRvParkCuratedPublicWave9);
}
