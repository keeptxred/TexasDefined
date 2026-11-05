import assert from "node:assert/strict";
import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");
const shop = read("src/routes/sitemap-shop[.]xml.ts");
const catalog = read("src/data/shop-products-remote.ts");
const product = read("src/routes/shop.product.$productId.tsx");
const merchant = read("src/routes/google-merchant-feed[.]xml.ts");
const searchVerifier = read("scripts/seo/verify-search-production.mjs");
const robots = read("public/robots.txt");
const index = read("public/sitemap-index.xml");

// Canonical product-detail pages (not size/color variant URLs) must
// have a full, dedicated search sitemap advertised in both registries.
assert.match(shop, /createFileRoute\("\/sitemap-shop\.xml"\)/);
assert.match(shop, /fetchAllPublishedShopProductsForIndexing/);
assert.match(shop, /\/shop\/product\/\$\{encodeURIComponent\(product\.id\)\}/);
assert.match(shop, /status:\s*503/); // Never silently erase product inventory on outage.
assert.match(product, /rel:\s*"canonical"/);
assert.match(product, /fetchAssignedShopProducts\(\{ id: params\.productId \}\)/);
assert.match(index, /<loc>https:\/\/texasdefined\.com\/sitemap-shop\.xml<\/loc>/);
assert.match(robots, /Sitemap: https:\/\/texasdefined\.com\/sitemap-shop\.xml/);
assert.match(catalog, /url\.searchParams\.set\("limit", String\(pageSize\)\)/);
assert.match(catalog, /url\.searchParams\.set\("offset", String\(offset\)\)/);
assert.match(catalog, /if \(!response\.ok\) throw new Error/);
assert.match(catalog, /if \(seen\.has\(row\.id\)\) throw/);
assert.match(merchant, /fetchAllPublishedShopProductsForIndexing/);
const expectedFeeds = [...index.matchAll(/<sitemap><loc>https:\/\/texasdefined\.com(\/[^<]+)<\/loc><\/sitemap>/g)].map((m) => m[1]);
const searchFeedList = searchVerifier.match(/const SITEMAPS = \[([^\]]+)\]/)?.[1];
assert.ok(searchFeedList, "Production search verifier must declare governed sitemap list");
const verifiedFeeds = [...searchFeedList.matchAll(/['"](\/[^'"]+)['"]/g)].map((m) => m[1]);
assert.deepEqual(verifiedFeeds, expectedFeeds, "Production search verifier and sitemap-index.xml must contain exactly the same owned feeds in order");

console.log("PASS: every published shop product is eligible for canonical sitemap and Merchant feed coverage, with stable pagination and non-silent upstream failure.");
