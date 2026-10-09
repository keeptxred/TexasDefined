import { appendFileSync } from 'node:fs';
import { matchesExpectedSurface } from './html-surface-marker.mjs';

const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();
const summaryPath = process.env.GITHUB_STEP_SUMMARY;

const surfaces = [
  ['city-houston-authority', '/city/houston', 'Museum District + Hermann Park'],
  ['city-houston-social', '/city/houston', 'Houston_texas_usa_skyline.jpg?width=1600'],
  ['city-dallas-authority', '/city/dallas', 'Choose one evening district'],
  ['city-dallas-social', '/city/dallas', 'Dallas_Texas_Skyline.jpg?width=1600'],
  ['city-fort-worth-authority', '/city/fort-worth', 'Panther Island'],
  ['city-fort-worth-social', '/city/fort-worth', 'Fort_Worth_Stock_Yards_Entrance_Wiki_(1_of_1).jpg?width=1600'],
  ['city-fort-worth-current-review', '/city/fort-worth', 'October 8, 2026'],
  ['city-fort-worth-reader-first-context', '/city/fort-worth', 'Texas context'],
  ['city-fort-worth-reader-first-food', '/city/fort-worth', 'This guide includes'],
  ['city-austin-authority', '/city/austin', 'Lady Bird Lake + South Congress'],
  ['city-austin-social', '/city/austin', 'Austin%2C_TX_skyline_2026.jpg?width=1600'],
  ['city-san-antonio-authority', '/city/san-antonio', 'Pearl + Museum Reach'],
  ['city-san-antonio-social', '/city/san-antonio', 'San_Antonio_Skyline_2026.jpg?width=1600'],
  ['city-el-paso-authority', '/city/el-paso', 'UTEP campus architecture'],
  ['city-el-paso-social', '/city/el-paso', 'El_Paso_skyline.jpg?width=1600'],
  ['city-arlington-authority', '/city/arlington', 'Build around the event calendar'],
  ['city-arlington-social', '/city/arlington', 'Arlington_Texas_Entertainment_District.jpg?width=1600'],
  ['city-hurst-authority', '/city/hurst', 'Use Hurst as a Mid-Cities base'],
  ['city-hurst-social', '/city/hurst', 'Cityhallathurst.jpg?width=1600'],
  ['city-corpus-christi-authority', '/city/corpus-christi', 'North Beach day'],
  ['city-corpus-christi-social', '/city/corpus-christi', 'Corpus_Christi_skyline.jpg?width=1600'],
  ['city-plano-authority', '/city/plano', 'Legacy / Legacy West'],
  ['city-plano-social', '/city/plano', 'Hdr_plano.jpg?width=1600'],
  ['city-lubbock-authority', '/city/lubbock', 'Downtown + Buddy Holly corridor'],
  ['city-lubbock-social', '/city/lubbock', 'Lubbock%2C_Texas_skyline.jpg?width=1600'],
  ['metro-houston-hub', '/explore/near/houston', 'Explore by trip type'],
  ['metro-houston-weekend-trips', '/explore/near/houston/weekend-trips', 'Weekend Trips From Houston, Texas'],
  ['metro-dallas-small-towns-2-hours', '/explore/near/dallas/small-towns-2-hours', 'Small-Town Day Trips From Dallas, Texas'],
  ['metro-austin-small-towns-2-hours', '/explore/near/austin/small-towns-2-hours', 'Small Towns About 1–2 Hours From Austin, Texas'],
  ['metro-austin-small-towns-editorial', '/explore/near/austin/small-towns-2-hours', 'Which Austin small-town day trip fits your day?'],
  ['metro-austin-swimming-holes', '/explore/near/austin/swimming-holes', 'Swimming Holes Near Austin, Texas'],
  ['metro-san-antonio-road-trips', '/explore/near/san-antonio/road-trips', 'Road Trips From San Antonio, Texas'],
  ['metro-fort-worth-lakes', '/explore/near/fort-worth/lakes', 'Lakes Near Fort Worth, Texas'],
  ['metro-corpus-christi-hub', '/explore/near/corpus-christi', 'Explore by trip type'],
  ['metro-waco-day-trips', '/explore/near/waco/day-trips', 'Best Day Trips From Waco, Texas'],
  ['metro-beaumont-port-arthur-hub', '/explore/near/beaumont-port-arthur', 'Explore by trip type'],
  ['metro-amarillo-road-trips', '/explore/near/amarillo/road-trips', 'Road Trips From Amarillo, Texas'],
  ['metro-el-paso-weekend-trips', '/explore/near/el-paso/weekend-trips', 'Weekend Trips From El Paso, Texas'],
  ['metro-lubbock-hub', '/explore/near/lubbock', 'Explore by trip type'],
  ['metro-mcallen-hub', '/explore/near/mcallen', 'Explore by trip type'],
  ['metro-midland-odessa-road-trips', '/explore/near/midland-odessa/road-trips', 'Road Trips From Midland–Odessa, Texas'],
  ['metro-tyler-lakes', '/explore/near/tyler/lakes', 'Lakes Near Tyler, Texas'],
  ['metro-college-station-day-trips', '/explore/near/college-station/day-trips', 'Best Day Trips From College Station, Texas'],
  ['metro-abilene-hub', '/explore/near/abilene', 'Explore by trip type'],
  ['metro-abilene-local-anchor', '/explore/near/abilene', 'Frontier Texas!'],
  ['metro-abilene-state-parks-local-anchor', '/explore/near/abilene/state-parks', 'Abilene State Park'],
  ['metro-abilene-historic-sites-local-anchor', '/explore/near/abilene/historic-sites', 'Buffalo Gap Historic Village'],
  ['metro-laredo-hub', '/explore/near/laredo', 'Explore by trip type'],
  ['metro-killeen-temple-day-trips', '/explore/near/killeen-temple/day-trips', 'Best Day Trips From Killeen–Temple, Texas'],
  ['metro-san-angelo-road-trips', '/explore/near/san-angelo/road-trips', 'Road Trips From San Angelo, Texas'],
  ['metro-wichita-falls-lakes', '/explore/near/wichita-falls/lakes', 'Lakes Near Wichita Falls, Texas'],
  ['metro-texarkana-weekend-trips', '/explore/near/texarkana/weekend-trips', 'Weekend Trips From Texarkana, Texas'],
  ['metro-victoria-historic-sites', '/explore/near/victoria/historic-sites', 'Historic Sites Near Victoria, Texas'],
  ['metro-distance-methodology', '/explore/near/houston/weekend-trips', 'approximate straight-line distance'],
  ['metro-distance-schema', '/explore/near/houston/weekend-trips', 'Approximate straight-line distance from metro center'],
  ['metro-drive-time-disclaimer', '/explore/near/houston/weekend-trips', 'Actual road mileage and drive time vary.'],
  ['metro-explore-sitemap', '/sitemap-explore.xml', '/explore/near/'],
  ['flat-creek-estate-destination', '/destination/flat-creek-estate', 'Flat Creek Estate'],
  ['flat-creek-estate-ai-disclosure', '/destination/flat-creek-estate', 'AI editorial illustration'],
  ['flat-creek-estate-official-link', '/destination/flat-creek-estate', 'https://flatcreekestate.com/'],
  ['flat-creek-estate-canonical', '/destination/flat-creek-estate', 'https://texasdefined.com/destination/flat-creek-estate'],
  ['homepage', '/', 'Texas Defined'],
  ['sitemap', '/sitemap.xml', '<urlset'],
  ['explore-search', '/explore/search', 'Search the Texas Travel Guide'],
  ['trip-planner', '/explore/trip-planner', 'Texas Trip Planner'],
  ['fishing-finder', '/fishing/plan', 'Use my location'],
  ['fishing-finder-filters', '/fishing/plan', 'More filters'],
  ['fishing-finder-map-distance', '/fishing/plan?lat=29.76&lng=-95.37&origin=Houston&sort=closest&view=map', 'Map of matching Texas fishing lakes'],
  ['crankbaits-detail-route', '/fishing/techniques/crankbaits', 'How to Fish Crankbaits in Texas'],
  ['crankbaits-hero-image', '/fishing/techniques/crankbaits', '/images/fishing/crankbaits-hero.avif'],
  ['crankbaits-depth-image', '/fishing/techniques/crankbaits', '/images/fishing/crankbait-types-depth-cover.avif'],
  ['soft-plastics-detail-route', '/fishing/techniques/soft-plastics', 'How to Fish Soft Plastics in Texas'],
  ['soft-plastics-related-techniques', '/fishing/techniques/soft-plastics', 'Related Fishing Techniques'],
  ['soft-plastics-related-crankbaits-link', '/fishing/techniques/soft-plastics', '/fishing/techniques/crankbaits'],
  ['soft-plastics-structure-link', '/fishing/techniques/soft-plastics', '/fishing/structure'],
  ['soft-plastics-vegetation-link', '/fishing/techniques/soft-plastics', '/fishing/vegetation'],
  ['soft-plastics-rigging-section', '/fishing/techniques/soft-plastics', 'Rigging at a glance'],
  ['soft-plastics-texas-rig-image', '/fishing/techniques/soft-plastics', '/images/fishing/rigs/texas-rig.svg'],
  ['soft-plastics-carolina-rig-image', '/fishing/techniques/soft-plastics', '/images/fishing/rigs/carolina-rig.svg'],
  ['soft-plastics-drop-shot-image', '/fishing/techniques/soft-plastics', '/images/fishing/rigs/drop-shot.svg'],
  ['soft-plastics-wacky-rig-image', '/fishing/techniques/soft-plastics', '/images/fishing/rigs/wacky-rig.svg'],
  ['fishing-structure-guide', '/fishing/structure', 'Fishing Structure and Cover in Texas Lakes'],
  ['fishing-vegetation-guide', '/fishing/vegetation', 'Fishing Aquatic Vegetation in Texas'],
  ['spinnerbaits-detail-route', '/fishing/techniques/spinnerbaits', 'How to Fish Spinnerbaits in Texas'],
  ['topwater-detail-route', '/fishing/techniques/topwater', 'How to Fish Topwater in Texas'],
  ['trolling-detail-route', '/fishing/techniques/trolling', 'How to Fish Trolling in Texas'],
  ['vertical-jigging-detail-route', '/fishing/techniques/vertical-jigging', 'How to Fish Vertical Jigging in Texas'],
  ['jigs-and-minnows-detail-route', '/fishing/techniques/jigs-and-minnows', 'How to Fish Jigs and Minnows in Texas'],
  ['live-bait-detail-route', '/fishing/techniques/live-bait', 'How to Fish Live Bait in Texas'],
  ['cut-bait-detail-route', '/fishing/techniques/cut-bait', 'How to Fish Cut Bait in Texas'],
  ['camping-guide', '/best-places-to-go-camping-in-texas', 'Best Places to Go Camping in Texas'],
  ['camping-guide-direct-filters', '/best-places-to-go-camping-in-texas', 'Electric service'],
  ['camping-guide-wave8', '/best-places-to-go-camping-in-texas', 'Cedar Hill State Park'],
  ['caverns-count', '/explore/caverns', '11 places are currently mapped'],
  ['caverns-sonora', '/explore/caverns', 'Caverns of Sonora'],
  ['caverns-cascade', '/explore/caverns', 'Cascade Caverns'],
  ['caverns-no-name', '/explore/caverns', 'Cave Without a Name'],
  ['caverns-devils-sinkhole', '/explore/caverns', "Devil's Sinkhole State Natural Area"],
  ['salary-calculator', '/texas-salary-calculator', 'Texas paycheck and salary calculator'],
  ['home-insurance-calculator', '/texas-home-insurance-calculator', 'Homeowners insurance calculator without personal information'],
  ['moving-pillar', '/article/moving-to-texas-what-nobody-tells-you', 'The quick answer: what should you know before moving to Texas?'],
  ['relocation-data-center', '/moving-to-texas/data', 'The data behind a move to Texas'],
  ['relocation-city-comparison', '/browse/cities', 'The Texas city directory'],
  ['flag-history', '/article/history-of-the-texas-flag', 'The Texas Flag: A History of the Lone Star'],
  ['flag-etiquette', '/article/texas-flag-etiquette-display-guide', 'Texas Flag Etiquette: How to Display the Lone Star Flag Correctly'],
  ['texas-symbols', '/texas-symbols', 'Official Texas Symbols'],
  ['bluebonnet-authority', '/article/texas-bluebonnets-complete-guide', 'Bluebonnet Season, Explained'],
  ['christmas-authority', '/article/christmas-in-texas-complete-guide', 'Christmas in Texas, From River Lights to Courthouse Squares'],
  ['fall-authority', '/article/fall-in-texas-complete-guide', 'Where Autumn Actually Shows Up in Texas'],
  ['wildfire-homes-property-byline', '/article/texas-wildfire-home-protection-guide', 'Texas Defined Homes & Property Desk'],
  ['wildfire-homes-property-schema', '/article/texas-wildfire-home-protection-guide', 'https://texasdefined.com/authors/a-homes-land#desk'],
  ['homes-property-desk-profile', '/authors/a-homes-land', 'not a substitute for licensed legal, insurance, engineering or trade advice'],
  ['painted-churches', '/explore/painted-churches', 'Painted Churches of Texas'],
  ['painted-churches-authority-round-2', '/explore/painted-churches', 'A second 15-source research pass adds community, architectural and preservation evidence.'],
  ['painted-churches-authority-review-date', '/explore/painted-churches', 'Core church census and authority research reviewed September 25, 2026.'],
  ['painted-churches-round2-lacoste', '/explore/painted-churches/lacoste-our-lady-of-grace', 'Documented decoration campaign'],
  ['painted-churches-round2-panna-maria', '/explore/painted-churches/panna-maria-immaculate-conception', '12,000-piece mosaic of the Virgin of Częstochowa'],
  ['painted-churches-round2-serbin', '/explore/painted-churches/serbin-st-paul-lutheran-church', 'Colony land purchase'],
  ['painted-churches-round2-amarillo', '/explore/painted-churches/amarillo-first-baptist-church', 'September 1889 with sixteen charter members'],
  ['painted-churches-round2-high-hill', '/explore/painted-churches/high-hill-nativity-of-mary', 'High Hill developed from the late-1840s German settlements of Blum Hill and Oldenburg'],
  ['painted-churches-round2-dubina', '/explore/painted-churches/dubina-saints-cyril-methodius', 'Carpenter Gothic basilican three-aisle plan'],
  ['painted-churches-round2-lindsay', '/explore/painted-churches/lindsay-st-peters-catholic-church', 'City of Lindsay visitor information says St. Peter has undergone two restorations'],
  ['painted-churches-round2-bandera', '/explore/painted-churches/bandera-st-stanislaus-catholic-church', 'sixteen Polish families arriving in 1855 to work at the cypress mill'],
  ['painted-churches-map', '/explore/painted-churches/map', 'Painted Churches of Texas map and statewide locations.'],
  ['painted-churches-planner', '/explore/painted-churches-plan', 'Painted Churches of Texas: one-day Schulenburg route.'],
  ['painted-churches-count', '/explore/painted-churches/how-many', 'How many Painted Churches are there in Texas?'],
  ['painted-churches-schulenburg', '/explore/painted-churches/guides/schulenburg-texas', 'Schulenburg, Texas Painted Churches: The Complete Visitor Guide'],
  ['then-and-now', '/explore/painted-churches/then-and-now', 'Texas Painted Churches visual history'],
  ['media', '/explore/painted-churches/media', 'Texas Painted Churches multimedia research library'],
  ['guidebook', '/guides', 'Painted Churches of Texas'],
  ['historic-sites', '/explore/historic-sites', 'Painted Churches of Texas'],
  ['road-trips', '/explore/road-trips', 'Painted Churches routes'],
  ['small-towns', '/explore/small-towns', 'Painted Churches'],
  ['spanish-texas', '/article/spanish-texas-military-battle-medina', 'Battle of Medina: The Bloodiest Battle Fought on Texas Soil'],
  ['mexican-texas', '/article/mexican-texas-military-history', 'Military in Mexican Texas'],
  ['buffalo-soldiers', '/article/buffalo-soldiers-texas-frontier-guide', 'Buffalo Soldiers in Texas'],
  ['red-river-war', '/article/texas-red-river-war-guide', 'The Red River War in Texas'],
  ['spanish-american-war', '/article/texas-spanish-american-war-guide', 'Texas and the Spanish-American War'],
  ['world-war-i', '/article/texas-world-war-i-history-guide', 'Texas in World War I'],
  ['republic-navy', '/article/republic-of-texas-navy-history', 'The Republic of Texas Navy'],
  ['cold-war', '/article/texas-cold-war-military-history', 'Cold War Texas'],
  ['recent-wars', '/article/texas-recent-wars-military-history', 'Texas in Recent Wars'],
  ['national-cemeteries-guide', '/article/texas-national-cemeteries-guide', 'Texas National Cemeteries'],
  ['fort-sam-houston-national-cemetery', '/destination/fort-sam-houston-national-cemetery', 'Fort Sam Houston National Cemetery'],
  ['houston-national-cemetery', '/destination/houston-national-cemetery', 'Houston National Cemetery'],
  ['dallas-fort-worth-national-cemetery', '/destination/dallas-fort-worth-national-cemetery', 'Dallas-Fort Worth National Cemetery'],
  ['state-fair-current-date', '/texas-state-fair', 'September 25, 2026'],
  ['state-fair-planning-strip', '/texas-state-fair', 'Tickets, football and a place to stay'],
  ['state-fair-featured-gallery', '/texas-state-fair', 'State Fair photo carousel'],
  ['state-fair-full-gallery', '/texas-state-fair', 'View the full 31-photo historical State Fair gallery'],
  ['state-fair-hours-section', '/texas-state-fair', '2026 dates, hours and Fair Park location'],
  ['state-fair-coupons-section', '/texas-state-fair', 'How Food & Midway Coupons work'],
  ['state-fair-ticket-section', '/texas-state-fair', '2026 ticket prices and admission'],
  ['texas-history-military', '/texas-history', 'Military in Mexican Texas'],
  ['ima-hogg-authority', '/article/ima-hogg-texas-legacy', 'Ima Hogg: The Texas Patron Who Turned Family Wealth Into Public Institutions'],
  ['hogg-family-authority', '/article/hogg-family-texas-legacy', 'The Hogg Family in Texas: Politics, Oil, Philanthropy and Preservation'],
  ['texas-history-hogg-family-discovery', '/texas-history', 'The Hogg family in Texas'],
  ['texas-history-ima-hogg-discovery', '/texas-history', 'Follow the Houston patron who helped build the symphony, the Hogg Foundation, Bayou Bend and a statewide preservation legacy.'],
  ['will-hogg-authority', '/article/will-hogg-texas-legacy', 'Will Hogg: The Businessman, Civic Planner and Philanthropist Behind a Texas Family Legacy'],
  ['bayou-bend-hogg-legacy', '/destination/bayou-bend-collection-gardens', 'Bayou Bend Collection and Gardens'],
  ['winedale-hogg-legacy', '/destination/winedale-historical-center', 'The University of Texas historic site near Round Top preserves ten nineteenth-century wooden structures'],
  ['texas-history-will-hogg-discovery', '/texas-history', 'Trace the Hogg sibling who connected oil-era business, River Oaks, university advocacy, arts patronage and the estate that helped create the Hogg Foundation.'],
  ['hogg-foundation-authority', '/article/hogg-foundation-mental-health-texas-history', 'The Hogg Foundation for Mental Health: How a Texas Family Endowment Became a Statewide Institution'],
  ['texas-history-hogg-foundation-discovery', '/texas-history', 'Philanthropy · institutions · public health'],
  ['texas-before-us-authority', '/article/texas-before-united-states-how-texas-began', 'Texas Before the United States: How Texas Began'],
  ['texas-history-origins-discovery', '/texas-history', 'Texas before the United States: how Texas began'],
  ['texas-before-us-sitemap', '/sitemap.xml', '/article/texas-before-united-states-how-texas-began'],
  ['texas-before-us-source-panel', '/article/texas-before-united-states-how-texas-began', 'Sources and further reading'],
  ['texas-before-us-statehood-source', '/article/texas-before-united-states-how-texas-began', 'Texas State Library and Archives Commission — Statehood'],
  ['indigenous-texas-authority', '/article/indigenous-texas-history-native-nations', 'Indigenous Texas History: Native Nations Before European Colonization'],
  ['texas-history-indigenous-discovery', '/texas-history', 'Indigenous Texas: Native nations before European colonization'],
  ['indigenous-texas-sitemap', '/sitemap.xml', '/article/indigenous-texas-history-native-nations'],
  ['indigenous-texas-source-panel', '/article/indigenous-texas-history-native-nations', 'Sources and further reading'],
  ['indigenous-texas-tribal-source', '/article/indigenous-texas-history-native-nations', 'Kickapoo Traditional Tribe of Texas'],
  ['james-hogg-related-reading', '/texas-icons/james-hogg', 'Continue the story'],
  ['james-hogg-foundation-link', '/texas-icons/james-hogg', '/article/hogg-foundation-mental-health-texas-history'],
  ['sallie-hogg-authority', '/article/sallie-hogg-texas-legacy', 'The Texas First Lady Who Shaped the Hogg Family'],
  ['quitman-hogg-heritage', '/destination/governor-jim-hogg-city-park-quitman', 'Governor Jim Hogg City Park'],
  ['texas-history-sallie-hogg-discovery', '/texas-history', 'Family · first lady · public service'],
  ['james-hogg-sallie-link', '/texas-icons/james-hogg', '/article/sallie-hogg-texas-legacy'],
  ['james-hogg-quitman-link', '/texas-icons/james-hogg', '/destination/governor-jim-hogg-city-park-quitman'],
  ['hogg-rusk-birthplace', '/destination/jim-hogg-park-rusk', "Ima Hogg, Thomas E. 'Tom' Hogg and Michael 'Mike' Hogg presented the family property"],
  ['hogg-family-mike-tom', '/article/hogg-family-texas-legacy', 'Mike and Tom carried parts of the family legacy in quieter ways'],
  ['james-hogg-rusk-link', '/texas-icons/james-hogg', '/destination/jim-hogg-park-rusk'],
  ['river-oaks-hogg-planning-authority', '/article/river-oaks-hogg-brothers-houston-planning-history', 'River Oaks, the Hogg Brothers and the Making of Planned Houston'],
  ['texas-history-river-oaks-discovery', '/texas-history', 'Planning · architecture · exclusion'],
  ['hogg-building-houston', '/destination/hogg-building-houston', 'National Register of Historic Places and Recorded Texas Historic Landmark'],
  ['will-hogg-river-oaks-link', '/article/will-hogg-texas-legacy', '/article/river-oaks-hogg-brothers-houston-planning-history'],
  ['hogg-family-heritage-trail', '/article/hogg-family-heritage-trail-texas', 'Hogg Family Heritage Trail: Six Texas Places That Tell the Story'],
  ['oakwood-hogg-heritage', '/destination/oakwood-cemetery-austin', "Austin's oldest municipal burial ground contains the Hogg family plot"],
  ['texas-history-hogg-heritage-trail-discovery', '/texas-history', 'Connect six surviving places from James Hogg'],
  ['hogg-family-sitemap', '/sitemap.xml', '/article/hogg-family-texas-legacy'],
  ['sallie-hogg-sitemap', '/sitemap.xml', '/article/sallie-hogg-texas-legacy'],
  ['ima-hogg-sitemap', '/sitemap.xml', '/article/ima-hogg-texas-legacy'],
  ['will-hogg-sitemap', '/sitemap.xml', '/article/will-hogg-texas-legacy'],
  ['hogg-foundation-sitemap', '/sitemap.xml', '/article/hogg-foundation-mental-health-texas-history'],
  ['hogg-heritage-trail-sitemap', '/sitemap.xml', '/article/hogg-family-heritage-trail-texas'],
];

