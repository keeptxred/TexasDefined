import { Link, createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/things-unique-to-texas/methodology";
const description = "How TexasDefined selects, labels, cross-links and maintains the 250 Things That Define Texas collection, including source precedence, scope rules and corrections.";

export const Route = createFileRoute("/things-unique-to-texas/methodology")({
  head: () => {
    const origin = `https://${texasDefinedBrand.identity.domain}`;
    const url = `${origin}${canonicalPath}`;
    return {
      meta: buildMeta(texasDefinedBrand, {
        title: "Things That Define Texas Methodology | Texas Defined",
        description,
        canonicalPath,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `${url}#page`,
              url,
              name: "Things That Define Texas Methodology",
              description,
              isPartOf: { "@id": `${origin}/#website` },
              about: { "@id": `${origin}/things-unique-to-texas#collection` },
              author: { "@type": "Organization", name: "Texas Defined Editorial Desk", url: `${origin}/authors/a-hollis` },
              dateModified: "2026-08-19",
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: origin },
                { "@type": "ListItem", position: 2, name: "Things That Define Texas", item: `${origin}/things-unique-to-texas` },
                { "@type": "ListItem", position: 3, name: "Methodology", item: url },
              ],
            },
          ],
        }),
      }],
    };
  },
  component: ThingsThatDefineTexasMethodology,
});

function ThingsThatDefineTexasMethodology() {
  return (
    <main>
      <Container className="py-12 sm:py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link to="/">Home</Link><span className="mx-2">/</span>
          <Link to="/things-unique-to-texas">Things That Define Texas</Link><span className="mx-2">/</span>
          <span className="text-foreground">Methodology</span>
        </nav>
        <header className="mt-10 max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Editorial methodology</p>
          <h1 className="mt-3 font-display text-5xl leading-[0.98] sm:text-7xl">How we decide what defines Texas</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">This collection is an editorial map of Texas identity, not a claim that every entry originated in Texas or has an official state designation. The goal is to explain what is distinctive, widely associated with Texas, historically important, regionally meaningful or useful for understanding how Texans live, travel and talk about the state.</p>
        </header>
      </Container>

      <Container className="pb-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.7fr)_minmax(260px,.7fr)]">
          <div className="space-y-12">
            <MethodSection title="Inclusion standard">
              <p>An item belongs when it has a strong and explainable connection to Texas identity through history, geography, foodways, architecture, commerce, music, wildlife, language, road culture or everyday life. Statewide fame is not required; some entries are deliberately regional because Texas identity changes sharply from the Panhandle to the Valley, Piney Woods, Gulf Coast, Hill Country and far West Texas.</p>
              <p>We avoid manufacturing uniqueness. A thing may exist elsewhere and still belong here if its Texas history or cultural role is unusually strong. When an item is adopted rather than Texas-born, the collection should say so instead of rewriting its origin.</p>
            </MethodSection>

            <MethodSection title="Official fact versus Texas folklore">
              <p>Official state symbols and legal designations are kept separate from popular culture, slogans, tourism shorthand and folklore. TexasDefined does not turn a popular nickname or repeated internet claim into an official fact merely because it is familiar.</p>
              <p>For designations, public rules, dates and other verifiable claims, the responsible state, federal, local or institutional source controls. Editorial description explains cultural significance but does not override the controlling record.</p>
            </MethodSection>

            <MethodSection title="Cross-link policy">
              <p>The 250-entry collection is designed as an internal reference map. When TexasDefined already maintains a strong destination guide, Texas Explained article, state-symbol page, sports reference, food guide or other canonical resource, the magazine entry links into that deeper page instead of creating duplicate thin content.</p>
              <p>Automatic canonical links are limited to direct, high-confidence matches. We do not force a link simply because two places are nearby or broadly related. A more general guide may still appear in a chapter's related-reading section when it adds context without pretending to be the exact entity.</p>
            </MethodSection>

            <MethodSection title="Changing information">
              <p>The collection favors durable cultural context. Current ticket prices, attraction hours, closures, access rules, event dates and similar operational details belong on the deeper destination or service page, where the linked operator or public agency remains the controlling source.</p>
              <p>When a magazine entry links to a researched destination, readers should use that destination's visible source and review information for present-day planning.</p>
            </MethodSection>

            <MethodSection title="Corrections and maintenance">
              <p>Corrections should preserve the distinction between origin, adoption, official designation and cultural association. If a deeper TexasDefined page changes its canonical route, the magazine link map should be updated in the same change rather than leaving a stale internal link.</p>
              <p>The collection is structurally validated for 250 unique numbered entries across eight chapters. TexasDefined also validates its canonical link resolver so linked cards and structured data continue pointing to the same destination.</p>
            </MethodSection>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="border border-border bg-muted/25 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Collection contract</p>
              <dl className="mt-5 space-y-4 text-sm">
                <div><dt className="font-semibold">Entries</dt><dd className="mt-1 text-muted-foreground">250 numbered Texas icons</dd></div>
                <div><dt className="font-semibold">Chapters</dt><dd className="mt-1 text-muted-foreground">8 editorial categories</dd></div>
                <div><dt className="font-semibold">Canonical collection</dt><dd className="mt-1"><Link to="/things-unique-to-texas" className="text-primary underline-offset-4 hover:underline">Things That Define Texas</Link></dd></div>
                <div><dt className="font-semibold">Editorial accountability</dt><dd className="mt-1"><Link to="/about" className="text-primary underline-offset-4 hover:underline">About TexasDefined</Link></dd></div>
              </dl>
            </div>
            <Link to="/citation-guide" className="block border border-border p-6 hover:border-primary/50">
              <span className="font-semibold">TexasDefined citation guidance →</span>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">How canonical TexasDefined references relate to underlying official sources.</span>
            </Link>
          </aside>
        </div>
      </Container>
    </main>
  );
}

function MethodSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border pt-8">
      <h2 className="font-display text-3xl sm:text-4xl">{title}</h2>
      <div className="mt-5 space-y-4 leading-7 text-foreground/90">{children}</div>
    </section>
  );
}
