import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { DepartmentHero } from "@/components/editorial/DepartmentHero";
import { Container } from "@/components/layout/Container";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/texas-graphics";
const description = "Original TexasDefined maps and graphics that publishers, educators and researchers may reuse for editorial purposes with visible TexasDefined.com credit.";

const graphics = [
  {
    title: "Painted Churches of Texas map",
    eyebrow: "Historic places · sourced coordinates",
    href: "/explore/painted-churches/map",
    copy: "A filterable statewide locator built from individually sourced church coordinates, with precision and source records retained for every pin.",
    formats: "PNG + SVG",
  },
  {
    title: "Major Texas river systems map",
    eyebrow: "Water · statewide orientation",
    href: "/article/texas-rivers-explained",
    copy: "An original orientation graphic showing major river systems in statewide context, paired with Texas Water Development Board source guidance for exact basin boundaries.",
    formats: "PNG + SVG",
  },
  {
    title: "Texas state parks map",
    eyebrow: "State parks · maintained destination data",
    href: "/explore/state-parks",
    copy: "A statewide point map generated from the same maintained state-park destination records used by the TexasDefined park guide.",
    formats: "PNG + SVG",
  },
  {
    title: "Texas lighthouse locations map",
    eyebrow: "Gulf Coast · sourced lighthouse coordinates",
    href: "/explore/lighthouses",
    copy: "A six-location Gulf Coast map using the source-backed lighthouse coordinate dataset, including the Texas-Louisiana border context at Sabine Pass.",
    formats: "PNG + SVG",
  },
  {
    title: "UIL football districts graphic",
    eyebrow: "High-school football · 2026–28 alignment",
    href: "/texas-high-school-football-districts",
    copy: "A chart generated from the current UIL district directory showing how the 192 football districts are distributed by classification and division.",
    formats: "PNG + SVG",
  },
  {
    title: "Texas wildlife range graphics",
    eyebrow: "Wildlife · broad regional range",
    href: "/wildlife-species/ocelot",
    copy: "Species-page range graphics for ocelot, javelina, white-tailed deer, black bear, mountain lion and American alligator, with conservative regional framing rather than invented precision polygons.",
    formats: "PNG + SVG",
  },
  {
    title: "Texas fishing lakes map",
    eyebrow: "Fishing · live filtered map",
    href: "/fishing",
    copy: "A downloadable map generated from the fishing lakes currently shown by the TexasDefined fishing finder and its representative published reservoir coordinates.",
    formats: "PNG + SVG",
  },
  {
    title: "Texas historic sites map",
    eyebrow: "Historic sites · maintained destination data",
    href: "/explore/historic-sites",
    copy: "A statewide location map generated from the maintained historic-sites catalog, covering battlefields, monuments, museums and other source-backed heritage destinations.",
    formats: "PNG + SVG",
  },
] as const;

const expansionTopics = [
  ["County data", "population growth, housing costs and county-to-county comparison graphics"],
  ["Property tax", "county, city and school-district rate comparisons with annual context"],
  ["Texas water", "aquifers, reservoirs, basin comparisons and water-supply reference graphics"],
  ["Sports venues", "capacity, opening era and regional venue-comparison graphics"],
] as const;

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: "Texas Maps & Graphics — Free Editorial Use",
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": `${pageUrl}#page`,
            url: pageUrl,
            name: "Texas Maps & Graphics",
            description,
            isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` },
            publisher: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` },
            hasPart: graphics.map((graphic) => ({
              "@type": "CreativeWork",
              name: graphic.title,
              url: absoluteUrl(texasDefinedBrand, graphic.href),
              creditText: "TexasDefined.com",
              isAccessibleForFree: true,
            })),
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${pageUrl}#breadcrumb`,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Front page", item: absoluteUrl(texasDefinedBrand, "/") },
              { "@type": "ListItem", position: 2, name: "Texas Maps & Graphics", item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
  component: TexasGraphicsPage,
});

