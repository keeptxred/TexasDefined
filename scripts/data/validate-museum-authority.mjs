#!/usr/bin/env node
// Museum authority contract: no dependencies and no paid services.
// New museum destination records in a PR require a full verified dossier.
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const read = (path) => readFileSync(path, "utf8");
const src = read("src/data/museum-authority-network.ts");
const failures = [];
const required = [
  "bullock-texas-state-history-museum",
  "perot-museum-nature-science-dallas",
  "witte-museum",
  "museum-of-the-big-bend-alpine",
  "panhandle-plains-historical-museum-canyon",
  "george-ranch-historical-park",
  "texas-maritime-museum-rockport",
  "national-museum-pacific-war",
  "frontier-texas",
  "texas-energy-museum-beaumont",
];
const manifestStart = src.indexOf("export const museumAuthorityDossiers");
const manifestEnd = src.indexOf("\n};\n\nexport const museumAuthorityDirectory", manifestStart);
if (manifestStart < 0 || manifestEnd < 0) {
  console.error("Museum dossier manifest cannot be identified.");
  process.exit(1);
}
const allDossiers = [...src.slice(manifestStart, manifestEnd).matchAll(/^  "([a-z0-9-]+)": \{/gm)].map((m) => m[1]);
if (new Set(allDossiers).size !== allDossiers.length) failures.push("Duplicate museum authority dossier keys.");
function dossier(slug) {
  const start = src.indexOf('  "' + slug + '": {');
  if (start < 0) return "";
  const next = src.indexOf('\n  "', start + slug.length + 8);
  const end = next < 0 ? src.indexOf('\n};', start) : next;
  return src.slice(start, end);
}
function section(entry, key) {
  const index = entry.indexOf(key + ": [");
  if (index < 0) return "";
  const tail = entry.slice(index + key.length + 3);
  const end = tail.indexOf("\n    ],");
  return end < 0 ? "" : tail.slice(0, end);
}
function value(entry, key) {
  const expression = new RegExp("\\b" + key + '\\s*:\\s*"([^"\\n]*)"');
  return entry.match(expression)?.[1] || "";
}
for (const slug of new Set([...required, ...allDossiers])) {
  const entry = dossier(slug);
  if (!entry) { failures.push("No museum dossier for " + slug); continue; }
  for (const key of ["name", "slug", "county", "city", "reviewed", "whyVisit", "visitorStrategy", "accessibility", "familiesAndGroups", "researchValue"]) {
    if (!value(entry, key)) failures.push(slug + ": missing " + key);
  }
  if (value(entry, "slug") !== slug) failures.push(slug + ": canonical slug mismatches key");
  const reviewed = Date.parse(value(entry, "reviewed"));
  if (!Number.isFinite(reviewed) || reviewed > Date.now() + 86400000 || Date.now() - reviewed > 365 * 86400000)
    failures.push(slug + ": invalid/stale source review date");
  for (const key of ["whyVisit", "visitorStrategy", "accessibility", "familiesAndGroups", "researchValue"]) {
    if (value(entry, key).length < 100) failures.push(slug + ": thin " + key);
  }
  const topics = entry.match(/\btopics:\s*\[([^\]]*)\]/)?.[1] || "";
  const topicValues = [...topics.matchAll(/"([a-z-]+)"/g)].map((match) => match[1]);
  if (new Set(topicValues).size < 2) failures.push(slug + ": at least two distinct research topics needed for automatic peer-museum linking");
  const exhibits = section(entry, "exhibits");
  const routes = section(entry, "routes");
  const sources = section(entry, "sources");
  const links = section(entry, "connections");
  const exhibitCount = (exhibits.match(/heading: "/g) || []).length;
  if (exhibitCount < 1 || exhibitCount > 10 || (exhibits.match(/detail: "/g) || []).length !== exhibitCount)
    failures.push(slug + ": include 1–10 meaningful, briefly interpreted exhibit/topic highlights; do not inventory museum collections.");
  const routeCount = (routes.match(/label: "/g) || []).length;
  if (routeCount < 1 || routeCount > 4 || (routes.match(/steps: \[/g) || []).length !== routeCount)
    failures.push(slug + ": provide 1–4 useful visit plans suited to this actual museum, never invented routes.");
  const urls = [...sources.matchAll(/url: "(https:\/\/[^"]+)"/g)].map((x) => x[1]);
  if (new Set(urls).size < 2 || urls.some((x) => x.includes("example.com") || x.includes("wikipedia.org")))
    failures.push(slug + ": fewer than two distinct authoritative source URLs");
  const hrefs = [...links.matchAll(/href: "(\/[^"]+)"/g)].map((x) => x[1]);
  if (hrefs.length < 2 || !hrefs.some((x) => x.startsWith("/county/")))
    failures.push(slug + ": county and context cross-links required");
}
for (const [path, marker] of [
  ["src/data/destination-preserved-catalog.ts", "museumAuthorityDestinations"],
  ["src/data/destination-query-runtime.ts", "enrichMuseumAuthority"],
  ["src/components/editorial/DestinationRelationships.tsx", "MuseumAuthorityNetworkSection"],
  ["src/routes/destination.$slug.tsx", "museumDossierFor"],
  ["src/routes/$kind.$slug.lazy.tsx", "CountyCityMuseums"],
]) {
  if (!read(path).includes(marker)) failures.push("Missing museum integration in " + path);
}
if (!read("src/data/museum-authority-new-destinations.ts").includes('slug: "george-ranch-historical-park"'))
  failures.push("Missing George Ranch destination record");

// Museum FAQs are a researched publishing requirement, not generated boilerplate.
const faqSource = read("src/data/museum-visitor-faqs.ts");
const faqMatch = faqSource.match(/export const museumVisitorFaqs: Record<string, MuseumVisitorFaq\[\]> = (\{[\s\S]*?\});\nexport const museumVisitorFaqFor/);
if (!faqMatch) failures.push("Museum FAQ registry must remain machine-readable and referenced in the UI.");
let faqRegistry = {};
try { faqRegistry = JSON.parse(faqMatch?.[1] ?? "{}"); } catch { failures.push("Museum FAQ registry cannot be parsed."); }
for (const slug of allDossiers) {
  const faqs = faqRegistry[slug] ?? [];
  if (faqs.length < 4 || faqs.length > 16) failures.push(slug + ": need a researched, appropriately scoped FAQ (4–16 genuine questions, not a fixed template).");
  const unique = new Set();
  let independentlyDiscovered = 0;
  for (const faq of faqs) {
    if (typeof faq.question !== "string" || faq.question.length < 18 ||
        typeof faq.answer !== "string" || faq.answer.length < 80)
      failures.push(slug + ": a FAQ has a thin question or unsourced short answer.");
    const normalized = (faq.question || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    if (unique.has(normalized)) failures.push(slug + ": duplicate FAQ question.");
    unique.add(normalized);
    if (!["museum-faq", "visitor-qna", "editorial-research"].includes(faq.questionOrigin))
      failures.push(slug + ": FAQ question origin must be documented.");
    if (faq.questionOrigin !== "museum-faq") independentlyDiscovered++;
    if (!/^https:\/\/[^/]+/.test(faq.verificationUrl || "") ||
        !/^https:\/\/[^/]+/.test(faq.questionEvidenceUrl || ""))
      failures.push(slug + ": FAQ source URL missing.");
    if (!["monthly", "quarterly"].includes(faq.reviewCycle)) failures.push(slug + ": FAQ needs its fact review cadence.");
    const date = Date.parse(faq.reviewed || "");
    if (!Number.isFinite(date) || date > Date.now() + 86400000 || Date.now() - date > 365 * 86400000)
      failures.push(slug + ": FAQ needs a real recent review date.");
  }
  if (independentlyDiscovered < 2) failures.push(slug + ": do not stop at the operator's FAQ; research other visitor questions.");
}
if (!read("src/components/editorial/MuseumAuthorityNetworkSection.tsx").includes("museumVisitorFaqFor"))
  failures.push("Museum-specific FAQs must render on live museum guide templates.");

const base = process.env.MUSEUM_AUTHORITY_BASE_REF;
if (base) {
  try {
    const diff = execFileSync("git", ["diff", "--no-ext-diff", "--unified=8", base + "...HEAD", "--", "src/data"], { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
    const added = diff.split("\n").filter((line) => line.startsWith("+") && !line.startsWith("+++")).map((line) => line.slice(1)).join("\n");
    const found = new Set();
    for (const match of added.matchAll(/slug:\s*"([a-z0-9-]+)"/g)) {
      const slug = match[1];
      const context = added.slice(Math.max(0, match.index - 300), match.index + 450);
      if (/(museum|historical-park|science-center)/i.test(slug) ||
          /name:\s*["'][^"'\n]*(museum|historical park|science center)[^"'\n]*["']/i.test(context)) {
        found.add(slug);
      }
    }
    for (const match of added.matchAll(/"[^"]+",\s*"([a-z0-9-]+)",\s*"([^"]+)"/g)) {
      if (/(museum|historical park|science center)/i.test(match[2])) found.add(match[1]);
    }
    for (const slug of found) {
      if (!dossier(slug)) failures.push("NEW museum destination " + slug + " lacks museum authority dossier. See docs/museum-authority-standard.md");
    }
  } catch (error) {
    failures.push("Cannot validate changed museum records against " + base + ": " + String(error));
  }
}
if (failures.length) {
  console.error("Museum authority gate FAILED:\n" + failures.map((x) => " - " + x).join("\n"));
  process.exit(1);
}
console.log("Museum authority gate PASSED: " + allDossiers.length + " museum guides + cross-links + new-museum rule.");
