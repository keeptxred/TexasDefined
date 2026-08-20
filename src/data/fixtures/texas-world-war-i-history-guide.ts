import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const texasWorldWarIHistoryGuideArticle: Article = {
  id: "evergreen-texas-world-war-i-history-guide",
  brandId: "texasdefined",
  slug: "texas-world-war-i-history-guide",
  title: "Texas in World War I: Border Mobilization, Training Camps and the War That Remade the State",
  dek: "Texas was already militarized by the Mexican Revolution before U.S. entry into World War I. Then nearly 200,000 Texans served, new camps and airfields reshaped cities, the 36th and 90th Divisions went overseas, and the home front accelerated social change across the state.",
  category: "texas-history",
  region: "gulf-coast",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Training_Camps_and_Schools_-_Military_-_Camp_Logan,_Houston,_Texas_%28165-WW-526A-18%29_-_DPLA_-_8a0e237561b266a5ebfbe36604599b39.jpg?width=1600",
    alt: "World War I soldiers training at Camp Logan in Houston, Texas",
    width: 1600,
    height: 1067,
    credit: "U.S. National Archives · 1917–1918 · Public domain · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-20",
  readingMinutes: 18,
  tags: ["Texas World War I", "Camp Logan", "36th Infantry Division", "90th Infantry Division", "Kelly Field", "Mexican Revolution border", "Texas military history", "World War I home front"],
  featured: true,
  sourceName: "Texas Historical Commission",
  sourceUrl: "https://thc.texas.gov/learn/military-history/texas-world-war-i",
  internalLinks: [
    { href: "/article/texas-military-history-timeline", label: "Texas military history timeline", description: "Place World War I after the 1898 mobilization and before the much larger World War II expansion." },
    { href: "/article/texas-national-guard-history", label: "Texas National Guard history", description: "Follow the Guard units that became the 36th Infantry Division and their later service." },
    { href: "/article/san-antonio-military-aviation-history", label: "San Antonio military aviation", description: "Connect Kelly and Brooks Fields with the aviation boom accelerated by World War I." },
    { href: "/article/texas-world-war-ii-bases-pow-camps", label: "Texas in World War II", description: "Compare the 1917 mobilization with the even larger wartime transformation after 1941." },
    { href: "/article/buffalo-soldiers-texas-frontier-guide", label: "Buffalo Soldiers in Texas", description: "Connect Black Regular Army service with the segregated military and the Houston crisis of 1917." },
    { href: "/texas-history", label: "Texas History", description: "Return to the statewide history collection." },
  ],
  relatedCollections: [],
  relatedDestinations: ["texas-military-forces-museum", "battleship-texas"],
  body: [
    p("World War I arrived in Texas before the United States formally entered the European war. Violence connected to the Mexican Revolution had already drawn federal troops and National Guard units to the border. By 1916, military camps, patrols and mobilization were familiar across parts of South and West Texas. When the United States declared war on Germany in April 1917, the state already had an active military geography ready to expand."),
    p("The Texas Historical Commission estimates that nearly one million Texans registered for the draft and roughly 200,000 served in the armed forces. More than 5,000 died. But the state's wartime importance also came from what happened inside Texas: camps, airfields, hospitals, depots and training grounds transformed Houston, Waco, Fort Worth, San Antonio and many smaller communities."),

    h("The Mexican Revolution put troops in Texas before 1917"),
    p("Cross-border raids, political instability and the Punitive Expedition against Pancho Villa created a major military buildup along the international boundary. National Guard units from across the United States rotated through Texas, while regular Army posts expanded their operations."),
    p("That prewar mobilization mattered when the United States entered World War I. Texas already had rail connections, military posts, training experience and a climate suitable for year-round activity. The border crisis and the European war therefore overlapped rather than forming two separate military eras."),

    h("World War I built a network of camps and airfields"),
    p("The THC identifies 19 U.S. Army posts in Texas during the period, with at least nine serving as military training camps and another nine as military airfields. Emergency construction changed the edges of major cities almost overnight."),
    p("Camp Logan rose on the western side of Houston in the area now associated with Memorial Park. Camp MacArthur transformed Waco. Camp Bowie grew near Fort Worth, while San Antonio's existing Army presence expanded and new aviation fields accelerated the city's long military relationship with flight."),

    h("Texas became an early center of military aviation"),
    p("World War I turned aviation from an experiment into an essential military technology. Kelly Field and Brooks Field in San Antonio trained aviators and support personnel, while other Texas fields hosted American and Allied students. British and Canadian flying cadets also trained in the state."),
    p("The wartime airfield network left a durable legacy. Some facilities disappeared after the armistice, but the technical knowledge, land use and institutional momentum helped make Texas—especially San Antonio and North Texas—a major aviation center in later decades."),

    h("The 36th and 90th Divisions carried Texas overseas"),
    p("The 36th Infantry Division was built from Texas and Oklahoma National Guard organizations. It reached France and fought in the Meuse-Argonne campaign. The division became one of the most enduring institutional links between Texas Guard history and overseas combat."),
    p("The 90th Infantry Division drew heavily from Texas and Oklahoma draftees. Together, the 36th and 90th represent different paths into the wartime Army: one rooted in Guard units, the other primarily in the national draft system."),

    h("African American Texans served in a segregated Army"),
    p("More than 30,000 African American Texans served, according to the THC. Most entered segregated formations, including the 92nd and 93rd Infantry Divisions. At least 65 African Americans from East Texas served in the 369th Infantry, later celebrated as the Harlem Hellfighters."),
    p("Their service took place amid intense racial discrimination at home and in uniform. The contradiction between military service and unequal citizenship was not abstract in Texas; it shaped communities, veterans' expectations and the political struggles that followed the war."),

    h("Camp Logan exposed the violence inside wartime mobilization"),
    p("Houston's wartime story also includes the 1917 violence involving Black soldiers of the 24th Infantry and Houston police and civilians. The confrontation grew from racial hostility, discriminatory policing and escalating conflict between soldiers and local authorities, ending in deaths on both sides and one of the largest military trials in U.S. history."),
    p("The episode belongs inside the World War I story because mass mobilization did not suspend the racial order of the era. It sometimes intensified conflicts as military personnel entered cities governed by segregation and unequal law enforcement."),

    h("Latino Texans also served and distinguished themselves"),
    p("Hispanic Texans and Mexican nationals served throughout the wartime military. Marcelino Serna, a Mexican immigrant who enlisted from Texas, became one of the most decorated soldiers from the state. His record is a reminder that the wartime Texas force was more diverse than older commemorative narratives often suggested."),
    p("Service did not erase discrimination. Mexican American veterans returned to communities where unequal schools, public accommodations and political power remained common, making military service one strand in the longer civil-rights history of Texas."),

    h("The home front changed work, cities and women's public roles"),
    p("Military construction and wartime labor drew rural and small-town Texans toward growing cities. Women served as nurses, supported Red Cross work, raised money and entered jobs opened by labor shortages. Liberty Bond drives, food conservation and war gardens brought the conflict into households far from any Army post."),
    p("The war also coincided with major national changes in suffrage, prohibition, migration and labor. Texas did not experience those transformations because of the war alone, but mobilization accelerated them by moving people, money and institutions on an unprecedented scale."),

    h("Influenza turned the final year into a public-health crisis"),
    p("The 1918 influenza pandemic spread through military camps and civilian communities as soldiers moved across the country and overseas. Crowded training environments made camps especially vulnerable, and public-health measures became part of wartime life."),
    p("That human toll complicates the familiar armistice narrative. For many Texas families, the end of combat in November 1918 overlapped with illness, mourning and the return of service members to communities changed by both war and pandemic."),

    h("The wartime landscape is still visible"),
    p("Memorial Park in Houston occupies much of the former Camp Logan landscape. Fort Sam Houston and other active installations preserve institutional continuity, while monuments, cemeteries, street names and historical markers carry local memory of the war across the state."),
    p("Battleship Texas also connects the eras. Commissioned before U.S. entry into World War I, the ship served with the British Grand Fleet in 1918 and later became one of the most famous surviving links between the two world wars."),
    list(
      "Start with the Texas Historical Commission's World War I overview and historical-marker map.",
      "Use Memorial Park in Houston to understand how an emergency Army camp became a permanent urban landscape.",
      "Connect San Antonio's Kelly and Brooks Fields with the growth of military aviation.",
      "Read 36th Division, African American, Mexican American and home-front histories together rather than treating one unit as the whole Texas story.",
      "Continue into the World War II guide to see how the 1917 camp-and-airfield model expanded after 1941."
    ),
  ],
};