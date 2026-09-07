export type TexasBrandDirectoryCategorySlug =
  | "grocery-markets"
  | "food-drink"
  | "western-outdoors"
  | "travel-retail"
  | "technology";

export type TexasBrandCommercialPlacementType = "affiliate" | "sponsored" | "direct";

export interface TexasBrandCommercialPlacement {
  type: TexasBrandCommercialPlacementType;
  href: string;
  cta: string;
  disclosure: string;
}

export interface TexasBrandDirectoryEntry {
  slug: string;
  name: string;
  category: TexasBrandDirectoryCategorySlug;
  texasConnection: string;
  href?: string;
  commercial?: TexasBrandCommercialPlacement;
}

export interface TexasBrandDirectoryCategory {
  slug: TexasBrandDirectoryCategorySlug;
  label: string;
  description: string;
}

export const TEXAS_BRAND_DIRECTORY_CATEGORIES: readonly TexasBrandDirectoryCategory[] = [
  {
    slug: "grocery-markets",
    label: "Grocery & Markets",
    description:
      "Texas-founded grocers, regional supermarket families and store formats that became part of everyday shopping life across the state.",
  },
  {
    slug: "food-drink",
    label: "Food & Drink",
    description:
      "Texas-born restaurants, beverages and packaged-food names whose origin stories are tied to particular cities, towns and routines.",
  },
  {
    slug: "western-outdoors",
    label: "Western, Workwear & Outdoors",
    description:
      "Boots, hats, workwear and outdoor retailers that connect Texas commerce with ranching, trades, recreation and Western style.",
  },
  {
    slug: "travel-retail",
    label: "Travel, Retail & Everyday Texas",
    description:
      "Road-trip institutions, bookstores, delivery businesses and retailers that became recognizable pieces of daily Texas culture.",
  },
  {
    slug: "technology",
    label: "Technology & Modern Texas Business",
    description:
      "Texas-rooted companies whose growth reflects the state's modern technology and business economy.",
  },
] as const;

/**
 * Editorial inclusion and commercial placement are intentionally separate.
 * A brand can appear here without any commercial relationship. Commercial
 * fields must only be populated after a real, verified affiliate, sponsorship
 * or direct-partner agreement exists, and the disclosure must remain visible.
 */
