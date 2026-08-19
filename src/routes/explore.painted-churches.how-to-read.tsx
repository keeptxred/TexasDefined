import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/how-to-read";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const description = "Learn how to read a Texas Painted Church: architecture, painted illusion, symbols, decorative techniques, immigrant context, preservation history and what to look for during a visit.";

const steps = [
  ["Start with the building", "Identify the nave, sanctuary, apse, transept, windows and vaulting before interpreting the paint. Decorative programs often exaggerate or visually complete the architecture."],
  ["Separate structure from illusion", "At High Hill and Wesley, paint can simulate ribs, columns, arches, brickwork or depth. Ask what is physically built and what the painter is making your eye believe is built."],
  ["Look for repeating systems", "Stencil bands, infill, borders and geometric ceiling fields reveal how decorators covered large surfaces efficiently while maintaining visual order."],
  ["Then read the symbols", "Lambs, doves, IHS, Marian scenes, Eucharistic motifs and evangelist symbols carry devotional meaning. Use church-specific sources rather than assigning meaning from appearance alone."],
  ["Ask who made it", "Architecture, original decorative painting, later restoration and modern repainting may involve completely different people. Texas Defined tracks those roles separately."],
  ["Ask what is original", "A brilliant interior may be largely original, restored, reconstructed from surviving evidence, extensively repainted or a modern decorative campaign. Integrity is part of the story."],
  ["Connect the church to its community", "German, Czech/Moravian, Wendish and Polish/Silesian histories explain why language, architectural taste, patron saints and decorative ambition differ from church to church."],
] as const;

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "How to Read a Texas Painted Church", description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({ "@context": "https://schema.org", "@type": "HowTo", "@id": `${pageUrl}#howto`, name: "How to Read a Texas Painted Church", description, step: steps.map(([name, text], index) => ({ "@type": "HowToStep", position: index + 1, name, text })) })],
  }),
  component: HowToReadPage,
});

function HowToReadPage() {
  return <main><section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page">How to read a church</li></ol></nav><p className="eyebrow mt-8 text-primary">Field guide</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">How to read a Texas Painted Church.</h1><p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">A Painted Church becomes much more interesting once you stop seeing “a colorful ceiling” and start separating architecture, illusion, technique, iconography, community history and preservation layers.</p></Container></section><Container className="py-14 sm:py-18"><section className="border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">Seven-step field method</p><div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">{steps.map(([name, text], index) => <article key={name} className="bg-background p-7"><p className="eyebrow text-primary">Step {index + 1}</p><h2 className="mt-3 font-display text-3xl">{name}</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{text}</p></article>)}</div></section><section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Keep learning</p><div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm"><Link to="/explore/painted-churches/glossary" className="border-b border-primary text-primary">Architecture glossary</Link><Link to="/explore/painted-churches/techniques" className="border-b border-primary text-primary">Painting techniques</Link><Link to="/explore/painted-churches/symbols" className="border-b border-primary text-primary">Symbols and iconography</Link><Link to="/explore/painted-churches/people" className="border-b border-primary text-primary">Artists and architects</Link><Link to="/explore/painted-churches/preservation" className="border-b border-primary text-primary">Preservation and authenticity</Link><Link to="/explore/painted-churches/heritage" className="border-b border-primary text-primary">Immigrant heritage</Link></div></section></Container></main>;
}
