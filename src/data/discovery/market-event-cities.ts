/** Only known, single-city market matches may filter a city occurrence calendar. */
export const MARKET_TO_EVENT_CITY: Readonly<Record<string, string>> = {
  austin:"Austin",
  "san-antonio":"San Antonio",
  dallas:"Dallas",
  "fort-worth":"Fort Worth",
  houston:"Houston",
  galveston:"Galveston",
  fredericksburg:"Fredericksburg",
  waco:"Waco",
  "corpus-christi":"Corpus Christi",
  "port-aransas":"Port Aransas",
  "south-padre-island":"South Padre Island",
  "el-paso":"El Paso",
  "amarillo-palo-duro":"Amarillo",
};
export function exploreMarketEventCalendarHref(market: string) {
  const city=MARKET_TO_EVENT_CITY[market];
  return city ? `/events?location=${encodeURIComponent(`city:${city}`)}#calendar` : null;
}
