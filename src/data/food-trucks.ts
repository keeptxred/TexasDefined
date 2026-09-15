export type FoodTruckMarketSlug = "austin" | "houston" | "san-antonio" | "fort-worth" | "el-paso" | "dallas" | "waco" | "corpus-christi" | "amarillo" | "college-station";

export interface FoodTruckMarket {
  slug: FoodTruckMarketSlug;
  path: string;
  city: string;
  region: string;
  title: string;
  seoTitle: string;
  description: string;
  sourceUrl: string;
  sourceLabel: string;
  sourceCheckedAt: string;
  primaryCountySlug?: string;
}

export interface FoodTruckRecord {
  id: string;
  slug: string;
  name: string;
  marketSlug: FoodTruckMarketSlug;
  city: string;
  region: string;
  sourceUrl: string;
  sourceLabel: string;
  sourceCheckedAt: string;
  sourceType: "discovery" | "editorial";
}

export const FOOD_TRUCK_SOURCE_CHECKED_AT = "2026-09-05";
const RESTAURANTJI = "Restaurantji food-truck category (discovery baseline)";

export const FOOD_TRUCK_MARKETS: FoodTruckMarket[] = [
  {
    "slug": "austin",
    "path": "/texas-food-trucks/austin",
    "city": "Austin",
    "region": "Central Texas",
    "title": "Austin Food Trucks Worth Finding",
    "seoTitle": "Best Austin Food Trucks: TexasDefined Notable Truck Guide",
    "description": "Austin food trucks mix barbecue, tacos, international street food, coffee trailers and chef-driven concepts across a city where trailer courts are part of the dining culture.",
    "sourceUrl": "https://www.restaurantji.com/tx/austin/food-trucks/",
    "sourceLabel": RESTAURANTJI,
    "sourceCheckedAt": FOOD_TRUCK_SOURCE_CHECKED_AT
  },
  {
    "slug": "houston",
    "path": "/texas-food-trucks/houston",
    "city": "Houston",
    "region": "Gulf Coast",
    "title": "Houston Food Trucks Worth Finding",
    "seoTitle": "Best Houston Food Trucks: TexasDefined Notable Truck Guide",
    "description": "Houston’s mobile-food scene reflects the city itself: international, late-night and wide-ranging, with tacos, halal cooking, barbecue, birria, sweets and fusion concepts.",
    "sourceUrl": "https://www.restaurantji.com/tx/houston/food-trucks/",
    "sourceLabel": RESTAURANTJI,
    "sourceCheckedAt": FOOD_TRUCK_SOURCE_CHECKED_AT
  },
  {
    "slug": "san-antonio",
    "path": "/texas-food-trucks/san-antonio",
    "city": "San Antonio",
    "region": "South Central Texas",
    "title": "San Antonio Food Trucks Worth Finding",
    "seoTitle": "Best San Antonio Food Trucks: TexasDefined Notable Truck Guide",
    "description": "San Antonio trailers carry the city’s Tex-Mex foundation into birria, tacos, shawarma, barbecue, Asian street food, coffee and chef-led mobile kitchens.",
    "sourceUrl": "https://www.restaurantji.com/tx/san-antonio/food-trucks/",
    "sourceLabel": RESTAURANTJI,
    "sourceCheckedAt": FOOD_TRUCK_SOURCE_CHECKED_AT
  },
  {
    "slug": "fort-worth",
    "path": "/texas-food-trucks/fort-worth",
    "city": "Fort Worth",
    "region": "North Texas",
    "title": "Fort Worth Food Trucks Worth Finding",
    "seoTitle": "Best Fort Worth Food Trucks: TexasDefined Notable Truck Guide",
    "description": "Fort Worth’s mobile-food scene stretches from taco trailers and barbecue to shaved ice, burgers and chef-led concepts that fit the city’s neighborhood and event culture.",
    "sourceUrl": "https://www.restaurantji.com/tx/fort-worth/food-trucks/",
    "sourceLabel": RESTAURANTJI,
    "sourceCheckedAt": FOOD_TRUCK_SOURCE_CHECKED_AT
  },
  {
    "slug": "el-paso",
    "path": "/texas-food-trucks/el-paso",
    "city": "El Paso",
    "region": "Far West Texas",
    "title": "El Paso Food Trucks Worth Finding",
    "seoTitle": "Best El Paso Food Trucks: TexasDefined Notable Truck Guide",
    "description": "El Paso food trucks blend border flavor with seafood, Filipino cooking, burgers, birria, shaved ice and other mobile concepts shaped by the city’s binational food culture.",
    "sourceUrl": "https://www.restaurantji.com/tx/el-paso/food-trucks/",
    "sourceLabel": RESTAURANTJI,
    "sourceCheckedAt": FOOD_TRUCK_SOURCE_CHECKED_AT,
    "primaryCountySlug": "el-paso"
  },
  {
    "slug": "dallas",
    "path": "/texas-food-trucks/dallas",
    "city": "Dallas",
    "region": "North Texas",
    "title": "Dallas Food Trucks Worth Finding",
    "seoTitle": "Best Dallas Food Trucks: TexasDefined Notable Truck Guide",
    "description": "Dallas food trucks cover tacos, barbecue, desserts, pizza, coffee and event-focused mobile kitchens across a fast-moving North Texas dining scene.",
    "sourceUrl": "https://www.restaurantji.com/tx/dallas/food-trucks/",
    "sourceLabel": RESTAURANTJI,
    "sourceCheckedAt": FOOD_TRUCK_SOURCE_CHECKED_AT
  },
  {
    "slug": "waco",
    "path": "/texas-food-trucks/waco",
    "city": "Waco",
    "region": "Central Texas",
    "title": "Waco Food Trucks Worth Finding",
    "seoTitle": "Best Waco Food Trucks: TexasDefined Notable Truck Guide",
    "description": "Waco’s food-truck mix includes tacos, barbecue, burgers, lemonade and visitor-friendly mobile stops that complement the city’s downtown and neighborhood dining.",
    "sourceUrl": "https://www.restaurantji.com/tx/waco/food-trucks/",
    "sourceLabel": RESTAURANTJI,
    "sourceCheckedAt": FOOD_TRUCK_SOURCE_CHECKED_AT,
    "primaryCountySlug": "mclennan"
  },
  {
    "slug": "corpus-christi",
    "path": "/texas-food-trucks/corpus-christi",
    "city": "Corpus Christi",
    "region": "Gulf Coast",
    "title": "Corpus Christi Food Trucks Worth Finding",
    "seoTitle": "Best Corpus Christi Food Trucks: TexasDefined Notable Truck Guide",
    "description": "Corpus Christi food trucks bring tacos, birria, barbecue, tamales and other South Texas flavors into a coastal city where casual outdoor eating fits naturally.",
    "sourceUrl": "https://www.restaurantji.com/tx/corpus-christi/food-trucks/",
    "sourceLabel": RESTAURANTJI,
    "sourceCheckedAt": FOOD_TRUCK_SOURCE_CHECKED_AT
  },
  {
    "slug": "amarillo",
    "path": "/texas-food-trucks/amarillo",
    "city": "Amarillo",
    "region": "Texas Panhandle",
    "title": "Amarillo Food Trucks Worth Finding",
    "seoTitle": "Best Amarillo Food Trucks: TexasDefined Notable Truck Guide",
    "description": "Amarillo’s mobile kitchens range from breakfast and barbecue to Mexican street food, Mediterranean cooking, fried chicken and desserts across the Panhandle.",
    "sourceUrl": "https://www.restaurantji.com/tx/amarillo/food-trucks/",
    "sourceLabel": RESTAURANTJI,
    "sourceCheckedAt": FOOD_TRUCK_SOURCE_CHECKED_AT
  },
  {
    "slug": "college-station",
    "path": "/texas-food-trucks/college-station",
    "city": "College Station",
    "region": "Brazos Valley",
    "title": "College Station Food Trucks Worth Finding",
    "seoTitle": "Best College Station Food Trucks: TexasDefined Notable Truck Guide",
    "description": "College Station food trucks serve Aggieland with tacos, halal cooking, burgers, hibachi and late-night food built around a university-centered market.",
    "sourceUrl": "https://www.restaurantji.com/tx/college-station/food-trucks/",
    "sourceLabel": RESTAURANTJI,
    "sourceCheckedAt": FOOD_TRUCK_SOURCE_CHECKED_AT,
    "primaryCountySlug": "brazos"
  },
];