const canonicalHomepageRequiredNeedles = [
  'Texas Defined',
  'Featured this month on Texas Defined',
  'This month’s featured story is',
  'New from Texas Defined',
];
const canonicalHomepageForbiddenNeedles = [
  'The Places We Trust for Texas Fall Color',
  'The Texas Defined Letter isn’t taking new names just yet.',
  'Road Trip Fuel & Time Planner',
];

function appendSummary(text) {
  if (summaryPath) appendFileSync(summaryPath, text);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function verifyRevisionBoundSurface(label, path, needle) {
  let lastStatus = 'network-error';
  let lastBody = '';
  let lastError = '';
  let lastChallenge = false;
  let passed = false;
  let attempts = 0;

  for (let attempt = 1; attempt <= 6; attempt += 1) {
    attempts = attempt;
    const separator = path.includes('?') ? '&' : '?';
    const url = `${origin}${path}${separator}verify=${encodeURIComponent(`${sha}-${runId}-${attempt}`)}`;
    console.log(`[${label}] attempt ${attempt}: ${url}`);

    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: {
          'user-agent': 'TexasDefined-CI-Production-Smoke/1.0',
          'cache-control': 'no-cache',
          pragma: 'no-cache',
        },
      });
      lastStatus = String(response.status);
      lastChallenge = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
      const cacheStatus = response.headers.get('cf-cache-status') || 'missing';
      const age = response.headers.get('age') || 'missing';
      const cacheControl = response.headers.get('cache-control') || 'missing';
      console.log(`[${label}] edge cache: cf-cache-status=${cacheStatus}; age=${age}; cache-control=${cacheControl}`);
      lastBody = await response.text();
      lastError = '';

      if (lastChallenge) {
        console.log(`[${label}] Cloudflare returned cf-mitigated: challenge; waiting for the edge to become healthy.`);
      } else if (response.ok && matchesExpectedSurface(lastBody, needle)) {
        console.log(`[${label}] verified (${response.status}): ${needle}`);
        passed = true;
        break;
      } else {
        console.log(response.ok
          ? `[${label}] HTTP ${response.status}, but expected content is not live yet: ${needle}`
          : `[${label}] HTTP ${response.status}; waiting for production to become healthy.`);
      }
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
      lastStatus = 'network-error';
      lastChallenge = false;
      console.log(`[${label}] request failed: ${lastError}`);
    }

    if (attempt < 6) await sleep(5_000);
  }

  appendSummary(`| ${passed ? '✅ pass' : '❌ FAIL'} | ${label} | ${lastStatus} | ${attempts} | ${lastChallenge ? 'yes' : 'no'} |\n`);

  if (!passed) {
    const reason = lastError
      || (lastChallenge ? 'Cloudflare returned cf-mitigated: challenge' : '')
      || (lastStatus !== '200' ? `HTTP ${lastStatus}` : `expected text not found: ${needle}`);
    console.error(`::error title=LIVE PRODUCTION failure::${label} failed after ${attempts} attempts — ${reason}`);
    appendSummary(`\n**Failure class:** \`LIVE PRODUCTION\`  \n**Surface:** \`${origin}${path}\`  \n**Last HTTP result:** \`${lastStatus}\`  \n**Cloudflare challenge:** \`${lastChallenge ? 'yes' : 'no'}\`  \n**Expected text:** \`${needle}\`  \n**Reason:** ${reason}\n`);
    if (lastBody) console.error(`[${label}] response sample: ${lastBody.slice(0, 1200).replace(/\s+/g, ' ')}`);
    process.exit(1);
  }
}

