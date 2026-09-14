import type { Article, ArticleBlock, ArticleInternalLink } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

interface AuthorityPatch {
  dek?: string;
  tags: string[];
  sourceName: string;
  sourceUrl: string;
  links: ArticleInternalLink[];
  blocks: ArticleBlock[];
}

const patches: Record<string, AuthorityPatch> = {
  "texas-food-beyond-brisket-guide": {
    dek: "Barbecue is essential, but Texas food only comes into focus when you follow tortillas, sausage, kolaches, Gulf seafood, border cooking, East Texas traditions and the dishes that belong to particular towns.",
    tags: ["texas food", "texas cuisine", "tex-mex", "kolaches", "gulf seafood", "food road trips"],
    sourceName: "Handbook of Texas — Tex-Mex Foods",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/tex-mex-foods",
    links: [
      { href: "/article/texas-barbecue-styles-explained", label: "Texas barbecue styles explained", description: "Compare Central, East, South and West Texas barbecue traditions before building a food trip." },
      { href: "/article/texas-kolache-klobasnek-history", label: "Kolache or klobasnek?", description: "Understand how Czech baking traditions changed after taking root in Texas." },
      { href: "/explore/food-bbq", label: "Explore Texas food and barbecue", description: "Browse TexasDefined food guides, regional traditions and road-trip ideas." },
      { href: "https://www.tshaonline.org/handbook/entries/tex-mex-foods", label: "Handbook of Texas: Tex-Mex foods", description: "Historical background on the Native, Spanish, Mexican and regional influences behind Tex-Mex cooking." },
      { href: "https://gov.texas.gov/travel-texas/page/whats-new", label: "Travel Texas seasonal food guide", description: "State tourism guidance on seasonal Texas food experiences, including Gulf seafood and Hill Country produce." },
    ],
    blocks: [
      h("Texas food is a map before it is a menu"),
      p("The useful way to think about Texas food is not as one cuisine with a few regional variations. It is a set of overlapping food regions created by geography, migration, agriculture, ranching, ports, railroads and the long border with Mexico. Cattle and smoke matter, but so do Gulf shrimp, Czech and German sausage-making, flour tortillas, East Texas gravy, South Texas barbacoa, West Texas chile traditions, pecans, peaches, rice, citrus and the ordinary breakfast foods people eat before visitors are awake."),
      p("That is why a serious Texas food trip should be built around place rather than fame. Lockhart and Luling make sense together because meat-market barbecue developed in a particular Central Texas corridor. West and the communities around it make sense for Czech baking. San Antonio and the Rio Grande Valley reward a different set of questions about tortillas, breakfast, barbacoa and border cooking. The coast is governed by weather, seasons and what boats can actually land. A plate becomes more interesting when you know why it belongs where it is."),
      h("Central Texas barbecue grew out of butcher shops, not trophy brisket"),
      p("The modern line for brisket can make barbecue look like a chef-driven phenomenon, but much of the Central Texas tradition grew from meat markets serving smoked meat as practical food. Sausage is one of the best clues to that older structure. A shop that still grinds, seasons and stuffs its own links is showing the butcher-shop side of Texas barbecue as clearly as a beautifully sliced brisket shows the pit."),
      p("Order enough variety to learn something. Brisket shows fire management and fat rendering. Sausage shows seasoning, grind and casing. Pork ribs reveal how a pit handles leaner cuts. Turkey can expose whether the smoke is balanced or simply aggressive. In East Texas, chopped beef, pork, sandwiches and sauce can matter more to local history than a Central Texas-style tray assembled for tourists. There is no reason to make every region imitate the same benchmark."),
      h("Tex-Mex is a Texas cuisine with its own history"),
      p("Tex-Mex is sometimes described as diluted Mexican food, which misses the history. The Handbook of Texas traces the cuisine through Native American foods, Spanish introductions, Mexican traditions and regional Mexican American communities in Texas. Cheese-heavy enchiladas, chili gravy, combination plates, puffy tacos, breakfast tacos, carne guisada, cabrito and flour-tortilla traditions do not all come from the same place or the same moment. San Antonio, South Texas, El Paso and the Rio Grande Valley can look related on a menu while tasting very different on the table."),
      p("The distinction matters when traveling. In San Antonio, look for the relationship between old-school Tex-Mex institutions and newer restaurants that treat regional Mexican and Tejano traditions with more specificity. In the Valley, breakfast and barbacoa can be more revealing than a dinner reservation. In El Paso, the border with Chihuahua produces a different chile, tortilla and enchilada vocabulary than South Texas. Calling all of it one thing is convenient; eating it town by town is better."),
      h("The Czech and German story is baked and stuffed into the middle of the state"),
      p("European immigration left Texas with churches, dance halls, town names and a food vocabulary that survived by changing. Czech kolaches are sweet pastries, while the savory sausage-filled pastry many Texans casually call a kolache is more accurately a klobasnek. The distinction is worth knowing, but so is the Texas reality: bakeries turned both into road-trip food, and generations of customers made them part of the state’s everyday breakfast culture."),
      p("German and Czech meat traditions also strengthened the sausage side of barbecue. That is one reason the most rewarding Central Texas route includes bakeries, meat markets and old towns rather than only famous smokehouses. Food traditions rarely stay in one category. A sausage recipe can connect immigration history, ranching, butchery, barbecue and a Saturday morning bakery stop in the same family tree."),
      h("The Gulf Coast has its own clock"),
      p("Texas seafood should be approached seasonally and geographically. Gulf shrimp, oysters, red snapper, blue crab and finfish move through different harvest rules, seasons, weather patterns and supply chains. The state tourism office promotes Gulf seafood as a defining coastal experience, but proximity to saltwater is not a guarantee of freshness or local sourcing. Ask what is in season, where it came from and how the restaurant handles the catch."),
      p("The coast also changes the rest of the state. Vietnamese and Cajun influences around Houston and the upper Gulf Coast, shrimping communities, fish houses, oyster bars and cook-your-catch restaurants complicate the idea that Texas food is mostly beef. Houston in particular is one of the places where global migration and Gulf geography meet on the same street. A Texas food guide that skips that story is describing an older, smaller state."),
      h("East Texas belongs in the conversation"),
      p("East Texas cooking draws from the broader Southern foodways of the Piney Woods and Deep South: fried catfish, greens, cornbread, beans, smothered meats, cobblers, gravy and barbecue traditions that can lean more toward chopped meat and sauce. The region also connects to Louisiana through ingredients, family ties and proximity. If a food itinerary only runs Austin–San Antonio–Hill Country, it is missing an entire Texas that does not need brisket to explain itself."),
      h("Build a Texas food trip that can teach you something"),
      list(
        "Pick one region first. A two-day South Texas trip will teach more than racing between unrelated statewide icons.",
        "Eat breakfast. Bakeries, taquerias and diners often reveal local habits better than destination dinners.",
        "Order one thing you already understand and one thing you do not. Familiarity gives you a baseline; curiosity gives the trip a reason to exist.",
        "Ask what is made in-house: sausage, tortillas, bread, pickles, salsa, pie, smoked meat or seafood preparation.",
        "Notice the town around the restaurant. Meat markets, bakeries, produce stands, ports, ranch country and immigrant neighborhoods explain menus.",
        "Respect sellouts and seasons. Limited production is part of many Texas food traditions, not necessarily a marketing trick.",
        "Do not let social media turn every meal into a ranking. The point is to understand a place, not to declare one plate the state champion."
      ),
      h("A better definition of Texas food"),
      p("Texas food is what happens when a very large place keeps absorbing people without completely erasing what they brought with them. Smoke and cattle are part of that story. So are corn and chiles, flour tortillas, Czech dough, German sausage, Gulf shrimp, East Texas fish fries, Vietnamese-Cajun crawfish, South Texas breakfast plates and the seasonal produce that appears beside highways for a few weeks at a time."),
      p("Brisket deserves its place on the cover. Authority begins when the story keeps going after the first slice."),
    ],
  },

  "live-2026-06-29-the-history-behind-the-texas-stock-tank-name-bxkvg7": {
    dek: "A stock tank is more than a Texas synonym for a pond. The phrase comes from ranch infrastructure, water scarcity and a working-land vocabulary that later escaped the pasture.",
    tags: ["stock pond", "farm pond", "livestock water", "ranch history", "texas vocabulary", "private ponds"],
    sourceName: "Texas Parks & Wildlife — Managing Private Lakes & Ponds",
    sourceUrl: "https://tpwd.texas.gov/landwater/water/habitats/private_water/",
    links: [
      { href: "/article/texas-rural-wells-water-guide", label: "Rural Texas wells and water", description: "See how wells, groundwater, storage and drought shape rural-property decisions." },
      { href: "/article/buying-land-in-texas-guide", label: "Buying land in Texas", description: "Put ponds and livestock water into the larger acreage due-diligence checklist." },
      { href: "/article/texas-slang-explained", label: "Texas language and slang", description: "Explore more words shaped by ranching, Spanish, geography and regional history." },
      { href: "https://tpwd.texas.gov/landwater/water/habitats/private_water/", label: "TPWD private pond management", description: "Official Texas guidance and resources for managing private lakes and ponds." },
      { href: "https://tpwd.texas.gov/faq/landwater/fisheries/", label: "TPWD private fishing pond FAQ", description: "Current answers on pond construction guidance, fish stocking and private-water management." },
    ],
    blocks: [
      h("Why a pond became a tank"),
      p("The word sounds wrong only if you picture a tank as something made of steel. On working ranches, the important idea was storage. Water collected behind a small earthen embankment or in an excavated depression was a stored supply for stock—cattle, horses, sheep or goats. In dry country, the function mattered more than the shape. The result was a term that could describe a water body that looks exactly like a pond to everybody else."),
      p("That practical vocabulary is common across ranch country in the American West and Southwest, but Texas made it culturally visible because ranching is so deeply woven into settlement, land use and language. A stock tank was not originally an amenity. It was part of the operating system of a piece of land. If pasture had grass but no dependable water, its value to livestock was limited."),
      h("Water determined how land could be used"),
      p("Before modern rural water systems, long pipelines and distributed trough networks, capturing runoff in small impoundments could extend grazing into places where animals otherwise had to travel too far for water. Ranchers shaped drainage, built earthen dams, cleaned silt, repaired spillways and watched evaporation because a small body of water could decide whether a pasture worked through a dry stretch."),
      p("That does not mean every Texas stock tank was built the same way. Some were excavated, some impounded drainage, some were spring-fed, and later ponds could be supplemented by wells or pipelines. Soil type, watershed size, rainfall and topography all matter. The phrase describes a use and a tradition, not a single engineering plan."),
      h("A working stock tank quickly becomes habitat"),
      p("Once water is held on the landscape, other systems move in. TPWD’s private-water resources treat ponds as ecosystems that can support fish, aquatic vegetation, birds, amphibians and wildlife while still serving landowners. That dual identity explains why ranch ponds are often remembered as places to fish or swim even when their original purpose was livestock."),
      p("Management can become complicated. Too much aquatic vegetation can interfere with access. Sediment slowly reduces depth. Nutrient loading can change water quality. Drought concentrates problems while extreme rain can test spillways and dams. A pond that looks permanent from the porch is actually infrastructure being reshaped by every season."),
      h("Why landowners still build and maintain them"),
      list(
        "Livestock water where animals graze.",
        "Wildlife habitat and a dependable dry-season water source.",
        "Fishing and recreation when the pond is large and healthy enough to support it.",
        "Runoff capture and limited sediment control within a managed property.",
        "Emergency or supplemental water in some agricultural settings, depending on design and law."
      ),
      p("Modern ranches may prefer pipelines and troughs because they can improve water quality, distribute grazing pressure and keep cattle out of muddy pond margins. That has not made stock tanks obsolete. It has simply made them one tool among several ways to move and store water on working land."),
      h("A stock tank is not automatically a legal free-for-all"),
      p("The casual name can make a pond sound simple, but water law, dam safety, drainage, environmental rules and downstream effects can matter. Whether a landowner may capture or alter water depends on facts far beyond what people call the pond. Anyone building, enlarging or significantly changing an impoundment should treat design and legal questions as a property-specific project, not as something settled by ranch vocabulary."),
      h("Then the phrase escaped the ranch"),
      p("Language rarely stays obedient to its original job. Galvanized livestock watering tanks became backyard soaking tubs and inexpensive plunge pools. Designers and homeowners began calling them stock-tank pools. At the same time, Texans continued using stock tank for earthen ponds. One phrase now points in two directions: a literal metal livestock tank repurposed for people, and a pond whose name survives from the reason it was built."),
      p("That is the part outsiders often miss. Texans are not failing to recognize a pond. They are using a word that remembers what the pond was for."),
    ],
  },

  "texas-dance-hall-survival": {
    dek: "Texas dance halls survive when history remains useful: roofs stay dry, floors stay sound, bands keep playing and communities keep finding reasons to gather under the same old rafters.",
    tags: ["texas dance halls", "texas music history", "german texas", "czech texas", "historic preservation", "two step"],
    sourceName: "Texas Dance Hall Preservation",
    sourceUrl: "https://texasdancehall.org/",
    links: [
      { href: "/explore/historic-sites", label: "Texas historic sites", description: "Build a trip around places where Texas history is still visible and usable." },
      { href: "/article/texas-painted-churches-guide", label: "Texas painted churches", description: "Continue through the Central European communities that reshaped towns across Central Texas." },
      { href: "/destination/gruene-historic-district", label: "Gruene Historic District", description: "Pair the dance-hall story with one of Texas’s best-known surviving historic town districts." },
      { href: "https://texasdancehall.org/impact-statement/", label: "Texas Dance Hall Preservation impact statement", description: "Current preservation totals, grants and documented-hall research from the statewide nonprofit." },
      { href: "https://texasdancehall.org/about-texas-dance-hall-preservation/our-history/", label: "Texas Dance Hall Preservation history", description: "How statewide preservation work grew from research, advocacy, grants and disaster-response projects." },
    ],
    blocks: [
      h("The dance hall was a piece of civic infrastructure"),
      p("To understand why Texas dance halls matter, stop thinking of them first as music venues. In many German, Czech and other Central European communities, a hall was one of the places where civic life became physical. Agricultural societies, fraternal groups, mutual-aid organizations, lodges and community clubs needed large rooms for meetings, meals, fundraisers, celebrations and dances. The building earned its keep because a town could use it again and again."),
      p("That multipurpose origin helps explain why the surviving halls feel different from purpose-built concert venues. The stage can be modest, the walls thin, the windows open, the ceiling high and the floor disproportionately important. The room was designed around gathering. Music made the gathering better."),
      h("The floor is part of the instrument"),
      p("A good old dance-hall floor changes the night. Long wood spans, a little give underfoot and decades of wear create a surface meant for motion rather than spectacle. The architecture can be simple because dancers, not décor, finish the room. Open windows and tall ceilings once handled Texas heat as well as they could; screened openings, fans and shaded porches turned climate into part of the experience."),
      p("That simplicity is deceptive from a preservation standpoint. Water is relentless. A failed roof can damage trusses, walls and the floor that gives the building its identity. Poor drainage can undermine foundations. Electrical systems, exits, accessibility, insurance and modern event requirements must be addressed without stripping away the very character people are trying to save."),
      h("Preservation is an operating model, not a plaque"),
      p("Texas Dance Hall Preservation has documented more than 400 halls through mapping and research and reports direct assistance to more than 40 halls, along with grants and relief funding. Those numbers tell a more useful story than nostalgia does: preservation requires money, technical help, owners or stewards, active calendars and communities willing to solve unromantic building problems."),
      p("A hall can be historically important and still disappear if nobody can insure it, repair the roof or fill enough dates to justify the next expense. Conversely, a hall does not have to become a museum to be preserved. Weddings, dances, benefits, reunions, community meetings and concerts can keep the building economically and socially alive."),
      h("The music changed, but the social grammar survived"),
      p("Polkas, waltzes and Central European dance traditions were joined over time by western swing, country, conjunto, rock, Tejano and regional bands. The calendar changed with the audience. What remained was the idea that music belongs in a room where people know how to move around one another—families, older regulars, first-timers, serious dancers and children learning the etiquette by watching."),
      p("That is why the best night in a historic hall is not necessarily the night with the biggest touring name. A local benefit dance or community fundraiser can reveal more about the institution than a sold-out destination concert. The hall is most itself when the building is serving the community that keeps it standing."),
      h("How to visit an old Texas dance hall well"),
      list(
        "Check the hall’s own calendar before building a road trip around it; many historic halls are active only on specific dates.",
        "Buy a ticket, a drink or merchandise when offered. Preservation is easier when visitors participate in the economics of the room.",
        "Do not treat a working dance floor like a photo studio. Stay aware of dancers and local etiquette.",
        "Look at the building before the band starts: roof structure, windows, floor, stage, porches, additions and evidence of repair tell the preservation story.",
        "Pair the hall with the surrounding town. Churches, cemeteries, lodge buildings, bakeries and historic commercial streets often explain who built it and why."
      ),
      h("What Texas loses when a hall closes"),
      p("A closed hall is not just one fewer place to hear country music. It can erase a room scaled to a particular community, a floor worn by generations, a building tradition adapted to Texas heat and a piece of the social network that made rural and small-town life function. New venues can host the same bands. They cannot manufacture the same continuity."),
      p("The last dance halls will survive only if they remain more than the last dance halls. They have to be useful buildings with living calendars. That is the preservation paradox: the best way to honor the past is to keep giving people a reason to show up next Saturday."),
    ],
  },

  "friday-night-and-the-texas-town": {
    dek: "Texas high-school football is only partly about football. The stadium is also a bandstand, reunion, civic stage, student workplace and weekly map of how a community sees itself.",
    tags: ["texas high school football", "UIL football", "six man football", "marching band", "small town texas", "friday night lights"],
    sourceName: "University Interscholastic League — Football",
    sourceUrl: "https://www.uiltexas.org/football",
    links: [
      { href: "/texas-life/sports", label: "Texas sports", description: "Read more about the teams, venues and traditions that shape sports across the state." },
      { href: "/explore/small-towns", label: "Texas small towns", description: "Put Friday-night football into the larger civic geography of courthouse squares, schools and local institutions." },
      { href: "https://www.uiltexas.org/football/alignments", label: "UIL football alignments", description: "Current 2026–27 district alignments for Texas public-school football." },
      { href: "https://www.uiltexas.org/athletics/conference-cutoffs", label: "UIL conference cutoff numbers", description: "Current enrollment cutoffs used for the 2026–27 and 2027–28 alignment cycle." },
      { href: "https://www.uiltexas.org/football/manual", label: "UIL football manual", description: "Current rules, calendars, heat guidance and operational information for Texas school football." },
    ],
    blocks: [
      h("The classification number tells you something about the town"),
      p("The UIL’s 2026–27 and 2027–28 alignment cycle stretches from 1A schools with enrollment below 105 to 6A schools with enrollment of 2,215 or more. Those numbers are not trivia. They help explain why Texas high-school football can look like two different sports under the same Friday-night lights. A six-man game in a tiny community and a 6A district matchup in a fast-growing suburb operate at radically different scales, but both can become the week’s biggest shared event."),
      p("In a small district, almost everybody in the stands may be connected to somebody on the field, in the band, on the sideline or in the concession stand. In a suburban district, the stadium can serve multiple high schools and resemble a small college facility. The common thread is institutional: the school district creates a public gathering that repeats every fall and gives generations a reason to return."),
      h("The band is not halftime decoration"),
      p("Texas marching-band culture deserves to be read as part of the same event. Students rehearse for competition, drill teams and cheer programs build their own traditions, athletic trainers and student media work the sidelines, booster clubs run logistics, and younger students watch the older ones model what participation looks like. Football provides the clock; the school community fills the rest of the evening."),
      p("That is one reason outsiders can misread a stadium’s importance. The venue may host football, soccer, track, band contests, graduations and playoff games. A bond-funded stadium is never just an emotional monument to one team, even when football is the event that makes it visible statewide."),
      h("Six-man football is Texas geography made into a game"),
      p("At the smallest-school level, six-man football is one of the clearest examples of rules adapting to distance and population. Smaller rosters, a wider-open field and high-scoring games allow communities with very few students to keep a football tradition alive. The game is not a miniature version of 11-man football. It has its own strategy, pace and culture."),
      p("A road trip built around a six-man game can also show how enormous Texas is. Towns separated by long stretches of ranch country may share a district because there simply are not many nearby schools of comparable enrollment. The visiting team’s bus route can explain the region as well as a map does."),
      h("Realignment redraws rivalries every two years"),
      p("UIL realignment is one of the hidden engines of Texas school sports. Enrollment snapshots shift schools between classifications and districts, changing travel, schedules and sometimes old rivalries. Rapid-growth suburbs can move upward while rural schools shrink or consolidate. When people argue that a matchup ‘doesn’t feel right anymore,’ they are often reacting to demographic change expressed through a sports schedule."),
      h("What a first-time visitor should watch besides the score"),
      list(
        "Arrive before kickoff. The parking lot, band warmup, pregame introductions and student sections show how the community organizes itself.",
        "Notice whether the stadium serves one school or an entire district; that changes the relationship between venue and neighborhood.",
        "Watch halftime. In many communities, the band and drill team are not side acts but equal reasons families came.",
        "Read the roster and program for family names that repeat across generations, local businesses and school organizations.",
        "Stay through the alma mater or postgame gathering when appropriate. The ritual after the clock reaches zero can be as revealing as kickoff."
      ),
      h("The stadium is a weekly census of belonging"),
      p("Texas towns do not agree on politics, growth, schools, taxes or what the place ought to become. Friday night does not erase those disagreements. It simply concentrates people into the same set of bleachers for a few hours and gives them a shared vocabulary of downs, drum cadences, school colors and familiar faces."),
      p("That is why high-school football remains useful even for people who do not care much about football. The stadium shows who volunteers, who sponsors, who performs, who comes home, what the school district can build and how a community narrates itself in public. The game is real. So is everything gathered around it."),
    ],
  },
};

export function enrichLegacyFoodCultureArticle(article: Article): Article {
  const patch = patches[article.slug];
  if (!patch) return article;
  const links = [...(article.internalLinks ?? [])];
  for (const link of patch.links) {
    if (!links.some((existing) => existing.href === link.href)) links.push(link);
  }
  return {
    ...article,
    dek: patch.dek ?? article.dek,
    tags: [...new Set([...article.tags, ...patch.tags])],
    sourceName: patch.sourceName,
    sourceUrl: patch.sourceUrl,
    internalLinks: links,
    body: [...article.body, ...patch.blocks],
  };
}
