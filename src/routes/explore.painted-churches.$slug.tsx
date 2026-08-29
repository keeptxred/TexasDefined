import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { PaintedChurchResearchDossier } from "@/components/editorial/PaintedChurchResearchDossier";
import { Container } from "@/components/layout/Container";
import { canonicalPaintedChurchProfileBySlug } from "@/data/painted-church-profile-index";
import { expandedPaintedChurchBySlug, expandedPaintedChurches } from "@/data/painted-churches-expanded";
import { paintedChurchGalleryBySlug } from "@/data/painted-church-gallery";
import { buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/explore/painted-churches/$slug")({
  loader: ({ params }) => {
    const church = expandedPaintedChurchBySlug(params.slug);
    if (!church) throw notFound();
    const profile = canonicalPaintedChurchProfileBySlug(params.slug);
    return { church, profile };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Painted church unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const { church, profile } = loaderData;
    const canonicalPath = `/explore/painted-churches/${params.slug}`;
    const url = `${siteUrl}${canonicalPath}`;
    const churchSchema = {
      "@type": "Church",
      "@id": `${url}#church`,
      name: church.name,
      description: profile?.quickAnswer ?? church.summary,
      url,
      address: {
        "@type": "PostalAddress",
        addressLocality: church.city,
        addressRegion: "TX",
        addressCountry: "US",
        ...(church.address ? { streetAddress: church.address } : {}),
      },
      ...(profile?.foundedYear ? { foundingDate: String(profile.foundedYear) } : {}),
      ...(church.image ? { image: church.image.src } : {}),
    };
    const breadcrumbSchema = {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Explore", item: `${siteUrl}/explore` },
        { "@type": "ListItem", position: 3, name: "Painted Churches", item: `${siteUrl}/explore/painted-churches` },
        { "@type": "ListItem", position: 4, name: church.shortName, item: url },
      ],
    };
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: `${church.shortName} | History, Architecture & Paintings`,
        description: profile
          ? `${church.shortName}: history, architecture, age, artists, interior paintings, preservation, location and visitor planning.`
          : `${church.summary} Location, designation, visitor planning, sources and photography for ${church.shortName}.`,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": [churchSchema, breadcrumbSchema] }) }],
    };
  },
  notFoundComponent: () => (
    <Container className="py-24">
      <p className="eyebrow text-primary">Painted Churches of Texas</p>
      <h1 className="mt-3 font-display text-4xl">That church guide isn’t available.</h1>
      <p className="mt-4 text-muted-foreground"><Link to="/explore/painted-churches" className="border-b border-primary text-primary">Return to the painted churches guide.</Link></p>
    </Container>
  ),
  component: PaintedChurchDetail,
});

