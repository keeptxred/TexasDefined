import fs from 'node:fs';

const seo = fs.readFileSync('src/lib/seo.ts', 'utf8');
const westfest = fs.readFileSync('src/data/major-event-expanded-authority-tranche11.server.ts', 'utf8');
const poteet = fs.readFileSync('src/data/major-event-expanded-authority-tranche21.server.ts', 'utf8');
const sweetwater = fs.readFileSync('src/data/major-event-expanded-authority-tranche16.server.ts', 'utf8');
const charro = fs.readFileSync('src/data/major-event-expanded-authority-tranche5.server.ts', 'utf8');
const settlementStub = fs.readFileSync('src/data/fixtures/texas-explained-support-stubs.ts', 'utf8');
const eventSnippetLifecycle = fs.readFileSync('src/data/event-snippet-lifecycle.ts', 'utf8');
const eventAuthority = fs.readFileSync('src/data/major-event-authority.ts', 'utf8');
const eventRoute = fs.readFileSync('src/routes/event.$slug.tsx', 'utf8');
const premerge = fs.readFileSync('scripts/ci/run-premerge-validation.mjs', 'utf8');
const failures = [];
const headingPrefixRepairs = [
  {
    "path": "/article/adopting-a-dog-in-texas",
    "title": "Adopting a Dog in Texas: Shelters, Rabies & Matching Tips"
  },
  {
    "path": "/article/audie-murphy-texas-war-hero-actor",
    "title": "Audie Murphy: Texas WWII Hero, Soldier & Actor"
  },
  {
    "path": "/article/hiking-texas-trails-with-your-dog",
    "title": "Hiking Texas Trails With Your Dog: Heat & Leash Rules"
  },
  {
    "path": "/article/hogg-foundation-mental-health-texas-history",
    "title": "Hogg Foundation for Mental Health: Texas History & Mission"
  },
  {
    "path": "/article/ima-hogg-texas-legacy",
    "title": "Ima Hogg: Texas Philanthropist, Art & Public Legacy"
  },
  {
    "path": "/article/juan-seguin-tejano-texas-revolution",
    "title": "Juan Seguín: Tejano Revolutionary Leader & Texas Exile"
  },
  {
    "path": "/article/mirabeau-b-lamar-president-republic-texas",
    "title": "Mirabeau B. Lamar: President of the Republic of Texas"
  },
  {
    "path": "/article/sallie-hogg-texas-legacy",
    "title": "Sallie Hogg: Texas First Lady & Public-Service Legacy"
  },
  {
    "path": "/article/san-antonio-spurs-texas-basketball-culture",
    "title": "San Antonio Spurs: Team Culture & Basketball History"
  },
  {
    "path": "/article/san-antonio-stock-show-rodeo-history-guide",
    "title": "San Antonio Stock Show & Rodeo: History & Scholarships"
  },
  {
    "path": "/article/texas-backup-power-generator-guide",
    "title": "Texas Backup Power Guide: Generators & Transfer Switches"
  },
  {
    "path": "/article/texas-borderlands-historic-sites-guide",
    "title": "Texas Borderlands History: Missions & Tejano Heritage"
  },
  {
    "path": "/article/texas-cold-war-military-history",
    "title": "Cold War Texas: Bombers, Missile Silos & Pantex"
  },
  {
    "path": "/article/texas-dog-friendly-patios-law",
    "title": "Texas Dog-Friendly Patios: Rules & State Law Guide"
  },
  {
    "path": "/article/texas-dog-lake-river-safety",
    "title": "Texas Dog Water Safety: Lakes, Rivers & Algae"
  },
  {
    "path": "/article/texas-gulf-coast-erosion-shoreline-retreat-guide",
    "title": "Texas Gulf Coast Erosion: Shoreline Retreat & Risk"
  },
  {
    "path": "/article/texas-homeowner-field-manual",
    "title": "Texas Homeowner Field Manual: Weather, Utilities & Insurance"
  },
  {
    "path": "/article/texas-household-pests-guide",
    "title": "Texas Household Pests: Termites, Ants, Roaches & Control"
  },
  {
    "path": "/article/texas-military-museums-historic-sites-guide",
    "title": "Texas Military Museums & Historic Sites: Visitor Guide"
  },
  {
    "path": "/article/texas-pecos-river-guide",
    "title": "Pecos River Texas: Canyons, Fishing & Public Access"
  },
  {
    "path": "/article/texas-pool-owner-guide",
    "title": "Texas Pool Owner Guide: Chemistry, Pumps & Freeze Protection"
  },
  {
    "path": "/article/texas-spanish-american-war-guide",
    "title": "Texas in the Spanish-American War: Rough Riders & History"
  },
  {
    "path": "/article/texas-trees-around-home-guide",
    "title": "Texas Trees Near Homes: Storms, Roots & Oak Wilt"
  },
  {
    "path": "/article/texas-us-mexican-war-palo-alto-guide",
    "title": "Texas in the Mexican-American War: Palo Alto & Border"
  },
  {
    "path": "/article/texas-world-war-i-history-guide",
    "title": "Texas in World War I: Border, Camps & Military History"
  },
  {
    "path": "/article/texas-world-war-ii-bases-pow-camps",
    "title": "Texas WWII Bases, Training Camps & POW Camps"
  },
  {
    "path": "/article/texas-world-war-ii-historic-sites-guide",
    "title": "Texas World War II Historic Sites: Five Places to Visit"
  },
  {
    "path": "/article/toledo-bend-water-system-guide",
    "title": "Toledo Bend Reservoir: Texas Water System Guide"
  },
  {
    "path": "/explore/painted-churches/guides/dubina-texas-population",
    "title": "Dubina Texas: Population, History & Painted Church"
  },
  {
    "path": "/explore/painted-churches/guides/praha-texas-czech-heritage",
    "title": "Praha Texas: Czech Heritage & Painted Church"
  },
  {
    "path": "/explore/painted-churches/guides/st-stanislaus-plantersville",
    "title": "St. Stanislaus Church Plantersville: Location & History"
  },
  {
    "path": "/news/most-popular-dog-breeds-in-texas-chihuahua-data",
    "title": "Is the Chihuahua Texas's Most Popular Dog? Data Explained"
  }
];
for (const fix of headingPrefixRepairs) {
  if (!seo.includes('"'+fix.path+'"') || !seo.includes(fix.title)) failures.push('Title lost important H1 completion: '+fix.path);
}

const trimHelper = fs.readFileSync('src/lib/seo-snippet-trim.ts', 'utf8');
for(const required of ['incomplete clause','DANGLING_ENDING','MAX_LENGTH','cleanMetaDescription']) if(!trimHelper.includes(required)) failures.push('Meta description truncation protection missing: '+required);

