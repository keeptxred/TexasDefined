import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

const visitorUrl = "https://zapatamuseum.com/index.php/visit-us/visitors-information";
const aboutUrl = "https://www.zapatamuseum.com/index.php/about-us";
const exhibitsUrl = "https://www.zapatamuseum.com/index.php/exhibits";
const schoolUrl = "https://zapatamuseum.com/index.php/visit-us/educational-programs";
const countyUrl = "https://www.co.zapata.tx.us/page/zapata.county.museum";
const heritageUrl = "https://texastimetravel.com/directory/zapata-county-museum-history/";
const sanYgnacioUrl = "https://texastimetravel.com/directory/san-ygnacio-historic-district-tour/";

const admission = [
  { label: "Adults", cost: "$7" },
  { label: "Seniors, 60+", cost: "$5" },
  { label: "Students, 12+ with ID", cost: "$5" },
  { label: "Children, 5–11", cost: "$4" },
  { label: "Children under 5", cost: "Free" },
  { label: "Museum members", cost: "Free" },
];

const galleries = [
  {
    title: "Old Zapata and Falcon Dam",
    detail: "The reservoir's creation changed the physical map of Zapata County. Historic photographs, objects and community memories give substance to the story of the families relocated from the original townsite.",
  },
  {
    title: "Oil, gas and the energy industry",
    detail: "Exhibits explain the geology behind regional oil and gas and the industry's growth after discoveries in 1919, when drilling camps and newly arriving workers altered the county economy.",
  },
  {
    title: "Native plants and wildlife",
    detail: "Look for specimens of the region's mammals and reptiles and the museum grounds' native-plant garden, which interprets the thornscrub ecology of South Texas and northern Mexico.",
  },
  {
    title: "Military service across centuries",
    detail: "Uniforms, medals, insignia and historical interpretation document the service of Zapata County residents from the Spanish Colonial period through more recent conflicts.",
  },
  {
    title: "Faith and borderlands communities",
    detail: "The collection includes religious objects from Old Zapata, notably 19th-century devotional tin paintings, connecting family traditions and early Catholic institutions to the local landscape.",
  },
  {
    title: "Geology and earlier inhabitants",
    detail: "Regional rocks, natural resources and archaeological material help explain the setting of early hunting and gathering societies and later settlements along the Rio Grande.",
  },
];

const sources = [
  { label: "Museum: visitor hours and admission", href: visitorUrl },
  { label: "Museum: eight-minute introductory film and tour layout", href: aboutUrl },
  { label: "Museum: current exhibit descriptions", href: exhibitsUrl },
  { label: "Museum: school and group tour policies", href: schoolUrl },
  { label: "Zapata County: museum address and contact", href: countyUrl },
  { label: "Texas Historical Commission heritage program: museum history", href: heritageUrl },
];

