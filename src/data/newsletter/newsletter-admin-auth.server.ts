import { useSession } from '@tanstack/react-start/server';

const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60;
const SESSION_NAME = 'td-newsletter-admin';

type NewsletterAdminSessionData = {
  authorized?: boolean;
  issuedAt?: number;
  sessionVersion?: string;
};

function env(name: string) {
  return process.env[name]?.trim() || '';
}

function sessionVersion() {
  return env('NEWSLETTER_ADMIN_SESSION_VERSION') || '1';
}

export function newsletterAdminAuthConfigured() {
  return env('NEWSLETTER_ADMIN_ACCESS_KEY').length >= 32
    && env('NEWSLETTER_ADMIN_SESSION_SECRET').length >= 32;
}

function useNewsletterAdminSession() {
  const secret = env('NEWSLETTER_ADMIN_SESSION_SECRET');
  if (secret.length < 32) throw new Error('Newsletter admin session secret is not configured.');

  return useSession<NewsletterAdminSessionData>({
    name: SESSION_NAME,
    password: secret,
    cookie: {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: SESSION_MAX_AGE_SECONDS,
      path: '/',
    },
  });
}

async function digest(value: string) {
  return new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)));
}

async function constantTimeEqual(left: string, right: string) {
  const [a, b] = await Promise.all([digest(left), digest(right)]);
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let index = 0; index < a.length; index += 1) diff |= a[index]! ^ b[index]!;
  return diff === 0;
}

export async function loginNewsletterAdmin(accessKey: string) {
  const configuredKey = env('NEWSLETTER_ADMIN_ACCESS_KEY');
  if (!newsletterAdminAuthConfigured()) return { ok: false, error: 'invalid_credentials' } as const;
  if (!(await constantTimeEqual(accessKey, configuredKey))) return { ok: false, error: 'invalid_credentials' } as const;

  const session = await useNewsletterAdminSession();
  await session.update({
    authorized: true,
    issuedAt: Date.now(),
    sessionVersion: sessionVersion(),
  });
  return { ok: true } as const;
}

export async function logoutNewsletterAdmin() {
  if (!env('NEWSLETTER_ADMIN_SESSION_SECRET')) return { ok: true } as const;
  const session = await useNewsletterAdminSession();
  await session.clear();
  return { ok: true } as const;
}

export async function newsletterAdminSessionStatus() {
  if (!newsletterAdminAuthConfigured()) return { configured: false, authorized: false } as const;
  const session = await useNewsletterAdminSession();
  const data = session.data;
  const issuedAt = typeof data.issuedAt === 'number' ? data.issuedAt : 0;
  const ageMs = Date.now() - issuedAt;
  const authorized = data.authorized === true
    && data.sessionVersion === sessionVersion()
    && ageMs >= 0
    && ageMs < SESSION_MAX_AGE_SECONDS * 1_000;
  return { configured: true, authorized } as const;
}

export async function requireNewsletterAdmin() {
  const status = await newsletterAdminSessionStatus();
  if (!status.configured) throw new Error('Newsletter operator authentication is not configured.');
  if (!status.authorized) throw new Error('Newsletter operator authentication required.');
  return { authorized: true } as const;
}
