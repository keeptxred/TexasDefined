/**
 * Fail-closed structural and originality checks for unattended TexasDefined news.
 * This is an internal editorial floor, NOT a Google authority certification.
 * A model's self-reported qualityScore is never sufficient on its own.
 */
export const TEXASDEFINED_AUTOMATED_AUTHORITY_FLOOR = 95;
export const TEXASDEFINED_NEWS_MIN_BODY_WORDS = 750;

export function normalizeEditorialWords(value) {
  return String(value ?? '').toLowerCase()
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .split(/\s+/).filter(Boolean);
}

function sharedWordRun(a, b) {
  const lookup = new Map();
  for (let i = 0; i < a.length; i += 1) {
    const indexes = lookup.get(a[i]) || [];
    indexes.push(i);
    lookup.set(a[i], indexes);
  }
  let longest = 0;
  // For 750-1,500-word drafts and source snippets, stop at a 25-word match.
  for (let j = 0; j < b.length; j += 1) {
    for (const i of lookup.get(b[j]) || []) {
      let k = 0;
      while (i + k < a.length && j + k < b.length && a[i + k] === b[j + k] && k < 25) k += 1;
      if (k > longest) longest = k;
      if (longest >= 25) return longest;
    }
  }
  return longest;
}

export function reviewTexasDefinedAuthorityDraft(draft, source, allowedDestinationSlugs) {
  const errors = [];
  const heading = (draft?.title ?? '').trim();
  const dek = (draft?.dek ?? '').trim();
  const blocks = Array.isArray(draft?.body) ? draft.body : [];
  const paragraphs = blocks.filter(block => block?.type === 'paragraph' && typeof block?.text === 'string');
  const headings = blocks.filter(block => block?.type === 'heading' && typeof block?.text === 'string');
  const validTypes = new Set(['heading', 'paragraph', 'list']);
  const related = Array.isArray(draft?.relatedDestinations) ? draft.relatedDestinations : [];
  if (heading.length < 20 || heading.length > 155) errors.push('title must be 20-155 characters');
  if (dek.length < 80 || dek.length > 350) errors.push('dek must be 80-350 characters');
  if (blocks.length < 8 || blocks.length > 20) errors.push('body needs 8-20 content blocks');
  if (blocks.some(block => !block || !validTypes.has(block.type)
      || (block.type === 'list' ? !Array.isArray(block.items) || !block.items.every(item => typeof item === 'string')
        : typeof block.text !== 'string'))) errors.push('body contains an invalid block');
  if (headings.length < 3 || headings.some(block => block.text.trim().length < 8)) errors.push('at least three descriptive section headings are required');
  if (paragraphs.length < 4 || paragraphs.some(block => normalizeEditorialWords(block.text).length < 55)) {
    errors.push('at least four substantive paragraphs of 55+ words are required');
  }
  const bodyText = blocks.flatMap(block => block?.type === 'list' ? block.items || [] : [block?.text || '']).join(' ');
  const wordCount = normalizeEditorialWords(bodyText).length;
  if (wordCount < TEXASDEFINED_NEWS_MIN_BODY_WORDS) errors.push('article below 750-word substantive editorial floor');
  if (!Array.isArray(draft?.tags) || draft.tags.length < 3 || draft.tags.length > 8) errors.push('tags must have 3-8 items');
  if (related.length < 2 || related.length > 5
      || new Set(related).size !== related.length
      || related.some(slug => !allowedDestinationSlugs.has(slug))) {
    errors.push('two to five distinct verified internal destinations required');
  }
  if (!Number.isInteger(draft?.qualityScore) || draft.qualityScore < TEXASDEFINED_AUTOMATED_AUTHORITY_FLOOR || draft.qualityScore > 100) {
    errors.push('model-reported authority score below internal 95 floor');
  }
  if (String(draft?.heroAlt ?? '').trim().length < 20 || !/illustrat|artwork|drawing|render/i.test(String(draft?.heroAlt ?? ''))) {
    errors.push('generated image alt text must truthfully describe an illustration');
  }
  if (String(draft?.heroPrompt ?? '').trim().length < 30) errors.push('specific editorial illustration prompt required');
  if (!String(source?.link ?? '').startsWith('https://')) errors.push('source requires HTTPS attribution');
  const sourceName = String(source?.source ?? '').trim();
  if (sourceName.length < 3) errors.push('independent source attribution missing');
  if (sourceName && !bodyText.toLowerCase().includes(sourceName.toLowerCase())) {
    errors.push('body must attribute the named original publisher');
  }
  const unique = new Set();
  for (const block of paragraphs) {
    const normalized = normalizeEditorialWords(block.text).join(' ');
    if (unique.has(normalized)) errors.push('duplicate editorial paragraph');
    unique.add(normalized);
  }
  if (/(?:as an ai language model|lorem ipsum|placeholder|\[insert|\[source needed|we visited|our reporter visited|we interviewed|exclusive interview|according to unnamed sources)/i.test(bodyText)) {
    errors.push('placeholder, unverifiable firsthand reporting, or model disclosure in article');
  }
  // Do not republish another outlet's prose as a machine-written magazine story.
  if (source?.extracted_body && sharedWordRun(normalizeEditorialWords(source.extracted_body), normalizeEditorialWords(bodyText)) >= 25) {
    errors.push('source text reused in a 25+ consecutive-word passage');
  }
  return { passed: errors.length === 0, errors, wordCount, internalAuthorityFloor: TEXASDEFINED_AUTOMATED_AUTHORITY_FLOOR };
}
