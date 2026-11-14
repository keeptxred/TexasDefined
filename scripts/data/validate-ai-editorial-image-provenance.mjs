import fs from 'node:fs';
import path from 'node:path';

// Every item below was generated in the governed raster replacement batch on
// 2026-09-15 and has not since been replaced in the GitHub asset history.
// Never credit an AI-generated image to a photographer or public-domain archive.
const root = process.cwd();
const report = JSON.parse(fs.readFileSync(path.join(root, 'scripts/data/direct-svg-hero-report.json'), 'utf8'));
const expectedCredit = 'AI-generated editorial illustration · Texas Defined (Cloudflare Workers AI / FLUX.1 schnell)';
const assets = [
  'texas-river-basins.jpg',
  'texas-aquifers-springs.jpg',
  'texas-prairies-grasslands.jpg',
  'texas-main-street-downtowns.jpg',
  'texas-courthouse-architecture.jpg',
  'texas-ecoregions-habitats.jpg',
];
const documentaryAlts = new Set(['texas-river-basins.jpg', 'texas-aquifers-springs.jpg']);
const errors = [];

for (const asset of assets) {
  const source = report.images.find(row => row.output === 'public/images/editorial/' + asset);
  if (source?.source !== 'ai-generated') {
    errors.push(asset + ': missing AI-origin evidence from the existing image-generation manifest');
    continue;
  }
  if (source.files.length !== 2) errors.push(asset + ': expected separately reviewed canonical and lazy article records');
  for (const file of source.files) {
    const body = fs.readFileSync(path.join(root, file), 'utf8');
    const anchor = '"/images/editorial/' + asset + '"';
    const first = body.indexOf(anchor);
    if (first < 0 || body.indexOf(anchor, first + anchor.length) >= 0) {
      errors.push(file + ': missing or duplicated hero asset ' + asset);
      continue;
    }
    const hero = body.slice(first + anchor.length, first + anchor.length + 300);
    const credit = hero.match(/\bcredit:\s*"([^"]+)"/);
    if (!credit || credit[1] !== expectedCredit) {
      errors.push(file + ': AI hero has missing or misleading photographer/license credit for ' + asset);
    }
    if (documentaryAlts.has(asset)) {
      const alt = hero.match(/\balt:\s*"([^"]+)"/);
      if (!alt || !alt[1].startsWith('AI-generated')) {
        errors.push(file + ': generated scene must not be described as an actual location photograph for ' + asset);
      }
    }
  }
}
if (errors.length) {
  console.error('AI editorial photo-provenance validation failed:');
  for (const error of errors) console.error('- ' + error);
  process.exit(1);
}
console.log('AI editorial photo-provenance validation passed for six generated heroes across 12 article and stub records.');
