import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const texasNationalCemeteriesGuideArticle: Article = {
  id: "evergreen-texas-national-cemeteries-guide",
  brandId: "texasdefined",
  slug: "texas-national-cemeteries-guide",
  title: "Texas National Cemeteries: Fort Sam Houston, Houston and Dallas–Fort Worth",
  dek: "A practical and historical guide to three of Texas' major VA national cemeteries—where they are, when visitors can enter, what makes each landscape distinctive and how their veteran stories connect to Texas military history.",
  category: "texas-history",
  region: "south-texas",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Fort_Sam_Houston_National_Cemetery.jpg?width=1600",
    alt: "Panoramic view across Fort Sam Houston National Cemetery in San Antonio",
    width: 1600,
    height: 481,
    credit: "Travis K. Witt · CC BY-SA 4.0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-21",
  readingMinutes: 12,
  tags: ["Texas national cemeteries", "Fort Sam Houston National Cemetery", "Houston National Cemetery", "Dallas-Fort Worth National Cemetery", "Texas veterans", "military cemeteries", "Medal of Honor", "Texas military history"],
  featured: true,
  sourceName: "U.S. Department of Veterans Affairs — National Cemetery Administration",
  sourceUrl: "https://www.cem.va.gov/find-cemetery/state.asp?STATE=TX",
  internalLinks: [
    { href: "/destination/fort-sam-houston-national-cemetery", label: "Fort Sam Houston National Cemetery", description: "Plan a respectful visit to the historic San Antonio national cemetery and its memorial landscape." },
    { href: "/destination/houston-national-cemetery", label: "Houston National Cemetery", description: "See current visitor details for Houston's VA cemetery and its distinctive hemicycle." },
    { href: "/destination/dallas-fort-worth-national-cemetery", label: "Dallas–Fort Worth National Cemetery", description: "Plan a visit to the modern North Texas cemetery overlooking Mountain Creek Lake." },
    { href: "/article/texas-medal-of-honor-heroes", label: "Texas Medal of Honor stories", description: "Meet decorated veterans whose stories connect directly to Texas national cemeteries." },
    { href: "/article/texas-military-museums-historic-sites-guide", label: "Texas military museums and historic sites", description: "Continue the military-history trail through museums, forts, battlefields and preserved aircraft." },
    { href: "/texas-history", label: "Texas History", description: "Browse the wider Texas Defined history collection." },
  ],
  relatedCollections: [],
  relatedDestinations: ["fort-sam-houston-national-cemetery", "houston-national-cemetery", "dallas-fort-worth-national-cemetery", "texas-military-forces-museum"],
  body: [
    p("Texas' national cemeteries are active burial grounds first, but they are also major public landscapes of military memory. Their rows of markers, memorial walks, committal shelters, chapels and visitor kiosks connect individual veterans to wars, military installations and communities across the state. A visit should therefore be approached differently from a museum or battlefield: quietly, respectfully and with the understanding that funerals may be taking place."),
    p("The U.S. Department of Veterans Affairs' National Cemetery Administration operates multiple national cemeteries in Texas. This guide focuses on three large sites in the state's biggest metropolitan areas—Fort Sam Houston National Cemetery in San Antonio, Houston National Cemetery and Dallas–Fort Worth National Cemetery—because together they connect the older military city of San Antonio with the postwar growth of Houston and North Texas."),

    h("Fort Sam Houston National Cemetery: an interwar cemetery in America's Military City"),
    p("Fort Sam Houston National Cemetery adjoins the military post in northeast San Antonio. VA history places it among seven national cemeteries established during the major interwar expansion of the national cemetery system in 1934–1939, when veteran populations were increasing and older burial grounds were running out of space."),
    p("That location gives the cemetery unusual historical depth. San Antonio's military history stretches from Spanish presidios through the Texas Revolution and into a vast modern network of Army and Air Force installations. The cemetery turns that broad institutional history into thousands of individual stories."),
    p("Fort Sam Houston is especially important for visitors following Texas Medal of Honor history. VA records identify numerous recipients interred there, including Roy Benavidez, Lucian Adams, William Bordelon, Santiago Erevia, José M. López, Louis Rocco and Cleto Rodriguez. The cemetery also contains memorials, a carillon and burial sections that reflect successive eras of American military service."),
    list(
      "Address: 1520 Harry Wurzbach Road, San Antonio, TX 78209.",
      "Visitor hours: open daily from sunrise to sunset.",
      "Visitor kiosk: yes; it provides gravesite information and location maps.",
      "Best reason to include it in a history itinerary: the concentration of veteran stories within San Antonio's unusually long military landscape."
    ),

    h("Houston National Cemetery: the hemicycle and a major postwar veteran landscape"),
    p("Houston Veterans Administration Cemetery was dedicated on December 7, 1965. VA history describes it as the only government cemetery constructed in the United States during the 1960s and notes that it became a national cemetery in 1973 after the National Cemetery Act. The site was listed in the National Register of Historic Places in 2017."),
    p("Its defining architectural feature is the hemicycle. The semicircular memorial contains a chapel, speaker's stand and carillon tower, creating a formal ceremonial center unlike the more familiar linear rows of markers. VA describes it as the only hemicycle memorial managed by the National Cemetery Administration."),
    p("Houston National Cemetery also connects directly to major Texas military biographies. Medal of Honor recipients interred there include World War II veterans James H. Fields and Macario Garcia, Vietnam veterans David H. McNerney and Clarence Sasser, and Army Air Corps pilot Raymond L. Knight."),
    list(
      "Address: 10410 Veterans Memorial Drive, Houston, TX 77038.",
      "Visitor hours: open daily from 6:00 a.m. to 9:00 p.m.",
      "Visitor kiosk: yes; it provides gravesite information and maps.",
      "Best reason to include it in a history itinerary: the 1965 hemicycle and the cemetery's place in the expansion of postwar veteran memorial landscapes."
    ),

    h("Dallas–Fort Worth National Cemetery: a modern national cemetery built for a growing region"),
    p("Dallas–Fort Worth National Cemetery was dedicated and opened for burials on May 12, 2000. VA identifies it as the sixth national cemetery in Texas and the 118th in the national cemetery system. Its setting is distinctly different from the older San Antonio and Houston sites: more than 600 acres of rolling terrain overlook Mountain Creek Lake in southwest Dallas."),
    p("The cemetery's scale reflects the extraordinary growth of North Texas and its veteran population. A central boulevard leads through the landscape toward assembly and committal areas, while a memorial walkway contains monuments donated by veterans' organizations and other groups."),
    p("Among the Medal of Honor recipients interred there are Vietnam veteran Candelario Garcia and Korean War veteran James L. Stone. Other notable burials connect the cemetery to Texas civil-rights, sports, aviation and media history, demonstrating how a national cemetery can preserve stories far beyond battlefield service alone."),
    list(
      "Address: 2000 Mountain Creek Parkway, Dallas, TX 75211.",
      "Visitor hours: open daily from sunrise to sunset.",
      "Visitor kiosks: yes; VA notes public-information and administration-office locations.",
      "Best reason to include it in a history itinerary: a modern national cemetery landscape designed for the enormous North Texas veteran community."
    ),

    h("How to visit a national cemetery respectfully"),
    p("These are not conventional tourist attractions. Funeral processions, committal services and grieving families take priority over sightseeing. Keep voices low, avoid walking directly through active services, do not use graves as props for photographs and follow all posted VA rules. Pets are generally restricted except for service animals, and federal property rules apply."),
    p("The most useful tool for a visitor looking for a particular veteran is the cemetery kiosk or the VA's online grave locator. Section and site numbers matter because the grounds are large and similar rows of markers can extend far beyond what a first-time visitor expects."),
    p("Hours and operating policies can change, especially around federal holidays, weather events, road work and special ceremonies. Texas Defined checked the VA visitor information for these three cemeteries on August 21, 2026; verify the official VA cemetery page again before making a special trip."),

    h("A three-city Texas military-memory trail"),
    p("Taken together, the three cemeteries show the changing geography of military Texas. Fort Sam Houston grows from San Antonio's centuries-old military role. Houston represents the federal response to a rapidly expanding postwar veteran population. Dallas–Fort Worth shows how the national cemetery system continues to build large memorial landscapes for modern metropolitan regions."),
    p("They also connect naturally to other Texas Defined military-history stops: Camp Mabry and the Texas Military Forces Museum in Austin, the National Museum of the Pacific War in Fredericksburg, San Antonio's military sites, Houston-area World War II and civil-rights stories, and North Texas aviation history. The cemeteries provide the human endpoint of those larger stories—the places where service members and their families are remembered by name."),
  ],
};