import { newsletterSignupSchema, newsletterTokenSchema } from '@/data/newsletter/newsletter-contract';

const NO_STORE_HEADERS = {
  'cache-control': 'no-store',
  'x-robots-tag': 'noindex, nofollow',
};

const textHeaders = {
  ...NO_STORE_HEADERS,
  'content-type': 'text/plain; charset=utf-8',
};

function normalizedPath(request: Request) {
  const path = new URL(request.url).pathname;
  return path.length > 1 ? path.replace(/\/+$/, '').toLowerCase() : path;
}

function tokenFromUrl(request: Request) {
  return new URL(request.url).searchParams.get('token') || '';
}

function methodNotAllowed(allowed: string) {
  return new Response('Method not allowed.', { status: 405, headers: { ...textHeaders, allow: allowed } });
}

async function subscribe(request: Request) {
  if (request.method !== 'POST') return methodNotAllowed('POST');
  if (process.env['NEWSLETTER_SIGNUPS_ENABLED'] !== 'true') {
    return Response.json({ ok: false, error: 'not_found' }, { status: 404, headers: NO_STORE_HEADERS });
  }
  const contentLength = Number(request.headers.get('content-length') || '0');
  if (Number.isFinite(contentLength) && contentLength > 16_384) {
    return Response.json({ ok: false, error: 'payload_too_large' }, { status: 413, headers: NO_STORE_HEADERS });
  }
  const body = await request.json().catch(() => null);
  const parsed = newsletterSignupSchema.safeParse(body);
  if (!parsed.success) return Response.json({ ok: false, error: 'invalid_signup' }, { status: 400, headers: NO_STORE_HEADERS });
  // Quietly accept honeypot submissions so bots do not learn the filter.
  if (parsed.data.addressLine2.trim()) return Response.json({ ok: true }, { headers: NO_STORE_HEADERS });

  const { newsletterRequiresConfirmation, subscribeNewsletter } = await import('@/data/newsletter/newsletter.server');
  if (newsletterRequiresConfirmation()) {
    const { newsletterConfirmationEmailReady } = await import('@/data/newsletter/newsletter-confirmation.server');
    if (!newsletterConfirmationEmailReady()) {
      return Response.json({ ok: false, error: 'confirmation_unavailable' }, { status: 503, headers: NO_STORE_HEADERS });
    }
  }

  const result = await subscribeNewsletter({
    email: parsed.data.email,
    sourcePath: parsed.data.sourcePath,
    source: parsed.data.source,
    consentVersion: parsed.data.consentVersion,
    interests: parsed.data.interests,
  });

  if (result.confirmationRequired) {
    const { sendNewsletterConfirmationEmail } = await import('@/data/newsletter/newsletter-confirmation.server');
    try {
      await sendNewsletterConfirmationEmail(parsed.data.email);
    } catch {
      return Response.json({ ok: false, error: 'confirmation_delivery_failed' }, { status: 503, headers: NO_STORE_HEADERS });
    }
  }

  return Response.json({ ok: true, confirmationRequired: result.confirmationRequired }, { headers: NO_STORE_HEADERS });
}

async function tokenFromRequest(request: Request) {
  let token = tokenFromUrl(request);
  if (!token && request.method === 'POST' && (request.headers.get('content-type') || '').includes('application/json')) {
    const body = await request.json().catch(() => null) as { token?: unknown } | null;
    token = typeof body?.token === 'string' ? body.token : '';
  }
  return newsletterTokenSchema.safeParse({ token });
}

async function confirm(request: Request) {
  if (request.method !== 'GET' && request.method !== 'POST') return methodNotAllowed('GET, POST');
  const parsed = await tokenFromRequest(request);
  if (!parsed.success) return new Response('Invalid confirmation link.', { status: 400, headers: textHeaders });
  const { confirmNewsletterSubscription } = await import('@/data/newsletter/newsletter.server');
  await confirmNewsletterSubscription(parsed.data.token);
  return new Response('Your TexasDefined newsletter subscription is confirmed.', { status: 200, headers: textHeaders });
}

async function unsubscribe(request: Request) {
  if (request.method !== 'GET' && request.method !== 'POST') return methodNotAllowed('GET, POST');
  const parsed = await tokenFromRequest(request);
  if (!parsed.success) return new Response('Invalid unsubscribe link.', { status: 400, headers: textHeaders });
  const { unsubscribeNewsletter } = await import('@/data/newsletter/newsletter.server');
  await unsubscribeNewsletter(parsed.data.token);
  return new Response('You are unsubscribed from the TexasDefined newsletter.', { status: 200, headers: textHeaders });
}

async function resendWebhook(request: Request) {
  if (request.method !== 'POST') return methodNotAllowed('POST');
  const contentLength = Number(request.headers.get('content-length') || '0');
  if (Number.isFinite(contentLength) && contentLength > 2_000_000) {
    return Response.json({ ok: false, error: 'payload_too_large' }, { status: 413, headers: NO_STORE_HEADERS });
  }
  const rawBody = await request.text();
  const { processResendNewsletterWebhook, verifyResendWebhook } = await import('@/data/newsletter/newsletter-resend.server');
  if (!(await verifyResendWebhook(rawBody, request.headers))) {
    return Response.json({ ok: false, error: 'invalid_signature' }, { status: 401, headers: NO_STORE_HEADERS });
  }
  let event: unknown;
  try { event = JSON.parse(rawBody); } catch {
    return Response.json({ ok: false, error: 'invalid_json' }, { status: 400, headers: NO_STORE_HEADERS });
  }
  const providerEventId = request.headers.get('svix-id') || request.headers.get('webhook-id') || crypto.randomUUID();
  const result = await processResendNewsletterWebhook(event, providerEventId);
  return Response.json(result, { headers: NO_STORE_HEADERS });
}

export async function texasDefinedNewsletterApiResponse(request: Request): Promise<Response | null> {
  const path = normalizedPath(request);
  if (!path.startsWith('/api/newsletter/')) return null;
  if (path === '/api/newsletter/subscribe') return subscribe(request);
  if (path === '/api/newsletter/confirm') return confirm(request);
  if (path === '/api/newsletter/unsubscribe') return unsubscribe(request);
  if (path === '/api/newsletter/resend-webhook') return resendWebhook(request);
  return Response.json({ ok: false, error: 'not_found' }, { status: 404, headers: NO_STORE_HEADERS });
}
