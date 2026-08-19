import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

type CapitalDesignation = {
  place: string;
  title: string;
  legislature: string;
  resolution: string;
  designatedYear: number;
  sourceUrl: string;
  context: string;
};

const currentDesignations: CapitalDesignation[] = [
  { place: "Bandera", title: "Cowboy Capital of Texas", legislature: "89th Legislature", resolution: "S.C.R. 3", designatedYear: 2025, sourceUrl: "https://capitol.texas.gov/tlodocs/89R/billtext/html/SC00003F.htm", context: "The Legislature tied the designation to Bandera's long-running cowboy, ranching, rodeo and Western heritage." },
  { place: "Galveston", title: "Mardi Gras Capital of Texas", legislature: "89th Legislature", resolution: "H.C.R. 50", designatedYear: 2025, sourceUrl: "https://capitol.texas.gov/tlodocs/89R/billtext/html/HC00050F.htm", context: "The resolution recognizes the island city's more than 150 years of Mardi Gras tradition and its distinctly Texas celebration." },
  { place: "Milam", title: "Gateway Capital of Texas", legislature: "89th Legislature", resolution: "H.C.R. 81", designatedYear: 2025, sourceUrl: "https://capitol.texas.gov/tlodocs/89R/billtext/html/HC00081F.htm", context: "Milam's designation centers on its connection to El Camino Real de los Tejas and the community's role in early Texas travel and settlement." },
  { place: "Rusk County", title: "Syrup Capital of Texas", legislature: "89th Legislature", resolution: "H.C.R. 83", designatedYear: 2025, sourceUrl: "https://capitol.texas.gov/tlodocs/89R/billtext/html/HC00083F.htm", context: "The Legislature recognized the county's syrup-making heritage and the tradition surrounding East Texas cane syrup." },
  { place: "Nacogdoches", title: "Garden Capital of Texas", legislature: "89th Legislature", resolution: "H.C.R. 93", designatedYear: 2025, sourceUrl: "https://capitol.texas.gov/tlodocs/89R/billtext/html/HC00093F.htm", context: "The designation highlights Nacogdoches' gardens, trees, horticultural institutions and long-running public gardening culture." },
  { place: "Port Aransas", title: "Fishing Capital of Texas", legislature: "89th Legislature", resolution: "H.C.R. 117", designatedYear: 2025, sourceUrl: "https://capitol.texas.gov/tlodocs/89R/billtext/html/HC00117F.htm", context: "The resolution recognizes Port Aransas' charter fleet, marinas, fishing businesses, conservation work and deep connection to Gulf Coast angling." },
  { place: "Floresville", title: "Peanut Capital of Texas", legislature: "88th Legislature", resolution: "H.C.R. 83", designatedYear: 2023, sourceUrl: "https://capitol.texas.gov/tlodocs/88R/billtext/html/HC00083F.htm", context: "Floresville's peanut-growing history and its annual Peanut Festival anchor the official designation." },
  { place: "San Angelo", title: "Visual Arts Capital of Texas", legislature: "87th Legislature", resolution: "H.C.R. 24", designatedYear: 2021, sourceUrl: "https://capitol.texas.gov/tlodocs/87R/billtext/html/HC00024F.htm", context: "The Legislature cited San Angelo's museums, galleries, public art, sculpture and broad community arts culture." },
  { place: "Kyle", title: "Pie Capital of Texas", legislature: "87th Legislature", resolution: "S.C.R. 22", designatedYear: 2021, sourceUrl: "https://capitol.texas.gov/tlodocs/87R/billtext/html/SC00022F.htm", context: "Kyle's pie festivals, business initiatives and community branding led to the official statewide designation." },
];

const description = "A source-backed guide to official Texas 'capital' place designations created by the Texas Legislature, including Cowboy, Fishing, Pie, Garden, Peanut and other capitals.";
const canonicalPath = "/texas-capital-designations";
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);

