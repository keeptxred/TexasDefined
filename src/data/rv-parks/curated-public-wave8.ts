import type { Destination } from "../types";

export const RV_PARK_CURATED_PUBLIC_WAVE8_COUNT = 5;
export const RV_PARK_CURATED_PUBLIC_WAVE8_SLUGS = [
  "lost-maples-state-natural-area-rv-campground",
  "mckinney-falls-state-park-rv-loop",
  "padre-island-national-seashore-malaquite-campground",
  "ratcliff-lake-recreation-area-rv-sites",
  "cagle-recreation-area-rv-loop",
] as const;

type CuratedUpdate = Pick<Destination,
  "summary" | "bestSeason" | "entryNote" | "highlights" | "body" | "officialUrl" |
  "sourceCheckedAt" | "address" | "managingAuthority" | "coordinates"
>;

const TPWD = "Texas Parks and Wildlife Department";
const NPS = "National Park Service";
const USFS = "U.S. Forest Service";

const WAVE8: Record<(typeof RV_PARK_CURATED_PUBLIC_WAVE8_SLUGS)[number], CuratedUpdate> = {
  "lost-maples-state-natural-area-rv-campground": {
    summary: "Lost Maples State Natural Area near Vanderpool has 30 drive-up campsites with water and 30-amp electricity, pairing RV camping with the Sabinal River, rugged Hill Country trails and the park's famous fall color.",
    bestSeason: "TPWD lists October through November and March through May as busy seasons. Fall foliage draws especially heavy demand, while spring brings wildflowers; reservations are important during both periods.",
    entryNote: "TPWD lists 30 electric campsites with water hookups, 30-amp service and back-in RV parking. Cell service is not available in the natural area, and October-November capacity can fill daily, so reserve and download directions before arrival.",
    highlights: [
      "30 campsites with water and 30-amp electricity",
      "Back-in RV parking with showers nearby",
      "More than 10 miles of rugged Hill Country trails",
      "Sabinal River scenery and seasonal bigtooth maple color",
    ],
    body: [
      "Lost Maples State Natural Area is a small, high-demand Hill Country camping destination where RV travelers get a developed campsite without losing the feel of a protected natural area. TPWD lists 30 drive-up campsites with water and 30-amp electrical hookups, back-in RV parking, picnic tables, fire rings, shade shelters and restrooms with showers nearby. The same park also has primitive hike-in camping, so RV travelers should make sure the reservation is for the electric campground rather than a backcountry area.",
      "The reason to stay here is the landscape. Lost Maples protects Uvalde bigtooth maples along the Sabinal River and has more than 10 miles of trails through steep canyon country, including routes that climb to high overlooks. Autumn foliage is the best-known draw, but TPWD also highlights spring wildflowers, birding, fishing, stargazing and year-round scenery. Trail terrain can be steep and rugged, and visitors are required to stay on designated trails to protect sensitive roots and habitat.",
      "The park address is 37221 F.M. 187 in Vanderpool, five miles north of town. TPWD lists the headquarters at 29.807719, -99.570697 and warns that cell service is unavailable. October and November are especially crowded and can reach capacity daily; March through May is also a busy period. Confirm current alerts, campsite availability and trail conditions before towing in. Texas Defined's current hero is clearly labeled representative editorial imagery rather than documentary campground photography.",
    ],
    officialUrl: "https://tpwd.texas.gov/state-parks/lost-maples",
    sourceCheckedAt: "2026-09-13",
    address: "37221 F.M. 187, Vanderpool, TX 78885",
    managingAuthority: TPWD,
    coordinates: { lat: 29.807719, lng: -99.570697 },
  },
  "mckinney-falls-state-park-rv-loop": {
    summary: "McKinney Falls State Park in Austin has 81 campsites with water and electricity, including 12 sites with 50/30/20-amp service, plus Onion Creek swimming, hiking and biking inside the city limits.",
    bestSeason: "TPWD lists March through November as the busy season. Spring and fall are especially useful for combining campground time with trails and Onion Creek, while summer trips require heat and creek-condition planning.",
    entryNote: "TPWD says the park often reaches capacity and highly recommends reservations. The campground has 69 sites with 30/20-amp service and 12 with 50/30/20-amp service, all with water; choose the electrical class that matches the rig.",
    highlights: [
      "81 campsites with water and electricity",
      "12 sites with 50/30/20-amp hookups",
      "69 sites with 30/20-amp hookups",
      "Onion Creek falls, swimming, hiking and biking inside Austin",
    ],
    body: [
      "McKinney Falls State Park is an unusually convenient RV base because the campground is inside Austin while still functioning as a full state-park trip. TPWD lists 81 campsites with water and electricity: 12 have 50/30/20-amp hookups and 69 have 30/20-amp hookups. Both site classes include picnic tables, tent pads and nearby restrooms with showers, so the main RV planning decision is electrical capacity and exact site availability rather than whether basic campground utilities are present.",
      "Onion Creek and the park's limestone falls define the visit. TPWD highlights hiking, mountain and road biking, fishing, swimming, geocaching, bouldering and the historic remains of Thomas McKinney's homestead. Creek conditions can change after rainfall, so swimming plans should follow current park guidance rather than assuming the water is always safe or accessible. The park is also close enough to central Austin to combine outdoor time with city museums, food and music without relocating the RV.",
      "The park is at 5808 McKinney Falls Parkway in Austin. TPWD places headquarters at 30.180752, -97.722007, lists March through November as the busy season and says the park often reaches capacity. Reservations are strongly recommended for both camping and day use. Review active alerts and confirm the booked electrical class before arrival. Texas Defined's hero is labeled representative editorial imagery until a rights-cleared documentary campground image is available.",
    ],
    officialUrl: "https://tpwd.texas.gov/state-parks/mckinney-falls",
    sourceCheckedAt: "2026-09-13",
    address: "5808 McKinney Falls Parkway, Austin, TX 78744",
    managingAuthority: TPWD,
    coordinates: { lat: 30.180752, lng: -97.722007 },
  },
  "padre-island-national-seashore-malaquite-campground": {
    summary: "Malaquite Campground at Padre Island National Seashore has 48 tent-and-RV sites about 100 yards from the Gulf, with no site hookups but nearby freshwater filling, an RV dump station, restrooms and cold-water showers.",
    bestSeason: "The campground is open year-round, but coastal heat, wind, tides and storm conditions can change quickly. Cooler fall-through-spring trips are often easier for outdoor time; always check current NPS alerts and weather before travel.",
    entryNote: "NPS does not accept campground reservations: Malaquite is first-come, first-served and requires a self-issued camping permit. There are no electric or water hookups at sites; a freshwater fill and RV dump station are outside the campground entrance.",
    highlights: [
      "48 tent-and-RV campsites near the Gulf",
      "First-come, first-served year-round camping",
      "Freshwater fill and RV dump station near the entrance",
      "Vehicle-free Malaquite Beach access by the visitor center",
    ],
    body: [
      "Malaquite Campground is the most straightforward developed RV option inside Padre Island National Seashore for travelers who do not need hookups. NPS lists 48 sites for tents and RVs about 100 yards from the Gulf, with flush toilets, running water and cold-water showers in the campground area. No electric or water hookups are available at individual sites, but a freshwater filling station and RV dump station sit just outside the campground entrance.",
      "Camping operates on a first-come, first-served basis and NPS does not accept reservations. Campers complete a self-issued permit and pay at the campground kiosk, and an entrance pass valid for the overnight dates is also required. The campground is open year-round unless an alert says otherwise. Malaquite Beach itself is closed to public vehicle driving, which gives campground visitors a different beach experience from the national seashore's drive-on beach sections farther south.",
      "Use 20420 Park Road 22 in Corpus Christi for the nearby Malaquite Visitor Center; NPS gives its coordinates as 27.42425, -97.29908 and notes that some GPS systems misplace the street address. Cellular service in the national seashore is limited and coastal flooding or hazardous weather can temporarily affect camping, so check current conditions before leaving paved services behind. Texas Defined's hero is explicitly labeled representative editorial imagery rather than a documentary campsite photograph.",
    ],
    officialUrl: "https://www.nps.gov/pais/planyourvisit/malaquite_campground.htm",
    sourceCheckedAt: "2026-09-13",
    address: "20420 Park Road 22, Corpus Christi, TX 78418",
    managingAuthority: NPS,
    coordinates: { lat: 27.42425, lng: -97.29908 },
  },
  "ratcliff-lake-recreation-area-rv-sites": {
    summary: "Ratcliff Lake Recreation Area in Davy Crockett National Forest has 56 campsites around a 45-acre lake, with electric RV-capable sites in Dogwood Loop plus swimming, fishing and trail access.",
    bestSeason: "Camping is offered year-round. Spring and fall usually provide the easiest temperatures for hiking and campsite time; summer travelers should plan for East Texas heat and humidity and check current lake and fire conditions.",
    entryNote: "Recreation.gov lists a mix of reservable and first-come sites. Dogwood Loop includes electric sites and can accommodate larger RVs on selected pads, so verify the exact site's hookup and length details before arrival.",
    highlights: [
      "56 campsites in Davy Crockett National Forest",
      "Electric RV-capable sites in Dogwood Loop",
      "45-acre Ratcliff Lake with swimming and fishing",
      "Access to the Four C National Recreation Trail",
    ],
    body: [
      "Ratcliff Lake Recreation Area is a developed Forest Service campground built around a 45-acre lake in Davy Crockett National Forest. Recreation.gov lists 56 campsites, with a mix of reservable and first-come inventory. Dogwood Loop contains electric sites and selected pads can accommodate RVs up to roughly 50 feet; site-specific listings should control because hookup details and usable lengths vary across the loop.",
      "The campground is part of a larger recreation area rather than only a place to park an RV. The lake has a designated swim area, fishing piers and a boat ramp, while the surrounding forest supports hiking and wildlife viewing. Three trails connect at the recreation area, including the 20-mile Four C National Recreation Trail. The Forest Service also notes the site's Civilian Conservation Corps history, dating the recreation area to 1936.",
      "The Forest Service places Ratcliff Lake at 31.3835, -95.1533, east of Crockett on State Highway 7, with the Davy Crockett National Forest district office at 18551 State Highway 7 East in Kennard. Camping is available year-round, but travelers should confirm current reservation status, electrical service, vehicle length and any fire or lake restrictions for the specific site. Texas Defined's hero remains clearly labeled representative editorial imagery.",
    ],
    officialUrl: "https://www.fs.usda.gov/r08/texas/recreation/ratcliff-lake-936-655-2299",
    sourceCheckedAt: "2026-09-13",
    address: "18551 State Highway 7 East, Kennard, TX 75847",
    managingAuthority: USFS,
    coordinates: { lat: 31.3835, lng: -95.1533 },
  },
  "cagle-recreation-area-rv-loop": {
    summary: "Cagle Recreation Area in Sam Houston National Forest offers two wooded campground loops with full-service RV hookups beside Lake Conroe, plus hot showers, a boat ramp and trail access north of Houston.",
    bestSeason: "Federal campground guidance describes September through May as moderate to cool and June through August as hot and humid. Spring wildflowers and cooler fall weather are especially useful for combining camping with trails and lake time.",
    entryNote: "Cagle has two developed loops with RV-capable sites and full-service hookups. Site dimensions vary, and current reservation listings should be checked for exact rig length, hookup configuration, availability and any active fire restrictions before arrival.",
    highlights: [
      "Two full-service campground loops",
      "Water and 30/50-amp service on many RV-capable sites",
      "Hot showers and flush-restroom facilities",
      "Lake Conroe boat ramp, fishing and nearby forest trails",
    ],
    body: [
      "Cagle Recreation Area is a developed U.S. Forest Service campground on Lake Conroe in Sam Houston National Forest. Recreation.gov describes two campground loops with full-service hookups, restrooms with flush toilets and hot showers, and RV-capable sites whose individual listings commonly include water and 30/50-amp electricity. Because driveway length and hookup details vary by site, travelers should use the live reservation listing for the final rig-fit decision rather than treating every pad as identical.",
      "The campground works as a lake-and-forest base. Cagle has a boat ramp with trailer parking, fishing access, hiking and bicycle trails, and a picnic area overlooking Lake Conroe. The two-mile Cagle Trail is on site, while the broader Sam Houston National Forest trail system and portions of the Lone Star Hiking Trail are nearby. Recreation.gov notes that swimming is not allowed at Cagle, so water plans should focus on boating, fishing and shoreline use allowed by current rules.",
      "Cagle is reached from FM 1375 west of New Waverly; the federal listing uses 394 FM 1375 West, New Waverly, TX 77358 as the contact address. Texas Parks and Wildlife survey coordinates place the public Cagle boat-ramp area at about 30.518659, -95.591728. Confirm current site availability, fire restrictions and campground notices before travel because operating rules can change. Texas Defined's hero is labeled representative editorial imagery rather than documentary campground photography.",
    ],
    officialUrl: "https://www.recreation.gov/camping/campgrounds/234004",
    sourceCheckedAt: "2026-09-13",
    address: "Cagle Recreation Area, FM 1375 W, New Waverly, TX 77358",
    managingAuthority: USFS,
    coordinates: { lat: 30.518659, lng: -95.591728 },
  },
};

export function applyRvParkCuratedPublicWave8(destination: Destination): Destination {
  const update = WAVE8[destination.slug as keyof typeof WAVE8];
  return update ? { ...destination, ...update } : destination;
}

export function applyRvParkCuratedPublicWave8List(destinations: readonly Destination[]): Destination[] {
  return destinations.map(applyRvParkCuratedPublicWave8);
}
