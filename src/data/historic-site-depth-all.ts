import type { Destination } from "./types";

// Editorial additions from the site-specific seed histories, published operator summaries
// and official institutional context. These paragraphs are not a substitute for
// claim-level site verification; review queue remains active in Supabase.
const SITE_DEPTH: Record<string, string[]> = {
  "acton-state-historic-site": [
    "Elizabeth Crockett’s grave tells a story beyond the death of her husband at the Alamo. She and other members of the Crockett family continued living in Texas, making this Hood County burial landscape a place to explore family migration, settlement and the later creation of Texas Revolution memorials.",
    "The stop is small and outdoors. The useful questions are whose memory the monument preserves, when public commemoration was added and how the cemetery fits into Granbury-area history; visitors should not expect the scale or indoor interpretation of an Alamo museum."
  ],
  "barrington-living-history-farm": [
    "Anson Jones’s presidency was a political office, but the farm adds a very different perspective on the Republic: farming methods, food production, household work and labor arrangements. Living-history demonstrations can turn those systems into questions visitors can investigate rather than a list of dates.",
    "Treat Barrington as one part of the Washington-on-the-Brazos complex, not as the location of the independence convention itself. Farm demonstrations and museum activity vary by operating day, so a meaningful weekend plan should check the separate schedules of the farm, museum and townsite."
  ],
  "bush-family-home": [
    "The Midland residence makes the Bush family’s public careers more understandable when placed inside the petroleum-driven growth of the Permian Basin. The political figures associated with the house later lived and served across the United States, but the domestic setting reflects a specific period of West Texas life.",
    "A historic-house visit is about rooms, objects, neighborhood and time rather than a collection of presidential monuments. Pair it with Midland’s civic and oil-history context and check how the operator currently handles tours, accessibility and group visits."
  ],
  "caddo-mounds-state-historic-site": [
    "The ancestral Caddo ceremonial and village landscape predates the better-known Spanish, Mexican and Anglo chapters of Texas history by many centuries. Mound construction is evidence of an organized, complex society, not an anonymous prelude to European settlement.",
    "An authoritative interpretation must include the Caddo Nation as a living people whose history did not end when this place stopped serving its earlier functions. Conservation, archaeology, respectful access and the condition of interpretive buildings are core visitor questions; verify current facilities before the trip."
  ],
  "casa-navarro": [
    "José Antonio Navarro’s life complicates any simple account in which the Texas Revolution was an exclusively Anglo-American movement. His Tejano political leadership, role in declaring independence and later civic work belong alongside San Antonio’s Mexican and Spanish colonial history.",
    "The property is a domestic setting rather than a large battlefield. Visitors can compare the surviving house and its neighborhood with the much more visited Alamo and San Antonio Missions, connecting Tejano family life and political decision-making to nearby military landmarks."
  ],
  "confederate-reunion-grounds": [
    "The reunion grounds tell a story about historical remembrance after the Civil War, not a battlefield event. Veterans, families and later organizations gathered here over decades; those commemorations also reveal who had the public power to frame the meaning of the conflict.",
    "Good interpretation must not separate those commemorative traditions from slavery, emancipation, segregation and the exclusion of Black Texans from many historical narratives. The Navasota River landscape is best visited as an outdoor memorial and memory-history site, with respectful attention to what the monuments emphasize and omit."
  ],
  "eisenhower-birthplace": [
    "Dwight Eisenhower’s 1890 birth in Denison offers a Texas starting point for a life later associated with the Allied military command in Europe and the U.S. presidency. His family’s Denison chapter was brief, which makes it misleading to describe his Texas birthplace as a comprehensive account of his upbringing.",
    "The house is valuable as a small-scale railroad-era family setting. Compare the room layouts and furnishings with the larger national story, then continue to Denison’s railroad district if the schedule allows. Check tours and room accessibility separately from outdoor grounds."
  ],
  "fannin-battleground": [
    "The Coleto battlefield is where James Fannin’s troops were surrounded during their retreat in March 1836. The open terrain, their attempts to move and the subsequent surrender need to be understood before the events at Presidio La Bahía can be put in proper sequence.",
    "This is a landscape and interpretation stop rather than an intact fortress. The clearest regional trip begins at Coleto and continues toward Goliad, while a separate Mission Espíritu Santo stop reveals the much older Spanish colonial setting associated with the same region."
  ],
  "fanthorp-inn": [
    "Fanthorp Inn explains how travel worked when early Texas settlements relied on stagecoach lines, horses and a limited road network. The inn was a place for meals, overnight lodging and the exchange of news as much as transportation.",
    "Read the building room by room and look for the practical needs of guests and workers. A good paired visit continues into Anderson and the Brazos corridor; programs or coach rides, when offered, must be confirmed rather than assumed on any visit."
  ],
  "first-capitol-of-texas": [
    "Columbia’s status as the first capital of the Republic of Texas captures the temporary and uncertain nature of the new government after the 1836 Revolution. This was an early political center, not the limestone Capitol complex now standing in Austin.",
    "The site works best in a Brazoria County historical circuit with the Stephen F. Austin memorial and area plantation sites. Put the early Republic’s political milestones next to the region’s economic dependence on agriculture and enslaved labor instead of treating government as isolated from society."
  ],
  "fort-martin-scott": [
    "The founding of Fort Martin Scott in 1848 put U.S. Army expansion next to the recently established German-immigrant community of Fredericksburg. That proximity raises questions about military roads, local markets, diplomacy and the Native nations whose homelands were being entered.",
    "This is an outdoor frontier-post experience that pairs naturally with Fredericksburg’s historic townscape. A National Museum of the Pacific War visit covers a much later conflict; scheduling the two makes a useful comparison between nineteenth-century post life and global twentieth-century war."
  ],
  "french-legation": [
    "French recognition of the Republic of Texas forms the diplomatic context of the French Legation. The house also connects to Austin’s growth from a small capital town into a complex city; its importance does not rest solely on a famous resident.",
    "Use the building, grounds and neighborhood together. The Texas Capitol nearby illustrates a much larger later seat of government, while the Legation demonstrates what foreign relations and elite domestic life looked like on an early Austin residential scale."
  ],
  "fulton-mansion": [
    "George and Harriet Fulton’s nineteenth-century bayfront home brings coastal enterprise and industrial-era technology into the story of the Rockport-Fulton region. Architectural choices, building materials and conveniences are evidence of the family’s resources and ambitions.",
    "Visitors should focus on what the rooms reveal about work, service, construction and Gulf Coast economic networks, not only decorative finishes. Confirm which interior levels are open and accessible before treating a house tour as a guaranteed full-building experience."
  ],
  "goodnight-ranch": [
    "Charles and Mary Ann Goodnight’s ranch history is inseparable from the Texas Panhandle’s cattle economy and the transformation of the Southern Plains. Their lives also intersected with bison conservation, ranch technology and a settler expansion that transformed Native homelands.",
    "A ranch property is best understood through the surrounding open range and the work required to sustain it, not as a single picturesque home. Visitors can compare its history with the adjacent broader Palo Duro Canyon region while separating ranch interpretation from present-day park recreation."
  ],
  "iwo-jima-museum-monument": [
    "The Iwo Jima monument connects the Rio Grande Valley with the global Pacific War and the creation of a famous U.S. military image. The photograph, the Marines and the later memorial should be treated as related but distinct parts of the story.",
    "A visit should distinguish the battle’s historical events from how the flag-raising came to be represented in sculpture and public memory. Pairing the monument with the museum’s interpretation is more useful than treating it merely as a recognizable photo backdrop."
  ],
  "kreische-brewery": [
    "Heinrich Kreische’s ruined brewery shows how immigrant entrepreneurship reshaped Central Texas in the nineteenth century. The industrial site also demonstrates why the Colorado River bluff was a useful location for production, water and transportation connections.",
    "The brewery is adjacent to Monument Hill, but the two places tell different histories: German-Texan industry and Republic military commemoration. A combined visit should compare building remains and memorial design without confusing the chronology of their creation."
  ],
  "landmark-inn": [
    "Landmark Inn preserves the working functions of a nineteenth-century Castroville complex: tavern, store, hotel and mill. It illustrates how a local enterprise served travelers and the immigrant community along the Medina River.",
    "Castroville’s Alsatian roots make the town part of the visit rather than a generic food stop. Historic lodging availability is separate from daytime tours, and visitors should check the operator’s present-day booking and preservation arrangements before assuming an overnight stay is possible."
  ],
  "levi-jordan-plantation": [
    "The Levi Jordan plantation landscape is essential to understanding the lives of enslaved people and later freed communities on a major sugar and cotton property. The evidence is not confined to a plantation house: archaeology and material culture document labor, foodways and community life.",
    "Pairing Levi Jordan with Varner-Hogg can show how two Brazoria County properties interpret slavery, emancipation and later economic change differently. A responsible guide centers the people who labored here, including those whose names survive only through records and excavated objects."
  ],
  "lipantitlan": [
    "In far northwestern Nueces County near Sandia, Lipantitlán’s name preserves an association with Lipan Apache presence; the later Mexican picket fort was built in 1831. The small garrison surrendered during the 1835 Texas Revolution. The visible landscape is principally a historical marker and the place where a fort once stood, not a preserved fort with staffed exhibits.",
    "The Texas Historical Commission explicitly says there is no on-site interpretation beyond the marker and no visitor services. The Handbook of Texas traces the park’s donation and later transfers of administration. Plan a short, respectful outdoor stop with water and independently confirmed directions rather than inventing facilities or a museum that does not exist.",
    "Do not conflate the two military episodes. According to the state agency, the small Mexican garrison surrendered the fort to Texan forces in 1835 without a shot being fired. A later Texas Centennial historical marker identifies a separate June 1842 attack led by Antonio Canales against defenders under James Davis. The marker records the fort’s history; it is not an original fortification or an indoor exhibit."
  ],
  "magoffin-home": [
    "The Magoffin family’s adobe home reveals how commerce, politics and family networks crossed the U.S.–Mexico border long before modern national boundaries simplified those relationships on maps. Its 1875 construction belongs to El Paso’s nineteenth-century urban transformation.",
    "Read the architecture in the context of desert materials, household labor and a multilingual border community. Pair the home with the mission trail or Chamizal only as a separate itinerary leg; those places address different periods and questions."
  ],
  "mission-dolores": [
    "Mission Dolores offers an East Texas counterpoint to the far better-known San Antonio missions. Its story must begin with Ais and Caddo-related Indigenous communities and the competing Spanish and French interests that shaped this region.",
    "The interpretive value is partly archaeological and geographical rather than dependent on a fully intact mission building. El Camino Real routes, local settlement and museum interpretation help explain the mission’s purpose and consequences."
  ],
  "monument-hill": [
    "Monument Hill memorializes people who died in the Dawson Massacre and the later Black Bean Episode associated with the Mier Expedition. These events belong to the Republic of Texas era and cannot be understood only through the earlier 1836 Revolution.",
    "The adjacent Kreische Brewery introduces a very different nineteenth-century story about German settlement and enterprise. Visitors should compare the site's memorial design with the brewery ruins and Colorado River overlook, understanding that their historic meanings developed at different times."
  ],
  "national-museum-pacific-war": [
    "Fredericksburg’s National Museum of the Pacific War connects Chester Nimitz’s hometown with the broader Pacific Theater, a vast conflict involving many nations, islands, armed forces and civilian populations. The museum is larger in scope than a local Nimitz biography.",
    "A meaningful visit should give the major galleries, outdoor interpretation and special exhibitions adequate time. It is sensible to choose a focused exhibit path rather than promise to see every collection in a short afternoon. Verify separate ticketing and access for any special programs."
  ],
  "official-texas-longhorn-herd": [
    "The State Longhorn Herd is living evidence of a breed deeply tied to Texas cattle-trail mythology, livestock management and the post-Civil War ranch economy. That story includes selective preservation and changing cattle markets, not merely a scenic herd of animals.",
    "The herd occupies the wider Fort Griffin site, where ruins and grazing land can be interpreted together. Visitor expectations should depend on animal location, weather and operator guidance; seeing individual animals from a particular spot should never be promised."
  ],
  "old-socorro-mission": [
    "The early Socorro mission site represents the displacement and resettlement of Piro, Tano and Jemez Pueblo communities after the Pueblo Revolt of 1680. The Franciscans founded the Socorro mission on October 13, 1680; the location of its first church is unknown. By 1684 a temporary chapel occupied this protected early site, and a permanent adobe church followed in 1691.",
    "Floods and changes in the Rio Grande altered the early mission landscape. The 1829 flood preceded construction of the presently operating Socorro Mission about half a mile northwest in the 1840s. The older archaeological location is closed to the public: do not confuse it with the active later church or plan an entrance to the protected original site."
  ],
  "palmito-ranch-battlefield": [
    "Palmito Ranch was the site of a May 1865 engagement along the lower Rio Grande after major Confederate armies elsewhere had surrendered. Its chronology illustrates how news, authority, border trade and military operations unfolded unevenly as the Civil War ended.",
    "The battlefield is not a densely built visitor complex. Use maps and a researched history of the Rio Grande corridor to understand why fighting occurred here, then compare nearby Brownsville and Palo Alto to distinguish the Civil War from the earlier U.S.–Mexican War."
  ],
  "port-isabel-lighthouse": [
    "The Port Isabel lighthouse makes the maritime history of the lower Laguna Madre physically visible. Its nineteenth-century function was tied to Gulf navigation and the channels through which shipping, trade and military supplies reached the Rio Grande region.",
    "For a visit, distinguish the lighthouse as a historical structure from present-day waterfront tourism. Verify current climbing access and weather restrictions rather than assuming the observation level is open whenever the grounds are accessible."
  ],
  "sabine-pass-battleground": [
    "The September 1863 battle near Sabine Pass is best understood through waterways, artillery range and the strategic importance of a navigable Gulf entrance. The landscape records an attempted Union operation and Confederate defense in a coastal theater often overlooked in standard Civil War itineraries.",
    "Visitors should use interpretive maps to reconstruct the shoreline and channels, many of which have changed with later industrial development. Pairing the battlefield with Gulf Coast port history produces a more accurate account than treating it as an isolated military victory."
  ],
  "sam-bell-maxey-house": [
    "The Maxey family house connects the Civil War, Reconstruction and the changes in domestic life that followed in Northeast Texas. Sam Bell Maxey’s public career belongs in context with the family members and household workers who occupied the property.",
    "Period furnishings, rooms and family objects let visitors ask how social roles and material technology changed across generations. This is a historic-home tour, not a battlefield visit, and access to individual rooms may depend on current preservation conditions."
  ],
  "sam-rayburn-house": [
    "Sam Rayburn’s North Texas home makes the contrast between congressional leadership in Washington and private life in Bonham unusually apparent. His national political power did not erase the importance of his local base and the household he maintained.",
    "Rather than simply inventorying furniture, follow the objects and spaces that reveal how Rayburn worked, entertained or maintained ties to his community. A nearby Bonham visit adds local context; official tour arrangements are still the authority on access."
  ],
  "san-felipe-de-austin": [
    "San Felipe de Austin functioned as the headquarters of Stephen F. Austin’s colony and an early commercial and political center under Mexican rule. Its importance comes from the colonial institutions, land transactions and community networks that preceded the Revolution.",
    "Because the original townscape changed so substantially, historical interpretation and reconstructed geography are essential. Read the museum and site map before going outdoors, then follow a Revolution route toward Washington-on-the-Brazos as a distinct later political chapter."
  ],
  "slaton-harvey-house": [
    "Slaton’s Harvey House is part of a network that connected Santa Fe Railway passengers with organized hospitality across the Southwest. The restored building and its Mission Revival design can explain the work of dining-room and railway staff as well as the travel experience of passengers.",
    "The building’s original railway context matters as much as its architecture: the trains, schedules and services made this type of hospitality possible. Check present-day public access separately from any private functions or accommodations at the building."
  ],
  "star-of-the-republic-museum": [
    "The Star of the Republic Museum interprets the culture, institutions and material life of the Republic that existed after the 1836 Declaration of Independence. Artifacts create a different historical encounter from the adjacent convention-site landscape.",
    "The museum is part of the broader Washington-on-the-Brazos complex but has its own operating arrangements. A meaningful visit pairs museum interpretation with the nearby townsite and Barrington living-history farm while allowing time for each to answer different historical questions."
  ],
  "starr-family-home": [
    "The Starr Family Home follows multiple generations of one Marshall family through changes in civic life, wealth, dress and domestic technology. This kind of household collection can reveal East Texas political and social history at a scale that a courthouse monument cannot.",
    "Compare different rooms and decades instead of assuming the home reflects a single frozen year. Marshall’s historic district offers a complementary public setting for understanding the family’s wider local influence."
  ],
  "stephen-f-austin-memorial": [
    "The Stephen F. Austin memorial marks a place associated with Austin’s final days in December 1836, after the Revolution but early in the Republic. Its significance should not be confused with the later state government in Austin or with San Felipe’s original colonial headquarters.",
    "Because the memorial is a small commemorative stop, its greatest value comes from a historically ordered Brazoria County route. The First Capitol and plantation landscapes show political independence alongside its social and economic consequences."
  ],
  "varner-hogg-plantation": [
    "Varner-Hogg preserves a layered Brazoria County history that moves from plantation agriculture and slavery into emancipation, later commercial farming and oil-era wealth. A guide should identify which periods and people each surviving feature represents rather than treating the property as one unchanging household.",
    "Workers and their descendants are essential to the story, not a sidebar to the wealthy families associated with the property. Compare archaeological evidence and interpretive themes here with Levi Jordan Plantation for a broader view of the Lower Brazos."
  ],
  "zaragoza-birthplace": [
    "Ignacio Zaragoza’s association with the Goliad area links Texas borderlands history to nineteenth-century Mexico. His military leadership at Puebla in 1862 is remembered through Cinco de Mayo; that commemoration is not Mexico’s Independence Day.",
    "The birthplace should be interpreted as a Texas–Mexico historical bridge rather than another 1836 battlefield. A Goliad itinerary can pair the site with Presidio La Bahía and the mission, separating their centuries and political contexts."
  ],
  "fort-sam-houston-national-cemetery": [
    "Fort Sam Houston National Cemetery is an active burial ground and memorial landscape tied to San Antonio’s long military history. Historical interpretation should be grounded in named service members, unit histories and the evolving national cemetery system.",
    "Any visit must respect graveside services, visiting families and cemetery regulations. The VA’s official page controls hours, ceremony arrangements and grave-locator information. Memorial tourism should never interrupt a burial or treat the grounds as a recreational attraction."
  ],
  "houston-national-cemetery": [
    "Houston National Cemetery illustrates the postwar expansion of the national cemetery system in a metropolitan region. Its formal layout, memorial architecture and veterans’ graves are a public record of service and remembrance across generations.",
    "Visitors should use VA guidance for respectful visitation and locating a grave. Memorial Day and other ceremonies can affect access; grave sections and services are not locations for casual photography or commercial tourism activities."
  ],
  "dallas-fort-worth-national-cemetery": [
    "Dallas–Fort Worth National Cemetery is a modern VA burial and remembrance landscape serving North Texas veterans. Its setting by Mountain Creek Lake offers a different scale and planning history from nineteenth-century military cemeteries.",
    "Respectful visitation must take precedence over tourism. Check the National Cemetery Administration for grave search, office hours and ceremony guidance; never assume a public tour or unobstructed access during committal services."
  ]
};

