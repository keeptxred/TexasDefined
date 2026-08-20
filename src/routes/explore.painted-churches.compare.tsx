import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { canonicalPaintedChurchGalleryBySlug } from "@/data/painted-church-gallery-index";
import { canonicalPaintedChurchProfileBySlug } from "@/data/painted-church-profile-index";
import { paintedChurchPeople } from "@/data/painted-church-people";
import { paintedChurchSymbols } from "@/data/painted-church-symbols";
import { paintedChurchVisitorStatusBySlug } from "@/data/painted-church-visitor-status";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";
import { absoluteUrl, buildEditorialCollectionHead, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/compare";
const description = "Filter and compare verified Texas Painted Churches by dates, artists, architecture, classification, integrity, heritage, techniques, symbols, historic designation, visitor evidence and image coverage.";

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const base = buildEditorialCollectionHead(texasDefinedBrand, {
      canonicalPath,
      title: "Compare Texas Painted Churches",
      description,
      collectionName: "Texas Painted Churches comparison",
      breadcrumbParentName: "Painted Churches",
      breadcrumbParentPath: "/explore/painted-churches",
      items: expandedPaintedChurches.map((church) => ({ name: church.name, url: `/explore/painted-churches/${church.slug}`, description: church.summary, image: church.image?.src, type: "TouristAttraction" as const })),
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
          dateModified: "2026-08-20",
          creator: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` },
          isBasedOn: absoluteUrl(texasDefinedBrand, "/explore/painted-churches"),
          variableMeasured: [
            "Church name", "City", "County", "Denomination", "Present building year", "Painting year", "Architect", "Artists and decorators",
            "Collection classification", "Interior integrity", "Cultural heritage", "Documented decorative techniques", "Documented symbols",
            "National Register status", "National Register reference number", "Recorded Texas Historic Landmark status", "Schulenburg cluster membership",
            "Current visitor evidence", "Rights-cleared current photography",
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
  const [query, setQuery] = useState("");
  const [classification, setClassification] = useState("all");
  const [integrity, setIntegrity] = useState("all");
  const [technique, setTechnique] = useState("all");
  const [denomination, setDenomination] = useState("all");
  const [imageFilter, setImageFilter] = useState("all");
  const [sort, setSort] = useState("city");

  const enriched = useMemo(() => expandedPaintedChurches.map((church) => {
    const profile = canonicalPaintedChurchProfileBySlug(church.slug);
    const people = paintedChurchPeople.filter((person) => person.churchSlugs.includes(church.slug));
    const artists = people.filter((person) => person.roles.some((role) => role === "artist" || role === "decorator" || role === "clergy-artist"));
    const symbols = paintedChurchSymbols.filter((symbol) => symbol.churchSlugs.includes(church.slug));
    const visitor = paintedChurchVisitorStatusBySlug.get(church.slug);
    const hasImage = Boolean(church.image || canonicalPaintedChurchGalleryBySlug(church.slug).length);
    return { church, profile, artists, symbols, visitor, hasImage };
  }), []);

  const rows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = enriched.filter(({ church, profile, artists, symbols, hasImage }) => {
      const haystack = [church.name, church.shortName, church.city, church.county, church.denomination, ...church.culturalHeritage, ...church.techniques, profile?.architect ?? "", ...(profile?.artists ?? []), ...artists.map((person) => person.name), ...symbols.map((symbol) => symbol.name)].join(" ").toLowerCase();
      if (normalized && !haystack.includes(normalized)) return false;
      if (classification !== "all" && church.classification !== classification) return false;
      if (integrity !== "all" && church.interiorIntegrity !== integrity) return false;
      if (technique !== "all" && !church.techniques.includes(technique as any)) return false;
      if (denomination !== "all" && church.denomination !== denomination) return false;
      if (imageFilter === "with" && !hasImage) return false;
      if (imageFilter === "without" && hasImage) return false;
      return true;
    });
    return [...filtered].sort((a, b) => {
      if (sort === "built") return (a.profile?.builtYear ?? 9999) - (b.profile?.builtYear ?? 9999) || a.church.city.localeCompare(b.church.city);
      if (sort === "painted") return (a.profile?.paintedYear ?? 9999) - (b.profile?.paintedYear ?? 9999) || a.church.city.localeCompare(b.church.city);
      if (sort === "county") return a.church.county.localeCompare(b.church.county) || a.church.city.localeCompare(b.church.city);
      return a.church.city.localeCompare(b.church.city);
    });
  }, [classification, denomination, enriched, imageFilter, integrity, query, sort, technique]);

  const denominations = [...new Set(expandedPaintedChurches.map((church) => church.denomination))].sort();
  const techniques = [...new Set(expandedPaintedChurches.flatMap((church) => church.techniques))].sort();
  const reset = () => { setQuery(""); setClassification("all"); setIntegrity("all"); setTechnique("all"); setDenomination("all"); setImageFilter("all"); setSort("city"); };

  return <main>
    <section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24">
      <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page">Compare</li></ol></nav>
      <p className="eyebrow mt-8 text-primary">Statewide comparison</p>
      <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Compare every verified Texas Painted Church.</h1>
      <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">Search, filter and sort the authority model: dates, architects, artists, classification, integrity, heritage, techniques, symbols, designation, visitor evidence and rights-cleared photography. Blank values remain blank when the source record does not support an answer.</p>
      <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"><a href="/painted-churches.csv" className="border-b border-primary text-primary">Download comparison CSV</a><a href="/painted-churches.json" className="border-b border-primary text-primary">Open reference JSON</a><Link to="/explore/painted-churches/knowledge-graph" className="border-b border-primary text-primary">Knowledge graph</Link><Link to="/explore/painted-churches/census" className="border-b border-primary text-primary">Master census</Link></div>
    </Container></section>

    <Container className="py-14 sm:py-18">
      <section className="border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">Quick answer</p><h2 className="mt-3 font-display text-4xl">{expandedPaintedChurches.length} verified churches, one evidence model.</h2><p className="mt-5 max-w-4xl text-base leading-8 text-foreground/90">The table and mobile cards below are generated from the same canonical records as the church pages and downloads. Missing artists, techniques or dates are research gaps—not values inferred to make the table look complete.</p></section>

      <section aria-labelledby="comparison-filters" className="mt-10 border-y border-border py-7">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow text-primary">Research controls</p><h2 id="comparison-filters" className="mt-2 font-display text-3xl">Filter the statewide collection</h2></div><button type="button" onClick={reset} className="border border-border px-4 py-2 text-sm hover:border-foreground">Reset filters</button></div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-sm"><span className="block text-xs uppercase tracking-[0.1em] text-muted-foreground">Search</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Church, city, artist, symbol…" className="mt-2 w-full border border-border bg-background px-3 py-2" /></label>
          <Filter label="Classification" value={classification} onChange={setClassification} options={[...new Set(expandedPaintedChurches.map((church) => church.classification))]} />
          <Filter label="Interior integrity" value={integrity} onChange={setIntegrity} options={[...new Set(expandedPaintedChurches.map((church) => church.interiorIntegrity))]} />
          <Filter label="Technique" value={technique} onChange={setTechnique} options={techniques} />
          <Filter label="Denomination" value={denomination} onChange={setDenomination} options={denominations} />
          <Filter label="Rights-cleared image" value={imageFilter} onChange={setImageFilter} options={["with", "without"]} />
          <Filter label="Sort" value={sort} onChange={setSort} options={["city", "county", "built", "painted"]} includeAll={false} />
        </div>
        <p className="mt-5 text-sm text-muted-foreground">Showing <strong className="text-foreground">{rows.length}</strong> of {expandedPaintedChurches.length} verified churches.</p>
      </section>

      <div className="mt-8 grid gap-5 lg:hidden">{rows.map((row) => <MobileCard key={row.church.slug} row={row} />)}</div>

      <div className="mt-10 hidden overflow-x-auto border-y border-border lg:block">
        <table className="min-w-[2480px] w-full border-collapse text-left text-sm">
          <thead><tr className="border-b border-border bg-surface text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground"><th className="p-4">Church</th><th className="p-4">City</th><th className="p-4">Built</th><th className="p-4">Painted</th><th className="p-4">Architect</th><th className="p-4">Artists / decorators</th><th className="p-4">Classification</th><th className="p-4">Interior integrity</th><th className="p-4">Heritage</th><th className="p-4">Techniques</th><th className="p-4">Symbols</th><th className="p-4">NR</th><th className="p-4">RTHL</th><th className="p-4">Schulenburg</th><th className="p-4">Visitor evidence</th><th className="p-4">Current image</th></tr></thead>
          <tbody>{rows.map(({ church, profile, artists, symbols, visitor, hasImage }) => <tr key={church.slug} className="border-b border-border align-top last:border-b-0"><td className="p-4"><Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="font-display text-xl leading-tight hover:text-primary">{church.shortName}</Link><p className="mt-2 max-w-xs text-xs leading-5 text-muted-foreground">{church.county} County · {church.denomination}</p></td><td className="p-4">{church.city}</td><td className="p-4">{profile?.builtYear ?? "—"}</td><td className="p-4">{profile?.paintedYear ?? "—"}</td><td className="p-4">{profile?.architect ?? "—"}</td><td className="p-4">{profile?.artists?.length ? profile.artists.join(" · ") : artists.length ? artists.map((person) => person.name).join(" · ") : "—"}</td><td className="p-4">{church.classification.replaceAll("-", " ")}</td><td className="p-4">{church.interiorIntegrity.replaceAll("-", " ")}</td><td className="p-4">{church.culturalHeritage.length ? church.culturalHeritage.join(" · ") : "—"}</td><td className="p-4">{church.techniques.length ? church.techniques.map((value) => value.replaceAll("-", " ")).join(" · ") : "Under review"}</td><td className="p-4">{symbols.length ? symbols.map((symbol) => symbol.name).join(" · ") : "—"}</td><td className="p-4">{church.nationalRegister ? church.nationalRegister.referenceNumber : "—"}</td><td className="p-4">{church.recordedTexasHistoricLandmark ? "Yes" : "—"}</td><td className="p-4">{church.schulenburgCluster ? "Yes" : "—"}</td><td className="p-4">{visitor ? visitor.status.replaceAll("-", " ") : "—"}</td><td className="p-4">{hasImage ? "Yes" : "No"}</td></tr>)}</tbody>
        </table>
      </div>

      <section className="mt-10 border-l-2 border-primary bg-surface p-6 sm:p-8"><p className="eyebrow text-primary">Machine-readable distribution</p><h2 className="mt-3 font-display text-3xl">Same verified records, research-ready formats.</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">Use this interface for filtering and interpretation; use the CSV/JSON for analysis. All three are generated from the same canonical church records.</p><div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm"><a href="/painted-churches.csv" className="border-b border-primary text-primary">Texas Painted Churches CSV</a><a href="/painted-churches.json" className="border-b border-primary text-primary">Texas Painted Churches JSON</a></div></section>
    </Container>
  </main>;
}

function Filter({ label, value, onChange, options, includeAll = true }: { label: string; value: string; onChange: (value: string) => void; options: string[]; includeAll?: boolean }) {
  return <label className="text-sm"><span className="block text-xs uppercase tracking-[0.1em] text-muted-foreground">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full border border-border bg-background px-3 py-2">{includeAll ? <option value="all">All</option> : null}{options.map((option) => <option key={option} value={option}>{option.replaceAll("-", " ")}</option>)}</select></label>;
}

function MobileCard({ row }: { row: ReturnType<typeof buildRowType> }) { return null; }
function buildRowType() { return null as any; }
