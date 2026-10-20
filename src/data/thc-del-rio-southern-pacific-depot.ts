import { makeThcHeritageDestination, thcFaq, thcSource, commonsFilePage } from "./thc-landmark-heritage-builder";

const nomination = "https://atlas.thc.texas.gov/NR/pdfs/100012685/100012685.pdf";
const station = "https://www.greatamericanstations.com/stations/del-rio-tx-drt/";
const register = "https://thc.texas.gov/preserve/designate-historic-properties/national-register-historic-places";
const image = "Del Rio Amtrak station DSCN1430.JPG";

/** Individual operational railroad destination, not a generic historic-site template.
 * The station and the actual passenger platform have different entry arrangements.
 * Core historical references: NPS nomination and Amtrak; verified 2026-10-13.
 */
export const delRioSouthernPacificDepotAuthority = makeThcHeritageDestination({
  slug:"southern-pacific-passenger-depot-del-rio",
  name:"Southern Pacific Passenger Depot — Del Rio",
  summary:"Del Rio's 1929 Southern Pacific Passenger Depot is a Spanish Mediterranean Revival landmark that still anchors the city's rail and regional-transportation story. Its February 2, 2026 National Register listing recognizes the depot's railroad-era architecture and its role in southwest Texas commerce, travel and wartime mobility.",
  town:"Del Rio",county:"Val Verde",region:"south-texas",
  coordinates:{lat:29.3625,lng:-100.9004},address:"100 N. Main Street, Del Rio, TX 78840",
  imageFile:image,imageAlt:"Del Rio's historic Southern Pacific station building, photographed beside the tracks in 2014",
  imageCredit:"Billy Hathorn · CC BY-SA 3.0 · Wikimedia Commons · 2014",
  imageWidth:640,imageHeight:480,
  officialUrl:station,operator:"City of Del Rio owns the depot and parking; Union Pacific owns rail property, with Amtrak passenger service",
  season:"Year-round rail and architectural interest. Summer temperatures can be extreme; passengers must check train schedules rather than assuming continuous station staffing.",
  entry:"The historic station and the train platform have different access rules. Amtrak describes this as a platform-only passenger stop with no waiting-room or ticket-office hours. Verify actual operating access, train times and any City of Del Rio transportation-center services before arriving.",
  accessibility:"Amtrak reports an accessible concrete platform, wheelchair lift, improved pathway and accessible parking after a 2023 project, but no accessible restroom, ticket office or waiting room at the passenger stop. Contact Amtrak in advance for required assistance; do not enter tracks or fenced areas.",
  highlights:[
    "Present depot completed in 1929, replacing the 1884 wooden Southern Pacific station",
    "Spanish Mediterranean Revival design, clay-tile roof, buff brick and arched openings",
    "Served as a regional gateway for residents, commerce and World War II troop movements",
    "Amtrak's 2023 improvements added a 650-foot accessible concrete platform and improved paths",
    "Individually listed in the National Register on February 2, 2026",
  ],
  body:[
    "Rail connections fundamentally changed the settlement patterns of the lower Pecos and Rio Grande region. Southern Pacific tracks reached Del Rio in the nineteenth century, linking a previously remote border community to markets and passenger travel across the country. The original 1884 depot served that early phase of growth. The building now associated with the station opened in 1929 to meet the ambitions of a larger county seat, when a welcoming railroad terminal served as a city's most public architectural introduction.",
    "The structure stands out for its Spanish Mediterranean Revival vocabulary. The National Register nomination describes buff brick walls, a low red clay-tile roof, round-arched openings and a broad central block framed by recessed wings. The layout separated functional passenger activities while giving the station a coherent civic face. Look closely at the arched windows and roofline: they help distinguish Del Rio's depot from utilitarian freight warehouses and from a generic roadside bus terminal.",
    "The depot mattered to more than vacationers. It carried the effects of regional cattle, agriculture, employment and border trade into the age of mechanized travel. During World War II rail transportation played a role in troop movements associated with the area now served by Laughlin Air Force Base. Station history therefore connects transportation and military mobility; it should not be presented as a military museum or as a place where visitors can wander through contemporary rail operations.",
    "In the twenty-first century, the city adapted the building as a regional transportation center while passenger trains continued to use the adjacent rail corridor. The City of Del Rio owns the station building and parking, while Union Pacific owns the active platform and rail alignment, according to Amtrak's Great American Stations inventory. Different ownership of the historic building, passenger platform and track explains why an architectural visit does not automatically grant access to all the spaces surrounding the depot.",
    "Accessibility investment is part of its recent history. In autumn 2023 Amtrak completed a roughly $3.8 million station improvement project with a 650-foot concrete platform, improved paths, accessible parking and a wheelchair-lift enclosure. Those improvements do not mean all amenities exist: Amtrak's facility listing still identifies no station restroom, no accessible waiting room, no ticket office and no checked-baggage service. Travelers must distinguish a modernized boarding platform from a full-service staffed station.",
    "A careful comparison between 1929 photographs and the modern station also helps explain architectural continuity and adaptation. The depot building retains its distinctive tall arches and red tile while changes around the passenger track reflect evolving rail services. Neither the National Register nomination nor the 2023 Amtrak project should be mistaken for evidence of unrestricted building tours. This distinction is useful to families, architectural photographers and rail passengers alike: the exterior can communicate the history even when interiors are unavailable, while today's boarding procedures depend on Amtrak and the operating railroad.",
    "The National Register formally listed the Southern Pacific Passenger Depot on February 2, 2026, acknowledging the role of rail transport and the building's surviving architecture. The nomination is an excellent source for historical design and development, but a poor substitute for real-time train schedules, platform safety or current parking policy. For a meaningful visit, study the publicly visible exterior first and connect it to downtown Del Rio's regional transportation history. Any actual train trip should be planned using Amtrak's current instructions, not an older guidebook's printed timetable.",
  ],
  faqs:[
    thcFaq("When was the current Del Rio Southern Pacific depot built?","The surviving Spanish Mediterranean Revival depot was completed in 1929 to replace a wooden predecessor dating to 1884.",nomination),
    thcFaq("Why is the Del Rio depot historic?","It served regional commerce and passenger transportation, including troop movements during World War II, and retains distinctive railroad architecture.",nomination),
    thcFaq("Is the station still used by Amtrak?","Yes, Del Rio is served by Amtrak. Check the current Sunset Limited/Texas Eagle schedules because trains do not operate like frequent urban transit.",station),
    thcFaq("Can I use the station waiting room or buy tickets inside?","Amtrak identifies the passenger stop as platform-only, without a staffed ticket office or published waiting-room hours. Check directly for any separate city-center functions.",station),
    thcFaq("Are accessible boarding and parking available?","Amtrak lists an accessible platform, free accessible parking and a wheelchair lift, while warning that station restrooms, ticket office and waiting room are unavailable.",station),
    thcFaq("Where is the historic depot?","The city transportation center and passenger station are at 100 North Main Street in Del Rio, Val Verde County.",station),
    thcFaq("When was it added to the National Register?","The federal listing date is February 2, 2026, with National Register reference number 100012685.",register),
  ],
  sources:[
    thcSource("National Register nomination — Southern Pacific Passenger Depot",nomination,"1929 building, architectural features, transportation significance and boundaries"),
    thcSource("Amtrak Great American Stations — Del Rio",station,"Present ownership, station features, accessibility, 2023 investment and passenger limitations"),
    thcSource("Texas Historical Commission — 2026 listings",register,"February 2026 listing status"),
    thcSource("Wikimedia Commons — Billy Hathorn depot image",commonsFilePage(image),"Exact 2014 Del Rio passenger depot photograph, CC BY-SA 3.0"),
    thcSource("National Park Service — railroad historic sites search","https://www.nps.gov/subjects/nationalregister/index.htm","Federal historic designation framework and record lookup"),
  ],
  whyVisit:"Best as a short railroad-architecture stop outside active train operations, or as an Amtrak travel stop with confirmed arrangements.",
  firstVisitSteps:[
    "Begin with the depot's public-facing exterior; identify the 1929 buff brick, arches and red clay-tile roof while avoiding active rail property.",
    "Review the National Register nomination to distinguish historic passenger wings from modern platform and transportation-center improvements.",
    "If boarding a train, use Amtrak's live schedule, arrive early as instructed and confirm accessible boarding or other needs before travel.",
  ],
});
