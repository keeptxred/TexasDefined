import type { Destination, SearchDocument } from "../types";

export const RV_PARK_CURATED_PUBLIC_WAVE4_COUNT = 6;
export const RV_PARK_CURATED_PUBLIC_WAVE4_SLUGS = [
  "inks-lake-state-park-rv-loop",
  "sea-rim-state-park-rv-sites",
  "goose-island-state-park-rv-loop",
  "mustang-island-state-park-rv-loops",
  "martin-creek-lake-state-park-rv-area",
  "atlanta-state-park-rv-loop",
] as const;

type CuratedUpdate = Pick<Destination,
  "summary" | "bestSeason" | "entryNote" | "highlights" | "body" | "officialUrl" |
  "sourceCheckedAt" | "address" | "managingAuthority" | "coordinates"
>;

const TPWD = "Texas Parks and Wildlife Department";

const WAVE4: Record<(typeof RV_PARK_CURATED_PUBLIC_WAVE4_SLUGS)[number], CuratedUpdate> = {
  "inks-lake-state-park-rv-loop": {
    summary: "Inks Lake State Park pairs a large Hill Country campground with reliable lake access near Burnet, including 114 reservable RV-capable sites with water and 30/50-amp electricity plus a separate water-only camping area.",
    bestSeason: "Spring, summer and fall are the park's busiest seasons; cooler shoulder-season stays can be easier to schedule, while summer trips need heat planning.",
    entryNote: "TPWD says the park often reaches capacity and recommends advance reservations. Confirm the exact campsite category before towing in: electric sites have water and 30/50-amp service, while the water-only loop limits RVs to under 26 feet and does not allow generators.",
    highlights: ["114 RV-capable electric campsites", "30/50-amp service with water hookups", "Lake swimming, paddling and fishing", "Hill Country base near Burnet"],
    body: [
      "Inks Lake State Park is one of the stronger public RV-camping anchors in the Highland Lakes because the campground and the lake are part of the same managed state-park trip. TPWD lists 114 campsites with electricity for up to eight people, each with a water hookup and 30/50-amp electrical service, with showers nearby. A separate 42-site water-only area allows one RV under 26 feet per site and prohibits generators, so travelers should choose the site class that actually matches their rig and power needs.",
      "The park is west of Burnet on Park Road 4 and TPWD identifies spring, summer and fall as busy seasons. The agency says Inks Lake often reaches capacity and highly recommends reservations for camping and day use. That matters for RV travelers because arriving without a confirmed site can be difficult to recover from on a busy weekend; confirm the reservation, loop, electrical service and vehicle restrictions before the final drive into the park.",
      "The camping trip can be built around the lake rather than treating the RV site as a standalone overnight stop. Swimming, paddling, fishing and the park's granite-and-lake scenery make it possible to stay on property for much of the visit. Conditions, fees and individual site rules can change, so Texas Defined treats TPWD's current park and campsite pages as the controlling source and uses a licensed photograph of Inks Lake State Park property rather than generic campground imagery.",
    ],
    officialUrl: "https://tpwd.texas.gov/state-parks/inks-lake",
    sourceCheckedAt: "2026-09-13",
    address: "3480 Park Road 4 West, Burnet, TX 78611",
    managingAuthority: TPWD,
    coordinates: { lat: 30.740432, lng: -98.365439 },
  },
  "sea-rim-state-park-rv-sites": {
    summary: "Sea Rim State Park offers 15 electric RV-capable campsites beside Gulf beach and coastal marsh habitat near Sabine Pass, with water hookups and 30/50-amp electrical service in the Piping Plover loop.",
    bestSeason: "April through July is TPWD's busy season; cooler months can be comfortable for birding and marsh exploration, while every season requires a weather and beach-condition check.",
    entryNote: "TPWD recommends reservations because the park can reach capacity. Electric sites have water and 30/50-amp hookups; beach primitive sites are a separate, non-reservable option and may close because of high tides or other weather events.",
    highlights: ["15 electric campsites by beach access", "30/50-amp service with water hookups", "Gulf beach and marsh habitat", "Birding, paddling and fishing"],
    body: [
      "Sea Rim State Park is a distinctive public RV stop because it places a small serviced campground between Gulf beach and coastal marsh rather than inside a conventional inland park. TPWD lists 15 campsites with electricity in the Piping Plover loop next to beach access and the dune boardwalk. Each of those sites includes a water hookup and 50/30-amp electrical service, with the campground positioned for beach time, paddling, fishing and wildlife viewing.",
      "The park's coastal setting makes current conditions unusually important. TPWD notes that beach conditions vary seasonally, alligators live in the park, mosquitoes can be a year-round issue and State Highway 87 remains closed between Sea Rim and High Island. Primitive drive-up beach camping is a separate product from the electric loop and can close during extreme high tides or other weather events, so RV travelers should not assume that beach camping availability says anything about a reservable electric site.",
      "Sea Rim sits south of Port Arthur near Sabine Pass, and TPWD identifies April through July as the busy season. The agency recommends reservations for camping and day use because the park can reach capacity. Before departure, confirm the electric-site reservation, latest park alerts, coastal weather, beach conditions and access route. Texas Defined uses a licensed image of Sea Rim State Park property and relies on TPWD for current operating details rather than inferring conditions from older trip reports.",
    ],
    officialUrl: "https://tpwd.texas.gov/state-parks/sea-rim",
    sourceCheckedAt: "2026-09-13",
    address: "19335 S. Gulfway Drive, Sabine Pass, TX 77655",
    managingAuthority: TPWD,
    coordinates: { lat: 29.676156, lng: -94.044008 },
  },
  "goose-island-state-park-rv-loop": {
    summary: "Goose Island State Park near Rockport combines bayfront and wooded RV camping, including 40 bayfront electric sites, 53 wooded electric sites and a small set of full-hookup campsites.",
    bestSeason: "TPWD lists several busy periods: Memorial Day through Labor Day, October through Thanksgiving, and January through April. Reserve early for waterfront or seasonal stays.",
    entryNote: "TPWD recommends advance reservations because the park often reaches capacity. Bayfront sites have water and 20/30/50-amp electricity; wooded electric sites have water and power, while the limited full-hookup sites are not reservable in advance and require a park availability check.",
    highlights: ["40 bayfront electric campsites", "53 wooded electric campsites", "Limited full-hookup sites", "Fishing and birding near Rockport"],
    body: [
      "Goose Island State Park gives RV travelers two very different campground settings on the same property. TPWD lists 40 electric campsites in the Bayfront loop, most on the waterfront or just across the road, with water hookups and 20/30/50-amp electrical service. The Wooded Area adds 53 electric campsites among large oak trees with water and power, creating an alternative for travelers who prefer shade and a more sheltered campground feel.",
      "The park also has a very limited set of premium full-hookup sites in the wooded area, including sewer connections, but TPWD says those sites are not reservable in advance and travelers should contact the park for availability. That distinction matters when planning for a longer rig or a stay that depends on sewer service. The standard bayfront and wooded electric sites are the more predictable reservation targets, and current site details should be checked before towing to Rockport.",
      "Goose Island is best treated as a coastal nature-and-fishing base rather than simply a place to park an RV. The park is known for bay access, fishing and birding, and TPWD identifies multiple busy seasons across the year. Because capacity pressure can be high, confirm the exact site class, arrival plan and current alerts before travel. Texas Defined uses licensed Goose Island State Park imagery and defers to TPWD for changing campsite availability, fees and operating rules.",
    ],
    officialUrl: "https://tpwd.texas.gov/state-parks/goose-island",
    sourceCheckedAt: "2026-09-13",
    address: "202 S. Palmetto St., Rockport, TX 78382-7965",
    managingAuthority: TPWD,
    coordinates: { lat: 28.133503, lng: -96.98428 },
  },
  "mustang-island-state-park-rv-loops": {
    summary: "Mustang Island State Park provides 48 reservable electric campsites about 400 yards from the Gulf, each with water and 50-amp service, plus a separate primitive beach-camping option.",
    bestSeason: "Spring and summer are TPWD's busy seasons. Fall and winter can bring lighter crowds, but Gulf wind, tides and weather should be checked before every coastal camping trip.",
    entryNote: "TPWD highly recommends reservations because the park often reaches capacity. The 48 electric campsites have water and 50-amp service; primitive beach sites are separate, non-reservable and may close because of weather conditions.",
    highlights: ["48 electric campsites", "Water and 50-amp hookups", "About 400 yards from the Gulf", "Separate primitive beach camping"],
    body: [
      "Mustang Island State Park is a practical public RV base for a Gulf Coast trip because its reservable campground is close to the beach without putting the electric sites directly on the sand. TPWD lists 48 campsites with electricity, water hookups and 50-amp service. The sites sit behind the dunes roughly 400 yards from the water and have restrooms with showers nearby, giving travelers a more conventional campground setup than the park's primitive beach option.",
      "TPWD also lists 50 primitive drive-up beach campsites along a 1.5-mile stretch of beach. Those sites are non-reservable, lack the electric-site amenities and may close because of weather conditions, so they should not be treated as interchangeable with the 48 electric campsites. Travelers with larger rigs or specific power requirements should reserve the electric campground and confirm any vehicle or site limitations before arrival.",
      "The park often reaches capacity, and TPWD highly recommends reservations for both camping and day use. Spring and summer are the busiest seasons, while Gulf weather can affect beach conditions at any time of year. Before towing onto the island, confirm current park alerts, the electric-site reservation and road conditions. Texas Defined uses licensed Mustang Island imagery and relies on TPWD for current rules rather than assuming that older beach-camping information remains valid.",
    ],
    officialUrl: "https://tpwd.texas.gov/state-parks/mustang-island",
    sourceCheckedAt: "2026-09-13",
    address: "9394 State Highway 361, Corpus Christi, TX 78418",
    managingAuthority: TPWD,
    coordinates: { lat: 27.672162, lng: -97.175309 },
  },
  "martin-creek-lake-state-park-rv-area": {
    summary: "Martin Creek Lake State Park near Tatum has a substantial East Texas electric campground with 13 lakefront 30-amp sites, six 50-amp sites and 37 additional 30-amp sites, all with water hookups.",
    bestSeason: "Spring and summer are TPWD's busy seasons. Cooler fall and winter dates can suit hiking and fishing, while summer stays require heat and storm planning.",
    entryNote: "TPWD recommends reservations because the park can reach capacity. Electric campsites use several Bee Tree and Broken Bowl loops with 30- or 50-amp service and water; confirm the exact loop and electrical class for your rig before arrival.",
    highlights: ["56 electric campsites across three site classes", "Lakefront 30-amp sites", "Water hookups at electric sites", "Fishing and East Texas lake access"],
    body: [
      "Martin Creek Lake State Park offers a larger electric-camping inventory than its quiet East Texas setting might suggest. TPWD lists 13 lakefront 30-amp electric sites in the Bee Tree loop, six 50-amp electric sites in the same loop and 37 additional 30-amp electric sites split between Bee Tree and Broken Bowl. Those electric sites include water hookups, picnic tables and fire rings with grills, with showers nearby.",
      "Because the campground has multiple electrical classes and loops, the reservation should match the RV rather than simply selecting the first available campsite. Travelers who want a lakefront position need to target the 13 designated lakefront sites; travelers who require 50-amp service have a much smaller six-site inventory. TPWD notes that the park can reach capacity and recommends reservations for camping and day use, especially during its spring and summer busy season.",
      "The park sits southeast of Longview near Tatum and works well as a fishing, paddling and lakeside camping stop in the Piney Woods. Weather and lake conditions can change, and the campground's mix of site types makes pre-arrival verification worthwhile. Texas Defined uses licensed Martin Creek Lake State Park imagery and treats TPWD's current campsite and park pages as the controlling source for amenities, fees and reservation details.",
    ],
    officialUrl: "https://tpwd.texas.gov/state-parks/martin-creek-lake",
    sourceCheckedAt: "2026-09-13",
    address: "9515 County Road 2181D, Tatum, TX 75691-3425",
    managingAuthority: TPWD,
    coordinates: { lat: 32.27795, lng: -94.566051 },
  },
  "atlanta-state-park-rv-loop": {
    summary: "Atlanta State Park on Wright Patman Lake offers a broad mix of RV-capable sites, including full-hookup 30- and 50-amp campsites plus additional electric sites with water in several campground areas.",
    bestSeason: "Summer is TPWD's listed busy season; spring and fall can be comfortable for lake and trail time, while every trip should account for East Texas rain and heat.",
    entryNote: "TPWD says the park often reaches capacity and highly recommends reservations. Choose carefully between full-hookup 30/50-amp sites and water-plus-electric sites; pull-through and back-in configurations vary by campground area.",
    highlights: ["14 full-hookup campsites", "44 additional electric campsites", "30- and 50-amp options", "Wright Patman Lake recreation"],
    body: [
      "Atlanta State Park has one of the more varied public RV inventories in this curation wave. TPWD lists eight 50-amp full-hookup campsites and six 30-amp full-hookup campsites in the Knights Bluff Camping Area, each with water and sewer. The park also has six 50-amp electric sites with water and 38 30-amp electric sites with water spread across Knights Bluff, Wilkins Creek and White Oak Ridge.",
      "The mix of pull-through and back-in sites means rig fit should be checked at the specific reservation level. Knights Bluff's 50-amp full-hookup sites are pull-through, while its 30-amp full-hookup sites are back-in. Other electric sites vary by camping area. TPWD notes that the park often reaches capacity and highly recommends reservations, so travelers who need a particular electrical service, sewer hookup or site geometry should lock in that exact class before departure.",
      "The park sits northwest of Atlanta on Wright Patman Lake and can serve as an East Texas base for fishing, paddling and shaded campground time. Summer is the listed busy season, and spring rain or summer heat can change the feel of the trip. Texas Defined uses licensed Atlanta State Park imagery and relies on TPWD's current park and campsite pages for operating rules, prices, alerts and reservation details.",
    ],
    officialUrl: "https://tpwd.texas.gov/state-parks/atlanta",
    sourceCheckedAt: "2026-09-13",
    address: "927 Park Road 42, Atlanta, TX 75551",
    managingAuthority: TPWD,
    coordinates: { lat: 33.230731, lng: -94.249693 },
  },
};

