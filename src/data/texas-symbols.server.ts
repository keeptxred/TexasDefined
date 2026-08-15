import {
  TEXAS_SYMBOLS_SOURCE_NAME,
  TEXAS_SYMBOLS_SOURCE_URL,
  currentTexasSymbols,
  featuredTexasSymbols,
  getTexasSymbol,
  texasSymbols,
  type TexasSymbol,
} from "./texas-symbols";

function relatedGroup(category: string) {
  if (/Bird|Amphibian|Bison|Fish|Mammal|Horse|Insect|Reptile|Turtle/i.test(category)) return "wildlife";
  if (/Flower|Tree|Grass|Plant|Pepper|Shrub|Fruit/i.test(category)) return "plants";
  if (/Dish|Bread|Cobbler|Cooking|Snack|Pie/i.test(category)) return "food";
  if (/Music|Song|Dance|Sport|Footwear|Hat|Vehicle|Fiber/i.test(category)) return "culture";
  return "general";
}

export function loadTexasSymbolsDirectoryDataServer() {
  return {
    currentTexasSymbols,
    featuredTexasSymbols,
    historicalTexasSymbols: texasSymbols.filter((symbol) => symbol.historical),
    sourceName: TEXAS_SYMBOLS_SOURCE_NAME,
    sourceUrl: TEXAS_SYMBOLS_SOURCE_URL,
  };
}

export function loadTexasSymbolProfileDataServer(slug: string) {
  const symbol = getTexasSymbol(slug);
  if (!symbol?.featured) return null;

  const related = featuredTexasSymbols
    .filter((item) => item.slug !== symbol.slug)
    .filter((item) => relatedGroup(item.category) === relatedGroup(symbol.category))
    .slice(0, 4);
  const relatedSymbols: TexasSymbol[] = related.length >= 3
    ? related
    : featuredTexasSymbols.filter((item) => item.slug !== symbol.slug).slice(0, 4);

  return {
    symbol,
    relatedSymbols,
    sourceName: TEXAS_SYMBOLS_SOURCE_NAME,
    sourceUrl: TEXAS_SYMBOLS_SOURCE_URL,
  };
}
