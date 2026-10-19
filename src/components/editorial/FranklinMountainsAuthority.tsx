/**
 * Franklin Mountains park-specific visitor guide.
 * Distances, fees, hours and access points: TPWD, checked 2026-10-19.
 * Avoid a statewide amenities template pretending the four entrances coincide.
 */
const official = "https://tpwd.texas.gov/state-parks/franklin-mountains";

const trails = [
  { name: "Nature Walk", length: "¾-mile loop", time: "About 30 minutes", difficulty: "Easy", where: "Tom Mays Unit", note: "Best short introduction for families: desert plants and a bird blind near the start." },
  { name: "Cardiac Road–Maze Loop", length: "3-mile loop", time: "About 2½ hours", difficulty: "Moderate", where: "Northeast, near Chuck Heinrich Memorial Park", note: "Climb a low ridge before winding back through desert shrubs. Buy the day pass ahead of time." },
  { name: "West Cottonwood Springs via Agave Loop", length: "3 miles", time: "About 3 hours", difficulty: "Moderate", where: "Tom Mays Unit", note: "Westward vistas, a spring shaded by a cottonwood and loose scree on the return." },
  { name: "Tin Mines", length: "6 miles", time: "3–4 hours", difficulty: "Moderate–difficult", where: "Northeast, near Chuck Heinrich Memorial Park", note: "Old jeep-road grade leads to historic mine workings and smelter remains; do not enter shafts." },
  { name: "North Franklin Peak", length: "8 miles", time: "4–6 hours", difficulty: "Strenuous", where: "Tom Mays Unit", note: "High-elevation summit at 7,192 feet via rocky, exposed terrain. Not a beginner hike." },
] as const;
const camping = [
  { type: "Primitive walk-in tent", count: "14", price: "$10/night", note: "No water; tent pads, grills and tables at listed sites. Some parking approaches require high clearance." },
  { type: "Primitive drive-up RV", count: "5", price: "$10/night", note: "Self-contained RVs only. No water or electricity; not full-hookup camping." },
  { type: "Group tent camps (20 people)", count: "2", price: "$20/night", note: "Sites #36 and #38. No water. Group capacity and booking terms apply." },
  { type: "Group tent camp (30 people)", count: "1", price: "$30/night", note: "Site #39. No water; contact the park about reservations." },
] as const;
const entrances = [
  { name: "Tom Mays Unit", use: "HQ, day use, camping, Nature Walk, West Cottonwood Springs and North Franklin Peak", access: "2900 Tom Mays Access Rd., off Loop 375 about 3.5 miles east of I-10" },
  { name: "Northeast / Chuck Heinrich", use: "Tin Mines and Cardiac Road–Maze trails", access: "End of Jon Cunningham Boulevard; separate from Tom Mays" },
  { name: "McKelligon Canyon", use: "East-side access and designated climbing", access: "From Highway 54 take Fred Wilson Road west" },
  { name: "Smugglers Pass", use: "Ron Coleman Trail", access: "Trailhead parking near the summit of Trans Mountain Road (Loop 375)" },
] as const;
const questions = [
  ["Which entrance is right for North Franklin Peak?", "Use the Tom Mays Unit and follow TPWD's specific North Franklin Peak trail guidance. Do not navigate to a generic El Paso or park-center pin."],
  ["Do I need a reservation?", "TPWD recommends reserving both day-use and camping passes in advance because the park often reaches capacity. Northeast hikes such as Tin Mines require a day pass purchased ahead of time."],
  ["Can I bring a dog?", "Dogs are subject to Texas state-park rules, including a six-foot leash and waste cleanup. Bring additional water for pets, and contact park staff about trail-specific restrictions."],
  ["Is there drinking water at the campsites?", "No. TPWD lists no water at the Tom Mays primitive campsites and no electrical hookups at the RV sites. Bring drinking, cooking and washing water."],
  ["Are there showers?", "The current TPWD campsite listing does not promise showers. Do not book expecting shower facilities; verify restrooms, accessibility and other amenities with park staff."],
  ["Can I go rock climbing?", "TPWD identifies climbing in designated McKelligon Canyon areas and Sneed's Cory in Tom Mays. Bring suitable equipment and verify any closures or rules before climbing."],
] as const;

