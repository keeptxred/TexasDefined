import { Link } from "@tanstack/react-router";

const twdbMapUrl = "https://www.twdb.texas.gov/mapping/doc/maps/Major_River_Basins_8x11.pdf";

const riverProfiles = [
  { name: "Rio Grande", href: "/article/texas-rio-grande-river-guide", region: "West Texas & border", note: "International river · largest Texas basin by area" },
  { name: "Brazos", href: "/article/texas-brazos-river-guide", region: "West & Central Texas", note: "840 river miles · major agricultural and reservoir system" },
  { name: "Colorado", href: "/article/texas-colorado-river-guide", region: "West & Central Texas", note: "Texas-only river · Highland Lakes and Austin" },
  { name: "Guadalupe", href: "/article/texas-guadalupe-river-guide", region: "Hill Country & Gulf Coast", note: "Spring-fed tributaries · Canyon Lake · tubing corridor" },
  { name: "Trinity", href: "/article/texas-trinity-river-guide", region: "North Texas & Gulf Coast", note: "Entire basin in Texas · Dallas-Fort Worth water system" },
] as const;

const sectionLinks = [
  { label: "Rio Grande", href: "#the-rio-grande-border-river-desert-river-and-international-river" },
  { label: "Brazos", href: "#the-brazos-a-river-through-the-middle-of-texas-history" },
  { label: "Colorado", href: "#the-colorado-the-texas-river-not-the-grand-canyon-river" },
  { label: "Guadalupe", href: "#the-guadalupe-the-river-most-texans-learn-by-getting-in-it" },
  { label: "Nueces & Frio", href: "#the-nueces-and-frio-clear-water-in-dry-country" },
  { label: "San Antonio", href: "#the-san-antonio-a-city-river-with-a-much-longer-life" },
  { label: "Trinity", href: "#the-trinity-north-texas-water-headed-for-the-coast" },
  { label: "Sabine & Neches", href: "#the-sabine-and-neches-east-texas-runs-wetter" },
  { label: "Red, Canadian, Sulphur & Cypress", href: "#the-red-canadian-sulphur-and-cypress-systems-point-north-and-east" },
  { label: "San Jacinto & Lavaca", href: "#the-san-jacinto-and-lavaca-prove-a-river-does-not-have-to-be-long-to-matter" },
] as const;

const placeLinks = [
  { label: "Guadalupe River State Park", href: "/destination/guadalupe-river-state-park", river: "Guadalupe" },
  { label: "Devils River State Natural Area", href: "/destination/devils-river-state-natural-area", river: "Rio Grande system" },
  { label: "South Llano River State Park", href: "/destination/south-llano-river-state-park", river: "Colorado system" },
  { label: "Garner State Park", href: "/destination/garner-state-park", river: "Frio" },
  { label: "Pedernales Falls State Park", href: "/destination/pedernales-falls-state-park", river: "Colorado system" },
  { label: "Caddo Lake", href: "/destination/caddo-lake", river: "Cypress system" },
] as const;

