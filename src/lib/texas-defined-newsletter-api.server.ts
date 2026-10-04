import { newsletterSignupSchema, newsletterTokenSchema } from '@/data/newsletter/newsletter-contract';

const NO_STORE_HEADERS = {
  'cache-control': 'no-store',
  'x-robots-tag': 'noindex, nofollow',
  'referrer-policy': 'no-referrer',
};

const textHeaders = {
  ...NO_STORE_HEADERS,
  'content-type': 'text/plain; charset=utf-8',
};

const htmlHeaders = {
  ...NO_STORE_HEADERS,
  'content-type': 'text/html; charset=utf-8',
  'content-security-policy': "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
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

function tokenActionPage(input: {
  path: '/api/newsletter/confirm' | '/api/newsletter/unsubscribe';
  token: string;
  eyebrow: string;
  title: string;
  description: string;
  button: string;
}) {
  const action = `${input.path}?token=${encodeURIComponent(input.token)}`;
  return new Response(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${input.title} | TexasDefined</title>
</head>
<body style="margin:0;background:#f5f1e8;color:#2e302d;font-family:Arial,Helvetica,sans-serif;">
  <main style="max-width:640px;margin:72px auto;padding:0 20px;">
    <section style="background:#fff;border:1px solid #ded8cb;border-radius:8px;padding:34px 36px;">
      <p style="margin:0 0 8px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8b4d33;font-weight:700;">${input.eyebrow}</p>
      <h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:32px;line-height:1.15;color:#242824;">${input.title}</h1>
      <p style="margin:0 0 24px;font-size:16px;line-height:1.6;">${input.description}</p>
      <form method="post" action="${action}">
        <button type="submit" style="border:0;border-radius:5px;background:#2f5d73;color:#fff;font:700 15px Arial,Helvetica,sans-serif;padding:13px 20px;cursor:pointer;">${input.button}</button>
      </form>
    </section>
  </main>
</body>
</html>`, { status: 200, headers: htmlHeaders });
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

  const { subscribeNewsletter } = await import('@/data/newsletter/newsletter.server');
  const result = await subscribeNewsletter({
    email: parsed.data.email,
    sourcePath: parsed.data.sourcePath,
    source: parsed.data.source,
    consentVersion: parsed.data.consentVersion,
    interests: parsed.data.interests,
  });
  return Response.json(result, { headers: NO_STORE_HEADERS });
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
  if (request.method === 'GET') {
    // GET is deliberately side-effect free so email security scanners cannot confirm subscriptions.
    return tokenActionPage({
      path: '/api/newsletter/confirm',
      token: parsed.data.token,
      eyebrow: 'TexasDefined newsletter',
      title: 'Confirm your subscription',
      description: 'One more step: confirm that you want TexasDefined delivered to your inbox.',
      button: 'Confirm subscription',
    });
  }
  const { confirmNewsletterSubscription } = await import('@/data/newsletter/newsletter.server');
  await confirmNewsletterSubscription(parsed.data.token);
  return new Response('Your TexasDefined newsletter subscription is confirmed.', { status: 200, headers: textHeaders });
}

async function unsubscribe(request: Request) {
  if (request.method !== 'GET' && request.method !== 'POST') return methodNotAllowed('GET, POST');
  const parsed = await tokenFromRequest(request);
  if (!parsed.success) return new Response('Invalid unsubscribe link.', { status: 400, headers: textHeaders });
  if (request.method === 'GET') {
    // GET is deliberately side-effect free so link scanners cannot unsubscribe readers.
    return tokenActionPage({
      path: '/api/newsletter/unsubscribe',
      token: parsed.data.token,
      eyebrow: 'TexasDefined newsletter',
      title: 'Unsubscribe?',
      description: 'Confirm below and TexasDefined will stop sending newsletters to this subscription.',
      button: 'Unsubscribe',
    });
  }
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
