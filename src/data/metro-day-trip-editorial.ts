import type { MetroProximityResult } from "./metro-proximity";

/**
 * First expansion of curated metro day-trip planning. Entries are editorial
 * leads, never synthetic destination records: a card only renders when the
 * quality-gated, indexable resolved destination is actually in the collection.
 * Sources identify the operator and current access rules; they are not affiliate links.
 * To expand into another city, add its source-backed choices here.
 */
type DayTripChoice = {
  slug: string;
  fit: string;
  why: string;
  check: string;
  sourceUrl: string;
};

const DAY_TRIP_CHOICES: Readonly<Record<string, readonly DayTripChoice[]>> = {
  houston: [
    { slug: "brazos-bend-state-park", fit: "Wildlife and trails", why: "Choose a nature-first day of lakes, birding, wooded trails and opportunities to watch wildlife outside the city.", check: "Check park alerts, day-use reservations and wildlife safety before setting out.", sourceUrl: "https://tpwd.texas.gov/state-parks/brazos-bend" },
    { slug: "galveston-island-state-park", fit: "Beach and bay", why: "Plan a single coastal outing around the beach side or the bay side, with time for birding, fishing or a walk.", check: "Check the Gulf forecast, coastal access and advance day-use passes.", sourceUrl: "https://tpwd.texas.gov/state-parks/galveston-island" },
    { slug: "huntsville-state-park", fit: "Piney Woods escape", why: "Trade freeway traffic for forest trails and lake scenery in the Sam Houston National Forest area.", check: "Verify the park's current trail and water notices and day-use capacity.", sourceUrl: "https://tpwd.texas.gov/state-parks/huntsville" },
  ],
  "san-antonio": [
    { slug: "guadalupe-river-state-park", fit: "River day", why: "Make the Guadalupe River your main stop for shoreline time, nature trails or a picnic rather than trying to pack in multiple parks.", check: "Check river conditions, trail notices and day-use reservations.", sourceUrl: "https://tpwd.texas.gov/state-parks/guadalupe-river" },
    { slug: "blanco-state-park", fit: "Small-town river break", why: "Pair a compact river-park visit with time in Blanco for a relaxed Hill Country outing.", check: "Confirm required advance entry passes and current Blanco River conditions.", sourceUrl: "https://tpwd.texas.gov/state-parks/blanco" },
    { slug: "enchanted-rock-state-natural-area", fit: "Granite dome hike", why: "Center a full day on an exposed granite landscape and its hiking routes rather than assuming it is a casual roadside overlook.", check: "Reserve entry and review weather, heat and trail restrictions.", sourceUrl: "https://tpwd.texas.gov/state-parks/enchanted-rock" },
  ],
  austin: [
    { slug: "pedernales-falls-state-park", fit: "Hill Country trails and geology", why: "Center a day on the Pedernales River landscape and the limestone falls rather than treating it as a roadside swimming stop.", check: "Reserve day entry before leaving; swimming and wading at the falls themselves are prohibited, and river levels can change rapidly.", sourceUrl: "https://tpwd.texas.gov/state-parks/pedernales-falls" },
    { slug: "bastrop-state-park", fit: "Pine forest and historic trails", why: "Explore recovering Lost Pines habitat, park trails and the historic Civilian Conservation Corps landscape, then leave time for Bastrop itself.", check: "Confirm trail access, active alerts and advance day-use entry requirements with TPWD.", sourceUrl: "https://tpwd.texas.gov/state-parks/bastrop" },
    { slug: "lockhart-state-park", fit: "Small-town history and outdoors", why: "Combine a short park outing with the historic Lockhart courthouse square for a relaxed day rather than packing in distant Hill Country stops.", check: "Check the park's visitor notices and available activities before setting off.", sourceUrl: "https://tpwd.texas.gov/state-parks/lockhart" },
  ],
  dallas: [
    { slug: "dinosaur-valley-state-park", fit: "Dinosaur tracks and river", why: "Choose Glen Rose for a family-friendly geology day, with dinosaur footprints in the Paluxy River when conditions allow.", check: "Track visibility changes with river levels; trails can close after wet weather, and advance entry passes are recommended.", sourceUrl: "https://tpwd.texas.gov/state-parks/dinosaur-valley" },
    { slug: "ray-roberts-lake-state-park", fit: "Lake day with several park units", why: "Head north for swimming, fishing or walking; choose Isle du Bois or Johnson Branch deliberately because their entrances and activities differ.", check: "Choose the correct unit before navigating and check capacity and day-use reservations.", sourceUrl: "https://tpwd.texas.gov/state-parks/ray-roberts-lake" },
    { slug: "eisenhower-state-park", fit: "Lake Texoma shore and trails", why: "Make Lake Texoma the anchor for a water-and-trails escape north of Dallas, leaving room for a relaxed lakeside visit.", check: "Check Lake Texoma water conditions, park alerts and reservations before visiting.", sourceUrl: "https://tpwd.texas.gov/state-parks/eisenhower" },
  ],
  "fort-worth": [
    { slug: "dinosaur-valley-state-park", fit: "Ancient tracks and river scenery", why: "Build a Glen Rose outing around the preserved dinosaur trackways and the riverside park trails.", check: "River levels can hide tracks; verify current track visibility and trail access before traveling.", sourceUrl: "https://tpwd.texas.gov/state-parks/dinosaur-valley" },
    { slug: "cleburne-state-park", fit: "Quiet lake and woodland trails", why: "Spend time at spring-fed Cedar Lake for a walk, fishing or kayaking, with no-wake boating instead of high-speed watersports.", check: "Book day entry when capacity is limited and check the current lake and trail conditions.", sourceUrl: "https://tpwd.texas.gov/state-parks/cleburne" },
    { slug: "lake-mineral-wells-state-park", fit: "Rock formations and Cross Timbers", why: "Explore Penitentiary Hollow and the lake or choose a stretch of the historic Trailway for a longer outdoor day.", check: "Trails may close after wet weather; climbing has separate rules and requires checking in with park headquarters.", sourceUrl: "https://tpwd.texas.gov/state-parks/lake-mineral-wells" },
  ],
  "corpus-christi": [
    { slug: "goose-island-state-park", fit: "Birds, bays and fishing", why: "Head north into the Rockport area for coastal birding, bay views and fishing access; this is not a swimming-beach park.", check: "Verify day-use access, pier and boat-launch conditions before traveling.", sourceUrl: "https://tpwd.texas.gov/state-parks/goose-island" },
    { slug: "lake-corpus-christi-state-park", fit: "Freshwater lake day", why: "Choose the inland option for lakeside recreation, fishing, paddling and Civilian Conservation Corps history.", check: "Review the park's water, boating and swimming guidance and day-use availability.", sourceUrl: "https://tpwd.texas.gov/state-parks/lake-corpus-christi" },
    { slug: "aransas-national-wildlife-refuge", fit: "Wildlife refuge outing", why: "Spend your day exploring coastal wildlife habitat and observation opportunities rather than treating the refuge as a beach resort.", check: "Confirm refuge road access, open trails and seasonal wildlife notices on the federal visitor site.", sourceUrl: "https://www.fws.gov/refuge/aransas/visit-us" },
  ],
  waco: [
    { slug: "mother-neff-state-park", fit: "Early Texas park history", why: "Explore limestone rock shelters, short trails and Civilian Conservation Corps structures in one of the state's earliest parks, southwest of Waco.", check: "TPWD reports a southern gate closure; follow current entrance directions and check park alerts and day-use capacity.", sourceUrl: "https://tpwd.texas.gov/state-parks/mother-neff" },
    { slug: "lake-whitney-state-park", fit: "Lake day north of Waco", why: "Choose a laid-back shoreline day for fishing, swimming where permitted or open views of Lake Whitney; it can also anchor a slow camping weekend.", check: "Confirm day entry, lake and swimming conditions, and current park alerts before leaving.", sourceUrl: "https://tpwd.texas.gov/state-parks/lake-whitney" },
    { slug: "meridian-state-park", fit: "Small-lake trails", why: "Trade city attractions for Bosque County hills, a small lake and nature trails; this works as a quieter outdoor outing.", check: "Check open trails, water conditions and day-use capacity; avoid assuming a lake activity is always available.", sourceUrl: "https://tpwd.texas.gov/state-parks/meridian" },
    { slug: "fort-parker-state-park", fit: "Limestone County lake and history", why: "Make the park near Mexia a lakeside escape, with nearby history as an optional second stop rather than an overloaded driving loop.", check: "Review park alerts and day-use reservations; separate any Old Fort Parker visit from the state park's entry requirements.", sourceUrl: "https://tpwd.texas.gov/state-parks/fort-parker" },
  ],
  "beaumont-port-arthur": [
    { slug: "village-creek-state-park", fit: "Paddle or hike near the Big Thicket", why: "Explore an East Texas creek corridor, sandy woods and forest trails just north of Beaumont; choose paddling only when conditions and rentals permit.", check: "Verify water conditions, paddling access and alligator guidance before heading out.", sourceUrl: "https://tpwd.texas.gov/state-parks/village-creek" },
    { slug: "sea-rim-state-park", fit: "Marsh and Gulf coast", why: "Choose an expansive coast-and-marsh outing south of Port Arthur for beach walks and birdwatching instead of mistaking it for a resort beach.", check: "Check tide and weather forecasts, beach access, and coastal park advisories before traveling.", sourceUrl: "https://tpwd.texas.gov/state-parks/sea-rim" },
    { slug: "big-thicket-national-preserve", fit: "Piney Woods biodiversity", why: "Center the day on one Big Thicket trail or visitor area and discover the unusual plant and wetland habitats, rather than trying to cover scattered preserve units.", check: "Choose the correct trailhead and read current National Park Service trail and flood conditions.", sourceUrl: "https://www.nps.gov/bith/planyourvisit/index.htm" },
    { slug: "martin-dies-jr-state-park", fit: "Longer Piney Woods water day", why: "Travel toward Jasper for paddling trails and waterside forests at the meeting of East Texas river habitats; allow more time than for nearby Golden Triangle stops.", check: "Check the Hen House unit closures and current burn ban, as well as day-use reservations, before a visit.", sourceUrl: "https://tpwd.texas.gov/state-parks/martin-dies-jr" },
  ],
  "college-station": [
    { slug: "lake-somerville-state-park", fit: "Brazos Valley lake country", why: "Choose Birch Creek or Nails Creek for fishing, trails or lakeside time, giving each unit enough time rather than driving back and forth around the lake.", check: "Select the unit in advance and check the Trailway and water-condition alerts.", sourceUrl: "https://tpwd.texas.gov/state-parks/lake-somerville" },
    { slug: "fort-boggy-state-park", fit: "Quiet woods and lake", why: "Head northeast toward Centerville for a forested lake and trails when you want a straightforward outdoor day without a crowded attraction schedule.", check: "Confirm current park access, trails and reservation requirements.", sourceUrl: "https://tpwd.texas.gov/state-parks/fort-boggy" },
    { slug: "huntsville-state-park", fit: "Pine forest and lake", why: "Explore an East Texas forest-lake setting near Huntsville as an alternative to the Brazos Valley's prairie landscapes.", check: "Review trail, swimming and wildlife notices and reserve day admission if necessary.", sourceUrl: "https://tpwd.texas.gov/state-parks/huntsville" },
  ],
  tyler: [
    { slug: "purtis-creek-state-park", fit: "Fishing and quiet pine country", why: "Make an unhurried lake day in East Texas with shoreline trails and fishing where current conditions allow.", check: "Verify boating restrictions, lake access, park notices and reservations before setting out.", sourceUrl: "https://tpwd.texas.gov/state-parks/purtis-creek" },
    { slug: "daingerfield-state-park", fit: "Piney Woods and forested lake", why: "Head northeast for trails through tall pines and a small lake that suits a relaxed nature-first outing.", check: "Check current swimming, rentals, trails and visitor alerts with TPWD.", sourceUrl: "https://tpwd.texas.gov/state-parks/daingerfield" },
    { slug: "martin-creek-lake-state-park", fit: "East Texas reservoir outing", why: "Choose lakeshore birding, fishing and wooded walks near Tatum rather than trying to connect distant attractions.", check: "Review the park's lake access and current activity restrictions; conditions change with weather.", sourceUrl: "https://tpwd.texas.gov/state-parks/martin-creek-lake" },
  ],
  amarillo: [
    { slug: "palo-duro-canyon-state-park", fit: "Major canyon landscape", why: "Make the canyon your main outing and choose trails for your group rather than expecting the Lighthouse hike to be a casual roadside stop.", check: "TPWD warns of heat, flash flooding, trail closures and day-use capacity; book access and carry ample water.", sourceUrl: "https://tpwd.texas.gov/state-parks/palo-duro-canyon" },
    { slug: "alibates-flint-quarries-national-monument", fit: "Ancient Panhandle quarries", why: "Explore the prehistoric flint quarry story with the National Park Service; reserve the longer ranger hike rather than assuming the quarry itself is freely accessible.", check: "Quarry tours require reservations and can be cancelled by weather; consult current NPS schedules and visitor center details.", sourceUrl: "https://www.nps.gov/alfl/planyourvisit/guidedtours.htm" },
    { slug: "lake-meredith-national-recreation-area", fit: "Canadian River lake country", why: "Choose a Lake Meredith recreation area for shoreline time or a scenic High Plains outing while keeping the dispersed access points distinct.", check: "NPS recreation sites use different roads and facilities; verify the chosen lake access, water and weather before leaving.", sourceUrl: "https://www.nps.gov/lamr/planyourvisit/index.htm" },
  ],
  lubbock: [
    { slug: "caprock-canyons-state-park", fit: "Canyons and Texas bison", why: "Spend a full day around dramatic canyon trails and the park's bison habitat rather than attempting to hike every trail in one outing.", check: "Check extreme-heat guidance, bison safety, trail conditions and day-use reservations; some sections are rugged.", sourceUrl: "https://tpwd.texas.gov/state-parks/caprock-canyons" },
    { slug: "palo-duro-canyon-state-park", fit: "Long Panhandle canyon day", why: "Choose Palo Duro Canyon for a full-day road outing when you want a grand-scale landscape, canyon viewpoints and a planned hike.", check: "This is a long out-and-back; verify road time, park capacity, heat and flash-flood alerts before leaving.", sourceUrl: "https://tpwd.texas.gov/state-parks/palo-duro-canyon" },
    { slug: "big-spring-state-park", fit: "West Texas hilltop views", why: "Explore the limestone bluff scenery and short outdoor stops around Big Spring instead of committing a full day to distant canyon hiking.", check: "Check park access, current advisories and the drive before planning other stops in the same outing.", sourceUrl: "https://tpwd.texas.gov/state-parks/big-spring" },
    { slug: "lake-colorado-city-state-park", fit: "Reservoir and birding", why: "Head toward Colorado City for a reservoir-oriented outing with lakeside camping, birdwatching and fishing options where conditions allow.", check: "Review local water levels, boating or fishing restrictions and current TPWD visitor alerts.", sourceUrl: "https://tpwd.texas.gov/state-parks/lake-colorado-city" },
  ],
  "midland-odessa": [
    { slug: "monahans-sandhills-state-park", fit: "Dune play and desert landscapes", why: "Explore sculpted West Texas sand dunes or rent a sand disc for an unusually hands-on outing near Monahans.", check: "Summer sand gets extremely hot, there are no marked hiking trails, and TPWD recommends advance day-use reservations.", sourceUrl: "https://tpwd.texas.gov/state-parks/monahans-sandhills" },
    { slug: "big-spring-state-park", fit: "Big Spring hill country", why: "Look east for an accessible high-point park overlooking Big Spring; pair one short scenic stop with town attractions rather than a rushed cross-region loop.", check: "Check current park alerts and live driving directions before visiting.", sourceUrl: "https://tpwd.texas.gov/state-parks/big-spring" },
    { slug: "balmorhea-state-park", fit: "Spring-fed swimming destination", why: "Turn a longer West Texas drive into a swimming-focused outing at a historic spring-fed pool, with enough flexibility for a slow return or overnight.", check: "The pool can reach capacity and has timed entry windows; reserve a pass and verify opening hours before leaving.", sourceUrl: "https://tpwd.texas.gov/state-parks/balmorhea" },
    { slug: "lake-colorado-city-state-park", fit: "Open-water camping and fishing", why: "Head northeast for a quieter reservoir landscape, campsites and fishing rather than packing this into a distant desert itinerary.", check: "Check lake conditions and fishing and boating rules with TPWD, along with current day-use availability.", sourceUrl: "https://tpwd.texas.gov/state-parks/lake-colorado-city" },
  ],
  "el-paso": [
    { slug: "hueco-tanks-state-park-and-historic-site", fit: "Rock art and distinctive geology", why: "Visit the famed rock formations and cultural landscape east of El Paso, choosing an appropriate ranger-led or limited-access excursion.", check: "TPWD limits daily access, requires orientations and advance reservations for many areas; GPS may misdirect drivers.", sourceUrl: "https://tpwd.texas.gov/state-parks/hueco-tanks/" },
    { slug: "franklin-mountains-state-park", fit: "Local desert mountains", why: "Choose a trail appropriate to your group in the rugged Franklin Mountains instead of treating every summit as an easy city walk.", check: "TPWD warns that capacity and summer trail conditions vary; verify Tom Mays unit entry and water needs.", sourceUrl: "https://tpwd.texas.gov/state-parks/parks/franklin-mountains/" },
    { slug: "guadalupe-mountains-national-park", fit: "Long high-desert hiking day", why: "For a longer eastbound outing, make a single Guadalupe Mountains trail or historic site the main destination and leave room for a leisurely return.", check: "This is not a short local trip; check exact trailhead, mountain weather, entrance rules, and the Mountain Time Zone before departing.", sourceUrl: "https://www.nps.gov/gumo/planyourvisit/index.htm" },
  ],
};

