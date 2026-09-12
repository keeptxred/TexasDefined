import fs from 'node:fs';

// Keep this authority guard aligned with the eager route, lazy page, answer renderer, and legacy SEO/depth validators.
const dataPath = 'src/data/texas-explained-questions.ts';
const componentPath = 'src/components/editorial/TexasExplainedQuestionsPage.tsx';
const pagePath = 'src/components/editorial/TexasExplainedPage.tsx';
const parentPath = 'src/routes/texas-explained.tsx';
const publicRoutesPath = 'src/lib/public-routes.ts';
const retiredServerDataPath = 'src/data/texas-explained-questions.server.ts';
const retiredFunctionsPath = 'src/data/texas-explained-questions.functions.ts';
const retiredChildRoutePath = 'src/routes/texas-explained_.questions.tsx';

const data = fs.readFileSync(dataPath, 'utf8');
const component = fs.readFileSync(componentPath, 'utf8');
const page = fs.readFileSync(pagePath, 'utf8');
const parent = fs.readFileSync(parentPath, 'utf8');
const publicRoutes = fs.readFileSync(publicRoutesPath, 'utf8');

const questionCount = (data.match(/question:\s*"/g) ?? []).length;
const answerCount = (data.match(/answer:\s*"/g) ?? []).length;
const categoryCount = new Set([...data.matchAll(/category:\s*"([^"]+)"/g)].map((match) => match[1])).size;
const parentCountMatch = parent.match(/const questionCount = (\d+);/);
const pageCountMatch = page.match(/const questionCount = (\d+);/);
const failures = [];

if (questionCount < 100) failures.push(`Expected at least 100 questions; found ${questionCount}.`);
if (answerCount !== questionCount) failures.push(`Every question must have an answer; found ${answerCount} answers for ${questionCount} questions.`);
if (categoryCount < 8) failures.push(`Expected broad topical coverage across at least 8 categories; found ${categoryCount}.`);
if (!parentCountMatch || Number(parentCountMatch[1]) !== questionCount) failures.push(`Texas Explained route count must match the ${questionCount}-question library.`);
if (!pageCountMatch || Number(pageCountMatch[1]) !== questionCount) failures.push(`Texas Explained page count must match the ${questionCount}-question library.`);
if (fs.existsSync(retiredServerDataPath)) failures.push('Retired server-only question registry must not be restored; the registry belongs exclusively in the lazy renderer graph.');
if (fs.existsSync(retiredFunctionsPath)) failures.push('Dedicated Texas Explained question server function must remain removed to protect the main client bundle budget.');
if (fs.existsSync(retiredChildRoutePath)) failures.push('Do not restore a dedicated /texas-explained/questions route; the library belongs inside /texas-explained to protect the client bundle budget.');

const requiredQuestions = [
  'Why are Texas roads called FM and RM roads?',
  'What is a MUD district in Texas?',
  'Why do Texans wear homecoming mums?',
  'What is a kolache versus a klobasnek?',
  'Why does Texas have so many frontage roads?',
  'Why does Texas have so many counties?',
  'How does Texas property tax work?',
  'What is a Texas water district?',
  'What are the regions of Texas?',
  'Why are Texas flags flown the way they are?',
  'What is a Texas county seat?',
  'What is a Texas school district?',
  'What makes Texas barbecue different?',
  'Why do so many Texas towns have courthouse squares?',
  'What is a farm-to-market road?',
];

for (const question of requiredQuestions) {
  if (!data.includes(`question: "${question}"`)) failures.push(`Missing required question: ${question}`);
}

for (const marker of [
  'lazy(() => import("@/components/editorial/TexasExplainedPage"))',
  '<Suspense fallback={null}>',
  '<TexasExplainedPage />',
]) {
  if (!parent.includes(marker)) failures.push(`Texas Explained route missing lazy-shell marker: ${marker}`);
}
if (parent.includes('texas-explained-questions')) failures.push('The eager Texas Explained route must not import or request the question registry.');
if (parent.includes('/texas-explained/questions')) failures.push('Texas Explained route must not link to the retired child route.');

for (const marker of [
  'useLoaderData({ from: "/texas-explained" })',
  'lazy(() => import("@/components/editorial/TexasExplainedQuestionsPage"))',
  '<Suspense fallback={null}><TexasExplainedQuestionLibrary /></Suspense>',
  'href="#texas-questions"',
  'everyday answers',
  'Land and water',
  'Built Texas',
  'People and place',
  'Read together, the guides form a working explanation of the state.',
  'to="/explore"',
  'to="/texas-resources"',
  'aria-label="Texas Explained sections"',
  'Jump to',
  'href="#quick-answers"',
  'href="#land-and-water"',
  'href="#built-texas"',
  'href="#people-and-place"',
  'href="#go-deeper"',
  'id="quick-answers"',
  'id: "land-and-water"',
  'id: "built-texas"',
  'id: "people-and-place"',
  'id={section.id}',
  'id="go-deeper"',
  'scroll-mt-28',
  'const quickAnswers = [',
  'Quick answers',
  'Six Texas questions, answered before you dive deeper',
  'What are the major rivers of Texas?',
  '/article/texas-rivers-explained',
  'See the major rivers and basins',
  'Why are most Texas lakes man-made?',
  'What is a farm-to-market road?',
  'Why do so many Texas towns have courthouse squares?',
  'Why does Texas feel so different from one region to another?',
  'Why do Texas homes and land decisions depend so much on location?',
  'const supportingExplainers = [',
  'Go deeper',
  'Six supporting explainers',
  'These sit outside the core 10-guide series',
  '/article/texas-regions-explained',
  '/explore/landscapes/where-does-texas-turn-into-desert',
  '/article/why-texas-has-254-counties',
  '/article/texas-hill-country-what-makes-it',
  '/article/best-native-plants-texas-yard',
  '/article/texas-barbecue-styles-explained',
]) {
  if (!page.includes(marker)) failures.push(`Lazy Texas Explained page missing SEO/content marker: ${marker}`);
}
if (page.includes('texas-explained-questions.ts')) failures.push('The lazy page shell should not eagerly import the answer registry; keep it behind the nested lazy question renderer.');

for (const marker of [
  'TEXAS_EXPLAINED_QUESTIONS',
  '@/data/texas-explained-questions',
  'const questions = TEXAS_EXPLAINED_QUESTIONS',
  'id="texas-questions"',
  'categories.map',
  'item.answer',
  'item.href',
  'Questions without a deep-dive link are still answered here instead of being turned into thin standalone pages.',
]) {
  if (!component.includes(marker)) failures.push(`Lazy question renderer missing marker: ${marker}`);
}
if (component.includes('useLoaderData')) failures.push('Lazy question renderer must own the lazy question registry instead of requesting it through route loader data.');

if (!publicRoutes.includes('"/texas-explained"')) failures.push('Texas Explained must remain an indexable static public route.');
if (publicRoutes.includes('"/texas-explained/questions"')) failures.push('Retired Texas Explained child route must not remain in the public-route registry.');

if (failures.length) {
  console.error('Texas Explained question authority validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Texas Explained question authority OK: ${questionCount} questions across ${categoryCount} categories, all answered inside the indexable parent page, with the page shell and answer registry isolated behind lazy client chunks and no dedicated question server-function stub in main.`);
