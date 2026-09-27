import fs from 'node:fs';

const seo = fs.readFileSync('src/lib/seo.ts', 'utf8');
const governedSeoPathMatches = [...seo.matchAll(/^\s{2}"(\/[^"\n]+)":\s*\{/gm)].map((match) => match[1]);

if (governedSeoPathMatches.length < 100) {
  console.error(`Governed SEO duplicate-path validation failed: expected a substantial override inventory, found ${governedSeoPathMatches.length} parsed paths.`);
  process.exit(1);
}

const duplicates = [...new Set(
  governedSeoPathMatches.filter((path, index, all) => all.indexOf(path) !== index),
)].sort();

if (duplicates.length) {
  console.error('Governed SEO duplicate-path validation failed:');
  for (const path of duplicates) console.error(`- Duplicate governed SEO override path: ${path}`);
  process.exit(1);
}

console.log(`Governed SEO override path validation passed: ${governedSeoPathMatches.length} unique paths and no duplicate object-literal route keys.`);
