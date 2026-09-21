import { Link } from "@tanstack/react-router";

const twdbBasinsUrl = "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/index.asp";
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

const basinRows = [
  ["Brazos", "42,865", "840", "6,074,000"],
  ["Canadian", "12,865", "213", "196,000"],
  ["Colorado", "39,428", "865", "1,904,000"],
  ["Cypress", "2,929", "75", "493,700"],
  ["Guadalupe", "5,953", "409", "1,422,000"],
  ["Lavaca", "2,309", "117", "277,000"],
  ["Neches", "9,937", "416", "4,323,000"],
  ["Nueces", "16,700", "315", "539,700"],
  ["Red", "24,297", "695", "3,464,000"],
  ["Rio Grande", "49,387", "889", "645,500"],
  ["Sabine", "7,570", "360", "5,864,000"],
  ["San Antonio", "4,180", "238", "562,700"],
  ["San Jacinto", "3,936", "85", "1,365,000"],
  ["Sulphur", "3,580", "200", "932,700"],
  ["Trinity", "17,913", "550", "5,727,000"],
] as const;

const placeLinks = [
  { label: "Guadalupe River State Park", href: "/destination/guadalupe-river-state-park", river: "Guadalupe" },
  { label: "Devils River State Natural Area", href: "/destination/devils-river-state-natural-area", river: "Rio Grande system" },
  { label: "South Llano River State Park", href: "/destination/south-llano-river-state-park", river: "Colorado system" },
  { label: "Garner State Park", href: "/state-park/garner-state-park", river: "Frio" },
  { label: "Pedernales Falls State Park", href: "/state-park/pedernales-falls-state-park", river: "Colorado system" },
  { label: "Caddo Lake State Park", href: "/state-park/caddo-lake-state-park", river: "Cypress system" },
] as const;

