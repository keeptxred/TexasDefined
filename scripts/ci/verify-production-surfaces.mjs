import { appendFileSync } from 'node:fs';

const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();
const summaryPath = process.env.GITHUB_STEP_SUMMARY;

const surfaces = [
  ['homepage', '/', 'Texas Defined'],
  ['moving-pillar', '/article/moving-to-texas-what-nobody-tells-you', 'The quick answer: what should you know before moving to Texas?'],
  ['flag-history', '/article/history-of-the-texas-flag', 'The Texas Flag: A History of the Lone Star'],
  ['flag-etiquette', '/article/texas-flag-etiquette-display-guide', 'Texas Flag Etiquette: How to Display the Lone Star Flag Correctly'],
  ['texas-symbols', '/texas-symbols', 'Official Texas Symbols'],
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
  ['texas-history-military', '/texas-history', 'Military in Mexican Texas'],
];

function appendSummary(text) {
  if (summaryPath) appendFileSync(summaryPath, text);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

appendSummary('## Production surface verification\n\n');
appendSummary('| Result | Surface | HTTP | Attempts |\n|---|---|---:|---:|\n');

for (const [label, path, needle] of surfaces) {
  let lastStatus = 'network-error';
  let lastBody = '';
  let lastError = '';
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
      lastBody = await response.text();
      lastError = '';

      if (response.ok && lastBody.includes(needle)) {
        console.log(`[${label}] verified (${response.status}): ${needle}`);
        passed = true;
        break;
      }

      console.log(response.ok
        ? `[${label}] HTTP ${response.status}, but expected content is not live yet: ${needle}`
        : `[${label}] HTTP ${response.status}; waiting for production to become healthy.`);
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
      lastStatus = 'network-error';
      console.log(`[${label}] request failed: ${lastError}`);
    }

    if (attempt < 6) await sleep(5_000);
  }

  appendSummary(`| ${passed ? '✅ pass' : '❌ FAIL'} | ${label} | ${lastStatus} | ${attempts} |\n`);

  if (!passed) {
    const reason = lastError || (lastStatus !== '200' ? `HTTP ${lastStatus}` : `expected text not found: ${needle}`);
    console.error(`::error title=LIVE PRODUCTION failure::${label} failed after ${attempts} attempts — ${reason}`);
    appendSummary(`\n**Failure class:** \`LIVE PRODUCTION\`  \n**Surface:** \`${origin}${path}\`  \n**Last HTTP result:** \`${lastStatus}\`  \n**Expected text:** \`${needle}\`  \n**Reason:** ${reason}\n`);
    if (lastBody) console.error(`[${label}] response sample: ${lastBody.slice(0, 1200).replace(/\s+/g, ' ')}`);
    process.exit(1);
  }
}

appendSummary(`\nAll ${surfaces.length} production surfaces passed.\n`);
console.log(`TexasDefined production verification passed (${surfaces.length} surfaces).`);
