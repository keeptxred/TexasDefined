import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const source = fs.readFileSync(path.join(root, 'src/routes/guides.tsx'), 'utf8');
const errors = [];

for (const marker of ['"@type": "CollectionPage"', '"@type": "BreadcrumbList"', '"@type": "ItemList"']) {
  if (!source.includes(marker)) errors.push(`Guides hub must include ${marker}.`);
}

if (!source.includes('numberOfItems: migratedGuides.length')) {
  errors.push('Guides ItemList must derive its count from the linked migrated guides.');
}

if (!source.includes('id={guideAnchor(index)}')) {
  errors.push('Guides schema anchors must match stable DOM anchors.');
}

if (!source.includes('"@type": "WebPage"')) {
  errors.push('Linked guide entries must be represented as WebPage entities.');
}

if (source.includes('"@type": "Offer"') || source.includes('"@type": "FinancialProduct"')) {
  errors.push('Guides hub must not claim Offer or FinancialProduct structured data.');
}

if (errors.length) {
  console.error('TexasDefined guides SEO validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('TexasDefined guides hub structured data is valid.');
