create index if not exists texasdefined_advertiser_agreement_offers_signed_agreement_idx
  on public.texasdefined_advertiser_agreement_offers (signed_agreement_id)
  where signed_agreement_id is not null;
