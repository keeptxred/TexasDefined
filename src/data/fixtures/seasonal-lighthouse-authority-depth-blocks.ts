import type { Article, ArticleBlock } from "../types";

const h = (text: string): ArticleBlock => ({ type: "heading", text });
const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

// These are body fragments, not standalone Articles. The canonical lighthouse
// Article records remain seasonal-authority-articles.ts; this module adds
// researched depth without creating a competing article source or resolver.
export const seasonalLighthouseAuthorityDepthBlocks: Record<string, ArticleBlock[]> = {
  "texas-lighthouses-complete-guide": [
    h("Why the Texas coast needed a network of lights"),
    p("Texas does not have the cliff-lined coastline people often associate with classic lighthouse scenery. Its navigation problem was almost the opposite: a low, shallow coast broken by barrier islands, shifting passes, reefs and bays. A vessel approaching from the Gulf could be close to land and still have difficulty identifying the correct entrance. Nineteenth-century lights were therefore placed where mariners needed help distinguishing a pass, clearing a shoal or lining up with a working harbor."),
    p("The Texas Historical Commission says sixteen lighthouses were built along the Texas coast. They did not all look alike because they were not solving the same problem. Some were tall shore towers visible from the Gulf. Others stood in bays or on reefs where a lower light could warn ships away from a hazard. Still others became obsolete when dredging, jetties and new shipping channels changed the route vessels actually used."),
    h("Port Isabel is the clearest public lighthouse experience"),
    p("Port Isabel matters because the historic tower, its maritime setting and public access all survive together. Congress funded a light at Point Isabel as shipping through Brazos Santiago Pass increased, and the brick tower was completed and first lighted in 1853. The tower later served as an observation point during the Civil War, returned to service after repairs, and was permanently discontinued in 1905 after maritime traffic patterns changed."),
    p("Today the Texas Historical Commission identifies Port Isabel as the only Texas lighthouse open to the public. The climb is physical rather than symbolic: current site information describes 75 winding stairs and three short ladders, with access dependent on weather. A reproduction third-order Fresnel lens installed in 2022 is illuminated at night, but the Commission is explicit that the light is not an active navigational beacon."),
    h("Point Bolivar explains Galveston Bay navigation"),
    p("Point Bolivar stands beside one of the most important entrances on the Texas coast. A lighthouse was established at the point in the nineteenth century; the present cast-iron tower dates to the post-Civil War rebuilding period and was first lighted in 1873. Its location across the entrance from Galveston makes the original purpose easy to read even today: ships needed a fixed reference at the gateway to a major port."),
    p("The Texas Historical Commission's National Register record recognizes the tower for transportation, engineering and architectural significance. Historical-marker records also connect the site to the great storms of 1900 and 1915, when residents sought shelter in the lighthouse. The tower remains a landmark, but it should not be treated like Port Isabel: ownership and visitor access are different, and travelers should rely on current official or owner guidance rather than assuming a surviving lighthouse is open to climb."),
    h("Lydia Ann shows what happens when a pass moves"),
    p("The Aransas Pass Light Station, commonly called Lydia Ann Lighthouse, was built to mark the natural Gulf passage into Aransas and Corpus Christi bays. A Texas Historical Commission marker says construction began in 1855 and the French lens was lighted in 1856. The station was damaged during the Civil War, rebuilt, and remained useful until channel geography and navigation shifted."),
    p("The same marker records that the light was decommissioned in 1952 after the pass shifted southward and states that the lighthouse is not open to the public. That is a perfect example of a broader coastal pattern: a lighthouse can remain standing after the navigation problem it was built to solve has moved somewhere else."),
    h("Matagorda Island and Halfmoon Reef tell two different preservation stories"),
    p("Matagorda Island Lighthouse survives in a remote coastal setting and is listed in the National Register for commerce, engineering and maritime history. Its isolation is part of the story. The tower belongs to a landscape of barrier islands, passes and bays where access is very different from a roadside historic site. A visitor should plan through the land manager and current transportation rules rather than treating the lighthouse as an ordinary drive-up stop."),
    p("Halfmoon Reef Lighthouse took another path. The Texas Historical Commission marker says the three-story hexagonal lighthouse was built in 1858 at the southern tip of Half Moon Reef in Matagorda Bay, served shipping tied to Port Lavaca and Indianola, and was later moved from the water. It was relocated to Port Lavaca in 1979. The structure is therefore easy to see from land today, but its present setting is preservation rather than the original navigational location."),
    h("The lost lights are part of the same system"),
    p("A complete Texas lighthouse story has to include towers that vanished. The old network changed because the coast changed. Hurricanes destroyed stations; ships collided with structures; channels were dredged; jetties stabilized some passes while redirecting others; range lights, buoys and electronic navigation made older stations unnecessary. A missing lighthouse can still identify the route ships once used and the places where nineteenth-century Texas connected itself to Gulf commerce."),
    p("The Half Moon Shoal light near what became Texas City shows how dramatic that process could be. A Texas Historical Commission marker records that the station was destroyed in the 1900 hurricane when a steamship broke loose and struck the structure, killing keeper Charles K. Bowen. A beacon later replaced the light until changes associated with the Texas City channel and dike altered the shipping lanes again."),
    h("How to plan lighthouse stops without overstating access"),
    list(
      "Treat Port Isabel as the state's primary public climb, but verify current hours, weather closures and admission before traveling.",
      "Assume no interior access at privately owned, remote or water-access lights unless a current official source explicitly says otherwise.",
      "Use ferries, ship channels, historic ports and bay geography as part of the experience; the navigational setting explains why the lighthouse exists.",
      "Separate a surviving tower from an active aid to navigation. Historic lights can be illuminated for interpretation without serving modern mariners.",
      "Pair lighthouse stops with county history, coastal museums, battlefields or working ports so the trip explains the coast rather than becoming a checklist of towers.",
      "Recheck land-manager and site information immediately before a trip because storms, restoration work and access rules can change faster than lighthouse history."
    ),
    h("The bigger story is a coastline engineered for commerce"),
    p("Texas lighthouses make the most sense when read as infrastructure. Each tower marks a moment when ships, channels, military traffic or port growth made safe navigation important enough to build a permanent aid. The survivors are visually compelling, but the network becomes more useful when you also notice the passes that moved, the ports that expanded and the lights that disappeared. Together they show how Texans turned a shallow, storm-prone coast into a working maritime corridor."),
  ],

  "texas-lighthouse-road-trip": [
    h("Before you drive: this is a maritime-history route, not a tower checklist"),
    p("A Texas lighthouse road trip works best when you accept that several historic lights are remote, privately controlled or no longer standing. The route is really a drive through the places that made the lights necessary: ship channels, barrier islands, ferry crossings, military passes, drowned reefs and nineteenth-century ports. If you plan only around climbing towers, most of the coast will feel like a disappointment. If you plan around maritime geography, every leg has something to explain."),
    p("The practical route also requires flexibility. The Texas coast is long, ferries can create delays, storms can close roads or historic sites, and remote lighthouse access can change. Use official site and transportation information on the day of travel. Do not make an old photograph or a private-property view your only reason for driving several hours."),
    h("Upper coast: Sabine Pass is more about border and river history than access"),
    p("At the eastern end of the route, the Sabine River marks the Texas-Louisiana boundary and the historic lighthouse story crosses that political line. TexasDefined's deeper Sabine Pass guide preserves the essential caveat: the historic tower itself stands on the Louisiana side of the Sabine. The Texas side is still valuable for understanding the waterway, Civil War history and the approaches used by shipping, but travelers should not imply tower access where none is officially offered."),
    p("This is a useful opening lesson for the whole trip. A lighthouse can belong to Texas maritime history without being a conventional Texas visitor attraction. Read the river mouth, industrial waterway and border geography first; treat the tower as one artifact within that larger landscape."),
    h("Galveston and Bolivar: the easiest place to see the navigation problem"),
    p("The free Galveston-Port Bolivar ferry crosses one of the busiest and most legible maritime entrances on the route. From the crossing, tankers, cargo vessels, ferries and recreational boats all share a narrow connection between Galveston Bay and the Gulf. Point Bolivar Lighthouse stands near that entrance, giving the historic navigation story a modern backdrop."),
    p("Spend enough time in Galveston to connect the light with the port, the Strand, storm history and the engineering of the ship channel. Historical records show that an earlier Bolivar lighthouse was dismantled during the Civil War and the current cast-iron tower was lighted in the 1870s. Residents later used it as shelter during major hurricanes. That combination of navigation, conflict and storms makes Bolivar one of the route's richest stops even without a public climb."),
    h("Matagorda Bay: use Port Lavaca as the easy stop and Matagorda Island as the remote story"),
    p("Halfmoon Reef Lighthouse is the simplest lighthouse stop on this section because the preserved structure now stands onshore in Port Lavaca. The tower originally served ships in Matagorda Bay and traffic tied to Port Lavaca and Indianola. Its relocation means you can study the architecture easily while also learning that the light no longer sits where mariners once used it."),
    p("Matagorda Island Lighthouse is the opposite experience. It retains the power of a remote coastal setting, but access requires more planning. The National Register recognizes the lighthouse for maritime commerce and engineering. Pair the story with Port O'Connor, Matagorda Bay, refuge or park information and the history of Indianola rather than promising a casual drive-up lighthouse visit."),
    h("Port Aransas: Lydia Ann is best understood from the waterway"),
    p("Lydia Ann Lighthouse marks a passage into Aransas and Corpus Christi bays. The Texas Historical Commission's marker says the station began operating in the 1850s and was decommissioned in 1952 after the pass shifted south. The marker also states that the lighthouse is not open to the public. That makes the Port Aransas area valuable not because you can tour the tower, but because the ferry, ship channel and harbor let you see how coastal navigation still works."),
    p("Use Port Aransas as the overnight base rather than forcing a close-up tower visit. The working channel, Mustang Island, nearby maritime history and Coastal Bend communities give the stop enough substance without trespassing or improvising boat access."),
    h("Lower coast: Port Isabel is where the route finally becomes a climb"),
    p("Port Isabel is the natural finale because it offers the public lighthouse experience the other stops cannot. The Texas Historical Commission describes the site as the only Texas lighthouse open to the public. Visitors can climb the winding stairs and short ladders when weather permits, view the reproduction third-order Fresnel lens, and look across the Laguna Madre toward South Padre Island."),
    p("The history also connects the route back to military and commercial traffic. Point Isabel supplied U.S. forces during the Mexican-American War, shipping through Brazos Santiago Pass drove the need for the lighthouse, and both Union and Confederate forces used the tower as an observation point during the Civil War. A lower-coast lighthouse stop therefore fits naturally with Palo Alto Battlefield, Brownsville history and the Brazos Santiago story."),
    h("A realistic six-day version"),
    list(
      "Day 1 — Sabine Pass and the upper-coast waterway; stay near Beaumont or continue toward Galveston.",
      "Day 2 — Galveston port history, ferry crossing and Point Bolivar; stay in Galveston.",
      "Day 3 — Port Lavaca, Halfmoon Reef and Indianola/Matagorda Bay context; stay around Port Lavaca or Port O'Connor.",
      "Day 4 — Port Aransas, ferry and Lydia Ann channel geography; stay in Port Aransas or Corpus Christi.",
      "Day 5 — Drive the long lower-coast leg, using Corpus Christi or Kingsville history as a break; arrive in Port Isabel.",
      "Day 6 — Climb Port Isabel Lighthouse when weather permits, then add Brownsville, Palo Alto Battlefield or South Padre Island."
    ),
    h("What to verify before every leg"),
    p("Check the current historic-site page for Port Isabel, TxDOT ferry conditions for the crossings you plan to use, and the relevant land manager for remote coastal areas. If a lighthouse is on private property or officially described as closed to the public, keep the trip to legal public viewpoints. Coastal weather, restoration work and storm damage can change access quickly, so the durable itinerary is built around towns and waterways rather than one promised tower door."),
    p("The reward for planning this way is a road trip with a clear story. You begin where a river boundary reaches the Gulf, cross the entrance to Texas' best-known nineteenth-century port, follow Matagorda Bay and the Coastal Bend, and end at the state's public lighthouse near the mouth of the Rio Grande. The towers matter, but the changing coast between them is what turns the drive into Texas history."),
  ],

  "port-isabel-lighthouse-guide": [
    h("Why Point Isabel became a lighthouse site"),
    p("The lighthouse exists because Point Isabel became a critical connection between the Gulf and the lower Rio Grande. During the Mexican-American War, U.S. forces used the point as a supply depot for operations inland. After the war, traffic continued through Brazos Santiago Pass toward Point Isabel and military posts along the Rio Grande. The Texas Historical Commission notes that the volume of shipping made a navigational light necessary."),
    p("Congress authorized money for the project and construction was underway by 1851. The brick tower was completed two years later and displayed a stationary white light visible for nearly 16 miles. The low coastal setting explains the tower's importance: a strong fixed light gave mariners a reference in a landscape of shallow water, islands and passes where there were few tall natural landmarks."),
    h("War repeatedly changed how the tower was used"),
    p("Port Isabel's lighthouse was never only a commercial aid. During the Civil War, Confederate and Federal forces both used the tower as an observation point. Federal troops occupied the area in 1863 as part of operations designed to tighten the blockade and control the lower Rio Grande. The lighthouse's height made it useful for watching a flat coastal landscape in wartime even when its light was not guiding ordinary commerce."),
    p("The tower was repaired and relit in 1866. That return to service matters because it shows how quickly maritime trade reasserted itself after wartime disruption. For roughly two decades the beacon again guided commercial vessels serving southernmost Texas."),
    h("Why the lighthouse eventually stopped guiding ships"),
    p("The lighthouse did not fail because the tower collapsed. Its usefulness changed as transportation and shipping patterns changed. The light was extinguished from 1888 to 1894 during an ownership dispute, then returned to service for a final period. In 1905 it was permanently abandoned as maritime traffic through the area declined and other navigation arrangements made the old station less essential."),
    p("That history is a useful reminder that lighthouse obsolescence is usually about the transportation network around the tower. Railroads, dredged channels, relocated passes, new lights and changing ports can make a perfectly sound lighthouse unnecessary. Port Isabel survived physically even after its original navigational job disappeared."),
    h("Preservation turned an obsolete aid into a public historic site"),
    p("The lighthouse and associated property were donated to the state in 1950. State agencies repaired the tower, adapted it for visitors and later reconstructed a keeper's cottage to serve as a visitor center and museum. The Texas Historical Commission now manages the site within its historic-sites system in cooperation with local partners."),
    p("That preservation history is one reason Port Isabel is unusual among Texas lights. Several historic towers survive elsewhere on the coast, but the Commission identifies Port Isabel as the only one currently open to the public. Visitors are able to enter the tower rather than viewing it only across private land, a channel or a remote island."),
    h("The 2022 Fresnel lens is interpretation, not navigation"),
    p("In 2022 a reproduction third-order Fresnel lens was installed in the lantern room and illuminated, returning a visible glow to the tower after more than a century without its historic light. The reproduction helps visitors understand the optical technology that made nineteenth-century lighthouses effective: concentric glass prisms focused lamp light into a stronger beam than an ordinary lens could produce."),
    p("The distinction between interpretation and active navigation is important. The Texas Historical Commission explicitly says the Port Isabel Lighthouse does not operate as a navigational beacon and has not since 1905. The modern illumination is part of the historic experience, not a signal mariners should use to enter the pass."),
    h("What the climb is actually like"),
    p("Current site information describes a 72-foot tower reached by 75 winding stairs and three short ladders. The climb is allowed only when conditions permit, and children must meet the site's age requirements. Those details make Port Isabel different from a simple museum stop: mobility, heat, wind and weather all affect whether the tower experience is practical for a particular visitor."),
    p("The reward is geographic context. From the top, visitors can see Port Isabel, the Laguna Madre and South Padre Island, making the relationship between settlement, pass and coast much easier to understand. The view is not incidental to the history; it demonstrates why a tower placed here could serve both mariners and military observers."),
    h("Current planning details change—verify them before you go"),
    p("As of the Texas Historical Commission's current site information, the lighthouse operates daily with seasonal hours and weather-dependent access, and admission is charged for the climb. Hours, prices, age rules and closures can change, especially after coastal weather or preservation work. Use the official THC site immediately before traveling rather than treating an evergreen guide as the final source for today's operating details."),
    list(
      "Check the official Port Isabel Lighthouse page for current hours, admission and weather restrictions.",
      "Expect a real stair-and-ladder climb rather than an elevator-access observation deck.",
      "Visit the keeper's-cottage visitor center for context before or after the tower.",
      "Walk the surrounding historic district and waterfront so the lighthouse is connected to the town it served.",
      "Pair the site with Palo Alto Battlefield, Brownsville history or South Padre Island depending on whether your trip emphasizes military, border or coastal history.",
      "Remember that the glowing Fresnel lens is interpretive; the lighthouse is not an active aid to navigation."
    ),
    h("Why Port Isabel is the lighthouse to start with"),
    p("Texas has more dramatic remote towers and more mysterious lost lights, but Port Isabel is the place where the state's lighthouse story is easiest to understand in person. The tower still stands where military supply, Gulf shipping and a low coastal pass once made a navigational light essential. Its public climb, reconstructed keeper context and illuminated Fresnel lens let visitors connect engineering with geography. From there, the rest of the Texas lighthouse network becomes easier to read."),
  ],

  "lost-lighthouses-of-texas": [
    h("A lighthouse can disappear in more than one way"),
    p("Texas lost lighthouses to storms, collision, demolition and decay, but physical destruction is only one kind of disappearance. A light could also become obsolete when a pass shifted, a new ship channel moved traffic elsewhere, a range-light system replaced a single beacon, or modern navigation reduced the need for a staffed station. In some cases the structure survived only because it was moved away from the place where it once functioned."),
    p("That distinction matters because a map of lost lights is really a map of old transportation geography. Put the vanished station back beside the nineteenth-century pass, reef or harbor it served and the coastline begins to explain itself. The light marks where ships once concentrated, where danger was persistent enough to justify federal spending and where a town or port expected enough commerce to need a permanent aid."),
    h("Half Moon Shoal: destroyed in the 1900 hurricane"),
    p("One of the most vivid loss stories comes from Galveston Bay. A Texas Historical Commission marker says the federal government built a lighthouse at Half Moon Shoal in 1854, about two miles east of Shoal Point. The frame structure carried a light and a bell to warn vessels navigating the bay. It was decommissioned during the Civil War and returned to service in 1868."),
    p("The station did not survive the 1900 hurricane. According to the marker, a steamship broke loose from its mooring and drifted into the lighthouse, destroying the structure and killing keeper Charles K. Bowen. A beacon later replaced it. Eventually the shipping lanes changed again after construction of the Texas City channel and dike, making the original lighthouse location part of an older navigational system."),
    h("Halfmoon Reef: a lighthouse preserved after leaving the reef"),
    p("The similarly named Halfmoon Reef Lighthouse in Matagorda Bay illustrates another fate. Built in 1858, the three-story hexagonal structure warned ships near the southern end of Half Moon Reef and served traffic associated with Port Lavaca and Indianola. Confederate troops disabled the light during the Civil War; it returned to operation in 1868."),
    p("The structure outlived its original water setting. The Texas Historical Commission marker records that it was moved to Point Comfort in 1943 and relocated to Port Lavaca in 1979. Visitors can now see the building on land. It is not a vanished lighthouse in the ordinary sense, but the original station has disappeared from the reef, which changes how the preserved structure should be interpreted."),
    h("Brazos Santiago: war, shipping and a vanished lower-coast beacon"),
    p("Brazos Santiago Pass was strategically important because it connected Gulf shipping with the lower Rio Grande. Texas Historical Commission records describe the pass as a Confederate harbor entrance during the Civil War, a place used by blockade runners and later by Federal forces. One marker notes that Confederate Gen. John B. Magruder ordered the lighthouse north of the pass blasted in 1862."),
    p("The destroyed light belongs to the same lower-coast system as Point Isabel. Port Isabel's surviving tower served traffic moving through the broader Brazos Santiago approach, while the lost lights and military installations around the pass reveal how contested and commercially valuable the channel was. The absence of a tower today does not erase that maritime geography."),
    h("Point Bolivar: one lighthouse lost, another rebuilt"),
    p("Bolivar demonstrates that a lighthouse site can have more than one life. Texas Historical Commission records say an earlier federal lighthouse erected at Bolivar Point was dismantled by Confederate forces during the Civil War. The familiar cast-iron tower that survives today was built after the war and first lighted in the 1870s."),
    p("That replacement history matters when counting 'lost' lighthouses. A modern traveler sees a survivor and may assume continuity, but the site itself records interruption. War removed one tower; a later navigation system put another in its place. The surviving structure is therefore both a lighthouse and evidence that an earlier lighthouse disappeared."),
    h("Lydia Ann: the tower survived while the useful pass moved"),
    p("At the Aransas Pass Light Station, the structure survived but the navigation problem shifted. The Texas Historical Commission marker says the light was decommissioned in 1952 after the pass moved southward. That is a quieter kind of loss: the lighthouse remains visible, yet the relationship between tower and active shipping route has changed enough that the original function is gone."),
    p("Lydia Ann is especially useful because it demonstrates that Gulf Coast geography is dynamic. Barrier islands and passes change, while engineering projects can stabilize or redirect channels. A lighthouse is fixed in place. When the safe route moves, the light can be left behind without ever being physically destroyed."),
    h("Why dredging and jetties made old lights obsolete"),
    p("Texas ports became increasingly engineered through the late nineteenth and twentieth centuries. Jetties fixed some entrances. Dredged channels created deeper, more predictable routes. Range lights, buoys and later electronic aids gave mariners information that a single tower could not provide. As ports such as Galveston, Texas City, Corpus Christi and Brownsville developed modern channels, some old lighthouse locations no longer matched the path ships actually followed."),
    p("This is why lost-light history belongs beside port history. The disappearance of a beacon can mark a major shift in commerce: a harbor declining, a new channel opening, a railroad changing freight patterns or an engineered waterway moving traffic away from the old pass. The lighthouse is the visible artifact, but the transportation system is the larger story."),
    h("How to explore places where the lighthouse is gone"),
    list(
      "Use Texas Historical Commission Atlas records and historical markers to locate old lighthouse and pass sites before relying on modern map labels.",
      "Pair lost-light research with current ship channels, ferry routes and bay geography so the old navigational problem is visible.",
      "Do not assume a historic lighthouse location is publicly accessible today; shorelines can be private, industrial, remote or environmentally protected.",
      "Visit preserved relocated structures such as Halfmoon Reef with an understanding that their current setting is not the original station location.",
      "Compare replacement lights and later navigation systems to see how the coast's infrastructure evolved.",
      "Treat hurricanes, war and channel engineering as recurring forces in the story rather than isolated anecdotes."
    ),
    h("What the missing towers reveal"),
    p("Surviving lighthouses are easy to photograph, but the missing ones often explain more about how the Texas coast changed. Their locations trace abandoned routes through bays, military pressure points, storm losses and ports whose traffic moved elsewhere. Looking for a lost lighthouse is therefore less about finding ruins than reconstructing a vanished transportation system. The strongest evidence may be a marker, a harbor entrance, an old chart or a preserved tower standing miles from the reef where it once guided ships."),
  ],
};

const wordsInBody = (body: ArticleBlock[]) => body.reduce((total, block) => {
  const text = block.type === "list" ? block.items.join(" ") : "text" in block ? block.text : "";
  return total + (text.match(/[A-Za-z0-9]+(?:['’][A-Za-z0-9]+)*/g)?.length ?? 0);
}, 0);

export function applySeasonalLighthouseAuthorityDepth(article: Article): Article {
  const additions = seasonalLighthouseAuthorityDepthBlocks[article.slug];
  if (!additions) return article;
  const body = [...article.body, ...additions];
  return {
    ...article,
    body,
    readingMinutes: Math.max(5, Math.ceil(wordsInBody(body) / 200)),
  };
}
