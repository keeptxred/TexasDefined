import type { Destination, ImageRef } from "./types";

/**
 * Dallas African American heritage sites: source-led, distinct place records.
 * The extended history, primary source links and cross-linking are presented
 * by DallasBlackHistoryAuthority on each destination page.
 * Dates are factual review dates, not a claim that every venue is open today.
 */
const checked = "2026-10-12";
const commons = (file: string, alt: string, width: number, height: number, credit: string): ImageRef => ({
  src: `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}?width=1600`,
  alt,
  width,
  height,
  credit: `${credit} · Wikimedia Commons · license and file link: https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`,
});
const schoolPhoto = commons("Dallas Booker T Washington High School.jpg", "Booker T. Washington High School for the Performing and Visual Arts in Dallas, photographed in 2009", 1000, 544, "Andreas Praefcke · CC BY-SA 3.0 / GFDL");
const cemeteryPhoto = commons("African American Museum August 2016 10 (Facing the Rising Sun Freedman's Cemetery exhibit).jpg", "2016 Facing the Rising Sun exhibition at the African American Museum about Dallas Freedman's Cemetery, not a photograph of the cemetery memorial", 6000, 4000, "Michael Barera · CC BY-SA 4.0 · 2016 exhibit photograph");
const craftPhoto = commons("P1520669-1.jpg", "Historic Juanita Craft Civil Rights House at 2618 Warren Avenue, Dallas, photographed in 2014", 3776, 2138, "Drewp4vp · CC BY-SA 3.0 · 2014 photograph");
const stPaulPhoto = commons("Dallas - St. Paul United Methodist Church 01A.jpg", "The historic red-brick St. Paul United Methodist Church building in the Dallas Arts District, photographed in 2008", 2292, 1833, "Joe Mabel · CC BY-SA 3.0 · 2008 photograph");
const queenCityPhoto = commons("MASS Building.jpg", "MASS Building within the historic Queen City Heights district of South Dallas, photographed in 2014", 3614, 2352, "Drewp4vp · CC BY-SA 3.0 · 2014 photograph");
const tenthPhoto = commons("Tenth Street Historic District Freedmen's Town TxHM (29573143580).jpg", "Texas historical marker documenting the Tenth Street Freedmen's Town in Oak Cliff, photographed in 2016", 2160, 3840, "QuesterMark · CC BY-SA 2.0 · 2016 marker photograph");

