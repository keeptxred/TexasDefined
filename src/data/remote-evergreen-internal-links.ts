import type { ArticleInternalLink } from "./types";

const iconsHub: ArticleInternalLink = {
  href: "/texas-icons",
  label: "Explore 250 Texas icons",
  description: "Browse TexasDefined's canonical directory of influential Texans, institutions, places, brands and cultural symbols.",
};

const historyHub: ArticleInternalLink = {
  href: "/texas-history",
  label: "Explore Texas history",
  description: "Continue through TexasDefined's broader history guides, historic places and people who shaped the state.",
};

const historyLinks: Record<string, ArticleInternalLink[]> = {
  "sam-houston-texas-life-legacy": [
    { href: "/article/stephen-f-austin-father-of-texas", label: "Stephen F. Austin and the settlement era", description: "Compare Houston's revolutionary and political career with the empresario most closely associated with Anglo-American settlement in Mexican Texas." },
    { href: "/article/mirabeau-b-lamar-president-republic-texas", label: "Mirabeau B. Lamar's rival vision", description: "See how the Republic's second president differed sharply from Houston on expansion, Native policy and the future of Texas." },
    { href: "/article/juan-seguin-tejano-texas-revolution", label: "Juan Seguín and the Tejano revolutionaries", description: "Add the Tejano military and political experience to the Texas Revolution story." },
    historyHub,
    iconsHub,
  ],
  "davy-crockett-texas-alamo-legend": [
    { href: "/article/william-barret-travis-alamo-commander", label: "William Barret Travis at the Alamo", description: "Read the documented story of the Alamo commander and his famous appeal for reinforcements." },
    { href: "/article/james-bowie-texas-alamo-life-legend", label: "James Bowie: life, legend and controversy", description: "Separate the historical Bowie from the frontier mythology that grew around him." },
    { href: "/destination/the-alamo", label: "Visit the Alamo authority guide", description: "Connect the biography to TexasDefined's canonical guide to the historic site in San Antonio." },
    historyHub,
    iconsHub,
  ],
  "william-barret-travis-alamo-commander": [
    { href: "/article/davy-crockett-texas-alamo-legend", label: "Davy Crockett at the Alamo", description: "Follow the former Tennessee congressman from national celebrity to the Texas Revolution." },
    { href: "/article/james-bowie-texas-alamo-life-legend", label: "James Bowie and the Alamo", description: "Compare Travis's command role with Bowie's frontier career and place in the siege." },
    { href: "/destination/the-alamo", label: "The Alamo historic-site guide", description: "Put Travis's story back into the surviving mission complex and modern visitor site." },
    historyHub,
    iconsHub,
  ],
  "james-bowie-texas-alamo-life-legend": [
    { href: "/article/william-barret-travis-alamo-commander", label: "William Barret Travis and Alamo command", description: "See how Travis's role developed during the final defense of the Alamo." },
    { href: "/article/davy-crockett-texas-alamo-legend", label: "Davy Crockett: frontier celebrity and defender", description: "Compare Bowie's mythology with another Alamo defender whose legend often exceeds the surviving evidence." },
    { href: "/destination/the-alamo", label: "Explore the Alamo", description: "Use the canonical destination guide for the site, its history and visitor context." },
    historyHub,
    iconsHub,
  ],
  "stephen-f-austin-father-of-texas": [
    { href: "/article/sam-houston-texas-life-legacy", label: "Sam Houston's Texas career", description: "Continue from settlement-era Texas into revolution, the Republic and state politics." },
    { href: "/article/juan-seguin-tejano-texas-revolution", label: "Juan Seguín and Tejano Texas", description: "Balance the Anglo settlement story with a leading Tejano participant in independence and early Texas politics." },
    { href: "/article/mirabeau-b-lamar-president-republic-texas", label: "Mirabeau B. Lamar and the Republic", description: "See the competing policy choices that emerged after independence." },
    historyHub,
    iconsHub,
  ],
  "mirabeau-b-lamar-president-republic-texas": [
    { href: "/article/sam-houston-texas-life-legacy", label: "Sam Houston and the competing Republic vision", description: "Compare Lamar's presidency with the leader whose policies he frequently opposed." },
    { href: "/article/juan-seguin-tejano-texas-revolution", label: "Juan Seguín in the Republic era", description: "Follow how revolutionary unity fractured for some Tejano leaders after independence." },
    { href: "/article/stephen-f-austin-father-of-texas", label: "Stephen F. Austin before the Republic", description: "Trace the settlement and diplomatic era that preceded Lamar's presidency." },
    historyHub,
    iconsHub,
  ],
  "juan-seguin-tejano-texas-revolution": [
    { href: "/article/sam-houston-texas-life-legacy", label: "Sam Houston and the Texas Revolution", description: "Connect Seguín's service with the larger revolutionary command and political story." },
    { href: "/article/stephen-f-austin-father-of-texas", label: "Stephen F. Austin and Mexican Texas", description: "Understand the settlement and political tensions that preceded the revolution." },
    { href: "/destination/the-alamo", label: "The Alamo historic-site guide", description: "Connect Seguín's wartime experience to San Antonio and the Alamo campaign." },
    historyHub,
    iconsHub,
  ],
};

