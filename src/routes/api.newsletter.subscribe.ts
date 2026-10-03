import { createFileRoute } from '@tanstack/react-router';
import { newsletterSignupSchema } from '@/data/newsletter/newsletter-contract';

export const Route = createFileRoute('/api/newsletter/subscribe')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // The infrastructure can deploy before the public signup surfaces. Keep the endpoint dark until launch.
        if (process.env['NEWSLETTER_SIGNUPS_ENABLED'] !== 'true') {
          return Response.json({ ok: false, error: 'not_found' }, { status: 404, headers: { 'cache-control': 'no-store', 'x-robots-tag': 'noindex, nofollow' } });
        }
        const body = await request.json().catch(() => null);
        const parsed = newsletterSignupSchema.safeParse(body);
        if (!parsed.success) return Response.json({ ok: false, error: 'invalid_signup' }, { status: 400, headers: { 'cache-control': 'no-store' } });
        if (parsed.data.addressLine2.trim()) return Response.json({ ok: true }, { headers: { 'cache-control': 'no-store' } });
        const { subscribeNewsletter } = await import('@/data/newsletter/newsletter.server');
        const result = await subscribeNewsletter({
          email: parsed.data.email,
          sourcePath: parsed.data.sourcePath,
          source: parsed.data.source,
          consentVersion: parsed.data.consentVersion,
          interests: parsed.data.interests,
        });
        return Response.json(result, { headers: { 'cache-control': 'no-store', 'x-robots-tag': 'noindex, nofollow' } });
      },
    },
  },
});
