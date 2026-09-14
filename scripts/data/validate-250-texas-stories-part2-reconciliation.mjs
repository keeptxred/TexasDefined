import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const collectionDir = path.join(ROOT, 'ops/editorial/texas-themed-content-backlog/250-texas-stories');
const sourcePath = path.join(collectionDir, 'part-2.csv');
const reconciliationPath = path.join(collectionDir, 'part-2-reconciliation.csv');

const sourceHeader = [
  'id', 'source_number', 'part', 'part_title', 'source_page', 'source_title', 'source_summary',
  'working_slug', 'content_type', 'priority', 'freshness', 'editorial_risk', 'verification_status', 'publish_approved',
];

const reconciliationHeader = [
  'source_number', 'source_title', 'coverage_status', 'canonical_route', 'secondary_route',
  'recommended_action', 'claim_review', 'publish_decision', 'notes',
];

const actionByStatus = new Map([
  ['existing-authority', 'keep-existing-route'],
  ['existing-cluster', 'expand-existing-route'],
  ['existing-destination', 'expand-existing-route'],
  ['candidate-new-article', 'research-new-article'],
  ['claim-risk-hold', 'hold-for-verification'],
  ['route-review-needed', 'confirm-route-before-development'],
]);

const routeRequiredStatuses = new Set(['existing-authority', 'existing-cluster', 'existing-destination']);
const routeForbiddenStatuses = new Set(['candidate-new-article', 'claim-risk-hold', 'route-review-needed']);

function fail(message) {
  console.error(`250 Texas Stories Part 2 reconciliation validation failed: ${message}`);
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
    if (ch === '"') quoted = true;
    else if (ch === ',') {
      cells.push(cell);
      cell = '';
    } else cell += ch;
  }

  if (quoted) fail('encountered an unterminated quoted CSV field');
  cells.push(cell);
  return cells;
}

function loadCsv(file, expectedHeader, expectedLineCount) {
  if (!fs.existsSync(file)) fail(`missing ${path.relative(ROOT, file)}`);
  const lines = fs.readFileSync(file, 'utf8').trimEnd().split(/\r?\n/);
  if (lines.length !== expectedLineCount) {
    fail(`${path.basename(file)} must contain ${expectedLineCount} lines; found ${lines.length}`);
  }
  const header = parseCsvLine(lines[0]);
  if (header.join('\u0000') !== expectedHeader.join('\u0000')) {
    fail(`${path.basename(file)} header does not match the governed schema`);
  }
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    if (values.length !== expectedHeader.length) {
      fail(`${path.basename(file)} row has ${values.length} columns; expected ${expectedHeader.length}`);
    }
    return Object.fromEntries(expectedHeader.map((key, index) => [key, values[index]]));
  });
}

const sourceRows = loadCsv(sourcePath, sourceHeader, 51);
const reconciliationRows = loadCsv(reconciliationPath, reconciliationHeader, 51);
const sourceByNumber = new Map(sourceRows.map((row) => [Number(row.source_number), row]));

if (sourceByNumber.size !== 50) fail('part-2.csv must expose 50 unique source_number values');

const seen = new Set();
for (const row of reconciliationRows) {
  const sourceNumber = Number(row.source_number);
  if (!Number.isInteger(sourceNumber) || sourceNumber < 51 || sourceNumber > 100) {
    fail(`invalid source_number ${row.source_number}`);
  }
  if (seen.has(sourceNumber)) fail(`duplicate source_number ${sourceNumber}`);
  seen.add(sourceNumber);

  const source = sourceByNumber.get(sourceNumber);
  if (!source) fail(`source_number ${sourceNumber} does not exist in part-2.csv`);
  if (row.source_title !== source.source_title) {
    fail(`source_number ${sourceNumber} title drifted from the preserved source`);
  }

  const expectedAction = actionByStatus.get(row.coverage_status);
  if (!expectedAction) fail(`source_number ${sourceNumber} has invalid coverage_status ${row.coverage_status}`);
  if (row.recommended_action !== expectedAction) {
    fail(`source_number ${sourceNumber} action ${row.recommended_action} does not match ${row.coverage_status}`);
  }

  if (routeRequiredStatuses.has(row.coverage_status) && !row.canonical_route.startsWith('/')) {
    fail(`source_number ${sourceNumber} ${row.coverage_status} requires an absolute canonical_route`);
  }
  if (routeForbiddenStatuses.has(row.coverage_status) && row.canonical_route) {
    fail(`source_number ${sourceNumber} ${row.coverage_status} must not claim a canonical_route before reconciliation`);
  }
  if (row.secondary_route && !row.secondary_route.startsWith('/')) {
    fail(`source_number ${sourceNumber} secondary_route must be empty or absolute`);
  }
  if (!row.claim_review.trim()) fail(`source_number ${sourceNumber} is missing claim_review`);
  if (!row.notes.trim()) fail(`source_number ${sourceNumber} is missing reconciliation notes`);
  if (row.publish_decision !== 'hold') {
    fail(`source_number ${sourceNumber} must remain publish_decision=hold`);
  }
}

for (let expected = 51; expected <= 100; expected += 1) {
  if (!seen.has(expected)) fail(`reconciliation is missing source_number ${expected}`);
}

const counts = new Map();
for (const row of reconciliationRows) {
  counts.set(row.coverage_status, (counts.get(row.coverage_status) ?? 0) + 1);
}

console.log(
  `250 Texas Stories Part 2 reconciliation passed: 50 source-matched rows remain fail-closed. ` +
  [...counts.entries()].map(([status, count]) => `${status}=${count}`).join(', '),
);
