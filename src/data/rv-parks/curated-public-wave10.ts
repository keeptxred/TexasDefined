import type { Destination } from "../types";

export const RV_PARK_CURATED_PUBLIC_WAVE10_COUNT = 5;
export const RV_PARK_CURATED_PUBLIC_WAVE10_SLUGS = [
  "stewart-creek-park-rv-sites",
  "loyd-park-rv-campground",
  "vineyards-campground-and-cabins",
  "coleto-creek-regional-park-rv-area",
  "matagorda-bay-nature-park-rv-resort",
] as const;

type CuratedUpdate = Pick<Destination,
  "summary" | "bestSeason" | "entryNote" | "highlights" | "body" | "officialUrl" |
  "sourceCheckedAt" | "address" | "managingAuthority" | "coordinates"
>;

const WAVE10: Record<(typeof RV_PARK_CURATED_PUBLIC_WAVE10_SLUGS)[number], CuratedUpdate> = {
  "stewart-creek-park-rv-sites": {
    summary: "Stewart Creek Park on Lake Lewisville has five reservable pull-through RV sites with 20/30/50-amp electrical hookups and water, plus a dump station and direct access to a city lake park in The Colony.",
    bestSeason: "RV camping is offered year-round, subject to special-event closures. Spring and fall generally bring the easiest temperatures for lakeside camping, while summer trips require heat planning and a check of current park hours.",
    entryNote: "The City of The Colony requires reservations for RV camping. All five RV sites are pull-through with water and 20/30/50-amp electricity but no septic hookup; a dump station is available. Confirm special-event dates and current park hours before arrival.",
    highlights: [
      "Five reservable pull-through RV sites",
      "20/30/50-amp electricity and water hookups",
      "Dump station available on property",
      "Lake Lewisville beach, boat ramp, fishing and trails",
    ],
    body: [
      "Stewart Creek Park is a City of The Colony lake park with a deliberately small RV campground. The city lists five RV sites, all configured as pull-throughs with 20-, 30- and 50-amp electrical hookups plus a water connection. The sites do not have septic hookups, but a dump station is available. Because the campground is only five sites, advance reservations matter more here than at a large commercial RV resort.",
      "The campsite sits inside a broader recreation park on the eastern shore of Lake Lewisville. City listings include a beach, boat ramp and courtesy dock, fishing, swimming, a nature trail, playground, sand volleyball, basketball, picnic areas and a reservable pavilion. That gives RV travelers meaningful things to do without breaking camp or driving to another property after setup.",
      "The park is at 3700 Sparks Road in The Colony. The city offers RV camping year-round but notes that some dates are unavailable during special events, and weekend reservations carry additional stay requirements. Check the current reservation record, seasonal operating hours and park notices before towing in. Texas Defined's current hero remains explicitly labeled representative editorial imagery, so this source-complete profile stays out of search indexing until the final image gate is satisfied.",
    ],
    officialUrl: "https://www.thecolonytx.gov/1060/Tent-RV-Camping",
    sourceCheckedAt: "2026-09-13",
    address: "3700 Sparks Road, The Colony, TX 75056",
    managingAuthority: "City of The Colony Parks & Recreation",
    coordinates: { lat: 33.084452, lng: -96.918995 },
  },
  "loyd-park-rv-campground": {
    summary: "Loyd Park on Joe Pool Lake is a City of Grand Prairie campground with 221 wooded campsites, including full-hookup RV options, showers, restrooms, trails, a boat ramp and swimming beach.",
    bestSeason: "The city operates Loyd Park as a year-round lake destination. Spring and fall are usually easiest for trails and campsite time, while summer brings heavier lake use; check current lake and water-quality notices before travel.",
    entryNote: "Reserve the exact campsite class through the City of Grand Prairie before arrival. The park lists 221 campsites with water and electrical service and notes that full-hookup sites are available; verify current utility details, rig fit, lake notices and any temporary ramp or beach restrictions for the booked dates.",
    highlights: [
      "221 large private campsites",
      "Water and 30/50-amp service with full-hookup sites available",
      "Joe Pool Lake boat ramp and swimming beach",
      "Trails, showers, restrooms and lake recreation",
    ],
    body: [
      "Loyd Park is Grand Prairie's developed campground on Joe Pool Lake. Current park materials list 221 large private campsites with water and 30- and 50-amp service and say full-hookup sites are available, while the city emphasizes large wooded campsites with picnic facilities and access to showers and restrooms. The mix gives RV travelers a public lake-park setting rather than a parking-lot-style overnight stop.",
      "Joe Pool Lake is the center of the stay. The park supports boating, fishing, swimming and paddling, and Grand Prairie also promotes natural-surface trails through the park's woodland and savannah landscape. The city has occasionally issued temporary beach or boat-ramp closures when water-quality or lake conditions required them, so a current park-status check belongs in the arrival plan even when the campground reservation itself is confirmed.",
      "Loyd Park is at 3401 Ragland Road in Grand Prairie. Use the city's current reservation and park-status pages to confirm the assigned campsite, hookup class, arrival rules and any lake advisories before towing in. Texas Defined's current hero is still labeled as representative editorial imagery rather than documentary campground photography, so the profile remains noindex until the final-image quality gate is cleared.",
    ],
    officialUrl: "https://www.gptx.org/Parks/Loyd-Park",
    sourceCheckedAt: "2026-09-13",
    address: "3401 Ragland Road, Grand Prairie, TX 75052",
    managingAuthority: "City of Grand Prairie Parks, Arts & Recreation",
    coordinates: { lat: 32.61643, lng: -97.061272 },
  },
  "vineyards-campground-and-cabins": {
    summary: "The Vineyards Campground & Cabins on Grapevine Lake offers paved full-hookup RV sites with 30/50-amp electricity, water, sewer and Wi-Fi, including pull-through and lakefront options near Historic Downtown Grapevine.",
    bestSeason: "The campground operates year-round. Spring and fall are especially comfortable for lakeside recreation and Grapevine outings, while summer travelers should plan for North Texas heat and busier lake weekends.",
    entryNote: "The campground guarantees the booked site type and amenities but may optimize the exact site location unless a site lock is purchased. Confirm the reserved class, rig length, check-in rules and current lake or weather conditions before arrival.",
    highlights: [
      "Paved full-hookup RV sites",
      "30/50-amp electricity, water, sewer and Wi-Fi",
      "Pull-through and lakefront site options",
      "Grapevine Lake beach, fishing, paddling and nature trail",
    ],
    body: [
      "The Vineyards Campground & Cabins is a lakeside campground associated with the City of Grapevine, with campground contact email on the grapevinetexas.gov domain. Its current RV information says every site is paved and includes 30/50-amp electricity, water, sewer and Wi-Fi. Site classes include premium, deluxe and standard options, with pull-throughs concentrated in the higher tiers and back-in sites also available.",
      "The setting adds more than hookups. The campground promotes a private sandy beach, fishing, kayaking, a nature trail, playground and camp store on Grapevine Lake, while Historic Downtown Grapevine is nearby for dining, shopping and events. Most sites are more than 60 feet deep and many exceed 70 feet, but travelers should still book by their actual rig dimensions rather than assume every pad fits every RV.",
      "The campground is at 1501 N. Dooley Street in Grapevine. The reservation system may change the exact site location while preserving the booked site type and amenities unless the guest locks a site. Recheck current policies before travel because rates and operating details can change. The existing Texas Defined hero remains a clearly labeled representative editorial image and therefore does not yet qualify this page for indexing.",
    ],
    officialUrl: "https://www.vineyardscampground.com/rv-rates/",
    sourceCheckedAt: "2026-09-13",
    address: "1501 N. Dooley Street, Grapevine, TX 76051",
    managingAuthority: "The Vineyards Campground & Cabins / City of Grapevine",
    coordinates: { lat: 32.955464, lng: -97.073967 },
  },
  "coleto-creek-regional-park-rv-area": {
    summary: "Coleto Creek Park between Victoria and Goliad has 59 full-hookup campsites plus 20 multi-use sites with water and 20/30/50-amp electricity, along with showers, laundry, a dump station and reservoir recreation.",
    bestSeason: "The park operates year-round. Spring and fall usually provide the easiest temperatures for camping and the nature trail, while summer trips center more on water recreation and require heat planning.",
    entryNote: "GBRA lists 59 full-hookup campsites and 20 multi-use sites with water and electricity. Late arrivals should contact the park by noon on the arrival day for accommodation because gate and office hours vary seasonally.",
    highlights: [
      "59 full-hookup campsites",
      "20 water-and-electric multi-use campsites",
      "20/30/50-amp electrical service",
      "3,100-acre reservoir, boat ramp, fishing pier and nature trail",
    ],
    body: [
      "Coleto Creek Park is a Guadalupe-Blanco River Authority recreation area on Coleto Creek Reservoir between Victoria and Goliad. GBRA lists 59 campsites with full hookups and another 20 multi-use campsites with 20/30/50-amp electrical service and water. A dump station, laundry facilities and restrooms with showers support longer RV stays, while primitive camping and cabins serve other overnight visitors.",
      "The reservoir gives the campground a strong on-property recreation base. GBRA lists a four-lane boat ramp, a 200-foot lighted fishing pier, a marked swimming area, fishing, water skiing, wildlife viewing, disc golf and a 1.5-mile hiking and nature trail. The reservoir covers about 3,100 acres at normal pool, so conditions on the water can shape the trip as much as the campsite itself.",
      "The park is at 365 Coleto Park Road in Victoria, between Victoria and Goliad. GBRA changes office and gate hours seasonally and asks late-arriving campers to make arrangements in advance. Confirm the reserved site number, hookup class and current park notices before arrival. Texas Defined's hero remains explicitly representative AI imagery, so this profile is source-complete but stays noindex until final governed imagery replaces it.",
    ],
    officialUrl: "https://www.gbra.org/recreation/coleto-creek-park/",
    sourceCheckedAt: "2026-09-13",
    address: "365 Coleto Park Road, Victoria, TX 77905",
    managingAuthority: "Guadalupe-Blanco River Authority",
    coordinates: { lat: 28.7142, lng: -97.1759 },
  },
  "matagorda-bay-nature-park-rv-resort": {
    summary: "LCRA's Matagorda Bay Nature Park has 54 full-hookup RV sites at the mouth of the Colorado River, including pull-through and waterfront options with 30/50-amp service near Gulf beach, wetlands and paddling access.",
    bestSeason: "The park operates year-round, but coastal heat, wind and tropical weather can change trip conditions quickly. Cooler fall-through-spring weather is often easier for birding, paddling and shoreline time.",
    entryNote: "LCRA currently lists 34 standard full-hookup RV sites, five pull-through full-hookup sites and 15 waterfront full-hookup RV sites, all with 30/50-amp service. Check current park notices and coastal-weather conditions before arrival.",
    highlights: [
      "54 full-hookup RV sites across three site classes",
      "30/50-amp service with pull-through and waterfront options",
      "Colorado River, Gulf beach and wetland access",
      "Birding, boating, fishing, kayaking and wildlife viewing",
    ],
    body: [
      "Matagorda Bay Nature Park is an LCRA coastal park where the Colorado River meets the Gulf of Mexico. LCRA currently lists 34 full-hookup RV sites, five pull-through full-hookup sites and 15 waterfront full-hookup RV sites. All three RV classes list 30/50-amp service, and the waterfront sites add shade structures. That gives travelers a choice between standard, pull-through and waterfront layouts instead of one uniform campground product.",
      "The park's location is the main reason to stay. Visitors can reach the Gulf beach, Colorado River, marshes and wetlands from the same property, with birding, boating, fishing, kayaking, wildlife viewing, mini golf and picnicking also listed by LCRA. The combination makes it possible to spend much of a coastal trip on park property rather than using the campground only as a base.",
      "LCRA lists the park at 6420 FM 2031 in Matagorda and keeps current park information on the official page. Coastal weather and operating conditions can change, so recheck conditions close to departure and reserve the exact RV site class that fits the rig and trip goals. Texas Defined's current hero remains labeled representative editorial imagery, so this page stays noindex until the final-image gate is satisfied.",
    ],
    officialUrl: "https://lcraparks.com/parks/matagorda-bay-nature-park",
    sourceCheckedAt: "2026-09-13",
    address: "6420 FM 2031, Matagorda, TX 77457",
    managingAuthority: "Lower Colorado River Authority",
    coordinates: { lat: 28.598639, lng: -95.979056 },
  },
};

export function applyRvParkCuratedPublicWave10(destination: Destination): Destination {
  const update = WAVE10[destination.slug as keyof typeof WAVE10];
  return update ? { ...destination, ...update } : destination;
}

export function applyRvParkCuratedPublicWave10List(destinations: readonly Destination[]): Destination[] {
  return destinations.map(applyRvParkCuratedPublicWave10);
}
