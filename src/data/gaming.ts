export type GamingSource = {
  label: string;
  url: string;
  kind: "government" | "company" | "university" | "infrastructure" | "venue" | "industry";
};

export type GamingPage = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  eyebrow: string;
  summary: string;
  sections: { title: string; paragraphs: string[]; bullets?: string[] }[];
  sources: GamingSource[];
  related: { href: string; label: string; description: string }[];
  gearup?: "evergreen";
};

export const GAMING_REVIEWED_AT = "2026-09-24";

export const GEARUP_LINKS = {
  evergreen: {
    id: "17255582",
    label: "GearUP Boost",
    url: "https://www.anrdoezrs.net/click-101876465-17255582",
  },
  homepage: {
    id: "17235974",
    label: "GearUP",
    url: "https://www.kqzyfj.com/click-101876465-17235974",
  },
  subscription: {
    id: "17235979",
    label: "GearUP subscription",
    url: "https://www.dpbolvw.net/click-101876465-17235979",
  },
  eft: {
    id: "17235982",
    label: "GearUP for Escape from Tarkov",
    url: "https://www.dpbolvw.net/click-101876465-17235982",
  },
  fortnite: {
    id: "17235980",
    label: "GearUP for Fortnite",
    url: "https://www.tkqlhce.com/click-101876465-17235980",
  },
  apex: {
    id: "17235981",
    label: "GearUP for Apex Legends",
    url: "https://www.tkqlhce.com/click-101876465-17235981",
  },
  valorant: {
    id: "17235983",
    label: "GearUP for Valorant",
    url: "https://www.jdoqocy.com/click-101876465-17235983",
  },
  pubg: {
    id: "17342275",
    label: "GearUP for PUBG",
    url: "https://www.tkqlhce.com/click-101876465-17342275",
  },
} as const;

const texasFilm = { label: "Texas Film Commission — Digital Media Production in Texas", url: "https://gov.texas.gov/film/page/dm_overview", kind: "government" as const };
const filmImpact = { label: "Texas Film Commission — Program Impact and ROI", url: "https://gov.texas.gov/film/page/impact", kind: "government" as const };
const gameIncentive = { label: "Texas Film Commission — Video Game Projects", url: "https://gov.texas.gov/film/page/tmiiip_game", kind: "government" as const };
const jobsHotline = { label: "Texas Film Commission — Digital Media Job Hotline", url: "https://gov.texas.gov/film/hotline/game", kind: "government" as const };
const arlingtonVenue = { label: "City of Arlington — Arlington Expo Center / esports", url: "https://www.arlingtontx.gov/Parks-Places/Facilities/Arlington-Expo-Center", kind: "venue" as const };
const utd = { label: "UT Dallas — Gaming & Esports", url: "https://esports.utdallas.edu/", kind: "university" as const };
const uta = { label: "UT Arlington — Esports", url: "https://www.uta.edu/student-affairs/esports", kind: "university" as const };
const unt = { label: "University of North Texas — Esports", url: "https://recsports.unt.edu/programs/esports/index.html", kind: "university" as const };
const tamu = { label: "Texas A&M — A&M Esports", url: "https://getinvolved.tamu.edu/org/esports", kind: "university" as const };
const decixDallas = { label: "DE-CIX — Dallas Internet Exchange", url: "https://www.de-cix.net/en/locations/dallas", kind: "infrastructure" as const };
const decixHouston = { label: "DE-CIX — Houston Internet Exchange", url: "https://www.de-cix.net/en/locations/houston", kind: "infrastructure" as const };
const equinixDallas = { label: "Equinix — Dallas data centers and interconnection", url: "https://www.equinix.com/data-centers/americas-colocation/united-states-colocation/dallas-data-centers", kind: "infrastructure" as const };
const esaTexas = { label: "Entertainment Software Association — 2026 Economic Impact Report", url: "https://www.theesa.com/resources/2026-economic-impact-report/", kind: "industry" as const };

