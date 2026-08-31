import courthouseHero from "@/assets/generated/texas-courthouse-square.jpg";

import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const texasCourthousesTownSquareArticle: Article = {
  id: "evergreen-texas-courthouses-town-square",
  brandId: "texasdefined",
  slug: "texas-courthouses-town-square",
  title: "The Texas Courthouse Square: Why So Many Towns Were Built This Way",
  dek: "Across Texas, county courthouses still anchor town squares built for a different age. Their architecture, politics and geography explain how local communities grew around public life—and why the old center of town still matters.",
  category: "texas-history",
  hero: { src: courthouseHero, alt: "Historic Texas courthouse centered on a traditional town square at golden hour", width: 1600, height: 1067 },
  authorId: "a-marisol",
  publishedAt: "2026-08-13",
  readingMinutes: 12,
  tags: ["texas courthouses", "county seats", "town squares", "texas history", "small towns", "architecture", "historic downtowns"],
  featured: true,
  sourceName: "Texas Historical Commission",
  sourceUrl: "https://thc.texas.gov/preserve/preservation-programs/courthouse-preservation",
  internalLinks: [
    { href: "/article/why-texas-has-254-counties", label: "Why Texas has 254 counties", description: "See how distance and local government created the county map—and the county seats at its center." },
    { href: "/article/texas-farm-to-market-roads-explained", label: "How Texas farm-to-market roads work", description: "Follow the road system that connected rural communities to many of these county-seat towns." },
    { href: "/texas-history", label: "Texas History", description: "More stories about the institutions and places that shaped the state." },
    { href: "/explore/small-towns", label: "Explore small towns", description: "Find Texas communities where the courthouse still anchors the center of town." },
    { href: "/browse/counties", label: "Browse Texas counties", description: "Explore all 254 counties and their local places." },
    { href: "https://thc.texas.gov/preserve/grants-tax-credits-and-funding/courthouse-grant-program", label: "Texas Historic Courthouse Preservation grant program", description: "Texas Historical Commission history, eligibility context and current grant-program information for historic county courthouses." },
    { href: "https://thc.texas.gov/preserve/grants-tax-credits-and-funding/courthouse-grant-program/current-courthouse-grant-projects", label: "Current Texas courthouse grant projects", description: "Texas Historical Commission's current project and award page; use this source for live participation, grant and restoration totals." },
    { href: "https://thc.texas.gov/review/state-project-review/courthouse-review-and-compliance", label: "Texas courthouse review and compliance", description: "Texas Historical Commission overview of the statutes, designations and review requirements protecting buildings that serve or have served as county courthouses." },
    { href: "https://thc.texas.gov/preserve/preservation-programs/courthouse-preservation/restored-historic-courthouses", label: "Restored historic Texas courthouses", description: "Texas Historical Commission pages for courthouse restoration projects around the state." },
  ],
  relatedCollections: [], relatedDestinations: [],
  body: [
    p("Drive into an older Texas county seat and the street pattern often gives away the story before the courthouse appears. Roads widen, storefronts turn toward a central block and the town seems to organize itself around one public building."),
    p("That arrangement was not accidental. For generations, the county courthouse was one of the busiest places in local life. It was where deeds were recorded, lawsuits were heard, taxes were handled, elections were administered and residents came to conduct business that could not be done anywhere else."),
    p("The Texas Historical Commission describes courthouses as some of the first permanent structures in many counties and as long-running centers of civic, business and community life. In other words, the courthouse square was not decorative planning. It was the operating system of a county-seat town."),

    h("The courthouse was a destination, not a backdrop"),
    p("In the nineteenth and early twentieth centuries, traveling to the county seat could consume much of a day. Once residents arrived, they needed places to eat, shop, stay overnight, conduct legal business and trade goods. Merchants naturally wanted storefronts close to the traffic."),
    p("The result was a civic and commercial loop: the courthouse drew people to town, and the businesses around the square made the courthouse trip more useful. In many communities, that basic geometry still survives even if the modern economy has moved toward highways and shopping centers."),

    h("Why the courthouse often sits in the middle"),
    p("Many Texas courthouses occupy an entire central block with streets on all four sides. That gave the building visibility and made it accessible from multiple directions. It also turned the courthouse lawn into public space for speeches, celebrations, memorials and ordinary gathering."),
    p("A courthouse square could be both practical and symbolic. Local government literally occupied the center of town. Houston offers an early urban example: the Texas Historical Commission notes that Courthouse Square appeared on the city's first map in 1836, with the courthouse site positioned at the center of the new town."),

    h("County-seat status could make or break a town"),
    p("Becoming the county seat brought lawyers, clerks, newspapers, hotels, banks and merchants. Losing that status could redirect traffic and investment elsewhere. That is why county-seat contests were sometimes intense political fights rather than dry administrative decisions."),
    p("Communities offered land, built temporary facilities, campaigned for votes and argued over which location was most convenient. The courthouse was infrastructure, prestige and recurring economic activity all at once."),

    h("The golden age of Texas courthouse building"),
    p("Texas courthouse construction accelerated dramatically in the late nineteenth century. According to the Texas Historical Commission, a major building era began after the Legislature authorized counties in 1881 to issue bonds for courthouse construction."),
    p("That financing arrived while railroads, ranching, cotton, commerce and settlement were rapidly transforming the state. Counties that had once operated from modest structures could commission ambitious public buildings intended to last for generations."),
    p("The Commission says roughly 150 surviving historic courthouses were built before 1920, with about 80 dating from before 1900. Those numbers help explain why courthouse architecture is so strongly associated with the visual identity of older Texas towns."),

    h("The buildings became advertisements for permanence"),
    p("Early courthouses were not always grand. Some counties used modest buildings until population and tax revenue justified something larger. But by the late nineteenth century, many Texas counties commissioned substantial masonry courthouses designed to communicate stability and civic ambition."),
    p("Romanesque towers, classical columns, domes, clock towers and elaborate stonework appeared in communities that might otherwise have had relatively simple commercial buildings. The courthouse told visitors that the county expected to be there for a long time."),

    h("Why so many old courthouses look different"),
    p("Texas courthouse architecture spans several eras and styles because counties built and rebuilt at different moments. Fires destroyed some structures. Population growth made others too small. Architectural fashions changed, and new materials and construction methods altered what counties could afford."),
    list("Romanesque Revival courthouses often emphasize heavy masonry, arches and towers.", "Classical and Beaux-Arts influences brought columns, symmetry and monumental entrances.", "Gothic, Renaissance Revival and Second Empire examples added still more regional variety.", "Later courthouses sometimes embraced Art Deco, Moderne or stripped-down civic designs.", "Mid-century replacements often prioritized office space and parking over the old town-square relationship."),
    p("The courthouse collection spans generations of county government, rebuilding and architectural fashion across Texas. The variety is not a design inconsistency; it is a physical timeline of how counties grew, rebuilt and changed their ideas about what public architecture should say."),

    h("The square became the town's memory"),
    p("Courthouse lawns accumulated monuments, plaques, shade trees and traditions. Parades passed the square. Election results were discussed there. Businesses around it changed owners but kept the same addresses for generations."),
    p("That layering is why courthouse squares often feel different from newer civic complexes. They are not simply government campuses. They are places where public life, commerce and local memory have occupied the same few blocks for a very long time."),

    h("Highways changed the center of gravity"),
    p("As automobiles reshaped Texas, businesses began following traffic to state highways, bypasses and suburban corridors. Motels, gas stations and shopping centers did not need to sit next to the courthouse. In some towns, the historic square declined as commercial life moved outward."),
    p("Farm-to-market and state highways created new paths into and around county seats. Some roads delivered traffic directly toward the old center; later bypasses often pulled through-traffic away. That is why a courthouse square can still be the historic heart of a town even when the busiest commercial intersection sits several miles away."),
    p("Other towns reinvented the square as a destination for restaurants, boutiques, festivals and tourism. The courthouse remained useful as both an operating public building and the visual anchor of a walkable district."),

    h("Texas nearly lost many of them"),
    p("Historic courthouses were not guaranteed to survive. The Texas Historical Commission says many deteriorated through decades of heavy use, deferred maintenance, insensitive alterations, fire or demolition, especially during the second half of the twentieth century."),
    p("Concern over those losses eventually led the Legislature to establish the Texas Historic Courthouse Preservation Program in 1999. The program combines grants, project review and long-term stewardship to keep historic courthouse buildings functional as well as historically recognizable."),

    h("Restoration is about more than pretty architecture"),
    p("Restoring an old courthouse can preserve craftsmanship that would be difficult to reproduce today, but the larger value is urban. A functioning courthouse brings daily activity to the center of town. A restored square can also support surrounding businesses and make historic streets worth maintaining."),
    p("As of August 2026, THC's current grant-program page reports more than $400 million awarded since the program began and 81 counties with full-restoration funding. The agency's separate stewardship program offers preservation training and technical assistance to all 254 counties."),
    p("Program participation, award totals and active grant rounds change over time; consult THC's current grant-projects and grant-program pages for the latest figures. The strongest preservation projects treat the courthouse, sidewalks, storefronts, trees, parking and public space as one connected place rather than saving a single building in isolation."),

    h("The courthouse square is a ready-made Texas road-trip network"),
    p("Because every county needed a seat of government, courthouse towns form a statewide network of historic centers rather than a single heritage corridor. A traveler can compare East Texas brick squares, Hill Country stone courthouses, Panhandle civic buildings, Gulf Coast county seats and West Texas monuments without leaving the same basic civic idea."),
    p("That makes courthouse squares useful waypoints when exploring Texas. Even a ten-minute stop can reveal the original town plan, the age of the commercial district and the relationship between county government, railroads and later highways."),

    h("What to notice when you visit a Texas courthouse square"),
    list("Where the courthouse sits relative to the original business district.", "Whether the building still serves its original purpose or has been adapted.", "Architectural details such as towers, domes, stone carving and original entrances.", "How storefronts face the courthouse and whether upper floors remain in use.", "Monuments, old trees and public markers on the courthouse grounds.", "Railroad, farm-to-market or state-highway corridors that may explain how later growth moved through or away from the square.", "Restoration plaques or markers that explain when a courthouse was rehabilitated."),

    h("The courthouse square still explains the town"),
    p("Even where the busiest intersection has moved miles away, the old square often reveals the original logic of the community. It shows where public authority sat, where merchants wanted to be and where residents expected to encounter one another."),
    p("That is why a Texas courthouse is more than a handsome old building. It is the center point of a map showing how local government, commerce and community life once fit together—and in many towns, still do."),
    p("Follow enough courthouse squares and a larger pattern appears. Texas's 254 counties are not just lines on a map. Each one needed a center, and for generations the courthouse was the place where that center became visible."),
  ],
};
