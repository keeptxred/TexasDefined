import { Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";

/**
 * Original Old Socorro archaeological site — NOT the operating Socorro Mission.
 * THC: https://thc.texas.gov/historic-sites/old-socorro-mission
 * THC history: https://thc.texas.gov/state-historic-sites/old-socorro-mission/old-socorro-mission-history
 * NPS (different, visitable church): https://www.nps.gov/places/socorro-mission.htm
 * Reviewed 2026-10-19. Do not replace the documentary context image with a
 * claimed photograph of the protected original site.
 */
const thc = "https://thc.texas.gov/historic-sites/old-socorro-mission";
const history = "https://thc.texas.gov/state-historic-sites/old-socorro-mission/old-socorro-mission-history";
const nps = "https://www.nps.gov/places/socorro-mission.htm";
const npsHistory = "https://www.nps.gov/subjects/travelspanishmissions/socorro-mission-mission-nuestra-senora-de-la-limpia-concepcion-del-pueblo-de-socorro.htm";
const modernPhoto = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Socorro%20Mission%2C%20Mission%20Trail%2C%20El%20Paso%2C%20Texas%20%282b1d2a78-155d-451f-679e-7d70fee5ef0f%29.jpg?width=1600";
const modernPhotoSource = "https://commons.wikimedia.org/wiki/File:Socorro_Mission,_Mission_Trail,_El_Paso,_Texas_(2b1d2a78-155d-451f-679e-7d70fee5ef0f).jpg";
const linkClass = "font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary";

const timeline = [
  { year: "1680", title: "The Pueblo Revolt and southward migration", text: "After Pueblo peoples rose against Spanish colonial rule in New Mexico, Spanish settlers and some Indigenous Pueblo communities traveled south into the El Paso del Norte region. Their experiences and motives were not all the same." },
  { year: "1680–84", title: "An early Socorro settlement and temporary church", text: "THC records a Franciscan foundation in October 1680, says its first exact location is unknown, and documents a temporary church at this archaeological location by 1684. THC's overview uses 1682 as the mission's founding date." },
  { year: "1691", title: "A permanent adobe church", text: "A permanent church dedicated to Nuestra Señora de la Limpia Concepción de los Piros de Socorro del Sur stood here. Its roof was supported by wooden vigas; the settlement included Piro, Tano, Jemez and Spanish residents." },
  { year: "1740s", title: "Flooding and rebuilding", text: "The original mission building was destroyed in a Rio Grande flood and reconstructed. The river's changing channel repeatedly altered where the community could build." },
  { year: "1829–1840s", title: "Another flood and a new church", text: "A destructive 1829 flood shifted the river channel; the mission was relocated. The present-day Socorro Mission, a distinct operating church, was built in the 1840s about half a mile northwest of the old location." },
  { year: "Early 1980s", title: "Archaeologists identify the remains", text: "University of Texas at El Paso-associated research located mission wall foundations in a cruciform plan and artifacts dating to the 1680s. The original site is now a protected State Antiquities Landmark." },
];
const related = [
  { href: "/article/el-camino-real-de-tierra-adentro-national-historic-trail", name: "El Camino Real & El Paso Mission Trail", note: "A route for public heritage stops, not an entrance to the closed excavation." },
  { href: "/destination/ysleta-del-sur-pueblo-cultural-center-museum-el-paso", name: "Ysleta del Sur Pueblo Cultural Center", note: "Contemporary Tigua history presented by the Pueblo; this is a separate place." },
  { href: "/article/texas-borderlands-historic-sites-guide", name: "Texas borderlands history", note: "Connect Pueblo communities, Spanish colonial institutions and later borderlands history." },
  { href: "/county/el-paso", name: "El Paso County", note: "The county's mission landscapes, heritage and other destinations." },
  { href: "/city/el-paso", name: "El Paso city guide", note: "Urban history, museums and the surrounding desert region." },
  { href: "/metro-area/el-paso-metro", name: "El Paso metro guide", note: "Regional geography and communities across the borderlands." },
  { href: "/destination/magoffin-home", name: "Magoffin Home", note: "A different, nineteenth-century chapter of El Paso's history; verify restoration access." },
];
const questions = [
  { question: "Can you visit Old Socorro Mission?", answer: "No. The Texas Historical Commission states that the original archaeological site is closed to the public and has no public services or facilities. Do not enter the property or use its historical map pin as a visitor entrance." },
  { question: "Is this the same as the Socorro Mission church on the Mission Trail?", answer: "No. The original Old Socorro archaeological site is closed. La Purísima Socorro Mission at 328 S. Nevarez Road is the later, operating church. Confirm worship services and visitor access with the church before traveling." },
  { question: "When was the mission founded?", answer: "THC's overview lists 1682, while its detailed chronology records a Franciscan foundation in October 1680, a temporary church at this known location by 1684 and a permanent adobe church completed by 1691. These dates describe different stages rather than one surviving original building." },
  { question: "What did archaeologists find?", answer: "In the early 1980s, archaeological work documented remains of the mission's walls in a cruciform arrangement and artifacts from the 1680s. THC also locates a Piro Pueblo settlement about 600 feet northeast of the former church." },
  { question: "Why is the original church no longer standing?", answer: "Repeated Rio Grande flooding destroyed or disrupted earlier mission buildings; major floods occurred in the 1740s and 1829. The church community moved to a new location, where the present-day mission was built in the 1840s." },
];
const sources = [
  { url: thc, title: "Texas Historical Commission — Old Socorro Mission", note: "Operator record: site closure, protection, historic overview and no available facilities." },
  { url: history, title: "Texas Historical Commission — Old Socorro history", note: "1680–1691 chronology, Pueblo settlement, floods and archaeological discoveries." },
  { url: nps, title: "National Park Service — La Purísima Socorro Mission", note: "Separate modern church, its address and its status along El Camino Real." },
  { url: npsHistory, title: "National Park Service — Socorro mission history", note: "Pueblo Revolt context, relocation and construction history." },
];

export default function OldSocorroMissionAuthority() {
  return <main>
    <Container className="pt-10 sm:pt-12">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
        <Link to="/">Texas Defined</Link><span aria-hidden>·</span>
        <Link to="/explore/$category" params={{ category: "historic-sites" }}>Historic sites</Link><span aria-hidden>·</span>
        <span aria-current="page">Old Socorro Mission</span>
      </nav>
    </Container>
    <header className="mt-5 overflow-hidden bg-ink text-ink-foreground">
      <Container className="grid gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow text-ink-foreground/80">El Paso County · Protected archaeological landscape</p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl leading-tight sm:text-7xl">Old Socorro Mission</h1>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-ink-foreground/80">The original Socorro mission site: Pueblo Revolt refugees, a seventeenth-century adobe church, a changing Rio Grande and archaeology that recovered a lost landscape.</p>
          <p className="mt-6 max-w-3xl text-base leading-7 text-ink-foreground/80"><strong>Important:</strong> The original mission site is closed to the public. This is a history and archaeology guide, not an admission or driving guide.</p>
          <a href={thc} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block border-b border-current pb-1 text-sm font-semibold">Check the state site's official closure notice ↗</a>
        </div>
        <div className="border-l-2 border-ink-foreground/20 pl-6">
          <p className="eyebrow text-ink-foreground/80">At a glance</p>
          <dl className="mt-5 space-y-5 text-sm">
            <div><dt className="text-ink-foreground/80">Access</dt><dd className="mt-1 text-xl font-semibold">Closed to the public</dd></div>
            <div><dt className="text-ink-foreground/80">Known mission location</dt><dd className="mt-1 text-xl font-semibold">Used by the 1680s</dd></div>
            <div><dt className="text-ink-foreground/80">Permanent church</dt><dd className="mt-1 text-xl font-semibold">1691</dd></div>
            <div><dt className="text-ink-foreground/80">Historic protection</dt><dd className="mt-1 text-xl font-semibold">State Antiquities Landmark</dd></div>
          </dl>
        </div>
      </Container>
    </header>
    <section className="border-b border-border bg-surface py-10 sm:py-14">
      <Container className="grid gap-6 md:grid-cols-2">
        <article className="border-t-4 border-foreground pt-5">
          <p className="eyebrow text-primary">Original location · Do not visit</p>
          <h2 className="mt-3 font-display text-3xl">Old Socorro archaeological site</h2>
          <p className="mt-4 leading-7">10551 Nicholas Road, Socorro, Texas, is the historical location published by the Texas Historical Commission. It is <strong>not open</strong>; no public tours, visitor entrance, restrooms or on-site services are offered. This address is provided for historical identification, not travel directions.</p>
          <a className={linkClass + " mt-4 inline-block"} href={thc} target="_blank" rel="noopener noreferrer">THC archaeological-site record ↗</a>
        </article>
        <article className="border-t-4 border-foreground pt-5">
          <p className="eyebrow text-primary">Later church · Separate operator</p>
          <h2 className="mt-3 font-display text-3xl">La Purísima Socorro Mission</h2>
          <p className="mt-4 leading-7">The present-day mission church, completed in the 1840s, is at <strong>328 S. Nevarez Road</strong>. It is not the archaeological location described on this page. As an active religious property, its entry and worship arrangements should be confirmed with its operator.</p>
          <a className={linkClass + " mt-4 inline-block"} href={nps} target="_blank" rel="noopener noreferrer">NPS record for the current mission ↗</a>
        </article>
      </Container>
    </section>
    <Container className="py-14 sm:py-20">
      <div className="max-w-4xl">
        <p className="eyebrow text-primary">History beyond a building</p>
        <h2 className="mt-3 font-display text-4xl">A Pueblo community in the aftermath of 1680</h2>
        <p className="mt-6 leading-8">The Socorro story began far north of today's El Paso. The 1680 Pueblo Revolt challenged Spanish colonial rule in New Mexico. Spanish refugees and some Pueblo communities subsequently moved down the Rio Grande to the El Paso del Norte region. Their resettlement brought together Piro, Tano, Jemez and Spanish people whose histories should not be collapsed into a single colonial narrative.</p>
        <p className="mt-5 leading-8">This was not merely a free-standing chapel. The Texas Historical Commission identifies a Piro Pueblo about 600 feet northeast of the church and a settlement with residential, religious and agricultural dimensions. Studying both the church and pueblo makes the site important for understanding Indigenous community history and colonial disruption.</p>
        <p className="mt-5 leading-8">THC describes the location as Texas's oldest <em>known</em> mission site, an archaeological distinction rather than a claim that an original seventeenth-century church still stands. <a href={history} className={linkClass} target="_blank" rel="noopener noreferrer">Read the Commission's site history ↗</a></p>
      </div>
    </Container>
    <section className="border-y border-border bg-surface py-14 sm:py-20">
      <Container>
        <p className="eyebrow text-primary">Evidence-based timeline</p>
        <h2 className="mt-3 font-display text-4xl">How the mission changed location</h2>
        <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">The dates below distinguish initial settlement, construction, destruction and the later church. The 1680 and 1682 founding references are not treated as interchangeable.</p>
        <ol className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{timeline.map((event) => <li key={event.year} className="border-t-2 border-foreground pt-5">
          <p className="font-display text-3xl text-primary">{event.year}</p>
          <h3 className="mt-3 font-display text-2xl">{event.title}</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{event.text}</p>
        </li>)}</ol>
      </Container>
    </section>
    <Container className="grid gap-10 py-14 sm:py-20 lg:grid-cols-2">
      <div>
        <p className="eyebrow text-primary">Why archaeology matters</p>
        <h2 className="mt-3 font-display text-4xl">What survives underground</h2>
        <p className="mt-5 leading-8">When researchers associated with the University of Texas at El Paso investigated in the early 1980s, they documented adobe church walls arranged in a cruciform plan, plus materials dating to the 1680s. Those findings linked historical documents to a specific mission landscape, even though the early building no longer stands.</p>
        <p className="mt-5 leading-8">The Rio Grande was a powerful agent in this history. Floods damaged or destroyed successive mission buildings, and the river channel moved. That is why modern street addresses, river boundaries and a photograph of today's church cannot be substituted for archaeological evidence at the original location.</p>
        <p className="mt-5 leading-8">Protection means there is no visitor trail across the excavation. For a genuine view of the original site's official historical markers, use <a href={thc} className={linkClass} target="_blank" rel="noopener noreferrer">THC's photograph gallery</a>. Texas Defined has not reproduced those photographs without verified reuse rights.</p>
      </div>
      <figure className="min-w-0 self-start border border-border">
        <img src={modernPhoto} width={1600} height={1069} loading="lazy" decoding="async" alt="The later, operating La Purísima Socorro Mission church on the El Paso Mission Trail, not the closed original Old Socorro archaeological site" className="aspect-[3/2] w-full bg-surface object-contain" />
        <figcaption className="p-5 text-sm leading-7"><strong>Different location — modern Socorro Mission.</strong> This National Park Service photograph documents the surviving, operating church built in the 1840s. It does <strong>not</strong> show the original Old Socorro archaeological site. <a className={linkClass} href={modernPhotoSource} target="_blank" rel="noopener noreferrer">NPS photograph · U.S. public domain ↗</a>.</figcaption>
      </figure>
    </Container>
    <section className="border-y border-border py-14 sm:py-20">
      <Container>
        <p className="eyebrow text-primary">Continue your research or visit separate public destinations</p>
        <h2 className="mt-3 font-display text-4xl">Old Socorro in the El Paso historical network</h2>
        <p className="mt-4 max-w-4xl leading-8">Explore the connected Mission Trail, Indigenous heritage and El Paso County guides below. A link to a nearby attraction does not change the original archaeological site's closure. Check each site's own current public access before traveling.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{related.map((item) => <Link key={item.href} to={item.href} className="block border-t-2 border-foreground pt-5 hover:text-primary">
          <h3 className="font-display text-2xl">{item.name} →</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.note}</p>
        </Link>)}</div>
      </Container>
    </section>
    <Container className="py-14 sm:py-20">
      <p className="eyebrow text-primary">Quick answers</p>
      <h2 className="mt-3 font-display text-4xl">Old Socorro Mission FAQ</h2>
      <dl className="mt-8 grid gap-x-12 gap-y-8 md:grid-cols-2">{questions.map((item) => <div key={item.question} className="border-t border-border pt-5">
        <dt className="font-display text-2xl">{item.question}</dt>
        <dd className="mt-3 text-sm leading-7 text-muted-foreground">{item.answer}</dd>
      </div>)}</dl>
    </Container>
    <section className="border-t border-border bg-surface py-12 sm:py-16">
      <Container>
        <p className="eyebrow text-primary">Evidence and provenance · Reviewed October 19, 2026</p>
        <h2 className="mt-3 font-display text-3xl">Primary research sources</h2>
        <p className="mt-4 max-w-4xl text-sm leading-7">The Texas Historical Commission controls public access at the protected Old Socorro site. The National Park Service materials describe the distinct operating church and the wider mission timeline. Image attribution is shown alongside the contextual photograph above.</p>
        <ul className="mt-7 grid gap-5 sm:grid-cols-2">{sources.map((item) => <li key={item.url} className="border-l-2 border-foreground pl-5">
          <a href={item.url} target="_blank" rel="noopener noreferrer" className={linkClass}>{item.title} ↗</a>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.note}</p>
        </li>)}</ul>
      </Container>
    </section>
  </main>;
}
