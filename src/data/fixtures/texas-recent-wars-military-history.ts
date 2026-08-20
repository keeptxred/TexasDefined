import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const texasRecentWarsMilitaryHistoryArticle: Article = {
  id: "evergreen-texas-recent-wars-military-history",
  brandId: "texasdefined",
  slug: "texas-recent-wars-military-history",
  title: "Texas in Recent Wars: Desert Storm, Iraq, Afghanistan and the Modern Guard",
  dek: "Since the Cold War, Texas installations and Texas National Guard units have supported Desert Storm, Balkan peacekeeping, Afghanistan, Iraq and continuing global missions while BRAC closures and force restructuring reshaped the state's military map.",
  category: "texas-history",
  region: "central-texas",
  hero: {
    src: "https://www.nationalguard.mil/portals/31/Images/Article-Images/2014/140909-A-YG824-008.jpg",
    alt: "Texas Army National Guard AH-64A Apache helicopter flying over Iraq during Operation Iraqi Freedom in 2006",
    width: 1200,
    height: 800,
    credit: "Texas Army National Guard · 2006 · Public domain · National Guard Bureau",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-20",
  readingMinutes: 17,
  tags: ["Texas recent wars", "Operation Desert Storm", "Operation Iraqi Freedom", "Operation Enduring Freedom", "36th Infantry Division", "Texas National Guard", "BRAC", "Texas military history"],
  featured: true,
  sourceName: "Texas Historical Commission",
  sourceUrl: "https://thc.texas.gov/learn/military-history/texas-recent-wars",
  internalLinks: [
    { href: "/article/texas-cold-war-military-history", label: "Cold War Texas", description: "Start with the bomber, missile and nuclear infrastructure that immediately preceded the post-1991 era." },
    { href: "/article/texas-national-guard-history", label: "Texas National Guard history", description: "Follow the citizen-soldier institutions that carried many of the state's post-Cold War deployments." },
    { href: "/article/san-antonio-military-aviation-history", label: "San Antonio military aviation", description: "See how the state's largest military complex continued adapting into the joint-base era." },
    { href: "/destination/texas-military-forces-museum", label: "Texas Military Forces Museum", description: "Explore the Guard's history at Camp Mabry in Austin." },
    { href: "/texas-history", label: "Texas History", description: "Return to the statewide history collection." },
  ],
  relatedCollections: [],
  relatedDestinations: ["texas-military-forces-museum"],
  body: [
    p("The end of the Cold War did not end Texas military history. Instead, the state entered an era of frequent deployments, changing missions and repeated restructuring. Texas bases continued to train and deploy active-duty personnel, while Texas National Guard units were increasingly used for overseas operations as well as domestic emergencies."),
    p("The Texas Historical Commission treats the post-Cold War period as its own military era. Its recent-wars chronology highlights Operation Desert Storm, peacekeeping in the former Yugoslavia, the post-September 11 War on Terror, Base Realignment and Closure decisions, and major changes inside the Texas National Guard."),

    h("Desert Shield and Desert Storm opened the post-Cold War era"),
    p("Iraq's invasion of Kuwait in August 1990 triggered Operation Desert Shield and, in January 1991, Operation Desert Storm. Texas installations supplied trained personnel, aviation, logistics and support for the coalition campaign, while Texans in both active and reserve components deployed to Southwest Asia."),
    p("The conflict was short compared with later wars, but it marked a new pattern. Large Texas bases built for Cold War missions remained valuable because they could train, equip and move forces rapidly for regional crises far from the United States."),

    h("The 1990s combined peacekeeping with base closures"),
    p("After the Gulf War, U.S. forces participated in peacekeeping and stabilization missions in places including the former Yugoslavia. Texas units and installations supported that broader operational tempo even as defense planners reduced infrastructure inherited from the Cold War."),
    p("Base Realignment and Closure, usually called BRAC, changed the Texas military map during the 1990s and again in the 2000s. Some installations closed or lost missions; others absorbed personnel and functions. The result was not simply military decline but concentration around installations considered strategically useful for future needs."),

    h("September 11 made Guard deployments routine in a new way"),
    p("The attacks of September 11, 2001, began the longest sustained period of U.S. military operations of the modern era. Texas installations became major training, mobilization, medical and logistical hubs for operations in Afghanistan and Iraq."),
    p("For the Texas National Guard, overseas deployments became a defining part of service. Units that historically balanced state missions with periodic federal mobilization were repeatedly called into federal service for Operation Enduring Freedom, Operation Iraqi Freedom and later missions."),

    h("Afghanistan drew Texas soldiers and airmen into a long counterinsurgency war"),
    p("Operation Enduring Freedom began in Afghanistan in October 2001. Texans served in combat, aviation, engineering, intelligence, medical, logistics and security roles. Texas Guard personnel deployed alongside active-duty and other reserve-component forces over multiple rotations."),
    p("The length of the war changed military communities at home. Families, employers and local institutions learned to manage repeated deployment cycles, while Texas bases supported pre-deployment training and the medical, administrative and logistical systems required by a force rotating continuously overseas."),

    h("Iraq became one of the Texas Guard's largest recent missions"),
    p("The 2003 invasion of Iraq opened another major theater. Texas National Guard units served across Iraq in aviation, convoy security, force protection, training and partnership missions. A Texas Army National Guard aviation regiment, for example, flew Apache missions in Iraq during Operation Iraqi Freedom."),
    p("The 36th Infantry Division and its brigades became especially visible in the post-9/11 era. Texas units deployed to Iraq more than once, and the state's military awards system eventually recognized service connected to both Iraq and Afghanistan campaigns."),

    h("The 36th Infantry Division returned as the Guard reorganized"),
    p("One of the most symbolic structural changes was the return of the 36th Infantry Division designation. The Texas Historical Commission notes that the 36th replaced the 49th Armored Division as the Guard adapted its force structure to new operational requirements."),
    p("That change connected a famous World War II identity with a very different modern force. The contemporary 36th Division has operated in a military environment defined by joint commands, digital communications, precision weapons, counterinsurgency, homeland response and multinational deployments."),

    h("Texas installations became more joint and concentrated"),
    p("Recent wars also accelerated institutional consolidation. San Antonio's major military facilities were grouped under Joint Base San Antonio, while Fort Hood—now Fort Cavazos—remained one of the Army's largest installations. Fort Bliss at El Paso expanded substantially as missions shifted and other bases closed."),
    p("These changes show why recent military history is also urban and economic history. Base realignment affects housing, schools, transportation, employment and regional growth. A military mission moving from one installation to another can reshape communities even when no battle occurs nearby."),

    h("The Guard still serves two governments"),
    p("The Texas National Guard remains distinctive because it can serve both federal and state missions. The same organization that has deployed personnel overseas can also respond to hurricanes, floods, wildfires and other emergencies under state authority."),
    p("That dual role makes the post-Cold War period difficult to divide neatly into 'war' and 'home front.' Training, overseas deployment, disaster response, border missions and force modernization overlap inside the same institutions and sometimes inside the careers of the same service members."),

    h("Recent history requires careful interpretation"),
    p("Unlike nineteenth-century conflicts, recent wars remain within living memory. Veterans, families and communities may disagree sharply about policy decisions while sharing direct experience of military service. A useful history page should distinguish the political debate over a war from the documented service of the people and units sent to fight it."),
    p("It also matters to avoid treating 'Texas served' as a single experience. Active-duty personnel stationed in Texas, Texas-born service members, Guard units, reservists, military families and civilian defense workers all connect to the state's military history in different ways."),

    h("How to explore the post-Cold War military story"),
    p("The Texas Military Forces Museum at Camp Mabry is the best statewide starting point for Guard history. Museums on active installations and local military museums preserve additional unit histories, equipment and oral histories, though access rules at active bases can change and should be checked before visiting."),
    list(
      "Use the Texas Historical Commission's Texas in Recent Wars overview for the statewide chronology.",
      "Pair this guide with the Texas National Guard history page for institutional continuity.",
      "Use the Cold War guide to understand the infrastructure inherited by the post-1991 force.",
      "Check official installation and museum websites before visiting active military facilities.",
      "Treat veterans' oral histories as essential evidence while distinguishing personal memory from broader policy analysis."
    ),
  ],
};