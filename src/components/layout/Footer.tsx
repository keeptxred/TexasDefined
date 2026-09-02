import { lazy, Suspense } from "react";
import { Link } from "@tanstack/react-router";

import { useBrand } from "@/brand/context";
import { Container } from "./Container";

const CitationCollectionTrustRouter = lazy(() => import("@/components/authority/CitationCollectionTrustRouter"));
const ContextualOfficialSources = lazy(() => import("@/components/authority/ContextualOfficialSources"));
const NewsletterSignup = lazy(() => import("@/components/editorial/NewsletterSignup").then((module) => ({ default: module.NewsletterSignup })));
const newsletterSignupEnabled = Boolean(String(import.meta.env.VITE_TEXASDEFINED_NEWSLETTER_SIGNUP_URL || "").trim());

export function Footer() {
  const brand = useBrand();
  const year = new Date().getFullYear();
  const nonPrivacyLegalItems = brand.legal.filter((item) => item.label !== "Privacy & Site Terms");

  return (
    <>
      <Suspense fallback={null}><CitationCollectionTrustRouter /></Suspense>
      <Suspense fallback={<div className="h-20 sm:h-24" aria-hidden="true" />}><ContextualOfficialSources /></Suspense>
      <footer className="border-t border-border bg-surface text-surface-foreground">
        {brand.features.newsletter && newsletterSignupEnabled && (
          <div className="border-b border-border/70">
            <Container className="py-16 sm:py-20">
              <Suspense fallback={<div className="h-44 sm:h-48" aria-hidden="true" />}><NewsletterSignup /></Suspense>
            </Container>
          </div>
        )}
        <Container className="grid gap-12 py-14 sm:py-16 md:grid-cols-[1.25fr_repeat(3,1fr)]">
          <div className="md:pr-8">
            <p className="font-display text-4xl font-semibold leading-none tracking-[-0.03em]">{brand.identity.wordmark}</p>
            <div className="mt-5 h-px w-12 bg-primary" />
            <p className="mt-5 max-w-sm text-base leading-7 text-surface-foreground/85">{brand.identity.tagline}</p>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">{brand.copy.footerNote}</p>
          </div>
          {brand.footer.map((column) => (
            <nav key={column.title} aria-label={column.title} className="border-t border-border/60 pt-5 md:border-t-0 md:pt-0">
              <h2 className="eyebrow text-primary">{column.title}</h2>
              <ul className="mt-5 space-y-3">
                {column.items.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="text-sm text-surface-foreground/80 transition-colors hover:text-primary">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </Container>
        <div className="border-t border-border/70">
          <Container className="flex flex-col gap-4 py-6 text-xs tracking-wide text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>© {year} {brand.identity.wordmark}</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <Link to="/partner-with-us" className="transition-colors hover:text-primary">Partner With Us</Link>
              <Link to="/citation-guide" className="transition-colors hover:text-primary">Citation Guide</Link>
              <a href="/editorial-policy" className="transition-colors hover:text-primary">Editorial Policy</a>
              <a href="/sourcing-methodology" className="transition-colors hover:text-primary">Sourcing</a>
              <a href="/corrections-policy" className="transition-colors hover:text-primary">Corrections</a>
              <Link to="/privacy" className="transition-colors hover:text-primary">Privacy Policy</Link>
              <a href="/about#privacy-terms" className="transition-colors hover:text-primary">Site Terms</a>
              {nonPrivacyLegalItems.map((item) => item.to.includes("#") ? <a key={item.to} href={item.to} className="transition-colors hover:text-primary">{item.label}</a> : <Link key={item.to} to={item.to} className="transition-colors hover:text-primary">{item.label}</Link>)}
              {brand.identity.social.map((item) => <a key={item.href} href={item.href} rel="noreferrer noopener" target="_blank" aria-label={`Follow Texas Defined on ${item.label}`} className="transition-colors hover:text-primary">{item.label}</a>)}
            </div>
          </Container>
        </div>
      </footer>
    </>
  );
}
