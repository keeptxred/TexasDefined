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

const experiments = [
  {
    path: '/article/texas-rivers-explained',
    title: 'Major Rivers in Texas: Boundary Rivers, Regions & Basins',
    description: "Find Texas's major and boundary rivers by region",
  },
  {
    path: '/article/texas-river-basins-guide',
    title: 'Texas River Basins: 15 Major & 8 Coastal Basins',
    description: "Learn how Texas's 15 major and eight coastal basins divide the state by watershed",
  },
  {
    path: '/article/texas-lakes-reservoirs-explained',
    title: 'Texas Lakes & Reservoirs: Why Most Are Man-Made',
    description: 'most familiar inland Texas lakes are reservoirs built for water supply and flood control',
  },
  {
    path: '/article/texas-school-districts-explained',
    title: 'What Does ISD Stand For in Texas? School District Guide',
    description: 'city limits and ZIP codes do not determine school districts',
  },
  {
    path: '/article/why-texas-has-254-counties',
    title: 'Why Does Texas Have 254 Counties? History & County Seats',
    description: 'distance, settlement, county seats and 19th-century travel',
  },
  {
    path: '/sports-venue/legacy-stadium-katy',
    title: 'Legacy Stadium Katy: Parking, Events & Visitor Guide',
    description: 'verified parking, arrival, event, official venue and map links',
  },
  {
    path: '/sports-venue/mesquite-memorial-stadium',
    title: 'Mesquite Memorial Stadium: Parking, Tickets & Events',
    description: 'verified parking, directions, ticket and event links',
  },
  {
    path: '/sports-venue/mckinney-isd-stadium',
    title: 'McKinney ISD Stadium: Parking, Events & Visitor Guide',
    description: 'verified parking, arrival, event-day and official venue links',
  },
];

for (const experiment of experiments) {
  for (const required of [`\"${experiment.path}\"`, experiment.title, experiment.description]) {
    if (!seo.includes(required)) failures.push(`Page-one CTR contract missing for ${experiment.path}: ${required}`);
  }
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

console.log('GSC page-one CTR validation passed: high-impression article and sports-venue snippet experiments remain server-only and length-guarded, and Westfest date, parade, schedule and hours intent remains current-source aligned without presenting the unconfirmed 2027 program as final.');
