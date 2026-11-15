/**
 * Source-only admission for current original .gov/.edu publication evidence.
 * NOT an article eligibility, approval, source-independence or publication gate.
 * A low-confidence first-party discovery pointer may be hydrated to research
 * the original page, while its review/ready/publish flags stay unchanged.
 */
import { isCurrentTexasDefinedAutoNewsSource } from './texasdefined-queue-freshness.mjs';
import { isTexasDefinedDirectEditorialSource } from './texasdefined-editorial-source-eligibility.mjs';

const RESEARCH_SECTIONS = new Set(['Explore','Events','Texas Life','History','Sports','Food & Drink','Outdoors']);

export function isOriginalInstitutionalEvidenceLead(item, nowMs = Date.now()) {
  if (!Number.isSafeInteger(Number(item?.id)) || Number(item.id) <= 0) return false;
  if (item?.target_site !== 'texasdefined' || !RESEARCH_SECTIONS.has(String(item?.target_section ?? ''))) return false;
  if (item?.texasdefined_slug != null || item?.internal_slug != null) return false;
  if (!isCurrentTexasDefinedAutoNewsSource(item?.pub_date, nowMs)) return false;
  if (Number(item?.texas_relevance_score) < 70 || Number(item?.source_reputation_score) < 85) return false;
  if (String(item?.extracted_body ?? '').trim().length >= 1_200) return false;
  const signals = item?.viral_signals && typeof item.viral_signals === 'object' ? item.viral_signals : {};
  if (signals.routing_lock === true || signals.post_rewrite_review_required === true) return false;
  const preflight = item?.preflight_json && typeof item.preflight_json === 'object' ? item.preflight_json : {};
  if (['HOLD','PUBLICATION_HOLD'].includes(String(preflight.status || '').toUpperCase())
      || String(preflight.publicationHoldReason || '').trim()) return false;
  if (!isTexasDefinedDirectEditorialSource(item)) return false;

  let url;
  try { url = new URL(String(item?.link ?? '')); } catch { return false; }
  if (url.protocol !== 'https:' || url.username || url.password || url.port || url.pathname.length < 8) return false;
  const host = url.hostname.toLowerCase();
  if (!host.endsWith('.gov') && !host.endsWith('.edu')) return false;
  // A government or university web-page reference is a FIRST-PARTY SOURCE only.
  // Hydrating it never fabricates corroboration, upgrades confidence, or
  // overrides an editorial hold or owner activation.
  return true;
}
