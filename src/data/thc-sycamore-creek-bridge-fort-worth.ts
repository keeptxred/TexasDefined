import { makeThcHeritageDestination, thcFaq, thcSource, commonsFilePage } from "./thc-landmark-heritage-builder";

const atlas="https://atlas.thc.texas.gov/Details?atlasnumber=2100012723";
const nomination="https://atlas.thc.texas.gov/NR/pdfs/100012723/100012723.pdf";
const federal="https://www.nps.gov/subjects/nationalregister/weekly-list-2026-02-20.htm";
const park="https://www.fortworthtexas.gov/departments/parks/parks-and-trails/sycamore-park";
const bridgePhoto="Sycamore Creek Bridge Fort Worth.jpg";

/**
 * The East Rosedale Street bridge is a 1936 haunched concrete girder;
 * it is NOT the 1906 Union Pacific truss, 1912 Sycamore Park footbridge,
 * or Hamilton County's Sycamore Creek bridge.
 */
export const sycamoreCreekBridgeFortWorthAuthority = makeThcHeritageDestination({
  slug:"sycamore-creek-bridge-fort-worth",
  name:"Sycamore Creek Bridge — Fort Worth",
  summary:"Built in 1936, Fort Worth's East Rosedale Street bridge over Sycamore Creek is a rare variable-depth reinforced-concrete girder crossing. Its decorative arch-window railings, public-works origins and role connecting the city's Polytechnic Heights neighborhood led to National Register listing in February 2026.",
  town:"Fort Worth",county:"Tarrant",region:"prairies-lakes",
  coordinates:{lat:32.731167,lng:-97.297333},
  address:"East Rosedale Street over Sycamore Creek, just east of US 287, Fort Worth, TX",
  imageFile:bridgePhoto,
  imageAlt:"The 1936 reinforced-concrete East Rosedale Street bridge across Sycamore Creek in Fort Worth, with arched panel parapet",
  imageCredit:"Rene Gomez Photography · CC BY-SA 4.0 · Wikimedia Commons (exact bridge photograph)",
  imageWidth:6000,imageHeight:3368,
  officialUrl:atlas,operator:"Fort Worth transportation/public works authorities; Sycamore Park managed by the City of Fort Worth",
  season:"Public architecture and engineering can be studied in daylight throughout the year; summer heat, flash flooding and roadway traffic call for extra caution.",
  entry:"This remains an active East Rosedale Street traffic bridge, not a separate paid attraction. The 1936 nomination describes sidewalks on both sides and stairs toward the park, but present pedestrian access, barriers, repairs and road closures must be checked on site with the City of Fort Worth. Do not stop or park in the bridge's travel lanes or assume that creek banks are safe after rain.",
  accessibility:"The historic record identifies sidewalks and stairs, not a verified current step-free route. A stairway to the creek does not establish wheelchair access; ask city parks and transportation staff about current ramps, crossings and accessible park entrances. View the bridge from authorized public ground only.",
  highlights:[
    "Completed in 1936 during Fort Worth's larger Rosedale corridor improvement",
    "181-foot, four-span, 54-foot-wide concrete girder crossing",
    "Variable-depth haunched reinforced-concrete beams are deeper near their supports",
    "Precast railings with repeating round-arch openings and classical-style posts",
    "Listed on the National Register February 19, 2026, reference 100012723",
  ],
  body:[
    "Sycamore Creek is more than a channel crossed by traffic: it shaped the way East Fort Worth neighborhoods developed. In the 1930s, local officials sought a better east-west route through the city's growing Polytechnic Heights commercial and residential area. The Rosedale corridor and its adjacent Sycamore Park formed part of a wider project to make travel between existing streets, public recreation and surrounding neighborhoods more convenient. The present bridge should be interpreted as part of that transportation and landscape plan, not as an isolated concrete span.",
    "The structure completed in 1936 illustrates a particular stage in American road engineering. Rather than using an older steel truss or uniform-depth concrete beam, designers chose four spans of reinforced concrete with variable-depth haunched girders. The girders are deeper near the piers where structural forces are greatest and taper toward the middle of each span. This creates a gently arched silhouette beneath the road while supporting four lanes of traffic over a concrete deck. The THC nomination identifies C. Milo Thelin as the architect/engineer associated with its design.",
    "The nomination measures the bridge at 181 feet long and 54 feet wide. These figures describe a relatively modest urban crossing compared with the large river bridges built elsewhere during the same period. Its distinctive appearance comes from details that engineers could have omitted: precast-concrete railing panels use repeated round-arch openings, separated by posts with bases, vertical shafts and caps recalling classical architectural design. The bridge's visual relationship to the adjoining park was part of its civic character.",
    "The Sycamore Creek crossing also documents the economic and political choices behind a Depression-era local improvement program. East Rosedale Street's redevelopment took years of planning, and contemporary August 1936 newspaper coverage records public ceremonies marking the completion of the broader corridor project. Officials described a long effort to make an effective route from South Main toward Handley, not simply the construction of one bridge. Reading the press alongside the official nomination shows that transportation improvements were promoted as a way to strengthen nearby commercial markets.",
    "Sycamore Park remains an essential setting for the structure. The nomination describes concrete staircases descending from both sides of the bridge toward the park and creek, but those are descriptions of historical fabric, not a real-time accessibility audit. Paths, ramps, barriers and creek water levels can change. A second, newer bridge immediately east of the historic structure is outside the National Register nomination. Any map, article or photograph must identify the original 1936 crossing rather than silently using the appearance of its neighbor.",
    "The National Park Service listed Sycamore Creek Bridge on February 19, 2026 under reference 100012723 and the statewide Historic Road Infrastructure of Texas multiple-property framework. The THC Atlas classifies its significance under transportation and engineering, with the 1936 construction date as the key historical period. Federal listing is an acknowledgment of the original bridge's significance; it does not create a museum, dictate current city maintenance schedules or guarantee that its historic sidewalks remain unrestricted at all times.",
    "Plan a responsible heritage stop through the surrounding public park rather than by parking on Rosedale Street. Confirm the city's current Sycamore Park facilities, approved access points and road conditions before arriving. Observe the railing rhythm and the girder profile only from a lawful, safe public location away from moving vehicles. Compare this urban concrete bridge with Meridian's 1940 Bosque River steel I-beam structure and Clifton's 1884 Whipple truss: together, the three reveal different Texas engineering eras while retaining very different rules for public access.",
  ],
  faqs:[
    thcFaq("When was Fort Worth's Sycamore Creek Bridge built?","The East Rosedale Street crossing was constructed in 1936 during improvements to the Rosedale corridor.",nomination),
    thcFaq("What kind of bridge is it?","It is a four-span variable-depth reinforced-concrete girder, sometimes described as a haunched concrete tee-beam bridge.",nomination),
    thcFaq("How large is the bridge?","The National Register nomination gives its length as 181 feet and width as 54 feet, carrying four lanes over Sycamore Creek.",nomination),
    thcFaq("Why are there arches along the railing?","Precast round-arch railing openings and classical-style posts are decorative architectural elements rather than the main load-bearing arches.",nomination),
    thcFaq("Is the bridge on the National Register of Historic Places?","Yes. The listing is dated February 19, 2026, reference number 100012723.",atlas),
    thcFaq("Can I walk across or photograph the bridge?","Historic documents describe sidewalks, but their current condition and permitted use must be confirmed locally. Use safe public approaches and never stop in an active traffic lane.",park),
    thcFaq("Is Sycamore Park next to the bridge?","Yes, the East Rosedale Street structure crosses Sycamore Creek by Sycamore Park. Check city park information for current routes and facilities.",park),
    thcFaq("Is this the same as the Sycamore Creek railroad or Hamilton County bridge?","No. The National Register property is the 1936 East Rosedale Street concrete girder bridge in Tarrant County, not a separate railroad, footbridge or Hamilton County truss.",atlas),
  ],
  sources:[
    thcSource("Texas Historical Commission Atlas — Sycamore Creek Bridge",atlas,"Official listing, address, reference 100012723, engineer and 1936 structural classification"),
    thcSource("National Register nomination — 1936 Rosedale concrete bridge",nomination,"Primary dimensions, girders, railing ornament, streetscape, park setting and historical significance"),
    thcSource("National Park Service weekly list February 20, 2026",federal,"February 19 official federal listing date"),
    thcSource("City of Fort Worth — Sycamore Park",park,"Public park location and currently applicable visitor-access research"),
    thcSource("Fort Worth Press, August 19, 1936","https://texashistory.unt.edu/ark:/67531/metapth1672738/m1/3/","Contemporary Rosedale corridor completion reporting and public civic framing"),
    thcSource("Wikimedia Commons — Sycamore Creek Bridge Fort Worth photograph",commonsFilePage(bridgePhoto),"Exact Tarrant County 1936 bridge photo and CC BY-SA 4.0 author/licensing information"),
  ],
  whyVisit:"An engineering-and-neighborhood-history stop is appropriate only from an authorized public path or park area after verifying present pedestrian conditions; do not stop or park on the bridge.",
  firstVisitSteps:[
    "Read the 1936 bridge nomination and compare its haunched beams and railings to other Texas public-works bridge designs.",
    "Check current Sycamore Park access and approach from a legal public path, never from the active roadway, creek flood channel or closed construction area.",
    "Extend the story through Polytechnic Heights and Rosedale corridor history, or compare the separate historic bridges in Meridian and Clifton.",
  ],
});
