-- Applied to Supabase project ftkznprjljkhymknvhye as migration 20261010211826.
-- Atomic service-only Network Stripe replay, entitlement, suspension and application state.
CREATE OR REPLACE FUNCTION public.apply_texasdefined_network_stripe_event(
  p_application_id uuid, p_event_id text, p_event_type text,
  p_subscription_id text, p_customer_id text, p_paid_active boolean
) RETURNS text LANGUAGE plpgsql SECURITY DEFINER SET search_path = ''
AS $function$
DECLARE
  v_application record;
  v_processed_at timestamptz;
BEGIN
  IF p_event_id IS NULL OR length(p_event_id) > 255 OR p_event_id !~ '^evt_[a-zA-Z0-9_]+$'
    OR p_subscription_id IS NULL OR p_subscription_id !~ '^sub_[a-zA-Z0-9_]+$'
    OR p_customer_id IS NULL OR p_customer_id !~ '^cus_[a-zA-Z0-9_]+$'
    OR p_paid_active IS NULL THEN
    RAISE EXCEPTION 'Invalid verified subscription input';
  END IF;
  IF p_event_type NOT IN (
    'customer.subscription.created','customer.subscription.updated','customer.subscription.deleted',
    'invoice.paid','invoice.payment_failed'
  ) THEN RETURN 'ignored'; END IF;

  -- Serialize per-application changes and concurrent replay attempts.
  SELECT id,plan,status,stripe_subscription_id,stripe_customer_id INTO v_application
  FROM public.texasdefined_network_applications WHERE id=p_application_id FOR UPDATE;
  IF NOT FOUND OR v_application.plan <> 'plus' THEN RETURN 'ignored'; END IF;
  IF (v_application.stripe_subscription_id IS NOT NULL
        AND v_application.stripe_subscription_id <> p_subscription_id)
    OR (v_application.stripe_customer_id IS NOT NULL
        AND v_application.stripe_customer_id <> p_customer_id)
  THEN RETURN 'mismatch'; END IF;

  INSERT INTO public.texasdefined_network_stripe_events(stripe_event_id,stripe_event_type)
  VALUES(p_event_id,p_event_type) ON CONFLICT (stripe_event_id) DO NOTHING;
  SELECT processed_at INTO v_processed_at
  FROM public.texasdefined_network_stripe_events
  WHERE stripe_event_id=p_event_id FOR UPDATE;
  IF v_processed_at IS NOT NULL THEN RETURN 'already_processed'; END IF;

  IF NOT p_paid_active THEN
    UPDATE public.texasdefined_network_public_listings
    SET is_published=false,updated_at=now()
    WHERE application_id=p_application_id AND plan='plus' AND is_published=true;
  END IF;
  UPDATE public.texasdefined_network_applications
  SET stripe_customer_id=p_customer_id,
      stripe_subscription_id=p_subscription_id,
      paid_entitlement_active=p_paid_active,
      status=CASE WHEN NOT p_paid_active AND status='published' THEN 'approved' ELSE status END,
      updated_at=now()
  WHERE id=p_application_id;
  UPDATE public.texasdefined_network_stripe_events
  SET processed_at=now(),processing_error=NULL
  WHERE stripe_event_id=p_event_id;
  RETURN 'processed';
END;
$function$;
REVOKE ALL ON FUNCTION public.apply_texasdefined_network_stripe_event(uuid,text,text,text,text,boolean)
FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.apply_texasdefined_network_stripe_event(uuid,text,text,text,text,boolean)
TO service_role;
