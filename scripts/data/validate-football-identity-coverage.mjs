import fs from 'node:fs';

const path = 'src/data/high-school-football/school-identities.ts';
const source = fs.readFileSync(path, 'utf8');
const errors = [];
const required = [
  'weatherford',
  'keller',
  'keller-central',
  'keller-timber-creek',
  'northwest',
  'northwest-eaton',
  'northwest-nelson',
  'denton-braswell',
  'frisco-wakeland',
  'lewisville-flower-mound',
];

const slugs = [...source.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1]);
const unique = new Set(slugs);

if (slugs.length !== unique.size) errors.push(`Football identity slugs are not unique: ${slugs.length} rows / ${unique.size} unique.`);
if (unique.size < 70) errors.push(`Verified football identity coverage fell below 70 profiles; found ${unique.size}.`);

for (const slug of required) {
  if (!unique.has(slug)) errors.push(`Missing verified 6A football identity: ${slug}`);
}

for (const marker of [
  "sourceUrl: 'https://www.weatherfordisd.com/",
  "sourceUrl: 'https://khs.kellerisd.net/our-school'",
  "sourceUrl: 'https://chs.kellerisd.net/our-school'",
  "sourceUrl: 'https://tchs.kellerisd.net/our-school'",
  "sourceUrl: 'https://nhs.nisdtx.org/our-school/about-us'",
  "sourceUrl: 'https://ehs.nisdtx.org/our-school/about-us'",
  "sourceUrl: 'https://bnhs.nisdtx.org/our-school/about-us'",
  "sourceUrl: 'https://braswellhs.dentonisd.org/our-school'",
  "sourceUrl: 'https://sf2.friscoisd.org/campus/high-school/wakeland/home'",
  "sourceUrl: 'https://www.lisd.net/",
]) {
  if (!source.includes(marker)) errors.push(`Football identity coverage missing source marker: ${marker}`);
}

if (errors.length) {
  console.error('Football identity coverage validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Football identity coverage validation passed: ${unique.size} verified profiles.`);