export const researchedHistoricSiteDepthSlugs = Object.keys(SITE_DEPTH);

// Operator-verified access details from THC's October 2026 site and visit pages.
// These are not generic template claims and must be refreshed on source change.
const VERIFIED_VISIT_NOTES: Record<string, {entryNote:string;researchNote:string;accessibilityNotes?:string}> = {
  "fulton-mansion": {
    "entryNote": "THC lists Fulton Mansion public admission Tuesday–Saturday 10 a.m.–4 p.m. and Sunday 1–4 p.m.; last ticket 3:15 p.m. Current admission: adults $7, senior/veteran/teacher/first-responder $6, ages 6–17 $4, ages 5 and under free, family ticket $14 for 2 adults and 1 child (each additional child $1). Public self-guided visits are walk-in only, with no advance reservation; group tours require separate planning. Confirm current fees before travel.",
    "researchNote": "Begin at Fulton Mansion's Education and History Center before its 1877 Victorian villa and gardens. The public 'Splendor on the Shore' visit takes roughly 45 minutes and explores George Fulton's engineering, gas lighting, indoor plumbing, coastal ranching wealth and the family household. Special school and adult group tours have distinct formats and fees; THC asks that group tour reservations be made at least two weeks in advance rather than confusing them with individual walk-ins.",
    "accessibilityNotes": "THC warns of limited access in the historic mansion: a wheelchair lift or a few steps reach the first floor, a full flight of stairs is required for the second floor, and the basement has steps. Staff can provide a notebook of images and information about inaccessible rooms. Contact the site in advance to confirm lift availability and individual accessibility requirements."
  },
  "goodnight-ranch": {
  "entryNote": "THC currently opens Goodnight Ranch Tuesday–Saturday 10 a.m.–5 p.m.; guided house tours are scheduled at 11 a.m., 1 p.m. and 3 p.m. Verify availability, especially for groups.",
  "researchNote": "Charles and Mary Ann Goodnight's restored Victorian home dates to 1887, reflecting a later ranching venture after the 1876 JA Ranch founding. The THC museum connects cattle entrepreneurship with Mary Ann's bison preservation efforts; visitors may see descendants of the original herd, but sightings are not guaranteed.",
  "accessibilityNotes": "The visitor center, grounds and first floor of the Goodnight house are accessible via paved or compacted pathways, but THC says there is NO elevator to the upper floor; confirm what a limited-mobility visitor can see."
},
  "french-legation": {
  "entryNote": "THC currently opens the French Legation Tuesday–Saturday, grounds 9 a.m.–5 p.m., museum 11 a.m.–4:30 p.m. with last museum admission at 4:15 p.m. Paid house admission and separate school/group arrangements apply.",
  "researchNote": "France's 1839 recognition of the Republic of Texas gives this 1841 Austin house diplomatic significance, but the former chargé d'affaires home also reveals changing urban neighborhoods and household labor. Visitors should distinguish the original house from the reconstructed detached kitchen and use the current admissions policy for interior visits.",
  "accessibilityNotes": "Visitor parking is at 900 East 9th Street; consult THC for house, grounds and historic-room accessibility before planning stairs or wheelchair access."
},
  "fannin-battleground": {
  "entryNote": "THC currently opens Fannin Battleground daily 8 a.m.–5 p.m., with free self-guided visits of roughly 30 minutes. The operator lists wheelchair-accessible grounds and restrooms but NO visitor center; guided group tours have separate reservations.",
  "researchNote": "The March 1836 Battle of Coleto and James Fannin's surrender preceded the execution of prisoners at Goliad, a distinct site about 10 miles west. A stone monument and interpretive display preserve the memory of the battlefield, while separate guided group programs explain the geography of the surrender.",
  "accessibilityNotes": "THC states all areas at Fannin Battleground are wheelchair accessible, with parking and restrooms near the pavilion; there is no staffed visitor center or gift shop."
},
  "kreische-brewery": {
  "entryNote": "THC currently lists Kreische Brewery grounds open daily 8 a.m.–4:30 p.m. and visitor center 9 a.m.–4:30 p.m. Guided house/bluff programs and the 0.75-mile brewery-ruins walk have particular schedules; check tour times before traveling.",
  "researchNote": "Heinrich Kreische began commercial beer production in the 1860s using a bluffside spring. Today's site preserves ruins, a three-story historic family house, memorial interpretation of the Dawson and Mier conflicts at adjacent Monument Hill, and overlooks of the Colorado River. The scheduled brewery walk descends difficult slopes and historic stone stairs; it is not equivalent to the accessible visitor center.",
  "accessibilityNotes": "THC says the visitor center and Historic and Scenic Bluff Trail are wheelchair accessible, including accessible parking/restrooms, but the separate brewery-ruins tour follows steep slopes and historic steps and is not an accessible substitute."
},
  "confederate-reunion-grounds": {
  "entryNote": "Free admission. THC's current site overview lists Wednesday–Sunday 8 a.m.–5 p.m., but its separate tour-planning page still says daily opening; confirm operating days by phone before a long drive to Mexia.",
  "researchNote": "The site is a 76-acre gathering landscape on the Navasota River with archaeological evidence of Indigenous/earlier camps, later reunions of Confederate veterans and their families from the 1880s to the 1940s, and remains tied to the Mexia oil boom. The 1902 dance pavilion and Confederate-era cannon represent later public memory and material history, not evidence of a Civil War battlefield at this spot.",
  "accessibilityNotes": "THC identifies accessible restrooms and a wheelchair-accessible 1902 pavilion, paved interior roads, and parking near major features; the longer 0.8-mile and 0.35-mile trails and wooded grounds may have different walking surfaces."
},
  "barrington-living-history-farm": {
  "entryNote": "Part of the Washington-on-the-Brazos complex: Barrington Farm currently opens Wednesday–Sunday 10 a.m.–4:30 p.m. with tickets required. The visitor center and grounds may open Monday–Tuesday, but the farm itself is closed those days.",
  "researchNote": "Barrington preserves the original home of Dr. Anson Jones, the final president of the Republic of Texas. The Jones family's cotton operation depended on enslaved people; living-history demonstrations must acknowledge their work as well as the Jones family and agricultural technologies."
},
  "fort-mckavett": {
  "entryNote": "Source-checked October 17, 2026: THC lists the site open daily 8 a.m.–5 p.m.; the 1–2-hour self-guided tour is available 8 a.m.–4 p.m. (walk-ins, no advance booking). General admission: adults $5, seniors/veterans/teachers/first responders $3, children 6–17 $2, children 5 and under free; family admission $8 for two adults and one child, plus $1 for each additional child. Reserved group and school tours have separate schedules and charges. Check the official operator page for changes before traveling.",
  "accessibilityNotes": "Most of Fort McKavett's outdoor historic grounds are NOT wheelchair accessible. The Visitor Center, Museum and Gift Shop are wheelchair accessible. THC lists $5 golf-cart rentals (rental contract required) for access to several outdoor areas, but not the entire property; call 325-396-2358 to discuss access needs before traveling.",
  "researchNote": "The 1874 hospital now houses the visitor center. Use a self-guided route through the soldiers' barracks, officers' quarters, headquarters and schoolhouse; the lime kiln, quarry and Government Springs involve additional walking. Soldiers from all four Buffalo Soldier regiments served at the fort. Interpret the laundresses, officers' families and nearby Comanche history alongside the post's military supply role, rather than treating the frontier as unoccupied land."
},
  "fort-lancaster": {
  "entryNote": "THC currently opens Fort Lancaster Tuesday–Saturday 9 a.m.–5 p.m. Budget an hour for the visitor center and scattered fort ruins. Guided battlefield tours and school programs are scheduled separately.",
  "accessibilityNotes": "THC states the gravel grounds are not ADA-approved wheelchair routes, although portions can be negotiated by some wheelchair users. A limited first-come golf cart may be available; discuss accessibility with site staff.",
  "researchNote": "The approximately 82-acre Fort Lancaster and Battlefield preserves ruins of more than 30 historic post structures beside the San Antonio–El Paso Road. Army camel experiments, the Civil War and the 1867 fight involving Buffalo Soldiers and Native American forces are distinct chapters best understood through the remaining landscape."
},
  "mission-dolores": {
  "entryNote": "THC lists Mission Dolores open Tuesday–Saturday 8 a.m.–5 p.m., with admission fees. The Spanish mission has NO surviving aboveground colonial architecture; visit the museum, landscape and El Camino Real trails instead. Camping requires separate planning.",
  "researchNote": "Founded among the Ais in 1721, Mission Dolores was later abandoned and its exact location rediscovered archaeologically during twentieth-century excavations. Highway construction removed or disturbed surface remains; postholes, wells, artifacts and wall remnants inform modern interpretation. The THC also lists 32 campsites, picnicking and disc golf here.",
  "accessibilityNotes": "Check the operator for current museum access, trail surfaces and separate camping accommodations. No original standing colonial mission building exists to tour."
},
  "acton-state-historic-site": {
  "entryNote": "THC lists the cemetery memorial at Acton near Granbury open daily 9 a.m.–5 p.m., with free admission. It is a respectful outdoor graveside memorial, not a staffed museum.",
  "researchNote": "The Acton memorial marks the burial of Elizabeth Patton Crockett, second wife of David Crockett, who died in 1860. The commemorative statue was erected later, so it is a public-memory monument rather than a contemporary portrait. Visitors should respect other graves and cemetery rules."
},
  "old-socorro-mission": {
    "entryNote": "CLOSED TO THE PUBLIC: THC lists no visitor services or facilities at the Old Socorro Mission archaeological site. Do not confuse it with the separately operating present-day Socorro Mission or enter the protected original site.",
    "researchNote": "The Texas Historical Commission dates founding of the Socorro mission to October 13, 1680, while explicitly noting that the first mission location is unknown. A temporary church stood at the protected early site by 1684, and a permanent adobe church was built there in 1691; Pueblo residences stood nearby. A flood in 1829 preceded relocation of the modern Socorro Mission in the 1840s. The early state archaeological site is closed to visitors."
  },
  "caddo-mounds-state-historic-site": {
    "entryNote": "THC currently lists Tuesday–Sunday 8:30 a.m.–4:30 p.m., closed Mondays, with paid admission. Museum, 0.7-mile Mound Trail and other routes have different accessibility conditions; follow the site's posted sacred-mound rules.",
    "accessibilityNotes": "THC says the museum is fully accessible. The Mound Trail and part of El Camino Real Trail #1 have granite-covered sections generally accessible for most wheelchairs and strollers. Other trails have steep grades, steps or dirt/grass surfaces and are not considered accessible; check current site guidance.",
    "researchNote": "Today the landscape includes three earthen mounds sacred to the Caddo people, a reconstructed grass house, an interpretive museum, a 0.7-mile self-guided Mound Trail and longer nature trails. The village and ceremonial center originated around A.D. 800. The experience should respect ongoing Caddo cultural identity rather than treating the community only as archaeology."
  },
  "fanthorp-inn": {
    "entryNote": "THC currently lists free public visits Friday–Sunday, 10 a.m.–4:30 p.m. Self-guided interpretation covers the 17-room inn; school and adult group programs require separate arrangements. Do not assume a stagecoach event runs daily.",
    "researchNote": "Henry Fanthorp built a two-room cedar log dogtrot cabin in Anderson in 1834, and the property expanded to a 17-room hotel by about 1850. He became the town's postmaster in 1835. Today's free public visit differs from the reservable school and adult group programs; the operator asks for group-tour reservations weeks in advance."
  },
  "landmark-inn": {
    "entryNote": "THC currently lists daytime hours daily 9 a.m.–4:30 p.m., with guided-tour opportunities on a different Wednesday–Saturday schedule. Eight historic guest rooms are available only through separate advance lodging reservations; the operator generally cannot accept same-day reservations.",
    "accessibilityNotes": "THC states that much of the grounds have at-grade access, but historic steps and natural pathways may pose barriers. For lodging, the operator identifies rooms 1, 7 and 8 as the at-grade-access rooms; confirm individual room and bathroom requirements directly before booking.",
    "researchNote": "Landmark Inn is both a Castroville historic site and a limited-capacity lodging property; a general admission ticket does not reserve a guest room. THC lists eight guest rooms and four suite combinations, and requires lodging reservations at least two days in advance. The site interprets Alsatian settlement, Medina River industry and successive hospitality uses."
  },
  "fort-griffin": {
    "entryNote": "THC currently lists Fort Griffin open daily 8 a.m.–4:30 p.m. Day admission covers the historic fort and visitor landscape; guided programs have separate schedules, and overnight camping at the 33-site campground is a separate planning decision. Check current availability.",
    "researchNote": "Visitors can see surviving fort ruins, the visitor-center exhibits and the nearby Official State of Texas Longhorn Herd. The operator lists 33 overnight campsites, outdoor walking and stargazing, with some guided interpretation taking one to two hours. Herd viewing is subject to animal-management conditions and cannot be promised at every visit."
  }
};


