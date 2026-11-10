import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const component = readFileSync('src/components/content/BudaWienerDogSpotlight.tsx','utf8');
const route = readFileSync('src/routes/$kind.$slug.lazy.tsx','utf8');
const required = [
  '19 feet', '10 feet', '400 individual',
  'Cor-Ten', '1997', 'April 2027',
  '204 San Antonio Road', '6 a.m. to 10 p.m.',
  'voting has closed', 'name will be announced',
  'https://www.budaedc.com/news/the-buda-edc-celebrates-25th-anniversary-with-larger-than-life-sculpture/',
  'https://www.budaedc.com/wiener-dog-statue/',
  'https://www.budatx.gov/285/City-Park',
  '/county/hays'
];
for (const snippet of required) {
  assert.ok(component.includes(snippet),'Missing first-party source/visitor detail: '+snippet);
}
assert.match(route,/entity\.kind === 'city' && entity\.slug === 'buda' \? <BudaWienerDogSpotlight \/>/);
assert.match(route,/import \{ BudaWienerDogSpotlight \}/);
assert.ok(!/https?:\/\/texasdefined\.com\/(?:news|article)\/\S*buda/i.test(component),'Do not manufacture a second news URL');
assert.ok(!/winner is|has been officially named/i.test(component),'Naming contest still awaiting official announcement');
assert.ok(!component.includes('5 acres'),'Conflicting official park acreage should not be invented');
console.log('Buda permanent visitor spotlight primary-source and canonical-route contract passed.');
