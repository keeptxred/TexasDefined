import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const texasTreesGuideArticle: Article = {
  id: "evergreen-texas-trees-guide",
  brandId: "texasdefined",
  slug: "texas-trees-guide",
  title: "Texas Trees Explained: Live Oak, Pecan, Mesquite, Cedar, Pine and More",
  dek: "Texas trees change almost as dramatically as Texas itself. Live oaks spread across limestone country, loblolly pines rise over East Texas, pecans follow rivers, mesquite thrives in dry country and the so-called cedar of the Hill Country is really a juniper. Here is how to read the state by its trees.",
  category: "outdoors",
  hero: {
    src: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1600&q=82",
    alt: "Sunlight filtering through a mature woodland canopy that evokes the varied forests of Texas",
    width: 1600,
    height: 1067,
    credit: "Unsplash",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-13",
  readingMinutes: 14,
  tags: [
    "texas trees",
    "live oak",
    "pecan tree",
    "mesquite",
    "ashe juniper",
    "loblolly pine",
    "texas forests",
    "native trees",
  ],
  featured: true,
  sourceName: "Texas A&M Forest Service",
  sourceUrl: "https://tfsweb.tamu.edu/forest-land/texas-forests/",
  internalLinks: [
    {
      href: "/article/texas-regions-explained",
      label: "Texas regions explained",
      description: "See how landscape, climate and culture change across the major regions of Texas.",
    },
    {
      href: "/article/texas-hill-country-what-makes-it",
      label: "What makes the Texas Hill Country the Hill Country?",
      description: "Limestone, rivers, live oaks and juniper are part of the region's visual identity.",
    },
    {
      href: "/article/best-native-plants-texas-yard",
      label: "Best native plants for a Texas yard",
      description: "Build a home landscape around plants suited to your part of the state.",
    },
    {
      href: "/article/texas-wildflowers-guide",
      label: "Texas wildflowers: what blooms, where and when",
      description: "Pair the tree canopy with the seasonal flowers that define Texas roadsides and open country.",
    },
    {
      href: "/explore/outdoors",
      label: "Explore Texas outdoors",
      description: "Find parks, wildlife areas and landscapes where Texas tree communities are easy to see.",
    },
    {
      href: "https://tfsweb.tamu.edu/trees/",
      label: "Texas A&M Forest Service tree resources",
      description: "Official Texas tree identification, care, health and forestry resources.",
    },
    {
      href: "https://texastreeid.tamu.edu/",
      label: "Texas Tree ID",
      description: "Texas A&M Forest Service identification profiles, photographs and distribution information.",
    },
    {
      href: "https://tfsweb.tamu.edu/trees/tree-health/diseases/texas-oak-wilt/",
      label: "Texas oak wilt guidance",
      description: "Official diagnosis, prevention and management information for one of the state's most important oak diseases.",
    },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("Texas does not have one tree landscape. It has many. Drive east and pines begin to close around the highway. Cross North Texas and post oak country alternates with prairie. Move into the Hill Country and the silhouettes change again: spreading live oaks, dark junipers and limestone slopes. Keep going west and mesquite, pinyon, madrone and desert-adapted trees take over where enough moisture and elevation allow them to grow."),
    p("That variety is not a side detail. Trees are one of the easiest ways to understand where you are in Texas. The Texas A&M Forest Service currently counts about 59 million acres of forest land statewide, second only to Alaska, and describes forest types ranging from East Texas pine timberlands to live-oak mottes, mesquite and juniper woodlands, and mountain forests in the west."),
    p("The useful way to learn Texas trees is not to memorize hundreds of species. Start with the trees that define the big landscapes. Once you can recognize live oak, pecan, mesquite, Ashe juniper, loblolly pine, post oak, cedar elm and baldcypress, the state begins to look different from the road."),

    h("1. Live oak: the tree Texans picture when they picture shade"),
    p("Few trees look more Texan than a mature live oak with heavy limbs spreading outward over a yard, ranch road, courthouse lawn or coastal pasture. The broad crown can create an outdoor room beneath it, which is one reason old live oaks so often become landmarks rather than just landscaping."),
    p("The name 'live oak' can hide some botanical complexity. Southern live oak, Quercus virginiana, is common in warmer coastal and southeastern landscapes, while Texas or plateau live oak, Quercus fusiformis, is strongly associated with Central and South Texas. To a casual observer they share the same essential character: evergreen-to-semi-evergreen foliage, dense shade, spreading structure and an ability to become part of a place's identity for generations."),
    p("Live oaks are especially important to the look of the Hill Country, but they are not invincible. Oak wilt is a major Texas concern. The Texas A&M Forest Service notes that live oaks can share interconnected root systems, allowing the oak-wilt fungus to move from tree to tree underground. That is why an apparently isolated problem can become a neighborhood or ranch-scale problem."),

    h("2. Pecan: the official state tree that follows water"),
    p("The pecan is Texas's state tree, designated by the Legislature in 1919, and it is one of the state's most widely distributed native trees. Wild pecans are most at home in rich bottomland soils near rivers and creeks, which means a line of old pecans can sometimes tell you where the dependable water is before you see the channel itself."),
    p("A mature pecan can become enormous. Texas A&M Forest Service describes the species as capable of reaching about 120 feet, with a broad crown when grown in the open. In yards and orchards, that size is both the appeal and the warning: a pecan is a long-term landscape decision, not a small ornamental tree that can be squeezed between a driveway and a foundation."),
    p("Pecans also bridge wild Texas and cultivated Texas. Native bottomland trees, commercial orchards, backyard shade trees and named pecan varieties are all part of the same story. The nuts made the tree economically useful, but the species was important long before modern orchards because it naturally occupied river corridors across much of the state."),

    h("3. Mesquite: survivor, shade tree, brush and symbol of dry Texas"),
    p("Mesquite is one of the great shape-shifters of the Texas landscape. It can be a small thorny tree, a multi-stemmed thicket, a ranch-management headache, a wildlife plant, a source of cooking wood or the only meaningful shade on an exposed piece of country."),
    p("Honey mesquite is the most common mesquite in Texas. Texas A&M AgriLife describes it as a small-to-medium tree or shrub found broadly across dry Texas ranges. Its tiny leaflets cast filtered rather than dense shade, and its long bean pods are eaten by wildlife and livestock, although heavy consumption can create animal-health problems."),
    p("Calling mesquite simply 'bad brush' misses the point. Whether it is desirable depends on the land and the goal. The Texas A&M Forest Service uses the same logic in vegetation management: woody plants can provide wildlife habitat, reduce erosion and add diversity, yet the same species can be considered brush when it is overabundant or conflicts with how the land is being managed."),

    h("4. 'Cedar' in Central Texas is usually Ashe juniper"),
    p("One of the first Texas tree-language lessons is that the Hill Country's famous 'cedar' is usually not a true cedar. Mountain cedar is the common name Texans often use for Ashe juniper, Juniperus ashei. It thrives on rocky limestone country and can form dense evergreen stands across parts of Central Texas."),
    p("Ashe juniper is ecologically important and culturally controversial. Landowners may thin it where it has become dense, yet the tree provides cover, food and habitat. In winter it also produces one of Central Texas's most notorious seasonal phenomena: cedar fever. Texas A&M Forest Service explains that only male junipers release the huge quantities of windborne pollen associated with the winter allergy season."),
    p("The tree is so visually tied to Central Texas that many people stop noticing it. Look again. Its dark evergreen foliage is part of the contrast that makes pale limestone, tan winter grass and spreading live-oak crowns read instantly as Hill Country."),

    h("5. Loblolly pine: when Texas starts looking like a forest state"),
    p("East Texas rewrites the stereotype of Texas as open, dry country. Loblolly pine is the dominant visual clue. Tall, straight trunks and evergreen crowns create the vertical landscape of the Piney Woods, where rainfall and deeper soils support a commercial forest economy that looks nothing like ranch country farther west."),
    p("Loblolly pine, Pinus taeda, is native to the East Texas Piney Woods and the Lost Pines. Texas A&M Forest Service calls it the most common native pine used in East Texas forestry, alongside native shortleaf and longleaf pine and managed slash pine in appropriate areas."),
    p("The species matters economically as timber, ecologically as forest habitat and culturally because pine country has its own architecture, industries, recreation and sense of place. If a Hill Country road is framed by limestone and live oak, an East Texas road can feel enclosed by trunks rising almost straight out of the forest floor."),

    h("6. Post oak and blackjack oak: the Cross Timbers trees"),
    p("Between the Piney Woods and the open plains is a broad belt where oaks once formed dense wooded bands that early travelers found difficult to cross. The Cross Timbers are strongly associated with post oak and blackjack oak, two tough species adapted to relatively dry uplands and sandy or rocky soils."),
    p("Post oak does not usually have the enormous spreading romance of an old live oak, but it may be even more useful as a geographic clue. In North and north-central Texas, post-oak country often appears as irregular woodland woven through grassland and development."),
    p("These oak systems also remind us that 'forest' does not always mean a tall closed canopy. Texas forest land includes woodlands, savannas and transition zones where trees and grass share the landscape."),

    h("7. Cedar elm: the adaptable everyday native"),
    p("Cedar elm may not be the first tree on a Texas postcard, but it is one of the state's dependable workhorses. It grows across much of East, Central and South Texas and can handle sites ranging from stream bottoms to dry limestone hills."),
    p("That adaptability helps explain why cedar elm is common in both natural landscapes and planted urban settings. It is deciduous, can become a substantial shade tree and often develops yellow to orange-red fall color. Unlike many native trees that advertise a specific region, cedar elm quietly works across several of them."),
    p("For homeowners, that makes it worth knowing by name. A healthy mature cedar elm is not just 'some tree' in the yard; it is one of the native species that can bridge urban Texas and the surrounding natural landscape."),

    h("8. Baldcypress: the tree that makes East Texas water look ancient"),
    p("Baldcypress belongs to wet Texas. Its flared trunks, feathery foliage and ability to stand along rivers, sloughs and lake margins give places such as Caddo Lake their almost prehistoric atmosphere."),
    p("Despite being a conifer, baldcypress drops its foliage, which explains the 'bald' part of the name. In the right habitat it can become a massive, long-lived tree. In East Texas wetlands, its trunks and knees turn the shoreline itself into part of the scenery."),
    p("Baldcypress is a reminder that Texas has swamp and bottomland forest as surely as it has desert and prairie. A statewide tree guide that stops at mesquite and live oak leaves out an entire Texas landscape."),

    h("9. Cottonwood: a flag for water in open country"),
    p("In the drier half of Texas, cottonwoods can function like living signposts. Their tall crowns often appear along rivers, creeks, irrigation corridors and other places where the roots can reach reliable moisture."),
    p("From a distance, a ribbon of cottonwoods crossing otherwise open land can reveal drainage before the road dips toward it. That pattern is one reason trees are so useful for reading geography: species are responding to soil and water conditions that may not be obvious from the windshield."),

    h("10. Texas madrone and pinyon: western trees that break the stereotype"),
    p("Far West Texas adds another set of trees entirely. Higher elevations in the Davis, Guadalupe and Chisos mountain country can support pinyon, juniper, oak and other mountain species that would look out of place on the Gulf Coast."),
    p("Texas madrone is one of the most memorable. Its smooth, peeling bark can reveal warm red, orange and cream tones, making it visually unlike the rough-barked oaks and mesquites most Texans know. It is not a tree most residents will see in a suburban yard, but in the western mountains it helps explain how elevation can change vegetation even within an arid region."),

    h("The quickest way to read Texas by its trees"),
    list(
      "Piney Woods: loblolly and shortleaf pine mixed with hardwoods, magnolia, sweetgum and bottomland trees.",
      "Gulf Coast: live oak, pecan, elm, hackberry and wetland trees where drainage allows them.",
      "Hill Country and Edwards Plateau: live oak and Ashe juniper over limestone, with pecan and cypress along water.",
      "Cross Timbers and North Texas: post oak, blackjack oak, cedar elm and mixed prairie woodland.",
      "South Texas: mesquite, live oak, huisache and thorny woody species adapted to heat and irregular rain.",
      "West Texas: mesquite in the low country and pinyon, juniper, oak, madrone and other mountain trees at elevation.",
      "River corridors statewide: pecan, cottonwood, willow, elm and other species reveal where moisture persists.",
    ),

    h("Why a tree can be valuable in one place and 'brush' in another"),
    p("Texas land management produces arguments that sound contradictory until you understand the objective. One person protects every mesquite. Another spends money removing mesquite. One rancher clears juniper. Another manages juniper for wildlife cover. Both can be making rational decisions."),
    p("Trees compete for water, affect grass production, change wildlife habitat, influence wildfire behavior and alter how land can be used. Density matters as much as species. A few well-placed trees can add shade and habitat; a dense stand in the wrong place can create a different set of problems."),
    p("That is why the better question is rarely 'Is this tree good or bad?' Ask what ecosystem it belongs to, how dense it is, what depends on it and what the landowner is trying to accomplish."),

    h("Oak wilt changes how Texans should think about oak care"),
    p("Oak wilt deserves special attention because oaks are so important to Texas landscapes. The Texas A&M Forest Service describes oak wilt as one of the most destructive tree diseases in the United States and says it is killing oaks in Central and West Texas at epidemic proportions."),
    p("All oaks can be infected, but different oak groups play different roles in spread. Red oaks can form fungal mats that attract sap-feeding beetles, while live oaks can move the disease through shared root systems. That biology is why diagnosis and management should be based on official guidance rather than generic advice copied from another state."),
    p("If you suspect oak wilt, treat it as a tree-health problem worth identifying correctly before cutting, pruning or assuming drought is the cause. Texas A&M Forest Service maintains current oak-wilt resources and diagnostic guidance."),

    h("Planting a Texas tree: match the region before you match the look"),
    p("A tree can be native to Texas and still be a poor choice for your yard. Texas is too large for 'native to the state' to be enough. A loblolly pine that loves East Texas rainfall is not automatically a good fit for a dry alkaline site near Midland. A desert-adapted tree may hate a poorly drained Gulf Coast yard."),
    p("Texas A&M Forest Service's planting guidance starts with the same principle: select the right tree for the location and give its canopy and roots enough space. Planting too deep, improper watering and girdling roots are among the common causes of establishment failure."),
    list(
      "Start with region and soil: clay, sand, limestone, bottomland and desert soils support different trees.",
      "Check drainage after heavy rain; wet feet eliminate many otherwise tough species.",
      "Plan for mature width as seriously as mature height.",
      "Keep large trees away from structures and infrastructure that cannot accommodate future roots and limbs.",
      "Water new trees for establishment even when the mature species is drought tolerant.",
      "Use Texas Tree ID and local extension or forestry guidance when species identification matters.",
    ),

    h("The trees are part of what makes the regions feel different"),
    p("Texas trees are geography made visible. Pines tell you about East Texas moisture. Pecans and cottonwoods reveal water. Mesquite tells you about heat and dryness. Live oak and Ashe juniper turn limestone country into the Hill Country. Baldcypress makes a wetland feel older than the road that brought you there."),
    p("Once you learn the major species, a drive across Texas becomes easier to read. The change from prairie to post oak, from post oak to pine, or from live oak to mesquite is no longer just scenery passing the window. It is the state changing underneath you."),
  ],
};
