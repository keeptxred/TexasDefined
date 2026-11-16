// Quarterly fact-drift and public-canonical check for the Tierra Blanca Creek authority guide.
// Read-only checks: never advance article review dates on HTTP 200 alone.
// Fails closed when public-source access or materially quoted facts cannot be confirmed.
import assert from "node:assert/strict";

const BASE = "https://texasdefined.com";
const sources = [
  {
    key: "TSHA creek confluence",
    url: "https://www.tshaonline.org/handbook/entries/tierra-blanca-creek",
    required: ["Tierra Blanca Creek", "Palo Duro Creek", "Prairie Dog Town Fork"],
  },
  {
    key: "FWS refuge public access",
    url: "https://www.fws.gov/refuge/buffalo-lake/visit-us",
    required: ["Buffalo Lake", "Umbarger", "Cottonwood Canyon", "Grassland Loop", "per vehicle"],
  },
  {
    key: "FWS specific public trails",
    url: "https://www.fws.gov/refuge/buffalo-lake/visit-us/trails",
    required: ["Cottonwood Canyon Birding Trail", "Cottonwood Hiking Trail", "Grassland Loop", "Prairie Dog Trail", "1.25 miles", "2 miles"],
  },
  {
    key: "USFWS winter refuge photo provenance",
    url: "https://www.fws.gov/media/buffalo-lake-winter",
    required: ["Public Domain", "Stephens"],
  },
  {
    key: "USFWS refuge turkeys photo provenance",
    url: "https://www.fws.gov/media/rio-grande-turkeys-buffalo-lake-refuge",
    required: ["Public Domain", "Robert Burton"],
  },
  {
    key: "FWS water history",
    url: "https://www.fws.gov/refuge/buffalo-lake/about-us",
    required: ["Tierra Blanca Creek", "typically dry", "1970"],
  },
  {
    key: "Panhandle-Plains Museum current closure and off-site programming",
    url: "https://www.panhandleplains.org/p/about/pphm-temporary-closure-updates",
    required: ["Panhandle-Plains Historical Museum", "temporarily closed", "traveling exhibitions"],
  },
  {
    key: "TPWD Palo Duro rules and current fee",
    url: "https://tpwd.texas.gov/state-parks/palo-duro-canyon",
    required: ["Palo Duro Canyon State Park", "Park Road 5", "Entrance Fees", "$8 Daily"],
  },
];

const headers = {
  "User-Agent": "TexasDefined-TierraBlanca-AuthorityReview/1.0",
  "Cache-Control": "no-cache",
  "Pragma": "no-cache",
};

async function getHtml(url) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const response = await fetch(url, { headers, redirect: "follow", signal: AbortSignal.timeout(25000) });
      if ([429, 502, 503, 504].includes(response.status) && attempt === 1) continue;
      assert.equal(response.status, 200, `${url}: HTTP ${response.status}`);
      assert.match(response.headers.get("content-type") ?? "", /text\/(html|xml)|application\/xml/i, `${url}: unexpected content type`);
      const body = await response.text();
      assert.ok(body.length >= 400, `${url}: unexpectedly short body`);
      return body;
    } catch (error) {
      if (attempt === 2) throw error;
    }
  }
  throw new Error(`${url}: source fetching exhausted`);
}

const findings = [];
for (const source of sources) {
  const body = (await getHtml(source.url)).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;|&#160;/gi, " ").replace(/\s+/g, " ").toLowerCase();
  for (const needle of source.required) {
    assert.ok(body.includes(needle.toLowerCase()), `${source.key}: source no longer verifies "${needle}"; editorial review required`);
  }
  findings.push({source:source.key,sourceUrl:source.url,sourceReached:true,materialFactsStillDisplayed:true});
}

const licensedPhotoAssets = [
  "https://www.fws.gov/sites/default/files/styles/max_1300x1300/public/images/2024-07/buffalo-lake-snowscape.jpg?itok=HkeBOb3Z",
  "https://www.fws.gov/sites/default/files/styles/max_1300x1300/public/2021-06/rio_grande_wild_turkey_pair_buffalo_lake_nwr_robert_burton_usfws.jpg?itok=QaosMrLg",
];
for (const photoUrl of licensedPhotoAssets) {
  const response = await fetch(photoUrl, { headers, redirect: "follow", signal: AbortSignal.timeout(25000) });
  assert.equal(response.status, 200, "Remote refuge photo missing: " + photoUrl);
  assert.match(response.headers.get("content-type") ?? "", /^image\/(jpeg|jpg|png|webp)/i, "Media endpoint no longer serves a photo: " + photoUrl);
  const bytes = (await response.arrayBuffer()).byteLength;
  assert.ok(bytes > 25000, "Remote refuge photo too small, corrupt or replaced: " + photoUrl);
}
const articleUrl = `${BASE}/explore/tierra-blanca-creek`;
const page = await getHtml(articleUrl);
for (const marker of [
  "Tierra Blanca Creek", "Prairie Dog Town Fork", "Tierra Blanca archaeological complex",
  "Buffalo Lake", "Georgia O", "Palo Duro Canyon State Park",
  "Panhandle-Plains Historical Museum", "closed to the public since March 2025",
  "Cottonwood Canyon Birding Trail", "Prairie Dog Trail", "openstreetmap.org/export/embed.html", "buffalo-lake-snowscape.jpg", "rio_grande_wild_turkey_pair", "Travel &",
]) assert.ok(page.toLowerCase().includes(marker.toLowerCase()), `Live guide missing editorial content: ${marker}`);
assert.ok(page.includes(articleUrl), "Live guide lacks canonical URL");
assert.ok(!/content=["']noindex/i.test(page), "Live guide unexpectedly noindexed");

const sitemap = await getHtml(`${BASE}/sitemap-explore.xml`);
const canon = `<loc>${articleUrl}</loc>`;
assert.ok(sitemap.includes(canon), "Canonical Tierra Blanca guide absent from Explore sitemap");
assert.equal(sitemap.split(canon).length - 1, 1, "Guide appears more than once in Explore sitemap");
const guideXml = sitemap.slice(sitemap.indexOf(canon), sitemap.indexOf("</url>", sitemap.indexOf(canon)));
assert.ok(guideXml.includes("<lastmod>2026-11-16</lastmod>"), "Guide's sitemap lastmod must match substantive Nov 16 update rather than an older or automatically fabricated date");

console.log("TIERRA_BLANCA_AUTHORITY_READONLY_REVIEW " + JSON.stringify({
  checkedAt: new Date().toISOString(),
  editorialReviewDateAdvanced: false,
  officialSources: findings,
  liveCanonical: articleUrl,
  sitemap: `${BASE}/sitemap-explore.xml`,
  status: "PASS",
}));