const militaryLinks: Record<string, ArticleInternalLink[]> = {
  "audie-murphy-texas-war-hero-actor": [
    { href: "/article/chester-nimitz-texas-fleet-admiral", label: "Fleet Admiral Chester W. Nimitz", description: "Read the story of another Texas-born military figure whose service shaped World War II." },
    { href: "/article/chris-kyle-texas-navy-seal-life-legacy", label: "Chris Kyle: service, fame and legacy", description: "Compare two very different eras of Texas military service and public memory." },
    { href: "/texas-history", label: "Texas military history", description: "Explore the broader wars, installations, museums and service traditions connected to Texas." },
    iconsHub,
  ],
  "chester-nimitz-texas-fleet-admiral": [
    { href: "/article/audie-murphy-texas-war-hero-actor", label: "Audie Murphy and World War II", description: "Pair the Pacific command story with one of the war's best-known Texas soldiers." },
    { href: "/article/chris-kyle-texas-navy-seal-life-legacy", label: "Chris Kyle and modern special operations", description: "Continue into a much later era of American military service and public memory." },
    { href: "/texas-history", label: "Explore Texas military history", description: "Find more Texas military sites, people and historical context." },
    iconsHub,
  ],
  "chris-kyle-texas-navy-seal-life-legacy": [
    { href: "/article/audie-murphy-texas-war-hero-actor", label: "Audie Murphy: soldier and public figure", description: "Compare how military service, celebrity and memory intersected in another Texas life." },
    { href: "/article/chester-nimitz-texas-fleet-admiral", label: "Chester Nimitz and the Pacific War", description: "Move from modern special operations to a Texas admiral who led Allied naval strategy in World War II." },
    { href: "/texas-history", label: "Texas military history", description: "Explore the wider military history collection and historic sites." },
    iconsHub,
  ],
};

