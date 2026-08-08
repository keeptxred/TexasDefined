import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";

import { useBrand } from "@/brand/context";
import { Container } from "./Container";
import { cn } from "@/lib/utils";
import { useShopCart } from "@/lib/shop-cart";

export function Header() {
  const brand = useBrand();
  const cart = useShopCart();
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/96 backdrop-blur supports-[backdrop-filter]:bg-background/92">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">
        {brand.copy.skipToContent}
      </a>

      <div onMouseLeave={() => setOpenGroup(null)}>
        <div className="hidden lg:block">
          <Container width="wide" className="relative flex h-[4.25rem] items-center justify-center border-b border-border/70">
            <p className="absolute left-0 eyebrow text-muted-foreground">The Texas magazine</p>
            <Link to="/" className="flex items-baseline" aria-label={`${brand.identity.wordmark} front page`}>
              <span className="font-display text-[2.45rem] font-semibold leading-none tracking-[-0.045em] text-foreground xl:text-[2.7rem]">{brand.identity.wordmark}</span>
            </Link>
            <div className="absolute right-0 flex items-center gap-1">
              {brand.features.search && <Link to="/search" aria-label="Search Texas Defined" className="inline-flex items-center gap-2 px-2 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-foreground/65 transition-colors hover:text-primary"><Search className="size-4" aria-hidden /><span>Search</span></Link>}
              <Link to="/shop/cart" aria-label={cart.count > 0 ? `View your bag with ${cart.count} item${cart.count === 1 ? "" : "s"}` : "View your bag"} className="relative inline-flex items-center gap-2 px-2 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-foreground/65 transition-colors hover:text-primary"><ShoppingBag className="size-4" aria-hidden /><span>Bag</span>{cart.count > 0 ? <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] leading-5 tracking-normal text-primary-foreground">{cart.count}</span> : null}</Link>
            </div>
          </Container>

          <Container width="wide" className="flex h-[2.75rem] items-center justify-center">
            <nav aria-label="Main navigation" className="flex items-center justify-center gap-1">
              {brand.nav.map((item) => <div key={item.to} onMouseEnter={() => setOpenGroup(item.children ? item.to : null)}><Link to={item.to} className="relative inline-flex h-[2.75rem] items-center px-3 text-[0.69rem] font-semibold uppercase tracking-[0.13em] text-foreground/70 transition-colors hover:text-primary" activeProps={{ className: "text-primary" }} onFocus={() => setOpenGroup(item.children ? item.to : null)}>{item.label}</Link></div>)}
            </nav>
          </Container>
        </div>

        <Container width="wide" className="flex h-[4.5rem] items-center justify-between lg:hidden">
          <Link to="/" className="flex shrink-0 items-baseline" aria-label={`${brand.identity.wordmark} front page`}><span className="font-display text-[1.9rem] font-semibold leading-none tracking-[-0.04em] text-foreground sm:text-[2.1rem]">{brand.identity.wordmark}</span></Link>
          <div className="flex items-center gap-0.5">
            <Link to="/shop/cart" aria-label={cart.count > 0 ? `View your bag with ${cart.count} item${cart.count === 1 ? "" : "s"}` : "View your bag"} className="relative inline-flex items-center gap-1.5 p-2 text-foreground/65 transition-colors hover:text-primary"><ShoppingBag className="size-[18px]" aria-hidden />{cart.count > 0 ? <span className="absolute -right-0.5 -top-0.5 inline-flex min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] leading-4 text-primary-foreground">{cart.count}</span> : null}</Link>
            {brand.features.search && <Link to="/search" aria-label="Search Texas Defined" className="p-2 text-foreground/65 transition-colors hover:text-primary"><Search className="size-[18px]" aria-hidden /></Link>}
            <button type="button" className="p-2 text-foreground/65 transition-colors hover:text-primary" aria-label={open ? brand.copy.close : brand.copy.menu} aria-expanded={open} onClick={() => setOpen((value) => !value)}>{open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}</button>
          </div>
        </Container>

        {brand.nav.filter((item) => item.children && openGroup === item.to).map((item) => <div key={item.to} className="absolute inset-x-0 top-full hidden animate-in fade-in slide-in-from-top-1 border-b border-border bg-background shadow-editorial duration-200 lg:block"><Container width="wide" className="py-6 xl:py-7"><div className="flex items-end justify-between border-b border-border/70 pb-4 xl:pb-5"><div><p className="eyebrow text-primary">{item.label}</p>{item.description && <p className="mt-2 max-w-2xl font-display text-2xl font-semibold leading-none xl:text-3xl">{item.description}</p>}</div><Link to={item.to} className="eyebrow group inline-flex items-center gap-2 border-b border-primary pb-1 text-primary" onClick={() => setOpenGroup(null)}>Explore the section <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></Link></div><ul className={cn("mt-5 grid grid-cols-4 gap-5 xl:mt-6 xl:gap-6", (item.children?.length ?? 0) <= 5 ? "xl:grid-cols-5" : "xl:grid-cols-6")}>{item.children?.map((child) => <li key={child.to}><Link to={child.to} className="group block" onClick={() => setOpenGroup(null)}>{child.image && <div className="overflow-hidden bg-muted"><img src={child.image.src} alt={child.image.alt} width={480} height={320} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-105 xl:aspect-[4/3]" /></div>}<p className="mt-2.5 font-display text-base font-semibold leading-tight transition-colors group-hover:text-primary xl:mt-3 xl:text-lg">{child.label}</p>{child.description && <p className="mt-1.5 hidden text-sm leading-5 text-muted-foreground xl:block">{child.description}</p>}</Link></li>)}</ul></Container></div>)}
      </div>

      <div className={cn("overflow-hidden border-t border-border bg-background lg:hidden", open ? "block" : "hidden")}><Container className="max-h-[72vh] overflow-y-auto py-4"><nav aria-label="Main menu" className="flex flex-col">{brand.nav.map((item) => <div key={item.to} className="border-b border-border/70 py-2 last:border-0"><Link to={item.to} className="block py-2 font-display text-xl font-semibold text-foreground" activeProps={{ className: "text-primary" }} onClick={() => setOpen(false)}>{item.label}</Link>{item.children && <div className="grid grid-cols-2 gap-x-5 pb-2">{item.children.map((child) => <Link key={child.to} to={child.to} className="py-1.5 text-sm leading-5 text-muted-foreground" activeProps={{ className: "font-semibold text-primary" }} onClick={() => setOpen(false)}>{child.label}</Link>)}</div>}</div>)}</nav></Container></div>
    </header>
  );
}
