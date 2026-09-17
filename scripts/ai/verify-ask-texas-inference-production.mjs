const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const question = process.env.ASK_TEXAS_PROBE_QUESTION ?? 'Is SH 130 closed right now near Seguin?';

const endpoint = new URL('/api/texas-defined-ai', origin);
console.log(`[ask-texas-inference] probing ${endpoint.origin}${endpoint.pathname}`);
console.log(`[ask-texas-inference] question: ${question}`);

let response;
try {
  response = await fetch(endpoint, {
    method: 'POST',
    redirect: 'manual',
    cache: 'no-store',
    signal: AbortSignal.timeout(60_000),
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      origin,
      'sec-fetch-site': 'same-origin',
      'user-agent': 'TexasDefined-Manual-Inference-QA/1.0',
    },
    body: JSON.stringify({ question }),
  });
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`::error title=ASK TEXAS inference probe network failure::${message}`);
  process.exit(1);
}

const raw = await response.text();
let payload = null;
try {
  payload = JSON.parse(raw);
} catch {
  payload = null;
}

if (!response.ok) {
  const detail = payload && typeof payload.error === 'string' ? payload.error : raw.slice(0, 500);
  console.error(`::error title=ASK TEXAS inference probe HTTP failure::HTTP ${response.status}: ${detail}`);
  process.exit(1);
}

if (!payload || typeof payload !== 'object') {
  console.error('::error title=ASK TEXAS inference probe invalid payload::Expected a JSON object.');
  process.exit(1);
}

const answer = typeof payload.answer === 'string' ? payload.answer.trim() : '';
const officialSources = Array.isArray(payload.officialSources) ? payload.officialSources : [];
const validOfficialSources = officialSources.filter((source) => {
  if (!source || typeof source !== 'object') return false;
  if (typeof source.authority !== 'string' || !source.authority.trim()) return false;
  if (typeof source.url !== 'string') return false;
  try {
    return new URL(source.url).protocol === 'https:';
  } catch {
    return false;
  }
});
const txdotSource = validOfficialSources.find((source) => /Texas Department of Transportation/i.test(source.authority));

const failures = [];
if (!answer) failures.push('answer is empty');
if (!answer.includes('[O1]')) failures.push('answer does not cite the first live official source as [O1]');
if (validOfficialSources.length === 0) failures.push('officialSources does not contain a valid HTTPS official source');
if (!txdotSource) failures.push('officialSources does not include Texas Department of Transportation for the SH 130 freshness probe');

if (failures.length) {
  console.error('::error title=ASK TEXAS inference probe grounding failure::The live answer did not satisfy the freshness/official-source contract.');
  for (const failure of failures) console.error(`- ${failure}`);
  console.error(`[ask-texas-inference] answer sample: ${answer.slice(0, 800).replace(/\s+/g, ' ')}`);
  console.error(`[ask-texas-inference] official source count: ${validOfficialSources.length}`);
  process.exit(1);
}

console.log(`[ask-texas-inference] HTTP ${response.status}; answer length=${answer.length}; officialSources=${validOfficialSources.length}`);
console.log(`[ask-texas-inference] TxDOT source: ${txdotSource.title ?? txdotSource.authority} — ${txdotSource.url}`);
console.log(`[ask-texas-inference] answer sample: ${answer.slice(0, 800).replace(/\s+/g, ' ')}`);
console.log('Ask Texas manual inference verification passed: explicit freshness intent produced a live answer with [O1] and a governed TxDOT official source.');
