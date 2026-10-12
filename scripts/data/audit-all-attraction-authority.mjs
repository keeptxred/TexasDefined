import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const dir = path.join(root, "src/data");
const out = process.env.ATTRACTION_AUDIT_OUTPUT || "artifacts/attraction-authority-source-inventory.json";
const reviewDate = new Date().toISOString().slice(0, 10);
const rows = new Map();

function visitFiles(folder) {
  return fs.readdirSync(folder, { withFileTypes: true }).flatMap(entry => {
    const target = path.join(folder, entry.name);
    if (entry.isDirectory()) return ["__tests__", "generated", "node_modules"].includes(entry.name) ? [] : visitFiles(target);
    return entry.name.endsWith(".ts") && !entry.name.endsWith(".d.ts") ? [target] : [];
  });
}
function nameOf(node) {
  return node && (ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNumericLiteral(node)) ? node.text : "";
}
function stringOf(node) { return node && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) ? node.text : undefined; }
function prop(node, name) {
  return node.properties.find(item => ts.isPropertyAssignment(item) && nameOf(item.name) === name);
}
function record(slug, file, fields, origin) {
  if (!/^[a-z0-9][a-z0-9-]{2,}$/.test(slug)) return;
  const current = rows.get(slug) || { slug, files: [], evidence: {}, originKinds: [] };
  if (!current.files.includes(file)) current.files.push(file);
  if (!current.originKinds.includes(origin)) current.originKinds.push(origin);
  for (const field of fields) current.evidence[field] = true;
  rows.set(slug, current);
}

const files = visitFiles(dir);
for (const file of files) {
  if (!/(destination|attraction|museum|historic|cavern|state-park|aquarium|wildlife|coastal|town|lighthouse|top-texas)/.test(path.basename(file))) continue;
  const relative = path.relative(root, file).replaceAll(path.sep, "/");
  const source = fs.readFileSync(file, "utf8");
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  function traverse(node) {
    if (ts.isObjectLiteralExpression(node)) {
      const fields = node.properties.map(item => ts.isPropertyAssignment(item) ? nameOf(item.name) : "").filter(Boolean);
      const slug = stringOf(prop(node, "slug")?.initializer);
      // Full destination records must provide a real identity and a recognizable
      // destination field, not just a random link referring to a slug.
      if (slug && fields.includes("name") && (fields.includes("summary") || fields.includes("coordinates"))) {
        record(slug, relative, fields, "destination-record");
      }
      // Curation-by-slug object literals are overrides of preserved canonical
      // records; they are not themselves proof that a public route exists.
      if (ts.isPropertyAssignment(node.parent)) {
        const key = nameOf(node.parent.name);
        if (/^[a-z0-9][a-z0-9-]+$/.test(key) && ["summary","entryNote","body","areaGuide","authorityGuide","officialUrl"].some(field=>fields.includes(field))) {
          record(key, relative, fields, "destination-curation");
        }
      }
    }
    ts.forEachChild(node, traverse);
  }
  traverse(ast);
}
// Top-25 authority is applied dynamically and should count as authority evidence,
// not be incorrectly marked as absent merely because the base record omits it.
const topAuthoritySource = fs.readFileSync(path.join(dir, "destination-authority-top-attractions.ts"), "utf8");
const topKeys = [...topAuthoritySource.matchAll(/^\s{2}"([a-z0-9-]+)": \{/gm)].map(x=>x[1]);
for (const slug of topKeys) record(slug, "src/data/destination-authority-top-attractions.ts", ["authorityGuide"], "authority-overlay");
const enriched = fs.readFileSync(path.join(dir, "destination-curation-attraction-authority-20261012.ts"), "utf8");
for (const match of enriched.matchAll(/^  "([a-z0-9-]+)": \{/gm)) record(match[1], "src/data/destination-curation-attraction-authority-20261012.ts", ["authorityGuide"], "authority-overlay");
const verified = fs.readFileSync(path.join(dir, "destination-visitor-facilities.ts"), "utf8");
for (const match of verified.matchAll(/^  "([a-z0-9-]+)": \{/gm)) record(match[1], "src/data/destination-visitor-facilities.ts", ["visitorFacilities"], "visitor-facilities");

const raw = [...rows.values()].filter(row => row.originKinds.some(kind=>kind === "destination-record" || kind === "destination-curation"));
const flags = [
  ["authorityGuide", "needs-authority-assessment"],
  ["visitorFacilities", "needs-parking-restroom-map-research"],
  ["county", "county-context-review"],
  ["hero", "image-license-review"],
  ["officialUrl", "operator-source-review"],
];
const catalog = raw.map(row=>({
  slug: row.slug,
  files: row.files.sort(),
  originKinds: row.originKinds,
  sourceSignals: row.evidence,
  possibleGaps: flags.filter(([field])=>!row.evidence[field]).map(([, gap])=>gap)
})).sort((a,b)=>b.possibleGaps.length-a.possibleGaps.length||a.slug.localeCompare(b.slug));
const knownTop25NotFound = topKeys.filter(slug=>!raw.some(x=>x.slug === slug));
const issueCounts = Object.fromEntries(flags.map(([,issue])=>[issue,catalog.filter(row=>row.possibleGaps.includes(issue)).length]));
const report = {
  generatedAt: reviewDate,
  limitation: "Static TypeScript source inventory, not a live Supabase census or proof of on-site facility status. Composite records, dynamic overlays, and remote-only entries need separate verification; lack of a literal field is an investigation flag rather than confirmed absence.",
  sourceFilesInspected: files.length,
  destinationCandidates: catalog.length,
  top25AuthorityRegistryCount: topKeys.length,
  top25NotLocatedInStaticCandidateRecords: knownTop25NotFound,
  issueCounts,
  candidates: catalog
};
fs.mkdirSync(path.dirname(path.resolve(root,out)), { recursive: true });
fs.writeFileSync(path.resolve(root,out), JSON.stringify(report,null,2)+"\n");
console.log(JSON.stringify({
  generatedAt: reviewDate, sourceFilesInspected: files.length, destinationCandidates: catalog.length,
  knownTop25NotLocated: knownTop25NotFound.length, issueCounts, output: out
},null,2));
if (process.argv.includes("--strict") && knownTop25NotFound.length) process.exitCode = 1;
