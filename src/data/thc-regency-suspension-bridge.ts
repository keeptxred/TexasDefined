import { makeThcHeritageDestination, thcFaq, thcSource, commonsFilePage } from "./thc-landmark-heritage-builder";

const thc = "https://atlas.thc.texas.gov/Details/2076002052";
const marker = "https://atlas.thc.texas.gov/Details?atlasnumber=5507022492";
const priorMarker = "https://atlas.thc.texas.gov/Details/5507022686";
const nps = "https://atlas.thc.texas.gov/NR/pdfs/76002052/76002052.pdf";
const bridgeProgram = "https://thc.texas.gov/travel/historic-bridges/suspension-bridges";
const bridgePhoto = "Regency Suspension Bridge Deck.jpg";

/** The original federal documentation describes 1976 conditions, not 2026
 * roadworthiness. THC marker accounts disagree about whether the prior bridge
 * was destroyed in the 1936 or 1938 flood: preserve that attribution.
 * CC BY 4.0 image identity and license verified at its Commons file page.
 */
export const regencySuspensionBridgeAuthority = makeThcHeritageDestination({
  slug:"regency-suspension-bridge",
  name:"Regency Suspension Bridge",
  summary:"One of Texas's great rural bridge survivors, the 1939 Regency Suspension Bridge spans the Colorado River between Mills and San Saba counties. Its hand-built steel-cable design, New Deal-era community labor, 1976 National Register listing and 2019 Recorded Texas Historic Landmark designation make it an essential transportation-history landmark—but bridge traffic status and weight limits require a current local check.",
  town:"Goldthwaite",county:"Mills",region:"prairies-lakes",
  coordinates:{lat:31.41054,lng:-98.84623},
  address:"County Road 137 at the Colorado River near Regency, Mills–San Saba county line, TX",
  imageFile:bridgePhoto,
  imageAlt:"Wooden roadway deck and suspension cables of the historic Regency Suspension Bridge over the Colorado River",
  imageCredit:"Larry D. Moore · CC BY 4.0 · Wikimedia Commons · October 2015",
  imageWidth:2419,imageHeight:1361,
  officialUrl:thc,
  operator:"Mills and San Saba county road authorities; confirm present bridge responsibility and posted operating restrictions before travel",
  season:"A clear, dry day is safest for rural-road interpretation. Colorado River flooding, muddy approaches and storm-related bridge inspections can change access unexpectedly.",
  entry:"Do not assume the bridge is open to vehicles or pedestrians. Historical records describe operation and subsequent closures, but no live 2026 traffic determination is established here. Before traveling, check current county road information, posted load limits, bridge barricades and weather; never turn around or park on the span.",
  accessibility:"No reliably verified wheelchair-accessible viewing route or pedestrian-only facility. Approaches are rural roads and bridge geometry is narrow; confirm legal parking, walking access and mobility conditions with road authorities rather than using historic photographs as proof of safe access.",
  highlights:[
    "340-foot suspension span over the Colorado River at Regency",
    "Austin Bridge Company of Dallas completed the current crossing in October 1939",
    "Two steel suspension cables made from bundles of 475 galvanized wires each",
    "Constructed with predominantly manual labor and materials supplied by two counties",
    "National Register-listed in December 1976; Recorded Texas Historic Landmark designated in 2019",
    "Repairs, floods and intermittent closures make current load and traffic status essential",
  ],
  body:[
    "The Regency crossing tells the story of rural Texas households needing reliable routes to market, school and neighboring towns. A first bridge stood here in 1903 to connect Mills and San Saba counties across the Colorado River. It collapsed in May 1924 during a cattle crossing, killing a young boy, his horse and livestock. A successor was later destroyed in a flood, prompting another costly rebuild. The history is a reminder that bridges mattered for everyday agricultural movement long before scenic tourism gave them a second public identity.",
    "There is a documented disagreement about the flood that destroyed the immediate predecessor. A Texas Historical Commission marker written in the 1970s and updated in the 1990s gives 1936, whereas the 1976 federal National Register nomination discusses flood loss in 1938. The bridge that survives today was begun in February 1939 and completed in October of that year, so the disagreement does not affect the current structure's construction date. Rather than invent certainty, readers should consult both records and interpret the conflicting year as an unresolved historical-document issue.",
    "Mills and San Saba counties jointly commissioned the bridge from the Austin Bridge Company of Dallas. The 1976 federal nomination describes a 340-foot main suspension span, steel towers about 30 feet above the deck and anchors buried back into both banks. Each primary cable consists of 475 galvanized wires. The structure used a timber deck supported from the cables, and local hands did much of the work with relatively lightweight equipment. Laborers often worked long hours, while some from outside the district boarded near the former Regency store.",
    "This was an engineering answer to geography and economics, not simply an elaborate monument. The deep Colorado River valley made ordinary fords hazardous when waters rose, yet the sparsely settled region could not easily finance a more imposing permanent masonry or steel bridge. Cable suspension spread loads between anchorages and towers without filling the river channel with numerous piers. THC describes Regency as a late example of rural suspension design. Its construction coincided with a period when large modern highway bridges were beginning to supersede the improvised and locally managed structures of earlier decades.",
    "The Regency Suspension Bridge was entered in the National Register of Historic Places on December 12, 1976, under federal reference 76002052. Subsequent preservation included a Texas Department of Transportation restoration in 1999 according to the state's 2019 Recorded Texas Historic Landmark marker. The bridge has also experienced later vehicle restrictions, including a 2020 closure for reported damage and a reopening in 2021. An archived statement that a bridge was 'open to vehicles' is not a reliable representation of its current condition five years later, and historic listing provides no guarantee of safe public crossing.",
    "A responsible heritage outing begins with reading the THC Atlas and federal nomination, then checking current road-authority instructions and river/weather conditions. If public access is confirmed, use a safe, legal viewpoint for its cables, towers, timber deck and rugged setting. Never park on the structure, stop traffic for photography or enter a barricaded roadway. The bridge's historical value remains high even if traffic is restricted: its story brings together manual craftsmanship, regional markets, repeated flood losses, preservation debates and Texas's broader bridge-engineering history.",
  ],
  faqs:[
    thcFaq("When was the Regency Suspension Bridge built?","The surviving bridge was built between February and October 1939 by the Austin Bridge Company of Dallas for Mills and San Saba counties.",nps),
    thcFaq("How long is the bridge?","The primary suspension span measures approximately 340 feet between towers. Each main steel cable contains 475 galvanized wires according to the National Register nomination.",nps),
    thcFaq("Is Regency Suspension Bridge on the National Register?","Yes. It was listed December 12, 1976, reference 76002052, and later received a Texas Recorded Historic Landmark designation in 2019.",thc),
    thcFaq("Can I drive across Regency Suspension Bridge today?","Do not rely on historic descriptions. Recent load restrictions, closures and weather events can change access. Verify current county instructions and obey every posted barrier or load limit.",marker),
    thcFaq("What happened to the earlier bridges at Regency?","The 1903 bridge collapsed in 1924; a later bridge was destroyed by flooding. Historic sources disagree whether that second loss occurred in 1936 or 1938.",priorMarker),
    thcFaq("Who built the 1939 bridge?","The Austin Bridge Company of Dallas was the principal contractor; the counties supplied materials and much work was completed by hand.",nps),
    thcFaq("Is there wheelchair-accessible parking or a public walking trail?","A verified accessible visitor route has not been established. This is a rural road bridge, not a managed museum campus. Confirm public access and parking with local road authorities.",bridgeProgram),
  ],
  sources:[
    thcSource("THC Atlas — National Register reference 76002052",thc,"Federal listing date and recognized historic engineering significance"),
    thcSource("National Park Service — 1976 Regency Bridge nomination",nps,"1939 construction, engineering dimensions, labor history, earlier flood narrative; NOT current bridge condition"),
    thcSource("THC — 2019 Recorded Texas Historic Landmark marker",marker,"1939 construction, wire/cable engineering, 1999 restoration and distinct Texas designation"),
    thcSource("THC — earlier Regency marker record",priorMarker,"1903 predecessor, 1924 fatal collapse, 1936 flood date and community heritage"),
    thcSource("THC — suspension bridges history",bridgeProgram,"Regional bridge-building technology and comparative significance"),
    thcSource("Wikimedia Commons — Regency Bridge deck photo",commonsFilePage(bridgePhoto),"Larry D. Moore 2015 exact-bridge photo, CC BY 4.0 license and image attribution"),
  ],
  whyVisit:"Plan a history-centered Colorado River view only after checking current county road access and conditions. Never substitute this guide for live bridge-safety instructions.",
  firstVisitSteps:[
    "Read the two THC marker histories and 1976 federal nomination, keeping the conflicting 1936/1938 predecessor-flood dates distinct.",
    "Check current county bridge notices, weather, posted traffic restrictions and whether lawful safe viewing or parking is available.",
    "If access is permitted, view the towers, cable anchorages and suspended deck without blocking a narrow road or entering restricted areas; otherwise use the documented photography.",
  ],
});
