import fs from 'node:fs';

const dataPath = 'src/data/texas-explained-questions.ts';
const componentPath = 'src/components/editorial/TexasExplainedQuestionsPage.tsx';
const pagePath = 'src/components/editorial/TexasExplainedPage.tsx';
const parentPath = 'src/routes/texas-explained.tsx';
const lazyRoutePath = 'src/routes/texas-explained.lazy.tsx';
const childRoutePath = 'src/routes/texas-explained_.questions.tsx';
const childLazyRoutePath = 'src/routes/texas-explained_.questions.lazy.tsx';
const retiredServerDataPath = 'src/data/texas-explained-questions.server.ts';
const retiredFunctionsPath = 'src/data/texas-explained-questions.functions.ts';

const data = fs.readFileSync(dataPath, 'utf8');
const component = fs.readFileSync(componentPath, 'utf8');
const page = fs.readFileSync(pagePath, 'utf8');
const parent = fs.readFileSync(parentPath, 'utf8');
const lazyRoute = fs.readFileSync(lazyRoutePath, 'utf8');
const childRoute = fs.readFileSync(childRoutePath, 'utf8');
const childLazyRoute = fs.readFileSync(childLazyRoutePath, 'utf8');

const questionCount = (data.match(/question:\s*"/g) ?? []).length;
const answerCount = (data.match(/answer:\s*"/g) ?? []).length;
const categoryCount = new Set([...data.matchAll(/category:\s*"([^"]+)"/g)].map((match) => match[1])).size;
const parentCountMatch = parent.match(/const questionCount = (\d+);/);
const pageCountMatch = page.match(/const questionCount = (\d+);/);
const failures = [];

if (questionCount !== 140) failures.push(`Expected exactly 140 questions; found ${questionCount}.`);
if (answerCount !== questionCount) failures.push(`Every question must have an answer; found ${answerCount} answers for ${questionCount} questions.`);
if (categoryCount < 8) failures.push(`Expected broad topical coverage across at least 8 categories; found ${categoryCount}.`);
if (!parentCountMatch || Number(parentCountMatch[1]) !== questionCount) failures.push(`Texas Explained route count must match the ${questionCount}-question library.`);
if (!pageCountMatch || Number(pageCountMatch[1]) !== questionCount) failures.push(`Texas Explained page count must match the ${questionCount}-question library.`);
if (fs.existsSync(retiredServerDataPath)) failures.push('Retired server-only question registry must not be restored.');
if (fs.existsSync(retiredFunctionsPath)) failures.push('Dedicated Texas Explained question server function must remain removed.');

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
  'How many teams make the Texas high school football playoffs?',
  'What does bi-district mean in Texas high school football?',
  'How are 6A Division I and Division II playoff teams chosen?',
  'How is Texas six-man football different from 11-man football?',
  'What is the 45-point rule in Texas six-man football?',
  'Why is a kick worth two points in Texas six-man football?',
  'Where can I find current Texas high school football scores and schedules?',
  'Does the UIL Texas Scoreboard show official district standings?',
  'Why might a Texas high school football score be missing from the UIL scoreboard?',
  'When is Texas high school football district certification in 2026?',
  'When do the 2026 Texas high school football playoffs start?',
  'When are the 2026 Texas high school football state championships?',
];
for (const question of requiredQuestions) {
  if (!data.includes(`question: "${question}"`)) failures.push(`Missing required question: ${question}`);
}

for (const marker of [
  'createFileRoute("/texas-explained")',
  'const questionCount = 140;',
  'buildEditorialCollectionHead',
  'import("@/data/queries")',
  'import("@/components/editorial/TexasExplainedPage")',
  'if (!import.meta.env.SSR) return null;',
]) {
  if (!parent.includes(marker)) failures.push(`Texas Explained eager route missing marker: ${marker}`);
}
for (const forbidden of ['lazy(() =>', '<Suspense', '<TexasExplainedPage', 'texas-explained-questions']) {
  if (parent.includes(forbidden)) failures.push(`Texas Explained eager route must stay presentation-free; found: ${forbidden}`);
}

for (const marker of [
  'createLazyFileRoute("/texas-explained")',
  'import TexasExplainedPage from "@/components/editorial/TexasExplainedPage"',
  'component: TexasExplainedPage',
]) {
  if (!lazyRoute.includes(marker)) failures.push(`Texas Explained native lazy route missing marker: ${marker}`);
}

for (const marker of [
  'useSuspenseQuery(articlesQuery())',
  'const { data: catalog } = useSuspenseQuery(articlesQuery());',
  'to="/texas-explained/questions"',
  'Browse {questionCount} Texas questions',
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
  'Popular questions',
  'Six quick answers to common Texas questions',
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
  'Six more ways to understand Texas',
  '/article/texas-regions-explained',
  '/explore/landscapes/where-does-texas-turn-into-desert',
  '/article/why-texas-has-254-counties',
  '/article/texas-hill-country-what-makes-it',
  '/article/best-native-plants-texas-yard',
  '/article/texas-barbecue-styles-explained',
]) {
  if (!page.includes(marker)) failures.push(`Texas Explained page missing SEO/content marker: ${marker}`);
}
if (page.includes('TexasExplainedQuestionLibrary')) failures.push('The 140-answer renderer must not be embedded in the flagship Texas Explained hub.');
if (page.includes('texas-explained-questions.ts')) failures.push('The flagship page must not eagerly import the answer registry.');
if (page.includes('useLoaderData')) failures.push('The lazy page must own its article query instead of depending on eager route loader data.');

for (const marker of [
  'TEXAS_EXPLAINED_QUESTIONS',
  '@/data/texas-explained-questions',
  'const questions = TEXAS_EXPLAINED_QUESTIONS',
  'categories.map',
  'item.answer',
  'item.href',
  'A reference library for the questions Texans and newcomers actually ask.',
  'Start with Texas Explained',
]) {
  if (!component.includes(marker)) failures.push(`Question library renderer missing marker: ${marker}`);
}
if (component.includes('Dedicated pages are reserved')) failures.push('Reader-facing question library must not expose internal page-creation strategy.');
if (component.includes('Questions without a deep-dive link')) failures.push('Reader-facing question library must not expose internal thin-page strategy.');
if (component.includes('As a subject earns deeper treatment')) failures.push('Reader-facing question library must not expose future editorial workflow language.');
if (component.includes('useLoaderData')) failures.push('Question renderer must own the lazy question registry instead of requesting it through route loader data.');

for (const marker of [
  'createFileRoute(canonicalPath)',
  'const canonicalPath = "/texas-explained/questions";',
  'title: "140 Texas Questions Answered | Texas Explained"',
  'canonicalLink(texasDefinedBrand, canonicalPath)',
]) {
  if (!childRoute.includes(marker)) failures.push(`Texas Explained questions route missing marker: ${marker}`);
}
for (const marker of [
  'createLazyFileRoute("/texas-explained/questions")',
  'import TexasExplainedQuestionsPage from "@/components/editorial/TexasExplainedQuestionsPage"',
  'component: TexasExplainedQuestionsPage',
]) {
  if (!childLazyRoute.includes(marker)) failures.push(`Texas Explained questions lazy route missing marker: ${marker}`);
}

if (failures.length) {
  console.error('Texas Explained question authority validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`Texas Explained question authority OK: ${questionCount} questions across ${categoryCount} categories, preserved in a dedicated lazy-loaded question library while the flagship hub stays focused on the 10 core guides and supporting explainers.`);
