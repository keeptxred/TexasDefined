import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { waterTowerFaq, waterTowers } from "@/data/water-towers";

export function WaterTowersPage() {
  return (
    <main>
      <section className="border-b border-border bg-surface">
        <Container className="py-16 sm:py-24">
          <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
            <ol className="flex flex-wrap gap-2">
              <li><Link to="/">Front page</Link></li><li aria-hidden>·</li>
              <li><Link to="/explore">Explore</Link></li><li aria-hidden>·</li>
              <li aria-current="page">Texas water towers</li>
            </ol>
          </nav>
          <p className="eyebrow mt-8 text-primary">Roadside Texas · Small-town landmarks</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas Water Towers Worth Pulling Over For</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">Most water towers are infrastructure. These are different: a deliberately leaning Route 66 billboard, a giant watermelon, century-old steel landmarks, a brick tower turned museum and skyline symbols that tell you exactly which Texas town you have reached.</p>
          <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold">
            <Link to="/texas-roadside-oddities" className="border-b border-primary text-primary">Explore Texas roadside oddities</Link>
            <Link to="/texas-history" className="border-b border-primary text-primary">Go deeper into Texas history</Link>
            <Link to="/explore/trip-planner" className="border-b border-primary text-primary">Build a road trip</Link>
          </div>
        </Container>
      </section>

      <Container className="py-14 sm:py-20">
        <section className="grid gap-8 border-b-2 border-foreground pb-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,.75fr)]">
          <div>
            <p className="eyebrow text-primary">The rule for making the list</p>
            <h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">A tower needs a reason to stop the car.</h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">This is intentionally not a directory of every elevated tank in Texas. A tower belongs here only when a credible local, state or travel authority documents a historic, visual or tourism story strong enough to make it part of the place—not merely part of the utility system.</p>
          </div>
          <aside className="border-t-2 border-foreground pt-5">
            <dl className="grid gap-5 text-sm">
              <div><dt className="eyebrow text-muted-foreground">First edition</dt><dd className="mt-1 font-semibold">8 curated stops</dd></div>
              <div><dt className="eyebrow text-muted-foreground">Best use</dt><dd className="mt-1 text-muted-foreground">Photo stop + a larger town or road-trip itinerary</dd></div>
              <div><dt className="eyebrow text-muted-foreground">Not included</dt><dd className="mt-1 text-muted-foreground">Ordinary towers without a documented visitor, design or history hook</dd></div>
            </dl>
          </aside>
        </section>

        <section className="mt-14">
          <p className="eyebrow text-primary">The pull-over list</p>
          <h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">Eight towers that actually add something to the trip</h2>
          <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">
            {waterTowers.map((tower, index) => (
              <article id={`water-tower-${index + 1}`} key={tower.name} className="scroll-mt-24 bg-background p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="eyebrow text-primary">{String(index + 1).padStart(2, "0")} · {tower.region}</p>
                  <span className="text-xs text-muted-foreground">{tower.county}</span>
                </div>
                <h3 className="mt-3 font-display text-3xl leading-tight">{tower.name}</h3>
                <p className="mt-2 text-sm font-semibold">{tower.town} · {tower.stopType}</p>
                <p className="mt-5 text-sm leading-7 text-muted-foreground">{tower.whyStop}</p>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{tower.story}</p>
                <p className="mt-5 text-sm leading-7"><strong>Pair it with:</strong> <span className="text-muted-foreground">{tower.pairWith}</span></p>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  <a href={tower.sourceUrl} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">Verify the source</a>
                  {tower.internalHref ? <Link to={tower.internalHref} className="border-b border-primary text-primary">Explore nearby on TexasDefined</Link> : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-10 border-t-2 border-foreground pt-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-primary">Best road-trip combinations</p>
            <h2 className="mt-3 font-display text-4xl">Make the tower a stop, not the whole trip.</h2>
            <div className="mt-6 space-y-6 text-sm leading-7 text-muted-foreground">
              <p><strong className="text-foreground">Panhandle / Route 66:</strong> Groom and Shamrock make the strongest two-tower pairing. Add <Link to="/destination/cadillac-ranch" className="border-b border-primary text-primary">Cadillac Ranch</Link>, Amarillo and Palo Duro Canyon.</p>
              <p><strong className="text-foreground">Central Texas:</strong> Luling, Round Rock and Gruene each work because the tower points toward something larger—barbecue and watermelon culture, a historic downtown, or a preserved district on the Guadalupe River.</p>
              <p><strong className="text-foreground">Small-town history:</strong> Roanoke and <Link to="/destination/columbus" className="border-b border-primary text-primary">Columbus</Link> are especially good when architecture, downtown walking and preservation matter more than novelty.</p>
              <p><strong className="text-foreground">Houston-area detour:</strong> Katy's tower belongs inside a Historic Katy walk where the rice-farming story, town square and civic murals explain why the landmark matters.</p>
            </div>
          </div>
          <div>
            <p className="eyebrow text-primary">Roadside etiquette</p>
            <h2 className="mt-3 font-display text-4xl">Look up. Pull over safely. Stay on the right side of the fence.</h2>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">
              <li><strong className="text-foreground">Do not assume tower access.</strong> Inclusion here means the landmark is worth seeing, not that the structure can be entered or climbed.</li>
              <li><strong className="text-foreground">Use legal parking and public viewpoints.</strong> A good photograph is not worth stopping on a shoulder with poor visibility or crossing private property.</li>
              <li><strong className="text-foreground">Verify current local conditions.</strong> Murals, restoration projects, construction and access around historic structures can change.</li>
              <li><strong className="text-foreground">Give the town some time.</strong> The best version of this list sends travelers into downtowns, museums, restaurants and historic districts rather than producing eight five-minute drive-bys.</li>
            </ul>
          </div>
        </section>

        <section className="mt-20 border-t-2 border-foreground pt-8">
          <p className="eyebrow text-primary">Why water towers feel so Texas</p>
          <h2 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl">The town name in the sky is part of the landscape.</h2>
          <div className="mt-6 max-w-4xl space-y-5 text-base leading-8 text-muted-foreground">
            <p>Before GPS announced the next exit, a water tower could announce the town itself. Across long stretches of Texas, the elevated tank still works like punctuation on the horizon: the first visible sign that ranch land, prairie or interstate frontage is about to become a community.</p>
            <p>The Texas Water Development Board, Texas Historical Commission and Texas Parks and Wildlife Department have used water towers and windmills together as symbols for telling the state's water story. The best towers connect engineering, growth, agriculture, civic pride and highway culture in one object.</p>
          </div>
        </section>

        <section className="mt-20 border-t-2 border-foreground pt-8" aria-labelledby="water-tower-faq">
          <p className="eyebrow text-primary">Traveler questions</p>
          <h2 id="water-tower-faq" className="mt-3 font-display text-4xl sm:text-5xl">Before you build a tower-hunting detour</h2>
          <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-3">
            {waterTowerFaq.map((item) => <article key={item.question} className="bg-background p-6 sm:p-7"><h3 className="font-display text-2xl leading-tight">{item.question}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{item.answer}</p></article>)}
          </div>
        </section>

        <section className="mt-16 border-t border-border pt-6 text-xs leading-6 text-muted-foreground">
          <p>Editorial note: TexasDefined treats this as a curated roadside-landmark collection, not a ranking of municipal water systems. History and visitor context are checked against the linked city, state, tourism or institutional sources; current access rules remain controlled by the property owner or local authority.</p>
        </section>
      </Container>
    </main>
  );
}
