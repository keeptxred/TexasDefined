-- Applied to Supabase project ftkznprjljkhymknvhye as migration 20261011231541.
CREATE OR REPLACE FUNCTION public.apply_texasdefined_billing_invoice_event(
  p_event_id text,
  p_event_type text,
  p_local_invoice_id uuid,
  p_stripe_invoice_id text,
  p_customer_id text,
  p_status text,
  p_amount_due_cents bigint,
  p_amount_paid_cents bigint,
  p_amount_remaining_cents bigint,
  p_due_at timestamptz,
  p_paid_at timestamptz
) RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
  v_invoice record;
  v_processed_at timestamptz;
BEGIN
  IF p_event_id IS NULL OR p_event_id !~ '^evt_[A-Za-z0-9_]+$'
    OR p_stripe_invoice_id IS NULL OR p_stripe_invoice_id !~ '^in_[A-Za-z0-9_]+$'
    OR p_customer_id IS NULL OR p_customer_id !~ '^cus_[A-Za-z0-9_]+$'
    OR p_status NOT IN ('draft','open','paid','void','uncollectible')
    OR p_amount_due_cents < 0 OR p_amount_paid_cents < 0 OR p_amount_remaining_cents < 0
  THEN RAISE EXCEPTION 'Invalid verified invoice input'; END IF;

  IF p_event_type NOT IN (
    'invoice.finalized','invoice.sent','invoice.paid','invoice.payment_failed',
    'invoice.voided','invoice.marked_uncollectible'
  ) THEN RETURN 'ignored'; END IF;

  SELECT i.id,i.stripe_invoice_id,i.billing_account_id,a.stripe_customer_id
    INTO v_invoice
  FROM public.texasdefined_billing_invoices i
  JOIN public.texasdefined_billing_accounts a ON a.id=i.billing_account_id
  WHERE i.id=p_local_invoice_id
  FOR UPDATE OF i,a;

  IF NOT FOUND THEN RETURN 'ignored'; END IF;
  IF v_invoice.stripe_invoice_id IS DISTINCT FROM p_stripe_invoice_id
    OR v_invoice.stripe_customer_id IS DISTINCT FROM p_customer_id
  THEN RETURN 'mismatch'; END IF;

  INSERT INTO public.texasdefined_billing_stripe_events(stripe_event_id,stripe_event_type)
  VALUES(p_event_id,p_event_type)
  ON CONFLICT(stripe_event_id) DO NOTHING;

  SELECT processed_at INTO v_processed_at
  FROM public.texasdefined_billing_stripe_events
  WHERE stripe_event_id=p_event_id
  FOR UPDATE;
  IF v_processed_at IS NOT NULL THEN RETURN 'already_processed'; END IF;

  UPDATE public.texasdefined_billing_invoices
  SET status=p_status,
      amount_due_cents=p_amount_due_cents,
      amount_paid_cents=p_amount_paid_cents,
      amount_remaining_cents=p_amount_remaining_cents,
      due_at=p_due_at,
      paid_at=p_paid_at,
      updated_at=now()
  WHERE id=p_local_invoice_id;

  UPDATE public.texasdefined_advertiser_agreements a
  SET invoice_status=p_status,
      payment_status=CASE
        WHEN p_status='paid' THEN 'paid'
        WHEN p_event_type='invoice.payment_failed' THEN 'failed'
        WHEN p_status IN ('void','uncollectible') THEN 'failed'
        ELSE 'pending'
      END
  WHERE a.id IN (
    SELECT li.source_id
    FROM public.texasdefined_billing_invoice_items li
    WHERE li.invoice_id=p_local_invoice_id
      AND li.source_type='advertiser_agreement'
      AND li.source_id IS NOT NULL
  );

  UPDATE public.texasdefined_partner_inquiries q
  SET status=CASE WHEN p_status='paid' THEN 'paid' ELSE 'awaiting_payment' END
  WHERE q.advertiser_agreement_id IN (
    SELECT li.source_id
    FROM public.texasdefined_billing_invoice_items li
    WHERE li.invoice_id=p_local_invoice_id
      AND li.source_type='advertiser_agreement'
      AND li.source_id IS NOT NULL
  )
  AND q.status NOT IN ('declined','closed','completed');

  UPDATE public.texasdefined_billing_stripe_events
  SET processed_at=now(),processing_error=NULL
  WHERE stripe_event_id=p_event_id;

  RETURN 'processed';
END;
$function$;

REVOKE ALL ON FUNCTION public.apply_texasdefined_billing_invoice_event(
  text,text,uuid,text,text,text,bigint,bigint,bigint,timestamptz,timestamptz
) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.apply_texasdefined_billing_invoice_event(
  text,text,uuid,text,text,text,bigint,bigint,bigint,timestamptz,timestamptz
) TO service_role;
