import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
  useLocation,
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
const NotFoundScreen = lazy(() => import("@/components/RouteStatusScreens").then((module) => ({ default: module.NotFoundScreen })));
const ErrorScreen = lazy(() => import("@/components/RouteStatusScreens").then((module) => ({ default: module.ErrorScreen })));

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const defaultSocialImage = absoluteUrl(texasDefinedBrand, heroHillCountry);
const defaultSocialImageAlt = "Texas Hill Country landscape at golden hour";
const iconVersion = "20260822";
const EXPEDIA_WIDGET_SCRIPT = "https://creator.expediagroup.com/products/widgets/assets/eg-widgets.js";
const EXPEDIA_TRAVEL_PATH = /^\/(?:explore(?:\/|$)|destination\/|county\/|sports-venue\/|event\/)/;

function ExpediaTravelSurface() {
  const pathname = useLocation({ select: (location) => location.pathname });
  if (!EXPEDIA_TRAVEL_PATH.test(pathname)) return null;

  function loadExpediaWidget(button: HTMLButtonElement) {
    const script = document.createElement("script");
    script.className = "eg-widgets-script";
    script.src = EXPEDIA_WIDGET_SCRIPT;
    script.async = true;
    button.hidden = true;
    document.body.appendChild(script);
  }

  return (
    <section className="border-y border-border py-8">
      <div className="mx-auto max-w-7xl px-5">
        <p className="eyebrow text-primary">Hotels & places to stay</p>
        <h2 className="mt-2 font-display text-3xl">Find a place to stay nearby</h2>
        <button type="button" onClick={(event) => loadExpediaWidget(event.currentTarget)} className="mt-5 inline-flex min-h-11 items-center bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">Search Expedia stays →</button>
        <div className="eg-widget" data-widget="search" data-program="us-expedia" data-lobs="stays" data-network="pz" data-camref="1110lMy6E" data-pubref="texasdefined-stays" />
        <p className="mt-3 text-xs text-muted-foreground">Affiliate disclosure: TexasDefined may earn a commission from qualifying Expedia bookings, at no additional cost to you.</p>
      </div>
    </section>
  );
}

function NotFoundComponent() {
  return <Suspense fallback={null}><NotFoundScreen /></Suspense>;
}

function ErrorComponent(props: { error: Error; reset: () => void }) {
  return <Suspense fallback={null}><ErrorScreen {...props} /></Suspense>;
}

function HeaderFallback() {
  return (
    <div
      className="sticky top-0 z-50 h-[4.5rem] border-b border-border/80 bg-background/96 lg:h-[7rem]"
      aria-hidden="true"
    />
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "google-adsense-account", content: "ca-pub-1891256141359926" },
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
      { rel: "icon", href: `/favicon.ico?v=${iconVersion}`, sizes: "any" },
      { rel: "icon", href: `/favicon.svg?v=${iconVersion}`, type: "image/svg+xml" },
      { rel: "icon", href: `/favicon.png?v=${iconVersion}`, type: "image/png" },
      { rel: "shortcut icon", href: `/favicon.ico?v=${iconVersion}` },
      { rel: "apple-touch-icon", href: `/apple-touch-icon.png?v=${iconVersion}`, sizes: "180x180" },
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
            contactPoint: [{
              "@type": "ContactPoint",
              contactType: "editorial, corrections and general inquiries",
              url: `${siteUrl}/partner-with-us`,
            }],
            publishingPrinciples: `${siteUrl}/editorial-policy`,
            areaServed: { "@type": "State", name: "Texas" },
            knowsAbout: ["Texas travel", "Texas destinations", "Texas lifestyle", "Texas homes", "Texas property", "Texas history", "Texas heritage", "Texas events", "Texas sports", "Texas sports venues"],
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
    const id = window.setTimeout(() => {
      void import("@/platform/analytics").then(({ installTexasDefinedAnalytics }) => {
        if (active) cleanup = installTexasDefinedAnalytics();
      });
    }, 1500);

    return () => {
      active = false;
      window.clearTimeout(id);
      cleanup?.();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrandProvider brand={texasDefinedBrand}>
        <ShopCartProvider>
          <div className="flex min-h-screen flex-col bg-background">
            <Suspense fallback={<HeaderFallback />}><Header /></Suspense>
            <main id="main" className="flex-1"><Outlet /><ExpediaTravelSurface /></main>
            <Suspense fallback={<div className="h-40 border-t border-border bg-surface" aria-hidden="true" />}><Footer /></Suspense>
          </div>
        </ShopCartProvider>
      </BrandProvider>
    </QueryClientProvider>
  );
}
