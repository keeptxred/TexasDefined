import type { TexasEntityKind, TexasEntityRecord } from '@/data/knowledge-graph';
import { canonicalEntityPath, isIndexableEntityPage } from '@/data/knowledge-graph/relationships';
import { scoreEntityAuthority } from '@/platform/knowledge-graph-behavior';

export type InternalLinkTopic = 'travel' | 'property-tax' | 'government' | 'history' | 'events' | 'general';

export type InternalLinkPolicy = {
  maxLinks: number;
  minimumLabelLength: number;
  minimumScore: number;
  ambiguityMargin: number;
  contextWindow: number;
  topic: InternalLinkTopic;
  preferredKinds: TexasEntityKind[];
  countySlug?: string;
  region?: string;
  excludedEntityIds: string[];
  excludedKinds: TexasEntityKind[];
  existingHrefs: string[];
  linkedEntityIds: string[];
  entityExposureWeights: Record<string, number>;
  maximumExposurePenalty: number;
};

export type InternalLinkMatch = {
  start: number;
  end: number;
  label: string;
  entity: TexasEntityRecord;
  href: string;
  score: number;
  reasons: string[];
};

export type InternalLinkDiagnostics = {
  candidates: number;
  accepted: number;
  disambiguated: number;
  exposureBalanced: number;
  authorityBoosted: number;
  rejectedExisting: number;
  rejectedOverlap: number;
  rejectedExcluded: number;
  rejectedAmbiguous: number;
  rejectedLowQuality: number;
};

const TOPIC_KINDS: Record<InternalLinkTopic, TexasEntityKind[]> = {
  travel: ['state-park','national-park','national-forest','lake','river','beach','cavern','museum','historic-site','attraction','scenic-drive','city','festival','rodeo','fair'],
  'property-tax': ['county','city','appraisal-district','tax-office','agency','school-district'],
  government: ['county','city','agency','school-district','appraisal-district','tax-office','county-clerk','dps-office'],
  history: ['historic-site','museum','mission','battlefield','courthouse','city','county'],
  events: ['festival','rodeo','fair','holiday-event','sporting-event','fairground','sports-venue','city'],
  general: [],
};

const CONTEXT_HINTS: Partial<Record<TexasEntityKind, string[]>> = {
  county: ['county','commissioners','tax','appraisal','sheriff'], city: ['city','town','downtown','mayor','residents'],
  lake: ['lake','reservoir','water','fishing','boating'], river: ['river','creek','paddling','flow','watershed'],
  'state-park': ['park','camping','trail','reservation','tpwd'], 'national-park': ['national park','nps','ranger','federal'],
  cavern: ['cavern','cave','underground','tour'], museum: ['museum','exhibit','collection','gallery'],
  'historic-site': ['historic','history','landmark','heritage'], festival: ['festival','annual','music','celebration'],
  rodeo: ['rodeo','livestock','arena','cowboy'], fair: ['fair','midway','livestock','fairground'],
  'appraisal-district': ['appraisal','market value','protest','arb'], 'tax-office': ['tax office','collector','payment','delinquent'],
};

const DEFAULT_POLICY: InternalLinkPolicy = {
  maxLinks: 8, minimumLabelLength: 4, minimumScore: 8, ambiguityMargin: 3, contextWindow: 90, topic: 'general', preferredKinds: [],
  excludedEntityIds: [], excludedKinds: ['utility'], existingHrefs: [], linkedEntityIds: [], entityExposureWeights: {}, maximumExposurePenalty: 4,
};

type Candidate = { entity: TexasEntityRecord; label: string; start: number; end: number; score: number; reasons: string[] };

