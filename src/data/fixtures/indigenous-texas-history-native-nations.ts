import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });
const image = (src: string, alt: string, width: number, height: number, credit: string, caption: string): ArticleBlock => ({
  type: "image",
  image: { src, alt, width, height, credit },
  caption,
});

export const indigenousTexasHistoryNativeNationsArticle: Article = {
  id: "evergreen-indigenous-texas-history-native-nations",
  brandId: "texasdefined",
  slug: "indigenous-texas-history-native-nations",
  title: "Indigenous Texas History: Native Nations Before European Colonization",
  dek: "Texas history begins thousands of years before Spanish maps or the Republic. This guide follows the Native peoples, homelands, trade networks and living nations that shaped the region before and after European colonization.",
  category: "texas-history",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Grass_House_Caddo_Mounds_SHS_Texas_2026.jpg?width=1600",
    alt: "Replica Caddo grass house at Caddo Mounds State Historic Site in Cherokee County, Texas",
    width: 1600,
    height: 1066,
    credit: "Larry D. Moore · 2026 · CC BY 4.0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-09-26",
  updatedAt: "2026-09-27",
  readingMinutes: 20,
  tags: [
    "Indigenous Texas",
    "Native American history Texas",
    "Caddo",
    "Karankawa",
    "Tonkawa",
    "Lipan Apache",
    "Comanche",
    "Tigua",
    "Alabama-Coushatta",
    "Kickapoo",
    "Texas archaeology",
    "Texas before colonization",
  ],
  featured: true,
  sourceName: "Texas Historical Commission — Indigenous Texas and Exploration",
  sourceUrl: "https://learning.thc.texas.gov/texas-history/indigenous-texas/",
  internalLinks: [
    { href: "/article/texas-before-united-states-how-texas-began", label: "Texas before the United States", description: "Continue from Indigenous homelands through Spanish and Mexican Texas, the Revolution, Republic, annexation and statehood." },
    { href: "/article/caddo-texas-history-homelands-mounds-removal", label: "Caddo in Texas", description: "Go deeper on mound centers, agriculture, trade networks, diplomacy and forced removal from East Texas." },
    { href: "/article/comanche-texas-history-comancheria-red-river-war", label: "Comanche Texas", description: "Follow Comanchería, the horse and bison economy, diplomacy, settlement pressure and the Red River War." },
    { href: "/article/living-tribal-nations-texas-today", label: "Tribal nations in Texas today", description: "Understand contemporary sovereignty through the Alabama-Coushatta Tribe of Texas, Ysleta del Sur Pueblo and the Kickapoo Traditional Tribe of Texas." },
    { href: "/article/texas-red-river-war-guide", label: "The Red River War in Texas", description: "Follow the 1874–1875 campaign and its consequences across the Panhandle." },
    { href: "/destination/seminole-canyon-state-park-and-historic-site", label: "Seminole Canyon State Park & Historic Site", description: "Explore Lower Pecos rock art and a cultural landscape with roughly 12,000 years of human history." },
    { href: "/destination/caddo-mounds-state-historic-site", label: "Caddo Mounds State Historic Site", description: "Visit one of the clearest surviving landscapes for understanding ancestral Caddo civic, ceremonial and trade networks." },
    { href: "/destination/hueco-tanks-state-park-and-historic-site", label: "Hueco Tanks State Park & Historic Site", description: "Explore a protected West Texas cultural landscape with rock imagery, water sources and evidence of repeated human use across thousands of years." },
    { href: "/destination/ysleta-del-sur-pueblo-cultural-center-museum-el-paso", label: "Ysleta del Sur Pueblo Cultural Center Museum", description: "Learn from a living Pueblo institution operated by the Tigua community in El Paso." },
    { href: "/destination/lipantitlan", label: "Lipantitlán State Historic Site", description: "Connect Lipan Apache history with later Mexican and Texas Revolution layers in South Texas." },
    { href: "/destination/mission-dolores", label: "Mission Dolores State Historic Site", description: "Read an East Texas mission landscape through the Native communities whose lives were changed by Spanish colonization." },
    { href: "/article/texas-borderlands-historic-sites-guide", label: "Texas borderlands historic sites", description: "Connect Pueblo, Spanish, Mexican, Tejano and Indigenous histories across El Paso, South Texas and East Texas." },
    { href: "/county/cherokee", label: "Cherokee County", description: "Use the county guide to connect Caddo Mounds with the surrounding Piney Woods landscape." },
    { href: "/county/el-paso", label: "El Paso County", description: "Explore Tigua, mission, borderlands and Rio Grande histories in far West Texas." },
    { href: "/county/polk", label: "Polk County", description: "Connect the Piney Woods to the Alabama-Coushatta Tribe of Texas and its present-day sovereign community." },
  ],
  relatedCollections: [],
  relatedDestinations: [
    "caddo-mounds-state-historic-site",
    "seminole-canyon-state-park-and-historic-site",
    "hueco-tanks-state-park-and-historic-site",
    "ysleta-del-sur-pueblo-cultural-center-museum-el-paso",
    "lipantitlan",
    "mission-dolores",
    "old-socorro-mission",
  ],
  body: [
    p("Texas history does not begin with Spain, Mexico, the Republic or the United States. People lived across the region now called Texas for thousands of years before Europeans arrived, building societies adapted to forests, plains, coasts, deserts, river valleys and canyonlands. Some communities farmed permanent villages; others moved seasonally through large territories; many combined hunting, gathering, agriculture and long-distance trade in ways that changed over time."),
    p("There was never one Indigenous Texas. The modern state boundary cuts across older homelands, migration routes, trade networks and political territories that extended into present-day Oklahoma, New Mexico, Louisiana, Arkansas and northern Mexico. Names recorded by Spanish, French, Mexican and American writers capture only fragments of that much larger world."),
    p("This guide uses archaeology, tribal histories and historical records together. Archaeologists often use terms such as Paleoindian, Archaic, Late Prehistoric and Historic to organize evidence, but Native peoples also preserved histories through oral traditions, ceremony, language and community memory. Written colonial records are important sources, yet they are not the beginning of Native history."),

    h("People lived in Texas for more than 13,000 years"),
    p("Archaeological evidence from several Texas regions documents human presence reaching back more than 13,000 years. Those early communities lived in environments very different from modern Texas, including periods when cooler climates supported large Ice Age animals. Over thousands of years, people adapted as climate, plants, animals and coastlines changed."),
    p("Stone tools, hearths, rock shelters, campsites, burials, plant remains, rock imagery and later pottery and architecture reveal long histories of skilled adaptation. In the Edwards Plateau and canyonlands, generations of hunters and gatherers used rivers, springs, deer, bison, pecans, sotol and other resources. On the coast, communities relied heavily on bays, estuaries, shellfish, fish, game and seasonal plant foods. On the Plains, mobility and bison became central to many societies."),
    p("The important point is not a single date for when Texas became inhabited. It is the depth and continuity of human life across the region. European arrival in the sixteenth century entered an already populated landscape with established routes, territorial knowledge, diplomatic relationships and economies."),

    h("East Texas: Caddo towns, agriculture and regional trade"),
    p("The Caddo world is one of the clearest examples of complex Indigenous society in what is now Texas. Caddo-speaking peoples lived across a broad region that included East Texas, northwest Louisiana, southwest Arkansas and southeast Oklahoma. Their communities were not isolated villages; they belonged to wider political, ceremonial and trading networks."),
    p("At the site now preserved as Caddo Mounds State Historic Site near Alto, ancestral Caddo established a major village and civic-ceremonial center beginning around A.D. 800. Three earthen mounds survive within a landscape that once included houses, public spaces, agriculture and extensive trade. Materials recovered there demonstrate connections reaching far beyond East Texas."),
    p("Caddo farmers cultivated corn and other crops while also using the rich resources of the Piney Woods and river valleys. Their routes later influenced roads used by Europeans. The corridor that became El Camino Real de los Tejas followed paths whose history began before Spanish colonists labeled them royal roads."),
    p("The name Texas itself is tied to Caddo language. Spanish forms such as Tejas developed from a Caddo term commonly translated as friend or ally. A word emerging from Indigenous diplomacy ultimately became the name used for a Spanish province, an independent republic and a U.S. state."),
    image(
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Caddo_Mound_TX.jpg?width=1200",
      "Earthen mound at Caddo Mounds State Historic Site near Alto, Texas",
      802,
      538,
      "N. Saum · CC BY-SA 3.0 · Wikimedia Commons",
      "Caddo Mounds preserves part of a much larger ancestral Caddo cultural landscape. The surviving earthworks represent civic, ceremonial and community life rather than an isolated archaeological curiosity."
    ),

    h("The Gulf Coast: Karankawa and other coastal peoples"),
    p("The Texas coast supported its own network of Native communities adapted to bays, barrier islands, marshes and prairies. Groups collectively known as Karankawa occupied parts of the Gulf Coast from roughly the Galveston Bay area southwest toward Corpus Christi Bay. Historical writers used Karankawa as a broad label for several related coastal groups rather than a single centralized nation."),
    p("Coastal peoples moved with seasonal resources, fishing and collecting shellfish in bays and lagoons while hunting and gathering across the coastal prairie. Their mobility was an adaptation to a productive but changing environment, not evidence of a simpler society."),
    p("European contact brought catastrophic disruption. Disease, violence, missionization, displacement and competition for coastal land reduced populations and fractured communities. Older historical writing sometimes treated the Karankawa as if they simply disappeared. More recent scholarship and descendant communities challenge that language and emphasize survival, family continuity and the limits of colonial records."),

    h("South Texas: many peoples hidden by the word Coahuiltecan"),
    p("South Texas and northeastern Mexico were home to many small Native groups whose names appear unevenly in Spanish records. Historians once grouped many of them under the label Coahuiltecan. The term remains useful as a regional shorthand in some contexts, but it should not be mistaken for the name of one tribe, one language or one unified political nation."),
    p("Communities moved through the brush country, river valleys and coastal plains using seasonal plant foods, game, fish and other resources. Mission records preserve many group names, but colonial officials often recorded those identities inconsistently. Disease, missionization, intermarriage, forced movement and colonial violence made later reconstruction difficult."),
    p("This is one reason Indigenous Texas cannot be reduced to a tidy list of tribes drawn on a modern map. Communities merged, split, migrated, adopted new alliances and sometimes appeared under different names in different records."),

    h("Central Texas: Tonkawa, Apache and a shifting middle ground"),
    p("Central Texas was a meeting ground between woodland, plains and southern communities. Tonkawa peoples ranged across parts of Central Texas and the adjacent plains, hunting bison and smaller game while gathering plant foods and participating in regional trade. Their alliances changed as new powers entered the region."),
    p("Lipan Apache communities maintained a long presence across the South Plains, Hill Country, South Texas, West Texas and northern Mexico. They became major participants in horse trade, diplomacy and warfare. Spanish missions and military policy repeatedly tried to draw Apache groups into alliances, partly because Spanish officials also faced expanding Comanche power."),
    p("Places such as Lipantitlán preserve only one layer of this much broader history. The site name itself reflects Lipan Apache presence before later Mexican military and Texas Revolution associations were added to the same landscape."),

    h("The Southern Plains: Comanche power remade Texas"),
    p("Comanche history demonstrates why Native homelands were dynamic rather than frozen in time. Comanche ancestors moved south from the Great Basin and Rocky Mountain region, acquired horses and expanded onto the Southern Plains during the late seventeenth and early eighteenth centuries. By the eighteenth century, much of North, Central and West Texas belonged to a vast sphere often called Comanchería."),
    p("Horses transformed mobility, hunting, trade and warfare. Comanche bands became powerful intermediaries in the movement of bison products, horses, captives, firearms and manufactured goods. Spanish, Mexican, Texian and later United States governments all had to negotiate with Comanche power rather than simply impose authority across the plains."),
    p("Wichita, Kiowa, Apache and other Plains peoples also shaped the region. Alliances changed repeatedly. A map showing one tribe in one fixed territory can therefore be misleading: movement, seasonal use, diplomacy, conflict and shared spaces were central features of Plains history."),

    h("West Texas and the Rio Grande: Pueblo, Jumano and desert networks"),
    p("Far West Texas connected the Southern Plains, northern Mexico and the Pueblo world of the Southwest. Archaeological sites around the Trans-Pecos preserve evidence of camps, villages, rock imagery, agriculture and long-distance exchange. Jumano communities and traders linked the plains, Rio Grande settlements and northern Mexico, although historians still debate important questions about Jumano identity and language."),
    p("Hueco Tanks is one of the state's most visible Indigenous cultural landscapes. Natural rock basins made reliable water available in the desert, and the site preserves pictographs and other evidence of repeated use by different peoples over long periods. Modern access rules are intentionally strict because recreation occurs inside a protected cultural landscape."),
    p("Farther southeast, Seminole Canyon and the Lower Pecos preserve another deep archive. TPWD documents human presence in the canyon country about 12,000 years ago, while hundreds of rock-art sites preserve traditions developed by later hunter-gatherer communities. Those paintings are not a footnote to Spanish exploration; they are evidence of millennia of intellectual, ceremonial and artistic life before written colonial records."),
    p("The Tigua community at Ysleta del Sur Pueblo adds another essential chapter. After the Pueblo Revolt of 1680 and Spanish retreat from New Mexico, Tigua people were forced south with Spanish colonists and established Ysleta del Sur in the El Paso area in 1682. The Pueblo remains a living sovereign tribal nation, not merely a historic mission community."),

    h("European arrival did not mean European control"),
    p("Spanish explorers began mapping parts of the Gulf Coast in the early sixteenth century, but maps and claims did not equal control. For generations, Native nations determined where Europeans could travel, trade and settle. Spanish missions and presidios were small islands of colonial authority inside much larger Indigenous landscapes."),
    p("Native communities made strategic choices about Europeans. Some traded with Spanish or French merchants. Some entered missions temporarily or permanently. Some used colonial rivalries to strengthen their own position. Others resisted settlement or attacked colonial outposts. The same nation could pursue diplomacy in one decade and warfare in another."),
    p("European diseases caused some of the most devastating changes, often spreading ahead of sustained settlement. Missions also disrupted communities through relocation, labor demands, religious conversion and new political structures. Horses, cattle, metal tools and firearms created additional changes that Native peoples adopted on their own terms when useful."),

    h("Colonial labels can hide Native political agency"),
    p("Older Texas histories often organize the region as a sequence of flags: Spain, France, Mexico, Republic, United States. That framework is useful for government history but incomplete for understanding land and power. Indigenous nations continued to exercise authority across huge areas while European and later American governments claimed those same spaces on paper."),
    p("Comanche control of the Plains is the clearest example, but the principle applies elsewhere. Caddo diplomacy mattered to Spanish and French strategy in East Texas. Apache alliances shaped mission policy. Coastal and South Texas communities controlled local geographic knowledge that outsiders depended on. Pueblo and borderlands communities sustained political and cultural systems that predated the modern Texas boundary."),
    p("A better chronology therefore asks two questions at once: which government claimed Texas, and who actually controlled, used or inhabited a particular landscape? The answers were often different."),

    h("The Republic and United States accelerated dispossession and removal"),
    p("Indigenous history did not end in 1836. The Republic of Texas inherited ongoing relationships and conflicts with Native nations, then pursued policies that ranged from treaty-making and trade to warfare and expulsion. Settlement pushed into hunting grounds and homelands as surveyors and land claims converted contested spaces into private property on paper."),
    p("Under the United States, military forts, reservation experiments and forced removal reshaped the frontier. Caddo and other communities were pushed from East and North Texas toward the Brazos reservation system and then into Indian Territory. Comanche, Kiowa and other Plains nations faced military campaigns, bison destruction and confinement to reservations outside Texas."),
    p("These changes were not an inevitable disappearance of Native peoples. They were the result of specific government policies, violence, disease, land seizure and economic transformation. Many nations survived by rebuilding communities elsewhere while maintaining ties to Texas homelands."),

    h("Native Texas is still living Texas"),
    p("Indigenous Texas is not only an archaeological or frontier-history subject. Texas today includes sovereign tribal governments and Native communities whose citizens maintain languages, ceremonies, political institutions and cultural traditions."),
    p("The Alabama-Coushatta Tribe of Texas maintains its reservation and government in Deep East Texas. The Kickapoo Traditional Tribe of Texas has trust lands and a reservation community near Eagle Pass. Ysleta del Sur Pueblo is a federally recognized Pueblo and sovereign nation in El Paso. Their histories are distinct, and each should be understood through its own institutions rather than treated as interchangeable examples of Native Texas."),
    p("Other federally recognized nations with deep Texas histories are headquartered outside the state today. The Caddo Nation, Comanche Nation and Tonkawa Tribe are based in Oklahoma, for example, even though major parts of their histories unfolded in the region now called Texas. Lipan Apache communities also maintain cultural and political identities tied to Texas and northern Mexico."),
    p("The location of a modern tribal headquarters is therefore not a map of ancestral homelands. Removal, migration, federal policy and international borders separated many Native nations from places central to their histories."),

    h("Where to encounter Indigenous Texas responsibly"),
    list(
      "Caddo Mounds State Historic Site near Alto: ancestral Caddo village, civic-ceremonial mounds, grass-house interpretation and Caddo-centered cultural programming.",
      "Ysleta del Sur Pueblo Cultural Center Museum in El Paso: Pueblo-operated interpretation of Tigua history, culture and living traditions.",
      "Hueco Tanks State Park & Historic Site east of El Paso: protected pictographs, archaeological resources and a desert landscape used by people for thousands of years.",
      "Mission Dolores State Historic Site near San Augustine: a place to examine Spanish colonization alongside the Native communities affected by mission policy.",
      "Lipantitlán State Historic Site near Mathis: an open landscape whose name and history connect Lipan Apache presence with later Mexican and revolutionary layers."
    ),
    p("Visitors should treat archaeological sites, rock imagery, burial places and ceremonial landscapes as cultural resources rather than backdrops. Stay on designated paths, follow photography and access rules, and use tribal or managing-authority interpretation when it is available."),
    p("The strongest history travel also avoids treating Native culture as something that ended in the nineteenth century. A museum or archaeological site may interpret the past, but living Native nations remain the most important authorities on their own identities and contemporary communities."),

    h("How this changes the larger Texas origin story"),
    p("Beginning Texas history with Indigenous peoples changes what comes afterward. Spanish missions become colonial institutions built inside existing Native worlds. El Camino Real becomes a road system that reused older Indigenous routes. French and Spanish rivalry becomes partly a competition for trade and alliances with Native nations. The Republic's frontier becomes a contested zone where Texas claims and Native sovereignty overlapped."),
    p("It also changes the meaning of familiar Texas identity. Even the name Texas carries a Caddo linguistic legacy. The state's oldest travel corridors, many place names, archaeological landscapes and regional histories make more sense when Indigenous history is treated as foundational rather than supplementary."),
    p("The next step is to place this deeper history back into the full political chronology. The companion guide to Texas before the United States follows the transition from Indigenous homelands through Spanish and Mexican rule, revolution, the Republic, annexation and statehood without treating 1836 as the beginning."),
  ],
};
