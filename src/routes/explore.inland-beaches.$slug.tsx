import { createFileRoute, Link, notFound } from"@tanstack/react-router";
import { texasDefinedBrand } from"@/brand/texasdefined";
import { Container } from"@/components/layout/Container";

import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from"@/lib/seo";

export const Route = createFileRoute("/explore/inland-beaches/$slug")({
  loader: async ({ params }) => {
    const { inlandBeachBySlug, inlandSwimmingBeaches } = await import("@/data/inland-beach-authority");
    const beach = inlandBeachBySlug(params.slug);
    if (!beach) throw notFound();
    const otherBeaches = inlandSwimmingBeaches.filter((item) => item.slug !== beach.slug && (item.lake === beach.lake || item.county === beach.county)).slice(0, 4);
    const { inlandBeachPhotos } = await import("@/data/inland-beach-photos");
    return { beach, otherBeaches, photo: inlandBeachPhotos[beach.slug] ?? null };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const beach = loaderData.beach;
    const canonicalPath = `/explore/inland-beaches/${beach.slug}`;
    const url = absoluteUrl(texasDefinedBrand, canonicalPath);
    const title = `${beach.name}: Visitor Guide`;
    const description = `${beach.name} on ${beach.lake}: verified swim-beach access, ${beach.county} County trip planning, managing-agency source and lake safety.`;
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title, description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
"@context":"https://schema.org",
"@graph": [
          {
"@type":"TouristAttraction",
"@id": `${url}#beach`,
            url,
            name: beach.name,
            description: beach.experience,
            containedInPlace: {"@type":"Place", name: beach.lake },
            address: {"@type":"PostalAddress", addressLocality: beach.nearestTown, addressRegion:"TX", addressCountry:"US" },
            subjectOf: {"@type":"CreativeWork", url: beach.officialUrl },
          },
          {
"@type":"BreadcrumbList",
            itemListElement: [
              {"@type":"ListItem", position: 1, name:"Explore Texas", item: absoluteUrl(texasDefinedBrand,"/explore") },
              {"@type":"ListItem", position: 2, name:"Texas Inland Beaches", item: absoluteUrl(texasDefinedBrand,"/explore/inland-beaches") },
              {"@type":"ListItem", position: 3, name: beach.name, item: url },
            ],
          },
        ],
      })],
    };
  },
  component: InlandBeachAuthorityPage,
});

