ALTER TABLE public.texasdefined_advertiser_agreement_offers
  DROP CONSTRAINT IF EXISTS texasdefined_advertiser_agreement_offe_signed_agreement_id_fkey,
  ADD CONSTRAINT texasdefined_advertiser_agreement_offers_signed_agreement_id_fkey
    FOREIGN KEY (signed_agreement_id)
    REFERENCES public.texasdefined_advertiser_agreements(id)
    ON DELETE RESTRICT;
