import { Link } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";

import { useBrand } from "@/brand/context";
import { Container } from "./Container";
import { cn } from "@/lib/utils";

export function Header() {
  const brand = useBrand();
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-sm focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        {brand.copy.skipToContent}
      </a>
      <div onMouseLeave={() => setOpenGroup(null)}>
        <Container width="wide" className="flex h-16 items-center justify-between gap-6">
          <Link to="/" className="flex items-baseline gap-2" aria-label={brand.identity.name}>
            <span className="font-display text-xl tracking-tight text-foreground sm:text-2xl">
              {brand.identity.wordmark}
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {brand.nav.map((item) => (
              <div key={item.to} onMouseEnter={() => setOpenGroup(item.children ? item.to : null)}>
                <Link
                  to={item.to}
                  className="relative inline-flex items-center rounded-sm px-3 py-2 text-[0.8125rem] font-medium tracking-wide text-foreground/80 transition-colors hover:text-primary"
                  activeProps={{ className: "text-primary" }}
                  onFocus={() => setOpenGroup(item.children ? item.to : null)}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            {brand.features.search && (
              <Link
                to="/search"
                aria-label={brand.copy.searchPlaceholder}
                className="rounded-sm p-2 text-foreground/70 transition-colors hover:text-primary"
              >
                <Search className="size-[18px]" aria-hidden />
              </Link>
            )}
            <button
              type="button"
              className="rounded-sm p-2 text-foreground/70 transition-colors hover:text-primary lg:hidden"
              aria-label={open ? brand.copy.close : brand.copy.menu}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
            </button>
          </div>
        </Container>

        {/* Mega menu panel — full-bleed, image-led, driven entirely by brand nav config. */}
        {brand.nav
          .filter((item) => item.children && openGroup === item.to)
          .map((item) => (
            <div
              key={item.to}
              className="absolute inset-x-0 top-full hidden animate-in fade-in slide-in-from-top-1 border-b border-border bg-background shadow-editorial duration-200 lg:block"
            >
              <Container width="wide" className="py-8">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="eyebrow text-primary">{item.label}</p>
                    {item.description && (
                      <p className="mt-1 font-display text-2xl">{item.description}</p>
                    )}
                  </div>
                  <Link
                    to={item.to}
                    className="eyebrow border-b border-primary pb-1 text-primary"
                    onClick={() => setOpenGroup(null)}
                  >
                    {brand.copy.viewAll}
                  </Link>
                </div>
                <ul className="mt-6 grid grid-cols-3 gap-6 xl:grid-cols-6">
                  {item.children?.map((child) => (
                    <li key={child.to}>
                      <Link
                        to={child.to}
                        className="group block"
                        onClick={() => setOpenGroup(null)}
                      >
                        {child.image && (
                          <div className="overflow-hidden bg-muted">
                            <img
                              src={child.image.src}
                              alt={child.image.alt}
                              width={480}
                              height={320}
                              loading="lazy"
                              decoding="async"
                              className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                        )}
                        <p className="mt-3 font-display text-base leading-snug transition-colors group-hover:text-primary">
                          {child.label}
                        </p>
                        {child.description && (
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            {child.description}
                          </p>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Container>
            </div>
          ))}
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <Container className="max-h-[70vh] overflow-y-auto py-4">
          <nav aria-label="Mobile" className="flex flex-col">
            {brand.nav.map((item) => (
              <div key={item.to} className="border-b border-border/70 py-1 last:border-0">
                <Link
                  to={item.to}
                  className="block py-2 font-display text-lg text-foreground"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="grid grid-cols-2 gap-x-4 pb-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        className="py-1 text-sm text-muted-foreground"
                        onClick={() => setOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </Container>
      </div>
    </header>
  );
}
