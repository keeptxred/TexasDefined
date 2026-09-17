import type { Destination } from "../types";

export const RV_PARK_CURATED_PUBLIC_WAVE7_COUNT = 5;
export const RV_PARK_CURATED_PUBLIC_WAVE7_SLUGS = [
  "big-bend-national-park-cottonwood-campground",
  "big-bend-national-park-rio-grande-village-rv-park",
  "hueco-tanks-state-park-rv-sites",
  "fort-griffin-state-historic-site-rv-loop",
  "davis-mountains-state-park-rv-loop",
] as const;

type CuratedUpdate = Pick<Destination,
  "summary" | "bestSeason" | "entryNote" | "highlights" | "body" | "officialUrl" |
  "sourceCheckedAt" | "address" | "managingAuthority" | "coordinates"
>;

const NPS = "National Park Service";
const TPWD = "Texas Parks and Wildlife Department";
const THC = "Texas Historical Commission";

const WAVE7: Record<(typeof RV_PARK_CURATED_PUBLIC_WAVE7_SLUGS)[number], CuratedUpdate> = {
  "big-bend-national-park-cottonwood-campground": {
    summary: "Cottonwood Campground is Big Bend National Park's quiet, reservation-only dry campground near Castolon and Santa Elena Canyon, with RV-capable gravel sites but no hookups, dump station or generator use.",
    bestSeason: "Late fall through early spring is the practical camping window. NPS currently lists Cottonwood as closed for the summer season and reopening November 1, while Recreation.gov warns that spring and summer temperatures can exceed 100°F.",
    entryNote: "Reservations are required and individual sites use a short booking window. This is dry camping: there are no hookups, no fill or dump station and generators are prohibited, so verify the current seasonal opening before towing into the park.",
    highlights: ["Reservation-only Big Bend campground", "RV-capable dry camping with no hookups", "Cottonwood shade near the Rio Grande", "Convenient to Castolon and Santa Elena Canyon"],
    body: [
      "Cottonwood Campground is a remote, low-development camping option in the western side of Big Bend National Park. Recreation.gov describes the individual sites as dirt or gravel sites that can accommodate tents, trailers and many RVs, while emphasizing that the campground has no electric, water or sewer hookups, no fill station and no dump station. Potable water and vault toilets are available in the campground, but generators are not allowed.",
      "The location is one of Cottonwood's biggest advantages. The campground sits near the Castolon Historic District, Santa Elena Canyon and the southern end of the Ross Maxwell Scenic Drive, making it a useful base for the park's western attractions. Mature cottonwoods provide shade in parts of the campground, but site dimensions and overhead branches vary, so larger rigs should check the exact reserved site's equipment limits rather than assuming every space fits the same vehicle.",
      "NPS currently lists Cottonwood as closed for the summer season and says it will reopen November 1. Reservations are required and there is no first-come, first-served camping. The campground is reached deep inside Big Bend, and Recreation.gov specifically warns travelers not to follow GPS routing onto rough Old Maverick Road unless they have an appropriate high-clearance four-wheel-drive vehicle. Check current park conditions before departure because seasonal access can change.",
    ],
    officialUrl: "https://www.nps.gov/bibe/planyourvisit/cottonwood_campground.htm",
    sourceCheckedAt: "2026-09-13",
    address: "Cottonwood Campground, Big Bend National Park, TX 79834",
    managingAuthority: NPS,
    coordinates: { lat: 29.1369, lng: -103.5222 },
  },
  "big-bend-national-park-rio-grande-village-rv-park": {
    summary: "Rio Grande Village RV Campground is Big Bend National Park's 25-site, concession-operated RV campground with full water, electric and sewer hookups, all-back-in sites and a 38-foot maximum RV length.",
    bestSeason: "November through March is the most comfortable season for this low-elevation campground. NPS says winter highs are typically in the mid-70s to low 80s, while April through September can exceed 100°F.",
    entryNote: "Reservations are required through the park concessioner. All 25 sites are back-in, tents are not permitted and NPS lists a 38-foot RV maximum, so confirm current availability and operating details before arriving.",
    highlights: ["25 full-hookup RV sites", "Water, electric and sewer at each RV site", "Only full-hookup campground inside Big Bend National Park", "Adjacent Rio Grande Village store and services"],
    body: [
      "Rio Grande Village RV Campground is the only campground inside Big Bend National Park with full RV hookups. NPS lists 25 RV-only sites with water, electricity and sewer connections. The campground is an open paved lot with grassy, tree-lined edges beside the Rio Grande Village store, and every site is back-in rather than pull-through.",
      "The campground works best for travelers who value hookups and access to the east side of the park over a secluded campsite layout. The nearby village area includes a camp store, coin-operated showers and laundry, and the surrounding park area provides access toward Boquillas Canyon, Hot Springs and the Rio Grande Village Nature Trail. NPS notes that the campground is open year-round but has little or no cellular service.",
      "Reservations are required through the concessioner, and NPS lists a maximum RV length of 38 feet. Summer heat is a major planning factor: the official campground page warns that daily highs from April through September can exceed 100°F, while winter is much milder. Check current Big Bend alerts, road conditions and concessioner reservation details before the long drive into the park.",
    ],
    officialUrl: "https://www.nps.gov/bibe/planyourvisit/rgv_hookups.htm",
    sourceCheckedAt: "2026-09-13",
    address: "Rio Grande Village RV Campground, Big Bend National Park, TX 79834",
    managingAuthority: "National Park Service / Aramark concessioner",
    coordinates: { lat: 29.183169, lng: -102.963812 },
  },
  "hueco-tanks-state-park-rv-sites": {
    summary: "Hueco Tanks State Park & Historic Site near El Paso has 20 tightly managed campsites, including 16 with 50-amp electricity and water, in a protected desert landscape known for rock art and climbing.",
    bestSeason: "Fall through spring is the most comfortable window for desert camping and climbing. TPWD lists winter and holiday weekends as the busy season, so reservations are especially important then.",
    entryNote: "Camping reservations must be made by phone. TPWD limits reservations to three consecutive days, requires orientation before camping, and asks campers to arrive during office hours; electric sites are back-in with water and 50-amp service but no sewer hookup.",
    highlights: ["16 campsites with water and 50-amp electricity", "4 additional water-only campsites", "Back-in RV sites with a dump station in the campground", "Protected rock-art landscape and world-class bouldering"],
    body: [
      "Hueco Tanks is an unusually controlled camping environment because the campground sits inside a culturally sensitive state park and historic site. TPWD lists 16 campsites with water and 50-amp electricity plus four water-only campsites. The electric sites are back-in, single-vehicle-width spaces with drive lengths that vary by site, and there are no sewer hookups at individual campsites.",
      "The park is known for natural rock basins, ancient pictographs and internationally recognized bouldering, but those resources also drive strict access rules. TPWD limits visitation in protected areas, requires an orientation video before camping or entering the self-guided area, and uses both guided and self-guided access systems. Campers should plan around those preservation rules rather than treating the park like an ordinary open-access campground.",
      "The park is at 6900 Hueco Tanks Road No. 1 in El Paso. Reservations for campsites are handled by phone and are limited to three consecutive days, with possible extensions only if space is available. TPWD asks campers to arrive during office hours for check-in and notes that after-hours movement is restricted except for emergencies. Review the current alert banner and reservation instructions before traveling.",
    ],
    officialUrl: "https://tpwd.texas.gov/state-parks/hueco-tanks",
    sourceCheckedAt: "2026-09-13",
    address: "6900 Hueco Tanks Road No. 1, El Paso, TX 79938",
    managingAuthority: TPWD,
    coordinates: { lat: 31.926453, lng: -106.042437 },
  },
  "fort-griffin-state-historic-site-rv-loop": {
    summary: "Fort Griffin State Historic Site north of Albany combines a 33-site campground with full-hookup and water-electric RV options, frontier fort ruins, dark-sky programs and the Official State of Texas Longhorn Herd.",
    bestSeason: "Spring and fall are comfortable choices for combining camping with the fort grounds and trails. The Texas Historical Commission notes that campground reservations fill quickly during the summer months.",
    entryNote: "Campsites are reserved directly with Fort Griffin by phone or email, and camping fees are charged in addition to daily site admission. Confirm the exact hookup class and current availability when reserving.",
    highlights: ["33-site historic-site campground", "Full-hookup and water-electric RV options", "Fort Griffin frontier military ruins", "Official State of Texas Longhorn Herd and dark-sky setting"],
    body: [
      "Fort Griffin State Historic Site offers overnight camping on nearly five acres beside one of Texas's best-known frontier fort sites. The Texas Historical Commission lists 33 campsites and provides RV choices that include full-hookup sites as well as water-and-electric sites. Campsites include a concrete-pad picnic area with a fire ring and outdoor grill, and the campground has restroom and shower facilities.",
      "The camping area is only part of the reason to stay. Visitors can explore the remains and interpretation of the U.S. Army post established in 1867, see the Official State of Texas Longhorn Herd, hike and attend living-history or dark-sky programs when scheduled. That makes Fort Griffin a stronger overnight stop than a generic roadside RV park because the historical site itself supplies a full day of context and activity.",
      "Fort Griffin is at 1701 N. U.S. Highway 283 north of Albany. The Texas Historical Commission takes campground reservations directly by phone or email and warns that summer reservations can fill quickly. Camping charges are separate from daily admission, so travelers should confirm the current campsite class, fee and arrival procedure before towing in.",
    ],
    officialUrl: "https://thc.texas.gov/state-historic-sites/fort-griffin/fort-griffin-campgrounds",
    sourceCheckedAt: "2026-09-13",
    address: "1701 N. U.S. Hwy. 283, Albany, TX 76430",
    managingAuthority: THC,
    coordinates: { lat: 32.926111, lng: -99.233611 },
  },
  "davis-mountains-state-park-rv-loop": {
    summary: "Davis Mountains State Park near Fort Davis has 26 full-hookup campsites and 34 additional electric campsites, giving RV travelers a developed base for high-desert trails, scenic drives and dark-sky nights.",
    bestSeason: "Fall through spring is especially comfortable for hiking and campground time, while TPWD lists March through Labor Day as the park's busy season. Reservations are recommended because the park often reaches capacity.",
    entryNote: "Choose the correct campsite class when reserving: TPWD lists 26 full-hookup sites with water, sewer and 30/50-amp service plus 34 electric sites with water and 20/30-amp service. Check active alerts before arrival.",
    highlights: ["26 full-hookup campsites", "34 additional water-and-electric campsites", "High-desert hiking and mountain biking", "CCC history, scenic overlooks and dark-sky viewing"],
    body: [
      "Davis Mountains State Park gives RV travelers one of the more developed campground choices in far West Texas. TPWD lists 26 full-hookup campsites with water, sewer and both 30- and 50-amp electrical service, plus 34 additional campsites with water and 20/30-amp electricity. That range lets travelers choose between full utility service and a simpler electric campsite without leaving the park.",
      "The campground sits inside a high-desert mountain park with much more to do than overnight. TPWD highlights hiking, mountain biking, horseback riding, scenic driving, birding and stargazing, while trails such as Skyline Drive and the CCC Trail climb to overlooks and historic park structures. Limited cell service is part of the setting, so offline maps and advance planning are useful.",
      "The park entrance is on TX-118 N. at Park Road 3 near Fort Davis. TPWD says the park often reaches capacity and highly recommends reservations for both camping and day use, with March through Labor Day listed as the busy season. Review the current alert banner, campsite type and fire restrictions before travel, especially during dry or high-demand periods.",
    ],
    officialUrl: "https://tpwd.texas.gov/state-parks/davis-mountains",
    sourceCheckedAt: "2026-09-13",
    address: "TX-118 N., Park Rd. 3, Fort Davis, TX 79734",
    managingAuthority: TPWD,
    coordinates: { lat: 30.599103, lng: -103.92945 },
  },
};

export function applyRvParkCuratedPublicWave7(destination: Destination): Destination {
  const update = WAVE7[destination.slug as keyof typeof WAVE7];
  return update ? { ...destination, ...update } : destination;
}

export function applyRvParkCuratedPublicWave7List(destinations: readonly Destination[]): Destination[] {
  return destinations.map(applyRvParkCuratedPublicWave7);
}
