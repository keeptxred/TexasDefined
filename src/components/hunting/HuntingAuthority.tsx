import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import wildlifePhoto from "@/assets/wildlife.jpg";
import publicAccessFacts from "@/data/hunting/public-access-facts.json";
import {
  HUNTING_AUTHORITY_TOPICS,
  HUNTING_HUB_GROUPS,
  HUNTING_OFFICIAL_SOURCES,
  HUNTING_REGULATION_FRESHNESS,
  type HuntingAuthorityLink,
  type HuntingAuthorityTopic,
} from "@/data/hunting/authority";
import { HUNTING_AUTHORITY_TOPICS_V2, HUNTING_V2_HUB_GROUPS } from "@/data/hunting/authority-v2";
import { TEXAS_WILDLIFE_SPECIES } from "@/data/knowledge-graph/wildlife-species";
import { deerSeasonRange, deerSeasonYear, deerSourceCheckLabel, texasDeerSeason, type DeerSeasonId } from "@/data/hunting/deer-season-format";

const ALL_HUNTING_TOPICS: Record<string, HuntingAuthorityTopic> = {
  ...HUNTING_AUTHORITY_TOPICS,
  ...HUNTING_AUTHORITY_TOPICS_V2,
};
const ALL_HUNTING_HUB_GROUPS = [...HUNTING_HUB_GROUPS, ...HUNTING_V2_HUB_GROUPS] as const;
const HUNTING_SPECIES_CONTEXT = [
  { slug: "white-tailed-deer", purpose: "Widespread deer habitat and species identification" },
  { slug: "mule-deer", purpose: "Western Texas habitat and identification versus white-tailed deer" },
  { slug: "javelina", purpose: "Collared peccary biology and South/West Texas brush habitat" },
  { slug: "wild-turkey", purpose: "Texas wild turkey species and woodland habitat" },
  { slug: "american-alligator", purpose: "Coastal and East Texas alligator ecology; special rules apply" },
] as const;


function ResourceLink({ link }: { link: HuntingAuthorityLink }) {
  if (link.external) return <a href={link.href} target="_blank" rel="noreferrer" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">{link.label} ↗</a>;
  return <Link to={link.href} className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">{link.label}</Link>;
}

