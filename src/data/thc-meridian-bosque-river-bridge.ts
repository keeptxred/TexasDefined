import { makeThcHeritageDestination, thcFaq, thcSource, commonsFilePage } from "./thc-landmark-heritage-builder";

const thc = "https://atlas.thc.texas.gov/Details?atlasnumber=2100011449";
const history = "https://thc.texas.gov/sites/default/files/2023-12/NR_%20SBR_Meridian_Bosque_River_Bridge.pdf";
const listings = "https://thc.texas.gov/preserve/designate-historic-properties/national-register-historic-places";
const photo = "Bosque River Bridge 15 (1 of 1).jpg";

/**
 * This is the 1940 State Highway 22 / East Morgan Street bridge over the North
 * Bosque River in Meridian, NOT the separate highway bridge near Clifton.
 * Exact site attribution: Commons media in Category:Meridian, Texas.
 * File-level creator/license need to be read from its Commons page before
 * any downstream rehosting or alteration; external file is attributed to Commons.
 */
export const meridianBosqueRiverBridgeAuthority = makeThcHeritageDestination({
  slug:"bosque-river-bridge-meridian",
  name:"Bosque River Bridge — Meridian",
  summary:"Meridian's 1940 Bosque River Bridge carries State Highway 22 across the North Bosque River. The 566-foot continuous steel I-beam span represents Texas Highway Department construction before World War II, and its February 2025 National Register listing recognizes the bridge's statewide transportation and engineering significance.",
  town:"Meridian",county:"Bosque",region:"prairies-lakes",
  coordinates:{lat:31.919634,lng:-97.661900},
  address:"State Highway 22 (East Morgan Street), about 0.3 mile northeast of SH 6, Meridian, TX",
  imageFile:photo,
  imageAlt:"Bosque River Bridge carrying SH 22 across the North Bosque River in Meridian",
  imageCredit:"Wikimedia Commons, Bosque River Bridge 15 (1 of 1).jpg; see linked file record for creator and applicable license",
  imageWidth:1200,imageHeight:876,
  officialUrl:thc,operator:"Texas Department of Transportation — active state highway structure",
  season:"A roadside-history stop is dependent on the weather, daylight and a legal safe parking location. The highway remains active year-round.",
  entry:"This bridge is a live state-highway crossing, not a pedestrian attraction or staffed historic site. Do not park on the bridge or shoulders, stop traffic, climb below the deck or stand near the travel lanes. Observe only from a lawful public place after checking conditions; crossing on foot may be unsafe.",
  accessibility:"The 1940 design included narrow cantilevered sidewalks, but their existence is not evidence that a safe, protected or currently ADA-accessible pedestrian route exists. Do not recommend wheelchair access across the highway bridge without current TxDOT confirmation.",
  highlights:[
    "1940 steel I-beam continuous-span design by the Texas State Highway Department",
    "566-foot overall structural length, including a 265-foot four-span continuous main unit",
    "W. E. Worrell Company constructed the prewar bridge",
    "Retains historic steel railings with concrete posts, visible along the deck",
    "National Register listing recorded February 18, 2025",
  ],
  body:[
    "The Bosque River Bridge is one of those landmarks whose significance can be obscured by the ordinary act of driving across it. State Highway 22 spans the North Bosque River southwest of Meridian's historic commercial center, linking local and regional road travel across a channel that once made reliable connections difficult in heavy weather. The structure represents a specific moment in Texas's highway-building program, when modern steel bridge engineering was replacing older local crossings and consolidating a dependable road network.",
    "The Texas State Highway Department designed the existing bridge in 1940, with the W. E. Worrell Company serving as contractor. Its structure is a continuous steel I-beam crossing supported by concrete substructure. The official National Register nomination records an overall length of 566 feet, a 265-foot four-span continuous unit above the main channel, and shorter simple steel I-beam approach spans. These dimensions describe an engineered assembly, not a single 566-foot unsupported beam. Steel picket railings and concrete posts supply much of the visible ornamental character.",
    "The bridge's significance lies in both the construction technology and transportation story. Continuous spans distribute loads differently from separate simple-span units, permitting efficient material use and stable passage across a floodplain. The 1940 project required substantial quantities of reinforcing and structural steel, reflecting both the scale of highway investment and the industrial capacity available immediately before the United States entered World War II. The application identified transportation and architecture/engineering as the areas of significance.",
    "The nomination's historic context shows a crossing less than a mile west of the Bosque County Courthouse, with commercial development near the southwest approach and parkland near the northeast approach. Its association with East Morgan Street and Highway 22 is useful for travelers researching maps, but that does not establish a present-day visitor parking area. The highway is a functioning transportation corridor. Traffic volumes, shoulder conditions, guardrails, roadwork and river conditions can differ from the nomination's photographs.",
    "The National Park Service listed the Bosque River Bridge on February 18, 2025, according to the Texas Historical Commission's Historic Sites Atlas. It belongs to a wider Texas National Register grouping of historic bridges and transportation infrastructure. The bridge should not be confused with the older State Highway 22 Bridge at the North Bosque River near Clifton, which is a distinct resource in Commons media and historic-bridge catalogs. A correct authority page needs the Meridian location, 1940 date and 2025 designation, not a generic photo of another Bosque County span.",
    "Visitors can learn more from the THC Atlas record and the complete nomination than from trying to stage an unsafe roadside photo. Use the historical drawings and dated exterior photography to identify its railings and structural form, then explore downtown Meridian, local museums and the Bosque County Courthouse where public access is established. If photographing from the vicinity, use only permitted public space with adequate separation from traffic. Never enter the riverbed or maintenance areas merely to reproduce a nomination photo.",
  ],
  faqs:[
    thcFaq("When was Meridian's Bosque River Bridge built?","The Texas State Highway Department bridge was built in 1940.",history),
    thcFaq("What road crosses this bridge?","State Highway 22, also associated with East Morgan Street, crosses the North Bosque River in Meridian. It is about 0.3 mile northeast of the SH 6 junction.",thc),
    thcFaq("How long is the bridge?","The National Register nomination documents a 566-foot total structure, including a 265-foot continuous main-channel span and shorter approach units.",history),
    thcFaq("Why is the bridge historic?","It is an intact example of 1940 continuous steel I-beam highway engineering, significant for transportation and design before World War II.",history),
    thcFaq("Is it on the National Register?","Yes. The THC Atlas gives February 18, 2025 as the listing date and reference number 100011449.",thc),
    thcFaq("Is it safe to walk across the bridge to take pictures?","Not necessarily. It is an active highway structure; narrow historic sidewalks do not prove protected pedestrian or ADA access. Do not stop or walk in unsafe traffic areas; consult TxDOT for current conditions.",thc),
    thcFaq("Is this the same as the historic SH 22 bridge near Clifton?","No. This is the 1940 crossing at Meridian. Other North Bosque River bridges appear in historic-resource collections; confirm municipality, highway and construction date.",thc),
  ],
  sources:[
    thcSource("THC Atlas — Bosque River Bridge listing",thc,"Official listed date, federal reference number, Meridian location and resource type"),
    thcSource("NPS/THC National Register nomination — Bosque River Bridge",history,"Engineering measurements, architect/contractor, 1940 work and distinct landmark identification"),
    thcSource("THC — National Register 2025 listings",listings,"Official designation status"),
    thcSource("Wikimedia Commons — Bosque River Bridge photo",commonsFilePage(photo),"Exact-subject Commons photo and link for creator/license validation; do not infer permissions for other images"),
    thcSource("THC — Historic bridges of Texas", "https://atlas.thc.texas.gov/AdvancedSearch/MPS?mpsid=42","Related bridge-design history and statewide comparison"),
  ],
  whyVisit:"Best studied from the official nomination and lawful public viewpoints; this is not a standalone walking attraction, and safety around an active highway is paramount.",
  firstVisitSteps:[
    "Research the bridge's 1940 engineering and exact Meridian location in the THC nomination before traveling.",
    "If in the vicinity, view only from a safe and lawful public location; never stop on the crossing or climb onto the structure.",
    "Combine the research with Bosque County courthouse and Meridian history using independent, public visitor sites.",
  ],
});
