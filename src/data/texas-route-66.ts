export type TexasRoute66Stop = {
  slug: string;
  name: string;
  county: string;
  kind: "town" | "community" | "ghost-town" | "city";
  summary: string;
  routeContext: string;
  highlights: readonly string[];
  planning: readonly string[];
  sourceLinks: readonly { label: string; href: string }[];
  internalLinks?: readonly { label: string; to: string }[];
};

export const TEXAS_ROUTE_66_PRIMARY_SOURCE = {
  label: "Texas Historical Commission — Route 66",
  href: "https://thc.texas.gov/travel/historic-highways/route-66",
} as const;

export const TEXAS_ROUTE_66_STOPS: readonly TexasRoute66Stop[] = [
  {
    slug: "shamrock",
    name: "Shamrock",
    county: "Wheeler County",
    kind: "town",
    summary: "The eastern gateway to Texas Route 66, anchored by one of the highway's best-preserved Art Deco landmarks and a walkable collection of Mother Road history.",
    routeContext: "Westbound travelers enter Texas near Texola, Oklahoma, then reach Shamrock. The Texas Historical Commission identifies Shamrock as a principal Route 66 community and documents the Tower Station and U-Drop Inn Cafe plus the historic Route 66 railroad bridge nearby as National Register resources.",
    highlights: [
      "Tower Station and U-Drop Inn Cafe, restored as a visitor center and community landmark",
      "The historic Route 66 bridge over the Chicago, Rock Island and Gulf Railroad near Shamrock",
      "Downtown Shamrock's surviving highway-era streetscape and neon-era identity",
      "A useful first orientation stop before following the old road west toward Lela and McLean",
    ],
    planning: [
      "Start here if driving the Texas segment east to west; the U-Drop Inn is the most useful first stop for local Route 66 orientation.",
      "Check current visitor-center hours before planning an interior visit.",
      "The historic railroad bridge is a separate roadside resource; do not stop in an unsafe traffic location to photograph it.",
    ],
    sourceLinks: [
      TEXAS_ROUTE_66_PRIMARY_SOURCE,
      { label: "TxDOT — Route 66 Bridge in Wheeler County", href: "https://www.txdot.gov/projects/projects-studies/childress/route-66-wheeler-county.html" },
      { label: "National Park Service — Route 66 in Texas", href: "https://www.nps.gov/articles/000/route-66-texas.htm" },
    ],
  },
  {
    slug: "lela",
    name: "Lela",
    county: "Wheeler County",
    kind: "community",
    summary: "A small highway community west of Shamrock that helps preserve the rural rhythm of Route 66 between the better-known Panhandle towns.",
    routeContext: "The Texas Historical Commission's Route 66 survey places Lela on the historic Texas corridor between Shamrock and McLean. It is less a major attraction stop than a landscape-and-alignment stop: grain-country views, surviving roadside fabric and the sense of how Route 66 linked very small communities across the Panhandle.",
    highlights: [
      "Historic Route 66 alignment through rural Wheeler County",
      "Panhandle agricultural landscape between Shamrock and McLean",
      "A quieter contrast to the restored landmark stops elsewhere on the route",
    ],
    planning: [
      "Treat Lela as a short drive-through history stop rather than a services hub.",
      "Fuel, food and visitor services are more dependable in Shamrock or McLean.",
      "Respect private property when photographing surviving roadside buildings.",
    ],
    sourceLinks: [TEXAS_ROUTE_66_PRIMARY_SOURCE],
  },
  {
    slug: "mclean",
    name: "McLean",
    county: "Gray County",
    kind: "town",
    summary: "A compact Route 66 history stop with a National Register commercial district, the Devil's Rope/Route 66 museum complex and one of the best-known restored service stations on the Texas segment.",
    routeContext: "McLean grew as a highway service town and remains one of the clearest places to read Route 66's commercial history at street level. The National Park Service and Texas Historical Commission both recognize the McLean Commercial Historic District as a significant Route 66 resource.",
    highlights: [
      "Devil's Rope Museum and Texas Route 66 exhibits",
      "Restored Phillips 66 service station and vintage roadside architecture",
      "McLean Commercial Historic District",
      "Historic storefronts, signs and service-station remnants along the old road",
    ],
    planning: [
      "Allow at least an hour if the museum is open; more if you want to walk the historic district.",
      "Museum hours can be seasonal, so verify before making it the day's fixed-time stop.",
      "McLean is a natural food, fuel or rest break before the quieter Alanreed and Jericho-area stretches.",
    ],
    sourceLinks: [
      TEXAS_ROUTE_66_PRIMARY_SOURCE,
      { label: "National Park Service — Route 66 in Texas", href: "https://www.nps.gov/articles/000/route-66-texas.htm" },
    ],
  },
  {
    slug: "alanreed",
    name: "Alanreed",
    county: "Gray County",
    kind: "community",
    summary: "A small but evocative Route 66 community where surviving service-station architecture makes the old highway's roadside economy easy to see.",
    routeContext: "Alanreed is included in the Texas Historical Commission's Route 66 historic-resources survey. Its appeal is the surviving road itself and the scattered buildings that once served motorists before Interstate 40 redirected traffic.",
    highlights: [
      "Historic service-station architecture documented by the Texas Route 66 survey",
      "Old Route 66 alignment through the community",
      "A strong before-and-after view of what interstate bypassing meant for small highway towns",
    ],
    planning: [
      "This is primarily an outdoor roadside-history stop; services are limited.",
      "Stay on public roads and rights-of-way and do not enter abandoned structures.",
      "Some historic alignments west of Alanreed are not practical passenger-car routes; use current road conditions rather than assuming every old segment is drivable.",
    ],
    sourceLinks: [TEXAS_ROUTE_66_PRIMARY_SOURCE],
  },
  {
    slug: "groom",
    name: "Groom",
    county: "Carson County",
    kind: "town",
    summary: "One of the Texas route's most recognizable roadside-oddity stops, pairing the deliberately tilted Britten water tower with the enormous Cross of Our Lord Jesus Christ complex.",
    routeContext: "Groom sits directly on the historic Route 66 corridor east of Amarillo. Its old highway streetscape still carries motel, cafe and service-station remnants, while its two large roadside landmarks make it one of the easiest quick stops to recognize from I-40.",
    highlights: [
      "The Leaning Tower of Texas, installed as an attention-getting roadside landmark",
      "Cross of Our Lord Jesus Christ and its surrounding religious sculpture complex",
      "Historic Route 66 frontage-road alignment and surviving roadside structures",
    ],
    planning: [
      "The leaning water tower is an exterior roadside photo stop; pull fully off the travel lane in a safe legal area.",
      "The cross complex is a religious site as well as a tourist stop; visit respectfully and check current public-access information.",
      "Groom works well as a 30- to 60-minute stop between Alanreed and Conway.",
    ],
    sourceLinks: [
      TEXAS_ROUTE_66_PRIMARY_SOURCE,
      { label: "Texas Highways — Leaning Tower of Texas", href: "https://texashighways.com/travel/roadside-oddity-the-leaning-tower-of-texas-britten/" },
    ],
    internalLinks: [{ label: "Texas roadside oddities guide", to: "/texas-roadside-oddities" }],
  },
  {
    slug: "conway",
    name: "Conway",
    county: "Carson County",
    kind: "community",
    summary: "A small Route 66 community best understood through the historic roadway itself, including a National Register-listed segment running from SH 207 toward Interstate 40.",
    routeContext: "The National Park Service lists the Route 66 segment from SH 207 to Interstate 40 at Conway on the National Register of Historic Places. That makes Conway especially useful for travelers interested in the physical roadbed and alignment, not just diners and neon.",
    highlights: [
      "National Register-listed Route 66 roadway segment near SH 207",
      "Open Panhandle landscape and historic highway geometry",
      "Roadside-art traditions near the Conway/I-40 corridor",
    ],
    planning: [
      "Prioritize the historic roadway and landscape rather than expecting a dense downtown attraction district.",
      "Roadside-art installations and adjacent private property can change; observe posted access rules.",
      "Conway is a short stop before continuing west toward the Amarillo area.",
    ],
    sourceLinks: [
      TEXAS_ROUTE_66_PRIMARY_SOURCE,
      { label: "National Park Service — Texas Route 66 National Register sites", href: "https://www.nps.gov/articles/000/find-route-66-national-register-listings.htm" },
    ],
  },
  {
    slug: "washburn",
    name: "Washburn",
    county: "Armstrong County",
    kind: "community",
    summary: "A quiet Panhandle community included in the state's Route 66 research, useful for understanding the corridor's rural alignments around the eastern approach to Amarillo.",
    routeContext: "The Texas Historical Commission includes Washburn among the communities studied in its Route 66 survey work. Today it is a context stop rather than a conventional attraction center, showing how the highway passed through a network of very small railroad and agricultural communities.",
    highlights: [
      "Rural Route 66 historic context documented in the state survey",
      "Panhandle farm-and-rail landscape east of Amarillo",
      "A low-key alignment stop for travelers following the historic corridor in detail",
    ],
    planning: [
      "Do not depend on Washburn for visitor services.",
      "Use current navigation and road-condition information when leaving the interstate/frontage-road network.",
      "Keep photography to public areas and respect working agricultural property.",
    ],
    sourceLinks: [TEXAS_ROUTE_66_PRIMARY_SOURCE],
  },
  {
    slug: "amarillo",
    name: "Amarillo",
    county: "Potter & Randall counties",
    kind: "city",
    summary: "The major urban anchor of Texas Route 66, with a National Register historic district, classic roadside dining, museums and Cadillac Ranch on the western edge of town.",
    routeContext: "Route 66 was a major commercial corridor through Amarillo. The U.S. Route 66–Sixth Street Historic District preserves a concentrated stretch of highway-era buildings, while Amarillo provides the broadest lodging, dining and museum options on the Texas segment.",
    highlights: [
      "U.S. Route 66–Sixth Street Historic District with shops, restaurants and surviving highway architecture",
      "Cadillac Ranch west of the city",
      "The Big Texan Steak Ranch and its long-running Route 66 roadside identity",
      "Amarillo museums and a practical overnight base for the full Panhandle drive",
      "Palo Duro Canyon State Park as a major south-of-route detour for travelers adding a second day",
    ],
    planning: [
      "Make Amarillo the overnight base if you want time for Sixth Street, Cadillac Ranch and a full meal without rushing the small towns.",
      "Cadillac Ranch is outdoors and exposed; mud, wind, heat and storms can materially change the visit.",
      "Palo Duro Canyon is a substantial detour, not a five-minute roadside stop; give it a half day or more.",
    ],
    sourceLinks: [
      TEXAS_ROUTE_66_PRIMARY_SOURCE,
      { label: "National Park Service — Route 66 in Texas", href: "https://www.nps.gov/articles/000/route-66-texas.htm" },
      { label: "Travel Texas — Route 66 in Texas", href: "https://www.traveltexas.com/cities-and-regions/panhandle-plains/venture-down-route-66-in-texas/" },
    ],
    internalLinks: [
      { label: "Cadillac Ranch destination guide", to: "/destination/cadillac-ranch" },
      { label: "Palo Duro Canyon destination guide", to: "/destination/palo-duro-canyon" },
      { label: "Texas roadside oddities guide", to: "/texas-roadside-oddities" },
    ],
  },
  {
    slug: "bushland",
    name: "Bushland",
    county: "Potter County",
    kind: "community",
    summary: "A rural Route 66 corridor community west of Amarillo that marks the transition from the city's roadside attractions back into open Panhandle farm country.",
    routeContext: "The Texas Historical Commission's Route 66 documentation includes Bushland among the communities and rural resources along the historic highway west of Amarillo. Its value on a road trip is continuity: this is part of the old transportation landscape between Amarillo and Vega.",
    highlights: [
      "Historic Route 66 corridor west of Amarillo",
      "Wide-open agricultural landscape and surviving roadside fabric",
      "A useful geographic waypoint between Cadillac Ranch and Wildorado/Vega",
    ],
    planning: [
      "Treat Bushland as a drive-through waypoint unless you have a specific historic-resource stop from the THC survey.",
      "Use Amarillo or Vega for the strongest concentration of traveler services.",
      "Do not enter private or abandoned roadside structures.",
    ],
    sourceLinks: [TEXAS_ROUTE_66_PRIMARY_SOURCE],
  },
  {
    slug: "wildorado",
    name: "Wildorado",
    county: "Oldham County",
    kind: "community",
    summary: "A small western Panhandle community on the historic corridor, preserving the spacious, agricultural character of Route 66 between Amarillo and Vega.",
    routeContext: "Wildorado appears in the Texas Historical Commission's description of the Route 66 corridor. Like Bushland and Lela, it belongs on a complete route map even though it is not a headline attraction town: the small communities are part of what makes the Texas segment historically legible.",
    highlights: [
      "Historic corridor between Amarillo and Vega",
      "High Plains agricultural scenery",
      "A complete-route waypoint often skipped by abbreviated Route 66 lists",
    ],
    planning: [
      "Plan this as a brief waypoint rather than a fixed-time attraction stop.",
      "Keep fuel and meal planning centered on larger communities.",
      "Use public roads and current navigation when tracing frontage-road segments.",
    ],
    sourceLinks: [TEXAS_ROUTE_66_PRIMARY_SOURCE],
  },
  {
    slug: "vega",
    name: "Vega",
    county: "Oldham County",
    kind: "town",
    summary: "The Oldham County seat and one of western Texas Route 66's strongest historic stops, known for its restored Magnolia Station and surviving highway-era lodging and downtown fabric.",
    routeContext: "The National Park Service credits Route 66 preservation work with helping restore Vega's Magnolia Station, and the historic Vega Motel is listed among Texas Route 66 National Register resources. Vega is the best substantial stop between Amarillo and Adrian.",
    highlights: [
      "Restored Magnolia Station, a compact piece of early highway service history",
      "Vega Motel, a National Register-listed Route 66 resource",
      "Oldham County courthouse square and small-town downtown context",
      "A practical break before the midpoint stop in Adrian",
    ],
    planning: [
      "Allow 30 to 60 minutes for a downtown-and-Magnolia-Station stop, longer if local museums or businesses are open.",
      "Verify interior-access hours; the historic streetscape itself remains worthwhile when buildings are closed.",
      "Vega is a good fuel and food checkpoint before the sparsely populated western end of the Texas route.",
    ],
    sourceLinks: [
      TEXAS_ROUTE_66_PRIMARY_SOURCE,
      { label: "National Park Service — Route 66 in Texas", href: "https://www.nps.gov/articles/000/route-66-texas.htm" },
    ],
  },
  {
    slug: "adrian",
    name: "Adrian",
    county: "Oldham County",
    kind: "town",
    summary: "The celebrated midpoint stop on Route 66, where the Midpoint Cafe and roadside marker turn a tiny Panhandle town into one of the highway's essential photo stops.",
    routeContext: "Adrian is promoted as the halfway point of the traditional Chicago-to-Santa Monica Route 66 journey. Its importance is symbolic as much as architectural: after miles of small Panhandle communities, the midpoint marker gives travelers a clear sense of the continental scale of the Mother Road.",
    highlights: [
      "Midpoint Cafe on Historic Route 66",
      "The midpoint sign and classic halfway photo opportunity",
      "Surviving roadside buildings and signs that reinforce Adrian's highway-town character",
      "A final services-oriented stop before the remote run to Glenrio",
    ],
    planning: [
      "Check Midpoint Cafe's current operating days and hours; do not assume it is open every day.",
      "Take the midpoint photo without blocking the road or business access.",
      "Top off fuel if needed before continuing toward Glenrio and the New Mexico line.",
    ],
    sourceLinks: [
      TEXAS_ROUTE_66_PRIMARY_SOURCE,
      { label: "Texas 2026 Travel Guide", href: "https://texashighways.com/wp-content/uploads/2026/01/Travel-Guide-2026.pdf" },
    ],
  },
  {
    slug: "glenrio",
    name: "Glenrio",
    county: "Deaf Smith County / Quay County, New Mexico",
    kind: "ghost-town",
    summary: "The haunting western bookend of Texas Route 66, a National Register historic district straddling the Texas–New Mexico line with surviving motel, cafe and service-station buildings.",
    routeContext: "Glenrio grew around railroad and highway traffic at the state line, then lost that traffic when Interstate 40 bypassed the community. The National Park Service recognizes the Glenrio Historic District, making it one of the most historically significant end points on the Texas drive.",
    highlights: [
      "Glenrio Historic District on the National Register of Historic Places",
      "Surviving highway-era motel, cafe and service-station buildings",
      "Texas–New Mexico state-line setting",
      "An unusually clear example of a Route 66 service community transformed by interstate bypassing",
    ],
    planning: [
      "Treat abandoned buildings as historic resources, not invitations to enter; many structures and parcels are private or unsafe.",
      "Road surfaces and access can change, especially away from maintained frontage roads. Check current conditions before committing a low-clearance vehicle.",
      "Carry water and fuel conservatively; this is a remote end of the Texas corridor.",
    ],
    sourceLinks: [
      TEXAS_ROUTE_66_PRIMARY_SOURCE,
      { label: "National Park Service — Glenrio Historic District", href: "https://www.nps.gov/places/glenrio-historic-district.htm" },
    ],
  },
] as const;

export function getTexasRoute66Stop(slug: string) {
  return TEXAS_ROUTE_66_STOPS.find((stop) => stop.slug === slug);
}
