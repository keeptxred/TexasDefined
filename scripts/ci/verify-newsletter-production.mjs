const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const userAgent = 'TexasDefined-CI-Newsletter-Smoke/1.0';

const response = await fetch(origin, {
  redirect: 'follow',
  cache: 'no-store',
  signal: AbortSignal.timeout(30_000),
  headers: { 'user-agent': userAgent },
});
const body = await response.text();

if (!response.ok) throw new Error(`TexasDefined home returned HTTP ${response.status}`);
if (!body.includes('The Texas Defined Letter')) throw new Error('newsletter eyebrow is missing from production HTML');
if (!body.includes('Texas, delivered once a week')) throw new Error('newsletter heading is missing from production HTML');
if (!body.includes('Unsubscribe anytime')) throw new Error('newsletter unsubscribe disclosure is missing from production HTML');
if (!body.includes('/privacy')) throw new Error('newsletter privacy link is missing from production HTML');

console.log('Texas Defined newsletter production smoke passed: sitewide signup surface is rendered with cadence, unsubscribe, and privacy disclosure.');
