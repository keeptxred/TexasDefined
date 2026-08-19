import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";
import { absoluteUrl, buildEditorialCollectionHead, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/compare";
const description = "Compare all verified Texas Painted Churches by classification, interior integrity, cultural heritage, decorative techniques, county, denomination and historic designation.";

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const base = buildEditorialCollectionHead(texasDefinedBrand, {
      canonicalPath,
      title: "Compare Texas Painted Churches",
      description,
      collectionName: "Texas Painted Churches comparison",
      breadcrumbParentName: "Painted Churches",
      breadcrumbParentPath: "/explore/painted-churches",
      items: expandedPaintedChurches.map((church) => ({
        name: church.name,
        url: `/explore/painted-churches/${church.slug}`,
        description: church.summary,
        image: church.image?.src,
        type: "TouristAttraction" as const,
      })),
    });
    return {
      ...base,
      scripts: [
        ...(base.scripts ?? []),
        jsonLd({
          "@context": "https://schema.org",
          "@type": "Dataset",
          "@id": `${absoluteUrl(texasDefinedBrand, canonicalPath)}#dataset`,
          name: "Texas Painted Churches verified comparison dataset",
          description,
          url: absoluteUrl(texasDefinedBrand, canonicalPath),
          dateModified: "2026-08-18",
          creator: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` },
          isBasedOn: absoluteUrl(texasDefinedBrand, "/explore/painted-churches"),
          variableMeasured: [
            "Church name", "City", "County", "Denomination", "Collection classification", "Interior integrity",
            "Cultural heritage", "Documented decorative techniques", "National Register decorative-interior status",
            "National Register reference number", "Recorded Texas Historic Landmark status", "Schulenburg cluster membership",
          ],
          distribution: [
            { "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: absoluteUrl(texasDefinedBrand, "/painted-churches.csv") },
            { "@type": "DataDownload", encodingFormat: "application/json", contentUrl: absoluteUrl(texasDefinedBrand, "/painted-churches.json") },
          ],
        }),
      ],
    };
  },
  component: PaintedChurchComparison,
});

function PaintedChurchComparison() {
  const rows = [...expandedPaintedChurches].sort((a, b) => a.city.localeCompare(b.city));
  return <main>
    <section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24">
      <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page">Compare</li></ol></nav>
      <p className="eyebrow mt-8 text-primary">Statewide comparison</p>
      <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Compare every verified Texas Painted Church.</h1>
      <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">This table now compares not just designation, but what kind of Painted Church each entry is, how much of the visible decorative program is original/restored/reconstructed, which cultural communities shaped it, and which decorative techniques are documented.</p>
      <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"><a href="/painted-churches.csv" className="border-b border-primary text-primary">Download comparison CSV</a><a href="/painted-churches.json" className="border-b border-primary text-primary">Open reference JSON</a><Link to="/explore/painted-churches/census" className="border-b border-primary text-primary">Master census</Link><Link to="/explore/painted-churches/techniques" className="border-b border-primary text-primary">Technique encyclopedia</Link></div>
    </Container></section>

    <Container className="py-14 sm:py-18">
      <section className="border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">Quick answer</p><h2 className="mt-3 font-display text-4xl">{expandedPaintedChurches.length} verified churches, one consistent evidence model.</h2><p className="mt-5 max-w-4xl text-base leading-8 text-foreground/90">“Formal NR group” means the church belongs to the narrower National Register decorative-interior listing. “Broader historic tradition” means the church has verified painted-interior evidence but is not represented as part of that formal group. “Modern campaign” identifies a later documented decorative program. Integrity labels distinguish original, restored, reconstructed, heavily repainted and still-uncertain interiors.</p></section>

      <div className="mt-10 overflow-x-auto border-y border-border">
        <table className="min-w-[1500px] w-full border-collapse text-left text-sm">
          <thead><tr className="border-b border-border bg-surface text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground"><th className="p-4">Church</th><th className="p-4">City</th><th className="p-4">Classification</th><th className="p-4">Interior integrity</th><th className="p-4">Heritage</th><th className="p-4">Techniques</th><th className="p-4">NR</th><th className="p-4">RTHL</th><th className="p-4">Schulenburg</th></tr></thead>
          <tbody>{rows.map((church) => <tr key={church.slug} className="border-b border-border align-top last:border-b-0"><td className="p-4"><Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="font-display text-xl leading-tight hover:text-primary">{church.shortName}</Link><p className="mt-2 max-w-xs text-xs leading-5 text-muted-foreground">{church.county} County · {church.denomination}</p></td><td className="p-4">{church.city}</td><td className="p-4">{church.classification.replaceAll("-", " ")}</td><td className="p-4">{church.interiorIntegrity.replaceAll("-", " ")}</td><td className="p-4">{church.culturalHeritage.length ? church.culturalHeritage.join(" · ") : "—"}</td><td className="p-4">{church.techniques.length ? church.techniques.map((technique) => technique.replaceAll("-", " ")).join(" · ") : "Under review"}</td><td className="p-4">{church.nationalRegister?.multipleProperty ? `${church.nationalRegister.referenceNumber}` : "—"}</td><td className="p-4">{church.recordedTexasHistoricLandmark ? "Yes" : "—"}</td><td className="p-4">{church.schulenburgCluster ? "Yes" : "—"}</td></tr>)}</tbody>
        </table>
      </div>

      <section className="mt-10 border-l-2 border-primary bg-surface p-6 sm:p-8"><p className="eyebrow text-primary">Machine-readable distribution</p><h2 className="mt-3 font-display text-3xl">Same verified records, two research formats.</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">The CSV and JSON are generated from the same shared church collection as this table. The JSON preserves primary-source URLs, source-check dates, designation fields, classification, integrity, heritage, technique relationships and image-rights metadata where available.</p><div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm"><a href="/painted-churches.csv" className="border-b border-primary text-primary">Texas Painted Churches CSV</a><a href="/painted-churches.json" className="border-b border-primary text-primary">Texas Painted Churches JSON</a></div></section>

      <section className="mt-12 grid gap-8 border-t border-border pt-8 md:grid-cols-3"><div><p className="eyebrow text-primary">Planning</p><h2 className="mt-2 font-display text-2xl">Need the driving route?</h2><Link to="/explore/painted-churches-plan" className="mt-4 inline-block border-b border-primary text-sm text-primary">Open the one-day Schulenburg planner</Link></div><div><p className="eyebrow text-primary">Research</p><h2 className="mt-2 font-display text-2xl">Need the census?</h2><Link to="/explore/painted-churches/census" className="mt-4 inline-block border-b border-primary text-sm text-primary">Verified, candidate and excluded records</Link></div><div><p className="eyebrow text-primary">Decorative arts</p><h2 className="mt-2 font-display text-2xl">Need the techniques?</h2><Link to="/explore/painted-churches/techniques" className="mt-4 inline-block border-b border-primary text-sm text-primary">Open the technique encyclopedia</Link></div></section>
    </Container>
  </main>;
}
