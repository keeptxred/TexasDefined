import { useState, type FormEvent } from "react";

import { useBrand } from "@/brand/context";
import { newsletterSignupSchema } from "@/domain/validation/schemas";
import { analytics } from "@/services/analytics";

const signupUrl = String(import.meta.env.VITE_TEXASDEFINED_NEWSLETTER_SIGNUP_URL || "").trim();

export function NewsletterSignup() {
  const brand = useBrand();
  const copy = brand.copy;
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = newsletterSignupSchema.safeParse({ email, brandId: brand.identity.id });
    if (!result.success) { setError("That email doesn’t look quite right. Give it another try."); return; }
    if (!signupUrl) { setError("The letter isn’t taking new names just yet. Check back soon."); return; }
    setError(null);
    setSubmitting(true);
    try {
      const response = await fetch(signupUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(result.data) });
      if (!response.ok) throw new Error(`Newsletter signup failed: ${response.status}`);
      setDone(true);
      analytics.track({ name: "newsletter_signup", brandId: brand.identity.id });
    } catch (submitError) {
      console.error("Newsletter signup failed", submitError);
      setError("We couldn’t add you just now. Please give it another try later.");
    } finally { setSubmitting(false); }
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
        ) : signupUrl ? (
          <form onSubmit={onSubmit} className="flex border-b-2 border-foreground transition-colors focus-within:border-primary" noValidate>
            <div className="flex-1">
              <label htmlFor="newsletter-email" className="sr-only">Email address for the Texas Defined Letter</label>
              <input id="newsletter-email" type="email" value={email} onChange={(event) => { setEmail(event.target.value); if (error) setError(null); }} placeholder={copy.newsletterPlaceholder} aria-invalid={Boolean(error)} aria-describedby={error ? "newsletter-error" : undefined} className="h-14 w-full bg-transparent px-0 text-base outline-none placeholder:text-muted-foreground/70" disabled={submitting} />
              {error && <p id="newsletter-error" role="alert" className="mt-2 text-xs text-destructive">{error}</p>}
            </div>
            <button type="submit" className="eyebrow h-14 shrink-0 px-3 text-primary" disabled={submitting}>{submitting ? "Joining…" : `${copy.newsletterCta} →`}</button>
          </form>
        ) : (
          <p className="border-t border-border pt-4 text-sm leading-7 text-muted-foreground" role="status">The Texas Defined Letter isn’t taking new names just yet. Check back soon.</p>
        )}
      </div>
    </div>
  );
}
