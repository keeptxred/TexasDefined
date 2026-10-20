-- Angelina National Forest: use dated 2025 USDA area measurements
-- (153,334 acres in four counties), while keeping the older visitor listing
-- available as corroboration of the conflicting 153,179-acre figure.
INSERT INTO public.td_authority_verification_sources
  (path, source_url, label, next_check_at)
SELECT '/destination/angelina-national-forest', v.source_url, v.label, now()
FROM (
  VALUES
    ('https://www.fs.usda.gov/sites/nfs/files/r08/texas/publication/National%20Forests%20and%20Grasslands%20Fingertip%20Facts_03262025_0.pdf',
     'USFS March 2025 Fingertip Facts: Angelina National Forest acreage and county breakdown'),
    ('https://www.fs.usda.gov/r08/texas',
     'USFS official National Forests and Grasslands in Texas site'),
    ('https://www.recreation.gov/camping/campgrounds/10158892',
     'Federal Recreation.gov Townsend site description: 153,179-acre conflicting reference'),
    ('https://www.recreation.gov/camping/campgrounds/233239',
     'Federal Recreation.gov Boykin Springs Pavilion map reference and FR 313 directions')
) AS v(source_url,label)
WHERE EXISTS (
  SELECT 1 FROM public.td_authority_verification_registry
  WHERE path='/destination/angelina-national-forest'
)
ON CONFLICT (path, source_url) DO UPDATE SET label=EXCLUDED.label;