function InlandBeachAuthorityPage() {
  const { beach, otherBeaches, photo } = Route.useLoaderData();
  const countyPaths = beach.county.split(" /").map((county) => ({
    name: county.trim(),
    slug: county.trim().toLowerCase().replace(/\s+/g,"-"),
  }));
  return <main>
    <Container className="py-12 sm:py-16">
      <nav aria-label="Breadcrumbs" className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <Link to="/explore" className="hover:text-primary">Explore</Link><span aria-hidden>›</span>
        <Link to="/explore/inland-beaches" className="hover:text-primary">Inland beaches</Link><span aria-hidden>›</span>
        <span>{beach.name}</span>
      </nav>
      <header className="mt-8 max-w-5xl border-b border-border pb-10">
        <p className="eyebrow text-primary">{beach.lake} · {beach.county} County · Source reviewed {beach.checkedAt}</p>
        <h1 className="mt-4 font-display text-5xl leading-tight sm:text-7xl">{beach.name}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{beach.experience}</p>
        <div className="mt-6 flex flex-wrap gap-5 text-sm font-semibold">
          <a href={beach.officialUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Official visitor source →</a>
          <Link to="/explore/inland-beaches" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Compare other lake beaches →</Link>
        </div>
      </header>
      {beach.statusNotice && <section className="mt-7 border-l-2 border-foreground bg-surface px-5 py-5" aria-label="Important current beach access warning">
        <h2 className="font-semibold">Swimming access alert — verify before traveling</h2>
        <p className="mt-2 text-sm leading-7">{beach.statusNotice}</p>
        {beach.statusUrl && <a href={beach.statusUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold underline underline-offset-4">See the official current lake-status report →</a>}
      </section>}
      {photo && <figure className="mt-8 border border-border">
        <img src={photo.src} alt={photo.alt} width={1280} height={820} loading="lazy" decoding="async" className="aspect-video w-full object-cover" />
        <figcaption className="p-4 text-xs leading-6 text-muted-foreground">
          {photo.caption} Photo: {photo.photographer} · <a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Original image</a> · <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">CC BY 4.0 license</a>. No alterations claimed.
        </figcaption>
      </figure>}
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="min-w-0">
          <section aria-labelledby="beach-quick-answer">
            <p className="eyebrow text-primary">At a glance</p>
            <h2 id="beach-quick-answer" className="mt-2 font-display text-3xl">Is this a designated swimming beach?</h2>
            <p className="mt-4 text-base leading-8">{beach.evidence} This is evidence of a specific swimming destination; it does not mean every shoreline around {beach.lake} is open to swimming. The latest agency notice, on-site signs, and swimming-area boundaries control your visit.</p>
          </section>
          <section aria-labelledby="beach-getting-there" className="mt-10 border-t border-border pt-8">
            <p className="eyebrow text-primary">Access, parking &amp; admission</p>
            <h2 id="beach-getting-there" className="mt-2 font-display text-3xl">How to reach {beach.name}</h2>
            <p className="mt-4 text-base leading-8">{beach.arrival}</p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">Do not assume day-use fees, campsite reservations or seasonal operating dates remain unchanged. Use the linked managing agency immediately before departure for current parking, hours, accessibility and any closure instructions.</p>
          </section>
          <section aria-labelledby="beach-water-safety" className="mt-10 border-t border-border pt-8">
            <p className="eyebrow text-primary">Swimming conditions</p>
            <h2 id="beach-water-safety" className="mt-2 font-display text-3xl">Water safety and swimming rules</h2>
            <p className="mt-4 text-base leading-8">{beach.safety}</p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">Freshwater hazards differ from surf and rip currents: watch for changing depths, lake currents, underwater obstructions, storm runoff and boat traffic. There is no substitute for verifying today's park alerts and local water-quality guidance. Keep children within reach and use a properly fitted life jacket when appropriate.</p>
          </section>
          <section aria-labelledby="beach-trip-planning" className="mt-10 border-t border-border pt-8">
            <p className="eyebrow text-primary">Plan the rest of the day</p>
            <h2 id="beach-trip-planning" className="mt-2 font-display text-3xl">What to do near the beach</h2>
            <p className="mt-4 text-base leading-8">{beach.nearby}</p>
            <div className="mt-5 flex flex-wrap gap-6 text-sm font-semibold">
              {countyPaths.map((county) => <a key={county.slug} href={`/county/${county.slug}`} className="underline decoration-primary/40 underline-offset-4 hover:text-primary">{county.name} County guide →</a>)}
              <Link to="/explore/lakes-rivers" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Texas lakes &amp; rivers →</Link>
            </div>
          </section>
          <section aria-labelledby="beach-faq" className="mt-10 border-t border-border pt-8">
            <p className="eyebrow text-primary">Quick answers</p>
            <h2 id="beach-faq" className="mt-2 font-display text-3xl">Frequently asked questions</h2>
            <dl className="mt-5 divide-y divide-border">
              <div className="py-4"><dt className="font-semibold">Where is {beach.name}?</dt><dd className="mt-2 text-sm leading-7 text-muted-foreground">At {beach.lake}, near {beach.nearestTown} in {beach.county} County, Texas. Use the managing agency's map for the exact swimming entrance.</dd></div>
              <div className="py-4"><dt className="font-semibold">Is it open for swimming today?</dt><dd className="mt-2 text-sm leading-7 text-muted-foreground">We cannot confirm live swimming access from the existence of this guide. Check {beach.managingAgency} for active alerts, posted hours and any flood, maintenance or water-quality closure.</dd></div>
              <div className="py-4"><dt className="font-semibold">Can I swim anywhere in {beach.lake}?</dt><dd className="mt-2 text-sm leading-7 text-muted-foreground">No. A documented swim beach does not establish permission to swim from boat ramps, docks or other shorelines. Follow on-site rules and designated swimming boundaries.</dd></div>
            </dl>
          </section>
        </div>
        <aside className="space-y-6">
          <div className="border-t-2 border-foreground pt-5">
            <h2 className="font-display text-2xl">Verified visitor source</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{beach.evidence}</p>
            <a className="mt-4 block text-sm font-semibold underline decoration-primary/40 underline-offset-4 hover:text-primary" href={beach.officialUrl} target="_blank" rel="noopener noreferrer">View {beach.managingAgency} information →</a>
            <p className="mt-4 text-xs text-muted-foreground">Research date: {beach.checkedAt}. This is not a live swimming-status feed.</p>
          </div>
          {otherBeaches.length > 0 && <div className="border-t border-border pt-5">
            <h2 className="font-display text-2xl">Compare nearby beaches</h2>
            <ul className="mt-4 space-y-4">
              {otherBeaches.map((other) => <li key={other.slug}><Link to="/explore/inland-beaches/$slug" params={{ slug: other.slug }} className="text-sm font-semibold underline decoration-primary/40 underline-offset-4 hover:text-primary">{other.name}</Link></li>)}
            </ul>
          </div>}
        </aside>
      </div>
    </Container>
  </main>;
}
