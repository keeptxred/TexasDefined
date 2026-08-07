import type { Destination } from "./types";

const TPWD = "Texas Parks and Wildlife Department";

const curated: Record<string, Partial<Destination>> = {
  "sheldon-lake-state-park": {
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Tower_Sheldon_Lake_SP_Harris_Co_Texas_2024.jpg?width=1600",
      alt: "John Jacob Observation Tower above the wetlands and prairie at Sheldon Lake State Park",
      width: 1600,
      height: 1067,
      credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
    },
  },
  "sheldon-lake-state-park-environmental-learning-center": {
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Tower_Sheldon_Lake_SP_Harris_Co_Texas_2024.jpg?width=1600",
      alt: "John Jacob Observation Tower above the wetlands and prairie at Sheldon Lake State Park",
      width: 1600,
      height: 1067,
      credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
    },
  },
  "brazos-bend-state-park": {
    summary: "Wetlands, coastal prairie and bottomland forest southwest of Houston, best known for close-but-safe alligator viewing, prolific birdlife and miles of flat trails around Elm and 40-Acre lakes.",
    nearestTown: "Needville",
    bestSeason: "Fall through spring for cooler trail weather; wildlife viewing is good year-round",
    entryNote: "Day-use capacity can fill on busy weekends. Reserve a day pass in advance and follow the park’s alligator-safety rules.",
    highlights: [
      "Elm Lake and 40-Acre Lake loops for alligators, wading birds and wetland views",
      "George Observatory, operated by the Houston Museum of Natural Science",
      "Restored coastal prairie and shaded bottomland forest trails",
      "All-terrain wheelchair available by reservation through the park",
    ],
    body: [
      "Brazos Bend feels much farther from Houston than the drive suggests. The park sits at an ecological crossroads where wetlands, coastal prairie and bottomland forest meet, creating habitat for alligators, herons, ibis, songbirds and a long list of other wildlife.",
      "The classic first visit is a loop around Elm Lake or 40-Acre Lake. Both keep you close to the water and offer some of the park’s best wildlife viewing. Alligators are part of the landscape here, so stay on the trail, give them generous space and follow park guidance rather than approaching for photographs.",
      "Brazos Bend also rewards visitors who look beyond the wetlands. Prairie overlooks, forest trails and the George Observatory make it easy to turn a short walk into a full day. Reserve entry for busy dates and check current trail and observatory information before leaving home.",
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/brazos-bend",
    accessibilityNotes: "The park has accessible facilities and offers an all-terrain wheelchair by reservation; contact the park before arrival for current availability.",
  },
  "garner-state-park": {
    summary: "A Hill Country favorite on the Frio River, where limestone hills, cypress-lined water, Old Baldy and the park’s long-running summer dances make the destination as social as it is scenic.",
    nearestTown: "Concan",
    bestSeason: "Late spring through early fall for river time; fall and winter are quieter for hiking",
    entryNote: "Garner frequently reaches capacity. Reserve day-use or camping well ahead for summer weekends and holidays.",
    highlights: [
      "Frio River swimming, tubing and paddling beneath bald cypress trees",
      "Old Baldy and Hill Country overlooks above the river valley",
      "Summer evening dances, a Garner tradition dating back generations",
      "Camping and cabins that make the park a multi-day destination",
    ],
    body: [
      "Garner State Park is one of the places where the Frio River defines the entire rhythm of a trip. Clear water runs beneath tall cypress trees while limestone hills rise abruptly behind the river, giving the park both a classic swimming-hole feel and real Hill Country elevation.",
      "Old Baldy is the signature hike, but the river is what keeps generations of families coming back. In warm weather, plan on swimming, tubing or simply finding shade along the water. In the evening, the park’s summer dances add a tradition that is unusual among Texas state parks and central to Garner’s identity.",
      "Popularity is the practical challenge. Summer weekends can sell out far in advance, and parking and river access become much easier when reservations are already handled. Check current river conditions, park alerts and reservation availability before making the drive.",
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/garner",
  },
  "dinosaur-valley-state-park": {
    summary: "A Paluxy River park near Glen Rose where 113-million-year-old dinosaur tracks appear in the limestone riverbed, backed by more than 20 miles of trails through rugged North Texas terrain.",
    nearestTown: "Glen Rose",
    bestSeason: "Spring and fall for hiking; track visibility depends on Paluxy River levels",
    entryNote: "Track sites can be underwater or difficult to see when river levels are high. Check current track visibility and reserve entry before busy weekends.",
    highlights: [
      "Main Track Site and Ballroom Track Site in the Paluxy River bed",
      "Tracks from sauropods and Acrocanthosaurus preserved in limestone",
      "More than 20 miles of hiking and biking trails",
      "Paluxy River swimming holes and scenic overlooks when conditions allow",
    ],
    body: [
      "Dinosaur Valley is built around something you cannot replicate in a museum: dinosaur footprints still sitting in the rock where the animals crossed a tidal shoreline roughly 113 million years ago. The Paluxy River cuts through the same limestone today, exposing trackways when water levels cooperate.",
      "The Main Track Site and Ballroom Track Site are the headline stops, but the park is larger than the riverbed. More than 20 miles of trails climb limestone ridges and cross grasslands above the Paluxy, giving the destination enough variety for a full day even when track visibility is limited.",
      "River conditions matter. High water can cover tracks and low water can make them much easier to see, while slick limestone demands careful footing. Check the park’s current track report and alerts before leaving, especially after rain.",
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/dinosaur-valley",
    accessibilityNotes: "The park offers an all-terrain wheelchair by request. Individual river track sites may require uneven or wet access, so ask staff about current conditions.",
  },
  "pedernales-falls-state-park": {
    summary: "Thirty miles west of Austin, the Pedernales River pours across broad shelves of Hill Country limestone, creating a dramatic falls area plus separate places for swimming, hiking, camping and river access.",
    nearestTown: "Johnson City",
    bestSeason: "Fall through spring for hiking; warm months are popular for swimming in designated river areas",
    entryNote: "Swimming and wading are prohibited in the falls area. The river can rise rapidly during flash floods, and busy dates often require advance reservations.",
    highlights: [
      "Pedernales Falls overlook and limestone river terraces",
      "Designated swimming and tubing access away from the falls area",
      "Hill Country hiking and biking trails including Twin Falls Nature Trail",
      "Camping, birding, fishing and equestrian opportunities",
    ],
    body: [
      "Pedernales Falls is a study in what water does to limestone. The river spreads across broad rock shelves, drops through channels and pools, and turns a familiar Hill Country landscape into one of the region’s most recognizable state-park scenes.",
      "The falls area is for looking and hiking, not swimming. Swimming, wading and tubing are allowed only in designated portions of the river elsewhere in the park. That separation matters because the Pedernales can change quickly, especially when storms upstream send a flash flood through what looked like calm water minutes earlier.",
      "Give the park more time than a quick overlook. Trails range from short nature walks to longer Hill Country routes, and camping, fishing and birding can easily fill a day or weekend. Check active alerts and river conditions before your visit.",
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/pedernales-falls",
  },
  "colorado-bend-state-park": {
    summary: "A rugged Colorado River park northwest of Austin with 70-foot Gorman Falls, spring-fed pools, cave tours and more than 35 miles of hike-and-bike trails through limestone canyon country.",
    nearestTown: "Bend",
    bestSeason: "Fall through spring for hiking; spring flow and recent rainfall can affect waterfalls and pools",
    entryNote: "Road and trail conditions can be rugged, cave tours require reservations, and popular dates may fill. Check current alerts before the long drive in.",
    highlights: [
      "Gorman Falls, a 70-foot spring-fed travertine waterfall",
      "More than 35 miles of hiking and biking trails",
      "Spicewood Springs pools and Colorado River access",
      "Guided cave tours into the park’s karst landscape",
    ],
    body: [
      "Colorado Bend is one of the more rugged state-park experiences within a reasonable drive of Austin. The landscape mixes river corridor, limestone uplands, springs and caves, and much of the appeal comes from feeling farther from pavement and services than the map suggests.",
      "Gorman Falls is the signature destination: a 70-foot spring-fed waterfall built from delicate travertine deposits. It is not a swimming waterfall, but nearby Spicewood Springs and the Colorado River add water to an itinerary that can also include hiking, mountain biking, fishing or paddling.",
      "This is a park where preparation improves the trip. Trails can be rocky, the access road and weather can affect travel times, and cave tours need advance reservations. Bring water, download what you need before losing cell service, and check park alerts before departure.",
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/colorado-bend",
  },
  "caprock-canyons-state-park": {
    summary: "Red-rock canyon country beneath the Caprock Escarpment, home to the official Texas State Bison Herd, Lake Theo and a trail network that connects with a long converted-rail Trailway across the Panhandle.",
    nearestTown: "Quitaque",
    coordinates: { lat: 34.410296, lng: -101.053264 },
    bestSeason: "Spring and fall for hiking and biking; summer heat can be severe",
    entryNote: "The park often reaches capacity. Reserve ahead, carry ample water and keep at least 50 yards from bison and other wildlife.",
    highlights: [
      "Official Texas State Bison Herd roaming restored prairie",
      "Canyon trails and overlooks beneath the Caprock Escarpment",
      "Caprock Canyons Trailway with bridges and historic Clarity Tunnel",
      "Lake Theo for fishing, no-wake boating and swimming",
    ],
    body: [
      "Caprock Canyons delivers the Panhandle’s biggest visual surprise: flat plains breaking suddenly into red and orange canyon walls below the Caprock Escarpment. The official Texas State Bison Herd roams the park’s restored prairie, making the landscape feel active rather than preserved behind a fence.",
      "The park has an extensive trail system for hiking, biking and horseback riding, while the separate Trailway follows an old rail corridor across three counties and through Clarity Tunnel. Short canyon walks, longer ridge routes and Lake Theo make it possible to build very different trips around the same park.",
      "Bison are wild and require distance, and the open Panhandle landscape offers little forgiveness in extreme heat. Reserve entry on busy dates, carry more water than you expect to need, and check current trail and wildlife notices before setting out.",
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/caprock-canyons",
  },
};

export function applyCuratedDestination(destination: Destination): Destination {
  const override = curated[destination.slug];
  if (!override) return destination;
  return {
    ...destination,
    ...override,
    hero: override.hero ? { ...destination.hero, ...override.hero } : destination.hero,
  };
}

export function applyCuratedDestinations(destinations: Destination[]): Destination[] {
  return destinations.map(applyCuratedDestination);
}
