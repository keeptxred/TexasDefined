/**
 * Pure, provider-verified CJ GraphQL query and privacy-safe aggregation.
 * No raw order IDs, commission IDs, shopper identities or advertiser details
 * are persisted or returned by the private sync endpoint.
 */
export const CJ_PUBLISHER_CID = '8062457'; // Publisher company ID, NOT website PID 101876465.
export const CJ_RGS_ADVERTISER_CID = '7552520';
export const CJ_HOTELS_ADVERTISER_CID = '1702763';
export const PALESTINE_SID = 'td_polar_palestine';

export type CjCommissionRecord = {
  commissionId: string;
  publisherId: string;
  advertiserId: string;
  shopperId: string | null;
  actionStatus: string;
  original: boolean;
  pubCommissionAmountUsd: string;
};

export type CjAccountAggregate = {
  commissionRecordCount: number;
  commissionDeltaUsd: number;
  palestineCommissionRecordCount: number;
  palestineCommissionDeltaUsd: number;
  palestineMissingSidUnattributed: boolean;
  closedOrLockedCount: number;
};

function validatedUtcInstant(iso: string): number {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(iso)) throw new Error('Invalid CJ UTC window.');
  const value = Date.parse(iso);
  if (!Number.isFinite(value) || new Date(value).toISOString().slice(0, 19) !== iso.slice(0, 19)) {
    throw new Error('Invalid CJ UTC instant.');
  }
  return value;
}

export function commissionGraphqlQuery(since: string, before: string, cursor: string | null): string {
  const start = validatedUtcInstant(since);
  const end = validatedUtcInstant(before);
  if (!(end > start && end - start <= 31 * 86400_000)) throw new Error('CJ requires a <=31-day window.');
  if (cursor !== null && !/^[0-9]{1,32}$/.test(cursor)) throw new Error('Invalid CJ pagination cursor.');
  const pagination = cursor ? `, sinceCommissionId: "${cursor}"` : '';
  return `query TexasDefinedPublisherCommissions {
    publisherCommissions(
      forPublishers: ["${CJ_PUBLISHER_CID}"],
      sincePostingDate: "${since}",
      beforePostingDate: "${before}"${pagination}
    ) {
      count payloadComplete maxCommissionId
      records {
        commissionId publisherId advertiserId shopperId
        actionStatus original pubCommissionAmountUsd
      }
    }
  }`;
}

export function rgsProgramTermsGraphqlQuery(): string {
  return `query TexasDefinedReallyGoodStuffContract {
    publisher {
      contracts(
        publisherId: "${CJ_PUBLISHER_CID}",
        limit: 30,
        filters: { advertiserId: "${CJ_RGS_ADVERTISER_CID}" }
      ) {
        count totalCount
        resultList { advertiserId status startTime endTime }
      }
    }
  }`;
}

function moneyInMicros(value: string): bigint {
  if (typeof value !== 'string' || !/^-?\d{1,14}(?:\.\d{1,6})?$/.test(value)) {
    throw new Error('Invalid provider USD amount.');
  }
  const negative = value.startsWith('-');
  const unsigned = negative ? value.slice(1) : value;
  const [whole, fraction = ''] = unsigned.split('.');
  const micros = BigInt(whole) * 1_000_000n + BigInt(fraction.padEnd(6, '0'));
  return negative ? -micros : micros;
}

export function aggregateCjCommissions(records: CjCommissionRecord[]): CjAccountAggregate {
  let total = 0n;
  let palestine = 0n;
  let closedOrLockedCount = 0;
  let palestineCount = 0;
  let missingSid = false;
  const seen = new Set<string>();
  if (!Array.isArray(records) || records.length > 30_000) throw new Error('CJ record bound exceeded.');
  for (const row of records) {
    if (!row || !/^\d+$/.test(row.commissionId) || !row.publisherId) throw new Error('Malformed CJ record.');
    if (row.publisherId !== CJ_PUBLISHER_CID) throw new Error('CJ returned an unauthorized publisher.');
    if (seen.has(row.commissionId)) throw new Error('Duplicate CJ commission cursor record.');
    seen.add(row.commissionId);
    const delta = moneyInMicros(row.pubCommissionAmountUsd);
    total += delta;
    if (row.actionStatus === 'closed' || row.actionStatus === 'locked') closedOrLockedCount++;
    if (row.advertiserId === CJ_HOTELS_ADVERTISER_CID) {
      if (row.shopperId === PALESTINE_SID) {
        palestine += delta;
        palestineCount++;
      } else if (!row.shopperId) {
        missingSid = true; // Cannot attribute generic Hotels.com transactions to Palestine.
      }
    }
  }
  const usd = (amount: bigint) => {
    const value = Number(amount) / 1_000_000;
    if (!Number.isSafeInteger(Number(amount)) || !Number.isFinite(value)) {
      throw new Error('CJ aggregate amount exceeds safe precision.');
    }
    return Math.round(value * 10000) / 10000;
  };
  return {
    commissionRecordCount: records.length,
    commissionDeltaUsd: usd(total),
    palestineCommissionRecordCount: palestineCount,
    palestineCommissionDeltaUsd: usd(palestine),
    palestineMissingSidUnattributed: missingSid,
    closedOrLockedCount,
  };
}

export type CjContract = { advertiserId: string; status: string; startTime: string | null; endTime: string | null };

export function verifiedRgsContractStatus(
  contracts: CjContract[],
  now: number = Date.now(),
): { status: string; verified: boolean; matchingCount: number } {
  if (!Array.isArray(contracts)) return { status: 'UNVERIFIED', verified: false, matchingCount: 0 };
  const matching = contracts.filter(r => r.advertiserId === CJ_RGS_ADVERTISER_CID);
  const eligible = matching.filter(r => r.status === 'ACTIVE' &&
    (!r.startTime || Date.parse(r.startTime) <= now) &&
    (!r.endTime || Date.parse(r.endTime) > now));
  // A verified active contract proves a current relationship, not an approved shopper URL.
  if (eligible.length) return { status: 'ACTIVE', verified: true, matchingCount: matching.length };
  if (matching.some(r => r.status === 'PENDING_OFFER' || r.status === 'PENDING_REVERSION')) {
    return { status: 'PENDING', verified: true, matchingCount: matching.length };
  }
  return { status: matching.length ? 'INACTIVE' : 'NO_MATCH', verified: true, matchingCount: matching.length };
}
