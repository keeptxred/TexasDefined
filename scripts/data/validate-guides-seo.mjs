import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const readRouteSurface = (file) => {
  const eagerSource = read(file);
  const lazyFile = file.replace(/\.tsx$/, '.lazy.tsx');
  return fs.existsSync(path.join(root, lazyFile)) ? `${eagerSource}\n${read(lazyFile)}` : eagerSource;
};
const source = readRouteSurface('src/routes/guides.tsx');
const errors = [];

for (const marker of ['"@type": "CollectionPage"', '"@type": "BreadcrumbList"', '"@type": "ItemList"']) {
  if (!source.includes(marker)) errors.push(`Guides hub must include ${marker}.`);
}

if (!/numberOfItems: (migratedGuides|allFeaturedGuides)\.length/.test(source)) {
  errors.push('Guides ItemList must derive its count from the linked guides array.');
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
