import fs from 'node:fs';

const failures = [];
const requiredFiles = {
  'src/components/content/AnswerSummary.tsx': [
    'export function AnswerSummary',
    '<dl',
    '<dt',
    '<dd',
  ],
  'src/components/editorial/CategoryPage.tsx': [
    'AnswerSummary',
    'What is this ${belongsToExplore ? "Texas guide" : "section"} about?',
    'How should I use this page?',
  ],
  'src/components/calculators/CalculatorPage.tsx': [
    'AnswerSummary',
    'What does this calculator estimate?',
    'Is the result official?',
    'What should I do with the result?',
  ],
  'src/components/editorial/DestinationVisitPlanner.tsx': [
    'AnswerSummary',
    'What is ${destination.name}?',
    'When is the best time to go?',
    'What should I know before arriving?',
    'Where is it?',
  ],
  'src/routes/browse.cities.tsx': [
    'AnswerSummary',
    'How to use the Texas city directory',
    'Can I use this to compare places to live?',
  ],
  'src/routes/browse.counties.tsx': [
    'AnswerSummary',
    'How to use the county property-tax directory',
    'Are Texas Defined tax figures official?',
  ],
};

for (const [file, needles] of Object.entries(requiredFiles)) {
  const source = fs.readFileSync(file, 'utf8');
  for (const needle of needles) {
    if (!source.includes(needle)) failures.push(`${file} is missing AEO answer-layer contract: ${needle}`);
  }
}

const answerSummary = fs.readFileSync('src/components/content/AnswerSummary.tsx', 'utf8');
if (answerSummary.includes('FAQPage')) {
  failures.push('AnswerSummary must not emit FAQPage schema automatically; visible answer content and structured data should remain separately governed.');
}

if (failures.length) {
  console.error('AEO answer-layer validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('AEO answer-first layers are present on category, calculator, destination, city and county surfaces.');
