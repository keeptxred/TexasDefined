import fs from 'node:fs';
import path from 'node:path';

const routesDir = path.join(process.cwd(), 'src/routes');
const routeFiles = fs.readdirSync(routesDir)
  .filter((name) => name.endsWith('.tsx') && !name.startsWith('admin.') && name !== '__root.tsx');

const canonicalHeadPattern = /meta:\s*buildMeta\(texasDefinedBrand,\s*\{([\s\S]*?)\}\),\s*links:\s*\[canonicalLink\(texasDefinedBrand,\s*([^)]+)\)\]/g;
const changed = [];
const unresolved = [];

for (const name of routeFiles) {
  const filePath = path.join(routesDir, name);
  const source = fs.readFileSync(filePath, 'utf8');
  if (!source.includes('buildMeta(') || !source.includes('canonicalLink(') || source.includes('canonicalPath')) continue;

  let replacements = 0;
  const next = source.replace(canonicalHeadPattern, (match, body, canonicalExpression) => {
    replacements += 1;
    const expression = canonicalExpression.trim();
    const normalizedBody = body.trimStart();
    return `meta: buildMeta(texasDefinedBrand, {\n      canonicalPath: ${expression},\n      ${normalizedBody}}),\n    links: [canonicalLink(texasDefinedBrand, ${expression})]`;
  });

  if (replacements === 0 || next === source) {
    unresolved.push(name);
    continue;
  }

  fs.writeFileSync(filePath, next);
  changed.push({ name, replacements });
}

if (unresolved.length) {
  console.error('Canonical metadata codemod could not safely update:');
  for (const name of unresolved) console.error(`- src/routes/${name}`);
  process.exit(1);
}

console.log(`Updated ${changed.length} route files.`);
for (const item of changed) console.log(`- src/routes/${item.name} (${item.replacements})`);