/**
 * El Paso's independently source-backed research leads are NOT catalog
 * destinations and must never be counted toward day-trip index eligibility.
 * The 18-150-mile governed collection currently lacks adequate county/town
 * variety. These operator pages help readers make safe, usable decisions
 * without creating duplicate routes or granting false index-ready status.
 * Sources reviewed 2026-10-26; scheduled source monitor checks sourceUrl.
 */
export const EL_PASO_SOURCE_BACKED_OUTINGS = [
  {
    key: "san-elizario-historic-district",
    title: "San Elizario Historic District",
    fit: "Mission Trail heritage",
    plan: "Walk the historic district and focus on its presidio, mission landscape and El Camino Real history. The National Park Service identifies this as a managed historic district, not an open-access archaeological site.",
    check: "Confirm the City of San Elizario's current visitor and building access before setting out; historic district streets and individual indoor attractions do not share one schedule.",
    sourceLabel: "National Park Service historic district",
    sourceUrl: "https://www.nps.gov/places/san-elizario-historic-district.htm",
  },
  {
    key: "los-portales-museum",
    title: "Los Portales Museum and Information Center",
    fit: "A focused Mission Trail museum stop",
    plan: "At 1521 San Elizario Road, explore the local history of the presidio, the Salt War, early El Paso County and the Mission Valley. This is a specific museum visit, not a second independent city day trip.",
    check: "Verify current opening hours with the El Paso Mission Trail Association before building a San Elizario museum itinerary.",
    sourceLabel: "El Paso Mission Trail Association visitor information",
    sourceUrl: "https://www.elpasomissions.org/explore/museums/los-portales-museum/",
  },
  {
    key: "van-horn-clark-hotel-museum",
    title: "Clark Hotel Museum, Van Horn",
    fit: "Railroad and frontier history in Culberson County",
    plan: "The City of Van Horn identifies the former downtown hotel at 108 West Broadway as a local museum exhibiting pioneer, railroad and historic hotel material. Make this a researched stop on a Van Horn-focused drive.",
    check: "Ask the museum or City of Van Horn to confirm access and staffing; a tourism listing is not a promise of daily hours.",
    sourceLabel: "City of Van Horn attractions",
    sourceUrl: "https://www.vanhorntexas.org/2159/Things-to-Do",
  },
  {
    key: "salt-basin-dunes",
    title: "Salt Basin Dunes",
    fit: "Remote Guadalupe Mountains desert landscape",
    plan: "See the dune fields on the national park's western side, but plan the additional drive on rural roads and roughly 1.5-mile walk each way from the designated parking area.",
    check: "NPS says the clay access road can become dangerously slippery when wet. This is day-use only, with no trailhead water; confirm weather, daylight, route and water supplies.",
    sourceLabel: "National Park Service Salt Basin Dunes access",
    sourceUrl: "https://www.nps.gov/gumo/planyourvisit/dunes.htm",
  },
  {
    key: "guadalupe-pine-springs",
    title: "Guadalupe Mountains — Pine Springs",
    fit: "A longer single-destination mountain outing",
    plan: "NPS lists the main visitor center and Pine Springs trailhead off U.S. 62/180, about 110 driving miles east of El Paso. Pick a suitable trail rather than treating Guadalupe Peak as a casual short walk.",
    check: "Choose your trail by difficulty and weather, review park alerts, carry water, and check current visitor-center and holiday hours. Distances within the park depend on the chosen trailhead.",
    sourceLabel: "National Park Service Pine Springs visitor guidance",
    sourceUrl: "https://www.nps.gov/gumo/planyourvisit/pine_springs_area.htm",
  },
] as const;

export const CURATED_METRO_DAY_TRIP_SLUGS = Object.freeze(Object.keys(DAY_TRIP_CHOICES));

export type CuratedMetroDayTrip = DayTripChoice & { result: MetroProximityResult };

export function curatedMetroDayTrips(metroSlug: string, collectionSlug: string, results: readonly MetroProximityResult[]): CuratedMetroDayTrip[] {
  if (collectionSlug !== "day-trips") return [];
  const eligible = new Map(results.map((result) => [result.destination.slug, result]));
  return (DAY_TRIP_CHOICES[metroSlug] ?? []).flatMap((choice) => {
    const result = eligible.get(choice.slug);
    return result ? [{ ...choice, result }] : [];
  });
}
