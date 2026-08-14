import { lazy, Suspense } from "react";
import { Link } from "@tanstack/react-router";

import { useBrand } from "@/brand/context";
import ContextualOfficialSources from "@/components/authority/ContextualOfficialSources";
import { NewsletterSignup } from "@/components/editorial/NewsletterSignup";
import { Container } from "./Container";

const CitationCollectionTrustRouter = lazy(() => import("@/components/authority/CitationCollectionTrustRouter"));

export function Footer() {
  const brand = useBrand();
  const year = new Date().getFullYear();

  return (
    <>
      <Suspense fallback={null}><CitationCollectionTrustRouter /></Suspense>
      <ContextualOfficialSources />
      <footer className="border-t border-border bg-surface text-surface-foreground">
        {brand.features.newsletter && (
          <div className="border-b border-border/70">
            <Container className="py-16 sm:py-20">
              <NewsletterSignup />
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
              <Link to="/citation-guide" className="transition-colors hover:text-primary">Citation Guide</Link>
              {brand.legal.map((item) => item.to.includes("#") ? <a key={item.to} href={item.to} className="transition-colors hover:text-primary">{item.label}</a> : <Link key={item.to} to={item.to} className="transition-colors hover:text-primary">{item.label}</Link>)}
              {brand.identity.social.map((item) => <a key={item.href} href={item.href} rel="noreferrer noopener" target="_blank" aria-label={`Follow Texas Defined on ${item.label}`} className="transition-colors hover:text-primary">{item.label}</a>)}
            </div>
          </Container>
        </div>
      </footer>
    </>
  );
}
