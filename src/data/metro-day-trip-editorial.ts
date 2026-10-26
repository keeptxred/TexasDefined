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
};

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
