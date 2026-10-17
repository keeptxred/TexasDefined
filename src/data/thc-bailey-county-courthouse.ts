import { makeThcHeritageDestination, thcFaq, thcSource, commonsFilePage } from "./thc-landmark-heritage-builder";

const THC = "https://thc.texas.gov/preserve/designate-historic-properties/national-register-historic-places";
const atlas = "https://atlas.thc.texas.gov/Details/4302000224";
const marker = "https://atlas.thc.texas.gov/Details/5017005337";
const photo = "Bailey County Texas Courthouse 2019.jpg";

export const baileyCountyCourthouseHeritageDestination = makeThcHeritageDestination({
  slug:"bailey-county-courthouse",name:"Bailey County Courthouse",
  summary:"Muleshoe's 1925 Bailey County Courthouse is a still-working Classical Revival civic building designed by M. C. Butler. From the county's 1918 organization to the 2026 National Register listing, the brick-and-cast-stone building documents the permanence of county government on the Texas High Plains.",
  town:"Muleshoe",county:"Bailey",region:"panhandle-plains",
  coordinates:{lat:34.2259,lng:-102.7229},address:"300 S. First Street, Muleshoe, TX 79347",
  imageFile:photo,imageAlt:"Red-brick Bailey County Courthouse in Muleshoe, photographed in 2019",
  imageCredit:"Larry D. Moore · CC BY-SA 4.0 · Wikimedia Commons · 2019",
  imageWidth:3000,imageHeight:1688,officialUrl:atlas,operator:"Bailey County, Texas",
  season:"Spring and autumn are usually comfortable for an exterior courthouse-square visit; county government hours apply separately.",
  entry:"This is a functioning courthouse rather than a ticketed history museum. Public-office access, court procedures, photography permissions and security requirements must be confirmed with Bailey County.",
  accessibility:"THC records an ADA-related elevator addition, but public entrances, parking spaces and elevator operation should be checked with county officials before an interior visit.",
  highlights:[
    "Built in 1925 as the enduring courthouse of Bailey County",
    "Architect M. C. Butler designed the Classical Revival masonry building",
    "Brickwork, cast-stone details, a capped parapet and pedimented entries",
    "County organized in 1918; Muleshoe chosen as county seat in 1919",
    "Recognized in THC's June 2026 National Register listing",
  ],
  body:[
    "Bailey County was created in 1876 but remained attached to neighboring jurisdictions for decades. It did not organize its own government until November 1918, following the gradual settlement of the western High Plains. In April 1919 the county seat was fixed at Muleshoe. This distinction matters: the town's county-government history predates the red-brick courthouse that now anchors its civic center. The earliest official proceedings used temporary accommodations, and a modest frame courthouse served before the permanent masonry structure.",
    "The county built its present courthouse in 1925. The THC's courthouse atlas identifies the architect as M. C. Butler and the design as Classical Revival, with brick, cast-stone ornament, ornamental brick coursing, a capped parapet and pedimented entrances. The combination gives an otherwise economical county building the visual language of an enduring public institution. Look for the way classical forms were simplified for the available materials and construction budgets rather than expecting the scale of courthouses in larger Texas cities.",
    "Its historical setting is a county transformed by ranching, settlement, agricultural trade and connections beyond the high plains. The state historical marker on the courthouse grounds tells a fuller story of the county's creation in 1876, formal organization in 1918, the selection of Muleshoe and the construction of early county offices. Reading the marker alongside the building avoids compressing half a century of territorial and institutional change into the single date '1925.' The square marks civic continuity rather than one moment.",
    "This remains an active government building. The historical commission's inventory records an elevator addition associated with accessibility, demonstrating how the courthouse has been modified to continue meeting public needs. Such changes should not be mistaken for 1920s original features. County employees, courts and citizens still use the building, so interior photography, courtroom admission, hours and access routes depend on current government policy rather than on the building's historic designation.",
    "The THC includes Bailey County Courthouse in its June 2026 National Register additions. A National Register listing records the building's recognized historical or architectural importance, but does not mean it has become an unstaffed attraction or that offices are open for sightseeing. The atlas courthouse record may also retain older 'NR: No' metadata from a prior inventory. When sources disagree about status, use the dated 2026 THC National Register additions rather than silently repeating outdated database fields.",
    "Begin with the building's publicly viewable exterior, comparing the pedimented entrances and masonry details with the historical marker and previous-courthouse chronology. If visiting a county office, check the official phone directory and ask about entry procedures. Extend the experience with Muleshoe town history and the surrounding agricultural landscape, keeping businesses' and public offices' different access rules clear. This is most meaningful as a study of local institutions, not a claim of continuous guided tours.",
  ],
  faqs:[
    thcFaq("When was the Bailey County Courthouse built?","The current brick courthouse was constructed in 1925. Earlier temporary and frame county facilities preceded it.",atlas),
    thcFaq("Who designed the courthouse?","THC credits M. C. Butler, using a Classical Revival architectural vocabulary.",atlas),
    thcFaq("When did Bailey County become an organized government?","It formally organized in November 1918; Muleshoe became the county seat in April 1919.",marker),
    thcFaq("Is the courthouse on the National Register?","THC includes Bailey County Courthouse in its June 2026 listings, even though an older courthouse Atlas record still has its former NR field.",THC),
    thcFaq("Can visitors tour the courthouse?","It functions as a county government building, not a scheduled public museum. Confirm permitted access, hours and court security with the county.",atlas),
    thcFaq("Is the courthouse accessible?","THC's building inventory mentions an ADA elevator addition. Verify current step-free entry, elevator and parking with county staff.",atlas),
  ],
  sources:[
    thcSource("THC Atlas — Bailey County Courthouse (1925)",atlas,"Construction, architect, county ownership, architecture and accessibility modification"),
    thcSource("THC Atlas — Founding of Bailey County",marker,"Creation, organization, county seat and predecessor courthouse chronology"),
    thcSource("THC — 2026 National Register listings",THC,"June 2026 National Register status, distinct from the older courthouse Atlas field"),
    thcSource("Wikimedia Commons — Bailey County Courthouse photograph",commonsFilePage(photo),"Exact building image by Larry D. Moore, CC BY-SA 4.0"),
  ],
  whyVisit:"A short, respectful courthouse-square visit conveys Bailey County's governmental history; interior access is governed by current county policy.",
  firstVisitSteps:[
    "Read the courthouse grounds marker and trace the county's organization from 1918 through the 1925 building.",
    "Compare Classical Revival brick-and-cast-stone details from public exterior viewpoints without interrupting office business.",
    "Connect the courthouse to Muleshoe's ranching and agricultural development; contact the county for any interior business or access needs.",
  ],
});
