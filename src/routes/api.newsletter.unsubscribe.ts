import { createFileRoute } from '@tanstack/react-router';
import { newsletterTokenSchema } from '@/data/newsletter/newsletter-contract';

function tokenFromRequest(request: Request) {
  return new URL(request.url).searchParams.get('token') || '';
}

async function unsubscribe(token: string) {
  const parsed = newsletterTokenSchema.safeParse({ token });
  if (!parsed.success) return new Response('Invalid unsubscribe link.', { status: 400, headers: { 'cache-control': 'no-store', 'x-robots-tag': 'noindex, nofollow' } });
  const { unsubscribeNewsletter } = await import('@/data/newsletter/newsletter.server');
  await unsubscribeNewsletter(parsed.data.token);
  return new Response('You are unsubscribed from the TexasDefined newsletter.', { status: 200, headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex, nofollow' } });
}

export const Route = createFileRoute('/api/newsletter/unsubscribe')({
  server: {
    handlers: {
      GET: async ({ request }) => unsubscribe(tokenFromRequest(request)),
      POST: async ({ request }) => {
        const contentType = request.headers.get('content-type') || '';
        let token = tokenFromRequest(request);
        if (!token && contentType.includes('application/json')) {
          const body = await request.json().catch(() => null) as { token?: unknown } | null;
          token = typeof body?.token === 'string' ? body.token : '';
        }
        return unsubscribe(token);
      },
    },
  },
});
