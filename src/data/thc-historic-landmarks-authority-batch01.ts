import type { Destination, DestinationAuthorityGuide } from "./types";

/**
 * THC National Register landmark authority batch 01.
 * Individually sourced and photographed places with public-facing context.
 * The historic district map coordinate is a reference point, not the full
 * district boundary. Operating conditions, parking and admission require
 * checks before any visit. Last source review: 2026-10-12.
 */
type CuratedLandmark = {
  id: string; slug: string; name: string; summary: string;
  region: Destination["region"]; town: string; county: string;
  coordinates: Destination["coordinates"]; address?: string;
  hero: Destination["hero"]; bestSeason: string; entryNote: string;
  access: string; officialUrl: string; operator: string;
  highlights: string[]; body: string[];
  faqs: NonNullable<Destination["visitorFaqs"]>;
  sources: DestinationAuthorityGuide["sources"];
  recommendedVisit: string; physicalEffort: DestinationAuthorityGuide["assessment"]["physicalEffort"];
  weather: DestinationAuthorityGuide["assessment"]["weatherExposure"];
  familyFit: string; firstTimeValue: string;
  itinerary: [string, string, string];
};

const THC = "https://thc.texas.gov/preserve/designate-historic-properties/national-register-historic-places";
const cc = (file: string) => `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}?width=1600`;
const license = (file: string) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file).replace(/%20/g, "_")}`;
const official = (label: string, url: string, scope: string) => ({ label, url, scope });
const faq = (question: string, answer: string, sourceUrl: string) => ({ question, answer, sourceUrl });
const commons = (file: string, alt: string, credit: string, width: number, height: number): Destination["hero"] => ({
  src: cc(file), alt, credit, width, height,
});

const sites: CuratedLandmark[] = [
  {
    id: "thc-nrhp-castro-county-courthouse-2026",
    slug: "castro-county-courthouse",
    name: "Castro County Courthouse",
    summary: "Dimmitt's active 1939 Castro County Courthouse is a New Deal-era civic landmark in Moderne Classical style, designed by Townes & Funk and enlarged in 1971. Its 2026 National Register listing tells a wider story of county government, federally funded construction and High Plains agriculture.",
    region: "panhandle-plains", town: "Dimmitt", county: "Castro",
    coordinates: { lat: 34.55075, lng: -102.31175 },
    address: "100 E. Bedford Street, Dimmitt, TX 79027",
    hero: commons("Castro County, TX, Courthouse IMG 4822.JPG",
      "Castro County Courthouse limestone Moderne Classical entrance in downtown Dimmitt",
      "Billy Hathorn · CC BY-SA 3.0 · Wikimedia Commons (2010)", 3286, 2191),
    bestSeason: "Year-round public exterior viewing, with cooler hours preferred for the courthouse-square walk; county offices operate on weekday schedules.",
    entryNote: "This is a working courthouse, not a standing historic-house tour. The county posts separate office hours; verify government office access, security and scheduled proceedings before entering.",
    access: "The 1971 enlargement was designed to improve access, but specific accessible entrances, elevators, courtroom security and parking arrangements must be confirmed with Castro County. A historic designation does not guarantee after-hours entry.",
    officialUrl: "https://www.co.castro.tx.us/",
    operator: "Castro County, Texas",
    highlights: [
      "1939 Public Works Administration-funded courthouse; county's third on this square",
      "Townes & Funk design with Moderne Classical architectural features",
      "1971 addition by architect Laverne H. Kirby nearly doubled building size",
      "Castro County's first property individually listed in the National Register, March 2026",
      "Historic courthouse marker references the 1891 organization and earlier buildings",
    ],
    body: [
      "The courthouse square in Dimmitt predates the building visitors see. After Castro County formally organized in 1891, the square became the seat of its civic affairs. Officials first worked in temporary quarters; an ornate courthouse on the site later burned after a 1906 lightning strike. The county dedicated a replacement brick courthouse in 1908. Structural problems eventually made another rebuild necessary. The surviving courthouse therefore represents a third chapter of the same site, not a structure from the county's founding year.",
      "The present courthouse was built in 1939 with Public Works Administration funding during the Great Depression. Federal investment in public buildings came at a consequential moment for the region, when irrigation, farming, ranching and county institutions increasingly connected High Plains communities to statewide markets. The Texas Historical Commission identifies the Amarillo firm Townes & Funk as the designer and Rabey G. Funk as the architect credited with the Moderne Classical design. Reduced classical details and modern vertical emphasis mark the entrance and stone facade.",
      "A building used continuously for county government changes with government itself. Lubbock architect Laverne H. Kirby designed a substantial 1971 addition that nearly doubled the courthouse footprint, incorporating expanded offices, jail facilities and access improvements. The THC treats that intervention as sympathetic to the building's character rather than an automatic loss of historic integrity. Visitors studying architecture should compare the original late-1930s massing with the 1970s work instead of treating everything visible as identical in age.",
      "The courthouse was formally listed in the National Register of Historic Places on March 19, 2026—the first such individually listed property in Castro County, according to THC. The listing recognizes history and architecture; it does not itself regulate every visitor interaction or guarantee a tour. A county office visit is a government-service errand subject to security, public meetings and schedules. A history-focused stop can begin outside with the square's monument and marker, without interrupting ongoing county business.",
      "Dimmitt rewards context beyond the facade. Compare the 1986 historical marker's account of lightning, replacement buildings and public works with the full THC listing and National Register nomination. Then consider how a courthouse-square landscape helped organize a rural county whose commercial rhythms depended on agriculture and roads. The adjoining sidewalks and street grid can reveal the building's relationship to downtown businesses even if public interior areas are unavailable that day.",
      "For accessibility or a deeper architecture visit, use the county's current office directory before setting out. Confirm which doors members of the public should use, whether security screening applies, which office has the records you need, and whether photography is allowed in public interior spaces. Historic office hours, parking practices and courtroom access may change. This guide deliberately distinguishes verified historic facts from operational details that only the current county operator can confirm.",
    ],
    faqs: [
      faq("When was the Castro County Courthouse built?", "The present courthouse was completed in 1939. Two earlier courthouses stood on the same civic square.", "https://thc.texas.gov/news-releases/castro-county-first-historic-courthouse-listed-national-register-historic-places"),
      faq("Why is the Dimmitt courthouse on the National Register?", "It is significant for county government history and Moderne Classical architecture, including its New Deal-era PWA construction and sympathetically designed expansion.", "https://thc.texas.gov/news-releases/castro-county-first-historic-courthouse-listed-national-register-historic-places"),
      faq("Can visitors tour the courthouse?", "It is an operating county government building, not a regular ticketed museum. Confirm public interior access and security requirements directly with the county.", "https://www.co.castro.tx.us/"),
      faq("Who designed the courthouse?", "The Amarillo firm Townes & Funk designed the 1939 building; Rabey G. Funk is credited. Laverne H. Kirby designed the 1971 addition.", "https://thc.texas.gov/news-releases/castro-county-first-historic-courthouse-listed-national-register-historic-places"),
      faq("Where is Castro County Courthouse?", "It occupies the traditional courthouse square at 100 East Bedford Street in Dimmitt, Castro County.", "https://www.co.castro.tx.us/page/castro.district.clerk"),
      faq("Is the building wheelchair accessible?", "The 1971 project included accessibility improvements, but present accessible entrance routes, parking and internal access should be confirmed with county staff.", "https://www.co.castro.tx.us/"),
    ],
    sources: [
      official("Texas Historical Commission — 2026 designation and architecture", "https://thc.texas.gov/news-releases/castro-county-first-historic-courthouse-listed-national-register-historic-places", "Primary historical, architectural, funding and listing evidence"),
      official("THC Historic Sites Atlas — Castro County Courthouses marker", "https://atlas.thc.texas.gov/Details/5069000758", "1891 county square, predecessor buildings and 1986 marker text"),
      official("Castro County — courthouse and District Clerk", "https://www.co.castro.tx.us/page/castro.district.clerk", "Current county address, operating offices and visitor logistics"),
      official("National Park Service — March 2026 weekly list", "https://www.nps.gov/subjects/nationalregister/weekly-list-2026-03-20.htm", "March 19, 2026 listing and federal reference 100012830"),
      official("Wikimedia Commons — building photo license", license("Castro County, TX, Courthouse IMG 4822.JPG"), "Exact-property image, original photographer and CC BY-SA 3.0 rights"),
    ],
    recommendedVisit: "Begin at the public courthouse square and exterior; request any inside visit from county staff and honor courtroom and office restrictions.",
    physicalEffort: "Low", weather: "Mixed indoor/outdoor",
    familyFit: "Good for a short civic-history lesson outdoors; inside visits should be quiet and secondary to courthouse operations.",
    firstTimeValue: "Study the 1891–1939 courthouse succession and distinguish original 1939 design from the 1971 addition.",
    itinerary: [
      "Start with the exterior, historical marker and pre-1939 courthouse chronology.",
      "Compare Moderne Classical details with the 1971 addition while remaining in appropriate public areas.",
      "Continue through downtown Dimmitt and related Castro County history; use the county's office directory for any records or accessibility needs.",
    ],
  },
  {
    id: "thc-nrhp-kokernot-field-2026",
    slug: "kokernot-field",
    name: "Kokernot Field",
    summary: "Alpine's 1947 Kokernot Field is a remarkably elaborate West Texas baseball park commissioned by rancher Herbert L. Kokernot Jr. Its local stonework, o6 Ranch identity, NAIA World Series history and continuing Alpine Cowboys games explain why this 2026 National Register listing matters beyond baseball fans.",
    region: "big-bend", town: "Alpine", county: "Brewster",
    coordinates: { lat: 30.372946, lng: -103.663917 },
    address: "E. Hendryx Avenue and Fighting Buck Avenue, Alpine, TX 79830",
    hero: commons("Kokernot Field Rock Wall 2010.jpg", "Native red stone outfield wall at historic Kokernot Field in Alpine, Texas", "Leaflet · CC BY-SA 3.0 · Wikimedia Commons (2010)", 4080, 2720),
    bestSeason: "Baseball-game dates are the best way to experience the field as a living venue. West Texas summers can be very hot; check start time, forecast and sun exposure.",
    entryNote: "Tickets and gate procedures depend on the scheduled game or permitted event. Confirm the Alpine Cowboys' published season, operator and current ticket procedures; do not assume the grounds are unlocked outside events.",
    access: "The historic park has period grandstands and open-air circulation. Accessible seating, ramps, restrooms and weather accommodations were not independently verified for 2026; contact the game organizer before purchasing tickets.",
    officialUrl: "https://alpine.pecosleague.com/",
    operator: "Alpine Independent School District (property); teams and event organizers operate scheduled baseball events",
    highlights: [
      "Opened in 1947 as a semiprofessional Alpine Cowboys ballpark",
      "Built for rancher Herbert L. Kokernot Jr. with native West Texas stone and intricate o6 ironwork",
      "Hosted the NAIA baseball championship from 1957 through 1959",
      "Ranching, college athletics and professional/semi-professional baseball meet in one venue",
      "March 2026 National Register listing recognizes this unusually intact athletic landscape",
    ],
    body: [
      "Kokernot Field is not simply a stadium with a historical marker. It records the ambition of rancher Herbert L. Kokernot Jr., who transformed Alpine baseball in the mid-1940s. Earlier local teams and modest ballparks had served the community. In 1947, Kokernot opened a vastly more sophisticated home for the Alpine Cowboys, using the same o6 brand associated with his ranching enterprise. The project reflects a peculiarly West Texas combination of private investment, town identity and long-distance baseball competition.",
      "The architecture is unusually memorable for a field of its size. Local stone gives the seating structures, retaining walls and later outfield enclosure their distinctive red-brown appearance. Baseball-themed ironwork and ranch branding turn functional entrances into an expression of local craft. The National Register documentation describes a 1947 field and maintenance building, a circa-1950 Little League complex and a 1952 manager's house, as well as supporting grounds. These separate resources illustrate how the entire complex evolved during its significant playing decades, rather than all being finished in 1947.",
      "Baseball historians connect the Cowboys with traveling semiprofessional rosters, the National Baseball Congress tournament in Wichita and players who later reached higher levels of the sport. The field also became associated with college baseball at nearby Sul Ross State. Most consequentially, Alpine hosted the early NAIA national baseball tournament from 1957 through 1959. Understanding the field therefore requires attention to both town baseball and the national development of small-college athletics, not just a list of famous players.",
      "The ballpark's survival is equally important. Stadiums frequently undergo major rebuilds that erase earlier seating layouts and details, while Kokernot retains recognizable architecture from its postwar era. The THC added the complex to its National Register list in March 2026. Historic integrity does not mean every gate, playing surface and facility remains untouched. Readers should distinguish original 1947 structures, later additions from the period of significance and subsequent maintenance before describing a feature as original.",
      "A scheduled game offers the most satisfying modern visit: spectators can observe how architecture and play continue to function together rather than viewing the site only as an object. The Alpine Cowboys publish game schedules and digital-ticket instructions; dates and ticket arrangements may change by season. The park is not a general-admission museum, and nighttime lighting, seating, restrooms and permitted photography should be verified with the organizer for a particular event.",
      "Make this part of an Alpine architecture day rather than driving directly to the stadium and leaving. Downtown Alpine's new National Register district, Brewster County Courthouse, Holland Hotel and the town's railroad-era streets help explain the civic and commercial setting from which the Kokernot enterprise grew. Keep the stadium visit dependent on an actual game or a confirmed appointment, and avoid suggesting that Little League facilities or historic residences within the nomination boundary are open to casual visitors.",
    ],
    faqs: [
      faq("When did Kokernot Field open?", "It opened in 1947 as a home for the Alpine Cowboys baseball program backed by Herbert L. Kokernot Jr.", "https://sabr.org/journal/article/baseball-in-the-middle-of-nowhere-the-unique-story-of-herbert-kokernot-and-the-alpine-cowboys/"),
      faq("Why does Kokernot Field matter historically?", "It preserves distinctive ranch-funded stadium architecture and decades of semiprofessional and college baseball, including early NAIA national tournaments.", "https://sabr.org/journal/article/baseball-in-the-middle-of-nowhere-the-unique-story-of-herbert-kokernot-and-the-alpine-cowboys/"),
      faq("Can I attend a baseball game there?", "Yes, when an organizer schedules games and tickets are available. Confirm the Alpine Cowboys' current calendar and ticketing instructions; the park is not necessarily open for casual touring.", "https://alpine.pecosleague.com/cowboys.asp?page=189"),
      faq("What makes the ballpark's architecture unusual?", "Native stonework, o6 Ranch branding, iron baseball decoration and a multi-resource complex give it an especially local design character.", "https://thc.texas.gov/preserve/designate-historic-properties/national-register-historic-places"),
      faq("Is Kokernot Field accessible?", "Current wheelchair routes, seating availability and restroom facilities should be confirmed with the event operator before buying tickets.", "https://alpine.pecosleague.com/"),
      faq("Where is the field in Alpine?", "It stands near East Hendryx and Fighting Buck avenues, northeast of downtown Alpine, near Kokernot Municipal Park and Sul Ross State.", "https://thc.texas.gov/preserve/designate-historic-properties/national-register-historic-places"),
    ],
    sources: [
      official("Texas Historical Commission — recent National Register listings", THC, "March 2026 listing of Kokernot Field"),
      official("Society for American Baseball Research — Alpine Cowboys history", "https://sabr.org/journal/article/baseball-in-the-middle-of-nowhere-the-unique-story-of-herbert-kokernot-and-the-alpine-cowboys/", "Team sponsor, 1947 opening, architecture and competition history"),
      official("Alpine Cowboys — official team and tickets", "https://alpine.pecosleague.com/cowboys.asp?page=189", "Current operator-facing event ticket guidance"),
      official("Wikimedia Commons — rock wall photo", license("Kokernot Field Rock Wall 2010.jpg"), "Exact site photograph and CC BY-SA 3.0 rights provenance"),
      official("THC Atlas — National Register nomination", "https://atlas.thc.texas.gov/NR/pdfs/100012845/100012845.pdf", "Original architectural narrative and nomination documentation (historical, not event-hours evidence)"),
    ],
    recommendedVisit: "Book an actual game when available; otherwise arrange specific permission for architecture viewing rather than treating the athletic complex as a public park.",
    physicalEffort: "Low to moderate", weather: "Mostly outdoors",
    familyFit: "A compelling family game stop when tickets, heat planning, seating and accessibility are confirmed.",
    firstTimeValue: "Look for the o6 ironwork, stone stands and the difference between the main ballpark and the Little League complex.",
    itinerary: [
      "Check the Alpine Cowboys game calendar, ticket instructions and current weather well before arrival.",
      "During an authorized game, observe the native stone and ironwork, then the sight lines and surviving historic stadium fabric.",
      "Pair the baseball story with the railroad, ranching and downtown Alpine historic district rather than assuming all field facilities allow free access.",
    ],
  },
  {
    id: "thc-nrhp-alpine-downtown-2026",
    slug: "alpine-downtown-historic-district",
    name: "Alpine Downtown Historic District",
    summary: "Spanning roughly 40 blocks and almost 96 acres, Alpine's 2026 National Register historic district links the arrival of the Southern Pacific Railroad in 1882 with its Brewster County courthouse, historic hotels, Hispanic community institutions, stone architecture and Big Bend gateway economy.",
    region: "big-bend", town: "Alpine", county: "Brewster",
    coordinates: { lat: 30.3587, lng: -103.6620 },
    address: "Historic downtown around Holland Avenue and 5th Street, Alpine, TX",
    hero: commons("Holland Avenue and Hotel Holland Alpine Texas DSC 5556 ad.JPG",
      "Holland Avenue and historic Holland Hotel in downtown Alpine, Texas",
      "Adavyd · CC BY-SA 3.0 · Wikimedia Commons (2014)", 3872, 2592),
    bestSeason: "Spring and autumn are usually more comfortable for a long outdoor downtown walk; winter days can be pleasant but weather varies sharply in the Trans-Pecos.",
    entryNote: "Public downtown streets and sidewalks can be explored without district admission. Hotels, businesses, worship spaces, residences and interiors all maintain separate access policies.",
    access: "Sidewalk surfaces and crossings vary among the district's many blocks. Request up-to-date step-free routes, parking and accessibility at individual buildings; never assume that a listed private or religious building is open for entry.",
    officialUrl: "https://thc.texas.gov/news-releases/alpine-downtown-historic-district-listed-national-register-historic-places",
    operator: "City of Alpine and individual public/private property owners; National Register administered through THC/NPS",
    highlights: [
      "Southern Pacific Railroad shaped Alpine's founding and regional logistics in 1882",
      "Approximately 40 blocks, almost 96 acres and 282 historic district resources",
      "Brewster County Courthouse and Jail, Holland Hotel and Hotel Ritchey preserve different periods",
      "Local pink-red Davis Mountains rhyolite appears in traditional buildings and walls",
      "Hispanic mutual-aid institutions and the 1936 Centennial School complicate an oversimplified frontier narrative",
    ],
    body: [
      "Alpine's historical geography begins with the Southern Pacific Railroad, whose 1882 arrival helped create a market and supply point between distant ranches, mining districts and other parts of Texas. Railroad access made it possible to move goods and livestock through the Trans-Pecos and helped the small settlement become a county seat and service hub. The new National Register district encompasses roughly 40 blocks and nearly 96 acres. The THC counted 282 resources, with about 78 percent maintaining sufficient historical integrity when surveyed.",
      "A walk through the district reveals several overlapping economies and architectural periods. The Second Empire-style Brewster County Courthouse and jail express late-nineteenth-century civic ambition. The Holland Hotel, associated with architect Henry C. Trost, signals a later stage when travelers, tourism and hospitality were as important as ranch supply. The Hotel Ritchey dates to 1886; its survival places one of the town's earliest lodging landscapes beside the twentieth-century commercial center.",
      "Local building material matters here. The THC points to pink and reddish rhyolite quarried in the Davis Mountains, applied not only to showpiece buildings but to retaining walls, cisterns, churches and everyday commercial structures. Adobe construction also survives in the district. These materials connect Alpine architecture to regionally available resources, climate and working methods, rather than treating the streetscape as a generic collection of Western storefronts.",
      "The district's social history is more complex than its most photographed facades. THC's nomination account includes the former Amor al Trabajo y Unión mutual aid society, established in 1908, which reflects the organizing life of Alpine's Hispanic community. The Centennial School, built in 1936, was used for segregated Hispanic students until 1972. Both belong in the district's story alongside the courthouse, railroad, church and hotel history. Their presence demands careful treatment of education, exclusion and community institutions.",
      "A National Register historic district recognizes the collective significance of its streets and resources; it does not mean every building within the boundary is individually listed or open to visitors. Some are working hotels and shops, some are private residences, and religious and educational properties have their own rules. The district boundary is an evidence-based historic designation; the map pin on this page is only a downtown orientation point, not a substitute for the complete nomination map.",
      "Plan an architectural walk using public sidewalks and approved entrances, then spend time at businesses that are actually open. Compare the courthouse and the Holland Hotel, note rhyolite and adobe where visible, and use the nearby Kokernot Field baseball story to see Alpine's postwar civic identity. In a region of long drives and rapid weather changes, an unhurried downtown morning is often more useful than trying to attach every historic resource to one rushed itinerary.",
    ],
    faqs: [
      faq("How large is Alpine's historic downtown district?", "THC reports about 40 blocks and almost 96 acres, with 282 surveyed resources at the time of nomination.", "https://thc.texas.gov/news-releases/alpine-downtown-historic-district-listed-national-register-historic-places"),
      faq("Why was Alpine established here?", "The Southern Pacific Railroad reached the area in 1882, supporting a transportation and supply center for ranching and mining.", "https://thc.texas.gov/news-releases/alpine-downtown-historic-district-listed-national-register-historic-places"),
      faq("What buildings should I look for?", "The Brewster County Courthouse and Jail, Holland Hotel, Hotel Ritchey, Centennial School and buildings using local rhyolite help illustrate different periods and communities.", "https://thc.texas.gov/news-releases/alpine-downtown-historic-district-listed-national-register-historic-places"),
      faq("Does the district have an entrance fee?", "No district-wide ticket is required to walk public sidewalks. Individual museums, accommodations and businesses may charge for their own services.", "https://thc.texas.gov/preserve/designate-historic-properties/national-register-historic-places/national-register-faq"),
      faq("Does designation mean every house is open to tour?", "No. Designation recognizes a group of significant properties; private ownership and each building's access rules still apply.", "https://thc.texas.gov/preserve/designate-historic-properties/national-register-historic-places/national-register-faq"),
      faq("Is the downtown walk wheelchair accessible?", "Public routes and specific building entrances differ; check current crossings, grade and ramps with the City of Alpine or individual venues.", "https://thc.texas.gov/news-releases/alpine-downtown-historic-district-listed-national-register-historic-places"),
    ],
    sources: [
      official("THC — Alpine Downtown historic district announcement", "https://thc.texas.gov/news-releases/alpine-downtown-historic-district-listed-national-register-historic-places", "District acreage, railroad founding, significant structures and historical communities"),
      official("National Park Service — March 2026 pending list", "https://www.nps.gov/subjects/nationalregister/pending-list-2026-03-28.htm", "Proposed district boundary reference; consult THC listed-status record for final status"),
      official("THC — National Register designation and districts FAQ", "https://thc.texas.gov/preserve/designate-historic-properties/national-register-historic-places/national-register-faq", "What district designation legally and practically means"),
      official("Wikimedia Commons — downtown Holland Hotel photograph", license("Holland Avenue and Hotel Holland Alpine Texas DSC 5556 ad.JPG"), "Exact district photograph, author and CC BY-SA 3.0 rights"),
    ],
    recommendedVisit: "Use public streets for a deliberate architecture-and-social-history walk, then enter only operating venues that explicitly admit visitors.",
    physicalEffort: "Low to moderate", weather: "Mostly outdoors",
    familyFit: "Good for older children interested in railroads, architecture and regional history; adjust walking distance for weather and traffic.",
    firstTimeValue: "Compare the courthouse, hotels, rhyolite buildings and sites associated with Hispanic community and school history.",
    itinerary: [
      "Start near Holland Avenue with the railroad-era setting, Hotel Ritchey and historic commercial buildings.",
      "Compare the courthouse precinct and Hotel Holland, reading their different architectural eras and the district's materials.",
      "Include the mutually supportive but distinct Centennial School and community history, then schedule Kokernot Field if a game is available.",
    ],
  },
  {
    id: "thc-nrhp-downtown-bryan-2026",
    slug: "downtown-bryan-historic-district",
    name: "Downtown Bryan Historic District",
    summary: "Bryan's 37-acre National Register district preserves the railroad-era commercial core laid out in 1866, a diamond-shaped grid, 104 resources and a long record of downtown reinvestment. Walkable landmarks include the Carnegie History Center, LaSalle Hotel and Queen Theatre.",
    region: "prairies-lakes", town: "Bryan", county: "Brazos",
    coordinates: { lat: 30.6748, lng: -96.3744 },
    address: "Main Street between approximately 22nd and 28th streets, Bryan, TX",
    hero: commons("Downtown Bryan, TX, Historic District IMG 1026.JPG",
      "Commercial storefronts and streetscape of Downtown Bryan Historic District in Bryan, Texas",
      "Billy Hathorn · CC BY-SA 3.0 · Wikimedia Commons (2009)", 2592, 1944),
    bestSeason: "Pleasant spring or autumn temperatures suit a walk; check the city calendar for markets and festivals and prepare for Texas summer heat.",
    entryNote: "The district is made up of public streets and separately operated venues, not a ticketed museum. Downtown parking rules and event street closures can change; use city guidance before visiting.",
    access: "The street-grid area has public sidewalks, but entry accessibility differs by business or historic building. Confirm step-free routes and the current parking zone rules with the City of Bryan; the district designation itself guarantees no particular facility.",
    officialUrl: "https://www.bryantx.gov/news/posts/historic-downtown-bryan-earns-national-designation/",
    operator: "City of Bryan and individual downtown property/business owners",
    highlights: [
      "Railroad-company town plat dates from 1866; cotton and regional trade shaped growth",
      "A 37-acre diamond-oriented commercial grid tied to railroad corridors",
      "104 resources, including 91 contributing buildings documented by THC",
      "Historic Carnegie History Center, Queen Theatre and LaSalle Hotel",
      "Bryan's own preservation program and Certified Local Government grant helped secure 2026 listing",
    ],
    body: [
      "Downtown Bryan was platted by the Houston & Texas Central Railroad in 1866. Its commercial geometry, including a distinctive diamond-shaped street grid, reflects a settlement built to move agricultural products and travelers through the Brazos Valley. The railroad linked the fertile Brazos Bottom's cotton-producing economy to wider markets, giving downtown streets, warehouses, stores and service businesses a historical relationship to the tracks rather than merely to the courthouse.",
      "The National Register district covers roughly 37 acres and contains 104 built resources, including 91 contributing buildings in THC's nomination summary. The contributing count matters because a district can contain newer, altered or otherwise noncontributing properties without losing its collective historical identity. Travelers should not confuse the district's National Register boundary with every building near Main Street or with an individual building's historic designation.",
      "Three identifiable public-facing landmarks help organize an introductory walk. The Carnegie History Center preserves a story of public learning and civic memory. The LaSalle Hotel conveys downtown's hospitality and regional trade era. The Queen Theatre expresses twentieth-century entertainment and adaptive reuse. Each site has different hours, admissions, private events and accessibility requirements; verify those with its current operator instead of treating downtown as one museum campus.",
      "Bryan did not gain this distinction by freezing its buildings in time. The city's historic preservation staff documents a multi-year effort to survey the district and pursue National Register recognition, helped by a 2023 Certified Local Government grant from the Texas Historical Commission. Restoration investments and removal of later facade coverings revealed surviving details. Preservation here is therefore a record of many individual decisions by building owners, city staff and downtown tenants.",
      "National Register status was recorded in January 2026, with THC and City of Bryan announcements following that winter. Recognition can support certain preservation financing options, but listing alone does not impose universal public visiting rights or turn a private business into a civic exhibit. The city administers its own historic landmark program separately. Visitors can read storefront eras, rooflines, masonry and railway orientation from public sidewalks without claiming access to private interior spaces.",
      "Plan a practical visit around the current parking and event environment. Bryan introduced time-limited parking in part of the downtown area in 2026, and a museum, cinema or hotel can follow schedules different from the adjacent businesses. Begin with public streets near Main, 22nd and 28th, compare the railroad-oriented grid, and visit the sites that are actually open. Tie the walking route to the city's broader Brazos County heritage rather than treating every historic facade as interchangeable.",
    ],
    faqs: [
      faq("When did Downtown Bryan become a National Register historic district?", "The THC Atlas records the district's listing on January 22, 2026; the City of Bryan announced the designation in February.", "https://atlas.thc.texas.gov/Details?atlasnumber=2100012600"),
      faq("How many historic properties are in the district?", "THC describes 104 built resources, of which 91 were considered contributing in the nomination.", "https://thc.texas.gov/news-releases/national-register-lists-downtown-bryan-historic-district"),
      faq("Why is the street grid shaped differently?", "It reflects the Houston & Texas Central Railroad's 1866 town plat and the commercial streets oriented to the railroad corridor.", "https://thc.texas.gov/news-releases/national-register-lists-downtown-bryan-historic-district"),
      faq("What are good landmarks to see downtown?", "The Carnegie History Center, Queen Theatre and LaSalle Hotel are notable district landmarks; check each operator for admission and hours.", "https://www.bryantx.gov/news/posts/historic-downtown-bryan-earns-national-designation/"),
      faq("Where can I park for the historic district?", "Some free public spaces have time limits instituted in 2026. Check the city's current downtown parking notices and obey posted time limits, events and signage.", "https://www.bryantx.gov/news/historic-downtown-bryan/"),
      faq("Can I enter every historic building?", "No. District listing recognizes collective significance, not a right to enter privately operated businesses, residences or restricted areas.", "https://thc.texas.gov/preserve/designate-historic-properties/national-register-historic-places/national-register-faq"),
    ],
    sources: [
      official("THC — Downtown Bryan 2026 National Register listing", "https://thc.texas.gov/news-releases/national-register-lists-downtown-bryan-historic-district", "District 37 acres, railroad setting, 104 buildings and 91 contributing properties"),
      official("THC Atlas — Downtown Bryan NR reference 100012600", "https://atlas.thc.texas.gov/Details?atlasnumber=2100012600", "Official listing date, reference number and eligibility criteria"),
      official("City of Bryan — preservation and designation", "https://www.bryantx.gov/news/posts/historic-downtown-bryan-earns-national-designation/", "2023 grant, active preservation, local landmarks and public-facing context"),
      official("City of Bryan — downtown parking notices", "https://www.bryantx.gov/news/historic-downtown-bryan/", "Current downtown events and parking-policy changes"),
      official("Wikimedia Commons — historic district photograph", license("Downtown Bryan, TX, Historic District IMG 1026.JPG"), "Exact district photo and CC BY-SA 3.0 reuse attribution"),
    ],
    recommendedVisit: "Explore the public street grid and choose currently operating venues for interior visits; review parking and event closures before arrival.",
    physicalEffort: "Low to moderate", weather: "Mixed indoor/outdoor",
    familyFit: "Good for a family downtown walk with a museum or theater stop planned around the venue's posted hours.",
    firstTimeValue: "Understand the railroad-shaped grid and compare the commercial, educational and entertainment buildings on the route.",
    itinerary: [
      "Orient yourself at the railroad-related Main Street grid between 22nd and 28th streets; check parking rules.",
      "Choose the Carnegie History Center, Queen Theatre or LaSalle Hotel only according to current public hours and appropriate uses.",
      "Continue into Brazos County's wider history while distinguishing downtown's collective district from individually listed resources.",
    ],
  },
];

function editorialGuide(site: CuratedLandmark): DestinationAuthorityGuide {
  return {
    whyItMatters: site.summary + " " + site.body[0],
    assessment: {
      recommendedVisit: site.recommendedVisit,
      physicalEffort: site.physicalEffort,
      weatherExposure: site.weather,
      planningLevel: "Moderate",
      familyFit: site.familyFit,
      firstTimeValue: site.firstTimeValue,
    },
    itineraries: [
      { label: "A purposeful first visit", duration: "One to two hours when access allows", steps: site.itinerary },
      { label: "History-first preparation", duration: "Before you travel", steps: [
        "Read the official designation and the primary site's historical background; note the year of each claim.",
        "Verify today's operator, legal public access, current hours and accessible routes rather than assuming National Register designation means open admission.",
        "Use the historic district or landmark's source references to connect the place to its wider Texas region.",
      ] },
      { label: "Deeper regional study", duration: "Half-day or more", steps: [
        "Study the site's architecture, community history and preservation changes using the sources below.",
        "Visit only publicly accessible areas and interpret original and later structures separately.",
        "Continue through the relevant town and nearby TexasDefined historic-site and heritage collections.",
      ] },
    ],
    sources: site.sources,
  };
}

export const thcHistoricLandmarkAuthorityBatch01Destinations: Destination[] = sites.map((site) => ({
  id: site.id, brandId: "texasdefined", slug: site.slug, name: site.name,
  summary: site.summary, category: "historic-sites", region: site.region,
  nearestTown: site.town, county: site.county,
  coordinates: site.coordinates, ...(site.address ? { address: site.address } : {}),
  hero: site.hero, bestSeason: site.bestSeason, entryNote: site.entryNote,
  accessibilityNotes: site.access, officialUrl: site.officialUrl,
  managingAuthority: site.operator, sourceCheckedAt: "2026-10-12",
  highlights: site.highlights, body: site.body,
  visitorFaqs: site.faqs, authorityGuide: editorialGuide(site),
}));

export const thcHistoricLandmarkAuthorityBatch01Slugs = sites.map(site => site.slug);
