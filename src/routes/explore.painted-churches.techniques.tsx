import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { paintedChurchTechniques } from "@/data/painted-church-techniques";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";
import { buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/techniques";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const description = "Learn the decorative painting techniques used in Texas Painted Churches, including stenciling, infill, pouncing, marbling, graining, freehand murals, gilding, trompe-l’oeil and canvas-applied decoration.";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Texas Painted Church Painting Techniques", description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${pageUrl}#page`,
          url: pageUrl,
          name: "Texas Painted Church Painting Techniques",
          description,
          mainEntity: { "@id": `${pageUrl}#terms` },
        },
        {
          "@type": "DefinedTermSet",
          "@id": `${pageUrl}#terms`,
          name: "Texas Painted Church decorative painting techniques",
          hasDefinedTerm: paintedChurchTechniques.map((technique) => ({
            "@type": "DefinedTerm",
            name: technique.name,
            description: technique.shortDefinition,
            url: `${pageUrl}/${technique.slug}`,
          })),
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
            { "@type": "ListItem", position: 2, name: "Painted Churches", item: `${siteUrl}/explore/painted-churches` },
            { "@type": "ListItem", position: 3, name: "Techniques", item: pageUrl },
          ],
        },
      ],
    })],
  }),
  component: PaintedChurchTechniquesHub,
});

function PaintedChurchTechniquesHub() {
  return <main>
    <section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24">
      <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page">Techniques</li></ol></nav>
      <p className="eyebrow mt-8 text-primary">Decorative arts encyclopedia</p>
      <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">How Texas Painted Churches were actually painted.</h1>
      <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">The interiors were not produced with one method. Decorative painters combined repeating stencil systems, hand-filled transfers, faux marble and wood, one-of-a-kind murals, metallic accents and painted architectural illusion. Each technique below has its own authoritative page and links back to churches where the evidence supports that relationship.</p>
    </Container></section>

    <Container className="py-14 sm:py-18">
      <section className="border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">Quick answer</p><h2 className="mt-3 font-display text-4xl">Six core techniques are documented directly by Austin PBS; Texas Defined tracks four additional recurring methods separately.</h2><p className="mt-5 max-w-4xl text-base leading-8 text-foreground/90">Austin PBS specifically documents stenciling, infill, freehand painting, marbling, graining and pounce transfer. Texas Defined also maintains separate authority records for gilding/metallic accents, architectural illusion, canvas-applied decoration and decorative murals when church-specific evidence supports them.</p></section>

      <section className="mt-12 grid gap-px border border-border bg-border md:grid-cols-2">
        {paintedChurchTechniques.map((technique) => {
          const examples = expandedPaintedChurches.filter((church) => technique.churchSlugs.includes(church.slug));
          return <article key={technique.slug} className="bg-background p-7">
            <p className="eyebrow text-primary">{examples.length} documented church{examples.length === 1 ? "" : "es"}</p>
            <h2 className="mt-3 font-display text-3xl"><Link to="/explore/painted-churches/techniques/$slug" params={{ slug: technique.slug }} className="hover:text-primary">{technique.name}</Link></h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{technique.shortDefinition}</p>
            {examples.length ? <p className="mt-4 text-xs leading-6 text-muted-foreground">Examples: {examples.slice(0, 4).map((church) => church.city).join(" · ")}{examples.length > 4 ? " · more" : ""}</p> : <p className="mt-4 text-xs leading-6 text-muted-foreground">The technique is documented in the broader Texas decorative-painting literature; church-specific attribution remains deliberately unassigned until verified.</p>}
            <Link to="/explore/painted-churches/techniques/$slug" params={{ slug: technique.slug }} className="eyebrow mt-5 inline-block border-b border-primary text-primary">Read the technique guide</Link>
          </article>;
        })}
      </section>

      <section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Primary technique source</p><h2 className="mt-3 font-display text-3xl">Decorative Painting Techniques — Austin PBS</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">Texas Defined uses Austin PBS’s Painted Churches research as the controlling explanatory source for the six documented technique definitions, while church-specific pages and archival sources control whether a particular technique is assigned to an individual church.</p><a href="https://austinpbs.org/paintedchurches/decorative" target="_blank" rel="noreferrer" className="mt-5 inline-block border-b border-primary text-sm text-primary">Open the Austin PBS technique source</a></section>
    </Container>
  </main>;
}