export function enrichResearchedHistoricSiteDepth(destination: Destination): Destination {
  const extra = SITE_DEPTH[destination.slug] ?? [];
  const verified = VERIFIED_VISIT_NOTES[destination.slug];
  if ((!extra.length && !verified) || destination.category !== "historic-sites") return destination;
  const additions = extra.filter((item) => !destination.body.includes(item));
  if (destination.slug === "old-socorro-mission" && verified) {
    const outdatedDescriptions = [
      "What stands out at Old Socorro Mission",
      "Check current opening hours, tour schedules",
      "The congregation and ongoing religious use",
      "Plan this as a respectful religious-site visit",
      "Some historic properties have limited days",
    ];
    return {
      ...destination,
      body: [
        ...destination.body.filter((paragraph) => !outdatedDescriptions.some((phrase) => paragraph.includes(phrase))),
        ...additions,
        verified.researchNote,
      ].filter((line, index, all) => all.indexOf(line) === index),
      entryNote: verified.entryNote,
      bestSeason: "Original archaeological site closed to the public; consult separately operated, public Mission Trail destinations.",
      sourceCheckedAt: "2026-10-12",
    };
  }

  if (destination.slug === "first-capitol-of-texas") {
    return {
      ...destination,
      bestSeason: "Not currently open to visitors. There is no public visiting season until the Texas Historical Commission announces access.",
      body: [
        ...destination.body,
        ...additions,
        "The Texas Historical Commission currently lists the First Capitol of Texas State Historic Site as Not Open, with tickets marked N/A. Although West Columbia is the former capital of the Republic and a replica structure is part of the property, the state site itself is undergoing development. The 1976–77 replica is not an original 1836 capitol building. Use the THC's live operator page, not older tourism listings, to determine when access is possible.",
      ],
      entryNote: "NOT OPEN: The Texas Historical Commission lists the First Capitol State Historic Site as Coming Soon, with hours Not Open and tickets N/A. Do not arrive expecting an interior visit or guided tour.",
      sourceCheckedAt: "2026-10-12",
    };
  }
  if (destination.slug === "lipantitlan") {
    return {
      ...destination,
      body: [...destination.body, ...additions],
      entryNote: "Free admission. Texas Historical Commission lists daily hours of 9 a.m.–5 p.m.; the outdoor site has a historical marker and no visitor services or on-site exhibits. Confirm current access before traveling.",
      sourceCheckedAt: "2026-10-12",
    };
  }
  if (verified) {
    return {
      ...destination,
      ...(destination.slug === "old-socorro-mission" ? {
        bestSeason: "Closed archaeological site: there is no public visiting season. Research the separately operated present-day Socorro Mission for a permitted visit.",
      } : {}),
      body: [...destination.body, ...additions, verified.researchNote].filter((line, index, all) => all.indexOf(line) === index),
      entryNote: verified.entryNote,
      ...(verified.accessibilityNotes ? { accessibilityNotes: verified.accessibilityNotes } : {}),
      ...(destination.slug === "fort-mckavett" ? {
        address: "7066 FM 864, Fort McKavett, TX 76841",
        directions: "Remote Menard County location at 7066 FM 864. Plan fuel and water before traveling; check current highway routing and contact the historic site directly about mobility assistance.",
      } : {}),
      sourceCheckedAt: destination.slug === "fort-mckavett" ? "2026-10-17" : destination.slug === "fulton-mansion" ? "2026-10-14" : "2026-10-12",
    };
  }
  return additions.length ? { ...destination, body: [...destination.body, ...additions] } : destination;
}
