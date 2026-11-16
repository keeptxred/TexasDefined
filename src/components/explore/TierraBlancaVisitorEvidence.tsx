import type { ReactNode } from "react";

/**
 * Distinctive visitor evidence for the Tierra Blanca Creek article.
 * The regional map is OpenStreetMap, NOT a surveyed creek/access route;
 * FWS pin is the publicly advertised refuge entrance only.
 * Historical archaeology locations and private riverbanks are intentionally not mapped.
 */
const fwsEntrance = "https://www.fws.gov/refuge/buffalo-lake/visit-us";
const fwsTrails = "https://www.fws.gov/refuge/buffalo-lake/visit-us/trails";
const parkMap = "https://tpwd.texas.gov/state-parks/palo-duro-canyon/map";
const historicalPhotograph = "https://texashistory.unt.edu/ark:/67531/metapth13553/";

function SourceLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">{children}</a>;
}

const trailChoices = [
  { name: "Prairie Dog Trail", publishedDistance: "0.25 mile (description)", effort: "Easy; crushed caliche", access: "FM 168 Prairie Dog Town parking area", why: "Best short wildlife stop. FWS describes its surface as ADA-compliant; confirm current conditions." },
  { name: "Cottonwood Canyon Birding Trail", publishedDistance: "1 mile (description)", effort: "Moderate; natural dirt and grass", access: "Parking below the Overlook; north trail", why: "Old lakebed, cottonwoods and birding; uneven terrain on upper section." },
  { name: "Cottonwood Hiking Trail", publishedDistance: "1.25 miles (description)", effort: "Moderate; natural surface", access: "Parking below the Overlook; south trail", why: "Old lakebed, cottonwoods; optional connection to Grassland Loop." },
  { name: "Grassland Loop", publishedDistance: "2 miles (description)", effort: "Challenging; uneven dirt and caliche", access: "Overlook", why: "Higher prairie terrain and caprock; not a good accessible-surface substitute." },
] as const;

