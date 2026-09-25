const token = process.env.CLOUDFLARE_CACHE_API_TOKEN?.trim();
const zoneName = (process.env.CLOUDFLARE_ZONE_NAME || 'texasdefined.com').trim();
const rawUrls = process.env.CLOUDFLARE_PURGE_URLS || '';

if (!token) {
  throw new Error('CLOUDFLARE_CACHE_API_TOKEN is required for targeted cache purge.');
}

const urls = [...new Set(
  rawUrls
    .split(/[\n,]+/)
    .map((value) => value.trim())
    .filter(Boolean),
)];

if (urls.length === 0) {
  throw new Error('CLOUDFLARE_PURGE_URLS must contain at least one URL.');
}

for (const value of urls) {
  const parsed = new URL(value);
  if (parsed.protocol !== 'https:' || parsed.hostname !== zoneName) {
    throw new Error(`Refusing to purge URL outside https://${zoneName}: ${value}`);
  }
}

const headers = {
  authorization: `Bearer ${token}`,
  'content-type': 'application/json',
};

const zonesResponse = await fetch(
  `https://api.cloudflare.com/client/v4/zones?name=${encodeURIComponent(zoneName)}&status=active&per_page=50`,
  { headers, signal: AbortSignal.timeout(20_000) },
);
const zonesPayload = await zonesResponse.json();

if (!zonesResponse.ok || zonesPayload?.success !== true) {
  throw new Error(`Cloudflare zone lookup failed with HTTP ${zonesResponse.status}.`);
}

const zones = Array.isArray(zonesPayload.result) ? zonesPayload.result : [];
const exactZone = zones.find((zone) => zone?.name === zoneName);
if (!exactZone?.id) {
  throw new Error(`Active Cloudflare zone not found for ${zoneName}.`);
}

const purgeResponse = await fetch(
  `https://api.cloudflare.com/client/v4/zones/${exactZone.id}/purge_cache`,
  {
    method: 'POST',
    headers,
    body: JSON.stringify({ files: urls }),
    signal: AbortSignal.timeout(20_000),
  },
);
const purgePayload = await purgeResponse.json();

if (!purgeResponse.ok || purgePayload?.success !== true) {
  const messages = [
    ...(Array.isArray(purgePayload?.errors) ? purgePayload.errors : []),
    ...(Array.isArray(purgePayload?.messages) ? purgePayload.messages : []),
  ]
    .map((item) => item?.message)
    .filter(Boolean)
    .join(' | ');
  throw new Error(
    `Cloudflare targeted purge failed with HTTP ${purgeResponse.status}${messages ? `: ${messages}` : ''}.`,
  );
}

console.log(`Cloudflare accepted targeted purge for ${urls.length} URL(s) in ${zoneName}.`);
for (const url of urls) console.log(`- ${url}`);