const furtherClippedTitleRepairs = [
  {
    "path": "/article/bluebonnet-animal-preservation-athens",
    "title": "Bluebonnet Animal Preservation Athens: Pet Aftercare Guide",
    "descriptionStart": "Explore Bluebonnet Animal Preservation in Athens"
  },
  {
    "path": "/article/fort-worth-stockyards-history-cattle-culture",
    "title": "Fort Worth Stockyards: Cattle Trade, Railroads & History",
    "descriptionStart": "Explore the cattle trade, railroads and meatpack"
  },
  {
    "path": "/article/historic-san-antonio-heritage-road-trip",
    "title": "Historic San Antonio Road Trip: Missions, Alamo & King William",
    "descriptionStart": "Plan a two-day San Antonio history route through"
  },
  {
    "path": "/article/how-to-choose-electricity-plan-texas",
    "title": "Choose a Texas Electricity Plan: Rates, Fees & EFL",
    "descriptionStart": "Learn to read the Electricity Facts Label, compa"
  },
  {
    "path": "/article/mexican-texas-military-history",
    "title": "Military in Mexican Texas: Presidios, Anahuac & Revolution",
    "descriptionStart": "Follow Mexican-era Texas military history from p"
  },
  {
    "path": "/article/muds-pids-hoas-special-districts-texas",
    "title": "Texas MUDs, PIDs & HOAs: Homebuyer Taxes & Fees",
    "descriptionStart": "Understand Texas MUD, PID and HOA assessments an"
  },
  {
    "path": "/article/republic-of-texas-government-trail",
    "title": "Republic of Texas Government Trail: San Felipe to Austin",
    "descriptionStart": "Trace Texas government from San Felipe and Washi"
  },
  {
    "path": "/article/texas-bucket-list-by-season",
    "title": "Texas Bucket List by Season: Spring Through Winter",
    "descriptionStart": "Plan Texas trips by season, from spring wildflow"
  },
  {
    "path": "/article/texas-civil-war-sites-guide",
    "title": "Texas Civil War Sites: Battlefields, Emancipation & Memory",
    "descriptionStart": "Explore Texas Civil War and Reconstruction sites"
  },
  {
    "path": "/article/texas-historic-travel-transportation-guide",
    "title": "Historic Texas Travel: Stagecoaches, Wagon Roads & Trains",
    "descriptionStart": "Explore travel before Texas highways through Fan"
  },
  {
    "path": "/article/texas-oil-boom-wichita-falls-west-texas-rigs",
    "title": "Texas Oil Boom: Wichita Falls, Permian Basin & Legacy",
    "descriptionStart": "How oil development in Wichita Falls and West Te"
  },
  {
    "path": "/article/texas-wildfire-home-protection-guide",
    "title": "Texas Wildfire Home Protection: Embers, Roofs & Evacuation",
    "descriptionStart": "Learn how to assess Texas wildfire risk, harden "
  },
  {
    "path": "/article/women-in-texas-military-history",
    "title": "Women in Texas Military History: Nurses, WASP & Service",
    "descriptionStart": "Explore women’s military service in Texas, from "
  },
  {
    "path": "/texas-capital-designations",
    "title": "Official Texas Capital Designations: Cities & Counties",
    "descriptionStart": "Learn how Texas law recognizes special capital d"
  }
];
for(const fix of furtherClippedTitleRepairs){
 for(const marker of ['"'+fix.path+'"',fix.title,fix.descriptionStart]) if(!seo.includes(marker)) failures.push('Clipped title contract lost: '+fix.path+' '+marker);
}

const cutOffTitleCorrections = [
  {
    "path": "/article/texas-high-school-football-2026-season-calendar",
    "title": "Texas High School Football 2026: UIL Season & Playoff Calendar",
    "descriptionStart": "See the UIL 2026 high school football calendar, fr"
  },
  {
    "path": "/article/texas-llano-river-guide",
    "title": "Llano River Texas: Fishing, Paddling & Camping Guide",
    "descriptionStart": "Explore the Llano and South Llano rivers, with Jun"
  },
  {
    "path": "/article/texas-red-river-war-guide",
    "title": "Red River War in Texas: Adobe Walls & Palo Duro Canyon",
    "descriptionStart": "Learn how the 1874–75 Red River War unfolded acros"
  },
  {
    "path": "/destination/george-washington-carver-museum-austin",
    "title": "George Washington Carver Museum Austin: Visitor Guide",
    "descriptionStart": "Visit Austin's George Washington Carver Museum, Cu"
  },
  {
    "path": "/event/bands-of-america-san-antonio-super-regional",
    "title": "Bands of America San Antonio Super Regional 2026",
    "descriptionStart": "Plan the 2026 Bands of America San Antonio Super R"
  },
  {
    "path": "/fishing/lakes/cedar-lake-cleburne-state-park",
    "title": "Cedar Lake at Cleburne State Park: Fishing Guide",
    "descriptionStart": "Plan Cedar Lake fishing at Cleburne State Park wit"
  }
];
for (const fix of cutOffTitleCorrections) {
  for (const marker of ['"' + fix.path + '"', fix.title, fix.descriptionStart]) {
    if (!seo.includes(marker)) failures.push('A source-verified truncated-title repair was lost: ' + fix.path + ' ' + marker);
  }
}
for (const marker of [
  'Never ship an automatically shortened search title ending in dangling glue',
  '.replace(/(?:\\s+(?:and|or|of|for|to|with|in|at|the)|\\s+&)$/i, "")',
]) {
  if (!seo.includes(marker)) failures.push('Budgeted title ending guard missing: ' + marker);
}


for (const [source, markers] of [
  [seo, ['resolveEventSnippet({', 'eventOccurrenceEndDate: page.eventOccurrenceEndDate', 'texasEventDateKey()']],
  [eventAuthority, ['latestEventOccurrenceDate(occurrence)', 'eventOccurrenceEndDate: occurrence ?']],
  [eventRoute, ['eventOccurrenceEndDate: page.eventOccurrenceEndDate', 'eventName: page.name']],
  [eventSnippetLifecycle, ['2026-10-18', 'last published dates', 'expiredYear', 'canonicalPath']],
  [premerge, ['src/data/event-snippet-lifecycle.test.ts']],
]) {
  for (const marker of markers) {
    if (!source.includes(marker)) failures.push('Event snippet lifecycle guard is not wired: ' + marker);
  }
}


const governedSeoPathMatches = [...seo.matchAll(/^\s{2}"(\/[^"\n]+)":\s*\{/gm)].map((match) => match[1]);
const duplicateGovernedSeoPaths = [...new Set(governedSeoPathMatches.filter((path, index, all) => all.indexOf(path) !== index))];
if (duplicateGovernedSeoPaths.length) {
  failures.push('Duplicate governed SEO override paths: ' + duplicateGovernedSeoPaths.join(', '));
}