const NAMES_BY_MARKET: Record<FoodTruckMarketSlug, readonly string[]> = {
  "austin": ["KG BBQ", "Micklethwait Barbecue", "Cuantos Tacos", "Brown's BBQ", "Paprika ATX", "The Potluck", "El Marisquero Seafood", "Leroy and Lewis Barbecue", "Briscuits", "R&B's Steak and Fries", "T-Loc's Sonora", "PANINIK", "Manolis Ice Cream, Pops, Sorbet & More", "Good BBQ Company", "Eggman - Breakfast Sandwiches", "Discada", "Terrible Love", "TacolyMoly By Ygor", "Song La", "Mr. Pimento Catering & Dining", "Asado's Taqueria", "Cachitos512", "Bombay Street Food", "Monks Momo", "Radix House Coffee", "WEIRD FOOD Famous Chicken Over Rice & Halal Street Eats Mediterranean • Indian • Pakistani", "Shoyu Sugar", "Gimme Burger", "Cosmic Pickle", "Jims Smokehouse Four Points", "Spicy Boys Fried Chicken - East 6th", "Nissi Vegan Méxican Cuisine", "Up the Steaks & Cheese", "Kiin Di", "Las Trancas Taco Stand", "Hippy Eats and Spiritual Healing", "Taqueria La Casita del pastor", "AUSTHENTICO", "Chef Hong", "Los Galanes Birrias & Tacos", "El Primo", "Abo Youssef Mediterranean Food", "Bombay Walaa Chaat", "Kerlaches", "Tejas Birria- Austin", "Cenizo", "Bodhi Viet Veggie Cuisine"],
  "houston": ["Leemoo Health Bar", "El Taconazo", "Lard Hav Mercy Eatery/Restaurant", "Jody Grill's", "Sun & Sno Snacks and more", "The Birria Queen (Food Truck)", "El Alebrije (Food Truck)", "The DoughCone", "Shawarma & Kebab Fresh", "Gourmandize", "Midwest Coney Connection", "Kabab Shako Mako (Food Truck)", "Birria Los Primos", "Loaded Burger by M&M Grill (Sugarland)", "Orange Taco", "True Dog Houston", "Tacos Tierra Caliente (Food Truck)", "Main Bird", "Taco Fuego – Halal Birria, Smash Burgers & Wings (Spring Branch Houston)", "Los Tacos Gerardo", "Clutch City Grill", "Homies (Food Truck)", "Space City BBQ & Beyond (Food Truck)", "Snolicious Snoballs", "Creole Flava (Food Truck) Restaurant", "MadMax BBQ Catering Food Truck Only LLC", "Javi's Tacos y Mas", "Taqueria Donde El Richy (Food Truck)Llc", "Pit King BBQ", "Taqueria Tres Marias", "EL Taco Rico Aracely (Food Truck)", "Birrieria Tamazula (Food Truck)", "Los Garcia on Wheels", "Dripped Birria (Midtown)", "Larita's Cafe (Food Truck)", "Spice Indian (Food Truck)", "El Tlacoyo Bigoton (Food Truck)", "Medallo (Food Truck)", "Tacos El Zeba's (Food Truck)", "Al Hawi Grill (Food Truck)", "Houstatlantavegan (Food Truck)", "Boombox Taco (Food Truck)", "3 Hermanas Taqueria", "Abu Omar Halal", "Mr Sabor", "Ella Coffee", "La Cubana en Houston", "Houston Sauce Pit"],
  "san-antonio": ["Pete's Hot Chicken", "The Pita Chick", "Theory Coffee Company", "Caty’s Tacos", "King of Shawarma & Kabab", "Sensational Salads and Wraps", "The Chefss Cuisine on Wheels", "Carnitas Don Raúl", "Malik's Philly's Phamous Cheesesteaks", "RJ Indian Street Food", "Smith's BBQ", "Mini Tacos El Caminante", "Malongdo Thai Food Truck", "El Charro Food Truck", "Los Weyes de la Asada", "Akhanay Coffee Roasters", "Picanha na Brasa", "Chicken Go - Pollos Asados", "Rock Quarry Bar-B-Que", "Shawarma Alzaeem", "Benjie's Munch", "Mini Tacos Los Dos Hermanos Food Truck", "La Generala", "Tacos El Takin", "Los Daniels", "Tacos El Pelon #2", "Cafe La Lele", "SNOW ISLAND & What You Want Southern Foods", "Mini tacos dino", "Papos Tacos", "Taco Grill #1", "Zulia's Kitchen Food Truck", "Savory Tastess Food Truck", "But First Cafecito", "Boba Pho U", "La Esquina", "Tacos El Pelon", "Doolittle's Mobile Kitchen & Catering", "Mexican Cowboy Street Kitchen", "Mini tacos 2 hermanos", "Flama Azul Brazilian Churrasco", "Authentic Taquitos San Miguel Allende", "Birrieria El Jefe", "Wera’s tacos", "Lada Ladies Food Truck & Catering Company", "Cake-N-Que", "Savage Coffee Co.", "Wok Wey"],
  "fort-worth": ["Big Dawgs Hot Dog Co.", "D's Smokering LLC BBQ", "La Factoria Tacos", "Snow Exciting - Shaved Ice / Snow Cone Stand and Catering", "Mariscos el cachanilla", "Sol y Luna Mexican Snow Cones and Snacks", "Crown Catering Texas", "Las Catrinas de Paco", "Anejo Taqueria", "Chula Chaser", "Hedarys Food Truck", "La Unión Taqueria #1", "Nopalitos Taqueria Food Truck", "Gordo’s Mexican Cocina", "La Escondida Taqueria", "Antojitos los Cerros", "Pinches Tacos", "Micheladas Olmos", "Los Cachorros", "Country City Grille", "Tacos Arandas", "Taqueria Los Cerros", "Carter's Coffee", "Gorditas Mi Durango", "Taqueria Ortiz Lonchera", "Tacos Ortiz", "Taqueria Munoz", "Tacos Con Pico", "Tacos los 98", "Doughnut Snob", "Taqueria a toda Maye", "Tacos", "Luna’s Tacos", "Paraiso - Paradise Shaved Ice & Elotes", "Los sabores de mi tierra", "Kap Que", "INARU Hibachi and Sushi", "Sweet Rice Kitchen", "Tacos Las Marias", "Soulfulsmokehousebbqllc", "Tacos Estilo D.F. AVE AYERS", "ComEat With Me", "Birrieria y Taqueria Cortez", "Taqueria Adrec's", "Birrieria Y Taqueria Los Patrones", "Che'f Tacos", "Junior's Taco Truck", "Naty Taqueria", "Toritos", "Luckybee Kitchen"],
  "el-paso": ["Antojitos Caribenos", "Taqueria Sabrosa", "Midnight grill", "LA BOMBA", "El Taquero Comer", "Blue Collar Shaved Ice", "Dia De Los Pescados", "Triple Count Mexican Grill (North)", "Rosies Dhaba Indian Food Truck", "The Hungry Wolf", "Meech's Hot Chicken", "El Chucoviche Mariscos", "Birriería El Güero", "Star Burgers", "La Pupusona Pellicano#2", "Mariscos y Garnachas La Chilanga (food truck)", "Tako Tako Tacos", "Los Traviesos", "Taqueria Marquez", "KAI Filipino Cuisine", "Pappasita's Loaded Fries", "Tacos 915", "La morenita food truck", "Hamburgesas Lola", "Ferny's Barbacoa", "It’s Lit MexiQue Food Truck", "Orange Cow Burgers", "Súper Lonches", "Rex Ball", "Social Ice", "Lonches y hamburguesas LOS TOTONES", "Grama Coco", "Taza hotdogs", "Moncheese food truck", "Don Chilaquil"],
  "dallas": ["Tacos, Bites & Beats Food Truck & Catering", "MyPiesPizzeria LLC", "Freshnez", "Cuates (kwa.tes) Kitchen", "Mr. Sugar Rush", "Taqueria The 3 Brothers Regios", "nozomi hibachi and teriyaki", "JuJu's Coffee", "Abe's Flavor Flave (Food Truck)", "DL Shaved Ice", "So Icy", "TM Icecream", "Mrs Hot Taco LLC", "Serious Salads Food Truck", "Dallas Dee's Place | Food Truck and Catering", "Elotes Miry", "D Jackson BBQ and Catering", "Snowie Naturals DFW", "Pinche Smokerz Tex-Mex BBQ LLC", "Cousins Maine Lobster", "What's The Flava! (Food Truck)", "Bobaddiction Food Truck", "Andy's Treat Truck"],
  "waco": ["Pop's Lemonade Company", "SISON TACOS", "Club Sandwich Food Truck", "Uncle Worm's Texas Cuisine", "The Turkey Leg Shack, LLC", "Chute 4 Rodeo Foods", "Burgertology", "Taqueria \"Mis Marias\"", "Alabama Sweet Tea Company", "Taqueria La Chona", "Los Trancos", "Taqueria La Milpa", "Taqueria El Gallo", "El Norteño", "The pizza truck"],
  "corpus-christi": ["Halal Street Eats", "The Latin Calzone LLC", "J&M SMOKE BBQ", "Antojitos San Benito", "Birrieria y Mariscos El Presidente", "Full Send Barbecue", "Big Papas", "Tacos El Tri", "El Gavilan Pollero", "TacoBar Street", "Don Jorge Taqueria", "Huerta's Tamales"],
  "amarillo": ["Cream Over Waffles", "The Brunch Truck of Amarillo", "Mi Gente", "Babylon Mediterranean Food", "The Chicken Coop", "Burrito Barn", "Kikis’s tacos", "Pork N Things BBQ", "Schnitzel and dreams food trailer", "Birria y Tacos El Rey", "Canelos Taqueria", "Panchos Burguers LLC (Taquera)", "Taqueria El Giro"],
  "college-station": ["Raging Bull Street Taco's", "Abu Omar Halal", "Taco Boss", "BAD CHX - College Station, TX", "Taqueria Allende", "Taqueria Los Chavos Authentic Mexican Food", "The Beef and Reef Food Truck", "CharlieMacs Burger Kitchen", "Macondo Grill"],
};

