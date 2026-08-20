import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/how-many";
const currentMpsCount = expandedPaintedChurches.filter((church) => church.nationalRegister?.multipleProperty).length;
const originalThematicCount = expandedPaintedChurches.filter((church) => church.thematicNomination1982?.originalMember).length;
const clusterCount = expandedPaintedChurches.filter((church) => church.schulenburgCluster).length;
const description = "How many Painted Churches are in Texas? Texas Defined reconciles the Schulenburg six, THC's current 14-property MPS index, the original 15-church National Register thematic study, and broader modern statewide counts.";

const countRows = [
  {
    count: clusterCount,
    label: "Schulenburg touring cluster",
    definition: "The six communities promoted for the best-known local Painted Churches circuit: Ammannsville, Dubina, High Hill, Praha, Moravia and St. John.",
    source: "Greater Schulenburg Chamber of Commerce",
    url: "https://schulenburgchamber.org/painted-churches/",
  },
  {
    count: currentMpsCount,
    label: "Current THC Multiple Property Listing index",
    definition: "Properties currently surfaced by the Texas Historical Commission under Churches with Decorative Interior Painting TR.",
    source: "Texas Historical Commission Atlas",
    url: "https://atlas.thc.texas.gov/AdvancedSearch/MPS?mpsid=12",
  },
  {
    count: 15,
    label: "Original National Register thematic study",
    definition: "The 1982 nomination repeatedly states that 15 churches comprise the statewide decorative-interior thematic study. St. Joseph's Church in Galveston is the historically missing fifteenth church; it was already individually listed in 1976.",
    source: "National Park Service thematic nomination",
    url: "https://npgallery.nps.gov/GetAsset/0534eaa0-e073-4836-815e-d10985b22d13",
  },
  {
    count: 32,
    label: "Houston Chronicle 2022 reporting",
    definition: "A broader modern journalistic count of surviving Texas churches associated with the Painted Churches tradition, not a formal National Register count.",
    source: "Houston Chronicle",
    url: "https://www.houstonchronicle.com/projects/2022/painted-churches-texas/",
  },
  {
    count: 35,
    label: "Anthony Head research estimate",
    definition: "Researcher and author Anthony Head has written that there may be up to 35 surviving Texas churches with similarly painted elements after years of statewide field research. This is an estimate, not a formal designation list.",
    source: "Anthony Head / MySA summary of his research",
    url: "https://www.mysanantonio.com/lifestyle/travel/article/painted-churches-texas-18494616.php",
  },
  {
    count: expandedPaintedChurches.length,
    label: "Texas Defined verified collection",
    definition: "Churches for which Texas Defined currently has church-specific evidence sufficient to classify the decorative interior, with formal, historical-thematic, broader-historic and modern campaigns labeled separately.",
    source: "Texas Defined published methodology",
    url: "https://texasdefined.com/explore/painted-churches/methodology",
  },
] as const;

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const url = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "How Many Painted Churches Are in Texas? 6, 14, 15, 28, 32 & 35 Explained", description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "WebPage", "@id": `${url}#page`, url, name: "How Many Painted Churches Are in Texas?", description, dateModified: "2026-08-19", isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` }, about: { "@id": `${absoluteUrl(texasDefinedBrand, "/explore/painted-churches")}#collection` }, publisher: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` } },
          { "@type": "Dataset", "@id": `${url}#count-concordance`, name: "Texas Painted Churches published-count concordance", description: "A source-by-source concordance explaining why reputable sources report different Texas Painted Churches totals.", creator: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` }, variableMeasured: ["Reported count", "Source definition", "Source date/context", "Relationship to current Texas Defined census"] },
          { "@type": "BreadcrumbList", "@id": `${url}#breadcrumbs`, itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") },
            { "@type": "ListItem", position: 2, name: "Painted Churches", item: absoluteUrl(texasDefinedBrand, "/explore/painted-churches") },
            { "@type": "ListItem", position: 3, name: "How many?", item: url },
          ] },
        ],
      })],
    };
  },
  component: PaintedChurchCountExplainer,
});

