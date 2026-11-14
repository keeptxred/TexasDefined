import type { ReactNode } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/things-unique-to-texas/methodology";
const description = "How TexasDefined researches and selects the places, stories and traditions that define Texas, with sourcing, editorial scope and correction rules.";

export const Route = createFileRoute("/things-unique-to-texas/methodology")({
  head: () => {
    const origin = `https://${texasDefinedBrand.identity.domain}`;
    const url = `${origin}${canonicalPath}`;
    return {
      meta: buildMeta(texasDefinedBrand, {
        title: "Things That Define Texas Methodology",
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
              author: { "@type": "Organization", name: "Texas Defined Editorial Desk", url: `${origin}/editorial-policy` },
              dateModified: "2026-11-13",
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
              <p>The research pool is an internal reference map, not a promise to publish a fixed number of entries. When TexasDefined already maintains a strong destination guide, Texas Explained article, state-symbol page, sports reference, food guide or other canonical resource, the magazine entry links into that deeper page instead of creating duplicate thin content.</p>
              <p>Automatic canonical links are limited to direct, high-confidence matches. We do not force a link simply because two places are nearby or broadly related. A more general guide may still appear in a chapter's related-reading section when it adds context without presenting itself as the exact entity.</p>
            </MethodSection>

            <MethodSection title="What a fact check looks like in this collection">
              <p>Three examples illustrate our editorial boundary. Topo Chico was created in Monterrey, Mexico and is included as an adopted Texas drinking tradition, not a Texas-invented brand. Caddo Mounds is a historic Caddo archaeological landscape rather than a naturally formed geological wonder. The San Antonio River Walk is a designed urban corridor, not an undeveloped river ecosystem. We classify these subjects by what they actually are rather than the category that makes the longest list.</p>
              <p>When a source conflicts with a popular story, the source wins for measurable dates, designations and legal facts. Historical context can draw from the Handbook of Texas, the Texas Historical Commission, the Texas State Library and Archives Commission, universities, museums and other accountable institutions. Attraction closures, permitted activities and prices require a current managing-agency or operator notice; a cultural overview must not promise live access.</p>
              <p>We do not claim first-hand experience unless reporting evidence supports it. Summaries should identify origins, regional differences and disputed claims; unsupported statements that an item is the first, largest, oldest, most popular or uniquely Texan are excluded or qualified with source definitions.</p>
              <p>Examples can be checked in <Link to="/things-unique-to-texas/food-drink" className="text-primary underline">Food &amp; Drink</Link>, <Link to="/things-unique-to-texas/natural-wonders" className="text-primary underline">Natural Wonders</Link>, <Link to="/things-unique-to-texas/landmarks" className="text-primary underline">Landmarks</Link>, and the <a href="https://www.tsl.texas.gov/ref/abouttx/capitals" target="_blank" rel="noopener noreferrer" className="text-primary underline">State Library's official place-designation register</a>.</p>
            </MethodSection>

            <MethodSection title="Corrections, unresolved claims and evidence confidence">
              <p>Editors compare an entry's wording against the controlling historical, government or original institutional source. Where the source provides a range, era, approval-date exception or category distinction, the published wording must preserve that qualification. For a disputed birthplace or origin, we say what is known and what is contested rather than selecting a tidy unsupported story.</p>
              <p>When a factual problem is confirmed, we correct the public description and its dataset record together, review the canonical link and category assignment, and update the affected validation rules. If an exact guide does not exist, a related page is labelled as related coverage; it should not masquerade as a standalone guide to that one item. We retain stable IDs even when moving an entry to a more accurate category.</p>
              <p>For visitor-facing claims that cannot be checked at the time of publication, we omit temporary hours or prices and link to the responsible agency. Corrections may be sent through the <Link to="/about" className="text-primary underline">site contact and editorial information</Link>. Changes to durable facts are reflected in the public guide; a review date does not guarantee that volatile information remains current indefinitely.</p>
            </MethodSection>

            <MethodSection title="Changing information">
              <p>The collection favors durable cultural context. Current ticket prices, attraction hours, closures, access rules, event dates and similar operational details belong on the deeper destination or service page, where the linked operator or public agency remains the controlling source.</p>
              <p>When a magazine entry links to a researched destination, readers should use that destination's visible source and review information for present-day planning.</p>
            </MethodSection>

            <MethodSection title="Data distributions">
              <p>The downloadable CSV and JSON are generated from the current editorial research pool and its canonical-link resolver. The public guide can feature a curated subset without implying that every research item deserves equal attention. A row's <code>deeperGuide</code> field is present only when TexasDefined has a direct, high-confidence canonical page for that exact entry.</p>
              <p>The research pool can expand, shrink or be reorganized as evidence improves. Its row count is not a publication target or a claim that every topic originated in Texas.</p>
              <p>The curated guide remains the canonical reader-facing introduction. Use the CSV for tabular research and the JSON when machine-readable reference data is helpful. Both downloads link back to this methodology and the published guide.</p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a href="/things-that-define-texas.csv" className="border border-border px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary">Download CSV →</a>
                <a href="/things-that-define-texas.json" className="border border-border px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary">Download JSON →</a>
              </div>
            </MethodSection>

            <MethodSection title="Corrections and maintenance">
              <p>Corrections should preserve the distinction between origin, adoption, official designation and cultural association. If a deeper TexasDefined page changes its canonical route, the magazine link map should be updated in the same change rather than leaving a stale internal link.</p>
              <p>The research records retain stable, unique IDs for traceability, but their total is not an editorial goal. TexasDefined validates internal links, data distributions and production routes as the research pool and published chapter selections evolve.</p>
            </MethodSection>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="border border-border bg-muted/25 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Collection contract</p>
              <dl className="mt-5 space-y-4 text-sm">
                <div><dt className="font-semibold">Editorial approach</dt><dd className="mt-1 text-muted-foreground">Curated selection; no fixed item quota or ranking</dd></div>
                <div><dt className="font-semibold">Scope</dt><dd className="mt-1 text-muted-foreground">Texas foods, places, cultures, history and regional identity</dd></div>
                <div><dt className="font-semibold">Research archive</dt><dd className="mt-1 text-muted-foreground">Maintained separately from the reader-facing selection</dd></div>
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

function MethodSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-border pt-8">
      <h2 className="font-display text-3xl sm:text-4xl">{title}</h2>
      <div className="mt-5 space-y-4 leading-7 text-foreground/90">{children}</div>
    </section>
  );
}