const cultureLinks: Record<string, ArticleInternalLink[]> = {
  "heb-texas-grocery-history-culture": [
    { href: "/texas-brand-origin-stories", label: "Texas brand origin stories", description: "See how H-E-B fits alongside Whataburger, Blue Bell, Shiner, Dickies and Buc-ee's in Texas cultural identity." },
    { href: "/article/bucees-texas-road-trip-history", label: "How Buc-ee's became a road-trip ritual", description: "Compare two Texas retailers that became cultural institutions through very different everyday routines." },
    { href: "/article/blue-bell-ice-cream-brenham-texas-history", label: "Blue Bell and Brenham", description: "Follow another place-based Texas brand from local business to statewide identity." },
    iconsHub,
  ],
  "bucees-texas-road-trip-history": [
    { href: "/article/weirdest-town-names-in-texas-and-how-they-got-them", label: "Texas towns with names you won't forget", description: "Keep the road-trip detour going with the stories behind some of Texas's strangest town names." },
    { href: "/texas-brand-origin-stories", label: "Texas brand origin stories", description: "Place Buc-ee's in the larger story of Texas companies that became cultural shorthand." },
    { href: "/article/heb-texas-grocery-history-culture", label: "H-E-B and Texas civic identity", description: "Compare the highway-stop phenomenon with a grocery chain embedded in everyday community life." },
    { href: "/texas-roadside-oddities", label: "Texas roadside culture", description: "Keep exploring the attractions, stops and visual landmarks that make long Texas drives distinctive." },
    iconsHub,
  ],
  "king-ranch-texas-history-cattle-legacy": [
    { href: "/article/texas-oil-boom-wichita-falls-west-texas-rigs", label: "How oil reshaped Texas", description: "Compare the cattle economy with the energy booms that transformed land, labor and wealth across Texas." },
    { href: "/texas-history", label: "Texas ranching and settlement history", description: "Place King Ranch in the wider history of South Texas, livestock, land and migration." },
    iconsHub,
  ],
  "texas-oil-boom-wichita-falls-west-texas-rigs": [
    { href: "/article/king-ranch-texas-history-cattle-legacy", label: "King Ranch and the cattle economy", description: "Compare two industries that became enduring symbols of Texas land and enterprise." },
    { href: "/texas-history", label: "Texas economic history", description: "Continue through the historical forces that shaped the state's regions, cities and industries." },
    iconsHub,
  ],
  "san-antonio-spurs-texas-basketball-culture": [
    { href: "/article/texas-high-school-football-friday-night-lights", label: "Why high school football matters in Texas", description: "Compare a major-league championship culture with the local Friday-night tradition found across the state." },
    { href: "/sports", label: "Texas sports", description: "Explore more teams, venues and sports culture across Texas." },
    iconsHub,
  ],
  "texas-high-school-football-friday-night-lights": [
    { href: "/sports/friday-night-lights", label: "Friday Night Lights, Defined", description: "Use the parent guide for Texas high-school football traditions, game-night planning, homecoming, stadiums and the season arc." },
    { href: "/article/san-antonio-spurs-texas-basketball-culture", label: "The San Antonio Spurs and team-first culture", description: "Move from school-level Friday nights to one of Texas's most successful professional franchises." },
    { href: "/sports", label: "Explore Texas sports", description: "Browse teams, venues and sports culture around the state." },
    iconsHub,
  ],
  "san-antonio-stock-show-rodeo-history-guide": [
    { href: "/article/fort-worth-stockyards-history-cattle-culture", label: "Fort Worth Stockyards and cattle culture", description: "Connect the modern stock show and rodeo tradition with the historic livestock district that helped define Cowtown." },
    { href: "/article/king-ranch-texas-history-cattle-legacy", label: "King Ranch and modern ranching", description: "Follow the livestock story south into one of the most influential ranching enterprises in Texas history." },
    { href: "/texas-history", label: "Texas western heritage", description: "Explore the broader ranching, livestock and western-history collection." },
    iconsHub,
  ],
  "fort-worth-stockyards-history-cattle-culture": [
    { href: "/article/san-antonio-stock-show-rodeo-history-guide", label: "San Antonio Stock Show & Rodeo", description: "See how livestock culture continues through a major modern stock show, rodeo and scholarship institution." },
    { href: "/article/king-ranch-texas-history-cattle-legacy", label: "King Ranch and Texas cattle history", description: "Connect Fort Worth's livestock market with the ranching systems that supplied cattle across the state." },
    { href: "/texas-history", label: "Explore Texas western history", description: "Continue through ranching, cattle drives, towns and historic sites." },
    iconsHub,
  ],
  "blue-bell-ice-cream-brenham-texas-history": [
    { href: "/texas-brand-origin-stories", label: "Texas brand origin stories", description: "See Blue Bell alongside other Texas companies whose hometown origins became part of the brand itself." },
    { href: "/article/heb-texas-grocery-history-culture", label: "H-E-B and everyday Texas identity", description: "Compare two brands whose cultural status grew from repeated everyday use across Texas." },
    { href: "/things-unique-to-texas/texas-brands", label: "Legendary Texas brands", description: "Browse the larger TexasDefined brand and cultural-institution index." },
    iconsHub,
  ],
};

