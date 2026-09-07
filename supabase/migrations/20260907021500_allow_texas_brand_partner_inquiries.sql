alter table public.texasdefined_partner_inquiries
  drop constraint if exists texasdefined_partner_inquiries_partnership_type_check;

alter table public.texasdefined_partner_inquiries
  add constraint texasdefined_partner_inquiries_partnership_type_check
  check (partnership_type = any (array[
    'insurance'::text,
    'mortgage'::text,
    'real-estate'::text,
    'moving'::text,
    'travel'::text,
    'sports-travel'::text,
    'brand-retail'::text,
    'sponsorship'::text,
    'other'::text
  ]));
