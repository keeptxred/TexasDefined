/**
 * Prepared Network Graph outbox worker core — NOT CONNECTED TO A HOSTED JOB.
 * This module never obtains a Graph token, calls Graph, or claims/finishes SQL.
 * Production dispatch remains hard disabled until explicit sole-owner approval.
 *
 * A future authorized adapter must supply an already-claimed row, a service-only
 * SQL claim boundary, a restricted mailbox token and separately verified
 * provider evidence. No ambiguous response can be auto-resent or marked sent.
 */
import {
  prepareNetworkGraphClaim, classifyNetworkGraphClaimForOperator,
  type NetworkOutboxClaim, type NetworkGraphClaimPlan,
} from './network-notification-claim-plan.server.ts';
import { NETWORK_GRAPH_DISPATCH_ENABLED } from './network-notification-graph-readiness.server.ts';
import { NETWORK_EMAIL_DELIVERY_ENABLED } from './network-notification-templates.server.ts';

export const NETWORK_GRAPH_WORKER_MAX_BATCH = 5;
export type NetworkGraphOperatorOutcome = {
  claimId: string;
  classification: ReturnType<typeof classifyNetworkGraphClaimForOperator>['classification'] | 'not_dispatched';
  nextStep: 'manual_evidence_required' | 'known_rejection_manual_review';
  mayMarkDelivered: false;
  mayRetryAutomatically: false;
};
/** A bounded, side-effect-free claim validation stage. Throws on any corrupt
 * claim before any dispatch can occur; no claim tokens or email bodies are logged.
 */
export function prepareNetworkGraphBatch(rows: unknown): NetworkGraphClaimPlan[] {
  if (!Array.isArray(rows) || rows.length > NETWORK_GRAPH_WORKER_MAX_BATCH)
    throw Error('Network Graph worker batch invalid');
  const plans = rows.map((row) => prepareNetworkGraphClaim(row as NetworkOutboxClaim));
  const ids = new Set<string>();
  const tokens = new Set<string>();
  for (const plan of plans) {
    if (ids.has(plan.id) || tokens.has(plan.claimToken))
      throw Error('Network Graph worker repeated claim');
    ids.add(plan.id);
    tokens.add(plan.claimToken);
  }
  return plans;
}

/** Safe acceptance rehearsal. No real provider call or outbox mutation occurs. */
export function rehearseNetworkGraphResponses(
  rows: unknown, statuses: readonly unknown[],
): NetworkGraphOperatorOutcome[] {
  const plans = prepareNetworkGraphBatch(rows);
  if (!Array.isArray(statuses) || statuses.length !== plans.length)
    throw Error('Network Graph worker outcomes invalid');
  return plans.map((plan, i) => {
    const decision = classifyNetworkGraphClaimForOperator(statuses[i]);
    return {
      claimId: plan.id, classification: decision.classification,
      nextStep: decision.nextStep, mayMarkDelivered: false,
      mayRetryAutomatically: false,
    };
  });
}

/** Staging transport integration seam.
 *
 * Intentionally not runnable while the two compile-time delivery switches are
 * false. The injected transport is not wired to a timer, route or provider.
 * An authorized future staging implementation must separately authenticate a
 * mailbox-scoped Graph permission and pin its staging origin/recipient.
 * This function NEVER updates notification SQL to sent/failed, even for 202,
 * 4xx, 429 or a transport timeout. A manual, evidence-backed reconciliation
 * is the only way to move a claimed message out of sending.
 *
 * Return values contain no email contents, recipients, or secret claim tokens.
 */
export async function dispatchPreparedNetworkGraphBatch(
  rows: unknown,
  transport: (plan: NetworkGraphClaimPlan) => Promise<{ status: unknown }>,
): Promise<NetworkGraphOperatorOutcome[]> {
  if (!Boolean(NETWORK_GRAPH_DISPATCH_ENABLED) ||
      !Boolean(NETWORK_EMAIL_DELIVERY_ENABLED))
    throw Error('Network Graph delivery is not authorized');
  if (typeof transport !== 'function')
    throw Error('Network Graph transport missing');
  const plans = prepareNetworkGraphBatch(rows);
  const outcomes: NetworkGraphOperatorOutcome[] = [];
  for (const plan of plans) {
    let status: unknown;
    try {
      const response = await transport(plan);
      status = response?.status;
    } catch {
      // The transport may have accepted a message before raising an error.
      // No automatic retry or acknowledgement, even for an apparent failure.
      status = undefined;
    }
    const decision = classifyNetworkGraphClaimForOperator(status);
    outcomes.push({
      claimId: plan.id,
      classification: decision.classification,
      nextStep: decision.nextStep,
      mayMarkDelivered: false,
      mayRetryAutomatically: false,
    });
  }
  return outcomes;
}
