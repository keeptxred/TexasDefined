const origin = process.env.PRODUCTION_ORIGIN ?? "https://texasdefined.com";
const sha = process.env.GITHUB_SHA ?? "local";
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();

const slugs = [
  "dash-cams-in-texas",
  "texas-road-trip-vehicle-checklist",
  "dash-cam-setup-texas-road-trips",
  "trail-cameras-in-texas",
  "texas-wildlife-camera-guide",
  "texas-car-emergency-kit",
  "texas-heat-vehicle-electronics",
  "cameras-texas-camping-outdoors",
  "rural-texas-property-monitoring",
  "rideshare-dash-cams-texas",
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const escapeRegex = (value) => value.replace(/[.*+?^$\{\}()|[\]\\]/g, "\\$&");

async function fetchWithRetry(path, label, attempts = 5) {
  let last = null;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const separator = path.includes("?") ? "&" : "?";
    const url = `${origin}${path}${separator}verify=${encodeURIComponent(`${sha}-${runId}-${label}-${attempt}`)}`;
    try {
      const response = await fetch(url, {
        redirect: "follow",
        cache: "no-store",
        signal: AbortSignal.timeout(30_000),
        headers: { "user-agent": "TexasDefined-RoadTrip-Camera-Production-Smoke/1.0" },
      });
      const body = await response.text();
      last = { response, body };
      if (response.status < 500 && response.headers.get("cf-mitigated")?.toLowerCase() !== "challenge") return last;
    } catch (error) {
      last = { error };
    }
    if (attempt < attempts) await sleep(5_000);
  }
  return last;
}

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}
function hasNoindex(html) {
  return /<meta\b[^>]*(?:name=["']robots["'][^>]*content=["'][^"']*noindex|content=["'][^"']*noindex[^"']*["'][^>]*name=["']robots["'])/i.test(html);
}
function hasCanonical(html, canonicalUrl) {
  const value = escapeRegex(canonicalUrl);
  return new RegExp(`<link[^>]+rel=["']canonical["'][^>]+href=["']${value}["']|<link[^>]+href=["']${value}["'][^>]+rel=["']canonical["']`, "i").test(html);
}

for (const slug of slugs) {
  const path = `/article/${slug}`;
  const result = await fetchWithRetry(path, slug);
  requireCondition(result?.response, `${slug}: request never produced an HTTP response`);
  requireCondition(result.response.status === 200, `${slug}: expected HTTP 200, received ${result.response.status}`);
  requireCondition(!hasNoindex(result.body), `${slug}: authority page unexpectedly contains noindex`);
  requireCondition(hasCanonical(result.body, `${origin}${path}`), `${slug}: canonical is missing or incorrect`);
  requireCondition(result.body.includes('"@type":"Article"') || result.body.includes('"@type": "Article"'), `${slug}: Article structured data missing`);
  requireCondition(result.body.includes('"@type":"BreadcrumbList"') || result.body.includes('"@type": "BreadcrumbList"'), `${slug}: BreadcrumbList structured data missing`);
  console.log(`PASS ${slug}: HTTP 200, indexable, canonical and article/breadcrumb schema verified`);
}

const legacy = await fetchWithRetry("/article/what-to-keep-in-car-for-texas-road-trip", "legacy-emergency-kit");
requireCondition(legacy?.response?.status === 200, `legacy emergency kit: expected redirected HTTP 200, received ${legacy?.response?.status ?? "no response"}`);
requireCondition(
  legacy.response.url.startsWith(`${origin}/article/texas-car-emergency-kit`),
  `legacy emergency kit: expected final URL ${origin}/article/texas-car-emergency-kit, received ${legacy.response.url}`,
);
console.log("PASS legacy emergency kit: 301 chain resolves to the canonical Texas car emergency-kit guide.");

const sitemap = await fetchWithRetry("/sitemap.xml", "sitemap");
requireCondition(sitemap?.response?.status === 200, `sitemap: expected HTTP 200, received ${sitemap?.response?.status ?? "no response"}`);
for (const slug of slugs) {
  requireCondition(sitemap.body.includes(`${origin}/article/${slug}`), `sitemap missing /article/${slug}`);
}
requireCondition(
  !sitemap.body.includes(`${origin}/article/what-to-keep-in-car-for-texas-road-trip`),
  "sitemap must not expose the legacy staged road-kit URL",
);
console.log("PASS sitemap: all 10 authority routes are discoverable and the legacy road-kit URL is excluded.");
console.log("TexasDefined road-trip/camera production smoke passed.");
