import { Link } from "@tanstack/react-router";

import { useBrand } from "@/brand/context";
import { NewsletterSignup } from "@/components/editorial/NewsletterSignup";
import { Container } from "./Container";

export function Footer() {
  const brand = useBrand();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border bg-surface text-surface-foreground">
      {brand.features.newsletter && (
        <div className="border-b border-border/60">
          <Container className="py-14">
            <NewsletterSignup />
          </Container>
        </div>
      )}
      <Container className="grid gap-10 py-14 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl">{brand.identity.wordmark}</p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">{brand.identity.tagline}</p>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">{brand.copy.footerNote}</p>
        </div>
        {brand.footer.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="eyebrow text-muted-foreground">{column.title}</h2>
            <ul className="mt-4 space-y-2">
              {column.items.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-surface-foreground/85 transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <div className="border-t border-border/60">
        <Container className="flex flex-col gap-3 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {brand.identity.name}
          </p>
          <div className="flex flex-wrap gap-4">
            {brand.legal.map((item) => (
              <Link key={item.to} to={item.to} className="transition-colors hover:text-primary">
                {item.label}
              </Link>
            ))}
            {brand.identity.social.map((item) => (
              <a
                key={item.href}
                href={item.href}
                rel="noreferrer noopener"
                target="_blank"
                className="transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