export const TEXAS_GAME_COMPANIES = [
  { name: "Electronic Arts / BioWare Austin", city: "Austin", focus: "AAA development, live services, technology and support functions", official: "https://careers.ea.com/careers/teams/ea-studios", careers: "https://careers.ea.com/", source: "EA currently identifies Austin as a studio location." },
  { name: "Gearbox Software", city: "Frisco", focus: "Game development and publishing", official: "https://www.gearboxsoftware.com/", careers: "https://www.gearboxsoftware.com/careers/", source: "Verify current Frisco operations on the company site before relying on local details." },
  { name: "Cloud Imperium Games", city: "Austin", focus: "Game development and live online game operations", official: "https://cloudimperiumgames.com/", careers: "https://cloudimperiumgames.com/join-us", source: "Company careers and studio pages are the controlling source for current Texas presence." },
  { name: "KingsIsle Entertainment", city: "Round Rock", focus: "Online and family-focused game development", official: "https://www.kingsisle.com/", careers: "https://www.kingsisle.com/careers/", source: "Texas Film Commission job resources list KingsIsle in Round Rock." },
  { name: "Zynga", city: "Austin", focus: "Mobile and live-service game development", official: "https://www.zynga.com/", careers: "https://www.zynga.com/jobs/", source: "Texas Film Commission job resources list Zynga in Austin." },
  { name: "Retro Studios", city: "Austin", focus: "Console game development", official: "https://www.retrostudios.com/", careers: "https://www.retrostudios.com/careers", source: "Use the studio's own site for current hiring and location details." },
  { name: "Gunfire Games", city: "Austin", focus: "PC and console game development", official: "https://gunfiregames.com/", careers: "https://gunfiregames.com/careers", source: "Use the studio's own site for current hiring and location details." },
  { name: "Panic Button", city: "Austin", focus: "Game development, porting and technical production", official: "https://panicbuttongames.com/", careers: "https://panicbuttongames.com/careers/", source: "Use the studio's own site for current hiring and location details." },
  { name: "Blind Squirrel Games", city: "Austin", focus: "Co-development, remasters and game production", official: "https://blindsquirrelentertainment.com/", careers: "https://blindsquirrelentertainment.com/careers/", source: "Texas Film Commission job resources list Blind Squirrel Games in Austin." },
  { name: "ProbablyMonsters", city: "Fort Worth", focus: "Game development", official: "https://probablymonsters.com/", careers: "https://probablymonsters.com/careers/", source: "Texas Film Commission job resources list ProbablyMonsters in Fort Worth." },
  { name: "Activision Blizzard", city: "Austin", focus: "Game development, publishing and support functions", official: "https://www.activision.com/", careers: "https://careers.activision.com/", source: "The June 18, 2026 Texas Film Commission job resource lists Activision Blizzard in Austin; Activision also identifies Austin among current U.S. early-career locations." },
  { name: "Aspyr Media", city: "Austin", focus: "Game development, publishing and platform adaptation", official: "https://www.aspyr.com/", careers: "https://www.aspyr.com/careers", source: "The Texas Film Commission lists Aspyr in Austin; Aspyr currently maintains an active careers portal." },
  { name: "SciPlay", city: "Austin", focus: "Social and mobile game development", official: "https://www.sciplay.com/", careers: "https://www.sciplay.com/careers", source: "The Texas Film Commission lists SciPlay in Austin and the company maintains a current careers portal." },
  { name: "Virtuix", city: "Austin", focus: "Virtual-reality gaming hardware, software and immersive entertainment", official: "https://virtuix.com/", careers: "https://virtuix.com/pages/career-opportunities", source: "The Texas Film Commission lists Virtuix in Austin and Virtuix's careers page identifies Austin as its current location." },
] as const;

export const COLLEGE_ESPORTS = [
  { school: "The University of Texas at Dallas", city: "Richardson", status: "Varsity program plus clubs", detail: "UT Dallas says its varsity program began in 2018 and fields teams in multiple titles; its Comets LANding center includes team, production and community spaces.", url: "https://esports.utdallas.edu/" },
  { school: "The University of Texas at Arlington", city: "Arlington", status: "Varsity esports", detail: "UTA publishes varsity esports tryout and team information through Student Affairs.", url: "https://www.uta.edu/student-affairs/esports" },
  { school: "University of North Texas", city: "Denton", status: "Varsity program plus club/intramural community", detail: "UNT identifies esports as a varsity program and publishes current team information through Recreational Sports.", url: "https://recsports.unt.edu/programs/esports/index.html" },
  { school: "Texas A&M University", city: "College Station", status: "Student organization / competitive teams", detail: "A&M Esports is listed by the university as a student organization; TexasDefined does not label it a varsity program.", url: "https://getinvolved.tamu.edu/org/esports" },
] as const;

