import type { ReactNode } from "react";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";

/** Detailed editorial body is split from the shared router bundle. */
const verified = "October 10, 2026";
const sources = [
  {
    label: "TPWD — Future Parks (current development roster)",
    url: "https://tpwd.texas.gov/state-parks/park-information/future-parks",
    why: "Current agency classification: Davis Hill State Natural Area is a future-development holding, not an operating visitor park.",
  },
  {
    label: "TPWD — Commission land-acquisition agenda, March 24, 2022",
    url: "https://tpwd.texas.gov/business/feedback/meetings/2022/0324/agenda/item.phtml?item=10",
    why: "Acquisition date, approximate area, location, James Davis history and the proposed acquisition of about 50 acres.",
  },
  {
    label: "TPWD — Commission meeting transcript, March 24, 2022",
    url: "https://tpwd.texas.gov/business/feedback/meetings/2022/0324/transcripts/commission/",
    why: "Firsthand staff testimony about plant diversity, inholdings, access and conservation.",
  },
  {
    label: "TPWD Magazine — State Parks on the Horizon (2023)",
    url: "https://tpwmagazine.com/parks/texas-state-parks-on-the-horizon/",
    why: "Davis Hill's inaccessible status as published, vegetation, rare plants, a TPWD photograph and the agency's development discussion.",
  },
  {
    label: "TPWD — Wanderlist audio transcript: Future State Parks",
    url: "https://tpwd.texas.gov/newsmedia/utts/wanderlist-future-state-parks/",
    why: "Natural-resources staff explain the salt dome, sandstone uplift, Trinity River habitat and local geography.",
  },
  {
    label: "TPWD — Six State Parks on the Horizon, May 2, 2023",
    url: "https://tpwd.texas.gov/newsmedia/releases/?req=20230502b",
    why: "Agency announcement identifying Davis Hill as one of six future sites.",
  },
  {
    label: "TPWD — August 20, 2025 work-session agenda",
    url: "https://tpwd.texas.gov/business/feedback/meetings/2025/0821/agenda/work_session/index.phtml",
    why: "Later official statewide inventory using the historic 'Davis Hill State Park' designation and Liberty County location.",
  },
] as const;

const questions = [
  {
    question: "Is Davis Hill State Park open to the public?",
    answer: "No general visitor access is advertised. TPWD lists Davis Hill State Natural Area under future parks and its detailed overview says the property was inaccessible while the agency pursued access. Do not attempt to enter private land or treat a map pin as a public entrance.",
  },
  {
    question: "Where is Davis Hill?",
    answer: "Davis Hill lies in Liberty County northeast of Houston, near the Tarkington Prairie area and the Trinity River. It is not in Fort Davis or the Davis Mountains of West Texas.",
  },
  {
    question: "Can I hike, camp, fish, or reserve a campsite?",
    answer: "There is no published ordinary visitor entrance, trail system, campsite booking or day-pass program for Davis Hill. The Trinity River frontage described by TPWD does not establish a public launch or legal shore access.",
  },
  {
    question: "When will Davis Hill open?",
    answer: "TPWD has not announced a verified opening date in the agency materials reviewed on October 10, 2026. Land access, resource protection, planning, funding and construction are separate steps, so old estimates should not be treated as a schedule.",
  },
  {
    question: "Is Davis Hill the same as Davis Mountains State Park?",
    answer: "No. Davis Hill is a future natural area in Liberty County in Southeast Texas. Davis Mountains State Park is a developed and operational mountain park near Fort Davis in Jeff Davis County, hundreds of miles west.",
  },
] as const;


export const Route = createLazyFileRoute("/destination/davis-hill-state-park")({
  component: DavisHillAuthorityPage,
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://texasdefined.com/destination/davis-hill-state-park#webpage",
      url: "https://texasdefined.com/destination/davis-hill-state-park",
      name: "Davis Hill State Natural Area: Access, History & Geology",
      dateModified: "2026-10-10",
      citation: sources.map((source) => source.url),
      author: {
        "@type": "Organization",
        name: "Texas Defined Travel & Outdoors Desk",
        url: "https://texasdefined.com/authors/a-dell",
      },
    },
    {
      "@type": "Place",
      name: "Davis Hill State Natural Area",
      alternateName: "Davis Hill State Park",
      description: "Future Texas Parks & Wildlife state natural area; no general public visitor access published.",
      address: { "@type": "PostalAddress", addressLocality: "Liberty County", addressRegion: "TX", addressCountry: "US" },
    },
  ],
};

