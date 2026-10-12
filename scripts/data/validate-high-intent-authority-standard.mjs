import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const files = {
  a: read("src/data/fixtures/texas-high-intent-guides-a.ts"),
  b: read("src/data/fixtures/texas-high-intent-guides-b.ts"),
  evidence: read("src/data/fixtures/texas-high-intent-authority-evidence.ts"),
  links: read("src/data/fixtures/texas-high-intent-guide-links.ts"),
  factory: read("src/data/fixtures/texas-high-intent-guide-factory.ts"),
  category: read("src/components/editorial/ExploreTopicPaths.tsx"),
  destination: read("src/routes/destination.$slug.tsx"),
  articleBody: read("src/components/editorial/ArticleBody.tsx"),
  panel: read("src/components/editorial/HighIntentGuideEvidencePanel.tsx"),
  readiness: read("src/data/fixtures/texas-gateway-index-readiness.ts"),
  loader: read("src/data/fixtures/lazy-texas-gateway.ts"),
};
const failures = [];
const requireCheck = (condition, message) => { if (!condition) failures.push(message); };
function parseGuideSpecs(source, filename) {
  const match = source.match(/const specs: Omit<HighIntentGuideSpec, "hero">\[\] = (\[[\s\S]*?\]);\nexport/);
  if (!match) throw new Error("Cannot parse " + filename);
  return JSON.parse(match[1]);
}
function parseJsonRegistry(name) {
  const rx = new RegExp("const " + name + ": Record<number, [^=]+ = (\\{[\\s\\S]*?\\});\\nconst ");
  const match = files.evidence.match(rx);
  if (!match) throw new Error("Cannot parse " + name);
  return JSON.parse(match[1]);
}
const guides = [...parseGuideSpecs(files.a, "guides a"), ...parseGuideSpecs(files.b, "guides b")];
const facts = parseJsonRegistry("facts");
const photos = parseJsonRegistry("photoSpecs");
const related = parseJsonRegistry("related");
const numbers = guides.map((g) => g.number);
const slugs = guides.map((g) => g.slug);
requireCheck(guides.length === 10, "Expected ten launch guides");
requireCheck(new Set(numbers).size === 10, "Guide numbers must be distinct");
requireCheck(new Set(slugs).size === 10, "Guide slugs must be distinct");
requireCheck(numbers.every((n) => n >= 106 && n <= 115), "Incorrect launch guide identifiers");
for (const guide of guides) {
  const n = String(guide.number);
  const words = [guide.introduction, guide.method, ...guide.picks.flatMap((p) => [p.title, p.advice]), guide.logistics, guide.caveats, guide.conclusion].join(" ").trim().split(/\s+/).length;
  requireCheck(words >= 1000, `#${n} needs >=1000 meaningful words outside evidence cards (found ${words})`);
  requireCheck(guide.picks.length >= 10, `#${n} must compare >=10 distinct destinations`);
  requireCheck(guide.picks.every((p) => p.title && p.advice.trim().split(/\s+/).length >= 45), `#${n} has thin destination planning`);
  requireCheck(guide.links.length >= 4 && guide.links.every((x) => x.href.startsWith("/")), `#${n} missing internal navigation`);
  requireCheck(guide.sources.length >= 2 && guide.sources.every((x) => x.url.startsWith("https://")), `#${n} missing base research sources`);
  requireCheck((facts[n] ?? []).length >= 3, `#${n} missing verified factual reference cards`);
  requireCheck((facts[n] ?? []).every((x) => x[2]?.startsWith("https://") && x[0] && x[1]), `#${n} malformed primary source evidence`);
  requireCheck((photos[n] ?? []).length >= 3, `#${n} missing actual subject imagery`);
  requireCheck((photos[n] ?? []).every((p) => p[0] === "park" || (p[0] === "commons" && p.length === 6 && /CC BY/.test(p[3]) && p[4] >= 1200)), `#${n} unlicensed or ungoverned images`);
  requireCheck((related[n] ?? []).length >= 3, `#${n} missing relevant inbound/outbound destination relationships`);
  requireCheck(files.links.includes(`${n}: { slug: "${guide.slug}"`), `#${n} missing canonical guide routing metadata`);
  requireCheck(files.articleBody.includes(`"${guide.slug}"`), `#${n} missing visible provenance panel registration`);
  requireCheck(files.category.includes(`/article/${guide.slug}`), `#${n} missing inbound Explore category guide link`);
}
for (const [label, content, marker] of [
  ["guide factory", files.factory, "guideEvidenceFor(spec.number)"],
  ["guide fact cards", files.factory, 'Verified facts and figures at a glance'],
  ["sitewide guide gate", files.readiness, "isNewAuthorityGuideCandidate"],
  ["sitewide guide gate enforcement", files.readiness, "meetsNewAuthorityGuideStandard(article)"],
  ["image credits", files.panel, "Photo origins and reuse licenses"],
  ["fact provenance", files.panel, "fact.sourceUrl"],
  ["category backlinks", files.category, "HIGH_INTENT_TOPIC_PATHS"],
  ["destination backlinks", files.destination, "highIntentGuideLinksForDestination(destination.slug)"],
  ["lazy source loader a", files.loader, 'import("./texas-high-intent-guides-a")'],
  ["lazy source loader b", files.loader, 'import("./texas-high-intent-guides-b")'],
]) requireCheck(content.includes(marker), `Missing required ${label} contract`);

if (failures.length) {
  console.error("High-intent authority standard failed:\n" + failures.map((m) => " - " + m).join("\n"));
  process.exit(1);
}
console.log(`High-intent authority standard verified for ${guides.length} guides, ${Object.values(facts).flat().length} source-backed facts, ${Object.values(photos).flat().length} governed photo references, ${Object.values(related).flat().length} relationships.\nAll new best-of and guide editorial articles are governed by the sitewide index readiness gate.`);
