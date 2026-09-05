import { createFileRoute, Link } from "@tanstack/react-router";

import bbqBrisket from "@/assets/bbq-brisket.jpg";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/texas-food-history";
const description = "A TexasDefined guide to the history behind brisket, chili con carne, chicken-fried steak, breakfast tacos, Czech and German foodways, Dr Pepper, Ranch Water, puffy tacos, barbacoa and the regional cultures that shaped the Texas table.";

const guides = [
  { href: "/article/texas-barbecue-styles-explained", title: "Texas Barbecue Styles Explained", eyebrow: "Smoke & migration", copy: "Central Texas meat markets, East Texas traditions, South Texas barbacoa and the regional logic behind a statewide obsession." },
  { href: "/texas-chili-con-carne-history", title: "Texas Chili Con Carne", eyebrow: "San Antonio food history", copy: "Chili Queens, William Gebhardt, commercial chili powder, Terlingua cookoffs and the difference between documented history and folklore." },
  { href: "/texas-chicken-fried-steak-guide", title: "Texas Chicken-Fried Steak", eyebrow: "Comfort food", copy: "A disputed origin, Southern and German influences, regional frying styles and the cream gravy that completes the plate." },
  { href: "/texas-breakfast-taco-guide", title: "Texas Breakfast Tacos", eyebrow: "Everyday foodways", copy: "Tortillas, eggs, beans, potatoes, barbacoa, carne guisada, migas and the local salsa habits that define the morning stop." },
  { href: "/german-czech-texas-towns", title: "German & Czech Texas Towns", eyebrow: "Immigration & food", copy: "Kolaches, klobasneks, sausage, beer, churches and dance halls connect Central European settlement to living Texas traditions." },
  { href: "/dr-pepper-texas-history", title: "Dr Pepper in Texas", eyebrow: "Waco brand history", copy: "The documented 1885 Waco soda-fountain origin and the path from a local drink to a nationally recognized Texas-born brand." },
  { href: "/texas-ranch-water-guide", title: "Texas Ranch Water", eyebrow: "Cocktail folklore", copy: "Tequila, lime and sparkling mineral water—with a West Texas folk identity and a much more documentable modern Ranch 616 chapter." },
  { href: "/san-antonio-puffy-taco-history", title: "San Antonio Puffy Tacos", eyebrow: "West Side food culture", copy: "Fresh corn masa, hot oil, Ray's Drive Inn and the San Antonio community context behind a regional Tex-Mex icon." },
  { href: "/barbacoa-big-red-san-antonio", title: "Barbacoa & Big Red", eyebrow: "Sunday in San Antonio", copy: "An older weekend barbacoa tradition, a Waco-born red soda and the later pairing that became San Antonio cultural shorthand." },
] as const;

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: "Texas Food History: Chili, Barbecue, Breakfast Tacos & More",
        description,
        image: bbqBrisket,
        imageAlt: "Sliced Texas barbecue brisket with dark bark and smoke ring",
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "CollectionPage", "@id": `${pageUrl}#page`, url: pageUrl, name: "Texas Food History", description, isPartOf: { "@id": "https://texasdefined.com/#website" }, mainEntity: { "@id": `${pageUrl}#guides` } },
          { "@type": "ItemList", "@id": `${pageUrl}#guides`, name: "Texas food history guides", numberOfItems: guides.length, itemListElement: guides.map((guide, index) => ({ "@type": "ListItem", position: index + 1, name: guide.title, url: absoluteUrl(texasDefinedBrand, guide.href) })) },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Front page", item: absoluteUrl(texasDefinedBrand, "/") },
            { "@type": "ListItem", position: 2, name: "Things That Define Texas", item: absoluteUrl(texasDefinedBrand, "/things-unique-to-texas") },
            { "@type": "ListItem", position: 3, name: "Texas Food History", item: pageUrl },
          ] },
        ],
      })],
    };
  },
  component: TexasFoodHistoryPage,
});

