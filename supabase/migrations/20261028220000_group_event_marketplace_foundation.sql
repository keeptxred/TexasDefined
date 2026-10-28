-- Build 1: reuse Explore entities, locations, media and tags. Do not copy
-- business addresses or create a second business/location directory.
-- Existing corporate-event editorial listings retain their slugs and routes.
-- These tables have no public roles/policies, no customer data, no booking,
-- no payment operations, and no automated external venue outreach.

CREATE TABLE IF NOT EXISTS public.texasdefined_group_event_provider_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_entity_id uuid REFERENCES public.explore_entities(id) ON DELETE RESTRICT,
  legacy_provider_slug text,
  location_id uuid NOT NULL REFERENCES public.explore_locations(id) ON DELETE RESTRICT,
  verification_status text NOT NULL DEFAULT 'unverified'
    CHECK (verification_status IN ('unverified','verified','stale')),
  source_url text,
  last_checked_at timestamptz,
  verified_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (provider_entity_id IS NOT NULL OR legacy_provider_slug IS NOT NULL),
  CHECK (legacy_provider_slug IS NULL OR legacy_provider_slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  CHECK (source_url IS NULL OR left(source_url,8) = 'https://'),
  CHECK (verification_status <> 'verified' OR (verified_at IS NOT NULL AND source_url IS NOT NULL))
);
COMMENT ON TABLE public.texasdefined_group_event_provider_locations IS
  'Private verified identity links from a corporate-event operator to existing Explore physical locations. No duplicated address or venue record.';
CREATE UNIQUE INDEX IF NOT EXISTS td_ge_provider_location_entity_unique
  ON public.texasdefined_group_event_provider_locations (provider_entity_id, location_id)
  WHERE provider_entity_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS td_ge_provider_location_legacy_unique
  ON public.texasdefined_group_event_provider_locations (legacy_provider_slug, location_id)
  WHERE legacy_provider_slug IS NOT NULL;
CREATE INDEX IF NOT EXISTS td_ge_provider_location_city_lookup
  ON public.texasdefined_group_event_provider_locations (location_id);

CREATE TABLE IF NOT EXISTS public.texasdefined_group_event_experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  provider_location_id uuid REFERENCES public.texasdefined_group_event_provider_locations(id) ON DELETE RESTRICT,
  provider_entity_id uuid REFERENCES public.explore_entities(id) ON DELETE RESTRICT,
  legacy_provider_slug text,
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 180),
  description text,
  -- A mobile or multi-site experience need not claim a permanent venue.
  service_cities text[] NOT NULL DEFAULT '{}',
  min_participants integer CHECK (min_participants > 0),
  max_participants integer CHECK (max_participants > 0),
  simultaneous_capacity integer CHECK (simultaneous_capacity > 0),
  rotations_confirmed boolean NOT NULL DEFAULT false,
  typical_duration_minutes integer CHECK (typical_duration_minutes > 0 AND typical_duration_minutes <= 10080),
  setting text NOT NULL DEFAULT 'unknown'
    CHECK (setting IN ('indoor','outdoor','mixed','unknown')),
  food_status text NOT NULL DEFAULT 'unknown'
    CHECK (food_status IN ('available','unavailable','unknown')),
  group_booking_status text NOT NULL DEFAULT 'unknown'
    CHECK (group_booking_status IN ('eligible','ineligible','unknown')),
  participation_status text NOT NULL DEFAULT 'independent'
    CHECK (participation_status IN ('independent','participating','sponsored')),
  -- Existing private partner application is the evidence anchor, not a new login.
  partner_application_id uuid REFERENCES public.texasdefined_group_event_partner_applications(id) ON DELETE RESTRICT,
  participation_approved_at timestamptz,
  sponsorship_approved_at timestamptz,
  source_url text,
  last_checked_at timestamptz,
  verified_at timestamptz,
  verification_status text NOT NULL DEFAULT 'unverified'
    CHECK (verification_status IN ('unverified','verified','stale')),
  primary_media_id uuid REFERENCES public.explore_media(id) ON DELETE RESTRICT,
  primary_media_rights text NOT NULL DEFAULT 'unconfirmed'
    CHECK (primary_media_rights IN ('unconfirmed','authorized','licensed','owned','approved-promo')),
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (provider_location_id IS NOT NULL OR provider_entity_id IS NOT NULL OR legacy_provider_slug IS NOT NULL),
  CHECK (legacy_provider_slug IS NULL OR legacy_provider_slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  CHECK (min_participants IS NULL OR max_participants IS NULL OR min_participants <= max_participants),
  CHECK (simultaneous_capacity IS NULL OR max_participants IS NULL OR simultaneous_capacity <= max_participants),
  CHECK (source_url IS NULL OR left(source_url,8) = 'https://'),
  CHECK (participation_status = 'independent' OR (partner_application_id IS NOT NULL AND participation_approved_at IS NOT NULL)),
  CHECK (participation_status <> 'sponsored' OR sponsorship_approved_at IS NOT NULL),
  CHECK (NOT is_published OR (verification_status = 'verified' AND source_url IS NOT NULL AND verified_at IS NOT NULL)),
  CHECK (NOT is_published OR primary_media_id IS NULL OR primary_media_rights <> 'unconfirmed')
);
COMMENT ON TABLE public.texasdefined_group_event_experiences IS
  'Private editorial experience catalog. Venue capacity does not become activity capacity; commercial status needs explicit evidence; unverified records cannot publish.';
CREATE INDEX IF NOT EXISTS td_ge_experience_public_read
  ON public.texasdefined_group_event_experiences (is_published,verification_status,participation_status)
  WHERE is_published = true;
