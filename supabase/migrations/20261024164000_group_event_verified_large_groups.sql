-- Allow valid large corporate event plans while retaining existing private intake.
-- Multi-space Full Center Experience at Space Center Houston publishes 8,000 guests.
-- No changes to RLS, consent, anti-spam, booking, pricing or commercial status.
ALTER TABLE public.texasdefined_group_event_requests
  DROP CONSTRAINT texasdefined_group_event_requests_group_size_check;
ALTER TABLE public.texasdefined_group_event_requests
  ADD CONSTRAINT texasdefined_group_event_requests_group_size_check
  CHECK (group_size BETWEEN 2 AND 8000);