export default function ZapataCountyMuseumAuthority() {
  return <main>
    <Container className="pt-9 sm:pt-12">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs uppercase text-muted-foreground">
        <Link to="/">Texas Defined</Link><span aria-hidden>·</span>
        <Link to="/explore/museums">Texas museums</Link><span aria-hidden>·</span>
        <span aria-current="page">Zapata County Museum of History</span>
      </nav>
    </Container>
    <section className="relative mt-6 overflow-hidden bg-ink text-ink-foreground">
      <img src="https://www.co.zapata.tx.us/uploadedImages/zapata/Content/Page/zapata.Comm.Court.Project.Gallery/Zapata%20County%20Museum.jpg" alt="Zapata County Museum building exterior photographed for the Zapata County Commissioners Court project gallery" width={1600} height={900} decoding="async" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover opacity-65" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = "/images/zapata-county-museum-history-editorial.svg"; event.currentTarget.alt = "Original TexasDefined illustration of the Zapata County heritage region; not a photograph"; }} />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/65 to-ink/15" />
      <Container className="relative flex flex-col justify-end pb-12 pt-24" style={{ minHeight: "clamp(24rem, 52vw, 32rem)" }}>
        <p className="eyebrow text-ink-foreground/80">South Texas · Zapata County · Museum</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-tight sm:text-7xl">Zapata County Museum of History</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/85">See how the creation of Falcon Reservoir reshaped Old Zapata, and explore the region’s ranching, faith, energy, natural history and Rio Grande heritage.</p>
        <p className="mt-5 text-xs text-ink-foreground/80">Museum exterior photo: <a href="https://www.co.zapata.tx.us/page/zapata.comm.court.project.museum" target="_blank" rel="noopener noreferrer" className="underline">Zapata County Commissioners Court project gallery</a>. If unavailable, an original illustration is displayed instead.</p>
      </Container>
    </section>

    <Container className="py-12 sm:py-16">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="border-t border-border pt-4"><p className="eyebrow text-muted-foreground">Where</p><p className="mt-2 font-semibold">805 N U.S. Highway 83<br />Zapata, TX 78076</p></div>
        <div className="border-t border-border pt-4"><p className="eyebrow text-muted-foreground">Public hours</p><p className="mt-2 font-semibold">Tuesday–Friday<br />10 a.m.–4 p.m.</p></div>
        <div className="border-t border-border pt-4"><p className="eyebrow text-muted-foreground">Adult admission</p><p className="mt-2 font-semibold">$7</p><p className="text-sm text-muted-foreground">Reduced rates for seniors, students and children</p></div>
        <div className="border-t border-border pt-4"><p className="eyebrow text-muted-foreground">Call ahead</p><a className="mt-2 inline-block font-semibold underline decoration-primary underline-offset-4" href="tel:+19567658983">(956) 765-8983</a><p className="text-sm text-muted-foreground">Weekend group tours by prior appointment</p></div>
      </div>

      <div className="mt-8 flex flex-wrap gap-4 text-sm">
        <a className="border-b border-primary pb-1 font-semibold text-primary" href={visitorUrl} target="_blank" rel="noopener noreferrer">Official visiting information ↗</a>
        <a className="border-b border-primary pb-1 font-semibold text-primary" href={exhibitsUrl} target="_blank" rel="noopener noreferrer">Museum exhibits ↗</a>
        <a className="border-b border-primary pb-1 font-semibold text-primary" href="https://www.google.com/maps/search/?api=1&amp;query=805+N+US+Hwy+83+Zapata+TX+78076" target="_blank" rel="noopener noreferrer">Map and directions ↗</a>
      </div>
      <p className="mt-4 text-xs leading-6 text-muted-foreground">Hours and admission last checked October 8, 2026 against the museum’s published visitor information. Confirm before travel, especially around holidays.</p>
    </Container>

    <section className="border-y border-border py-14 sm:py-16">
      <Container className="grid gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow text-primary">The defining story</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl">Why Old Zapata matters</h2>
          <p className="mt-6 leading-8">Before there was a modern museum, a different town of Zapata stood near the Rio Grande. In the early 1950s, the construction of Falcon Dam and reservoir forced the relocation of more than 600 families. The historic townsite was largely demolished or submerged, transforming both the landscape and residents’ lives.</p>
          <p className="mt-5 leading-8">Historic photographs and artifacts were saved from Old Zapata. Preserving those materials gave later generations a way to understand the streets, families and institutions that existed before the reservoir. The museum opened in 2011 to interpret that inheritance alongside the much older history of this borderlands region.</p>
          <p className="mt-5 leading-8">This story is more than an account of a dam: it is about the lived experience of relocation, the role of the Rio Grande in cross-border communities, and the continuing importance of memory and place.</p>
        </div>
        <aside className="border-t border-border pt-5">
          <p className="eyebrow text-primary">Historical milestones</p>
          <ol className="mt-6 space-y-6">
            <li><strong className="block">Mid-1700s</strong><span className="text-sm leading-6 text-muted-foreground">Spanish-era settlement shaped communities and institutions along this stretch of the Rio Grande.</span></li>
            <li><strong className="block">1919</strong><span className="text-sm leading-6 text-muted-foreground">The county’s oil-industry story gathered momentum following early petroleum discoveries.</span></li>
            <li><strong className="block">1953</strong><span className="text-sm leading-6 text-muted-foreground">Falcon Dam and the new reservoir transformed the river corridor; Old Zapata’s families had to relocate.</span></li>
            <li><strong className="block">2011</strong><span className="text-sm leading-6 text-muted-foreground">The present-day museum opened in the relocated town.</span></li>
          </ol>
        </aside>
      </Container>
    </section>

    <Container className="py-14 sm:py-16">
      <p className="eyebrow text-primary">Collections and exhibits</p>
      <h2 className="mt-3 font-display text-4xl">What you can explore inside</h2>
      <p className="mt-5 max-w-3xl leading-8">The museum combines community-history objects with broader natural and cultural history. The subjects below come from its published exhibit descriptions; installations may change.</p>
      <p className="mt-5 max-w-3xl leading-8"><strong>Start with the introduction:</strong> The museum says escorted visitors begin in a theater near the entrance with an eight-minute film spanning the region’s geologic origins through the present. Ask staff how this presentation fits your visit, particularly if you have limited time. <a className="text-primary underline underline-offset-4" href={aboutUrl} target="_blank" rel="noopener noreferrer">Museum tour overview ↗</a></p>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {galleries.map((item, index) => <article key={item.title} className="border border-border p-6">
          <p className="eyebrow text-primary">Exhibit {String(index + 1).padStart(2, "0")}</p>
          <h3 className="mt-4 font-display text-2xl">{item.title}</h3>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.detail}</p>
        </article>)}
      </div>
      <p className="mt-6 text-sm leading-7 text-muted-foreground">For authentic exterior and exhibit photography, view the <a className="text-primary underline underline-offset-4" href={heritageUrl} target="_blank" rel="noopener noreferrer">Texas Historical Commission’s museum listing and images</a> or the <a className="text-primary underline underline-offset-4" href="https://zapatamuseum.com/index.php/photo-gallery" target="_blank" rel="noopener noreferrer">museum’s own photo gallery</a>. Images are not copied here without reuse permission.</p>
    </Container>

    <section className="border-y border-border py-14 sm:py-16">
      <Container className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow text-primary">Planning your visit</p>
          <h2 className="mt-3 font-display text-3xl">Admission and opening hours</h2>
          <p className="mt-5 leading-8">Open Tuesday through Friday, 10 a.m. to 4 p.m. The museum is closed to ordinary walk-in visits on Mondays, weekends and most national holidays. Saturday and Sunday group tours are available only by prior appointment.</p>
          <dl className="mt-6 divide-y divide-border border-y border-border">
            {admission.map(({ label, cost }) => <div key={label} className="flex items-start justify-between gap-5 py-3 text-sm"><dt>{label}</dt><dd className="font-semibold">{cost}</dd></div>)}
          </dl>
          <p className="mt-3 text-sm text-muted-foreground">Children under 12 must be accompanied by a parent. These are published prices, not a guarantee of current charges.</p>
        </div>
        <div>
          <p className="eyebrow text-primary">Groups and school trips</p>
          <h2 className="mt-3 font-display text-3xl">Plan ahead for a guided visit</h2>
          <p className="mt-5 leading-8">Docent-guided visits may be scheduled during ordinary museum hours. The museum lists a school special program on Thursdays between 10 a.m. and 4 p.m.; groups must contact the museum to arrange a date and confirm its applicable fee policy.</p>
          <p className="mt-5 leading-8">For school groups, the museum calls for one adult chaperone per ten students, an advance behavior agreement and a roster. The published instructions direct school buses to the north parking lot beside Sesquicentennial Park.</p>
          <p className="mt-5 leading-8">Contact staff for accommodation requests rather than assuming which facilities are available. The museum requests accessibility needs when a school group books.</p>
          <div className="mt-6 flex flex-wrap gap-6 text-sm font-semibold"><a href="tel:+19567658983" className="border-b border-primary pb-1 text-primary">Call museum staff</a><a href={schoolUrl} target="_blank" rel="noopener noreferrer" className="border-b border-primary pb-1 text-primary">School visit policies ↗</a></div>
        </div>
      </Container>
    </section>

    <Container className="py-14 sm:py-16">
      <p className="eyebrow text-primary">Make it a South Texas history day</p>
      <h2 className="mt-3 font-display text-4xl">Explore beyond the museum</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="border-t border-border pt-5"><h3 className="font-display text-2xl">Zapata County and Falcon Reservoir</h3><p className="mt-3 leading-7 text-muted-foreground">Use the museum to understand the communities transformed by Falcon Dam, then explore the modern lakeshore and wider county geography.</p><Link to="/$kind/$slug" params={{ kind: "county", slug: "zapata" }} className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">Explore Zapata County →</Link><p className="mt-4 text-sm">For the reservoir today, see <Link to="/fishing/lakes/falcon-international-reservoir" className="text-primary underline underline-offset-4">TexasDefined’s Falcon International Reservoir guide</Link>.</p></div>
        <div className="border-t border-border pt-5"><h3 className="font-display text-2xl">San Ygnacio Historic District</h3><p className="mt-3 leading-7 text-muted-foreground">Continue north on U.S. 83 to experience the surviving sandstone architecture and borderlands heritage of historic San Ygnacio.</p><a href={sanYgnacioUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">Historical site visitor details ↗</a></div>
      </div>
    </Container>

    <section className="border-t border-border py-12">
      <Container>
        <p className="eyebrow text-primary">Sources and editorial standard</p>
        <h2 className="mt-3 font-display text-3xl">How this guide was verified</h2>
        <p className="mt-4 max-w-3xl leading-7">TexasDefined editorial research · Last checked October 8, 2026. Museum hours, admission, tour policies and exhibit topics are attributed to the museum and Zapata County; historical context is cross-checked against the Texas Historical Commission's heritage tourism program. Exhibit availability and operating details can change without notice.</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {sources.map((source) => <li key={source.href}><a className="text-sm underline text-primary" href={source.href} target="_blank" rel="noopener noreferrer">{source.label} ↗</a></li>)}
        </ul>
        <p className="mt-8 text-xs text-muted-foreground">Recommended citation: TexasDefined. “Zapata County Museum of History: Exhibits, Hours &amp; Admission.” Verified October 8, 2026. https://texasdefined.com/destination/zapata-county-museum-history</p>
      </Container>
    </section>
  </main>;
}
