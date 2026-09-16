-- Keep the database constraint aligned with the public partner inquiry schema.
ALTER TABLE IF EXISTS public.texasdefined_partner_inquiries
  DROP CONSTRAINT IF EXISTS texasdefined_partner_inquiries_partnership_type_check;

ALTER TABLE IF EXISTS public.texasdefined_partner_inquiries
  ADD CONSTRAINT texasdefined_partner_inquiries_partnership_type_check
  CHECK (
    partnership_type IN (
      'insurance',
      'mortgage',
      'real-estate',
      'moving',
      'travel',
      'sports-travel',
      'brand-retail',
      'sponsorship',
      'other'
    )
  );