function PaintedChurchDetail() {
  const { church, profile } = Route.useLoaderData();
  const gallery = paintedChurchGalleryBySlug(church.slug);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(church.address ?? `${church.name}, ${church.city}, Texas`)}`;
  const related = expandedPaintedChurches
    .filter((candidate) => candidate.slug !== church.slug)
    .sort((a, b) => {
      const aCluster = church.schulenburgCluster && a.schulenburgCluster ? 0 : 1;
      const bCluster = church.schulenburgCluster && b.schulenburgCluster ? 0 : 1;
      if (aCluster !== bCluster) return aCluster - bCluster;
      if (a.county === church.county && b.county !== church.county) return -1;
      if (b.county === church.county && a.county !== church.county) return 1;
      return a.city.localeCompare(b.city);
    })
    .slice(0, 3);
  const buildingAge = profile?.builtYear ? new Date().getFullYear() - profile.builtYear : undefined;

  return (
    <main>
      <Container className="pt-10 sm:pt-14">
        <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-foreground">Front page</Link></li>
            <li aria-hidden>·</li>
            <li><Link to="/explore" className="hover:text-foreground">Explore</Link></li>
            <li aria-hidden>·</li>
            <li><Link to="/explore/painted-churches" className="hover:text-foreground">Painted Churches</Link></li>
          </ol>
        </nav>
      </Container>

      <section className="mt-5 border-y border-border bg-ink text-ink-foreground">
        <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,.72fr)] lg:items-center">
          <div>
            <p className="eyebrow text-ink-foreground/65">{church.city} · {church.county} County</p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{church.name}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/80">{church.summary}</p>
            <div className="mt-7 flex flex-wrap gap-2 text-[0.68rem] uppercase tracking-[0.12em] text-ink-foreground/65">
              {church.nationalRegister?.multipleProperty && <span className="border border-ink-foreground/30 px-2 py-1">NR decorative interior</span>}
              {church.schulenburgCluster && <span className="border border-ink-foreground/30 px-2 py-1">Schulenburg cluster</span>}
              {church.recordedTexasHistoricLandmark && <span className="border border-ink-foreground/30 px-2 py-1">Recorded Texas Historic Landmark</span>}
            </div>
          </div>
          {church.image ? (
            <figure>
              <img src={church.image.src} alt={church.image.alt} width={church.image.width} height={church.image.height} fetchPriority="high" decoding="async" className="aspect-[4/3] w-full object-cover" />
              <figcaption className="mt-3 text-xs leading-5 text-ink-foreground/60">
                {church.image.credit} · {church.image.license} · <a href={church.image.sourceUrl} target="_blank" rel="noreferrer" className="border-b border-ink-foreground/40">source</a>
              </figcaption>
            </figure>
          ) : gallery[0] ? (
            <figure>
              <img src={gallery[0].src} alt={gallery[0].alt} width={gallery[0].width} height={gallery[0].height} fetchPriority="high" decoding="async" className="aspect-[4/3] w-full object-cover" />
              <figcaption className="mt-3 text-xs leading-5 text-ink-foreground/60">
                {gallery[0].credit} · {gallery[0].license} · <a href={gallery[0].sourceUrl} target="_blank" rel="noreferrer" className="border-b border-ink-foreground/40">source</a>
              </figcaption>
            </figure>
          ) : (
            <div className="flex aspect-[4/3] items-end border border-ink-foreground/20 p-7">
              <div><p className="eyebrow text-ink-foreground/55">Texas painted church</p><p className="mt-3 font-display text-4xl">{church.city}</p></div>
            </div>
          )}
        </Container>
      </section>

      <Container className="grid gap-14 py-14 sm:py-18 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,.65fr)]">
        <div>
          {profile && (
            <>
              <section aria-labelledby="quick-answer" className="border-t-2 border-foreground pt-8">
                <p className="eyebrow text-primary">Quick answer</p>
                <h2 id="quick-answer" className="mt-3 font-display text-4xl">What makes {church.shortName} special?</h2>
                <p className="mt-6 max-w-3xl text-base leading-8 text-foreground/90">{profile.quickAnswer}</p>
              </section>

              <section aria-labelledby="at-a-glance" className="mt-14 border-t border-border pt-8">
                <p className="eyebrow text-primary">At a glance</p>
                <h2 id="at-a-glance" className="mt-3 font-display text-3xl">The church in facts</h2>
                <dl className="mt-8 grid border-y border-border sm:grid-cols-2">
                  {profile.builtYear && <div className="border-b border-border py-5 sm:border-r sm:pr-6"><dt className="eyebrow text-muted-foreground">Present church built</dt><dd className="mt-2 text-base">{profile.builtYear}{buildingAge !== undefined ? ` · about ${buildingAge} years old` : ""}</dd></div>}
                  {profile.paintedYear && <div className="border-b border-border py-5 sm:pl-6"><dt className="eyebrow text-muted-foreground">Interior painted</dt><dd className="mt-2 text-base">{profile.paintedYear}</dd></div>}
                  {profile.architecture && <div className="border-b border-border py-5 sm:border-r sm:pr-6"><dt className="eyebrow text-muted-foreground">Architecture</dt><dd className="mt-2 text-base">{profile.architecture}</dd></div>}
                  {profile.architect && <div className="border-b border-border py-5 sm:pl-6"><dt className="eyebrow text-muted-foreground">Architect</dt><dd className="mt-2 text-base">{profile.architect}</dd></div>}
                  {profile.builder && <div className="border-b border-border py-5 sm:border-r sm:pr-6"><dt className="eyebrow text-muted-foreground">Builder</dt><dd className="mt-2 text-base">{profile.builder}</dd></div>}
                  {profile.artists?.length ? <div className="border-b border-border py-5 sm:pl-6"><dt className="eyebrow text-muted-foreground">Interior artists</dt><dd className="mt-2 text-base">{profile.artists.join(" and ")}</dd></div> : null}
                  {profile.heritage && <div className="py-5 sm:col-span-2"><dt className="eyebrow text-muted-foreground">Cultural background</dt><dd className="mt-2 text-base leading-7">{profile.heritage}</dd></div>}
                </dl>
                <dl className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                  {profile.facts.map((fact) => <div key={`${fact.label}-${fact.value}`}><dt className="eyebrow text-muted-foreground">{fact.label}</dt><dd className="mt-2 text-sm leading-6">{fact.value}</dd></div>)}
                </dl>
              </section>

              <section aria-labelledby="history" className="mt-14 border-t border-border pt-8">
                <p className="eyebrow text-primary">History</p>
                <h2 id="history" className="mt-3 font-display text-4xl">How this church came to be</h2>
                <div className="mt-8 space-y-10">
                  {profile.history.map((section) => <section key={section.heading}><h3 className="font-display text-3xl">{section.heading}</h3><div className="mt-4 space-y-4">{section.paragraphs.map((paragraph) => <p key={paragraph} className="max-w-3xl text-base leading-8 text-muted-foreground">{paragraph}</p>)}</div></section>)}
                </div>
              </section>

              <section aria-labelledby="paintings" className="mt-14 border-t border-border pt-8">
                <p className="eyebrow text-primary">Inside the painted church</p>
                <h2 id="paintings" className="mt-3 font-display text-4xl">What the paintings are actually showing</h2>
                <div className="mt-8 space-y-10">
                  {profile.paintings.map((section) => <section key={section.heading}><h3 className="font-display text-3xl">{section.heading}</h3><div className="mt-4 space-y-4">{section.paragraphs.map((paragraph) => <p key={paragraph} className="max-w-3xl text-base leading-8 text-muted-foreground">{paragraph}</p>)}</div></section>)}
                </div>
              </section>

              {profile.preservation?.length ? <section aria-labelledby="preservation" className="mt-14 border-t border-border pt-8">
                <p className="eyebrow text-primary">Preservation</p>
                <h2 id="preservation" className="mt-3 font-display text-4xl">How the interior survived</h2>
                <div className="mt-8 space-y-10">{profile.preservation.map((section) => <section key={section.heading}><h3 className="font-display text-3xl">{section.heading}</h3><div className="mt-4 space-y-4">{section.paragraphs.map((paragraph) => <p key={paragraph} className="max-w-3xl text-base leading-8 text-muted-foreground">{paragraph}</p>)}</div></section>)}</div>
              </section> : null}
            </>
          )}

          {gallery.length ? (
            <section aria-labelledby="photo-gallery" className="mt-14 border-t border-border pt-8">
              <p className="eyebrow text-primary">Rights-verified photography</p>
              <h2 id="photo-gallery" className="mt-3 font-display text-4xl">See the church in detail</h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Every image below is church-specific and includes its creator, reuse license and original source page.</p>
              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                {gallery.map((image) => (
                  <figure key={image.sourceUrl} className="border-t border-border pt-5">
                    <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
                    <figcaption className="mt-3 text-xs leading-6 text-muted-foreground">
                      {image.caption} <span className="block mt-1">{image.credit} · {image.license} · <a href={image.sourceUrl} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">source & license</a></span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ) : null}

          <PaintedChurchResearchDossier slug={church.slug} schulenburgCluster={church.schulenburgCluster} />

          <section aria-labelledby="why-it-matters" className={`${profile ? "mt-14 border-t border-border" : "border-t-2 border-foreground"} pt-8`}>
            <p className="eyebrow text-primary">Why it matters</p>
            <h2 id="why-it-matters" className="mt-3 font-display text-4xl">Part of the painted-church story</h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-foreground/90">{church.significance}</p>
          </section>

          <section aria-labelledby="visit" className="mt-14 border-t border-border pt-8">
            <p className="eyebrow text-primary">Plan the visit</p>
            <h2 id="visit" className="mt-3 font-display text-3xl">What to know before you go</h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">{church.visitNote}</p>
            {profile?.visitorNotes?.length ? <ul className="mt-5 max-w-3xl list-disc space-y-2 pl-5 text-base leading-7 text-muted-foreground">{profile.visitorNotes.map((note) => <li key={note}>{note}</li>)}</ul> : null}
            <dl className="mt-8 grid border-y border-border sm:grid-cols-2">
              <div className="border-b border-border py-5 sm:border-r sm:pr-6"><dt className="eyebrow text-muted-foreground">Community</dt><dd className="mt-2 text-base">{church.city}, Texas</dd></div>
              <div className="border-b border-border py-5 sm:pl-6"><dt className="eyebrow text-muted-foreground">County</dt><dd className="mt-2 text-base">{church.county} County</dd></div>
              <div className="border-b border-border py-5 sm:border-r sm:pr-6"><dt className="eyebrow text-muted-foreground">Tradition</dt><dd className="mt-2 text-base">{church.denomination}</dd></div>
              <div className="border-b border-border py-5 sm:pl-6"><dt className="eyebrow text-muted-foreground">Location</dt><dd className="mt-2 text-base">{church.address ?? `${church.city}, Texas`}</dd></div>
              {church.nationalRegister && <div className="py-5 sm:col-span-2"><dt className="eyebrow text-muted-foreground">National Register</dt><dd className="mt-2 text-base leading-7">Listed {church.nationalRegister.listed} · Ref. {church.nationalRegister.referenceNumber}{church.nationalRegister.multipleProperty ? " · Churches with Decorative Interior Painting TR" : ""}</dd></div>}
            </dl>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <a href={mapUrl} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">Open in Maps</a>
              <a href={church.sourceUrl} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">Primary historic source</a>
              {church.secondarySourceUrl && <a href={church.secondarySourceUrl} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">Visitor / supporting source</a>}
            </div>
          </section>

          {profile?.sources?.length ? <section aria-labelledby="sources" className="mt-14 border-t border-border pt-8">
            <p className="eyebrow text-primary">Sources</p>
            <h2 id="sources" className="mt-3 font-display text-3xl">Where the history comes from</h2>
            <ul className="mt-6 space-y-3 text-sm">{profile.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">{source.label}</a></li>)}</ul>
          </section> : null}

          <section aria-labelledby="respect" className="mt-14 border-t border-border pt-8">
            <p className="eyebrow text-primary">Visit respectfully</p>
            <h2 id="respect" className="mt-3 font-display text-3xl">The building is historic. The congregation is current.</h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
              Treat posted hours as guidance rather than a guarantee. Do not interrupt Mass, services, funerals, weddings or private parish events. Keep voices low, follow photography restrictions, avoid flash when requested, and leave donation boxes, furnishings and devotional areas exactly as you found them.
            </p>
          </section>
        </div>

        <aside className="space-y-8">
          <section className="border-t-2 border-foreground pt-6">
            <p className="eyebrow text-primary">Build the day</p>
            <h2 className="mt-3 font-display text-3xl">Keep this stop in context</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">Use the collection page for the Schulenburg route, statewide church list and current access guidance.</p>
            <Link to="/explore/painted-churches" className="mt-5 inline-block border-b border-primary pb-1 text-sm text-primary">Painted Churches route guide</Link>
            <br />
            <Link to="/explore/trip-planner" className="mt-4 inline-block border-b border-primary pb-1 text-sm text-primary">Texas Trip Planner</Link>
          </section>

          <section className="border-t border-border pt-6">
            <p className="eyebrow text-muted-foreground">Nearby in the collection</p>
            <div className="mt-5 divide-y divide-border">
              {related.map((candidate) => (
                <article key={candidate.slug} className="py-5 first:pt-0">
                  <p className="eyebrow text-primary">{candidate.city} · {candidate.county} County</p>
                  <h3 className="mt-2 font-display text-2xl leading-tight"><Link to="/explore/painted-churches/$slug" params={{ slug: candidate.slug }} className="hover:text-primary">{candidate.shortName}</Link></h3>
                </article>
              ))}
            </div>
          </section>

          <section className="border-t border-border pt-6">
            <p className="eyebrow text-muted-foreground">Source check</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Historic and visitor information checked {new Date(`${church.sourceCheckedAt}T12:00:00`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}. Re-check time-sensitive access before traveling.</p>
          </section>
        </aside>
      </Container>
    </main>
  );
}
