import type { Destination } from "../types";

export const RV_PARK_CURATED_PUBLIC_WAVE5_COUNT = 5;
export const RV_PARK_CURATED_PUBLIC_WAVE5_SLUGS = [
  "mission-tejas-state-park-rv-loop",
  "cooper-lake-state-park-rv-loops",
  "caprock-canyons-state-park-rv-loop",
  "abilene-state-park-rv-loop",
  "lake-colorado-city-state-park-rv-loop",
] as const;

type CuratedUpdate = Pick<Destination,
  "summary" | "bestSeason" | "entryNote" | "highlights" | "body" | "officialUrl" |
  "sourceCheckedAt" | "address" | "managingAuthority" | "coordinates"
>;

const TPWD = "Texas Parks and Wildlife Department";

const WAVE5: Record<(typeof RV_PARK_CURATED_PUBLIC_WAVE5_SLUGS)[number], CuratedUpdate> = {
  "mission-tejas-state-park-rv-loop": {
    summary: "Mission Tejas State Park near Grapeland has a compact Piney Woods campground with 15 campsites offering electricity and water plus two water-only sites, all near showers and the park's historic mission landscape.",
    bestSeason: "TPWD lists spring, summer and fall as the busy seasons; spring dogwood bloom and fall color add extra appeal, while summer camping requires heat planning.",
    entryNote: "TPWD says the park often reaches capacity and recommends reservations for camping and day use. Confirm the exact site type before arrival because 15 sites have electricity and water while two are water-only.",
    highlights: ["15 campsites with electricity and water", "Two water-only campsites", "8.5 miles of Piney Woods trails", "Historic mission and Rice family log home"],
    body: [
      "Mission Tejas State Park is a small, historically focused state-park campground at the north end of the Davy Crockett National Forest. TPWD lists 17 campsites in total: 15 with electricity and water and two with water only, with restrooms and showers nearby. That modest inventory makes it a better fit for travelers who reserve deliberately than for anyone expecting a large walk-up RV park.",
      "The park pairs camping with more than a place to sleep. Visitors can hike 8.5 miles of trails through tall pine forest, see the Civilian Conservation Corps-era representation of Mission Tejas, explore the Rice family log home and fish along San Pedro Creek. Spring dogwoods and later fall color give shoulder-season trips a strong reason to stay on property instead of treating the campground as a roadside overnight.",
      "TPWD says Mission Tejas often reaches capacity and recommends reservations for both camping and day use. Spring, summer and fall are listed as busy seasons. Before towing in, confirm the site class, current alerts and reservation status. Texas Defined uses an exact-location reusable image of Mission Tejas State Park property and treats TPWD as the controlling source for operating details.",
    ],
    officialUrl: "https://tpwd.texas.gov/state-parks/mission-tejas",
    sourceCheckedAt: "2026-09-13",
    address: "19343 State Highway 21 E., Grapeland, TX 75844",
    managingAuthority: TPWD,
    coordinates: { lat: 31.54194, lng: -95.233756 },
  },
  "cooper-lake-state-park-rv-loops": {
    summary: "Cooper State Park spreads RV camping across Doctors Creek and South Sulphur units, with 111 electric campsites in 30- and 50-amp classes plus separate walk-in, equestrian, cabin and shelter options.",
    bestSeason: "TPWD lists spring, summer and fall as the busy seasons. Cooler-season lake stays can be quieter, while summer trips should account for North Texas heat and storms.",
    entryNote: "TPWD highly recommends reservations because both units can reach capacity. Confirm which unit and loop you booked: Doctors Creek and South Sulphur have different site inventories, road approaches and electrical classes.",
    highlights: ["111 electric campsites across two units", "30- and 50-amp site classes", "Doctors Creek and South Sulphur campgrounds", "Fishing, paddling and lake access"],
    body: [
      "Cooper State Park operates as two separate camping units around Jim Chapman Lake, and RV travelers should plan around that split before arrival. TPWD lists 38 electric sites at Doctors Creek—two 50-amp and 36 30-amp—and 73 electric sites at South Sulphur—42 50-amp and 31 30-amp. That creates 111 electric campsites across the park, but the correct unit matters because each has its own entrance, map and campground layout.",
      "South Sulphur's Bright Star loop contains the large 50-amp inventory, while Deer Haven carries the 30-amp sites. Doctors Creek uses Liberty Grove for most of its 30-amp sites and has only two 50-amp sites. TPWD also lists walk-in campsites at South Sulphur that do not accommodate RVs, so a generic camping reservation should never be assumed to be RV-compatible without checking the actual site class.",
      "Both units support a lake-centered stay with fishing, paddling and other park recreation, and TPWD says the park often reaches capacity and highly recommends reservations. The agency lists spring, summer and fall as busy seasons. Texas Defined uses verified Cooper State Park imagery and directs travelers back to TPWD for current alerts, prices, site availability and unit-specific routing.",
    ],
    officialUrl: "https://tpwd.texas.gov/state-parks/cooper-lake",
    sourceCheckedAt: "2026-09-13",
    address: "95 Park Road 8154, Cooper, TX 75432",
    managingAuthority: TPWD,
    coordinates: { lat: 33.3487, lng: -95.663677 },
  },
  "caprock-canyons-state-park-rv-loop": {
    summary: "Caprock Canyons State Park & Trailway has 35 electric RV campsites in the Honey Flat area—10 with 50-amp service and 25 with 30-amp service—inside one of the Texas Panhandle's most dramatic canyon landscapes.",
    bestSeason: "TPWD lists spring, summer and fall as busy seasons, but extreme summer heat can exceed 110°F; cooler spring and fall dates are generally easier for hiking and campground time.",
    entryNote: "TPWD highly recommends reservations because the park can reach capacity. Honey Flat electric sites include water hookups; confirm 30- versus 50-amp service and review current bison, weather and trail alerts before arrival.",
    highlights: ["35 electric Honey Flat campsites", "10 sites with 50-amp service", "25 sites with 30-amp service", "Bison, canyon trails and Lake Theo"],
    body: [
      "Caprock Canyons State Park & Trailway gives RV travelers a developed campground inside a landscape better known for red-rock canyons and the Texas State Bison Herd. TPWD lists 10 Honey Flat campsites with 50-amp electricity and 25 more with 30-amp electricity. Both classes include water hookups, shade shelters and restrooms nearby, making Honey Flat the clear target for RV travelers who need conventional hookups.",
      "The park's conditions deserve more planning than a typical roadside campground. TPWD warns that summer air temperatures can climb above 110 degrees, and bison roam the park. Lake Theo, extensive canyon trails and the separate Caprock Canyons Trailway broaden the trip, but heat, storms and trail conditions can materially change what is practical during a stay.",
      "TPWD lists spring, summer and fall as busy seasons and says the park often reaches capacity, with reservations highly recommended for camping and day use. Before towing to Quitaque, confirm the exact electrical class, current park alerts and reservation. Texas Defined uses a licensed exact-location Caprock Canyons image and relies on TPWD for current operating and campsite details.",
    ],
    officialUrl: "https://tpwd.texas.gov/state-parks/caprock-canyons",
    sourceCheckedAt: "2026-09-13",
    address: "850 State Park Rd., Quitaque, TX 79255",
    managingAuthority: TPWD,
    coordinates: { lat: 34.410296, lng: -101.053264 },
  },
  "abilene-state-park-rv-loop": {
    summary: "Abilene State Park near Tuscola has 38 standard RV-capable full-hookup or electric campsites plus a 17-site 50-amp group trailer area, with lake, trail and historic Civilian Conservation Corps features nearby.",
    bestSeason: "TPWD lists March through November as the busy season. Spring and fall are usually the most comfortable for trails and camp life, while summer requires heat planning.",
    entryNote: "TPWD highly recommends reservations because the park often reaches capacity. Choose among three full-hookup sites, 35 standard electric sites and the separate 17-site group trailer/overflow area; maximum vehicle length in the group area is 40 feet.",
    highlights: ["Three full-hookup campsites", "35 standard electric campsites", "17-site 50-amp group trailer area", "Lake Abilene, trails and CCC history"],
    body: [
      "Abilene State Park has several distinct RV-capable camping products rather than one uniform loop. TPWD lists three full-hookup campsites with water, sewer and electricity; 15 electric sites in the Brushy Trail or Oak Grove areas; and 20 electric sites in Pecan Grove. Those 38 standard sites form the core RV inventory, with showers nearby.",
      "A separate 17-site Group Trailer Area is designed for RV groups or overflow use and provides water plus 50-amp service. TPWD notes that this area has less screening, scattered picnic tables and fire rings, showers about one-third mile away and a maximum vehicle length of 40 feet. Travelers should therefore book the site class that matches the trip rather than treating every electric campsite as equivalent.",
      "The park sits south of Abilene near Tuscola and combines camping with Lake Abilene, trails and Civilian Conservation Corps history. TPWD lists March through November as the busy season and says the park often reaches capacity, with reservations highly recommended. Texas Defined uses an exact-location reusable image of Abilene State Park and relies on TPWD for current fees, alerts and reservation details.",
    ],
    officialUrl: "https://tpwd.texas.gov/state-parks/abilene",
    sourceCheckedAt: "2026-09-13",
    address: "150 Park Road 32, Tuscola, TX 79562",
    managingAuthority: TPWD,
    coordinates: { lat: 32.240731, lng: -99.879139 },
  },
  "lake-colorado-city-state-park-rv-loop": {
    summary: "Lake Colorado City State Park has 78 electric campsites—including nine pull-through sites—plus 34 water-only campsites, creating a large West Texas overnight base between Abilene and Midland.",
    bestSeason: "TPWD lists Easter weekend through Labor Day as the busy season. Spring and fall are typically easier for outdoor time, while midsummer stays require heat planning.",
    entryNote: "TPWD recommends reservations because the park can reach capacity. Confirm whether your reservation is one of the nine pull-through electric sites, another electric site or a water-only site before towing in.",
    highlights: ["78 electric campsites", "Nine electric pull-through campsites", "34 water-only campsites", "Fishing, paddling and lake recreation"],
    body: [
      "Lake Colorado City State Park offers one of the larger public campground inventories in West Texas. TPWD lists nine pull-through campsites with electricity, water and shade shelters, plus 69 additional campsites with electricity and water. That gives RV travelers 78 electric options before counting the park's 34 water-only campsites.",
      "The park is south of Interstate 20 between Abilene and Midland, and the lake is the organizing feature of the trip. Fishing, swimming and paddling can be combined with camping, while restrooms with showers serve all camping loops. The pull-through inventory is limited compared with the rest of the campground, so longer rigs should target those sites intentionally rather than assuming every electric site has the same geometry.",
      "TPWD says the park often reaches capacity and recommends reservations for camping and day use. Easter weekend through Labor Day is listed as the busy season, and late arrivals after the 10 p.m. gate closing require advance instructions from the park office. Texas Defined uses licensed exact-location park imagery and defers to TPWD for current alerts, fees, lake conditions and site availability.",
    ],
    officialUrl: "https://tpwd.texas.gov/state-parks/lake-colorado-city",
    sourceCheckedAt: "2026-09-13",
    address: "4582 FM 2836, Colorado City, TX 79512",
    managingAuthority: TPWD,
    coordinates: { lat: 32.318219, lng: -100.936476 },
  },
};

export function applyRvParkCuratedPublicWave5(destination: Destination): Destination {
  const update = WAVE5[destination.slug as keyof typeof WAVE5];
  return update ? { ...destination, ...update } : destination;
}

export function applyRvParkCuratedPublicWave5List(destinations: readonly Destination[]): Destination[] {
  return destinations.map(applyRvParkCuratedPublicWave5);
}
