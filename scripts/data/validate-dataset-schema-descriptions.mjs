import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

// Check every source-level Dataset JSON-LD declaration, not just the URL
// named in a Search Console email. Reference-only @id nodes need no @type.
const root = path.resolve('src');
const errors = [];
let datasetCount = 0;

function filesUnder(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return filesUnder(full);
    return /\.(tsx?|jsx?)$/.test(entry.name) ? [full] : [];
  });
}

function propertyName(name) {
  if (!name) return undefined;
  if (ts.isIdentifier(name) || ts.isStringLiteral(name)) return name.text;
  return undefined;
}

function checkFile(file) {
  const source = fs.readFileSync(file, 'utf8');
  if (!source.includes('Dataset') || !source.includes('@type')) return;
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true,
    file.endsWith('.tsx') || file.endsWith('.jsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  function visit(node) {
    if (ts.isObjectLiteralExpression(node)) {
      const type = node.properties.find((property) =>
        ts.isPropertyAssignment(property) && propertyName(property.name) === '@type');
      if (type && ts.isPropertyAssignment(type) &&
          ts.isStringLiteral(type.initializer) && type.initializer.text === 'Dataset') {
        datasetCount += 1;
        const description = node.properties.find((property) =>
          (ts.isPropertyAssignment(property) || ts.isShorthandPropertyAssignment(property)) &&
          propertyName(property.name) === 'description');
        const missing = !description ||
          (ts.isPropertyAssignment(description) &&
            (description.initializer.kind === ts.SyntaxKind.NullKeyword ||
             (ts.isIdentifier(description.initializer) && description.initializer.text === 'undefined') ||
             (ts.isStringLiteral(description.initializer) && !description.initializer.text.trim())));
        if (missing) {
          const line = ast.getLineAndCharacterOfPosition(node.getStart(ast)).line + 1;
          errors.push(`${path.relative(process.cwd(), file)}:${line}: Dataset missing nonempty description`);
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
}

for (const file of filesUnder(root)) checkFile(file);

// Google Search Console's November 2026 Dataset appearance warnings identify
// these two specific pages. Keep ownership and versioned reuse terms explicit
// without incorrectly licensing the underlying government data.
const metadataContracts = [
  ['src/routes/texas-property-tax-rate-history.tsx',
    ['creator:', 'publisher:', 'isBasedOn:', 'license: absoluteUrl(texasDefinedBrand, \'/dataset-reference-license-v1.txt\')']],
  ['src/routes/things-unique-to-texas.tsx',
    ['creator:', 'license: `${origin}/dataset-reference-license-v1.txt`']],
  ['src/routes/citation-guide.tsx',
    ['href="/dataset-reference-license-v1.txt"']],
];
for (const [file, required] of metadataContracts) {
  const source = fs.readFileSync(file, 'utf8');
  for (const marker of required) {
    if (!source.includes(marker)) errors.push(`${file}: missing Dataset ownership or licensing contract: ${marker}`);
  }
}
const licenseNotice = fs.readFileSync('public/dataset-reference-license-v1.txt', 'utf8');
for (const marker of ['Version 1.0', 'Texas Comptroller', 'not relicensed', 'admin@texasdefined.com']) {
  if (!licenseNotice.includes(marker)) errors.push(`Dataset reference terms missing: ${marker}`);
}

if (datasetCount < 10) errors.push(`Unexpectedly found only ${datasetCount} Dataset declarations`);
if (errors.length) {
  console.error('Dataset structured-data validation failed:\n' + errors.map((e) => '- ' + e).join('\n'));
  process.exit(1);
}
console.log(`Dataset structured data validated: ${datasetCount} declarations have descriptions.`);