function TexasRiverOrientationMap() {
  return (
    <figure className="mt-8 overflow-hidden rounded-sm border border-border bg-surface">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="p-4 sm:p-6">
          <svg viewBox="0 0 620 500" role="img" aria-labelledby="texas-river-map-title texas-river-map-desc" className="h-auto w-full">
            <title id="texas-river-map-title">Orientation map of major Texas river systems</title>
            <desc id="texas-river-map-desc">A simplified Texas outline with approximate paths for the Rio Grande, Brazos, Colorado, Guadalupe, Trinity, Red, Sabine, Neches and Nueces river systems.</desc>
            <path d="M126 38H292V99H357L383 119L447 123L471 145L516 151L536 185L548 229L538 273L553 312L532 352L502 367L476 394L446 409L420 447L380 458L350 438L319 410L280 390L241 362L201 332L172 299L144 263L116 233L86 213L67 177L73 133L103 110Z" fill="currentColor" className="text-primary" opacity="0.15" stroke="currentColor" strokeWidth="3" />
            <path d="M126 38H292V99" fill="none" stroke="currentColor" strokeWidth="2" className="text-border" />
            <path d="M77 191C96 219 121 248 145 279C170 312 194 340 223 364C259 395 303 422 347 443" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-primary" />
            <path d="M156 102C195 127 237 151 278 184C318 216 347 252 375 294C399 331 423 362 458 393" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-primary" opacity="0.85" />
            <path d="M125 132C177 150 216 173 252 205C285 234 306 270 336 306C365 341 390 372 421 407" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-primary" opacity="0.75" />
            <path d="M245 208C274 229 297 250 318 281C340 313 358 343 386 374" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-primary" opacity="0.7" />
            <path d="M354 148C383 171 404 198 420 228C437 259 451 291 475 324" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-primary" opacity="0.8" />
            <path d="M292 80C357 96 422 102 492 126" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-primary" opacity="0.7" />
            <path d="M476 148C487 180 494 214 500 252C505 282 510 310 520 338" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-primary" opacity="0.7" />
            <path d="M455 159C465 193 469 224 473 258C478 286 483 309 492 337" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-primary" opacity="0.6" />
            <path d="M260 250C277 270 292 296 306 323C320 346 335 364 352 382" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-primary" opacity="0.65" />
            <g className="fill-foreground font-semibold" style={{ fontSize: "13px" }}>
              <text x="92" y="248">Rio Grande</text>
              <text x="198" y="176">Colorado</text>
              <text x="288" y="198">Brazos</text>
              <text x="324" y="300">Guadalupe</text>
              <text x="397" y="216">Trinity</text>
              <text x="351" y="90">Red</text>
              <text x="489" y="201">Sabine</text>
              <text x="454" y="245">Neches</text>
              <text x="248" y="337">Nueces</text>
            </g>
          </svg>
        </div>
        <figcaption className="border-t border-border p-5 text-sm leading-6 text-muted-foreground lg:border-l lg:border-t-0">
          <p className="font-semibold text-foreground">Orientation map</p>
          <p className="mt-2">Approximate river paths are shown to help readers orient themselves. Basin boundaries and legal/geographic analysis should use the official Texas Water Development Board map.</p>
          <a href={twdbMapUrl} target="_blank" rel="noreferrer" className="mt-4 inline-block font-semibold text-primary underline decoration-border underline-offset-4">Open the official TWDB basin map ↗</a>
        </figcaption>
      </div>
    </figure>
  );
}

