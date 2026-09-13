import { TEXAS_ROUTE_66_PRIMARY_SOURCE, type TexasRoute66Stop } from "@/data/texas-route-66";

type Route66StopOverride = Pick<TexasRoute66Stop, "summary" | "routeContext" | "highlights" | "planning" | "sourceLinks">;

const ROUTE_66_CONTEXT_STOP_ENRICHMENT: Record<string, Route66StopOverride> = {
  lela: {
    summary: "Lela is a small Wheeler County Route 66 community west of Shamrock where the old highway crosses a place that began as a railroad station called Story in 1902 and was soon renamed for Lela Smith.",
    routeContext: "The Texas Historical Commission places Lela on the historic Route 66 corridor between Shamrock and McLean, while the Handbook of Texas traces the community to the Chicago, Rock Island and Gulf Railway. Story had a post office, school and weekly newspaper by 1903; the town was renamed Lela soon afterward, then lost much of its trade-center role to nearby Shamrock by 1906. That compressed rise and decline makes Lela useful for understanding the transportation layers underneath Route 66: railroad settlement first, then the automobile highway, then Interstate 40. The stop is modest, but it gives the better-known landmarks on either side a more complete historical setting.",
    highlights: [
      "The historic Route 66 alignment through a community established in 1902 as the railroad station of Story",
      "The place-name change from Story to Lela, honoring Lela Smith, documented by the Handbook of Texas",
      "The agricultural and railroad landscape between Shamrock and McLean that predates the Mother Road tourism era",
      "A clear example of a small Panhandle trade point whose commercial importance shifted toward a larger neighboring town",
    ],
    planning: [
      "Treat Lela as a short interpretive drive-through stop rather than a conventional attraction district; the value is the community context and historic corridor itself.",
      "Use Shamrock or McLean for dependable fuel, food, restrooms and fixed-time visitor stops.",
      "Historic buildings and agricultural property may be privately owned, so photograph only from legal public areas and never enter abandoned-looking structures.",
      "Pair Lela with Shamrock and McLean in one sequence so the difference between a small corridor community and larger Route 66 service towns is easy to read on the ground.",
    ],
    sourceLinks: [
      TEXAS_ROUTE_66_PRIMARY_SOURCE,
      { label: "Handbook of Texas — Lela, TX", href: "https://www.tshaonline.org/handbook/entries/lela-tx" },
    ],
  },
  alanreed: {
    summary: "Alanreed is a small Gray County Route 66 community with a much older transportation story: stage-route settlement, a railroad townsite laid out in 1900 and a highway-era landscape later bypassed by Interstate 40.",
    routeContext: "The Texas Historical Commission includes Alanreed in its Route 66 historic-resources work, and the Handbook of Texas shows why the stop has more depth than an abandoned-roadside photo. Farmers settled the McClellan Creek area in the early 1880s along the Mobeetie-to-Clarendon stage line. The present townsite was laid out in 1900 for the Choctaw, Oklahoma and Texas Railroad, and after the Rock Island line arrived in 1903 Alanreed became a cattle-shipping point and, for a time, one of Gray County's larger communities. Route 66 later layered automobile travel onto that rail-and-ranch economy. The remaining service-station and roadway fabric therefore represents the last major transportation chapter in a place shaped repeatedly by through-travel.",
    highlights: [
      "Old Route 66 alignment and surviving roadside-service architecture documented in the Texas corridor survey",
      "A community whose transportation history reaches back to the nineteenth-century stage route between Mobeetie and Clarendon",
      "The 1900 railroad townsite and early-1900s cattle-shipping economy that preceded Route 66",
      "A useful place to see how interstate bypassing changed a once-busier Panhandle transportation stop",
    ],
    planning: [
      "Plan Alanreed primarily as an outdoor history and streetscape stop; do not assume museums, restaurants or other visitor businesses will be open.",
      "Stay on public roads and rights-of-way, and do not enter abandoned or deteriorated buildings even when they appear accessible.",
      "Use current navigation and road conditions before tracing older alignments west of town because not every historic segment is appropriate for a normal passenger car.",
      "Combine Alanreed with McLean to compare a preserved Route 66 commercial center with a much smaller community where the corridor's decline is more visible.",
    ],
    sourceLinks: [
      TEXAS_ROUTE_66_PRIMARY_SOURCE,
      { label: "Handbook of Texas — Alanreed, TX", href: "https://www.tshaonline.org/handbook/entries/alanreed-tx" },
    ],
  },
  washburn: {
    summary: "Washburn is a quiet Armstrong County transportation-history stop east of Amarillo whose 1887 railroad-boom origins help explain the network of rail, ranch and farm communities surrounding the Texas Route 66 corridor.",
    routeContext: "The Texas Historical Commission includes Washburn in its broader Route 66 research context, while the Handbook of Texas traces the community to the Fort Worth and Denver City Railway. Washburn was promoted as a townsite in 1887 at the railroad terminus on former JA Ranch land; railway wells, a pump station, coal chute, depot, section house and stock pens quickly supported a temporary boom. The railroad extended onward the next year, but Washburn remained part of the agricultural and transportation landscape on Amarillo's eastern side. For a Route 66 traveler, the point is not a dense Mother Road attraction cluster. It is a chance to read the older infrastructure and settlement pattern that the automobile highway later crossed and connected.",
    highlights: [
      "A townsite created in 1887 at the Fort Worth and Denver City Railway terminus on former JA Ranch holdings",
      "Railroad infrastructure and stock-shipping history that predate the automobile corridor across the Panhandle",
      "Open farm-and-rail scenery on the eastern approach to Amarillo that adds context to the Route 66 landscape",
      "A low-key stop that shows why complete corridor history includes small transportation communities as well as neon landmarks",
    ],
    planning: [
      "Do not depend on Washburn for visitor services; plan fuel, food and rest stops in larger communities before leaving the main travel corridor.",
      "Use current navigation and road-condition information when following local roads because historic transportation context does not mean every old alignment is a signed tourist route.",
      "Keep photography to public areas and respect working agricultural property, railroad infrastructure and private buildings.",
      "Treat Washburn as a brief historical-context detour or waypoint rather than a fixed-time attraction, especially when building a one-day Route 66 itinerary.",
    ],
    sourceLinks: [
      TEXAS_ROUTE_66_PRIMARY_SOURCE,
      { label: "Handbook of Texas — Washburn, TX", href: "https://www.tshaonline.org/handbook/entries/washburn-tx" },
    ],
  },
  bushland: {
    summary: "Bushland is a Potter County community fourteen miles west of Amarillo where Route 66 travelers move from the city's landmark-heavy western edge into the railroad-and-farm landscape that shaped the High Plains corridor.",
    routeContext: "The Texas Historical Commission documents Bushland as part of the historic Route 66 corridor west of Amarillo, and the Handbook of Texas records the community's earlier railroad foundation. Bushland was established as a Chicago, Rock Island and Gulf Railway station after William Henry Bush provided land for a townsite and right-of-way; the townsite was dedicated in 1908 and a post office followed in 1909. That origin matters on a Route 66 drive because the highway did not create the Panhandle's settlement pattern from scratch. It connected communities already organized around rail transport, ranching and agriculture. Bushland is therefore best read as a continuity stop between Amarillo's concentrated attractions and the smaller High Plains communities leading toward Vega.",
    highlights: [
      "The historic Route 66 corridor immediately west of Amarillo and beyond the Cadillac Ranch area",
      "A community founded in 1908 as a Chicago, Rock Island and Gulf Railway station and named for William Henry Bush",
      "High Plains farm, ranch and grain-elevator scenery that illustrates the economic landscape surrounding the highway",
      "A useful transition point between Amarillo's urban Route 66 experience and the smaller communities of the western Panhandle",
    ],
    planning: [
      "Treat Bushland as a corridor-history waypoint rather than a guaranteed attraction stop unless you have identified a specific public resource before departure.",
      "Use Amarillo or Vega for the strongest concentration of traveler services, especially if you are driving late in the day.",
      "Do not enter private, agricultural or abandoned-looking roadside property while tracing historic structures or alignments.",
      "Pair Bushland with Wildorado and Vega to make the westbound transition from metropolitan Amarillo to the open High Plains leg of Route 66 more legible.",
    ],
    sourceLinks: [
      TEXAS_ROUTE_66_PRIMARY_SOURCE,
      { label: "Handbook of Texas — Bushland, TX", href: "https://www.tshaonline.org/handbook/entries/bushland-tx" },
    ],
  },
  wildorado: {
    summary: "Wildorado is a small Oldham County Route 66 community west of Amarillo whose history links an older cattle trail, the Rock Island railroad, the Ozark Trail, U.S. 66 and today's Interstate 40 in one High Plains corridor.",
    routeContext: "The Texas Historical Commission includes Wildorado on the Route 66 corridor, and the Handbook of Texas gives the community unusually useful transportation continuity. The site lay on the old cattle trail between Tascosa and Canyon City, became a community when the railroad survey marked it as a shipping point in 1900, and grew after the Chicago, Rock Island and Gulf line reached the townsite in 1908. The Handbook specifically notes the gradual evolution of the Ozark Trail into Route 66 and then Interstate 40 as a force in local growth. That makes Wildorado more than an empty space between Amarillo and Vega: it is a compact example of successive transportation systems reusing the same High Plains corridor.",
    highlights: [
      "The historic U.S. 66 corridor through a community that also sat on an earlier cattle trail",
      "Rock Island railroad and shipping-point origins that date to the opening years of the twentieth century",
      "The documented progression from the Ozark Trail to Route 66 and Interstate 40 through the same travel corridor",
      "Wide High Plains agricultural scenery that makes the spacing and isolation of western Texas Route 66 easy to understand",
    ],
    planning: [
      "Plan Wildorado as a brief interpretive waypoint rather than a fixed-time attraction; the transportation landscape is the main reason to include it.",
      "Keep fuel, meals and longer breaks centered on Amarillo or Vega because small-community services can be limited or change over time.",
      "Use public roads and current navigation when following frontage-road or historic-route segments, and avoid private farm or railroad property.",
      "Drive Wildorado together with Bushland and Vega so the westbound sequence shows how railroad, agricultural and highway communities are spaced across the High Plains.",
    ],
    sourceLinks: [
      TEXAS_ROUTE_66_PRIMARY_SOURCE,
      { label: "Handbook of Texas — Wildorado, TX", href: "https://www.tshaonline.org/handbook/entries/wildorado-tx" },
    ],
  },
};

export const ROUTE_66_CONTEXT_STOP_SLUGS = Object.freeze(Object.keys(ROUTE_66_CONTEXT_STOP_ENRICHMENT));

export function enrichTexasRoute66Stop(stop: TexasRoute66Stop): TexasRoute66Stop {
  const enrichment = ROUTE_66_CONTEXT_STOP_ENRICHMENT[stop.slug];
  return enrichment ? { ...stop, ...enrichment } : stop;
}

export function enrichTexasRoute66Stops(stops: readonly TexasRoute66Stop[]): TexasRoute66Stop[] {
  return stops.map(enrichTexasRoute66Stop);
}
