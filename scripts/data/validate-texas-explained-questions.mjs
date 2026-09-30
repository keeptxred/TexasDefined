import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const data = read('src/data/texas-explained-questions.ts');
const component = read('src/components/editorial/TexasExplainedQuestionsPage.tsx');
const hub = read('src/components/editorial/TexasExplainedPage.tsx');
const parent = read('src/routes/texas-explained.tsx');
const parentLazy = read('src/routes/texas-explained.lazy.tsx');
const questionsRoute = read('src/routes/texas-explained_.questions.tsx');
const questionsLazy = read('src/routes/texas-explained_.questions.lazy.tsx');
const publicRoutes = read('src/lib/public-routes.ts');

const questionCount = (data.match(/question:\s*"/g) ?? []).length;
const answerCount = (data.match(/answer:\s*"/g) ?? []).length;
const categoryCount = new Set([...data.matchAll(/category:\s*"([^"]+)"/g)].map((match) => match[1])).size;
const failures = [];

if (questionCount !== 140) failures.push(`Expected exactly 140 questions; found ${questionCount}.`);
if (answerCount !== questionCount) failures.push(`Expected one answer per question; found ${answerCount} answers for ${questionCount} questions.`);
if (categoryCount < 8) failures.push(`Expected at least 8 topic groups; found ${categoryCount}.`);

for (const [label, source, markers] of [
  ['parent route', parent, ['createFileRoute("/texas-explained")', 'buildEditorialCollectionHead']],
  ['parent lazy route', parentLazy, ['createLazyFileRoute("/texas-explained")', 'TexasExplainedPage']],
  ['hub', hub, ['useSuspenseQuery(articlesQuery())', 'to="/texas-explained/questions"', 'const questionCount = 140;', 'Land and water', 'Built Texas', 'People and place']],
  ['questions route', questionsRoute, ['const canonicalPath = "/texas-explained/questions";', 'createFileRoute(canonicalPath)', 'canonicalLink(texasDefinedBrand, canonicalPath)']],
  ['questions lazy route', questionsLazy, ['createLazyFileRoute("/texas-explained/questions")', 'TexasExplainedQuestionsPage']],
  ['questions component', component, ['TEXAS_EXPLAINED_QUESTIONS', 'categories.map', 'item.answer', 'item.href', 'to="/texas-explained"']],
]) {
  for (const marker of markers) if (!source.includes(marker)) failures.push(`${label} missing marker: ${marker}`);
}

if (!publicRoutes.includes('"/texas-explained"')) failures.push('Texas Explained must remain an indexable static public route.');
if (!publicRoutes.includes('"/texas-explained/questions"')) failures.push('Texas Explained question library must be registered as an indexable static public route.');
if (hub.includes('TexasExplainedQuestionLibrary')) failures.push('The full 140-answer renderer must not be embedded in the flagship hub.');
if (hub.includes('@/data/texas-explained-questions')) failures.push('The flagship hub must not eagerly import the question registry.');
for (const phrase of ['Dedicated pages are reserved', 'Questions without a deep-dive link', 'As a subject earns deeper treatment']) {
  if (component.includes(phrase)) failures.push(`Reader-facing question library exposes internal editorial strategy: ${phrase}`);
}
for (const retiredPath of ['src/data/texas-explained-questions.server.ts', 'src/data/texas-explained-questions.functions.ts']) {
  if (fs.existsSync(retiredPath)) failures.push(`Retired question implementation must remain removed: ${retiredPath}`);
}

if (failures.length) {
  console.error('Texas Explained question authority validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Texas Explained question authority OK: ${questionCount} questions across ${categoryCount} categories on a dedicated lazy-loaded library, with the flagship hub focused on the core guide collection and both routes registered for indexing.`);
