import { Link } from "@tanstack/react-router";

const regions = [
  {
    eyebrow: "Piney Woods · East Texas",
    title: "Caddo homelands",
    description: "Permanent towns, agriculture, mound centers, diplomacy and trade networks stretching across the eastern woodlands.",
    href: "#east-texas-caddo-towns-agriculture-and-regional-trade",
  },
  {
    eyebrow: "Gulf Coast",
    title: "Coastal peoples",
    description: "Karankawa, Akokisa, Atakapa and other communities adapted to bays, barrier islands, marshes and coastal prairie.",
    href: "#the-gulf-coast-karankawa-and-other-coastal-peoples",
  },
  {
    eyebrow: "South Texas · northern Mexico",
    title: "Many nations, not one “Coahuiltecan” tribe",
    description: "Hundreds of named groups and several languages make the familiar blanket label a geographic shorthand, not a single ethnicity.",
    href: "#south-texas-many-peoples-hidden-by-the-word-coahuiltecan",
  },
  {
    eyebrow: "Central Texas",
    title: "Tonkawa and Lipan Apache",
    description: "A shifting middle ground where hunting, trade, diplomacy and migration connected the plains, Hill Country and South Texas.",
    href: "#central-texas-tonkawa-apache-and-a-shifting-middle-ground",
  },
  {
    eyebrow: "Southern Plains",
    title: "Comanche, Kiowa and Wichita worlds",
    description: "Horse cultures, bison economies, farming villages, diplomacy and conflict remade power across North, Central and West Texas.",
    href: "#the-southern-plains-comanche-power-remade-texas",
  },
  {
    eyebrow: "Trans-Pecos · Rio Grande",
    title: "Pueblo, Jumano and desert networks",
    description: "Rock art, farming, exchange routes and living Pueblo history connect West Texas to New Mexico and northern Mexico.",
    href: "#west-texas-and-the-rio-grande-pueblo-jumano-and-desert-networks",
  },
] as const;

const timeline = [
  ["13,000+ years ago", "People are living across landscapes that later become Texas; archaeological evidence reaches into the late Ice Age."],
  ["ca. A.D. 800", "Ancestral Caddo communities establish major civic-ceremonial centers in East Texas, including the landscape now preserved at Caddo Mounds."],
  ["1500s–1600s", "European expeditions enter already populated Native worlds; diseases and new trade goods begin reshaping regional networks."],
  ["1600s–1700s", "Horses transform Plains life; Apache and then Comanche expansion changes diplomacy, trade and territorial power."],
  ["1830s–1880s", "Republic and U.S. settlement, warfare, reservation experiments and forced removals dispossess many Native nations from Texas homelands."],
  ["Today", "Sovereign tribal governments and Native communities maintain political institutions, languages, ceremonies and cultural ties to Texas."],
] as const;

const livingNations = [
  {
    title: "Alabama-Coushatta Tribe of Texas",
    place: "Polk County · Deep East Texas",
    description: "A sovereign tribal government whose Alabama and Coushatta communities have deep roots in East Texas and maintain the state's oldest reservation.",
    tribalUrl: "https://www.alabama-coushatta.com/about-us/our-history/",
    internalHref: "/county/polk",
    internalLabel: "Explore Polk County",
  },
  {
    title: "Ysleta del Sur Pueblo",
    place: "El Paso · Lower Valley",
    description: "The Tigua Pueblo established Ysleta del Sur in 1682 and continues as a sovereign Pueblo government and living cultural community.",
    tribalUrl: "https://www.ysletadelsurpueblo.org/about-us",
    internalHref: "/destination/ysleta-del-sur-pueblo-cultural-center-museum-el-paso",
    internalLabel: "Visit the Cultural Center guide",
  },
  {
    title: "Kickapoo Traditional Tribe of Texas",
    place: "Maverick County · Eagle Pass",
    description: "A federally recognized Kickapoo nation with trust lands and its reservation community along the Rio Grande south of Eagle Pass.",
    tribalUrl: "https://kickapootexas.org/",
    internalHref: "/county/maverick",
    internalLabel: "Explore Maverick County",
  },
] as const;

const deepDives = [
  {
    slug: "caddo-texas-history-homelands-mounds-removal",
    eyebrow: "East Texas",
    title: "Caddo Texas: homelands, mounds, trade and removal",
    description: "Go deeper on Caddo agriculture, ceremonial centers, El Camino Real, French and Spanish diplomacy, epidemics and nineteenth-century removal.",
  },
  {
    slug: "comanche-texas-history-comancheria-red-river-war",
    eyebrow: "Southern Plains",
    title: "Comanche Texas: Comanchería, horses and the Red River War",
    description: "Follow the rise of Comanche power, the horse economy, trade and diplomacy, conflict with colonial and U.S. governments, and the living Comanche Nation.",
  },
  {
    slug: "living-tribal-nations-texas-today",
    eyebrow: "Living nations",
    title: "Tribal nations in Texas today",
    description: "Understand the Alabama-Coushatta Tribe of Texas, Ysleta del Sur Pueblo and the Kickapoo Traditional Tribe of Texas through their own governments and institutions.",
  },
] as const;

