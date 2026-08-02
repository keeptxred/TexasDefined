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
      <Container width="wide" className="flex h-16 items-center justify-between gap-6">
        <Link to="/" className="flex items-baseline gap-2" aria-label={brand.identity.name}>
          <span className="font-display text-xl tracking-tight text-foreground sm:text-2xl">
            {brand.identity.wordmark}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {brand.nav.map((item) => (
            <div
              key={item.to}
              className="relative"
              onMouseEnter={() => setOpenGroup(item.children ? item.to : null)}
              onMouseLeave={() => setOpenGroup(null)}
            >
              <Link
                to={item.to}
                className="inline-flex items-center rounded-sm px-3 py-2 text-[0.8125rem] font-medium tracking-wide text-foreground/80 transition-colors hover:text-primary"
                activeProps={{ className: "text-primary" }}
                onFocus={() => setOpenGroup(item.children ? item.to : null)}
              >
                {item.label}
              </Link>
              {item.children && openGroup === item.to && (
                <div className="absolute left-0 top-full w-60 rounded-sm border border-border bg-popover p-2 shadow-editorial">
                  {item.children.map((child) => (
                    <Link
                      key={child.to}
                      to={child.to}
                      className="block rounded-sm px-3 py-2 text-sm text-popover-foreground transition-colors hover:bg-secondary hover:text-primary"
                      onClick={() => setOpenGroup(null)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
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

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <Container className="py-4">
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
