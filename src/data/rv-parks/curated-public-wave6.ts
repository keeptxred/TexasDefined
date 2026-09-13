import type { Destination } from "../types";

export const RV_PARK_CURATED_PUBLIC_WAVE6_COUNT = 5;
export const RV_PARK_CURATED_PUBLIC_WAVE6_SLUGS = [
  "daingerfield-state-park-rv-loop",
  "bob-sandlin-state-park-rv-loop",
  "purtis-creek-state-park-rv-loop",
  "ray-roberts-lake-state-park-rv-loops",
  "san-angelo-state-park-rv-loop",
] as const;

type CuratedUpdate = Pick<Destination,
  "summary" | "bestSeason" | "entryNote" | "highlights" | "body" | "officialUrl" |
  "sourceCheckedAt" | "address" | "managingAuthority" | "coordinates"
>;

const TPWD = "Texas Parks and Wildlife Department";

const WAVE6: Record<(typeof RV_PARK_CURATED_PUBLIC_WAVE6_SLUGS)[number], CuratedUpdate> = {
  "daingerfield-state-park-rv-loop": {
    summary: "Daingerfield State Park pairs a compact Piney Woods lake park with 40 full-hookup RV campsites—10 pull-through and 30 back-in—plus trails, paddling and fishing around 74-acre Little Pine Lake.",
    bestSeason: "Spring and fall are especially comfortable for campground and trail time; TPWD lists an average July high of 94°F and highlights spring blooms and fall color in the park's forest.",
    entryNote: "TPWD says the park often reaches capacity and highly recommends reservations. RV travelers should choose between the 10 pull-through and 30 back-in full-hookup sites and review current alerts before arrival.",
    highlights: ["40 full-hookup RV campsites", "10 pull-through full-hookup sites", "74-acre Little Pine Lake", "Piney Woods hiking, paddling and fishing"],
    body: [
      "Daingerfield State Park is a small East Texas state park where the developed RV campground, forest and lake are tightly connected. TPWD lists 10 full-hookup pull-through campsites and 30 full-hookup back-in campsites, all with water, sewer and electricity. That makes the park unusually straightforward for RV travelers who want full hookups without giving up a wooded state-park setting.",
      "Little Pine Lake is the center of the visit. TPWD describes a 74-acre lake used for swimming, boating, paddling and fishing, while the Rustling Leaves Trail circles the lake through the park's tall pines, oaks and dogwoods. The park also preserves Civilian Conservation Corps-era features, so a stay can combine campground time, water access and an easy Piney Woods day outdoors rather than functioning only as an overnight stop.",
      "The park address is 455 Park Road 17 in Daingerfield. TPWD says the park often reaches capacity and highly recommends advance reservations for both camping and day use. Check the current alert banner, campsite class, arrival instructions and any firewood restrictions before towing in. Texas Defined's current hero is clearly labeled as representative editorial imagery rather than documentary campground photography.",
    ],
    officialUrl: "https://tpwd.texas.gov/state-parks/daingerfield",
    sourceCheckedAt: "2026-09-13",
    address: "455 Park Road 17, Daingerfield, TX 75638",
    managingAuthority: TPWD,
    coordinates: { lat: 33.013, lng: -94.690587 },
  },
  "bob-sandlin-state-park-rv-loop": {
    summary: "Lake Bob Sandlin State Park near Pittsburg has 75 campsites with water and 30-amp electricity, with lake access, fishing, paddling and wooded trails in northeast Texas.",
    bestSeason: "TPWD lists March through October as the busy season. Spring and fall usually offer easier temperatures for trails and campsite time than the hottest part of summer.",
    entryNote: "TPWD says the park often reaches capacity and highly recommends reservations. Confirm the specific camping area, current alerts and late-arrival instructions before towing in; the gate closes at 10 p.m.",
    highlights: ["75 campsites with water and electricity", "30-amp electric hookups", "Lake fishing and paddling", "3.3 miles of wooded trails"],
    body: [
      "The Texas Defined seed calls this Bob Sandlin State Park RV Loop; the managing agency's current name is Lake Bob Sandlin State Park. TPWD lists 75 campsites with water and electricity, with 30-amp hookups, showers nearby and several camping areas spread through the wooded park. Nine of those sites sit along the lake's edge, so travelers who care about shoreline proximity should choose the exact site rather than assume every campsite has the same setting.",
      "The campground is part of a broader lake trip. TPWD highlights fishing from shore, pier or boat, kayak rentals, a boat ramp and 3.3 miles of wooded trails for hiking and biking. That makes the park a practical multi-night base for travelers who want outdoor time on property instead of driving elsewhere after setup.",
      "The park is at 341 State Park Road 2117 in Pittsburg, about 12 miles southwest of Mount Pleasant. TPWD lists March through October as the busy season, says the park often reaches capacity and highly recommends reservations for camping and day use. Late arrivals should contact the park during office hours for the gate code. Texas Defined uses clearly labeled representative editorial imagery until a rights-cleared documentary frame is available.",
    ],
    officialUrl: "https://tpwd.texas.gov/state-parks/lake-bob-sandlin",
    sourceCheckedAt: "2026-09-13",
    address: "341 State Park Road 2117, Pittsburg, TX 75686",
    managingAuthority: TPWD,
    coordinates: { lat: 33.053955, lng: -95.099155 },
  },
  "purtis-creek-state-park-rv-loop": {
    summary: "Purtis Creek State Park near Eustace combines an electric campground with a 355-acre fishing lake, paddling access and hiking and biking trails about an hour southeast of Dallas.",
    bestSeason: "TPWD lists March through November and every First Monday weekend as busy periods. Spring and fall generally provide the most comfortable mix of camping, fishing and trail weather.",
    entryNote: "TPWD recommends reservations because the park often reaches capacity. Its current campsite detail page lists electric sites with water hookups and showers nearby; verify the exact site inventory and active alerts when booking.",
    highlights: ["Electric campsites with water hookups", "355-acre fishing lake", "Paddling and kayak access", "Hiking and biking trails"],
    body: [
      "Purtis Creek State Park is a lake-focused East Texas campground near Eustace. TPWD's current campsite detail page lists 56 campsites with electricity, each with a water hookup, picnic table and nearby shower facilities. The park also has primitive hike-in camping, so RV travelers should make sure the reservation is specifically for an electric campsite rather than a primitive site.",
      "The 355-acre lake is a defining part of the stay. TPWD promotes bass, catfish and crappie fishing, paddling, swimming and a no-wake boating environment, and the park rents kayaks on a first-come basis. On land, the Wolfpen Hike and Bike Trail and shorter nature routes provide options that do not require leaving the park after the RV is set up.",
      "The park is at 14225 FM 316 N. in Eustace. TPWD lists March through November and every First Monday weekend as busy periods and recommends reservations because the park often reaches capacity. Review the current alert banner, reservation details and campsite listing before travel because facility counts and conditions can change. The Texas Defined hero is labeled as representative editorial imagery, not a documentary campsite photo.",
    ],
    officialUrl: "https://tpwd.texas.gov/state-parks/purtis-creek",
    sourceCheckedAt: "2026-09-13",
    address: "14225 FM 316 N., Eustace, TX 75124",
    managingAuthority: TPWD,
    coordinates: { lat: 32.353794, lng: -95.993554 },
  },
  "ray-roberts-lake-state-park-rv-loops": {
    summary: "Ray Roberts Lake State Park has more than 200 standard electric campsites across its Isle du Bois and Johnson Branch units, with 20/30/50-amp options, lake recreation and an extensive North Texas trail system.",
    bestSeason: "TPWD lists March through November as the busy season. Spring and fall are especially useful for combining campground stays with the park's long trail network and lake activities.",
    entryNote: "Choose the correct unit before arrival: Isle du Bois and Johnson Branch have separate entrances, addresses and campground inventories. TPWD says the park often reaches capacity and recommends reservations.",
    highlights: ["More than 200 standard electric campsites", "20/30/50-amp campsite options", "Isle du Bois and Johnson Branch camping units", "Lake recreation and 20-mile Greenbelt Corridor"],
    body: [
      "Ray Roberts Lake State Park is a multi-unit camping system rather than one simple campground. TPWD currently lists 13 standard electric sites with 20/30/50-amp service and 102 with 20/30-amp service at Isle du Bois, plus 11 standard 20/30/50-amp sites and 93 standard 20/30-amp sites at Johnson Branch. That puts the two main camping units above 200 standard electric campsites before separate equestrian and double-site options are counted.",
      "The unit choice affects more than the campsite number. Isle du Bois and Johnson Branch have separate entrances and trail systems, while the larger park complex also includes lake access, swimming, paddling, fishing and the 20-mile multiuse Greenbelt Corridor toward Lake Lewisville. Travelers should decide which unit best fits the trip before routing an RV to the park instead of treating the complex as a single entrance.",
      "Texas Defined uses the Isle du Bois headquarters at 100 PW 4137 in Pilot Point as the primary address for this profile; Johnson Branch is at 100 PW 4153 in Valley View. TPWD lists March through November as the busy season and recommends reservations because the park often reaches capacity. Review active alerts, unit-specific directions and the exact electrical class before travel. The current hero is labeled representative editorial imagery rather than documentary campground photography.",
    ],
    officialUrl: "https://tpwd.texas.gov/state-parks/ray-roberts-lake",
    sourceCheckedAt: "2026-09-13",
    address: "100 PW 4137, Pilot Point, TX 76258-8944",
    managingAuthority: TPWD,
    coordinates: { lat: 33.365671, lng: -97.01215 },
  },
  "san-angelo-state-park-rv-loop": {
    summary: "San Angelo State Park offers several electric camping areas near O.C. Fisher Reservoir, including 40 Red Arroyo sites and 11 Bald Eagle sites plus group and equestrian electric camping options.",
    bestSeason: "TPWD lists spring and summer as the busy season; spring and fall usually offer the most comfortable temperatures for the park's long trail network and open West Texas campsites.",
    entryNote: "TPWD recommends reservations because the park often reaches capacity. Check which camping area you booked: Red Arroyo, Bald Eagle, Chaparral and the equestrian area have different rules and hookup configurations.",
    highlights: ["40 Red Arroyo electric campsites", "11 Bald Eagle electric campsites", "Additional group and equestrian electric camping", "50 miles of multiuse trails"],
    body: [
      "San Angelo State Park has multiple developed camping areas rather than one uniform RV loop. TPWD lists 40 electric sites in Red Arroyo with water and 30/50-amp service and 11 more electric sites in Bald Eagle with water and 30/50-amp service. The park also lists 20 electric sites in the Chaparral group area and 10 electric equestrian sites in North Concho, each with separate use rules, so the campsite category matters when planning an RV stay.",
      "The park extends well beyond the campground. TPWD describes 50 miles of multiuse trails between the North and South units for hiking, mountain biking and horseback riding, along with fishing, boating and paddling at O.C. Fisher Reservoir and the Concho River. Bison and longhorn viewing areas add another reason to spend time inside the park instead of treating the campsite only as a base for San Angelo.",
      "The primary park address is 362 S. FM 2288 in San Angelo. TPWD lists spring and summer as the busy season and recommends reservations because the park often reaches capacity. The North Shore entrance has separate access instructions, so travelers should confirm their camping area, gate procedure and active alerts before towing in. Texas Defined's current hero is explicitly labeled representative editorial imagery.",
    ],
    officialUrl: "https://tpwd.texas.gov/state-parks/san-angelo",
    sourceCheckedAt: "2026-09-13",
    address: "362 S. FM 2288, San Angelo, TX 76901",
    managingAuthority: TPWD,
    coordinates: { lat: 31.463922, lng: -100.508038 },
  },
};

export function applyRvParkCuratedPublicWave6(destination: Destination): Destination {
  const update = WAVE6[destination.slug as keyof typeof WAVE6];
  return update ? { ...destination, ...update } : destination;
}

export function applyRvParkCuratedPublicWave6List(destinations: readonly Destination[]): Destination[] {
  return destinations.map(applyRvParkCuratedPublicWave6);
}
