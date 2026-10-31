import fs from "node:fs";

const errors = [];
const read = (path) => fs.readFileSync(path, "utf8");
const source = read("src/data/fishing/lake-authority-research-wave1.ts");
const slugs = read("src/data/fishing/slugs.ts");
const server = read("src/data/fishing/showcase-lakes-page-data.server.ts");
const ui = read("src/components/fishing/ShowcaseLakeGuide.tsx");
const sitemap = read("src/data/fishing/sitemap.ts");
const gate = read("src/data/fishing/showcase-section-index-readiness.ts");

const match = source.match(/export const LAKE_AUTHORITY_RESEARCH_WAVE1: Record<string, LakeAuthorityResearch> = (\{[\s\S]*\});\s*$/);
if (!match) throw new Error("Fishing research dossier must use a machine-parseable, individually evidenced record.");
const dossiers = JSON.parse(match[1]);

function fromRegistry(name) {
  const block = slugs.match(new RegExp(name + "\\s*=\\s*\\[([^\\]]+)\\]", "s"))?.[1] ?? "";
  return [...block.matchAll(/"([a-z0-9-]+)"/g)].map((entry) => entry[1]);
}

const published = [
  ...fromRegistry("BASE_COMPLETE_FISHING_LAKE_SLUGS"),
  ...fromRegistry("WAVE2_COMPLETE_FISHING_LAKE_SLUGS"),
  ...fromRegistry("STATEWIDE_NETWORK_COMPLETE_FISHING_LAKE_SLUGS"),
];
if (published.length !== 72 || new Set(published).size !== 72) errors.push("Expected unique 72 complete-lake source records; reconcile registry before declaring coverage.");
const outstanding = published.filter((slug) => !dossiers[slug]);
const approvedDomains = /^(?:tpwd\.texas\.gov|www\.swf-wc\.usace\.army\.mil|www\.cityoflewisville\.com|lcraparks\.com|www\.nps\.gov|www\.recreation\.gov|www\.fws\.gov|sratx\.org|www\.traviscountytx\.gov|sunsetcovecorsicana\.com|midwaylandingrc\.com|fishermanscovelodge\.com|www\.cityoflogcabin\.com|pinegardensrvpark\.com|www\.trwd\.com|www\.heartoftexaslakeresorts\.com)$/i;
const words = (value) => String(value ?? "").trim().split(/\s+/).filter(Boolean).length;
const official = (value) => {
  try { const u = new URL(value); return u.protocol === "https:" && approvedDomains.test(u.hostname); }
  catch { return false; }
};
for (const [slug, d] of Object.entries(dossiers)) {
  if (!published.includes(slug) || slug === "lake-conroe") errors.push(`${slug}: no matching published source-driven showcase lake`);
  if (!/^20\d\d-\d\d-\d\d$/.test(d.reviewedAt)) errors.push(`${slug}: review date not independently attributed`);
  if (d.camping.length < 1 || d.regulations.length < 2 || d.nearby.length < 1) errors.push(`${slug}: researched camping, rules and attractions required`);
  for (const site of d.camping) {
    if (!official(site.href) || !site.name || words(site.summary) < 22) errors.push(`${slug}: campsite requires named operator source and explanatory detail`);
  }
  for (const rule of d.regulations) {
    if (!official(rule.sourceUrl) || !rule.sourceUrl.includes("tpwd.texas.gov") || words(rule.text) < 20) errors.push(`${slug}: regulation must be tied to a substantive current TPWD source`);
  }
  for (const place of d.nearby) {
    if (!official(place.href) || !place.external || words(place.description) < 19) errors.push(`${slug}: named attraction needs grounded direct operator link and unique context`);
  }
  const allSources = new Set([...d.camping.map((x) => x.href), ...d.regulations.map((x) => x.sourceUrl), ...d.nearby.map((x) => x.href)]);
  if ([...allSources].some((x) => !d.sourceUrls.includes(x))) errors.push(`${slug}: dossier provenance incomplete`);
}

for (const token of ["LAKE_AUTHORITY_RESEARCH_WAVE1", "camping: researched.camping", "regulations: researched.regulations", "nearby: [...baseLake.nearby, ...researched.nearby]", "sectionResearch:"]) if (!server.includes(token)) errors.push(`Server fails to publish independent research: ${token}`);
for (const token of ["row.sourceUrl", "pageData.sectionResearch?.reviewedAt", "pageData.sectionResearch.reviewedAt"]) if (!ui.includes(token)) errors.push(`Fishing UI fails to show individual research: ${token}`);
for (const token of ["LAKE_AUTHORITY_RESEARCH_WAVE1", "section === \"regulations\"", "section === \"camping\"", "section === \"nearby\""]) if (!sitemap.includes(token)) errors.push(`Sitemap missing truthful article-section lastmod: ${token}`);
if (!gate.includes('lake.sectionResearch?.reviewedAt')) errors.push("Regulations lack researched-source index eligibility.");
if (new Date() >= new Date("2027-09-01T00:00:00Z") && source.includes("2026-27")) errors.push("TPWD 2026-27 legal-limit summary expired; independently recheck each rule before next release.");

console.log(`Fishing independent-source review: ${Object.keys(dossiers).length} researched / ${published.length} lake dossiers; ${outstanding.length} remain for operator research.`);
if (outstanding.length) console.log("Outstanding: " + outstanding.join(", "));
if (errors.length) {
  errors.forEach((error) => console.error("FAIL: " + error));
  process.exit(1);
}
console.log("PASS: every published research claim is source-attributed, URL-specific and independently tracked.");
