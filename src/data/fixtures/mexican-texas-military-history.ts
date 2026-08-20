import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const mexicanTexasMilitaryHistoryArticle: Article = {
  id: "evergreen-mexican-texas-military-history",
  brandId: "texasdefined",
  slug: "mexican-texas-military-history",
  title: "Military in Mexican Texas: Presidios, Militias, Anahuac and the Road to Revolution",
  dek: "Between Mexican independence in 1821 and the Texas Revolution in 1835, military power in Texas shifted from thin presidio garrisons to settler militias and larger Mexican deployments. The Fredonian Rebellion, Anahuac disturbances, Turtle Bayou Resolutions and Gonzales grew out of that changing balance.",
  category: "texas-history",
  region: "gulf-coast",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Mexican_Texas_1833-en.svg?width=1600",
    alt: "Map of Mexican Texas and Coahuila y Tejas in 1833",
    width: 1600,
    height: 1200,
    credit: "Map of Mexican Texas, 1833 · CC BY-SA 4.0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-20",
  readingMinutes: 17,
  tags: ["Mexican Texas", "Coahuila y Tejas", "Anahuac", "Fredonian Rebellion", "Turtle Bayou Resolutions", "Gonzales", "Texas Rangers", "Texas military history"],
  featured: true,
  sourceName: "Texas Historical Commission",
  sourceUrl: "https://thc.texas.gov/learn/military-history/military-mexican-texas",
  internalLinks: [
    { href: "/article/spanish-texas-military-battle-medina", label: "Military Texas before 1821", description: "Start with presidios, Spanish rule and the Battle of Medina before authority passed to independent Mexico." },
    { href: "/article/texas-revolution-historic-sites-road-trip", label: "Texas Revolution road trip", description: "Continue from the Anahuac and Gonzales crises into the 1835–1836 Revolution." },
    { href: "/article/texas-military-history-timeline", label: "Texas military history timeline", description: "Place Mexican Texas inside the longer statewide military chronology." },
    { href: "/article/republic-of-texas-government-trail", label: "Republic of Texas government trail", description: "Follow the political institutions that replaced Mexican authority after independence." },
    { href: "/texas-history", label: "Texas History", description: "Return to the statewide history collection." },
  ],
  relatedCollections: [],
  relatedDestinations: ["the-alamo", "presidio-la-bahia", "san-felipe-de-austin"],
  body: [
    p("When Mexico won independence from Spain in 1821, the military system in Texas did not disappear. Mexican officials inherited the presidios, frontier responsibilities and chronic shortage of troops that had defined late Spanish rule. The new government also inherited a vast northern province where Indigenous nations, Tejano communities, new Anglo-American settlers and international borders all complicated military authority."),
    p("The Texas Historical Commission identifies conflict with Indigenous peoples as one of the most pressing military problems of the period. Mexican forces continued to garrison former Spanish presidios, but the small number of regular troops meant authorities often depended on local militias and armed settlers to extend power across the province."),

    h("Mexican Texas began with continuity as much as change"),
    p("The transfer from Spanish to Mexican rule changed sovereignty, flags and political institutions, but much of the frontier infrastructure remained the same. San Antonio, Goliad and Nacogdoches continued to matter because they were established population and military centers with roads, storehouses and political importance."),
    p("The province was part of Coahuila y Tejas, and officials governed it from a federal system that could feel distant from local problems. That distance became especially important as immigration from the United States increased and Mexican authorities tried to enforce laws over settlements that were growing faster than the regular military presence."),

    h("Militias filled the gaps left by a small regular force"),
    p("Because the government could not station enough regular soldiers across Texas, colonists were authorized to organize local defense. Stephen F. Austin formed militia companies to protect settlements, pursue raiders and respond to emergencies. The Texas Historical Commission connects these forces to the development of the organization that became known as the Texas Rangers."),
    p("These militias solved an immediate security problem, but they also created armed local institutions that were not fully dependent on Mexican garrisons. By the 1830s that mattered politically: communities already accustomed to organizing armed defense could mobilize quickly when disputes with officials escalated."),

    h("The Fredonian Rebellion exposed the problem of sovereignty"),
    p("In 1826–1827, the Fredonian Rebellion at Nacogdoches became an early warning that immigration and land disputes could turn into armed challenges to Mexican authority. Haden Edwards and supporters declared the short-lived Republic of Fredonia after conflicts over land claims and local politics."),
    p("Stephen F. Austin and many other colonists opposed the rebellion and supported Mexican authorities, helping demonstrate that the political break of 1835 was not inevitable in the 1820s. Mexican troops and allied colonists quickly ended the episode, but officials in Mexico City took the threat of U.S.-linked separatism more seriously afterward."),

    h("The Law of April 6, 1830 increased the military presence"),
    p("Concern about immigration from the United States contributed to the Law of April 6, 1830, which sought to restrict further U.S. immigration, strengthen customs enforcement and increase Mexican military control. New or reinforced posts were intended to make federal policy meaningful on the ground."),
    p("For many settlers, customs collections, immigration restrictions and the arrival of additional troops made political disagreements feel like military coercion. For Mexican officials, the same measures looked like an attempt to enforce national law in a border region where outside migration was changing the population balance."),

    h("Anahuac turned customs enforcement into armed confrontation"),
    p("At Anahuac, commander Juan Davis Bradburn enforced customs and immigration policies from a military post near Galveston Bay. Conflicts over arrests and local authority escalated in 1832 when armed settlers confronted the garrison and demanded the release of prisoners including William Barret Travis."),
    p("The confrontation did not immediately become a war for independence. The Turtle Bayou Resolutions framed the settlers' cause as support for Antonio López de Santa Anna and federalist principles against the centralist government then associated with Anastasio Bustamante. That language shows how fluid political loyalties still were."),

    h("The balance shifted as Mexican politics centralized"),
    p("After Santa Anna rose to power, Mexican politics moved toward centralization. In Texas, the question was no longer only whether individual customs officers had acted improperly. Settlers and Tejano federalists increasingly feared the erosion of the federal Constitution of 1824 and stronger central control."),
    p("Mexican officials responded to unrest by sending more troops and trying to secure strategic points. Each side interpreted the other's preparations as evidence that compromise was becoming less likely. The military geography of San Antonio, Goliad, the Gulf Coast and the roads between settlements suddenly mattered more."),

    h("Gonzales transformed a political crisis into open fighting"),
    p("In 1835 Mexican authorities attempted to recover a small cannon previously provided to Gonzales for defense. Local settlers refused to return it, and Mexican troops moved to retrieve the weapon. The resulting October 2 clash at Gonzales is traditionally treated as the first military engagement of the Texas Revolution."),
    p("The cannon itself was less important than the context around it. Years of disputes over immigration, customs, federalism, arrests, military posts and local militia power had created a setting in which an argument over government property could become armed resistance."),

    h("Why Mexican Texas belongs in the military chronology"),
    p("This period explains how a lightly garrisoned frontier became a militarized political crisis. Mexican soldiers were not simply background figures waiting for the Revolution; they were enforcing laws, maintaining presidios, confronting Indigenous threats and responding to repeated challenges to national authority."),
    p("Likewise, settler militias were not created in 1835. They grew from years of local defense under Mexican authorization. The overlap between public security, local self-organization and political resistance is one of the most important continuities between Mexican Texas and the Revolution."),

    h("How to explore Mexican Texas today"),
    p("The strongest surviving landscapes are places where Mexican and revolutionary layers overlap: the Alamo and San Antonio, Presidio La Bahía at Goliad, San Felipe de Austin, and the Gulf Coast corridor tied to Anahuac and customs enforcement. Visitors should read them as places that changed political meaning over time rather than as sites belonging to only one era."),
    list(
      "Use the Texas Historical Commission's Military in Mexican Texas overview as the statewide chronology.",
      "Pair San Felipe de Austin with the Revolution guide to understand colonial government before armed conflict.",
      "Read Anahuac and Turtle Bayou as federalist disputes before treating them as inevitable steps toward independence.",
      "Connect Gonzales to the earlier militia system rather than viewing it as an isolated spark.",
      "Continue to the Revolution, Republic and U.S.–Mexican War guides to follow how military authority changed after 1835."
    ),
  ],
};