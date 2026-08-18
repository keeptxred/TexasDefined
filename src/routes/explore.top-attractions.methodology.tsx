import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/top-attractions/methodology";
const description = "How TexasDefined selects, ranks, researches, verifies and updates its Top 25 Texas Attractions collection, including source precedence and the editorial planning scales used across all 25 guides.";

const criteria = [
  ["Statewide significance", "Does the place explain an important part of Texas history, culture, landscape, science, ecology or public life?"],
  ["Distinctiveness", "Does the attraction offer an experience that is unusually Texas-specific or nationally significant in its Texas setting?"],
  ["Trip-anchor value", "Can a traveler reasonably build a half-day, full day, weekend or regional itinerary around it?"],
  ["Visitor usefulness", "Can TexasDefined provide durable planning information, an official source and enough surrounding context to make the guide genuinely useful?"],
  ["Collection balance", "Does the full list represent multiple Texas regions and attraction types rather than simply repeating the state's largest cities?"],
] as const;

const scales = [
  ["Recommended visit", "Editorial estimate of the time needed for the core experience, with a longer option when the attraction can anchor a larger day."],
  ["Physical effort", "Low, moderate or high based on walking, terrain and the effort required for the attraction's characteristic experience—not a medical accessibility rating."],
  ["Weather exposure", "Mostly indoors, mixed indoor/outdoor or mostly/fully outdoors so travelers can understand how strongly weather can shape the visit."],
  ["Advance planning", "Low, moderate or high based on reservations, timed entry, permits, distance, capacity or other logistics that materially affect a normal visit."],
  ["Family fit", "Editorial guidance about the kind of family visit the attraction supports, without inventing age guarantees or replacing a parent's judgment."],
  ["First-time Texas value", "How useful the attraction is for a visitor trying to understand a major Texas story, landscape or city for the first time."],
] as const;