appendSummary('## Production surface verification\n\n');
appendSummary('| Result | Surface | HTTP | Attempts | Cloudflare challenge |\n|---|---|---:|---:|---|\n');

for (const [label, path, needle] of surfaces) {
  await verifyRevisionBoundSurface(label, path, needle);
}

let canonicalHomepagePassed = false;
let canonicalHomepageStatus = 'network-error';
let canonicalHomepageBody = '';
let canonicalHomepageError = '';
let canonicalHomepageChallenge = false;
let canonicalHomepageAttempts = 0;
let canonicalHomepageMissing = [];
let canonicalHomepageForbidden = [];

for (let attempt = 1; attempt <= 6; attempt += 1) {
  canonicalHomepageAttempts = attempt;
  console.log(`[homepage-canonical] attempt ${attempt}: ${origin}/`);
  try {
    const response = await fetch(`${origin}/`, {
      redirect: 'follow',
      signal: AbortSignal.timeout(30_000),
      headers: { 'user-agent': 'TexasDefined-CI-Production-Smoke/1.0' },
    });
    canonicalHomepageStatus = String(response.status);
    canonicalHomepageChallenge = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
    canonicalHomepageBody = await response.text();
    canonicalHomepageError = '';
    canonicalHomepageMissing = canonicalHomepageRequiredNeedles.filter((needle) => !canonicalHomepageBody.includes(needle));
    canonicalHomepageForbidden = canonicalHomepageForbiddenNeedles.filter((needle) => canonicalHomepageBody.includes(needle));

    if (!canonicalHomepageChallenge && response.ok && canonicalHomepageMissing.length === 0 && canonicalHomepageForbidden.length === 0) {
      console.log('[homepage-canonical] canonical homepage is current and contains no retired/dead-end content.');
      canonicalHomepagePassed = true;
      break;
    }

    if (canonicalHomepageForbidden.length > 0) {
      console.log(`[homepage-canonical] stale/retired content still present: ${canonicalHomepageForbidden.join(' | ')}`);
    } else if (canonicalHomepageMissing.length > 0) {
      console.log(`[homepage-canonical] required content missing: ${canonicalHomepageMissing.join(' | ')}`);
    } else if (canonicalHomepageChallenge) {
      console.log('[homepage-canonical] Cloudflare returned cf-mitigated: challenge; waiting for the edge to become healthy.');
    } else {
      console.log(`[homepage-canonical] HTTP ${canonicalHomepageStatus}; waiting for the canonical homepage to become healthy.`);
    }
  } catch (error) {
    canonicalHomepageError = error instanceof Error ? error.message : String(error);
    canonicalHomepageStatus = 'network-error';
    canonicalHomepageChallenge = false;
    console.log(`[homepage-canonical] request failed: ${canonicalHomepageError}`);
  }

  if (attempt < 6) await sleep(5_000);
}

