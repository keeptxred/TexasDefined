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

export const FOOD_TRUCK_SOURCE_CHECKED_AT = "2026-09-05";
export const FOOD_TRUCK_TOTAL = 300;
const RESTAURANTJI = "Restaurantji food-truck category (discovery baseline)";

export const FOOD_TRUCK_MARKETS: FoodTruckMarket[] = [
  {
    slug: "austin",
    path: "/texas-food-trucks/austin",
    city: "Austin",
    region: "Central Texas",
    title: "Austin Food Trucks Worth Finding",
    seoTitle: "Best Austin Food Trucks: TexasDefined Notable Truck Guide",
    description: "Austin food trucks mix barbecue, tacos, international street food, coffee trailers and chef-driven concepts across a city where trailer courts are part of the dining culture.",
    sourceUrl: "https://www.restaurantji.com/tx/austin/food-trucks/",
    sourceLabel: RESTAURANTJI,
    sourceCheckedAt: FOOD_TRUCK_SOURCE_CHECKED_AT,
  },
  {
    slug: "houston",
    path: "/texas-food-trucks/houston",
    city: "Houston",
    region: "Gulf Coast",
    title: "Houston Food Trucks Worth Finding",
    seoTitle: "Best Houston Food Trucks: TexasDefined Notable Truck Guide",
    description: "Houston’s mobile-food scene reflects the city itself: international, late-night and wide-ranging, with tacos, halal cooking, barbecue, birria, sweets and fusion concepts.",
    sourceUrl: "https://www.restaurantji.com/tx/houston/food-trucks/",
    sourceLabel: RESTAURANTJI,
    sourceCheckedAt: FOOD_TRUCK_SOURCE_CHECKED_AT,
  },
  {
    slug: "san-antonio",
    path: "/texas-food-trucks/san-antonio",
    city: "San Antonio",
    region: "South Central Texas",
    title: "San Antonio Food Trucks Worth Finding",
    seoTitle: "Best San Antonio Food Trucks: TexasDefined Notable Truck Guide",
    description: "San Antonio trailers carry the city’s Tex-Mex foundation into birria, tacos, shawarma, barbecue, Asian street food, coffee and chef-led mobile kitchens.",
    sourceUrl: "https://www.restaurantji.com/tx/san-antonio/food-trucks/",
    sourceLabel: RESTAURANTJI,
    sourceCheckedAt: FOOD_TRUCK_SOURCE_CHECKED_AT,
  },
  {
    slug: "fort-worth",
    path: "/texas-food-trucks/fort-worth",
    city: "Fort Worth",
    region: "North Texas",
    title: "Fort Worth Food Trucks Worth Finding",
    seoTitle: "Best Fort Worth Food Trucks: TexasDefined Notable Truck Guide",
    description: "Fort Worth’s mobile-food scene stretches from taco trailers and barbecue to shaved ice, burgers and chef-led concepts that fit the city’s neighborhood and event culture.",
    sourceUrl: "https://www.restaurantji.com/tx/fort-worth/food-trucks/",
    sourceLabel: RESTAURANTJI,
    sourceCheckedAt: FOOD_TRUCK_SOURCE_CHECKED_AT,
  },
  {
    slug: "el-paso",
    path: "/texas-food-trucks/el-paso",
    city: "El Paso",
    region: "Far West Texas",
    title: "El Paso Food Trucks Worth Finding",
    seoTitle: "Best El Paso Food Trucks: TexasDefined Notable Truck Guide",
    description: "El Paso food trucks blend border flavor with seafood, Filipino cooking, burgers, birria, shaved ice and other mobile concepts shaped by the city’s binational food culture.",
    sourceUrl: "https://www.restaurantji.com/tx/el-paso/food-trucks/",
    sourceLabel: RESTAURANTJI,
    sourceCheckedAt: FOOD_TRUCK_SOURCE_CHECKED_AT,
    primaryCountySlug: "el-paso",
  },
  {
    slug: "dallas",
    path: "/texas-food-trucks/dallas",
    city: "Dallas",
    region: "North Texas",
    title: "Dallas Food Trucks Worth Finding",
    seoTitle: "Best Dallas Food Trucks: TexasDefined Notable Truck Guide",
    description: "Dallas food trucks cover tacos, barbecue, desserts, pizza, coffee and event-focused mobile kitchens across a fast-moving North Texas dining scene.",
    sourceUrl: "https://www.restaurantji.com/tx/dallas/food-trucks/",
    sourceLabel: RESTAURANTJI,
    sourceCheckedAt: FOOD_TRUCK_SOURCE_CHECKED_AT,
  },
  {
    slug: "waco",
    path: "/texas-food-trucks/waco",
    city: "Waco",
    region: "Central Texas",
    title: "Waco Food Trucks Worth Finding",
    seoTitle: "Best Waco Food Trucks: TexasDefined Notable Truck Guide",
    description: "Waco’s food-truck mix includes tacos, barbecue, burgers, lemonade and visitor-friendly mobile stops that complement the city’s downtown and neighborhood dining.",
    sourceUrl: "https://www.restaurantji.com/tx/waco/food-trucks/",
    sourceLabel: RESTAURANTJI,
    sourceCheckedAt: FOOD_TRUCK_SOURCE_CHECKED_AT,
    primaryCountySlug: "mclennan",
  },
  {
    slug: "corpus-christi",
    path: "/texas-food-trucks/corpus-christi",
    city: "Corpus Christi",
    region: "Gulf Coast",
    title: "Corpus Christi Food Trucks Worth Finding",
    seoTitle: "Best Corpus Christi Food Trucks: TexasDefined Notable Truck Guide",
    description: "Corpus Christi food trucks bring tacos, birria, barbecue, tamales and other South Texas flavors into a coastal city where casual outdoor eating fits naturally.",
    sourceUrl: "https://www.restaurantji.com/tx/corpus-christi/food-trucks/",
    sourceLabel: RESTAURANTJI,
    sourceCheckedAt: FOOD_TRUCK_SOURCE_CHECKED_AT,
  },
  {
    slug: "amarillo",
    path: "/texas-food-trucks/amarillo",
    city: "Amarillo",
    region: "Texas Panhandle",
    title: "Amarillo Food Trucks Worth Finding",
    seoTitle: "Best Amarillo Food Trucks: TexasDefined Notable Truck Guide",
    description: "Amarillo’s mobile kitchens range from breakfast and barbecue to Mexican street food, Mediterranean cooking, fried chicken and desserts across the Panhandle.",
    sourceUrl: "https://www.restaurantji.com/tx/amarillo/food-trucks/",
    sourceLabel: RESTAURANTJI,
    sourceCheckedAt: FOOD_TRUCK_SOURCE_CHECKED_AT,
  },
  {
    slug: "college-station",
    path: "/texas-food-trucks/college-station",
    city: "College Station",
    region: "Brazos Valley",
    title: "College Station Food Trucks Worth Finding",
    seoTitle: "Best College Station Food Trucks: TexasDefined Notable Truck Guide",
    description: "College Station food trucks serve Aggieland with tacos, halal cooking, burgers, hibachi and late-night food built around a university-centered market.",
    sourceUrl: "https://www.restaurantji.com/tx/college-station/food-trucks/",
    sourceLabel: RESTAURANTJI,
    sourceCheckedAt: FOOD_TRUCK_SOURCE_CHECKED_AT,
    primaryCountySlug: "brazos",
  },
];

const MARKET_BY_SLUG = new Map(FOOD_TRUCK_MARKETS.map((market) => [market.slug, market]));

export function foodTruckMarketMeta(slug: string) {
  return MARKET_BY_SLUG.get(slug as FoodTruckMarketSlug);
}