const textLink = "font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary";
export default function FranklinMountainsAuthority() {
  return <div data-franklin-mountains-authority="2026-10-19" className="mt-12 space-y-12">
    <section aria-labelledby="franklin-trip-essentials" className="border-t-2 border-foreground pt-8">
      <p className="eyebrow text-primary">Start here · verified October 19, 2026</p>
      <h2 id="franklin-trip-essentials" className="mt-3 font-display text-3xl">Admission, hours and day-use planning</h2>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">Four different access areas serve different activities. Prices and hours below reflect TPWD's published information, not a guarantee of today's availability. <a className={textLink} href={official + "/alert"} target="_blank" rel="noopener noreferrer">Check active park alerts ↗</a> before leaving.</p>
      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="border border-border p-4"><dt className="eyebrow text-muted-foreground">Daily admission</dt><dd className="mt-2 text-lg font-semibold">$5 adults; ages 12 and under free</dd></div>
        <div className="border border-border p-4"><dt className="eyebrow text-muted-foreground">Gate hours</dt><dd className="mt-2 text-lg font-semibold">Usually 8 a.m.–5 p.m.</dd><p className="mt-2 text-xs leading-5 text-muted-foreground">Fridays–Sundays: 6:30 a.m. opening from the first Saturday in April through the first Saturday in September.</p></div>
        <div className="border border-border p-4"><dt className="eyebrow text-muted-foreground">Office / phone</dt><dd className="mt-2 font-semibold">8 a.m.–4 p.m. · <a className={textLink} href="tel:+19154449100">(915) 444-9100</a></dd></div>
        <div className="border border-border p-4"><dt className="eyebrow text-muted-foreground">Passes and campsites</dt><dd className="mt-2 leading-6">Capacity may sell out. <a href="https://texasstateparks.reserveamerica.com/" target="_blank" rel="noopener noreferrer" className={textLink}>Reserve with TPWD's booking system ↗</a> or call (512) 389-8900.</dd></div>
      </dl>
      <nav aria-label="Franklin Mountains park planning resources" className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm">
        <a className={textLink} href={official + "/map"} target="_blank" rel="noopener noreferrer">Official entrances and maps ↗</a>
        <a className={textLink} href={official + "/plan-your-visit"} target="_blank" rel="noopener noreferrer">TPWD trail planner ↗</a>
        <a className={textLink} href={official + "/fees-facilities/campsites"} target="_blank" rel="noopener noreferrer">Campsite prices and inventory ↗</a>
      </nav>
    </section>

    <section aria-labelledby="franklin-trail-guide" className="border-t border-border pt-8">
      <p className="eyebrow text-primary">Choose the hike before the trailhead</p>
      <h2 id="franklin-trail-guide" className="mt-3 font-display text-3xl">Franklin Mountains hiking trails compared</h2>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">Times are TPWD's approximate hiking estimates, not arrival guarantees. Distances are for the specified routes; check the official route map for navigation, seasonal closures and mountain-bike permissions. Summer heat, wind and exposed rocky grades can substantially change what is safe.</p>
      <div className="mt-6 overflow-x-auto border border-border">
        <table className="w-full min-w-[600px] text-left text-sm">
          <caption className="sr-only">Trail distance, difficulty, starting unit and estimated hiking duration</caption>
          <thead className="border-b border-border bg-surface"><tr><th scope="col" className="p-3">Trail</th><th scope="col" className="p-3">Distance</th><th scope="col" className="p-3">Difficulty</th><th scope="col" className="p-3">Time</th></tr></thead>
          <tbody>{trails.map((trail) => <tr key={trail.name} className="border-b border-border align-top last:border-b-0"><th scope="row" className="p-3 font-semibold">{trail.name}<p className="mt-1 text-xs font-normal text-muted-foreground">{trail.where}</p></th><td className="p-3">{trail.length}</td><td className="p-3">{trail.difficulty}</td><td className="p-3">{trail.time}</td></tr>)}</tbody>
        </table>
      </div>
      <div className="mt-6 space-y-4">{trails.map((trail) => <div key={trail.name} className="border-l-2 border-border pl-4"><h3 className="font-semibold">{trail.name}</h3><p className="mt-1 text-sm leading-7 text-muted-foreground">{trail.note}</p></div>)}</div>
      <p className="mt-5 text-sm"><a href={official + "/plan-your-visit"} className={textLink} target="_blank" rel="noopener noreferrer">Read TPWD's first-hand trail recommendations ↗</a></p>
    </section>

    <section aria-labelledby="franklin-camping" className="border-t border-border pt-8">
      <p className="eyebrow text-primary">Camping · Tom Mays Unit only</p>
      <h2 id="franklin-camping" className="mt-3 font-display text-3xl">Primitive tent, RV and group camping</h2>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">Every overnight site listed by TPWD is in the Tom Mays Unit, near 31.908166, -106.525458. These are primitive sites: no drinking-water hookups and no electricity. Nightly fees are in addition to daily entrance fees and may change.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {camping.map((site) => <div key={site.type} className="border border-border p-5"><h3 className="text-lg font-semibold">{site.type}</h3><p className="mt-2 text-sm font-semibold">{site.count} site{site.count === "1" ? "" : "s"} · {site.price}</p><p className="mt-3 text-sm leading-6 text-muted-foreground">{site.note}</p></div>)}
      </div>
      <p className="mt-5 text-sm leading-7"><strong>Important:</strong> Some walk-in sites (C1, C2, C3 and C5) require high clearance to reach the parking approach. Do not assume a full-size RV can use tent-site tracks. TPWD's listings do not promise campsite showers; call the park about current restrooms and accessibility.</p>
      <a href={official + "/fees-facilities/campsites"} target="_blank" rel="noopener noreferrer" className={"mt-4 inline-block text-sm " + textLink}>Compare official campsites and reserve ↗</a>
    </section>

    <section aria-labelledby="franklin-entrances" className="border-t border-border pt-8">
      <p className="eyebrow text-primary">Getting there</p>
      <h2 id="franklin-entrances" className="mt-3 font-display text-3xl">Four access points — not one interchangeable entrance</h2>
      <div className="mt-6 space-y-5">{entrances.map((entrance) => <div key={entrance.name} className="border-l-2 border-primary/60 pl-4"><h3 className="text-lg font-semibold">{entrance.name}</h3><p className="mt-2 text-sm leading-6"><strong>Best for:</strong> {entrance.use}</p><p className="mt-1 text-sm leading-6 text-muted-foreground">{entrance.access}</p></div>)}</div>
      <p className="mt-5 text-sm">Official Tom Mays headquarters: <a className={textLink} target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/search/?api=1&query=31.910522%2C-106.518182">2900 Tom Mays Access Rd., El Paso, TX 79911 · map ↗</a>.</p>
    </section>

    <section aria-labelledby="franklin-landscape" className="border-t border-border pt-8">
      <p className="eyebrow text-primary">What makes the park different</p>
      <h2 id="franklin-landscape" className="mt-3 font-display text-3xl">A wilderness ridge above the city</h2>
      <figure className="mt-6 max-w-2xl">
        <img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Northfranklinfromelephant2.jpg" alt="North Franklin Peak beyond Fusselman Canyon and Trans Mountain Road, photographed from The Elephant in the Franklin Mountains" width={638} height={478} loading="lazy" decoding="async" className="aspect-[4/3] w-full bg-surface object-cover" />
        <figcaption className="mt-2 text-xs leading-5 text-muted-foreground">North Franklin Mountain from The Elephant, Brian Stansberry (2006), <a href="https://commons.wikimedia.org/wiki/File:Northfranklinfromelephant2.jpg" target="_blank" rel="noopener noreferrer" className={textLink}>original photograph</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener noreferrer" className={textLink}>CC BY-SA 3.0</a>. Image displayed without editorial alteration.</figcaption>
      </figure>
      <h3 className="mt-7 text-lg font-semibold">Geology you can see</h3>
      <p className="mt-2 text-sm leading-7">The Franklins expose ancient rock layers and younger faults associated with the tectonic forces that shaped the Rio Grande rift. The sharp relief creates a remarkable contrast with El Paso's built-up basins. For a grounded explanation of the bedrock and roadcuts, see the <a href="https://www.beg.utexas.edu/texas-through-time/franklin-mountains.html" target="_blank" rel="noopener noreferrer" className={textLink}>University of Texas Bureau of Economic Geology ↗</a>.</p>
      <h3 className="mt-6 text-lg font-semibold">Life in the Chihuahuan Desert</h3>
      <p className="mt-2 text-sm leading-7">Lechuguilla, sotol, ocotillo, yuccas and cacti anchor the vegetation. TPWD documents more than 100 bird species across the park, including golden eagles, flycatchers, hummingbirds and pyrrhuloxia. Mule deer, reptiles and coyotes also occur here. The bird blind near the Tom Mays Nature Walk is a practical stop for patient wildlife watching.</p>
      <h3 className="mt-6 text-lg font-semibold">History, climbing and stewardship</h3>
      <p className="mt-2 text-sm leading-7">For generations, the mountains supplied resources to people living in the Borderland. Today the park preserves desert habitats while providing hiking, cycling, birding and designated rock climbing at McKelligon Canyon and Sneed's Cory. Stay on marked trails, do not collect rock or plants, and avoid entering historic mine workings.</p>
    </section>

    <section aria-labelledby="franklin-staying-safe" className="border-t border-border pt-8">
      <p className="eyebrow text-primary">Trail and overnight safety</p>
      <h2 id="franklin-staying-safe" className="mt-3 font-display text-3xl">What to bring and what not to assume</h2>
      <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-7">
        <li>Carry more water than a normal city walk requires, including a reserve for delays, children and pets; camping facilities do not provide water.</li>
        <li>Begin exposed hikes early, review heat and wind forecasts, and turn around before extreme conditions. Do not attempt summit trails in lightning or rapidly deteriorating weather.</li>
        <li>Download the trail map before entering; identify your return trailhead, sunset time and gate closing time.</li>
        <li>Wear sturdy footwear for loose rock and sharp vegetation. Stay on designated trails and tell someone your route.</li>
        <li>Respect wildlife, keep pets leashed, take rubbish out and use fire rings only where fires are allowed under current restrictions.</li>
      </ul>
    </section>

    <section aria-labelledby="franklin-el-paso-links" className="border-t border-border pt-8">
      <p className="eyebrow text-primary">Plan a complete El Paso trip</p>
      <h2 id="franklin-el-paso-links" className="mt-3 font-display text-3xl">Pair the mountains with the Borderland</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">Hike in the cooler hours, then switch to indoor galleries or historic El Paso. These are separate destinations; park admission does not cover museums or other attractions.</p>
      <ul className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
        <li><a className={textLink} href="/county/el-paso">El Paso County guide →</a></li>
        <li><a className={textLink} href="/metro-area/el-paso-metro">El Paso metro area →</a></li>
        <li><a className={textLink} href="/destination/el-paso-museum-of-archaeology">El Paso Museum of Archaeology →</a></li>
        <li><a className={textLink} href="/destination/chamizal-national-memorial">Chamizal National Memorial →</a></li>
        <li><a className={textLink} href="/destination/magoffin-home">Magoffin Home historic site →</a></li>
        <li><a className={textLink} href="/destination/hotel-paso-del-norte">Historic Hotel Paso del Norte →</a></li>
        <li><a className={textLink} href="/texas-mountain-biking-guide">Texas mountain biking guide →</a></li>
        <li><a className={textLink} href="/explore/state-parks">Explore Texas state parks →</a></li>
      </ul>
    </section>

    <section aria-labelledby="franklin-questions" className="border-t border-border pt-8">
      <p className="eyebrow text-primary">Quick answers</p>
      <h2 id="franklin-questions" className="mt-3 font-display text-3xl">Frequently asked questions</h2>
      <dl className="mt-5 divide-y divide-border">{questions.map(([question, answer]) => <div key={question} className="py-4"><dt className="font-semibold">{question}</dt><dd className="mt-2 text-sm leading-7 text-muted-foreground">{answer}</dd></div>)}</dl>
      <p className="mt-5 text-xs leading-6 text-muted-foreground">Last independently reviewed October 19, 2026. <a className={textLink} href={official} target="_blank" rel="noopener noreferrer">Texas Parks and Wildlife Department</a> controls actual fees, hours, closures and reservations.</p>
    </section>
  </div>;
}
