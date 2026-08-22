import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dataDir = path.join(root, "src/data");

const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const list = (re) => fs.readdirSync(dataDir).filter((name) => re.test(name));
const join = (names) => names.map((name) => fs.readFileSync(path.join(dataDir, name), "utf8")).join("\n");
const allSlugs = (text) => new Set([...text.matchAll(/\bslug:\s*["']([^"']+)["']/g)].map((m) => m[1]));
const quoted = (text) => [...text.matchAll(/["']([^"']+)["']/g)].map((m) => m[1]);

function arrayValues(text, property) {
  const values = [];
  const re = new RegExp(`${property}\\s*:\\s*\\[([^\\]]*)\\]`, "g");
  for (const match of text.matchAll(re)) values.push(...quoted(match[1]));
  return values;
}

function fail(message) {
  console.error(`Painted Churches graph integrity: ${message}`);
  process.exitCode = 1;
}

const featureFiles = list(/^painted-church-features(?!-index).*\.ts$/);
const peopleFiles = list(/^painted-church-people(?!-types).*\.ts$/);
const featureText = join(featureFiles);
const peopleText = join(peopleFiles);
const people = allSlugs(peopleText);

for (const contributor of new Set(arrayValues(featureText, "contributorSlugs"))) {
  if (!people.has(contributor)) fail(`feature contributor '${contributor}' has no authority person/studio record`);
}

const techniqueText = read("src/data/painted-church-techniques.ts");
const techniques = allSlugs(techniqueText);
for (const technique of new Set(arrayValues(featureText, "techniqueSlugs"))) {
  if (!techniques.has(technique)) fail(`feature technique '${technique}' has no technique authority record`);
}

const symbolText = read("src/data/painted-church-symbols.ts");
const symbols = allSlugs(symbolText);
for (const symbol of new Set(arrayValues(featureText, "symbolSlugs"))) {
  if (!symbols.has(symbol)) fail(`feature symbol '${symbol}' has no symbol authority record`);
}

const churchText = [
  read("src/data/painted-churches.ts"),
  read("src/data/painted-churches-expanded-legacy.ts"),
  read("src/data/painted-churches-preindex-expansion.ts"),
].join("\n");
const churches = allSlugs(churchText);
for (const church of new Set([...featureText.matchAll(/churchSlug:\s*["']([^"']+)["']/g)].map((m) => m[1]))) {
  if (!churches.has(church)) fail(`feature church '${church}' is not in the verified/canonical church corpus`);
}

if (!process.exitCode) {
  console.log(`Painted Churches graph integrity passed: ${featureFiles.length} feature modules, ${people.size} contributor entities, ${techniques.size} techniques, ${symbols.size} symbols.`);
}
