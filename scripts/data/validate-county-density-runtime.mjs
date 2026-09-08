import fs from 'node:fs';

const profile = fs.readFileSync('src/data/county-profile.ts', 'utf8');
const guide = fs.readFileSync('src/components/content/CountyGuideSections.tsx', 'utf8');

const required = [
  [profile, 'export function formatDensity(value: number) {', 'county profile must export the shared density formatter'],
  [guide, "import { formatDensity, type CountyProfile } from '@/data/county-profile';", 'county guide must import the shared density formatter'],
  [guide, 'formatDensity(profile.populationDensityPerSquareMile)', 'county guide must format density through the shared formatter'],
];

for (const [source, needle, message] of required) {
  if (!source.includes(needle)) throw new Error(message);
}

console.log('County density runtime contract passed.');
