import { makeThcHeritageDestination, thcFaq, thcSource, commonsFilePage } from "./thc-landmark-heritage-builder";

const record = "https://atlas.thc.texas.gov/Details?atlasnumber=2100011449";
const nomination = "https://atlas.thc.texas.gov/NR/pdfs/100011449/100011449.pdf";
const thc = "https://thc.texas.gov/preserve/designate-historic-properties/national-register-historic-places";
const nps = "https://www.nps.gov/subjects/nationalregister/weekly-list-2025-02-21.htm";
const photo = "Bosque River Bridge 15 (1 of 1).jpg";

/** Individually documented historic *highway* bridge, not a recreational
 * pedestrian destination. Don't direct people to park or stop in traffic.
 * Photos and historical nomination checked 2026-10-13.
 */
export const bosqueRiverBridgeAuthority = makeThcHeritageDestination({
  slug:"bosque-river-bridge-meridian",
  name:"Bosque River Bridge — Meridian",
  summary:"Meridian's 1940 Bosque River Bridge is a steel I-beam highway crossing built through a New Deal Works Progress Administration project. Its 2025 National Register listing recognizes a turning point in Texas highway engineering, rural road improvements and public employment during the Great Depression.",
  town:"Meridian",county:"Bosque",region:"prairies-lakes",
  coordinates:{lat:31.9193,lng:-97.6621},
  address:"East Morgan Street / SH 22 across the North Bosque River, Meridian, TX",
  imageFile:photo,
  imageAlt:"Historic steel I-beam roadway crossing of the North Bosque River near Meridian, Texas",
  imageCredit:"Rene Gomez Photography · CC BY-SA 4.0 · Wikimedia Commons, exact-site image",
  imageWidth:1200,imageHeight:876,
  officialUrl:record,
  operator:"Texas highway authorities / applicable local road authority; current traffic control takes priority over historical designation",
  season:"Year-round historical study is possible using nomination photos and nearby public places. Conditions after rain and roadway traffic can make roadside photography unsafe.",
  entry:"This is a highway bridge carrying road traffic, not a public sightseeing or fishing facility. Never stop, park, stand in a traffic lane, cross barriers, climb piers or enter the riverbank to view it. Verify any lawful safe public observation point and current traffic controls before attempting exterior photography.",
  accessibility:"A 1940 bridge design may incorporate raised sidewalks, but historic dimensions do not establish present pedestrian accessibility or safety. This guide does not recommend walking onto the bridge. Use nomination photos and accessible public heritage exhibits instead unless the road authority confirms a safe viewing route.",
  highlights:[
    "Constructed in 1940 under a WPA work-relief contract",
    "Steel I-beam bridge with a long central span supported on reinforced-concrete piers",
    "Replaced a narrow late-nineteenth-century wrought-iron truss bridge",
    "Texas Highway Department engineering and W. E. Worrell Company contract, with WPA labor",
    "Listed February 18, 2025; THC Atlas files the property under Historic Bridges of Texas, 1866–1945",
  ],
  body:[
    "Meridian's modern Bosque River Bridge stands where transportation had long challenged the town. The North Bosque River cuts through Bosque County's limestone landscape, and early settlers depended on local crossings to reach markets, farms and the county seat. The bridge built in 1940 did not establish the first crossing here: county officials hired the Wrought Iron Bridge Company in 1885 to build a narrow steel truss nearby. The later bridge represents a deliberate change from locally commissioned crossings to a standardized state highway system.",
    "By the 1930s the Texas Highway Department had assumed an increasingly important role in roadway planning and engineering. Rather than leaving every county to negotiate bridge dimensions and traffic capacity, the state developed bridge standards suited to expanding motor traffic. The Meridian replacement formed part of work to realign State Highway 22, removing the bottleneck of an older, narrower crossing. Its importance includes the alignment and the links it created for neighboring roads—not merely the view of the river below.",
    "The replacement was funded and built through a New Deal Works Progress Administration arrangement in 1940. The National Register nomination credits the Texas Highway Department's design, the W. E. Worrell Company of Austin as contractor, and a workforce of 100 men, including 75 WPA workers and 25 contractor employees. The nomination reports that local Bosque County residents filled the WPA jobs. Construction began in May and was completed that December, a tangible example of the era's mix of relief employment and public infrastructure.",
    "Technically, this is a steel I-beam continuous-span bridge rather than a decorative iron truss. The nomination describes a long central structural span over the river supported by specially designed reinforced-concrete piers, supplemented by smaller I-beam spans and approaches. It gives a roughly 560-foot overall crossing, with descriptions varying slightly between the narrative and structural section; engineers and preservation researchers should consult the plan sheets for exact measurements rather than implying a single infallible length.",
    "The National Register listed the bridge on February 18, 2025. THC Atlas indexes it within Historic Bridges of Texas, 1866–1945, while its nomination also discusses the broader Historic Road Infrastructure of Texas, 1866–1965 context. The nomination connects the resource to both transportation history and engineering. Its recognition offers a useful contrast with historic covered or wrought-iron bridges: steel beams, concrete supports and standardized roadway engineering can also document distinctive public works. Period photographs, WPA project index cards and design documentation carry much of the story.",
    "Because the structure remains tied to road traffic, visiting it is different from visiting a museum or scenic overlook. No independently documented public pullout, parking lot, tour path or safe riverbank access is established by the 2025 nomination. Readers should not stop on the bridge or step into traffic to seek an angle matching a historical photograph. Begin with the detailed online nomination and a general walking visit in Meridian where sidewalks and public facilities are appropriate; any bridge observation requires an independently confirmed safe and lawful location.",
    "For deeper context, compare the old late-1880s truss crossing with the 1940 I-beam design, then follow the history of State Highway 22 and central Texas public-works employment. The Bosque County Courthouse and the town of Meridian provide a broader civic setting, but their building-entry rules are separate. This is a story of engineering, accessibility and economic connections—and the ability to explain that without urging travelers to take an unsafe roadside photograph is part of a responsible heritage guide.",
  ],
  faqs:[
    thcFaq("When was the Bosque River Bridge at Meridian built?","Construction started in May 1940 and finished in December 1940 as part of a WPA highway-improvement project.",nomination),
    thcFaq("Is this the original bridge across the North Bosque?","No. The 1940 bridge replaced an earlier, narrow wrought-iron truss crossing built in the late 1880s.",nomination),
    thcFaq("Who designed and built the bridge?","The Texas Highway Department designed the structure, and W. E. Worrell Company contracted to build it with WPA labor.",nomination),
    thcFaq("What type of bridge is it?","It is a multi-span steel I-beam highway bridge supported in part by special reinforced-concrete piers, associated with 1930s–1940s state bridge standards.",nomination),
    thcFaq("When was it listed in the National Register?","It was listed February 18, 2025, under reference 100011449 and the statewide historic-road-infrastructure program.",record),
    thcFaq("Can I park on the bridge for photographs?","No. It is a roadway, not a designated scenic pullout; do not stop in traffic or climb onto structural or river areas. Confirm any safe public viewing location before traveling.",record),
    thcFaq("Does the bridge have an accessible walking route?","Historical engineering descriptions are not current accessibility certifications. No safe, accessible visitor walk on the bridge is confirmed in this guide.",nomination),
  ],
  sources:[
    thcSource("THC National Register Atlas — Bosque River Bridge",record,"Official bridge identity, coordinates, February 18, 2025 listing and property classification"),
    thcSource("National Register nomination — Bosque River Bridge",nomination,"1940 WPA project, highway design, predecessors, engineering and historical photographs"),
    thcSource("National Park Service — February 2025 listing",nps,"Federal date, name, reference number and road-infrastructure program"),
    thcSource("THC statewide designation index",thc,"State-level corroboration of 2025 listed status"),
    thcSource("Wikimedia Commons — Bosque River Bridge photo",commonsFilePage(photo),"Exact river bridge image attributed to Rene Gomez Photography, CC BY-SA 4.0"),
  ],
  whyVisit:"Best understood through primary-source plans and photos first; an active roadway is not a safe or generally accessible walking destination.",
  firstVisitSteps:[
    "Read the nomination's plans, 1940 WPA photographs and explanation of the nineteenth-century predecessor before going near the roadway.",
    "Explore Meridian's public civic-history setting instead of stopping or parking on the active bridge or river shoulder.",
    "If a public crossing or observation point is separately confirmed safe, view the steel spans and concrete piers without entering restricted property or traffic areas.",
  ],
});
