import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";

import { useBrand } from "@/brand/context";
import { newsletterSignupSchema } from "@/domain/validation/schemas";
import { subscribeTexasDefinedNewsletter } from "@/lib/newsletter.functions";
import { analytics } from "@/services/analytics";

export function NewsletterSignup() {
  const brand = useBrand();
  const copy = brand.copy;
  const subscribe = useServerFn(subscribeTexasDefinedNewsletter);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const result = newsletterSignupSchema.safeParse({ email, brandId: brand.identity.id });
    if (!result.success) {
      setError("That email doesn’t look quite right. Give it another try.");
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      const response = await subscribe({
        data: {
          email: result.data.email,
          sourcePage: typeof window !== "undefined" ? window.location.pathname : null,
        },
      });

      if (!response.ok) {
        setError(response.error);
        return;
      }

      setEmail("");
      setDone(true);
      analytics.track({ name: "newsletter_signup", brandId: brand.identity.id });
    } catch (submitError) {
      console.error("Newsletter signup failed", submitError);
      setError("We couldn’t add you just now. Please give it another try later.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid gap-10 border-t-2 border-foreground pt-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
      <div>
        <p className="eyebrow text-primary">{copy.newsletterEyebrow}</p>
        <h2 className="mt-3 max-w-xl font-display text-4xl leading-tight sm:text-5xl">{copy.newsletterHeading}</h2>
        <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground">{copy.newsletterBody}</p>
      </div>
      <div>
        {done ? (
          <p className="font-display text-2xl text-primary" role="status">{copy.newsletterSuccess}</p>
        ) : (
          <>
            <form onSubmit={onSubmit} className="flex border-b-2 border-foreground transition-colors focus-within:border-primary" noValidate>
              <div className="flex-1">
                <label htmlFor="newsletter-email" className="sr-only">Email address for the Texas Defined Letter</label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (error) setError(null);
                  }}
                  placeholder={copy.newsletterPlaceholder}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "newsletter-error" : "newsletter-privacy"}
                  className="h-14 w-full bg-transparent px-0 text-base outline-none placeholder:text-muted-foreground/70"
                  disabled={submitting}
                />
                {error && <p id="newsletter-error" role="alert" className="mt-2 text-xs text-destructive">{error}</p>}
              </div>
              <button type="submit" className="eyebrow h-14 shrink-0 px-3 text-primary disabled:opacity-60" disabled={submitting}>{submitting ? "Joining…" : `${copy.newsletterCta} →`}</button>
            </form>
            <p id="newsletter-privacy" className="mt-3 text-xs leading-5 text-muted-foreground">
              One email a week. Unsubscribe anytime. See our <a href="/privacy" className="underline underline-offset-2 hover:text-primary">Privacy Policy</a>.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