function TexasRiverOrientationMap() {
  return (
    <figure className="mt-8 overflow-hidden rounded-sm border border-border bg-surface">
      <div className="grid lg:grid-cols-[minmax(0,1.25fr)_18rem]">
        <div className="p-4 sm:p-6">
          <svg viewBox="0 0 620 500" role="img" aria-labelledby="texas-river-map-title texas-river-map-desc" className="h-auto w-full">
            <title id="texas-river-map-title">Orientation map of major Texas river systems</title>
            <desc id="texas-river-map-desc">A simplified Texas outline with approximate paths for the Rio Grande, Brazos, Colorado, Guadalupe, Trinity, Red, Sabine, Neches and Nueces river systems.</desc>
            <path d="M126 38H292V99H357L383 119L447 123L471 145L516 151L536 185L548 229L538 273L553 312L532 352L502 367L476 394L446 409L420 447L380 458L350 438L319 410L280 390L241 362L201 332L172 299L144 263L116 233L86 213L67 177L73 133L103 110Z" fill="currentColor" className="text-muted/35" stroke="currentColor" strokeWidth="3" />
            <path d="M126 38H292V99" fill="none" stroke="currentColor" strokeWidth="2" className="text-border" />
            <path d="M77 191C96 219 121 248 145 279C170 312 194 340 223 364C259 395 303 422 347 443" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-primary" />
            <path d="M156 102C195 127 237 151 278 184C318 216 347 252 375 294C399 331 423 362 458 393" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-primary/85" />
            <path d="M125 132C177 150 216 173 252 205C285 234 306 270 336 306C365 341 390 372 421 407" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-primary/75" />
            <path d="M245 208C274 229 297 250 318 281C340 313 358 343 386 374" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-primary/70" />
            <path d="M354 148C383 171 404 198 420 228C437 259 451 291 475 324" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-primary/80" />
            <path d="M292 80C357 96 422 102 492 126" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-primary/70" />
            <path d="M476 148C487 180 494 214 500 252C505 282 510 310 520 338" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-primary/70" />
            <path d="M455 159C465 193 469 224 473 258C478 286 483 309 492 337" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-primary/60" />
            <path d="M260 250C277 270 292 296 306 323C320 346 335 364 352 382" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-primary/65" />
            <g className="fill-foreground font-sans text-[13px] font-semibold">
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

export function TexasRiversAuthorityHub() {
  return (
    <section className="mb-12 border-y border-border py-10" aria-labelledby="texas-rivers-authority-heading">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-start">
        <div>
          <p className="eyebrow text-primary">Texas river atlas</p>
          <h2 id="texas-rivers-authority-heading" className="mt-3 font-display text-3xl leading-tight sm:text-4xl">See the whole river system before reading it river by river</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">Texas Water Development Board data divides the state into 15 major river basins plus eight coastal basins. This page is the statewide starting point: use the map and table for orientation, then jump to a river section or open one of the dedicated river profiles.</p>
        </div>
        <dl className="grid grid-cols-3 gap-3 lg:grid-cols-1">
          <div className="border-t border-border pt-3"><dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Major basins</dt><dd className="mt-1 font-display text-3xl">15</dd></div>
          <div className="border-t border-border pt-3"><dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Coastal basins</dt><dd className="mt-1 font-display text-3xl">8</dd></div>
          <div className="border-t border-border pt-3"><dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Texas streams</dt><dd className="mt-1 font-display text-3xl">~191k mi.</dd></div>
        </dl>
      </div>

      <TexasRiverOrientationMap />

      <nav aria-label="Jump to a Texas river section" className="mt-8">
        <p className="eyebrow text-muted-foreground">Jump to a river</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {sectionLinks.map((item) => <a key={item.href} href={item.href} className="rounded-full border border-border px-3 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">{item.label}</a>)}
        </div>
      </nav>

      <section className="mt-10" aria-labelledby="river-profiles-heading">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4">
          <div><p className="eyebrow text-primary">Go deeper</p><h3 id="river-profiles-heading" className="mt-2 font-display text-2xl sm:text-3xl">Dedicated Texas Defined river profiles</h3></div>
          <Link to="/texas-explained" className="text-sm font-semibold text-primary underline decoration-border underline-offset-4">Texas Explained collection →</Link>
        </div>
        <ul className="grid sm:grid-cols-2">
          {riverProfiles.map((river, index) => <li key={river.href} className={`border-b border-border py-5 sm:px-5 ${index % 2 === 1 ? "sm:border-l" : ""}`}>
            <Link to={river.href} className="group block">
              <span className="font-display text-2xl group-hover:text-primary">{river.name}</span>
              <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">{river.region}</span>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">{river.note}</span>
            </Link>
          </li>)}
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="basin-table-heading">
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">At a glance</p>
          <h3 id="basin-table-heading" className="mt-2 font-display text-2xl sm:text-3xl">Texas' 15 major river basins compared</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">Basin area and river-length figures below are the Texas portions reported by the Texas Water Development Board. Average flow is reported in acre-feet per year. The numbers explain why a physically huge basin is not necessarily a high-flow river system.</p>
        </div>
        <div className="mt-5 overflow-x-auto border border-border">
          <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
            <thead className="bg-surface text-xs uppercase tracking-[0.1em] text-muted-foreground"><tr><th className="px-4 py-3">Basin</th><th className="px-4 py-3 text-right">Area in Texas (sq. mi.)</th><th className="px-4 py-3 text-right">River in Texas (mi.)</th><th className="px-4 py-3 text-right">Avg. flow (acre-ft/yr)</th></tr></thead>
            <tbody>{basinRows.map((row) => <tr key={row[0]} className="border-t border-border"><th scope="row" className="px-4 py-3 font-semibold text-foreground">{row[0]}</th><td className="px-4 py-3 text-right tabular-nums text-muted-foreground">{row[1]}</td><td className="px-4 py-3 text-right tabular-nums text-muted-foreground">{row[2]}</td><td className="px-4 py-3 text-right tabular-nums text-muted-foreground">{row[3]}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="mt-3 text-xs leading-5 text-muted-foreground">Source: <a href={twdbBasinsUrl} target="_blank" rel="noreferrer" className="font-semibold text-foreground underline decoration-border underline-offset-4">Texas Water Development Board river-basin summaries ↗</a>.</p>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-2" aria-label="Choose the Texas water guide you need">
        <Link to="/article/texas-river-basins-guide" className="group border border-border p-5 hover:border-primary"><p className="eyebrow text-primary">Need watershed boundaries?</p><h3 className="mt-2 font-display text-2xl group-hover:text-primary">Texas River Basins Explained →</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Use the basin guide when the question is drainage, watershed boundaries, coastal basins or how upstream land connects to downstream water.</p></Link>
        <Link to="/article/texas-lakes-reservoirs-explained" className="group border border-border p-5 hover:border-primary"><p className="eyebrow text-primary">Need dams and lakes?</p><h3 className="mt-2 font-display text-2xl group-hover:text-primary">Texas Lakes & Reservoirs Explained →</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Use the reservoir guide for stored water, dams, flood control and why so many familiar Texas lakes are managed river systems.</p></Link>
        <Link to="/article/texas-aquifers-springs-explained" className="group border border-border p-5 hover:border-primary"><p className="eyebrow text-primary">Need groundwater?</p><h3 className="mt-2 font-display text-2xl group-hover:text-primary">Texas Aquifers & Springs Explained →</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Use the aquifer guide to understand spring flow, groundwater connections and why some Central Texas rivers stay clear between storms.</p></Link>
        <Link to="/explore/lakes-rivers" className="group border border-border p-5 hover:border-primary"><p className="eyebrow text-primary">Want somewhere to go?</p><h3 className="mt-2 font-display text-2xl group-hover:text-primary">Explore Texas Lakes & Rivers →</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Move from the statewide explanation to river parks, swimming water, reservoirs and destination guides.</p></Link>
      </section>

      <section className="mt-10" aria-labelledby="river-places-heading">
        <p className="eyebrow text-primary">Follow the water into Texas</p>
        <h3 id="river-places-heading" className="mt-2 font-display text-2xl sm:text-3xl">River places connected to the statewide story</h3>
        <ul className="mt-5 grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {placeLinks.map((place) => <li key={place.href} className="border-b border-border py-4 sm:px-4"><Link to={place.href} className="group block"><span className="font-semibold group-hover:text-primary">{place.label}</span><span className="mt-1 block text-xs uppercase tracking-[0.1em] text-muted-foreground">{place.river}</span></Link></li>)}
        </ul>
      </section>
    </section>
  );
}
