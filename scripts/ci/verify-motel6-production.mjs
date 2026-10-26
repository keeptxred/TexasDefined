// Lightweight always-on Motel 6 canary for the one approved post-deployment
// subscriber. This is deliberately NOT another broad live site audit.
const origin = process.env.MOTEL6_PRODUCTION_ORIGIN || 'https://texasdefined.com';
const revision = process.env.GITHUB_SHA || 'local';
const runId = process.env.GITHUB_RUN_ID || 'manual';

async function read(path, bust = false) {
  const url = new URL(path, origin);
  if (bust) url.searchParams.set('td_motel6_production_check', revision + '-' + runId);
  let last;
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await fetch(url, {
        cache: 'no-store',
        redirect: 'follow',
        signal: AbortSignal.timeout(15000),
        headers: {
          'cache-control': 'no-cache',
          'user-agent': 'TexasDefined-CI-Motel6/1.0',
        },
      });
      if (response.ok && response.headers.get('cf-mitigated') !== 'challenge') {
        return await response.text();
      }
      last = new Error(path + ' failed: HTTP ' + response.status + ', challenge=' + response.headers.get('cf-mitigated'));
    } catch (error) {
      last = error;
    }
    if (attempt === 1) await new Promise(resolve => setTimeout(resolve, 1500));
  }
  throw last;
}

function mustContain(haystack, markers, context) {
  for (const marker of markers) {
    if (!haystack.includes(marker)) throw new Error(context + ' is missing: ' + marker);
  }
}

const scriptPath = '/stay-affiliate-options.js';
const footballPath = '/article/texas-high-school-football-playoffs-explained';
const script = await read(scriptPath, true);
mustContain(script, [
  'const CJ_PUBLISHER_ID = "101876465"',
  'const MOTEL6_STANDARD_AID = "17198227"',
  'function motel6Eligible(',
  'function createMotel6Link(',
  'dataLayer.push(detail)',
  'sponsored nofollow noopener noreferrer',
], 'Live Motel 6 static affiliate bootstrap');
if (script.includes('MOTEL6_HALLOWEEN_AID')) {
  mustContain(script, [
    'const MOTEL6_HALLOWEEN_AID = "17371482"',
    '2026-11-01T05:00:00Z',
    'function motel6CampaignActive(',
  ], 'Bounded Halloween campaign prior to source cleanup');
} else if (/17371482|Trip and Treat|MOTEL6_CAMPAIGN_/.test(script)) {
  throw new Error('Expired Motel 6 special left behind after source cleanup');
}


for (const bust of [false, true]) {
  const html = await read(footballPath, bust);
  mustContain(html, [
    'How Do the Texas High School Football Playoffs Work?',
    'Prefer a budget motel for the drive?',
    'data-commercial-partner="motel6"',
    'data-commercial-placement="football-budget-motel"',
    'https://www.tqlkg.com/click-101876465-17198227',
    'rel="sponsored nofollow noopener noreferrer"',
    'Affiliate disclosure: TexasDefined may earn a commission',
    '/stay-affiliate-options.js',
  ], 'Live football SSR' + (bust ? ' (cache-busted)' : ' (ordinary visitor URL)'));
  if (/<meta[^>]+name=["']robots["'][^>]+noindex\b/i.test(html)) {
    throw new Error('Football guide unexpectedly noindex');
  }
}
console.log('Motel 6 production canary PASS: account-bound evergreen and seasonal link contracts, conservative expiry, and ordinary/cache-busted football sponsored CTA are live.');
