import fs from 'node:fs';

const collectionRoute = fs.readFileSync('src/routes/shop.$collection.tsx', 'utf8');
const landingRoute = fs.readFileSync('src/routes/shop.index.tsx', 'utf8');

const collectionRequired = [
  '"@type": "ItemList"',
  '"@type": "Product"',
  'numberOfItems: loaderData.products.length',
  'absoluteUrl(texasDefinedBrand, product.image.src)',
  'id={productAnchor(product.id)}',
  'image: loaderData.collection.image.src',
];

const landingRequired = [
  '"@type": "CollectionPage"',
  '"@type": "BreadcrumbList"',
  '"@type": "ItemList"',
  'numberOfItems: loaderData.products.length',
  'image: shopFlatlay',
  'imageAlt: "A curated flat lay of Texas-made goods"',
  'id={productAnchor(product.id)}',
  'absoluteUrl(texasDefinedBrand, product.image.src)',
];

const failures = [
  ...collectionRequired
    .filter((feature) => !collectionRoute.includes(feature))
    .map((feature) => `Collection route missing ${feature}`),
  ...landingRequired
    .filter((feature) => !landingRoute.includes(feature))
    .map((feature) => `Landing route missing ${feature}`),
];

if (collectionRoute.includes('"@type": "Offer"') || landingRoute.includes('"@type": "Offer"')) {
  failures.push('Shop routes must not claim Offer data before checkout is available.');
}

if (failures.length) {
  console.error('Shop structured-data validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Shop structured-data validation passed.');
