CREATE TABLE IF NOT EXISTS public.texasdefined_partner_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  contact_name text NOT NULL CHECK (char_length(contact_name) BETWEEN 2 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 5 AND 320),
  company text NOT NULL CHECK (char_length(company) BETWEEN 2 AND 180),
  website text CHECK (website IS NULL OR char_length(website) <= 500),
  partnership_type text NOT NULL CHECK (partnership_type IN ('insurance', 'mortgage', 'real-estate', 'moving', 'travel', 'sponsorship', 'other')),
  message text NOT NULL CHECK (char_length(message) BETWEEN 20 AND 5000),
  source_path text NOT NULL DEFAULT '/partner-with-us' CHECK (char_length(source_path) <= 500),
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'contacted', 'closed'))
);

ALTER TABLE public.texasdefined_partner_inquiries ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.texasdefined_partner_inquiries FROM anon, authenticated;
GRANT ALL ON TABLE public.texasdefined_partner_inquiries TO service_role;

CREATE INDEX IF NOT EXISTS texasdefined_partner_inquiries_created_at_idx
  ON public.texasdefined_partner_inquiries (created_at DESC);

COMMENT ON TABLE public.texasdefined_partner_inquiries IS
  'Private TexasDefined commercial partnership inquiries submitted through the server-only Partner With Us form.';
