import assert from "node:assert/strict";
import { appendFile } from "node:fs/promises";

const ORIGINS = [
  "https://texasdefined.com",
  "https://texasdefined-site.freddy-coppola.workers.dev",
];
const CANONICAL_ORIGIN = ORIGINS[0];
const USER_AGENT = "TexasDefined-Five-Guide-Live-Authority/1.0 (https://texasdefined.com/about)";
const PHOTO_SOURCE = {
  "/texas-tall-tales-folklore": {
    original: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Pecos_Bill%2C_The_Century_Magazine%2C_October_1923.jpg?width=900",
    credit: "Elmer Hader",
  },
  "/texas-dance-halls-honky-tonks": {
    original: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Gruene_hall.jpg?width=1200",
    credit: "Larry D. Moore",
  },
  "/texas-homecoming-mums": {
    original: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Goldthwaite_High_School_Homecoming_Mum.jpg?width=720",
    local: "/images/editorial/optimized/goldthwaite-homecoming-mum-640.webp",
    credit: "Sillyputty1967",
  },
};

const GUIDES = [
  {
    path: "/texas-tall-tales-folklore",
    markers: ["Pecos Bill", "October 1923", "Emily D. West", "jackalope"],
    hrefs: ["/texas-slang-explained", "https://plainshumanities.unl.edu/encyclopedia/doc/egp.fol.031.html"],
  },
  {
    path: "/texas-dance-halls-honky-tonks",
    markers: ["Gruene Hall", "Luckenbach Dance Hall", "Twin Sisters Dance Hall", "Kendalia Halle", "suspended public operations in July 2024", "3201 South Lamar Boulevard"],
    hrefs: ["/german-czech-texas-towns", "https://gruenehall.com/events/month/"],
  },
  {
    path: "/texas-homecoming-mums",
    markers: ["homecoming mum", "Elizabeth Cleaver", "test the finished piece while standing, walking and sitting", "DIY build"],
    hrefs: ["/article/mum-queen-spring-texas-homecoming-mums", "https://texancultures.utsa.edu/blog/2026-03/keeping-texas-traditions"],
  },
  {
    path: "/texas-natural-wonders-bucket-list",
    markers: ["Big Bend National Park", "Devils River Access Permit", "Del Norte", "Source review: November 18, 2026"],
    hrefs: ["/destination/devils-river-state-natural-area", "https://tpwd.texas.gov/state-parks/devils-river/access-permit-overview/"],
  },
  {
    path: "/texas-rock-climbing-bouldering-guide",
    markers: ["Enchanted Rock", "Bouldering, free climbing and soloing are prohibited", "70 meters"],
    hrefs: ["/texas-natural-wonders-bucket-list", "https://tpwd.texas.gov/state-parks/lake-mineral-wells/rock-climbing"],
  },
];

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:amp|#38);/gi, "&")
    .replace(/&(?:quot|#34);/gi, '"')
    .replace(/&(?:apos|#39|#x27);/gi, "'")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ");
}

function canonicalHref(html) {
  const links = [...html.matchAll(/<link\b[^>]*>/gi)]
    .map((match) => match[0])
    .filter((tag) => /\brel=["']canonical["']/i.test(tag));
  assert.equal(links.length, 1, "Expected exactly one canonical link");
  return links[0].match(/\bhref=["']([^"']+)["']/i)?.[1];
}

function assertPageHtml({ html, origin, response, guide }) {
  assert.equal(response.status, 200, origin + guide.path + ": HTTP not 200");
  assert.ok((response.headers.get("content-type") || "").includes("text/html"), "Non-HTML authority page");
  assert.notEqual(response.headers.get("cf-mitigated"), "challenge", "Bot challenge blocked HTML");
  assert.match(html, /<html\b/i, "Missing HTML document");
  assert.match(html, /<title>[^<]+<\/title>/i, "Missing title");
  assert.equal(canonicalHref(html), CANONICAL_ORIGIN + guide.path, "Wrong or non-self canonical");
  const robots = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0])
    .filter((tag) => /\bname=["']robots["']/i.test(tag));
  assert.ok(!robots.some((tag) => /noindex/i.test(tag)), "Guide contains robots noindex");

  const body = visibleText(html).toLowerCase();
  for (const marker of guide.markers) {
    assert.ok(body.includes(marker.toLowerCase()), guide.path + ": missing rendered editorial fact " + marker);
  }
  for (const href of guide.hrefs) {
    assert.ok(html.includes("href=\"" + href + "\"") || html.includes("href=\"" + href + "?"),
      guide.path + ": missing live contextual/source link " + href);
  }
  const image = PHOTO_SOURCE[guide.path];
  if (image) {
    const expectedImagePath = image.local ?? ("/media/remote?url=" + encodeURIComponent(image.original));
    assert.ok(html.includes('src="' + expectedImagePath + '"'),
      guide.path + ": licensed hero bypassed first-party image delivery");
    assert.ok(body.includes(image.credit.toLowerCase()), guide.path + ": creator credit missing");
    return expectedImagePath;
  }
  return null;
}

async function fetchChecked(url, kind, attempt = 1) {
  const response = await fetch(url, {
    redirect: "follow",
    cache: "no-store",
    headers: {
      "user-agent": USER_AGENT,
      "cache-control": "no-cache, no-store, max-age=0",
      accept: kind === "photo" ? "image/avif,image/webp,image/jpeg,image/png" : "text/html",
    },
    signal: AbortSignal.timeout(30000),
  });
  if ([429, 502, 503, 504].includes(response.status) && attempt === 1) {
    await response.body?.cancel();
    return fetchChecked(url, kind, 2);
  }
  return response;
}

async function checkPage(origin, guide) {
  const url = new URL(guide.path, origin);
  url.searchParams.set("live_five_guide_check", (process.env.GITHUB_RUN_ID || "manual") + "-" + Date.now());
  const response = await fetchChecked(url, "page");
  const html = await response.text();
  const image = assertPageHtml({ html, origin, response, guide });
  const version = response.headers.get("x-texasdefined-worker-version");
  assert.match(version || "", /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
    "Missing exact published Worker version on " + origin + guide.path);
  if (image) {
    const hero = await fetchChecked(new URL(image, origin), "photo");
    assert.equal(hero.status, 200, "Licensed first-party hero unavailable on " + origin + guide.path);
    assert.notEqual(hero.headers.get("cf-mitigated"), "challenge", "Hero delivered challenge");
    const mime = (hero.headers.get("content-type") || "").toLowerCase();
    assert.match(mime, /^image\/(?:jpeg|png|webp|avif)\b/, "Hero is not a real raster image: " + mime);
    const bytes = new Uint8Array(await hero.arrayBuffer());
    assert.ok(bytes.byteLength > 10000, "Hero response too small to be verified photo");
    if (PHOTO_SOURCE[guide.path]?.local) {
      assert.match(mime, /^image\/webp\b/, "Pinned licensed hero must be WebP");
      assert.ok(bytes.byteLength <= 125000, "Pinned licensed hero exceeds mobile byte budget");
      assert.ok(html.includes("https://creativecommons.org/licenses/by-sa/4.0/"), "Pinned photograph license link missing");
    }
  }
  return { path: guide.path, origin, workerVersion: version, licensedHero: Boolean(image), status: 200 };
}

const results = [];
const failures = [];
for (const guide of GUIDES) {
  for (const origin of ORIGINS) {
    try {
      const row = await checkPage(origin, guide);
      results.push(row);
      console.log("FIVE_GUIDE_LIVE_PASS " + JSON.stringify(row));
    } catch (error) {
      const message = origin + guide.path + ": " + String(error?.message || error);
      failures.push(message);
      console.error("FIVE_GUIDE_LIVE_FAIL " + message);
    }
  }
}
const workerVersions = new Set(results.map((row) => row.workerVersion));
if (workerVersions.size !== 1) failures.push("Canonical and direct origins do not agree on one active Worker version");
const summary = [
  "## Five culture and outdoor guides — independent live authority acceptance",
  "",
  "Checked both public origins, all five canonical URLs, editorial facts, direct sources, contextual links,",
  "robots indexability, exact Worker version, and the three approved first-party licensed photo bytes.",
  "This does not assert a Google-issued quality or indexing certification.",
  "",
  ...results.map((r) => "- PASS " + r.origin + r.path + " (worker " + r.workerVersion + ")"),
  ...failures.map((f) => "- FAIL " + f),
  "",
].join("\n");
if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, summary);
if (failures.length) {
  console.error("FIVE_GUIDE_LIVE_ACCEPTANCE_FAILED " + failures.length);
  process.exitCode = 1;
} else {
  assert.equal(results.length, 10);
  console.log("FIVE_GUIDE_LIVE_ACCEPTANCE_PASS " + JSON.stringify({ pages: 5, origins: 2, verifiedImages: 6, activeWorkerVersions: [...workerVersions] }));
}
