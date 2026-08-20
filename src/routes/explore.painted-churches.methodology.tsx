import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { paintedChurchImageSources } from "@/data/painted-church-image-sources";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/methodology";
const description = "How Texas Defined verifies Painted Churches of Texas: inclusion rules, source hierarchy, image licensing, corrections, update dates, fieldwork boundaries and treatment of conflicting historical records.";
const checkedAt = "2026-08-20";

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const url = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: "Painted Churches Research Methodology & Corrections",
        description,
        modifiedTime: `${checkedAt}T12:00:00-05:00`,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": `${url}#page`,
            url,
            name: "Painted Churches Research Methodology & Corrections",
            description,
            dateModified: checkedAt,
            isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` },
            about: { "@id": `${absoluteUrl(texasDefinedBrand, "/explore/painted-churches")}#collection` },
            publisher: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` },
            subjectOf: [
              { "@type": "WebPage", url: absoluteUrl(texasDefinedBrand, "/explore/painted-churches/sources") },
              { "@type": "WebPage", url: absoluteUrl(texasDefinedBrand, "/explore/painted-churches/bibliography") },
              { "@type": "WebPage", url: absoluteUrl(texasDefinedBrand, "/explore/painted-churches/preindex-readiness") },
            ],
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${url}#breadcrumbs`,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") },
              { "@type": "ListItem", position: 2, name: "Explore", item: absoluteUrl(texasDefinedBrand, "/explore") },
              { "@type": "ListItem", position: 3, name: "Painted Churches", item: absoluteUrl(texasDefinedBrand, "/explore/painted-churches") },
              { "@type": "ListItem", position: 4, name: "Methodology", item: url },
            ],
          },
        ],
      })],
    };
  },
  component: PaintedChurchMethodology,
});

const sourceHierarchy = [
  ["1. Primary and official records", "Texas Historical Commission Atlas records, National Register documentation, parish and congregation websites, diocesan records, official tourism offices and original archival records lead on dates, designations, current access and property identity."],
  ["2. Public-history and scholarly research", "Austin PBS, university archives, architectural-history sources, books and documented decorative-painting research are used to explain artists, techniques, iconography, immigrant context and unresolved attribution questions."],
  ["3. Reputable secondary reporting", "Texas Monthly, major newspapers and established travel publications are used for interpretation and discovery, but a church is not added solely because a travel story calls it a Painted Church."],
  ["4. Discovery sources", "Dedicated church catalogs, travel blogs, Wikimedia categories and image-search pages can surface candidates. They trigger verification; they do not substitute for it."],
] as const;

const inclusionRules = [
  "A named church must have church-specific evidence of a painted, muraled, stenciled, faux-finished or otherwise historically significant decorative interior, or an official/local heritage source must explicitly place it in the Painted Churches tradition.",
  "Texas Defined distinguishes the National Register multiple-property group “Churches with Decorative Interior Painting” from the broader modern travel and cultural label “Painted Churches of Texas.”",
  "A later decorative campaign can qualify a church for the broader living tradition, but it is labeled as a later campaign rather than presented as an untouched nineteenth-century interior.",
  "Candidate churches remain outside the verified count until the evidence clears the same church-specific standard used for published profiles.",
] as const;

const conflictRules = [
  "When official and secondary sources disagree, the page states the disagreement instead of silently choosing the more convenient date or attribution.",
  "When a decorative scheme was restored, reconstructed or repainted, the page distinguishes surviving original work from later reconstruction where the record allows it.",
  "Time-sensitive access, tour prices and hours are rechecked against the responsible parish, congregation, preservation organization, Chamber or official visitor source and are never treated as permanent historical facts.",
  "Original Texas Defined fieldwork and expert review are never claimed from web research. Those statuses remain explicitly unverified until a documented visit or real reviewer record exists.",
] as const;

