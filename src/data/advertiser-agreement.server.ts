import { createHash } from 'node:crypto';

import { supabaseAdmin } from '@/integrations/supabase/client.server';

export type AdvertiserAgreementInsert = {
  agreement_version: string;
  agreement_snapshot: string;
  tier: 'local' | 'growth' | 'premier' | 'custom';
  billing_cycle: 'monthly' | 'annual';
  published_price_cents: number | null;
  legal_name: string;
  business_name: string;
  signer_name: string;
  signer_title: string;
  signer_email: string;
  billing_email: string;
  billing_address: string;
  company_website: string | null;
  requested_start: string | null;
  campaign_notes: string | null;
  typed_signature: string;
  authority_confirmed: boolean;
  esign_consent: boolean;
  source_path: string;
};

type StoredAdvertiserAgreementInsert = AdvertiserAgreementInsert & {
  agreement_snapshot_sha256: string;
};

type InsertResult = { error: { message: string } | null };
type AdvertiserAgreementAdminClient = {
  from: (table: string) => {
    insert: (value: StoredAdvertiserAgreementInsert) => PromiseLike<InsertResult>;
  };
};

export async function saveAdvertiserAgreement(value: AdvertiserAgreementInsert) {
  const client = supabaseAdmin as unknown as AdvertiserAgreementAdminClient;
  const agreement_snapshot_sha256 = createHash('sha256').update(value.agreement_snapshot, 'utf8').digest('hex');
  const { error } = await client.from('texasdefined_advertiser_agreements').insert({
    ...value,
    agreement_snapshot_sha256,
  });
  if (error) throw new Error(`Advertiser agreement could not be saved: ${error.message}`);
}
