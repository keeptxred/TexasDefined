import type { Destination } from "./types";

const curated: Record<string, Partial<Destination>> = {
  "cascade-caverns": {
    summary: "Boerne's oldest cave attraction, open for public tours since 1932, with guided routes through a living limestone cave, a dramatic Cathedral Room and Hill Country nature trails above ground.",
    nearestTown: "Boerne",
    coordinates: { lat: 29.764, lng: -98.681 },
    bestSeason: "Year-round for cave tours; spring and fall are most comfortable for the above-ground trails",
    entryNote: "Guided cave tours run on a schedule and conditions can affect lower-cave access. Check the official calendar and tour type before arrival.",
    highlights: ["Historic guided cave tours", "Cathedral Room", "Living limestone formations", "Nature trails and campground above ground"],
    body: [
      "Cascade Caverns has been welcoming public cave tours since 1932, giving it one of the longest visitor histories among Texas show caves. The cave's story stretches further back through Indigenous use and nineteenth-century exploration in the Boerne area.",
      "Guided routes move through a series of limestone rooms toward the Cathedral Room, while the property above ground includes nature trails, picnic areas and camping. The attraction also interprets the cave as a living ecosystem rather than simply a collection of rock formations.",
      "Choose the tour that matches your group and confirm current cave conditions before leaving home. The developed cave still involves stairs, damp surfaces and underground terrain, so comfortable shoes with traction are the practical starting point."
    ],
    officialUrl: "https://www.cascadecaverns.com/",
    address: "226 Cascade Caverns Rd, Boerne, TX 78015",
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/CathedralRoomCascadeCaverns.jpg?width=1600",
      alt: "The Cathedral Room inside Cascade Caverns near Boerne, Texas",
      width: 1200,
      height: 1600,
      credit: "Wikimedia Commons · free-license photograph",
    },
  },
  "cave-without-a-name": {
    summary: "A National Natural Landmark northeast of Boerne with six major decorated rooms, a constant 66-degree environment and a natural underground chamber used for guided tours and live concerts.",
    nearestTown: "Boerne",
    coordinates: { lat: 29.8861, lng: -98.6167 },
    bestSeason: "Year-round; the cavern stays about 66°F",
    entryNote: "Guided tours last about an hour and reservations are requested to ensure availability. Check the event calendar because the underground Throne Room also hosts concerts.",
    highlights: ["Six major cavern rooms", "National Natural Landmark", "Queen's Throne formations", "Underground concerts in the Throne Room"],
    body: [
      "Cave Without a Name sits beneath ranch country northeast of Boerne and is known for a dense variety of stalactites, stalagmites, soda straws, drapery, flowstone and rimstone formations. The cave became a public attraction after discovery and exploration in the early twentieth century.",
      "A standard guided visit moves through six major rooms in a roughly hour-long tour. One chamber doubles as a natural performance space, and the site's concert calendar gives the cave a cultural life that distinguishes it from other Hill Country caverns.",
      "The underground temperature stays near 66 degrees, but stairways and cave walkways still reward practical footwear. Reservations are requested, especially when building a day around a specific tour or concert time."
    ],
    officialUrl: "https://www.cavewithoutaname.com/",
    address: "325 Kreutzberg Rd, Boerne, TX 78006",
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Queen%27s_throne.JPG?width=1200",
      alt: "Flowstone, stalactite and stalagmite formations known as the Queen's Throne inside Cave Without a Name near Boerne",
      width: 1536,
      height: 2048,
      credit: "Peggy Hollin · CC0 1.0 · Wikimedia Commons",
    },
  },
  "bracken-cave-preserve": {
    summary: "A protected Hill Country preserve east of San Antonio sheltering the world's largest known bat colony, where millions of Mexican free-tailed bats emerge on summer evenings during tightly controlled reservation-only visits.",
    nearestTown: "San Antonio",
    coordinates: { lat: 29.68715, lng: -98.35261 },
    bestSeason: "May through September for seasonal Mexican free-tailed bat flights",
    entryNote: "The preserve is private conservation land, not an open-access park. Every visitor must have an advance reservation for an authorized bat flight or program; do not drive to the property expecting walk-in access.",
    highlights: ["World's largest known bat colony", "Seasonal evening bat emergence", "More than 1,400 acres protected by Bat Conservation International", "Reservation-only conservation experience"],
    body: [
      "Bracken Cave Preserve protects one of the most extraordinary wildlife concentrations in Texas. During the warm season, millions of Mexican free-tailed bats use the cave, and their evening emergence can build into a vast column above the Hill Country.",
      "Bat Conservation International manages the cave and surrounding preserve primarily for habitat protection. Public viewing is intentionally limited to small scheduled groups, and the seasonal program typically operates from May into September when the migratory colony is present.",
      "This is not a roadside bat stop. Secure a reservation first, follow the arrival instructions sent for your date and remember that wildlife timing varies with weather and natural conditions. The restricted access is part of protecting the colony, not an inconvenience to work around."
    ],
    managingAuthority: "Bat Conservation International",
    officialUrl: "https://www.batcon.org/experience-bats/bat-happenings/visit-bracken-cave-preserve/",
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Bracken_Cave_Bats.jpg?width=1600",
      alt: "Mexican free-tailed bats emerging from Bracken Cave in the Texas Hill Country",
      width: 1600,
      height: 1065,
      credit: "Daniel Spiess · CC BY-SA 2.0 · Wikimedia Commons",
    },
  },
};

export function applyCuratedDestinationBatch25(destination: Destination): Destination {
  const override = curated[destination.slug];
  return override ? { ...destination, ...override, hero: override.hero ? { ...destination.hero, ...override.hero } : destination.hero } : destination;
}

export function applyCuratedDestinationsBatch25(destinations: Destination[]): Destination[] {
  return destinations.map(applyCuratedDestinationBatch25);
}