CREATE INDEX IF NOT EXISTS td_ge_experience_partner_evidence
  ON public.texasdefined_group_event_experiences (partner_application_id)
  WHERE partner_application_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS td_ge_experience_provider_entity
  ON public.texasdefined_group_event_experiences (provider_entity_id)
  WHERE provider_entity_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS td_ge_experience_provider_legacy
  ON public.texasdefined_group_event_experiences (legacy_provider_slug)
  WHERE legacy_provider_slug IS NOT NULL;
CREATE INDEX IF NOT EXISTS td_ge_experience_location
  ON public.texasdefined_group_event_experiences (provider_location_id)
  WHERE provider_location_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS public.texasdefined_group_event_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  experience_id uuid NOT NULL REFERENCES public.texasdefined_group_event_experiences(id) ON DELETE RESTRICT,
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 180),
  description text,
  min_participants integer CHECK (min_participants > 0),
  max_participants integer CHECK (max_participants > 0),
  duration_minutes integer CHECK (duration_minutes > 0 AND duration_minutes <= 10080),
  price_per_person_cents integer CHECK (price_per_person_cents >= 0),
  minimum_spend_cents integer CHECK (minimum_spend_cents >= 0),
  currency text NOT NULL DEFAULT 'USD' CHECK (currency = 'USD'),
  includes_food boolean,
  restrictions text,
  starts_on date,
  ends_on date,
  source_url text,
  last_checked_at timestamptz,
  verified_at timestamptz,
  verification_status text NOT NULL DEFAULT 'unverified'
    CHECK (verification_status IN ('unverified','verified','stale')),
  is_published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (min_participants IS NULL OR max_participants IS NULL OR min_participants <= max_participants),
  CHECK (starts_on IS NULL OR ends_on IS NULL OR ends_on >= starts_on),
  CHECK (source_url IS NULL OR left(source_url,8) = 'https://'),
  CHECK (NOT is_published OR (verification_status = 'verified' AND verified_at IS NOT NULL AND source_url IS NOT NULL))
);
COMMENT ON TABLE public.texasdefined_group_event_packages IS
  'Optional verified activity-specific packages. Unknown capacity, duration, pricing and validity remain NULL, never manufactured.';
CREATE INDEX IF NOT EXISTS td_ge_packages_experience
  ON public.texasdefined_group_event_packages (experience_id,is_published);

-- Reuse existing Explore tag identities, rather than create competing tags.
CREATE TABLE IF NOT EXISTS public.texasdefined_group_event_experience_tags (
  experience_id uuid NOT NULL REFERENCES public.texasdefined_group_event_experiences(id) ON DELETE RESTRICT,
  tag_id uuid NOT NULL REFERENCES public.explore_tags(id) ON DELETE RESTRICT,
  category text NOT NULL CHECK (category IN ('occasion','activity','amenity','setting')),
  verified_at timestamptz,
  source_url text,
  PRIMARY KEY (experience_id, tag_id),
  CHECK (source_url IS NULL OR left(source_url,8) = 'https://'),
  CHECK (verified_at IS NULL OR source_url IS NOT NULL)
);
CREATE INDEX IF NOT EXISTS td_ge_experience_tags_category
  ON public.texasdefined_group_event_experience_tags (category,tag_id);
COMMENT ON TABLE public.texasdefined_group_event_experience_tags IS
  'Controlled group-event classifications reference the existing Explore tag vocabulary; unknown amenities receive no confirmed tag.';

-- Seed only namespace-isolated terms. Do not change other Explore categories.
WITH vocabulary(category, slug) AS (
  SELECT 'occasion', unnest(ARRAY[
    'corporate-events','team-building','employee-appreciation','company-parties',
    'client-entertainment','family-reunions','birthdays','graduations','anniversaries',
    'bachelor-parties','bachelorette-parties','weddings','rehearsal-dinners','private-gatherings'
  ]::text[])
  UNION ALL SELECT 'activity', unnest(ARRAY[
    'escape-room','mini-golf','golf-entertainment','bowling','arcade','virtual-reality',
    'laser-tag','cooking-class','group-cruise','fishing-charter','guided-tour',
    'outdoor-adventure','private-dining','group-sports','team-competition'
  ]::text[])
  UNION ALL SELECT 'amenity', unnest(ARRAY[
    'food-available','full-restaurant','catering-available','outside-catering-permitted',
    'bar-available','separate-alcohol-billing','parking','wheelchair-accessibility',
    'audiovisual-equipment','private-meeting-space'
  ]::text[])
)
INSERT INTO public.explore_tags (key,slug,name,tag_group)
SELECT 'ge_' || category || '_' || replace(slug,'-','_'),
       'ge-' || category || '-' || slug,
       initcap(replace(slug,'-',' ')),
       'group_event_' || category
FROM vocabulary
ON CONFLICT (key) DO NOTHING;

-- Server-only reads and writes. No new public API access, email, quote routing,
-- customer accounts, payment processing or venue contact actions.
ALTER TABLE public.texasdefined_group_event_provider_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.texasdefined_group_event_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.texasdefined_group_event_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.texasdefined_group_event_experience_tags ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.texasdefined_group_event_provider_locations FROM anon, authenticated;
REVOKE ALL ON public.texasdefined_group_event_experiences FROM anon, authenticated;
REVOKE ALL ON public.texasdefined_group_event_packages FROM anon, authenticated;
REVOKE ALL ON public.texasdefined_group_event_experience_tags FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.texasdefined_group_event_provider_locations TO service_role;
GRANT SELECT, INSERT, UPDATE ON public.texasdefined_group_event_experiences TO service_role;
GRANT SELECT, INSERT, UPDATE ON public.texasdefined_group_event_packages TO service_role;
GRANT SELECT, INSERT, UPDATE ON public.texasdefined_group_event_experience_tags TO service_role;
