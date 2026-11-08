import assert from "node:assert/strict";

const origin = "https://texasdefined.com";
const path = "/warriors-refuge-west-columbia";
const stamp = Date.now();
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchVerified(url, check) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(url, {
        headers: { accept: "*/*", "user-agent": "TexasDefined-WarriorsRefuge-live-acceptance/1.0" },
        signal: AbortSignal.timeout(20000),
        redirect: "follow",
      });
      assert.equal(response.status, 200, `Expected 200 from ${url}; got ${response.status}`);
      await check(response);
      return;
    } catch (error) {
      lastError = error;
      console.error(`Attempt ${attempt}/3: ${url}: ${error.message}`);
      if (attempt < 3) await delay(5000 * attempt);
    }
  }
  throw new Error(`Production verification failed for ${url}: ${lastError?.message}`);
}

await fetchVerified(`${origin}${path}?verify=${stamp}`, async (response) => {
  const html = await response.text();
  assert.ok(html.includes("The Warrior's Refuge"), "Page heading/organization not found");
  assert.ok(html.includes("Need help or want to request services?"), "Intake-first section missing");
  assert.ok(html.includes("877-424-3838"), "Emergency homeless-veteran support number missing");
  assert.ok(html.includes("/images/warriors-refuge-sign.avif"), "Sign image not referenced in SSR markup");
  assert.ok(html.includes(`<link rel="canonical" href="${origin}${path}"`) || html.includes(`href="${origin}${path}" rel="canonical"`), "Expected canonical link missing");
  assert.ok(!/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html), "Page is noindexed");
  console.log("PASS live guide rendered with intake, VA emergency help, image and canonical URL");
});

await fetchVerified(`${origin}/images/warriors-refuge-sign.avif?verify=${stamp}`, async (response) => {
  const bytes = new Uint8Array(await response.arrayBuffer());
  assert.ok(bytes.length >= 3000, "Photo appears truncated");
  const header = String.fromCharCode(...bytes.slice(4, 12));
  assert.equal(header, "ftypavif", "Image endpoint did not return AVIF bytes");
  console.log(`PASS live AVIF photo: ${bytes.length} bytes`);
});

await fetchVerified(`${origin}/sitemap.xml?verify=${stamp}`, async (response) => {
  const xml = await response.text();
  assert.ok(xml.includes(`<loc>${origin}${path}</loc>`), "Sitemap does not contain published authority URL");
  console.log("PASS published page appears in primary sitemap");
});
