import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { historicChurchBySlug, historicChurches, historicChurchImageSrc } from "@/data/historic-churches";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";
import { recoverOrHideImage } from "@/lib/image-fallback";

const root = "/explore/historic-churches";
export const Route = createFileRoute("/explore/historic-churches/$slug")({
  loader: ({params}) => {
    const church = historicChurchBySlug(params.slug);
    if(!church) throw notFound();
    return church;
  },
  head: ({loaderData:church,params}) => {
    if(!church) return { meta:[{title:"Historic church not found"},{name:"robots",content:"noindex,nofollow"}] };
    const canonicalPath = root+"/"+params.slug;
    const url = absoluteUrl(texasDefinedBrand,canonicalPath);
    const image = church.image ? historicChurchImageSrc(church.image) : undefined;
    const description = church.quickAnswer;
    return {
      meta:buildMeta(texasDefinedBrand,{
        canonicalPath,title:church.shortName+" | Texas History, Timeline & Visitor Guide",
        description,image,imageAlt:church.image?.alt,imageWidth:church.image?.width,imageHeight:church.image?.height,
        modifiedTime:"2026-10-12T15:00:00-05:00"
      }),
      links:[canonicalLink(texasDefinedBrand,canonicalPath)],
      scripts:[jsonLd({"@context":"https://schema.org","@graph":[
        {"@type":"WebPage","@id":url+"#page",name:church.shortName+" | Historic Churches of Texas",url,description,dateModified:church.reviewedOn,
          isPartOf:{"@id":absoluteUrl(texasDefinedBrand,"/")+"#website"},about:{"@id":url+"#church"},
          citation:church.sources.map(s=>s.url),breadcrumb:{"@id":url+"#breadcrumb"}},
        {"@type":"Church","@id":url+"#church",name:church.name,description:church.quickAnswer,url,hasMap:church.address?"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(church.address):undefined,
          address:{"@type":"PostalAddress",...(church.address?{streetAddress:church.address}:{}),addressLocality:church.locality,addressRegion:"TX",addressCountry:"US"},...(image?{image}:{}),
          sameAs:church.sources.filter(s=>s.type==="parish").map(s=>s.url)},
        {"@type":"BreadcrumbList","@id":url+"#breadcrumb",itemListElement:[
          {"@type":"ListItem",position:1,name:"Home",item:absoluteUrl(texasDefinedBrand,"/")},
          {"@type":"ListItem",position:2,name:"Historic Churches",item:absoluteUrl(texasDefinedBrand,root)},
          {"@type":"ListItem",position:3,name:church.shortName,item:url}
        ]}
      ]})]
    };
  },
  notFoundComponent:()=> <Container className="py-20"><h1 className="font-display text-4xl">Church guide not found</h1><p className="mt-5"><Link to="/explore/historic-churches" className="text-primary underline">Return to Historic Churches of Texas</Link></p></Container>,
  component:HistoricChurchPage
});
function HistoricChurchPage() {
  const church = Route.useLoaderData();
  const peers = historicChurches.filter(other=>other.slug!==church.slug).slice(0,4);
  return <main>
    <section className="border-b border-border bg-ink text-ink-foreground"><Container className="py-14 sm:py-20">
      <nav aria-label="Breadcrumb"><ol className="flex flex-wrap gap-2 text-xs uppercase tracking-widest text-ink-foreground/65"><li><Link to="/">Home</Link></li><li aria-hidden="true">·</li><li><Link to="/explore/historic-churches">Historic Churches</Link></li><li aria-hidden="true">·</li><li aria-current="page">{church.locality}</li></ol></nav>
      <p className="eyebrow mt-10 text-ink-foreground/70">{church.county} · {church.denomination}</p>
      <h1 className="mt-3 max-w-5xl font-display text-4xl leading-tight sm:text-6xl">{church.name}</h1>
      <p className="mt-5 max-w-4xl text-lg leading-8 text-ink-foreground/85">{church.quickAnswer}</p>
      <p className="mt-6 text-sm text-ink-foreground/65">Historical research reviewed {church.reviewedOn}. Visitor information can change; confirm with the parish.</p>
    </Container></section>
    <Container className="py-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(260px,.65fr)]">
        <div>
          {church.image ? <figure className="mb-10">
            <img className="w-full rounded-sm bg-surface object-cover" src={historicChurchImageSrc(church.image)} alt={church.image.alt} width={church.image.width} height={church.image.height} decoding="async" onError={e=>recoverOrHideImage(e.currentTarget)} />
            <figcaption className="mt-3 text-xs leading-6 text-muted-foreground">Photo: {church.image.author} · <a href={church.image.sourceUrl} target="_blank" rel="noreferrer" className="text-primary underline">Wikimedia Commons original</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer" className="underline">{church.image.license}</a>. No alterations to original indicated.</figcaption>
          </figure> : <div className="mb-10 border border-border bg-surface p-7"><p className="font-display text-2xl">Photography still needed</p><p className="mt-3 text-sm leading-7 text-muted-foreground">A church-specific, commercially reusable photograph with verified permission has not yet been secured. We do not substitute another church, hotlink copyrighted parish photos or falsely label an image public domain.</p></div>}
          {church.gallery?.length ? <section className="mb-12 grid gap-5 sm:grid-cols-2" aria-label="Licensed church photo gallery">{church.gallery.map(photo=><figure key={photo.file}><img className="w-full bg-surface object-cover" src={historicChurchImageSrc(photo)} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" onError={e=>recoverOrHideImage(e.currentTarget)} /><figcaption className="mt-2 text-xs leading-6 text-muted-foreground">{photo.author} · <a href={photo.sourceUrl} target="_blank" rel="noreferrer" className="text-primary underline">Source</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer" className="underline">{photo.license}</a></figcaption></figure>)}</section> : null}
          <section aria-labelledby="history"><p className="eyebrow text-primary">History & interpretation</p><h2 id="history" className="mt-3 font-display text-4xl">How this church became part of Texas history</h2><div className="mt-5 space-y-4 text-base leading-8 text-muted-foreground">{church.historicalContext.map((item,i)=><p key={i}>{item}</p>)}</div></section>
          <section aria-labelledby="timeline" className="mt-12 border-t border-border pt-8"><p className="eyebrow text-primary">Primary-source chronology</p><h2 id="timeline" className="mt-3 font-display text-4xl">Dates that matter</h2><ol className="mt-6 space-y-4">{church.timeline.map((point,i)=><li key={i} className="grid gap-3 border-b border-border pb-4 sm:grid-cols-[125px_1fr]"><strong className="font-display text-xl">{point.year}</strong><span className="leading-7 text-muted-foreground">{point.detail}</span></li>)}</ol></section>
          <section aria-labelledby="architecture" className="mt-12 border-t border-border pt-8"><p className="eyebrow text-primary">What survives today</p><h2 id="architecture" className="mt-3 font-display text-4xl">Building, architecture and evidence</h2><div className="mt-5 space-y-4 text-base leading-8 text-muted-foreground">{church.architecture.map((item,i)=><p key={i}>{item}</p>)}</div></section>
          <section aria-labelledby="significance" className="mt-12 border-t border-border pt-8"><h2 id="significance" className="font-display text-4xl">Why it matters</h2><ul className="mt-5 list-disc space-y-3 pl-6 text-muted-foreground">{church.significance.map((item,i)=><li key={i} className="leading-7">{item}</li>)}</ul></section>
          <section aria-labelledby="visit" className="mt-12 border-t border-border pt-8"><p className="eyebrow text-primary">Practical visitor planning</p><h2 id="visit" className="mt-3 font-display text-4xl">Before you visit</h2><ul className="mt-5 list-disc space-y-4 pl-6 text-muted-foreground">{church.visitorNotes.map((item,i)=><li key={i} className="leading-7">{item}</li>)}</ul>
            {church.address?<p className="mt-6"><a href={"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(church.address)} target="_blank" rel="noreferrer" className="border-b border-primary font-semibold text-primary">View map / directions for {church.address}</a></p>:<p className="mt-6 text-sm text-muted-foreground">Use the parish contact or historical-marker directions to confirm the precise entrance; a postal address has not been verified for this profile.</p>}
          </section>
          <section aria-labelledby="sources" className="mt-12 border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">Source trail</p><h2 id="sources" className="mt-3 font-display text-4xl">How this history was verified</h2><p className="mt-4 leading-8 text-muted-foreground">The chronology and building dates are derived from the materials below, not from automatic aggregation. Parish websites control current worship/access information. Where a statement rests on a marker transcription rather than the original record, it is labeled accordingly.</p>
            <ul className="mt-5 space-y-3">{church.sources.map((source,i)=><li key={i} className="border-b border-border pb-3"><a href={source.url} target="_blank" rel="noreferrer" className="font-semibold text-primary underline">{source.label}</a><span className="ml-3 text-xs uppercase tracking-wide text-muted-foreground">{source.type.replace("-"," ")}</span></li>)}</ul><p className="mt-5 text-sm leading-6 text-muted-foreground">Suggested citation: Texas Defined, “{church.shortName},” Historic Churches of Texas, reviewed {church.reviewedOn}, https://texasdefined.com/explore/historic-churches/{church.slug}. For original historical facts, cite the underlying record as well.</p>
          </section>
        </div>
        <aside className="space-y-8 lg:sticky lg:top-20 lg:self-start"><section className="border-t-2 border-foreground pt-5"><h2 className="font-display text-2xl">At a glance</h2><dl className="mt-5 space-y-4 text-sm"><div><dt className="font-semibold">Community</dt><dd className="mt-1 text-muted-foreground">{church.locality}, Texas</dd></div><div><dt className="font-semibold">Foundation / origins</dt><dd className="mt-1 text-muted-foreground">{church.foundation}</dd></div><div><dt className="font-semibold">Current building</dt><dd className="mt-1 text-muted-foreground">{church.presentBuilding}</dd></div><div><dt className="font-semibold">Faith tradition</dt><dd className="mt-1 text-muted-foreground">{church.denomination}</dd></div><div><dt className="font-semibold">Painted Church status</dt><dd className="mt-1 text-muted-foreground">{church.paintedStatus==="research-candidate"?"Research candidate only — not classified as verified":"Historic Painted Church interior not established"}</dd></div></dl></section>
          <section className="border-t border-border pt-5"><h2 className="font-display text-2xl">Explore related Texas places</h2><ul className="mt-5 space-y-4">{church.related.map(item=><li key={item.href}><a href={item.href} className="font-semibold text-primary underline">{item.label}</a><p className="mt-1 text-sm leading-6 text-muted-foreground">{item.why}</p></li>)}</ul></section>
          <section className="border-t border-border pt-5"><p className="font-display text-2xl">Historic or Painted?</p><p className="mt-3 text-sm leading-7 text-muted-foreground">This guide belongs to the broader Historic Churches collection. A specific Painted Churches status requires verified original or historically reconstructed decorative painting, not just an old building, an ornate altar or inclusion in a combined tourism tour.</p><Link to="/explore/painted-churches/methodology" className="mt-4 inline-block text-sm font-semibold text-primary underline">Read the Painted Churches methodology</Link></section>
        </aside>
      </div>
      <section className="mt-16 border-t border-border pt-9"><h2 className="font-display text-3xl">More Historic Churches of Texas</h2><div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{peers.map(p=><article key={p.slug} className="border-t border-border pt-4"><p className="eyebrow text-primary">{p.locality}</p><h3 className="mt-2 font-display text-2xl"><Link to="/explore/historic-churches/$slug" params={{slug:p.slug}}>{p.shortName}</Link></h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{p.summary}</p></article>)}</div><p className="mt-8 text-sm"><Link to="/explore/historic-churches" className="font-semibold text-primary underline">Browse all Historic Churches of Texas</Link></p></section>
    </Container>
  </main>;
}
