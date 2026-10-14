import { makeThcHeritageDestination, thcFaq, thcSource, commonsFilePage } from "./thc-landmark-heritage-builder";

const official = "https://atlas.thc.texas.gov/Details/5035000920";
const thcBridges = "https://thc.texas.gov/travel/historic-bridges";
const historical = "https://historicbridges.org/bridges/browser/?bridgebrowser=texas%2Fcliftonbridge%2F";
const bosquelocal = "https://bosquechc.org/sites-markers.shtml";
const photo = "Clifton Whipple truss bridge.jpg";

/** The original Whipple truss no longer carries road traffic or pedestrians.
 * Do not infer legal access to the abandoned alignment from its map marker.
 * Sources and file-level rights checked October 13, 2026.
 */
export const cliftonWhippleTrussBridgeAuthority = makeThcHeritageDestination({
  slug:"clifton-whipple-truss-bridge",
  name:"Clifton Whipple Truss Bridge",
  summary:"Built in 1884 over the North Bosque River, the Clifton Whipple Truss Bridge is a rare survivor of Texas's nineteenth-century metal-truss era. Its 1996 Recorded Texas Historic Landmark marker, 1912 and 1918 approach changes, and later highway bypass offer a detailed story of transport engineering and preservation—but the old span is not a public walking bridge.",
  town:"Clifton",county:"Bosque",region:"prairies-lakes",
  coordinates:{lat:31.7928,lng:-97.5727},
  address:"Historic alignment near County Road 3112 and FM 1991, northeast Clifton, TX 76634",
  imageFile:photo,
  imageAlt:"Historic Clifton Whipple metal truss crossing the North Bosque River northeast of Clifton",
  imageCredit:"TexasSpyder · CC BY-SA 4.0 · Wikimedia Commons · photographed 2017",
  imageWidth:2560,imageHeight:1440,
  officialUrl:official,
  operator:"Bosque County-area public road corridor; confirm present right-of-way and permitted viewing areas with local road authorities",
  season:"A cool, dry day is best for a roadside architecture view. Riverbanks can be slippery, overgrown or flooded; never approach during high water.",
  entry:"The historic span is no longer a public road or walkable bridge. A newer crossing bypasses it; the old roadway deck and approaches were removed. View only from legal, safe public locations. Do not cross barriers, climb the truss or enter surrounding private land.",
  accessibility:"There is no verified accessible pedestrian route to or over the preserved truss. The bridge is an industrial structure without a visitor center; confirm a safe, legally accessible public viewpoint and parking with local authorities before planning a mobility-limited trip.",
  highlights:[
    "1884 iron bridge built by the Wrought Iron Bridge Company of Canton, Ohio",
    "148–150-foot historic Whipple double-intersection truss over the North Bosque River",
    "1912 and 1918 Warren pony-truss approach replacements reflect changing loads and road standards",
    "Recorded Texas Historic Landmark marker installed in 1996 (THC marker 920)",
    "Bypassed by a newer road bridge; historic deck removed and no crossing access",
  ],
  body:[
    "The Clifton bridge was part of a nineteenth-century effort to link growing Texas communities across rivers that otherwise interrupted road travel. Clifton developed around the North Bosque River and subsequently expanded with mills, farms, rail commerce and Norwegian American settlement. County officials commissioned the metal Whipple truss from the Wrought Iron Bridge Company of Canton, Ohio, in 1884 for a documented cost of $6,465. The crossing helped connect residents on the different banks and access local commerce, creating a more dependable route than seasonal fords.",
    "A Whipple truss is a double-intersection Pratt form, distinguished by diagonals that extend across more than one rectangular panel of the bridge. Such metal trusses were promoted by eastern manufacturers to Texas counties before the highway department standardized design and maintenance. The Clifton main span is listed at 148 feet in detailed engineering inventories and rounded to 150 feet in the Texas Historical Commission's marker. These are measurements of the primary truss, not the entire bridge: the full multi-span crossing was substantially longer, around 371 feet according to HistoricBridges.org.",
    "The present historic structure is not wholly unchanged since 1884. HistoricBridges.org identifies a 1912 project that replaced the original eastern or northern approach with a riveted Warren pony-truss and widened the older main span, as well as a 1918 project replacing a western or southern approach. On-site details such as riveted connections, portal bracing and changing truss forms reveal the differences between the original Whipple framework and early-twentieth-century improvements. The project illustrates how a bridge's transportation role continued even as automobiles, loads and engineering standards changed.",
    "For decades the bridge provided an important transportation connection, until 1941, according to the THC marker, when traffic was rerouted as the state's highway infrastructure evolved. In 1996 the bridge received a Recorded Texas Historic Landmark designation, confirming local preservation significance. THC's current historic-bridges overview specifically uses Clifton as an example of a rare surviving nineteenth-century metal truss. It is important to distinguish this Texas RTHL designation from the separately listed 1940 Bosque River Bridge on State Highway 22 near Meridian; those are two different crossings and neither should inherit the other's federal listing date.",
    "A major visitor-safety issue is that the historic Clifton bridge was ultimately bypassed. The HistoricBridges.org field record from August 2019 reports that the original deck and roadway approaches had been removed, preserving the metal framework as a non-traversable monument. Older web descriptions or photos that call the crossing an operating road, or show cars and pedestrians using the old deck, may describe an earlier condition. Do not use outdated photos as permission to cross. Today's legal viewpoint, road shoulder and adjacent land access require separate confirmation because conditions can change.",
    "A responsible visit starts with research rather than an assumption of walk-in access. Read the THC marker and compare the original Whipple web with the later Warren pony spans; use the documented Commons photograph to understand the historic structure without climbing on it. If a safe public viewpoint is available, remain well away from unstable riverbanks, traffic and the preserved structure. Then visit other independently open Clifton destinations such as the Bosque Museum, where the area's settlement and Norwegian heritage provide context. The bridge itself is historically important even when direct public access is limited.",
  ],
  faqs:[
    thcFaq("When was the Clifton Whipple Truss Bridge built?","The Wrought Iron Bridge Company of Canton, Ohio, built the crossing in 1884 at a documented cost of $6,465.",official),
    thcFaq("Why is it called a Whipple truss?","It uses a double-intersection Pratt-type metal truss named for Squire Whipple; the main Clifton span is approximately 148 to 150 feet long.",thcBridges),
    thcFaq("Can visitors walk across the Clifton bridge?","No. The historic span was bypassed and its roadway deck and approaches were removed. Do not enter it or bypass barriers; view only from lawful safe public areas.",historical),
    thcFaq("Is the Clifton bridge on the National Register?","It has a Recorded Texas Historic Landmark designation from 1996. Do not confuse it with the different 1940 Bosque River Bridge at Meridian that entered the federal National Register in 2025.",official),
    thcFaq("Why are the approach spans different from the main span?","Engineering documentation records approach replacements in 1912 and 1918 using Warren pony-truss designs, plus widening of the original Whipple main span.",historical),
    thcFaq("Where is the historic Clifton bridge?","Near the former County Road 3112 crossing northeast of Clifton, close to FM 1991; the historic marker is associated with the old alignment. This locator is not a legal access or parking instruction.",official),
    thcFaq("Is it wheelchair-accessible or suitable for a family walking tour?","There is no verified accessible route onto the historic span, and walking across it is not permitted. Confirm safe public viewing conditions, or study the bridge through documented photos and the THC Atlas.",historical),
  ],
  sources:[
    thcSource("Texas Historical Commission — Clifton Whipple Truss Bridge marker",official,"1884 construction, 1996 designation, original cost, dimensions and location"),
    thcSource("Texas Historical Commission — historic metal truss overview",thcBridges,"Statewide engineering history and Clifton's rare surviving truss status"),
    thcSource("HistoricBridges.org — Clifton field report",historical,"Technical dimensions, 1912/1918 modifications and the 2019 de-decked, bypassed condition"),
    thcSource("Bosque County Historical Commission — landmark records",bosquelocal,"Community historical-marker inventory and place chronology"),
    thcSource("Wikimedia Commons — exact bridge photo",commonsFilePage(photo),"TexasSpyder 2017 exact-site image and CC BY-SA 4.0 commercial reuse license"),
  ],
  whyVisit:"This is chiefly a roadside engineering heritage landmark, not an open bridge tour. Plan only a safe, lawful viewpoint or a source-led historical study.",
  physicalEffort:"Low to moderate",
  firstVisitSteps:[
    "Read the THC Atlas and 2019 engineering record before visiting, especially the warning that the historic deck was removed.",
    "If local authorities confirm a safe public viewpoint, study the visible Whipple metal framework without entering the old bridge or riverbanks.",
    "Continue to independently operated Clifton heritage venues for broader settlement, railroad and Norwegian history; check each venue's actual opening hours.",
  ],
});