function TexasGraphicsPage() {
  return <>
    <DepartmentHero
      current="Texas Graphics"
      eyebrow="Original maps & visuals"
      title="Texas graphics built to be cited, published and shared"
      description={description}
    />
    <Container className="py-12 sm:py-16">
      <section className="grid gap-8 border-y border-border py-9 lg:grid-cols-[15rem_1fr]" aria-labelledby="reuse-heading">
        <div><p className="eyebrow text-primary">Reuse policy</p><h2 id="reuse-heading" className="mt-2 font-display text-4xl">Use them in your story</h2></div>
        <div className="max-w-4xl space-y-4 text-sm leading-7 text-muted-foreground">
          <p className="text-base font-semibold text-foreground">Publish this graphic — free for editorial use. Credit: TexasDefined.com.</p>
          <p>Newsrooms, magazines, newsletters, schools, researchers and other publishers may republish TexasDefined-created graphics in editorial or educational work with visible credit. A link to the source page is appreciated because it gives readers the live data and methodology, but a followed backlink is not required.</p>
          <p>You may resize a graphic or make a reasonable crop as long as labels, scale and context remain understandable. Do not alter data labels in a way that changes the meaning or imply that TexasDefined endorses a product, organization or position. Source datasets and third-party facts retain their own underlying rights; this permission covers TexasDefined's original graphic composition.</p>
        </div>
      </section>

      <section className="py-12" aria-labelledby="available-heading">
        <div className="border-b border-border pb-5"><p className="eyebrow text-primary">Available now</p><h2 id="available-heading" className="mt-2 font-display text-4xl">Downloadable Texas maps & graphics</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Open a source page and use the publish box directly beneath the graphic to download a standalone PNG or SVG. The download reflects the data or filter state shown on that page.</p></div>
        <div className="grid gap-px border-x border-b border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {graphics.map((graphic) => <article key={graphic.href} className="bg-background p-6 sm:p-7">
            <p className="eyebrow text-primary">{graphic.eyebrow}</p>
            <h3 className="mt-3 font-display text-3xl leading-tight"><Link to={graphic.href} className="hover:text-primary">{graphic.title}</Link></h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{graphic.copy}</p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">Downloads · {graphic.formats}</p>
            <Link to={graphic.href} className="mt-4 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Open graphic →</Link>
          </article>)}
        </div>
      </section>

      <section className="grid gap-8 border-y border-border py-10 lg:grid-cols-[15rem_1fr]" aria-labelledby="method-heading">
        <div><p className="eyebrow text-primary">How we build them</p><h2 id="method-heading" className="mt-2 font-display text-4xl">Data first, artwork second</h2></div>
        <div className="max-w-4xl text-sm leading-7 text-muted-foreground">
          <p>Where coordinates or measurements exist, the graphic is generated from maintained TexasDefined data rather than hand-placing a decorative marker. When a map is intentionally simplified for orientation, the graphic says so and points readers toward the authoritative source for exact legal, hydrologic, biological or operational boundaries.</p>
          <p className="mt-4">That distinction is especially important for wildlife. Broad range graphics deliberately avoid pretending that a clean shape can represent live animal distribution, habitat quality or current sightings.</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 font-semibold"><Link to="/texas-data" className="border-b border-primary text-primary">Texas Data →</Link><Link to="/sourcing-methodology" className="border-b border-primary text-primary">Sourcing methodology →</Link><Link to="/corrections-policy" className="border-b border-primary text-primary">Corrections & updates →</Link></div>
        </div>
      </section>

      <section className="py-12" aria-labelledby="expansion-heading">
        <div className="grid gap-8 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">Next graphic families</p><h2 id="expansion-heading" className="mt-2 font-display text-4xl">More citation assets from Texas Data</h2></div><div className="grid sm:grid-cols-2">{expansionTopics.map(([title, copy]) => <div key={title} className="border-t border-border py-5 sm:px-5"><h3 className="font-display text-2xl">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p></div>)}</div></div>
      </section>
    </Container>
  </>;
}
