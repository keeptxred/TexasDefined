import { verifyCjGitHubOidc } from './github-oidc-jwt.server';
import {
  aggregateCjCommissions,
  commissionGraphqlQuery,
  rgsProgramTermsGraphqlQuery,
  verifiedRgsContractStatus,
  type CjCommissionRecord,
  type CjContract,
} from './cj-account-reconciliation';
import { supabaseAdmin } from '../integrations/supabase/client.server';

const PATH = '/api/internal/cj-account-sync';
const COMMISSIONS_ENDPOINT = 'https://commissions.api.cj.com/query';
const PROGRAM_TERMS_ENDPOINT = 'https://programs.api.cj.com/query';
const REPORT_TABLE = 'texasdefined_cj_account_sync';
const REPORT_MIN_AGE_MS = 22 * 3600_000;
const MAX_PAGES = 4;

function safeResponse(status: number, data: Record<string, unknown>): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'private, no-store, max-age=0',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}

function requireSecret(env: unknown, name: string): string {
  const value = env && typeof env === 'object' ? Reflect.get(env, name) : null;
  if (typeof value !== 'string' || value.length < 16) throw new Error('Provider configuration unavailable.');
  return value;
}

async function cjQuery(endpoint: string, token: string, query: string): Promise<Record<string, any>> {
  const response = await fetch(endpoint, {
    method: 'POST', redirect: 'error', cache: 'no-store',
    headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ query }),
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error('CJ provider returned an unsuccessful status.');
  const body = await response.json() as Record<string, any>;
  if (body.errors?.length || !body.data || typeof body.data !== 'object') {
    throw new Error('CJ provider response failed GraphQL validation.');
  }
  return body.data as Record<string, any>;
}

function postingWindow(now = new Date()) {
  const tomorrowUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1);
  const startUtc = tomorrowUtc - 30 * 86400_000;
  return { since: new Date(startUtc).toISOString().replace('.000Z', 'Z'), before: new Date(tomorrowUtc).toISOString().replace('.000Z', 'Z') };
}

export async function cjAccountSyncResponse(request: Request, env: unknown): Promise<Response | null> {
  if (new URL(request.url).pathname !== PATH) return null;
  if (request.method !== 'POST') return safeResponse(405, { status: 'method_not_allowed' });
  const match = request.headers.get('Authorization')?.match(/^Bearer ([A-Za-z0-9_.-]+)$/);
  if (!match || !(await verifyCjGitHubOidc(match[1]))) {
    return safeResponse(401, { status: 'unauthorized' });
  }
  // The bearer token is a short-lived, audience-bound, RSA-verified GitHub OIDC
  // assertion from the existing protected analytics workflow, not a CJ token.
  try {
    const client = supabaseAdmin as any;
    const { data: last, error: lastError } = await client.from(REPORT_TABLE)
      .select('observed_at').eq('id', 'current').maybeSingle();
    if (lastError) throw new Error('CJ private snapshot table unavailable.');
    if (last?.observed_at && Date.now() - Date.parse(last.observed_at) < REPORT_MIN_AGE_MS) {
      return safeResponse(200, { status: 'ok', updated: false, source: 'cj-provider' });
    }

    const token = requireSecret(env, 'CJ_PERSONAL_ACCESS_TOKEN');
    const { since, before } = postingWindow();
    const records: CjCommissionRecord[] = [];
    let cursor: string | null = null;
    let complete = false;
    for (let page = 0; page < MAX_PAGES; page++) {
      const data = await cjQuery(COMMISSIONS_ENDPOINT, token, commissionGraphqlQuery(since, before, cursor));
      const result = data.publisherCommissions;
      if (!result || typeof result.payloadComplete !== 'boolean' || !Array.isArray(result.records)) {
        throw new Error('CJ commissions response is incomplete.');
      }
      records.push(...result.records);
      if (records.length > 30_000) throw new Error('CJ record bound exceeded.');
      if (result.payloadComplete) {
        complete = true;
        break;
      }
      if (!/^[0-9]{1,32}$/.test(result.maxCommissionId || '') || result.maxCommissionId === cursor) {
        throw new Error('Invalid CJ provider pagination.');
      }
      cursor = result.maxCommissionId;
    }
    if (!complete) throw new Error('CJ result incomplete: cursor page cap reached.');
    const summary = aggregateCjCommissions(records);

    // Program Terms is an independent, read-only relationship check. A pending
    // or ACTIVE term never activates retail links automatically.
    let rgs = { status: 'UNVERIFIED', verified: false, matchingCount: 0 };
    try {
      const program = await cjQuery(PROGRAM_TERMS_ENDPOINT, token, rgsProgramTermsGraphqlQuery());
      const contracts = program.publisher?.contracts;
      if (contracts && Array.isArray(contracts.resultList) &&
          typeof contracts.totalCount === 'number' && contracts.totalCount <= 30) {
        rgs = verifiedRgsContractStatus(contracts.resultList as CjContract[]);
      }
    } catch {
      // Commission data is still valid; relationship state remains UNVERIFIED.
    }

    const snapshot = {
      id: 'current',
      observed_at: new Date().toISOString(),
      window_start: since,
      window_before: before,
      publisher_cid: '8062457',
      payload_complete: true,
      commission_record_count: summary.commissionRecordCount,
      commission_delta_usd: summary.commissionDeltaUsd,
      closed_or_locked_record_count: summary.closedOrLockedCount,
      palestine_hotels_record_count: summary.palestineCommissionRecordCount,
      palestine_hotels_delta_usd: summary.palestineCommissionDeltaUsd,
      hotels_records_missing_sid: summary.palestineMissingSidUnattributed,
      rgs_contract_status: rgs.status,
      rgs_contracts_checked: rgs.matchingCount,
      rgs_terms_verified: rgs.verified,
    };
    const { error: saveError } = await client.from(REPORT_TABLE).upsert(snapshot, { onConflict: 'id' });
    if (saveError) throw new Error('CJ private snapshot could not be saved.');
    // No private commission amount, transaction, link, or raw provider response
    // ever appears in a public response or GitHub Actions logs.
    return safeResponse(200, { status: 'ok', updated: true, source: 'cj-provider', termsVerified: rgs.verified });
  } catch {
    return safeResponse(502, { status: 'provider_sync_unavailable' });
  }
}