export function IndigenousTexasAuthorityHub() {
  return (
    <div className="relative left-1/2 mt-8 w-[min(64rem,calc(100vw-2rem))] -translate-x-1/2 space-y-10">
      <section className="border-y border-border bg-surface p-6 sm:p-8" aria-labelledby="indigenous-texas-reference">
        <p className="eyebrow text-primary">Reference hub</p>
        <h2 id="indigenous-texas-reference" className="mt-3 font-display text-3xl sm:text-4xl">
          Start with land, time and living nations—not a modern state boundary
        </h2>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          The best way to read Indigenous Texas is regionally and chronologically. Homelands crossed today's state and international borders, names changed across colonial records, and political control rarely matched the boundaries European governments drew on maps.
        </p>
        <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["13,000+", "years of documented human history"],
            ["6", "regional lenses in this guide"],
            ["3", "federally recognized tribal nations based in Texas"],
            ["Tribal + academic", "sources used together"],
          ].map(([value, label]) => (
            <div key={label} className="bg-background p-5">
              <strong className="block font-display text-3xl">{value}</strong>
              <span className="mt-2 block text-xs leading-5 text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="indigenous-regions">
        <p className="eyebrow text-primary">Explore by region</p>
        <h2 id="indigenous-regions" className="mt-2 font-display text-3xl">Six geographic frames make the history easier to understand</h2>
        <div className="mt-5 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
          {regions.map((region) => (
            <a key={region.title} href={region.href} className="group bg-background p-5 sm:p-6">
              <span className="eyebrow text-primary">{region.eyebrow}</span>
              <strong className="mt-2 block font-display text-2xl group-hover:text-primary">{region.title}</strong>
              <span className="mt-3 block text-sm leading-6 text-muted-foreground">{region.description}</span>
              <span className="mt-4 block text-sm font-semibold text-primary">Jump to section ↓</span>
            </a>
          ))}
        </div>
      </section>

      <section aria-labelledby="indigenous-timeline">
        <p className="eyebrow text-primary">Chronology at a glance</p>
        <h2 id="indigenous-timeline" className="mt-2 font-display text-3xl">A timeline that does not begin with European arrival</h2>
        <ol className="mt-5 grid gap-4">
          {timeline.map(([date, description], index) => (
            <li key={date} className="grid gap-3 border-l-2 border-primary pl-5 sm:grid-cols-[9rem_1fr] sm:items-start">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{String(index + 1).padStart(2, "0")}</span>
                <strong className="mt-1 block font-display text-xl">{date}</strong>
              </div>
              <p className="text-sm leading-7 text-muted-foreground">{description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="living-nations-texas">
        <p className="eyebrow text-primary">Living sovereign nations</p>
        <h2 id="living-nations-texas" className="mt-2 font-display text-3xl">Native Texas is present tense</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Contemporary identity and government should be sourced to the nations themselves. These three federally recognized tribal nations are based in Texas today; other nations with deep Texas homelands are headquartered elsewhere because of removal, migration and federal policy.
        </p>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {livingNations.map((nation) => (
            <article key={nation.title} className="border border-border p-5">
              <span className="eyebrow text-primary">{nation.place}</span>
              <h3 className="mt-2 font-display text-2xl">{nation.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{nation.description}</p>
              <div className="mt-5 flex flex-col gap-2 text-sm font-semibold">
                <a href={nation.tribalUrl} target="_blank" rel="noreferrer" className="text-primary underline decoration-border underline-offset-4">Official tribal site ↗</a>
                <a href={nation.internalHref} className="text-foreground underline decoration-border underline-offset-4 hover:text-primary">{nation.internalLabel} →</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="indigenous-deep-dives">
        <p className="eyebrow text-primary">Deep-dive authority guides</p>
        <h2 id="indigenous-deep-dives" className="mt-2 font-display text-3xl">Go beyond a statewide overview</h2>
        <div className="mt-5 grid gap-px overflow-hidden border border-border bg-border">
          {deepDives.map((guide) => (
            <Link key={guide.slug} to="/article/$slug" params={{ slug: guide.slug }} className="group bg-background p-5 sm:p-6">
              <span className="eyebrow text-primary">{guide.eyebrow}</span>
              <strong className="mt-2 block font-display text-2xl group-hover:text-primary">{guide.title}</strong>
              <span className="mt-3 block text-sm leading-6 text-muted-foreground">{guide.description}</span>
              <span className="mt-4 block text-sm font-semibold text-primary">Open deep dive →</span>
            </Link>
          ))}
        </div>
      </section>

      <aside className="border-l-2 border-primary pl-5" aria-label="Research approach">
        <p className="eyebrow text-primary">How to read the evidence</p>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          Tribal governments are the primary authority for contemporary identity, sovereignty and community life. Archaeology helps reconstruct much earlier periods; colonial documents provide valuable but partial outsider accounts. When those source types differ, this guide treats the disagreement or uncertainty as part of the history instead of forcing a single tidy story.
        </p>
        <a href="/sourcing-methodology" className="mt-3 inline-block text-sm font-semibold text-primary underline decoration-border underline-offset-4">TexasDefined sourcing methodology →</a>
      </aside>
    </div>
  );
}
