import { Link, createLazyFileRoute } from "@tanstack/react-router";

import bbqBrisket from "@/assets/bbq-brisket.jpg";
import bigBend from "@/assets/big-bend.jpg";
import bluebonnets from "@/assets/bluebonnets.jpg";
import caddoLake from "@/assets/caddo-lake.jpg";
import highSchoolFootball from "@/assets/high-school-football-hero.jpg";
import roadTrip from "@/assets/road-trip.jpg";
import rodeo from "@/assets/rodeo-101-hero-photo.jpg";
import shopFlatlay from "@/assets/shop-flatlay.jpg";
import smallTown from "@/assets/small-town.jpg";
import wildlife from "@/assets/wildlife.jpg";
import { Container } from "@/components/layout/Container";
import { unusualBusinessAnalyticsAttributes } from "@/lib/unusual-business-analytics";

export const Route = createLazyFileRoute("/things-unique-to-texas")({
  component: ThingsUniqueToTexasPage,
});

const signatureItems = [
  { name: "Central Texas brisket", to: "/texas-food-history" },
  { name: "Bluebonnets", to: "/things-unique-to-texas/wildlife-landscape" },
  { name: "Big Bend", to: "/texas-natural-wonders-bucket-list" },
  { name: "Friday-night football", to: "/things-unique-to-texas/culture-music" },
  { name: "Breakfast tacos", to: "/texas-breakfast-taco-guide" },
  { name: "The Alamo", to: "/things-unique-to-texas/landmarks" },
  { name: "Dr Pepper", to: "/dr-pepper-texas-history" },
  { name: "Dance halls", to: "/texas-dance-halls-honky-tonks" },
  { name: "Buc-ee's", to: "/texas-brand-origin-stories" },
  { name: "Palo Duro Canyon", to: "/texas-natural-wonders-bucket-list" },
  { name: "H-E-B", to: "/texas-brand-origin-stories" },
  { name: "Homecoming mums", to: "/texas-homecoming-mums" },
  { name: "Whataburger", to: "/texas-brand-origin-stories" },
  { name: "Armadillos", to: "/things-unique-to-texas/wildlife-landscape" },
  { name: "Hill Country", to: "/things-unique-to-texas/natural-wonders" },
  { name: "Cowboy boots", to: "/things-unique-to-texas/culture-music" },
  { name: "State Fair traditions", to: "/texas-state-fair" },
  { name: "Kolaches", to: "/german-czech-texas-towns" },
  { name: "Ranch roads", to: "/things-unique-to-texas/roadside-small-towns" },
  { name: "Painted churches", to: "/german-czech-texas-towns" },
  { name: "Gulf Coast beaches", to: "/things-unique-to-texas/natural-wonders" },
  { name: "Shiner", to: "/texas-brand-origin-stories" },
  { name: "Courthouse squares", to: "/things-unique-to-texas/landmarks" },
  { name: "Caddo Lake", to: "/texas-natural-wonders-bucket-list" },
  { name: "Texas slang", to: "/texas-slang-explained" },
] as const;

const featureCards = [
  { src: bbqBrisket, alt: "Texas barbecue brisket served on butcher paper", title: "Smoke, spice and the Texas table", to: "/things-unique-to-texas/food-drink" },
  { src: bluebonnets, alt: "A field of Texas bluebonnets in spring", title: "Bluebonnets and spring roads", to: "/things-unique-to-texas/wildlife-landscape" },
  { src: bigBend, alt: "The Chisos Mountains rising over the Big Bend desert", title: "Desert, mountains and enormous skies", to: "/things-unique-to-texas/natural-wonders" },
  { src: smallTown, alt: "A Texas courthouse square at golden hour", title: "Small towns and courthouse squares", to: "/things-unique-to-texas/roadside-small-towns" },
  { src: caddoLake, alt: "Cypress trees on Caddo Lake", title: "Bayous, cypress and East Texas", to: "/things-unique-to-texas/natural-wonders" },
  { src: roadTrip, alt: "A two-lane Texas road stretching toward the horizon", title: "Road trips, ranch roads and distance", to: "/things-unique-to-texas/roadside-small-towns" },
] as const;

