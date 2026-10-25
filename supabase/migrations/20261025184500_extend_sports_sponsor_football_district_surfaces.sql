-- Extend exact approved sponsored surface paths; preserve RLS, metrics and unique active placement.
ALTER TABLE public.texasdefined_sports_sponsor_placements
  DROP CONSTRAINT IF EXISTS texasdefined_sports_sponsor_placements_surface_path_check;
ALTER TABLE public.texasdefined_sports_sponsor_placements
  ADD CONSTRAINT texasdefined_sports_sponsor_placements_surface_path_check
  CHECK (
    surface_path = '/sports-venues'
    OR surface_path ~ '^/sports-venue/[a-z0-9-]+$'
    OR surface_path ~ '^/texas-high-school-football-teams/[a-z0-9-]+$'
    OR surface_path ~ '^/texas-high-school-football-districts/[a-z0-9-]+$'
  );
COMMENT ON CONSTRAINT texasdefined_sports_sponsor_placements_surface_path_check
  ON public.texasdefined_sports_sponsor_placements IS
  'Sports venue and football team/district pages only; existing sponsor approval, date windows, and per-surface exclusivity still apply.';
