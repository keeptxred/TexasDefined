-- October 17, 2026 editorial correction: Hamilton Pool is not currently a
-- swimming destination because of rockfall hazards; Caprock's marked swim
-- area is closed even though other lake swimming remains permitted.
-- Watch the exact operators' notices daily. These are editorial triggers,
-- never automatic proof that a particular swimming area is open.
INSERT INTO public.td_authority_verification_sources
  (path, source_url, label, cadence_days, next_check_at)
VALUES
  ('/explore/swimming-holes-river-tubing',
   'https://drippingspringstx.gov/facilities/facility/details/Hamilton-Pool-Preserve-3',
   'City of Dripping Springs municipal visitor notice: Hamilton Pool rockfall swimming prohibition',
   1, now()),
  ('/explore/swimming-holes-river-tubing',
   'https://tpwd.texas.gov/state-parks/caprock-canyons/alert',
   'TPWD Caprock Canyons Lake Theo marked swim area closure and permitted lake access',
   1, now()),
  ('/explore/swimming-holes-river-tubing',
   'https://tpwd.texas.gov/state-parks/pedernales-falls',
   'TPWD Pedernales Falls prohibition on swimming at the falls and permitted river swim area',
   1, now())
ON CONFLICT (path, source_url) DO UPDATE SET
  label = excluded.label,
  cadence_days = least(public.td_authority_verification_sources.cadence_days, excluded.cadence_days),
  next_check_at = least(public.td_authority_verification_sources.next_check_at, now());
