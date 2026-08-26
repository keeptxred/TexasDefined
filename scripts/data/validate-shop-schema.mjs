import fs from 'node:fs';

const collectionRoute = fs.readFileSync('src/routes/shop.$collection.tsx', 'utf8');
const landingRoute = fs.readFileSync('src/routes/shop.index.tsx', 'utf8');
const productRoute = fs.readFileSync('src/routes/shop.product.$productId.tsx', 'utf8');

const listingUrlSignal = 'product.productUrl || `/shop/product/${encodeURIComponent(product.id)}`';

const collectionRequired = [
  '"@type": "CollectionPage"',
  '"@type": "BreadcrumbList"',
  '"@type": "ItemList"',
  'mainEntity: { "@id": itemListId }',
  'numberOfItems: loaderData.products.length',
  'name: product.name',
  listingUrlSignal,
  'id={productAnchor(product.id)}',
  'image: loaderData.collection.image.src',
];

const landingRequired = [
  '"@type": "CollectionPage"',
  '"@type": "BreadcrumbList"',
  '"@type": "ItemList"',
  'mainEntity: { "@id": productListId }',
  'numberOfItems: loaderData.products.length',
  'name: product.name',
  listingUrlSignal,
  'image: shopFlatlay',
  'imageAlt: "Texas-inspired goods arranged on a tabletop"',
  'id={productAnchor(product.id)}',
];

const productRequired = [
  '"@type": "Product"',
  'offers: (enabled.length ? enabled : [null]).map((variant) => ({',
  '"@type": "Offer"',
  'priceCurrency: product.currency || "USD"',
  'availability: `https://schema.org/${variant ? "InStock" : "OutOfStock"}`',
];

const failures = [
  ...collectionRequired
    .filter((feature) => !collectionRoute.includes(feature))
    .map((feature) => `Collection route missing ${feature}`),
  ...landingRequired
    .filter((feature) => !landingRoute.includes(feature))
    .map((feature) => `Landing route missing ${feature}`),
  ...productRequired
    .filter((feature) => !productRoute.includes(feature))
    .map((feature) => `Product route missing ${feature}`),
];

if (collectionRoute.includes('"@type": "Product"') || landingRoute.includes('"@type": "Product"')) {
  failures.push('Shop listing routes must not embed incomplete Product entities; point ItemList entries at product-detail URLs instead.');
}

if (collectionRoute.includes('"@type": "Offer"') || landingRoute.includes('"@type": "Offer"')) {
  failures.push('Offer schema belongs on product-detail pages, not shop listing routes.');
}

if (failures.length) {
  console.error('Shop structured-data validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Shop structured-data validation passed.');
