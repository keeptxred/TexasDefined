export interface ViatorMatchMarket {
  slug: string;
  name: string;
  matchText: string;
}

/** Compact destination matcher. Keep this small: it is imported by destination pages. */
export const VIATOR_MATCH_MARKETS: readonly ViatorMatchMarket[] = [
  { slug: "austin", name: "Austin", matchText: "austin travis texas capitol lady bird lake barton springs congress avenue" },
  { slug: "san-antonio", name: "San Antonio", matchText: "san antonio bexar alamo river walk missions mission san jose" },
  { slug: "dallas", name: "Dallas", matchText: "dallas dealey plaza sixth floor reunion tower bishop arts" },
  { slug: "fort-worth", name: "Fort Worth", matchText: "fort worth tarrant stockyards billy bobs sundance square" },
  { slug: "arlington", name: "Arlington", matchText: "arlington at t stadium globe life six flags" },
  { slug: "houston", name: "Houston", matchText: "houston harris space center johnson space center museum district buffalo bayou" },
  { slug: "galveston", name: "Galveston", matchText: "galveston strand harbor bishops palace moody gardens seawall" },
  { slug: "fredericksburg", name: "Fredericksburg & Texas Wine Country", matchText: "fredericksburg gillespie wine country enchanted rock luckenbach" },
  { slug: "new-braunfels-gruene", name: "New Braunfels & Gruene", matchText: "new braunfels comal gruene guadalupe river natural bridge caverns" },
  { slug: "san-marcos", name: "San Marcos", matchText: "san marcos hays spring lake meadows center" },
  { slug: "bandera", name: "Bandera & Cowboy Country", matchText: "bandera cowboy country medina river" },
  { slug: "marble-falls-lake-travis", name: "Marble Falls, Lake Travis & Highland Lakes", matchText: "marble falls burnet lake travis highland lakes" },
  { slug: "waco", name: "Waco", matchText: "waco mclennan magnolia market waco mammoth dr pepper" },
  { slug: "college-station-bryan", name: "Bryan–College Station", matchText: "bryan college station brazos texas a m kyle field" },
  { slug: "corpus-christi", name: "Corpus Christi", matchText: "corpus christi nueces texas state aquarium uss lexington padre island" },
  { slug: "port-aransas", name: "Port Aransas & Mustang Island", matchText: "port aransas mustang island" },
  { slug: "south-padre-island", name: "South Padre Island", matchText: "south padre island cameron laguna madre port isabel" },
  { slug: "rio-grande-valley", name: "Rio Grande Valley", matchText: "rio grande valley hidalgo mcallen brownsville edinburg mission" },
  { slug: "el-paso", name: "El Paso", matchText: "el paso franklin mountains mission trail" },
  { slug: "big-bend-terlingua", name: "Big Bend & Terlingua", matchText: "big bend brewster terlingua santa elena canyon" },
  { slug: "marfa-alpine", name: "Marfa, Alpine & Davis Mountains", matchText: "marfa alpine presidio jeff davis davis mountains fort davis" },
  { slug: "amarillo-palo-duro", name: "Amarillo & Palo Duro Canyon", matchText: "amarillo potter randall palo duro canyon cadillac ranch" },
  { slug: "lubbock", name: "Lubbock", matchText: "lubbock buddy holly texas tech" },
  { slug: "beaumont-golden-triangle", name: "Beaumont & the Golden Triangle", matchText: "beaumont jefferson orange golden triangle spindletop" },
  { slug: "jefferson-east-texas", name: "Jefferson & East Texas", matchText: "jefferson marion east texas caddo lake" },
] as const;

function normalizePlace(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+county$/, "");
}

export function viatorMarketsForPlace(place: string) {
  const normalized = normalizePlace(place);
  if (!normalized) return [];
  return VIATOR_MATCH_MARKETS.filter((market) => market.matchText.includes(normalized));
}
