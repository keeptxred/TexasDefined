import rodeoHero from "@/assets/rodeo-101-hero-photo.jpg";
import { ICONIC_TEXAS_FASHION_ITEMS, ICONIC_TEXAS_FASHION_SECTIONS } from "../iconic-texas-fashion-items";
import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });

const sectionNotes = [
  "The cowboy hat is the most recognizable part of the Western silhouette, but Texas headwear ranges from felt and straw ranch hats to oil-company mesh caps, hunting caps, game-day gear and brand merchandise. Garland's hatmaking industry gives this category a real manufacturing geography rather than only an image.",
  "Boots are the strongest single bridge between workwear and formal Texas dress. Riding heels, tall shafts, leather construction and decorative stitching come from practical needs, while toe shapes, exotic leathers, inlays and fashion finishes pushed the form far beyond ranch work. TexasDefined already treats the cowboy boot as a major state icon, with El Paso, Nocona and historic makers forming the deeper story.",
  "A Western belt can be nearly invisible work gear or the centerpiece of an outfit. Trophy buckles, engraved silver, turquoise, conchos, tooled leather and oversized rodeo styles turn the waist into a place for craftsmanship, awards, identity and display.",
  "Texas outerwear has to cover radically different conditions: Panhandle cold, Gulf rain, ranch wind, hunting seasons, motorcycle culture and indoor rodeo or concert fashion. Denim, canvas, oilskin, suede, leather, fringe and Western yokes make this one of the clearest places where work clothing and style overlap.",
  "Pearl snaps and Western yokes are classic markers, but modern Texas shirts also include work chambray, guayaberas, team colors, concert shirts, brand graphics and anti-litter slogans that escaped into popular culture. This is where everyday Texas identity is often most visible without anyone dressing formally Western.",
  "Bootcut denim is the obvious anchor because it works physically with Western boots, but Texas legwear also includes raw denim, work pants, ranch cargoes, riding chaps, prairie silhouettes, rodeo leather and fashion denim. National denim brands belong here as adopted staples, not as Texas inventions.",
  "Bolo ties, silverwork, turquoise, conchos and Western motifs carry some of the strongest jewelry associations with the region. Texas style overlaps here with broader Southwestern traditions, so TexasDefined avoids treating Indigenous-inspired forms, stones or motifs as though they originated inside modern state borders.",
  "Small pieces often reveal the working roots of Western style most clearly. Bandanas, wildrags, gloves, wallets, saddlebags, horsehair, canvas gear and leather cases began as practical objects before becoming fashion signals, souvenirs or decorative accessories.",
  "Texas formalwear does not always mean leaving Western elements at home. Boots with suits, embroidered jackets, rhinestone stagewear, rodeo-queen outfits, Western wedding clothing and velvet or brocade pieces show how ranch and country-music imagery moved into ceremonies, performance and nightlife.",
  "The final group is deliberately practical. Oil-field safety gear, welding leather, insulated bibs, ranch shirts, hunting gaiters, waders, roping gloves and heavy work belts are not fashion costumes. They belong because Texas clothing culture is inseparable from the jobs, climate and outdoor activities that produced much of the look.",
] as const;

const itemSections: ArticleBlock[] = ICONIC_TEXAS_FASHION_SECTIONS.flatMap((section, index) => [
  h(`${section.start + 1}–${section.end}. ${section.title}`),
  p(sectionNotes[index] ?? ""),
  { type: "list", items: ICONIC_TEXAS_FASHION_ITEMS.slice(section.start, section.end) } as ArticleBlock,
]);