function PaintedChurchCountExplainer() {
  return <main>
    <section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24">
      <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page">How many?</li></ol></nav>
      <p className="eyebrow mt-8 text-primary">Count concordance</p>
      <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">How many Painted Churches are there in Texas?</h1>
      <p className="mt-6 max-w-5xl text-lg leading-8 text-muted-foreground">The defensible answer is not one number. The famous Schulenburg route has <strong className="text-foreground">{clusterCount}</strong> communities. THC's current Multiple Property Listing interface surfaces <strong className="text-foreground">{currentMpsCount}</strong> churches. The original 1982 National Register thematic study explicitly analyzed <strong className="text-foreground">15</strong>. Texas Defined currently has <strong className="text-foreground">{expandedPaintedChurches.length} verified statewide profiles</strong>, while broader modern reporting has used totals of 32 and estimates as high as 35.</p>
    </Container></section>

    <Container className="py-14 sm:py-18">
      <section className="border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">Quick answer</p><h2 className="mt-3 font-display text-4xl">The famous 14-versus-15 contradiction is now explainable.</h2><div className="mt-5 max-w-4xl space-y-5 text-base leading-8 text-foreground/90"><p>The original National Register thematic nomination repeatedly describes a 15-church study. Its technique discussion identifies <strong>St. Joseph's Church in Galveston</strong> as the only graining example among those 15.</p><p>St. Joseph's had already been individually listed on the National Register in 1976. The present THC Multiple Property Listing interface surfaces 14 properties under the later thematic listing. Texas Defined therefore records Galveston as a <strong>historical thematic-nomination member with an earlier individual listing</strong> instead of pretending the old 15 and current 14 are mutually exclusive.</p></div></section>

      <section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Source-by-source concordance</p><h2 className="mt-3 font-display text-4xl">What each published number is actually counting</h2><div className="mt-8 overflow-x-auto border-y border-border"><table className="min-w-[900px] w-full border-collapse text-left text-sm"><thead><tr className="border-b border-border bg-surface text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground"><th className="p-4">Count</th><th className="p-4">Definition</th><th className="p-4">What it means</th><th className="p-4">Source</th></tr></thead><tbody>{countRows.map((row) => <tr key={`${row.count}-${row.label}`} className="border-b border-border align-top last:border-b-0"><td className="p-4 font-display text-4xl">{row.count}</td><td className="p-4 font-semibold">{row.label}</td><td className="p-4 max-w-xl leading-7 text-muted-foreground">{row.definition}</td><td className="p-4"><a href={row.url} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">{row.source}</a></td></tr>)}</tbody></table></div></section>

      <section className="mt-14 grid gap-px border border-border bg-border md:grid-cols-3">
        <article className="bg-background p-7"><p className="eyebrow text-primary">Current THC MPS index</p><p className="mt-3 font-display text-5xl">{currentMpsCount}</p><h2 className="mt-4 font-display text-2xl">Current thematic-list interface</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">These are the properties THC currently surfaces under the Churches with Decorative Interior Painting Multiple Property Listing.</p></article>
        <article className="bg-background p-7"><p className="eyebrow text-primary">Original thematic corpus</p><p className="mt-3 font-display text-5xl">15</p><h2 className="mt-4 font-display text-2xl">1982 National Register study</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Includes St. Joseph's Galveston, which was already individually listed in 1976 and therefore needs separate handling in modern database comparisons.</p></article>
        <article className="bg-background p-7"><p className="eyebrow text-primary">Texas Defined verified set</p><p className="mt-3 font-display text-5xl">{expandedPaintedChurches.length}</p><h2 className="mt-4 font-display text-2xl">Evidence-backed statewide profiles</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Formal, historical-thematic, broader historic and modern decorative campaigns are explicitly distinguished.</p></article>
      </section>

      <section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Why 32 or 35 can also be reasonable</p><h2 className="mt-3 font-display text-4xl">Modern researchers are asking a broader survival question.</h2><div className="mt-6 max-w-4xl space-y-5 text-base leading-8 text-muted-foreground"><p>The 1982 nomination itself says the statewide survey was continuing and that additional churches with significant decorative painting could be added if they came to light. That makes the original 15 a documented historic corpus—not a permanent ceiling on the number of painted church interiors in Texas.</p><p>The Houston Chronicle reported in 2022 that 32 remain. Researcher Anthony Head has written that there may be up to 35 surviving churches with similar painted elements after years of statewide research. Texas Defined treats those broader numbers as research leads rather than automatically adding every church to its verified census.</p></div></section>

      <section className="mt-14 border-l-2 border-primary bg-surface p-6 sm:p-8"><p className="eyebrow text-primary">Texas Defined standard</p><h2 className="mt-3 font-display text-3xl">Every count must publish its definition.</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">A tourism route, a historic thematic nomination, a current database index and a research estimate answer different questions. Texas Defined keeps the source, date, definition and inclusion rationale visible so readers can reproduce the count instead of inheriting a number without context.</p></section>

      <section className="mt-14 border-y border-border py-9"><p className="eyebrow text-primary">Verify the definitions</p><div className="mt-4 flex flex-wrap gap-x-7 gap-y-3 text-sm"><Link to="/explore/painted-churches" className="border-b border-primary text-primary">Browse all verified churches</Link><Link to="/explore/painted-churches/methodology" className="border-b border-primary text-primary">Read the inclusion methodology</Link><Link to="/explore/painted-churches/census" className="border-b border-primary text-primary">Open the master census</Link><Link to="/explore/painted-churches/compare" className="border-b border-primary text-primary">Compare churches side by side</Link></div></section>
    </Container>
  </main>;
}