export function resolveInternalEntityLinks(text: string, entities: TexasEntityRecord[], input: Partial<InternalLinkPolicy> = {}): { matches: InternalLinkMatch[]; diagnostics: InternalLinkDiagnostics } {
  const policy = { ...DEFAULT_POLICY, ...input };
  const existing = new Set(policy.existingHrefs);
  const used = new Set([...policy.linkedEntityIds, ...policy.excludedEntityIds]);
  const publishableEntities = entities.filter(isIndexableEntityPage);
  const authorityScores = new Map(scoreEntityAuthority(publishableEntities).map((item) => [item.entityId, item.score]));
  const diagnostics: InternalLinkDiagnostics = { candidates: 0, accepted: 0, disambiguated: 0, exposureBalanced: 0, authorityBoosted: 0, rejectedExisting: 0, rejectedOverlap: 0, rejectedExcluded: 0, rejectedAmbiguous: 0, rejectedLowQuality: 0 };
  const candidatesBySpan = new Map<string, Candidate[]>();

  for (const entity of publishableEntities) {
    if (used.has(entity.id) || policy.excludedKinds.includes(entity.kind)) { diagnostics.rejectedExcluded += 1; continue; }
    for (const rawLabel of [entity.name, ...entity.aliases]) {
      const label = rawLabel.trim();
      if (label.length < policy.minimumLabelLength) continue;
      const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const match = new RegExp(`\\b${escaped}\\b`, 'i').exec(text);
      if (!match) continue;
      const start = match.index;
      const end = start + match[0].length;
      if (!countyLabelHasExplicitContext(entity, match[0], text, start, end, policy)) continue;
      diagnostics.candidates += 1;
      const context = text.slice(Math.max(0, start - policy.contextWindow), Math.min(text.length, end + policy.contextWindow)).toLowerCase();
      const scored = scoreCandidate(entity, label, context, policy, authorityScores);
      if (scored.reasons.some((reason) => reason.startsWith('exposure-penalty:'))) diagnostics.exposureBalanced += 1;
      if (scored.reasons.some((reason) => reason.startsWith('authority-boost:'))) diagnostics.authorityBoosted += 1;
      const key = `${start}:${end}:${match[0].toLowerCase()}`;
      const list = candidatesBySpan.get(key) ?? [];
      list.push({ entity, label: match[0], start, end, score: scored.score, reasons: scored.reasons });
      candidatesBySpan.set(key, list);
    }
  }

  const selected: Candidate[] = [];
  for (const group of candidatesBySpan.values()) {
    group.sort((a, b) => b.score - a.score || b.label.length - a.label.length || a.entity.name.localeCompare(b.entity.name));
    const winner = group[0];
    if (!winner || winner.score < policy.minimumScore) { diagnostics.rejectedLowQuality += 1; continue; }
    if (group.length > 1) {
      const runnerUp = group[1];
      if (runnerUp && winner.score - runnerUp.score < policy.ambiguityMargin) { diagnostics.rejectedAmbiguous += 1; continue; }
      diagnostics.disambiguated += 1;
    }
    selected.push(winner);
  }

  selected.sort((a, b) => b.score - a.score || b.label.length - a.label.length);
  const accepted: Candidate[] = [];
  for (const candidate of selected) {
    if (accepted.length >= policy.maxLinks) break;
    if (used.has(candidate.entity.id)) { diagnostics.rejectedExcluded += 1; continue; }
    const href = canonicalEntityPath(candidate.entity);
    if (existing.has(href)) { diagnostics.rejectedExisting += 1; continue; }
    if (accepted.some((item) => candidate.start < item.end && candidate.end > item.start)) { diagnostics.rejectedOverlap += 1; continue; }
    accepted.push(candidate); used.add(candidate.entity.id); existing.add(href);
  }

  const matches = accepted.sort((a, b) => a.start - b.start).map((candidate) => ({ start: candidate.start, end: candidate.end, label: candidate.label, entity: candidate.entity, href: canonicalEntityPath(candidate.entity), score: candidate.score, reasons: candidate.reasons }));
  diagnostics.accepted = matches.length;
  return { matches, diagnostics };
}

/**
 * Counties frequently share names with plants, colors, occupations and ordinary
 * nouns (Live Oak, Orange, Wood, Bee, Falls, etc.). A bare alias is therefore
 * unsafe for automatic linking. Keep explicit county phrases linkable while
 * leaving deliberately-authored links untouched elsewhere in the rendering
 * pipeline.
 */
