// Source-backed authority contract: intentionally checks the published guide and
// internal discovery, not a manufactured SEO word count or ranking "grade".
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const read = (path) => readFileSync(resolve(root, path), "utf8");
const page = read("src/routes/warriors-refuge-west-columbia.tsx");
const policy = read("src/lib/public-routes.ts");
const resources = read("src/routes/texas-resources.lazy.tsx");
const resourcesHead = read("src/routes/texas-resources.tsx");
const living = read("src/routes/texas-living.tsx");

for (const [name, text] of Object.entries({
  "source-checked date": "2026-11-08",
  "correct street address": "212 N. 14th St",
  "public phone": "345-3800",
  "VA homeless hotline": "877-424-3838",
  "Veterans Crisis Line": "988",
  "housing admission caveat": "not a guarantee",
  "financial assistance funding caveat": "not guaranteed",
  "financial assistance source": "https://thewarriorsrefuge.us/twr-financial-assistance/",
  "primary provider": "https://thewarriorsrefuge.us/contacts/",
  "official VA": "https://department.va.gov/homeless/nationalcallcenter/",
  "provider distinction": "different eligibility rules",
  "original intake checklist": "A useful first-call checklist",
  "structured NGO": '"@type": "NGO"',
  "structured breadcrumbs": '"@type": "BreadcrumbList"',
  "canonical SEO": "canonicalLink",
  "editorial accountability": "Texas Defined editorial desk",
})) {
  assert.ok(page.toLowerCase().includes(text.toLowerCase()), `Missing ${name}`);
}
assert.ok(page.includes("Brazoria, Fort Bend, Galveston, Harris, Jefferson and Matagorda"), "Missing verified grant counties");
assert.ok(page.includes('createFileRoute("/warriors-refuge-west-columbia")'), "Dedicated route must be registered");
assert.ok(!/noindex|nofollow/.test(page), "Authority page must not be marked noindex");
assert.ok(policy.includes('"/warriors-refuge-west-columbia"'), "Guide must be on the governed static indexable registry");
for (const [name, file] of [["Texas Resources", resources], ["resources SEO discovery", resourcesHead], ["Texas Life", living]]) {
  assert.ok(file.includes("/warriors-refuge-west-columbia"), `Missing ${name} internal link`);
}
console.log("PASS Warrior's Refuge guide: source attribution, service distinctions, accessibility calls-to-action, indexable registry and 3 discovery integrations.");

// Network checks are a freshness research alarm, never permission to silently
// change a verified source date or claim that current eligibility is guaranteed.
if (process.argv.includes("--remote")) {
  const refs = [
    ["contacts", "https://thewarriorsrefuge.us/contacts/", /West Columbia/i],
    ["programs", "https://thewarriorsrefuge.us/how-we-help/", /Transitional Housing/i],
    ["grant", "https://thewarriorsrefuge.us/twr-financial-assistance/", /Brazoria County/i],
    ["volunteer", "https://thewarriorsrefuge.us/getinvolved/", /VOLUNTEER/i],
    ["federal housing support", "https://department.va.gov/homeless/nationalcallcenter/", /877-424-3838/i],
  ];
  const problems = [];
  for (const [name, url, expected] of refs) {
    try {
      const resp = await fetch(url, { headers: { "user-agent": "TexasDefined-source-verifier/1.0 (public service information)" }, signal: AbortSignal.timeout(15000) });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const html = await resp.text();
      if (!expected.test(html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " "))) throw new Error(`Expected source marker ${expected} not found`);
      console.log(`OK ${name}`);
    } catch (error) {
      problems.push(`${name} ${url}: ${error?.message ?? String(error)}`);
    }
  }
  if (problems.length) {
    console.error("SOURCE_REVIEW needed (do not automatically change eligibility or verified date):");
    for (const p of problems) console.error("SOURCE_REVIEW", p);
    process.exitCode = 1;
  }
}