export const TEXAS_BRAND_DIRECTORY: readonly TexasBrandDirectoryEntry[] = [
  {
    slug: "heb",
    name: "H-E-B",
    category: "grocery-markets",
    texasConnection:
      "Founded in Kerrville in 1905, H-E-B grew from a family grocery into one of the institutions most closely associated with everyday life in Texas.",
    href: "/article/heb-texas-grocery-history-culture",
  },
  {
    slug: "central-market",
    name: "Central Market",
    category: "grocery-markets",
    texasConnection:
      "H-E-B opened the first Central Market in Austin in 1994, creating a specialty-food format with a distinct Texas identity of its own.",
    href: "/article/heb-texas-grocery-history-culture",
  },
  {
    slug: "joe-vs-smart-shop",
    name: "Joe V's Smart Shop",
    category: "grocery-markets",
    texasConnection:
      "H-E-B launched Joe V's Smart Shop in Houston in 2010 as a value-focused grocery format designed around price-conscious shoppers.",
    href: "/article/heb-texas-grocery-history-culture",
  },
  {
    slug: "mi-tienda",
    name: "Mi Tienda",
    category: "grocery-markets",
    texasConnection:
      "H-E-B introduced Mi Tienda in Houston as a Latino-focused market format, giving the broader H-E-B family another distinctly Texas retail expression.",
    href: "/article/heb-texas-grocery-history-culture",
  },
  {
    slug: "brookshires",
    name: "Brookshire's",
    category: "grocery-markets",
    texasConnection:
      "Wood T. Brookshire opened the first Brookshire's grocery on the courthouse square in Tyler in 1928; the family-owned company remains rooted in East Texas.",
  },
  {
    slug: "fresh-by-brookshires",
    name: "FRESH by Brookshire's",
    category: "grocery-markets",
    texasConnection:
      "FRESH is one of the modern store banners operated by Tyler-based Brookshire Grocery Company, extending the company's East Texas grocery heritage into a specialty format.",
  },
  {
    slug: "super-1-foods",
    name: "Super 1 Foods",
    category: "grocery-markets",
    texasConnection:
      "Super 1 Foods is part of the Brookshire Grocery Company family and shares the Tyler-based grocer's long regional history across Texas and neighboring states.",
  },
  {
    slug: "spring-market",
    name: "Spring Market",
    category: "grocery-markets",
    texasConnection:
      "Spring Market is another Brookshire Grocery Company banner, connecting smaller-community grocery service to the Tyler-based retailer's regional footprint.",
  },
  {
    slug: "united-supermarkets",
    name: "United Supermarkets",
    category: "grocery-markets",
    texasConnection:
      "United's roots date to 1916, and its Texas expansion began in the mid-20th century before the brand became a familiar grocery name across West Texas and the Panhandle.",
  },
  {
    slug: "market-street",
    name: "Market Street",
    category: "grocery-markets",
    texasConnection:
      "Market Street is one of the store formats in The United Family, serving Texas communities as a more specialty-oriented supermarket banner.",
  },
  {
    slug: "amigos",
    name: "Amigos",
    category: "grocery-markets",
    texasConnection:
      "Amigos is part of The United Family of grocery formats and is particularly associated with communities across West Texas and the Panhandle.",
  },
  {
    slug: "fiesta-mart",
    name: "Fiesta Mart",
    category: "grocery-markets",
    texasConnection:
      "Fiesta Mart has served Texas shoppers since 1972 and built its identity around international foods and multicultural grocery shopping in major Texas metros.",
  },
  {
    slug: "whole-foods-market",
    name: "Whole Foods Market",
    category: "grocery-markets",
    texasConnection:
      "Whole Foods Market opened its first store in Austin in 1980, turning a local natural-foods concept into a national grocery brand while keeping an important Texas origin story.",
  },
  {
    slug: "whataburger",
    name: "Whataburger",
    category: "food-drink",
    texasConnection:
      "Founded in Corpus Christi in 1950, Whataburger became a Texas fast-food landmark through its oversized burgers, orange-and-white identity and road-trip familiarity.",
    href: "/texas-brand-origin-stories",
  },
  {
    slug: "blue-bell",
    name: "Blue Bell",
    category: "food-drink",
    texasConnection:
      "The Brenham creamery grew from a local dairy business into an ice-cream brand with unusually strong hometown and statewide loyalty.",
    href: "/article/blue-bell-ice-cream-brenham-texas-history",
  },
  {
    slug: "shiner",
    name: "Shiner",
    category: "food-drink",
    texasConnection:
      "Beer brewed in the small Lavaca County town of Shiner turned the town name itself into one of Texas's most recognizable beverage identities.",
    href: "/texas-brand-origin-stories",
  },
  {
    slug: "shipley-do-nuts",
    name: "Shipley Do-Nuts",
    category: "food-drink",
    texasConnection:
      "Houston-born Shipley made hot glazed doughnuts and Texas-style kolache-shop breakfasts part of the morning routine for generations of customers.",
  },
  {
    slug: "tiffs-treats",
    name: "Tiff's Treats",
    category: "food-drink",
    texasConnection:
      "Founded in Austin, Tiff's Treats turned warm-cookie delivery into a recognizable gifting and celebration business that expanded far beyond its college-town beginnings.",
  },
  {
    slug: "chuys",
    name: "Chuy's",
    category: "food-drink",
    texasConnection:
      "Austin-born Chuy's combined Tex-Mex food with an intentionally eccentric visual style that made the restaurant brand easy to recognize across Texas.",
  },
  {
    slug: "dr-pepper",
    name: "Dr Pepper",
    category: "food-drink",
    texasConnection:
      "Created in Waco in the 1880s, Dr Pepper is one of the best-documented Texas-born consumer brands and remains closely tied to its hometown story.",
    href: "/dr-pepper-texas-history",
  },
  {
    slug: "resistol",
    name: "Resistol",
    category: "western-outdoors",
    texasConnection:
      "Garland hat-making roots helped make Resistol one of the names most closely associated with Texas cowboy hats and Western wear.",
  },
  {
    slug: "lucchese",
    name: "Lucchese",
    category: "western-outdoors",
    texasConnection:
      "The El Paso bootmaker became known for high-end Western boots and craftsmanship tied to the state's border and ranching culture.",
  },
  {
    slug: "dickies",
    name: "Dickies",
    category: "western-outdoors",
    texasConnection:
      "Fort Worth workwear roots connect Dickies to Texas trades, ranch work and industrial labor before the brand crossed into global street style.",
    href: "/texas-brand-origin-stories",
  },
  {
    slug: "justin-boots",
    name: "Justin Boots",
    category: "western-outdoors",
    texasConnection:
      "North Texas bootmaking history turned the Justin name into a long-running Western-wear standard.",
  },
  {
    slug: "academy-sports-outdoors",
    name: "Academy Sports + Outdoors",
    category: "western-outdoors",
    texasConnection:
      "The Texas-rooted sporting-goods retailer became a familiar stop for fishing, hunting, sports and outdoor gear across the state.",
  },
  {
    slug: "bucees",
    name: "Buc-ee's",
    category: "travel-retail",
    texasConnection:
      "Buc-ee's began in the Lake Jackson area in 1982 and transformed the highway convenience stop into a destination built around fuel, food, merchandise and road-trip ritual.",
    href: "/article/bucees-texas-road-trip-history",
  },
  {
    slug: "half-price-books",
    name: "Half Price Books",
    category: "travel-retail",
    texasConnection:
      "Founded in Dallas, Half Price Books built a Texas retail identity around used books, records and the experience of browsing.",
  },
  {
    slug: "dell-technologies",
    name: "Dell Technologies",
    category: "technology",
    texasConnection:
      "Michael Dell's Austin-area computer business became one of the state's defining technology success stories and a symbol of modern Central Texas growth.",
  },
] as const;

export function getTexasBrandDirectoryByCategory(
  category: TexasBrandDirectoryCategorySlug,
): readonly TexasBrandDirectoryEntry[] {
  return TEXAS_BRAND_DIRECTORY.filter((entry) => entry.category === category);
}

export function getTexasBrandCommercialPlacement(
  entry: TexasBrandDirectoryEntry,
): TexasBrandCommercialPlacement | undefined {
  return entry.commercial;
}
