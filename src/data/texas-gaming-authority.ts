export const TEXAS_GAMING_VERIFIED_AT = "September 24, 2026";

export type GamingSource = { label: string; url: string; note?: string };
export type GamingSection = { title: string; paragraphs: readonly string[]; bullets?: readonly string[] };
export type GamingFaq = { question: string; answer: string };
export type GamingPage = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  dek: string;
  articleSections: readonly string[];
  sections: readonly GamingSection[];
  sources: readonly GamingSource[];
  related: readonly string[];
  faq?: readonly GamingFaq[];
};

export const TEXAS_GAME_COMPANIES = [
  { name: "Gearbox Entertainment", city: "Frisco / Dallas area", focus: "Game development and publishing", notable: "Borderlands and other Gearbox franchises", companyUrl: "https://2k.com/studios/gearbox/", careersUrl: "https://2k.com/studios/gearbox/careers/", sourceUrl: "https://gov.texas.gov/film/hotline/game", status: "Current Texas operation verified through the Texas Film Commission and current 2K studio site." },
  { name: "Electronic Arts Austin", city: "Austin", focus: "Game development, technology and publishing operations", notable: "EA SPORTS and other EA teams", companyUrl: "https://www.ea.com/ea-studios/ea-sports/job-opportunities", careersUrl: "https://www.ea.com/careers", sourceUrl: "https://www.ea.com/ea-studios/ea-sports/job-opportunities", status: "EA maintains a current Austin location and careers presence." },
  { name: "Cloud Imperium Games", city: "Bee Cave", focus: "Game development", notable: "Star Citizen and Squadron 42", companyUrl: "https://cloudimperiumgames.com/", careersUrl: "https://cloudimperiumgames.com/join-us", sourceUrl: "https://cloudimperiumgames.com/pages/legal", status: "Cloud Imperium's current legal information lists a Texas company address in Bee Cave." },
  { name: "Retro Studios", city: "Austin", focus: "Game development", notable: "Nintendo studio; Metroid Prime series", companyUrl: "https://careers.nintendo.com/studios/retro-studios/", careersUrl: "https://careers.nintendo.com/studios/retro-studios/", sourceUrl: "https://careers.nintendo.com/studios/retro-studios/", status: "Nintendo's current studio page identifies Retro Studios in Austin." },
  { name: "Gunfire Games", city: "Austin", focus: "Game development", notable: "Remnant and Darksiders-related work", companyUrl: "https://gunfiregames.com/", careersUrl: "https://gunfiregames.com/careers", sourceUrl: "https://gunfiregames.com/careers", status: "Current careers information connects the studio to Austin." },
  { name: "KingsIsle Entertainment", city: "Round Rock", focus: "Online game development and publishing", notable: "Wizard101 and Pirate101", companyUrl: "https://www.kingsisle.com/", careersUrl: "https://www.kingsisle.com/careers/", sourceUrl: "https://gov.texas.gov/film/hotline/game", status: "The Texas Film Commission's June 2026 game-job directory lists KingsIsle in Round Rock." },
  { name: "Zynga", city: "Austin", focus: "Mobile and social game development", notable: "Live-service and mobile games", companyUrl: "https://www.zynga.com/us-location/austin-texas/", careersUrl: "https://www.zynga.com/jobs/", sourceUrl: "https://www.zynga.com/us-location/austin-texas/", status: "Zynga maintains a current Austin location page." },
  { name: "id Software", city: "Richardson", focus: "PC and console game development", notable: "DOOM and Quake", companyUrl: "https://idsoftware.com/", careersUrl: "https://jobs.zenimax.com/", sourceUrl: "https://idsoftware.com/", status: "id Software's current site identifies its Richardson address." },
  { name: "Panic Button", city: "Austin", focus: "Game development, ports and platform engineering", notable: "Console and platform adaptation work", companyUrl: "https://www.panicbuttongames.com/", careersUrl: "https://www.panicbuttongames.com/careers", sourceUrl: "https://gov.texas.gov/film/hotline/game", status: "The Texas Film Commission's June 2026 directory lists Panic Button in Austin." },
  { name: "Blind Squirrel Games", city: "Austin", focus: "Game development and co-development", notable: "Development and remaster/co-development work", companyUrl: "https://blindsquirrelentertainment.com/", careersUrl: "https://blindsquirrelentertainment.com/careers/", sourceUrl: "https://gov.texas.gov/film/hotline/game", status: "The Texas Film Commission's June 2026 directory lists Blind Squirrel Games in Austin." },
  { name: "Crystal Dynamics Southwest", city: "Austin", focus: "Game development", notable: "Part of Crystal Dynamics", companyUrl: "https://www.crystaldynamics.com/", careersUrl: "https://www.crystaldynamics.com/careers/", sourceUrl: "https://gov.texas.gov/film/hotline/game", status: "The Texas Film Commission's June 2026 directory lists Crystal Dynamics Southwest in Austin." },
] as const;

