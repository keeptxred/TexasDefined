import { TOP_TEXAS_ATTRACTIONS } from "../top-texas-attractions";

/**
 * Explicitly reviewed city-market placement of EXISTING authority guides.
 * Do not infer place geography from supplier keywords or use Viator's prose.
 */
const MARKET_TOP_ATTRACTIONS: Readonly<Record<string, readonly string[]>> = {
  austin:["texas-state-capitol","bullock-texas-state-history-museum","lady-bird-johnson-wildflower-center"],
  "san-antonio":["the-alamo","san-antonio-river-walk","san-antonio-missions-national-historical-park"],
  dallas:["sixth-floor-museum-at-dealey-plaza","dallas-arboretum-and-botanical-garden"],
  "fort-worth":["fort-worth-stockyards"],
  houston:["space-center-houston","houston-museum-of-natural-science","houston-zoo"],
  galveston:["moody-gardens","galveston-island-historic-pleasure-pier"],
  fredericksburg:["fredericksburg-historic-district"],
  "amarillo-palo-duro":["cadillac-ranch","palo-duro-canyon-state-park"],
  "big-bend-terlingua":["big-bend-national-park"],
};
const guideBySlug = new Map(TOP_TEXAS_ATTRACTIONS.map(({slug,name})=>[slug,{name,href:`/destination/${slug}`}] as const));

export function reviewedAttractionGuidesForMarket(market:string) {
  return (MARKET_TOP_ATTRACTIONS[market] ?? []).map((slug)=>guideBySlug.get(slug)).filter((item):item is {name:string;href:string}=>Boolean(item));
}
