ALTER TABLE public.texasdefined_partner_inquiries
  ADD COLUMN IF NOT EXISTS requested_tier text,
  ADD COLUMN IF NOT EXISTS billing_cycle text;

ALTER TABLE public.texasdefined_partner_inquiries
  DROP CONSTRAINT IF EXISTS texasdefined_partner_inquiries_requested_tier_check,
  ADD CONSTRAINT texasdefined_partner_inquiries_requested_tier_check
    CHECK (requested_tier IS NULL OR requested_tier IN ('local','growth','premier','custom')),
  DROP CONSTRAINT IF EXISTS texasdefined_partner_inquiries_billing_cycle_check,
  ADD CONSTRAINT texasdefined_partner_inquiries_billing_cycle_check
    CHECK (billing_cycle IS NULL OR billing_cycle IN ('monthly','annual'));

COMMENT ON COLUMN public.texasdefined_partner_inquiries.requested_tier IS
  'Advertiser package selected when the prospect submitted the inquiry.';
COMMENT ON COLUMN public.texasdefined_partner_inquiries.billing_cycle IS
  'Monthly or annual billing preference selected with the inquiry.';
