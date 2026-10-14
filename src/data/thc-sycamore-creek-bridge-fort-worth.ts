import { makeThcHeritageDestination, thcFaq, thcSource, commonsFilePage } from "./thc-landmark-heritage-builder";

const atlas = "https://atlas.thc.texas.gov/Details?atlasnumber=2100012723";
const nomination = "https://atlas.thc.texas.gov/NR/pdfs/100012723/100012723.pdf";
const weekly = "https://www.nps.gov/subjects/nationalregister/weekly-list-2026-02-20.htm";
const photo = "Sycamore Creek Bridge Fort Worth.jpg";

/**
 * Historic roadway engineering destination in Fort Worth, NOT the similarly
 * named bridges in Hamilton County, Texas or North Carolina.
 * Source checked 2026-10-13. Historic sidewalk and park stair geometry
 * must not be treated as proof of modern accessible pedestrian conditions.
 */
export const sycamoreCreekBridgeFortWorthAuthority = makeThcHeritageDestination({
  slug:"sycamore-creek-bridge-fort-worth",
  name:"Sycamore Creek Bridge — Fort Worth",
  summary:"Fort Worth's 1936 East Rosedale Street crossing over Sycamore Creek preserves an unusually expressive reinforced-concrete, variable-depth girder design by C. Milo Thelin. The National Register recognized this engineering landmark in February 2026 as part of the state's wider historic roadway infrastructure.",
  town:"Fort Worth",county:"Tarrant",region:"prairies-lakes",
  coordinates:{lat:32.731167,lng:-97.297333},
  address:"East Rosedale Street over Sycamore Creek, just west of US 287 / MLK Jr. Freeway, Fort Worth, TX",
  imageFile:photo,
  imageAlt:"1936 variable-depth concrete Sycamore Creek roadway bridge on East Rosedale Street, Fort Worth, Texas",
  imageCredit:"Rene Gomez Photography · CC BY-SA 4.0 · Wikimedia Commons (original file; verify reuse attribution on linked file page)",
  imageWidth:6000,imageHeight:3368,
  officialUrl:atlas,
  operator:"City of Fort Worth; road and park access follow current municipal maintenance and traffic rules",
  season:"Public historical interpretation is possible year-round, but travel-lane traffic, rainstorms and creek flooding make inappropriate stopping particularly hazardous.",
  entry:"This is an active East Rosedale Street roadway bridge, not a ticketed visitor facility or a scenic overlook with assured parking. Never stop on the bridge or shoulders, step into traffic, climb railings, or enter the creek during/after storms. Investigate safe legal public pathways separately and follow city rules.",
  accessibility:"The 1936 structure incorporates historic sidewalks and concrete stairs descending toward Sycamore Park. Stairs and historic bridge dimensions are NOT evidence of ADA-accessible approaches or current safe pedestrian access. Check Fort Worth's current sidewalk/park accessibility information before planning any on-foot or wheelchair outing.",
  highlights:[
    "1936 reinforced-concrete continuous variable-depth T-beam bridge over Sycamore Creek",
    "Attributed to engineer C. Milo Thelin in THC's designation record",
    "Four-span continuous structure, 181 feet in length with a 54-foot-wide roadway",
    "Designed in visual relationship with Sycamore Park and the creek valley",
    "Listed in the National Register on February 19, 2026, reference 100012723",
  ],
  body:[
    "For motorists on East Rosedale Street, the Sycamore Creek Bridge is part of an ordinary urban journey. Yet the structure captures an important period when engineers and city planners regarded a road bridge as both transportation equipment and civic architecture. Built in 1936 as Fort Worth's eastern neighborhoods expanded and motor traffic increased, the crossing brought a modern reinforced-concrete road structure over a creek corridor near Sycamore Park. It illustrates the way infrastructure improvements reshaped local mobility before World War II.",
    "The bridge was engineered using continuous, variable-depth concrete girders rather than an exposed steel truss. The Texas Historical Commission's National Register record identifies C. Milo Thelin as architect or engineer and classifies the bridge as a reinforced-concrete variable-depth girder. The approved nomination describes four connected spans, an overall structural length of 181 feet, a roadway width of 54 feet, and a maximum individual span around 60 feet. These are historic design dimensions, not a current road-capacity assessment or a guarantee of pedestrian clearance.",
    "Variable-depth girder construction allowed the concrete structural members to become deeper near important supports and shallower across other portions of each span. This gave the crossing strength while producing a graceful profile especially suited to the neighboring landscaped park. The nomination describes battered pilasters with decorative capitals beneath the east abutment, different coping conditions at the bridge ends, and concrete stairways leading toward the creek and park. These details add a civic-design story to an engineering resource that might otherwise appear anonymous.",
    "The bridge's location in east Fort Worth matters. East Rosedale Street connected neighborhoods, employment areas and parkland, while Sycamore Creek created a physical barrier requiring a reliable crossing. The relationship of the roadway, creek and public landscape illustrates the 1930s idea that bridge construction could simultaneously support practical travel and neighborhood amenity. It is appropriate to study the relationship through maps and historical photographs, but the present riverbank, stairways and sidewalks should never be assumed safe, open or accessible merely because the nomination describes them.",
    "A useful authority guide should also acknowledge what the surviving structure cannot tell us with certainty. The nomination notes that different coping treatments appear at the ends of the bridge, without enough evidence to determine whether both forms date from 1936. Metal fixtures on the end columns may once have supported lighting, but their original function and date are not established. Instead of presenting these as definitively original lamps or decorative restorations, visitors should read them as open questions in the physical record. The nomination\u2019s dated photographs and engineering descriptions provide firmer evidence for the distinctive variable-depth girders and the bridge\u2019s landscape relationship. Repairs and modern highway requirements may also have altered features after the historical survey.",
    "National Register recognition followed a local preservation process. The Fort Worth Historic and Cultural Landmarks Commission formally supported the bridge's nomination in 2025, and the National Park Service listed the structure on February 19, 2026. The designation falls under the multiple-property context Historic Road Infrastructure of Texas, 1866–1965 and acknowledges transportation and engineering under National Register Criteria A and C. Its eligibility should not be confused with a recorded Texas historic marker or a fully developed public-history attraction.",
    "Practical visiting advice here is deliberately different from recommendations for a museum, courthouse or walkable shopping district. East Rosedale remains a busy roadway. Do not stop on the bridge to read a guide or take photographs, and do not enter fenced or maintenance areas. Park only where parking is explicitly permitted, then seek an authorized public viewpoint if one is available that day. Consult current municipal information about sidewalks, the park and creek conditions; this page does not certify accessible paths, traffic-separated crossings or safe water-level conditions.",
    "Readers who want deeper context can use the National Register nomination's construction photographs and plans to identify the continuous concrete girder profile and four-span arrangement, then compare it with other Texas Depression-era transportation projects. A separate Fort Worth heritage visit can explore nearby public museums, parks and eastside neighborhood history on their own terms. This preserves the bridge as a meaningful engineering story without turning an active road structure into an invented roadside attraction.",
  ],
  faqs:[
    thcFaq("When was Fort Worth's Sycamore Creek Bridge built?","The East Rosedale Street crossing was constructed in 1936.",atlas),
    thcFaq("What kind of bridge is it?","A continuous, reinforced-concrete, variable-depth T-beam or girder roadway bridge, documented in the National Register nomination.",nomination),
    thcFaq("Who designed Sycamore Creek Bridge?","The THC Atlas identifies C. Milo Thelin as architect or engineer.",atlas),
    thcFaq("How long is the bridge?","The National Register nomination records a four-span structure 181 feet long, with a roadway about 54 feet wide.",nomination),
    thcFaq("When did it enter the National Register?","The National Park Service listed the Fort Worth bridge on February 19, 2026, under federal reference 100012723.",weekly),
    thcFaq("Where exactly is the bridge?","It carries East Rosedale Street over Sycamore Creek immediately west of US 287 / the MLK Jr. Freeway in Fort Worth.",atlas),
    thcFaq("Can pedestrians safely cross or photograph it?","Historic sidewalks and steps appear in the design, but that does not establish present protected pedestrian access. Do not stop in the roadway or use unsafe shoulders; check the City of Fort Worth's current pedestrian facilities.",nomination),
    thcFaq("Is this the Sycamore Creek Bridge near Hamilton, Texas?","No. The Fort Worth bridge is the 1936 concrete East Rosedale Street crossing in Tarrant County, not a historic truss elsewhere in Texas or the bridge in North Carolina.",atlas),
  ],
  sources:[
    thcSource("Texas Historical Commission Atlas — Fort Worth Sycamore Creek Bridge",atlas,"Official site, engineering type, architect, 1936 date and 2026 listing"),
    thcSource("National Register nomination — 1936 Fort Worth bridge",nomination,"Design details, civic planning, dimensions, construction and historic district context"),
    thcSource("National Park Service — February 2026 weekly list",weekly,"Federal listing February 19, 2026; reference 100012723"),
    thcSource("City of Fort Worth Historic and Cultural Landmarks Commission — April 14, 2025 approved minutes","https://fortworthgov.granicus.com/boards/board_answers/279122/attachment","Primary municipal meeting minutes from the City\u0027s Granicus board archive; April 14, 2025 Sycamore Creek Bridge nomination support"),
    thcSource("Fort Worth Report — April 2025 landmark commission vote","https://fortworthreport.org/2025/04/29/in-east-fort-worth-an-unsuspecting-bridge-could-earn-a-historic-designation-heres-why/","Independently reported April 14 commission support vote; alternate HTML for readers when Fort Worth city PDF blocks automated access"),
    thcSource("Wikimedia Commons — exact East Rosedale bridge photo",commonsFilePage(photo),"Actual bridge photo, CC BY-SA 4.0 reuse and author attribution"),
    thcSource("NPS — National Register preservation program","https://www.nps.gov/subjects/nationalregister/index.htm","Meaning of federal listing versus public entry rights"),
  ],
  whyVisit:"A significant Fort Worth engineering and public-works story best researched using official nomination photos and safe, lawful public viewpoints instead of hazardous stopping on East Rosedale Street.",
  firstVisitSteps:[
    "Start with the NPS/THC nomination to understand the bridge's four-span girder design, 1936 setting and decorative features.",
    "If nearby, find a legal public location separated from traffic. Do not park or stand on the active bridge, cross barriers or enter the creek.",
    "Continue with Fort Worth neighborhood or public-park history only where city information confirms appropriate access and current conditions.",
  ],
});