export const GAMING_PAGES: GamingPage[] = [
  {
    slug: "video-game-industry",
    title: "Texas Video Game Industry: Studios, History, Incentives & Workforce",
    shortTitle: "Texas video game industry",
    description: "A sourced guide to Texas game development, studios, regional clusters, incentives, education and careers.",
    eyebrow: "Industry",
    summary: "Texas has been part of commercial game development for decades, with notable North Texas and Austin histories and a current statewide digital-media support structure through the Texas Film Commission. The durable story is broader than any single studio: employers, education, incentives, live-service operations, independent developers and related technical work form a network that changes over time.",
    sections: [
      { title: "How the industry fits Texas", paragraphs: ["The Texas Film Commission treats video games as part of the state's digital-media production sector alongside animation, visual effects and XR. Its current resources include a gameography, company directory, job hotline, education links and incentive guidance.", "That state framework is useful because studio rosters change. Acquisitions, remote work, project cycles and office consolidations can make older lists stale, so TexasDefined uses current first-party sources for employer status instead of assuming that a historical Texas studio remains active."] },
      { title: "Regional clusters", paragraphs: ["Austin remains the clearest development cluster, with large studios, independent teams and related technology talent. North Texas combines development activity with esports, convention infrastructure and a deep networking/data-center market. Other Texas cities have smaller but meaningful digital-media activity where current evidence supports it."], bullets: ["Austin / Central Texas — studios, software talent and digital-media workforce", "Dallas–Fort Worth — studios, esports, venues and interconnection infrastructure", "Houston and San Antonio — smaller game/digital-media footprints plus broader technology ecosystems"] },
      { title: "Incentives and workforce", paragraphs: ["Texas's Moving Image Industry Incentive Program includes qualifying video-game projects under its current rules. The Texas Film Commission also publishes a digital-media job hotline and career guidance. Eligibility, funding and project requirements can change, so developers should use the official program pages rather than summaries when making a production decision."] },
      { title: "Economic footprint", paragraphs: ["The Entertainment Software Association's 2026 Economic Impact Report, using 2025 industry data, estimates 8,124 direct video-game-industry jobs in Texas, 20,255 total intrastate employment impacts and 22,108 total interstate employment impacts. The report estimates $3.177 billion in direct Texas output, $5.865 billion in total intrastate output and $6.339 billion in total interstate output. These are industry-association/TEConomy estimates rather than a Texas government employment series, so TexasDefined presents them with their source and does not convert them into unsupported company-level job claims.", "ESA's Texas impact map separately provides a broad location and higher-education inventory. Those counts can include hardware, retail, support and other ecosystem organizations beyond game-development studios alone, which is why the TexasDefined company directory uses a narrower studio/employer standard."] },
    ],
    sources: [texasFilm, filmImpact, gameIncentive, jobsHotline, esaTexas],
    related: [
      { href: "/gaming/companies", label: "Video game companies in Texas", description: "Current company directory with official links." },
      { href: "/gaming/austin", label: "Austin game development", description: "Central Texas studio and workforce cluster." },
      { href: "/gaming/careers", label: "Gaming careers in Texas", description: "Roles, training paths and official job resources." },
    ],
  },
  {
    slug: "why-dallas-matters-online-gaming",
    title: "Why Dallas Matters to Online Gaming: Peering, Routing, Servers & Latency",
    shortTitle: "Why Dallas matters to online gaming",
    description: "Understand why Dallas is an important U.S. network hub for online gaming and how distance, peering, routing, congestion, packet loss and jitter affect play.",
    eyebrow: "Online gaming infrastructure",
    summary: "Dallas matters to online gaming because it is a major communications and interconnection market, not because every game has a server there and not because physical distance alone determines performance. A player's packets move through a chain of home networking, ISP routing, interconnection and game infrastructure; each segment can change latency and stability.",
    sections: [
      { title: "How Dallas fits into the network", paragraphs: ["DE-CIX operates a carrier- and data-center-neutral internet exchange in Dallas, while Equinix describes the region as a major South Central U.S. peering and communications hub. That density of networks, cloud connections and data centers makes Dallas a logical interconnection point for many internet services.", "A game publisher may place servers, cloud workloads or transit relationships in a central market for many reasons, including player distribution, cloud availability, cost and network reach. TexasDefined does not assume a particular title uses Dallas unless the game's own documentation or measurements support that claim."] },
      { title: "Distance is only one variable", paragraphs: ["Propagation delay generally rises with path length, but internet routes do not always follow the shortest geographic line. A Houston player can be sent through a different provider path than another Houston player, and an El Paso or Amarillo route can be affected by different upstream networks, handoffs and congestion.", "The practical path is: player → home network → ISP → regional routing → interconnection/peering → game server. Wi-Fi, bufferbloat, local congestion, overloaded links, packet loss and server load can matter as much as raw mileage."] },
      { title: "What to measure", paragraphs: ["Use in-game network statistics when available. Watch latency, jitter and packet loss together rather than chasing a single ping number. Compare wired Ethernet with Wi-Fi, test at different times, confirm that local downloads are not saturating the connection, and compare server regions if the title allows it."] },
    ],
    sources: [decixDallas, equinixDallas],
    related: [
      { href: "/gaming/latency", label: "Texas online gaming latency guide", description: "Troubleshooting for Texas players." },
      { href: "/gaming/data-centers-internet-infrastructure", label: "Texas data centers & gaming infrastructure", description: "The broader statewide connectivity picture." },
      { href: "/gaming/dfw", label: "Dallas–Fort Worth gaming industry", description: "Studios, esports and infrastructure as distinct parts of the regional ecosystem." },
    ],
    gearup: "evergreen",
  },
  {
    slug: "latency",
    title: "Texas Online Gaming Latency Guide: Ping, Jitter, Packet Loss & Routing",
    shortTitle: "Texas gaming latency guide",
    description: "A practical Texas guide to online gaming latency, routing, packet loss, jitter, Wi-Fi, ISPs and server selection without invented ping promises.",
    eyebrow: "Player guide",
    summary: "There is no honest statewide ping chart that can guarantee what a player in Houston, Austin, El Paso or the Panhandle will see. Performance depends on the specific ISP path, access technology, home network, game, server region, congestion and time of day.",
    sections: [
      { title: "What affects your latency", paragraphs: ["Fiber can reduce access-network delay and congestion compared with some alternatives, but a fiber customer can still have a poor route to a specific game. Cable, fixed wireless and other access types can perform well or poorly depending on local conditions. Wi-Fi adds another variable inside the home.", "Routing matters because two ISPs in the same city may hand traffic to different upstream networks or peer with a game platform in different places. Packet loss and jitter can make a stable-looking average ping feel worse than a slightly higher but consistent path."] },
      { title: "Regional differences across Texas", paragraphs: ["Dallas–Fort Worth players are physically close to a major interconnection market. Houston has its own growing exchange ecosystem and low-latency connectivity into Dallas. Austin and San Antonio sit between major Texas metros and can reach multiple network markets, while El Paso, the Rio Grande Valley, East Texas, the Panhandle and West Texas may depend on longer or less direct paths for some destinations.", "Those are structural observations, not promised ping ranges. Always test the exact game and ISP connection you use."] },
      { title: "Troubleshooting order", paragraphs: ["Start locally before buying a service: use wired Ethernet if practical, stop heavy uploads/downloads, reboot failing equipment, test at multiple times, update network drivers/firmware where appropriate, and compare game regions. If the route remains poor, traceroute-style diagnostics can help identify where delay begins, though many networks deprioritize or block diagnostic packets.", "A routing optimizer or gaming VPN can sometimes improve an inefficient path by choosing a different route. It cannot repair overloaded home Wi-Fi, a failing modem, game-server load or every ISP problem, and it can sometimes add overhead rather than improve performance."] },
    ],
    sources: [decixDallas, decixHouston, equinixDallas],
    related: [
      { href: "/gaming/why-dallas-matters-online-gaming", label: "Why Dallas matters to online gaming", description: "Peering and routing explained." },
      { href: "/gaming/data-centers-internet-infrastructure", label: "Texas data centers & internet infrastructure", description: "How the statewide network fits together." },
    ],
    gearup: "evergreen",
  },
  {
    slug: "companies",
    title: "Video Game Companies in Texas: Studios, Employers & Official Career Links",
    shortTitle: "Texas game companies",
    description: "A reviewed directory of active Texas game-development employers with city, focus, official website and careers links.",
    eyebrow: "Company directory",
    summary: "This directory favors current first-party evidence over historical reputation. A company can have important Texas history without maintaining the same office today, so each entry should be rechecked against the company's own site and current Texas Film Commission resources.",
    sections: [
      { title: "How to use the directory", paragraphs: ["Use the official company and careers links for current office and hiring information. TexasDefined does not copy company marketing descriptions, and inclusion is not an endorsement or ranking.", "The directory intentionally leaves out uncertain historical offices until current evidence is strong enough."] },
    ],
    sources: [texasFilm, jobsHotline],
    related: [
      { href: "/gaming/austin", label: "Austin game development", description: "A major Texas studio cluster." },
      { href: "/gaming/dfw", label: "DFW gaming industry", description: "North Texas studios, esports and infrastructure." },
      { href: "/gaming/careers", label: "Gaming careers in Texas", description: "Role families and training paths." },
    ],
  },
  {
    slug: "austin",
    title: "Austin Game Development: Studios, Careers & Central Texas Gaming",
    shortTitle: "Austin game development",
    description: "Explore Austin and Central Texas game development, studios, workforce, careers and official digital-media resources.",
    eyebrow: "Regional cluster",
    summary: "Austin is one of Texas's strongest game-development clusters. The durable advantage is not one company but the combination of software talent, established studios, independent teams, universities and a wider technology labor market.",
    sections: [
      { title: "Studios and employers", paragraphs: ["Electronic Arts identifies Austin as a major office with BioWare Austin and other EA functions. Texas Film Commission resources also list current Austin-area game-development employers, including Blind Squirrel Games and Zynga, while company sites remain the best source for current roles.", "Round Rock extends the cluster north into Williamson County through KingsIsle Entertainment and the broader Central Texas technology corridor."] },
      { title: "Careers and training", paragraphs: ["Austin-area opportunities span design, engineering, art, technical art, production, QA, live operations, analytics, support and adjacent software disciplines. Hiring varies with project cycles, so an evergreen careers guide should point to official employers and statewide job resources rather than freeze a list of openings."] },
    ],
    sources: [texasFilm, jobsHotline, { label: "Electronic Arts — EA Studios / Austin", url: "https://careers.ea.com/careers/teams/ea-studios", kind: "company" }],
    related: [
      { href: "/city/austin", label: "Austin", description: "City guide and relocation context." },
      { href: "/county/travis", label: "Travis County", description: "County research for the core Austin market." },
      { href: "/county/williamson", label: "Williamson County", description: "Round Rock and north-metro context." },
      { href: "/gaming/companies", label: "Texas game companies", description: "Reviewed employer directory." },
    ],
  },
  {
    slug: "dfw",
    title: "Dallas–Fort Worth Gaming Industry: Studios, Esports & Infrastructure",
    shortTitle: "DFW gaming industry",
    description: "A sourced guide to North Texas game studios, esports, venues and online-gaming infrastructure across Dallas–Fort Worth.",
    eyebrow: "Regional cluster",
    summary: "Dallas–Fort Worth has several different gaming stories that should not be collapsed into one: game development, esports teams and events, spectator venues, collegiate programs, and a major internet/data-center interconnection market.",
    sections: [
      { title: "Game development", paragraphs: ["North Texas has a long game-development history, including influential PC titles documented by the Texas Film Commission. Current employer status should always be verified from first-party company sources because studio ownership and office footprints change."] },
      { title: "Esports and live events", paragraphs: ["Arlington's city-owned Expo Center includes a purpose-built esports competition space. Frisco and the wider Metroplex have also hosted professional esports organizations and events, while UT Dallas, UT Arlington and UNT maintain distinct collegiate programs or teams."] },
      { title: "Network infrastructure", paragraphs: ["Dallas is a major peering and interconnection market. DE-CIX and Equinix both document the region's role as a network hub. That infrastructure can matter to online gaming, but it should not be confused with a claim that every publisher hosts servers in Dallas."] },
    ],
    sources: [texasFilm, arlingtonVenue, utd, uta, unt, decixDallas, equinixDallas],
    related: [
      { href: "/gaming/esports", label: "Texas esports", description: "Statewide teams, colleges and venues." },
      { href: "/gaming/esports-stadium-arlington", label: "Esports Stadium Arlington", description: "Venue and visitor guide." },
      { href: "/gaming/why-dallas-matters-online-gaming", label: "Why Dallas matters online", description: "Peering, routing and latency." },
    ],
  },
  {
    slug: "esports",
    title: "Texas Esports: Colleges, Venues, Teams & Major Events",
    shortTitle: "Texas esports",
    description: "A statewide Texas esports guide covering verifiable collegiate programs, Arlington's esports venue, events and the difference between varsity teams and clubs.",
    eyebrow: "Esports",
    summary: "Texas esports spans university varsity programs, student organizations, professional competition, live-event production and dedicated venue infrastructure. The status of teams and leagues can change quickly, so TexasDefined distinguishes durable institutions from time-sensitive rosters and schedules.",
    sections: [
      { title: "Collegiate esports", paragraphs: ["UT Dallas operates a varsity program plus gaming clubs and a dedicated gaming/esports center. UNT identifies esports as a varsity program. UT Arlington publishes varsity esports tryout information. Texas A&M lists A&M Esports as a student organization, so TexasDefined does not relabel it as varsity."] },
      { title: "Venues and events", paragraphs: ["The City of Arlington operates the Arlington Expo Center, which includes an esports competition facility and hosts esports functions. Individual tournament dates belong in the existing TexasDefined event system when a current official occurrence can be verified, rather than being hard-coded into an evergreen page."] },
      { title: "How status is handled", paragraphs: ["Professional team brands, ownership structures, tournament circuits and game titles can change faster than a statewide guide. TexasDefined treats official organization, venue, publisher and university pages as the controlling sources for current status."] },
    ],
    sources: [arlingtonVenue, utd, uta, unt, tamu],
    related: [
      { href: "/gaming/college-esports", label: "College esports in Texas", description: "Program-by-program distinctions and official links." },
      { href: "/gaming/esports-stadium-arlington", label: "Esports Stadium Arlington", description: "Planning and venue context." },
      { href: "/events/sports-events", label: "Texas sports events", description: "Current and recurring event planning." },
    ],
  },
  {
    slug: "esports-stadium-arlington",
    title: "Esports Stadium Arlington: Venue Guide, Events, Parking & Nearby Stay",
    shortTitle: "Esports Stadium Arlington",
    description: "Plan a visit to Arlington's esports venue with official facility facts, location, parking context, nearby attractions and links to current events and lodging.",
    eyebrow: "Venue guide",
    summary: "The esports competition space at Arlington Expo Center sits at 1200 Ballpark Way in Arlington's Entertainment District. City sources describe a roughly 30,000-square-foot competition showroom with capacity for more than 2,000 attendees, plus broadcast, production, training and hospitality space.",
    sections: [
      { title: "Venue background", paragraphs: ["Arlington opened its dedicated esports facility in 2018 by adapting convention-center space. Current city budget and facility materials describe the esports showroom as part of Arlington Expo Center rather than a stand-alone private arena.", "Because operators and event branding can change, visitors should use the City of Arlington facility and event calendar for current access details."] },
      { title: "Plan your visit", paragraphs: ["The Expo Center lists on-site parking, Wi-Fi, dining options and accessible entries. The venue is in the same entertainment district as Globe Life Field, AT&T Stadium, Texas Live! and other visitor destinations, so major-event traffic can affect arrival times.", "For an overnight trip, compare Arlington hotels after confirming the event date and venue schedule. TexasDefined's lodging modules may contain affiliate links; editorial venue information remains independent of those commercial placements."] },
      { title: "Events", paragraphs: ["Esports Stadium Arlington has hosted major tournaments, including Halo Championship Series competition. Evergreen venue content should link to current official calendars while TexasDefined's event system handles specific verified occurrences and recurring event pages."] },
    ],
    sources: [arlingtonVenue, { label: "City of Arlington — Halo Championship Series event coverage", url: "https://www.arlingtontx.gov/News-Articles/2024/March/2024-Halo-Championship-Series-Major-Held-at-Esports-Stadium-Arlington-Expo-Center", kind: "venue" }],
    related: [
      { href: "/city/arlington", label: "Arlington", description: "City visitor and relocation context." },
      { href: "/county/tarrant", label: "Tarrant County", description: "County research." },
      { href: "/gaming/esports", label: "Texas esports", description: "Statewide esports guide." },
      { href: "/events", label: "Texas events calendar", description: "Current event planning." },
    ],
  },
  {
    slug: "college-esports",
    title: "College Esports in Texas: Varsity Programs, Clubs & Facilities",
    shortTitle: "College esports in Texas",
    description: "Compare verifiable Texas college esports programs while keeping varsity teams, student clubs and facilities clearly distinguished.",
    eyebrow: "Education",
    summary: "College esports in Texas is not one uniform model. Some universities operate varsity programs, others support competitive clubs or student organizations, and facilities range from team rooms to large gaming and broadcast centers.",
    sections: [
      { title: "Varsity versus club", paragraphs: ["TexasDefined uses the institution's own language. UT Dallas and UNT explicitly describe varsity programs. UT Arlington publishes varsity esports tryouts. Texas A&M's official organization directory describes A&M Esports as a student organization, so it is listed that way here.", "Scholarships, supported games, conferences and team rosters can change by academic year. Follow the official program link for current details."] },
      { title: "Facilities and production", paragraphs: ["UT Dallas's Comets LANding is a notable example of esports expanding beyond competition into broadcast production, events and community gaming. That matters for students interested in production, social media, event operations and facility management as well as playing."] },
    ],
    sources: [utd, uta, unt, tamu],
    related: [
      { href: "/gaming/careers", label: "Gaming careers in Texas", description: "Career paths beyond competitive play." },
      { href: "/gaming/esports", label: "Texas esports", description: "Venues and statewide context." },
    ],
  },
  {
    slug: "careers",
    title: "Gaming Careers in Texas: Development, Art, QA, Networking & Esports",
    shortTitle: "Gaming careers in Texas",
    description: "Explore durable Texas gaming career paths in design, engineering, art, QA, production, networking, live operations, analytics, support and esports.",
    eyebrow: "Careers",
    summary: "A useful gaming-careers guide should explain role families and where to verify employers, not freeze today's openings into an evergreen page. Texas's digital-media ecosystem supports technical, creative, production and operations careers that often overlap with the wider software and media industries.",
    sections: [
      { title: "Role families", paragraphs: ["Game design turns systems and player goals into playable rules and content. Software engineering builds gameplay, tools, online systems and platform integrations. Art disciplines include concept, environment, character, animation, UI and technical art.", "QA and test roles investigate defects and regressions; production coordinates schedules and dependencies; live operations supports games after launch; networking and backend roles keep online services functioning; analytics, support and marketing connect product decisions to players and business operations."], bullets: ["Game design", "Software engineering", "Graphics and animation", "Technical art", "QA and test", "Networking / backend", "Live operations", "Production", "Publishing", "Esports and broadcast production", "Data and analytics", "Player support", "Marketing and community"] },
      { title: "How to search in Texas", paragraphs: ["Start with the Texas Film Commission's digital-media job hotline for a statewide snapshot, then use official employer career pages. For education, compare program curriculum and portfolio opportunities rather than relying on a school label alone.", "Game hiring is cyclical. A studio with no suitable opening today can still be a meaningful employer in the region, while a job board listing can disappear quickly."] },
    ],
    sources: [jobsHotline, { label: "Texas Film Commission — Getting Started in Digital Media", url: "https://gov.texas.gov/film/page/getting_started_in_digital_media", kind: "government" }],
    related: [
      { href: "/gaming/companies", label: "Texas game companies", description: "Official employer and career links." },
      { href: "/gaming/college-esports", label: "College esports", description: "Competition and production opportunities." },
      { href: "/texas-industries/technology-semiconductors", label: "Texas technology industry", description: "Adjacent software and infrastructure context." },
    ],
  },
  {
    slug: "history",
    title: "History of Video Games in Texas: North Texas, Austin & Major Milestones",
    shortTitle: "History of video games in Texas",
    description: "A sourced history of Texas video-game development, from influential North Texas PC games to Austin studios and today's digital-media ecosystem.",
    eyebrow: "History",
    summary: "Texas has an unusually consequential place in game-development history. The Texas Film Commission specifically highlights North Texas production of early blockbuster PC titles including Doom, Wolfenstein 3D, Duke Nukem 3D and Age of Empires, as well as the later mobile success Words with Friends.",
    sections: [
      { title: "North Texas and PC gaming", paragraphs: ["The Dallas–Fort Worth area became associated with several influential studios and games during the growth of PC gaming. The important historical point is the concentration of developers and publishers in North Texas, not a claim that every company behind those titles still maintains the same local presence today."] },
      { title: "Austin grows as a development center", paragraphs: ["Austin's broader software and technology ecosystem helped it develop into a major game-production market with established studios and a long-running developer community. Over time, Texas game development expanded into console, online, mobile, live-service and independent production."] },
      { title: "Preserving the record", paragraphs: ["The Texas Film Commission's gameography is a useful official starting point for identifying games developed or published in Texas. TexasDefined uses that source to anchor historical claims and company first-party pages for present-day status."] },
    ],
    sources: [texasFilm],
    related: [
      { href: "/gaming/video-game-industry", label: "Texas video game industry", description: "Today's ecosystem and incentives." },
      { href: "/gaming/dfw", label: "DFW gaming industry", description: "North Texas development and esports context." },
      { href: "/gaming/austin", label: "Austin game development", description: "Central Texas cluster." },
    ],
  },
  {
    slug: "events-conventions",
    title: "Gaming Conventions & Esports Events in Texas",
    shortTitle: "Texas gaming events",
    description: "Find Texas gaming conventions and esports events through the existing TexasDefined event system, with official-source verification and trip-planning links.",
    eyebrow: "Events",
    summary: "Gaming events change dates, venues and ticketing faster than evergreen industry content. TexasDefined therefore keeps the authority page evergreen while routing dated occurrences into the existing event calendar and event-detail system.",
    sections: [
      { title: "What belongs in the calendar", paragraphs: ["A recurring convention or tournament deserves an evergreen event page only when its recurrence and official identity are well established. Individual editions should carry current dates, official sources, venue information and appropriate ticket links when an approved partner actually sells that event.", "DreamHack Dallas is a good example of why recurrence must be rechecked: DreamHack said its U.S. festival moved to Atlanta for 2026 while Dallas convention-center work continues. The 2025 Dallas festival remains historically significant, but TexasDefined should not present a 2026 Dallas edition as upcoming. Historical tournaments can still be useful in venue or esports history when their status is labeled clearly."] },
      { title: "Plan a trip to an esports event", paragraphs: ["Confirm the official schedule first, then choose lodging and transportation around the actual venue. Large Arlington events may overlap with baseball, football or other entertainment-district traffic, while university events have different parking and campus-access considerations."] },
    ],
    sources: [arlingtonVenue, utd, { label: "DreamHack — 2026 U.S. festival location update", url: "https://dreamhack.com/blog/2025/11/02/a-message-to-the-community/", kind: "company" }],
    related: [
      { href: "/events", label: "Texas events calendar", description: "Current verified event occurrences." },
      { href: "/events/sports-events", label: "Texas sports events", description: "Sports and competition collection." },
      { href: "/gaming/esports-stadium-arlington", label: "Esports Stadium Arlington", description: "Venue planning." },
    ],
  },
  {
    slug: "data-centers-internet-infrastructure",
    title: "Texas Data Centers, Internet Infrastructure & Online Gaming",
    shortTitle: "Texas gaming infrastructure",
    description: "How Texas internet exchanges, data centers, peering and regional connectivity affect online gaming without exposing unnecessary infrastructure detail.",
    eyebrow: "Infrastructure",
    summary: "Online gaming depends on the same digital infrastructure used by cloud applications, enterprise networks and consumer internet services. Texas has multiple major connectivity markets, with Dallas standing out for interconnection density and Houston connected into a broader regional exchange ecosystem.",
    sections: [
      { title: "Interconnection and peering", paragraphs: ["Internet exchanges let participating networks exchange traffic more directly than they might through longer transit paths. DE-CIX documents neutral exchanges in Dallas and Houston, while Equinix describes Dallas as an important regional interconnection market.", "For players, the relevance is indirect: better-connected markets can give ISPs and content networks more routing options. That does not guarantee a particular game path or latency result."] },
      { title: "Data centers and cloud regions", paragraphs: ["Game publishers may use owned hardware, colocation, public cloud or a mixture. The physical location of compute is only one part of performance; the network path from the player to that compute matters too.", "TexasDefined deliberately avoids publishing unnecessary facility-security or operational details. This page is about economic and network concepts, not infrastructure targeting."] },
      { title: "Beyond gaming", paragraphs: ["The same interconnection and data-center ecosystem supports finance, healthcare, energy, software, AI and other Texas industries. Gaming is a useful consumer example of why routing quality and regional network topology matter."] },
    ],
    sources: [decixDallas, decixHouston, equinixDallas],
    related: [
      { href: "/gaming/why-dallas-matters-online-gaming", label: "Why Dallas matters to gaming", description: "A player-focused network explainer." },
      { href: "/gaming/latency", label: "Texas gaming latency guide", description: "Troubleshooting and route quality." },
      { href: "/texas-industries/technology-semiconductors", label: "Texas technology industry", description: "Broader technology and data-center context." },
    ],
  },
];

export const GAMING_PATHS = ["/gaming", ...GAMING_PAGES.map((page) => `/gaming/${page.slug}`)] as const;

export function getGamingPage(slug: string) {
  return GAMING_PAGES.find((page) => page.slug === slug);
}
