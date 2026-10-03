import { Link } from "@tanstack/react-router";

import { TexasRiversCitationTrust } from "@/components/content/TexasRiversCitationTrust";

const twdbMapUrl = "https://www.twdb.texas.gov/mapping/doc/maps/Major_River_Basins_8x11.pdf";

const riverProfiles = [
  { name: "Rio Grande", href: "/article/texas-rio-grande-river-guide", region: "West Texas & border", note: "International river · largest Texas basin by area", image: "/images/explore/lakes-rivers/amistad-national-recreation-area.jpg" },
  { name: "Brazos", href: "/article/texas-brazos-river-guide", region: "West & Central Texas", note: "840 river miles · major agricultural and reservoir system", image: "/images/explore/lakes-rivers/lake-somerville-birch-creek-unit.jpg" },
  { name: "Colorado", href: "/article/texas-colorado-river-guide", region: "West & Central Texas", note: "Texas-only river · Highland Lakes and Austin", image: "/images/explore/lakes-rivers/pedernales-falls-state-park.jpg" },
  { name: "Guadalupe", href: "/article/texas-guadalupe-river-guide", region: "Hill Country & Gulf Coast", note: "Spring-fed tributaries · Canyon Lake · tubing corridor", image: "/images/editorial/texas-guadalupe-river.jpg" },
  { name: "Trinity", href: "/article/texas-trinity-river-guide", region: "North Texas & Gulf Coast", note: "Entire basin in Texas · Dallas-Fort Worth water system", image: "/images/editorial/texas-trinity-river.jpg" },
] as const;

