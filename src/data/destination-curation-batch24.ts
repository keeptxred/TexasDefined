import type { Destination } from "./types";

const curated: Record<string, Partial<Destination>> = {
  "natural-bridge-caverns": {
    summary: "Texas' largest commercial cavern system near San Antonio, with guided routes through immense limestone rooms, active formations, steep stairways and separate developed cave experiences beneath the Hill Country.",
    nearestTown: "San Antonio",
    coordinates: { lat: 29.69197, lng: -98.34264 },
    bestSeason: "Year-round; the cavern stays about 70°F with very high humidity",
    entryNote: "Book tours ahead when possible. The Discovery Tour includes stairs, steep wet surfaces and about three-quarters of a mile of walking; parking is paid separately.",
    highlights: ["Discovery Cavern guided tour", "Hidden Wonders cavern experience", "Large rooms, stalactites, stalagmites and flowstone", "Adventure tours for more strenuous caving"],
    body: [
      "Natural Bridge Caverns is the state's largest commercial cave attraction and one of the strongest underground stops in the Hill Country. The developed Discovery route descends through enormous rooms and active limestone formations on a guided walk that reaches roughly 180 feet below the surface.",
      "The site now offers more than one cavern experience, including the Hidden Wonders route and specialty adventure tours for visitors who want a more physical trip. The underground environment stays warm and humid, and wet surfaces make traction more important than the outside temperature suggests.",
      "Treat the cavern tour as the anchor of the visit and reserve around it. Comfortable shoes with good grip are essential, and travelers with mobility limitations should review the official tour descriptions before buying because stairs and steep grades are part of the standard routes."
    ],
    officialUrl: "https://www.naturalbridgecaverns.com/",
    reservationUrl: "https://www.naturalbridgecaverns.com/plan-your-trip/",
    address: "26495 Natural Bridge Caverns Rd, San Antonio, TX 78266",
    hero: {
      src: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Natural_bridge_caverns_bridge.jpg",
      alt: "The natural limestone bridge at the entrance to Natural Bridge Caverns in Comal County, Texas",
      width: 1863,
      height: 1242,
      credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
    },
  },
  "inner-space-cavern": {
    summary: "A Georgetown show cave discovered during Interstate 35 construction in 1963, with large decorated rooms, prehistoric animal remains and guided tours ranging from a paved family route to rugged wild-cave trips.",
    nearestTown: "Georgetown",
    bestSeason: "Year-round; the cave remains about 72°F and is unaffected by ordinary rain",
    entryNote: "The standard Adventure Tour is roughly a one-mile guided walk lasting about 60 to 75 minutes. Hidden Passages and Wild Cave tours have additional age, footwear and physical requirements.",
    highlights: ["Classic Adventure Tour through large decorated rooms", "Prehistoric animal bones and discovery history", "Hidden Passages flashlight tour", "Advanced Wild Cave experience"],
    body: [
      "Inner Space Cavern was hidden for thousands of years until a Texas Highway Department drilling crew encountered it during Interstate 35 construction in 1963. The cave opened to the public in 1966, giving the destination a discovery story that is unusually tied to modern Texas transportation history.",
      "The standard Adventure Tour follows a paved and lighted route through the largest rooms and decorated formations. More demanding options include the flashlight-led Hidden Passages route and a reservation-only Wild Cave trip involving crawling, climbing and tight passages.",
      "Choose the tour before you arrive rather than assuming every route fits every traveler. The cave is humid and feels warmer than its roughly 72-degree air temperature, and several specialty tours have firm footwear, age and mobility requirements."
    ],
    officialUrl: "https://innerspacecavern.com/",
    reservationUrl: "https://innerspacecavern.com/purchase-tickets/",
    address: "4200 S. I-35 Frontage Rd, Georgetown, TX 78626",
    hero: {
      src: "https://upload.wikimedia.org/wikipedia/commons/7/71/Innerspace_cavern0700.jpg",
      alt: "Limestone formations inside Inner Space Cavern in Georgetown, Texas",
      width: 3648,
      height: 2736,
      credit: "Rvassar · CC BY-SA 3.0 · Wikimedia Commons",
    },
  },
  "caverns-of-sonora": {
    summary: "A highly decorated show cave 15 miles southwest of Sonora where intimate guided tours descend through crystal-rich limestone passages, dense speleothems and warm, humid rooms 155 feet below the surface.",
    nearestTown: "Sonora",
    coordinates: { lat: 30.55495, lng: -100.81222 },
    bestSeason: "Year-round; the cavern stays about 72°F with roughly 98% humidity",
    entryNote: "The Crystal Palace Tour lasts about 1 hour 45 minutes, descends 155 feet and includes roughly 360 stair steps. Specialty adventure and photography tours require advance booking.",
    highlights: ["Crystal Palace guided tour", "Dense crystal formations and helictites", "Discovery Challenge adventure caving", "On-site camping in ranch country"],
    body: [
      "Caverns of Sonora sits where the Hill Country gives way to the Chihuahuan Desert and is known less for enormous chambers than for the density and delicacy of its formations. Visitors move unusually close to active crystal features on a carefully managed guided route.",
      "The standard Crystal Palace Tour covers nearly two miles of passage and reaches about 155 feet below the surface. A more demanding Discovery Challenge adds off-trail caving and rappelling, while specialty photography access is available by advance arrangement.",
      "This is a warm cave rather than a chilly one: high humidity makes the roughly 72-degree air feel significantly warmer. Wear comfortable walking shoes, travel light because bags are restricted underground, and reserve specialty tours before making the drive."
    ],
    officialUrl: "https://cavernsofsonora.com/",
    reservationUrl: "https://www.cavernsofsonora.com/tickets",
    address: "1711 PR 4468, Sonora, TX 76950",
    hero: {
      src: "https://upload.wikimedia.org/wikipedia/commons/7/7a/DogtoothSpar.jpg",
      alt: "Dogtooth spar crystal formations inside the Caverns of Sonora near Sonora, Texas",
      width: 3060,
      height: 2170,
      credit: "DanielCD · CC BY-SA 3.0 / CC BY 2.5 · Wikimedia Commons",
    },
  },
};

export function applyCuratedDestinationBatch24(destination: Destination): Destination {
  const override = curated[destination.slug];
  return override ? { ...destination, ...override, hero: override.hero ? { ...destination.hero, ...override.hero } : destination.hero } : destination;
}

export function applyCuratedDestinationsBatch24(destinations: Destination[]): Destination[] {
  return destinations.map(applyCuratedDestinationBatch24);
}