const citationClass = "font-semibold text-primary underline underline-offset-4 hover:text-foreground";
function OfficialLink({ href, children }: { href: string; children: ReactNode }) {
  return <a className={citationClass} href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
}

function DavisHillAuthorityPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <section className="border-b border-border bg-muted/30 py-10 sm:py-16">
        <Container>
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link className="hover:text-primary" to="/explore">Explore Texas</Link>
            <span aria-hidden="true"> / </span>
            <Link className="hover:text-primary" to="/explore/state-parks">State Parks</Link>
            <span aria-hidden="true"> / </span>
            <span>Davis Hill</span>
          </nav>
          <div className="mt-8 max-w-5xl">
            <p className="eyebrow text-primary">Liberty County / Future Texas state natural area</p>
            <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">Davis Hill State Natural Area</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
              A rare salt-dome hill above Trinity River wetlands, an unusually diverse conservation landscape,
              and a Texas state park property that visitors cannot yet explore on a normal park trip.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Also documented as <strong>Davis Hill State Park</strong> in earlier TPWD records.
              Research and agency development listing checked {verified}.
            </p>
          </div>
          <div className="mt-8 max-w-5xl border-l-4 border-amber-700 bg-background px-5 py-5 sm:px-7" role="note" aria-label="Visitor access warning">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-800 dark:text-amber-300">Public access: not open for ordinary visits</p>
            <p className="mt-2 text-base leading-7">
              Do not plan a hike, campsite, river launch, or driving visit here. TPWD lists Davis Hill among future parks;
              its published development overview describes the property as inaccessible pending access work.
              There are no verified public entrance directions, opening hours, passes, or reservations.
              <span className="ml-1"><OfficialLink href={sources[0].url}>Check the current TPWD future-parks listing</OfficialLink>.</span>
            </p>
          </div>
          <dl className="mt-8 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Location", "Liberty County, Southeast Texas"],
              ["Agency", "Texas Parks & Wildlife"],
              ["Acquired", "1983"],
              ["Area", "About 1,700 acres"],
            ].map(([term, detail]) => (
              <div key={term} className="border-t-2 border-foreground/70 pt-4">
                <dt className="eyebrow text-muted-foreground">{term}</dt>
                <dd className="mt-2 text-base font-semibold">{detail}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Container className="py-10 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-14">
          <article className="min-w-0 space-y-12 text-base leading-8">
            <section aria-labelledby="answer">
              <p className="eyebrow text-primary">The short answer</p>
              <h2 id="answer" className="mt-3 font-display text-3xl sm:text-4xl">What exactly is Davis Hill?</h2>
              <p className="mt-5">Davis Hill is a state-owned conservation property northeast of Houston along the Trinity River in Liberty County. TPWD acquired it in 1983 and has described it as approximately 1,700 acres. It is part of the state parks system, but not a developed, routinely accessible state park. The agency's <OfficialLink href={sources[0].url}>current future-parks list</OfficialLink> calls it <strong>Davis Hill State Natural Area</strong>; older commission records sometimes call it <strong>Davis Hill State Park</strong>.</p>
              <p className="mt-4">This matters because a similarly named but entirely different park, <Link className={citationClass} to="/destination/davis-mountains-state-park">Davis Mountains State Park</Link>, is open near Fort Davis in West Texas. Its trails, Indian Lodge, mountains, fees, directions and photographs do <strong>not</strong> describe Davis Hill.</p>
            </section>

            <section aria-labelledby="where">
              <p className="eyebrow text-primary">Geography</p>
              <h2 id="where" className="mt-3 font-display text-3xl">Where Davis Hill sits — and why that matters</h2>
              <p className="mt-5">The property occupies high and low terrain close to the Trinity River in Liberty County, roughly 40–45 miles northeast or east of downtown Houston as described in different TPWD proceedings. In a <OfficialLink href={sources[4].url}>TPWD interview</OfficialLink>, natural-resources coordinator Andy Sipocz locates it upstream of Liberty, near Tarkington Prairie. This is the humid upper Texas coastal plain, not the Trans-Pecos desert.</p>
              <p className="mt-4">The site stretches from unusually elevated coastal-plain ground toward bottomland forest, swamp, and river-edge sand. The dramatic change in elevation over a relatively short distance creates different habitats. Map markers for the property describe its geography only; they do not represent a public gate, legal road easement, trailhead, or put-in.</p>
              <p className="mt-4"><Link className={citationClass} to="/county/liberty">Explore Liberty County's geography and history</Link> or read <Link className={citationClass} to="/article/texas-rivers-explained">how Texas rivers shape surrounding land</Link>.</p>
            </section>

            <section aria-labelledby="geology">
              <p className="eyebrow text-primary">Geology explained</p>
              <h2 id="geology" className="mt-3 font-display text-3xl">How a salt dome made a hill in a flat coastal plain</h2>
              <p className="mt-5">The defining landform is a salt dome: deeply buried salt moves upward under pressure, deforming the rock above it. At Davis Hill, TPWD's natural-resources interview describes sandstone pushed up to roughly 280 feet above sea level. That figure is from agency interpretation of the hill's summit, <em>not</em> the elevation of the park boundary, a public overlook, or a published climbing route.</p>
              <p className="mt-4">This unusual rock-and-slope environment is a contrast with the low, flood-prone Trinity River bottomlands. Different soil, drainage, shade, and moisture conditions help explain why the hill and river margin support such different plant communities within one relatively small conservation area.</p>
              <div className="mt-6 border-y border-border py-5 text-sm leading-7 text-muted-foreground">
                <strong className="text-foreground">Landform, not a trail map.</strong> A geographic description of the salt dome does not imply that the summit, private roads, or Trinity River beaches can be visited. TPWD has not published a general-access itinerary for this site.
              </div>
            </section>

            <section aria-labelledby="ecology">
              <p className="eyebrow text-primary">Habitat and conservation</p>
              <h2 id="ecology" className="mt-3 font-display text-3xl">Why biologists consider Davis Hill exceptional</h2>
              <p className="mt-5">At the 2022 Texas Parks and Wildlife Commission meeting, TPWD staff described Davis Hill as having the highest number of plant associations per acre in the state park system. That is the agency's characterization from that meeting, not a newly calculated TexasDefined ranking. Its juxtaposition of sandstone upland, slopes, ravines, bottomland hardwoods and wetter Trinity River habitat helps explain the diversity.</p>
              <p className="mt-4">TPWD's <OfficialLink href={sources[3].url}>2023 conservation overview</OfficialLink> specifically identifies the uncommon shadow witch orchid in clay-soil ravines, alongside cypress, ferns and little bluestem. It also reported two potentially undescribed plant species under study at that time. These are scientific conservation details, not a guarantee that visitors can view or photograph the plants; sensitive species locations should not be publicized.</p>
              <p className="mt-4">Protecting fragmented habitats and reducing land-management conflicts helps make sense of TPWD's interest in strategic adjacent parcels and inholdings. More habitat does not automatically mean more immediate visitor access: management, legal access and habitat protection must be planned together.</p>
            </section>

            <section aria-labelledby="history">
              <p className="eyebrow text-primary">Texas history</p>
              <h2 id="history" className="mt-3 font-display text-3xl">Who was Davis Hill named for?</h2>
              <p className="mt-5">TPWD names the site for <strong>General James Davis</strong>, whom it identifies as a veteran of the War of 1812 and the Army of the Republic of Texas. TPWD says Davis had a plantation home atop the hill. That history is part of the landscape's story, including the plantation era; our current primary records do not establish a visitor-accessible historic structure or interpretive tour.</p>
              <p className="mt-4">The department acquired Davis Hill in 1983. It remained largely undeveloped for decades. The site is therefore relevant both to cultural history and to the history of Texas conservation: the state can protect land long before it has the road access, facilities, staff and funding needed to open it safely for routine public use.</p>
            </section>

            <section aria-labelledby="timeline">
              <p className="eyebrow text-primary">Documented chronology</p>
              <h2 id="timeline" className="mt-3 font-display text-3xl">From acquisition to future-park planning</h2>
              <ol className="mt-6 space-y-6 border-l-2 border-border pl-6">
                {[
                  { date: "1983", title: "Land acquired", detail: "TPWD acquires the Davis Hill holding; subsequent agency accounts describe a property of roughly 1,700 acres.", source: sources[1].url },
                  { date: "2013", title: "Interest in limited access", detail: "Public testimony at a commission hearing discusses local conservation work and hopes for limited access, not an opening announcement.", source: "https://tpwd.texas.gov/business/feedback/meetings/2013/0822/transcripts/annual_public_hearing/" },
                  { date: "March 2022", title: "Land-acquisition strategy advanced", detail: "Commission materials authorize pursuing inholdings and neighboring tracts, about 50 acres in total, from willing sellers. Authorization is not proof that every parcel was acquired.", source: sources[1].url },
                  { date: "2023", title: "Future-site program documented", detail: "TPWD lists Davis Hill among six properties slated for future park or natural-area development; its magazine reports that access remains unresolved.", source: sources[5].url },
                  { date: "2025–October 2026", title: "Designation and access checked", detail: "The 2025 TPWD inventory uses the historic State Park designation, while the current future-parks page calls it a State Natural Area. Neither presents a routine visitor opening.", source: sources[0].url },
                ].map((item) => (
                  <li key={item.date}>
                    <p className="text-sm font-bold uppercase tracking-wide text-primary">{item.date}</p>
                    <h3 className="mt-1 font-display text-xl">{item.title}</h3>
                    <p className="mt-2 text-muted-foreground">{item.detail} <OfficialLink href={item.source}>Primary record</OfficialLink>.</p>
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-sm text-muted-foreground">The chronology distinguishes authorized negotiations from completed purchases, and a planned future park from an announced opening. Dates are dates of source material, not evidence of an opening date.</p>
            </section>

            <section aria-labelledby="access">
              <p className="eyebrow text-primary">Practical planning</p>
              <h2 id="access" className="mt-3 font-display text-3xl">What visitors should — and should not — plan</h2>
              <p className="mt-5">The correct travel advice is <strong>not to make Davis Hill a driving destination yet</strong>. The TPWD future-parks page provides no operating park entry, reservation portal, visitor center, public trail map, campground or opening schedule for Davis Hill. The 2023 official overview explicitly described it as inaccessible while the agency worked on land access.</p>
              <p className="mt-4">Do not use third-party pins, aerial photographs, private roads or the riverfront as permission to enter. Do not attempt to reach the property through neighboring land or assume a canoe landing is open. Visitors looking for an actual outing can compare operating Texas state parks below and confirm each park's alerts directly with TPWD.</p>
              <ul className="mt-5 space-y-3">
                <li><Link className={citationClass} to="/destination/lake-livingston-state-park">Lake Livingston State Park</Link> — a developed lake-centered state park in this broader region.</li>
                <li><Link className={citationClass} to="/destination/village-creek-state-park">Village Creek State Park</Link> — a public forest-and-creek park in Southeast Texas.</li>
                <li><Link className={citationClass} to="/destination/sheldon-lake-state-park">Sheldon Lake State Park</Link> — a Houston-area alternative for wetlands and wildlife.</li>
              </ul>
              <p className="mt-5">For statewide choices, visit the <Link className={citationClass} to="/explore/state-parks">Texas state parks guide</Link>. These are alternatives, not routes or access points into Davis Hill.</p>
            </section>

            <section aria-labelledby="questions">
              <p className="eyebrow text-primary">Clear answers</p>
              <h2 id="questions" className="mt-3 font-display text-3xl">Frequently asked questions</h2>
              <div className="mt-5 divide-y divide-border border-y border-border">
                {questions.map((item) => (
                  <section key={item.question} className="py-5">
                    <h3 className="font-display text-xl">{item.question}</h3>
                    <p className="mt-2 text-muted-foreground">{item.answer}</p>
                  </section>
                ))}
              </div>
            </section>

            <section aria-labelledby="method">
              <p className="eyebrow text-primary">Editorial method</p>
              <h2 id="method" className="mt-3 font-display text-3xl">Sources, methodology and limits</h2>
              <p className="mt-5">This independent guide prioritizes original Texas Parks & Wildlife Department commission agendas, transcripts, published natural-resource interviews, the official future-parks roster and the agency's conservation reporting. Historical records are dated so a proposal is not accidentally presented as completed work. This page deliberately does not show a claimed on-site photograph or public entrance map: neither was independently authenticated for publication as visitor information.</p>
              <p className="mt-4">As of the review date, there was no verifiable opening date, published general-access trail system or bookable campsite information for Davis Hill. Any later change should be rechecked against current TPWD material before this page's access guidance changes. Texas Defined is not affiliated with TPWD.</p>
              <div className="mt-5">
                <h3 className="font-display text-xl">Primary-source reading list</h3>
                <ol className="mt-4 space-y-5">
                  {sources.map((source, index) => (
                    <li key={source.url} className="text-sm leading-6">
                      <span className="mr-2 text-muted-foreground">{index + 1}.</span>
                      <OfficialLink href={source.url}>{source.label}</OfficialLink>
                      <p className="mt-1 text-muted-foreground">{source.why}</p>
                    </li>
                  ))}
                </ol>
              </div>
              <p className="mt-6 border-t border-border pt-4 text-sm text-muted-foreground">
                Last independently reviewed: <time dateTime="2026-10-10">{verified}</time>. Suggested citation:
                Texas Defined Travel & Outdoors Desk, “Davis Hill State Natural Area: Access, History & Geology,”
                <span className="break-all"> texasdefined.com/destination/davis-hill-state-park</span> (accessed October 10, 2026).
              </p>
            </section>
          </article>

          <aside className="space-y-6 lg:self-start lg:sticky lg:top-28">
            <section className="border-t-2 border-foreground pt-4">
              <p className="eyebrow text-primary">At a glance</p>
              <dl className="mt-4 divide-y divide-border text-sm leading-6">
                {[
                  ["Current use", "Conservation / future natural area"],
                  ["Public entry", "No general visitor access advertised"],
                  ["County", "Liberty"],
                  ["Nearby community", "Tarkington Prairie area"],
                  ["River", "Trinity River"],
                  ["Not to be confused with", "Davis Mountains State Park"],
                ].map(([term, value]) => <div key={term} className="py-3"><dt className="font-semibold">{term}</dt><dd className="mt-1 text-muted-foreground">{value}</dd></div>)}
              </dl>
            </section>
            <section className="border-t border-border pt-5 text-sm leading-6">
              <p className="eyebrow text-primary">The authoritative status check</p>
              <p className="mt-3 text-muted-foreground">The current TPWD future-parks list governs access and development expectations. Historic park-system names may differ.</p>
              <p className="mt-4"><OfficialLink href={sources[0].url}>Official TPWD future-parks listing ↗</OfficialLink></p>
              <p className="mt-3"><OfficialLink href={sources[3].url}>Official park photo and habitat overview ↗</OfficialLink></p>
              <p className="mt-4 text-xs text-muted-foreground">TPWD photographs are linked to their original publication rather than reproduced without image-specific permission.</p>
            </section>
            <section className="border-t border-border pt-5 text-sm leading-7">
              <p className="eyebrow text-primary">Explore the connected Texas</p>
              <ul className="mt-4 space-y-3">
                <li><Link className={citationClass} to="/county/liberty">Liberty County</Link></li>
                <li><Link className={citationClass} to="/article/texas-rivers-explained">Texas rivers explained</Link></li>
                <li><Link className={citationClass} to="/explore/state-parks">Texas state parks</Link></li>
                <li><Link className={citationClass} to="/destination/davis-mountains-state-park">Davis Mountains (different park)</Link></li>
              </ul>
            </section>
          </aside>
        </div>
      </Container>
    </main>
  );
}
