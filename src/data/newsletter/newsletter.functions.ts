import { createServerFn } from '@tanstack/react-start';

import { newsletterSignupSchema, newsletterTokenSchema } from './newsletter-contract';

export const subscribeToTexasDefinedNewsletter = createServerFn({ method: 'POST' })
  .inputValidator(newsletterSignupSchema)
  .handler(async ({ data }) => {
    if (process.env['NEWSLETTER_SIGNUPS_ENABLED'] !== 'true') {
      throw new Error('Newsletter signup is disabled.');
    }
    // Quietly accept honeypot submissions so bots do not learn the filter.
    if (data.addressLine2.trim()) return { ok: true, confirmationRequired: false } as const;

    const { subscribeNewsletterWithConfirmation } = await import('./newsletter-subscription.server');
    return subscribeNewsletterWithConfirmation({
      email: data.email,
      sourcePath: data.sourcePath,
      source: data.source,
      consentVersion: data.consentVersion,
      interests: data.interests,
    });
  });

export const confirmTexasDefinedNewsletter = createServerFn({ method: 'POST' })
  .inputValidator(newsletterTokenSchema)
  .handler(async ({ data }) => {
    const { confirmNewsletterSubscription } = await import('./newsletter.server');
    return confirmNewsletterSubscription(data.token);
  });

export const unsubscribeFromTexasDefinedNewsletter = createServerFn({ method: 'POST' })
  .inputValidator(newsletterTokenSchema)
  .handler(async ({ data }) => {
    const { unsubscribeNewsletter } = await import('./newsletter.server');
    return unsubscribeNewsletter(data.token);
  });