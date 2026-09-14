import type { Destination } from "../types";

export const RV_PARK_CURATED_PUBLIC_WAVE11_COUNT = 5;
export const RV_PARK_CURATED_PUBLIC_WAVE11_SLUGS = [
  "dellanera-rv-park",
  "pleasure-island-rv-park",
  "pioneer-rv-resort",
  "gulf-waters-beach-front-rv-resort",
  "jamaica-beach-rv-resort",
] as const;

type CuratedUpdate = Pick<Destination,
  "summary" | "bestSeason" | "entryNote" | "highlights" | "body" | "officialUrl" |
  "sourceCheckedAt" | "address" | "managingAuthority" | "coordinates"
>;

const WAVE11: Record<(typeof RV_PARK_CURATED_PUBLIC_WAVE11_SLUGS)[number], CuratedUpdate> = {
  "dellanera-rv-park": {
    summary: "Dellanera RV Park on Galveston Island has 65 full-hookup beachfront sites for rigs roughly 30 to 45 feet long, with water, sewer and electric service plus showers, laundry, Wi-Fi and direct Gulf access.",
    bestSeason: "Galveston's cooler fall-through-spring weather is generally easiest for outdoor time, while summer brings stronger heat, higher beach traffic and tropical-weather planning. Check current Gulf conditions and park notices before travel.",
    entryNote: "The City of Galveston lists 65 full-hookup sites and notes that site capacity varies by rig length. Confirm the reserved site, current check-in instructions, office hours and any weather-related operating changes before towing onto the island.",
    highlights: [
      "65 beachfront full-hookup RV sites",
      "Water, sewer and electric hookups",
      "Direct Gulf beach access",
      "Restrooms, showers, laundry and free Wi-Fi",
    ],
    body: [
      "Dellanera RV Park is Galveston's city-listed beachfront RV campground on the west end of the island. The current city page lists 65 full-hookup sites that accommodate rigs in roughly the 30- to 45-foot range, with water, sewer and electrical connections at the sites. That makes Dellanera a developed coastal campground rather than a primitive beach-camping option.",
      "The setting is the main reason to stay here. The RV park sits directly along the Gulf shoreline, and current city information lists on-site restrooms, showers, laundry, free Wi-Fi, a gift shop, shaded gathering space and beach wheelchairs available for guest use. Travelers can move from an RV site to the beach without needing to relocate the rig or drive to a separate day-use park.",
      "Dellanera is at 10901 San Luis Pass Road in Galveston. Coastal wind, surf, salt exposure and tropical weather can change conditions quickly, so verify the reserved site and current operating notices close to arrival. Texas Defined's current hero is explicitly labeled representative editorial imagery, so the source-complete profile remains noindex until a final governed location image clears the image gate.",
    ],
    officialUrl: "https://galvestontx.gov/1329/Dellanera-RV-Park",
    sourceCheckedAt: "2026-09-14",
    address: "10901 San Luis Pass Road, Galveston, TX 77554",
    managingAuthority: "City of Galveston / Galveston Park Board",
    coordinates: { lat: 29.241599, lng: -94.872019 },
  },
  "pleasure-island-rv-park": {
    summary: "Pleasure Island RV Park is a City of Port Arthur waterfront campground with about 50 RV spaces offering 30- and 50-amp electrical connections, plus laundry, restrooms and nearby fishing, playground and pier access.",
    bestSeason: "The Sabine Lake waterfront is usable across much of the year, but spring and fall usually bring milder temperatures. Summer heat, wind and Gulf Coast tropical weather should be part of the arrival check before any stay.",
    entryNote: "Port Arthur currently describes approximately 50 RV spaces with 30- and 50-amp connections. Confirm the assigned site, utility details, current rate, stay rules and check-in procedure directly with Pleasure Island before arrival.",
    highlights: [
      "Approximately 50 city-operated RV spaces",
      "30- and 50-amp electrical connections",
      "On-site laundry and restroom facilities",
      "Sabine Lake piers, fishing and nearby playground access",
    ],
    body: [
      "Pleasure Island RV Park is part of the City of Port Arthur's Pleasure Island recreation system on Sabine Lake. The city's current Pleasure Island page describes approximately 50 RV spaces with 30-amp and 50-amp electrical connections, plus laundry and restroom facilities for campground guests. Because utility and stay details can change, the exact booked site's services should be confirmed directly rather than inferred from the island-wide description.",
      "The campground connects to a larger waterfront recreation area. Port Arthur highlights nearby fishing access, a playground, Lakefront Park, Logan Music Park, disc golf and roughly a mile of public piers with Sabine Lake views. That makes the RV park useful for travelers who want fishing and shoreline time on the same island instead of using the site only as an overnight stop.",
      "The RV park is on South Spoil Levee Road on Pleasure Island in Port Arthur. The city publishes current Pleasure Island contact information and RV pricing, but travelers should recheck availability, utility details and arrival instructions before towing in. This profile already has governed park-property imagery in the Texas Defined registry, so once the destination content and source gates pass it can qualify for normal indexing.",
    ],
    officialUrl: "https://portarthurtx.gov/565/Pleasure-Island",
    sourceCheckedAt: "2026-09-14",
    address: "540 South Spoil Levee Road, Port Arthur, TX 77640",
    managingAuthority: "City of Port Arthur / Pleasure Island",
    coordinates: { lat: 29.861117, lng: -93.930434 },
  },
  "pioneer-rv-resort": {
    summary: "Pioneer Beach RV Resort in Port Aransas offers full-hookup 30/50-amp RV sites on concrete pads with pools, a hot tub, three bathhouses, laundry, Wi-Fi, cable and a boardwalk leading across the dunes to the Gulf beach.",
    bestSeason: "Spring and fall generally offer easier temperatures for beach and outdoor time. Summer is busier and hotter, while tropical weather can affect any coastal stay; check island and ferry conditions before travel.",
    entryNote: "Reserve the exact site for the rig and confirm current arrival rules before travel. Guests approaching Port Aransas by the TX-361 ferry should check current ferry conditions, especially when towing a large trailer or fifth wheel.",
    highlights: [
      "Full-hookup 30/50-amp RV sites",
      "Concrete RV pads",
      "Pools, hot tub and three bathhouses",
      "Private boardwalk access to the Gulf beach",
    ],
    body: [
      "Pioneer Beach RV Resort is a commercial RV resort on Mustang Island south of central Port Aransas. The resort's current site lists full hookups with 30- and 50-amp electrical service, all-concrete pads, Wi-Fi and cable. Those utilities are paired with practical longer-stay services including laundry, propane, a convenience store and three bathhouses.",
      "Beach access is built into the property rather than requiring a drive to a separate access point. Pioneer advertises a boardwalk to the Gulf, along with swimming pools, a hot tub and a fish-cleaning house for guests returning from coastal fishing trips. The location also keeps Port Aransas restaurants, shops and island recreation within a short drive while preserving a campground setting in the dunes.",
      "The resort is at 120 Gulfwind Drive in Port Aransas. Its official directions support arrival either from the Corpus Christi side of Mustang Island or by the Port Aransas ferry, and towing travelers should verify ferry conditions if they choose that route. Texas Defined's current hero remains explicitly representative AI editorial imagery, so this newly source-complete profile stays noindex until the final-image gate is satisfied.",
    ],
    officialUrl: "https://www.pioneerrvresorts.com/",
    sourceCheckedAt: "2026-09-14",
    address: "120 Gulfwind Drive, Port Aransas, TX 78373",
    managingAuthority: "Pioneer Beach RV Resort",
    coordinates: { lat: 27.78494, lng: -97.09807 },
  },
  "gulf-waters-beach-front-rv-resort": {
    summary: "Gulf Waters Beach Front RV Resort on Mustang Island combines spacious full-hookup RV sites with direct beach access, landscaped outdoor living areas, a temperature-controlled pool, laundry, Wi-Fi and resort amenities near Port Aransas.",
    bestSeason: "The resort promotes coastal stays throughout the year, but spring and fall usually provide milder outdoor conditions. Summer heat, peak beach traffic and tropical-weather risk make a current conditions check important before arrival.",
    entryNote: "Individual Gulf Waters sites are privately owned and site features can vary. Confirm the booked site class, rig fit, utility package, arrival window and current resort policies before travel.",
    highlights: [
      "Full-hookup RV sites with paved pads",
      "Private boardwalk access to the Gulf beach",
      "Heated and chilled resort pool",
      "High-speed Wi-Fi, laundry and activity facilities",
    ],
    body: [
      "Gulf Waters Beach Front RV Resort is a resort-style campground on Mustang Island between Corpus Christi and Port Aransas. The resort's current site describes spacious full-hookup RV sites with paved pads, patios and parking. Site classes range from Deluxe through Platinum, and the property notes that individual sites are privately owned, so outdoor furnishings and upgrades can differ even when the core utility package is comparable.",
      "The resort centers the stay on beach access and on-property amenities. A private boardwalk leads across the dunes to the Gulf, while the current amenity list includes a heated-and-chilled pool, activity space, high-speed Wi-Fi, laundry and reserved parking options for extra equipment. The landscaped layout and site-specific patios make this a different experience from a basic public campground or gravel overnight stop.",
      "Gulf Waters lists its location as 5601 Texas 361 in Port Aransas and publishes coordinates of 27.760964, -97.1167964 in its official directions. Travelers using the Port Aransas ferry should check current ferry conditions before towing a large rig. Texas Defined's present hero is explicitly labeled representative editorial imagery, so this profile remains noindex until the governed image gate is cleared.",
    ],
    officialUrl: "https://gulfwaters.com/port-aransas-rv-resort/",
    sourceCheckedAt: "2026-09-14",
    address: "5601 Texas 361, Port Aransas, TX 78373",
    managingAuthority: "Gulf Waters Beach Front RV Resort",
    coordinates: { lat: 27.760964, lng: -97.1167964 },
  },
  "jamaica-beach-rv-resort": {
    summary: "Jamaica Beach RV Resort on Galveston Island has more than 180 pull-through RV sites with full hookups and 30/50-amp service, plus a large collection of family recreation amenities a short distance from the Gulf beach.",
    bestSeason: "The resort supports coastal trips in every season, but individual pools and water attractions can have seasonal schedules. Spring and fall are milder; summer heat and tropical-weather conditions should be checked before travel.",
    entryNote: "The resort advertises pull-through sites with full hookups and 30/50-amp service. Confirm the reserved site, RV length fit, current amenity availability, check-in instructions and any minimum-stay rules before arrival.",
    highlights: [
      "More than 180 spacious RV sites",
      "Pull-through full-hookup sites with 30/50-amp service",
      "Pools, lazy river and family recreation amenities",
      "Short access to the Gulf beach on Galveston Island",
    ],
    body: [
      "Jamaica Beach RV Resort is a large private campground on the west side of Galveston Island. The operator currently advertises 181 spacious RV sites and describes the property as a short trip from the Gulf beach. Its site information highlights pull-through RV layouts with full hookups, level concrete pads and both 30- and 50-amp electrical service, making the campground oriented toward developed RV stays rather than primitive coastal camping.",
      "The resort is designed as a destination property as much as a place to park an RV. Current operator materials advertise more than 36 amenities, including multiple water and family-recreation features, with the lazy river and pool areas among the property's signature attractions. Because amenity schedules and maintenance closures can change, travelers should verify which facilities will be operating during their booked dates instead of assuming every feature is always available.",
      "The resort lists its address as 17200 Termini-San Luis Pass Road in Galveston. Its location provides access to Jamaica Beach and the west end of Galveston Island while keeping campers outside the densest central-island corridor. Texas Defined's current hero is still explicitly labeled representative AI editorial imagery, so the profile remains canonical noindex until it receives final governed location imagery.",
    ],
    officialUrl: "https://jamaicabeachrvresort.com/about-us/",
    sourceCheckedAt: "2026-09-14",
    address: "17200 Termini-San Luis Pass Road, Galveston, TX 77554",
    managingAuthority: "Jamaica Beach RV Resort",
    coordinates: { lat: 29.1795, lng: -94.98184 },
  },
};

export function applyRvParkCuratedPublicWave11(destination: Destination): Destination {
  const update = WAVE11[destination.slug as keyof typeof WAVE11];
  return update ? { ...destination, ...update } : destination;
}

export function applyRvParkCuratedPublicWave11List(destinations: readonly Destination[]): Destination[] {
  return destinations.map(applyRvParkCuratedPublicWave11);
}