for (const required of [
  'const TEXASDEFINED_GSC_SSR_OVERRIDES: Record<string, TechnicalSeoOverride> = import.meta.env.SSR ? {',
  '? TEXASDEFINED_GSC_SSR_OVERRIDES[page.canonicalPath] ?? TEXASDEFINED_TECHNICAL_SEO_OVERRIDES[page.canonicalPath]',
]) {
  if (!seo.includes(required)) failures.push(`GSC CTR override architecture missing: ${required}`);
}

// Current page-one CTR recovery set from the Sep. 25, 2026 GSC review.
// These URLs already rank on page one or very near it, so preserve their
// search-intent-focused SSR snippets rather than treating them as indexing work.
const priorityPageOneCtrRecovery = [
  { path: '/article/texas-rivers-explained', title: 'Major Rivers in Texas: Boundary Rivers, Regions & Map', description: "Find Texas's major and boundary rivers by region" },
  { path: '/texas-homecoming-mums', title: 'Texas Homecoming Mums: History, Meaning, Colors & Traditions', description: 'Texas homecoming mums explained: history, colors, senior traditions, garters, costs' },
  { path: '/event/heart-o-texas-fair-rodeo', title: "Heart O' Texas Fair & Rodeo 2026: Dates, Schedule & Tickets", description: "The 2026 Heart O' Texas Fair & Rodeo runs Oct. 8-18 in Waco" },
  { path: '/article/texas-river-basins-guide', title: 'Texas River Basins: 15 Major, 8 Coastal & Watershed Map', description: "15 major and eight coastal river basins" },
  { path: '/article/texas-lakes-reservoirs-explained', title: 'Texas Lakes & Reservoirs: Why Most Are Man-Made', description: 'most familiar inland Texas lakes are reservoirs' },
  { path: '/article/texas-trinity-river-guide', title: 'Trinity River Texas: Dallas-Fort Worth, Basin & Gulf Guide', description: 'Follow the Trinity River through North Texas toward Trinity Bay' },
  { path: '/sports-venue/jones-att-stadium', title: 'Jones AT&T Stadium (Now Galaxy Stadium): Texas Tech Guide', description: 'Looking for Jones AT&T Stadium?' },
  { path: '/article/texas-settlement-patterns-explained', title: 'Texas Settlement Patterns: How Geography Shaped Towns', description: 'See how rivers and reliable water drew early Texas settlement' },
  { path: '/event/addison-oktoberfest', title: 'Addison Oktoberfest: Dates, Hours, Tickets & Parking', description: 'latest confirmed dates, festival hours, tickets, parking, hotel and official planning links' },
  { path: '/sports-venue/mesquite-memorial-stadium', title: 'Mesquite Memorial Stadium: Parking, Tickets & Events', description: 'verified parking, directions, ticket and event links' },
  { path: '/explore/painted-churches', title: 'Painted Churches of Texas: Complete Statewide Guide', description: 'verified church profiles, history, architecture, photos and visitor information' },
];

for (const experiment of priorityPageOneCtrRecovery) {
  for (const required of [experiment.path, experiment.title, experiment.description]) {
    if (!seo.includes(required)) failures.push('Priority page-one CTR contract missing for ' + experiment.path + ': ' + required);
  }
}

if (priorityPageOneCtrRecovery.length !== 11) {
  failures.push('Expected exactly 11 priority page-one CTR recovery pages, found ' + priorityPageOneCtrRecovery.length + '.');
}

// Snapshot of the 20 strongest page-one / near-page-one CTR opportunities from
// Search Console for Aug. 27-Sep. 9, 2026. Keep these explicit so later SEO
// refactors cannot silently discard the server-rendered snippet experiments.
const experiments = [
  {
    path: '/article/texas-rivers-explained',
    title: 'Major Rivers in Texas: Boundary Rivers, Regions & Map',
    description: "Find Texas's major and boundary rivers by region",
  },
  {
    path: '/event/westfest',
    title: 'Westfest Texas: Projected Dates, Parade & Visitor Guide',
    description: 'Plan Westfest in West, Texas with projected date guidance',
  },
  {
    path: '/article/texas-river-basins-guide',
    title: 'Texas River Basins: 15 Major, 8 Coastal & Watershed Map',
    description: "15 major and eight coastal river basins on a watershed map",
  },
  {
    path: '/sports-venue/legacy-stadium-katy',
    title: 'Legacy Stadium Katy: Parking, Events & Visitor Guide',
    description: 'verified parking, arrival, event, official venue and map links',
  },
  {
    path: '/article/texas-lakes-reservoirs-explained',
    title: 'Texas Lakes & Reservoirs: Why Most Are Man-Made',
    description: 'most familiar inland Texas lakes are reservoirs built for water supply and flood control',
  },
  {
    path: '/sports-venue/mesquite-memorial-stadium',
    title: 'Mesquite Memorial Stadium: Parking, Tickets & Events',
    description: 'verified parking, directions, ticket and event links',
  },
  {
    path: '/event/heart-o-texas-fair-rodeo',
    title: "Heart O' Texas Fair & Rodeo 2026: Dates, Schedule & Tickets",
    description: "The 2026 Heart O' Texas Fair & Rodeo runs Oct. 8-18 in Waco",
  },
  {
    path: '/sports-venue/mckinney-isd-stadium',
    title: 'McKinney ISD Stadium: Parking, Events & Visitor Guide',
    description: 'verified parking, arrival, event-day and official venue links',
  },
  {
    path: '/event/sweetwater-rattlesnake-roundup',
    title: 'Sweetwater Rattlesnake Roundup 2027: Projected Dates & Guide',
    description: 'Sweetwater Rattlesnake Roundup 2027 projected planning window: March 12-14',
  },
  {
    path: '/article/texas-school-districts-explained',
    title: 'What Does ISD Stand For in Texas? School District Guide',
    description: 'find your ISD by address',
  },
  {
    path: '/texas-symbols',
    title: '77 Texas State Symbols: Complete Official List & Meanings',
    description: 'Browse all 77 current official Texas state symbols by category, year and legislative designation',
  },
  {
    path: '/article/republic-of-texas-navy-history',
    title: 'Republic of Texas Navy: Ships, Battles & History',
    description: 'Explore the Republic of Texas Navy, its ships, commanders, Gulf operations, battles',
  },
  {
    path: '/event/charro-days-fiesta',
    title: 'Charro Days Fiesta 2027: Dates, Parade & Brownsville Guide',
    description: 'Charro Days Fiesta 2027 core dates are Feb. 25-27 in Brownsville',
  },
  {
    path: '/event/hidalgo-borderfest',
    title: 'BorderFest Hidalgo: Dates, Schedule & Visitor Guide',
    description: 'Plan BorderFest in Hidalgo, Texas with current dates, schedule guidance',
  },
  {
    path: '/texas-rock-rockabilly',
    title: 'Texas Rock & Rockabilly: Artists, History & Sound',
    description: 'Explore Texas rock and rockabilly through the artists, scenes, venues and sounds',
  },
  {
    path: '/article/battleship-texas-bb-35-history-restoration',
    title: 'Battleship Texas (BB-35): History & Restoration',
    description: 'Follow Battleship Texas BB-35 from World War I and World War II service',
  },
  {
    path: '/event/floresville-peanut-festival',
    title: 'Floresville Peanut Festival: Visitor Guide & Next Dates',
    description: 'Explore Floresville Peanut Festival traditions, parade guidance',
  },
  {
    path: '/sports-venue/childrens-health-stadium-prosper',
    title: "Children's Health Stadium Prosper: Parking & Events",
    description: "Plan a Children's Health Stadium visit in Prosper with parking, arrival, event-day",
  },
  {
    path: '/article/why-texas-has-254-counties',
    title: 'Why Does Texas Have 254 Counties? History & County Seats',
    description: 'distance, settlement, county seats and 19th-century travel',
  },
  {
    path: '/county/palo-pinto',
    title: 'Palo Pinto County, Texas: Population, Acres & County Guide',
    description: 'Explore Palo Pinto County with population, land area, county seat, communities',
  },
];

