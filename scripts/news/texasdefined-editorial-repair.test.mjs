import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
 TEXASDEFINED_EDITORIAL_MAX_DRAFT_ATTEMPTS,
 TEXASDEFINED_ALLOWED_NEWS_CATEGORIES,
 texasDefinedEvidenceWritingContract,
 texasDefinedDraftCorrectionMessage,
} from './texasdefined-editorial-repair.mjs';

const pub=readFileSync('scripts/news/texasdefined-auto-publisher.mjs','utf8');
const reviewer=readFileSync('scripts/news/texasdefined-authority-review.mjs','utf8');
test('strict draft contract targets useful original 900 words and only approved categories',()=>{
  const guide=texasDefinedEvidenceWritingContract({source:'Texas Parks & Wildlife'});
  assert.equal(TEXASDEFINED_EDITORIAL_MAX_DRAFT_ATTEMPTS,3);
  assert.equal(TEXASDEFINED_ALLOWED_NEWS_CATEGORIES.includes('fishing'),false);
  assert.equal(TEXASDEFINED_ALLOWED_NEWS_CATEGORIES.includes('outdoors'),true);
  assert.match(guide,/850–975 distinct, original, factual body words/);
  assert.match(guide,/mandatory verified minimum of 750/);
  assert.match(guide,/Texas Parks & Wildlife/);
  assert.match(guide,/25 or more words/);
  assert.match(guide,/If the supplied original release and verified official follow-ups cannot support/);
  assert.match(guide,/Do not pad/);
});
test('failed draft is never published, reviewer defects feed at most two constrained correction passes',()=>{
  const correction=texasDefinedDraftCorrectionMessage(
    ['article below 750-word substantive editorial floor','category is invalid','source text reused in a 25+ consecutive-word passage'],
    {title:'failed original',body:[{type:'paragraph',text:'This was rejected.'}]}
  );
  assert.match(correction,/FAILED the independent/);
  assert.match(correction,/source text/);
  assert.match(correction,/source evidence/);
  assert.match(correction,/PREVIOUS REJECTED DRAFT/);
  assert.match(pub,/for \(let attempt = 1; attempt <= TEXASDEFINED_EDITORIAL_MAX_DRAFT_ATTEMPTS/);
  assert.match(pub,/validateDraft\(draft,/);
  assert.match(pub,/No verified editorial draft was produced/);
  assert.match(pub,/correctionAttempt:attempt/);
  assert.match(reviewer,/TEXASDEFINED_NEWS_MIN_BODY_WORDS = 750/);
  assert.match(reviewer,/TEXASDEFINED_AUTOMATED_AUTHORITY_FLOOR = 95/);
});
test('no unsourced correction or unbounded AI looping on model refusal',()=>{
  assert.throws(()=>texasDefinedDraftCorrectionMessage([],{}),/without a specific validation failure/);
  assert.throws(()=>texasDefinedDraftCorrectionMessage(['short'],{body:'x'.repeat(15000)}),/unbounded/);
  assert.match(pub,/if \(draft\?\.error\) throw new Error/);
  assert.match(pub,/prompt.length > 31_000/);
  assert.match(pub,/if \(attempt === TEXASDEFINED_EDITORIAL_MAX_DRAFT_ATTEMPTS\)/);
});
