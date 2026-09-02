import { Link, createLazyFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

export const Route = createLazyFileRoute("/things-unique-to-texas")({
  component: ThingsUniqueToTexasPage,
});

function ThingsUniqueToTexasPage() {
  const { categories, itemCount, deeperGuideCount } = Route.useLoaderData();

  return (
    <main>
      <section className="border-b border-border bg-muted/30 py-16 sm:py-24">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link><span className="mx-2">/</span><span className="text-foreground">Things That Define Texas</span>
          </nav>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Texas, in 250 details</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">Things That Define Texas</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Texas is too big to explain with a flag, a brisket and a cowboy boot. This guide connects the foods, landscapes, brands, buildings, roadside oddities, music, wildlife, sayings and rituals that make different parts of the state feel unmistakably Texan.</p>
          <div className="mt-10 grid max-w-3xl grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
            <Stat value={String(itemCount)} label="Texas icons" />
            <Stat value={String(categories.length)} label="Magazine chapters" />
            <Stat value={String(deeperGuideCount)} label="Deeper guide links" />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Choose a chapter</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">Eight ways to understand Texas</h2>
            <p className="mt-5 leading-7 text-muted-foreground">Each chapter works as its own evergreen magazine guide, with direct paths into TexasDefined's deeper articles, destination guides and planning tools.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {categories.map((category) => (
              <Link key={category.slug} to="/things-unique-to-texas/$category" params={{ category: category.slug }} className="group border border-border bg-card p-7 transition-colors hover:border-primary/50 hover:bg-muted/30">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{category.eyebrow}</p>
                <div className="mt-3 flex items-start justify-between gap-6">
                  <h3 className="font-display text-3xl leading-tight group-hover:text-primary">{category.title}</h3>
                  <span className="shrink-0 text-sm tabular-nums text-muted-foreground">{category.items.length}</span>
                </div>
                <p className="mt-4 leading-7 text-muted-foreground">{category.description}</p>
                <p className="mt-6 text-sm font-semibold">Read the chapter <span aria-hidden="true">→</span></p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-surface py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Deep-dive guides</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">Turn the list into stories and road trips</h2>
            <p className="mt-5 leading-7 text-muted-foreground">The strongest themes get full editorial treatment instead of hundreds of thin one-item pages. These guides connect culture to places, history and practical trip planning.</p>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 xl:grid-cols-3">
            <PillarLink to="/texas-food-history" eyebrow="Food history hub" title="Texas Food History" text="The parent guide connecting barbecue, chili, chicken-fried steak, breakfast tacos, Ranch Water, puffy tacos, barbacoa, German and Czech foodways, Dr Pepper and the regional cultures behind the Texas table." />
            <PillarLink to="/texas-food-trail" eyebrow="Food & road trips" title="The Texas Food Trail" text="Ten food traditions—from Central Texas barbecue and breakfast tacos to Czech bakeries, Gulf seafood and Hill Country produce—organized as a travel-ready guide." />
            <PillarLink to="/texas-chili-con-carne-history" eyebrow="Food history" title="Texas Chili Con Carne" text="San Antonio Chili Queens, commercial chili powder, Terlingua cookoff culture and why the bean argument is smaller than the history." />
            <PillarLink to="/texas-chicken-fried-steak-guide" eyebrow="Texas comfort food" title="Texas Chicken-Fried Steak" text="The disputed origin, regional styles, cream gravy and what separates a balanced plate from an oversized stunt." />
            <PillarLink to="/texas-breakfast-taco-guide" eyebrow="Everyday Texas food" title="Texas Breakfast Tacos" text="Tortillas, eggs, beans, potatoes, barbacoa, carne guisada, migas and the salsa habits that make local breakfast counters different." />
            <PillarLink to="/texas-ranch-water-guide" eyebrow="Texas drinks" title="Texas Ranch Water" text="A tequila, lime and mineral-water highball with strong Texas identity, a murky folk origin and a much more documentable modern Ranch 616 chapter." />
            <PillarLink to="/san-antonio-puffy-taco-history" eyebrow="San Antonio food" title="San Antonio Puffy Tacos" text="Fresh corn masa, hot oil, Ray's Drive Inn and the West Side food culture behind one of San Antonio's most recognizable regional tacos." />
            <PillarLink to="/barbacoa-big-red-san-antonio" eyebrow="Sunday tradition" title="Barbacoa & Big Red" text="An older weekend barbacoa tradition and a Waco-born soda came together as one of San Antonio's strongest food-and-memory pairings." />
            <PillarLink to="/texas-roadside-oddities" eyebrow="Roadside Texas" title="Texas Roadside Oddities" text="Cadillac Ranch, giant boots, tiny towns, neon, courthouse squares and the logic behind building a better weird-Texas road trip." />
            <PillarLink to="/article/battleship-texas-bb-35-history-restoration" eyebrow="Military & maritime history" title="Battleship Texas (BB-35)" text="The surviving dreadnought's story from 1914 and both World Wars through D-Day, Iwo Jima, museum preservation and its return to Galveston for restoration." />
            <PillarLink to="/texas-slang-explained" eyebrow="Language & identity" title="Texas Slang Explained" text="Y'all, fixin' to, all hat no cattle, bilingual influence and why context matters more than stereotype lists." />
            <PillarLink to="/texas-tall-tales-folklore" eyebrow="Folklore & identity" title="Texas Tall Tales & Folklore" text="Pecos Bill, jackalopes, the Yellow Rose tradition and other Texas stories—separating documented history from folklore while explaining why the legends endure." />
            <PillarLink to="/texas-blue-norther-weather-guide" eyebrow="Weather language & safety" title="Texas Blue Northers & Spring Storms" text="The Texas vocabulary behind blue northers and storm watching, separated carefully from the meteorology and National Weather Service safety guidance that should control real decisions." />
            <PillarLink to="/texas-dance-halls-honky-tonks" eyebrow="Music & social life" title="Texas Dance Halls & Honky-Tonks" text="Two-step culture, historic halls, Western swing, honky-tonks and how to turn a live-music night into a cultural weekend." />
            <PillarLink to="/texas-homecoming-mums" eyebrow="School traditions" title="Texas Homecoming Mums Explained" text="How a simple chrysanthemum corsage became an oversized wearable record of school spirit, activities, friends and local identity." />
            <PillarLink to="/texas-natural-wonders-bucket-list" eyebrow="Outdoors & geography" title="Texas Natural Wonders Bucket List" text="Twelve landscapes—from Big Bend and Palo Duro to Caddo Lake, Padre Island and spring-fed West Texas—that show how varied the state really is." />
            <PillarLink to="/german-czech-texas-towns" eyebrow="Immigration & heritage" title="German & Czech Texas Towns" text="Fredericksburg, New Braunfels, West, Schulenburg and the food, churches, dance halls and community traditions connecting them." />
            <PillarLink to="/texas-brand-origin-stories" eyebrow="Business & identity" title="Texas Brand Origin Stories" text="H-E-B, Whataburger, Blue Bell, Shiner, Dickies and Buc-ee's—where they started and how everyday Texas routines turned them into cultural shorthand." />
            <PillarLink to="/made-in-texas" eyebrow="Industry & hometowns" title="Made, Built & Born in Texas" text="Products made or processed here are separated from brands that were founded, headquartered or operate major facilities in Texas—and connected back to their counties." />
            <PillarLink to="/dr-pepper-texas-history" eyebrow="Waco brand history" title="Dr Pepper in Texas" text="How an 1885 Waco soda-fountain drink moved into bottling, national recognition and a durable identity tied to its birthplace." />
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-muted/25 py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Not a trivia dump</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl">The list is a doorway into the rest of TexasDefined</h2>
              <p className="mt-5 leading-7 text-muted-foreground">Where TexasDefined already has a strong guide—barbecue styles, state symbols, wildlife, wildflowers, cultural regions, courthouse squares, Painted Churches, Made in Texas or farm-to-market roads—we point readers there instead of creating duplicate thin pages. Places worth visiting connect into Explore Texas so the list can become a trip, not just a scroll.</p>
              <p className="mt-4 leading-7 text-muted-foreground">We also separate Texas origins from Texas adoption. Topo Chico, for example, is Mexican, but it has a real place in Texas drink culture. The Lone Star flag is deeply Texan, but it does not get a special exemption from U.S. flag protocol. That distinction is part of making this collection useful rather than repeating internet folklore.</p>
            </div>
            <aside className="border border-border bg-background p-7">
              <h2 className="font-display text-3xl">Go deeper</h2>
              <div className="mt-6 divide-y divide-border border-y border-border">
                <RelatedLink to="/things-unique-to-texas/methodology" title="How this collection is maintained" text="See the inclusion rules, source precedence, cross-link policy and corrections approach behind the 250 entries." />
                <a href="/things-that-define-texas.csv" className="group block py-5"><span className="font-semibold group-hover:text-primary">Download the 250-item CSV →</span><span className="mt-1 block text-sm leading-6 text-muted-foreground">Item numbers, chapter membership, descriptions and canonical deeper-guide relationships for analysis or reuse.</span></a>
                <a href="/things-that-define-texas.json" className="group block py-5"><span className="font-semibold group-hover:text-primary">Download the reference JSON →</span><span className="mt-1 block text-sm leading-6 text-muted-foreground">The same 250 reference rows with field definitions and methodology metadata for machine use.</span></a>
                <RelatedLink to="/made-in-texas" title="Made in Texas" text="See which products are made or processed here and which brands have another kind of Texas connection." />
                <RelatedLink to="/texas-symbols" title="Official Texas Symbols" text="See which icons are actually designated by the state." />
                <RelatedLink to="/texas-explained" title="Texas Explained" text="Understand the geography, roads, towns, homes and systems behind the culture." />
                <RelatedLink to="/explore" title="Explore Texas" text="Turn natural wonders, landmarks and small-town stops into a trip." />
                <RelatedLink to="/events" title="Texas Events" text="Find rodeos, festivals and traditions you can experience in person." />
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return <div className="bg-background p-5"><p className="font-display text-3xl">{value}</p><p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">{label}</p></div>;
}

function PillarLink({ to, eyebrow, title, text }: { to: string; eyebrow: string; title: string; text: string }) {
  return <Link to={to} className="group bg-background p-7"><span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{eyebrow}</span><strong className="mt-3 block font-display text-3xl leading-tight group-hover:text-primary">{title}</strong><span className="mt-4 block text-sm leading-7 text-muted-foreground">{text}</span><span className="mt-6 block text-sm font-semibold">Read the guide →</span></Link>;
}

function RelatedLink({ to, title, text }: { to: string; title: string; text: string }) {
  return <Link to={to} className="group block py-5"><span className="font-semibold group-hover:text-primary">{title} →</span><span className="mt-1 block text-sm leading-6 text-muted-foreground">{text}</span></Link>;
}
