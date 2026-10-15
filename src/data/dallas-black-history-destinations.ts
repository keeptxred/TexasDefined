import type { Destination, ImageRef } from "./types";

/**
 * Dallas African American heritage sites: source-led, distinct place records.
 * The extended history, primary source links and cross-linking are presented
 * by DallasBlackHistoryAuthority on each destination page.
 * Dates are factual review dates, not a claim that every venue is open today.
 */
const checked = "2026-10-12";
const commons = (file: string, alt: string, width: number, height: number, credit: string, original = false): ImageRef => ({
  src: `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}${original ? "" : "?width=1600"}`,
  alt,
  width,
  height,
  credit: `${credit} · Wikimedia Commons · license and file link: https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`,
});
const schoolPhoto = commons("Booker T. Washington High School for the Performing and Visual Arts 01.jpg", "Booker T. Washington High School for the Performing and Visual Arts in the Dallas Arts District, photographed in 2008", 3264, 2448, "Joe Mabel · CC BY-SA 3.0 / GFDL (dual-licensed)");
const cemeteryPhoto: ImageRef = {
  ...commons("African American Museum August 2016 10 (Facing the Rising Sun Freedman's Cemetery exhibit).jpg", "2016 Facing the Rising Sun exhibition at the African American Museum about Dallas Freedman's Cemetery, not a photograph of the cemetery memorial", 6000, 4000, "Michael Barera · CC BY-SA 4.0 · 2016 exhibit photograph", true),
  // Direct original file resolved from the Commons file page. The encoded
  // Special:Redirect/file original returned 404 on live Discover checks.
  src: "https://upload.wikimedia.org/wikipedia/commons/9/91/African_American_Museum_August_2016_10_%28Facing_the_Rising_Sun_Freedman%27s_Cemetery_exhibit%29.jpg",
};
const craftPhoto = commons("P1520669-1.jpg", "Historic Juanita Craft Civil Rights House at 2618 Warren Avenue, Dallas, photographed in 2014", 3776, 2138, "Drewp4vp · CC BY-SA 3.0 · 2014 photograph");
const stPaulPhoto = commons("Dallas - St. Paul United Methodist Church 01A.jpg", "The historic red-brick St. Paul United Methodist Church building in the Dallas Arts District, photographed in 2008", 2292, 1833, "Joe Mabel · CC BY-SA 3.0 · 2008 photograph");
const queenCityPhoto = commons("MASS Building.jpg", "MASS Building within the historic Queen City Heights district of South Dallas, photographed in 2014", 3614, 2352, "Drewp4vp · CC BY-SA 3.0 · 2014 photograph");
const tenthPhoto: ImageRef = {
  ...commons("Tenth Street Historic District Freedmen's Town TxHM (29573143580).jpg", "Texas historical marker documenting the Tenth Street Freedmen's Town in Oak Cliff, photographed in 2016", 2160, 3840, "QuesterMark · CC BY-SA 2.0 · 2016 marker photograph", true),
  src: "https://upload.wikimedia.org/wikipedia/commons/4/40/Tenth_Street_Historic_District_Freedmen%27s_Town_TxHM_%2829573143580%29.jpg",
};

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
      "The 1922 Booker T. Washington school served Dallas's segregated Black secondary-school community, succeeding the nineteenth-century Dallas Colored High School. Its original building remains important evidence of education and neighborhood life under unequal public-school policies.",
      "In 1976 the school became a magnet for performing and visual arts as Dallas desegregated its schools. A major 2000s renovation preserved historic fabric and expanded space for music, dance, theatre and visual art.",
      "This is an operating public school, not a museum. Check Dallas ISD for advertised performances or authorized tours; ordinary sightseeing does not permit campus access or photographing students."
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
      "The North Dallas Freedmen's Town cemetery commemorates African Americans who built a community after emancipation. Official histories disagree about its founding: City of Dallas materials say 1861, while a Texas Historical Commission publication gives 1869.",
      "Highway building and urban redevelopment obscured graves. Descendant advocacy led to archaeological investigations during North Central Expressway expansion; published research documents 1,150 excavated burials containing 1,157 individuals from affected areas, not the relocation of every burial.",
      "The outdoor memorial is a solemn landscape of remembrance. Visit via lawful pedestrian paths and pair the history with the African American Museum's Facing the Rising Sun interpretation at Fair Park, which is a different location."
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
    entryNote: "A historic-house museum with appointment-based tours, not unrestricted walk-in access. Confirm current scheduling, accessibility and group arrangements with the City of Dallas Office of Arts and Culture at 214-670-3687 before traveling; posted tour hours can change.",
    highlights: ["Juanita Craft's 2618 Warren Avenue home", "NAACP organizing and youth mentorship", "Dallas school and public-space desegregation", "Civil rights meetings in an ordinary home", "House restoration and museum interpretation"],
    body: [
      "Juanita Craft (1902–1985) used her Warren Avenue home to organize for civil rights, mentor young activists and build NAACP networks. Her work connected public accommodations, schools, voting, youth leadership and city government.",
      "The house's modest scale matters: meetings in a family home helped drive changes across Dallas and Texas. Its museum restoration preserves that lived setting; a 2025 Preservation Texas account documents accessible doorway changes and a restroom in the adjacent Little House.",
      "Access depends on the operator's tour arrangements. Verify current scheduling and accommodations before visiting, and respect the residential Wheatley Place neighborhood."
    ],
    managingAuthority: "City of Dallas Office of Arts and Culture",
    officialUrl: "https://dallasculture.org/cultural-venues/juanita-craft-house/",
    address: "2618 Warren Avenue, Dallas, TX 75215", sourceCheckedAt: checked,
    accessibilityNotes: "The 2025 Preservation Texas rehabilitation account documents widened or adjusted doorways and a newly accessible restroom in the adjacent Little House. Confirm the currently usable accessible tour route and accommodations with the museum before visiting.",
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
      "St. Paul was organized as a Black Methodist congregation in 1873 and remains an active Dallas Arts District institution. The congregation's founding date must not be confused with the construction date of its surviving brick sanctuary.",
      "Dallas preservation records describe work from 1901 to 1924, while a Texas Historical Commission guide dates the completed structure to 1927. Its brickwork, stained glass and Gothic/Victorian features express the congregation's enduring community presence.",
      "The church faces the historic Booker T. Washington school, making the pair an instructive public-streetscape comparison of faith and education in Black Dallas. Confirm permission for indoor visits and avoid disrupting worship."
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
      "Queen City Heights developed from a post-emancipation Black farming settlement into a working-class South Dallas district. Its Craftsman bungalows, shotgun houses and vernacular streetscapes reveal family life and housing history often overlooked in monumental heritage guides.",
      "National Register recognition concerns the shared landscape and surviving architectural patterns, not a claim that every structure is individually open to the public. Historic district boundaries and contributing status should be checked against primary designation records.",
      "This is a residential neighborhood. A respectful daytime visit focuses on public rights-of-way and nearby Exline Park, not private interiors or intrusive photography."
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
      "Tenth Street in Oak Cliff is a distinct Freedmen's Town established by Black residents after the Civil War. Early institutions included Elizabeth Chapel in 1880 and a school in 1886, preceding T. L. Marsalis's 1890 subdivision plat.",
      "Shotgun, double-shotgun and Craftsman houses document everyday life, while highway construction and demolitions show how much was lost. Dallas designated the historic district in 1993; National Register recognition followed in 1994.",
      "Visitors should remain on public streets and respect residents, graves and privately owned buildings. This Oak Cliff community must not be confused with the separate North Dallas Freedmen's Town commemorated at Freedman's Cemetery."
    ],
    managingAuthority: "City of Dallas Office of Historic Preservation / private property owners",
    officialUrl: "https://www.dallascityhall.com/departments/sustainabledevelopment/historicpreservation/Pages/tenth_street.aspx",
    address: "Tenth Street area, eastern Oak Cliff (near 10th and Lancaster streets), Dallas, TX", sourceCheckedAt: checked,
    accessibilityNotes: "Historic residential sidewalks and curb ramps can be uneven. Review individual routes; no assurance of step-free access to private structures.",
    directions: "Eastern Oak Cliff near East 8th Street, Moore Street, Clarendon Drive and I-35E; use the city-designated district map rather than relying solely on the neighborhood name.",
  },
];
