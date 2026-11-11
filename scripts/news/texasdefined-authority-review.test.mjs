import { test } from 'node:test';
import assert from 'node:assert/strict';
import { reviewTexasDefinedAuthorityDraft, TEXASDEFINED_AUTOMATED_AUTHORITY_FLOOR } from './texasdefined-authority-review.mjs';

const source = { source: 'Museum Official Newsroom', link: 'https://museum.example.org/exhibit',
  extracted_body: 'The museum released a factual announcement on Monday. ' + 'Independently verified details about public exhibits and access. '.repeat(100) };
const allowed = new Set(['museum', 'city']);
function goodDraft() {
  const paragraphs = Array.from({ length: 8 }, (_, n) => ({
    type: 'paragraph',
    text: 'Museum Official Newsroom published the primary announcement. '
      + Array.from({ length: 110 }, (_, i) => `Visitor question ${n} and detail ${i} concern confirmed access, source dates and practical destination planning.`).join(' '),
  }));
  return { title: 'New Texas exhibit offers visitors a useful look at local history',
    dek: 'The announcement has specific background and verified practical information for visitors making plans in the region.',
    category: 'historic-sites', qualityScore: 97, tags: ['Texas','history','museum'],
    relatedDestinations: ['museum','city'],
    heroPrompt: 'Clearly non-documentary illustrated museum and historical artifacts in a stylized editorial scene',
    heroAlt: 'Illustration depicting a stylized museum interior, not an actual photograph',
    body: [ { type: 'heading', text: 'What was announced' }, ...paragraphs.slice(0,3),
      { type: 'heading', text: 'Planning a visit' }, ...paragraphs.slice(3,6),
      { type: 'heading', text: 'What remains unconfirmed' }, ...paragraphs.slice(6) ] };
}
test('a substantive original draft reaches internal structural floor', () => {
  assert.equal(TEXASDEFINED_AUTOMATED_AUTHORITY_FLOOR, 95);
  const result = reviewTexasDefinedAuthorityDraft(goodDraft(), source, allowed);
  assert.equal(result.passed, true, result.errors.join('; '));
});
test('self-assigned 95 cannot bypass thin content or unsourced attribution', () => {
  const d = goodDraft(); d.body = [{ type: 'paragraph', text: 'Short.' }]; d.qualityScore = 100;
  assert.equal(reviewTexasDefinedAuthorityDraft(d, source, allowed).passed, false);
});
test('rejects inadequate grade, fake photo alt and invalid destination', () => {
  const d = goodDraft(); d.qualityScore = 94; d.heroAlt = 'Photograph of museum front entrance'; d.relatedDestinations = ['museum','imaginary'];
  const { errors } = reviewTexasDefinedAuthorityDraft(d, source, allowed);
  assert.ok(errors.some(x => x.includes('95')));
  assert.ok(errors.some(x => x.includes('illustration')));
  assert.ok(errors.some(x => x.includes('verified internal')));
});
test('blocks unattributed source, false original reporting, and long verbatim copying', () => {
  const d = goodDraft();
  d.body[1].text = 'Our reporter visited the museum in person. ' + source.extracted_body;
  const { errors } = reviewTexasDefinedAuthorityDraft(d, source, allowed);
  assert.ok(errors.some(x => x.includes('unverifiable firsthand')));
  assert.ok(errors.some(x => x.includes('consecutive-word')));
});
