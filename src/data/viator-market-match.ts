export interface ViatorMatchMarket {
  slug: string;
  aliases: string;
}

/** Compact destination matcher. Exact aliases prevent substring collisions such as Mission, Texas vs. San Antonio Missions. */
export const VIATOR_MATCH_MARKETS: readonly ViatorMatchMarket[] = [
  { slug: "austin", aliases: "|austin|travis|texas capitol|lady bird lake|barton springs|congress avenue|" },
  { slug: "san-antonio", aliases: "|san antonio|bexar|the alamo|alamo|river walk|san antonio missions|mission san jose|" },
  { slug: "dallas", aliases: "|dallas|dealey plaza|sixth floor museum|reunion tower|bishop arts|" },
  { slug: "fort-worth", aliases: "|fort worth|tarrant|stockyards|fort worth stockyards|billy bobs texas|sundance square|" },
  { slug: "arlington", aliases: "|arlington|at t stadium|globe life field|six flags over texas|" },
  { slug: "houston", aliases: "|houston|harris|space center houston|johnson space center|houston museum district|buffalo bayou|" },
  { slug: "galveston", aliases: "|galveston|the strand historic district|galveston harbor|bishops palace|moody gardens|seawall|" },
  { slug: "fredericksburg", aliases: "|fredericksburg|gillespie|texas wine country|enchanted rock|luckenbach|" },
  { slug: "new-braunfels-gruene", aliases: "|new braunfels|comal|gruene|guadalupe river|natural bridge caverns|" },
  { slug: "san-marcos", aliases: "|san marcos|hays|spring lake|the meadows center|" },
  { slug: "bandera", aliases: "|bandera|cowboy country|medina river|" },
  { slug: "marble-falls-lake-travis", aliases: "|marble falls|burnet|lake travis|highland lakes|" },
  { slug: "waco", aliases: "|waco|mclennan|magnolia market|waco mammoth|dr pepper museum|" },
  { slug: "college-station-bryan", aliases: "|bryan|college station|brazos|texas a m|kyle field|" },
  { slug: "corpus-christi", aliases: "|corpus christi|nueces|texas state aquarium|uss lexington|padre island national seashore|" },
  { slug: "port-aransas", aliases: "|port aransas|mustang island|" },
  { slug: "south-padre-island", aliases: "|south padre island|cameron|laguna madre|port isabel|" },
  { slug: "rio-grande-valley", aliases: "|rio grande valley|hidalgo|mcallen|brownsville|edinburg|mission|" },
  { slug: "el-paso", aliases: "|el paso|franklin mountains|el paso mission trail|" },
  { slug: "big-bend-terlingua", aliases: "|big bend|brewster|terlingua|big bend national park|santa elena canyon|" },
  { slug: "marfa-alpine", aliases: "|marfa|alpine|presidio|jeff davis|davis mountains|fort davis|" },
  { slug: "amarillo-palo-duro", aliases: "|amarillo|potter|randall|palo duro canyon|cadillac ranch|" },
  { slug: "lubbock", aliases: "|lubbock|buddy holly center|texas tech|" },
  { slug: "beaumont-golden-triangle", aliases: "|beaumont|jefferson|orange|golden triangle|spindletop|" },
  { slug: "jefferson-east-texas", aliases: "|jefferson|marion|east texas|caddo lake|" },
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
  const needle = `|${normalized}|`;
  return VIATOR_MATCH_MARKETS.filter((market) => market.aliases.includes(needle));
}
