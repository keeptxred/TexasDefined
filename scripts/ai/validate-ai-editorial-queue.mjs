import fs from 'node:fs';

const QUEUE_PATH = 'ops/ai/texas-defined-ai-editorial-queue.generated.json';
const ALLOWED_ACTIONS = new Set([
  'improve-existing-surface',
  'review-existing-surface',
  'research-new-surface',
]);

if (!fs.existsSync(QUEUE_PATH)) {
  console.log('Texas Defined AI editorial queue validator: no generated queue is present; nothing to validate.');
  process.exit(0);
}

let queue;
try {
  queue = JSON.parse(fs.readFileSync(QUEUE_PATH, 'utf8'));
} catch {
  console.error('Texas Defined AI editorial queue validator: generated queue is not valid JSON.');
  process.exit(1);
}

const failures = [];
if (queue.schemaVersion !== 1) failures.push('schemaVersion must remain 1');
if (!String(queue.privacy ?? '').includes('Raw or sanitized user questions are never written')) failures.push('privacy boundary text is missing');
if (!String(queue.publicationBoundary ?? '').includes('may not publish or auto-merge')) failures.push('publication boundary text is missing');
if (!Array.isArray(queue.items)) failures.push('items must be an array');
if (queue.items?.length > 20) failures.push('editorial queue must stay capped at 20 items');

const forbiddenKeys = new Set(['question', 'questions', 'rawQuestion', 'sanitizedQuestion', 'questionText', 'prompt', 'userPrompt']);
const piiPatterns = [
  /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i,
  /\b(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}\b/,
  /\[(?:email|phone|address)\]/i,
];

function walk(value, location = 'root') {
  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, `${location}[${index}]`));
    return;
  }
  if (!value || typeof value !== 'object') {
    if (typeof value === 'string') {
      for (const pattern of piiPatterns) {
        if (pattern.test(value)) failures.push(`${location} contains text that looks like private question data`);
      }
    }
    return;
  }
  for (const [key, child] of Object.entries(value)) {
    if (forbiddenKeys.has(key)) failures.push(`${location}.${key} is forbidden because user question text must stay private`);
    walk(child, `${location}.${key}`);
  }
}
walk(queue);

for (const [index, item] of (queue.items ?? []).entries()) {
  if (item.rank !== index + 1) failures.push(`items[${index}] rank must be ${index + 1}`);
  if (!item.topic || !item.category) failures.push(`items[${index}] requires topic and category`);
  if (!Number.isFinite(item.demandScore) || item.demandScore < 0) failures.push(`items[${index}] has invalid demandScore`);
  if (!ALLOWED_ACTIONS.has(item.recommendedAction)) failures.push(`items[${index}] has unsupported recommendedAction`);
  if (!Array.isArray(item.authoritativeSources) || !item.authoritativeSources.length) failures.push(`items[${index}] must retain authoritative research sources`);
  if (item.publicationStatus !== 'research-and-review-required') failures.push(`items[${index}] must remain research-and-review-required`);

  if (item.recommendedAction === 'research-new-surface' && item.target !== null) {
    failures.push(`items[${index}] research-new-surface must not name an existing target`);
  }
  if (item.recommendedAction !== 'research-new-surface') {
    if (!item.target || typeof item.target.title !== 'string' || typeof item.target.href !== 'string' || !item.target.href.startsWith('/')) {
      failures.push(`items[${index}] existing-surface actions require a valid internal target`);
    }
  }
}

if (failures.length) {
  console.error('Texas Defined AI editorial queue validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Texas Defined AI editorial queue validation passed: ranked actions contain only generalized demand signals, preserve authoritative-source targets, and remain human-review-only.');
