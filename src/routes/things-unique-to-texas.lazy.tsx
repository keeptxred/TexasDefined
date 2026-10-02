import { Link, createLazyFileRoute } from "@tanstack/react-router";

import bbqBrisket from "@/assets/bbq-brisket.jpg";
import bigBend from "@/assets/big-bend.jpg";
import bluebonnets from "@/assets/bluebonnets.jpg";
import caddoLake from "@/assets/caddo-lake.jpg";
import roadTrip from "@/assets/road-trip.jpg";
import smallTown from "@/assets/small-town.jpg";
import { Container } from "@/components/layout/Container";
import { unusualBusinessAnalyticsAttributes } from "@/lib/unusual-business-analytics";

export const Route = createLazyFileRoute("/things-unique-to-texas")({
  component: ThingsUniqueToTexasPage,
});

const signatureItems = [
  "Central Texas brisket",
  "Bluebonnets",
  "Big Bend",
  "Friday-night football",
  "Breakfast tacos",
  "The Alamo",
  "Dr Pepper",
  "Dance halls",
  "Buc-ee's",
  "Palo Duro Canyon",
  "H-E-B",
  "Homecoming mums",
  "Whataburger",
  "Armadillos",
  "Hill Country",
  "Cowboy boots",
  "State Fair traditions",
  "Kolaches",
  "Ranch roads",
  "Painted churches",
  "Gulf Coast beaches",
  "Shiner",
  "Courthouse squares",
  "Caddo Lake",
  "Texas slang",
];

const featureCards = [
  { src: bbqBrisket, alt: "Texas barbecue brisket served on butcher paper", label: "Smoke, spice and the Texas table" },
  { src: bluebonnets, alt: "A field of Texas bluebonnets in spring", label: "Bluebonnets and spring roads" },
  { src: bigBend, alt: "The Chisos Mountains rising over the Big Bend desert", label: "Desert, mountains and enormous skies" },
  { src: smallTown, alt: "A Texas courthouse square at golden hour", label: "Small towns and courthouse squares" },
  { src: caddoLake, alt: "Cypress trees on Caddo Lake", label: "Bayous, cypress and East Texas" },
  { src: roadTrip, alt: "A two-lane Texas road stretching toward the horizon", label: "Road trips, ranch roads and distance" },
];

const categoryImages: Record<string, { src: string; alt: string }> = {
  "food-drink": { src: bbqBrisket, alt: "Texas barbecue brisket" },
  "texas-brands": { src: roadTrip, alt: "A Texas highway on a road trip" },
  "natural-wonders": { src: bigBend, alt: "Big Bend desert and mountains" },
  landmarks: { src: smallTown, alt: "A Texas courthouse square" },
  "roadside-small-towns": { src: roadTrip, alt: "A two-lane Texas road" },
  "culture-music": { src: smallTown, alt: "A Texas small-town square" },
  "wildlife-landscape": { src: caddoLake, alt: "Cypress trees on Caddo Lake" },
  "slang-folklore": { src: bluebonnets, alt: "Texas bluebonnets" },
};