const secondWave = [
  { path: '/event/dallas-holiday-parade', title: 'Dallas Holiday Parade 2026: Projected Date, Route & Guide', description: 'Dallas Holiday Parade 2026 projected planning date: Dec. 5' },
  { path: '/event/houston-thanksgiving-day-parade', title: 'Houston Thanksgiving Parade 2026: Date, Time & Route', description: "Houston's H-E-B Thanksgiving Day Parade is Nov. 26, 2026 at 9 a.m. downtown" },
  { path: '/event/texas-rose-festival', title: 'Texas Rose Festival 2026: Tyler Dates, Parade & Schedule', description: 'Plan the 2026 Texas Rose Festival in Tyler with official dates' },
  { path: '/event/larry-joe-taylor-texas-music-festival', title: 'Larry Joe Taylor Festival 2027: Dates, Tickets & Camping', description: 'LJT Fest returns to Stephenville April 19-24, 2027' },
  { path: '/event/fulton-oysterfest', title: 'Fulton Oysterfest 2027: Dates, Tickets & Visitor Guide', description: 'Fulton Oysterfest runs March 4-7, 2027 at Fulton Harbor Park' },
  { path: '/article/texas-colorado-river-guide', title: 'Colorado River in Texas: Lakes, Basin & Hill Country Guide', description: 'Follow the Texas Colorado River through the Highland Lakes and Austin to the Gulf' },
  { path: '/article/texas-ecoregions-habitats-guide', title: 'Texas Ecoregions: Habitats, Landscapes & Wildlife Guide', description: 'Explore Texas ecoregions from Piney Woods and prairies to Edwards Plateau' },
  { path: '/article/texas-home-architecture-regions', title: 'Texas Home Styles: Ranch, Hill Country, Craftsman & More', description: 'Compare Texas home styles and regional architecture' },
  { path: '/article/texas-prairies-grasslands-guide', title: 'Texas Prairies & Grasslands: Regions, Plants & Wildlife', description: 'Explore Texas prairies and grasslands' },
  { path: '/article/texas-ranch-to-market-roads-explained', title: 'What Does RM Mean on Texas Roads? Ranch-to-Market Roads', description: 'RM means Ranch-to-Market Road in Texas' },
  { path: '/things-unique-to-texas/texas-brands', title: "Famous Texas Brands: H-E-B, Buc-ee's, Whataburger & More", description: 'Explore famous and iconic Texas brands' },
  { path: '/sports-venues/high-school-football', title: 'Texas High School Football Stadiums: Best Venues & Guides', description: 'Explore Texas high school football stadiums with venue guides' },
  { path: '/sports-venue/whataburger-field', title: 'Whataburger Field Corpus Christi: Parking, Map & Events', description: 'Plan a Whataburger Field visit in Corpus Christi with parking, map, arrival' },
  { path: '/texas-food-history', title: 'Texas Food History: Barbecue, Tex-Mex, Chili & More', description: 'Explore the history of Texas food through barbecue, Tex-Mex, chili' },
];

const thirdWave = [
  { path: '/event/burnet-bluebonnet-festival', title: 'Burnet Bluebonnet Festival 2027: Dates, Schedule & Guide', description: "Burnet's Bluebonnet Festival runs April 9-11, 2027" },
  { path: '/event/chappell-hill-bluebonnet-festival', title: 'Chappell Hill Bluebonnet Festival 2027: Dates & Guide', description: 'The Official State of Texas Bluebonnet Festival returns to Chappell Hill April 10-11, 2027' },
  { path: '/event/buc-days', title: 'Buc Days 2027: Corpus Christi Dates, Rodeo & Carnival', description: 'Buc Days runs April 29-May 9, 2027 in Corpus Christi' },
  { path: '/event/poteet-strawberry-festival', title: 'Poteet Strawberry Festival 2027: Date Status & Visitor Guide', description: 'The organizer says the 80th annual dates are coming soon' },
];

const fourthWaveCorrections = [
  { path: '/event/sweetwater-rattlesnake-roundup', title: 'Sweetwater Rattlesnake Roundup 2027: Projected Dates & Guide', description: 'Sweetwater Rattlesnake Roundup 2027 projected planning window: March 12-14' },
  { path: '/event/charro-days-fiesta', title: 'Charro Days Fiesta 2027: Dates, Parade & Brownsville Guide', description: 'Charro Days Fiesta 2027 core dates are Feb. 25-27 in Brownsville' },
];

