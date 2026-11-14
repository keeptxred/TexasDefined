import { readFileSync } from 'node:fs';

const surfaces = [
  ['src/components/events/EventsLandingPage.tsx', [
    'Explore upcoming weekends, seasonal celebrations and annual favorites',
    'Find festivals, fairs, concerts and seasonal outings',
  ]],
  ['src/data/event-temporal-collections.server.ts', [
    'Planning a Friday-through-Sunday getaway in Texas?',
    'organizer',
  ]],
  ['src/data/events/weekend-editorial-package.server.ts', [
    'Here are Texas events to consider for',
    'check the official organizer for updates before you leave',
  ]],
];
const forbidden = [
  'same verified authority catalog',
  'source-checked event authority catalog',
  'current event authority catalog',
  'Crawlable planning collections',
];
const failures = [];
for (const [filename, expected] of surfaces) {
  const text = readFileSync(filename, 'utf8');
  for (const fragment of expected) if (!text.includes(fragment)) failures.push(filename + ': missing useful visitor guidance: ' + fragment);
  for (const fragment of forbidden) if (text.includes(fragment)) failures.push(filename + ': internal publishing language reintroduced: ' + fragment);
}
if (failures.length) {
  for (const failure of failures) console.error(failure);
  process.exit(1);
}
console.log('Event calendar, rolling weekend guide and newsletter visitor-facing copy validated.');
