/**
 * Full registered fishing URL inventory; source coverage is NOT production SEO acceptance.
 * Usage: node scripts/seo/fishing-authority-inventory.mjs [--json filename] [--markdown filename]
 */
import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const registry = read("src/data/fishing/slugs.ts");
const techniques = read("src/data/fishing/technique-routing.ts");
const research = read("src/data/fishing/lake-authority-research-wave1.ts");

function list(text, name) {
  const pattern = new RegExp("(?:export\\s+)?const\\s+" + name + "\\s*=\\s*\\[([^\\]]+)\\]", "s");
  const match = text.match(pattern);
  if (!match) throw new Error("Missing fishing registry: " + name);
  return [...match[1].matchAll(/"([a-z0-9-]+)"/g)].map((x) => x[1]);
}
const lakes = [
  ...list(registry, "BASE_COMPLETE_FISHING_LAKE_SLUGS"),
  ...list(registry, "WAVE2_COMPLETE_FISHING_LAKE_SLUGS"),
  ...list(registry, "STATEWIDE_NETWORK_COMPLETE_FISHING_LAKE_SLUGS"),
];
const species = list(registry, "COMPLETE_FISHING_SPECIES_SLUGS");
const methods = list(techniques, "PUBLISHED_FISHING_TECHNIQUE_SLUGS");
const recordMatch = research.match(/export const LAKE_AUTHORITY_RESEARCH_WAVE1: Record<string, LakeAuthorityResearch> = (\{[\s\S]*\});\s*$/);
if (!recordMatch) throw Error("Per-lake source dossier registry is not machine-parseable");
const records = JSON.parse(recordMatch[1]);
const sections = ["fish","access","boating","regulations","camping","nearby","reports","guides"];
const hubs = [
  "/fishing","/fishing/lakes","/fishing/species","/fishing/techniques",
  "/fishing/plan","/fishing/compare","/fishing/seasons",
  "/fishing/structure","/fishing/vegetation","/fishing/regulations",
  "/fishing/access","/fishing/services","/fishing/reports","/fishing/guides",
  "/fishing/guides/submit","/fishing/reports/submit","/texas-fishing-license",
];
const rows = [];
function add(path, family, lake = null, section = null, acceptance = "pending_live_and_editorial_QA") {
  rows.push({ path, family, lake, section, acceptance });
}
hubs.forEach((p) => add(
  p,
  p.endsWith("/submit") ? "submission-form" : "hub",
  null, null,
  p.endsWith("/submit") || ["/fishing/guides","/fishing/reports","/fishing/access","/fishing/services"].includes(p)
    ? "conditional_on_verified_published_records" : "pending_live_and_editorial_QA",
));
for (const slug of lakes) {
  const d = records[slug];
  if (!d || !d.camping?.length || !d.regulations?.length || !d.nearby?.length)
    throw Error("Unresearched or missing fishing lake: " + slug);
  const base = "/fishing/lakes/" + slug;
  add(base, "lake-overview", slug, "overview");
  for (const section of sections) add(
    base + "/" + section, "lake-section", slug, section,
    section === "reports" || section === "guides"
      ? "conditional_on_verified_published_records"
      : "pending_live_and_editorial_QA",
  );
}
species.forEach((s) => add("/fishing/species/" + s, "species"));
methods.forEach((s) => add("/fishing/techniques/" + s, "technique"));

if (lakes.length !== 72 || species.length !== 19 || methods.length !== 9)
  throw Error("Fishing registry changed; review the complete URL audit coverage before accepting any pages");
if (new Set(rows.map((r) => r.path)).size !== rows.length)
  throw Error("Duplicate fishing route in authority inventory");

export function getFishingAuthorityInventory() {
  return {
    schemaVersion: 1, origin: "https://texasdefined.com",
    dynamicFamilies: ["/fishing/access/{slug}","/fishing/services/{slug}","/fishing/guides/{slug}","/fishing/reports/{slug}"],
    counts: { lakes: 72, lakeRoutes: 648, species: 19, techniques: 9, hubs: hubs.length, registeredUrls: rows.length },
    rows,
  };
}
if (process.argv[1]?.endsWith("fishing-authority-inventory.mjs")) {
  const args = process.argv.slice(2);
  const output = (flag) => { const i = args.indexOf(flag); return i < 0 ? null : args[i+1]; };
  const report = getFishingAuthorityInventory();
  if (output("--json")) fs.writeFileSync(output("--json"), JSON.stringify(report,null,2)+"\n");
  if (output("--markdown")) {
    const lines = [
      "# TexasDefined fishing: canonical page-by-page authority acceptance",
      "",
      "**No registered URL is certified merely by having research text.** The lake dossiers establish source coverage, not SEO/UX/visual/live acceptance. Individual route checks remain pending. Reports and fishing-guide subpages lacking dated verified content are intentionally noindex until sourced; never invent reports or guide businesses.",
      "",
      "Inventory includes " + report.counts.registeredUrls + " registered routes: 648 lake pages (72 overviews and 576 subpages), 19 species, nine techniques and " + hubs.length + " hubs/utility pages, plus verified published dynamic profiles discovered from the production sitemap.",
      "",
      "| Canonical URL | Family/intent | Individual acceptance |",
      "|---|---|---|",
      ...rows.map((r) => "| ["+r.path+"](https://texasdefined.com"+r.path+") | "+r.family+(r.section?" / "+r.section:"")+" | "+r.acceptance+" |"),
      "",
      "## Required gates (each URL)",
      "",
      "Unique user-intent answer and facts; truthful TPWD/operating-authority references; responsive rendered HTML; unique H1/title/meta description; self canonical, correct robots and sitemap parity; dateModified reflecting source review; valid relevant JSON-LD; original imagery with provenance (or a clearly labeled map); source-cited regulations and operator-specific overnight details; genuinely useful inbound/outbound species, related-lake, park, county and city links; honest current-conditions and booking disclaimers; no fake reports, operators or business reviews.",
      "",
      "### Dynamic public profiles",
      "Verified published fishing access, fishing services, guide and report routes must be discovered from the production sitemap and included in the live per-URL audit. The route inventory does not falsely certify those dynamic IDs.",
    ];
    fs.writeFileSync(output("--markdown"),lines.join("\n")+"\n");
  }
  console.log("Fishing URL inventory: "+rows.length+" registered, 0 individually certified by inventory alone");
}
