/**
 * Source-backed visitor matrix for the Texas lighthouse comparison article.
 * A "lighthouse visit" does not imply the tower itself is accessible.
 * Source checked: October 9, 2026; always defer to managing agencies for same-day rules.
 */
const lighthouseVisits = [
  {
    name: "Port Isabel Lighthouse",
    category: "Public tower climb",
    base: "Port Isabel / South Padre Island",
    effort: "Easy",
    access: "Only traditional public lighthouse climb on this list, subject to weather and operations. Climb requires 75 winding stairs and three short ladders; children must be at least five.",
    logistics: "421 E. Queen Isabella Blvd. Lighthouse: 9 a.m.–6 p.m. off-season, 10 a.m.–9 p.m. summer; visitor center: 9 a.m.–5 p.m. Adults $5, seniors $4, children $3, military $2.50. Recheck before leaving.",
    source: "Texas Historical Commission: hours and fees",
    sourceUrl: "https://thc.texas.gov/historic-sites/port-isabel-lighthouse",
    guideUrl: "/destination/port-isabel-lighthouse",
  },
  {
    name: "Point Bolivar Lighthouse",
    category: "Private; view only",
    base: "Galveston / Bolivar Peninsula",
    effort: "Easy to incorporate into a ferry outing",
    access: "No public tower access or climb. Photograph only from lawful public vantage points. The tower has been repainted in historic black-and-white stripes; older photos may show the pre-restoration dark exterior.",
    logistics: "Consider the toll-free Galveston–Port Bolivar Ferry; check TxDOT for weather delays and current service. A ferry trip is not an entry ticket to the lighthouse.",
    source: "Bolivar Point Lighthouse Foundation: restoration",
    sourceUrl: "https://bolivarpointlighthouse.org/",
    extraSource: "TxDOT ferry information",
    extraSourceUrl: "https://www.txdot.gov/discover/ferry-boat-schedules/galveston-port-bolivar-ferry.html",
    guideUrl: "/article/point-bolivar-lighthouse-history",
  },
  {
    name: "Halfmoon Reef Lighthouse",
    category: "Public exterior history stop",
    base: "Port Lavaca",
    effort: "Easy",
    access: "The lighthouse was relocated from its offshore site. The state historical marker is on public property at Bayfront Park; do not assume a tower climb or indoor tour.",
    logistics: "Use the waterfront and marker as the reliable visit. The Texas Historical Commission identifies the marker at Bay Front Park near SH 35.",
    source: "Texas Historical Commission: historical marker",
    sourceUrl: "https://atlas.thc.texas.gov/Details/5057002332/print",
    guideUrl: "/article/halfmoon-reef-lighthouse-port-lavaca",
  },
  {
    name: "Lydia Ann Lighthouse",
    category: "Private; waterway viewing",
    base: "Port Aransas / Aransas Pass",
    effort: "Moderate; water safety matters",
    access: "No public tower access. The surrounding Lighthouse Lakes Paddling Trail is a public waterway experience; a view of the tower is not guaranteed.",
    logistics: "TPWD describes four paddling loops of 1.25–6.8 miles with access near Highway 361. Check wind, tides, commercial channel traffic and navigation safety before launching.",
    source: "Texas Parks and Wildlife: Lighthouse Lakes",
    sourceUrl: "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/lighthouse-lakes/",
    guideUrl: "/article/lydia-ann-lighthouse-port-aransas",
  },
  {
    name: "Matagorda Island Lighthouse",
    category: "Remote; boat-only",
    base: "Port O'Connor",
    effort: "High; independent planning",
    access: "No road or public ferry. TPWD allows certain north-end daylight hiking and wildlife viewing, including the road toward the lighthouse, but public hunts and management restrictions can interrupt access.",
    logistics: "Arrange lawful private boat transportation, confirm the current WMA rules with TPWD and carry drinking water and supplies: the island has no concessions, electricity or drinking water.",
    source: "Texas Parks and Wildlife: Matagorda Island WMA",
    sourceUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=48",
    guideUrl: "/article/matagorda-island-lighthouse-history",
  },
  {
    name: "Sabine Pass Lighthouse",
    category: "Louisiana tower; Texas-side history stop",
    base: "Port Arthur / Sabine Pass",
    effort: "Easy Texas-side history; not a tower visit",
    access: "The lighthouse is on the Louisiana side of the border waterway. This is not a normal public Texas lighthouse climb or tower visit.",
    logistics: "Use the Texas-side Sabine Pass Battleground for historical interpretation. It is a separate state historic site with its own admission and hours.",
    source: "Texas Historical Commission: Sabine Pass Battleground",
    sourceUrl: "https://thc.texas.gov/historic-sites/sabine-pass-battleground",
    guideUrl: "/article/sabine-pass-lighthouse-texas-border",
  },
] as const;

export default function LighthouseVisitPlanner() {
  return (
    <section aria-labelledby="lighthouse-visit-planner" className="my-12 border-y border-border py-8">
      <p className="eyebrow text-primary">Compare before you go</p>
      <h2 id="lighthouse-visit-planner" className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Which Texas lighthouse visit is right for you?</h2>
      <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
        Only Port Isabel is a conventional public lighthouse climb. The other stops range from
        exterior views and paddling to a remote island trip and a Louisiana-border history detour.
        Visitor information checked October 9, 2026; verify the managing authority before departure.
      </p>
      <div className="mt-6 grid gap-px border border-border bg-border sm:grid-cols-2">
        {lighthouseVisits.map((light) => (
          <article key={light.name} className="bg-background p-5 sm:p-6">
            <h3 className="font-display text-2xl">{light.name}</h3>
            <p className="mt-2 text-sm font-semibold text-primary">{light.category}</p>
            <dl className="mt-4 space-y-3 text-sm leading-6">
              <div><dt className="font-semibold">Stay near</dt><dd className="text-muted-foreground">{light.base}</dd></div>
              <div><dt className="font-semibold">Planning difficulty</dt><dd className="text-muted-foreground">{light.effort}</dd></div>
              <div><dt className="font-semibold">Access</dt><dd className="text-muted-foreground">{light.access}</dd></div>
              <div><dt className="font-semibold">Before you go</dt><dd className="text-muted-foreground">{light.logistics}</dd></div>
            </dl>
            <div className="mt-5 flex flex-col items-start gap-2 text-sm">
              <a href={light.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">{light.source} ↗</a>
              {"extraSourceUrl" in light && <a href={light.extraSourceUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">{light.extraSource} ↗</a>}
              <a href={light.guideUrl} className="text-primary underline underline-offset-4">TexasDefined detailed guide →</a>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">A location pin, historic marker or public waterway does not grant permission to enter a private tower, restricted land or an active navigational facility.</p>
    </section>
  );
}
