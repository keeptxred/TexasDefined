import { Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";

const slug = "young-county-museum-of-history-and-culture";
const official = "https://ycmohc.com/";
const sources = [
  { name: "Museum visitor information", url: official, note: "Hours, location, appointment policy and field trips" },
  { name: "Permanent exhibits", url: "https://ycmohc.com/exhibitions/", note: "The museum's stated collection areas and virtual exhibit photographs" },
  { name: "Virtual archives and library", url: "https://ycmohc.com/archives/", note: "Historical subjects and research-appointment policy" },
  { name: "Museum historical timeline", url: "https://ycmohc.com/timeline/", note: "Exhibit chronology extending through the 1960s; compare interpretations with independent sources" },
  { name: "Historic-map directory", url: "https://ycmohc.com/maps/", note: "GLO maps, Sanborn maps and its historic-site driving map" },
  { name: "Museum institutional information", url: "https://ycmohc.com/about-us/", note: "Present collection building and proposed Goodyear relocation" },
  { name: "Handbook of Texas — Young County", url: "https://www.tshaonline.org/handbook/entries/young-county", note: "Independently documented settlement, reservations, county government, agriculture and oil" },
  { name: "Handbook of Texas — Fort Belknap", url: "https://www.tshaonline.org/handbook/entries/fort-belknap", note: "Military post and Butterfield Overland Mail context" },
  { name: "Texas Time Travel museum directory", url: "https://texastimetravel.com/directory/young-county-museum-of-history-culture/", note: "Third-party heritage tourism listing" },
];

const visit = [
  { label: "Location", value: "609 Fourth Street, Graham, TX 76450" },
  { label: "Public hours", value: "Wednesday–Saturday · 10 a.m.–4 p.m." },
  { label: "Other days", value: "Call ahead for an appointment" },
  { label: "Telephone", value: "940-282-2887" },
  { label: "Admission", value: "Current price not clearly published; call to confirm" },
  { label: "Research library", value: "Study by appointment; not a lending library" },
];

const exhibits = [
  {
    title: "Indigenous lives and the Brazos reservation",
    detail: "Begin before county lines. Caddo, Anadarko, Waco, Tonkawa and other communities lived in the wider Brazos region, and Kiowa and Comanche histories shaped the nineteenth century. Interpret reservation-era objects and narratives with the 1854 creation and 1859 removal of the Brazos Indian Reservation in mind.",
  },
  {
    title: "The Fort Belknap frontier",
    detail: "Military artifacts, early settlement materials and maps help connect the fort established in 1851 to roads, trade and the growth of the original Belknap county-seat community. The fort's strategic role was inseparable from the displacement and conflict experienced by Native peoples.",
  },
  {
    title: "Cattle, ranchers and everyday work",
    detail: "Saddles, bits, brands, implements and personal objects reveal how ranch life worked beyond the familiar trail-drive mythology. Graham was the 1877 birthplace of the association that became the Texas and Southwestern Cattle Raisers Association.",
  },
  {
    title: "The county's oil and boomtown years",
    detail: "Oil development after 1920 reshaped Young County employment, transportation, housing and finance. Look for connections between oil-related artifacts and the older settlements, ranches and railroad-linked communities they changed.",
  },
  {
    title: "County families and their documents",
    detail: "Photographs, furniture, letters, books and memorabilia document ordinary people as well as famous figures. Ask which items came from named local families and whether descriptions are supported by archival records or oral accounts.",
  },
  {
    title: "Maps and place names",
    detail: "Use the wall timeline and historic maps to trace how Fort Belknap, Graham, Olney and Newcastle gained or lost influence. The museum links visitors to General Land Office and Library of Congress maps that help turn a simple walking tour into geographic research.",
  },
];

const history = [
  { date: "Before 1851", title: "Indigenous Brazos country", text: "Multiple Native communities inhabited, traveled and traded through the upper Brazos and adjacent plains. Modern county boundaries do not describe the earlier cultural landscape." },
  { date: "1851", title: "Fort Belknap founded", text: "The United States Army established a frontier post near the Red Fork of the Brazos. Its location and roads transformed the region." },
  { date: "1854–1859", title: "Brazos Indian Reservation", text: "A federal reservation confined several Indigenous communities in the area; the forced removal of its residents in 1859 altered the county's human geography." },
  { date: "1856", title: "Young County organized", text: "Belknap became the county seat. The community depended on its nearby military post and overland routes." },
  { date: "1871–1874", title: "Conflict and a new county seat", text: "The Warren Wagon Train Raid occurred in 1871. Graham replaced Belknap as county seat in the 1874 reorganization." },
  { date: "1877", title: "Ranching becomes organized", text: "Stock raisers gathered in Graham to establish the predecessor of the modern Texas and Southwestern Cattle Raisers Association." },
  { date: "Early 1900s", title: "Coal and railways", text: "The growth of Newcastle and changes in Olney show how energy production and transport altered county settlement patterns." },
  { date: "1920s–1950s", title: "Oil, Depression and modern county life", text: "Petroleum, New Deal-era changes and the postwar years shaped the economy, neighborhoods and local records the museum collects." },
];

const deeperQuestions = [
  { question: "Is this the same museum as The Old Post?", answer: "No. The Young County Museum of History & Culture is at 609 Fourth Street and specializes in county-wide history and archives. The Old Post at 510 Third Street operates in Graham's 1936 post office and combines local history with art exhibitions and Alexandre Hogue's Oil Fields of Graham mural." },
  { question: "Is there an entrance fee?", answer: "The museum's visitor pages do not clearly publish a current price. Call 940-282-2887 before planning around free or paid entry; do not confuse this site with other Graham museums." },
  { question: "Can I use the archives for genealogy or historical research?", answer: "The museum describes almost 200 books and documents and welcomes study appointments; it is not a lending library. Contact staff first with names, dates, or the topic you want to investigate." },
  { question: "Can a teacher arrange a field trip?", answer: "Yes. The museum advertises school field trips designed around student ages, group size and curriculum themes, including early settlers, Indigenous history and cowboys. Arrange details directly with the museum." },
  { question: "Has the museum moved to the Goodyear Building?", answer: "The official About page discusses the Goodyear Building as a planned permanent home, but its published visitor address remains 609 Fourth Street. A possible future relocation is not evidence of a completed move. Verify directly before your visit." },
  { question: "Can I visit every historic site shown on the museum's maps?", answer: "No. The museum warns that some mapped sites are on private property. Use public streets, designated museum and historical-site grounds, and clearly permitted access routes." },
];

const related = [
  { label: "Young County guide", href: "/county/young", note: "Geography, history, census context and additional attractions" },
  { label: "Young County frontier history", href: "/article/young-county-graham-fort-belknap-brazos-cross-timbers-texas", note: "The long-form county chronology and changing landscape" },
  { label: "The Old Post Museum & Art Center", href: "/destination/old-post-office-museum-art-center-graham", note: "A different Graham museum focused on civic art and local history" },
  { label: "Graham destination guide", href: "/destination/graham", note: "The courthouse square and surrounding small-town experiences" },
  { label: "Texas museums directory", href: "/explore/museums", note: "More source-checked museum guides statewide" },
  { label: "Explore Texas history", href: "/texas-history", note: "Context for frontier history, Indigenous Texas and county settlement" },
];

export default function YoungCountyMuseumAuthority() {
  return <main>
    <Container className="pt-10 sm:pt-14">
      <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-xs uppercase tracking-widest text-muted-foreground">
        <Link to="/">Home</Link><span>·</span><Link to="/explore/museums">Museums</Link><span>·</span><Link to="/county/young">Young County</Link>
      </nav>
      <header className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] lg:items-end">
        <div>
          <p className="eyebrow text-primary">Graham · North Texas · Independently researched museum guide</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[1.02] sm:text-6xl">Young County Museum of History &amp; Culture</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">More than a quick exhibit stop: this is a gateway into Indigenous Brazos history, Fort Belknap, cattle drives, oil-boom Graham, original county maps, oral histories and personal archives.</p>
          <p className="mt-5 text-sm leading-7">The museum preserves Young County's nineteenth- and twentieth-century record. This independent guide adds verified visitor details, historical context, suggested ways to interpret the collection and a practical heritage itinerary.</p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            <a href={official} target="_blank" rel="noopener noreferrer" className="border-b border-primary pb-1 text-primary">Official visitor website ↗</a>
            <a href="tel:+19402822887" className="border-b border-primary pb-1 text-primary">Call the museum</a>
            <a href="https://www.google.com/maps/search/?api=1&query=609+Fourth+Street+Graham+Texas+76450" target="_blank" rel="noopener noreferrer" className="border-b border-primary pb-1 text-primary">Get directions ↗</a>
          </div>
        </div>
        <figure className="overflow-hidden border border-border">
          <img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Young_County_courthouse_in_Graham%2C_Texas.jpg?width=1600" alt="Young County Courthouse, a historic Graham landmark near the museum, not the museum building" width={1281} height={849} decoding="async" className="aspect-[4/3] w-full object-cover" />
          <figcaption className="px-4 py-3 text-xs leading-5 text-muted-foreground">Graham context photograph: Young County Courthouse, <strong>not the museum building</strong>. Larry D. Moore · <a href="https://commons.wikimedia.org/wiki/File:Young_County_courthouse_in_Graham,_Texas.jpg" className="text-primary underline underline-offset-4" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a> · <a href="https://creativecommons.org/licenses/by/4.0/" className="text-primary underline underline-offset-4" target="_blank" rel="noopener noreferrer">CC BY 4.0</a>.</figcaption>
        </figure>
      </header>
      <nav aria-label="Sections in this museum guide" className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-y border-border py-5 text-sm">
        {[
          ["Plan your visit", "visit"],
          ["Exhibits", "exhibits"],
          ["Historical timeline", "timeline"],
          ["Research", "research"],
          ["Nearby", "nearby"],
          ["Sources", "sources"],
        ].map(([label, id]) => <a key={id} href={`#${id}`} className="font-semibold text-primary underline-offset-4 hover:underline">{label}</a>)}
      </nav>
    </Container>

    <Container className="py-12 sm:py-16">
      <section id="visit" aria-labelledby="visit-title">
        <p className="eyebrow text-primary">Visitor essentials · Verified October 9, 2026</p>
        <h2 id="visit-title" className="mt-3 font-display text-4xl">Plan your museum visit</h2>
        <div className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {visit.map(({ label, value }) => <div key={label} className="border-t border-border pt-5"><h3 className="eyebrow text-primary">{label}</h3><p className="mt-3 text-base leading-7">{value}</p></div>)}
        </div>
        <p className="mt-7 max-w-4xl leading-8 text-muted-foreground">The museum invites calls even from small groups, especially when visitors want staff context. Plan roughly 60–90 minutes for an introduction, longer for research or conversations; that estimate is an editorial suggestion, not an official timed tour. Accessibility details are not comprehensively published, so ask staff about mobility or other accommodation needs before arrival.</p>
        <div className="mt-8 border-l-4 border-primary bg-muted/30 p-6">
          <h3 className="font-display text-2xl">Building and location status</h3>
          <p className="mt-3 text-sm leading-7">The official About page describes the former Radford Wholesale Grocery and Warehouse as the present collection location and discusses a potential permanent home at the Goodyear Building nearby. Treat the <strong>published 609 Fourth Street address</strong> as the visitor reference until the museum confirms a move. Do not travel to the proposed location on the assumption it is open.</p>
        </div>
      </section>
    </Container>

    <section className="border-y border-border bg-muted/20 py-14 sm:py-16">
      <Container id="exhibits">
        <p className="eyebrow text-primary">A collection with several connected stories</p>
        <h2 className="mt-3 max-w-4xl font-display text-4xl">What to see—and what the objects mean</h2>
        <p className="mt-5 max-w-4xl leading-8">The museum describes a permanent collection of objects, images and memorabilia covering Native peoples, emigration and settlement, frontier forts, cowboys and petroleum. These are <strong>research-backed interpretation themes</strong>, not a guarantee that every named artifact is on display during your particular visit. <a href="https://ycmohc.com/exhibitions/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Preview official exhibit photographs ↗</a></p>
        <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {exhibits.map(({ title, detail }, index) => <article key={title} className="border border-border bg-background p-6">
            <p className="eyebrow text-primary">{String(index + 1).padStart(2, "0")} · Interpretation</p>
            <h3 className="mt-4 font-display text-2xl">{title}</h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{detail}</p>
          </article>)}
        </div>
      </Container>
    </section>

    <Container className="py-14 sm:py-16">
      <section id="timeline" aria-labelledby="timeline-title">
        <p className="eyebrow text-primary">The chronology behind the collection</p>
        <h2 id="timeline-title" className="mt-3 font-display text-4xl">A Young County timeline that explains the changes</h2>
        <p className="mt-5 max-w-4xl leading-8 text-muted-foreground">The museum offers a longer chronological wall exhibit and online timeline. This shorter independent synthesis emphasizes causes, changes in power and the relationship between land, people and the economy. It is based on the museum's published timeline and the Handbook of Texas.</p>
        <ol className="mt-9 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {history.map((item) => <li key={item.date} className="border-t border-border pt-5"><p className="eyebrow text-primary">{item.date}</p><h3 className="mt-3 font-display text-2xl">{item.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.text}</p></li>)}
        </ol>
        <p className="mt-8 text-sm leading-7">For dated source notes and further episodes, consult the <a href="https://ycmohc.com/timeline/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">museum's fuller chronology</a> and the <a href="https://www.tshaonline.org/handbook/entries/young-county" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Handbook of Texas county history</a>.</p>
      </section>
    </Container>

    <section className="border-y border-border py-14 sm:py-16">
      <Container id="research">
        <p className="eyebrow text-primary">For genealogists, students and serious local-history readers</p>
        <h2 className="mt-3 font-display text-4xl">Go beyond the exhibit labels</h2>
        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl">Books, documents and oral history</h3>
            <p className="mt-4 leading-8">The museum reports a research collection of nearly 200 books and documents, including county and regional histories. It is an <strong>on-site research resource by appointment</strong>, not a circulating library. Recorded recollections and locally compiled biographical sketches may provide valuable leads, but memories and later retellings should be checked against contemporary records where possible.</p>
            <p className="mt-4 leading-8">A useful inquiry states the exact family surname or event, approximate years, town or rural community, and whether you seek photographs, newspaper references, deeds, cemetery locations or oral histories.</p>
            <a href="https://ycmohc.com/archives/" target="_blank" rel="noopener noreferrer" className="mt-5 inline-block border-b border-primary pb-1 font-semibold text-primary">Explore the museum's archive index ↗</a>
          </div>
          <div>
            <h3 className="font-display text-2xl">Maps that reveal what changed</h3>
            <p className="mt-4 leading-8">The museum links to Texas General Land Office surveys and federal Sanborn fire-insurance maps of Graham, Newcastle and Olney. Compare historic streets, buildings and town boundaries with the current map to understand commercial movement, rail service and the courthouse's changing role.</p>
            <p className="mt-4 leading-8">Its Google Earth historic-site map is a work in progress. Some sites shown lie on private land: use public roadways and confirmed visitor sites and never assume map inclusion grants access.</p>
            <a href="https://ycmohc.com/maps/" target="_blank" rel="noopener noreferrer" className="mt-5 inline-block border-b border-primary pb-1 font-semibold text-primary">Open historic maps and touring map ↗</a>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-8">
          <h3 className="font-display text-2xl">Four questions worth asking on site</h3>
          <ul className="mt-5 grid gap-4 text-sm leading-7 sm:grid-cols-2">
            <li>Which item has the clearest documented family provenance?</li>
            <li>Which oral account differs from a newspaper or government record?</li>
            <li>What map best explains why Graham displaced Belknap as county seat?</li>
            <li>Which stories are still missing or underrepresented in the collection?</li>
          </ul>
        </div>
      </Container>
    </section>

    <Container id="nearby" className="py-14 sm:py-16">
      <p className="eyebrow text-primary">Build an actual history day</p>
      <h2 className="mt-3 font-display text-4xl">From the museum into Young County</h2>
      <p className="mt-5 max-w-4xl leading-8">A museum visit makes more sense when you can stand in the places it describes. The order below minimizes backtracking around Graham before a longer drive toward Fort Belknap. Confirm each separate site's visiting schedule.</p>
      <ol className="mt-8 grid gap-6 md:grid-cols-3">
        {[
          { step: "01", title: "Start at 609 Fourth Street", desc: "Use the museum timeline and collections to recognize the county's main eras. Ask about staff-led context and research resources." },
          { step: "02", title: "Walk the courthouse square", desc: "Look for civic buildings, traditional storefronts and street patterns tied to the 1874 rise of Graham. Use public sidewalks." },
          { step: "03", title: "Add The Old Post or Fort Belknap", desc: "For an indoor companion visit, choose The Old Post. For a longer frontier-focused route, drive toward Fort Belknap near Newcastle." },
        ].map(({ step, title, desc }) => <li key={step} className="border-t border-border pt-5"><p className="eyebrow text-primary">Stop {step}</p><h3 className="mt-3 font-display text-2xl">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{desc}</p></li>)}
      </ol>
      <h3 className="mt-12 font-display text-3xl">More places and context on TexasDefined</h3>
      <div className="mt-7 grid gap-x-10 gap-y-4 sm:grid-cols-2">
        {related.map(({ label, href, note }) => <a key={href} href={href} className="block border-t border-border pt-4 hover:text-primary"><span className="font-semibold underline decoration-primary/40 underline-offset-4">{label} →</span><span className="mt-2 block text-sm leading-6 text-muted-foreground">{note}</span></a>)}
      </div>
    </Container>

    <section className="border-t border-border py-14 sm:py-16">
      <Container>
        <p className="eyebrow text-primary">Answers for visitors and researchers</p>
        <h2 className="mt-3 font-display text-4xl">Frequently asked questions</h2>
        <div className="mt-7 max-w-4xl divide-y divide-border">
          {deeperQuestions.map(({ question, answer }) => <section key={question} className="py-6"><h3 className="font-display text-xl">{question}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{answer}</p></section>)}
        </div>
      </Container>
    </section>

    <section className="border-t border-border bg-muted/20 py-14 sm:py-16">
      <Container id="sources">
        <p className="eyebrow text-primary">Primary sources and editorial transparency</p>
        <h2 className="mt-3 font-display text-4xl">Sources, limitations and last verification</h2>
        <p className="mt-5 max-w-4xl leading-8">TexasDefined editorial research · <strong>Last verified October 9, 2026.</strong> Museum-specific operating facts and exhibit subjects come from the museum; independent county history is cross-checked with the Handbook of Texas. This guide is not the museum's official website. The museum's exhibitions, fees, location plans and public hours can change. We do not claim to have visited in person or accessed unpublished collection records.</p>
        <ul className="mt-8 grid gap-5 lg:grid-cols-2">
          {sources.map(({ name, url, note }) => <li key={url} className="border-t border-border pt-5"><a href={url} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">{name} ↗</a><p className="mt-2 text-sm leading-6 text-muted-foreground">{note}</p></li>)}
        </ul>
        <p className="mt-9 max-w-4xl text-sm leading-7">Suggested citation: TexasDefined Editorial Desk, “Young County Museum of History &amp; Culture: Exhibits, Local History &amp; Visitor Guide,” TexasDefined, verified October 9, 2026, <a href={`https://texasdefined.com/destination/${slug}`} className="text-primary underline underline-offset-4">permanent URL</a>.</p>
        <div className="mt-6 flex flex-wrap gap-6 text-sm"><Link to="/authors/a-hollis" className="text-primary underline underline-offset-4">Editorial desk</Link><Link to="/about" className="text-primary underline underline-offset-4">About TexasDefined</Link></div>
      </Container>
    </section>
  </main>;
}
