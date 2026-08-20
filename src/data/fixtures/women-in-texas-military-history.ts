import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const womenInTexasMilitaryHistoryArticle: Article = {
  id: "evergreen-women-in-texas-military-history",
  brandId: "texasdefined",
  slug: "women-in-texas-military-history",
  title: "Women in Texas Military History: From Army Nurses to the WASP and the Modern Force",
  dek: "Texas military history is full of women whose service was once treated as auxiliary, temporary or invisible. From Army nurses and Oveta Culp Hobby to the Women Airforce Service Pilots at Avenger Field, their work reshaped who could serve and what military service looked like.",
  category: "texas-history",
  region: "panhandle-plains",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/WASP_graduation_at_Avenger_Field%2C_Sweetwater%2C_Texas%2C_Jule_3%2C_1943.jpg?width=1600",
    alt: "Women Airforce Service Pilots graduation formation at Avenger Field in Sweetwater, Texas, in 1943",
    width: 3586,
    height: 2861,
    credit: "U.S. Army Air Forces · 1943 · Public domain · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-20",
  readingMinutes: 17,
  tags: ["women in Texas military history", "WASP", "Avenger Field", "Oveta Culp Hobby", "Women's Army Corps", "Texas women veterans", "Sweetwater Texas", "Texas military history"],
  featured: true,
  sourceName: "Texas Historical Commission",
  sourceUrl: "https://atlas.thc.texas.gov/Details?atlasnumber=5353005666&fn=print",
  internalLinks: [
    { href: "/article/texas-world-war-ii-bases-pow-camps", label: "Texas in World War II", description: "See how training bases, airfields and wartime mobilization transformed the state that the WASP and WAC helped support." },
    { href: "/article/texas-world-war-i-history-guide", label: "Texas in World War I", description: "Trace the earlier wartime expansion of nursing, camps and military support work in Texas." },
    { href: "/article/san-antonio-military-aviation-history", label: "San Antonio military aviation", description: "Connect women's military service to the aviation system that made Texas one of the country's major training centers." },
    { href: "/article/texas-national-guard-history", label: "Texas National Guard history", description: "Continue into the modern force and the expanding roles of women in state and federal military service." },
    { href: "/article/texas-recent-wars-military-history", label: "Texas in recent wars", description: "Follow the modern operational era in which women serve across a far wider range of military specialties." },
    { href: "/texas-history", label: "Texas History", description: "Return to the statewide history collection." },
  ],
  relatedCollections: [],
  relatedDestinations: ["texas-military-forces-museum"],
  body: [
    p("Women have always been part of war and military life in Texas, but the forms of service changed dramatically across the twentieth century. Long before women entered most combat arms, they worked as nurses, clerks, communications specialists, drivers, mechanics, instructors and pilots. Some served in uniform; others performed military work while technically classified as civilians."),
    p("Texas became especially important to that story because the state's enormous wartime training system created places where national experiments in women's military service became everyday reality. Camp hospitals, airfields, headquarters and training bases turned abstract policy changes into lived experience."),

    h("Military nursing opened one of the earliest formal paths"),
    p("Army nursing offered women one of the first established ways to serve directly inside the military system. During World War I and World War II, Texas camps and hospitals relied on military nurses to care for soldiers training in the state and casualties returning from overseas."),
    p("Nursing service still reflected the gender assumptions of its era. Women could hold enormous responsibility for medical care while remaining outside many command and career paths available to men. Even so, military nursing demonstrated that women could function under wartime discipline and operational pressure in ways that made later expansion harder to dismiss."),

    h("Oveta Culp Hobby helped turn women's wartime service into an institution"),
    p("One of the most important Texans in the history of women in the U.S. Army was Oveta Culp Hobby. Born in Killeen in 1905, Hobby built a career in law, journalism, government and publishing before joining the War Department during World War II."),
    p("In 1942 she became the first director of the Women's Army Auxiliary Corps. When the organization was brought formally into the Army in 1943 as the Women's Army Corps, Hobby became a colonel and continued as its director. Under her leadership, women moved into hundreds of military job classifications and served with Army commands around the world."),
    p("The Texas Historical Commission marker honoring Hobby in Killeen notes that more than 99,000 WAC members served by the end of the war. Hobby received the Distinguished Service Medal in 1945 for her leadership. Her career matters to Texas history because it linked the state's political and civic world directly to a major national change in military organization."),

    h("Avenger Field made Sweetwater a center of women's military aviation"),
    p("The most visually dramatic Texas story is the Women Airforce Service Pilots program at Avenger Field near Sweetwater. The program brought together the Women's Flying Training Detachment and Women's Auxiliary Ferrying Squadron under the WASP name in 1943."),
    p("Avenger Field became the principal training base for the program. More than 25,000 women applied, and 1,074 ultimately graduated as WASP pilots. Their training included navigation, meteorology, aircraft systems, ground school and hundreds of hours of flight work."),
    p("WASP pilots ferried aircraft, towed targets for gunnery training, tested aircraft, served as instrument instructors and performed other missions that freed male pilots for combat. They flew a wide range of military aircraft, including high-performance fighters and heavy bombers."),
    p("The program was military in discipline and function but civilian in legal status. That distinction had real consequences: WASP members initially lacked the military benefits and protections that uniformed service members received. Thirty-eight women died while serving with the program."),

    h("The WASP story also exposes the limits of wartime inclusion"),
    p("The program expanded opportunity for women while still reflecting the racial exclusions of its era. Jacqueline Cochran did not admit Black women to WASP training, even when qualified Black pilots sought entry. That means the WASP legacy is both pioneering and incomplete."),
    p("The program was disbanded in December 1944 as the Army Air Forces decided that the wartime need for women pilots had diminished. The women did not receive veteran status until decades later, which became one of the most visible examples of how military service could be celebrated rhetorically while being denied full legal recognition."),

    h("Texas military installations kept expanding women's roles after World War II"),
    p("The postwar military did not simply preserve World War II arrangements. Over time, women entered more technical, aviation, logistics, intelligence, medical, command and operational specialties. Texas bases became part of that evolution because so many major Army and Air Force training systems were concentrated in the state."),
    p("San Antonio is central to the postwar story. Medical training, aviation training, communications, intelligence and basic military training created thousands of assignments in which women served alongside men even before the final removal of many formal occupational barriers."),
    p("The Texas National Guard also reflects that long shift. Women today serve in the Texas Army National Guard, Texas Air National Guard and Texas State Guard across roles that would have been closed to them for most of the twentieth century."),

    h("Why this history belongs beside the battles"),
    p("Traditional military history tends to organize itself around battles, weapons and commanders. That can make institutional change look secondary even when it reshaped the force as profoundly as new technology. Women's service changed recruiting, training, personnel policy, career structures and assumptions about who could hold responsibility."),
    p("Texas offers an unusually good way to see those changes because the physical sites still exist. Sweetwater preserves the WASP story at Avenger Field and the National WASP WWII Museum. Killeen preserves the memory of Oveta Culp Hobby. Camp Mabry and San Antonio connect the World War II era to the modern force."),

    h("Places to connect the story"),
    list(
      "Avenger Field and the National WASP WWII Museum in Sweetwater: the strongest single Texas site for women's military aviation history.",
      "Oveta Culp Hobby historical marker in Killeen: a direct connection to the first director of the Women's Army Corps.",
      "Texas Military Forces Museum at Camp Mabry in Austin: a place to follow state military institutions into the modern era.",
      "San Antonio military installations and museums: useful for understanding the postwar expansion of women's medical, aviation and technical roles."
    ),
    p("Read together, these places shift the Texas military story away from a simple sequence of male combat units. They show a force that repeatedly changed its definition of service—and women who kept moving that boundary outward."),
  ],
};
