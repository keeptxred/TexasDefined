import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";
import { buildEditorialCollectionHead } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/map";
const description = "Texas Painted Churches map and statewide location directory with all verified churches, counties, addresses, direct map links and full Texas Defined church guides.";

const regionFor = (county: string) => {
  if (["Fayette", "Lavaca", "Austin", "Grimes", "Williamson", "Lee", "Washington"].includes(county)) return "Central Texas & the classic Painted Churches belt";
  if (["Gillespie", "Bandera", "Karnes"].includes(county)) return "Hill Country & South-Central Texas";
  if (["Potter", "Randall"].includes(county)) return "Panhandle";
  if (["Cooke", "Lamar"].includes(county)) return "North & Northeast Texas";
  if (["Anderson"].includes(county)) return "East Texas";
  return "Elsewhere in Texas";
};

export const Route = createFileRoute(canonicalPath)({
  head: () => buildEditorialCollectionHead(texasDefinedBrand, {
    canonicalPath,
    title: "Texas Painted Churches Map & Statewide Directory",
    description,
    collectionName: "Texas Painted Churches map and directory",
    breadcrumbParentName: "Painted Churches",
    breadcrumbParentPath: "/explore/painted-churches",
    items: expandedPaintedChurches.map((church) => ({ name: church.name, url: `/explore/painted-churches/${church.slug}`, description: church.summary, image: church.image?.src, type: "TouristAttraction" as const })),
  }),
  component: PaintedChurchMapDirectory,
});

function PaintedChurchMapDirectory() {
  const grouped = [...expandedPaintedChurches]
    .sort((a, b) => a.city.localeCompare(b.city))
    .reduce<Record<string, typeof expandedPaintedChurches>>((acc, church) => {
      const region = regionFor(church.county);
      (acc[region] ??= []).push(church);
      return acc;
    }, {});

  return <main>
    <section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24">
      <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page">Map & directory</li></ol></nav>
      <p className="eyebrow mt-8 text-primary">Statewide geography</p>
      <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas Painted Churches map and location directory.</h1>
      <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">The best-known cluster sits around Schulenburg, but the verified collection stretches from the Panhandle to North Texas, East Texas and the Hill Country. Use the directory below as the map index: every entry opens the exact church in your map app and links to its source-checked guide.</p>
    </Container></section>

    <Container className="py-14 sm:py-18">
      <section className="border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">Quick answer</p><h2 className="mt-3 font-display text-4xl">Start around Schulenburg; use the statewide stops as separate trips.</h2><p className="mt-5 max-w-4xl text-base leading-8 text-foreground/90">Six communities form the local Schulenburg Painted Churches cluster. The wider Texas Defined collection includes verified churches much farther apart, so statewide locations are best treated as regional additions rather than a single-day driving route.</p><div className="mt-7 flex flex-wrap gap-3"><Link to="/explore/painted-churches-plan" className="eyebrow border border-foreground bg-foreground px-5 py-3 text-background">Open the classic route</Link><Link to="/explore/painted-churches/compare" className="eyebrow border border-border px-5 py-3">Compare all churches</Link></div></section>

      {Object.entries(grouped).map(([region, churches]) => <section key={region} className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">{region}</p><h2 className="mt-3 font-display text-4xl">{churches.length} verified {churches.length === 1 ? "church" : "churches"}</h2><div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">{churches.map((church) => {
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(church.address ?? `${church.name}, ${church.city}, Texas`)}`;
        return <article key={church.slug} className="bg-background p-6"><p className="eyebrow text-muted-foreground">{church.city} · {church.county} County</p><h3 className="mt-2 font-display text-2xl leading-tight"><Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="hover:text-primary">{church.shortName}</Link></h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{church.address ?? `${church.city}, Texas`}</p><div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm"><a href={mapUrl} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">Open in Maps</a><Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="border-b border-primary text-primary">Full guide</Link></div></article>;
      })}</div></section>)}

      <section className="mt-14 border-y border-border py-9"><p className="eyebrow text-primary">About this map directory</p><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">Locations come from the verified church records used throughout Texas Defined. Where a rural church lacks a conventional street address, the map link uses the named church and community. Always verify current access with the church or responsible visitor source before traveling.</p><Link to="/explore/painted-churches/methodology" className="mt-4 inline-block border-b border-primary text-sm text-primary">Read the verification methodology</Link></section>
    </Container>
  </main>;
}