export function TierraBlancaVisitorEvidence() {
  return <>
    <section className="border-b border-border py-10" aria-labelledby="tierra-blanca-map">
      <p className="eyebrow text-primary">Geography without invented access</p>
      <h2 id="tierra-blanca-map" className="mt-2 font-display text-3xl">Find the real public entrances—and see where the creek belongs</h2>
      <p className="mt-4 max-w-4xl text-base leading-8">Tierra Blanca Creek rises in New Mexico's Curry County, enters Texas in Deaf Smith County, then crosses Randall County toward the Palo Duro Creek confluence northeast of Canyon. The Texas State Historical Association describes an approximately 75-mile east-northeast reach through Texas. Buffalo Lake refuge is on the upper creek; the red cliffs in the state park are farther downstream along the Prairie Dog Town Fork of the Red River.</p>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">Map shown at regional scale. The single marker identifies the <strong>USFWS-published Buffalo Lake refuge entrance</strong>, not a creek-bank trailhead, archaeological site or continuous public waterway route. OpenStreetMap is a geographic reference, not an authoritative boundary or safe-navigation source. Check agency maps at each entrance.</p>
      {/* This source-coordinate orientation is always visible. The third-party
          map below may be unavailable in browsers that block external tiles. */}
      <div data-tierra-blanca-orientation className="mt-6 border border-border p-4">
        <p className="text-sm font-semibold">Reliable geographic orientation, even without third-party map tiles</p>
        <svg data-tierra-blanca-orientation-map role="img" aria-labelledby="tierra-map-title tierra-map-description"
          className="mt-3 w-full" viewBox="0 0 860 320" style={{ background: "#f5f3ed" }}>
          <title id="tierra-map-title">North-up location comparison: Buffalo Lake refuge entrance west of Palo Duro Canyon State Park headquarters</title>
          <desc id="tierra-map-description">Positions plotted proportionally from official agency coordinates: Buffalo Lake refuge entrance 34.919517 north, 102.111118 west; Palo Duro Canyon State Park headquarters 34.984709 north, 101.701867 west. Orientation only. This drawing shows no creek route, road, path, public property boundary or artifact location.</desc>
          <rect width="860" height="320" fill="#f5f3ed" />
          <text x="52" y="43" fontSize="22" fontWeight="700" fill="#4a443d">WEST</text>
          <text x="742" y="43" fontSize="22" fontWeight="700" fill="#4a443d">EAST</text>
          <text x="422" y="43" fontSize="22" textAnchor="middle" fill="#4a443d">N ↑</text>
          <line x1="48" y1="85" x2="812" y2="85" stroke="#d4c9bb" strokeWidth="2" />
          <line x1="48" y1="278" x2="812" y2="278" stroke="#d4c9bb" strokeWidth="2" />
          <circle cx="194" cy="217" r="14" fill="#256a60" stroke="white" strokeWidth="4" />
          <text x="217" y="205" fontSize="24" fontWeight="700" fill="#274b45">Buffalo Lake NWR</text>
          <text x="217" y="234" fontSize="18" fill="#384e49">official public entrance</text>
          <circle cx="700" cy="132" r="14" fill="#a7552e" stroke="white" strokeWidth="4" />
          <text x="670" y="120" textAnchor="end" fontSize="24" fontWeight="700" fill="#763b23">Palo Duro Canyon</text>
          <text x="670" y="149" textAnchor="end" fontSize="18" fill="#763b23">state park headquarters</text>
          <text x="52" y="303" fontSize="16" fill="#4a443d">North-up coordinate plot • Not a route or access map</text>
        </svg>
        <p className="mt-3 text-sm leading-7 text-muted-foreground"><strong>West:</strong> Buffalo Lake refuge entrance (USFWS: 34.919517, -102.111118). <strong>East:</strong> Palo Duro Canyon park headquarters (TPWD: 34.984709, -101.701867). These are two officially published public facilities, not creek-bank access points. Only their relative positions are drawn; no road, trail or stream course is inferred.</p>
      </div>
      <div className="mt-6 overflow-hidden border border-border">
        <iframe title="OpenStreetMap regional context showing Canyon, Umbarger, Buffalo Lake refuge and the Palo Duro Canyon region, with a marker at the official refuge entrance" src="https://www.openstreetmap.org/export/embed.html?bbox=-102.34%2C34.80%2C-101.51%2C35.29&amp;layer=mapnik&amp;marker=34.919517%2C-102.111118" loading="lazy" referrerPolicy="no-referrer" className="aspect-video w-full" />
      </div>
      <nav aria-label="Authoritative map and directions sources" className="mt-5 flex flex-wrap gap-6 text-sm">
        <SourceLink href="https://www.openstreetmap.org/?mlat=34.919517&amp;mlon=-102.111118#map=10/35.05/-101.92">Explore the regional map</SourceLink>
        <SourceLink href={fwsEntrance}>USFWS visitor entrance and regulations</SourceLink>
        <SourceLink href={parkMap}>TPWD state park entrance and trail map</SourceLink>
      </nav>
      <p className="mt-5 text-sm leading-7 text-muted-foreground">Why not plot the entire creek as a driving or hiking route? Its course crosses multiple property boundaries and a mapped watercourse does not provide a lawful right of entry. Nor do historical descriptions of arrowhead finds authorize artifact collecting. We intentionally omit private access points and sensitive archaeological coordinates.</p>
    </section>

    <section className="border-b border-border py-10" aria-labelledby="tierra-blanca-photo-evidence">
      <p className="eyebrow text-primary">What the upper drainage actually looks like</p>
      <h2 id="tierra-blanca-photo-evidence" className="mt-2 font-display text-3xl">The grassland and old lakebed are part of the story, not a second Palo Duro</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <figure>
          <img src="https://www.fws.gov/sites/default/files/styles/max_1300x1300/public/images/2024-07/buffalo-lake-snowscape.jpg?itok=HkeBOb3Z" width={1300} height={975} loading="lazy" decoding="async" className="aspect-video w-full object-cover" alt="Buffalo Lake National Wildlife Refuge in winter, showing pale grasses and a shallow eroded depression under a gray sky" />
          <figcaption className="mt-3 text-sm leading-6 text-muted-foreground"><strong>Buffalo Lake refuge in winter.</strong> The refuge protects actual upper-drainage terrain; water is not always present. Christena Stephens, U.S. Fish &amp; Wildlife Service, 2016. <SourceLink href="https://www.fws.gov/media/buffalo-lake-winter">Verified public-domain media record and credit</SourceLink>.</figcaption>
        </figure>
        <figure>
          <img src="https://www.fws.gov/sites/default/files/styles/max_1300x1300/public/2021-06/rio_grande_wild_turkey_pair_buffalo_lake_nwr_robert_burton_usfws.jpg?itok=QaosMrLg" width={1300} height={867} loading="lazy" decoding="async" className="aspect-video w-full object-cover" alt="Two Rio Grande wild turkeys standing in refuge grassland, one displaying a fanned tail" />
          <figcaption className="mt-3 text-sm leading-6 text-muted-foreground"><strong>Wildlife of the upper creek region.</strong> Two Rio Grande turkeys photographed at Buffalo Lake refuge. Robert Burton/USFWS; <SourceLink href="https://www.fws.gov/media/rio-grande-turkeys-buffalo-lake-refuge">public-domain image and original source</SourceLink>.</figcaption>
        </figure>
      </div>
      <p className="mt-5 text-sm leading-7 text-muted-foreground">The photographs above document the <em>refuge</em>; neither is represented as an exact creek channel or an archaeological discovery location. The 1965 Tierra Blanca flood is also documented in <SourceLink href={historicalPhotograph}>a named historic photograph held by UNT's Portal to Texas History</SourceLink>. We link rather than reproduce that archive image because its reuse rights require separate review.</p>
    </section>

    <section className="border-b border-border py-10" aria-labelledby="tierra-blanca-visit-decision">
      <p className="eyebrow text-primary">Actually useful trip choices</p>
      <h2 id="tierra-blanca-visit-decision" className="mt-2 font-display text-3xl">Which public walk fits your group?</h2>
      <p className="mt-4 text-base leading-8">USFWS has four named walks on the refuge. The trail descriptions and shorter trail-card distances on its own webpage are not completely consistent, so the lengths below are <strong>the descriptive values printed by FWS</strong> rather than verified GPS distances. Check entrance signs and the official trail page before committing to a route.</p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <caption className="pb-4 text-left text-sm text-muted-foreground">Distances and difficulty from U.S. Fish &amp; Wildlife Service's Buffalo Lake trail descriptions, checked November 15, 2026.</caption>
          <thead className="border-b border-border"><tr><th scope="col" className="p-3">Public trail</th><th scope="col" className="p-3">FWS description</th><th scope="col" className="p-3">Start</th><th scope="col" className="p-3">Who should choose it?</th></tr></thead>
          <tbody className="divide-y divide-border">
            {trailChoices.map(trail => <tr key={trail.name}><th scope="row" className="p-3 font-semibold">{trail.name}</th><td className="p-3">{trail.publishedDistance}; {trail.effort}</td><td className="p-3">{trail.access}</td><td className="p-3">{trail.why}</td></tr>)}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm leading-7 text-muted-foreground"><strong>Access note:</strong> The FWS descriptive entry calls the Prairie Dog Trail ADA-compliant; other trails are described as natural and uneven. That does not guarantee every parking surface, restroom or trail segment meets an individual visitor's access needs today. For up-to-date mobility accommodations and trail conditions, call the refuge at <a className="text-primary underline underline-offset-4" href="tel:+18064993382">(806) 499-3382</a>.</p>
      <div className="mt-5 flex flex-wrap gap-6 text-sm"><SourceLink href={fwsTrails}>Full official trail descriptions</SourceLink><SourceLink href="https://www.fws.gov/refuge/buffalo-lake/visit-us/activities">Campground and activity details</SourceLink><SourceLink href="https://www.fws.gov/refuge/buffalo-lake/visit-us/rules-policies">Refuge rules</SourceLink></div>
    </section>

    <section className="border-b border-border py-10" aria-labelledby="tierra-blanca-road-plan">
      <p className="eyebrow text-primary">No false drive-time promise</p>
      <h2 id="tierra-blanca-road-plan" className="mt-2 font-display text-3xl">Build the Amarillo–Umbarger–Canyon outing around what is open</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <div className="border border-border p-5"><h3 className="font-display text-xl">From Amarillo</h3><p className="mt-3 text-sm leading-7">USFWS places Umbarger roughly 30 miles southwest of Amarillo. Approach via the U.S. 60 corridor and check current road conditions. The refuge entrance road is 1.5 miles south of Umbarger on FM 168; its administrative address is listed 3 miles south, so use the published entrance coordinates rather than guessing from the address alone.</p></div>
        <div className="border border-border p-5"><h3 className="font-display text-xl">From Canyon</h3><p className="mt-3 text-sm leading-7">Umbarger is about 10 miles west of Canyon along U.S. 60, per USFWS. Pair the refuge with Canyon's Panhandle-Plains Historical Museum for regional context; the museum visit is optional and has separate schedules and admission.</p></div>
        <div className="border border-border p-5"><h3 className="font-display text-xl">Palo Duro on a separate leg</h3><p className="mt-3 text-sm leading-7">Use TPWD's signed state-park approach east of Canyon, rather than treating the refuge as a connecting trail. Reserve a separate morning for major canyon hikes and check park alerts, daytime heat and weather closures.</p></div>
      </div>
      <p className="mt-5 text-sm leading-7 text-muted-foreground">For the refuge, FWS lists $2 per vehicle per day for entry and $2 per vehicle per day for designated primitive camping. Campground vault restrooms are available, but primitive camping has no water, sewer or electricity. Refuge trails and the auto-tour road are listed as open 8 a.m.–8 p.m. April–September and 8 a.m.–6 p.m. October–March. These are agency-posted details, not TexasDefined guarantees; verify on the day of travel.</p>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">For an accessible short outing, ask FWS about current Prairie Dog Trail access. For the dramatic red cliffs, choose the state park instead. For a true creek-bank experience, no general public trail along Tierra Blanca Creek is documented here: do not cross fences or stop on private ranch roads.</p>
      <nav aria-label="Further Amarillo trip planning" className="mt-5 flex flex-wrap gap-6 text-sm">
        <a href="/explore/near/amarillo/road-trips" className="font-semibold text-primary underline underline-offset-4">Amarillo road trips</a>
        <a href="/explore/near/amarillo/day-trips" className="font-semibold text-primary underline underline-offset-4">Amarillo day trips</a>
        <SourceLink href={fwsEntrance}>Refuge hours, prices and directions</SourceLink>
      </nav>
    </section>
  </>;
}
