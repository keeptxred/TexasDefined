import { makeThcHeritageDestination, thcFaq, thcSource, commonsFilePage } from "./thc-landmark-heritage-builder";

const nomination = "https://atlas.thc.texas.gov/NR/pdfs/100011753/100011753.pdf";
const register = "https://thc.texas.gov/preserve/designate-historic-properties/national-register-historic-places";
const hotel = "https://www.thehollandhoteltexas.com/";
const rooms = "https://www.thehollandhoteltexas.com/stay";
const details = "https://www.thehollandhoteltexas.com/details";
const history = "https://www.thehollandhoteltexas.com/history";
const trost = "https://www.henrytrost.org/buildings/holland-hotel/";
const image = "Alpine - Holland Hotel.jpg";

/** Independently researched 1928 Alpine hotel.
 * Historical sources: NPS nomination, Trost historic records, operator.
 * Operating details must be refreshed; the hotel continues to change.
 * File-specific 2025 exterior photo rights: P. Hughes, CC BY 4.0,
 * Wikimedia Commons File:Alpine_-_Holland_Hotel.jpg. It must differ from
 * the Alpine Downtown Historic District photo to remain image-indexable.
 */
export const hollandHotelAuthorityDestination = makeThcHeritageDestination({
  slug:"holland-hotel",
  name:"Holland Hotel",
  summary:"Alpine's 1928 Holland Hotel is an important Spanish Colonial Revival landmark designed by Henry C. Trost and built to serve railroad travelers, ranchers, visitors and the civic life of the Big Bend gateway. The independently listed National Register building remains an operating hotel, with the earlier Holland family hotel story reaching back to 1912.",
  town:"Alpine", county:"Brewster", region:"big-bend",
  coordinates:{lat:30.3575,lng:-103.6628},
  address:"209 West Holland Avenue, Alpine, TX 79830",
  imageFile:image,
  imageAlt:"The Holland Hotel’s historic Spanish Colonial Revival facade in Alpine, Texas, photographed in February 2025",
  imageCredit:"P. Hughes · CC BY 4.0 · Wikimedia Commons · photographed February 3, 2025",
  imageWidth:5012,imageHeight:3896,
  officialUrl:hotel,
  operator:"Holland Hotel, operated by current lodging management; verify directly at 432-837-2800",
  season:"Year-round indoor accommodations and downtown architecture; Alpine has seasonal temperature swings and high-desert travel conditions.",
  entry:"The building is an operating 27-room hotel, not a no-charge historic-house museum. Overnight lodging requires a reservation and payment. Public-use spaces, dining options, tours and event areas must be verified with the hotel, and guest-room corridors are private.",
  accessibility:"Guest rooms and public interior areas can have different accessible features in a 1928 adapted historic building. The operator does not document a comprehensive current step-free route on the public history pages; call ahead about accessible rooms, entries, parking and planned renovations before booking.",
  highlights:[
    "Built in 1928 for the Holland family, replacing the earlier hotel as Alpine grew",
    "Architect Henry C. Trost and his firm Trost & Trost designed the Spanish Colonial Revival building",
    "The Southern Pacific Sunset Limited railroad connected Alpine with regional and national travelers",
    "A long history as a social and commercial meeting place, later reused for offices before hotel restoration",
    "National Register of Historic Places listing: April 21, 2025, reference 100011753",
    "Present operator advertises 27 individual guest rooms and suites; facilities and fees vary by booking",
  ],
  body:[
    "Alpine grew as a railroad and regional service center after Southern Pacific reached the Trans-Pecos in the early 1880s. Hotels mattered because travelers arriving by train, ranchers doing business, salespeople, prospectors and later tourists needed short-term accommodation. The Holland family's hospitality enterprise preceded the present building. An earlier Holland Hotel opened in 1912; the separate 1928 hotel on West Holland Avenue belongs to a later period of downtown investment. Confusing the dates of the family business and the extant structure obscures the town's economic evolution.",
    "Ranching entrepreneur J. R. Holland helped establish the original hotel, with Clay Holland taking over after his father's death. The family commissioned the architectural firm Trost & Trost for a new hotel in the 1920s, with Henry C. Trost responsible for the Spanish Colonial Revival design. An architectural history assembled by the Henry C. Trost Historical Organization records the project at 209 West Holland Avenue and describes a $250,000 investment, substantial for a West Texas town of Alpine's size. The new building opened in 1928.",
    "The architecture rewards a closer look from West Holland Avenue. Stucco-like masonry surfaces, a low red-tile roof edge, arcades and arched openings show how the designers translated Mediterranean revival forms to a rail-served high-desert commercial setting. The National Register nomination documents the building's form and its relation to downtown Alpine. Historic photographs show how original hospitality spaces were designed to communicate comfort and civic standing, rather than treating the hotel merely as a collection of guest rooms.",
    "Its importance was social as well as architectural. The hotel's dining rooms, lobby and meeting spaces hosted visitors and local gatherings. The railroad provided a line of regional and national connection, and the property helped introduce outsiders to the Big Bend area as Alpine became a recognized gateway. The story also includes changing economic fortunes: ownership passed through multiple hands, the hotel closed as a hotel around 1969, and rooms and public spaces were used differently until later restoration work helped return the building to accommodation.",
    "The National Register listed the Holland Hotel on April 21, 2025 as a property significant in architecture and commerce. That independent listing is separate from the designation of Alpine Downtown Historic District, whose wider boundaries and resources tell a related—but different—story. A useful walk can compare the hotel, railroad corridor, Brewster County Courthouse and neighboring historic buildings, while remembering that a district boundary does not grant access to the private rooms of a working hotel.",
    "For current visitors, the hotel advertises 27 individually furnished rooms and suites, overnight amenities, a downtown location and contact information on its official site. Its public details page states that The Century food-and-beverage venue is closed for redevelopment and that the pool at the affiliated Maverick Inn is also closed while improvements proceed. The lodging page advertises a historic property maintenance fee per day. Because all of these operational details may change as work continues, confirm them directly at the time of booking instead of assuming they describe permanent services.",
    "For a history-first visit without staying overnight, consider a short public-sidewalk architecture walk rather than entering guest-only spaces. Use the 1928 facade and the Trost firm's wider West Texas work as an interpretive starting point, then see how the historic hotel fits the railroad-era streets of Alpine. Guests who do book should ask which public rooms are currently open, whether renovations could affect access and what accommodation options suit their mobility requirements. That distinction between public historic interpretation and modern commercial lodging makes a better visitor guide than treating every listed building as an unrestricted attraction.",
  ],
  faqs:[
    thcFaq("When was the present Holland Hotel in Alpine built?","The surviving Trost-designed building opened in 1928; the Holland family's earlier Alpine hotel business dates to 1912.",nomination),
    thcFaq("Who designed the Holland Hotel?","Henry C. Trost and the firm Trost & Trost designed the 1928 Spanish Colonial Revival hotel.",trost),
    thcFaq("Is Holland Hotel a National Register historic property?","Yes. It was individually listed April 21, 2025, reference 100011753. It also stands within the wider Alpine Downtown Historic District.",register),
    thcFaq("Can visitors still stay overnight?","The hotel's official site advertises 27 individually appointed rooms and suites. Confirm current reservations, rates, amenities and renovation impacts directly.",rooms),
    thcFaq("Can non-guests tour the rooms or go into all areas?","It is an active commercial lodging property, not a public historic-house tour. Guest spaces require appropriate permission and public facilities may be closed or reserved.",hotel),
    thcFaq("Is The Century restaurant or bar open?","The hotel's current details page reports The Century is closed for redevelopment. Check the operator for reopening and any other dining availability.",details),
    thcFaq("Is there an extra resort or historic-property fee?","The current rooms page lists a per-day Historic Property Maintenance Fee. Its amount and whether it is included in your quoted total should be confirmed when booking.",rooms),
    thcFaq("Is there wheelchair-accessible lodging and parking?","Contact the hotel directly about accessible room types, entry routes, parking and any restrictions from restoration work; the historical nomination is not an accessibility inspection.",hotel),
  ],
  sources:[
    thcSource("National Register nomination — Holland Hotel",nomination,"1928 architecture, 1912 predecessor and National Register preservation significance"),
    thcSource("THC — National Register 2025 listings",register,"Official April 2025 listed status"),
    thcSource("Henry C. Trost Historical Organization — Holland Hotel",trost,"Architectural authorship, costs, construction and ownership chronology"),
    thcSource("Holland Hotel — official historic account",history,"Operator account of original 1928 design and the building's evolving uses"),
    thcSource("Holland Hotel — current reservations and room types",rooms,"Current commercial availability, rooms, fees and services"),
    thcSource("Holland Hotel — current operational details",details,"Restaurant closure, front-desk hours, pool availability and check-in policies"),
    thcSource("Wikimedia Commons — distinct Holland Hotel photograph",commonsFilePage(image),"February 2025 exact-property facade photo by P. Hughes, original 5012 × 3896, CC BY 4.0; license https://creativecommons.org/licenses/by/4.0/"),
  ],
  whyVisit:"One of Alpine's key historic hotel buildings, well suited to a sidewalk architecture visit or a carefully booked stay, but not an unrestricted museum tour.",
  firstVisitSteps:[
    "Start on West Holland Avenue and compare the 1928 Spanish Revival facade with the hotel's earlier family-business chronology.",
    "Walk the publicly accessible Alpine downtown streets and connect the hotel to Southern Pacific rail travel, Trost's architecture and the nearby courthouse.",
    "If booking, ask about renovation work, meal service, fee totals, room accessibility, parking and which public spaces are open to guests.",
  ],
});
