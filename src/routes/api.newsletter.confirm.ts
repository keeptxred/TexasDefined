import { createFileRoute } from '@tanstack/react-router';
import { newsletterTokenSchema } from '@/data/newsletter/newsletter-contract';

function tokenFromRequest(request: Request) {
  return new URL(request.url).searchParams.get('token') || '';
}

async function confirm(token: string) {
  const parsed = newsletterTokenSchema.safeParse({ token });
  if (!parsed.success) return new Response('Invalid confirmation link.', { status: 400, headers: { 'cache-control': 'no-store', 'x-robots-tag': 'noindex, nofollow' } });
  const { confirmNewsletterSubscription } = await import('@/data/newsletter/newsletter.server');
  await confirmNewsletterSubscription(parsed.data.token);
  return new Response('Your TexasDefined newsletter subscription is confirmed.', { status: 200, headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex, nofollow' } });
}

export const Route = createFileRoute('/api/newsletter/confirm')({
  server: {
    handlers: {
      GET: async ({ request }) => confirm(tokenFromRequest(request)),
      POST: async ({ request }) => {
        const body = await request.json().catch(() => null) as { token?: unknown } | null;
        return confirm(typeof body?.token === 'string' ? body.token : tokenFromRequest(request));
      },
    },
  },
});
