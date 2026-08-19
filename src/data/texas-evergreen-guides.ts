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
    dek: "Texas food is not one cuisine. It is barbecue smoke, border cooking, Czech and German baking, Gulf seafood, ranch food, fair food and small-town institutions layered across a very large state.",
    quickAnswer: "For a first Texas food road trip, build around Central Texas barbecue, San Antonio Tex-Mex, Czech-Texan bakeries around West, Gulf seafood, Hill Country peaches, East Texas catfish and a few deeply Texas institutions such as H-E-B, Whataburger, Blue Bell and Buc-ee's. The point is not to chase one famous restaurant; it is to understand how geography and migration changed what Texans eat.",
    sections: [
      {
        heading: "1. Central Texas barbecue country",
        body: [
          "Brisket is the headline, but the deeper story is the old meat-market tradition that linked cattle, German and Czech communities, smokehouses and small-town commerce. A classic Central Texas tray puts sliced brisket beside sausage, ribs, pickles, onions and simple bread, letting smoke and rendered fat carry most of the flavor.",
          "Treat barbecue as a region rather than a single stop. Lockhart, Taylor, Lexington, Elgin and the wider Austin corridor each contribute to the story, and modern pits now reinterpret the tradition across the state. If you only order brisket, you miss how sausage and market-style service explain where the cuisine came from."
        ],
        links: [{ href: "/article/texas-barbecue-styles-explained", label: "Texas barbecue styles explained" }]
      },
      {
        heading: "2. San Antonio Tex-Mex and puffy tacos",
        body: [
          "San Antonio is one of the best places to understand Tex-Mex as a living city cuisine rather than a generic restaurant category. Puffy tacos, enchiladas, chile con carne, queso, carne guisada and breakfast tacos all overlap here, with family restaurants and neighborhood institutions often mattering as much as polished downtown dining.",
          "A good San Antonio food day mixes formats: breakfast tacos in the morning, a puffy taco or enchilada plate later, then something completely different around the River Walk, the Pearl or an older neighborhood. The contrast is the point."
        ],
        links: [{ href: "/explore", label: "Explore Texas destinations" }]
      },
      {
        heading: "3. Breakfast tacos from the Rio Grande Valley to Austin",
        body: [
          "Breakfast tacos are one of the most ordinary and most revealing Texas foods. Flour tortillas carry eggs, potatoes, beans, bacon, chorizo, carne guisada, barbacoa or migas, and every city has opinions about the correct tortilla, salsa and filling ratio.",
          "They are especially useful for travelers because the best experience is often not a destination restaurant at all. It can be a bakery, taqueria, gas-station counter or neighborhood drive-through. That everyday quality is part of what makes the breakfast taco so distinctly Texan."
        ]
      },
      {
        heading: "4. Czech-Texan kolaches and klobasneks",
        body: [
          "Central Texas communities shaped by Czech immigration created one of the state's great road-food traditions. Sweet kolaches use fruit, cheese or poppy-seed fillings, while the savory sausage-filled pastries many Texans casually call kolaches are more properly described as klobasneks.",
          "West is the best-known stop, but the larger story extends through Czech-Texan communities across Central Texas. Pair a bakery stop with historic churches, dance halls or town squares and the pastry becomes part of a broader cultural landscape rather than just a snack."
        ],
        links: [{ href: "/explore/painted-churches", label: "Painted Churches of Texas" }]
      },
      {
        heading: "5. German-Texan sausage, beer and Hill Country food",
        body: [
          "German settlement left a durable mark on the Hill Country and Central Texas table through smoked sausage, meat markets, beer culture, bakeries and community festivals. Towns such as Fredericksburg, New Braunfels and surrounding communities connect food with architecture, music and settlement history.",
          "This is also where a food itinerary can become a broader weekend route: market sausage, a bakery, a historic district, a dance hall, wineries or breweries, and nearby parks all fit naturally into the same trip."
        ],
        links: [{ href: "/things-unique-to-texas/culture-music", label: "Texas culture and music traditions" }]
      },
      {
        heading: "6. Gulf Coast seafood",
        body: [
          "The Texas coast adds shrimp, oysters, redfish, snapper, crab and Cajun-influenced crawfish culture to the state food map. Galveston, the upper coast, Corpus Christi and communities farther south each combine working-waterfront traditions with vacation-town dining.",
          "Look beyond fried platters. A strong coastal food trip can include seafood markets, oyster bars, blackened or grilled Gulf fish, shrimp dishes, fish tacos and seasonal crawfish. The best meals often make more sense when paired with the bay, harbor or beach that supplied the culinary identity."
        ],
        links: [{ href: "/explore/outdoors", label: "Texas coast and outdoors" }]
      },
      {
        heading: "7. East Texas fish fries and comfort food",
        body: [
          "Cornmeal-fried catfish, hushpuppies, beans, greens and homestyle sides connect East Texas to Southern food traditions and to the lakes and rivers that define much of the region. Fish camps and modest local restaurants can be as culturally important as celebrated destination dining rooms.",
          "This part of the trail works especially well with a lake trip. Fishing, a small-town square and a catfish dinner make a coherent TexasDefined itinerary instead of three unrelated stops."
        ],
        links: [{ href: "/fishing", label: "Texas fishing guides" }]
      },
      {
        heading: "8. Hill Country peaches, pecans and seasonal Texas",
        body: [
          "Texas food changes with the calendar. Hill Country peaches around Fredericksburg and Stonewall, pecans across large parts of the state and spring or summer produce stands turn roadside travel into a seasonal ritual.",
          "That seasonality matters for trip planning. A place can be worth visiting for only a few weeks at peak harvest, which is why produce stands, orchards and small-town festivals should be treated as time-sensitive travel experiences rather than permanent attractions."
        ],
        links: [{ href: "/events", label: "Texas events" }]
      },
      {
        heading: "9. State Fair food and Texas spectacle",
        body: [
          "The State Fair of Texas turns food into theater. Corny dogs are the enduring symbol, but the broader tradition is experimentation: frying, stacking, stuffing and exaggerating familiar foods until eating becomes part of the fairground spectacle.",
          "This is a different side of Texas food from barbecue or border cuisine, but it belongs in the same story. It shows how deeply the state embraces food as entertainment, ritual and identity."
        ]
      },
      {
        heading: "10. The institutions Texans argue about",
        body: [
          "Whataburger, H-E-B, Blue Bell, Shipley Do-Nuts, Shiner, Buc-ee's and other Texas-rooted institutions inspire unusually personal loyalty. They are not substitutes for independent restaurants, but they help explain everyday Texas habits: the road-trip stop, the grocery run, the late-night burger, the doughnut box and the ice cream in the freezer.",
          "Use them as punctuation marks in a trip rather than the whole itinerary. A Buc-ee's stop makes sense between destinations; an H-E-B visit can reveal regional products; a Blue Bell detour can connect Brenham to a larger Washington County route."
        ],
        links: [{ href: "/things-unique-to-texas/texas-brands", label: "Legendary Texas brands" }]
      }
    ],
    related: [
      { href: "/things-unique-to-texas/food-drink", label: "35 iconic Texas foods and drinks", description: "The larger TexasDefined food index, from brisket and queso to ranch water and venison sausage." },
      { href: "/explore/trip-planner", label: "Build a Texas trip", description: "Turn food regions into a multi-stop itinerary." },
      { href: "/article/texas-cultural-regions-explained", label: "Texas cultural regions explained", description: "Understand why the state's food changes from one region to another." }
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
