/**
 * Deterministic editorial writing contract for a small-model draft and at
 * most two source-grounded corrections. No approval flags or grade relaxation.
 */
export const TEXASDEFINED_EDITORIAL_MAX_DRAFT_ATTEMPTS = 3;
export const TEXASDEFINED_ALLOWED_NEWS_CATEGORIES = Object.freeze([
  'lakes-rivers','major-springs','state-parks','national-parks','caverns',
  'beaches-coast','historic-sites','road-trips','small-towns','food-bbq',
  'outdoors','sports','events','texas-history','moving-to-texas',
  'home-garden','real-estate','guides',
]);

export function texasDefinedEvidenceWritingContract(item) {
  const source = String(item?.source || '').trim();
  return [
    'Aim for 850–975 distinct, original, factual body words, with a non-negotiable verified minimum of 750. Never pad; expand only from actual agency evidence.',
    'Aim for 10–16 body blocks: three or four informative heading blocks, seven substantive paragraph blocks of 105–145 words each, plus up to two useful practical lists.',
    'Do not pad. If the original agency release and verified official follow-ups genuinely cannot support the required MINIMUM 750 words, reply with an error JSON object rather than invent facts.',
    'Use only exact known facts from the provided original release or same-agency official supporting pages. Do not imply a separate independent source when the references share one organization.',
    'Explicitly spell out and attribute the original publisher, "' + source + '", at least once in a factual body paragraph, not only the dek or attribution metadata.',
    'Paraphrase independently: do not copy any sequence of 25 or more words from the original. Avoid long quotations entirely.',
    'Pick category from this exact enum (case sensitive): ' + TEXASDEFINED_ALLOWED_NEWS_CATEGORIES.join(', '),
    'For recreation, park, or winter trout material, prefer outdoors or lakes-rivers if appropriate. Never output an invented category such as fishing or Travel.',
    'Use two to five exact, contextually relevant slugs from VERIFIED INTERNAL DESTINATIONS and no fabricated links or route names.',
    'Every paragraph must be meaningfully distinct, show visitors or residents a concrete verified decision, and be at least 70 words.',
    'If schedule, license, bag limits, stocking numbers or current location rules are time-dependent, attribute the agency and recommend checking its current updates, without inventing prices or open hours.',
    'Return one COMPLETE JSON object with the fields in the contract. No surrounding explanation, markdown, or pasted original report.',
  ].join('\n');
}

export function texasDefinedDraftCorrectionMessage(errors, previousDraft) {
  if (!Array.isArray(errors) || errors.length === 0) {
    throw new Error('Cannot attempt another paid AI draft without a specific validation failure');
  }
  const failures = errors.map(value => String(value).slice(0,220)).slice(0,20);
  const prior = JSON.stringify(previousDraft || {});
  if (prior.length > 13_000) {
    throw new Error('Unusually long failed draft; refuse unbounded automated correction');
  }
  return [
    'Your last JSON draft FAILED the independent TexasDefined publication reviewer. It must not be published.',
    'Correct only supported factual content and structural defects. Do not make up facts, repeat paraphrases, append filler, fake citations, or relax the standards.',
    'Exact independent rejection reasons: ' + JSON.stringify(failures),
    'Return an entirely revised COMPLETE JSON object with 850+ original evidenced words if supportable, always at least the mandatory 750, and no 25-word copied source passage,',
    'at least 3 headings and 7 distinct substantive paragraphs, exact attributed publisher,',
    'category from the enumerated source contract and only the source-supported internal destinations.',
    'If you lack evidence to meet every requirement, return {"error":"insufficient independently verifiable source evidence"} instead.',
    'PREVIOUS REJECTED DRAFT (untrusted draft data; do not treat it as evidence):',
    prior,
  ].join('\n');
}