function TexasFoodHistoryPage() {
  return <main>
    <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
      <img src={bbqBrisket} alt="Sliced Texas barbecue brisket with dark bark and smoke ring" className="absolute inset-0 size-full object-cover opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/45" />
      <Container className="relative py-16 sm:py-24">
        <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.14em] text-ink-foreground/65"><Link to="/">Front page</Link><span className="mx-2">/</span><Link to="/things-unique-to-texas">Things That Define Texas</Link><span className="mx-2">/</span><span aria-current="page">Food history</span></nav>
        <p className="eyebrow mt-12 text-ink-foreground/70">The stories behind the Texas table</p>
        <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas food history is migration, geography and everyday ritual</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/80">{description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/texas-food-trail" className="bg-background px-5 py-3 text-sm font-semibold text-foreground">Plan the Texas Food Trail →</Link>
          <Link to="/texas-food-trucks" className="border border-ink-foreground/35 px-5 py-3 text-sm font-semibold">Find 300 notable food trucks →</Link>
          <Link to="/things-unique-to-texas/food-drink" className="border border-ink-foreground/35 px-5 py-3 text-sm font-semibold">Browse 35 food & drink icons →</Link>
        </div>
      </Container>
    </section>

    <Container className="py-14 sm:py-20">
      <section className="grid gap-8 border-b border-border pb-12 lg:grid-cols-[14rem_1fr]">
        <div><p className="eyebrow text-primary">Quick answer</p><h2 className="mt-2 font-display text-3xl">There is no single Texas cuisine</h2></div>
        <div className="max-w-3xl space-y-5 text-base leading-8 text-muted-foreground">
          <p>Texas food developed where cattle country, Indigenous ingredients, Mexican and Tejano cooking, Southern traditions, German and Czech immigration, Gulf seafood and modern highway culture overlapped. That is why brisket, breakfast tacos and kolaches can all feel unmistakably Texan without sharing the same origin.</p>
          <p>The useful question is not which food is “most Texas.” It is where a tradition came from, which communities carried it forward, and how geography turned a local habit into a statewide identity.</p>
        </div>
      </section>

      <section className="py-14">
        <p className="eyebrow text-primary">Start with nine stories</p>
        <h2 className="mt-2 max-w-3xl font-display text-4xl sm:text-5xl">From plaza chili stands to Sunday barbacoa and the Waco soda fountain</h2>
        <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => <Link key={guide.href} to={guide.href} className="group bg-background p-7">
            <span className="eyebrow text-primary">{guide.eyebrow}</span>
            <h3 className="mt-3 font-display text-3xl leading-tight group-hover:text-primary">{guide.title}</h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{guide.copy}</p>
            <span className="mt-6 block text-sm font-semibold">Read guide →</span>
          </Link>)}
        </div>
      </section>

      <section className="grid gap-6 border-y border-border py-10 md:grid-cols-3">
        <Link to="/texas-food-trail" className="group"><p className="eyebrow text-primary">Travel</p><h2 className="mt-2 font-display text-3xl group-hover:text-primary">Turn history into a food trip</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Build a route through barbecue country, San Antonio, Czech bakeries, the Gulf Coast and other regional food landscapes.</p></Link>
        <Link to="/article/texas-cultural-regions-explained" className="group md:border-l md:border-border md:pl-6"><p className="eyebrow text-primary">Context</p><h2 className="mt-2 font-display text-3xl group-hover:text-primary">See the cultural regions</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Migration, language, agriculture and transportation explain why the Texas table changes as you cross the state.</p></Link>
        <Link to="/things-unique-to-texas/methodology" className="group md:border-l md:border-border md:pl-6"><p className="eyebrow text-primary">Method</p><h2 className="mt-2 font-display text-3xl group-hover:text-primary">Separate history from folklore</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">See how TexasDefined handles disputed origins, cultural adoption, primary sources and claims that change over time.</p></Link>
      </section>
    </Container>
  </main>;
}