const fifthWave = [
  { path: "/article/lake-whitney-water-system-guide", title: "Lake Whitney Texas: Brazos River Reservoir & Water Guide", description: "Understand Lake Whitney as a Brazos River reservoir, including flood control, water supp" },
  { path: "/article/texas-jobs-economy-industries", title: "Texas Economy & Jobs: Major Industries, Regions & Growth", description: "Explore the Texas economy by major industries, jobs and regions, from energy and manufac" },
  { path: "/county/lamb", title: "Lamb County, Texas: Population, County Seat & Local Guide", description: "Explore Lamb County, Texas with population, county seat, communities, land area, geograp" },
  { path: "/event/great-american-scrapbook-convention", title: "Great American Scrapbook Convention: Mesquite Visitor Guide", description: "Plan the Great American Scrapbook Convention in Mesquite with event information, venue g" },
  { path: "/events/big-bend-events", title: "Big Bend Events & Festivals: Far West Texas Calendar Guide", description: "Find Big Bend and Far West Texas events with festival, community, arts and outdoor plann" },
  { path: "/sports-venue/constellation-field", title: "Constellation Field Sugar Land: Parking, Map & Events", description: "Plan a Constellation Field visit in Sugar Land with parking, map, arrival, ticket and ev" },
  { path: "/sports-venue/ford-center-at-the-star", title: "Ford Center at The Star: Parking, Map & Events", description: "Plan a Ford Center at The Star visit in Frisco with parking, map, arrival and event info" },
  { path: "/sports-venue/houston-motorsports-park", title: "Houston Motorsports Park: Racing, Schedule & Visitor Guide", description: "Plan a Houston Motorsports Park visit with racing, event, arrival, map and official-sour" },
  { path: "/sports-venue/texas-motorplex", title: "Texas Motorplex Ennis: Drag Racing, Events & Visitor Guide", description: "Plan a Texas Motorplex visit in Ennis with drag-racing event, parking, map, arrival and " },
  { path: "/sports-venue/ufcu-stadium", title: "UFCU Stadium San Marcos: Parking, Map & Events", description: "Plan a UFCU Stadium visit in San Marcos with parking, map, arrival and event information" },
  { path: "/sports-venues/baseball", title: "Texas Baseball Stadiums & Ballparks: Venue Guides", description: "Explore Texas baseball stadiums and ballparks with venue guides, locations, parking and " },
  { path: "/texas-symbols/fruit", title: "Texas State Fruit: Texas Red Grapefruit Facts & History", description: "Texas Red Grapefruit is the official state fruit. Learn when Texas adopted it, why the R" },
  { path: "/texas-symbols/pepper", title: "Texas State Pepper: Jalapeño Facts & State Symbol History", description: "The jalapeño is the official Texas state pepper. Learn when it was designated, its place" },
  { path: "/texas-symbols/shell", title: "Texas State Shell: Lightning Whelk Facts & Gulf Coast Guide", description: "The lightning whelk is the official Texas state shell. Learn its designation, distinctiv" },
  { path: "/texas-vs/georgia", title: "Texas vs Georgia: Cost of Living, Taxes, Climate & Lifestyle", description: "Compare Texas and Georgia on cost of living, taxes, housing, climate, jobs, geography an" },
  { path: "/texas-vs/ohio", title: "Texas vs Ohio: Cost of Living, Taxes, Climate & Lifestyle", description: "Compare Texas and Ohio on cost of living, taxes, housing, climate, jobs, geography and d" },
  { path: "/texas-vs/tennessee", title: "Texas vs Tennessee: Cost of Living, Taxes & Lifestyle", description: "Compare Texas and Tennessee on cost of living, taxes, housing, climate, jobs, geography " },
  { path: "/events/rodeos", title: "Texas Rodeos: Major Events, Calendar & Visitor Guides", description: "Explore Texas rodeos with major event guides, locations, seasonal planning and links to " },
  { path: "/sports-venue/rice-stadium", title: "Rice Stadium Houston: Parking, Map & Events", description: "Plan a Rice Stadium visit in Houston with parking, map, arrival and event information fo" },
  { path: "/sports-venue/tdecu-stadium", title: "TDECU Stadium Houston: Parking, Map & Events", description: "Plan a TDECU Stadium visit in Houston with parking, map, arrival and event information f" },
];

for (const experiment of fifthWave) {
  for (const required of ['"' + experiment.path + '"', experiment.title, experiment.description]) {
    if (!seo.includes(required)) failures.push('Fifth-wave CTR contract missing for ' + experiment.path + ': ' + required);
  }
}

if (fifthWave.length !== 20) {
  failures.push('Expected exactly 20 fifth-wave GSC CTR experiments, found ' + fifthWave.length + '.');
}

const sixthWave = [
  { path: "/county/bowie", title: "Bowie County, Texas: Population, County Seat & Local Guide", description: "Explore Bowie County, Texas with population, county seat, communities" },
  { path: "/county/burnet", title: "Burnet County, Texas: Population, County Seat & Local Guide", description: "Explore Burnet County, Texas with population, county seat, communities" },
  { path: "/county/erath", title: "Erath County, Texas: Population, County Seat & Local Guide", description: "Explore Erath County, Texas with population, county seat, communities" },
  { path: "/county/henderson", title: "Henderson County, Texas: Population, County Seat & Local Guide", description: "Explore Henderson County, Texas with population, county seat, communities" },
  { path: "/county/jasper", title: "Jasper County, Texas: Population, County Seat & Local Guide", description: "Explore Jasper County, Texas with population, county seat, communities" },
  { path: "/county/orange", title: "Orange County, Texas: Population, County Seat & Local Guide", description: "Explore Orange County, Texas with population, county seat, communities" },
  { path: "/county/panola", title: "Panola County, Texas: Population, County Seat & Local Guide", description: "Explore Panola County, Texas with population, county seat, communities" },
  { path: "/county/refugio", title: "Refugio County, Texas: Population, County Seat & Local Guide", description: "Explore Refugio County, Texas with population, county seat, communities" },
  { path: "/explore/painted-churches/guides/painted-churches-weekend-hours", title: "Painted Churches of Texas: Weekend Hours & Tour Planning", description: "Plan a weekend visit to Texas Painted Churches with opening-hour guidance" },
  { path: "/fishing/lakes/sam-rayburn-reservoir/fish", title: "Sam Rayburn Reservoir Fish Species: Bass, Crappie & More", description: "See common fish species in Sam Rayburn Reservoir" },
  { path: "/sports-venue/momentum-bank-ballpark", title: "Momentum Bank Ballpark: Midland RockHounds Stadium Guide", description: "Plan a Momentum Bank Ballpark visit in Midland with RockHounds baseball" },
  { path: "/sports-venue/lone-star-park", title: "Lone Star Park Grand Prairie: Racing, Tickets & Visitor Guide", description: "Plan a Lone Star Park visit in Grand Prairie with horse-racing" },
  { path: "/sports-venue/sun-bowl-stadium", title: "Sun Bowl Stadium El Paso: Parking, Map & Events", description: "Plan a Sun Bowl Stadium visit in El Paso with parking" },
  { path: "/sports-venue/college-park-center", title: "College Park Center Arlington: Parking, Map & Events", description: "Plan a College Park Center visit in Arlington with parking" },
  { path: "/sports-venue/unt-coliseum", title: "UNT Coliseum (Super Pit): Parking, Map & Events", description: "Plan a UNT Coliseum visit in Denton with parking" },
  { path: "/texas-symbols/amphibian", title: "Texas State Amphibian: Texas Toad Facts & History", description: "The Texas toad is the official state amphibian" },
  { path: "/texas-symbols/cobbler", title: "Texas State Cobbler: Peach Cobbler Facts & History", description: "Peach cobbler is the official Texas state cobbler" },
  { path: "/texas-symbols/dinosaur", title: "Texas State Dinosaur: Paluxysaurus Facts & History", description: "Learn about the official Texas state dinosaur, Paluxysaurus" },
  { path: "/texas-vs/utah", title: "Texas vs Utah: Cost of Living, Climate, Taxes & Lifestyle", description: "Compare Texas and Utah on cost of living, taxes, housing, climate" },
  { path: "/texas-vs/south-carolina", title: "Texas vs South Carolina: Cost, Taxes, Climate & Lifestyle", description: "Compare Texas and South Carolina on cost of living, taxes, housing, climate" },
];

