import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { paintedChurchFeatures } from "@/data/painted-church-features";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/features";
const description = "A church-by-church inventory of documented murals, symbols, faux finishes, stained glass, inscriptions, altars, pulpits, organs and restoration evidence across the Texas Painted Churches.";

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const url = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Texas Painted Churches Artwork & Interior Feature Inventory", description, modifiedTime: "2026-08-19T22:00:00-05:00" }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "CollectionPage", "@id": `${url}#page`, url, name: "Texas Painted Churches artwork and interior feature inventory", description, mainEntity: { "@id": `${url}#features` }, publisher: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` } },
          { "@type": "ItemList", "@id": `${url}#features`, numberOfItems: paintedChurchFeatures.length, itemListElement: paintedChurchFeatures.map((feature, index) => ({ "@type": "ListItem", position: index + 1, name: feature.name, description: feature.description, url: absoluteUrl(texasDefinedBrand, `/explore/painted-churches/${feature.churchSlug}`) })) },
        ],
      })],
    };
  },
  component: FeatureInventory,
});

function FeatureInventory() {
  const groups = [...expandedPaintedChurches].map((church) => ({ church, features: paintedChurchFeatures.filter((feature) => feature.churchSlug === church.slug) })).filter((group) => group.features.length);
  const unInventoried = expandedPaintedChurches.filter((church) => !paintedChurchFeatures.some((feature) => feature.churchSlug === church.slug));
  return <main>
    <section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page">Artwork & features</li></ol></nav><p className="eyebrow mt-8 text-primary">Object-level research</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">What, exactly, is inside each Painted Church?</h1><p className="mt-6 max-w-5xl text-lg leading-8 text-muted-foreground">This inventory moves below the church level. It records specific murals, symbol fields, faux finishes, windows, inscriptions, furnishings and restoration evidence with their location, date, contributor, integrity and source when those facts are documented.</p><p className="mt-5 text-sm text-muted-foreground">Current evidence inventory: {paintedChurchFeatures.length} documented features across {groups.length} of {expandedPaintedChurches.length} verified churches.</p></Container></section>
    <Container className="py-14 sm:py-18">
      <section className="border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">Quick answer</p><h2 className="mt-3 font-display text-4xl">A Painted Church is an ensemble, not just a colorful ceiling.</h2><p className="mt-5 max-w-4xl text-base leading-8 text-foreground/90">The definitive record has to document the interaction of painted surfaces, stained glass, altars, pulpits, inscriptions, organs, furnishings and later conservation. Features remain marked historic, restored, reconstructed, modern or uncertain instead of being visually blended into one timeless interior.</p></section>
      <div className="mt-14 space-y-14">{groups.map(({ church, features }) => <section key={church.slug} className="border-t border-border pt-8"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow text-primary">{church.city} · {church.county} County</p><h2 className="mt-2 font-display text-4xl"><Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="hover:text-primary">{church.shortName}</Link></h2></div><p className="text-sm text-muted-foreground">{features.length} documented feature{features.length === 1 ? "" : "s"}</p></div><div className="mt-7 grid gap-px border border-border bg-border md:grid-cols-2">{features.map((feature) => <article key={feature.id} className="bg-background p-6"><p className="eyebrow text-muted-foreground">{feature.type.replaceAll("-", " ")} · {feature.integrity.replaceAll("-", " ")}</p><h3 className="mt-2 font-display text-2xl">{feature.name}</h3><p className="mt-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">{feature.location}{feature.dateOrPeriod ? ` · ${feature.dateOrPeriod}` : ""}</p><p className="mt-4 text-sm leading-7 text-muted-foreground">{feature.description}</p><a href={feature.sourceUrl} target="_blank" rel="noreferrer" className="mt-4 inline-block border-b border-primary text-sm text-primary">{feature.sourceLabel}</a>{feature.sourceDetail ? <p className="mt-2 text-xs leading-6 text-muted-foreground">{feature.sourceDetail}</p> : null}</article>)}</div></section>)}</div>
      {unInventoried.length ? <section className="mt-14 border-l-2 border-primary bg-surface p-6 sm:p-8"><p className="eyebrow text-primary">Open object-level research queue</p><h2 className="mt-3 font-display text-3xl">Churches whose feature inventory is not yet deep enough</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">A church remains in the verified collection even if its object-level inventory is unfinished. Texas Defined will not manufacture individual features from generic photographs simply to fill this list.</p><div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm">{unInventoried.map((church) => <Link key={church.slug} to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="border-b border-primary text-primary">{church.shortName}</Link>)}</div></section> : null}
    </Container>
  </main>;
}
