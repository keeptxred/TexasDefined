import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const texasColdWarMilitaryHistoryArticle: Article = {
  id: "evergreen-texas-cold-war-military-history",
  brandId: "texasdefined",
  slug: "texas-cold-war-military-history",
  title: "Cold War Texas: Strategic Bombers, Missile Silos, Pantex and a State Built for Deterrence",
  dek: "From B-36 bombers at Fort Worth and Atlas missile silos around Abilene to U-2 missions from Laughlin and nuclear-warhead work at Pantex, Texas became one of the country's most important Cold War military landscapes.",
  category: "texas-history",
  region: "north-texas",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/B36-b-52-b-58-carswell.jpg?width=1600",
    alt: "B-36, B-52 and B-58 strategic bombers from Carswell Air Force Base flying together over Texas in 1958",
    width: 684,
    height: 404,
    credit: "U.S. Air Force Historical Research Agency · 1958 · Public domain · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-19",
  readingMinutes: 18,
  tags: ["Cold War Texas", "Pantex Plant", "Carswell Air Force Base", "Dyess Air Force Base", "Atlas missile silos", "Strategic Air Command", "Texas military bases", "nuclear history", "Texas military history"],
  featured: true,
  sourceName: "Texas Historical Commission",
  sourceUrl: "https://thc.texas.gov/learn/military-history/texas-cold-war",
  internalLinks: [
    { href: "/article/texas-military-history-timeline", label: "Texas military history timeline", description: "Continue the statewide chronology from the world wars into nuclear deterrence, Korea, Vietnam and the postwar military economy." },
    { href: "/article/texas-world-war-ii-bases-pow-camps", label: "Texas World War II bases and training camps", description: "See the wartime infrastructure that gave the Cold War military system a ready-made Texas foundation." },
    { href: "/article/san-antonio-military-aviation-history", label: "San Antonio military aviation", description: "Go deeper on Kelly, Brooks, Randolph, Lackland and the training system behind Military City USA." },
    { href: "/article/texas-national-guard-history", label: "Texas National Guard history", description: "Connect active-duty Cold War bases with the state's citizen-soldier institutions and Camp Mabry." },
    { href: "/destination/texas-military-forces-museum", label: "Texas Military Forces Museum", description: "Use the Camp Mabry museum as a public entry point into twentieth-century Texas military history." },
    { href: "/county/taylor", label: "Taylor County guide", description: "Connect Abilene and Dyess with the ring of former Atlas F missile sites around the city." },
    { href: "/county/tarrant", label: "Tarrant County guide", description: "Connect Fort Worth with Carswell, Convair and the strategic-bomber industry." },
    { href: "/texas-history", label: "Texas History", description: "Return to the statewide history hub and its connected military, aviation and industrial guides." },
  ],
  relatedCollections: [],
  relatedDestinations: ["texas-military-forces-museum"],
  body: [
    p("Cold War Texas was a network, not a single base. From 1946 to 1991, the state's enormous land area, existing World War II infrastructure, aviation industry, Gulf access, warm-weather training conditions and fast-growing cities made it useful to nearly every part of the national defense system. Strategic bombers operated from Texas. Pilots trained here. Intercontinental ballistic missiles sat in underground silos. Air-defense batteries guarded key installations. And near Amarillo, the Pantex Plant became a central node in the nuclear-weapons complex."),
    p("The Texas Historical Commission notes that dozens of active-duty sites operated across the state during the Cold War, including Air Force bases, Army posts, naval air stations, Atlas missile fields, Nike missile batteries and a Navy space-surveillance station. Some were inherited from World War II and adapted. Others were built specifically for a nuclear age in which speed, dispersal and constant readiness mattered more than the mass mobilization camps of 1942."),

    h("World War II left Texas with the infrastructure for another kind of war"),
    p("During World War II, Texas had become one of the nation's great training grounds. Airfields, camps, depots, factories and transportation links spread across the state. When wartime demobilization closed or reduced many installations after 1945, the infrastructure did not disappear. The Cold War gave many sites a new mission."),
    p("The change was visible in technology. Propeller trainers and temporary camps gave way to jet aircraft, radar networks, long-range strategic bombers and guided missiles. The mission also changed. Instead of preparing millions of troops for a declared global war, Cold War forces were expected to remain ready every day in hopes that readiness itself would deter a direct conflict with the Soviet Union."),

    h("Fort Worth became a strategic-bomber city"),
    p("The Fort Worth aviation complex became inseparable from the early nuclear deterrent. Convair's Fort Worth plant produced the enormous B-36 Peacemaker, the first operational bomber designed to deliver nuclear weapons across intercontinental distances without relying on overseas bases. Carswell Air Force Base beside the factory became one of Strategic Air Command's most important bomber installations."),
    p("The B-36 was followed by the jet-powered B-52 Stratofortress and supersonic B-58 Hustler. A famous 1958 Air Force photograph shows a B-36, B-52 and B-58 from Carswell in formation, almost a visual timeline of how quickly strategic aviation changed in a single decade."),
    p("Fort Worth's role was industrial as well as operational. Aircraft design, manufacturing, modification and military flying tied the region's economy to federal defense spending and helped create the aerospace workforce that remains part of North Texas industry."),

    h("Dyess surrounded Abilene with bombers and Atlas missiles"),
    p("Abilene actively sought a new Air Force base after the Korean War began. The installation opened in 1956 and was renamed Dyess Air Force Base later that year. Strategic Air Command units there operated B-47 and later B-52 bombers along with refueling aircraft. Crews lived with an alert culture built around the possibility of rapid nuclear retaliation."),
    p("The most dramatic Cold War landscape around Abilene was underground. Twelve Atlas F intercontinental ballistic missile sites were built in a ring around Dyess and operated during the early 1960s. The Texas Historical Commission describes each silo as roughly 185 feet deep and designed to protect an Atlas missile carrying a multi-megaton nuclear warhead."),
    p("The Atlas F system was technologically impressive but short-lived. Liquid-fueled missiles required complex preparation, and newer solid-fueled systems soon made them obsolete. The Dyess Atlas sites left behind a distinctive archeology of the nuclear age: massive reinforced structures scattered through ranch and farm country, many later transferred to private ownership."),

    h("Nike batteries defended the deterrent itself"),
    p("Strategic bombers and missile fields were valuable targets, so the military also built defenses around them. The Army deployed Nike surface-to-air missile batteries in Texas as part of a nationwide system intended to intercept attacking aircraft."),
    p("At Dyess, Nike Hercules sites were tied to the protection of the Strategic Air Command base and Atlas missile field. Other Texas Nike installations protected major population and military centers. Their presence illustrates the layered logic of Cold War defense: nuclear bombers and missiles were supposed to deter attack, while radar and air-defense missiles were supposed to protect the forces that provided the deterrent."),

    h("Pantex put the Texas Panhandle inside the nuclear weapons complex"),
    p("East of Amarillo, the Pantex story began during World War II as a conventional ordnance plant. It closed in 1945, but the federal government reclaimed the site in 1951 as the Cold War accelerated. Pantex was rebuilt for high-explosive fabrication and nuclear-weapons assembly."),
    p("The plant assembled thousands of nuclear warheads during the Cold War. As other facilities closed, more responsibilities moved to Pantex; since 1975 it has served as the nation's primary center for nuclear-weapons assembly, disassembly, retrofit and modification. The last newly produced nuclear weapon was completed there in 1991, after which dismantlement and stockpile stewardship became increasingly important missions."),
    p("Pantex should not be treated like an ordinary heritage attraction. It remains an active, highly secure National Nuclear Security Administration facility. Its historical importance is best explored through official Department of Energy and Pantex records, archival collections and public interpretation elsewhere rather than by attempting to visit an operational national-security site."),

    h("Texas aircraft watched Cuba during the missile crisis"),
    p("In October 1962, one of the Cold War's most dangerous crises put a Texas base directly into the intelligence fight. The Texas Historical Commission records that the 4080th Strategic Reconnaissance Wing and CIA elements flew U-2 missions from Laughlin Air Force Base near Del Rio to document the Soviet missile buildup in Cuba."),
    p("Those reconnaissance flights demonstrate that Texas Cold War infrastructure was not merely waiting for a hypothetical attack. Bases in the state supported real-world intelligence, training and overseas operations throughout the confrontation with the Soviet Union and its allies."),

    h("San Antonio trained the people behind the hardware"),
    p("San Antonio's military complex supplied another layer of the system. Lackland became a central Air Force basic-training installation, Randolph remained closely tied to flight training, Kelly supported logistics and aircraft maintenance, Brooks became important to aerospace medicine and Fort Sam Houston remained a major Army center."),
    p("The city's Cold War importance is easy to underestimate because it was distributed among institutions rather than defined by one famous weapon system. The strategic bomber could not fly without trained crews, maintenance, medicine, logistics and replacement personnel. San Antonio helped produce and sustain those people at industrial scale."),

    h("The Cold War also entered ordinary Texas life"),
    p("Nuclear strategy did not remain behind base gates. Texans encountered civil-defense campaigns, fallout-shelter signs, emergency planning and public anxiety about nuclear attack. Military communities grew around bases, while defense contracts shaped employment in places such as Fort Worth, San Antonio, Abilene and Amarillo."),
    p("The military itself was changing. The postwar armed forces were officially desegregated in 1948, meaning Cold War installations became workplaces where federal integration policies could collide with the segregation and civil-rights struggles of surrounding Texas communities. Service members and military families carried those tensions into schools, housing and local institutions."),
    p("Korea and Vietnam added a different kind of pressure. Texas bases trained and deployed personnel for wars that were part of the broader Cold War but involved very real combat. Anti-war protest, patriotic support, casualty notifications and returning veterans made the global confrontation personal in Texas towns far from Moscow or Hanoi."),

    h("What survives of Cold War Texas"),
    list(
      "Carswell / Fort Worth: the strategic-bomber and aircraft-production landscape that linked Convair, Strategic Air Command and generations of heavy bombers.",
      "Dyess / Abilene: an active Air Force base surrounded by the remnants of a twelve-site Atlas F missile field and former Nike air defenses.",
      "Pantex / Amarillo: an active nuclear-security installation whose official history documents Texas' central role in weapons assembly and disassembly.",
      "Laughlin / Del Rio: the base associated with U-2 reconnaissance during the Cuban Missile Crisis.",
      "San Antonio: a distributed military city where training, maintenance, medicine and logistics supported the Cold War force.",
      "Texas Military Forces Museum / Camp Mabry: a public museum where the state's twentieth-century military history can be explored without treating restricted installations as tourist sites."
    ),

    h("Why Cold War history changes the map of modern Texas"),
    p("The Cold War helped convert temporary wartime mobilization into permanent military geography. Bases became long-term employers, aerospace companies built skilled workforces around defense contracts, highways and suburbs grew around installations, and cities acquired identities that still depend on military institutions."),
    p("It also left a landscape that is easy to miss because some of its most important structures are underground, restricted, reused or demolished. Missile silos in farm country, former airfields under new development and secure facilities outside Amarillo do not look like conventional historic sites. Read together, however, they show how deeply Texas was built into the machinery of nuclear deterrence."),
  ],
};