for (const experiment of sixthWave) {
  for (const required of ['"' + experiment.path + '"', experiment.title, experiment.description]) {
    if (!seo.includes(required)) failures.push('Sixth-wave CTR contract missing for ' + experiment.path + ': ' + required);
  }
}

if (sixthWave.length !== 20) {
  failures.push('Expected exactly 20 sixth-wave GSC CTR experiments, found ' + sixthWave.length + '.');
}

const seventhWave = [
  { path: "/event/addison-oktoberfest", title: "Addison Oktoberfest: Dates, Hours, Tickets & Parking", description: "latest confirmed dates" },
  { path: "/texas-state-fair", title: "State Fair of Texas 2026: Dates, Hours, Schedule & Tickets", description: "State Fair of Texas 2026 runs Sept. 25-Oct. 18" },
  { path: "/article/el-paso-county-missions-rio-grande-texas", title: "El Paso County Missions & Rio Grande: Borderlands History Guide", description: "Explore El Paso County through the Rio Grande, Ysleta Mission" },
  { path: "/article/texas-barbecue-styles-explained", title: "Texas Barbecue Styles: Central, East, South & West Texas BBQ", description: "Compare Texas barbecue styles by region" },
  { path: "/article/texas-business-routes-explained", title: "What Is a Business Highway? Texas Business Routes Explained", description: "Learn what a business highway or business route is" },
  { path: "/article/texas-culture-social-customs-newcomers", title: "Texas Culture & Traditions: Newcomer Guide to Social Customs", description: "Understand Texas culture, traditions and everyday social customs" },
  { path: "/things-unique-to-texas", title: "What Is Texas Known For? Iconic Foods, Places & Traditions", description: "Explore things strongly associated with Texas" },
  { path: "/destination/natural-bridge-wildlife-ranch", title: "Natural Bridge Wildlife Ranch: Tickets, Hours & Visitor Guide", description: "Plan a Natural Bridge Wildlife Ranch visit near San Antonio" },
  { path: "/event/lone-star-cowboy-poetry-gathering-bastrop", title: "Lone Star Cowboy Poetry Gathering 2027: Bastrop Dates & Guide", description: "returns to Bastrop Sept. 3-4, 2027" },
  { path: "/event/schulenburg-festival", title: "Schulenburg Festival 2027: Projected Dates & Visitor Guide", description: "projected Aug. 5-8, 2027 dates" },
  { path: "/event/terlingua-international-chili-championship", title: "Terlingua International Chili Championship: Dates & Visitor Guide", description: "Plan the Terlingua International Chili Championship" },
  { path: "/sports-venue/cotton-bowl-stadium", title: "Cotton Bowl Stadium Dallas: Parking, Map & Events", description: "Plan a Cotton Bowl Stadium visit at Fair Park in Dallas" },
  { path: "/sports-venue/datcu-stadium", title: "DATCU Stadium Denton: Parking, Map & North Texas Football", description: "Plan a DATCU Stadium visit in Denton" },
  { path: "/sports-venue/jamail-texas-swimming-center", title: "Lee & Joe Jamail Texas Swimming Center: Parking & Events", description: "Plan a Jamail Texas Swimming Center visit in Austin" },
  { path: "/sports-venue/tpc-san-antonio", title: "TPC San Antonio: Golf Courses, Tournaments & Visitor Guide", description: "Explore TPC San Antonio with course, tournament" },
  { path: "/texas-country-outlaw", title: "Texas Outlaw Country: Artists, History & Texas Country Sound", description: "Explore Texas outlaw country and Texas country music" },
  { path: "/texas-vs/louisiana", title: "Texas vs Louisiana: Cost of Living, Taxes, Climate & Lifestyle", description: "Compare Texas and Louisiana on cost of living" },
  { path: "/texas-symbols/tree", title: "Texas State Tree: Pecan Tree Facts & State Symbol History", description: "The pecan is the official Texas state tree" },
  { path: "/destination/mckinney-falls-state-park", title: "McKinney Falls State Park: Trails, Camping & Austin Visitor Guide", description: "Plan McKinney Falls State Park near Austin" },
];

for (const experiment of seventhWave) {
  for (const required of ['"' + experiment.path + '"', experiment.title, experiment.description]) {
    if (!seo.includes(required)) failures.push('Seventh-wave CTR contract missing for ' + experiment.path + ': ' + required);
  }
}

if (seventhWave.length !== 20) {
  failures.push('Expected exactly 20 seventh-wave GSC CTR experiments, found ' + seventhWave.length + '.');
}

