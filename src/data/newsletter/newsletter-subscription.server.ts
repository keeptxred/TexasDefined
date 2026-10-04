import { supabaseAdmin } from '@/integrations/supabase/client.server';
import { newsletterRequiresConfirmation, subscribeNewsletter } from './newsletter.server';
import {
  resendNewsletterConfirmationConfigured,
  sendNewsletterConfirmationEmail,
} from './newsletter-confirmation.server';

const CONFIRMATION_COOLDOWN_MS = 15 * 60 * 1000;

type NewsletterClient = {
  from: (table: string) => any;
};

type PendingSubscriber = {
  id: string;
  email: string;
  status: string;
  interests: string[];
  confirmation_token: string | null;
  confirmation_requested_at: string | null;
};

const client = supabaseAdmin as unknown as NewsletterClient;

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function normalizeInterests(interests: string[]) {
  return [...new Set(interests.map((interest) => interest.trim().toLowerCase()).filter(Boolean))].slice(0, 12);
}

function confirmationRequestIsFresh(requestedAt: string | null) {
  if (!requestedAt) return false;
  const timestamp = Date.parse(requestedAt);
  if (!Number.isFinite(timestamp)) return false;
  const age = Date.now() - timestamp;
  return age >= 0 && age < CONFIRMATION_COOLDOWN_MS;
}

function idempotencyBucket(requestedAt: string) {
  const timestamp = Date.parse(requestedAt);
  const basis = Number.isFinite(timestamp) ? timestamp : Date.now();
  return Math.floor(basis / CONFIRMATION_COOLDOWN_MS).toString(36);
}

async function getSubscriber(email: string) {
  const { data, error } = await client
    .from('texasdefined_newsletter_subscribers')
    .select('id,email,status,interests,confirmation_token,confirmation_requested_at')
    .eq('email', email)
    .maybeSingle() as { data: PendingSubscriber | null; error: { message: string } | null };
  if (error) throw new Error(`Newsletter confirmation lookup failed: ${error.message}`);
  return data;
}

async function markConfirmationRetryable(subscriberId: string, token: string) {
  const { error } = await client
    .from('texasdefined_newsletter_subscribers')
    .update({ confirmation_requested_at: null, updated_at: new Date().toISOString() })
    .eq('id', subscriberId)
    .eq('status', 'pending')
    .eq('confirmation_token', token) as { error: { message: string } | null };
  if (error) throw new Error(`Newsletter confirmation retry state failed: ${error.message}`);
}

async function deliverPendingConfirmation(subscriber: PendingSubscriber, requestedAt: string) {
  if (!subscriber.confirmation_token) return;
  try {
    await sendNewsletterConfirmationEmail({
      email: subscriber.email,
      token: subscriber.confirmation_token,
      idempotencyBucket: idempotencyBucket(requestedAt),
    });
  } catch (error) {
    await markConfirmationRetryable(subscriber.id, subscriber.confirmation_token).catch(() => undefined);
    throw error;
  }
}

export function newsletterDoubleOptInReady() {
  return !newsletterRequiresConfirmation() || resendNewsletterConfirmationConfigured();
}

export async function subscribeNewsletterWithConfirmation(input: {
  email: string;
  sourcePath: string;
  source: string;
  consentVersion: string;
  interests: string[];
}) {
  const email = normalizeEmail(input.email);
  const confirmationRequired = newsletterRequiresConfirmation();

  if (confirmationRequired && !resendNewsletterConfirmationConfigured()) {
    throw new Error('Newsletter signup is temporarily unavailable because confirmation delivery is not configured.');
  }

  if (confirmationRequired) {
    const existing = await getSubscriber(email);
    if (existing?.status === 'pending' && existing.confirmation_token) {
      const now = new Date().toISOString();
      const mergedInterests = normalizeInterests([...(existing.interests ?? []), ...input.interests]);
      const fresh = confirmationRequestIsFresh(existing.confirmation_requested_at);
      const update: Record<string, unknown> = {
        consent_at: now,
        consent_version: input.consentVersion,
        source: input.source,
        signup_path: input.sourcePath,
        interests: mergedInterests,
        subscribed_at: now,
        updated_at: now,
      };
      if (!fresh) update.confirmation_requested_at = now;

      const { error } = await client
        .from('texasdefined_newsletter_subscribers')
        .update(update)
        .eq('id', existing.id)
        .eq('status', 'pending')
        .eq('confirmation_token', existing.confirmation_token) as { error: { message: string } | null };
      if (error) throw new Error(`Newsletter pending signup could not be refreshed: ${error.message}`);

      if (!fresh) {
        await deliverPendingConfirmation({ ...existing, interests: mergedInterests }, now);
      }
      return { ok: true, confirmationRequired: true } as const;
    }
  }

  const result = await subscribeNewsletter({ ...input, email });
  if (!confirmationRequired) return result;

  const subscriber = await getSubscriber(email);
  if (subscriber?.status === 'pending' && subscriber.confirmation_token) {
    const requestedAt = subscriber.confirmation_requested_at || new Date().toISOString();
    await deliverPendingConfirmation(subscriber, requestedAt);
  }

  // Never expose confirmation tokens or provider details through a public signup surface.
  return { ok: true, confirmationRequired: true } as const;
}
