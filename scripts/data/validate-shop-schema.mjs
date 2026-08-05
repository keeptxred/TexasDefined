import fs from 'node:fs';

const route = fs.readFileSync('src/routes/shop.$collection.tsx', 'utf8');
const required = [
  '"@type": "ItemList"',
  '"@type": "Product"',
  'numberOfItems: loaderData.products.length',
  'absoluteUrl(texasDefinedBrand, product.image.src)',
  'id={productAnchor(product.id)}',
  'image: loaderData.collection.image.src',
];

const missing = required.filter((feature) => !route.includes(feature));
if (missing.length) {
  console.error('Shop collection schema validation failed:');
  for (const feature of missing) console.error(`- Missing ${feature}`);
  process.exit(1);
}

if (route.includes('"@type": "Offer"')) {
  console.error('Shop collection schema must not claim Offer data before checkout is available.');
  process.exit(1);
}

console.log('Shop collection structured-data validation passed.');
