import type { Destination } from "./types";

const TPWD = "Texas Parks and Wildlife Department";
const curated: Record<string, Partial<Destination>> = {
  "bastrop-state-park": {
    summary: "A historic Lost Pines park east of Austin where CCC stonework, loblolly pine forest and an evolving wildfire-recovery landscape frame hiking, camping and a scenic connection to Buescher State Park.",
    nearestTown: "Bastrop", bestSeason: "Fall through spring for hiking and camping", entryNote: "Trail conditions can change with wildfire recovery and severe weather; check current closures before visiting.",
    highlights: ["Lost Pines loblolly forest", "CCC-built cabins and stone architecture", "Hiking through a visible wildfire-recovery landscape", "Scenic Park Road 1C connection toward Buescher State Park"],
    body: ["Bastrop State Park protects an unusual island of loblolly pine forest far west of the main East Texas pine belt. The Lost Pines give the park an identity unlike the surrounding Central Texas landscape.", "Historic Civilian Conservation Corps cabins and stone structures remain central to the park, while the forest also tells a modern story of wildfire damage and recovery. Trails pass through areas where young pines and open views reveal that change directly.", "Pairing Bastrop with nearby Buescher State Park creates one of the region's strongest two-park itineraries. Check trail and road alerts before departure because weather and recovery work can affect access."],
    managingAuthority: TPWD, officialUrl: "https://tpwd.texas.gov/state-parks/bastrop",
  },
  "blanco-state-park": {
    summary: "A small Hill Country park wrapped around a mile of the Blanco River, with limestone dams, swimming, fishing, paddling and shaded picnic areas within walking distance of downtown Blanco.",
    nearestTown: "Blanco", bestSeason: "Late spring through early fall for river time; fall and spring for picnics and fishing", entryNote: "River recreation depends on flow and water conditions. Check swimming notices and park alerts before arrival.",
    highlights: ["Blanco River swimming and wading", "Historic limestone river dams", "Fishing and paddling", "Easy access from downtown Blanco"],
    body: ["Blanco State Park is unusually woven into its town. The park follows the Blanco River immediately south of downtown, making it possible to combine a river afternoon with the courthouse square and local shops without a long drive.", "Low limestone dams create broad pools that define the park's look and support swimming, fishing and paddling when conditions cooperate. Large trees and picnic areas make the riverbank as important as the water itself.", "Because the park is river-dependent, check current flow, swimming status and weather before building a trip around getting in the water."],
    managingAuthority: TPWD, officialUrl: "https://tpwd.texas.gov/state-parks/blanco",
  },
  "copper-breaks-state-park": {
    summary: "Quiet red-earth breaks and rolling prairie near Quanah, known for dark skies, rugged short trails, Lake Copper Breaks and a landscape tied to the history of the Texas Longhorn herd.",
    nearestTown: "Quanah", bestSeason: "Fall through spring; clear moonless nights are best for stargazing", entryNote: "Summer heat can be severe and services are limited. Carry water and check astronomy-event and park schedules in advance.",
    highlights: ["International Dark Sky setting and astronomy programs", "Red-earth breaks and prairie trails", "Lake Copper Breaks fishing and paddling", "Texas Longhorn history"],
    body: ["Copper Breaks trades grand canyon scale for quiet. Eroded red soils, mesquite and open prairie create a landscape that feels remote quickly, especially once daylight fades.", "Dark skies are a major reason to stay after sunset. The park hosts astronomy programming, while daytime visitors can hike, fish, paddle and explore the breaks around the lake.", "Plan for exposure rather than distance: shade is limited, summer temperatures can be punishing and nighttime conditions can change quickly. Bring water and check the event calendar if stargazing is the goal."],
    managingAuthority: TPWD, officialUrl: "https://tpwd.texas.gov/state-parks/copper-breaks",
  },
  "devils-sinkhole-state-natural-area": {
    summary: "A protected Edwards Plateau sinkhole near Rocksprings where one of Texas' major Mexican free-tailed bat colonies can pour from a deep vertical cavern on seasonal evening tours.",
    nearestTown: "Rocksprings", bestSeason: "Late spring through early fall for seasonal bat emergence tours", entryNote: "Access is controlled and generally requires a scheduled tour; do not drive to the natural area expecting ordinary walk-in park access.",
    highlights: ["Seasonal Mexican free-tailed bat emergence", "Deep vertical limestone sinkhole", "Guided access protecting a sensitive natural site", "Edwards Plateau night-sky setting"],
    body: ["Devil's Sinkhole is not a conventional state park. The centerpiece is a massive vertical cavern opening that shelters a seasonal colony of Mexican free-tailed bats, and protecting that habitat shapes how visitors experience the site.", "Evening bat tours can culminate in thousands of bats spiraling from the sinkhole to feed after sunset. The spectacle varies with season, weather and the colony's behavior, so no wildlife viewing is guaranteed.", "Plan this destination around an official reservation rather than simply navigating to the gate. Follow tour instructions closely and confirm meeting locations and seasonal schedules before making the drive."],
    managingAuthority: TPWD, officialUrl: "https://tpwd.texas.gov/state-parks/devils-sinkhole",
  },
  "devils-river-state-natural-area": {
    summary: "Remote spring-fed river country in Southwest Texas, protecting exceptionally clear Devils River water, rugged limestone canyons and primitive backcountry where access requires serious advance planning.",
    nearestTown: "Del Rio", bestSeason: "Spring and fall; summer heat is extreme and river conditions require careful planning", entryNote: "This is a remote natural area with limited access, rough roads and reservation requirements. Confirm unit, route, permits and river logistics before departure.",
    highlights: ["Clear spring-fed Devils River", "Remote limestone canyon and desert landscape", "Paddling and fishing with advance logistics", "Dark skies and primitive camping"],
    body: ["Devils River State Natural Area protects one of Texas' clearest and least-developed river corridors. Its remoteness is not marketing language: reaching the property and moving through it require more planning than a typical state-park day trip.", "The spring-fed river is the visual centerpiece, but paddling it involves access rules, distances and private-property considerations that must be understood in advance. On land, rugged limestone and desert vegetation reinforce the sense of isolation.", "Read current TPWD access instructions carefully, distinguish between park units and river access points, carry ample supplies and do not rely on cell service. This is a destination where preparation is part of the experience."],
    managingAuthority: TPWD, officialUrl: "https://tpwd.texas.gov/state-parks/devils-river",
  },
  "fort-parker-state-park": {
    summary: "A CCC-era Central Texas park on the Navasota River and Springfield Lake, with paddling, fishing, wooded trails and easy access to nearby Old Fort Parker history.",
    nearestTown: "Mexia", bestSeason: "Fall through spring for camping and trails; warm months suit paddling and swimming when conditions permit", entryNote: "Old Fort Parker is a separate historic site nearby; verify hours if combining both stops.",
    highlights: ["Springfield Lake paddling and fishing", "Navasota River environment", "CCC-built park structures", "Nearby Old Fort Parker historic site"],
    body: ["Fort Parker State Park combines a quiet lake-and-river setting with one of Central Texas' more layered historical landscapes. Civilian Conservation Corps construction shaped the park itself, while Old Fort Parker sits nearby as a separate historic destination.", "Springfield Lake supports paddling and fishing, and wooded trails provide an easy counterpoint to time on the water. The park's scale makes it comfortable for families and relaxed camping weekends.", "If history is part of the trip, check operating information for Old Fort Parker separately rather than assuming state-park admission covers it. Water conditions and seasonal weather should also be checked before arrival."],
    managingAuthority: TPWD, officialUrl: "https://tpwd.texas.gov/state-parks/fort-parker",
  },
  "galveston-island-state-park": {
    summary: "A barrier-island park spanning Gulf beach and Galveston Bay habitats, where paddling trails, birding, fishing and restored coastal prairie show both sides of the island beyond the city's seawall.",
    nearestTown: "Galveston", bestSeason: "Fall through spring for birding and mild weather; summer for beach recreation with heat precautions", entryNote: "Coastal weather, tides and storms can change conditions quickly. Reserve busy dates and check beach, paddling and weather alerts.",
    highlights: ["Gulf-side beach access", "Galveston Bay paddling trails", "Coastal prairie, marsh and bird habitat", "Fishing and island camping"],
    body: ["Galveston Island State Park shows the island as an ecosystem rather than only a beach town. The property reaches across barrier-island habitats, connecting Gulf shoreline with bay-side marsh, prairie and shallow water.", "Paddling trails are among the best ways to understand the bay side, while birding can be exceptional during migration. Gulf access adds swimming, surf fishing and beach time to the same itinerary.", "Wind, heat, tides and thunderstorms matter on both sides of the island. Check coastal forecasts and park alerts, and reserve ahead for popular weekends and camping dates."],
    managingAuthority: TPWD, officialUrl: "https://tpwd.texas.gov/state-parks/galveston-island",
  },
  "goliad-state-park-and-historic-site": {
    summary: "A South Texas history park centered on Mission Espíritu Santo, with restored Spanish colonial architecture, museum exhibits and a San Antonio River setting tied to the broader Goliad story.",
    nearestTown: "Goliad", bestSeason: "Fall through spring for comfortable walking and regional history touring", entryNote: "Allow time for nearby Goliad historic sites beyond the state park; hours and admission can differ by property.",
    highlights: ["Mission Espíritu Santo reconstruction", "Spanish colonial and Indigenous history", "San Antonio River setting", "Gateway to the wider Goliad historic district"],
    body: ["Goliad State Park is anchored by Mission Espíritu Santo, where reconstructed stone walls and interpretive exhibits make the Spanish mission era tangible. The site also requires attention to the Indigenous communities whose lives were transformed by the mission system.", "The San Antonio River and park grounds provide a quieter outdoor setting around the historic core, while the town and nearby sites expand the story into the Texas Revolution and nineteenth century.", "Do not rush Goliad as a single-building stop. Check hours for the surrounding historic properties and build enough time to understand how the mission, presidio, town and revolutionary sites connect."],
    managingAuthority: TPWD, officialUrl: "https://tpwd.texas.gov/state-parks/goliad",
  },
  "hill-country-state-natural-area": {
    summary: "A rugged former ranch near Bandera preserved for backcountry hiking, horseback riding and primitive camping across limestone ridges, grasslands and creek valleys with minimal developed recreation.",
    nearestTown: "Bandera", bestSeason: "Fall through spring; summer heat makes exposed routes demanding", entryNote: "This is a natural area rather than a developed resort-style park. Carry water, download maps and expect limited services and rough trails.",
    highlights: ["Backcountry Hill Country trails", "Horseback riding and equestrian camping", "Primitive campsites", "Ranch landscape with limestone ridges and open grassland"],
    body: ["Hill Country State Natural Area deliberately keeps development light. The former ranch landscape is crossed by a substantial trail network but offers fewer conveniences than many state parks, preserving a stronger backcountry character.", "Hikers and equestrians move through grasslands, rocky ridges and creek valleys, with primitive campsites extending trips beyond a day hike. Routes can be rough and exposed, and distances feel longer in hot weather.", "Bring navigation, ample water and realistic expectations about services. Check trail conditions and weather before arrival, particularly after heavy rain or during periods of extreme heat."],
    managingAuthority: TPWD, officialUrl: "https://tpwd.texas.gov/state-parks/hill-country",
  },
  "indian-lodge": {
    summary: "A white-adobe 1930s lodge built by the Civilian Conservation Corps inside Davis Mountains State Park, offering one of Texas' most distinctive overnight bases for mountain drives, trails and dark West Texas skies.",
    nearestTown: "Fort Davis", bestSeason: "Spring through fall for mountain exploration; winter can bring cold nights and occasional wintry weather", entryNote: "Indian Lodge is lodging inside Davis Mountains State Park, not a separate conventional park. Room availability can be limited, so reserve well ahead.",
    highlights: ["Historic CCC-built adobe lodge", "Davis Mountains setting", "Access to state-park trails and Skyline Drive", "Convenient base for Fort Davis and McDonald Observatory trips"],
    body: ["Indian Lodge is architecture, lodging and landscape in one stop. Civilian Conservation Corps crews built the pueblo-inspired adobe complex in the 1930s, and its white walls remain one of the most recognizable human-made landmarks in the Davis Mountains.", "Staying here puts visitors directly inside Davis Mountains State Park, making early trail starts and evening mountain views easy. Fort Davis National Historic Site and McDonald Observatory also fit naturally into a multi-day itinerary.", "Treat the lodge as a limited-capacity destination and reserve early. Check current lodging operations and park alerts before traveling, especially when winter weather or major regional events may affect access."],
    managingAuthority: TPWD, officialUrl: "https://tpwd.texas.gov/state-parks/indian-lodge",
  },
};
export function applyCuratedDestinationBatch6(destination: Destination): Destination { const override = curated[destination.slug]; return override ? { ...destination, ...override, hero: override.hero ? { ...destination.hero, ...override.hero } : destination.hero } : destination; }
export function applyCuratedDestinationsBatch6(destinations: Destination[]): Destination[] { return destinations.map(applyCuratedDestinationBatch6); }