export const dallasBlackHistoryDestinations: Destination[] = [
  {
    id: "dallas-history-booker-t-washington-school",
    brandId: "texasdefined",
    slug: "booker-t-washington-high-school-dallas",
    name: "Booker T. Washington High School for the Performing and Visual Arts",
    summary: "History and responsible visitor guide to Dallas's 1922 Black high school, its transformation into an arts magnet in 1976, and its ongoing public performances in the Arts District.",
    category: "historic-sites", region: "prairies-lakes", nearestTown: "Dallas", county: "Dallas",
    coordinates: { lat: 32.7915, lng: -96.7975 }, hero: schoolPhoto,
    bestSeason: "Year-round for the history; consult the school calendar for public performances, campus tours and school closures.",
    entryNote: "This is an operating Dallas ISD high school, not a walk-in museum. Attend a publicly advertised performance or use the school's approved campus-tour procedures; do not enter classrooms or photograph students without authorization.",
    highlights: ["The original 1922 school building", "Black secondary education during segregation", "1976 arts-magnet transition", "2008–09 historic renovation and arts expansion", "Dance, music, theatre and visual arts programming"],
    body: [
      "The school's history begins before its present arts reputation. Dallas Colored High School, established in the nineteenth century, served Black students in an unequal segregated public-school system. Booker T. Washington opened in 1922 as the city's purpose-built Black high school, offering education and a community institution even while students were denied equal access to many other facilities. Understanding that constraint is essential to appreciating the building.",
      "The 1922 campus became a focal point of Black education and neighborhood life. Overcrowding reflected both demand for secondary education and Dallas's exclusionary school system; the existence of a substantial school did not make segregation equitable. In 1955 the campus added vocational facilities when it functioned as a technical high school.",
      "The court-ordered desegregation of Dallas schools in 1976 transformed Booker T. Washington into a specialized magnet for students pursuing performing and visual arts. The change did not erase the earlier Black institution: it placed that preserved educational landscape into a new public-school mission.",
      "The arts program encompasses dance, music, theater and visual arts. The school became associated with the Dallas Arts District's identity while maintaining the historic main structure. Dallas ISD's 2006 project announcement described a major expansion around the original building, and the 2009 dedication recorded restoration and an additional modern arts complex.",
      "Visitors should distinguish two kinds of access. A publicly ticketed student concert, play or gallery opening is a cultural visit; a parent/student campus tour is a school-administered event with its own dates and rules. Neither grants permission to roam the campus. Use the current school's activities calendar and ticketing page rather than archived school publicity.",
      "Across the Arts District stands St. Paul United Methodist Church, a living institution founded in Dallas's post-emancipation Black community. Their proximity provides a useful but historically distinct comparison: one institution offered spiritual and community leadership, while the other expanded educational opportunity in a segregated city."
    ],
    managingAuthority: "Dallas Independent School District",
    officialUrl: "https://btwhspva.dallasisd.org/about/about-booker-t/school-history",
    address: "2501 Flora Street, Dallas, TX 75201", sourceCheckedAt: checked,
    accessibilityNotes: "Check accommodations for the specific performance, gallery or campus tour with Dallas ISD. The public school is not an unrestricted historic-house attraction.",
    directions: "In the downtown Dallas Arts District opposite St. Paul United Methodist Church. Consult event information for parking; bus and rail connections vary by destination.",
  },
  {
    id: "dallas-history-freedmans-cemetery",
    brandId: "texasdefined",
    slug: "freedmans-cemetery-memorial-dallas",
    name: "Freedman's Cemetery Memorial",
    summary: "Dallas's North Dallas Freedmen's Town burial ground, highway-construction archaeology, community-led memorialization and visitor guidance at North Central Expressway and Lemmon Avenue.",
    category: "historic-sites", region: "prairies-lakes", nearestTown: "Dallas", county: "Dallas",
    coordinates: { lat: 32.806, lng: -96.792 }, hero: cemeteryPhoto,
    bestSeason: "A quiet, respectful daylight visit year-round; summer heat and highway-adjacent traffic call for extra care.",
    entryNote: "This is an outdoor memorial and historic cemetery, not a conventional museum. Visit respectfully in daylight, remain on public paths and check the Dallas Parks site for maintenance or access changes. The hero photograph depicts a related museum exhibit, not the memorial itself.",
    highlights: ["Burial history of Dallas's North Dallas Freedmen's Town", "Formerly enslaved people and their descendants", "Freeway construction and archaeological intervention", "1,157 individuals documented in TxDOT-related excavation research", "Sculptures, public memory and historic designation"],
    body: [
      "The cemetery is part of the former North Dallas Freedmen's Town, a center of Black settlement, work, family life and worship after emancipation. At a time when segregated institutions limited African Americans' choices, a burial ground was also an assertion of community permanence and dignity.",
      "The date requires care: the City of Dallas historic-preservation page says the cemetery was established in 1861, while the Texas Historical Commission's public guide describes it as dedicated in 1869. Our chronology preserves this documented difference instead of presenting either date as uncontested.",
      "Street changes, neglect, vandalism and highway construction progressively disrupted the burial landscape and concealed graves from view. The site is therefore a history of city planning as well as family remembrance, and it should not be approached merely as an art installation beside a roadway.",
      "When expansion of North Central Expressway threatened surviving burials, local advocates and descendants pressed for archaeological documentation and commemoration. A TxDOT project investigated the impacted area in the early 1990s, exposing the scale of a cemetery that had been physically obscured.",
      "A TxDOT account identifies remains of 1,157 individuals removed and reburied following archaeological work. It is not accurate to say that the entire cemetery was relocated or that every burial has been individually identified. The archaeology documents the specific excavated highway right-of-way and the losses and displacements associated with that construction.",
      "The memorial, with sculptures and interpretive art, is a public remembrance of those buried here and of a Black Dallas neighborhood largely displaced by urban change. The nearby African American Museum's Facing the Rising Sun interpretation provides an additional, separate way to study the burial ground and the community.",
      "For researchers, the most responsible starting points are the City of Dallas landmark materials, TxDOT's archaeological documentation and the Texas Historical Commission's African Americans in Texas guide. For visitors, respect the location as a sacred site; it is not appropriate to remove objects, enter restricted areas or treat headstones and memorial art as props."
    ],
    managingAuthority: "City of Dallas / Dallas Parks",
    officialUrl: "https://dallasparks.org/766/Freedmans-Cemetery",
    address: "2700 Lemmon Avenue, Dallas, TX (near North Central Expressway)", sourceCheckedAt: checked,
    accessibilityNotes: "The memorial is outdoors near active high-speed roads. Verify an accessible pedestrian approach and usable crossing before visiting; no blanket wheelchair-access guarantee is documented here.",
    directions: "At the North Central Expressway and Lemmon Avenue corridor. Do not stop on expressway shoulders; plan a legal pedestrian approach.",
  },
  {
    id: "dallas-history-juanita-craft-house",
    brandId: "texasdefined",
    slug: "juanita-craft-civil-rights-house-dallas",
    name: "Juanita J. Craft Civil Rights House",
    summary: "Explore the Warren Avenue home where organizer Juanita Craft helped shape Dallas civil rights history, youth leadership and the struggle against segregation.",
    category: "historic-sites", region: "prairies-lakes", nearestTown: "Dallas", county: "Dallas",
    coordinates: { lat: 32.765, lng: -96.761944 }, hero: craftPhoto,
    bestSeason: "Indoor interpretation by current museum appointment or public visiting program; South Dallas exterior viewing is possible from lawful public sidewalks.",
    entryNote: "A historic-house museum with operating hours and entry arrangements that can change. Confirm public access and any tour reservation with the Dallas Office of Arts and Culture before traveling.",
    highlights: ["Juanita Craft's 2618 Warren Avenue home", "NAACP organizing and youth mentorship", "Dallas school and public-space desegregation", "Civil rights meetings in an ordinary home", "House restoration and museum interpretation"],
    body: [
      "Juanita Jewel Shanks Craft (1902–1985) organized for equal rights through decades when government, businesses, schools and public venues enforced racial segregation. She joined the NAACP in 1935 and developed a statewide network of chapters while cultivating young activists who became known as Craft Kids.",
      "Her Warren Avenue home was much more than a residence. Visitors and organizers held discussions here about voting rights, education, desegregation and civic action. Dallas's preservation record notes that Craft moved to the area during the 1950s, when racial violence and bombings made Black homeownership and civil-rights work especially perilous.",
      "The house's modest domestic scale is part of its historical argument: national figures could visit, but so could neighborhood children seeking guidance. Visitors should pay attention to the contrast between the familiar rooms of a bungalow and the consequential political strategies developed within them.",
      "Craft challenged segregated access at institutions and public gathering places, and later served on the Dallas City Council. Her work cannot be reduced to one famous court case or a single march. She connected voter participation, fair treatment, education, youth organizations and municipal government.",
      "The house is part of the larger Wheatley Place community and offers context for South Dallas neighborhood preservation. Restoration adapted the building for interpretation while retaining the sense of a home where organizing happened around everyday furniture and conversations.",
      "For an educational visit, start with Craft's biography, then examine the museum's own objects, photographs and oral-history interpretation. Check what tours, group visits or special programs the operating museum currently offers; historic photographs and old opening-hour listings are not a substitute for current access guidance.",
      "Juanita Craft's story connects to the Booker T. Washington School, St. Paul's congregation, the neighborhoods in which Black Dallas residents built institutions, and the wider history of Texas civil rights. This guide treats her as an organizer and civic leader rather than just a name attached to a restored building."
    ],
    managingAuthority: "City of Dallas Office of Arts and Culture",
    officialUrl: "https://dallasculture.org/cultural-venues/juanita-craft-house/",
    address: "2618 Warren Avenue, Dallas, TX 75215", sourceCheckedAt: checked,
    accessibilityNotes: "As a restored historic house, circulation and accessible-tour provisions should be confirmed directly with its operator. Do not assume every original doorway or room is fully accessible.",
    directions: "Located in the Wheatley Place area of South Dallas. This is a residential neighborhood; respect driveways and neighboring properties.",
  },
  {
    id: "dallas-history-st-paul-umc",
    brandId: "texasdefined",
    slug: "st-paul-united-methodist-church-dallas",
    name: "St. Paul United Methodist Church, Dallas",
    summary: "One of Dallas's oldest Black Methodist congregations, organized in 1873, and its historic red-brick Arts District church opposite Booker T. Washington High School.",
    category: "historic-sites", region: "prairies-lakes", nearestTown: "Dallas", county: "Dallas",
    coordinates: { lat: 32.792196, lng: -96.79635 }, hero: stPaulPhoto,
    bestSeason: "Year-round; worship, tours and cultural events depend on congregation schedules.",
    entryNote: "An active house of worship, not an open-access museum. Use the congregation's announcements for services, historical presentations and visitor access; do not enter private areas or disrupt worship.",
    highlights: ["Historic Black Methodist congregation founded in 1873", "Distinctive red-brick and ornamental-stone sanctuary", "Historic preservation in the Dallas Arts District", "Connections to the North Dallas Freedmen's Town", "Direct relationship to the nearby historic arts high school"],
    body: [
      "The St. Paul congregation was organized in 1873 to serve African Americans after emancipation. Its endurance is especially significant in an Arts District now known for large cultural institutions: the church represents a Black community that existed long before the district acquired its contemporary identity.",
      "The date of the building must not be confused with the founding of the congregation. Dallas historic-preservation records describe construction beginning in 1901 and completion in 1924. A Texas Historical Commission travel guide uses 1927 for the completed red-brick structure. Those records differ; both are separately cited in the extended guide.",
      "The sanctuary combines Gothic and Victorian motifs with brick and ornamental stone. Its tall openings, stained glass and carefully composed urban presence merit attention, but architectural appreciation should not obscure the congregation's social history.",
      "Religious institutions provided spaces for education, mutual aid, organization, music and intergenerational support in segregated Dallas. St. Paul belongs within that history of community capacity and service rather than being treated as another picturesque downtown church.",
      "The church's location near the Booker T. Washington campus makes it possible to compare two longstanding Black institutions in one short Arts District walk. The school opened in 1922, later becoming an arts magnet; St. Paul predates it by nearly half a century as a congregation.",
      "A visit may coincide with music, worship or a public event, but no regular paid tourist tour or guaranteed exhibit access is assumed. Check the church's current official information, be respectful of active parishioners and arrange group or architectural visits through the congregation.",
      "To research the site beyond the visitor level, consult the Dallas landmark nomination, state historical marker documentation and church archives. Their differing construction dates make a good example of why historic structures require source comparison instead of copying a single travel blurb."
    ],
    managingAuthority: "St. Paul United Methodist Church",
    officialUrl: "https://stpaulumcdallas.org/",
    address: "1816 Routh Street, Dallas, TX 75201", sourceCheckedAt: checked,
    accessibilityNotes: "Contact the congregation about step-free entry, restroom availability during public events and any assistive-listening arrangements; do not infer access from the exterior photograph.",
    directions: "In the Dallas Arts District directly across from Booker T. Washington High School.",
  },
  {
    id: "dallas-history-queen-city-heights",
    brandId: "texasdefined",
    slug: "queen-city-heights-historic-district-dallas",
    name: "Queen City Heights Historic District",
    summary: "Discover the history of a Reconstruction-era Black farming settlement that became a working-class South Dallas residential district with distinctive vernacular housing.",
    category: "historic-sites", region: "prairies-lakes", nearestTown: "Dallas", county: "Dallas",
    coordinates: { lat: 32.760, lng: -96.763056 }, hero: queenCityPhoto,
    bestSeason: "Comfortable daylight walking conditions in spring or fall; respect residential privacy year-round.",
    entryNote: "A lived-in historic neighborhood, not a ticketed attraction. Explore only public sidewalks and parks, avoid photographing residents without permission, and check city guidance before treating private buildings as tour stops.",
    highlights: ["Post-emancipation farming and settlement", "Black working-class community building", "Shotgun and Craftsman-style residential architecture", "National Register historic-district significance", "Exline Park and surrounding neighborhood history"],
    body: [
      "Queen City Heights preserves an important chapter of South Dallas Black life: the creation of a neighborhood by freed people and their descendants, the expansion of working-class homeownership, and the survival of everyday buildings that often receive less attention than grand civic monuments.",
      "The district developed from a Reconstruction-era farming settlement sometimes referred to in historical sources as Prairie. As Dallas industrialized and expanded, Black families seeking housing and economic opportunity helped establish the neighborhood's streets, homes and community networks.",
      "Many buildings are modest in size. Shotgun houses, Craftsman bungalows and related vernacular forms reveal practical responses to household budgets, narrow lots, changing tastes and local construction patterns. A modest house is still a primary historical source: its plan, porch and additions can document how families lived.",
      "The Texas Historical Commission describes the district as a catalyst for surrounding Black neighborhoods. The National Register designation acknowledges the shared historical and architectural character of the streetscape rather than a single famous building.",
      "The listed district is roughly associated with Eugene, Cooper, Latimer, Kynard and Dildock streets. Exline Park offers a community open-space reference point, but it should not be treated as a parking lot for private-house photography or as permission to intrude on nearby homes.",
      "The visitor experience here differs from a gallery. There is no staffed interpretive desk and no guaranteed restroom or public building access; the primary artifacts are the street layout and surviving houses. A responsible walk is brief, daylight-only, observant and centered on public rights-of-way.",
      "Place Queen City Heights alongside nearby Wheatley Place and Juanita Craft's Warren Avenue house, but do not conflate them: each has its own boundaries, development chronology and preservation status. The relationship among communities is essential to understanding South Dallas history."
    ],
    managingAuthority: "Residential property owners; historic designation administered through federal/state processes",
    officialUrl: "https://thc.texas.gov/blog/discover-these-8-african-american-history-sites-dallas",
    address: "Roughly bounded by Eugene, Cooper, Latimer, Kynard and Dildock streets, Dallas, TX", sourceCheckedAt: checked,
    accessibilityNotes: "Sidewalk conditions, crossings and curb ramps vary by block. No universally accessible continuous route is confirmed; review current conditions before visiting.",
    directions: "South Dallas residential historic district. Start with publicly accessible streets near Exline Park, not a private residence.",
  },
  {
    id: "dallas-history-tenth-street",
    brandId: "texasdefined",
    slug: "tenth-street-historic-district-oak-cliff",
    name: "Tenth Street Historic District / Freedmen's Town",
    summary: "History of the Oak Cliff freedmen's community, vernacular houses, early Black institutions, highway-era displacement and modern preservation.",
    category: "historic-sites", region: "prairies-lakes", nearestTown: "Dallas", county: "Dallas",
    coordinates: { lat: 32.751211, lng: -96.806117 }, hero: tenthPhoto,
    bestSeason: "Daylight neighborhood exploration in cooler months; preservation research can be done year-round.",
    entryNote: "An occupied historic neighborhood and cemetery, not a conventional walk-in attraction. Remain on public paths and respect private homes and memorial spaces.",
    highlights: ["Oak Cliff's historic Freedmen's Town", "Formerly enslaved residents and post-war settlement", "Elizabeth Chapel and early school history", "Traditional wood-frame folk and shotgun houses", "1993 Dallas landmark and 1994 National Register designations"],
    body: [
      "Tenth Street is one of the clearest surviving physical reminders of the African American communities formed in Oak Cliff after the Civil War. Formerly enslaved Texans and later generations built family networks, places of worship, small businesses and schools despite political and economic exclusion.",
      "Dallas's landmark district documentation records the opening of Elizabeth Chapel in 1880 and a school in 1886. Developer T. L. Marsalis platted much of the area in 1890, accelerating a settlement that already existed. This distinction matters: the land plat did not create the Black community out of nothing.",
      "The surviving architecture includes simple wood-frame houses and distinctive folk forms such as shotguns and double shotguns, as well as some Craftsman houses. They document household adaptation and community life better than a list of famous residents alone.",
      "The district's relationship with Oak Cliff Cemetery and its church and educational sites reveals how religious, educational and burial institutions structured community identity. Several original buildings have been altered, lost or demolished, so references to historical institutions must not imply every one remains open or intact.",
      "Highway construction and urban change created barriers and losses. Preservation Dallas documents Interstate 35E severing connections between Tenth Street and surrounding Oak Cliff. Demolition, absentee ownership and disinvestment compounded that damage over generations.",
      "Dallas designated a landmark district in 1993, and the National Register of Historic Places listed the neighborhood in 1994. These are different recognition systems with different preservation consequences. The city's own maps, nomination and contributing-structures information are key records for checking any specific address.",
      "A responsible self-guided visit should focus on the public streetscape and historic marker, not on treating occupied family homes as museum displays. Consider using the City's landmark resources before arriving so the architectural forms have context, and avoid trespassing, private photography intrusions and disruptive large-group tours.",
      "Tenth Street has a different location and history from North Dallas Freedmen's Town and its cemetery. Linking the two stories gives readers a wider account of how Black Dallas communities developed across the city while keeping their distinctive identities visible."
    ],
    managingAuthority: "City of Dallas Office of Historic Preservation / private property owners",
    officialUrl: "https://www.dallascityhall.com/departments/sustainabledevelopment/historicpreservation/Pages/tenth_street.aspx",
    address: "Tenth Street area, eastern Oak Cliff (near 10th and Lancaster streets), Dallas, TX", sourceCheckedAt: checked,
    accessibilityNotes: "Historic residential sidewalks and curb ramps can be uneven. Review individual routes; no assurance of step-free access to private structures.",
    directions: "Eastern Oak Cliff near East 8th Street, Moore Street, Clarendon Drive and I-35E; use the city-designated district map rather than relying solely on the neighborhood name.",
  },
];