const eighthWave = [
  { path: "/event/kerrville-folk-festival", title: "Kerrville Folk Festival 2027: Schedule, Tickets & Visitor Guide", description: "Plan the 2027 Kerrville Folk Festival at Quiet Valley Ranch" },
  { path: "/article/texas-caverns-caves-first-timers-guide", title: "Caverns in Texas: Public Caves, Tours & First-Timer Guide", description: "Find Texas caverns and caves open to the public" },
  { path: "/explore/painted-churches-plan", title: "Painted Churches of Texas Tour: Schulenburg Route & Trip Planner", description: "Plan a one-day Painted Churches of Texas self-guided route" },
  { path: "/texas-disabled-veteran-property-tax-calculator", title: "Texas Disabled Veteran Property Tax Calculator & Exemption Guide", description: "Estimate the tax effect of a verified Texas disabled-veteran property-tax exemption amount" },
  { path: "/article/texas-highway-designations-explained", title: "Texas Road Names Explained: FM, RM, SH, Loops & Spurs", description: "Learn what FM, RM, SH, loops, spurs and other Texas highway designations mean" },
  { path: "/article/possum-kingdom-water-system-guide", title: "Possum Kingdom Lake: Water Level, Brazos River Authority & Guide", description: "Understand Possum Kingdom Lake water management" },
  { path: "/texas-data/school-district-tax-rates", title: "Texas School District Property Tax Rates: Comptroller Data", description: "Compare selected Texas school-district adopted property-tax rates" },
  { path: "/sports-venue/amarillo-national-center", title: "Amarillo National Center: Events, Parking & Visitor Guide", description: "Plan an Amarillo National Center visit" },
  { path: "/sports-venue/eagles-canyon-raceway", title: "Eagles Canyon Raceway: Track Map, Events & Visitor Guide", description: "Plan an Eagles Canyon Raceway visit" },
  { path: "/sports-venue/expo-center-taylor-county", title: "Taylor County Expo Center: Events, Parking & Abilene Guide", description: "Plan a Taylor County Expo Center visit in Abilene" },
  { path: "/texas-symbols/motto", title: "Texas State Motto: Friendship Meaning, History & Facts", description: "Learn the official Texas state motto" },
  { path: "/texas-symbols/horse", title: "Texas State Horse: American Quarter Horse Facts & History", description: "Learn about the American Quarter Horse as an official Texas state symbol" },
  { path: "/texas-vs/kentucky", title: "Texas vs Kentucky: Cost of Living, Taxes, Climate & Lifestyle", description: "Compare Texas and Kentucky on cost of living" },
  { path: "/texas-vs/west-virginia", title: "Texas vs West Virginia: Cost of Living, Taxes & Lifestyle", description: "Compare Texas and West Virginia on cost of living" },
  { path: "/article/texas-courthouse-architecture-guide", title: "Texas Courthouse Architecture: Styles, History & Buildings Guide", description: "Explore Texas courthouse architecture by style and era" },
];

for (const experiment of eighthWave) {
  for (const required of ['"' + experiment.path + '"', experiment.title, experiment.description]) {
    if (!seo.includes(required)) failures.push('Eighth-wave CTR contract missing for ' + experiment.path + ': ' + required);
  }
}

if (eighthWave.length !== 15) {
  failures.push('Expected exactly 15 eighth-wave GSC CTR experiments, found ' + eighthWave.length + '.');
}

const ninthWave = [
  { path: "/article/texas-railroads-town-growth-explained", title: "Texas Railroad Towns: How Rail Lines Shaped City Growth", description: "See how railroads shaped Texas town growth, depot districts, commerce and settlement pattern" },
  { path: "/event/great-texas-balloon-race", title: "Great Texas Balloon Race: Dates, Tickets & Longview Guide", description: "Plan the Great Texas Balloon Race in Longview with the latest organizer date status, ticket" },
  { path: "/sports-venue/freeman-coliseum", title: "Freeman Coliseum San Antonio: Parking, Events & Visitor Guide", description: "Plan a Freeman Coliseum visit in San Antonio with parking, directions, event and official ve" },
  { path: "/sports-venue/hodgetown", title: "HODGETOWN Amarillo: Parking, Tickets & Sod Poodles Games", description: "Plan a HODGETOWN visit in Amarillo with parking, tickets, directions and event information f" },
  { path: "/sports-venue/reckling-park", title: "Reckling Park Houston: Parking, Tickets & Rice Baseball", description: "Plan a Reckling Park visit in Houston with parking, tickets, directions and official Rice ba" },
  { path: "/sports-venue/southwest-university-park", title: "Southwest University Park El Paso: Parking, Tickets & Baseball", description: "Plan a Southwest University Park visit in El Paso with parking, tickets, directions and even" },
  { path: "/sports-venue/ufcu-disch-falk-field", title: "UFCU Disch-Falk Field Austin: Parking, Tickets & Texas Baseball", description: "Plan a UFCU Disch-Falk Field visit in Austin with parking, tickets, directions and official" },
  { path: "/sports-venue/don-haskins-center", title: "Don Haskins Center El Paso: Parking, Events & UTEP Basketball", description: "Plan a Don Haskins Center visit in El Paso with parking, directions, event and official venu" },
  { path: "/texas-symbols/nickname", title: "Texas State Nickname: Why Texas Is the Lone Star State", description: "Learn why Texas is called the Lone Star State, how the nickname connects to the state flag a" },
  { path: "/texas-symbols/grass", title: "Texas State Grass: Sideoats Grama Facts & History", description: "Learn about sideoats grama, the official Texas state grass, including its designation, range" },
  { path: "/texas-symbols/sea-turtle", title: "Texas State Sea Turtle: Kemp's Ridley Facts & History", description: "Learn about Kemp's ridley, the official Texas state sea turtle, including its designation, G" },
  { path: "/texas-vs/nebraska", title: "Texas vs Nebraska: Cost of Living, Taxes, Climate & Lifestyle", description: "Compare Texas and Nebraska on cost of living, taxes, housing, climate, jobs, geography and d" },
];

for (const experiment of ninthWave) {
  for (const required of ['"' + experiment.path + '"', experiment.title, experiment.description]) {
    if (!seo.includes(required)) failures.push('Ninth-wave CTR contract missing for ' + experiment.path + ': ' + required);
  }
}

if (ninthWave.length !== 12) {
  failures.push('Expected exactly 12 ninth-wave GSC CTR experiments, found ' + ninthWave.length + '.');
}

const tenthWave = [
  { path: "/article/texas-brazos-river-guide", title: "Brazos River Texas: Basin, Tributaries, Lakes & Gulf Guide", description: "Follow the Brazos River across Texas from its upper forks to the Gulf" },
  { path: "/article/texas-guadalupe-river-guide", title: "Guadalupe River Texas: Canyon Lake, Springs & Basin Guide", description: "Follow the Guadalupe River from the Hill Country to San Antonio Bay" },
  { path: "/article/texas-trinity-river-guide", title: "Trinity River Texas: Dallas-Fort Worth, Basin & Gulf Guide", description: "Follow the Trinity River through North Texas toward Trinity Bay" },
];

for (const experiment of tenthWave) {
  for (const required of ['"' + experiment.path + '"', experiment.title, experiment.description]) {
    if (!seo.includes(required)) failures.push('Tenth-wave CTR contract missing for ' + experiment.path + ': ' + required);
  }
}

if (tenthWave.length !== 3) {
  failures.push('Expected exactly 3 tenth-wave GSC CTR experiments, found ' + tenthWave.length + '.');
}

const settlementLandingSelection = {
  path: '/article/texas-settlement-patterns-explained',
  title: 'Texas Settlement Patterns: How Geography Shaped Towns',
  description: 'See how rivers and reliable water drew early Texas settlement, while rainfall and fertile soils supported denser farm communities than drier ranch country',
};

for (const experiment of experiments) {
  for (const required of [`\"${experiment.path}\"`, experiment.title, experiment.description]) {
    if (!seo.includes(required)) failures.push(`Page-one CTR contract missing for ${experiment.path}: ${required}`);
  }
}

