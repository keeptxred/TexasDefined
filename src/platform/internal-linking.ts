import type { TexasEntityKind, TexasEntityRecord } from '@/data/knowledge-graph';
import { canonicalEntityPath } from '@/data/knowledge-graph/relationships';

export type InternalLinkPolicy = {
  maxLinks: number;
  minimumLabelLength: number;
  excludedEntityIds: string[];
  excludedKinds: TexasEntityKind[];
  existingHrefs: string[];
  linkedEntityIds: string[];
};

export type InternalLinkMatch = {
  start: number;
  end: number;
  label: string;
  entity: TexasEntityRecord;
  href: string;
  score: number;
};

export type InternalLinkDiagnostics = {
  candidates: number;
  accepted: number;
  rejectedExisting: number;
  rejectedOverlap: number;
  rejectedExcluded: number;
  rejectedAmbiguous: number;
};

const DEFAULT_POLICY: InternalLinkPolicy = {
  maxLinks: 8,
  minimumLabelLength: 4,
  excludedEntityIds: [],
  excludedKinds: ['agency', 'appraisal-district', 'tax-office', 'county-clerk', 'dps-office', 'utility'],
  existingHrefs: [],
  linkedEntityIds: [],
};

export function resolveInternalEntityLinks(
  text: string,
  entities: TexasEntityRecord[],
  input: Partial<InternalLinkPolicy> = {},
): { matches: InternalLinkMatch[]; diagnostics: InternalLinkDiagnostics } {
  const policy = { ...DEFAULT_POLICY, ...input };
  const existing = new Set(policy.existingHrefs);
  const used = new Set([...policy.linkedEntityIds, ...policy.excludedEntityIds]);
  const diagnostics: InternalLinkDiagnostics = { candidates: 0, accepted: 0, rejectedExisting: 0, rejectedOverlap: 0, rejectedExcluded: 0, rejectedAmbiguous: 0 };

  const labelOwners = new Map<string, Set<string>>();
  for (const entity of entities) {
    for (const raw of [entity.name, ...entity.aliases]) {
      const label = raw.trim().toLowerCase();
      if (label.length < policy.minimumLabelLength) continue;
      const owners = labelOwners.get(label) ?? new Set<string>();
      owners.add(entity.id);
      labelOwners.set(label, owners);
    }
  }

  const candidates = entities.flatMap((entity) =>
    [entity.name, ...entity.aliases].map((label) => ({ entity, label: label.trim() })),
  ).filter(({ label }) => label.length >= policy.minimumLabelLength)
   .sort((a, b) => b.label.length - a.label.length || entityPriority(b.entity) - entityPriority(a.entity));

  const matches: InternalLinkMatch[] = [];
  for (const candidate of candidates) {
    diagnostics.candidates += 1;
    if (matches.length >= policy.maxLinks) break;
    if (used.has(candidate.entity.id) || policy.excludedKinds.includes(candidate.entity.kind)) { diagnostics.rejectedExcluded += 1; continue; }
    const owners = labelOwners.get(candidate.label.toLowerCase());
    if (owners && owners.size > 1 && candidate.label.toLowerCase() !== candidate.entity.name.toLowerCase()) { diagnostics.rejectedAmbiguous += 1; continue; }
    const href = canonicalEntityPath(candidate.entity);
    if (existing.has(href)) { diagnostics.rejectedExisting += 1; continue; }
    const escaped = candidate.label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const match = new RegExp(`\\b${escaped}\\b`, 'i').exec(text);
    if (!match) continue;
    const start = match.index;
    const end = start + match[0].length;
    if (matches.some((item) => start < item.end && end > item.start)) { diagnostics.rejectedOverlap += 1; continue; }
    matches.push({ start, end, label: match[0], entity: candidate.entity, href, score: candidate.label.length + entityPriority(candidate.entity) });
    used.add(candidate.entity.id);
    existing.add(href);
  }

  matches.sort((a, b) => a.start - b.start);
  diagnostics.accepted = matches.length;
  return { matches, diagnostics };
}

export function internalLinkCoverage(texts: string[], entities: TexasEntityRecord[], policy: Partial<InternalLinkPolicy> = {}) {
  const linkedEntityIds: string[] = [];
  const results = texts.map((text) => {
    const result = resolveInternalEntityLinks(text, entities, { ...policy, linkedEntityIds });
    linkedEntityIds.push(...result.matches.map((match) => match.entity.id));
    return result;
  });
  return {
    linkedEntities: [...new Set(linkedEntityIds)],
    links: results.reduce((sum, result) => sum + result.matches.length, 0),
    paragraphs: texts.length,
    results,
  };
}

function entityPriority(entity: TexasEntityRecord) {
  const confidence = { official: 4, high: 3, medium: 2, low: 1 }[entity.sourceConfidence];
  const status = entity.status === 'active' ? 3 : entity.status === 'seasonal' ? 2 : 0;
  const kind = ['state-park','national-park','lake','river','city','county','museum','historic-site','festival','rodeo','fair'].includes(entity.kind) ? 3 : 1;
  return confidence + status + kind;
}
