import { Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";

const links = {
  atlas: "https://atlas.thc.texas.gov/Details/4200000614",
  tour: "https://texastimetravel.com/directory/yoakum-heritage-museum-tour/",
  directory: "https://texastimetravel.com/directory/yoakum-heritage-museum/",
  communityBook: "https://texashistory.unt.edu/ark:/67531/metapth880869/m1/34/",
  tsha: "https://www.tshaonline.org/handbook/entries/yoakum-tx",
  railway: "https://www.tshaonline.org/handbook/entries/san-antonio-and-aransas-pass-railway",
  chamber: "https://www.yoakumareachamber.com/our-members/organizations/",
  museum: "https://www.facebook.com/YHMuseum/",
  directions: "https://www.google.com/maps/search/?api=1&query=Yoakum+Heritage+Museum+312+Simpson+Street+Yoakum+Texas+77995",
};

const keyDates = [
  { year: "1887", title: "Railway arrival", description: "The San Antonio and Aransas Pass line sparks Yoakum's emergence as a railroad town." },
  { year: "1888", title: "Railway shops", description: "Railway shops and roundhouse work become powerful drivers of jobs and settlement." },
  { year: "1912", title: "A house takes shape", description: "The Elkins residence is rebuilt around this year; later it becomes the museum's home." },
  { year: "1919", title: "Leather industry", description: "Carl Welhausen takes over the tannery that develops into Tex-Tan." },
  { year: "1981–82", title: "Museum founded", description: "Local volunteers organize in 1981; the museum receives its charter January 26, 1982." },
  { year: "1986", title: "House gift", description: "Mary Bell Browning deeds the former Elkins house to the museum, securing its lasting home." },
];

const exhibitThemes = [
  { title: "Railroad room", detail: "Photographs, mementos and objects connect the San Antonio and Aransas Pass Railway to the town's growth, its work force and a network spanning Central and South Texas." },
  { title: "Leather Room", detail: "Displays on tanneries and leather crafts include saddles and goods that explain why Yoakum became known as a leather capital. Learn how Tex-Tan helped turn regional hides and skilled labor into an industry." },
  { title: "Historic house", detail: "The former Elkins–Browning residence is an artifact in its own right. Look for the distinctive stair, stained and beveled glazing and domestic rooms repurposed for public memory." },
  { title: "Military and community history", detail: "Military objects and locally collected material interpret the lives of Yoakum residents across generations. Displays and temporary themes may vary; check ahead." },
  { title: "Tomatoes and town industries", detail: "The wider town story includes cotton, produce packing and the tomato trade, particularly the packing sheds of the 1940s. Ask staff what materials are currently displayed." },
  { title: "Seasonal exhibitions", detail: "Visitor accounts describe a Christmas Tree Forest and rotating community displays. Dates and installation sizes are not confirmed for 2026; consult museum-run updates." }
];

const sourceList = [
  { label: "Museum record — Texas Historical Commission", href: links.atlas, note: "Address, published phone number, historical visiting-hours snapshot, Atlas 4200000614; last updated in 2021" },
  { label: "Museum tour — Texas Time Travel", href: links.tour, note: "Leather Room, the Elkins home, military and San Antonio and Aransas Pass Railroad exhibits" },
  { label: "Museum directory — Texas Time Travel", href: links.directory, note: "1912 building and fine-tooled leather objects" },
  { label: "Yoakum Community: The First Hundred Years, page 24", href: links.communityBook, note: "Firsthand local civic account of the 1981 organizing meeting, 1982 charter, home donation, founder roster and architectural features" },
  { label: "Yoakum, TX — Handbook of Texas", href: links.tsha, note: "Town chronology, railway employment, Tex-Tan, tomato commerce and May Tom-Tom" },
  { label: "San Antonio and Aransas Pass Railway — Handbook of Texas", href: links.railway, note: "Railway chronology and regional network history" },
  { label: "Yoakum Area Chamber of Commerce", href: links.chamber, note: "Locally maintained contact-directory listing" },
  { label: "Museum-managed public updates", href: links.museum, note: "Verify current schedules, exhibits and closures directly; this is not a substitute for independent historical research" },
];

function External({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline decoration-primary/50 underline-offset-4 hover:decoration-primary">{children} ↗</a>;
}

function SectionHeader({ overline, title, description }: { overline: string; title: string; description?: string }) {
  return <div className="max-w-4xl">
    <p className="eyebrow text-primary">{overline}</p>
    <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">{title}</h2>
    {description && <p className="mt-4 text-base leading-8 text-muted-foreground">{description}</p>}
  </div>;
}

export default function YoakumHeritageMuseumAuthority() {
  return <main>
    <Container className="pt-8 sm:pt-12">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
        <Link to="/">Texas Defined</Link><span aria-hidden>·</span>
        <Link to="/explore/museums">Museums</Link><span aria-hidden>·</span>
        <span aria-current="page">Yoakum Heritage Museum</span>
      </nav>
    </Container>
    <section className="relative mt-6 overflow-hidden bg-ink text-ink-foreground">
      <img src="/images/yoakum-heritage-museum-editorial.svg" alt="Original editorial illustration interpreting Yoakum railroad, saddlery and the museum timeline; not a museum photograph" width={1600} height={900} fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-70"/>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/20"/>
      <Container className="relative flex flex-col justify-end pb-12 pt-28" style={{minHeight:"clamp(28rem, 52vw, 38rem)"}}>
        <p className="eyebrow text-ink-foreground/85">Yoakum · Lavaca County · Texas railroad and leather heritage</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-tight sm:text-7xl">Yoakum Heritage Museum</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/90">The most revealing stop for understanding how a railroad junction became a saddle-making, leather-working and tomato-shipping center — inside a historic home preserved by local citizens.</p>
        <p className="mt-5 text-xs text-ink-foreground/75">Original TexasDefined interpretive artwork, not a photograph of the house. <External href={links.tour}>See the real museum at Texas Time Travel</External>.</p>
      </Container>
    </section>
    <Container className="py-10 sm:py-14">
      <div className="grid gap-5 border-b border-border pb-8 sm:grid-cols-2 lg:grid-cols-4">
        <div><p className="eyebrow text-muted-foreground">Location</p><p className="mt-3 font-semibold">312 Simpson Street<br/>Yoakum, TX 77995</p></div>
        <div><p className="eyebrow text-muted-foreground">Contact</p><p className="mt-3"><a className="font-semibold text-primary underline" href="tel:+13612937022">(361) 293-7022</a></p><a href="mailto:yoakumheritagemuseum@gmail.com" className="mt-1 block break-all text-sm underline">Email the museum</a></div>
        <div><p className="eyebrow text-muted-foreground">Published hours</p><p className="mt-3 font-semibold">Tue, Thu, Sun: 1–4 p.m.<br/>Fri: 10 a.m.–4 p.m.</p><p className="mt-2 text-xs text-muted-foreground">From THC’s 2021 record; not verified as current</p></div>
        <div><p className="eyebrow text-muted-foreground">Admission</p><p className="mt-3 font-semibold">Confirm before visiting</p><p className="mt-2 text-sm text-muted-foreground">Older local listings describe donations; no current museum admission policy independently verified.</p></div>
      </div>
      <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-sm">
        <External href={links.directions}>Driving directions</External>
        <External href={links.museum}>Museum announcements</External>
        <External href={links.atlas}>State museum record</External>
      </div>
      <p className="mt-5 max-w-4xl border-l-2 border-primary pl-4 text-sm leading-7 text-muted-foreground"><strong>Before you leave:</strong> This is a volunteer-rooted historic-house museum with a limited published schedule. Phone the museum to verify today's opening, accessibility, group visits and temporary displays. The Texas Historical Commission entry has not been updated since August 2021. We have not represented its schedule as live availability.</p>
    </Container>
    <section className="border-y border-border bg-muted/30 py-14 sm:py-20">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(260px,.7fr)]">
        <div>
          <SectionHeader overline="Why it matters" title="A small town with three intertwined industrial histories"/>
          <p className="mt-7 text-lg leading-9">Railway arrivals did more than put Yoakum on a map. The San Antonio and Aransas Pass Railway established a townsite here in 1887 and located shops the following year. Employment at the roundhouse and the rail connection helped create a regional service center. Leather manufacturing grew as another economic engine, while fields, packing sheds and outbound rail links carried local tomatoes to distant markets.</p>
          <p className="mt-5 leading-8">The museum makes these changes tangible: railroad images alongside the material culture of saddle-making, military service and household life. Seeing the collections in an early twentieth-century home gives an extra dimension to the visit: local history is also the story of residents choosing to preserve a building and their neighbors’ artifacts.</p>
          <p className="mt-5 text-sm leading-7 text-muted-foreground">Historical basis: <External href={links.tsha}>Handbook of Texas</External> and <External href={links.railway}>San Antonio and Aransas Pass Railway history</External>.</p>
        </div>
        <aside className="border-t-2 border-foreground pt-6">
          <p className="eyebrow text-primary">Three things to look for</p>
          <ol className="mt-6 space-y-6">
            <li><span className="font-display text-2xl">01 · The railroad</span><p className="mt-2 text-sm leading-7 text-muted-foreground">Photos and mementos of the network that produced Yoakum's rapid growth.</p></li>
            <li><span className="font-display text-2xl">02 · Leather craft</span><p className="mt-2 text-sm leading-7 text-muted-foreground">Saddles and tannery history behind the town’s Leather Capital identity.</p></li>
            <li><span className="font-display text-2xl">03 · The house</span><p className="mt-2 text-sm leading-7 text-muted-foreground">A stair, stained glass and domestic details that survive as preservation artifacts.</p></li>
          </ol>
        </aside>
      </Container>
    </section>
    <Container className="py-14 sm:py-20">
      <SectionHeader overline="Detailed exhibit guide" title="What the museum preserves" description="The established exhibit themes below come from state heritage tourism records. Temporary objects, room access and special programs may change without notice."/>
      <div className="mt-9 grid gap-x-10 gap-y-9 md:grid-cols-2 lg:grid-cols-3">
        {exhibitThemes.map((item) => <article key={item.title} className="border-t border-border pt-5"><h3 className="font-display text-2xl">{item.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.detail}</p></article>)}
      </div>
    </Container>
    <section className="border-y border-border bg-muted/30 py-14 sm:py-20">
      <Container>
        <SectionHeader overline="A documented origin story" title="How Yoakum built its museum" description="The 1987 community centennial history records a more precise timeline than many brief tourist listings. Crucially, organizing the museum and acquiring the present house were different events."/>
        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {keyDates.map((item) => <div className="border-t border-border pt-5" key={item.year}><p className="font-display text-4xl text-primary">{item.year}</p><h3 className="mt-4 font-display text-xl">{item.title}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{item.description}</p></div>)}
        </div>
        <div className="mt-10 max-w-4xl space-y-5 leading-8">
          <p>The first organizing meeting was held on November 30, 1981. Local founders met with Yoakum’s city commission the next month, and the Secretary of State signed the museum’s charter on January 26, 1982. The centennial publication identifies 199 charter members in 1981–82 and describes an operation staffed by volunteers.</p>
          <p>The historic home story came later. Mary Bell Browning deeded the former Elkins residence to the museum on December 1, 1986. Earlier owners and renovations are part of its significance. A local account dates a planned rebuilding to about 1912 and specifically records stained glass, the ornate staircase and beveled entry glass. This helps reconcile guidebook shorthand that sometimes describes the museum as having been in the house since its founding.</p>
          <p className="text-sm text-muted-foreground">Source: <External href={links.communityBook}>1987 centennial book, page 24</External>. The date sequence above follows the published local account; this page does not claim that the house itself became a museum in 1982.</p>
        </div>
      </Container>
    </section>
    <Container className="py-14 sm:py-20">
      <SectionHeader overline="Beyond the display cases" title="How Yoakum's rail, leather and tomato histories fit together"/>
      <div className="mt-9 grid gap-10 lg:grid-cols-3">
        <article><h3 className="font-display text-2xl">Rail built the town</h3><p className="mt-4 leading-8">A station became a townsite, then shops and a roundhouse attracted railroad workers. The rail line was part of a system linking San Antonio, Corpus Christi, Houston, Waco and other Texas centers. It changed where freight, jobs and trade could travel. The city was named for railroad executive Benjamin Franklin Yoakum.</p></article>
        <article><h3 className="font-display text-2xl">Leather created a brand</h3><p className="mt-4 leading-8">Carl Welhausen's 1919 acquisition of a tannery led to the Tex-Tan business. Saddles and bridles served working ranchers; harnesses, belts, billfolds and other goods expanded the product range. The museum’s Leather Room is a place to connect the city's identity with manufacturing skill and changing markets.</p></article>
        <article><h3 className="font-display text-2xl">Tomatoes traveled far</h3><p className="mt-4 leading-8">The surrounding growing country added an agricultural chapter. Local commercial tomato production was documented from the 1920s, and by the 1940s roughly fifteen packing sheds shipped tomatoes north. Leather was not Yoakum's only industry; freight infrastructure mattered to agriculture too.</p></article>
      </div>
      <div className="mt-12 border-t border-border pt-7">
        <h3 className="font-display text-2xl">For students and local-history researchers</h3>
        <p className="mt-4 max-w-4xl leading-8">Use the museum visit as a starting point for primary-source work, not a substitute for it. Compare exhibit captions with the <External href={links.communityBook}>digitized 1987 community history</External>, the <External href={links.tsha}>Handbook of Texas town chronology</External> and <External href={links.railway}>railway history</External>. Ask the museum whether it holds finding aids or supports research inquiries before assuming its artifacts or archives are publicly searchable.</p>
      </div>
    </Container>
    <section className="border-y border-border bg-muted/30 py-14">
      <Container>
        <SectionHeader overline="Plan your visit" title="Three sensible ways to explore"/>
        <div className="mt-9 grid gap-8 md:grid-cols-3">
          <article className="border-t border-border pt-5"><p className="eyebrow text-primary">45–60 minutes · estimated</p><h3 className="mt-3 font-display text-2xl">Museum highlights</h3><p className="mt-3 text-sm leading-7">Start with the railroad and Leather Room, then take time for the home's surviving architectural details. Visitor duration is our planning estimate, not an official museum tour length.</p></article>
          <article className="border-t border-border pt-5"><p className="eyebrow text-primary">Half day</p><h3 className="mt-3 font-display text-2xl">Yoakum history walk</h3><p className="mt-3 text-sm leading-7">After the museum, explore downtown Yoakum's commercial streets and add Chisholm Trail Memorial Park near U.S. 77A and Gonzales Street. Verify park access and weather.</p></article>
          <article className="border-t border-border pt-5"><p className="eyebrow text-primary">Full day</p><h3 className="mt-3 font-display text-2xl">Two-county heritage loop</h3><p className="mt-3 text-sm leading-7">Use Yoakum to link Lavaca and DeWitt stories: add Shiner, Hallettsville or Cuero according to available hours. These trips are independent suggestions, not a booked tour.</p></article>
        </div>
      </Container>
    </section>
    <Container className="py-14 sm:py-20">
      <SectionHeader overline="Explore nearby" title="Continue the history beyond one museum" description="These connections lead into TexasDefined's wider Texas museum, town, county and road-trip coverage."/>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          {href:"/county/lavaca",title:"Lavaca County",desc:"Shiner, Hallettsville, Yoakum and Czech–German communities."},
          {href:"/county/dewitt",title:"DeWitt County",desc:"The other half of Yoakum's two-county geography and regional ranching heritage."},
          {href:"/destination/shiner",title:"Shiner",desc:"Connect local museum history with the brewery, painted church and railroad-era town."},
          {href:"/destination/chisholm-trail-heritage-museum",title:"Chisholm Trail Heritage Museum",desc:"Continue to Cuero for deeper ranching and cowboy material culture."},
          {href:"/explore/museums",title:"Texas museums",desc:"Find other independently researched regional museums and historic-house collections."},
          {href:"/explore/small-towns",title:"Texas small towns",desc:"Plan a broader trip through the region's heritage and town centers."},
        ].map((item) => <a key={item.href} href={item.href} className="group border-t border-border pt-5 hover:border-primary"><h3 className="font-display text-2xl group-hover:text-primary">{item.title} →</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.desc}</p></a>)}
      </div>
    </Container>
    <section className="border-t border-border py-14">
      <Container>
        <SectionHeader overline="Sources, methodology & corrections" title="How this guide was researched"/>
        <p className="mt-6 max-w-4xl leading-8">TexasDefined editorial research, reviewed October 9, 2026. Historical statements were cross-checked against a local centennial publication, the Texas State Historical Association and the Texas Historical Commission's heritage program. The museum's operating schedule is a 2021 directory snapshot, not a live confirmation; time-sensitive visitor details are explicitly separated from independently established history. This independent guide is not published or endorsed by the museum.</p>
        <ul className="mt-8 grid gap-x-12 gap-y-6 md:grid-cols-2">
          {sourceList.map((source) => <li key={source.href} className="border-t border-border pt-4"><External href={source.href}>{source.label}</External><p className="mt-2 text-sm leading-7 text-muted-foreground">{source.note}</p></li>)}
        </ul>
        <p className="mt-10 text-sm leading-7 text-muted-foreground">Recommended citation: TexasDefined Editorial Desk. “Yoakum Heritage Museum: Railroad, Leather & Historic House Guide.” Research verified October 9, 2026. https://texasdefined.com/destination/yoakum-heritage-museum</p>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">This museum is in the <strong>city of Yoakum</strong>, not the similarly named Yoakum County Heritage and Art Museum in Plains, Texas.</p>
      </Container>
    </section>
  </main>;
}
