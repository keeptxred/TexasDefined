import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const collectionDir = path.join(
  ROOT,
  'ops/editorial/texas-themed-content-backlog/250-texas-stories',
);

const expectedHeader = [
  'id',
  'source_number',
  'part',
  'part_title',
  'source_page',
  'source_title',
  'source_summary',
  'working_slug',
  'content_type',
  'priority',
  'freshness',
  'editorial_risk',
  'verification_status',
  'publish_approved',
];

const expectedParts = new Map([
  [1, 'Music, Food & Cultural Legends'],
  [2, 'Outlaws, Frontier & Wild West Lore'],
  [3, 'Sports Glory & Iconic Games'],
  [4, 'Science, Space & Big Industry'],
  [5, 'Town Oddities, Natural Wonders & Mysteries'],
]);

function fail(message) {
  console.error(`250 Texas Stories backlog validation failed: ${message}`);
  process.exit(1);
}

function parseCsvLine(line) {
  const cells = [];
  let cell = '';
  let quoted = false;

  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];

    if (quoted) {
      if (ch === '"' && line[i + 1] === '"') {
        cell += '"';
        i += 1;
      } else if (ch === '"') {
        quoted = false;
      } else {
        cell += ch;
      }
      continue;
    }

    if (ch === '"') {
      quoted = true;
    } else if (ch === ',') {
      cells.push(cell);
      cell = '';
    } else {
      cell += ch;
    }
  }

  if (quoted) fail('encountered an unterminated quoted CSV field');
  cells.push(cell);
  return cells;
}

const rows = [];

for (const [part, expectedTitle] of expectedParts) {
  const file = path.join(collectionDir, `part-${part}.csv`);
  if (!fs.existsSync(file)) fail(`missing ${path.relative(ROOT, file)}`);

  const raw = fs.readFileSync(file, 'utf8').trimEnd();
  const lines = raw.split(/\r?\n/);
  if (lines.length !== 51) {
    fail(`part-${part}.csv must contain 1 header + 50 rows; found ${lines.length} lines`);
  }

  const header = parseCsvLine(lines[0]);
  if (header.join('\u0000') !== expectedHeader.join('\u0000')) {
    fail(`part-${part}.csv header does not match the governed schema`);
  }

  for (const line of lines.slice(1)) {
    const values = parseCsvLine(line);
    if (values.length !== expectedHeader.length) {
      fail(`part-${part}.csv row has ${values.length} columns; expected ${expectedHeader.length}`);
    }

    const row = Object.fromEntries(expectedHeader.map((key, index) => [key, values[index]]));
    const sourceNumber = Number(row.source_number);

    if (!Number.isInteger(sourceNumber)) fail(`invalid source_number ${row.source_number}`);
    if (Number(row.part) !== part) fail(`${row.id} is stored in the wrong part file`);
    if (row.part_title !== expectedTitle) fail(`${row.id} has an unexpected part_title`);
    if (row.id !== `td-story-${String(sourceNumber).padStart(3, '0')}`) {
      fail(`${row.id} does not match source_number ${sourceNumber}`);
    }
    if (!row.source_title.trim()) fail(`${row.id} is missing source_title`);
    if (!row.source_summary.trim()) fail(`${row.id} is missing source_summary`);
    if (!row.working_slug.trim()) fail(`${row.id} is missing working_slug`);
    if (!Number.isInteger(Number(row.source_page)) || Number(row.source_page) < 1 || Number(row.source_page) > 12) {
      fail(`${row.id} has an invalid source_page`);
    }
    if (row.content_type !== 'story_candidate') fail(`${row.id} content_type must remain story_candidate`);
    if (row.priority !== 'pending-review') fail(`${row.id} priority must remain pending-review`);
    if (row.freshness !== 'evergreen') fail(`${row.id} freshness must remain evergreen`);
    if (row.editorial_risk !== 'source-claim-needs-verification') {
      fail(`${row.id} editorial_risk must remain source-claim-needs-verification`);
    }
    if (row.verification_status !== 'needs-research') {
      fail(`${row.id} verification_status must remain needs-research`);
    }
    if (row.publish_approved !== 'no') fail(`${row.id} must remain publish_approved=no`);

    rows.push(row);
  }
}

if (rows.length !== 250) fail(`expected 250 rows; found ${rows.length}`);

const sourceNumbers = rows.map((row) => Number(row.source_number)).sort((a, b) => a - b);
for (let expected = 1; expected <= 250; expected += 1) {
  if (sourceNumbers[expected - 1] !== expected) {
    fail(`source_number sequence must be exactly 1-250; missing or duplicated ${expected}`);
  }
}

const ids = new Set(rows.map((row) => row.id));
if (ids.size !== 250) fail('ids must be unique');

const slugs = new Set(rows.map((row) => row.working_slug));
if (slugs.size !== 250) fail('working_slug values must be unique');

for (const part of expectedParts.keys()) {
  const count = rows.filter((row) => Number(row.part) === part).length;
  if (count !== 50) fail(`part ${part} must contain exactly 50 rows; found ${count}`);
}

console.log('250 Texas Stories backlog validation passed: 250 fail-closed story candidates across 5 parts.');