const categoryImages: Record<string, { src: string; alt: string }> = {
  "food-drink": { src: bbqBrisket, alt: "Texas barbecue brisket" },
  "texas-brands": { src: shopFlatlay, alt: "Texas goods arranged in a retail flat lay" },
  "natural-wonders": { src: bigBend, alt: "Big Bend desert and mountains" },
  landmarks: { src: smallTown, alt: "A Texas courthouse square" },
  "roadside-small-towns": { src: roadTrip, alt: "A two-lane Texas road" },
  "culture-music": { src: highSchoolFootball, alt: "Texas high-school football under stadium lights" },
  "wildlife-landscape": { src: wildlife, alt: "Texas wildlife in its natural landscape" },
  "slang-folklore": { src: rodeo, alt: "A Texas rodeo rider representing cowboy tradition and mythology" },
};

function ThingsUniqueToTexasPage() {
  const { categories, itemCount, deeperGuideCount } = Route.useLoaderData();

  return (
    <main>
      <section className="border-b border-border bg-muted/30 py-16 sm:py-24">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link><span className="mx-2">/</span><span className="text-foreground">Things That Define Texas</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Texas, in 250 details</p>
              <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">250 Things That Define Texas</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">From brisket and bluebonnets to Big Bend, dance halls and Friday-night football, this is a visual guide to the foods, places, traditions, landscapes, brands and wonderfully Texas details that make the state feel like nowhere else.</p>
              <div className="mt-10 grid max-w-3xl grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
                <Stat value={String(itemCount)} label="Things" />
                <Stat value={String(categories.length)} label="Collections" />
                <Stat value={String(deeperGuideCount)} label="Deeper guide links" />
              </div>
            </div>

            <div className="border border-border bg-background" style={{ display: "grid", gridTemplateColumns: "1.15fr .85fr", minHeight: 420 }}>
              <img src={bigBend} alt="The Chisos Mountains rising over the Big Bend desert" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ display: "grid", gridTemplateRows: "1fr 1fr" }}>
                <img src={bbqBrisket} alt="Texas barbecue brisket served on butcher paper" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <img src={bluebonnets} alt="A field of Texas bluebonnets in spring" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
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

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {featureCards.map((card) => (
              <Link key={card.title} to={card.to} className="group border border-border bg-background transition-colors hover:border-primary/50">
                <img src={card.src} alt={card.alt} loading="lazy" decoding="async" style={{ width: "100%", height: 260, objectFit: "cover" }} />
                <div className="p-7">
                  <strong className="font-display text-3xl leading-tight group-hover:text-primary">{card.title}</strong>
                  <span className="mt-4 block text-sm font-semibold">Explore this side of Texas →</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 xl:grid-cols-3">
            {signatureItems.map((item, index) => (
              <Link key={item.name} to={item.to} className="group bg-background p-7 transition-colors hover:bg-muted/30">
                <span className="text-sm font-semibold text-primary">{String(index + 1).padStart(2, "0")}</span>
                <strong className="mt-3 block font-display text-3xl leading-tight group-hover:text-primary">{item.name}</strong>
                <span className="mt-4 block text-sm font-semibold text-muted-foreground">Go deeper →</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-surface py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Explore all 250</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">Eight collections, one Texas</h2>
            <p className="mt-5 leading-7 text-muted-foreground">Each collection opens into a full numbered chapter. Preview the highlights here, then dive into every item without losing the bigger picture.</p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {categories.map((category) => {
              const image = categoryImages[category.slug] ?? { src: roadTrip, alt: "Texas road" };
              return (
                <Link key={category.slug} to="/things-unique-to-texas/$category" params={{ category: category.slug }} className="group border border-border bg-card transition-colors hover:border-primary/50 hover:bg-muted/30">
                  <img src={image.src} alt={image.alt} loading="lazy" decoding="async" style={{ width: "100%", height: 220, objectFit: "cover" }} />
                  <div className="p-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{category.eyebrow}</p>
                    <div className="mt-3 flex items-start justify-between gap-6">
                      <h3 className="font-display text-3xl leading-tight group-hover:text-primary">{category.title}</h3>
                      <span className="shrink-0 text-sm tabular-nums text-muted-foreground">{category.items.length}</span>
                    </div>
                    <p className="mt-4 leading-7 text-muted-foreground">{category.description}</p>
                    <p className="mt-4 text-sm leading-7"><span className="font-semibold">A few inside:</span> {category.items.slice(0, 6).map((item) => item.name).join(" · ")}</p>
                    <p className="mt-6 text-sm font-semibold">See all {category.items.length} <span aria-hidden="true">→</span></p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Go beyond the list</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">The stories behind the Texas shorthand</h2>
            <p className="mt-5 leading-7 text-muted-foreground">The list is most useful when it leads somewhere. These longer guides explain how Texas food, music, landscape, towns and traditions developed—and where you can experience them in person.</p>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 xl:grid-cols-3">
            <PillarLink to="/texas-food-history" eyebrow="Food history hub" title="Texas Food History" text="Barbecue, chili, breakfast tacos, Czech and German foodways, Dr Pepper and the cultures behind the Texas table." />
            <PillarLink to="/texas-food-trail" eyebrow="Food & road trips" title="The Texas Food Trail" text="Ten food traditions organized as a travel-ready route through barbecue, Czech bakeries, Gulf seafood and more." />
            <PillarLink to="/texas-chili-con-carne-history" eyebrow="Food history" title="Texas Chili Con Carne" text="San Antonio Chili Queens, commercial chili powder, Terlingua cookoff culture and the history behind the famous bowl." />
            <PillarLink to="/texas-chicken-fried-steak-guide" eyebrow="Texas comfort food" title="Texas Chicken-Fried Steak" text="The disputed origin, regional styles, cream gravy and what separates a balanced plate from an oversized stunt." />
            <PillarLink to="/texas-breakfast-taco-guide" eyebrow="Everyday Texas food" title="Texas Breakfast Tacos" text="Tortillas, eggs, beans, potatoes, barbacoa, carne guisada, migas and the salsa habits that make local counters different." />
            <PillarLink to="/texas-ranch-water-guide" eyebrow="Texas drinks" title="Texas Ranch Water" text="Tequila, lime and mineral water, plus the folk origin and the more documentable modern chapter." />
            <PillarLink to="/san-antonio-puffy-taco-history" eyebrow="San Antonio food" title="San Antonio Puffy Tacos" text="Fresh corn masa, hot oil, Ray's Drive Inn and the West Side food culture behind one of the city's signature dishes." />
            <PillarLink to="/barbacoa-big-red-san-antonio" eyebrow="Sunday tradition" title="Barbacoa & Big Red" text="How an older weekend barbacoa tradition and a Waco-born soda became one of San Antonio's strongest food-memory pairings." />
            <PillarLink to="/texas-roadside-oddities" eyebrow="Roadside Texas" title="Texas Roadside Oddities" text="Cadillac Ranch, giant boots, neon, courthouse squares and the logic behind a better weird-Texas road trip." />
            <PillarLink to="/article/unusual-texas-businesses-services" eyebrow="Specialized local businesses" title="Unusual Texas Businesses & Services" text="Distinctive local businesses and experiences that do not fit a generic directory listing." />
            <PillarLink to="/article/battleship-texas-bb-35-history-restoration" eyebrow="Military & maritime history" title="Battleship Texas (BB-35)" text="The dreadnought's story from 1914 and both World Wars through museum preservation and restoration." />
            <PillarLink to="/texas-slang-explained" eyebrow="Language & identity" title="Texas Slang Explained" text="Y'all, fixin' to, all hat no cattle, bilingual influence and why context matters more than stereotype lists." />
            <PillarLink to="/texas-tall-tales-folklore" eyebrow="Folklore & identity" title="Texas Tall Tales & Folklore" text="Pecos Bill, jackalopes, the Yellow Rose tradition and the line between documented history and enduring legend." />
            <PillarLink to="/texas-blue-norther-weather-guide" eyebrow="Weather language & safety" title="Texas Blue Northers & Spring Storms" text="Texas weather language separated carefully from the meteorology and safety guidance that should control real decisions." />
            <PillarLink to="/texas-dance-halls-honky-tonks" eyebrow="Music & social life" title="Texas Dance Halls & Honky-Tonks" text="Two-step culture, historic halls, Western swing, honky-tonks and the places where the tradition still lives." />
            <PillarLink to="/texas-homecoming-mums" eyebrow="School traditions" title="Texas Homecoming Mums Explained" text="How a chrysanthemum corsage became an oversized wearable record of school spirit, activities, friends and local identity." />
            <PillarLink to="/texas-natural-wonders-bucket-list" eyebrow="Outdoors & geography" title="Texas Natural Wonders Bucket List" text="Big Bend, Palo Duro, Caddo Lake, Padre Island and other landscapes that show how varied Texas really is." />
            <PillarLink to="/german-czech-texas-towns" eyebrow="Immigration & heritage" title="German & Czech Texas Towns" text="Fredericksburg, New Braunfels, West, Schulenburg and the traditions connecting their food, churches and dance halls." />
            <PillarLink to="/texas-brand-origin-stories" eyebrow="Business & identity" title="Texas Brand Origin Stories" text="H-E-B, Whataburger, Blue Bell, Shiner, Dickies and Buc-ee's—and how they became cultural shorthand." />
            <PillarLink to="/made-in-texas" eyebrow="Industry & hometowns" title="Made, Built & Born in Texas" text="Products made or processed here, separated from brands with a different kind of Texas connection." />
            <PillarLink to="/dr-pepper-texas-history" eyebrow="Waco brand history" title="Dr Pepper in Texas" text="How an 1885 Waco soda-fountain drink grew into a national brand while keeping a durable connection to its birthplace." />
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-muted/25 py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">About the collection</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl">A living index of Texas culture</h2>
              <p className="mt-5 leading-7 text-muted-foreground">The collection separates Texas origins from Texas adoption, distinguishes official state symbols from popular icons, and connects places worth visiting to practical TexasDefined travel coverage. Entries can evolve as stronger source material and deeper guides are added.</p>
            </div>
            <aside className="border border-border bg-background p-7">
              <h2 className="font-display text-3xl">Go deeper</h2>
              <div className="mt-6 divide-y divide-border border-y border-border">
                <RelatedLink to="/things-unique-to-texas/methodology" title="How this collection is maintained" text="Inclusion rules, source precedence, corrections and cross-link policy." />
                <a href="/things-that-define-texas.csv" className="group block py-5"><span className="font-semibold group-hover:text-primary">Download the 250-item CSV →</span><span className="mt-1 block text-sm leading-6 text-muted-foreground">Item numbers, chapter membership, descriptions and deeper-guide links.</span></a>
                <a href="/things-that-define-texas.json" className="group block py-5"><span className="font-semibold group-hover:text-primary">Download JSON data →</span><span className="mt-1 block text-sm leading-6 text-muted-foreground">The same reference rows and methodology metadata for machine use.</span></a>
                <RelatedLink to="/made-in-texas" title="Made in Texas" text="Products made here versus brands with another kind of Texas connection." />
                <RelatedLink to="/article/unusual-texas-businesses-services" title="Unusual Texas businesses & services" text="Specialized local businesses and experiences around the state." />
                <RelatedLink to="/texas-symbols" title="Official Texas Symbols" text="Which icons are formally designated by the state." />
                <RelatedLink to="/texas-explained" title="Texas Explained" text="The geography, roads, towns, homes and systems behind the culture." />
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
  return <Link to={to} {...unusualBusinessAnalyticsAttributes(to, "things-unique:pillar")} className="group bg-background p-7"><span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{eyebrow}</span><strong className="mt-3 block font-display text-3xl leading-tight group-hover:text-primary">{title}</strong><span className="mt-4 block text-sm leading-7 text-muted-foreground">{text}</span><span className="mt-6 block text-sm font-semibold">Read the guide →</span></Link>;
}

function RelatedLink({ to, title, text }: { to: string; title: string; text: string }) {
  return <Link to={to} {...unusualBusinessAnalyticsAttributes(to, "things-unique:related")} className="group block py-5"><span className="font-semibold group-hover:text-primary">{title} →</span><span className="mt-1 block text-sm leading-6 text-muted-foreground">{text}</span></Link>;
}
