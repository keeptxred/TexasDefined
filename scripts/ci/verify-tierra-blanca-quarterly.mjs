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
    key: "FWS water history",
    url: "https://www.fws.gov/refuge/buffalo-lake/about-us",
    required: ["Tierra Blanca Creek", "typically dry", "1970"],
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

const articleUrl = `${BASE}/explore/tierra-blanca-creek`;
const page = await getHtml(articleUrl);
for (const marker of [
  "Tierra Blanca Creek", "Prairie Dog Town Fork", "Tierra Blanca archaeological complex",
  "Buffalo Lake", "Georgia O", "Palo Duro Canyon State Park",
]) assert.ok(page.toLowerCase().includes(marker.toLowerCase()), `Live guide missing editorial content: ${marker}`);
assert.ok(page.includes(articleUrl), "Live guide lacks canonical URL");
assert.ok(!/content=["']noindex/i.test(page), "Live guide unexpectedly noindexed");

const sitemap = await getHtml(`${BASE}/sitemap-explore.xml`);
const canon = `<loc>${articleUrl}</loc>`;
assert.ok(sitemap.includes(canon), "Canonical Tierra Blanca guide absent from Explore sitemap");
assert.equal(sitemap.split(canon).length - 1, 1, "Guide appears more than once in Explore sitemap");

console.log("TIERRA_BLANCA_AUTHORITY_READONLY_REVIEW " + JSON.stringify({
  checkedAt: new Date().toISOString(),
  editorialReviewDateAdvanced: false,
  officialSources: findings,
  liveCanonical: articleUrl,
  sitemap: `${BASE}/sitemap-explore.xml`,
  status: "PASS",
}));
