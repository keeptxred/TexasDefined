from pathlib import Path

seo_path = Path('src/lib/seo.ts')
seo = seo_path.read_text()
seo_marker = '\n} : {};\n\nconst SOCIAL_IMAGE_FALLBACKS'
seo_insert = r'''
  "/event/kerrville-folk-festival": {
    title: "Kerrville Folk Festival 2027: Schedule, Tickets & Visitor Guide",
    description: "Plan the 2027 Kerrville Folk Festival at Quiet Valley Ranch with schedule, ticket, camping, arrival and official festival information.",
  },
  "/article/texas-caverns-caves-first-timers-guide": {
    title: "Caverns in Texas: Public Caves, Tours & First-Timer Guide",
    description: "Find Texas caverns and caves open to the public, compare tour experiences and plan a first visit with location, access and official-site guidance.",
  },
  "/explore/painted-churches-plan": {
    title: "Painted Churches of Texas Map: Schulenburg Route & Trip Planner",
    description: "Plan a Schulenburg-area Painted Churches road trip with a mapped route, church stops, weekend-hour guidance and practical trip-planning links.",
  },
  "/texas-disabled-veteran-property-tax-calculator": {
    title: "Texas Disabled Veteran Property Tax Calculator & Exemption Guide",
    description: "Estimate the tax effect of a verified Texas disabled-veteran property-tax exemption amount using official local taxing-unit rates that apply to the property.",
  },
  "/article/texas-highway-designations-explained": {
    title: "Texas Road Names Explained: FM, RM, SH, Loops & Spurs",
    description: "Learn what FM, RM, SH, loops, spurs and other Texas highway designations mean, how the road system is named and where each designation is used.",
  },
  "/article/possum-kingdom-water-system-guide": {
    title: "Possum Kingdom Lake: Water Level, Brazos River Authority & Guide",
    description: "Understand Possum Kingdom Lake water management, current-level resources, Brazos River Authority ownership and the reservoir system behind the lake.",
  },
  "/texas-data/school-district-tax-rates": {
    title: "Texas School District Property Tax Rates: Comptroller Data",
    description: "Compare selected Texas school-district adopted property-tax rates from the statewide Comptroller dataset, with source and year context for each figure.",
  },
  "/sports-venue/amarillo-national-center": {
    title: "Amarillo National Center: Events, Parking & Visitor Guide",
    description: "Plan an Amarillo National Center visit with event, parking, arrival, address and official venue information for the Tri-State Fairgrounds complex.",
  },
  "/sports-venue/eagles-canyon-raceway": {
    title: "Eagles Canyon Raceway: Track Map, Events & Visitor Guide",
    description: "Plan an Eagles Canyon Raceway visit with track, event, arrival, map and official motorsports information for the Decatur-area road course.",
  },
  "/sports-venue/expo-center-taylor-county": {
    title: "Taylor County Expo Center: Events, Parking & Abilene Guide",
    description: "Plan a Taylor County Expo Center visit in Abilene with event, parking, arrival, address and official venue information.",
  },
  "/texas-symbols/motto": {
    title: "Texas State Motto: Friendship Meaning, History & Facts",
    description: "Learn the official Texas state motto, what Friendship means in Texas history and how the motto fits among the state's official symbols.",
  },
  "/texas-symbols/horse": {
    title: "Texas State Horse: American Quarter Horse Facts & History",
    description: "Learn about the American Quarter Horse as an official Texas state symbol, including its designation, history and connection to Texas ranching culture.",
  },
  "/texas-vs/kentucky": {
    title: "Texas vs Kentucky: Cost of Living, Taxes, Climate & Lifestyle",
    description: "Compare Texas and Kentucky on cost of living, taxes, housing, climate, jobs, geography and day-to-day lifestyle in a practical side-by-side guide.",
  },
  "/texas-vs/west-virginia": {
    title: "Texas vs West Virginia: Cost of Living, Taxes & Lifestyle",
    description: "Compare Texas and West Virginia on cost of living, taxes, housing, climate, jobs, geography and daily life in a practical side-by-side state guide.",
  },
  "/article/texas-courthouse-architecture-guide": {
    title: "Texas Courthouse Architecture: Styles, History & Buildings Guide",
    description: "Explore Texas courthouse architecture by style and era, from Romanesque and Classical designs to regional materials, historic squares and preservation.",
  },
'''
if '"/event/kerrville-folk-festival"' not in seo:
    if seo_marker not in seo:
        raise SystemExit('SEO insertion marker not found')
    seo = seo.replace(seo_marker, '\n' + seo_insert + '} : {};\n\nconst SOCIAL_IMAGE_FALLBACKS', 1)
    seo_path.write_text(seo)

validator_path = Path('scripts/data/validate-gsc-page-one-ctr.mjs')
validator = validator_path.read_text()
validator_marker = 'const settlementLandingSelection = {'
validator_insert = r'''const eighthWave = [
  { path: "/event/kerrville-folk-festival", title: "Kerrville Folk Festival 2027: Schedule, Tickets & Visitor Guide", description: "Plan the 2027 Kerrville Folk Festival at Quiet Valley Ranch" },
  { path: "/article/texas-caverns-caves-first-timers-guide", title: "Caverns in Texas: Public Caves, Tours & First-Timer Guide", description: "Find Texas caverns and caves open to the public" },
  { path: "/explore/painted-churches-plan", title: "Painted Churches of Texas Map: Schulenburg Route & Trip Planner", description: "Plan a Schulenburg-area Painted Churches road trip" },
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

'''
if 'const eighthWave = [' not in validator:
    if validator_marker not in validator:
        raise SystemExit('Validator insertion marker not found')
    validator = validator.replace(validator_marker, validator_insert + validator_marker, 1)
    validator_path.write_text(validator)