export const iconicTexasFashionGuideArticle: Article = {
  id: "evergreen-iconic-texas-fashion-western-wear-guide",
  brandId: "texasdefined",
  slug: "iconic-texas-fashion-western-wear-guide",
  title: "250 Iconic Texas Fashion Items: Boots, Hats, Western Wear and Workwear",
  dek: "A field guide to 250 pieces of clothing, footwear, jewelry and working gear associated with Texas style—from cowboy boots and pearl snaps to rodeo buckles, oil-field workwear, game-day shirts and formal Western dress.",
  category: "guides",
  hero: {
    src: rodeoHero,
    alt: "A cowboy riding a bucking bronc in a Texas rodeo arena",
    width: 1600,
    height: 900,
  },
  authorId: "a-marisol",
  publishedAt: "2026-09-19",
  readingMinutes: 18,
  tags: [
    "texas fashion",
    "texas western wear",
    "cowboy boots",
    "cowboy hats",
    "pearl snap shirts",
    "texas workwear",
    "rodeo fashion",
    "western jewelry",
    "texas style",
  ],
  featured: false,
  internalLinks: [
    { href: "/texas-symbols", label: "Cowboy boot: official Texas footwear", description: "Verify the cowboy boot's official State Footwear designation and explore other legislatively adopted Texas symbols." },
    { href: "/made-in-texas", label: "Made in Texas", description: "Find Texas manufacturers and brands tied to boots, hats, workwear, leather goods and other products." },
    { href: "/things-unique-to-texas/texas-brands", label: "Legendary Texas brands", description: "Connect apparel and footwear to Texas-founded or Texas-rooted companies." },
    { href: "/texas-brand-origin-stories", label: "Texas brand origin stories", description: "See how Dickies and other Texas names moved from local businesses into statewide identity." },
    { href: "/destination/fort-worth-stockyards", label: "Fort Worth Stockyards", description: "Explore one of the state's strongest living Western-wear, cattle and rodeo districts." },
    { href: "/county/el-paso", label: "El Paso County", description: "Connect the guide to El Paso's major bootmaking tradition and the state's official Boot Capital." },
    { href: "/county/dallas", label: "Dallas County", description: "Follow the Garland-area cowboy-hat manufacturing story behind names such as Resistol." },
    { href: "/county/montague", label: "Montague County", description: "Connect Nocona and North Texas bootmaking history to ranch and Chisholm Trail country." },
    { href: "/county/tarrant", label: "Tarrant County", description: "Tie Fort Worth workwear, Stockyards retail and Western dress to Cowtown history." },
    { href: "/county/travis", label: "Travis County", description: "Connect modern Austin-based Western brands including Tecovas and Chisos." },
    { href: "/county/camp", label: "Camp County", description: "See the Pittsburg roots of Cavender's and its growth into a major Western-wear retailer." },
    { href: "/article/rodeo-101-guide-events-rules-traditions", label: "Rodeo 101", description: "Understand where trophy buckles, chaps, boots and arena clothing fit into working rodeo culture." },
    { href: "/texas-homecoming-mums", label: "Texas homecoming mums", description: "Continue into another Texas wearable tradition built around school identity and display." },
  ],
  relatedCollections: [],
  relatedDestinations: ["fort-worth-stockyards"],
  body: [
    p("Texas style is not one costume. It is a layered wardrobe built from ranch work, riding gear, oil-field and industrial clothing, rodeo competition, country music, Mexican and Southwestern influence, college sports, hunting, highway brands and formal Western dress. Some items in this guide were developed in Texas, some are made here, some are strongly associated with Texas brands, and others are national products that Texans adopted into everyday life."),
    p("That distinction matters. A Levi's jean, Carhartt vest or trucker cap does not become a Texas invention just because it is common here. The useful story is how pieces move between work, fashion, ceremony and regional identity—and why the same boots can appear at a ranch, a wedding, a rodeo, an office or a concert."),
    h("How to use this 250-item guide"),
    p("The list is organized into ten groups of 25 items. TexasDefined treats broad categories such as cowboy boots, pearl snaps, bolo ties and tooled leather as cultural topics, while brand-specific entries such as Lucchese, Tecovas, Chisos, Buc-ee's, Shiner and the Texas Longhorns are examples of brands or fan identity rather than generic heritage items."),
    {
      type: "list",
      items: [
        "Use the cowboy-boot and Made in Texas links for deeper maker and manufacturing context.",
        "Use county links to connect fashion with the places where Texas bootmaking, hatmaking, retail and workwear developed.",
        "Treat exotic-leather names as descriptive history, not purchasing advice; wildlife, import and trade rules can vary by species, product and date.",
        "Treat game-day, beverage and travel-center merchandise as branded culture rather than traditional Western wear.",
        "Use rodeo, Stockyards and homecoming pages to see how clothing functions inside real Texas events rather than as a costume.",
      ],
    },
    ...itemSections,
    h("The Texas places behind the clothes"),
    p("El Paso is central to the boot story through long-running makers and modern state recognition. Garland is important to cowboy-hat manufacturing. Nocona and nearby North Texas communities preserve bootmaking history. Fort Worth links workwear, the Stockyards, rodeo and Western retail. Pittsburg in Camp County connects to Cavender's. Austin now anchors newer Western-footwear brands. Those place connections keep this guide from becoming a generic list of cowboy-themed products."),
    h("Workwear became fashion because the shapes already worked"),
    p("Denim, chore coats, canvas, pearl snaps, boots, trucker caps and heavy belts spread beyond their original jobs because they are durable, recognizable and easy to combine. Texas brands such as Dickies show that transition especially well: clothing associated with trades and industrial work can become streetwear without losing the history that made the silhouette useful."),
    h("Rodeo changed what dress clothes could look like"),
    p("Rodeo awards and performance culture helped normalize elaborate buckles, embroidered shirts, bright satin, rhinestones, fringe and highly finished boots. Country music amplified the same vocabulary on stage. That is why Western clothing can move from dusty arena equipment to wedding attire or concert fashion without feeling like an entirely different category."),
    h("Texas fashion also includes branded identity"),
    p("Buc-ee's caps, Shiner merchandise, Longhorns burnt orange and Don't Mess with Texas shirts belong to a different branch of the story: they signal affiliation with a place, team, campaign or Texas-rooted brand. They are useful cultural markers, but TexasDefined keeps them separate from claims about traditional ranch clothing or Texas manufacturing."),
    h("A note on exotic leathers and older terminology"),
    p("Historical Western-wear catalogs and collections include alligator, caiman, lizard, python and other exotic materials. Laws, conservation status, import rules and commercial availability can change, so this guide names those materials descriptively without encouraging a purchase. One supplied item used an outdated ethnic term for a beaded necklace; TexasDefined normalizes that entry to Southwestern Bead Necklace rather than repeating language that is unnecessary to describe the object."),
    h("Why this belongs in a Texas authority site"),
    p("Fashion becomes useful Texas history when it connects objects to jobs, towns, makers and rituals. The hat points to Garland manufacturing and rodeo culture. The boot points to El Paso, Nocona, San Antonio and generations of makers. The work shirt points to Fort Worth industry. The belt buckle points to competition and craftsmanship. The burnt-orange shirt points to college identity. The wildrag, bandana and chaps point back to working ranch culture."),
    p("That is the purpose of this page: not to claim that every item was invented in Texas, but to show how 250 recognizable pieces fit into the state's overlapping stories of work, sport, music, travel, school spirit, manufacturing and Western identity."),
  ],
};
