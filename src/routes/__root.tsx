import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import heroHillCountry from "@/assets/hero-hill-country.jpg";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { BrandProvider } from "@/brand/context";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { installTexasDefinedAnalytics } from "@/platform/analytics";
import { absoluteUrl } from "@/lib/seo";
import { ShopCartProvider } from "@/lib/shop-cart";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const defaultSocialImage = absoluteUrl(texasDefinedBrand, heroHillCountry);
const defaultSocialImageAlt = "Texas Hill Country landscape at golden hour";

function NotFoundComponent() {
  return (
    <>
      <title>Page not found | TexasDefined</title>
      <meta name="robots" content="noindex, nofollow" />
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <p className="eyebrow text-primary">Wrong turn</p>
          <h1 className="mt-4 font-display text-4xl text-foreground">This road doesn't go through</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">The page may have moved, but there is plenty more Texas waiting just down the road.</p>
          <div className="mt-6"><Link to="/" className="inline-flex items-center justify-center rounded-sm bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">Start from the front page</Link></div>
        </div>
      </div>
    </>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <>
      <title>Page unavailable | TexasDefined</title>
      <meta name="robots" content="noindex, nofollow" />
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <p className="eyebrow text-primary">A small detour</p>
          <h1 className="mt-3 font-display text-3xl tracking-tight text-foreground">This page didn't load</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Something went sideways on our end. Try the page once more or head back to the front page.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button onClick={() => { router.invalidate(); reset(); }} className="inline-flex items-center justify-center rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">Try once more</button>
            <a href="/" className="inline-flex items-center justify-center rounded-sm border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground">Back to the front page</a>
          </div>
        </div>
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
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Public+Sans:wght@400;500;600&display=swap" },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "shortcut icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
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
            url: siteUrl,
            logo: `${siteUrl}/icon-512.png`,
            sameAs: texasDefinedBrand.identity.social.map((profile) => profile.href),
          },
          {
            "@type": "WebSite",
            "@id": `${siteUrl}/#website`,
            name: texasDefinedBrand.identity.name,
            url: siteUrl,
            description: texasDefinedBrand.seo.defaultDescription,
            publisher: { "@id": `${siteUrl}/#organization` },
            potentialAction: {
              "@type": "SearchAction",
              target: `${siteUrl}/search?q={search_term_string}`,
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
  useEffect(() => installTexasDefinedAnalytics(), []);
  return (
    <QueryClientProvider client={queryClient}>
      <BrandProvider brand={texasDefinedBrand}>
        <ShopCartProvider>
          <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main id="main" className="flex-1"><Outlet /></main>
            <Footer />
          </div>
        </ShopCartProvider>
      </BrandProvider>
    </QueryClientProvider>
  );
}
