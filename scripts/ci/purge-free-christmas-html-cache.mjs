const token = process.env.CLOUDFLARE_CACHE_API_TOKEN?.trim();
const zoneName = (process.env.CLOUDFLARE_ZONE_NAME || "texasdefined.com").trim();
const canonicalUrl = `https://${zoneName}/article/free-christmas-events-in-texas`;

if (!token) {
  console.warn("::warning title=Cloudflare cache purge skipped::CLOUDFLARE_CACHE_API_TOKEN is unavailable. Bare-canonical production verification remains fail-closed.");
  process.exit(0);
}

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

async function cloudflareJson(url, init = {}) {
  const response = await fetch(url, {
    ...init,
    headers: { ...headers, ...(init.headers || {}) },
  });
  const body = await response.json().catch(() => null);
  if (!response.ok || body?.success === false) {
    const errors = Array.isArray(body?.errors) ? JSON.stringify(body.errors) : `HTTP ${response.status}`;
    throw new Error(errors);
  }
  return body;
}

try {
  const zones = await cloudflareJson(
    `https://api.cloudflare.com/client/v4/zones?name=${encodeURIComponent(zoneName)}&status=active&per_page=5`,
  );
  const zone = zones?.result?.find((item) => item?.name === zoneName) ?? zones?.result?.[0];
  if (!zone?.id) throw new Error(`No active Cloudflare zone found for ${zoneName}`);

  await cloudflareJson(`https://api.cloudflare.com/client/v4/zones/${zone.id}/purge_cache`, {
    method: "POST",
    body: JSON.stringify({ files: [canonicalUrl] }),
  });
  console.log(`Purged canonical HTML cache for ${canonicalUrl}.`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.warn(`::warning title=Cloudflare cache purge unavailable::${message}. Bare-canonical production verification remains fail-closed.`);
}
