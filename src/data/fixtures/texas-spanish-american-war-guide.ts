import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const texasSpanishAmericanWarGuideArticle: Article = {
  id: "evergreen-texas-spanish-american-war-guide",
  brandId: "texasdefined",
  slug: "texas-spanish-american-war-guide",
  title: "Texas and the Spanish-American War: San Antonio, the Rough Riders and an Army Going Overseas",
  dek: "The 1898 war with Spain lasted only months, but it marked a turning point for Texas military life. San Antonio helped organize the Rough Riders, Texas volunteer regiments mobilized, and Texans served in Cuba, the Philippines and the expanding U.S. military overseas.",
  category: "texas-history",
  region: "south-texas",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Theodore_Roosevelt,_Leonard_Wood,_and_Alexander_Brodie_in_1898,_in_San_Antonio,_Texas_LCCN2013650939.jpg?width=1600",
    alt: "Theodore Roosevelt, Leonard Wood and Alexander Brodie in San Antonio in 1898 during organization of the Rough Riders",
    width: 5992,
    height: 4806,
    credit: "Library of Congress · 1898 · Public domain · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-20",
  readingMinutes: 16,
  tags: ["Spanish-American War", "Rough Riders", "San Antonio military history", "Fort Sam Houston", "Texas Volunteer Guard", "Theodore Roosevelt", "Texas military history"],
  featured: true,
  sourceName: "Texas Historical Commission",
  sourceUrl: "https://thc.texas.gov/learn/military-history/texas-spanish-american-war",
  internalLinks: [
    { href: "/article/texas-military-history-timeline", label: "Texas military history timeline", description: "Place 1898 between the frontier Army and the world-war mobilizations that followed." },
    { href: "/article/texas-national-guard-history", label: "Texas National Guard history", description: "Follow the Texas Volunteer Guard into the institutions that became the modern Guard." },
    { href: "/article/san-antonio-military-aviation-history", label: "San Antonio military aviation", description: "Continue into the twentieth-century training network that grew around Fort Sam Houston, Kelly and Brooks." },
    { href: "/destination/the-alamo", label: "The Alamo", description: "Use central San Antonio as the setting for the city that became a major military gathering point." },
    { href: "/destination/texas-military-forces-museum", label: "Texas Military Forces Museum", description: "See the institutional history of Texas volunteer and Guard service at Camp Mabry." },
    { href: "/texas-history", label: "Texas History", description: "Return to the statewide collection." },
  ],
  relatedCollections: [],
  relatedDestinations: ["the-alamo", "texas-military-forces-museum"],
  body: [
    p("The Spanish-American War occupies an awkward place in Texas memory. It lacks a single Texas battlefield like San Jacinto or Palo Alto, and the war itself lasted only a few months in 1898. Yet it was a major transition point. Texas volunteer units mobilized for federal service, San Antonio became one of the organizing centers for the most famous volunteer cavalry regiment of the war, and Texans entered a military system that was increasingly operating far beyond the continental United States."),
    p("The Texas Historical Commission notes that the Texas Volunteer Guard—the predecessor of the Texas National Guard—organized four infantry regiments and one cavalry regiment after President William McKinley's call for volunteers. Only one Texas state volunteer regiment served outside the United States, but Texans also filled federal volunteer units and regular Army and Navy formations that fought in Cuba and the Philippines."),

    h("Why San Antonio mattered in 1898"),
    p("Fort Sam Houston and San Antonio already formed one of the country's important military centers. The city's rail connections, Army infrastructure and proximity to the ranching Southwest made it a natural place to gather men and horses for volunteer cavalry service."),
    p("That is where the 1st United States Volunteer Cavalry began taking shape. The regiment recruited a mix of cowboys, ranch hands, miners, lawmen, college athletes and experienced westerners. Leonard Wood initially commanded it, with Theodore Roosevelt as lieutenant colonel. The unit soon became known as the Rough Riders."),

    h("The Rough Riders were a federal unit, not a Texas regiment"),
    p("The Rough Riders are often folded into Texas military folklore because they organized at San Antonio and recruited heavily across the Southwest. But they were not one of the Texas Volunteer Guard regiments raised by the state. They were a United States Volunteer Cavalry regiment."),
    p("That distinction matters because it shows two mobilization systems operating at once. Texas supplied its own volunteer formations while individual Texans and other western recruits entered federal volunteer units created specifically for the war."),

    h("Texas organized five state volunteer regiments"),
    p("The Texas Volunteer Guard organized the 1st Texas Volunteer Cavalry and the 1st through 4th Texas Volunteer Infantry. Mobilization involved mustering, equipping, training and moving soldiers through camps that were often improvising for a rapidly expanded wartime Army."),
    p("According to the Texas Historical Commission, only the 1st Texas Volunteer Infantry served outside the United States. It joined the occupation force in Cuba from December 1898 through March 1899, after the principal combat phase had ended."),

    h("Texans fought through more than state volunteer units"),
    p("Texas participation cannot be measured only by the state regiments. Texans served in regular Army units, the Navy and federal volunteer formations. Two federal volunteer units organized at Fort Sam Houston drew especially heavily from Texas: the Rough Riders and the 33rd United States Volunteer Infantry."),
    p("The 33rd U.S. Volunteer Infantry later fought in the Philippine-American War, serving in a conflict that grew out of the transfer of the Philippines from Spanish to American control. That continuation is one reason 1898 should be viewed as the beginning of a larger imperial and overseas military transition rather than a self-contained episode."),

    h("Cuba made the Rough Riders famous"),
    p("The Rough Riders shipped to Cuba without most of their horses and fought largely as infantry. Their actions around Las Guasimas and the San Juan Heights became some of the most publicized episodes of the campaign. Roosevelt's later political career amplified the regiment's fame and turned its 1898 service into national mythology."),
    p("The popular story can obscure the larger force. Black Regular Army soldiers, including the Buffalo Soldier regiments, fought in the same Cuban campaign and played important roles in the fighting around Santiago. The war brought volunteer units, regulars and segregated Black regiments into the same operational theater even while the Army and American society remained deeply segregated."),

    h("The war accelerated a national military transformation"),
    p("The 1898 mobilization exposed weaknesses in supply, medical care, camp sanitation and administration. Disease killed more American service members than Spanish combat did. Reformers used those failures to argue for a more professional, better organized Army."),
    p("For Texas, the consequence was visible in the growing importance of permanent installations, Guard organization and training systems. The state entered the twentieth century with military infrastructure that would expand dramatically during the Mexican Revolution border crisis and World War I."),

    h("1898 also changed the geographic scale of American war"),
    p("Before 1898, most of the wars most closely associated with Texas had been fought in Texas, northern Mexico or on the continental frontier. The Spanish-American War connected Texas recruits to Cuba, Puerto Rico, the Philippines and a broader overseas military role for the United States."),
    p("That shift helps explain why Texas military history after 1898 becomes increasingly tied to training bases and deployment networks. The battlefield may be overseas, but Texas communities become the places where units are raised, trained, supplied and remembered."),

    h("How to explore the Texas side of the war"),
    p("San Antonio is the best starting point because Fort Sam Houston and the Rough Riders story put the 1898 mobilization into a recognizable place. Camp Mabry and the Texas Military Forces Museum connect the state volunteer tradition to the Guard institutions that followed."),
    list(
      "Use the Texas Historical Commission's Spanish-American War overview for the statewide unit structure.",
      "Treat San Antonio as an organizing and training landscape, not as a battlefield of the war itself.",
      "Distinguish the federal Rough Riders from the Texas Volunteer Guard regiments.",
      "Connect Cuba with the service of Black Regular Army units as well as volunteer formations.",
      "Continue into Texas World War I history to see how the temporary mobilization of 1898 evolved into mass twentieth-century training."
    ),
  ],
};