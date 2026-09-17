import fs from 'node:fs';

const path = 'ops/ai/texas-defined-ai-demand.generated.json';
if (!fs.existsSync(path)) {
  console.log('Texas Defined AI demand report validator: no generated report is present; nothing to validate.');
  process.exit(0);
}

const raw = fs.readFileSync(path, 'utf8');
let report;
try {
  report = JSON.parse(raw);
} catch {
  console.error('Texas Defined AI demand report validator: generated report is not valid JSON.');
  process.exit(1);
}

const failures = [];
if (report.schemaVersion !== 1) failures.push('schemaVersion must remain 1');
if (!String(report.privacy ?? '').includes('Raw or sanitized user questions are never written')) failures.push('privacy boundary text is missing');
if (!String(report.publicationBoundary ?? '').includes('may not publish or auto-merge')) failures.push('publication boundary text is missing');
if (!Array.isArray(report.opportunities)) failures.push('opportunities must be an array');
if (report.opportunities?.length > 40) failures.push('opportunity count must stay capped at 40');

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
    if (forbiddenKeys.has(key)) failures.push(`${location}.${key} is forbidden because raw question text must stay private`);
    walk(child, `${location}.${key}`);
  }
}
walk(report);

for (const [index, opportunity] of (report.opportunities ?? []).entries()) {
  if (!opportunity.topic || !opportunity.category) failures.push(`opportunities[${index}] requires topic and category`);
  if (!Number.isFinite(opportunity.demandScore) || opportunity.demandScore < 0) failures.push(`opportunities[${index}] has invalid demandScore`);
  if (!Array.isArray(opportunity.authoritativeSources) || !opportunity.authoritativeSources.length) failures.push(`opportunities[${index}] must identify authoritative research sources`);
  if (opportunity.publicationStatus !== 'research-and-review-required') failures.push(`opportunities[${index}] must remain research-and-review-required`);
}

if (failures.length) {
  console.error('Texas Defined AI demand report validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Texas Defined AI demand report validation passed: only generalized trend/gap intelligence is persisted, private question text stays out of the repository, and publication remains review-gated.');