const riverRegions = [
  { title: "West Texas & the border", rivers: "Rio Grande · Pecos · Devils", description: "High desert, mountain basins, canyon country and an international river system." },
  { title: "Central Texas & the plains", rivers: "Brazos · Colorado", description: "Long cross-state systems connecting drier western country, major reservoirs and the Gulf." },
  { title: "Hill Country & South-Central Texas", rivers: "Guadalupe · Frio · Nueces · San Antonio", description: "Limestone, springs, clear water, cypress-lined reaches and aquifer-fed tributaries." },
  { title: "North Texas", rivers: "Trinity · Red", description: "Urban water supply, flood-control reservoirs and the long northern boundary with Oklahoma." },
  { title: "East Texas", rivers: "Sabine · Neches · Cypress", description: "Wetter forests, broad floodplains, bayous and river systems flowing toward Sabine Lake and the Gulf." },
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

const wideModuleStyle = {
  position: "relative",
  left: "50%",
  width: "min(calc(100vw - 2rem), 80rem)",
  transform: "translateX(-50%)",
} as const;

function TexasRiverOrientationMap() {
  return (
    <figure className="mt-7 overflow-hidden rounded-sm border border-border bg-surface">
      <div className="grid lg:grid-cols-[1.5fr_0.8fr] lg:items-stretch">
        <div className="p-4 sm:p-6 lg:p-8">
          <svg viewBox="0 0 620 500" role="img" aria-labelledby="texas-river-map-title texas-river-map-desc" className="mx-auto h-auto w-full max-w-3xl">
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
        <figcaption className="border-t border-border p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-8">
          <p className="eyebrow text-primary">Map key</p>
          <h3 className="mt-2 font-display text-2xl">Where the big systems run</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">This simplified map is for orientation rather than precise basin boundaries. It shows why Texas rivers feel so different: each crosses a different combination of rainfall, elevation, geology and climate.</p>
          <dl className="mt-6 grid grid-cols-3 gap-3">
            <div className="border-t border-border pt-3"><dt className="text-[11px] uppercase text-muted-foreground">Major basins</dt><dd className="mt-1 font-display text-2xl">15</dd></div>
            <div className="border-t border-border pt-3"><dt className="text-[11px] uppercase text-muted-foreground">Coastal basins</dt><dd className="mt-1 font-display text-2xl">8</dd></div>
            <div className="border-t border-border pt-3"><dt className="text-[11px] uppercase text-muted-foreground">Streams</dt><dd className="mt-1 font-display text-2xl">~191k mi.</dd></div>
          </dl>
          <a href={twdbMapUrl} target="_blank" rel="noreferrer" className="mt-6 inline-block text-sm font-semibold text-primary underline decoration-border underline-offset-4">Open the official TWDB basin map ↗</a>
        </figcaption>
      </div>
    </figure>
  );
}

function RiverProfileCards() {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {riverProfiles.map((river) => (
        <Link key={river.href} to={river.href} className="group overflow-hidden rounded-sm border border-border bg-background transition-colors hover:border-primary">
          <div className="aspect-[4/3] overflow-hidden bg-surface">
            <img src={river.image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
          </div>
          <div className="p-4">
            <span className="font-display text-xl group-hover:text-primary">{river.name}</span>
            <span className="mt-1 block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{river.region}</span>
            <span className="mt-2 block text-sm leading-5 text-muted-foreground">{river.note}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function TexasRiversAuthorityHub() {
  return (
    <section style={wideModuleStyle} className="mb-12 border-y border-border py-8 sm:py-10" aria-labelledby="texas-rivers-authority-heading">
      <div className="max-w-3xl">
        <p className="eyebrow text-primary">Start with the map</p>
        <h2 id="texas-rivers-authority-heading" className="mt-3 font-display text-3xl leading-tight sm:text-4xl">Texas Rivers, Region by Region</h2>
        <p className="mt-4 text-base leading-8 text-muted-foreground">Texas rivers make more sense when you see them as geographic systems rather than a list of names. The major basins cut across county lines, connect cities to distant headwaters and reveal how quickly the state changes from desert to limestone country to humid forest.</p>
      </div>

      <TexasRiverOrientationMap />

      <div className="mt-8 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-5" aria-label="Texas river regions">
        {riverRegions.map((region) => (
          <div key={region.title} className="bg-background p-4 sm:p-5">
            <h3 className="font-display text-lg leading-tight">{region.title}</h3>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-primary">{region.rivers}</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{region.description}</p>
          </div>
        ))}
      </div>

      <nav aria-label="Jump to a Texas river section" className="mt-8 border-t border-border pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="eyebrow text-muted-foreground">Jump to a river</p>
          <Link to="/article/texas-river-basins-guide" className="text-sm font-semibold text-primary underline decoration-border underline-offset-4">See all river basins →</Link>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {sectionLinks.map((item) => <a key={item.href} href={item.href} className="rounded-sm border border-border px-3 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">{item.label}</a>)}
        </div>
      </nav>
    </section>
  );
}

export function TexasRiversAfterArticle() {
  return (
    <div style={wideModuleStyle} className="mt-14 border-t border-border pt-10">
      <TexasRiversCitationTrust />

      <section className="mt-12" aria-labelledby="river-profiles-heading">
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">Keep exploring</p>
          <h2 id="river-profiles-heading" className="mt-2 font-display text-2xl sm:text-3xl">Go Deeper on Five Major Texas Rivers</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">The statewide guide gives you the big picture. These dedicated profiles follow individual river systems in more detail, including tributaries, reservoirs, landscapes and places to experience them.</p>
        </div>
        <RiverProfileCards />
      </section>

      <section className="mt-10 grid gap-4 border-t border-border pt-8 md:grid-cols-2" aria-label="Related Texas water guides">
        <Link to="/article/texas-river-basins-guide" className="group p-1"><p className="eyebrow text-primary">Understand the watershed</p><h3 className="mt-2 font-display text-xl group-hover:text-primary">Texas River Basins Explained →</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">See what land drains into each major river and why upstream changes matter downstream.</p></Link>
        <Link to="/explore/lakes-rivers" className="group border-t border-border p-1 pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-1"><p className="eyebrow text-primary">Experience the water</p><h3 className="mt-2 font-display text-xl group-hover:text-primary">Explore Texas Lakes & Rivers →</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Move from statewide geography to river parks, swimming water, reservoirs and destination guides.</p></Link>
      </section>
    </div>
  );
}