export function countyLabelHasExplicitContext(
  entity: TexasEntityRecord,
  label: string,
  text: string,
  start: number,
  end: number,
  policy: Pick<InternalLinkPolicy, 'countySlug'> = {},
) {
  if (entity.kind !== 'county') return true;
  if (/\bcounty\b/i.test(label)) return true;
  if (policy.countySlug && entity.countySlug === policy.countySlug) return true;

  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const immediateContext = text.slice(Math.max(0, start - 28), Math.min(text.length, end + 28));
  return new RegExp(`\\b${escaped}\\s+County\\b`, 'i').test(immediateContext)
    || new RegExp(`\\bCounty(?:\\s+of)?\\s+${escaped}\\b`, 'i').test(immediateContext);
}

export function internalLinkCoverage(texts: string[], entities: TexasEntityRecord[], policy: Partial<InternalLinkPolicy> = {}) {
  const linkedEntityIds: string[] = [];
  const results = texts.map((text) => { const result = resolveInternalEntityLinks(text, entities, { ...policy, linkedEntityIds }); linkedEntityIds.push(...result.matches.map((match) => match.entity.id)); return result; });
  return { linkedEntities: [...new Set(linkedEntityIds)], links: results.reduce((sum, result) => sum + result.matches.length, 0), averageScore: average(results.flatMap((result) => result.matches.map((match) => match.score))), ambiguous: results.reduce((sum, result) => sum + result.diagnostics.rejectedAmbiguous, 0), paragraphs: texts.length, results };
}

function scoreCandidate(entity: TexasEntityRecord, label: string, context: string, policy: InternalLinkPolicy, authorityScores: Map<string, number>) {
  const reasons: string[] = [];
  let score = entityPriority(entity); reasons.push(`entity-priority:${score}`);
  const authorityBoost = Math.min(4, Math.floor((authorityScores.get(entity.id) ?? 0) / 25));
  if (authorityBoost > 0) { score += authorityBoost; reasons.push(`authority-boost:${authorityBoost}`); }
  if (label.toLowerCase() === entity.name.toLowerCase()) { score += 4; reasons.push('canonical-name'); }
  if (policy.preferredKinds.includes(entity.kind)) { score += 5; reasons.push('preferred-kind'); }
  if (TOPIC_KINDS[policy.topic].includes(entity.kind)) { score += 4; reasons.push(`topic:${policy.topic}`); }
  if (policy.countySlug && entity.countySlug === policy.countySlug) { score += 5; reasons.push('same-county'); }
  if (policy.region && entity.region === policy.region) { score += 3; reasons.push('same-region'); }
  const hints = CONTEXT_HINTS[entity.kind] ?? [];
  const hintMatches = hints.filter((hint) => context.includes(hint)).length;
  if (hintMatches) { score += Math.min(6, hintMatches * 2); reasons.push(`context-hints:${hintMatches}`); }
  const relationshipContext = entity.relationships.filter((relationship) => context.includes(relationship.targetId.split(':').at(-1)?.replaceAll('-', ' ') ?? '')).length;
  if (relationshipContext) { score += Math.min(4, relationshipContext * 2); reasons.push('relationship-context'); }
  const rawExposure = Math.max(0, Number(policy.entityExposureWeights[entity.id] ?? 0));
  const exposurePenalty = Math.min(policy.maximumExposurePenalty, Math.floor(rawExposure));
  if (exposurePenalty > 0) { score -= exposurePenalty; reasons.push(`exposure-penalty:${exposurePenalty}`); }
  if (entity.status === 'pending-source-verification') { score -= 3; reasons.push('pending-verification'); }
  if (entity.sourceConfidence === 'low') { score -= 4; reasons.push('low-confidence'); }
  return { score, reasons };
}

function entityPriority(entity: TexasEntityRecord) {
  const confidence = { official: 5, high: 4, medium: 2, low: 0 }[entity.sourceConfidence];
  const status = entity.status === 'active' ? 4 : entity.status === 'seasonal' ? 3 : entity.status === 'pending-source-verification' ? 1 : -4;
  const kind = ['state-park','national-park','lake','river','city','county','museum','historic-site','festival','rodeo','fair'].includes(entity.kind) ? 3 : 1;
  return confidence + status + kind;
}
function average(values: number[]) { return values.length ? Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(2)) : 0; }
