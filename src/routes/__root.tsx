import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { lazy, Suspense, useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import heroHillCountry from "@/assets/hero-hill-country.jpg";
import { BrandProvider } from "@/brand/context";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl } from "@/lib/seo";
import { ShopCartProvider } from "@/lib/shop-cart";

const Header = lazy(() => import("@/components/layout/Header").then((module) => ({ default: module.Header })));
const Footer = lazy(() => import("@/components/layout/Footer").then((module) => ({ default: module.Footer })));

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const defaultSocialImage = absoluteUrl(texasDefinedBrand, heroHillCountry);
const defaultSocialImageAlt = "Texas Hill Country landscape at golden hour";

function NotFoundComponent() {
  return (
    <>
      <title>Page not found | Texas Defined</title>
      <meta name="robots" content="noindex, nofollow" />
      <div className="bg-background px-4 py-20 sm:py-28">
        <section className="mx-auto max-w-4xl border-y border-border py-14 text-center sm:py-20">
          <p className="eyebrow text-primary">Wrong turn</p>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-5xl leading-[0.98] text-foreground sm:text-7xl">This road doesn&apos;t go through</h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground">The page may have moved, but there is plenty more Texas waiting just down the road.</p>
          <div className="mx-auto mt-10 flex max-w-lg flex-col border-t border-border sm:flex-row sm:justify-center">
            <Link to="/" className="border-b border-border px-6 py-4 text-sm font-semibold sm:border-b-0 sm:border-r">Start from the front page</Link>
            <Link to="/explore" className="px-6 py-4 text-sm font-semibold">Open the Texas guide →</Link>
          </div>
        </section>
      </div>
    </>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    void import("../lib/lovable-error-reporting").then(({ reportLovableError }) => {
      reportLovableError(error, { boundary: "tanstack_root_error_component" });
    });
  }, [error]);
  return (
    <>
      <title>Page unavailable | Texas Defined</title>
      <meta name="robots" content="noindex, nofollow" />
      <div className="bg-background px-4 py-20 sm:py-28">
        <section className="mx-auto max-w-4xl border-y border-border py-14 text-center sm:py-20">
          <p className="eyebrow text-primary">A small detour</p>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-5xl leading-[0.98] text-foreground sm:text-7xl">This page didn&apos;t load</h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground">Something went sideways on our end. Try the page once more or head back to the front page.</p>
          <div className="mx-auto mt-10 flex max-w-lg flex-col border-t border-border sm:flex-row sm:justify-center">
            <button onClick={() => { router.invalidate(); reset(); }} className="border-b border-border px-6 py-4 text-sm font-semibold sm:border-b-0 sm:border-r">Try once more</button>
            <a href="/" className="px-6 py-4 text-sm font-semibold">Back to the front page</a>
          </div>
        </section>
      </div>
    </>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: texasDefinedBrand.seo.defaultTitle },
      { name: "description", content: texasDefinedBrand.seo.defaultDescription },
      { name: "author", content: texasDefinedBrand.identity.name },
      { property: "og:title", content: texasDefinedBrand.seo.defaultTitle },
      { property: "og:description", content: texasDefinedBrand.seo.defaultDescription },
      { property: "og:site_name", content: texasDefinedBrand.identity.name },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: texasDefinedBrand.identity.locale.replace("-", "_") },
      { property: "og:image", content: defaultSocialImage },
      { property: "og:image:alt", content: defaultSocialImageAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: texasDefinedBrand.seo.defaultTitle },
      { name: "twitter:description", content: texasDefinedBrand.seo.defaultDescription },
      { name: "twitter:image", content: defaultSocialImage },
      { name: "twitter:image:alt", content: defaultSocialImageAlt },
      { name: "twitter:site", content: texasDefinedBrand.seo.twitterSite ?? "" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap" },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "shortcut icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "alternate", href: "/rss.xml", type: "application/rss+xml", title: "Texas Defined RSS" },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": `${siteUrl}/#organization`,
            name: texasDefinedBrand.identity.name,
            alternateName: "TexasDefined",
            url: siteUrl,
            description: texasDefinedBrand.seo.defaultDescription,
            logo: {
              "@type": "ImageObject",
              "@id": `${siteUrl}/#logo`,
              url: `${siteUrl}/icon-512.png`,
              contentUrl: `${siteUrl}/icon-512.png`,
              width: 512,
              height: 512,
            },
            image: { "@id": `${siteUrl}/#logo` },
            sameAs: texasDefinedBrand.identity.social.map((profile) => profile.href),
            knowsAbout: ["Texas travel", "Texas destinations", "Texas lifestyle", "Texas homes", "Texas property", "Texas history", "Texas events", "Texas sports", "Texas sports venues"],
          },
          {
            "@type": "WebSite",
            "@id": `${siteUrl}/#website`,
            name: texasDefinedBrand.identity.name,
            alternateName: "TexasDefined",
            url: siteUrl,
            description: texasDefinedBrand.seo.defaultDescription,
            inLanguage: texasDefinedBrand.identity.locale,
            publisher: { "@id": `${siteUrl}/#organization` },
            potentialAction: {
              "@type": "SearchAction",
              target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/search?q={search_term_string}` },
              "query-input": "required name=search_term_string",
            },
          },
        ],
      }),
    }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return <html lang={texasDefinedBrand.identity.locale}><head><HeadContent /></head><body>{children}<Scripts /></body></html>;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useEffect(() => {
    let active = true;
    let cleanup: (() => void) | undefined;

    void import("@/platform/analytics").then(({ installTexasDefinedAnalytics }) => {
      if (active) cleanup = installTexasDefinedAnalytics();
    });

    return () => {
      active = false;
      cleanup?.();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrandProvider brand={texasDefinedBrand}>
        <ShopCartProvider>
          <div className="flex min-h-screen flex-col bg-background">
            <Suspense fallback={<div className="h-[4.5rem] border-b border-border bg-background lg:h-[7rem]" aria-hidden="true" />}><Header /></Suspense>
            <main id="main" className="flex-1"><Outlet /></main>
            <Suspense fallback={<div className="h-40 border-t border-border bg-surface" aria-hidden="true" />}><Footer /></Suspense>
          </div>
        </ShopCartProvider>
      </BrandProvider>
    </QueryClientProvider>
  );
}