export const Route = createFileRoute("/texas-capital-designations")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Official Texas Capital Designations — Cities & Counties Named by the Legislature",
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "CollectionPage", "@id": `${pageUrl}#page`, url: pageUrl, name: "Official Texas Capital Designations", description },
        { "@type": "ItemList", "@id": `${pageUrl}#list`, name: "Current verified Texas capital designations", numberOfItems: currentDesignations.length, itemListElement: currentDesignations.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: `${item.place} — ${item.title}`, url: item.sourceUrl })) },
        { "@type": "BreadcrumbList", "@id": `${pageUrl}#breadcrumb`, itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") },
          { "@type": "ListItem", position: 2, name: "Texas History", item: absoluteUrl(texasDefinedBrand, "/texas-history") },
          { "@type": "ListItem", position: 3, name: "Official Texas Capital Designations", item: pageUrl },
        ] },
      ],
    })],
  }),
  component: TexasCapitalDesignationsPage,
});

function TexasCapitalDesignationsPage() {
  return (
    <main>
      <section className="border-b border-border bg-muted/30 py-16 sm:py-24">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link><span className="mx-2">/</span><Link to="/texas-history" className="hover:text-foreground">Texas History</Link><span className="mx-2">/</span><span className="text-foreground">Official Capital Designations</span>
          </nav>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Official place designations</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">Texas has more than one kind of capital</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Austin is the state capital. But the Texas Legislature also gives cities and counties official specialty titles — Cowboy Capital, Fishing Capital, Pie Capital and many more. This guide keeps those legislative place designations separate from the official state-symbol directory and links every listing back to its legislative source.</p>
          <div className="mt-10 grid max-w-3xl grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
            <Stat value={String(currentDesignations.length)} label="Verified listings" />
            <Stat value="10 years" label="Typical statutory term" />
            <Stat value="TLO" label="Primary source" />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Current verified directory</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">Legislatively designated capitals of Texas</h2>
            <p className="mt-5 leading-7 text-muted-foreground">The entries below are limited to designations verified against Texas Legislature Online enrolled-resolution records and still within their statutory 10-year designation window as of 2026. This is a growing source-backed directory, not a list of unofficial tourism slogans.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {currentDesignations.map((item) => (
              <article key={`${item.resolution}-${item.place}`} className="flex h-full flex-col border border-border bg-card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{item.place}</p>
                <h3 className="mt-3 font-display text-2xl leading-tight">{item.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-6 text-muted-foreground">{item.context}</p>
                <div className="mt-6 border-t border-border pt-4 text-sm">
                  <p><strong>{item.resolution}</strong> · {item.legislature} · {item.designatedYear}</p>
                  <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block font-semibold text-primary underline-offset-4 hover:underline">Read the enrolled resolution ↗</a>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-muted/25 py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Why the expiration matters</p>
              <h2 className="mt-3 font-display text-4xl">These titles are official — but they are not necessarily permanent</h2>
              <p className="mt-5 leading-7 text-muted-foreground">Texas Government Code §391.003 provides for many official place designations to expire on the tenth anniversary of the designation. That means an old resolution can be historically real without still being a current official title. TexasDefined therefore separates current, source-verified designations from expired or purely promotional nicknames.</p>
              <p className="mt-4 leading-7 text-muted-foreground">The Legislature can also renew or replace a designation. When that happens, the newer enacted resolution controls this directory. We use enrolled resolutions wherever available and do not treat a filed bill, committee hearing or tourism slogan as an enacted designation.</p>
            </div>
            <aside className="border border-border bg-background p-7">
              <h2 className="font-display text-3xl">Related TexasDefined guides</h2>
              <div className="mt-6 divide-y divide-border border-y border-border">
                <RelatedLink to="/texas-symbols" title="Official Texas Symbols" text="The state's official bird, flower, foods, animals, cultural symbols and more." />
                <RelatedLink to="/texas-history" title="Texas History" text="The people, places and turning points behind these local identities." />
                <RelatedLink to="/explore/small-towns" title="Texas Small Towns" text="Turn some of the official designations into a road-trip starting point." />
                <RelatedLink to="/things-unique-to-texas" title="Things Unique to Texas" text="Food, brands, places, traditions and cultural details that feel distinctly Texan." />
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return <div className="bg-background p-5"><p className="font-display text-3xl">{value}</p><p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">{label}</p></div>;
}

function RelatedLink({ to, title, text }: { to: string; title: string; text: string }) {
  return <Link to={to} className="group block py-5"><span className="font-semibold group-hover:text-primary">{title} →</span><span className="mt-1 block text-sm leading-6 text-muted-foreground">{text}</span></Link>;
}
