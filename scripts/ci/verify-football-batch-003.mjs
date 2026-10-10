import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
const root = process.cwd();
const file = p => readFileSync(join(root, p), "utf8");
const registry = JSON.parse(file("docs/football-authority/REGISTRY.json"));
const editorial = file("src/data/high-school-football/program-editorial.ts");
const localPages = file("src/routes/$kind.$slug.lazy.tsx");
const countyLinks = localPages.split("const batch002FootballCountyLinks:")[1]?.split("const siteUrl")[0] ?? "";
const cityLinks = localPages.split("const batch002FootballCityLinks:")[1]?.split("const batch001FootballCountyLinks:")[0] ?? "";
const countyEvidence = file("docs/football-authority/BATCH003_CAMPUS_LINK_EVIDENCE.md");
const expected = [
  "amarillo-caprock","amarillo-highland-park","amarillo-palo-duro",
  "amarillo-river-road","amarillo-tascosa","amherst","anahuac",
  "anderson-shiro","andrews","angleton","anna","anson","anthony",
  "anton","apple-springs","aquilla","aransas-pass","archer-city",
  "argyle","arlington","arlington-bowie","arlington-houston",
  "arlington-lamar","arlington-martin","arlington-seguin"
];
const problems = [];
const check = (ok, detail) => { if (!ok) problems.push(detail); };
check(registry.counts?.total === 1292, "registry school total changed");
check(registry.batch?.number === 3, "active batch is no longer 003");
check(JSON.stringify(registry.batch?.slugs) === JSON.stringify(expected), "batch roster/order mismatch");
check(new Set(expected).size === 25, "duplicate batch slugs");
const records = registry.schoolRecords ?? [];
for (const slug of expected) {
  const matches = records.filter(x => x.slug === slug);
  check(matches.length === 1, slug + ": missing/duplicate registry record");
  const rec = matches[0];
  check(rec?.batch === 3, slug + ": wrong registry batch");
  check(["IMPLEMENTED","MERGED","DEPLOYED","VERIFIED","NEEDS_FOLLOWUP","BLOCKED"].includes(rec?.status), slug + ": unexpected status " + rec?.status);
  check(new RegExp('^  "' + slug + '": \\{', "m").test(editorial), slug + ": missing editorial object");
  check(countyLinks.includes("slug: '" + slug + "'"), slug + ": missing reciprocal county-page card");
  check(countyEvidence.includes(String.fromCharCode(96) + slug + String.fromCharCode(96)), slug + ": missing campus-county source evidence");
  const path = "docs/football-authority/schools/" + slug + ".md";
  check(existsSync(join(root, path)), slug + ": missing individual audit");
  if (existsSync(join(root, path))) {
    const audit = file(path);
    check(audit.length >= 400, slug + ": very short individual audit");
    check(/https:\/\//.test(audit), slug + ": no source URLs in audit");
  }
}
for (const slug of ["arlington","arlington-bowie","arlington-houston","arlington-lamar","arlington-martin","arlington-seguin"]) {
  check(cityLinks.includes("slug: '" + slug + "'"), slug + ": missing Arlington city reciprocal card");
}
const verifiedPrior = records.filter(x => x.status === "VERIFIED" && x.batch !== 3);
check(verifiedPrior.length >= 30, "fewer than 30 previously VERIFIED schools");
const verified003 = records.filter(x => x.batch === 3 && x.status === "VERIFIED");
check(verified003.length === (registry.batch?.individuallyVerified ?? -1), "verified count disagrees with registry");
if (problems.length) {
  console.error("Batch 003 structural acceptance FAIL:\n" + problems.map(x => "- " + x).join("\n"));
  process.exitCode = 1;
} else {
  console.log("Batch 003 structural acceptance PASS: 25 editorial records, 25 audits, registry status and prior verification preserved.");
  console.log("This does NOT test historical factual accuracy, image rights, deployed pages, browser layout, SEO/schema, reciprocal links or sitemap.");
}
