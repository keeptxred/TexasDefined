export interface TexasEvergreenGuideSection {
  heading: string;
  body: string[];
  bullets?: string[];
  links?: { href: string; label: string }[];
}

export interface TexasEvergreenGuide {
  slug: string;
  eyebrow: string;
  title: string;
  dek: string;
  quickAnswer: string;
  sections: TexasEvergreenGuideSection[];
  related: { href: string; label: string; description: string }[];
}

export const TEXAS_EVERGREEN_GUIDES: Record<string, TexasEvergreenGuide> = {
  "texas-food-trail": {
    slug: "texas-food-trail",
    eyebrow: "Eat your way across Texas",
    title: "The Texas Food Trail: 10 Food Traditions Worth a Road Trip",
    dek: "Texas food is not one cuisine. Follow verified barbecue smokehouses, Tex-Mex institutions, Czech and German bakeries, Gulf seafood, ranch steakhouses, historic cafes and other traditions that only make sense in place.",
    quickAnswer: "For a first Texas food road trip, start with one coherent region instead of chasing a statewide ranking. Lockhart, Taylor, Lexington and Elgin form the strongest Central Texas barbecue corridor; San Antonio and South Texas connect Tex-Mex, puffy tacos and barbacoa; West and New Braunfels connect Czech and German foodways; Galveston and Riviera anchor a Gulf seafood route; Fort Worth and Buffalo Gap show two very different Texas steakhouse traditions. TexasDefined's verified food profiles focus on durable history and place, while current hours, prices and menus should always be checked with the business.",
    sections: [
      {
        heading: "1. Lockhart and the Central Texas barbecue corridor",
        body: [
          "Central Texas barbecue is best understood as a network of meat-market traditions rather than a single restaurant ranking. Lockhart alone preserves several branches of the same long history: Kreuz Market, The Original Black's Barbecue and Smitty's Market each connect smoke, sausage and beef to the town's butcher-shop past.",
          "Build the route outward instead of crisscrossing the state. Taylor adds Louie Mueller Barbecue, Lexington adds Snow's BBQ and Elgin adds Southside Market & Barbeque. Together they make a practical corridor for comparing smokehouses, sausage traditions and town identities while recognizing that no single tray represents every Texas barbecue style."
        ],
        links: [
          { href: "/food/kreuz-market-lockhart", label: "Kreuz Market" },
          { href: "/food/blacks-barbecue-lockhart", label: "The Original Black's Barbecue" },
          { href: "/food/smittys-market-lockhart", label: "Smitty's Market" },
          { href: "/food/louie-mueller-barbecue-taylor", label: "Louie Mueller Barbecue" },
          { href: "/food/snows-bbq-lexington", label: "Snow's BBQ" },
          { href: "/food/southside-market-elgin", label: "Southside Market & Barbeque" },
          { href: "/article/texas-barbecue-styles-explained", label: "Texas barbecue styles explained" }
        ]
      },
      {
        heading: "2. San Antonio and South Texas: Tex-Mex, puffy tacos and barbacoa",
        body: [
          "San Antonio works best as a food city when the traditions are kept distinct. Mi Tierra Cafe y Panaderia ties Market Square to Tex-Mex, Mexican baking and family restaurant culture, while Ray's Drive Inn gives the puffy taco a specific West Side address and history.",
          "Carry the route farther south and the story changes: Vera's Backyard Bar-B-Que in Brownsville preserves a barbacoa de cabeza tradition tied to underground-pit cooking. Brownsville is a substantial drive beyond San Antonio, so put that meal on a South Texas overnight extension rather than treating the puffy-taco stop and barbacoa visit as adjacent neighborhoods."
        ],
        links: [
          { href: "/food/mi-tierra-cafe-san-antonio", label: "Mi Tierra Cafe y Panaderia" },
          { href: "/food/rays-drive-inn-san-antonio", label: "Ray's Drive Inn" },
          { href: "/food/veras-backyard-bar-b-que-brownsville", label: "Vera's Backyard Bar-B-Que" },
          { href: "/san-antonio-puffy-taco-history", label: "San Antonio puffy taco history" },
          { href: "/barbacoa-big-red-san-antonio", label: "Barbacoa & Big Red" }
        ]
      },
      {
        heading: "3. Breakfast tacos and Austin's everyday food institutions",
        body: [
          "Breakfast tacos matter because they are ordinary. The format belongs to bakeries, taquerias, neighborhood counters and drive-throughs as much as destination dining rooms, which makes the tradition more revealing than a single 'best taco' list.",
          "Joe's Bakery & Coffee Shop carries East Austin family restaurant history, while Matt's El Rancho is a South Lamar institution. The first is suited to a breakfast stop; the second belongs to a separate lunch or dinner. They also show how neighborhood roots and family businesses matter as much as the particular taco or enchilada ordered."
        ],
        links: [
          { href: "/food/joes-bakery-austin", label: "Joe's Bakery & Coffee Shop" },
          { href: "/food/matts-el-rancho-austin", label: "Matt's El Rancho" },
          { href: "/texas-breakfast-taco-guide", label: "Texas breakfast taco guide" }
        ]
      },
      {
        heading: "4. Czech and German foodways from West to New Braunfels",
        body: [
          "Czech Stop in West turns the I-35 bakery stop into a doorway to Czech-Texan food history. Kolaches, klobasneks and road-trip culture make more sense when they are connected to the communities that preserved those baking traditions.",
          "Farther south, Naegelin's Bakery, Krause's Cafe & Biergarten and Scholz Garten carry different parts of the German-Texan story through baking, beer-garden culture and long-running gathering places. Pair the food with town history, painted churches, dance halls and settlement patterns for a route that explains why the tradition exists where it does."
        ],
        links: [
          { href: "/food/czech-stop-west", label: "Czech Stop" },
          { href: "/food/naegelins-bakery-new-braunfels", label: "Naegelin's Bakery" },
          { href: "/food/krauses-cafe-new-braunfels", label: "Krause's Cafe & Biergarten" },
          { href: "/food/scholz-garten-austin", label: "Scholz Garten" },
          { href: "/german-czech-texas-towns", label: "German & Czech Texas towns" },
          { href: "/explore/painted-churches", label: "Painted Churches of Texas" }
        ]
      },
      {
        heading: "5. Houston Tex-Mex and the Texas icehouse tradition",
        body: [
          "Houston's food history is too broad for one cuisine, but two institutions make useful starting points. The Original Ninfa's on Navigation connects the East End, tacos al carbon and the restaurant history of fajitas, while West Alabama Ice House preserves a very different open-air neighborhood gathering tradition.",
          "Treat them as cultural anchors rather than a complete Houston food list. The city rewards neighborhood-by-neighborhood exploration, and the strongest route uses long-running institutions to explain how migration, commerce and social spaces shaped the table."
        ],
        links: [
          { href: "/food/ninfas-on-navigation-houston", label: "The Original Ninfa's on Navigation" },
          { href: "/food/west-alabama-ice-house-houston", label: "West Alabama Ice House" }
        ]
      },
      {
        heading: "6. Gulf Coast seafood from Galveston to Baffin Bay",
        body: [
          "Seafood belongs on a Texas food trail because the coast changes both the ingredients and the travel experience. Gaido's in Galveston ties a century-plus restaurant history to the island's tourism and port culture, while King's Inn near Baffin Bay represents a very different South Texas coastal setting.",
          "Build the meal around the coast itself. Beaches, bays, birding, fishing and working-waterfront history make the route coherent, and they keep Gulf seafood from becoming just another restaurant category detached from geography."
        ],
        links: [
          { href: "/food/gaidos-seafood-galveston", label: "Gaido's Seafood Restaurant" },
          { href: "/food/kings-inn-riviera", label: "King's Inn" },
          { href: "/explore/beaches-coast", label: "Texas Gulf Coast guide" }
        ]
      },
      {
        heading: "7. Texas steakhouse tradition: Stockyards to ranch country",
        body: [
          "Cattlemen's Steakhouse in the Fort Worth Stockyards and Perini Ranch Steakhouse in Buffalo Gap tell two different versions of the Texas beef story. One sits inside a historic cattle-trade district; the other turns ranch hospitality and cowboy cooking into a destination experience in West Texas.",
          "The Stockyards put Cattlemen's inside a historic cattle-trading district where a visitor can walk among surviving Western buildings. Perini Ranch, near Abilene in Buffalo Gap, shifts the scene to ranch-country hospitality. The former fits a Fort Worth heritage day; the latter is a destination meal planned around a West Texas drive."
        ],
        links: [
          { href: "/food/cattlemens-steakhouse-fort-worth", label: "Cattlemen's Steakhouse" },
          { href: "/food/perini-ranch-steakhouse-buffalo-gap", label: "Perini Ranch Steakhouse" },
          { href: "/texas-old-west", label: "Texas Old West" }
        ]
      },
      {
        heading: "8. Historic cafes, chili parlors and comfort-food Texas",
        body: [
          "Blue Bonnet Cafe in Marble Falls and Tolbert's Restaurant & Chili Parlor in Grapevine show why Texas food history is not limited to barbecue and tacos. One represents the long-running cafe tradition of breakfast, chicken-fried steak and pie; the other carries forward the public memory of Texas red chili and the Terlingua cook-off story.",
          "The Blue Bonnet Cafe belongs to a Marble Falls and Highland Lakes outing, while Tolbert's is in Grapevine in North Texas. Treat them as separate regional meals rather than a single short drive; the comparison is between a long-running cafe-and-pie tradition and a restaurant carrying the Terlingua chili-cookoff story."
        ],
        links: [
          { href: "/food/blue-bonnet-cafe-marble-falls", label: "Blue Bonnet Cafe" },
          { href: "/food/tolberts-chili-parlor-grapevine", label: "Tolbert's Restaurant & Chili Parlor" },
          { href: "/texas-chicken-fried-steak-guide", label: "Texas chicken-fried steak guide" },
          { href: "/texas-chili-con-carne-history", label: "Texas chili history" }
        ]
      },
      {
        heading: "9. Dallas and Austin legacy restaurants",
        body: [
          "El Fenix in Dallas and Matt's El Rancho in Austin show how long-running Mexican-American and Tex-Mex restaurants became part of city identity. Scholz Garten adds a different Austin lineage through German-Texan social culture, while Joe's Bakery keeps the East Austin breakfast tradition grounded in a neighborhood institution.",
          "El Fenix fits a downtown Dallas stop. In Austin, Matt's El Rancho on South Lamar, Scholz Garten near the Capitol and Joe's Bakery in East Austin belong to different neighborhoods and different meals, not a realistic one-hour tasting circuit. Their histories connect food to Mexican-American, German-Texan and East Austin community life."
        ],
        links: [
          { href: "/food/el-fenix-downtown-dallas", label: "El Fenix" },
          { href: "/food/matts-el-rancho-austin", label: "Matt's El Rancho" },
          { href: "/food/scholz-garten-austin", label: "Scholz Garten" },
          { href: "/food/joes-bakery-austin", label: "Joe's Bakery & Coffee Shop" }
        ]
      },
      {
        heading: "Plan two food-focused days without crossing the state",
        body: [
          "Central Texas example: start day one in Lockhart for a barbecue lunch, walking the historic town center before or after the meal. Choose one or two nearby smokehouses, not six back-to-back meals. Spend the night in the Austin–Lockhart area; on day two, pick either Taylor or Elgin as the next barbecue comparison, leaving room for an Austin breakfast stop. Snow's in Lexington belongs on a different schedule and may sell out early; check its actual service before making it the anchor.",
          "San Antonio example: start with a morning neighborhood bakery or breakfast taco, visit Market Square and Mi Tierra, then explore the historic West Side on a separate meal rather than claiming one restaurant represents all Tex-Mex. A longer second day can move toward South Texas barbacoa, but Brownsville is a substantial additional journey, not an add-on to a relaxed San Antonio afternoon.",
          "A Gulf example pairs Galveston's historic center and seafood meal with nearby coastal museums or a beach visit. King's Inn near Baffin Bay belongs to a different South Texas coast itinerary. Restaurant participation, price, reservation policy and kitchen hours can change; consult the venue directly."
        ],
        links: [
          { href: "/food/kreuz-market-lockhart", label: "Kreuz Market, Lockhart" },
          { href: "/food/louie-mueller-barbecue-taylor", label: "Louie Mueller, Taylor" },
          { href: "/food/mi-tierra-cafe-san-antonio", label: "Mi Tierra, San Antonio" },
          { href: "/food/gaidos-seafood-galveston", label: "Gaido's, Galveston" }
        ]
      },
      {
        heading: "10. Turn the food trail into a realistic Texas trip",
        body: [
          "Do not try to cover Texas food by driving from Houston to Lockhart to San Antonio to Galveston in one day. Pick one cluster, choose one anchor meal and add nearby towns, museums, parks, markets or events so the trip still works if a restaurant sells out or changes its schedule.",
          "The Food & Barbecue hub now groups verified profiles by route, while TexasDefined's food-town and weekend-trip guides help decide which cluster deserves a full day or overnight. Current operating details remain deliberately outside the evergreen profiles: verify hours, reservations, menus and prices with the business before driving."
        ],
        links: [
          { href: "/explore/food-bbq", label: "Texas Food & Barbecue hub" },
          { href: "/article/best-texas-food-towns", label: "Texas food towns" },
          { href: "/article/best-texas-weekend-trips-for-food-lovers", label: "Food-lover weekend trips" },
          { href: "/article/texas-food-road-trip-bucket-list", label: "Texas food road-trip bucket list" },
          { href: "/explore/trip-planner", label: "Texas Trip Planner" }
        ]
      }
    ],
    related: [
      { href: "/explore/food-bbq", label: "Texas Food & Barbecue", description: "Browse the verified destination profiles and route clusters behind this trail." },
      { href: "/texas-food-history", label: "Texas Food History", description: "Understand the migration, cattle, Gulf Coast and border histories behind the food." },
      { href: "/article/best-texas-food-towns", label: "Texas food towns", description: "Choose a town or city where food can anchor a full day or weekend." },
      { href: "/article/best-texas-weekend-trips-for-food-lovers", label: "Texas food weekends", description: "Turn regional food traditions into realistic overnight trips." },
      { href: "/article/texas-cultural-regions-explained", label: "Texas cultural regions explained", description: "See why food traditions change as geography, migration and settlement patterns change." }
    ]
  },
  "texas-roadside-oddities": {
    slug: "texas-roadside-oddities",
    eyebrow: "Big, strange and worth the detour",
    title: "Texas Roadside Oddities: A Guide to the State's Weirdest Stops",
    dek: "Texas roadside culture rewards travelers who leave the interstate for giant boots, buried cars, improbable museums, neon signs, tiny towns and places that make sense only after you stop.",
    quickAnswer: "For a practical first detour, choose one region: Cadillac Ranch and historic Route 66 in Amarillo; the cowboy-boot sculpture and other San Antonio sights; or a visit to Paris for its cowboy-hat Eiffel Tower and adjacent memorial. These are separate trips, not a plausible single-day statewide route. Verify access, weather and business hours at each stop.",
    sections: [
      { heading: "Start with the Panhandle: Cadillac Ranch and Route 66 energy", body: ["Ant Farm created Cadillac Ranch in 1974, planting ten Cadillacs nose-first into the ground outside Amarillo. The cars were later moved to their present site west of the city, reached from an I-40 frontage road. This is exposed outdoor art, not a conventional museum with indoor visitor facilities.", "Pair Cadillac Ranch with Amarillo's Historic Sixth Street Route 66 district on a city-focused visit. The farther Route 66 corridor includes Adrian and Shamrock, where the National Park Service documents the 1936 Tower Station and U-Drop Inn Cafe at 111 U.S. Route 66. It is a separate eastbound driving segment, not another Amarillo neighborhood."], links: [{ href: "/explore/top-attractions", label: "Top Texas attractions" }] },
      { heading: "San Antonio goes oversized", body: ["The giant boots outside North Star Mall at 7400 San Pedro Avenue are Bob 'Daddy-O' Wade's sculpture The Giant Justins. Originally commissioned in 1979 for a Washington, D.C., art project, the installation moved to San Antonio in January 1980. The mall documents their scale at about 40 feet tall and their Guinness recognition; they are relocated pop art, not an artifact from an old cattle trail.", "Treat the boots as a San Pedro Avenue photo stop, not an all-day attraction. The sculpture is outside a working shopping center, and the mall's parking, property rules and hours should be checked separately. A visitor following the River Walk or Missions trail should plan the North Star stop as a distinct north-side detour."] },
      { heading: "Fort Worth turns Western identity into spectacle", body: ["Billy Bob's Texas stands at 2520 Rodeo Plaza within the Historic Fort Worth Stockyards. Its three-acre footprint, dance floor, concerts and indoor bull-riding arena explain the 'world's largest honky-tonk' billing, but concerts and bull-riding events depend on their own schedules; a daytime visit does not guarantee either.", "Plan a Stockyards walk separately from a ticketed evening at Billy Bob's. The venue's operator lists variable admission and event policies and notes that special events and private bookings can alter hours. This differs from roadside sculpture that can be photographed without booking an event."], links: [{ href: "/sports-venues/rodeo-western", label: "Texas rodeo and Western venues" }] },
      { heading: "Tiny towns can be the attraction", body: ["Luckenbach's country store and music gathering place near Fredericksburg rewards a Hill Country detour, while Marfa's art institutions and historic streets belong to a far-West-Texas trip. Terlingua's former mining community is part of the Big Bend region, not a casual afternoon side trip from the Hill Country. Geography and history matter more than a generic 'quirky town' label.", "Choose a regional corridor before choosing a curiosity. Luckenbach can fit into a Fredericksburg-area Hill Country trip, whereas Marfa pairs more naturally with Alpine and far-West-Texas drives. For Terlingua, make a separate Big Bend-area plan and confirm lodging and road access; sparse services and long distances distinguish it from an urban photo stop."], links: [{ href: "/explore/trip-planner", label: "Texas trip planner" }] },
      { heading: "Courthouse squares and old commercial streets", body: ["Waxahachie's Ellis County Courthouse is a specific reason to leave the highway for a town square. The Texas Historical Commission documents James Riely Gordon's Richardsonian Romanesque design, the 1895 cornerstone and the building's completion in 1897. The varied stonework, carved faces and arched porticos tell a stronger story than a generic 'old courthouse' photograph.", "In Waxahachie, begin at the public square to compare the courthouse's differing exterior elevations before walking the surrounding historic commercial blocks. This is a heritage walk, not a promise of access inside working government offices; confirm event closures and accessible entrances with the county."], links: [{ href: "/article/texas-courthouses-town-square", label: "Texas courthouses and town squares" }] },
      { heading: "Neon, signs and the disappearing roadside", body: ["The art-deco Tower Station and U-Drop Inn Cafe in Shamrock is a documented example of roadside commerce. The National Park Service dates the combined station and cafe to 1936 and identifies architect Joseph Berry's design. Its towers and vintage roadside styling show how businesses competed for motorists long before phone navigation.", "The preserved U-Drop Inn building is not evidence that its original 1930s restaurant business still operates. Stop for the roadside architecture and any presently offered interpretation, then confirm visitor access through Shamrock's city or tourism office. Respect posted property boundaries at private old motels and service stations." ] },
      { heading: "Roadside art is its own Texas category", body: ["Houston has two very different environments associated with its Orange Show preservation organization. John Milkovisch began the Beer Can House in 1968 and eventually clad the building with aluminum cans; the Orange Show Monument is a separate folk-art project built by Jeff Davis McKissack. Nearby Smither Park offers a mosaic-covered outdoor landscape.", "These Houston sites are not interchangeable walk-in stops. As of November 2026, the Orange Show organization says its monument is closed for restoration until early 2027, while its visitor site lists separate access for Smither Park and the Beer Can House. Check the operator's current visit instructions before setting out, as restoration and tour access can change independently." ] },
      { heading: "Which stops require a plan before arriving?", body: ["Cadillac Ranch is an outdoor field installation west of Amarillo, so expect uneven ground and exposure to Panhandle weather. Visit Amarillo provides the I-40 frontage-road location and documents Ant Farm's original 1974 work; do not assume the art has a museum entrance or indoor visitor facilities.", "The Paris Eiffel Tower is by the Love Civic Center, so a brief photo stop can be combined with the nearby memorial or Trail de Paris. The local visitor organization lists the tower at 2025 South Collegiate Drive. Some other entries in the broader icon collection, including commercial venues, may have ticketing or limited hours; check with operators before making a detour."], links: [{ href: "https://www.visitamarillo.com/blog/post/cadillac-ranch/", label: "Visit Amarillo: Cadillac Ranch address and history" }, { href: "https://visitparistexas.com/eiffel-tower/", label: "Visit Paris Texas: Eiffel Tower address" }, { href: "https://texastimetravel.com/plan/trip-ideas/trip-ideas-roadside-heritage/", label: "Texas Time Travel: roadside heritage stops" }] },
      { heading: "Use oddities to build better road trips", body: ["For an Amarillo half-day, start at Cadillac Ranch west of town, return toward the Historic Sixth Street Route 66 district, and add a meal or another indoor stop if the weather turns. For an extended Panhandle driving day, follow the separate Route 66 heritage corridor through Shamrock and Adrian; allow time for the distance rather than promising every stop in a morning.", "In Northeast Texas, the Paris Eiffel Tower sits beside the Love Civic Center at 2025 South Collegiate Drive; the Red River Valley Veterans Memorial and Trail de Paris offer nearby additions. In San Antonio, the large cowboy-boots sculpture is a short urban photo stop, best paired with a separate museum or historic neighborhood. These are suggestions by proximity, not live driving-time, ticket-price or opening-hour guarantees."], links: [{ href: "/things-unique-to-texas/roadside-small-towns", label: "Texas roadside attractions and small towns" }] }
    ],
    related: [
      { href: "/things-unique-to-texas/roadside-small-towns", label: "Texas roadside and small-town icons", description: "The master list behind this guide." },
      { href: "/explore/trip-planner", label: "Plan a Texas road trip", description: "Combine oddities with major destinations and overnight stops." },
      { href: "/texas-history", label: "Texas history", description: "Put roadside architecture, town squares and local landmarks into context." }
    ]
  },
  "texas-slang-explained": {
    slug: "texas-slang-explained",
    eyebrow: "Words, sayings and symbols",
    title: "Texas Slang Explained: What Texans Mean When They Say It",
    dek: "Texas speech mixes Southern English, border influences, ranch vocabulary, regional sayings and a huge amount of affectionate exaggeration. Context matters more than a dictionary definition.",
    quickAnswer: "Texas slang is less a fixed vocabulary than a set of regional habits. Y'all is a normal second-person plural; all y'all emphasizes the whole group; fixin' to means about to; howdy is a real greeting; and phrases such as bigger than Dallas or all hat, no cattle work because they rely on shared Texas imagery. Not every Texan uses every phrase, and many expressions extend well beyond the state.",
    sections: [
      { heading: "Y'all and all y'all", body: ["Y'all is one of the most useful features of everyday Texas speech because English otherwise lacks a clear, casual second-person plural. It can address two people or a whole room without sounding formal.", "All y'all adds emphasis. It usually means the entire group rather than a subset: not just some of you, but every one of you. The distinction is intuitive in conversation even when speakers never think about the grammar behind it." ] },
      { heading: "Fixin' to", body: ["Fixin' to means preparing or intending to do something soon: fixin' to leave, fixin' to eat, fixin' to call. It does not usually mean repairing anything.", "The phrase is common across much of the South, which is an important reminder: Texas slang is not a sealed linguistic system. Texas shares language with neighboring regions while adding its own imagery and local meanings." ] },
      { heading: "Howdy", body: ["Howdy is real, not merely a cowboy-movie prop. In some places it is an everyday greeting; elsewhere it is used playfully or ceremonially. Texas A&M culture gives the word an especially visible public role, but the greeting is much broader than one campus.", "Tone does most of the work. A quick howdy can be as ordinary as hello, while an exaggerated howdy can signal friendliness, humor or deliberate Texas identity." ] },
      { heading: "All hat, no cattle", body: ["This phrase describes someone who projects status or expertise without the substance to support it. The ranch image makes the insult immediately legible: the person has invested in the costume but not the herd.", "It is popular because it travels well beyond literal ranching. Business, politics, sports and everyday conversation can all supply the 'hat' and the missing 'cattle.'" ] },
      { heading: "Bigger than Dallas", body: ["Bigger than Dallas is an older style of Texas exaggeration that uses a recognizable major-city image to describe something conspicuous or outsized. The exact frequency varies by generation and region, but the logic is pure Texas hyperbole.", "Many Texas sayings work this way. They do not need literal precision; they need a shared reference big enough to make the comparison land." ] },
      { heading: "Bless your heart: context is everything", body: ["Bless your heart is often described online as a disguised insult, but that is too simple. It can express genuine sympathy, affection, exasperation, condescension or criticism depending on tone and context.", "That ambiguity is exactly why slang guides should avoid treating spoken language like a codebook. Regional speech is social. Meaning lives in the relationship between speaker, listener and situation." ] },
      { heading: "Ranch and rodeo vocabulary", body: ["Words tied to cattle, horses, ranch work and rodeo remain visible far beyond people who work in those industries. Terms such as cowboy up, rodeo, stockyard, trail boss and wrangler carry cultural weight because ranching remains central to the public image and history of Texas.", "Some uses are literal; others are metaphorical. A good Texas glossary should make that distinction because modern speakers do not all use ranch vocabulary in the same way."], links: [{ href: "/sports-venues/rodeo-western", label: "Rodeo and Western Texas" }] },
      { heading: "Border language and bilingual Texas", body: ["Texas speech is also shaped by Spanish and by generations of bilingual communities. Food words, place names, family vocabulary and everyday code-switching are part of the state's language landscape, especially in South Texas, San Antonio, El Paso and other border-connected communities.", "This is not a novelty layer added to English-speaking Texas. Spanish-speaking communities predate the Republic and statehood, making bilingual influence foundational to Texas culture."], links: [{ href: "/article/texas-cultural-regions-explained", label: "Texas cultural regions explained" }] },
      { heading: "Symbols can act like language", body: ["The lone star, the Texas flag, bluebonnets, longhorns, armadillos and the outline of the state itself communicate identity without words. Texans put them on gates, shirts, trucks, businesses, tattoos and public buildings because the audience understands the shorthand.", "That visual vocabulary belongs beside slang and folklore. Together they explain how Texas identity is repeated in daily life, not just in museums or history books."], links: [{ href: "/texas-symbols", label: "Official Texas symbols" }] },
      { heading: "A short glossary in ordinary conversation", body: ["Y'all addresses more than one person: 'Are y'all coming to dinner?' All y'all emphasizes the entire group: 'Are all y'all coming, or just a few?' Neither example should be treated as uniquely Texas; both are recognizable across Southern English.", "Fixin' to signals an immediate intention: 'I'm fixin' to head out.' All hat, no cattle describes a mismatch between image and substance. Bless your heart can express real compassion or a pointed dismissal; the speaker's relationship and tone determine which meaning listeners hear."], links: [{ href: "/things-unique-to-texas/slang-folklore", label: "See sayings beside symbols and folklore" }] },
      { heading: "What the research can—and cannot—show", body: ["University of Texas at Austin researchers assembled the Spanish in Texas Corpus from real speech samples to study variation and bilingual usage. It is a stronger starting point for claims about Spanish-English speech than invented blanket rules about the Texas accent.", "The examples above illustrate meaning rather than providing a frequency survey. Texas residents speak many varieties of English and Spanish, as well as other languages; not every expression belongs to every community. A dictionary entry and an oral-history corpus answer different questions."], links: [{ href: "https://coerll.utexas.edu/coerll/project/spanishtx/", label: "University of Texas: Spanish in Texas Corpus" }] },
      { heading: "What not to assume about Texas speech", body: ["No single accent or vocabulary represents 30 million Texans. East Texas, the Panhandle, the Rio Grande Valley, El Paso, the Gulf Coast, Central Texas and the state's major metros all sound different, and migration keeps changing them.", "Use Texas slang as a cultural guide, not a stereotype checklist. The most interesting question is not whether every Texan says a phrase; it is where the phrase came from, where it survives and what image makes it meaningful." ] }
    ],
    related: [
      { href: "/things-unique-to-texas/slang-folklore", label: "Texas slang, symbols and folklore", description: "The broader index of sayings, symbols, superstitions and identity markers." },
      { href: "/texas-symbols", label: "Official Texas symbols", description: "State-designated birds, flowers, foods and other official emblems." },
      { href: "/article/texas-cultural-regions-explained", label: "Texas cultural regions explained", description: "Why language, food and identity shift across the state." }
    ]
  }
};

export function getTexasEvergreenGuide(slug: string) {
  return TEXAS_EVERGREEN_GUIDES[slug];
}
