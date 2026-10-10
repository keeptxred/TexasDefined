import { Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";

const museumUrl = "https://www.ysletadelsurpueblo.org/tourism-hospitality/cultural-center/museum";
const culturalUrl = "https://www.ysletadelsurpueblo.org/tourism-hospitality/cultural-center";
const preservationUrl = "https://www.ysletadelsurpueblo.org/tribal-services/department-of-cultural-preservation";
const puebloUrl = "https://www.ysletadelsurpueblo.org/about-us";
const commissionUrl = "https://atlas.thc.texas.gov/details/4200001263";
const texasHistoryUrl = "https://www.tshaonline.org/handbook/entries/ysleta-del-sur-pueblo-museum";
const missionUrl = "https://www.nps.gov/places/ysleta-mission.htm";
const breadBakingUrl = "https://www.ysletadelsurpueblo.org/tourism-hospitality/cultural-center/bread-baking";
const missionTrailUrl = "https://visitelpaso.com/epmissiontrail";
const visitElPasoCulturalUrl = "https://visitelpaso.com/places/tigua-indian-cultural-center";
const photoUrl = "https://commons.wikimedia.org/wiki/File:Tigua_Cultural_Center.jpg";
const panoramaUrl = "https://commons.wikimedia.org/wiki/File:Tigua_Cultural_Center_2.jpg";
const sourceList = [
  { label: "Ysleta del Sur Pueblo — museum", url: museumUrl, note: "Controlling source for museum hours, tours, interactive exhibits and visitor programming." },
  { label: "Ysleta del Sur Pueblo — Cultural Center", url: culturalUrl, note: "Tribal account of the center, its mission and activities." },
  { label: "Ysleta del Sur Pueblo — Department of Cultural Preservation", url: preservationUrl, note: "Tribal perspective on public education, cultural protocols, preservation and programming." },
  { label: "Ysleta del Sur Pueblo — About Us", url: puebloUrl, note: "First-person account of the Tigua community, its origins and continuing government." },
  { label: "Texas Historical Commission — museum atlas #4200001263", url: commissionUrl, note: "Independent museum directory: address, telephone, email and hours; revised September 27, 2026." },
  { label: "Texas State Historical Association — Handbook of Texas", url: texasHistoryUrl, note: "Historic museum timeline, including the 1975 opening and the 1992 fire; not a current operating-hours source." },
  { label: "National Park Service — Ysleta Mission", url: missionUrl, note: "Documentary history of the separate mission church and Pueblo Revolt-era borderlands." },
  { label: "Ysleta del Sur Pueblo — Bread Baking", url: breadBakingUrl, note: "The Pueblo describes a demonstration every other Saturday, which differs from Visit El Paso's second/fourth-Saturday listing; confirm the exact date." },
  { label: "Visit El Paso — Mission Trail", url: missionTrailUrl, note: "Official regional visitor explanation of the Ysleta–Socorro–San Elizario heritage corridor." },
  { label: "Visit El Paso — Pueblo Cultural Center", url: visitElPasoCulturalUrl, note: "Secondary visitor listing for demonstrations and activities; confirm public access and timing with the Pueblo." },
];
const museumTopics = [
  { title: "Tigua history, in the Pueblo's own voice", text: "The museum is operated by the Pueblo itself. Its interpretation centers the community's experience across centuries instead of treating Indigenous people as a chapter that ended with Spanish settlement. Look for explanations of continuity, political sovereignty, family histories and the adversity residents have faced." },
  { title: "Objects, photographs and video", text: "The Pueblo and El Paso's visitor bureau identify pottery, historical artifacts, photographs and video as parts of the collections. Individual objects and gallery installations can change: this is a guide to documented exhibit categories, not a claim that a specific artifact is always on view." },
  { title: "Interactive learning", text: "The museum reports interactive exhibit elements and offers more structured interactions for groups and school visits. Ask about currently staffed interpretation if an educator-led experience is central to your visit." },
  { title: "Cultural programs and working artists", text: "Artist visits, lectures and cultural presentations can make the larger center especially rewarding. They are event-dependent. Some instructional programs are specifically reserved for tribal members, so do not assume every advertised activity is open to tourists." },
  { title: "Community craft and the gift shop", text: "The Cultural Center supports work by Tigua makers. Purchasing directly through the Pueblo's shops can help visitors support artists, but merchandise, makers and demonstrations vary by day." },
  { title: "The living cultural center", text: "This is not an abandoned mission or a reconstructed village. It is an active Pueblo institution that houses museum interpretation within a community-led cultural preservation program. A respectful visit acknowledges both the history and the present." },
];
const timeline = [
  { date: "1680", title: "The Pueblo Revolt", body: "Conflict with Spanish colonial authority in New Mexico led to southward movement of Pueblo people and Spanish settlers. The journeys included both voluntary and coerced relocation; avoid describing every Tigua family as having made the same choice.", url: missionUrl },
  { date: "1682", title: "Community rooted in the El Paso Valley", body: "Ysleta del Sur Pueblo identifies 1682 as the founding of its community and government. The mission dates to this same era, but the historic church and today's museum are different sites.", url: puebloUrl },
  { date: "1975", title: "A museum opens", body: "The Handbook of Texas records the Ysleta del Sur Pueblo Museum opening in the historic Alderette-Candelaria House. Its historic account should not be mistaken for a description of the current building.", url: texasHistoryUrl },
  { date: "1987", title: "Federal restoration legislation", body: "The Ysleta del Sur Pueblo Restoration Act recognized the Pueblo's federal relationship and sovereign governmental framework. The tribe's current government continues beyond the museum walls.", url: "https://www.ysletadelsurpueblo.org/news_detail.sstg?id=104" },
  { date: "1992", title: "Rebuilding after a fire", body: "According to the Handbook of Texas, the earlier museum structure was largely destroyed by fire and was being rebuilt in the spring of 1992.", url: texasHistoryUrl },
  { date: "2016", title: "Cultural preservation reorganized", body: "The Pueblo established its Department of Cultural Preservation, bringing cultural center activities, development and repatriation within a coordinated tribal program.", url: preservationUrl },
];
const questions = [
  { q: "Is the Ysleta Mission Museum the same as the Cultural Center Museum?", a: "The older phrase can cause confusion. For the Pueblo-run museum, use Ysleta del Sur Pueblo Cultural Center Museum, 305 Yaya Lane. Ysleta Mission is a separate active historic church at 131 S Zaragoza Road." },
  { q: "What days is the museum open?", a: "The Pueblo's specific museum page and the Texas Historical Commission currently list Wednesday through Sunday, 10 a.m.–4 p.m. Other Cultural Center and gift-shop listings show different days; call the museum before making a special trip." },
  { q: "How much does admission cost?", a: "A dependable current public admission rate was not identified in the official museum listing reviewed October 9, 2026. Call the Cultural Center to confirm admission, accepted payment and any group pricing." },
  { q: "Can children or school groups visit?", a: "Yes. The museum specifically offers tours for school trips and larger groups. Contact staff ahead of time to discuss group size, educational goals, supervision and available tour dates." },
  { q: "Are there dances and bread-making demonstrations every day?", a: "No. The Pueblo advertises bread baking every other Saturday; Visit El Paso says second and fourth Saturdays. Those schedules are not necessarily identical, so confirm the exact demonstration date and public access with Pueblo staff. Other cultural classes and programs are for tribal members only." },
  { q: "Is it accessible?", a: "Public source pages did not establish a full, current accessibility inventory. Ask staff about step-free routes, accessible restrooms, seating, mobility needs and any accommodations before visiting." },
  { q: "How much time should I allow?", a: "For planning, allow roughly 45–90 minutes for a self-guided museum visit; this is a TexasDefined estimate, not a museum-issued tour duration. Allow more time if a confirmed public program is scheduled." },
  { q: "May I photograph exhibits or ceremonies?", a: "Do not assume photography or video is permitted, especially during dances, ceremonies or presentations involving community members. Ask staff for permission and respect posted restrictions." },
];
const anchorStyle = "font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary";

export default function YsletaDelSurMuseumAuthority() {
  return <div>
    <Container className="pt-10 sm:pt-12">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs uppercase text-muted-foreground">
        <Link to="/">Texas Defined</Link><span aria-hidden>·</span>
        <Link to="/explore/$category" params={{ category: "historic-sites" }}>Historic sites &amp; museums</Link><span aria-hidden>·</span>
        <span aria-current="page">Ysleta del Sur Pueblo Cultural Center Museum</span>
      </nav>
    </Container>

    <section className="relative mt-5 isolate overflow-hidden bg-ink text-ink-foreground">
      <img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Tigua_Cultural_Center.jpg?width=1600" width={1600} height={1200} fetchPriority="high" decoding="async" alt="Photograph of the actual Tigua Cultural Center at Ysleta del Sur Pueblo in El Paso" className="absolute inset-0 h-full w-full object-cover opacity-65" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/15" />
      <Container className="relative flex flex-col justify-end pb-12 pt-24" style={{ minHeight: "clamp(26rem, 54vw, 35rem)" }}>
        <p className="eyebrow text-ink-foreground/85">El Paso · Indigenous Texas · Tribal museum</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-tight sm:text-7xl">Ysleta del Sur Pueblo Cultural Center Museum</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-ink-foreground/85">A practical visitor guide and researched introduction to more than 300 years of Tigua history, a living Pueblo community, and the cultural institution that tells its story.</p>
        <p className="mt-6 text-xs leading-5 text-ink-foreground/85">Actual Cultural Center photograph: <a href={photoUrl} className="underline" target="_blank" rel="noopener noreferrer">Sue Barnum, 2020</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" className="underline" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>. Photograph displayed without editorial alteration.</p>
      </Container>
    </section>

    <Container className="py-11 sm:py-16">
      <p className="eyebrow text-primary">Last fact-checked October 9, 2026</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="border-t-2 border-foreground pt-4"><p className="eyebrow text-muted-foreground">Museum location</p><p className="mt-2 font-semibold">305 Yaya Lane<br />El Paso, TX 79907</p></div>
        <div className="border-t-2 border-foreground pt-4"><p className="eyebrow text-muted-foreground">Museum-listed hours</p><p className="mt-2 font-semibold">Wednesday–Sunday<br />10 a.m.–4 p.m.</p></div>
        <div className="border-t-2 border-foreground pt-4"><p className="eyebrow text-muted-foreground">Museum contact</p><a href="tel:+19158597700" className={anchorStyle+" mt-2 inline-block"}>(915) 859-7700</a><a href="mailto:culturalcenter@ydsp-nsn.gov" className="mt-1 block text-xs text-primary underline" style={{ overflowWrap: "anywhere" }}>culturalcenter@ydsp-nsn.gov</a></div>
        <div className="border-t-2 border-foreground pt-4"><p className="eyebrow text-muted-foreground">Admission and programs</p><p className="mt-2 font-semibold">Confirm directly</p><p className="mt-1 text-sm text-muted-foreground">A current entry price and daily performance calendar were not verified.</p></div>
      </div>
      <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Important hours discrepancy:</strong> the Pueblo's museum-specific page and the Texas Historical Commission record both say Wednesday–Sunday, 10 a.m.–4 p.m. A separate cultural-center gift-shop website advertises daily hours. Those may reflect different facilities or updated schedules. Before traveling, call the museum to confirm museum access, tours, holiday hours and pricing.</p>
      <div className="mt-6 flex flex-wrap gap-5 text-sm">
        <a href={museumUrl} className={anchorStyle} target="_blank" rel="noopener noreferrer">Official museum information ↗</a>
        <a href={commissionUrl} className={anchorStyle} target="_blank" rel="noopener noreferrer">Texas Historical Commission listing ↗</a>
        <a href="https://www.google.com/maps/search/?api=1&query=305+Yaya+Ln+El+Paso+TX+79907" className={anchorStyle} target="_blank" rel="noopener noreferrer">Map and driving directions ↗</a>
      </div>
    </Container>

    <section className="border-y border-border py-12 sm:py-16">
      <Container className="grid gap-10 lg:grid-cols-2">
        <div><p className="eyebrow text-primary">What makes this place important</p>
          <h2 className="mt-3 font-display text-4xl">A museum about a people who are still here</h2>
          <p className="mt-5 leading-8">Ysleta del Sur Pueblo is the only federally recognized Pueblo in Texas. The Tigua community's history in the El Paso Valley reaches back to the aftermath of the 1680 Pueblo Revolt, but its story is not confined to the past. Tribal citizens continue to sustain their government, cultural identity, arts and community institutions.</p>
          <p className="mt-5 leading-8">The Cultural Center Museum belongs to the Pueblo's own public education and preservation work. This matters because Indigenous histories are often told solely through colonial missions, frontier campaigns or outside historians. Here, the Pueblo identifies what it considers important to preserve and teach. Visitors should use the <a href={puebloUrl} className={anchorStyle} target="_blank" rel="noopener noreferrer">Pueblo's first-person history</a> alongside historical accounts written by outsiders.</p>
          <p className="mt-5 leading-8">Understanding this distinction is also the key to visiting responsibly: tribal programs are not tourist performances on demand, sacred or private practices need not be explained to visitors, and some classes exist specifically for tribal members.</p>
        </div>
        <aside className="border-t-2 border-foreground pt-5">
          <p className="eyebrow text-primary">Museum or mission?</p>
          <h3 className="mt-3 font-display text-2xl">Two places, two roles</h3>
          <dl className="mt-6 space-y-5 text-sm leading-7">
            <div><dt className="font-semibold">Cultural Center Museum</dt><dd className="text-muted-foreground">305 Yaya Lane. A Pueblo-operated museum, public heritage education and contemporary cultural programs.</dd></div>
            <div><dt className="font-semibold">Ysleta Mission</dt><dd className="text-muted-foreground">131 S Zaragoza Road. A separate active historic church, Pueblo spiritual landmark and El Paso Mission Trail site.</dd></div>
          </dl>
          <a href={missionUrl} target="_blank" rel="noopener noreferrer" className={anchorStyle+" mt-6 inline-block"}>National Park Service mission history ↗</a>
        </aside>
      </Container>
    </section>

    <Container className="py-14 sm:py-16">
      <p className="eyebrow text-primary">Inside the experience</p>
      <h2 className="mt-3 font-display text-4xl">What to look for at the museum</h2>
      <p className="mt-4 max-w-3xl leading-8 text-muted-foreground">These are documented themes and activities, not a guaranteed list of galleries or performances on a particular date. The Pueblo determines the visitor experience.</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {museumTopics.map((item,index)=><article key={item.title} className="border-t-2 border-foreground pt-5">
          <p className="eyebrow text-primary">Explore {String(index+1).padStart(2,"0")}</p>
          <h3 className="mt-3 font-display text-2xl leading-tight">{item.title}</h3>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.text}</p>
        </article>)}
      </div>
      <figure className="mt-12">
        <img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Tigua_Cultural_Center_2.jpg?width=1280" width={1280} height={296} alt="Wide panoramic photograph of the Tigua Cultural Center in El Paso, photographed in 2020" loading="lazy" decoding="async" className="h-auto w-full" />
        <figcaption className="mt-3 text-xs text-muted-foreground">A second view of the actual Tigua Cultural Center, Sue Barnum (2020), <a href={panoramaUrl} target="_blank" rel="noopener noreferrer" className="underline">Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" className="underline">CC BY-SA 4.0</a>. No alterations.</figcaption>
      </figure>
    </Container>

    <section className="border-y border-border py-14 sm:py-16">
      <Container>
        <p className="eyebrow text-primary">Dates with documentary sources</p>
        <h2 className="mt-3 font-display text-4xl">A brief timeline of the Pueblo and its museum</h2>
        <p className="mt-4 max-w-4xl leading-8 text-muted-foreground">The community's history and the museum institution have different timelines. The record below separates the two and flags the historic building's earlier history rather than claiming it is the present-day structure.</p>
        <ol className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...timeline].sort((a,b)=>Number(a.date)-Number(b.date)).map((item)=><li key={item.date} className="border-t-2 border-foreground pt-5">
            <p className="eyebrow text-primary">{item.date}</p>
            <h3 className="mt-2 font-display text-2xl">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.body}</p>
            <a href={item.url} target="_blank" rel="noopener noreferrer" className={anchorStyle+" mt-4 inline-block text-sm"}>Check source ↗</a>
          </li>)}
        </ol>
      </Container>
    </section>

    <Container className="py-14 sm:py-16">
      <p className="eyebrow text-primary">Make a thoughtful visit</p>
      <h2 className="mt-3 font-display text-4xl">Three practical ways to plan your time</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <article className="border border-border p-6"><p className="eyebrow text-primary">Estimated 45–90 minutes</p><h3 className="mt-3 font-display text-2xl">Museum essentials</h3><p className="mt-4 text-sm leading-7">Begin with the exhibits and tribal history, study the photographs and pottery on display, and finish at the Pueblo gift shop if it is open. This duration is our planning estimate, not the museum's official tour length.</p></article>
        <article className="border border-border p-6"><p className="eyebrow text-primary">Advance coordination</p><h3 className="mt-3 font-display text-2xl">School or heritage group</h3><p className="mt-4 text-sm leading-7">Contact museum staff ahead of time for guided group tours, classroom objectives, chaperone expectations and any current fees. Confirm whether a public demonstration or lecturer is scheduled during the visit.</p></article>
        <article className="border border-border p-6"><p className="eyebrow text-primary">Half-day local itinerary</p><h3 className="mt-3 font-display text-2xl">Pueblo history and the Mission Trail</h3><p className="mt-4 text-sm leading-7">Visit the Cultural Center first; then, subject to church visitor rules and service times, see nearby Ysleta Mission. If time allows, continue to Socorro Mission for wider borderlands context. The sites have different operating arrangements.</p></article>
      </div>
      <div className="mt-8 grid gap-7 lg:grid-cols-2">
        <div className="border-t border-border pt-5">
          <h3 className="font-display text-2xl">For families and teachers</h3>
          <p className="mt-3 text-sm leading-7">Useful questions to ask: How did the Rio Grande landscape shape Tigua agriculture? How does a Pueblo government continue today? What changed after colonial settlement? What can photographs and everyday objects tell us that a timeline cannot? For guided tours and any filming or photography rules, contact the museum rather than assuming.</p>
        </div>
        <div className="border-t border-border pt-5">
          <h3 className="font-display text-2xl">Respect and accessibility</h3>
          <p className="mt-3 text-sm leading-7">Ask permission before photographing people, ceremonies or exhibits. Stay in public visitor areas. No full current accessibility inventory was identified in the reviewed public sources; call ahead about accessible entrances, restrooms, seating, service animals and sensory accommodations.</p>
        </div>
      </div>
      <nav aria-label="Continue exploring El Paso heritage" className="mt-7 flex flex-wrap gap-6">
        <Link to="/$kind/$slug" params={{ kind: "county", slug: "el-paso" }} className={anchorStyle}>Explore El Paso County →</Link>
        <Link to="/article/$slug" params={{ slug: "texas-borderlands-historic-sites-guide" }} className={anchorStyle}>Texas borderlands and mission history →</Link>
        <Link to="/article/$slug" params={{ slug: "indigenous-texas-history-native-nations" }} className={anchorStyle}>Indigenous Texas history →</Link>
        <a href={missionTrailUrl} className={anchorStyle} target="_blank" rel="noopener noreferrer">Official El Paso Mission Trail visitor guide ↗</a>
      </nav>
    </Container>

    <section className="border-t border-border py-14 sm:py-16">
      <Container>
        <p className="eyebrow text-primary">Answered before you travel</p><h2 className="mt-3 font-display text-4xl">Frequently asked questions</h2>
        <dl className="mt-8 grid gap-x-12 sm:grid-cols-2">
          {questions.map(({q,a})=><div className="border-t border-border py-5" key={q}><dt className="font-display text-2xl leading-tight">{q}</dt><dd className="mt-3 text-sm leading-7 text-muted-foreground">{a}</dd></div>)}
        </dl>
      </Container>
    </section>

    <Container className="py-14 sm:py-16">
      <p className="eyebrow text-primary">Editorial transparency</p>
      <h2 className="mt-3 font-display text-4xl">Primary sources, verification and image credits</h2>
      <p className="mt-5 max-w-4xl leading-8">TexasDefined Editorial Desk · Last verified October 9, 2026. The Pueblo's own sources control its identity, history and current museum guidance. The Texas Historical Commission supplies cross-checks for museum contacts and hours; Visit El Paso provides contextual visitor information that should be reconfirmed with the Pueblo. The Handbook of Texas supplies historical museum milestones. The National Park Service supports facts about the separate mission. We do not present tribal-member-only activities as public programming, nor treat estimates as confirmed admission policies.</p>
      <ol className="mt-7 grid gap-5 sm:grid-cols-2">{sourceList.map((source,index)=><li key={source.url} className="border-t border-border pt-4"><p className="eyebrow text-primary">Source {index+1}</p><a className={anchorStyle+" mt-2 inline-block"} href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a><p className="mt-2 text-sm leading-6 text-muted-foreground">{source.note}</p></li>)}</ol>
      <p className="mt-7 text-xs leading-6 text-muted-foreground">Image attribution: both photographs by Sue Barnum (2020), licensed CC BY-SA 4.0 through Wikimedia Commons. They are photographs of this Cultural Center, not generic museum substitutes. <a href={photoUrl} className="underline" target="_blank" rel="noopener noreferrer">Hero image license and source</a> · <a href={panoramaUrl} className="underline" target="_blank" rel="noopener noreferrer">Panorama license and source</a>.</p>
      <p className="mt-4 text-xs leading-6 text-muted-foreground">Suggested citation: TexasDefined Editorial Desk. “Ysleta del Sur Pueblo Cultural Center Museum: Tigua History, Exhibits & Visitor Guide.” TexasDefined, verified October 9, 2026. https://texasdefined.com/destination/ysleta-del-sur-pueblo-cultural-center-museum-el-paso</p>
      <p className="mt-4 text-xs leading-6 text-muted-foreground">Information changes: verify museum hours, admission, cultural program access and photography policy with the Pueblo before traveling. This independent guide is not endorsed by or affiliated with the Pueblo.</p>
    </Container>
  </div>;
}
