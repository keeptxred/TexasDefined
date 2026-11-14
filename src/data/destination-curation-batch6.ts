import type { Destination } from "./types";

const TPWD = "Texas Parks and Wildlife Department";
const curated: Record<string, Partial<Destination>> = {
  "bastrop-state-park": {
    visitorFacts: [
      { topic: "admission", label: "Daily entrance fee", detail: "Adults 13 and older pay $5; children 12 and younger enter free.", sourceUrl: "https://tpwd.texas.gov/state-parks/bastrop", checkedAt: "2026-10-21" },
      { topic: "hours", label: "Park gate and interpretive center", detail: "Park open daily 6 a.m.–10 p.m. Interpretive Center is normally open Friday–Sunday, 8:30 a.m.–4:30 p.m.; hours can vary.", sourceUrl: "https://tpwd.texas.gov/state-parks/bastrop", checkedAt: "2026-10-21" },
    ],
    summary: "A historic Lost Pines park east of Austin where CCC stonework, loblolly pine forest and an evolving wildfire-recovery landscape frame hiking, camping and a scenic connection to Buescher State Park.",
    nearestTown: "Bastrop", bestSeason: "Fall through spring for hiking and camping", entryNote: "Trail conditions can change with wildfire recovery and severe weather; check current closures before visiting.",
    highlights: ["Lost Pines loblolly forest", "CCC-built cabins and stone architecture", "Hiking through a visible wildfire-recovery landscape", "Scenic Park Road 1C connection toward Buescher State Park"],
    body: ["Bastrop State Park protects an unusual island of loblolly pine forest far west of the main East Texas pine belt. The Lost Pines give the park an identity unlike the surrounding Central Texas landscape.", "Historic Civilian Conservation Corps cabins and stone structures remain central to the park, while the forest also tells a modern story of wildfire damage and recovery. Trails pass through areas where young pines and open views reveal that change directly.", "Pairing Bastrop with nearby Buescher State Park creates one of the region's strongest two-park itineraries. Check trail and road alerts before departure because weather and recovery work can affect access."],
    managingAuthority: TPWD, officialUrl: "https://tpwd.texas.gov/state-parks/bastrop",
  },
  "blanco-state-park": {
    visitorFacts: [
      { topic: "admission", label: "Daily entrance fee", detail: "Adults 13 and older pay $5; children 12 and younger enter free.", sourceUrl: "https://tpwd.texas.gov/state-parks/blanco", checkedAt: "2026-10-21" },
      { topic: "reservations", label: "Day-use pass required", detail: "TPWD instructs visitors to reserve entrance passes online or through its customer service center before visiting.", sourceUrl: "https://tpwd.texas.gov/state-parks/blanco", checkedAt: "2026-10-21" },
    ],
    summary: "A small Hill Country park wrapped around a mile of the Blanco River, with limestone dams, swimming, fishing, paddling and shaded picnic areas within walking distance of downtown Blanco.",
    nearestTown: "Blanco", bestSeason: "Late spring through early fall for river time; fall and spring for picnics and fishing", entryNote: "River recreation depends on flow and water conditions. Check swimming notices and park alerts before arrival.",
    highlights: ["Blanco River swimming and wading", "Historic limestone river dams", "Fishing and paddling", "Easy access from downtown Blanco"],
    body: ["Blanco State Park is unusually woven into its town. The park follows the Blanco River immediately south of downtown, making it possible to combine a river afternoon with the courthouse square and local shops without a long drive.", "Low limestone dams create broad pools that define the park's look and support swimming, fishing and paddling when conditions cooperate. Large trees and picnic areas make the riverbank as important as the water itself.", "Because the park is river-dependent, check current flow, swimming status and weather before building a trip around getting in the water."],
    managingAuthority: TPWD, officialUrl: "https://tpwd.texas.gov/state-parks/blanco",
  },
  "copper-breaks-state-park": {
    visitorFacts: [
      { topic: "admission", label: "Daily entrance fee", detail: "Visitors 13 and older pay $3; children 12 and younger enter free.", sourceUrl: "https://tpwd.texas.gov/state-parks/copper-breaks", checkedAt: "2026-10-21" },
      { topic: "hours", label: "Daily park hours", detail: "The park is open daily from 7 a.m. to 10 p.m.", sourceUrl: "https://tpwd.texas.gov/state-parks/copper-breaks", checkedAt: "2026-10-21" },
    ],
    summary: "Quiet red-earth breaks and rolling prairie near Quanah, known for dark skies, rugged short trails, Lake Copper Breaks and a landscape tied to the history of the Texas Longhorn herd.",
    nearestTown: "Quanah", bestSeason: "Fall through spring; clear moonless nights are best for stargazing", entryNote: "Summer heat can be severe and services are limited. Carry water and check astronomy-event and park schedules in advance.",
    highlights: ["International Dark Sky setting and astronomy programs", "Red-earth breaks and prairie trails", "Lake Copper Breaks fishing and paddling", "Texas Longhorn history"],
    body: ["Copper Breaks trades grand canyon scale for quiet. Eroded red soils, mesquite and open prairie create a landscape that feels remote quickly, especially once daylight fades.", "Dark skies are a major reason to stay after sunset. The park hosts astronomy programming, while daytime visitors can hike, fish, paddle and explore the breaks around the lake.", "Plan for exposure rather than distance: shade is limited, summer temperatures can be punishing and nighttime conditions can change quickly. Bring water and check the event calendar if stargazing is the goal."],
    managingAuthority: TPWD, officialUrl: "https://tpwd.texas.gov/state-parks/copper-breaks",
  },
  "devils-sinkhole-state-natural-area": {
    visitorFacts: [
      { topic: "access", label: "Tour-only access", detail: "The natural area is not open for independent walk-in access. All visitors must join a reserved guided tour departing the visitor center in Rocksprings; entering the cavern is prohibited.", sourceUrl: "https://tpwd.texas.gov/state-parks/devils-sinkhole", checkedAt: "2026-10-21" },
      { topic: "reservations", label: "Reserve bat-viewing tours", detail: "Reservations are required through the Devil's Sinkhole Society at 830-683-2287; its reservation line operates Wednesday–Sunday, 10 a.m.–3 p.m.", sourceUrl: "https://tpwd.texas.gov/state-parks/devils-sinkhole", checkedAt: "2026-10-21" },
      { topic: "admission", label: "Evening bat-flight tour prices", detail: "Officially listed evening tour prices: adults $14, seniors 65 and older $11, children 4–12 $6; children under 4 are free. Morning tours have separate rates.", sourceUrl: "https://tpwd.texas.gov/state-parks/devils-sinkhole", checkedAt: "2026-10-21" },
    ],
    summary: "A protected Edwards Plateau sinkhole near Rocksprings where one of Texas' major Mexican free-tailed bat colonies can pour from a deep vertical cavern on seasonal evening tours.",
    nearestTown: "Rocksprings", bestSeason: "Late spring through early fall for seasonal bat emergence tours", entryNote: "Access is controlled and generally requires a scheduled tour; do not drive to the natural area expecting ordinary walk-in park access.",
    highlights: ["Seasonal Mexican free-tailed bat emergence", "Deep vertical limestone sinkhole", "Guided access protecting a sensitive natural site", "Edwards Plateau night-sky setting"],
    body: ["Devil's Sinkhole is not a conventional state park. The centerpiece is a massive vertical cavern opening that shelters a seasonal colony of Mexican free-tailed bats, and protecting that habitat shapes how visitors experience the site.", "Evening bat tours can culminate in thousands of bats spiraling from the sinkhole to feed after sunset. The spectacle varies with season, weather and the colony's behavior, so no wildlife viewing is guaranteed.", "Plan this destination around an official reservation rather than simply navigating to the gate. Follow tour instructions closely and confirm meeting locations and seasonal schedules before making the drive."],
    managingAuthority: TPWD, officialUrl: "https://tpwd.texas.gov/state-parks/devils-sinkhole",
  },
  "fort-parker-state-park": {
    visitorFacts: [
      { topic: "admission", label: "Daily entrance fee", detail: "Adults 13 and older pay $5; children 12 and younger enter free.", sourceUrl: "https://tpwd.texas.gov/state-parks/fort-parker", checkedAt: "2026-10-21" },
      { topic: "hours", label: "Park gate versus office", detail: "The park is open daily 6 a.m.–10 p.m.; headquarters office hours are 8:30 a.m.–4:30 p.m.", sourceUrl: "https://tpwd.texas.gov/state-parks/fort-parker", checkedAt: "2026-10-21" },
    ],
    summary: "A CCC-built Limestone County state park on Fort Parker Lake and the Navasota River, where fishing and camping require special attention to low-water ramp warnings, closed fishing piers and 2026–27 park construction.",
    nearestTown: "Mexia", bestSeason: "Spring and fall for wooded trails and permitted campsite stays; paddling and fishing require current lake and river conditions",
    entryNote: "TPWD's Sept. 25, 2026 alert says motorized lake launches are not recommended due to low water, and both fishing piers remain listed closed. A July 2026 burn ban and roadwork through May 2027 can affect overnight visits.",
    highlights: ["Fort Parker Lake fishing and the separate Navasota River launch", "CCC-built 1939 dam and historic Springfield cemetery", "Designated state-park camping, shelters and rustic cabins", "Limestone Bluffs Paddling Trail and distinct three-acre Lake Springfield"],
    body: [
      "Fort Parker State Park surrounds Fort Parker Lake on the Navasota River, not the smaller spring-fed Lake Springfield also inside the park. TPWD's fisheries assessment says the lake's upper two-thirds are generally unnavigable from sedimentation. The September 25, 2026 park alert explicitly advises against launching motorized boats because water at the ramp is low. The lake ramp and separate Navasota River ramp must not be treated as interchangeable deep-water launches.",
      "Fishing for channel/blue catfish and crappie can be worthwhile, but TPWD's Jan. 7, 2025 notice lists both fishing piers as closed; use other permitted shoreline or water access and confirm current conditions. The park offers reserveable water-electric and water-only tent campsites, shelters and basic cabins, with a July 28, 2026 burn ban prohibiting ash-producing wood or charcoal fires while appropriate containerized fuel stoves remain permitted.",
      "African-American Civilian Conservation Corps workers developed the park from 1935–1942; TPWD's park history dates the dam's completion to 1939 and opening to 1941. Springfield Cemetery and CCC landmarks are park heritage features, whereas Old Fort Parker is a separate nearby historic property. TxDOT road resurfacing from October 2026 through May 2027 and Nature Center renovations can temporarily close campsites or trails, so review TPWD's current park-alert and official reservation pages before arriving."
    ],
    managingAuthority: TPWD, officialUrl: "https://tpwd.texas.gov/state-parks/fort-parker",
  },
  "galveston-island-state-park": {
    visitorFacts: [
      { topic: "admission", label: "Daily entrance fee", detail: "Adults 13 and older pay $5; children 12 and younger enter free.", sourceUrl: "https://tpwd.texas.gov/state-parks/galveston-island", checkedAt: "2026-10-21" },
      { topic: "reservations", label: "Capacity-sensitive day use", detail: "The park is open daily, but it often fills during March–October weekends. TPWD recommends reserving day-use passes and camping in advance to guarantee entry.", sourceUrl: "https://tpwd.texas.gov/state-parks/galveston-island", checkedAt: "2026-10-21" },
    ],
    summary: "A barrier-island park spanning Gulf beach and Galveston Bay habitats, where paddling trails, birding, fishing and restored coastal prairie show both sides of the island beyond the city's seawall.",
    nearestTown: "Galveston", bestSeason: "Fall through spring for birding and mild weather; summer for beach recreation with heat precautions", entryNote: "Coastal weather, tides and storms can change conditions quickly. Reserve busy dates and check beach, paddling and weather alerts.",
    highlights: ["Gulf-side beach access", "Galveston Bay paddling trails", "Coastal prairie, marsh and bird habitat", "Fishing and island camping"],
    body: ["Galveston Island State Park shows the island as an ecosystem rather than only a beach town. The property reaches across barrier-island habitats, connecting Gulf shoreline with bay-side marsh, prairie and shallow water.", "Paddling trails are among the best ways to understand the bay side, while birding can be exceptional during migration. Gulf access adds swimming, surf fishing and beach time to the same itinerary.", "Wind, heat, tides and thunderstorms matter on both sides of the island. Check coastal forecasts and park alerts, and reserve ahead for popular weekends and camping dates."],
    managingAuthority: TPWD, officialUrl: "https://tpwd.texas.gov/state-parks/galveston-island",
  },
  "goliad-state-park-and-historic-site": {
    visitorFacts: [
      { topic: "admission", label: "Daily entrance fee", detail: "Adults 13 and older pay $4; children 12 and younger enter free.", sourceUrl: "https://tpwd.texas.gov/state-parks/goliad", checkedAt: "2026-10-21" },
      { topic: "hours", label: "Park and historic buildings", detail: "Park hours are daily 8 a.m.–10 p.m.; headquarters and the historic buildings open 8:30 a.m.–4:30 p.m.", sourceUrl: "https://tpwd.texas.gov/state-parks/goliad", checkedAt: "2026-10-21" },
    ],
    summary: "A South Texas history park centered on Mission Espíritu Santo, with restored Spanish colonial architecture, museum exhibits and a San Antonio River setting tied to the broader Goliad story.",
    nearestTown: "Goliad", bestSeason: "Fall through spring for comfortable walking and regional history touring", entryNote: "Allow time for nearby Goliad historic sites beyond the state park; hours and admission can differ by property.",
    highlights: ["Mission Espíritu Santo reconstruction", "Spanish colonial and Indigenous history", "San Antonio River setting", "Gateway to the wider Goliad historic district"],
    body: ["Goliad State Park is anchored by Mission Espíritu Santo, where reconstructed stone walls and interpretive exhibits make the Spanish mission era tangible. The site also requires attention to the Indigenous communities whose lives were transformed by the mission system.", "The San Antonio River and park grounds provide a quieter outdoor setting around the historic core, while the town and nearby sites expand the story into the Texas Revolution and nineteenth century.", "Do not rush Goliad as a single-building stop. Check hours for the surrounding historic properties and build enough time to understand how the mission, presidio, town and revolutionary sites connect."],
    managingAuthority: TPWD, officialUrl: "https://tpwd.texas.gov/state-parks/goliad",
  },
  "hill-country-state-natural-area": {
    visitorFacts: [
      { topic: "admission", label: "Daily entrance fee", detail: "Adults 13 and older pay $6; children 12 and younger enter free.", sourceUrl: "https://tpwd.texas.gov/state-parks/hill-country", checkedAt: "2026-10-21" },
      { topic: "hours", label: "Office hours", detail: "The natural area is open daily. Office hours are 8:15 a.m.–4:45 p.m.", sourceUrl: "https://tpwd.texas.gov/state-parks/hill-country", checkedAt: "2026-10-21" },
      { topic: "access", label: "Trail and backcountry access", detail: "Trails and backcountry campsites may close after rain or poor weather. Confirm the current TPWD trail status before setting out.", sourceUrl: "https://tpwd.texas.gov/state-parks/hill-country", checkedAt: "2026-10-21" },
    ],
    summary: "A rugged former ranch near Bandera preserved for backcountry hiking, horseback riding and primitive camping across limestone ridges, grasslands and creek valleys with minimal developed recreation.",
    nearestTown: "Bandera", bestSeason: "Fall through spring; summer heat makes exposed routes demanding", entryNote: "This is a natural area rather than a developed resort-style park. Carry water, download maps and expect limited services and rough trails.",
    highlights: ["Backcountry Hill Country trails", "Horseback riding and equestrian camping", "Primitive campsites", "Ranch landscape with limestone ridges and open grassland"],
    body: ["Hill Country State Natural Area deliberately keeps development light. The former ranch landscape is crossed by a substantial trail network but offers fewer conveniences than many state parks, preserving a stronger backcountry character.", "Hikers and equestrians move through grasslands, rocky ridges and creek valleys, with primitive campsites extending trips beyond a day hike. Routes can be rough and exposed, and distances feel longer in hot weather.", "Bring navigation, ample water and realistic expectations about services. Check trail conditions and weather before arrival, particularly after heavy rain or during periods of extreme heat."],
    managingAuthority: TPWD, officialUrl: "https://tpwd.texas.gov/state-parks/hill-country",
  },
  "indian-lodge": {
    visitorFacts: [
      { topic: "admission", label: "Lodge entrance", detail: "TPWD lists no separate entrance fee at Indian Lodge. Overnight rooms are booked and priced separately.", sourceUrl: "https://tpwd.texas.gov/state-parks/indian-lodge", checkedAt: "2026-10-21" },
      { topic: "hours", label: "Lodge office and restaurant", detail: "Lodge office is open daily 6 a.m.–8 p.m.; the Black Bear Restaurant is open Thursday–Monday, 7 a.m.–2 p.m.", sourceUrl: "https://tpwd.texas.gov/state-parks/indian-lodge", checkedAt: "2026-10-21" },
      { topic: "access", label: "January 2027 closure", detail: "TPWD confirms Indian Lodge will be closed throughout January 2027. Its lodging directory also notes renovation closure; check current lodging operations before attempting to reserve any other dates.", sourceUrl: "https://tpwd.texas.gov/state-parks/indian-lodge/alert", checkedAt: "2026-10-21" },
    ],
    summary: "A white-adobe 1930s lodge built by the Civilian Conservation Corps inside Davis Mountains State Park, offering one of Texas' most distinctive overnight bases for mountain drives, trails and dark West Texas skies.",
    nearestTown: "Fort Davis", bestSeason: "Spring through fall for mountain exploration; winter can bring cold nights and occasional wintry weather", entryNote: "Indian Lodge is a historic hotel within Davis Mountains State Park, not a separate park. TPWD announces it is closed for all of January 2027 and its lodging directory carries a renovation notice. Confirm operations, rooms and any reservation availability with TPWD for your exact dates.",
    highlights: ["Historic CCC-built adobe lodge", "Davis Mountains setting", "Access to state-park trails and Skyline Drive", "Convenient base for Fort Davis and McDonald Observatory trips"],
    body: ["Indian Lodge is architecture, lodging and landscape in one stop. Civilian Conservation Corps crews built the pueblo-inspired adobe complex in the 1930s, and its white walls remain one of the most recognizable human-made landmarks in the Davis Mountains.", "Staying here puts visitors directly inside Davis Mountains State Park, making early trail starts and evening mountain views easy. Fort Davis National Historic Site and McDonald Observatory also fit naturally into a multi-day itinerary.", "Treat the lodge as a separately managed and sometimes unavailable historic lodging destination. TPWD specifically warns it will be closed throughout January 2027, and its statewide lodging directory also lists a renovation closure. Confirm operating status, any room availability and the live alert before traveling; the January 2027 closure is not a bookable stay."],
    managingAuthority: TPWD, officialUrl: "https://tpwd.texas.gov/state-parks/indian-lodge",
  },
};
export function applyCuratedDestinationBatch6(destination: Destination): Destination { const override = curated[destination.slug]; return override ? { ...destination, ...override, hero: override.hero ? { ...destination.hero, ...override.hero } : destination.hero } : destination; }
export function applyCuratedDestinationsBatch6(destinations: Destination[]): Destination[] { return destinations.map(applyCuratedDestinationBatch6); }
