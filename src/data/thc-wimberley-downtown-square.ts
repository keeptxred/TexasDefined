import { makeThcHeritageDestination, thcFaq, thcSource, commonsFilePage } from "./thc-landmark-heritage-builder";

const thc="https://thc.texas.gov/preserve/designate-historic-properties/national-register-historic-places";
const visit="https://www.visitwimberleytx.org/plan-your-visit/";
const oak="https://www.cityofwimberley.com/400/Oak-Park-Welcome-Center";
const nomination="https://www.thc.texas.gov/public/upload/preserve/national_register/draft_nominations/Wimberley%20Downtown%20Square%20HD%20SBR.pdf";
const image="Wimberley Texas Downtown 2.JPG";

export const wimberleyDowntownSquareHeritageDestination = makeThcHeritageDestination({
  slug:"wimberley-downtown-square-historic-district",name:"Wimberley Downtown Square Historic District",
  summary:"Wimberley's National Register-listed Downtown Square is the Hill Country town's old mill and commercial core, shaped by Cypress Creek, Ranch Road 12 and more than a century of vernacular wood and masonry buildings. Its architectural record runs from the 1870s to the 1970s, tracing the transition from rural service center to arts and recreation destination.",
  town:"Wimberley",county:"Hays",region:"hill-country",
  coordinates:{lat:29.997,lng:-98.098},address:"Wimberley Square, RR 12 and Oak Drive, Wimberley, TX",
  imageFile:image,imageAlt:"Shops and commercial buildings in the historic Wimberley Square district, photographed in 2015",
  imageCredit:"Travis K. Witt · CC BY-SA 4.0 · Wikimedia Commons (2015)",
  imageWidth:3456,imageHeight:2304,
  officialUrl:thc,operator:"City of Wimberley and individually owned downtown commercial and residential properties",
  season:"Spring and autumn offer milder temperatures for a walking tour. Summer weekends and market dates are busier; check weather and event traffic.",
  entry:"Public Square sidewalks need no district admission. Shops, restaurants, church properties, events and accommodations set their own hours and access. Public parking and restrooms are available at Oak Park and other downtown facilities; obey posted restrictions.",
  accessibility:"The City of Wimberley identifies six accessible parking spaces with compliant sidewalks at Oak Park, 109 Oak Drive, connecting to the Square. Historical storefront entries vary; verify individual shops and current crossing conditions before planning a step-free route.",
  highlights:[
    "National Register addition in February 2025",
    "Cypress Creek mill settlement that became today's downtown core",
    "Period of historical significance from 1870 to 1973 in the nomination",
    "Vernacular wood and stone buildings, roadside businesses and midcentury commercial structures",
    "Oak Park visitor center with public parking, accessible spaces and restrooms",
  ],
  body:[
    "The Downtown Square owes its location to water and work. Early settlement formed near a gristmill site and Cypress Creek, where families needed access to resources and a common commercial focus. Instead of an imposing county courthouse or a major railroad terminus, the surrounding businesses and residences grew around a local service area. The National Register nomination documents this distinctive commercial and residential core, which remains active near the creek and Ranch Road 12.",
    "The historic district shows how a Hill Country place developed through different kinds of construction. The nomination identifies wood and masonry buildings from the late nineteenth century, Craftsman-influenced houses and roadside commercial uses, and mid-twentieth-century shops and rental cottages. These structures are not all the same age or use; together they record changing routes, tourism, building materials and customer needs. Its nominated period of significance begins with an extant 1870 property and ends in 1973.",
    "Limestone, wood and vernacular forms are important interpretive clues. Unlike an urban commercial district laid out in consistent rows of brick warehouses, Wimberley contains relatively modest and individualized buildings adapted to an evolving town. Historic construction and later alterations sometimes coexist. A careful walk distinguishes surviving early fabric from rehabilitations, newer commercial fronts and the changes a living downtown requires. The meaningful unit of preservation is the ensemble, not any invented claim that every building is individually listed.",
    "Ranch Road 12 became a major thoroughfare across the Square after earlier local roads were improved. Traffic and tourism helped alter a settlement oriented to agricultural services into a destination of art galleries, restaurants, shops and river recreation. The historic nomination recognizes this long transformation as a community-planning story. Its February 2025 National Register listing documents a record of architecture and development, not an authorization to enter private homes or any closed storefront.",
    "Visitor logistics make the Square a more practical family heritage stop than many privately occupied historic places. The city's Oak Park and Welcome Center at 109 Oak Drive provides parking and a public restroom facility. It documents six accessible parking spaces linked to Square sidewalks and more than 130 additional spaces. The destination organization identifies the Community Center as another public parking option. A visit can begin there, letting travelers choose a manageable walking loop without blocking shop loading zones or neighborhood drives.",
    "For interpretation, first notice the creek, the small commercial scale and the varied building types. Then compare how the nineteenth-century mill landscape developed into a twentieth-century roadside and recreation economy. Individual shops and eateries offer modern services but are independent businesses, not museum rooms. To continue with Blue Hole or nearby river access, make an entirely separate plan based on the parks' current reservations and water conditions rather than treating those outings as part of the historic district's public access.",
  ],
  faqs:[
    thcFaq("When was Wimberley Downtown Square listed in the National Register?","It appears in the February 2025 National Register additions reported by THC.",thc),
    thcFaq("What is historically important about the Square?","A settlement and commercial core associated with Cypress Creek and a former gristmill preserves varied vernacular building types and the town's transformation into a recreation destination.",nomination),
    thcFaq("How old are the historic buildings?","The nomination documents a period of significance spanning 1870–1973, with buildings dating from different points in that period.",nomination),
    thcFaq("Where can I park in downtown Wimberley?","Oak Park at 109 Oak Drive and the Wimberley Community Center are identified public parking options; check current signs and event arrangements.",visit),
    thcFaq("Are there public restrooms and accessible parking?","Oak Park has restroom buildings and six ADA parking spaces linked by compliant sidewalks to the Square according to the city. Other downtown facilities may also have restrooms.",oak),
    thcFaq("Can visitors enter every historic building?","No. A federal historic-district listing does not turn private properties into tour venues. Shops, homes and other operators set their own access requirements.",thc),
  ],
  sources:[
    thcSource("THC — February 2025 National Register listing",thc,"Official National Register listing"),
    thcSource("National Register nomination — Wimberley Downtown Square",nomination,"Historic significance, built-resource types and 1870–1973 chronology"),
    thcSource("City of Wimberley — Oak Park and Welcome Center",oak,"Public restrooms, accessible spaces, parking and Square connection"),
    thcSource("Visit Wimberley — practical planning",visit,"Parking, transit, restrooms and independently operated downtown venues"),
    thcSource("Wikimedia Commons — downtown Square photo",commonsFilePage(image),"Travis K. Witt exact-district image, CC BY-SA 4.0"),
  ],
  whyVisit:"A walking architecture and shopping outing is appropriate on public sidewalks, with designated parking and separate admission rules for any operating venue.",
  firstVisitSteps:[
    "Start at Oak Park, 109 Oak Drive, checking public parking and available accessible routes toward the Square.",
    "Walk the permitted streets and compare older wood/masonry and midcentury storefront forms with the creek-oriented settlement.",
    "Visit an independently open shop or gallery, then reserve separately for any swimming, creek or other outdoor activity.",
  ],
});
