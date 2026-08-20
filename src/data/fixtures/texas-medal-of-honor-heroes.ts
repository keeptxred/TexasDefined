import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const texasMedalOfHonorHeroesArticle: Article = {
  id: "evergreen-texas-medal-of-honor-heroes",
  brandId: "texasdefined",
  slug: "texas-medal-of-honor-heroes",
  title: "Texas Medal of Honor Stories: Audie Murphy, Macario Garcia, Roy Benavidez and More",
  dek: "Texas military history is also a history of individual service. Audie Murphy, Macario Garcia and Roy Benavidez connect World War II and Vietnam to Texas communities, civil-rights struggles, the National Guard and the country's highest military decoration.",
  category: "texas-history",
  region: "north-texas",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Audie_Murphy.jpg?width=1600",
    alt: "U.S. Army publicity portrait of Texas-born Medal of Honor recipient Audie Murphy in uniform",
    width: 1104,
    height: 1600,
    credit: "U.S. Army · 1948 · Public domain · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-20",
  readingMinutes: 18,
  tags: ["Texas Medal of Honor", "Audie Murphy", "Macario Garcia", "Roy Benavidez", "Texas military heroes", "Medal of Honor recipients", "Texas veterans", "Texas military history"],
  featured: true,
  sourceName: "U.S. Army",
  sourceUrl: "https://www.army.mil/medalofhonor/",
  internalLinks: [
    { href: "/article/texas-world-war-ii-historic-sites-guide", label: "Texas and World War II", description: "Place Audie Murphy and Macario Garcia inside the larger wartime story." },
    { href: "/article/texas-recent-wars-military-history", label: "Texas in recent wars", description: "Continue from Vietnam-era service into the modern Texas military landscape." },
    { href: "/article/texas-national-guard-history", label: "Texas National Guard history", description: "Connect Murphy and Benavidez to the citizen-soldier tradition both men later joined or emerged from." },
    { href: "/article/buffalo-soldiers-texas-frontier-guide", label: "Buffalo Soldiers in Texas", description: "Compare decorated individual service with the longer history of Black Regular Army soldiers in Texas." },
    { href: "/texas-history", label: "Texas History", description: "Return to the statewide history collection." },
  ],
  relatedCollections: [],
  relatedDestinations: ["texas-military-forces-museum"],
  body: [
    p("The Medal of Honor is the United States' highest military decoration, awarded for conspicuous gallantry at the risk of life above and beyond the call of duty. Texas has deep connections to many recipients, but those connections are not all the same. Some were born in Texas, some entered the service here, some made the state their home, and some are buried in Texas military cemeteries."),
    p("It is also important to distinguish the federal Medal of Honor from the Texas Legislative Medal of Honor. The latter is the state's highest military award and is created through Texas law and legislative action. This guide focuses primarily on federal Medal of Honor recipients with strong Texas ties, while noting where the state has separately honored them."),

    h("Audie Murphy became the most famous Texas soldier of World War II"),
    p("Audie Leon Murphy was born in Hunt County and entered the Army during World War II. He rose from enlisted service to a battlefield commission and fought through the Mediterranean and European campaigns with the 3rd Infantry Division."),
    p("Murphy received the Medal of Honor for actions near Holtzwihr, France, on January 26, 1945. Under intense attack, he ordered his men back while remaining in an exposed position, called artillery fire and used the machine gun of a burning tank destroyer against advancing German troops."),
    p("His Medal of Honor was only one part of an unusually large group of U.S. and Allied decorations. The Army later described him as one of the most decorated American soldiers of World War II. After the war, Murphy became a film actor and eventually served in the Texas National Guard's 36th Infantry Division."),
    p("That postwar Guard connection matters because Murphy's Texas story did not end with Europe. His name became embedded in Army professional culture through the Sergeant Audie Murphy Club and in Texas memory through museums, roads, memorials and military institutions."),

    h("Macario Garcia connected battlefield valor to Mexican American civil rights"),
    p("Staff Sergeant Macario Garcia was born in Mexico and entered the U.S. Army from Sugar Land, Texas. Serving with the 4th Infantry Division in World War II, he fought in Europe after the Normandy campaign."),
    p("Near Grosshau, Germany, on November 27, 1944, Garcia attacked two German machine-gun positions after his company was pinned down. Although wounded, he continued the assault, destroyed the positions and captured prisoners. He received the Medal of Honor for those actions."),
    p("Garcia's return to Texas exposed a contradiction between military honor and civilian discrimination. After coming home, he was refused service at a restaurant in Richmond because of his ethnicity. The resulting confrontation became part of a larger Mexican American civil-rights story in Texas."),
    p("Garcia later became a U.S. citizen, worked with veterans and remained active in civic life. His story therefore belongs in both military and civil-rights history: the same country that awarded its highest decoration still tolerated discrimination against a decorated Mexican American veteran."),

    h("Roy Benavidez turned a rescue mission into one of Vietnam's most extraordinary citations"),
    p("Roy P. Benavidez was born in DeWitt County near Cuero and joined the Texas Army National Guard as a young man before moving into the Regular Army and eventually Special Forces."),
    p("On May 2, 1968, Benavidez voluntarily boarded a helicopter to reach a Special Forces reconnaissance team that had been surrounded west of Loc Ninh. Over hours of fighting, he organized survivors, administered first aid, directed supporting fire, recovered classified material and repeatedly moved wounded men toward evacuation aircraft."),
    p("Benavidez was wounded multiple times but continued operating until the surviving team members and sensitive material had been recovered. The Army citation credits his actions with saving the lives of at least eight men."),
    p("He initially received the Distinguished Service Cross because the evidence available at the time did not satisfy the Medal of Honor process. After an eyewitness account was found, the award was upgraded. President Ronald Reagan presented Benavidez the Medal of Honor in 1981."),
    p("Benavidez spent his later years speaking to students, mentoring young people and advocating for veterans. He is buried at Fort Sam Houston National Cemetery in San Antonio, tying his battlefield story back to one of Texas' most important military cities."),

    h("Texas memory includes more than three names"),
    p("Texas military cemeteries, Guard histories and state awards preserve the names of many other Medal of Honor recipients with Texas ties. Fort Sam Houston National Cemetery, for example, contains the graves of several recipients, including Cleto Rodriguez, Lucian Adams, José M. López, Louis Rocco and Roy Benavidez."),
    p("The Texas Legislative Medal of Honor adds another layer. The Texas Military Department lists recipients that include Audie Murphy, Roy Benavidez, Pedro Cano, Alfredo Cantu Gonzalez, Chris Kyle and others. That state award is legally distinct from the federal Medal of Honor and should not be treated as interchangeable with it."),

    h("Why individual hero stories need context"),
    p("Medal of Honor stories can easily become collections of dramatic anecdotes. The stronger historical approach is to connect the individual action to the military system around it: Murphy to the 3rd Infantry Division and the European war, Garcia to Mexican American military service and civil rights, and Benavidez to Special Forces and the Vietnam War."),
    p("That context also keeps the history from becoming mythology. Citations are formal military records describing extraordinary acts, but veterans' lives continued after the award. Their later careers, communities, injuries, advocacy and public memory are part of the Texas story too."),

    h("Places in Texas where the stories connect"),
    list(
      "Audie Murphy/American Cotton Museum in Greenville: connects Murphy's Hunt County origins with his wartime service and public legacy.",
      "Fort Sam Houston National Cemetery in San Antonio: burial place of Roy Benavidez and several other Medal of Honor recipients.",
      "Texas Military Forces Museum at Camp Mabry: connects decorated Texans with the wider history of the Texas Guard and state military forces.",
      "Houston and Fort Bend County: key places in Macario Garcia's postwar life and civil-rights story."
    ),
    p("Taken together, these lives show why Texas military history is not only a chronology of wars. It is also a history of people whose service changed how the state remembers courage, citizenship and sacrifice."),
  ],
};
