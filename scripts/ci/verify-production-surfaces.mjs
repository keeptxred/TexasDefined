import { appendFileSync } from 'node:fs';

const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();
const summaryPath = process.env.GITHUB_STEP_SUMMARY;

const surfaces = [
  ['homepage', '/', 'Texas Defined'],
  ['sitemap', '/sitemap.xml', '<urlset'],
  ['explore-search', '/explore/search', 'Search the Texas Travel Guide'],
  ['trip-planner', '/explore/trip-planner', 'Texas Trip Planner'],
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
  ['then-and-now', '/explore/painted-churches/then-and-now', 'Texas Painted Churches visual history'],
  ['media', '/explore/painted-churches/media', 'Texas Painted Churches multimedia research library'],
  ['guidebook', '/guides', 'Painted Churches of Texas'],
  ['historic-sites', '/explore/historic-sites', 'Painted Churches of Texas'],
  ['road-trips', '/explore/road-trips', 'Painted Churches routes'],
  ['small-towns', '/explore/small-towns', 'Painted Churches'],
  ['spanish-texas', '/article/spanish-texas-military-battle-medina', 'Military Texas Before the Republic'],
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
  ['texas-history-military', '/texas-history', 'Military in Mexican Texas'],
];

const canonicalHomepageRequiredNeedles = ['Texas Defined', 'New from Texas Defined'];
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
    const url = `${origin}${path}?verify=${encodeURIComponent(`${sha}-${runId}-${attempt}`)}`;
    console.log(`[${label}] attempt ${attempt}: ${url}`);

    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: { 'user-agent': 'TexasDefined-CI-Production-Smoke/1.0' },
      });
      lastStatus = String(response.status);
      lastChallenge = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
      lastBody = await response.text();
      lastError = '';

      if (lastChallenge) {
        console.log(`[${label}] Cloudflare returned cf-mitigated: challenge; waiting for the edge to become healthy.`);
      } else if (response.ok && lastBody.includes(needle)) {
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

await import('./verify-viator-production.mjs');