const crawlRecoveryLinks: Record<string, ArticleInternalLink[]> = {
  "weirdest-town-names-in-texas-and-how-they-got-them": [
    { href: "/explore/small-towns", label: "Explore Texas small towns", description: "Keep exploring the communities, histories and local character behind Texas town names." },
    historyHub,
  ],
  "texas-gulf-coast-erosion-shoreline-retreat-guide": [
    { href: "/explore/beaches-coast", label: "Explore the Texas coast", description: "Connect shoreline change with TexasDefined's beaches, barrier islands and Gulf Coast travel guides." },
    { href: "/explore/outdoors", label: "Explore Texas outdoors", description: "Continue through practical guides to Texas landscapes, parks and outdoor conditions." },
  ],
};

const redditBatchLinks: Record<string, ArticleInternalLink[]> = {
  "state-fair-texas-2026-new-foods-guide": [
    { href: "/article/texas-restaurants-for-out-of-town-visitors", label: "Texas restaurant picks for visitors", description: "Build the rest of the trip around reliable local food stops in major Texas cities." },
    { href: "/texas-state-fair", label: "Plan the 2026 State Fair of Texas", description: "Use the main State Fair planning guide for dates, tickets, parking, transit and trip logistics." },
    { href: "/explore/food-bbq", label: "Explore Texas food and barbecue", description: "Keep going through TexasDefined's statewide food, barbecue and dining guides." },
  ],
  "why-austin-i35-traffic-keeps-getting-worse": [
    { href: "/article/texas-road-closures-drivetexas-guide", label: "Check Texas road closures before you leave", description: "Use DriveTexas and local sources to verify construction, incidents and closures before a trip." },
    { href: "/article/texas-toll-roads-tags-fees-guide", label: "Understand Texas toll roads and tags", description: "Compare toll tags, pay-by-mail rules and common fee surprises across Texas systems." },
    { href: "/explore/road-trips", label: "Explore Texas road trips", description: "Plan routes and stops around the state's long-distance driving realities." },
  ],
  "why-houston-humidity-feels-so-bad": [
    { href: "/article/moving-to-texas-what-nobody-tells-you", label: "What nobody tells you about moving to Texas", description: "Put Houston heat and humidity in the larger context of Texas climate, housing and everyday costs." },
    { href: "/explore/outdoors", label: "Explore Texas outdoors", description: "Use TexasDefined's outdoor guides to plan around heat, seasonality and regional conditions." },
    { href: "/article/texas-boil-water-notice-guide", label: "Texas boil-water notice guide", description: "Know how to respond when a local water system issues a public-health notice." },
  ],
  "tex-mex-history-texas-cuisine-guide": [
    { href: "/article/texas-chili-beans-history", label: "The Texas chili-and-beans debate", description: "Follow another Texas food argument whose history is more complicated than the slogan." },
    { href: "/article/texas-restaurants-for-out-of-town-visitors", label: "Where to take out-of-town visitors", description: "Use city-by-city dining picks to turn Texas food history into an actual meal plan." },
    { href: "/explore/food-bbq", label: "Explore Texas food and barbecue", description: "Browse more guides to Texas dining traditions, barbecue and regional food culture." },
  ],
  "texas-chili-beans-history": [
    { href: "/article/tex-mex-history-texas-cuisine-guide", label: "How Tex-Mex became its own Texas cuisine", description: "See how borderlands ingredients, restaurants and local taste built a distinct culinary tradition." },
    { href: "/article/texas-restaurants-for-out-of-town-visitors", label: "Texas restaurants for out-of-town visitors", description: "Find practical places to introduce visitors to Texas food across ten cities." },
    { href: "/explore/food-bbq", label: "Explore Texas food and barbecue", description: "Continue through TexasDefined's statewide food and dining collection." },
  ],
  "texas-bluebonnet-photo-etiquette-safety": [
    { href: "/article/bluebonnet-season-field-guide", label: "Chasing bluebonnet season", description: "Use the broader field guide for bloom timing, routes and responsible wildflower viewing." },
    { href: "/explore/outdoors", label: "Explore Texas outdoors", description: "Find more practical guides for Texas landscapes, parks and outdoor trips." },
    { href: "/explore/road-trips", label: "Plan a Texas road trip", description: "Build a spring drive around safe stops instead of roadside improvisation." },
  ],
  "texas-restaurants-for-out-of-town-visitors": [
    { href: "/article/texas-gulf-coast-erosion-shoreline-retreat-guide", label: "How the Texas Gulf Coast shoreline is changing", description: "Understand erosion and shoreline retreat before planning time along Texas beaches and barrier islands." },
    { href: "/article/state-fair-texas-2026-new-foods-guide", label: "See what's new to eat at the 2026 State Fair", description: "Pair the statewide restaurant guide with the seasonal fair-food guide for a Dallas visit." },
    { href: "/article/tex-mex-history-texas-cuisine-guide", label: "Understand the Tex-Mex tradition", description: "Give visitors context for one of the cuisines they are most likely to encounter in Texas." },
    { href: "/article/texas-chili-beans-history", label: "Texas chili: beans, history and the argument", description: "Add context to one of the state's longest-running food debates." },
    { href: "/explore/food-bbq", label: "Explore Texas food and barbecue", description: "Browse the larger statewide food, barbecue and dining collection." },
  ],
  "texas-road-closures-drivetexas-guide": [
    { href: "/article/why-austin-i35-traffic-keeps-getting-worse", label: "Why Austin I-35 traffic keeps getting worse", description: "Understand the construction and capacity pressures behind one of the state's most difficult urban corridors." },
    { href: "/article/why-austin-i35-traffic-keeps-getting-worse", label: "Why Austin I-35 traffic keeps getting worse", description: "Understand the construction and capacity pressures behind one of the state's most difficult urban corridors." },
    { href: "/article/texas-toll-roads-tags-fees-guide", label: "Texas toll roads, tags and fees", description: "Know which toll systems and payment rules can affect an alternate route." },
    { href: "/explore/road-trips", label: "Explore Texas road trips", description: "Plan statewide drives with better route and stop context." },
  ],
  "texas-toll-roads-tags-fees-guide": [
    { href: "/article/texas-road-closures-drivetexas-guide", label: "Check current Texas road closures", description: "Verify incidents, construction and closures before choosing a toll-road or frontage-road alternative." },
    { href: "/article/why-austin-i35-traffic-keeps-getting-worse", label: "Austin I-35 traffic and the Capital Express build", description: "See why Central Texas route planning will stay complicated through major I-35 construction." },
    { href: "/explore/road-trips", label: "Explore Texas road trips", description: "Use TexasDefined's road-trip guides to plan longer drives across multiple toll systems." },
  ],
  "texas-boil-water-notice-guide": [
    { href: "/article/moving-to-texas-what-nobody-tells-you", label: "The practical moving-to-Texas guide", description: "Understand utilities, infrastructure and other day-to-day realities before choosing a Texas community." },
    { href: "/moving-to-texas", label: "Moving to Texas resources", description: "Use TexasDefined's relocation hub for utilities, schools, taxes, licenses and local setup." },
    { href: "/article/why-houston-humidity-feels-so-bad", label: "Why Houston humidity feels so intense", description: "See how Gulf Coast weather shapes everyday life in one of Texas's largest metro areas." },
  ],
};

export const remoteEvergreenInternalLinks: Readonly<Record<string, readonly ArticleInternalLink[]>> = {
  ...historyLinks,
  ...militaryLinks,
  ...cultureLinks,
  ...crawlRecoveryLinks,
  ...redditBatchLinks,
};