export const Route = createFileRoute("/explore/top-attractions/methodology")({
  head: () => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Top 25 Texas Attractions Methodology | Texas Defined", description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": `${pageUrl}#page`,
            url: pageUrl,
            name: "Top 25 Texas Attractions Methodology",
            description,
            isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` },
            about: { "@id": `${absoluteUrl(texasDefinedBrand, "/explore/top-attractions")}#attractions` },
            author: { "@type": "Organization", "@id": `${absoluteUrl(texasDefinedBrand, "/authors/a-hollis")}#desk`, name: "Texas Defined Editorial Desk" },
            dateModified: "2026-08-18",
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Front page", item: absoluteUrl(texasDefinedBrand, "/") },
              { "@type": "ListItem", position: 2, name: "Explore", item: absoluteUrl(texasDefinedBrand, "/explore") },
              { "@type": "ListItem", position: 3, name: "Top 25 attractions", item: absoluteUrl(texasDefinedBrand, "/explore/top-attractions") },
              { "@type": "ListItem", position: 4, name: "Methodology", item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
  component: TopAttractionsMethodologyPage,
});

function TopAttractionsMethodologyPage() {
  return <>
    <Container className="pb-8 pt-12 sm:pt-16">
      <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <Link to="/">Front page</Link><span aria-hidden className="mx-2">/</span><Link to="/explore">Explore</Link><span aria-hidden className="mx-2">/</span><Link to="/explore/top-attractions">Top 25</Link><span aria-hidden className="mx-2">/</span><span aria-current="page">Methodology</span>
      </nav>
      <header className="py-10 sm:py-14">
        <p className="eyebrow text-primary">Research & provenance</p>
        <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">How TexasDefined builds the Top 25 attractions list</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">The Top 25 is an editorial reference collection, not a scientific ranking or a review-score leaderboard. This page documents the selection criteria, source hierarchy, planning scales and review rules used so readers and other researchers can understand what the list does—and what it does not claim.</p>
      </header>
    </Container>

    <Section tone="surface">
      <Container>
        <SectionHeader eyebrow="Selection" title="What qualifies for the collection" description="A place does not enter the list simply because it is famous. The collection is built around significance, distinctiveness, trip usefulness and statewide balance." />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {criteria.map(([title, body]) => <article key={title} className="border-t-2 border-foreground pt-5"><h2 className="font-display text-2xl">{title}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p></article>)}
        </div>
        <p className="mt-10 max-w-4xl border-t border-border pt-6 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Rank order:</strong> the numbered order is editorial judgment about the collection's essential Texas experiences. It is not produced from paid placement, user-review averages, traffic, social popularity or a hidden numerical score. Advertising or sponsorship is not ranking evidence.</p>
      </Container>
    </Section>

    <Section>
      <Container>
        <SectionHeader eyebrow="Source policy" title="Official sources control changing visitor facts" description="TexasDefined separates durable editorial context from operational information that can change after publication." />
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <article className="border-y border-border py-7"><h2 className="font-display text-3xl">Controlling sources</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">For admission rules, reservations, closures, accessibility, permits, hours, event-day restrictions and current visitor operations, the attraction operator or responsible public agency is the controlling source. Each Top-25 guide exposes that source and a review date.</p></article>
          <article className="border-y border-border py-7"><h2 className="font-display text-3xl">No invented experience</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">TexasDefined does not label research-based planning judgment as first-hand experience. A page may synthesize official visitor information, geography and surrounding trip context without claiming that an editor personally visited unless that experience is actually documented.</p></article>
          <article className="border-y border-border py-7"><h2 className="font-display text-3xl">Missing beats guessing</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">When a durable fact cannot be supported confidently, the guide should omit it or point the reader to the official source rather than inventing a price, schedule, policy, review score or operating detail.</p></article>
          <article className="border-y border-border py-7"><h2 className="font-display text-3xl">Review dates are evidence</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">The visible source-check date records when the visitor-information layer was reviewed. It does not guarantee that a changing condition remained unchanged afterward; current-day operations should always be reconfirmed with the linked source.</p></article>
        </div>
      </Container>
    </Section>

    <Section tone="surface">
      <Container>
        <SectionHeader eyebrow="Shared comparison scale" title="How the editorial planning fields work" description="The same dimensions are used across all 25 so unlike attractions can be compared without pretending a national park and a museum deserve the same kind of star score." />
        <dl className="mt-10 divide-y divide-border border-y border-border">
          {scales.map(([term, definition]) => <div key={term} className="grid gap-2 py-5 md:grid-cols-[220px_1fr]"><dt className="font-display text-2xl">{term}</dt><dd className="text-sm leading-7 text-muted-foreground">{definition}</dd></div>)}
        </dl>
      </Container>
    </Section>

    <Section>
      <Container>
        <div className="grid gap-10 lg:grid-cols-3">
          <article><p className="eyebrow text-primary">Corrections</p><h2 className="mt-2 font-display text-3xl">Change the record when evidence changes</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">If an official source changes a material visitor fact, the destination record, review note and source-check date should be updated together. TexasDefined's broader corrections and editorial-accountability policy is described on the About page.</p><Link to="/about" className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">Editorial accountability →</Link></article>
          <article><p className="eyebrow text-primary">Machine-readable</p><h2 className="mt-2 font-display text-3xl">Use the comparison dataset</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">A CSV distribution exposes the ranked list, planning fields, canonical URLs, official-source URLs and review dates. The human-readable Top-25 page remains the canonical editorial reference.</p><a href="/top-25-texas-attractions.csv" className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">Download CSV →</a></article>
          <article><p className="eyebrow text-primary">Trip synthesis</p><h2 className="mt-2 font-display text-3xl">See how the 25 combine</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">The road-trip collection turns the ranked list into geographic route structures while keeping every attraction tied to its own verified guide.</p><Link to="/explore/top-attractions/road-trips" className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">Top-25 road trips →</Link></article>
        </div>
      </Container>
    </Section>

    <Section tone="ink">
      <Container>
        <SectionHeader eyebrow="Citation" title="How to use this collection as a reference" description="Cite the canonical Top-25 page for the collection and individual destination pages for attraction-specific planning context. Preserve the visible review date and linked official-source caveat when the underlying fact can change." />
        <div className="mt-7 flex flex-wrap gap-5 text-sm font-semibold"><Link to="/explore/top-attractions" className="border-b border-ink-foreground/50 text-ink-foreground">Top 25 collection →</Link><Link to="/citation-guide" className="border-b border-ink-foreground/50 text-ink-foreground">Citation guide →</Link><Link to="/authors/$author" params={{ author: "a-hollis" }} className="border-b border-ink-foreground/50 text-ink-foreground">Texas Defined Editorial Desk →</Link></div>
      </Container>
    </Section>
  </>;
}
