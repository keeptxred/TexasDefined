-- Run through privileged SQL connection, all changes revert after test.
BEGIN;
DO $proof$
DECLARE
  v_run_id uuid:=gen_random_uuid();
  v_row_id text:='2021:city:cooper';
  v_original_rate numeric;
  v_year_count integer;
  v_raw_count integer;
  v_result jsonb;
  v_logged integer;
  v_before jsonb;
  v_after jsonb;
BEGIN
  SELECT total_rate INTO v_original_rate
    FROM public.texas_property_tax_rates WHERE id=v_row_id AND year=2021;
  SELECT count(*) INTO v_year_count
    FROM public.texas_property_tax_rates WHERE year=2021;
  SELECT count(*) INTO v_raw_count
    FROM public.texas_tax_import_source_rows WHERE tax_year=2021;
  IF v_original_rate IS NULL OR v_year_count<>4439 OR v_raw_count<>5346 THEN
    RAISE EXCEPTION 'Expected official 2021 audit fixture not available';
  END IF;
  INSERT INTO public.texas_tax_import_runs
    (id,tax_year,source_signature,sources,expected_count,expected_raw_count)
    VALUES(v_run_id,2021,repeat('e',64),'[]'::jsonb,v_year_count,v_raw_count);
  INSERT INTO public.texas_tax_import_stage(run_id,record_id,record)
    SELECT v_run_id,id,to_jsonb(t)
    FROM public.texas_property_tax_rates t WHERE year=2021;
  INSERT INTO public.texas_tax_import_raw_stage(run_id,unit_type,ordinal,record)
    SELECT v_run_id,unit_type,ordinal,record
    FROM public.texas_tax_import_source_rows WHERE tax_year=2021;
  UPDATE public.texas_tax_import_stage
    SET record=jsonb_set(record,'{total_rate}',to_jsonb(v_original_rate+0.000001),true)
    WHERE run_id=v_run_id AND record_id=v_row_id;
  v_result:=public.finalize_texas_tax_import(v_run_id,false);
  IF v_result->>'status'<>'imported' OR (v_result->>'modified')::integer<>1 THEN
    RAISE EXCEPTION 'Unexpected finalizer outcome: %',v_result;
  END IF;
  SELECT count(*) INTO v_logged
    FROM public.texas_tax_import_changes WHERE run_id=v_run_id;
  SELECT previous_record,next_record INTO v_before,v_after
    FROM public.texas_tax_import_changes WHERE run_id=v_run_id AND record_id=v_row_id;
  IF v_logged<>1 OR v_before IS NULL OR v_after IS NULL
    OR (v_before->>'total_rate')::numeric<>v_original_rate
    OR (v_after->>'total_rate')::numeric<>v_original_rate+0.000001
    OR v_before->>'imported_at' IS NULL THEN
    RAISE EXCEPTION 'Unit-level audit missing original and changed values';
  END IF;
  RAISE NOTICE 'PASS: one changed unit and its previous/new rates captured';
END
$proof$;
ROLLBACK;