appendSummary(`| ${canonicalHomepagePassed ? '✅ pass' : '❌ FAIL'} | homepage-canonical | ${canonicalHomepageStatus} | ${canonicalHomepageAttempts} | ${canonicalHomepageChallenge ? 'yes' : 'no'} |\n`);

if (!canonicalHomepagePassed) {
  const reason = canonicalHomepageError
    || (canonicalHomepageChallenge ? 'Cloudflare returned cf-mitigated: challenge' : '')
    || (canonicalHomepageForbidden.length > 0 ? `retired/dead-end text still served: ${canonicalHomepageForbidden.join(' | ')}` : '')
    || (canonicalHomepageMissing.length > 0 ? `required text missing: ${canonicalHomepageMissing.join(' | ')}` : '')
    || `HTTP ${canonicalHomepageStatus}`;
  console.error(`::error title=LIVE PRODUCTION failure::canonical homepage failed after ${canonicalHomepageAttempts} attempts — ${reason}`);
  appendSummary(`\n**Failure class:** \`LIVE PRODUCTION\`  \n**Surface:** \`${origin}/\`  \n**Last HTTP result:** \`${canonicalHomepageStatus}\`  \n**Cloudflare challenge:** \`${canonicalHomepageChallenge ? 'yes' : 'no'}\`  \n**Reason:** ${reason}\n`);
  if (canonicalHomepageBody) console.error(`[homepage-canonical] response sample: ${canonicalHomepageBody.slice(0, 1600).replace(/\s+/g, ' ')}`);
  process.exit(1);
}

appendSummary(`\nAll ${surfaces.length} revision-bound production surfaces plus the canonical homepage passed without a Cloudflare challenge.\n`);
console.log(`TexasDefined production verification passed (${surfaces.length} revision-bound surfaces plus canonical homepage, no cf-mitigated challenges).`);

await import('./verify-texas-industries-production.mjs');
await import('./verify-gaming-production.mjs');
await import('./verify-hurst-whirlyball-production.mjs');
await import('./verify-viator-production.mjs');