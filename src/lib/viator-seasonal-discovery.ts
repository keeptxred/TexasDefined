import { VIATOR_LIVE_DESTINATION_IDS, normalizeViatorMarketProducts, type ViatorLiveProduct } from "./viator-market-feed";

/** Seasonal tours are not official event occurrences or tickets to holiday festivals. */
export function christmasExperienceSearchBody(market: string) {
  const destination = VIATOR_LIVE_DESTINATION_IDS[market];
  if (!destination) throw new Error("Unreviewed market");
  return {
    searchTerm: "Christmas",
    searchTypes: [{searchType:"PRODUCTS",pagination:{start:1,count:12}}],
    productFiltering:{destination},
    currency:"USD",
  };
}
const CHRISTMAS_EXPERIENCE = /\b(?:christmas|xmas|holiday|holidays|santa|winter lights|holiday lights|festive)\b/i;

export function normalizeChristmasViatorExperiences(payload: unknown): ViatorLiveProduct[] {
  const items = payload && typeof payload === "object"
    ? (payload as {products?:{results?:unknown}}).products?.results
    : undefined;
  const themed = Array.isArray(items) ? items.filter((item) =>
    item && typeof item === "object" &&
    typeof (item as {title?:unknown}).title === "string" &&
    CHRISTMAS_EXPERIENCE.test((item as {title:string}).title)) : items;
  return normalizeViatorMarketProducts({products:themed});
}
