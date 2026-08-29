import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const files = [
  "src/data/fixtures/texas-gateway-articles.ts",
  "src/data/fixtures/texas-gateway-articles-batch2.ts",
  "src/data/fixtures/texas-gateway-lifestyle-batch3.ts",
  "src/data/fixtures/texas-gateway-lifestyle-batch4.ts",
  "src/data/fixtures/texas-gateway-lifestyle-batch5.ts",
  "src/data/fixtures/texas-gateway-lifestyle-batch6.ts",
  "src/data/fixtures/texas-gateway-regional-batch7.ts",
  "src/data/fixtures/texas-gateway-bestof-batch8.ts",
  "src/data/fixtures/texas-gateway-bestof-batch9.ts",
  "src/data/fixtures/texas-gateway-itinerary-batch10.ts",
  "src/data/fixtures/texas-gateway-decision-batch11.ts",
  "src/data/fixtures/texas-gateway-decision-batch12.ts",
  "src/data/fixtures/texas-gateway-decision-batch13.ts",
  "src/data/fixtures/texas-gateway-occasion-batch14.ts",
  "src/data/fixtures/texas-gateway-monthly-batch15.ts",
  "src/data/fixtures/texas-gateway-identity-batch16.ts",
];

const wordCount = (value) => value.trim().split(/\s+/).filter(Boolean).length;
const looksNonEditorial = (value) => {
  const text = value.trim();
  return !text
    || text.startsWith("/")
    || /^https?:\/\//i.test(text)
    || /^gateway[-_]/i.test(text)
    || /^[a-z0-9]+(?:-[a-z0-9]+){1,}$/i.test(text)
    || /^[a-z-]+$/.test(text) && !text.includes(" ");
};

function stringValues(node, values = []) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    if (!looksNonEditorial(node.text)) values.push(node.text);
    return values;
  }
  if (ts.isTemplateExpression(node)) {
    const combined = [node.head.text, ...node.templateSpans.map((span) => span.literal.text)].join(" ");
    if (!looksNonEditorial(combined)) values.push(combined);
    return values;
  }
  ts.forEachChild(node, (child) => {
    stringValues(child, values);
  });
  return values;
}

function articleIdentity(node) {
  let id = null;
  let slug = null;
  const strings = [];
  function visit(current) {
    if (ts.isPropertyAssignment(current) && ts.isIdentifier(current.name)) {
      if (current.name.text === "id" && ts.isStringLiteral(current.initializer)) id = current.initializer.text;
      if (current.name.text === "slug" && ts.isStringLiteral(current.initializer)) slug = current.initializer.text;
    }
    ts.forEachChild(current, visit);
  }
  visit(node);
  if (ts.isCallExpression(node)) {
    const first = node.arguments[0];
    const second = node.arguments[1];
    if (!id && first && ts.isStringLiteral(first) && first.text.startsWith("gateway")) id = first.text;
    if (!slug && second && ts.isStringLiteral(second)) slug = second.text;
  }
  strings.push(...stringValues(node));
  return { id, slug, estimatedWords: strings.reduce((sum, value) => sum + wordCount(value), 0), sample: strings.slice(0, 3).join(" | ") };
}

const rows = [];
for (const file of files) {
  const sourceText = fs.readFileSync(file, "utf8");
  const source = ts.createSourceFile(file, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  let foundArray = false;
  source.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) return;
    for (const declaration of node.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || !/texasGateway.*Articles/i.test(declaration.name.text)) continue;
      if (!declaration.initializer || !ts.isArrayLiteralExpression(declaration.initializer)) continue;
      foundArray = true;
      for (const element of declaration.initializer.elements) {
        const identity = articleIdentity(element);
        if (!identity.slug) continue;
        rows.push({ file: path.basename(file), ...identity });
      }
    }
  });
  if (!foundArray) console.warn(`WARN depth audit did not find a gateway article array in ${file}`);
}

rows.sort((a, b) => a.estimatedWords - b.estimatedWords);
const bins = [
  [0, 149],
  [150, 299],
  [300, 499],
  [500, 799],
  [800, Infinity],
];
console.log(`Gateway depth audit: ${rows.length} article declarations measured (conservative source-string estimate)`);
for (const [min, max] of bins) {
  const count = rows.filter((row) => row.estimatedWords >= min && row.estimatedWords <= max).length;
  console.log(`${min}-${max === Infinity ? "+" : max} estimated words: ${count}`);
}
console.log("\n20 thinnest conservative estimates:");
for (const row of rows.slice(0, 20)) {
  console.log(`${String(row.estimatedWords).padStart(4)}  ${row.slug}  (${row.file})`);
}
console.log("\nNOTE: helper-generated fixed boilerplate is intentionally not credited to individual call expressions, while labels/list text inside each declaration are counted. Treat this as a conservative triage signal, not a publication word-count measurement.");
