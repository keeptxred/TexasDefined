import fs from 'node:fs';

const county = process.argv[2]?.trim().toLowerCase();
if (!county || !/^[a-z0-9-]+$/.test(county)) {
  console.error('Usage: node scripts/ci/verify-retired-county-certification.mjs <county-slug>');
  process.exit(2);
}

const path = `.github/certification/${county}-county.json`;
if (!fs.existsSync(path)) {
  console.error(`Retired county certification marker is missing: ${path}`);
  process.exit(1);
}

let data;
try {
  data = JSON.parse(fs.readFileSync(path, 'utf8'));
} catch (error) {
  console.error(`Retired county certification marker is not valid JSON: ${path}`);
  console.error(error);
  process.exit(1);
}

const status = String(data.status ?? '').toLowerCase();
const stage = String(data.stage ?? '').toLowerCase();
const markerCounty = String(data.county ?? '').toLowerCase();

if (markerCounty !== county) {
  console.error(`Certification county mismatch: expected ${county}, found ${markerCounty || '(missing)'}.`);
  process.exit(1);
}
if (status !== 'pass' || stage !== 'complete') {
  console.error(`Certification is not complete PASS for ${county}: status=${data.status ?? '(missing)'} stage=${data.stage ?? '(missing)'}.`);
  process.exit(1);
}

console.log(`Retired ${county} County certification remains complete PASS (${path}).`);