function DeerSeasonTable() {
  const rows = texasDeerSeason.rows.map((row) => [row.season, row.area, deerSeasonRange(row.id as DeerSeasonId, "short")]);
  return <section className="border-b border-border py-10 md:py-14" aria-labelledby="deer-season-dates">
    <Container>
      <div className="max-w-5xl">
        <p className="eyebrow text-primary">{deerSeasonYear} season at a glance</p>
        <h2 id="deer-season-dates" className="mt-2 font-display text-3xl md:text-4xl">Texas white-tailed deer hunting dates</h2>
        <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">This table summarizes TPWD's zone calendar. Dates do not override county-specific legal deer, antler restrictions, land access or special permit requirements.</p>
        <div className="mt-6 overflow-x-auto rounded-sm border border-border">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <caption className="sr-only">{deerSeasonYear} Texas white-tailed deer season dates by season and zone</caption>
            <thead className="bg-muted/50 text-foreground"><tr><th scope="col" className="px-4 py-3 font-semibold">Season</th><th scope="col" className="px-4 py-3 font-semibold">Area</th><th scope="col" className="px-4 py-3 font-semibold">Dates</th></tr></thead>
            <tbody className="divide-y divide-border">{rows.map(([season, area, dates], index) => <tr key={index}><th scope="row" className="px-4 py-3 font-semibold">{season}</th><td className="px-4 py-3 text-muted-foreground">{area}</td><td className="px-4 py-3 whitespace-nowrap">{dates}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">Late seasons have limits on legal deer; youth-only hunts have age restrictions. Always check the official county listing before hunting.</p>
        <p className="mt-2 text-xs text-muted-foreground">TPWD date snapshot recorded {deerSourceCheckLabel()}; the full legal guide has a separate editorial review date, and GitHub rechecks the official calendars weekly.</p>
        <div className="mt-4 text-sm"><ResourceLink link={{ label: "TPWD official white-tailed deer season dates and county rules", href: "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/white-tailed-deer", external: true }} /></div>
      </div>
    </Container>
  </section>;
}

function FreshnessPanel({ topic }: { topic?: HuntingAuthorityTopic }) {
  return <section className="border-y border-border bg-surface py-8"><Container><div className="grid gap-5 lg:grid-cols-[15rem_1fr] lg:items-start"><div><p className="eyebrow text-primary">Regulatory freshness</p><p className="mt-2 font-display text-2xl">TPWD {topic?.slug === "texas-deer-hunting" ? deerSeasonYear : HUNTING_REGULATION_FRESHNESS.seasonYear}</p><p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">Source review {topic?.reviewedLabel ?? HUNTING_REGULATION_FRESHNESS.lastVerifiedLabel}</p></div><div><p className="max-w-4xl text-sm leading-7 text-muted-foreground">{HUNTING_REGULATION_FRESHNESS.disclaimer}</p><p className="mt-3 text-sm leading-7 text-muted-foreground">{HUNTING_REGULATION_FRESHNESS.reviewScope}</p><div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm"><ResourceLink link={HUNTING_OFFICIAL_SOURCES.regulations} /><ResourceLink link={HUNTING_OFFICIAL_SOURCES.seasonDates} /></div></div></div></Container></section>;
}

export function HuntingAuthorityHub() {
  return <main>
    <section className="border-b border-border bg-muted/30 py-14 md:py-20"><Container><nav aria-label="Breadcrumb" className="mb-8 text-xs uppercase tracking-[0.14em] text-muted-foreground"><Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page">Hunting</span></nav><p className="eyebrow text-primary">Texas hunting guide</p><h1 className="mt-3 max-w-5xl font-display text-5xl leading-none md:text-7xl">Hunting Texas: licenses, public land, species and season planning</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Start with access and legal planning, then connect the hunt to wildlife habitat, counties, camping, fishing, parks and trip planning. Current-rule questions route back to Texas Parks and Wildlife Department instead of treating an independent publication as the legal authority.</p><div className="mt-8 flex flex-wrap gap-3"><a href="https://tpwd.texas.gov/huntwild/hunt/public/annual_public_hunting/search.phtml" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">TPWD hunting area finder ↗</a><Link to="/hunting/public-hunting" className="inline-flex items-center border border-border px-5 py-3 text-sm font-semibold hover:border-primary hover:text-primary">Understand public access →</Link><Link to="/hunting/texas-hunting-license" className="inline-flex items-center border border-border px-5 py-3 text-sm font-semibold hover:border-primary hover:text-primary">Hunting licenses →</Link><Link to="/explore/outdoors" className="inline-flex items-center border border-border px-5 py-3 text-sm font-semibold hover:border-primary hover:text-primary">Public lands & outdoors →</Link><Link to="/explore/trip-planner" className="inline-flex items-center border border-border px-5 py-3 text-sm font-semibold hover:border-primary hover:text-primary">Build a trip →</Link></div><figure className="mt-8 max-w-5xl"><img src={wildlifePhoto} alt="White-tailed deer in Texas brush habitat; not a claim of public hunting access" width={1200} height={675} className="w-full object-cover" decoding="async" /><figcaption className="mt-3 text-sm text-muted-foreground">Texas wildlife habitat. Confirm permission and legal game for each property before hunting.</figcaption></figure></Container></section>
    <FreshnessPanel />
    <section className="border-b border-border py-12 md:py-16" aria-labelledby="hunt-planning-steps"><Container>
      <p className="eyebrow text-primary">Start here</p><h2 id="hunt-planning-steps" className="mt-3 font-display text-3xl md:text-4xl">Four decisions before choosing a hunting spot</h2>
      <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div className="border border-border p-5"><h3 className="font-display text-2xl">1. Private or public land?</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Private land requires landowner permission. Public units require the exact TPWD access record and possibly a permit. Recreational access is not automatically hunting access.</p><p className="mt-4 text-sm"><ResourceLink link={HUNTING_OFFICIAL_SOURCES.publicAreaSearch}/></p></div>
        <div className="border border-border p-5"><h3 className="font-display text-2xl">2. Which permit opens the gate?</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">The {publicAccessFacts.seasonYear} TPWD APH permit costs ${publicAccessFacts.aphPermitUsd}. A Limited Public Use permit costs ${publicAccessFacts.limitedPublicUsePermitUsd} and does not authorize hunting. Drawn, E-Postcard or area permits have separate rules.</p><p className="mt-4 text-sm"><ResourceLink link={HUNTING_OFFICIAL_SOURCES.aph}/></p></div>
        <div className="border border-border p-5"><h3 className="font-display text-2xl">3. Species, county and season?</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Deer restrictions can change at county roads. Dove and waterfowl vary by zone. Check the precise species, date, legal methods, bag limits and tagging requirements.</p><p className="mt-4 text-sm"><ResourceLink link={HUNTING_OFFICIAL_SOURCES.seasonDates}/></p></div>
        <div className="border border-border p-5"><h3 className="font-display text-2xl">4. License, education and harvest?</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Most hunters need an appropriate license; some activities require endorsements or federal stamps. Hunter education, public-land permit, check-in, tagging and reporting rules may also apply.</p><p className="mt-4 text-sm"><ResourceLink link={HUNTING_OFFICIAL_SOURCES.licenses}/></p></div>
      </div>
      <p className="mt-5 text-sm leading-7 text-muted-foreground">Public permit figures are official TPWD program facts, separately monitored on GitHub; a license and applicable stamps are additional to an APH permit. Youth access can have different eligibility.</p>
    </Container></section>
    <section className="border-b border-border bg-muted/30 py-12 md:py-16" aria-labelledby="hunting-2026-changes"><Container>
      <p className="eyebrow text-primary">2026–27 regulation changes</p><h2 id="hunting-2026-changes" className="mt-3 font-display text-3xl md:text-4xl">What changed for Texas hunters this season?</h2>
      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <div className="border border-border p-5"><h3 className="font-display text-2xl">White-tailed deer</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">The 16-day antlerless-deer period, November 14–29, 2026, expanded to 21 specified counties or county portions. Not statewide. Some county boundaries follow highways.</p><p className="mt-4 text-sm"><Link className="font-semibold text-primary underline" to="/hunting/texas-deer-hunting">Deer season and county rules →</Link></p></div>
        <div className="border border-border p-5"><h3 className="font-display text-2xl">Dove zones</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">South Zone regular season opened September 1 and Special White-winged Dove Days were eliminated. Remaining segments differ among North, Central and South zones.</p><p className="mt-4 text-sm"><Link className="font-semibold text-primary underline" to="/hunting/dove-hunting">Dove hunting guide →</Link></p></div>
        <div className="border border-border p-5"><h3 className="font-display text-2xl">Wild turkey</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Matagorda and Wharton counties are closed to turkey hunting. Unbearded wild turkey hens cannot be harvested statewide.</p><p className="mt-4 text-sm"><Link className="font-semibold text-primary underline" to="/hunting/turkey-hunting">Turkey hunting guide →</Link></p></div>
        <div className="border border-border p-5"><h3 className="font-display text-2xl">Licensing and digital tags</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">TPWD updated license-buyer identity checks. Digital license users must have their license available in the field and follow electronic tagging procedures in the Texas Hunt &amp; Fish app.</p><p className="mt-4 text-sm"><Link className="font-semibold text-primary underline" to="/hunting/texas-hunting-license">License requirements →</Link></p></div>
      </div>
      <p className="mt-5 text-sm"><ResourceLink link={HUNTING_OFFICIAL_SOURCES.seasonChanges}/></p>
    </Container></section>
    <section className="py-12 md:py-16"><Container><div className="grid gap-12">{ALL_HUNTING_HUB_GROUPS.map((group) => <section key={group.title}><div className="grid gap-4 border-b border-border pb-5 lg:grid-cols-[1fr_2fr] lg:items-end"><h2 className="font-display text-3xl md:text-4xl">{group.title}</h2><p className="max-w-2xl text-sm leading-7 text-muted-foreground">{group.description}</p></div><div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{group.slugs.map((slug) => { const topic = ALL_HUNTING_TOPICS[slug]; return <Link key={slug} to={`/hunting/${slug}`} className="group border border-border p-5 transition hover:border-primary"><p className="eyebrow text-primary">{topic.eyebrow}</p><h3 className="mt-2 font-display text-2xl leading-tight group-hover:text-primary">{topic.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{topic.description}</p><span className="mt-4 inline-block text-sm font-semibold text-primary">Open guide →</span></Link>; })}</div></section>)}</div></Container></section>
    <section className="border-y border-border py-12"><Container>
      <h2 className="font-display text-3xl md:text-4xl">Understand the species, then verify the current hunt</h2>
      <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">These independently researched wildlife profiles explain identification, habitat and Texas range. They do not establish a legal season, bag limit, public-land permit or county-specific rule. Verify all current restrictions directly with <a href="https://tpwd.texas.gov/regulations/outdoor-annual/hunting/" target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline">TPWD's official hunting regulations</a> before planning a hunt.</p>
      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {HUNTING_SPECIES_CONTEXT.map((entry) => {
          const species = TEXAS_WILDLIFE_SPECIES.find((record) => record.slug === entry.slug);
          return species ? <li key={entry.slug} className="border border-border p-5">
            <h3 className="font-display text-xl"><a href={`/wildlife-species/${entry.slug}`} className="text-primary underline decoration-primary/40 underline-offset-4">{species.name}</a></h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{entry.purpose}</p>
          </li> : null;
        })}
      </ul>
    </Container></section>

    <section className="border-y border-border bg-muted/30 py-12"><Container><div className="grid gap-8 lg:grid-cols-[1fr_2fr]"><div><p className="eyebrow text-primary">Connected Texas discovery</p><h2 className="mt-3 font-display text-4xl">A hunt is also a place-based trip</h2></div><div className="grid gap-5 sm:grid-cols-2"><p className="text-sm leading-7 text-muted-foreground">Public hunting works best when access records connect to counties, regions, wildlife habitat and nearby destinations. Use TexasDefined's outdoor and wildlife systems to understand the place around the hunt.</p><p className="text-sm leading-7 text-muted-foreground">Camping, fishing, parks and trip-planning links make it easier to turn a permit or drawn hunt into a realistic itinerary without weakening the distinction between travel guidance and legal hunting rules.</p></div><div className="lg:col-start-2 flex flex-wrap gap-x-6 gap-y-3 text-sm"><Link to="/explore/outdoors" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">Public lands & outdoors</Link><Link to="/explore/wildlife" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">Wildlife</Link><Link to="/best-places-to-go-camping-in-texas" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">Camping</Link><Link to="/fishing" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">Fishing</Link><Link to="/explore/state-parks" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">State parks</Link><Link to="/browse/counties" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">Counties</Link></div></div></Container></section>
  </main>;
}

export function HuntingAuthorityTopicPage({ topic }: { topic: HuntingAuthorityTopic }) {
  const officialSources = [...new Map(topic.sections.flatMap((section) => section.links ?? []).filter((link) => link.external).map((link) => [link.href, link] as const)).values()];
  return <main>
    <section className="border-b border-border bg-muted/30 py-14 md:py-20"><Container><nav aria-label="Breadcrumb" className="mb-8 text-xs uppercase tracking-[0.14em] text-muted-foreground"><Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span><Link to="/hunting">Hunting</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page">{topic.title}</span></nav><p className="eyebrow text-primary">{topic.eyebrow}</p><h1 className="mt-3 max-w-5xl font-display text-5xl leading-none md:text-7xl">{topic.title}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{topic.description}</p><p className="mt-5 text-xs uppercase tracking-[0.18em] text-muted-foreground">TPWD season sources {topic.slug === "texas-deer-hunting" ? deerSeasonYear : HUNTING_REGULATION_FRESHNESS.seasonYear} · source review {topic.reviewedLabel ?? HUNTING_REGULATION_FRESHNESS.lastVerifiedLabel}</p>{topic.slug === "texas-deer-hunting" ? <figure className="mt-8 max-w-4xl">
  <img src="https://www.fws.gov/sites/default/files/styles/max_1300x1300/public/banner_images/2021-05/White-tailed%20deer.jpg?itok=tsL8BNDt" alt="Close view of a white-tailed buck standing in tall grass" width={1000} height={664} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover" />
  <figcaption className="mt-2 text-xs leading-5 text-muted-foreground">White-tailed deer (representative species photograph). Tom Koerner / U.S. Fish &amp; Wildlife Service, public domain. <a className="text-primary underline underline-offset-2" href="https://www.fws.gov/media/white-tailed-deer-buck-0" target="_blank" rel="noreferrer noopener">Photo source and rights</a>.</figcaption>
</figure> : null}</Container></section>
    <section className="border-b border-border py-8"><Container><div className="max-w-4xl border-l-2 border-primary pl-5"><p className="eyebrow text-primary">Quick answer</p><p className="mt-3 text-lg leading-8">{topic.quickAnswer}</p></div></Container></section>
    {topic.slug === "texas-deer-hunting" ? <DeerSeasonTable /> : null}
    <FreshnessPanel topic={topic} />
    {topic.slug === "texas-deer-hunting" ? <nav aria-label="Contents of the deer hunting guide" className="border-b border-border bg-muted/20 py-8">
      <Container><div className="max-w-5xl"><p className="eyebrow text-primary">In this guide</p>
        <ul className="mt-4 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
          {topic.sections.map((section, index) => <li key={section.heading}><a className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary" href={`#deer-guide-${index + 1}`}>{section.heading}</a></li>)}
        </ul>
      </div></Container>
    </nav> : null}
    <section className="py-12 md:py-16"><Container><div className="max-w-4xl divide-y divide-border">{topic.sections.map((section, index) => <section key={section.heading} id={topic.slug === "texas-deer-hunting" ? `deer-guide-${index + 1}` : undefined} className="scroll-mt-24 py-8 first:pt-0"><p className="eyebrow text-muted-foreground">{String(index + 1).padStart(2, "0")}</p><h2 className="mt-2 font-display text-3xl md:text-4xl">{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 leading-8 text-muted-foreground">{paragraph}</p>)}{section.links?.length ? <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">{section.links.map((link) => <ResourceLink key={`${link.href}-${link.label}`} link={link} />)}</div> : null}</section>)}</div></Container></section>
    {topic.faq.length > 0 ? <section className="border-t border-border bg-surface py-12" aria-labelledby="hunting-faq-heading"><Container><div className="max-w-4xl"><p className="eyebrow text-primary">Quick answers</p><h2 id="hunting-faq-heading" className="mt-2 font-display text-3xl md:text-4xl">Frequently asked questions</h2><div className="mt-6 divide-y divide-border border-y border-border">{topic.faq.map((item) => <details key={item.question} className="group py-5"><summary className="cursor-pointer list-none pr-8 font-display text-xl marker:hidden">{item.question}<span className="float-right text-primary group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{item.answer}</p></details>)}</div></div></Container></section> : null}
    {officialSources.length ? <section className="border-t border-border py-10"><Container><div className="grid max-w-4xl gap-6 lg:grid-cols-[14rem_1fr]"><div><p className="eyebrow text-primary">Verify with TPWD</p><h2 className="mt-2 font-display text-3xl">Current official sources</h2></div><div><p className="text-sm leading-7 text-muted-foreground">TexasDefined explains how the pieces fit together. Texas Parks and Wildlife Department remains the source to verify current licenses, seasons, limits, methods, tagging, reporting and public-hunt access.</p><div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">{officialSources.map((link) => <ResourceLink key={`source-${link.href}`} link={link} />)}</div></div></div></Container></section> : null}
    <section className="border-t border-border bg-muted/30 py-10"><Container><h2 className="font-display text-3xl">Related Texas guides</h2><div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 text-sm"><ResourceLink link={{ label: "Texas hunting hub", href: "/hunting" }} />{topic.related.filter((link) => link.href !== "/hunting").map((link) => <ResourceLink key={`${link.href}-${link.label}`} link={link} />)}</div></Container></section>
  </main>;
}