export function applyRvParkCuratedPublicWave4(destination: Destination): Destination {
  const update = WAVE4[destination.slug as keyof typeof WAVE4];
  return update ? { ...destination, ...update } : destination;
}

export function applyRvParkCuratedPublicWave4List(destinations: readonly Destination[]): Destination[] {
  return destinations.map(applyRvParkCuratedPublicWave4);
}

export function buildRvParkSearchDocumentsFromCuratedDestinations(destinations: readonly Destination[]): SearchDocument[] {
  const collection: SearchDocument = {
    id: "collection:rv-parks",
    brandId: "texasdefined",
    kind: "collection",
    title: "Texas RV Parks & Campgrounds",
    summary: "Browse 250 Texas RV parks, campgrounds and public RV camping areas by region, town and county.",
    keywords: ["Texas RV parks", "Texas campgrounds", "RV camping Texas", "RV parks by county", "RV parks by region"],
    href: "/explore/rv-parks",
  };
  return [
    collection,
    ...destinations.map((destination): SearchDocument => ({
      id: `rv-park:${destination.slug}`,
      brandId: "texasdefined",
      kind: "guide",
      title: destination.name,
      summary: destination.summary,
      keywords: [destination.name, destination.nearestTown, ...(destination.county ? [`${destination.county} County`] : []), "RV park", "campground", "Texas RV camping"],
      href: `/destination/${destination.slug}`,
    })),
  ];
}
