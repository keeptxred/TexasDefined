/**
 * Small post-deploy acceptance probe: one source-verified Viator market feed.
 * Runs after the production deploy workflow, never during page rendering.
 * No credentials are needed; the Worker owns the secret API key.
 */
const origin = (process.env.VIATOR_PRODUCTION_ORIGIN || "https://texasdefined.com").replace(/\/$/, "");
const target = new URL("/api/viator/market/houston/products", origin);
const timeoutMs = 15_000;

async function run() {
  const response = await fetch(target.toString(), {
    method: "GET",
    headers: { "Accept": "application/json", "User-Agent": "TexasDefined-Viator-Production-Probe/1.0" },
    signal: AbortSignal.timeout(timeoutMs),
    redirect: "error",
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Live market endpoint HTTP ${response.status}; check Worker Viator API key binding, upstream permissions and deployment logs`);
  }
  const feed = await response.json();
  if (feed?.source !== "viator" || feed?.market !== "houston" ||
      !Array.isArray(feed.products) || feed.products.length < 1 || feed.products.length > 4) {
    throw new Error("Live Houston feed returned no usable products or a malformed response");
  }
  if (Number.isNaN(Date.parse(feed.refreshedAt))) {
    throw new Error("Feed is missing a parseable refresh timestamp");
  }
  const age = Date.now() - Date.parse(feed.refreshedAt);
  if (age < -60_000 || age > 25 * 60_000) {
    throw new Error("Live Houston product feed is stale or time-skewed");
  }
  let images = 0;
  for (const [i, product] of feed.products.entries()) {
    if (typeof product.productCode !== "string" || !/^[A-Za-z0-9_-]{1,64}$/.test(product.productCode) ||
        typeof product.title !== "string" || product.title.trim().length < 7) {
      throw new Error(`Malformed product #${i + 1}`);
    }
    const link = new URL(product.url);
    if (link.protocol !== "https:" || !["viator.com", "www.viator.com"].includes(link.hostname) ||
        link.searchParams.get("pid") !== "P00318227" ||
        link.searchParams.get("mcid") !== "42383" ||
        link.searchParams.get("medium") !== "api" ||
        link.searchParams.get("campaign") !== "texasdefined-api-houston") {
      throw new Error(`Product #${i + 1} has unexpected or untracked affiliate URL`);
    }
    if (product.imageUrl) {
      const image = new URL(product.imageUrl);
      if (image.protocol !== "https:") throw new Error(`Product #${i + 1} returned a non-HTTPS image URL`);
      images++;
    }
    for (const banned of ["pricing", "price", "availability", "rating", "reviewCount"]) {
      if (banned in product) throw new Error(`Product #${i + 1} leaks unverified ${banned}`);
    }
  }
  console.log(`PASS: Viator API Houston returned ${feed.products.length} current, attributed product previews (${images} cover images) from the deployed Worker. Cache age ${Math.round(age / 1000)} sec.`);
}

try {
  await run();
} catch (error) {
  console.error(`::error title=Viator live production check failed::${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
