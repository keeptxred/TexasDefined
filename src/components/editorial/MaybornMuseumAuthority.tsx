import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

const officialVisitUrl = "https://mayborn.web.baylor.edu/visit";
const officialExhibitsUrl = "https://mayborn.web.baylor.edu/exhibits/natural-and-cultural-history-exhibits";
const discoveryCenterUrl = "https://mayborn.web.baylor.edu/exhibits/jeanes-discovery-center";
const culturalCrossroadsUrl = "https://mayborn.web.baylor.edu/exhibits-events/cultural-crossroads-exhibits-page";
const bloodsuckersUrl = "https://mayborn.web.baylor.edu/exhibits-events/attack-bloodsuckers";
const eventsUrl = "https://mayborn.web.baylor.edu/events";
const accessibilityUrl = "https://mayborn.web.baylor.edu/visit/accessibility";
const discountsUrl = "https://mayborn.web.baylor.edu/visit/discounts";

const gallery = [
  {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Baylor_University_June_2016_74_(Mayborn_Museum_Complex).jpg?width=1600",
    alt: "Mayborn Museum Complex at Baylor University in Waco",
    credit: "Michael Barera · Wikimedia Commons · CC BY-SA 4.0",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Baylor_University_June_2016_54_(Mayborn_Museum_Complex).jpg?width=1200",
    alt: "Exterior detail of the Mayborn Museum Complex in Waco",
    credit: "Michael Barera · Wikimedia Commons · CC BY-SA 4.0",
  },
  {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Baylor_University_June_2016_56_(Mayborn_Museum_Complex).jpg?width=1200",
    alt: "Mayborn Museum Complex on the Baylor University campus",
    credit: "Michael Barera · Wikimedia Commons · CC BY-SA 4.0",
  },
];

const experiences = [
  ["Natural science & paleontology", "Central Texas geology, fossils, wildlife, historic collections and the Strecker legacy make the museum much more than a children’s discovery center."],
  ["Jeanes Discovery Center", "Two floors of hands-on learning spaces are built for experimentation, play and repeat visits, especially for families with younger children."],
  ["Cultural Crossroads", "Opened May 1, 2026, this immersive gallery explores the Indigenous, Tejano, Black, immigrant and settler communities that shaped Central Texas."],
  ["Historic Village", "Nine relocated wood-frame buildings recreate elements of an 1890s Texas community along the Brazos River. This portion is outdoors and weather-dependent."],
  ["Hall of Natural History", "The natural-history side of the museum connects Central Texas geology, wildlife and prehistoric life through fossils, collection objects and regional interpretation."],
  ["Changing exhibitions", "Large temporary exhibitions rotate through the museum, giving repeat visitors a reason to return and making the current exhibit calendar worth checking before arrival."],
] as const;

const discoveryRooms = [
  ["Play Waco", "Designed for children five and under, this kid-sized Waco includes a grocery store, post office, fire station and Waco Hippodrome-style play setting for early literacy, math and social learning."],
  ["Simple Machines", "Levers, pulleys, wheels and ramps turn basic engineering into hands-on experiments with force and motion."],
  ["SpaceX", "A Merlin engine and a space-flown thruster anchor an exhibit about propulsion, rocket science and modern space exploration."],
  ["Backyard Ecology", "Live animals, a Brazos River water table, pollinator play and Central Texas ecology connect museum science to the landscapes outside the building."],
  ["Cretaceous Sea", "The museum map places this gallery among the core natural-history experiences, interpreting the ancient marine environment that once covered much of Texas."],
  ["Light & Sound", "Visitors can experiment with waves, instruments, shadows and a large walk-on piano in one of the museum’s most tactile science spaces."],
] as const;

const nearby = [
  ["Texas Ranger Hall of Fame and Museum", "/destination/texas-ranger-hall-of-fame-museum-waco"],
  ["Texas Sports Hall of Fame", "/destination/texas-sports-hall-of-fame-waco"],
  ["Dr Pepper Museum", "/destination/dr-pepper-museum-waco"],
  ["Waco Mammoth National Monument", "/destination/waco-mammoth-national-monument"],
  ["McLennan County guide", "/county/mclennan"],
] as const;

