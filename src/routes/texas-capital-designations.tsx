import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CAPITAL_STATUS_LABELS, OFFICIAL_CAPITALS, TSLAC_CAPITAL_SOURCE, type CapitalStatus } from "@/data/texas-capital-designations-official";

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

// Current listings below are backed by enacted/enrolled Texas Legislature Online resolutions.
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

const description = "Search 94 Texas legislative place designations, with official citations, statutory status distinctions and the pre-September 2001 exemption explained.";
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
        { "@type": "ItemList", "@id": `${pageUrl}#list`, name: "Featured Texas capital designations within their ten-year terms", numberOfItems: currentDesignations.length, itemListElement: currentDesignations.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: `${item.place} — ${item.title}`, url: item.sourceUrl })) },
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
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<CapitalStatus | "all">("all");
  const filtered = OFFICIAL_CAPITALS.filter((item) => {
    const matchesSearch = `${item.title} ${item.place} ${item.resolution} ${item.year}`.toLowerCase().includes(search.trim().toLowerCase());
    return matchesSearch && (statusFilter === "all" || item.status === statusFilter);
  });
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
            <Stat value={String(OFFICIAL_CAPITALS.length)} label="Adopted designations" />
            <Stat value={String(currentDesignations.length)} label="Featured current records" />
            <Stat value="TSLAC" label="Official registry" />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Current verified directory</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">Legislatively designated capitals of Texas</h2>
            <p className="mt-5 leading-7 text-muted-foreground">These nine featured examples link directly to enrolled legislative resolutions. They are not the complete register: the searchable directory below includes all 94 entries published by the Texas State Library and Archives Commission through the 89th Legislature. Historical records and legally current titles must not be confused.</p>
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
                  {item.place === "Galveston" ? <Link to="/events/mardi-gras" className="mt-3 block font-semibold text-primary underline-offset-4 hover:underline">See the Texas Mardi Gras calendar and 2027 visitor guides →</Link> : null}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-16 sm:py-20" aria-labelledby="full-capital-register">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Official state library register</p>
          <h2 id="full-capital-register" className="mt-3 font-display text-4xl sm:text-5xl">Search all {OFFICIAL_CAPITALS.length} adopted titles</h2>
          <p className="mt-4 max-w-4xl leading-7 text-muted-foreground">The State Library and Archives Commission maintains the official adopted-designations list. It includes historic resolutions that should not automatically be described as current law. The statuses below interpret only the ten-year rule and its pre-September 1, 2001 exception; the 2001 entries all came from the 77th Regular Session, which adjourned before September 1, so those entries also qualify for the statutory exception.</p>
          <p className="mt-4 max-w-4xl leading-7 text-muted-foreground">Source reconciliation: the state-library list labels San Angelo's 2021 Visual Arts Capital resolution “H.R. 24,” but the enacted 87th Legislature resolution is <a href="https://capitol.texas.gov/tlodocs/87R/billtext/html/HC00024F.htm" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">H.C.R. 24</a>, signed by the governor. The searchable table follows the enrolled act; the state-library compilation remains our inventory source. The <a href="https://lrl.texas.gov/sessions/sessionSnapshot.cfm?legSession=77-0" className="font-semibold text-primary underline" target="_blank" rel="noopener noreferrer">Legislative Reference Library confirms</a> that the 77th Regular Session ended May 28, 2001, resolving the pre-September cutoff for its 2001 entries.</p>
          <p className="mt-4 text-sm"><a className="font-semibold text-primary underline-offset-4" href={TSLAC_CAPITAL_SOURCE} target="_blank" rel="noopener noreferrer">Verify the complete state-library register and original resolution references ↗</a></p>
          <div className="mt-8 grid gap-4 md:grid-cols-[minmax(0,1fr)_17rem]">
            <label className="text-sm font-semibold" htmlFor="capital-filter">Search by title, place, resolution or year
              <input id="capital-filter" value={search} onChange={(event) => setSearch(event.target.value)} type="search" placeholder="Try Fort Worth, ice cream, H.C.R. 80…" className="mt-2 block min-h-11 w-full border border-border bg-background px-4 py-2 font-normal" />
            </label>
            <label className="text-sm font-semibold" htmlFor="capital-status">Ten-year designation status
              <select id="capital-status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as CapitalStatus | "all")} className="mt-2 block min-h-11 w-full border border-border bg-background px-4 py-2 font-normal">
                <option value="all">All adopted designations</option>
                {Object.entries(CAPITAL_STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </label>
          </div>
          <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">Showing {filtered.length} of {OFFICIAL_CAPITALS.length} official register entries.</p>
          <div className="mt-6 overflow-x-auto border border-border">
            <table className="min-w-[48rem] w-full text-left text-sm">
              <caption className="sr-only">Texas legislative capital and place designations, official citations and expiration treatment</caption>
              <thead className="bg-muted/40"><tr><th scope="col" className="px-4 py-3">Designation</th><th scope="col" className="px-4 py-3">Place</th><th scope="col" className="px-4 py-3">Resolution and year</th><th scope="col" className="px-4 py-3">Statutory treatment</th></tr></thead>
              <tbody className="divide-y divide-border">{filtered.map((item) => <tr key={`${item.title}-${item.place}-${item.year}`} className="align-top"><th scope="row" className="px-4 py-4 font-semibold">{item.title}</th><td className="px-4 py-4">{item.place}</td><td className="px-4 py-4 tabular-nums">{item.resolution} · {item.year}</td><td className="px-4 py-4 text-muted-foreground">{CAPITAL_STATUS_LABELS[item.status]}</td></tr>)}</tbody>
            </table>
            {!filtered.length && <p className="p-5 text-sm">No entries match those filters. Clear the search or choose another status.</p>}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="border border-border p-6"><h3 className="font-display text-2xl">Before September 1, 2001</h3><p className="mt-3 leading-7 text-muted-foreground">The ten-year expiration law expressly exempts resolutions approved before this date. An older adopted title is not automatically expired merely because it predates the modern statute.</p></div>
            <div className="border border-border p-6"><h3 className="font-display text-2xl">After August 31, 2001</h3><p className="mt-3 leading-7 text-muted-foreground">Ten-year expiration applies unless a later valid act renews the title. The official register lists its 2001 entries as resolutions from the 77th Regular Session, which ended May 28, 2001, before the September 1 cutoff.</p></div>
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-muted/25 py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Why the expiration matters</p>
              <h2 className="mt-3 font-display text-4xl">These titles are official — but they are not necessarily permanent</h2>
              <p className="mt-5 leading-7 text-muted-foreground">Texas Government Code §391.003 establishes a ten-year expiration for modern designations, but expressly exempts resolutions approved before September 1, 2001. Older exempt resolutions stay in the official register. For later resolutions the ten-year rule applies, and an entry may be historically real even when its current term has ended.</p>
              <p className="mt-4 leading-7 text-muted-foreground">The Legislature can also renew or replace a designation. When that happens, the newer enacted resolution controls this directory. For featured modern examples we link enrolled resolutions directly. For the complete register we use the Texas State Library and Archives Commission’s official record of adopted titles; a filed bill, hearing or marketing slogan alone does not establish an official designation.</p>
            </div>
            <aside className="border border-border bg-background p-7">
              <h2 className="font-display text-3xl">Related TexasDefined guides</h2>
              <div className="mt-6 divide-y divide-border border-y border-border">
                <RelatedLink to="/texas-symbols" title="Official Texas Symbols" text="The state's official bird, flower, foods, animals, cultural symbols and more." />
                <RelatedLink to="/texas-history" title="Texas History" text="The people, places and turning points behind these local identities." />
                <RelatedLink to="/events/mardi-gras" title="Mardi Gras in Texas" text="The 2027 statewide parade guide, including Galveston, officially named Mardi Gras Capital of Texas." />
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