const EDITORIAL_SOURCE_BY_KEY: Readonly<Record<string, { sourceUrl: string; sourceLabel: string }>> = {
  "houston::Houston Sauce Pit": {
    sourceUrl: "https://houston.eater.com/maps/houston-best-food-trucks",
    sourceLabel: "Eater Houston — 15 Must-Try Houston Food Trucks",
  },
  "san-antonio::Wok Wey": {
    sourceUrl: "https://community.sacurrent.com/best-of/2026/food-and-drink?feature=2124535",
    sourceLabel: "San Antonio Current Best of San Antonio 2026 — Critics’ Pick, Best Food Truck",
  },
  "fort-worth::Luckybee Kitchen": {
    sourceUrl: "https://www.star-telegram.com/news/local/fort-worth/article286706830.html",
    sourceLabel: "Fort Worth Star-Telegram Readers’ Choice food-truck winner",
  },
};

const MARKET_BY_SLUG = new Map(FOOD_TRUCK_MARKETS.map((market) => [market.slug, market]));

export const FOOD_TRUCKS: FoodTruckRecord[] = FOOD_TRUCK_MARKETS.flatMap((market) =>
  NAMES_BY_MARKET[market.slug].map((name, index) => {
    const editorial = EDITORIAL_SOURCE_BY_KEY[`${market.slug}::${name}`];
    return {
      id: `food-truck:${market.slug}:${slugify(name)}-${index + 1}`,
      slug: slugify(name),
      name,
      marketSlug: market.slug,
      city: market.city,
      region: market.region,
      sourceUrl: editorial?.sourceUrl ?? market.sourceUrl,
      sourceLabel: editorial?.sourceLabel ?? market.sourceLabel,
      sourceCheckedAt: FOOD_TRUCK_SOURCE_CHECKED_AT,
      sourceType: editorial ? "editorial" : "discovery",
    };
  }),
);

export const FOOD_TRUCK_TOTAL = FOOD_TRUCKS.length;

export function foodTruckMarket(slug: string) {
  return MARKET_BY_SLUG.get(slug as FoodTruckMarketSlug);
}

export function foodTrucksForMarket(slug: FoodTruckMarketSlug) {
  return FOOD_TRUCKS.filter((truck) => truck.marketSlug === slug);
}

export function foodTruckCountForMarket(slug: FoodTruckMarketSlug) {
  return NAMES_BY_MARKET[slug].length;
}

export function foodTruckMarketsForCounty(countySlug: string) {
  return FOOD_TRUCK_MARKETS.filter((market) => market.primaryCountySlug === countySlug);
}

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