function PaintedChurchMethodology() {
  return (
    <main>
      <section className="border-b border-border bg-surface">
        <Container className="py-16 sm:py-24">
          <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link to="/" className="hover:text-foreground">Front page</Link></li><li aria-hidden>·</li>
              <li><Link to="/explore" className="hover:text-foreground">Explore</Link></li><li aria-hidden>·</li>
              <li><Link to="/explore/painted-churches" className="hover:text-foreground">Painted Churches</Link></li><li aria-hidden>·</li>
              <li aria-current="page" className="text-foreground">Methodology</li>
            </ol>
          </nav>
          <p className="eyebrow mt-8 text-primary">Research transparency</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">How Texas Defined verifies a Painted Church.</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">The pre-index collection currently contains {expandedPaintedChurches.length} verified church profiles. This page explains what qualifies, which sources take precedence, how image rights are checked, how fieldwork is distinguished from desk research, and how corrections or conflicting historical records are handled.</p>
          <p className="mt-5 text-sm text-muted-foreground">Methodology reviewed {new Date(`${checkedAt}T12:00:00`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}. Search indexing remains intentionally disabled during authority review.</p>
        </Container>
      </section>

      <Container className="py-14 sm:py-18">
        <section className="border-t-2 border-foreground pt-8">
          <p className="eyebrow text-primary">Quick answer</p>
          <h2 className="mt-3 font-display text-4xl">Primary records lead; secondary sources interpret.</h2>
          <p className="mt-5 max-w-4xl text-base leading-8 text-foreground/90">Texas Defined does not treat every “Painted Church” list as equivalent. Formal National Register membership, the original 1982 thematic research universe, local touring traditions and later painted interiors are labeled separately. A church enters the verified statewide count only after church-specific evidence establishes the identity of the building and the basis for calling its interior painted or decoratively significant.</p>
        </section>

        <section className="mt-14 border-t border-border pt-8">
          <p className="eyebrow text-primary">Source hierarchy</p>
          <h2 className="mt-3 font-display text-4xl">Which sources win when records conflict</h2>
          <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">
            {sourceHierarchy.map(([title, body]) => <article key={title} className="bg-background p-6"><h3 className="font-display text-2xl">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p></article>)}
          </div>
        </section>

        <section className="mt-14 border-t border-border pt-8">
          <p className="eyebrow text-primary">Inclusion standard</p>
          <h2 className="mt-3 font-display text-4xl">What has to be true before a church is counted</h2>
          <ol className="mt-7 space-y-4 text-base leading-8 text-muted-foreground">
            {inclusionRules.map((rule, index) => <li key={rule} className="border-t border-border pt-4"><span className="eyebrow mr-3 text-primary">0{index + 1}</span>{rule}</li>)}
          </ol>
        </section>

        <section className="mt-14 border-t border-border pt-8">
          <p className="eyebrow text-primary">Conflicts, fieldwork and corrections</p>
          <h2 className="mt-3 font-display text-4xl">Uncertainty is recorded, not hidden.</h2>
          <ul className="mt-7 list-disc space-y-3 pl-5 text-base leading-8 text-muted-foreground">{conflictRules.map((rule) => <li key={rule}>{rule}</li>)}</ul>
          <p className="mt-6 max-w-4xl text-sm leading-7 text-muted-foreground">When Texas Defined identifies a material factual error, the published record is corrected while the source trail remains visible. Readers can inspect the evidence ledger and canonical source registry rather than relying on an unattributed summary.</p>
        </section>

        <section className="mt-14 border-t border-border pt-8">
          <p className="eyebrow text-primary">Image rights</p>
          <h2 className="mt-3 font-display text-4xl">Every published image has to clear an item-level rights check.</h2>
          <p className="mt-5 max-w-4xl text-base leading-8 text-muted-foreground">Search-result thumbnails, collection categories and “free image” sites are discovery tools only. Texas Defined publishes a church image only after the individual item identifies the subject and exposes a reusable license or a clear archival rights advisory. Creator, license and source-page attribution are preserved with the image.</p>
          <div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {paintedChurchImageSources.slice(0, 6).map((source) => <article key={source.label} className="bg-background p-5"><p className="eyebrow text-muted-foreground">Priority {source.priority}</p><h3 className="mt-2 font-display text-2xl"><a href={source.url} target="_blank" rel="noreferrer" className="hover:text-primary">{source.label}</a></h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{source.rightsRule}</p></article>)}
          </div>
        </section>

        <section className="mt-14 border-y border-border py-9">
          <p className="eyebrow text-primary">Audit the research</p>
          <div className="mt-4 flex flex-wrap gap-x-7 gap-y-3 text-sm">
            <Link to="/explore/painted-churches/sources" className="border-b border-primary text-primary">Canonical source registry</Link>
            <Link to="/explore/painted-churches/bibliography" className="border-b border-primary text-primary">Research bibliography</Link>
            <Link to="/explore/painted-churches/preindex-readiness" className="border-b border-primary text-primary">Pre-index readiness audit</Link>
            <Link to="/explore/painted-churches/fieldwork-protocol" className="border-b border-primary text-primary">Fieldwork protocol</Link>
            <Link to="/explore/painted-churches/how-many" className="border-b border-primary text-primary">Why counts differ</Link>
            <Link to="/explore/painted-churches/compare" className="border-b border-primary text-primary">Compare verified churches</Link>
          </div>
        </section>
      </Container>
    </main>
  );
}
