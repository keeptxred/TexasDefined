import { makeThcHeritageDestination, thcFaq, thcSource, commonsFilePage } from "./thc-landmark-heritage-builder";

const announcement="https://thc.texas.gov/news-releases/sour-lake-downtown-historic-district-listed-national-register-historic-places";
const register="https://thc.texas.gov/preserve/designate-historic-properties/national-register-historic-places";
const image="Carpenter Building Sour Lake Texas.jpg";

export const sourLakeDowntownHeritageDestination = makeThcHeritageDestination({
  slug:"sour-lake-downtown-historic-district",name:"Sour Lake Downtown Historic District",
  summary:"Sour Lake's National Register-listed commercial core centers on Sixth and Merchant streets. Its 14 buildings trace a dramatic turn from nineteenth-century mineral-springs resort to 1903 oil-boom town, through destructive fire, brick rebuilding and decades of commercial life in Southeast Texas.",
  town:"Sour Lake",county:"Hardin",region:"piney-woods",
  coordinates:{lat:30.1396,lng:-94.4125},address:"Sixth Street and Merchant Street, Sour Lake, TX",
  imageFile:image,imageAlt:"Historic 1903 Carpenter Building on the corner of Sixth and Merchant streets in Sour Lake, Texas",
  imageCredit:"Michael Holley (Swtpc6800) · public domain · Wikimedia Commons (2006)",
  imageWidth:3032,imageHeight:2021,
  officialUrl:announcement,operator:"City of Sour Lake and independent property and business owners",
  season:"Cooler autumn or spring weather is more comfortable for the short outdoor route; expect heat, humidity and thunderstorms in warm months.",
  entry:"There is no district-wide admission charge to walk public downtown sidewalks. Historic commercial buildings remain independently owned; businesses, churches and other uses may restrict their interiors.",
  accessibility:"A landmark pin marks the Sixth/Merchant intersection, not the legal district boundary. Street conditions, curb cuts and historic building thresholds may vary. Confirm any specific interior accessibility and nearby parking with the individual operator.",
  highlights:[
    "Fourteen buildings dating between 1903 and 1966 along Sixth and Merchant",
    "1903 Carpenter Building originally housed First National Bank and survived the 1904 fire",
    "Oil discovery attracted thousands of workers to an earlier sulfur-springs resort",
    "1921 First Methodist Episcopal Church South and 1920 Citizens National Bank represent community growth",
    "Merchant Street Commercial Block reflects brick rebuilding around 1916",
  ],
  body:[
    "Before oil transformed the community, Sour Lake was known for sulfur-rich mineral water. Visitors believed its springs could provide therapeutic benefits, turning the place into a regional resort landscape. Those claims reflect historical beliefs rather than modern medical advice. The earlier settlement had accommodations and commerce before the petroleum boom, which explains why the later rapid industrial expansion did not begin in a town entirely without roads or businesses.",
    "Discoveries in the Sour Lake Field drove dramatic change in the early twentieth century. The Texas Historical Commission estimates that the population rose from about 150 residents to a peak near 10,000 during 1903 as workers, investors and speculators came to town. These were extraordinary boom-era estimates, not the town's current population or a modern census measure. Rail connections to Beaumont and the emergence of oilfield services, banks and businesses helped make the district a commercial center.",
    "The Carpenter Building at 730 Sixth Street is a useful place to start. Built in 1903 for the First National Bank, THC describes it as the town's first brick building and the oldest resource in the district. It also survived a major downtown fire in 1904 that destroyed many neighboring commercial buildings. The surviving facade demonstrates how brick investment was both a symbol of prosperity and a practical answer to the risk posed by earlier wooden construction.",
    "The rest of the historic streetscape provides multiple layers of evidence. The Merchant Street Commercial Block at 125 and 135 Merchant, constructed around 1916, is associated with businessman Ambrose Merchant and the effort to create a durable brick downtown. The Citizens National Bank building at 685–689 Sixth, completed in 1920, displays remnants of historic business signage. First Methodist Episcopal Church South, at 615 Sixth, dates to 1921 and represents a more settled community following the first volatile oil years.",
    "THC describes fourteen buildings within the designated commercial district, dating from 1903 through 1966. This range is important: preservation is not solely about the 1903 oil eruption, but about the businesses, congregations and architecture that endured or changed over the following decades. The designation recognizes the district's collective architectural and historical significance. The public street and sidewalk are reasonable ways to view it, but individual buildings are not automatically admission-open museums.",
    "For a practical visit, use Sixth and Merchant streets as a short exterior interpretation route, identifying the Carpenter Building first and considering the fire, banking and rebuilding chronology. Follow current signs and leave room for ordinary local business. The photo on this page shows the genuine Carpenter Building in 2006; do not assume the surroundings look identical today. Sour Lake's story also connects to Beaumont's refinery economy, early Gulf Coast railroads and the broader history of oil changing Texas landscapes.",
  ],
  faqs:[
    thcFaq("Why is downtown Sour Lake historically important?","It preserves a compact commercial center that grew from mineral-springs resort activity into an oil-boom economy and was rebuilt after destructive fires.",announcement),
    thcFaq("How many historic buildings are in the district?","THC lists 14 resources dating from 1903 to 1966, centered on Sixth and Merchant streets.",announcement),
    thcFaq("Which building should visitors look for first?","The Carpenter Building at 730 Sixth Street was built in 1903 for First National Bank and survived the 1904 downtown fire.",announcement),
    thcFaq("What was Sour Lake's population during the oil boom?","THC reports an estimated peak of about 10,000 residents in 1903, up from approximately 150; these are historic boom estimates.",announcement),
    thcFaq("When did Sour Lake Downtown gain National Register recognition?","It was listed in 2026, and THC published an announcement on July 22, 2026.",register),
    thcFaq("Can visitors enter every historic building?","No. The district is a collection of separately owned and operated properties; public sidewalk access does not confer entry to businesses or private spaces.",register),
  ],
  sources:[
    thcSource("THC — Sour Lake downtown 2026 historic designation",announcement,"District resources, date range, Carpenter Building, mineral springs and oil-boom chronology"),
    thcSource("THC — National Register designations",register,"2026 listed status and distinction between district recognition and access"),
    thcSource("THC Atlas — historic property discovery","https://atlas.thc.texas.gov/","Individual nomination and district-record research reference"),
    thcSource("Wikimedia Commons — Carpenter Building photograph",commonsFilePage(image),"Photograph by Michael Holley of the exact district property, public-domain permission"),
  ],
  whyVisit:"A short walk around Sixth and Merchant streets is an appropriate way to connect early oil, banking, architecture and the 1904 fire without entering closed buildings.",
  firstVisitSteps:[
    "Begin outside the Carpenter Building at 730 Sixth Street and read about the pre-oil mineral-springs community and the 1903 boom.",
    "Compare the Merchant Street block and Citizens National Bank building from available public sidewalks, noting the fire-and-rebuilding chronology.",
    "Consider how Sour Lake's business center fits the Beaumont and Southeast Texas petroleum network; verify any separately operated interior visit.",
  ],
});
