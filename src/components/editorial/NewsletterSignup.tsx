import { useState, type FormEvent } from "react";

import { useBrand } from "@/brand/context";
import { newsletterSignupSchema } from "@/domain/validation/schemas";
import { analytics } from "@/services/analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSignup() {
  const brand = useBrand();
  const copy = brand.copy;
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = newsletterSignupSchema.safeParse({ email, brandId: brand.identity.id });
    if (!result.success) {
      setError("That email doesn’t look quite right. Give it another try.");
      return;
    }
    setError(null);
    setDone(true);
    analytics.track({ name: "newsletter_signup", brandId: brand.identity.id });
  }

  return (
    <div className="grid items-center gap-8 md:grid-cols-2">
      <div>
        <p className="eyebrow text-primary">{copy.newsletterEyebrow}</p>
        <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
          {copy.newsletterHeading}
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          {copy.newsletterBody}
        </p>
      </div>
      <div>
        {done ? (
          <p className="font-display text-xl text-primary" role="status">{copy.newsletterSuccess}</p>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row" noValidate>
            <div className="flex-1">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address for the Texas Defined Letter
              </label>
              <Input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (error) setError(null);
                }}
                placeholder={copy.newsletterPlaceholder}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "newsletter-error" : undefined}
                className="h-12 rounded-sm bg-background"
              />
              {error && (
                <p id="newsletter-error" role="alert" className="mt-2 text-xs text-destructive">
                  {error}
                </p>
              )}
            </div>
            <Button type="submit" className="h-12 rounded-sm px-7 tracking-wide">
              {copy.newsletterCta}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
