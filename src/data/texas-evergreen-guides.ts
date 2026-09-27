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
          "Build the route outward instead of crisscrossing the state. Taylor adds Louie Mueller Barbecue, Lexington adds Snow's BBQ and Elgin adds Southside Market & Barbeque. Together they make a practical corridor for comparing smokehouses, sausage traditions and town identities without pretending one tray represents every Texas barbecue style."
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
          "Carry the route south and the story changes again. Vera's Backyard Bar-B-Que in Brownsville preserves a barbacoa de cabeza tradition tied to underground-pit cooking. That is why a useful South Texas food itinerary should connect neighborhoods and communities instead of flattening everything into one Tex-Mex label."
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
          "Joe's Bakery & Coffee Shop anchors the TexasDefined profile set with East Austin family history, while Matt's El Rancho shows how a long-running Austin Tex-Mex institution can belong to the same day without serving the same purpose. Use the dedicated breakfast-taco guide for the broader regional story."
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
          "The value is in the contrast. A Texas steakhouse guide should connect beef to cattle history, ranching and place rather than treating every steak dinner as interchangeable upscale dining."
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
          "These are useful anchors for a broader comfort-food route because they connect everyday dishes to specific businesses and towns instead of relying on generic lists of state foods."
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
          "Use these profiles as entry points, not exhaustive city rankings. The useful focus is on durable institutions and how they connect to the larger city, county and cultural story."
        ],
        links: [
          { href: "/food/el-fenix-downtown-dallas", label: "El Fenix" },
          { href: "/food/matts-el-rancho-austin", label: "Matt's El Rancho" },
          { href: "/food/scholz-garten-austin", label: "Scholz Garten" },
          { href: "/food/joes-bakery-austin", label: "Joe's Bakery & Coffee Shop" }
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
    quickAnswer: "The classic Texas roadside-oddity route includes Cadillac Ranch near Amarillo, the giant cowboy boots in San Antonio, the World's Largest Honky-Tonk in Fort Worth, quirky Hill Country stops, tiny West Texas towns and a long list of oversized or unexpected local landmarks. The best strategy is to use oddities as anchors between major destinations, not as isolated one-off drives.",
    sections: [
      { heading: "Start with the Panhandle: Cadillac Ranch and Route 66 energy", body: ["Cadillac Ranch is the perfect Texas roadside symbol because it is both public art and a deliberately absurd roadside interruption. The partly buried cars west of Amarillo turn a flat Panhandle horizon into one of the most recognizable photo stops in the state.", "The larger Panhandle route can include Amarillo, Route 66-era architecture, Palo Duro Canyon and small towns along old highway corridors. That mix makes the oddity feel connected to place rather than detached from it."], links: [{ href: "/explore/top-attractions", label: "Top Texas attractions" }] },
      { heading: "San Antonio goes oversized", body: ["San Antonio's giant cowboy boots are exactly the kind of object that belongs on a Texas roadside list: instantly legible, intentionally oversized and rooted in the visual language of the state. They work best as a quick detour inside a much larger city itinerary.", "That is the rule for urban oddities. Do not build an entire day around one photo. Combine the stop with a neighborhood, museum, historic site, food hall or mission so the novelty becomes part of a useful travel plan."] },
      { heading: "Fort Worth turns Western identity into spectacle", body: ["The Fort Worth Stockyards already blur the line between working history, tourism and performance. Billy Bob's Texas pushes that scale even farther, turning the honky-tonk into an attraction in its own right.", "For TexasDefined, this kind of stop matters because it explains how the state packages Western heritage for modern visitors. Cattle drives, dance halls, neon signs, rodeo imagery and giant venues all become part of the same visual language."], links: [{ href: "/sports-venues/rodeo-western", label: "Texas rodeo and Western venues" }] },
      { heading: "Tiny towns can be the attraction", body: ["Texas is full of communities where the draw is not one landmark but the experience of being somewhere small, remote or unexpectedly distinctive. Terlingua, Luckenbach, Marfa, Round Top and dozens of courthouse-square towns each prove that scale is not the same thing as significance.", "A successful small-town page should answer the practical question the novelty list cannot: what else is nearby? Food, lodging, scenic drives, parks, museums and neighboring towns turn a curiosity into a weekend."], links: [{ href: "/explore/trip-planner", label: "Texas trip planner" }] },
      { heading: "Courthouse squares and old commercial streets", body: ["Not every roadside stop has to be weird in a kitschy way. Texas courthouse squares, old theaters, ghost signs and brick commercial blocks create a quieter kind of discovery. They reward slow travel and make small towns visually distinct even when there is no headline attraction.", "These are ideal connective tissue for a road trip: a coffee stop, short walk, antique store and courthouse photo can break up long drives while exposing travelers to architecture and local history."], links: [{ href: "/article/texas-courthouses-town-square", label: "Texas courthouses and town squares" }] },
      { heading: "Neon, signs and the disappearing roadside", body: ["Old motel signs, drive-in marquees, painted walls and vintage service-station architecture preserve the visual culture of highway travel. Their appeal is partly nostalgic, but they also document how towns competed for attention before travelers navigated by phone.", "Because these places change quickly, roadside guides should be maintained as living editorial collections. A sign can disappear, a business can close and a once-abandoned property can be restored." ] },
      { heading: "Roadside art is its own Texas category", body: ["From Cadillac Ranch to murals, sculpture gardens and improvised folk-art environments, Texas roadside art often grows from local personality rather than formal institutions. Some works are famous; others are known mostly to the community around them.", "The best editorial treatment distinguishes between permanent public art, commercial photo opportunities and fragile folk-art sites. That helps travelers understand what they are seeing and how respectfully to visit." ] },
      { heading: "Use oddities to build better road trips", body: ["A list of weird stops is fun, but a route is more useful. Group attractions by corridor and travel time: Panhandle and Route 66, Hill Country, Dallas-Fort Worth, San Antonio, Gulf Coast, East Texas and far West Texas.", "Then add one practical layer: where to eat, where to stay, what major attraction is nearby and whether the detour is worth 10 minutes or half a day. That is how a novelty page becomes durable travel content."], links: [{ href: "/things-unique-to-texas/roadside-small-towns", label: "Texas roadside attractions and small towns" }] }
    ],
    related: [
      { href: "/things-unique-to-texas/roadside-small-towns", label: "40 Texas roadside and small-town icons", description: "The master list behind this guide." },
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
      { heading: "Bigger than Dallas", body: ["Bigger than Dallas is an older style of Texas exaggeration that uses the state's largest urban imagery to describe something conspicuous or outsized. The exact frequency varies by generation and region, but the logic is pure Texas hyperbole.", "Many Texas sayings work this way. They do not need literal precision; they need a shared reference big enough to make the comparison land." ] },
      { heading: "Bless your heart: context is everything", body: ["Bless your heart is often described online as a disguised insult, but that is too simple. It can express genuine sympathy, affection, exasperation, condescension or criticism depending on tone and context.", "That ambiguity is exactly why slang guides should avoid treating spoken language like a codebook. Regional speech is social. Meaning lives in the relationship between speaker, listener and situation." ] },
      { heading: "Ranch and rodeo vocabulary", body: ["Words tied to cattle, horses, ranch work and rodeo remain visible far beyond people who work in those industries. Terms such as cowboy up, rodeo, stockyard, trail boss and wrangler carry cultural weight because ranching remains central to the public image and history of Texas.", "Some uses are literal; others are metaphorical. A good Texas glossary should make that distinction instead of pretending every modern speaker uses ranch vocabulary in the same way."], links: [{ href: "/sports-venues/rodeo-western", label: "Rodeo and Western Texas" }] },
      { heading: "Border language and bilingual Texas", body: ["Texas speech is also shaped by Spanish and by generations of bilingual communities. Food words, place names, family vocabulary and everyday code-switching are part of the state's language landscape, especially in South Texas, San Antonio, El Paso and other border-connected communities.", "This is not a novelty layer added to English-speaking Texas. Spanish-speaking communities predate the Republic and statehood, making bilingual influence foundational to Texas culture."], links: [{ href: "/article/texas-cultural-regions-explained", label: "Texas cultural regions explained" }] },
      { heading: "Symbols can act like language", body: ["The lone star, the Texas flag, bluebonnets, longhorns, armadillos and the outline of the state itself communicate identity without words. Texans put them on gates, shirts, trucks, businesses, tattoos and public buildings because the audience understands the shorthand.", "That visual vocabulary belongs beside slang and folklore. Together they explain how Texas identity is repeated in daily life, not just in museums or history books."], links: [{ href: "/texas-symbols", label: "Official Texas symbols" }] },
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