if (experiments.length !== 20) {
  failures.push(`Expected exactly 20 priority GSC CTR experiments, found ${experiments.length}.`);
}

for (const experiment of secondWave) {
  for (const required of [`\"${experiment.path}\"`, experiment.title, experiment.description]) {
    if (!seo.includes(required)) failures.push(`Second-wave CTR contract missing for ${experiment.path}: ${required}`);
  }
}

if (secondWave.length !== 14) {
  failures.push(`Expected exactly 14 second-wave GSC CTR experiments, found ${secondWave.length}.`);
}

for (const experiment of thirdWave) {
  for (const required of [`\"${experiment.path}\"`, experiment.title, experiment.description]) {
    if (!seo.includes(required)) failures.push(`Third-wave CTR contract missing for ${experiment.path}: ${required}`);
  }
}

if (thirdWave.length !== 4) {
  failures.push(`Expected exactly 4 third-wave GSC CTR experiments, found ${thirdWave.length}.`);
}

for (const experiment of fourthWaveCorrections) {
  for (const required of [`\"${experiment.path}\"`, experiment.title, experiment.description]) {
    if (!seo.includes(required)) failures.push(`Fourth-wave CTR correction missing for ${experiment.path}: ${required}`);
  }
}

if (fourthWaveCorrections.length !== 2) {
  failures.push(`Expected exactly 2 fourth-wave GSC CTR corrections, found ${fourthWaveCorrections.length}.`);
}

for (const required of [
  `\"${settlementLandingSelection.path}\"`,
  settlementLandingSelection.title,
  settlementLandingSelection.description,
]) {
  if (!seo.includes(required)) failures.push(`Settlement landing-selection SSR signal missing: ${required}`);
}

for (const required of [
  'slug: "texas-settlement-patterns-explained"',
  `title: "${settlementLandingSelection.title}"`,
  `dek: "${settlementLandingSelection.description}."`,
  '"texas settlement patterns"',
  '"texas geography"',
]) {
  if (!settlementStub.includes(required)) failures.push(`Settlement landing-selection catalog signal missing: ${required}`);
}

if (settlementStub.includes('title: "Why Texas Towns Are Where They Are: Rivers, Railroads, Ranches & County Seats"')) {
  failures.push('Settlement catalog title must not keep the weaker town-location framing that Google bypassed for the broader hub.');
}

for (const required of [
  'slug: "westfest"',
  'sourceCheckedAt: "2026-09-09"',
  'Westfest 2027 dates: use September 3-5 as the planning window',
  'Westfest parade: plan for Labor Day Saturday, then confirm the 2027 time',
  'Westfest schedule and hours: check the official pages before you go',
  'https://westfest.com/parade',
  'https://westfest.com/schedule-of-events',
  'https://westfest.com/admission-1',
  'The dedicated 2027 schedule and operating hours are not yet published',
]) {
  if (!westfest.includes(required)) failures.push(`Westfest page-one CTR contract missing: ${required}`);
}

for (const required of [
  'slug: "poteet-strawberry-festival"',
  'the organizer currently says the 80th annual festival dates are coming soon',
  'Texas Defined does not present the 2027 projection as verified',
  'Its current site has not yet published the 2027 dates',
]) {
  if (!poteet.includes(required)) failures.push(`Poteet date-safety contract missing: ${required}`);
}

if (seo.includes('Poteet Strawberry Festival runs April 9-11, 2027') || seo.includes('Poteet Strawberry Festival 2027: April 9-11')) {
  failures.push('Poteet CTR metadata must not present the unverified April 9-11, 2027 projection as confirmed.');
}

for (const required of [
  'slug: "sweetwater-rattlesnake-roundup"',
  'startDate: "2027-03-12"',
  'endDate: "2027-03-14"',
  'recurrence-derived planning window',
  'A dedicated 2027 program, daily hours and ticket details are not yet published',
]) {
  if (!sweetwater.includes(required)) failures.push(`Sweetwater date-safety contract missing: ${required}`);
}

if (seo.includes('title: "Sweetwater Rattlesnake Roundup: Dates & Visitor Guide"')) {
  failures.push('Sweetwater CTR metadata must retain the 2027 planning-window intent surfaced by Search Console.');
}

for (const required of [
  'slug: "charro-days-fiesta"',
  'The 2027 schedule includes Noche Mexicana',
  "Children's Parade on February 25",
  'Illuminated Parade on February 26',
  'Grand International parades on February 27',
  'Charro Days official 2027 events schedule',
]) {
  if (!charro.includes(required)) failures.push(`Charro Days 2027 source contract missing: ${required}`);
}

if (seo.includes('title: "Charro Days Fiesta: Dates, Parade & Brownsville Guide"')) {
  failures.push('Charro Days CTR metadata must retain the organizer-confirmed 2027 year in the search title.');
}

if (!seo.includes('const META_DESCRIPTION_MAX_LENGTH = 160;') || !seo.includes('cleanMetaDescription')) {
  failures.push('Page-one CTR experiments must retain the shared meta-description length guard.');
}


const liveWave10 = [
  { path: '/article/texas-rivers-explained', title: 'Major Rivers in Texas: Boundary Rivers, Regions & Map', description: "major and boundary rivers by region" },
  { path: '/article/texas-river-basins-guide', title: 'Texas River Basins: 15 Major, 8 Coastal & Watershed Map', description: "watershed map" },
  { path: '/event/heart-o-texas-fair-rodeo', title: "Heart O' Texas Fair & Rodeo 2026: Dates, Schedule & Tickets", description: "Oct. 8-18 in Waco" },
  { path: '/texas-state-fair', title: 'State Fair of Texas 2026: Dates, Hours, Schedule & Tickets', description: 'Sept. 25-Oct. 18' },
];

for (const experiment of liveWave10) {
  for (const required of ['"' + experiment.path + '"', experiment.title, experiment.description]) {
    if (!seo.includes(required) && !stateFair.includes(required)) failures.push('Live Wave 10 CTR contract missing for ' + experiment.path + ': ' + required);
  }
}
if (liveWave10.length !== 4) failures.push('Expected exactly 4 live Wave 10 CTR experiments, found ' + liveWave10.length + '.');

if (failures.length) {
  console.error('GSC page-one CTR validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('GSC page-one CTR validation passed: the original top 20, second-wave 14, third-wave 4 and fourth-wave 2 corrections remain server-only and length-guarded; Sweetwater remains a recurrence-derived 2027 planning window, Charro Days uses organizer-confirmed 2027 schedule data, and the dedicated Texas settlement-patterns child page now carries the stronger geography/settlement search signal instead of relying on the broader Texas Explained hub.');