export const TEXAS_COLLEGE_ESPORTS = [
  { school: "The University of Texas at Dallas", city: "Richardson", programType: "Varsity esports plus student gaming organizations", games: "Current varsity information includes League of Legends, Overwatch 2, Rocket League, Super Smash Bros. Ultimate and VALORANT.", facility: "Comets LANding is the university's current gaming and esports facility.", url: "https://esports.utdallas.edu/" },
  { school: "University of North Texas", city: "Denton", programType: "Varsity esports plus clubs", games: "UNT currently identifies varsity competition in League of Legends, Overwatch and Rocket League, with additional clubs.", facility: "UNT operates a dedicated esports program and competition facility.", url: "https://recsports.unt.edu/programs/esports/get-involved.html" },
  { school: "The University of Texas at Arlington", city: "Arlington", programType: "Varsity esports", games: "UTA's current program materials identify varsity teams across major esports titles.", facility: "Campus esports facilities support varsity competition and student participation.", url: "https://www.uta.edu/student-affairs/esports" },
  { school: "Texas A&M University", city: "College Station", programType: "Student organization / competitive club", games: "A&M Esports supports competitive teams, but TexasDefined does not label it varsity because the university source presents it as a student organization.", facility: "Program information is maintained through the university's Get Involved organization directory.", url: "https://getinvolved.tamu.edu/org/esports" },
  { school: "University of Houston", city: "Houston", programType: "Campus esports facility and student gaming activity", games: "The Coog Arena supports tournaments and a broad current game library.", facility: "Coog Arena currently lists gaming PCs, console stations and tournament use.", url: "https://www.uh.edu/studentcenters/games/esports/" },
] as const;

export const TEXAS_GAMING_EVENTS = [
  { name: "Texas Showdown", city: "Houston", status: "Current recurring event", timing: "April 2–4, 2027 is published by the organizer.", summary: "A long-running fighting-game-community tournament with a current official Houston event site.", href: "https://www.txshowdown.com/", internalHref: "/events/tournaments-esports-tabletop-arcade" },
  { name: "QuakeCon", city: "Dallas–Fort Worth area", status: "Recurring event", timing: "Use the organizer for the next confirmed dates.", summary: "id Software describes QuakeCon as its annual convention in the Dallas area; current dates should be checked before travel.", href: "https://www.quakecon.org/", internalHref: "/events/tournaments-esports-tabletop-arcade" },
  { name: "DreamHack Dallas", city: "Dallas", status: "Historical / currently paused in Dallas", timing: "DreamHack announced Atlanta for 2026 while the Kay Bailey Hutchison Convention Center is unavailable during major renovation.", summary: "Keep Dallas history separate from the current festival calendar; do not present DreamHack Dallas as a currently scheduled Dallas event.", href: "https://dreamhack.com/", internalHref: "/events/tournaments-esports-tabletop-arcade" },
  { name: "Texas Pinball Festival", city: "Frisco", status: "Evergreen TexasDefined event guide", timing: "Reconfirm the current-year dates on the event guide.", summary: "A recurring North Texas gaming event already integrated into the TexasDefined event authority system.", href: "/event/texas-pinball-festival", internalHref: "/event/texas-pinball-festival" },
  { name: "Comicpalooza", city: "Houston", status: "Evergreen TexasDefined event guide", timing: "Reconfirm the current-year program before traveling.", summary: "A broader pop-culture convention with gaming content; it is not described as an esports-only event.", href: "/event/comicpalooza", internalHref: "/event/comicpalooza" },
] as const;

const statewideSources: readonly GamingSource[] = [
  { label: "Texas Film Commission — Digital Media Industries", url: "https://gov.texas.gov/film/page/dm_overview" },
  { label: "Texas Film Commission — Digital Media Job Hotline", url: "https://gov.texas.gov/film/hotline/game", note: "State directory updated June 18, 2026." },
  { label: "Texas Film Commission — Texas Moving Image Industry Incentive Program for video games", url: "https://gov.texas.gov/film/page/tmiiip_game" },
  { label: "Entertainment Software Association — Texas impact map", url: "https://www.theesa.com/video-game-impact-map/state/texas/", note: "Industry-association data; used as industry context rather than a state-government statistic." },
];