export default function MaybornMuseumAuthority() {
  return (
    <main>
      <Container className="pt-10 sm:pt-14">
        <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Front page</Link>
          <span className="mx-2">·</span>
          <Link to="/explore" className="hover:text-foreground">Explore</Link>
          <span className="mx-2">·</span>
          <span>Waco</span>
        </nav>

        <section className="mt-8">
          <p className="eyebrow text-primary">Waco · Museums · Family travel</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Mayborn Museum in Waco</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            Baylor University’s 143,000-square-foot Mayborn Museum combines natural science, Central Texas cultural history, hands-on discovery spaces, major traveling exhibitions and a nine-building historic village beside the Brazos River.
          </p>
          <div className="mt-7 flex flex-wrap gap-6">
            <a href={officialVisitUrl} target="_blank" rel="noreferrer noopener" className="eyebrow border-b border-primary pb-1 text-primary">Official hours & tickets</a>
            <a href="https://www.google.com/maps/search/?api=1&query=Mayborn+Museum+1300+S+University+Parks+Dr+Waco+TX+76706" target="_blank" rel="noreferrer noopener" className="eyebrow border-b border-primary pb-1 text-primary">Directions</a>
          </div>
          <figure className="mt-8 overflow-hidden border border-border">
            <img src={gallery[0].src} alt={gallery[0].alt} width={1600} height={1200} fetchPriority="high" decoding="async" className="w-full object-cover" />
            <figcaption className="px-4 py-3 text-xs text-muted-foreground">{gallery[0].credit}</figcaption>
          </figure>
        </section>
      </Container>

      <Container className="py-12 sm:py-16">
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Hours", "Mon–Sat 10am–5pm; Sun 1–5pm"],
            ["Admission", "Adults $12 · Children 2–15 $10 · Seniors 65+ $11"],
            ["Address", "1300 S University Parks Dr, Waco"],
            ["Visit length", "About 2–4 hours for most families"],
            ["Baylor students", "Free general admission with current Baylor student status"],
            ["Museums for All", "$1 per person with a qualifying EBT card, for up to two adults and all children in the household"],
          ].map(([label, value]) => (
            <div key={label} className="border-t border-border pt-5">
              <p className="eyebrow text-primary">{label}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{value}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 border-t border-border pt-8">
          <p className="eyebrow text-primary">2026 closure warning</p>
          <h2 className="mt-3 font-display text-3xl">Check the Baylor football calendar before a Saturday visit</h2>
          <p className="mt-4 max-w-4xl leading-7 text-muted-foreground">
            The museum closes for Baylor home football games. Remaining announced fall 2026 Saturday closures are October 17, November 7 and November 21. It also closes on Thanksgiving Day, Christmas Eve and Christmas Day. Baylor’s official visit page is the source of truth for schedule changes.
          </p>
        </section>

        <section className="mt-16 border-t border-border pt-8">
          <p className="eyebrow text-primary">What you’ll actually see</p>
          <h2 className="mt-3 font-display text-4xl">Six reasons Mayborn is more than a children’s museum</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {experiences.map(([title, text]) => (
              <article key={title} className="border-t border-border pt-5">
                <h3 className="font-display text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 border-t border-border pt-8">
          <p className="eyebrow text-primary">Jeanes Discovery Center</p>
          <h2 className="mt-3 font-display text-4xl">The hands-on rooms families should know before they go</h2>
          <p className="mt-5 max-w-4xl leading-8 text-muted-foreground">
            The Discovery Center spans two floors, and its rooms are different enough that families can prioritize by age and interest instead of wandering the entire building in sequence.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {discoveryRooms.map(([title, text]) => (
              <article key={title} className="border-t border-border pt-5">
                <h3 className="font-display text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
          <a href={discoveryCenterUrl} target="_blank" rel="noreferrer noopener" className="eyebrow mt-7 inline-block border-b border-primary pb-1 text-primary">Official Jeanes Discovery Center guide</a>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="border-t border-border pt-8">
            <p className="eyebrow text-primary">New in 2026</p>
            <h2 className="mt-3 font-display text-4xl">Cultural Crossroads changes the museum’s story</h2>
            <p className="mt-5 leading-8 text-muted-foreground">
              Opened May 1, 2026, Cultural Crossroads adds an immersive Central Texas history gallery built around the people and cultures that met here. Experiences include a Wichita grass house, frontier log house and a recreation of the Waco Suspension Bridge façade, with interpretation covering Indigenous communities, Tejano and Black communities, immigrants, migration, trade and cultural exchange.
            </p>
            <a href={culturalCrossroadsUrl} target="_blank" rel="noreferrer noopener" className="eyebrow mt-4 inline-block border-b border-primary pb-1 text-primary">Official Cultural Crossroads guide</a>
          </div>
          <div className="border-t border-border pt-8">
            <p className="eyebrow text-primary">Temporary exhibit now showing</p>
            <h2 className="mt-3 font-display text-3xl">Attack of the Bloodsuckers!</h2>
            <p className="mt-5 leading-8 text-muted-foreground">
              Running September 20, 2026 through January 3, 2027, this family-friendly interactive exhibit explores mosquitoes, ticks, fleas, leeches and other parasites. Baylor recommends roughly 30–45 minutes for the exhibit, and it is included with museum admission.
            </p>
            <a href={bloodsuckersUrl} target="_blank" rel="noreferrer noopener" className="eyebrow mt-4 inline-block border-b border-primary pb-1 text-primary">Current exhibit details</a>
          </div>
        </section>

        <section className="mt-16 border-t border-border pt-8">
          <p className="eyebrow text-primary">Programs on the calendar</p>
          <h2 className="mt-3 font-display text-4xl">Check what is happening on the day you visit</h2>
          <p className="mt-5 max-w-4xl leading-8 text-muted-foreground">
            The fall 2026 calendar currently includes recurring Monday Storytime, Village Wednesday and Fossil Friday programs alongside workshops, lectures and seasonal events. Program dates and themes change, so use Baylor’s live calendar rather than planning around a recurring program without checking the specific date.
          </p>
          <a href={eventsUrl} target="_blank" rel="noreferrer noopener" className="eyebrow mt-4 inline-block border-b border-primary pb-1 text-primary">See the official Mayborn calendar</a>
        </section>

        <section className="mt-16 border-t border-border pt-8">
          <p className="eyebrow text-primary">Before you go</p>
          <h2 className="mt-3 font-display text-4xl">Plan the visit</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <article className="border-t border-border pt-5">
              <h3 className="font-display text-2xl">Best for families</h3>
              <p className="mt-3 leading-7 text-muted-foreground">Mayborn works especially well for families because children can alternate between structured natural-history galleries and hands-on discovery spaces. Play Waco is specifically designed for children five and under, while school-age children usually get the widest range of value across the rest of the museum.</p>
            </article>
            <article className="border-t border-border pt-5">
              <h3 className="font-display text-2xl">Accessibility & sensory planning</h3>
              <p className="mt-3 leading-7 text-muted-foreground">Accessible parking is available at the front of the lot. The museum provides ramps at the front and back entrances, elevators to second-floor exhibits, automatic doors, wheelchair-friendly exhibits and ramps at all Historic Village buildings. A limited number of wheelchairs and complimentary sensory backpacks with noise-reducing headphones, fidget tools, a sensory map and visual schedule are available at the front desk.</p>
              <a href={accessibilityUrl} target="_blank" rel="noreferrer noopener" className="eyebrow mt-4 inline-block border-b border-primary pb-1 text-primary">Official accessibility details</a>
            </article>
            <article className="border-t border-border pt-5">
              <h3 className="font-display text-2xl">Discounts & low-cost access</h3>
              <p className="mt-3 leading-7 text-muted-foreground">Museums for All offers $1 admission per person for up to two adults and all children in the household with a qualifying EBT card. Baylor also lists free general admission for active Baylor, TSTC and MCC students and active-duty military at the museum ticket desk; special exhibits can have separate reduced charges.</p>
              <a href={discountsUrl} target="_blank" rel="noreferrer noopener" className="eyebrow mt-4 inline-block border-b border-primary pb-1 text-primary">Official discount programs</a>
            </article>
            <article className="border-t border-border pt-5">
              <h3 className="font-display text-2xl">Historic Village weather</h3>
              <p className="mt-3 leading-7 text-muted-foreground">Admission includes the nine-building Governor Bill and Vara Daniel Historic Village. The outdoor village may close during inclement weather even when indoor galleries remain open, so call ahead on stormy or unusually hot days.</p>
            </article>
            <article className="border-t border-border pt-5">
              <h3 className="font-display text-2xl">Parking & arrival</h3>
              <p className="mt-3 leading-7 text-muted-foreground">The museum is on Baylor’s campus at 1300 S University Parks Drive, close to Interstate 35 and the Brazos River. Accessible spaces are at the front of the lot; overflow parking is available at the Ferrell Center and McLane Stadium. Give yourself extra arrival time on major Baylor event weekends because campus traffic patterns can change.</p>
            </article>
            <article className="border-t border-border pt-5">
              <h3 className="font-display text-2xl">Food & breaks</h3>
              <p className="mt-3 leading-7 text-muted-foreground">Bear Bites On The Go in the museum store sells simple snacks and drinks. For a longer visit with children, plan a break rather than trying to move continuously through both floors, the temporary gallery and the outdoor village.</p>
            </article>
          </div>
        </section>

        <section className="mt-16 border-t border-border pt-8">
          <p className="eyebrow text-primary">Photo guide</p>
          <h2 className="mt-3 font-display text-4xl">The museum complex</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {gallery.slice(1).map((image) => (
              <figure key={image.src} className="overflow-hidden border border-border">
                <img src={image.src} alt={image.alt} width={1200} height={900} loading="lazy" decoding="async" className="w-full object-cover" />
                <figcaption className="px-4 py-3 text-xs text-muted-foreground">{image.credit}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="border-t border-border pt-8">
            <p className="eyebrow text-primary">Build a Waco museum day</p>
            <h2 className="mt-3 font-display text-4xl">Nearby places worth pairing with Mayborn</h2>
            <div className="mt-7 grid gap-6">
              {nearby.map(([label, href]) => (
                <Link key={href} to={href} className="eyebrow border-b border-primary pb-1 text-primary">{label} →</Link>
              ))}
            </div>
          </div>
          <aside className="border-t border-border pt-8">
            <p className="eyebrow text-primary">Source notes</p>
            <h2 className="mt-3 font-display text-3xl">Verified October 5, 2026</h2>
            <p className="mt-4 leading-7 text-muted-foreground">Hours, admission, closure dates, permanent exhibits, accessibility, discount programs, Cultural Crossroads, current programming and the temporary exhibition were checked against Baylor University’s Mayborn Museum pages. Prices, programs and closures can change, so use the official museum site for final trip-day confirmation.</p>
            <div className="mt-7 grid gap-6">
              <a href={officialVisitUrl} target="_blank" rel="noreferrer noopener" className="eyebrow border-b border-primary pb-1 text-primary">Official visit information</a>
              <a href={officialExhibitsUrl} target="_blank" rel="noreferrer noopener" className="eyebrow border-b border-primary pb-1 text-primary">Official permanent exhibits</a>
              <a href={discoveryCenterUrl} target="_blank" rel="noreferrer noopener" className="eyebrow border-b border-primary pb-1 text-primary">Official Discovery Center page</a>
              <a href={eventsUrl} target="_blank" rel="noreferrer noopener" className="eyebrow border-b border-primary pb-1 text-primary">Official events calendar</a>
              <a href={accessibilityUrl} target="_blank" rel="noreferrer noopener" className="eyebrow border-b border-primary pb-1 text-primary">Official accessibility page</a>
              <a href={discountsUrl} target="_blank" rel="noreferrer noopener" className="eyebrow border-b border-primary pb-1 text-primary">Official discounts page</a>
              <a href={culturalCrossroadsUrl} target="_blank" rel="noreferrer noopener" className="eyebrow border-b border-primary pb-1 text-primary">Official Cultural Crossroads page</a>
              <a href={bloodsuckersUrl} target="_blank" rel="noreferrer noopener" className="eyebrow border-b border-primary pb-1 text-primary">Official current exhibit page</a>
            </div>
          </aside>
        </section>

        <section className="mt-16 border-t border-border pt-8">
          <p className="eyebrow text-primary">The short version</p>
          <h2 className="mt-3 font-display text-4xl">Is the Mayborn Museum worth it?</h2>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-muted-foreground">Yes—especially for families, natural-history fans and travelers who want a substantial Waco attraction beyond shopping and downtown stops. Plan at least two hours; allow closer to half a day if children will spend significant time in the Discovery Center, you want the Historic Village, or a major temporary exhibit is running.</p>
          <div className="mt-7 flex flex-wrap gap-6">
            <a href={officialVisitUrl} target="_blank" rel="noreferrer noopener" className="eyebrow border-b border-primary pb-1 text-primary">Check today’s official details</a>
            <Link to="/explore" className="eyebrow border-b border-primary pb-1 text-primary">Explore more Texas destinations</Link>
          </div>
        </section>
      </Container>
    </main>
  );
}
