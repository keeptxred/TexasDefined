import { createLazyFileRoute } from "@tanstack/react-router";
import { LAKE_CONROE_RESEARCH } from "@/data/fishing/lake-conroe-source-research";
import { LAKE_CONROE_VERIFIED_AT } from "@/data/fishing/lake-conroe-routing";
import {
  LAKE_CONROE_CAMPING_CANONICAL_PATH as canonicalPath,
  LAKE_CONROE_CAMPING_TITLE as title,
  LAKE_CONROE_CAMPING_DESCRIPTION as description,
  LAKE_CONROE_CAMPING_REVIEWED_AT as reviewedAt,
  LAKE_CONROE_CAMPING_CITATIONS as citations,
} from "@/data/fishing/lake-conroe-camping-publication";

const neighboring = [
  {name: "Lake Conroe fishing guide", href: "/fishing/lakes/lake-conroe"},
  {name: "Fish species", href: "/fishing/lakes/lake-conroe/fish"},
  {name: "Verified ramps and access", href: "/fishing/lakes/lake-conroe/access"},
  {name: "Boating", href: "/fishing/lakes/lake-conroe/boating"},
  {name: "Camping", href: canonicalPath},
  {name: "Fishing regulations", href: "/fishing/lakes/lake-conroe/regulations"},
  {name: "Nearby forest recreation", href: "/fishing/lakes/lake-conroe/nearby"},
  {name: "All Texas fishing lakes", href: "/fishing/lakes"},
];
const regionLinks = [
  {name: "Montgomery County", href: "/county/montgomery"},
  {name: "Walker County", href: "/county/walker"},
  {name: "Texas fishing home", href: "/fishing"},
];
const formatDate = (d: string) => new Date(d + "T12:00:00Z").toLocaleDateString("en-US", {year:"numeric",month:"long",day:"numeric",timeZone:"UTC"});


export const Route = createLazyFileRoute("/fishing/lakes/lake-conroe/camping")({
  component: LakeConroeCamping,
});

