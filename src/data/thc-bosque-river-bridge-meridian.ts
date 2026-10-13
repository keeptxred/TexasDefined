import { makeThcHeritageDestination, thcFaq, thcSource, commonsFilePage } from "./thc-landmark-heritage-builder";

const register = "https://atlas.thc.texas.gov/Details?atlasnumber=2100011449";
const nomination = "https://thc.texas.gov/sites/default/files/2023-12/NR_%20SBR_Meridian_Bosque_River_Bridge.pdf";
const bridgeSurvey = "https://historicbridges.org/b_h_fipsm.php?bsearch=48035";
const travel = "https://www.txdot.gov/about/programs/environmental-affairs-division/historic-bridges.html";
const commonsImage = "Bosque River Bridge 15 (1 of 1).jpg";

/** State-owned public roadway bridge. Never offer a walking tour on a road
 * without verifying legal pedestrian facilities and current traffic controls.
 * Source basis: THC National Register 100011449 and 2023 SHPO nomination.
 */
export const bosqueRiverBridgeMeridianAuthority = makeThcHeritageDestination({
  slug:"bosque-river-bridge-meridian",
  name:"Bosque River Bridge — Meridian",
  summary:"Meridian's 1940 Bosque River Bridge carries State Highway 22 over the North Bosque River. Built through a Depression-era Works Progress Administration road project, this steel I-beam bridge shows how Texas highway engineers replaced narrower nineteenth-century trusses with durable, longer modern highway crossings. The structure entered the National Register in February 2025.",
  town:"Meridian",county:"Bosque",region:"prairies-lakes",
  coordinates:{lat:31.9197,lng:-97.6619},address:"State Highway 22 at the North Bosque River, west of downtown Meridian, TX",
  imageFile:commonsImage,
  imageAlt:"The 1940 Bosque River Bridge carrying Texas State Highway 22 across the North Bosque River near Meridian",
  imageCredit:"Rene Gomez Photography · CC BY-SA 4.0 · Wikimedia Commons, Bosque River Bridge 15 (1 of 1).jpg",
  imageWidth:1200,imageHeight:876,
  officialUrl:register,operator:"Texas Department of Transportation (state-maintained public highway)",
  season:"Year-round historical interest; only approach from a lawful public viewpoint in safe weather. Flood conditions, storms and road construction can change access.",
  entry:"This is an operating highway bridge, not a ticketed exhibit. There is no independently verified public parking pullout or designated pedestrian-viewing platform at the crossing; never stop on the bridge, shoulder or active travel lane to take pictures.",
  accessibility:"No verified pedestrian sidewalk, wheelchair route or accessible overlook at the bridge. Driving across the highway may be possible when the route is open, but consult TxDOT and current local road conditions. Do not attempt a roadside walking tour without an authorized safe viewing location.",
  highlights:[
    "State-sponsored Works Progress Administration construction completed in 1940",
    "Approximately 556 feet long in its National Register nomination; 566 feet in a later inventory",
    "Steel I-beam and specially engineered reinforced-concrete pier design",
    "Replaced an 1885 Wrought Iron Bridge Company steel truss at an earlier crossing",
    "National Register reference 100011449; listed February 18, 2025",
  ],
  body:[
    "A river crossing explains much of Meridian's commercial geography. The North Bosque River lay between the county seat's commercial center and roads serving rural settlements to the southwest. In 1885 Bosque County commissioned the Wrought Iron Bridge Company of Canton, Ohio to supply a steel truss, connecting what became East Morgan Street to a wagon road leading toward Cranfills Gap. That earlier truss supported local movement before automobile traffic and statewide professional highway standards dramatically increased the demands on such crossings.",
    "Texas established its highway department in 1917. Through the 1920s State Highway 22 connected several communities across Central Texas, while the route now known as State Highway 6 provided a north-south corridor near Meridian. The nineteenth-century bridge was narrow relative to newer highway expectations, and the winding approaches and river terrain posed engineering and safety challenges. By the 1930s the state needed a replacement on an updated alignment for longer and heavier vehicle traffic.",
    "The bridge erected in 1940 was associated with a state-sponsored Works Progress Administration contract, part of a federal employment program that helped construct public infrastructure during the Great Depression. It was designed under Texas Highway Department supervision, with contractor W. E. Worrell Company identified in the National Register nomination. The project demonstrates how government relief financing, highway professionalization and practical local transport needs intersected in a single rural structure.",
    "Engineering distinctions are the principal reason to study this bridge. Its multi-span steel I-beam system is supported by reinforced-concrete piers designed for the river setting. The nomination identifies a roughly 556-foot-long bridge; later bridge inventories give an overall figure around 566 feet. These figures need not be identical if sources measure different ends or approaches, so the guide preserves their attribution rather than pretending there is one universally accepted dimension. Its long beams, cast-in-place deck and period railings illustrate the transition away from older narrow truss designs.",
    "The Texas Historical Commission's 2025 National Register record places the Bosque River Bridge at the North Bosque River near the SH 6 intersection and gives federal reference number 100011449, listed February 18, 2025. The listing recognizes the structure's significance in transportation and engineering under Texas historic-road infrastructure. It is not the nearby historic Whipple-truss bridge in Clifton, a separate 1884 structure that also crosses a branch of the Bosque system. Confusing those two bridges would misidentify the very technology this site preserves.",
    "Because State Highway 22 remains an active traffic route, visitor safety is different from visiting a park or museum. The river crossing has no confirmed public interpretive platform, shoulder parking or pedestrian route. A resident may encounter it as part of a lawful road journey, but heritage enthusiasts should not stop on the bridge to photograph its piers or railings. For the best historical study without creating a roadside hazard, use the THC's National Register nomination photographs, structural description and historic highway records at home, then explore Meridian's courthouse square and separate publicly accessible attractions.",
    "The documentation also raises larger questions: why was an older local truss replaced, how did the WPA shape Texas roadbuilding, and how did engineering choices alter access between town and countryside? Readers can compare the 1885 account with the 1940 construction narrative and later inspection materials. That comparison gives the bridge more meaning than simply identifying its listing date. Continue through the historic bridges and Texas road-history collections to see how crossings shaped rural economies and travel before modern high-speed roads.",
  ],
  faqs:[
    thcFaq("When was Meridian's Bosque River Bridge built?","The current State Highway 22 steel I-beam crossing was built in 1940 through a state-sponsored WPA road project. It replaced an older steel truss installed in 1885.",nomination),
    thcFaq("Where is the bridge located?","It carries SH 22 over the North Bosque River west of Meridian, near the SH 6 intersection. The map point represents the river crossing and is not a parking recommendation.",register),
    thcFaq("Why does the bridge have historic significance?","It represents Depression-era work-relief construction and the Texas Highway Department's development of longer steel I-beam spans and special reinforced-concrete piers.",nomination),
    thcFaq("How long is the Bosque River Bridge?","The National Register nomination describes a roughly 556-foot-long bridge; some later inventory summaries report 566 feet. The difference is attributed to the source, not hidden.",nomination),
    thcFaq("Is it listed in the National Register?","Yes, it was added on February 18, 2025 as National Register property 100011449.",register),
    thcFaq("Can I walk onto the bridge to photograph it?","Do not treat it as a pedestrian attraction. No designated safe walking route or public overlook was independently verified; obey current traffic controls and never park on the bridge or roadway shoulder.",travel),
    thcFaq("Is this the same as the Clifton Whipple truss bridge?","No. The historic Clifton Whipple truss is a different nineteenth-century crossing. The Meridian site is the steel I-beam 1940 replacement of an older local truss.",nomination),
  ],
  sources:[
    thcSource("THC Atlas — Bosque River Bridge NR listing",register,"National Register designation, county, listed date and federal reference 100011449"),
    thcSource("THC and NPS — Bosque River Bridge National Register nomination",nomination,"Primary 1940 construction, WPA funding, bridge technology, 1885 predecessor and historical context"),
    thcSource("HistoricBridges.org — Bosque County bridge inventory",bridgeSurvey,"Independent contemporary bridge classification, alternate length and location"),
    thcSource("TxDOT — historic bridges",travel,"State authority for public road engineering, bridge preservation and safety reference"),
    thcSource("Wikimedia Commons — exact bridge photograph",commonsFilePage(commonsImage),"Exact structure image and CC BY-SA 4.0 photographic rights documentation"),
  ],
  whyVisit:"Interpret the highway bridge through its archival engineering material; do not make an unsupported roadside photo stop part of a public itinerary.",
  firstVisitSteps:[
    "Read the 1885 predecessor and 1940 WPA replacement histories in the THC nomination before approaching the river.",
    "Use historic documentation photos to identify the steel I-beam configuration, piers and original highway alignment without stopping on the active bridge.",
    "Visit a separately safe, publicly accessible Meridian heritage destination such as the courthouse square and extend the engineering story through TxDOT's bridge-history research.",
  ],
});
