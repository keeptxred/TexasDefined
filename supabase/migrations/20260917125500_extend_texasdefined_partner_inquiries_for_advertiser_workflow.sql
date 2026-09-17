ALTER TABLE public.texasdefined_partner_inquiries
  ADD COLUMN IF NOT EXISTS phone text,
  ADD COLUMN IF NOT EXISTS target_texas_locations text,
  ADD COLUMN IF NOT EXISTS desired_start_date date,
  ADD COLUMN IF NOT EXISTS objectives text,
  ADD COLUMN IF NOT EXISTS notes text,
  ADD COLUMN IF NOT EXISTS advertiser_agreement_id uuid REFERENCES public.texasdefined_advertiser_agreements(id) ON DELETE SET NULL;

ALTER TABLE public.texasdefined_partner_inquiries
  DROP CONSTRAINT IF EXISTS texasdefined_partner_inquiries_status_check,
  ADD CONSTRAINT texasdefined_partner_inquiries_status_check
    CHECK (status IN (
      'new','reviewing','contacted','closed',
      'approved','agreement_sent','agreement_signed','awaiting_payment','paid',
      'assets_needed','scheduled','live','completed','declined'
    )),
  ADD CONSTRAINT texasdefined_partner_inquiries_phone_check
    CHECK (phone IS NULL OR char_length(phone) <= 80),
  ADD CONSTRAINT texasdefined_partner_inquiries_target_texas_locations_check
    CHECK (target_texas_locations IS NULL OR char_length(target_texas_locations) <= 1000),
  ADD CONSTRAINT texasdefined_partner_inquiries_objectives_check
    CHECK (objectives IS NULL OR char_length(objectives) <= 3000),
  ADD CONSTRAINT texasdefined_partner_inquiries_notes_check
    CHECK (notes IS NULL OR char_length(notes) <= 3000);

CREATE INDEX IF NOT EXISTS texasdefined_partner_inquiries_advertiser_agreement_id_idx
  ON public.texasdefined_partner_inquiries(advertiser_agreement_id)
  WHERE advertiser_agreement_id IS NOT NULL;

COMMENT ON COLUMN public.texasdefined_partner_inquiries.phone IS 'Optional advertiser contact phone number.';
COMMENT ON COLUMN public.texasdefined_partner_inquiries.target_texas_locations IS 'Texas markets, cities, regions, counties or statewide targeting requested by the prospect.';
COMMENT ON COLUMN public.texasdefined_partner_inquiries.desired_start_date IS 'Prospect requested campaign start date.';
COMMENT ON COLUMN public.texasdefined_partner_inquiries.objectives IS 'Advertiser stated campaign objectives.';
COMMENT ON COLUMN public.texasdefined_partner_inquiries.notes IS 'Additional prospect-supplied campaign notes.';
COMMENT ON COLUMN public.texasdefined_partner_inquiries.advertiser_agreement_id IS 'Signed advertiser agreement linked to this inquiry after acceptance.';