export const TEXAS_GAMING_PAGES: Record<string, GamingPage> = {
  "video-game-industry": {
    slug: "video-game-industry",
    title: "Texas Video Game Industry — Studios, Incentives, Jobs & Hubs",
    description: "Explore the Texas video game industry: active studios, Austin and DFW clusters, state digital-media incentives, workforce pipelines, careers and current official resources.",
    eyebrow: "Texas gaming economy",
    h1: "The video game industry in Texas",
    dek: "Texas has a durable game-development ecosystem anchored by Austin/Central Texas and Dallas–Fort Worth, with additional activity in Houston and other markets. This guide separates verified current operations from gaming history and shows how studios, incentives, education and technical infrastructure fit together.",
    articleSections: ["Business & economy", "Technology", "Gaming"],
    sections: [
      { title: "A real industry, not a list of logos", paragraphs: ["The strongest current evidence comes from first-party and state sources. The Texas Film Commission maintains a digital-media program, a game-focused job directory and a state incentive category for qualifying video-game projects.", "Studio lists age quickly. TexasDefined treats a company as current only when a recent official, company or university source still connects it to Texas; closed or historical operations belong in the history guide instead."], bullets: ["Game design and engineering", "Technical art and animation", "Online and live operations", "Mobile and social games", "QA, production and publishing", "Networking and platform engineering"] },
      { title: "Austin and Central Texas form the deepest development cluster", paragraphs: ["Current official sources connect Electronic Arts, Retro Studios, Cloud Imperium Games in Bee Cave, Zynga, Gunfire Games and other developers to Central Texas.", "Round Rock extends the cluster into Williamson County. The Texas Film Commission's June 2026 directory lists KingsIsle there, so the industry geography is broader than Austin city limits."] },
      { title: "Dallas–Fort Worth combines studios, esports and infrastructure", paragraphs: ["North Texas has a different mix. Gearbox is based near Dallas and the Texas Film Commission lists it in Frisco; id Software lists Richardson. Separately, Frisco and Arlington have visible esports institutions and venues.", "A game studio, an esports organization and a data center play different roles in the economy. TexasDefined keeps those categories distinct instead of turning geographic proximity into a causal claim."] },
      { title: "Incentives and workforce resources", paragraphs: ["The Texas Film Commission says qualifying video-game projects can use the state's moving-image incentive framework when they meet current program requirements. The state program page should control any project decision because rules can change.", "For job seekers, the durable path is employer career pages plus the Texas Film Commission job directory; wages and occupation research belongs in Texas Workforce Commission labor-market data."] },
    ],
    sources: statewideSources,
    related: ["video-game-companies", "austin-game-development", "dallas-fort-worth-gaming", "gaming-careers", "history-of-video-games"],
  },
  "why-dallas-matters-online-gaming": {
    slug: "why-dallas-matters-online-gaming",
    title: "Why Dallas Matters to Online Gaming — Peering, Servers & Latency",
    description: "Understand why Dallas is important to online gaming: interconnection, peering, fiber, data centers, routing, latency, packet loss, jitter and game-server paths.",
    eyebrow: "Texas network infrastructure",
    h1: "Why Dallas matters to online gaming",
    dek: "Dallas matters because it is a major communications and interconnection market in the center of the country—not because every game company owns a server there, and not because distance alone determines ping.",
    articleSections: ["Technology", "Internet infrastructure", "Online gaming"],
    sections: [
      { title: "How Dallas fits into the network", paragraphs: ["Online play follows a chain: your device reaches the home network, then your ISP, regional and long-haul routes, an interconnection point or transit provider, and finally the network hosting the game service.", "DE-CIX describes Dallas as a major neutral Internet Exchange and Equinix describes the Metroplex as a major network-peering and communications hub. Those infrastructure facts do not mean every game has a Dallas server or that an optimization service owns the infrastructure."], bullets: ["Player device", "Home network", "Internet service provider", "Regional routing", "Interconnection or peering", "Hosting network", "Game server"] },
      { title: "Distance is only one part of latency", paragraphs: ["Physical distance sets a practical lower bound, but an Internet route can be much longer than a straight line. An ISP may hand traffic to another network in a different city, peering can change the path, and congestion can add queuing delay.", "That is why players in Houston, Austin, El Paso and Amarillo can see different results to the same destination. The useful question is not only how far a player is from Dallas, but what route the traffic actually takes."] },
      { title: "Packet loss and jitter matter too", paragraphs: ["Average latency does not describe connection quality by itself. Packet loss means some traffic fails to arrive as expected; jitter describes timing variation. Both can create visible problems in real-time games even when download bandwidth is high.", "TexasDefined therefore separates latency, loss, jitter and throughput rather than turning a speed-test result into a gaming score."] },
      { title: "Routing optimizers are one tool, not a guarantee", paragraphs: ["A routing optimizer can sometimes help when the normal ISP path is inefficient or congested by selecting an alternate route. It cannot make a distant server physically nearby, repair weak Wi-Fi, remove game-server congestion or guarantee lower ping for every player.", "GearUP's documentation describes route selection and nodes as part of its product. TexasDefined presents it only as an optional commercial tool after explaining the underlying network issue in vendor-neutral terms."] },
    ],
    sources: [
      { label: "DE-CIX Dallas", url: "https://www.de-cix.net/en/locations/dallas" },
      { label: "Equinix — Dallas Metro data sheet", url: "https://www.equinix.com/resources/data-sheets/dallas-metro-data-sheet" },
      { label: "DE-CIX Houston", url: "https://www.de-cix.net/en/locations/houston" },
      { label: "Cloudflare — Internet quality measurement", url: "https://developers.cloudflare.com/speed/aim/" },
      { label: "GearUP Support — routing technology", url: "https://www.gearupbooster.com/support/what-is-gearup-routing-network-technology.html", note: "Vendor documentation; product-performance claims are not treated as independent evidence." },
    ],
    related: ["online-gaming-latency-guide", "data-centers-internet-infrastructure", "dallas-fort-worth-gaming"],
  },
  "online-gaming-latency-guide": {
    slug: "online-gaming-latency-guide",
    title: "Texas Online Gaming Latency Guide — Ping, Jitter & Routing",
    description: "A practical Texas guide to online gaming latency, packet loss, jitter, Wi-Fi, ISP routing, server selection and troubleshooting without made-up ping promises.",
    eyebrow: "Consumer gaming guide",
    h1: "Texas online gaming latency guide",
    dek: "There is no honest statewide ping chart that can promise what a Texas player will see. Connection quality changes by ISP, access technology, local network, game, server, route and time of day.",
    articleSections: ["Technology", "Consumer guide", "Online gaming"],
    sections: [
      { title: "What affects your latency", paragraphs: ["The same household can get different results across games because each game may use different hosting providers, server regions and network paths. A fiber connection can still take a poor route, while another access type can perform well to a nearby server.", "Start by separating the local network from the wider Internet. Test Ethernet when possible, compare more than one server region and record packet loss and jitter rather than relying only on a headline ping number."], bullets: ["ISP and peering path", "Fiber, cable or fixed wireless access", "Wi-Fi interference", "Local congestion or bufferbloat", "Game and server region", "Time of day", "Packet loss", "Jitter", "Routing changes"] },
      { title: "Texas geography changes the starting point", paragraphs: ["Dallas–Fort Worth players may have short physical paths to services hosted in North Texas, while Houston, Austin and San Antonio often reach Dallas through major regional routes. El Paso, the Rio Grande Valley, the Panhandle, East Texas and West Texas can add distance and use different upstream carriers.", "TexasDefined does not publish guaranteed milliseconds by region because that would imply a precision the network cannot support. Compare your own repeatable test to the same destination under controlled conditions."] },
      { title: "Troubleshoot before buying a fix", paragraphs: ["First rule out local causes: use wired Ethernet, stop large uploads, check whether another device is saturating the connection and compare results near the router. Then verify the game server or region. Only after that should you investigate ISP routing or alternate-route tools.", "If a routing optimizer changes the path, compare before-and-after results over multiple sessions. If the bottleneck is Wi-Fi, local congestion or the game server itself, a routing product may do nothing."] },
      { title: "When to contact the ISP or game provider", paragraphs: ["Persistent loss that begins beyond the home network, a large repeatable path change or a region-wide service problem can justify an ISP or game-support ticket. Keep timestamps, server region and wired-test results.", "Do not assume every intermediate router that ignores diagnostic probes is broken; network devices can deprioritize those probes while continuing to forward game traffic."] },
    ],
    faq: [
      { question: "Does fiber always give Texas gamers the lowest ping?", answer: "No. Fiber often improves access-network capacity and consistency, but end-to-end latency still depends on distance, routing, peering, congestion and the game-server location." },
      { question: "Can a routing optimizer fix Wi-Fi lag?", answer: "Usually not. A routing optimizer changes the path beyond your device, while weak Wi-Fi, interference and local congestion occur before traffic reaches that path." },
      { question: "Why can two Texas players get different ping to the same server?", answer: "They can use different ISPs, upstream carriers, peering points, local networks and access technologies, so their packets may take different routes even from nearby homes." },
    ],
    sources: [
      { label: "Cloudflare — Internet quality measurement", url: "https://developers.cloudflare.com/speed/aim/" },
      { label: "GearUP Support — nodes and modes", url: "https://www.gearupbooster.com/support/about-nodes-and-modes.html", note: "Vendor documentation; used to explain the product, not to guarantee results." },
      { label: "DE-CIX Dallas", url: "https://www.de-cix.net/en/locations/dallas" },
    ],
    related: ["why-dallas-matters-online-gaming", "data-centers-internet-infrastructure"],
  },
  "video-game-companies": {
    slug: "video-game-companies",
    title: "Video Game Companies in Texas — Verified Studio Directory",
    description: "A current-source directory of video game companies and studios operating in Texas, with cities, specialties, official sites, careers links and verification notes.",
    eyebrow: "Verified company directory",
    h1: "Video game companies in Texas",
    dek: "Studio directories go stale quickly. This one uses recent company pages and the Texas Film Commission to distinguish current Texas operations from historical studios, old office listings and unsupported directory copies.",
    articleSections: ["Business & economy", "Gaming", "Careers"],
    sections: [
      { title: "How the directory is verified", paragraphs: ["TexasDefined prefers a company's own location or careers page. When a company site does not state the Texas city clearly, the Texas Film Commission's current digital-media job directory provides a state-source cross-check.", "A listing here means there is recent evidence of a Texas operation. It does not mean the company is headquartered in Texas, is hiring today or maintains every historical Texas office it once had."] },
      { title: "What the Texas studio map shows", paragraphs: ["Austin and nearby Central Texas have the densest verified concentration in this review, with publishers, independent developers, mobile-game teams and co-development studios. North Texas adds Frisco, Richardson and Fort Worth operations.", "The list is intentionally smaller than broad web directories that mix active, inactive and historical companies. Accuracy is more useful than a larger unverified count."] },
    ],
    sources: statewideSources,
    related: ["video-game-industry", "austin-game-development", "dallas-fort-worth-gaming", "gaming-careers"],
  },
  "austin-game-development": {
    slug: "austin-game-development",
    title: "Austin Game Development — Studios, Careers & Central Texas",
    description: "Explore Austin and Central Texas game development, including current studios, Bee Cave and Round Rock connections, careers, education and state digital-media resources.",
    eyebrow: "Central Texas gaming cluster",
    h1: "Austin game development",
    dek: "Austin's game industry is best understood as a Central Texas cluster. The city proper holds many studios, while Bee Cave and Round Rock extend the ecosystem into surrounding counties.",
    articleSections: ["Business & economy", "Technology", "Gaming", "Austin"],
    sections: [
      { title: "Why Austin has a deep studio base", paragraphs: ["Austin combines software talent, university pipelines, a long development history and a broader technology labor market. Current sources connect EA Austin, Retro Studios, Zynga, Gunfire Games and other developers to the city.", "The Texas Film Commission also lists additional Austin digital-media employers, making the state directory a useful cross-check for offices whose individual pages are less explicit."] },
      { title: "The cluster extends beyond Austin city limits", paragraphs: ["Cloud Imperium Games lists a Bee Cave address, tying the industry into western Travis County. The state job directory lists KingsIsle in Round Rock, creating a clear Williamson County connection.", "TexasDefined therefore cross-links this guide to Austin, Travis County, Round Rock and Williamson County rather than treating the economic geography as a single municipal boundary."] },
      { title: "Education and workforce", paragraphs: ["Central Texas offers programs relevant to software engineering, design, art, animation and interactive media. The strongest pathway depends on the role: a gameplay engineer and a technical artist need different portfolios and training.", "Current openings change too quickly for a static guide. Use the company directory, official career pages and the Texas Film Commission job hotline."] },
    ],
    sources: [...statewideSources, { label: "EA Austin", url: "https://www.ea.com/ea-studios/ea-sports/job-opportunities" }, { label: "Nintendo Careers — Retro Studios", url: "https://careers.nintendo.com/studios/retro-studios/" }, { label: "Cloud Imperium Games — Texas address", url: "https://cloudimperiumgames.com/pages/legal" }, { label: "Zynga Austin", url: "https://www.zynga.com/us-location/austin-texas/" }],
    related: ["video-game-companies", "video-game-industry", "gaming-careers", "college-esports"],
  },
  "dallas-fort-worth-gaming": {
    slug: "dallas-fort-worth-gaming",
    title: "Dallas–Fort Worth Gaming Industry — Studios, Esports & Infrastructure",
    description: "Explore the Dallas–Fort Worth gaming ecosystem: verified studios, Frisco esports, Arlington venues, Richardson development and North Texas network infrastructure.",
    eyebrow: "North Texas gaming cluster",
    h1: "Dallas–Fort Worth gaming industry",
    dek: "DFW's gaming story has several distinct layers: game development, esports organizations and venues, college programs, and a major Internet-interconnection market. Keeping those layers separate makes the regional picture more accurate.",
    articleSections: ["Business & economy", "Gaming", "Esports", "Internet infrastructure", "Dallas–Fort Worth"],
    sections: [
      { title: "Studios and employers", paragraphs: ["Gearbox's current 2K studio page says the developer is based near Dallas, while the Texas Film Commission's 2026 directory lists Gearbox in Frisco. id Software's current site lists Richardson. The state directory also identifies game-development activity in Fort Worth.", "Those are employer and studio facts, not evidence that the companies operate local Internet exchanges or data centers."] },
      { title: "Frisco's esports connection", paragraphs: ["The GameStop Performance Center at The Star in Frisco remains an important Complexity Gaming location and public-facing esports facility. That footprint centers on team operations, training, media and events rather than game production.", "Frisco therefore connects naturally to Collin County relocation and business research, especially for readers comparing technology and esports employment clusters."] },
      { title: "Arlington's venue role", paragraphs: ["Arlington's esports venue adds a spectator and event-planning layer. The venue is covered separately because visitor logistics, capacity, parking and nearby lodging deserve different treatment from employer research."] },
      { title: "Dallas as an interconnection market", paragraphs: ["DE-CIX and Equinix document Dallas–Fort Worth as a significant interconnection and peering market. That can matter to online gaming because paths between access networks and hosting networks often meet in regional hubs.", "TexasDefined does not turn that fact into a claim that every game server is in Dallas or that an affiliate partner owns the region's infrastructure."] },
    ],
    sources: [{ label: "2K — Gearbox Entertainment", url: "https://2k.com/studios/gearbox/" }, { label: "Texas Film Commission — game jobs", url: "https://gov.texas.gov/film/hotline/game" }, { label: "id Software", url: "https://idsoftware.com/" }, { label: "GameStop Performance Center", url: "https://gspc.gg/" }, { label: "DE-CIX Dallas", url: "https://www.de-cix.net/en/locations/dallas" }, { label: "Equinix Dallas Metro", url: "https://www.equinix.com/resources/data-sheets/dallas-metro-data-sheet" }],
    related: ["why-dallas-matters-online-gaming", "esports", "esports-stadium-arlington", "video-game-companies", "college-esports"],
  },
  esports: {
    slug: "esports",
    title: "Texas Esports — Teams, Colleges, Venues & Events",
    description: "A current guide to esports in Texas, including collegiate programs, Frisco and Arlington facilities, statewide competition and recurring events.",
    eyebrow: "Texas competitive gaming",
    h1: "Texas esports",
    dek: "Texas esports includes professional organizations, college programs, scholastic competition, fighting-game tournaments and public venues. Varsity teams, student clubs and commercial organizations are not interchangeable.",
    articleSections: ["Esports", "Sports", "Education", "Events"],
    sections: [
      { title: "North Texas is a major esports cluster", paragraphs: ["Frisco's GameStop Performance Center gives Complexity Gaming a visible North Texas base, while Arlington has a purpose-built esports venue and several Metroplex universities operate varsity programs.", "Houston supports major fighting-game competition, San Antonio hosts statewide activity and campus programs operate across Texas, so DFW is not the whole state story."] },
      { title: "Collegiate esports needs precise labels", paragraphs: ["UT Dallas, UNT and UT Arlington publish formal esports program information. Texas A&M's official directory presents A&M Esports as a student organization, so TexasDefined labels it as a club/competitive organization instead of calling it varsity.", "Scholarship terms, supported titles and league memberships can change each academic year. Official school pages control those details."] },
      { title: "Scholastic competition is not a UIL program", paragraphs: ["TexasDefined found current statewide scholastic activity through the Texas Esports Collective and its Texas Esports Conference structure. That is separate from the University Interscholastic League, so this site does not describe a UIL Esports State Championship without an official UIL source.", "The Texas Esports Collective publishes current school and collegiate competition information; dates and venues remain organizer-controlled."] },
      { title: "Events range from arenas to fighting games", paragraphs: ["Texas Showdown in Houston is a recurring fighting-game-community tournament. QuakeCon has a long Dallas-area identity. DreamHack Dallas is historically important but should not be represented as a current Dallas festival while its U.S. festival is elsewhere."] },
    ],
    sources: [{ label: "GameStop Performance Center", url: "https://gspc.gg/" }, { label: "Arlington tourism — Esports Stadium Arlington", url: "https://www.arlington.org/meetings-conventions/esports-stadium-arlington/" }, { label: "Texas Esports Collective", url: "https://texasesports.org/" }, { label: "UT Dallas Esports", url: "https://esports.utdallas.edu/" }, { label: "UNT Esports", url: "https://recsports.unt.edu/programs/esports/get-involved.html" }, { label: "UT Arlington Esports", url: "https://www.uta.edu/student-affairs/esports" }, { label: "Texas Showdown", url: "https://www.txshowdown.com/" }],
    related: ["college-esports", "esports-stadium-arlington", "gaming-events", "dallas-fort-worth-gaming"],
  },
  "esports-stadium-arlington": {
    slug: "esports-stadium-arlington",
    title: "Esports Stadium Arlington — Venue, Events & Visitor Guide",
    description: "Plan a visit to Arlington's esports venue with verified facility context, location, event links, parking and transportation guidance, nearby attractions and lodging tools.",
    eyebrow: "Arlington esports venue",
    h1: "Esports Stadium Arlington",
    dek: "Arlington's esports facility is part competition venue, part production environment and part convention-campus asset. This guide uses city and tourism sources for venue facts, then connects visitors to Arlington, Tarrant County, current events and nearby lodging.",
    articleSections: ["Esports", "Travel & events", "Arlington"],
    sections: [
      { title: "Venue background and scale", paragraphs: ["Arlington tourism materials describe a 30,000-square-foot, column-free competition space with seating configurations up to roughly 2,500. City materials place the esports operation within the broader Arlington convention complex.", "Capacity depends on event setup, so use the organizer or event listing for the specific configuration rather than treating the maximum figure as a seat count for every tournament."] },
      { title: "Location and getting there", paragraphs: ["The venue is at 1200 Ballpark Way in Arlington, inside the city's sports-and-entertainment district. Traffic for nearby major venues can materially change drive times and parking availability.", "Check the current event organizer and Arlington visitor information before departure. Parking rules can vary with the event calendar, and rideshare or hotel-shuttle options depend on the property and date."] },
      { title: "Build a broader Arlington trip", paragraphs: ["The venue sits near Arlington's major sports and entertainment attractions, so an esports trip can be combined with other stops without crossing the Metroplex. Keep the tournament schedule fixed first, then add nearby attractions around it.", "Use TexasDefined's Arlington and Tarrant County coverage for local context, and the DFW gaming guide for the wider studio/esports cluster."] },
      { title: "Plan a trip to an esports event", paragraphs: ["Tournament schedules, doors, badge rules and spectator policies belong to the event organizer. TexasDefined avoids copying temporary event instructions into evergreen copy.", "The stay-nearby module uses TexasDefined's existing lodging-affiliate system. Hotel rates and availability come from the booking provider and are not represented as editorial rankings."] },
    ],
    sources: [{ label: "Arlington Convention & Visitors Bureau — Esports Stadium Arlington", url: "https://www.arlington.org/meetings-conventions/esports-stadium-arlington/" }, { label: "City of Arlington — official website", url: "https://www.arlingtontx.gov/" }],
    related: ["esports", "dallas-fort-worth-gaming", "gaming-events"],
  },
  "college-esports": {
    slug: "college-esports",
    title: "College Esports in Texas — Varsity Programs, Clubs & Facilities",
    description: "Research Texas college esports programs with careful varsity/club labels, supported games, campus facilities and official program links.",
    eyebrow: "Texas college esports",
    h1: "College esports in Texas",
    dek: "A useful college-esports guide has to distinguish varsity programs from student organizations. TexasDefined uses each school's own language and links to the official program page.",
    articleSections: ["Esports", "Education", "Colleges"],
    sections: [
      { title: "Varsity does not mean the same thing everywhere", paragraphs: ["Some universities house esports in athletics, recreation or student affairs and field formal varsity teams. Others support competitive student organizations. Both can be serious programs, but calling every club varsity makes the guide less useful.", "TexasDefined records the program type shown by the school and avoids scholarship claims unless the university publishes them for the current academic year."] },
      { title: "North Texas has a dense college cluster", paragraphs: ["UT Dallas, UNT and UT Arlington all publish current esports program information, giving the Metroplex a particularly strong concentration of university competition and facilities. That complements the region's professional esports and venue infrastructure."] },
      { title: "Programs exist beyond DFW", paragraphs: ["Houston, College Station, San Antonio and other college markets have active gaming organizations, facilities or varsity teams. School pages remain the authority for current program status, supported games and participation rules."] },
    ],
    sources: [{ label: "UT Dallas Esports", url: "https://esports.utdallas.edu/" }, { label: "UNT Esports", url: "https://recsports.unt.edu/programs/esports/get-involved.html" }, { label: "UT Arlington Esports", url: "https://www.uta.edu/student-affairs/esports" }, { label: "Texas A&M — A&M Esports organization", url: "https://getinvolved.tamu.edu/org/esports" }, { label: "University of Houston — Coog Arena", url: "https://www.uh.edu/studentcenters/games/esports/" }, { label: "Entertainment Software Association — Texas impact map", url: "https://www.theesa.com/video-game-impact-map/state/texas/" }],
    related: ["esports", "gaming-careers", "dallas-fort-worth-gaming", "austin-game-development"],
  },
  "gaming-careers": {
    slug: "gaming-careers",
    title: "Gaming Careers in Texas — Roles, Employers & Training Paths",
    description: "Explore durable career paths in the Texas gaming industry, from engineering and design to technical art, QA, networking, production, analytics, support and esports.",
    eyebrow: "Texas gaming careers",
    h1: "Gaming careers in Texas",
    dek: "The useful way to research a gaming career is by role and skill path, not by copying today's job board. This guide connects durable occupations to verified Texas employers and official sources for current openings.",
    articleSections: ["Careers", "Gaming", "Education"],
    sections: [
      { title: "Development roles", paragraphs: ["Game development spans software engineering, gameplay systems, tools, graphics, animation, technical art, level design, UX and production. Portfolios matter differently by discipline."], bullets: ["Game and tools engineering", "Graphics and rendering", "Game design", "Animation", "Technical art", "UI/UX", "Production", "QA and test engineering"] },
      { title: "Online games add infrastructure roles", paragraphs: ["Live-service games need backend engineering, site reliability, networking, security, data analytics, live operations and customer support in addition to content teams. Those roles overlap with the broader Texas technology sector.", "A networking career in gaming is not the same job as working at a game studio, but the skills can connect through cloud services, telemetry, reliability and real-time systems."] },
      { title: "Esports has a different career map", paragraphs: ["Esports organizations and venues add event production, broadcast, operations, sponsorship, community, coaching and venue-management work. College programs can also create student experience in tournament administration and production."] },
      { title: "Where to look for current Texas openings", paragraphs: ["Use the company directory to identify verified Texas employers, then move to the employer's official careers page. The Texas Film Commission's game job hotline is another current state-maintained discovery source.", "Do not assume a company is hiring locally because it has a Texas office. Open requisitions and remote policies change continuously."] },
    ],
    sources: [{ label: "Texas Film Commission — Digital Media Job Hotline", url: "https://gov.texas.gov/film/hotline/game" }, { label: "Texas Workforce Commission — Labor Market Information", url: "https://lmi.twc.texas.gov/" }, { label: "Texas Film Commission — Digital Media Industries", url: "https://gov.texas.gov/film/page/dm_overview" }],
    related: ["video-game-companies", "video-game-industry", "college-esports", "austin-game-development", "dallas-fort-worth-gaming"],
  },
  "history-of-video-games": {
    slug: "history-of-video-games",
    title: "History of Video Games in Texas — Studios, Games & Esports",
    description: "Trace well-supported Texas video-game history through Austin and North Texas studios, influential developers, long-running conventions and the rise of esports.",
    eyebrow: "Texas gaming history",
    h1: "History of video games in Texas",
    dek: "Texas gaming history is strongest when it is tied to identifiable studios, developers and institutions rather than nostalgia alone. Austin and North Texas both played durable roles in PC, console and online-game development.",
    articleSections: ["History", "Gaming", "Technology"],
    sections: [
      { title: "North Texas and the PC-game lineage", paragraphs: ["id Software's current Richardson presence connects North Texas to one of the best-known lineages in PC game development. QuakeCon grew from that community and remains part of the region's gaming identity.", "Gearbox, founded in 1999 and based near Dallas, adds another long-running studio story. Current 2K materials document the studio without requiring TexasDefined to copy marketing descriptions."] },
      { title: "Austin became a major development center", paragraphs: ["Austin's history includes large publishers, independent studios and online-game teams. Many of the same labor-market advantages—software talent, universities and a broad technology ecosystem—still support current studios.", "The Texas Film Commission now treats digital media and video games as a formal industry category, creating a modern public-policy layer around an older studio ecosystem."] },
      { title: "Online games and esports expanded the map", paragraphs: ["Texas gaming increasingly includes live operations, mobile development, online infrastructure, collegiate esports and spectator venues. Frisco and Arlington are examples of that newer layer, while Houston's Texas Showdown demonstrates the longevity of community-driven competitive gaming."] },
      { title: "Historical status should be explicit", paragraphs: ["Studios close, merge, relocate and change names. Events move cities. TexasDefined keeps historical significance separate from current operational status so a notable former Texas studio does not appear in a current-employer directory by accident."] },
    ],
    sources: [{ label: "id Software", url: "https://idsoftware.com/" }, { label: "2K — Gearbox Entertainment", url: "https://2k.com/studios/gearbox/" }, { label: "Texas Film Commission — Digital Media Industries", url: "https://gov.texas.gov/film/page/dm_overview" }, { label: "Texas Showdown", url: "https://www.txshowdown.com/" }],
    related: ["video-game-industry", "video-game-companies", "esports", "gaming-events"],
  },
  "gaming-events": {
    slug: "gaming-events",
    title: "Gaming Conventions & Esports Events in Texas",
    description: "Find recurring Texas gaming and esports events with current-status notes, official links, TexasDefined event connections and travel-planning context.",
    eyebrow: "Texas gaming events",
    h1: "Gaming conventions and esports events in Texas",
    dek: "Gaming-event calendars age fast. TexasDefined separates recurring events with current organizer evidence from historical or paused events, then routes travel planning through the existing statewide event system.",
    articleSections: ["Events", "Gaming", "Esports", "Travel & events"],
    sections: [
      { title: "Current recurring events", paragraphs: ["Texas Showdown publishes a current 2027 Houston event and remains a fighting-game-community anchor. QuakeCon has a long Dallas-area identity and should be checked against the organizer for its next confirmed dates.", "TexasDefined's existing event authority system already covers Texas Pinball Festival and Comicpalooza. Those pages remain the better home for date-sensitive travel details."] },
      { title: "DreamHack Dallas needs a historical label right now", paragraphs: ["DreamHack announced its 2026 U.S. festival in Atlanta rather than Dallas while the Kay Bailey Hutchison Convention Center is undergoing a major redevelopment period. A page that still presents DreamHack Dallas as a current scheduled annual Dallas event would mislead readers.", "TexasDefined keeps the Dallas history but does not invent a future Dallas date."] },
      { title: "Use the existing Texas event calendar", paragraphs: ["The gaming section does not create a second event calendar. Gaming, tabletop and esports discovery belongs in the existing tournament/event categories, with permanent event guides only when source quality, recurrence, image governance and content depth justify them."] },
    ],
    sources: [{ label: "Texas Showdown", url: "https://www.txshowdown.com/" }, { label: "DreamHack — official site", url: "https://dreamhack.com/" }, { label: "QuakeCon — official site", url: "https://www.quakecon.org/" }, { label: "Texas Esports Collective", url: "https://texasesports.org/" }],
    related: ["esports", "esports-stadium-arlington", "college-esports"],
  },
  "data-centers-internet-infrastructure": {
    slug: "data-centers-internet-infrastructure",
    title: "Texas Data Centers, Internet Infrastructure & Online Gaming",
    description: "Learn how Texas data centers, Internet exchanges, fiber routes, peering and cloud connectivity affect online gaming without exposing sensitive operational details.",
    eyebrow: "Texas digital infrastructure",
    h1: "Texas data centers, Internet infrastructure and online gaming",
    dek: "Online gaming is one visible use of the same digital infrastructure that supports cloud services, finance, healthcare, media and enterprise computing. Texas has important interconnection markets, especially Dallas–Fort Worth, with additional regional connectivity in Houston and other metros.",
    articleSections: ["Technology", "Internet infrastructure", "Online gaming"],
    sections: [
      { title: "Internet exchanges are meeting points between networks", paragraphs: ["An Internet exchange lets participating networks interconnect rather than sending every packet through distant transit relationships. DE-CIX documents neutral exchange infrastructure in Dallas and Houston, while Equinix describes Dallas as a major peering and communications hub.", "For gaming, the practical value is path opportunity: a well-connected market can shorten or simplify routes between access networks and hosting networks. Whether a player's path actually uses that interconnection depends on the ISP and destination."] },
      { title: "Data centers and game servers are related but not identical", paragraphs: ["A data center is a facility; a game server is an application workload that may run in a data center or cloud environment. Knowing that a provider operates a Dallas facility does not prove that a specific game has servers there.", "TexasDefined avoids maps of unnecessary sensitive facility-level operational detail and does not infer game-server locations from generic data-center inventories."] },
      { title: "Houston connects into the wider Texas network", paragraphs: ["DE-CIX documents a Houston exchange connected into a broader interconnection ecosystem. That illustrates how Texas metros are connected rather than isolated islands.", "Austin and San Antonio also have substantial technology and data-center activity, but Dallas remains the clearest primary-source case for a large neutral interconnection story in this gaming-focused guide."] },
      { title: "What this means for a Texas player", paragraphs: ["Infrastructure can influence latency through routing choices, peering and congestion, but it does not replace local troubleshooting. Home Wi-Fi, access technology and the game provider's own architecture remain part of the path."] },
    ],
    sources: [{ label: "DE-CIX Dallas", url: "https://www.de-cix.net/en/locations/dallas" }, { label: "DE-CIX Houston", url: "https://www.de-cix.net/en/locations/houston" }, { label: "Equinix — Dallas Metro data sheet", url: "https://www.equinix.com/resources/data-sheets/dallas-metro-data-sheet" }, { label: "Cloudflare — Internet quality measurement", url: "https://developers.cloudflare.com/speed/aim/" }],
    related: ["why-dallas-matters-online-gaming", "online-gaming-latency-guide", "dallas-fort-worth-gaming"],
  },
};

export const TEXAS_GAMING_SLUGS = Object.freeze(Object.keys(TEXAS_GAMING_PAGES));
export function getTexasGamingPage(slug: string) { return TEXAS_GAMING_PAGES[slug] ?? null; }