function LakeConroeCamping() {
  const sourceResearch = LAKE_CONROE_RESEARCH;
  return <div data-conroe-camping-isolated="true">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage", "@id": "https://texasdefined.com" + canonicalPath,
          url: "https://texasdefined.com" + canonicalPath, name: title, description,
          isPartOf: { "@id": "https://texasdefined.com/#website" },
          about: { "@id": "https://texasdefined.com/fishing/lakes/lake-conroe#reservoir" },
          breadcrumb: { "@id": "https://texasdefined.com" + canonicalPath + "#breadcrumbs" },
          dateModified: reviewedAt,
          citation: [...citations],
        },
        {
          "@type": "BreadcrumbList", "@id": "https://texasdefined.com" + canonicalPath + "#breadcrumbs",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://texasdefined.com" },
            { "@type": "ListItem", position: 2, name: "Fishing", item: "https://texasdefined.com/fishing" },
            { "@type": "ListItem", position: 3, name: "Lake Conroe", item: "https://texasdefined.com/fishing/lakes/lake-conroe" },
            { "@type": "ListItem", position: 4, name: "Camping", item: "https://texasdefined.com" + canonicalPath },
          ],
        },
      ],
    })}} />
    <div className="mx-auto max-w-7xl px-5 pt-9 sm:px-8">
      <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-widest text-muted-foreground">
        <ol className="flex flex-wrap gap-2"><li><a href="/">Front page</a></li><li aria-hidden="true">·</li>
          <li><a href="/fishing">Fishing</a></li><li aria-hidden="true">·</li>
          <li><a href="/fishing/lakes/lake-conroe">Lake Conroe</a></li><li aria-hidden="true">·</li>
          <li aria-current="page">Camping</li></ol>
      </nav>
    </div>
    <header className="mt-5 border-y border-border bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="eyebrow text-ink-foreground/65">Texas Defined Fishing · Piney Woods</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-tight sm:text-7xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/80">{description}</p>
        <p className="mt-8 text-xs uppercase tracking-wider text-ink-foreground/60">Montgomery + Walker counties · 20,118 acres · Lake overview verified {formatDate(LAKE_CONROE_VERIFIED_AT)}</p>
      </div>
    </header>
    <nav aria-label="Lake Conroe guide sections" className="border-b border-border">
      <div className="mx-auto flex max-w-7xl gap-5 overflow-x-auto px-5 py-4 text-xs font-semibold uppercase tracking-widest sm:px-8">
        {neighboring.map(link=><a key={link.href} href={link.href} className={link.href===canonicalPath?"text-primary":"whitespace-nowrap text-muted-foreground hover:text-foreground"}>{link.name}</a>)}
      </div>
    </nav>
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
      <section aria-labelledby="conroe-camp-options">
        <p className="eyebrow text-primary">Stay near the lake</p>
        <h2 id="conroe-camp-options" className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Start with the public-land options we can verify.</h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">These U.S. Forest Service recreation areas have different overnight rules. Cagle offers reservable developed RV sites, Stubblefield offers first-come primitive camping, and Scott's Ridge is a day-use access point, not a campground. Confirm current closures, fees and site availability with the operator before leaving home.</p>
        <p className="mt-3 text-xs text-muted-foreground">Facilities researched {formatDate(sourceResearch.reviewedAt)}; published facts are not a live inventory.</p>
        <div className="mt-9 grid gap-6 lg:grid-cols-3">
          {sourceResearch.camping.map(site=><article key={site.name} className="border-t-2 border-foreground pt-5">
            <p className="eyebrow text-primary">{site.type}</p>
            <h3 className="mt-2 font-display text-2xl">{site.name}</h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{site.summary}</p>
            <a href={site.href} target="_blank" rel="noopener noreferrer" className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">Check official details →</a>
          </article>)}
        </div>
      </section>
      <section aria-labelledby="conroe-camp-planning" className="mt-16 border-t border-border pt-8">
        <h2 id="conroe-camp-planning" className="font-display text-3xl">Choose the right overnight plan</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Check the posted reservation and vehicle rules for Cagle before booking a specific electric campsite. Stubblefield's first-come policy means a listing is not a reserved space; have a backup. Scott's Ridge does not permit overnight camping, even though its boat ramp appears in lake-access directories. For boating, check the lake-level and ramp information separately from these campground descriptions.</p>
        <h3 className="mt-8 font-display text-2xl">Connected Texas fishing and travel guides</h3>
        <p className="mt-3 text-sm text-muted-foreground">Match your overnight base to the lake access, fishing rules and nearby forest recreation you plan to use.</p>
        <div className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {[...neighboring.filter(link => link.href !== canonicalPath), ...regionLinks].map(item=><a key={item.href} href={item.href} className="font-medium underline decoration-border underline-offset-4 hover:decoration-primary">{item.name} →</a>)}
        </div>
      </section>
      <section aria-labelledby="conroe-camp-sources" className="mt-16 border-t border-border pt-8">
        <p className="eyebrow text-primary">Source transparency</p>
        <h2 id="conroe-camp-sources" className="mt-2 font-display text-2xl">Original reservoir review: {formatDate(LAKE_CONROE_VERIFIED_AT)}. Camping and operating details: {formatDate(sourceResearch.reviewedAt)}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">This guide distinguishes sourced campground facts from live availability. Fees, vacancies, launch access, weather and closures can change after this editorial review. Use each operator's current information to confirm your plans.</p>
        <ul className="mt-5 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
          {sourceResearch.sourceUrls.map(url=><li key={url}><a href={url} target="_blank" rel="noopener noreferrer" className="font-medium underline decoration-border underline-offset-4 hover:decoration-primary">{new URL(url).hostname} — source record →</a></li>)}
        </ul>
      </section>
    </div>
  </div>;
}
