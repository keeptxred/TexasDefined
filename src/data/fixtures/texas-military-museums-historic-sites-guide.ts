import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const texasMilitaryMuseumsHistoricSitesGuideArticle: Article = {
  id: "evergreen-texas-military-museums-historic-sites-guide",
  brandId: "texasdefined",
  slug: "texas-military-museums-historic-sites-guide",
  title: "Texas Military Museums & Historic Sites: The Best Places to See the Story in Person",
  dek: "From aircraft carriers and battlefields to frontier forts, WASP hangars, glider training and Pacific War collections, this statewide guide turns Texas military history into places you can actually visit.",
  category: "texas-history",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ceremonies_at_Camp_Mabry_190112-Z-DZ751-0199_(32916620338).jpg?width=1600",
    alt: "A ceremony inside the Texas Military Forces Museum at Camp Mabry in Austin",
    width: 3000,
    height: 2002,
    credit: "Sgt. 1st Class Jim Greenhill / U.S. Army National Guard · Public domain · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-20",
  readingMinutes: 19,
  tags: ["Texas military museums", "Texas military historic sites", "USS Lexington", "National WASP WWII Museum", "Silent Wings Museum", "Texas Military Forces Museum", "National Museum of the Pacific War", "Texas battlefields", "Texas forts", "Texas military history"],
  featured: true,
  sourceName: "Texas Historical Commission",
  sourceUrl: "https://thc.texas.gov/learn/military-history",
  internalLinks: [
    { href: "/article/texas-military-history-timeline", label: "Texas military history timeline", description: "Start with the chronology before choosing the places that best match the era you want to explore." },
    { href: "/destination/uss-lexington-museum-corpus-christi", label: "USS Lexington Museum", description: "Walk the decks of the World War II Essex-class carrier preserved on Corpus Christi's North Beach." },
    { href: "/destination/national-wasp-wwii-museum-sweetwater", label: "National WASP WWII Museum", description: "Visit Avenger Field in Sweetwater, where Women Airforce Service Pilots trained during World War II." },
    { href: "/destination/silent-wings-museum-lubbock", label: "Silent Wings Museum", description: "See a restored CG-4A and the former South Plains Army Air Field where military glider pilots trained." },
    { href: "/destination/texas-military-forces-museum", label: "Texas Military Forces Museum", description: "Use Camp Mabry's collection to understand the Texas militia, National Guard, State Guard and 36th Infantry Division." },
    { href: "/destination/palo-alto-battlefield-national-historical-park", label: "Palo Alto Battlefield", description: "Walk the preserved prairie where the first major battle of the U.S.–Mexican War was fought." },
    { href: "/article/battleship-texas-bb-35-history-restoration", label: "Battleship Texas", description: "Follow BB-35 from the dreadnought era through both world wars and its Galveston restoration." },
    { href: "/texas-history", label: "Texas History", description: "Return to the statewide TexasDefined history collection." },
  ],
  relatedCollections: [],
  relatedDestinations: ["uss-lexington-museum-corpus-christi", "national-wasp-wwii-museum-sweetwater", "silent-wings-museum-lubbock", "texas-military-forces-museum", "palo-alto-battlefield-national-historical-park", "battleship-texas", "national-museum-pacific-war", "fort-davis-national-historic-site", "fort-mckavett", "fort-lancaster"],
  body: [
    p("Texas military history is unusually easy to experience on the ground. The state preserves battlefields from the Republic, the U.S.–Mexican War and the Civil War; frontier Army posts; World War training fields; naval vessels; National Guard collections; and museums built around specialized aviation programs. The strongest visits are the ones where the physical place explains something a general timeline cannot."),
    p("This guide is organized by what each place helps you understand, not by a ranking that pretends a carrier museum and a battlefield are interchangeable. Use it to choose a trip by era, geography or type of experience, then open the individual TexasDefined destination pages for current access and nearby-stop planning."),

    h("For naval aviation: USS Lexington in Corpus Christi"),
    p("USS Lexington (CV-16) is the most immersive naval-aviation stop in Texas. Commissioned in 1943, the Essex-class carrier fought across the Pacific and later served for decades as a training carrier before becoming a museum on Corpus Christi's North Beach."),
    p("The reason to visit is scale. Flight decks, hangar spaces and aircraft make carrier operations understandable in a way photographs cannot. It is also one of the easiest major military museums to combine with a family trip because the Texas State Aquarium sits next door and the Corpus Christi bayfront is close by."),

    h("For the dreadnought era and amphibious war: Battleship Texas"),
    p("Battleship Texas (BB-35) connects a different naval age to both world wars. The ship served with the British Grand Fleet in World War I and later provided gunfire support in North Africa, Normandy, Iwo Jima and Okinawa."),
    p("Its long restoration and move toward a permanent Galveston museum home make visitor access more fluid than at a conventional museum. TexasDefined therefore separates the ship's full history from its current destination status so travelers can learn the story without confusing restoration milestones with public opening dates."),

    h("For the Pacific War: National Museum of the Pacific War in Fredericksburg"),
    p("Fredericksburg's National Museum of the Pacific War is the strongest Texas museum for understanding the Pacific theater as a whole. Its connection to Fleet Admiral Chester W. Nimitz gives the institution a local Texas anchor while the collections expand far beyond one biography."),
    p("Pair it with the town's German-Texan history and nearby Hill Country destinations, but give the museum enough time on its own. It is a collection-heavy experience rather than a quick historic-house stop."),

    h("For Texas citizen-soldiers: Texas Military Forces Museum at Camp Mabry"),
    p("The Texas Military Forces Museum in Austin is the best single place to understand the institutional history of the Texas militia, National Guard, Texas State Guard and the 36th Infantry Division. Vehicles, uniforms and large artifacts connect nineteenth-century volunteer traditions with world wars, border missions, disasters and modern deployments."),
    p("Because the museum is on active Camp Mabry, access procedures matter. Check identification and visitor-control instructions before leaving home rather than assuming entry works like a normal city museum."),

    h("For women in military aviation: National WASP WWII Museum in Sweetwater"),
    p("The National WASP WWII Museum stands at Avenger Field, the principal World War II training base for Women Airforce Service Pilots. That original setting makes Sweetwater much more than a collection of WASP memorabilia: the training landscape itself is part of the interpretation."),
    p("The museum is the natural physical companion to TexasDefined's Women in Texas Military History guide. It also creates a useful West Texas aviation route with Lubbock's Silent Wings Museum."),

    h("For a specialized World War II aviation story: Silent Wings Museum in Lubbock"),
    p("Silent Wings Museum preserves the American military glider program on the former South Plains Army Air Field, where glider pilots trained during World War II. A restored CG-4A lets visitors see the aircraft used to carry troops, vehicles and supplies into combat without an engine."),
    p("Sweetwater and Lubbock work especially well together because both museums preserve unusual training programs that depended on Texas airfields, but their missions were very different. One centered women pilots flying powered military aircraft; the other trained pilots for engineless assault gliders."),

    h("For the opening of the U.S.–Mexican War: Palo Alto Battlefield"),
    p("Palo Alto Battlefield National Historical Park near Brownsville preserves the prairie where U.S. and Mexican armies fought on May 8, 1846. Unlike an artifact museum, the landscape itself explains artillery ranges, troop movement and why terrain mattered."),
    p("The National Park Service also interprets the causes and consequences of the war from both national perspectives. Pair Palo Alto with Resaca de la Palma, Brownsville and Port Isabel to understand the opening campaign as a connected border-and-supply story."),

    h("For the frontier Army: Fort Davis, Fort McKavett, Fort Lancaster and Fort Concho"),
    p("Texas's frontier forts are not interchangeable. Fort Davis preserves one of the best surviving nineteenth-century Army posts in the Southwest and is especially important to Buffalo Soldiers history. Fort McKavett preserves an unusually intact post landscape. Fort Lancaster explains the San Antonio–El Paso road and conflict in the Pecos region, while Fort Concho anchors the military history of San Angelo."),
    p("Visit at least two if you want to understand how geography changed Army life. The distances, water sources, roads and surrounding terrain are part of the story, not empty space between buildings."),

    h("For the Texas Revolution and Republic: go to the battlefields and presidios"),
    p("The Alamo is the most famous military site in Texas, but a fuller Revolution route also includes Presidio La Bahía and Goliad, San Jacinto Battleground, San Felipe de Austin and Washington-on-the-Brazos. Those places move the story from siege and battle into government, retreat, execution, logistics and independence."),
    p("TexasDefined's Revolution road-trip guide connects those stops chronologically so travelers do not reduce the war to one building in San Antonio."),

    h("Build the trip by region rather than trying to cross the state"),
    list(
      "Austin and the Hill Country: Texas Military Forces Museum, National Museum of the Pacific War and nearby Texas-history sites.",
      "Corpus Christi and the Gulf Coast: USS Lexington, coastal museums and a separate Galveston extension for Battleship Texas when public access allows.",
      "West Texas aviation: National WASP WWII Museum in Sweetwater plus Silent Wings Museum in Lubbock.",
      "Lower Rio Grande: Palo Alto Battlefield, Resaca de la Palma, Brownsville and Port Isabel.",
      "Fort country: choose a Fort Davis/Trans-Pecos route or a Fort McKavett–Fort Concho route rather than forcing distant posts into one day.",
      "Texas Revolution corridor: San Antonio, Goliad and San Jacinto work best as a multi-day sequence rather than one rushed loop."
    ),
    p("The practical rule is simple: use museums for objects and systems, ships for scale, and preserved landscapes for geography. Texas has enough of all three that military history can be experienced as a statewide network instead of a list of disconnected monuments."),
  ],
};
