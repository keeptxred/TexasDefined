import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const republicOfTexasNavyHistoryArticle: Article = {
  id: "evergreen-republic-of-texas-navy-history",
  brandId: "texasdefined",
  slug: "republic-of-texas-navy-history",
  title: "The Republic of Texas Navy: The Forgotten Fleet That Fought for Texas Independence",
  dek: "Texas maintained two small navies between the Revolution and annexation. From Liberty, Invincible and Independence to Austin, Wharton and the Battle of Campeche, the fleet protected supply lines, challenged Mexican blockades and became entangled in the political feud between Sam Houston and Edwin Ward Moore.",
  category: "texas-history",
  region: "gulf-coast",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Pencil_sktech_of_texas_navy_ships_on_a_calling_card_circa_1840.jpg?width=1600",
    alt: "Pencil sketch of eight Texas Navy ships and waterfront buildings on a calling card around 1840",
    width: 752,
    height: 445,
    credit: "Anonymous sketch · circa 1840 · Public domain · Wikimedia Commons / San Jacinto Museum",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-19",
  readingMinutes: 18,
  tags: ["Republic of Texas Navy", "Texas Navy", "Edwin Ward Moore", "Battle of Campeche", "USS Austin", "Texas Revolution", "Republic of Texas", "Galveston history", "Texas military history"],
  featured: true,
  sourceName: "Texas State Library and Archives Commission",
  sourceUrl: "https://www.tsl.texas.gov/exhibits/navy/index.html",
  internalLinks: [
    { href: "/article/texas-military-history-timeline", label: "Texas military history timeline", description: "Place the Republic's naval campaigns alongside the Texas Revolution, frontier Army, world wars and modern military history." },
    { href: "/article/republic-of-texas-government-trail", label: "Republic of Texas government trail", description: "Connect the Navy's funding and political battles to the unstable government of the independent Republic." },
    { href: "/article/texas-revolution-historic-sites-road-trip", label: "Texas Revolution road trip", description: "Follow the land campaign while remembering that New Orleans supply lines and the Gulf mattered to survival in 1836." },
    { href: "/article/battleship-texas-bb-35-history-restoration", label: "Battleship Texas", description: "Continue into the state's later naval memory through the surviving twentieth-century dreadnought." },
    { href: "/destination/san-jacinto-battleground", label: "San Jacinto Battleground", description: "Connect the Navy's 1836 supply and blockade role with the land victory that secured the Revolution." },
    { href: "/county/galveston", label: "Galveston County guide", description: "Use Galveston as the geographic center for much of the Republic's naval story." },
    { href: "/texas-history", label: "Texas History", description: "Return to the statewide history hub and its connected Republic, military and Gulf Coast guides." },
  ],
  relatedCollections: [],
  relatedDestinations: ["san-jacinto-battleground", "battleship-texas"],
  body: [
    p("The Republic of Texas had a navy before it had stable finances, secure borders or international recognition. That sounds extravagant until the geography is considered. Revolutionary Texas depended heavily on New Orleans for volunteers, weapons, ammunition, credit and supplies. Mexico possessed naval power in the Gulf and could threaten Texas ports, shipping and the coastal flank of any land campaign. A tiny fleet could therefore have an effect far beyond the number of sailors or guns it carried."),
    p("The Texas State Library and Archives Commission describes the Navy as vital to the Republic's survival because it defended the coastline, kept supply lines open and captured prizes that could produce badly needed revenue. It also became one of the most politically explosive institutions in the Republic, especially when President Sam Houston clashed with Commodore Edwin Ward Moore over money, strategy and control."),

    h("The naval war began before independence was declared"),
    p("Coastal tension was already producing armed incidents in 1835. In September, the armed schooner San Felipe and the steamer Laura fought the Mexican revenue vessel Correo near the Texas coast and forced its surrender. The episode temporarily reduced Mexican naval pressure and helped keep the Gulf route open for arms and volunteers arriving from the United States."),
    p("Texas also relied on privateers—privately owned vessels authorized to attack enemy shipping and bring captured vessels before prize courts. Privateering blurred the line between commerce, war and piracy, but for an insurgent government short of money it offered a way to project power without paying for a large standing fleet."),

    h("1836: Texas creates the First Navy"),
    p("In January and February 1836, the provisional Texas government purchased four vessels: Liberty, Invincible, Independence and Brutus. The March 1836 Convention then gave the emerging Republic a formal naval structure, including officers, maritime courts and authority to issue letters of marque and reprisal."),
    p("The ships were small by the standards of established navies, but the mission did not require a battle fleet. Texas needed to interrupt Mexican coastal supply, escort friendly shipping and keep the route to New Orleans open long enough for the Revolution to survive."),

    h("The First Navy helped shape the 1836 campaign"),
    p("The Liberty captured the Mexican trading schooner Pelícano in March 1836 and found hundreds of kegs of gunpowder hidden among ordinary cargo. It later captured additional war supplies aboard the brig Durango. The Invincible fought the Mexican warship Bravo and seized the cargo ship Pocket, which was carrying contraband bound for Mexico."),
    p("The broader maritime supply system also delivered the Twin Sisters cannon to the Texas army. The privateer Flash carried the guns from Galveston toward the Brazos while evacuating families during the Runaway Scrape. The cannon reached the army before San Jacinto and became part of the battlefield legend of April 21, 1836."),
    p("After San Jacinto, the Navy continued to matter. Independence carried Texas commissioners toward New Orleans to pursue recognition, while Liberty escorted the wounded Sam Houston. Invincible was initially assigned to carry Santa Anna back to Mexico before Texas officers stopped the transfer."),

    h("By 1837, the First Navy was gone"),
    p("The young Republic could win battles and still lose ships to debt, damage and bad luck. Liberty was sold in New Orleans because Texas could not pay for repairs. Independence was captured after fighting Mexican blockaders off the Texas coast in April 1837."),
    p("Invincible and Brutus then embarked on a controversial cruise under Secretary of War S. Rhoads Fisher and Commodore Henry L. Thompson. They bombarded Sisal, captured prizes and claimed Mexican islands, but both ships later ran aground at Galveston and were wrecked by storms. By the end of 1837, the First Navy effectively no longer existed."),

    h("Lamar built a larger Second Navy"),
    p("President Mirabeau B. Lamar favored a more assertive national policy than Sam Houston and supported rebuilding naval power. The Texas Congress authorized new spending, and agents arranged for construction and purchase of a more substantial fleet."),
    p("The Second Navy eventually included the sloop-of-war Austin, brigs Wharton and Archer, schooners San Jacinto, San Antonio and San Bernard, and the side-wheel steamer Zavala. The vessels arrived between 1839 and 1840, giving the Republic a fleet capable of sustained operations beyond the Texas coast."),
    p("The problem was money. Texas had difficulty paying sailors, maintaining ships and purchasing stores. A navy could protect trade and national independence, but it was also one of the most expensive institutions a near-bankrupt republic could try to operate."),

    h("Edwin Ward Moore turned the Navy into a Gulf strategy"),
    p("Edwin Ward Moore, a former U.S. Navy officer, became the central figure of the Second Navy. He believed Texas could deter Mexican invasion by carrying the war into Mexican waters rather than waiting behind coastal defenses. Under Moore, Texas vessels cruised along the Gulf, challenged Mexican shipping and became involved in the politics of Yucatán's rebellion against Mexico's central government."),
    p("In 1841, the Lamar administration made an agreement under which Yucatán would pay Texas for the services of three naval vessels. Austin, San Antonio and San Bernard sailed for the Yucatán coast as Sam Houston returned to the presidency and immediately tried to recall them. The episode foreshadowed the political crisis that would consume the Navy."),

    h("1843: Austin and Wharton fight steam warships off Campeche"),
    p("By 1843, Mexico had acquired modern steam-powered warships while the Texas Navy still depended on sail. Moore sailed from New Orleans with Austin and Wharton and joined Yucatecan forces off Campeche. On April 30, the Texans and their allies fought a Mexican squadron that included the steamers Moctezuma and Guadalupe."),
    p("A second major action followed on May 16. Moore maneuvered Austin aggressively against the steamships while Wharton supported the fight. Austin was badly damaged and suffered casualties, but the Mexican vessels also took substantial damage and losses before breaking off."),
    p("The Battle of Campeche became the Texas Navy's most famous engagement and is often remembered as a rare case of sailing warships successfully fighting steam-powered opponents. More important to the Republic, Moore's cruise disrupted a Mexican force at a moment when Texans feared another invasion from the south."),

    h("The Navy's greatest battle deepened its political crisis"),
    p("Houston believed Moore had disobeyed orders and endangered the Republic's diplomatic strategy. While Moore was operating near Yucatán, Houston publicly accused him of mutiny, treason and piracy and ordered commissioners to take control of the ships. Moore returned to Galveston in July 1843 to a hero's welcome from supporters and a dishonorable discharge from the government."),
    p("A later court-martial lasted seventy-two days. Moore was acquitted of the most serious charges and convicted on several lesser counts of disobedience. The fight revealed a deeper argument over what the Republic of Texas should be: an assertive independent nation willing to fund professional military forces, or a cash-strapped state seeking annexation and avoiding expensive institutions that might provoke Mexico or complicate diplomacy."),

    h("Annexation ended the Republic—and its Navy"),
    p("By the time Texas joined the United States in 1845, the Navy had been reduced by political conflict, financial exhaustion and years of hard service. The Republic no longer needed a separate national fleet once statehood transferred maritime defense to the United States."),
    p("The fleet left no surviving warship comparable to Battleship Texas. Its material history survives instead through archival papers, ship sketches, service records, currency imagery, court-martial documents and the underwater remains of lost vessels. That makes the Texas State Library and Archives Commission's Navy collection unusually important: the archive is effectively the museum."),
    list(
      "First Navy: Liberty, Invincible, Independence and Brutus—small vessels that helped protect the 1836 supply line and challenge Mexican shipping.",
      "Second Navy: Austin, Wharton, Archer, San Jacinto, San Antonio, San Bernard and Zavala—an ambitious fleet built under the Republic despite chronic debt.",
      "Key commander: Commodore Edwin Ward Moore, whose aggressive Gulf strategy made him both a public hero and Sam Houston's political enemy.",
      "Best-known battle: Campeche in 1843, where Austin and Wharton fought a Mexican squadron that included steam warships.",
      "Best primary-source collection: the Texas Navy Papers and related service records held by the Texas State Library and Archives Commission."
    ),

    h("Why the Texas Navy deserves a place beside the Alamo and San Jacinto"),
    p("Texas independence is usually remembered as a land war. That framing misses a basic reality: the Revolution and the Republic depended on the Gulf of Mexico. Without access to New Orleans, Texas would have struggled to obtain men, weapons, ammunition and credit. Without some naval resistance, Mexico could pressure the coast and disrupt the supply system that kept the rebellion alive."),
    p("The Navy's story also explains the fragility of the Republic after victory. Texas could declare itself a nation, but sustaining the expensive institutions of nationhood was another matter. The rise and fall of two fleets reveals the same tensions that shaped the Republic as a whole—independence versus annexation, ambition versus debt, and military necessity versus political control."),
  ],
};
