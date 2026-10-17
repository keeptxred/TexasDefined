import assert from 'node:assert/strict';
import { buildFootballProfileFaq } from '../../src/data/high-school-football/football-profile-content.ts';

const base = {
  displayName: 'Aubrey',
  program: { classification: '4A', division: 1, district: 4, uilEnrollment: 1258.5, districtName: 'AUBREY ISD' },
  identity: { mascot: 'Chaparrals' },
};
const headCoachQuestions = (faqs) => faqs.filter(({ question }) =>
  /\b(?:head (?:football )?coach|football head coach|varsity football coach|who coaches)\b/i.test(question)
);
const authoredAnswer = 'The 2026 MaxPreps football staff roster identifies Keith Ivy.';
const cases = [
  "Who is Aubrey's listed 2026 head coach?",
  'Who coaches Aubrey football in 2026?',
  'Who is the Aubrey football head coach?',
  "Who is Aubrey's varsity football coach?",
];
for (const question of cases) {
  const faqs = buildFootballProfileFaq({
    ...base,
    editorial: {
      coach: { name: 'Keith Ivy' },
      faq: [
        { question, answer: authoredAnswer },
        { question: 'Where can I get tickets?', answer: 'Visit the school ticket office.' },
      ],
    },
  });
  assert.equal(headCoachQuestions(faqs).length, 1, question + ' must not create a duplicate');
  assert.equal(headCoachQuestions(faqs)[0].answer, authoredAnswer, 'Preserve the sourced authored answer');
  assert.ok(faqs.some((faq) => faq.question === 'Where can I get tickets?'), 'Unrelated authored FAQs survive');
  assert.ok(faqs.length <= 8, 'FAQ cap remains enforced');
}
const withoutAuthoredCoach = buildFootballProfileFaq({
  ...base, editorial: { coach: { name: 'Keith Ivy' }, faq: [] },
});
assert.equal(headCoachQuestions(withoutAuthoredCoach).length, 1, 'Generate a coach FAQ when no authored one exists');
// Aubrey has five authored game-night questions without a head-coach question.
// The old generator appended the coach after six generic questions and the
// eight-question cap silently excluded it; guard the rendered FAQ priority.
const aubreyFiveAuthored = buildFootballProfileFaq({
  ...base,
  editorial: {
    coach: { name: 'Keith Ivy' },
    faq: [
      { question: 'What is Aubrey’s 2026 football record?', answer: '4–3 overall.' },
      { question: 'What games remain?', answer: 'Lake Dallas, Alvarado, Godley.' },
      { question: 'Where do fans buy tickets?', answer: 'GoFan.' },
      { question: 'Where is the stadium?', answer: '510 Spring Hill Road.' },
      { question: 'Has Aubrey won a state title?', answer: 'Check the historical record.' },
    ],
  },
});
assert.equal(aubreyFiveAuthored.length, 8, 'Eight-question display limit retained');
assert.equal(headCoachQuestions(aubreyFiveAuthored).length, 1,
  'The one sourced coach FAQ must survive Aubrey’s five authored questions');
assert.ok(aubreyFiveAuthored.slice(0, 5).every((faq) => !headCoachQuestions([faq]).length),
  'Keep all authored editorial questions first');

const noCoach = buildFootballProfileFaq({ ...base, editorial: { faq: [] } });
assert.equal(headCoachQuestions(noCoach).length, 0, 'Do not manufacture a coach answer without a verified coach');
console.log('Football head-coach FAQ semantic deduplication passed (authored and fallback cases).');
