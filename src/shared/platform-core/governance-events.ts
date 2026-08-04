import { fnv1aFingerprint } from './fingerprint';
import type { ContentDisposition, ContentDomain, PlatformSite } from './content-intelligence';
import type { PublicationGateStatus } from './publication-gate';

export type GovernanceEventKind =
  | 'decision-evaluated'
  | 'publication-allowed'
  | 'publication-blocked'
  | 'override-required'
  | 'override-accepted'
  | 'override-rejected'
  | 'ownership-drift-detected';

export type GovernanceEvent = {
  id: string;
  occurredAt: string;
  kind: GovernanceEventKind;
  site: PlatformSite;
  domain: ContentDomain;
  disposition: ContentDisposition;
  gateStatus: PublicationGateStatus;
  decisionFingerprint: string;
  candidateFingerprint: string;
  canonicalOwner: PlatformSite;
  sourceSite: PlatformSite;
  overrideUsed: boolean;
  writer?: string;
  reasonCodes: string[];
};

export type GovernanceEventInput = Omit<GovernanceEvent, 'id' | 'candidateFingerprint' | 'reasonCodes'> & {
  candidateId: string;
  title?: string;
  sourceCanonicalUrl?: string;
  proposedUrl?: string;
  reasonCodes?: string[];
};

export function createGovernanceEvent(input: GovernanceEventInput): GovernanceEvent {
  const candidateFingerprint = fnv1aFingerprint({
    candidateId: input.candidateId,
    title: input.title ?? null,
    sourceCanonicalUrl: input.sourceCanonicalUrl ?? null,
    proposedUrl: input.proposedUrl ?? null,
  });
  const normalized = {
    occurredAt: input.occurredAt,
    kind: input.kind,
    site: input.site,
    domain: input.domain,
    disposition: input.disposition,
    gateStatus: input.gateStatus,
    decisionFingerprint: input.decisionFingerprint,
    candidateFingerprint,
    canonicalOwner: input.canonicalOwner,
    sourceSite: input.sourceSite,
    overrideUsed: input.overrideUsed,
    writer: input.writer?.trim() || undefined,
    reasonCodes: [...new Set((input.reasonCodes ?? []).map((value) => value.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-')).filter(Boolean))].sort(),
  };
  return { id: fnv1aFingerprint(normalized), ...normalized };
}

export function validateGovernanceEvent(event: GovernanceEvent) {
  const errors: string[] = [];
  if (!/^\d{4}-\d{2}-\d{2}T/.test(event.occurredAt)) errors.push('occurredAt must be an ISO timestamp.');
  if (!/^fnv1a-[0-9a-f]{8}$/.test(event.id)) errors.push('Event id must be a deterministic fingerprint.');
  if (!/^fnv1a-[0-9a-f]{8}$/.test(event.candidateFingerprint)) errors.push('Candidate fingerprint is invalid.');
  if (!event.decisionFingerprint) errors.push('decisionFingerprint is required.');
  return { valid: errors.length === 0, errors };
}

export function summarizeGovernanceEvents(events: GovernanceEvent[]) {
  const summary = {
    total: events.length, allowed: 0, blocked: 0, overrideRequired: 0,
    overridesAccepted: 0, overridesRejected: 0, ownershipDrift: 0,
    bySite: { TexasDefined: 0, KeepTXRed: 0 },
    byDomain: {} as Partial<Record<ContentDomain, number>>,
    byDisposition: {} as Partial<Record<ContentDisposition, number>>,
    blockedRate: 0, overrideAcceptanceRate: 0,
  };
  for (const event of events) {
    summary.bySite[event.site] += 1;
    summary.byDomain[event.domain] = (summary.byDomain[event.domain] ?? 0) + 1;
    summary.byDisposition[event.disposition] = (summary.byDisposition[event.disposition] ?? 0) + 1;
    if (event.kind === 'publication-allowed') summary.allowed += 1;
    if (event.kind === 'publication-blocked') summary.blocked += 1;
    if (event.kind === 'override-required') summary.overrideRequired += 1;
    if (event.kind === 'override-accepted') summary.overridesAccepted += 1;
    if (event.kind === 'override-rejected') summary.overridesRejected += 1;
    if (event.kind === 'ownership-drift-detected') summary.ownershipDrift += 1;
  }
  const decisions = summary.allowed + summary.blocked;
  const overrides = summary.overridesAccepted + summary.overridesRejected;
  summary.blockedRate = decisions ? Number((summary.blocked / decisions).toFixed(4)) : 0;
  summary.overrideAcceptanceRate = overrides ? Number((summary.overridesAccepted / overrides).toFixed(4)) : 0;
  return summary;
}

export function detectOwnershipDrift(events: GovernanceEvent[]) {
  return events.filter((event) => event.site !== event.canonicalOwner && event.gateStatus === 'allowed' && !event.overrideUsed);
}
