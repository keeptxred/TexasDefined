import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const SubscribeSchema = z.object({
  email: z.string().trim().email().max(254),
  sourcePage: z.string().trim().max(300).optional().nullable(),
});

type NewsletterInsertError = {
  code?: string;
  message?: string;
} | null;

type NewsletterInsertClient = {
  from: (table: string) => {
    insert: (values: Record<string, unknown>) => Promise<{ error: NewsletterInsertError }>;
  };
};

/**
 * Public Texas Defined newsletter signup action.
 *
 * The browser never receives Supabase service credentials. Validation happens
 * before the server-only client is loaded, and the shared subscriber table is
 * scoped by brand so a reader can independently subscribe to each publication
 * with the same email address.
 */
export const subscribeTexasDefinedNewsletter = createServerFn({ method: 'POST' })
  .validator((input: unknown) => SubscribeSchema.parse(input))
  .handler(async ({ data }) => {
    try {
      const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
      const client = supabaseAdmin as unknown as NewsletterInsertClient;
      const email = data.email.trim().toLowerCase();
      const sourcePage = data.sourcePage?.trim() || null;

      const { error } = await client.from('newsletter_signups').insert({
        email,
        brand_id: 'texasdefined',
        source_page: sourcePage,
      });

      if (error) {
        if (error.code === '23505' || /duplicate|unique/i.test(error.message ?? '')) {
          return { ok: true as const, alreadySubscribed: true as const };
        }

        console.error('[Newsletter] Texas Defined signup failed', {
          code: error.code,
          message: error.message,
        });
        return { ok: false as const, error: 'We couldn’t add you just now. Please try again shortly.' };
      }

      return { ok: true as const, alreadySubscribed: false as const };
    } catch (error) {
      console.error('[Newsletter] Texas Defined signup backend unavailable', error);
      return { ok: false as const, error: 'The Texas Defined Letter is temporarily unavailable. Please try again shortly.' };
    }
  });
