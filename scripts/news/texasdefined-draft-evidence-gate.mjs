/**
 * A source body is not a license to pad a routine recap into a 750-word
 * "original" article. This gate applies to DRAFT/PUBLICATION selection only.
 * Hydration still collects eligible factual material without AI or approval.
 */
export const MIN_ORIGINAL_SOURCE_WORDS = 320;
export const MIN_ORIGINAL_SOURCE_CHARS = 2200;

export function isSubstantiveTexasDefinedDraftSource(item) {
  const body = String(item?.extracted_body ?? '').replace(/\s+/g,' ').trim();
  if (body.length < MIN_ORIGINAL_SOURCE_CHARS) return false;
  if (body.split(/\s+/).filter(Boolean).length < MIN_ORIGINAL_SOURCE_WORDS) return false;

  // A single team press statement or one reporter's routine game report cannot
  // independently substantiate a new 750-word sports news article. Preserve
  // it for human research, not automatic long-form generation.
  if (String(item?.target_section ?? '').toLowerCase() === 'sports'
      && (!Number.isInteger(Number(item?.source_count)) || Number(item.source_count) < 2)) return false;

  const title = String(item?.title ?? '').toLowerCase().trim();
  // Routine game summaries, fixtures and broad national explainers belong in
  // sports/event guides or curated roundups, not individual 750-word pages.
  if (/\b(?:playoff (?:schedule|pairings)|bi-district playoff schedule|scores? and schedule|game preview|non-conference action|host(?:s|ing)? .{3,80} in (?:non-conference|conference) action)\b/.test(title)) return false;
  if (/\b(?:beat|beats|defeat(?:s|ed)?|top(?:s|ped)?|edge(?:s|d)?|triumph(?:s|ed)? over)\b.{0,120}\b(?:nets|pacers|colts|cowboys|mavericks|texans|spurs|rockets|longhorns|aggies|cougars)\b/.test(title)) return false;
  if (/\b(?:mavericks|cowboys|texans|spurs|rockets|longhorns|aggies|cougars)\b.{0,120}\b(?:beat|beats|defeat(?:s|ed)?|triumph(?:s|ed)? over|edge(?:s|d)?)\b/.test(title)) return false;
  if (/^(?:what is|explained: what is|how is)\b/.test(title) && !/\b(?:texas|dallas|houston|austin|san antonio|el paso|fort worth|lubbock)\b/.test(title)) return false;
  return true;
}
