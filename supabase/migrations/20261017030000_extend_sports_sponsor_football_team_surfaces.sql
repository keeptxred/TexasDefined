-- Extend the existing governed sports-placement inventory to verified football profiles.
-- This is additive only: approval governance, RLS, links, dates, and launch hold remain unchanged.
ALTER TABLE public.texasdefined_sports_sponsor_placements
  DROP CONSTRAINT IF EXISTS texasdefined_sports_sponsor_placements_surface_path_check;

ALTER TABLE public.texasdefined_sports_sponsor_placements
  ADD CONSTRAINT texasdefined_sports_sponsor_placements_surface_path_check
  CHECK (
    surface_path = '/sports-venues'
    OR surface_path ~ '^/sports-venue/[a-z0-9-]+$'
    OR surface_path ~ '^/texas-high-school-football-teams/[a-z0-9-]+$'
  );

COMMENT ON CONSTRAINT texasdefined_sports_sponsor_placements_surface_path_check
  ON public.texasdefined_sports_sponsor_placements IS
  'Only canonical sports venue and high-school football profile routes can receive governed placements; launch and approval holds remain separate.';
