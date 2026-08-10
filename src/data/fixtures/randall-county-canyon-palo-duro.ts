import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const randallCountyCanyonPaloDuroArticle: Article = {
  id: "county-randall-canyon-palo-duro",
  brandId: "texasdefined",
  slug: "randall-county-canyon-palo-duro-texas",
  title: "Randall County: Canyon, Palo Duro and the Edge of the High Plains",
  dek: "Randall County is where the level Llano Estacado suddenly falls away into Palo Duro Canyon, where cattle trails became college streets, and where a Panhandle county seat grew beside one of Texas' most dramatic landscapes.",
  category: "texas-history",
  region: "panhandle",
  hero: {
    src: "/images/state-parks/palo-duro-canyon-state-park.jpg",
    alt: "Layered red and orange cliffs inside Palo Duro Canyon State Park in Randall County, Texas",
    width: 1600,
    height: 900,
    credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
  },
  authorId: "a-hollis",
  publishedAt: "2026-08-10",
  readingMinutes: 10,
  tags: ["Randall County", "Canyon", "Palo Duro Canyon", "Palo Duro Canyon State Park", "West Texas A&M", "Panhandle-Plains Historical Museum", "JA Ranch", "T Anchor Ranch", "Texas counties", "Texas Panhandle", "Texas history"],
  featured: false,
  internalLinks: [
    { href: "/destination/palo-duro-canyon-state-park", label: "Explore Palo Duro Canyon State Park", description: "Plan a deeper look at the canyon that defines Randall County's eastern edge." },
    { href: "/browse/counties", label: "Browse all 254 Texas counties", description: "Explore Texas one county at a time." },
    { href: "/article/why-texas-has-254-counties", label: "Why Texas has 254 counties", description: "How distance and local government shaped the Texas county map." },
    { href: "/texas-history", label: "More Texas history", description: "Stories that explain the people and places behind modern Texas." },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("Randall County can look almost impossibly level until the land suddenly drops away. West and south of Amarillo, the Llano Estacado stretches in broad agricultural plains cut by roads, center-pivot fields and growing suburbs. Then, east of Canyon, the Prairie Dog Town Fork of the Red River has carved through those plains to expose the layered walls of Palo Duro Canyon. The contrast explains the county better than any boundary line: tabletop country above, canyon country below, and a county seat built where the two landscapes meet."),
    p("The county covers about 922 square miles in the central Texas Panhandle. The 2020 census counted 140,753 residents, and the Census Bureau estimated 152,351 in 2025. Much of that population lives in Canyon, the southern part of Amarillo, and fast-growing residential areas between the two. The rest of the county remains a mix of ranchland, farms, wildlife habitat and the broken country around Palo Duro."),

    h("The county name contains a 150-year-old spelling error"),
    p("Texas created Randall County in 1876 from the vast territory that had once been attached to Bexar County. The intended namesake was Horace Randal, a Confederate brigadier general killed at the Battle of Jenkins' Ferry in Arkansas in 1864. Somewhere in the process of naming the new county, an extra letter was added. Randal became Randall, and the clerical error became permanent."),
    p("At the time, county government was mostly an idea on a map. Permanent Anglo settlement had barely begun. The Panhandle's bison herds had been devastated, the Red River War was ending, and ranchers were beginning to occupy land that had long been used by Indigenous peoples, especially Comanche, Kiowa and other Plains communities."),

    h("Palo Duro was home long before it was a park"),
    p("Texas Parks and Wildlife traces human use of Palo Duro Canyon back roughly 12,000 years. Clovis and Folsom peoples hunted large game here, and later Apache, Comanche and Kiowa communities used the canyon's water, shelter, plants and game. Rock art, grinding surfaces and other archaeological evidence show that the canyon was not an empty wilderness waiting for settlement. It was a place people understood and depended on for thousands of years."),
    p("The canyon's name is Spanish. Palo Duro means 'hard wood,' a reference to the woody plants found in the canyon. Geologically, the feature is much older than its name. The headwaters of the Prairie Dog Town Fork of the Red River and weathering have cut through the eastern edge of the High Plains for roughly a million years, exposing bands of rock that represent more than 200 million years of geologic history."),
    p("The canyon begins in Randall County and extends southeast through Armstrong County and beyond. Its walls can rise hundreds of feet above the floor, with layers of red, orange, brown, yellow, gray and white rock creating the visual identity most Texans associate with the Panhandle. From the rim, the transition from flat prairie to canyon can happen in a few minutes of driving."),

    h("The Battle of Palo Duro Canyon changed the Panhandle"),
    p("On September 28, 1874, during the Red River War, Colonel Ranald S. Mackenzie and the 4th U.S. Cavalry attacked a large encampment of Comanche, Kiowa and Cheyenne people in Palo Duro Canyon. Families escaped the immediate assault, but the soldiers captured roughly 1,400 horses, destroyed lodges and winter supplies, and killed most of the captured animals."),
    p("The consequences were severe. Without horses, food stores and shelter, many Native families could not remain on the plains through winter. The battle helped force the remaining southern Plains tribes onto reservations and opened the Panhandle to a rapid expansion of ranching. Any account of Randall County that jumps directly from 'empty plains' to cattle country misses that transition."),

    h("Charles Goodnight brought cattle into the canyon two years later"),
    p("In 1876, Charles Goodnight drove about 1,600 Longhorns into Palo Duro Canyon and established the first headquarters of the JA Ranch. The canyon supplied water, shelter and winter protection that the exposed plains could not. Goodnight and his partner John Adair formally established the JA Ranch in 1877, and the operation eventually spread across more than a million acres of the Panhandle."),
    p("The JA was not the only giant ranch shaping the county. Leigh R. Dyer established a ranch headquarters near the meeting of Palo Duro and Tierra Blanca creeks in 1877. He later sold to Gunter, Munson and Summerfield, whose operation became the T Anchor Ranch. The old T Anchor headquarters is one of the most important surviving structures from the Panhandle's open-range era and is now preserved in Canyon."),
    p("Those ranches imposed a new geography on Randall County. Water sources, grazing blocks, fences, shipping routes and ranch headquarters became the organizing features of the landscape. The next major shift would come from the railroad and the town that became Canyon."),

    h("Canyon began with a dugout and a county-seat election"),
    p("Lincoln Guy Conner settled near the future townsite in December 1887 and surveyed a town in 1889. His dugout served as a home, store and post office. When Randall County formally organized in July 1889, Canyon City was chosen as the county seat. The first courthouse was a simple temporary frame building that also hosted church services and community gatherings."),
    p("The name came from nearby Palo Duro Canyon rather than from a founder. As the town grew, freight initially arrived by wagon before rail connections improved access. Canyon developed as the governmental and commercial center for the surrounding ranch and farm country, and its identity became increasingly tied to education."),

    h("A college changed Canyon's scale and purpose"),
    p("West Texas State Normal College opened in Canyon in 1910. It later became West Texas State Teachers College, West Texas State University and finally West Texas A&M University. The campus gave Randall County an institution whose influence reached far beyond the courthouse square. Teachers, students, researchers, performances, athletics and museums all made Canyon more than a ranch-service town."),
    p("The university remains one of the county's defining institutions. It anchors employment, cultural life and population growth in Canyon while connecting the city to the broader Amarillo metropolitan area. The campus also helps explain why Randall County has a different rhythm from many rural Panhandle counties: agricultural and ranching traditions remain visible, but higher education is equally central to local identity."),

    h("The Panhandle-Plains Historical Museum keeps the region's memory in Canyon"),
    p("On the West Texas A&M campus, the Panhandle-Plains Historical Museum serves as one of the state's major regional museums. Its collections interpret archaeology, Indigenous history, ranching, petroleum, transportation, art and everyday life across the Texas Panhandle and surrounding plains. For a county series, the museum matters because Randall County is not merely a place where history happened; it became one of the places where Panhandle history is collected and explained."),
    p("The museum's location in Canyon also reflects the city's educational role. Ranch buildings, wagons, firearms, oil equipment, art and archaeological material that once would have been scattered across a vast region are gathered into a single institution within a few miles of the canyon itself."),

    h("The New Deal turned part of Palo Duro into a state park"),
    p("Texas acquired land for Palo Duro Canyon State Park in 1933. Civilian Conservation Corps crews arrived soon afterward and spent years building the roads, trails, cabins and structures that made the canyon accessible to the public. The park opened in 1934 while work was still underway."),
    p("The CCC's most consequential achievement was physical access. Workers carved a winding road from the rim to the canyon floor, built trails and constructed El Coronado Lodge, now used as the visitor center. They used local stone and wood and followed the rustic design principles common to New Deal parks, creating structures intended to sit naturally within the landscape rather than overpower it."),
    p("Today Palo Duro Canyon State Park protects about 28,000 acres and is one of the largest and most recognizable parks in the Texas system. Hiking, camping, mountain biking, horseback riding and scenic drives draw visitors into a landscape that earlier generations knew as hunting ground, refuge, ranch country and battlefield."),

    h("The outdoor musical Texas turned the canyon into a stage"),
    p("Since the 1960s, the outdoor musical Texas has used the canyon walls as scenery. Performances in the Pioneer Amphitheatre transformed Palo Duro into one of the state's best-known summer theater settings. The production mixes frontier themes, music and spectacle, but the larger effect is cultural: generations of visitors have come to associate Randall County with the experience of sitting under a Panhandle sky while the canyon becomes part of the stage."),
    p("That tourism economy matters to Canyon. Hotels, restaurants, shops, museums and university events all benefit from the steady flow of people headed toward the park. Randall County's economy is not based on tourism alone, but Palo Duro gives the county a statewide identity few Panhandle counties can match."),

    h("Buffalo Lake preserves a different kind of Panhandle landscape"),
    p("In the southwestern part of Randall County, Buffalo Lake National Wildlife Refuge protects shortgrass prairie, playa and riparian habitat. Established in 1939, the refuge adds another layer to the county's public lands. Palo Duro is dramatic and vertical; Buffalo Lake is quieter and more representative of the open plains that surround it."),
    p("Together, the refuge and the state park show why the county's natural history cannot be reduced to the canyon alone. Water, grasslands, seasonal wetlands, creeks and breaks supported wildlife and human movement long before modern settlement, and those systems still shape the county outside its growing cities."),

    h("Randall County is now partly metropolitan"),
    p("Modern Randall County includes a substantial portion of southern Amarillo as well as Canyon and smaller communities such as Lake Tanglewood and Timbercreek Canyon. Interstate 27 links Canyon directly to Amarillo and Lubbock, while U.S. Highway 60 and farm-to-market roads connect the county to agricultural areas across the Panhandle."),
    p("That location has fueled growth. The Census Bureau counted 140,753 residents in 2020 and estimated 152,351 in 2025, an increase of more than eight percent from the 2020 estimates base. New subdivisions, schools and commercial development continue to fill the corridor between Canyon and Amarillo."),
    p("Agriculture remains visible across the county, but the economic base now also includes education, health care, retail, construction, public administration and businesses tied to the Amarillo metro. Randall County has become a place where suburban growth and Panhandle ranch geography meet within a short drive."),

    h("A few Randall County facts worth remembering"),
    list(
      "Randall County was created in 1876 and organized in 1889.",
      "The county was intended to honor Confederate general Horace Randal; the extra 'l' in Randall came from a clerical error.",
      "Palo Duro Canyon begins in Randall County and was used by people for thousands of years before European settlement.",
      "The Battle of Palo Duro Canyon on September 28, 1874 was a decisive event in the Red River War.",
      "Charles Goodnight brought cattle into Palo Duro Canyon in 1876 and helped establish the JA Ranch the following year.",
      "Canyon became the county seat when Randall County organized in 1889.",
      "West Texas State Normal College opened in Canyon in 1910 and evolved into West Texas A&M University.",
      "Texas acquired land for Palo Duro Canyon State Park in 1933, and CCC crews built many of the park's original roads, trails and structures.",
      "The 2020 census counted 140,753 residents in Randall County; the Census Bureau estimated 152,351 in 2025.",
    ),

    h("Why Randall County belongs in the county series"),
    p("Randall County explains the Texas Panhandle through contrast. The flat High Plains become a canyon. Indigenous homeland becomes military battlefield and then cattle country. A dugout town becomes a county seat and university community. New Deal crews turn ranchland into one of Texas' signature state parks. Amarillo's suburbs push south while ranch and farm roads continue only a few miles away."),
    p("The county is also a reminder that landscapes can hold several histories at once. Palo Duro is geology, archaeological record, Native homeland, battlefield, ranch shelter, public park and theater backdrop. Canyon is a courthouse town, a college town, a museum town and a gateway to that landscape."),
    p("Stand on the rim at Palo Duro and the county's story is visible in one view: the level plains behind you, the broken canyon below, ranch history in the distance and a modern city corridor only a short drive away. Randall County is not simply the place around Palo Duro Canyon. It is the meeting point between the Panhandle's most famous natural feature and the communities that grew around it."),
  ],
};