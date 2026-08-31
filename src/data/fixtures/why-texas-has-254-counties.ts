import smallTown from "@/assets/small-town.jpg";

import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const whyTexasHas254CountiesArticle: Article = {
  id: "evergreen-why-texas-has-254-counties",
  brandId: "texasdefined",
  slug: "why-texas-has-254-counties",
  title: "Why Texas Has 254 Counties",
  dek: "Texas has more counties than any other state. The reason is written into the state's size, settlement patterns and an old practical idea: local government had to be close enough for people to reach it.",
  category: "texas-history",
  hero: {
    src: smallTown,
    alt: "A Texas county-seat town centered on its courthouse and surrounding streets",
    width: 1600,
    height: 1067,
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-07",
  readingMinutes: 10,
  tags: [
    "texas counties",
    "texas history",
    "county seats",
    "texas courthouses",
    "local government",
    "texas geography",
  ],
  featured: true,
  sourceName: "Texas State Historical Association — County Organization",
  sourceUrl: "https://www.tshaonline.org/handbook/entries/county-organization",
  internalLinks: [
    {
      href: "/browse/counties",
      label: "Browse all 254 Texas counties",
      description: "Find every county in Texas and start with the places, towns and local information tied to it.",
    },
    {
      href: "/article/texas-courthouses-town-square",
      label: "Why Texas towns grew around courthouse squares",
      description: "See how county government, commerce and architecture turned the courthouse into the center of many Texas towns.",
    },
    {
      href: "/texas-history",
      label: "Keep exploring Texas history",
      description: "More stories about how the state became the place it is now.",
    },
    {
      href: "/explore/historic-sites",
      label: "Explore historic sites",
      description: "Courthouses, landmarks and places where Texas history is still visible on the ground.",
    },
    {
      href: "/explore",
      label: "Explore Texas by place",
      description: "Move from the map to parks, towns, rivers, regions and destinations across the state.",
    },
    {
      href: "https://www.tshaonline.org/handbook/entries/county-organization",
      label: "Handbook of Texas: County Organization",
      description: "Texas State Historical Association history of county government, county creation and the organization of Texas's 254th county in 1931.",
    },
    {
      href: "https://statutes.capitol.texas.gov/Docs/CN/pdf/CN.9.pdf",
      label: "Texas Constitution, Article IX",
      description: "Official constitutional text governing counties, including the geographic-center rule for relocating county seats.",
    },
    {
      href: "https://statutes.capitol.texas.gov/Docs/LG/pdf/LG.73.pdf",
      label: "Texas Local Government Code, Chapter 73",
      description: "Current Texas law governing the location and relocation of county seats, including the five-mile geographic-center rule.",
    },
    {
      href: "https://www.texas.gov/local-government-resources/",
      label: "Texas.gov local government resources",
      description: "Official Texas portal confirming the state's 254 counties and linking residents to county and local-government services.",
    },
    {
      href: "https://www.tsl.texas.gov/ref/abouttx/countyseats.html",
      label: "Texas State Library county and county-seat list",
      description: "Official state reference listing all Texas counties and their county seats.",
    },
    {
      href: "https://comptroller.texas.gov/transparency/local/counties.php",
      label: "Texas Comptroller county-government reference",
      description: "Official state overview of county revenue, taxes, budgets and public services across Texas's 254 counties.",
    },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("Texas has 254 counties. That number sounds excessive until you try to imagine governing a state this large in the 1800s, before interstate highways, pickup trucks, video calls or even reliable long-distance telephone service."),
    p("Counties were not drawn as trivia for a map. They were working units of local government. People needed a courthouse, a place to record deeds, a sheriff, courts, tax offices and officials close enough to reach without turning ordinary civic business into a multi-day expedition."),
    p("That practical problem—distance—helps explain why Texas ended up with more counties than any other state. The story is also about settlement, transportation, politics and the way new communities kept pushing westward across a very large piece of land."),

    h("Texas started with far fewer counties"),
    p("The map did not begin with 254 neat pieces. The Handbook of Texas traces Texas county government back to 23 Spanish-Mexican municipalities at independence in 1836; under the Republic those municipalities became counties, and by 1845 Texas had 36 regular counties. As population spread outward, new counties continued to be organized."),
    p("A county that worked when only a few settlements were scattered across a broad area could become impractical once farms, ranches and towns appeared farther from the county seat. Creating another county moved government closer to the people living there."),
    p("The process happened again and again. Parent counties were split. New county seats were chosen. Courthouses went up. Towns competed for the economic and political advantages that came with becoming the center of county government."),

    h("The real problem was travel time"),
    p("Modern Texans can cross several counties on the way to work and barely notice the boundaries. Nineteenth-century Texans experienced distance differently. Roads could be rough or nonexistent. Rivers could become obstacles. Heat, rain and mud mattered. A trip that takes forty minutes today might once have consumed most of a day."),
    p("That made proximity to the county seat important. The courthouse was not merely symbolic. It was where legal records were filed, property matters were handled, court cases were heard and public business was conducted."),
    p("Texas county boundaries therefore developed around a simple practical goal: make local government local enough to use."),

    h("Why so many county seats sit near the middle"),
    p("The geographic-center idea is written into Texas law. Article IX of the Texas Constitution protects a county seat located within five miles of the county's geographic center from removal except by a two-thirds vote, while a majority can move a more distant seat to a point within five miles of the center."),
    p("The Local Government Code carries the same principle into the organization of a new county: its first county seat may not be more than five miles from the geographic center unless at least two-thirds of voters approve the site."),
    p("Reality was rarely as simple as drawing a dot at the exact center. Rivers, railroads, existing towns, land donations and political rivalries influenced final locations. Still, Texas's constitutional and statutory rules show how strongly accessibility shaped the county-seat system."),

    h("The courthouse made a town matter"),
    p("Winning county-seat status could change the future of a Texas town. Lawyers, clerks, merchants, newspapers, hotels and restaurants followed courthouse traffic. Election days, trials, land transactions and public meetings brought people into town from the surrounding countryside."),
    p("That is one reason county-seat fights could become fierce. Two towns might compete for the designation, sometimes through elections and sometimes through years of political maneuvering. Losing the courthouse could mean losing the steady stream of people and business that came with it."),
    p("The legacy is still easy to see. Across Texas, some of the most recognizable small-town layouts place the courthouse at the center of a square with businesses facing it from every side."),

    h("Railroads changed the map without erasing the counties"),
    p("Railroads transformed Texas in the late nineteenth century. New towns sprang up along tracks, old routes lost importance and commercial centers shifted. A railroad town could grow faster than the county seat a few miles away."),
    p("But by then county government had become deeply rooted. Courthouses, records, elected offices and legal boundaries were not casually moved every time a new transportation technology changed where people shopped or shipped cattle."),
    p("So Texas accumulated layers: an older courthouse geography built for horse-and-wagon travel, then railroad geography, then highway geography, and eventually modern metropolitan regions that spill across multiple county lines."),

    h("West Texas created a different kind of county map"),
    p("As settlement moved west, Texas faced a new problem: enormous distances and much lower population density. Counties still needed to provide local government, but towns were farther apart and the landscape was less forgiving."),
    p("That helps explain the broad, geometric-looking county lines across much of West Texas and the Panhandle. On a map, many of these counties look more regular than the irregular boundaries found in older parts of the state where rivers, earlier settlements and inherited lines played a larger role."),
    p("The counties may be large by eastern Texas standards, but they still broke an immense region into units that could support courts, records and elected local government."),

    h("Why did Texas stop at 254?"),
    p("Texas has had 254 counties since the organization of Loving County in 1931, according to the Handbook of Texas. By then, the major waves of county creation had passed and transportation was improving quickly."),
    p("Once roads, automobiles and communications made longer distances easier to manage, the pressure to keep subdividing counties weakened. Creating a new county also meant creating another layer of offices, records, elections and public expense."),
    p("The result is a map that preserves the needs of an earlier Texas even though the way Texans move through the state has changed dramatically."),

    h("The counties are wildly different from one another"),
    p("A county is the same kind of governmental unit whether it contains a dense urban core, miles of ranchland, pine forest, coastal prairie or desert mountains. That does not mean the counties feel remotely alike."),
    p("Harris County contains Houston and millions of residents. Other Texas counties have populations small enough that a crowded suburban high school could outnumber them. Brewster County stretches across a vast sweep of Big Bend country, while Rockwall County occupies a compact piece of North Texas."),
    p("Those contrasts are part of what makes the 254-county map useful. It divides Texas administratively, but it also reveals just how many different versions of Texas fit inside one state."),

    h("Why counties still matter in everyday Texas life"),
    p("County lines can feel invisible until they suddenly matter. Property records, appraisal districts, courts, elections, sheriff departments, road responsibilities and other services can change when you cross one."),
    p("In fast-growing metropolitan areas, people often identify more strongly with a city or suburb than with a county. Yet county government continues doing work that affects daily life, particularly outside incorporated cities."),
    list(
      "County clerks maintain major public records and filings.",
      "Commissioners courts oversee county budgets, roads and other local responsibilities.",
      "Sheriffs provide law-enforcement functions, especially in unincorporated areas.",
      "County courts and district courts form important parts of the local judicial system.",
      "Election administration and voter services are organized through county-level offices.",
      "Property, tax and appraisal systems frequently require residents to know exactly which county they are in.",
    ),

    h("Why are there counties inside the big cities?"),
    p("Texas cities and counties overlap because they serve different purposes. Houston does not replace Harris County, and Austin does not replace Travis County. A city is a municipal government. A county is a separate layer of local government covering the full territory inside its boundaries, including cities and unincorporated areas."),
    p("Metro areas can also cross county lines. Dallas–Fort Worth is the clearest example, but growth around Houston, Austin and San Antonio has produced communities whose economic lives make far more sense as part of a metro region than as isolated county units."),
    p("That is another reason the old county map sometimes feels strange today: modern Texas has grown around transportation networks and metropolitan economies that did not exist when many of the lines were drawn."),

    h("Why not merge counties now?"),
    p("On paper, consolidation can sound efficient. In practice, counties carry generations of legal records, offices, elections, political identity and local institutions. County seats are embedded in communities. Residents know which courthouse, clerk, sheriff and appraisal system serves them."),
    p("Merging counties would therefore be much more than redrawing a map. It would require reorganizing government, records, representation and local responsibilities. The benefit would have to outweigh the disruption—and for most Texans, there is little pressure to undertake it."),

    h("The county map is a fossil of how Texas grew"),
    p("That may be the best way to understand all 254 counties. The map is not simply administrative clutter. It is a record of settlement moving outward, of communities wanting government closer to home, of courthouse towns competing to become local centers and of a state being divided into manageable pieces before modern transportation changed the meaning of distance."),
    p("Drive across Texas today and county-line signs flash past in seconds. But each line represents a time when crossing that same distance could have meant hours on a horse or behind a wagon."),
    p("Texas has 254 counties because Texas was enormous long before it was easy to get around. The map stayed. The travel time disappeared."),
  ],
};
