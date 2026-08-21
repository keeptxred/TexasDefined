import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const texasMilitaryCemeteriesMemorialsGuideArticle: Article = {
  id: "evergreen-texas-military-cemeteries-memorials-guide",
  brandId: "texasdefined",
  slug: "texas-military-cemeteries-memorials-guide",
  title: "Texas Military Cemeteries & Memorials: A Respectful Guide to Places of Remembrance",
  dek: "Fort Sam Houston, Houston and Dallas–Fort Worth national cemeteries preserve different eras of Texas veterans history. This guide explains what makes each place significant, how to locate a grave and how to visit without treating an active cemetery like a tourist attraction.",
  category: "texas-history",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Fort_Sam_Houston_National_Cemetery%2C_San_Antonio%2C_Texas%2C_USA.jpg?width=1600",
    alt: "Rows of headstones and flags at Fort Sam Houston National Cemetery in San Antonio",
    width: 2100,
    height: 1500,
    credit: "Tech. Sgt. Larry A. Simmons / U.S. Air Force · Public domain · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-21",
  readingMinutes: 16,
  tags: ["Texas national cemeteries", "Fort Sam Houston National Cemetery", "Houston National Cemetery", "Dallas Fort Worth National Cemetery", "Texas veterans", "military memorials", "Medal of Honor", "Texas military history", "Veterans Legacy Memorial"],
  featured: true,
  sourceName: "U.S. Department of Veterans Affairs · National Cemetery Administration",
  sourceUrl: "https://www.cem.va.gov/find-cemetery/state.asp",
  internalLinks: [
    { href: "/destination/fort-sam-houston-national-cemetery", label: "Fort Sam Houston National Cemetery", description: "Plan a respectful remembrance visit in San Antonio and use the VA kiosk to locate individual graves." },
    { href: "/destination/houston-national-cemetery", label: "Houston National Cemetery", description: "See the unique hemicycle and understand the VA-designed cemetery dedicated in 1965." },
    { href: "/destination/dallas-fort-worth-national-cemetery", label: "Dallas–Fort Worth National Cemetery", description: "Understand the modern national-cemetery landscape serving North Texas since 2000." },
    { href: "/article/texas-medal-of-honor-stories", label: "Texas Medal of Honor stories", description: "Connect places of burial with the service stories behind the highest U.S. military decoration." },
    { href: "/article/women-in-texas-military-history", label: "Women in Texas military history", description: "Continue into Army nursing, the WAC, WASP and the expansion of women's service." },
    { href: "/article/texas-military-museums-historic-sites-guide", label: "Texas military museums and historic sites", description: "Use museums, ships, forts and battlefields for the broader military-history visitor network." },
    { href: "/texas-history", label: "Texas History", description: "Return to the statewide TexasDefined history collection." },
  ],
  relatedCollections: [],
  relatedDestinations: ["fort-sam-houston-national-cemetery", "houston-national-cemetery", "dallas-fort-worth-national-cemetery", "texas-military-forces-museum", "battleship-texas"],
  body: [
    p("National cemeteries are public historic landscapes, but they are first and foremost active places of burial, funeral service and family remembrance. That distinction should shape every visit. TexasDefined includes them because they preserve military, architectural and veterans history that cannot be understood from a timeline alone, while treating funeral processions, grieving families and individual graves with the dignity the setting requires."),
    p("Texas has several federal national cemeteries administered by the U.S. Department of Veterans Affairs, along with state veterans cemeteries and older military burial grounds. This guide focuses on three major VA cemeteries that together explain different phases of the national system: Fort Sam Houston in San Antonio, Houston National Cemetery and Dallas–Fort Worth National Cemetery."),

    h("Before you go: a national cemetery is not a park"),
    p("VA national cemeteries are open to visitors, but normal recreation rules do not apply. Cemetery regulations protect funeral services, burial operations and the dignity of the grounds. At Houston National Cemetery, for example, VA explicitly prohibits picnicking, tailgating, exercise activities and loitering. Firearms and other dangerous weapons are prohibited on VA property except for official purposes."),
    p("The best reason to visit is specific: locate a family member or veteran, attend a service, study a memorial or understand the history of the national-cemetery system. Keep voices low, never interrupt a committal service, avoid photographing grieving families, do not sit or lean on headstones and follow current floral and grounds policies."),

    h("How to locate a veteran's grave"),
    p("All three cemeteries in this guide have visitor kiosks that provide gravesite information and maps. The National Cemetery Administration also operates online grave-location tools, while the Veterans Legacy Memorial provides individual digital memorial pages for millions of veterans and service members."),
    p("Use those tools before wandering burial sections. Knowing the section and site number makes the visit more focused and reduces unnecessary movement through areas where services may be underway. The cemetery office can help with questions during published office hours."),

    h("Fort Sam Houston: the interwar expansion of the national cemetery system"),
    p("Fort Sam Houston National Cemetery occupies a particularly important place in Texas military history because it developed beside one of the country's major Army posts. A post cemetery existed in the 1920s, and Fort Sam Houston became a national cemetery in 1937 as the federal government expanded burial capacity for a growing veteran population between the world wars."),
    p("The cemetery's history also reflects San Antonio's military role during World War II. As prisoner-of-war camps closed after the war, remains from some camp cemeteries were consolidated at permanent federal burial grounds. Fort Sam Houston contains Axis POW graves as well as generations of U.S. veterans and eligible family members."),
    p("The VA lists visitation from sunrise to sunset and provides a gravesite kiosk. The cemetery sits beside the broader Fort Sam Houston military landscape, making it the strongest of these three sites for connecting national-cemetery history to an active military city."),

    h("Houston National Cemetery: a monumental 1960s VA landscape"),
    p("Houston National Cemetery represents a very different phase of federal veterans planning. Dedicated on December 7, 1965, it was the only government cemetery built in the United States during the 1960s and the largest facility of its type at the time. The VA designed the 419-acre site as a complete memorial landscape rather than simply expanding an older post cemetery."),
    p("Its most distinctive feature is the hemicycle, a broad semicircular memorial complex centered on a chapel, speaker's stand and 75-foot carillon tower. The VA identifies it as the only hemicycle memorial managed by the National Cemetery Administration. The cemetery entered the National Register of Historic Places in 2017."),
    p("Houston National Cemetery is also closely connected to Texas Medal of Honor history. Among the recipients interred there is Macario Garcia, whose World War II service and later life in Texas make his story one of the strongest bridges between a national military decoration and the state's veteran community."),

    h("Dallas–Fort Worth: the modern national cemetery"),
    p("Dallas–Fort Worth National Cemetery opened for burials on May 12, 2000, making it the newest of the three landscapes in this guide. The VA developed more than 600 acres overlooking Mountain Creek Lake to serve the enormous North Texas veteran population."),
    p("The site shows how the national cemetery system continues to evolve. It was planned from the start for modern committal operations, casketed and cremated remains, extensive burial sections and long-term capacity rather than being adapted from an older military-post cemetery."),
    p("VA lists visitation from sunrise to sunset. A public information building and gravesite kiosk near the entrance help visitors locate burials. Because this is an active cemetery serving current families, the most respectful historical visit is often the most focused one: arrive with a name, memorial purpose or specific subject rather than treating the grounds as a general sightseeing loop."),

    h("What these three places reveal together"),
    p("Fort Sam Houston, Houston and Dallas–Fort Worth are useful precisely because they are not duplicates. Fort Sam Houston shows the interwar expansion of an older military burial landscape. Houston shows the ambitions of mid-twentieth-century VA memorial design. Dallas–Fort Worth shows a purpose-built national cemetery serving the contemporary veteran population."),
    p("Together they also show the continuity of military service across generations. World War veterans, Korea and Vietnam veterans, Cold War personnel, Gulf War veterans and service members from Iraq and Afghanistan share these landscapes with spouses and other eligible family members. The cemetery system is therefore both historical archive and active public institution."),

    h("Medal of Honor stories belong to people, not just markers"),
    p("Several Texas national cemeteries contain Medal of Honor recipients, but a marker should be the beginning of research rather than the whole story. Read the citation and biography, understand the unit and conflict, and remember that military service continued beyond the single action recognized by the medal."),
    p("TexasDefined's Medal of Honor guide provides that deeper layer. At Houston National Cemetery, for example, Macario Garcia's grave connects battlefield valor with his postwar work, Texas community life and the broader experience of Mexican American veterans."),

    h("Memorial Day and Veterans Day require extra awareness"),
    p("National cemeteries become especially active around Memorial Day and Veterans Day, with ceremonies, flags, volunteers and increased family visitation. Those events can be meaningful times to attend an official program, but they are poor times for casual wandering. Check the cemetery's official event information and arrive prepared for traffic, closures and ceremonial schedules."),
    p("Wreath-laying and volunteer programs also operate under cemetery rules. Do not assume that bringing decorations or placing objects at graves is permitted simply because the intention is respectful; VA floral and grounds policies govern what may be left and when items are removed."),

    h("Build a remembrance visit, not a sightseeing checklist"),
    list(
      "Choose one cemetery that connects to the person, unit, conflict or family history you are researching.",
      "Use the VA grave locator, Veterans Legacy Memorial or on-site kiosk before entering burial sections.",
      "Check current visitation hours and office hours on the official VA cemetery page the day you travel.",
      "Give funeral processions and committal shelters complete right of way.",
      "Photograph architecture or memorial landscapes discreetly; do not photograph grieving people without permission.",
      "Move ordinary meals, recreation and tourism activities off cemetery grounds.",
      "Pair the cemetery with a museum or historic site only after the remembrance visit is complete."
    ),

    h("Where to continue the military-history story"),
    p("National cemeteries preserve memory and individual service, but they are not designed to explain every campaign, branch or era. For artifacts and institutional history, continue to the Texas Military Forces Museum, National Museum of the Pacific War, USS Lexington, National WASP WWII Museum or Silent Wings Museum. For physical military landscapes, use Fort Davis, Palo Alto Battlefield, San Jacinto or the Texas frontier-forts route."),
    p("That division of purpose matters. Museums explain systems and objects. Battlefields explain terrain. Cemeteries preserve people, service and remembrance. Texas military history is strongest when each kind of place is allowed to do the job it was built—or preserved—to do."),
  ],
};
