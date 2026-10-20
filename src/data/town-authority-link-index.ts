/** Compact travel link index: real researched TexasDefined destination records.
 * Keeps lengthy researched body/itinerary/source modules OUT of client-side link UI.
 * Maintain source content in small-town destination wave files, and update this
 * lightweight projection when the source roster changes. Enforced by CI.
 * Gruene is a historic district of New Braunfels, not a separate municipality.
 */
export type TownAuthorityLinkPlace = {
  slug: string; name: string; county: string; region: string;
  lat: number; lng: number;
};

export const TOWN_AUTHORITY_LINK_PLACES: readonly TownAuthorityLinkPlace[] = [
  {
    "slug": "fredericksburg",
    "name": "Fredericksburg",
    "county": "Gillespie",
    "region": "hill-country",
    "lat": 30.2752,
    "lng": -98.8719
  },
  {
    "slug": "marfa",
    "name": "Marfa",
    "county": "Presidio",
    "region": "big-bend",
    "lat": 30.3095,
    "lng": -104.0206
  },
  {
    "slug": "jefferson",
    "name": "Jefferson",
    "county": "Marion",
    "region": "piney-woods",
    "lat": 32.7574,
    "lng": -94.3452
  },
  {
    "slug": "wimberley",
    "name": "Wimberley",
    "county": "Hays",
    "region": "hill-country",
    "lat": 29.9974,
    "lng": -98.0986
  },
  {
    "slug": "granbury",
    "name": "Granbury",
    "county": "Hood",
    "region": "prairies-lakes",
    "lat": 32.4421,
    "lng": -97.7942
  },
  {
    "slug": "bandera",
    "name": "Bandera",
    "county": "Bandera",
    "region": "hill-country",
    "lat": 29.7266,
    "lng": -99.0736
  },
  {
    "slug": "boerne",
    "name": "Boerne",
    "county": "Kendall",
    "region": "hill-country",
    "lat": 29.7947,
    "lng": -98.732
  },
  {
    "slug": "lockhart",
    "name": "Lockhart",
    "county": "Caldwell",
    "region": "prairies-lakes",
    "lat": 29.8849,
    "lng": -97.67
  },
  {
    "slug": "alpine",
    "name": "Alpine",
    "county": "Brewster",
    "region": "big-bend",
    "lat": 30.3585,
    "lng": -103.661
  },
  {
    "slug": "brenham",
    "name": "Brenham",
    "county": "Washington",
    "region": "prairies-lakes",
    "lat": 30.1669,
    "lng": -96.3977
  },
  {
    "slug": "bastrop",
    "name": "Bastrop",
    "county": "Bastrop",
    "region": "prairies-lakes",
    "lat": 30.1105,
    "lng": -97.3153
  },
  {
    "slug": "salado",
    "name": "Salado",
    "county": "Bell",
    "region": "prairies-lakes",
    "lat": 30.9471,
    "lng": -97.5386
  },
  {
    "slug": "glen-rose",
    "name": "Glen Rose",
    "county": "Somervell",
    "region": "prairies-lakes",
    "lat": 32.2346,
    "lng": -97.7553
  },
  {
    "slug": "llano",
    "name": "Llano",
    "county": "Llano",
    "region": "hill-country",
    "lat": 30.7501,
    "lng": -98.6761
  },
  {
    "slug": "mason",
    "name": "Mason",
    "county": "Mason",
    "region": "hill-country",
    "lat": 30.7488,
    "lng": -99.2306
  },
  {
    "slug": "schulenburg",
    "name": "Schulenburg",
    "county": "Fayette",
    "region": "prairies-lakes",
    "lat": 29.6811,
    "lng": -96.903
  },
  {
    "slug": "goliad",
    "name": "Goliad",
    "county": "Goliad",
    "region": "south-texas",
    "lat": 28.6683,
    "lng": -97.3883
  },
  {
    "slug": "gonzales",
    "name": "Gonzales",
    "county": "Gonzales",
    "region": "prairies-lakes",
    "lat": 29.5016,
    "lng": -97.4525
  },
  {
    "slug": "nacogdoches",
    "name": "Nacogdoches",
    "county": "Nacogdoches",
    "region": "piney-woods",
    "lat": 31.6035,
    "lng": -94.6555
  },
  {
    "slug": "palestine",
    "name": "Palestine",
    "county": "Anderson",
    "region": "piney-woods",
    "lat": 31.7621,
    "lng": -95.6308
  },
  {
    "slug": "marshall",
    "name": "Marshall",
    "county": "Harrison",
    "region": "piney-woods",
    "lat": 32.5449,
    "lng": -94.3674
  },
  {
    "slug": "mineola",
    "name": "Mineola",
    "county": "Wood",
    "region": "piney-woods",
    "lat": 32.6632,
    "lng": -95.4883
  },
  {
    "slug": "blanco",
    "name": "Blanco",
    "county": "Blanco",
    "region": "hill-country",
    "lat": 30.0974,
    "lng": -98.4214
  },
  {
    "slug": "comfort",
    "name": "Comfort",
    "county": "Kendall",
    "region": "hill-country",
    "lat": 29.9675,
    "lng": -98.905
  },
  {
    "slug": "hico",
    "name": "Hico",
    "county": "Hamilton",
    "region": "prairies-lakes",
    "lat": 31.9829,
    "lng": -98.0337
  },
  {
    "slug": "port-isabel",
    "name": "Port Isabel",
    "county": "Cameron",
    "region": "south-texas",
    "lat": 26.0734,
    "lng": -97.2086
  },
  {
    "slug": "rockport",
    "name": "Rockport",
    "county": "Aransas",
    "region": "gulf-coast",
    "lat": 28.0206,
    "lng": -97.0544
  },
  {
    "slug": "clifton",
    "name": "Clifton",
    "county": "Bosque",
    "region": "prairies-lakes",
    "lat": 31.7824,
    "lng": -97.5767
  },
  {
    "slug": "terlingua",
    "name": "Terlingua",
    "county": "Brewster",
    "region": "big-bend",
    "lat": 29.321,
    "lng": -103.616
  },
  {
    "slug": "castroville",
    "name": "Castroville",
    "county": "Medina",
    "region": "hill-country",
    "lat": 29.3558,
    "lng": -98.8786
  },
  {
    "slug": "la-grange",
    "name": "La Grange",
    "county": "Fayette",
    "region": "prairies-lakes",
    "lat": 29.9055,
    "lng": -96.8766
  },
  {
    "slug": "cuero",
    "name": "Cuero",
    "county": "DeWitt",
    "region": "south-texas",
    "lat": 29.0939,
    "lng": -97.2892
  },
  {
    "slug": "fort-davis",
    "name": "Fort Davis",
    "county": "Jeff Davis",
    "region": "big-bend",
    "lat": 30.5882,
    "lng": -103.8946
  },
  {
    "slug": "menard",
    "name": "Menard",
    "county": "Menard",
    "region": "hill-country",
    "lat": 30.9174,
    "lng": -99.7865
  },
  {
    "slug": "sonora",
    "name": "Sonora",
    "county": "Sutton",
    "region": "hill-country",
    "lat": 30.5669,
    "lng": -100.6434
  },
  {
    "slug": "seymour",
    "name": "Seymour",
    "county": "Baylor",
    "region": "prairies-lakes",
    "lat": 33.5943,
    "lng": -99.2604
  },
  {
    "slug": "mount-vernon",
    "name": "Mount Vernon",
    "county": "Franklin",
    "region": "piney-woods",
    "lat": 33.1887,
    "lng": -95.2213
  },
  {
    "slug": "leakey",
    "name": "Leakey",
    "county": "Real",
    "region": "hill-country",
    "lat": 29.7288,
    "lng": -99.7615
  },
  {
    "slug": "rocksprings",
    "name": "Rocksprings",
    "county": "Edwards",
    "region": "hill-country",
    "lat": 30.0155,
    "lng": -100.2054
  },
  {
    "slug": "san-saba",
    "name": "San Saba",
    "county": "San Saba",
    "region": "hill-country",
    "lat": 31.1957,
    "lng": -98.7173
  },
  {
    "slug": "clarksville",
    "name": "Clarksville",
    "county": "Red River",
    "region": "piney-woods",
    "lat": 33.6107,
    "lng": -95.0527
  },
  {
    "slug": "brady",
    "name": "Brady",
    "county": "McCulloch",
    "region": "hill-country",
    "lat": 31.1352,
    "lng": -99.3351
  },
  {
    "slug": "junction",
    "name": "Junction",
    "county": "Kimble",
    "region": "hill-country",
    "lat": 30.4894,
    "lng": -99.772
  },
  {
    "slug": "navasota",
    "name": "Navasota",
    "county": "Grimes",
    "region": "prairies-lakes",
    "lat": 30.388,
    "lng": -96.0877
  },
  {
    "slug": "canadian",
    "name": "Canadian",
    "county": "Hemphill",
    "region": "panhandle-plains",
    "lat": 35.9128,
    "lng": -100.3821
  },
  {
    "slug": "coleman",
    "name": "Coleman",
    "county": "Coleman",
    "region": "hill-country",
    "lat": 31.8274,
    "lng": -99.4265
  },
  {
    "slug": "crockett",
    "name": "Crockett",
    "county": "Houston",
    "region": "piney-woods",
    "lat": 31.3182,
    "lng": -95.4566
  },
  {
    "slug": "columbus",
    "name": "Columbus",
    "county": "Colorado",
    "region": "prairies-lakes",
    "lat": 29.7066,
    "lng": -96.5397
  },
  {
    "slug": "center",
    "name": "Center",
    "county": "Shelby",
    "region": "piney-woods",
    "lat": 31.7955,
    "lng": -94.1791
  },
  {
    "slug": "comanche",
    "name": "Comanche",
    "county": "Comanche",
    "region": "prairies-lakes",
    "lat": 31.8974,
    "lng": -98.6037
  },
  {
    "slug": "lampasas",
    "name": "Lampasas",
    "county": "Lampasas",
    "region": "hill-country",
    "lat": 31.0638,
    "lng": -98.1817
  },
  {
    "slug": "jasper",
    "name": "Jasper",
    "county": "Jasper",
    "region": "piney-woods",
    "lat": 30.9202,
    "lng": -93.9966
  },
  {
    "slug": "anahuac",
    "name": "Anahuac",
    "county": "Chambers",
    "region": "gulf-coast",
    "lat": 29.773,
    "lng": -94.6827
  },
  {
    "slug": "graham",
    "name": "Graham",
    "county": "Young",
    "region": "prairies-lakes",
    "lat": 33.1071,
    "lng": -98.5895
  },
  {
    "slug": "breckenridge",
    "name": "Breckenridge",
    "county": "Stephens",
    "region": "prairies-lakes",
    "lat": 32.7557,
    "lng": -98.9023
  },
  {
    "slug": "presidio",
    "name": "Presidio",
    "county": "Presidio",
    "region": "big-bend",
    "lat": 29.5607,
    "lng": -104.3721
  },
  {
    "slug": "pecos",
    "name": "Pecos",
    "county": "Reeves",
    "region": "big-bend",
    "lat": 31.4229,
    "lng": -103.4932
  },
  {
    "slug": "marble-falls",
    "name": "Marble Falls",
    "county": "Burnet",
    "region": "hill-country",
    "lat": 30.5782,
    "lng": -98.2728
  },
  {
    "slug": "port-aransas",
    "name": "Port Aransas",
    "county": "Nueces",
    "region": "gulf-coast",
    "lat": 27.8339,
    "lng": -97.0611
  },
  {
    "slug": "gruene-historic-district",
    "name": "Gruene Historic District",
    "county": "Comal",
    "region": "hill-country",
    "lat": 29.7381,
    "lng": -98.1039
  },
  {"slug":"round-top","name":"Round Top","county":"Fayette","region":"prairies-lakes","lat":30.0651,"lng":-96.696},
  {"slug":"canton","name":"Canton","county":"Van Zandt","region":"piney-woods","lat":32.5566,"lng":-95.8626},
  {"slug":"taylor","name":"Taylor","county":"Williamson","region":"prairies-lakes","lat":30.5708,"lng":-97.4094},
  {"slug":"waxahachie","name":"Waxahachie","county":"Ellis","region":"prairies-lakes","lat":32.386,"lng":-96.8477},
  {"slug":"weatherford","name":"Weatherford","county":"Parker","region":"prairies-lakes","lat":32.7593,"lng":-97.7972},
  {"slug":"grapevine","name":"Grapevine","county":"Tarrant","region":"prairies-lakes","lat":32.9344,"lng":-97.0781}
];
