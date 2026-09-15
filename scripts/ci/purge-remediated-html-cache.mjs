const token = process.env.CLOUDFLARE_CACHE_API_TOKEN?.trim();
const zoneName = (process.env.CLOUDFLARE_ZONE_NAME || "texasdefined.com").trim();
const origin = `https://${zoneName}`;

const paths = [
  "/article/bluebonnets-near-austin",
  "/article/bluebonnets-near-houston",
  "/article/bluebonnets-near-dallas-fort-worth",
  "/article/bluebonnets-near-san-antonio",
  "/article/texas-bluebonnet-festivals",
  "/article/is-it-illegal-to-pick-bluebonnets-in-texas",
  "/article/best-christmas-lights-in-texas",
  "/article/texas-christmas-train-rides",
  "/article/free-christmas-events-in-texas",
  "/article/east-texas-fall-colors",
  "/article/hill-country-fall-colors",
  "/article/best-texas-state-parks-for-fall-colors",
  "/article/friday-night-and-the-texas-town",
  "/article/moving-to-texas-what-nobody-tells-you",
  "/article/moving-to-houston-address-checklist",
];

if (!token) {
  console.warn("::warning title=Cloudflare cache purge skipped::No CLOUDFLARE_CACHE_API_TOKEN is available. Clean canonical production verification remains fail-closed and will catch stale HTML.");
  process.exit(0);
}

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

async function cloudflareJson(url, init = {}) {
  const response = await fetch(url, { ...init, headers: { ...headers, ...(init.headers || {}) } });
  const body = await response.json().catch(() => null);
  if (!response.ok || body?.success === false) {
    const errors = Array.isArray(body?.errors) ? JSON.stringify(body.errors) : `HTTP ${response.status}`;
    throw new Error(errors);
  }
  return body;
}

try {
  const zones = await cloudflareJson(`https://api.cloudflare.com/client/v4/zones?name=${encodeURIComponent(zoneName)}&status=active&per_page=5`);
  const zone = zones?.result?.find((item) => item?.name === zoneName) ?? zones?.result?.[0];
  if (!zone?.id) throw new Error(`No active Cloudflare zone found for ${zoneName}`);

  const files = paths.map((path) => `${origin}${path}`);
  await cloudflareJson(`https://api.cloudflare.com/client/v4/zones/${zone.id}/purge_cache`, {
    method: "POST",
    body: JSON.stringify({ files }),
  });
  console.log(`Purged ${files.length} remediated canonical article URLs from Cloudflare edge cache.`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.warn(`::warning title=Cloudflare cache purge unavailable::${message}. Clean canonical production verification remains fail-closed and will determine whether deployment is safe.`);
}