function ThingsUniqueToTexasPage() {
  const { categories, itemCount, deeperGuideCount } = Route.useLoaderData();

  return (
    <main>
      <section className="border-b border-border bg-muted/20 py-10 sm:py-14 lg:py-16">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link><span className="mx-2">/</span><span className="text-foreground">Things That Define Texas</span>
          </nav>

          <div className="grid items-stretch gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Texas, in 250 details</p>
              <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">250 Things That Define Texas</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">From brisket and bluebonnets to Big Bend, dance halls and Friday-night football, this is a visual guide to the foods, places, traditions, landscapes, brands and wonderfully Texas details that make the state feel like nowhere else.</p>
              <div className="mt-8 grid max-w-2xl grid-cols-3 gap-px overflow-hidden border border-border bg-border">
                <Stat value={String(itemCount)} label="Things" />
                <Stat value={String(categories.length)} label="Collections" />
                <Stat value={String(deeperGuideCount)} label="Deeper guide links" />
              </div>
            </div>

            <div className="grid min-h-[420px] grid-cols-2 grid-rows-2 gap-2 sm:min-h-[500px]">
              <figure className="relative col-span-2 overflow-hidden sm:col-span-1 sm:row-span-2">
                <img src={bigBend} alt="The Chisos Mountains rising over the Big Bend desert" className="h-full w-full object-cover" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-5 pb-5 pt-14 text-sm font-semibold text-white">Big Bend country</figcaption>
              </figure>
              <figure className="relative overflow-hidden">
                <img src={bbqBrisket} alt="Texas barbecue brisket served on butcher paper" className="h-full w-full object-cover" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-4 pt-12 text-sm font-semibold text-white">Texas barbecue</figcaption>
              </figure>
              <figure className="relative overflow-hidden">
                <img src={bluebonnets} alt="A field of Texas bluebonnets in spring" className="h-full w-full object-cover" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-4 pt-12 text-sm font-semibold text-white">Bluebonnet season</figcaption>
              </figure>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Start here</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">25 unmistakably Texas things</h2>
            <p className="mt-5 leading-7 text-muted-foreground">A quick cross-section of the larger 250-item collection. Some are places, some are foods, some are rituals, and some are details you only understand after spending time here.</p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((card) => (
              <figure key={card.label} className="group relative aspect-[4/3] overflow-hidden border border-border bg-muted">
                <img src={card.src} alt={card.alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-5 pb-5 pt-16 font-display text-2xl text-white">{card.label}</figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-5 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {signatureItems.map((name, index) => (
              <div key={name} className="bg-background px-4 py-4 text-sm leading-6">
                <span className="mr-2 font-display text-lg text-primary">{String(index + 1).padStart(2, "0")}</span>{name}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-surface py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Explore all 250</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">Eight collections, one Texas</h2>
            <p className="mt-5 leading-7 text-muted-foreground">Each collection opens into a full numbered chapter. You can browse the highlights here first, then dive into every item without losing the bigger picture.</p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {categories.map((category) => {
              const image = categoryImages[category.slug] ?? { src: roadTrip, alt: "Texas road" };
              return (
                <Link key={category.slug} to="/things-unique-to-texas/$category" params={{ category: category.slug }} className="group overflow-hidden border border-border bg-background transition-colors hover:border-primary/50">
                  <div className="grid sm:grid-cols-[0.4fr_0.6fr]">
                    <div className="aspect-[4/3] overflow-hidden sm:aspect-auto">
                      <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.025]" />
                    </div>
                    <div className="p-6 sm:p-7">
                      <div className="flex items-start justify-between gap-5">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{category.eyebrow}</p>
                          <h3 className="mt-2 font-display text-3xl leading-tight group-hover:text-primary">{category.title}</h3>
                        </div>
                        <span className="shrink-0 rounded-full border border-border px-3 py-1 text-xs tabular-nums text-muted-foreground">{category.items.length} things</span>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-muted-foreground">{category.description}</p>
                      <p className="mt-5 text-sm leading-6"><span className="font-semibold">A few inside:</span> {category.items.slice(0, 6).map((item) => item.name).join(" · ")}</p>
                      <p className="mt-6 text-sm font-semibold">See all {category.items.length} <span aria-hidden="true">→</span></p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Go beyond the list</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl">The stories behind the Texas shorthand</h2>
              <p className="mt-5 leading-7 text-muted-foreground">The list is most useful when it leads somewhere. These longer guides explain how Texas food, music, landscape, towns and traditions developed—and where you can experience them in person.</p>
              <p className="mt-4 leading-7 text-muted-foreground">Instead of creating hundreds of repetitive one-item pages, TexasDefined connects important entries to stronger destination guides, history features and trip-planning resources.</p>
            </div>

            <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
              <PillarLink to="/texas-food-history" eyebrow="Food history" title="Texas Food History" text="Barbecue, chili, breakfast tacos, Czech and German foodways, Dr Pepper and the cultures behind the Texas table." />
              <PillarLink to="/texas-food-trail" eyebrow="Food road trips" title="The Texas Food Trail" text="Ten food traditions organized as a travel-ready route through barbecue, Czech bakeries, Gulf seafood and more." />
              <PillarLink to="/texas-roadside-oddities" eyebrow="Roadside Texas" title="Texas Roadside Oddities" text="Cadillac Ranch, giant boots, neon, courthouse squares and the logic behind a better weird-Texas road trip." />
              <PillarLink to="/texas-slang-explained" eyebrow="Language" title="Texas Slang Explained" text="Y'all, fixin' to, all hat no cattle, bilingual influence and why context matters more than stereotype lists." />
              <PillarLink to="/texas-blue-norther-weather-guide" eyebrow="Weather culture" title="Blue Northers & Spring Storms" text="The language Texans use for dramatic weather, separated from the meteorology and safety guidance that matter most." />
              <PillarLink to="/texas-dance-halls-honky-tonks" eyebrow="Music & social life" title="Dance Halls & Honky-Tonks" text="Two-step culture, historic halls, Western swing, honky-tonks and the places where the tradition still lives." />
              <PillarLink to="/texas-homecoming-mums" eyebrow="School traditions" title="Texas Homecoming Mums" text="How a chrysanthemum corsage became an oversized wearable record of school spirit, friends and local identity." />
              <PillarLink to="/texas-natural-wonders-bucket-list" eyebrow="Outdoors" title="Texas Natural Wonders" text="Big Bend, Palo Duro, Caddo Lake, Padre Island and other landscapes that show how varied Texas really is." />
              <PillarLink to="/german-czech-texas-towns" eyebrow="Heritage" title="German & Czech Texas Towns" text="Fredericksburg, New Braunfels, West, Schulenburg and the traditions connecting their food, churches and dance halls." />
              <PillarLink to="/texas-brand-origin-stories" eyebrow="Business & identity" title="Texas Brand Origin Stories" text="H-E-B, Whataburger, Blue Bell, Shiner, Dickies and Buc-ee's—and how they became cultural shorthand." />
              <PillarLink to="/texas-chili-con-carne-history" eyebrow="Food history" title="Texas Chili Con Carne" text="San Antonio Chili Queens, commercial chili powder, Terlingua cookoff culture and the history behind the famous bowl." />
              <PillarLink to="/texas-chicken-fried-steak-guide" eyebrow="Comfort food" title="Texas Chicken-Fried Steak" text="The disputed origin, regional styles, cream gravy and what separates a balanced plate from an oversized stunt." />
              <PillarLink to="/texas-breakfast-taco-guide" eyebrow="Everyday Texas food" title="Texas Breakfast Tacos" text="Tortillas, eggs, beans, potatoes, barbacoa, carne guisada, migas and the salsa habits that make local counters different." />
              <PillarLink to="/dr-pepper-texas-history" eyebrow="Waco history" title="Dr Pepper in Texas" text="How an 1885 Waco soda-fountain drink grew into a national brand while keeping a durable connection to its birthplace." />
              <PillarLink to="/texas-ranch-water-guide" eyebrow="Texas drinks" title="Texas Ranch Water" text="Tequila, lime and sparkling mineral water, plus the folk origin and the more documentable modern chapter." />
              <PillarLink to="/san-antonio-puffy-taco-history" eyebrow="San Antonio food" title="San Antonio Puffy Tacos" text="Fresh corn masa, hot oil, Ray's Drive Inn and the West Side food culture behind one of the city's signature dishes." />
              <PillarLink to="/barbacoa-big-red-san-antonio" eyebrow="Sunday tradition" title="Barbacoa & Big Red" text="How an older weekend barbacoa tradition and a Waco-born soda became one of San Antonio's strongest food-memory pairings." />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-muted/20 py-14 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">About the collection</p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl">A living index of Texas culture</h2>
              <p className="mt-5 max-w-3xl leading-7 text-muted-foreground">The collection separates Texas origins from Texas adoption, distinguishes official state symbols from popular icons, and connects places worth visiting to practical TexasDefined travel coverage. Entries can evolve as stronger source material and deeper guides are added.</p>
            </div>
            <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
              <RelatedLink to="/things-unique-to-texas/methodology" title="How the collection is maintained" text="Inclusion rules, source precedence, corrections and cross-link policy." />
              <RelatedLink to="/texas-symbols" title="Official Texas symbols" text="Which icons are formally designated by the state." />
              <RelatedLink to="/made-in-texas" title="Made in Texas" text="Products made here versus brands with another kind of Texas connection." />
              <RelatedLink to="/explore" title="Explore Texas" text="Turn landmarks, natural wonders and small-town entries into a trip." />
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted-foreground">
            <a href="/things-that-define-texas.csv" className="hover:text-foreground">Download the 250-item CSV →</a>
            <a href="/things-that-define-texas.json" className="hover:text-foreground">Download JSON data →</a>
          </div>
        </Container>
      </section>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return <div className="bg-background p-4 sm:p-5"><p className="font-display text-2xl sm:text-3xl">{value}</p><p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{label}</p></div>;
}

function PillarLink({ to, eyebrow, title, text }: { to: string; eyebrow: string; title: string; text: string }) {
  return <Link to={to} {...unusualBusinessAnalyticsAttributes(to, "things-unique:pillar")} className="group bg-background p-6 sm:p-7"><span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{eyebrow}</span><strong className="mt-3 block font-display text-2xl leading-tight group-hover:text-primary">{title}</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">{text}</span><span className="mt-5 block text-sm font-semibold">Read the guide →</span></Link>;
}

function RelatedLink({ to, title, text }: { to: string; title: string; text: string }) {
  return <Link to={to} {...unusualBusinessAnalyticsAttributes(to, "things-unique:related")} className="group bg-background p-5"><span className="font-semibold group-hover:text-primary">{title} →</span><span className="mt-1 block text-sm leading-6 text-muted-foreground">{text}</span></Link>;
}
