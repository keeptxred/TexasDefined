import { createFileRoute, Link } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { historicChurches, historicChurchImageSrc } from "@/data/historic-churches";
import { buildMeta, canonicalLink, jsonLd, absoluteUrl } from "@/lib/seo";
import { recoverOrHideImage } from "@/lib/image-fallback";

const path = "/explore/historic-churches";
const title = "Historic Churches of Texas: History, Maps and Visitor Guides";
const description = "Explore Texas historic churches with sourced timelines, architectural context, local heritage, visiting guidance and clearly credited photography. Start with five independently researched parishes.";
const url = absoluteUrl(texasDefinedBrand, path);
export const Route = createFileRoute(path)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand,{ canonicalPath:path, title, description, modifiedTime:"2026-10-12T15:00:00-05:00" }),
    links:[canonicalLink(texasDefinedBrand,path)],
    scripts:[jsonLd({"@context":"https://schema.org","@graph":[
      {"@type":"CollectionPage","@id":url+"#collection",url,name:"Historic Churches of Texas",description,dateModified:"2026-10-12",publisher:{"@id":absoluteUrl(texasDefinedBrand,"/")+"#organization"},mainEntity:{"@id":url+"#list"}},
      {"@type":"ItemList","@id":url+"#list",numberOfItems:historicChurches.length,itemListElement:historicChurches.map((church,i)=>({"@type":"ListItem",position:i+1,url:absoluteUrl(texasDefinedBrand,path+"/"+church.slug),name:church.name+" — "+church.locality}))},
      {"@type":"BreadcrumbList","@id":url+"#breadcrumbs",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:absoluteUrl(texasDefinedBrand,"/")},{"@type":"ListItem",position:2,name:"Explore",item:absoluteUrl(texasDefinedBrand,"/explore")},{"@type":"ListItem",position:3,name:"Historic Churches",item:url}]}
    ]})],
  }),
  component: HistoricChurchesPage
});
function HistoricChurchesPage() {
  return <main>
    <section className="border-b border-border bg-ink text-ink-foreground"><Container className="py-16 sm:py-24">
      <nav aria-label="Breadcrumb"><ol className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.14em] text-ink-foreground/60"><li><Link to="/">Home</Link></li><li aria-hidden="true">·</li><li><Link to="/explore">Explore</Link></li><li aria-hidden="true">·</li><li aria-current="page">Historic Churches</li></ol></nav>
      <p className="eyebrow mt-10 text-ink-foreground/70">Texas heritage · a growing, documented collection</p>
      <h1 className="mt-4 max-w-5xl font-display text-5xl leading-tight sm:text-7xl">Historic Churches of Texas</h1>
      <p className="mt-5 max-w-4xl text-lg leading-8 text-ink-foreground/80">Explore the religious communities, buildings, immigrant traditions and local histories that helped shape Texas. Our guides distinguish congregational founding dates from current buildings, link back to original research and help you plan respectful visits.</p>
      <div className="mt-8 flex flex-wrap gap-5 text-sm"><span>{historicChurches.length} researched starting profiles</span><span>All denominations welcome</span><span>Growing statewide</span></div>
    </Container></section>
    <Container className="py-14 sm:py-18">
      <section aria-labelledby="answer">
        <p className="eyebrow text-primary">Quick answer</p><h2 id="answer" className="mt-3 font-display text-4xl">Historic churches are not necessarily Painted Churches.</h2>
        <p className="mt-5 max-w-4xl text-base leading-8 text-muted-foreground">A church can be historically significant because of its architecture, settlement history, worship, schools, preservation or relationship to a community. “Painted Churches” describes a more specific documented decorative-interior tradition. Some historic churches belong to both collections. These five are presented for their own documented histories and architecture, not as additional members of the 1983 National Register decorative-interior group. <Link to="/explore/painted-churches" className="border-b border-primary text-primary">Explore the separate Painted Churches authority collection.</Link></p>
      </section>
      <section aria-labelledby="churches" className="mt-16 border-t border-border pt-8">
        <div className="flex flex-wrap items-end justify-between gap-6"><div><p className="eyebrow text-primary">First five researched parishes</p><h2 id="churches" className="mt-2 font-display text-4xl">Explore church by church</h2></div><p className="max-w-md text-sm leading-7 text-muted-foreground">These five are a starting point, not a definitive list or an implied ranking. Additions must clear the same evidence, imaging and visitor-planning standards.</p></div>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{historicChurches.map(church=><article key={church.slug} className="overflow-hidden border border-border bg-background">
          <div className="relative flex aspect-[4/3] items-end bg-surface p-5">
            {church.image ? <img loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" src={historicChurchImageSrc(church.image)} alt={church.image.alt} width={church.image.width} height={church.image.height} onError={e=>recoverOrHideImage(e.currentTarget)} /> : null}
            <span className="relative bg-background px-3 py-1 text-xs font-medium text-foreground">{church.locality}</span>
          </div>
          <div className="p-6"><p className="eyebrow text-primary">{church.county} area</p>
          <h3 className="mt-3 font-display text-3xl leading-tight"><Link to="/explore/historic-churches/$slug" params={{slug:church.slug}} className="hover:text-primary">{church.shortName}</Link></h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{church.summary}</p>
          <p className="mt-4 text-xs text-muted-foreground">Current building: {church.presentBuilding}</p>
          <Link to="/explore/historic-churches/$slug" params={{slug:church.slug}} className="mt-5 inline-block border-b border-primary text-sm font-semibold text-primary">Read the researched guide</Link>
          </div></article>)}</div>
      </section>
      <section className="mt-16 grid gap-10 border-t border-border pt-10 lg:grid-cols-2">
        <div><p className="eyebrow text-primary">You may also be interested in</p><h2 className="mt-3 font-display text-3xl">St. Mary’s at Hostyn Hill near Ellinger</h2><p className="mt-4 leading-8 text-muted-foreground">Built in 1906 after a fire destroyed its predecessor, St. Mary’s is a Gothic-style church rooted in the German and Czech Catholic history of Fayette County. Its gilded altar, religious statues and blue ceiling distinguish it from the elaborate wall and ceiling frescoes of the formal Painted Churches group. It is not included in the 1983 National Register Churches with Decorative Interior Painting listing, but those documented features and its history make it a rewarding companion stop for readers exploring the Painted Churches of Texas.</p><p className="mt-4 text-sm leading-7 text-muted-foreground">History: <a href="https://atlas.thc.texas.gov/Details/5149004468" target="_blank" rel="noreferrer" className="text-primary underline">Texas Historical Commission</a>. Interior description: <a href="https://www.houstoniamag.com/travel-and-outdoors/2015/12/in-ellinger-the-painted-church-you-may-have-missed" target="_blank" rel="noreferrer" className="text-primary underline">Houstonia</a>.</p><Link to="/explore/historic-churches/$slug" params={{slug:"ellinger-st-marys-hostyn-hill"}} className="mt-5 inline-block border-b border-primary text-primary">Read the complete Hostyn Hill guide</Link></div>
        <div><p className="eyebrow text-primary">Research methodology</p><h2 className="mt-3 font-display text-3xl">How we include churches</h2><p className="mt-4 leading-8 text-muted-foreground">We prioritize original parish records and Texas Historical Commission material, separate verified facts from folklore and give current parish websites authority on access, worship and visitor restrictions. Photo usage requires a specific reusable license and visible attribution; gaps are stated rather than hidden behind generic images.</p><p className="mt-5 text-sm text-muted-foreground">Reviewed October 12, 2026. Sources and corrections appear on each church's profile. A listed church is not necessarily open for tours, officially landmark-designated or a Painted Church.</p></div>
      </section>
      <section className="mt-16 border-y border-border py-9"><h2 className="font-display text-3xl">Continue exploring Texas heritage</h2><div className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-sm"><Link to="/explore/painted-churches" className="border-b border-primary text-primary">Painted Churches of Texas</Link><Link to="/explore/painted-churches/census" className="border-b border-primary text-primary">Painted Church classification census</Link><Link to="/county/fayette" className="border-b border-primary text-primary">Fayette County</Link><Link to="/county/lavaca" className="border-b border-primary text-primary">Lavaca County</Link><Link to="/county/colorado" className="border-b border-primary text-primary">Colorado County</Link><Link to="/county/matagorda" className="border-b border-primary text-primary">Matagorda County</Link></div></section>
    </Container>
  </main>;
}
