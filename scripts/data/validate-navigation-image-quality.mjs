import fs from 'node:fs';

const source = fs.readFileSync('src/brand/texasdefined.ts', 'utf8');
const failures = [];

function extractGroup(label, expectedCount) {
  const labelMarker = `label: "${label}",`;
  const groupStart = source.indexOf(labelMarker);
  if (groupStart < 0) {
    failures.push(`Missing navigation group: ${label}`);
    return [];
  }

  const childrenStart = source.indexOf('children: [', groupStart);
  if (childrenStart < 0) {
    failures.push(`Navigation group has no children array: ${label}`);
    return [];
  }

  const childrenEnd = source.indexOf('\n      ],', childrenStart);
  if (childrenEnd < 0) {
    failures.push(`Could not locate end of navigation group: ${label}`);
    return [];
  }

  const entries = source
    .slice(childrenStart, childrenEnd)
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('{ label:'));

  if (entries.length !== expectedCount) {
    failures.push(`${label} should have ${expectedCount} child entries; found ${entries.length}.`);
  }
  return entries;
}

function validateGroup(label, expectedCount) {
  const entries = extractGroup(label, expectedCount);
  const seen = new Map();

  for (const entry of entries) {
    const itemLabel = entry.match(/label:\s*"([^"]+)"/)?.[1] ?? 'unknown item';
    if (!entry.includes('image: { src:')) {
      failures.push(`${label} > ${itemLabel} is missing a card image.`);
      continue;
    }
    if (!/alt:\s*"[^"]+"/.test(entry)) {
      failures.push(`${label} > ${itemLabel} is missing useful image alt text.`);
    }

    const src = entry.match(/image:\s*\{\s*src:\s*([^,]+),/)?.[1]?.trim();
    if (!src) {
      failures.push(`${label} > ${itemLabel} image source could not be parsed.`);
      continue;
    }

    const prior = seen.get(src);
    if (prior) {
      failures.push(`${label} reuses the same card image for "${prior}" and "${itemLabel}" (${src}).`);
    } else {
      seen.set(src, itemLabel);
    }
  }
}

validateGroup('Explore', 14);
validateGroup('Texas Life', 10);

if (failures.length) {
  console.error('Navigation image quality validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Navigation image quality validation passed: Explore and Texas Life cards all have unique images and alt text.');
