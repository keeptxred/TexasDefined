import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/newsletter/resend-webhook')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const rawBody = await request.text();
        const { processResendNewsletterWebhook, verifyResendWebhook } = await import('@/data/newsletter/newsletter-resend.server');
        if (!(await verifyResendWebhook(rawBody, request.headers))) {
          return Response.json({ ok: false, error: 'invalid_signature' }, { status: 401, headers: { 'cache-control': 'no-store' } });
        }
        let event: unknown;
        try { event = JSON.parse(rawBody); } catch {
          return Response.json({ ok: false, error: 'invalid_json' }, { status: 400, headers: { 'cache-control': 'no-store' } });
        }
        const providerEventId = request.headers.get('svix-id') || request.headers.get('webhook-id') || crypto.randomUUID();
        const result = await processResendNewsletterWebhook(event, providerEventId);
        return Response.json(result, { headers: { 'cache-control': 'no-store', 'x-robots-tag': 'noindex, nofollow' } });
      },
    },
  },
});
