import type { TexasIconItem } from "./things-unique-to-texas";

export type TexasBrandDirectoryCategorySlug =
  | "grocery-markets"
  | "food-drink"
  | "western-outdoors"
  | "travel-retail"
  | "technology";

export interface TexasBrandCommercialPlacement {
  type: "affiliate" | "sponsored" | "direct";
  href: string;
  cta: string;
  disclosure: string;
}

export interface TexasBrandSupplement {
  slug: string;
  name: string;
  category: TexasBrandDirectoryCategorySlug;
  note: string;
  href?: string;
}

export const TEXAS_BRAND_DIRECTORY_CATEGORIES = [
  ["grocery-markets", "Grocery & Markets", "Texas grocers and supermarket formats with strong state roots."],
  ["food-drink", "Food & Drink", "Texas-born restaurant, beverage and food names."],
  ["western-outdoors", "Western, Workwear & Outdoors", "Boots, hats, workwear and outdoor retail tied to Texas life."],
  ["travel-retail", "Travel, Retail & Everyday Texas", "Road-trip and retail institutions Texans recognize."],
  ["technology", "Technology & Modern Texas Business", "Texas-rooted technology and modern business names."],
] as const satisfies readonly (readonly [TexasBrandDirectoryCategorySlug, string, string])[];

const CATEGORY_BY_ICON_ID: Readonly<Record<number, TexasBrandDirectoryCategorySlug>> = {
  36: "travel-retail", 37: "food-drink", 38: "grocery-markets", 39: "western-outdoors",
  40: "western-outdoors", 41: "technology", 42: "western-outdoors", 43: "western-outdoors",
  44: "food-drink", 45: "food-drink", 46: "western-outdoors", 47: "travel-retail",
  48: "food-drink", 49: "food-drink", 50: "western-outdoors", 51: "travel-retail",
  52: "food-drink", 53: "food-drink", 54: "food-drink", 55: "food-drink",
};

export const TEXAS_GROCERY_BRAND_EXPANSION: readonly TexasBrandSupplement[] = [
  { slug: "central-market", name: "Central Market", category: "grocery-markets", note: "H-E-B launched the specialty-food format in Austin in 1994.", href: "/article/heb-texas-grocery-history-culture" },
  { slug: "joe-vs-smart-shop", name: "Joe V's Smart Shop", category: "grocery-markets", note: "H-E-B's Houston-born value grocery format dates to 2010.", href: "/article/heb-texas-grocery-history-culture" },
  { slug: "mi-tienda", name: "Mi Tienda", category: "grocery-markets", note: "H-E-B's Houston market format centers Latino foods and shopping traditions.", href: "/article/heb-texas-grocery-history-culture" },
  { slug: "brookshires", name: "Brookshire's", category: "grocery-markets", note: "The family-owned grocer began in Tyler in 1928." },
  { slug: "fresh-by-brookshires", name: "FRESH by Brookshire's", category: "grocery-markets", note: "A specialty format from Tyler-based Brookshire Grocery Company." },
  { slug: "super-1-foods", name: "Super 1 Foods", category: "grocery-markets", note: "A Brookshire Grocery Company banner serving Texas and nearby states." },
  { slug: "spring-market", name: "Spring Market", category: "grocery-markets", note: "Brookshire Grocery Company's smaller-community grocery banner." },
  { slug: "united-supermarkets", name: "United Supermarkets", category: "grocery-markets", note: "A long-running grocery name across West Texas and the Panhandle." },
  { slug: "market-street", name: "Market Street", category: "grocery-markets", note: "The United Family's specialty-oriented supermarket format." },
  { slug: "amigos", name: "Amigos", category: "grocery-markets", note: "A United Family grocery format with a West Texas and Panhandle presence." },
  { slug: "fiesta-mart", name: "Fiesta Mart", category: "grocery-markets", note: "A Texas grocer known for international foods since 1972." },
  { slug: "whole-foods-market", name: "Whole Foods Market", category: "grocery-markets", note: "The natural-foods chain opened its first store in Austin in 1980." },
] as const;

export const TEXAS_BRAND_DIRECTORY_COUNT = 20 + TEXAS_GROCERY_BRAND_EXPANSION.length;

export function texasBrandCategory(entry: TexasIconItem): TexasBrandDirectoryCategorySlug {
  return CATEGORY_BY_ICON_ID[entry.id] ?? "travel-retail";
}

/**
 * Editorial inclusion is independent of commercial relationships. Keep this
 * map empty until a verified affiliate, sponsorship or direct agreement exists.
 */
const COMMERCIAL_PLACEMENTS: Readonly<Record<string, TexasBrandCommercialPlacement>> = {};

export function getTexasBrandCommercialPlacement(key: string): TexasBrandCommercialPlacement | undefined {
  return COMMERCIAL_PLACEMENTS[key];
}