function RiverProfilesList({ compact = false }: { compact?: boolean }) {
  return (
    <ul className={compact ? "mt-4 divide-y divide-border border-y border-border" : "grid sm:grid-cols-2"}>
      {riverProfiles.map((river, index) => (
        <li key={river.href} className={compact ? "py-3" : `border-b border-border py-5 sm:px-5 ${index % 2 === 1 ? "sm:border-l" : ""}`}>
          <Link to={river.href} className="group block">
            <span className={compact ? "font-semibold group-hover:text-primary" : "font-display text-2xl group-hover:text-primary"}>{river.name}</span>
            <span className="mt-1 block text-xs font-semibold uppercase text-muted-foreground">{river.region}</span>
            {!compact && <span className="mt-2 block text-sm leading-6 text-muted-foreground">{river.note}</span>}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function TexasRiversAuthorityHub() {
  return (
    <section className="relative mb-10 border-y border-border py-8 sm:py-10" aria-labelledby="texas-rivers-authority-heading">
      <aside className="hidden 2xl:block" style={{ left: "calc(100% + 2rem)", position: "absolute", top: "0", width: "18rem" }} aria-labelledby="river-profile-rail-heading">
        <div className="sticky top-8 rounded-sm border border-border bg-background p-5">
          <p className="eyebrow text-primary">Explore individual rivers</p>
          <h2 id="river-profile-rail-heading" className="mt-2 font-display text-xl">Dedicated river profiles</h2>
          <RiverProfilesList compact />
          <Link to="/texas-explained" className="mt-4 inline-block text-sm font-semibold text-primary underline decoration-border underline-offset-4">Texas Explained collection →</Link>
        </div>
      </aside>

      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="eyebrow text-primary">Texas rivers at a glance</p>
          <h2 id="texas-rivers-authority-heading" className="mt-3 font-display text-3xl leading-tight sm:text-4xl">Start with the statewide river map</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">Texas Water Development Board data divides the state into 15 major river basins plus eight coastal basins. Use this overview to orient yourself, then jump directly to the river you want to understand.</p>
        </div>
        <dl className="grid grid-cols-3 gap-3 lg:grid-cols-1">
          <div className="border-t border-border pt-3"><dt className="text-xs uppercase text-muted-foreground">Major basins</dt><dd className="mt-1 font-display text-3xl">15</dd></div>
          <div className="border-t border-border pt-3"><dt className="text-xs uppercase text-muted-foreground">Coastal basins</dt><dd className="mt-1 font-display text-3xl">8</dd></div>
          <div className="border-t border-border pt-3"><dt className="text-xs uppercase text-muted-foreground">Texas streams</dt><dd className="mt-1 font-display text-3xl">~191k mi.</dd></div>
        </dl>
      </div>

      <TexasRiverOrientationMap />

      <nav aria-label="Jump to a Texas river section" className="mt-8">
        <p className="eyebrow text-muted-foreground">Jump to a river</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {sectionLinks.map((item) => <a key={item.href} href={item.href} className="rounded-sm border border-border px-3 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">{item.label}</a>)}
        </div>
      </nav>
    </section>
  );
}

export function TexasRiversAfterArticle() {
  return (
    <div className="mt-14 space-y-12">
      <section aria-labelledby="river-profiles-heading">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <p className="eyebrow text-primary">Explore individual rivers</p>
            <h2 id="river-profiles-heading" className="mt-2 font-display text-2xl sm:text-3xl">Dedicated Texas Defined river profiles</h2>
          </div>
          <Link to="/texas-explained" className="text-sm font-semibold text-primary underline decoration-border underline-offset-4">Texas Explained collection →</Link>
        </div>
        <RiverProfilesList />
      </section>

      <section className="grid gap-5 md:grid-cols-2" aria-label="Choose the Texas water guide you need">
        <Link to="/article/texas-river-basins-guide" className="group border border-border p-5 hover:border-primary"><p className="eyebrow text-primary">Need watershed boundaries?</p><h3 className="mt-2 font-display text-2xl group-hover:text-primary">Texas River Basins Explained →</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Use the basin guide when the question is drainage, watershed boundaries, coastal basins or how upstream land connects to downstream water.</p></Link>
        <Link to="/article/texas-lakes-reservoirs-explained" className="group border border-border p-5 hover:border-primary"><p className="eyebrow text-primary">Need dams and lakes?</p><h3 className="mt-2 font-display text-2xl group-hover:text-primary">Texas Lakes & Reservoirs Explained →</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Use the reservoir guide for stored water, dams, flood control and why so many familiar Texas lakes are managed river systems.</p></Link>
        <Link to="/article/texas-aquifers-springs-explained" className="group border border-border p-5 hover:border-primary"><p className="eyebrow text-primary">Need groundwater?</p><h3 className="mt-2 font-display text-2xl group-hover:text-primary">Texas Aquifers & Springs Explained →</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Use the aquifer guide to understand spring flow, groundwater connections and why some Central Texas rivers stay clear between storms.</p></Link>
        <Link to="/explore/lakes-rivers" className="group border border-border p-5 hover:border-primary"><p className="eyebrow text-primary">Want somewhere to go?</p><h3 className="mt-2 font-display text-2xl group-hover:text-primary">Explore Texas Lakes & Rivers →</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Move from the statewide explanation to river parks, swimming water, reservoirs and destination guides.</p></Link>
      </section>

      <section aria-labelledby="river-places-heading">
        <p className="eyebrow text-primary">Plan a river trip</p>
        <h2 id="river-places-heading" className="mt-2 font-display text-2xl sm:text-3xl">Places to experience Texas rivers</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">These parks and destinations let you see the statewide river story on the ground, from clear Hill Country water to desert tributaries and East Texas wetlands.</p>
        <ul className="mt-5 grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {placeLinks.map((place) => <li key={place.href} className="border-b border-border py-4 sm:px-4"><Link to={place.href} className="group block"><span className="font-semibold group-hover:text-primary">{place.label}</span><span className="mt-1 block text-xs uppercase text-muted-foreground">{place.river}</span></Link></li>)}
        </ul>
      </section>
    </div>
  );
}
