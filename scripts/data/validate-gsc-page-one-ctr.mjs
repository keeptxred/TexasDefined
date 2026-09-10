import fs from 'node:fs';

const seo = fs.readFileSync('src/lib/seo.ts', 'utf8');
const westfest = fs.readFileSync('src/data/major-event-expanded-authority-tranche11.server.ts', 'utf8');
const failures = [];

for (const required of [
  'const TEXASDEFINED_GSC_SSR_OVERRIDES: Record<string, TechnicalSeoOverride> = import.meta.env.SSR ? {',
  '? TEXASDEFINED_GSC_SSR_OVERRIDES[page.canonicalPath] ?? TEXASDEFINED_TECHNICAL_SEO_OVERRIDES[page.canonicalPath]',
]) {
  if (!seo.includes(required)) failures.push(`GSC CTR override architecture missing: ${required}`);
}

// Snapshot of the 20 strongest page-one / near-page-one CTR opportunities from
// Search Console for Aug. 27-Sep. 9, 2026. Keep these explicit so later SEO
// refactors cannot silently discard the server-rendered snippet experiments.
const experiments = [
  {
    path: '/article/texas-rivers-explained',
    title: 'Major Rivers in Texas: Boundary Rivers, Regions & Basins',
    description: "Find Texas's major and boundary rivers by region",
  },
  {
    path: '/event/westfest',
    title: 'Westfest Texas: Dates, Parade, Schedule & Hours',
    description: 'Plan Westfest in West, Texas with the current date guidance',
  },
  {
    path: '/article/texas-river-basins-guide',
    title: 'Texas River Basins: 15 Major & 8 Coastal Basins',
    description: "Learn how Texas's 15 major and eight coastal basins divide the state by watershed",
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
    title: "Heart O' Texas Fair & Rodeo 2026: Dates & Schedule",
    description: "The 2026 Heart O' Texas Fair & Rodeo runs Oct. 8-18 in Waco",
  },
  {
    path: '/sports-venue/mckinney-isd-stadium',
    title: 'McKinney ISD Stadium: Parking, Events & Visitor Guide',
    description: 'verified parking, arrival, event-day and official venue links',
  },
  {
    path: '/event/sweetwater-rattlesnake-roundup',
    title: 'Sweetwater Rattlesnake Roundup: Dates & Visitor Guide',
    description: 'Plan the Sweetwater Jaycees Rattlesnake Roundup with date guidance',
  },
  {
    path: '/article/texas-school-districts-explained',
    title: 'What Does ISD Stand For in Texas? School District Guide',
    description: 'city limits and ZIP codes do not determine school districts',
  },
  {
    path: '/texas-symbols',
    title: 'Texas State Symbols: Official List, Meanings & State Icons',
    description: 'Explore Texas state symbols and official designations',
  },
  {
    path: '/article/republic-of-texas-navy-history',
    title: 'Republic of Texas Navy: Ships, Battles & History',
    description: 'Explore the Republic of Texas Navy, its ships, commanders, Gulf operations, battles',
  },
  {
    path: '/event/charro-days-fiesta',
    title: 'Charro Days Fiesta: Dates, Parade & Brownsville Guide',
    description: 'Plan Charro Days Fiesta in Brownsville with current date guidance',
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
    title: 'Floresville Peanut Festival 2026: Dates, Schedule & Tickets',
    description: 'Plan the 2026 Floresville Peanut Festival with verified dates',
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
  { path: '/event/dallas-holiday-parade', title: 'Dallas Holiday Parade 2026: Date, Route & Planning Guide', description: 'Dallas Holiday Parade 2026 planning date: Dec. 5' },
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

if (!seo.includes('const META_DESCRIPTION_MAX_LENGTH = 160;') || !seo.includes('cleanMetaDescription')) {
  failures.push('Page-one CTR experiments must retain the shared meta-description length guard.');
}

if (failures.length) {
  console.error('GSC page-one CTR validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('GSC page-one CTR validation passed: the original top 20 and second-wave 14 snippet experiments remain server-only and length-guarded, while Westfest date, parade, schedule and hours intent remains current-source aligned without presenting the unconfirmed 2027 program as final.');
